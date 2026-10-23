# FK Solution Design homepage

Astro site on GitHub Pages. English at `/`, German under `/de/` (maintained in parallel, not advertised). See README.md for structure and deployment.

## Blog articles

Every blog article must follow `docs/blog-guidelines.md`: best-practice structure, SEO and optimisation for AI search. Start from `docs/blog-template.md` and follow the `blog-article` skill in `.claude/skills/`. `npm run build` runs `scripts/check-blog.mjs` and fails on violations; never weaken that check or the content schema to get an article through.

Every article page has the same fixed structure: takeaways, article body, collapsible FAQ, author box (`src/components/AuthorBox.astro`), related articles and the contact section ("Book a call" plus the contact form). All of it comes from `src/components/BlogPost.astro`; a Markdown file only provides the body and frontmatter. Change shared parts in the components, never per article.
