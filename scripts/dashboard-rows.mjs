// Turns a snapshot from fetch-analytics.mjs into one JSON file of rows per
// table, as the analytics dashboard in the project reads them.
// Usage: node scripts/dashboard-rows.mjs <snapshot.json> <out-dir>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [input, outDir] = process.argv.slice(2);
const snap = JSON.parse(readFileSync(input, 'utf8'));
const counts = (g) => ({ pageviews: g.count, visits: g.sum?.visits ?? 0 });
const rows = (list, key, dim, empty) =>
  (list ?? []).map((g) => ({ [key]: g.dimensions[dim] || empty, ...counts(g) }));

// Cloudflare leaves out days without visits; list every day of the range.
const byDay = new Map((snap.daily ?? []).map((g) => [g.dimensions.date, counts(g)]));
const daily = [];
for (let d = new Date(snap.range.start); d <= new Date(snap.range.end); d.setUTCDate(d.getUTCDate() + 1)) {
  const day = d.toISOString().slice(0, 10);
  daily.push({ day, ...(byDay.get(day) ?? { pageviews: 0, visits: 0 }) });
}

const tables = {
  daily,
  pages: rows(snap.pages, 'page', 'requestPath', '/'),
  sources: rows(snap.referers, 'source', 'refererHost', 'Direct'),
  countries: rows(snap.countries, 'country', 'countryName', 'Unknown'),
  devices: rows(snap.devices, 'device', 'deviceType', 'Unknown'),
  browsers: rows(snap.browsers, 'browser', 'userAgentBrowser', 'Unknown'),
};
mkdirSync(outDir, { recursive: true });
for (const [name, data] of Object.entries(tables)) {
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(data, null, 1) + '\n');
}
