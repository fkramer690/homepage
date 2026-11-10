---
title: "Manufacturing Cloud Funktionen: was enthalten ist"
description: "Welche Funktionen die Manufacturing Cloud für Vertrieb, Service und Händler mitbringt, welche einzeln eingeschaltet werden und welche Salesforce extra verkauft."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-funktionen-ueberblick
translationKey: manufacturing-cloud-feature-map
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Lizenzen, Sales Agreements, Garantie, Händlerkanal, Make-or-buy]
takeaways:
  - "Die zentralen Vertriebs- und Partnerfunktionen haben in IndustriesManufacturingSettings jeweils eine eigene Einstellung, die standardmäßig deaktiviert ist."
  - "Ship and Debit gehört zu Channel Revenue Management für 30.000 $ pro Org und Jahr. Rückrufkampagnen und Reparaturschätzungen gibt es per Add-on."
  - "Nicht jede Funktion mit Agentforce im Namen ist ein Agent. Fragen Sie nach Subagent, Aktion und Lizenz."
  - "Ein Angebot sollte jede Funktion aus dem Business Case mit der Lizenz nennen, die sie abdeckt, nicht nur die Edition."
faq:
  - q: "Welche Funktionen enthält die Salesforce Manufacturing Cloud?"
    a: "Für den Vertrieb enthält sie Sales Agreements, Account Forecasting, Programmgeschäft, Account Manager Targets und Besuchsmanagement. Für den Service enthält sie je nach Edition Service Console, Asset Service Console und Garantiemanagement. Für den Kanal enthält sie Partner Lead, Performance und Visit Management. Servicekampagnen, Work Order Estimation und Bestandsfunktionen gehören zum Add-on Asset Service Lifecycle Management, Rebates sowie Ship and Debit gehören zu Channel Revenue Management."
  - q: "Ist Manufacturing Cloud dasselbe wie Agentforce Manufacturing?"
    a: "Ja. Produkt- und Preisseiten sprechen von Manufacturing Cloud, etwa Manufacturing Cloud Sales Core. Trailhead und die Fußnoten der Preisseite sprechen von Agentforce Manufacturing. Gemeint ist dasselbe Produkt. Agentforce for Manufacturing, mit „for“, ist etwas anderes: die Agentenvorlagen, verkauft als Add-on für Nutzer von Core und Advanced."
  - q: "Gehört Ship and Debit zur Manufacturing Cloud?"
    a: "Trailhead führt es unter den Funktionen von Agentforce Manufacturing, beschreibt Ship and Debit Process Management aber als Funktion von Channel Revenue Management. Die Add-on-Seite verkauft Channel Revenue Management for Manufacturing separat für 30.000 $ pro Org und Jahr."
  - q: "Wie sehe ich, welche Funktionen in meiner Org aktiv sind?"
    a: "Prüfen Sie die Manufacturing-Einstellungen im Setup oder lesen Sie die Metadaten IndustriesManufacturingSettings aus. Vertriebs- und Partnerfunktionen wie Advanced Account Forecasting, Programme, Account Manager Targets und Partner Visit Management haben je ein eigenes Feld, standardmäßig false. Garantie, Konsolen und Add-ons werden an anderer Stelle aktiviert."
draft: false
---

Die Salesforce Manufacturing Cloud enthält drei Gruppen von Funktionen: Sales Agreements, Prognosen, Programme, Ziele und Besuche für den Vertrieb, Garantie und zwei Konsolen für den Service sowie Partnerfunktionen für den Händlerkanal. Die zentralen Vertriebs- und Partnerfunktionen werden einzeln eingeschaltet. Der Satz „Wir haben die Manufacturing Cloud“ sagt deshalb wenig darüber, was tatsächlich läuft. Einige Funktionen, die Salesforce direkt daneben aufführt, werden extra verkauft, darunter Boni, Ship and Debit, Rückrufkampagnen und Connected Assets. Bevor ein Angebot unterschrieben wird, sollte jede Funktion, von der der Business Case abhängt, darin stehen, zusammen mit der Lizenz, die sie abdeckt.

## Was enthält die Manufacturing Cloud für den Vertrieb?

