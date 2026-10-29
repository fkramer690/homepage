# Service pages

Each service from the home page ("What I take care of") has its own page: DE under `/leistungen/<slug>/`, EN under `/en/services/<slug>/`. The pages are Markdown files in `src/content/services/<lang>/`. `src/content.config.ts` checks the frontmatter and `scripts/check-blog.mjs` checks the body, both in `npm run build`.

Service pages follow the content rules of the [blog guidelines](blog-guidelines.md): plain language, no AI slop, no en or em dashes, only experience Fabian has confirmed, no client names, never the energy or utility sector, relative links only.

## Fixed page structure

`src/components/ServicePage.astro` builds every page the same way. The Markdown file provides the frontmatter and the body:

1. Optional note (`note`), eyebrow with number and short name (from `src/i18n`), headline (or title), lead, "Book a call"
2. Typical situations (`situations`)
3. What you get (`deliverables`) and results (`results`)
4. How I work (`phases`, 3–4 steps)
5. **Body (the only part that comes from Markdown)**
6. FAQ, collapsible (`faq`)
7. Author box
8. Related blog articles (blog posts that share a tag with `blogTags`). With `section: change-management` the page shows the team cards (Fabian, Juliane Winterscheid, the joint plan) between "How I work" and the body, instead of the related articles the change management articles grouped by author (newest four per group, the rest linked in the filtered blog), the heading "Was wir machen" and the shared author box of Fabian and Juliane (`src/components/ChangeTeam.astro`, `ChangeArticles.astro`, texts in `src/data/change-management.ts`). On that page "ich" is Fabian and "wir" are Fabian and Juliane; the first paragraph says so
9. Contact section with "Book a call" and the contact form, subject set to the service. Heading, text and the lists "What to bring" / "What we clarify" come from the brief named in the required frontmatter field `contactBrief` (`src/lib/contact-briefs.ts`)

Blog articles link back to the best matching service automatically (`getPostService` in `src/lib/services.ts`).

## Frontmatter

| Field | Rule |
|---|---|
| `title` | 20–60 characters, main keyword first. Used for the browser and search title |
| `headline` | optional, 20–60 characters: the H1 when set, written for the reader's problem or goal instead of the keyword. Only claims the page already makes |
| `description` | 120–160 characters |
| `slug` | lowercase with hyphens, unique across EN and DE |
| `translationKey` | same for EN and DE, e.g. `service-devops` |
| `order` | 1–7, position on the home page; the short name comes from `services.items` in `src/i18n`. The first `services.featured` services are cards, the rest are rows in the "More services" card (`services.moreItems`) |
| `lead` | 80–320 characters, the problem and what I do about it |
| `situations` | 3–5 items, each a situation the reader recognises |
| `deliverables` | 3–8 items |
| `results` | 3–6 items |
| `phases` | 3–4 items with `title` (max. 40), `icon` (file name in `src/icons/`, shown in the ring of the phase timeline) and `text` (max. 260) |
| `faq` | 2–6 questions, answers up to 600 characters |
| `note`, `notePartner` | optional, max. 240 characters: note shown at the very top, e.g. who the approach was developed with. `notePartner` is a name from `partnerPage.partners` in `src/i18n` and must appear in `note`; it is linked to the partner page and LinkedIn |
| `blogTags` | 1–8 tags, matched case-insensitively against blog tags |
| `section` | optional, only `change-management`: adds the team cards and the change management article lists (see "Fixed page structure") |

## Body

- 400–1,200 words, at least 2 H2 sections, at least one phrased as a question, no H1 and no H4+.
- First paragraph answers "what is this service" in at most 110 words.
- At least one concrete, anonymised example or number from real work.
- At least 2 relative links: related blog articles (`../../blog/<slug>/`), other services (`../<slug>/`), `../../#about`.
- No closing invitation to get in touch: the contact section ("Book a call" plus form) follows directly below the text (Fabian, 2026-10-29).
