---
title: "MCP und Salesforce-Schnittstellen für KI-Agenten"
description: "Welche MCP-Server und Schnittstellen Salesforce für KI-Agenten bietet, was das Ende des DX MCP Servers bedeutet und wer welche Daten lesen darf."
lang: de
slug: mcp-und-schnittstellen
translationKey: masterclass-03
chapter: 3
short: "MCP und Schnittstellen"
summary: "Welche MCP-Server und APIs KI-Agenten mit Salesforce verbinden, wer dabei welche Daten liest und was die Zugriffe kosten werden."
takeaways:
  - "Der lokale Salesforce DX MCP Server (@salesforce/mcp) erreicht laut Hinweis der Maintainer am 2. November 2026 sein End of Life; Teams sollten ihre Konfigurationen jetzt inventarisieren."
  - "Hosted MCP Servers sind seit 29. April 2026 für Enterprise Edition und höher GA, standardmäßig aus und führen jeden Aufruf mit den Rechten des angemeldeten Benutzers aus."
  - "Hosted MCP kennt keine Service Accounts und keine Machine-to-Machine-Flows; nächtliche Hintergrundagenten brauchen die Agent API oder eine klassische Integration."
  - "Liest ein externes Modell wie Claude Daten über Hosted MCP, finde ich in der Salesforce-Dokumentation keine Zusage, dass der Einstein Trust Layer greift; der Vertrag mit dem KI-Anbieter zählt."
  - "Agentische MCP- und API-Aufrufe sollen als Headless Platform Interactions Flex Credits kosten; der Satz steht auf der Rate Card vom 31.08.2026 noch als TBA."
articles: [salesforce-dx-mcp-server-end-of-life, mcp-explained-salesforce-it-leads, hosted-mcp-servers-data-access, headless-platform-interactions-budget]
faq:
  - q: "Was passiert am 2. November 2026 mit dem Salesforce DX MCP Server?"
    a: "Laut Hinweis der Maintainer (Issue 46 im Repository forcedotcom/mcp) gibt es für den lokalen Server danach keine Pflege, keinen Support und keine neuen Releases mehr. Das npm-Paket wird als deprecated markiert, bleibt aber installierbar. Pinnen Sie die Version 0.30.15 und planen Sie den Umstieg auf Skills, Plugin und Hosted MCP."
  - q: "Kann ein KI-Agent über Hosted MCP alle Salesforce-Daten lesen?"
    a: "Nein. Jeder Aufruf läuft mit Objektrechten, Feldrechten und Freigaben des Benutzers, der die Verbindung autorisiert hat. Der Agent sieht also genau das, was diese Person sieht, und jede Aktion steht in den Audit-Daten unter ihrem Namen."
  - q: "Kosten MCP-Zugriffe auf Salesforce extra?"
    a: "Salesforce schreibt, dass Hosted MCP Servers nur für Kunden mit Flex Credits gedacht sind und Nutzung abgerechnet werden kann. Der Satz für Headless Platform Interactions ist noch nicht veröffentlicht; laut SalesforceBen gibt es 30 Tage Vorlauf, bevor die Messung startet."
draft: false
---

MCP (Model Context Protocol) ist 2026 der Standardweg, über den KI-Werkzeuge wie Claude, ChatGPT oder Cursor mit Salesforce arbeiten. Für Hersteller zählen drei Punkte. Der lokale Salesforce DX MCP Server erreicht am 2. November 2026 sein End of Life. Die gehosteten MCP-Server von Salesforce sind seit April 2026 GA und handeln immer im Namen eines angemeldeten Benutzers. Und agentische Zugriffe sollen künftig Flex Credits kosten, zu einem Satz, den Salesforce noch nicht veröffentlicht hat. Meine Empfehlung: lesend starten, Rechte pro Person vergeben, den Budgetposten vor dem Rollout klären.

## Was ist MCP, und wo sitzt es in einer Salesforce-Architektur?

