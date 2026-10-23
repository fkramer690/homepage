import type { APIRoute, GetStaticPaths } from 'astro';
import { getServices, type Service } from '../../../../lib/services';
import { renderOgImage } from '../../../../lib/og';
import { site } from '../../../../site';

// One preview image per service page: /og/<lang>/services/<slug>.png
export const getStaticPaths: GetStaticPaths = async () => {
  const services = [...(await getServices('en')), ...(await getServices('de'))];
  return services.map((service) => ({ params: { lang: service.data.lang, slug: service.data.slug }, props: { service } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { service } = props as { service: Service };
  const png = await renderOgImage({
    title: service.data.title,
    eyebrow: service.data.lang === 'de' ? 'FK Solution Design · Leistungen' : 'FK Solution Design · Services',
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
