import type { APIRoute } from 'astro';
import { en } from '../../i18n/en';
import { getPosts, postHref } from '../../lib/blog';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const posts = await getPosts('en');
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${abs(postHref(p))}</link>
      <guid>${abs(postHref(p))}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(en.blog.metaTitle)}</title>
    <link>${abs(`${import.meta.env.BASE_URL}blog/`)}</link>
    <description>${esc(en.blog.intro)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
