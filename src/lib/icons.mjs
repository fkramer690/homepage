// Icons from src/icons/ for the Markdown plugins, which build their HTML outside of
// Astro components: as an HTML string (content blocks) or as a hast node (external links).
import { readFileSync } from 'node:fs';

const cache = new Map();
const source = (name) => {
  if (!cache.has(name)) cache.set(name, readFileSync(new URL(`../icons/${name}.svg`, import.meta.url), 'utf8').trim());
  return cache.get(name);
};
const attrs = (text) => Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const camel = (key) => key.replace(/-(\w)/g, (_, c) => c.toUpperCase());

// SVG markup with the given class, hidden from screen readers.
export function iconHtml(name, className) {
  const cls = className ? ` class="${className}"` : '';
  return source(name).replace(' xmlns="http://www.w3.org/2000/svg"', `${cls} aria-hidden="true"`);
}

// The same icon as a hast element. Icon files are flat: one <svg> with self-closing children.
export function iconHast(name, className) {
  const text = source(name);
  const props = (a) => Object.fromEntries(Object.entries(a).filter(([k]) => k !== 'xmlns').map(([k, v]) => [camel(k), v]));
  const root = attrs(text.match(/^<svg([^>]*)>/)[1]);
  const children = [...text.matchAll(/<(\w+)([^>]*?)\/>/g)].map((m) => ({ type: 'element', tagName: m[1], properties: props(attrs(m[2])), children: [] }));
  return { type: 'element', tagName: 'svg', properties: { ...props(root), ...(className ? { className: [className] } : {}), ariaHidden: 'true' }, children };
}
