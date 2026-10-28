// Renders every ```ablauf block in blog articles and masterclass chapters to
// src/assets/diagrams/<hash>.svg (rules: "Content blocks" in docs/blog-guidelines.md).
// Run locally after writing or changing a diagram: node scripts/render-diagrams.mjs
// Needs the Mermaid CLI (npx -y @mermaid-js/mermaid-cli, or `mmdc` on the PATH) and
// Playwright with Chromium for the label check.
// The build only reads the stored SVGs, so CI needs no browser.
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
let rendered = 0;

// Sora (the site font) so that Mermaid measures labels with the same font the page uses.
const fontCss = join(tmpdir(), 'fk-diagram-fonts.css');
const fontDir = join(root, 'node_modules/@fontsource/sora/files');
// Embedded as data URIs, because the headless browser does not load file:// fonts.
writeFileSync(fontCss, [400, 600].map((w) => `@font-face { font-family: 'Sora'; font-weight: ${w}; src: url('data:font/woff2;base64,${readFileSync(join(fontDir, `sora-latin-${w}-normal.woff2`)).toString('base64')}') format('woff2'); }`).join('\n'));

const mmdc = (() => {
  try { execFileSync('mmdc', ['--version'], { stdio: 'ignore' }); return ['mmdc']; } catch { return ['npx', '-y', '@mermaid-js/mermaid-cli']; }
})();

for (const collection of ['blog', 'masterclass']) {
  for (const lang of ['de', 'en']) {
    const dir = join(root, 'src/content', collection, lang);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      for (const block of findBlocks(readFileSync(join(dir, file), 'utf8')).filter((b) => b.name === 'ablauf')) {
        const hash = flowHash(block.content);
        used.add(hash);
        const target = join(out, `${hash}.svg`);
        if (existsSync(target)) continue;
        const src = join(tmpdir(), `fk-diagram-${hash}.mmd`);
        writeFileSync(src, flowToMermaid(block.content));
        execFileSync(mmdc[0], [...mmdc.slice(1), '-i', src, '-o', target, '-b', 'transparent', '-I', `fk-diagram-${hash}`, '-C', fontCss], { stdio: 'inherit' });
        // Keep the SVG lean and responsive: no fixed width, no XML header.
        // Mermaid's class "label" would pick up the site's .label style, so rename it.
        const svg = readFileSync(target, 'utf8')
          .replace(/<\?xml[^>]*>\s*/, '')
          .replace(/ width="100%"/, '')
          .replace(/ style="max-width: [\d.]+px;?"/, '')
          .replace(/class="label"/g, 'class="fk-flow-label"')
          .replace(/\.label(?![\w-])/g, '.fk-flow-label');
        writeFileSync(target, svg);
        rendered++;
        console.log(`rendered ${collection}/${lang}/${file} → src/assets/diagrams/${hash}.svg`);
      }
    }
  }
}
// Every label must fit its box with room to spare, measured with the site font
// (Sora). A diagram with clipped text helps nobody, so this fails the run.
// Playwright may be installed globally, so load it the CommonJS way (honours NODE_PATH).
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
const fontFaces = readFileSync(fontCss, 'utf8');
const problems = [];
for (const hash of used) {
  const svg = readFileSync(join(out, `${hash}.svg`), 'utf8');
  await page.setContent(`<html><head><style>${fontFaces} svg text { font-family: 'Sora', sans-serif; }</style></head><body>${svg}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const bad = await page.evaluate(() => [...document.querySelectorAll('g.node')].flatMap((g) => {
    const text = g.querySelector('text');
    const shape = g.querySelector('rect, path, polygon');
    if (!text || !shape) return [];
    const t = text.getBoundingClientRect();
    const r = shape.getBoundingClientRect();
    const room = Math.min(t.left - r.left, r.right - t.right);
    return room < 8 ? [`"${text.textContent}" has ${room.toFixed(1)}px room`] : [];
  }));
  if (bad.length) problems.push(`${hash}.svg: ${bad.join(', ')}`);
}
await browser.close();
if (problems.length) {
  console.error(`Labels do not fit their boxes, shorten the labels or rerun:\n- ${problems.join('\n- ')}`);
  process.exitCode = 1;
}

for (const f of readdirSync(out).filter((f) => f.endsWith('.svg'))) {
  if (!used.has(f.replace(/\.svg$/, ''))) { rmSync(join(out, f)); console.log(`removed stale ${f}`); }
}
console.log(`${rendered} diagram(s) rendered, ${used.size} in use.`);
