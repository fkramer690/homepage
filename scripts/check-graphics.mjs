// Checks that the inline drawings on the built pages stay inside their frame.
// Runs after `astro build` on every HTML file in dist/ and fails the build when a label
// - runs over the edge of its drawing (canvas minus a small margin),
// - starts inside a box but sticks out of it,
// - runs into a box it does not belong to,
// - is crossed by a line or arrow or touches an icon, or
// - overlaps another label.
// The drawings set their text in IBM Plex Mono (global.css), where every glyph is
// 0.6 em wide, so label widths are exact without a browser.
// Checked: the card drawings of the blog overview (src/lib/card-drawings.ts, every
// article in both languages), the figure on the masterclass hubs and the partner flow
// block (```partnerfluss, src/lib/content-blocks.mjs). Any other inline SVG with <text> fails until its class is
// listed here, so a new kind of drawing cannot slip past unchecked.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const CHECKED = ['mc-drawing', 'pf-drawing'];
// card-drawing: checked straight from src/lib/card-drawings.ts below.
// flowchart: Mermaid diagrams, scripts/render-diagrams.mjs checks their labels when it renders them.
const SKIPPED = ['card-drawing', 'flowchart'];
const ADVANCE = 0.6; // IBM Plex Mono: 600 of 1000 units per glyph
const ASCENT = 0.78; // top of capitals and umlauts above the baseline, in em
const DESCENT = 0.2; // descenders below the baseline, in em
const EDGE = 4; // free margin to the drawing's edge
const PAD_X = 3; // free space between a label and the border of its box
const PAD_Y = 2;
const GAP = 3; // free space beside a label to a foreign box, line or icon
const WORD = 3.5; // free space between two labels on the same line

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) files.push(path);
  }
};
walk(dist);

const decode = (s) =>
  s.replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const num = (v, d = 0) => (v === undefined ? d : parseFloat(v));
const inside = (a, b) => a.x1 >= b.x1 && a.x2 <= b.x2 && a.y1 >= b.y1 && a.y2 <= b.y2;
const hits = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
const r1 = (n) => Math.round(n * 10) / 10;

// The straight pieces of a path (curves sampled), moved by the translate of its group.
function segments(d, ox, oy) {
  const segs = [];
  const toks = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) ?? [];
  let i = 0, x = 0, y = 0, sx = 0, sy = 0, cmd = '';
  const n = () => parseFloat(toks[i++]);
  const to = (nx, ny) => { segs.push([x + ox, y + oy, nx + ox, ny + oy]); x = nx; y = ny; };
  while (i < toks.length) {
    if (/[a-zA-Z]/.test(toks[i])) cmd = toks[i++];
    const rel = cmd === cmd.toLowerCase();
    const bx = rel ? x : 0, by = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case 'M': x = n() + bx; y = n() + by; sx = x; sy = y; cmd = rel ? 'l' : 'L'; break;
      case 'L': to(n() + bx, n() + by); break;
      case 'H': to(n() + bx, y); break;
      case 'V': to(x, n() + by); break;
      case 'C': {
        const [x0, y0] = [x, y];
        const p = [n() + bx, n() + by, n() + bx, n() + by, n() + bx, n() + by];
        for (let k = 1; k <= 8; k++) {
          const t = k / 8, u = 1 - t;
          to(u ** 3 * x0 + 3 * u * u * t * p[0] + 3 * u * t * t * p[2] + t ** 3 * p[4], u ** 3 * y0 + 3 * u * u * t * p[1] + 3 * u * t * t * p[3] + t ** 3 * p[5]);
        }
        break;
      }
      case 'S': case 'Q': n(); n(); to(n() + bx, n() + by); break;
      case 'T': to(n() + bx, n() + by); break;
      case 'A': n(); n(); n(); n(); n(); to(n() + bx, n() + by); break;
      case 'Z': to(sx, sy); break;
      default: i++;
    }
  }
  return segs;
}

