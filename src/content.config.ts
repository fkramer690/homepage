import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog articles live as Markdown in src/content/blog/<lang>/<slug>.md.
// The EN and DE version of an article share the same translationKey.
// The limits below enforce the SEO rules in docs/blog-guidelines.md;
// scripts/check-blog.mjs checks the article body.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    // Shown in search results, which cut off at about 60 characters.
    title: z.string().min(20).max(60),
    description: z.string().min(120).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['en', 'de']),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    translationKey: z.string(),
    tags: z.array(z.string()).min(1).max(6),
    // Short answers at the top of the article, easy to quote for AI search.
    takeaways: z.array(z.string().max(220)).min(3).max(5),
    // Questions a reader would type into Google or an AI assistant.
    faq: z.array(z.object({ q: z.string().max(120), a: z.string().max(600) })).min(2).max(6),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
