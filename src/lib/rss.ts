import { en } from '../i18n/en';
import { de } from '../i18n/de';
import { getPosts, postHref, blogIndex } from './blog';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// RSS feed per language: /blog/rss.xml (DE) and /en/blog/rss.xml (EN).
export async function feed(lang: 'en' | 'de', site: URL | undefined): Promise<Response> {
  const t = lang === 'de' ? de : en;
  const abs = (path: string) => new URL(path, site).href;
  const posts = await getPosts(lang);
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
    <title>${esc(t.blog.metaTitle)}</title>
    <link>${abs(blogIndex(lang))}</link>
    <description>${esc(t.blog.intro)}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
