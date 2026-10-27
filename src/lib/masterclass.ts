import { getCollection, type CollectionEntry } from 'astro:content';
import { getPosts, type Post } from './blog';
import { localHref, type Lang } from './paths';

// Masterclass "AI in the Salesforce ecosystem": one hub page per language and
// ten chapter pages from src/content/masterclass/<lang>/ (rules: docs/masterclass.md).
export type Chapter = CollectionEntry<'masterclass'>;

// Planned number of chapters, shown as "Chapter 3 of 10".
export const chapterTotal = 10;

// All masterclasses share one overview page (/masterclass/, /en/masterclass/);
// each masterclass has its own hub below it (rules: docs/masterclass.md).
export const masterclassesIndex = (lang: Lang) => localHref(lang, 'masterclass/');

// Hub of the AI masterclass. Before 2026-10-28 it lived at /masterclass-ki/ and
// /en/ai-masterclass/; those URLs are redirect pages now.
export const masterclassIndex = (lang: Lang) => `${masterclassesIndex(lang)}${lang === 'de' ? 'ki-salesforce/' : 'ai-salesforce/'}`;

export const chapterHref = (chapter: Chapter) => `${masterclassIndex(chapter.data.lang)}${chapter.data.slug}/`;

// Drafts show up in `astro dev` but never in the production build, like blog articles.
export async function getChapters(lang: Lang): Promise<Chapter[]> {
  const chapters = await getCollection(
    'masterclass',
    ({ data }) => data.lang === lang && (import.meta.env.DEV || !data.draft),
  );
  return chapters.sort((a, b) => a.data.chapter - b.data.chapter);
}

export async function getChapterTranslation(chapter: Chapter): Promise<Chapter | undefined> {
  const other = chapter.data.lang === 'de' ? 'en' : 'de';
  return (await getChapters(other)).find((c) => c.data.translationKey === chapter.data.translationKey);
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

// Article clusters on the hub page. Each card lists the published articles of its cluster.
export const clusters: Cluster[] = [
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

export interface ClusterWithPosts {
  cluster: Cluster;
  posts: Post[];
}

// Clusters with their published articles; clusters without any are left out.
export async function getClusters(lang: Lang): Promise<ClusterWithPosts[]> {
  const result = await Promise.all(clusters.map(async (cluster) => ({ cluster, posts: await postsForKeys(lang, cluster.articles) })));
  return result.filter(({ posts }) => posts.length > 0);
}
