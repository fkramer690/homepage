// Topics of blog articles. Each article sets one in its frontmatter (`topic`);
// the blog overview shows the matching line icon as the card image
// (src/components/TopicVisual.astro). Icons are drawn on a 64x64 grid.
export const topics = {
  devops: {
    en: 'DevOps',
    de: 'DevOps',
    icon: '<circle cx="18" cy="14" r="5"/><circle cx="18" cy="50" r="5"/><circle cx="46" cy="24" r="5"/><path d="M18 19v26M46 29c0 10-28 6-28 16"/>',
  },
  'code-review': {
    en: 'Code review',
    de: 'Code-Review',
    icon: '<circle cx="16" cy="14" r="5"/><circle cx="16" cy="50" r="5"/><circle cx="48" cy="50" r="5"/><path d="M16 19v26M48 45V26a8 8 0 0 0-8-8H28M33 12l-6 6 6 6"/>',
  },
  'open-source': {
    en: 'Open source',
    de: 'Open Source',
    icon: '<rect x="6" y="12" width="52" height="40" rx="5"/><path d="M6 21h52M16 31l7 6-7 6M28 43h12"/>',
  },
  training: {
    en: 'Training',
    de: 'Training',
    icon: '<path d="M4 24 32 12l28 12-28 12z"/><path d="M16 30v12c0 4 8 8 16 8s16-4 16-8V30M60 24v14"/>',
  },
  release: {
    en: 'Releases',
    de: 'Releases',
    icon: '<rect x="8" y="12" width="48" height="42" rx="5"/><path d="M8 24h48M20 6v12M44 6v12M22 38l7 7 13-13"/>',
  },
  ownership: {
    en: 'Tool ownership',
    de: 'Tool-Besitz',
    icon: '<circle cx="20" cy="32" r="11"/><circle cx="20" cy="32" r="3"/><path d="M31 32h27M50 32v9M42 32v6"/>',
  },
  governance: {
    en: 'Governance',
    de: 'Governance',
    icon: '<rect x="24" y="6" width="16" height="12" rx="3"/><rect x="6" y="44" width="16" height="12" rx="3"/><rect x="24" y="44" width="16" height="12" rx="3"/><rect x="42" y="44" width="16" height="12" rx="3"/><path d="M32 18v26M14 44v-8h36v8"/>',
  },
  security: {
    en: 'Security',
    de: 'Sicherheit',
    icon: '<rect x="12" y="28" width="40" height="28" rx="5"/><path d="M20 28v-8a12 12 0 0 1 24 0v8M32 38v8"/>',
  },
  ai: {
    en: 'Agentforce & AI',
    de: 'Agentforce & KI',
    icon: '<path d="M28 8c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18z"/><path d="M50 38c1 6 3 8 8 9-5 1-7 3-8 9-1-6-3-8-8-9 5-1 7-3 8-9z"/>',
  },
  data: {
    en: 'Data & context',
    de: 'Daten & Kontext',
    icon: '<ellipse cx="32" cy="14" rx="20" ry="7"/><path d="M12 14v36c0 4 9 7 20 7s20-3 20-7V14M12 26c0 4 9 7 20 7s20-3 20-7M12 38c0 4 9 7 20 7s20-3 20-7"/>',
  },
  commerce: {
    en: 'B2B Commerce',
    de: 'B2B Commerce',
    icon: '<path d="M6 10h8l6 30h30l6-20H18"/><circle cx="24" cy="50" r="4"/><circle cx="46" cy="50" r="4"/>',
  },
  revenue: {
    en: 'Revenue Cloud',
    de: 'Revenue Cloud',
    icon: '<rect x="12" y="6" width="40" height="52" rx="4"/><path d="M20 18h24M20 28h24M20 38h12M38 46h8"/>',
  },
  service: {
    en: 'Service Cloud',
    de: 'Service Cloud',
    icon: '<path d="M12 38V30a20 20 0 0 1 40 0v8"/><rect x="8" y="36" width="10" height="16" rx="3"/><rect x="46" y="36" width="10" height="16" rx="3"/><path d="M51 52c0 4-6 6-14 6"/>',
  },
  'field-service': {
    en: 'Field Service',
    de: 'Field Service',
    icon: '<path d="M44 8a12 12 0 0 1 12 12c0 9-12 20-12 20S32 29 32 20A12 12 0 0 1 44 8z"/><circle cx="44" cy="20" r="4"/><path d="M38 48H18a7 7 0 0 1 0-14h6" stroke-dasharray="4 4"/><circle cx="12" cy="52" r="4"/>',
  },
} as const;

export type Topic = keyof typeof topics;
export const topicIds = Object.keys(topics) as [Topic, ...Topic[]];
