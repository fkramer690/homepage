// Change management as one building block of Fabian's Salesforce programmes, shown on
// the service page /leistungen/change-management/ and /en/services/change-management-salesforce/
// (frontmatter `section: change-management`, rendered by ChangeTeam.astro and
// ChangeArticles.astro inside ServicePage.astro). Juliane Winterscheid owns the change in
// people, Fabian the architecture and releases. The article lists are filled from the blog
// collection, so new articles appear without touching this file. Icons are file names
// from src/icons/.
//
// The former area page /change-management/ (2026-10-29) is now a redirect to the service page.

export const changeSection = {
  de: {
    team: {
      label: 'Wer dahintersteht',
      title: 'Zwei Spezialgebiete, ein gemeinsamer Plan',
      intro:
        'Ich verantworte die Salesforce-Architektur, Juliane Winterscheid die Veränderung bei den Menschen. In Ihrem Programm planen wir beides zusammen, damit Release-Plan und Change-Plan zueinander passen.',
      items: [
        { who: 'Fabian Kramer', icon: 'architecture', title: 'Architektur und Releases', text: 'Ich sorge dafür, dass Architektur, Release-Plan und Pipeline die Veränderung tragen, und messe die Nutzung direkt in Salesforce.', more: 'Über mich' },
        { who: 'Juliane Winterscheid', icon: 'change', title: 'Change Management', text: 'Juliane begleitet Sponsoren, Führungskräfte und Key User durch die Veränderung. Sie ist Prosci-zertifiziert und lehrt an der Hochschule Fresenius.', more: 'Profil und Referenzen' },
        { who: 'Gemeinsam', icon: 'handshake', title: 'Ein Plan für Release und Veränderung', text: 'Key User, Schulung, Kommunikation und Messung hängen am Release-Plan. Wie das entlang der ADKAR-Stufen aussieht, zeigt die Masterclass.', more: 'Zur Masterclass' },
      ],
    },
    articles: {
      title: 'Artikel zum Change Management',
      basics: {
        title: 'Grundlagen von Juliane Winterscheid',
        text: 'Definition, Phasen, Modelle und Werkzeuge wie Stakeholder-Analyse und Kommunikationsplan.',
      },
      programmes: {
        title: 'Praxis aus Salesforce-Programmen',
        text: 'Wie Key User, Schulung, Hypercare und Messung in einer Salesforce-Einführung zusammenspielen.',
      },
      minutes: '{n} Min.',
    },
  },
  en: {
    team: {
      label: 'Who is behind it',
      title: 'Two specialisms, one joint plan',
      intro:
        'I am responsible for the Salesforce architecture, Juliane Winterscheid for the change in people. In your programme we plan both together, so that release plan and change plan fit.',
      items: [
        { who: 'Fabian Kramer', icon: 'architecture', title: 'Architecture and releases', text: 'I make sure architecture, release plan and pipeline support the change, and I measure adoption directly in Salesforce.', more: 'About me' },
        { who: 'Juliane Winterscheid', icon: 'change', title: 'Change management', text: 'Juliane guides sponsors, managers and key users through the change. She is Prosci certified and teaches at Hochschule Fresenius.', more: 'Profile and references' },
        { who: 'Together', icon: 'handshake', title: 'One plan for release and change', text: 'Key users, training, communication and measurement follow the release plan. The masterclass shows how that works along the ADKAR stages.', more: 'See the masterclass' },
      ],
    },
    articles: {
      title: 'Articles on change management',
      basics: {
        title: 'Basics by Juliane Winterscheid',
        text: 'Definition, phases, models and tools such as the stakeholder analysis and the communication plan.',
      },
      programmes: {
        title: 'Practice from Salesforce programmes',
        text: 'How key users, training, hypercare and measurement work together in a Salesforce rollout.',
      },
      minutes: '{n} min',
    },
  },
};
