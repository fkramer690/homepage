import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '../../../lib/og';
import { en } from '../../../i18n/en';
import { de } from '../../../i18n/de';
import { site } from '../../../site';

// Preview image of the change management masterclass hub: /og/<lang>/masterclass-change-management.png
export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'de' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const m = (params.lang === 'de' ? de : en).masterclassChange;
  const png = await renderOgImage({
    title: m.title,
    eyebrow: m.name,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
