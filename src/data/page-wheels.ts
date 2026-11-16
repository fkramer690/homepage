// Rings on landing pages built by FreelanceArchitectPage.astro (prop `wheel`), approved by
// Fabian 2026-11-11 in the click path of graphic proposals. Texts follow the topic cards
// of the same page (src/data/maschinenbau.ts, src/data/field-service-berater.ts) and link
// to the same articles and chapters. `link` is a path below the language root.
// Segment labels are checked by scripts/check-graphics.mjs (ringProblems).

export type PageWheelItem = { icon: string; name: string; label?: string; sub: string; points: string[]; link: string };
export type PageWheel = {
  title: string;
  lead: string;
  hint: string;
  hintTouch: string;
  label: string;
  centre: [string, string];
  more: string;
  items: PageWheelItem[];
};

const hints = {
  de: { hint: 'Fahren Sie über ein Segment', hintTouch: 'Tippen Sie auf ein Segment' },
  en: { hint: 'Hover over a segment', hintTouch: 'Tap a segment' },
};

export const pageWheels: Record<'maschinenbau' | 'field-service-berater', Record<'de' | 'en', PageWheel>> = {
  maschinenbau: {
    de: {
      ...hints.de,
      title: 'Wo Salesforce im Maschinenbau ansetzt',
      lead: 'Vier Bereiche, in denen Maschinen- und Anlagenbauer Salesforce einsetzen. Jedes Segment zeigt, was dazugehört, und führt zum passenden Artikel.',
      label: 'Vier Bereiche: Vertrieb, Service, Integration und Field Service um Salesforce im Maschinenbau',
      centre: ['Salesforce', 'im Maschinenbau'],
      more: 'Weiterlesen',
      items: [
        { icon: 'contract', name: 'Vertrieb', sub: 'Angebote und Rahmenverträge', points: ['Angebote für Maschinen mit vielen Optionen', 'Rahmenverträge mit Ist-Mengen aus dem ERP', 'Manufacturing Cloud nur, wo sie sich rechnet'], link: 'blog/manufacturing-cloud-wann-lohnt-sie-sich/' },
        { icon: 'phone', name: 'Service', sub: 'Kundendienst und Portal', points: ['Telefon und E-Mail an einem Fall', 'Servicepartner arbeiten im Portal', 'Dokumente und Fälle im Self-Service'], link: 'blog/salesforce-field-service-servicepartner/' },
        { icon: 'integration', name: 'Integration', sub: 'Schnittstelle zu SAP', points: ['Preise, Bestände und Aufträge aus SAP', 'Führendes System je Datenart', 'Ersatzteile im Service sichtbar'], link: 'leistungen/salesforce-schnittstellen/' },
        { icon: 'field-service', name: 'Field Service', sub: 'Techniker im Einsatz', points: ['Installed Base mit Seriennummer', 'Einsatzplanung für Techniker', 'Servicebericht vor Ort'], link: 'masterclass/field-service/' },
      ],
    },
    en: {
      ...hints.en,
      title: 'Where Salesforce fits in machinery manufacturing',
      lead: 'Four areas where machinery and plant manufacturers use Salesforce. Each segment shows what it covers and leads to the matching article.',
      label: 'Four areas: sales, service, integration and Field Service around Salesforce for machinery manufacturers',
      centre: ['Salesforce', 'for machinery'],
      more: 'Read more',
      items: [
        { icon: 'contract', name: 'Sales', sub: 'Quotes and framework agreements', points: ['Quotes for machines with many options', 'Framework agreements with ERP actuals', 'Manufacturing Cloud only where it pays off'], link: 'blog/salesforce-manufacturing-cloud-is-it-worth-it/' },
        { icon: 'phone', name: 'Service', sub: 'Customer service and portal', points: ['Phone and email on one case', 'Service partners work in the portal', 'Documents and cases in self-service'], link: 'blog/salesforce-field-service-service-partners/' },
        { icon: 'integration', name: 'Integration', sub: 'Interface to SAP', points: ['Prices, stock and orders from SAP', 'One system of record per data type', 'Spare parts visible in service'], link: 'services/salesforce-integration/' },
        { icon: 'field-service', name: 'Field Service', sub: 'Technicians on site', points: ['Installed base with serial numbers', 'Scheduling for technicians', 'Service report on site'], link: 'masterclass/field-service/' },
      ],
    },
  },
  'field-service-berater': {
    de: {
      ...hints.de,
      title: 'Field Service von der Anlage bis zum Einsatz',
      lead: 'Vier Bereiche, die in jedem Field-Service-Projekt zusammenspielen müssen. Jedes Segment zeigt, worauf ich achte, und führt zum passenden Kapitel.',
      label: 'Vier Bereiche: Planung, Disposition, Ersatzteile und Mobile App um Field Service für Hersteller',
      centre: ['Field Service', 'für Hersteller'],
      more: 'Zum Kapitel',
      items: [
        { icon: 'factory', name: 'Planung', sub: 'Anlagen und Wartung', points: ['Anlagen mit Seriennummer', 'Wartungspläne', 'Qualifikationen und Gebiete'], link: 'masterclass/field-service/field-service-assets-wartung-teile/' },
        { icon: 'calendar', name: 'Disposition', sub: 'Terminplanung', points: ['Erst bis Scheduled automatisieren', 'Disponent gibt Termine frei', 'Mehr Automatik nach Kennzahlen'], link: 'masterclass/field-service/field-service-terminplanung-disposition/' },
        { icon: 'integration', name: 'Ersatzteile', sub: 'Teile und Bestände aus dem ERP', points: ['ERP führt bei Teilen und Beständen', 'Klare Aufteilung der Daten', 'Datenpflege vor dem Start'], link: 'blog/salesforce-field-service-ersatzteile-erp/' },
        { icon: 'field-service', name: 'Mobile', sub: 'Techniker vor Ort', points: ['App auch ohne Netz getestet', 'Servicebericht und Dokumente', 'Betriebsrat früh eingebunden'], link: 'masterclass/field-service/field-service-mobile-app-dokumente/' },
      ],
    },
    en: {
      ...hints.en,
      title: 'Field Service from the asset to the job',
      lead: 'Four areas that have to work together in every Field Service project. Each segment shows what I watch for and leads to the matching chapter.',
      label: 'Four areas: planning, dispatch, spare parts and the mobile app around Field Service for manufacturers',
      centre: ['Field Service', 'for manufacturers'],
      more: 'Open the chapter',
      items: [
        { icon: 'factory', name: 'Planning', sub: 'Assets and maintenance', points: ['Assets with serial numbers', 'Maintenance plans', 'Skills and territories'], link: 'masterclass/field-service/field-service-assets-maintenance-parts/' },
        { icon: 'calendar', name: 'Dispatch', sub: 'Scheduling', points: ['Automate up to Scheduled first', 'Dispatchers release appointments', 'More automation once KPIs allow'], link: 'masterclass/field-service/field-service-scheduling-dispatch/' },
        { icon: 'integration', name: 'Spare parts', label: 'Parts', sub: 'Parts and stock from the ERP', points: ['ERP leads for parts and stock', 'A clear split of the data', 'Clean data before go-live'], link: 'blog/salesforce-field-service-spare-parts-erp/' },
        { icon: 'field-service', name: 'Mobile', sub: 'Technicians on site', points: ['App tested without coverage', 'Service report and documents', 'Works council involved early'], link: 'masterclass/field-service/field-service-mobile-app-documents/' },
      ],
    },
  },
};

