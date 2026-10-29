// Authors of blog articles (frontmatter `author`). Fabian writes every article unless an
// article sets `author: juliane`; Juliane Winterscheid writes about change management in
// general. Her texts come from src/data/juliane-winterscheid.ts.
import { site } from '../site';
import { julianePaths } from '../data/juliane-winterscheid';
import { de } from '../i18n/de';
import { en } from '../i18n/en';

export const authorIds = ['fabian', 'juliane'] as const;
export type AuthorId = (typeof authorIds)[number];

interface Author {
  name: string;
  // Role in the structured data and on the preview image.
  jobTitle: string;
  // Path of the profile page below the language root, or undefined for the home page.
  profile?: string;
  linkedin: string;
}

export function getAuthor(lang: 'en' | 'de', id: AuthorId): Author {
  if (id === 'juliane') {
    return {
      name: 'Juliane Winterscheid',
      jobTitle: 'Senior Human Centered Change Consultant',
      profile: julianePaths[lang],
      linkedin: (lang === 'de' ? de : en).partnerPage.partners.find((p) => p.name === 'Juliane Winterscheid')?.linkedin ?? '',
    };
  }
  return { name: site.person, jobTitle: 'Salesforce Enterprise Architect', linkedin: site.linkedin };
}
