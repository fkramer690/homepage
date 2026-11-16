// Ring and cycle drawings (layouts "Ring with details in the centre" and "Cycle with
// labelled stations" in docs/layouts.md, chosen by Fabian 2026-11-11). One renderer for
// the content blocks ```ring and ```kreislauf (src/lib/content-blocks.mjs) and for the
// pages that place them from data (ApproachRing.astro, maschinenbau, masterclass overview,
// field service page). The interaction (hover, focus, tap) lives in
// src/components/RingCycleScript.astro, the styles under "Ring and cycle" in global.css.
// Without script every detail card stands below the drawing.
//
// Geometry is in the units of the SVG viewBox. Labels are checked with ringProblems() and
// cycleProblems(): by check-blog (blocks, via validateBlock) and check-graphics (pages).
import { iconHtml } from './icons.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const point = (r, deg, cx = 200, cy = 200) => {
  const t = ((deg - 90) * Math.PI) / 180;
  return [+(cx + r * Math.cos(t)).toFixed(2), +(cy + r * Math.sin(t)).toFixed(2)];
};

// Segment colours in order; every one carries white mono labels.
export const RING_COLOURS = ['var(--cyan)', 'var(--cyan-dark)', 'var(--text-2)', 'var(--anthracite)', 'var(--cyan-light)', 'var(--grey-600)', 'var(--grey-500)'];
export const RING = { outer: 196, inner: 130, gap: 2.5, spacing: 1.5 };
const ringLabelSize = (n) => (n > 4 ? 11.5 : 13);
const ringIconRadius = (n) => (n > 4 ? 15 : 17);

export function ringSegments(n) {
  const { outer: ro, inner: ri, gap: g } = RING;
  const step = 360 / n;
  return Array.from({ length: n }, (_, i) => {
    // The first segment ends at 12 o'clock, the others follow clockwise.
    const a0 = (i - 1) * step + g;
    const a1 = i * step - g;
    const mid = (a0 + a1) / 2;
    const [x0, y0] = point(ro, a0), [x1, y1] = point(ro, a1), [x2, y2] = point(ri, a1), [x3, y3] = point(ri, a0);
    const path = `M${x0} ${y0}A${ro} ${ro} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${ri} ${ri} 0 0 0 ${x3} ${y3}Z`;
    // Upper half reads along the arc (text outward of the baseline); the lower half is
    // mirrored so no label stands on its head (text inward of the baseline).
    const upper = Math.cos((mid * Math.PI) / 180) >= -0.01;
    const lr = upper ? ro - 18 : ro - 9;
    const b0 = a0 + 2, b1 = a1 - 2;
    const [l0x, l0y] = point(lr, upper ? b0 : b1), [l1x, l1y] = point(lr, upper ? b1 : b0);
    const labelPath = `M${l0x} ${l0y}A${lr} ${lr} 0 0 ${upper ? 1 : 0} ${l1x} ${l1y}`;
    const r = ringIconRadius(n);
    const [ix, iy] = point(ri + r + 9, mid);
    return { path, labelPath, labelRadius: lr, arc: [b0, b1], icon: { x: ix, y: iy, r }, upper };
  });
}

// Labels are IBM Plex Mono capitals: every glyph 0.6 em wide, capitals 0.78 em high.
export function ringProblems(labels) {
  const problems = [];
  const n = labels.length;
  const size = ringLabelSize(n);
  const segs = ringSegments(n);
  labels.forEach((text, i) => {
    const s = segs[i];
    const width = text.length * size * 0.6 + (text.length - 1) * RING.spacing;
    const room = ((s.arc[1] - s.arc[0]) * Math.PI * s.labelRadius) / 180 - 8;
    if (width > room) problems.push(`label "${text}" is ${width.toFixed(0)} wide, its arc has room for ${room.toFixed(0)}`);
    const top = s.upper ? s.labelRadius + size * 0.78 : s.labelRadius;
    const bottom = s.upper ? s.labelRadius : s.labelRadius - size * 0.78;
    if (top > RING.outer - 3) problems.push(`label "${text}" runs over the outer edge of its segment`);
    if (bottom < RING.inner + 9 + 2 * s.icon.r + 3) problems.push(`label "${text}" touches the icon of its segment`);
  });
  return problems;
}

const pointsList = (points) => `<ul>${points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`;
const moreLink = (item, tabbable = true) =>
  item.href ? `<a class="text-link" href="${esc(item.href)}"${tabbable ? '' : ' tabindex="-1"'}>${esc(item.more)} →</a>` : '';
const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

