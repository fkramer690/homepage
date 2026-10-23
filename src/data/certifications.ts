// Fabian's certifications as listed in his consultant resume (October 2026).
export interface Cert {
  name: string;
  year: number;
  // Why the certification matters in enterprise projects.
  en: string;
  de: string;
}

export const architectCerts: Cert[] = [
  {
    name: "Data Architect",
    year: 2020,
    en: "Most Salesforce problems that appear in year three were created in the data model in month one. This credential covers large data volumes, ownership skew and when data belongs outside the platform. In enterprise orgs with millions of records it decides whether reports, sharing and integrations still perform.",
    de: "Die meisten Salesforce-Probleme aus dem dritten Jahr entstehen im ersten Monat im Datenmodell. Diese Zertifizierung deckt große Datenmengen, Ownership-Skew und die Frage ab, welche Daten gar nicht auf die Plattform gehören. In Enterprise-Orgs mit Millionen Datensätzen entscheidet das, ob Reports, Sharing und Schnittstellen weiter performant laufen.",
  },
  {
    name: "Application Architect",
    year: 2020,
    en: "Salesforce awards this one for holding the Data Architect, Sharing and Visibility Architect, Platform App Builder and Platform Developer I credentials together. It stands for one judgement: configure, code or leave it out of Salesforce. Getting that call right early saves the most money in any project.",
    de: "Salesforce vergibt sie für die Kombination aus Data Architect, Sharing and Visibility Architect, Platform App Builder und Platform Developer I. Sie steht für eine Abwägung: konfigurieren, programmieren oder gar nicht in Salesforce bauen. Diese Entscheidung früh richtig zu treffen spart in jedem Projekt am meisten Geld.",
  },
  {
    name: "Sharing and Visibility Architect",
    year: 2020,
    en: "Who may see which record is a business question with legal weight. Role hierarchies, dealer access and works council requirements have to fit into one sharing model. A wrong model either leaks data or forces workarounds that users stop trusting.",
    de: "Wer welchen Datensatz sehen darf, ist eine fachliche Frage mit rechtlichem Gewicht. Rollenhierarchie, Händlerzugriffe und Vorgaben des Betriebsrats müssen in ein Sharing-Modell passen. Ein falsches Modell lässt entweder Daten durch oder erzwingt Umwege, denen die Nutzer nicht mehr trauen.",
  },
  {
    name: "Integration Architect",
    year: 2021,
    en: "Salesforce rarely stands alone: ERP, data platform, telephony and portals all exchange data with it. Whether an interface runs in real time, in batches or through events is an architecture decision with consequences for cost, error handling and operations. This credential covers those patterns and their limits.",
    de: "Salesforce steht selten allein: ERP, Datenplattform, Telefonie und Portale tauschen Daten mit ihm aus. Ob eine Schnittstelle in Echtzeit, im Batch oder über Events läuft, ist eine Architekturentscheidung mit Folgen für Kosten, Fehlerbehandlung und Betrieb. Diese Zertifizierung deckt diese Muster und ihre Grenzen ab.",
  },
  {
    name: "Identity and Access Management Architect",
    year: 2021,
    en: "Enterprise users log in through Entra ID or Okta, partners and customers through their own identities. Single sign-on, provisioning and external logins have to work together without locking people out or exposing data. Mistakes here surface on go-live day, in front of everyone.",
    de: "Mitarbeitende melden sich in Konzernen über Entra ID oder Okta an, Partner und Kunden mit eigenen Identitäten. Single Sign-on, Provisionierung und externe Logins müssen zusammenspielen, ohne Menschen auszusperren oder Daten offenzulegen. Fehler zeigen sich hier am Go-live-Tag, vor allen Beteiligten.",
  },
  {
    name: "System Architect",
    year: 2021,
    en: "Salesforce awards this one for Integration Architect, Identity and Access Management Architect, Development Lifecycle and Deployment Architect and Platform Developer I. It describes the view from outside: how Salesforce sits in the wider system landscape and how it is built, secured and shipped there.",
    de: "Salesforce vergibt sie für Integration Architect, Identity and Access Management Architect, Development Lifecycle and Deployment Architect und Platform Developer I. Sie beschreibt den Blick von außen: wie Salesforce in der Systemlandschaft sitzt und wie es dort gebaut, abgesichert und ausgeliefert wird.",
  },
  {
    name: "Development Lifecycle and Deployment Architect",
    year: 2021,
    en: "When several partners work in one org, the release process decides more than any single feature. Branching, environments, test strategy and deployment order have to hold up with a release every two weeks. This is where I spend a large part of my governance work.",
    de: "Wenn mehrere Partner in einer Org arbeiten, entscheidet der Release-Prozess mehr als jedes einzelne Feature. Branching, Umgebungen, Teststrategie und Deployment-Reihenfolge müssen bei einem Release alle zwei Wochen halten. Hier liegt ein großer Teil meiner Governance-Arbeit.",
  },
  {
    name: "B2B Solution Architect",
    year: 2023,
    en: "Manufacturers run processes from lead to quote, order, installed base and service, often with dealers in between. This credential tests designs that span several clouds and external systems. It matches the projects I work in, where a decision in sales shows up again in after-sales.",
    de: "Hersteller haben Prozesse vom Lead über Angebot und Auftrag bis zur installierten Anlage und zum Service, oft mit Händlern dazwischen. Diese Zertifizierung prüft Entwürfe über mehrere Clouds und externe Systeme hinweg. Das passt zu meinen Projekten, in denen eine Entscheidung im Vertrieb im After-Sales wieder auftaucht.",
  },
];

