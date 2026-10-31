// Renders every ```ablauf block in blog articles, masterclass chapters and service pages to
// src/assets/diagrams/<hash>.svg (rules: "Content blocks" in docs/blog-guidelines.md).
// Run locally after writing or changing a diagram: node scripts/render-diagrams.mjs
// Needs the Mermaid CLI (npx -y @mermaid-js/mermaid-cli, or `mmdc` on the PATH) and
// Playwright with Chromium for the label check.
// The build only reads the stored SVGs, so CI needs no browser.
// To render every diagram again (for example after a style change), delete src/assets/diagrams/*.svg first.
// Stale SVGs (no block uses them any more) are deleted.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findBlocks, flowHash, flowToMermaid } from '../src/lib/content-blocks.mjs';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'src/assets/diagrams');
mkdirSync(out, { recursive: true });
const used = new Set();
const fresh = [];
let rendered = 0;
// Widest left-to-right diagram that still shows at full size in the article column;
// wider ones are laid out top to bottom.
const maxWidth = 700;

// Sora (the site font) for boxes and IBM Plex Mono for edge labels, so that Mermaid and
// the label check measure with the fonts the page uses.
const fontCss = join(tmpdir(), 'fk-diagram-fonts.css');
const font = (pkg, family, w) => `@font-face { font-family: '${family}'; font-weight: ${w}; src: url('data:font/woff2;base64,${readFileSync(join(root, `node_modules/@fontsource/${pkg}/files/${pkg}-latin-${w}-normal.woff2`)).toString('base64')}') format('woff2'); }`;
// Embedded as data URIs, because the headless browser does not load file:// fonts.
writeFileSync(fontCss, [font('sora', 'Sora', 400), font('sora', 'Sora', 600), font('ibm-plex-mono', 'IBM Plex Mono', 400)].join('\n'));

