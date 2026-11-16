---
title: "Agentforce für Hersteller: jetzt starten oder warten?"
description: "Sollten Hersteller jetzt mit Agentforce starten? Fünf Kriterien vom Prozessvolumen über ERP-Zugriff bis zur Edition, und wo Salesforce nicht die Antwort ist."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-ja-oder-nein-hersteller
translationKey: agentforce-yes-or-no-manufacturers
topic: ai
categories: [ai, manufacturing-cloud]
tags: [Agentforce, KI-Agenten, Maschinenbau, Business Case, Flex Credits, ERP]
takeaways:
  - "Wenn Volumen, klare Regeln, saubere Anlagen- und Auftragsdaten oder die ERP-API fehlen, schaffen Sie diese Voraussetzungen vor dem ersten Agenten."
  - "Eine Agentforce-Aktion kostet 20 Flex Credits, beim Listenpreis von 500 € je 100.000 Credits also 0,10 €; dieselbe Aktion in einer Sandbox kostet 16 Credits."
  - "Core, Advanced und Max enthalten 500.000, 1 Mio. und 2,75 Mio. Flex Credits pro Org und Jahr; Verbrauch darüber wird zum Vertragssatz abgerechnet."
  - "Entscheidungen, die das ERP schon trifft, die Fertigung selbst und seltene Expertenfragen gehören nicht in einen Agenten in Salesforce."
  - "Gartner erwartet, dass bis Ende 2027 mehr als 40 Prozent der KI-Agentenprojekte abgebrochen werden. Ein fester Entscheidungstermin schützt das Budget."
faq:
  - q: "Lohnt sich Agentforce für einen mittelständischen Maschinenbauer?"
    a: "Ja, wenn ein Prozess Tausende ähnliche Anfragen pro Monat hat, die Daten dahinter gepflegt sind und das ERP über eine API erreichbar ist. Bei seltenen oder sehr technischen Fragen amortisieren sich Aufbau, Test und Pflege eines Agenten selten."
  - q: "Was kostet Agentforce pro Aktion?"
    a: "Laut Salesforce Rate Card kostet eine Standard- oder Custom-Aktion in Produktion 20 Flex Credits, in einer Sandbox 16. Flex Credits kosten 500 € je 100.000, eine Aktion also 0,10 €. Prompts und Data-360-Verarbeitung kommen hinzu."
  - q: "Brauche ich eine der neuen Salesforce-Editionen für Agentforce?"
    a: "Nein. Laut Salesforce bleiben die Preise für Bestandskunden mit bisherigen Editionen unverändert, und Flex Credits lassen sich separat kaufen. Die neuen Editionen bündeln Credits; das ändert die Rechnung bei der Vertragsverlängerung. Credits decken nur den Verbrauch ab: Welches Add-on ein Agent braucht, etwa Agentforce for Manufacturing, hängt vom Agententyp ab."
  - q: "Funktioniert Agentforce mit SAP oder proALPHA?"
    a: "Ja, wenn das ERP eine API anbietet. Salesforce dokumentiert einen Weg, bei dem eine MuleSoft-API in den API Catalog synchronisiert und als Grundlage für eine Agenten-Aktion genutzt wird. Ohne API können RPA oder der Systems Integration Agent über die ERP-Masken arbeiten, Automatisierung über die Oberfläche reagiert aber empfindlicher auf Maskenänderungen als eine API."
video:
  file: agentforce-ja-oder-nein-hersteller
  title: "Die drei Fragen in 52 Sekunden"
  duration: 52
  uploadDate: 2026-10-30
  transcript: "Lohnt sich Agentforce für Hersteller schon jetzt? Das entscheiden drei Fragen. Erstens: Gibt es genug Volumen? Ein Agent rechnet sich erst bei Tausenden ähnlichen Anfragen im Monat, zum Beispiel Händlerfragen zum Liefertermin. Zweitens: Sind die Daten sauber? Der Agent glaubt jedem Feld. Fehlt der Garantiebeginn, entscheidet er auf Lücken. Drittens: Kommt der Agent an das ERP-System? Auftragsstatus, Bestand und Preise stehen in SAP oder proALPHA. Ohne Schnittstelle kommt er nicht dran. Und was kostet das? Eine Aktion kostet 20 Flex Credits. Zum Listenpreis sind das rund 10 Cent. Sind alle drei Punkte erfüllt, dann starten Sie jetzt. Sonst schließen Sie zuerst die Lücken. Den ganzen Artikel finden Sie über den Link in der Beschreibung."
draft: false
---

