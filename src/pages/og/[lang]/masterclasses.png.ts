import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { en } from '../../../i18n/en';
import { de } from '../../../i18n/de';
import { site } from '../../../site';

// Preview image of the masterclass overview: /og/<lang>/masterclasses.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const o = (params.lang === 'de' ? de : en).masterclasses;
  const png = await renderOgImage({
    title: o.title,
    eyebrow: `FK Solution Design · ${o.name}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
