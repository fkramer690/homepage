// Categories of blog articles. Each article sets exactly one in its frontmatter
// (`category`); the blog overview shows them as filter buttons. The order here
// is the order of the buttons.
export const categories = {
  devops: { en: 'DevOps & releases', de: 'DevOps & Releases' },
  architecture: { en: 'Architecture & partner governance', de: 'Architektur & Partnersteuerung' },
  'field-service': { en: 'Field Service', de: 'Field Service' },
  'manufacturing-cloud': { en: 'Manufacturing Cloud', de: 'Manufacturing Cloud' },
  ai: { en: 'Agentforce & AI', de: 'Agentforce & KI' },
} as const;

export type Category = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [Category, ...Category[]];
