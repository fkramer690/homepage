// Runs after `astro build`: every external link on the site must open in a new tab.
// Markdown links get this from src/lib/rehype-external-links.mjs; links in components
// need target="_blank" rel="noopener" and <ExternalMark>.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const site = process.env.SITE_URL ?? 'https://www.fk-sd.de';
const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) check(path);
  }
}

function check(path) {
  const html = readFileSync(path, 'utf8');
  for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
    const href = tag.match(/href="([^"]*)"/)?.[1] ?? '';
    if (!/^https?:\/\//i.test(href) || new URL(href).origin === new URL(site).origin) continue;
    if (!/target="_blank"/.test(tag) || !/rel="[^"]*noopener/.test(tag)) {
      errors.push(`${path.slice(dist.length)}: ${href}`);
    }
  }
}

walk(dist);
if (errors.length) {
  console.error(`External links must open in a new tab (target="_blank" rel="noopener"):\n- ${[...new Set(errors)].join('\n- ')}`);
  process.exit(1);
}
console.log('Link check passed: all external links open in a new tab.');
