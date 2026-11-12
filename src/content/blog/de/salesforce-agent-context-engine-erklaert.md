---
title: "Salesforce Agent Context Engine: einfach erklärt"
description: "Was die Salesforce Agent Context Engine leistet, wie sie KI-Agenten geregelten Kontext aus Data 360 liefert und was Unternehmen vorab vorbereiten sollten."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-agent-context-engine-erklaert
translationKey: agent-context-engine
topic: data
categories: [ai]
tags: [Agentforce, Data 360, KI-Agenten, Data Governance, Architektur]
takeaways:
  - "Die Engine stellt pro Anfrage ein kleines Datenpaket aus Kundenprofil, Erinnerungen, Echtzeitsignalen und einem Ausschnitt des Wissensgraphen zusammen."
  - "Neben Agentforce sollen sich laut Salesforce auch Agenten auf Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK über SDK, APIs oder MCP anbinden lassen."
  - "Fachbegriffe wie „aktiver Kunde“ werden pro Aufgabe einmal in einer semantischen Schicht definiert, sodass alle Agenten dieselbe Definition nutzen."
  - "Bestehende Berechtigungen und Datenklassifizierung gelten auch für den Kontext. Dauerhafte Erinnerungen lassen sich über APIs ändern und löschen."
  - "Die Engine ist in der Preview. Identity Resolution, Datenklassifizierung und abgestimmte Fachbegriffe zahlen sich schon jetzt aus, mit oder ohne Engine."
faq:
  - q: "Was ist die Salesforce Agent Context Engine?"
    a: "Eine gemeinsame Kontextschicht auf Basis von Data 360. Für jede Agentenanfrage stellt sie ein begrenztes Datenpaket zusammen, etwa das zusammengeführte Kundenprofil, relevante Erinnerungen, Echtzeitsignale und den passenden Ausschnitt des Wissensgraphen, unter Beachtung der Berechtigungen."
  - q: "Funktioniert die Agent Context Engine nur mit Agentforce?"
    a: "Nein. Salesforce hat angekündigt, dass auch Agenten auf Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK sie über ein SDK, APIs oder MCP-Tools nutzen können, begrenzt auf ihren erlaubten Bereich. Prüfen Sie in der Preview, welche Plattformen und Funktionen für Ihre Org tatsächlich verfügbar sind."
  - q: "Ist die Agent Context Engine allgemein verfügbar?"
    a: "Nein. Stand November 2026 beschreibt Salesforce sie als Preview. Preise oder Verbrauchswerte dafür hat Salesforce nicht veröffentlicht. Data 360 selbst wird nach Verbrauch abgerechnet, klären Sie also, welche Kontext-, Graph- und Erinnerungsvorgänge Credits verbrauchen."
  - q: "Was brauchen Unternehmen vor dem Einsatz der Agent Context Engine?"
    a: "Data 360 mit einer verlässlichen Identity Resolution überall dort, wo Kontext über mehrere Systeme oder Datensätze reicht. Dazu gehören eine Datenklassifizierung, die festlegt, was sensibel ist, abgestimmte Definitionen zentraler Fachbegriffe mit klarer Verantwortung und saubere Berechtigungen in Salesforce."
  - q: "Kann ein Agent die Erinnerungen eines anderen Agenten sehen?"
    a: "Ja, standardmäßig schon. Jede Anfrage muss die Identität des Endnutzers mitgeben, sonst liefert die Engine nichts. Die Identität des anfragenden Agenten ist optional. Fehlt sie, gibt es keinen Filter nach Agent, und jeder Agent, der diesen Kunden bedient, kann die Erinnerungen zu diesem Kunden lesen. Legen Sie bewusst fest, welche Agenten Erinnerungen teilen dürfen."
---

