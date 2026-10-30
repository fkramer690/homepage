import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { juliane } from '../../../data/juliane-winterscheid';
import { site } from '../../../site';

// Preview image of Juliane Winterscheid's profile page: /og/<lang>/juliane-winterscheid.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: juliane[lang].title,
    eyebrow: juliane[lang].eyebrow,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
