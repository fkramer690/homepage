// Tells Bing (and the other IndexNow search engines) which pages changed, so
// they are crawled within minutes instead of days. Bing also feeds ChatGPT
// search and Copilot.
//
//   node scripts/indexnow.mjs diff <out-file>   after `npm run build`: compares
//       every page in the sitemap with the hashes of the live site and writes
//       the changed URLs to <out-file>. Also writes dist/indexnow-hashes.json
//       for the next comparison.
//   node scripts/indexnow.mjs submit <url-file>  after the deploy: sends them.
//
// The key is public by design: IndexNow checks that public/<key>.txt holds it.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const site = (process.env.SITE_URL ?? 'https://www.fk-sd.de').replace(/\/$/, '');
const hashFile = 'indexnow-hashes.json';
const [mode, file] = process.argv.slice(2);

const keyFile = readdirSync('public').find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error('IndexNow key file public/<32 hex>.txt is missing');
const key = keyFile.replace('.txt', '');
if (readFileSync(`public/${keyFile}`, 'utf8').trim() !== key) throw new Error(`${keyFile} must contain its own name`);

if (mode === 'diff') {
  const urls = [...readFileSync('dist/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const hashes = Object.fromEntries(
    urls.map((url) => {
      const html = readFileSync(`dist${new URL(url).pathname}index.html`);
      return [url, createHash('sha256').update(html).digest('hex').slice(0, 16)];
    }),
  );
  writeFileSync(`dist/${hashFile}`, JSON.stringify(hashes, null, 1));

  let live = {};
  try {
    const res = await fetch(`${site}/${hashFile}`);
    if (res.ok) live = await res.json();
  } catch {
    // First run or site unreachable: report every page.
  }
  const changed = urls.filter((url) => live[url] !== hashes[url]);
  writeFileSync(file, changed.join('\n'));
  console.log(`IndexNow: ${changed.length} of ${urls.length} pages changed.`);
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
