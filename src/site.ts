// Central contact and company data, also used in Impressum and Datenschutz.
export const site = {
  company: 'FK Solution Design GmbH',
  person: 'Fabian Kramer',
  email: 'fabian.kramer@fk-sd.de',
  // Optional booking page (e.g. Microsoft Bookings). Empty = CTA opens an email.
  bookingUrl:
    'https://bookings.cloud.microsoft/bookwithme/user/82cee52526244dfca3410f4808bd4a17@fk-sd.de?anonymous&ismsaljsauthenabled&ep=plink',
  // Contact form backend (Web3Forms). The access key comes from the
  // WEB3FORMS_ACCESS_KEY repository secret at build time (see deploy.yml).
  // It still ends up in the page source; this only keeps it out of the repo.
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  },
  // Cloudflare Web Analytics (cookieless). The site token comes from the
  // CF_ANALYTICS_TOKEN repository secret at build time; empty = no tracking.
  analyticsToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? '',
  // Event counter (workers/events, deployed by events-worker.yml): counts
  // "Book a call" clicks and sent contact forms, nothing else. Empty = off.
  // Its host must also be in connect-src of scripts/csp-policy.mjs.
  eventsUrl: 'EVENTS_URL_TBD',
  // Business phone: German pages show the national format, English pages the
  // international one; links always dial the international number.
  phone: {
    de: '0221 98656758',
    en: '+49 221 98656758',
    href: 'tel:+4922198656758',
  },
  linkedin: 'https://www.linkedin.com/in/fabian-kramer-400500127',
  // Speaker profile, linked on the speaking page and listed as sameAs.
  sessionize: 'https://sessionize.com/fabian-kramer/',
  // Further profiles of Fabian, only listed as sameAs in the structured data.
  profiles: [
    'https://github.com/fkramer690',
    'https://www.gulp.de/gulp2/g/experten/selbststaendige/profile/6ae5021d8751e904955971b5/homepage',
    'https://www.freelance.de/freelancer/261653-Independent-Salesforce-Enterprise-Architect-for-Manufacturers',
    'https://www.freelancermap.de/profil/fabian-kramer',
    'https://www.xing.com/profile/Fabian_Kramer13',
    'https://app.fratch.io/de/profile/fabian-kramer-j',
    'https://www.salesforce.com/trailblazer/fkramer',
    'https://www.malt.com/profile/fabiankramer1',
    'https://salesforcebreak.com/author/fabiankramerbaaa9dc933/',
    'https://sessionize.com/fabian-kramer/',
    'https://salesforcedictionary.com/u/fabian_kramer',
  ],
  // Profiles of the company, only listed as sameAs in the structured data.
  companyProfiles: [
    // Google Business Profile (knowledge graph id).
    'https://www.google.com/search?kgmid=/g/11z_04sr6b',
    // LinkedIn company page.
    'https://www.linkedin.com/company/fk-solution-design-gmbh',
    // Register and directory entries with the same name, address and HRB number.
    // They let Bing and Google tie the register data to this site. Only sources
    // with their own data or a real listing; pure copy sites are left out.
    'https://www.northdata.de/FK%20Solution%20Design%20GmbH,%20K%C3%B6ln/HRB%20103579',
    'https://www.online-handelsregister.de/handelsregisterauszug/nw/Koeln/HRB/103579/FK-Solution-Design-GmbH',
    'https://www.11880.com/branchenbuch/koeln/150991138B112504437/fk-solution-design-gmbh.html',
    'https://branchenbuch.meinestadt.de/koeln/company/15503572',
  ],
  legal: {
    street: 'Hans-Keul-Weg 27',
    city: '51105 Köln',
    phone: '0221 98656758',
    managingDirector: 'Fabian Kramer',
    register: 'HRB 103579',
    registerCourt: 'Amtsgericht Köln',
    vatId: 'DE337192507',
  },
};

// Booking pages open in a new tab; Microsoft does not allow embedding them.
export const contactExternal = Boolean(site.bookingUrl);

export const contactHref = (subject: string) =>
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
