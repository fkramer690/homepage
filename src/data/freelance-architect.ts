// "Freelance Salesforce Architect": content of /freiberuflicher-salesforce-architect/ (DE)
// and /en/freelance-salesforce-architect/ (EN), the page for clients who look for an
// independent architect. Icons are file names from src/icons/; links are paths below
// the language root (see localHref in src/lib/paths.ts).

interface Card {
  icon: string;
  t: string;
  d: string;
  link: string;
  linkText: string;
}

interface Point {
  icon: string;
  t: string;
  d: string;
}

export const freelanceArchitectPaths = {
  de: 'freiberuflicher-salesforce-architect/',
  en: 'freelance-salesforce-architect/',
} as const;

export const freelanceArchitect = {
  de: {
    title: 'Freiberuflicher Salesforce Architect für Hersteller',
    metaTitle: 'Freiberuflicher Salesforce Architect | FK Solution Design',
    description:
      'Fabian Kramer, freiberuflicher Salesforce Architect auf Kundenseite: Architekturentscheidungen, Standards für mehrere Partner, Reviews. Für Fertigung und Service.',
    eyebrow: 'Freiberuflich · Kundenseite',
    lead: 'Ich bin Fabian Kramer, freiberuflicher Salesforce Enterprise Architect aus Köln. Ich arbeite für Hersteller auf der Kundenseite: Ich bereite Architekturentscheidungen vor, lege Standards fest, die für alle Implementierungspartner gelten, und prüfe, was gebaut wird. Vertragspartner ist meine FK Solution Design GmbH, abgerechnet wird monatlich nach Aufwand.',
    ctaPrimary: '30 Minuten sprechen',
    ctaSecondary: 'Wann sich das lohnt',
    promises: ['Nur auf Kundenseite', 'Kein Verkauf von Umsetzung', 'Deutsch und Englisch'],
    portraitAlt: 'Porträt von Fabian Kramer',
    facts: [
      { value: '8', label: 'Jahre Salesforce' },
      { value: '20+', label: 'Enterprise-Projekte' },
      { value: '25 · 8', label: 'Zertifikate · davon Architect' },
      { value: 'DE · EN', label: 'Projektsprachen' },
    ],
    situations: {
      label: 'Typische Anlässe',
      title: 'Wann sich ein freiberuflicher Architekt lohnt',
      intro: 'Ein Architekt auf Kundenseite lohnt sich dort, wo ein Partner über etwas entscheiden würde, an dem er verdient, oder wo mehrere Partner an derselben Org bauen.',
      cards: [
        { icon: 'partners', t: 'Mehrere Partner an einer Org', d: 'Jeder Partner baut nach eigenen Regeln, bis sich Automationen gegenseitig blockieren. Ich setze Standards und eine Object Ownership Matrix auf, die für alle gelten.', link: 'leistungen/partnersteuerung/', linkText: 'Partnersteuerung' },
        { icon: 'architecture', t: 'Entscheidung vor der Unterschrift', d: 'Industry Cloud oder Eigenbau, Field Service ja oder nein: Ich rechne den Nutzen gegen Lizenz- und Folgekosten, bevor sich jemand festlegt.', link: 'leistungen/salesforce-architektur/', linkText: 'Salesforce-Architektur' },
        { icon: 'license', t: 'Lizenzen, die keiner braucht', d: 'Standardmäßig werden volle Lizenzen angeboten, obwohl viele Nutzer sie nicht brauchen. Das kann schnell sechsstellige Beträge pro Jahr ausmachen.', link: 'leistungen/make-or-buy-lizenzen/', linkText: 'Make-or-Buy und Lizenzen' },
        { icon: 'integration', t: 'Salesforce und SAP', d: 'Salesforce ist nie das einzige System. Ich lege fest, welches System für Kunden, Preise und Aufträge führt und wie die Schnittstellen aussehen.', link: 'leistungen/salesforce-schnittstellen/', linkText: 'Schnittstellen' },
        { icon: 'pipeline', t: 'Releases ohne Überblick', d: 'Ich baue Pipelines auf GitLab, Azure DevOps, GitHub oder Bitbucket auf, im Repository des Kunden, damit ein Partnerwechsel möglich bleibt.', link: 'leistungen/devops-und-release-management/', linkText: 'DevOps und Releases' },
        { icon: 'team', t: 'Nearshore-Team steuern', d: 'Teams bis zu acht Entwickler in Osteuropa oder Indien, mit klaren Standards und Reviews, damit Qualität nicht von einzelnen Personen abhängt.', link: 'leistungen/projektsteuerung-nearshore/', linkText: 'Projektsteuerung und Nearshore' },
      ] as Card[],
    },
    compare: {
      label: 'Abgrenzung',
      title: 'Architekt auf Kundenseite oder Implementierungspartner?',
      intro: 'Beides hat seinen Platz. In größeren Programmen arbeiten beide zusammen: Der Partner baut, ich sorge dafür, dass er nach den Regeln des Kunden baut.',
      colMe: 'Freiberuflicher Architekt',
      colPartner: 'Implementierungspartner',
      rows: [
        { k: 'Arbeitet für', me: 'nur den Kunden', partner: 'den Kunden und das eigene Geschäft' },
        { k: 'Verdient an', me: 'Aufwand für Architektur und Steuerung', partner: 'Umfang der Umsetzung' },
        { k: 'Liefert', me: 'Zielbild, Standards, Entscheidungen, Reviews', partner: 'Umsetzung, Tests, Betrieb' },
        { k: 'Kapazität', me: 'eine Person', partner: 'ein Team, das mitwachsen kann' },
        { k: 'Vertrag', me: 'nach Aufwand', partner: 'Festpreis, Werkvertrag oder Aufwand' },
      ],
      more: 'Wann was passt, ausführlich:',
      moreLink: 'blog/salesforce-freelancer-oder-agentur/',
      moreText: 'Salesforce-Freelancer oder Agentur',
    },
    deliverables: {
      label: 'Ergebnisse',
      title: 'Was Sie konkret bekommen',
      items: [
        { icon: 'target', t: 'Zielbild und Entscheidungslog', d: 'Welche Clouds, welche Systeme führen, und warum. Jede Entscheidung mit Begründung nachlesbar.' },
        { icon: 'design', t: 'Datenmodell', d: 'Objekte, Beziehungen und die Frage, welche Daten aus dem ERP kommen.' },
        { icon: 'steer', t: 'Standards für alle Partner', d: 'Namenskonventionen, eine Automation pro Objekt, Testabdeckung und die Object Ownership Matrix.' },
        { icon: 'check', t: 'Reviews', d: 'Entwürfe und Pull Requests, bevor sie in Produktion gehen.' },
        { icon: 'budget', t: 'ROI- und Lizenzrechnung', d: 'Langfristig gerechnet, mit Wartung und Folgekosten, als Grundlage für die Verhandlung.' },
        { icon: 'handshake', t: 'Übergabe', d: 'Reviews und CoE-Call gehen an einen internen Kollegen, sobald der Prozess stabil läuft.' },
      ] as Point[],
    },
    practice: {
      label: 'Aus meiner Praxis',
      title: 'Mein größtes Programm',
      text: 'Fünf Implementierungspartner haben mit über 30 Entwicklern in acht Streams an derselben Org gebaut. Die Standards dafür haben rund drei Monate gebraucht: 80 Prozent standen nach der ersten Runde, die Randfälle kamen nach und nach dazu. Später wurden Änderungen mit Vorlauf im technischen CoE-Call alle zwei Wochen vorgestellt, bis neue Randfälle fast ganz verschwunden waren.',
      facts: [
        { value: '5', label: 'Partner' },
        { value: '30+', label: 'Entwickler' },
        { value: '8', label: 'Streams' },
        { value: '~3', label: 'Monate bis zu den Standards' },
      ],
    },
    process: {
      label: 'Zusammenarbeit',
      title: 'So fangen wir an',
      steps: [
        { icon: 'message', t: '30 Minuten', d: 'Sie schildern die Lage, ich sage ehrlich, ob ich der Richtige bin.' },
        { icon: 'sliders', t: 'Rahmen', d: 'Rolle, Laufzeit, Auslastung, Start und Vor-Ort-Anteil.' },
        { icon: 'contract', t: 'Angebot', d: 'Ein Satz für genau diese Rolle, Vertrag mit der FK Solution Design GmbH.' },
        { icon: 'implement', t: 'Start', d: 'Zuerst Bestandsaufnahme und Zielbild, dann Standards und Reviews.' },
      ] as Point[],
      termsLabel: 'Konditionen',
      terms: [
        { t: 'Nach Aufwand', d: 'Stunden- oder Tagessatz je nach Rolle, Laufzeit und Vor-Ort-Anteil, monatlich abgerechnet mit Tätigkeitsnachweis.' },
        { t: 'Vor Ort und remote', d: 'Ich arbeite gern beim Kunden vor Ort. Die Anreise gehört in die Kalkulation.' },
        { t: 'Auch über Recruiter', d: 'Viele Projekte laufen über Personaldienstleister.', link: 'partner/recruiter/', linkText: 'So arbeite ich mit Recruitern' },
      ] as { t: string; d: string; link?: string; linkText?: string }[],
    },
    faqTitle: 'Häufig gestellte Fragen',
    faq: [
      { q: 'Was macht ein freiberuflicher Salesforce Architect?', a: 'Er arbeitet auf der Seite des Kunden: Er bereitet Architekturentscheidungen vor und dokumentiert sie, legt Standards für alle Implementierungspartner fest und prüft Entwürfe und Pull Requests. Die Umsetzung selbst liefern die Partner.' },
      { q: 'Was kostet ein freiberuflicher Salesforce Architect?', a: 'Ich nenne einen Stunden- oder Tagessatz pro Anfrage, abhängig von Rolle, Laufzeit und Vor-Ort-Anteil. Abgerechnet wird monatlich nach Aufwand über die FK Solution Design GmbH. Eine Preisliste für alle Fälle gibt es nicht.' },
      { q: 'Ersetzt ein freiberuflicher Architekt den Implementierungspartner?', a: 'Nein. Für die Umsetzung brauchen Sie ein Team, das baut, testet und betreibt. Der Architekt auf Kundenseite sorgt dafür, dass dieses Team nach Ihren Regeln baut und Sie die Entscheidungen treffen.' },
      { q: 'Für welche Unternehmen und Clouds arbeiten Sie?', a: 'Für Hersteller in Fertigung, Service, After-Sales und B2B-Vertrieb. Schwerpunkte sind Sales und Service Cloud, Field Service, Experience Cloud, Manufacturing Cloud, CPQ, B2B Commerce und die Integration mit SAP.' },
      { q: 'Kann ich Sie auch über einen Personaldienstleister beauftragen?', a: 'Ja. Viele meiner Projekte laufen über Recruiter. Wie ich dabei arbeite, steht auf der Seite für Recruiter.' },
    ],
    ctaTitle: 'Fehlt in Ihrem Programm jemand auf Ihrer Seite?',
    ctaText: 'Schildern Sie mir kurz die Lage: wie viele Partner, welche Clouds, welche Entscheidung ansteht. Dann sage ich Ihnen, ob und wie ich helfen kann.',
    formSubject: 'Anfrage freiberuflicher Architekt',
    footerLink: 'Freiberuflicher Architekt',
  },
  en: {
    title: 'Freelance Salesforce Architect for manufacturers',
    metaTitle: 'Freelance Salesforce Architect | FK Solution Design',
    description:
      'Fabian Kramer, freelance Salesforce architect on the client side: architecture decisions, standards for several partners, reviews. For manufacturing and service.',
    eyebrow: 'Freelance · Client side',
    lead: 'I am Fabian Kramer, a freelance Salesforce Enterprise Architect based in Cologne. I work for manufacturers on the client side: I prepare architecture decisions, set standards that apply to every implementation partner and review what gets built. The contracting party is my company FK Solution Design GmbH, billed monthly by effort.',
    ctaPrimary: 'Talk for 30 minutes',
    ctaSecondary: 'When it pays off',
    promises: ['Client side only', 'No delivery to sell', 'German and English'],
    portraitAlt: 'Portrait of Fabian Kramer',
    facts: [
      { value: '8', label: 'years of Salesforce' },
      { value: '20+', label: 'enterprise projects' },
      { value: '25 · 8', label: 'certifications · Architect' },
      { value: 'DE · EN', label: 'project languages' },
    ],
    situations: {
      label: 'Typical occasions',
      title: 'When a freelance architect pays off',
      intro: 'An architect on the client side pays off where a partner would decide on something it earns from, or where several partners build on the same org.',
      cards: [
        { icon: 'partners', t: 'Several partners on one org', d: 'Each partner builds by its own rules until automations block each other. I set up standards and an object ownership matrix that apply to all of them.', link: 'services/partner-governance/', linkText: 'Partner governance' },
        { icon: 'architecture', t: 'A decision before signing', d: 'Industry cloud or custom build, Field Service or not: I weigh the benefit against licence and follow-up costs before anyone commits.', link: 'services/salesforce-architecture/', linkText: 'Salesforce architecture' },
        { icon: 'license', t: 'Licences nobody needs', d: 'Full licences are offered by default although many users do not need them. That can easily add up to six figures per year.', link: 'services/make-or-buy-licences/', linkText: 'Make or buy and licences' },
        { icon: 'integration', t: 'Salesforce and SAP', d: 'Salesforce is never the only system. I define which system leads for customers, prices and orders and what the interfaces look like.', link: 'services/salesforce-integration/', linkText: 'Integration' },
        { icon: 'pipeline', t: 'Releases nobody oversees', d: 'I build pipelines on GitLab, Azure DevOps, GitHub or Bitbucket, in the client’s repository, so a change of partner stays possible.', link: 'services/devops-release-management/', linkText: 'DevOps and releases' },
        { icon: 'team', t: 'Steering a nearshore team', d: 'Teams of up to eight developers in Eastern Europe or India, with clear standards and reviews, so quality does not depend on single people.', link: 'services/program-management-nearshore/', linkText: 'Programme management and nearshore' },
      ] as Card[],
    },
    compare: {
      label: 'Positioning',
      title: 'Client-side architect or implementation partner?',
      intro: 'Both have their place. In larger programmes they work together: the partner builds, I make sure it builds by the client’s rules.',
      colMe: 'Freelance architect',
      colPartner: 'Implementation partner',
      rows: [
        { k: 'Works for', me: 'the client only', partner: 'the client and its own business' },
        { k: 'Earns from', me: 'effort for architecture and steering', partner: 'the size of the delivery' },
        { k: 'Delivers', me: 'target picture, standards, decisions, reviews', partner: 'delivery, tests, run' },
        { k: 'Capacity', me: 'one person', partner: 'a team that can grow' },
        { k: 'Contract', me: 'time and materials', partner: 'fixed price, deliverable or time and materials' },
      ],
      more: 'When which fits, in detail:',
      moreLink: 'blog/salesforce-freelancer-or-consultancy/',
      moreText: 'Salesforce freelancer or consultancy',
    },
    deliverables: {
      label: 'Results',
      title: 'What you actually get',
      items: [
        { icon: 'target', t: 'Target picture and decision log', d: 'Which clouds, which systems lead, and why. Every decision with its reasoning on record.' },
        { icon: 'design', t: 'Data model', d: 'Objects, relationships and the question which data comes from the ERP.' },
        { icon: 'steer', t: 'Standards for every partner', d: 'Naming conventions, one automation per object, test coverage and the object ownership matrix.' },
        { icon: 'check', t: 'Reviews', d: 'Designs and pull requests before they go to production.' },
        { icon: 'budget', t: 'ROI and licence calculation', d: 'Calculated for the long term, with maintenance and follow-up costs, as the basis for negotiation.' },
        { icon: 'handshake', t: 'Handover', d: 'Reviews and the CoE call go to an internal colleague once the process runs stable.' },
      ] as Point[],
    },
    practice: {
      label: 'From my practice',
      title: 'My largest programme',
      text: 'Five implementation partners built on the same org with more than 30 developers in eight streams. The standards for it took about three months: 80 percent were in place after the first round, the edge cases came in step by step. Later, changes were presented with lead time in the technical CoE call every two weeks, until new edge cases had almost disappeared.',
      facts: [
        { value: '5', label: 'partners' },
        { value: '30+', label: 'developers' },
        { value: '8', label: 'streams' },
        { value: '~3', label: 'months to the standards' },
      ],
    },
    process: {
      label: 'Working together',
      title: 'How we start',
      steps: [
        { icon: 'message', t: '30 minutes', d: 'You describe the situation, I tell you honestly whether I am the right person.' },
        { icon: 'sliders', t: 'Scope', d: 'Role, duration, utilisation, start and on-site share.' },
        { icon: 'contract', t: 'Offer', d: 'A rate for exactly this role, contract with FK Solution Design GmbH.' },
        { icon: 'implement', t: 'Start', d: 'First the current state and the target picture, then standards and reviews.' },
      ] as Point[],
      termsLabel: 'Terms',
      terms: [
        { t: 'By effort', d: 'Hourly or daily rate depending on role, duration and on-site share, billed monthly with a timesheet.' },
        { t: 'On site and remote', d: 'I am happy to work on site at the client. Travel belongs in the calculation.' },
        { t: 'Also through recruiters', d: 'Many projects run through staffing agencies.', link: 'partners/recruiters/', linkText: 'How I work with recruiters' },
      ] as { t: string; d: string; link?: string; linkText?: string }[],
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What does a freelance Salesforce architect do?', a: 'He works on the client’s side: he prepares architecture decisions and documents them, sets standards for every implementation partner and reviews designs and pull requests. The partners deliver the implementation itself.' },
      { q: 'What does a freelance Salesforce architect cost?', a: 'I quote an hourly or daily rate per request, depending on role, duration and on-site share. Billing is monthly by effort through FK Solution Design GmbH. There is no price list for every case.' },
      { q: 'Does a freelance architect replace the implementation partner?', a: 'No. For the delivery you need a team that builds, tests and runs. The architect on the client side makes sure that team builds by your rules and that you take the decisions.' },
      { q: 'Which companies and clouds do you work for?', a: 'For manufacturers in production, service, after-sales and B2B sales. Focus areas are Sales and Service Cloud, Field Service, Experience Cloud, Manufacturing Cloud, CPQ, B2B Commerce and integration with SAP.' },
      { q: 'Can I hire you through a staffing agency?', a: 'Yes. Many of my projects run through recruiters. How I work with them is on the page for recruiters.' },
    ],
    ctaTitle: 'Is someone on your side missing in your programme?',
    ctaText: 'Briefly describe the situation: how many partners, which clouds, which decision is coming up. Then I tell you whether and how I can help.',
    formSubject: 'Request freelance architect',
    footerLink: 'Freelance architect',
  },
};
