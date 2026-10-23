// Central contact and company data. Fields marked TODO must be
// filled in before the site goes live (they appear in the Impressum).
export const site = {
  company: 'FK Solution Design GmbH',
  person: 'Fabian Kramer',
  email: 'fabian.kramer@fk-sd.de',
  // Optional booking page (e.g. Microsoft Bookings). Empty = CTA opens an email.
  bookingUrl: '',
  linkedin: 'https://www.linkedin.com/in/fabian-kramer-400500127',
  legal: {
    street: 'TODO Straße und Hausnummer',
    city: 'TODO PLZ Köln',
    phone: '', // optional
    managingDirector: 'Fabian Kramer',
    register: 'HRB 103579',
    registerCourt: 'Amtsgericht Köln',
    vatId: 'DE337192507',
  },
};

export const contactHref = (subject: string) =>
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
