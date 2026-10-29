// "Working with recruiters": content of /partner/recruiter/ (DE) and /en/partners/recruiters/ (EN),
// plus the teaser on the partner page. Icons are file names from src/icons/.

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
    lead: 'Viele meiner Projekte kommen über Personaldienstleister zustande, die besten über Recruiter, mit denen ich schon einmal gearbeitet habe. Hier steht, was Sie von mir bekommen, was ich von Ihnen brauche und wo meine Grenzen sind. So wissen wir beide früh, ob eine Zusammenarbeit passt.',
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
      intro: 'Damit Sie schnell einschätzen können, ob eine Anfrage passt, steht hier beides.',
      yesTitle: 'Passt',
      yes: [
        'Enterprise-, Solution- oder Lead-Architect-Rollen',
        'Programme mit mehreren Implementierungspartnern',
        'Architekt auf Kundenseite zwischen Fachbereich und IT',
        'Fertigung, Service, After-Sales und B2B-Vertrieb',
        'Partnersteuerung, DevOps und Integration mit SAP',
      ],
      noTitle: 'Passt eher nicht',
      no: [
        'Reine Admin-Rollen',
        'Entwicklerrollen ohne Architekturentscheidung',
        'Rollen, in denen die Architektur bereits feststeht und nur noch abgenommen werden soll',
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
      fair: 'Das Ziel ist eine Win-win-Situation mit voller Transparenz. Dazu gehört, dass die Vermittlungspauschale im Verhältnis zu meinem Tagessatz steht. Aufschläge von mehr als 30 Prozent sind in der Branche unüblich. Liegt ein Aufschlag darüber, bitte ich bei einer Verlängerung oder weiteren Zusammenarbeit um eine Open-Book-Regelung.',
      giveTitle: 'Sie bekommen von mir',
      give: [
        { icon: 'clock', t: 'Antwort innerhalb eines Werktags', d: 'Auch wenn sie Nein lautet. Ihr Kunde muss nicht auf mich warten.' },
        { icon: 'scale', t: 'Ehrliche Einschätzung vorab', d: 'Welche Anforderungen ich erfülle und welche nicht. So können Sie mich beim Kunden mit guten Argumenten vorstellen.' },
        { icon: 'profile', t: 'Exklusiv über Sie', d: 'Eingereicht wird nur mit meiner schriftlichen Freigabe, pro Anfrage über genau einen Recruiter. Kommt dieselbe Stelle danach über andere, teile ich mit, dass ich bereits vertreten bin, auch wenn die Konditionen dort besser sind.' },
        { icon: 'calendar', t: 'Verfügbarkeit, die stimmt', d: 'Start und Auslastung, wie ich sie halten kann. Ändert sich etwas, erfahren Sie es zuerst.' },
        { icon: 'handshake', t: 'Loyalität im Projekt', d: 'Verlängerungen laufen selbstverständlich über Sie, auch wenn der Kunde mich direkt anspricht.' },
      ] as Point[],
      needTitle: 'Ich brauche von Ihnen',
      need: [
        { icon: 'building', t: 'Den Endkunden', d: 'So kann ich Doppeleinreichungen sicher ausschließen. Den Namen behandle ich vertraulich.' },
        { icon: 'compass', t: 'Rolle, Phase, Entscheidungsrahmen', d: 'Neueinführung, Rettung oder Betrieb? Wie viele Partner liefern, wer entscheidet?' },
        { icon: 'sliders', t: 'Laufzeit, Auslastung, Start, Vor-Ort-Anteil', d: 'Diese Eckdaten entscheiden meist, ob es passt. Am besten stehen sie schon in der ersten Nachricht.' },
        { icon: 'budget', t: 'Den Budgetrahmen', d: 'Gleich zu Beginn. Nur so gehen wir wertschätzend mit unserer Zeit um und stellen sicher, dass eine Zusammenarbeit überhaupt eine Option ist.' },
        { icon: 'feedback', t: 'Rückmeldung nach der Einreichung', d: 'Auch bei einer Absage ist eine kurze, zeitnahe Rückmeldung essenziell.' },
      ] as Point[],
    },
    rules: {
      label: 'Fair für beide',
      title: 'Damit es für beide fair bleibt',
      intro: 'Fast alles lässt sich im Gespräch klären. Bei diesen Punkten bitte ich um Verständnis, dass ich keine Ausnahme mache.',
      items: [
        { t: 'Einreichung nur mit Freigabe', d: 'Mein Profil geht nur mit meiner Zustimmung an einen Kunden.' },
        { t: 'Das Profil bleibt, wie es ist', d: 'Bitte keine Skills, Zertifikate oder Projektjahre ergänzen, die ich nicht habe.' },
        { t: 'Ein Lebenslauf, eine Fassung', d: 'Meinen Lebenslauf gibt es in einer Version. Ich übersetze ihn nicht ins Deutsche und übertrage ihn nicht in Ihr Layout.' },
        { t: 'Keine Weitergabe ohne Absprache', d: 'Mein Profil bitte nicht an weitere Vermittler geben, ohne mich vorher zu fragen.' },
        { t: 'Keine Kontakte aus früheren Projekten', d: 'Kontaktdaten von Entscheidern aus meinen bisherigen Projekten gebe ich nicht heraus. Für die Akquise bitte ich um eigene Recherche.' },
        { t: 'Vereinbart ist vereinbart', d: 'Ein Satz, auf den wir uns geeinigt haben, gilt auch nach der Zusage des Kunden.' },
        { t: 'Reisezeit ist keine Freizeit', d: 'Ich arbeite gern beim Kunden vor Ort. Der Aufwand für die Anreise gehört aber in die Kalkulation.' },
        { t: 'Verträge, die zur Situation passen', d: 'Ich unterschreibe nur Verträge, die unsere Zusammenarbeit tatsächlich beschreiben. Paragrafen, die dafür nicht relevant sind, gehören nicht hinein.' },
        { t: 'Faire Zahlungsbedingungen', d: 'Meine Rechnung bezahlen Sie unabhängig davon, wann Ihr Kunde zahlt. Das Zahlungsziel liegt bei höchstens 30 Tagen.' },
        { t: 'Kundenschutz mit Augenmaß', d: 'Er gilt nur für Kunden, die Sie mir vermittelt haben, und höchstens 12 Monate.' },
      ],
    },
    process: {
      label: 'Ablauf',
      title: 'So läuft eine Anfrage',
      steps: [
        { icon: 'mail', t: 'Anfrage', d: 'Sie schicken mir die Anfrage per Mail oder über das Formular, mit Endkunde, Rolle, Laufzeit, Auslastung, Start und Budget.' },
        { icon: 'clock', t: 'Antwort', d: 'Innerhalb eines Werktags sage ich Ihnen, ob es passt, und nenne Stunden- oder Tagessatz und Verfügbarkeit.' },
        { icon: 'check', t: 'Freigabe', d: 'Sie bekommen meine schriftliche Freigabe für genau diese Anfrage.' },
        { icon: 'interview', t: 'Kundengespräch', d: 'Ich bereite mich auf das Projekt vor, nicht nur auf meinen Lebenslauf.' },
        { icon: 'contract', t: 'Vertrag und Start', d: 'Sie bleiben Ansprechpartner für alles Vertragliche, auch bei der Verlängerung.' },
      ] as Point[],
      termsLabel: 'Konditionen',
      terms: [
        { t: 'Satz pro Anfrage', d: 'Meinen Stunden- oder Tagessatz nenne ich Ihnen für jede Anfrage einzeln. Er hängt davon ab, welche Rolle ich übernehme, wie lange das Projekt läuft und wie oft ich vor Ort bin.' },
        { t: 'Vertrag mit der GmbH', d: 'Ihr Vertragspartner ist meine FK Solution Design GmbH. Ich rechne monatlich nach tatsächlichem Aufwand ab und lege jeder Rechnung einen Tätigkeitsnachweis bei.' },
        { t: 'Remote und vor Ort', d: 'Hier bin ich flexibel. Bewährt hat sich, intensive Phasen und Workshops gemeinsam mit dem Projektteam vor Ort zu machen und danach einige Wochen remote weiterzuarbeiten.' },
        { t: 'Reisen', d: 'Ich arbeite von Köln aus. Wenn es im Projekt darauf ankommt, etwa vor einem Go-live, reise ich auch weltweit, in der Regel aber nicht öfter als einmal im Quartal. Reisezeit rechne ich vollständig als Arbeitszeit ab. Die Reisekosten rechne ich am liebsten nach tatsächlichem Aufwand ab. Bevorzugt Ihr Kunde eine Pauschale, ist das auch möglich.' },
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
    lead: 'Many of my projects come through staffing agencies, the best ones through recruiters I have worked with before. This page says what you get from me, what I need from you and where my limits are. That way we both know early whether working together fits.',
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
      intro: 'So you can quickly judge whether a request fits, both are listed here.',
      yesTitle: 'Fits',
      yes: [
        'Enterprise, solution or lead architect roles',
        'Programmes with several implementation partners',
        'Architect on the client side between business and IT',
        'Manufacturing, service, after-sales and B2B sales',
        'Partner governance, DevOps and SAP integration',
      ],
      noTitle: 'Rather not a fit',
      no: [
        'Pure admin roles',
        'Developer roles without architecture decisions',
        'Roles where the architecture is already fixed and only needs to be signed off',
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
      fair: 'The goal is a win-win situation with full transparency. That includes an agency fee in proportion to my daily rate. Mark-ups above 30 percent are unusual in this industry. If a mark-up is higher, I ask for an open-book arrangement for an extension or any further collaboration.',
      giveTitle: 'You get from me',
      give: [
        { icon: 'clock', t: 'An answer within one working day', d: 'Even if it is no. Your client does not have to wait for me.' },
        { icon: 'scale', t: 'An honest assessment up front', d: 'Which requirements I meet and which I do not. That way you can present me to the client with good arguments.' },
        { icon: 'profile', t: 'Exclusively through you', d: 'Submissions only with my written approval, through exactly one recruiter per request. If the same role reaches me through others later, I let them know I am already represented, even if their terms are better.' },
        { icon: 'calendar', t: 'Availability you can rely on', d: 'Start and utilisation as I can deliver them. If anything changes, you hear it first.' },
        { icon: 'handshake', t: 'Loyalty in the project', d: 'Extensions naturally go through you, even if the client approaches me directly.' },
      ] as Point[],
      needTitle: 'I need from you',
      need: [
        { icon: 'building', t: 'The end client', d: 'That way I can reliably rule out double submissions. I treat the name confidentially.' },
        { icon: 'compass', t: 'Role, phase, decision scope', d: 'New implementation, rescue or run? How many partners deliver, who decides?' },
        { icon: 'sliders', t: 'Duration, utilisation, start, on-site share', d: 'These basics usually decide whether it fits. Ideally they are in the first message.' },
        { icon: 'budget', t: 'The budget range', d: 'Right at the start. Only then do we treat each other’s time with respect and make sure working together is an option at all.' },
        { icon: 'feedback', t: 'Feedback after the submission', d: 'Even after a rejection, a short and timely reply is essential.' },
      ] as Point[],
    },
    rules: {
      label: 'Fair for both',
      title: 'Keeping it fair for both sides',
      intro: 'Almost everything can be settled in conversation. On these points, I ask for your understanding that I make no exceptions.',
      items: [
        { t: 'Submission only with approval', d: 'My profile only goes to a client with my consent.' },
        { t: 'The profile stays as it is', d: 'Please do not add skills, certifications or years of experience I do not have.' },
        { t: 'One CV, one version', d: 'My CV exists in one version. I do not translate it into German or transfer it into your template.' },
        { t: 'No passing on without asking', d: 'Please do not pass my profile on to other agencies without asking me first.' },
        { t: 'No contacts from past projects', d: 'I do not hand out contact details of decision-makers from my previous projects. For business development, please do your own research.' },
        { t: 'Agreed is agreed', d: 'A rate we have agreed on still applies after the client has said yes.' },
        { t: 'Travel time is not free time', d: 'I am happy to work on site at the client. The effort of getting there belongs in the calculation, though.' },
        { t: 'Contracts that fit the situation', d: 'I only sign contracts that actually describe our collaboration. Clauses that are not relevant to it do not belong in them.' },
        { t: 'Fair payment terms', d: 'You pay my invoice regardless of when your client pays. The payment term is at most 30 days.' },
        { t: 'Reasonable non-solicitation', d: 'It only covers clients you introduced me to, for at most 12 months.' },
      ],
    },
    process: {
      label: 'Process',
      title: 'How a request works',
      steps: [
        { icon: 'mail', t: 'Request', d: 'You send me the request by email or through the form, with end client, role, duration, utilisation, start and budget.' },
        { icon: 'clock', t: 'Answer', d: 'Within one working day I tell you whether it fits and give you my hourly or daily rate and availability.' },
        { icon: 'check', t: 'Approval', d: 'You get my written approval for exactly this request.' },
        { icon: 'interview', t: 'Client interview', d: 'I prepare for the project, not just for my CV.' },
        { icon: 'contract', t: 'Contract and start', d: 'You remain the contact for everything contractual, including the extension.' },
      ] as Point[],
      termsLabel: 'Terms',
      terms: [
        { t: 'Rate per request', d: 'I quote my hourly or daily rate for each request individually. It depends on the role I take on, how long the project runs and how often I am on site.' },
        { t: 'Contract with the company', d: 'Your contract partner is my company, FK Solution Design GmbH. I invoice monthly by actual effort and attach a timesheet to every invoice.' },
        { t: 'Remote and on site', d: 'I am flexible here. What works well is running intensive phases and workshops on site together with the project team and then continuing remotely for a few weeks.' },
        { t: 'Travel', d: 'I work from Cologne. When the project needs it, for example before a go-live, I also travel worldwide, but usually no more than once a quarter. I bill travel time in full as working time. I prefer to bill travel expenses at actual cost. If your client prefers a flat rate, that works too.' },
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
