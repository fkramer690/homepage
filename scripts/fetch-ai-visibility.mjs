// Monthly check whether AI assistants name or cite fk-sd.de: asks the questions in
// seo/ai-prompts.json to ChatGPT, Claude, Gemini and Perplexity (with web search)
// and to Google AI Mode via DataForSEO. Printed as JSON; used by .github/workflows/ai-visibility.yml.
import { readFile } from 'node:fs/promises';

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  process.exit(1);
}

const DOMAIN = 'fk-sd.de';
const NAMES = /fk-sd\.de|FK Solution Design|Fabian Kramer/i;
const LOCATION = 2276; // Germany
const auth = 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
let cost = 0;

// Live calls fail now and then with a server error; one retry fixes most.
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
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

const config = JSON.parse(await readFile(new URL('../seo/ai-prompts.json', import.meta.url), 'utf8'));

// Pick the first preferred model DataForSEO offers with web search, else any such model.
const models = {};
for (const [provider, preferred] of Object.entries(config.models)) {
  try {
    const list = (await call(`ai_optimization/${provider}/llm_responses/models`)).filter((m) => m.web_search_supported);
    const names = list.map((m) => m.model_name);
    const pick = preferred.find((p) => names.includes(p)) ?? list.find((m) => !m.reasoning)?.model_name ?? names[0];
    if (pick) models[provider] = { name: pick, reasoning: Boolean(list.find((m) => m.model_name === pick)?.reasoning) };
  } catch (err) {
    console.error(`models (${provider}) failed: ${err.message}`);
  }
}
console.error(`models: ${JSON.stringify(models)}`);

const answers = [];
for (const { lang, prompt } of config.prompts) {
  for (const [provider, model] of Object.entries(models)) {
    try {
      const [r] = await call(`ai_optimization/${provider}/llm_responses/live`, [
        {
          user_prompt: prompt,
          model_name: model.name,
          web_search: true,
          web_search_country_iso_code: 'DE',
          max_output_tokens: model.reasoning ? 2048 : 1200,
        },
      ]);
      const sections = (r?.items ?? []).flatMap((i) => i.sections ?? []);
      const text = sections.map((s) => s.text ?? '').join('\n');
      const urls = sections.flatMap((s) => s.annotations ?? []).map((a) => a.url).filter(Boolean);
      answers.push({
        provider,
        model: r?.model_name ?? model.name,
        lang,
        prompt,
        cited: urls.some((u) => hostOf(u)?.endsWith(DOMAIN)),
        mentioned: NAMES.test(text),
        domains: [...new Set(urls.map(hostOf).filter(Boolean))],
      });
    } catch (err) {
      console.error(`${provider} "${prompt}" failed: ${err.message}`);
      answers.push({ provider, model: model.name, lang, prompt, error: err.message });
    }
  }

  try {
    const [serp] = await call('serp/google/ai_mode/live/advanced', [
      { keyword: prompt, location_code: LOCATION, language_code: lang },
    ]);
    const ai = (serp?.items ?? []).find((i) => i.type === 'ai_overview');
    const raw = JSON.stringify(ai ?? {});
    const urls = [...raw.matchAll(/"url":"([^"]+)"/g)].map((m) => m[1]);
    answers.push({
      provider: 'google_ai_mode',
      model: 'Google AI Mode',
      lang,
      prompt,
      cited: urls.some((u) => hostOf(u)?.endsWith(DOMAIN)),
      mentioned: NAMES.test(ai?.markdown ?? ''),
      domains: [...new Set(urls.map(hostOf).filter(Boolean))],
    });
  } catch (err) {
    console.error(`google_ai_mode "${prompt}" failed: ${err.message}`);
    answers.push({ provider: 'google_ai_mode', model: 'Google AI Mode', lang, prompt, error: err.message });
  }
}

console.error(`cost of this run ${cost.toFixed(4)} USD`);
console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  domain: DOMAIN,
  cost: Number(cost.toFixed(4)),
  models,
  answers,
}, null, 2));
