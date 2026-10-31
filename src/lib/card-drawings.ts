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
  'cpq-to-revenue-cloud-migration-plan': (l) => `
    ${t(18, 20, l('3 PHASES · TYPICALLY 3 TO 6 MONTHS', '3 PHASEN · TYPISCH 3 BIS 6 MONATE'), { fill: D, size: 7 })}
    ${[l('Prepare', 'Vorbereiten'), l('Strategy', 'Strategie'), l('Execute', 'Umsetzen')].map((s, i) => box(18 + i * 100, 30, 84, 30, i === 2 ? C : G) + t(60 + i * 100, 49, (i + 1) + ' · ' + s, { fill: i === 2 ? C : G, size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(102, 45, 118)}${arrow(202, 45, 218, C)}
    <path d="M18 74H302" stroke="${L}"/>
    ${t(18, 90, l('DATA ORDER', 'DATENREIHENFOLGE'), { fill: D, size: 7 })}
    ${[l('Catalog', 'Katalog'), l('Prices', 'Preise'), 'Assets', 'Billing'].map((s, i) => box(18 + i * 76, 98, 60, 22) + t(48 + i * 76, 112, s, { size: 7, anchor: 'middle' })).join('')}
    ${arrow(78, 109, 94)}${arrow(154, 109, 170)}${arrow(230, 109, 246)}
    ${tag(18, 132, 150, l('CPQ keeps running in the org', 'CPQ läuft in der Org weiter'))}${t(178, 145, l('no end-of-life date', 'kein End-of-Life-Datum'), { size: 7 })}`,

  'revenue-cloud-configuration-deployment': (l) => `
    ${t(18, 20, l('NO BUILT-IN TOOL · ORDER PER AREA', 'KEIN EIGENES TOOL · REIHENFOLGE JE BEREICH'), { fill: D, size: 7 })}
    ${[l('1 Metadata', '1 Metadaten'), l('2 Data', '2 Daten'), l('3 Manual', '3 Manuell')].map((s, i) => box(18 + i * 100, 30, 84, 28, i === 2 ? C : G) + t(60 + i * 100, 48, s, { fill: i === 2 ? C : G, size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(102, 44, 118)}${arrow(202, 44, 218, C)}
    ${t(18, 76, 'decision tables', { size: 7 })}${t(18, 88, 'pricing recipes', { size: 7 })}${t(18, 100, l('custom context defs', 'eigene Context Defs'), { size: 7 })}
    ${t(118, 76, l('attributes, classes', 'Attribute, Klassen'), { size: 7 })}${t(118, 88, l('selling models', 'Verkaufsmodelle'), { size: 7 })}${t(118, 100, l('price book entries', 'Preisbucheinträge'), { size: 7 })}
    ${check(218, 70)}${t(230, 76, l('refresh tables', 'Tables aktualisieren'), { size: 7 })}${check(218, 82)}${t(230, 88, l('sync pricing', 'Preise synchron.'), { size: 7 })}${check(218, 94)}${t(230, 100, l('rebuild index', 'Index neu bauen'), { size: 7 })}
    <path d="M18 114H302" stroke="${L}"/>
    ${cross(24, 132)}${t(36, 135, l('SAP products and list prices: integration, no deployment', 'SAP-Produkte und Listenpreise: Schnittstelle, kein Deployment'), { size: 7 })}`,

  'salesforce-billing-to-revenue-cloud-billing': (l) => `
    ${box(18, 26, 110, 70)}${t(73, 42, 'SALESFORCE BILLING', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(28, 58, l('package, namespace blng', 'Paket, Namespace blng'), { size: 7 })}${t(28, 72, l('59 custom objects', '59 eigene Objekte'), { size: 7 })}${t(28, 86, 'blng__Invoice__c', { size: 7 })}
    ${arrow(128, 61, 192, C)}${t(160, 53, l('period end', 'Periodenende'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(192, 26, 110, 70, C)}${t(247, 42, 'REVENUE CLOUD BILLING', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(202, 58, l('standard objects', 'Standardobjekte'), { size: 7 })}${t(202, 72, 'Invoice · CreditMemo', { size: 7 })}${t(202, 86, 'AccountingPeriod', { size: 7 })}
    ${check(18, 108)}${t(32, 115, l('open invoices: finish in package', 'offene Rechnungen: im Paket abschließen'), { size: 7 })}
    ${check(18, 122)}${t(32, 129, l('open balances: move', 'offene Salden: übernehmen'), { size: 7 })}
    ${check(18, 136)}${t(32, 143, l('closed history: keep readable', 'abgeschlossene Historie: lesbar halten'), { size: 7 })}
    ${tag(200, 124, 102, l('finance signs off', 'Finanzen geben frei'))}`,

  'field-service-kpis-after-go-live': (l) => `
    ${t(20, 20, l('REGION 1: BASELINE VS MONTH 3 (ASSUMED)', 'REGION 1: AUSGANG VS. MONAT 3 (ANNAHME)'), { fill: D, size: 7.5 })}
    <path d="M20 116H300" stroke="${G}" stroke-width="1"/>
    ${[[l('jobs/day', 'Einsätze/Tag'), 2.1, 2.4, 28, ''], [l('travel', 'Fahrzeit'), 38, 33, 1.6, ' %'], [l('first-time fix', 'Erstlösung'), 71, 72, 0.9, ' %'], [l('response met', 'Reaktion ok'), 84, 88, 0.9, ' %']].map(([s, a, b, k, u], i) => {
      const x = 34 + i * 70, ha = Number(a) * Number(k), hb = Number(b) * Number(k);
      const fa = l(String(a), String(a).replace('.', ',')) + u, fb = l(String(b), String(b).replace('.', ',')) + u;
      return `<rect x="${x}" y="${116 - ha}" width="18" height="${ha}" rx="2" fill="#fff" stroke="${G}" stroke-width="1.3"/><rect x="${x + 22}" y="${116 - hb}" width="18" height="${hb}" rx="2" fill="#fff" stroke="${C}" stroke-width="1.3"/>` + t(x + 9, 111 - ha, fa, { size: 6, anchor: 'middle' }) + t(x + 31, 111 - hb, fb, { fill: C, size: 6, anchor: 'middle' }) + t(x + 20, 128, String(s), { size: 7, anchor: 'middle' });
    }).join('')}
    <rect x="20" y="140" width="8" height="8" fill="#fff" stroke="${G}"/>${t(32, 147, l('baseline', 'Ausgangswert'), { size: 7 })}
    <rect x="100" y="140" width="8" height="8" fill="#fff" stroke="${C}"/>${t(112, 147, l('month 3', 'Monat 3'), { fill: C, size: 7 })}
    ${t(300, 147, l('FTF: 14 days, same asset', 'Erstlösung: 14 Tage, gleiches Asset'), { size: 6.5, anchor: 'end' })}`,

  'cpq-vs-revenue-cloud-differences': (l) => `
    ${box(18, 22, 114, 108)}${t(75, 38, 'CPQ · BILLING', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('SBQQ · blng packages', 'Pakete SBQQ · blng'), l('product rules', 'Produktregeln'), l('price rules + QCP', 'Preisregeln + QCP'), l('subscriptions', 'Subscriptions'), l('end of sale', 'Verkaufsende')].map((s, i) => t(28, 56 + i * 16, s, { size: 7 })).join('')}
    ${arrow(132, 76, 188, C)}${t(160, 68, l('redesign', 'Neuentwurf'), { fill: C, size: 7, anchor: 'middle' })}${t(160, 90, l('no upgrade', 'kein Upgrade'), { size: 6.5, anchor: 'middle' })}
    ${box(188, 22, 114, 108, C)}${t(245, 38, 'REVENUE CLOUD', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('standard objects', 'Standardobjekte'), l('constraint engine, CML', 'Constraint-Engine, CML'), l('pricing procedures', 'Preisprozeduren'), l('assets, state periods', 'Assets, Zeiträume'), l('actively developed', 'wird weiterentwickelt')].map((s, i) => t(198, 56 + i * 16, s, { size: 7 })).join('')}
    ${t(18, 150, l('Help: data models "differ significantly"', 'Hilfe: Datenmodelle „differ significantly“'), { size: 7 })}`,

  'e-invoicing-germany-revenue-cloud': (l) => `
    <path d="M30 44H290" stroke="${G}" stroke-width="1.2"/>
    ${dot(40, 44)}${t(40, 30, '2025', { fill: D, size: 7.5, anchor: 'middle' })}${t(40, 60, l('receive', 'empfangen'), { size: 7, anchor: 'middle' })}
    ${dot(160, 44, C, 4.5)}${t(160, 30, '2027', { fill: C, size: 7.5, anchor: 'middle' })}${t(160, 60, l('issue > €800,000', 'ausstellen > 800.000 €'), { fill: C, size: 7, anchor: 'middle' })}
    ${dot(270, 44)}${t(270, 30, '2028', { fill: D, size: 7.5, anchor: 'middle' })}${t(270, 60, l('all B2B', 'alle B2B'), { size: 7, anchor: 'middle' })}
    ${box(18, 76, 136, 50)}${t(28, 92, 'EN 16931', { fill: D, size: 7.5 })}${check(28, 101)}${t(40, 106, 'XRechnung', { size: 7 })}${check(28, 113)}${t(40, 118, 'ZUGFeRD 2.0.1+', { size: 7 })}
    ${box(166, 76, 136, 50)}${t(176, 92, l('PDF BY EMAIL', 'PDF PER E-MAIL'), { fill: D, size: 7.5 })}${cross(180, 108)}${t(190, 111, l('no e-invoice', 'keine E-Rechnung'), { size: 7 })}
    ${t(18, 146, l('Revenue Cloud Billing: PDFs documented, EN 16931 not found', 'Revenue Cloud Billing: PDFs dokumentiert, EN 16931 nicht gefunden'), { size: 7 })}`,

  'revenue-cloud-billing-costs-billing-events': (l) => `
    ${t(18, 20, l('RATE SHEET FEB 2026', 'RATE SHEET FEB. 2026'), { fill: D, size: 7 })}
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${18 + i * 30}" y="28" width="26" height="22" rx="3" fill="#fff" stroke="${i === 4 ? C : G}" stroke-width="1.2"/>` + t(31 + i * 30, 42.5, '$50', { fill: i === 4 ? C : G, size: 6.5, anchor: 'middle' })).join('')}
    ${arrow(172, 39, 200, C)}${t(206, 42.5, l('1 billing event each', 'je 1 Billing Event'), { fill: C, size: 7 })}
    ${t(18, 68, l('invoice subtotal, no tax, with shipping', 'Zwischensumme ohne Steuer, mit Versand'), { size: 7 })}
    ${box(18, 78, 284, 44)}${t(28, 94, l('EXAMPLE (ASSUMED, 1.15 $/€)', 'BEISPIEL (ANNAHME, 1,15 $/€)'), { fill: D, size: 6.5 })}
    ${t(28, 110, l('€18M subscriptions', '18 Mio. € Abos'), { size: 7 })}${arrow(112, 107, 136)}${t(142, 110, l('414,000 events/year', '414.000 Events/Jahr'), { fill: C, size: 7 })}
    ${cross(24, 141)}${t(36, 144, l('no rollover', 'kein Übertrag'), { size: 7 })}${t(130, 144, l('price per event: on request', 'Preis pro Event: auf Anfrage'), { size: 7 })}`,

  'revenue-cloud-billing-or-erp-invoicing': (l) => `
    ${box(18, 22, 118, 100)}${t(77, 40, 'SAP', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(30, 58, l('machine invoice', 'Maschinenrechnung'), { size: 7 })}${t(30, 74, l('spare parts', 'Ersatzteile'), { size: 7 })}${t(30, 90, l('down payments', 'Anzahlungen'), { size: 7 })}${t(30, 110, l('general ledger', 'Hauptbuch'), { fill: D, size: 7 })}
    ${box(184, 22, 118, 100, C)}${t(243, 40, 'REVENUE CLOUD BILLING', { fill: D, size: 7, anchor: 'middle' })}
    ${t(196, 58, l('subscriptions', 'Abonnements'), { size: 7 })}${t(196, 74, l('maintenance fees', 'Wartungsgebühren'), { size: 7 })}${t(196, 90, l('usage', 'Nutzung'), { size: 7 })}${t(196, 110, l('subledger', 'Nebenbuch'), { fill: C, size: 7 })}
    <path d="M184 107H137" stroke="${C}" stroke-width="1.3"/><path d="M142 103.5l-5 3.5 5 3.5" fill="none" stroke="${C}" stroke-width="1.3"/>${t(160, 100, l('journals', 'Buchungen'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${tag(18, 132, 118, l('finance decides', 'Finance entscheidet'))}${t(146, 145, l('legal entities, periods, G/L', 'Legal Entities, Perioden, Konten'), { size: 7 })}`,

  'revenue-cloud-editions-pricing': (l) => `
    ${t(18, 18, l('LIST PRICE / USER / MONTH, ANNUAL', 'LISTENPREIS / NUTZER / MONAT, JÄHRLICH'), { fill: D, size: 7 })}
    ${box(18, 26, 136, 42)}${t(28, 42, 'GROWTH', { fill: D, size: 7.5 })}${t(144, 48, '150 €', { size: 11, anchor: 'end' })}${t(28, 58, l('quote, order, subs', 'Angebot, Auftrag, Abo'), { size: 7 })}
    ${box(166, 26, 136, 42, C)}${t(176, 42, 'ADVANCED', { fill: D, size: 7.5 })}${t(292, 48, '200 €', { fill: C, size: 11, anchor: 'end' })}${t(176, 58, l('+ contracts, invoicing', '+ Verträge, Rechnung'), { size: 7 })}
    ${t(18, 84, l('+ Sales Cloud required (Core 195 €)', '+ Sales Cloud nötig (Core 195 €)'), { size: 7 })}
    ${['CLM', 'DRO *', 'Invoice Mgmt *', l('External users', 'Externe Nutzer')].map((s, i) => box(18 + i * 72, 94, 66, 18) + t(51 + i * 72, 106, s, { size: 6.8, anchor: 'middle' })).join('')}
    ${t(18, 132, l('Billing: on request, 1 event per $50 invoiced', 'Billing: auf Anfrage, 1 Event je 50 $ Rechnung'), { size: 7 })}
    ${t(18, 148, l('* freemium access available', '* Freemium-Zugang verfügbar'), { size: 6.5 })}`,

  'revenue-cloud-product-names': (l) => `
    ${t(18, 18, l('ONE PRODUCT, MANY NAMES', 'EIN PRODUKT, VIELE NAMEN'), { fill: D, size: 7 })}
    <path d="M18 90H166" stroke="${G}" stroke-width="1.3"/><path d="M166 90H302" stroke="${C}" stroke-width="1.6"/>
    ${dot(34, 90)}${dot(100, 90)}${dot(166, 90, C)}${dot(232, 90, C)}${dot(286, 90, C)}
    ${t(34, 56, '2015', { size: 7, anchor: 'middle' })}${t(34, 68, 'SteelBrick', { fill: D, size: 7, anchor: 'middle' })}${t(34, 78, l('$360M', '360 Mio. $'), { size: 7, anchor: 'middle' })}
    ${t(100, 108, '2020', { size: 7, anchor: 'middle' })}${t(100, 120, 'Revenue Cloud', { fill: D, size: 7, anchor: 'middle' })}${t(100, 130, 'CPQ + Billing', { size: 7, anchor: 'middle' })}
    ${t(166, 56, "Spring '24", { size: 7, anchor: 'middle' })}${t(166, 68, 'RLM', { fill: D, size: 7, anchor: 'middle' })}${t(166, 78, 'API 60.0', { size: 7, anchor: 'middle' })}
    ${t(232, 108, "Winter '27", { size: 7, anchor: 'middle' })}${t(232, 120, 'Revenue Management', { fill: D, size: 7, anchor: 'middle' })}${t(232, 130, 'Developer Guide', { size: 7, anchor: 'middle' })}
    ${t(302, 56, l('Oct 2026', 'Okt. 2026'), { size: 7, anchor: 'end' })}${t(302, 68, 'Revenue Cloud', { fill: C, size: 7, anchor: 'end' })}${t(302, 78, 'Growth · Advanced', { size: 7, anchor: 'end' })}
    ${t(18, 152, l('order form: edition + SKU, never just the name', 'Bestellformular: Edition + SKU, nie nur der Name'), { size: 7.5 })}`,

  'revenue-cloud-worth-it-manufacturers': (l) => `
    ${t(18, 20, l('PAYS OFF', 'LOHNT SICH'), { fill: C, size: 7 })}${t(166, 20, l('RARELY', 'SELTEN'), { fill: D, size: 7 })}
    ${box(18, 28, 140, 90, C)}${box(166, 28, 136, 90)}
    ${[l('many variants with rules', 'viele Varianten mit Regeln'), l('service + subscriptions', 'Service + Abonnements'), l('frequent amendments', 'häufige Nachträge'), l('up to 15,000 lines per deal', 'bis 15.000 Positionen je Deal')]
      .map((s, i) => check(26, 42 + i * 20, G) + t(38, 47 + i * 20, s, { size: 6.5 })).join('')}
    ${[l('quote = SAP price lookup', 'Angebot = SAP-Preisabfrage'), l('few products, few options', 'wenige Produkte, Optionen'), l('invoice stays in SAP FI', 'Rechnung bleibt in SAP FI')]
      .map((s, i) => cross(176, 44 + i * 20) + t(186, 47 + i * 20, s, { size: 7 })).join('')}
    ${t(18, 140, l('Advanced: 200 € / user / month + Sales Cloud', 'Advanced: 200 € / Nutzer / Monat + Sales Cloud'), { fill: C, size: 7.5 })}
    ${t(18, 154, l('decide price master and invoice owner first', 'erst Preismaster und Rechnungssystem klären'), { size: 7 })}`,

  'salesforce-cpq-end-of-sale-status': (l) => `
    ${t(18, 20, l('SALESFORCE CPQ · OCTOBER 2026', 'SALESFORCE CPQ · OKTOBER 2026'), { fill: D, size: 7 })}
    ${[[l('keep using, renew', 'weiter nutzen, verlängern'), 1], [l('buy more users', 'Nutzer nachkaufen'), 1], [l('support, critical fixes', 'Support, kritische Fixes'), 1], [l('new features', 'neue Funktionen'), 0], [l('new customers', 'Neukunden'), 0]].map(([s, ok], i) => (ok ? check(20, 36 + i * 16, G) : cross(24, 37 + i * 16)) + t(36, 41 + i * 16, String(s), { size: 7 })).join('')}
    ${tag(178, 28, 124, l('no end-of-life date', 'kein End-of-Life-Datum'))}
    ${t(178, 64, l('no forced migration', 'keine erzwungene Migration'), { size: 7 })}
    ${t(178, 82, l('Billing: full access', 'Billing: voller Zugang'), { size: 7 })}
    ${t(178, 94, l('(spokesperson, 2025)', '(Sprecher, 2025)'), { size: 7 })}
    <path d="M18 114H302" stroke="${L}"/>
    ${box(18, 122, 284, 24, C)}${t(160, 137, l('next renewal: term · price cap · coexistence', 'nächste Verlängerung: Laufzeit · Preisdeckel · Parallelbetrieb'), { fill: C, size: 7, anchor: 'middle' })}`,

  'stay-on-cpq-or-migrate': (l) => `
    ${box(18, 60, 74, 40, C)}${t(55, 77, l('ASSESS', 'ANALYSE'), { fill: C, size: 7.5, anchor: 'middle' })}${t(55, 90, l('CPQ org', 'CPQ-Org'), { size: 7, anchor: 'middle' })}
    <path d="M92 80H110M110 38V122" stroke="${G}" stroke-width="1.3"/>
    ${arrow(110, 38, 130)}${arrow(110, 80, 130)}${arrow(110, 122, 130)}
    ${[[l('STAY ON CPQ', 'BEI CPQ BLEIBEN'), l('stable process, ERP prices', 'stabiler Prozess, Preise aus ERP')], [l('MOVE TO REVENUE CLOUD', 'WECHSEL ZU REVENUE CLOUD'), l('agent quoting, usage billing', 'Agenten-Angebote, Nutzungsabrechnung')], [l('THIRD ROUTE', 'DRITTER WEG'), l('rules in SAP or PLM', 'Regeln in SAP oder PLM')]].map(([h, s], i) => box(130, 22 + i * 42, 172, 32) + t(140, 35 + i * 42, h, { fill: D, size: 7 }) + t(140, 47 + i * 42, s, { size: 7 })).join('')}
    ${t(18, 154, l('no end-of-life date · 15 % of RCA customers came from CPQ', 'kein End-of-Life-Datum · 15 % der RCA-Kunden kamen von CPQ'), { size: 7 })}`,

  'field-service-headless-setup-ai': (l) => `
    ${t(18, 20, l('HEADLESS SETUP (ASSUMED SCENARIO)', 'HEADLESS-EINRICHTUNG (ANNAHME)'), { fill: D, size: 7.5 })}
    ${box(18, 30, 74, 50)}${t(55, 50, l('website', 'Website'), { size: 7.5, anchor: 'middle' })}${t(55, 66, l('AI assistant', 'KI-Assistent'), { size: 7, anchor: 'middle' })}
    ${arrow(92, 55, 122)}
    ${box(122, 30, 74, 50)}${t(159, 50, l('plan', 'Plan'), { size: 7.5, anchor: 'middle' })}${t(159, 66, l('14 territories', '14 Gebiete'), { size: 7, anchor: 'middle' })}
    ${arrow(196, 55, 230, C)}${t(213, 47, l('review', 'Prüfung'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${box(230, 30, 72, 50, C)}${t(266, 50, l('6 territories', '6 Gebiete'), { fill: C, size: 7.5, anchor: 'middle' })}${t(266, 66, l('approved', 'freigegeben'), { size: 7, anchor: 'middle' })}
    ${[l('sandbox', 'Sandbox'), 'Git, SFDMU', l('pipeline', 'Pipeline')].map((s, i) => box(18 + i * 104, 98, 74, 26) + t(55 + i * 104, 114, s, { size: 7, anchor: 'middle' })).join('')}
    ${arrow(92, 111, 122)}${arrow(196, 111, 226)}
    ${t(18, 146, l('territories, work types, policies are records', 'Gebiete, Arbeitstypen, Policies sind Datensätze'), { size: 7 })}`,

  'revenue-cloud-discount-approvals': (l) => `
    ${t(18, 18, l('ADVANCED APPROVALS ON THE QUOTE', 'ADVANCED APPROVALS AM ANGEBOT'), { fill: D, size: 7 })}
    ${box(18, 40, 60, 48)}${t(48, 56, l('QUOTE', 'ANGEBOT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(48, 69, l('discount 32 %', 'Rabatt 32 %'), { size: 6.5, anchor: 'middle' })}${t(48, 81, l('+ preview', '+ Vorschau'), { size: 6.5, anchor: 'middle' })}
    <path d="M78 64H104M104 46V82" fill="none" stroke="${G}" stroke-width="1.3"/>${arrow(104, 46, 112)}${arrow(104, 82, 112)}
    ${box(112, 34, 108, 24)}${t(166, 49, l('> 15 %: sales manager', '> 15 %: Vertrieb Region'), { size: 7, anchor: 'middle' })}
    ${box(112, 70, 108, 24, C)}${t(166, 85, l('> 30 %: head of sales', '> 30 %: Vertrieb gesamt'), { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(220, 46, 242)}${arrow(220, 82, 242)}
    ${box(242, 40, 62, 48)}${t(273, 58, l('APPROVED', 'FREIGABE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(273, 72, 'audit trail', { size: 7, anchor: 'middle' })}
    <path d="M18 106H302" stroke="${L}"/>
    ${check(18, 118)}${t(32, 125, l('margin needs cost data from the ERP', 'Marge braucht Kostendaten aus dem ERP'), { size: 7 })}
    ${cross(22, 142)}${t(32, 145, l('CPQ approval rules do not carry over', 'CPQ-Freigaberegeln werden nicht übernommen'), { size: 7 })}`,

  'revenue-cloud-quoting-agent': (l) => `
    ${t(18, 18, l('QUOTING AGENT IN REVENUE CLOUD', 'ANGEBOTSAGENT IN REVENUE CLOUD'), { fill: D, size: 7 })}
    ${box(18, 34, 84, 44)}${t(60, 52, l('wear part kit', 'Verschleißteilsatz'), { size: 7, anchor: 'middle' })}${t(60, 66, l('+ 2 service days', '+ 2 Servicetage'), { size: 7, anchor: 'middle' })}
    ${t(60, 92, l('plain language', 'normale Sprache'), { size: 7, anchor: 'middle' })}
    ${arrow(102, 56, 126, C)}
    ${box(126, 28, 110, 74, C)}${t(181, 42, 'Quote Management', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('valid products', 'gültige Produkte'), l('synced prices', 'synchrone Preise'), l('discount guardrails', 'Rabatt-Leitplanken')].map((s, i) => check(134, 50 + i * 15) + t(146, 56 + i * 15, s, { size: 7 })).join('')}
    ${arrow(236, 56, 256)}
    ${box(256, 36, 48, 40)}${t(280, 54, l('QUOTE', 'ANGEBOT'), { fill: D, size: 7, anchor: 'middle' })}${t(280, 67, l('draft', 'Entwurf'), { size: 7, anchor: 'middle' })}
    ${tag(18, 112, 132, l('20 Flex Credits / action', '20 Flex Credits je Aktion'))}
    ${t(18, 143, l("Winter '27: buyers, partners, renewals", "Winter '27: Kunden, Partner, Verlängerung"), { size: 7 })}
    ${t(18, 154, l('75 % less quoting time: vendor figure', '75 % weniger Zeit: Herstellerangabe'), { size: 7 })}`,

  'salesforce-contracts-revenue-cloud': (l) => `
    ${t(18, 18, l('SALESFORCE CONTRACTS · 5 STAGES', 'SALESFORCE CONTRACTS · 5 PHASEN'), { fill: D, size: 7 })}
    ${[[l('Author', 'Erstellen'), l('clauses', 'Klauseln')], [l('Negotiate', 'Verhandeln'), 'Word'], [l('Approve', 'Freigeben'), 'Matrix'], [l('Sign', 'Signieren'), 'DocuSign'], [l('Activate', 'Aktivieren'), l('obligations', 'Pflichten')]].map(([a, b], i) => box(18 + i * 60, 32, 52, 36, i === 4 ? C : G) + t(44 + i * 60, 47, a, { fill: i === 4 ? C : D, size: 7, anchor: 'middle' }) + t(44 + i * 60, 60, b, { size: 6.5, anchor: 'middle' })).join('')}
    ${[0, 1, 2, 3].map((i) => arrow(70 + i * 60, 50, 78 + i * 60)).join('')}
    <path d="M18 84H302" stroke="${L}"/>
    ${t(18, 100, l('Contracts: what was signed', 'Contracts: was unterschrieben ist'), { size: 7 })}
    ${t(18, 114, l('Sales agreement: volumes per period', 'Sales Agreement: Mengen je Periode'), { size: 7 })}
    ${t(18, 128, l('Service contract: covered assets', 'Servicevertrag: abgedeckte Anlagen'), { size: 7 })}
    ${tag(186, 96, 118, l('from €50 / user / month', 'ab 50 € je Nutzer/Monat'))}
    ${t(18, 150, l('SKU needs prerequisite products', 'SKU braucht Voraussetzungsprodukte'), { size: 7 })}`,

  'asset-service-lifecycle-management-addon': (l) => `
    ${t(18, 22, l('CORE FIELD SERVICE', 'FIELD-SERVICE-KERN'), { fill: D, size: 7.5 })}${t(180, 22, l('ASLM ADD-ON', 'ADD-ON ASLM'), { fill: D, size: 7.5 })}
    ${box(18, 30, 122, 86)}
    ${[l('assets, hierarchy', 'Assets, Hierarchie'), l('maintenance plans', 'Wartungspläne'), l('service contracts', 'Serviceverträge'), l('entitlements', 'Entitlements')].map((s, i) => check(28, 43 + i * 18, G) + t(42, 49 + i * 18, s, { size: 7 })).join('')}
    ${arrow(140, 73, 180, C)}${t(160, 64, l('+ $75', '+ 75 €'), { fill: C, size: 7.5, anchor: 'middle' })}${t(160, 86, l('per user', 'je Nutzer'), { size: 6, anchor: 'middle' })}
    ${box(180, 30, 122, 86, C)}
    ${[l('coverage view', 'Deckungsansicht'), l('repair quotes', 'Reparaturangebote'), l('recall campaigns', 'Rückrufkampagnen'), l('depot repair', 'Depotreparatur')].map((s, i) => dot(192, 46 + i * 18, i === 0 ? C : G, 2.5) + t(200, 49 + i * 18, s, { size: 7 })).join('')}
    ${tag(18, 128, 156, l('Connected Assets $15,000/org', 'Connected Assets 15.000 €/Org'))}${t(182, 141, l('per month, telemetry', 'pro Monat, Telemetrie'), { size: 7 })}`,

  'servicemax-vs-salesforce-field-service': (l) => `
    ${t(18, 18, l('ONE SALESFORCE ORG, TWO DATA MODELS', 'EINE SALESFORCE-ORG, ZWEI DATENMODELLE'), { fill: D, size: 7 })}
    ${box(18, 26, 192, 90)}
    ${box(28, 36, 82, 70)}${t(69, 52, 'ServiceMax Core', { fill: D, size: 7, anchor: 'middle' })}${t(33, 70, l('SVMXC objects', 'SVMXC-Objekte'), { size: 7 })}${t(33, 84, 'Installed Product', { size: 7 })}
    ${box(118, 36, 82, 70, C)}${t(159, 52, 'Field Service', { fill: C, size: 7, anchor: 'middle' })}${t(123, 70, 'WorkOrder', { size: 7 })}${t(123, 84, 'Asset', { size: 7 })}
    ${arrow(210, 71, 222, G, true)}
    ${box(222, 36, 82, 70)}${t(263, 52, l('AWS IRELAND', 'AWS IRLAND'), { fill: D, size: 7, anchor: 'middle' })}${t(227, 70, 'Service Board', { size: 7 })}${t(227, 84, l('Optimization', 'Optimierung'), { size: 7 })}
    ${tag(18, 128, 150, l('2 vendors · 2 calendars', '2 Hersteller · 2 Kalender'))}${t(178, 141, l('no PTC SLA for suites', 'keine PTC-SLA für Suiten'), { size: 7 })}`,

  'servicemax-asset-360': (l) => `
    ${t(18, 18, l('TWO ADD-ONS, SAME OBJECTS', 'ZWEI ERWEITERUNGEN, GLEICHE OBJEKTE'), { fill: D, size: 7 })}
    ${box(18, 28, 130, 50, C)}${t(83, 42, 'ASSET 360 · PTC', { fill: C, size: 7.5, anchor: 'middle' })}${t(28, 57, l('entitlement engine', 'Entitlement-Engine'), { size: 7 })}${t(28, 70, l('Windchill link', 'Windchill-Anbindung'), { size: 7 })}
    ${box(172, 28, 130, 50)}${t(237, 42, 'ASLM · SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(182, 57, l('$75 per user', '75 $ je Nutzer'), { size: 7 })}${t(182, 70, l('depot repair', 'Depotreparatur'), { size: 7 })}
    <path d="M83 78V96M237 78V96" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${t(160, 90, l('overlap: coverage, campaigns', 'Überschneidung: Deckung, Kampagnen'), { size: 6.5, anchor: 'middle' })}
    ${box(18, 96, 284, 26)}${t(160, 112, 'Field Service: WorkOrder · Asset', { fill: D, size: 7, anchor: 'middle' })}
    ${tag(18, 132, 170, l('needs Service Cloud + FS', 'braucht Service Cloud + FS'))}${t(196, 145, l('26R2 · 9 Sep 2026', '26R2 · 9.9.2026'), { size: 7 })}`,

  'customer-prices-sap-or-salesforce-pricing': (l) => `
    ${box(18, 26, 72, 98)}${t(54, 44, 'SAP', { fill: D, size: 8, anchor: 'middle' })}${t(54, 58, l('conditions', 'Konditionen'), { size: 7, anchor: 'middle' })}
    ${box(230, 26, 74, 98, C)}${t(267, 44, 'Revenue Cloud', { fill: D, size: 7.5, anchor: 'middle' })}${t(267, 58, 'Pricing Procedure', { size: 6.5, anchor: 'middle' })}
    ${t(160, 66, l('A · net price via API', 'A · Nettopreis per API'), { fill: C, size: 7, anchor: 'middle' })}${arrow(90, 72, 230, C)}
    ${t(160, 88, l('B · conditions rebuilt', 'B · Konditionen nachgebaut'), { size: 7, anchor: 'middle' })}${arrow(90, 94, 230, G, true)}
    ${t(160, 110, l('C · list prices only', 'C · nur Listenpreise'), { size: 7, anchor: 'middle' })}${arrow(90, 116, 230)}
    ${tag(18, 134, 168, l('one master per price type', 'ein führendes System je Preisart'))}
    ${t(196, 148, l('EDI orders: price from SAP', 'EDI-Aufträge: Preis aus SAP'), { size: 7 })}`,

  'field-service-asset-hierarchy': (l) => `
    ${box(40, 14, 72, 22, C)}${t(76, 28, l('Line', 'Linie'), { fill: D, size: 7.5, anchor: 'middle' })}
    <path d="M76 36V44M28 44H124M28 44V50M76 44V50M124 44V50" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${[0, 1, 2].map((i) => box(12 + i * 48, 50, 32, 18) + t(28 + i * 48, 62, 'M' + (i + 1), { size: 7, anchor: 'middle' })).join('')}
    <path d="M76 68V76M52 76H100M52 76V82M100 76V82" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${box(36, 82, 32, 16)}${box(84, 82, 32, 16)}${t(76, 112, l('serialised assemblies', 'Baugruppen mit Seriennr.'), { size: 7, anchor: 'middle' })}
    ${t(12, 130, l('6 machines · 40 assemblies', '6 Maschinen · 40 Baugruppen'), { size: 7 })}
    ${t(12, 146, l('= 47 assets, 3 levels', '= 47 Assets, 3 Ebenen'), { fill: C, size: 7.5 })}
    ${box(180, 14, 124, 64)}${t(242, 30, 'PLM', { fill: D, size: 7.5, anchor: 'middle' })}${t(242, 46, l('900 parts', '900 Teile'), { size: 7, anchor: 'middle' })}${t(242, 60, l('stay in parts list', 'bleiben in Stückliste'), { size: 7, anchor: 'middle' })}
    <path d="M118 90L180 64" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/>${t(156, 86, 'live', { size: 6.5, anchor: 'middle' })}
    ${t(180, 100, l('asset if own:', 'Asset bei eigener:'), { fill: D, size: 7 })}
    ${[l('serial number', 'Seriennummer'), l('maintenance', 'Wartung'), l('warranty', 'Garantie')].map((s, i) => check(180, 108 + i * 14, i === 0 ? C : G) + t(194, 114 + i * 14, s, { size: 7 })).join('')}
    ${t(304, 153, l('tree grid: max 500', 'Baumansicht: max. 500'), { size: 6.5, anchor: 'end' })}`,

  'field-service-data-capture-forms': (l) => `
    ${t(18, 18, l('PROTOCOL SPLIT BY VARIANT (ASSUMED)', 'PROTOKOLL NACH VARIANTE GETEILT (ANNAHME)'), { fill: D, size: 7 })}
    ${box(18, 30, 62, 84)}${t(49, 46, l('PAPER', 'PAPIER'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[56, 64, 72, 80].map((y) => `<path d="M28 ${y}H70" stroke="${L}" stroke-width="1.2"/>`).join('')}
    ${t(49, 96, l('80 points', '80 Punkte'), { size: 7, anchor: 'middle' })}${t(49, 107, l('12 pages', '12 Seiten'), { size: 7, anchor: 'middle' })}
    ${[l('1 general · 30', '1 allgemein · 30'), l('2 variant · 35', '2 Variante · 35'), l('3 acceptance · 15', '3 Abnahme · 15')].map((s, i) => arrow(80, 38 + i * 36, 104) + box(104, 26 + i * 36, 78, 24) + t(143, 41 + i * 36, s, { size: 7, anchor: 'middle' })).join('')}
    <path d="M182 38H190M182 74H190M182 110H190M190 38V110" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${arrow(190, 47, 200, C)}${arrow(190, 97, 200)}
    ${box(200, 30, 108, 34, C)}${t(254, 44, l('FIELDS', 'FELDER'), { fill: C, size: 7, anchor: 'middle' })}${t(254, 57, l('asset · work order', 'Asset · Arbeitsauftrag'), { size: 6.5, anchor: 'middle' })}
    ${box(200, 80, 108, 34)}${t(254, 94, l('FORM ANSWERS', 'FORMULARANTWORTEN'), { fill: D, size: 6.5, anchor: 'middle' })}${t(254, 107, l('checks, signature', 'Prüfpunkte, Unterschrift'), { size: 6.5, anchor: 'middle' })}
    ${t(18, 140, l("Voice to Form: GA since 260.0, German since Winter '27", "Voice to Form: GA seit 260.0, Deutsch seit Winter '27"), { fill: C, size: 7 })}
    ${t(18, 153, l('offline, auto-save, every submission logged', 'offline, automatisch gespeichert, jede Übermittlung protokolliert'), { size: 7 })}`,

  'field-service-mobile-offline': (l) => `
    ${t(18, 18, l('BRIEFCASE PER ROLE', 'BRIEFCASE PRO ROLLE'), { fill: D, size: 7 })}
    ${box(18, 26, 114, 88)}
    ${[l('appointment', 'Service-Termin'), l('work order', 'Arbeitsauftrag'), l('asset + history', 'Asset + Historie'), l('van stock', 'Fahrzeuglager'), l('manual', 'Handbuch')].map((s, i) => check(28, 36 + i * 15, G) + t(42, 42 + i * 15, s, { size: 7 })).join('')}
    ${arrow(132, 62, 180, C)}${t(156, 54, l('every 5 min', 'alle 5 Min.'), { fill: C, size: 6.3, anchor: 'middle' })}
    ${box(180, 26, 58, 88, C)}<rect x="185" y="36" width="48" height="56" rx="2" fill="#fff" stroke="${L}" stroke-width="1"/>
    ${t(209, 60, 'OFFLINE', { fill: C, size: 7, anchor: 'middle' })}${t(209, 74, '7:00-16:00', { size: 6.5, anchor: 'middle' })}${dot(209, 103, G, 2.5)}
    ${t(246, 38, l('STAYS ONLINE', 'BLEIBT ONLINE'), { fill: D, size: 7 })}
    ${[l('price lists', 'Preislisten'), l('all assets', 'alle Assets'), l('all stock', 'alle Lager')].map((s, i) => cross(252, 54 + i * 16) + t(262, 57 + i * 16, s, { size: 7 })).join('')}
    <path d="M18 126H302" stroke="${L}"/>
    ${t(18, 140, l('known gaps: tasks not primed, iOS loads LWC after cold start', 'bekannte Lücken: Tasks nicht geladen, iOS lädt LWC erst nach Kaltstart'), { size: 7 })}
    ${t(18, 153, l('test offline with a partner user (community licence)', 'offline mit Partnernutzer testen (Community-Lizenz)'), { fill: C, size: 7 })}`,

  'field-service-mobile-release-testing': (l) => `
    ${t(18, 18, l('EACH APP VERSION', 'JEDE APP-VERSION'), { fill: D, size: 7 })}
    <path d="M24 60H300" stroke="${G}" stroke-width="1.2"/>
    ${dot(40, 60)}${t(40, 50, 'Beta', { fill: D, size: 7, anchor: 'middle' })}
    <path d="M44 60H192" stroke="${C}" stroke-width="2"/>
    ${dot(196, 60, C)}${t(196, 50, 'GA', { fill: C, size: 7, anchor: 'middle' })}
    ${dot(290, 60)}${t(290, 50, l('all users', 'alle Nutzer'), { fill: D, size: 7, anchor: 'middle' })}
    ${t(118, 76, l('pilot (assumed): 8 technicians, iOS + Android', 'Pilot (Annahme): 8 Techniker, iOS + Android'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(243, 76, l('up to 7 days', 'bis zu 7 Tage'), { size: 7, anchor: 'middle' })}
    ${box(18, 90, 138, 46)}${t(26, 104, 'BETA', { fill: D, size: 7 })}${t(26, 117, l('1 month before major', '1 Monat vor Hauptversion'), { size: 7 })}${t(26, 129, l('1 week before patch', '1 Woche vor Patch'), { size: 7 })}
    ${box(166, 90, 138, 46)}${t(174, 104, 'PATCH 262.3', { fill: D, size: 7 })}${t(174, 117, l('beta 26 Aug 2026', 'Beta 26.08.2026'), { size: 7 })}${t(174, 129, l('release 4 Sep 2026', 'Release 04.09.2026'), { size: 7 })}
    ${t(18, 152, l('8 test scripts: offline, form, report, partner user', '8 Testskripte: offline, Formular, Bericht, Partnernutzer'), { size: 7 })}`,

  'field-service-usage-based-maintenance': (l) => `
    ${box(18, 22, 74, 40)}${t(55, 38, l('IoT / ERP', 'IoT / ERP'), { fill: D, size: 7.5, anchor: 'middle' })}${t(55, 52, l('once a day', '1x pro Tag'), { size: 7, anchor: 'middle' })}
    ${arrow(92, 42, 124)}
    ${box(124, 18, 98, 48)}${t(173, 32, 'ASSET', { fill: D, size: 7.5, anchor: 'middle' })}${t(132, 46, l('hours since service', 'Std. seit Wartung'), { size: 7 })}${t(132, 58, l('months since service', 'Monate seit Wartung'), { size: 7 })}
    ${arrow(222, 42, 248, C)}
    ${box(248, 22, 56, 40, C)}${t(276, 38, l('WORK', 'ARBEITS-'), { fill: D, size: 7, anchor: 'middle' })}${t(276, 50, l('ORDER', 'AUFTRAG'), { fill: D, size: 7, anchor: 'middle' })}
    ${tag(118, 76, 110, l('≥ 2,000 h OR ≥ 12 m', '≥ 2.000 h ODER ≥ 12 M'))}
    <path d="M276 62V110H173V97" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${t(238, 122, l('reset on completion', 'Reset bei Abschluss'), { size: 7, anchor: 'middle' })}
    <path d="M18 132H302" stroke="${L}"/>
    ${t(18, 148, l('max 2,600 work orders per run', 'max. 2.600 Arbeitsaufträge pro Lauf'), { fill: C, size: 7 })}${t(302, 148, l('≤ 5 rules', '≤ 5 Regeln'), { size: 7, anchor: 'end' })}`,

  'revenue-cloud-configurator-constraint-rules': (l) => `
    ${t(18, 18, l('CONFIGURATOR RULES', 'KONFIGURATORREGELN'), { fill: D, size: 7 })}
    ${box(18, 30, 80, 40)}${t(58, 47, l('validation', 'Validierung'), { fill: D, size: 7.5, anchor: 'middle' })}${t(58, 60, l('blocks invalid', 'blockiert Ungültiges'), { size: 6, anchor: 'middle' })}
    ${box(112, 30, 80, 40)}${t(152, 47, l('selection rules', 'Auswahlregeln'), { fill: D, size: 7.5, anchor: 'middle' })}${t(152, 60, l('if-then', 'Wenn-dann'), { size: 6, anchor: 'middle' })}
    ${box(206, 30, 96, 40, C)}${t(254, 47, l('CONSTRAINT MODEL', 'CONSTRAINT-MODELL'), { fill: C, size: 7, anchor: 'middle' })}${t(254, 60, l('CML · all combinations', 'CML · alle Kombinationen'), { size: 6, anchor: 'middle' })}
    ${arrow(98, 50, 112)}${arrow(192, 50, 206, C)}
    <path d="M18 78H192M206 78H302" stroke="${L}"/>
    ${t(105, 90, 'Business Rules Engine', { size: 6.8, anchor: 'middle' })}${t(254, 90, 'Constraint Rules Engine', { fill: C, size: 6.8, anchor: 'middle' })}
    ${check(18, 106, G)}${t(32, 112, l('target < 100 ms per run', 'Ziel < 100 ms pro Lauf'), { size: 7 })}
    ${check(18, 122, G)}${t(32, 128, l('< 1,000 backtracks', '< 1.000 Backtracks'), { size: 7 })}
    ${box(206, 102, 96, 32)}${t(254, 116, l('external configurator', 'externer Konfigurator'), { size: 6.8, anchor: 'middle' })}${t(254, 127, l('result via API', 'Ergebnis per API'), { size: 6.5, anchor: 'middle' })}
    ${t(18, 152, l('one rule master per product line, never two', 'ein führendes System pro Produktlinie, nie zwei'), { fill: D, size: 7 })}`,

  'revenue-cloud-installed-base-assets': (l) => `
    ${[l('Quote', 'Angebot'), l('Order', 'Auftrag'), 'Asset'].map((s, i) => box(18 + i * 104, 18, 76, 24, i === 2 ? C : G) + t(56 + i * 104, 33, s, { fill: i === 2 ? C : D, size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(94, 30, 122)}${arrow(198, 30, 226)}
    ${t(18, 58, l('amend · renew · cancel: always a new quote', 'Nachtrag · Verlängerung · Kündigung: immer neues Angebot'), { size: 7 })}
    ${box(18, 70, 120, 58)}${t(78, 86, l('SOLD ASSET', 'VERKAUFTES ASSET'), { fill: D, size: 7, anchor: 'middle' })}${t(78, 102, l('qty 5 + 8 = 13', 'Menge 5 + 8 = 13'), { fill: C, size: 7.5, anchor: 'middle' })}${t(78, 118, l('state periods · MRR', 'State Periods · MRR'), { size: 7, anchor: 'middle' })}
    ${box(186, 70, 120, 58)}${t(246, 86, l('MACHINE ASSET', 'MASCHINEN-ASSET'), { fill: D, size: 7, anchor: 'middle' })}${t(246, 102, l('serial number', 'Seriennummer'), { size: 7, anchor: 'middle' })}${t(246, 118, 'Field Service', { size: 7, anchor: 'middle' })}
    <path d="M138 99H186" stroke="${C}" stroke-width="1.3" stroke-dasharray="4 3"/>${t(162, 94, 'lookup', { fill: C, size: 6.5, anchor: 'middle' })}
    ${t(18, 148, l('one Asset object, two meanings', 'ein Asset-Objekt, zwei Bedeutungen'), { size: 7 })}`,

  'revenue-cloud-order-orchestration-erp': (l) => `
    ${box(14, 40, 72, 66)}${t(50, 58, l('ORDER', 'AUFTRAG'), { fill: D, size: 7.5, anchor: 'middle' })}${t(50, 74, 'Activated', { size: 7, anchor: 'middle' })}${t(50, 92, l('record-triggered', 'per Flow'), { size: 6.5, anchor: 'middle' })}
    ${arrow(86, 73, 106)}
    ${box(106, 24, 106, 98)}${t(159, 40, 'DRO', { fill: D, size: 8, anchor: 'middle' })}${t(159, 52, l('decomposition', 'Dekomposition'), { size: 7, anchor: 'middle' })}
    ${t(116, 70, l('SAP order item', 'SAP-Auftragsposition'), { fill: C, size: 7 })}${t(116, 86, l('installation', 'Inbetriebnahme'), { size: 7 })}${t(116, 102, l('monitoring', 'Überwachung'), { size: 7 })}
    ${box(244, 40, 62, 66, C)}${t(275, 70, 'SAP', { fill: D, size: 9, anchor: 'middle' })}${t(275, 86, l('owns order', 'führt Auftrag'), { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(212, 58, 244, C)}${t(228, 52, 'callout', { fill: C, size: 6, anchor: 'middle' })}
    <path d="M244 92H213" stroke="${G}" stroke-width="1.3"/><path d="M218 88.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(228, 102, l('no.', 'Nr.'), { size: 6.5, anchor: 'middle' })}
    ${tag(14, 132, 92, l('5 step types', '5 Schritttypen'))}${t(116, 145, l('fallout: retry, then queue', 'Fallout: Wiederholung, dann Queue'), { size: 7 })}`,

  'revenue-cloud-pricing-procedures': (l) => `
    ${t(18, 22, 'PRICING PROCEDURE', { fill: D, size: 7.5 })}
    ${[l('List price', 'Listenpreis'), l('Volume', 'Menge'), l('Attribute', 'Attribut'), l('Manual', 'Manuell'), l('Aggregate', 'Aggregat')].map((s, i) => box(18 + i * 57, 32, 48, 26) + t(42 + i * 57, 48, s, { fill: G, size: 6.2, anchor: 'middle' })).join('')}
    ${[0, 1, 2, 3].map((i) => arrow(66 + i * 57, 45, 75 + i * 57)).join('')}
    <path d="M42 58V78" stroke="${C}" stroke-width="1.3" stroke-dasharray="3 2"/>
    ${box(18, 78, 120, 34, C)}${t(78, 93, 'Decision Tables', { fill: D, size: 7.5, anchor: 'middle' })}${t(78, 105, l('sync after every change', 'Sync nach jeder Änderung'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${check(18, 128)}${t(32, 134, l('regression cases before go-live', 'Regressionsfälle vor dem Go-live'), { size: 7 })}
    <path d="M168 140H304" stroke="${G}" stroke-width="1"/>
    <rect x="174" y="80" width="18" height="60" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    <rect x="200" y="80" width="18" height="10" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    <rect x="226" y="90" width="18" height="8" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    <rect x="252" y="98" width="18" height="6" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    <rect x="278" y="104" width="18" height="36" fill="#fff" stroke="${C}" stroke-width="1.4"/>
    ${t(183, 74, l('list', 'Liste'), { size: 6.5, anchor: 'middle' })}${t(287, 98, l('net', 'netto'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${t(236, 154, l('price waterfall', 'Preiswasserfall'), { size: 7, anchor: 'middle' })}`,

  'revenue-cloud-product-catalog-variants': (l) => `
    ${t(18, 18, l('PRODUCT CATALOG', 'PRODUKTKATALOG'), { fill: D, size: 7 })}
    ${box(18, 30, 80, 80, C)}${t(58, 46, l('CLASSIFICATION', 'KLASSIFIZIERUNG'), { fill: C, size: 7.5, anchor: 'middle' })}
    ${[l('press force', 'Presskraft'), l('bending length', 'Biegelänge'), l('control', 'Steuerung')].map((s, i) => dot(28, 62 + i * 15, G, 2) + t(36, 65 + i * 15, s, { size: 7 })).join('')}
    ${box(136, 22, 80, 22)}${t(176, 36, l('CATALOG', 'KATALOG'), { fill: D, size: 7, anchor: 'middle' })}
    <path d="M176 44V56M176 78V90" stroke="${G}" stroke-width="1.2"/>
    ${box(136, 56, 80, 22)}${t(176, 70, l('category', 'Kategorie'), { size: 7, anchor: 'middle' })}
    ${box(136, 90, 80, 30)}${t(176, 103, l('PRODUCT', 'PRODUKT'), { fill: D, size: 7, anchor: 'middle' })}${t(176, 114, l('40 base machines', '40 Grundmaschinen'), { size: 6.5, anchor: 'middle' })}
    ${arrow(98, 105, 136, C)}${t(117, 100, l('inherits', 'erbt'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${box(226, 22, 80, 22)}${t(266, 36, l('spare parts catalog', 'Ersatzteilkatalog'), { size: 6.3, anchor: 'middle' })}
    ${box(250, 82, 56, 46)}${t(278, 98, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(278, 110, l('material no.', 'Material-Nr.'), { size: 6.5, anchor: 'middle' })}${t(278, 121, l('list price', 'Listenpreis'), { size: 6.5, anchor: 'middle' })}
    <path d="M250 105H217" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M222 101.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>
    <path d="M18 136H302" stroke="${L}"/>
    ${t(18, 152, l('variant = attribute, until the ERP has its own material no.', 'Variante = Attribut, bis das ERP eine eigene Material-Nr. hat'), { fill: D, size: 7 })}`,

  'visual-remote-assistant-instead-of-visit': (l) => `
    ${box(14, 22, 96, 92)}${t(62, 38, l('HOTLINE', 'HOTLINE'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(22, 56, l('annotate image', 'ins Bild zeichnen'), { size: 6.5 })}${t(22, 70, l('add expert', 'Experten dazuholen'), { size: 6.5 })}${t(22, 84, l('OCR: QR, barcode', 'OCR: QR, Barcode'), { size: 6.5 })}${t(22, 98, l('$50 / user / month', '50 € / Nutzer / Monat'), { fill: C, size: 6.5 })}
    ${arrow(110, 50, 176, C)}${t(143, 42, l('SMS or email', 'SMS oder E-Mail'), { fill: C, size: 6.2, anchor: 'middle' })}
    <path d="M175 80H111" stroke="${G}" stroke-width="1.3"/><path d="M115 76.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(143, 94, l('two-way video', 'Video beidseitig'), { size: 6.2, anchor: 'middle' })}
    ${box(176, 22, 56, 92, C)}<rect x="186" y="34" width="36" height="56" rx="3" fill="#fff" stroke="${G}" stroke-width="1"/>${t(204, 104, l('browser', 'Browser'), { size: 7, anchor: 'middle' })}
    <circle cx="204" cy="62" r="9" fill="none" stroke="${C}" stroke-width="1.3"/>
    ${t(242, 40, l('no app', 'keine App'), { size: 7 })}${t(242, 54, l('no login', 'kein Login'), { size: 7 })}${t(242, 68, l('customer', 'Kunde'), { fill: D, size: 7.5 })}
    <path d="M18 128H302" stroke="${L}"/>
    ${check(18, 138)}${t(32, 145, l('operator fixes it', 'Bediener behebt'), { fill: C, size: 7 })}
    ${cross(170, 141)}${t(180, 145, l('tools, acceptance', 'Werkzeug, Abnahme'), { size: 7 })}`,

  'agentforce-1-field-service-bundle': (l) => `
    ${t(18, 18, l('PER USER AND MONTH, LIST PRICE', 'PRO NUTZER UND MONAT, LISTENPREIS'), { fill: D, size: 7 })}
    <path d="M18 130H302" stroke="${G}" stroke-width="1"/>
    ${[['FS Plus', 230], ['Agentforce', 125], ['VRA', 50], ['Appt. Assistant', 25]].reduce((acc, [n, v]) => {
      const h = Number(v) / 6.5, y = acc.y - h;
      return { y, s: acc.s + `<rect x="60" y="${y}" width="56" height="${h}" fill="#fff" stroke="${G}" stroke-width="1.2"/>` + (Number(v) >= 100 ? t(88, y + h / 2 + 3, String(n), { size: 6.5, anchor: 'middle' }) : '') };
    }, { y: 130, s: '' }).s}
    ${t(88, 142, l('parts $430', 'Teile 430 $'), { size: 7, anchor: 'middle' })}
    <rect x="150" y="${130 - 650 / 6.5}" width="56" height="${650 / 6.5}" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    ${t(178, 142, l('bundle $650', 'Paket 650 $'), { fill: D, size: 7, anchor: 'middle' })}
    <path d="M150 ${130 - 430 / 6.5}H206" stroke="${C}" stroke-width="1.3" stroke-dasharray="4 3"/>
    ${t(178, 52, l('+ $220', '+ 220 $'), { fill: C, size: 8, anchor: 'middle' })}
    ${box(222, 44, 82, 50)}${t(263, 60, l('PER ORG / YEAR', 'PRO ORG / JAHR'), { fill: D, size: 6.5, anchor: 'middle' })}
    ${t(263, 74, l('1M Flex Credits', '1 Mio. Flex Credits'), { size: 6.5, anchor: 'middle' })}${t(263, 86, l('= $5,000', '= 5.000 $'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(263, 112, l('covers ~2 users', 'deckt ~2 Nutzer'), { size: 7, anchor: 'middle' })}`,

  'field-service-case-to-work-order': (l) => `
    ${[['Case', l('hotline', 'Hotline'), G], [l('Work order', 'Arbeitsauftrag'), l('the job', 'der Job'), G], [l('Appointment', 'Servicetermin'), l('the visit', 'der Einsatz'), C], [l('Technician', 'Techniker'), 'Dispatched', G]]
      .map(([a, b, c], i) => box(14 + i * 76, 30, 64, 38, String(c)) + t(46 + i * 76, 46, String(a), { fill: String(c) === C ? C : D, size: 6.5, anchor: 'middle' }) + t(46 + i * 76, 59, String(b), { size: 6.5, anchor: 'middle' })).join('')}
    ${arrow(78, 49, 90)}${arrow(154, 49, 166, C)}${arrow(230, 49, 242)}
    ${box(84, 92, 92, 30)}${t(130, 105, 'Work type', { fill: D, size: 7, anchor: 'middle' })}${t(130, 116, l('duration, skills', 'Dauer, Skills'), { size: 6.5, anchor: 'middle' })}
    <path d="M122 92V70" stroke="${G}" stroke-width="1.2"/><path d="M176 107H198V70" fill="none" stroke="${C}" stroke-width="1.3"/>${t(204, 100, 'auto-create', { fill: C, size: 7 })}
    ${t(14, 146, l('Maintenance plan: work order without case, 3x a day', 'Wartungsplan: Arbeitsauftrag ohne Case, 3x am Tag'), { size: 7 })}`,

  'field-service-licences-by-role': (l) => `
    ${t(18, 20, l('ROLE → LICENCE (PER USER / MONTH)', 'ROLLE → LIZENZ (PRO NUTZER / MONAT)'), { fill: D, size: 7.5 })}
    ${[[l('Hotline', 'Hotline'), 'Service Cloud Core', l('$195', '195 €'), G], [l('Hotline + dispatch', 'Hotline + Disposition'), 'Field Service Plus', l('$230', '230 €'), C], [l('Dispatcher', 'Disposition'), 'Dispatcher', l('$175', '175 €'), G], [l('Technician', 'Techniker'), 'Technician', l('$175', '175 €'), G], [l('Partner technician', 'Partnertechniker'), 'Contractor Plus', l('$80 or $32/login', '80 € oder 32 €/Login'), G]]
      .map(([r, lic, p, c], i) => `<path d="M18 ${30 + i * 20}H302" stroke="${L}"/>` + t(22, 43 + i * 20, String(r), { fill: String(c) === C ? C : G, size: 7.5 }) + t(196, 43 + i * 20, String(lic), { fill: String(c), size: 7, anchor: 'end' }) + t(298, 43 + i * 20, String(p), { fill: String(c), size: 7, anchor: 'end' })).join('')}
    ${cross(24, 146)}${t(34, 149, l('no case management on Dispatcher or Technician', 'kein Case Management mit Dispatcher oder Technician'), { size: 7 })}`,

  'revenue-cloud-vs-manufacturing-cloud-commerce': (l) => `
    ${[
      ['Revenue Cloud', [l('configurator', 'Konfigurator'), l('pricing', 'Preise'), l('quote · order', 'Angebot · Auftrag')]],
      ['Manufacturing Cloud', ['Sales Agreements', l('plan vs actual', 'Plan gegen Ist'), l('rebates', 'Boni')]],
      ['B2B Commerce', [l('store', 'Shop'), l('reorder', 'Nachbestellung'), l('spare parts', 'Ersatzteile')]],
    ].map(([h, items], i) => {
      const x = 18 + i * 96;
      return box(x, 22, 92, 78) + t(x + 46, 38, h as string, { fill: D, size: 7, anchor: 'middle' }) + (items as string[]).map((s, j) => t(x + 10, 54 + j * 14, s, { size: 7 })).join('') + `<path d="M${x + 46} 100V114" stroke="${G}" stroke-width="1.2"/>`;
    }).join('')}
    ${box(18, 114, 284, 20, C)}${t(160, 127, l('one catalog · one price master · one quote model', 'ein Katalog · ein Preismaster · ein Angebotsmodell'), { fill: C, size: 7, anchor: 'middle' })}
    ${cross(24, 148)}${t(34, 151, l('2 quote models = 2 prices for one machine', '2 Angebotsmodelle = 2 Preise für eine Maschine'), { size: 7 })}`,

  'service-contracts-recurring-billing': (l) => `
    ${t(18, 18, l('MAINTENANCE CONTRACT: ONE MASTER', 'WARTUNGSVERTRAG: EIN MASTER'), { fill: D, size: 7 })}
    ${box(18, 30, 62, 34)}${t(49, 45, l('QUOTE', 'ANGEBOT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(49, 57, l('subscription', 'Abo'), { size: 7, anchor: 'middle' })}
    ${arrow(80, 47, 100)}
    ${box(100, 30, 62, 34)}${t(131, 45, l('ORDER', 'AUFTRAG'), { fill: D, size: 7.5, anchor: 'middle' })}${t(131, 57, l('activated', 'aktiviert'), { size: 7, anchor: 'middle' })}
    ${arrow(162, 47, 182, C)}
    ${box(182, 26, 120, 42, C)}${t(242, 41, l('ASSET = WHAT WAS SOLD', 'ASSET = WAS VERKAUFT'), { fill: C, size: 7, anchor: 'middle' })}${t(242, 55, l('quantity · price · term', 'Menge · Preis · Laufzeit'), { size: 7, anchor: 'middle' })}
    <path d="M190 68V88" stroke="${G}" stroke-width="1.2"/><path d="M274 68V88" stroke="${G}" stroke-dasharray="4 3" stroke-width="1.2"/>
    ${box(146, 88, 88, 46)}${t(190, 102, 'BILLING', { fill: D, size: 7.5, anchor: 'middle' })}${t(190, 115, l('schedules', 'Schedules'), { size: 6.3, anchor: 'middle' })}${t(190, 127, l('quarterly, in advance', 'quartalsweise, voraus'), { size: 6.3, anchor: 'middle' })}
    ${box(240, 88, 68, 46)}${t(274, 102, 'FIELD SERVICE', { fill: D, size: 7, anchor: 'middle' })}${t(274, 115, l('service contract', 'Servicevertrag'), { size: 6.3, anchor: 'middle' })}${t(274, 127, l('+ entitlement', '+ Entitlement'), { size: 6.3, anchor: 'middle' })}
    ${t(18, 92, l('every change:', 'jede Änderung:'), { size: 7 })}${t(18, 106, l('upsell, renewal,', 'Erweiterung,'), { size: 7 })}${t(18, 120, l('cancellation', 'Verlängerung, Kündigung'), { size: 7 })}
    ${check(18, 132)}${t(32, 139, l('= quote + order', '= Angebot + Auftrag'), { fill: C, size: 7 })}
    ${t(274, 150, l('own flow', 'eigener Flow'), { size: 7, anchor: 'middle' })}`,

  'usage-based-pricing-machines-revenue-cloud': (l) => `
    ${t(18, 18, l('PAY-PER-USE: 1 RECORD PER MACHINE AND DAY', 'PAY-PER-USE: 1 DATENSATZ JE MASCHINE UND TAG'), { fill: D, size: 7 })}
    ${box(18, 30, 66, 44)}${t(51, 48, l('MACHINE', 'MASCHINE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(51, 62, l('hour counter', 'Stundenzähler'), { size: 7, anchor: 'middle' })}
    ${arrow(84, 52, 106)}
    ${box(106, 30, 70, 44)}${t(141, 48, l('IoT PLATFORM', 'IoT-PLATTFORM'), { fill: D, size: 7.5, anchor: 'middle' })}${t(141, 62, l('time series', 'Zeitreihen'), { size: 7, anchor: 'middle' })}
    ${arrow(176, 52, 198, C)}
    ${box(198, 30, 104, 44, C)}${t(250, 48, 'REVENUE CLOUD', { fill: C, size: 7.5, anchor: 'middle' })}${t(250, 62, 'Usage Management', { size: 7, anchor: 'middle' })}
    ${[l('serial no.', 'Seriennr.'), l('counter reset', 'Zählertausch'), l('gaps', 'Lücken'), l('duplicates', 'Dubletten')].map((s, i) => check(110, 80 + i * 12, G) + t(122, 86 + i * 12, s, { size: 7 })).join('')}
    ${[l('grant 300 h', 'Kontingent 300 h'), l('rate card', 'Rate Card'), l('liable summary', 'Liable Summary')].map((s, i) => dot(206, 88 + i * 14, i === 2 ? C : G, 3) + t(214, 91 + i * 14, s, { fill: i === 2 ? C : G, size: 7 })).join('')}
    ${tag(18, 132, 140, l('1 Billing Event per $50', '1 Billing Event je 50 $'))}${t(168, 145, l('invoice subtotal', 'Rechnungszwischensumme'), { size: 7 })}`,

  'field-service-multiday-crews-commissioning': (l) => `
    ${t(18, 18, l('COMMISSIONING · CREW OF 3 (ASSUMED)', 'INBETRIEBNAHME · CREW AUS 3 (ANNAHME)'), { fill: D, size: 7 })}
    ${box(18, 30, 54, 26)}${t(45, 46, l('survey', 'Besichtigung'), { size: 6.5, anchor: 'middle' })}
    <path d="M72 43H104" stroke="${G}" stroke-width="1.2" stroke-dasharray="3 3"/>${cross(88, 43)}
    ${t(88, 70, l('no dependency', 'keine Abhängigkeit'), { size: 6.8, anchor: 'middle' })}
    <rect x="104" y="30" width="198" height="26" rx="4" fill="#fff" stroke="${C}" stroke-width="1.3"/>${t(203, 46, l('multiday appointment, 12 days', 'mehrtägiger Termin, 12 Tage'), { fill: C, size: 7, anchor: 'middle' })}
    ${[0, 1, 2].map((i) => dot(172 + i * 18, 84, G, 5)).join('')}${t(222, 87, l('crew = 1 resource', 'Crew = 1 Ressource'), { size: 7 })}
    <path d="M18 116H302" stroke="${G}" stroke-width="1"/><path d="M18 112V120M302 112V120" stroke="${G}" stroke-width="1"/>
    <path d="M18 116H170" stroke="${C}" stroke-width="2.4"/>
    ${t(18, 132, l('automatic: 30 days', 'automatisch: 30 Tage'), { fill: C, size: 7 })}${t(302, 132, l('max. 8 weeks', 'max. 8 Wochen'), { size: 7, anchor: 'end' })}
    ${t(18, 152, l('ESO utilization ignores multiday jobs', 'Auslastung mit ESO ignoriert mehrtägige Termine'), { size: 7 })}`,

  'field-service-on-call-shifts': (l) => `
    ${t(18, 18, l('ONE REGION, ONE WEEK (ASSUMED)', 'EINE REGION, EINE WOCHE (ANNAHME)'), { fill: D, size: 7 })}
    ${[l('Mon', 'Mo'), l('Tue', 'Di'), l('Wed', 'Mi'), l('Thu', 'Do'), l('Fri', 'Fr'), l('Sat', 'Sa'), l('Sun', 'So')].map((d, i) => t(38 + i * 40, 36, d, { size: 7, anchor: 'middle' })).join('')}
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${22 + i * 40}" y="44" width="32" height="30" rx="3" fill="#fff" stroke="${G}" stroke-width="1.2"/>`).join('')}
    ${t(118, 88, l('operating hours', 'Arbeitszeiten'), { size: 7, anchor: 'middle' })}
    <rect x="222" y="44" width="72" height="30" rx="3" fill="#fff" stroke="${C}" stroke-width="1.3"/>${t(258, 57, l('on-call', 'Bereitschaft'), { fill: C, size: 7, anchor: 'middle' })}${t(258, 68, 'Extended', { fill: C, size: 7, anchor: 'middle' })}
    ${t(258, 88, l('shift', 'Schicht'), { size: 7, anchor: 'middle' })}
    ${check(22, 104, G)}${t(36, 110, l('only Confirmed counts', 'nur Confirmed zählt'), { size: 7 })}
    ${check(22, 122, G)}${t(36, 128, l('filter: breakdowns only', 'Filter: nur Störungen'), { size: 7 })}
    ${check(22, 140, G)}${t(36, 146, l('policy allows overtime', 'Policy erlaubt Overtime'), { size: 7 })}
    ${tag(196, 122, 106, l('works council § 87', 'Betriebsrat § 87'))}`,

  'manufacturing-cloud-program-based-business': (l) => `
    ${[[l('PROGRAMME', 'PROGRAMM'), l('CSV import, market data', 'CSV-Import, Marktdaten')], [l('VARIANT', 'VARIANTE'), l('CSV import, adjusted monthly', 'CSV-Import, monatlich angepasst')], [l('COMPONENT', 'KOMPONENTE'), '']]
      .map(([h, s], i) => box(18, 18 + i * 34, 96, 24) + t(66, 33.5 + i * 34, String(h), { fill: D, size: 7.5, anchor: 'middle' })
        + (i < 2 ? `<path d="M66 ${42 + i * 34}V${52 + i * 34}" stroke="${G}" stroke-width="1.2"/>` + t(124, 33.5 + i * 34, String(s), { size: 7 }) : '')).join('')}
    ${arrow(114, 98, 150, C)}
    ${box(150, 86, 72, 24)}${t(186, 101.5, 'Opportunity', { fill: D, size: 7.5, anchor: 'middle' })}
    ${arrow(222, 98, 236, C)}
    ${box(236, 86, 66, 24, C)}${t(269, 101.5, 'Sales Agreement', { fill: C, size: 6.5, anchor: 'middle' })}
    ${t(186, 122, 'Transformation API', { size: 6.5, anchor: 'middle' })}${t(269, 122, 'Connect API', { size: 6.5, anchor: 'middle' })}
    <path d="M18 130H302" stroke="${L}"/>
    ${t(18, 142, l('DPE: generate, calculate, rollover, regenerate', 'DPE: Generate, Calculate, Rollover, Regenerate'), { size: 7 })}
    ${t(18, 153, l('per component: quantity per unit, min. quantity, lead time', 'pro Komponente: Menge pro Einheit, Mindestmenge, Vorlaufzeit'), { size: 7 })}`,

  'channel-revenue-ship-and-debit': (l) => `
    ${box(14, 22, 78, 40)}${t(53, 38, l('MANUFACTURER', 'HERSTELLER'), { fill: D, size: 7, anchor: 'middle' })}${t(53, 51, l('sells at $100', 'verkauft für 100 $'), { size: 6.5, anchor: 'middle' })}
    ${arrow(92, 42, 120)}
    ${box(120, 22, 80, 40)}${t(160, 38, 'DISTRIBUTOR', { fill: D, size: 7, anchor: 'middle' })}${t(160, 51, l('sells at $90', 'verkauft für 90 $'), { size: 6.5, anchor: 'middle' })}
    ${arrow(200, 42, 228)}
    ${box(228, 22, 78, 40)}${t(267, 38, l('END CUSTOMER', 'ENDKUNDE'), { fill: D, size: 7, anchor: 'middle' })}${t(267, 51, l('> 1,000 units', '> 1.000 Stück'), { size: 6.5, anchor: 'middle' })}
    <path d="M160 62V80" stroke="${C}" stroke-width="1.3" stroke-dasharray="3 2"/>${t(168, 76, l('claim: $10 per unit', 'Anspruch: 10 $ pro Stück'), { fill: C, size: 7 })}
    ${box(96, 84, 128, 44, C)}${t(160, 98, l('VALIDATION', 'PRÜFUNG'), { fill: D, size: 7, anchor: 'middle' })}
    ${check(106, 104)}${t(118, 110, l('rules, terms, stock', 'Regeln, Konditionen, Bestand'), { size: 6 })}${cross(110, 120)}${t(118, 124, l('duplicates, quantity', 'Dubletten, Menge'), { size: 6 })}
    ${arrow(224, 106, 248)}${box(248, 92, 58, 28)}${t(277, 104, 'ERP', { fill: D, size: 7, anchor: 'middle' })}${t(277, 114, l('credit note', 'Gutschrift'), { size: 6.5, anchor: 'middle' })}
    ${tag(14, 136, 150, l('add-on: $30,000 / org / year', 'Add-on: 30.000 $ / Org / Jahr'))}${t(172, 150, l('+ partner access', '+ Partnerzugang'), { size: 7 })}`,

  'field-service-enhanced-scheduling-eso': (l) => `
    ${box(18, 26, 112, 96)}${t(74, 42, l('OLDER ENGINE', 'ÄLTERE ENGINE'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('100 skills per resource', '100 Skills pro Ressource'), l('scheduling recipes', 'Scheduling Recipes'), 'Optimization Insights', 'Classic Dispatch Console']
      .map((s, i) => t(28, 60 + i * 16, s, { size: 6.5 })).join('')}
    ${arrow(130, 74, 190, C)}${t(160, 66, l('per territory', 'pro Gebiet'), { fill: C, size: 6.8, anchor: 'middle' })}
    ${box(190, 26, 112, 96, C)}${t(246, 42, l('ENHANCED (ESO)', 'ENHANCED (ESO)'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('250 skills', '250 Skills'), 'Fix Schedule Overlaps', 'Optimization Hub', 'Scheduling Console']
      .map((s, i) => check(200, 55 + i * 16, i === 3 ? C : G) + t(212, 60 + i * 16, s, { fill: i === 3 ? C : G, size: 6.5 })).join('')}
    ${tag(18, 132, 112, l('pilot territory first', 'erst ein Pilotgebiet'))}${t(140, 145, l('new orgs: on by default', 'neue Orgs: ab Werk aktiv'), { size: 7 })}`,

  'field-service-scheduling-console': (l) => `
    ${box(18, 18, 284, 104)}${t(28, 32, 'SCHEDULING CONSOLE', { fill: D, size: 7.5 })}
    ${box(26, 40, 66, 74)}${t(59, 54, l('LIST', 'LISTE'), { fill: D, size: 7, anchor: 'middle' })}
    ${[0, 1, 2].map((i) => `<path d="M34 ${68 + i * 14}H84" stroke="${G}" stroke-width="1"/>`).join('')}
    ${box(98, 40, 130, 74)}${t(163, 54, 'GANTT', { fill: D, size: 7, anchor: 'middle' })}
    ${[0, 1, 2].map((i) => `<path d="M104 ${70 + i * 14}H222" stroke="${L}"/><rect x="${110 + i * 26}" y="${64 + i * 14}" width="${30 + (i % 2) * 14}" height="9" rx="2" fill="#fff" stroke="${i === 1 ? C : G}" stroke-width="1.2"/>`).join('')}
    ${t(192, 81, 'Why?', { fill: C, size: 7 })}
    ${box(234, 40, 60, 74)}${t(264, 54, l('MAP', 'KARTE'), { fill: D, size: 7, anchor: 'middle' })}${pin(254, 100)}${pin(278, 88)}
    ${t(18, 138, l('only with Enhanced Scheduling and Optimization', 'nur mit Enhanced Scheduling and Optimization'), { size: 7 })}
    ${t(18, 152, l('Classic Dispatch Console stays usable in parallel', 'Classic Dispatch Console parallel nutzbar'), { size: 7 })}`,

  'manufacturing-cloud-account-manager-targets': (l) => `
    ${box(14, 22, 92, 30)}${t(60, 36, l('HEAD OF SALES', 'VERTRIEBSLEITUNG'), { fill: D, size: 7, anchor: 'middle' })}${t(60, 46, l('yearly target', 'Jahresziel'), { size: 6.5, anchor: 'middle' })}
    <path d="M60 52V62M28 62H92M28 62V72M60 62V72M92 62V72" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${[['35 %', 28], ['35 %', 60], ['30 %', 92]].map(([s, x]) => box(Number(x) - 14, 72, 28, 18) + t(Number(x), 84, String(s), { size: 7, anchor: 'middle' })).join('')}
    ${arrow(110, 81, 140, C)}
    ${box(140, 22, 164, 98)}${t(150, 36, l('DISTRIBUTION', 'VERTEILUNG'), { fill: D, size: 7 })}
    ${[[l('by account', 'nach Kunde'), l('amount', 'Betrag'), false], [l('by product', 'nach Produkt'), l('amount / list price', 'Betrag / Listenpreis'), true], [l('by month', 'nach Monat'), l('12 equal shares', '12 gleiche Teile'), false]]
      .map(([a, b, hit], i) => check(150, 46 + i * 22, hit ? C : G) + t(164, 52 + i * 22, String(a), { fill: hit ? C : G, size: 7 }) + t(296, 52 + i * 22, String(b), { size: 6.5, anchor: 'end' })).join('')}
    ${t(14, 112, l('reorg:', 'Umorganisation:'), { fill: D, size: 7 })}${cross(22, 126)}${t(32, 130, l('invalid', 'ungültig'), { size: 7 })}
    ${tag(14, 136, 290, l('target, forecast, actuals: one customer and product level', 'Ziel, Prognose, Ist: eine Kunden- und Produktebene'))}`,

  'manufacturing-cloud-add-ons-costs': (l) => `
    ${t(18, 18, l('SCENARIO: 150 USERS, 400 DEALERS, LIST USD / YEAR', 'SZENARIO: 150 NUTZER, 400 HÄNDLER, LISTE USD / JAHR'), { fill: D, size: 7 })}
    <rect x="18" y="28" width="203" height="16" rx="2" fill="#fff" stroke="${G}" stroke-width="1.1"/>
    <rect x="221" y="28" width="81" height="16" rx="2" fill="${C}" fill-opacity="0.18" stroke="${C}" stroke-width="1.1"/>
    ${t(120, 39.5, l('Sales Core 495K', 'Sales Core 495K'), { size: 7, anchor: 'middle' })}${t(262, 39.5, '+198K', { fill: C, size: 7.5, anchor: 'middle' })}
    ${[[l('Portal, 100 members + 300 logins', 'Portal, 100 Mitglieder + 300 Logins'), '132K'], [l('Agentforce add-on, 20 users', 'Agentforce-Add-on, 20 Nutzer'), '36K'], ['Channel Revenue Mgmt', '30K']]
      .map(([s, v], i) => `<path d="M221 ${58 + i * 14}H302" stroke="${L}"/>` + dot(225, 54 + i * 14, C, 2.2) + t(232, 57 + i * 14, String(v), { fill: C, size: 7 }) + t(214, 57 + i * 14, String(s), { size: 6.8, anchor: 'end' })).join('')}
    ${tag(18, 98, 112, l('+40 % on licences', '+40 % auf Lizenzen'))}
    <path d="M18 128H302" stroke="${L}"/>
    ${t(18, 140, l('optional: Connected Assets 180K, Omnistudio +2M calls 120K', 'optional: Connected Assets 180K, Omnistudio +2 Mio. Aufrufe 120K'), { size: 7 })}
    ${cross(22, 150)}${t(32, 154, l('Manufacturing Intelligence: $220/login or "from $165"?', 'Manufacturing Intelligence: 220 $/Login oder „ab 165 $“?'), { size: 7 })}`,

  'manufacturing-cloud-installed-base-assets': (l) => `
    ${[['ERP', l('delivery', 'Lieferung')], [l('DEALER', 'HÄNDLER'), l('registration', 'Registrierung')], ['SERVICE', l('commissioning', 'Inbetriebnahme')]]
      .map(([h, s], i) => box(18, 18 + i * 42, 80, 32) + t(58, 31 + i * 42, String(h), { fill: D, size: 7.5, anchor: 'middle' }) + t(58, 43 + i * 42, String(s), { size: 7, anchor: 'middle' }) + arrow(98, 34 + i * 42, 128, i === 1 ? C : G)).join('')}
    ${box(128, 26, 76, 100, C)}${t(166, 44, 'ASSET', { fill: D, size: 8, anchor: 'middle' })}
    ${[l('serial number', 'Seriennummer'), l('product', 'Produkt'), l('owner, location', 'Betreiber, Ort'), l('warranty start', 'Garantiebeginn')].map((s, i) => `<path d="M136 ${52 + i * 18}H196" stroke="${L}"/>` + t(138, 64 + i * 18, s, { size: 7 })).join('')}
    ${t(216, 26, l('MILESTONES', 'MEILENSTEINE'), { fill: D, size: 7.5 })}
    <path d="M222 40V100" stroke="${G}" stroke-width="1.2"/>${dot(222, 40, G, 3)}${dot(222, 70, C, 3.5)}${dot(222, 100, G, 3)}
    ${t(232, 43, l('manufactured', 'Fertigung'), { size: 7 })}${t(232, 73, l('registered', 'Registrierung'), { fill: C, size: 7 })}${t(232, 84, 'Stage: Tentative', { fill: C, size: 6.5 })}${t(232, 103, l('installed', 'Installation'), { size: 7 })}
    ${tag(212, 122, 94, l('since API 58.0', 'seit API 58.0'))}`,

  'manufacturing-cloud-partner-visit-management': (l) => `
    <path d="M30 120L64 92L96 104" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${pin(64, 92)}${pin(96, 104, C)}${t(96, 120, l('dealer', 'Händler'), { size: 7, anchor: 'middle' })}
    ${t(14, 30, l('60 dealers × 4 visits', '60 Händler × 4 Besuche'), { fill: D, size: 7 })}${t(14, 44, l('= 240 visits / year', '= 240 Besuche / Jahr'), { size: 7 })}
    ${box(136, 14, 170, 122)}${t(146, 28, l('5 KPIs PER VISIT', '5 KENNZAHLEN PRO BESUCH'), { fill: D, size: 7 })}${t(296, 28, l('type', 'Typ'), { size: 6.5, anchor: 'end' })}
    ${[[l('spare parts stock', 'Ersatzteilbestand'), l('integer', 'Ganzzahl')], [l('trained mechanics', 'geschulte Mechaniker'), l('integer', 'Ganzzahl')], [l('demo machines', 'Vorführmaschinen'), l('integer', 'Ganzzahl')], [l('open claims > 30 d', 'Ansprüche > 30 T.'), l('integer', 'Ganzzahl')], [l('target reached', 'Ziel erreicht'), l('percentage', 'Prozent')]]
      .map(([a, b], r) => `<path d="M146 ${34 + r * 17}H296" stroke="${L}"/>` + t(146, 46 + r * 17, String(a), { size: 6.8 }) + t(296, 46 + r * 17, String(b), { size: 6.5, anchor: 'end' })).join('')}
    ${t(221, 128, l('expected vs actual', 'Soll gegen Ist'), { fill: C, size: 7.5, anchor: 'middle' })}
    ${t(14, 152, l('licence and offline use: ask Salesforce', 'Lizenz und Offline: Salesforce fragen'), { size: 7 })}`,

  'manufacturing-cloud-product-service-campaigns': (l) => `
    ${box(18, 50, 76, 42)}${t(56, 67, l('CAUSAL PART', 'VERURSACHER'), { fill: D, size: 7, anchor: 'middle' })}${t(56, 81, l('valve batch', 'Ventilcharge'), { size: 7, anchor: 'middle' })}
    ${arrow(94, 71, 116, C)}
    ${Array.from({ length: 54 }, (_, k) => { const c = k % 9, r = Math.floor(k / 9); const hit = c < 5 && r > 0 && r < 5; return hit ? `<circle cx="${124 + c * 10}" cy="${32 + r * 16}" r="3" fill="${C}"/>` : dot(124 + c * 10, 32 + r * 16, L, 2.5); }).join('')}
    ${t(124, 130, l('one item per asset', 'ein Posten pro Asset'), { fill: C, size: 7 })}
    ${t(220, 30, l('DATA MODEL', 'DATENMODELL'), { fill: D, size: 7.5 })}
    ${[[l('Campaign', 'Kampagne'), 'API 51.0'], [l('Definitions', 'Definitionen'), 'API 65.0'], [l('Serial range', 'Serienbereich'), l('batch', 'Charge')], [l('Unsold stock', 'Unverkauft'), 'Partner']]
      .map(([a, b], i) => `<path d="M220 ${38 + i * 18}H304" stroke="${L}"/>` + t(220, 50 + i * 18, String(a), { size: 6.5 }) + t(304, 50 + i * 18, String(b), { size: 6.5, anchor: 'end' })).join('')}
    ${t(18, 108, 'Notation · Repair · Replace', { fill: C, size: 6 })}`,

  'manufacturing-cloud-service-vs-service-cloud': (l) => `
    ${t(18, 20, l('LIST PRICE PER USER AND MONTH', 'LISTENPREIS PRO NUTZER UND MONAT'), { fill: D, size: 7.5 })}
    ${[[l('Service Cloud Ent. (legacy)', 'Service Cloud Ent. (bisher)'), 175, false], ['Service Cloud Core', 195, false], ['Mfg Cloud Service Core', 275, true]]
      .map(([n, p, a], i) => t(18, 44 + i * 22, String(n), { size: 7 }) + `<rect x="136" y="${35 + i * 22}" width="${Number(p) * 0.5}" height="12" rx="2" fill="${a ? C : L}" stroke="${a ? C : G}" stroke-width="1"/>` + t(142 + Number(p) * 0.5, 44 + i * 22, '$' + p, { fill: a ? C : G, size: 7.5 })).join('')}
    ${tag(18, 112, 110, l('+$80 to $100', '+$80 bis $100'))}
    ${t(146, 118, l('hotline: Service Cloud', 'Hotline: Service Cloud'), { size: 7 })}
    ${t(146, 132, l('warranty, recalls: Mfg Cloud', 'Garantie, Rückrufe: Mfg Cloud'), { fill: C, size: 7 })}`,

  'revenue-cloud-sap-system-boundaries': (l) => `
    ${box(18, 26, 104, 96)}${t(70, 42, 'REVENUE CLOUD', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('catalog', 'Katalog'), l('configurator', 'Konfigurator'), l('quote', 'Angebot'), l('approval', 'Freigabe')].map((s, i) => t(30, 60 + i * 15, s, { size: 7 })).join('')}
    ${box(206, 26, 96, 96)}${t(254, 42, 'SAP S/4HANA', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('material master', 'Materialstamm'), l('conditions', 'Konditionen'), l('sales order', 'Kundenauftrag'), l('machine invoice', 'Maschinenrechnung')].map((s, i) => t(216, 60 + i * 15, s, { size: 7 })).join('')}
    <path d="M206 50H123" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M128 46.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(164, 45, l('list prices', 'Listenpreise'), { size: 7, anchor: 'middle' })}
    <path d="M206 72H123" stroke="${G}" stroke-width="1.3"/><path d="M128 68.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(164, 67, l('net price live', 'Nettopreis live'), { size: 7, anchor: 'middle' })}
    ${arrow(122, 94, 206, C)}${t(164, 89, l('order', 'Auftrag'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M206 114H123" stroke="${G}" stroke-width="1.3"/><path d="M128 110.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(164, 109, l('order no. · status', 'Auftragsnr. · Status'), { size: 6.3, anchor: 'middle' })}
    ${tag(18, 132, 92, l('3 cuts', '3 Schnitte'))}${t(120, 145, l('Billing: subledger, journals to SAP', 'Billing: Nebenbuch, Buchungen an SAP'), { size: 7 })}`,

  'manufacturing-cloud-erp-integration': (l) => `
    ${box(14, 30, 78, 92)}${t(53, 70, 'SAP', { fill: D, size: 8, anchor: 'middle' })}${t(53, 83, 'S/4HANA', { size: 7, anchor: 'middle' })}
    ${box(228, 30, 78, 92)}${t(267, 70, 'MANUFACTURING', { fill: D, size: 7, anchor: 'middle' })}${t(267, 83, 'CLOUD', { fill: D, size: 7, anchor: 'middle' })}
    ${arrow(92, 50, 228)}${t(160, 45, l('accounts · products', 'Accounts · Produkte'), { size: 7, anchor: 'middle' })}
    ${arrow(92, 68, 228)}${t(160, 63, l('orders as actuals · daily', 'Aufträge als Ist · täglich'), { size: 7, anchor: 'middle' })}
    ${arrow(92, 86, 228)}${t(160, 81, l('stock · daily', 'Lagerbestand · täglich'), { size: 7, anchor: 'middle' })}
    <path d="M228 106H93" stroke="${C}" stroke-width="1.4"/><path d="M98 102.5l-5 3.5 5 3.5" fill="none" stroke="${C}" stroke-width="1.4"/>${t(160, 101, l('credit memos: rebates, warranty', 'Gutschriften: Boni, Garantie'), { fill: C, size: 6.8, anchor: 'middle' })}
    <path d="M14 134H306" stroke="${L}"/>
    ${t(14, 150, l('SOAP login() needs Use Any API Auth from 1 Dec 2026', 'SOAP login() braucht Use Any API Auth ab 01.12.2026'), { size: 7 })}`,

  'manufacturing-cloud-feature-map': (l) => `
    ${t(18, 18, l('ONE LICENCE, ONE SWITCH PER FEATURE', 'EINE LIZENZ, EIN SCHALTER PRO FUNKTION'), { fill: D, size: 7 })}
    ${[
      { h: l('SALES', 'VERTRIEB'), items: ['Sales Agreements', l('Adv. forecasting', 'Adv. Forecasting'), l('Programs', 'Programme'), 'Targets'] },
      { h: 'SERVICE', items: [l('Warranty', 'Garantie'), l('Campaigns', 'Kampagnen'), 'Asset console', 'Prework'] },
      { h: l('CHANNEL', 'KANAL'), items: ['Rebates', 'Partner leads', l('Partner visits', 'Partnerbesuche'), 'Ship and debit'] },
    ].map((col, c) => box(18 + c * 96, 28, 92, 92) + t(26 + c * 96, 42, col.h, { fill: D, size: 7 })
      + col.items.map((s, r) => {
        const x = 26 + c * 96;
        const y = 58 + r * 16;
        const extra = c === 2 && r === 3;
        return (extra
          ? `<rect x="${x - 4}" y="${y - 9}" width="80" height="13" rx="3" fill="none" stroke="${C}" stroke-width="1.1" stroke-dasharray="3 2"/>`
          : `<rect x="${x}" y="${y - 6}" width="12" height="7" rx="3.5" fill="#fff" stroke="${G}" stroke-width="1"/><circle cx="${x + 8.5}" cy="${y - 2.5}" r="2" fill="${G}"/>`)
          + t(x + (extra ? 0 : 16), y, s, { fill: extra ? C : G, size: 6.5 });
      }).join('')).join('')}
    ${t(18, 138, l('IndustriesManufacturingSettings: all false by default', 'IndustriesManufacturingSettings: alle standardmäßig false'), { size: 7 })}
    ${t(18, 152, l('dashed: Channel Revenue Mgmt add-on, $30,000/org/yr', 'gestrichelt: Add-on Channel Revenue Mgmt, 30.000 $/Org/Jahr'), { fill: C, size: 7 })}`,

  'penny-perfect-pricing-erp-prices': (l) => `
    ${t(14, 22, l('SAP CONDITION TECHNIQUE', 'SAP-KONDITIONSTECHNIK'), { fill: D, size: 7 })}${t(182, 22, 'PENNY PERFECT PRICING', { fill: D, size: 7 })}
    ${box(14, 30, 116, 84)}${box(182, 30, 124, 84, C)}
    ${[[l('pricing procedure', 'Kalkulationsschema'), 'Calculation Schema'], [l('condition type', 'Konditionsart'), 'Pricing Specification'], [l('access sequence', 'Zugriffsfolge'), 'Search Strategy'], [l('condition record', 'Konditionssatz'), 'External Pricing Key Value']]
      .map(([a, b], i) => t(22, 50 + i * 18, a, { size: 7 }) + `<path d="M126 ${47 + i * 18}H186" stroke="${G}" stroke-width="1" stroke-dasharray="3 3"/>` + t(190, 50 + i * 18, b, { size: 7 })).join('')}
    ${t(14, 136, l('decide one price master first', 'zuerst einen Preis-Master festlegen'), { fill: C, size: 7.5 })}
    ${t(14, 151, l("API 68.0 · Winter '27 · telesales orders", "API 68.0 · Winter '27 · Telesales-Aufträge"), { size: 7 })}`,

  'commerce-advanced-pricing-revenue-cloud': (l) => `
    ${t(18, 24, l('LICENCES', 'LIZENZEN'), { fill: D, size: 7 })}
    ${tag(18, 32, 112, 'Commerce Growth/Adv.')}${t(139, 46, '+', { fill: D, size: 10, anchor: 'middle' })}${tag(148, 32, 118, 'Revenue Cloud Adv.')}
    ${[l('List price', 'Listenpreis'), l('Contract', 'Vertragspreis'), l('Volume tier', 'Mengenstaffel'), l('Net price', 'Nettopreis')].map((s, i) => box(18 + i * 76, 74, 60, 30, i === 3 ? C : G) + t(48 + i * 76, 92, s, { fill: i === 3 ? C : G, size: 6.5, anchor: 'middle' })).join('')}
    ${arrow(78, 89, 94)}${arrow(154, 89, 170)}${arrow(230, 89, 246, C)}
    ${t(18, 122, 'Pricing Procedure', { size: 7 })}
    ${check(18, 136)}${t(32, 143, l('one logic for quote, order and store', 'eine Logik für Angebot, Auftrag und Shop'), { fill: C, size: 7 })}`,

  'commerce-aura-to-lwr-migration': (l) => `
    ${box(14, 30, 112, 92)}${t(70, 48, l('AURA STORE', 'AURA-STORE'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(24, 66, l('Aura components', 'Aura-Komponenten'), { size: 7 })}${t(24, 82, l('checkout flow', 'Checkout-Flow'), { size: 7 })}${t(24, 98, l('own CSS classes', 'eigene CSS-Klassen'), { size: 7 })}${t(24, 114, l('cart = record page', 'Warenkorb = Record Page'), { size: 7 })}
    ${arrow(126, 76, 196, C)}${t(160, 68, l('new store', 'neuer Store'), { fill: C, size: 7, anchor: 'middle' })}${t(160, 92, l('no tool', 'kein Tool'), { size: 7, anchor: 'middle' })}
    ${box(196, 30, 104, 92, C)}${t(248, 48, l('LWR STORE', 'LWR-STORE'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${check(206, 61)}${t(218, 66, l('LWC only', 'nur LWC'), { size: 7 })}${check(206, 77)}${t(218, 82, 'Commerce Checkout', { size: 7 })}${check(206, 93)}${t(218, 98, '--dxp hooks', { size: 7 })}${check(206, 109)}${t(218, 114, 'named page', { size: 7 })}
    ${tag(14, 132, 150, l('no retirement date', 'kein Abschaltdatum'))}${t(180, 145, l('as of 27.10.2026', 'Stand 27.10.2026'), { size: 7 })}`,

  'commerce-business-case': (l) => `
    ${t(18, 18, l('3 YEARS · 40,000 LINES · 2 % GMV (ASSUMED)', '3 JAHRE · 40.000 POSITIONEN · 2 % GMV (ANNAHME)'), { fill: D, size: 7 })}
    <path d="M40 132H300" stroke="${G}" stroke-width="1"/>
    ${[[48700, 112000], [97300, 173500], [136300, 229000]].map(([s, c], i) => {
      const x = 60 + i * 84, hs = s / 2900, hc = c / 2900;
      return `<rect x="${x}" y="${132 - hs}" width="22" height="${hs}" fill="#fff" stroke="${C}" stroke-width="1.3"/><rect x="${x + 26}" y="${132 - hc}" width="22" height="${hc}" fill="#fff" stroke="${G}" stroke-width="1.3"/>` + t(x + 24, 143, l('year ' + (i + 1), 'Jahr ' + (i + 1)), { size: 7, anchor: 'middle' });
    }).join('')}
    <rect x="18" y="28" width="8" height="8" fill="#fff" stroke="${C}"/>${t(30, 35, l('savings', 'Ersparnis'), { fill: C, size: 7 })}
    <rect x="90" y="28" width="8" height="8" fill="#fff" stroke="${G}"/>${t(102, 35, l('costs', 'Kosten'), { size: 7 })}
    ${t(18, 153, l('savings cover 37 %, the rest is new revenue', 'Ersparnis deckt 37 %, der Rest ist Mehrumsatz'), { fill: C, size: 7 })}`,

  'commerce-buyer-agent-whatsapp': (l) => `
    ${box(16, 22, 88, 116)}<rect x="21" y="34" width="78" height="18" rx="4" fill="#fff" stroke="${G}" stroke-width="1"/>${t(60, 46, l('order status?', 'Auftragsstatus?'), { size: 7, anchor: 'middle' })}
    <rect x="21" y="58" width="78" height="18" rx="4" fill="#fff" stroke="${C}" stroke-width="1.2"/>${t(60, 70, l('same as last time', 'wie letztes Mal'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(60, 96, l('web chat', 'Web-Chat'), { size: 7, anchor: 'middle' })}${t(60, 110, 'WhatsApp · SMS', { size: 7, anchor: 'middle' })}${t(60, 128, l('dealer', 'Händler'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${arrow(104, 62, 126, C)}
    ${box(126, 22, 102, 96, C)}${t(177, 38, 'BUYER AGENT', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('product search', 'Produktsuche'), l('order status', 'Auftragsstatus'), l('reorder', 'Nachbestellung'), l('switch account', 'Accountwechsel'), l('verify user', 'Nutzer prüfen')].map((s, i) => check(134, 48 + i * 14, i === 2 ? C : G) + t(146, 54 + i * 14, s, { size: 7 })).join('')}
    ${arrow(228, 62, 252)}
    ${box(252, 40, 56, 44)}${t(280, 58, l('STORE', 'SHOP'), { fill: D, size: 7.5, anchor: 'middle' })}${t(280, 72, 'ERP', { size: 7, anchor: 'middle' })}
    ${t(280, 98, l('price, credit', 'Preis, Kredit'), { size: 7, anchor: 'middle' })}${t(280, 110, l('from code', 'aus Code'), { size: 7, anchor: 'middle' })}
    ${tag(234, 124, 76, 'Carter 01/2027')}`,

  'commerce-buyer-groups-entitlements': (l) => `
    ${t(18, 18, l('WHO SEES WHICH PRODUCT', 'WER SIEHT WELCHES PRODUKT'), { fill: D, size: 7 })}
    ${box(18, 30, 70, 36)}${t(53, 46, l('BUYER ACCOUNT', 'KÄUFERACCOUNT'), { fill: D, size: 7, anchor: 'middle' })}${t(53, 58, l('max 20 groups', 'max. 20 Gruppen'), { size: 7, anchor: 'middle' })}
    ${arrow(88, 48, 104)}
    ${box(104, 30, 102, 36, C)}${t(155, 46, 'BUYER GROUP', { fill: C, size: 7, anchor: 'middle' })}${t(155, 58, l('country · tier · brand', 'Land · Stufe · Marke'), { size: 7, anchor: 'middle' })}
    ${arrow(206, 40, 218)}${arrow(206, 58, 218)}
    ${box(218, 26, 86, 20)}${t(261, 39, 'entitlement policy', { size: 7, anchor: 'middle' })}
    ${box(218, 50, 86, 20)}${t(261, 63, l('price book', 'Preisbuch'), { size: 7, anchor: 'middle' })}
    ${t(304, 82, l('max 200 groups per policy', 'max. 200 Gruppen je Policy'), { size: 6.5, anchor: 'end' })}
    <path d="M18 98H302" stroke="${L}"/>
    ${t(18, 114, l('Scenario: 800 dealers, 12 countries, 3 tiers', 'Szenario: 800 Händler, 12 Länder, 3 Stufen'), { fill: D, size: 7.5 })}
    ${cross(24, 130)}${t(34, 133, l('1 group per dealer: 800 groups per part', '1 Gruppe pro Händler: 800 Gruppen je Teil'), { size: 7 })}
    ${check(20, 143)}${t(34, 147, l('country x tier: 36 groups, limit 2,000 per part', 'Land x Stufe: 36 Gruppen, Grenze 2.000 je Teil'), { fill: C, size: 7 })}`,

  'commerce-buyer-licences': (l) => `
    ${t(18, 20, l('B2B COMMERCE LICENCES', 'B2B-COMMERCE-LIZENZEN'), { fill: D, size: 7.5 })}
    ${[[l('Buyer', 'Käufer'), 'Customer Community Plus', C], ['Buyer Manager', 'Customer Community Plus', C], ['Merchandiser', 'B2B and D2C Commerce', G], [l('Developer', 'Entwickler'), l('Full licence', 'Volle Lizenz'), G]]
      .map(([r, lic, c], i) => `<path d="M18 ${36 + i * 22}H190" stroke="${L}"/>` + t(22, 50 + i * 22, String(r), { size: 7.5 }) + t(186, 50 + i * 22, String(lic), { fill: String(c), size: 7, anchor: 'end' })).join('')}
    ${box(206, 30, 96, 58)}${t(254, 46, l('PER MONTH', 'PRO MONAT'), { fill: D, size: 7, anchor: 'middle' })}
    ${t(214, 62, l('Member', 'Mitglied'), { size: 7 })}${t(294, 62, l('$35', '35 €'), { fill: C, size: 7.5, anchor: 'end' })}
    ${t(214, 78, 'Login', { size: 7 })}${t(294, 78, l('$15', '15 €'), { size: 7.5, anchor: 'end' })}
    <path d="M206 128H302" stroke="${G}" stroke-width="0.8"/>${dot(222, 128, G, 2.5)}${dot(254, 128, C, 3.5)}${dot(286, 128, G, 2.5)}
    ${t(254, 118, l('break-even', 'Schwelle'), { fill: C, size: 7, anchor: 'middle' })}${t(254, 144, l('3 login days', '3 Login-Tage'), { fill: C, size: 7, anchor: 'middle' })}
    ${tag(18, 128, 172, l('50,000 portal roles by default', 'Standard: 50.000 Portalrollen'))}`,

  'commerce-checkout-purchase-order': (l) => `
    ${box(18, 58, 64, 44)}${t(50, 77, l('CART', 'WARENKORB'), { fill: D, size: 7.5, anchor: 'middle' })}${t(50, 90, 'checkout', { size: 7, anchor: 'middle' })}
    <path d="M82 72C100 72 100 40 116 40" fill="none" stroke="${C}" stroke-width="1.4"/><path d="M82 88C100 88 100 120 116 120" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${box(116, 26, 78, 28, C)}${t(155, 44, l('PO number', 'Bestellnummer'), { fill: C, size: 7.5, anchor: 'middle' })}
    ${box(116, 106, 78, 28)}${t(155, 124, l('Card · gateway', 'Karte · Gateway'), { size: 7.5, anchor: 'middle' })}
    ${arrow(194, 40, 222, C)}
    ${box(222, 22, 82, 36, C)}${t(263, 37, 'validate()', { fill: C, size: 7.5, anchor: 'middle' })}${t(263, 50, l('ERP credit check', 'ERP-Kreditprüfung'), { size: 7, anchor: 'middle' })}
    <path d="M263 58V76M194 120H263V96" fill="none" stroke="${G}" stroke-width="1.2"/>
    ${tag(228, 76, 70, l('order', 'Bestellung'))}
    ${cross(24, 140)}${t(34, 143, l('neither PO nor payment: no order', 'weder PO noch Zahlung: keine Bestellung'), { size: 7 })}`,

  'commerce-customer-prices': (l) => `
    ${box(18, 20, 104, 58)}${t(70, 36, l('PRICE BOOKS', 'PREISBÜCHER'), { fill: D, size: 7.5, anchor: 'middle' })}${t(70, 50, l('5 per store', '5 je Store'), { size: 7, anchor: 'middle' })}${t(70, 63, l('25 per call · hard', '25 je Aufruf · hart'), { size: 7, anchor: 'middle' })}
    ${box(18, 96, 104, 44, C)}${t(70, 114, 'SAP', { fill: D, size: 8, anchor: 'middle' })}${t(70, 128, l('conditions · live', 'Konditionen · live'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M122 49C140 49 140 72 156 72" fill="none" stroke="${G}" stroke-width="1.3"/><path d="M122 118C140 118 140 88 156 88" fill="none" stroke="${C}" stroke-width="1.4"/>
    ${box(156, 58, 84, 44, C)}${t(198, 76, 'Pricing', { fill: D, size: 7.5, anchor: 'middle' })}${t(198, 89, 'Service', { fill: D, size: 7.5, anchor: 'middle' })}
    ${arrow(240, 80, 262, C)}${tag(262, 70, 44, l('price', 'Preis'))}
    ${t(156, 124, 'Best Price · Priority Price', { size: 7 })}
    ${t(156, 138, l('decide the price master first', 'Preis-Master zuerst festlegen'), { fill: C, size: 7 })}`,

  'commerce-dealer-rollout': (l) => `
    ${t(20, 22, l('BUYER GROUPS IN WAVES', 'BUYER GROUPS IN WELLEN'), { fill: D, size: 7.5 })}
    ${[[l('Wave 1', 'Welle 1'), l('15 pilot dealers', '15 Pilothändler')], [l('Wave 2', 'Welle 2'), l('3 groups by tier', '3 Gruppen je Stufe')], [l('Wave 3', 'Welle 3'), l('AT, CH, key accounts', 'AT, CH, Großkunden')]]
      .map(([a, b], i) => box(20 + i * 98, 34 + i * 20, 86, 40, i === 0 ? C : G) + t(63 + i * 98, 51 + i * 20, a, { fill: D, size: 7.5, anchor: 'middle' }) + t(63 + i * 98, 65 + i * 20, b, { size: 6.5, anchor: 'middle' })).join('')}
    ${arrow(106, 54, 118)}${arrow(204, 74, 216)}
    ${t(20, 118, l('test per wave as a real buyer:', 'Test je Welle als echter Käufer:'), { size: 7 })}
    ${[l('entitlements', 'Entitlements'), l('prices', 'Preise'), l('stock', 'Bestand'), 'checkout'].map((s, i) => check(20 + i * 70, 128) + t(32 + i * 70, 134, s, { size: 7 })).join('')}
    ${t(20, 152, l('buyer manager admins own users', 'Buyer Manager verwaltet eigene Benutzer'), { fill: C, size: 7 })}`,

  'commerce-extensions-custom-code': (l) => `
    ${box(18, 22, 120, 56)}${t(78, 40, 'PricingService', { fill: D, size: 7.5, anchor: 'middle' })}${t(78, 54, l('Salesforce standard', 'Salesforce-Standard'), { size: 7, anchor: 'middle' })}${t(78, 67, l('price books', 'Preisbücher'), { size: 7, anchor: 'middle' })}
    ${box(18, 96, 120, 44, C)}${t(78, 114, l('YOUR EXTENSION', 'IHRE EXTENSION'), { fill: C, size: 7.5, anchor: 'middle' })}${t(78, 128, l('+ ERP discount', '+ ERP-Rabatt'), { size: 7, anchor: 'middle' })}
    <path d="M78 96V79" stroke="${C}" stroke-width="1.3"/><path d="M74.5 84l3.5-5 3.5 5" fill="none" stroke="${C}" stroke-width="1.3"/>${t(84, 90, 'super()', { fill: C, size: 7 })}
    ${box(182, 22, 120, 118)}${t(242, 38, l('CLIENT REPO', 'KUNDEN-REPO'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('Apex class + tests', 'Apex-Klasse + Tests'), 'extension:register', 'extension:map', l('pull request review', 'Pull-Request-Review')]
      .map((s, i) => check(192, 52 + i * 18, i === 2 ? C : G) + t(206, 58 + i * 18, s, { size: 7 })).join('')}
    ${arrow(138, 118, 182)}${cross(24, 151)}${t(34, 154, l('payments: no extension', 'Zahlungen: keine Extension'), { size: 7 })}`,

  'commerce-gmv-pricing': (l) => `
    ${t(18, 18, l('STORE REVENUE', 'STORE-UMSATZ'), { fill: D, size: 7 })}
    <rect x="18" y="26" width="284" height="22" rx="4" fill="#fff" stroke="${G}" stroke-width="1.2"/>
    <rect x="18" y="26" width="206" height="22" rx="4" fill="#fff" stroke="${C}" stroke-width="1.4"/>
    ${t(121, 40.5, 'GMV', { fill: C, size: 7.5, anchor: 'middle' })}${t(263, 40.5, l('tax, shipping', 'Steuer, Versand'), { size: 6.5, anchor: 'middle' })}
    ${t(18, 64, l('% of GMV: not published', '% vom GMV: nicht veröffentlicht'), { fill: C, size: 7 })}
    ${box(18, 76, 136, 66)}${t(28, 92, 'GROWTH', { fill: D, size: 7.5 })}${t(28, 106, l('6 storefronts', '6 Storefronts'), { size: 7 })}${t(28, 119, 'Order Management Lite', { size: 7 })}${t(28, 132, l('250K Data Cloud credits', '250.000 Data-Cloud-Credits'), { size: 7 })}
    ${box(166, 76, 136, 66)}${t(176, 92, 'ADVANCED', { fill: D, size: 7.5 })}${t(176, 106, l('10 storefronts', '10 Storefronts'), { size: 7 })}${t(176, 119, l('full Order Management', 'volles Order Management'), { size: 7 })}${t(176, 132, l('500K Data Cloud credits', '500.000 Data-Cloud-Credits'), { size: 7 })}
    ${t(160, 153, l('+ buyer licences, Revenue Cloud, implementation', '+ Käuferlizenzen, Revenue Cloud, Umsetzung'), { size: 7, anchor: 'middle' })}`,

  'commerce-headless-b2b': (l) => `
    ${box(18, 18, 92, 30)}${t(64, 37, l('LWR STORE', 'LWR-STORE'), { fill: D, anchor: 'middle' })}
    ${box(18, 64, 92, 30, C)}${t(64, 83, l('OWN WEBSITE', 'EIGENE WEBSITE'), { fill: C, anchor: 'middle' })}
    ${box(18, 110, 92, 30)}${t(64, 129, l('CUSTOMER APP', 'KUNDEN-APP'), { fill: D, anchor: 'middle' })}
    ${arrow(110, 33, 196)}${arrow(110, 79, 196, C)}${arrow(110, 125, 196)}
    ${t(153, 72, 'Connect REST API', { fill: C, size: 7, anchor: 'middle' })}
    ${box(196, 18, 106, 122)}${t(249, 36, 'B2B COMMERCE', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('Catalogue', 'Katalog'), l('Prices', 'Preise'), l('Cart', 'Warenkorb'), 'Checkout', l('Orders', 'Aufträge')]
      .map((s, i) => check(208, 48 + i * 17, G) + t(222, 54 + i * 17, s, { size: 7 })).join('')}
    ${t(64, 154, l('frontend: you host it', 'Frontend: Sie hosten'), { size: 7, anchor: 'middle' })}${t(249, 154, l('core: Salesforce', 'Kern: Salesforce'), { size: 7, anchor: 'middle' })}`,

  'commerce-kpis-after-go-live': (l) => `
    ${t(20, 22, l('ORDER LINES AFTER 6 MONTHS', 'POSITIONEN NACH 6 MONATEN'), { fill: D, size: 7.5 })}
    <path d="M20 112H180" stroke="${G}" stroke-width="1"/>
    ${[[l('phone, e-mail', 'Telefon, E-Mail'), 55, G], [l('store', 'Shop'), 45, C]].map(([s, v, c], i) => `<rect x="${44 + i * 70}" y="${112 - Number(v) * 1.2}" width="34" height="${Number(v) * 1.2}" rx="2" fill="#fff" stroke="${c}" stroke-width="1.3"/>` + t(61 + i * 70, 106 - Number(v) * 1.2, `${v} %`, { fill: String(c), size: 7, anchor: 'middle' }) + t(61 + i * 70, 124, String(s), { size: 7, anchor: 'middle' })).join('')}
    ${box(184, 30, 120, 92)}
    ${[l('zero-result searches', 'Suchen ohne Treffer'), l('conversion', 'Conversion'), l('minutes per line', 'Minuten je Position'), l('manual corrections', 'Korrekturen')].map((s, i) => dot(196, 48 + i * 20, i === 0 ? C : G, 2.5) + t(204, 51 + i * 20, s, { size: 7 })).join('')}
    ${tag(184, 132, 120, l('review after 3 months', 'Review nach 3 Monaten'))}
    ${t(20, 145, l('Data Cloud credits: 250K / 500K', 'Data-Cloud-Credits: 250K / 500K'), { size: 7 })}`,

  'commerce-merchandising-agent': (l) => `
    ${t(18, 20, l('SEARCH: PART 4711', 'SUCHE: TEIL 4711'), { fill: D, size: 7.5 })}
    ${box(18, 28, 150, 22, C)}${t(28, 43, l('4711-B successor', '4711-B Nachfolger'), { fill: C, size: 7.5 })}<path d="M156 44V34M152 38l4-4 4 4" fill="none" stroke="${C}" stroke-width="1.3"/>
    ${box(18, 56, 150, 22)}${t(28, 71, l('repair kit 4711', 'Reparatursatz 4711'), { size: 7.5 })}
    ${box(18, 84, 150, 22)}${t(28, 99, l('4711 superseded', '4711 ersetzt'), { size: 7.5 })}<path d="M156 90V100M152 96l4 4 4-4" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${t(18, 126, l('max. 100 boost and bury rules', 'max. 100 Boost-und-Bury-Regeln'), { size: 7 })}
    ${box(196, 22, 108, 64)}${t(250, 38, 'MERCHANDISING', { fill: D, size: 7.5, anchor: 'middle' })}${t(250, 50, 'AGENT', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(250, 66, 'boost · bury', { size: 7, anchor: 'middle' })}${t(250, 78, l('AOV · conversion', 'AOV · Conversion'), { size: 7, anchor: 'middle' })}
    <path d="M196 54H176" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${box(196, 100, 108, 42)}${t(250, 117, l('ERP / PIM master', 'ERP / PIM Master'), { fill: D, size: 7.5, anchor: 'middle' })}${cross(212, 131)}${t(222, 134, l('no master data', 'keine Stammdaten'), { size: 7 })}`,

  'commerce-order-to-erp': (l) => `
    ${box(18, 44, 86, 64)}${t(61, 62, l('STORE', 'SHOP'), { fill: D, size: 7.5, anchor: 'middle' })}${t(61, 76, 'Order Summary', { size: 7, anchor: 'middle' })}${t(61, 94, 'unmanaged', { fill: C, size: 7.5, anchor: 'middle' })}
    ${box(218, 44, 86, 64, C)}${t(261, 66, 'SAP', { fill: D, size: 9, anchor: 'middle' })}${t(261, 80, l('owns the order', 'führt den Auftrag'), { fill: C, size: 7, anchor: 'middle' })}${t(261, 94, l('delivery · invoice', 'Lieferung · Rechnung'), { size: 6.5, anchor: 'middle' })}
    ${arrow(104, 62, 218, C)}${t(161, 56, 'CreateOrder', { fill: C, size: 7, anchor: 'middle' })}
    <path d="M218 92H105" stroke="${G}" stroke-width="1.3"/><path d="M110 88.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(161, 104, l('number · status back', 'Nummer · Status zurück'), { size: 7, anchor: 'middle' })}
    ${t(18, 132, 'Growth: Order Management Lite', { size: 7 })}${t(18, 146, l('Advanced: full Order Management', 'Advanced: volles Order Management'), { size: 7 })}
    ${cross(214, 138)}${t(224, 141, l('two order systems', 'zwei Auftragssysteme'), { size: 7 })}`,

  'commerce-product-data-pim': (l) => `
    ${box(14, 22, 110, 44)}${t(69, 38, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(69, 52, l('number · unit · status', 'Nummer · Einheit · Status'), { size: 6.5, anchor: 'middle' })}
    ${box(14, 76, 110, 44)}${t(69, 92, 'PIM / DAM', { fill: D, size: 7.5, anchor: 'middle' })}${t(69, 106, l('texts · attributes · media', 'Texte · Merkmale · Medien'), { size: 6.5, anchor: 'middle' })}
    ${arrow(124, 44, 150)}${arrow(124, 98, 150)}${t(137, 74, l('copy', 'Kopie'), { size: 6.5, anchor: 'middle' })}
    ${box(150, 22, 154, 98, C)}${t(160, 38, 'B2B STORE', { fill: C, size: 7.5 })}
    ${[l('1 catalogue per store', '1 Katalog pro Store'), l('4M products, 1M searchable', '4 Mio. Produkte, 1 Mio. suchbar'), l('200 variants per parent', '200 Varianten je Träger'), l('9 images + 5 files', '9 Bilder + 5 Dateien'), l('category depth 5', 'Kategorietiefe 5')]
      .map((s, i) => dot(164, 52 + i * 14, G, 2) + t(172, 55 + i * 14, s, { size: 6.5 })).join('')}
    <path d="M18 134H302" stroke="${L}"/>
    ${t(18, 150, l('1 owner per field, Salesforce owns only categories and search', '1 Owner pro Feld, Salesforce führt nur Kategorien und Suche'), { fill: D, size: 7 })}`,

  'commerce-reorder-order-templates': (l) => `
    ${[l('Past order', 'Alte Bestellung'), l('Order template', 'Bestellvorlage'), 'CSV · JSON'].map((s, i) => box(18, 22 + i * 40, 92, 28, i === 0 ? C : G) + t(64, 40 + i * 40, s, { fill: i === 0 ? C : D, size: 7.5, anchor: 'middle' })).join('')}
    <path d="M110 36C140 36 140 70 160 70" fill="none" stroke="${C}" stroke-width="1.4"/><path d="M110 76H160M110 116C140 116 140 82 160 82" fill="none" stroke="${G}" stroke-width="1.2"/>
    <path d="M163 72.5l5 3.5-5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${box(168, 22, 132, 96)}${t(178, 38, l('CART', 'WARENKORB'), { fill: D, size: 7.5 })}
    ${[0, 1, 2, 3].map((i) => `<path d="M178 ${50 + i * 12}H290" stroke="${L}"/>`).join('')}
    ${t(178, 106, l('500 lines · 2,000 large cart', '500 Pos. · 2.000 Large Cart'), { size: 7 })}
    ${tag(180, 128, 120, l('Jan 2027: shared cart', 'Jan. 2027: Multi-Cart'))}`,

  'commerce-request-for-quote': (l) => `
    ${box(18, 50, 64, 40)}${t(50, 68, l('CART', 'WARENKORB'), { fill: D, size: 7.5, anchor: 'middle' })}${t(50, 81, l('buyer', 'Käufer'), { size: 7, anchor: 'middle' })}
    ${arrow(82, 70, 112)}${t(97, 64, 'RFQ', { size: 7, anchor: 'middle' })}
    ${box(112, 50, 90, 40)}${t(157, 68, 'QUOTE', { fill: D, size: 7.5, anchor: 'middle' })}${t(157, 81, l('Draft · sales desk', 'Draft · Innendienst'), { size: 7, anchor: 'middle' })}
    ${arrow(202, 70, 228)}
    ${box(228, 50, 76, 40, C)}${t(266, 68, 'Approved', { fill: D, size: 7.5, anchor: 'middle' })}${t(266, 81, 'My Quotes', { size: 7, anchor: 'middle' })}
    <path d="M250 50C250 28 170 28 170 50" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M166.5 45l3.5 5 3.5-5" fill="none" stroke="${G}" stroke-width="1.2"/>${t(210, 26, 'Renegotiate', { size: 7, anchor: 'middle' })}
    <path d="M266 90V118H50V96" fill="none" stroke="${C}" stroke-width="1.4"/><path d="M46.5 101l3.5-5 3.5 5" fill="none" stroke="${C}" stroke-width="1.4"/>${t(158, 113, 'Quote to Cart', { fill: C, size: 7.5, anchor: 'middle' })}
    ${tag(18, 130, 128, l('needs Advanced Pricing', 'braucht Advanced Pricing'))}${t(154, 144, 'ConnectApi.CommerceQuotes', { size: 7 })}`,

  'commerce-sap-data-flows': (l) => `
    ${box(14, 40, 82, 80)}${t(55, 58, 'B2B COMMERCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(55, 72, l('store · cart', 'Shop · Warenkorb'), { size: 7, anchor: 'middle' })}${t(55, 84, 'checkout', { size: 7, anchor: 'middle' })}${t(55, 104, 'extensions', { fill: C, size: 7, anchor: 'middle' })}
    ${box(238, 40, 66, 80)}${t(271, 76, 'SAP', { fill: D, size: 9, anchor: 'middle' })}${t(271, 90, l('master', 'führend'), { size: 7, anchor: 'middle' })}
    <path d="M238 50H97" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M102 46.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(167, 45, l('master data · batch', 'Stammdaten · Batch'), { size: 7, anchor: 'middle' })}
    ${arrow(96, 72, 238, C)}${t(167, 67, l('price · stock · credit live', 'Preis · Bestand · Kredit live'), { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(96, 94, 238)}${t(167, 89, l('order', 'Auftrag'), { size: 7, anchor: 'middle' })}
    <path d="M238 114H97" stroke="${G}" stroke-width="1.3"/><path d="M102 110.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(167, 109, l('status · delivery · invoice', 'Status · Lieferung · Rechnung'), { size: 7, anchor: 'middle' })}
    ${tag(14, 132, 92, l('4 data flows', '4 Datenflüsse'))}${t(122, 145, l('password flow ends 20.02.2027', 'Passwort-Flow endet 20.02.2027'), { size: 7 })}`,

  'commerce-search-part-numbers': (l) => `
    ${box(18, 22, 150, 24)}${t(28, 37, l('search: 0815-112', 'Suche: 0815-112'), { fill: D, size: 7.5 })}<circle cx="154" cy="33" r="5" fill="none" stroke="${G}" stroke-width="1.2"/><path d="M158 37l4 4" stroke="${G}" stroke-width="1.2"/>
    ${arrow(168, 34, 188)}
    ${box(188, 16, 116, 70, C)}${t(198, 31, l('PRODUCT', 'PRODUKT'), { fill: D, size: 7.5 })}
    ${t(198, 46, 'SKU 0815-118', { size: 7 })}${t(198, 59, l('former: 0815-112', 'früher: 0815-112'), { fill: C, size: 7 })}${t(198, 72, l('searchable field', 'durchsuchbares Feld'), { size: 7 })}
    ${check(26, 60)}${t(40, 66, l('all terms must match', 'alle Begriffe müssen passen'), { size: 7 })}
    ${cross(30, 80)}${t(40, 83, l('no prefix or infix match', 'kein Teiltreffer'), { size: 7 })}
    <path d="M18 98H302" stroke="${L}"/>
    ${[['25', l('searchable', 'suchbar')], ['50', l('filterable', 'filterbar')], ['100', l('synonyms', 'Synonyme')], ['100', 'boost/bury']]
      .map(([n, s], i) => t(50 + i * 72, 118, String(n), { fill: D, size: 10, anchor: 'middle' }) + t(50 + i * 72, 131, String(s), { size: 7, anchor: 'middle' })).join('')}
    ${t(18, 152, l('Zero-result searches (Data Cloud) = missing data', 'Suchen ohne Treffer (Data Cloud) = fehlende Daten'), { fill: C, size: 7 })}`,

  'commerce-shop-or-portal': (l) => `
    ${box(18, 26, 128, 92)}${t(82, 42, l('PORTAL', 'PORTAL'), { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('view orders', 'Bestellungen sehen'), l('request', 'anfragen'), l('report a case', 'Case melden')].map((s, i) => check(28, 54 + i * 16, G) + t(42, 60 + i * 16, s, { size: 7 })).join('')}
    ${box(174, 26, 128, 92, C)}${t(238, 42, 'B2B COMMERCE', { fill: C, size: 7.5, anchor: 'middle' })}
    ${[l('catalogue', 'Katalog'), l('buyer group prices', 'Preise je Käufergruppe'), l('cart + checkout', 'Warenkorb + Checkout'), l('reorder', 'nachbestellen')].map((s, i) => check(184, 50 + i * 15, C) + t(198, 56 + i * 15, s, { size: 7 })).join('')}
    <path d="M146 72H174" stroke="${L}" stroke-width="1.2"/>
    ${t(160, 140, l('both: Customer Community Plus, 35 / member', 'beide: Customer Community Plus, 35 / Mitglied'), { size: 7, anchor: 'middle' })}
    ${t(160, 154, l('250 dealers · 30,000 lines / year', '250 Händler · 30.000 Positionen / Jahr'), { fill: D, size: 7, anchor: 'middle' })}`,

  'commerce-spare-parts-per-machine': (l) => `
    ${t(14, 18, l('PARTS PER MACHINE', 'TEILE PRO MASCHINE'), { fill: D, size: 7 })}
    ${box(14, 30, 86, 40)}${t(57, 46, l('BUYER GROUP', 'KÄUFERGRUPPE'), { fill: D, size: 7, anchor: 'middle' })}${t(57, 59, l('per machine', 'pro Maschine'), { size: 6.5, anchor: 'middle' })}
    ${cross(112, 50)}${t(124, 47, l('2,000 entitlements', '2.000 Entitlements'), { size: 6.5 })}${t(124, 58, l('per product', 'pro Produkt'), { size: 6.5 })}
    ${box(14, 86, 86, 52)}${t(57, 102, l('DEALER ASSETS', 'HÄNDLER-ASSETS'), { fill: D, size: 7, anchor: 'middle' })}${t(57, 115, l('own account only', 'nur eigenes Konto'), { size: 6.5, anchor: 'middle' })}${t(57, 127, l('serial no.', 'Seriennr.'), { size: 6.5, anchor: 'middle' })}
    ${arrow(100, 112, 138, C)}
    ${box(138, 86, 86, 52, C)}${t(181, 102, l('MACHINE PAGE', 'MASCHINENSEITE'), { fill: D, size: 7, anchor: 'middle' })}${t(181, 115, 'LWC', { fill: C, size: 6.5, anchor: 'middle' })}${t(181, 127, l('parts + cart', 'Teile + Warenkorb'), { size: 6.5, anchor: 'middle' })}
    ${box(246, 86, 60, 52)}${t(276, 108, 'PLM', { fill: D, size: 7.5, anchor: 'middle' })}${t(276, 121, 'as-built', { size: 6.5, anchor: 'middle' })}
    <path d="M246 112H226" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/>${t(235, 106, 'live', { size: 6, anchor: 'middle' })}
    ${t(244, 52, l('search filter:', 'Suchfilter:'), { size: 6.5 })}${t(244, 63, l('extension (Beta)', 'Extension (Beta)'), { size: 6.5 })}`,

  'commerce-stock-availability-erp': (l) => `
    ${box(18, 22, 100, 46)}${t(68, 40, l('PRODUCT LIST', 'PRODUKTLISTE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(68, 54, l('reads the copy', 'liest die Kopie'), { size: 7, anchor: 'middle' })}
    ${box(18, 92, 100, 46, C)}${t(68, 110, 'CHECKOUT', { fill: D, size: 7.5, anchor: 'middle' })}${t(68, 124, l('asks SAP live', 'fragt SAP live'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(150, 22, 80, 46)}${t(190, 40, 'OCI', { fill: D, size: 7.5, anchor: 'middle' })}${t(190, 54, l('20 locations', '20 Lagerorte'), { size: 7, anchor: 'middle' })}
    <path d="M150 45H119" stroke="${G}" stroke-width="1.3"/><path d="M124 41.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${box(254, 70, 50, 50)}${t(279, 99, 'SAP', { fill: D, size: 8.5, anchor: 'middle' })}
    <path d="M254 82C240 82 240 45 231 45" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${t(236, 32, l('copy', 'Kopie'), { size: 7 })}
    ${arrow(118, 115, 254, C)}${t(186, 110, l('ATP · confirmed date', 'ATP · bestätigter Termin'), { fill: C, size: 7, anchor: 'middle' })}
    ${check(150, 140)}${t(162, 146, l('in stock', 'lieferbar'), { size: 7 })}${dot(212, 143, G, 3)}${t(220, 146, l('on request', 'auf Anfrage'), { size: 7 })}`,

  'commerce-stores-countries-brands': (l) => `
    ${t(14, 18, l('1 STORE PER BRAND, BUYER GROUPS INSIDE', '1 STORE PRO MARKE, KÄUFERGRUPPEN INNEN'), { fill: D, size: 7 })}
    ${box(14, 30, 140, 92, C)}${t(24, 46, l('STORE · BRAND A', 'STORE · MARKE A'), { fill: D, size: 7.5 })}${t(144, 46, l('1 catalogue', '1 Katalog'), { fill: C, size: 6.5, anchor: 'end' })}
    ${[l('DE · tier 1', 'DE · Stufe 1'), l('FR · tier 2', 'FR · Stufe 2'), l('CH · CHF', 'CH · CHF'), '…'].map((s, i) => `<rect x="24" y="${54 + i * 15}" width="120" height="12" rx="3" fill="#fff" stroke="${L}"/>` + t(30, 62.5 + i * 15, s, { size: 6.5 })).join('')}
    ${box(166, 30, 140, 92)}${t(176, 46, l('STORE · BRAND B', 'STORE · MARKE B'), { fill: D, size: 7.5 })}${t(296, 46, l('own ERP', 'eigenes ERP'), { size: 6.5, anchor: 'end' })}
    ${[l('IT · tier 1', 'IT · Stufe 1'), l('ES · tier 2', 'ES · Stufe 2'), '…'].map((s, i) => `<rect x="176" y="${54 + i * 15}" width="120" height="12" rx="3" fill="#fff" stroke="${L}"/>` + t(182, 62.5 + i * 15, s, { size: 6.5 })).join('')}
    <path d="M14 136H306" stroke="${L}"/>
    ${t(14, 150, l('max 25 languages · 5 price books per store', 'max. 25 Sprachen · 5 Preisbücher pro Store'), { size: 7 })}${tag(236, 139, 70, 'Growth: 6')}`,

  'commerce-versions-visualforce-aura-lwr': (l) => `
    ${box(18, 40, 86, 56)}${t(61, 58, 'VISUALFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(61, 72, l('managed package', 'Managed Package'), { size: 7, anchor: 'middle' })}${t(61, 86, '4.13 · Winter \'21', { size: 7, anchor: 'middle' })}
    ${arrow(104, 68, 118)}
    ${box(118, 40, 86, 56)}${t(161, 58, 'AURA STORE', { fill: D, size: 7.5, anchor: 'middle' })}${t(161, 72, l('Aura + LWC', 'Aura + LWC'), { size: 7, anchor: 'middle' })}${t(161, 86, l('enabled < Spring \'23', 'vor Spring \'23 aktiv'), { size: 6.5, anchor: 'middle' })}
    ${arrow(204, 68, 218, C)}
    ${box(218, 40, 86, 56, C)}${t(261, 58, 'LWR STORE', { fill: D, size: 7.5, anchor: 'middle' })}${t(261, 72, l('LWC only', 'nur LWC'), { size: 7, anchor: 'middle' })}${t(261, 86, l('recommended', 'empfohlen'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(61, 28, 'CloudCraze 2018', { size: 7, anchor: 'middle' })}${t(211, 28, l('core platform · Experience Cloud', 'Kernplattform · Experience Cloud'), { size: 7, anchor: 'middle' })}
    <path d="M118 32H304" stroke="${L}"/>
    ${cross(30, 128)}${t(42, 131, l('no retirement date published (27.10.2026)', 'kein Abkündigungsdatum veröffentlicht (27.10.2026)'), { size: 7.5 })}`,

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
    ${check(167, 85)}${t(180, 90, l('pipeline green', 'Pipeline grün'), { size: 6.8 })}${check(167, 99)}${t(180, 104, l('reviewer approved', 'Reviewer gibt frei'), { size: 6.8 })}
    ${t(282, 114, 'merge', { size: 7.5 })}`,

  'object-ownership-matrix': (l) => `
    ${t(18, 18, 'OBJECT OWNERSHIP MATRIX', { fill: D, size: 7 })}
    ${[l('Sales', 'Vertrieb'), 'Service', 'FS'].map((s, i) => t(116 + i * 40, 38, s, { size: 7, anchor: 'middle' })).join('')}
    ${[['Account', 0], ['Opportunity', 0], ['Case', 1], ['Asset', 1], ['Work Order', 2]].map(([o, k], r) => `<path d="M18 ${46 + r * 18}H206" stroke="${L}"/>` + t(22, 58 + r * 18, String(o), { size: 7 }) + [0, 1, 2].map((c) => (c === k ? `<circle cx="${116 + c * 40}" cy="${55 + r * 18}" r="4" fill="${C}"/>` : dot(116 + c * 40, 55 + r * 18, L, 2.5))).join('')).join('')}
    ${box(226, 30, 78, 46, C)}${t(265, 48, l('1 object =', '1 Objekt ='), { fill: C, size: 7, anchor: 'middle' })}${t(265, 62, l('1 owner', '1 Owner'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(226, 100, l('8 streams', '8 Streams'), { size: 7 })}${t(226, 114, l('30+ developers', '30+ Entwickler'), { size: 7 })}${t(226, 128, l('~3 months', '~3 Monate'), { size: 7 })}${t(226, 142, l('80 % in v1', '80 % in V1'), { size: 7 })}`,

  'salesforce-freelancer-or-consultancy': (l) => `
    ${t(18, 20, l('WHO BUILDS, WHO DECIDES', 'WER BAUT, WER ENTSCHEIDET'), { fill: D, size: 7 })}
    ${box(18, 30, 130, 72)}${t(28, 46, l('CONSULTANCY', 'AGENTUR · PARTNER'), { fill: D, size: 7 })}
    ${[l('builds', 'baut'), l('tests', 'testet'), l('runs', 'betreibt')].map((s, i) => check(28, 58 + i * 14, G) + t(42, 63 + i * 14, s, { size: 7 })).join('')}
    ${arrow(151, 66, 169, C, true)}
    ${box(172, 30, 130, 72, C)}${t(182, 46, l('CLIENT-SIDE ARCHITECT', 'ARCHITEKT KUNDENSEITE'), { fill: C, size: 7 })}
    ${[l('standards', 'Standards'), 'Reviews', l('decisions', 'Entscheidungen')].map((s, i) => check(182, 58 + i * 14) + t(196, 63 + i * 14, s, { size: 7 })).join('')}
    ${tag(18, 116, 284, l('5 partners · 30+ developers · 8 streams', '5 Partner · 30+ Entwickler · 8 Streams'))}
    ${t(160, 151, l('one person does not replace a team', 'eine Person ersetzt kein Team'), { size: 7, anchor: 'middle' })}`,

  'salesforce-center-of-excellence': (l) => `
    ${t(18, 20, 'CENTER OF EXCELLENCE', { fill: D, size: 7 })}
    ${[1, 2, 3, 4, 5].map((i) => dot(30, 30 + i * 18, i === 2 ? C : G) + t(42, 33 + i * 18, 'Stream ' + i, { size: 7 }) + `<path d="M84 ${30 + i * 18}L136 ${84}" stroke="${L}"/>`).join('')}
    ${box(136, 56, 84, 56, C)}${t(178, 76, l('EVERY 2 WEEKS', 'ALLE 2 WOCHEN'), { fill: C, size: 7.5, anchor: 'middle' })}${t(178, 90, l('60 min, topics', '60 Min., Themen'), { size: 7, anchor: 'middle' })}${t(178, 102, l('in advance', 'vorab eingereicht'), { size: 7, anchor: 'middle' })}
    ${box(236, 56, 70, 56)}${t(271, 76, l('MONTHLY', 'MONATLICH'), { fill: D, size: 7.5, anchor: 'middle' })}${t(271, 90, 'Roadmap', { size: 7, anchor: 'middle' })}${t(271, 102, l('priorities', 'Prioritäten'), { size: 7, anchor: 'middle' })}
    ${tag(136, 126, 170, l('client chairs, not a partner', 'Kunde leitet, kein Partner'))}`,

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
    <rect x="188" y="128" width="26" height="14" rx="2" fill="${D}"/><circle cx="194" cy="144" r="2.6" fill="${D}"/><circle cx="208" cy="144" r="2.6" fill="${D}"/>${t(300, 140, l('van = location', 'Fahrzeug = Standort'), { size: 7, anchor: 'end' })}`,

  'field-service-maintenance-contracts': (l) => `
    ${box(18, 18, 130, 30)}${t(28, 37, 'Service Contract', { fill: D, size: 7.5 })}${t(140, 37, l('sold', 'verkauft'), { size: 7, anchor: 'end' })}
    ${box(18, 64, 130, 30)}${t(28, 83, 'Maintenance Plan', { fill: D, size: 7.5 })}${t(140, 83, l('planned', 'geplant'), { size: 7, anchor: 'end' })}
    ${box(18, 110, 130, 30, C)}${t(28, 129, 'Entitlement', { fill: D, size: 7.5 })}${t(140, 129, '24 h', { fill: C, size: 7, anchor: 'end' })}
    ${arrow(148, 125, 196, C)}${t(172, 118, l('priority', 'Priorität'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(196, 98, 104, 44, C)}${t(248, 117, l('DISPATCH', 'DISPATCHING'), { fill: D, size: 7.5, anchor: 'middle' })}${t(248, 131, l('1 = highest', '1 = höchste'), { size: 7, anchor: 'middle' })}
    ${arrow(148, 79, 196)}${box(196, 58, 104, 32)}${t(248, 78, l('work orders', 'Arbeitsaufträge'), { size: 7.5, anchor: 'middle' })}`,

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

  'sfdx-hardis-vs-devops-center': (l) => `
    ${box(18, 20, 128, 40)}${t(82, 38, 'LIFECYCLE CENTER', { fill: D, anchor: 'middle' })}${t(82, 51, l('hub org · clicks', 'Hub-Org · Klicks'), { size: 7, anchor: 'middle' })}
    <path d="M47 60V82M114 60V82" stroke="${G}" stroke-width="1.2"/>
    ${box(18, 82, 58, 20)}${t(47, 95, 'GitHub.com', { size: 6.3, anchor: 'middle' })}${box(82, 82, 64, 20)}${t(114, 95, 'Bitbucket Cloud', { size: 6.3, anchor: 'middle' })}
    ${t(18, 120, l('GitLab, Azure DevOps: no date', 'GitLab, Azure DevOps: kein Termin'), { size: 7 })}
    ${box(174, 20, 128, 40, C)}${t(238, 38, 'sfdx-hardis', { fill: D, anchor: 'middle' })}${t(238, 51, l("client's CI", 'CI des Kunden'), { size: 7, anchor: 'middle' })}
    ${['GitHub', 'GitLab', 'Azure DevOps', 'Bitbucket', 'Jenkins'].map((s, i) => check(184, 72 + i * 11, C) + t(196, 77 + i * 11, s, { size: 7 })).join('')}
    ${t(160, 148, l('both: no licence fees', 'beide: keine Lizenzgebühren'), { fill: C, size: 7.5, anchor: 'middle' })}`,

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
      .map((s, i) => box(14 + i * 60, 48, 52, 30, i === 4 ? C : G) + t(40 + i * 60, 67, s, { size: 6.3, anchor: 'middle' })).join('')}
    ${[66, 126, 186, 246].map((x) => arrow(x, 63, x + 8)).join('')}
    <path d="M14 116H302" stroke="${G}" stroke-width="1.4"/>${[40, 100, 160, 220, 280].map((x) => dot(x, 116)).join('')}
    <path d="M40 78V112M100 78V112M160 78V112M220 78V112M280 78V112" stroke="${L}" stroke-width="1"/>
    ${t(14, 136, l('Git repository: single source of truth', 'Git-Repository: einzige Quelle der Wahrheit'), { size: 7.5 })}
    ${t(14, 32, l('quality gate: merge only when green', 'Qualitätsschranke: Merge nur bei Grün'), { fill: C, size: 7.5 })}`,

  'agentforce-business-value-data-quality': (l) => `
    ${box(18, 56, 70, 44)}${t(53, 76, l('use case', 'Use Case'), { fill: D, size: 7.5, anchor: 'middle' })}${t(53, 89, l('business value', 'Business Value'), { size: 6.8, anchor: 'middle' })}
    ${box(124, 56, 70, 44)}${t(159, 76, 'PILOT', { fill: D, size: 7.5, anchor: 'middle' })}${t(159, 89, l('nearly half stay', 'fast die Hälfte'), { size: 6.5, anchor: 'middle' })}
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
  'sap-salesforce-integration-overview': (l) => `
    ${box(18, 30, 78, 100)}${t(57, 50, 'SAP', { fill: D, size: 8, anchor: 'middle' })}
    ${t(57, 70, 'ECC', { size: 7, anchor: 'middle' })}${t(57, 82, l('2027 / 2030', '2027 / 2030'), { size: 6.5, anchor: 'middle' })}
    ${t(57, 104, 'S/4HANA', { size: 7, anchor: 'middle' })}${t(57, 116, 'OData', { size: 6.5, anchor: 'middle' })}
    ${box(224, 30, 80, 100, C)}${t(264, 50, 'SALESFORCE', { fill: C, size: 7.5, anchor: 'middle' })}
    ${t(264, 76, l('1 leading', '1 führendes'), { size: 7, anchor: 'middle' })}${t(264, 88, l('system', 'System'), { size: 7, anchor: 'middle' })}${t(264, 100, l('per data type', 'pro Datenart'), { size: 7, anchor: 'middle' })}
    ${box(118, 70, 84, 22, G)}${t(160, 85, 'Middleware', { fill: D, size: 7, anchor: 'middle' })}
    ${arrow(98, 44, 222)}${t(160, 40, l('master data · batch', 'Stammdaten · Batch'), { size: 6.5, anchor: 'middle' })}
    ${arrow(98, 81, 116, G)}${arrow(204, 81, 222, C)}
    <path d="M222 118H99" stroke="${G}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M104 114.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${t(160, 112, l('order out · status back', 'Auftrag raus · Status zurück'), { size: 6.5, anchor: 'middle' })}
    ${t(160, 64, l('price · stock live', 'Preis · Bestand live'), { size: 6.5, anchor: 'middle' })}`,

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
    <path d="M98 38C114 38 112 72 126 72M98 72H126M98 106C114 106 112 72 126 72" fill="none" stroke="${G}" stroke-width="1.2"/>${arrow(126, 72, 136)}
    ${box(136, 42, 102, 60, C)}${t(187, 62, 'ACCOUNT', { fill: D, size: 7.5, anchor: 'middle' })}${t(187, 73, 'FORECAST', { fill: D, size: 7.5, anchor: 'middle' })}${t(187, 89, l('customer × product × month', 'Kunde × Produkt × Monat'), { size: 6, anchor: 'middle' })}
    <path d="M248 20V124" stroke="${G}" stroke-width="1" stroke-dasharray="4 3"/>${arrow(238, 72, 262, C)}
    ${box(262, 52, 46, 40)}${t(285, 70, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(285, 82, l('planning', 'Planung'), { size: 6.8, anchor: 'middle' })}
    ${t(14, 146, l('2,000 × 500 × 24 = 24 million combinations', '2.000 × 500 × 24 = 24 Mio. Kombinationen'), { size: 7 })}`,

  'manufacturing-cloud-rebate-management': (l) => `
    ${box(14, 50, 62, 44)}${t(45, 68, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(45, 81, l('invoices', 'Rechnungen'), { size: 6.8, anchor: 'middle' })}
    ${arrow(76, 72, 96)}
    ${box(96, 38, 116, 68)}${t(154, 52, 'TRANSACTION JOURNAL', { fill: D, size: 7, anchor: 'middle' })}
    <path d="M108 96H136V84H164V72H192V60" fill="none" stroke="${C}" stroke-width="1.6"/>
    ${t(120, 91, l('tier 1', 'Stufe 1'), { size: 6, anchor: 'middle' })}${t(148, 79, l('tier 2', 'Stufe 2'), { size: 6, anchor: 'middle' })}${t(176, 67, l('tier 3', 'Stufe 3'), { size: 6, anchor: 'middle' })}
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
    ${box(104, 118, 112, 26)}${t(160, 134, l('supplier recovery per part', 'Regress pro Teil'), { size: 6.3, anchor: 'middle' })}`,

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
    ${t(18, 136, l('1 action = 20 Flex Credits = $0.10', '1 Aktion = 20 Flex Credits = 0,10 €'), { fill: D, size: 7.5 })}
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
      .map(([a, b], i) => box(12 + i * 62, 34, 52, 28, i === 3 ? C : G) + t(38 + i * 62, 51, String(a), { fill: D, size: 6.5, anchor: 'middle' }) + t(38 + i * 62, 76, String(b), { fill: i === 3 ? C : G, size: 7, anchor: 'middle' })).join('')}
    ${[0, 1, 2, 3].map((i) => arrow(64 + i * 62, 48, 74 + i * 62, i === 2 ? C : G)).join('')}
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
    ${[['Claude Code', false], ['Codex', false], ['Copilot', false], ['Vibes', true]].map(([s, d], i) => t(16, 41 + i * 20, String(s), { size: 7.5 }) + arrow(70, 38 + i * 20, 106, G, Boolean(d))).join('')}
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
    ${[['Claude', l('beta, 37 sales skills', 'Beta, 37 Vertriebs-Skills'), true], ['Slack', l('Slackforce, GA Oct', 'Slackforce, GA Okt'), false], ['Lightning', l('Coworker, needs Data 360', 'Coworker, braucht Data 360'), false]]
      .map(([a, b, hi], i) => box(18, 26 + i * 26, 168, 20, hi ? C : G) + t(26, 39 + i * 26, String(a), { fill: D, size: 7.5 }) + t(178, 39 + i * 26, String(b), { fill: hi ? C : G, size: 6.8, anchor: 'end' })).join('')}
    <path d="M186 62H206V108H186" fill="none" stroke="${G}" stroke-width="1.2"/>${arrow(206, 85, 226)}
    ${box(226, 62, 78, 46)}${t(265, 80, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(265, 94, l('user permissions', 'Nutzerrechte'), { size: 6.8, anchor: 'middle' })}
    <path d="M18 120H302" stroke="${L}"/>
    ${t(18, 136, l('SIForce: CEO post on X, 09.10.2026', 'SIForce: CEO-Post auf X, 09.10.2026'), { fill: D, size: 7.5 })}
    ${t(18, 150, l('no press release, keep the name AIforce', 'keine Pressemitteilung, Name AIforce behalten'), { size: 7 })}`,

  'api-67-user-mode-apex': (l) => `
    ${box(18, 26, 124, 60)}${t(28, 42, 'API 66.0', { fill: D, size: 7.5 })}${t(28, 58, 'system mode', { size: 7 })}${t(28, 72, l('no decl. = without sharing', 'ohne Dekl. = without sharing'), { size: 6.5 })}
    ${arrow(142, 56, 180, C)}${t(161, 47, l('bump', 'Sprung'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(180, 26, 124, 60, C)}${t(190, 42, 'API 67.0', { fill: C, size: 7.5 })}${t(190, 58, 'user mode', { size: 7 })}${t(190, 72, l('no decl. = with sharing', 'ohne Dekl. = with sharing'), { size: 6.5 })}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => dot(30 + i * 13, 102, G, 3)).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (i < 3 ? `<circle cx="${192 + i * 13}" cy="102" r="3" fill="${C}"/>` : dot(192 + i * 13, 102, L, 3))).join('')}
    ${t(28, 118, l('all records', 'alle Datensätze'), { size: 7 })}${t(180, 118, l('fewer records, no error', 'weniger Datensätze, kein Fehler'), { fill: C, size: 6.5 })}
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
    ${[['Flex Credits', l('$1,020', '1.020 €'), 26, true], [l('per resolution, 60 %', 'pro Lösung, 60 %'), l('$3,600', '3.600 €'), 90, false], [l('per conversation', 'pro Gespräch'), l('$6,000', '6.000 €'), 150, false]]
      .map(([a, b, w, hi], i) => t(18, 40 + i * 22, String(a), { size: 7 }) + `<rect x="108" y="${31 + i * 22}" width="${w}" height="12" rx="2" fill="${hi ? C : '#fff'}" fill-opacity="${hi ? 0.25 : 1}" stroke="${hi ? C : G}" stroke-width="1.1"/>` + t(114 + Number(w), 40 + i * 22, String(b), { fill: hi ? C : G, size: 7 })).join('')}
    <path d="M18 104H302" stroke="${L}"/>
    ${t(18, 120, l('1 chat = 3 actions + 2 prompts = 68 credits', '1 Gespräch = 3 Aktionen + 2 Prompts = 68 Credits'), { fill: D, size: 7.5 })}
    ${t(18, 136, l('Data 360: 150 credits per MB of catalogue', 'Data 360: 150 Credits pro MB Katalog'), { size: 7 })}
    ${t(18, 150, l('sandbox: 120 credits per MB, test a subset', 'Sandbox: 120 Credits pro MB, Ausschnitt testen'), { size: 7 })}`,

  'field-service-ai-agents-today': (l) => `
    ${t(18, 18, l('AVAILABLE TODAY', 'HEUTE VERFÜGBAR'), { fill: D, size: 7 })}${t(186, 18, l('MACHINE BUILDER', 'MASCHINENBAUER'), { fill: D, size: 7 })}
    ${[[l('maintenance booking', 'Wartungsbuchung'), l('start', 'starten'), true], [l('job report draft', 'Berichtsentwurf'), l('clean fields', 'Felder sauber'), false], [l('pre-work brief', 'Pre-Work Brief'), l('asset history', 'Anlagenhistorie'), false], [l('breakdown booking', 'Störungsbuchung'), l('triage first', 'erst Triage'), false], [l('troubleshooting', 'Fehlersuche'), l('later', 'später'), false]]
      .map(([a, b, hi], i) => (hi ? check(18, 30 + i * 18, C) : dot(22, 33 + i * 18, G, 2.5)) + t(32, 36 + i * 18, String(a), { fill: hi ? C : G, size: 7 }) + `<path d="M18 ${41 + i * 18}H302" stroke="${L}"/>` + t(186, 36 + i * 18, String(b), { fill: hi ? C : G, size: 7 })).join('')}
    ${box(18, 124, 136, 28, C)}${t(86, 136, l('customer agent', 'Kundenagent'), { fill: D, size: 7, anchor: 'middle' })}${t(86, 147, l('20 credits = $0.10 / action', '20 Credits = 0,10 € / Aktion'), { fill: C, size: 7, anchor: 'middle' })}
    ${box(166, 124, 136, 28)}${t(234, 136, l('employee add-on', 'Add-on Mitarbeitende'), { fill: D, size: 7, anchor: 'middle' })}${t(234, 147, l('$125 per user / month', '125 € pro Nutzer / Monat'), { size: 7, anchor: 'middle' })}`,

  'fixed-price-ai-salesforce-partners': (l) => `
    ${t(18, 18, l('WARRANTY FORM (SCENARIO)', 'GARANTIEANTRAG (SZENARIO)'), { fill: D, size: 7 })}
    ${box(18, 28, 130, 58)}${t(83, 45, l('TIME & MATERIALS', 'NACH AUFWAND'), { fill: D, size: 7.5, anchor: 'middle' })}${t(83, 60, l('45 days, with AI 30', '45 Tage, mit KI 30'), { size: 7, anchor: 'middle' })}${t(83, 74, l('partner loses $16,500', 'Partner verliert 16.500 €'), { size: 7, anchor: 'middle' })}
    ${arrow(148, 57, 172, C)}
    ${box(172, 28, 130, 58, C)}${t(237, 45, l('FIXED PRICE $41,000', 'FESTPREIS 41.000 €'), { fill: D, size: 7.5, anchor: 'middle' })}${t(237, 60, l('~$1,370 per day worked', '~1.370 € pro Arbeitstag'), { fill: C, size: 7, anchor: 'middle' })}${t(237, 74, l('client saves 17 %', 'Kunde spart 17 %'), { size: 7, anchor: 'middle' })}
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
    ${t(18, 143, l('start: sobject-reads in a sandbox', 'Start: sobject-reads in der Sandbox'), { fill: D, size: 7.5 })}
    ${t(18, 154, l('no service accounts, no M2M', 'keine Service Accounts, kein M2M'), { size: 7 })}`,

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
    ${box(16, 52, 56, 40)}${t(44, 69, l('AI CODE', 'KI-CODE'), { fill: D, size: 7.5, anchor: 'middle' })}${t(44, 82, 'pull request', { size: 6.5, anchor: 'middle' })}
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
    ${[l('tests', 'Tests'), l('data access', 'Datenzugriff'), l('right fields', 'richtige Felder'), l('scope', 'Umfang'), l('business rule', 'Geschäftsregel')].map((s, i) => dot(234, 49 + i * 15, C, 2.5) + t(242, 52 + i * 15, s, { size: 6.5 })).join('')}
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
    ${[['Core', l('$195', '195 €'), '500K', 50, true], ['Advanced', l('$395', '395 €'), '1M', 100, false], ['Max', l('$550', '550 €'), l('2.75M', '2,75M'), 275, false]]
      .map(([n, p, c, w, hi], i) => box(18, 28 + i * 26, 92, 20, hi ? C : G) + t(26, 41 + i * 26, String(n), { fill: D, size: 7.5 }) + t(102, 41 + i * 26, String(p), { size: 7.5, anchor: 'end' })
        + `<rect x="${120}" y="${33 + i * 26}" width="${(Number(w) / 275) * 140}" height="10" rx="2" fill="${hi ? C : L}"/>` + t(302, 41 + i * 26, String(c), { fill: hi ? C : G, size: 7.5, anchor: 'end' })).join('')}
    <path d="M18 112H302" stroke="${L}"/>
    ${t(18, 128, l('1 action = 20 credits: Core pool = 25,000 actions', '1 Aktion = 20 Credits: Core-Pool = 25.000 Aktionen'), { fill: D, size: 7.5 })}
    ${t(18, 144, l('Core to Advanced, 200 users: +$480K for $2.5K credits', 'Core zu Advanced, 200 Nutzer: +480K € für 2,5K € Credits'), { size: 7 })}`,

  'ai-native-delivery-process': (l) => {
    // 14 steps and 5 gates (g) in sequence; lanes 0 people, 1 agent, 2 pipeline
    const seq = [1, 0, 1, 'g', 1, 0, 1, 'g', 1, 1, 'g', 2, 2, 0, 1, 'g', 'g', 2, 1];
    const x = (i: number) => 80 + i * 12;
    const y = (lane: number) => 36 + lane * 22;
    const pts = seq.map((s, i) => (s === 'g' ? null : [x(i), y(s as number)])).filter(Boolean) as number[][];
    return `
    ${t(18, 18, l('14 STEPS · 5 GATES · 3 LANES', '14 SCHRITTE · 5 TORE · 3 SPUREN'), { fill: D, size: 7 })}
    ${[l('people', 'Personen'), 'Agent', 'Pipeline'].map((s, i) => t(18, y(i) + 2.5, s, { fill: i === 1 ? C : G, size: 7 }) + `<path d="M74 ${y(i)}H306" stroke="${L}"/>`).join('')}
    ${seq.map((s, i) => (s === 'g' ? `<path d="M${x(i)} 28V88" stroke="${C}" stroke-width="2"/>` : '')).join('')}
    <path d="M${pts.map((p) => p.join(' ')).join('L')}" fill="none" stroke="${G}" stroke-width="1"/>
    ${pts.map(([px, py]) => dot(px, py, py === y(1) ? C : G, 3)).join('')}
    <path d="M18 104H302" stroke="${L}"/>
    ${t(18, 120, l('transcript > story > commit > test > note', 'Transkript > Story > Commit > Test > Note'), { size: 7 })}
    ${tag(18, 132, 190, l('only the pipeline deploys to prod', 'nur die Pipeline deployt in Prod'))}`;
  },

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
    ${t(18, 153, l('60 cases x 3 actions x 3 runs = about $43', '60 Fälle x 3 Aktionen x 3 Läufe = rund 43 €'), { size: 7 })}`,

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
    ${box(106, 26, 108, 22, C)}${t(160, 40, l('replica + read API', 'Replik + Lese-API'), { fill: C, size: 6.5, anchor: 'middle' })}
    ${box(106, 58, 108, 22)}${t(160, 72, l('IDP + RPA bot', 'IDP + RPA-Bot'), { size: 6.5, anchor: 'middle' })}
    ${box(106, 90, 108, 22)}${t(160, 104, 'Systems Integration Agent', { size: 6.5, anchor: 'middle' })}
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
    ${box(18, 30, 72, 42)}${t(54, 48, l('AI APP', 'KI-APP'), { fill: D, anchor: 'middle' })}${t(54, 62, l('vendor cloud', 'Anbieter-Cloud'), { size: 7, anchor: 'middle' })}
    ${arrow(90, 51, 150, C)}${t(120, 44, 'refresh token', { fill: C, size: 6.8, anchor: 'middle' })}
    ${box(150, 30, 70, 42)}${t(185, 48, 'SALESFORCE', { fill: D, anchor: 'middle' })}${t(185, 62, 'org', { size: 7, anchor: 'middle' })}
    ${t(18, 99, l('stolen token', 'gestohlenes Token'), { size: 7 })}
    <path d="M94 96H185V76" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${cross(140, 96)}${t(140, 112, 'Tor · cloud IPs', { size: 7, anchor: 'middle' })}
    ${[l('own API user', 'eigener User'), l('no full scope', 'kein Scope full'), l('token expiry', 'Token-Ablauf'), l('IP filter', 'IP-Filter'), l('logs > 1 day', 'Logs > 1 Tag')].map((s, i) => check(232, 30 + i * 16, i === 0 ? C : G) + t(244, 35 + i * 16, s, { size: 7 })).join('')}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 138, l('exported: Cases, Accounts, Users, Opportunities', 'exportiert: Cases, Accounts, User, Opportunities'), { fill: D, size: 7.5 })}
    ${t(18, 152, l('not a Salesforce vulnerability', 'keine Schwachstelle in Salesforce'), { size: 7 })}`,

  'vibe-coding-prototype-not-production': (l) => `
    ${box(16, 22, 124, 74)}${t(26, 38, l('PROTOTYPE', 'PROTOTYP'), { fill: D, size: 7.5 })}
    ${t(26, 54, 'Developer Edition', { size: 7 })}${t(26, 68, l('scratch org, max. 30 days', 'Scratch Org, max. 30 Tage'), { size: 7 })}${t(26, 82, l('dummy data, no SAP', 'Testdaten, kein SAP'), { size: 7 })}
    ${arrow(140, 59, 180, C)}${t(160, 50, 'Specs', { fill: C, size: 7, anchor: 'middle' })}${t(160, 74, l('no code', 'kein Code'), { fill: C, size: 6.2, anchor: 'middle' })}
    ${box(180, 22, 124, 74, C)}${t(190, 38, l('PRODUCTION', 'PRODUKTION'), { fill: C, size: 7.5 })}
    ${[l('approved plan', 'freigegebener Plan'), l('human review', 'menschliches Review'), l('tests + pipeline', 'Tests + Pipeline')].map((s, i) => check(190, 48 + i * 14, G) + t(204, 54 + i * 14, s, { size: 7 })).join('')}
    <path d="M16 118H304" stroke="${L}"/>
    ${t(16, 134, l('vibe coding: nobody reads the code', 'Vibe Coding: niemand liest den Code'), { fill: D, size: 7.5 })}
    ${t(16, 150, l('Developer Edition: 110 requests, 1 month', 'Developer Edition: 110 Anfragen, 1 Monat'), { size: 7 })}`,

  'eu-ai-act-agentforce-deadlines': (l) => `
    ${t(18, 18, l('EU AI ACT (REG. 2026/1744)', 'EU AI ACT (VO 2026/1744)'), { fill: D, size: 7 })}
    <path d="M30 62H290" stroke="${G}" stroke-width="1.2"/>
    ${dot(40, 62, C, 4)}${dot(120, 62, G, 3)}${dot(200, 62, G, 3)}${dot(280, 62, G, 3)}
    ${t(40, 46, '02.08.2026', { fill: C, size: 7.5, anchor: 'middle' })}${t(120, 46, '02.12.2026', { size: 7.5, anchor: 'middle' })}${t(200, 46, '02.12.2027', { size: 7.5, anchor: 'middle' })}${t(280, 46, '02.08.2028', { size: 7.5, anchor: 'middle' })}
    ${t(40, 80, 'Art. 50', { fill: C, size: 7.5, anchor: 'middle' })}${t(120, 80, 'Art. 50(2)', { size: 7.5, anchor: 'middle' })}${t(200, 80, l('Annex III', 'Anhang III'), { size: 7.5, anchor: 'middle' })}${t(280, 80, l('Annex I', 'Anhang I'), { size: 7.5, anchor: 'middle' })}
    ${t(40, 92, l('AI notice', 'KI-Hinweis'), { size: 7, anchor: 'middle' })}${t(120, 92, l('marking', 'Kennzeichnung'), { size: 7, anchor: 'middle' })}${t(200, 92, 'HR', { size: 7, anchor: 'middle' })}${t(280, 92, l('machinery', 'Maschinen'), { size: 7, anchor: 'middle' })}
    ${box(18, 106, 140, 40, C)}${t(28, 122, l('Dealer chat agent', 'Chat-Agent Händler'), { fill: D, size: 7.5 })}${t(28, 136, l('transparency, due now', 'Transparenz, jetzt fällig'), { fill: C, size: 7 })}
    ${box(166, 106, 136, 40)}${t(176, 122, l('Applicant ranking', 'Bewerber-Ranking'), { fill: D, size: 7.5 })}${t(176, 136, l('high-risk from 12/2027', 'Hochrisiko ab 12/2027'), { size: 7 })}`,

  'nearshore-teams-with-ai-agents': (l) => `
    ${t(18, 18, l('NEARSHORE TEAM WITH AGENTS (SCENARIO)', 'NEARSHORE-TEAM MIT AGENTEN (SZENARIO)'), { fill: D, size: 7 })}
    ${[[28, 36], [46, 36], [28, 52], [46, 52], [28, 68], [46, 68], [28, 84]].map(([x, y]) => `<path d="M${x + 4} ${y}L120 60" stroke="${L}" stroke-width="1"/>` + dot(x, y, G, 4)).join('')}
    ${t(18, 104, l('7 developers, 1 reviewer', '7 Entwickler, 1 Reviewer'), { size: 7 })}
    ${box(120, 44, 64, 32, C)}${t(152, 58, 'REVIEW', { fill: D, size: 7.5, anchor: 'middle' })}${t(152, 70, l('bottleneck', 'Engpass'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(152, 92, l('25 to 40 PRs per sprint', '25 auf 40 PRs pro Sprint'), { size: 6.5, anchor: 'middle' })}
    <path d="M204 30V100" stroke="${L}"/>
    ${t(212, 40, 'MCKINSEY 2026', { fill: D, size: 7 })}
    ${t(212, 56, l('time saved 11.8 %', 'Zeit gespart 11,8 %'), { size: 7 })}
    ${t(212, 70, l('less rework 6.2 %', 'Nacharbeit -6,2 %'), { size: 7 })}
    <path d="M18 116H302" stroke="${L}"/>
    ${t(18, 132, l('ROTATION = ACCESS EVENT', 'ROTATION = ZUGRIFFSEREIGNIS'), { fill: D, size: 7.5 })}
    ${check(18, 142)}${t(30, 147, l('tool account', 'Werkzeugkonto'), { size: 7 })}
    ${check(100, 142)}${t(112, 147, l('org access', 'Org-Zugang'), { size: 7 })}
    ${check(176, 142)}${t(188, 147, l('transcripts: 30 days', 'Transkripte: 30 Tage'), { size: 7 })}`,

  'agent-api-own-apps': (l) => `
    ${t(14, 18, l('ALL DEALERS, ONE IDENTITY', 'ALLE HÄNDLER, EINE IDENTITÄT'), { fill: D, size: 7 })}${tag(232, 4, 74, l('HPI rate: TBA', 'HPI-Satz: TBA'))}
    ${box(14, 32, 70, 44)}${t(49, 51, l('DEALER APP', 'HÄNDLER-APP'), { fill: D, size: 7, anchor: 'middle' })}${t(49, 65, l('own login', 'eigenes Login'), { size: 7, anchor: 'middle' })}
    ${arrow(84, 54, 122)}
    ${box(122, 32, 74, 44)}${t(159, 51, 'BACKEND', { fill: D, size: 7, anchor: 'middle' })}${t(159, 65, 'client secret', { size: 7, anchor: 'middle' })}
    ${arrow(196, 54, 234, C)}${t(215, 47, 'REST', { fill: C, size: 7, anchor: 'middle' })}
    ${box(234, 32, 72, 44)}${t(270, 51, 'AGENT API', { fill: D, size: 7, anchor: 'middle' })}${t(270, 65, l('1 run-as user', '1 Run-As-User'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M14 92H306" stroke="${L}"/>
    ${check(14, 107)}${t(26, 112, l('dealer account set at session start', 'Händler-Account beim Session-Start'), { size: 7 })}
    ${check(14, 123, G)}${t(26, 128, l('actions filter in logic, not the LLM', 'Aktionen filtern in Logik, nicht im LLM'), { size: 7 })}
    ${check(14, 139, G)}${t(26, 144, l('120 s timeout, 1 request per session', '120 s Timeout, 1 Anfrage pro Session'), { size: 7 })}
    ${t(306, 128, l('20 credits per action', '20 Credits pro Aktion'), { size: 7, anchor: 'end' })}`,

  'agentforce-a2a-multi-agent': (l) => `
    ${t(18, 18, l('WHO OWNS THE CONVERSATION', 'WER FÜHRT DAS GESPRÄCH'), { fill: D, size: 7 })}
    ${box(18, 28, 62, 30)}${t(49, 41, l('DEALER', 'HÄNDLER'), { fill: D, size: 7.5, anchor: 'middle' })}${t(49, 52, 'portal', { size: 7, anchor: 'middle' })}
    ${arrow(80, 43, 104, C)}
    ${box(104, 28, 92, 30, C)}${t(150, 41, 'AGENTFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(150, 52, l('owner', 'führt'), { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(196, 43, 222)}
    ${box(222, 28, 80, 30)}${t(262, 41, 'SAP S/4', { fill: D, size: 7.5, anchor: 'middle' })}${t(262, 52, l('API action', 'API-Aktion'), { size: 7, anchor: 'middle' })}
    ${box(18, 70, 62, 30)}${t(49, 83, 'COPILOT', { fill: D, size: 7.5, anchor: 'middle' })}${t(49, 94, 'Teams', { size: 7, anchor: 'middle' })}
    ${arrow(80, 85, 104, G, true)}
    ${box(104, 70, 92, 30)}${t(150, 83, 'A2A BRIDGE', { fill: D, size: 7.5, anchor: 'middle' })}${t(150, 94, 'MuleSoft', { size: 7, anchor: 'middle' })}
    <path d="M150 70V59" stroke="${G}" stroke-width="1.3"/><path d="M146.5 63.5l3.5-4.5 3.5 4.5" fill="none" stroke="${G}" stroke-width="1.3"/>
    ${box(222, 70, 80, 30)}${t(262, 83, 'SAP JOULE', { fill: D, size: 7.5, anchor: 'middle' })}${t(262, 94, l('inbound only', 'nur eingehend'), { size: 7, anchor: 'middle' })}
    <path d="M18 110H302" stroke="${L}"/>
    ${check(18, 118)}${t(32, 124, l("in-org orchestration GA since Winter '27", "Orchestrierung in der Org GA seit Winter '27"), { size: 7 })}
    ${check(18, 132, G)}${t(32, 138, l('A2A Bridge: sync only, 120 s timeout', 'A2A Bridge: nur synchron, 120 s Timeout'), { size: 7 })}
    ${cross(22, 149)}${t(32, 152, l('native Agentforce A2A: no status yet', 'natives Agentforce-A2A: noch ohne Status'), { size: 7 })}`,

  'agentforce-eu-data-residency': (l) => `
    ${box(14, 40, 96, 56)}${t(62, 58, 'AGENTFORCE', { fill: D, size: 7.5, anchor: 'middle' })}${t(62, 72, l('dealer enquiry', 'Händleranfrage'), { size: 7, anchor: 'middle' })}${t(62, 85, l('Data 360 region', 'Data-360-Region'), { size: 7, anchor: 'middle' })}
    ${tag(14, 104, 96, l('get it in writing', 'schriftlich klären'))}
    <path d="M110 68H126M126 28V112" stroke="${G}" stroke-width="1.2"/>
    ${arrow(126, 28, 152, C)}${arrow(126, 70, 152)}${arrow(126, 112, 152)}
    ${box(152, 12, 154, 32, C)}${t(162, 25, 'BEDROCK', { fill: C, size: 7.5 })}${t(162, 37, l('Claude, Amazon: trust boundary', 'Claude, Amazon: Trust Boundary'), { size: 7 })}
    ${box(152, 54, 154, 32)}${t(162, 67, 'SHARED TRUST ZONE', { fill: D, size: 7.5 })}${t(162, 79, l('OpenAI: US or Azure EU', 'OpenAI: USA oder Azure EU'), { size: 7 })}
    ${box(152, 96, 154, 32)}${t(162, 109, 'BYOLLM', { fill: D, size: 7.5 })}${t(162, 121, l('your own contract governs', 'Ihr eigener Vertrag gilt'), { size: 7 })}
    <path d="M14 138H306" stroke="${L}"/>
    ${t(14, 152, l('EU Operating Zone: Agentforce not confirmed', 'EU Operating Zone: Agentforce unbestätigt'), { size: 7 })}
    ${t(306, 152, l('Koa: US regions first', 'Koa: zuerst US-Regionen'), { size: 7, anchor: 'end' })}`,

  'agentforce-kpis-after-go-live': (l) => `
    ${t(18, 18, l('DAY 90 REVIEW (SCENARIO)', 'PRÜFUNG AN TAG 90 (SZENARIO)'), { fill: D, size: 7 })}
    ${[[l('escalation rate', 'Eskalationsquote'), '30 %'], [l('task resolution', 'Task Resolution'), '52 %'], [l('out of hours', 'außerhalb Servicezeit'), '26 %'], [l('per resolved enquiry', 'pro gelöster Anfrage'), l('$3.06', '3,06 €')], [l('service rep per enquiry', 'Servicekraft pro Anfrage'), l('$6.00', '6,00 €')]]
      .map(([a, b], i) => t(18, 38 + i * 16, String(a), { size: 7 }) + t(150, 38 + i * 16, String(b), { fill: i === 3 ? C : D, size: 7.5, anchor: 'end' }) + `<path d="M18 ${42 + i * 16}H150" stroke="${L}"/>`).join('')}
    ${t(176, 18, l('PER SUBAGENT', 'PRO SUBAGENT'), { fill: D, size: 7 })}
    ${box(176, 26, 126, 22)}${check(184, 34)}${t(198, 40, l('order status: stays', 'Auftragsstatus: bleibt'), { size: 7 })}
    ${box(176, 56, 126, 22, C)}${cross(188, 67)}${t(198, 70, l('spare parts: $9.12', 'Ersatzteile: 9,12 €'), { fill: C, size: 7 })}
    ${t(176, 94, l('escalation 57 %, switched off', 'Eskalation 57 %, abgeschaltet'), { size: 7 })}
    <path d="M18 128H302" stroke="${G}" stroke-width="0.8"/>${dot(60, 128, G, 2.5)}${dot(160, 128, G, 2.5)}${dot(260, 128, C, 3.5)}
    ${t(60, 146, l('day 30', 'Tag 30'), { size: 7, anchor: 'middle' })}${t(160, 146, l('day 60', 'Tag 60'), { size: 7, anchor: 'middle' })}${t(260, 146, l('day 90: decision', 'Tag 90: Entscheidung'), { fill: C, size: 7, anchor: 'middle' })}`,

  'agentforce-llm-choice-byollm': (l) => `
    ${t(18, 16, l('MODEL PER SUBAGENT', 'MODELL PRO SUBAGENT'), { fill: D, size: 7 })}
    ${box(18, 62, 70, 36)}${t(53, 78, 'ROUTER', { fill: D, size: 7.5, anchor: 'middle' })}${t(53, 90, 'HyperClassifier', { size: 6.5, anchor: 'middle' })}
    <path d="M88 80H98M98 38V122" stroke="${G}" stroke-width="1.2"/>
    ${arrow(98, 38, 112)}${arrow(98, 80, 112)}${arrow(98, 122, 112)}
    ${[[24, l('Order status', 'Auftragsstatus'), 'Gemini 3.5 Flash · Basic'], [66, l('Warranty check', 'Garantieprüfung'), 'Haiku 4.5 · Standard'], [108, l('Troubleshooting', 'Fehlersuche'), 'Haiku 4.5 vs Opus 4.8']]
      .map(([y, a, b]) => box(112, Number(y), 108, 28) + t(118, Number(y) + 12, String(a), { fill: D, size: 7 }) + t(118, Number(y) + 23, String(b), { size: 6.5 })).join('')}
    ${box(228, 24, 76, 112)}${t(266, 38, l('CREDITS / PROMPT', 'CREDITS / PROMPT'), { fill: D, size: 6.5, anchor: 'middle' })}
    ${[['Basic', '2'], ['Standard', '4'], ['Advanced', '16']].map(([a, b], i) => t(236, 58 + i * 16, a, { size: 7 }) + t(296, 58 + i * 16, b, { size: 7, anchor: 'end' }) + `<path d="M236 ${62 + i * 16}H296" stroke="${L}"/>`).join('')}
    <rect x="232" y="104" width="68" height="28" rx="3" fill="#fff" stroke="${C}" stroke-width="1.2" stroke-dasharray="3 2"/>
    ${t(237, 116, 'BYOLLM', { fill: C, size: 7 })}${t(295, 116, '2', { fill: C, size: 7, anchor: 'end' })}${t(266, 127, l('+ own contract', '+ eigener Vertrag'), { fill: C, size: 6, anchor: 'middle' })}
    ${t(18, 152, l('Salesforce Default: managed mix, currently incl. GPT-4o', 'Salesforce Default: verwalteter Mix, derzeit mit GPT-4o'), { size: 7 })}`,

  'audit-trail-ai-agents': (l) => `
    ${box(14, 50, 72, 52)}${t(50, 72, 'AGENT', { fill: D, anchor: 'middle' })}${t(50, 86, 'Claude · MCP', { size: 7, anchor: 'middle' })}
    <path d="M86 76H100M100 26V122" stroke="${G}" stroke-width="1.2"/>
    ${arrow(100, 26, 120)}${arrow(100, 58, 120, C)}${arrow(100, 90, 120)}${arrow(100, 122, 120)}
    ${box(120, 14, 184, 24)}${t(128, 29, l('Trust Layer audit', 'Trust-Layer-Audit'), { fill: D })}${t(296, 29, l('Data 360, no period', 'Data 360, ohne Frist'), { size: 6.5, anchor: 'end' })}
    ${box(120, 46, 184, 24, C)}${t(128, 61, l('API logs (MCP)', 'API-Logs (MCP)'), { fill: D })}${t(296, 61, l('1 day free', '1 Tag kostenlos'), { fill: C, size: 6.5, anchor: 'end' })}
    ${box(120, 78, 184, 24)}${t(128, 93, 'Event Monitoring', { fill: D })}${t(296, 93, l('30 days to 1 year', '30 Tage bis 1 Jahr'), { size: 6.5, anchor: 'end' })}
    ${box(120, 110, 184, 24)}${t(128, 125, 'Setup Audit Trail', { fill: D })}${t(296, 125, l('min. 180 days', 'mind. 180 Tage'), { size: 6.5, anchor: 'end' })}
    ${t(160, 151, l('no backfill: switch on before go-live', 'kein Nachtrag: vor Go-live einschalten'), { size: 7, anchor: 'middle' })}`,

  'community-mcp-servers-risks': (l) => `
    ${t(18, 18, l('BEFORE APPROVAL: 6 CHECKS', 'VOR DER FREIGABE: 6 PRÜFPUNKTE'), { fill: D, size: 7.5 })}
    ${[l('identity', 'Identität'), l('credentials', 'Zugangsdaten'), l('pinned version', 'gepinnte Version')].map((s, i) => dot(22, 35 + i * 16, G, 2.5) + t(30, 38 + i * 16, s, { size: 7 })).join('')}
    ${[l('tool list', 'Werkzeugliste'), l('other tools', 'andere Werkzeuge'), l('target org', 'Ziel-Org')].map((s, i) => dot(112, 35 + i * 16, G, 2.5) + t(120, 38 + i * 16, s, { size: 7 })).join('')}
    ${arrow(192, 52, 214, C)}
    ${box(214, 24, 92, 58, C)}${t(260, 40, 'HOSTED MCP', { fill: C, size: 7.5, anchor: 'middle' })}${t(260, 53, 'named user', { size: 7, anchor: 'middle' })}${t(260, 64, 'OAuth + PKCE', { size: 7, anchor: 'middle' })}${t(260, 75, l('off by default', 'standardmäßig aus'), { size: 7, anchor: 'middle' })}
    <path d="M18 96H302" stroke="${L}"/>
    ${cross(22, 110)}${t(32, 114, l('postmark-mcp 1.0.16: BCC of every email', 'postmark-mcp 1.0.16: Blindkopie jeder Mail'), { size: 7 })}
    ${cross(22, 128)}${t(32, 132, l('mcp-remote: CVSS 9.6, 437,000+ downloads', 'mcp-remote: CVSS 9,6, über 437.000 Downloads'), { size: 7 })}
    ${t(18, 152, l('nightly jobs: integration, not MCP', 'nächtliche Jobs: Integration, kein MCP'), { fill: D, size: 7.5 })}
    ${tag(232, 108, 74, l('20 Feb 2027', '20.02.2027'))}${t(269, 142, l('password flow ends', 'Passwort-Flow endet'), { size: 7, anchor: 'middle' })}`,

  'einstein-bots-to-agentforce': (l) => `
    ${t(18, 18, l('PORTAL BOT, 4,000 CHATS / MONTH (SCENARIO)', 'PORTAL-BOT, 4.000 GESPRÄCHE / MONAT (SZENARIO)'), { fill: D, size: 7 })}
    ${box(18, 26, 128, 84)}${t(28, 41, l('EINSTEIN BOT: MENU', 'EINSTEIN BOT: MENÜ'), { fill: D, size: 7.5 })}
    ${[l('Order status', 'Auftragsstatus'), l('Manuals by serial', 'Handbücher per Serie'), l('Warranty registration', 'Garantieregistrierung'), l('Breakdown to human', 'Ausfall an Menschen')]
      .map((s, i) => check(28, 51 + i * 14, G) + t(42, 57 + i * 14, s, { size: 7 })).join('')}
    ${arrow(146, 68, 196, C)}${t(171, 61, l('free text', 'Freitext'), { fill: C, size: 7, anchor: 'middle' })}${t(171, 82, '35 %', { fill: C, size: 7, anchor: 'middle' })}
    ${box(196, 44, 106, 48, C)}${t(249, 64, 'AGENTFORCE', { fill: D, size: 8, anchor: 'middle' })}${t(249, 78, 'Service Agent', { size: 7, anchor: 'middle' })}
    ${tag(196, 100, 106, 'Upgrade Agent: Labs')}
    <path d="M18 126H302" stroke="${L}"/>
    ${t(18, 140, l('all to agent: 2.88M credits/yr > 2.75M Max pool', 'alles zum Agenten: 2,88 Mio. Credits/Jahr > 2,75 Mio. Max'), { fill: D, size: 7 })}
    ${t(18, 153, l('hybrid: 1.34M credits/yr, 20 credits ($0.10) per action', 'hybrid: 1,34 Mio. Credits/Jahr, 20 Credits (0,10 €) pro Aktion'), { size: 7 })}`,

  'einstein-trust-layer-explained': (l) => `
    ${box(14, 40, 70, 44)}${t(49, 58, l('AGENT', 'AGENT'), { fill: D, size: 8, anchor: 'middle' })}${t(49, 72, 'Agentforce', { size: 7, anchor: 'middle' })}
    ${arrow(84, 62, 112)}
    ${box(112, 18, 130, 92, C)}${t(122, 34, 'TRUST LAYER', { fill: C, size: 7.5 })}
    ${check(122, 42, G)}${t(136, 48, 'zero data retention', { size: 7 })}
    ${check(122, 58, G)}${t(136, 64, l('toxicity score 0 to 1', 'Toxizität 0 bis 1'), { size: 7 })}
    ${check(122, 74, G)}${t(136, 80, l('audit trail, Data 360', 'Audit Trail, Data 360'), { size: 7 })}
    ${cross(126, 94)}${t(136, 98, l('masking: off for agents', 'Agenten: ohne Maskierung'), { size: 7 })}
    ${arrow(242, 62, 262)}
    ${box(262, 40, 44, 44)}${t(284, 66, 'LLM', { fill: D, size: 8, anchor: 'middle' })}
    <path d="M14 124H306" stroke="${L}"/>
    ${t(14, 140, l('prices, contracts: permissions + actions', 'Preise, Verträge: Rechte + Aktionen'), { fill: D, size: 7.5 })}
    ${t(14, 154, l('masking on = 65,536 token context', 'Maskierung an = 65.536 Token Kontext'), { size: 7 })}`,

  'breakdown-hotline-voice-agent': (l) => `
    ${box(18, 56, 78, 40)}${t(57, 73, l('HOTLINE CALL', 'HOTLINE-ANRUF'), { fill: D, size: 7.5, anchor: 'middle' })}${t(57, 86, l('German: GA', 'Deutsch: GA'), { size: 7, anchor: 'middle' })}
    ${arrow(96, 76, 112)}
    ${box(112, 40, 86, 72)}${t(155, 55, 'TRIAGE', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('caller + asset', 'Anrufer + Anlage'), l('machine down?', 'Stillstand?'), l('entitlement', 'Entitlement')].map((s, i) => dot(124, 69 + i * 14, G, 2) + t(131, 72 + i * 14, s, { size: 6.5 })).join('')}
    ${arrow(198, 50, 218)}
    ${box(218, 26, 84, 40)}${t(260, 43, l('MACHINE DOWN', 'STILLSTAND'), { fill: D, size: 7.5, anchor: 'middle' })}${t(260, 56, l('to dispatcher', 'an Disposition'), { size: 7, anchor: 'middle' })}
    ${arrow(198, 100, 218, C)}
    ${box(218, 82, 84, 40, C)}${t(260, 99, l('RUNS + COVERED', 'LÄUFT + ABGEDECKT'), { fill: D, size: 7, anchor: 'middle' })}${t(260, 112, l('agent books', 'Agent bucht'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M18 130H302" stroke="${L}"/>
    ${t(18, 142, l('4 voice actions = 120 credits = $0.60 per call', '4 Sprachaktionen = 120 Credits = 0,60 € pro Anruf'), { size: 7 })}
    ${t(18, 153, l('Voice Minutes: 60 credits per minute', 'Voice Minutes: 60 Credits pro Minute'), { size: 7 })}`,

  'distributor-replenishment-agent': (l) => `
    ${t(18, 18, l('REPLENISHMENT: WHO OWNS WHAT', 'NACHSCHUB: WER FÜHRT WAS'), { fill: D, size: 7 })}
    ${box(18, 28, 118, 70)}${t(77, 42, 'SALESFORCE', { fill: D, size: 7.5, anchor: 'middle' })}
    ${[l('distributor stock', 'Händlerbestand'), l('min/max policy', 'Min/Max-Regel'), l('proposal', 'Vorschlag')].map((s, i) => t(28, 58 + i * 14, s, { size: 7 })).join('')}
    ${box(184, 28, 118, 70, C)}${t(243, 42, 'SAP / proALPHA', { fill: D, size: 7.5, anchor: 'middle' })}
    ${['ATP', l('price', 'Preis'), l('credit limit', 'Kreditlimit'), l('order number', 'Auftragsnummer')].map((s, i) => t(194, 56 + i * 11, s, { size: 7 })).join('')}
    ${arrow(136, 54, 184, C)}${t(160, 48, l('simulate', 'simulieren'), { fill: C, size: 7, anchor: 'middle' })}
    <path d="M184 76H137" stroke="${G}" stroke-width="1.3"/><path d="M141 72.5l-5 3.5 5 3.5" fill="none" stroke="${G}" stroke-width="1.3"/>${t(160, 90, l('confirms', 'bestätigt'), { size: 7, anchor: 'middle' })}
    <path d="M18 106H302" stroke="${L}"/>
    ${t(18, 118, l('GATES SET BY CODE', 'SPERREN PER CODE'), { fill: D, size: 7 })}
    ${[[l('credit from ERP', 'Kredit aus ERP'), 18, 128], [l('quantity cap', 'Mengengrenze'), 110, 128], [l('dealer confirms', 'Händler bestätigt'), 18, 144], [l('duplicate check', 'Dublettenprüfung'), 110, 144]]
      .map(([s, x, y], i) => check(Number(x), Number(y), i === 0 ? C : G) + t(Number(x) + 12, Number(y) + 5, String(s), { size: 7 })).join('')}
    ${tag(210, 112, 92, l('read-only first', 'zuerst lesend'))}
    ${t(256, 148, l('then write actions', 'dann schreibend'), { size: 7, anchor: 'middle' })}`,

  'field-service-ai-troubleshooting-manuals': (l) => `
    ${t(18, 18, l('SAME KEY ON ASSET AND DOCUMENT', 'GLEICHER SCHLÜSSEL AN ANLAGE UND DOKUMENT'), { fill: D, size: 7 })}
    ${box(18, 28, 88, 42)}${t(62, 45, l('ASSET', 'ANLAGE'), { fill: D, size: 8, anchor: 'middle' })}${t(62, 59, 'MC-800 · SN 4217', { size: 7, anchor: 'middle' })}
    ${arrow(106, 49, 146, C)}
    ${box(146, 28, 156, 42, C)}${t(156, 41, l('MANUAL / BULLETIN', 'HANDBUCH / BULLETIN'), { fill: D, size: 7 })}${t(156, 53, l('variant key MC-800', 'Variantenschlüssel MC-800'), { size: 7 })}${t(156, 64, l('serial range 4100 to 4380', 'Seriennr. 4100 bis 4380'), { fill: C, size: 7 })}
    ${t(18, 88, l('IN THE INDEX', 'IM INDEX'), { fill: D, size: 7 })}
    ${check(18, 99, G)}${t(32, 104, l('one valid version', 'eine gültige Fassung'), { size: 6.5 })}
    ${cross(120, 100)}${t(130, 104, l('old bulletins', 'überholte Bulletins'), { size: 6.5 })}
    ${cross(214, 100)}${t(224, 104, l('stock, prices', 'Bestände, Preise'), { size: 6.5 })}
    <path d="M18 114H302" stroke="${L}"/>
    ${box(18, 122, 136, 30)}${t(86, 134, 'Data Library', { fill: D, size: 7, anchor: 'middle' })}${t(86, 146, l('1 source, 1 product line', '1 Quelle, 1 Produktlinie'), { size: 7, anchor: 'middle' })}
    ${box(166, 122, 136, 30)}${t(234, 134, l('Data 360 setup', 'Data-360-Setup'), { fill: D, size: 7, anchor: 'middle' })}${t(234, 146, l('filter fields, max 10 conditions', 'Filterfelder, bis 10 Bedingungen'), { size: 6.5, anchor: 'middle' })}`,

  'partner-sales-assistant-dealer-quotes': (l) => `
    ${t(18, 18, l('QUOTE DATA FIRST', 'ERST DIE ANGEBOTSDATEN'), { fill: D, size: 7 })}
    ${tag(150, 4, 72, "Summer '26")}${tag(232, 4, 72, "Winter '27")}
    ${t(186, 37, 'Partner Sales Assistant', { size: 6, anchor: 'middle' })}${t(268, 37, 'Sales Concierge', { size: 6, anchor: 'middle' })}
    ${box(14, 30, 104, 100)}
    ${[l('catalogue', 'Katalog'), l('tier prices', 'Stufenpreise'), l('build rules', 'Baubarkeit'), l('discount limits', 'Rabattgrenzen')].map((s, i) => check(24, 50 + i * 20, G) + t(38, 55 + i * 20, s, { size: 7.5 })).join('')}
    ${arrow(118, 80, 150, C)}
    ${box(150, 50, 74, 60, C)}${t(187, 70, 'AGENT', { fill: D, size: 7.5, anchor: 'middle' })}${t(187, 84, l('finds products', 'findet Produkte'), { size: 6.8, anchor: 'middle' })}${t(187, 96, l('builds quotes', 'baut Angebote'), { size: 6.8, anchor: 'middle' })}
    ${arrow(224, 80, 238)}
    ${box(238, 56, 68, 48)}${t(272, 76, l('QUOTE', 'ANGEBOT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(272, 90, l('dealer, customer', 'Händler, Kunde'), { size: 6.2, anchor: 'middle' })}
    ${t(14, 150, l('SAP tiers missing = list price in the quote', 'SAP-Stufen fehlen = Listenpreis im Angebot'), { size: 7 })}`,

  'predictive-maintenance-data-readiness': (l) => `
    ${t(18, 18, l('SCENARIO: 300 MACHINES, 12 SIGNALS / MONTH', 'SZENARIO: 300 MASCHINEN, 12 SIGNALE / MONAT'), { fill: D, size: 7 })}
    <rect x="18" y="28" width="230" height="18" rx="3" fill="#fff" stroke="${G}" stroke-width="1.1"/>${t(24, 40, l('raw readings, 1 per second', 'Rohwerte im Sekundentakt'), { size: 7 })}${t(302, 40, l('~$65,900', '~65.900 €'), { fill: D, size: 8, anchor: 'end' })}
    <rect x="18" y="54" width="4" height="18" rx="1" fill="${C}"/>${t(28, 66, l('15-minute aggregates', '15-Minuten-Aggregate'), { fill: C, size: 7 })}${t(302, 66, l('~$181', '~181 €'), { fill: C, size: 8, anchor: 'end' })}
    <path d="M18 82H302" stroke="${L}"/>
    ${t(18, 98, l('HISTORY BEFORE SENSORS', 'HISTORIE VOR SENSOREN'), { fill: D, size: 7 })}
    ${[l('work orders on the asset', 'Work Orders an der Anlage'), l('failure causes coded', 'Ursachen codiert'), l('dealer repairs reported', 'Händlerreparaturen gemeldet')]
      .map((s, i) => check(18, 108 + i * 14, G) + t(30, 113 + i * 14, s, { size: 7 })).join('')}
    ${tag(170, 104, 132, l('3,500 credits/1M rows', '3.500 Credits/Mio. Zeilen'))}${t(236, 138, l('streaming, base tier', 'Streaming, Basisstaffel'), { size: 7, anchor: 'middle' })}`,

  'prompt-builder-or-agent': (l) => `
    ${box(18, 22, 130, 76)}${t(83, 38, 'PROMPT TEMPLATE', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(28, 54, l('1 record in, 1 text out', '1 Datensatz rein, 1 Text raus'), { size: 6.5 })}
    ${check(28, 62)}${t(42, 68, l('person reads first', 'Mensch liest vorher'), { size: 7 })}
    ${t(28, 88, l('Standard prompt: 4 credits', 'Standard-Prompt: 4 Credits'), { fill: C, size: 7 })}
    ${box(172, 22, 130, 76)}${t(237, 38, 'AGENTFORCE AGENT', { fill: D, size: 7.5, anchor: 'middle' })}
    ${t(182, 54, l('picks next step', 'wählt nächsten Schritt'), { size: 7 })}
    ${check(182, 62, G)}${t(196, 68, l('writes via actions', 'schreibt per Aktion'), { size: 7 })}
    ${t(182, 88, l('action: 20 credits', 'Aktion: 20 Credits'), { size: 7 })}
    <path d="M18 112H302" stroke="${L}"/>
    ${t(18, 128, l('SCENARIO PER MONTH', 'SZENARIO PRO MONAT'), { fill: D, size: 7 })}
    ${t(18, 144, l('4 template jobs: 53,600 credits', '4 Template-Aufgaben: 53.600 Credits'), { fill: C, size: 7 })}
    ${t(172, 144, l('dealer agent: 132,000', 'Händleragent: 132.000'), { size: 7 })}
    ${t(18, 154, l('per 2,000 tokens, rounded up', 'pro 2.000 Tokens, aufgerundet'), { size: 7 })}`,

  'sales-planning-agent-agreements': (l) => `
    ${box(14, 56, 48, 40)}${t(38, 73, 'ERP', { fill: D, size: 7.5, anchor: 'middle' })}${t(38, 85, l('actuals', 'Ist-Mengen'), { size: 6.8, anchor: 'middle' })}
    ${arrow(62, 76, 100)}${t(81, 68, l('1:00 AM', '1:00 Uhr'), { size: 6.5, anchor: 'middle' })}
    ${box(100, 52, 70, 48)}${t(135, 72, 'SALES', { fill: D, size: 7.5, anchor: 'middle' })}${t(135, 83, 'AGREEMENT', { fill: D, size: 7.5, anchor: 'middle' })}
    <rect x="100" y="112" width="70" height="24" rx="5" fill="#fff" stroke="${G}" stroke-width="1" stroke-dasharray="4 3"/>${t(135, 127, 'Account Forecast', { size: 6.5, anchor: 'middle' })}${cross(180, 124)}
    ${arrow(170, 76, 188, C)}
    ${box(188, 18, 120, 94, C)}${t(248, 32, 'SALES PLANNING AGENT', { fill: D, size: 7, anchor: 'middle' })}
    ${[l('questions, summaries', 'Fragen, Zusammenfassungen'), l('bulk updates', 'Massenänderungen'), l('visits, emails', 'Besuche, E-Mails'), l('program forecasts', 'Programmprognosen')].map((s, i) => check(196, 46 + i * 16) + t(208, 52 + i * 16, s, { size: 6.2 })).join('')}
    <rect x="188" y="120" width="120" height="22" rx="5" fill="#fff" stroke="${G}" stroke-width="1" stroke-dasharray="4 3"/>${t(196, 134, l('build plan alerts', 'Hinweise Produktionsplan'), { size: 6.5 })}${cross(298, 131)}
    ${t(14, 152, l('3 subagents documented, alerts not described', '3 Subagents dokumentiert, Hinweise nicht beschrieben'), { size: 7 })}`,

  'siemens-agentforce-lessons': (l) => `
    ${t(18, 18, l('SIEMENS · 15 SEP 2026', 'SIEMENS · 15.09.2026'), { fill: D, size: 7 })}${t(176, 18, l('ORDER, MID-SIZED (SCENARIO)', 'REIHENFOLGE MITTELSTAND'), { fill: D, size: 7 })}
    ${box(18, 26, 134, 36, C)}${t(26, 41, l('LIVE: 2 lead agents', 'LIVE: 2 Lead-Agenten'), { fill: C, size: 7.5 })}${t(26, 54, l('18,000 sellers · 132 countries', '18.000 Vertriebler · 132 Länder'), { size: 6.5 })}
    ${t(18, 80, l('ANNOUNCED ("will")', 'ANGEKÜNDIGT ("will")'), { fill: D, size: 7 })}
    ${['Teamcenter', l('Piper for distributors', 'Piper für Vertriebspartner'), l('onboarding in SAP', 'Onboarding in SAP')].map((s, i) => dot(24, 92 + i * 14, G, 2.5) + t(34, 95 + i * 14, s, { size: 7 })).join('')}
    ${arrow(156, 66, 174, C)}
    ${[l('read only, high volume', 'nur lesen, hohes Volumen'), l('read ERP via API', 'ERP per API lesen'), l('parts by serial number', 'Teile per Seriennummer'), l('write to ERP last', 'ins ERP schreiben zuletzt')]
      .map((s, i) => box(176, 26 + i * 26, 128, 20, i === 0 ? C : G) + t(186, 39 + i * 26, String(i + 1), { fill: i === 0 ? C : D, size: 7.5 }) + t(198, 39 + i * 26, s, { fill: i === 0 ? C : G, size: 6.5 })).join('')}
    <path d="M18 136H304" stroke="${L}"/>
    ${t(18, 150, l('data work for serial numbers starts on day one', 'Datenarbeit für Seriennummern startet am ersten Tag'), { fill: D, size: 7.5 })}`,

  'spare-parts-serial-number-ai': (l) => `
    ${t(18, 20, l('SPARE PARTS BY SERIAL NUMBER', 'ERSATZTEILE PER SERIENNUMMER'), { fill: D, size: 7 })}
    ${[['PLM', l('as-built BOM', 'As-built-Stückliste')], ['ERP', l('material, price', 'Material, Preis')], ['Salesforce', l('asset, serial no.', 'Asset, Seriennr.')]]
      .map(([a, b], i) => box(14, 30 + i * 34, 86, 26) + t(57, 41 + i * 34, String(a), { fill: D, size: 7, anchor: 'middle' }) + t(57, 51 + i * 34, String(b), { size: 7, anchor: 'middle' }) + arrow(100, 43 + i * 34, 136)).join('')}
    ${box(136, 30, 64, 94, C)}${t(168, 72, l('PARTS API', 'TEILE-API'), { fill: D, size: 7.5, anchor: 'middle' })}${t(168, 86, l('rule-based', 'regelbasiert'), { fill: C, size: 7, anchor: 'middle' })}
    ${arrow(200, 77, 224, C)}
    ${box(224, 30, 82, 94)}${t(265, 46, 'AGENT', { fill: D, size: 7.5, anchor: 'middle' })}
    ${check(231, 62)}${t(243, 67, l('narrows down', 'grenzt ein'), { size: 7 })}
    ${check(231, 82)}${t(243, 87, l('work order', 'Arbeitsauftrag'), { size: 7 })}
    ${cross(235, 105)}${t(243, 108, l('guesses part', 'rät Teilenr.'), { size: 7 })}
    <path d="M14 136H306" stroke="${L}"/>
    ${t(14, 150, l('Siemens + Teamcenter: announced', 'Siemens + Teamcenter: angekündigt'), { size: 7 })}
    ${t(306, 150, l('3 actions = $0.30', '3 Aktionen = 0,30 €'), { fill: C, size: 7, anchor: 'end' })}`,

  'aela-flat-fee-vs-credits': (l) => `
    ${box(18, 28, 134, 58)}${t(28, 44, 'FLEX CREDITS', { fill: D, size: 7.5 })}${t(28, 58, l('$500 per 100K credits', '500 € je 100K Credits'), { size: 7 })}${t(28, 72, l('pay per use, no rollover', 'Verbrauch, kein Übertrag'), { size: 7 })}
    ${box(168, 28, 134, 58, C)}${t(178, 44, 'AELA', { fill: D, size: 7.5 })}${t(178, 58, l('fixed fee, 2 or 3 years', 'Pauschale, 2 oder 3 Jahre'), { size: 7 })}${t(178, 72, l('price not public', 'Preis nicht öffentlich'), { fill: C, size: 7 })}
    ${t(18, 106, l('PayGo or Pre-Commit', 'PayGo oder Pre-Commit'), { size: 7 })}
    ${t(170, 100, l('term', 'Laufzeit'), { size: 7 })}${arrow(168, 106, 218, C)}${tag(220, 96, 82, l('RENEWAL', 'VERLÄNGERUNG'))}
    <path d="M18 124H302" stroke="${L}"/>
    ${t(18, 140, l('Scenario: $150K a year = 30M credits = 1.5M actions', 'Szenario: 150K € im Jahr = 30 Mio. Credits = 1,5 Mio. Aktionen'), { fill: D, size: 7.5 })}
    ${t(18, 153, l('120+ AELAs sold in Q4 FY26 (earnings call)', '120+ AELAs verkauft in Q4 FY26 (Earnings Call)'), { size: 7 })}`,

  'agentforce-agents-release-pipeline': (l) => `
    ${[['Git PR', G], [l('validate', 'validieren'), G], [l('deploy', 'deployen'), G], ['publish', G], [l('activate', 'aktivieren'), C]]
      .map(([s, c], i) => box(10 + i * 62, 20, 50, 24, String(c)) + t(35 + i * 62, 35, String(s), { fill: i === 4 ? C : D, size: 7, anchor: 'middle' }) + (i < 4 ? arrow(60 + i * 62, 32, 72 + i * 62) : '')).join('')}
    ${t(221, 56, l('inactive', 'inaktiv'), { size: 7, anchor: 'middle' })}${t(283, 56, '--version N', { fill: C, size: 7, anchor: 'middle' })}
    ${t(18, 84, l('rollback = reactivate v3', 'Rollback = v3 aktivieren'), { size: 7 })}
    <path d="M90 106C82 92 50 92 44 104" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M43 97.5L44 104L49.5 101" fill="none" stroke="${G}" stroke-width="1.2"/>
    <path d="M22 112H156" stroke="${G}" stroke-width="0.8"/>${dot(42, 112)}${dot(90, 112, C, 4.5)}${dot(138, 112)}
    ${t(42, 128, 'v3', { size: 7, anchor: 'middle' })}${t(90, 128, l('v4 active', 'v4 aktiv'), { fill: C, size: 7, anchor: 'middle' })}${t(138, 128, 'v5', { size: 7, anchor: 'middle' })}
    ${box(176, 72, 126, 64)}${t(186, 88, l('PRODUCTION', 'PRODUKTION'), { fill: D, size: 7.5 })}
    ${[l('1 active version', '1 aktive Version'), l('no Builder hotfix', 'kein Builder-Hotfix'), l('activate: client', 'Aktivieren: Kunde')].map((s, i) => t(186, 102 + i * 13, s, { size: 7 })).join('')}
    ${t(18, 152, l('release note: Git commit = prod version', 'Release Note: Git-Commit = Prod-Version'), { size: 7 })}`,

  'ai-org-assessment-technical-debt': (l) => `
    ${t(18, 18, l('ORG ASSESSMENT, 2,250 COMPONENTS', 'ORG-ANALYSE, 2.250 KOMPONENTEN'), { fill: D, size: 7 })}
    ${box(18, 30, 92, 64)}${t(28, 46, l('TOOLS COUNT', 'TOOLS ZÄHLEN'), { fill: D, size: 7.5 })}
    ${t(28, 62, 'Code Analyzer', { size: 7 })}${t(28, 74, 'sfdx-hardis', { size: 7 })}${t(28, 86, l('Apex test run', 'Apex-Testlauf'), { size: 7 })}
    ${arrow(110, 62, 136)}
    ${box(136, 30, 82, 64, C)}${t(177, 50, l('LLM READS', 'LLM LIEST'), { fill: D, size: 7.5, anchor: 'middle' })}${t(177, 66, 'Batch API', { fill: C, size: 7, anchor: 'middle' })}${t(177, 80, l('half price', 'halber Preis'), { size: 7, anchor: 'middle' })}
    ${arrow(218, 62, 244)}
    ${box(244, 30, 60, 64)}${t(274, 50, l('ARCHITECT', 'ARCHITEKT'), { fill: D, size: 7.5, anchor: 'middle' })}${t(274, 66, l('samples', 'Stichproben'), { size: 7, anchor: 'middle' })}${t(274, 80, l('~10 days', '~10 Tage'), { size: 7, anchor: 'middle' })}
    <path d="M18 110H302" stroke="${L}"/>
    ${t(18, 128, l('Sonnet 5.5: about $59', 'Sonnet 5.5: rund 59 $'), { fill: D, size: 7.5 })}${t(18, 144, l('Opus 5.5: about $119', 'Opus 5.5: rund 119 $'), { fill: D, size: 7.5 })}
    ${t(302, 128, l('by hand: ~47 days', 'von Hand: ~47 Tage'), { size: 7, anchor: 'end' })}${t(302, 144, l('scenario, US list prices', 'Szenario, US-Listenpreise'), { size: 7, anchor: 'end' })}`,

  'devops-ai-agents-copado-gearset': (l) => `
    ${t(18, 18, l('DEVOPS AI AGENTS, VENDOR CLAIMS', 'DEVOPS-KI-AGENTEN, HERSTELLERANGABEN'), { fill: D, size: 7 })}
    ${box(18, 28, 88, 70)}${t(26, 43, 'Copado Agentia', { fill: D, size: 7.5 })}${t(26, 58, l('available', 'verfügbar'), { size: 7 })}${t(26, 70, 'Advanced, Pro', { size: 7 })}${cross(30, 84)}${t(40, 87, l('model named', 'Modell genannt'), { size: 7 })}
    ${box(116, 28, 88, 70)}${t(124, 43, 'Gearset Cam', { fill: D, size: 7.5 })}${t(124, 58, l('pilots, 09/2026', 'Piloten, 09/2026'), { size: 7 })}${t(124, 70, l('1 client: 44 % PRs', '1 Kunde: 44 % PRs'), { size: 7 })}${cross(128, 84)}${t(138, 87, l('model named', 'Modell genannt'), { size: 7 })}
    ${box(214, 28, 88, 70)}${t(222, 43, 'Provar MCP', { fill: D, size: 7.5 })}${t(222, 58, l('local CLI plugin', 'lokales CLI-Plugin'), { size: 7 })}${t(222, 70, l('no extra cost', 'ohne Aufpreis'), { size: 7 })}${check(222, 83, G)}${t(236, 87, l('your assistant', 'Ihr Assistent'), { size: 7 })}
    ${t(18, 116, l('ASK IN WRITING BEFORE YOU PAY', 'VOR DEM KAUF SCHRIFTLICH FRAGEN'), { fill: D, size: 7 })}
    ${box(18, 124, 284, 24, C)}${t(160, 139, l('model · region · retention · cap · approval', 'Modell · Region · Speicherdauer · Limit · Freigabe'), { fill: C, size: 7.5, anchor: 'middle' })}`,

  'digital-wallet-chargeback': (l) => `
    ${t(18, 18, l('ONE ORG, ONE POOL (SCENARIO)', 'EINE ORG, EIN POOL (SZENARIO)'), { fill: D, size: 7 })}${t(302, 18, l('4.1M credits planned', '4,1 Mio. Credits geplant'), { fill: D, size: 7, anchor: 'end' })}
    ${[[18, 125, l('DE 1.8M', 'DE 1,8 Mio.')], [143, 97, l('US 1.4M', 'US 1,4 Mio.')], [240, 41, l('APAC', 'Asien')], [281, 21, 'IT']]
      .map(([x, w, s]) => `<rect x="${x}" y="28" width="${w}" height="22" fill="#fff" stroke="${G}" stroke-width="1.1"/>` + t(Number(x) + Number(w) / 2 - (Number(w) < 30 ? 3.5 : 0), 42, String(s), { size: Number(w) < 30 ? 6.5 : 7, anchor: 'middle' })).join('')}
    <path d="M295 24V58" stroke="${D}" stroke-width="1.3" stroke-dasharray="3 2"/>${t(302, 68, l('pool 4.0M, +100K overage', 'Pool 4,0 Mio., +100K Mehrverbrauch'), { size: 7, anchor: 'end' })}
    <path d="M18 80H302" stroke="${L}"/>
    ${[l('1 org = 1 pool, 1 contract owner', '1 Org = 1 Pool, 1 Vertragspartner'), l('chargeback: $5 per 1,000 credits', 'Verrechnung: 5 € pro 1.000 Credits'), l('overage: billed in arrears', 'Mehrverbrauch: nachträglich'), l('alerts yes, stop not documented', 'Warnungen ja, Stopp nicht dokumentiert')]
      .map((s, i) => dot(22, 95 + i * 15, G, 2) + t(30, 98 + i * 15, s, { size: 7 })).join('')}
    ${box(206, 88, 96, 56, C)}${t(254, 105, l('APAC 4 months late', 'Asien 4 Monate später'), { fill: C, size: 6.5, anchor: 'middle' })}${t(254, 119, l('300K credits expire', '300K Credits verfallen'), { fill: C, size: 6.5, anchor: 'middle' })}${t(254, 133, l('= $1,500', '= 1.500 €'), { fill: C, size: 7.5, anchor: 'middle' })}`,

  'multilingual-dealer-agents': (l) => `
    ${t(18, 18, l('AGENTFORCE LANGUAGES', 'AGENTFORCE-SPRACHEN'), { fill: D, size: 7 })}${t(166, 18, l('KNOWLEDGE', 'WISSEN'), { fill: D, size: 7 })}
    ${box(18, 28, 130, 40)}${t(28, 43, 'TEXT', { fill: D, size: 7.5 })}${t(28, 58, l('31 languages + 25 beta', '31 Sprachen + 25 Beta'), { size: 7 })}
    ${box(18, 76, 130, 40)}${t(28, 91, 'VOICE', { fill: D, size: 7.5 })}${t(28, 106, l('7 named, others unclear', '7 genannt, weitere offen'), { size: 7 })}
    <path d="M18 128H148" stroke="${L}"/>
    ${t(18, 140, l('Translation: 4,000 credits', 'Translation: 4.000 Credits'), { size: 7 })}${t(18, 152, l('per 1M characters = $20', 'pro 1 Mio. Zeichen = 20 €'), { size: 7 })}
    ${tag(166, 28, 30, 'it')}${arrow(196, 38, 220)}
    ${box(220, 28, 86, 20)}${t(263, 41, l('language filter', 'Sprachfilter'), { size: 7, anchor: 'middle' })}
    ${dot(171, 62, G, 2.5)}${t(180, 65, l('only Italian articles', 'nur italienische Artikel'), { size: 7 })}
    ${box(166, 76, 140, 40, C)}${t(176, 91, 'PIVOT', { fill: C, size: 7.5 })}${t(176, 106, l('question to EN, answer back', 'Frage nach EN, Antwort zurück'), { size: 7 })}
    <path d="M166 128H306" stroke="${L}"/>
    ${t(166, 140, l('other languages: often more tokens', 'andere Sprachen: oft mehr Tokens'), { size: 7 })}${t(166, 152, l('prompts: 2,000-token units', 'Prompts: 2.000-Token-Einheiten'), { size: 7 })}`,

  'sandbox-data-ai-coding-agents': (l) => `
    ${box(14, 58, 72, 44, C)}${t(50, 76, l('CODING AGENT', 'CODING-AGENT'), { fill: C, size: 7.5, anchor: 'middle' })}${t(50, 90, l('read = prompt', 'gelesen = Prompt'), { size: 6.5, anchor: 'middle' })}
    ${[l('Scratch org + seed data', 'Scratch Org + Seed-Daten'), l('Dev sandbox, metadata only', 'Dev-Sandbox, nur Metadaten'), l('Partial Copy masked, read only', 'Partial Copy maskiert, lesend'), l('Full Copy: all prod data', 'Full Copy: alle Prod-Daten')]
      .map((s, i) => box(146, 18 + i * 32, 160, 26) + t(156, 35 + i * 32, s, { size: 7.5, fill: i === 3 ? D : G })).join('')}
    ${[0, 1, 2].map((i) => `<path d="M86 80C116 80 116 ${31 + i * 32} 146 ${31 + i * 32}" fill="none" stroke="${C}" stroke-width="1.2"/>`).join('')}
    <path d="M86 80C116 80 116 127 146 127" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="4 3"/>${cross(121, 110)}
    ${t(14, 154, l('Claude Code: transcripts 30 days in plaintext', 'Claude Code: Protokolle 30 Tage im Klartext'), { size: 7 })}`,

  'setup-with-agentforce-admin-changes': (l) => `
    ${t(18, 18, 'SETUP WITH AGENTFORCE', { fill: D, size: 7 })}
    ${box(18, 30, 88, 44)}${t(62, 48, 'ASK SETUP AGENT', { fill: D, size: 7, anchor: 'middle' })}${t(62, 63, l('admin approves', 'Admin gibt frei'), { size: 7, anchor: 'middle' })}
    <path d="M106 52L132 41" stroke="${G}" stroke-width="1.2"/><path d="M106 52L132 84" stroke="${C}" stroke-width="1.3"/>
    ${box(132, 28, 170, 26)}${check(140, 40, G)}${t(154, 45, l('prod: questions, access, users', 'Prod: Fragen, Zugriff, Benutzer'), { size: 7 })}
    ${box(132, 66, 170, 36, C)}${t(142, 81, l('fields, flows, pages', 'Felder, Flows, Seiten'), { fill: D, size: 7 })}${t(142, 94, l('only via sandbox, PR, pipeline', 'nur über Sandbox, PR, Pipeline'), { fill: C, size: 7 })}
    <path d="M18 124H302" stroke="${G}" stroke-width="0.8"/>${dot(60, 124, G, 2.5)}${dot(160, 124, G, 2.5)}${dot(260, 124, G, 2.5)}
    ${t(60, 142, 'GA 05/2026', { size: 7, anchor: 'middle' })}${t(160, 142, l('500 free actions/month', '500 Aktionen frei/Monat'), { size: 7, anchor: 'middle' })}${t(260, 142, l('audit trail 180+ days', 'Audit Trail 180+ Tage'), { size: 7, anchor: 'middle' })}`,
  'sandbox-strategy-multiple-partners': (l) => `
    ${t(18, 20, l('ONE CHAIN · ONLY THE PIPELINE DEPLOYS', 'EINE KETTE · NUR DIE PIPELINE DEPLOYT'), { fill: D, size: 7 })}
    ${[['Dev', l('daily', 'täglich')], ['Integr.', l('from Git', 'aus Git')], ['Partial', l('5 days', '5 Tage')], ['Full', l('29 days', '29 Tage')], ['Prod', '']].map(([s, r], i) => box(18 + i * 60, 34, 50, 28, i === 3 ? C : G) + t(43 + i * 60, 51, s, { fill: i === 3 ? C : G, size: 7, anchor: 'middle' }) + (r ? t(43 + i * 60, 76, r, { size: 6.5, anchor: 'middle' }) : '')).join('')}
    ${[0, 1, 2, 3].map((i) => arrow(68 + i * 60, 48, 78 + i * 60, i === 2 ? C : G)).join('')}
    <path d="M18 100H302" stroke="${L}"/>
    ${t(18, 116, l('UAT and dress rehearsal in the Full Copy', 'UAT und Generalprobe in der Full Copy'), { size: 7 })}
    ${tag(18, 128, 200, l('Refresh deletes what is not in Git', 'Refresh löscht, was nicht in Git ist'))}`,

  'permission-concept-permission-sets': (l) => `
    ${t(18, 18, l('PERMISSIONS AND VISIBILITY SEPARATE', 'RECHTE UND SICHTBARKEIT GETRENNT'), { fill: D, size: 7 })}
    ${[[l('BASE PROFILE', 'BASISPROFIL'), l('per licence type', 'pro Lizenztyp')], ['PERMISSION SETS', l('per function', 'pro Funktion')], ['PERMISSION SET GROUPS', l('per role', 'pro Rolle')]].map(([a, b], i) => box(18, 28 + i * 34, 196, 26, i === 2 ? C : G) + t(28, 44 + i * 34, a, { fill: i === 2 ? C : D, size: 7 }) + t(206, 44 + i * 34, b, { size: 7, anchor: 'end' })).join('')}
    ${check(226, 72, G)}${t(238, 78, l('stream delivers', 'Stream liefert'), { size: 7 })}
    ${check(226, 106)}${t(238, 112, l('client decides', 'Kunde entscheidet'), { fill: C, size: 7 })}
    ${cross(24, 140)}${t(36, 143, l('no new permissions in profiles', 'keine neuen Rechte im Profil'), { size: 7 })}`,

  'salesforce-uat-business-testing': (l) => `
    ${t(18, 20, l('SYSTEM TEST BEFORE UAT · BUSINESS DECIDES', 'SYSTEMTEST VOR UAT · FACHBEREICH ENTSCHEIDET'), { fill: D, size: 7 })}
    ${[[l('Test cases', 'Testfälle'), l('business', 'Fachbereich')], [l('System test', 'Systemtest'), 'Partner'], ['UAT', l('business', 'Fachbereich')], ['Go/No-Go', l('business', 'Fachbereich')]].map(([s, o], i) => box(18 + i * 74, 32, 62, 28, i === 2 ? C : G) + t(49 + i * 74, 50, s, { fill: i === 2 ? C : G, size: 7, anchor: 'middle' }) + t(49 + i * 74, 74, o, { size: 6.5, anchor: 'middle' })).join('')}
    ${[0, 1, 2].map((i) => arrow(80 + i * 74, 46, 92 + i * 74, i === 1 ? C : G)).join('')}
    <path d="M18 88H302" stroke="${L}"/>
    ${t(18, 104, l('40 cases × 20 min × 2 roles ≈ 27 h', '40 Fälle × 20 Min × 2 Rollen ≈ 27 h'), { size: 7 })}
    ${tag(18, 120, 130, l('test users per role', 'Testnutzer pro Rolle'))}${t(158, 133, l('Full Copy, real volumes', 'Full Copy, echte Mengen'), { size: 7 })}`,

  'development-standards-definition-of-done': (l) => `
    ${box(18, 18, 136, 100)}${t(28, 34, l('STANDARDS', 'STANDARDS'), { fill: D, size: 7.5 })}
    ${[l('naming conventions', 'Namenskonventionen'), l('1 automation/object', '1 Automation/Objekt'), l('values in metadata', 'Werte in Metadata'), l('tests check results', 'Tests prüfen Ergebnis')].map((s, i) => check(28, 46 + i * 16, G) + t(42, 52 + i * 16, s, { size: 7 })).join('')}
    ${box(166, 18, 136, 100, C)}${t(176, 34, 'DEFINITION OF DONE', { fill: C, size: 7.5 })}
    ${[l('review approved', 'Review freigegeben'), l('pipeline green', 'Pipeline grün'), l('permission set', 'Permission Set'), l('system test logged', 'Systemtest im Ticket')].map((s, i) => check(176, 46 + i * 16) + t(190, 52 + i * 16, s, { size: 7 })).join('')}
    ${t(18, 140, l('first version: about 80 % of cases', 'erste Version: rund 80 % der Fälle'), { size: 7 })}${t(18, 152, l('5 partners · stable after about 3 months', '5 Partner · stabil nach etwa 3 Monaten'), { size: 7 })}`,

  'architecture-decision-log': (l) => `
    ${box(18, 18, 150, 124, C)}${t(28, 34, l('D-014 · DECIDED', 'E-014 · ENTSCHIEDEN'), { fill: C, size: 7.5 })}
    ${[l('context', 'Kontext'), l('options', 'Optionen'), l('decision', 'Entscheidung'), l('reasons', 'Gründe'), l('consequences', 'Folgen'), l('who and when', 'Wer und wann')].map((s, i) => dot(32, 49 + i * 15, G, 2) + t(40, 52 + i * 15, s, { size: 7 })).join('')}
    ${arrow(168, 38, 196, G, true)}
    ${box(196, 18, 106, 40)}${t(249, 34, l('D-009 · SUPERSEDED', 'E-009 · ERSETZT'), { fill: D, size: 7, anchor: 'middle' })}${t(249, 48, l('by D-014', 'durch E-014'), { size: 7, anchor: 'middle' })}
    ${[l('owned by client', 'gehört dem Kunden'), l('Markdown in Git', 'Markdown in Git'), l('never overwritten', 'nie überschrieben')].map((s, i) => check(196, 78 + i * 18, i === 0 ? C : G) + t(210, 84 + i * 18, s, { size: 7 })).join('')}`,

  'global-template-country-deviations': (l) => `
    ${t(18, 16, l('GLOBAL TEMPLATE · MIN. 80 % SHARED', 'GLOBALES TEMPLATE · MIND. 80 % GLEICH'), { fill: D, size: 7 })}
    ${[['DE', 184, l('tax', 'Steuern')], ['FR', 176, l('language', 'Sprache')], ['IT', 168, l('dealers', 'Händler')], ['US', 150, l('habit', 'Gewohnheit')]].map(([c, w, r], i) => t(18, 45 + i * 24, String(c), { size: 7 }) + `<rect x="40" y="${36 + i * 24}" width="${w}" height="12" rx="2" fill="#fff" stroke="${G}" stroke-width="1.2"/>` + `<rect x="${40 + Number(w)}" y="${36 + i * 24}" width="${200 - Number(w)}" height="12" rx="2" fill="#fff" stroke="${i === 3 ? G : C}" stroke-width="1.2"${i === 3 ? ' stroke-dasharray="3 2"' : ''}/>` + t(250, 45 + i * 24, String(r), { size: 7, fill: i === 3 ? G : C })).join('')}
    <path d="M200 28V126" stroke="${D}" stroke-width="1" stroke-dasharray="2 2"/>
    ${cross(306, 114)}
    ${t(18, 146, l('country values in custom metadata', 'Landeswerte in Custom Metadata'), { size: 7 })}`,

  'dora-metrics-salesforce-releases': (l) => `
    ${box(18, 18, 150, 82)}${t(28, 34, l('THROUGHPUT', 'DURCHSATZ'), { fill: D, size: 7.5 })}
    ${[l('change lead time', 'Durchlaufzeit'), l('deployment frequency', 'Deployment-Häufigkeit'), l('recovery time', 'Wiederherstellung')].map((s, i) => dot(32, 49 + i * 16, G, 2) + t(40, 52 + i * 16, s, { size: 7 })).join('')}
    ${box(180, 18, 122, 82, C)}${t(190, 34, l('INSTABILITY', 'STABILITÄT'), { fill: C, size: 7.5 })}
    ${[l('change fail rate', 'Fehlerquote'), l('rework rate', 'Nacharbeitsquote')].map((s, i) => dot(194, 49 + i * 16, C, 2) + t(202, 52 + i * 16, s, { size: 7 })).join('')}
    ${t(202, 86, l('new since 2024', 'neu seit 2024'), { size: 6.5 })}
    ${t(18, 120, l('12 releases · 4 hotfixes = 33 % fail rate', '12 Releases · 4 Hotfixes = 33 % Fehlerquote'), { size: 7 })}
    ${tag(18, 130, 150, l('trend, not a ranking', 'Trend, keine Rangliste'))}`,

  'duplicates-master-data-cleanup': (l) => `
    ${box(18, 18, 110, 26)}${t(28, 35, 'Muster GmbH', { size: 7 })}
    ${box(18, 52, 110, 26)}${t(28, 69, 'Muster AG', { size: 7 })}
    ${arrow(128, 48, 186, C)}
    ${box(186, 26, 116, 44, C)}${t(196, 43, l('1 ACCOUNT', '1 ACCOUNT'), { fill: C, size: 7.5 })}${t(196, 58, l('key: ERP number', 'Schlüssel: ERP-Nr.'), { size: 7 })}
    ${[[l('Measure', 'Messen')], [l('Key', 'Schlüssel')], [l('Merge', 'Bereinigen')], [l('Prevent', 'Verhindern')]].map(([s], i) => box(18 + i * 74, 92, 62, 22, i === 1 ? C : G) + t(49 + i * 74, 106, s, { fill: i === 1 ? C : G, size: 7, anchor: 'middle' })).join('')}
    ${[0, 1, 2].map((i) => arrow(80 + i * 74, 103, 92 + i * 74)).join('')}
    ${t(18, 140, l('upsert with external ID', 'Upsert mit External ID'), { size: 7 })}${t(302, 140, l('agent picks 1st match', 'Agent nimmt 1. Treffer'), { size: 7, anchor: 'end' })}`,
  'change-management-hub': (l) => `
    ${t(18, 18, l('WHERE IS IT STUCK? ADKAR', 'WO HÄNGT ES? ADKAR'), { fill: D, size: 7 })}
    ${[['A', l('awareness', 'Bewusstsein')], ['D', l('desire', 'Bereitschaft')], ['K', l('knowledge', 'Wissen')], ['A', l('ability', 'Fähigkeit')], ['R', l('reinforcement', 'Verankerung')]].map(([a, b], i) => box(18 + i * 58, 30, 52, 30, i === 4 ? C : G) + t(44 + i * 58, 49, a, { fill: i === 4 ? C : D, size: 9, anchor: 'middle' }) + t(44 + i * 58, 74, b, { size: 6.5, anchor: 'middle' })).join('')}
    <path d="M134 84V88H244V84" fill="none" stroke="${G}" stroke-width="1.1"/>
    ${t(189, 100, l('training helps here', 'Schulung hilft hier'), { size: 7, anchor: 'middle' })}
    ${t(18, 124, l('goals met: 88 % vs. 13 %', 'Ziele erreicht: 88 % vs. 13 %'), { fill: D, size: 7.5 })}
    ${t(18, 138, l('Prosci study, 2,668 participants', 'Prosci-Studie, 2.668 Teilnehmende'), { size: 7 })}`,

  'change-basics-definition': (l) => `
    ${t(18, 20, l('3 PHASES BY PROSCI', '3 PHASEN NACH PROSCI'), { fill: D, size: 7 })}
    ${[l('Prepare', 'Vorbereiten'), l('Manage', 'Steuern'), l('Sustain', 'Sichern')].map((s, i) => box(18 + i * 100, 30, 84, 30, i === 2 ? C : G) + t(60 + i * 100, 49, (i + 1) + ' · ' + s, { fill: i === 2 ? C : G, size: 7.5, anchor: 'middle' })).join('')}
    ${arrow(102, 45, 118)}${arrow(202, 45, 218, C)}
    <path d="M18 74H302" stroke="${L}"/>
    ${t(18, 92, l('project management: solution delivered', 'Projektmanagement: Lösung geliefert'), { size: 7 })}
    ${t(18, 108, l('change management: solution used', 'Change Management: Lösung genutzt'), { fill: C, size: 7 })}
    ${tag(18, 124, 170, l('goals met: 88 % vs. 13 %', 'Ziele erreicht: 88 % vs. 13 %'))}`,

  'change-basics-models': (l) => `
    ${t(18, 20, l('MODEL', 'MODELL'), { fill: D, size: 7 })}${t(110, 20, l('STEPS', 'SCHRITTE'), { fill: D, size: 7 })}${t(190, 20, l('LOOKS AT', 'BLICK AUF'), { fill: D, size: 7 })}
    ${[['Lewin', l('3 phases', '3 Phasen'), l('organisation', 'Organisation')], ['Kotter', l('8 steps', '8 Stufen'), l('leadership', 'Führung')], ['ADKAR', l('5 stages', '5 Stufen'), l('individual', 'Person')], ['Prosci', l('3 phases', '3 Phasen'), l('organisation', 'Organisation')]].map(([a, b, c], i) => t(18, 40 + i * 20, a, { fill: i === 2 ? C : D, size: 7.5 }) + t(110, 40 + i * 20, b, { fill: i === 2 ? C : G, size: 7 }) + t(190, 40 + i * 20, c, { fill: i === 2 ? C : G, size: 7 })).join('')}
    <path d="M18 112H302" stroke="${L}"/>
    ${tag(18, 124, 190, l('combine: frame plus diagnosis', 'kombinieren: Rahmen plus Diagnose'))}`,

  'change-basics-stakeholders': (l) => `
    ${t(18, 18, l('MATRIX: INFLUENCE × IMPACT', 'MATRIX: EINFLUSS × BETROFFENHEIT'), { fill: D, size: 7 })}
    ${box(18, 28, 96, 30)}${t(66, 46, l('keep satisfied', 'zufriedenstellen'), { size: 7, anchor: 'middle' })}
    ${box(120, 28, 96, 30)}${t(168, 46, l('manage closely', 'eng einbinden'), { size: 7, anchor: 'middle' })}
    ${box(18, 64, 96, 30)}${t(66, 82, l('monitor', 'beobachten'), { size: 7, anchor: 'middle' })}
    ${box(120, 64, 96, 30, C)}${t(168, 82, l('own plan', 'eigener Plan'), { fill: C, size: 7, anchor: 'middle' })}
    ${t(224, 46, l('high influence', 'hoher Einfluss'), { size: 7 })}${t(224, 82, l('low influence', 'geringer Einfluss'), { size: 7 })}
    ${t(66, 110, l('low impact', 'wenig betroffen'), { size: 7, anchor: 'middle' })}${t(168, 110, l('high impact', 'stark betroffen'), { fill: C, size: 7, anchor: 'middle' })}
    ${tag(18, 124, 190, l('action and owner per group', 'Maßnahme und Owner je Gruppe'))}`,

  'change-basics-curve': (l) => `
    ${t(18, 18, l('MORALE OVER TIME', 'STIMMUNG ÜBER DIE ZEIT'), { fill: D, size: 7 })}
    <path d="M18 40C70 40 90 100 140 100S240 60 302 30" fill="none" stroke="${G}" stroke-width="1.4"/>
    ${dot(140, 100, C)}
    ${[[18, l('denial', 'Verneinung')], [82, l('anger', 'Ärger')], [128, l('valley', 'Tal')], [182, l('learning', 'Lernen')], [246, l('integration', 'Integration')]].map(([x, s]) => t(Number(x), 120, String(s), { fill: s === l('valley', 'Tal') ? C : G, size: 7 })).join('')}
    ${tag(18, 132, 150, l('plan the valley: hypercare', 'Tal einplanen: Hypercare'))}`,

  'change-basics-communication': (l) => `
    ${t(18, 18, l('WEEKS TO GO-LIVE', 'WOCHEN BIS ZUM START'), { fill: D, size: 7 })}
    <path d="M18 50H302" stroke="${L}" stroke-width="1.2"/>
    ${[[40, '−12', l('leadership', 'Leitung')], [100, '−8', l('managers', 'Führung')], [160, '−4', l('project', 'Projekt')], [220, l('go-live', 'Start'), 'Key User'], [280, '+2', l('managers', 'Führung')]].map(([x, w, s], i) => t(Number(x), 38, String(w), { fill: i === 3 ? C : D, size: 7, anchor: 'middle' }) + dot(Number(x), 50, i === 3 ? C : G) + t(Number(x), 70, String(s), { size: 7, anchor: 'middle' })).join('')}
    ${t(18, 96, l('reasons: leadership · impact: manager', 'Gründe: Leitung · Alltag: Führungskraft'), { size: 7 })}
    ${t(18, 112, l('key messages 5 to 7 times', 'Kernbotschaften 5 bis 7 Mal'), { fill: C, size: 7 })}
    ${tag(18, 124, 170, l('who · what · when · how', 'wer · was · wann · wie'))}`,

  'change-key-users': (l) => `
    ${box(18, 36, 70, 34)}${t(53, 56, l('Project', 'Projekt'), { size: 7.5, anchor: 'middle' })}
    ${box(125, 36, 70, 34, C)}${t(160, 56, 'KEY USER', { fill: C, size: 7.5, anchor: 'middle' })}
    ${box(232, 36, 70, 34)}${t(267, 56, 'Team', { size: 7.5, anchor: 'middle' })}
    ${arrow(88, 46, 125)}${arrow(195, 46, 232)}
    <path d="M124 62H90" stroke="${C}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M94 58.5l-5 3.5 5 3.5" fill="none" stroke="${C}" stroke-width="1.3"/>
    <path d="M231 62H197" stroke="${C}" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M201 58.5l-5 3.5 5 3.5" fill="none" stroke="${C}" stroke-width="1.3"/>
    ${t(18, 92, l('solid: changes · dashed: feedback', 'durchgezogen: Änderungen · gestrichelt: Rückmeldung'), { size: 7 })}
    ${t(18, 116, l('≈ 8 working days around go-live (assumption)', '≈ 8 Arbeitstage rund um Go-live (Annahme)'), { size: 7 })}
    ${tag(18, 128, 140, l('chosen by standing', 'nach Ansehen gewählt'))}`,

  'change-global-rollout': (l) => `
    ${t(18, 18, l('PER COUNTRY, IN EVERY WAVE', 'PRO LAND, IN JEDER WELLE'), { fill: D, size: 7 })}
    ${[1, 2, 3].map((w) => t(140 + w * 46, 34, l('wave ', 'Welle ') + w, { fill: w === 1 ? C : D, size: 7, anchor: 'middle' })).join('')}
    ${[l('sponsor in country', 'Sponsor im Land'), 'Key User', l('communication', 'Kommunikation'), l('measure usage', 'Nutzung messen')].map((s, i) => t(18, 54 + i * 18, s, { size: 7 }) + [1, 2, 3].map((w) => check(136 + w * 46, 48 + i * 18, w === 1 ? C : G)).join('')).join('')}
    <path d="M18 116H302" stroke="${L}"/>
    ${t(18, 132, l('local sponsor, local language', 'Sponsor im Land, in Landessprache'), { size: 7 })}
    ${t(18, 146, l('review after wave 1', 'Auswertung nach Welle 1'), { size: 7 })}`,

  'change-technician-adoption': (l) => `
    ${box(18, 18, 90, 104, C)}${t(28, 34, 'FIELD SERVICE APP', { fill: C, size: 6.5 })}
    ${[l('asset history', 'Anlagenhistorie'), l('spare parts', 'Ersatzteile'), l('short forms', 'kurze Formulare'), l('works offline', 'offline nutzbar')].map((s, i) => check(28, 48 + i * 18) + t(40, 54 + i * 18, s, { size: 6.5 })).join('')}
    ${t(124, 34, l('BEFORE ROLLOUT', 'VOR DEM ROLLOUT'), { fill: D, size: 7 })}
    ${[l('3 to 5 pilot technicians', '3 bis 5 Pilot-Techniker'), l('location with works council', 'Standort mit Betriebsrat'), l('test in the basement', 'im Keller testen'), l('rollout in waves', 'Rollout in Wellen')].map((s, i) => dot(128, 51 + i * 16, G, 2) + t(136, 54 + i * 16, s, { size: 7 })).join('')}
    ${tag(124, 112, 160, l('stumbling block: acceptance', 'Stolperstein: Akzeptanz'))}
    ${t(124, 146, l('next to asset data and ERP', 'neben Anlagendaten und ERP'), { size: 7 })}`,

  'change-release-communication': (l) => `
    ${t(18, 18, l('BEFORE EVERY RELEASE', 'VOR JEDEM RELEASE'), { fill: D, size: 7 })}
    <path d="M18 56H302" stroke="${G}" stroke-width="1"/>
    ${[[l('planning', 'Planung'), l('rollout plan', 'Einführungsplan')], [l('before UAT', 'vor UAT'), 'Key User'], [l('days before', 'Tage vorher'), 'Release Notes'], [l('first week', 'erste Woche'), l('feedback', 'Rückmeldung')]].map(([a, b], i) => dot(50 + i * 74, 56, i === 2 ? C : G) + t(50 + i * 74, 44, a, { fill: i === 2 ? C : D, size: 7, anchor: 'middle' }) + t(50 + i * 74, 74, b, { size: 6.5, anchor: 'middle' })).join('')}
    ${t(18, 102, l('RELEASE NOTES FOR USERS', 'RELEASE NOTES FÜR ANWENDER'), { fill: D, size: 7 })}
    ${t(18, 116, l('what · why · when · what stays · whom to ask', 'was · warum · ab wann · was bleibt · wen fragen'), { size: 7 })}
    ${tag(18, 128, 160, l('no change, no email', 'keine Änderung, keine Mail'))}`,

  'change-reinforcement-standards': (l) => `
    ${[[l('Pipeline check', 'Pipeline-Prüfung'), l('every PR', 'jeder PR')], ['Pull Request Review', l('client side', 'Kundenseite')], [l('Center of Excellence call', 'Center-of-Excellence-Call'), l('every 2 weeks', 'alle 2 Wochen')]].map(([a, b], i) => box(18, 22 + i * 30, 200, 24, i === 0 ? C : G) + t(28, 37 + i * 30, a, { fill: i === 0 ? C : D, size: 7 }) + t(210, 37 + i * 30, b, { size: 7, anchor: 'end' })).join('')}
    ${t(234, 38, l('3 months', '3 Monate'), { fill: D, size: 7.5 })}${t(234, 52, l('until lived', 'bis gelebt'), { size: 7 })}
    ${t(234, 80, '80 %', { fill: D, size: 7.5 })}${t(234, 94, l('first version', 'erste Version'), { size: 7 })}
    <path d="M18 116H302" stroke="${L}"/>
    ${arrow(18, 134, 60, C)}${t(66, 137, l('handover to an internal colleague', 'Übergabe an internen Kollegen'), { size: 7 })}`,

  'change-adoption-metrics': (l) => `
    ${[[l('Activity', 'Aktivität'), 200], [l('Use of the process', 'Nutzung des Prozesses'), 180], [l('Data quality', 'Datenqualität'), 160], [l('Outcome', 'Ergebnis'), 140]].map(([s, w], i) => box(18, 18 + i * 24, Number(w), 18, i === 1 ? C : G) + t(28, 30 + i * 24, String(s), { fill: i === 1 ? C : D, size: 7 })).join('')}
    ${cross(232, 27)}${t(242, 30, l('logins alone', 'nur Logins'), { size: 7 })}
    ${check(208, 48)}${t(220, 54, l('quotes in SF', 'Angebote in SF'), { size: 7 })}
    ${t(188, 78, l('new duplicates', 'neue Dubletten'), { size: 7 })}
    ${t(168, 102, l('forecast accuracy', 'Prognosegenauigkeit'), { size: 7 })}
    <path d="M18 118H302" stroke="${L}"/>
    ${t(18, 134, l('baseline before go-live · monthly for 6 months', 'Ausgangswert vor Go-live · 6 Monate monatlich'), { size: 7 })}
    ${t(18, 148, l('per group and country', 'pro Gruppe und Land'), { size: 7 })}`,

  'change-sales-adoption': (l) => `
    ${t(18, 18, l('BEFORE THE CUSTOMER MEETING', 'VOR DEM KUNDENTERMIN'), { fill: D, size: 7 })}
    ${box(18, 28, 110, 74)}${t(28, 44, l('own list', 'eigene Liste'), { fill: D, size: 7 })}
    ${[l('contacts', 'Kontakte'), l('notes', 'Notizen')].map((s, i) => dot(31, 57 + i * 16, G, 2) + t(38, 60 + i * 16, s, { size: 7 })).join('')}
    ${box(150, 28, 152, 74, C)}${t(160, 44, 'SALESFORCE', { fill: C, size: 7 })}
    ${[l('orders from ERP', 'Aufträge aus ERP'), l('call-off quantities', 'Abrufmengen'), l('open service cases', 'offene Servicefälle')].map((s, i) => check(160, 57 + i * 15) + t(174, 60 + i * 15, s, { size: 7 })).join('')}
    <path d="M18 116H302" stroke="${L}"/>
    ${t(18, 132, l('28 % of working time spent selling', '28 % der Arbeitszeit fürs Verkaufen'), { size: 7 })}
    ${t(18, 148, l('pipeline meeting only from Salesforce', 'Pipeline-Meeting nur aus Salesforce'), { fill: D, size: 7 })}`,

  'change-training-plan': (l) => `
    ${t(18, 18, l('BY ROLE, NOT BY FEATURE', 'NACH ROLLE, NICHT NACH FUNKTION'), { fill: D, size: 7 })}
    ${[['Key User', l('before UAT', 'vor UAT')], [l('Sales', 'Vertrieb'), l('last week before go-live', 'letzte Woche vor Go-live')], [l('Dispatcher', 'Disponent'), l('before own wave', 'vor eigener Welle')], [l('Manager', 'Führungskraft'), l('before go-live', 'vor Go-live')]].map(([a, b], i) => dot(22, 35 + i * 16, i === 0 ? C : G, 2.5) + t(30, 38 + i * 16, a, { fill: i === 0 ? C : D, size: 7 }) + t(130, 38 + i * 16, b, { size: 7 })).join('')}
    <path d="M18 100H302" stroke="${L}"/>
    ${t(18, 118, l('Partial Copy sandbox · refresh every 5 days', 'Partial Copy Sandbox · alle 5 Tage neu'), { size: 7 })}
    ${t(18, 134, l('train the trainer via key users', 'Train the Trainer über Key User'), { size: 7 })}
    ${t(18, 148, l('3 walkthroughs without extra licence', '3 Walkthroughs ohne Zusatzlizenz'), { size: 7 })}`,

  'change-hypercare': (l) => `
    ${t(18, 18, l('WEEKLY STATUS CALL', 'WÖCHENTLICHER STATUS-CALL'), { fill: D, size: 7 })}
    ${[[l('defect', 'Fehler'), l('fix', 'beheben')], [l('how-to', 'Bedienfrage'), 'Key User'], [l('data', 'Daten'), 'Admin'], [l('change', 'Änderung'), 'Quick Win']].map(([a, b], i) => box(18 + i * 72, 28, 68, 26, i === 3 ? C : G) + t(52 + i * 72, 45, a, { fill: i === 3 ? C : D, size: 7, anchor: 'middle' }) + t(52 + i * 72, 70, b, { size: 6.5, anchor: 'middle' })).join('')}
    <path d="M18 84H302" stroke="${L}"/>
    ${t(18, 102, l('ends on criteria, not on a date', 'Ende nach Kriterien, nicht nach Datum'), { size: 7 })}
    ${t(18, 118, l('a week without open priority 1 defect', 'eine Woche ohne offenen Prio-1-Fehler'), { size: 7 })}
    ${tag(18, 130, 180, l('up to 3 months', 'bis zu 3 Monate'))}`,

  'change-process-salesforce': (l) => `
    ${t(18, 18, l('CHANGE WORK PER PROJECT PHASE', 'CHANGE-ARBEIT JE PROJEKTPHASE'), { fill: D, size: 7 })}
    <path d="M40 52H280" stroke="${G}" stroke-width="1.1"/>
    ${[l('Planning', 'Planung'), l('Build', 'Bau'), 'UAT', 'Go-live', l('Operations', 'Betrieb')].map((s, i) => dot(40 + i * 60, 52, i === 0 ? C : G) + t(40 + i * 60, 40, s, { fill: i === 0 ? C : D, size: 6.5, anchor: 'middle' })).join('')}
    <path d="M100 64V68H220V64" fill="none" stroke="${G}" stroke-width="1.1"/>
    ${t(40, 82, l('prepare', 'vorbereiten'), { size: 6.5, anchor: 'middle' })}${t(160, 82, l('manage', 'steuern'), { size: 6.5, anchor: 'middle' })}${t(280, 82, l('sustain', 'sichern'), { size: 6.5, anchor: 'middle' })}
    <path d="M18 96H302" stroke="${L}"/>
    ${t(18, 114, l('planning: impact, sponsor, metrics', 'Planung: Impact, Sponsor, Kennzahlen'), { size: 7 })}
    ${t(18, 130, l('go-live: switch-off date for old lists', 'Go-live: Abschaltdatum alter Listen'), { size: 7 })}
    ${t(18, 146, l('Prosci 3-phase process', 'Prosci-Prozess in 3 Phasen'), { size: 7 })}`,
};

export const hasDrawing = (key: string) => key in drawings;
export function cardDrawing(key: string, lang: Lang): string {
  return drawings[key]((en, de) => (lang === 'de' ? de : en));
}
// Every drawing in both languages, for scripts/check-graphics.mjs.
export const cardDrawings = () =>
  Object.keys(drawings).flatMap((key) => (['en', 'de'] as const).map((lang) => [key, lang, cardDrawing(key, lang)] as const));
