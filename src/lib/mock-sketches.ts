// MOCKUP ONLY: sketches for the start page variants.
type Lang = 'en' | 'de';
const G = '#5a5a5e';
const C = '#1BA1E2';
const D = '#232325';
const L = '#e3e5e7';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const t = (x: number, y: number, s: string, o: { fill?: string; size?: number; anchor?: string; weight?: number } = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 8}" fill="${o.fill ?? G}" text-anchor="${o.anchor ?? 'start'}"${o.weight ? ` font-weight="${o.weight}"` : ''}>${esc(s)}</text>`;
const box = (x: number, y: number, w: number, h: number, stroke = G, fill = '#fff', dash = false) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.2"${dash ? ' stroke-dasharray="4 3"' : ''}/>`;
const line = (d: string, color = G, dashed = false, w = 1.2) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}"${dashed ? ' stroke-dasharray="4 3"' : ''}/>`;
const arrowH = (x1: number, y: number, x2: number, color = G, dashed = false) =>
  line(`M${x1} ${y}H${x2 - 1}`, color, dashed, 1.3) + line(`M${x2 - 5} ${y - 3.5}l5 3.5-5 3.5`, color, false, 1.3);
const arrowV = (x: number, y1: number, y2: number, color = G, dashed = false) =>
  line(`M${x} ${y1}V${y2 - 1}`, color, dashed, 1.3) + line(`M${x - 3.5} ${y2 - 5}l3.5 5 3.5-5`, color, false, 1.3);
