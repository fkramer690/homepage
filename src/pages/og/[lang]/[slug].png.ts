import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, type Post } from '../../../lib/blog';
import { renderOgImage } from '../../../lib/og';
import { getAuthor } from '../../../lib/authors';

// One preview image per article: /og/<lang>/<slug>.png
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = [...(await getPosts('en')), ...(await getPosts('de'))];
  return posts.map((post) => ({ params: { lang: post.data.lang, slug: post.data.slug }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Post };
  const png = await renderOgImage({
    title: post.data.title,
    eyebrow: 'Blog',
    footer: post.data.coAuthor
      ? `${getAuthor(post.data.lang, post.data.author).name} · ${getAuthor(post.data.lang, post.data.coAuthor).name}`
      : (({ name, jobTitle }) => `${name} · ${jobTitle}`)(getAuthor(post.data.lang, post.data.author)),
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
