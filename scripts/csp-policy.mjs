// The Content Security Policy of the site, shared by scripts/add-csp.mjs (writes it
// into every page) and scripts/check-security.mjs (checks it). GitHub Pages cannot send
// HTTP headers, so the policy is a <meta http-equiv="content-security-policy"> tag.
//
// Allowed: this site, plus the two outside services the site really uses:
//   - Cloudflare Web Analytics: script from static.cloudflareinsights.com,
//     beacon to cloudflareinsights.com
//   - Web3Forms: the contact form posts to api.web3forms.com
// A new outside service (script, form, embed, image host) needs its host here, or the
// browser blocks it. Inline <script> and <style> elements are allowed by their SHA-256
// hash only, which scripts/add-csp.mjs computes per page. Style attributes (drawings,
// content blocks) stay allowed; scripts in attributes (onclick=…) do not.
import { createHash } from 'node:crypto';

export const SCRIPT_HOSTS = ['https://static.cloudflareinsights.com'];

const fixed = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self' https://api.web3forms.com",
  "connect-src 'self' https://api.web3forms.com https://cloudflareinsights.com",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "frame-src 'none'",
  "manifest-src 'self'",
  "worker-src 'none'",
  "style-src-attr 'unsafe-inline'",
];

// Inline <script> elements the browser executes (not JSON-LD or other data blocks).
const EXECUTABLE = /^(|module|text\/javascript|application\/javascript)$/i;

/** Inline scripts and styles of a page: [{ kind: 'script' | 'style', content }]. */
export function inlineElements(html) {
  const found = [];
  for (const m of html.matchAll(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const [, tag, attrs, content] = m;
    const kind = tag.toLowerCase();
    if (kind === 'script') {
      if (/\ssrc\s*=/i.test(attrs)) continue;
      const type = attrs.match(/\stype\s*=\s*["']?([^"'\s>]*)/i)?.[1] ?? '';
      if (!EXECUTABLE.test(type)) continue;
    }
    found.push({ kind, content });
  }
  return found;
}

export const hash = (content) => `'sha256-${createHash('sha256').update(content, 'utf8').digest('base64')}'`;

/** The policy for one page, with the hashes of its own inline scripts and styles. */
export function policyFor(html) {
  const elements = inlineElements(html);
  const hashes = (kind) => [...new Set(elements.filter((e) => e.kind === kind).map((e) => hash(e.content)))];
  return [
    ...fixed,
    ["script-src 'self'", ...SCRIPT_HOSTS, ...hashes('script')].join(' '),
    ["style-src 'self'", ...hashes('style')].join(' '),
  ].join('; ');
}

export const META_RE = /<meta http-equiv="content-security-policy" content="[^"]*">/i;
