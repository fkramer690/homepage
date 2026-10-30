---
name: blog-article
description: Write or update a blog article for the FK Solution Design homepage (EN and DE). Use whenever a blog post, article or Fachbeitrag is created or changed.
---

# Writing a blog article

1. Read `docs/blog-guidelines.md` completely. Its rules are binding.
2. Copy `docs/blog-template.md` to `src/content/blog/en/<slug>.md` and write the English version.
3. Write the German version in `src/content/blog/de/<german-slug>.md` with the same `translationKey`. Localise, use "Sie".
4. Only use experience and examples Fabian has confirmed (briefing, project memory, his messages). Ask him when an example is missing instead of inventing one.
5. Do a slop review of both versions (see "No AI slop" in the guidelines): delete every sentence that would fit any article, replace generic claims with Fabian's concrete facts, read it out loud once.
6. Add content blocks from `docs/content-blocks.md` where they explain better than text: at least one block or table, two different kinds over 1,300 words, at most four blocks, the same in EN and DE. `praxis` only with confirmed experience. After adding or changing an `ablauf` diagram run `node scripts/render-diagrams.mjs` and commit the SVG.
7. Draw the card image for the blog overview: add an entry for the article's `translationKey` to `src/lib/card-drawings.ts` (light technical drawing, EN/DE labels with facts from the article, see "Card image" in the guidelines). Every article gets one; the build fails without it, and `scripts/check-graphics.mjs` fails when a label runs over the edge or out of its box (size 7 = 4.2 px per character), so count before you place a label. To view it, `npm run cards:export -- <translationKey>` writes the SVG to `previews/card-drawings/` (git-ignored); never save previews in the repository root.
8. Set `draft: false` when the article is ready, then run `npm run build`. Fix every message from `check-blog.mjs` or the content schema.
9. Look at the built article page once, and the card on `/blog/` with its drawing (takeaways box at the top, collapsible FAQ, author box, contact section with "Book a call" and the contact form at the bottom) and the generated preview image in `dist/og/<lang>/<slug>.png`.
   Check that every content block renders and that diagram labels are fully readable. Suggest an explanatory graphic when the topic benefits from one (see Images in the guidelines).
10. Open the pull request and add 2–3 LinkedIn teaser drafts for Fabian to the PR or the thread.

Do not change the template components (`src/components/BlogPost.astro`, `BlogIndex.astro`) for a single article. Layout changes apply to all articles.
