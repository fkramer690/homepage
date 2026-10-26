// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { readdirSync, readFileSync } from 'node:fs';
import { externalLinks } from './src/lib/external-links.mjs';

// The site runs on the custom domain https://fk-sd.de (see public/CNAME).
const site = process.env.SITE_URL ?? 'https://fk-sd.de';
const base = process.env.BASE_PATH ?? '/';

// German is the main version at the root, English lives under /en/. The old
// URLs (/de/…, /services/…, English articles under /blog/…) are kept as
// redirect pages, which must not show up in the sitemap.
const enSlugs = readdirSync('src/content/blog/en').map(
  (file) => readFileSync(`src/content/blog/en/${file}`, 'utf8').match(/^slug:\s*"?([^"\n]+)"?/m)?.[1],
);
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
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