export const salesforceCerts: Cert[] = [
  {
    name: "Administrator",
    year: 2018,
    en: "Every solution has to be run by someone after go-live. Knowing the admin side keeps designs operable for the internal team, with users, permissions and data maintenance they can handle themselves.",
    de: "Jede Lösung muss nach dem Go-live jemand betreiben. Wer die Admin-Seite kennt, entwirft so, dass das interne Team Nutzer, Berechtigungen und Datenpflege selbst im Griff behält.",
  },
  {
    name: "Experience Cloud Consultant",
    year: 2019,
    en: "Dealer, partner and subcontractor portals put Salesforce data in front of people outside the company. Licensing, external sharing and branding have to be settled before the first page is built. A portal that partners do not use costs licences and brings nothing.",
    de: "Händler-, Partner- und Subunternehmer-Portale zeigen Salesforce-Daten Menschen außerhalb des Unternehmens. Lizenzen, externes Sharing und Branding müssen geklärt sein, bevor die erste Seite entsteht. Ein Portal, das Partner nicht nutzen, kostet Lizenzen und bringt nichts.",
  },
  {
    name: "Service Cloud Consultant",
    year: 2019,
    en: "In manufacturing, after-sales often carries the margin. Case routing, entitlements and SLAs are the base that field service, telephony and portals build on. If that base is unclear, every later extension inherits the problem.",
    de: "In der Industrie trägt der After-Sales oft die Marge. Fallrouting, Entitlements und SLAs sind die Basis, auf der Field Service, Telefonie und Portale aufbauen. Ist diese Basis unklar, erbt jede spätere Erweiterung das Problem.",
  },
  {
    name: "Platform App Builder",
    year: 2020,
    en: "Much of what teams code in Salesforce can be configured with standard tools. Knowing those tools well keeps custom code small, and small custom code keeps upgrades and handovers cheap.",
    de: "Vieles, was Teams in Salesforce programmieren, lässt sich mit Standardmitteln konfigurieren. Wer diese Mittel gut kennt, hält die Eigenentwicklung klein, und kleine Eigenentwicklung hält Upgrades und Übergaben günstig.",
  },
  {
    name: "Sales Cloud Consultant",
    year: 2020,
    en: "International sales teams need one shared process with country variants handled as configuration. Opportunity stages, forecasting and territory design decide whether management can trust the pipeline figures.",
    de: "Internationale Vertriebsteams brauchen einen gemeinsamen Prozess, in dem Ländervarianten über Konfiguration abgebildet werden. Opportunity-Phasen, Forecasting und Gebietsplanung entscheiden, ob das Management den Pipeline-Zahlen trauen kann.",
  },
  {
    name: "Platform Developer I",
    year: 2020,
    en: "As an architect I review code that partners write. Reading Apex and understanding governor limits lets me spot designs that will fail under load before they reach production.",
    de: "Als Architekt prüfe ich Code, den Partner schreiben. Wer Apex lesen kann und die Governor Limits versteht, erkennt Entwürfe, die unter Last scheitern, bevor sie in Produktion gehen.",
  },
  {
    name: "Advanced Administrator",
    year: 2020,
    en: "Mature orgs collect hundreds of flows, validation rules and permission sets. This credential covers the advanced tools to keep that manageable, so the org can still be changed safely after five years.",
    de: "Gewachsene Orgs sammeln Hunderte Flows, Validierungsregeln und Permission Sets. Diese Zertifizierung deckt die Werkzeuge ab, mit denen das beherrschbar bleibt, damit sich die Org auch nach fünf Jahren noch sicher ändern lässt.",
  },
  {
    name: "Field Service Consultant",
    year: 2020,
    en: "Field service connects installed assets, technician skills, scheduling rules and offline mobile work. Scheduling policies and the asset model have to be right before rollout, because technicians notice errors on their first day.",
    de: "Field Service verbindet installierte Anlagen, Fähigkeiten der Techniker, Planungsregeln und mobiles Arbeiten offline. Planungsrichtlinien und Anlagenmodell müssen vor dem Rollout stimmen, denn Techniker merken Fehler am ersten Tag.",
  },
  {
    name: "Nonprofit Cloud Consultant",
    year: 2020,
    en: "Industry clouds come with their own data model and assumptions. Working with one outside manufacturing showed me how to judge where an industry model fits and where it forces the business into the wrong shape. The same question comes up with Manufacturing Cloud.",
    de: "Branchen-Clouds bringen ein eigenes Datenmodell und eigene Annahmen mit. Die Arbeit mit einer außerhalb der Industrie hat mir gezeigt, wo ein Branchenmodell passt und wo es das Geschäft in eine falsche Form drückt. Dieselbe Frage stellt sich bei der Manufacturing Cloud.",
  },
  {
    name: "Business Analyst",
    year: 2022,
    en: "Many failed projects built the wrong thing well. Clear requirements, user stories with acceptance criteria and process mapping are the cheapest quality measure a project has.",
    de: "Viele gescheiterte Projekte haben das Falsche gut gebaut. Klare Anforderungen, User Stories mit Akzeptanzkriterien und Prozessaufnahmen sind die günstigste Qualitätsmaßnahme in einem Projekt.",
  },
  {
    name: "Platform Developer II",
    year: 2022,
    en: "Asynchronous processing, complex triggers and test strategy are where Salesforce code gets expensive. This level lets me judge partner designs at production data volumes and push back with specific alternatives.",
    de: "Asynchrone Verarbeitung, komplexe Trigger und Teststrategie sind die Stellen, an denen Salesforce-Code teuer wird. Diese Stufe erlaubt mir, Partner-Entwürfe bei Produktionsvolumen zu beurteilen und mit konkreten Alternativen gegenzuhalten.",
  },
  {
    name: "Associate",
    year: 2022,
    en: "The entry credential covers the shared vocabulary of the platform. It is the one I point new team members to when they join a project, so business and IT discuss the same things.",
    de: "Die Einstiegszertifizierung deckt das gemeinsame Vokabular der Plattform ab. Auf sie verweise ich neue Teammitglieder beim Projektstart, damit Fachbereich und IT über dieselben Dinge sprechen.",
  },
  {
    name: "Strategy Designer",
    year: 2023,
    en: "Design thinking and discovery workshops clarify the problem before anyone picks a solution. In enterprise projects with many stakeholders this saves weeks of building features nobody asked for.",
    de: "Design Thinking und Discovery-Workshops klären das Problem, bevor jemand eine Lösung auswählt. In Enterprise-Projekten mit vielen Beteiligten spart das Wochen, in denen sonst Funktionen entstehen, nach denen niemand gefragt hat.",
  },
  {
    name: "Sales Representative",
    year: 2025,
    en: "This credential looks at sales from the salesperson's side. CRM adoption depends on whether the system helps sales reps sell, and a forecast is only reliable when they enter their data willingly.",
    de: "Diese Zertifizierung betrachtet Vertrieb aus Sicht der Vertriebler. Ob ein CRM angenommen wird, hängt davon ab, ob es beim Verkaufen hilft, und ein Forecast ist nur belastbar, wenn die Daten gern gepflegt werden.",
  },
  {
    name: "AI Specialist",
    year: 2025,
    en: "Agentforce agents act on real data and real processes. Prompt design, the Einstein Trust Layer and clear limits on what an agent may do decide whether AI in Salesforce is safe enough for production.",
    de: "Agentforce-Agenten arbeiten mit echten Daten und echten Prozessen. Prompt-Design, der Einstein Trust Layer und klare Grenzen, was ein Agent darf, entscheiden, ob KI in Salesforce produktionsreif ist.",
  },
  {
    name: "AI Associate",
    year: 2025,
    en: "AI results are only as good as the data behind them. This credential covers the basics of data quality, bias and responsible use that need to be settled before any model is switched on.",
    de: "KI-Ergebnisse sind nur so gut wie die Daten dahinter. Diese Zertifizierung deckt Datenqualität, Bias und verantwortungsvollen Einsatz ab, also das, was geklärt sein muss, bevor ein Modell eingeschaltet wird.",
  },
  {
    name: "Marketing Associate",
    year: 2025,
    en: "The handover between marketing and sales is where leads and consent records get lost. Knowing the marketing side helps define that handover so that leads arrive qualified and consent is documented.",
    de: "An der Übergabe zwischen Marketing und Vertrieb gehen Leads und Einwilligungen verloren. Wer die Marketing-Seite kennt, kann diese Übergabe so definieren, dass Leads qualifiziert ankommen und Einwilligungen dokumentiert sind.",
  },
];

