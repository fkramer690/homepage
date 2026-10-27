---
title: "Salesforce-Werkzeuge für KI-Entwicklung im Überblick"
description: "Agentforce Vibes, Skills, Claude-Code-Plugin, Agentforce DX, Code Analyzer und Admin-KI: was Salesforce für KI-Entwicklung bietet und was es kostet."
lang: de
slug: salesforce-werkzeuge-ki-entwicklung
translationKey: masterclass-02
chapter: 2
short: "Salesforce-Werkzeuge"
summary: "Welche KI-Werkzeuge Salesforce selbst für Entwicklung und Administration anbietet, was sie kosten und wo ihre Grenzen liegen."
takeaways:
  - "Salesforce bietet einen eigenen Coding-Agenten, Agentforce Vibes, und dieselben Fähigkeiten als Skills, Claude-Code-Plugin und MCP-Server für fremde Agenten. Die Wahl des Agenten bleibt damit offen."
  - "Agentforce Vibes ist in der EU Operating Zone nicht verfügbar. Außerhalb der Developer Edition braucht es seit Juni 2026 Flex Credits oder eine Unmetered-Lizenz."
  - "Die Unmetered-Lizenz begrenzt das Premium-Modell auf 2.500 Requests oder 36 Mio. Token pro Org und 30 Tage, nicht pro Nutzer. Sechs Entwickler mit je 25 Requests am Tag erreichen sie nach acht Arbeitstagen."
  - "Neue Agentforce-Agenten entstehen seit Juli 2026 nur noch mit Agent Script. Als AiAuthoringBundle lassen sie sich in Git versionieren, testen und über die Pipeline ausrollen."
  - "Code Analyzer und ApexGuru prüfen ohne Sprachmodell. Eigene Regeln für KI-generierten Code hat Salesforce nicht, deshalb gehören diese Prüfungen als Pflicht in die Pipeline."
articles: [vibes-claude-code-copilot-comparison, testing-agentforce-agents, ai-rules-file-salesforce-repo, agent-script-deterministic-rules]
faq:
  - q: "Ist Agentforce Vibes kostenlos?"
    a: "Nur in der Developer Edition und nur begrenzt: 110 Requests oder 1,5 Mio. Token pro Org, einen Monat ab erster Nutzung, ohne Refresh. In allen anderen Orgs brauchen Sie Flex Credits oder eine Unmetered-Lizenz, deren Premium-Modell auf 2.500 Requests oder 36 Mio. Token pro Org in 30 Tagen begrenzt ist."
  - q: "Kann ich Agentforce Vibes in der EU Operating Zone nutzen?"
    a: "Nein. Laut FAQ von Salesforce ist Vibes in der EU Operating Zone nicht verfügbar, in EU-Orgs außerhalb davon aber schon. Bleibt dann Claude Code mit dem Salesforce-Plugin oder ein anderer Agent mit den sf-skills, prüfen Sie dort Datenresidenz und Vertrag gesondert."
  - q: "Brauche ich Agentforce Vibes, um Agentforce-Agenten zu bauen?"
    a: "Nein. Agentforce-Agenten entstehen im Agentforce Builder oder als Agent-Script-Datei mit Agentforce DX über die Salesforce CLI. Salesforce beschreibt, wie Claude Code, Codex oder Vibes diese Dateien mit Skills erzeugen; welches Werkzeug Ihr Partner nutzt, ist zweitrangig."
  - q: "Prüft Salesforce KI-generierten Code automatisch?"
    a: "Nur wenn Sie es einrichten. Code Analyzer und ApexGuru prüfen jeden Code gleich, egal wer ihn geschrieben hat, und Salesforce dokumentiert keine eigenen Regeln für KI-Code. Damit die Prüfung greift, muss sie als Pflichtschritt in der Pipeline laufen."
draft: false
---

Salesforce bietet für KI-gestützte Entwicklung 2026 zwei Wege an: den eigenen Coding-Agenten Agentforce Vibes und dieselben Fähigkeiten als Skills, Plugin und MCP-Server für fremde Agenten wie Claude Code oder Codex. Für einen Hersteller ist die Wahl des Agenten die kleinere Entscheidung. Wichtiger sind drei Dinge darunter: Agentforce DX, das Agentforce-Agenten zu versionierbaren Metadaten macht, Code Analyzer als Prüfer ohne Sprachmodell und die Abrechnung. Vibes ist seit Juni 2026 nur noch in der Developer Edition begrenzt kostenlos und in der EU Operating Zone nicht verfügbar.

