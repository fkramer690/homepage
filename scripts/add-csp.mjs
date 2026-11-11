// Runs right after `astro build`: writes the Content Security Policy
// (scripts/csp-policy.mjs) into every page as the first tag after <meta charset>, so it
// covers everything that follows. scripts/check-security.mjs checks the result.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { META_RE, policyFor } from './csp-policy.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
let count = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) add(path);
  }
}

function add(path) {
  const html = readFileSync(path, 'utf8').replace(META_RE, '');
  const charset = html.match(/<meta charset="utf-8"\s*\/?>/i);
  if (!charset) throw new Error(`${path.slice(dist.length)}: no <meta charset="utf-8">, cannot place the CSP`);
  const meta = `<meta http-equiv="content-security-policy" content="${policyFor(html)}">`;
  const at = charset.index + charset[0].length;
  writeFileSync(path, html.slice(0, at) + meta + html.slice(at));
  count++;
}

walk(dist);
console.log(`CSP added to ${count} pages.`);
