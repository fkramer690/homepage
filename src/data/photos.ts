// Photos of Fabian at work, used as scene images across the site.
// Files live in src/assets/photos/ as fabian-<NN>-<motif>-<version>.jpg and always
// go through astro:assets (src/components/Photo.astro), which builds AVIF/WebP
// in the needed widths. Most motifs exist in two versions with a different shirt
// or a different counterpart; pick versions so neighbouring photos on a page vary.
// The real studio portrait (src/assets/portrait.png) stays the photo for the
// author box, contact and structured data; these are scenes, not headshots.
//   alt: describes what is visible, in both languages.
//   focus: CSS object-position for crops (where Fabian stands in the frame).

import type { ImageMetadata } from 'astro';

type Text = { en: string; de: string };

export interface Photo {
  src: ImageMetadata;
  alt: Text;
  focus: string;
}

const files = import.meta.glob<ImageMetadata>('../assets/photos/*.jpg', { eager: true, import: 'default' });

const texts = {
  '01-werkhalle-v01': {
    de: 'Fabian Kramer in weißem Hemd und grauer Weste zeigt einem Mitarbeiter in Arbeitsjacke etwas auf dem Tablet, im Hintergrund eine Werkhalle mit Maschinen.',
    en: 'Fabian Kramer in a white shirt and grey vest shows a colleague in a work jacket something on a tablet, with a factory floor and machines behind them.',
    focus: '55% 30%',
  },
  '01-werkhalle-v02': {
    de: 'Fabian Kramer in hellblauem Hemd und grauer Weste zeigt einem grauhaarigen Mitarbeiter in Arbeitsjacke etwas auf dem Tablet, im Hintergrund eine Werkhalle.',
    en: 'Fabian Kramer in a light blue shirt and grey vest shows a grey-haired colleague in a work jacket something on a tablet, with a factory floor behind them.',
    focus: '55% 30%',
  },
  '02-workshop-whiteboard-v02': {
    de: 'Fabian Kramer in weißem Hemd zeichnet in einem Workshop einen Prozess am Whiteboard, drei Teilnehmende sitzen mit Laptops am Tisch.',
    en: 'Fabian Kramer in a white shirt sketches a process on a whiteboard in a workshop while three participants sit at the table with laptops.',
    focus: '60% 30%',
  },
  '02-workshop-whiteboard-v03': {
    de: 'Fabian Kramer in grünem Hemd zeichnet in einem Workshop einen Prozess am Whiteboard, drei Teilnehmende verschiedenen Alters hören zu.',
    en: 'Fabian Kramer in a green shirt sketches a process on a whiteboard in a workshop while three participants of different ages listen.',
    focus: '50% 30%',
  },
  '03-besprechung-v02': {
    de: 'Fabian Kramer im dunkelblauen Pullover sitzt mit Laptop am Besprechungstisch und hört seinem Gegenüber zu.',
    en: 'Fabian Kramer in a navy sweater sits at a meeting table with a laptop, listening to the person opposite him.',
    focus: '60% 35%',
  },
  '03-besprechung-v03': {
    de: 'Fabian Kramer im grauen Pullover sitzt mit Laptop am Besprechungstisch und hört einem grauhaarigen Gesprächspartner zu.',
    en: 'Fabian Kramer in a grey sweater sits at a meeting table with a laptop, listening to a grey-haired counterpart.',
    focus: '60% 35%',
  },
  '04-service-maschine-v02': {
    de: 'Fabian Kramer in grauer Arbeitsjacke mit Tablet an einer geöffneten Maschine, ein Servicetechniker zeigt auf ein Bauteil.',
    en: 'Fabian Kramer in a grey work jacket holds a tablet next to an open machine while a service technician points at a component.',
    focus: '35% 30%',
  },
  '04-service-maschine-v03': {
    de: 'Fabian Kramer in dunkelblauer Arbeitsjacke mit Tablet an einer geöffneten Maschine, ein grauhaariger Servicetechniker zeigt auf ein Bauteil.',
    en: 'Fabian Kramer in a navy work jacket holds a tablet next to an open machine while a grey-haired service technician points at a component.',
    focus: '35% 30%',
  },
  '05-masterclass-gruppe-v02': {
    de: 'Fabian Kramer im dunkelblauen Poloshirt erklärt vor einer Gruppe einen Ablauf, hinter ihm ein Bildschirm mit einem Prozessdiagramm.',
    en: 'Fabian Kramer in a navy polo shirt explains a workflow to a group, with a screen showing a process diagram behind him.',
    focus: '55% 30%',
  },
  '05-masterclass-gruppe-v03': {
    de: 'Fabian Kramer im weinroten Poloshirt erklärt vor einer gemischten Gruppe einen Ablauf, hinter ihm ein Bildschirm mit einem Prozessdiagramm.',
    en: 'Fabian Kramer in a burgundy polo shirt explains a workflow to a mixed group, with a screen showing a process diagram behind him.',
    focus: '40% 30%',
  },
  '06-portraet-halle-v01': {
    de: 'Porträt von Fabian Kramer in weißem Hemd und grauer Weste mit verschränkten Armen in einer Produktionshalle.',
    en: 'Portrait of Fabian Kramer in a white shirt and grey vest with crossed arms in a production hall.',
    focus: '50% 25%',
  },
  '06-portraet-halle-v02': {
    de: 'Porträt von Fabian Kramer in hellblauem Hemd und grauer Weste mit verschränkten Armen in einer Produktionshalle.',
    en: 'Portrait of Fabian Kramer in a light blue shirt and grey vest with crossed arms in a production hall.',
    focus: '50% 25%',
  },
  '07-rundgang-produktion-v01': {
    de: 'Fabian Kramer und eine Kollegin in Warnwesten gehen im Gespräch durch eine Produktion.',
    en: 'Fabian Kramer and a female colleague in high-visibility vests talk while walking through a production floor.',
    focus: '45% 30%',
  },
  '07-rundgang-produktion-v02': {
    de: 'Fabian Kramer und ein grauhaariger Kollege in Warnwesten gehen im Gespräch durch eine Produktion.',
    en: 'Fabian Kramer and a grey-haired colleague in high-visibility vests talk while walking through a production floor.',
    focus: '45% 30%',
  },
  '08-architektur-computer-v02': {
    de: 'Fabian Kramer in weißem Hemd arbeitet konzentriert am Schreibtisch vor einem großen Monitor.',
    en: 'Fabian Kramer in a white shirt works at his desk, focused on a large monitor.',
    focus: '40% 30%',
  },
  '08-architektur-computer-v03': {
    de: 'Fabian Kramer in hellblauem Hemd arbeitet konzentriert am Schreibtisch vor einem großen Monitor.',
    en: 'Fabian Kramer in a light blue shirt works at his desk, focused on a large monitor.',
    focus: '30% 30%',
  },
  '09-coaching-bildschirm-v01': {
    de: 'Fabian Kramer erklärt einer Kollegin ein Diagramm auf dem Bildschirm.',
    en: 'Fabian Kramer walks a female colleague through a diagram on screen.',
    focus: '50% 35%',
  },
  '09-coaching-bildschirm-v02': {
    de: 'Fabian Kramer im grünen Poloshirt erklärt einem Kollegen mit Brille ein Diagramm auf dem Bildschirm.',
    en: 'Fabian Kramer in a green polo shirt walks a colleague with glasses through a diagram on screen.',
    focus: '55% 35%',
  },
  '10-projektabschluss-v01': {
    de: 'Fabian Kramer in weißem Hemd steht lächelnd im Gespräch mit drei Projektbeteiligten in einem hellen Büro.',
    en: 'Fabian Kramer in a white shirt smiles while talking with three project members in a bright office.',
    focus: '45% 30%',
  },
  '10-projektabschluss-v02': {
    de: 'Fabian Kramer in hellblauem Hemd steht lächelnd im Gespräch mit drei Projektbeteiligten, darunter ein grauhaariger Manager im Sakko.',
    en: 'Fabian Kramer in a light blue shirt smiles while talking with three project members, among them a grey-haired manager in a jacket.',
    focus: '45% 30%',
  },
  '11-partnerabstimmung-v01': {
    de: 'Fabian Kramer im dunkelblauen Pullover im Gespräch mit einem Partner am Tisch, er erklärt mit beiden Händen.',
    en: 'Fabian Kramer in a navy sweater talks with a partner at a table, explaining with both hands.',
    focus: '40% 35%',
  },
  '11-partnerabstimmung-v02': {
    de: 'Fabian Kramer im olivgrünen Pullover im Gespräch mit einem grauhaarigen Mann im Sakko, er erklärt mit beiden Händen.',
    en: 'Fabian Kramer in an olive sweater talks with a grey-haired man in a jacket, explaining with both hands.',
    focus: '35% 35%',
  },
  '12-prozessaufnahme-logistik-v01': {
    de: 'Fabian Kramer mit Tablet und eine Mitarbeiterin im Lager zwischen Hochregalen.',
    en: 'Fabian Kramer with a tablet and a female colleague in a warehouse between high-bay racks.',
    focus: '45% 30%',
  },
  '12-prozessaufnahme-logistik-v02': {
    de: 'Fabian Kramer mit Tablet und ein grauhaariger Mitarbeiter im Lager zwischen Hochregalen.',
    en: 'Fabian Kramer with a tablet and a grey-haired colleague in a warehouse between high-bay racks.',
    focus: '45% 30%',
  },
  '13-remote-beratung-v01': {
    de: 'Fabian Kramer mit Headset im Videocall am Schreibtisch, er erklärt mit einer Hand.',
    en: 'Fabian Kramer in a video call at his desk with a headset, explaining with one hand.',
    focus: '30% 30%',
  },
  '14-gemeinsame-fehlersuche-v01': {
    de: 'Fabian Kramer zeigt einem Kollegen mit Brille am Monitor, wo ein Fehler liegt.',
    en: 'Fabian Kramer points out to a colleague with glasses on the monitor where an error sits.',
    focus: '55% 30%',
  },
  '15-softwarevorfall-v01': {
    de: 'Fabian Kramer mit Headset prüft am Monitor einen Vorfall.',
    en: 'Fabian Kramer with a headset checks an incident on his monitor.',
    focus: '30% 30%',
  },
  '16-anwendungstest-v01': {
    de: 'Fabian Kramer und eine Kollegin testen gemeinsam eine Anwendung am Bildschirm.',
    en: 'Fabian Kramer and a female colleague test an application together on screen.',
    focus: '35% 35%',
  },
  '17-erklaerung-team-v01': {
    de: 'Fabian Kramer erklärt zwei Kollegen am Monitor einen Ablauf.',
    en: 'Fabian Kramer explains a workflow to two colleagues at a monitor.',
    focus: '50% 30%',
  },
  '18-monitoring-dashboard-v01': {
    de: 'Fabian Kramer vor zwei Monitoren mit Auswertungen und Statuslisten.',
    en: 'Fabian Kramer in front of two monitors showing reports and status lists.',
    focus: '30% 35%',
  },
} as const;

export type PhotoKey = keyof typeof texts;

export const photos = Object.fromEntries(
  Object.entries(texts).map(([key, { de, en, focus }]) => {
    const src = files[`../assets/photos/fabian-${key}.jpg`];
    if (!src) throw new Error(`Photo file missing: fabian-${key}.jpg`);
    return [key, { src, alt: { de, en }, focus }];
  }),
) as Record<PhotoKey, Photo>;

// Photo in the head of each service page, by translationKey (EN and DE share it).
export const servicePhotos: Record<string, PhotoKey> = {
  'service-architecture': '08-architektur-computer-v03',
  'service-partner-governance': '11-partnerabstimmung-v02',
  'service-devops': '14-gemeinsame-fehlersuche-v01',
  'service-integration': '15-softwarevorfall-v01',
  'service-nearshore': '13-remote-beratung-v01',
  'service-make-or-buy': '03-besprechung-v03',
  'service-change': '17-erklaerung-team-v01',
};

// Photo in the hero of a masterclass hub instead of the layer drawing.
export const coursePhotos: Partial<Record<string, PhotoKey>> = {
  'field-service': '04-service-maschine-v03',
  'manufacturing-cloud': '01-werkhalle-v01',
};
