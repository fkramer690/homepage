// Turns the client logos in public/clients/ into one-colour versions for the
// logo band on the start page (public/clients/mono/*.webp, black ink with
// alpha; the band greys them with opacity). Boxes and backgrounds are cut away
// so only the mark and the lettering remain. Also writes
// src/data/client-logos.json with the trimmed aspect ratio and ink density
// of every logo, which logoHeight() in src/data/clients.ts uses to make all
// logos optically the same size.
//
// Run after adding or replacing a logo: node scripts/logos-mono.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { clients } from '../src/data/clients.ts';

const SRC = 'public/clients';
const OUT = 'public/clients/mono';
const H = 240; // working height in px; the band shows at most ~70px (x2 for retina)

await mkdir(OUT, { recursive: true });

// Ink of one pixel on a white background: how far its darkest channel is
// from white (0 = white, 1 = full colour or black). Colours and black become
// ink, white cut-outs and white backgrounds disappear.
const smooth = (lo, hi, x) => {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

const meta = {};
for (const c of clients) {
  const m = c.mono ?? {};
  const isSvg = c.file.endsWith('.svg');
  let img = sharp(`${SRC}/${c.file}`, isSvg ? { density: 600 } : {}).resize({ height: H * 2 });
  // White-only logos are flattened on black and negated, so they read like dark ones.
  img = c.light ? img.flatten({ background: '#000' }).negate({ alpha: false }) : img.flatten({ background: '#fff' });
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const [lo, hi] = m.range ?? [0.06, 0.45];
  const ink = new Float32Array(width * height);
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    // mode 'cutout': light lettering on a coloured box; the lettering becomes the ink.
    // mode 'colour': coloured parts on a grey or metallic box; only the colour becomes ink.
    const v = m.mode === 'cutout' ? Math.min(r, g, b) / 255
      : m.mode === 'colour' ? (Math.max(r, g, b) - Math.min(r, g, b)) / 255
      : 1 - Math.min(r, g, b) / 255;
    const a = smooth(lo, hi, v);
    ink[i] = a;
    if (a > 0.04) {
      const x = i % width, y = (i / width) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  const w = maxX - minX + 1, h = maxY - minY + 1;
  const out = Buffer.alloc(w * h * 4);
  let sum = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const a = ink[(y + minY) * width + x + minX];
    sum += a;
    out[(y * w + x) * 4 + 3] = Math.round(a * 255);
  }
  const name = c.file.replace(/\.\w+$/, '.webp');
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .resize({ height: H })
    .webp({ lossless: true, effort: 6 })
    .toFile(`${OUT}/${name}`);
  meta[c.file] = { file: `mono/${name}`, ratio: +(w / h).toFixed(3), ink: +(sum / (w * h)).toFixed(3) };
  console.log(`${c.name.padEnd(28)} ratio ${(w / h).toFixed(2)}  ink ${(sum / (w * h)).toFixed(2)}`);
}
await writeFile('src/data/client-logos.json', JSON.stringify(meta, null, 2) + '\n');
