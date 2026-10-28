---
title: "KI-Agenten im Außendienst: Was Field Service heute kann"
description: "Welche Agentforce-Funktionen es für Salesforce Field Service heute gibt, von Terminbuchung bis Einsatzbericht, und welche sich für Maschinenbauer lohnen."
pubDate: 2026-10-27
lang: de
slug: ki-agenten-aussendienst-field-service
translationKey: field-service-ai-agents-today
topic: field-service
categories: [field-service, ai]
tags: [Field Service, Außendienst, Agentforce, KI-Agenten, Maschinenbau, Wartung]
takeaways:
  - "Allgemein verfügbar sind in Salesforce Field Service heute KI-Agenten für Terminbuchung, proaktive Wartungsplanung, das Füllen von Planungslücken, Pre-Work Briefs, Einsatzberichte und Fehlersuche vor Ort."
  - "Für einen Maschinenbauer lohnen sich zuerst die proaktive Buchung von Wartungsterminen und der vorformulierte Einsatzbericht, weil beide häufig sind und die Regeln dahinter feststehen."
  - "Kundenseitige Terminbuchung läuft über Flex Credits mit 20 Credits (0,10 €) pro Aktion, die Funktionen für Mitarbeitende kosten als Add-on Agentforce for Field Service 125 € pro Nutzer und Monat."
  - "Störungsbuchung, Fehlersuche vor Ort und Ausfallprognose brauchen Triage, sortierte Handbücher oder eine große Flottenhistorie; diese Funktionen würde ich später starten."
  - "Ein vorformulierter Einsatzbericht hilft nur, wenn Ersatzteile, Zeiten und Fehlercodes strukturierte Felder bleiben, denn Garantie, Abrechnung und ERP lesen keinen Fließtext."
faq:
  - q: "Welche Agentforce-Funktionen gibt es für Salesforce Field Service?"
    a: "Laut Salesforce: Termine buchen, verschieben und absagen, proaktive Wartungsplanung aus Maintenance Plans, Planungslücken für Disponenten füllen, Pre-Work Briefs und Post-Work Summaries für Techniker sowie Fehlersuche vor Ort. Die Buchung per Telefon mit Agentforce Voice steht in den Winter-'27-Highlights."
  - q: "Was kostet Agentforce for Field Service?"
    a: "Das Add-on für Disponenten und Techniker kostet 125 € pro Nutzer und Monat bei Jahresvertrag, mit nicht gemessener Nutzung durch Mitarbeitende. Der kundenseitige Scheduling Agent braucht Flex Credits; eine Aktion kostet 20 Credits, zum Listenpreis also 0,10 €."
  - q: "Kann ein KI-Agent Wartungstermine selbstständig planen?"
    a: "Ja. Salesforce hat die allgemeine Verfügbarkeit für August 2025 angekündigt: Ein Agent kontaktiert Kunden anhand anstehender Termine aus dem Maintenance Plan und bucht Termine. Bei Maschinen, die für die Wartung abgeschaltet werden müssen, braucht der Agent bekannte Stillstandsfenster oder übergibt an einen Disponenten."
  - q: "Muss der Betriebsrat bei KI-Agenten im Außendienst beteiligt werden?"
    a: "In Deutschland meist ja, wenn ein Agent Daten, Sprache oder Einsatzberichte der Techniker verarbeitet. Binden Sie Betriebsrat und Datenschutz vor dem Piloten ein, zusammen mit den übrigen Field-Service-Themen wie der Standortverfolgung."
draft: false
---

KI-Agenten im Außendienst gibt es in Salesforce Field Service heute für eine Handvoll Aufgaben: Termine buchen und verschieben, Wartungen proaktiv aus Maintenance Plans einplanen, Techniker vor dem Einsatz briefen und danach den Einsatzbericht vorformulieren. Disponenten bekommen dazu einen Assistenten, der Planungslücken füllt. Für einen Maschinenbauer lohnen sich zuerst die proaktive Wartungsbuchung und der vorformulierte Einsatzbericht, weil beide häufig und regelbasiert sind. Selbstbuchung bei Störungen, Fehlersuche vor Ort und Ausfallprognose hängen an Triage, sortierten Dokumenten oder einer großen Flottenhistorie. Die würde ich als zweiten Schritt angehen.

