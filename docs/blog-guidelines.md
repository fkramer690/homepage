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
| FAQ | 2–6 questions with direct answers of 1–3 sentences | schema |
| Closing | One-sentence conclusion plus an invitation to get in touch (`#contact`) | review |

Below every article the template adds the author box, related articles and the contact section with "Book a call" and the contact form ("Send a message"). Do not add another CTA block to the Markdown.

## Length

- Standard: 800–1,500 words. Short notes from 600 words, deep dives up to 2,500 (the script enforces 600–2,500).
- Length follows the topic. Cut filler instead of padding.

## Tone

- First person, clear opinions, plain language. In German address readers with "Sie".
- Concrete numbers and trade-offs instead of buzzwords. Show where Salesforce is not the right answer.
- Explain technical terms the first time they appear.
- Never identifiable: customers, partners, people. Never name the energy or utility sector (the script blocks typical terms). Do not highlight certifications.
- Only claim experience Fabian actually has. If a claim or example is unclear, ask him.

## SEO

- One primary keyword (long tail, e.g. "Salesforce DevOps enterprise") in the title, the first paragraph, one H2 and the slug.
- Slug: lowercase words with hyphens, in the article's language. Never change it after publishing.
- At least 2 internal links, written relative so they survive the domain move: `../../#services`, `../../#references`, `../../#about`, `../other-slug/`. Never hardcode the domain or start a link with `/`.
- External links only to sources that back a statement.
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
- [ ] `npm run build` passes (runs `check-blog.mjs`)
- [ ] Draft of 2–3 LinkedIn teasers (thesis, example, checklist) for Fabian
