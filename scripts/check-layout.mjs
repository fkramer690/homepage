// Runs after `astro build`: every page follows the width system in
// docs/layouts.md ("Page width").
// - <main> declares data-layout="reading" or "wide".
// - Reading pages put their text into exactly one ReadingGrid (.page-grid with
//   .page-main and .page-side); all running text (.prose) sits in .page-main.
// - Wide pages (overviews, start page) carry no running text (.prose).
// - No CSS rule gives a .container (or a class used together with it inside
//   <main>) its own width or max-width, so every page uses the same frame.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const containerClasses = new Set(['container']);
const css = [];
let pages = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) checkPage(path, readFileSync(path, 'utf8'));
    else if (name.endsWith('.css')) css.push([path.slice(dist.length), readFileSync(path, 'utf8')]);
  }
}

function checkPage(path, html) {
  const page = '/' + path.slice(dist.length).replace(/index\.html$/, '');
  for (const [, style] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) css.push([page, style]);
  const mainStart = html.search(/<main[\s>]/);
  if (mainStart < 0) return; // redirect pages
  pages++;
  const main = html.slice(mainStart, html.indexOf('</main>', mainStart));
  for (const [, cls] of main.matchAll(/class="([^"]*)"/g)) {
    const list = cls.split(/\s+/);
    if (list.includes('container')) list.forEach((c) => containerClasses.add(c));
  }
  const layout = main.match(/^<main[^>]*\sdata-layout="([^"]*)"/)?.[1];
  const has = (cls) => [...main.matchAll(new RegExp(`class="(?:[^"]*\\s)?${cls}(?:\\s[^"]*)?"`, 'g'))].map((m) => m.index);
  const prose = has('prose');
  if (layout === 'reading') {
    const grids = has('page-grid');
    const [mainCol] = has('page-main');
    const [side] = has('page-side');
    if (grids.length !== 1 || mainCol === undefined || side === undefined) {
      errors.push(`${page}: reading page needs exactly one ReadingGrid (.page-grid with .page-main and .page-side)`);
    } else if (prose.some((i) => i < mainCol || i > side)) {
      errors.push(`${page}: running text (.prose) outside the reading column of ReadingGrid`);
    }
  } else if (layout === 'wide') {
    if (prose.length) errors.push(`${page}: wide page contains running text (.prose); use layout "reading" with ReadingGrid`);
  } else {
    errors.push(`${page}: <main> needs data-layout="reading" or "wide"`);
  }
}

walk(dist);

// Innermost CSS rules (also those inside @media), selectors without Astro's
// scoping attributes.
for (const [file, text] of css) {
  for (const [, selectors, body] of text.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/(^|;|\s)(max-)?width\s*:/.test(body)) continue;
    for (const raw of selectors.split(',')) {
      const selector = raw.replace(/\[[^\]]*\]/g, '').trim();
      if (selector === '.container' || selector.startsWith('@')) continue;
      const last = selector.split(/[\s>+~]+/).pop();
      const hit = last.match(/\.[\w-]+/g)?.map((c) => c.slice(1)).find((c) => containerClasses.has(c));
      if (hit) errors.push(`${file}: "${selector}" sets a width on .${hit}, which is used on a .container; keep the frame width in --max`);
    }
  }
}

if (errors.length) {
  console.error(`Layout check failed:\n${[...new Set(errors)].map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`Layout check passed: ${pages} pages follow the width system (one frame, reading pages with ReadingGrid).`);
