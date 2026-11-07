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

// Live SERP calls fail now and then with "Internal SE Server Error" (3 of 81 on 2026-11-02
// despite one retry). Three retries with growing pauses, and failed keywords get a second
// pass at the end of the run.
const WAITS = [5000, 20000, 60000];
async function call(path, body, attempt = 0) {
  try {
    return await request(path, body);
  } catch (err) {
    if (attempt >= WAITS.length) throw err;
    await new Promise((r) => setTimeout(r, WAITS[attempt]));
    return call(path, body, attempt + 1);
  }
}

// Since 2026-11 Google mixes its own links (AI Mode, "more results", search redirects) into
// the organic list; DataForSEO reports them as organic items with domain google.com (140 of
// 234 top-3 slots on 2026-11-02). Redirect links are unwrapped to their target; the rest are
// dropped, and positions are counted on the cleaned list.
const GOOGLE_HOST = /^(www\.)?google\.[a-z.]+$/;
function cleanOrganic(item) {
  let url = item.url ?? '';
  let host = '';
  try {
    const u = new URL(url);
    host = u.hostname;
    const target = GOOGLE_HOST.test(host) && (u.searchParams.get('q') ?? u.searchParams.get('url'));
    if (target && /^https?:\/\//.test(target)) {
      url = target;
      host = new URL(target).hostname;
    }
  } catch {
    host = item.domain ?? '';
  }
  if (GOOGLE_HOST.test(host || item.domain || '')) return null;
  return { ...item, url, domain: host || item.domain };
}
const googleSamples = [];
let googleDropped = 0;

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
  const serpRow = async (keyword) => {
    try {
      const [serp] = await call('serp/google/organic/live/advanced', [
        { keyword, location_code: LOCATION, language_code: lang, depth: DEPTH, load_async_ai_overview: true },
      ]);
      const items = serp?.items ?? [];
      const rawOrganic = items.filter((i) => i.type === 'organic');
      const organic = rawOrganic.map(cleanOrganic).filter(Boolean);
      const dropped = rawOrganic.length - organic.length;
      googleDropped += dropped;
      if (dropped && googleSamples.length < 5) {
        const sample = rawOrganic.find((i) => GOOGLE_HOST.test(i.domain ?? ''));
        googleSamples.push({ keyword, url: sample?.url, title: sample?.title, rank: sample?.rank_group });
      }
      const index = organic.findIndex((i) => isOwn(i.domain));
      const hit = organic[index];
      const aiOverview = items.find((i) => i.type === 'ai_overview');
      const aiSources = [
        ...new Set(
          [...JSON.stringify(aiOverview ?? {}).matchAll(/"domain":"([^"]+)"/g)].map((m) => m[1].replace(/^www\./, '')),
        ),
      ];
      const questions = items.filter((i) => i.type === 'people_also_ask').flatMap((i) => i.items ?? []);
      return {
        keyword,
        position: hit ? index + 1 : null,
        url: hit?.url ?? null,
        ...(volumes[keyword.toLowerCase()] ?? volumes[keyword] ?? {}),
        // The element can be present without content when no overview loaded.
        aiOverview: aiSources.length > 0 || Boolean(aiOverview?.markdown),
        aiCited: aiSources.some((d) => isOwn(d)),
        aiSources: aiSources.slice(0, 5),
        questions: questions.map((q) => q.title).filter(Boolean).slice(0, 4),
        top3: organic.slice(0, 3).map((i) => i.domain),
        ...(dropped ? { googleDropped: dropped } : {}),
      };
    } catch (err) {
      console.error(`serp "${keyword}" (${lang}) failed: ${err.message}`);
      return { keyword, error: err.message };
    }
  };
  for (const keyword of list) rows.push(await serpRow(keyword));
  // Second pass for keywords that failed even after the retries.
  for (const [i, row] of rows.entries()) {
    if (!row.error) continue;
    await new Promise((r) => setTimeout(r, 30000));
    rows[i] = await serpRow(row.keyword);
  }
  languages[lang] = rows;

  // DataForSEO Labs only has German for location Germany.
  if (lang === 'de') try {
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

const failed = Object.values(languages).flat().filter((r) => r.error).map((r) => r.keyword);
console.error(`google.com links dropped from organic results: ${googleDropped}`);
for (const s of googleSamples) console.error(`  e.g. "${s.keyword}" #${s.rank}: ${s.url} (${s.title})`);
console.error(`failed keywords: ${failed.length ? failed.join(', ') : 'none'}`);
console.error(`cost of this run ${cost.toFixed(4)} USD`);
console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  domain: DOMAIN,
  location: 'Germany',
  depth: DEPTH,
  balanceBefore,
  cost: Number(cost.toFixed(4)),
  // Data quality of this run: Google's own links removed from the organic list, and
  // keywords whose SERP could not be fetched. A run with failures is not comparable.
  quality: { googleDropped, googleSamples, failed },
  ...languages,
  ranked,
}, null, 2));
