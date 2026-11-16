// "KI-Readiness-Check": offer page /salesforce-ki-readiness-check/ (DE) and
// /en/salesforce-ai-readiness-check/ (EN), the entry package A of AI-native Delivery
// (3 days, fixed price). Rendered by src/components/ReadinessCheckPage.astro, whose
// graphics follow the offer PDF (comparison, decision brief, license example, timelines,
// quality gates).
// Facts only from the offer PDF (public/downloads/angebot-ai-native-delivery.pdf, 15.11.2026)
// and Fabian's answers of 15.11.2026: the agent runs on Fabian's Claude access, reads metadata
// only, no repository = first finding, partner orgs fine, code belongs to the client,
// no obligation to continue. Prices of packages B and C stay in the PDF only.

type Fact = { value: string; label: string };
type Item = { icon: string; t: string; d: string };
type Linked = Item & { link: string; linkText: string };

export interface ReadinessCheckContent {
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  promises: string[];
  portraitAlt: string;
  facts: Fact[];
  compare: {
    label: string;
    title: string;
    intro: string;
    colOld: string;
    colOldNote: string;
    colNew: string;
    colNewNote: string;
    rows: { k: string; old: string; now: string }[];
  };
  situations: { label: string; title: string; intro: string; items: Linked[] };
  results: {
    label: string;
    title: string;
    intro: string;
    listTitle: string;
    items: Item[];
    cta: string;
    paper: {
      title: string;
      maturity: string;
      areas: { k: string; v: number }[];
      plan: string;
      months: { m: string; t: string }[];
      caption: string;
    };
    licence: {
      title: string;
      parts: { n: string; t: string; who: string; price: string }[];
      sum: { t: string; who: string; price: string };
      note: string;
    };
  };
  process: {
    label: string;
    title: string;
    intro: string;
    steps: { tag: string; t: string; d: string }[];
    meta: { k: string; v: string }[];
  };
  principles: {
    label: string;
    title: string;
    intro: string;
    items: Item[];
    gatesTitle: string;
    gates: { t: string; who: string }[];
    note: string;
    links: { text: string; link: string; linkText: string }[];
  };
  practice: { label: string; title: string; items: string[] };
  offer: {
    label: string;
    title: string;
    pkg: string;
    name: string;
    price: string;
    priceNote: string;
    who: string;
    entryTitle: string;
    entry: { tag: string; t: string; d: string }[];
    termsTitle: string;
    terms: string[];
    cta: string;
    pdfText: string;
    nextTitle: string;
    next: { tag: string; t: string; who: string; d: string }[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  formSubject: string;
}

export const kiReadinessCheckPaths = {
  de: 'salesforce-ki-readiness-check/',
  en: 'salesforce-ai-readiness-check/',
} as const;

// Offer PDF (German only); robots.txt keeps it out of search results.
export const offerPdf = 'downloads/angebot-ai-native-delivery.pdf';

export const kiReadinessCheck: { de: ReadinessCheckContent; en: ReadinessCheckContent } = {
  de: {
    title: 'KI-Readiness-Check für Ihr Salesforce-Team',
    metaTitle: 'Salesforce-KI-Readiness-Check: 3 Tage zum Festpreis',
    description:
      'Zum Festpreis analysiert ein KI-Agent in drei Tagen Ihre Salesforce-Org und setzt eine Story aus Ihrem Backlog bis zum Pull Request in der Sandbox um.',
    eyebrow: 'AI-native Delivery · Einstieg',
    lead: 'Nach drei Tagen wissen Sie, was ein KI-Agent in Ihrer Salesforce-Org leisten kann und welche Voraussetzungen noch fehlen. Der Agent analysiert Org und Pipeline und setzt gemeinsam mit Ihrem Team eine Story aus Ihrem Backlog bis zum Pull Request in der Sandbox um. Sie erhalten eine Entscheidungsvorlage mit Reifegradbewertung, 90-Tage-Plan und Lizenzempfehlung.',
    ctaPrimary: 'Readiness-Check besprechen',
    ctaSecondary: 'Ablauf und Preis',
    promises: ['3.900 € Festpreis netto', 'Kein Zugriff auf die Produktion', 'Keine Provisionen'],
    portraitAlt: 'Porträt von Fabian Kramer',
    facts: [
      { value: '3', label: 'Tage, einer davon vor Ort' },
      { value: '1', label: 'Story aus Ihrem Backlog bis zum Pull Request' },
      { value: '6', label: 'Bereiche in der Reifegradbewertung' },
      { value: '50 %', label: 'des Festpreises werden auf ein Folgeprojekt angerechnet' },
    ],
    compare: {
      label: 'AI-native Delivery',
      title: 'Vom KI-Assistenten zum KI-Agenten im Lieferprozess',
      intro: 'AI-native Delivery bedeutet, dass der Lieferprozess auf die Arbeit mit einem KI-Agenten ausgerichtet ist. Der Agent analysiert die Org und erstellt Protokolle, Stories, Konfiguration, Code und Tests. Ihr Team stimmt sich mit dem Fachbereich ab, prüft die Ergebnisse und entscheidet.',
      colOld: 'KI-gestützt',
      colOldNote: 'heute üblich',
      colNew: 'AI-native',
      colNewNote: 'das Ziel',
      rows: [
        { k: 'Einsatz', old: 'Einzelne Entwickler nutzen einen Assistenten.', now: 'Tickets sind Spezifikationen, die ein KI-Agent ohne Rückfragen umsetzen kann.' },
        { k: 'Prozess', old: 'Prozess, Rollen und Prüfungen bleiben unverändert.', now: 'Der KI-Agent hat eine eigene Identität mit klar begrenzten Rechten.' },
        { k: 'Wirkung', old: 'Der Nutzen bleibt auf einzelne Personen begrenzt und ist kaum messbar.', now: 'Die Durchlaufzeit sinkt, und jede Änderung bleibt nachvollziehbar.' },
      ],
    },
    situations: {
      label: 'Typische Anlässe',
      title: 'Wann sich der Readiness-Check lohnt',
      intro: 'Viele Salesforce-Teams nutzen KI-Werkzeuge bereits, aber ohne gemeinsamen Prozess. Der Check zeigt, wie weit Ihr Team vorbereitet ist und was vor einem breiten Einsatz geklärt werden muss.',
      items: [
        { icon: 'ai', t: 'KI-Assistenten ohne gemeinsame Regeln', d: 'Einzelne Entwickler arbeiten mit unterschiedlichen Assistenten, ohne Regeldatei und ohne gemeinsame Prüfungen. Der Nutzen bleibt auf einzelne Personen begrenzt und lässt sich kaum messen.', link: 'blog/ki-regeldatei-salesforce-repository/', linkText: 'Was in eine KI-Regeldatei gehört' },
        { icon: 'contract', t: 'Ihr Implementierungspartner arbeitet mit KI', d: 'Er setzt Coding-Agenten ein und rechnet weiterhin nach Aufwand ab. Bevor Sie Verträge anpassen, sollten Sie wissen, welcher Aufwand für eine Umsetzung mit Agenten realistisch ist.', link: 'blog/festpreis-statt-aufwand-ki-salesforce/', linkText: 'Festpreis statt Aufwand' },
        { icon: 'team', t: 'Betriebsrat und Datenschutzverantwortliche haben Fragen', d: 'Welche Daten verarbeitet das Modell, wo werden sie verarbeitet, und lässt sich die Arbeit einzelner Personen auswerten? Diese Fragen sollten vor dem ersten Pilotprojekt beantwortet sein.', link: 'blog/ki-coding-betriebsrat-dsgvo/', linkText: 'KI-Coding, Betriebsrat und DSGVO' },
        { icon: 'license', t: 'Sie bereiten eine Lizenzentscheidung vor', d: 'Claude Code, GitHub Copilot oder Agentforce Vibes unterscheiden sich bei Kosten, Datenfluss und Einbindung in die Pipeline. Die Entscheidung sollte auf den Anforderungen Ihrer Org beruhen, nicht auf einer Produktdemo.', link: 'blog/agentforce-vibes-claude-code-copilot-vergleich/', linkText: 'Vibes, Claude Code und Copilot im Vergleich' },
        { icon: 'target', t: 'Unklare Akzeptanzkriterien', d: 'Ein Agent braucht präzise Akzeptanzkriterien, um eine Story wie beschrieben umzusetzen. Im Check prüfen wir an einer echten Story, ob Ihre Tickets als Spezifikation ausreichen.', link: 'blog/ki-native-salesforce-delivery-prozess/', linkText: 'Der KI-native Delivery-Prozess' },
        { icon: 'pipeline', t: 'Die Pipeline prüft noch nicht automatisch', d: 'Ohne automatische Prüfungen muss jede Änderung, die der Agent erstellt, von Hand geprüft werden, und diese Reviews werden schnell zum Engpass. Der Check zeigt, welche Prüfschritte fehlen und mit welchem Sie beginnen sollten.', link: 'blog/quality-gates-ki-code-salesforce-pipeline/', linkText: 'Quality Gates für KI-Code' },
      ],
    },
    results: {
      label: 'Ergebnisse',
      title: 'Was Sie nach drei Tagen erhalten',
      intro: 'Der Check richtet sich an CIOs und CRM-Leitungen, die vor einer Entscheidung wissen wollen, welchen Nutzen ein KI-Agent in ihrer Org bringen kann und welche Voraussetzungen noch fehlen.',
      listTitle: 'Ergebnisse des Readiness-Checks',
      items: [
        { icon: 'search', t: 'Reifegradbewertung in sechs Bereichen', d: 'Ausgangslage Ihres Teams und fehlende Voraussetzungen in den sechs Bereichen Repository, Pipeline, Sandboxes, Ticketqualität, Regeln und Datenschutz' },
        { icon: 'calendar', t: '90-Tage-Plan', d: 'Maßnahmen mit Verantwortlichen und Terminen' },
        { icon: 'budget', t: 'Lizenzempfehlung und Kostenschätzung', d: 'Passende Lizenzen für jede Rolle im Team, mit monatlichen Kosten zum Listenpreis' },
        { icon: 'pipeline', t: 'Ein Pull Request aus Ihrem Backlog', d: 'Die Story aus der Live-Umsetzung, mit Tests, in Ihrem Repository. Der Code gehört Ihnen.' },
      ],
      cta: 'Readiness-Check vereinbaren',
      paper: {
        title: 'Entscheidungsvorlage',
        maturity: 'Reifegrad (Beispiel)',
        areas: [
          { k: 'Repository', v: 4 },
          { k: 'Pipeline', v: 3 },
          { k: 'Sandboxes', v: 3 },
          { k: 'Ticketqualität', v: 2 },
          { k: 'Regeln', v: 1 },
          { k: 'Datenschutz', v: 2 },
        ],
        plan: '90-Tage-Plan',
        months: [
          { m: 'Monat 1', t: 'Vorbereitung' },
          { m: 'Monat 2', t: 'Pilot-Stream' },
          { m: 'Monat 3', t: 'Auswertung' },
        ],
        caption: 'Beispiel einer Entscheidungsvorlage mit Bewertung von 1 bis 5 je Bereich',
      },
      licence: {
        title: 'Beispiel einer Lizenzempfehlung für ein Team mit fünf Personen',
        parts: [
          { n: '3 ×', t: 'Team Standard', who: 'für PO, BA und Tester', price: '60 $' },
          { n: '2 ×', t: 'Team Premium', who: 'für Entwickler', price: '200 $' },
        ],
        sum: { t: 'Summe pro Monat', who: '5 Sitze', price: '260 $' },
        note: 'Listenpreise von Anthropic in US-Dollar bei jährlicher Zahlung, Stand 15.11.2026, zuzüglich Steuern. Die Lizenzverträge schließen Sie direkt mit Anthropic ab; die Lizenzkosten sind nicht Teil des Festpreises. Für Audit-Logs ist der Enterprise-Plan erforderlich, er ist ab 20 Sitzen verfügbar.',
      },
    },
    process: {
      label: 'Ablauf',
      title: 'Drei Tage, einer davon bei Ihnen vor Ort',
      intro: 'Im Erstgespräch wählen wir eine Story aus Ihrem Backlog aus. Sie stellen eine Sandbox bereit, falls vorhanden auch das Repository. Außerdem schließen wir einen Vertrag zur Auftragsverarbeitung.',
      steps: [
        { tag: 'Tag 1 · remote', t: 'Analyse', d: 'Der KI-Agent analysiert die Metadaten Ihrer Org und Ihre Pipeline. Auf dieser Grundlage bewerte ich den Reifegrad in sechs Bereichen.' },
        { tag: 'Tag 2 · vor Ort', t: 'Live-Umsetzung', d: 'Gemeinsam mit Ihrem Admin und einem Entwickler setzen wir die ausgewählte Story mit dem Agenten in der Sandbox bis zum Pull Request um. Ihr Team entscheidet über jedes Zwischenergebnis.' },
        { tag: 'Tag 3 · remote', t: 'Entscheidungsvorlage', d: 'Ich übergebe Reifegradbewertung, 90-Tage-Plan, Lizenzempfehlung und Kostenschätzung und bespreche die Ergebnisse mit der CRM-Leitung.' },
      ],
      meta: [
        { k: 'Beteiligte', v: 'CRM-Leitung, Admin, ein Entwickler und eine Person mit Entscheidungsbefugnis für die nächsten Schritte' },
        { k: 'Voraussetzungen', v: 'Sandbox, Repository (falls vorhanden), Lesezugriff auf das Ticketsystem und Vertrag zur Auftragsverarbeitung' },
        { k: 'KI-Zugang', v: 'Der Agent arbeitet mit meinem Claude-Zugang und verarbeitet nur Metadaten, keine Kundendaten.' },
      ],
    },
    principles: {
      label: 'Arbeitsweise',
      title: 'Vier Grundsätze und fünf Quality Gates',
      intro: 'Spezifikation, Berechtigungen, Prüfungen und Freigaben sind von Anfang an auf die Arbeit mit einem KI-Agenten ausgelegt. Verbindliche Entscheidungen treffen ausschließlich Personen, an fünf festgelegten Quality Gates. Im Check gelten für den Agenten bereits dieselben Grenzen.',
      items: [
        { icon: 'contract', t: 'Das Ticket ist die Spezifikation', d: 'Der Agent setzt um, was in den Akzeptanzkriterien der Story steht.' },
        { icon: 'ai', t: 'Der KI-Agent übernimmt die Routinearbeit', d: 'Er analysiert die Org und erstellt Protokolle, Stories, Prototypen, Code, Tests und Release Notes.' },
        { icon: 'pipeline', t: 'Die Pipeline prüft nach festen Regeln', d: 'Validierung und Deployment führt die Pipeline ohne KI unter einem eigenen technischen Benutzerkonto aus.' },
        { icon: 'check', t: 'Personen entscheiden an Quality Gates', d: 'Jede verbindliche Entscheidung trifft eine namentlich benannte Person.' },
      ],
      gatesTitle: 'Die fünf Quality Gates',
      gates: [
        { t: 'Protokoll', who: 'Fachbereich bestätigt' },
        { t: 'Spezifikation', who: 'Business-Analyst und Architekt' },
        { t: 'Code-Review', who: 'Entwickler gibt frei' },
        { t: 'Fehler und Änderungen', who: 'Business-Analyst und Fachbereich' },
        { t: 'Release', who: 'Fachbereich gibt frei' },
      ],
      note: 'Der KI-Agent arbeitet nur in Scratch Orgs und Sandboxes. In die Produktion liefert ausschließlich die Pipeline aus. Jede ausgelieferte Änderung lässt sich über Story, Commit und Test auf eine freigegebene Anforderung zurückführen.',
      links: [
        { text: 'Den Prozess nach dem Check beschreibe ich im Artikel', link: 'blog/ki-native-salesforce-delivery-prozess/', linkText: 'KI-nativer Delivery-Prozess in 14 Schritten' },
        { text: 'Welche Daten KI-Agenten in einer Sandbox lesen sollten, beschreibe ich im Artikel', link: 'blog/sandbox-kundendaten-ki-coding-agenten/', linkText: 'Sandbox-Kundendaten und KI-Coding-Agenten' },
      ],
    },
    practice: {
      label: 'Aus meiner Praxis',
      title: 'Den Prozess habe ich selbst umgesetzt',
      items: [
        'Ich habe den KI-nativen Delivery-Prozess vom Workshop bis zur Produktion selbst umgesetzt.',
        'Die Pipelines dazu habe ich auf GitLab, Azure DevOps, GitHub und Bitbucket aufgebaut, auch in Programmen mit über 30 Entwicklern.',
        'Ich erhalte keine Provisionen von Salesforce, Tool-Anbietern oder Partnern und empfehle deshalb nur die Lizenzen, die zu Ihrem Team passen.',
        'Betriebsrat und Datenschutzverantwortliche beziehe ich von Beginn an ein; die Verarbeitung in der EU ist über AWS Bedrock möglich.',
      ],
    },
    offer: {
      label: 'Preis und Konditionen',
      title: 'Ein Festpreis für drei Tage',
      pkg: 'Paket A',
      name: 'Readiness-Check',
      price: '3.900 €',
      priceNote: 'Festpreis, netto',
      who: 'Analyse, Live-Umsetzung und Entscheidungsvorlage sind enthalten, ebenso der KI-Zugang für die drei Tage.',
      entryTitle: 'Der Einstieg',
      entry: [
        { tag: '30 Minuten · remote', t: 'Erstgespräch', d: 'Wir klären Ihre Ausgangslage und wählen eine Story aus Ihrem Backlog aus.' },
        { tag: '3 Tage · Festpreis 3.900 €', t: 'Readiness-Check', d: 'Analyse, Live-Umsetzung und Entscheidungsvorlage für Ihr Team.' },
        { tag: 'innerhalb von drei Monaten', t: 'Entscheidung über ein Folgeprojekt', d: 'Beauftragen Sie ein Folgeprojekt, wird die Hälfte des Festpreises darauf angerechnet.' },
      ],
      termsTitle: 'Konditionen',
      terms: [
        'Festpreis netto, zuzüglich Umsatzsteuer.',
        'Den Vor-Ort-Tag biete ich in NRW, Rheinland-Pfalz und Baden-Württemberg an; Reisekosten berechne ich nach Aufwand.',
        'Lizenzen und Nutzung von Claude, Salesforce und der Git-Plattform rechnen Sie später direkt mit dem jeweiligen Anbieter ab.',
        'Der Check ist in sich abgeschlossen und verpflichtet Sie zu keinem Folgeauftrag.',
      ],
      cta: 'Readiness-Check anfragen',
      pdfText: 'Angebot als PDF',
      nextTitle: 'Was nach dem Check möglich ist',
      next: [
        { tag: 'Paket B', t: 'Enterprise-Setup', who: 'Für Hersteller mit eigenem Salesforce-Team ab fünf Personen', d: 'In einem Pilot-Stream richten wir in sechs bis acht Wochen den Claude-Mandanten, die Regeldatei, die Pipeline mit Prüfschritten, fünf Quality Gates und die neuen Rollen ein. Arbeitet ein Implementierungspartner in Ihrer Org, stimmen wir die Arbeitsweise mit ihm ab.' },
        { tag: 'Paket C', t: 'Änderungen per Chat', who: 'Für Unternehmen ohne eigene Entwickler', d: 'Ihr Product Owner beschreibt Änderungen im Chat und gibt sie frei. Der Agent setzt sie in der Sandbox um, die Pipeline prüft sie, und nur die Pipeline liefert in die Produktion aus.' },
      ],
    },
    faqTitle: 'Häufig gestellte Fragen',
    faq: [
      { q: 'Was kostet der KI-Readiness-Check?', a: '3.900 Euro netto als Festpreis für drei Tage, davon ein Tag bei Ihnen vor Ort. Reisekosten für den Vor-Ort-Tag berechne ich nach Aufwand. Beauftragen Sie innerhalb von drei Monaten ein Folgeprojekt, rechne ich die Hälfte des Festpreises an.' },
      { q: 'Brauchen wir für den Check eigene Claude-Lizenzen?', a: 'Nein. Im Readiness-Check arbeitet der Agent mit meinem Claude-Zugang, dafür schließen wir einen Vertrag zur Auftragsverarbeitung. Welche Lizenzen Ihr Team für die tägliche Arbeit braucht, steht anschließend in der Lizenzempfehlung.' },
      { q: 'Werden Kundendaten an das KI-Modell übertragen?', a: 'Nein. Der Agent arbeitet nur mit Metadaten wie Objekten, Feldern, Flows, Code und der Pipeline-Konfiguration. Kundendaten verarbeitet er nicht, und auf die Produktion hat er keinen Zugriff.' },
      { q: 'Was ist, wenn unsere Metadaten noch nicht in einem Repository verwaltet werden?', a: 'Dann ist das bereits ein erstes Ergebnis des Checks. In diesem Fall sieht der 90-Tage-Plan als erste Maßnahme vor, ein Repository aufzubauen, bevor ein Agent im Alltag eingesetzt wird.' },
      { q: 'Funktioniert der Check, wenn ein Implementierungspartner unsere Org betreut?', a: 'Ja. Für den Check genügen Zugänge zu Sandbox und Repository. Wenn Sie danach eine Umsetzung starten, stimmen wir die Arbeitsweise mit Ihrem Partner ab: wer mit dem Agenten arbeitet, welche Regeln gelten und wer an den Quality Gates freigibt.' },
      { q: 'Wem gehört der Code aus der Live-Umsetzung?', a: 'Der Code gehört Ihnen. Der Pull Request wird in Ihrem Repository erstellt, und auch die übrigen Ergebnisse, etwa die Entscheidungsvorlage, erhalten Sie zur freien Verwendung.' },
      { q: 'Verpflichten wir uns mit dem Check zu einem Folgeprojekt?', a: 'Nein. Der Check ist in sich abgeschlossen, und Sie verpflichten sich nicht zu einem Folgeauftrag. Die Entscheidungsvorlage zeigt, welche Schritte sinnvoll sind. Ob Sie diese mit Ihrem Team, Ihrem Partner oder mit mir umsetzen, entscheiden Sie.' },
    ],
    ctaTitle: 'Wie gut ist Ihr Salesforce-Team auf KI-Agenten vorbereitet?',
    ctaText: 'Beschreiben Sie mir kurz, wie viele Personen an Salesforce arbeiten, wie Sie heute deployen und welche KI-Werkzeuge bereits im Einsatz sind. Im Erstgespräch klären wir, ob der Readiness-Check für Ihre Situation sinnvoll ist, und wählen eine Story aus.',
    formSubject: 'Anfrage KI-Readiness-Check',
  },
  en: {
    title: 'AI readiness check for your Salesforce team',
    metaTitle: 'Salesforce AI Readiness Check: 3 Days, Fixed Price',
    description:
      'At a fixed price, an AI agent assesses your Salesforce org in three days and takes one story from your backlog to a pull request in a sandbox.',
    eyebrow: 'AI-native delivery · Entry package',
    lead: 'After three days, you will know what an AI agent can do in your Salesforce org and which prerequisites are not yet in place. The agent assesses your org and pipeline and, together with your team, takes one story from your backlog to a pull request in a sandbox. You receive a decision brief with a maturity assessment, a 90-day plan and a license recommendation.',
    ctaPrimary: 'Discuss the readiness check',
    ctaSecondary: 'Process and price',
    promises: ['EUR 3,900 fixed price, net', 'No access to production', 'No commissions'],
    portraitAlt: 'Portrait of Fabian Kramer',
    facts: [
      { value: '3', label: 'days, including one day on site' },
      { value: '1', label: 'story from your backlog to a pull request' },
      { value: '6', label: 'areas in the maturity assessment' },
      { value: '50%', label: 'of the fixed price credited toward a follow-up project' },
    ],
    compare: {
      label: 'AI-native delivery',
      title: 'From an AI assistant to an AI agent in the delivery process',
      intro: 'AI-native delivery means that the delivery process is designed for working with an AI agent. The agent assesses the org and creates meeting notes, stories, configuration, code and tests. Your team aligns with the business, reviews the results and makes the decisions.',
      colOld: 'AI-assisted',
      colOldNote: 'common today',
      colNew: 'AI-native',
      colNewNote: 'the goal',
      rows: [
        { k: 'Use', old: 'Individual developers use an assistant.', now: 'Tickets are specifications that an AI agent can implement without follow-up questions.' },
        { k: 'Process', old: 'Process, roles and checks stay as they are.', now: 'The AI agent has its own identity with clearly limited permissions.' },
        { k: 'Impact', old: 'The benefit remains limited to individuals and is hard to measure.', now: 'End-to-end cycle time decreases, and every change remains traceable.' },
      ],
    },
    situations: {
      label: 'Typical situations',
      title: 'When a readiness check makes sense',
      intro: 'Many Salesforce teams already use AI tools, but without a shared process. The check shows how ready your team is and what needs to be clarified before a broader rollout.',
      items: [
        { icon: 'ai', t: 'AI assistants without shared rules', d: 'Individual developers work with different assistants, without a rules file and without shared checks. The benefit remains limited to individuals and is hard to measure.', link: 'blog/ai-rules-file-salesforce-repository/', linkText: 'What belongs in an AI rules file' },
        { icon: 'contract', t: 'Your implementation partner works with AI', d: 'The partner uses coding agents and still bills on a time-and-materials basis. Before you change contracts, you should know what effort is realistic when agents are used.', link: 'blog/fixed-price-vs-time-and-materials-ai/', linkText: 'Fixed price vs time and materials' },
        { icon: 'team', t: 'Works council and data protection leads have questions', d: 'What data does the model process, where is it processed and can an individual\'s work be evaluated? These questions should be answered before the first pilot.', link: 'blog/ai-coding-tools-works-council-gdpr/', linkText: 'AI coding, works council and GDPR' },
        { icon: 'license', t: 'You are preparing a license decision', d: 'Claude Code, GitHub Copilot and Agentforce Vibes differ in cost, data flow and how they fit into the pipeline. The decision should be based on the requirements of your org, not on a product demo.', link: 'blog/agentforce-vibes-claude-code-copilot/', linkText: 'Vibes, Claude Code and Copilot compared' },
        { icon: 'target', t: 'Unclear acceptance criteria', d: 'An agent needs precise acceptance criteria to implement a story as described. In the check, we use a real story to test whether your tickets are specific enough to serve as specifications.', link: 'blog/ai-native-salesforce-delivery-process/', linkText: 'The AI-native delivery process' },
        { icon: 'pipeline', t: 'The pipeline does not yet run automated checks', d: 'Without automated checks, every change the agent creates has to be reviewed by hand, and those reviews quickly become a bottleneck. The check shows which automated checks are missing and which one to start with.', link: 'blog/quality-gates-for-ai-code-salesforce-pipeline/', linkText: 'Quality gates for AI code' },
      ],
    },
    results: {
      label: 'Results',
      title: 'What you receive after three days',
      intro: 'The check is for CIOs and heads of CRM who want to know, before making a decision, what an AI agent can deliver in their org and which prerequisites are still missing.',
      listTitle: 'Results of the readiness check',
      items: [
        { icon: 'search', t: 'Maturity assessment in six areas', d: 'Your team\'s starting point and the missing prerequisites across the six areas: repository, pipeline, sandboxes, ticket quality, rules and data protection' },
        { icon: 'calendar', t: '90-day plan', d: 'Actions with owners and due dates' },
        { icon: 'budget', t: 'License recommendation and cost estimate', d: 'Suitable licenses for each role in the team, with monthly costs at list price' },
        { icon: 'pipeline', t: 'A pull request from your backlog', d: 'The story from the live session, with tests, in your repository. The code belongs to you.' },
      ],
      cta: 'Book the readiness check',
      paper: {
        title: 'Decision brief',
        maturity: 'Maturity (example)',
        areas: [
          { k: 'Repository', v: 4 },
          { k: 'Pipeline', v: 3 },
          { k: 'Sandboxes', v: 3 },
          { k: 'Ticket quality', v: 2 },
          { k: 'Rules', v: 1 },
          { k: 'Data protection', v: 2 },
        ],
        plan: '90-day plan',
        months: [
          { m: 'Month 1', t: 'Preparation' },
          { m: 'Month 2', t: 'Pilot stream' },
          { m: 'Month 3', t: 'Evaluation' },
        ],
        caption: 'Example decision brief with each area rated from 1 to 5',
      },
      licence: {
        title: 'Example of a license recommendation for a team of five',
        parts: [
          { n: '3 ×', t: 'Team Standard', who: 'for product owner, business analyst and tester', price: '$60' },
          { n: '2 ×', t: 'Team Premium', who: 'for developers', price: '$200' },
        ],
        sum: { t: 'Total per month', who: '5 seats', price: '$260' },
        note: 'Anthropic list prices in US dollars with annual billing, as of 15 November 2026, plus taxes. You sign the license contracts directly with Anthropic; license costs are not part of the fixed price. Audit logs require the Enterprise plan, which is available for 20 seats or more.',
      },
    },
    process: {
      label: 'How it works',
      title: 'Three days, including one day on site',
      intro: 'In the first call, we select a story from your backlog. You provide a sandbox and, if available, the repository, and we sign a data processing agreement.',
      steps: [
        { tag: 'Day 1 · remote', t: 'Assessment', d: 'The AI agent analyzes your org\'s metadata and your pipeline. Based on this, I assess maturity in six areas.' },
        { tag: 'Day 2 · on site', t: 'Live session', d: 'Together with your admin and one developer, we use the agent to take the selected story to a pull request in the sandbox. Your team decides on every interim result.' },
        { tag: 'Day 3 · remote', t: 'Decision brief', d: 'I hand over the maturity assessment, 90-day plan, license recommendation and cost estimate, then discuss the results with the head of CRM.' },
      ],
      meta: [
        { k: 'People', v: 'Head of CRM, admin, one developer and one person with authority to decide on the next steps' },
        { k: 'Prerequisites', v: 'Sandbox, repository (if available), read access to the ticket system and a data processing agreement' },
        { k: 'AI access', v: 'The agent works with my Claude account and processes only metadata, not customer data.' },
      ],
    },
    principles: {
      label: 'Working model',
      title: 'Four principles and five quality gates',
      intro: 'Specification, permissions, checks and approvals are designed for working with an AI agent from the start. Binding decisions are made only by people, at five defined quality gates. The agent works under the same limits during the check.',
      items: [
        { icon: 'contract', t: 'The ticket is the specification', d: 'The agent implements what the story\'s acceptance criteria specify.' },
        { icon: 'ai', t: 'The AI agent takes on the routine work', d: 'It assesses the org and creates meeting notes, stories, prototypes, code, tests and release notes.' },
        { icon: 'pipeline', t: 'The pipeline checks against fixed rules', d: 'The pipeline runs validation and deployment without AI, under a dedicated technical user account.' },
        { icon: 'check', t: 'People decide at quality gates', d: 'Every binding decision is made by a named person.' },
      ],
      gatesTitle: 'The five quality gates',
      gates: [
        { t: 'Meeting notes', who: 'Business team confirms' },
        { t: 'Specification', who: 'Business analyst and architect' },
        { t: 'Code review', who: 'Developer approves' },
        { t: 'Defects and changes', who: 'Business analyst and business team' },
        { t: 'Release', who: 'Business team approves' },
      ],
      note: 'The AI agent works only in scratch orgs and sandboxes. Only the pipeline deploys to production. Every released change can be traced through story, commit and test to an approved requirement.',
      links: [
        { text: 'I describe the process after the check in', link: 'blog/ai-native-salesforce-delivery-process/', linkText: 'AI-native delivery process in 14 steps' },
        { text: 'I cover which data AI agents should read in a sandbox in', link: 'blog/sandbox-customer-data-ai-coding-agents/', linkText: 'Sandbox customer data and AI coding agents' },
      ],
    },
    practice: {
      label: 'From my project work',
      title: 'I have run this process myself',
      items: [
        'I have implemented the AI-native delivery process myself, from workshop to production.',
        'I have built the pipelines for it on GitLab, Azure DevOps, GitHub and Bitbucket, including in programs with more than 30 developers.',
        'I receive no commissions from Salesforce, tool vendors or partners, so I recommend only the licenses that fit your team.',
        'I involve the works council and data protection officers from the start; processing in the EU is possible through AWS Bedrock.',
      ],
    },
    offer: {
      label: 'Price and terms',
      title: 'One fixed price for three days',
      pkg: 'Package A',
      name: 'Readiness check',
      price: 'EUR 3,900',
      priceNote: 'fixed price, net',
      who: 'Assessment, live session and decision brief are included, as is AI access for the three days.',
      entryTitle: 'Getting started',
      entry: [
        { tag: '30 minutes · remote', t: 'First call', d: 'We clarify your starting point and select a story from your backlog.' },
        { tag: '3 days · fixed price EUR 3,900', t: 'Readiness check', d: 'Assessment, live session and decision brief for your team.' },
        { tag: 'within three months', t: 'Decision on a follow-up project', d: 'If you commission a follow-up project, half of the fixed price is credited toward it.' },
      ],
      termsTitle: 'Terms',
      terms: [
        'Fixed price, net, plus VAT.',
        'I offer the on-site day in North Rhine-Westphalia, Rhineland-Palatinate and Baden-Württemberg; I bill travel expenses at cost.',
        'After the check, each vendor bills you directly for licenses and usage of Claude, Salesforce and the Git platform.',
        'The check is a standalone engagement and does not commit you to a follow-up project.',
      ],
      cta: 'Request the readiness check',
      pdfText: 'Offer as PDF (German)',
      nextTitle: 'What can follow the check',
      next: [
        { tag: 'Package B', t: 'Enterprise setup', who: 'For manufacturers with their own Salesforce team of five or more', d: 'In one pilot stream, we set up the Claude tenant, the rules file, the pipeline with checks, five quality gates and the new roles within six to eight weeks. If an implementation partner works in your org, we agree on the working model with them.' },
        { tag: 'Package C', t: 'Changes via chat', who: 'For companies without their own developers', d: 'Your product owner describes changes via chat and approves them. The agent implements them in the sandbox, the pipeline checks them, and only the pipeline deploys to production.' },
      ],
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'How much does the AI readiness check cost?', a: 'EUR 3,900 net as a fixed price for three days, including one day on site. Travel costs for the on-site day are billed at actual cost. If you commission a follow-up project within three months, I credit half of the fixed price.' },
      { q: 'Do we need our own Claude licenses for the check?', a: 'No. In the readiness check, the agent works with my Claude account, and we sign a data processing agreement for that. The license recommendation then shows which licenses your team needs for day-to-day work.' },
      { q: 'Is customer data sent to the AI model?', a: 'No. The agent works with metadata only, such as objects, fields, flows, code and the pipeline configuration. It does not process customer data and has no access to production.' },
      { q: 'What if our metadata is not managed in a repository yet?', a: 'Then that is already the first finding of the check. In that case, the first action in the 90-day plan is to set up a repository before an agent is used in day-to-day work.' },
      { q: 'Does the check work if an implementation partner supports our org?', a: 'Yes. Access to a sandbox and the repository is enough for the check. If you start an implementation afterward, we agree on the working model with your partner: who works with the agent, which rules apply and who approves at the quality gates.' },
      { q: 'Who owns the code from the live session?', a: 'The code belongs to you. The pull request is in your repository, and you may use the other results, such as the decision brief, freely.' },
      { q: 'Does the check commit us to a follow-up project?', a: 'No. The check is self-contained, and you make no commitment. The decision brief shows which steps make sense. Whether you implement them with your team, your partner or me is up to you.' },
    ],
    ctaTitle: 'How well prepared is your Salesforce team for AI agents?',
    ctaText: 'Tell me briefly how many people work on Salesforce, how you deploy today and which AI tools are already in use. In the first call, we clarify whether the readiness check is useful for your situation and select a story.',
    formSubject: 'Request AI readiness check',
  },
};