## Welche KI-Werkzeuge bietet Salesforce für die Entwicklung?

Die Werkzeuge gehören zur Ebene „KI zum Bauen“ aus [Kapitel 1](../begriffe-und-landkarte/), dazu kommt die Admin-KI im Setup. Stand Oktober 2026:

| Werkzeug | Wofür | Stand Oktober 2026 | Abrechnung |
|---|---|---|---|
| Agentforce Vibes 2.0 | Coding-Agent in VS Code | GA seit 12. Juni 2026 | Flex Credits oder Unmetered-Lizenz |
| Agentforce Vibes IDE (früher Code Builder) | VS Code im Browser, aus dem Setup gestartet | in jeder Developer Edition seit April 2026 | wie Vibes |
| Skills-Bibliothek `forcedotcom/sf-skills` | Salesforce-Wissen für Claude Code, Codex, Cursor und Vibes | Open Source, laut Salesforce über 100 Skills | kostenlos, Modellnutzung separat |
| Claude-Code-Plugin `salesforce-development` | rund 40 Skills, drei MCP-Server, Agenten und Hooks | veröffentlicht am 19. August 2026 | kostenlos, Claude-Nutzung separat |
| Agentforce DX (`sf agent`) | Agentforce-Agenten als Metadaten bauen, testen, ausrollen | GA seit Mai 2025 | kein eigener Preis veröffentlicht |
| Agentforce Builder und Agent Script | Agentforce-Agenten entwerfen | GA seit Spring '26, seit Juli 2026 einziger Weg für neue Agenten | im Agentforce-Kauf enthalten |
| Code Analyzer mit ApexGuru | statische Prüfung von Apex, LWC und Flows | acht Engines, Skills für Agenten | kein eigener Preis veröffentlicht |
| Setup with Agentforce | Admin-Agent auf jeder Setup-Seite | aktivierbar, GA-Status nicht bestätigt | Data 360 Credits |
| Einstein for Flow | Flow-Entwürfe und Formeln aus Text | GA seit Spring '25 | Einstein Requests |

