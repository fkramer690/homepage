import type { APIRoute } from 'astro';
import { en } from '../i18n/en';
import { de } from '../i18n/de';
import { site } from '../site';
import { getPosts, postHref, blogIndex } from '../lib/blog';
import { getServices, serviceHref, servicesIndex } from '../lib/services';
import { homeHref, localHref } from '../lib/paths';
import { questionPaths } from '../data/questions';
import { recruiterPaths } from '../data/recruiters';
import { julianePaths } from '../data/juliane-winterscheid';
import { freelanceArchitectPaths } from '../data/freelance-architect';
import { getChapters, chapterHref, courseTexts, masterclassIndex, masterclassesIndex } from '../lib/masterclass';
import { courseIds, type CourseId } from '../lib/courses';

// Plain-text overview for AI assistants and crawlers (llmstxt.org).
export const GET: APIRoute = async ({ site: origin }) => {
  const abs = (path: string) => new URL(path, origin).href;
  const list = async (lang: 'en' | 'de') =>
    (await getPosts(lang)).map((p) => `- [${p.data.title}](${abs(postHref(p))}): ${p.data.description}`).join('\n');

  const services = async (lang: 'en' | 'de') =>
    (await getServices(lang)).map((s) => `- [${s.data.title}](${abs(serviceHref(s))}): ${s.data.description}`).join('\n');

  const chapters = async (lang: 'en' | 'de', course: CourseId = 'ai') =>
    (await getChapters(lang, course)).map((c) => `- [${c.data.title}](${abs(chapterHref(c))}): ${c.data.description}`).join('\n');

  const masterclassSections = async () =>
    (
      await Promise.all(
        courseIds.flatMap((c) =>
          (['en', 'de'] as const).map(async (lang) => {
            const m = courseTexts(lang, c);
            return `## ${m.name}${lang === 'de' ? ' (German)' : ''}\n\n- [${m.title}](${abs(masterclassIndex(lang, c))}): ${m.metaDescription}\n${await chapters(lang, c)}`;
          }),
        ),
      )
    ).join('\n\n');

  const body = `# ${site.company}

> ${en.meta.description}

${site.person} is an independent Salesforce Enterprise Architect in Cologne, Germany, working on the client side for manufacturing companies (sales, service, field service, after-sales), independent of vendors and implementation partners.

The German version is the main site at the root; the English version lives under /en/.

- [Home (German)](${abs(homeHref('de'))})
- [Home (English)](${abs(homeHref('en'))})
- [Services](${abs(servicesIndex('en'))}), German: [Leistungen](${abs(servicesIndex('de'))})
- [Blog](${abs(blogIndex('en'))}), German: [Blog](${abs(blogIndex('de'))})
- [Masterclasses](${abs(masterclassesIndex('en'))}), German: [Masterclasses](${abs(masterclassesIndex('de'))}): overview of all masterclasses
${courseIds.map((c) => `- [${courseTexts('en', c).name}](${abs(masterclassIndex('en', c))}), German: [${courseTexts('de', c).name}](${abs(masterclassIndex('de', c))}): ${courseTexts('en', c).metaDescription}`).join('\n')}
- [Speaker & events](${abs(localHref('en', 'speaking/'))}): talks at Salesforce community conferences (Flow performance, Flow vs OmniScript, Lightning Flow Scanner)
- [Questions I ask in every Salesforce project](${abs(localHref('en', questionPaths.en))}), German: [Fragen, die ich in jedem Salesforce-Projekt stelle](${abs(localHref('de', questionPaths.de))}): goal and deadline, partner ownership, ERP interfaces, data volumes, operations, licences
- [Freelance Salesforce Architect](${abs(localHref('en', freelanceArchitectPaths.en))}), German: [Freiberuflicher Salesforce Architect](${abs(localHref('de', freelanceArchitectPaths.de))}): independent architect on the client side for manufacturers, when it pays off compared with an implementation partner, deliverables, terms
- [Juliane Winterscheid, change management](${abs(localHref('en', julianePaths.en))}), German: [Juliane Winterscheid, Change Management](${abs(localHref('de', julianePaths.de))}): cooperation partner for change management in Salesforce rollouts, Prosci certified, references and joint approach
- [Freelance Salesforce Architect: working with recruiters](${abs(localHref('en', recruiterPaths.en))}), German: [Zusammenarbeit mit Recruitern](${abs(localHref('de', recruiterPaths.de))}): roles that fit, response time, submissions only with approval, no double submissions
- [LinkedIn](${site.linkedin})

## Services

${await services('en')}

## Services (German)

${await services('de')}

${await masterclassSections()}

## Articles

${await list('en')}

## Articles (German)

${await list('de')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