Die Manufacturing Cloud ist eine Industry Cloud auf Basis von Sales Cloud und Service Cloud, mit einem eigenen Datenmodell für Hersteller. Ob sie sich überhaupt lohnt, steht in [wann lohnt sich die Manufacturing Cloud](../manufacturing-cloud-wann-lohnt-sie-sich/). Hier geht es um die engere Frage, was im Paket steckt. Die [Produktseite für den Vertrieb](https://salesforce.com/manufacturing/cloud/sales) und der [Trailhead-Überblick](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennen fünf Vertriebsfunktionen:

| Funktion | Was sie tut | Welche Frage sie beantwortet |
|---|---|---|
| Sales Agreements | Rahmenverträge mit geplanten Mengen, Preis, Kosten und Marge pro Zeitraum; Ist-Werte aus ERP oder Auftragsverwaltung | Welcher Kunde bleibt hinter der zugesagten Menge zurück? |
| Account Forecasting | Prognose über Neugeschäft und laufendes Geschäft, mit Formel-Editor und Übergabe an Absatz- und Finanzplanung | Was nimmt jeder Kunde pro Produkt und Monat ab? |
| Programmgeschäft | Marktgröße pro Hersteller und Programm, externe Bedarfsdaten, Komponentenprognosen | Wie viele Komponenten braucht ein OEM-Programm? |
| Account Manager Targets | Ziele von oben nach unten, nach Menge, Umsatz oder eigener Kennzahl | Liegt das Team pro Kunde, Produkt und Region im Plan? |
| Besuchsmanagement | Besuche aus Aktionsplanvorlagen geplant, Aufgaben und Kennzahlen mobil erfasst | Was hat der Vertrieb beim Kunden oder Händler geprüft? |

Prognosen gibt es zweimal: Die Einstellungen kennen einen Schalter für Account Forecasts und einen für Advanced Account Forecasting. Der Trailhead-Überblick nennt nur die erweiterte Variante. Wie sie arbeitet und wo sie endet, steht in [Account Forecasting für die Absatzprognose](../account-forecasting-absatzprognose-vertrieb/), das Programmgeschäft in [Programmgeschäft: Prognosen für Zulieferer](../programmgeschaeft-zulieferer-prognose/).

Trailhead nennt außerdem Product Catalog Management, das Produktdefinitionen und Preisstrukturen an einer Stelle verwaltet. Einfache Angebote bringt die zugrunde liegende Sales Cloud mit. Ein Angebotssystem mit Konfigurator, komplexer Preisfindung, Freigaben und Vertragserstellung taucht in keiner dieser Listen auf; dafür würde ich Revenue Cloud prüfen.

## Für den Service kommen Garantie, Kampagnen und zwei Konsolen dazu

Die [Produktseite für den Service](https://salesforce.com/manufacturing/cloud/service) nennt drei Blöcke:

- **Service Console.** Eine Zeitleiste der Kundenkontakte, Hinweise auf auslaufende Garantien, Probleme mit Anlagen, Lieferverzug und offene Fälle sowie Aktionen wie einen Garantieanspruch anlegen oder eine Garantieverlängerung verkaufen.
- **Asset Service Console.** Eine Sicht pro Anlage mit Meilensteinen, Seriennummer, zugehörigen Accounts und Kontakten, Garantien, Fällen, Arbeitsaufträgen und Ansprüchen.
- **Garantiemanagement.** Garantieprogramme nach Laufzeit, Nutzungsgrenzen und abgedeckten Teilen, Geschäftsregeln für die Freigabe von Ansprüchen und Ansprüche, die Partner und Kunden über Portale oder API einreichen.

Trailhead ergänzt drei weitere Funktionen: Product Service Campaigns für Rückrufe und Nachrüstungen an einer definierten Gruppe von Assets, Prework Estimation, also die Schätzung von Arbeit, Teilen und Kosten vor Arbeitsbeginn, und Bestandsfunktionen für Teileverfügbarkeit und Nachschub. Die Salesforce-Hilfe führt alle drei unter [Asset Service Lifecycle Management](https://help.salesforce.com/s/articleView?id=xcloud.aslm_psc_enable_aslm.htm&language=en_US&type=5), die Schätzung heißt dort Work Order Estimation. Die [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) verkauft dieses Add-on für 75 $ pro Nutzer und Monat für Field-Service-Editionen. Trailhead beschreibt Fähigkeiten, nicht den Lizenzumfang.

Die Preisseite führt den Service als eigene Edition auf, Service Core zu 275 $ pro Nutzer und Monat, und fasst beide Seiten nur in Sales & Service Max zu 700 $ zusammen. Die Vergleichstabelle ordnet Funktionen den einzelnen Editionen zu. In der Textfassung, die ich gelesen habe, waren die Häkchen jedoch nicht auslesbar; prüfen Sie die Tabelle auf der Seite und im Angebot. Die Einsatzplanung für Techniker und die mobile App im Außendienst gehören zu Field Service mit eigenen Lizenzen, sofern kein Paket im Angebot sie enthält, wie in [lohnt sich Salesforce Field Service](../salesforce-field-service-lohnt-sich/) beschrieben.

## Was steckt für Händler und den Kanal drin?

Hier werden die Listen unübersichtlich. Trailhead ordnet die Kanalfunktionen unter zwei Überschriften:

- **Rebates:** Rebate Management, Ship and Debit Process Management, Price Protection und Agentforce for Channel Revenue Management.
- **Channel Revenue Management:** Partner Visit Management, ein Actionable Relationship Center und ein Dashboard zur Händlerleistung.

Das [Trailhead-Modul zu Ship and Debit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) ist eindeutig: „Ship and Debit Process Management is a feature within Channel Revenue Management.“ Und die [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) verkauft Channel Revenue Management for Manufacturing separat, für 30.000 $ pro Org und Jahr. Eine Funktion aus der Liste von Agentforce Manufacturing ist im Angebot also ein Add-on.

Partner Visit Management ist der umgekehrte Fall. Es hat einen eigenen Schalter in den Manufacturing-Einstellungen, neben Partner Lead Management und Partner Performance Management, steht bei Trailhead aber unter der Überschrift Channel Revenue Management. Die Salesforce-Hilfe beschreibt es als [Funktion der Manufacturing Cloud](https://help.salesforce.com/s/articleView?id=ind.mfg_pvm_container.htm&language=en_US&type=5) in Enterprise und Unlimited Edition, was gegen das Add-on spricht. Die Trailhead-Überschrift allein beweist weder das eine noch das andere.

```hinweis offen
Lassen Sie im Bestellschein bestätigen, dass Ihre Edition die Berechtigungssätze für Partner Visit Management bereitstellt, bevor Sie Händlerbesuche darauf aufbauen.
```

Rebate Management selbst beschreibe ich in [Teil 5 der Serie](../rebate-management-haendlerboni/). Die Salesforce-Hilfe knüpft die Rebate-Berechtigungen für Portalnutzer an eine Add-on-Lizenz für Rebate Management, planen Sie es also als Add-on, nicht als Teil der Edition. Die widersprüchlichen Preise stehen in [Manufacturing Cloud Add-ons: was extra kostet](../manufacturing-cloud-zusatzkosten-add-ons/).

## Zentrale Vertriebs- und Partnerfunktionen haben eigene Schalter

Salesforce hat sie so gebaut. Die [Metadaten IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) enthalten pro Vertriebs- und Partnerfunktion ein boolesches Feld, das standardmäßig false ist. Garantie, Konsolen und Add-ons werden an anderen Stellen aktiviert:

| Einstellung | Funktion | Seit API |
|---|---|---|
| enableIndManufacturing | Sales Agreements | 47.0 (Komponente) |
| enableIndustriesMfgAccountForecast | Account Forecasts | 47.0 (Komponente) |
| enableIndustriesMfgAdvForecast | Advanced Account Forecasting | 47.0 (Komponente) |
| enableIndustriesMfgTargets | Account Manager Targets | 49.0 |
| enableIndustriesMfgProgram | Manufacturing Programs | 54.0 |
| enablePartnerLeadManagement, enablePartnerPerformanceManagement, enablePartnerVisitManagement | Partnerfunktionen | 56.0 |
| enableFleetManagement | Flottenverwaltung | 59.0 |

Für die ersten drei Felder nennt die Seite keine eigene API-Version, sondern nur die 47.0 der Komponente.

Lizenz und aktive Funktion sind zwei verschiedene Sachen. Eine nutzbare Funktion setzt vier Ebenen voraus: Edition oder Add-on im Vertrag, die Einstellung in der Org, die Permission Set License des Nutzers und den Berechtigungssatz mit Datenzugriff. Externe Nutzer brauchen zusätzlich ihre Experience-Cloud-Lizenz. Eine Org kann jahrelang für die Manufacturing Cloud zahlen und nur Sales Agreements nutzen. Dazu hängen Funktionen voneinander ab: Das Programmgeschäft braucht laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) Advanced Account Forecasting, Data Pipelines und eigene Berechtigungssätze. Die Schalter sind Metadaten. Sie gehören wie jede andere Einstellung in die Versionsverwaltung und den Release-Prozess und sollten nicht direkt in der Produktionsumgebung angeklickt werden.

## Manufacturing Cloud und Agentforce Manufacturing sind dasselbe Produkt

Beide Namen werden verwendet. Die Preisseite verkauft „Manufacturing Cloud Sales Core“, ihre Fußnoten sprechen von „Agentforce Manufacturing for Sales“. Trailhead nennt das gesamte Produkt Agentforce Manufacturing. Es ist ein Produkt mit zwei Namen.

Die doppelte Benennung führt in der Praxis zu Verwechslungen. Trailhead führt „Agent-powered sales agreements“ auf. Die Beschreibung behandelt aber langfristige Vereinbarungen über Preise und Produkte, ohne eine Agentenaktion zu nennen. „Agentforce for sales planning“ ist dagegen eine Agentenvorlage mit drei dokumentierten Subagenten, wie in [was der Sales-Planning-Agent wirklich tut](../agentforce-vertriebsplanung-rahmenvertraege/) beschrieben. Und die automatische Prognose für neue Produkte, die Trailhead Agentforce Manufacturing zuschreibt, ist eine geplante Berechnung.

In jedem Hersteller-Workshop würde ich deshalb dieselbe Frage stellen: Welcher Subagent, welche Aktion, welche Lizenz? Achten Sie auf das kleine Wort: Agentforce Manufacturing ist das Produkt, Agentforce for Manufacturing bezeichnet die Agentenvorlagen. Für Core weist die Preisseite Agentforce über Flex Credits aus, und die Add-on-Seite verkauft das Add-on Agentforce for Manufacturing Cloud für 150 $ pro Nutzer und Monat für Core und Advanced; die volle Agentforce-for-Industries-Ausstattung gibt es nur in den Max-Editionen.

## Rechenbeispiel: Angebot für einen Hydraulikhersteller

Angenommen, ein Hersteller von Hydraulikkomponenten bekommt ein Angebot über 120 Nutzer für Sales Core und 40 Nutzer für Service Core. Der Business Case nennt sechs Punkte: Sales Agreements mit Händlern, Ziele pro Account Manager, quartalsweise Besuche bei 60 Händlern, Garantieansprüche von Händlern über ein Portal, Preisschutz für Distributoren und einen Agenten für Fragen zu Rahmenverträgen.

Abgeglichen mit den Funktionslisten:

1. **Sales Agreements und Ziele:** in der Vertriebsliste, jeweils mit eigenem Schalter.
2. **Händlerbesuche:** Schalter in den Manufacturing-Einstellungen und als Funktion der Manufacturing Cloud dokumentiert; die Berechtigungen müssen bestätigt werden.
3. **Garantieansprüche:** eine Servicefunktion, die Sachbearbeiter brauchen also Service Core. Die Händler brauchen zusätzlich Portallizenzen.
4. **Preisschutz:** Channel Revenue Management, 30.000 $ pro Org und Jahr.
5. **Agent:** Add-on Agentforce for Manufacturing für 150 $ pro Nutzer und Monat für Core-Nutzer oder eine Max-Edition.

Nur zwei der sechs Punkte sind mit der Edition klar abgedeckt, die Händlerbesuche sehr wahrscheinlich ebenfalls. Garantie, Preisschutz und Agent brauchen jeweils eine eigene Zeile, und die Experience-Cloud-Lizenzen der Händler kommen dazu.

## Was sollte im Angebot ausdrücklich stehen?

1. **Jede Funktion aus dem Business Case mit Namen**, mit der Edition oder dem Add-on, das sie abdeckt.
2. **Vertrieb oder Service pro Nutzergruppe**, damit Garantiesachbearbeiter nicht auf Sales Core landen.
3. **Kanalfunktionen:** Für Rebate Management, Partner Visit und Partner Performance Management festhalten, ob die Edition sie enthält oder Channel Revenue Management nötig ist.
4. **Portallizenzen** pro externer Nutzergruppe.
5. **Agentforce:** Add-on oder Max, und die Einheit, in der abgerechnet wird.
6. **Permission Set Licenses** pro Nutzergruppe, denn sie entscheiden, wer eine Funktion tatsächlich nutzen kann.
7. **Plattformgrenzen:** Flex Credits, Omnistudio- und Business-Rules-Engine-Aufrufe der Edition.
8. **Die Preisbasis:** Die Fußnoten der Preisseite widersprechen sich bei Enterprise und Unlimited Edition.

Diese Liste entspricht der ersten Hälfte von Kapitel 1 der [Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/einordnung-und-business-case/). Die Funktionen gegenüber einer Eigenentwicklung abzuwägen, gehört zu meiner Arbeit bei [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