// Grouped by the key used for the group title in the i18n files.
export const otherCerts: Record<'architecture' | 'devops' | 'delivery' | 'crm', Cert[]> = {
  architecture: [
    {
      name: "iSAQB CPSA-F (Software Architecture)",
      year: 2019,
      en: "Software architecture methods apply beyond any single vendor: quality goals, architecture decisions and documentation. They help me write down why a design was chosen, which matters when the next partner takes over.",
      de: "Methoden der Softwarearchitektur gelten unabhängig vom Hersteller: Qualitätsziele, Architekturentscheidungen und Dokumentation. Mit ihnen halte ich fest, warum ein Entwurf gewählt wurde, und das zählt, wenn der nächste Partner übernimmt.",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      year: 2021,
      en: "Data platforms and IoT services often run on AWS next to Salesforce. Understanding the AWS side helps decide where data and logic should live and what each option costs.",
      de: "Datenplattformen und IoT-Dienste laufen oft auf AWS neben Salesforce. Wer die AWS-Seite versteht, kann entscheiden, wo Daten und Logik liegen sollten und was jede Variante kostet.",
    },
    {
      name: "MuleSoft Associate",
      year: 2025,
      en: "API-led connectivity organises interfaces in reusable layers. With many systems around Salesforce this keeps the landscape changeable, because a new system connects to existing APIs.",
      de: "API-led Connectivity ordnet Schnittstellen in wiederverwendbaren Schichten. Bei vielen Systemen rund um Salesforce bleibt die Landschaft so veränderbar, weil ein neues System an bestehende APIs andockt.",
    },
  ],
  devops: [
    {
      name: "Copado Certified Fundamentals I",
      year: 2021,
      en: "Copado is one of the common DevOps tools for Salesforce. Knowing its pipeline model helps set up promotion paths and an audit trail that regulated companies need.",
      de: "Copado ist eines der verbreiteten DevOps-Werkzeuge für Salesforce. Wer sein Pipeline-Modell kennt, richtet Promotion-Pfade und eine Audit-Spur ein, wie regulierte Unternehmen sie brauchen.",
    },
    {
      name: "Copado Certified Fundamentals II",
      year: 2021,
      en: "The second level covers merge conflicts, back promotions and parallel work streams. Those are the situations where teams lose trust in their pipeline and start deploying by hand again.",
      de: "Die zweite Stufe behandelt Merge-Konflikte, Back Promotions und parallele Arbeitsstränge. In genau diesen Situationen verlieren Teams das Vertrauen in ihre Pipeline und deployen wieder von Hand.",
    },
    {
      name: "Flosum Certified Professional",
      year: 2021,
      en: "Flosum runs natively on Salesforce, which matters to companies whose security rules keep source code and metadata inside the platform. Knowing it lets me recommend a DevOps tool that fits those rules.",
      de: "Flosum läuft nativ auf Salesforce. Das zählt für Unternehmen, deren Sicherheitsvorgaben Quellcode und Metadaten innerhalb der Plattform halten. Wer es kennt, kann ein DevOps-Werkzeug empfehlen, das zu diesen Vorgaben passt.",
    },
    {
      name: "Flosum Certified Expert",
      year: 2021,
      en: "The expert level goes into compliance features, approvals and reporting on changes. In audited environments this shortens audits considerably, because every change can be traced to a ticket and an approval.",
      de: "Die Expert-Stufe geht auf Compliance-Funktionen, Freigaben und Änderungsberichte ein. In geprüften Umgebungen verkürzt das Audits deutlich, weil sich jede Änderung einem Ticket und einer Freigabe zuordnen lässt.",
    },
    {
      name: "Gearset Master",
      year: 2022,
      en: "Gearset Master is the top level of the Gearset Academy. It covers moving teams from change sets to version control, automated testing and seeding test data before UAT. Many of the orgs I review are still in the middle of that move.",
      de: "Gearset Master ist die höchste Stufe der Gearset Academy. Sie deckt den Weg von Change Sets zur Versionskontrolle, automatisierte Tests und das Befüllen von Testdaten vor dem UAT ab. Viele Orgs, die ich prüfe, stecken mitten in diesem Wechsel.",
    },
  ],
  delivery: [
    {
      name: "Professional Scrum Master I (PSM I)",
      year: 2019,
      en: "Scrum only helps when sprints aim at outcomes the business can check. With several partners delivering in parallel, a shared understanding of the framework keeps planning, reviews and dependencies in step.",
      de: "Scrum hilft nur, wenn Sprints auf Ergebnisse zielen, die der Fachbereich prüfen kann. Wenn mehrere Partner parallel liefern, hält ein gemeinsames Verständnis des Frameworks Planung, Reviews und Abhängigkeiten im Takt.",
    },
    {
      name: "PRINCE2 Foundation",
      year: 2020,
      en: "Large companies often steer programmes with a steering committee while teams work in Scrum. PRINCE2 gives me the vocabulary of the governance side, so both levels can be connected without friction.",
      de: "Große Unternehmen steuern Programme oft über einen Lenkungskreis, während die Teams in Scrum arbeiten. PRINCE2 gibt mir das Vokabular der Steuerungsebene, damit sich beide Ebenen ohne Reibung verbinden lassen.",
    },
    {
      name: "Six Sigma Yellow Belt",
      year: 2022,
      en: "Manufacturing companies think in processes, defects and DMAIC. Speaking that language makes it easier to work with operations and quality teams on service and production processes.",
      de: "Industrieunternehmen denken in Prozessen, Fehlern und DMAIC. Wer diese Sprache spricht, arbeitet leichter mit Produktion und Qualitätsmanagement an Service- und Fertigungsprozessen.",
    },
    {
      name: "Six Sigma Green Belt",
      year: 2022,
      en: "The Green Belt adds measurement and root cause analysis. In service projects I use it for questions like why cases are reopened or why the first-time fix rate drops, before deciding what to change in Salesforce.",
      de: "Der Green Belt ergänzt Messung und Ursachenanalyse. In Service-Projekten nutze ich das für Fragen wie, warum Fälle wieder geöffnet werden oder die Erstlösungsquote sinkt, bevor ich entscheide, was sich in Salesforce ändern soll.",
    },
  ],
  crm: [
    {
      name: "HubSpot Sales Software",
      year: 2025,
      en: "Some companies or business units are better served by HubSpot than by Salesforce. Knowing both lets me give an honest make-or-buy recommendation and plan migrations in either direction.",
      de: "Manche Unternehmen oder Geschäftsbereiche sind mit HubSpot besser bedient als mit Salesforce. Wer beides kennt, kann ehrlich zu Make-or-Buy beraten und Migrationen in beide Richtungen planen.",
    },
    {
      name: "HubSpot Marketing Software",
      year: 2025,
      en: "HubSpot Marketing is a common alternative to Marketing Cloud. Knowing it allows a licence recommendation based on the requirements alone.",
      de: "HubSpot Marketing ist eine verbreitete Alternative zur Marketing Cloud. Wer es kennt, kann eine Lizenzempfehlung geben, die sich allein an den Anforderungen orientiert.",
    },
    {
      name: "HubSpot Service Software",
      year: 2025,
      en: "HubSpot Service is enough for many small support teams. It reaches its limits with installed assets, field service and complex entitlements, which is the point where Salesforce Service Cloud earns its cost.",
      de: "HubSpot Service reicht für viele kleine Support-Teams. An Grenzen stößt es bei installierten Anlagen, Field Service und komplexen Entitlements, und an diesem Punkt rechnet sich die Salesforce Service Cloud.",
    },
  ],
};
