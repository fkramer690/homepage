// The full card image of the blog overview as an SVG string: the article's technical
// drawing (src/lib/card-drawings.ts) on a light grid, or its topic icon if it has none
// yet. Used inline by src/components/CardDrawing.astro for the first page of cards and
// by the drawings file (src/pages/blog/zeichnungen.json.ts, EN drawings.json.ts) that
// the overview fetches for every further card.
import { cardDrawing, hasDrawing } from './card-drawings';
import { topics, type Topic } from './topics';
import type { Post } from './blog';

const grid =
  Array.from({ length: 19 }, (_, i) => `M${16 * (i + 1)} 0V160`).join('') +
  Array.from({ length: 9 }, (_, i) => `M0 ${16 * (i + 1)}H320`).join('');

export function cardSvg(translationKey: string, topic: Topic, lang: 'en' | 'de'): string {
  const inner = hasDrawing(translationKey)
    ? cardDrawing(translationKey, lang)
    : `<g transform="translate(124 44) scale(1.125)" fill="none" stroke="#5a5a5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${topics[topic].icon}</g>`;
  return `<svg class="card-drawing" viewBox="0 0 320 160" aria-hidden="true"><rect width="320" height="160" fill="#f5f6f7"/><path d="${grid}" stroke="#e3e5e7" stroke-width="1"/>${inner}</svg>`;
}

// Cards on the first page (24 plus the wide first card) carry their drawing in the
// HTML; keep in sync with PAGE in the script of src/components/BlogIndex.astro.
export const FIRST_PAGE = 24;

// Drawings of every card after the first page, keyed by translationKey.
export const deferredDrawings = (posts: Post[], lang: 'en' | 'de') =>
  Object.fromEntries(posts.slice(FIRST_PAGE + 1).map((p) => [p.data.translationKey, cardSvg(p.data.translationKey, p.data.topic, lang)]));
