// Pulls Google Search Console data for the domain property fk-sd.de and writes
// a raw snapshot plus one JSON file of rows per dashboard table:
// clicks, impressions and position per day, per query and per page (also per
// day, so the dashboard can drill into a day, week or month), and the index
// status of every sitemap URL via the URL Inspection API.
// Auth: a Google Cloud service account (JSON key in GSC_SERVICE_ACCOUNT_JSON)
// that was added as a user of the property in Search Console. No extra
// packages; the token request is signed with node:crypto.
// Used by .github/workflows/analytics.yml; without the secret it only prints a
// notice, so the daily run keeps working until the key exists.
// Usage: node scripts/fetch-gsc.mjs <out-dir>
import { createSign } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2];
if (!outDir) {
  console.error('Usage: node scripts/fetch-gsc.mjs <out-dir>');
  process.exit(1);
}
const keyJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!keyJson) {
  console.log('GSC_SERVICE_ACCOUNT_JSON not set, skipping Google Search Console.');
  process.exit(0);
}

const SITE = process.env.GSC_SITE || 'sc-domain:fk-sd.de';
const SITEMAP = 'https://www.fk-sd.de/sitemap-index.xml';
// Search Console keeps 16 months; the site went live on the domain in October 2026.
const START = '2026-10-01';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

const key = JSON.parse(keyJson);

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email,
    scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`token: HTTP ${res.status} ${JSON.stringify(body).slice(0, 300)}`);
  return body.access_token;
}

const token = await accessToken();

async function api(url, payload) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      method: payload ? 'POST' : 'GET',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const text = await res.text();
    if (res.ok) return JSON.parse(text);
    if ((res.status === 429 || res.status >= 500) && attempt < 3) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    if (res.status === 403) {
      throw new Error(
        `HTTP 403 for ${SITE}: add ${key.client_email} as a user of the property in Search Console. ${text.slice(0, 200)}`,
      );
    }
    throw new Error(`${url}: HTTP ${res.status} ${text.slice(0, 300)}`);
  }
}

const site = encodeURIComponent(SITE);
const today = new Date().toISOString().slice(0, 10);

// Search analytics; pages through results so long-tail rows are not cut off.
async function analytics(dimensions) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await api(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
      startDate: START,
      endDate: today,
      dimensions,
      type: 'web',
      // Includes the last two days, which Google still marks as preliminary.
      dataState: 'all',
      rowLimit: 25000,
      startRow,
    });
    rows.push(...(res.rows ?? []));
    if (!res.rows || res.rows.length < 25000) break;
  }
  return rows.map((r) => ({
    ...Object.fromEntries(dimensions.map((d, i) => [d === 'date' ? 'day' : d, r.keys[i]])),
    clicks: r.clicks,
    impressions: r.impressions,
    position: Math.round(r.position * 10) / 10,
  }));
}

const byImpressions = (a, b) => b.impressions - a.impressions || b.clicks - a.clicks;
const [daily, queries, pages, queryDays, pageDays, devices, countries] = await Promise.all([
  analytics(['date']).then((rows) => rows.sort((a, b) => a.day.localeCompare(b.day))),
  analytics(['query']).then((rows) => rows.sort(byImpressions)),
  analytics(['page']).then((rows) => rows.sort(byImpressions)),
  analytics(['date', 'query']).then((rows) => rows.sort((a, b) => a.day.localeCompare(b.day) || byImpressions(a, b))),
  analytics(['date', 'page']).then((rows) => rows.sort((a, b) => a.day.localeCompare(b.day) || byImpressions(a, b))),
  analytics(['device']).then((rows) => rows.sort(byImpressions)),
  analytics(['country']).then((rows) => rows.sort(byImpressions)),
]);

// Sitemaps as Google sees them (last read, errors, submitted URLs).
const sitemaps = ((await api(`https://www.googleapis.com/webmasters/v3/sites/${site}/sitemaps`)).sitemap ?? []).map(
  (s) => ({
    path: s.path,
    lastDownloaded: s.lastDownloaded ?? null,
    errors: Number(s.errors ?? 0),
    warnings: Number(s.warnings ?? 0),
    submitted: (s.contents ?? []).reduce((n, c) => n + Number(c.submitted ?? 0), 0),
  }),
);

// Every URL from the live sitemap, inspected one by one (quota: 2,000 a day).
async function sitemapUrls(url) {
  const xml = await (await fetch(url)).text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (/<sitemapindex/.test(xml)) return (await Promise.all(locs.map(sitemapUrls))).flat();
  return locs;
}
const urls = [...new Set(await sitemapUrls(SITEMAP))];

const inspections = [];
let failed = 0;
const queue = [...urls];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        const r = (
          await api('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
            inspectionUrl: url,
            siteUrl: SITE,
          })
        ).inspectionResult?.indexStatusResult ?? {};
        inspections.push({
          url,
          verdict: r.verdict ?? null,
          coverage: r.coverageState ?? null,
          lastCrawl: r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : null,
          googleCanonical: r.googleCanonical && r.googleCanonical !== url ? r.googleCanonical : null,
        });
      } catch (err) {
        failed++;
        if (failed <= 3) console.error(`inspect ${url}: ${err.message}`);
      }
    }
  }),
);
inspections.sort((a, b) => a.url.localeCompare(b.url));

const counts = (list, field) =>
  Object.entries(
    list.reduce((acc, r) => ((acc[r[field] ?? 'unbekannt'] = (acc[r[field] ?? 'unbekannt'] ?? 0) + 1), acc), {}),
  )
    .map(([name, urls]) => ({ [field]: name, urls }))
    .sort((a, b) => b.urls - a.urls);

const index = {
  day: today,
  sitemapUrls: urls.length,
  inspected: inspections.length,
  failed,
  indexed: inspections.filter((r) => r.verdict === 'PASS').length,
  byCoverage: counts(inspections, 'coverage'),
};

const tables = {
  daily,
  queries,
  pages,
  query_days: queryDays,
  page_days: pageDays,
  devices,
  countries,
  index_summary: [index],
  index_urls: inspections,
  sitemaps,
};

mkdirSync(join(outDir, 'dashboard'), { recursive: true });
writeFileSync(
  join(outDir, 'latest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), site: SITE, ...tables }, null, 1) + '\n',
);
for (const [name, data] of Object.entries(tables)) {
  writeFileSync(join(outDir, 'dashboard', `${name}.json`), JSON.stringify(data, null, 1) + '\n');
}
console.log(
  `Google: ${SITE}, ${daily.length} days, ${queries.length} queries, ${pages.length} pages, ` +
    `${index.indexed}/${index.inspected} sitemap URLs indexed (${failed} inspections failed)`,
);
