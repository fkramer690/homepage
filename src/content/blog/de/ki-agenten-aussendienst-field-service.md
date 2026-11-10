---
title: "KI-Agenten im Außendienst: Was Field Service heute kann"
description: "Welche Agentforce-Funktionen es für Salesforce Field Service heute gibt, von Terminbuchung bis Einsatzbericht, und welche sich für Maschinenbauer lohnen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-agenten-aussendienst-field-service
translationKey: field-service-ai-agents-today
topic: field-service
categories: [field-service, ai]
tags: [Field Service, Außendienst, Agentforce, KI-Agenten, Maschinenbau, Wartung]
takeaways:
  - "Salesforce nennt 17 Minuten für die Planung eines Vor-Ort-Termins und unter 5 Minuten mit dem Buchungsagenten. Das sind Herstellerangaben."
  - "Für Maschinenbauer lohnen sich zuerst Wartungsbuchung und vorformulierter Einsatzbericht, weil beide häufig, klar abgegrenzt und leicht zu prüfen sind."
  - "Kundenseitige Buchung kostet 20 Flex Credits (0,10 €) pro Aktion; das Add-on für Mitarbeitende 125 € pro Nutzer und Monat."
  - "Störungsbuchung, Fehlersuche und Ausfallprognose brauchen Triage, sortierte Handbücher oder genug Reparaturhistorie. Sie kommen später."
  - "Ein Berichtsentwurf hilft nur, wenn Ersatzteile, Zeiten und Fehlercodes strukturierte Felder bleiben, denn Abrechnung und Garantie im ERP brauchen sie."
faq:
  - q: "Welche Agentforce-Funktionen gibt es für Salesforce Field Service?"
    a: "Laut Salesforce: Termine buchen, verschieben und absagen, proaktive Wartungsplanung aus Maintenance Plans, Planungslücken für Disponenten füllen, Pre-Work Briefs und Post-Work Summaries für Techniker sowie Fehlersuche vor Ort. Die Salesforce-Hilfe dokumentiert außerdem einen sprachfähigen Scheduling Agent für die Buchung per Telefon."
  - q: "Was kostet Agentforce for Field Service?"
    a: "Das Add-on für Disponenten und Techniker kostet 125 € pro Nutzer und Monat bei Jahresvertrag und umfasst eine nicht nutzungsabhängig abgerechnete Nutzung durch Mitarbeitende; Dienste wie Data 360 verbrauchen trotzdem Credits. Auf der US-Preisseite stehen inzwischen 150 US-Dollar, und Field Service Max enthält das Add-on. Der kundenseitige Scheduling Agent braucht Flex Credits; eine Aktion kostet 20 Credits, zum Listenpreis also 0,10 €."
  - q: "Kann ein KI-Agent Wartungstermine selbstständig planen?"
    a: "Ja. Salesforce hat die allgemeine Verfügbarkeit für August 2025 angekündigt: Ein Agent kontaktiert Kunden anhand anstehender Termine aus dem Maintenance Plan und bucht Termine. Bei Maschinen, die für die Wartung abgeschaltet werden müssen, braucht der Agent bekannte Stillstandsfenster oder übergibt an einen Disponenten."
  - q: "Muss der Betriebsrat bei KI-Agenten im Außendienst beteiligt werden?"
    a: "Binden Sie ihn früh ein. Nach § 90 BetrVG ist er zu unterrichten und zu beraten, wenn KI Arbeitsabläufe ändert, und nach § 87 Abs. 1 Nr. 6 BetrVG bestimmt er mit, wenn das System Verhalten oder Leistung überwachen kann. Der Datenschutz muss gesondert geprüft werden, auch mit Blick auf Themen wie die Standortverfolgung."
draft: false
---

KI-Agenten im Außendienst gibt es in Salesforce Field Service heute für eine Handvoll Aufgaben: Termine buchen und verschieben, Wartungen proaktiv aus Maintenance Plans einplanen, Techniker vor dem Einsatz briefen und danach den Einsatzbericht vorformulieren. Disponenten bekommen dazu einen Assistenten, der Planungslücken füllt. Für einen Maschinenbauer lohnen sich zuerst die proaktive Wartungsbuchung und der vorformulierte Einsatzbericht, weil beide häufig, klar abgegrenzt und leicht zu prüfen sind. Selbstbuchung bei Störungen, Fehlersuche vor Ort und Ausfallprognose setzen Triage, sortierte Dokumente oder ausreichend Reparaturhistorie voraus. Diese Themen würde ich in einem zweiten Schritt angehen.

## Welche KI-Agenten bietet Salesforce Field Service heute?

