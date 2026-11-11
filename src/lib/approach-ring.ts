// Geometry of the four-segment ring (src/components/ApproachRing.astro, layout
// "Ring with details in the centre" in docs/layouts.md). Everything is in the units of
// the 400 × 400 viewBox. Segments run clockwise, the first one ends at 12 o'clock; the labels follow the
// outer edge of their segment (upper half reads along the arc, lower half is mirrored so
// no label stands on its head), the icon sits near the inner edge.
// scripts/check-graphics.mjs calls ringProblems() for every ring on the site.

export const RING = { size: 400, outer: 196, inner: 130, gap: 2.5, label: 13, spacing: 1.5, icon: 17 };

const point = (r: number, deg: number): [number, number] => {
  const t = ((deg - 90) * Math.PI) / 180;
  return [+(200 + r * Math.cos(t)).toFixed(2), +(200 + r * Math.sin(t)).toFixed(2)];
};

export type RingSegment = { path: string; labelPath: string; labelRadius: number; arc: [number, number]; icon: { x: number; y: number; r: number }; upper: boolean };

export function ringSegments(n: number): RingSegment[] {
  const { outer: ro, inner: ri, gap: g } = RING;
  const step = 360 / n;
  return Array.from({ length: n }, (_, i) => {
    const a0 = (i - 1) * step + g;
    const a1 = i * step - g;
    const mid = (a0 + a1) / 2;
    const [x0, y0] = point(ro, a0), [x1, y1] = point(ro, a1), [x2, y2] = point(ri, a1), [x3, y3] = point(ri, a0);
    const large = a1 - a0 > 180 ? 1 : 0;
    const path = `M${x0} ${y0}A${ro} ${ro} 0 ${large} 1 ${x1} ${y1}L${x2} ${y2}A${ri} ${ri} 0 ${large} 0 ${x3} ${y3}Z`;
    // Upper half: text above the baseline, so the baseline sits deeper in the segment.
    const upper = Math.cos((mid * Math.PI) / 180) >= 0;
    const lr = upper ? ro - 18 : ro - 9;
    const b0 = a0 + 3, b1 = a1 - 3;
    const [lx0, ly0] = point(lr, upper ? b0 : b1), [lx1, ly1] = point(lr, upper ? b1 : b0);
    const labelPath = `M${lx0} ${ly0}A${lr} ${lr} 0 0 ${upper ? 1 : 0} ${lx1} ${ly1}`;
    const r = RING.icon;
    const [ix, iy] = point(ri + r + 9, mid);
    return { path, labelPath, labelRadius: lr, arc: [b0, b1], icon: { x: ix, y: iy, r }, upper };
  });
}

// Labels are set in IBM Plex Mono capitals: every glyph 0.6 em wide.
export function ringProblems(labels: string[]): string[] {
  const problems: string[] = [];
  const segs = ringSegments(labels.length);
  labels.forEach((text, i) => {
    const s = segs[i];
    const width = text.length * RING.label * 0.6 + (text.length - 1) * RING.spacing;
    const room = ((s.arc[1] - s.arc[0]) * Math.PI * s.labelRadius) / 180;
    if (width > room - 8) problems.push(`label "${text}" is ${width.toFixed(0)} wide, the arc has room for ${(room - 8).toFixed(0)}`);
    // Radial band of the label: capitals 0.78 em above the baseline, nothing below.
    const top = s.upper ? s.labelRadius + RING.label * 0.78 : s.labelRadius;
    const bottom = s.upper ? s.labelRadius : s.labelRadius - RING.label * 0.78;
    if (top > RING.outer - 3) problems.push(`label "${text}" runs over the outer edge of its segment`);
    // The label must clear the icon badge.
    if (bottom < RING.inner + 9 + 2 * RING.icon + 3) problems.push(`label "${text}" touches the icon of its segment`);
  });
  return problems;
}
