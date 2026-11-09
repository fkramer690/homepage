---
title: "Altes ERP ohne API: Helfen KI-Agenten trotzdem?"
description: "Altes ERP oder MES ohne API: drei Wege, wie ein Agentforce-Agent trotzdem Daten liest und schreibt, Kosten, Grenzen und wann eine API besser ist."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: altes-erp-ohne-api-ki-agenten
translationKey: legacy-erp-without-api-agents
topic: data
categories: [ai, architecture]
tags: [Agentforce, ERP, Altsysteme, RPA, MuleSoft, Maschinenbau]
takeaways:
  - "Ein Agent erreicht ein ERP ohne API über eine Datenbankreplik hinter einer kleinen API, Dokumentenextraktion mit RPA oder den Systems Integration Agent."
  - "Für Auftragsstatus, Liefertermine und Bestand ist eine Replik hinter einer MuleSoft-API der stabilste Weg, und sie zieht beim ERP-Wechsel mit um."
  - "MuleSoft IDP schickt einen Beleg zur Prüfung, wenn ein Feld unter der Schwelle liegt oder ein Pflichtfeld fehlt; jede erneute Verarbeitung kostet voll."
  - "RPA und der Systems Integration Agent arbeiten über die Masken und brauchen deshalb Monitoring und einen Verantwortlichen."
  - "Preise, Kreditlimits und Verfügbarkeitsprüfung bleiben im führenden System, hier im ERP. Ein Agent erfasst unter menschlicher Prüfung, entscheidet aber nicht."
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
    a: "Das hängt von Volumen, Fehlerkosten und davon ab, wie sicher der Go-live-Termin ist. Ist das neue ERP nah und der Termin hält, ist Datenbereinigung oft die bessere Nutzung der Zeit. Liegt die Migration weiter weg, lohnt der lesende Zugriff hinter einem API-Vertrag, der die Migration überstehen soll."
draft: false
---

KI-Agenten helfen auch bei einem alten ERP ohne API, aber nur über einen Umweg, und jeder Umweg hat seinen Preis. Zum Lesen von Auftragsstatus, Bestand oder Lieferterminen würde ich eine Datenbankreplik nur mit Lesezugriff hinter eine kleine API stellen und dem Agenten diese geben. Für die Auftragserfassung können Dokumentenextraktion mit RPA oder der Systems Integration Agent von Salesforce die ERP-Masken bedienen. Beide brechen leichter als eine API und brauchen Monitoring und einen Verantwortlichen. Bei den ersten beiden Wegen ist der Agent nur die Oberfläche. Kreditlimit und Preis bleiben im führenden System.

## Warum haben so viele Hersteller ein ERP ohne nutzbare API?

Viele Maschinenbauer im Mittelstand betreiben ein ERP, das seit Jahren im eigenen Rechenzentrum läuft und im Lauf der Zeit stark angepasst wurde. Eine ältere proALPHA-Installation oder ein altes SAP-Release sind typische Beispiele. Ob ein solches System eine nutzbare Schnittstelle bietet, hängt von Version, lizenzierten Modulen und dem Umfang der Anpassungen ab; eine pauschale Aussage über einen Hersteller treffe ich deshalb nicht. Der erste Schritt ist eine Frage an Ihren ERP-Hersteller oder Partner.

„Keine API“ heißt oft: Eine Schnittstelle gibt es, sie ist aber nicht lizenziert oder deckt Kunden und Artikel ab, Aufträge aber nicht. Die Prüfung kostet meist weit weniger als ein Umweg, der Pflege kostet, solange er läuft.

Dasselbe gilt für MES und andere Systeme in der Fertigung, die oft nur einen Desktop-Client und eine Datenbank haben. Für einen Serviceagenten zählen sie trotzdem, denn dort liegen Seriennummern, Baukonfigurationen und Prüfzeugnisse.

Es gibt also drei Fälle. Gibt es eine API, gilt der Standardweg, den ich in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschreibe. Kommt man an die Daten, aber gibt es keine API, bauen Sie eine Leseschicht. Bleibt nur die Maske, automatisieren Sie die Maske.

## Die Wege an ein ERP ohne API

### Weg 1: Lesen aus einer Replik hinter einer eigenen API

