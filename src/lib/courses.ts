// The masterclasses on the site. Kept free of astro:content imports so that
// src/content.config.ts can use the ids (rules: docs/masterclass.md).
// `segment` is the URL part below /masterclass/ (DE) and /en/masterclass/ (EN);
// `texts` is the key of the masterclass texts in src/i18n/{de,en}.ts.
export const courseIds = ['ai', 'devops'] as const;
export type CourseId = (typeof courseIds)[number];

export const courses: Record<CourseId, { segment: { de: string; en: string }; texts: 'masterclass' | 'masterclassDevops'; og: string }> = {
  ai: { segment: { de: 'ki-salesforce', en: 'ai-salesforce' }, texts: 'masterclass', og: 'masterclass' },
  devops: { segment: { de: 'devops-release-management', en: 'devops-release-management' }, texts: 'masterclassDevops', og: 'masterclass-devops' },
};
