# FK Solution Design – Homepage

Static website for FK Solution Design GmbH, built with [Astro](https://astro.build) and hosted on GitHub Pages. English at `/`, German at `/de/`, Impressum and Datenschutz in German.

## Editing content

| What | Where |
|---|---|
| English texts | `src/i18n/en.ts` |
| German texts | `src/i18n/de.ts` |
| Email, booking link, LinkedIn, Impressum data | `src/site.ts` |
| Impressum / Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` |
| Colors, typography, layout | `src/styles/global.css` |
| Logo | `src/components/Logo.astro`, `public/favicon.svg` |

Setting `bookingUrl` in `src/site.ts` (e.g. a Microsoft Bookings page) turns all "Book a call" buttons into links to that page; otherwise they open an email.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321/homepage/
npm run build    # output in dist/
```

## Deployment

Every push to `main` builds and deploys the site via `.github/workflows/deploy.yml`.
One-time setup: in the repository settings under **Pages**, set **Source** to **GitHub Actions**.

Until a custom domain is connected, the site is served at https://fkramer690.github.io/homepage/.

### Connecting the domain later

1. At Strato, set A records for the apex domain to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `www` CNAME to `fkramer690.github.io`. Leave MX records untouched.
2. Verify the domain in your GitHub account settings, then enter it under **Pages → Custom domain** and enable **Enforce HTTPS**.
3. In `.github/workflows/deploy.yml`, add to the build step:
   ```yaml
   env:
     SITE_URL: https://your-domain.de
     BASE_PATH: /
   ```
