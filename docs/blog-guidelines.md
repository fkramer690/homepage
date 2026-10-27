# Blog guidelines

Every article on the blog follows these rules. They cover structure, SEO and optimisation for AI search (Google AI Overviews, ChatGPT, Perplexity and similar). Most rules are enforced automatically: `src/content.config.ts` checks the frontmatter and `scripts/check-blog.mjs` checks the body. Both run in `npm run build`, so CI fails when an article breaks a rule.

Start every new article from [`docs/blog-template.md`](blog-template.md).

## Purpose and audience

- Readers are decision makers at manufacturing companies: IT leads, heads of service or sales, programme managers. The goal is trust, not traffic.
- One article answers one concrete question from real project work.
- Positioning: independent Salesforce architect on the client side, not tied to vendors or partners.

## Structure

| Part | Rule | Checked |
|---|---|---|
| Title | Names a concrete problem or question, 20–60 characters, main keyword near the start | schema |
| Description | 120–160 characters, states what the reader gets | schema |
| Key takeaways | 3–5 standalone sentences, each understandable without the article | schema |
| Intro | First paragraph gives the answer, at most 110 words | script |
| Body | At least 3 H2 sections, H3 if needed, no H1 and no H4+ | script |
| Questions | At least one H2 phrased as a question people would search for | script |
| Experience | At least one anonymised example from a real project | review |
| FAQ | 2–6 questions with direct answers of 1–3 sentences, shown as collapsible questions | schema |
| Closing | One-sentence conclusion plus an invitation to get in touch (`#contact`) | review |

## Fixed page structure

Every article page is built by `src/components/BlogPost.astro` and looks the same. Only the content between the takeaways and the FAQ comes from the Markdown file:

1. Title, date, reading time
2. Key takeaways (from frontmatter)
3. **Article body (the only part that comes from Markdown)**
4. FAQ, collapsible (from frontmatter)
5. Author box (`src/components/AuthorBox.astro`)
6. Series box, only for articles in a series (see below)
7. Related articles
8. Contact section with "Book a call" and the contact form

Changes to parts 1–2 and 4–8 are made once in the components and apply to all articles. Markdown files contain no raw HTML, no author section and no CTA block; the check script rejects HTML.

## Series

A topic too big for one article becomes a series (for example Salesforce Field Service). Each part answers one question, builds on the previous part and links to its neighbours in the body instead of repeating them.

- Define the series once in `src/lib/series.ts`: title in EN and DE and the planned number of parts.
- Each part sets `series: { id: <series-id>, part: <number> }` in the frontmatter, with the same value in EN and DE.
- `BlogPost.astro` then shows "Part 2 of 7" under the title and the series box with all published parts. Related articles leave out the other parts of the same series.

## Length

- Minimum 1,000 words in the article body (takeaways and FAQ not counted), standard 1,000–1,500, deep dives up to 2,500. The script enforces 1,000–2,500 for both languages.
- Length follows the topic. Cut filler instead of padding.

## Tone

- First person, clear opinions, plain language. In German address readers with "Sie".
- Concrete numbers and trade-offs instead of buzzwords. Show where Salesforce is not the right answer.
- Explain technical terms the first time they appear.
- Never identifiable: customers, partners, people. Never name the energy or utility sector (the script blocks typical terms). Do not highlight certifications.
- Only claim experience Fabian actually has. If a claim or example is unclear, ask him.

## No AI slop

Articles must read like Fabian talking to a client, not like generated content. `check-blog.mjs` blocks the typical phrases, dashes and patterns; the rest is a review step before every pull request.

- **Every paragraph earns its place.** It contains a concrete fact, number, example, trade-off or opinion. A sentence that would fit into any article on any topic gets deleted.
- **No filler phrases.** Words like delve, landscape, seamless, leverage, game changer, unlock, holistic, cutting-edge, furthermore, moreover, in conclusion, "in today's fast-paced world", and in German nahtlos, ganzheitlich, maßgeschneidert, darüber hinaus, zusammenfassend, "in der heutigen Zeit" (checked).
- **No announcement sentences.** No "Here is what you will learn", "In this article", "Hier lesen Sie", "In diesem Artikel". The intro gives the answer and stops (checked).
- **No "it is not X, it is Y".** State what something is (checked).
- **No en or em dashes.** Use a comma, a full stop or "to" (checked).
- **No reflexive lists of three.** Use as many items as there really are.
- **No hype, no superlatives without a reason.** "Best course I have taken" is fine when the article says why; "revolutionary" is not.
- **Fabian's voice.** First person, direct, a little dry, with his own phrasing where he gave it (e.g. from LinkedIn posts). Keep real quirks instead of smoothing them out.
- **Read-aloud test.** Read the article once out loud. Anything Fabian would not say to a client in a meeting gets rewritten.

