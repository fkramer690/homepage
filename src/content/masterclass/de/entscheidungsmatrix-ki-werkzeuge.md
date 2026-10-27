---
title: "Entscheidungsmatrix KI-Werkzeuge: wann nutze ich was?"
description: "Zwölf Szenarien aus Herstellerprojekten mit Werkzeug, Begründung und Kosten: Coding-Agenten, Hosted MCP, Agentforce, ERP-Anbindung und EU-Datenresidenz."
lang: de
slug: entscheidungsmatrix-ki-werkzeuge
translationKey: masterclass-06
chapter: 6
short: "Wann nutze ich was"
summary: "Welches KI-Werkzeug zu welcher Aufgabe passt, in zwölf Szenarien für Hersteller, von Prototyp über ERP-Agent bis EU-Datenresidenz."
takeaways:
  - "Die Grundregel für KI im Salesforce-Projekt lautet: Agenten arbeiten in Sandbox oder Scratch-Org, Daten kommen lesend über Hosted MCP, Releases laufen nur über die Pipeline mit Review."
  - "Welcher Coding-Agent passt, entscheiden meist Verträge, Datenresidenz und vorhandene Werkzeuge, seltener die Modellqualität."
  - "Agentforce Vibes gibt es laut Salesforce nicht in der Hyperforce EU Operating Zone; Anthropics Claude API verarbeitet direkt nur in den USA oder global, EU-Verarbeitung geht etwa über Amazon Bedrock."
  - "Für Agenten im Betrieb gilt: Regeln wie Garantieberechtigung oder Kreditlimit gehören in deterministische Logik, das Sprachmodell übernimmt Sprache und Absicht."
  - "Hat das ERP keine API, bleiben Dokumentenerkennung mit RPA oder der Systems Integration Agent; beide arbeiten über die Oberfläche und brauchen Tests und Monitoring."
articles: [agentforce-yes-or-no-manufacturers, vibes-claude-code-copilot-comparison, agentforce-sap-order-status, legacy-erp-without-api-agents]
faq:
  - q: "Welcher Coding-Agent ist der beste für Salesforce?"
    a: "Einen Apex-Benchmark, der das entscheidet, gibt es nicht. Ich wähle nach Vertrag und Umfeld: Agentforce Vibes, wenn Flex Credits schon im Salesforce-Vertrag sind, Copilot bei einem GitHub-Enterprise-Kunden, Claude Code mit dem offiziellen Salesforce-Plugin bei freier Wahl und großen Änderungen."
  - q: "Darf ein KI-Agent direkt in der Produktivorg arbeiten?"
    a: "Für Entwicklung nein. Coding-Agenten arbeiten in Sandboxes und Scratch-Orgs, Änderungen gehen über Pull Request, automatische Prüfungen und die Pipeline in Produktion. Lesender Datenzugriff über Hosted MCP mit einem benannten Nutzer ist die Ausnahme, die ich nach Prüfung zulasse."
  - q: "Wie bekomme ich EU-Datenverarbeitung für KI-Coding?"
    a: "Die Claude API von Anthropic kennt direkt nur US- und globale Verarbeitung. Claude über Amazon Bedrock in einer EU-Region, OpenAI-API-Projekte mit EU-Residenz oder GitHub-Angebote mit Datenresidenz sind Wege dorthin. Agentforce Vibes ist in der Hyperforce EU Operating Zone nicht verfügbar."
  - q: "Wann brauche ich Agentforce und wann nur einen Coding-Agenten?"
    a: "Ein Coding-Agent hilft Ihrem Team, Salesforce zu bauen. Agentforce ist ein Agent im Betrieb, der zum Beispiel Händleranfragen beantwortet und pro Aktion Flex Credits kostet. Beides wird getrennt entschieden, budgetiert und getestet."
draft: false
---

