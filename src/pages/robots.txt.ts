import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, site);
  // Content-Signal (contentsignals.org): search, AI answers and AI training are all allowed (Fabian, 2026-11-11).
  return new Response(`User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\n# Offer PDF is shared by link only, not for search results (Fabian, 2026-11-15).\nDisallow: /downloads/angebot-ai-native-delivery.pdf\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
