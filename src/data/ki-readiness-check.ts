// "KI-Readiness-Check": offer page /salesforce-ki-readiness-check/ (DE) and
// /en/salesforce-ai-readiness-check/ (EN), the entry package A of AI-native Delivery
// (3 days, fixed price). Rendered by src/components/FreelanceArchitectPage.astro with the
// optional `offer` block (price, conditions, what comes next).
// Facts only from the offer PDF (public/downloads/angebot-ai-native-delivery.pdf, 15.11.2026)
// and Fabian's answers of 15.11.2026: the agent runs on Fabian's Claude access, reads metadata
// only, no repository = first finding, partner orgs fine, code belongs to the client,
// no obligation to continue.

import type { freelanceArchitect } from './freelance-architect';

export interface OfferBlock {
  label: string;
  title: string;
  price: string;
  priceNote: string;
  items: string[];
  cta: string;
  pdfText: string;
  nextTitle: string;
  next: { t: string; d: string }[];
}

type Page = (typeof freelanceArchitect)['de'] & { offer: OfferBlock; ctaSecondaryHref: string };

export const kiReadinessCheckPaths = {
  de: 'salesforce-ki-readiness-check/',
  en: 'salesforce-ai-readiness-check/',
} as const;

// Offer PDF (German only); robots.txt keeps it out of search results.
export const offerPdf = 'downloads/angebot-ai-native-delivery.pdf';

