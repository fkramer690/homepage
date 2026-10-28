---
title: "Agentforce für Hersteller: jetzt starten oder warten?"
description: "Sollten Hersteller jetzt mit Agentforce starten? Fünf Kriterien von Prozessvolumen über ERP-Zugriff bis Edition, und wo Salesforce nicht die Antwort ist."
pubDate: 2026-10-27
lang: de
slug: agentforce-ja-oder-nein-hersteller
translationKey: agentforce-yes-or-no-manufacturers
topic: ai
categories: [ai, manufacturing-cloud]
tags: [Agentforce, KI-Agenten, Maschinenbau, Business Case, Flex Credits, ERP]
takeaways:
  - "Starten Sie jetzt mit Agentforce, wenn ein Prozess hohes Volumen, klare Regeln, saubere Anlagen- und Auftragsdaten und eine API zum ERP hat; fehlt eines davon, beheben Sie das zuerst."
  - "Eine Agentforce-Aktion kostet 20 Flex Credits, beim Listenpreis von 500 € je 100.000 Credits also 0,10 €; dieselbe Aktion in einer Sandbox kostet 16 Credits."
  - "Die Editionen Core, Advanced und Max enthalten 500.000, 1 Mio. und 2,75 Mio. Flex Credits pro Org und Jahr; reicht der Pool nicht, kaufen Sie Credits nach."
  - "Salesforce ist nicht die Antwort für Entscheidungen, die das ERP schon trifft, für die Fertigung selbst und für seltene Expertenfragen, bei denen das Volumen den Aufwand nie einspielt."
  - "Gartner erwartet, dass mehr als 40 Prozent der Projekte mit KI-Agenten bis Ende 2027 abgebrochen werden; ein vor dem Piloten vereinbarter Entscheidungstermin schützt das Budget."
faq:
  - q: "Lohnt sich Agentforce für einen mittelständischen Maschinenbauer?"
    a: "Ja, wenn ein Prozess Tausende ähnliche Anfragen pro Monat hat, die Daten dahinter gepflegt sind und das ERP über eine API erreichbar ist. Bei seltenen oder sehr technischen Fragen spielen Aufbau, Test und Pflege eines Agenten ihre Kosten selten ein."
  - q: "Was kostet Agentforce pro Aktion?"
    a: "Laut Salesforce Rate Card kostet eine Standard- oder Custom-Aktion in Produktion 20 Flex Credits, in einer Sandbox 16. Flex Credits kosten 500 € je 100.000, eine Aktion also 0,10 €. Prompts und Data-360-Verarbeitung kommen dazu."
  - q: "Brauche ich eine der neuen Salesforce-Editionen für Agentforce?"
    a: "Nein. Laut Salesforce bleiben die Preise für Bestandskunden auf bisherigen Editionen unverändert, und Flex Credits lassen sich separat kaufen. Die neuen Editionen bündeln Credits; das ändert die Rechnung bei der Vertragsverlängerung, nicht die technische Voraussetzung."
  - q: "Funktioniert Agentforce mit SAP oder proALPHA?"
    a: "Ja, wenn das ERP eine API anbietet. Salesforce dokumentiert einen Weg, bei dem eine MuleSoft-API in den API Catalog synchronisiert und zur Agenten-Aktion wird. Ohne API sind Dokumentenerkennung mit RPA oder der Systems Integration Agent Optionen, RPA bricht aber, wenn sich ERP-Masken ändern."
draft: false
---

Agentforce lohnt sich für Hersteller jetzt, wenn Sie einen Prozess mit hohem Volumen, klaren Regeln, sauberen Daten und einer API zum ERP haben. Händleranfragen zu Auftragsstatus, Lieferterminen und Ersatzteilverfügbarkeit sind der typische Kandidat. Sind die Daten hinter dem Prozess lückenhaft oder hat das ERP keine Schnittstelle, zeigt Ihnen ein Pilot vor allem diese Lücke, und Sie bezahlen für die Erkenntnis. Ich würde die ersten Monate lieber nutzen, um sie zu schließen. Für Entscheidungen, die schon in SAP oder proALPHA getroffen werden, ist Salesforce oft der falsche Ort für einen Agenten.

## Sollten Hersteller jetzt mit Agentforce starten?

Produktseitig ist Agentforce für enge Prozesse bereit. Salesforce hat Agentforce for Manufacturing im [August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) vorgestellt, mit Vorlagen für Absatzplanung, Bestandsmanagement und Anlagenservice sowie Field-Service-Funktionen für den Außendienst wie Terminbuchung und Einsatzberichte. Laut [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) kamen mit Summer '26 ein AI Warranty Concierge und ein AI Partner Sales Assistant dazu, Winter '27 bringt einen Warranty Claims Adjudication Agent.

