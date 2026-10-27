import { getCollection, type CollectionEntry } from 'astro:content';
import { localHref } from './paths';
import { series } from './series';

export type Post = CollectionEntry<'blog'>;

// Drafts show up in `astro dev` but never in the production build.
export async function getPosts(lang: 'en' | 'de'): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => data.lang === lang && (import.meta.env.DEV || !data.draft),
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const blogIndex = (lang: 'en' | 'de') => localHref(lang, 'blog/');

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
// Articles of the same series are left out; the series box already lists them.
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const posts = await getPosts(post.data.lang);
  const tags = new Set(post.data.tags);
  const seriesId = post.data.series?.id;
  return posts
    .filter((p) => p.id !== post.id && (!seriesId || p.data.series?.id !== seriesId))
    .map((p) => ({ p, score: p.data.tags.filter((tag) => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}


export interface SeriesPart {
  part: number;
  post?: Post;
}

// All planned parts of the post's series in order, with the published article where there is one.
export async function getSeriesParts(post: Post): Promise<SeriesPart[]> {
  const ref = post.data.series;
  if (!ref) return [];
  const posts = (await getPosts(post.data.lang)).filter((p) => p.data.series?.id === ref.id);
  return Array.from({ length: series[ref.id].parts }, (_, i) => ({
    part: i + 1,
    post: posts.find((p) => p.data.series?.part === i + 1),
  }));
}
