// One-off test of DataForSEO LLM Mentions URL targets (not merged).
const auth = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
async function call(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}
const out = {};
const bal = async () => (await call('appendix/user_data')).tasks?.[0]?.result?.[0]?.money;
out.balanceBefore = await bal();
const loc = await call('ai_optimization/llm_mentions/locations_and_languages');
const locs = loc.tasks?.[0]?.result || [];
out.locationCount = locs.length;
out.germany = locs.find((l) => l.location_code === 2276) || null;
out.us = locs.find((l) => l.location_code === 2840)?.available_languages?.filter((l) => l.language_code === 'en') || null;
const deGoogle = !!out.germany?.available_languages?.some((l) => l.language_code === 'de' && l.available_platforms.includes('google'));
const B = 'https://www.fk-sd.de';
const tests = [
  { name: 'EN DX MCP Server', url: `${B}/en/blog/salesforce-dx-mcp-server-end-of-life/` },
  { name: 'EN sfdx-hardis', url: `${B}/en/blog/sfdx-hardis-open-source-salesforce-devops/` },
  { name: 'EN Agent Context Engine', url: `${B}/en/blog/salesforce-agent-context-engine-explained/` },
  { name: 'EN FS Scheduling Console', url: `${B}/en/blog/field-service-scheduling-console-dispatchers/` },
  { name: 'EN /en/blog/ subpaths', url: `${B}/en/blog/`, sub: true },
  { name: 'DE Change-Kurve', url: `${B}/blog/change-kurve/`, de: true },
  { name: 'DE DX MCP Server', url: `${B}/blog/salesforce-dx-mcp-server-ende/`, de: true },
  { name: 'DE /blog/ subpaths', url: `${B}/blog/`, sub: true, de: true },
  { name: 'Domain fk-sd.de (baseline)', domain: 'fk-sd.de' },
];
out.tests = [];
for (const t of tests) {
  if (t.de && !deGoogle) { out.tests.push({ ...t, skipped: 'Germany/de not available for google' }); continue; }
  const target = t.domain
    ? [{ domain: t.domain, include_subdomains: true }]
    : [{ url: t.url, include_subpaths: !!t.sub }];
  const task = { target, limit: 20 };
  if (t.de) Object.assign(task, { platform: 'google', location_code: 2276, language_code: 'de' });
  const r = await call('ai_optimization/llm_mentions/search_mentions/live', [task]);
  const tk = r.tasks?.[0] || {};
  const res = tk.result?.[0] || {};
  out.tests.push({
    ...t, status: tk.status_code, message: tk.status_message, cost: tk.cost, total: res.total_count,
    items: (res.items || []).map((i) => ({
      platform: i.platform, question: i.question, ai_search_volume: i.ai_search_volume,
      last: i.last_response_at,
      fkSources: [...(i.sources || []), ...(i.search_results || [])].filter((s) => (s.url || '').includes('fk-sd.de')).map((s) => ({ url: s.url, rank: s.rank ?? s.position })),
      otherDomains: [...new Set((i.sources || []).map((s) => s.domain))].slice(0, 8),
      answer: (i.answer || '').slice(0, 600),
    })),
  });
}
out.balanceAfter = await bal();
console.log(JSON.stringify(out, null, 2));
