# Masterclasses

All masterclasses sit below one overview page, `/masterclass/` (DE) and `/en/masterclass/` (EN), which is the "Masterclasses" item in the main menu and footer. Each masterclass has its own hub and chapters below it, so a new masterclass never needs a new menu item.

## Overview page

`src/components/MasterclassIndex.astro` builds both language versions: eyebrow, H1, intro and one card per masterclass (number, name, title, summary, chapters, articles, languages). Texts live in `masterclasses` in `src/i18n/{de,en}.ts`; the list of masterclasses comes from `src/lib/masterclasses.ts`. A masterclass without published chapters is hidden. Breadcrumbs: Home › Masterclasses › hub › chapter.

## How several masterclasses share one setup

All chapters of all masterclasses live in the one `masterclass` collection (`src/content/masterclass/<lang>/`). The frontmatter field `course` says which masterclass a chapter belongs to (`ai` if not set, `devops`). The same components build every masterclass: `MasterclassHub.astro` (prop `course`) and `MasterclassChapter.astro` (reads `course` from the chapter).

| What | Where |
|---|---|
| Masterclass ids, URL segment, text key, preview image | `src/lib/courses.ts` |
| Hub and chapter texts | `masterclass` (AI) and `masterclassDevops` (DevOps) in `src/i18n/{de,en}.ts`, same shape |
| Article clusters on each hub | `aiClusters` and `devopsClusters` in `src/lib/masterclass.ts` |
| Cards on the overview page | `src/lib/masterclasses.ts`, in the order of `courseIds` |
| URLs in the sitemap | `masterclassSegments` in `astro.config.mjs` |

## Adding a masterclass

1. Add an id to `courseIds` and an entry to `courses` in `src/lib/courses.ts` (URL segment per language, text key, preview image name, icon from `src/icons/` for the overview page), and its short name to `masterclasses.homeNames` in both `src/i18n/` files.
2. Add a text block with the same shape as `masterclass` to both `src/i18n/` files, and its clusters to `src/lib/masterclass.ts`.
3. Add the hub and chapter routes below `src/pages/masterclass/<segment>/` and `src/pages/en/masterclass/<segment>/` (copy the DevOps ones), a preview image route in `src/pages/og/[lang]/`, the segment to `masterclassSegments` in `astro.config.mjs` and a section to `src/pages/llms.txt.ts`.
4. Write the chapters with `course: <id>` and their own translationKeys.
5. Never move a published masterclass again without redirect pages (see "Old URLs" below).

Chapters use the content blocks from [content-blocks.md](content-blocks.md) under the same rules as articles (see "Content blocks" in the blog guidelines); a chapter condenses, so prefer timelines, flow diagrams, steps and pro-contra over notes.

# Product masterclasses (Manufacturing Cloud, Revenue Cloud, B2B Commerce, Field Service)

Four masterclasses with a hub and five chapters each, same frontmatter, body rules and build check as the AI masterclass below:

| Masterclass | `course` | translationKeys | URL segment (DE and EN) | Texts in i18n |
|---|---|---|---|---|
| Manufacturing Cloud | `manufacturing-cloud` | `mfg-01` … `mfg-05` | `manufacturing-cloud` | `masterclassManufacturing` |
| Revenue Cloud | `revenue-cloud` | `revenue-01` … `revenue-05` | `revenue-cloud` | `masterclassRevenue` |
| B2B Commerce | `b2b-commerce` | `commerce-01` … `commerce-05` | `b2b-commerce` | `masterclassCommerce` |
| Field Service | `field-service` | `fsl-01` … `fsl-05` | `field-service` | `masterclassFieldService` |

Each chapter links its articles (blog categories and the topics `commerce`, `revenue`, `field-service`), its neighbouring chapters and the matching chapters of the other masterclasses (`../../<segment>/<slug>/`). Boundaries: sales agreements, rebates and warranty belong to Manufacturing Cloud; quote, configurator, pricing, billing and the move from Salesforce CPQ and Billing to Revenue Cloud; storefront, cart and checkout to B2B Commerce; scheduling, mobile app and maintenance to Field Service. Examples are marked as assumptions until Fabian confirms them. Hub clusters are in `src/lib/masterclass.ts`.

# Masterclass "Change management"

Hub plus five chapters, `course: change-management`, translationKeys `cm-01` … `cm-05`, texts in `masterclassChange`, URL segment `change-management` (DE and EN). The chapters follow the ADKAR stages for Salesforce rollouts at manufacturers: diagnosis, sponsor and communication (awareness, desire), key users and training (knowledge, ability), rollout across countries and teams, measuring and reinforcement. Practice blocks use only experience from the confirmed list; Juliane Winterscheid (cooperation partner, profile page `/partner/juliane-winterscheid/`, content in `src/data/juliane-winterscheid.ts`) reviews the content. The hub articles of the blog category `change-management` are the clusters in `src/lib/masterclass.ts`.

# Masterclass "DevOps and release management"

