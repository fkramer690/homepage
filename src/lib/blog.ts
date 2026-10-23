import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const base = import.meta.env.BASE_URL;

// Drafts show up in `astro dev` but never in the production build.
export async function getPosts(lang: 'en' | 'de'): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => data.lang === lang && (import.meta.env.DEV || !data.draft),
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const blogIndex = (lang: 'en' | 'de') => (lang === 'de' ? `${base}de/blog/` : `${base}blog/`);

export const postHref = (post: Post) => `${blogIndex(post.data.lang)}${post.data.slug}/`;

export async function getTranslation(post: Post): Promise<Post | undefined> {
  const other = post.data.lang === 'de' ? 'en' : 'de';
  const posts = await getPosts(other);
  return posts.find((p) => p.data.translationKey === post.data.translationKey);
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (date: Date, lang: 'en' | 'de') =>
  date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// Up to three other articles in the same language, most shared tags first.
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const posts = await getPosts(post.data.lang);
  const tags = new Set(post.data.tags);
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((tag) => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

