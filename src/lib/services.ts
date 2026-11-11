import { getCollection, type CollectionEntry } from 'astro:content';
import { getPosts, type Post } from './blog';
import { localHref } from './paths';

// Tags are compared case-insensitively, the German articles mix spellings.
const norm = (tags: string[]) => new Set(tags.map((t) => t.toLowerCase()));

export type Service = CollectionEntry<'services'>;

export async function getServices(lang: 'en' | 'de'): Promise<Service[]> {
  const services = await getCollection('services', ({ data }) => data.lang === lang);
  return services.sort((a, b) => a.data.order - b.data.order);
}

export const servicesIndex = (lang: 'en' | 'de') => localHref(lang, lang === 'de' ? 'leistungen/' : 'services/');

export const serviceHref = (service: Service) => `${servicesIndex(service.data.lang)}${service.data.slug}/`;

export async function getServiceTranslation(service: Service): Promise<Service | undefined> {
  const other = service.data.lang === 'de' ? 'en' : 'de';
  return (await getServices(other)).find((s) => s.data.translationKey === service.data.translationKey);
}

// Blog articles that share the most tags with the service, newest first on ties.
// The curated reading list of a service page (frontmatter readMore, translationKeys in reading order).
// Fails the build when a key has no published article in the page's language.
export async function getServiceReading(service: Service): Promise<Post[]> {
  const keys = service.data.readMore ?? [];
  const byKey = new Map((await getPosts(service.data.lang)).map((p) => [p.data.translationKey, p]));
  return keys.map((key) => {
    const post = byKey.get(key);
    if (!post) throw new Error(`${service.id}: readMore key "${key}" has no published ${service.data.lang} article`);
    return post;
  });
}

// The service that fits a blog article best, shown at the end of the article.
export async function getPostService(post: Post): Promise<Service | undefined> {
  const tags = norm(post.data.tags);
  const best = (await getServices(post.data.lang))
    .map((s) => ({ s, score: [...norm(s.data.blogTags)].filter((tag) => tags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.s.data.order - b.s.data.order)[0];
  return best?.s;
}
