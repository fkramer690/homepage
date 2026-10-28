// Client logos for the logo band in the references section of the start page.
// Files live in public/clients/. Logos are deliberately not linked to the
// anonymised project cards.
//   light: the company only publishes a white logo; it is shown dark.
//   square: compact or square logo; shown a little taller so it reads as big as the wordmarks.

export interface Client {
  name: string;
  file: string;
  light?: boolean;
  square?: boolean;
}

export const clients: Client[] = [
  { name: 'Statkraft', file: 'statkraft.svg' },
  { name: 'Bryt Energy', file: 'bryt-energy.svg' },
  { name: 'GELITA', file: 'gelita.svg' },
  { name: 'COI Partners (Co-Investor)', file: 'coi-partners.svg', square: true },
  { name: 'EWTN', file: 'ewtn.svg' },
  { name: 'Techem', file: 'techem.webp' },
  { name: 'SHG Ruhr', file: 'shg-ruhr.webp' },
  { name: 'Rhenus', file: 'rhenus.webp' },
  { name: 'Gruner + Jahr', file: 'gruner-jahr.webp', square: true },
  { name: 'Republic', file: 'republic.svg' },
  { name: 'Ströer', file: 'stroeer.svg', light: true },
  { name: 'ATOSS', file: 'atoss.svg', light: true },
  { name: 'Fritz Berger', file: 'fritz-berger.svg' },
  { name: 'DEKRA', file: 'dekra.svg' },
  { name: 'GBA Group', file: 'gba-group.webp' },
  { name: 'NEW', file: 'new.webp' },
  { name: 'RheinEnergie', file: 'rheinenergie.svg' },
  { name: 'Septodont', file: 'septodont.svg', square: true },
  { name: 'SCHOTTEL', file: 'schottel.svg', square: true },
  { name: 'KNF', file: 'knf.svg' },
  { name: 'Schubert', file: 'schubert.svg' },
];
