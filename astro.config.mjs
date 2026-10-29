// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { externalLinks } from './src/lib/external-links.mjs';
import { contentBlocks } from './src/lib/content-blocks-plugin.mjs';

// The site runs on the custom domain https://www.fk-sd.de (see public/CNAME).
const site = process.env.SITE_URL ?? 'https://www.fk-sd.de';
const base = process.env.BASE_PATH ?? '/';

// German is the main version at the root, English lives under /en/. The old
// URLs (/de/…, /services/…, English articles under /blog/…, the AI masterclass
// under /masterclass-ki/ and /en/ai-masterclass/) are kept as
// redirect pages, which must not show up in the sitemap.
const field = (text, name) => text.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
const readEntries = (collection) =>
  ['de', 'en'].flatMap((lang) =>
    (existsSync(`src/content/${collection}/${lang}`) ? readdirSync(`src/content/${collection}/${lang}`) : []).filter((file) => file.endsWith('.md')).map((file) => {
      const text = readFileSync(`src/content/${collection}/${lang}/${file}`, 'utf8');
      return {
        lang,
        slug: field(text, 'slug'),
        key: field(text, 'translationKey'),
        date: field(text, 'updatedDate') ?? field(text, 'pubDate'),
        draft: field(text, 'draft') === 'true',
        course: field(text, 'course') ?? 'ai',
      };
    }),
  ).filter((e) => !e.draft);
const enSlugs = readEntries('blog').filter((e) => e.lang === 'en').map((e) => e.slug);

// Articles and service pages have different slugs per language, so the
// sitemap's i18n option cannot pair them. This map gives each of their URLs
// the DE/EN alternates and, for articles, the last change date.
// URL part of each masterclass below /masterclass/ (see src/lib/courses.ts).
const masterclassSegments = {
  ai: { de: 'ki-salesforce', en: 'ai-salesforce' },
  devops: { de: 'devops-release-management', en: 'devops-release-management' },
  'manufacturing-cloud': { de: 'manufacturing-cloud', en: 'manufacturing-cloud' },
  'revenue-cloud': { de: 'revenue-cloud', en: 'revenue-cloud' },
  'b2b-commerce': { de: 'b2b-commerce', en: 'b2b-commerce' },
  'field-service': { de: 'field-service', en: 'field-service' },
  'change-management': { de: 'change-management', en: 'change-management' },
};
const contentPaths = {
  blog: { de: (slug) => `/blog/${slug}/`, en: (slug) => `/en/blog/${slug}/` },
  services: { de: (slug) => `/leistungen/${slug}/`, en: (slug) => `/en/services/${slug}/` },
  masterclass: {
    de: (slug, e) => `/masterclass/${masterclassSegments[e.course].de}/${slug}/`,
    en: (slug, e) => `/en/masterclass/${masterclassSegments[e.course].en}/${slug}/`,
  },
};
const sitemapInfo = new Map();
for (const collection of Object.keys(contentPaths)) {
  const entries = readEntries(collection);
  for (const entry of entries) {
    const pair = Object.fromEntries(
      entries.filter((e) => e.key === entry.key).map((e) => [e.lang, contentPaths[collection][e.lang](e.slug, e)]),
    );
    sitemapInfo.set(contentPaths[collection][entry.lang](entry.slug, entry), { pair, date: entry.date });
  }
}
const servicesIndex = { de: '/leistungen/', en: '/en/services/' };
sitemapInfo.set(servicesIndex.de, { pair: servicesIndex });
sitemapInfo.set(servicesIndex.en, { pair: servicesIndex });
// Hubs and the overview change whenever one of their chapters changes, so
// their last change date is the newest chapter date (updatedDate or pubDate).
const chapterEntries = readEntries('masterclass');
const newest = (entries) => entries.map((e) => e.date).filter(Boolean).sort().at(-1);
const masterclassesIndex = { de: '/masterclass/', en: '/en/masterclass/' };
sitemapInfo.set(masterclassesIndex.de, { pair: masterclassesIndex, date: newest(chapterEntries.filter((e) => e.lang === 'de')) });
sitemapInfo.set(masterclassesIndex.en, { pair: masterclassesIndex, date: newest(chapterEntries.filter((e) => e.lang === 'en')) });
for (const [course, segment] of Object.entries(masterclassSegments)) {
  const hub = { de: `/masterclass/${segment.de}/`, en: `/en/masterclass/${segment.en}/` };
  for (const lang of ['de', 'en']) {
    sitemapInfo.set(hub[lang], { pair: hub, date: newest(chapterEntries.filter((e) => e.lang === lang && e.course === course)) });
  }
}
const questionsPage = { de: '/fragen/', en: '/en/questions/' };
sitemapInfo.set(questionsPage.de, { pair: questionsPage });
sitemapInfo.set(questionsPage.en, { pair: questionsPage });
const recruitersPage = { de: '/partner/recruiter/', en: '/en/partners/recruiters/' };
sitemapInfo.set(recruitersPage.de, { pair: recruitersPage });
sitemapInfo.set(recruitersPage.en, { pair: recruitersPage });
const julianePage = { de: '/partner/juliane-winterscheid/', en: '/en/partners/juliane-winterscheid/' };
sitemapInfo.set(julianePage.de, { pair: julianePage });
sitemapInfo.set(julianePage.en, { pair: julianePage });
const freelanceArchitectPage = { de: '/freiberuflicher-salesforce-architect/', en: '/en/freelance-salesforce-architect/' };
sitemapInfo.set(freelanceArchitectPage.de, { pair: freelanceArchitectPage });
sitemapInfo.set(freelanceArchitectPage.en, { pair: freelanceArchitectPage });
// The blog overviews change with every new article.
for (const lang of ['de', 'en']) {
  const latest = readEntries('blog').filter((e) => e.lang === lang).map((e) => e.date).sort().at(-1);
  sitemapInfo.set(lang === 'de' ? '/blog/' : '/en/blog/', { date: latest });
}
// The AI masterclass moved from /masterclass-ki/ and /en/ai-masterclass/ on 2026-10-28.
const redirectPaths = [/^\/de\//, /^\/services\//, /^\/masterclass-ki\//, /^\/en\/ai-masterclass\//, ...enSlugs.map((slug) => new RegExp(`^/blog/${slug}/$`))];

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    // All external links open in a new tab (checked by scripts/check-links.mjs).
    // Content blocks (```hinweis, ```zeitleiste, …) become markup (docs/blog-guidelines.md).
    processor: satteri({ mdastPlugins: [contentBlocks({ site })], hastPlugins: [externalLinks({ site })] }),
  },
  integrations: [
    sitemap({
      // Legal pages are noindex, so keep them out of the sitemap, as well as
      // the redirect pages.
      filter: (page) => {
        const path = new URL(page).pathname.replace(new RegExp(`^${base.replace(/\/$/, '')}`), '');
        return !/\/(impressum|datenschutz)\/$/.test(page) && !redirectPaths.some((re) => re.test(path));
      },
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de', en: 'en' },
      },
    
      serialize(item) {
        const path = new URL(item.url).pathname.replace(new RegExp(`^${base.replace(/\/$/, '')}`), '');
        const info = sitemapInfo.get(path);
        if (info?.date) item.lastmod = new Date(info.date).toISOString();
        if (info?.pair?.de && info.pair.en) {
          item.links = ['de', 'en'].map((lang) => ({ lang, url: new URL(`${base.replace(/\/$/, '')}${info.pair[lang]}`, site).href }));
        }
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
