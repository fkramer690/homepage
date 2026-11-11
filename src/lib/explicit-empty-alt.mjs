// Astro renders a dynamic empty attribute without its value, so alt="" on a
// decorative image ends up as a bare `alt` in the HTML. That is valid, but
// crawlers such as Bing Webmaster Tools report it as "alt attribute missing".
// After the build this integration writes every bare `alt` on an <img> back
// as alt="". scripts/check-images.mjs then checks that every <img> has one.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const bareAlt = /(\salt)(?=[\s/>])(?!\s*=)/gi;

function fixFile(path) {
  const html = readFileSync(path, 'utf8');
  const out = html.replace(/<img\b[^>]*>/gi, (tag) => tag.replace(bareAlt, '$1=""'));
  if (out !== html) writeFileSync(path, out);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) fixFile(path);
  }
}

export function explicitEmptyAlt() {
  return {
    name: 'explicit-empty-alt',
    hooks: {
      'astro:build:done': ({ dir }) => walk(fileURLToPath(dir)),
    },
  };
}
