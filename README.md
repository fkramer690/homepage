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
| Masterclass chapters | `src/content/masterclass/en/`, `src/content/masterclass/de/` (rules: [docs/masterclass.md](docs/masterclass.md)) |
| Masterclass hub texts, article clusters | `masterclass` in `src/i18n/`, `src/lib/masterclass.ts` |
| Masterclass overview texts, list of masterclasses | `masterclasses` in `src/i18n/`, `src/lib/courses.ts`, `src/lib/masterclasses.ts` |
| DevOps masterclass hub texts, article clusters | `masterclassDevops` in `src/i18n/`, `src/lib/masterclass.ts` |

The contact form uses [Web3Forms](https://web3forms.com). Its access key is stored as the repository secret `WEB3FORMS_ACCESS_KEY` (Settings → Secrets and variables → Actions) and injected at build time. For local testing, run `PUBLIC_WEB3FORMS_KEY=<key> npm run dev`.

Visitor statistics use [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (no cookies). The site token is stored as the repository secret `CF_ANALYTICS_TOKEN`; without it no analytics script is included.

Search and AI visibility come from [DataForSEO](https://dataforseo.com) (secrets `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`, the API login, not the account e-mail). `.github/workflows/rankings.yml` runs every Monday: Google positions, search volumes and AI Overview citations for the keywords in `seo/keywords.json`, plus every keyword fk-sd.de ranks for. `.github/workflows/ai-visibility.yml` runs on the 1st of each month and asks the questions in `seo/ai-prompts.json` to ChatGPT, Claude, Gemini, Perplexity and Google AI Mode. `.github/workflows/onpage.yml` crawls the live site on the 1st of each month with the DataForSEO OnPage API (duplicate titles, descriptions and content, broken links, redirect chains, non-indexable pages, structured data errors; a manual run can reuse an earlier crawl by its task id). They store snapshots on the `stats` branch (`stats/rankings/`, `stats/ai/`, `stats/onpage/`) and the dashboard rows in `stats/seo-dashboard/`. Edit the two JSON files to change what is tracked.

Page speed comes from the PageSpeed Insights API (secret `PAGESPEED_API_KEY`). `.github/workflows/pagespeed.yml` runs on the 3rd of each month (and by hand) for the key pages in `scripts/fetch-pagespeed.mjs`, mobile and desktop: Lighthouse scores, lab metrics and Core Web Vitals from real users once Google has enough data. Snapshots go to `stats/pagespeed/` on the `stats` branch.

The Claude scheduled task "Monatliche Artikelprüfung" runs on the 3rd of each month (`.github/workflows/stale-articles.yml` does the same when started by hand): `scripts/stale-articles.mjs` lists blog articles and masterclass chapters whose prices or Flex Credits were last checked more than six months ago, or whose deadlines and Salesforce releases have passed since then, and also lists external source links that answer 404 or 410 (`--links`), and keeps one open issue "Artikel prüfen: Preise, Fristen und tote Links" (label `artikel-pruefen`) up to date. After checking an article, set its `updatedDate`. Locally behind a proxy, run it with `NODE_USE_ENV_PROXY=1`.

Setting `bookingUrl` in `src/site.ts` (e.g. a Microsoft Bookings page) turns all "Book a call" buttons into links to that page; otherwise they open an email.

### Blog articles

Each article is a Markdown file in `src/content/blog/<lang>/`. The frontmatter is checked at build time (see `src/content.config.ts`); [docs/blog-template.md](docs/blog-template.md) shows all fields (title, description, takeaways, FAQ, tags, …).

The EN and DE versions of an article share the same `translationKey`, which links them via hreflang. Articles appear under `/blog/` (DE) and `/en/blog/` (EN), in the sitemap, the RSS feeds (`/blog/rss.xml`, `/en/blog/rss.xml`) and `llms.txt` automatically.

Rules for structure, SEO and AI search are in [docs/blog-guidelines.md](docs/blog-guidelines.md); start new articles from [docs/blog-template.md](docs/blog-template.md). `npm run build` runs `scripts/check-blog.mjs` first and fails if an article breaks a rule (`npm run check:blog` runs only the check).

Open ideas and planned articles are in [docs/backlog.md](docs/backlog.md) (German, single source of truth; the repo is public, so no client names or internal notes there).

### Service pages

Each service on the home page links to its own page under `/leistungen/` (DE) and `/en/services/` (EN), built from Markdown files in `src/content/services/<lang>/` by `src/components/ServicePage.astro`. Rules are in [docs/service-pages.md](docs/service-pages.md); the same build check applies.

### Masterclass

All masterclasses are listed on one overview page (`/masterclass/`, `/en/masterclass/`), the "Masterclasses" menu item, built by `src/components/MasterclassIndex.astro`. The AI masterclass has a hub page (`/masterclass/ki-salesforce/`, `/en/masterclass/ai-salesforce/`; the old `/masterclass-ki/` and `/en/ai-masterclass/` URLs are redirect pages) and ten chapter pages; the DevOps masterclass (`/masterclass/devops-release-management/`, `/en/masterclass/devops-release-management/`) works the same way. All chapters are built from `src/content/masterclass/<lang>/` by `src/components/MasterclassHub.astro` and `src/components/MasterclassChapter.astro`. Rules are in [docs/masterclass.md](docs/masterclass.md); the same build check applies.

### External links

Rule: every external link opens in a new tab. Links in Markdown get `target="_blank"`, the arrow and a screen-reader hint from `src/lib/external-links.mjs` (a Sätteri plugin in `astro.config.mjs`). Links in components need `target="_blank" rel="noopener"` and `<ExternalMark label={t.nav.externalTab} />`. After the build, `scripts/check-links.mjs` checks every page in `dist/` and fails the build on an external link without a new tab (`npm run check:links` runs only the check).

### Sitemap

`@astrojs/sitemap` builds `sitemap-index.xml` on every build; new pages and articles land in it automatically. Rule: the sitemap lists exactly the indexable pages. After the build, `scripts/check-sitemap.mjs` compares it with `dist/` and fails if a page without `<meta name="robots" content="noindex">` is missing, a noindex page (legal pages, redirects, 404) is listed, or a listed URL has no page (`npm run check:sitemap` runs only the check). To hide a page from search engines, set `noindex` on it and exclude it in the sitemap `filter` in `astro.config.mjs`.

Image alt texts: every `<img>` needs an `alt` with a value: a description for photos, the company name for logos, `alt=""` for purely decorative images. Astro renders an empty dynamic `alt` as a bare `alt`, which Bing reports as missing, so `src/lib/explicit-empty-alt.mjs` writes it back as `alt=""` after the build; `scripts/check-images.mjs` then fails the build on any `<img>` without an alt value (`npm run check:images`).

Page titles: `scripts/check-titles.mjs` runs after the sitemap check and fails if an indexable page has no `<title>`, a title longer than 60 characters, or the same title as another page (`npm run check:titles`). Articles, chapters and most pages add ` | FK Solution Design` only when it still fits in 60 characters, so the keyword stays at the front.

## Where files go

The repository root holds only project files (`package.json`, configs, `README.md`, `CLAUDE.md`). `scripts/check-root.mjs` runs first in `npm run build` and fails on anything else there, such as an exported SVG (`npm run check:root`).

| File | Place |
|---|---|
| Card drawings of the blog overview (one per article, EN + DE) | code in `src/lib/card-drawings.ts`, keyed by `translationKey`; drawn into the page at build time, no image files |
| Card drawings as standalone SVG, to look at or share | `npm run cards:export` (or `npm run cards:export -- <translationKey>`) writes `previews/card-drawings/<translationKey>-<lang>.svg`; the folder is git-ignored and regenerated on every export |
| Flow diagrams in articles | `src/assets/diagrams/`, rendered by `node scripts/render-diagrams.mjs` |
| Explanatory graphics, photos, certification badges | `src/assets/blog/`, `src/assets/photos/`, `src/assets/certifications/` |
| Icons | `src/icons/` |
| Files served as they are (favicon, client logos, downloads) | `public/` |
| Concept notes for reuse in other projects (not published) | `docs/konzepte/` |

## Local development

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # output in dist/
```

## Deployment

Every push to `main` builds and deploys the site via `.github/workflows/deploy.yml`.
One-time setup: in the repository settings under **Pages**, set **Source** to **GitHub Actions**.

After each deploy, `scripts/indexnow.mjs` sends the pages whose content changed (title, description, text of the main area without navigation and contact section; layout and style changes do not count) to IndexNow (Bing and others). It compares against `indexnow-hashes.json` on the live site; the key file is `public/<key>.txt`.

The site is served at https://www.fk-sd.de/ (`site` and `base` in `astro.config.mjs`, domain in `public/CNAME`). Both fk-sd.de and the old address https://fkramer690.github.io/homepage/ redirect there.

### Domain setup (Strato)

1. Apex `fk-sd.de`: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and AAAA records `2606:50c0:8000::153` to `2606:50c0:8003::153`; `www` CNAME to `fkramer690.github.io`. Leave MX, SPF and other TXT records untouched (e-mail runs on this domain).
2. In the repository settings under **Pages → Custom domain**, enter `www.fk-sd.de` and enable **Enforce HTTPS** once the certificate is issued.
