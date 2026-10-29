import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { changeArea } from '../../../data/change-management';

// Preview image of the change management area page: /og/<lang>/change-management.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: changeArea[lang].title,
    eyebrow: 'FK Solution Design · Change Management',
    footer: 'Juliane Winterscheid · Fabian Kramer',
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
