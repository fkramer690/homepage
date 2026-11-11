---
title: "Wartungsverträge wiederkehrend abrechnen mit Revenue Cloud"
description: "Wie ein Maschinenbauer Wartungsverträge in Revenue Cloud als Abo verkauft, quartalsweise abrechnet und die Serviceseite an Field Service übergibt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: wartungsvertraege-wiederkehrend-abrechnen
translationKey: service-contracts-recurring-billing
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, Wartungsverträge, wiederkehrende Abrechnung, Field Service, Abonnements, Maschinenbau]
takeaways:
  - "Ich wickle jede Erweiterung, Verlängerung oder Kündigung über Angebot und Auftrag ab, damit Abrechnung und Asset-Historie zusammenpassen."
  - "Field Service kennt die Abos aus Revenue Cloud nicht. Servicevertrag, Wartungsplan und Entitlement müssen aus dem verkauften Vertrag entstehen."
  - "Das Asset beantwortet, was zu welchem Preis verkauft wurde. Der Servicevertrag beantwortet, welche Maschine welches Servicelevel hat."
  - "Fakturiert SAP Maschinen und Ersatzteile und ist Wartung ein kleiner Anteil, bleibt die Rechnung meist in SAP; Steuer und Debitoren entscheiden mit."
faq:
  - q: "Wie rechnet Revenue Cloud einen Wartungsvertrag quartalsweise ab?"
    a: "Der Vertrag wird als Abo-Produkt verkauft. Bei Aktivierung des Auftrags entstehen Billing Schedules je Auftragsposition: Die Billing Frequency der Position legt den Quartalsrhythmus fest, Billing Policy und Billing Treatment zum Beispiel die Abrechnung im Voraus. Ein Invoice Scheduler erfasst dann alle Schedules, die bereit zur Fakturierung sind, und erstellt die Rechnungen."
  - q: "Was passiert in Revenue Cloud, wenn ein Kunde Maschinen in einen laufenden Vertrag aufnimmt?"
    a: "Sie ändern das Asset mit Amend. Revenue Cloud erzeugt ein Änderungsangebot mit Startmenge, Änderung und Endmenge und anschließend einen Auftrag. Die Aktivierung erzeugt eine neue Asset State Period und neue Billing Schedules, die mit den ursprünglichen verknüpft sind."
  - q: "Legt Revenue Cloud den Servicevertrag in Field Service an?"
    a: "Eine dokumentierte Standardverbindung zwischen einem Abo in Revenue Cloud und dem Servicevertrag in Field Service habe ich nicht gefunden. Planen Sie dafür eine eigene Automatisierung, meist als Flow bei der Aktivierung des Auftrags, der den Servicevertrag, seine Vertragspositionen und das Entitlement anlegt oder aktualisiert."
  - q: "Sollten Wartungsrechnungen aus Revenue Cloud Billing oder aus SAP kommen?"
    a: "Revenue Cloud Billing passt, wenn Wartungsverträge oft in Salesforce verkauft und geändert werden und einen großen Teil des Umsatzes ausmachen. Fakturiert SAP Maschinen und Teile und ist Wartung ein kleiner Zusatz, vermeiden Sie mit der Rechnung aus SAP ein zweites Abrechnungssystem."
draft: false
---

In Revenue Cloud wird ein Wartungsvertrag als Abo im Angebot verkauft. Mit der Aktivierung des Auftrags legt Revenue Cloud ein Asset mit Asset State Periods und Billing Schedules an, und ein Invoice Scheduler erzeugt daraus Rechnungen, zum Beispiel quartalsweise im Voraus. Im Standardablauf erfolgt jede Erweiterung, Verlängerung oder Kündigung über ein neues Angebot und einen neuen Auftrag. Field Service greift auf diese Daten nicht zu. Servicevertrag, Wartungsplan und Entitlement steuern die Einsätze, und die müssen Sie selbst aus dem verkauften Vertrag erzeugen. Meine Regel: Das Asset in Revenue Cloud beantwortet, was zu welchem Preis verkauft wurde, der Servicevertrag, welche Maschine welches Servicelevel hat.

