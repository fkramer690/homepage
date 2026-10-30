import type { Lang } from './paths';
import { de } from '../i18n/de';
import { en } from '../i18n/en';
import { courseIds, courses, type CourseId } from './courses';
import { courseTexts, getChapters, getClusters, masterclassIndex } from './masterclass';

// Every masterclass shown on the overview page (/masterclass/, /en/masterclass/),
// in the order of `courseIds` in src/lib/courses.ts. To add one, see
// "Adding a masterclass" in docs/masterclass.md. A masterclass without
// published chapters is hidden.
export interface MasterclassCard {
  id: CourseId;
  href: string;
  name: string;
  shortName: string;
  icon: string;
  title: string;
  summary: string;
  chapters: number;
  articles: number;
}

async function card(lang: Lang, course: CourseId): Promise<MasterclassCard> {
  const m = courseTexts(lang, course);
  const clusters = await getClusters(lang, course);
  return {
    id: course,
    href: masterclassIndex(lang, course),
    name: m.name,
    shortName: (lang === 'de' ? de : en).masterclasses.homeNames[course],
    icon: courses[course].icon,
    title: m.title,
    summary: m.metaDescription,
    chapters: (await getChapters(lang, course)).length,
    articles: new Set(clusters.flatMap(({ posts }) => posts.map((p) => p.id))).size,
  };
}

export async function getMasterclasses(lang: Lang): Promise<MasterclassCard[]> {
  return (await Promise.all(courseIds.map((course) => card(lang, course)))).filter((m) => m.chapters > 0);
}
