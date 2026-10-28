// The masterclasses on the site. Kept free of astro:content imports so that
// src/content.config.ts can use the ids (rules: docs/masterclass.md).
// `segment` is the URL part below /masterclass/ (DE) and /en/masterclass/ (EN);
// `texts` is the key of the masterclass texts in src/i18n/{de,en}.ts.
// The order here is the order on the overview page /masterclass/.
export const courseIds = ['ai', 'devops', 'manufacturing-cloud', 'revenue-cloud', 'b2b-commerce', 'field-service'] as const;
export type CourseId = (typeof courseIds)[number];

export type CourseTextsKey =
  | 'masterclass'
  | 'masterclassDevops'
  | 'masterclassManufacturing'
  | 'masterclassRevenue'
  | 'masterclassCommerce'
  | 'masterclassFieldService';

// `chapters` is the planned number of chapters, shown as "Chapter 3 of 10".
export const courses: Record<CourseId, { segment: { de: string; en: string }; texts: CourseTextsKey; og: string; chapters: number }> = {
  ai: { segment: { de: 'ki-salesforce', en: 'ai-salesforce' }, texts: 'masterclass', og: 'masterclass', chapters: 10 },
  devops: { segment: { de: 'devops-release-management', en: 'devops-release-management' }, texts: 'masterclassDevops', og: 'masterclass-devops', chapters: 10 },
  'manufacturing-cloud': { segment: { de: 'manufacturing-cloud', en: 'manufacturing-cloud' }, texts: 'masterclassManufacturing', og: 'masterclass-manufacturing-cloud', chapters: 5 },
  'revenue-cloud': { segment: { de: 'revenue-cloud', en: 'revenue-cloud' }, texts: 'masterclassRevenue', og: 'masterclass-revenue-cloud', chapters: 5 },
  'b2b-commerce': { segment: { de: 'b2b-commerce', en: 'b2b-commerce' }, texts: 'masterclassCommerce', og: 'masterclass-b2b-commerce', chapters: 5 },
  'field-service': { segment: { de: 'field-service', en: 'field-service' }, texts: 'masterclassFieldService', og: 'masterclass-field-service', chapters: 5 },
};