// Ring on the masterclass overview (MasterclassIndex.astro): one segment per masterclass
// with published chapters, in the order of src/lib/courses.ts. Subtitle is the chapter
// count, the points are the short titles of the first three chapters, so the ring stays
// current without edits here. `labels` are the segment labels (they must fit the arc).
export const masterclassWheel = {
  de: {
    ...hints.de,
    title: 'Sieben Masterclasses, ein Ziel',
    lead: 'Alle Masterclasses drehen sich um Salesforce bei Herstellern. Jedes Segment zeigt die ersten Kapitel und führt zur Masterclass.',
    label: 'Die Masterclasses als Ring um Salesforce für Hersteller',
    centre: ['Masterclasses', 'für Hersteller'] as [string, string],
    more: 'Zur Masterclass',
    labels: { ai: 'KI', devops: 'DevOps', 'manufacturing-cloud': 'Manufacturing', 'revenue-cloud': 'Revenue', 'b2b-commerce': 'B2B Commerce', 'field-service': 'Field Service', 'change-management': 'Change' },
  },
  en: {
    ...hints.en,
    title: 'Seven masterclasses, one goal',
    lead: 'Every masterclass is about Salesforce at manufacturers. Each segment shows the first chapters and leads to the masterclass.',
    label: 'The masterclasses as a ring around Salesforce for manufacturers',
    centre: ['Masterclasses', 'for manufacturers'] as [string, string],
    more: 'Open the masterclass',
    labels: { ai: 'AI', devops: 'DevOps', 'manufacturing-cloud': 'Manufacturing', 'revenue-cloud': 'Revenue', 'b2b-commerce': 'B2B Commerce', 'field-service': 'Field Service', 'change-management': 'Change' },
  },
};
