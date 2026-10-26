import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { questions } from '../../../data/questions';
import { site } from '../../../site';

// Preview image of the questions page: /og/<lang>/questions.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: questions[lang].title,
    eyebrow: `FK Solution Design · ${questions[lang].eyebrow}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
