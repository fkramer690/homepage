import { getCollection, type CollectionEntry } from 'astro:content';
import { getPosts, type Post } from './blog';
import { localHref, type Lang } from './paths';
import { courses, type CourseId } from './courses';
import { en, type Dict } from '../i18n/en';
import { de } from '../i18n/de';

// Masterclasses: one hub page per masterclass and language plus its chapter pages,
// all from src/content/masterclass/<lang>/ (the `course` field says which
// masterclass a chapter belongs to; rules: docs/masterclass.md).
export type Chapter = CollectionEntry<'masterclass'>;
export type { CourseId };

// Hub, chapter and card texts of one masterclass from src/i18n.
export type CourseTexts = Dict['masterclass'];
export const courseTexts = (lang: Lang, course: CourseId = 'ai'): CourseTexts => (lang === 'de' ? de : en)[courses[course].texts];

// Planned number of chapters of a masterclass, shown as "Chapter 3 of 10".
export const chapterTotal = (course: CourseId = 'ai') => courses[course].chapters;

// All masterclasses share one overview page (/masterclass/, /en/masterclass/);
// each masterclass has its own hub below it (rules: docs/masterclass.md).
export const masterclassesIndex = (lang: Lang) => localHref(lang, 'masterclass/');

// Hub of a masterclass, by default the AI masterclass. Before 2026-10-28 the AI
// masterclass lived at /masterclass-ki/ and /en/ai-masterclass/; those URLs are
// redirect pages now.
export const masterclassIndex = (lang: Lang, course: CourseId = 'ai') => `${masterclassesIndex(lang)}${courses[course].segment[lang]}/`;

export const chapterHref = (chapter: Chapter) => `${masterclassIndex(chapter.data.lang, chapter.data.course)}${chapter.data.slug}/`;

// Drafts show up in `astro dev` but never in the production build, like blog articles.
export async function getChapters(lang: Lang, course: CourseId = 'ai'): Promise<Chapter[]> {
  const chapters = await getCollection(
    'masterclass',
    ({ data }) => data.lang === lang && data.course === course && (import.meta.env.DEV || !data.draft),
  );
  return chapters.sort((a, b) => a.data.chapter - b.data.chapter);
}

export async function getChapterTranslation(chapter: Chapter): Promise<Chapter | undefined> {
  const other = chapter.data.lang === 'de' ? 'en' : 'de';
  return (await getChapters(other, chapter.data.course)).find((c) => c.data.translationKey === chapter.data.translationKey);
}

