// Runs after `astro build`: every internal link and resource (href, src, srcset, poster
// starting with /) must point to a file in dist/. Catches links to renamed or removed
// pages, images and downloads before they go live as 404s.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
let links = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) check(path);
  }
}

function exists(url) {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!path || path.startsWith('//')) return true;
  return existsSync(join(dist, path.endsWith('/') ? `${path}index.html` : path));
}

function check(path) {
  const html = readFileSync(path, 'utf8');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src|poster)="(\/[^"]*)"/gi)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]*)"/gi)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0]).filter((u) => u.startsWith('/'))),
  ];
  for (const url of urls) {
    links++;
    if (!exists(url)) errors.push(`${path.slice(dist.length)}: ${url}`);
  }
}

walk(dist);
if (errors.length) {
  const unique = [...new Set(errors)];
  console.error(`Broken internal links (${unique.length}):\n${unique.slice(0, 50).join('\n')}${unique.length > 50 ? `\n… and ${unique.length - 50} more` : ''}`);
  process.exit(1);
}
console.log(`Internal link check passed: ${links} links and resources, all found in dist/.`);
