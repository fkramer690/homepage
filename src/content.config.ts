import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { topicIds } from './lib/topics';
import { seriesIds } from './lib/series';
import { categoryIds } from './lib/categories';

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
    // Picks the small topic image on the blog overview (src/lib/topics.ts).
    topic: z.enum(topicIds),
    // Filter category on the blog overview (src/lib/categories.ts).
    category: z.enum(categoryIds),
    tags: z.array(z.string()).min(1).max(6),
    // Optional: the article is part `part` of a series defined in src/lib/series.ts.
    series: z.object({ id: z.enum(seriesIds), part: z.number().int().min(1) }).optional(),
    // Short answers at the top of the article, easy to quote for AI search.
    takeaways: z.array(z.string().max(220)).min(3).max(5),
    // Questions a reader would type into Google or an AI assistant.
    faq: z.array(z.object({ q: z.string().max(120), a: z.string().max(600) })).min(2).max(6),
    draft: z.boolean().default(false),
  }),
});

// Service pages live in src/content/services/<lang>/<slug>.md, one per card in the
// services section of the home page (order = card position). The structured parts
// below are rendered by src/components/ServicePage.astro; the Markdown body holds
// the background and the example from practice (rules: docs/service-pages.md).
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string().min(20).max(60),
    description: z.string().min(120).max(160),
    lang: z.enum(['en', 'de']),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    translationKey: z.string(),
    order: z.number().int().min(1).max(7),
    // One or two sentences under the H1: the problem and what this service does about it.
    lead: z.string().min(80).max(320),
    situations: z.array(z.string().max(220)).min(3).max(5),
    deliverables: z.array(z.string().max(220)).min(3).max(8),
    results: z.array(z.string().max(220)).min(3).max(6),
    phases: z.array(z.object({ title: z.string().max(40), text: z.string().max(260) })).min(3).max(4),
    faq: z.array(z.object({ q: z.string().max(120), a: z.string().max(600) })).min(2).max(6),
    // Blog tags whose articles are listed as further reading on this page.
    blogTags: z.array(z.string()).min(1).max(8),
  }),
});

export const collections = { blog, services };
