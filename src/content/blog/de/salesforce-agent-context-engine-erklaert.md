---
title: "Salesforce Agent Context Engine: einfach erklärt"
description: "Was die Salesforce Agent Context Engine leistet, wie sie KI-Agenten geregelten Kontext aus Data 360 liefert und was Unternehmen vorab vorbereiten sollten."
pubDate: 2026-10-23
lang: de
slug: salesforce-agent-context-engine-erklaert
translationKey: agent-context-engine
topic: data
tags: [Agentforce, Data 360, KI-Agenten, Data Governance, Architektur]
takeaways:
  - "Die Agent Context Engine ist eine gemeinsame Kontextschicht auf Data 360, die für jede Anfrage genau die Daten zusammenstellt, die ein KI-Agent braucht und sehen darf."
  - "Sie funktioniert für Agentforce und für Agenten auf anderen Plattformen wie Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK, angebunden über ein SDK oder MCP-Tools."
  - "Fachbegriffe wie aktiver Kunde werden einmal in einer semantischen Schicht definiert, sodass jeder Agent dieselbe Definition nutzt."
  - "Bestehende Berechtigungen, Freigaberegeln und Datenklassifizierung gelten auch für den Kontext; Erinnerungen von Agenten werden mit Quelle gespeichert und können eine Bestätigung erfordern."
  - "Die Agent Context Engine ist in der Preview; Unternehmen sollten zuerst an Identity Resolution, Datenklassifizierung und abgestimmten Fachbegriffen arbeiten, denn die Engine kann nur weitergeben, was in den Daten steht."
faq:
  - q: "Was ist die Salesforce Agent Context Engine?"
    a: "Eine gemeinsame Kontextschicht auf Basis von Data 360. Für jede Agentenanfrage stellt sie ein begrenztes Datenpaket zusammen, etwa das zusammengeführte Kundenprofil, relevante Erinnerungen, Echtzeitsignale und den passenden Ausschnitt des Wissensgraphen, unter Beachtung der Berechtigungen."
  - q: "Funktioniert die Agent Context Engine nur mit Agentforce?"
    a: "Nein. Laut Salesforce können auch Agenten auf Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK sie über ein SDK oder MCP-Tools nutzen, begrenzt auf ihren erlaubten Bereich."
  - q: "Ist die Agent Context Engine allgemein verfügbar?"
    a: "Nein. Im Oktober 2026 beschreibt Salesforce sie als Preview. Preise hat Salesforce in der Ankündigung nicht veröffentlicht."
  - q: "Was brauchen Unternehmen vor dem Einsatz der Agent Context Engine?"
    a: "Data 360 mit funktionierender Identity Resolution, eine Datenklassifizierung, die festlegt, was sensibel ist, abgestimmte Definitionen zentraler Fachbegriffe und saubere Berechtigungen in Salesforce."
---

Die Salesforce Agent Context Engine gibt KI-Agenten den Kontext, den sie für eine einzelne Aufgabe brauchen, und nur den Kontext, den sie sehen dürfen. Sie setzt auf Data 360 auf, stellt für jede Anfrage ein kleines, geregeltes Datenpaket zusammen und macht es Agentforce und Agenten auf anderen Plattformen verfügbar. Salesforce hat sie auf der Dreamforce vorgestellt und am 20. Oktober 2026 ausführlich beschrieben. Aktuell ist sie in der Preview. Für Unternehmen, die KI-Agenten planen, lohnt es sich, sie jetzt zu verstehen, denn sie zeigt, wo die eigentliche Arbeit in Agentenprojekten liegt: bei Daten, Definitionen und Berechtigungen.

## Welches Problem löst die Agent Context Engine?

Ein KI-Agent ist nur so gut wie die Informationen, mit denen er arbeitet. In einem typischen Unternehmen verteilen sich diese Informationen auf CRM-Objekte, Data Warehouses, ERP-Systeme, Wissensdatenbanken und frühere Gespräche. Ohne gemeinsame Schicht löst jedes Agentenprojekt dieselben Probleme von vorn:

