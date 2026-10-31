// Every graphic on the site must be in the review register docs/graphics-review.json,
// so that it is always clear what Fabian has rated and what is still open
// (process: docs/graphics-review.md).
// Graphics found in the code (content blocks, explanatory PNGs, certification graphics,
// card drawings, masterclass hub drawings, icons) must each have an entry; a new one is
// added with "rating": null (open). Entries of these kinds without a graphic fail too.
// Layouts, page elements and preview images (prefixes layout:, page:, og:) are kept by hand.
// Runs before `astro build`; never weaken it.
import { readdirSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url).pathname;
const register = JSON.parse(readFileSync(`${root}docs/graphics-review.json`, 'utf8')).entries;
const ids = Object.keys(register);
const errors = [];

const names = (dir, re) => [...new Set(readdirSync(`${root}${dir}`).filter((f) => re.test(f)).map((f) => f.replace(re, '')))];

const { blockNames } = await import('../src/lib/content-blocks.mjs');
const { cardDrawings } = await import('../src/lib/card-drawings.ts');
const { courseIds } = await import('../src/lib/courses.ts');
const photos = readFileSync(`${root}src/data/photos.ts`, 'utf8');
const withPhoto = new Set([...(photos.match(/coursePhotos[^{]*\{([^}]*)\}/)?.[1] ?? '').matchAll(/'?([a-z-]+)'?\s*:/g)].map((m) => m[1]));

// kind -> graphics in the code; a content block counts as rated through `block:<name>`
// or one entry per variant (`block:<name>-<variant>`).
const found = {
  block: blockNames,
  png: names('src/assets/blog', /-(de|en)\.png$/),
  cert: names('src/assets/certifications', /-(wide|narrow)-(de|en)\.png$/),
  card: [...new Set(cardDrawings().map(([key]) => key))],
  hub: courseIds.filter((c) => !withPhoto.has(c)),
  icon: names('src/icons', /\.svg$/),
};
const manual = ['layout', 'page', 'og'];

for (const [kind, list] of Object.entries(found)) {
  for (const name of list) {
    const ok = kind === 'block' ? ids.some((id) => id === `block:${name}` || id.startsWith(`block:${name}-`)) : ids.includes(`${kind}:${name}`);
    if (!ok) errors.push(`${kind}:${name} is not in docs/graphics-review.json; add it with "rating": null so it enters the next review`);
  }
}
for (const id of ids) {
  const [kind, name] = [id.slice(0, id.indexOf(':')), id.slice(id.indexOf(':') + 1)];
  const e = register[id];
  if (!found[kind] && !manual.includes(kind)) errors.push(`${id}: unknown kind "${kind}" (allowed: ${[...Object.keys(found), ...manual].join(', ')})`);
  else if (kind === 'block' ? !found.block.some((b) => name === b || name.startsWith(`${b}-`)) : found[kind] && !found[kind].includes(name)) errors.push(`${id}: no such graphic any more; remove the entry`);
  if (![1, 2, 3, null].includes(e.rating)) errors.push(`${id}: rating must be 1, 2, 3 or null`);
  if (e.rating !== null && !/^\d{4}-\d{2}-\d{2}$/.test(e.ratedOn ?? '')) errors.push(`${id}: a rated entry needs "ratedOn": "YYYY-MM-DD"`);
  if (!e.title) errors.push(`${id}: needs a title`);
}

if (errors.length) {
  console.error(`Graphics review check failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
const open = ids.filter((id) => register[id].rating === null);
const count = (r) => ids.filter((id) => register[id].rating === r).length;
console.log(`Graphics review check passed: ${ids.length} graphics registered, rated ${count(1)}× 1, ${count(2)}× 2, ${count(3)}× 3, ${open.length} open.`);
if (open.length) console.log(`  Open (not rated yet): ${open.slice(0, 12).join(', ')}${open.length > 12 ? `, … (${open.length - 12} more)` : ''}`);