Agentforce lohnt sich für Hersteller jetzt, wenn Sie einen Prozess mit hohem Volumen, klaren Regeln, sauberen Daten und einer API zum ERP haben. Händleranfragen zu Auftragsstatus, Lieferterminen und Ersatzteilverfügbarkeit sind der typische Kandidat. Sind die Daten für den Prozess lückenhaft oder hat das ERP keine Schnittstelle, macht ein Pilot vor allem diese Schwachstellen sichtbar, und Sie bezahlen für diese Erkenntnis. Ich würde die ersten Monate lieber nutzen, um sie zu schließen. Für Entscheidungen, die schon in SAP oder proALPHA getroffen werden, ist Salesforce oft der falsche Ort für einen Agenten.

## Sollten Hersteller jetzt mit Agentforce starten?

Produktseitig ist Agentforce für klar abgegrenzte Prozesse bereit. Salesforce hat Agentforce for Manufacturing im [August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) vorgestellt, mit Vorlagen für Absatzplanung, Bestandsmanagement und Anlagenservice sowie Field-Service-Funktionen für den Außendienst wie Terminbuchung und Einsatzberichte. Laut [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) wurden mit Summer '26 ein AI Warranty Concierge und ein AI Partner Sales Assistant ergänzt, Winter '27 bringt einen Warranty Claims Adjudication Agent.

Was bei Herstellern tatsächlich im produktiven Einsatz ist, ist enger begrenzt als das Angekündigte. Siemens, die sichtbarste Industriereferenz, hat [im September 2026 gemeldet](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx), dass zwei Agenten eingehende Leads für 18.000 Vertriebsmitarbeitende in 132 Ländern ansprechen und qualifizieren. Vorher gingen jeden Monat mehr als 2.500 unqualifizierte Leads ein. Die SAP-Schritte im Lieferanten-Onboarding und die Anbindung von Teamcenter für den Service werden als geplante Schritte beschrieben. Ich lese das als vernünftige Reihenfolge: dort anfangen, wo das Volumen hoch ist und eine falsche Antwort wenig kostet.

Offen ist also, ob Ihr erster Prozess bereit ist. Das entscheiden fünf Kriterien.

```ring
titel: Was vor dem ersten Agenten stehen muss
mitte: Agentforce | bereit?
- message | Volumen | Genug Wiederholung | Tausende ähnliche Anfragen; Anfragen und Minuten gezählt; Kosten für Aufbau gedeckt
- search | Daten | Belastbare Stammdaten | Installierte Basis mit Seriennummer; Ersatzteilstammdaten; Gepflegte Wissensartikel
- integration | ERP | Zugriff per API | Auftragsstatus, Bestand, Preise; API als Aktion des Agenten; RPA nur als Notlösung
- budget | Kosten | Abrechnung pro Aktion | Flex Credits je Aktion; Verfall nicht genutzter Credits; Dokumente kosten extra
- license | Edition | Credits im Vertrag | Core, Advanced oder Max; Pool pro Org und Jahr; Wechsel bei der Verlängerung
```

## Die Kriterien für die Entscheidung über Agentforce

### 1. Gibt es genug Volumen?

Ein Agent rechnet sich über Wiederholung. Ein Prozess mit einigen hundert Anfragen im Monat deckt die Kosten für Aufbau, Test und Pflege selten. Bei guten Kandidaten in der Fertigungsindustrie fallen Tausende ähnliche Anfragen an: Händlerfragen zu Aufträgen und Lieferterminen, Ersatzteilverfügbarkeit, Terminwünsche im Außendienst, einfache Garantiefragen. Zählen Sie Anfragen pro Monat und Minuten pro Anfrage, bevor jemand einen Prompt schreibt.

### 2. Sind die Daten belastbar?

Ein Agent liest, was im System steht, und anders als eine erfahrene Servicemitarbeiterin weiß er nicht, welchen Feldern er misstrauen sollte. Für einen Maschinenbauer heißt das: installierte Basis mit Seriennummern, Garantiebeginn, Ersatzteilstammdaten und gepflegte Wissensartikel. Gartner [prognostiziert](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk), dass Unternehmen bis Ende 2026 60 Prozent der KI-Projekte ohne KI-taugliche Daten aufgeben. Warum ich die Daten vor allem anderen prüfe, steht in [Business Value und Datenqualität zuerst](/blog/agentforce-business-value-datenqualitaet/).

### 3. Kommt der Agent an das ERP?

