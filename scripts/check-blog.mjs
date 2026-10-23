// Checks every blog article against the rules in docs/blog-guidelines.md.
// Runs before `astro build`, so a violating article fails CI.
// Frontmatter fields and lengths are validated by src/content.config.ts.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content/blog/', import.meta.url).pathname;
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
const pairs = new Map();
const slugs = new Map();

for (const lang of readdirSync(root)) {
  for (const file of readdirSync(join(root, lang)).filter((f) => f.endsWith('.md'))) {
    const name = `${lang}/${file}`;
    const fail = (msg) => errors.push(`${name}: ${msg}`);
    const raw = readFileSync(join(root, lang, file), 'utf8');
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
    // Astro uses the slug as the entry id, so a slug shared by EN and DE silently drops one article.
    const slug = field('slug');
    if (slugs.has(slug)) fail(`slug "${slug}" is already used by ${slugs.get(slug)}, slugs must be unique across languages`);
    else slugs.set(slug, name);
    if (!pairs.has(key)) pairs.set(key, new Set());
    pairs.get(key).add(lang);

    const text = body.replace(/```[\s\S]*?```/g, '');
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words < 1000) fail(`${words} words, at least 1000 needed`);
    if (words > 2500) fail(`${words} words, split it up (max 2500)`);

    if (/^# /m.test(text)) fail('no H1 (#) in the body, the title is the H1');
    const h2 = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
    if (h2.length < 3) fail(`${h2.length} H2 sections, at least 3 needed`);
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
    if (/!\[[^\]]*\]\(https?:/.test(text)) fail('store images in src/assets/blog/, do not hotlink external images');

    // Layout (takeaways, FAQ, author box, contact section) comes from the template only.
    if (/<\/?[a-z][a-z0-9-]*(\s[^>]*)?>/i.test(text)) fail('no raw HTML in articles, the page layout comes from src/components/BlogPost.astro');

    for (const re of banned) if (re.test(raw)) fail(`contains a banned term (${re})`);
    for (const re of slop) if (re.test(raw)) fail(`sounds generated, rewrite in plain words (${re})`);
    if (/[\u2013\u2014]/.test(text)) fail('no en or em dashes (– —), use a comma, a full stop or "to"');
    const contrasts = (text.match(/\b(is|are|isn't|aren't) not (just |only )?(about|a|an)\b[^.]*\.\s+(it|they) (is|are)\b|geht es nicht (nur )?(um|darum)|\b(ist|sind) (kein|keine|nicht)\b[^.]*\.\s+(es|sie) (ist|sind)\b/gi) ?? []).length;
    if (contrasts > 0) fail('avoid the "it is not X, it is Y" pattern, state what it is');
  }
}

for (const [key, langs] of pairs) {
  if (langs.size < 2) errors.push(`translationKey "${key}": only ${[...langs].join(', ')}, EN and DE are both required`);
}

if (errors.length) {
  console.error(`Blog check failed (see docs/blog-guidelines.md):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Blog check passed (${pairs.size} article(s)).`);
