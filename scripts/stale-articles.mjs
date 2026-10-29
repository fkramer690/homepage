// Lists blog articles and masterclass chapters whose time-sensitive facts are due for a check:
// - prices or Flex Credits, last checked (updatedDate, else pubDate) more than MAX_AGE_MONTHS ago, or
// - a deadline or Salesforce release named in the text that has passed since the last check,
//   so the article probably still speaks of it in the future tense.
// Prints a Markdown report (German, for Fabian); .github/workflows/stale-articles.yml posts it
// as an issue once a month. Mark a checked article with `updatedDate` (docs/blog-guidelines.md).
// Usage: node scripts/stale-articles.mjs [--today YYYY-MM-DD]
import { readdirSync, readFileSync } from 'node:fs';

const MAX_AGE_MONTHS = 6;
const SITE = 'https://www.fk-sd.de';
const arg = process.argv.indexOf('--today');
const today = arg > 0 ? new Date(process.argv[arg + 1]) : new Date();

const months = {
  januar: 0, jan: 0, january: 0, februar: 1, feb: 1, february: 1, märz: 2, march: 2, april: 3, apr: 3,
  mai: 4, may: 4, juni: 5, june: 5, juli: 6, july: 6, august: 7, aug: 7, september: 8, sep: 8,
  oktober: 9, okt: 9, october: 9, oct: 9, november: 10, nov: 10, dezember: 11, dez: 11, december: 11, dec: 11,
};
// Salesforce releases go live roughly in February (Spring), June (Summer) and October of the year before (Winter).
const releaseMonth = { spring: [0, 1], summer: [0, 5], winter: [-1, 9] };

const price = /\d[\d.,]*\s?(?:€|Euro|Dollar|US-Dollar|USD|\$)|\$\s?\d|Flex Credits?/i;

// Dates the text names: 31.12.2026, "Januar 2027", "Summer '27". Each with the phrase around it.
function namedDates(text) {
  const found = [];
  const around = (i, len) => text.slice(Math.max(0, i - 60), i + len + 60).replace(/\s+/g, ' ').trim();
  for (const m of text.matchAll(/\b(\d{1,2})\.(\d{1,2})\.(20\d\d)\b/g)) {
    found.push({ date: new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])), label: m[0], context: around(m.index, m[0].length) });
  }
  for (const m of text.matchAll(/\b([A-Za-zä]+)\.? (20\d\d)\b/g)) {
    const month = months[m[1].toLowerCase()];
    if (month !== undefined) found.push({ date: new Date(Date.UTC(+m[2], month, 1)), label: m[0], context: around(m.index, m[0].length) });
  }
  for (const m of text.matchAll(/\b(Spring|Summer|Winter) ?['’](\d\d)\b/g)) {
    const [yearOffset, month] = releaseMonth[m[1].toLowerCase()];
    found.push({ date: new Date(Date.UTC(2000 + +m[2] + yearOffset, month, 1)), label: m[0], context: around(m.index, m[0].length) });
  }
  return found;
}

function frontmatter(source) {
  const fm = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const get = (key) => fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
  return { title: get('title'), slug: get('slug'), lang: get('lang'), course: get('course'), draft: get('draft') === 'true', pubDate: get('pubDate'), updatedDate: get('updatedDate') };
}

const monthsBetween = (a, b) => (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + b.getUTCMonth() - a.getUTCMonth();
const due = [];

for (const collection of ['blog', 'masterclass']) {
  for (const lang of ['de', 'en']) {
    const dir = new URL(`../src/content/${collection}/${lang}/`, import.meta.url).pathname;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const source = readFileSync(dir + file, 'utf8');
      const fm = frontmatter(source);
      if (fm.draft) continue;
      const checked = new Date(fm.updatedDate ?? fm.pubDate);
      const reasons = [];
      if (price.test(source) && monthsBetween(checked, today) >= MAX_AGE_MONTHS) {
        reasons.push(`Preise oder Credits, zuletzt geprüft ${checked.toISOString().slice(0, 10)}`);
      }
      const passed = new Map();
      for (const d of namedDates(source)) {
        if (d.date > checked && d.date <= today && !passed.has(d.label)) passed.set(d.label, d.context);
      }
      for (const [label, context] of passed) reasons.push(`${label} ist seit der letzten Prüfung vorbei: „…${context}…“`);
      if (reasons.length) due.push({ collection, lang, file, ...fm, reasons });
    }
  }
}

const url = (a) =>
  a.collection === 'blog'
    ? `${SITE}${a.lang === 'en' ? '/en' : ''}/blog/${a.slug}/`
    : `src/content/masterclass/${a.lang}/${a.file}`;

console.log(`Stand ${today.toISOString().slice(0, 10)}: ${due.length} Artikel und Kapitel mit Preisen oder Fristen sind fällig.\n`);
console.log('Nach der Prüfung `updatedDate` im Frontmatter setzen, dann verschwindet der Eintrag beim nächsten Lauf.\n');
for (const a of due.sort((x, y) => x.file.localeCompare(y.file) || x.lang.localeCompare(y.lang))) {
  console.log(`- [ ] **${a.title}** (${a.lang.toUpperCase()}) ${url(a)}`);
  for (const r of a.reasons) console.log(`  - ${r}`);
}
