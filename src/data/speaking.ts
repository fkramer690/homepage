// Talks and community work for the speaker page (/speaking, /de/speaking).
// Add new appearances to the matching talk; a new talk gets its own entry.

type Text = { en: string; de: string };

export interface Appearance {
  event: string;
  city: Text;
  country: string;
  // ISO date when known, otherwise just the year.
  date: string;
  url?: string;
}

export interface Talk {
  title: string;
  coSpeaker?: string;
  abstract: Text;
  points: { en: string[]; de: string[] };
  appearances: Appearance[];
  recording?: { url: string; label: Text };
}

export const talks: Talk[] = [
  {
    title: 'Speed and scalability matters – How to measure Flow Performance',
    abstract: {
      en: 'A flow that runs fine with ten test records can time out at the first data migration. In this session I show how to measure what a Salesforce Flow really costs in CPU time, SOQL queries and DML statements, where the bottlenecks usually sit, and which changes make the biggest difference. For admins, developers and architects who build flows that have to survive real data volumes.',
      de: 'Ein Flow, der mit zehn Testdatensätzen sauber läuft, kann bei der ersten Datenmigration in ein Timeout laufen. In dieser Session zeige ich, wie man misst, was ein Salesforce Flow wirklich an CPU-Zeit, SOQL-Abfragen und DML-Operationen kostet, wo die Engpässe meistens sitzen und welche Änderungen am meisten bringen. Für Admins, Entwickler und Architekten, deren Flows echte Datenmengen aushalten müssen.',
    },
    points: {
      en: [
        'Which metrics tell you whether a flow scales',
        'Tools to measure flow runtime and governor limit usage',
        'Typical bottlenecks and the fixes that pay off first',
      ],
      de: [
        'Welche Kennzahlen zeigen, ob ein Flow skaliert',
        'Werkzeuge, um Laufzeit und Governor-Limit-Verbrauch zu messen',
        'Typische Engpässe und die Korrekturen, die sich zuerst lohnen',
      ],
    },
    appearances: [
      { event: "YeurDreamin' 2025", city: { en: 'Rotterdam', de: 'Rotterdam' }, country: 'NL', date: '2025-03-21' },
      { event: "Czech Dreamin' 2025", city: { en: 'Prague', de: 'Prag' }, country: 'CZ', date: '2025-05-30' },
      { event: "London's Calling 2025", city: { en: 'London', de: 'London' }, country: 'GB', date: '2025-06-06' },
    ],
    recording: {
      url: 'https://vimeo.com/1098825315/f7e9556eb2',
      label: { en: 'Watch the recording', de: 'Aufzeichnung ansehen' },
    },
  },
  {
    title: 'Aim for Flow Excellence with the Lightning Flow Scanner',
    coSpeaker: 'Nicolas Vuillamy',
    abstract: {
      en: 'The Lightning Flow Scanner is a free, open-source tool that checks Salesforce Flows against more than 20 community rules: hard-coded IDs, DML and SOQL inside loops, missing fault paths, recursion risks. Together with Nicolas Vuillamy I showed how to run it from the Salesforce CLI, VS Code and a CI pipeline, so flow problems show up in the pull request instead of in production.',
      de: 'Der Lightning Flow Scanner ist ein kostenloses Open-Source-Werkzeug, das Salesforce Flows gegen mehr als 20 Community-Regeln prüft: hart codierte IDs, DML und SOQL in Schleifen, fehlende Fault-Pfade, Rekursionsrisiken. Zusammen mit Nicolas Vuillamy habe ich gezeigt, wie man ihn über die Salesforce CLI, in VS Code und in einer CI-Pipeline einsetzt, damit Flow-Probleme im Pull Request auffallen und nicht in Produktion.',
    },
    points: {
      en: [
        'The rules behind the scanner and what they catch',
        'Running it as CLI plugin, VS Code extension and GitHub Action',
        'Blocking or non-blocking reports in the release pipeline',
      ],
      de: [
        'Die Regeln hinter dem Scanner und was sie finden',
        'Einsatz als CLI-Plugin, VS-Code-Erweiterung und GitHub Action',
        'Blockierende oder nicht blockierende Berichte in der Release-Pipeline',
      ],
    },
    appearances: [
      {
        event: "French Touch Dreamin' 2023",
        city: { en: 'Paris', de: 'Paris' },
        country: 'FR',
        date: '2023',
        url: 'https://frenchtouchdreamin.com/index.php/french-touch-dreamin-2023/',
      },
    ],
    recording: {
      url: 'https://www.youtube.com/watch?v=IwyG96hV6ZU',
      label: { en: 'Watch the recording', de: 'Aufzeichnung ansehen' },
    },
  },
];