## Images

- **Card image on the blog overview:** a small technical drawing per article in `src/lib/card-drawings.ts` (keyed by `translationKey`, EN/DE labels, light grid, grey lines, one cyan accent; labels state facts from the article). Required for every article: `scripts/check-blog.mjs` fails the build when an article has no drawing. The frontmatter `topic` (list in `src/lib/topics.ts`) picks a fallback icon if a drawing key ever goes missing.
- **Preview image (automatic):** every article gets its own 1200×630 image for LinkedIn and other link previews, generated at build time from the title in the site's style (`src/lib/og.ts`, served at `/og/<lang>/<slug>.png`). Nothing to do per article.
- **Explanatory graphics (optional):** add one when it explains something faster than text, e.g. a release pipeline, an architecture sketch or a decision matrix. Use the site colours (anthracite, cyan, white).
  - Store files in `src/assets/blog/` and reference them relative from the article: `![Release pipeline from sandbox to production](../../../assets/blog/devops-pipeline.png)`. Astro then optimises size and format.
  - Alt text is required and describes what the graphic shows. Text in the graphic must also appear in the article, so search engines and AI assistants can read it.
  - Provide a German version of the graphic when it contains text.
- **No stock photos** and no decorative images. They add nothing for readers or rankings.

## SEO

- One primary keyword (long tail, e.g. "Salesforce DevOps enterprise") in the title, the first paragraph, one H2 and the slug.
- Slug: lowercase words with hyphens, in the article's language, unique across EN and DE (checked). Never change it after publishing.
- At least 2 internal links, written relative so they survive the domain move: `../other-slug/`, the matching service page (`../../leistungen/<slug>/` in German, `../../services/<slug>/` in English), `../../#references`, `../../#about`. Prefer a specific service page over the generic `../../#services`. Never hardcode the domain or start a link with `/`.
- External links only to sources that back a statement. They open in a new tab automatically (`src/lib/external-links.mjs`); write them as normal Markdown links.
- Set `updatedDate` whenever an article changes in substance.
- Handled automatically by the template: `<title>` (adds the site name only within 60 characters), canonical, hreflang EN/DE, Open Graph as `article`, BlogPosting, FAQPage and BreadcrumbList structured data, sitemap, RSS feed (`/blog/rss.xml`) and `llms.txt`.

## AI search

AI assistants quote passages that answer a question on their own. So:

- Put the answer first, in the intro and in the key takeaways.
- Use question H2s and the FAQ for the questions people actually ask.
- Write definitions as complete sentences ("Salesforce DevOps means …").
- Prefer lists and short paragraphs over long blocks of text.
- Name the author and their role clearly (done by the template).

## Languages

- Every article exists in English (`src/content/blog/en/`) and German (`src/content/blog/de/`) with the same `translationKey`. The script fails if one is missing.
- Localise instead of translating word for word: German search terms (e.g. "Außendienst" next to "Field Service"), German slug, "Sie".

## Publishing checklist

Before opening the pull request:

- [ ] Started from `docs/blog-template.md`, EN and DE both present
- [ ] Title and description within limits, primary keyword included
- [ ] Answer in the first paragraph, 3–5 takeaways, 2–6 FAQ entries
- [ ] At least one question H2 and one anonymised project example
- [ ] At least 2 relative internal links, closing invitation links to `#contact`
- [ ] Nothing identifiable, no energy/utility reference, no certification focus
- [ ] At least 1,000 words in the body, EN and DE
- [ ] No AI slop: every paragraph has a concrete point, read-aloud test done
- [ ] `npm run build` passes (runs `check-blog.mjs`)
- [ ] Optional graphic has alt text and lives in `src/assets/blog/`
- [ ] Draft of 2–3 LinkedIn teasers (thesis, example, checklist) for Fabian
