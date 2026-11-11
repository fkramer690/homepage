// Weekly "Was tun?" list from the search data of Google Search Console and Bing.
// Reads the dashboard tables that fetch-gsc.mjs and fetch-bing.mjs write, looks
// up the matching page in src/content (title, meta title, FAQ, H2s) and writes
// three groups of follow-up actions plus the filtered spam:
//   snippet    page on position <= 10 with >= 10 impressions and 0 clicks
//   nearPage1  page on position 11-20 with >= 10 impressions
//   questions  question query on position <= 15 whose page has no matching FAQ
// Google uses the last 28 days, Bing its latest week. Items that were not in the
// previous run are marked `new`.
// Used by .github/workflows/analytics.yml on Mondays (or on manual runs); the
// result lands on the stats branch in stats/actions/.
// Usage: node scripts/search-actions.mjs --google <dir> --bing <dir> [--prev <file>] --out <dir>
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
if (!args.out) {
  console.error('Usage: node scripts/search-actions.mjs --google <dir> --bing <dir> [--prev <file>] --out <dir>');
  process.exit(1);
}

const DAYS = 28;
const MIN_IMPRESSIONS = 10;
const readJson = (file, fallback) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
};
const table = (dir, name) => (dir && existsSync(join(dir, `${name}.json`)) ? readJson(join(dir, `${name}.json`), []) : []);

// Bots and monitoring tools, not readers: search operators, boolean lists,
// pasted file paths and screen text.
const SPAM = [
  /\b(inurl|intitle|site|filetype|intext):/i,
  /\(.*\bor\b.*\)/i,
  /\bor\b.*\bor\b.*\bor\b/i,
  /[a-z]:\\|\\/i,
  /#r##n#/i,
  /skip to (navigation|main content)/i,
  /\S{40,}/,
];
const isSpam = (q) => SPAM.some((re) => re.test(q));

const QUESTION =
  /^(how|what|which|who|why|where|when|is|are|does|do|can|should|will|wie|was|welche[rsmn]?|wer|woher|wo|wann|warum|wieso|ist|sind|kann|brauche|braucht|gibt|lohnt)\b/i;
const isQuestion = (q) => q.trim().endsWith('?') || QUESTION.test(q.trim());

const STOP = new Set(
  'the and for with from that this what which how does can are your you about into than when where who why will der die das und mit von für ist sind ein eine einen einem was wie wer welche welcher welches wann warum woher wieso kann ich mein meine im in zu auf bei oder vs does gibt'.split(
    ' ',
  ),
);
const tokens = (s) =>
  new Set(
    s
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );
const overlap = (query, text) => {
  const q = tokens(query);
  if (!q.size) return 0;
  const t = tokens(text);
  return [...q].filter((w) => t.has(w)).length / q.size;
};

// Content index: slug -> title, meta title, FAQ questions and H2s.
function contentIndex() {
  const index = new Map();
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md')) {
        const src = readFileSync(p, 'utf8');
        const fm = /^---\n([\s\S]*?)\n---/.exec(src)?.[1] ?? '';
        const field = (name) => new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, 'm').exec(fm)?.[1] ?? '';
        const slug = field('slug') || e.name.replace(/\.md$/, '');
        index.set(slug, {
          file: p,
          title: field('title'),
          metaTitle: field('metaTitle'),
          questions: [
            ...[...fm.matchAll(/^\s*- q:\s*"(.*)"\s*$/gm)].map((m) => m[1]),
            ...[...src.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]),
          ],
        });
      }
    }
  };
  walk('src/content');
  return index;
}
const content = contentIndex();
const pathOf = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};
const pageInfo = (url) => content.get(pathOf(url).split('/').filter(Boolean).pop() ?? '') ?? null;

// Aggregate rows into one row per key, position weighted by impressions.
function aggregate(rows, keyOf) {
  const out = new Map();
  for (const r of rows) {
    const k = keyOf(r);
    const a = out.get(k) ?? { clicks: 0, impressions: 0, posSum: 0 };
    a.clicks += r.clicks;
    a.impressions += r.impressions;
    a.posSum += r.position * r.impressions;
    out.set(k, a);
  }
  return [...out].map(([key, a]) => ({
    key,
    clicks: a.clicks,
    impressions: a.impressions,
    position: a.impressions ? Math.round((a.posSum / a.impressions) * 10) / 10 : null,
  }));
}

// Google, last 28 days.
const pageDays = table(args.google, 'page_days');
const lastDay = pageDays.map((r) => r.day).sort().pop();
const from = lastDay
  ? new Date(Date.parse(lastDay) - (DAYS - 1) * 864e5).toISOString().slice(0, 10)
  : null;
const inWindow = (r) => from && r.day >= from && r.day <= lastDay;
const gPages = aggregate(pageDays.filter(inWindow), (r) => r.page);
const queryPages = aggregate(
  table(args.google, 'query_page_days').filter(inWindow),
  (r) => `${r.query}\t${r.page}`,
).map((r) => {
  const [query, page] = r.key.split('\t');
  return { ...r, query, page };
});
const gQueries = aggregate(table(args.google, 'query_days').filter(inWindow), (r) => r.query).map((r) => ({
  ...r,
  query: r.key,
}));

// Bing, latest week.
const bPages = table(args.bing, 'pages').map((r) => ({ ...r, key: r.page }));
const bQueries = table(args.bing, 'queries').map((r) => ({ ...r, key: r.query }));
const bingWeek = table(args.bing, 'query_periods').map((r) => r.period).sort().pop() ?? null;