Salesforce hat Agentforce for Field Service im [April 2025](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) vorgestellt und mit [Agentforce for Manufacturing](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) im August 2025 die proaktive Wartung ergänzt. Das ist der Stand laut diesen Ankündigungen und den Release-Highlights:

| Für | Funktion | Status |
|---|---|---|
| Kunden | Termine per Web oder Messaging buchen, verschieben und absagen | GA seit Mai 2025 |
| Kunden | Proaktive Wartung: Der Agent kontaktiert Kunden und bucht Termine anhand der Maintenance-Plan-Termine | GA für August 2025 angekündigt |
| Kunden | Buchung per Telefon mit Agentforce Voice | Winter '27; [in der Salesforce-Hilfe dokumentiert](https://help.salesforce.com/s/articleView?id=service.fs_agentforce_autonomous_scheduling_customer_initiated_create_agent_voice_studio.htm&language=en_US&type=5), braucht Partner-Telefonie |
| Disponenten | Lücken durch Absagen, No-Shows und früh beendete Einsätze füllen | GA seit April 2025, nur mit Enhanced Scheduling and Optimization |
| Techniker | Pre-Work Brief, auch zum Anhören | Audio GA seit April 2025; die [interaktive Version](https://help.salesforce.com/s/articleView?id=service.mfs_einstein_interactive_pre_work_brief.htm&language=en_US&type=5) ist ohne Beta-Hinweis dokumentiert und braucht eine Verbindung |
| Techniker | Post-Work Summary, als Entwurf am Work Order | GA seit April 2025 |
| Techniker | Schrittweise Fehlersuche aus Handbüchern, früheren Reparaturen und Fotos | GA seit Juni 2025 |
| Anlagen | Asset Service Prediction, ein Prognosemodell statt eines Agenten: wann und warum eine Anlage ausfällt | [Open Beta 2024 angekündigt](https://www.salesforce.com/news/stories/field-service-asset-management-news/), Einrichtung inzwischen in der [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_asp_install.htm&language=en_US&type=5) dokumentiert |

Salesforce untermauert den Buchungsagenten mit eigenen Zahlen:

```kennzahlen
17 Min. | dauert es, einen Vor-Ort-Termin zu planen
15 Min. | ihn zu ändern
12 Min. | ihn abzusagen
unter 5 Min. | soll der Agent dafür brauchen
quelle: Herstellerangaben von Salesforce zum Buchungsagenten in Agentforce for Field Service
```

Die [Winter-'27-Ankündigung](https://salesforce.com/news/stories/winter-2027-product-release-announcement) verspricht die Buchung per Sprache in Sekunden statt in 15 Minuten. Das sind Herstellerangaben aus gemischten Branchen mit unterschiedlichen Ausgangswerten und keine Ergebnisse von Maschinenbauern.

Die Industriereferenzen sind dünner. In der [Siemens-Meldung](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) vom September 2026 „kann“ ein Techniker die passenden Ersatzteile für eine Seriennummer vor dem ersten Einsatz bestimmen; die dafür nötige Anbindung von Teamcenter ist aber mit „will work with“ formuliert. Live und mit Zahlen belegt ist der Teil zu eingehenden Leads. Für den Service eines Maschinenbauers würde ich mit den Funktionen aus der Tabelle planen und alles andere als angekündigt behandeln.

## Was kosten Agenten im Field Service?

Für Field-Service-Agenten gibt es zwei Preismodelle, die zwischen Kunden und Mitarbeitenden unterscheiden.

**Kundenseitige Agenten laufen über Flex Credits.** Die [Preisseite von Field Service](https://www.salesforce.com/eu/service/field-service-management/pricing/) nennt für Dispatcher, Technician, Field Service Plus und Contractor Plus, dass der Scheduling Agent Flex Credits braucht. Laut [Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) kostet eine Aktion in Produktion 20 Credits, in der Sandbox 16, eine Sprachaktion 30 beziehungsweise 24. Bei [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) sind das 0,10 € pro Aktion und 0,15 € pro Sprachaktion.

**Funktionen für Mitarbeitende kosten pro Nutzer.** Das Add-on [Agentforce for Field Service](https://www.salesforce.com/eu/service/field-service-management/ai/pricing/) kostet 125 € pro Nutzer und Monat bei Jahresvertrag und enthält unterstützende KI für Disponenten und Techniker ohne nutzungsabhängige Abrechnung für Mitarbeitende. Die Alternative ist Agentforce 1 Field Service für 650 € pro Nutzer und Monat, mit unbegrenzter Nutzung durch Mitarbeitende sowie 1 Mio. Flex Credits und 2,5 Mio. Data Cloud Credits pro Org und Jahr. Das Add-on kommt zur Technician-Lizenz für 175 € aus [Teil 1 der Field-Service-Serie](../salesforce-field-service-lohnt-sich/) hinzu; Agentforce 1 Field Service enthält bereits alles aus Field Service Plus. Wann sich das Paket rechnet, steht in [Agentforce 1 Field Service: Wann rechnet sich das Paket?](../agentforce-1-field-service-paket-rechnung/). Auf der US-Preisseite hat Salesforce im November 2026 umgestellt: Field Service Plus und Agentforce 1 Field Service heißen dort Field Service+ Core (250 US-Dollar), Advanced (450 US-Dollar) und Field Service Max (650 US-Dollar), und das Add-on kostet 150 US-Dollar. Die EU-Seite zeigt am 9. November 2026 noch das bisherige Modell.

Für die Budgetplanung heißt das: Ein Buchungsagent kostet Cent pro Buchung, das Add-on für 60 Techniker dagegen 90.000 € im Jahr zum Listenpreis. Bei aktionsbasierter Abrechnung kostet eine Voice-Aktion 30 Credits; manche Kunden zahlen stattdessen Voice-Minuten, und die Telefonie kommt dazu. Stützt sich die Fehlersuche auf Handbücher in Data 360, kommen in der Grundstufe 150 Credits pro MB Verarbeitung dazu. Wie Sie Credits pro Prozess schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/); was die Anbindung von Dokumenten kostet, in [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

## Für Maschinenbauer lohnen sich zuerst Wartungsbuchung und Einsatzbericht

Außendiensteinsätze im Maschinenbau unterscheiden sich von Routerinstallationen oder der Wartung von Alarmanlagen. Es gibt weniger und längere Einsätze, die Maschinen haben Seriennummern und Verträge, und auf Kundenseite sitzt ein Werksleiter, der einen Stillstand planen muss. Daran gemessen sortiere ich die Funktionen so.

**Die proaktive Wartungsbuchung passt am besten.** Maintenance Plans erzeugen die Work Orders ohnehin, wie in [Wartungsverträge abbilden](../salesforce-field-service-wartungsvertraege/) beschrieben. Der Agent muss nur noch einen Termin vereinbaren. Schwierig wird es beim Stillstandsfenster: Der Agent sieht die in Salesforce gepflegten Betriebszeiten und nichts von der Produktionsspitze nächste Woche. Ist kein Fenster gepflegt, sollte er Termine vorschlagen und an einen Disponenten übergeben, statt selbst zu buchen.

**Der vorformulierte Einsatzbericht passt, unter einer Bedingung.** Die Post-Work Summary ist Fließtext und fasst im Standard den Arbeitsauftrag zusammen; Positionen, Termine und Anlagendaten müssen Sie ausdrücklich ergänzen. Das ERP kann Freitext speichern, aber Garantie, Abrechnung und Teilebuchung brauchen Ersatzteile, Arbeitszeit und Fehlercodes als zugeordnete Felder. Ich würde die strukturierten Felder als führende Datenbasis behalten und die Zusammenfassung für den Text nutzen, den der Kunde liest, etwa im Servicebericht aus dem [Document Builder](../salesforce-service-documents-document-builder-servicebericht/). Die [geführten mobilen Abläufe](../salesforce-field-service-mobile-aussendienst/) hängen am selben Datenmodell.

**Der Pre-Work Brief hängt an der Anlagenhistorie.** Ist die Hälfte der alten Work Orders keiner Anlage zugeordnet, hat das Briefing wenig Inhalt. Das ist die Datenfrage aus [Stammdaten für die Planung](../salesforce-field-service-stammdaten/).

**Das Füllen von Lücken hängt vom Einsatzmix ab.** Bei vielen kurzen Einsätzen am Tag spart es Disponentenzeit. Mehrtägige Termine, komplexe Arbeitsketten, fixierte Termine und Subunternehmer schließt die Lückenfüllung laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_agentforce_dispatcher_considerations.htm&language=en_US&type=5) aus, und damit einen Großteil eines Inbetriebnahmeplans. Ob ein Disponent jeden Vorschlag noch freigeben sollte, ist die Frage aus [wie viel Planung automatisch laufen darf](../salesforce-field-service-terminplanung-automatisieren/). Winter '27 zeigt mehrtägige Termine in der Scheduling-Konsole immerhin als einen zusammenhängenden Einsatz.

**Selbstbuchung bei Störungen braucht zuerst Triage.** Steht eine Maschine, muss jemand klären, was ausgefallen ist, welches Teil gebraucht wird und ob der Vertrag eine Reaktion in 24 Stunden zusagt. Dafür ist das Entitlement maßgeblich, und es gehört in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben. Ein Agent kann den Anruf annehmen und den Fall anlegen. Buchen lassen würde ich ihn nur für eindeutig eingeordnete Einsätze.

**Fehlersuche und Ausfallprognose kommen später.** Die Fehlersuche hängt von den zugrunde liegenden Handbüchern ab, und die gibt es im Maschinenbau je Variante und Stand. Asset Service Prediction arbeitet laut [Produktseite](https://www.salesforce.com/service/field-service-management/) mit der Servicehistorie ähnlicher Anlagen. Die Salesforce-Hilfe nennt mindestens 400 historische Reparaturdatensätze für ein Modell. Bei 300 Exemplaren einer Sondermaschine mit uneinheitlichen Fehlercodes ist diese Hürde schwer zu nehmen.

## Rechenbeispiel: ein Maschinenbauer mit 60 Technikern

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und bereits laufendem Field Service, 60 Technikern, 4 Disponenten und Wartungsverträgen für 1.500 Maschinen. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Wartungsbuchung per Agent.** Angenommen sind 300 geplante Wartungen im Monat und fünf abrechenbare Aktionen pro Buchung, eine Planungsannahme, die Sie in Testsitzungen und Digital Wallet prüfen. Das sind 1.500 Aktionen oder 30.000 Credits und damit rund 150 € im Monat. Mit dem Salesforce-Richtwert von 17 Minuten pro Buchung wären das 85 Disponentenstunden im Monat; messen Sie zuerst Ihre eigene Bearbeitungszeit. Für zwei Drittel der Kunden sind Stillstandsfenster gepflegt. Bei diesen Kunden bucht der Agent den Wartungstermin, die übrigen Fälle übergibt er an den Disponenten.

**Berichtsentwürfe für alle Techniker.** Das Add-on kostet für 60 Techniker 7.500 € im Monat. Bei angenommenen internen Kosten von 90 € pro Technikerstunde rechnet es sich, sobald jeder Techniker rund 1,4 Stunden im Monat spart. Diese Hürde ist niedrig. Offen ist das Datenmodell: Die Fehlercodes stehen heute in einem Freitextfeld. Der Bericht geht live, nachdem die Felder bereinigt sind, und die Zusammenfassung enthält nur den Kundentext.

**Fehlersuche bei Sondermaschinen.** Angenommen sind 3.000 MB Handbücher als PDF in mehreren Ständen. Diese Handbücher in einem Monat einmal zu verarbeiten, kostet 420.000 Credits, rund 2.100 €: 150 Credits pro MB bis 300.000 Credits, darüber 120 Credits pro MB. Ist das KI-gestützte Intelligent Processing aktiv, gilt ein höherer Zähler, und jede Suche kostet zusätzlich Abfrage-Credits. Das größere Problem: Niemand kann sagen, welches Handbuch zu welcher Seriennummer gehört. Dieser Schritt wartet, bis die Handbücher der installierten Basis zugeordnet sind.

Das Muster dahinter: Der Agent mit dem niedrigsten Preis pro Vorgang lässt sich am einfachsten einführen, und das Add-on pro Nutzer ist eine Lizenzentscheidung, die ein sauberes Datenmodell braucht, bevor sie ihr Geld wert ist.

## Erster Schritt: Wartungsbuchung mit gepflegten Stillstandsfenstern

```schritte
Eine Funktion wählen
  Eine aus der Tabelle oben, mit hohem Volumen. Für die meisten Maschinenbauer ist das die Wartungsbuchung.
Daten dahinter prüfen
  Maintenance Plans, Stillstandsfenster, Anlagenbezug der alten Work Orders.
Regeln in Logik gießen
  Entitlements, Reaktionszeiten und Garantiestatus bleiben aus dem Prompt heraus.
Testläufe budgetieren
  Mit 16 Credits pro Aktion in der Sandbox, dazu eine messbare Zielzahl, etwa den Anteil der Wartungen, die ohne Disponenten gebucht werden.
Betriebsrat früh einbinden
  Agenten, die Einsatzberichte lesen oder Sprache von Technikern verarbeiten, berühren in Deutschland die Mitbestimmung, neben der Standortverfolgung aus der [Einführung von Field Service](../salesforce-field-service-einfuehrung/).
```

Ob das Add-on oder ein Bundle wie Field Service Max die bessere Wahl ist, ist eine Lizenzfrage, die ich in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) kläre. Zur grundsätzlichen Entscheidung über Agenten lesen Sie [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/). Wie Sie Agenten im Außendienst Schritt für Schritt einführen, steht in [Kapitel 5 der Masterclass Field Service](../../masterclass/field-service/field-service-ki-agenten-einfuehrung/).
