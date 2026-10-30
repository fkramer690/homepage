---
title: "Altes ERP ohne API: Helfen KI-Agenten trotzdem?"
description: "Altes ERP oder MES ohne Schnittstelle: drei Wege, wie ein Agentforce-Agent trotzdem Daten liest und schreibt, was sie kosten und wo sie brechen."
pubDate: 2026-10-27
lang: de
slug: altes-erp-ohne-api-ki-agenten
translationKey: legacy-erp-without-api-agents
topic: data
categories: [ai, architecture]
tags: [Agentforce, ERP, Altsysteme, RPA, MuleSoft, Maschinenbau]
takeaways:
  - "Ein Agent kann über drei Umwege mit einem ERP ohne API arbeiten: eine lesende Datenbankreplik hinter einer kleinen API, Dokumentenerkennung mit RPA oder den Systems Integration Agent."
  - "Für Auftragsstatus, Liefertermine und Bestand ist eine Replik hinter einer MuleSoft-API der stabilste Weg, und die Agenten-Aktion bleibt gleich, wenn das ERP später abgelöst wird."
  - "MuleSoft IDP schickt Dokumente unter einer Konfidenzschwelle zur manuellen Prüfung; das Beispiel im Salesforce Admins Blog nutzt 80 Prozent, und jede erneute Verarbeitung wird voll berechnet."
  - "RPA und der Systems Integration Agent arbeiten über die Masken; laut Salesforce lernt der Agent eine geänderte Maske in etwa 20 Minuten neu, das braucht trotzdem Monitoring und einen Verantwortlichen."
  - "Preise, Kreditlimits und Verfügbarkeitsprüfung bleiben im ERP; ein Agent an einem alten ERP darf unter menschlicher Kontrolle Daten erfassen, aber nicht entscheiden."
faq:
  - q: "Kann Agentforce an ein ERP ohne API angebunden werden?"
    a: "Ja, über einen Umweg. Lesen geht über eine Datenbankreplik hinter einer MuleSoft-API, Belege lassen sich mit MuleSoft IDP und RPA erfassen, und der Systems Integration Agent bedient browserbasierte Anwendungen über ihre Masken."
  - q: "Bietet proALPHA eine API für Salesforce?"
    a: "Das hängt von Release, Modulen und Setup Ihrer Installation ab. Fragen Sie Ihren ERP-Hersteller oder Partner, welche Schnittstellen Ihre Version bietet und ob sie lizenziert sind, bevor Sie einen Umweg planen."
  - q: "Was ist der Systems Integration Agent?"
    a: "Er gehört zu Agentforce Operations. Laut Salesforce lernt er browserbasierte Anwendungen, auch Altsysteme ohne API, und führt einen Prozess jedes Mal gleich aus, mit Audit Trail. Agentforce Operations wird nach Blueprint-Paketen abgerechnet, nicht nach Verbrauch."
  - q: "Ist RPA für die Auftragserfassung im ERP zuverlässig genug?"
    a: "Bei stabilen Masken, genug Volumen und manueller Prüfung unsicherer Belege ja. Ändern sich die Masken, steht der Bot. Sie brauchen Monitoring, einen Rückfall auf manuelle Erfassung und jemanden, dem der Bot gehört."
  - q: "Umweg bauen oder auf das neue ERP warten?"
    a: "Geht das neue ERP in etwa einem Jahr live, würde ich meist warten und die Zeit für Datenbereinigung nutzen. Liegt die Migration weiter weg, lohnt der lesende Zugriff hinter einem API-Vertrag, der die Migration übersteht."
draft: false
---

KI-Agenten helfen auch bei einem alten ERP ohne API, aber nur über einen Umweg, und jeder Umweg hat seinen Preis. Zum Lesen von Auftragsstatus, Bestand oder Lieferterminen würde ich eine lesende Datenbankreplik hinter eine kleine API stellen und dem Agenten diese geben. Für die Auftragserfassung können Dokumentenerkennung mit RPA oder der Systems Integration Agent von Salesforce die ERP-Masken bedienen. Beide brechen leichter als eine API und brauchen Monitoring und einen Verantwortlichen. Entscheidungen wie Kreditlimit und Preis bleiben in jeder Variante im ERP.

