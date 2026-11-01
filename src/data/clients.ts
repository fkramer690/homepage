// Client logos for the logo band in the references section of the start page.
// Originals live in public/clients/; the band shows one-colour versions from
// public/clients/mono/, made by scripts/logos-mono.mjs (run it after adding or
// replacing a logo). Logos are deliberately not linked to the anonymised
// project cards.
//   light: the company only publishes a white logo; it is negated first.
//   mono: settings for the one-colour version:
//     mode 'cutout': light lettering on a coloured box, the lettering is kept.
//     mode 'colour': coloured mark on a grey or metallic box, only the colour is kept.
//     range: ink thresholds [lo, hi] on 0..1 (default [0.06, 0.45]).
//   weight: manual optical correction on top of the automatic one (default 1).
// The band sizes every logo to roughly the same area instead of the same height,
// so long wordmarks get lower and compact or square logos taller, and evens out
// heavy, solid logos against thin ones by their ink density (see logoHeight).
import logos from './client-logos.json' with { type: 'json' };

export interface Client {
  name: string;
  file: string;
  weight?: number;
  light?: boolean;
  mono?: { mode?: 'cutout' | 'colour'; range?: [number, number] };
}

type LogoMeta = { file: string; ratio: number; ink: number };
const meta = (c: Client): LogoMeta => (logos as Record<string, LogoMeta>)[c.file];

// Path below public/ and width / height of the one-colour logo (trimmed to its ink).
export const logoFile = (c: Client) => `clients/${meta(c).file}`;
export const logoRatio = (c: Client) => meta(c).ratio;

// Height in px on desktop; mobile scales it down in CSS. Same area for every
// shape, then a density factor: a solid logo (much ink) gets smaller, a thin
// one larger, clamped so no logo changes by more than about 20 %.
export const logoHeight = (c: Client) => {
  const { ratio, ink } = meta(c);
  const density = Math.min(1.2, Math.max(0.82, Math.pow(0.32 / ink, 0.4)));
  return Math.round(Math.min(68, 86 / Math.sqrt(ratio)) * density * (c.weight ?? 1));
};

export const clients: Client[] = [
  { name: 'Statkraft', file: 'statkraft.svg' },
  { name: 'Bryt Energy', file: 'bryt-energy.webp' },
  { name: 'GELITA', file: 'gelita.svg', weight: 0.9 },
  { name: 'E.ON', file: 'eon.webp' },
  { name: 'COI Partners (Co-Investor)', file: 'coi-partners.webp', weight: 0.82, mono: { mode: 'cutout', range: [0.55, 0.9] } },
  { name: 'EWTN', file: 'ewtn.svg' },
  { name: 'Techem', file: 'techem.webp' },
  { name: 'SHG Ruhr', file: 'shg-ruhr.webp' },
  { name: 'Rhenus', file: 'rhenus.webp' },
  { name: 'Gruner + Jahr', file: 'gruner-jahr.webp', weight: 0.9 },
  { name: 'Republic', file: 'republic.svg' },
  { name: 'Ströer', file: 'stroeer.svg', light: true },
  { name: 'ATOSS', file: 'atoss.svg', light: true },
  { name: 'Fritz Berger', file: 'fritz-berger.svg' },
  { name: 'DEKRA', file: 'dekra.svg' },
  { name: 'GBA Group', file: 'gba-group.webp' },
  { name: 'NEW', file: 'new.webp' },
  { name: 'RheinEnergie', file: 'rheinenergie.svg' },
  { name: 'Septodont', file: 'septodont.svg' },
  { name: 'SCHOTTEL', file: 'schottel.svg', weight: 0.85, mono: { mode: 'colour', range: [0.12, 0.3] } },
  { name: 'KNF', file: 'knf.svg' },
  { name: 'Schubert', file: 'schubert.svg' },
  { name: 'Reemtsma (Imperial Brands)', file: 'reemtsma.svg' },
  { name: 'Lieferando', file: 'lieferando.webp' },
];
