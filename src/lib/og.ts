// Renders the 1200x630 preview images (Open Graph / LinkedIn): one per article and page,
// plus the site-wide default per language (src/pages/og/[lang]/site.png.ts).
// Satori turns the text into SVG paths with the site fonts; the background,
// grid and logo are plain SVG; sharp rasterizes the result to PNG.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const W = 1200;
const H = 630;
// Resolved from the project root: this module is bundled during the build.
const font = (path: string) => readFileSync(join(process.cwd(), 'node_modules/@fontsource', path));
const fonts = [
  { name: 'Sora', data: font('sora/files/sora-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Sora', data: font('sora/files/sora-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Plex', data: font('ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
];

const grid = () => {
  const lines: string[] = [];
  for (let x = 32; x < W; x += 32) lines.push(`M${x} 0V${H}`);
  for (let y = 32; y < H; y += 32) lines.push(`M0 ${y}H${W}`);
  return `<path d="${lines.join('')}" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>`;
};

// Same monogram as src/components/Logo.astro, scaled to `size`.
const logo = (x: number, y: number, size: number) => `
  <g transform="translate(${x} ${y}) scale(${size / 100})">
    <defs><clipPath id="fk"><rect x="36" y="22" width="44" height="56"/></clipPath></defs>
    <rect width="100" height="100" rx="22" fill="#2f2f32"/>
    <g clip-path="url(#fk)" stroke="#ffffff" stroke-width="12">
      <line x1="36" y1="50" x2="80" y2="4"/><line x1="36" y1="50" x2="80" y2="96"/>
    </g>
    <rect x="24" y="22" width="12" height="56" fill="#1BA1E2"/>
    <rect x="24" y="22" width="26" height="12" fill="#1BA1E2"/>
  </g>`;

// Frame shared by all preview images: crosshair bottom right, dashed measure line bottom left.
const blueprint = `
  <g stroke="#1BA1E2" fill="none" stroke-width="1.4">
    <g opacity="0.9"><path d="M1060 520h40M1080 500v40"/><circle cx="1080" cy="520" r="9"/></g>
    <g opacity="0.6"><path d="M80 560H700" stroke-dasharray="6 6"/><path d="M80 552v16M700 552v16"/></g>
  </g>`;

type Node = { type: 'div'; props: { style: Record<string, unknown>; children: unknown } };
const div = (style: Record<string, unknown>, children: unknown = []): Node => ({ type: 'div', props: { style: { display: 'flex', ...style }, children } });

// Brand block top left: logo, "FK Solution Design" in white, "SALESFORCE ARCHITECTURE" below.
// The logo itself is plain SVG (drawn at 80/72), the block keeps its place.
const BRAND_WIDTH = 56 + 20 + 310; // logo, gap, width of the mono line
const brand = div({ alignItems: 'center' }, [
  div({ width: 56, height: 56 }),
  div({ flexDirection: 'column', marginLeft: 20 }, [
    div({ fontFamily: 'Sora', fontWeight: 600, fontSize: 30, letterSpacing: -0.5, color: '#ffffff' }, 'FK Solution Design'),
    div({ fontFamily: 'Plex', fontSize: 15, letterSpacing: 4.5, color: 'rgba(255,255,255,0.55)', marginTop: 4 }, 'SALESFORCE ARCHITECTURE'),
  ]),
]);

// Text must stay clear of the frame: the eyebrow sits top right and ends before the
// brand block, the title takes at most 3 lines, the footer ends before the crosshair.
// Anything longer fails the build instead of overflowing the image
// (scripts/check-graphics.mjs checks the inline drawings).
const EYEBROW_SIZE = 16;
const EYEBROW_SPACING = 3;
const EYEBROW_MAX = 1040 - BRAND_WIDTH - 40; // text width minus brand block and a gap
const TITLE_LINES = 3;

async function checkFit(title: string, eyebrow: string, size: number) {
  const chars = [...eyebrow].length;
  const eyebrowWidth = chars * EYEBROW_SIZE * 0.6 + (chars - 1) * EYEBROW_SPACING; // IBM Plex Mono
  if (eyebrowWidth > EYEBROW_MAX) throw new Error(`Preview image: eyebrow "${eyebrow}" is ${Math.round(eyebrowWidth)}px wide, max ${EYEBROW_MAX}px. Shorten it.`);
  const svg = await satori(
    { type: 'div', props: { style: { width: 960, display: 'flex', fontFamily: 'Sora', fontWeight: 600, fontSize: size, lineHeight: 1.15, letterSpacing: -1 }, children: title } } as never,
    { width: 960, fonts },
  );
  const height = Number(svg.match(/height="([\d.]+)"/)?.[1] ?? 0);
  if (height > TITLE_LINES * size * 1.15 + 1) throw new Error(`Preview image: title "${title}" needs more than ${TITLE_LINES} lines. Shorten it.`);
}

// eyebrow: section shown top right (Blog, Leistungen, masterclass and chapter, Köln).
// footer: author line, or a list of topics (site-wide image) joined with dots.
export async function renderOgImage({ title, eyebrow, footer }: { title: string; eyebrow: string; footer: string | string[] }) {
  const size = title.length > 48 ? 56 : 64;
  await checkFit(title, eyebrow, size);
  const text = await satori(
    div({ width: 1040, height: 440, flexDirection: 'column', justifyContent: 'space-between' }, [
      div({ justifyContent: 'space-between', alignItems: 'flex-start' }, [
        brand,
        div({ marginTop: 6, fontFamily: 'Plex', fontSize: EYEBROW_SIZE, letterSpacing: EYEBROW_SPACING, color: '#5bbdee' }, eyebrow.toUpperCase()),
      ]),
      div({ fontFamily: 'Sora', fontWeight: 600, fontSize: size, lineHeight: 1.15, letterSpacing: -1, color: '#ffffff', maxWidth: 960 }, title),
      Array.isArray(footer)
        ? div({ fontFamily: 'Sora', fontSize: 26, color: 'rgba(255,255,255,0.85)', maxWidth: 940 }, footer.join('  ·  '))
        : div({ alignItems: 'center', fontFamily: 'Sora', fontSize: 24, color: 'rgba(255,255,255,0.7)', maxWidth: 940 }, [
          div({ width: 40, height: 4, background: '#1BA1E2', marginRight: 18 }),
          footer,
        ]),
    ]) as never,
    { width: 1040, height: 440, fonts },
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#232325"/>
  ${grid()}
  ${blueprint}
  ${logo(80, 72, 56)}
  <svg x="80" y="72" width="1040" height="440">${text.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
