// Categories of blog articles. Each article sets one to three in its frontmatter
// (`categories`, the first is the main one); the blog overview shows them as
// filter buttons, and an article appears under each of its categories. The order
// here is the order of the buttons.
export const categories = {
  devops: { en: 'DevOps & releases', de: 'DevOps & Releases' },
  architecture: { en: 'Architecture & partner governance', de: 'Architektur & Partnersteuerung' },
  'field-service': { en: 'Field Service', de: 'Field Service' },
  'manufacturing-cloud': { en: 'Manufacturing Cloud', de: 'Manufacturing Cloud' },
  'b2b-commerce': { en: 'B2B Commerce', de: 'B2B Commerce' },
  'revenue-cloud': { en: 'Revenue Cloud & CPQ', de: 'Revenue Cloud & CPQ' },
  ai: { en: 'Agentforce & AI', de: 'Agentforce & KI' },
} as const;

export type Category = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [Category, ...Category[]];