Für KI im Salesforce-Projekt gilt eine Grundregel: Der Agent arbeitet in Sandbox oder Scratch-Org, Daten bekommt er lesend über Hosted MCP, Releases laufen nur über die Pipeline mit Review. Welches Werkzeug Ihr Team oder Ihr Partner dabei nutzt, entscheiden meist Kundenverträge, Datenresidenz und die vorhandene Toolchain, seltener die Modellqualität. Für Agenten im Betrieb kommen ERP-Zugriff und Kosten pro Aktion dazu. Die Matrix unten übersetzt das in zwölf Szenarien, die bei Herstellern tatsächlich auftauchen, von Workshop-Prototyp bis Auftragsstatus aus SAP.

## Welche Frage entscheidet die Werkzeugwahl?

Die erste Frage ist, ob Sie über Bauen oder über Betreiben sprechen. Das klingt banal, aber in Workshops landen beide Themen oft auf derselben Folie.

- **Bauen:** Ein Coding-Agent wie Agentforce Vibes, Claude Code, Codex oder Copilot schreibt Apex, LWC, Flows und Metadaten. Abgerechnet wird nach Tokens oder pro Nutzer. Das Ergebnis ist Code, der durch Review und Pipeline muss.
- **Betreiben:** Ein Agentforce-Agent beantwortet Händleranfragen, prüft Garantieanträge oder liest Auftragsstatus aus dem ERP. Abgerechnet wird pro Aktion in Flex Credits. Das Ergebnis ist eine Antwort an einen Kunden oder Händler.

Für beide Welten gibt es eigene Kriterien, eigene Budgets und eigene Tests. Die Begriffe dahinter erkläre ich in [Kapitel 1](../begriffe-und-landkarte/), die Salesforce-eigenen Werkzeuge in [Kapitel 2](../salesforce-werkzeuge-ki-entwicklung/) und die externen Coding-Agenten in [Kapitel 4](../externe-coding-agenten/).

## Die Entscheidungsmatrix für Hersteller

Alle Angaben habe ich am 27. Oktober 2026 auf den verlinkten Seiten geprüft. Preise sind US-Listenpreise.

### Bauen: Coding-Agenten, Daten und Pipeline

