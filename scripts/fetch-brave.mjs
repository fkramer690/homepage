// Weekly Brave Search check. Claude's web search draws on the Brave index, so this shows
// whether fk-sd.de is in the pool Claude picks its sources from:
// - position of fk-sd.de for the keywords in seo/keywords.json (top 20, top 40 if not found),
// - position for the AI search questions in seo/ai-prompts.json (top 20),
// - which fk-sd.de pages Brave has indexed at all (site:fk-sd.de, up to 200 results).
// Only our own positions and URLs are stored, not the result lists (Brave's terms reserve
// storing full results for a separate plan). About 110 to 200 requests per run, inside the
// 5 USD monthly free credit of the "Search" plan. Printed as JSON; used by .github/workflows/brave.yml.
import { readFile } from 'node:fs/promises';

const key = process.env.BRAVE_SEARCH_API_KEY;
if (!key) {
  console.error('BRAVE_SEARCH_API_KEY must be set');
  process.exit(1);
}

const DOMAIN = 'fk-sd.de';
const isOwn = (url) => {
  try {
    const host = new URL(url).hostname;
    return host === DOMAIN || host.endsWith(`.${DOMAIN}`);
  } catch {
    return false;
  }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let requests = 0;

async function search(q, { lang = 'de', offset = 0 } = {}, attempt = 0) {
  const params = new URLSearchParams({
    q: q.slice(0, 400),
    country: 'DE',
    search_lang: lang,
    count: '20',
    offset: String(offset),
    result_filter: 'web',
  });
  // One request per second keeps the run far below the plan's rate limit.
  await sleep(1100);
  requests++;
  const res = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
    headers: { Accept: 'application/json', 'X-Subscription-Token': key },
  });
  if (res.status === 429 && attempt < 3) {
    await sleep(5000 * (attempt + 1));
    return search(q, { lang, offset }, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return { results: json.web?.results ?? [], more: Boolean(json.query?.more_results_available) };
}

// Position (1-based) and URL of the first own result, looking at up to `pages` pages of 20.
async function position(q, lang, pages) {
  for (let page = 0; page < pages; page++) {
    const { results, more } = await search(q, { lang, offset: page });
    const index = results.findIndex((r) => isOwn(r.url));
    if (index !== -1) {
      return { position: page * 20 + index + 1, url: results[index].url, ownResults: results.filter((r) => isOwn(r.url)).length };
    }
    if (!more || results.length === 0) break;
  }
  return { position: null, url: null };
}

const keywords = JSON.parse(await readFile(new URL('../seo/keywords.json', import.meta.url), 'utf8'));
const { prompts } = JSON.parse(await readFile(new URL('../seo/ai-prompts.json', import.meta.url), 'utf8'));

const rows = { keywords: { de: [], en: [] }, prompts: [] };
const failed = [];
for (const lang of ['de', 'en']) {
  for (const keyword of keywords[lang] ?? []) {
    try {
      rows.keywords[lang].push({ keyword, ...(await position(keyword, lang, 2)) });
    } catch (err) {
      failed.push(keyword);
      rows.keywords[lang].push({ keyword, error: err.message });
    }
  }
}
for (const { lang, prompt } of prompts) {
  try {
    rows.prompts.push({ lang, prompt, ...(await position(prompt, lang, 1)) });
  } catch (err) {
    failed.push(prompt);
    rows.prompts.push({ lang, prompt, error: err.message });
  }
}

// Index coverage: every fk-sd.de URL Brave returns for site:fk-sd.de (max 10 pages of 20).
const indexed = new Set();
try {
  for (let page = 0; page < 10; page++) {
    const { results, more } = await search(`site:${DOMAIN}`, { offset: page });
    for (const r of results) if (isOwn(r.url)) indexed.add(r.url);
    if (!more || results.length === 0) break;
  }
} catch (err) {
  failed.push(`site:${DOMAIN}`);
  console.error(`site query failed: ${err.message}`);
}

const allKeywords = [...rows.keywords.de, ...rows.keywords.en];
const found = (list) => list.filter((r) => r.position).length;
console.error(
  `Brave: ${found(allKeywords)}/${allKeywords.length} keywords, ${found(rows.prompts)}/${rows.prompts.length} questions, ` +
    `${indexed.size} indexed pages, ${requests} requests`,
);
console.error(`failed: ${failed.length ? failed.join(' | ') : 'none'}`);
console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      domain: DOMAIN,
      requests,
      summary: {
        keywordsFound: found(allKeywords),
        keywords: allKeywords.length,
        questionsFound: found(rows.prompts),
        questions: rows.prompts.length,
        indexedPages: indexed.size,
      },
      keywords: rows.keywords,
      prompts: rows.prompts,
      indexed: [...indexed].sort(),
    },
    null,
    2,
  ),
);