- **Welche Daten sind relevant** für diese Aufgabe und welche sind Rauschen?
- **Welcher Kunde** ist gemeint, wenn dasselbe Unternehmen mehrfach in verschiedenen Systemen existiert?
- **Was bedeutet ein Begriff**, etwa „aktiver Kunde“ oder „offener Auftrag“?
- **Was darf dieser Agent sehen** und was muss vor ihm verborgen bleiben?
- **Was haben andere Agenten schon gelernt**, etwa eine Preisvereinbarung, die ein Customer-Success-Agent festgehalten hat?

Salesforce zeigt das in seiner [Ankündigung](https://www.salesforce.com/blog/?p=157012) an einem Vertriebsbeispiel: Eine Opportunity steht auf „Commit“, und ein Vertriebsagent entwirft eine Abschluss-E-Mail. Mit dem richtigen Kontext sieht der Agent zusätzlich sinkende Produktnutzung, einen offenen Rechnungsstreit und ein nicht unterschriebenes Compliance-Dokument, und er respektiert eine Preiszusage, die ein anderer Agent bereits mit dem Kunden vereinbart hatte. Statt der Abschluss-E-Mail empfiehlt er ein serviceorientiertes Gespräch mit dem Sponsor.

## Wie funktioniert die Agent Context Engine?

Laut Salesforce verbindet die Engine mehrere Bausteine:

1. **Gemeinsame Definitionen.** Fachexperten legen für eine Aufgabe einmal die relevanten Quellen, Fachbegriffe und den Verwendungszweck fest. Eine semantische Schicht auf Basis der semantischen Datenmodelle von Tableau, inzwischen Teil von Data 360, hält Begriffe über alle Agenten hinweg einheitlich.
2. **Ein begrenztes Paket pro Anfrage.** Für jede Anfrage stellt die Engine das zusammengeführte Kundenprofil, relevante Erinnerungen, Echtzeitsignale und den passenden Ausschnitt des Wissensgraphen zusammen. Ziel von Salesforce ist das Minimum an Daten für das beste Ergebnis.
3. **Navigation im Graphen.** Statt jedes Mal alle Daten zu durchsuchen, startet die Engine beim identifizierten Kunden und folgt nur relevanten und erlaubten Verbindungen im Wissensgraphen. Dieser Ansatz wird oft GraphRAG genannt.
4. **Geregelte Erinnerungen.** Die Engine extrahiert Fakten, Präferenzen und Erkenntnisse aus Agentengesprächen und speichert sie mit ihrer Quelle. Erinnerungen können eine menschliche Bestätigung erfordern, bevor sich andere Agenten darauf verlassen.

Die Engine baut auf Data 360 auf und übernimmt dessen Echtzeit-Pipeline, Zero-Copy-Zugriff, Identity Resolution und Governance. Daten, die in Snowflake, Databricks oder BigQuery bleiben, lassen sich per Zero Copy nutzen, mit der Governance von Data 360 darüber.

![So stellt die Agent Context Engine Kontext zusammen: Daten aus CRM-Objekten, ERP-Systemen, Data Warehouses wie Snowflake, Databricks und BigQuery per Zero Copy, Wissensdatenbanken und früheren Gesprächen fließen in die Agent Context Engine auf Data 360. Die Engine verbindet gemeinsame Definitionen, ein begrenztes Paket pro Anfrage, Navigation im Graphen (GraphRAG) und geregelte Erinnerungen und wendet die bestehenden Objekt-, Feld- und Datensatzberechtigungen, Freigaberegeln und die Datenklassifizierung an. Agenten auf Agentforce, Google ADK, AWS Bedrock, LangGraph und dem OpenAI SDK nutzen sie über ein SDK oder MCP-Tools. Agenten erben jede Schwäche des bestehenden Berechtigungsmodells.](../../../assets/blog/agent-context-engine-de.png)

## Welche Agenten können sie nutzen?

Das ist einer der interessanteren Punkte. Die Agent Context Engine ist nicht auf Agentforce beschränkt. Laut Salesforce können auch Agenten auf Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK sie nutzen, über ein SDK oder MCP-Tools und begrenzt auf ihren erlaubten Bereich.

Für die Unternehmensarchitektur ist das wichtig. Viele Unternehmen werden nicht alle Agenten auf einer Plattform betreiben. Eine gemeinsame Kontextschicht, die mehrere Agentenplattformen nutzen können, vermeidet, dieselbe Datenzugriffslogik in jeder einzelnen zu bauen. Gleichzeitig macht sie Data 360 zu einem zentralen Teil der KI-Architektur, und das ist eine strategische Entscheidung für sich.

## Wie werden Berechtigungen und sensible Daten behandelt?

Salesforce gibt an, dass beim Zusammenstellen des Kontexts die bestehenden Berechtigungen aus Salesforce und Data 360 gelten: Objekt-, Feld- und Datensatzberechtigungen, Freigaberegeln und Datenklassifizierung. Sensible Inhalte werden maskiert oder zurückgehalten, bevor sie den Agenten erreichen, auf Basis der Klassifizierungsrichtlinie und nicht nach Einschätzung des Modells. Änderungen an führenden Systemen laufen weiterhin über deren eigene Berechtigungen.

Das ist das richtige Prinzip. Es bedeutet aber auch, dass Agenten jede Schwäche des bestehenden Berechtigungsmodells erben. Sind Freigaberegeln heute zu großzügig, sieht ein Agent morgen zu viel. Sind sensible Felder nicht klassifiziert, können sie nicht maskiert werden. Vor einem Agentenprojekt verdient das Berechtigungsmodell dieselbe Aufmerksamkeit wie das Agentendesign.

Die Erinnerungsfunktion wirft für europäische Unternehmen eine weitere Frage auf: Wie werden gespeicherte Erinnerungen behandelt, wenn ein Kunde nach DSGVO Löschung oder Auskunft verlangt? Salesforce gibt an, dass jede Erinnerung auf ihre Quelle zurückführbar ist. Das ist ein guter Ausgangspunkt, aber der Prozess für Löschung und Aufbewahrung sollte stehen, bevor Erinnerungen eingeschaltet werden.

## Was sollten Unternehmen jetzt vorbereiten?

Die Agent Context Engine ist in der Preview, und Preise hat Salesforce in der Ankündigung nicht veröffentlicht. Das ist ein guter Grund, nichts zu überstürzen, und ein ebenso guter Grund, mit den Grundlagen zu beginnen, denn die zahlen sich mit oder ohne Engine aus:

- **Identity Resolution.** Sorgen Sie dafür, dass Kunden, Kontakte und Anlagen systemübergreifend zugeordnet werden können. In der Fertigung heißt das oft, CRM-Accounts, ERP-Kundennummern und die installierte Basis zusammenzubringen.
- **Datenklassifizierung.** Legen Sie fest, welche Felder sensibel sind, etwa personenbezogene Daten, Preise, Vertragsbedingungen oder rechtliche Informationen.
- **Fachliche Definitionen.** Einigen Sie sich, was zentrale Begriffe bedeuten und wer für jede Definition verantwortlich ist. „Aktiver Kunde“ bedeutet für Vertrieb, Service und Finanzen etwas anderes, solange niemand entscheidet.
- **Berechtigungen.** Prüfen Sie Freigaberegeln und Feldberechtigungen, vor allem breite Zugriffe, die über Jahre gewachsen sind.
- **Datenqualität.** Dubletten und veraltete Datensätze führen zu falschem Kontext, egal wie gut die Engine ist.

Warum diese Grundlagen wichtiger sind als der Agent selbst, beschreibe ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Wie passt das in die Gesamtarchitektur?

Die Agent Context Engine zeigt, wohin Salesforce steuert: Data 360 als gemeinsame Grundlage für Daten, Kontext und Governance, mit Agenten verschiedener Plattformen darüber. Für einen Architekten auf Kundenseite stellen sich die üblichen Fragen: Wie viel hängt an einem Hersteller, welche Daten müssen wirklich nach Data 360, was kostet es im großen Maßstab, und wer verantwortet Definitionen und Berechtigungen?

Das sind Entscheidungen des Kunden und nicht eines einzelnen Umsetzungspartners, und sie gehören in die Zielarchitektur, bevor der erste Agent produktiv geht. Das ist ein Kernteil meiner [Arbeit an Architektur und Governance](../../leistungen/salesforce-architektur/). Wenn Sie besprechen möchten, was die Agent Context Engine für Ihre KI-Pläne bedeutet, [schreiben Sie mir](#contact).
