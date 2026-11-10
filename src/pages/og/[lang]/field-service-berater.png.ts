import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { fieldServiceBerater } from '../../../data/field-service-berater';
import { site } from '../../../site';

// Preview image of the Field Service consultant page: /og/<lang>/field-service-berater.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as 'en' | 'de';
  const png = await renderOgImage({
    title: fieldServiceBerater[lang].title,
    eyebrow: fieldServiceBerater[lang].eyebrow,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
