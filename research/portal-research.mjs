// One-off market research: which freelancer portals rank in Google (DE/AT/CH) for
// Salesforce freelancer keywords, which domains AI assistants cite for "recommend a
// freelance Salesforce architect" prompts, and the Labs footprint of each portal.
const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  process.exit(1);
}
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

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
const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
};

const DE = 2276, AT = 2040, CH = 2756;
const serpKeywords = [
  ...[
    'salesforce freelancer', 'salesforce freelancer finden', 'freiberuflicher salesforce berater',
    'salesforce berater freiberuflich', 'salesforce architect freelance', 'salesforce solution architect freelancer',
    'salesforce consultant freelance', 'salesforce entwickler freelancer', 'salesforce freelance projekte',
    'salesforce projekte', 'salesforce experte', 'salesforce berater', 'salesforce interim manager',
    'salesforce field service freelancer', 'salesforce architekt', 'freelancer salesforce deutschland',
    'it freelancer finden', 'freelancer portal it', 'it freelancer plattform',
  ].map((k) => ({ keyword: k, location_code: DE, language_code: 'de' })),
  ...['freelance salesforce architect', 'hire salesforce consultant', 'salesforce freelancer germany', 'hire salesforce developer']
    .map((k) => ({ keyword: k, location_code: DE, language_code: 'en' })),
  ...['salesforce freelancer', 'salesforce berater'].flatMap((k) => [
    { keyword: k, location_code: AT, language_code: 'de' },
    { keyword: k, location_code: CH, language_code: 'de' },
  ]),
];

const volumes = {};
for (const lang of ['de', 'en']) {
  const list = [...new Set(serpKeywords.filter((k) => k.language_code === lang && k.location_code === DE).map((k) => k.keyword))];
  try {
    const rows = await call('keywords_data/google_ads/search_volume/live', [{ keywords: list, location_code: DE, language_code: lang }]);
    for (const r of rows) volumes[`${lang}:${r.keyword}`] = { volume: r.search_volume, cpc: r.cpc, competition: r.competition };
  } catch (err) { console.error(`volume ${lang}: ${err.message}`); }
}

