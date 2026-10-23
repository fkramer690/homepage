import type { APIRoute } from 'astro';
import { en } from '../i18n/en';
import { site } from '../site';
import { getPosts, postHref, blogIndex } from '../lib/blog';
import { getServices, serviceHref, servicesIndex } from '../lib/services';
import { homeHref, localHref } from '../lib/paths';

// Plain-text overview for AI assistants and crawlers (llmstxt.org).
export const GET: APIRoute = async ({ site: origin }) => {
  const abs = (path: string) => new URL(path, origin).href;
  const list = async (lang: 'en' | 'de') =>
    (await getPosts(lang)).map((p) => `- [${p.data.title}](${abs(postHref(p))}): ${p.data.description}`).join('\n');

  const services = async (lang: 'en' | 'de') =>
    (await getServices(lang)).map((s) => `- [${s.data.title}](${abs(serviceHref(s))}): ${s.data.description}`).join('\n');

  const body = `# ${site.company}

> ${en.meta.description}

${site.person} is an independent Salesforce Enterprise Architect in Cologne, Germany, working on the client side for manufacturing companies (sales, service, field service, after-sales), independent of vendors and implementation partners.

The German version is the main site at the root; the English version lives under /en/.

- [Home (German)](${abs(homeHref('de'))})
- [Home (English)](${abs(homeHref('en'))})
- [Services](${abs(servicesIndex('en'))}), German: [Leistungen](${abs(servicesIndex('de'))})
- [Blog](${abs(blogIndex('en'))}), German: [Blog](${abs(blogIndex('de'))})
- [Speaker & events](${abs(localHref('en', 'speaking/'))}): talks at Salesforce community conferences (Flow performance, Flow vs OmniScript, Lightning Flow Scanner)
- [LinkedIn](${site.linkedin})

## Services

${await services('en')}

## Services (German)

${await services('de')}

## Articles

${await list('en')}

## Articles (German)

${await list('de')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
