// Checks every blog article, service page and masterclass chapter against docs/blog-guidelines.md,
// docs/service-pages.md and docs/masterclass.md.
// Runs before `astro build`, so a violating article fails CI.
// Frontmatter fields and lengths are validated by src/content.config.ts.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { blockProse, findBlocks, flowHash, validateBlock } from '../src/lib/content-blocks.mjs';

// Branches and terms that must not appear publicly (see briefing).
const banned = [/energieversorg/i, /\bversorger\b/i, /\butilit(y|ies)\b/i, /stadtwerke/i];

// Phrases that make a text sound generated or like marketing filler (see "No AI slop" in the guidelines).
const slop = [
  /\bdelve/i, /\blandscape\b/i, /\bseamless/i, /\bleverag/i, /game.?changer/i, /\bunlock/i, /\bempower/i,
  /\bpivotal\b/i, /\bparamount\b/i, /in today's/i, /fast-paced/i, /ever-(evolving|changing)/i, /\bholistic/i,
  /cutting-edge/i, /best-in-class/i, /world-class/i, /it('s| is) (important|worth) (to note|noting)/i, /in conclusion/i,
  /let's dive/i, /dive (deep )?into/i, /\bfurthermore\b/i, /\bmoreover\b/i, /in summary/i, /at the end of the day/i,
  /\bsynerg/i, /\bstreamlin/i, /\bharness/i, /\belevat(e|es|ing)\b/i, /\btapestry/i, /\brealm\b/i, /\btestament to\b/i,
  /here is what/i, /in this article/i, /without further ado/i,
  /\bnahtlos/i, /ganzheitlich/i, /in der heutigen/i, /zusammenfassend/i, /darüber hinaus/i, /\beintauchen/i,
  /bahnbrechend/i, /maßgeschneidert/i, /von zentraler bedeutung/i, /hier lesen sie/i, /in diesem artikel/i,
  /es ist (wichtig|erwähnenswert) zu (beachten|erwähnen)/i, /nicht zuletzt/i, /\bsynergie/i,
];

const errors = [];

// Structural AI-slop patterns (AI-slop review 2026-10-31, "No AI slop" in docs/blog-guidelines.md). They are
// reported as warnings until every existing text is rewritten; STRICT_STRUCTURE then turns them into errors.
// `node scripts/check-blog.mjs --structure` lists every finding and exits non-zero while any is left.
const STRICT_STRUCTURE = false;
const showStructure = process.argv.includes('--structure');
const structureIssues = [];
const structurePhrases = [
  /nur so gut wie/i, /only as good as/i, /\b(besser|mehr|schneller) als jede[rsnm]?\b/i, /\b(better|more|faster) than any\b/i,
  /die gute nachricht/i, /the good news/i, /\bder haken\b/i, /\bthe catch\b/i, /the honest answer/i, /die ehrliche antwort/i,
  /ein typisches szenario, als annahme/i, /a typical scenario, as an assumption/i, /^(erstens|zweitens|drittens)\b/im,
];
const genericCloser = /^(wo (fangen sie an|starten sie|sollten sie (anfangen|starten))|womit (fangen sie an|sollten sie anfangen)|where (do|should) you (start|begin)|what should you start with)\??$/i;
const countAnnounce = /\b(drei|vier|fünf|three|four|five) (dinge|punkte|fragen|regeln|gründe|entscheidungen|kriterien|hebel|things|points|questions|rules|reasons|decisions|criteria|levers)\b/gi;
const intensifiers = { de: /\b(echt(e|er|en|es|em)?|wirklich|tatsächlich|ehrlich)\b/gi, en: /\b(really|actually|honest(ly)?|genuinely|truly)\b/gi };
const contentWords = (str) => new Set((str.toLowerCase().match(/[a-zäöüß0-9]{4,}/g) ?? []));

function checkStructure(name, lang, text, fm) {
  const issue = (msg) => structureIssues.push(`${name}: ${msg}`);
  for (const re of structurePhrases) if (re.test(text) || re.test(fm)) issue(`formula phrase, rewrite (${re})`);
  const h2 = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  for (const h of h2) if (genericCloser.test(h)) issue(`generic heading "${h}", name the concrete first step instead`);
  const questions = h2.filter((h) => h.endsWith('?')).length;
  if (questions > Math.ceil(h2.length / 2)) issue(`${questions} of ${h2.length} H2 are questions, at most half (state the answer in the heading)`);
  const counts = text.match(countAnnounce) ?? [];
  if (counts.length > 1) issue(`counting formula used ${counts.length}× (${counts.slice(0, 3).join(', ')}), at most once`);
  const intens = text.match(intensifiers[lang] ?? intensifiers.en) ?? [];
  if (intens.length > 3) issue(`${intens.length} intensifiers (${[...new Set(intens.map((w) => w.toLowerCase()))].join(', ')}), at most 3`);
  const insteadOf = (text.match(lang === 'de' ? /\bstatt\b/gi : /\binstead of\b/gi) ?? []).length;
  if (insteadOf > 5) issue(`"${lang === 'de' ? 'statt' : 'instead of'}" used ${insteadOf}×, at most 5`);
  // The last paragraph is not a one-sentence moral.
  const paras = text.trim().split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p && !/^(#|\||-|\*|\d+\.|>)/.test(p));
  const last = paras.at(-1) ?? '';
  if (last && (last.match(/[.!?](\s|$)/g) ?? []).length <= 1 && last.split(/\s+/).length < 35) issue(`ends on a one-sentence summary ("${last.slice(0, 60)}…"), end with the concrete step`);
  // Takeaways: short, and the first one does not repeat the intro.
  const takeaways = [...(fm.match(/^takeaways:\n((?:\s+- .*\n?)+)/m)?.[1] ?? '').matchAll(/^\s+- "?(.*?)"?\s*$/gm)].map((m) => m[1]);
  for (const t of takeaways) if (t.length > 160) issue(`takeaway over 160 characters ("${t.slice(0, 40)}…"), one line each`);
  if (takeaways[0]) {
    const intro = contentWords(text.trim().split(/(?<=[.!?])\s/)[0]);
    const first = contentWords(takeaways[0]);
    const shared = [...first].filter((w) => intro.has(w)).length;
    if (first.size && shared / first.size > 0.6) issue('first takeaway repeats the first sentence of the intro, say something new');
  }
}
const drawings = readFileSync(new URL('../src/lib/card-drawings.ts', import.meta.url), 'utf8');

// Blog articles, service pages and masterclass chapters share the content rules; only length and structure differ.
const collections = {
  blog: { minWords: 1000, maxWords: 2500, minH2: 3 },
  services: { minWords: 400, maxWords: 1200, minH2: 2 },
  masterclass: { minWords: 900, maxWords: 3000, minH2: 3 },
};

function check(collection, rules) {
  const dir = new URL(`../src/content/${collection}/`, import.meta.url).pathname;
  const pairs = new Map();
  const categoriesByKey = new Map();
  // Astro uses the slug as the entry id, so a slug shared by EN and DE silently drops one entry.
  const slugs = new Map();
  // A collection without any files yet (e.g. masterclass chapters still being written) is fine.
  const langs = existsSync(dir) ? readdirSync(dir).filter((lang) => statSync(join(dir, lang)).isDirectory()) : [];
  for (const lang of langs) {
    for (const file of readdirSync(join(dir, lang)).filter((f) => f.endsWith('.md'))) {
      const name = `${collection}/${lang}/${file}`;
      const fail = (msg) => errors.push(`${name}: ${msg}`);
      const raw = readFileSync(join(dir, lang, file), 'utf8');
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) {
        fail('missing frontmatter');
        continue;
      }
      const [, fm, body] = match;
      const field = (key) => fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1];
      if (field('draft') === 'true') continue;

      if (field('lang') !== lang) fail(`lang must be "${lang}" for files in ${lang}/`);
      const key = field('translationKey');
      const slug = field('slug');
      if (slugs.has(slug)) fail(`slug "${slug}" is already used by ${slugs.get(slug)}, slugs must be unique across languages`);
      else slugs.set(slug, name);
      if (!pairs.has(key)) pairs.set(key, new Set());
      pairs.get(key).add(lang);
      // EN and DE list the same blog categories in the same order (the first decides the contact section).
      if (collection === 'blog') {
        const cats = field('categories') ?? '';
        if (!cats) fail('set categories: [..] (see src/lib/categories.ts)');
        if (!categoriesByKey.has(key)) categoriesByKey.set(key, new Map());
        categoriesByKey.get(key).set(lang, cats.replace(/\s+/g, ''));
      }

      // Content blocks (```hinweis, ```zeitleiste, …) are prose and count like text;
      // other fenced code is left out of word counts and wording checks.
      const blocks = findBlocks(body);
      let text = body;
      for (const b of [...blocks].reverse()) text = `${text.slice(0, b.start)}${blockProse(b)}${text.slice(b.end)}`;
      text = text.replace(/```[\s\S]*?```/g, '');
      for (const b of blocks) {
        for (const e of validateBlock(b)) fail(e);
        if (b.name === 'ablauf' && !existsSync(new URL(`../src/assets/diagrams/${flowHash(b.content)}.svg`, import.meta.url))) {
          fail('ablauf: diagram not rendered yet, run: node scripts/render-diagrams.mjs');
        }
      }
      // Every article and chapter loosens up its text with content blocks or a table
      // (see "Content blocks" in docs/blog-guidelines.md); service pages are exempt.
      if (collection !== 'services') {
        const tables = (body.match(/^\|.*\|\s*\n\|[\s:|-]+\|\s*$/gm) ?? []).length;
        const kinds = new Set(blocks.map((b) => b.name));
        if (tables) kinds.add('table');
        const wordsNow = text.split(/\s+/).filter(Boolean).length;
        if (kinds.size < 1) fail('add at least one content block or a table (see "Content blocks" in the guidelines)');
        else if (wordsNow > 1300 && kinds.size < 2) fail('over 1,300 words: use at least two different content blocks or a block and a table');
        // One block per 250 words, never fewer than four allowed (Fabian 2026-10-30).
        const maxBlocks = Math.max(4, Math.floor(wordsNow / 250));
        if (blocks.length > maxBlocks) fail(`${blocks.length} content blocks, at most ${maxBlocks} for ${wordsNow} words (one per 250, at least 4)`);
        if (blocks.filter((b) => b.name === 'praxis').length > 1) fail('at most one praxis block per text');
        if (blocks.filter((b) => b.name === 'hinweis').length > 2) fail('at most two hinweis blocks per text');
      }
      const words = text.split(/\s+/).filter(Boolean).length;
      if (words < rules.minWords) fail(`${words} words, at least ${rules.minWords} needed`);
      if (words > rules.maxWords) fail(`${words} words, split it up (max ${rules.maxWords})`);

      if (/^# /m.test(text)) fail('no H1 (#) in the body, the title is the H1');
      const h2 = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
      if (h2.length < rules.minH2) fail(`${h2.length} H2 sections, at least ${rules.minH2} needed`);
      if (!h2.some((h) => h.endsWith('?'))) fail('at least one H2 must be a question (for AI search)');
      if (/^#{4,} /m.test(text)) fail('use H2 and H3 only');

      const firstPara = text.trim().split(/\n\s*\n/)[0];
      if (firstPara.startsWith('#')) fail('start with an intro paragraph that gives the answer');
      else if (firstPara.split(/\s+/).length > 110) fail('intro paragraph too long, give the answer in at most 110 words');

      const internal = (text.match(/\]\(\.\.?\//g) ?? []).length;
      if (internal < 2) fail(`${internal} internal links, at least 2 needed (relative, e.g. ../../#services)`);
      if (/\]\(\/(?!\/)/.test(text)) fail('internal links must be relative (../../#services), not start with /');
      if (/\]\(https?:\/\/fkramer690\.github\.io/.test(text)) fail('do not hardcode the site domain, use relative links');

      if (/!\[\s*\]\(/.test(text)) fail('every image needs alt text: ![What the image shows](...)');
      if (/!\[[^\]]*\]\(https?:/.test(text)) fail('store images in src/assets/, do not hotlink external images');

      // Layout (takeaways, FAQ, author box, contact section) comes from the template only.
      if (/<\/?[a-z][a-z0-9-]*(\s[^>]*)?>/i.test(text)) fail('no raw HTML in articles, the page layout comes from the page component');

      for (const re of banned) if (re.test(raw)) fail(`contains a banned term (${re})`);
      for (const re of slop) if (re.test(raw)) fail(`sounds generated, rewrite in plain words (${re})`);
      if (/[\u2013\u2014]/.test(text)) fail('no en or em dashes (– —), use a comma, a full stop or "to"');
      const contrasts = (text.match(/\b(is|are|isn't|aren't) not (just |only )?(about|a|an)\b[^.]*\.\s+(it|they) (is|are)\b|geht es nicht (nur )?(um|darum)|\b(ist|sind) (kein|keine|nicht)\b[^.]*\.\s+(es|sie) (ist|sind)\b/gi) ?? []).length;
      if (contrasts > 0) fail('avoid the "it is not X, it is Y" pattern, state what it is');
      if (collection !== 'services') checkStructure(name, lang, text, fm);
    }
  }

  for (const [key, byLang] of categoriesByKey) {
    if (new Set(byLang.values()).size > 1) {
      errors.push(`blog: translationKey "${key}": EN and DE need the same categories in the same order (${[...byLang].map(([l, c]) => `${l}: ${c}`).join(', ')})`);
    }
  }
  for (const [key, langs] of pairs) {
    if (langs.size < 2) errors.push(`${collection}: translationKey "${key}": only ${[...langs].join(', ')}, EN and DE are both required`);
    // Every article needs its own technical drawing for the card on the blog overview.
    if (collection === 'blog' && !drawings.includes(`'${key}':`)) {
      errors.push(`blog: translationKey "${key}": no card drawing in src/lib/card-drawings.ts, add one (see "Card image" in the guidelines)`);
    }
  }
  return pairs.size;
}

// The closing calls to action (src/lib/contact-briefs.ts) and the page texts in src/i18n (start page, page heads,
// side column, footer) are page text too, so the same wording rules apply (AI-slop review 2026-10-31).
for (const file of ['src/lib/contact-briefs.ts', 'src/i18n/de.ts', 'src/i18n/en.ts']) {
const text = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
for (const [, str] of text.matchAll(/'((?:[^'\\\n]|\\.)*)'/g)) {
  const fail = (msg) => errors.push(`${file}: "${str.slice(0, 50)}": ${msg}`);
  for (const re of banned) if (re.test(str)) fail(`contains a banned term (${re})`);
  for (const re of slop) if (re.test(str)) fail(`sounds generated, rewrite in plain words (${re})`);
  if (/[\u2013\u2014]/.test(str)) fail('no en or em dashes (– —), use a comma, a full stop or "to"');
}
}

// The German FAQ heading is always "Häufig gestellte Fragen" (Fabian, 2026-10-29), on every page.
function scanFaqLabel(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) scanFaqLabel(path);
    else if (/\.(ts|astro|md|mjs)$/.test(name) && /Häufige Fragen/.test(readFileSync(path, 'utf8'))) {
      errors.push(`${path.slice(path.indexOf('src/'))}: name the FAQ "Häufig gestellte Fragen", not "Häufige Fragen"`);
    }
  }
}
scanFaqLabel(new URL('../src/', import.meta.url).pathname);

const counts = Object.entries(collections).map(([name, rules]) => `${check(name, rules)} ${name}`);

if (STRICT_STRUCTURE) errors.push(...structureIssues);
else if (showStructure) {
  console.log(structureIssues.join('\n'));
  console.log(`${structureIssues.length} structural findings in ${new Set(structureIssues.map((i) => i.split(':')[0])).size} files.`);
  if (structureIssues.length) process.exitCode = 1;
} else if (structureIssues.length) {
  console.warn(`Warning: ${structureIssues.length} structural AI-slop findings, run node scripts/check-blog.mjs --structure (see "No AI slop" in docs/blog-guidelines.md).`);
}

if (errors.length) {
  console.error(`Content check failed (see docs/blog-guidelines.md, docs/service-pages.md and docs/masterclass.md):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content check passed (${counts.join(', ')}).`);