// Appearances without a session of their own on this page.
export const moreAppearances: { title: Text; text: Text; url?: string; linkLabel?: Text }[] = [
  {
    title: { en: "French Touch Dreamin' 2024, Paris", de: "French Touch Dreamin' 2024, Paris" },
    text: {
      en: 'Back in Paris a year later as a speaker at the French Salesforce community conference.',
      de: 'Ein Jahr später wieder in Paris, als Speaker auf der französischen Salesforce-Community-Konferenz.',
    },
    url: 'https://www.youtube.com/watch?v=YS6ScdxelO4',
    linkLabel: { en: 'Event recap video', de: 'Video-Rückblick auf das Event' },
  },
  {
    title: { en: 'Salesforce User Group Cologne', de: 'Salesforce User Group Köln' },
    text: {
      en: 'Co-leader of the Cologne Trailblazer Community Group. I organise meetups and regularly give talks there myself.',
      de: 'Co-Leader der Kölner Trailblazer Community Group. Ich organisiere die Treffen mit und halte dort regelmäßig selbst Vorträge.',
    },
    url: 'https://trailblazercommunitygroups.com/salesforce-user-group-cologne-germany/',
    linkLabel: { en: 'Group page', de: 'Seite der Gruppe' },
  },
  {
    title: { en: 'Community events in Germany', de: 'Community-Events in Deutschland' },
    text: {
      en: 'Further talks at national Salesforce community events.',
      de: 'Weitere Vorträge auf nationalen Salesforce-Community-Events.',
    },
  },
];

export const copy = {
  en: {
    title: 'Speaker & events',
    metaTitle: 'Speaker & events | FK Solution Design',
    description:
      'Talks by Fabian Kramer at Salesforce community conferences across Europe: Flow performance, Flow quality with the Lightning Flow Scanner, and the Cologne user group.',
    lead: 'Since 2023 I have spoken at Salesforce community conferences in Paris, Rotterdam, Prague and London, and I co-lead the Salesforce User Group in Cologne. My talks are about the things that break in real orgs: flows that do not scale, quality checks nobody runs, releases without a safety net. I show it live in an org instead of on slides.',
    talksTitle: 'Talks',
    with: 'with',
    stagesLabel: 'Presented at',
    moreTitle: 'More on stage',
    topicsTitle: 'Topics for your event',
    topicsText: 'Beyond the talks above, I speak about the topics I work on every day:',
    topics: [
      'Salesforce Flow: quality, performance and testing',
      'DevOps and release pipelines with sfdx-hardis',
      'Steering implementation partners from the client side',
      'Field Service in practice',
    ],
    formatsText: 'Conference talk, live demo or internal session for your team, in English or German.',
    photoAlt: 'Fabian Kramer giving a live demo on stage at a Salesforce community event',
    photoCaption: 'Live demo instead of slideware.',
    ctaTitle: 'Looking for a speaker?',
    ctaText: 'For a community event, a conference or an internal session with your Salesforce team: send me the date, the audience and the topic you have in mind.',
    formSubject: 'Speaking request',
    back: 'Back to the start page',
  },
  de: {
    title: 'Vorträge & Events',
    metaTitle: 'Vorträge & Events | FK Solution Design',
    description:
      'Vorträge von Fabian Kramer auf Salesforce-Community-Konferenzen in Europa: Flow-Performance, Flow-Qualität mit dem Lightning Flow Scanner und die User Group Köln.',
    lead: 'Seit 2023 spreche ich auf Salesforce-Community-Konferenzen in Paris, Rotterdam, Prag und London, und ich leite die Salesforce User Group in Köln mit. In meinen Vorträgen geht es um das, was in echten Orgs kaputtgeht: Flows, die nicht skalieren, Qualitätsprüfungen, die niemand laufen lässt, Releases ohne Sicherheitsnetz. Ich zeige das live in einer Org statt auf Folien.',
    talksTitle: 'Vorträge',
    with: 'mit',
    stagesLabel: 'Gehalten auf',
    moreTitle: 'Weitere Auftritte',
    topicsTitle: 'Themen für Ihr Event',
    topicsText: 'Neben den Vorträgen oben spreche ich über die Themen, mit denen ich jeden Tag arbeite:',
    topics: [
      'Salesforce Flow: Qualität, Performance und Tests',
      'DevOps und Release-Pipelines mit sfdx-hardis',
      'Implementierungspartner aus Kundensicht steuern',
      'Field Service in der Praxis',
    ],
    formatsText: 'Konferenzvortrag, Live-Demo oder interne Session für Ihr Team, auf Deutsch oder Englisch.',
    photoAlt: 'Fabian Kramer bei einer Live-Demo auf der Bühne eines Salesforce-Community-Events',
    photoCaption: 'Live-Demo statt Foliensatz.',
    ctaTitle: 'Sie suchen einen Speaker?',
    ctaText: 'Für ein Community-Event, eine Konferenz oder eine interne Session mit Ihrem Salesforce-Team: Schicken Sie mir Termin, Publikum und das Thema, das Sie im Kopf haben.',
    formSubject: 'Vortragsanfrage',
    back: 'Zurück zur Startseite',
  },
};
