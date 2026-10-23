// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { externalLinks } from './src/lib/external-links.mjs';

// Until the custom domain is connected, the site lives at
// https://fkramer690.github.io/homepage. Once the domain is live,
// set SITE_URL to the domain and BASE_PATH to "/" (see README).
const site = process.env.SITE_URL ?? 'https://fkramer690.github.io';
const base = process.env.BASE_PATH ?? '/homepage';

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
      // Legal pages and unfinished subpages are noindex, so keep them out of the sitemap.
      filter: (page) => !/\/(impressum|datenschutz|speaking|certifications)\/$/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
});