const mmdc = (() => {
  try { execFileSync('mmdc', ['--version'], { stdio: 'ignore' }); return ['mmdc']; } catch { return ['npx', '-y', '@mermaid-js/mermaid-cli']; }
})();
// Optional Puppeteer config for the Mermaid CLI, e.g. to point it at an installed Chromium.
const mmdcConfig = process.env.MMDC_PUPPETEER_CONFIG ? ['-p', process.env.MMDC_PUPPETEER_CONFIG] : [];
const widthOf = (svg) => +(svg.match(/viewBox="[\d.-]+ [\d.-]+ ([\d.]+)/)?.[1] ?? 600);

const renderSvg = (content, direction, name) => {
  const src = join(tmpdir(), `fk-diagram-${name}.mmd`);
  const target = join(tmpdir(), `fk-diagram-${name}.svg`);
  writeFileSync(src, flowToMermaid(content, direction));
  execFileSync(mmdc[0], [...mmdc.slice(1), '-i', src, '-o', target, '-b', 'transparent', '-I', `fk-diagram-${name}`, '-C', fontCss, ...mmdcConfig], { stdio: 'ignore' });
  const raw = readFileSync(target, 'utf8');
  // Keep the SVG lean and responsive: no fixed width, no XML header.
  // Mermaid's class "label" would pick up the site's .label style, so rename it.
  return raw
    .replace(/<\?xml[^>]*>\s*/, '')
    .replace(/ width="100%"/, '')
    .replace(/ style="max-width:[^"]*"/, '')
    .replace(/class="label"/g, 'class="fk-flow-label"')
    .replace(/\.label(?![\w-])/g, '.fk-flow-label')
    // Edge labels as opaque chips in the site's mono font, so the line never runs through them.
    .replace('</style>', `#fk-diagram-${name} .edgeLabel rect{opacity:1;fill:#ffffff;stroke:#c9ccd0;stroke-width:1px;}#fk-diagram-${name} .edgeLabel text{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;fill:#5a5a5e;}</style>`)
    // Natural width as a CSS variable, so the page never scales a diagram up (see global.css).
    .replace(/<svg /, (m) => `${m}style="--w: ${Math.round(widthOf(raw))}" `);
};

for (const collection of ['blog', 'masterclass', 'services']) {
  for (const lang of ['de', 'en']) {
    const dir = join(root, 'src/content', collection, lang);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      for (const block of findBlocks(readFileSync(join(dir, file), 'utf8')).filter((b) => b.name === 'ablauf')) {
        const hash = flowHash(block.content);
        if (used.has(hash)) continue;
        used.add(hash);
        const target = join(out, `${hash}.svg`);
        if (existsSync(target)) continue;
        // Left to right where it fits the column, with a top-to-bottom twin for phones
        // (<hash>-tb.svg); otherwise top to bottom everywhere.
        const tb = renderSvg(block.content, 'TB', `${hash}-tb`);
        const lr = renderSvg(block.content, 'LR', hash);
        if (widthOf(lr) > maxWidth) {
          writeFileSync(target, tb.replaceAll(`fk-diagram-${hash}-tb`, `fk-diagram-${hash}`));
          fresh.push(hash);
        } else {
          writeFileSync(target, lr);
          writeFileSync(join(out, `${hash}-tb.svg`), tb);
          fresh.push(hash, `${hash}-tb`);
        }
        rendered++;
        console.log(`rendered ${collection}/${lang}/${file} → src/assets/diagrams/${hash}.svg`);
      }
    }
  }
}
const files = [...used].flatMap((h) => (existsSync(join(out, `${h}-tb.svg`)) ? [h, `${h}-tb`] : [h]));

// Playwright may be installed globally, so load it the CommonJS way (honours NODE_PATH).
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
const fontFaces = readFileSync(fontCss, 'utf8');
const load = async (svg) => {
  await page.setContent(`<html><head><style>${fontFaces} svg .node text { font-family: 'Sora', sans-serif; }</style></head><body>${svg}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
};
// Fit each edge label chip to its text, measured in the mono font.
for (const name of fresh) {
  await load(readFileSync(join(out, `${name}.svg`), 'utf8'));
  const svg = await page.evaluate(() => {
    for (const g of document.querySelectorAll('g.edgeLabel')) {
      const text = g.querySelector('text');
      const rect = g.querySelector('rect');
      if (!text || !rect || !text.textContent.trim()) { rect?.remove(); continue; }
      // Drop the no-break spaces that only reserved room in the layout (see flowToMermaid).
      for (const t of text.querySelectorAll('tspan')) if (!t.children.length) t.textContent = t.textContent.replace(/\u00a0/g, '');
      const b = text.getBBox();
      const w = b.width + 14;
      const h = b.height + 6;
      Object.entries({ x: b.x + b.width / 2 - w / 2, y: b.y + b.height / 2 - h / 2, width: w, height: h, rx: 4 }).forEach(([k, v]) => rect.setAttribute(k, +(+v).toFixed(2)));
    }
    // Labels of a there-and-back pair sit side by side; push touching chips apart.
    const chips = [...document.querySelectorAll('g.edgeLabel')].filter((g) => g.querySelector('rect'));
    for (const [i, a] of chips.entries()) {
      for (const b of chips.slice(i + 1)) {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        const dx = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left) + 6;
        const dy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top) + 6;
        if (dx <= 0 || dy <= 0) continue;
        const [x, y] = dx < dy ? [dx / 2 * Math.sign(ra.left - rb.left || -1), 0] : [0, dy / 2 * Math.sign(ra.top - rb.top || -1)];
        for (const [g, f] of [[a, 1], [b, -1]]) g.setAttribute('transform', `${g.getAttribute('transform') ?? ''} translate(${(x * f).toFixed(2)}, ${(y * f).toFixed(2)})`);
      }
    }
    return document.querySelector('svg').outerHTML;
  });
  writeFileSync(join(out, `${name}.svg`), svg);
}
// Every box label must fit its box with room to spare, and no edge label may touch a
// box or another edge label. A diagram with clipped or covered text helps nobody, so
// this fails the run.
const problems = [];
for (const name of files) {
  await load(readFileSync(join(out, `${name}.svg`), 'utf8'));
  const bad = await page.evaluate(() => {
    const issues = [];
    const boxes = [...document.querySelectorAll('g.node')].map((g) => ({ g, text: g.querySelector('text'), shape: g.querySelector('rect, path, polygon') })).filter((n) => n.text && n.shape);
    for (const { text, shape } of boxes) {
      const t = text.getBoundingClientRect();
      const r = shape.getBoundingClientRect();
      const room = Math.min(t.left - r.left, r.right - t.right);
      if (room < 8) issues.push(`"${text.textContent}" has ${room.toFixed(1)}px room`);
    }
    const chips = [...document.querySelectorAll('g.edgeLabel rect')].map((r) => ({ name: r.parentNode.querySelector('text')?.textContent, r: r.getBoundingClientRect() }));
    const hit = (a, b, gap) => a.left < b.right + gap && b.left < a.right + gap && a.top < b.bottom + gap && b.top < a.bottom + gap;
    chips.forEach((c, i) => {
      for (const { text, shape } of boxes) if (hit(c.r, shape.getBoundingClientRect(), 2)) issues.push(`edge label "${c.name}" touches box "${text.textContent}"`);
      for (const d of chips.slice(i + 1)) if (hit(c.r, d.r, 2)) issues.push(`edge labels "${c.name}" and "${d.name}" overlap`);
    });
    return issues;
  });
  if (bad.length) problems.push(`${name}.svg: ${bad.join(', ')}`);
}
await browser.close();
if (problems.length) {
  console.error(`Labels do not fit, shorten the labels or rerun:\n- ${problems.join('\n- ')}`);
  process.exitCode = 1;
}

const keep = new Set(files);
for (const f of readdirSync(out).filter((f) => f.endsWith('.svg'))) {
  if (!keep.has(f.replace(/\.svg$/, ''))) { rmSync(join(out, f)); console.log(`removed stale ${f}`); }
}
console.log(`${rendered} diagram(s) rendered, ${used.size} in use.`);
