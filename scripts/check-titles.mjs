// Runs after `astro build`: every indexable page needs a <title> of at most 60
// characters and about 580 px (what search results show before cutting) that no
// other page uses, and a meta description of at most 160 characters.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { MAX_TITLE_CHARS, MAX_TITLE_PX, titleWidth } from '../src/lib/page-title.mjs';

const MAX = MAX_TITLE_CHARS;
const MAX_DESCRIPTION = 160;
const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const seen = new Map();

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name === 'index.html') {
      const html = readFileSync(path, 'utf8');
      if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
      const page = '/' + path.slice(dist.length).replace(/index\.html$/, '');
      const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1].trim() ?? '');
      if (!title) errors.push(`missing <title>: ${page}`);
      else if (title.length > MAX) errors.push(`<title> longer than ${MAX} characters (${title.length}): ${page} "${title}"`);
      else if (titleWidth(title) > MAX_TITLE_PX) errors.push(`<title> wider than ${MAX_TITLE_PX} px in search results (${titleWidth(title)} px): ${page} "${title}"`);
      if (title && seen.has(title)) errors.push(`duplicate <title> "${title}": ${seen.get(title)} and ${page}`);
      seen.set(title, page);
      const description = decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1].trim() ?? '');
      if (!description) errors.push(`missing meta description: ${page}`);
      else if (description.length > MAX_DESCRIPTION) errors.push(`meta description longer than ${MAX_DESCRIPTION} characters (${description.length}): ${page}`);
    }
  }
}
walk(dist);

if (errors.length) {
  console.error(`Title check failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`Title check passed: ${seen.size} indexable pages, unique titles of at most ${MAX} characters and ${MAX_TITLE_PX} px, meta descriptions of at most ${MAX_DESCRIPTION}.`);