// items: [{ key, icon, name, label?, sub, points[], href?, more? }]
export function ringHtml({ id, label, centre, items }) {
  const n = items.length;
  const segs = ringSegments(n);
  const size = ringLabelSize(n);
  let svg = '<defs>';
  items.forEach((it, i) => { svg += `<path id="${id}-${i}" d="${segs[i].labelPath}"/>`; });
  svg += '</defs>';
  let icons = '', details = '', cards = '';
  items.forEach((it, i) => {
    const s = segs[i];
    const colour = RING_COLOURS[i % RING_COLOURS.length];
    const text = (it.label ?? it.name).toUpperCase();
    svg += `<g class="ar-seg" data-k="${i}" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(`${it.name}: ${it.sub}`)}"${it.href ? ` data-href="${esc(it.href)}"` : ''} style="--c: ${colour}">`
      + `<path class="ar-fill" d="${s.path}"/><circle class="ar-badge" cx="${s.icon.x}" cy="${s.icon.y}" r="${s.icon.r}"/>`
      + `<text class="ar-label" font-size="${size}"><textPath href="#${id}-${i}" startOffset="50%" text-anchor="middle">${esc(text)}</textPath></text></g>`;
    icons += `<span class="ar-icon" data-k="${i}" style="left: ${pct(s.icon.x, 400)}; top: ${pct(s.icon.y, 400)}; width: ${pct(s.icon.r * 1.48, 400)}">${iconHtml(it.icon)}</span>`;
    details += `<div class="ar-detail" data-card="${i}" style="--c: ${colour}">${iconHtml(it.icon, 'ar-detail-icon')}<p class="ar-detail-name">${esc(it.name)}</p><p class="ar-detail-sub mono">${esc(it.sub)}</p>${pointsList(it.points)}${moreLink(it, false)}</div>`;
    cards += `<div class="ar-card" data-card="${i}"><div class="ar-card-head">${iconHtml(it.icon, 'ar-detail-icon')}<div><p class="ar-detail-name">${esc(it.name)}</p><p class="ar-detail-sub mono">${esc(it.sub)}</p></div></div>${pointsList(it.points)}${moreLink(it)}</div>`;
  });
  svg += '<circle class="ar-hub" cx="200" cy="200" r="126"/>';
  return `<figure class="ar" data-ar><div class="ar-stage"><svg class="ar-drawing" viewBox="0 0 400 400" role="img" aria-label="${esc(label)}">${svg}</svg>${icons}`
    + `<div class="ar-centre"><p class="ar-rest"><span class="mono">${esc(centre[0])}</span><strong>${esc(centre[1])}</strong></p>${details}</div></div>`
    + `<div class="ar-below">${cards}</div></div></figure>`;
}

// ---------- cycle ----------
// Stations sit on a circle (r 130 around 200/200), first at 12 o'clock, numbered in
// order; arcs with arrowheads run clockwise between them, a dot runs around the loop.
// The name of each station stands outside the circle; the viewBox fits the names.
export const CYCLE = { r: 130, node: 32, labelGap: 52, size: 16 };

const labelBox = (s, name) => {
  const w = name.length * CYCLE.size * 0.66;
  const x1 = s.label.anchor === 'start' ? s.label.x : s.label.anchor === 'end' ? s.label.x - w : s.label.x - w / 2;
  return { x1, x2: x1 + w, y1: s.label.y - CYCLE.size * 0.78, y2: s.label.y + CYCLE.size * 0.2 };
};

// The viewBox grows with the station names so no name runs over the edge; it stays
// symmetric around the centre so the loop sits in the middle.
export function cycleView(names) {
  const boxes = cycleStations(names.length).map((s, i) => labelBox(s, names[i]));
  const half = Math.max(200, ...boxes.map((b) => Math.max(200 - b.x1, b.x2 - 200))) + 8;
  const top = Math.min(30, ...boxes.map((b) => b.y1)) - 8;
  const bottom = Math.max(370, ...boxes.map((b) => b.y2)) + 8;
  return { x: +(200 - half).toFixed(1), y: +top.toFixed(1), w: +(2 * half).toFixed(1), h: +(bottom - top).toFixed(1) };
}

export function cycleStations(n) {
  const { r, labelGap } = CYCLE;
  const step = 360 / n;
  return Array.from({ length: n }, (_, i) => {
    const a = i * step;
    const [x, y] = point(r, a);
    const [lx, ly] = point(r + labelGap, a);
    const sx = Math.sin((a * Math.PI) / 180);
    const anchor = sx > 0.3 ? 'start' : sx < -0.3 ? 'end' : 'middle';
    const dx = anchor === 'start' ? -10 : anchor === 'end' ? 10 : 0;
    const dy = anchor === 'middle' ? (Math.cos((a * Math.PI) / 180) > 0 ? -2 : 14) : 6;
    return { a, x, y, label: { x: +(lx + dx).toFixed(2), y: +(ly + dy).toFixed(2), anchor } };
  });
}

