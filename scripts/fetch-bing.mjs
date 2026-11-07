// Pulls search data for www.fk-sd.de from the Bing Webmaster Tools API and
// writes a raw snapshot plus one JSON file of rows per dashboard table.
// Bing matters beyond Bing itself: ChatGPT search and Copilot use its index.
// Used by .github/workflows/analytics.yml; without BING_WEBMASTER_API_KEY it
// only prints a notice, so the daily run keeps working until the key exists.
// Usage: node scripts/fetch-bing.mjs <out-dir>
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const apiKey = process.env.BING_WEBMASTER_API_KEY;
const outDir = process.argv[2];
if (!outDir) {
  console.error('Usage: node scripts/fetch-bing.mjs <out-dir>');
  process.exit(1);
}
if (!apiKey) {
  console.log('BING_WEBMASTER_API_KEY not set, skipping Bing.');
  process.exit(0);
}

const base = 'https://ssl.bing.com/webmaster/api.svc/json';
async function call(method, siteUrl) {
  const params = new URLSearchParams({ apikey: apiKey });
  if (siteUrl) params.set('siteUrl', siteUrl);
  const res = await fetch(`${base}/${method}?${params}`);
  const text = await res.text();
  if (!res.ok) throw new Error(`${method}: HTTP ${res.status} ${text.slice(0, 300)}`);
  return JSON.parse(text).d ?? [];
}

// Bing returns dates as "/Date(1730419200000)/" or "/Date(1730419200000-0700)/".
const isoDay = (value) => {
  const ms = Number(/\/Date\((-?\d+)/.exec(String(value))?.[1]);
  return Number.isFinite(ms) ? new Date(ms).toISOString().slice(0, 10) : null;
};

// The site may be registered with or without www, or imported from Search Console.
const sites = await call('GetUserSites');
const site =
  sites.find((s) => /^https:\/\/www\.fk-sd\.de\/?$/i.test(s.Url)) ??
  sites.find((s) => /fk-sd\.de/i.test(s.Url));
if (!site) {
  console.error(`fk-sd.de not found among Bing sites: ${sites.map((s) => s.Url).join(', ') || 'none'}`);
  process.exit(1);
}
const siteUrl = site.Url;

const [traffic, queryStats, pageStats, crawl] = await Promise.all([
  call('GetRankAndTrafficStats', siteUrl),
  call('GetQueryStats', siteUrl),
  call('GetPageStats', siteUrl),
  call('GetCrawlStats', siteUrl),
]);

const daily = traffic
  .map((r) => ({ day: isoDay(r.Date), clicks: r.Clicks ?? 0, impressions: r.Impressions ?? 0 }))
  .filter((r) => r.day)
  .sort((a, b) => a.day.localeCompare(b.day));

// Query and page stats come as weekly entries; add them up per query/page.
function totals(list, key) {
  const map = new Map();
  for (const r of list) {
    const name = r.Query;
    if (!name) continue;
    const t = map.get(name) ?? { [key]: name, clicks: 0, impressions: 0, posSum: 0 };
    t.clicks += r.Clicks ?? 0;
    t.impressions += r.Impressions ?? 0;
    t.posSum += (r.AvgImpressionPosition ?? 0) * (r.Impressions ?? 0);
    map.set(name, t);
  }
  return [...map.values()]
    .map(({ posSum, ...t }) => ({ ...t, position: t.impressions ? Math.round((posSum / t.impressions) * 10) / 10 : null }))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .slice(0, 50);
}

const index = crawl
  .map((r) => ({
    day: isoDay(r.Date),
    inIndex: r.InIndex ?? 0,
    crawledPages: r.CrawledPages ?? 0,
    crawlErrors: r.CrawlErrors ?? 0,
  }))
  .filter((r) => r.day)
  .sort((a, b) => a.day.localeCompare(b.day));

const tables = {
  daily,
  queries: totals(queryStats, 'query'),
  pages: totals(pageStats, 'page'),
  index,
};

mkdirSync(join(outDir, 'dashboard'), { recursive: true });
writeFileSync(
  join(outDir, 'latest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), siteUrl, ...tables }, null, 1) + '\n',
);
for (const [name, data] of Object.entries(tables)) {
  writeFileSync(join(outDir, 'dashboard', `${name}.json`), JSON.stringify(data, null, 1) + '\n');
}
console.log(
  `Bing: ${siteUrl}, ${daily.length} days, ${tables.queries.length} queries, ${tables.pages.length} pages, ` +
    `${index.at(-1)?.inIndex ?? 0} pages in index`,
);
