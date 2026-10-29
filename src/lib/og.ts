// Renders the 1200x630 preview image (Open Graph / LinkedIn) for an article.
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
      <line x1="36" y1="50" x2="86" y2="0"/><line x1="36" y1="50" x2="86" y2="100"/>
    </g>
    <rect x="24" y="22" width="12" height="56" fill="#1BA1E2"/>
    <rect x="24" y="22" width="26" height="12" fill="#1BA1E2"/>
  </g>`;

const blueprint = `
  <g stroke="#1BA1E2" fill="none" stroke-width="1.4">
    <g opacity="0.9"><path d="M1060 96h40M1080 76v40"/><circle cx="1080" cy="96" r="9"/></g>
    <g stroke-dasharray="6 6" opacity="0.55"><path d="M760 48H1150M1150 48V300M940 590H1160"/></g>
    <g opacity="0.55"><path d="M760 40v16M1150 40v16M1142 300h16M940 582v16M1160 582v16"/></g>
  </g>`;

// Text must stay clear of the frame: the eyebrow ends before the crosshair at x 1060,
// the title takes at most 3 lines. Anything longer fails the build instead of
// overflowing the image (scripts/check-graphics.mjs checks the inline drawings).
const EYEBROW_MAX = 1040 - 80 - 92 - 24; // crosshair minus left edge, logo indent and a gap
const TITLE_LINES = 3;

async function checkFit(title: string, eyebrow: string, size: number) {
  const chars = [...eyebrow].length;
  const eyebrowWidth = chars * 22 * 0.6 + (chars - 1) * 4; // IBM Plex Mono, 22px, letter spacing 4
  if (eyebrowWidth > EYEBROW_MAX) throw new Error(`Preview image: eyebrow "${eyebrow}" is ${Math.round(eyebrowWidth)}px wide, max ${EYEBROW_MAX}px. Shorten it.`);
  const svg = await satori(
    { type: 'div', props: { style: { width: 960, display: 'flex', fontFamily: 'Sora', fontWeight: 600, fontSize: size, lineHeight: 1.15, letterSpacing: -1 }, children: title } } as never,
    { width: 960, fonts },
  );
  const height = Number(svg.match(/height="([\d.]+)"/)?.[1] ?? 0);
  if (height > TITLE_LINES * size * 1.15 + 1) throw new Error(`Preview image: title "${title}" needs more than ${TITLE_LINES} lines. Shorten it.`);
}

export async function renderOgImage({ title, eyebrow, footer }: { title: string; eyebrow: string; footer: string }) {
  const size = title.length > 48 ? 56 : 64;
  await checkFit(title, eyebrow, size);
  const text = await satori(
    {
      type: 'div',
      props: {
        style: { width: 1040, height: 470, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        children: [
          { type: 'div', props: { style: { fontFamily: 'Plex', fontSize: 22, letterSpacing: 4, color: '#5bbdee', marginLeft: 92, marginTop: 14 }, children: eyebrow.toUpperCase() } },
          { type: 'div', props: { style: { fontFamily: 'Sora', fontWeight: 600, fontSize: size, lineHeight: 1.15, letterSpacing: -1, color: '#ffffff', maxWidth: 960 }, children: title } },
          { type: 'div', props: { style: { display: 'flex', alignItems: 'center', fontFamily: 'Sora', fontSize: 24, color: 'rgba(255,255,255,0.7)' }, children: [
            { type: 'div', props: { style: { width: 40, height: 4, background: '#1BA1E2', marginRight: 18 } } },
            footer,
          ] } },
        ],
      },
    } as never,
    { width: 1040, height: 470, fonts },
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#232325"/>
  ${grid()}
  ${blueprint}
  ${logo(80, 72, 72)}
  <svg x="80" y="80" width="1040" height="470">${text.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
