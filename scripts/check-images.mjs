// Runs after `astro build`: every <img> on a page needs an alt text. Search engine
// scanners (Bing Site Scan) report an empty alt as missing, and Astro's HTML
// compression turns alt="" into a bare `alt`. Decorative images therefore still get
// a real alt text; hide them from screen readers with aria-hidden on a wrapper.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      const page = '/' + path.slice(dist.length).replace(/index\.html$/, '');
      for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
        if (!/\salt="[^"]*\S[^"]*"/.test(tag)) errors.push(`<img> without alt text: ${page} ${tag.slice(0, 120)}`);
      }
    }
  }
}
walk(dist);

if (errors.length) {
  console.error(`Image check failed (${errors.length}):\n${errors.slice(0, 50).join('\n')}`);
  process.exit(1);
}
console.log('Image check passed: every <img> has an alt text.');
