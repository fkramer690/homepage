// Weekly Google rankings and search volumes for the keywords in seo/keywords.json,
// whether Google shows an AI Overview and cites fk-sd.de in it, and every keyword
// fk-sd.de ranks for (DataForSEO Labs). Printed as JSON; used by .github/workflows/rankings.yml.
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
const isOwn = (domain) => domain === DOMAIN || Boolean(domain?.endsWith(`.${DOMAIN}`));
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

// Live SERP calls fail now and then with "Internal SE Server Error"; one retry fixes most.
async function call(path, body, retries = 1) {
  try {
    return await request(path, body);
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, 5000));
    return call(path, body, retries - 1);
  }
}

async function request(path, body) {
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
const ranked = {};
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
      const [serp] = await call('serp/google/organic/live/advanced', [
        { keyword, location_code: LOCATION, language_code: lang, depth: DEPTH, load_async_ai_overview: true },
      ]);
      const items = serp?.items ?? [];
      const organic = items.filter((i) => i.type === 'organic');
      const hit = organic.find((i) => isOwn(i.domain));
      const aiOverview = items.find((i) => i.type === 'ai_overview');
      const questions = items.filter((i) => i.type === 'people_also_ask').flatMap((i) => i.items ?? []);
      rows.push({
        keyword,
        position: hit?.rank_group ?? null,
        url: hit?.url ?? null,
        ...(volumes[keyword.toLowerCase()] ?? volumes[keyword] ?? {}),
        aiOverview: Boolean(aiOverview),
        aiCited: aiOverview ? JSON.stringify(aiOverview).includes(DOMAIN) : false,
        questions: questions.map((q) => q.title).filter(Boolean).slice(0, 4),
        top3: organic.slice(0, 3).map((i) => i.domain),
      });
    } catch (err) {
      console.error(`serp "${keyword}" (${lang}) failed: ${err.message}`);
      rows.push({ keyword, error: err.message });
    }
  }
  languages[lang] = rows;

  try {
    const [labs] = await call('dataforseo_labs/google/ranked_keywords/live', [
      { target: DOMAIN, location_code: LOCATION, language_code: lang, item_types: ['organic'], limit: 200 },
    ]);
    ranked[lang] = (labs?.items ?? []).map((i) => ({
      keyword: i.keyword_data?.keyword,
      position: i.ranked_serp_element?.serp_item?.rank_group ?? null,
      volume: i.keyword_data?.keyword_info?.search_volume ?? null,
      url: i.ranked_serp_element?.serp_item?.url ?? null,
    }));
  } catch (err) {
    console.error(`ranked keywords (${lang}) failed: ${err.message}`);
  }
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
  ranked,
}, null, 2));