const topQueries = (page) =>
  queryPages
    .filter((r) => r.page === page && !isSpam(r.query))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 3)
    .map((r) => ({ query: r.query, impressions: r.impressions, position: r.position }));

function pageItem(source, r) {
  const info = pageInfo(r.key);
  const top = source === 'google' ? topQueries(r.key) : [];
  return {
    source,
    page: r.key,
    path: pathOf(r.key),
    impressions: r.impressions,
    clicks: r.clicks,
    position: r.position,
    title: info?.metaTitle || info?.title || null,
    file: info?.file ?? null,
    topQueries: top,
  };
}

function snippetHint(item) {
  const main = item.topQueries[0]?.query;
  if (main && item.title && overlap(main, item.title) < 0.5) return `Title trifft die Hauptanfrage „${main}“ nicht`;
  if (main) return `Antwort auf „${main}“ in Description und ersten Satz`;
  return 'Title und Description schärfen, Antwort in den ersten Satz';
}
function nearHint(item) {
  const main = item.topQueries[0]?.query;
  return main ? `Abschnitt und interne Links zu „${main}“` : 'Interne Links von verwandten Seiten';
}

const rank = (a, b) => b.impressions - a.impressions || a.position - b.position;
const snippet = [
  ...gPages.filter((r) => r.position <= 10 && r.impressions >= MIN_IMPRESSIONS && r.clicks === 0).map((r) => pageItem('google', r)),
  ...bPages.filter((r) => r.position <= 10 && r.impressions >= MIN_IMPRESSIONS && r.clicks === 0).map((r) => pageItem('bing', r)),
]
  .map((i) => ({ ...i, hint: snippetHint(i) }))
  .sort(rank);
const nearPage1 = [
  ...gPages.filter((r) => r.position > 10 && r.position <= 20 && r.impressions >= MIN_IMPRESSIONS).map((r) => pageItem('google', r)),
  ...bPages.filter((r) => r.position > 10 && r.position <= 20 && r.impressions >= MIN_IMPRESSIONS).map((r) => pageItem('bing', r)),
]
  .map((i) => ({ ...i, hint: nearHint(i) }))
  .sort(rank);

function questionItem(source, r) {
  const shown = queryPages.filter((q) => q.query === r.query).sort((a, b) => b.impressions - a.impressions)[0];
  const info = shown ? pageInfo(shown.page) : null;
  // Without a known page (Bing, or no Google row per page) any page's FAQ counts.
  const candidates = info ? info.questions : [...content.values()].flatMap((c) => c.questions);
  const best = Math.max(0, ...candidates.map((q) => overlap(r.query, q)));
  return {
    source,
    query: r.query,
    impressions: r.impressions,
    position: r.position,
    page: shown?.page ?? null,
    path: shown ? pathOf(shown.page) : null,
    file: info?.file ?? null,
    covered: best >= 0.6,
  };
}
const questions = [
  ...gQueries.filter((r) => r.position <= 15 && isQuestion(r.query) && !isSpam(r.query)).map((r) => questionItem('google', r)),
  ...bQueries.filter((r) => r.position <= 15 && isQuestion(r.query) && !isSpam(r.query)).map((r) => questionItem('bing', r)),
]
  .filter((q) => !q.covered)
  .sort(rank);

const spamRows = [
  ...gQueries.filter((r) => isSpam(r.query)).map((r) => ({ source: 'google', query: r.query, impressions: r.impressions })),
  ...bQueries.filter((r) => isSpam(r.query)).map((r) => ({ source: 'bing', query: r.query, impressions: r.impressions })),
];

// Mark what is new compared with the previous run.
const prev = args.prev ? readJson(args.prev, null) : null;
const keyOf = (i) => `${i.source}|${i.page ?? ''}|${i.query ?? ''}`;
const seen = new Set(
  prev ? [...(prev.snippet ?? []), ...(prev.nearPage1 ?? []), ...(prev.questions ?? [])].map(keyOf) : [],
);
const mark = (list) => list.map((i) => ({ ...i, new: prev ? !seen.has(keyOf(i)) : false }));

const result = {
  generatedAt: new Date().toISOString(),
  window: { google: from ? { from, to: lastDay } : null, bingWeek },
  rules: {
    snippet: 'Platz ≤ 10 · ≥ 10 Impr. · 0 Klicks',
    nearPage1: 'Platz 11–20 · ≥ 10 Impr.',
    questions: 'Frage-Anfrage · Platz ≤ 15 · keine passende FAQ',
  },
  snippet: mark(snippet),
  nearPage1: mark(nearPage1),
  questions: mark(questions),
  spam: {
    queries: spamRows.length,
    impressions: spamRows.reduce((n, r) => n + r.impressions, 0),
    list: spamRows.sort((a, b) => b.impressions - a.impressions),
  },
};
result.counts = {
  snippet: result.snippet.length,
  nearPage1: result.nearPage1.length,
  questions: result.questions.length,
  new: [...result.snippet, ...result.nearPage1, ...result.questions].filter((i) => i.new).length,
  spam: result.spam.queries,
};

mkdirSync(args.out, { recursive: true });
writeFileSync(join(args.out, 'latest.json'), JSON.stringify(result, null, 1) + '\n');
console.log(
  `Search actions: ${result.counts.snippet} snippet, ${result.counts.nearPage1} near page 1, ` +
    `${result.counts.questions} questions, ${result.counts.new} new, ${result.counts.spam} spam queries`,
);