// Station names are Sora 600; 0.66 em per glyph is a safe upper bound.
export function cycleProblems(names) {
  const problems = [];
  const { r, node } = CYCLE;
  cycleStations(names.length).forEach((s, i) => {
    const box = labelBox(s, names[i]);
    // Clear of the ring band (track 14 wide) and of the station circle.
    const nx = Math.min(Math.max(200, box.x1), box.x2), ny = Math.min(Math.max(200, box.y1), box.y2);
    if (Math.hypot(nx - 200, ny - 200) < r + 7 + 3) problems.push(`station "${names[i]}" runs into the loop`);
    const cx = Math.min(Math.max(s.x, box.x1), box.x2), cy = Math.min(Math.max(s.y, box.y1), box.y2);
    if (Math.hypot(cx - s.x, cy - s.y) < node + 3) problems.push(`station "${names[i]}" touches its circle`);
    if (names[i].length > 16) problems.push(`station "${names[i]}" is longer than 16 characters`);
  });
  return problems;
}

// items: [{ icon, name, sub, text, points[], href?, more? }]; intro: [title, text]
export function cycleHtml({ id, label, centre, intro, items }) {
  const n = items.length;
  const { r, node, size } = CYCLE;
  const view = cycleView(items.map((x) => x.name));
  const step = 360 / n;
  const gap = n > 4 ? 22 : 17;
  let svg = `<circle class="cy-track" cx="200" cy="200" r="${r}"/>`;
  for (let i = 0; i < n; i++) {
    const a0 = i * step + gap, a1 = (i + 1) * step - gap;
    const [x0, y0] = point(r, a0), [x1, y1] = point(r, a1);
    svg += `<path class="cy-arc" d="M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}"/>`;
    const t = ((a1 - 90) * Math.PI) / 180;
    const tx = -Math.sin(t), ty = Math.cos(t), nx = Math.cos(t), ny = Math.sin(t);
    const tri = [[x1 + tx * 9, y1 + ty * 9], [x1 - nx * 6, y1 - ny * 6], [x1 + nx * 6, y1 + ny * 6]].map((v) => v.map((z) => z.toFixed(2)).join(' '));
    svg += `<path class="cy-head" d="M${tri[0]}L${tri[1]}L${tri[2]}Z"/>`;
  }
  svg += `<circle class="cy-runner" r="5"><animateMotion dur="16s" repeatCount="indefinite" path="M200 ${200 - r}A${r} ${r} 0 1 1 199.99 ${200 - r}"/></circle>`;
  let icons = '', cards = '';
  cycleStations(n).forEach((s, i) => {
    const it = items[i];
    svg += `<g class="cy-st" data-k="${i}" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(`${i + 1}. ${it.name}: ${it.sub}`)}">`
      + `<circle class="cy-node" cx="${s.x}" cy="${s.y}" r="${node}"/><circle class="cy-badge" cx="${s.x + 23}" cy="${s.y - 23}" r="11"/>`
      + `<text class="cy-num" x="${s.x + 23}" y="${s.y - 19}" text-anchor="middle" font-size="12">${i + 1}</text>`
      + `<text class="cy-name" x="${s.label.x}" y="${s.label.y}" text-anchor="${s.label.anchor}" font-size="${size}">${esc(it.name)}</text></g>`;
    icons += `<span class="cy-icon" data-k="${i}" style="left: ${pct(s.x - view.x, view.w)}; top: ${pct(s.y - view.y, view.h)}; width: ${pct(36, view.w)}">${iconHtml(it.icon)}</span>`;
    cards += `<div class="cy-card" data-card="${i}"><div class="ar-card-head">${iconHtml(it.icon, 'ar-detail-icon')}<div><p class="ar-detail-name">${i + 1}. ${esc(it.name)}</p><p class="ar-detail-sub mono">${esc(it.sub)}</p></div></div><p class="cy-text">${esc(it.text)}</p>${pointsList(it.points)}${moreLink(it)}</div>`;
  });
  svg += `<text class="cy-centre-a" x="200" y="194" text-anchor="middle" font-size="12">${esc(centre[0])}</text><text class="cy-centre-b" x="200" y="220" text-anchor="middle" font-size="20">${esc(centre[1])}</text>`;
  return `<figure class="cy" data-cy><div class="cy-layout"><div class="cy-stage"><svg class="cy-drawing" viewBox="${view.x} ${view.y} ${view.w} ${view.h}" role="img" aria-label="${esc(label)}">${svg}</svg>${icons}</div>`
    + `<div class="cy-panel"><div class="cy-rest"><p class="cy-rest-title mono">${esc(intro[0])}</p><p>${esc(intro[1])}</p></div>${cards}</div></div></figure>`;
}