const serps = [];
for (const k of serpKeywords) {
  try {
    const [serp] = await call('serp/google/organic/live/advanced', [{ ...k, depth: 30, load_async_ai_overview: true }]);
    const items = serp?.items ?? [];
    const ai = items.find((i) => i.type === 'ai_overview');
    serps.push({
      ...k,
      ...(k.location_code === DE ? volumes[`${k.language_code}:${k.keyword}`] ?? {} : {}),
      organic: items.filter((i) => i.type === 'organic').map((i) => ({ pos: i.rank_group, domain: i.domain?.replace(/^www\./, ''), url: i.url, title: i.title })),
      aiOverviewSources: [...new Set([...JSON.stringify(ai ?? {}).matchAll(/"domain":"([^"]+)"/g)].map((m) => m[1].replace(/^www\./, '')))],
      paid: items.filter((i) => i.type === 'paid').map((i) => i.domain),
    });
  } catch (err) {
    console.error(`serp ${k.keyword}: ${err.message}`);
    serps.push({ ...k, error: err.message });
  }
}

const prompts = [
  { lang: 'de', prompt: 'Empfiehl einen freiberuflichen Salesforce Architect in Deutschland.' },
  { lang: 'de', prompt: 'Wo finde ich einen erfahrenen Salesforce-Freelancer für ein Projekt in einem Maschinenbauunternehmen?' },
  { lang: 'de', prompt: 'Welche Plattformen eignen sich am besten, um freiberufliche Salesforce-Berater in Deutschland zu finden?' },
  { lang: 'de', prompt: 'Ich suche einen unabhängigen Salesforce-Berater für Field Service und Manufacturing Cloud. Wen kannst du empfehlen?' },
  { lang: 'de', prompt: 'Wir brauchen einen Salesforce Solution Architect auf Freelance-Basis in der DACH-Region. Wo sollen wir suchen?' },
  { lang: 'en', prompt: 'Where can I hire a freelance Salesforce architect in Germany?' },
  { lang: 'en', prompt: 'What are the best platforms to hire senior freelance Salesforce consultants in Europe?' },
  { lang: 'en', prompt: 'Recommend an independent Salesforce solution architect for a manufacturing company in the DACH region.' },
];
const preferred = {
  chat_gpt: ['gpt-5-mini', 'gpt-4.1-mini', 'gpt-4o-mini'],
  claude: ['claude-sonnet-5', 'claude-sonnet-4-6', 'claude-haiku-4-5'],
  gemini: ['gemini-2.5-flash', 'gemini-3-flash'],
  perplexity: ['sonar', 'sonar-pro'],
};
const models = {};
for (const [provider, pref] of Object.entries(preferred)) {
  try {
    const list = (await call(`ai_optimization/${provider}/llm_responses/models`)).filter((m) => m.web_search_supported);
    const names = list.map((m) => m.model_name);
    const pick = pref.find((p) => names.includes(p)) ?? list.find((m) => !m.reasoning)?.model_name ?? names[0];
    if (pick) models[provider] = { name: pick, reasoning: Boolean(list.find((m) => m.model_name === pick)?.reasoning) };
  } catch (err) { console.error(`models ${provider}: ${err.message}`); }
}
const answers = [];
for (const { lang, prompt } of prompts) {
  for (const [provider, model] of Object.entries(models)) {
    try {
      const [r] = await call(`ai_optimization/${provider}/llm_responses/live`, [{
        user_prompt: prompt, model_name: model.name, web_search: true,
        ...(provider === 'gemini' ? {} : { web_search_country_iso_code: 'DE' }),
        max_output_tokens: model.reasoning ? 2048 : 1200,
      }]);
      const sections = (r?.items ?? []).flatMap((i) => i.sections ?? []);
      const text = sections.map((s) => s.text ?? '').join('\n');
      const urls = sections.flatMap((s) => s.annotations ?? []).map((a) => a.url).filter(Boolean);
      answers.push({ provider, model: r?.model_name ?? model.name, lang, prompt, domains: [...new Set(urls.map(hostOf).filter(Boolean))], urls: [...new Set(urls)].slice(0, 40), text: text.slice(0, 4000) });
    } catch (err) {
      answers.push({ provider, lang, prompt, error: err.message });
    }
  }
  try {
    const [serp] = await call('serp/google/ai_mode/live/advanced', [{ keyword: prompt, location_code: DE, language_code: lang }]);
    const ai = (serp?.items ?? []).find((i) => i.type === 'ai_overview');
    const urls = [...JSON.stringify(ai ?? {}).matchAll(/"url":"([^"]+)"/g)].map((m) => m[1]);
    answers.push({ provider: 'google_ai_mode', lang, prompt, domains: [...new Set(urls.map(hostOf).filter(Boolean))], urls: [...new Set(urls)].slice(0, 40), text: (ai?.markdown ?? '').slice(0, 4000) });
  } catch (err) {
    answers.push({ provider: 'google_ai_mode', lang, prompt, error: err.message });
  }
}

const portals = [
  'gulp.de', 'freelancermap.de', 'fratch.io', 'freelance.de', 'malt.de', 'upwork.com', 'toptal.com', 'hays.de',
  'solcom.de', 'twago.de', 'freelancer.com', 'freelancer.de', 'projektwerk.com', 'etengo.de', 'expertlead.com',
  'computerfutures.com', 'contractor.de', 'linkedin.com', 'xing.com', 'freelancermap.at', 'freelancermap.ch',
  'gulp.ch', 'fiverr.com', 'arc.dev', 'proxify.io', 'workgenius.com', 'comatch.com', 'outvise.com', 'randstad.de',
  'modis.com', 'itfreelancer.de', 'freelance-market.de', 'sfmike.de', 'salesforce.com',
];
const labs = {};
for (const target of portals) {
  const row = {};
  try {
    const [r] = await call('dataforseo_labs/google/domain_rank_overview/live', [{ target, location_code: DE, language_code: 'de' }]);
    const o = r?.items?.[0]?.metrics?.organic ?? {};
    row.organicKeywords = o.count ?? null;
    row.organicTraffic = o.etv ?? null;
    row.top3 = (o.pos_1 ?? 0) + (o.pos_2_3 ?? 0);
  } catch (err) { row.overviewError = err.message; }
  try {
    const [r] = await call('dataforseo_labs/google/ranked_keywords/live', [{
      target, location_code: DE, language_code: 'de', item_types: ['organic'], limit: 100,
      filters: [['keyword_data.keyword', 'like', '%salesforce%']],
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
    }]);
    row.salesforceKeywordsTotal = r?.total_count ?? null;
    row.salesforceKeywords = (r?.items ?? []).map((i) => ({
      keyword: i.keyword_data?.keyword,
      volume: i.keyword_data?.keyword_info?.search_volume ?? null,
      pos: i.ranked_serp_element?.serp_item?.rank_group ?? null,
      url: i.ranked_serp_element?.serp_item?.url ?? null,
    }));
  } catch (err) { row.rankedError = err.message; }
  labs[target] = row;
}

console.error(`cost ${cost.toFixed(4)} USD`);
console.log(JSON.stringify({ generatedAt: new Date().toISOString(), cost: Number(cost.toFixed(4)), models, serps, answers, labs }, null, 2));