MCP ist ein offenes Protokoll, über das ein KI-Werkzeug andere Systeme als Tools aufruft: Datensätze lesen, eine Abfrage ausführen, eine Aktion starten. Der Server beschreibt, welche Tools er anbietet, der Client (Claude, ChatGPT, Cursor oder Agentforce) entscheidet, wann er welches nutzt. Salesforce hat MCP seit 2025 an fast jeder Stelle eingebaut. Für die Architektur hilft es, drei Richtungen zu trennen:

1. **Coding-Agent zu Projekt und Org.** Ein Entwickler Ihres Partners arbeitet mit Claude Code, Codex, Cursor oder Agentforce Vibes, und der Agent liest Metadaten, deployt und testet. Hier sitzen der lokale DX MCP Server und die MCP-Server im Claude-Code-Plugin von Salesforce.
2. **Externe KI zu Ihren Daten.** Eine Mitarbeiterin im Serviceinnendienst fragt in Claude nach offenen Fällen einer Maschine. Hier sitzen die Hosted MCP Servers und „Salesforce in Claude“.
3. **Agentforce zu fremden Systemen.** Ein Agentforce-Agent ruft ein Tool außerhalb von Salesforce auf, etwa eine Auftragsabfrage im ERP. Hier sitzen der MCP-Client von Agentforce und der Weg über MuleSoft und den API Catalog.

Daneben bleiben Schnittstellen ohne MCP wichtig: die Agent API, über die andere Systeme einen Agentforce-Agenten aufrufen, die Models API für LLM-Aufrufe aus Apex und die sf CLI, über die Deployments in der Pipeline laufen. MCP ersetzt keine davon. Die Begriffe ordnet [Kapitel 1](../begriffe-und-landkarte/) ein, und welche Entscheidungen bei der IT-Leitung liegen, steht in [MCP und Salesforce, erklärt für die IT-Leitung](../../../blog/mcp-salesforce-erklaert-it-leitung/).

## Die Schnittstellen im Überblick

| Schnittstelle | Wer ruft wen | Identität | Stand Oktober 2026 |
|---|---|---|---|
| Salesforce DX MCP Server, lokal (`@salesforce/mcp`) | Coding-Agent zu Org und Projekt | vorhandene sf-CLI-Anmeldung, Orgs per Allowlist | End of Life am 2. November 2026 |
| Claude-Code-Plugin `salesforce-development` | Claude Code zu Metadatenwissen, Apex- und SOQL-Sprachserver | lokale sf-CLI-Anmeldung | veröffentlicht am 19. August 2026 |
| Hosted MCP, sObject-Server | externe KI zu Datensätzen | angemeldeter Benutzer, OAuth mit PKCE | GA seit 29. April 2026 |
| Hosted MCP, Custom Server | externe KI zu Flows, Apex, APIs aus dem API Catalog, Agentforce-Agenten | angemeldeter Benutzer | dokumentiert |
| Headless 360 MCP | externe KI zu Setup-Aufgaben | angemeldeter Benutzer, ab API 67.0 | Beta seit Juli 2026 |
| Salesforce in Claude | Claude zu Vertriebsdaten, 37 Skills | in der Ankündigung nicht beschrieben | Beta für alle Kunden |
| Agentforce als MCP-Client | Agentforce zu externen Tools | External und Named Credentials | 2025 als Pilot angekündigt, aktueller Status nicht dokumentiert |
| MuleSoft-API über den API Catalog | Agentforce zu ERP | Named Credentials, automatisch angelegt | dokumentierter Weg |
| Agent API | beliebiges System zu Agentforce-Agent | Client Credentials mit Run-As-Benutzer | dokumentiert |
| Models API | Apex zu LLM | Salesforce-Anmeldung | läuft über den Einstein Trust Layer |

