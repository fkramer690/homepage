// Runs after `astro build`: the sitemap must list exactly the indexable pages.
// A page without <meta name="robots" content="noindex"> must be in it, a noindex
// page (legal pages, redirects, 404) must not, and every listed URL must exist.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const site = process.env.SITE_URL ?? 'https://www.fk-sd.de';
const base = process.env.BASE_PATH ?? '/';
const root = new URL(base.endsWith('/') ? base : `${base}/`, site).href;
const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];

// Page URLs from dist/: foo/index.html is served as <root>foo/.
const pages = new Map();
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name === 'index.html') {
      const rel = path.slice(dist.length).replace(/index\.html$/, '');
      const html = readFileSync(path, 'utf8');
      pages.set(root + rel, /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html));
    }
  }
}
walk(dist);

// URLs from the sitemap index and every sitemap it points to.
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const inSitemap = new Set();
for (const sitemap of locs(readFileSync(join(dist, 'sitemap-index.xml'), 'utf8'))) {
  const file = join(dist, sitemap.slice(root.length));
  for (const url of locs(readFileSync(file, 'utf8'))) inSitemap.add(url);
}

for (const [url, noindex] of pages) {
  if (!noindex && !inSitemap.has(url)) errors.push(`indexable page missing from the sitemap: ${url}`);
  if (noindex && inSitemap.has(url)) errors.push(`noindex page listed in the sitemap: ${url}`);
}
for (const url of inSitemap) {
  if (!pages.has(url)) errors.push(`sitemap URL without a page: ${url}`);
}

if (errors.length) {
  console.error(`Sitemap check failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Sitemap check passed: ${inSitemap.size} indexable pages listed, ${[...pages.values()].filter(Boolean).length} noindex pages left out.`);
