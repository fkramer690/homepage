// Guest articles Fabian published on other sites. Each one is shown as a card on the
// pages it belongs to (src/components/GuestArticle.astro): service pages and blog
// articles list it when their translationKey is in `pages`. The article itself stays
// on the other site; we only link to it (no duplicate publishing).

type Text = { en: string; de: string };

export interface GuestArticle {
  url: string;
  // Name of the site that published it.
  site: string;
  // Title as published (articles elsewhere are written in English).
  title: string;
  // Language of the article itself, shown on German pages when it differs.
  lang: 'en' | 'de';
  // ISO date of publication.
  date: string;
  // One sentence on what the reader gets, in the page's language.
  teaser: Text;
  // translationKeys of the service pages and blog articles that show the card.
  pages: string[];
}

export const guestArticles: GuestArticle[] = [
  {
    url: 'https://salesforcedictionary.com/blogs/govern-multiple-salesforce-implementation-partners-one-org',
    site: 'Salesforce Dictionary',
    title: 'How to govern multiple Salesforce implementation partners on one org',
    lang: 'en',
    date: '2026-11-14',
    teaser: {
      en: 'The whole approach in one article: changes only through pull requests, one owner per object, standards built from reviews, and governance that stays with the client after the handover.',
      de: 'Der ganze Ansatz in einem Artikel: Änderungen nur per Pull Request, ein Verantwortlicher pro Objekt, Standards aus den Reviews und eine Governance, die nach der Übergabe beim Kunden bleibt.',
    },
    pages: ['service-partner-governance', 'object-ownership-matrix'],
  },
];

export const guestArticlesFor = (key: string) => guestArticles.filter((a) => a.pages.includes(key));
