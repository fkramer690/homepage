import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { maschinenbau } from '../../../data/maschinenbau';
import { site } from '../../../site';

// Preview image of the industry page for machinery manufacturers: /og/<lang>/maschinenbau.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: maschinenbau[lang].title,
    eyebrow: maschinenbau[lang].eyebrow,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