Hub plus ten chapters, `course: devops`, translationKeys `devops-01` … `devops-10`: DE under `/masterclass/devops-release-management/`, EN under `/en/masterclass/devops-release-management/`. Same frontmatter, body rules and build check as the AI masterclass below. DevOps Center / Lifecycle Center is covered only in chapter 4 (tools); sfdx-hardis appears as an example next to Gearset, Copado and Flosum. Links to the AI masterclass go to `../../ki-salesforce/<slug>/` (DE) and `../../ai-salesforce/<slug>/` (EN).

# Masterclass "AI in the Salesforce ecosystem"

A hub page plus ten chapter pages: DE under `/masterclass/ki-salesforce/` and `/masterclass/ki-salesforce/<slug>/`, EN under `/en/masterclass/ai-salesforce/` and `/en/masterclass/ai-salesforce/<slug>/`. Chapters are Markdown files in `src/content/masterclass/<lang>/`. `src/content.config.ts` checks the frontmatter and `scripts/check-blog.mjs` checks the body, both in `npm run build`. There is no PDF download.

Chapters follow the content rules of the [blog guidelines](blog-guidelines.md): plain language, no AI slop, no en or em dashes, no raw HTML, only experience Fabian has confirmed, no client names, never the energy or utility sector, relative links only.

## Hub page

`src/components/MasterclassHub.astro` builds both language versions. Texts (hero, deadlines, headings) live in `masterclass` in `src/i18n/{de,en}.ts`; links come from `src/lib/masterclass.ts`.

1. Hero with eyebrow, H1, lead, "To the chapters" and "Book a call", plus the four-layer drawing
2. Key facts: 10 chapters, number of published articles in the clusters, DE/EN
3. Deadlines as a timeline (`masterclass.deadlines` in i18n; `articleKey` links an entry to a blog article)
4. Chapters (`#kapitel` / `#chapters`) as a numbered path in two columns from the collection: number, `short`, `summary`
5. Article clusters (`#artikel` / `#articles`) as topic tabs (radio inputs, no script; the first topic is open), defined in `clusters` in `src/lib/masterclass.ts` as ordered blog translationKeys. Unpublished articles are skipped, a cluster without published articles is hidden

Each of the three sections has a heading plus one or two sentences below it (`deadlinesText`, `chaptersText`, `articlesText` per masterclass in i18n).
6. Author box and the contact section

## Chapter page

`src/components/MasterclassChapter.astro` builds every chapter the same way: back link to the hub, "Chapter 3 of 10", title, reading time, takeaways, **body (the only part from Markdown)**, optional FAQ, "Articles for this chapter" (from `articles`, published only), previous/next chapter, author box, contact section. JSON-LD: Article/LearningResource with `isPartOf` the hub, FAQPage when there is a FAQ, BreadcrumbList. Preview images are generated at `/og/<lang>/masterclass/<slug>.png`.

## Frontmatter

| Field | Rule |
|---|---|
| `title` | 20–60 characters |
| `description` | 120–160 characters |
| `lang` | `de` or `en`, matches the folder |
| `slug` | lowercase with hyphens, unique across EN and DE, never changed after publishing |
| `course` | `ai` (default) or `devops`, see `src/lib/courses.ts` |
| `translationKey` | `masterclass-01` … `masterclass-10` (AI) or `devops-01` … `devops-10`, the same for EN and DE |
| `chapter` | 1–10, sets the order |
| `short` | 5–40 characters, card title on the hub |
| `summary` | 40–160 characters, one sentence for the card |
| `takeaways` | 3–5 standalone sentences, max. 220 characters each |
| `articles` | 1–8 blog translationKeys covered by the chapter |
| `faq` | optional, up to 6 questions, answers up to 600 characters |
| `updatedDate` | optional, set when the chapter changes in substance |
| `draft` | optional; drafts are left out of the production build |

## Body (checked by `scripts/check-blog.mjs`)

- 900–3,000 words, at least 3 H2 sections, at least one phrased as a question, no H1 and no H4+.
- First paragraph gives the answer in at most 110 words.
- At least 2 relative links, e.g. other chapters (`../<slug>/`), the hub (`../`), blog articles (`../../../blog/<slug>/`), service pages (`../../../leistungen/<slug>/` in DE, `../../../services/<slug>/` in EN). Chapters sit three levels deep, so links outside the masterclass start with `../../../`.
- Blog articles link to chapters with `../../masterclass/ki-salesforce/<slug>/` (DE) or `../../masterclass/ai-salesforce/<slug>/` (EN).
- EN and DE versions are both required. No card drawing is needed.
- The banned terms, slop phrases, dash and "it is not X, it is Y" checks of the blog apply unchanged.

## Old URLs

Until 2026-10-28 the AI masterclass lived at `/masterclass-ki/` and `/en/ai-masterclass/`. Those addresses, hub and every chapter, are redirect pages now (`src/pages/masterclass-ki/`, `src/pages/en/ai-masterclass/`, built with `src/components/Redirect.astro`), are `noindex` and are excluded from the sitemap via `redirectPaths` in `astro.config.mjs`. Keep them.
