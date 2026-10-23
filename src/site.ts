// Central contact and company data, also used in Impressum and Datenschutz.
export const site = {
  company: 'FK Solution Design GmbH',
  person: 'Fabian Kramer',
  email: 'fabian.kramer@fk-sd.de',
  // Optional booking page (e.g. Microsoft Bookings). Empty = CTA opens an email.
  bookingUrl:
    'https://bookings.cloud.microsoft/bookwithme/user/82cee52526244dfca3410f4808bd4a17@fk-sd.de?anonymous&ismsaljsauthenabled&ep=plink',
  // Contact form backend (Web3Forms). The access key is public by design;
  // it only allows sending messages to the address it was created for.
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '',
  },
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

// Booking pages open in a new tab; Microsoft does not allow embedding them.
export const contactExternal = Boolean(site.bookingUrl);

export const contactHref = (subject: string) =>
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
