---
title: "Manufacturing Cloud Funktionen: was enthalten ist"
description: "Welche Funktionen die Manufacturing Cloud für Vertrieb, Service und Händler mitbringt, welche einzeln eingeschaltet werden und welche Salesforce extra verkauft."
pubDate: 2026-10-28
lang: de
slug: manufacturing-cloud-funktionen-ueberblick
translationKey: manufacturing-cloud-feature-map
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Lizenzen, Sales Agreements, Garantie, Händlerkanal, Make-or-buy]
takeaways:
  - "Die Manufacturing Cloud bringt Sales Agreements, Prognosen, Programme, Ziele und Besuche für den Vertrieb, Garantie- und Asset-Funktionen für den Service sowie Boni und Partnerfunktionen für den Händlerkanal."
  - "Jede Vertriebs- und Partnerfunktion hat eine eigene Einstellung in den Metadaten IndustriesManufacturingSettings, standardmäßig aus. Die Lizenz sagt also nichts darüber, was eingeschaltet ist."
  - "Einige Funktionen aus den Listen von Salesforce werden extra verkauft: Ship and Debit gehört zu Channel Revenue Management für 30.000 $ pro Org und Jahr, Connected Assets kostet 15.000 $ pro Org und Monat."
  - "Trailhead nennt das Produkt Agentforce Manufacturing, und nicht jede Funktion mit Agentforce im Namen ist ein Agent. Fragen Sie nach Subagent, Aktion und Lizenz."
  - "Ein Angebot sollte jede Funktion aus dem Business Case mit der Lizenz nennen, die sie abdeckt, statt nur die Edition."
faq:
  - q: "Welche Funktionen enthält die Salesforce Manufacturing Cloud?"
    a: "Für den Vertrieb Sales Agreements, Account Forecasting, Programmgeschäft, Account Manager Targets und Besuchsmanagement. Für den Service Service Console, Asset Service Console, Garantiemanagement, Servicekampagnen, Prework Estimation und Bestandsfunktionen. Für den Kanal Rebate Management sowie Partner Lead, Performance und Visit Management."
  - q: "Ist Manufacturing Cloud dasselbe wie Agentforce Manufacturing?"
    a: "Ja. Produkt- und Preisseiten sprechen von Manufacturing Cloud, etwa Manufacturing Cloud Sales Core. Trailhead und die Fußnoten der Preisseite sprechen von Agentforce Manufacturing. Gemeint ist dasselbe Produkt."
  - q: "Gehört Ship and Debit zur Manufacturing Cloud?"
    a: "Trailhead führt es unter den Funktionen von Agentforce Manufacturing, beschreibt Ship and Debit Process Management aber als Funktion von Channel Revenue Management. Die Add-on-Seite verkauft Channel Revenue Management for Manufacturing separat für 30.000 $ pro Org und Jahr."
  - q: "Wie sehe ich, welche Funktionen in meiner Org aktiv sind?"
    a: "Prüfen Sie die Manufacturing-Einstellungen im Setup oder lesen Sie die Metadaten IndustriesManufacturingSettings aus. Funktionen wie Advanced Account Forecasting, Programme, Account Manager Targets und Partner Visit Management haben je ein eigenes Feld, standardmäßig false."
draft: false
---

Die Salesforce Manufacturing Cloud enthält drei Gruppen von Funktionen: Sales Agreements, Prognosen, Programme, Ziele und Besuche für den Vertrieb, Garantie, Servicekampagnen und zwei Konsolen für den Service, Boni und Partnerfunktionen für den Händlerkanal. Die meisten werden einzeln eingeschaltet. Der Satz „Wir haben die Manufacturing Cloud“ sagt deshalb wenig darüber, was tatsächlich läuft. Einige Funktionen, die Salesforce direkt daneben aufführt, werden extra verkauft, darunter Ship and Debit und Connected Assets. Bevor ein Angebot unterschrieben wird, sollte jede Funktion, von der der Business Case abhängt, darin stehen, zusammen mit der Lizenz, die sie abdeckt.

