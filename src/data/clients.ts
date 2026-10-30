// Client logos for the logo band in the references section of the start page.
// Files live in public/clients/. Logos are deliberately not linked to the
// anonymised project cards.
//   light: the company only publishes a white logo; it is shown dark.
//   ratio: width / height of the visible logo (without empty margins).
//   weight: optical correction; below 1 for heavy, solid logos, above 1 for thin ones.
// The band sizes every logo to roughly the same area instead of the same height,
// so long wordmarks get lower and compact or square logos taller (see logoHeight).

export interface Client {
  name: string;
  file: string;
  ratio: number;
  weight?: number;
  light?: boolean;
}

// Height in px on desktop for a logo of this shape; mobile scales it down in CSS.
export const logoHeight = (c: Client) => Math.round(Math.min(68, 86 / Math.sqrt(c.ratio)) * (c.weight ?? 1));

export const clients: Client[] = [
  { name: 'Statkraft', file: 'statkraft.svg', ratio: 4.16 },
  { name: 'Bryt Energy', file: 'bryt-energy.webp', ratio: 4.40 },
  { name: 'GELITA', file: 'gelita.svg', ratio: 4.26 },
  { name: 'E.ON', file: 'eon.webp', ratio: 3.40, weight: 0.9 },
  { name: 'COI Partners (Co-Investor)', file: 'coi-partners.webp', ratio: 1.00, weight: 0.85 },
  { name: 'EWTN', file: 'ewtn.svg', ratio: 3.93, weight: 1.15 },
  { name: 'Techem', file: 'techem.webp', ratio: 2.93, weight: 0.9 },
  { name: 'SHG Ruhr', file: 'shg-ruhr.webp', ratio: 2.06, weight: 1.05 },
  { name: 'Rhenus', file: 'rhenus.webp', ratio: 5.35 },
  { name: 'Gruner + Jahr', file: 'gruner-jahr.webp', ratio: 1.69, weight: 0.9 },
  { name: 'Republic', file: 'republic.svg', ratio: 4.35 },
  { name: 'Ströer', file: 'stroeer.svg', ratio: 4.75, weight: 0.85, light: true },
  { name: 'ATOSS', file: 'atoss.svg', ratio: 4.68, light: true },
  { name: 'Fritz Berger', file: 'fritz-berger.svg', ratio: 3.45 },
  { name: 'DEKRA', file: 'dekra.svg', ratio: 3.59 },
  { name: 'GBA Group', file: 'gba-group.webp', ratio: 6.98 },
  { name: 'NEW', file: 'new.webp', ratio: 3.24, weight: 0.85 },
  { name: 'RheinEnergie', file: 'rheinenergie.svg', ratio: 4.08, weight: 1.1 },
  { name: 'Septodont', file: 'septodont.svg', ratio: 1.00, weight: 0.95 },
  { name: 'SCHOTTEL', file: 'schottel.svg', ratio: 0.96, weight: 0.95 },
  { name: 'KNF', file: 'knf.svg', ratio: 3.11, weight: 0.75 },
  { name: 'Schubert', file: 'schubert.svg', ratio: 6.00, weight: 1.1 },
  { name: 'Reemtsma (Imperial Brands)', file: 'reemtsma.svg', ratio: 2.95, weight: 1.15 },
];
