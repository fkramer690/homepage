# Service pages

Each service from the home page ("What I take care of") has its own page: DE under `/leistungen/<slug>/`, EN under `/en/services/<slug>/`. The pages are Markdown files in `src/content/services/<lang>/`. `src/content.config.ts` checks the frontmatter and `scripts/check-blog.mjs` checks the body, both in `npm run build`.

Service pages follow the content rules of the [blog guidelines](blog-guidelines.md): plain language, no AI slop, no en or em dashes, only experience Fabian has confirmed, no client names, never the energy or utility sector, relative links only.

## Fixed page structure

`src/components/ServicePage.astro` builds every page the same way. The Markdown file provides the frontmatter and the body:

1. Eyebrow with number and short name (from `src/i18n`), title, lead, "Book a call"
2. Typical situations (`situations`)
3. What you get (`deliverables`) and results (`results`)
4. How I work (`phases`, 3–4 steps)
5. **Body (the only part that comes from Markdown)**
6. FAQ, collapsible (`faq`)
7. Author box
8. Related blog articles (blog posts that share a tag with `blogTags`)
9. Contact section with "Book a call" and the contact form, subject set to the service

Blog articles link back to the best matching service automatically (`getPostService` in `src/lib/services.ts`).

## Frontmatter

| Field | Rule |
|---|---|
| `title` | 20–60 characters, main keyword first |
| `description` | 120–160 characters |
| `slug` | lowercase with hyphens, unique across EN and DE |
| `translationKey` | same for EN and DE, e.g. `service-devops` |
| `order` | 1–6, position of the card on the home page; the short name comes from `services.items` in `src/i18n` |
| `lead` | 80–320 characters, the problem and what I do about it |
| `situations` | 3–5 items, each a situation the reader recognises |
| `deliverables` | 3–8 items |
| `results` | 3–6 items |
| `phases` | 3–4 items with `title` (max. 40) and `text` (max. 260) |
| `faq` | 2–6 questions, answers up to 600 characters |
| `blogTags` | 1–8 tags, matched case-insensitively against blog tags |

## Body

- 400–1,200 words, at least 2 H2 sections, at least one phrased as a question, no H1 and no H4+.
- First paragraph answers "what is this service" in at most 110 words.
- At least one concrete, anonymised example or number from real work.
- At least 2 relative links: related blog articles (`../../blog/<slug>/`), other services (`../<slug>/`), `../../#about`.
- End with an invitation to get in touch (`#contact`).