Quellen: [Vibes GA](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), [Vibes IDE](https://developer.salesforce.com/blogs/2026/04/new-developer-edition-agentforce-vibes-claude-mcp), [Plugin und Skills](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin), [Agentforce DX](https://developer.salesforce.com/blogs/2025/05/introducing-agentforce-dx-pro-code-tools), [Agent Script](https://www.salesforce.com/blog/upgrade-to-agent-script/), [Code Analyzer Engines](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html).

Die Richtung hat sich in einem Jahr gedreht. Im Oktober 2025 startete Vibes als Agent auf Basis des Open-Source-Projekts Cline, [GA mit einer begrenzten Zahl an Requests](https://developer.salesforce.com/blogs/2025/10/unleash-your-innovation-with-agentforce-vibes-vibe-coding-for-the-enterprise). 2026 liefert Salesforce dasselbe Wissen an jeden Agenten aus. Unter dem Namen Headless 360 soll [jede wichtige Fähigkeit als API, MCP-Tool oder CLI-Befehl](https://developer.salesforce.com/blogs/2026/05/headless-360-what-it-means-for-developers) verfügbar sein: über 60 MCP-Tools, über 30 Coding-Skills, über 4.000 APIs und über 220 CLI-Befehle. Jede Aktion läuft als konkreter Benutzer, mit Freigaberegeln, Feldberechtigungen, Validierungsregeln und Governor Limits. Für Sie als Auftraggeber heißt das: Welcher Agent im Team arbeitet, entscheidet nicht darüber, was er in der Org darf.

Ein Hinweis für Angebote von Partnern: „Einstein for Developers“ und „Agentforce for Developers“ sind [ältere Namen](https://developer.salesforce.com/blogs/2024/09/introducing-agentforce-for-developers) aus den Jahren 2023 und 2024, damals mit Salesforce-eigenen Modellen. Steht einer davon im Angebot, beschreibt es einen Vorgänger von Vibes.

## Agentforce Vibes: was es kann und was es kostet

Vibes 2.0 läuft laut [GA-Ankündigung](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) auf Salesforces Coding Agent Platform, „powered by Claude and the Mastra agent orchestration engines“. Laut [Claudeforce-Ankündigung](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) vom August 2026 ist Claude das Standardmodell. Die Funktionen, die für einen Auftraggeber zählen:

- **Plan Mode:** Der Agent zerlegt eine Aufgabe in einen Plan, bevor er Dateien ändert.
- **Freigaben:** Der Standardmodus „Run safe defaults“ ändert Dateien im Workspace ohne Rückfrage. Pfade außerhalb, geschützte Dateien und Schreibzugriffe auf `.git/` brauchen eine Freigabe.
- **Sub-Agenten:** Ein führender Agent verteilt Arbeit an Sub-Agenten für Apex, LWC, Jest-Tests und SOQL, jeder in einem [eigenen Git-Worktree](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html).
- **MCP:** [Rechte lassen sich pro Tool verwalten](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-permissions-safety.html), und ein Schalter, der nicht destruktive Schreibzugriffe über Salesforce-MCP-Tools automatisch freigibt, ist standardmäßig aus.
- **Regeln und Skills:** Projektregeln liegen in [`.vibes/rules/`](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html), früher `.a4drules/`. Projektregeln schlagen globale Regeln. Eingebaute Regeln wie `production-guardrails` lassen sich abschalten, aber nicht ändern.

Die Doku sagt nicht, ob Vibes auch `CLAUDE.md` oder `AGENTS.md` liest. Claude Code liest laut [Anthropic](https://code.claude.com/docs/en/memory) `CLAUDE.md` oder ein vorhandenes `AGENTS.md`. Arbeitet Ihr Partner mit Vibes und Ihr eigenes Team mit Claude Code, brauchen Sie die Regeln an zwei Stellen oder eine gemeinsame Quelle. Warum diese Datei in Ihr Repository gehört und wem sie gehört, steht in [die KI-Regeldatei im Salesforce-Repository](../../blog/ki-regeldatei-salesforce-repository/).

### Lizenzwege und Grenzen

| Lizenzweg | Modelle | Grenze |
|---|---|---|
| Unmetered-Lizenz, „Included“ | GPT-5 | Fair Use laut Vertrag |
| Unmetered-Lizenz, „Premium“ | Claude Sonnet 4.6 | 2.500 Requests oder 36 Mio. Token pro Org, Reset 30 Tage nach erster Nutzung |
| Flex Credits | Sonnet 4.6 (Standard), GPT-5, GPT-5.4, Opus 4.5 bis 4.8 | nach Verbrauch, in Einheiten zu 2.000 Token, aufgerundet |
| Developer Edition | Claude Sonnet | 110 Requests oder 1,5 Mio. Token pro Org, ein Monat, kein Refresh |

Quellen: [Vibes Usage and Billing](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), [Vibes FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html).

Die Zahl, die ich zuerst prüfen würde: Die Grenze der Unmetered-Lizenz gilt laut FAQ pro Org, nicht pro Nutzer. Ist sie erreicht, arbeitet das Team mit GPT-5 weiter oder zahlt Flex Credits. Opus läuft als „Advanced Prompt“; die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) setzt dafür 16 Credits an, bei [500 € je 100.000 Credits](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) also 0,08 € je angefangene 2.000 Token. Die Unmetered-Lizenz führt die [Preisseite von Vibes](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) als Flat Fee zu 125 € pro Nutzer und Monat. Welche Stufe Sonnet und GPT haben, nennt die Billing-Seite nicht. Das fragen Sie beim Account Team an.

Seit dem 1. Juni 2026 braucht Vibes außerhalb der Developer Edition [Flex Credits oder eine bezahlte Lizenz](https://www.salesforceben.com/agentforce-vibes-no-longer-free-for-use/). SalesforceBen meldete zur Dreamforce 2026 für Developer Editions wieder [50 Requests oder 1 Mio. Token mit täglichem Reset](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-26/). Die offizielle FAQ nennt weiter 110 Requests für einen Monat ohne Refresh. Ich plane mit der FAQ.

Für deutsche Hersteller wiegt ein Satz der FAQ am schwersten: „Agentforce Vibes isn't available in the EU Operating Zone.“ In EU-Orgs außerhalb der Operating Zone ist Vibes nach Standardbedingungen nutzbar. Group, Professional, Essentials und Government Cloud sind ebenfalls ausgeschlossen. Wer die EU Operating Zone aus Datenschutzgründen gewählt hat, landet bei externen Agenten mit eigenen Datenresidenzfragen. Den Vergleich nach Vertrag, Datenresidenz und Kostenmodell finden Sie in [Agentforce Vibes, Claude Code oder Copilot](../../blog/agentforce-vibes-claude-code-copilot-vergleich/), die externen Agenten selbst in [Kapitel 4](../externe-coding-agenten/).

## Skills, Plugin und Headless 360: Salesforce-Wissen für fremde Agenten

Die Skills-Bibliothek `forcedotcom/sf-skills` ist Open Source. Salesforce nennt im [Juni 2026](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) Beispiele wie `generating-apex`, `generating-apex-test`, `generating-lwc-components`, `debugging-apex-logs` und `generating-flow`. Installiert wird mit `npx skills add forcedotcom/sf-skills`. In Vibes ist die Bibliothek vorinstalliert, für OpenCode, Claude Code, Codex und Cursor nennt Salesforce im [August 2026](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) denselben Installationsweg.

Das Claude-Code-Plugin aus derselben Ankündigung bündelt rund 40 dieser Skills, ohne Data 360, Commerce und Mobile. Dazu kommen drei MCP-Server (`salesforce-api-context`, `salesforce-metadata-experts`, `salesforce-lsp`), ein Entwicklungsagent, ein nur lesender Agent `architecture-review`, der ein Projekt gegen die Säulen des Well-Architected Framework bewertet, und Hooks. Ein Hook prüft die Syntax von Agent-Script-Dateien, ein anderer validiert Deployments. Ein Hook läuft automatisch, ein Satz im Prompt wirkt nur, wenn das Modell ihn beachtet. Deshalb halte ich die Hooks für den wertvollsten Teil.

Salesforce weist selbst darauf hin, dass Plugins herstellerspezifisch sind, Skills und MCP dagegen Standards. Skills sind im Kern Anweisungen und Skripte, die das Modell bei Bedarf lädt. Sie machen einen Agenten besser in Salesforce, erzwingen aber nichts. Durchgesetzt wird über Hooks, Code Analyzer und die Pipeline.

Drei Termine gehören in diesen Teil. Der lokale Salesforce DX MCP Server erreicht laut [End-of-Life-Hinweis der Maintainer](https://github.com/forcedotcom/mcp/issues/46) am 2. November 2026 sein End of Life; was das für Ihren Partner bedeutet, beschreibt [Kapitel 3](../mcp-und-schnittstellen/). Laut [SalesforceBen](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-26/) ist ein MCP-Plugin für Claude Code für Winter '27 zu erwarten, für ein Codex-Plugin peilt Salesforce Spring '27 nur an, und Governance für Tools und Skills in Vibes ist dann erhofft. Behandeln Sie das als Roadmap, nicht als Zusage. DevOps Center MCP wurde zur TDX 2026 [angekündigt](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/), ein Verfügbarkeitsdatum fehlt.

## Agentforce DX und Agent Script: Agenten als Metadaten

Für einen Hersteller, der einen ersten Agenten für Händleranfragen plant, ist dieser Teil wichtiger als der Coding-Agent. [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) bringt die Salesforce-DX-Werkzeuge auf Agenten: CLI-Befehle und eine VS-Code-Erweiterung, mit denen Agenten außerhalb von Agentforce Studio entstehen, getestet und ausgerollt werden. Seit [Mai 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) liegt ein Agent als `.agent`-Datei im Metadatentyp `AiAuthoringBundle`. Jede veröffentlichte Version erzeugt ein `GenAiPlannerBundle`, API-Version 66.0 ist Voraussetzung. In der Pipeline sind es drei Schritte:

```
sf project deploy start --metadata AiAuthoringBundle --target-org uat
sf agent publish authoring-bundle --api-name Haendler_Service --target-org uat
sf agent activate --api-name Haendler_Service --version 2 --target-org uat
```

Damit geht ein Agent denselben Weg wie Apex: Pull Request, Review, Deployment, Freigabe. Der neue Agentforce Builder ist seit Spring '26 GA. Seit Juli 2026 entstehen neue Agenten [nur noch dort](https://www.salesforce.com/blog/upgrade-to-agent-script/), der alte Builder ist eingefroren, ein Abschaltdatum fehlt, und ein Umstieg bedeutet Neubau. Agent Script ist seit der TDX 2026 [Open Source](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/). Die Sprache trennt Logik, die als Code läuft, von Anweisungen an das Sprachmodell. Warum Kreditlimit, Garantieanspruch und Preisfreigabe in die Logik gehören, beschreibe ich in [Agent Script: Regeln statt LLM](../../blog/agent-script-regeln-statt-llm/).

Salesforce zeigt im [Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce), wie Claude Code, Codex oder Vibes mit Skills eine Agent-Script-Datei entwerfen, deployen und testen. Tests sind YAML-Spezifikationen mit erwartetem Thema, erwarteten Aktionen und erwartetem Ergebnis; das Ergebnis bewertet ein Sprachmodell als Richter. Eine Bestehensquote nennt Salesforce nicht. Wie Sie diese Schwelle vor dem Piloten festlegen, steht in [Agentforce-Agenten testen und freigeben](../../blog/agentforce-agenten-testen-freigeben/).

## Code Analyzer und ApexGuru: Prüfer ohne Sprachmodell

Code Analyzer bündelt laut [Doku](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) acht Engines: PMD, ESLint, RetireJS, Regex, Flow Scanner, CPD, Salesforce Graph Engine und ApexGuru. Er läuft über CLI, in VS Code und in CI/CD. Für Agenten gibt es [drei Skills](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/skills.html), die eine Anfrage in CLI-Befehle übersetzen, die Konfiguration anlegen und eigene PMD-Regeln erstellen. Der MCP-Zugang zu Code Analyzer wird [seit Juni 2026 nicht mehr unterstützt](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/mcp.html). Salesforce empfiehlt CLI oder VS Code, sofern kein Sprachmodell gebraucht wird, weil jeder Modellaufruf Geld und Umweltkosten verursacht.

ApexGuru findet laut [Salesforce](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server) SOQL in Schleifen, unbegrenzte Abfragen, teure Schema-Abfragen und Abfragen, die mehr Felder holen als genutzt werden. Schweregrade aus echten Laufzeitdaten gibt es nur mit ApexGuru in Produktion oder einer Full-Copy-Sandbox.

Regeln speziell für KI-generierten Code dokumentiert Salesforce nicht. Ich halte das für richtig, denn Code Analyzer prüft Qualität, egal woher der Code kommt. Die Konsequenz für Sie ist aber klar. Die Prüfung, die über den Weg in Produktion entscheidet, läuft in der Pipeline und ohne Sprachmodell, nicht im Chat des Agenten. Wie Review und Gates zusammenspielen, beschreibt [Kapitel 8](../best-practices-ki-code/), die Umsetzung gehört zu meiner Arbeit in [DevOps und Release Management](../../leistungen/devops-und-release-management/).

## Admin-KI: Setup with Agentforce, Einstein for Flow und Prompt Builder

Die Admin-KI ändert dieselbe Org, nur über die Oberfläche statt über Code.

- **Einstein for Flow** erzeugt laut [SalesforceBen](https://www.salesforceben.com/einstein-for-flow-now-generally-available-tutorial-and-first-steps/) Flow-Entwürfe mit bis zu etwa sechs Elementen, Formeln und Flow-Beschreibungen. Jede Erzeugung verbraucht Einstein Requests, in Produktion und Sandbox.
- **Setup with Agentforce** setzt Data Cloud voraus und zeigt nach Aktivierung einen Button „Ask Setup Agent“ auf den Setup-Seiten. Laut [SalesforceTime](https://salesforcetime.com/2026/09/01/setup-with-agentforce-everything-you-need-to-know/) legt der Agent Objekte, Felder, Benutzer, Berechtigungen, Freigabeeinstellungen, Flows, Berichtstypen und Lightning-Seiten an, schlägt Änderungen vor der Ausführung vor und verbraucht Data 360 Credits. Einen GA-Status habe ich auf keiner Salesforce-Seite gefunden.
- **Prompt Builder** ist [GA](https://developer.salesforce.com/blogs/2025/10/build-and-optimize-agents-with-new-agentforce-360-features) und kann seit Winter '26 Bilder und PDFs verarbeiten, Antworten als HTML oder JSON strukturieren und bis zu 1.000 Prompts als Batch ausführen.

Damit verbraucht die Admin-KI drei Währungen: Einstein Requests, Data 360 Credits und Flex Credits. Das gehört in die Lizenzplanung. Meine Empfehlung: Setup-Agent und Einstein for Flow nur in Sandboxes einsetzen, und die Ergebnisse gehen über die Pipeline wie jede andere Metadatenänderung. Ein Agent, der in Produktion Freigabeeinstellungen ändert, macht das alte Problem direkter Änderungen nur schneller.

## Ein typisches Szenario: Werkzeugwahl bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Händlerportal und SAP an. Ein Implementierungspartner arbeitet mit sechs Entwicklern, geplant ist ein erster Agentforce-Agent für Händleranfragen zum Auftragsstatus. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

1. **Org-Standort.** Liegt die Org in der EU Operating Zone, ist Vibes keine Option. Nehmen wir an, sie liegt in einer EU-Org außerhalb davon.
2. **Coding-Lizenz.** Der Partner möchte die Unmetered-Lizenz mit Sonnet. Angenommen sind 25 agentische Requests pro Entwickler und Arbeitstag mit durchschnittlich 30.000 Token. Sechs Entwickler kommen auf 150 Requests und 4,5 Mio. Token am Tag. Die Grenze von 36 Mio. Token ist nach acht Arbeitstagen erreicht, die 2.500 Requests wären es nach knapp 17. Weil die Grenze pro Org gilt, arbeitet das Team ab dem neunten Arbeitstag mit GPT-5 weiter oder zahlt Flex Credits. Ob Salesforce den Kontext jedes Agentenschritts voll zählt, habe ich nicht dokumentiert gefunden; das gehört vor die Unterschrift geklärt.
3. **Metered mit Opus.** Dieselben 30.000 Token sind 15 Einheiten zu 16 Credits, also 240 Credits oder 1,20 € pro Request. 150 Requests am Tag kosten damit 180 €, rund 3.780 € in 21 Arbeitstagen.
4. **Der Agent selbst.** Er entsteht als Agent Script in Git, Kreditprüfung und Auftragsabfrage laufen als Logik. Für den Test sind 60 Fälle mit je drei Aktionen in drei Durchläufen angenommen. Das sind 540 Aktionen zu je 16 Credits in der Sandbox, also 8.640 Credits oder 43,20 €.
5. **Das Gate.** Code Analyzer läuft bei jedem Pull Request in der Pipeline, egal ob Vibes, Claude Code oder ein Mensch den Code geschrieben hat.

In diesem Szenario ist die Frage nach dem Agenten schnell beantwortet. Zeit kosten die Grenze der Lizenz, die offene Zählweise und die Gates.

## Was sollten Sie jetzt entscheiden?

1. **Org-Standort klären.** EU Operating Zone ja oder nein entscheidet über Vibes.
2. **Lizenzweg rechnen.** Unmetered gegen Flex Credits, mit der Grenze pro Org und 125 € pro Nutzer und Monat für die Flat Fee.
3. **Regeldatei im Kunden-Repository anlegen**, für jedes Werkzeug, das Ihre Partner nutzen dürfen.
4. **Agentforce-Agenten nur als Agent Script in Git abnehmen**, mit Testspezifikation und vereinbarter Bestehensquote.
5. **Code Analyzer als Pflichtschritt in die Pipeline setzen**, ApexGuru mit Laufzeitdaten aus Produktion oder Full-Copy-Sandbox.
6. **Admin-KI auf Sandboxes begrenzen.**

Salesforce wirbt auf der [Produktseite](https://www.salesforce.com/agentforce/developers/vibe-coding/) damit, Teams könnten mit Vibes „up to 95% faster“ innovieren. Eine Studie dazu nennt die Seite nicht. Messen Sie den Effekt in Ihrem eigenen Programm, wie in [Kapitel 9](../teamarbeit-und-delivery/) beschrieben, und sehen Sie sich als Nächstes in [Kapitel 3](../mcp-und-schnittstellen/) an, über welche Schnittstellen diese Werkzeuge auf Ihre Org zugreifen.

Wählen Sie den Coding-Agenten nach Standort und Lizenz, und legen Sie die Qualität in Agent Script, Tests und Pipeline, die Ihnen gehören. Wenn Sie Ihre Werkzeugwahl oder die Lizenzrechnung Ihres Partners gegenprüfen lassen möchten, [schreiben Sie mir](#contact).