Die meisten älteren ERP-Systeme halten ihre Daten in einer relationalen Datenbank. Bevor Sie daraus lesen, fragen Sie den Hersteller, ob der Zugriff unterstützt wird, ob die Tabellen dokumentiert sind und ob Werte wie der Auftragsstatus gespeichert oder erst von der Anwendung berechnet werden. Der [Database Connector](https://docs.mulesoft.com/db-connector/latest/) von MuleSoft verbindet sich laut Dokumentation mit fast jeder relationalen JDBC-Datenbank, mit fertigen Verbindungen für Oracle, Microsoft SQL Server, MySQL und Derby und einer generischen JDBC-Konfiguration für den Rest. Darauf bauen Sie eine kleine Lese-API: Auftragsstatus, Liefertermin, Bestand je Werk, Maschine nach Seriennummer. Mit OpenAPI-Vertrag, Authentifizierung und den nötigen Annotationen lassen sich ihre Operationen über den API Catalog oder External Services als Agenten-Aktionen registrieren und aktivieren.

Zwei Regeln gelten. Gelesen wird aus einer Replik oder einem regelmäßigen Export, nie aus der Produktivdatenbank, damit ein fleißiger Agent nicht die Auftragsabwicklung ausbremst. Und geschrieben wird nie direkt in ERP-Tabellen. Das umgeht Buchungslogik, Nummernkreise und jede Prüfung des ERP, und das würde ich nicht freigeben.

Der eigentliche Nutzen liegt in der Architektur. Der API-Vertrag, etwa „Auftragsstatus nach Auftragsnummer“, soll die Ablösung des alten ERP überstehen. Bleibt die fachliche Bedeutung von Statuscodes und Schlüsseln stabil, wechselt vor allem das Backend; Vertrags- und Regressionstests zeigen, wo der Agent trotzdem nachgezogen werden muss. Eine Regel fürs Händlerportal: Die API prüft serverseitig, ob der angemeldete Händler diesen Auftrag sehen darf, damit niemand fremde Auftragsnummern ausprobieren kann.

### Weg 2: Dokumentenextraktion plus RPA zum Schreiben

Salesforce beschreibt genau diesen Fall im [Salesforce Admins Blog](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce) vom August 2025, am Beispiel eines fiktiven Lieferanten mit eingescannten PDF-Bestellungen und einem ERP ohne API. MuleSoft Intelligent Document Processing (IDP) liest Auftragsnummer, Positionen, Nettowert und Steuer aus und schickt einen Beleg laut [IDP-Dokumentation](https://docs.mulesoft.com/idp/reviewing-processed-documents) in die manuelle Prüfung, wenn ein sichtbares Feld unter der eingestellten Schwelle liegt, im Beispiel 80 Prozent, oder ein Pflichtfeld fehlt. Ein MuleSoft-RPA-Bot überwacht einen freigegebenen Ordner, ruft IDP auf und simuliert im ERP Mausklicks und Tastatureingaben. Zwei autolaunched Flows starten ihn und fragen seinen Status über eine Ausführungs-ID ab, und über das Agentforce-Topic „Order Upload“ (Salesforce nennt Topics inzwischen Subagents) starten Anwender den Upload im Chat und fragen nach dem Stand. Flow, IDP und RPA würden die Arbeit auch ohne Agenten erledigen.

```ablauf
sf: Subagent Order Upload, Autolaunched Flow
ext: RPA-Bot, MuleSoft IDP, Manuelle Prüfung
erp: ERP-Maske
Subagent Order Upload --> Autolaunched Flow
Autolaunched Flow --startet--> RPA-Bot
RPA-Bot --PDF--> MuleSoft IDP
MuleSoft IDP --Felder--> RPA-Bot
MuleSoft IDP ..Prüfung..> Manuelle Prüfung
Manuelle Prüfung ..freigegeben..> RPA-Bot
RPA-Bot --erfasst Auftrag--> ERP-Maske
RPA-Bot ..Status..> Autolaunched Flow
```

Für einen Hersteller liegen Ersatzteilbestellungen von Händlern und Auftragsbestätigungen von Lieferanten als PDF nahe. Zwei Kostenpunkte gehören in den Plan. Laut [IDP-Dokumentation](https://docs.mulesoft.com/idp/) berechnet IDP Automation Credits pro Ausführung nach Seitenzahl, und jede erneute Einreichung oder Verarbeitung kostet voll, ohne Dublettenerkennung. Und [RPA-Bots](https://docs.mulesoft.com/rpa-bot/1.6/) brauchen einen Rechner, auf dem die Zielanwendungen installiert sind, am besten einen eigenen Windows-Rechner. Infrastruktur, Sitzungslizenzen, Patches, Regressionstests und Support gehören deshalb in den Kostenplan.

Ein Detail dieses Musters gefällt mir: Der Agent entscheidet nichts. Er ist ein Chat-Zugang zu einem deterministischen Ablauf.

### Weg 3: der Systems Integration Agent

Zur Dreamforce 2026 hat Salesforce den Systems Integration Agent als Teil von Agentforce Operations vorgestellt, im selben Abschnitt wie den Back-Office-Agenten Marshall, der ganze Abschnitt gekennzeichnet als [GA](https://www.salesforce.com/blog/dreamforce-2026-announcements/). Laut [Produktblog](https://www.salesforce.com/blog/regrello/) lernt er eine browserbasierte Anwendung wie ein neuer Mitarbeiter in etwa 90 Minuten, ohne Code, APIs oder RPA, auch „customized SAP, Oracle, and homegrown systems“. Ändert sich eine Maske, lernt er diesen Teil laut Salesforce typischerweise in etwa 20 Minuten neu und protokolliert die Reparatur zur Prüfung durch einen Administrator. Die [Seite zu Agentforce Operations](https://www.salesforce.com/agentforce/operations/) nennt zusätzlich einen Audit Trail sowie die Beibehaltung von Berechtigungen und Freigabekontrollen und sagt, abgerechnet werde nach Blueprint-Paketen, vom Starter Pack mit 5 Blueprints bis Large mit mehr als 50, „not priced based on consumption“. Listenpreise habe ich keine gefunden.

Für Hersteller entscheidet das Wort „browserbasiert“. Läuft Ihr ERP oder MES als Desktop-Client, prüfen Sie, ob es einen Web-Client gibt, bevor jemand mit diesem Agenten plant. Das sind Herstellerangaben aus dem Startmonat. Ich würde sie an Ihren eigenen Masken testen, inklusive eines ERP-Updates im Testsystem, bevor ich mich darauf verlasse.

```hinweis offen
GA sagt nicht, ob Ihr Vertrag, Ihre Region und Ihr Blueprint-Paket den Systems Integration Agent enthalten. Klären Sie das und die kaufmännischen Bedingungen mit Ihrem Account-Team.
```

## Rechenbeispiel: Ersatzteilaufträge bei einem Maschinenbauer mit altem ERP

Nehmen wir einen Maschinenbauer mit einem ERP im eigenen Rechenzentrum ohne nutzbare Schnittstelle, Service Cloud und einem Händlerportal auf Salesforce sowie 40 Händlern. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Statusanfragen.** Angenommen sind 2.000 Händleranfragen im Monat zu Ersatzteilaufträgen. Eine Replik der relevanten ERP-Tabellen wird alle 15 Minuten aktualisiert, eine kleine MuleSoft-API bietet zwei Operationen: Auftragsstatus und Liefertermin. Bei zwei Aktionen pro Anfrage sind das 4.000 Aktionen zu 20 Flex Credits, also 80.000 Credits oder rund 400 € Verbrauch im Monat zum [Listenpreis von 500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) (20 Credits je Aktion laut [Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf)). Credits werden in Paketen zu 100.000 gekauft, ohne vorhandenes Kontingent kostet der Kauf also 500 €. Prompts, Tests und MuleSoft kommen dazu. Der Agent nennt immer den Datenstand, „Stand 10:15 Uhr“. Wie Sie den Rest schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

**Auftragserfassung.** Angenommen sind 600 Ersatzteilbestellungen im Monat als PDF per E-Mail, im Schnitt zwei Seiten, die eine Kollegin im Innendienst heute in etwa sechs Minuten pro Stück abtippt, rund 60 Stunden im Monat. Mit IDP und RPA sind das 1.200 Seiten im Monat; bei [Automation Credits 2.0 oder 3.0](https://docs.mulesoft.com/general/automation-credits-usage-and-rates) mit 30 Credits je Seite sind das 36.000 Credits ohne Wiederholungen, dazu Bot-Laufzeit, bepreist in Ihrem MuleSoft-Vertrag. Gehen 15 Prozent in die Prüfung, landen weiterhin 90 Bestellungen im Monat bei einem Menschen. Weil IDP keine Dubletten erkennt, braucht der Bot einen festen Schlüssel aus Händler, Gesellschaft und Bestellnummer, einen Verarbeitungsstatus außerhalb des Bots und nach dem Speichern einen Abgleich mit der ERP-Auftragsnummer, damit ein Timeout keinen zweiten Auftrag erzeugt. Preis- und Kreditprüfung laufen im ERP, wenn der Bot den Auftrag speichert, wie bei manueller Erfassung.

**Garantieprüfung mit Baudaten.** Angenommen liegt die Baukonfiguration je Seriennummer in einem alten MES mit reinem Desktop-Client. Der Systems Integration Agent deckt das nicht ab, und ein Bot für eine selten genutzte Maske rechnet sich nicht. Ein nächtlicher Export von Seriennummern und Konfiguration in die Assets in Salesforce ist günstiger und hilft auch dem Service.

Keiner der drei Fälle brauchte ein ERP-Projekt. Ein Leseweg, ein Schreibweg mit manueller Prüfung und ein Export.

## Welche Risiken gibt es, und wie begrenzen Sie sie?

- **Geänderte Masken.** Ein ERP-Patch verschiebt ein Feld, und der Bot steht. Koppeln Sie jedes ERP-Update an einen Bot-Test im Testsystem, melden Sie den Bot-Status an Ihr Monitoring und halten Sie manuelle Erfassung als Rückfall mit bekannter Kapazität vor.
- **Veraltete Daten.** Eine Replik hängt immer ein paar Minuten hinterher. Der Agent nennt den Zeitstempel und verspricht nie einen Liefertermin, den das ERP nicht bestätigt hat.
- **Umgangene ERP-Logik.** Hier hat die Maskenautomatisierung einen Vorteil gegenüber Schreibzugriffen auf die Datenbank: Der Bot geht durch dieselbe Erfassungsmaske wie ein Mensch, also greifen die Prüfungen, die für diese Maske und den Bot-Benutzer eingerichtet sind. Warnungen, die ein Mensch liest, spätere Batch-Prüfungen und andere Erfassungswege deckt das nicht ab, deshalb testen und abgleichen.
- **Identität des Bots.** Der Bot bekommt einen eigenen ERP-Benutzer mit minimalen Rechten, nie die geliehene Anmeldung einer Mitarbeiterin, damit die Historie im ERP zeigt, welche Einträge vom Bot stammen.
- **Entscheidungen im Modell.** Kreditlimit, Preise und Anspruchsprüfung bleiben im führenden System, dem ERP oder einem anderen deterministischen Dienst, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

## Wann ist der Umweg die falsche Antwort?

Geht das neue ERP bald live und hält der Termin, würde ich meist keine Bots für das alte bauen. Nutzen Sie die Zeit für saubere Stammdaten, die das neue System ohnehin braucht. Liegt die Migration weiter weg oder ist sie unsicher, lohnt der Leseweg hinter einem stabilen API-Vertrag, denn er zieht mit um. Entscheidend sind Volumen, Bearbeitungszeit, Fehlerkosten und die Restlaufzeit des alten Systems, nicht ein festes Datum.

Die zweite Grenze ist die Zahl der schreibenden Prozesse. Jeder Bot ist Software, die jemand pflegt. Meine Faustregel, kein Benchmark: Ab etwa fünf schreibenden Prozessen über Masken kostet ein Schnittstellenmodul des ERP-Herstellers oder eine ordentliche Middleware über drei Jahre oft weniger als die Bots. Ein komplexer Bot kann mehr kosten als mehrere einfache, zählen Sie also Aufwand, nicht Bots. Ob dieser Punkt erreicht ist, kläre ich in meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Und wenig Volumen bleibt wenig Volumen. Bei dreißig einfachen Bestellungen im Monat rechnet sich ein Bot selten, außer Fehler oder Bearbeitungszeit sind ungewöhnlich teuer.

Mein Rat für ein altes ERP: Starten Sie mit dem Leseweg hinter einem stabilen API-Vertrag. Das Schreiben automatisieren Sie nur dort, wo Belege und Masken stabil sind und ein Mensch die unsicheren Fälle prüft.
