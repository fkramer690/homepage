# FK Solution Design homepage

Astro site on GitHub Pages. English at `/`, German under `/de/` (maintained in parallel, not advertised). See README.md for structure and deployment.

## Blog articles

Every blog article must follow `docs/blog-guidelines.md`: best-practice structure, SEO and optimisation for AI search. Start from `docs/blog-template.md` and follow the `blog-article` skill in `.claude/skills/`. `npm run build` runs `scripts/check-blog.mjs` and fails on violations; never weaken that check or the content schema to get an article through.

Every article page ends with the contact section ("Book a call" plus the contact form). This comes from `src/components/BlogPost.astro`, so keep it there for all articles.
