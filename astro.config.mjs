// @ts-check
import { defineConfig } from 'astro/config';

// Until the custom domain is connected, the site lives at
// https://fkramer690.github.io/homepage. Once the domain is live,
// set SITE_URL to the domain and BASE_PATH to "/" (see README).
const site = process.env.SITE_URL ?? 'https://fkramer690.github.io';
const base = process.env.BASE_PATH ?? '/homepage';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
});