Was bei Herstellern tatsächlich live ist, ist schmaler als das Angekündigte. Siemens, die sichtbarste Industriereferenz, hat [im September 2026 gemeldet](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx), dass zwei Agenten eingehende Leads für 18.000 Vertriebsmitarbeitende in 132 Ländern ansprechen und qualifizieren. Vorher kamen jeden Monat mehr als 2.500 unqualifizierte Leads an. Die SAP-Schritte im Lieferanten-Onboarding und die Anbindung von Teamcenter für den Service sind als Pläne beschrieben. Ich lese das als vernünftige Reihenfolge: dort anfangen, wo das Volumen hoch ist und eine falsche Antwort wenig kostet.

Offen ist also, ob Ihr erster Prozess bereit ist. Das entscheiden fünf Kriterien.

## Fünf Kriterien für die Entscheidung über Agentforce

### 1. Gibt es genug Volumen?

Ein Agent rechnet sich über Wiederholung. Ein Prozess mit einigen hundert Anfragen im Monat deckt die Kosten für Aufbau, Test und Pflege selten. Gute Kandidaten in der Fertigungsindustrie haben Tausende ähnliche Anfragen: Händlerfragen zu Aufträgen und Lieferterminen, Ersatzteilverfügbarkeit, Terminwünsche im Außendienst, einfache Garantiefragen. Zählen Sie Anfragen pro Monat und Minuten pro Anfrage, bevor jemand einen Prompt schreibt.

### 2. Tragen die Daten?

Ein Agent liest, was im System steht, und anders als eine erfahrene Servicemitarbeiterin weiß er nicht, welchen Feldern er misstrauen sollte. Für einen Maschinenbauer heißt das: installierte Basis mit Seriennummern, Garantiebeginn, Ersatzteilstammdaten und gepflegte Wissensartikel. Gartner [prognostiziert](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk), dass Unternehmen bis Ende 2026 60 Prozent der KI-Projekte ohne KI-taugliche Daten aufgeben. Warum ich die Daten vor allem anderen prüfe, steht in [Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

### 3. Kommt der Agent an das ERP?

In der Fertigung stehen die Antworten meist im ERP: Auftragsstatus, Bestand, Preise, Kreditlimits. Salesforce dokumentiert einen Weg, bei dem eine [MuleSoft-API in den API Catalog synchronisiert](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) wird, Named Credentials und External Services automatisch entstehen und der Agent die API als Aktion aufruft. Hat Ihr ERP keine API, bleiben Dokumentenerkennung mit RPA oder der Systems Integration Agent, den Salesforce [zur Dreamforce 2026 freigegeben](https://www.salesforce.com/blog/dreamforce-2026-announcements/) hat. RPA arbeitet über die Oberfläche und bricht, wenn sich Masken ändern, und dasselbe Risiko würde ich beim Systems Integration Agent testen, bevor ich mich darauf verlasse. Beide Wege beschreibe ich in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) und [altes ERP ohne API](../altes-erp-ohne-api-ki-agenten/).

### 4. Passt das Kostenmodell?

Agentforce wird pro Aktion abgerechnet. Die Sätze stehen in der [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/). Eine Sprachaktion kostet 30 Credits. Nicht genutzte Credits verfallen zum Ende der Bestellung.

```kennzahlen
20 | Flex Credits pro Standard- oder Custom-Aktion in Produktion
16 | Flex Credits pro Aktion in einer Sandbox
0,10 € | pro Aktion zum Listenpreis
quelle: Salesforce Flex Credits Rate Card (Stand 31.08.2026) und Agentforce-Preisseite
```

```hinweis offen
Der Satz für Headless Platform Interactions, den Zähler für agentische API- und MCP-Aufrufe, steht in der Rate Card noch als „TBA“.
```

Data 360 berechnet außerdem 150 Credits pro MB für unstrukturierte Dokumente wie Handbücher und Ersatzteilkataloge. Wie Sie das pro Aktion schätzen, beschreibe ich in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

### 5. Auf welcher Edition sind Sie?

Am 3. September 2026 hat Salesforce die [Editionen Core, Advanced und Max](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) angekündigt, zu 195 €, 395 € und 550 € pro Nutzer und Monat, mit 500.000, 1 Mio. und 2,75 Mio. enthaltenen Flex Credits. Die Meldung selbst nennt keine Laufzeit, die [Preisseite der Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) gibt die Pools aber pro Org und Jahr an. Ein Pool für die ganze Org ist schnell verbraucht, wenn mehrere Agenten daraus schöpfen. Für Bestandskunden auf bisherigen Editionen bleiben die Preise unverändert. Neue Preise für die Industries-Editionen sind für „later this fall“ angekündigt. Für Hersteller nennt die Seite der Manufacturing Cloud die volle Agentforce-for-Industries-Ausstattung schon jetzt nur in den Max-Editionen, zu 650 € oder 700 € pro Nutzer und Monat. Mitten in der Vertragslaufzeit lautet die praktische Frage: jetzt Credits für einen Prozess kaufen oder bei der Verlängerung die Edition wechseln? Das betrachte ich in [die Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/).

## Ein typisches Szenario: drei Kandidaten bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit SAP, Sales Cloud und Service Cloud, einem Händlernetz und einem Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Die IT sammelt drei Ideen für einen ersten Agenten.

**Händleranfragen zu Auftragsstatus und Lieferterminen.** Angenommen sind 1.500 Anfragen im Monat mit je drei Aktionen: Auftrag aus SAP lesen, Liefertermin lesen, Zusammenfassung schreiben. Das sind 4.500 Aktionen zu 20 Credits, also 90.000 Credits oder rund 450 € im Monat, ohne Prompts und Tests. Im Modell mit 2 € pro Gespräch, das Salesforce 2025 genannt hat, kostet dasselbe Volumen 3.000 €. Eine MuleSoft-API zu SAP gibt es schon. Dieser Kandidat ist bereit. Die vollständige Rechnung steht in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/).

**Garantie-Vorprüfung für Händleranträge.** Angenommen sind 200 Anträge im Monat. Die Regeln sind klar, aber bei einem Drittel der Maschinen in der installierten Basis fehlt in Salesforce der Garantiebeginn. Der Agent würde auf Lücken entscheiden. Dieser Kandidat wartet, bis die Anlagendaten vollständig sind, und die Prüfregeln gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

**Fehlersuche bei Sondermaschinen.** Angenommen sind 40 Fälle im Monat, jeder anders, das Wissen steckt in den Köpfen von vier erfahrenen Servicetechnikern. Das Volumen ist gering, das Risiko einer falschen Antwort hoch, und es gibt kaum schriftliche Artikel, auf die sich ein Agent stützen könnte. Das bleibt vorerst bei den Technikern.

Einer von drei ist bereit. Nach meiner Einschätzung ist das ein normales Verhältnis, und ein solider Start ist mehr wert als drei parallele Piloten.

## Wo ist Salesforce nicht die Antwort?

Zu einer ehrlichen Entscheidung gehört, zu benennen, wo ein Agent in Salesforce nichts verloren hat:

- **Entscheidungen, die das ERP schon trifft.** Verfügbarkeitsprüfung, Kreditlimits, Preiskonditionen und Produktionsplanung liegen in SAP oder proALPHA. Ein Agent in Salesforce darf fragen und erklären, aber nicht nachrechnen. Zwei Orte mit derselben Regel laufen innerhalb eines Jahres auseinander.
- **Die Fertigung selbst.** Maschinendaten, MES und Fertigungsaufträge haben eigene Systeme. Salesforce kommt ins Spiel, wenn eine Maschine Service braucht, nicht während sie läuft.
- **Seltene Expertenfragen.** Wenig Volumen und hohes Risiko bedeuten, dass sich Aufbau und Tests nie rechnen.
- **Routinearbeit ohne Sprache.** Hat ein Prozess keinen Freitext und keinen Dialog, erledigt ein Flow oder ein ERP-Job ihn günstiger. Auch Gartner empfiehlt [Automatisierung für Routineabläufe](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) und Agenten für Entscheidungen.
- **Nutzer außerhalb von Salesforce.** Arbeitet Ihr Service den ganzen Tag in SAP und Teams, rechnet es sich selten, Salesforce-Lizenzen nur für einen Agenten zu kaufen.

Diese Fragen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/), denn manchmal ist der günstigste Agent der, den Sie nicht in Salesforce bauen.

