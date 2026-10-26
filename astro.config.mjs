// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { readdirSync, readFileSync } from 'node:fs';
import { externalLinks } from './src/lib/external-links.mjs';

// The site runs on the custom domain https://www.fk-sd.de (see public/CNAME).
const site = process.env.SITE_URL ?? 'https://www.fk-sd.de';
const base = process.env.BASE_PATH ?? '/';

// German is the main version at the root, English lives under /en/. The old
// URLs (/de/…, /services/…, English articles under /blog/…) are kept as
// redirect pages, which must not show up in the sitemap.
const field = (text, name) => text.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
const readEntries = (collection) =>
  ['de', 'en'].flatMap((lang) =>
    readdirSync(`src/content/${collection}/${lang}`).map((file) => {
      const text = readFileSync(`src/content/${collection}/${lang}/${file}`, 'utf8');
      return {
        lang,
        slug: field(text, 'slug'),
        key: field(text, 'translationKey'),
        date: field(text, 'updatedDate') ?? field(text, 'pubDate'),
        draft: field(text, 'draft') === 'true',
      };
    }),
  ).filter((e) => !e.draft);
const enSlugs = readEntries('blog').filter((e) => e.lang === 'en').map((e) => e.slug);

// Articles and service pages have different slugs per language, so the
// sitemap's i18n option cannot pair them. This map gives each of their URLs
// the DE/EN alternates and, for articles, the last change date.
const contentPaths = {
  blog: { de: (slug) => `/blog/${slug}/`, en: (slug) => `/en/blog/${slug}/` },
  services: { de: (slug) => `/leistungen/${slug}/`, en: (slug) => `/en/services/${slug}/` },
};
const sitemapInfo = new Map();
for (const collection of Object.keys(contentPaths)) {
  const entries = readEntries(collection);
  for (const entry of entries) {
    const pair = Object.fromEntries(
      entries.filter((e) => e.key === entry.key).map((e) => [e.lang, contentPaths[collection][e.lang](e.slug)]),
    );
    sitemapInfo.set(contentPaths[collection][entry.lang](entry.slug), { pair, date: entry.date });
  }
}
const servicesIndex = { de: '/leistungen/', en: '/en/services/' };
sitemapInfo.set(servicesIndex.de, { pair: servicesIndex });
sitemapInfo.set(servicesIndex.en, { pair: servicesIndex });
// The blog overviews change with every new article.
for (const lang of ['de', 'en']) {
  const latest = readEntries('blog').filter((e) => e.lang === lang).map((e) => e.date).sort().at(-1);
  sitemapInfo.set(lang === 'de' ? '/blog/' : '/en/blog/', { date: latest });
}
const redirectPaths = [/^\/de\//, /^\/services\//, ...enSlugs.map((slug) => new RegExp(`^/blog/${slug}/$`))];

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    // All external links open in a new tab (checked by scripts/check-links.mjs).
    processor: satteri({ hastPlugins: [externalLinks({ site })] }),
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
