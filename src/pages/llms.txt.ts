import type { APIRoute } from 'astro';
import { en } from '../i18n/en';
import { site } from '../site';
import { getPosts, postHref } from '../lib/blog';

// Plain-text overview for AI assistants and crawlers (llmstxt.org).
export const GET: APIRoute = async ({ site: origin }) => {
  const base = import.meta.env.BASE_URL;
  const abs = (path: string) => new URL(path, origin).href;
  const list = async (lang: 'en' | 'de') =>
    (await getPosts(lang)).map((p) => `- [${p.data.title}](${abs(postHref(p))}): ${p.data.description}`).join('\n');

  const body = `# ${site.company}

> ${en.meta.description}

${site.person} is an independent Salesforce Enterprise Architect in Cologne, Germany, working on the client side for manufacturing companies (sales, service, field service, after-sales), independent of vendors and implementation partners.

- [Home](${abs(base)})
- [Blog](${abs(`${base}blog/`)})
- [LinkedIn](${site.linkedin})

## Articles

${await list('en')}

## Articles (German)

${await list('de')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
