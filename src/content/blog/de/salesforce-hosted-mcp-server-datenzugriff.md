---
title: "Hosted MCP Server: Wer liest welche Salesforce-Daten?"
description: "Wer über die Hosted MCP Server von Salesforce welche Daten lesen darf: Named User, OAuth mit PKCE, sobject-reads zuerst und wo der Einstein Trust Layer endet."
pubDate: 2026-10-27
lang: de
slug: salesforce-hosted-mcp-server-datenzugriff
translationKey: hosted-mcp-servers-data-access
topic: security
categories: [ai]
tags: [MCP, Hosted MCP, Datenschutz, Einstein Trust Layer, Claude, Maschinenbau]
takeaways:
  - "Jeder Aufruf über Hosted MCP läuft als der Benutzer, der die Verbindung autorisiert hat, mit seinen Objektrechten, Feldrechten und Freigaben; Service Accounts und Machine-to-Machine-Flows gibt es nicht."
  - "Salesforce-Rechte gelten pro Person, nicht pro Kanal: Was jemand in Lightning sieht, kann ein externes Modell erreichen; soll Claude weniger sehen, braucht es Named Queries oder Custom Server."
  - "Starten Sie mit dem Server sobject-reads in einer Sandbox; er schließt Änderungen an Datensätzen aus, aber nicht, dass Daten über den KI-Client abfließen."
  - "Nach meiner Einschätzung schützt der Einstein Trust Layer keine Daten, die ein externes Modell über Hosted MCP liest; Salesforce dokumentiert ihn für eigene LLM-Aufrufe, nicht für Hosted MCP."
  - "Beschränken Sie jede External Client App auf ein Permission Set, halten Sie Administratoren heraus und klären Sie den Vertrag mit dem KI-Anbieter, bevor der erste Fachbereich startet."
faq:
  - q: "Kann Claude über Hosted MCP alle unsere Salesforce-Daten lesen?"
    a: "Nein. Claude sieht genau das, was der Benutzer sieht, der die Verbindung autorisiert hat, denn jeder Aufruf läuft mit dessen Objektrechten, Feldrechten und Freigaberegeln. Ist dieser Benutzer Administrator, kann das fast die ganze Org sein."
  - q: "Maskiert der Einstein Trust Layer Daten, die Claude über MCP liest?"
    a: "Das sagt Salesforce nicht. Der Trust Layer ist für LLM-Aufrufe dokumentiert, die Salesforce selbst macht, etwa über die Models API oder Agentforce. Bei Hosted MCP verarbeitet das Modell des externen Clients die Ergebnisse; ich gehe davon aus, dass Maskierung und die Zero-Data-Retention-Vereinbarungen von Salesforce dann nicht greifen und Ihr KI-Vertrag zählt."
  - q: "Können wir einen nächtlichen KI-Agenten über Hosted MCP betreiben?"
    a: "Nein. Hosted MCP unterstützt nur den OAuth Authorization Code Flow mit angemeldetem Benutzer und kennt keine Service Accounts oder Machine-to-Machine-Flows. Hintergrundagenten brauchen die Agent API oder eine klassische Integration mit eigenem Integrationsbenutzer."
  - q: "Welchen Hosted MCP Server sollten wir zuerst aktivieren?"
    a: "Salesforce empfiehlt sobject-reads in einer Sandbox. Dem schließe ich mich an und würde vor der Produktion Named Queries oder einen Custom Server pro Nutzergruppe ergänzen, damit das externe Modell nur die Felder bekommt, die diese Gruppe braucht."
  - q: "Wie sehen wir, was ein KI-Client in Salesforce getan hat?"
    a: "Hosted-MCP-Aufrufe stehen in den normalen API-Logs mit Benutzer, Operation, Objekt und Zeitstempel; filtern Sie auf API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP. Die Logs zeigen, was gelesen wurde, nicht, was das Modell danach damit gemacht hat."
draft: false
---

