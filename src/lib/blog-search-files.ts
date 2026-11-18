// Build side of the blog full-text search (src/lib/blog-search.ts): the word index files
// per first letter and the plain text of every article, which the overview fetches
// only for the hits it shows (passage under the card). Used by src/pages/blog/suche/
// and src/pages/en/blog/search/.
import { getPosts } from './blog';
import { bodyIndex, plainText } from './blog-search';

const json = (data: unknown) => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

/** One index file per first letter; article numbers follow the order of the overview. */
export async function shardPaths(lang: 'en' | 'de') {
  const posts = await getPosts(lang);
  const shards = bodyIndex(posts.map((p) => plainText(p.body ?? '')));
  return Object.entries(shards).map(([shard, words]) => ({ params: { shard }, props: { words } }));
}
export const shardResponse = (words: Record<string, number[]>) => json(words);

/** Plain text of each article, for the passage under a hit. */
export async function textPaths(lang: 'en' | 'de') {
  const posts = await getPosts(lang);
  return posts.map((p) => ({ params: { slug: p.data.slug }, props: { text: plainText(p.body ?? '') } }));
}
export const textResponse = (text: string) => new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