export const kiReadinessCheck: { de: Page; en: Page } = {
  de: {
    title: 'KI-Readiness-Check für Ihr Salesforce-Team',
    metaTitle: 'Salesforce-KI-Readiness-Check: 3 Tage zum Festpreis',
    description:
      'Zum Festpreis analysiert ein KI-Agent in drei Tagen Ihre Salesforce-Org und setzt eine Story aus Ihrem Backlog bis zum Pull Request in der Sandbox um.',
    eyebrow: 'AI-native Delivery · Einstieg',
    lead: 'Nach drei Tagen wissen Sie, was ein KI-Agent in Ihrer Salesforce-Org leisten kann und welche Voraussetzungen noch fehlen. Der Agent analysiert Org und Pipeline und setzt gemeinsam mit Ihrem Team eine Story aus Ihrem Backlog bis zum Pull Request in der Sandbox um. Sie erhalten eine Entscheidungsvorlage mit Reifegradbewertung, 90-Tage-Plan und Lizenzempfehlung.',
    ctaPrimary: 'Readiness-Check besprechen',
    ctaSecondary: 'Ablauf und Preis',
    ctaSecondaryHref: '#process',
    promises: ['3.900 € Festpreis netto', 'Kein Zugriff auf die Produktion', 'Keine Provisionen'],
    portraitAlt: 'Porträt von Fabian Kramer',
    facts: [
      { value: '3', label: 'Tage, einer davon vor Ort' },
      { value: '1', label: 'Story aus Ihrem Backlog bis zum Pull Request' },
      { value: '6', label: 'Bereiche in der Reifegradbewertung' },
      { value: '50 %', label: 'des Festpreises werden auf ein Folgeprojekt angerechnet' },
    ],
    situations: {
      label: 'Typische Anlässe',
      title: 'Wann sich der Readiness-Check lohnt',
      intro: 'Viele Salesforce-Teams nutzen KI-Werkzeuge bereits, aber ohne gemeinsamen Prozess. Der Check zeigt, wie weit Ihr Team vorbereitet ist und was vor einem breiten Einsatz geklärt werden muss.',
      cards: [
        { icon: 'ai', t: 'KI-Assistenten ohne gemeinsame Regeln', d: 'Einzelne Entwickler arbeiten mit unterschiedlichen Assistenten, ohne Regeldatei und ohne gemeinsame Prüfungen. Der Nutzen bleibt auf einzelne Personen begrenzt und lässt sich kaum messen.', link: 'blog/ki-regeldatei-salesforce-repository/', linkText: 'Was in eine KI-Regeldatei gehört' },
        { icon: 'contract', t: 'Ihr Implementierungspartner arbeitet mit KI', d: 'Er setzt Coding-Agenten ein und rechnet weiterhin nach Aufwand ab. Bevor Sie Verträge anpassen, sollten Sie wissen, welcher Aufwand für eine Umsetzung mit Agenten realistisch ist.', link: 'blog/festpreis-statt-aufwand-ki-salesforce/', linkText: 'Festpreis statt Aufwand' },
        { icon: 'team', t: 'Betriebsrat und Datenschutzverantwortliche haben Fragen', d: 'Welche Daten verarbeitet das Modell, wo werden sie verarbeitet, und lässt sich die Arbeit einzelner Personen auswerten? Diese Fragen sollten vor dem ersten Pilotprojekt beantwortet sein.', link: 'blog/ki-coding-betriebsrat-dsgvo/', linkText: 'KI-Coding, Betriebsrat und DSGVO' },
        { icon: 'license', t: 'Sie bereiten eine Lizenzentscheidung vor', d: 'Claude Code, GitHub Copilot oder Agentforce Vibes unterscheiden sich bei Kosten, Datenfluss und Einbindung in die Pipeline. Die Entscheidung sollte auf den Anforderungen Ihrer Org beruhen, nicht auf einer Produktdemo.', link: 'blog/agentforce-vibes-claude-code-copilot-vergleich/', linkText: 'Vibes, Claude Code und Copilot im Vergleich' },
        { icon: 'target', t: 'Unklare Akzeptanzkriterien', d: 'Ein Agent braucht präzise Akzeptanzkriterien, um eine Story wie beschrieben umzusetzen. Im Check prüfen wir an einer echten Story, ob Ihre Tickets als Spezifikation ausreichen.', link: 'blog/ki-native-salesforce-delivery-prozess/', linkText: 'Der KI-native Delivery-Prozess' },
        { icon: 'pipeline', t: 'Die Pipeline prüft noch nicht automatisch', d: 'Ohne automatische Prüfungen muss jede Änderung, die der Agent erstellt, von Hand geprüft werden, und diese Reviews werden schnell zum Engpass. Der Check zeigt, welche Prüfschritte fehlen und mit welchem Sie beginnen sollten.', link: 'blog/quality-gates-ki-code-salesforce-pipeline/', linkText: 'Quality Gates für KI-Code' },
      ],
    },
    compare: {
      label: 'Rollen',
      title: 'Was der KI-Agent übernimmt und was Personen entscheiden',
      intro: 'Im Check gelten für den Agenten dieselben Grenzen wie später in Ihrem Team: nur in der Sandbox und nur mit Metadaten, nicht mit Kundendaten. Jede verbindliche Entscheidung trifft eine Person.',
      colMe: 'Ihr Team und ich',
      colPartner: 'KI-Agent',
      rows: [
        { k: 'Org-Analyse', me: 'Ich bewerte die Ergebnisse und ordne sie in die Reifegradbewertung ein.', partner: 'Der Agent liest Metadaten, Code und Pipeline-Konfiguration und fasst sie zusammen.' },
        { k: 'Story', me: 'Wir wählen vorab eine Story aus Ihrem Backlog aus und schärfen die Akzeptanzkriterien.', partner: 'Der Agent stellt Rückfragen zu Kriterien, die nicht eindeutig sind.' },
        { k: 'Umsetzung', me: 'Wir prüfen jeden Zwischenstand und entscheiden über Änderungen.', partner: 'Der Agent erstellt Konfiguration, Code und Tests in der Sandbox.' },
        { k: 'Pull Request', me: 'Ihr Entwickler prüft den Code und gibt den Pull Request frei.', partner: 'Der Agent führt die Tests aus und beschreibt die Änderung im Pull Request.' },
        { k: 'Produktion', me: 'Sie entscheiden, ob und wann die Änderung über Ihre Pipeline ausgeliefert wird.', partner: 'Der Agent hat keinen Zugriff auf die Produktion.' },
      ],
      more: 'Den Prozess nach dem Check beschreibe ich im Artikel',
      moreLink: 'blog/ki-native-salesforce-delivery-prozess/',
      moreText: 'KI-nativer Delivery-Prozess in 14 Schritten',
      more2: 'Welche Daten KI-Agenten in einer Sandbox lesen sollten, beschreibe ich im Artikel',
      moreLink2: 'blog/sandbox-kundendaten-ki-coding-agenten/',
      moreText2: 'Sandbox-Kundendaten und KI-Coding-Agenten',
    },
    deliverables: {
      label: 'Ergebnisse',
      title: 'Was Sie nach drei Tagen erhalten',
      items: [
        { icon: 'analyse', t: 'Reifegradbewertung in sechs Bereichen', d: 'Ich bewerte Repository, Pipeline, Sandboxes, Ticketqualität, Regeln und Datenschutz und beschreibe für jeden Bereich die Ausgangslage und die fehlenden Voraussetzungen.' },
        { icon: 'calendar', t: '90-Tage-Plan', d: 'Der Plan legt Maßnahmen mit Verantwortlichen und Terminen fest. Der erste Monat dient der Vorbereitung, der zweite dem Pilot-Stream und der dritte der Auswertung.' },
        { icon: 'license', t: 'Lizenzempfehlung mit Kostenschätzung', d: 'Für jede Rolle im Team empfehle ich eine passende Lizenz und nenne die monatlichen Kosten zum Listenpreis. Die Verträge schließen Sie direkt mit dem Anbieter ab.' },
        { icon: 'pipeline', t: 'Ein Pull Request aus Ihrem Backlog', d: 'Sie erhalten die Story aus der Live-Umsetzung als Pull Request in Ihrem Repository, mit Tests und einer Beschreibung der Änderung. Der Code gehört Ihnen. Wenn es noch kein Repository gibt, wird dessen Aufbau zur ersten Maßnahme im 90-Tage-Plan.' },
      ],
    },
    practice: {
      label: 'Aus meiner Praxis',
      title: 'Den Prozess habe ich selbst umgesetzt',
      text: 'Ich habe den KI-nativen Delivery-Prozess vom Workshop bis zur Produktion selbst umgesetzt. Der Agent analysiert die Org und erstellt Stories, Konfiguration, Code und Tests. Die Pipeline prüft jede Änderung, und Personen entscheiden an fünf Quality Gates. Diese Pipelines habe ich auf GitLab, Azure DevOps, GitHub und Bitbucket aufgebaut, auch in Programmen mit über 30 Entwicklern. Ich erhalte keine Provisionen von Salesforce, Tool-Anbietern oder Partnern und empfehle deshalb nur die Lizenzen, die zu Ihrem Team passen.',
      facts: [
        { value: '5', label: 'Quality Gates, an denen Personen entscheiden' },
        { value: '4', label: 'Git-Plattformen: GitLab, Azure DevOps, GitHub, Bitbucket' },
        { value: '32', label: 'Entwickler in einem gemeinsamen Release-Prozess' },
        { value: '8', label: 'Jahre Salesforce-Erfahrung' },
      ],
    },
    process: {
      label: 'Ablauf',
      title: 'Drei Tage, einer davon bei Ihnen vor Ort',
      steps: [
        { icon: 'message', t: 'Vorbereitung', d: 'Im Erstgespräch wählen wir eine Story aus Ihrem Backlog aus. Sie stellen eine Sandbox und, falls vorhanden, das Repository bereit, und wir schließen einen Vertrag zur Auftragsverarbeitung.' },
        { icon: 'analyse', t: 'Tag 1, remote: Analyse', d: 'Der KI-Agent analysiert die Metadaten Ihrer Org und Ihre Pipeline. Auf dieser Grundlage bewerte ich den Reifegrad in sechs Bereichen.' },
        { icon: 'implement', t: 'Tag 2, vor Ort: Live-Umsetzung', d: 'Gemeinsam mit Ihrem Admin und einem Entwickler setzen wir die ausgewählte Story mit dem Agenten in der Sandbox bis zum Pull Request um. Ihr Team verfolgt jeden Schritt und entscheidet über die Zwischenergebnisse.' },
        { icon: 'target', t: 'Tag 3, remote: Entscheidungsvorlage', d: 'Ich übergebe die Reifegradbewertung, den 90-Tage-Plan, die Lizenzempfehlung und die Kostenschätzung und bespreche die Ergebnisse mit der CRM-Leitung.' },
      ],
      termsLabel: 'Ihre Mitwirkung',
      terms: [
        { t: 'Beteiligte', d: 'Beteiligt sind CRM-Leitung, Admin und ein Entwickler. Benennen Sie außerdem eine Person, die über die nächsten Schritte entscheiden kann.' },
        { t: 'Zugänge', d: 'Sie stellen eine Sandbox, falls vorhanden das Repository, und Lesezugriff auf das Ticketsystem bereit. Fehlt ein Repository, ist das bereits ein erstes Ergebnis des Checks.' },
        { t: 'KI-Zugang', d: 'Der Agent arbeitet mit meinem Claude-Zugang und verarbeitet nur Metadaten, keine Kundendaten. Eigene Lizenzen brauchen Sie für den Check nicht.' },
      ],
    },
    offer: {
      label: 'Preis',
      title: 'Ein Festpreis für drei Tage',
      price: '3.900 €',
      priceNote: 'Festpreis netto, zuzüglich Umsatzsteuer',
      items: [
        'Analyse, Live-Umsetzung und Entscheidungsvorlage sind enthalten, ebenso der KI-Zugang für die drei Tage.',
        'Ich biete den Vor-Ort-Tag in NRW, Rheinland-Pfalz und Baden-Württemberg an; Reisekosten berechne ich nach Aufwand.',
        'Beauftragen Sie innerhalb von drei Monaten ein Folgeprojekt, rechne ich die Hälfte des Festpreises an.',
        'Der Check ist in sich abgeschlossen und verpflichtet Sie zu keinem Folgeauftrag.',
      ],
      cta: 'Readiness-Check anfragen',
      pdfText: 'Angebot als PDF',
      nextTitle: 'Was nach dem Check möglich ist',
      next: [
        { t: 'Enterprise-Setup', d: 'Für Hersteller mit eigenem Salesforce-Team ab fünf Personen. In einem Pilot-Stream richten wir in der Regel innerhalb von sechs bis acht Wochen den Claude-Mandanten, die Regeldatei, die Pipeline mit Prüfschritten, fünf Quality Gates und die neuen Rollen ein. Arbeitet ein Implementierungspartner in Ihrer Org, stimmen wir die Arbeitsweise mit ihm ab.' },
        { t: 'Änderungen per Chat', d: 'Für Unternehmen ohne eigene Entwickler. Ihr Product Owner beschreibt Änderungen im Chat und gibt sie frei. Der Agent setzt sie in der Sandbox um, die Pipeline prüft sie, und nur die Pipeline deployt in die Produktion.' },
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
    footerLink: 'KI-Readiness-Check',
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
    ctaSecondaryHref: '#process',
    promises: ['EUR 3,900 fixed price, net', 'No access to production', 'No commissions'],
    portraitAlt: 'Portrait of Fabian Kramer',
    facts: [
      { value: '3', label: 'days, including one day on site' },
      { value: '1', label: 'story from your backlog to a pull request' },
      { value: '6', label: 'areas in the maturity assessment' },
      { value: '50%', label: 'of the fixed price credited toward a follow-up project' },
    ],
    situations: {
      label: 'Typical situations',
      title: 'When a readiness check makes sense',
      intro: 'Many Salesforce teams already use AI tools, but without a shared process. The check shows how ready your team is and what needs to be clarified before a broader rollout.',
      cards: [
        { icon: 'ai', t: 'AI assistants without shared rules', d: 'Individual developers work with different assistants, without a rules file and without shared checks. The benefit remains limited to individuals and is hard to measure.', link: 'blog/ai-rules-file-salesforce-repository/', linkText: 'What belongs in an AI rules file' },
        { icon: 'contract', t: 'Your implementation partner works with AI', d: 'The partner uses coding agents and still bills on a time-and-materials basis. Before you change contracts, you should know what effort is realistic when agents are used.', link: 'blog/fixed-price-vs-time-and-materials-ai/', linkText: 'Fixed price vs time and materials' },
        { icon: 'team', t: 'Works council and data protection leads have questions', d: 'What data does the model process, where is it processed and can an individual\'s work be evaluated? These questions should be answered before the first pilot.', link: 'blog/ai-coding-tools-works-council-gdpr/', linkText: 'AI coding, works council and GDPR' },
        { icon: 'license', t: 'You are preparing a license decision', d: 'Claude Code, GitHub Copilot and Agentforce Vibes differ in cost, data flow and how they fit into the pipeline. The decision should be based on the requirements of your org, not on a product demo.', link: 'blog/agentforce-vibes-claude-code-copilot/', linkText: 'Vibes, Claude Code and Copilot compared' },
        { icon: 'target', t: 'Unclear acceptance criteria', d: 'An agent needs precise acceptance criteria to implement a story as described. In the check, we use a real story to test whether your tickets are specific enough to serve as specifications.', link: 'blog/ai-native-salesforce-delivery-process/', linkText: 'The AI-native delivery process' },
        { icon: 'pipeline', t: 'The pipeline does not yet run automated checks', d: 'Without automated checks, every change from AI-generated code has to be reviewed by hand, and those reviews quickly become a bottleneck. The readiness check shows which automated checks are missing and which one to start with.', link: 'blog/quality-gates-for-ai-code-salesforce-pipeline/', linkText: 'Quality gates for AI code' },
      ],
    },
    compare: {
      label: 'Roles',
      title: 'What the AI agent does and what people decide',
      intro: 'In the check, the agent works under the same limits it would have later in your team: only in the sandbox and only with metadata, not with customer data. Every binding decision is made by a person.',
      colMe: 'Your team and I',
      colPartner: 'AI agent',
      rows: [
        { k: 'Org assessment', me: 'I evaluate the results and incorporate them into the maturity assessment.', partner: 'The agent reads metadata, code and pipeline configuration and summarizes them.' },
        { k: 'Story', me: 'We select a story from your backlog in advance and refine the acceptance criteria.', partner: 'The agent asks questions about criteria that are ambiguous.' },
        { k: 'Implementation', me: 'We review every interim result and decide on changes.', partner: 'The agent creates configuration, code and tests in the sandbox.' },
        { k: 'Pull request', me: 'Your developer reviews the code and approves the pull request.', partner: 'The agent runs the tests and describes the change in the pull request.' },
        { k: 'Production', me: 'You decide whether and when the change is released through your pipeline.', partner: 'The agent has no access to production.' },
      ],
      more: 'I describe the process after the check in',
      moreLink: 'blog/ai-native-salesforce-delivery-process/',
      moreText: 'AI-native delivery process in 14 steps',
      more2: 'Which data AI agents should read in a sandbox is covered in',
      moreLink2: 'blog/sandbox-customer-data-ai-coding-agents/',
      moreText2: 'Sandbox customer data and AI coding agents',
    },
    deliverables: {
      label: 'Results',
      title: 'What you receive after three days',
      items: [
        { icon: 'analyse', t: 'Maturity assessment in six areas', d: 'I assess repository, pipeline, sandboxes, ticket quality, rules and data protection and describe the current state and the missing prerequisites for each area.' },
        { icon: 'calendar', t: '90-day plan', d: 'The plan sets out actions with owners and due dates. The first month covers preparation, the second the pilot stream and the third the evaluation.' },
        { icon: 'license', t: 'License recommendation with cost estimate', d: 'For each role in the team, I recommend a suitable license and state the monthly cost at list price. You sign the contracts directly with the vendor.' },
        { icon: 'pipeline', t: 'A pull request from your backlog', d: 'You receive the story from the live session as a pull request in your repository, with tests and a description of the change. The code belongs to you. If you do not yet have a repository, setting one up becomes the first action in the 90-day plan.' },
      ],
    },
    practice: {
      label: 'From my project work',
      title: 'I have run this process myself',
      text: 'I have implemented the AI-native delivery process myself, from workshop through production. The agent assesses the org and creates stories, configuration, code and tests. The pipeline checks every change, and people make decisions at five quality gates. I have built these pipelines on GitLab, Azure DevOps, GitHub and Bitbucket, including in programs with more than 30 developers. I receive no commissions from Salesforce, tool vendors or partners, so I recommend only the licenses that fit your team.',
      facts: [
        { value: '5', label: 'quality gates where people decide' },
        { value: '4', label: 'Git platforms: GitLab, Azure DevOps, GitHub, Bitbucket' },
        { value: '32', label: 'developers in a single release process' },
        { value: '8', label: 'years of Salesforce experience' },
      ],
    },
    process: {
      label: 'How it works',
      title: 'Three days, including one day on site',
      steps: [
        { icon: 'message', t: 'Preparation', d: 'In the first call, we select a story from your backlog. You provide a sandbox and, if available, the repository, and we sign a data processing agreement.' },
        { icon: 'analyse', t: 'Day 1, remote: assessment', d: 'The AI agent analyzes your org\'s metadata and your pipeline. Based on this, I assess maturity in six areas.' },
        { icon: 'implement', t: 'Day 2, on site: live session', d: 'Together with your admin and one developer, we use the agent to take the selected story to a pull request in the sandbox. Your team follows every step and decides on the interim results.' },
        { icon: 'target', t: 'Day 3, remote: decision brief', d: 'I provide the maturity assessment, the 90-day plan, the license recommendation and the cost estimate and review them with the head of CRM.' },
      ],
      termsLabel: 'Your contribution',
      terms: [
        { t: 'People', d: 'Your head of CRM, admin and one developer take part. Please also name one person who can decide on the next steps.' },
        { t: 'Access', d: 'You provide a sandbox, the repository if available and read access to the ticket system. If there is no repository, that is already the first finding of the check.' },
        { t: 'AI access', d: 'The agent works with my Claude account and processes only metadata, not customer data. You do not need your own licenses for the check.' },
      ],
    },
    offer: {
      label: 'Price',
      title: 'One fixed price for three days',
      price: 'EUR 3,900',
      priceNote: 'fixed price, net plus VAT',
      items: [
        'Assessment, live session and decision brief are included, as is AI access for the three days.',
        'I offer the on-site day in North Rhine-Westphalia, Rhineland-Palatinate and Baden-Württemberg; travel costs are billed at actual cost.',
        'If you commission a follow-up project within three months, I credit half of the fixed price.',
        'The check is self-contained and does not commit you to a follow-up project.',
      ],
      cta: 'Request the readiness check',
      pdfText: 'Offer as PDF (German)',
      nextTitle: 'What can follow the check',
      next: [
        { t: 'Enterprise setup', d: 'For manufacturers with their own Salesforce team of five or more people. In one pilot stream, we usually set up the Claude tenant, the rules file, the pipeline with checks, five quality gates and the new roles within six to eight weeks. If an implementation partner works in your org, we agree on the working model with them.' },
        { t: 'Changes via chat', d: 'For companies without their own developers. Your product owner describes changes via chat and approves them. The agent implements them in the sandbox, the pipeline checks them and only the pipeline deploys them to production.' },
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
    footerLink: 'AI readiness check',
  },
};
