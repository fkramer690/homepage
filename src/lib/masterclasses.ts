import { en } from '../i18n/en';
import { de } from '../i18n/de';
import type { Lang } from './paths';
import { getChapters, getClusters, masterclassIndex } from './masterclass';

// Every masterclass shown on the overview page (/masterclass/, /en/masterclass/).
// To add one, give it its own hub below /masterclass/ and add an entry here
// (see "Adding a masterclass" in docs/masterclass.md). The order here is the
// order of the cards; a masterclass without published chapters is hidden.
export interface MasterclassCard {
  id: string;
  href: string;
  name: string;
  title: string;
  summary: string;
  chapters: number;
  articles: number;
}

const loaders: Array<(lang: Lang) => Promise<MasterclassCard>> = [
  async (lang) => {
    const m = (lang === 'de' ? de : en).masterclass;
    const clusters = await getClusters(lang);
    return {
      id: 'ai-salesforce',
      href: masterclassIndex(lang),
      name: m.name,
      title: m.title,
      summary: m.metaDescription,
      chapters: (await getChapters(lang)).length,
      articles: new Set(clusters.flatMap(({ posts }) => posts.map((p) => p.id))).size,
    };
  },
];

export async function getMasterclasses(lang: Lang): Promise<MasterclassCard[]> {
  return (await Promise.all(loaders.map((load) => load(lang)))).filter((m) => m.chapters > 0);
}
