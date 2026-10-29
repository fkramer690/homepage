// Change management as one building block of Fabian's Salesforce programmes, shown on
// the service page /leistungen/change-management/ and /en/services/change-management-salesforce/
// (frontmatter `section: change-management`, rendered by ChangeTeam.astro and
// ChangeArticles.astro inside ServicePage.astro). Juliane Winterscheid owns the change in
// people, Fabian the architecture and releases. The article lists are filled from the blog
// collection (the newest four per group, the rest in the filtered blog), so new
// articles appear without touching this file. Icons are file names
// from src/icons/.
//
// The former area page /change-management/ (2026-10-29) is now a redirect to the service page.

export const changeSection = {
  de: {
    // Replaces "Was ich mache": on this page "wir" are Fabian and Juliane.
    deliverables: 'Was wir machen',
    // Shared author box (AuthorBox.astro) at the end of the page.
    authors: { label: 'Ihre Ansprechpartner', joint: 'Das Vorgehen haben wir gemeinsam erarbeitet, und so arbeiten wir auch in Ihrem Programm zusammen.' },
    team: {
      label: 'Wer dahintersteht',
      title: 'Zwei Spezialgebiete, ein gemeinsamer Plan',
      intro:
        'Ich verantworte die Salesforce-Architektur, Juliane Winterscheid die Veränderung bei den Menschen. In Ihrem Programm planen wir beides zusammen, damit Release-Plan und Change-Plan zueinander passen.',
      items: [
        { who: 'Fabian Kramer', icon: 'architecture', title: 'Architektur und Releases', text: 'Ich sorge dafür, dass Architektur, Release-Plan und Pipeline die Veränderung tragen, und messe die Nutzung direkt in Salesforce.', more: 'Über mich' },
        { who: 'Juliane Winterscheid', icon: 'change', title: 'Change Management', text: 'Juliane begleitet Sponsoren, Führungskräfte und Key User durch die Veränderung. Sie ist Prosci-zertifiziert und lehrt an der Hochschule Fresenius.', more: 'Profil und Referenzen' },
        { who: 'Gemeinsam', icon: 'handshake', title: 'Ein Plan für Release und Veränderung', text: 'Key User, Schulung, Kommunikation und Messung planen wir entlang des Release-Plans. Wie das entlang der ADKAR-Stufen aussieht, zeigt die Masterclass.', more: 'Zur Masterclass' },
      ],
    },
    articles: {
      title: 'Artikel zum Change Management',
      basics: {
        title: 'Grundlagen von Juliane Winterscheid',
        text: 'Juliane erklärt, was Change Management ist, welche Phasen und Modelle es gibt und wie Werkzeuge wie Stakeholder-Analyse und Kommunikationsplan funktionieren.',
      },
      programmes: {
        title: 'Praxis aus Salesforce-Programmen',
        text: 'Ich beschreibe, wie Key User, Schulung, Hypercare und Messung in einer Salesforce-Einführung zusammenspielen.',
      },
      minutes: '{n} Min.',
      all: 'Alle {n} Artikel im Blog',
    },
  },
  en: {
    deliverables: 'What we do',
    authors: { label: 'Your contacts', joint: 'We developed the approach together, and that is how we work together in your programme.' },
    team: {
      label: 'Who is behind it',
      title: 'Two specialisms, one joint plan',
      intro:
        'I am responsible for the Salesforce architecture, Juliane Winterscheid for the change in people. In your programme we plan both together, so that release plan and change plan fit.',
      items: [
        { who: 'Fabian Kramer', icon: 'architecture', title: 'Architecture and releases', text: 'I make sure architecture, release plan and pipeline support the change, and I measure adoption directly in Salesforce.', more: 'About me' },
        { who: 'Juliane Winterscheid', icon: 'change', title: 'Change management', text: 'Juliane guides sponsors, managers and key users through the change. She is Prosci certified and teaches at Hochschule Fresenius.', more: 'Profile and references' },
        { who: 'Together', icon: 'handshake', title: 'One plan for release and change', text: 'We plan key users, training, communication and measurement along the release plan. The masterclass shows how that works along the ADKAR stages.', more: 'See the masterclass' },
      ],
    },
    articles: {
      title: 'Articles on change management',
      basics: {
        title: 'Basics by Juliane Winterscheid',
        text: 'Juliane explains what change management is, which phases and models exist and how tools such as the stakeholder analysis and the communication plan work.',
      },
      programmes: {
        title: 'Practice from Salesforce programmes',
        text: 'I describe how key users, training, hypercare and measurement work together in a Salesforce rollout.',
      },
      minutes: '{n} min',
      all: 'All {n} articles in the blog',
    },
  },
};