Die Salesforce Agent Context Engine gibt KI-Agenten den Kontext, den sie für eine einzelne Aufgabe brauchen, und nur den Kontext, den sie sehen dürfen. Sie baut auf Data 360 auf, stellt für jede Anfrage ein kleines, geregeltes Datenpaket zusammen und stellt es Agentforce sowie Agenten auf anderen Plattformen zur Verfügung. Salesforce hat sie auf der Dreamforce vorgestellt und am 20. Oktober 2026 ausführlich beschrieben. Stand November 2026 ist sie in der Preview; Produktionsreife, Supportbedingungen und Preise sind also noch mit Salesforce zu klären. Für Unternehmen, die KI-Agenten planen, lohnt es sich, sie jetzt zu verstehen, denn sie zeigt, wo die eigentliche Arbeit in Agentenprojekten liegt: bei Daten, Definitionen und Berechtigungen.

## Welches Problem löst die Agent Context Engine?

Was ein KI-Agent nicht erhält, kann er nicht berücksichtigen. Die nötigen Informationen verteilen sich in einem typischen Unternehmen auf CRM-Objekte, Data Warehouses, ERP-Systeme, Wissensdatenbanken und frühere Gespräche. Ohne gemeinsame Schicht löst jedes Agentenprojekt dieselben Probleme von vorn:

- **Welche Daten sind relevant** für diese Aufgabe und welche sind Rauschen?
- **Welcher Kunde** ist gemeint, wenn dasselbe Unternehmen mehrfach in verschiedenen Systemen existiert?
- **Was bedeutet ein Begriff**, etwa „aktiver Kunde“ oder „offener Auftrag“?
- **Was darf dieser Agent sehen** und was muss vor ihm verborgen bleiben?
- **Was haben andere Agenten schon gelernt**, etwa eine Preisvereinbarung, die ein Customer-Success-Agent festgehalten hat?