const check = (x: number, y: number, color = C) => line(`M${x} ${y}l3 3 5-6`, color, false, 1.4);
const cross = (x: number, y: number, color = G) => line(`M${x - 3.5} ${y - 3.5}l7 7M${x + 3.5} ${y - 3.5}l-7 7`, color, false, 1.4);
const dot = (x: number, y: number, color = G, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${color}" stroke-width="1.4"/>`;

function frame(w: number, h: number, inner: string, cls = 'sketch') {
  const grid =
    Array.from({ length: Math.floor(w / 16) }, (_, i) => `M${16 * (i + 1)} 0V${h}`).join('') +
    Array.from({ length: Math.floor(h / 16) }, (_, i) => `M0 ${16 * (i + 1)}H${w}`).join('');
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" aria-hidden="true" font-family="IBM Plex Mono, monospace"><rect width="${w}" height="${h}" fill="#f5f6f7"/><path d="${grid}" stroke="#e3e5e7" stroke-width="1"/>${inner}</svg>`;
}

const svc: Record<number, (l: (en: string, de: string) => string) => string> = {
  1: (l) => `
    ${box(26, 20, 268, 108, C, 'none', true)}${t(34, 34, l('TARGET ARCHITECTURE', 'ZIELARCHITEKTUR'), { fill: C, size: 7.5 })}
    ${['Sales', 'Service', 'Field Service'].map((s, i) => box(40 + i * 84, 44, 74, 24) + t(77 + i * 84, 59, s, { size: 7.5, anchor: 'middle', fill: D })).join('')}
    ${box(40, 76, 242, 20)}${t(161, 89, l('portals · Experience Cloud', 'Portale · Experience Cloud'), { size: 7.5, anchor: 'middle' })}
    ${['ERP', l('Telephony', 'Telefonie'), 'Middleware'].map((s, i) => box(40 + i * 84, 104, 74, 18, G, '#fff', true) + t(77 + i * 84, 116, s, { size: 7, anchor: 'middle' })).join('')}`,
  2: (l) => `
    ${['A', 'B', 'C'].map((s, i) => box(20, 22 + i * 38, 70, 26) + t(55, 38 + i * 38, `Partner ${s}`, { size: 7.5, anchor: 'middle', fill: D }) + line(`M90 ${35 + i * 38}C118 ${35 + i * 38} 118 73 140 73`, G)).join('')}
    ${box(140, 52, 76, 42, C)}${t(178, 70, 'REVIEW', { fill: C, size: 8, anchor: 'middle' })}${t(178, 83, l('one framework', 'ein Framework'), { size: 7, anchor: 'middle' })}
    ${arrowH(216, 73, 248, C)}
    ${box(248, 56, 54, 34)}${t(275, 70, 'ORG', { fill: D, size: 7.5, anchor: 'middle' })}${check(268, 77)}
    ${t(178, 120, l('checked before it gets expensive', 'geprüft, bevor es teuer wird'), { size: 7, anchor: 'middle' })}`,
  3: (l) => `
    ${line('M16 110H304', G, false, 1.4)}${t(18, 126, 'main', { size: 7.5 })}
    ${line('M36 110C56 110 56 44 80 44H200C224 44 224 110 244 110', C, false, 1.6)}${t(84, 34, 'feature', { fill: C, size: 7.5 })}
    ${dot(36, 110, C)}${dot(100, 44, C)}${dot(130, 44, C)}${dot(244, 110, C)}${dot(290, 110)}
    ${box(146, 58, 100, 40)}${t(154, 72, 'sfdx-hardis', { fill: D, size: 7.5 })}${check(154, 79)}${t(166, 85, l('quality checks', 'Qualitätsprüfung'), { size: 7 })}
    ${t(250, 128, 'release', { size: 7.5 })}`,
  4: () => `
    ${box(120, 52, 80, 40, C)}${t(160, 76, 'SALESFORCE', { fill: D, size: 8, anchor: 'middle' })}
    ${[['SAP', 20, 18], ['MuleSoft', 220, 18], ['Genesys', 20, 104], ['MS Teams', 220, 104]].map(([s, x, y]) => box(+x, +y, 80, 24) + t(+x + 40, +y + 15, String(s), { size: 7.5, anchor: 'middle', fill: D })).join('')}
    ${line('M100 30C110 30 110 62 120 62')}${line('M220 30C210 30 210 62 200 62', C)}${line('M100 116C110 116 110 82 120 82')}${line('M220 116C210 116 210 82 200 82')}`,
};

export function serviceSketch(order: number, lang: Lang) {
  const l = (en: string, de: string) => (lang === 'de' ? de : en);
  return svc[order] ? frame(320, 140, svc[order](l), 'sketch sketch-card') : '';
}

// Role diagram: several partners -> architect on client side -> one org with its systems
export function roleSketch(lang: Lang, narrow = false) {
  const l = (en: string, de: string) => (lang === 'de' ? de : en);
  if (!narrow) {
    const inner = `
      ${t(40, 34, l('TODAY', 'HEUTE'), { size: 9 })}
      ${['A', 'B', 'C'].map((s, i) => box(40, 50 + i * 54, 150, 38) + t(115, 73 + i * 54, `Partner ${s}`, { fill: D, size: 10, anchor: 'middle' }) + t(115, 99 + i * 54, i === 2 ? '' : '', {}) + line(`M190 ${69 + i * 54}C240 ${69 + i * 54} 240 123 290 123`, G)).join('')}
      ${t(40, 228, l('every partner delivers their piece', 'jeder Partner liefert sein Stück'), { size: 9 })}
      ${box(290, 82, 240, 82, C, '#fff')}${t(410, 110, l('ARCHITECTURE ON YOUR SIDE', 'ARCHITEKTUR AUF IHRER SEITE'), { fill: C, size: 10, anchor: 'middle' })}
      ${t(410, 132, l('solution design · standards', 'Lösungsdesign · Standards'), { size: 9, anchor: 'middle' })}${t(410, 148, l('reviews before it gets expensive', 'Reviews, bevor es teuer wird'), { size: 9, anchor: 'middle' })}
      ${arrowH(530, 123, 620, C)}
      ${box(620, 92, 170, 62, D, '#fff')}${t(705, 119, l('ONE SALESFORCE ORG', 'EINE SALESFORCE-ORG'), { fill: D, size: 10, anchor: 'middle' })}${check(686, 132)}${t(700, 140, l('one picture', 'ein Gesamtbild'), { size: 9 })}
      ${['ERP', l('Telephony', 'Telefonie'), l('Service systems', 'Service-Systeme')].map((s, i) => box(840, 50 + i * 54, 140, 38, G, '#fff', true) + t(910, 73 + i * 54, s, { size: 9.5, anchor: 'middle' }) + line(`M790 123C815 123 815 ${69 + i * 54} 840 ${69 + i * 54}`, G, true)).join('')}`;
    return frame(1020, 250, inner, 'sketch sketch-wide');
  }
  const inner = `
    ${['A', 'B', 'C'].map((s, i) => box(16 + i * 104, 20, 92, 34) + t(62 + i * 104, 41, `Partner ${s}`, { fill: D, size: 10, anchor: 'middle' }) + line(`M${62 + i * 104} 54C${62 + i * 104} 78 166 72 166 96`, G)).join('')}
    ${box(36, 96, 260, 70, C)}${t(166, 120, l('ARCHITECTURE ON YOUR SIDE', 'ARCHITEKTUR AUF IHRER SEITE'), { fill: C, size: 10, anchor: 'middle' })}
    ${t(166, 138, l('solution design · standards', 'Lösungsdesign · Standards'), { size: 9, anchor: 'middle' })}${t(166, 153, l('reviews before it gets expensive', 'Reviews, bevor es teuer wird'), { size: 9, anchor: 'middle' })}
    ${arrowV(166, 166, 200, C)}
    ${box(66, 200, 200, 44, D)}${t(166, 227, l('ONE SALESFORCE ORG', 'EINE SALESFORCE-ORG'), { fill: D, size: 10, anchor: 'middle' })}
    ${['ERP', l('Telephony', 'Telefonie'), 'Service'].map((s, i) => box(16 + i * 104, 274, 92, 30, G, '#fff', true) + t(62 + i * 104, 293, s, { size: 9, anchor: 'middle' }) + line(`M166 244C166 260 ${62 + i * 104} 258 ${62 + i * 104} 274`, G, true)).join('')}`;
  return frame(332, 320, inner, 'sketch sketch-narrow');
}

// Small line icons for the four approach steps
export const stepIcons = [
  `<svg viewBox="0 0 48 48" class="step-icon" aria-hidden="true"><circle cx="21" cy="21" r="11" fill="none" stroke="${G}" stroke-width="1.6"/><path d="M29 29l9 9" stroke="${C}" stroke-width="2" stroke-linecap="round"/><path d="M15 21h12M21 15v12" stroke="${L}" stroke-width="1.4"/></svg>`,
  `<svg viewBox="0 0 48 48" class="step-icon" aria-hidden="true"><rect x="7" y="9" width="34" height="30" rx="3" fill="none" stroke="${G}" stroke-width="1.6"/><path d="M7 19h34M19 19v20" stroke="${G}" stroke-width="1.4"/><rect x="24" y="25" width="11" height="8" rx="1.5" fill="none" stroke="${C}" stroke-width="1.8"/></svg>`,
  `<svg viewBox="0 0 48 48" class="step-icon" aria-hidden="true"><path d="M6 24h12M30 24h12" stroke="${G}" stroke-width="1.6"/><rect x="18" y="14" width="12" height="20" rx="2" fill="none" stroke="${C}" stroke-width="1.8"/><path d="M21 24l2 2 4-4" fill="none" stroke="${C}" stroke-width="1.8"/></svg>`,
  `<svg viewBox="0 0 48 48" class="step-icon" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="none" stroke="${G}" stroke-width="1.6"/><path d="M9 24h30M24 9c-6 7-6 23 0 30M24 9c6 7 6 23 0 30" fill="none" stroke="${G}" stroke-width="1.2"/><circle cx="31" cy="17" r="3" fill="${C}"/></svg>`,
];

// Career timeline for the about section
export function timelineSketch(lang: Lang, narrow = false) {
  const l = (en: string, de: string) => (lang === 'de' ? de : en);
  const items: [string, string, boolean][] = [
    ['2018', l('first Salesforce certification', 'erste Salesforce-Zertifizierung'), false],
    ['2020', l('founded FK Solution Design', 'Gründung FK Solution Design'), true],
    ['2022', l('co-founded Blue Apes Consulting', 'Mitgründer Blue Apes Consulting'), false],
    ['2025', l('Blue Apes sold', 'Blue Apes verkauft'), false],
    [l('today', 'heute'), l('25 certifications, 8 Architect', '25 Zertifikate, 8 Architect'), true],
  ];
  if (!narrow) {
    const wrap = (s: string) => { if (s.length <= 24) return [s]; const k = s.lastIndexOf(' ', 24); return [s.slice(0, k), s.slice(k + 1)]; };
    return frame(1020, 120, line('M40 50H980', G, false, 1.4) + items.map(([y, s, hi], i) => { const x = 110 + i * 200; return dot(x, 50, hi ? C : G, hi ? 6 : 4.5) + t(x, 32, y, { fill: hi ? C : D, size: 12, anchor: 'middle', weight: 600 }) + wrap(s).map((p, j) => t(x, 78 + j * 14, p, { size: 9.5, anchor: 'middle' })).join(''); }).join(''), 'sketch sketch-wide');
  }
  return frame(332, 250, line('M40 24V226', G, false, 1.4) + items.map(([y, s, hi], i) => dot(40, 28 + i * 48, hi ? C : G, hi ? 6 : 4.5) + t(60, 26 + i * 48, y, { fill: hi ? C : D, size: 11, weight: 600 }) + t(60, 41 + i * 48, s, { size: 9.5 })).join(''), 'sketch sketch-narrow');
}
