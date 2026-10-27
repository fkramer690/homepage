---
title: "MCP und Salesforce, erklärt für die IT-Leitung"
description: "Was MCP in Salesforce bedeutet und welche vier Entscheidungen bei der IT-Leitung liegen: welche Server, welche Benutzer, welche Daten, welche KI-Clients."
pubDate: 2026-10-27
lang: de
slug: mcp-salesforce-erklaert-it-leitung
translationKey: mcp-explained-salesforce-it-leads
topic: data
category: ai
tags: [MCP, Salesforce-Schnittstellen, Claude, Sicherheit, IT-Governance, Maschinenbau]
takeaways:
  - "MCP (Model Context Protocol) ist ein offenes Protokoll, über das KI-Anwendungen wie Claude, ChatGPT, Cursor oder Agentforce Tools in anderen Systemen aufrufen, auch in Salesforce."
  - "Die MCP-Spezifikation sagt selbst, dass das Protokoll seine Sicherheitsprinzipien nicht durchsetzen kann; die Kontrollen liegen in der KI-Anwendung, im Server und in den Salesforce-Rechten."
  - "Die Hosted MCP Servers von Salesforce sind standardmäßig aus, führen jeden Aufruf als angemeldeter Benutzer aus und kennen keine Service Accounts; Ihr Freigabemodell wird zur Grenze."
  - "Die IT-Leitung entscheidet vier Dinge: welche MCP-Server aktiv sind, welche Benutzer sich verbinden dürfen, welche Daten die Tools erreichen und welche KI-Clients und Agenten zugelassen sind."
  - "Ein sicherer Start ist der lesende Server sobject-reads in einer Sandbox, ein zugelassener KI-Client und kleine Custom Server pro Rolle statt eines Servers mit allen Tools."
faq:
  - q: "Was ist MCP in Salesforce?"
    a: "MCP ist ein offenes Protokoll, über das KI-Anwendungen Tools in anderen Systemen aufrufen. In Salesforce gibt es drei Richtungen: externe KI-Werkzeuge greifen über Hosted MCP Servers zu, Agentforce ruft als MCP-Client fremde Tools auf, und Coding-Agenten arbeiten über lokale Server auf Sandboxes."
  - q: "Können Claude oder ChatGPT über MCP Salesforce-Daten ändern?"
    a: "Ja, wenn ein Admin einen Server mit Schreib-Tools wie SObject Mutations aktiviert und der Benutzer Bearbeitungsrechte hat. Mit dem Server SObject Reads sind Änderungen ausgeschlossen. Salesforce in Claude fragt standardmäßig vor jeder Änderung nach."
  - q: "Können Mitarbeitende ihr eigenes KI-Werkzeug per MCP an Salesforce anbinden?"
    a: "Nicht ohne die IT. Jeder Client braucht eine External Client App, die ein Admin anlegt; dynamische Client-Registrierung unterstützt Salesforce bei den Hosted MCP Servers nicht."
  - q: "Protokolliert Salesforce, was ein KI-Werkzeug über MCP getan hat?"
    a: "Ja. Jeder Tool-Aufruf steht in den Audit-Daten unter dem Namen des Benutzers, und die API-Logs lassen sich über API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP filtern. Die eingegebene Frage bleibt in der KI-Anwendung, deren Logs zählen also mit."
  - q: "Kann ein nächtlicher Agent ohne Benutzer über Hosted MCP arbeiten?"
    a: "Nein. Hosted MCP kennt keine Service Accounts und keine Machine-to-Machine-Flows. Agenten ohne Benutzer brauchen die Agent API mit Client Credentials und Run-As-Benutzer oder eine klassische Integration."
draft: false
---

MCP in Salesforce bedeutet: KI-Werkzeuge wie Claude, ChatGPT oder Cursor und auch Agentforce selbst rufen Salesforce-Funktionen oder fremde Tools über ein gemeinsames offenes Protokoll auf. Das Protokoll transportiert die Aufrufe, durchsetzen kann es fast nichts. Was ein KI-Client in Ihrer Org darf, folgt aus vier Entscheidungen der IT-Leitung: welche MCP-Server aktiv sind, welche Benutzer sich verbinden dürfen, welche Daten die Tools erreichen und welche KI-Clients und Agenten zugelassen sind. Ich würde lesend starten, mit einem zugelassenen Client und kleinen Servern pro Rolle.