Salesforce zeigt das in seiner [Ankündigung](https://www.salesforce.com/blog/?p=157012) an einem Vertriebsbeispiel: Eine Opportunity steht auf „Commit“, und ein Vertriebsagent entwirft eine Abschluss-E-Mail. Mit dem richtigen Kontext erkennt der Agent zusätzlich sinkende Produktnutzung, einen offenen Rechnungsstreit und ein nicht unterschriebenes Compliance-Dokument, und er berücksichtigt eine Preiszusage, die ein anderer Agent bereits mit dem Kunden vereinbart hatte. Statt der Abschluss-E-Mail empfiehlt er ein serviceorientiertes Gespräch mit dem Sponsor.

## Definitionen, Datenpaket, Graph und Erinnerungen

Laut Salesforce verbindet die Engine mehrere Bausteine:

1. **Gemeinsame Definitionen.** Fachexperten legen für eine Aufgabe einmal die relevanten Quellen, Fachbegriffe und den Verwendungszweck fest. Eine semantische Schicht auf Basis der semantischen Datenmodelle von Tableau, inzwischen Teil von Data 360, hält Begriffe über alle Agenten hinweg einheitlich.
2. **Ein begrenztes Paket pro Anfrage.** Für jede Anfrage stellt die Engine das zusammengeführte Kundenprofil, relevante Erinnerungen, Echtzeitsignale und den passenden Ausschnitt des Wissensgraphen zusammen. Ziel von Salesforce ist das Minimum an Daten für das beste Ergebnis.
3. **Navigation im Graphen.** Statt jedes Mal alle Daten zu durchsuchen, startet die Engine beim identifizierten Kunden und folgt nur relevanten und erlaubten Verbindungen im Wissensgraphen. Dieser Ansatz wird oft GraphRAG genannt.
4. **Geregelte Erinnerungen.** Die Engine extrahiert Fakten, Präferenzen und Erkenntnisse aus Agentengesprächen und speichert dauerhafte Erinnerungen zusammen mit ihrer Quelle. Nicht jedes Gespräch wird zur dauerhaften Erinnerung, und Erinnerungen können eine menschliche Bestätigung erfordern, bevor sich andere Agenten darauf verlassen.

Die Engine baut auf Data 360 auf und übernimmt dessen Echtzeit-Pipeline, Zero-Copy-Zugriff, Identity Resolution und Governance. Daten, die in Snowflake, Databricks oder BigQuery bleiben, lassen sich per Zero Copy nutzen. Die Governance von Data 360 ergänzt dabei die Kontrollen dieser Plattformen, ersetzt sie aber nicht. Echtzeit heißt nicht, dass jeder Teil des Pakets gleich aktuell ist: Ein Sensoralarm kann in Sekunden ankommen, während ein zusammengeführtes Profil in Läufen aktualisiert wird. Legen Sie pro Kontextbestandteil fest, wie alt er sein darf.

![So stellt die Agent Context Engine Kontext zusammen: Daten aus CRM-Objekten, ERP-Systemen, Data Warehouses wie Snowflake, Databricks und BigQuery per Zero Copy, Wissensdatenbanken und früheren Gesprächen fließen in die Agent Context Engine auf Data 360. Die Engine verbindet gemeinsame Definitionen, ein begrenztes Paket pro Anfrage, Navigation im Graphen (GraphRAG) und geregelte Erinnerungen und wendet die bestehenden Objekt-, Feld- und Datensatzberechtigungen, Freigaberegeln und die Datenklassifizierung an. Agenten auf Agentforce, Google ADK, AWS Bedrock, LangGraph und dem OpenAI SDK nutzen sie über ein SDK oder MCP-Tools. Agenten erben jede Schwäche des bestehenden Berechtigungsmodells.](../../../assets/blog/agent-context-engine-de.png)

## Auch Agenten außerhalb von Agentforce können sie nutzen

Das ist einer der interessanteren Punkte. Die Agent Context Engine ist nicht auf Agentforce beschränkt. Salesforce hat angekündigt, dass auch Agenten auf Google ADK, AWS Bedrock, LangGraph oder dem OpenAI SDK sie nutzen können, über ein SDK, APIs oder MCP-Tools und begrenzt auf ihren erlaubten Bereich. Die Entwicklerdokumentation beschreibt die Engine als API-first. Ob jede Plattform in der Preview denselben Funktionsumfang erhält, sollte man testen und nicht voraussetzen.

Für die Unternehmensarchitektur ist das wichtig. Viele Unternehmen werden nicht alle Agenten auf einer Plattform betreiben. Eine gemeinsame Kontextschicht, die mehrere Agentenplattformen nutzen können, erspart es, dieselbe Datenzugriffslogik in jeder einzelnen Plattform aufzubauen. Gleichzeitig macht sie Data 360 zu einem zentralen Teil der KI-Architektur, und das ist eine strategische Entscheidung für sich.

## Wie werden Berechtigungen und sensible Daten behandelt?

Salesforce gibt an, dass beim Zusammenstellen des Kontexts die bestehenden Berechtigungen aus Salesforce und Data 360 gelten: Objekt-, Feld- und Datensatzberechtigungen, Freigaberegeln und Datenklassifizierung. Sensible Inhalte werden maskiert oder zurückgehalten, bevor sie den Agenten erreichen, auf Basis der Klassifizierungsrichtlinie und nicht nach Einschätzung des Modells. Änderungen an führenden Systemen unterliegen weiterhin deren eigenen Berechtigungen.

Der Zugriff hängt außerdem von den Identitäten ab, die der aufrufende Agent mitgibt. Laut [Entwicklerdokumentation zur Governance der Erinnerungen](https://developer.salesforce.com/docs/data/agentic-memory-context/guide/agentic-memory-governance.html) muss jede Anfrage die Identität des Endnutzers enthalten, bei Kunden die Individual-ID, bei Mitarbeitenden die User-ID. Die Identität des Agenten selbst ist optional. Fehlt sie, werden die Ergebnisse nicht nach Agent gefiltert, und jeder Agent, der diesen Kunden bedient, kann dieselben Erinnerungen zu diesem Kunden lesen.

Das ist das richtige Prinzip. Es bedeutet aber auch, dass Agenten jede Schwäche des bestehenden Berechtigungsmodells erben. Sind Freigaberegeln heute zu großzügig, sieht ein Agent morgen zu viel. Sind sensible Felder nicht klassifiziert, können sie nicht maskiert werden. Vor einem Agentenprojekt verdient das Berechtigungsmodell dieselbe Aufmerksamkeit wie das Agentendesign.

```hinweis offen
Die Erinnerungsfunktion wirft für europäische Unternehmen eine weitere Frage auf: Wie werden gespeicherte Erinnerungen behandelt, wenn ein Kunde nach DSGVO Löschung oder Auskunft verlangt? Salesforce gibt an, dass jede Erinnerung auf ihre Quelle zurückführbar ist, und die [APIs zur Verwaltung der Erinnerungen](https://developer.salesforce.com/docs/data/agentic-memory-context/guide/agentic-memory-memory-management.html) können einzelne Einträge abrufen, ändern und endgültig löschen. Abgelaufene Einträge werden allerdings nicht physisch gelöscht. Der Prozess für Anfragen, Aufbewahrungsfristen und die Löschung aller Erinnerungen zu einer Person, auch in den Quellsystemen, sollte deshalb festgelegt sein, bevor Erinnerungen eingeschaltet werden.
```

## Jetzt vorbereiten: Identity Resolution, Klassifizierung und Begriffe

Die Agent Context Engine ist in der Preview, und Preise hat Salesforce in der Ankündigung nicht veröffentlicht. Das ist ein guter Grund, nichts zu überstürzen, und ein ebenso guter Grund, mit den Grundlagen zu beginnen, denn die zahlen sich mit oder ohne Engine aus:

| Bereich | Was Sie festlegen |
|---|---|
| Identity Resolution | Sorgen Sie dafür, dass Kunden und Kontakte systemübergreifend zugeordnet werden können. In der Fertigung heißt das oft, CRM-Accounts und ERP-Kundennummern zusammenzubringen. Maschinen und Seriennummern der installierten Basis werden über das Datenmodell und saubere Schlüssel angebunden, nicht über die Identity Resolution für Kunden. |
| Datenklassifizierung | Legen Sie fest, welche Felder sensibel sind, etwa personenbezogene Daten, Preise, Vertragsbedingungen oder rechtliche Informationen. |
| Fachliche Definitionen | Einigen Sie sich, was zentrale Begriffe bedeuten und wer für jede Definition verantwortlich ist. „Aktiver Kunde“ bedeutet für Vertrieb, Service und Finanzen etwas anderes, solange niemand entscheidet. |
| Berechtigungen | Prüfen Sie Freigaberegeln und Feldberechtigungen, vor allem breite Zugriffe, die über Jahre gewachsen sind. |
| Datenqualität | Dubletten und veraltete Datensätze führen zu falschem Kontext, egal wie gut die Engine ist. |
| Führendes System und Aktualität | Legen Sie fest, welches System maßgeblich ist, wenn sich Preise, Verträge oder Anlagenstatus widersprechen, und wie aktuell jeder Teil des Kontexts sein muss. |
| Agentenidentität und gemeinsame Erinnerungen | Legen Sie fest, welche Agenten sich ausweisen, welche Agenten Erinnerungen zum selben Kunden teilen dürfen und wer Erinnerungen freigibt, bevor andere Agenten sie nutzen. |

Warum diese Grundlagen wichtiger sind als der Agent selbst, beschreibe ich in [Agentforce: Business Value und Datenqualität zuerst](/blog/agentforce-business-value-datenqualitaet/).

## Soll Data 360 zum Kern der KI-Architektur werden?

Die Agent Context Engine zeigt, wohin Salesforce steuert: Data 360 als gemeinsame Grundlage für Daten, Kontext und Governance, mit Agenten verschiedener Plattformen darüber. Ob das passt, ist eine Entscheidung und keine Selbstverständlichkeit. Für einen Architekten auf Kundenseite stellen sich die üblichen Fragen: Wie viel hängt an einem Hersteller, welche Daten müssen wirklich in Data 360, welche Kosten entstehen im großen Maßstab, wie lassen sich Erinnerungen und Definitionen bei einem Kurswechsel exportieren, und wer verantwortet Definitionen und Berechtigungen?

Das sind Entscheidungen des Kunden, nicht eines einzelnen Umsetzungspartners. Sie gehören in die Zielarchitektur, bevor der erste Agent produktiv geht. Das ist ein Kernteil meiner [Arbeit an Architektur und Governance](/leistungen/salesforce-architektur/).
