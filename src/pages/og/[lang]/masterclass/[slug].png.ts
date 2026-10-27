import type { APIRoute, GetStaticPaths } from 'astro';
import { getChapters, type Chapter } from '../../../../lib/masterclass';
import { renderOgImage } from '../../../../lib/og';
import { en } from '../../../../i18n/en';
import { de } from '../../../../i18n/de';
import { site } from '../../../../site';

// One preview image per masterclass chapter: /og/<lang>/masterclass/<slug>.png
export const getStaticPaths: GetStaticPaths = async () => {
  const chapters = [...(await getChapters('en')), ...(await getChapters('de'))];
  return chapters.map((chapter) => ({ params: { lang: chapter.data.lang, slug: chapter.data.slug }, props: { chapter } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { chapter } = props as { chapter: Chapter };
  const m = (chapter.data.lang === 'de' ? de : en).masterclass;
  const png = await renderOgImage({
    title: chapter.data.title,
    eyebrow: `${m.name} · ${m.chapterNo.replace('{nn}', String(chapter.data.chapter).padStart(2, '0'))}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
