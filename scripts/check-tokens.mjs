// Colours, radii and shadows come from the tokens in src/styles/global.css
// (docs/layouts.md, "Colours, radii and shadows"):
// - hex colours only in the :root block of global.css,
// - border radius only 0, 50% (circles) or var(--radius…),
// - box-shadow only none, a token var(--…) or an outline ring 0 0 0 Npx var(--…).
// Checks src/styles/*.css and every <style> block in src/**/*.astro.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const src = join(root, 'src');
const errors = [];
let files = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.css')) check(path, readFileSync(path, 'utf8'), 0);
    else if (name.endsWith('.astro')) {
      const text = readFileSync(path, 'utf8');
      for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) check(path, m[1], text.slice(0, m.index).split('\n').length - 1);
    }
  }
}

function check(path, css, lineOffset) {
  files++;
  const file = relative(root, path);
  let text = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  if (file === 'src/styles/global.css') {
    const m = text.match(/:root\s*\{[^}]*\}/);
    if (m) text = text.replace(m[0], m[0].replace(/[^\n]/g, ' '));
  }
  const line = (i) => lineOffset + text.slice(0, i).split('\n').length;
  for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) errors.push(`${file}:${line(m.index)} hex colour ${m[0]}: use a colour token`);
  for (const m of text.matchAll(/border(?:-[a-z]+)*-radius\s*:\s*([^;}]+)/g)) {
    for (const v of m[1].trim().replace(/\s*!important$/, '').split(/\s+/)) {
      if (!/^(0|50%|var\(--radius(-[a-z]+)?\))$/.test(v)) errors.push(`${file}:${line(m.index)} radius ${v}: use --radius, --radius-md, --radius-sm, --radius-xs or --radius-pill`);
    }
  }
  for (const m of text.matchAll(/box-shadow\s*:\s*([^;}]+)/g)) {
    const value = m[1].trim().replace(/\s*!important$/, '');
    if (value === 'none') continue;
    for (const part of value.split(/,(?![^(]*\))/).map((p) => p.trim())) {
      if (!/^(var\(--[a-z0-9-]+\)|0 0 0 \d+(\.\d+)?px var\(--[a-z0-9-]+\))$/.test(part)) errors.push(`${file}:${line(m.index)} shadow "${part}": use a shadow token`);
    }
  }
}

walk(src);
if (errors.length) {
  console.error(`Token check failed (${errors.length}): colours, radii and shadows must use the tokens in src/styles/global.css (docs/layouts.md).`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log(`Token check passed: ${files} stylesheets use only colour, radius and shadow tokens.`);
