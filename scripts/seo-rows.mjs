// Turns the DataForSEO snapshots on the stats branch (rankings/ and ai/) into one
// JSON file of rows per table, as the analytics dashboard in the project reads them.
// Usage: node scripts/seo-rows.mjs <stats-dir> <out-dir>
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [statsDir, outDir] = process.argv.slice(2);
const snapshots = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
        .sort()
        .map((f) => ({ date: f.slice(0, 10), ...JSON.parse(readFileSync(join(dir, f), 'utf8')) }))
    : [];
const path = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
};
const LANGS = ['de', 'en'];

const rankings = snapshots(join(statsDir, 'rankings'));
const latest = rankings.at(-1);
const previous = rankings.at(-2);
const prevPos = new Map(LANGS.flatMap((l) => (previous?.[l] ?? []).map((r) => [`${l}:${r.keyword}`, r.position ?? null])));

const keywords = LANGS.flatMap((lang) =>
  (latest?.[lang] ?? []).filter((r) => !r.error).map((r) => ({
    key: `${lang}:${r.keyword}`,
    lang: lang.toUpperCase(),
    keyword: r.keyword,
    position: r.position ?? null,
    previous: prevPos.get(`${lang}:${r.keyword}`) ?? null,
    volume: r.volume ?? null,
    page: r.url ? path(r.url) : null,
    aiOverview: r.aiOverview === undefined ? null : r.aiOverview ? 'ja' : 'nein',
    aiCited: r.aiCited === undefined ? null : r.aiCited ? 'ja' : 'nein',
    questions: (r.questions ?? []).join(' | '),
  })),
);

const trend = rankings.map((s) => {
  const rows = LANGS.flatMap((l) => (s[l] ?? []).filter((r) => !r.error));
  const within = (n) => rows.filter((r) => r.position != null && r.position <= n).length;
  return {
    date: s.date,
    tracked: rows.length,
    top10: within(10),
    top20: within(20),
    top50: within(50),
    aiOverviews: rows.filter((r) => r.aiOverview).length,
    aiCited: rows.filter((r) => r.aiCited).length,
  };
});

const ranked = LANGS.flatMap((lang) =>
  (latest?.ranked?.[lang] ?? []).filter((r) => r.keyword).map((r) => ({
    key: `${lang}:${r.keyword}`,
    lang: lang.toUpperCase(),
    keyword: r.keyword,
    position: r.position,
    volume: r.volume,
    page: r.url ? path(r.url) : null,
  })),
);

const ai = snapshots(join(statsDir, 'ai'));
const aiLatest = ai.at(-1);
const aiSummary = ai.flatMap((s) => {
  const providers = [...new Set(s.answers.map((a) => a.provider))];
  return providers.map((provider) => {
    const list = s.answers.filter((a) => a.provider === provider && !a.error);
    return {
      key: `${s.date}:${provider}`,
      date: s.date,
      provider,
      answers: list.length,
      cited: list.filter((a) => a.cited).length,
      mentioned: list.filter((a) => a.mentioned).length,
    };
  });
});
const aiAnswers = (aiLatest?.answers ?? []).filter((a) => !a.error).map((a) => ({
  key: `${a.provider}:${a.prompt}`,
  provider: a.provider,
  lang: a.lang.toUpperCase(),
  prompt: a.prompt,
  cited: a.cited ? 'ja' : 'nein',
  mentioned: a.mentioned ? 'ja' : 'nein',
  sources: a.domains.slice(0, 3).join(', '),
}));
const domainCounts = new Map();
for (const a of aiLatest?.answers ?? []) for (const d of a.domains ?? []) domainCounts.set(d, (domainCounts.get(d) ?? 0) + 1);
const aiDomains = [...domainCounts]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([domain, citations]) => ({ domain, citations }));

const tables = {
  seo_keywords: keywords,
  seo_trend: trend,
  seo_ranked: ranked,
  ai_summary: aiSummary,
  ai_answers: aiAnswers,
  ai_domains: aiDomains,
};
mkdirSync(outDir, { recursive: true });
for (const [name, data] of Object.entries(tables)) {
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(data, null, 1) + '\n');
}