## Warum haben so viele Hersteller ein ERP ohne nutzbare API?

Viele Maschinenbauer im Mittelstand betreiben ein ERP, das seit Jahren im eigenen Rechenzentrum läuft und unterwegs stark angepasst wurde. Eine ältere proALPHA-Installation oder ein altes SAP-Release sind typische Beispiele. Ob ein solches System eine nutzbare Schnittstelle bietet, hängt von Version, lizenzierten Modulen und dem Umfang der Anpassungen ab; eine pauschale Aussage über einen Hersteller treffe ich deshalb nicht. Der erste Schritt ist eine Frage an Ihren ERP-Hersteller oder Partner.

„Keine API“ heißt oft: Eine Schnittstelle gibt es, sie ist aber nicht lizenziert oder deckt Kunden und Artikel ab, Aufträge aber nicht. Die Prüfung kostet ein bis zwei Tage. Ein Umweg kostet Pflege, solange er läuft.

Dasselbe gilt für MES und andere Systeme in der Fertigung, die oft nur einen Desktop-Client und eine Datenbank haben. Für einen Serviceagenten zählen sie trotzdem, denn dort liegen Seriennummern, Baukonfigurationen und Prüfzeugnisse.

Es gibt also drei Fälle. Gibt es eine API, gilt der Standardweg, den ich in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschreibe. Kommt man an die Daten, aber gibt es keine API, bauen Sie eine Leseschicht. Bleibt nur die Maske, automatisieren Sie die Maske.

## Welche Wege führen an ein ERP ohne API?

### Weg 1: Lesen aus einer Replik hinter einer eigenen API

