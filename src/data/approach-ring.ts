// "Vier Bausteine" ring on the service overview (/leistungen/, /en/services/), drawn by
// src/components/ApproachRing.astro with src/lib/ring-cycle.mjs.
// Chosen by Fabian 2026-11-11 (variant 2 of round 2: labelled segments, the details appear
// in the centre while the pointer rests on a segment). Each segment links to the service
// page with the same translationKey. `points` stay short: they must fit the white centre
// circle. Icons are file names from src/icons/; segment colours come from RING_COLOURS in src/lib/ring-cycle.mjs.

export type RingItem = {
  key: string;
  service: string; // translationKey of the service page the segment links to
  icon: string;
  name: string; // also the label on the segment (shown in capitals)
  sub: string;
  points: string[];
};

export type RingTexts = {
  title: string;
  lead: string;
  hint: string; // pointer devices
  hintTouch: string; // touch screens
  centre: { eyebrow: string; title: string };
  more: string;
  label: string; // accessible name of the drawing
  items: RingItem[];
};

export const approachRing: Record<'de' | 'en', RingTexts> = {
  de: {
    title: 'Vier Bausteine für Ihr Salesforce-Programm',
    lead: 'Jedes Programm, das ich begleite, ruht auf denselben vier Bausteinen. Jedes Segment zeigt, was dazugehört und welche Leistung dahintersteht.',
    hint: 'Fahren Sie über ein Segment',
    hintTouch: 'Tippen Sie auf ein Segment',
    centre: { eyebrow: 'Salesforce', title: 'für Hersteller' },
    more: 'Zur Leistung',
    label: 'Vier Bausteine: Architektur, Stabilität, Wirkung und Akzeptanz um Salesforce für Hersteller',
    items: [
      { key: 'arch', service: 'service-architecture', icon: 'architecture', name: 'Architektur', sub: 'Zielbild und Entscheidungen', points: ['Zielarchitektur und Datenmodell', 'Cloud-Auswahl im ROI-Case', 'Prüfung der Partnerdesigns', 'Entscheidungslog'] },
      { key: 'stab', service: 'service-devops', icon: 'pipeline', name: 'Stabilität', sub: 'Releases und Schnittstellen', points: ['Pipeline mit Review', 'Release-Plan mit Rückfallweg', 'Prüfung jedes Salesforce-Release', 'Stabile ERP-Schnittstellen'] },
      { key: 'wirk', service: 'service-partner-governance', icon: 'target', name: 'Wirkung', sub: 'Partner und Kennzahlen', points: ['Partnersteuerung auf Kundenseite', 'Kennzahlen aus dem Zielbild', 'Nutzung und Datenqualität', 'Backlog nach Nutzen'] },
      { key: 'akz', service: 'service-change', icon: 'change', name: 'Akzeptanz', sub: 'Change Management mit Juliane Winterscheid', points: ['Change-Plan ab Projektstart', 'Key User und Schulungen', 'Kommunikation zu jedem Release', 'Hypercare nach dem Go-live'] },
    ],
  },
  en: {
    title: 'Four building blocks of your Salesforce program',
    lead: 'Every program I work on rests on the same four building blocks. Each segment shows what it covers and which service stands behind it.',
    hint: 'Hover over a segment',
    hintTouch: 'Tap a segment',
    centre: { eyebrow: 'Salesforce', title: 'for manufacturers' },
    more: 'See the service',
    label: 'Four building blocks: architecture, stability, impact and adoption around Salesforce for manufacturers',
    items: [
      { key: 'arch', service: 'service-architecture', icon: 'architecture', name: 'Architecture', sub: 'Target picture and decisions', points: ['Target architecture and data model', 'Cloud choice backed by an ROI case', 'Review of partner designs', 'Decision log'] },
      { key: 'stab', service: 'service-devops', icon: 'pipeline', name: 'Stability', sub: 'Releases and integrations', points: ['Pipeline with review', 'Release plan with rollback', 'Testing of every Salesforce release', 'Reliable ERP integrations'] },
      { key: 'wirk', service: 'service-partner-governance', icon: 'target', name: 'Impact', sub: 'Partners and KPIs', points: ['Partner governance for the client', 'KPIs from the target picture', 'Usage and data quality', 'Backlog ranked by value'] },
      { key: 'akz', service: 'service-change', icon: 'change', name: 'Adoption', sub: 'Change management with Juliane Winterscheid', points: ['Change plan from day one', 'Key users and training', 'Communication for every release', 'Hypercare after go-live'] },
    ],
  },
};