## Was enthält die Manufacturing Cloud für den Vertrieb?

Die Manufacturing Cloud ist eine Industry Cloud auf Sales Cloud und Service Cloud, mit einem eigenen Datenmodell für Hersteller. Ob sie sich überhaupt lohnt, steht in [wann lohnt sich die Manufacturing Cloud](../manufacturing-cloud-wann-lohnt-sie-sich/). Hier geht es um die engere Frage, was im Paket steckt. Die [Produktseite für den Vertrieb](https://salesforce.com/manufacturing/cloud/sales) und der [Trailhead-Überblick](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennen fünf Vertriebsfunktionen:

| Funktion | Was sie tut | Welche Frage sie beantwortet |
|---|---|---|
| Sales Agreements | Rahmenverträge mit geplanten Mengen, Preis, Kosten und Marge pro Zeitraum; Ist-Werte aus ERP oder Auftragsverwaltung | Welcher Kunde liegt hinter seiner Zusage? |
| Account Forecasting | Prognose über Neugeschäft und laufendes Geschäft, mit Formel-Editor und Übergabe an Absatz- und Finanzplanung | Was nimmt jeder Kunde pro Produkt und Monat ab? |
| Programmgeschäft | Marktgröße pro Hersteller und Programm, externe Bedarfsdaten, Komponentenprognosen | Wie viele Komponenten braucht ein OEM-Programm? |
| Account Manager Targets | Ziele von oben nach unten, nach Menge, Umsatz oder eigener Kennzahl | Liegt das Team pro Kunde, Produkt und Region im Plan? |
| Besuchsmanagement | Besuche aus Vorlagen, Aufgaben und Kennzahlen mobil erfasst | Was hat der Vertrieb beim Kunden oder Händler geprüft? |

Prognosen gibt es zweimal: Die Einstellungen kennen einen Schalter für Account Forecasts und einen für Advanced Account Forecasting. Der Trailhead-Überblick nennt nur die erweiterte Variante. Wie sie arbeitet und wo sie endet, steht in [Account Forecasting für die Absatzprognose](../account-forecasting-absatzprognose-vertrieb/), das Programmgeschäft in [Programmgeschäft: Prognosen für Zulieferer](../programmgeschaeft-zulieferer-prognose/).

Trailhead nennt außerdem Product Catalog Management, das Produktdefinitionen und Preisstrukturen an einer Stelle hält. Ein Angebotssystem mit Konfigurator, Freigaben und Vertragserstellung taucht in keiner dieser Listen auf. In dieser Masterclass gehört das Angebot zu Revenue Cloud.

## Was enthält sie für den Service?

Die [Produktseite für den Service](https://salesforce.com/manufacturing/cloud/service) nennt drei Blöcke:

- **Service Console.** Eine Zeitleiste der Kundenkontakte, Hinweise auf auslaufende Garantien, Probleme mit Anlagen, Lieferverzug und offene Fälle sowie Aktionen wie einen Garantieanspruch anlegen oder eine Garantieverlängerung verkaufen.
- **Asset Service Console.** Eine Sicht pro Anlage mit Meilensteinen, Seriennummer, zugehörigen Accounts und Kontakten, Garantien, Fällen, Arbeitsaufträgen und Ansprüchen.
- **Garantiemanagement.** Garantieprogramme nach Laufzeit, Nutzungsgrenzen und abgedeckten Teilen, Geschäftsregeln für die Freigabe von Ansprüchen und Ansprüche, die Partner und Kunden über Portale oder API einreichen.

Trailhead ergänzt drei weitere: Servicekampagnen für Rückrufe und Nachrüstungen an einer festgelegten Menge von Anlagen (das Objekt gibt es laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_productservicecampaign.htm) seit API 51.0), Prework Estimation, also die Schätzung von Arbeit, Teilen und Kosten vor dem Einsatz, und Bestandsfunktionen für Teileverfügbarkeit und Nachschub.

Die Preisseite verkauft den Service als eigene Edition, Service Core zu 275 $ pro Nutzer und Monat, und fasst beide Seiten nur in Sales & Service Max zu 700 $ zusammen. Welche Servicefunktionen ein Nutzer mit Sales Core verwenden darf, steht dort nicht. Die Einsatzplanung für Techniker und die mobile App im Außendienst sind Field Service mit eigenen Lizenzen, wie in [lohnt sich Salesforce Field Service](../salesforce-field-service-lohnt-sich/) beschrieben.

## Was steckt für Händler und den Kanal drin?

Hier werden die Listen unübersichtlich. Trailhead ordnet die Kanalfunktionen unter zwei Überschriften:

- **Rebates:** Rebate Management, Ship and Debit Process Management, Price Protection und Agentforce for Channel Revenue Management.
- **Channel Revenue Management:** Partner Visit Management, ein Actionable Relationship Center und ein Dashboard zur Händlerleistung.

Das [Trailhead-Modul zu Ship and Debit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) ist eindeutig: „Ship and Debit Process Management is a feature within Channel Revenue Management.“ Und die [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) verkauft Channel Revenue Management for Manufacturing separat, für 30.000 $ pro Org und Jahr. Eine Funktion auf der Liste von Agentforce Manufacturing ist im Angebot also ein Add-on.

Partner Visit Management ist der umgekehrte Fall. Es hat einen eigenen Schalter in den Manufacturing-Einstellungen, neben Partner Lead Management und Partner Performance Management, steht bei Trailhead aber unter der Überschrift Channel Revenue Management. Welche Lizenz es abdeckt, habe ich nirgends schriftlich gefunden. Fragen Sie nach, bevor Sie Händlerbesuche darauf planen.

Rebate Management selbst beschreibe ich in [Teil 5 der Serie](../rebate-management-haendlerboni/). Ob es zusätzliche Lizenzen braucht, ist ein weiterer offener Punkt; die Preise, die sich widersprechen, stehen in [Manufacturing Cloud Add-ons: was extra kostet](../manufacturing-cloud-zusatzkosten-add-ons/).

## Warum hat jede Funktion einen eigenen Schalter?

Weil Salesforce sie so gebaut hat. Die [Metadaten IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) haben pro Funktion ein boolesches Feld, standardmäßig false:

| Einstellung | Funktion | Seit API |
|---|---|---|
| enableIndManufacturing | Sales Agreements | 47.0 (Komponente) |
| enableIndustriesMfgAccountForecast | Account Forecasts | 47.0 (Komponente) |
| enableIndustriesMfgAdvForecast | Advanced Account Forecasting | 47.0 (Komponente) |
| enableIndustriesMfgTargets | Account Manager Targets | 49.0 |
| enableIndustriesMfgProgram | Manufacturing Programs | 54.0 |
| enablePartnerLeadManagement, enablePartnerPerformanceManagement, enablePartnerVisitManagement | Partnerfunktionen | 56.0 |
| enableFleetManagement | Flottenverwaltung | 59.0 |

Für die ersten drei Felder nennt die Seite keine eigene Version, nur die 47.0 der Komponente.

Daraus folgen drei Dinge. Erstens sind Lizenz und aktive Funktion zwei verschiedene Sachen. Eine Org kann jahrelang für die Manufacturing Cloud zahlen und nur Sales Agreements nutzen. Zweitens hängen Funktionen voneinander ab: Das Programmgeschäft braucht laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) Advanced Account Forecasting, Data Pipelines und eigene Berechtigungssätze. Drittens sind die Schalter Metadaten. Sie gehören in die Versionsverwaltung und den Release-Prozess wie jede andere Einstellung, nicht in einen Klick in der Produktion.

