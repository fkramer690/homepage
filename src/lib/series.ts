// Article series. An article joins one with `series: { id, part }` in its
// frontmatter; BlogPost.astro then shows "Part 2 of 7" under the title and a
// box with all parts of the series. `parts` is the planned number of parts,
// so the box can say how many parts are still in preparation.
export const series = {
  'field-service': {
    en: 'Salesforce Field Service for manufacturers',
    de: 'Salesforce Field Service für Hersteller',
    parts: 7,
  },
  'manufacturing-cloud': {
    en: 'Salesforce Manufacturing Cloud for manufacturers',
    de: 'Salesforce Manufacturing Cloud für Hersteller',
    parts: 8,
  },
} as const;

export type SeriesId = keyof typeof series;
export const seriesIds = Object.keys(series) as [SeriesId, ...SeriesId[]];
