// Reads the counts of the event counter (workers/events: "Book a call" clicks and
// contact forms Web3Forms accepted) from Workers Analytics Engine and keeps the full
// history: Analytics Engine keeps data for three months only, so each run merges the
// last 90 days into the previous snapshot. Used by .github/workflows/analytics.yml.
// Without CF_API_TOKEN / CF_ACCOUNT_ID, or before the dataset exists, it only prints
// a notice so the daily run keeps working.
// Usage: node scripts/fetch-events.mjs <out-dir> [previous latest.json]
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [outDir, prevPath] = process.argv.slice(2);
if (!outDir) {
  console.error('Usage: node scripts/fetch-events.mjs <out-dir> [previous latest.json]');
  process.exit(1);
}
const { CF_API_TOKEN: token, CF_ACCOUNT_ID: account } = process.env;
if (!token || !account) {
  console.log('CF_API_TOKEN or CF_ACCOUNT_ID not set, skipping events.');
  process.exit(0);
}

const sql = `SELECT toDate(timestamp) AS day, blob1 AS event, blob2 AS path, SUM(_sample_interval) AS n
FROM fk_sd_events WHERE timestamp > NOW() - INTERVAL '90' DAY
GROUP BY day, event, path ORDER BY day FORMAT JSON`;
const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: sql,
});
const text = await res.text();
if (!res.ok) {
  // A missing dataset (no event yet) is not an error.
  if (/unknown table|does not exist/i.test(text)) {
    console.log('No events recorded yet.');
    process.exit(0);
  }
  throw new Error(`Analytics Engine: HTTP ${res.status} ${text.slice(0, 300)}`);
}
const fresh = JSON.parse(text).data ?? [];

// Previous history wins for days older than the 90-day window; newer days come from the query.
const prev = prevPath && existsSync(prevPath) ? JSON.parse(readFileSync(prevPath, 'utf8')) : { rows: [] };
const cutoff = new Date(Date.now() - 89 * 864e5).toISOString().slice(0, 10);
const rows = [
  ...prev.rows.filter(([day]) => day < cutoff),
  ...fresh.map((r) => [String(r.day).slice(0, 10), r.event, r.path, Number(r.n)]).filter(([day]) => day >= cutoff),
].sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]) || a[2].localeCompare(b[2]));

const totals = {};
for (const [, event, , n] of rows) totals[event] = (totals[event] ?? 0) + n;
mkdirSync(outDir, { recursive: true });
// rows: [day, event ("termin" | "formular"), page path, count]
writeFileSync(join(outDir, 'latest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), rows, totals }, null, 1));
console.log(`Events: ${rows.length} rows, totals ${JSON.stringify(totals)}`);
