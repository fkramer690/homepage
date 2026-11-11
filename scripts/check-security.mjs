// Runs after `astro build` and scripts/add-csp.mjs. Fails the build when a page
//  - has no Content Security Policy, or not as the first tag after <meta charset>,
//  - has an inline <script> or <style> whose hash is not in its policy,
//  - allows 'unsafe-inline' or 'unsafe-eval' for scripts,
//  - has a script in an attribute (onclick=…) or a javascript: link, which the policy blocks,
//  - loads a script from a host the policy does not name,
//  - loads anything over plain http://,
//  - has no referrer policy (strict-origin-when-cross-origin).
// The policy itself is in scripts/csp-policy.mjs. Never weaken this check: add the new
// host to the policy instead, or move the script into a file.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SCRIPT_HOSTS, hash, inlineElements } from './csp-policy.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
let pages = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) check(path);
  }
}

function check(path) {
  pages++;
  const page = path.slice(dist.length);
  const html = readFileSync(path, 'utf8');
  const fail = (msg) => errors.push(`${page}: ${msg}`);

  const head = html.match(/<head>\s*<meta charset="utf-8"\s*\/?>\s*<meta http-equiv="content-security-policy" content="([^"]*)">/i);
  if (!head) return fail('no Content Security Policy directly after <meta charset>');
  const directives = Object.fromEntries(
    head[1].split(';').map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([name, ...values]) => [name, values]),
  );
  const scriptSrc = directives['script-src'] ?? [];
  const styleSrc = directives['style-src'] ?? [];
  for (const d of ['default-src', 'script-src', 'style-src', 'object-src', 'base-uri', 'form-action']) {
    if (!directives[d]) fail(`policy without ${d}`);
  }
  if (scriptSrc.some((v) => /unsafe-inline|unsafe-eval|\*/.test(v))) fail(`script-src too open: ${scriptSrc.join(' ')}`);
  if (directives['object-src']?.join(' ') !== "'none'") fail("object-src must be 'none'");

  for (const { kind, content } of inlineElements(html)) {
    if (!(kind === 'script' ? scriptSrc : styleSrc).includes(hash(content))) {
      fail(`inline <${kind}> not covered by the policy: ${content.trim().slice(0, 60)}`);
    }
  }
  for (const m of html.matchAll(/<script\b[^>]*\ssrc="([^"]*)"/gi)) {
    const src = m[1];
    if (/^https?:\/\//i.test(src) && !SCRIPT_HOSTS.some((host) => src.startsWith(`${host}/`))) fail(`script from unlisted host: ${src}`);
  }
  // Scripts in attributes: only outside <script>/<style> and text, i.e. inside tags.
  for (const m of html.matchAll(/<[a-z][^<>]*\s(on[a-z]+)\s*=/gi)) fail(`script in attribute ${m[1]}=`);
  if (/\shref\s*=\s*["']?\s*javascript:/i.test(html)) fail('javascript: link');
  for (const m of html.matchAll(/<(?:script|img|source|video|audio|iframe|link|embed)\b[^>]*\s(?:src|href|poster)="(http:\/\/[^"]*)"/gi)) {
    fail(`loads over plain http: ${m[1]}`);
  }
  if (!/<meta name="referrer" content="strict-origin-when-cross-origin"\s*\/?>/i.test(html)) fail('no referrer policy');
}

walk(dist);
if (errors.length) {
  const unique = [...new Set(errors)];
  console.error(`Security check failed (${unique.length}):\n${unique.slice(0, 50).join('\n')}${unique.length > 50 ? `\n… and ${unique.length - 50} more` : ''}`);
  process.exit(1);
}
console.log(`Security check passed: ${pages} pages with a Content Security Policy that covers every inline script and style.`);