Über die Hosted MCP Server von Salesforce liest ein KI-Client wie Claude oder ChatGPT genau das, was der Benutzer lesen darf, der die Verbindung autorisiert hat. Auf der Salesforce-Seite ist das sauber gelöst: OAuth mit PKCE, keine Service Accounts, jeder Aufruf im API-Log unter dem Namen einer Person. Die Schwachstelle liegt hinter dem Aufruf. Sobald die Datensätze beim externen Modell ankommen, schützt sie nach meiner Einschätzung der Einstein Trust Layer nicht mehr, und Ihr Vertrag mit dem KI-Anbieter entscheidet. Ich würde mit sobject-reads starten, mit einem Permission Set pro Nutzergruppe und einem geprüften KI-Vertrag.

## Wie entscheiden Hosted MCP Server, wer was sieht?

Salesforce hat die Hosted MCP Server [am 29. April 2026 allgemein verfügbar gemacht](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), für jede Org ab Enterprise Edition. MCP (Model Context Protocol) ist der offene Standard, über den ein KI-Client Tools in einem anderen System aufruft; die Grundlagen stehen in [MCP und Salesforce, erklärt für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/). Die Server sind aus, bis ein Administrator sie aktiviert. Die [Server-Referenz](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) nennt vier sObject-Server (All, Reads, Mutations, Deletes) sowie Data 360, Tableau Next und Headless 360 (Beta).

Das Zugriffsmodell beschreiben die [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html):

- **Named User.** Jeder Tool-Aufruf läuft mit Objektrechten, Feldrechten und Freigaben des Benutzers, der die Verbindung autorisiert hat, und steht unter seinem Namen in den Audit-Daten.
- **Keine technischen Benutzer.** „There are no service accounts, no machine-to-machine flows.“ Es meldet sich immer eine Person an.
- **OAuth mit PKCE.** Die Anmeldung läuft über den Authorization Code Flow im Browser. PKCE (Proof Key for Code Exchange) ist Pflicht und verhindert, dass ein abgefangener Autorisierungscode von jemand anderem eingelöst wird.
- **Keine Selbstregistrierung.** Ein Admin legt für jeden KI-Client eine External Client App an und kann sie auf Profile und Permission Sets beschränken.