export function chapterReadingMinutes(chapter: Chapter): number {
  const words = (chapter.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Published blog articles for a list of translationKeys, in that order.
// Keys without a published article (yet) are skipped silently.
export async function postsForKeys(lang: Lang, keys: string[]): Promise<Post[]> {
  const byKey = new Map((await getPosts(lang)).map((p) => [p.data.translationKey, p]));
  return keys.map((key) => byKey.get(key)).filter((p): p is Post => Boolean(p));
}

export interface Cluster {
  id: string;
  en: { title: string; text: string };
  de: { title: string; text: string };
  // Blog translationKeys in reading order.
  articles: string[];
}

// Article clusters on the hub page of the AI masterclass. Each card lists the published articles of its cluster.
const aiClusters: Cluster[] = [
  {
    id: 'agentforce',
    en: {
      title: 'Agentforce in service, field service and sales',
      text: 'When an agent pays off, which rules stay deterministic and how to test it before go-live.',
    },
    de: {
      title: 'Agentforce in Service, Außendienst und Vertrieb',
      text: 'Wann sich ein Agent lohnt, welche Regeln deterministisch bleiben und wie Sie ihn vor dem Go-live testen.',
    },
    articles: [
      'agentforce-yes-or-no-manufacturers',
      'agent-script-deterministic-rules',
      'warranty-adjudication-agent-winter-27',
      'field-service-ai-agents-today',
      'testing-agentforce-agents',
      'aiforce-salesforce-in-claude-slack',
    ],
  },
  {
    id: 'costs',
    en: {
      title: 'Costs and licences',
      text: 'Flex Credits, editions, Data 360 and AI coding: what it costs and how to estimate it upfront.',
    },
    de: {
      title: 'Kosten und Lizenzen',
      text: 'Flex Credits, Editionen, Data 360 und KI-Coding: was es kostet und wie Sie es vorab rechnen.',
    },
    articles: [
      'dealer-service-agent-costs',
      'flex-credits-agentforce-costs',
      'salesforce-editions-core-advanced-max',
      'headless-platform-interactions-budget',
      'ai-coding-costs-salesforce-project',
      'data-360-costs-for-agents',
    ],
  },
  {
    id: 'devops',
    en: {
      title: 'DevOps and quality',
      text: 'How AI-generated code is reviewed, secured and taken through the pipeline.',
    },
    de: {
      title: 'DevOps und Qualität',
      text: 'Wie KI-generierter Code geprüft, abgesichert und durch die Pipeline gebracht wird.',
    },
    articles: [
      'reviewing-ai-generated-salesforce-code',
      'api-67-user-mode-apex',
      'salesforce-dx-mcp-server-end-of-life',
      'quality-gates-ai-code-pipeline',
      'vibes-claude-code-copilot-comparison',
      'ai-rules-file-salesforce-repo',
      'vibe-coding-prototype-not-production',
    ],
  },
  {
    id: 'delivery',
    en: {
      title: 'Partner governance and delivery',
      text: 'Contracts, pricing models, team size and measurement when partners work with AI agents.',
    },
    de: {
      title: 'Partnersteuerung und Delivery',
      text: 'Verträge, Preismodelle, Teamgröße und Messung, wenn Partner mit KI-Agenten arbeiten.',
    },
    articles: [
      'partners-ai-coding-sow-rules',
      'fixed-price-ai-salesforce-partners',
      'measuring-ai-benefit-salesforce-projects',
      'smaller-teams-ai-native-delivery',
      'nearshore-teams-with-ai-agents',
    ],
  },
  {
    id: 'integration',
    en: {
      title: 'Integration and data',
      text: 'MCP, hosted MCP servers and how agents reach SAP and older ERP systems.',
    },
    de: {
      title: 'Integration und Daten',
      text: 'MCP, Hosted MCP Server und wie Agenten SAP und ältere ERP-Systeme erreichen.',
    },
    articles: [
      'mcp-explained-salesforce-it-leads',
      'hosted-mcp-servers-data-access',
      'agentforce-sap-order-status',
      'legacy-erp-without-api-agents',
    ],
  },
  {
    id: 'security',
    en: {
      title: 'Security and compliance',
      text: 'Prompt injection, connected apps, works council, GDPR and the AI Act deadlines.',
    },
    de: {
      title: 'Security und Compliance',
      text: 'Prompt Injection, Connected Apps, Betriebsrat, DSGVO und die Fristen des AI Act.',
    },
    articles: [
      'prompt-injection-dealer-portals',
      'oauth-connected-apps-ai-lessons',
      'ai-coding-works-council-gdpr',
      'eu-ai-act-agentforce-deadlines',
    ],
  },
];

// Article clusters on the hub page of the DevOps masterclass.
const devopsClusters: Cluster[] = [
  {
    id: 'foundations',
    en: {
      title: 'Foundations and ownership',
      text: 'Why the release process decides enterprise programmes and why the client should own it.',
    },
    de: {
      title: 'Grundlagen und Eigentum',
      text: 'Warum der Release-Prozess über Großprojekte entscheidet und warum er dem Kunden gehören sollte.',
    },
    articles: ['devops-salesforce-enterprise', 'client-owned-devops-tools', 'pull-request-reviews-enterprise', 'ai-org-assessment-technical-debt'],
  },
  {
    id: 'tools',
    en: {
      title: 'Tools',
      text: 'sfdx-hardis, DevOps Center and commercial platforms: what each covers and when it fits.',
    },
    de: {
      title: 'Werkzeuge',
      text: 'sfdx-hardis, DevOps Center und kommerzielle Plattformen: was sie abdecken und wann sie passen.',
    },
    articles: ['sfdx-hardis-introduction', 'sfdx-hardis-vs-devops-center', 'sfdx-hardis-training', 'devops-ai-agents-copado-gearset'],
  },
  {
    id: 'platform-changes',
    en: {
      title: 'Releases and platform changes',
      text: 'What Salesforce releases and retirements change in your pipeline and when to act.',
    },
    de: {
      title: 'Releases und Plattformänderungen',
      text: 'Was Salesforce-Releases und Abkündigungen in Ihrer Pipeline ändern und wann Sie handeln müssen.',
    },
    articles: ['salesforce-winter-27-pipeline', 'api-67-user-mode-apex', 'salesforce-password-integrations-2027', 'salesforce-dx-mcp-server-end-of-life'],
  },
  {
    id: 'ai-pipeline',
    en: {
      title: 'AI in the pipeline',
      text: 'Reviews, quality gates and data rules when coding agents contribute to the release.',
    },
    de: {
      title: 'KI in der Pipeline',
      text: 'Reviews, Quality Gates und Datenregeln, wenn Coding-Agenten am Release mitarbeiten.',
    },
    articles: [
      'quality-gates-ai-code-pipeline',
      'reviewing-ai-generated-salesforce-code',
      'agentforce-agents-release-pipeline',
      'sandbox-data-ai-coding-agents',
      'ai-rules-file-salesforce-repo',
    ],
  },
];

// Article clusters on the hub pages of the product masterclasses.
const manufacturingClusters: Cluster[] = [
  {
    id: 'business-case',
    en: { title: 'Business case and licences', text: 'What Manufacturing Cloud contains, what it costs and who needs which licence.' },
    de: { title: 'Business Case und Lizenzen', text: 'Was Manufacturing Cloud enthält, was es kostet und welche Lizenz wer braucht.' },
    articles: ['manufacturing-cloud-worth-it', 'manufacturing-cloud-feature-map', 'manufacturing-cloud-add-ons-costs', 'salesforce-editions-core-advanced-max', 'salesforce-licence-types'],
  },
  {
    id: 'sales-planning',
    en: { title: 'Agreements and planning', text: 'Plan against actuals per customer and product, forecasts, programmes and targets.' },
    de: { title: 'Rahmenverträge und Planung', text: 'Plan gegen Ist pro Kunde und Produkt, Prognosen, Programme und Ziele.' },
    articles: ['manufacturing-cloud-quote-to-agreement', 'manufacturing-cloud-sales-agreements-actuals', 'manufacturing-cloud-account-forecasting', 'manufacturing-cloud-program-based-business', 'manufacturing-cloud-account-manager-targets', 'sales-planning-agent-agreements'],
  },
  {
    id: 'channel',
    en: { title: 'Dealers and partners', text: 'Rebates, ship and debit, portals and visits for selling through dealers.' },
    de: { title: 'Händler und Partner', text: 'Boni, Ship and Debit, Portale und Besuche für den Vertrieb über Händler.' },
    articles: ['manufacturing-cloud-rebate-management', 'channel-revenue-ship-and-debit', 'manufacturing-cloud-customer-portal', 'manufacturing-cloud-partner-visit-management', 'partner-sales-assistant-dealer-quotes', 'distributor-replenishment-agent'],
  },
  {
    id: 'after-sales',
    en: { title: 'Warranty and after-sales', text: 'Installed base, warranty claims and recalls, with and without an agent.' },
    de: { title: 'Garantie und After-Sales', text: 'Installierte Basis, Garantieansprüche und Rückrufe, mit und ohne Agent.' },
    articles: ['manufacturing-cloud-installed-base-assets', 'manufacturing-cloud-warranty-claims', 'warranty-adjudication-agent-winter-27', 'manufacturing-cloud-product-service-campaigns', 'manufacturing-cloud-service-vs-service-cloud', 'spare-parts-serial-number-ai'],
  },
  {
    id: 'erp-rollout',
    en: { title: 'ERP, AI and rollout', text: 'Data flows with SAP, prices, Agentforce and the order of countries.' },
    de: { title: 'ERP, KI und Rollout', text: 'Datenflüsse mit SAP, Preise, Agentforce und die Reihenfolge der Länder.' },
    articles: ['manufacturing-cloud-erp-integration', 'penny-perfect-pricing-erp-prices', 'agentforce-yes-or-no-manufacturers', 'siemens-agentforce-lessons', 'multilingual-dealer-agents', 'manufacturing-cloud-global-rollout'],
  },
];

const revenueClusters: Cluster[] = [
  {
    id: 'decide',
    en: { title: 'Decide and budget', text: 'Whether Revenue Cloud pays off, what it is called, what it costs and what stays in SAP.' },
    de: { title: 'Entscheiden und budgetieren', text: 'Ob sich Revenue Cloud lohnt, wie es heißt, was es kostet und was bei SAP bleibt.' },
    articles: ['revenue-cloud-worth-it-manufacturers', 'revenue-cloud-product-names', 'revenue-cloud-editions-pricing', 'revenue-cloud-sap-system-boundaries', 'revenue-cloud-vs-manufacturing-cloud-commerce'],
  },
  {
    id: 'catalog-pricing',
    en: { title: 'Catalog, configurator and pricing', text: 'How variants, rules and prices are modelled in Revenue Cloud and who maintains them.' },
    de: { title: 'Katalog, Konfigurator und Preise', text: 'Wie Varianten, Regeln und Preise in Revenue Cloud abgebildet werden und wer sie pflegt.' },
    articles: ['revenue-cloud-product-catalog-variants', 'revenue-cloud-configurator-constraint-rules', 'revenue-cloud-pricing-procedures', 'customer-prices-sap-or-salesforce-pricing', 'manufacturing-cloud-quote-to-agreement'],
  },
  {
    id: 'quote-to-order',
    en: { title: 'From quote to order', text: 'Approvals, agents, contracts, the order hand-over to SAP and the installed base.' },
    de: { title: 'Vom Angebot zum Auftrag', text: 'Freigaben, Agenten, Verträge, Auftragsübergabe an SAP und die installierte Basis.' },
    articles: ['revenue-cloud-discount-approvals', 'revenue-cloud-quoting-agent', 'partner-sales-assistant-dealer-quotes', 'salesforce-contracts-revenue-cloud', 'revenue-cloud-order-orchestration-erp', 'revenue-cloud-installed-base-assets'],
  },
  {
    id: 'billing-usage',
    en: { title: 'Billing and usage', text: 'Where invoices are created, what Billing costs, e-invoicing and pay-per-use.' },
    de: { title: 'Abrechnung und Nutzung', text: 'Wo Rechnungen entstehen, was Billing kostet, E-Rechnung und Pay-per-Use.' },
    articles: ['revenue-cloud-billing-or-erp-invoicing', 'revenue-cloud-billing-costs-billing-events', 'e-invoicing-germany-revenue-cloud', 'usage-based-pricing-machines-revenue-cloud', 'service-contracts-recurring-billing'],
  },
  {
    id: 'cpq-migration',
    en: { title: 'Moving from CPQ and Billing', text: 'Status of CPQ and Billing, the differences, the decision and the migration step by step.' },
    de: { title: 'Von CPQ und Billing umsteigen', text: 'Status von CPQ und Billing, Unterschiede, Entscheidung und Migration Schritt für Schritt.' },
    articles: ['salesforce-cpq-end-of-sale-status', 'cpq-vs-revenue-cloud-differences', 'stay-on-cpq-or-migrate', 'cpq-to-revenue-cloud-migration-plan', 'salesforce-billing-to-revenue-cloud-billing', 'revenue-cloud-configuration-deployment'],
  },
];

const commerceClusters: Cluster[] = [
  {
    id: 'decision',
    en: { title: 'Decision and costs', text: 'When a store pays off, what it costs and which version you run.' },
    de: { title: 'Entscheidung und Kosten', text: 'Wann ein Shop sich lohnt, was er kostet und welche Version Sie betreiben.' },
    articles: ['commerce-shop-or-portal', 'commerce-gmv-pricing', 'commerce-business-case', 'commerce-buyer-licences', 'commerce-versions-visualforce-aura-lwr', 'manufacturing-cloud-customer-portal', 'salesforce-licence-types'],
  },
  {
    id: 'catalog',
    en: { title: 'Catalogue and search', text: 'Who sees which product and how dealers find the right part.' },
    de: { title: 'Katalog und Suche', text: 'Wer welches Produkt sieht und wie Händler das richtige Teil finden.' },
    articles: ['commerce-buyer-groups-entitlements', 'commerce-product-data-pim', 'commerce-search-part-numbers', 'commerce-stores-countries-brands', 'commerce-spare-parts-per-machine', 'spare-parts-serial-number-ai'],
  },
  {
    id: 'buying',
    en: { title: 'Prices and ordering', text: 'Customer prices, request for quote, checkout on account and fast reordering.' },
    de: { title: 'Preise und Bestellen', text: 'Kundenpreise, Angebotsanfrage, Checkout auf Rechnung und schnelles Nachbestellen.' },
    articles: ['commerce-customer-prices', 'commerce-advanced-pricing-revenue-cloud', 'commerce-request-for-quote', 'commerce-checkout-purchase-order', 'commerce-reorder-order-templates', 'partner-sales-assistant-dealer-quotes'],
  },
  {
    id: 'erp',
    en: { title: 'ERP integration', text: 'Which data comes live from SAP and who owns the order.' },
    de: { title: 'ERP-Anbindung', text: 'Welche Daten live aus SAP kommen und wem der Auftrag gehört.' },
    articles: ['commerce-sap-data-flows', 'commerce-stock-availability-erp', 'commerce-order-to-erp', 'commerce-extensions-custom-code', 'commerce-headless-b2b', 'agentforce-sap-order-status', 'legacy-erp-without-api-agents', 'salesforce-password-integrations-2027'],
  },
  {
    id: 'agents-rollout',
    en: { title: 'Agents and rollout', text: 'What the buyer and merchandising agents do and how the store reaches dealers.' },
    de: { title: 'Agenten und Einführung', text: 'Was Buyer und Merchandising Agent leisten und wie der Shop zu den Händlern kommt.' },
    articles: ['commerce-buyer-agent-whatsapp', 'commerce-merchandising-agent', 'prompt-injection-dealer-portals', 'multilingual-dealer-agents', 'distributor-replenishment-agent', 'commerce-aura-to-lwr-migration', 'commerce-dealer-rollout', 'commerce-kpis-after-go-live'],
  },
];

const fieldServiceClusters: Cluster[] = [
  {
    id: 'decision',
    en: { title: 'Decision and licences', text: 'When Field Service pays off, which role needs which licence and how a job is created.' },
    de: { title: 'Entscheidung und Lizenzen', text: 'Wann sich Field Service rechnet, welche Rolle welche Lizenz braucht und wie ein Auftrag entsteht.' },
    articles: ['field-service-worth-it', 'field-service-licences-by-role', 'agentforce-1-field-service-bundle', 'salesforce-licence-types', 'field-service-case-to-work-order'],
  },
  {
    id: 'scheduling',
    en: { title: 'Scheduling and dispatch', text: 'Master data, the scheduling engine, the new console and long jobs, so the plan holds.' },
    de: { title: 'Terminplanung und Disposition', text: 'Stammdaten, Scheduling Engine, neue Konsole und lange Einsätze, damit der Plan hält.' },
    articles: ['field-service-master-data', 'field-service-scheduling-automation', 'field-service-enhanced-scheduling-eso', 'field-service-scheduling-console', 'field-service-multiday-crews-commissioning', 'field-service-on-call-shifts'],
  },
  {
    id: 'mobile',
    en: { title: 'Technicians, app and documents', text: 'What the mobile app does offline, how forms and service reports work and how updates get tested.' },
    de: { title: 'Techniker, App und Dokumente', text: 'Was die mobile App offline kann, wie Protokolle und Serviceberichte entstehen und wie Updates getestet werden.' },
    articles: ['field-service-mobile-offline', 'field-service-data-capture-forms', 'field-service-mobile-guided-voice', 'service-documents-document-builder', 'document-builder-limits-workarounds', 'visual-remote-assistant-instead-of-visit', 'field-service-mobile-release-testing'],
  },
  {
    id: 'assets',
    en: { title: 'Assets, maintenance, parts and partners', text: 'Machines as assets, maintenance by calendar or operating hours, spare parts with the ERP and service partners.' },
    de: { title: 'Assets, Wartung, Teile und Partner', text: 'Maschinen als Assets, Wartung nach Kalender oder Betriebsstunden, Ersatzteile mit dem ERP und Servicepartner.' },
    articles: ['field-service-asset-hierarchy', 'field-service-maintenance-contracts', 'field-service-usage-based-maintenance', 'predictive-maintenance-data-readiness', 'asset-service-lifecycle-management-addon', 'field-service-spare-parts', 'field-service-service-partners'],
  },
  {
    id: 'ai-rollout',
    en: { title: 'AI agents and rollout', text: 'Which agents work today, how to roll out in waves and how to measure success.' },
    de: { title: 'KI-Agenten und Einführung', text: 'Welche Agenten heute tragen, wie Sie in Wellen einführen und woran Sie den Erfolg messen.' },
    articles: ['field-service-ai-agents-today', 'breakdown-hotline-voice-agent', 'field-service-ai-troubleshooting-manuals', 'spare-parts-serial-number-ai', 'field-service-headless-setup-ai', 'field-service-rollout', 'field-service-kpis-after-go-live'],
  },
];

// Kept for code that only knows the AI masterclass.
export const clusters = aiClusters;
const clustersByCourse: Record<CourseId, Cluster[]> = {
  ai: aiClusters,
  devops: devopsClusters,
  'manufacturing-cloud': manufacturingClusters,
  'revenue-cloud': revenueClusters,
  'b2b-commerce': commerceClusters,
  'field-service': fieldServiceClusters,
};

export interface ClusterWithPosts {
  cluster: Cluster;
  posts: Post[];
}

// Clusters with their published articles; clusters without any are left out.
export async function getClusters(lang: Lang, course: CourseId = 'ai'): Promise<ClusterWithPosts[]> {
  const result = await Promise.all(clustersByCourse[course].map(async (cluster) => ({ cluster, posts: await postsForKeys(lang, cluster.articles) })));
  return result.filter(({ posts }) => posts.length > 0);
}
