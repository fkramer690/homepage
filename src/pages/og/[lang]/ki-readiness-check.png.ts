import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { kiReadinessCheck } from '../../../data/ki-readiness-check';
import { site } from '../../../site';

// Preview image of the AI readiness check offer page: /og/<lang>/ki-readiness-check.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: kiReadinessCheck[lang].title,
    eyebrow: kiReadinessCheck[lang].eyebrow,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
