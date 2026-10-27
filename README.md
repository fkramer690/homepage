# FK Solution Design – Homepage

Static website for FK Solution Design GmbH, built with [Astro](https://astro.build) and hosted on GitHub Pages. German at `/`, English at `/en/`, Impressum and Datenschutz in German. Links between the language versions come from `src/lib/paths.ts`. The old URLs from before the switch (`/de/…`, English articles under `/blog/…`, `/services/…`) are static redirect pages built with `src/components/Redirect.astro` and are kept out of the sitemap.

## Editing content

| What | Where |
|---|---|
| English texts | `src/i18n/en.ts` |
| German texts | `src/i18n/de.ts` |
| Email, booking link, LinkedIn, Impressum data | `src/site.ts` |
| Impressum / Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` |
| Colors, typography, layout | `src/styles/global.css` |
| Logo | `src/components/Logo.astro`, `public/favicon.svg` |
| Blog articles | `src/content/blog/en/`, `src/content/blog/de/` |
| Service pages | `src/content/services/en/`, `src/content/services/de/` |

The contact form uses [Web3Forms](https://web3forms.com). Its access key is stored as the repository secret `WEB3FORMS_ACCESS_KEY` (Settings → Secrets and variables → Actions) and injected at build time. For local testing, run `PUBLIC_WEB3FORMS_KEY=<key> npm run dev`.

Visitor statistics use [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (no cookies). The site token is stored as the repository secret `CF_ANALYTICS_TOKEN`; without it no analytics script is included.

Setting `bookingUrl` in `src/site.ts` (e.g. a Microsoft Bookings page) turns all "Book a call" buttons into links to that page; otherwise they open an email.

### Blog articles

Each article is a Markdown file in `src/content/blog/<lang>/`. The frontmatter is checked at build time (see `src/content.config.ts`); [docs/blog-template.md](docs/blog-template.md) shows all fields (title, description, takeaways, FAQ, tags, …).

The EN and DE versions of an article share the same `translationKey`, which links them via hreflang. Articles appear under `/blog/` (DE) and `/en/blog/` (EN), in the sitemap, the RSS feeds (`/blog/rss.xml`, `/en/blog/rss.xml`) and `llms.txt` automatically.

Rules for structure, SEO and AI search are in [docs/blog-guidelines.md](docs/blog-guidelines.md); start new articles from [docs/blog-template.md](docs/blog-template.md). `npm run build` runs `scripts/check-blog.mjs` first and fails if an article breaks a rule (`npm run check:blog` runs only the check).

### Service pages

Each service on the home page links to its own page under `/leistungen/` (DE) and `/en/services/` (EN), built from Markdown files in `src/content/services/<lang>/` by `src/components/ServicePage.astro`. Rules are in [docs/service-pages.md](docs/service-pages.md); the same build check applies.

### External links

Rule: every external link opens in a new tab. Links in Markdown get `target="_blank"`, the arrow and a screen-reader hint from `src/lib/external-links.mjs` (a Sätteri plugin in `astro.config.mjs`). Links in components need `target="_blank" rel="noopener"` and `<ExternalMark label={t.nav.externalTab} />`. After the build, `scripts/check-links.mjs` checks every page in `dist/` and fails the build on an external link without a new tab (`npm run check:links` runs only the check).

## Local development

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # output in dist/
```

## Deployment

Every push to `main` builds and deploys the site via `.github/workflows/deploy.yml`.
One-time setup: in the repository settings under **Pages**, set **Source** to **GitHub Actions**.

After each deploy, `scripts/indexnow.mjs` sends the pages whose HTML changed to IndexNow (Bing and others). It compares against `indexnow-hashes.json` on the live site; the key file is `public/<key>.txt`.

The site is served at https://www.fk-sd.de/ (`site` and `base` in `astro.config.mjs`, domain in `public/CNAME`). Both fk-sd.de and the old address https://fkramer690.github.io/homepage/ redirect there.

### Domain setup (Strato)

1. Apex `fk-sd.de`: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and AAAA records `2606:50c0:8000::153` to `2606:50c0:8003::153`; `www` CNAME to `fkramer690.github.io`. Leave MX, SPF and other TXT records untouched (e-mail runs on this domain).
2. In the repository settings under **Pages → Custom domain**, enter `www.fk-sd.de` and enable **Enforce HTTPS** once the certificate is issued.
