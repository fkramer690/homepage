// Weekly Google rankings and search volumes for the keywords in seo/keywords.json,
// queried from DataForSEO and printed as JSON. Used by .github/workflows/rankings.yml.
import { readFile } from 'node:fs/promises';

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  process.exit(1);
}

const DOMAIN = 'fk-sd.de';
const LOCATION = 2276; // Germany
const DEPTH = 50;
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

async function call(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  const task = json.tasks?.[0];
  if (!res.ok || json.status_code !== 20000 || !task || task.status_code !== 20000) {
    throw new Error(`${path}: ${task?.status_message ?? json.status_message ?? res.status}`);
  }
  cost += task.cost ?? 0;
  return task.result ?? [];
}

const keywords = JSON.parse(await readFile(new URL('../seo/keywords.json', import.meta.url), 'utf8'));
const [account] = await call('appendix/user_data');
const balanceBefore = account?.money?.balance;
console.error(`DataForSEO login ok, balance ${balanceBefore} USD`);

const languages = {};
for (const lang of ['de', 'en']) {
  const list = keywords[lang] ?? [];
  const volumes = {};
  try {
    const rows = await call('keywords_data/google_ads/search_volume/live', [
      { keywords: list, location_code: LOCATION, language_code: lang },
    ]);
    for (const r of rows) volumes[r.keyword] = { volume: r.search_volume, cpc: r.cpc, competition: r.competition };
  } catch (err) {
    console.error(`search volume (${lang}) failed: ${err.message}`);
  }

  const rows = [];
  for (const keyword of list) {
    try {
      const [serp] = await call('serp/google/organic/live/regular', [
        { keyword, location_code: LOCATION, language_code: lang, depth: DEPTH },
      ]);
      const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
      const hit = organic.find((i) => i.domain === DOMAIN || i.domain?.endsWith(`.${DOMAIN}`));
      rows.push({
        keyword,
        position: hit?.rank_group ?? null,
        url: hit?.url ?? null,
        ...(volumes[keyword.toLowerCase()] ?? volumes[keyword] ?? {}),
        top3: organic.slice(0, 3).map((i) => i.domain),
      });
    } catch (err) {
      console.error(`serp "${keyword}" (${lang}) failed: ${err.message}`);
      rows.push({ keyword, error: err.message });
    }
  }
  languages[lang] = rows;
}

console.error(`cost of this run ${cost.toFixed(4)} USD`);
console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  domain: DOMAIN,
  location: 'Germany',
  depth: DEPTH,
  balanceBefore,
  cost: Number(cost.toFixed(4)),
  ...languages,
}, null, 2));
