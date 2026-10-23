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
6. Set `draft: false` when the article is ready, then run `npm run build`. Fix every message from `check-blog.mjs` or the content schema.
7. Look at the built article page once (takeaways box at the top, collapsible FAQ, author box, contact section with "Book a call" and the contact form at the bottom) and the generated preview image in `dist/og/<lang>/<slug>.png`.
   Suggest an explanatory graphic when the topic benefits from one (see Images in the guidelines).
8. Open the pull request and add 2–3 LinkedIn teaser drafts for Fabian to the PR or the thread.

Do not change the template components (`src/components/BlogPost.astro`, `BlogIndex.astro`) for a single article. Layout changes apply to all articles.
