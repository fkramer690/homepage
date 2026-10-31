// Exports the card drawings of the blog overview (src/lib/card-drawings.ts) as standalone
// SVG files, to look at or share one drawing outside the site.
// Output: previews/card-drawings/<translationKey>-<lang>.svg (git-ignored, regenerate any time).
// `npm run cards:export` exports all; `npm run cards:export -- <key> [<key> …]` only those.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';

const out = new URL('../previews/card-drawings/', import.meta.url).pathname;
const { cardDrawings } = await import('../src/lib/card-drawings.ts');
const keys = process.argv.slice(2);

if (!keys.length) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
let n = 0;
for (const [key, lang, inner] of cardDrawings()) {
  if (keys.length && !keys.includes(key)) continue;
  writeFileSync(`${out}${key}-${lang}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 320 160" font-family="IBM Plex Mono, monospace"><rect width="320" height="160" fill="#f7f8f9"/>${inner}</svg>\n`);
  n++;
}
if (keys.length && !n) { console.error(`No card drawing for: ${keys.join(', ')}`); process.exit(1); }
console.log(`${n} card drawings exported to previews/card-drawings/`);
