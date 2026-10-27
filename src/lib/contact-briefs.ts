import type { Category } from './categories';

// Closing call to action under every blog article and service page: what the
// reader should bring to the 30-minute call and what we clarify in it.
// An article gets the brief of its main category (the first in `categories`); `contactBrief` in the frontmatter
// overrides it (e.g. licence articles in the architecture category). Every
// service page sets `contactBrief` in its frontmatter.
// scripts/check-blog.mjs runs the same wording checks on this file as on articles.
interface Brief {
  title: string;
  text: string;
  bring: string[];
  clarify: string[];
}

export const contactBriefs = {
  devops: {
    de: {
      title: 'Releases dauern zu lange oder brechen zu oft?',
      text: 'In 30 Minuten gehen wir Ihren Weg von der Sandbox bis in Produktion durch und finden die Stelle, die am meisten bremst.',
      bring: [
        'Wie heute deployt wird: Change Sets, ein Tool oder eine Pipeline, und wer das macht',
        'Wie viele Sandboxes, Teams und Partner in dieselbe Org liefern',
        'Ein Release, das zuletzt schiefging, mit kurzem Hergang',
      ],
      clarify: [
        'Wo im Ablauf die meiste Zeit verloren geht und die meisten Fehler entstehen',
        'Ob Ihre vorhandene Git-Plattform reicht, etwa GitLab, Azure DevOps, GitHub oder Bitbucket',
        'Welcher erste Pipeline-Schritt sich lohnt, den Ihr Team danach selbst betreibt',
      ],
    },
    en: {
      title: 'Releases take too long or break too often?',
      text: 'In 30 minutes we walk through your path from sandbox to production and find the step that slows you down most.',
      bring: [
        'How you deploy today: change sets, a tool or a pipeline, and who does it',
        'How many sandboxes, teams and partners deliver into the same org',
        'One release that went wrong recently, and what happened',
      ],
      clarify: [
        'Where in the process most time is lost and most errors come from',
        'Whether your existing Git platform is enough, for example GitLab, Azure DevOps, GitHub or Bitbucket',
        'Which first pipeline step pays off and can then be run by your own team',
      ],
    },
  },
  architecture: {
    de: {
      title: 'Steht eine Architekturentscheidung an?',
      text: 'In 30 Minuten klären wir, welche Entscheidung zuerst fallen muss und welche Informationen Ihnen dafür noch fehlen.',
      bring: [
        'Die Entscheidung, um die es geht, und bis wann sie fallen muss',
        'Welche Salesforce-Clouds Sie nutzen oder planen und welche Systeme angebunden sind',
        'Wer mitentscheidet: IT, Fachbereich, Implementierungspartner',
      ],
      clarify: [
        'Welche Optionen realistisch sind und welche Sie streichen können',
        'Welche Folgekosten jede Option über die nächsten Jahre mitbringt',
        'Was Sie für eine belastbare Entscheidung noch brauchen',
      ],
    },
    en: {
      title: 'Facing an architecture decision?',
      text: 'In 30 minutes we work out which decision has to come first and which information you still need for it.',
      bring: [
        'The decision at hand and the date by which it has to be made',
        'Which Salesforce clouds you use or plan and which systems are connected',
        'Who decides with you: IT, business, implementation partner',
      ],
      clarify: [
        'Which options are realistic and which you can drop',
        'Which follow-up costs each option brings over the coming years',
        'What you still need for a decision that holds',
      ],
    },
  },
  'partner-governance': {
    de: {
      title: 'Mehrere Partner, unklare Zuständigkeiten?',
      text: 'In 30 Minuten ordnen wir ein, wo Verantwortlichkeiten fehlen und warum sich Releases gegenseitig in die Quere kommen.',
      bring: [
        'Welche Partner und Teams an welchen Streams arbeiten',
        'Zwei oder drei Release-Konflikte oder Hotfixes aus den letzten Monaten, mit kurzem Hergang',
        'Vorhandene Standards, Coding-Regeln oder Vertragsklauseln, falls es sie gibt',
      ],
      clarify: [
        'Wer welche Objekte und Automatisierungen verantworten sollte',
        'Ob die Konflikte aus Zuständigkeiten, aus dem Prozess oder aus der Pipeline kommen',
        'Welche Standards Sie zuerst festlegen sollten',
      ],
    },
    en: {
      title: 'Several partners, unclear responsibilities?',
      text: 'In 30 minutes we sort out where ownership is missing and why releases keep getting in each other’s way.',
      bring: [
        'Which partners and teams work on which streams',
        'Two or three release conflicts or hotfixes from recent months, and what happened',
        'Existing standards, coding rules or contract clauses, if there are any',
      ],
      clarify: [
        'Who should own which objects and automations',
        'Whether the conflicts come from ownership, from the process or from the pipeline',
        'Which standards you should set first',
      ],
    },
  },
  licences: {
    de: {
      title: 'Steht ein Salesforce-Angebot oder eine Verlängerung an?',
      text: 'Bevor Sie unterschreiben, prüfen wir in 30 Minuten, ob Lizenzmix, Edition und Laufzeit zu Ihrer tatsächlichen Nutzung passen.',
      bring: [
        'Das aktuelle Angebot oder den laufenden Vertrag mit Positionen und Mengen',
        'Ihre Nutzer je Rolle: wer im Vertrieb oder Service arbeitet und wer nur liest oder freigibt',
        'Das Datum, bis zu dem Sie unterschreiben sollen, oder das Vertragsende',
      ],
      clarify: [
        'Welche Nutzer wirklich eine volle Lizenz brauchen und wo eine günstigere reicht',
        'Ob Edition und Add-ons zu Ihrem Bedarf der nächsten zwei bis drei Jahre passen',
        'Wo Sie vor der Unterschrift noch Verhandlungsspielraum haben',
      ],
    },
    en: {
      title: 'Is a Salesforce offer or renewal coming up?',
      text: 'Before you sign, we check in 30 minutes whether licence mix, edition and term match how you actually use Salesforce.',
      bring: [
        'The current offer or running contract with line items and quantities',
        'Your users by role: who works in sales or service and who only reads or approves',
        'The date by which you are asked to sign, or the end of your contract',
      ],
      clarify: [
        'Which users really need a full licence and where a cheaper one is enough',
        'Whether edition and add-ons fit what you need over the next two to three years',
        'Where you still have room to negotiate before signing',
      ],
    },
  },
  'field-service': {
    de: {
      title: 'Lohnt sich Field Service für Ihren Außendienst?',
      text: 'Ob sich Terminplanung und Routenoptimierung rechnen, hängt an wenigen Zahlen. Mit ihnen gebe ich Ihnen in 30 Minuten eine erste Einschätzung.',
      bring: [
        'Die typische Einsatzdauer: eher eine Stunde oder eher mehrere Tage pro Auftrag',
        'Die Fahrzeit zum Kunden und wie viele Einsätze ein Techniker am Tag schafft',
        'Wie Sie heute planen, mit wie vielen Disponenten und wie viel Aufwand pro Woche',
      ],
      clarify: [
        'Ob Ihre Einsätze von Field Service profitieren oder ein schlankeres Modell reicht',
        'Welche Kennzahlen sich mit Planung und Routenoptimierung verbessern lassen',
        'Welche Stammdaten und Schnittstellen, etwa zum ERP, vorher stehen müssen',
      ],
    },
    en: {
      title: 'Does Field Service pay off for your technicians?',
      text: 'Whether scheduling and route optimisation pay off depends on a few numbers. With them I can give you a first assessment in 30 minutes.',
      bring: [
        'The typical job duration: closer to one hour or to several days per job',
        'Travel time to the customer and how many jobs a technician completes per day',
        'How you plan today, with how many dispatchers and how much effort per week',
      ],
      clarify: [
        'Whether your jobs benefit from Field Service or a leaner setup is enough',
        'Which KPIs scheduling and route optimisation can improve',
        'Which master data and interfaces, for example to the ERP, have to be in place first',
      ],
    },
  },
  'manufacturing-cloud': {
    de: {
      title: 'Prüfen Sie die Manufacturing Cloud?',
      text: 'Ob sie sich lohnt, entscheidet der Nutzen in Ihrem Prozess. In 30 Minuten prüfen wir, ob es diesen Nutzen bei Ihnen gibt.',
      bring: [
        'Wie Sie heute Rahmenverträge, Abnahmemengen und Absatzprognosen führen',
        'Welches ERP die Aufträge hält und wie es mit Salesforce verbunden ist',
        'Das Angebot oder die Lizenzposition, falls schon eine vorliegt',
      ],
      clarify: [
        'Ob Sales Agreements und Account Forecasting zu Ihrem Geschäft passen',
        'Ob eine eigene Lösung auf Salesforce günstiger wäre',
        'Welche Zahlen in Ihren ROI-Case gehören',
      ],
    },
    en: {
      title: 'Evaluating Manufacturing Cloud?',
      text: 'Whether it pays off depends on the benefit in your process. In 30 minutes we check whether that benefit exists for you.',
      bring: [
        'How you manage framework agreements, committed volumes and sales forecasts today',
        'Which ERP holds the orders and how it is connected to Salesforce',
        'The offer or licence line item, if you already have one',
      ],
      clarify: [
        'Whether Sales Agreements and Account Forecasting fit your business',
        'Whether a custom solution on Salesforce would be cheaper',
        'Which numbers belong in your ROI case',
      ],
    },
  },
  ai: {
    de: {
      title: 'Planen Sie einen KI-Agenten auf Salesforce?',
      text: 'In 30 Minuten prüfen wir, ob Ihr Anwendungsfall trägt und was er im laufenden Betrieb kostet.',
      bring: [
        'Den Anwendungsfall: welche Anfrage oder Aufgabe der Agent übernehmen soll und wie oft sie vorkommt',
        'Wo die Daten dafür liegen, in Salesforce, im ERP oder in Dokumenten',
        'Ihre Lizenzlage für Agentforce und Data 360, falls bekannt',
      ],
      clarify: [
        'Ob ein Agent der richtige Weg ist oder ein Flow mit festen Regeln reicht',
        'Mit welchen laufenden Kosten pro Aktion Sie rechnen müssen',
        'Welche Datenqualität und welche Tests vor dem Go-live nötig sind',
      ],
    },
    en: {
      title: 'Planning an AI agent on Salesforce?',
      text: 'In 30 minutes we check whether your use case holds up and what it costs to run.',
      bring: [
        'The use case: which request or task the agent should take over and how often it occurs',
        'Where the data for it lives: in Salesforce, in the ERP or in documents',
        'Your licence situation for Agentforce and Data 360, if known',
      ],
      clarify: [
        'Whether an agent is the right approach or a flow with fixed rules is enough',
        'Which running costs per action you have to expect',
        'Which data quality and which tests you need before go-live',
      ],
    },
  },
  integration: {
    de: {
      title: 'Salesforce soll mit SAP und weiteren Systemen sprechen?',
      text: 'In 30 Minuten klären wir, welche Schnittstelle zuerst kommt und wie sie gebaut werden sollte.',
      bring: [
        'Die beteiligten Systeme, etwa SAP, proALPHA oder eine Telefonie-Lösung',
        'Welche Daten in welche Richtung fließen und wie aktuell sie sein müssen',
        'Bestehende Schnittstellen oder eine Middleware, falls vorhanden',
      ],
      clarify: [
        'Welches System für welche Daten führend ist',
        'Ob Sie eine Middleware brauchen oder eine direkte Anbindung reicht',
        'Wo heute die größten Risiken liegen, etwa bei Authentifizierung und Fehlerbehandlung',
      ],
    },
    en: {
      title: 'Salesforce needs to talk to SAP and other systems?',
      text: 'In 30 minutes we clarify which interface comes first and how it should be built.',
      bring: [
        'The systems involved, for example SAP, proALPHA or a telephony solution',
        'Which data flows in which direction and how current it has to be',
        'Existing interfaces or a middleware, if you have one',
      ],
      clarify: [
        'Which system is the master for which data',
        'Whether you need a middleware or a direct connection is enough',
        'Where the biggest risks are today, for example authentication and error handling',
      ],
    },
  },
  nearshore: {
    de: {
      title: 'Planen oder steuern Sie ein Nearshore-Team?',
      text: 'In 30 Minuten schauen wir, ob Teamgröße, Zusammensetzung und Steuerung zu Ihrem Vorhaben passen.',
      bring: [
        'Größe und Zusammensetzung des Teams, Standorte und Seniorität',
        'Wie oft in den letzten Monaten Personen gewechselt haben',
        'Wie Anforderungen heute ins Team kommen und wer Ergebnisse abnimmt',
      ],
      clarify: [
        'Ob Teamgröße und Mischung zu Ihrem Vorhaben passen',
        'Welche Steuerung auf Ihrer Seite fehlt',
        'Was Sie mit dem Dienstleister zu Besetzung und Wechseln vereinbaren sollten',
      ],
    },
    en: {
      title: 'Planning or running a nearshore team?',
      text: 'In 30 minutes we check whether team size, mix and steering fit your programme.',
      bring: [
        'Size and mix of the team, locations and seniority',
        'How often people have changed in recent months',
        'How requirements reach the team today and who accepts the results',
      ],
      clarify: [
        'Whether team size and mix fit your programme',
        'Which steering is missing on your side',
        'What you should agree with the provider on staffing and rotation',
      ],
    },
  },
  'make-or-buy': {
    de: {
      title: 'Selbst bauen oder kaufen?',
      text: 'In 30 Minuten ordnen wir Ihre Optionen ein, mit Blick auf Lizenzen, Betrieb und Folgekosten über mehrere Jahre.',
      bring: [
        'Den Prozess oder das Problem, das gelöst werden soll',
        'Die Optionen, die schon auf dem Tisch liegen, mit Angeboten falls vorhanden',
        'Ihre vorhandenen Salesforce-Lizenzen und die Systeme drumherum',
      ],
      clarify: [
        'Welche Option sich über die Jahre rechnet, inklusive Wartung',
        'Wo ein Standardprodukt passt und wo eine eigene Lösung auf Salesforce besser ist',
        'Welche Fragen Sie den Anbietern vor der Entscheidung noch stellen sollten',
      ],
    },
    en: {
      title: 'Build or buy?',
      text: 'In 30 minutes we sort your options, looking at licences, operation and follow-up costs over several years.',
      bring: [
        'The process or problem that needs solving',
        'The options already on the table, with offers if you have them',
        'Your existing Salesforce licences and the systems around them',
      ],
      clarify: [
        'Which option pays off over the years, maintenance included',
        'Where a standard product fits and where a custom solution on Salesforce is better',
        'Which questions you should still ask the vendors before deciding',
      ],
    },
  },
  change: {
    de: {
      title: 'Ein Release ist live, aber der Alltag bleibt beim Alten?',
      text: 'In 30 Minuten klären wir, wo neue Prozesse und Standards hängen bleiben und was die Einführung braucht.',
      bring: [
        'Was sich mit dem Release oder Standard ändern soll und für wen',
        'Woran Sie merken, dass es nicht ankommt, etwa Nutzung, Rückfragen oder Umgehungslösungen',
        'Wer die Einführung heute verantwortet',
      ],
      clarify: [
        'Ob es an der Lösung selbst oder an der Einführung liegt',
        'Welche Gruppen Sie zuerst gewinnen müssen',
        'Ob zusätzlich eine Change-Management-Expertin dazukommen sollte',
      ],
    },
    en: {
      title: 'The release is live, but daily work has not changed?',
      text: 'In 30 minutes we clarify where new processes and standards get stuck and what the rollout needs.',
      bring: [
        'What the release or standard is supposed to change, and for whom',
        'How you notice it is not landing, for example usage, questions or workarounds',
        'Who is responsible for the rollout today',
      ],
      clarify: [
        'Whether the cause is the solution itself or the way it was introduced',
        'Which groups you need to win over first',
        'Whether a dedicated change management expert should join',
      ],
    },
  },
} satisfies Record<string, Record<'en' | 'de', Brief>>;

export type ContactBrief = keyof typeof contactBriefs;
export const contactBriefIds = Object.keys(contactBriefs) as [ContactBrief, ...ContactBrief[]];

// Every blog category needs a brief of the same name.
const categoryBriefs: Record<Category, ContactBrief> = {
  devops: 'devops',
  architecture: 'architecture',
  'field-service': 'field-service',
  'manufacturing-cloud': 'manufacturing-cloud',
  ai: 'ai',
};

export function getContactBrief(lang: 'en' | 'de', id: ContactBrief | undefined, category?: Category): Brief {
  const key = id ?? (category ? categoryBriefs[category] : 'architecture');
  return contactBriefs[key][lang];
}
