// One-off long-tail research: DataForSEO Labs keyword suggestions (phrases that
// contain the seed) for the seeds in seo/research-seeds.json, Google Germany.
// SEEDS_DE / SEEDS_EN (comma-separated) replace the file's seeds for one run;
// VOLUMES_DE / VOLUMES_EN (comma-separated) add exact search volumes for candidate
// phrases that suggestions do not cover; SERP_DE / SERP_EN (comma-separated) print the
// top ten organic results per phrase to check search intent. DataForSEO Labs has no
// English data for Germany, so English suggestions use LOCATION_EN (default USA). Prints a tab-separated list to stdout;
// used by .github/workflows/keyword-research.yml.
import { readFile } from 'node:fs/promises';

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  process.exit(1);
}

const LOCATION = 2276; // Germany
const LABS_LOCATION = { de: LOCATION, en: Number(process.env.LOCATION_EN) || 2840 };
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

async function call(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  const task = json.tasks?.[0];
  if (!res.ok || json.status_code !== 20000 || !task || task.status_code !== 20000) {
    throw new Error(`${path}: ${task?.status_message ?? json.status_message ?? res.status}`);
  }
  cost += task.cost ?? 0;
  return task.result ?? [];
}

const list = (value) => (value ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const seeds = JSON.parse(await readFile(new URL('../seo/research-seeds.json', import.meta.url), 'utf8'));
for (const lang of ['de', 'en']) {
  const override = list(process.env[`SEEDS_${lang.toUpperCase()}`]);
  if (override.length) seeds[lang] = override;
}
const seen = new Set();
console.log(['lang', 'seed', 'keyword', 'volume', 'difficulty', 'intent', 'cpc'].join('\t'));
for (const lang of ['de', 'en']) {
  for (const seed of seeds[lang] ?? []) {
    try {
      const [r] = await call('dataforseo_labs/google/keyword_suggestions/live', [
        {
          keyword: seed,
          location_code: LABS_LOCATION[lang],
          language_code: lang,
          include_seed_keyword: true,
          limit: 300,
          order_by: ['keyword_info.search_volume,desc'],
        },
      ]);
      for (const i of r?.items ?? []) {
        const key = `${lang}:${i.keyword}`;
        if (seen.has(key)) continue;
        seen.add(key);
        console.log([
          lang,
          seed,
          i.keyword,
          i.keyword_info?.search_volume ?? '',
          i.keyword_properties?.keyword_difficulty ?? '',
          i.search_intent_info?.main_intent ?? '',
          i.keyword_info?.cpc ?? '',
        ].join('\t'));
      }
    } catch (err) {
      console.error(`suggestions "${seed}" (${lang}) failed: ${err.message}`);
    }
  }
}
for (const lang of ['de', 'en']) {
  const candidates = list(process.env[`VOLUMES_${lang.toUpperCase()}`]);
  if (!candidates.length) continue;
  try {
    const rows = await call('keywords_data/google_ads/search_volume/live', [
      { keywords: candidates, location_code: LOCATION, language_code: lang },
    ]);
    for (const r of rows) {
      console.log([lang, '(volume)', r.keyword, r.search_volume ?? '', '', '', r.cpc ?? ''].join('\t'));
    }
  } catch (err) {
    console.error(`search volume (${lang}) failed: ${err.message}`);
  }
}
for (const lang of ['de', 'en']) {
  for (const keyword of list(process.env[`SERP_${lang.toUpperCase()}`])) {
    try {
      const [serp] = await call('serp/google/organic/live/advanced', [
        { keyword, location_code: LOCATION, language_code: lang, depth: 10 },
      ]);
      const organic = (serp?.items ?? []).filter((i) => i.type === 'organic');
      for (const i of organic.slice(0, 10)) {
        console.log([lang, '(serp)', keyword, i.rank_group, i.domain, (i.title ?? '').replace(/\t/g, ' ')].join('\t'));
      }
    } catch (err) {
      console.error(`serp "${keyword}" (${lang}) failed: ${err.message}`);
    }
  }
}
console.error(`cost of this run ${cost.toFixed(4)} USD, ${seen.size} keywords`);
