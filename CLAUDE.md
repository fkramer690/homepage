# FK Solution Design homepage

Astro site on GitHub Pages. German at `/`, English under `/en/` (both maintained in parallel). Old `/de/…`, English `/blog/…` and `/services/…`, and the old masterclass URLs `/masterclass-ki/…` and `/en/ai-masterclass/…` are redirect pages (`src/components/Redirect.astro`); build links with `src/lib/paths.ts`, never hard-code a language prefix. See README.md for structure and deployment.

## Blog articles

Every blog article must follow `docs/blog-guidelines.md`: best-practice structure, SEO and optimisation for AI search. Start from `docs/blog-template.md` and follow the `blog-article` skill in `.claude/skills/`. `npm run build` runs `scripts/check-blog.mjs` and fails on violations; never weaken that check or the content schema to get an article through.

Every article page has the same fixed structure: takeaways, article body, collapsible FAQ, author box (`src/components/AuthorBox.astro`), related articles and the contact section ("Book a call" plus the contact form). All of it comes from `src/components/BlogPost.astro`; a Markdown file only provides the body and frontmatter. Change shared parts in the components, never per article.

## Service pages

Each service has its own page (`src/content/services/<lang>/`, built by `src/components/ServicePage.astro`). Follow `docs/service-pages.md`; the same content rules and build check as for blog articles apply.

## Masterclass

All masterclasses hang below one overview page (`/masterclass/`, `/en/masterclass/`, the single "Masterclasses" menu item); a new masterclass gets a hub below it and an entry in `src/lib/courses.ts`, never a new menu item. All masterclasses (AI, DevOps, Manufacturing Cloud, Revenue Cloud, B2B Commerce, Field Service; field `course`) share one chapter collection in `src/content/masterclass/<lang>/` and the same components (`src/components/MasterclassHub.astro`, `MasterclassChapter.astro`). They follow `docs/masterclass.md`; the blog content rules and build check apply. The homepage lists every masterclass with published chapters in its Masterclasses section.

## External links

Every external link opens in a new tab, on every page. Markdown links get this automatically from `src/lib/external-links.mjs`; in components use `target="_blank" rel="noopener"` plus `<ExternalMark>`. `scripts/check-links.mjs` runs after `astro build` and fails on violations; never weaken it.

## Sitemap

The sitemap must list exactly the indexable pages. `scripts/check-sitemap.mjs` runs after `astro build` and fails if a page without `noindex` is missing from it, a `noindex` page is in it, or a listed URL has no page. To keep a page out of the sitemap, give it `noindex` (and add it to the sitemap filter in `astro.config.mjs`); never weaken the check.