## Manufacturing Cloud oder Agentforce Manufacturing: welcher Name gilt?

Beide. Die Preisseite verkauft „Manufacturing Cloud Sales Core“, ihre Fußnoten sprechen von „Agentforce Manufacturing for Sales“. Trailhead nennt das ganze Produkt Agentforce Manufacturing. Es ist ein Produkt mit zwei Namen.

Der Name macht in der Praxis Ärger. Trailhead führt „Agent-powered sales agreements“, die Beschreibung handelt aber von langfristigen Vereinbarungen über Preise und Produkte, eine Agentenaktion wird nicht genannt. „Agentforce for sales planning“ ist dagegen eine echte Agentenvorlage mit drei dokumentierten Subagenten, wie in [was der Sales-Planning-Agent wirklich tut](../agentforce-vertriebsplanung-rahmenvertraege/) beschrieben. Und die automatische Prognose für neue Produkte, die Trailhead Agentforce Manufacturing zuschreibt, ist eine geplante Berechnung.

Meine Frage in jedem Hersteller-Workshop ist deshalb dieselbe: welcher Subagent, welche Aktion, welche Lizenz? Für Core nennt die Preisseite Agentforce über Flex Credits, und Salesforce verkauft das Add-on Agentforce for Manufacturing Cloud; die volle Agentforce-for-Industries-Ausstattung gibt es nur in den Max-Editionen.

