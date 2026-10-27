// Small technical drawings for the blog overview cards, one per article
// (keyed by translationKey), in the style of a sketch in an architecture document:
// fine grey lines, short labels, one cyan accent. Drawn on a 320x160 canvas;
// src/components/CardDrawing.astro adds the grid and falls back to the topic icon.
// Labels must state facts from the article.
type Lang = 'en' | 'de';
type Drawing = (l: (en: string, de: string) => string) => string;

const G = '#5a5a5e'; // lines and labels
const C = '#1BA1E2'; // accent
const D = '#232325'; // headings
const L = '#e3e5e7'; // light rules

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const t = (x: number, y: number, s: string, o: { fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 8}" fill="${o.fill ?? G}" text-anchor="${o.anchor ?? 'start'}">${esc(s)}</text>`;
const box = (x: number, y: number, w: number, h: number, stroke = G, fill = '#fff') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
const arrow = (x1: number, y: number, x2: number, color = G, dashed = false) =>
  `<path d="M${x1} ${y}H${x2 - 1}" stroke="${color}" stroke-width="1.3"${dashed ? ' stroke-dasharray="4 3"' : ''}/><path d="M${x2 - 5} ${y - 3.5}l5 3.5-5 3.5" fill="none" stroke="${color}" stroke-width="1.3"/>`;
const check = (x: number, y: number, color = C) => `<path d="M${x} ${y}l3 3 5-6" fill="none" stroke="${color}" stroke-width="1.4"/>`;
const cross = (x: number, y: number) => `<path d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" stroke="${G}" stroke-width="1.4"/>`;
const tag = (x: number, y: number, w: number, s: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="20" rx="4" fill="${D}"/>${t(x + w / 2, y + 13.5, s, { fill: '#fff', anchor: 'middle' })}`;
const dot = (x: number, y: number, color = G, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${color}" stroke-width="1.4"/>`;
const pin = (x: number, y: number, color = G) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0c-6-8-9-12-9-16a9 9 0 0 1 18 0c0 4-3 8-9 16z" fill="#fff" stroke="${color}" stroke-width="1.4"/><circle cx="0" cy="-16" r="3" fill="${color}"/></g>`;

const drawings: Record<string, Drawing> = {
  'salesforce-password-integrations-2027': (l) => `
    ${box(22, 56, 80, 48)}${t(62, 77, l('INTEGRATION', 'SCHNITTSTELLE'), { fill: D, anchor: 'middle' })}${t(62, 91, 'ERP · middleware', { size: 7, anchor: 'middle' })}
    ${box(218, 56, 80, 48)}${t(258, 77, 'SALESFORCE', { fill: D, anchor: 'middle' })}${t(258, 91, 'connected app', { size: 7, anchor: 'middle' })}
    <path d="M102 66H218" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${cross(160, 66)}${t(160, 56, l('username + password', 'Benutzername + Passwort'), { size: 7.5, anchor: 'middle' })}
    ${arrow(102, 94, 218, C)}${t(160, 116, 'JWT bearer · client credentials', { fill: C, size: 7.5, anchor: 'middle' })}
    ${tag(224, 16, 74, '20.02.2027')}
    <path d="M22 138H298" stroke="${G}" stroke-width="0.8"/>${dot(40, 138, G, 2.5)}${dot(140, 138, C, 3.5)}${dot(220, 138, G, 2.5)}${dot(290, 138, G, 2.5)}
    ${t(40, 152, '12/2026', { size: 7, anchor: 'middle' })}${t(140, 152, '02/2027', { fill: C, size: 7, anchor: 'middle' })}${t(220, 152, "Summer '27", { size: 7, anchor: 'middle' })}${t(290, 152, "'28", { size: 7, anchor: 'middle' })}`,

  'pull-request-reviews-enterprise': (l) => `
    <path d="M18 122H302" stroke="${G}" stroke-width="1.4"/>${t(22, 140, 'main', { size: 7.5 })}
    <path d="M40 122C60 122 60 46 84 46H232C256 46 256 122 276 122" fill="none" stroke="${C}" stroke-width="1.6"/>${t(92, 36, l('one user story', 'eine User Story'), { fill: C, size: 7.5 })}
    ${dot(40, 122, C)}${dot(104, 46, C)}${dot(136, 46, C)}${dot(276, 122, C)}
    ${box(156, 60, 112, 50)}${t(166, 75, 'PULL REQUEST', { fill: D, size: 7.5 })}
    ${check(167, 85)}${t(180, 90, l('pipeline green', 'Pipeline grün'), { size: 7.5 })}${check(167, 99)}${t(180, 104, l('reviewer approved', 'Reviewer gibt frei'), { size: 7.5 })}
    ${t(282, 114, 'merge', { size: 7.5 })}`,

  'object-ownership-matrix': (l) => `
    ${t(18, 18, 'OBJECT OWNERSHIP MATRIX', { fill: D, size: 7 })}
    ${[l('Sales', 'Vertrieb'), 'Service', 'FS'].map((s, i) => t(116 + i * 40, 38, s, { size: 7, anchor: 'middle' })).join('')}
    ${[['Account', 0], ['Opportunity', 0], ['Case', 1], ['Asset', 1], ['Work Order', 2]].map(([o, k], r) => `<path d="M18 ${46 + r * 18}H206" stroke="${L}"/>` + t(22, 58 + r * 18, String(o), { size: 7 }) + [0, 1, 2].map((c) => (c === k ? `<circle cx="${116 + c * 40}" cy="${55 + r * 18}" r="4" fill="${C}"/>` : dot(116 + c * 40, 55 + r * 18, L, 2.5))).join('')).join('')}
    ${box(226, 30, 78, 46, C)}${t(265, 48, l('1 object =', '1 Objekt ='), { fill: C, size: 7, anchor: 'middle' })}${t(265, 62, l('1 owner', '1 Owner'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(226, 100, l('8 streams', '8 Streams'), { size: 7 })}${t(226, 114, l('30+ developers', '30+ Entwickler'), { size: 7 })}${t(226, 128, l('~3 months', '~3 Monate'), { size: 7 })}${t(226, 142, l('80 % in v1', '80 % in V1'), { size: 7 })}`,

  'field-service-mobile-guided-voice': (l) => `
    <path d="M34 128L72 98L116 110L150 64L190 76" fill="none" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/>
    ${pin(72, 98)}${pin(116, 110)}${pin(150, 64, C)}
    <rect x="20" y="122" width="20" height="12" rx="2" fill="${D}"/><circle cx="25" cy="136" r="2.6" fill="${D}"/><circle cx="35" cy="136" r="2.6" fill="${D}"/>
    ${box(206, 18, 94, 124)}${t(216, 34, l('SERVICE REPORT', 'SERVICEBERICHT'), { fill: D, size: 7.5 })}
    ${[l('Working time', 'Arbeitszeit'), l('Spare parts', 'Ersatzteile'), l('Fault code', 'Fehlercode'), l('Measured values', 'Messwerte')]
      .map((s, i) => t(216, 54 + i * 18, s, { size: 7 }) + `<path d="M216 ${59 + i * 18}H290" stroke="${L}"/>`).join('')}
    <g transform="translate(217 120)" fill="none" stroke="${C}" stroke-width="1.4"><rect x="0" y="0" width="7" height="11" rx="3.5"/><path d="M-2.5 7a6 6 0 0 0 12 0M3.5 13v3"/></g>
    ${t(231, 130, l('voice input', 'Spracheingabe'), { fill: C, size: 7 })}`,

  'field-service-master-data': (l) => `
    ${box(22, 22, 128, 116)}${t(32, 38, l('MASTER DATA', 'STAMMDATEN'), { fill: D, size: 7.5 })}
    ${[l('Territories', 'Servicegebiete'), l('Skills', 'Qualifikationen'), l('Work types', 'Arbeitstypen'), l('Assets', 'Anlagen'), l('Visiting hours', 'Öffnungszeiten'), l('Absences', 'Abwesenheiten')]
      .map((s, i) => t(44, 56 + i * 14, s, { size: 7 }) + check(32, 50 + i * 14, i === 1 ? C : G)).join('')}
    ${arrow(150, 80, 196, C)}
    ${box(196, 52, 104, 56, C)}${t(248, 74, l('SCHEDULING', 'PLANUNG'), { fill: D, size: 8, anchor: 'middle' })}${t(248, 88, 'Match Skills', { size: 7, anchor: 'middle' })}
    ${tag(196, 120, 104, l('6 kinds of data', '6 Datenarten'))}`,

  'field-service-scheduling-automation': (l) => `
    ${box(18, 52, 74, 40)}${t(55, 70, l('AUTOMATION', 'AUTOMATIK'), { fill: D, size: 7.5, anchor: 'middle' })}${t(55, 83, 'policy', { size: 7, anchor: 'middle' })}
    ${arrow(92, 72, 124)}
    ${tag(124, 62, 66, 'Scheduled')}
    ${arrow(190, 72, 222, C)}
    ${tag(222, 62, 80, 'Dispatched')}
    ${dot(157, 118, C, 9)}<path d="M151 136a8 8 0 0 1 12 0" fill="none" stroke="${C}" stroke-width="1.4"/>
    <path d="M166 112C190 104 200 96 206 80" fill="none" stroke="${C}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${t(176, 132, l('dispatcher reviews and releases', 'Disponent prüft und gibt frei'), { fill: C, size: 7 })}
    ${t(18, 30, l('trust grows: more automatic', 'Vertrauen wächst: mehr Automatik'), { size: 7.5 })}`,

  'field-service-spare-parts': (l) => `
    ${box(20, 40, 86, 80)}${t(63, 62, 'ERP', { fill: D, size: 9, anchor: 'middle' })}${t(63, 78, l('stock leads', 'führt Bestand'), { size: 7, anchor: 'middle' })}${t(63, 92, l('valuation', 'Bewertung'), { size: 7, anchor: 'middle' })}${t(63, 106, l('purchasing', 'Einkauf'), { size: 7, anchor: 'middle' })}
    ${box(214, 40, 86, 80, C)}${t(257, 62, 'FIELD SERVICE', { fill: D, size: 7.5, anchor: 'middle' })}${t(257, 78, l('copy of stock', 'Kopie Bestand'), { size: 7, anchor: 'middle' })}${t(257, 92, l('parts consumed', 'Verbrauch'), { size: 7, anchor: 'middle' })}
    ${arrow(106, 62, 214)}${t(160, 56, l('stock, material', 'Bestand, Material'), { size: 7, anchor: 'middle' })}
    <path d="M214 100H107" stroke="${C}" stroke-width="1.3"/><path d="M112 96.5l-5 3.5 5 3.5" fill="none" stroke="${C}" stroke-width="1.3"/>${t(160, 114, l('consumption, requests', 'Verbrauch, Anforderung'), { fill: C, size: 7, anchor: 'middle' })}
    <rect x="234" y="128" width="26" height="14" rx="2" fill="${D}"/><circle cx="240" cy="144" r="2.6" fill="${D}"/><circle cx="254" cy="144" r="2.6" fill="${D}"/>${t(266, 140, l('van = location', 'Fahrzeug = Standort'), { size: 7 })}`,

  'field-service-maintenance-contracts': (l) => `
    ${box(18, 18, 120, 30)}${t(28, 37, 'Service Contract', { fill: D, size: 7.5 })}${t(130, 37, l('sold', 'verkauft'), { size: 7, anchor: 'end' })}
    ${box(18, 64, 120, 30)}${t(28, 83, 'Maintenance Plan', { fill: D, size: 7.5 })}${t(130, 83, l('planned', 'geplant'), { size: 7, anchor: 'end' })}
    ${box(18, 110, 120, 30, C)}${t(28, 129, 'Entitlement', { fill: D, size: 7.5 })}${t(130, 129, '24 h', { fill: C, size: 7, anchor: 'end' })}
    ${arrow(138, 125, 196, C)}${t(167, 118, l('priority', 'Priorität'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(196, 98, 104, 44, C)}${t(248, 117, l('DISPATCH', 'DISPATCHING'), { fill: D, size: 7.5, anchor: 'middle' })}${t(248, 131, l('1 = highest', '1 = höchste'), { size: 7, anchor: 'middle' })}
    ${arrow(138, 79, 196)}${box(196, 58, 104, 32)}${t(248, 78, l('work orders', 'Arbeitsaufträge'), { size: 7.5, anchor: 'middle' })}`,

  'field-service-service-partners': (l) => `
    ${box(106, 16, 108, 34, C)}${t(160, 31, l('DISPATCHER', 'DISPONENT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(160, 43, l('one plan', 'ein Plan'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M160 50V66M80 66H240M80 66V82M240 66V82" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(22, 82, 116, 56)}${t(80, 100, l('INTERNAL', 'INTERN'), { fill: D, size: 7.5, anchor: 'middle' })}${t(80, 114, 'Service Resource', { size: 7, anchor: 'middle' })}${t(80, 127, l('same app', 'gleiche App'), { size: 7, anchor: 'middle' })}
    ${box(182, 82, 116, 56)}${t(240, 100, l('PARTNER', 'PARTNER'), { fill: D, size: 7.5, anchor: 'middle' })}${t(240, 114, 'Service Resource', { size: 7, anchor: 'middle' })}${t(240, 127, l('own territory', 'eigenes Gebiet'), { size: 7, anchor: 'middle' })}`,

  'field-service-rollout': (l) => `
    ${[l('Wave 1', 'Welle 1'), l('Wave 2', 'Welle 2'), l('Wave 3', 'Welle 3')].map((s, i) => box(20 + i * 98, 30 + i * 22, 86, 34, i === 0 ? C : G) + t(63 + i * 98, 51 + i * 22, s, { fill: D, size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(106, 47, 118)}${arrow(204, 69, 216)}
    ${tag(20, 120, 132, l('works council early', 'Betriebsrat früh'))}
    ${t(164, 128, l('timesheets · location', 'Timesheets · Standort'), { size: 7 })}
    ${t(164, 142, l('rules per country', 'Regeln je Land'), { fill: C, size: 7 })}`,

  'salesforce-winter-27-pipeline': (l) => `
    ${['build', 'validate', 'deploy'].map((s, i) => box(20 + i * 62, 30, 50, 26) + t(45 + i * 62, 47, s, { size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(70, 43, 82)}${arrow(132, 43, 144)}
    <rect x="20" y="72" width="174" height="64" rx="5" fill="${D}"/>
    ${t(30, 90, '$ sf org display', { fill: '#fff', size: 8 })}${t(30, 106, '  accessToken: ***', { fill: '#9a9a9e', size: 8 })}
    ${t(30, 124, l('# no secrets from 28.10.2026', '# keine Secrets ab 28.10.2026'), { fill: '#5bbdee', size: 7.5 })}
    ${box(214, 30, 86, 50, C)}${t(257, 50, 'JWT bearer', { fill: D, size: 8, anchor: 'middle' })}${t(257, 66, l('per job', 'pro Job'), { size: 7.5, anchor: 'middle' })}
    ${arrow(194, 104, 214, C)}<path d="M214 104H230V80" fill="none" stroke="${C}" stroke-width="1.3"/>
    ${tag(214, 116, 86, 'Node.js 22')}`,

  'service-cloud-casey-assistant': (l) => `
    ${dot(30, 80, D, 9)}<path d="M24 98a8 8 0 0 1 12 0" fill="none" stroke="${D}" stroke-width="1.4"/>${t(30, 116, l('customer', 'Kunde'), { size: 7.5, anchor: 'middle' })}
    <path d="M44 74C70 74 70 44 96 44" fill="none" stroke="${C}" stroke-width="1.3"/><path d="M44 86C70 86 70 116 96 116" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${box(96, 26, 110, 36, C)}${t(106, 42, 'CASEY', { fill: D, size: 8 })}${t(106, 54, l('answers the customer', 'antwortet dem Kunden'), { size: 6.8 })}
    ${box(96, 98, 110, 36)}${t(106, 114, l('SERVICE REP', 'SERVICEMITARBEITER'), { fill: D, size: 7.5 })}${t(106, 126, '+ Service Rep Assistant', { size: 6.8 })}
    ${arrow(206, 44, 222, C)}${t(228, 41, l('order status', 'Auftragsstatus'), { size: 7 })}${t(228, 53, l('manuals', 'Handbücher'), { size: 7 })}
    <path d="M151 62V98" stroke="${G}" stroke-width="1.2" stroke-dasharray="3 3"/>${t(157, 84, l('goodwill: approval', 'Kulanz: Freigabe'), { size: 6.8 })}
    ${arrow(206, 116, 222)}${t(228, 113, l('serial number', 'Seriennummer'), { size: 7 })}${t(228, 125, l('error code, photos', 'Fehlercode, Fotos'), { size: 7 })}`,

  'field-service-worth-it': (l) => `
    ${t(18, 18, l('MANY SHORT JOBS / DAY', 'VIELE KURZE EINSÄTZE / TAG'), { fill: C, size: 7 })}
    <path d="M18 40H302" stroke="${L}"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${24 + i * 56}" y="30" width="34" height="20" rx="3" fill="#fff" stroke="${C}" stroke-width="1.2"/>` + (i < 4 ? `<path d="M${58 + i * 56} 40H${80 + i * 56}" stroke="${C}" stroke-width="1.2" stroke-dasharray="3 3"/>` : '')).join('')}
    ${t(18, 66, l('route + slot optimisation pays off', 'Routen- und Terminoptimierung lohnt'), { fill: C, size: 7 })}
    ${t(18, 92, l('FEW LONG JOBS', 'WENIGE LANGE EINSÄTZE'), { fill: D, size: 7 })}
    <rect x="24" y="100" width="270" height="20" rx="3" fill="#fff" stroke="${G}" stroke-width="1.2"/>${t(159, 113.5, l('commissioning, 2 weeks', 'Inbetriebnahme, 2 Wochen'), { size: 7, anchor: 'middle' })}
    ${t(18, 140, l('little to optimise', 'wenig zu optimieren'), { size: 7 })}${t(302, 140, l('175 / technician / month', '175 / Techniker / Monat'), { size: 7, anchor: 'end' })}`,

  'sfdx-hardis-training': (l) => `
    <path d="M24 136H110V104H210V72H300" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${[['Level 1', 'Contributor Basics', l('7 labs', '7 Labs'), 30, 126], ['Level 2', 'Contributor Advanced', l('9 labs', '9 Labs'), 116, 94], ['Level 3', 'Release Manager', l('11 labs', '11 Labs'), 216, 62]]
      .map(([a, b, c, x, y], i) => `${t(Number(x), Number(y) - 18, String(a), { fill: i === 2 ? C : G, size: 7 })}${t(Number(x), Number(y) - 7, String(b), { fill: D, size: 6.8 })}${t(Number(x), Number(y) + 4, String(c), { size: 7 })}`).join('')}
    <g transform="translate(276 14)" fill="none" stroke="${C}" stroke-width="1.4"><circle cx="10" cy="10" r="9"/><path d="M6 18l-2 9 6-3 6 3-2-9"/>${check(6, 10)}</g>`,

  'nearshore-team-size': (l) => {
    const ring = (cx: number, cy: number, r: number, n: number, line: string, color: string) => {
      const pts = Array.from({ length: n }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / n - Math.PI / 2), cy + r * Math.sin((2 * Math.PI * i) / n - Math.PI / 2)]);
      const lines = pts.flatMap((a, i) => pts.slice(i + 1).map((b) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`)).join('');
      return `<path d="${lines}" stroke="${line}" stroke-width="0.7" fill="none"/>` + pts.map(([x, y]) => dot(x, y, color, 3)).join('');
    };
    return `
    ${ring(72, 74, 46, 16, L, G)}
    ${cross(140, 30)}${t(72, 140, l('16 people', '16 Personen'), { fill: D, size: 7, anchor: 'middle' })}${t(72, 151, l('120 paths', '120 Wege'), { size: 7, anchor: 'middle' })}
    ${ring(196, 74, 28, 8, G, C)}${ring(272, 74, 28, 8, G, G)}
    ${check(296, 26)}${t(234, 140, l('2 teams of 8', '2 Teams à 8'), { fill: C, size: 7, anchor: 'middle' })}${t(234, 151, l('28 paths each', 'je 28 Wege'), { size: 7, anchor: 'middle' })}`;
  },

  'sfdx-hardis-introduction': (l) => `
    ${box(20, 52, 72, 56)}${t(56, 72, 'GIT', { fill: D, anchor: 'middle' })}${t(56, 86, 'repository', { size: 7, anchor: 'middle' })}${t(56, 98, l('client-owned', 'beim Kunden'), { size: 7, anchor: 'middle' })}
    ${box(118, 40, 84, 80, C)}${t(160, 58, 'sfdx-hardis', { fill: D, anchor: 'middle' })}
    ${[l('checks', 'Prüfungen'), 'deployments', 'monitoring', l('docs', 'Doku')].map((s, i) => check(130, 66 + i * 12, C) + t(142, 72 + i * 12, s, { size: 7 })).join('')}
    ${box(228, 52, 72, 56)}${t(264, 72, 'ORG', { fill: D, anchor: 'middle' })}${t(264, 86, 'UAT · prod', { size: 7, anchor: 'middle' })}
    ${arrow(92, 80, 118)}${arrow(202, 80, 228)}
    ${t(160, 140, l('open source · no licence fees', 'Open Source · keine Lizenzkosten'), { fill: C, size: 7.5, anchor: 'middle' })}`,

  'client-owned-devops-tools': (l) => `
    ${box(112, 56, 96, 48, C)}${t(160, 76, l('CLIENT', 'KUNDE'), { fill: D, anchor: 'middle' })}${t(160, 90, l('owns the accounts', 'besitzt die Accounts'), { size: 7, anchor: 'middle' })}
    ${[['Git', 40, 30], ['Pipeline', 40, 130], ['Jira', 280, 30], ['Miro', 280, 130]]
      .map(([s, x, y]) => box(Number(x) - 28, Number(y) - 12, 56, 24) + t(Number(x), Number(y) + 3, String(s), { size: 7.5, anchor: 'middle' })).join('')}
    <path d="M68 30H100V56M68 130H100V104M252 30H220V56M252 130H220V104" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${t(160, 30, l('partner: access granted', 'Partner: Zugriff erteilt'), { size: 7, anchor: 'middle' })}
    ${t(160, 140, l('partner leaves: access revoked', 'Partner geht: Zugriff entzogen'), { fill: C, size: 7, anchor: 'middle' })}`,

  'salesforce-licence-types': (l) => `
    ${t(18, 18, l('USER GROUP', 'NUTZERGRUPPE'), { fill: D, size: 7 })}${t(170, 18, l('LICENCE / MONTH', 'LIZENZ / MONAT'), { fill: D, size: 7 })}
    ${[[l('sales', 'Vertrieb'), 'Sales Cloud Core 195', false], [l('readers', 'Leser'), 'Platform Starter 25', true], [l('approvers', 'Freigeber'), 'Platform Starter 25', true], [l('dealers', 'Händler'), 'PRM 25', false], [l('interfaces', 'Schnittstellen'), 'Integration, API only', false]]
      .map(([a, b, hi], i) => box(18, 26 + i * 22, 112, 17) + t(26, 37.5 + i * 22, String(a), { size: 7 }) + arrow(134, 34.5 + i * 22, 164, hi ? C : G) + box(170, 26 + i * 22, 132, 17, hi ? C : G) + t(178, 37.5 + i * 22, String(b), { fill: hi ? C : G, size: 7 })).join('')}
    ${t(18, 150, l('100 users x 170 x 12 = 204,000 / year', '100 Nutzer x 170 x 12 = 204.000 / Jahr'), { fill: C, size: 7.5 })}`,

  'devops-salesforce-enterprise': (l) => `
    ${[l('dev sandbox', 'Dev-Sandbox'), 'pull request', l('validation', 'Validierung'), 'UAT', l('production', 'Produktion')]
      .map((s, i) => box(14 + i * 60, 48, 52, 30, i === 4 ? C : G) + t(40 + i * 60, 67, s, { size: 6.8, anchor: 'middle' })).join('')}
    ${[66, 126, 186, 246].map((x) => arrow(x, 63, x + 8)).join('')}
    <path d="M14 116H302" stroke="${G}" stroke-width="1.4"/>${[40, 100, 160, 220, 280].map((x) => dot(x, 116)).join('')}
    <path d="M40 78V112M100 78V112M160 78V112M220 78V112M280 78V112" stroke="${L}" stroke-width="1"/>
    ${t(14, 136, l('Git repository: single source of truth', 'Git-Repository: einzige Quelle der Wahrheit'), { size: 7.5 })}
    ${t(14, 32, l('quality gate: merge only when green', 'Qualitätsschranke: Merge nur bei Grün'), { fill: C, size: 7.5 })}`,

  'agentforce-business-value-data-quality': (l) => `
    ${box(18, 56, 70, 44)}${t(53, 76, l('use case', 'Use Case'), { fill: D, size: 7.5, anchor: 'middle' })}${t(53, 89, l('business value', 'Business Value'), { size: 6.8, anchor: 'middle' })}
    ${box(124, 56, 70, 44)}${t(159, 76, 'PILOT', { fill: D, size: 7.5, anchor: 'middle' })}${t(159, 89, l('nearly half stay', 'fast die Hälfte'), { size: 6.8, anchor: 'middle' })}
    ${box(232, 56, 70, 44, C)}${t(267, 76, l('PRODUCTION', 'PRODUKTION'), { fill: D, size: 7.5, anchor: 'middle' })}${t(267, 89, l('in daily use', 'im Alltag'), { size: 6.8, anchor: 'middle' })}
    ${arrow(88, 78, 124)}${arrow(194, 78, 232, C)}
    <path d="M213 50V106" stroke="${D}" stroke-width="2"/>
    ${check(196, 120)}${t(208, 125, l('data quality', 'Datenqualität'), { size: 7.5 })}${check(196, 136)}${t(208, 141, l('measurable value', 'messbarer Nutzen'), { size: 7.5 })}
    ${t(18, 36, l('85% have tested or deployed Agentforce', '85 % haben Agentforce getestet oder im Einsatz'), { size: 7.5 })}`,

  'agent-context-engine': (l) => `
    ${[l('CRM objects', 'CRM-Objekte'), 'ERP', l('data warehouse', 'Data Warehouse'), l('knowledge', 'Wissen')]
      .map((s, i) => box(14, 22 + i * 30, 84, 22) + t(56, 36 + i * 30, s, { size: 6.8, anchor: 'middle' })).join('')}
    <path d="M98 33C116 33 112 80 128 80M98 63C114 63 114 80 128 80M98 93C114 93 114 80 128 80M98 123C116 123 112 80 128 80" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(128, 50, 92, 60, C)}${t(174, 70, 'AGENT CONTEXT', { fill: D, size: 7.5, anchor: 'middle' })}${t(174, 82, 'ENGINE', { fill: D, size: 7.5, anchor: 'middle' })}${t(174, 98, 'Data 360', { size: 7, anchor: 'middle' })}
    ${arrow(220, 80, 240, C)}
    ${box(240, 60, 66, 40)}${t(273, 77, 'AGENT', { fill: D, size: 7.5, anchor: 'middle' })}${t(273, 90, l('per request', 'pro Anfrage'), { size: 6.8, anchor: 'middle' })}`,

  'service-documents-document-builder': (l) => `
    ${box(18, 42, 64, 92)}<path d="M18 54H82M18 120H82" stroke="${G}" stroke-width="1"/><circle cx="50" cy="127" r="2.6" fill="${G}"/>
    ${t(50, 72, l('MOBILE APP', 'MOBILE APP'), { fill: D, size: 7, anchor: 'middle' })}${t(50, 88, l('offline', 'offline'), { fill: C, size: 7.5, anchor: 'middle' })}${t(50, 102, l('signature', 'Unterschrift'), { size: 6.8, anchor: 'middle' })}
    ${arrow(82, 88, 108, C)}
    <path d="M108 18H174L190 34V142H108Z" fill="#fff" stroke="${G}" stroke-width="1.2"/><path d="M174 18V34H190" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${t(116, 46, l('SERVICE REPORT', 'SERVICEBERICHT'), { fill: D, size: 6.8 })}
    ${[62, 74, 86, 98].map((y) => `<path d="M116 ${y}H182" stroke="${L}"/>`).join('')}
    <path d="M140 128c6-10 10 4 15-4s7 6 12-1 6 3 10 0" fill="none" stroke="${C}" stroke-width="1.3"/><path d="M138 134H182" stroke="${G}" stroke-width="0.8"/>
    ${tag(116, 106, 32, 'PDF')}
    ${[l('work order', 'Arbeitsauftrag'), l('line item', 'Auftragsposition'), l('service appointment', 'Servicetermin')].map((s, i) => check(208, 36 + i * 18) + t(220, 41 + i * 18, s, { size: 7 })).join('')}
    ${cross(212, 92)}${t(220, 96, l('asset, custom objects', 'Asset, Custom Objects'), { size: 7 })}
    ${t(208, 132, l('250 / user / month', '250 / Nutzer / Monat'), { fill: C, size: 7.5 })}`,
  'document-builder-limits-workarounds': (l) => `
    ${t(18, 18, l('LIMIT', 'GRENZE'), { fill: D, size: 7 })}${t(186, 18, 'WORKAROUND', { fill: C, size: 7 })}
    ${[[l('template = text field', 'Vorlage = Textfeld'), 'screen flow'], [l('fixed file name', 'fester Dateiname'), l('async flow', 'asynchroner Flow')], [l('no email', 'keine E-Mail'), 'flow'], [l('no defaults', 'keine Vorbelegung'), 'flow'], [l('basic styling', 'einfaches Styling'), 'LWC + GraphQL']]
      .map(([a, b], i) => box(18, 26 + i * 26, 126, 20) + t(26, 39 + i * 26, a, { size: 7 }) + arrow(150, 36 + i * 26, 180, C) + box(186, 26 + i * 26, 116, 20, C) + t(194, 39 + i * 26, b, { size: 7 })).join('')}`,
  'manufacturing-cloud-worth-it': (l) => `
    ${t(18, 18, l('LIST PRICE / USER / MONTH', 'LISTENPREIS / NUTZER / MONAT'), { fill: D, size: 7 })}
    ${box(18, 26, 116, 22)}${t(26, 40, 'Sales Cloud Core', { size: 7 })}${t(126, 40, '195', { size: 7.5, anchor: 'end' })}
    ${box(18, 54, 116, 22, C)}${t(26, 68, 'Manufacturing Core', { size: 7 })}${t(126, 68, '275', { fill: C, size: 7.5, anchor: 'end' })}
    ${t(18, 94, l('+80 x 200 users = 192,000 / year', '+80 x 200 Nutzer = 192.000 / Jahr'), { fill: C, size: 7 })}
    ${t(170, 18, 'SALES AGREEMENT', { fill: D, size: 7 })}
    <path d="M170 112H302" stroke="${G}" stroke-width="1"/>
    ${[[70, 62], [70, 74], [70, 44], [70, 66]].map(([p, a], i) => `<rect x="${176 + i * 32}" y="${112 - p}" width="10" height="${p}" fill="#fff" stroke="${G}" stroke-width="1.1"/><rect x="${188 + i * 32}" y="${112 - a}" width="10" height="${a}" fill="${C}" fill-opacity="0.18" stroke="${C}" stroke-width="1.1"/>` + t(187 + i * 32, 124, `Q${i + 1}`, { size: 6.8, anchor: 'middle' })).join('')}
    ${t(176, 140, l('planned', 'geplant'), { size: 7 })}${t(226, 140, l('actual from ERP', 'Ist aus ERP'), { fill: C, size: 7 })}
    ${check(18, 114)}${t(30, 120, l('volume agreements', 'Rahmenverträge'), { size: 7 })}${check(18, 128)}${t(30, 134, l('rebates, warranty', 'Rebates, Garantie'), { size: 7 })}
    ${cross(22, 148)}${t(30, 152, l('industry name only', 'nur der Branchenname'), { size: 7 })}`,
  'salesforce-well-architected-2026': (l) => `
    ${t(18, 16, l('PREVIOUSLY', 'BISHER'), { fill: D, size: 7 })}${t(168, 12, l('SINCE 14.09.2026', 'SEIT 14.09.2026'), { fill: D, size: 7 })}
    ${['Trusted', 'Easy', 'Adaptable'].map((s, i) => box(18, 26 + i * 36, 82, 26) + t(59, 42 + i * 36, s, { size: 7.5, anchor: 'middle' })).join('')}
    <path d="M100 39C124 39 124 77 140 77M100 75H140M100 111C124 111 124 77 140 77" fill="none" stroke="${G}" stroke-width="1.2"/>${arrow(140, 77, 162)}
    ${['Trust', 'Reliability', 'Operational Excellence', 'Resource & Cost', 'Fairness'].map((s, i) => box(168, 20 + i * 22, 134, 17, i === 3 ? C : G) + t(176, 31.5 + i * 22, s, { fill: i === 3 ? C : G, size: 7 })).join('')}
    <rect x="168" y="134" width="134" height="17" rx="4" fill="none" stroke="${C}" stroke-width="1.2" stroke-dasharray="4 3"/>${t(235, 145.5, l('+ Agentic Enterprise lens', '+ Agentic-Enterprise-Linse'), { fill: C, size: 7, anchor: 'middle' })}`,

  'manufacturing-cloud-sales-agreements-actuals': (l) => `
    ${box(18, 34, 76, 34)}${t(56, 49, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(56, 60, l('orders', 'Aufträge'), { size: 6.8, anchor: 'middle' })}
    ${box(18, 92, 76, 34)}${t(56, 107, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(56, 118, l('inventory', 'Lagerbestand'), { size: 6.8, anchor: 'middle' })}
    ${arrow(94, 51, 132)}${t(113, 44, l('daily', 'täglich'), { size: 6.8, anchor: 'middle' })}
    <path d="M94 109H120V60H132" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${box(132, 18, 172, 124)}${t(142, 32, 'SALES AGREEMENT', { fill: D, size: 7.5 })}
    <path d="M144 122H294" stroke="${G}" stroke-width="0.8"/>
    ${[[60, 60], [60, 56], [60, 30], [60, 52]].map(([p, a], i) => {
      const x = 152 + i * 36, hit = i === 2;
      return `<rect x="${x}" y="${122 - p}" width="11" height="${p}" fill="#fff" stroke="${G}" stroke-width="1"/><rect x="${x + 13}" y="${122 - a}" width="11" height="${a}" fill="${hit ? C : L}" stroke="${hit ? C : G}" stroke-width="1"/>${t(x + 12, 133, 'Q' + (i + 1), { size: 6.8, anchor: 'middle' })}`;
    }).join('')}
    ${t(238, 52, l('behind on volume', 'Rückstand'), { fill: C, size: 6.8, anchor: 'middle' })}
    ${t(18, 152, l('plan vs. actual per customer, product, period', 'Plan gegen Ist pro Kunde, Produkt, Zeitraum'), { size: 7 })}`,

  'manufacturing-cloud-quote-to-agreement': (l) => `
    ${box(14, 30, 88, 98)}${t(58, 46, l('CONFIGURATOR', 'KONFIGURATOR'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('grind size', 'Mahlgrad'), l('raw materials', 'Rohstoffe'), l('certificate', 'Zertifikat')].map((s, i) => check(24, 62 + i * 18) + t(38, 67 + i * 18, s, { size: 7 })).join('')}
    ${arrow(102, 79, 126)}
    ${box(126, 52, 70, 54)}${t(161, 72, l('QUOTE', 'ANGEBOT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(161, 85, l('price approval', 'Preisfreigabe'), { size: 6.8, anchor: 'middle' })}${check(156, 92)}
    ${arrow(196, 79, 220, C)}${t(208, 70, 'API', { fill: C, size: 6.8, anchor: 'middle' })}
    ${box(220, 46, 88, 66, C)}${t(264, 64, 'SALES', { fill: D, size: 7.5, anchor: 'middle' })}${t(264, 75, 'AGREEMENT', { fill: D, size: 7.5, anchor: 'middle' })}${t(264, 90, l('product + quantity', 'Produkt + Menge'), { size: 6.8, anchor: 'middle' })}${t(264, 101, l('per period', 'pro Zeitraum'), { size: 6.8, anchor: 'middle' })}
    ${t(14, 152, l('one variant = one product, also in the ERP', 'eine Variante = ein Produkt, auch im ERP'), { size: 7 })}`,

  'manufacturing-cloud-customer-portal': (l) => `
    ${box(14, 24, 96, 108)}${t(62, 40, l('CUSTOMER PORTAL', 'KUNDENPORTAL'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('sales agreements', 'Sales Agreements'), l('orders', 'Bestellungen'), l('master data', 'Stammdaten'), l('cases', 'Cases')].map((s, i) => check(22, 56 + i * 18) + t(36, 61 + i * 18, s, { size: 7 })).join('')}
    ${box(144, 52, 70, 50)}${t(179, 74, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(179, 87, l('reduced view', 'reduziert'), { size: 6.8, anchor: 'middle' })}
    ${box(248, 52, 58, 50)}${t(277, 80, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}
    ${arrow(110, 66, 144, C)}${arrow(214, 66, 248, C)}${t(229, 58, 'sync', { fill: C, size: 6.8, anchor: 'middle' })}
    <path d="M248 90H214M144 90H110" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${t(14, 152, l('billing address: portal, then Salesforce, then ERP', 'Rechnungsadresse: Portal, dann Salesforce, dann ERP'), { size: 7 })}`,

  'manufacturing-cloud-account-forecasting': (l) => `
    ${[l('ERP order history', 'ERP-Historie'), 'Sales Agreements', 'Opportunities'].map((s, i) => box(14, 26 + i * 34, 84, 24) + t(56, 41 + i * 34, s, { size: 6.8, anchor: 'middle' })).join('')}
    <path d="M98 38C114 38 112 72 126 72M98 72H126M98 106C114 106 112 72 126 72" fill="none" stroke="${G}" stroke-width="1.2"/>${arrow(126, 72, 140)}
    ${box(140, 42, 92, 60, C)}${t(186, 62, 'ACCOUNT', { fill: D, size: 7.5, anchor: 'middle' })}${t(186, 73, 'FORECAST', { fill: D, size: 7.5, anchor: 'middle' })}${t(186, 89, l('customer × product × month', 'Kunde × Produkt × Monat'), { size: 6.3, anchor: 'middle' })}
    <path d="M246 20V124" stroke="${G}" stroke-width="1" stroke-dasharray="4 3"/>${arrow(232, 72, 262, C)}
    ${box(262, 52, 46, 40)}${t(285, 70, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(285, 82, l('planning', 'Planung'), { size: 6.8, anchor: 'middle' })}
    ${t(14, 146, l('2,000 × 500 × 24 = 24 million combinations', '2.000 × 500 × 24 = 24 Mio. Kombinationen'), { size: 7 })}`,

  'manufacturing-cloud-rebate-management': (l) => `
    ${box(14, 50, 62, 44)}${t(45, 68, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(45, 81, l('invoices', 'Rechnungen'), { size: 6.8, anchor: 'middle' })}
    ${arrow(76, 72, 96)}
    ${box(96, 38, 116, 68)}${t(154, 52, 'TRANSACTION JOURNAL', { fill: D, size: 7, anchor: 'middle' })}
    <path d="M108 96H136V84H164V72H192V60" fill="none" stroke="${C}" stroke-width="1.6"/>
    ${t(120, 91, l('tier 1', 'Stufe 1'), { size: 6.3, anchor: 'middle' })}${t(148, 79, l('tier 2', 'Stufe 2'), { size: 6.3, anchor: 'middle' })}${t(176, 67, l('tier 3', 'Stufe 3'), { size: 6.3, anchor: 'middle' })}
    ${arrow(212, 72, 236)}${check(218, 58)}
    ${box(236, 50, 70, 44, C)}${t(271, 68, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(271, 81, l('credit note', 'Gutschrift'), { size: 6.8, anchor: 'middle' })}
    ${t(14, 136, l('Salesforce calculates and approves, the ERP pays', 'Salesforce rechnet und gibt frei, das ERP zahlt'), { size: 7 })}`,

  'manufacturing-cloud-warranty-claims': (l) => `
    ${box(14, 62, 66, 36)}${t(47, 78, l('DEALER', 'HÄNDLER'), { fill: D, size: 7.5, anchor: 'middle' })}${t(47, 90, 'Portal', { size: 6.8, anchor: 'middle' })}
    ${arrow(80, 80, 104)}
    ${box(104, 58, 112, 44)}${t(160, 75, 'CLAIM', { fill: D, size: 7.5, anchor: 'middle' })}${t(160, 89, l('parts · labour · transport', 'Teile · Arbeit · Transport'), { size: 6.3, anchor: 'middle' })}
    ${box(104, 12, 112, 30, C)}${t(160, 25, l('ASSET', 'ANLAGE'), { fill: D, size: 7, anchor: 'middle' })}${t(160, 36, l('serial no. · start date', 'Seriennr. · Startdatum'), { size: 6.3, anchor: 'middle' })}
    <path d="M160 42V58" stroke="${C}" stroke-width="1.3" stroke-dasharray="3 2"/>
    ${arrow(216, 80, 240)}${check(222, 66)}
    ${box(240, 62, 66, 36)}${t(273, 78, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(273, 90, l('credit note', 'Gutschrift'), { size: 6.8, anchor: 'middle' })}
    <path d="M160 102V116" stroke="${G}" stroke-width="1.2"/><path d="M156.5 111l3.5 5 3.5-5" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(104, 118, 112, 26)}${t(160, 134, l('supplier recovery per part', 'Regress pro Teil'), { size: 6.8, anchor: 'middle' })}`,

  'manufacturing-cloud-global-rollout': (l) => `
    ${box(14, 26, 116, 30, C)}${t(72, 40, l('GLOBAL TEMPLATE', 'GLOBALES TEMPLATE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(72, 50, l('goal: harmonisation', 'Ziel: Harmonisierung'), { size: 6.5, anchor: 'middle' })}
    <path d="M30 96H302" stroke="${G}" stroke-width="0.8"/>
    ${[[60, l('phase 1', 'Phase 1'), l('large country', 'großes Land'), true], [140, l('phase 2', 'Phase 2'), l('large region', 'große Region'), true], [220, l('phase 3', 'Phase 3'), l('more countries', 'weitere Länder'), false], [290, '…', '', false]].map(([x, a, b, hit]) => dot(x, 96, hit ? C : G, hit ? 4 : 3) + t(x, 86, a, { fill: hit ? C : G, size: 7, anchor: 'middle' }) + t(x, 112, b, { size: 6.5, anchor: 'middle' })).join('')}
    ${t(170, 40, l('≥ 80 % identical per country', '≥ 80 % identisch pro Land'), { size: 7 })}
    ${t(14, 146, l('+ change management in every country', '+ Change Management in jedem Land'), { fill: D, size: 7 })}`,

  'agentforce-yes-or-no-manufacturers': (l) => `
    ${t(18, 18, l('5 CRITERIA', '5 KRITERIEN'), { fill: D, size: 7 })}${t(136, 18, l('3 CANDIDATES (SCENARIO)', '3 KANDIDATEN (SZENARIO)'), { fill: D, size: 7 })}
    ${[l('volume', 'Volumen'), l('data', 'Daten'), l('ERP API', 'ERP-API'), l('cost model', 'Kostenmodell'), l('edition', 'Edition')].map((s, i) => check(18, 32 + i * 16, G) + t(32, 36 + i * 16, s, { size: 7 })).join('')}
    ${arrow(96, 68, 130, C)}
    ${[[l('dealer enquiries', 'Händleranfragen'), l('start', 'starten'), true], [l('warranty pre-check', 'Garantie-Vorprüfung'), l('wait: data', 'warten: Daten'), false], [l('special machines', 'Sondermaschinen'), l('stays manual', 'bleibt manuell'), false]]
      .map(([a, b, hi], i) => box(136, 26 + i * 30, 166, 22, hi ? C : G) + t(146, 40 + i * 30, String(a), { fill: D, size: 7 }) + t(294, 40 + i * 30, String(b), { fill: hi ? C : G, size: 7, anchor: 'end' })).join('')}
    <path d="M18 120H302" stroke="${L}"/>
    ${t(18, 136, l('1 action = 20 Flex Credits = $0.10', '1 Aktion = 20 Flex Credits = 0,10 $'), { fill: D, size: 7.5 })}
    ${t(18, 150, l('sandbox: 16 credits per action', 'Sandbox: 16 Credits pro Aktion'), { size: 7 })}`,

  'agent-script-deterministic-rules': (l) => `
    ${box(18, 26, 86, 50)}${t(61, 44, l('DEALER', 'HÄNDLER'), { fill: D, anchor: 'middle' })}${t(61, 58, l('free text', 'Freitext'), { size: 7, anchor: 'middle' })}
    ${arrow(104, 51, 124)}
    ${box(124, 18, 86, 66, C)}${t(167, 34, 'AGENT SCRIPT', { fill: D, size: 7.5, anchor: 'middle' })}
    ${check(132, 42)}${t(145, 48, l('credit limit', 'Kreditlimit'), { size: 7 })}${check(132, 56)}${t(145, 62, l('warranty', 'Garantie'), { size: 7 })}${check(132, 70)}${t(145, 76, l('price approval', 'Preisfreigabe'), { size: 7 })}
    ${arrow(210, 51, 230, C)}
    ${box(230, 26, 72, 50)}${t(266, 44, 'LLM', { fill: D, anchor: 'middle' })}${t(266, 58, l('intent, wording', 'Absicht, Text'), { size: 7, anchor: 'middle' })}
    <path d="M18 100H302" stroke="${L}"/>
    ${t(18, 118, 'available when credit_ok == True', { fill: C, size: 7.5 })}
    ${t(18, 134, l('false: action hidden from the LLM', 'falsch: Aktion für das LLM verborgen'), { size: 7 })}
    ${t(18, 150, l('logic runs as code, no LLM call', 'Logik läuft als Code, ohne LLM-Aufruf'), { size: 7 })}`,

  'agentforce-sap-order-status': (l) => `
    ${t(18, 20, l('ORDER STATUS FROM SAP', 'AUFTRAGSSTATUS AUS SAP'), { fill: D, size: 7 })}
    ${[[l('Dealer', 'Händler'), 'portal'], ['Agent', l('action', 'Aktion')], ['API Catalog', 'sync'], ['MuleSoft', l('3 operations', '3 Operationen')], ['SAP S/4', 'OData']]
      .map(([a, b], i) => box(14 + i * 62, 34, 48, 28, i === 3 ? C : G) + t(38 + i * 62, 51, String(a), { fill: D, size: 7, anchor: 'middle' }) + t(38 + i * 62, 76, String(b), { fill: i === 3 ? C : G, size: 7, anchor: 'middle' })).join('')}
    ${[0, 1, 2, 3].map((i) => arrow(62 + i * 62, 48, 76 + i * 62, i === 2 ? C : G)).join('')}
    <path d="M18 92H302" stroke="${L}"/>
    ${t(18, 108, l('STAYS DETERMINISTIC', 'BLEIBT DETERMINISTISCH'), { fill: D, size: 7 })}
    ${[l('sold-to set by code', 'Auftraggeber per Code'), l('confirmed date from SAP', 'bestätigter Termin aus SAP'), l('read-only in release 1', 'Release 1 nur lesend')].map((s, i) => check(18, 116 + i * 14, i === 0 ? C : G) + t(32, 122 + i * 14, s, { size: 7 })).join('')}
    ${box(196, 112, 106, 36)}${t(249, 127, l('own rate limit', 'eigenes Rate Limit'), { size: 7, anchor: 'middle' })}${t(249, 140, l('HTTP 429 when exceeded', 'HTTP 429 bei Überlauf'), { size: 7, anchor: 'middle' })}`,

  'ai-coding-costs-salesforce-project': (l) => `
    ${t(18, 18, l('ONE AGENT SESSION, OPUS 5.5', 'EINE AGENTEN-SESSION, OPUS 5.5'), { fill: D, size: 7 })}
    ${box(18, 28, 132, 22)}${t(26, 42, l('without cache', 'ohne Cache'), { size: 7 })}${t(142, 42, '$9.80', { size: 7.5, anchor: 'end' })}
    ${box(18, 58, 132, 22, C)}${t(26, 72, l('with cache', 'mit Cache'), { size: 7 })}${t(142, 72, '$2.20', { fill: C, size: 7.5, anchor: 'end' })}
    ${t(18, 96, l('output: 3 % of tokens,', 'Output: 3 % der Tokens,'), { size: 7 })}${t(18, 107, l('over half of the cost', 'über die Hälfte der Kosten'), { size: 7 })}
    ${t(174, 18, l('WHO PAYS?', 'WER ZAHLT?'), { fill: D, size: 7 })}
    ${box(174, 28, 128, 22, C)}${t(182, 42, l('T&M', 'Aufwand'), { fill: D, size: 7 })}${t(294, 42, l('client', 'Kunde'), { fill: C, size: 7, anchor: 'end' })}
    ${box(174, 58, 128, 22)}${t(182, 72, l('fixed price', 'Festpreis'), { fill: D, size: 7 })}${t(294, 72, 'Partner', { size: 7, anchor: 'end' })}
    <path d="M18 120H302" stroke="${L}"/>
    ${t(18, 136, l('$19 to $250 per developer and month', '19 $ bis 250 $ pro Entwickler und Monat'), { fill: D, size: 7.5 })}
    ${t(18, 150, l('team of 8: about 1 % of day rates', 'Team mit 8: rund 1 % der Tagessätze'), { size: 7 })}`,

  'ai-rules-file-salesforce-repo': (l) => `
    ${[['Claude Code', false], ['Codex', false], ['Copilot', false], ['Vibes', true]].map(([s, d], i) => t(16, 41 + i * 20, String(s), { size: 7.5 }) + arrow(68, 38 + i * 20, 106, G, Boolean(d))).join('')}
    ${box(106, 26, 96, 88)}${t(154, 44, 'AGENTS.md', { fill: D, size: 8, anchor: 'middle' })}
    ${[l('client repo', 'Kunden-Repo'), l('owner: architect', 'Owner: Architekt'), l('< 200 lines', '< 200 Zeilen'), l('changes via PR', 'Änderung per PR')].map((s, i) => t(154, 62 + i * 14, s, { size: 7, anchor: 'middle' })).join('')}
    ${arrow(202, 70, 216, C)}
    ${box(216, 26, 90, 88, C)}${t(226, 42, l('ENFORCED', 'ERZWUNGEN'), { fill: C, size: 7.5 })}
    ${[l('deny rules', 'Deny-Regeln'), l('Stop hook', 'Stop-Hook'), l('CI gates', 'CI-Gates'), 'CODEOWNERS'].map((s, i) => check(226, 52 + i * 16, C) + t(240, 58 + i * 16, s, { size: 7 })).join('')}
    ${t(154, 128, l('guides the agent', 'leitet den Agenten'), { size: 7, anchor: 'middle' })}${t(261, 128, l('holds every time', 'gilt jedes Mal'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M16 138H306" stroke="${L}"/>
    ${t(16, 152, l('CLAUDE.md is context, not enforced config', 'CLAUDE.md ist Kontext, keine erzwungene Regel'), { fill: D, size: 7.5 })}`,

  'aiforce-salesforce-in-claude-slack': (l) => `
    ${t(18, 18, l('AIFORCE LAYER (15.09.2026)', 'AIFORCE-SCHICHT (15.09.2026)'), { fill: D, size: 7 })}
    ${[['Claude', l('beta, 37 sales skills', 'Beta, 37 Vertriebs-Skills'), true], ['Slack', l('Slackforce, announced', 'Slackforce, angekündigt'), false], ['Lightning', l('Coworker, needs Data 360', 'Coworker, braucht Data 360'), false]]
      .map(([a, b, hi], i) => box(18, 26 + i * 26, 168, 20, hi ? C : G) + t(26, 39 + i * 26, String(a), { fill: D, size: 7.5 }) + t(178, 39 + i * 26, String(b), { fill: hi ? C : G, size: 6.8, anchor: 'end' })).join('')}
    <path d="M186 62H206V108H186" fill="none" stroke="${G}" stroke-width="1.2"/>${arrow(206, 85, 226)}
    ${box(226, 62, 78, 46)}${t(265, 80, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(265, 94, l('user permissions', 'Nutzerrechte'), { size: 6.8, anchor: 'middle' })}
    <path d="M18 120H302" stroke="${L}"/>
    ${t(18, 136, l('SIForce: CEO post on X, 09.10.2026', 'SIForce: CEO-Post auf X, 09.10.2026'), { fill: D, size: 7.5 })}
    ${t(18, 150, l('no press release, keep the name AIforce', 'keine Pressemitteilung, Name AIforce behalten'), { size: 7 })}`,

  'api-67-user-mode-apex': (l) => `
    ${box(18, 26, 124, 60)}${t(28, 42, 'API 66.0', { fill: D, size: 7.5 })}${t(28, 58, 'system mode', { size: 7 })}${t(28, 72, l('no decl. = without sharing', 'ohne Dekl. = without sharing'), { size: 7 })}
    ${arrow(142, 56, 180, C)}${t(161, 47, l('bump', 'Sprung'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(180, 26, 124, 60, C)}${t(190, 42, 'API 67.0', { fill: C, size: 7.5 })}${t(190, 58, 'user mode', { size: 7 })}${t(190, 72, l('no decl. = with sharing', 'ohne Dekl. = with sharing'), { size: 7 })}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => dot(30 + i * 13, 102, G, 3)).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (i < 3 ? `<circle cx="${192 + i * 13}" cy="102" r="3" fill="${C}"/>` : dot(192 + i * 13, 102, L, 3))).join('')}
    ${t(28, 118, l('all records', 'alle Datensätze'), { size: 7 })}${t(190, 118, l('fewer records, no error', 'weniger Datensätze, kein Fehler'), { fill: C, size: 7 })}
    <path d="M18 130H304" stroke="${L}"/>
    ${cross(24, 144)}${t(34, 148, 'WITH SECURITY_ENFORCED', { size: 7 })}${arrow(130, 145, 150)}${check(156, 144, G)}${t(168, 148, 'WITH USER_MODE', { fill: D, size: 7 })}`,

  'data-360-costs-for-agents': (l) => `
    ${t(18, 18, l('CREDITS PER MB (BASE TIER)', 'CREDITS PRO MB (BASISSTAFFEL)'), { fill: D, size: 7 })}
    ${[[l('catalogue PDF', 'Katalog-PDF'), l('LLM parsing', 'LLM-Parsing'), '600', true], [l('manual PDF', 'Handbuch-PDF'), l('default parser', 'Standard-Parser'), '150', false]]
      .map(([a, b, c, hi], i) => box(18, 26 + i * 30, 82, 22) + t(59, 40 + i * 30, String(a), { size: 7, anchor: 'middle' }) + arrow(100, 37 + i * 30, 124, hi ? C : G) + box(124, 26 + i * 30, 84, 22, hi ? C : G) + t(166, 40 + i * 30, String(b), { size: 7, anchor: 'middle' }) + t(222, 41 + i * 30, String(c), { fill: hi ? C : D, size: 8.5 })).join('')}
    ${t(244, 41, l('/ MB', '/ MB'), { size: 7 })}${t(244, 71, l('/ MB', '/ MB'), { size: 7 })}
    <path d="M18 98H302" stroke="${L}"/>
    ${t(18, 114, l('SCENARIO PER MONTH', 'SZENARIO PRO MONAT'), { fill: D, size: 7 })}
    ${t(18, 130, l('searches: 14,400 credits', 'Suchen: 14.400 Credits'), { size: 7 })}
    ${t(18, 146, l('changed documents: 195,000 credits', 'geänderte Dokumente: 195.000 Credits'), { fill: C, size: 7 })}
    ${tag(194, 128, 108, l('sandbox: no tiers', 'Sandbox: ohne Staffel'))}`,

  'dealer-service-agent-costs': (l) => `
    ${t(18, 18, l('3,000 DEALER CHATS / MONTH (SCENARIO)', '3.000 HÄNDLERGESPRÄCHE / MONAT (SZENARIO)'), { fill: D, size: 7 })}
    ${[['Flex Credits', l('$1,020', '1.020 $'), 26, true], [l('per resolution, 60 %', 'pro Lösung, 60 %'), l('$3,600', '3.600 $'), 90, false], [l('per conversation', 'pro Gespräch'), l('$6,000', '6.000 $'), 150, false]]
      .map(([a, b, w, hi], i) => t(18, 40 + i * 22, String(a), { size: 7 }) + `<rect x="104" y="${31 + i * 22}" width="${w}" height="12" rx="2" fill="${hi ? C : '#fff'}" fill-opacity="${hi ? 0.25 : 1}" stroke="${hi ? C : G}" stroke-width="1.1"/>` + t(110 + Number(w), 40 + i * 22, String(b), { fill: hi ? C : G, size: 7 })).join('')}
    <path d="M18 104H302" stroke="${L}"/>
    ${t(18, 120, l('1 chat = 3 actions + 2 prompts = 68 credits', '1 Gespräch = 3 Aktionen + 2 Prompts = 68 Credits'), { fill: D, size: 7.5 })}
    ${t(18, 136, l('Data 360: 150 credits per MB of catalogue', 'Data 360: 150 Credits pro MB Katalog'), { size: 7 })}
    ${t(18, 150, l('sandbox: 120 credits per MB, test a subset', 'Sandbox: 120 Credits pro MB, Ausschnitt testen'), { size: 7 })}`,

  'field-service-ai-agents-today': (l) => `
    ${t(18, 18, l('AVAILABLE TODAY', 'HEUTE VERFÜGBAR'), { fill: D, size: 7 })}${t(186, 18, l('MACHINE BUILDER', 'MASCHINENBAUER'), { fill: D, size: 7 })}
    ${[[l('maintenance booking', 'Wartungsbuchung'), l('start', 'starten'), true], [l('job report draft', 'Berichtsentwurf'), l('clean fields', 'Felder sauber'), false], [l('pre-work brief', 'Pre-Work Brief'), l('asset history', 'Anlagenhistorie'), false], [l('breakdown booking', 'Störungsbuchung'), l('triage first', 'erst Triage'), false], [l('troubleshooting', 'Fehlersuche'), l('later', 'später'), false]]
      .map(([a, b, hi], i) => (hi ? check(18, 30 + i * 18, C) : dot(22, 33 + i * 18, G, 2.5)) + t(32, 36 + i * 18, String(a), { fill: hi ? C : G, size: 7 }) + `<path d="M18 ${41 + i * 18}H302" stroke="${L}"/>` + t(186, 36 + i * 18, String(b), { fill: hi ? C : G, size: 7 })).join('')}
    ${box(18, 124, 136, 28, C)}${t(86, 136, l('customer agent', 'Kundenagent'), { fill: D, size: 7, anchor: 'middle' })}${t(86, 147, l('20 credits = $0.10 / action', '20 Credits = 0,10 $ / Aktion'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(166, 124, 136, 28)}${t(234, 136, l('employee add-on', 'Add-on Mitarbeitende'), { fill: D, size: 7, anchor: 'middle' })}${t(234, 147, l('$125 per user / month', '125 € pro Nutzer / Monat'), { size: 7, anchor: 'middle' })}`,

  'fixed-price-ai-salesforce-partners': (l) => `
    ${t(18, 18, l('WARRANTY FORM (SCENARIO)', 'GARANTIEANTRAG (SZENARIO)'), { fill: D, size: 7 })}
    ${box(18, 28, 130, 58)}${t(83, 45, l('TIME & MATERIALS', 'NACH AUFWAND'), { fill: D, size: 7.5, anchor: 'middle' })}${t(83, 60, l('45 days, with AI 30', '45 Tage, mit KI 30'), { size: 7, anchor: 'middle' })}${t(83, 74, l('partner loses €16,500', 'Partner verliert 16.500 €'), { size: 7, anchor: 'middle' })}
    ${arrow(148, 57, 172, C)}
    ${box(172, 28, 130, 58, C)}${t(237, 45, l('FIXED PRICE €41,000', 'FESTPREIS 41.000 €'), { fill: D, size: 7.5, anchor: 'middle' })}${t(237, 60, l('~€1,370 per day worked', '~1.370 € pro Arbeitstag'), { fill: C, size: 7, anchor: 'middle' })}${t(237, 74, l('client saves 17 %', 'Kunde spart 17 %'), { size: 7, anchor: 'middle' })}
    <path d="M18 102H302" stroke="${L}"/>
    ${t(18, 118, l('SALESFORCE PARTNER INCENTIVES 2026', 'SALESFORCE-PARTNERANREIZE 2026'), { fill: D, size: 7 })}
    ${tag(18, 126, 138, l('active consumption', 'aktiver Verbrauch'))}${tag(164, 126, 138, l('agents in production', 'Agenten in Produktion'))}`,

  'flex-credits-agentforce-costs': (l) => `
    ${t(18, 18, l('SCENARIO: CREDITS PER MONTH', 'SZENARIO: CREDITS PRO MONAT'), { fill: D, size: 7 })}${t(302, 18, l('218,000 ≈ $1,090', '218.000 ≈ 1.090 €'), { fill: D, size: 7.5, anchor: 'end' })}
    <rect x="18" y="28" width="156" height="22" rx="3" fill="${C}" fill-opacity="0.18" stroke="${C}" stroke-width="1.2"/>
    ${[[174, 63], [237, 39], [276, 21], [297, 5]].map(([x, w]) => `<rect x="${x}" y="28" width="${w}" height="22" fill="#fff" stroke="${G}" stroke-width="1.1"/>`).join('')}
    ${t(96, 64, l('text actions 55 %', 'Textaktionen 55 %'), { fill: C, size: 7, anchor: 'middle' })}${t(205, 64, l('voice', 'Sprache'), { size: 7, anchor: 'middle' })}${t(256, 64, 'Data 360', { size: 7, anchor: 'middle' })}${t(302, 76, l('prompts', 'Prompts'), { size: 7, anchor: 'end' })}
    <path d="M18 86H302" stroke="${L}"/>
    ${[l('action: 20 · sandbox 16', 'Aktion: 20 · Sandbox 16'), l('voice action: 30 · sandbox 24', 'Sprachaktion: 30 · Sandbox 24'), l('prompt / 2,000 tokens: 2 · 4 · 16', 'Prompt / 2.000 Tokens: 2 · 4 · 16'), l('Data 360: 150 credits per MB', 'Data 360: 150 Credits pro MB')].map((s, i) => dot(22, 99 + i * 14, G, 2) + t(30, 102 + i * 14, s, { size: 7 })).join('')}
    ${box(214, 96, 88, 50, C)}${t(258, 114, l('unused credits', 'ungenutzte Credits'), { fill: C, size: 7, anchor: 'middle' })}${t(258, 126, l('expire at', 'verfallen zum'), { fill: C, size: 7, anchor: 'middle' })}${t(258, 138, l('order end', 'Bestellende'), { fill: C, size: 7, anchor: 'middle' })}`,

  'headless-platform-interactions-budget': (l) => `
    ${box(18, 30, 80, 46)}${t(58, 50, l('EXTERNAL AGENT', 'EXTERNER AGENT'), { fill: D, size: 7, anchor: 'middle' })}${t(58, 64, 'Claude · ChatGPT', { size: 7, anchor: 'middle' })}
    ${box(222, 30, 80, 46)}${t(262, 50, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(262, 64, l('production org', 'Produktions-Org'), { size: 7, anchor: 'middle' })}
    ${arrow(98, 44, 222, C)}${arrow(98, 52, 222, C)}${arrow(98, 60, 222, C)}
    ${t(160, 36, l('MCP / agentic API', 'MCP / agentische API'), { fill: C, size: 7, anchor: 'middle' })}
    ${tag(130, 66, 60, l('rate: TBA', 'Satz: TBA'))}
    ${t(18, 102, l('1 successful call = 1 interaction', '1 erfolgreicher Aufruf = 1 Interaktion'), { fill: D, size: 7.5 })}
    ${t(18, 116, l('sandbox not metered, 30 days notice', 'Sandbox ohne Zähler, 30 Tage Vorlauf'), { size: 7 })}
    <path d="M18 126H302" stroke="${L}"/>
    ${t(18, 142, l('scenario: 2 vs 8 calls per question', 'Szenario: 2 statt 8 Aufrufe pro Frage'), { fill: D, size: 7.5 })}
    ${t(18, 154, l('tool design changes the bill by factor 4', 'Tool-Design ändert die Rechnung um Faktor 4'), { fill: C, size: 7 })}`,

  'hosted-mcp-servers-data-access': (l) => `
    ${box(14, 30, 92, 50)}${t(60, 48, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(60, 61, 'hosted MCP', { size: 7, anchor: 'middle' })}${t(60, 73, 'sobject-reads', { size: 7, anchor: 'middle' })}
    ${box(214, 30, 92, 50)}${t(260, 48, l('AI CLIENT', 'KI-CLIENT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(260, 61, 'Claude · ChatGPT', { size: 7, anchor: 'middle' })}${t(260, 73, l('own model', 'eigenes Modell'), { size: 7, anchor: 'middle' })}
    ${arrow(106, 55, 214, C)}
    <path d="M160 22V92" stroke="${G}" stroke-width="1" stroke-dasharray="3 3"/>
    ${t(166, 18, l('Trust Layer ends here', 'hier endet der Trust Layer'), { fill: C, size: 7 })}
    ${t(18, 18, l('named user, OAuth + PKCE', 'Named User, OAuth + PKCE'), { size: 7 })}
    ${check(18, 100, G)}${t(32, 104, l('rights of the user', 'Rechte des Benutzers'), { size: 7 })}
    ${check(18, 114, G)}${t(32, 118, l('logged per person', 'Log pro Person'), { size: 7 })}
    ${cross(222, 102)}${t(232, 106, l('no masking', 'keine Maskierung'), { size: 7 })}
    ${t(218, 120, l('AI contract governs', 'KI-Vertrag zählt'), { fill: C, size: 7 })}
    <path d="M18 130H302" stroke="${L}"/>
    ${t(18, 146, l('start: sobject-reads in a sandbox', 'Start: sobject-reads in der Sandbox'), { fill: D, size: 7.5 })}
    ${t(18, 157, l('no service accounts, no M2M', 'keine Service Accounts, kein M2M'), { size: 7 })}`,

  'measuring-ai-benefit-salesforce-projects': (l) => `
    ${t(18, 18, l('CYCLE TIME PER STORY (SCENARIO)', 'DURCHLAUFZEIT PRO STORY (SZENARIO)'), { fill: D, size: 7 })}
    ${t(18, 40, l('before', 'vorher'), { size: 7 })}
    <rect x="58" y="31" width="48" height="12" fill="${D}"/><rect x="106" y="31" width="36" height="12" fill="#fff" stroke="${G}"/><rect x="142" y="31" width="72" height="12" fill="#fff" stroke="${G}"/><rect x="214" y="31" width="60" height="12" fill="#fff" stroke="${G}"/>
    ${t(280, 40, l('18 d', '18 T'), { fill: D, size: 7.5 })}
    ${t(18, 62, l('with AI', 'mit KI'), { size: 7 })}
    <rect x="58" y="53" width="30" height="12" fill="${C}"/><rect x="88" y="53" width="48" height="12" fill="#fff" stroke="${G}"/><rect x="136" y="53" width="72" height="12" fill="#fff" stroke="${G}"/><rect x="208" y="53" width="60" height="12" fill="#fff" stroke="${G}"/>
    ${t(274, 62, l('17.5 d', '17,5 T'), { fill: C, size: 7.5 })}
    ${t(58, 78, l('build', 'Bauen'), { size: 7 })}${t(100, 78, 'review', { size: 7 })}${t(160, 78, 'UAT', { size: 7 })}${t(222, 78, l('test, release', 'Test, Release'), { size: 7 })}
    <path d="M18 92H302" stroke="${L}"/>
    ${t(18, 108, 'METR 2025', { fill: D, size: 7.5 })}${t(84, 108, l('felt +20 %, measured 19 % slower', 'gefühlt +20 %, gemessen 19 % langsamer'), { size: 7 })}
    ${t(18, 124, 'McKinsey 2026', { fill: D, size: 7.5 })}${t(84, 124, l('11.8 % time saved, 6.2 % less rework', '11,8 % Zeit, 6,2 % weniger Nacharbeit'), { size: 7 })}
    ${tag(18, 134, 120, l('baseline first', 'Basislinie zuerst'))}`,

  'partners-ai-coding-sow-rules': (l) => `
    ${box(18, 16, 150, 128)}${t(28, 32, l('SOW ANNEX: AI CODING', 'SOW-ANLAGE: KI-CODING'), { fill: D, size: 7.5 })}
    ${[l('tools + model routes', 'Tools + Modellwege'), l('commercial accounts', 'kommerzielle Konten'), l('no prod data in context', 'keine Produktivdaten'), l('no prod access', 'kein Prod-Zugriff'), l('review every line', 'Review jeder Zeile'), l('rights + liability', 'Rechte + Haftung')]
      .map((s, i) => check(28, 44 + i * 16, i === 3 ? C : G) + t(42, 50 + i * 16, s, { size: 7, fill: i === 3 ? C : G })).join('')}
    ${box(200, 20, 102, 28)}${t(251, 38, l('CODING AGENT', 'CODING-AGENT'), { fill: D, size: 7.5, anchor: 'middle' })}
    <path d="M251 48V68M223 68H279M223 68V92" fill="none" stroke="${G}" stroke-width="1.2"/>
    <path d="M279 68V92" stroke="${C}" stroke-width="1.2" stroke-dasharray="4 3"/>${cross(279, 80)}
    ${box(198, 92, 50, 24)}${t(223, 107, 'sandbox', { size: 7, anchor: 'middle' })}${check(219, 122, G)}
    ${box(254, 92, 50, 24, C)}${t(279, 107, 'prod', { fill: C, size: 7, anchor: 'middle' })}
    ${t(254, 132, l('pipeline only', 'nur Pipeline'), { fill: C, size: 7 })}
    ${t(198, 150, l('not legal advice', 'keine Rechtsberatung'), { size: 7 })}`,

  'quality-gates-ai-code-pipeline': (l) => `
    ${box(16, 52, 56, 40)}${t(44, 69, l('AI CODE', 'KI-CODE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(44, 82, 'pull request', { size: 7, anchor: 'middle' })}
    ${arrow(72, 72, 94)}
    ${box(94, 16, 134, 112)}${t(104, 32, l('BLOCKING GATES', 'SPERRENDE GATES'), { fill: D, size: 7.5 })}
    ${[l('Code Analyzer, High', 'Code Analyzer ab High'), l('API version check', 'API-Version prüfen'), l('validate + Apex tests', 'Validierung + Tests'), l('merge block, no bypass', 'Merge-Sperre')].map((s, i) => check(104, 44 + i * 20, G) + t(118, 50 + i * 20, s, { size: 7 })).join('')}
    ${arrow(228, 72, 250, C)}
    ${box(250, 52, 56, 40, C)}${t(278, 76, 'MERGE', { fill: C, size: 7.5, anchor: 'middle' })}
    <path d="M16 138H306" stroke="${L}"/>
    ${t(16, 152, l('ApexGuru advisory · quick deploy valid 10 days', 'ApexGuru beratend · Quick Deploy 10 Tage gültig'), { fill: D, size: 7.5 })}`,

  'reviewing-ai-generated-salesforce-code': (l) => `
    ${box(18, 52, 58, 40)}${t(47, 69, l('AI DIFF', 'KI-DIFF'), { fill: D, size: 7.5, anchor: 'middle' })}${t(47, 82, l('~400 lines', '~400 Zeilen'), { size: 7, anchor: 'middle' })}
    ${arrow(76, 72, 100)}
    ${box(100, 18, 96, 108)}${t(110, 34, 'PIPELINE', { fill: D, size: 7.5 })}
    ${[l('SOQL in loop', 'SOQL in Schleife'), l('no sharing decl.', 'kein Sharing'), l('CRUD check', 'CRUD-Prüfung'), l('validate deploy', 'Validierung')].map((s, i) => check(110, 46 + i * 18, G) + t(124, 52 + i * 18, s, { size: 7 })).join('')}
    ${arrow(196, 72, 220, C)}
    ${box(220, 18, 86, 108, C)}${t(230, 34, l('CLIENT REVIEW', 'KUNDENREVIEW'), { fill: C, size: 7.5 })}
    ${[l('tests', 'Tests'), l('data access', 'Datenzugriff'), l('right fields', 'richtige Felder'), l('scope', 'Umfang'), l('business rule', 'Geschäftsregel')].map((s, i) => dot(234, 49 + i * 15, C, 2.5) + t(242, 52 + i * 15, s, { size: 7 })).join('')}
    <path d="M18 136H306" stroke="${L}"/>
    ${t(18, 150, l('Veracode 2026: 56 % pass rate, Java 30 %', 'Veracode 2026: 56 % Passrate, Java 30 %'), { fill: D, size: 7.5 })}`,

  'salesforce-dx-mcp-server-end-of-life': (l) => `
    ${box(14, 30, 100, 62)}${t(64, 46, 'DX MCP SERVER', { fill: D, size: 7.5, anchor: 'middle' })}${t(64, 59, l('local, @salesforce/mcp', 'lokal, @salesforce/mcp'), { size: 6.5, anchor: 'middle' })}
    ${t(64, 72, l('pin 0.30.15', '0.30.15 pinnen'), { fill: C, size: 7, anchor: 'middle' })}${t(64, 84, l('not @latest', 'nicht @latest'), { size: 6.5, anchor: 'middle' })}
    ${tag(14, 8, 100, 'EOL 02.11.2026')}
    ${arrow(114, 61, 150, C, true)}
    ${[['sf CLI + sf-skills', l('deploy, tests', 'Deploy, Tests')], [l('Claude Code plugin', 'Claude-Code-Plugin'), 'Apex, SOQL'], ['Hosted MCP', 'sobject-reads']]
      .map(([a, b], i) => box(154, 18 + i * 30, 152, 24, i === 2 ? C : G) + t(162, 33 + i * 30, String(a), { fill: D, size: 7 }) + t(298, 33 + i * 30, String(b), { size: 6.5, anchor: 'end' })).join('')}
    <path d="M14 116H306" stroke="${L}"/>
    ${cross(22, 132)}${t(32, 135, 'ALLOW_ALL_ORGS', { size: 7 })}${cross(122, 132)}${t(132, 135, l('production', 'Produktion'), { size: 7 })}
    ${check(208, 129)}${t(220, 135, l('sandbox aliases', 'Sandbox-Aliase'), { fill: C, size: 7 })}
    ${t(14, 152, l('1. inventory  2. pin  3. lock orgs  4. migrate', '1. Inventur  2. Pinnen  3. Orgs festlegen  4. Umstellen'), { size: 7 })}`,

  'salesforce-editions-core-advanced-max': (l) => `
    ${t(18, 18, l('EDITION / USER / MONTH', 'EDITION / NUTZER / MONAT'), { fill: D, size: 7 })}${t(302, 18, l('FLEX CREDITS / ORG / YEAR', 'FLEX CREDITS / ORG / JAHR'), { fill: D, size: 7, anchor: 'end' })}
    ${[['Core', l('$195', '195 $'), '500K', 50, true], ['Advanced', l('$395', '395 $'), '1M', 100, false], ['Max', l('$550', '550 $'), l('2.75M', '2,75M'), 275, false]]
      .map(([n, p, c, w, hi], i) => box(18, 28 + i * 26, 92, 20, hi ? C : G) + t(26, 41 + i * 26, String(n), { fill: D, size: 7.5 }) + t(102, 41 + i * 26, String(p), { size: 7.5, anchor: 'end' })
        + `<rect x="${120}" y="${33 + i * 26}" width="${(Number(w) / 275) * 140}" height="10" rx="2" fill="${hi ? C : L}"/>` + t(302, 41 + i * 26, String(c), { fill: hi ? C : G, size: 7.5, anchor: 'end' })).join('')}
    <path d="M18 112H302" stroke="${L}"/>
    ${t(18, 128, l('1 action = 20 credits: Core pool = 25,000 actions', '1 Aktion = 20 Credits: Core-Pool = 25.000 Aktionen'), { fill: D, size: 7.5 })}
    ${t(18, 144, l('Core to Advanced, 200 users: +$480K for $2.5K credits', 'Core zu Advanced, 200 Nutzer: +480K $ für 2,5K $ Credits'), { size: 7 })}`,

  'smaller-teams-ai-native-delivery': (l) => `
    ${t(18, 18, l('TODAY (SCENARIO)', 'HEUTE (SZENARIO)'), { fill: D, size: 7 })}
    ${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => dot(30 + c * 18, 36 + r * 16, G, 4)).join('')).join('')}
    ${t(18, 112, l('12 partner people', '12 beim Partner'), { size: 7 })}
    ${arrow(84, 60, 116, C)}
    ${t(124, 18, l('3 PODS: 7 PARTNER PEOPLE', '3 PODS: 7 BEIM PARTNER'), { fill: D, size: 7 })}
    ${[0, 1, 2].map((i) => box(124 + i * 60, 26, 54, 70, i === 0 ? C : G) + dot(140 + i * 60, 42, G, 4) + dot(160 + i * 60, 42, G, 4) + dot(150 + i * 60, 62, C, 4)
      + t(151 + i * 60, 80, l('domain', 'Fach-'), { fill: C, size: 7, anchor: 'middle' }) + t(151 + i * 60, 90, l('lead', 'experte'), { fill: C, size: 7, anchor: 'middle' })).join('')}
    ${t(124, 112, l('architect + builder-reviewer', 'Architekt + Builder-Reviewer'), { size: 7 })}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 140, l('median squad: about 10 to 7 (McKinsey)', 'Median-Team: etwa 10 auf 7 (McKinsey)'), { fill: D, size: 7.5 })}
    ${t(18, 153, l('one named owner per artifact', 'ein benannter Owner pro Artefakt'), { size: 7 })}`,

  'testing-agentforce-agents': (l) => `
    ${t(18, 18, l('TEST CASE (YAML)', 'TESTFALL (YAML)'), { fill: D, size: 7 })}
    ${box(18, 26, 112, 70)}
    ${[l('utterance', 'Anfrage'), 'expectedTopic', 'expectedActions', 'expectedOutcome'].map((s, i) => t(28, 42 + i * 14, s, { fill: i === 3 ? C : G, size: 7 })).join('')}
    ${t(28, 108, l('outcome: LLM judge', 'Ergebnis: LLM-Prüfer'), { fill: C, size: 7 })}
    ${arrow(130, 61, 160, C)}
    ${t(166, 18, l('GO-LIVE GATES', 'GO-LIVE-SCHWELLEN'), { fill: D, size: 7 })}
    ${[[l('rules', 'Regeln'), '100 %', false], [l('guardrails', 'Schutzfälle'), '100 %', false], [l('answers, 3 runs', 'Antworten, 3 Läufe'), '90 %', true]]
      .map(([a, b, hi], i) => box(166, 26 + i * 26, 136, 20, hi ? C : G) + t(174, 39 + i * 26, String(a), { size: 7 }) + t(294, 39 + i * 26, String(b), { fill: hi ? C : D, size: 7.5, anchor: 'end' })).join('')}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 140, l('sandbox: 16 credits per action', 'Sandbox: 16 Credits pro Aktion'), { fill: D, size: 7.5 })}
    ${t(18, 153, l('60 cases x 3 actions x 3 runs = about $43', '60 Fälle x 3 Aktionen x 3 Läufe = rund 43 $'), { size: 7 })}`,

  'vibes-claude-code-copilot-comparison': (l) => `
    ${t(18, 18, l('CODING AGENT', 'CODING-AGENT'), { fill: D, size: 7 })}${t(302, 18, l('EU PROCESSING', 'EU-VERARBEITUNG'), { fill: D, size: 7, anchor: 'end' })}
    ${[['Agentforce Vibes', l('not in EU Op. Zone', 'nicht in EU Op. Zone'), false, false], ['Claude Code, API', l('us / global only', 'nur us / global'), false, false], ['Claude Code, Bedrock', l('EU region, +10 %', 'EU-Region, +10 %'), true, false], ['GitHub Copilot', l('EU since 04/2026', 'EU seit 04/2026'), true, true], ['Codex', l('Enterprise only', 'nur Enterprise'), true, false]]
      .map(([a, b, ok, hi], i) => box(18, 26 + i * 22, 110, 17, hi ? C : G) + t(26, 37.5 + i * 22, String(a), { fill: hi ? C : D, size: 7 }) + (ok ? check(140, 32 + i * 22, hi ? C : G) : cross(144, 34.5 + i * 22)) + t(302, 37.5 + i * 22, String(b), { fill: hi ? C : G, size: 7, anchor: 'end' })).join('')}
    <path d="M18 140H302" stroke="${L}"/>
    ${t(18, 154, l('decide by contract, residency, cost, governance', 'Entscheidung: Vertrag, Residenz, Kosten, Governance'), { size: 7 })}`,

  'warranty-adjudication-agent-winter-27': (l) => `
    ${t(18, 18, l('WHO DECIDES WHAT', 'WER ENTSCHEIDET WAS'), { fill: D, size: 7 })}${tag(224, 6, 82, 'GA 12.10.2026')}
    ${box(14, 60, 62, 40)}${t(45, 77, l('CLAIM', 'ANSPRUCH'), { fill: D, size: 7.5, anchor: 'middle' })}${t(45, 90, l('dealer', 'Händler'), { size: 6.8, anchor: 'middle' })}
    <path d="M76 80C90 80 90 47 104 47M76 80H104M76 80C90 80 90 115 104 115" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(104, 34, 112, 26)}${t(160, 50, l('rules: coverage, dates', 'Regeln: Deckung, Fristen'), { size: 7, anchor: 'middle' })}
    ${box(104, 68, 112, 26, C)}${t(160, 84, l('agent: text, fraud flag', 'Agent: Text, Verdacht'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(104, 102, 112, 26)}${t(160, 118, l('human: limit, goodwill', 'Mensch: Grenze, Kulanz'), { size: 7, anchor: 'middle' })}
    <path d="M160 94V101" stroke="${C}" stroke-width="1.3" stroke-dasharray="2 2"/>
    <path d="M216 47C232 47 232 80 245 80M216 115C232 115 232 80 245 80" fill="none" stroke="${G}" stroke-width="1.2"/><path d="M241 76.5l5 3.5-5 3.5" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(246, 60, 60, 40)}${t(276, 77, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(276, 90, l('credit note', 'Gutschrift'), { size: 6.8, anchor: 'middle' })}
    ${t(18, 150, l('first: serial no. + start date per asset', 'zuerst: Seriennr. + Garantiebeginn je Anlage'), { size: 7 })}`,

  'legacy-erp-without-api-agents': (l) => `
    ${box(18, 26, 62, 86)}${t(49, 66, 'AGENT', { fill: D, anchor: 'middle' })}${t(49, 80, 'Agentforce', { size: 7, anchor: 'middle' })}
    ${box(240, 26, 62, 86)}${t(271, 66, l('OLD ERP', 'ALTES ERP'), { fill: D, anchor: 'middle' })}${t(271, 80, l('no API', 'ohne API'), { size: 7, anchor: 'middle' })}
    ${t(18, 18, l('3 DETOURS', '3 UMWEGE'), { fill: D, size: 7 })}
    ${box(106, 26, 108, 22, C)}${t(160, 40, l('replica + read API', 'Replik + Lese-API'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(106, 58, 108, 22)}${t(160, 72, l('IDP + RPA bot', 'IDP + RPA-Bot'), { size: 7, anchor: 'middle' })}
    ${box(106, 90, 108, 22)}${t(160, 104, 'Systems Integration Agent', { size: 7, anchor: 'middle' })}
    ${arrow(80, 37, 106, C)}${arrow(214, 37, 240, C)}${arrow(80, 69, 106)}${arrow(214, 69, 240)}${arrow(80, 101, 106)}${arrow(214, 101, 240)}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 140, l('IDP below 80 % confidence: human review', 'IDP unter 80 % Konfidenz: manuelle Prüfung'), { fill: D, size: 7 })}
    ${t(18, 154, l('credit limit + prices stay in the ERP', 'Kreditlimit + Preise bleiben im ERP'), { size: 7 })}`,

  'mcp-explained-salesforce-it-leads': (l) => `
    ${box(18, 34, 84, 46)}${t(60, 54, l('AI CLIENT', 'KI-CLIENT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(60, 68, 'Claude · ChatGPT', { size: 7, anchor: 'middle' })}
    ${arrow(102, 57, 150, C)}${t(126, 48, 'MCP', { fill: C, size: 7.5, anchor: 'middle' })}
    ${box(150, 34, 74, 46, C)}${t(187, 54, 'HOSTED MCP', { fill: D, size: 7, anchor: 'middle' })}${t(187, 68, 'sobject-reads', { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(224, 57, 254)}
    ${box(254, 34, 50, 46)}${t(279, 54, 'ORG', { fill: D, size: 7.5, anchor: 'middle' })}${t(279, 68, l('as user', 'als User'), { size: 7, anchor: 'middle' })}
    ${t(18, 20, l('PROTOCOL ENFORCES NOTHING', 'PROTOKOLL SETZT NICHTS DURCH'), { fill: D, size: 7 })}${tag(210, 8, 94, l('off by default', 'standardmäßig aus'))}
    <path d="M18 98H304" stroke="${L}"/>
    ${t(18, 112, l('4 DECISIONS', '4 ENTSCHEIDUNGEN'), { fill: D, size: 7 })}
    ${[l('servers', 'Server'), l('users', 'Benutzer'), l('data', 'Daten'), l('clients', 'Clients')].map((s, i) => check(18 + i * 72, 126, i === 0 ? C : G) + t(32 + i * 72, 132, s, { size: 7.5 })).join('')}
    ${t(18, 152, l('no service accounts, every call in the audit trail', 'keine Service Accounts, jeder Aufruf im Audit'), { size: 7 })}`,

  'prompt-injection-dealer-portals': (l) => `
    ${t(18, 18, l('UNTRUSTED TEXT', 'FREMDER TEXT'), { fill: D, size: 7 })}
    ${['Web-to-Lead', 'Email-to-Case', l('dealer portal', 'Händlerportal'), l('warranty claim', 'Garantieantrag')].map((s, i) => box(18, 26 + i * 22, 84, 17) + t(26, 37 + i * 22, s, { size: 7 })).join('')}
    ${arrow(102, 66, 130)}
    ${box(130, 44, 64, 44)}${t(162, 63, 'AGENT', { fill: D, size: 8, anchor: 'middle' })}${t(162, 77, 'Agentforce', { size: 7, anchor: 'middle' })}
    ${t(207, 18, 'LETHAL TRIFECTA', { fill: D, size: 7 })}
    ${dot(211, 34)}${t(220, 37, l('private data: narrow', 'private Daten: eng'), { size: 7 })}
    ${dot(211, 54)}${t(220, 57, l('untrusted text', 'fremder Text'), { size: 7 })}
    ${cross(211, 74)}${t(220, 77, l('way out: closed', 'Weg nach außen: zu'), { fill: C, size: 7 })}
    <path d="M194 66H202" stroke="${G}" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M18 120H302" stroke="${L}"/>
    ${t(18, 136, l('ForcedLeak: CVSS 9.4, reported 07/2025', 'ForcedLeak: CVSS 9,4, gemeldet 07/2025'), { fill: D, size: 7.5 })}
    ${t(18, 150, l('Trusted URLs enforced since 8 Sep 2025', 'Trusted URLs erzwungen seit 8.9.2025'), { size: 7 })}`,

  'ai-coding-works-council-gdpr': (l) => `
    ${box(18, 16, 100, 58)}${t(68, 32, l('CODING AGENT', 'CODING-AGENT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(68, 48, l('lines per person', 'Zeilen pro Person'), { size: 7, anchor: 'middle' })}${t(68, 62, l('PRs per person', 'PRs pro Person'), { size: 7, anchor: 'middle' })}
    ${arrow(118, 45, 160, C)}
    ${box(160, 16, 142, 58, C)}${t(231, 32, l('§ 87 (1) no. 6 BetrVG', '§ 87 Abs. 1 Nr. 6 BetrVG'), { fill: C, size: 7.5, anchor: 'middle' })}${t(231, 48, l('works agreement first', 'erst Betriebsvereinbarung'), { size: 7, anchor: 'middle' })}${t(231, 62, l('team level metrics only', 'nur Teamkennzahlen'), { size: 7, anchor: 'middle' })}
    <path d="M18 88H302" stroke="${L}"/>
    ${t(18, 102, l('INFERENCE IN THE EU?', 'INFERENZ IN DER EU?'), { fill: D, size: 7 })}
    ${cross(24, 116)}${t(34, 119, l('Anthropic API: us or global', 'Anthropic-API: us oder global'), { size: 7 })}
    ${check(166, 113, G)}${t(178, 119, 'Bedrock eu-*', { size: 7 })}
    ${check(18, 129, G)}${t(30, 135, l('Copilot EU: +10 % credits', 'Copilot EU: +10 % Credits'), { size: 7 })}
    ${check(166, 129, G)}${t(178, 135, l('OpenAI EU projects', 'OpenAI EU-Projekte'), { size: 7 })}
    ${t(18, 152, l('not legal advice', 'keine Rechtsberatung'), { size: 7 })}`,

  'oauth-connected-apps-ai-lessons': (l) => `
    ${t(18, 18, l('SALESLOFT DRIFT, AUG 2025', 'SALESLOFT DRIFT, AUG. 2025'), { fill: D, size: 7 })}${t(232, 18, l('CONTROLS', 'KONTROLLEN'), { fill: D, size: 7 })}
    ${box(18, 30, 80, 42)}${t(58, 48, l('AI APP', 'KI-APP'), { fill: D, anchor: 'middle' })}${t(58, 62, l('vendor cloud', 'Anbieter-Cloud'), { size: 7, anchor: 'middle' })}
    ${arrow(98, 51, 146, C)}${t(122, 44, 'refresh token', { fill: C, size: 7, anchor: 'middle' })}
    ${box(146, 30, 74, 42)}${t(183, 48, 'SALESFORCE', { fill: D, anchor: 'middle' })}${t(183, 62, 'org', { size: 7, anchor: 'middle' })}
    ${t(18, 99, l('stolen token', 'gestohlenes Token'), { size: 7 })}
    <path d="M94 96H183V76" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${cross(140, 96)}${t(140, 112, 'Tor · cloud IPs', { size: 7, anchor: 'middle' })}
    ${[l('own API user', 'eigener User'), l('no full scope', 'kein Scope full'), l('token expiry', 'Token-Ablauf'), l('IP filter', 'IP-Filter'), l('logs > 1 day', 'Logs > 1 Tag')].map((s, i) => check(232, 30 + i * 16, i === 0 ? C : G) + t(244, 35 + i * 16, s, { size: 7 })).join('')}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 138, l('exported: Cases, Accounts, Users, Opportunities', 'exportiert: Cases, Accounts, User, Opportunities'), { fill: D, size: 7.5 })}
    ${t(18, 152, l('not a Salesforce vulnerability', 'keine Schwachstelle in Salesforce'), { size: 7 })}`,

  'vibe-coding-prototype-not-production': (l) => `
    ${box(16, 22, 124, 74)}${t(26, 38, l('PROTOTYPE', 'PROTOTYP'), { fill: D, size: 7.5 })}
    ${t(26, 54, 'Developer Edition', { size: 7 })}${t(26, 68, l('scratch org, max. 30 days', 'Scratch Org, max. 30 Tage'), { size: 7 })}${t(26, 82, l('dummy data, no SAP', 'Testdaten, kein SAP'), { size: 7 })}
    ${arrow(140, 59, 180, C)}${t(160, 50, 'Specs', { fill: C, size: 7, anchor: 'middle' })}${t(160, 74, l('no code', 'kein Code'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(180, 22, 124, 74, C)}${t(190, 38, l('PRODUCTION', 'PRODUKTION'), { fill: C, size: 7.5 })}
    ${[l('approved plan', 'freigegebener Plan'), l('human review', 'menschliches Review'), l('tests + pipeline', 'Tests + Pipeline')].map((s, i) => check(190, 48 + i * 14, G) + t(204, 54 + i * 14, s, { size: 7 })).join('')}
    <path d="M16 118H304" stroke="${L}"/>
    ${t(16, 134, l('vibe coding: nobody reads the code', 'Vibe Coding: niemand liest den Code'), { fill: D, size: 7.5 })}
    ${t(16, 150, l('Developer Edition: 110 requests, 1 month', 'Developer Edition: 110 Anfragen, 1 Monat'), { size: 7 })}`,
};

export const hasDrawing = (key: string) => key in drawings;
export function cardDrawing(key: string, lang: Lang): string {
  return drawings[key]((en, de) => (lang === 'de' ? de : en));
}
