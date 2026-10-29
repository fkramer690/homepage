// Profile page of Juliane Winterscheid, cooperation partner for change management:
// /partner/juliane-winterscheid/ (DE) and /en/partners/juliane-winterscheid/ (EN).
// Facts come from her one-pager and her freelancermap profile (as of October 2026);
// Fabian approved naming her clients and publishing the page. Icons are file names from src/icons/.

export type ProfileIconName =
  | 'change' | 'interview' | 'team' | 'feedback' | 'target'
  | 'architecture' | 'pipeline' | 'partners' | 'gear' | 'analyse'
  | 'steer' | 'implement' | 'check' | 'design';

interface Point {
  icon: ProfileIconName;
  t: string;
  d: string;
}

export const julianePaths = { de: 'partner/juliane-winterscheid/', en: 'partners/juliane-winterscheid/' } as const;

export const juliane = {
  de: {
    title: 'Juliane Winterscheid: Change Management für Salesforce',
    metaTitle: 'Juliane Winterscheid: Change Management Salesforce',
    description:
      'Juliane Winterscheid, Prosci-zertifizierte Change-Managerin aus Köln, begleitet mit Fabian Kramer Salesforce-Einführungen: ADKAR, Sponsoren, Key User und Verankerung.',
    eyebrow: 'Partner · Change Management',
    back: 'Alle Partner',
    lead: 'Juliane Winterscheid ist Senior Human Centered Change Consultant mit mehr als zehn Jahren in Management, Führung und Beratung. Sie sorgt dafür, dass Menschen neue Prozesse annehmen, ich sorge dafür, dass die Architektur und die Releases sie tragen. Bei Change Management in Salesforce-Programmen arbeiten wir zusammen.',
    promises: ['Prosci Change Practitioner', 'Salesforce-Rollouts in mehreren Ländern', 'Deutsch · Englisch'],
    ctaPrimary: 'Gespräch anfragen',
    ctaSecondary: 'Projekte ansehen',
    portraitAlt: 'Juliane Winterscheid präsentiert vor einem Team',
    caption: 'Juliane Winterscheid · Köln',
    facts: [
      { value: '10+', label: 'Jahre Management, Führung, Beratung' },
      { value: '6', label: 'IT-Transformationen als Change-Managerin' },
      { value: '4', label: 'Salesforce-Projekte' },
      { value: '19', label: 'Länder in einer Transformation' },
    ],
    about: {
      label: 'Profil',
      title: 'Change Management mit Blick von innen',
      paragraphs: [
        'Juliane kennt Unternehmen nicht nur aus der Beratung, sondern auch aus Führungsrollen: als HR-Managerin, als Interim-Managerin für die DACH-Region und als Country Managerin DACH. Sie weiß deshalb, wie Entscheidungen fallen, wo Widerstand entsteht und was ein Team braucht, um neue Arbeitsweisen anzunehmen.',
        'Seit 2022 arbeitet sie freiberuflich als Change-Managerin für IT-Transformationen, darunter globale Salesforce-Rollouts. Sie ist Prosci Certified Change Practitioner und ausgebildete Business-Coachin und verbindet die strukturierte Methode mit praktischer Managementerfahrung. An der Hochschule Fresenius lehrt sie „Managing Transformation & Change“ im Masterstudiengang International Business Management.',
      ],
      tagsLabel: 'Branchen',
      tags: ['Industrielle Fertigung', 'Lebensmittelherstellung', 'Konsumgüter', 'Medizintechnik', 'Telekommunikation', 'Versicherung', 'IT-Beratung', 'Handel', 'Hotellerie', 'Fitness und Dienstleistungen'],
    },
    split: {
      label: 'Zusammenarbeit',
      title: 'Wer was in einem Salesforce-Programm übernimmt',
      intro: 'Change Management und Architektur hängen zusammen: Jede Abweichung vom Template ist auch eine Frage der Gewohnheit, jedes Release eine Änderung für Menschen. Deshalb planen wir beides gemeinsam.',
      leftTitle: 'Juliane: Menschen und Veränderung',
      left: [
        { icon: 'analyse', t: 'Diagnose je Gruppe', d: 'An welcher ADKAR-Stufe hängen Vertrieb, Innendienst, Service oder Partner, und was hilft dort?' },
        { icon: 'steer', t: 'Sponsor-Plan', d: 'Was das Management wann sichtbar tut, damit Rückhalt mehr ist als eine Folie.' },
        { icon: 'interview', t: 'Kommunikation und Coaching', d: 'Botschaften je Gruppe und Land, Begleitung von Führungskräften und Sponsoren.' },
        { icon: 'team', t: 'Key User und Schulung', d: 'Auswahl, Rolle und Schulung am echten Fall, damit Wissen im Alltag ankommt.' },
      ] as Point[],
      rightTitle: 'Fabian: Architektur und Releases',
      right: [
        { icon: 'architecture', t: 'Zielarchitektur und Template', d: 'Was global gilt, was ein Land abweichen darf, und warum.' },
        { icon: 'pipeline', t: 'Release-Plan', d: 'Einführungsplan je Release, verknüpft mit Pipeline, Abnahmetest und Release Notes.' },
        { icon: 'partners', t: 'Partnersteuerung', d: 'Standards, die Umsetzungspartner einhalten, verankert in Pipeline und CoE-Call.' },
        { icon: 'target', t: 'Messung in Salesforce', d: 'Berichte, die zeigen, ob ein Prozess genutzt wird, pro Gruppe und Land.' },
      ] as Point[],
    },
    projects: {
      label: 'Referenzen',
      title: 'Projekte als Change-Managerin',
      intro: 'Eine Auswahl aus Julianes Projekten, mit Rolle und Umfang laut ihrem Profil.',
      items: [
        { t: 'AAK AB: globaler Salesforce-Sales-Cloud-Rollout', d: 'Senior Human Centered Change Consultant. Mehr als 500 Anwender in mehreren Ländern in den USA, Asien und Europa.' },
        { t: 'Deutsche Telekom AG: Salesforce-Prozessoptimierung', d: 'Human Centered Change Strategy Consultant in einem Transformationsumfeld auf Konzernebene.' },
        { t: 'Septodont GmbH: Rollout von Salesforce Maps', d: 'Organizational Change Consultant und Executive Coach.' },
        { t: 'Von Rundstedt: Salesforce-Einführung', d: 'IT-Projektmanagerin, Begleitung vom Kick-off bis zum Rollout.' },
        { t: 'HDI Versicherungen AG: globale IT-Transformation (Cloudification)', d: 'Senior Organizational Change & Communication Consultant. Mehr als 20.000 betroffene Mitarbeitende in 19 Ländern.' },
        { t: 'KaRo / Heiko Companies: Transformation auf Microsoft Dynamics 365', d: 'Organizational Change Management Consultant für digitale Transformation und Akzeptanz.' },
      ],
    },
    steps: {
      label: 'Vorgehen',
      title: 'So begleiten wir eine Einführung',
      items: [
        { icon: 'analyse', t: 'Diagnose', d: 'Betroffene Gruppen, Änderungen je Gruppe und ADKAR-Stufe, Erfolgszahlen mit Ausgangswert.' },
        { icon: 'steer', t: 'Sponsor', d: 'Sponsor-Plan mit Auftritten, Entscheidungen und Monatszahlen, je Land ein eigener Sponsor.' },
        { icon: 'team', t: 'Befähigen', d: 'Key User auswählen und freistellen, Schulung am echten Fall kurz vor dem Go-live.' },
        { icon: 'implement', t: 'Einführen', d: 'Einführungsplan je Release und Welle, Kommunikation in Landessprache, Rückweg ins Backlog.' },
        { icon: 'check', t: 'Verankern', d: 'Nutzung messen, Schattenlösungen erkennen, Verantwortung an interne Rollen übergeben.' },
      ] as Point[],
    },
    credentials: {
      label: 'Zertifikate',
      tags: ['Prosci Change Management Practitioner', 'PRINCE2', 'Professional Scrum Master I', 'Six Sigma Green Belt', 'Personal & Business Coach', 'DISC-Profiling', 'IHK-Ausbildereignung (AEVO)'],
      note: 'Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Die Prosci-Zertifizierung hat Juliane Winterscheid, FK Solution Design ist kein Partner von Prosci.',
    },
    more: {
      label: 'Weiterlesen',
      links: [
        { t: 'Masterclass Change Management', d: 'Fünf Kapitel entlang der ADKAR-Stufen für Salesforce-Einführungen.', href: 'masterclass/change-management/' },
        { t: 'Leistung Change Management', d: 'Wie wir Change Management in Ihrem Programm aufsetzen.', href: 'leistungen/change-management/' },
        { t: 'Warum Salesforce-Einführungen scheitern', d: 'Der Einstieg mit ADKAR und den sechs Themen dahinter.', href: 'blog/change-management-salesforce-einfuehrung/' },
      ],
    },
    linkedIn: 'LinkedIn-Profil von Juliane',
    ctaTitle: 'Eine Salesforce-Einführung steht an?',
    ctaText: 'Schreiben Sie uns, wo es hakt oder was ansteht. Ich melde mich und bringe Juliane in das erste Gespräch mit.',
    formSubject: 'Change Management mit Juliane Winterscheid',
  },
  en: {
    title: 'Juliane Winterscheid: change management for Salesforce',
    metaTitle: 'Juliane Winterscheid: Salesforce change management',
    description:
      'Juliane Winterscheid, Prosci certified change manager from Cologne, supports Salesforce rollouts with Fabian Kramer: ADKAR, sponsors, key users and reinforcement.',
    eyebrow: 'Partner · Change management',
    back: 'All partners',
    lead: 'Juliane Winterscheid is a senior human centered change consultant with more than ten years in management, leadership and consulting. She makes sure people adopt new processes; I make sure the architecture and the releases support them. We work together on change management in Salesforce programmes.',
    promises: ['Prosci change practitioner', 'Salesforce rollouts across countries', 'German · English'],
    ctaPrimary: 'Request a call',
    ctaSecondary: 'See projects',
    portraitAlt: 'Juliane Winterscheid presenting to a team',
    caption: 'Juliane Winterscheid · Cologne',
    facts: [
      { value: '10+', label: 'years in management, leadership, consulting' },
      { value: '6', label: 'IT transformations as change manager' },
      { value: '4', label: 'Salesforce projects' },
      { value: '19', label: 'countries in one transformation' },
    ],
    about: {
      label: 'Profile',
      title: 'Change management with an inside view',
      paragraphs: [
        'Juliane knows companies not only from consulting but also from leadership roles: as HR manager, as interim manager for the DACH region and as country manager DACH. So she knows how decisions are made, where resistance comes from and what a team needs to adopt new ways of working.',
        'Since 2022 she has worked as a freelance change manager for IT transformations, including global Salesforce rollouts. She is a Prosci certified change practitioner and a trained business coach, and combines the structured method with hands-on management experience. At Hochschule Fresenius she teaches "Managing Transformation & Change" in the International Business Management master programme.',
      ],
      tagsLabel: 'Industries',
      tags: ['Industrial manufacturing', 'Food manufacturing', 'Consumer goods', 'Medical technology', 'Telecommunications', 'Insurance', 'IT consulting', 'Retail', 'Hospitality', 'Fitness and consumer services'],
    },
    split: {
      label: 'Working together',
      title: 'Who does what in a Salesforce programme',
      intro: 'Change management and architecture belong together: every deviation from the template is also a question of habit, every release a change for people. So we plan both together.',
      leftTitle: 'Juliane: people and change',
      left: [
        { icon: 'analyse', t: 'Diagnosis per group', d: 'At which ADKAR stage are sales, inside sales, service or partners stuck, and what helps there?' },
        { icon: 'steer', t: 'Sponsor plan', d: 'What management visibly does and when, so that backing is more than a slide.' },
        { icon: 'interview', t: 'Communication and coaching', d: 'Messages per group and country, coaching for managers and sponsors.' },
        { icon: 'team', t: 'Key users and training', d: 'Selection, role and training on real cases, so knowledge reaches daily work.' },
      ] as Point[],
      rightTitle: 'Fabian: architecture and releases',
      right: [
        { icon: 'architecture', t: 'Target architecture and template', d: 'What applies globally, where a country may deviate, and why.' },
        { icon: 'pipeline', t: 'Release plan', d: 'Rollout plan per release, linked to pipeline, acceptance testing and release notes.' },
        { icon: 'partners', t: 'Partner governance', d: 'Standards that implementation partners follow, anchored in the pipeline and CoE call.' },
        { icon: 'target', t: 'Measurement in Salesforce', d: 'Reports that show whether a process is used, per group and country.' },
      ] as Point[],
    },
    projects: {
      label: 'References',
      title: 'Projects as change manager',
      intro: 'A selection of Juliane\'s projects, with role and scope as stated in her profile.',
      items: [
        { t: 'AAK AB: global Salesforce Sales Cloud rollout', d: 'Senior human centered change consultant. More than 500 end users in several countries across the US, Asia and Europe.' },
        { t: 'Deutsche Telekom AG: Salesforce process optimisation', d: 'Human centered change strategy consultant in an enterprise-scale transformation.' },
        { t: 'Septodont GmbH: Salesforce Maps rollout', d: 'Organizational change consultant and executive coach.' },
        { t: 'Von Rundstedt: Salesforce implementation', d: 'IT project management consultant, from kick-off to rollout.' },
        { t: 'HDI Versicherungen AG: global IT transformation (cloudification)', d: 'Senior organizational change and communication consultant. More than 20,000 employees affected across 19 countries.' },
        { t: 'KaRo / Heiko Companies: Microsoft Dynamics 365 transformation', d: 'Organizational change management consultant for digital transformation and adoption.' },
      ],
    },
    steps: {
      label: 'Approach',
      title: 'How we support a rollout',
      items: [
        { icon: 'analyse', t: 'Diagnosis', d: 'Affected groups, changes and ADKAR stage per group, success figures with a baseline.' },
        { icon: 'steer', t: 'Sponsor', d: 'Sponsor plan with appearances, decisions and monthly figures, a sponsor of its own per country.' },
        { icon: 'team', t: 'Enable', d: 'Choose and free up key users, training on real cases shortly before go-live.' },
        { icon: 'implement', t: 'Roll out', d: 'Rollout plan per release and wave, communication in the local language, a way back into the backlog.' },
        { icon: 'check', t: 'Reinforce', d: 'Measure usage, spot shadow lists, hand ownership to internal roles.' },
      ] as Point[],
    },
    credentials: {
      label: 'Certifications',
      tags: ['Prosci Change Management Practitioner', 'PRINCE2', 'Professional Scrum Master I', 'Six Sigma Green Belt', 'Personal & business coach', 'DISC profiling', 'IHK trainer certificate (AEVO)'],
      note: 'Prosci and ADKAR are registered trademarks of Prosci, Inc. The Prosci certification is held by Juliane Winterscheid; FK Solution Design is not a Prosci partner.',
    },
    more: {
      label: 'Read on',
      links: [
        { t: 'Change management masterclass', d: 'Five chapters along the ADKAR stages for Salesforce rollouts.', href: 'masterclass/change-management/' },
        { t: 'Change management service', d: 'How we set up change management in your programme.', href: 'services/change-management-salesforce/' },
        { t: 'Why Salesforce rollouts fail', d: 'The starting point with ADKAR and the six topics behind it.', href: 'blog/change-management-salesforce-rollout/' },
      ],
    },
    linkedIn: 'Juliane on LinkedIn',
    ctaTitle: 'A Salesforce rollout is coming up?',
    ctaText: 'Tell us where it is stuck or what is planned. I will get back to you and bring Juliane to the first conversation.',
    formSubject: 'Change management with Juliane Winterscheid',
  },
};