## Wie wird ein Wartungsvertrag in Revenue Cloud zu wiederkehrendem Umsatz?

Der Wartungsvertrag ist ein Produkt mit einem Abo-Verkaufsmodell. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_productsellingmodel.htm) legt ein Product Selling Model fest, wie ein Produkt verkauft wird: einmalig, als unbefristetes Abo oder als Abo mit fester Laufzeit, einschließlich der Laufzeit. Ein Wartungsvertrag über drei Jahre mit jährlicher Verlängerung ist ein Abo mit fester Laufzeit.

Der Vertrieb nimmt ihn wie jedes andere Produkt in das Angebot auf. Wird das Angebot zum Auftrag und der Auftrag aktiviert, werden laut der [Trailhead-Einheit zu Billing Schedules](https://trailhead.salesforce.com/de/content/learn/modules/billing-management-with-revenue-cloud/generate-billing-schedules) zwei Flows ausgeführt, sobald Sie sie eingerichtet und aktiviert haben: Order to Asset und Order to Billing Schedule. Danach hat der Kunde ein Asset für den Vertrag, und Billing hat eine Billing Schedule Group mit einem Billing Schedule je Auftragsposition.

Die Namensfrage stellt sich in jedem Projekt, daher die Einordnung: Salesforce verkauft das Produkt als Revenue Cloud, Trailhead nennt es Agentforce Revenue Management, der Developer Guide Revenue Management. Gemeint ist dasselbe Produkt.

## Der Invoice Scheduler macht aus Billing Schedules Rechnungen

Drei Datensätze entscheiden, wie eine Auftragsposition abgerechnet wird. Die [Trailhead-Einheit zu Billing Policies](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/create-billing-policies-and-treatments) beschreibt sie:

| Datensatz | Was er festlegt |
|---|---|
| Billing Policy | Welches Billing Treatment für ein Auftragsprodukt gilt, nach Rechtseinheit, Standard oder manuell |
| Billing Treatment | Die Regeln der Abrechnung, einschließlich Ausschluss von der Abrechnung |
| Billing Treatment Item | Wie der Betrag verteilt wird: im Voraus, nachträglich oder nach Meilensteinen |

Für Wartungsverträge ist die Abrechnung im Voraus üblich. Der Ausschluss von der Abrechnung hilft bei Kulanzverträgen oder Garantieverlängerungen, die gar keine Rechnung erzeugen sollen; ein Produkt zum Preis null ist ein eigener Fall.

Rechnungen werden über Invoice Scheduler erstellt. Laut der [Trailhead-Einheit zu Rechnungen](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices) hat ein Scheduler ein Start- und Enddatum, eine Laufhäufigkeit, eine Option zum Buchen und einen Billing Batch, und er verarbeitet alle Schedules mit dem Status "Ready for Invoicing". Für große Läufe wird die Data Processing Engine genutzt. Tax Policies und Tax Treatments legen die Steuer-Engine fest, entweder die Revenue Standard Tax Engine von Salesforce oder eine externe über einen Adapter. Rechtseinheiten (Legal Entities) trennen Steuern und Buchungsperioden je Gesellschaft. Das ist wichtig für Hersteller mit Vertriebsgesellschaften in mehreren Ländern.

Ein Punkt für deutsche Kunden: Ab dem 1. Januar 2027 müssen Unternehmen mit mehr als 800.000 Euro Vorjahresumsatz im inländischen B2B-Geschäft E-Rechnungen ausstellen, ab 2028 alle, so die [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094). Eine Wartungsrechnung je Quartal an einen deutschen Geschäftskunden gehört in der Regel dazu; prüfen Sie die Ausnahmen. Was das für Revenue Cloud heißt, steht im Beitrag zur [E-Rechnung ab 2027](../e-rechnung-pflicht-2027-revenue-cloud/).

## Jede Änderung läuft über Angebot und Auftrag

Im Standardablauf für Managed Assets wird jede Änderung am Vertrag über ein Angebot und anschließend über einen Auftrag abgebildet. Die Lifecycle-Aktionen können auch direkt einen Auftrag erzeugen; ist eine kaufmännische Freigabe erforderlich, machen Sie den Weg über das Angebot zur Regel. Die [Trailhead-Einheit zu Änderungen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) zeigt die Felder: die Startmenge, die Änderung als positive oder negative Zahl und die Endmenge. Nach der Aktivierung enthält eine neue Asset State Period die neue Menge, und eine Asset Action dokumentiert die Änderung, etwa mit "Upsells" im Feld Business Category. Billing legt neue Billing Schedules an, die mit den ursprünglichen verknüpft sind, so bleibt nachvollziehbar, was sich wann geändert hat.

Für Verlängerungen gibt es laut der [Einheit zu Verlängerung und Kündigung](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) zwei Wege: automatisch mit der hinterlegten Verlängerungslaufzeit oder mit eigenem Start- und Enddatum. Eine Verlängerung erzeugt eine neue Asset State Period. Bei einer Kündigung wird die Menge auf den negativen Gesamtwert gesetzt, die Endmenge ist also null, und laut [Kündigungsbeispiel](https://help.salesforce.com/s/articleView?id=ind.qocal_asset_cancellation_example.htm&type=5) wird ein abschließender Zeitraum mit Menge null und Status Cancelled erzeugt. Negative Rechnungspositionen können zu Gutschriftspositionen werden, wenn die Einstellung dafür aktiv ist.

```hinweis achtung
Ein Serviceleiter, der am Telefon eine Maschine in den Vertrag aufnimmt, ändert damit in Billing noch nichts. Die Änderung zählt erst, wenn sie über ein Änderungsangebot erfasst wird.
```

## Was braucht Field Service aus dem Vertrag?

Field Service arbeitet mit eigenen Objekten. Wie ich in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/) beschreibe, hält der Servicevertrag fest, was verkauft wurde, Vertragspositionen nennen die abgedeckten Assets, der Wartungsplan erzeugt die geplanten Einsätze, und das Entitlement überwacht mit Entitlement-Prozess und Meilensteinen die zugesagte Reaktionszeit.

Beide Clouds nutzen das Objekt Asset, aber für verschiedene Dinge. Das Asset in Revenue Cloud ist das verkaufte Abo mit Menge, Preis und Laufzeit. Das Asset in Field Service ist die physische Maschine mit Seriennummer, Standort und Historie. Ich würde beide als getrennte Datensätze führen und nicht versuchen, das Abo zusätzlich am Maschinen-Asset abzubilden. Wie die beiden Sichten auf Assets zusammenpassen, steht in [Assets, Nachträge und Verlängerungen](../revenue-cloud-assets-nachtraege-verlaengerungen/).

Eine dokumentierte Standardverbindung zwischen einem Abo in Revenue Cloud und dem Servicevertrag in Field Service habe ich nicht gefunden. Planen Sie dafür also eine eigene Automatisierung: Bei Aktivierung des Auftrags legt ein Flow den Servicevertrag an oder ändert ihn, nimmt die abgedeckten Maschinen als Vertragspositionen auf und vergibt das Entitlement für das verkaufte Servicelevel. Änderungen und Kündigungen folgen demselben Weg.

```ablauf
sf: Angebot, Auftrag, Asset, Billing Schedules, Rechnung
ext: Servicevertrag
Angebot --> Auftrag
Auftrag --Aktivierung--> Asset
Auftrag --Aktivierung--> Billing Schedules
Billing Schedules --Invoice Scheduler--> Rechnung
Auftrag --Flow--> Servicevertrag
```

Die Seite von Field Service, einschließlich Wartungsplänen nach Kalender oder Betriebsstunden, steht im [Kapitel zu Assets und Wartung](../../masterclass/field-service/field-service-assets-wartung-teile/).

## Welcher Datensatz beantwortet, was verkauft wurde?

Ein Datensatz muss für den kaufmännischen Vertrag führend sein, sonst arbeiten Vertrieb, Service und Finanzen mit drei unterschiedlichen Versionen. Meine Aufteilung:

- **Asset in Revenue Cloud:** was verkauft wurde, Menge, Preis, Laufzeit, Verlängerung. Änderungen nur über Angebote.
- **Servicevertrag in Field Service:** welche Maschinen abgedeckt sind und welches Servicelevel gilt. Wird aus dem Asset in Revenue Cloud angelegt und geändert, bei kaufmännischen Änderungen nie von Hand.
- **Maschinen-Asset:** Seriennummer, Standort, installierte Basis. Gehört dem Service und stammt meist aus dem ERP.

Legen Sie das für jedes Objekt fest, wie in einer [Object Ownership Matrix](../object-ownership-matrix-salesforce/). Die Schwachstelle liegt beim dritten Fall: Eine Maschine wird im Vertrag getauscht, der Service ersetzt das Asset in der Vertragsposition, und niemand prüft, ob sich der Preis ändert.

## Rechenbeispiel: 800 Maschinen in drei Wartungsstufen

Ein Maschinenbauer hat für 800 Maschinen bei 150 Kunden Wartungsverträge in drei Stufen: jährliche Inspektion, dieselbe Leistung mit 24 Stunden Reaktionszeit und eine Premiumstufe mit 8 Stunden. Die Verträge laufen drei Jahre und werden quartalsweise im Voraus abgerechnet.

In Revenue Cloud ist jede Stufe ein Abo-Produkt mit eigenem Preis, die Zahl der Maschinen ist die Menge. Die Aktivierung des Auftrags erzeugt Asset und Billing Schedules; ein Invoice Scheduler läuft zu Quartalsbeginn und bucht 150 Rechnungen. Ein Flow legt den Servicevertrag in Field Service an, nimmt die Maschinen als Vertragspositionen auf und weist das Entitlement der Stufe zu. Welche Seriennummern abgedeckt sind, muss an geeigneter Stelle erfasst werden, etwa als Maschinenauswahl an der Angebotsposition, denn aus der Menge allein geht nicht hervor, welche fünf Maschinen neu sind. Nimmt ein Kunde mitten im Quartal fünf Maschinen hinzu, erfasst ein Änderungsangebot sie zum Änderungsdatum, der Auftrag erzeugt neue Billing Schedules, und der Flow ergänzt fünf Vertragspositionen.

Zu den Billing Events: Summieren sich die Verträge auf 2,4 Millionen US-Dollar im Jahr, verbrauchen die Rechnungen mindestens 48.000 Events. Grundlage ist ein Event je angefangene 50 US-Dollar Rechnungsbetrag; durch Rundung je Rechnung ist es etwas mehr, laut [Rate Sheet vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf). Den Preis je Event veröffentlicht Salesforce nicht.

## Den Anteil der Wartung am Umsatz prüfen

Revenue Cloud Billing lohnt sich, wenn Wartungs- und Serviceverträge oft in Salesforce verkauft und geändert werden und einen wesentlichen Anteil am Umsatz haben. Fakturiert SAP Maschinen und Ersatzteile und ist Wartung ein kleiner Zusatz, würde ich die Rechnungsstellung in SAP belassen und Revenue Cloud für Angebot, Auftrag und Asset nutzen. Die Abwägung steht in [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/). Nutzungsbasierte Verträge folgen derselben Logik und werden in [Pay-per-Use für Maschinen](../pay-per-use-maschinen-revenue-cloud/) behandelt. Das Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) fasst diese Beiträge zusammen.