In der Fertigung stehen die Antworten meist im ERP: Auftragsstatus, Bestand, Preise, Kreditlimits. Salesforce dokumentiert einen Weg, bei dem eine [MuleSoft-API in den API Catalog synchronisiert](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) wird, Named Credentials und External Services automatisch angelegt werden und der Agent die API als Aktion aufruft. Hat Ihr ERP keine API, bleiben RPA oder der Systems Integration Agent, den Salesforce [zur Dreamforce 2026 freigegeben](https://www.salesforce.com/blog/dreamforce-2026-announcements/) hat. Beide arbeiten über die Oberfläche. Laut Salesforce lernt der Agent geänderte Masken erneut; genau das würde ich testen, bevor ich mich darauf verlasse, denn Automatisierung über die Oberfläche reagiert empfindlicher auf Maskenänderungen als eine API. Die API bleibt mein bevorzugter Weg, weil sie sich leichter testen und prüfen lässt. Beide Wege beschreibe ich in [Agentforce und SAP-Auftragsstatus](/blog/agentforce-sap-auftragsstatus/) und [altes ERP ohne API](/blog/altes-erp-ohne-api-ki-agenten/).

### 4. Passt das Kostenmodell?

Im Flex-Credits-Modell wird Agentforce pro Aktion abgerechnet. Die Sätze stehen in der [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf), Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/). Eine Sprachaktion kostet 30 Credits. Nicht genutzte Credits verfallen zum Ende der Bestellung. Verbrauch, der über die gekauften Credits hinausgeht, rechnet Salesforce laut Preisseite monatlich zum Vertragssatz ab. Das ältere Modell pro Gespräch kann auf Org-Ebene als Alternative gewählt werden: Salesforce unterstützt Flex Credits und Gesprächsabrechnung nicht für dieselbe Org.

```kennzahlen
20 | Flex Credits pro Standard- oder Custom-Aktion in Produktion
16 | Flex Credits pro Aktion in einer Sandbox
0,10 € | pro Aktion zum Listenpreis
quelle: Salesforce Flex Credits Rate Card (Stand 03.11.2026) und Agentforce-Preisseite
```

```hinweis offen
Der Satz für Headless Platform Interactions, die Messgröße für agentische API- und MCP-Aufrufe, steht in der Rate Card noch als „TBA“.
```

Für die Verarbeitung unstrukturierter Dokumente wie Handbücher und Ersatzteilkataloge berechnet Data 360 außerdem 150 Credits pro verarbeitetem MB in der Grundstufe, weniger bei höherem Monatsvolumen und 120 in einer Sandbox. Wie Sie das pro Aktion schätzen, beschreibe ich in [Flex Credits: Agentforce-Kosten pro Aktion](/blog/flex-credits-agentforce-kosten-pro-aktion/).

### 5. Auf welcher Edition sind Sie?

Am 3. September 2026 hat Salesforce die [Editionen Core, Advanced und Max](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) angekündigt: 195 €, 395 € und 550 € pro Nutzer und Monat, mit 500.000, 1 Mio. und 2,75 Mio. enthaltenen Flex Credits. Die Meldung selbst nennt keine Laufzeit, die [Preisseite der Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) gibt die Pools aber pro Org und Jahr an. Ein Pool für die ganze Org ist schnell verbraucht, wenn mehrere Agenten daraus schöpfen. Für Bestandskunden mit bisherigen Editionen bleiben die Preise unverändert. Die Manufacturing Cloud hat eine eigene Preisliste: Die [Preisseite](https://www.salesforce.com/eu/manufacturing/cloud/pricing/) zeigt Core für 275 € mit 500.000 Credits und Max für 650 € oder 700 € mit 2,75 Mio. Credits, ohne Advanced-Stufe, und nennt die volle Agentforce-for-Industries-Ausstattung nur in Max. Mitten in der Vertragslaufzeit lautet die praktische Frage: jetzt Credits für einen Prozess kaufen oder bei der Verlängerung die Edition wechseln? Das betrachte ich in [die Editionen Core, Advanced und Max](/blog/salesforce-editionen-core-advanced-max/).

## Rechenbeispiel: drei Kandidaten bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit SAP, Sales Cloud und Service Cloud, einem Händlernetz und einem Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Die IT sammelt drei Ideen für einen ersten Agenten.

**Händleranfragen zu Auftragsstatus und Lieferterminen.** Angenommen sind 1.500 Anfragen im Monat mit je drei abrechenbaren Aktionen, etwa Händlerdaten prüfen, Auftrag aus SAP lesen, Liefertermin lesen. Wie viele Aktionen eine Anfrage wirklich auslöst, zeigt der Trace in der Sandbox. Das sind 4.500 Aktionen zu 20 Credits, also 90.000 Credits oder rund 450 € im Monat, ohne Prompts und Tests. Im Modell mit 2 € pro Gespräch, das Salesforce 2025 genannt hat, kostet dasselbe Volumen 3.000 €; allerdings wird dieses Modell pro Org gewählt, nicht pro Agent. Eine MuleSoft-API zu SAP ist bereits vorhanden. Dieser Kandidat ist bereit. Die vollständige Rechnung steht in [was ein Serviceagent für Händleranfragen kostet](/blog/flex-credits-agentforce-kosten-pro-aktion/).

**Garantie-Vorprüfung für Händleranträge.** Angenommen, es gibt 200 Anträge im Monat. Die Regeln sind klar, aber bei einem Drittel der Maschinen in der installierten Basis fehlt in Salesforce der Garantiebeginn. Der Agent würde auf Basis unvollständiger Daten entscheiden. Dieser Kandidat sollte warten, bis die Anlagendaten vollständig sind; die Prüfregeln gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](/blog/agent-script-regeln-statt-llm/) beschrieben.

