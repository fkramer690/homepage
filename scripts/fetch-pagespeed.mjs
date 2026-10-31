// Monthly PageSpeed Insights check of key pages on www.fk-sd.de: Lighthouse scores and
// lab metrics for mobile and desktop, plus Core Web Vitals from real Chrome users (CrUX)
// once Google has enough data. Printed as JSON; used by .github/workflows/pagespeed.yml.
const key = process.env.PAGESPEED_API_KEY;
if (!key) {
  console.error('PAGESPEED_API_KEY must be set');
  process.exit(1);
}

const ORIGIN = 'https://www.fk-sd.de';
const PAGES = [
  '/',
  '/en/',
  '/leistungen/',
  '/blog/',
  '/blog/salesforce-field-service-lohnt-sich/',
  '/masterclass/',
  '/freiberuflicher-salesforce-architect/',
];
const STRATEGIES = ['mobile', 'desktop'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const LAB = {
  'largest-contentful-paint': 'lcp_ms',
  'cumulative-layout-shift': 'cls',
  'total-blocking-time': 'tbt_ms',
  'first-contentful-paint': 'fcp_ms',
  'speed-index': 'speed_index_ms',
};
const FIELD = {
  LARGEST_CONTENTFUL_PAINT_MS: 'lcp_ms',
  INTERACTION_TO_NEXT_PAINT: 'inp_ms',
  CUMULATIVE_LAYOUT_SHIFT_SCORE: 'cls',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The API times out now and then on a cold run; one retry fixes most.
async function run(url, strategy, retries = 1) {
  const params = new URLSearchParams({ url, strategy, key });
  for (const c of CATEGORIES) params.append('category', c);
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (retries > 0) {
      await sleep(10000);
      return run(url, strategy, retries - 1);
    }
    throw new Error(`${strategy} ${url}: ${json.error?.message ?? res.status}`);
  }
  return json;
}

// CrUX reports CLS multiplied by 100.
function field(experience) {
  if (!experience?.metrics) return null;
  const out = { overall: experience.overall_category ?? null };
  for (const [metric, name] of Object.entries(FIELD)) {
    const m = experience.metrics[metric];
    if (!m) continue;
    out[name] = name === 'cls' ? m.percentile / 100 : m.percentile;
    out[`${name}_category`] = m.category;
  }
  return out;
}

const results = [];
for (const path of PAGES) {
  for (const strategy of STRATEGIES) {
    const json = await run(ORIGIN + path, strategy);
    const lh = json.lighthouseResult;
    const scores = {};
    for (const c of CATEGORIES) scores[c] = Math.round((lh.categories[c]?.score ?? 0) * 100);
    const lab = {};
    for (const [audit, name] of Object.entries(LAB)) lab[name] = lh.audits[audit]?.numericValue ?? null;
    if (lab.cls !== null) lab.cls = Math.round(lab.cls * 1000) / 1000;
    for (const k of Object.keys(lab)) if (k !== 'cls' && lab[k] !== null) lab[k] = Math.round(lab[k]);
    results.push({
      path,
      strategy,
      scores,
      lab,
      // Without enough data for the page itself, Google falls back to the whole origin.
      field: json.loadingExperience?.origin_fallback ? null : field(json.loadingExperience),
      origin_field: field(json.originLoadingExperience),
    });
    console.error(`${strategy} ${path}: performance ${scores.performance}`);
  }
}

console.log(JSON.stringify({ fetched: new Date().toISOString(), origin: ORIGIN, results }, null, 2));