Zwei Details gehören in Ihre Prüfung. Die [offizielle Anleitung für Claude](https://developer.salesforce.com/blogs/2026/05/connect-claude-with-salesforce-hosted-mcp-servers) fordert die Scopes `refresh_token, offline_access` an, beschriftet mit „Perform requests at any time“. Nach einer Anmeldung arbeitet der Client weiter, bis das Token widerrufen wird oder abläuft; die Refresh-Token-Richtlinie zählt also. Positiv: Der Scope `mcp_api` gibt laut GA-Ankündigung Zugriff auf MCP, „but not our existing REST APIs“. Ein Token, das aus einem MCP-Client gestohlen wird, öffnet weniger als ein klassisches API-Token.

## Warum schützen Rechte pro Person nicht pro Kanal?

Die Security-Seite nennt die Regel: Was ein Benutzer in Lightning oder über die REST API nicht darf, darf er auch über MCP nicht. Umgekehrt gilt es genauso. Alles, was ein Key Account Manager in Lightning öffnen kann, kann der KI-Client abfragen, und eine Abfrage liefert Hunderte Datensätze, durch die sich ein Mensch einzeln klicken würde.

Feldrechte hängen am Benutzer, nicht am Kanal. Dürfen Ihre Vertriebsmitarbeitenden Einkaufspreise der Händler, Margenfelder oder personenbezogene Daten der Servicetechniker lesen, kann Claude das auch, und die Daten verlassen Salesforce.

Soll ein externes Modell weniger sehen als die Person, helfen die Standard-sObject-Server nicht, denn ihre Tools lassen sich nicht ändern. Drei Wege helfen:

- **Named Queries.** Ein Admin gibt eine feste SOQL-Abfrage als API frei, angelegt im Setup oder in VS Code laut [REST-API-Handbuch](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_named_query_intro.htm). Eine Abfrage „offene Fälle zur Seriennummer X“ mit fünf Feldern ersetzt freies SOQL.
- **Custom Server.** Flows, Invocable Apex, Apex REST und Endpunkte aus dem API Catalog lassen sich zu einem [Custom Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html) bündeln. Salesforce empfiehlt einen Server pro Persona, weil ein KI-Client „beyond a few dozen tools“ das richtige Tool schlechter findet. Ein Flow, der eine Händlerübersicht ohne Preisfelder liefert, beantwortet die Frage und verbirgt den Rest.
- **Eigene Benutzer.** Salesforce bindet im eigenen Beispiel einen Server für Datenpflege an ein Profil, als das sich nur Data Stewards anmelden können.

Custom Server kosten Aufwand, senken aber die Aufrufe pro Frage, und das zählt, sobald Salesforce sie abrechnet, siehe [MCP-Zugriffe auf Salesforce als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

## Welchen Server sollten Sie zuerst aktivieren?

Die GA-Ankündigung empfiehlt `sobject-reads` in einer Sandbox und nennt ihn „read-only, risk-free, and immediately useful“. Dem Startpunkt stimme ich zu, dem „risk-free“ nicht. Die Security-Seite ist genauer: Der lesende Server beseitigt das Risiko von Änderungen. Gegen Daten, die über den Client abfließen, tut er nichts.

Simon Willison nennt die gefährliche Kombination die [„lethal trifecta“](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): Zugriff auf private Daten, Kontakt mit fremden Inhalten und ein Weg nach außen. MCP fördert laut Willison genau das Kombinieren von Tools aus verschiedenen Quellen. Eine Claude-Sitzung mit `sobject-reads`, Webzugriff und einem E-Mail-Server hat alle drei. Bei Herstellern kommen fremde Texte über Händlerportale, Web-to-Lead, Email-to-Case und Garantieanträge ins CRM, siehe [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Meine Reihenfolge: `sobject-reads` in einer Sandbox für eine kleine Gruppe; Named Queries oder ein Custom Server pro Persona vor der Produktion; `sobject-mutations` nur für einen definierten Prozess mit Freigabe im Client, die Salesforce in Claude laut [Anthropics Einrichtungsanleitung](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization) standardmäßig verlangt. `sobject-deletes` und `sobject-all` würde ich Fachanwendern gar nicht geben.

## Schützt der Einstein Trust Layer die Daten, die Claude liest?

Salesforce hat diesen Fall nicht dokumentiert; was folgt, ist meine Lesart, keine Aussage von Salesforce.

Die [Dokumentation zum Trust Layer](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) nennt Schutzfunktionen „when interfacing with LLMs“: Grounding, Maskierung sensibler Daten, Toxizitätserkennung, Audit Trail und Zero-Data-Retention-Vereinbarungen mit LLM-Partnern. Trailhead beschreibt [den Weg](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey): Personenbezogene Daten werden maskiert, bevor der Prompt Salesforce verlässt, er passiert das Secure LLM Gateway, und „no customer data including the prompt text and generated responses are stored outside of Salesforce“. Alle Aufrufe der [Models API](https://developer.salesforce.com/docs/ai/agentforce/guide/models-api.html) laufen durch den Trust Layer, und wenn Agentforce der MCP-Client ist, [sagt Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) Trust Layer und Zero Data Retention ebenfalls zu.

Hosted MCP dreht die Richtung um. Claude, ChatGPT oder Cursor ist der Client und bringt sein eigenes Modell mit. Salesforce prüft Token und Rechte, führt die Abfrage aus und gibt Datensätze zurück, die der Client dann in einen Prompt für sein Modell packt. Salesforce macht auf diesem Weg keinen LLM-Aufruf. Es gibt also keinen Gateway-Schritt, in dem Maskierung greifen könnte, und die Zero-Data-Retention-Vereinbarungen binden die LLM-Partner von Salesforce für Aufrufe von Salesforce, nicht ein Modell, das Sie selbst lizenzieren. Die Dokumente passen zu dieser Lesart: Übersicht, Security-Seite, GA-Ankündigung und Claude-Anleitung behandeln Anmeldung, Rechte und Protokollierung, keine erwähnt den Trust Layer.

Zwei Aussagen brauchen Sorgfalt. Die [Claudeforce-Meldung](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) sagt, dass Claude über Amazon Bedrock innerhalb der Salesforce Trust Boundary verfügbar ist. Das betrifft Claude als Modell in Salesforce, nicht die Claude-App auf dem Laptop eines Vertriebsmitarbeiters. Die [AIforce-Ankündigung](https://www.salesforce.com/news/stories/aiforce-announcement/) schreibt, Geschäftsdaten seien „not retained by the model provider“, Anthropics Einrichtungsanleitung sagt zur Speicherung nichts. Ich würde beide Anbieter schriftlich fragen, welcher Vertrag diesen Satz für Ihre Org trägt.

Bis dahin regelt Ihr KI-Vertrag die Daten. Für Claude Code schreibt Anthropic auf der [Seite zur Datennutzung](https://code.claude.com/docs/en/data-usage), dass Prompts unter kommerziellen Bedingungen nicht zum Training genutzt werden, die Standardaufbewahrung 30 Tage beträgt und Zero Data Retention pro Organisation für berechtigte Enterprise-Konten freigeschaltet wird. Diese Bedingungen gehören zum Datenschutzbeauftragten und, wo Beschäftigtendaten betroffen sind, zum Betriebsrat, siehe [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Ein typisches Szenario: drei Anfragen bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, SAP, einem Händlernetz und Claude Enterprise. Alle Zahlen sind Annahmen. In einem Monat erreichen die IT drei Anfragen.

**Händlerbetreuung im Vertrieb.** Zwölf Personen möchten Händlerbesuche mit Claude vorbereiten. Ihr Profil darf die Einkaufspreise in den Händlerpreisvereinbarungen lesen. Entscheidung: ein Custom Server „Händlerbesuch“, dessen Flow die Übersicht ohne Preisfelder liefert, beschränkt auf ein Permission Set für diese zwölf.

**Serviceinnendienst.** Dreißig Personen möchten Fälle, installierte Basis und Garantiestatus per Seriennummer abfragen. Entscheidung: `sobject-reads` plus eine Named Query nach Seriennummer. Ein Teil der Fallbeschreibungen kommt aus dem Händlerportal, deshalb bleibt der Webzugriff in ihrem Claude-Arbeitsbereich aus.

**Der Implementierungspartner.** Ein Entwickler möchte `sobject-all` in Produktion, um doppelte Anlagen mit Claude zusammenzuführen. Entscheidung: nein. Die Aufrufe liefen unter seinem Produktionsbenutzer, und eine Massenänderung gehört in einen geprüften Datenimport. Er bekommt `sobject-reads` in einer Sandbox, um die Dubletten zu analysieren.

Zwei von drei Anfragen gehen durch, beide enger als beantragt. Nach meiner Einschätzung ist das das normale Ergebnis einer Zugriffsprüfung.

## Was sollte die IT-Leitung vor der ersten Verbindung einrichten?

1. **Festlegen, wer sich verbinden darf.** Jede External Client App auf ein Permission Set beschränken, mit der OAuth-Richtlinie „Admin approved users are pre-authorized“. Administratoren bleiben draußen: Ein Admin, der Claude autorisiert, gibt ihm fast die ganze Org.
2. **Freigaben und Feldrechte prüfen** für Fälle, Anlagen, Garantieanträge, Preisvereinbarungen und Kontakte.
3. **Nur `sobject-reads` aktivieren**, zuerst in einer Sandbox.
4. **Mit Named Queries oder Custom Servern eingrenzen**, wo die Person mehr sieht, als das Modell sehen soll.
5. **Die Refresh-Token-Richtlinie festlegen** und einen Widerrufsprozess für Austritte und verlorene Laptops. Warum gestohlene OAuth-Tokens ein realer Angriffsweg sind, steht in [Connected Apps und OAuth bei KI-Integrationen](../connected-apps-oauth-ki-integrationen/).
6. **Den KI-Vertrag klären**: Training, Aufbewahrung, Zero Data Retention, Hosting-Region.
7. **Die API-Logs beobachten**: Wer liest welche Objekte in welcher Menge?

Das gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/): Ein MCP-Server ist eine Schnittstelle und braucht einen Verantwortlichen.

Hosted MCP setzt die Salesforce-Rechte zuverlässig durch; die eigentliche Entscheidung ist, welchen Personen, welchen Feldern und welchem KI-Vertrag Sie Ihre Daten anvertrauen. Wenn Sie vor der ersten Verbindung eine zweite Meinung möchten, [schreiben Sie mir](#contact).
