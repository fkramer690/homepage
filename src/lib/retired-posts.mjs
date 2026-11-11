// Blog articles merged into another article (backlog IG3, 2026-11-07). Their old URLs
// stay as redirect pages (src/components/Redirect.astro) to the article that took them in,
// and astro.config.mjs keeps them out of the sitemap. `to` is the translationKey of the target.
// The English slugs also existed under /blog/ before English moved to /en/blog/.
export const retiredPosts = [
  { lang: 'de', slug: 'aela-agentforce-pauschale-oder-credits', to: 'flex-credits-agentforce-costs' },
  { lang: 'de', slug: 'digital-wallet-agentforce-kostenkontrolle', to: 'flex-credits-agentforce-costs' },
  { lang: 'de', slug: 'serviceagent-haendleranfragen-kosten', to: 'flex-credits-agentforce-costs' },
  { lang: 'de', slug: 'mcp-zugriffe-salesforce-budgetrisiko', to: 'flex-credits-agentforce-costs' },
  { lang: 'en', slug: 'aela-agentforce-flat-fee-vs-credits', to: 'flex-credits-agentforce-costs' },
  { lang: 'en', slug: 'digital-wallet-agentforce-cost-control', to: 'flex-credits-agentforce-costs' },
  { lang: 'en', slug: 'dealer-service-agent-cost-calculation', to: 'flex-credits-agentforce-costs' },
  { lang: 'en', slug: 'mcp-api-calls-salesforce-budget-risk', to: 'flex-credits-agentforce-costs' },
];

// Paths of the redirect pages, for the sitemap filter.
export const retiredPaths = retiredPosts.flatMap(({ lang, slug }) =>
  lang === 'de' ? [`/blog/${slug}/`] : [`/en/blog/${slug}/`, `/blog/${slug}/`],
);
