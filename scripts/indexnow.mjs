// Tells Bing (and the other IndexNow search engines) which pages changed, so
// they are crawled within minutes instead of days. Bing also feeds ChatGPT
// search and Copilot.
//
//   node scripts/indexnow.mjs diff <out-file>   after `npm run build`: compares
//       every page in the sitemap with the hashes of the live site and writes
//       the changed URLs to <out-file>. Also writes dist/indexnow-hashes.json
//       for the next comparison.
//       It also gives every sitemap entry without a <lastmod> (start page, service
//       and landing pages, which have no date in their frontmatter) the date its
//       content last changed, kept in dist/lastmod.json from deploy to deploy.
//       Bing's webmaster guidelines ask for lastmod as a freshness signal.
//
// Only real content changes count: the hash covers title, description and the
// visible text of <main> without navigation (contents, series, related articles)
// and the contact section. A change to the shared layout, the styles or an asset
// file name would otherwise resubmit every page, and Bing treats repeated pings
// for unchanged pages as a weak signal.
//   node scripts/indexnow.mjs submit <url-file>  after the deploy: sends them.
//
// The key is public by design: IndexNow checks that public/<key>.txt holds it.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const site = (process.env.SITE_URL ?? 'https://www.fk-sd.de').replace(/\/$/, '');
const hashFile = 'indexnow-hashes.json';
const lastmodFile = 'lastmod.json';
// Raise when contentOf changes, so the next deploy does not report every page.
const hashVersion = 2;

const contentOf = (html) => {
  const head = [/<title>([^<]*)<\/title>/, /<meta name="description" content="([^"]*)"/].map((re) => html.match(re)?.[1] ?? '');
  const main = (html.match(/<main[\s\S]*<\/main>/)?.[0] ?? html)
    .replace(/<(script|style|nav)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<section class="contact[\s"][\s\S]*?<\/section>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return [...head, main].join('\n');
};
const [mode, file] = process.argv.slice(2);

const keyFile = readdirSync('public').find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error('IndexNow key file public/<32 hex>.txt is missing');
const key = keyFile.replace('.txt', '');
if (readFileSync(`public/${keyFile}`, 'utf8').trim() !== key) throw new Error(`${keyFile} must contain its own name`);

if (mode === 'diff') {
  const urls = [...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const hashes = Object.fromEntries(
    urls.map((url) => {
      const html = readFileSync(`dist${new URL(url).pathname}index.html`, 'utf8');
      return [url, createHash('sha256').update(contentOf(html)).digest('hex').slice(0, 16)];
    }),
  );
  writeFileSync(`dist/${hashFile}`, JSON.stringify({ version: hashVersion, ...hashes }, null, 1));

  let live = {};
  try {
    const res = await fetch(`${site}/${hashFile}`);
    if (res.ok) live = await res.json();
  } catch {
    // First run or site unreachable: report every page.
  }
  // After a change of the hash itself, only pages that are new to the site count.
  const sameVersion = live.version === hashVersion;
  const changed = urls.filter((url) => (sameVersion ? live[url] !== hashes[url] : !(url in live)));
  writeFileSync(file, changed.join('\n'));
  console.log(`IndexNow: ${changed.length} of ${urls.length} pages changed.`);

  // Last change date per page: today for a changed or new page, otherwise the
  // date the live site recorded. The first run dates every page today.
  let liveDates = {};
  try {
    const res = await fetch(`${site}/${lastmodFile}`);
    if (res.ok) liveDates = await res.json();
  } catch {
    // First run or site unreachable.
  }
  const today = new Date().toISOString().slice(0, 10);
  const dates = Object.fromEntries(urls.map((url) => [url, sameVersion && live[url] === hashes[url] && liveDates[url] ? liveDates[url] : today]));
  writeFileSync(`dist/${lastmodFile}`, JSON.stringify(dates, null, 1));
  let filled = 0;
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8').replace(/<url>(?:(?!<\/url>)[\s\S])*<\/url>/g, (entry) => {
    if (entry.includes('<lastmod>')) return entry;
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)[1];
    filled += 1;
    return entry.replace('</loc>', `</loc><lastmod>${dates[loc]}</lastmod>`);
  });
  writeFileSync('dist/sitemap-0.xml', sitemap);
  console.log(`Sitemap: lastmod added to ${filled} pages without a frontmatter date.`);
} else if (mode === 'submit') {
  const urlList = readFileSync(file, 'utf8').split('\n').filter(Boolean);
  if (urlList.length === 0) {
    console.log('IndexNow: nothing changed.');
  } else {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
    });
    console.log(`IndexNow: sent ${urlList.length} URLs, answer ${res.status}.`);
    // 200 and 202 mean accepted. A failed ping must not fail the deploy.
    if (!res.ok) console.log(await res.text());
  }
} else {
  throw new Error('usage: node scripts/indexnow.mjs diff|submit <file>');
}
