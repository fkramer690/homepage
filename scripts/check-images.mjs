// Runs after `astro build`: every <img> on the site needs an alt attribute with a
// value: a description for photos and logos (company name), alt="" for purely
// decorative images. A missing alt or a bare `alt` without value fails the build,
// because search engines (Bing Webmaster Tools) report both as missing.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

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
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (/\salt\s*=\s*("[^"]*"|'[^']*')/i.test(tag)) continue;
    const src = tag.match(/\ssrc="([^"]*)"/i)?.[1] ?? tag.slice(0, 80);
    errors.push(`${path.slice(dist.length)}: ${src}`);
  }
}

walk(dist);
if (errors.length) {
  const unique = [...new Set(errors)];
  console.error(`Images need an alt attribute with a value (description, company name for logos, alt="" if decorative):\n- ${unique.slice(0, 50).join('\n- ')}${unique.length > 50 ? `\n… and ${unique.length - 50} more` : ''}`);
  process.exit(1);
}
console.log('Image check passed: every <img> has an alt attribute.');
