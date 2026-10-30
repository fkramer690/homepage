import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { en } from '../../../i18n/en';
import { de } from '../../../i18n/de';

// Site-wide preview image, used by every page without its own: /og/<lang>/site.png
// Text is the start page hero, so image and page say the same.
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const t = lang === 'de' ? de : en;
  const png = await renderOgImage({
    title: t.hero.title,
    eyebrow: lang === 'de' ? 'Köln' : 'Cologne',
    footer: t.hero.focus,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
