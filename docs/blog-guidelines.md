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

## Articles by Juliane Winterscheid

Juliane Winterscheid, Fabian's cooperation partner for change management, writes articles on change management in general (definition, phases, models), with frontmatter `author: juliane` and `contactBrief: change-basics`. They reach a wider audience than the Salesforce articles on purpose and lead readers to the change management hub and service page. All other rules apply, with these differences:

- First person is Juliane. Only experience from her one-pager and profile (`src/data/juliane-winterscheid.ts`) or that she confirmed; no `praxis` block until she has confirmed an example.
- An article goes live (`draft: false`) only after Juliane or Fabian has approved it; Juliane reads every article, also after it is live.
- Fabian's articles on change management in Salesforce programmes (category `change-management`) carry `coAuthor: juliane`: she reviewed and approved them. The template then names both in the byline and the structured data, shows both author boxes and leaves out the partner box. Set `coAuthor` only when Juliane has reviewed the article.
- Her articles appear automatically under "Grundlagen" on the change management area page (`/change-management/`, `src/components/ChangeManagementPage.astro`); Fabian's articles of the category `change-management` appear there under "In Salesforce-Programmen". Never list articles on that page by hand.
- The template shows her name, author box (`src/components/AuthorBox.astro`), structured data and preview image footer, and leaves out the partner box. Add a new author in `src/lib/authors.ts`, never per article.

## Fixed page structure

Every article page is built by `src/components/BlogPost.astro` and looks the same. Only the content between the takeaways and the FAQ comes from the Markdown file:

1. Title, date, reading time
2. Key takeaways (from frontmatter)
3. **Article body (the only part that comes from Markdown)**
4. FAQ, collapsible (from frontmatter)
5. Author box (`src/components/AuthorBox.astro`)
6. Series box, only for articles in a series (see below)
7. Related articles
8. Contact section with "Book a call" and the contact form. Heading, text and the two lists "What to bring" / "What we clarify" come from `src/lib/contact-briefs.ts`: by default the brief of the article's main category (the first in `categories`); set `contactBrief` in the frontmatter when another brief fits the topic better (e.g. `licences` for licence and pricing articles, `partner-governance` for partner topics). Add a new brief there instead of writing a CTA in the article.

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

## Content blocks

Every article and every masterclass chapter loosens up its text with building blocks from the library in [content-blocks.md](content-blocks.md): note (`hinweis tipp|achtung|offen`), from my practice (`praxis`), key figures (`kennzahlen`), timeline (`zeitleiste`), flow diagram (`ablauf`), pro and contra (`pro-contra`), collapsible detail (`vertiefung`) and steps (`schritte`). They are fenced code blocks with the block name as language, so the article stays free of HTML. The build check enforces the counts.

- At least one block or a Markdown table per text; texts over 1,300 words need at least two different ones (a table counts as one kind).
- At most four blocks per text, at most two notes and one practice block, so the text leads and not the boxes.
- Pick the block by content, never for decoration: dates in a sequence → timeline; a decision with arguments on both sides → pro-contra; data flows between Salesforce and the ERP → flow diagram; phases with duration and owner → steps; figures the section explains → key figures; detail only specialists need → collapsible detail; a fact readers must not miss, an open point to confirm in writing → note.
- `praxis` only with experience Fabian has confirmed (list in content-blocks.md); assumption scenarios stay in the running text, marked "as an assumption".
- Key figures and timelines only with values that are sourced in the text.
- A block repeats nothing the paragraph around it says word for word; it condenses or adds structure. Same blocks in EN and DE.
- Flow diagrams: run `node scripts/render-diagrams.mjs` after adding or changing one; it fails if a label does not fit its box.

## Images

- **Card image on the blog overview:** a small technical drawing per article in `src/lib/card-drawings.ts` (keyed by `translationKey`, EN/DE labels, light grid, grey lines, one cyan accent; labels state facts from the article). Required for every article: `scripts/check-blog.mjs` fails the build when an article has no drawing. Every label must sit inside the drawing and inside its box: `scripts/check-graphics.mjs` runs after `astro build` and fails when a label runs over the edge (4 px margin of the 320×160 canvas), sticks out of the box it starts in (3 px padding), runs into another box or is crossed by a line, arrow or icon (3 px gap), or touches another label. Labels use IBM Plex Mono, so a label is 0.6 × font size wide per character: at size 7 that is 4.2 px per character. Shorten the label first, then make the box wider; go below size 6 only as a last resort. The frontmatter `topic` (list in `src/lib/topics.ts`) picks a fallback icon if a drawing key ever goes missing.
- **Categories on the blog overview:** every article sets one to three `categories` (list in `src/lib/categories.ts`: DevOps & releases, architecture & partner governance, change management, Field Service, Manufacturing Cloud, B2B Commerce, Revenue Cloud & CPQ, Agentforce & AI), e.g. `categories: [devops, ai]`. The first is the main category and decides the contact section; add more only when a reader filtering for that category should clearly find the article (an AI article about pipelines belongs to DevOps and AI). EN and DE versions use the same categories in the same order; the build check fails otherwise. The overview shows them as filter buttons and lists an article under each of its categories; the schema rejects an article without one. Add a new category only when at least three articles would fall into it.
- **Preview image (automatic):** every article gets its own 1200×630 image for LinkedIn and other link previews, generated at build time from the title in the site's style (`src/lib/og.ts`, served at `/og/<lang>/<slug>.png`). Nothing to do per article; the build fails if the title needs more than three lines or the eyebrow would run into the frame.
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
- Set `updatedDate` whenever an article changes in substance, and also after checking its prices, Flex Credits, deadlines and release dates against the sources, even if nothing changed. `scripts/stale-articles.mjs` lists articles whose prices are older than six months or whose deadlines have passed since `updatedDate`; a monthly workflow keeps the issue "Artikel prüfen: Preise, Fristen und tote Links" up to date, including external links that answer 404.
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
- [ ] At least one content block or table (two kinds over 1,300 words), chosen by content (see Content blocks)
- [ ] Optional graphic has alt text and lives in `src/assets/blog/`
- [ ] Draft of 2–3 LinkedIn teasers (thesis, example, checklist) for Fabian
