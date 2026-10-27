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
};

export const hasDrawing = (key: string) => key in drawings;
export function cardDrawing(key: string, lang: Lang): string {
  return drawings[key]((en, de) => (lang === 'de' ? de : en));
}
