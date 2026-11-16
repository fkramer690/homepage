// Search results cut a title by width, not by characters: Google shows about
// 580 px of 20px Arial. These widths per character are the same estimate the
// SEO check uses; unknown characters count as an average letter.
const W = {
  ...Object.fromEntries([...'abcdeghknopqsuvxyz'].map((c) => [c, 0.55])),
  ...Object.fromEntries([...'fijlrt'].map((c) => [c, 0.28])),
  m: 0.83, w: 0.75, ' ': 0.28,
  ...Object.fromEntries([...'ABCDEFGHKNOPQRSUVXYZ'].map((c) => [c, 0.66])),
  M: 0.83, W: 0.94, I: 0.28, J: 0.5, L: 0.55, T: 0.61,
};

export const MAX_TITLE_CHARS = 60;
export const MAX_TITLE_PX = 580;
export const BRAND_SUFFIX = ' | FK Solution Design';

/** Estimated width of a title in a Google result, in px. */
export const titleWidth = (s) => Math.round([...s].reduce((sum, c) => sum + (W[c] ?? 0.56), 0) * 20);

/** The title with the brand suffix, but only where it still fits in full. */
export const withBrand = (title) => {
  const full = title + BRAND_SUFFIX;
  return full.length <= MAX_TITLE_CHARS && titleWidth(full) <= MAX_TITLE_PX ? full : title;
};