Die meisten älteren ERP-Systeme halten ihre Daten in einer relationalen Datenbank. Der [Database Connector](https://docs.mulesoft.com/db-connector/latest/) von MuleSoft verbindet sich laut Dokumentation mit fast jeder relationalen JDBC-Datenbank, mit fertigen Verbindungen für Oracle, Microsoft SQL Server, MySQL und Derby und einer generischen JDBC-Konfiguration für den Rest. Darauf bauen Sie eine kleine Lese-API: Auftragsstatus, Liefertermin, Bestand je Werk, Maschine nach Seriennummer. In den API Catalog synchronisiert, wird sie zu einer Agenten-Aktion wie jede andere API.

Zwei Regeln gelten. Gelesen wird aus einer Replik oder einem regelmäßigen Export, nie aus der Produktivdatenbank, damit ein fleißiger Agent nicht die Auftragsabwicklung ausbremst. Und geschrieben wird nie direkt in ERP-Tabellen. Das umgeht Buchungslogik, Nummernkreise und jede Prüfung des ERP, und das würde ich nicht freigeben.

Der eigentliche Nutzen liegt in der Architektur. Der API-Vertrag, etwa „Auftragsstatus nach Auftragsnummer“, übersteht die Ablösung des alten ERP. Nur das Backend dahinter wechselt; Agent, Tests und Berechtigungen bleiben.

### Weg 2: Dokumentenerkennung plus RPA zum Schreiben

Salesforce beschreibt genau diesen Fall im [Salesforce Admins Blog](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce) vom August 2025, am Beispiel eines fiktiven Lieferanten mit eingescannten PDF-Bestellungen und einem ERP ohne API. MuleSoft Intelligent Document Processing (IDP) liest Auftragsnummer, Positionen, Nettowert und Steuer aus und schickt Belege mit einer Konfidenz unter 80 Prozent in die manuelle Prüfung. Ein MuleSoft-RPA-Bot überwacht einen freigegebenen Ordner und simuliert im ERP Mausklicks und Tastatureingaben. Zwei autolaunched Flows starten ihn und fragen seinen Status über eine Ausführungs-ID ab, und über das Agentforce-Topic „Order Upload“ starten Anwender den Upload im Chat und fragen nach dem Stand.

```ablauf
sf: Topic Order Upload, Autolaunched Flow
ext: MuleSoft IDP, Manuelle Prüfung, RPA-Bot
erp: ERP-Maske
Topic Order Upload --> Autolaunched Flow
Autolaunched Flow --startet--> RPA-Bot
MuleSoft IDP --ab 80 Prozent--> RPA-Bot
MuleSoft IDP ..unter 80 Prozent..> Manuelle Prüfung
RPA-Bot --erfasst Auftrag--> ERP-Maske
RPA-Bot ..Status..> Autolaunched Flow
```

Für einen Hersteller liegen Ersatzteilbestellungen von Händlern und Auftragsbestätigungen von Lieferanten als PDF nahe. Zwei Kostenpunkte gehören in den Plan. Laut [IDP-Dokumentation](https://docs.mulesoft.com/idp/) berechnet IDP Automation Credits pro Ausführung nach Seitenzahl, und jede erneute Einreichung oder Verarbeitung kostet voll, ohne Dublettenerkennung. Und [RPA-Bots](https://docs.mulesoft.com/rpa-bot/1.6/) brauchen einen Rechner, auf dem die Zielanwendungen installiert sind; jemand betreibt und patcht diese Maschinen.

Ein Detail dieses Musters gefällt mir: Der Agent entscheidet nichts. Er ist ein Chat-Zugang zu einem deterministischen Ablauf.

### Weg 3: der Systems Integration Agent

Zur Dreamforce 2026 hat Salesforce den Systems Integration Agent als Teil von Agentforce Operations vorgestellt, im selben Abschnitt wie den Back-Office-Agenten Marshall, gekennzeichnet als [GA](https://www.salesforce.com/blog/dreamforce-2026-announcements/). Laut [Produktblog](https://www.salesforce.com/blog/regrello/) lernt er eine browserbasierte Anwendung wie ein neuer Mitarbeiter in etwa 90 Minuten, ohne Code, APIs oder RPA, auch „customized SAP, Oracle, and homegrown systems“. Ändert sich eine Maske, lernt er diesen Teil laut Salesforce typischerweise in etwa 20 Minuten neu und protokolliert die Reparatur zur Prüfung durch einen Administrator. Die [Seite zu Agentforce Operations](https://www.salesforce.com/agentforce/operations/) nennt zusätzlich Audit Trail und erhaltene Berechtigungen und Freigaben und sagt, abgerechnet werde nach Blueprint-Paketen, vom Starter Pack mit 5 Blueprints bis Large mit mehr als 50, „not priced based on consumption“. Listenpreise habe ich keine gefunden.

Der Haken für Hersteller ist das Wort „browserbasiert“. Läuft Ihr ERP oder MES als Desktop-Client, prüfen Sie, ob es einen Web-Client gibt, bevor jemand mit diesem Agenten plant. Das sind Herstellerangaben aus dem Startmonat. Ich würde sie an Ihren eigenen Masken testen, inklusive eines ERP-Updates im Testsystem, bevor ich mich darauf verlasse.

```hinweis offen
Der Produktblog nennt GA ausdrücklich nur für Marshall. Klären Sie die Verfügbarkeit des Systems Integration Agent für Ihre Org mit Ihrem Account-Team.
```

## Ein typisches Szenario: Ersatzteilaufträge bei einem Maschinenbauer mit altem ERP

Nehmen wir einen Maschinenbauer mit einem ERP im eigenen Rechenzentrum ohne nutzbare Schnittstelle, Service Cloud und einem Händlerportal auf Salesforce sowie 40 Händlern. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Statusanfragen.** Angenommen sind 2.000 Händleranfragen im Monat zu Ersatzteilaufträgen. Eine Replik der relevanten ERP-Tabellen wird alle 15 Minuten aktualisiert, eine kleine MuleSoft-API bietet zwei Operationen: Auftragsstatus und Liefertermin. Bei zwei Aktionen pro Anfrage sind das 4.000 Aktionen zu 20 Flex Credits, also 80.000 Credits oder rund 400 € im Monat zum [Listenpreis von 500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/), ohne Prompts, Tests und MuleSoft. Der Agent nennt immer den Datenstand, „Stand 10:15 Uhr“. Wie Sie den Rest schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

**Auftragserfassung.** Angenommen sind 600 Ersatzteilbestellungen im Monat als PDF per E-Mail, im Schnitt zwei Seiten, die eine Kollegin im Innendienst heute in etwa sechs Minuten pro Stück abtippt, rund 60 Stunden im Monat. Mit IDP und RPA sind das 1.200 Seiten im Monat in Automation Credits, bepreist in Ihrem MuleSoft-Vertrag. Fallen 15 Prozent unter die Schwelle, landen weiterhin 90 Bestellungen im Monat bei einem Menschen. Bevor der Bot startet, stoppt eine Prüfung auf die Bestellnummer des Händlers Dubletten, denn IDP erkennt keine. Preis- und Kreditprüfung laufen im ERP, wenn der Bot den Auftrag speichert, genau wie bei manueller Erfassung.

**Garantieprüfung mit Baudaten.** Angenommen liegt die Baukonfiguration je Seriennummer in einem alten MES mit reinem Desktop-Client. Der Systems Integration Agent deckt das nicht ab, und ein Bot für eine selten genutzte Maske rechnet sich nicht. Ein nächtlicher Export von Seriennummern und Konfiguration in die Assets in Salesforce ist günstiger und hilft auch dem Service.

Keiner der drei Fälle brauchte ein ERP-Projekt. Ein Leseweg, ein Schreibweg unter Kontrolle und ein Export.

## Welche Risiken gibt es, und wie begrenzen Sie sie?

- **Geänderte Masken.** Ein ERP-Patch verschiebt ein Feld, und der Bot steht. Koppeln Sie jedes ERP-Update an einen Bot-Test im Testsystem, melden Sie den Bot-Status an Ihr Monitoring und halten Sie manuelle Erfassung als Rückfall mit bekannter Kapazität vor.
- **Veraltete Daten.** Eine Replik hängt immer ein paar Minuten hinterher. Der Agent nennt den Zeitstempel und verspricht nie einen Liefertermin, den das ERP nicht bestätigt hat.
- **Umgangene ERP-Logik.** Hier hat die Maskenautomatisierung einen Vorteil gegenüber Schreibzugriffen auf die Datenbank: Der Bot geht durch dieselbe Erfassungsmaske wie ein Mensch, jede ERP-Prüfung greift weiter.
- **Identität des Bots.** Der Bot bekommt einen eigenen ERP-Benutzer mit minimalen Rechten, nie die geliehene Anmeldung einer Mitarbeiterin, damit die Historie im ERP zeigt, welche Einträge vom Bot stammen.
- **Entscheidungen im Modell.** Kreditlimit, Preise und Anspruchsprüfung bleiben im ERP oder in deterministischer Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

## Wann ist der Umweg die falsche Antwort?

Geht das neue ERP in etwa einem Jahr live, würde ich meist keine Bots für das alte bauen. Nutzen Sie die Zeit für saubere Stammdaten, die das neue System ohnehin braucht. Liegt die Migration weiter weg, lohnt der Leseweg hinter einem stabilen API-Vertrag, denn er zieht mit um.

Die zweite Grenze ist die Zahl der schreibenden Prozesse. Jeder Bot ist Software, die jemand pflegt. Meine Faustregel: Ab etwa fünf schreibenden Prozessen über Masken kostet ein Schnittstellenmodul des ERP-Herstellers oder eine ordentliche Middleware über drei Jahre meist weniger als die Bots. Ob dieser Punkt erreicht ist, kläre ich in meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Und wenig Volumen bleibt wenig Volumen. Dreißig Bestellungen im Monat rechtfertigen keinen RPA-Bot, egal wie alt das ERP ist.

Starten Sie bei einem alten ERP mit dem Leseweg hinter einem stabilen API-Vertrag und automatisieren Sie das Schreiben nur dort, wo Belege und Masken stabil sind und ein Mensch die unsicheren Fälle prüft.
