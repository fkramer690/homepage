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
  // Business phone: German pages show the national format, English pages the
  // international one; links always dial the international number.
  phone: {
    de: '0221 98656758',
    en: '+49 221 98656758',
    href: 'tel:+4922198656758',
  },
  linkedin: 'https://www.linkedin.com/in/fabian-kramer-400500127',
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
