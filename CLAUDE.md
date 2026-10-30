# FK Solution Design homepage

Astro site on GitHub Pages. German at `/`, English under `/en/` (both maintained in parallel). Old `/de/…`, English `/blog/…` and `/services/…`, and the old masterclass URLs `/masterclass-ki/…` and `/en/ai-masterclass/…` are redirect pages (`src/components/Redirect.astro`); build links with `src/lib/paths.ts`, never hard-code a language prefix. See README.md for structure and deployment.

## Blog articles

Every blog article must follow `docs/blog-guidelines.md`: best-practice structure, SEO and optimisation for AI search. Start from `docs/blog-template.md` and follow the `blog-article` skill in `.claude/skills/`. `npm run build` runs `scripts/check-blog.mjs` and fails on violations; never weaken that check or the content schema to get an article through.

Every article page has the same fixed structure: takeaways, article body, collapsible FAQ, author box (`src/components/AuthorBox.astro`), related articles and the contact section ("Book a call" plus the contact form). All of it comes from `src/components/BlogPost.astro`; a Markdown file only provides the body and frontmatter. Change shared parts in the components, never per article.

Articles and masterclass chapters loosen up their text with content blocks from the library in `docs/content-blocks.md` (```hinweis, ```praxis, ```kennzahlen, ```zeitleiste, ```ablauf, ```pro-contra, ```vertiefung, ```schritte, ```stufen, ```vergleich, ```hebel, ```eintrag, ```saeulen, ```partnerfluss, ```tabelle, ```staerken-grenzen, ```pipeline, ```saeulenwechsel, ```basis-addons, ```level, ```prozess, ```kette; rules under "Content blocks" in `docs/blog-guidelines.md`). They render through `src/lib/content-blocks-plugin.mjs`; the build check enforces their use. Flow diagrams are rendered once with `node scripts/render-diagrams.mjs`, which fails when a label does not fit its box.

## Two pillars

Fabian's core positioning is Salesforce architecture for manufacturers. Change management, together with Juliane Winterscheid, is one building block of his Salesforce programmes, not a second business: it lives under Leistungen on the change management service page (`/leistungen/change-management/`, `/en/services/change-management-salesforce/`), never as its own menu item or start page section. That page (frontmatter `section: change-management`, texts in `src/data/change-management.ts`) shows who is behind it (Fabian, Juliane, the joint plan) and lists the change articles from the blog collection by author: Juliane's general basics and Fabian's practice from Salesforce programmes. The former area page `/change-management/` is a redirect to it. Keep the start page written for the manufacturer audience; general change topics are Juliane's articles in the blog.

## Service pages

Each service has its own page (`src/content/services/<lang>/`, built by `src/components/ServicePage.astro`). Follow `docs/service-pages.md`; the same content rules and build check as for blog articles apply.

## Masterclass

All masterclasses hang below one overview page (`/masterclass/`, `/en/masterclass/`, the single "Masterclasses" menu item); a new masterclass gets a hub below it and an entry in `src/lib/courses.ts`, never a new menu item. All masterclasses (AI, DevOps, Manufacturing Cloud, Revenue Cloud, B2B Commerce, Field Service; field `course`) share one chapter collection in `src/content/masterclass/<lang>/` and the same components (`src/components/MasterclassHub.astro`, `MasterclassChapter.astro`). They follow `docs/masterclass.md`; the blog content rules and build check apply. The homepage lists every masterclass with published chapters in its Masterclasses section.

## External links

Every external link opens in a new tab, on every page. Markdown links get this automatically from `src/lib/external-links.mjs`; in components use `target="_blank" rel="noopener"` plus `<ExternalMark>`. `scripts/check-links.mjs` runs after `astro build` and fails on violations; never weaken it.

## Icons and layouts

Every icon is one SVG file in `src/icons/` (catalogue and style rules in `src/icons/README.md`), used through `src/components/Icon.astro`; never inline icon SVG in a component. Layouts Fabian explicitly liked are collected in `docs/layouts.md`; reuse them before inventing new ones.

## Page width

Every page uses one frame (`--max`, 1216px content) and is either a `reading` or a `wide` page (`layout` prop of `src/layouts/Page.astro`). Reading pages put all running text into `src/components/ReadingGrid.astro` (740px text column plus sticky side column with contents and booking box); wide pages (start, overviews, partner) use the full frame for cards and grids. Rules under "Page width" in `docs/layouts.md`. `scripts/check-layout.mjs` runs after `astro build` and fails on violations; never give a container its own width and never weaken the check.

## Sitemap

The sitemap must list exactly the indexable pages. `scripts/check-sitemap.mjs` runs after `astro build` and fails if a page without `noindex` is missing from it, a `noindex` page is in it, or a listed URL has no page. To keep a page out of the sitemap, give it `noindex` (and add it to the sitemap filter in `astro.config.mjs`); never weaken the check.

## Graphics stay inside their frame

No label in a drawing may run over the edge, out of its box, into another box or under a line or icon. `scripts/check-graphics.mjs` runs after `astro build` and checks every card drawing (`src/lib/card-drawings.ts`, EN and DE) and every other inline SVG with text; a new kind of drawing must be added to it. `src/lib/og.ts` refuses preview image titles over three lines. Rules under "Card image" in `docs/blog-guidelines.md`; never weaken the check.

## Graphics review

Every graphic (content blocks, explanatory graphics, card drawings, hub drawings, icons, layouts, page elements, animations, preview images) has an entry in `docs/graphics-review.json` with Fabian's rating (1 reference, 2 okay, 3 todo) or `null` while it is open. A new graphic gets its entry with `"rating": null` in the same pull request; never set a rating Fabian did not give. `scripts/check-graphics-review.mjs` runs in `npm run build` and fails on graphics missing from the register; never weaken it. Process in `docs/graphics-review.md`.

## Page titles

Every indexable page has a unique `<title>` of at most 60 characters, keyword first; the brand suffix ` | FK Solution Design` is added only where it fits. `scripts/check-titles.mjs` runs after `astro build` and enforces this; never weaken it.

## FAQ heading

On German pages the FAQ section is always called "Häufig gestellte Fragen" (English: "Frequently asked questions"), never "Häufige Fragen". `scripts/check-blog.mjs` fails on the old wording anywhere in `src/`.

## Repository root

Only project files live in the repository root; `scripts/check-root.mjs` fails the build on anything else. Card drawing previews go to `previews/` (git-ignored) via `npm run cards:export`; where every other kind of file belongs is listed under "Where files go" in README.md.
