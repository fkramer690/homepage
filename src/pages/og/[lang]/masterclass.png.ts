import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { en } from '../../../i18n/en';
import { de } from '../../../i18n/de';
import { site } from '../../../site';

// Preview image of the masterclass hub: /og/<lang>/masterclass.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const m = (params.lang === 'de' ? de : en).masterclass;
  const png = await renderOgImage({
    title: m.title,
    eyebrow: `FK Solution Design · ${m.name}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