## Wie starten Sie ohne einen Piloten, der im Sand verläuft?

Gartner [erwartet](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), dass mehr als 40 Prozent der Projekte mit KI-Agenten bis Ende 2027 abgebrochen werden, wegen steigender Kosten, unklarem Nutzen und unzureichender Risikokontrollen. Diese Schritte setzen an allen drei Punkten an:

```schritte
Prozess wählen
  Einen Prozess, der die fünf Kriterien besteht, und eine Zielzahl, etwa den Anteil der Händleranfragen, die ohne Servicemitarbeitende beantwortet werden.
Ist-Zustand messen
  Volumen, Bearbeitungszeit, Fehlerquote.
Vertrag prüfen
  Edition, enthaltene Flex Credits pro Org und Jahr, wie viele davon schon andere Agenten verbrauchen und wann die Bestellung endet.
Volle Kosten budgetieren
  Aktionen in Produktion, Sandbox-Tests mit 16 Credits pro Aktion, Prompts, Data 360 für Dokumente und die Integrationsarbeit.
Regeln in Logik gießen
  Dem Modell nur Sprache und Absicht überlassen.
Entscheidungstermin vereinbaren
  Bevor der Pilot startet, zum Beispiel nach acht Wochen gegen die Zielzahl.
```

Starten Sie mit Agentforce dort, wo Volumen, Daten und ERP-Zugriff stimmen, und nutzen Sie die Zeit anderswo, um dorthin zu kommen. Wenn Sie eine zweite Meinung möchten, welcher Ihrer Prozesse bereit ist, [schreiben Sie mir](#contact).
