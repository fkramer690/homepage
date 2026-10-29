// Area page of the second pillar, change management: /change-management/ (DE) and
// /en/change-management/ (EN), linked from the main menu and the start page.
// Juliane Winterscheid owns the general topics, Fabian the Salesforce side, and the
// joint offer is change management in Salesforce programmes. The article lists are
// filled from the blog collection (ChangeManagementPage.astro), so new articles appear
// without touching this file. Icons are file names from src/icons/.

export const changePaths = { de: 'change-management/', en: 'change-management/' } as const;

export const changeArea = {
  de: {
    metaTitle: 'Change Management: Grundlagen und Praxis',
    description:
      'Change Management von Juliane Winterscheid und Fabian Kramer: Definition, Modelle und Phasen für alle, dazu Praxis aus Salesforce-Einführungen in der Fertigung.',
    eyebrow: 'Change Management · Juliane Winterscheid und Fabian Kramer',
    title: 'Change Management: damit Menschen die Veränderung mittragen',
    intro:
      'Neue Systeme und Prozesse wirken erst, wenn Menschen sie im Alltag nutzen. Hier finden Sie die Grundlagen von Juliane Winterscheid und unsere Praxis aus Salesforce-Programmen.',
    stats: { basics: 'Grundlagen', programmes: 'Praxisartikel', chapters: 'Kapitel' },
    points: [
      { label: 'Juliane', text: 'Change-Managerin, Prosci-zertifiziert, lehrt an der Hochschule Fresenius.' },
      { label: 'Fabian', text: 'Salesforce-Architekt, sorgt dafür, dass Architektur und Releases die Veränderung tragen.' },
      { label: 'Gemeinsam', text: 'Change Management in Salesforce-Programmen, aus einer Hand geplant.' },
    ],
    profile: 'Profil von Juliane',
    groups: {
      basics: {
        label: 'Grundlagen',
        title: 'Was Change Management ist und wie es funktioniert',
        text: 'Für alle, die Veränderung verstehen oder selbst steuern wollen: Definition, Phasen und die bekannten Modelle im Vergleich. Geschrieben von Juliane Winterscheid.',
      },
      programmes: {
        label: 'In Salesforce-Programmen',
        title: 'Change Management bei Salesforce-Einführungen',
        text: 'Für Projektverantwortliche in IT, Service und Vertrieb: wie Key User, Schulung, Hypercare und Messung in einem Salesforce-Programm zusammenspielen.',
      },
      offer: {
        label: 'Lernen und Begleitung',
        title: 'Masterclass, Leistung und Ansprechpartner',
        text: 'Wer tiefer einsteigen will, nimmt die Masterclass. Wer Begleitung für ein Programm sucht, findet hier unser Angebot.',
      },
    },
    offer: {
      masterclass: { name: 'Masterclass', title: 'Masterclass Change Management', text: 'Fünf Kapitel entlang der ADKAR-Stufen für Salesforce-Einführungen.' },
      service: { name: 'Leistung', title: 'Change Management für Salesforce-Programme', text: 'Wie wir Change Management in Ihrem Programm aufsetzen, mit Ablauf und Ergebnissen.' },
      profile: { name: 'Juliane Winterscheid', title: 'Profil und Referenzen', text: 'Projekte, Zertifikate und wie wir in einem Programm die Arbeit aufteilen.' },
    },
    minutes: '{n} Min.',
    contactTitle: 'Eine Veränderung steht an?',
    contactText:
      'Schreiben Sie uns, worum es geht. Wir melden uns und klären im ersten Gespräch, ob Juliane allein oder wir beide die Richtigen für Ihr Vorhaben sind.',
    formSubject: 'Change Management',
  },
  en: {
    metaTitle: 'Change management: basics and practice',
    description:
      'Change management by Juliane Winterscheid and Fabian Kramer: definition, models and phases for everyone, plus practice from Salesforce rollouts in manufacturing.',
    eyebrow: 'Change management · Juliane Winterscheid and Fabian Kramer',
    title: 'Change management: so that people carry the change',
    intro:
      'New systems and processes only work once people use them in daily work. Here you find the basics by Juliane Winterscheid and our practice from Salesforce programmes.',
    stats: { basics: 'basics', programmes: 'practice articles', chapters: 'chapters' },
    points: [
      { label: 'Juliane', text: 'Change manager, Prosci certified, teaches at Hochschule Fresenius.' },
      { label: 'Fabian', text: 'Salesforce architect, makes sure architecture and releases support the change.' },
      { label: 'Together', text: 'Change management in Salesforce programmes, planned as one.' },
    ],
    profile: 'Juliane\'s profile',
    groups: {
      basics: {
        label: 'Basics',
        title: 'What change management is and how it works',
        text: 'For everyone who wants to understand or steer change: definition, phases and the well-known models compared. Written by Juliane Winterscheid.',
      },
      programmes: {
        label: 'In Salesforce programmes',
        title: 'Change management in Salesforce rollouts',
        text: 'For project leads in IT, service and sales: how key users, training, hypercare and measurement work together in a Salesforce programme.',
      },
      offer: {
        label: 'Learning and support',
        title: 'Masterclass, service and contacts',
        text: 'If you want to go deeper, take the masterclass. If you need support for a programme, this is our offer.',
      },
    },
    offer: {
      masterclass: { name: 'Masterclass', title: 'Change management masterclass', text: 'Five chapters along the ADKAR stages for Salesforce rollouts.' },
      service: { name: 'Service', title: 'Change management for Salesforce programmes', text: 'How we set up change management in your programme, with phases and results.' },
      profile: { name: 'Juliane Winterscheid', title: 'Profile and references', text: 'Projects, certifications and how we split the work in a programme.' },
    },
    minutes: '{n} min',
    contactTitle: 'A change is coming up?',
    contactText:
      'Tell us what it is about. We will get back to you and clarify in the first call whether Juliane alone or both of us are the right fit for your plans.',
    formSubject: 'Change management',
  },
};
