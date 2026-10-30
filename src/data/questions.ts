// "Questions I ask in every project": content of /fragen/ (DE) and /en/questions/ (EN).
// Each question is also part of the page's FAQPage schema.

export interface QuestionGroup {
  title: string;
  // Short name for the topic tiles at the top of the page.
  short: string;
  // Icon from src/icons/.
  icon: string;
  questions: { q: string; a: string }[];
}

export const questionPaths = { de: 'fragen/', en: 'questions/' } as const;

export const questions = {
  de: {
    title: 'Fragen, die ich in jedem Salesforce-Projekt stelle',
    description:
      'Die 14 Fragen, die Fabian Kramer vor jeder Salesforce-Architektur stellt: zu Ziel und Termin, Partnern, ERP-Schnittstellen, Datenmengen, Betrieb und Lizenzen.',
    eyebrow: 'Arbeitsweise',
    lead: 'Bevor ich eine Architektur zeichne, stelle ich Fragen. Meistens dieselben, und meistens sind die Antworten interessanter als das Lastenheft. Hier ist die Liste. Wenn Sie bei drei davon keine schnelle Antwort haben, lohnt sich ein Gespräch.',
    groups: [
      {
        title: 'Zu Ziel und Termin',
        short: 'Ziel und Termin',
        icon: 'target',
        questions: [
          {
            q: 'Welches Problem soll in einem Jahr nicht mehr existieren?',
            a: 'Nicht „Salesforce einführen“, sondern zum Beispiel: Serviceeinsätze ohne Rückfragen planen. Ohne dieses Ziel misst niemand, ob das Projekt etwas gebracht hat.',
          },
          {
            q: 'Woran merkt der Fachbereich, dass es funktioniert?',
            a: 'Eine Zahl, die heute schon jemand erhebt. Wenn es keine gibt, ist das der erste Arbeitspunkt.',
          },
          {
            q: 'Muss das wirklich in Salesforce?',
            a: 'Manche Anforderung gehört ins ERP, in die Telefonanlage oder in ein spezialisiertes Tool. Die Frage ist günstiger vor der Umsetzung als danach.',
          },
          {
            q: 'Was passiert, wenn der Go-live nicht zum geplanten Termin kommt?',
            a: 'Die Folgen sind meist teurer als gedacht: Der Vertrag für das Altsystem läuft weiter, das Partnerteam bleibt länger an Bord, der Fachbereich pflegt Daten doppelt, und das Vertrauen in das Projekt sinkt mit jeder Verschiebung. Wer diese Kosten pro Monat kennt, kann entscheiden, ob ein kleinerer erster Go-live besser ist als ein später großer.',
          },
        ],
      },
      {
        title: 'Zu Verantwortung und Partnern',
        short: 'Verantwortung und Partner',
        icon: 'handshake',
        questions: [
          {
            q: 'Wer entscheidet, wenn zwei Partner unterschiedliche Lösungen vorschlagen?',
            a: 'Wenn die Antwort „der lauteste“ ist, fehlt eine Architekturrolle.',
          },
          {
            q: 'Wem gehören Repository, Pipeline und Backlog?',
            a: 'Liegen sie beim Implementierungspartner, wird ein Partnerwechsel teuer.',
          },
          {
            q: 'Wer prüft, was die Partner liefern, bevor es in die Abnahme geht?',
            a: 'Probleme, die erst im UAT oder in Produktion auftauchen, kosten ein Vielfaches.',
          },
        ],
      },
      {
        title: 'Zu Daten und Schnittstellen',
        short: 'Daten und Schnittstellen',
        icon: 'integration',
        questions: [
          {
            q: 'Welches System ist für Kunden, Produkte und Preise führend?',
            a: 'Manufacturing-Projekte scheitern selten in Salesforce. Sie scheitern an der ERP-Schnittstelle und an doppelten Stammdaten.',
          },
          {
            q: 'Was passiert, wenn die Schnittstelle zum ERP eine Stunde ausfällt?',
            a: 'Wenn das niemand weiß, ist es noch nicht entschieden.',
          },
          {
            q: 'Wie viele Daten sind in drei Jahren im System?',
            a: 'Was mit 10.000 Datensätzen läuft, kann bei 10 Millionen stehen bleiben. Sharing-Modell und Automatisierungen müssen das von Anfang an aushalten.',
          },
        ],
      },
      {
        title: 'Zum Betrieb',
        short: 'Betrieb',
        icon: 'gear',
        questions: [
          {
            q: 'Wer betreibt das in drei Jahren?',
            a: 'Wenn alle Antworten auf diese Frage Namen von Externen sind, fehlt ein Plan für die Übergabe.',
          },
          {
            q: 'Wie kommt eine Änderung in Produktion, und wer kann sie zurückdrehen?',
            a: 'Drei Releases im Jahr von Salesforce plus eigene Releases brauchen einen Prozess, nicht Mut.',
          },
          {
            q: 'Was kosten die Lizenzen, wenn der Rollout fertig ist?',
            a: 'Die Lizenzprognose gehört in die Architekturentscheidung, nicht in die Budgetrunde danach.',
          },
        ],
      },
      {
        title: 'Zum Schluss',
        short: 'Zum Schluss',
        icon: 'lessons',
        questions: [
          {
            q: 'Was wurde schon einmal versucht und hat nicht funktioniert?',
            a: 'Die ehrlichste Antwort im ganzen Projekt. Sie spart oft Monate.',
          },
        ],
      },
    ] as QuestionGroup[],
    ctaTitle: 'Sie haben bei einigen Fragen gezögert?',
    ctaText: 'In 30 Minuten finden wir heraus, welche davon für Ihr Programm gerade am meisten kostet.',
    formSubject: 'Fragen aus dem Projekt',
    link: 'Fragen, die ich in jedem Projekt stelle',
    back: 'Zurück zur Startseite',
    topics: 'Themen',
    count: (n: number) => (n === 1 ? '1 Frage' : `${n} Fragen`),
    // Figures strip under the page head; question and topic counts come from the groups.
    stats: {
      questions: 'Fragen vor jeder Architektur',
      topics: 'Themen von Ziel bis Lizenz',
      more: [
        { value: '3', text: 'Fragen ohne schnelle Antwort: Zeit für ein Gespräch' },
        { value: '30', text: 'Minuten Erstgespräch, kein Pitch' },
      ],
    },
    quoteLead: 'Und die Frage, die ich am Ende immer stelle:',
    quote: 'Was schon einmal gescheitert ist, ist die ehrlichste Antwort im ganzen Projekt. Sie spart oft Monate.',
    quoteCaption: 'Frage 14',
  },
  en: {
    title: 'Questions I ask in every Salesforce project',
    description:
      'The 14 questions Fabian Kramer asks before any Salesforce architecture: on goal and deadline, partners, ERP interfaces, data volumes, operations and licences.',
    eyebrow: 'How I work',
    lead: 'Before I draw an architecture, I ask questions. Mostly the same ones, and mostly the answers are more interesting than the requirements document. Here is the list. If you have no quick answer to three of them, a call is worth it.',
    groups: [
      {
        title: 'Goal and deadline',
        short: 'Goal and deadline',
        icon: 'target',
        questions: [
          {
            q: 'Which problem should no longer exist a year from now?',
            a: 'Not "introduce Salesforce", but for example: plan service visits without calling back for details. Without that goal nobody measures whether the project achieved anything.',
          },
          {
            q: 'How will the business know that it works?',
            a: 'A number that someone already collects today. If there is none, that is the first work item.',
          },
          {
            q: 'Does this really belong in Salesforce?',
            a: 'Some requirements belong in the ERP, the phone system or a specialised tool. The question is cheaper before the build than after it.',
          },
          {
            q: 'What happens if the go-live does not happen on the planned date?',
            a: 'The consequences are usually more expensive than expected: the contract for the old system keeps running, the partner team stays on board longer, the business maintains data twice, and trust in the project drops with every delay. If you know these costs per month, you can decide whether a smaller first go-live beats a big one that comes late.',
          },
        ],
      },
      {
        title: 'Ownership and partners',
        short: 'Ownership and partners',
        icon: 'handshake',
        questions: [
          {
            q: 'Who decides when two partners propose different solutions?',
            a: 'If the answer is "the loudest one", an architecture role is missing.',
          },
          {
            q: 'Who owns the repository, the pipeline and the backlog?',
            a: 'If they sit with the implementation partner, changing partners gets expensive.',
          },
          {
            q: 'Who reviews what the partners deliver before it goes into acceptance?',
            a: 'Problems that only show up in UAT or production cost many times more.',
          },
        ],
      },
      {
        title: 'Data and interfaces',
        short: 'Data and interfaces',
        icon: 'integration',
        questions: [
          {
            q: 'Which system is the master for customers, products and prices?',
            a: 'Manufacturing projects rarely fail in Salesforce. They fail at the ERP interface and on duplicate master data.',
          },
          {
            q: 'What happens if the ERP interface is down for an hour?',
            a: 'If nobody knows, it has not been decided yet.',
          },
          {
            q: 'How much data will be in the system in three years?',
            a: 'What runs with 10,000 records can grind to a halt at 10 million. The sharing model and the automations have to handle that from day one.',
          },
        ],
      },
      {
        title: 'Operations',
        short: 'Operations',
        icon: 'gear',
        questions: [
          {
            q: 'Who runs this in three years?',
            a: 'If every answer to this question is the name of an external person, a handover plan is missing.',
          },
          {
            q: 'How does a change get into production, and who can roll it back?',
            a: 'Three Salesforce releases a year plus your own releases need a process, not courage.',
          },
          {
            q: 'What will the licences cost once the rollout is done?',
            a: 'The licence forecast belongs in the architecture decision, not in the budget round afterwards.',
          },
        ],
      },
      {
        title: 'One last question',
        short: 'One last question',
        icon: 'lessons',
        questions: [
          {
            q: 'What has been tried before and did not work?',
            a: 'The most honest answer in the whole project. It often saves months.',
          },
        ],
      },
    ] as QuestionGroup[],
    ctaTitle: 'Did you hesitate on some of these?',
    ctaText: 'In 30 minutes we find out which of them is costing your programme the most right now.',
    formSubject: 'Questions about the project',
    link: 'Questions I ask in every project',
    back: 'Back to the start page',
    topics: 'Topics',
    count: (n: number) => (n === 1 ? '1 question' : `${n} questions`),
    stats: {
      questions: 'questions before any architecture',
      topics: 'topics from goal to licences',
      more: [
        { value: '3', text: 'questions without a quick answer: time for a call' },
        { value: '30', text: 'minutes first call, no pitch' },
      ],
    },
    quoteLead: 'And the question I always ask at the end:',
    quote: 'What has failed before is the most honest answer in the whole project. It often saves months.',
    quoteCaption: 'question 14',
  },
};