**Fehlersuche bei Sondermaschinen.** Angenommen, es gibt 40 Fälle im Monat, jeder ist anders, und das Wissen steckt in den Köpfen von vier erfahrenen Servicetechnikern. Das Volumen ist gering, das Risiko einer falschen Antwort hoch, und es gibt kaum schriftliche Artikel, auf die sich ein Agent stützen könnte. Diese Aufgabe bleibt vorerst bei den Technikern.

Einer der drei Kandidaten ist bereit. Nach meiner Einschätzung ist das ein normales Verhältnis, und ein solider Start ist mehr wert als drei parallele Piloten. Wo ein Agent bei Maschinenbauern neben Field Service, Ersatzteilen und Händlerportal ansetzt, zeigt die Seite [Salesforce im Maschinen- und Anlagenbau](/salesforce-maschinenbau/).

## Wo Salesforce nicht die Antwort ist

Zu einer ehrlichen Entscheidung gehört, zu benennen, wo ein Agent in Salesforce nicht sinnvoll ist:

- **Entscheidungen, die das ERP schon trifft.** Verfügbarkeitsprüfung, Kreditlimits, Preiskonditionen und Produktionsplanung liegen in SAP oder proALPHA. Ein Agent in Salesforce darf fragen und erklären, aber nicht nachrechnen. Zwei Orte mit derselben Regel weichen innerhalb eines Jahres voneinander ab.
- **Die Fertigung selbst.** Maschinendaten, MES und Fertigungsaufträge haben eigene Systeme. Salesforce wird relevant, wenn eine Maschine Service braucht, nicht während sie läuft.
- **Seltene Expertenfragen.** Wenig Volumen und hohes Risiko bedeuten, dass sich Aufbau und Tests nie rechnen.
- **Routinearbeit ohne Sprache.** Hat ein Prozess keinen Freitext und keinen Dialog, bildet ein Flow oder ein ERP-Job ihn günstiger ab. Auch Gartner empfiehlt [Automatisierung für Routineabläufe](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) und Agenten für Entscheidungen.
- **Nutzer außerhalb von Salesforce.** Arbeitet Ihr Serviceteam den ganzen Tag in SAP und Teams, prüfen Sie, welchen Zugriff der Agent dort wirklich braucht: Die [Agentforce User License](https://www.salesforce.com/agentforce/pricing/) für 5 US-Dollar pro Nutzer und Monat plus Flex Credits ist günstiger als eine volle Lizenz, aber jedes CRM-Objekt, das der Agent liest, muss trotzdem in Salesforce gepflegt sein.

Diese Fragen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](/leistungen/make-or-buy-lizenzen/), denn manchmal ist der günstigste Agent der, den Sie nicht in Salesforce umsetzen.

## Einen Prozess und eine Zielzahl wählen

Gartner [erwartet](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), dass mehr als 40 Prozent der Projekte mit KI-Agenten bis Ende 2027 abgebrochen werden, wegen steigender Kosten, unklarem Nutzen und unzureichender Risikokontrollen. Diese Schritte setzen an allen drei Punkten an:

```schritte
Prozess wählen
  Einen Prozess, der alle Kriterien oben besteht, und eine Zielzahl, etwa den Anteil der Händleranfragen, die ohne Servicemitarbeitende beantwortet werden.
Ist-Zustand messen
  Volumen, Bearbeitungszeit, Fehlerquote.
Vertrag prüfen
  Edition, enthaltene Flex Credits pro Org und Jahr, wie viele davon schon andere Agenten verbrauchen und wann die Bestellung endet.
Volle Kosten budgetieren
  Aktionen in Produktion, Sandbox-Tests mit 16 Credits pro Aktion, Prompts, Data 360 für Dokumente, nötige Add-ons und Nutzerlizenzen, die Integrationsarbeit und der Test- und Überwachungsaufwand im Betrieb.
Regeln in Logik gießen
  Dem Modell nur Sprache und Absicht überlassen.
Entscheidungstermin vereinbaren
  Bevor der Pilot startet, zum Beispiel nach acht Wochen gegen die Zielzahl.
```
