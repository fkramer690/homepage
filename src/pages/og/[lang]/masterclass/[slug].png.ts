import type { APIRoute, GetStaticPaths } from 'astro';
import { courseTexts, getChapters, type Chapter } from '../../../../lib/masterclass';
import { courseIds } from '../../../../lib/courses';
import { renderOgImage } from '../../../../lib/og';
import { site } from '../../../../site';

// One preview image per masterclass chapter: /og/<lang>/masterclass/<slug>.png
export const getStaticPaths: GetStaticPaths = async () => {
  const chapters = (await Promise.all(courseIds.flatMap((course) => [getChapters('en', course), getChapters('de', course)]))).flat();
  return chapters.map((chapter) => ({ params: { lang: chapter.data.lang, slug: chapter.data.slug }, props: { chapter } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { chapter } = props as { chapter: Chapter };
  const m = courseTexts(chapter.data.lang, chapter.data.course);
  const png = await renderOgImage({
    title: chapter.data.title,
    eyebrow: `${m.name} · ${m.chapterNo.replace('{nn}', String(chapter.data.chapter).padStart(2, '0'))}`,
    footer: `${site.person} · Salesforce Enterprise Architect`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