## Welche KI-Agenten bietet Salesforce Field Service heute?

Salesforce hat Agentforce for Field Service im [April 2025](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) vorgestellt und mit [Agentforce for Manufacturing](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) im August 2025 die proaktive Wartung ergänzt. Der Stand laut diesen Ankündigungen und den Release-Highlights:

| Für | Funktion | Status |
|---|---|---|
| Kunden | Termine per Web oder Messaging buchen, verschieben und absagen | GA seit Mai 2025 |
| Kunden | Proaktive Wartung: Der Agent kontaktiert Kunden und bucht Termine anhand der Maintenance-Plan-Termine | GA für August 2025 angekündigt |
| Kunden | Buchung per Telefon mit Agentforce Voice | Winter-'27-Highlights, Status in Ihrer Org prüfen |
| Disponenten | Lücken durch Absagen, No-Shows und früh beendete Einsätze füllen | GA seit April 2025 |
| Techniker | Pre-Work Brief, auch zum Anhören | Audio GA seit April 2025; die Salesforce-Hilfe beschreibt auch eine interaktive Version, Release nicht bestätigt |
| Techniker | Post-Work Summary, als Entwurf am Work Order | GA seit April 2025 |
| Techniker | Schrittweise Fehlersuche aus Handbüchern, früheren Reparaturen und Fotos | GA seit Juni 2025 |
| Anlagen | Asset Service Prediction: wann und warum eine Anlage ausfällt | [Open Beta 2024 angekündigt](https://www.salesforce.com/news/stories/field-service-asset-management-news/), auf der Produktseite ohne GA-Datum |

Salesforce untermauert den Buchungsagenten mit eigenen Zahlen: Ein Vor-Ort-Termin dauert 17 Minuten zu planen, 15 zu ändern und 12 abzusagen, der Agent soll es in unter fünf schaffen. Die [Winter-'27-Ankündigung](https://salesforce.com/news/stories/winter-2027-product-release-announcement) verspricht die Buchung per Sprache in Sekunden statt 15 Minuten. Das sind Herstellerangaben aus gemischten Branchen, keine Ergebnisse von Maschinenbauern.

Die Industriereferenzen sind dünner. In der [Siemens-Meldung](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) vom September 2026 „kann“ ein Techniker die passenden Ersatzteile für eine Seriennummer vor dem ersten Einsatz bestimmen, die Anbindung von Teamcenter dahinter ist aber mit „will work with“ formuliert. Live und beziffert ist der Teil zu eingehenden Leads. Für den Service eines Maschinenbauers würde ich mit den Funktionen aus der Tabelle planen und alles andere als angekündigt behandeln.

## Was kosten Agenten im Field Service?

Für Field-Service-Agenten gibt es zwei Preismodelle, und sie folgen der Grenze zwischen Kunden und Mitarbeitenden.

**Kundenseitige Agenten laufen über Flex Credits.** Die [Preisseite von Field Service](https://www.salesforce.com/eu/service/field-service-management/pricing/) nennt für Dispatcher, Technician, Field Service Plus und Contractor Plus, dass der Scheduling Agent Flex Credits braucht. Laut [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) kostet eine Aktion in Produktion 20 Credits, in der Sandbox 16, eine Sprachaktion 30 und 24. Bei [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) sind das 0,10 € pro Aktion und 0,15 € pro Sprachaktion.

**Funktionen für Mitarbeitende kosten pro Nutzer.** Das Add-on [Agentforce for Field Service](https://www.salesforce.com/eu/service/field-service-management/ai/pricing/) kostet 125 € pro Nutzer und Monat bei Jahresvertrag und enthält unterstützende KI für Disponenten und Techniker mit nicht gemessener Nutzung durch Mitarbeitende. Die Alternative ist Agentforce 1 Field Service für 650 € pro Nutzer und Monat, mit unbegrenzter Nutzung durch Mitarbeitende sowie 1 Mio. Flex Credits und 2,5 Mio. Data Cloud Credits pro Org und Jahr. Das Add-on kommt zur Technician-Lizenz für 175 € aus [Teil 1 der Field-Service-Serie](../salesforce-field-service-lohnt-sich/) hinzu, Agentforce 1 Field Service enthält bereits alles aus Field Service Plus. Wann sich das Paket rechnet, steht in [Agentforce 1 Field Service: Wann rechnet sich das Paket?](../agentforce-1-field-service-paket-rechnung/).

Für die Budgetplanung heißt das: Ein Buchungsagent kostet Cent pro Buchung, das Add-on für 60 Techniker dagegen 90.000 € im Jahr zum Listenpreis. Stützt sich die Fehlersuche auf Handbücher in Data 360, kommen 150 Credits pro MB Verarbeitung dazu. Wie Sie Credits pro Prozess schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), was die Anbindung von Dokumenten kostet, in [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

## Welche Funktionen lohnen sich für einen Maschinenbauer?

Der Außendienst eines Maschinenbauers ist ein anderer als bei Routerinstallation oder Alarmanlagenwartung. Es gibt weniger und längere Einsätze, die Maschinen haben Seriennummern und Verträge, und am anderen Ende sitzt ein Werksleiter, der einen Stillstand planen muss. Daran gemessen sortiere ich die Funktionen so.

**Die proaktive Wartungsbuchung passt am besten.** Maintenance Plans erzeugen die Work Orders ohnehin, wie in [Wartungsverträge abbilden](../salesforce-field-service-wartungsvertraege/) beschrieben. Der Agent muss nur noch einen Termin vereinbaren. Der Haken ist das Stillstandsfenster: Der Agent sieht die in Salesforce gepflegten Öffnungszeiten und nichts von der Produktionsspitze nächste Woche. Ist kein Fenster gepflegt, sollte er Termine vorschlagen und an einen Disponenten übergeben, statt selbst zu buchen.

**Der vorformulierte Einsatzbericht passt, unter einer Bedingung.** Die Post-Work Summary ist Fließtext. Garantie, Abrechnung und ERP brauchen Ersatzteile, Arbeitszeit und Fehlercodes als Felder. Ich würde die strukturierten Felder als führenden Datensatz behalten und die Zusammenfassung für den Text nutzen, den der Kunde liest, etwa im Servicebericht aus dem [Document Builder](../salesforce-service-documents-document-builder-servicebericht/). Die [geführten mobilen Abläufe](../salesforce-field-service-mobile-aussendienst/) hängen am selben Datenmodell.

**Der Pre-Work Brief ist so gut wie die Anlagenhistorie.** Ist die Hälfte der alten Work Orders keiner Anlage zugeordnet, hat das Briefing wenig zu sagen. Das ist die Datenfrage aus [Stammdaten für die Planung](../salesforce-field-service-stammdaten/).

**Das Füllen von Lücken hängt vom Einsatzmix ab.** Bei vielen kurzen Einsätzen am Tag spart es echte Disponentenzeit. Bei Inbetriebnahmen über mehrere Tage gibt es kaum Lücken. Ob ein Disponent jeden Vorschlag noch freigeben sollte, ist die Frage aus [wie viel Planung automatisch laufen darf](../salesforce-field-service-terminplanung-automatisieren/). Winter '27 zeigt mehrtägige Termine in der Scheduling-Konsole immerhin als einen zusammenhängenden Einsatz.

**Selbstbuchung bei Störungen braucht zuerst Triage.** Steht eine Maschine, muss jemand klären, was ausgefallen ist, welches Teil gebraucht wird und ob der Vertrag eine Reaktion in 24 Stunden zusagt. Das entscheidet das Entitlement, und das gehört in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben. Ein Agent kann den Anruf annehmen und den Fall anlegen. Buchen lassen würde ich ihn nur eindeutig eingeordnete Einsätze.

**Fehlersuche und Ausfallprognose kommen später.** Die Fehlersuche ist nur so verlässlich wie die Handbücher dahinter, und die gibt es im Maschinenbau je Variante und Stand. Asset Service Prediction arbeitet laut [Produktseite](https://www.salesforce.com/service/field-service-management/) mit der Servicehistorie ähnlicher Anlagen. Bei 300 Exemplaren einer Sondermaschine ist diese Historie dünn.

## Ein typisches Szenario: ein Maschinenbauer mit 60 Technikern

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und bereits laufendem Field Service, 60 Technikern, 4 Disponenten und Wartungsverträgen für 1.500 Maschinen. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Wartungsbuchung per Agent.** Angenommen sind 300 geplante Wartungen im Monat und fünf Aktionen pro Buchung: Plan lesen, Ansprechpartner prüfen, Zeitfenster suchen, buchen, bestätigen. Das sind 1.500 Aktionen oder 30.000 Credits, rund 150 € im Monat. Mit den 17 Minuten pro Buchung aus der Salesforce-Angabe verbringen die Disponenten heute 85 Stunden im Monat damit. Für zwei Drittel der Kunden sind Stillstandsfenster gepflegt. Diese bucht der Agent, den Rest übergibt er an den Disponenten.

**Berichtsentwürfe für alle Techniker.** Das Add-on kostet für 60 Techniker 7.500 € im Monat. Bei angenommenen internen Kosten von 90 € pro Technikerstunde rechnet es sich, sobald jeder Techniker rund 1,4 Stunden im Monat spart. Diese Hürde ist niedrig. Offen ist das Datenmodell: Die Fehlercodes stehen heute in einem Freitextfeld. Der Bericht geht live, nachdem die Felder bereinigt sind, und die Zusammenfassung schreibt nur den Kundentext.

**Fehlersuche bei Sondermaschinen.** Angenommen sind 3.000 MB Handbücher als PDF in mehreren Ständen. Sie einmal in der Basisstufe zu verarbeiten, kostet 450.000 Credits, rund 2.250 €, vor der ersten Abfrage. Das größere Problem: Niemand kann sagen, welches Handbuch zu welcher Seriennummer gehört. Das wartet, bis die Handbücher der installierten Basis zugeordnet sind.

Das Muster dahinter: Der Agent mit dem niedrigsten Preis pro Vorgang ist am leichtesten zu starten, und das Add-on pro Nutzer ist eine Lizenzentscheidung, die ein sauberes Datenmodell braucht, bevor sie ihr Geld wert ist.

## Wo sollten Sie anfangen?

1. **Eine Funktion wählen** aus der Tabelle oben, mit hohem Volumen. Für die meisten Maschinenbauer ist das die Wartungsbuchung.
2. **Die Daten dahinter prüfen**: Maintenance Plans, Stillstandsfenster, Anlagenbezug der alten Work Orders.
3. **Regeln in Logik gießen**: Entitlements, Reaktionszeiten und Garantiestatus bleiben aus dem Prompt heraus.
4. **Testläufe budgetieren** mit 16 Credits pro Aktion in der Sandbox und eine messbare Zielzahl vereinbaren, etwa den Anteil der Wartungen, die ohne Disponenten gebucht werden.
5. **Den Betriebsrat früh einbinden.** Agenten, die Einsatzberichte lesen oder Sprache von Technikern verarbeiten, berühren in Deutschland die Mitbestimmung, neben der Standortverfolgung aus der [Einführung von Field Service](../salesforce-field-service-einfuehrung/).

Ob das Add-on oder Agentforce 1 Field Service die bessere Wahl ist, ist eine Lizenzfrage, die ich in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) kläre. Zur grundsätzlichen Entscheidung über Agenten lesen Sie [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/). Wie Sie Agenten im Außendienst Schritt für Schritt einführen, steht in [Kapitel 5 der Masterclass Field Service](../../masterclass/field-service/field-service-ki-agenten-einfuehrung/).

Starten Sie mit dem Agenten, der geplante Wartungen bucht, und lassen Sie den Einsatzbericht folgen, sobald die Felder dahinter sauber sind. Wenn Sie eine zweite Meinung möchten, welche Funktion zu Ihrem Außendienst passt, [schreiben Sie mir](#contact).
