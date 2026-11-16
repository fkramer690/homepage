// Counts two events of www.fk-sd.de, nothing else: a click on "Book a call"
// (termin) and a contact form that Web3Forms accepted (formular). The site
// sends {e, p} with navigator.sendBeacon; we store event, page path and the
// day in Workers Analytics Engine. No IP address, no cookie, no user agent,
// no form content. scripts/fetch-events.mjs reads the counts once a day.
const EVENTS = new Set(['termin', 'formular']);
const ORIGINS = new Set(['https://www.fk-sd.de', 'https://fk-sd.de']);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? '';
    const cors = { 'Access-Control-Allow-Origin': ORIGINS.has(origin) ? origin : 'https://www.fk-sd.de' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Max-Age': '86400' } });
    if (request.method !== 'POST' || !ORIGINS.has(origin)) return new Response(null, { status: 404 });
    let data;
    try {
      const text = await request.text();
      if (text.length > 500) return new Response(null, { status: 413, headers: cors });
      data = JSON.parse(text);
    } catch {
      return new Response(null, { status: 400, headers: cors });
    }
    const event = String(data?.e ?? '');
    let path = String(data?.p ?? '/').split(/[?#]/)[0].slice(0, 200);
    if (!EVENTS.has(event) || !path.startsWith('/')) return new Response(null, { status: 400, headers: cors });
    env.EVENTS.writeDataPoint({ blobs: [event, path], doubles: [1], indexes: [event] });
    return new Response(null, { status: 204, headers: cors });
  },
};