| # | Szenario | Werkzeug oder Ansatz | Warum | Kosten und Governance |
|---|---|---|---|---|
| 1 | Klickbarer Prototyp für einen Workshop, etwa ein Händlerportal als LWC | Vibe Coding mit Agentforce Vibes in einer Developer Edition oder Claude Code gegen eine Scratch-Org | Wegwerfcode, Tempo zählt, keine Kundendaten; Martin Fowler sieht Vibe Coding bei [Software für einen kleinen Kreis](https://martinfowler.com/bliki/VibeCoding.html) | Developer Edition: [110 Requests oder 1,5 Mio. Tokens](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html), einen Monat lang, ohne Auffrischung; Code danach verwerfen |
| 2 | Features im Projekt, Flex Credits sind schon im Salesforce-Vertrag | [Agentforce Vibes 2.0](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) mit Regeldateien und Plan Mode | Läuft im Salesforce-Vertrag, Abrechnung über Flex Credits | Flat Fee [125 € pro Nutzer und Monat](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/), Premium-Modell dabei [bis 2.500 Requests oder 36 Mio. Tokens](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) je 30 Tage |
| 3 | Große Refactorings, Features über viele Metadaten, Architektur-Reviews | Claude Code mit dem [Plugin salesforce-development](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) | Rund 40 Salesforce-Skills, Apex-Sprachserver, Hooks zur Deploy-Validierung, Agent für Architektur-Reviews | Anthropic nennt [rund 13 $ pro Entwickler und aktivem Tag](https://code.claude.com/docs/en/costs), 150 bis 250 $ im Monat; Datenvertrag klären |
| 4 | Kunde arbeitet mit GitHub Enterprise und Copilot | Copilot oder Claude und Codex über [Agent HQ](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/), dazu die offene Salesforce-Skills-Bibliothek | Admins steuern erlaubte Agenten und Modelle, Audit-Logs vorhanden | Enterprise [39 $ pro Nutzer mit 39 $ AI Credits](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/); Claude und Codex in Agent HQ waren zum Start im Februar 2026 Public Preview |
| 5 | Org liegt in der Hyperforce EU Operating Zone oder EU-Verarbeitung ist Pflicht | Claude Code über Amazon Bedrock in einer EU-Region oder OpenAI-API-Projekte mit EU-Residenz | Vibes ist [in der EU Operating Zone nicht verfügbar](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html); die Claude API kennt direkt [nur „us“ und „global“](https://platform.claude.com/docs/en/manage-claude/data-residency) | Auftragsverarbeitung, Betriebsrat, keine Produktivdaten im Prompt |
| 6 | Agent braucht Daten, etwa Prüfung der installierten Basis vor einer Migration | Hosted MCP mit dem Server sobject-reads gegen eine Sandbox | [Benannter Nutzer, PKCE, Feldrechte und Sharing gelten](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html), nur Lesen | Laut Doku [nur für Kunden mit Flex Credits](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md); Zähler für agentische Zugriffe noch „TBA“ |
| 7 | Code-Qualität, Tests, Deploy-Validierung | sf CLI mit Code Analyzer und Apex-Tests als Hook und in der Pipeline | Deterministisch und ohne Tokenkosten; Salesforce selbst [empfiehlt CLI statt MCP](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/mcp.html), wenn kein LLM nötig ist | Kostenlos; die einzige verlässliche Prüfung, ob etwas fertig ist |
| 8 | Bestehende Konfiguration mit dem lokalen DX MCP Server @salesforce/mcp | Version 0.30.15 festhalten, auf Skills, Plugin und Hosted MCP umstellen | End of Life am [2. November 2026](https://raw.githubusercontent.com/forcedotcom/mcp/main/README.md) | Dabei Freigaben auf feste Sandbox-Aliasse beschränken, nie auf alle Orgs |

### Betreiben: Agenten in Service, Vertrieb und ERP

| # | Szenario | Werkzeug oder Ansatz | Warum | Kosten und Governance |
|---|---|---|---|---|
| 9 | Agent für die Garantie-Vorprüfung von Händleranträgen | Agentforce Builder mit Agent Script, Tests vor dem Go-live | Salesforce rät: was sich [als Code ausdrücken lässt, gehört in Logik](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) | [20 Flex Credits pro Aktion in Produktion, 16 in der Sandbox](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) |
| 10 | Agent liefert Auftragsstatus oder Verfügbarkeit aus SAP S/4 | MuleSoft-API, [synchronisiert in den API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), als Agenten-Aktion | Dokumentiertes Muster, Named Credentials entstehen automatisch | MuleSoft-Lizenz; Integrationsnutzer mit minimalen Rechten |
| 11 | Altes ERP oder MES ohne API | MuleSoft IDP mit RPA oder der Systems Integration Agent | IDP gibt Dokumente unter [80 Prozent Konfidenz an Menschen](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce); der Systems Integration Agent ist [seit der Dreamforce 2026 GA](https://www.salesforce.com/blog/dreamforce-2026-announcements/) | Beide arbeiten über die Oberfläche; Monitoring einplanen |
| 12 | Vertrieb will Salesforce direkt in Claude nutzen | Salesforce in Claude aus der AIforce-Schicht | Für alle Kunden [als Beta verfügbar](https://www.salesforce.com/news/stories/aiforce-announcement/) | „Pricing and packaging are subject to change“; Pilot mit kleinem Kreis |

Zwei Hinweise zur Matrix. Zeile 5 ist für deutsche Hersteller oft die entscheidende, weil sie Zeile 2 ausschließen kann. Ob eine Org in der EU Operating Zone liegt, sollte die IT vor jedem Werkzeugvergleich klären. Und Zeile 6 sieht harmlos aus, ist aber der Punkt, an dem ein externes Modell echte Kundendaten liest. Was dabei zu prüfen ist, steht in [Kapitel 3](../mcp-und-schnittstellen/).

## Sechs Fragen in der richtigen Reihenfolge

Die Matrix hilft beim Nachschlagen. Im Gespräch mit IT-Leitung und Programmleitung gehe ich lieber diese sechs Fragen der Reihe nach durch, weil frühe Antworten spätere Optionen streichen.

1. **Prototyp oder Produktion?** Für einen Prototyp ist Vibe Coding in einer Developer Edition oder Scratch-Org in Ordnung. Für Produktion gilt agentic engineering: Ein Mensch liest den Code, Tests und Pipeline entscheiden über den Merge. Fowler trennt beide Begriffe genau aus diesem Grund.
2. **Welche Daten- und Residenzvorgaben gelten?** Liegt die Org in der EU Operating Zone, fällt Agentforce Vibes weg. Verlangt der Datenschutz EU-Verarbeitung, fällt die Claude API von Anthropic im direkten Zugang weg, Claude über Bedrock in einer EU-Region bleibt. Für Codex habe ich keine Aussage von OpenAI gefunden, dass die [EU-Residenz für API-Projekte](https://openai.com/index/introducing-data-residency-in-europe/) auch dort gilt; das würde ich schriftlich klären.
3. **Welche Verträge und Werkzeuge gibt es schon?** Sind Flex Credits schon im Salesforce-Vertrag, liegt Vibes nahe. Hat die IT GitHub Enterprise, liegt Copilot nahe. Bei freier Wahl nehme ich Claude Code als Referenz, weil Salesforce dafür das erste offizielle Plugin gebaut hat. Den Vergleich mit allen Kriterien finden Sie in [Agentforce Vibes, Claude Code oder Copilot](../../blog/agentforce-vibes-claude-code-copilot-vergleich/).
4. **Was ist die Aufgabe?** Code geht an den Coding-Agenten, Metadaten-Wissen an den API-Context-Server, Daten an Hosted MCP, Geschäftsregeln eines Laufzeit-Agenten an Agent Script, Releases an die Pipeline.
5. **Welches Kostenmodell passt?** Viel und gleichmäßige Nutzung spricht für Pauschalen pro Nutzer, wenig oder schwankende Nutzung für Abrechnung nach Verbrauch. Die Rechnung dazu steht in [Kapitel 7](../kosten-und-token/).
6. **Welche Prüfungen sind deterministisch?** Code Analyzer, Apex-Tests, Validierungs-Deploy und ein menschlicher Review stehen vor jedem Merge, egal welcher Agent den Code geschrieben hat. Wie diese Prüfungen aussehen, beschreibt [Kapitel 8](../best-practices-ki-code/).

Für Agenten im Betrieb kommt eine siebte Frage vor alle anderen: Lohnt sich der Prozess überhaupt? Volumen, Datenqualität, ERP-Zugriff, Kostenmodell und Edition prüfe ich in [Agentforce für Hersteller: jetzt starten oder warten?](../../blog/agentforce-ja-oder-nein-hersteller/).

## Ein typisches Szenario: drei Vorhaben bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Sales Cloud und Service Cloud, deren Org in der Hyperforce EU Operating Zone liegt. Die Zentrale arbeitet mit SAP S/4, ein zugekauftes Werk noch mit einem älteren ERP ohne Schnittstelle. Die IT nutzt GitHub Enterprise, ein Implementierungspartner stellt sechs Entwickler. Alle Umstände und Zahlen sind Annahmen. Drei Vorhaben liegen auf dem Tisch.

**Ein Prototyp für das Händlerportal.** Der Vertrieb möchte im Workshop zeigen, wie Händler Ersatzteile bestellen könnten. Das ist Zeile 1. Eine separate Developer Edition enthält keine Kundendaten, also kann der Partner dort mit Vibes oder Claude Code bauen, solange der Datenschutz das für Testdaten freigibt. Nach dem Workshop wird der Code gelöscht, nicht übernommen.

**Die Coding-Agenten des Partners.** Weil die Org in der EU Operating Zone liegt, fällt Vibes für die Projektarbeit weg (Zeile 5). Übrig bleiben Copilot Enterprise über die vorhandene GitHub-Lizenz (Zeile 4) oder Claude Code über Bedrock in einer EU-Region (Zeile 3 und 5). Bei Bedrock rechnet AWS ab, also gehört dessen Preisliste in den Vergleich, nicht die von Anthropic. Wie ich Freigabeliste, Kosten und einen Vergleich an echten Backlog-Aufgaben aufsetze, steht im Szenario von [Kapitel 4](../externe-coding-agenten/). Vor der Entscheidung stehen der Betriebsrat und die Auftragsverarbeitung, beschrieben in [KI-Coding, Betriebsrat und DSGVO](../../blog/ki-coding-betriebsrat-dsgvo/). Unabhängig vom Werkzeug arbeiten die Agenten nur in Sandboxes, und die Pipeline prüft mit Code Analyzer und Apex-Tests (Zeile 7).

**Ein Agent für Auftragsstatus.** Händler fragen täglich nach Lieferterminen. Für SAP S/4 gibt es eine MuleSoft-API, das ist Zeile 10. Der Agent ruft sie als Aktion auf, die Entscheidung, welche Daten ein Händler sehen darf, liegt in Agent Script. Wie das im Detail aussieht, beschreibe ich in [Agentforce und SAP-Auftragsstatus](../../blog/agentforce-sap-auftragsstatus/). Für das zugekaufte Werk ohne API (Zeile 11) würde ich den Agenten zunächst nicht ausrollen. RPA bricht, wenn sich Masken ändern, und ob der Systems Integration Agent das wirklich abfängt, würde ich erst an einer Kopie des Systems testen. Die Optionen dafür stehen in [altes ERP ohne API](../../blog/altes-erp-ohne-api-ki-agenten/).

Am Ende hat jedes Vorhaben ein anderes Werkzeug, und das ist normal. Einheitlich sind die Regeln: kein Agent in Produktion, Daten nur lesend und benannt, Release nur über die Pipeline.

## Wo hilft die Matrix nicht weiter?

Drei Fragen beantwortet keine Tabelle.

- **Modellqualität für Apex.** Einen öffentlichen Benchmark für Apex, Flows und Metadaten gibt es nicht, wie in [Kapitel 4](../externe-coding-agenten/) beschrieben. Entscheiden kann nur ein Vergleich an Ihrem eigenen Backlog, gemessen an Befunden im Review und Nacharbeit.
- **Verantwortung.** Wer die Regeldatei im Repository pflegt, wer Hosted-MCP-Zugänge freigibt und wer Flex Credits bezahlt, ist eine Vertragsfrage zwischen Ihnen und Ihrem Partner. Das habe ich in [Kapitel 5](../aiforce-und-systemintegratoren/) behandelt.
- **Ob Salesforce der richtige Ort ist.** Entscheidungen, die SAP schon trifft, gehören nicht in einen Agenten in Salesforce. Ein Flow oder ein ERP-Job ist für Routine ohne Sprache oft günstiger als jeder Agent.

Wenn Sie diese Entscheidungen für Ihre Org und Ihre Partner sortieren möchten, gehört das zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/). Wo Agenten in der Fertigung heute tragen, behandelt [Kapitel 10](../ki-agenten-in-der-fertigung/); alle Kapitel finden Sie in der [Übersicht der Masterclass](../).

Klären Sie zuerst Datenresidenz und Verträge, dann die Aufgabe, und halten Sie die Regeln für alle Werkzeuge gleich. Wenn Sie für Ihre Vorhaben eine zweite Meinung zur Werkzeugwahl möchten, [schreiben Sie mir](#contact).
