// Categories of blog articles. Each article sets one to three in its frontmatter
// (`categories`, the first is the main one); the blog overview shows them as
// filter buttons, and an article appears under each of its categories. The order
// here is the order of the filter list; `icon` is a file in src/icons/.
export const categories = {
  devops: { en: 'DevOps & releases', de: 'DevOps & Releases', icon: 'pipeline' },
  architecture: { en: 'Architecture & partner governance', de: 'Architektur & Partnersteuerung', icon: 'architecture' },
  'change-management': { en: 'Change management', de: 'Change Management', icon: 'change' },
  'field-service': { en: 'Field Service', de: 'Field Service', icon: 'field-service' },
  'manufacturing-cloud': { en: 'Manufacturing Cloud', de: 'Manufacturing Cloud', icon: 'factory' },
  'b2b-commerce': { en: 'B2B Commerce', de: 'B2B Commerce', icon: 'cart' },
  'revenue-cloud': { en: 'Revenue Cloud & CPQ', de: 'Revenue Cloud & CPQ', icon: 'budget' },
  ai: { en: 'Agentforce & AI', de: 'Agentforce & KI', icon: 'ai' },
} as const;

export type Category = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [Category, ...Category[]];