Quellen: [End-of-Life-Hinweis zum DX MCP Server](https://github.com/forcedotcom/mcp/issues/46), [Plugin-Ankündigung](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin), [Hosted MCP GA](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), [Custom Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html), [Agenten als MCP-Tools](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html), [Headless 360 MCP](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/headless-360-mcp.html), [AIforce-Ankündigung](https://www.salesforce.com/news/stories/aiforce-announcement/), [MCP-Pilot 2025](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce), [MCP-Registrierung im Paket](https://developer.salesforce.com/docs/platform/pkg2-dev/guide/dev2gp-package-mcp-agentforce.html), [MuleSoft und API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html), [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html).

Für einen Hersteller sind heute drei Zeilen dringend: der DX MCP Server, weil Ihr Partner ihn wahrscheinlich nutzt, die Hosted MCP Servers, weil Fachbereiche nach Claude oder ChatGPT mit CRM-Daten fragen werden, und der Weg zum ERP, weil Auftragsstatus, Bestand und Preise in SAP oder proALPHA liegen. Agentforce-Agenten lassen sich nur als MCP-Tools freigeben, wenn sie im neuen Agent Script Builder gebaut sind; ältere Agenten müssen vorher umgestellt werden.

## 2. November 2026: Was das Ende des DX MCP Servers bedeutet

Der [End-of-Life-Hinweis](https://github.com/forcedotcom/mcp/issues/46) der Maintainer nennt den 2. November 2026 als End of Life für den lokalen Server `@salesforce/mcp`. Danach gibt es keine Pflege, keinen Support und keine neuen Releases mehr. Das npm-Paket wird als deprecated markiert, bleibt aber installierbar, gepinnte Setups wie Version 0.30.15 laufen also weiter.

Der Hinweis nennt die offene Skills-Bibliothek `forcedotcom/sf-skills` als Ersatz. Daneben hat Salesforce das [Claude-Code-Plugin](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) mit rund 40 dieser Skills und drei MCP-Servern (salesforce-api-context, salesforce-metadata-experts, salesforce-lsp) sowie Hosted MCP für den Datenzugriff veröffentlicht. Die Plugin-Ankündigung erwähnt das Ende des DX MCP Servers nicht. Alle drei als Nachfolger zu sehen, ist meine Lesart, keine Salesforce-Aussage.

Für Sie als Auftraggeber ist vor allem die Frage wichtig, mit welchen Rechten der alte Server bei Ihrem Partner läuft. Ich würde für Agenten nur feste Sandbox-Aliase zulassen, weil zwei Einstellungen den Zugriff sonst still ausweiten.

```vertiefung Für Entwickler
titel: Wie der lokale DX MCP Server Orgs erreicht
Laut [Salesforce-Dokumentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp.htm) liest er vorhandene verschlüsselte Anmeldedaten und erreicht nur Orgs, die beim Start freigegeben wurden.

- Laut [README](https://github.com/salesforcecli/mcp) gibt `ALLOW_ALL_ORGS` Zugriff auf alle autorisierten Orgs, auch eine Produktion, und Salesforce rät zur Vorsicht.
- `DEFAULT_TARGET_ORG` wird bei jedem Tool-Aufruf neu aufgelöst: Wechselt der Entwickler seine Standard-Org, arbeitet der Agent ohne Warnung in der anderen.
```

Mein Vorgehen bis zum Stichtag:

```schritte
Inventur
  Lassen Sie sich vom Partner auflisten, in welchen MCP-Konfigurationen, auf welchen Rechnern und in welchen Repositories der Server eingetragen ist.
Pinnen
  Version 0.30.15 fest eintragen statt `latest`, damit der Übergang planbar bleibt.
Abbilden
  Deploy und Tests über sf CLI und Skills, Metadatenwissen über das Plugin, Datenzugriff über Hosted MCP.
Parallel testen
  In einer Sandbox beide Wege prüfen, dann den alten Eintrag entfernen und die KI-Regeldatei im Repository anpassen.
```

Die Details stehen in [Salesforce DX MCP Server: Ende am 2. November](../../../blog/salesforce-dx-mcp-server-ende/). Welche Werkzeuge Salesforce sonst für KI-gestützte Entwicklung anbietet, beschreibt [Kapitel 2](../salesforce-werkzeuge-ki-entwicklung/).

## Hosted MCP: Wer darf welche Daten lesen?

Salesforce hat die Hosted MCP Servers am [29. April 2026 für jede Org ab Enterprise Edition](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) freigegeben. Sie laufen auf Salesforce-Infrastruktur, ein Admin schaltet sie im Setup unter API Catalog frei und legt eine External Client App mit den Scopes `mcp_api` und `refresh_token` an. Die [Server-Referenz](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) nennt vier sObject-Server (All, Reads, Mutations, Deletes) sowie Server für Data 360, Tableau Next und Headless 360.

Das Sicherheitsmodell ist streng, und das ist für Hersteller die gute Nachricht. Laut [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

| Thema | Regel |
|---|---|
| Aktivierung | Server sind standardmäßig aus und müssen bewusst aktiviert werden. |
| Rechte | Jeder Tool-Aufruf läuft mit Objektrechten, Feldrechten und Freigaberegeln des Benutzers, der die Verbindung autorisiert hat, und steht in den Audit-Daten unter seinem Namen. |
| Benutzerkontext | Es gibt keine Service Accounts, keine Machine-to-Machine-Flows und keinen Betrieb außerhalb eines Benutzerkontexts. |
| Zugriff | External Client Apps lassen sich auf Profile und Permission Sets beschränken. |
| Protokoll | MCP-Verkehr lässt sich in den API-Logs über `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP` herausfiltern. |
| Abfragen | Named Queries geben nur vordefinierte SOQL-Abfragen frei statt freier Abfragen. |

Salesforce selbst schlägt vor, mit `sobject-reads` in einer Sandbox zu beginnen, und nennt ihn [„read-only, risk-free, and immediately useful“](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available). Dem schließe ich mich an: lesend starten, Mutations erst nach einem Test mit Freigabe, Deletes nur mit gutem Grund. Für den [Headless-360-MCP-Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/headless-360-mcp.html) empfiehlt Salesforce, dass der Client vor jedem Tool nachfragt, das Org-Konfiguration ändert oder Daten bearbeitet oder löscht.

Daraus folgt eine Architekturgrenze. Ein nächtlicher Agent, der ohne Menschen Garantiefälle vorsortiert, passt nicht zu Hosted MCP. Für solche Fälle gibt es die Agent API, die mit Client Credentials und einem Run-As-Benutzer arbeitet, oder eine klassische Integration. Diesen Benutzer würde ich behandeln wie jeden Integrationsbenutzer: eigene Rechte, keine Admin-Profile, regelmäßige Prüfung.

### Die Lücke beim Einstein Trust Layer

```hinweis achtung
Für die Models API schreibt Salesforce, dass alle Aufrufe durch den [Einstein Trust Layer](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html) laufen. In der Hosted-MCP-Dokumentation, die ich gelesen habe, finde ich keine entsprechende Zusage für den Fall, dass ein externes Modell die Antworten verarbeitet. Meine Lesart: Liest Claude oder ChatGPT Fälle und Anlagendaten über Hosted MCP, gelten für diese Daten der Vertrag und die Datenverarbeitung des KI-Anbieters. Salesforce prüft die Berechtigung, nicht, was danach mit den Daten passiert. Das gehört in die Datenschutzprüfung, bevor der erste Fachbereich startet.
```

Dazu kommt Prompt Injection. Bei [ForcedLeak](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html) (CVSS 9.4, veröffentlicht im September 2025) versteckten Angreifer Anweisungen im Beschreibungsfeld eines Web-to-Lead-Formulars, und Agentforce schickte CRM-Daten an eine fremde Domain. Simon Willison nennt die Kombination aus privaten Daten, fremden Inhalten und einem Weg nach außen die [„lethal trifecta“](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) und weist darauf hin, dass MCP genau dieses Kombinieren von Tools fördert. Bei Herstellern landen fremde Texte über Händlerportale, Garantieanträge und Email-to-Case im CRM. Mehr dazu in [Hosted MCP Server: wer darf welche Daten lesen](../../../blog/salesforce-hosted-mcp-server-datenzugriff/) und [Prompt Injection im Händlerportal](../../../blog/prompt-injection-haendlerportal-agentforce/).

## Was kosten MCP-Zugriffe auf Salesforce?

Die [Übersicht der Hosted MCP Servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) sagt: „intended only for customers with Flex Credits and you may be billed for server usage“. Auf der [Flex Credits Rate Card vom 31.08.2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) steht der Zähler „Headless Platform Interaction“ mit dem Satz TBA. Laut [SalesforceBen](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) zählen erfolgreiche Aufrufe registrierter Agenten über MCP oder API, gemessen wird nur in aktiven Produktions-Orgs, Kunden erhalten 30 Tage Vorlauf, und bestehende API-Integrationen behalten ihre heutige Preislogik.

Für die Planung heißt das: Den Preis kennen Sie nicht, die Menge können Sie schätzen. Zählen Sie Benutzer, Fragen pro Tag und Tool-Aufrufe pro Frage, denn ein Agent ruft für eine Antwort oft mehrere Tools auf. Die Rechnung mit Annahmen steht in [MCP-Zugriffe auf Salesforce als Budgetrisiko](../../../blog/mcp-zugriffe-salesforce-budgetrisiko/), die Kostenmodelle insgesamt in [Kapitel 7](../kosten-und-token/).

## Ein typisches Szenario: Servicedaten in Claude bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Service Cloud, SAP S/4 und einem Implementierungspartner, dessen sechs Entwickler mit Claude Code arbeiten. Alle Zahlen sind Annahmen. Die Serviceleitung möchte, dass 25 Mitarbeitende im Innendienst in Claude nach offenen Fällen, installierter Basis und Garantiestatus fragen.

So würde ich vorgehen:

| Schritt | Was ich tun würde |
|---|---|
| Partner zuerst | Bis zum 2. November die DX-MCP-Einträge inventarisieren, auf 0.30.15 pinnen, in den Sandboxes auf Plugin und Skills umstellen. Kein Agent bekommt eine Produktions-Org. |
| Lesend starten | Nur `sobject-reads` aktivieren, die External Client App auf ein eigenes Permission Set beschränken, erst in einer Sandbox testen. Für die Suche nach Seriennummern eine Named Query statt freier SOQL. |
| ERP bleibt deterministisch | Auftragsstatus und Liefertermine aus SAP kommen über eine MuleSoft-API im API Catalog, nicht über ein Modell, das Tabellen interpretiert. Der Weg steht in [Agentforce und SAP-Auftragsstatus](../../../blog/agentforce-sap-auftragsstatus/). |
| Menge schätzen | Angenommen 25 Personen, 20 Fragen am Tag, vier Tool-Aufrufe pro Frage und 21 Arbeitstage: das sind 42.000 Aufrufe im Monat. Wenn jeder erfolgreiche Aufruf zählt, wovon ich nach heutigem Stand ausgehe, ist das die Zahl, die Sie mit dem Satz multiplizieren, sobald Salesforce ihn nennt. |
| Datenschutz klären | Der Vertrag mit Anthropic und die Freigabe durch Datenschutz und Betriebsrat stehen vor dem Start, weil der Trust Layer hier nach meiner Lesart nicht greift. |

## Welche Entscheidungen liegen bei der IT-Leitung?

Für die Einrichtung nennt Salesforce weniger als 30 Minuten. Die eigentliche Arbeit liegt in fünf Entscheidungen:

| Entscheidung | Frage |
|---|---|
| Server | Welche Server werden aktiviert, und wer darf neue freischalten? |
| Benutzer | Welche Benutzer bekommen Zugriff, über welches Permission Set? |
| Daten | Welche Daten sind lesbar, welche änderbar, und wo reicht eine Named Query? |
| Modelle und Verträge | Welche sind zugelassen: Claude, ChatGPT, ein Modell über einen Cloud-Anbieter in der EU? |
| Budget | Wer zahlt die Headless Platform Interactions, Fachbereich oder IT? |

Diese Fragen gehören zu meiner Arbeit an [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/). Welche externen Coding-Agenten Ihr Partner dafür einsetzen kann, beschreibt [Kapitel 4](../externe-coding-agenten/), und die Übersicht aller Kapitel finden Sie auf der [Startseite der Masterclass](../).

MCP macht Salesforce für jedes KI-Werkzeug erreichbar; ob das Ihrem Service hilft, entscheiden Rechte, Datenwege und Budget.