// Does the segment cross the rectangle? (Liang-Barsky clipping)
function crosses([x1, y1, x2, y2], r) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1, dy = y2 - y1;
  for (const [p, q] of [[-dx, x1 - r.x1], [dx, r.x2 - x1], [-dy, y1 - r.y1], [dy, r.y2 - y1]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}

function check(svg) {
  const problems = [];
  const [w, h] = (attrs(svg.match(/<svg[^>]*>/)[0]).viewBox ?? '').split(/\s+/).slice(2).map(Number);
  const canvas = { x1: EDGE, y1: EDGE, x2: w - EDGE, y2: h - EDGE };
  // Boxes: every rect except the background. Small rects (legend squares, icons), dots
  // and every line, arrow and icon stroke are marks no label may touch.
  const boxes = [];
  const marks = [];
  const lines = [];
  const stack = [[0, 0]];
  for (const m of svg.matchAll(/<(\/?)(g|rect|circle|path)\b([^>]*?)(\/?)>/g)) {
    const [, close, tag, rest, selfClose] = m;
    const [ox, oy] = stack.at(-1);
    if (tag === 'g') {
      if (close) stack.pop();
      else if (!selfClose) {
        const tr = rest.match(/translate\(\s*([-\d.]+)[\s,]+([-\d.]+)\s*\)/);
        stack.push(tr ? [ox + +tr[1], oy + +tr[2]] : [ox, oy]);
      }
      continue;
    }
    const a = attrs(rest);
    if (tag === 'path') {
      // Background grid lines run edge to edge and are not part of the drawing.
      const grid = (g) => (g[0] === g[2] && Math.min(g[1], g[3]) <= 0 && Math.max(g[1], g[3]) >= h) || (g[1] === g[3] && Math.min(g[0], g[2]) <= 0 && Math.max(g[0], g[2]) >= w);
      lines.push(...segments(a.d ?? '', ox, oy).filter((g) => !grid(g)));
      continue;
    }
    if (tag === 'circle') {
      const cx = num(a.cx) + ox, cy = num(a.cy) + oy, r = num(a.r);
      marks.push({ x1: cx - r, y1: cy - r, x2: cx + r, y2: cy + r });
      continue;
    }
    const x = num(a.x) + ox, y = num(a.y) + oy, bw = num(a.width), bh = num(a.height);
    if (x === 0 && y === 0 && bw === w && bh === h) continue;
    if (bw < 14 || bh < 10) marks.push({ x1: x, y1: y, x2: x + bw, y2: y + bh });
    else boxes.push({ x1: x, y1: y, x2: x + bw, y2: y + bh });
  }
  const labels = [];
  for (const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = attrs(m[1]);
    const s = decode(m[2]);
    const size = num(a['font-size'], 16);
    const ls = a['letter-spacing']?.endsWith('em') ? parseFloat(a['letter-spacing']) * size : num(a['letter-spacing']);
    const len = [...s].length;
    const width = len * ADVANCE * size + Math.max(0, len - 1) * ls;
    const x = num(a.x), y = num(a.y);
    const anchor = a['text-anchor'] ?? 'start';
    const x1 = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
    labels.push({ s, x, y, x1, x2: x1 + width, y1: y - ASCENT * size, y2: y + DESCENT * size });
  }
  for (const l of labels) {
    const name = `"${l.s}"`;
    if (!inside(l, canvas)) problems.push(`${name} runs over the edge (x ${r1(l.x1)} to ${r1(l.x2)} of ${w}, y ${r1(l.y1)} to ${r1(l.y2)} of ${h})`);
    for (const b of boxes) {
      const home = l.x >= b.x1 && l.x <= b.x2 && l.y >= b.y1 && l.y <= b.y2;
      const room = { x1: b.x1 + PAD_X, y1: b.y1 + PAD_Y, x2: b.x2 - PAD_X, y2: b.y2 - PAD_Y };
      if (home && !inside(l, room)) problems.push(`${name} sticks out of its box (label ${r1(l.x1)} to ${r1(l.x2)}, box ${b.x1} to ${b.x2})`);
      if (!home && !inside(b, l) && hits({ ...l, x1: l.x1 - GAP, x2: l.x2 + GAP }, b) && !inside(l, b)) problems.push(`${name} runs into the box at x ${b.x1}, y ${b.y1}`);
    }
    // Lines and marks may pass close by, but not through the letters; sideways they keep
    // a small gap so an icon or arrow never sits glued to a word.
    const core = { x1: l.x1 - GAP, y1: l.y1 + 0.5, x2: l.x2 + GAP, y2: l.y2 - 0.5 };
    const mark = marks.find((k) => hits(core, k));
    if (mark) problems.push(`${name} touches a mark at x ${r1(mark.x1)}, y ${r1(mark.y1)}`);
    const line = lines.find((g) => crosses(g, core));
    if (line) problems.push(`${name} is crossed by a line from ${r1(line[0])},${r1(line[1])} to ${r1(line[2])},${r1(line[3])}`);
  }
  // Two labels on one line keep a word space between them, otherwise they read as one.
  labels.forEach((a, i) => labels.slice(i + 1).forEach((b) => {
    if (hits({ ...a, x1: a.x1 - WORD, x2: a.x2 + WORD }, b)) problems.push(`"${a.s}" overlaps or touches "${b.s}"`);
  }));
  return problems;
}

const errors = [];
let count = 0;

// Card drawings, checked per article and language so the message names the drawing.
const { cardDrawings } = await import('../src/lib/card-drawings.ts');
for (const [key, lang, inner] of cardDrawings()) {
  count++;
  for (const p of check(`<svg viewBox="0 0 320 160">${inner}</svg>`)) errors.push(`card drawing "${key}" (${lang}), src/lib/card-drawings.ts: ${p}`);
}

// Every other inline drawing on the built pages.
const seen = new Set();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<svg\b[^>]*>[\s\S]*?<\/svg>/g)) {
    const svg = m[0];
    if (!svg.includes('<text')) continue;
    const classes = (attrs(svg.match(/<svg[^>]*>/)[0]).class ?? '').split(/\s+/);
    if (classes.some((c) => SKIPPED.includes(c))) continue;
    const page = '/' + relative(dist, file);
    const cls = classes.find((c) => CHECKED.includes(c));
    if (!cls) {
      errors.push(`${page}: inline SVG with text (class "${classes.join(' ')}") is not covered by scripts/check-graphics.mjs, add its class there`);
      continue;
    }
    if (seen.has(svg)) continue;
    seen.add(svg);
    count++;
    for (const p of check(svg)) errors.push(`${page} (${cls}): ${p}`);
  }
}

if (errors.length) {
  console.error(`Graphics check failed: ${errors.length} problem(s)\n` + [...new Set(errors)].map((e) => '  - ' + e).join('\n'));
  console.error('\nShorten the label, make the box wider or move it; see "Card image" in docs/blog-guidelines.md.');
  process.exit(1);
}
console.log(`Graphics check passed: ${count} drawings, every label inside its frame and box.`);