## Ein typisches Szenario, als Annahme

Ein Hersteller von Hydraulikkomponenten bekommt ein Angebot über 120 Nutzer Sales Core und 40 Nutzer Service Core. Der Business Case nennt sechs Punkte: Sales Agreements mit Händlern, Ziele pro Account Manager, quartalsweise Besuche bei 60 Händlern, Garantieansprüche von Händlern über ein Portal, Preisschutz für Distributoren und einen Agenten für Fragen zu Rahmenverträgen.

Abgeglichen mit den Funktionslisten:

1. **Sales Agreements und Ziele:** in der Vertriebsliste, jeweils mit eigenem Schalter.
2. **Händlerbesuche:** Schalter in den Manufacturing-Einstellungen, aber unter Channel Revenue Management gelistet. Lizenz offen.
3. **Garantieansprüche:** eine Servicefunktion, die Sachbearbeiter brauchen also Service Core. Die Händler brauchen zusätzlich Portallizenzen.
4. **Preisschutz:** Channel Revenue Management, 30.000 $ pro Org und Jahr.
5. **Agent:** Add-on für Core-Nutzer oder eine Max-Edition.

Nur zwei der sechs Punkte sind mit der Edition im Angebot erledigt. Die anderen vier brauchen eine eigene Zeile.

## Was sollte im Angebot ausdrücklich stehen?

1. **Jede Funktion aus dem Business Case mit Namen**, mit der Edition oder dem Add-on, das sie abdeckt.
2. **Vertrieb oder Service pro Nutzergruppe**, damit Garantiesachbearbeiter nicht auf Sales Core landen.
3. **Kanalfunktionen:** Rebate Management, Partner Visit und Partner Performance Management, enthalten oder Channel Revenue Management.
4. **Portallizenzen** pro externer Nutzergruppe.
5. **Agentforce:** Add-on oder Max, und die Einheit, in der abgerechnet wird.
6. **Plattformgrenzen:** Flex Credits, Omnistudio- und Business-Rules-Engine-Aufrufe der Edition.
7. **Die Preisbasis:** Die Fußnoten der Preisseite widersprechen sich bei Enterprise und Unlimited Edition.

Diese Liste ist die erste Hälfte von Kapitel 1 der [Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/einordnung-und-business-case/). Die Funktionen gegen eine Eigenentwicklung abzuwägen, gehört zu meiner Arbeit bei [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Die Manufacturing Cloud enthält viel, aber Ihrem Business Case hilft nur, was im Angebot steht und in der Org eingeschaltet ist. Wenn bei Ihnen ein Angebot liegt und Sie es Funktion für Funktion prüfen lassen möchten, [schreiben Sie mir](#contact).
