// "Working with recruiters": content of /partner/recruiter/ (DE) and /en/partners/recruiters/ (EN),
// plus the teaser on the partner page. Icons are names from src/components/RecruiterIcon.astro.

export type RecruiterIconName =
  | 'clock' | 'scale' | 'profile' | 'calendar' | 'handshake'
  | 'building' | 'compass' | 'sliders' | 'budget' | 'feedback'
  | 'mail' | 'check' | 'interview' | 'contract';

interface Point {
  icon: RecruiterIconName;
  t: string;
  d: string;
}

export const recruiterPaths = { de: 'partner/recruiter/', en: 'partners/recruiters/' } as const;

export const recruiters = {
  de: {
    title: 'Freiberuflicher Salesforce Architect: Zusammenarbeit mit Recruitern',
    metaTitle: 'Freiberuflicher Salesforce Architect für Recruiter',
    description:
      'Wie Fabian Kramer als freiberuflicher Salesforce Architect mit Recruitern arbeitet: Profil, Antwortzeit, Einreichung nur mit Freigabe, keine Doppeleinreichungen.',
    eyebrow: 'Partner · Recruiter',
    back: 'Alle Partner',
    lead: 'Viele meiner Projekte kommen über Personaldienstleister zustande, die besten über Recruiter, mit denen ich schon einmal gearbeitet habe. Hier steht, was Sie von mir bekommen, was ich von Ihnen brauche und wo meine Grenzen sind. Dann sparen wir uns die Telefonate, die zu nichts führen.',
    ctaPrimary: 'Anfrage schicken',
    ctaSecondary: 'Wie ich arbeite',
    promises: ['Antwort in 1 Werktag', '1 Recruiter pro Anfrage', 'Einreichung nur mit Freigabe'],
    portraitAlt: 'Porträt von Fabian Kramer',
    facts: [
      { value: '8', label: 'Jahre Salesforce' },
      { value: '20+', label: 'Enterprise-Projekte' },
      { value: '25 · 8', label: 'Zertifikate · davon Architect' },
      { value: 'DE · EN', label: 'Projektsprachen' },
    ],
    fit: {
      label: 'Profil',
      title: 'Wofür Sie mich anfragen sollten',
      intro: 'Ein klares Nein spart Ihnen mehr Zeit als ein vages Vielleicht. Deshalb steht hier beides.',
      yesTitle: 'Passt',
      yes: [
        'Enterprise-, Solution- oder Lead-Architect-Rollen',
        'Programme mit mehreren Implementierungspartnern',
        'Architekt auf Kundenseite zwischen Fachbereich und IT',
        'Fertigung, Service, After-Sales und B2B-Vertrieb',
        'Partnersteuerung, DevOps und Integration mit SAP',
      ],
      noTitle: 'Passt nicht',
      no: [
        'Reine Admin-Rollen',
        'Entwicklerrollen ohne Architekturentscheidung',
        'Architekt nur auf dem Papier, wenn der Partner längst entschieden hat',
      ],
      noNote: 'Kenne ich jemanden, der besser passt, sage ich es Ihnen.',
      tagsLabel: 'Clouds und Werkzeuge',
      tags: ['Sales Cloud', 'Service Cloud', 'Field Service', 'Experience Cloud', 'Manufacturing Cloud', 'CPQ', 'B2B Commerce', 'DevOps', 'sfdx-hardis', 'SAP-Integration'],
    },
    deal: {
      label: 'Der Deal',
      title: 'Was Sie bekommen, was ich brauche',
      intro: 'Gute Zusammenarbeit mit Recruitern hängt an denselben Dingen wie mit jedem anderen Partner: klare Absprachen und Verlässlichkeit, auf beiden Seiten.',
      fairTitle: 'Win-win und volle Transparenz',
      fair: 'Das Ziel ist eine Win-win-Situation mit voller Transparenz. Dazu gehört, dass die Vermittlungspauschale im Verhältnis zu meinem Tagessatz steht. Aufschläge von mehr als 30 Prozent sind branchenunüblich. Stelle ich fest, dass es trotzdem so ist, verlange ich bei einer Verlängerung oder einer weiteren Zusammenarbeit eine Open-Book-Policy.',
      giveTitle: 'Sie bekommen von mir',
      give: [
        { icon: 'clock', t: 'Antwort innerhalb eines Werktags', d: 'Auch wenn sie Nein lautet. Ihr Kunde wartet nicht auf mich.' },
        { icon: 'scale', t: 'Ehrliche Einschätzung vorab', d: 'Welche Anforderungen ich erfülle und welche nicht. Sie reichen mit Argumenten ein, nicht mit Hoffnung.' },
        { icon: 'profile', t: 'Exklusiv über Sie', d: 'Eingereicht wird nur mit meiner schriftlichen Freigabe, pro Anfrage über genau einen Recruiter. Kommt dieselbe Stelle danach über andere, sage ich ab.' },
        { icon: 'calendar', t: 'Verfügbarkeit, die stimmt', d: 'Start und Auslastung, wie ich sie halten kann. Ändert sich etwas, erfahren Sie es zuerst.' },
        { icon: 'handshake', t: 'Loyalität im Projekt', d: 'Verlängerungen laufen über Sie. Kein Direktvertrag hinter Ihrem Rücken.' },
      ] as Point[],
      needTitle: 'Ich brauche von Ihnen',
      need: [
        { icon: 'building', t: 'Den Endkunden', d: 'Sonst kann ich Doppeleinreichungen nicht ausschließen. Den Namen behandle ich vertraulich.' },
        { icon: 'compass', t: 'Rolle, Phase, Entscheidungsrahmen', d: 'Neueinführung, Rettung oder Betrieb? Wie viele Partner liefern, wer entscheidet?' },
        { icon: 'sliders', t: 'Laufzeit, Auslastung, Start, Vor-Ort-Anteil', d: 'Daran scheitern die meisten Anfragen. Deshalb gehört es in die erste Nachricht.' },
        { icon: 'budget', t: 'Den Budgetrahmen', d: 'Gleich zu Beginn. Nur so gehen wir wertschätzend mit unserer Zeit um und stellen sicher, dass eine Zusammenarbeit überhaupt eine Option ist.' },
        { icon: 'feedback', t: 'Rückmeldung nach der Einreichung', d: 'Auch bei einer Absage ist eine kurze, zeitnahe Rückmeldung essenziell.' },
      ] as Point[],
    },
    process: {
      label: 'Ablauf',
      title: 'So läuft eine Anfrage',
      steps: [
        { icon: 'mail', t: 'Anfrage', d: 'Per Mail oder Formular, mit Endkunde, Rolle, Laufzeit, Auslastung, Start und Budget.' },
        { icon: 'clock', t: 'Antwort', d: 'Innerhalb eines Werktags: passt oder passt nicht, dazu Satz und Verfügbarkeit.' },
        { icon: 'check', t: 'Freigabe', d: 'Schriftlich für genau diese Anfrage, mit zugeschnittenem Profil.' },
        { icon: 'interview', t: 'Kundengespräch', d: 'Ich bereite mich auf das Projekt vor, nicht nur auf meinen Lebenslauf.' },
        { icon: 'contract', t: 'Vertrag und Start', d: 'Sie bleiben Ansprechpartner für alles Vertragliche, auch bei der Verlängerung.' },
      ] as Point[],
      termsLabel: 'Konditionen',
      terms: [
        { t: 'Satz pro Anfrage', d: 'Stunden- oder Tagessatz je nach Rolle, Laufzeit und Vor-Ort-Anteil. Eine Preisliste für alle Fälle gibt es nicht.' },
        { t: 'Vertrag mit der GmbH', d: 'Vertragspartner ist die FK Solution Design GmbH. Abrechnung monatlich nach Aufwand mit Tätigkeitsnachweis.' },
      ],
    },
    ctaTitle: 'Eine Anfrage, die passt?',
    ctaText: 'Schicken Sie mir die Rahmendaten. Sie bekommen innerhalb eines Werktags eine Antwort, auch wenn sie Nein lautet.',
    formSubject: 'Recruiter-Anfrage',
    teaser: {
      label: 'Für Recruiter',
      title: 'Recruiter und Personaldienstleister',
      text: 'Viele meiner Projekte kommen über Recruiter zustande. Gute Zusammenarbeit hängt dabei an denselben Dingen wie bei jedem anderen Partner: klare Absprachen und Verlässlichkeit. Sie bekommen schnelle Antworten, ein ehrliches Profil und keine Doppeleinreichungen. Ich bekomme Anfragen, die zu meinem Schwerpunkt passen, und offene Karten beim Endkunden.',
      link: 'So arbeite ich mit Recruitern',
    },
  },
  en: {
    title: 'Freelance Salesforce Architect: working with recruiters',
    metaTitle: 'Freelance Salesforce Architect for recruiters',
    description:
      'How Fabian Kramer works with recruiters as a freelance Salesforce architect: profile, response time, submissions only with approval, no double submissions.',
    eyebrow: 'Partners · Recruiters',
    back: 'All partners',
    lead: 'Many of my projects come through staffing agencies, the best ones through recruiters I have worked with before. This page says what you get from me, what I need from you and where my limits are. That way we skip the calls that lead nowhere.',
    ctaPrimary: 'Send a request',
    ctaSecondary: 'How I work',
    promises: ['Answer within 1 working day', '1 recruiter per request', 'Submission only with approval'],
    portraitAlt: 'Portrait of Fabian Kramer',
    facts: [
      { value: '8', label: 'years of Salesforce' },
      { value: '20+', label: 'enterprise projects' },
      { value: '25 · 8', label: 'certifications · Architect' },
      { value: 'DE · EN', label: 'project languages' },
    ],
    fit: {
      label: 'Profile',
      title: 'What to contact me for',
      intro: 'A clear no saves you more time than a vague maybe. That is why both are listed here.',
      yesTitle: 'Fits',
      yes: [
        'Enterprise, solution or lead architect roles',
        'Programmes with several implementation partners',
        'Architect on the client side between business and IT',
        'Manufacturing, service, after-sales and B2B sales',
        'Partner governance, DevOps and SAP integration',
      ],
      noTitle: 'Does not fit',
      no: [
        'Pure admin roles',
        'Developer roles without architecture decisions',
        'Architect on paper only, when the partner has already decided',
      ],
      noNote: 'If I know someone who fits better, I will tell you.',
      tagsLabel: 'Clouds and tools',
      tags: ['Sales Cloud', 'Service Cloud', 'Field Service', 'Experience Cloud', 'Manufacturing Cloud', 'CPQ', 'B2B Commerce', 'DevOps', 'sfdx-hardis', 'SAP integration'],
    },
    deal: {
      label: 'The deal',
      title: 'What you get, what I need',
      intro: 'Working well with recruiters depends on the same things as with any other partner: clear agreements and reliability, on both sides.',
      fairTitle: 'Win-win and full transparency',
      fair: 'The goal is a win-win situation with full transparency. That includes an agency fee in proportion to my daily rate. Mark-ups above 30 percent are unusual in this industry. If I find that it is the case anyway, I require an open-book policy for an extension or any further collaboration.',
      giveTitle: 'You get from me',
      give: [
        { icon: 'clock', t: 'An answer within one working day', d: 'Even if it is no. Your client never waits for me.' },
        { icon: 'scale', t: 'An honest assessment up front', d: 'Which requirements I meet and which I do not. You submit with arguments, not with hope.' },
        { icon: 'profile', t: 'Exclusively through you', d: 'Submissions only with my written approval, through exactly one recruiter per request. If the same role reaches me through others later, I decline.' },
        { icon: 'calendar', t: 'Availability you can rely on', d: 'Start and utilisation as I can deliver them. If anything changes, you hear it first.' },
        { icon: 'handshake', t: 'Loyalty in the project', d: 'Extensions go through you. No direct contract behind your back.' },
      ] as Point[],
      needTitle: 'I need from you',
      need: [
        { icon: 'building', t: 'The end client', d: 'Otherwise I cannot rule out double submissions. I treat the name confidentially.' },
        { icon: 'compass', t: 'Role, phase, decision scope', d: 'New implementation, rescue or run? How many partners deliver, who decides?' },
        { icon: 'sliders', t: 'Duration, utilisation, start, on-site share', d: 'Most requests fail on these. That is why they belong in the first message.' },
        { icon: 'budget', t: 'The budget range', d: 'Right at the start. Only then do we treat each other’s time with respect and make sure working together is an option at all.' },
        { icon: 'feedback', t: 'Feedback after the submission', d: 'Even after a rejection, a short and timely reply is essential.' },
      ] as Point[],
    },
    process: {
      label: 'Process',
      title: 'How a request works',
      steps: [
        { icon: 'mail', t: 'Request', d: 'By email or form, with end client, role, duration, utilisation, start and budget.' },
        { icon: 'clock', t: 'Answer', d: 'Within one working day: fits or does not fit, plus rate and availability.' },
        { icon: 'check', t: 'Approval', d: 'In writing for exactly this request, with a tailored profile.' },
        { icon: 'interview', t: 'Client interview', d: 'I prepare for the project, not just for my CV.' },
        { icon: 'contract', t: 'Contract and start', d: 'You remain the contact for everything contractual, including the extension.' },
      ] as Point[],
      termsLabel: 'Terms',
      terms: [
        { t: 'Rate per request', d: 'Hourly or daily rate depending on role, duration and on-site share. There is no one-size-fits-all price list.' },
        { t: 'Contract with the company', d: 'The contract partner is FK Solution Design GmbH. Invoicing monthly by effort with a timesheet.' },
      ],
    },
    ctaTitle: 'A request that fits?',
    ctaText: 'Send me the basics. You get an answer within one working day, even if it is no.',
    formSubject: 'Recruiter request',
    teaser: {
      label: 'For recruiters',
      title: 'Recruiters and staffing agencies',
      text: 'Many of my projects come through recruiters. Working well together depends on the same things as with any other partner: clear agreements and reliability. You get fast answers, an honest profile and no double submissions. I get requests that match my focus and an open view of the end client.',
      link: 'How I work with recruiters',
    },
  },
};
