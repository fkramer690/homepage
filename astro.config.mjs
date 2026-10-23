// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Until the custom domain is connected, the site lives at
// https://fkramer690.github.io/homepage. Once the domain is live,
// set SITE_URL to the domain and BASE_PATH to "/" (see README).
const site = process.env.SITE_URL ?? 'https://fkramer690.github.io';
const base = process.env.BASE_PATH ?? '/homepage';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
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
