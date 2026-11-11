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
    metaTitle: 'Juliane Winterscheid: Change-Managerin für Salesforce',
    description:
      'Juliane Winterscheid, Prosci-zertifizierte Change-Managerin aus Köln, begleitet mit Fabian Kramer Salesforce-Einführungen: ADKAR, Sponsoren, Key User.',
    eyebrow: 'Partner · Change Management',
    back: 'Alle Partner',
    lead: 'Juliane Winterscheid ist Senior Human Centered Change Consultant mit mehr als zehn Jahren in Management, Führung und Beratung. Sie sorgt dafür, dass Menschen neue Prozesse annehmen, ich sorge dafür, dass die Architektur und die Releases sie tragen. Bei Change Management in Salesforce-Programmen arbeiten wir zusammen.',
    promises: ['Prosci Change Practitioner', 'Salesforce-Rollouts in mehreren Ländern', 'Deutsch · Englisch'],
    ctaPrimary: 'Gespräch anfragen',
    ctaSecondary: 'Projekte ansehen',
    portraitAlt: 'Porträt von Juliane Winterscheid',
    caption: 'Juliane Winterscheid · Köln',
    // Box with photo and link to this page, shown on the change management masterclass,
    // its chapters and the blog articles of the category change-management (PartnerBox.astro).
    box: {
      label: 'Change Management mit Juliane Winterscheid',
      role: 'Senior Human Centered Change Consultant · Prosci Certified Change Practitioner',
      text: 'Das Vorgehen dieser Masterclass habe ich gemeinsam mit Juliane auf Salesforce-Programme übertragen, und in Programmen arbeiten wir zusammen. Sie begleitet Sponsoren, Führungskräfte und Key User durch die Veränderung, ich sorge dafür, dass Architektur und Releases dazu passen. Juliane hat globale Salesforce-Rollouts mit mehr als 500 Anwendern als Change-Managerin begleitet.',
      textBlog: 'Change Management in Salesforce-Programmen setze ich gemeinsam mit Juliane um. Sie begleitet Sponsoren, Führungskräfte und Key User durch die Veränderung, ich sorge dafür, dass Architektur und Releases dazu passen.',
      link: 'Profil und Referenzen',
    },
    // Author box below her own blog articles (frontmatter author: juliane).
    author: {
      label: 'Über die Autorin',
      bio: 'Juliane begleitet seit 2022 als freiberufliche Change-Managerin IT-Transformationen, darunter weltweite Salesforce-Rollouts. Davor war sie mehr als zehn Jahre in Management, Führung und Beratung tätig, unter anderem als Country Managerin DACH. An der Hochschule Fresenius hat sie „Managing Transformation & Change“ gelehrt.',
      more: 'Profil und Referenzen',
      // Her card in the shared author box of articles she co-wrote.
      part: 'Menschen und Veränderung',
      short: 'Begleitet als Change-Managerin weltweite Salesforce-Rollouts und hat an der Hochschule Fresenius Change Management gelehrt.',
    },
    facts: [
      { value: '10+', label: 'Jahre Führung und Management' },
      { value: '500+', label: 'Anwender im größten Salesforce-Rollout' },
      { value: '20.000+', label: 'Mitarbeitende in der aktuellen Transformation' },
      { value: '4', label: 'Salesforce-Projekte' },
    ],
    about: {
      label: 'Profil',
      title: 'Change Management mit Blick von innen',
      paragraphs: [
        'Juliane kennt Unternehmen nicht nur aus der Beratung, sondern auch aus Führungsrollen: als HR-Managerin, als Interim-Managerin für die DACH-Region und als Country Managerin DACH mit 350 Mitarbeitenden, 13 direkten Berichten und Ergebnisverantwortung. Umstrukturierungen hat sie mit dem Betriebsrat verhandelt. Sie weiß deshalb, wie Entscheidungen fallen, wo Widerstand entsteht und was ein Team braucht, um neue Arbeitsweisen anzunehmen. Angefangen hat sie als Industriekauffrau, ihre Masterarbeit über Kulturwandel hat sie bei ThyssenKrupp Rasselstein geschrieben.',
        'Seit 2022 arbeitet sie freiberuflich als Change-Managerin für IT-Transformationen, darunter globale Salesforce-Rollouts. Sie ist Prosci Certified Change Practitioner und ausgebildete Business-Coachin und verbindet die strukturierte Methode mit praktischer Managementerfahrung. An der Hochschule Fresenius hat sie im Sommersemester 2025 „Managing Transformation & Change“ für Masterstudierende im International Management gelehrt; der Kurs gehörte zu den bestbewerteten der Hochschule.',
      ],
      tagsLabel: 'Branchen',
      tags: ['Industrielle Fertigung', 'Lebensmittelherstellung', 'Konsumgüter', 'Medizintechnik', 'Telekommunikation', 'Versicherung', 'IT-Beratung', 'Handel', 'Hotellerie', 'Fitness und Dienstleistungen', 'Hochschule und Bildung'],
      methodsLabel: 'Workshop-Formate',
      methods: ['Change Leadership', 'Impact-Analyse', 'ADKAR', 'DISC-Profiling', 'Retrospektive', 'Train-the-Trainer'],
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
        { icon: 'feedback', t: 'Betriebsrat früh einbinden', d: 'Was Salesforce über Leistung und Verhalten auswertet, mit dem Betriebsrat klären, bevor es den Zeitplan kippt.' },
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
      title: 'Projekte in Change Management und Transformation',
      pickLabel: 'Projekt auswählen',
      periodLabel: 'Zeitraum',
      scopeLabel: 'Umfang',
      roleLabel: 'Rolle',
      tasksLabel: 'Aufgaben',
      intro: 'Eine Auswahl aus Julianes Projekten, mit Rolle, Umfang und Aufgaben laut ihrem Profil.',
      items: [
        { logo: 'hdi', t: 'HDI Versicherungen AG: globale IT-Transformation (Cloudification, Rechenzentrums-Schließung)' },
        { logo: 'danone', t: 'Danone Deutschland GmbH: agile Transformation in der DACH-Region' },
        { logo: 'septodont', t: 'Septodont GmbH: Rollout von Salesforce Maps' },
        { logo: 'aak', t: 'AAK AB: globaler Salesforce-Sales-Cloud-Rollout' },
        { logo: 'deutsche-telekom', t: 'Deutsche Telekom AG: Salesforce-Prozessoptimierung' },
        { logo: 'karo-heiko', t: 'KaRo / Heiko Companies: Transformation auf Microsoft Dynamics 365' },
        { logo: 'landal', t: 'Landal GreenParks GmbH: Umstrukturierung der Personalabteilung' },
        { logo: 'hologic', t: 'Hologic Deutschland GmbH: Zusammenlegung von drei Standorten' },
        { logo: 'von-rundstedt', t: 'Von Rundstedt: Salesforce-Einführung' },
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
      tags: ['Prosci Change Management Practitioner', 'PRINCE2', 'Professional Scrum Master I', 'Six Sigma Green Belt', 'Personal & Business Coach', 'DISC-Profiling', 'IHK-Ausbildereignung (AEVO)', 'Master Business with AI (MBAI®, seit 2026)'],
      note: 'Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Die Prosci-Zertifizierung hat Juliane Winterscheid, FK Solution Design ist kein Partner von Prosci.',
    },
    more: {
      label: 'Weiterlesen',
      links: [
        { t: 'Masterclass Change Management', d: 'Fünf Kapitel entlang der ADKAR-Stufen für Salesforce-Einführungen.', href: 'masterclass/change-management/' },
        { t: 'Leistung Change Management', d: 'Wie wir Change Management in Ihrem Programm aufsetzen.', href: 'leistungen/change-management/' },
        { t: 'Salesforce Change Management: warum Einführungen scheitern', d: 'Der Einstieg mit ADKAR und den sechs Themen dahinter.', href: 'blog/change-management-salesforce-einfuehrung/' },
      ],
    },
    linkedIn: 'LinkedIn-Profil von Juliane',
    ctaTitle: 'Eine Salesforce-Einführung steht an?',
    ctaText: 'Schreiben Sie uns, wo es hakt oder was ansteht. Ich melde mich und bringe Juliane in das erste Gespräch mit.',
    formSubject: 'Change Management mit Juliane Winterscheid',
  },
  en: {
    title: 'Juliane Winterscheid: change management for Salesforce',
    metaTitle: 'Juliane Winterscheid: change management consultant',
    description:
      'Juliane Winterscheid, Prosci certified change manager from Cologne, supports Salesforce rollouts with Fabian Kramer: ADKAR, sponsors, key users, reinforcement.',
    eyebrow: 'Partner · Change management',
    back: 'All partners',
    lead: 'Juliane Winterscheid is a senior human centered change consultant with more than ten years in management, leadership and consulting. She makes sure people adopt new processes; I make sure the architecture and the releases support them. We work together on change management in Salesforce programs.',
    promises: ['Prosci change practitioner', 'Salesforce rollouts across countries', 'German · English'],
    ctaPrimary: 'Request a call',
    ctaSecondary: 'See projects',
    portraitAlt: 'Portrait of Juliane Winterscheid',
    caption: 'Juliane Winterscheid · Cologne',
    box: {
      label: 'Change management with Juliane Winterscheid',
      role: 'Senior human centered change consultant · Prosci certified change practitioner',
      text: 'I adapted the approach of this masterclass to Salesforce programs together with Juliane, and we work together in programs. She guides sponsors, managers and key users through the change; I make sure the architecture and the releases fit. Juliane has supported global Salesforce rollouts with more than 500 users as change manager.',
      textBlog: 'I deliver change management in Salesforce programs together with Juliane. She guides sponsors, managers and key users through the change; I make sure the architecture and the releases fit.',
      link: 'Profile and references',
    },
    author: {
      label: 'About the author',
      bio: 'Since 2022 Juliane has supported IT transformations as a freelance change manager, including global Salesforce rollouts. Before that she spent more than ten years in management, leadership and consulting, among other roles as country manager DACH. At Hochschule Fresenius she taught "Managing Transformation & Change".',
      more: 'Profile and references',
      // Her card in the shared author box of articles she co-wrote.
      part: 'People and change',
      short: 'Change manager for global Salesforce rollouts, former lecturer in change management at Hochschule Fresenius.',
    },
    facts: [
      { value: '10+', label: 'years in leadership and management' },
      { value: '500+', label: 'users in the largest Salesforce rollout' },
      { value: '20,000+', label: 'employees in the current transformation' },
      { value: '4', label: 'Salesforce projects' },
    ],
    about: {
      label: 'Profile',
      title: 'Change management with an inside view',
      paragraphs: [
        'Juliane knows companies not only from consulting but also from leadership roles: as HR manager, as interim manager for the DACH region and as country manager DACH with 350 employees, 13 direct reports and profit and loss responsibility. She has negotiated restructurings with works councils. So she knows how decisions are made, where resistance comes from and what a team needs to adopt new ways of working. She started out as an industrial clerk and wrote her master\'s thesis on cultural change at ThyssenKrupp Rasselstein.',
        'Since 2022 she has worked as a freelance change manager for IT transformations, including global Salesforce rollouts. She is a Prosci certified change practitioner and a trained business coach, and combines the structured method with hands-on management experience. At Hochschule Fresenius she taught "Managing Transformation & Change" to international management master students in the 2025 summer semester; the course was among the university\'s highest rated.',
      ],
      tagsLabel: 'Industries',
      tags: ['Industrial manufacturing', 'Food manufacturing', 'Consumer goods', 'Medical technology', 'Telecommunications', 'Insurance', 'IT consulting', 'Retail', 'Hospitality', 'Fitness and consumer services', 'Higher education'],
      methodsLabel: 'Workshop formats',
      methods: ['Change leadership', 'Impact analysis', 'ADKAR', 'DISC profiling', 'Retrospective', 'Train the trainer'],
    },
    split: {
      label: 'Working together',
      title: 'Who does what in a Salesforce program',
      intro: 'Change management and architecture belong together: every deviation from the template is also a question of habit, every release a change for people. So we plan both together.',
      leftTitle: 'Juliane: people and change',
      left: [
        { icon: 'analyse', t: 'Diagnosis per group', d: 'At which ADKAR stage are sales, inside sales, service or partners stuck, and what helps there?' },
        { icon: 'steer', t: 'Sponsor plan', d: 'What management visibly does and when, so that backing is more than a slide.' },
        { icon: 'interview', t: 'Communication and coaching', d: 'Messages per group and country, coaching for managers and sponsors.' },
        { icon: 'team', t: 'Key users and training', d: 'Selection, role and training on real cases, so knowledge reaches daily work.' },
        { icon: 'feedback', t: 'Involve the works council early', d: 'Agree with the works council what Salesforce reports on performance and behavior, before it derails the timeline.' },
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
      title: 'Projects in change management and transformation',
      pickLabel: 'Choose a project',
      periodLabel: 'Period',
      scopeLabel: 'Scope',
      roleLabel: 'Role',
      tasksLabel: 'Tasks',
      intro: 'A selection of Juliane\'s projects, with role, scope and tasks as stated in her profile.',
      items: [
        { logo: 'hdi', t: 'HDI Versicherungen AG: global IT transformation (cloudification, data center closure)' },
        { logo: 'danone', t: 'Danone Deutschland GmbH: agile transformation in the DACH region' },
        { logo: 'septodont', t: 'Septodont GmbH: Salesforce Maps rollout' },
        { logo: 'aak', t: 'AAK AB: global Salesforce Sales Cloud rollout' },
        { logo: 'deutsche-telekom', t: 'Deutsche Telekom AG: Salesforce process optimization' },
        { logo: 'karo-heiko', t: 'KaRo / Heiko Companies: Microsoft Dynamics 365 transformation' },
        { logo: 'landal', t: 'Landal GreenParks GmbH: restructuring the HR department' },
        { logo: 'hologic', t: 'Hologic Deutschland GmbH: merging three sites into one' },
        { logo: 'von-rundstedt', t: 'Von Rundstedt: Salesforce implementation' },
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
      tags: ['Prosci Change Management Practitioner', 'PRINCE2', 'Professional Scrum Master I', 'Six Sigma Green Belt', 'Personal & business coach', 'DISC profiling', 'IHK trainer certificate (AEVO)', 'Master Business with AI (MBAI®, since 2026)'],
      note: 'Prosci and ADKAR are registered trademarks of Prosci, Inc. The Prosci certification is held by Juliane Winterscheid; FK Solution Design is not a Prosci partner.',
    },
    more: {
      label: 'Read on',
      links: [
        { t: 'Change management masterclass', d: 'Five chapters along the ADKAR stages for Salesforce rollouts.', href: 'masterclass/change-management/' },
        { t: 'Change management service', d: 'How we set up change management in your program.', href: 'services/change-management-salesforce/' },
        { t: 'Salesforce change management: why rollouts fail', d: 'The starting point with ADKAR and the six topics behind it.', href: 'blog/change-management-salesforce-rollout/' },
      ],
    },
    linkedIn: 'Juliane on LinkedIn',
    ctaTitle: 'A Salesforce rollout is coming up?',
    ctaText: 'Tell us where it is stuck or what is planned. I will get back to you and bring Juliane to the first conversation.',
    formSubject: 'Change management with Juliane Winterscheid',
  },
};

// Reference projects are listed newest first (by start date); Von Rundstedt has no date and stays last.
// Details per reference project, keyed by its `logo` id (period, sector, scope, role, tasks), from her CV 2026.
// Shown in the "project in focus" layout of the start page (docs/layouts.md); `short` names the phone chip.
interface ProjectDetail { short: string; period: string; sector: string; scope: string; role: string; bullets: string[] }
export const julianeProjectDetails: Record<'de' | 'en', Record<string, ProjectDetail>> = {
  de: {
    aak: { short: 'AAK', period: '04/2024 – 09/2024', sector: 'Lebensmittelherstellung', scope: '4.000+ Mitarbeitende · 500+ Anwender', role: 'Senior Human Centered Change Consultant', bullets: [
      'Change-Strategie, Kommunikationsplan und Schulungskonzept (Train-the-Trainer) für den weltweiten Rollout der Sales Cloud',
      'Impact-Analyse und Stakeholder-Bewertung, daraus Pläne, um Führungskräfte zu gewinnen und Hürden bei der Nutzung abzubauen',
      'Eng abgestimmt mit der globalen Programmleitung und dem Salesforce-IT-Team',
      'Coaching der internen Projektleitung im Change Management',
    ] },
    'deutsche-telekom': { short: 'Telekom', period: '02/2024 – 04/2024', sector: 'Telekommunikation', scope: '120.000+ Mitarbeitende weltweit', role: 'Human Centered Change Strategy Consultant', bullets: [
      'Beratung des Projektteams zur Rollout-Strategie für einheitliche Oberflächen in Vertrieb und Service',
      'Change Story geschärft, Kommunikationsplan mit Meilensteinen und konkreten Schritten überarbeitet',
      'Readiness-Analyse mit Interviews und Umfragen',
      'Maßnahmenplan aus den Ergebnissen, vorgestellt im Steuerkreis und in die Rollout-Strategie übernommen',
    ] },
    septodont: { short: 'Septodont', period: '05/2024 – 06/2024', sector: 'Medizintechnik', scope: '2.400 Mitarbeitende weltweit', role: 'Organizational Change Consultant und Executive Coach', bullets: [
      'Strategie für den Rollout von Salesforce Maps im Außendienst',
      'Kommunikationsplan und Kernbotschaften',
      '1:1-Coaching des Geschäftsführers im Umgang mit Widerstand und in der Führung durch die Veränderung',
    ] },
    'von-rundstedt': { short: 'Von Rundstedt', period: '', sector: 'Personalberatung', scope: 'Salesforce-Einführung', role: 'IT-Projektmanagerin', bullets: [
      'Begleitung der Salesforce-Einführung vom Kick-off bis zum Rollout',
    ] },
    hdi: { short: 'HDI', period: 'seit 12/2025', sector: 'Versicherung', scope: '20.000+ Mitarbeitende · 19 Länder', role: 'Senior Change Manager', bullets: [
      'Change Management und Kommunikation für die Rechenzentrums-Schließung, von der Planung bis zur Umsetzung',
      'Weltweite Change-Netzwerke, Key-User-Communities und Multiplikatoren aufgebaut',
      'Wirkung mit Kennzahlen gemessen und die Maßnahmen laufend nachgeschärft',
      'Formate je Zielgruppe, digital und vor Ort',
      'Coaching von Führungskräften und wichtigen Stakeholdern',
    ] },
    'karo-heiko': { short: 'KaRo', period: '09/2023 – 03/2024', sector: 'Maschinenbau', scope: 'Nach Übernahme durch einen Finanzinvestor', role: 'Organizational Change Management Consultant', bullets: [
      'Change-Strategie nach Prosci für die Einführung von Microsoft Dynamics 365 ERP',
      'Widerstandsmanagement, Kommunikationsplan und Schulungskonzept',
      'Abstimmung mit den IT-Beratern, damit Einführung, Schulung und Kommunikation zusammenpassen',
      'Reporting an CIO und Director OCM des US-Eigentümers zu Akzeptanz, Risiken und Fortschritt',
    ] },
    danone: { short: 'Danone', period: '10/2024 – 06/2025', sector: 'Konsumgüter', scope: 'Alle Marken in DACH · ca. 2.000 Mitarbeitende', role: 'Project & Change Manager', bullets: [
      'Verantwortlich für die Säule „Systeme, Prozesse und neue Arbeitsweisen“ der agilen Transformation',
      'Partnerin von PMO und Stream Leads, strategische Beratung aus Sicht des Change Managements',
      'Workshops zu Change-Strategie, Impact-Analyse, Stakeholdern, Widerstand, Kick-offs und Retrospektiven',
      'Schulungs- und Befähigungsprogramme gesteuert und ausgerollt',
    ] },
    hologic: { short: 'Hologic', period: '06/2022 – 12/2022', sector: 'Medizintechnik', scope: 'Drei Standorte an einen · 150+ Mitarbeitende', role: 'Interim HR Operations Manager DACH', bullets: [
      'Zusammenlegung von drei Gesellschaften an einen neuen Standort, HR-seitig komplett verantwortet',
      'Verhandlungen mit dem Betriebsrat zu Sozialplan und Interessenausgleich, gemeinsam mit Geschäftsführung und Anwälten',
      'Coaching der Führungskräfte für Gespräche und Kommunikation in der Veränderung',
      'Kommunikation an die Mitarbeitenden während der Umstrukturierung',
    ] },
    landal: { short: 'Landal', period: '10/2022 – 03/2023', sector: 'Hotellerie', scope: '500+ Mitarbeitende in DACH', role: 'Interim HR Manager DACH', bullets: [
      'Strategische Partnerin aller Führungskräfte, Berichtslinie an Geschäftsführer und internationale Personalleitung',
      'HR-Team neu aufgestellt und Prozesse ausgelagert',
      'Neue Vereinbarung mit dem Betriebsrat',
      'Change-Beratung im Krisenteam',
    ] },
  },
  en: {
    aak: { short: 'AAK', period: '04/2024 – 09/2024', sector: 'Food manufacturing', scope: '4,000+ employees · 500+ users', role: 'Senior human centered change consultant', bullets: [
      'Change strategy, communication plan and train-the-trainer concept for the global Sales Cloud rollout',
      'Impact analysis and stakeholder assessment, turned into plans to win over managers and remove adoption barriers',
      'Closely aligned with global program leadership and the Salesforce IT team',
      'Coaching the internal project manager on change management',
    ] },
    'deutsche-telekom': { short: 'Telekom', period: '02/2024 – 04/2024', sector: 'Telecommunications', scope: '120,000+ employees worldwide', role: 'Human centered change strategy consultant', bullets: [
      'Advised the project team on the rollout strategy for harmonized sales and service interfaces',
      'Sharpened the change story, reworked the communication plan with milestones and concrete steps',
      'Readiness assessment with interviews and surveys',
      'Action plan from the findings, presented to the steering committee and built into the rollout strategy',
    ] },
    septodont: { short: 'Septodont', period: '05/2024 – 06/2024', sector: 'Medical technology', scope: '2,400 employees worldwide', role: 'Organizational change consultant and executive coach', bullets: [
      'Strategy for rolling out Salesforce Maps to the field team',
      'Communication plan and key messages',
      'One-to-one coaching of the managing director on handling resistance and leading through change',
    ] },
    'von-rundstedt': { short: 'Von Rundstedt', period: '', sector: 'HR consulting', scope: 'Salesforce implementation', role: 'IT project manager', bullets: [
      'Supported the Salesforce implementation from kick-off to rollout',
    ] },
    hdi: { short: 'HDI', period: 'since 12/2025', sector: 'Insurance', scope: '20,000+ employees · 19 countries', role: 'Senior change manager', bullets: [
      'Change management and communication for the data center closure, from planning to delivery',
      'Built global change networks, key user communities and multipliers',
      'Measures impact with KPIs and keeps sharpening the activities',
      'Formats per target group, digital and on site',
      'Coaching for managers and key stakeholders',
    ] },
    'karo-heiko': { short: 'KaRo', period: '09/2023 – 03/2024', sector: 'Machinery', scope: 'After acquisition by a private equity investor', role: 'Organizational change management consultant', bullets: [
      'Change strategy based on Prosci for the Microsoft Dynamics 365 ERP rollout',
      'Resistance management, communication plan and training concept',
      'Aligned with the IT consultants so that rollout, training and communication fit together',
      'Reporting to the CIO and director OCM of the US owner on adoption, risks and progress',
    ] },
    danone: { short: 'Danone', period: '10/2024 – 06/2025', sector: 'Consumer goods', scope: 'All brands in DACH · approx. 2,000 employees', role: 'Project and change manager', bullets: [
      'Responsible for the pillar "systems, processes and new ways of working" of the agile transformation',
      'Partner to the PMO and stream leads, strategic advice from a change management view',
      'Workshops on change strategy, impact analysis, stakeholders, resistance, kick-offs and retrospectives',
      'Managed and rolled out training and enablement programs',
    ] },
    hologic: { short: 'Hologic', period: '06/2022 – 12/2022', sector: 'Medical technology', scope: 'Three sites into one · 150+ employees', role: 'Interim HR operations manager DACH', bullets: [
      'Merged three entities into one new site, fully responsible for the HR side',
      'Negotiations with the works council on social plan and reconciliation of interests, with management and lawyers',
      'Coached managers on conversations and communication during the change',
      'Communication to employees throughout the restructuring',
    ] },
    landal: { short: 'Landal', period: '10/2022 – 03/2023', sector: 'Hospitality', scope: '500+ employees in DACH', role: 'Interim HR manager DACH', bullets: [
      'Strategic partner to all managers, reporting to the managing director and the international head of HR',
      'Rebuilt the HR team and outsourced processes',
      'New agreement with the works council',
      'Change advice in the crisis team',
    ] },
  },
};