## Was ist MCP, ohne Entwicklerdetails erklärt?

Das Model Context Protocol (MCP) ist ein offenes Protokoll, das standardisiert, wie KI-Anwendungen sich mit Tools und Daten verbinden. Die [Spezifikation](https://modelcontextprotocol.io/specification/latest) nutzt JSON-RPC-2.0-Nachrichten und nennt das Language Server Protocol als Vorbild: LSP sorgt dafür, dass jeder Code-Editor jede Programmiersprache unterstützen kann, MCP dafür, dass jede KI-Anwendung jedes Tool nutzen kann, das das Protokoll spricht.

Laut [Architekturübersicht](https://modelcontextprotocol.io/docs/learn/architecture) gibt es drei Rollen:

- **Host:** die KI-Anwendung, in der die Person arbeitet, etwa Claude, ChatGPT, Cursor oder Agentforce.
- **Client:** eine Komponente im Host, die die Verbindung zu genau einem Server hält.
- **Server:** das Programm, das Tools anbietet, zum Beispiel ein Hosted MCP Server von Salesforce.

Ein Server bietet Tools an, die die KI ausführen kann (eine Abfrage, eine Datensatzänderung, einen Flow), außerdem Ressourcen mit Kontextdaten und Prompt-Vorlagen. Welches Tool aufgerufen wird, entscheidet das Modell im Gespräch. Server laufen lokal auf dem Rechner oder entfernt über HTTP; dort empfiehlt das Protokoll OAuth.

Ein Satz in der Übersicht lohnt das zweite Lesen: MCP regelt nur den Austausch von Kontext und schreibt nicht vor, wie die KI-Anwendung das Sprachmodell oder den erhaltenen Kontext nutzt. Wohin Ihre CRM-Daten gehen, nachdem Claude oder ChatGPT sie gelesen hat, sagt das Protokoll also nicht. Das regelt Ihr Vertrag mit dem KI-Anbieter.

## Wo taucht MCP in einer Salesforce-Org auf?

Für die IT-Leitung reichen drei Richtungen:

1. **Externe KI zu Salesforce.** Claude, ChatGPT oder Cursor lesen und ändern Datensätze über die Hosted MCP Servers, die seit dem [29. April 2026 allgemein verfügbar](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) sind, ab Enterprise Edition. Salesforce in Claude, beschrieben in [AIforce: Salesforce in Claude und Slack](../aiforce-salesforce-in-claude-und-slack/), nutzt denselben Weg.
2. **Agentforce zu fremden Tools.** Agentforce arbeitet als MCP-Client. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce) werden externe Server in der Agentforce Registry registriert, MuleSoft- und Salesforce-Server im API Catalog, und der Admin wählt die Tools, die ein Agent nutzen darf. Salesforce hat den Client [als Pilot für Juli 2025 angekündigt](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce); eine aktuelle Statusangabe habe ich nicht gefunden, prüfen Sie die Verfügbarkeit in Ihrer Org.
3. **Coding-Agenten zu Ihrem Projekt.** Die Entwickler Ihres Partners verbinden Claude Code, Cursor oder Agentforce Vibes über lokale Server wie den Salesforce DX MCP Server mit Sandboxes. Was sich dort ändert, steht in [Salesforce DX MCP Server: das Ende](../salesforce-dx-mcp-server-ende/).

Die vollständige Schnittstellenübersicht mit Agent API, Models API und dem ERP-Weg über MuleSoft finden Sie in [Kapitel 3 meiner KI-Masterclass](../../masterclass-ki/mcp-und-schnittstellen/).

## Was überlässt das Protokoll Ihnen?

Die MCP-Spezifikation ist ehrlich, was ihre Grenzen angeht. Im Abschnitt Security and Trust & Safety steht, dass Hosts vor jedem Tool-Aufruf die ausdrückliche Zustimmung des Benutzers einholen müssen und dass Tool-Beschreibungen als nicht vertrauenswürdig gelten, solange sie nicht von einem vertrauenswürdigen Server stammen. Dann folgt der Satz, dass MCP selbst diese Prinzipien auf Protokollebene nicht durchsetzen kann. Der [Abschnitt zu Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) verlangt einen Menschen, der Tool-Aufrufe ablehnen kann.

Die Kontrollen liegen also außerhalb des Protokolls: in der KI-Anwendung (fragt sie vor dem Schreiben nach?), im Server (welche Tools bietet er an?) und in Salesforce (welche Datensätze darf dieser Benutzer sehen?). Den letzten Teil hat Salesforce streng gelöst. Laut [Security Best Practices für Hosted MCP](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) sind die Server standardmäßig deaktiviert, jeder Tool-Aufruf läuft mit den Rechten des Benutzers, der die Verbindung autorisiert hat, und steht unter seinem Namen in den Audit-Daten. Service Accounts und Machine-to-Machine-Flows gibt es nicht.

Ein Detail ist für Prüfungen wichtig. Laut den [Designprinzipien der Spezifikation](https://modelcontextprotocol.io/specification/2026-07-28/architecture) erhalten Server nur den nötigen Kontext, das vollständige Gespräch bleibt beim Host. Meine Lesart: Salesforce protokolliert, welche Datensätze Claude gelesen hat, nicht die Frage, die der Benutzer eingegeben hat. Wollen Sie nachvollziehen, warum ein Garantiefall geändert wurde, brauchen Sie auch die Logs der KI-Anwendung.

## Vier Entscheidungen für die IT-Leitung

### 1. Welche MCP-Server lassen Sie zu?

Die [Server-Referenz](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/servers-reference.html) nennt sieben Standardserver: vier für sObjects (All, Reads, Mutations, Deletes), Data 360, Tableau Next und Headless 360, der noch Beta ist und bis ins Setup reicht. Ihre Tool-Sets lassen sich nicht ändern. [Custom Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html) geben eigene Flows, Invocable Apex, Apex REST und Endpunkte aus dem API Catalog frei, jeweils unter eigener URL. Salesforce warnt, dass ein KI-Client ab einigen Dutzend Tools nicht mehr zuverlässig das richtige auswählt, und empfiehlt einen Server pro Rolle.

Community-Server von npm oder GitHub sind die dritte Option. Die [Security Best Practices des MCP-Projekts](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) warnen, dass lokale Server mit denselben Rechten wie der Client laufen und beliebigen Code ausführen können. Gegen eine Produktion würde ich nur Server zulassen, die Salesforce selbst betreibt.

### 2. Welche Benutzer dürfen sich verbinden?

Weil jeder Aufruf als angemeldeter Benutzer läuft, wird Ihr Freigabemodell zur Grenze. Sehen Servicemitarbeitende Händlerpreisvereinbarungen, weil die Freigaben vor Jahren zu weit geöffnet wurden, zeigt ein Chatfenster sie in Sekunden. Salesforce erlaubt, die External Client App an bestimmte Profile und Permission Sets zu binden. So wird MCP-Zugriff ein eigenes Permission Set statt Nebenwirkung eines Profils. Im Piloten würde ich Admins und Benutzer mit View All Data ganz aus MCP heraushalten.

### 3. Welche Daten dürfen die Tools erreichen?

Starten Sie mit `sobject-reads`, dem lesenden Server, den Salesforce in einer Sandbox als ersten Schritt empfiehlt. Die nächste Stufe ist enger als jeder Standardserver: Named Queries geben vordefinierte SOQL-Abfragen frei statt freier Abfragen, und ein Flow „Maschinenhistorie nach Seriennummer“ liefert genau die Felder, die der Serviceinnendienst braucht. Das MCP-Projekt nennt Wildcard-Scopes als typischen Fehler, und für Tools gilt dieselbe Logik. Auftragsstatus, Bestand und Preise aus SAP oder proALPHA bleiben hinter einer deterministischen API, wie in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschrieben.

### 4. Welche KI-Clients und Agenten lassen Sie zu?

Salesforce nennt [Claude, ChatGPT, Cursor und Postman](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/setup-overview.html) als Clients. Jeder braucht eine External Client App mit eigener Callback-URL, angelegt von einem Admin; dynamische Client-Registrierung wird nicht unterstützt. Niemand bindet also ein neues KI-Werkzeug ohne die IT an, und jede External Client App ist eine Entscheidung über einen Anbieter, einen Vertrag und einen Datenfluss.

Für Salesforce in Claude legen Claude-Owner laut [Anthropics Einrichtungsanleitung](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization) pro Gruppe fest, ob das Plugin installiert wird, jede Person meldet sich mit ihrem eigenen Salesforce-Konto an, und Claude fragt standardmäßig vor jeder Änderung nach. Für Agentforce als Client schreibt Trailhead, dass der Einstein Trust Layer greift und Richtlinien im Agentforce Gateway begrenzen können, wie oft ein Agent ein Tool aufruft. Für externe Clients, die Ihre Daten lesen, habe ich keine vergleichbare Aussage gefunden; diese Lücke behandle ich in [Hosted MCP Server: wer darf welche Daten lesen](../salesforce-hosted-mcp-server-datenzugriff/).

## Ein typisches Szenario: vier MCP-Anfragen in einem Monat

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, einem Händlerportal und SAP. Alle Zahlen sind Annahmen. Innerhalb eines Monats erreichen die IT vier Anfragen:

- **After-Sales:** 20 Personen im Serviceinnendienst möchten Claude nach offenen Fällen, installierten Maschinen und Garantiestatus fragen. Entscheidung: Pilot. Ein Custom Server mit drei Tools (offene Fälle pro Account, Maschinenhistorie nach Seriennummer als Flow, Garantiestatus als Named Query), gebunden an ein eigenes Permission Set und zuerst in einer Sandbox getestet.
- **Vertriebsinnendienst:** möchte, dass ChatGPT nach Händlerbesuchen Opportunities aktualisiert. Entscheidung: später. Ein zweiter KI-Anbieter bedeutet eine zweite Vertragsprüfung, und Schreibzugriff wartet, bis der lesende Pilot acht Wochen gelaufen ist.
- **Implementierungspartner:** möchte einen Community-MCP-Server mit Produktionszugang, um Daten schneller zu korrigieren. Entscheidung: nein. Partner arbeiten in Sandboxes, Änderungen an der Produktion laufen über die Pipeline. Das gehört in den Vertrag, siehe [Partner mit KI-Coding: Regeln für den Vertrag](../partner-ki-coding-regeln-vertrag/).
- **Ersatzteilwesen:** möchte einen Agentforce-Agenten, der beim MCP-Server eines Teilelieferanten die Verfügbarkeit abfragt. Entscheidung: testen. Server in der Agentforce Registry registrieren, zwei Tools freigeben, ein Gateway-Limit setzen und in den Bedingungen des Lieferanten prüfen, was mit Ihren Abfragen passiert.

Ein Pilot, eine Verschiebung, eine Absage, ein Test. Das ist besser als vier angebundene Werkzeuge, über die niemand entschieden hat.

## Wo ist MCP die falsche Schnittstelle?

Hosted MCP Servers sind für eine Person gebaut, die mit einem KI-Werkzeug arbeitet. Drei Fälle brauchen einen anderen Weg:

- **Agenten ohne Benutzer.** Ein nächtlicher Job, der Garantieanträge vorsortiert, hat niemanden, der ihn autorisieren könnte. Die [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html) arbeitet mit Client Credentials und einem Run-As-Benutzer, den ich wie jeden Integrationsbenutzer behandeln würde.
- **Integration zwischen Systemen.** Der Auftragsabgleich mit SAP gehört in die Middleware.
- **Massenoperationen.** Tausende Datensätze zu prüfen ist Aufgabe eines Reports oder Batch-Jobs. Salesforce schreibt, Hosted MCP Servers seien [„intended only for customers with Flex Credits“](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md), Nutzung kann also abgerechnet werden; warum daraus ein Budgetposten wird, steht in [MCP-Zugriffe auf Salesforce als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

Welche Schnittstelle zu welchem Konsumenten passt, unter welcher Identität, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

MCP macht Salesforce für jedes KI-Werkzeug erreichbar, und Ihre Entscheidungen zu Servern, Benutzern, Daten und Clients bestimmen, ob das Ihrem Service hilft oder Ihre Daten offenlegt. Wenn Sie eine zweite Meinung zu Ihren ersten MCP-Anfragen möchten, [schreiben Sie mir](#contact).
