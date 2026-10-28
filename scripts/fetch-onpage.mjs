// Monthly crawl of the live site with the DataForSEO OnPage API: duplicate titles,
// descriptions and content, broken links, redirect chains, non-indexable pages and
// other per-page checks. Printed as JSON; used by .github/workflows/onpage.yml.
const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  process.exit(1);
}

const DOMAIN = 'fk-sd.de';
const START = 'https://www.fk-sd.de/';
const MAX_PAGES = 1500;
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

// Checks that point to a problem (the API also reports neutral flags such as is_https).
const BAD = [
  'no_title', 'title_too_long', 'title_too_short', 'irrelevant_title', 'duplicate_title',
  'no_description', 'irrelevant_description', 'duplicate_description', 'duplicate_meta_tags',
  'duplicate_content', 'no_h1_tag', 'low_content_rate', 'low_character_count', 'low_readability_rate',
  'is_broken', 'is_4xx_code', 'is_5xx_code', 'redirect_chain', 'has_links_to_redirects',
  'canonical_to_broken', 'canonical_to_redirect', 'canonical_chain', 'recursive_canonical',
  'is_link_relation_conflict', 'is_orphan_page', 'no_image_alt', 'large_page_size',
  'high_loading_time', 'high_waiting_time', 'has_render_blocking_resources', 'deprecated_html_tags',
  'https_to_http_links', 'has_micromarkup_errors',
];

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
  if (!res.ok || json.status_code !== 20000 || !task || ![20000, 20100].includes(task.status_code)) {
    throw new Error(`${path}: ${task?.status_message ?? json.status_message ?? res.status}`);
  }
  cost += task.cost ?? 0;
  return { id: task.id, result: task.result ?? [] };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const path = (url) => {
  try {
    const u = new URL(url);
    return u.hostname === `www.${DOMAIN}` ? u.pathname : url;
  } catch {
    return url;
  }
};

// ONPAGE_TASK_ID reuses an earlier crawl (DataForSEO keeps the results for 30 days).
const id = process.env.ONPAGE_TASK_ID || (await call('on_page/task_post', [
  {
    target: DOMAIN,
    start_url: START,
    max_crawl_pages: MAX_PAGES,
    crawl_delay: 200,
    enable_www_redirect_check: true,
    validate_micromarkup: true,
  },
])).id;
console.error(`crawl task ${id}`);

let summary;
for (let i = 0; i < 120; i++) {
  await sleep(30000);
  [summary] = (await call(`on_page/summary/${id}`)).result;
  console.error(`crawl ${summary?.crawl_progress}: ${summary?.crawl_status?.pages_crawled ?? 0} pages`);
  if (summary?.crawl_progress === 'finished') break;
}
if (summary?.crawl_progress !== 'finished') throw new Error('crawl did not finish within 60 minutes');

const pages = [];
for (let offset = 0; ; offset += 1000) {
  const [r] = (await call('on_page/pages', [{ id, limit: 1000, offset }])).result;
  pages.push(...(r?.items ?? []));
  if (!r || offset + 1000 >= (r.total_items_count ?? 0)) break;
}

const issues = pages
  .map((p) => ({
    page: path(p.url),
    status: p.status_code,
    title: p.meta?.title ?? null,
    words: p.meta?.content?.plain_text_word_count ?? null,
    score: p.onpage_score ?? null,
    checks: BAD.filter((c) => p.checks?.[c] === true),
  }))
  .filter((p) => p.checks.length);

const list = async (endpoint, body) => {
  try {
    const [r] = (await call(endpoint, [{ id, limit: 1000, ...body }])).result;
    return r?.items ?? [];
  } catch (err) {
    console.error(`${endpoint} failed: ${err.message}`);
    return [];
  }
};

const dupGroups = async (type) =>
  (await list('on_page/duplicate_tags', { type })).map((g) => ({
    value: g.accumulator,
    pages: (g.pages ?? []).map((p) => path(p.url)),
  }));

const duplicateContent = [];
for (const p of issues.filter((p) => p.checks.includes('duplicate_content')).slice(0, 40)) {
  const items = await list('on_page/duplicate_content', { url: `https://www.${DOMAIN}${p.page}` });
  const similar = items.flatMap((i) => i.pages ?? []).map((s) => ({ page: path(s.page?.[0]?.url ?? s.url), similarity: s.similarity }));
  duplicateContent.push({ page: p.page, similar: similar.filter((s) => s.page && s.page !== p.page) });
}

const brokenLinks = (await list('on_page/links', { filters: [['is_broken', '=', true]] })).map((l) => ({
  from: path(l.page_from),
  to: path(l.page_to),
  status: l.page_to_status_code ?? null,
}));
const redirectChains = (await list('on_page/redirect_chains', {})).map((c) => ({
  chain: (c.chain ?? []).map((s) => `${path(s.from_url)} -> ${path(s.to_url)}`),
  loop: Boolean(c.is_redirect_loop),
}));
const nonIndexable = (await list('on_page/non_indexable', {})).map((n) => ({ page: path(n.url), reason: n.reason }));

// Structured data messages for one sample page per page type (home, blog, services, ...).
const microdata = [];
const samples = new Map();
for (const p of issues.filter((p) => p.checks.includes('has_micromarkup_errors'))) {
  const type = p.page.replace(/^\/en\//, '/').split('/').slice(0, 2).join('/') + (p.page.startsWith('/en/') ? ' (en)' : '');
  if (!samples.has(type)) samples.set(type, p.page);
}
for (const page of [...samples.values()].slice(0, 12)) {
  const messages = new Set();
  const walk = (o, at) => {
    if (Array.isArray(o)) return o.forEach((x) => walk(x, at));
    if (!o || typeof o !== 'object') return;
    const here = o.name ?? o.type ?? at;
    if (o.message) messages.add(`${o.level ?? ''} ${here}: ${o.message}`.trim());
    for (const v of Object.values(o)) walk(v, here);
  };
  try {
    walk((await call('on_page/microdata', [{ id, url: `https://www.${DOMAIN}${page}` }])).result, '');
  } catch (err) {
    messages.add(`request failed: ${err.message}`);
  }
  microdata.push({ page, messages: [...messages] });
}

const counts = {};
for (const p of issues) for (const c of p.checks) counts[c] = (counts[c] ?? 0) + 1;

console.error(`cost of this run ${cost.toFixed(4)} USD`);
console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  domain: DOMAIN,
  cost: Number(cost.toFixed(4)),
  crawl: { pages: pages.length, stopReason: summary.crawl_stop_reason ?? null },
  domainChecks: summary.domain_info?.checks ?? {},
  metrics: summary.page_metrics ?? {},
  counts,
  duplicateTitles: await dupGroups('duplicate_title'),
  duplicateDescriptions: await dupGroups('duplicate_description'),
  duplicateContent,
  brokenLinks,
  redirectChains,
  nonIndexable,
  microdata,
  issues,
}, null, 2));
