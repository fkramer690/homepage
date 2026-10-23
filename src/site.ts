// Central contact and company data, also used in Impressum and Datenschutz.
export const site = {
  company: 'FK Solution Design GmbH',
  person: 'Fabian Kramer',
  email: 'fabian.kramer@fk-sd.de',
  // Optional booking page (e.g. Microsoft Bookings). Empty = CTA opens an email.
  bookingUrl: '',
  linkedin: 'https://www.linkedin.com/in/fabian-kramer-400500127',
  legal: {
    street: 'Hans-Keul-Weg 27',
    city: '51105 Köln',
    phone: '', // optional
    managingDirector: 'Fabian Kramer',
    register: 'HRB 103579',
    registerCourt: 'Amtsgericht Köln',
    vatId: 'DE337192507',
  },
};

export const contactHref = (subject: string) =>
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
