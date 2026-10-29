import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { freelanceArchitect } from '../../../data/freelance-architect';
import { site } from '../../../site';

// Preview image of the freelance architect page: /og/<lang>/freelance-architect.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: freelanceArchitect[lang].title,
    eyebrow: `FK Solution Design · ${freelanceArchitect[lang].eyebrow}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
