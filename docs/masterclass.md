# Masterclass "AI in the Salesforce ecosystem"

A hub page plus ten chapter pages: DE under `/masterclass-ki/` and `/masterclass-ki/<slug>/`, EN under `/en/ai-masterclass/` and `/en/ai-masterclass/<slug>/`. Chapters are Markdown files in `src/content/masterclass/<lang>/`. `src/content.config.ts` checks the frontmatter and `scripts/check-blog.mjs` checks the body, both in `npm run build`. There is no PDF download.

Chapters follow the content rules of the [blog guidelines](blog-guidelines.md): plain language, no AI slop, no en or em dashes, no raw HTML, only experience Fabian has confirmed, no client names, never the energy or utility sector, relative links only.

## Hub page

`src/components/MasterclassHub.astro` builds both language versions. Texts (hero, deadlines, headings) live in `masterclass` in `src/i18n/{de,en}.ts`; links come from `src/lib/masterclass.ts`.

1. Hero with eyebrow, H1, lead, "To the chapters" and "Book a call", plus the four-layer drawing
2. Key facts: 10 chapters, number of published articles in the clusters, DE/EN
3. Deadlines (`masterclass.deadlines` in i18n; `articleKey` links a card to a blog article)
4. Chapter cards (`#kapitel` / `#chapters`) from the collection: number, `short`, `summary`
5. Article clusters (`#artikel` / `#articles`), defined in `clusters` in `src/lib/masterclass.ts` as ordered blog translationKeys. Unpublished articles are skipped, a cluster without published articles is hidden
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
| `translationKey` | `masterclass-01` … `masterclass-10`, the same for EN and DE |
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
- At least 2 relative links, e.g. other chapters (`../<slug>/`), blog articles (`../../blog/<slug>/`), service pages (`../../leistungen/<slug>/` in DE, `../../services/<slug>/` in EN).
- EN and DE versions are both required. No card drawing is needed.
- The banned terms, slop phrases, dash and "it is not X, it is Y" checks of the blog apply unchanged.
