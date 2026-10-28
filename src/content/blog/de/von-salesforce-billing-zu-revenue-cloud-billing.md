---
title: "Von Salesforce Billing zu Revenue Cloud Billing"
description: "Was mit offenen Rechnungen, Abrechnungsplänen und Zahlungen passiert, wenn Sie vom Paket Salesforce Billing zu Revenue Cloud Billing wechseln, und wer freigibt."
pubDate: 2026-10-28
lang: de
slug: von-salesforce-billing-zu-revenue-cloud-billing
translationKey: salesforce-billing-to-revenue-cloud-billing
topic: revenue
categories: [revenue-cloud]
tags: [Salesforce Billing, Revenue Cloud Billing, Migration, Cutover, Finanzen]
takeaways:
  - "Salesforce Billing ist ein Managed Package mit dem Namespace blng. Revenue Cloud Billing läuft auf Standardobjekten wie Invoice, CreditMemo, BillingSchedule und AccountingPeriod."
  - "Laut Salesforce behalten heutige Billing-Kunden vollen Zugriff einschließlich Support. Neukunden und Kunden, die modernisieren wollen, bekommen Revenue Cloud Advanced und Revenue Cloud Billing."
  - "Abrechnungspläne entstehen in Revenue Cloud aus Aufträgen. Sie kommen also aus migrierten Assets und Aufträgen, nicht aus einer Kopie der alten Pläne."
  - "Ich stelle zum Ende einer Buchungsperiode um: offene Rechnungen im Paket abschließen, offene Salden übernehmen, abgeschlossene Historie lesbar halten oder archivieren."
  - "Die Finanzabteilung gibt den Billing-Cutover frei, einschließlich Steuer-Engine, Zahlungsanbieter, Buchungen ins ERP und Rechnungsnummern."
faq:
  - q: "Wird Salesforce Billing noch unterstützt?"
    a: "Ja. Ein Salesforce-Sprecher sagte SalesforceBen im März 2025, dass heutige Kunden von Salesforce CPQ und Salesforce Billing weiterhin vollen Zugriff einschließlich Kundensupport erhalten. Eine eigene Verkaufsende-Aussage zum Billing-Paket habe ich auf den Seiten von Salesforce nicht gefunden."
  - q: "Lassen sich Rechnungen aus Salesforce Billing in Revenue Cloud Billing umwandeln?"
    a: "Eine Umwandlung an Ort und Stelle gibt es nicht, weil Paketobjekte und Standardobjekte verschieden sind. Die Salesforce-Hilfe behandelt Billing-Daten als eigenes Migrationsthema. Ich würde offene Salden übernehmen und abgeschlossene Rechnungen als lesbare Historie behalten."
  - q: "Wann ist der beste Zeitpunkt für den Wechsel des Abrechnungssystems?"
    a: "Zum Ende einer Buchungsperiode, nach dem letzten Rechnungslauf im alten Paket und nachdem die Finanzabteilung das Nebenbuch mit dem ERP abgestimmt hat. Dann starten die Eröffnungssalden im neuen System von einem abgeschlossenen, abgestimmten Stand."
  - q: "Ersetzt Revenue Cloud Billing das ERP in der Buchhaltung?"
    a: "Nicht unbedingt. Salesforce beschreibt Revenue Cloud Billing als mögliches Nebenbuch, das Buchungssätze synchronisiert. Das Hauptbuch bleibt meist im ERP, und diese Aufteilung entscheidet die Finanzabteilung."
draft: false
---

Der Wechsel vom Paket Salesforce Billing (Namespace `blng`) zu Revenue Cloud Billing bedeutet ein neues Abrechnungsdatenmodell auf Standardobjekten. Eine Umwandlung an Ort und Stelle gibt es nicht. Offene Rechnungen, Abrechnungspläne und Zahlungshistorie werden entweder im alten Paket abgeschlossen oder als Salden übernommen. Meine Empfehlung: Umstellung zum Ende einer Buchungsperiode, letzter Rechnungslauf im Paket, offene Forderungen und aktive Verträge übernehmen, abgeschlossene Historie lesbar halten oder archivieren. Abrechnungspläne entstehen in Revenue Cloud aus Aufträgen und folgen damit den migrierten Assets. Freigeben muss die Finanzabteilung, nicht das CRM-Team, denn Steuer, Zahlungen und Buchungen ändern sich mit dem System.

## Wie ist der Stand bei Salesforce Billing?

Salesforce Billing kam zusammen mit Salesforce CPQ von SteelBrick und ist ein Managed Package. Im März 2025 sagte ein Salesforce-Sprecher gegenüber [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/), dass heutige Kunden von Salesforce CPQ und Salesforce Billing "will continue to receive full access", einschließlich Kundensupport. Neukunden und Bestandskunden, die ihre Produkte modernisieren wollen, bietet Salesforce Revenue Cloud Advanced und Revenue Cloud Billing an.

Die [CPQ-End-of-Life-Seite](https://www.salesforce.com/sales/cpq/end-of-life/) beschreibt Revenue Cloud Billing lediglich als eigenes, ergänzendes Produkt der Suite. Eine eigene Verkaufsende-Aussage zum Billing-Paket habe ich im Oktober 2026 auf den Seiten von Salesforce nicht gefunden. Eine Frist gibt es also auch hier nicht. Auslöser für den Wechsel ist meist die CPQ-Migration: Sobald Angebote, Aufträge und Assets auf Standardobjekten liegen, passt ein Billing-Paket, das CPQ-Objekte liest, nicht mehr.

Zu den Namen: Die Salesforce-Hilfe nennt das Produkt derzeit Revenue Management, früher Revenue Lifecycle Management, die CPQ-Seite spricht von Agentforce Revenue Management. Auf den Produktseiten von Salesforce heißt es Revenue Cloud, mit Revenue Cloud Billing als Zusatzprodukt für die Abrechnung.

## Worin unterscheidet sich das Billing-Paket von Revenue Cloud Billing?

Das Paket hat laut seinem [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm) 59 eigene Objekte. Revenue Cloud Billing nutzt Standardobjekte aus dem [Revenue Management Developer Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-std-objects-parent.html). Ein offizielles Mapping veröffentlicht Salesforce nicht, die Tabelle ist meine Zuordnung nach Funktion:

| Funktion | Salesforce Billing (Paket) | Revenue Cloud Billing (Standardobjekte) |
|---|---|---|
| Abrechnungslogik | `blng__BillingRule__c`, `blng__BillingTreatment__c` | BillingPolicy, BillingTreatment, BillingTreatmentItem |
| Steuer | `blng__TaxRule__c`, `blng__TaxIntegration__c` | TaxPolicy, TaxTreatment, TaxEngine mit Provider-Adapter |
| Rechnung | `blng__Invoice__c`, `blng__InvoiceLine__c` | Invoice, InvoiceLine, InvoiceLineTax |
| Rechnungslauf | `blng__InvoiceRun__c` | InvoiceBatchRun |
| Gutschrift und Belastung | `blng__CreditNote__c`, `blng__DebitNote__c` | CreditMemo, DebitMemo |
| Buchhaltung | `blng__FinanceBook__c`, `blng__FinancePeriod__c`, `blng__GLAccount__c` | AccountingPeriod, GeneralLedgerAccount, GeneralLedgerJrnlEntryRule |
| Rechtseinheit | `blng__LegalEntity__c` | LegalEntity |
| Zahlungen | `blng__Payment__c`, `blng__PaymentGateway__c` | Objekte von Salesforce Payments plus PaymentLineInvoiceLine |

Drei Unterschiede wiegen schwerer als die Namen:

- **Abrechnungspläne entstehen aus Aufträgen.** Laut [Billing-Übersicht](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html) erzeugt Revenue Cloud Abrechnungspläne über den Context Service und daraus die Rechnungen. Ein alter Plan wird also aus einem migrierten Asset und Auftrag neu aufgebaut.
- **Steuer und Zahlungen sind anders angebunden.** Steuer läuft über einen TaxEngine-Datensatz mit Provider-Adapter und Named Credential. Zahlungen nutzen Standardobjekte von Salesforce Payments mit einem externen Zahlungsanbieter. Steuer- und Zahlungsanbieter müssen die neue Anbindung bestätigen.
- **Umsatzrealisierung.** Das Paket hat Objekte wie `blng__RevenueSchedule__c`. In der Liste der Billing-Standardobjekte habe ich kein Objekt für Umsatzpläne gefunden. Wenn Sie heute im Paket Umsätze realisieren, fragen Sie Salesforce schriftlich, wo das nach dem Wechsel passiert.

## Was passiert mit offenen Rechnungen, Plänen und Zahlungen?

Die Salesforce-Hilfe führt Billing-Daten im [Migrationsleitfaden](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) als eigenes Thema neben Produkt- und Asset-Daten. Pro Datenart würde ich so entscheiden:

- **Abgeschlossene Rechnungen und bezahlte Historie:** nicht migrieren. Für die Aufbewahrungsfrist im Paket lesbar halten oder in ein Archiv exportieren, das die Finanzabteilung durchsuchen kann.
- **Offene Rechnungen:** im Paket abschließen. Zahlungen dort verbuchen oder den offenen Betrag als Saldo ins neue System übernehmen, mit Verweis auf die alte Rechnungsnummer.
- **Offene Gutschriften:** wenn möglich vor dem Cutover verrechnen. Der Rest wandert wie eine offene Rechnung als Saldo.
- **Abrechnungspläne aktiver Verträge:** aus migrierten Assets und Aufträgen neu aufbauen. Der erste Rechnungslauf in Revenue Cloud muss genau nach dem letzten abgerechneten Zeitraum im Paket beginnen, sonst bekommt ein Kunde doppelt oder gar keine Rechnung.
- **Gespeicherte Zahlungsmittel:** mit dem Zahlungsanbieter klären, ob Tokens in der neuen Anbindung weiter nutzbar sind. Diese Frage beantwortet Ihr Zahlungsanbieter.

## Warum sollte der Cutover am Periodenende liegen?

Revenue Cloud Billing arbeitet mit Buchungsperioden je Rechtseinheit. Die [Deployment-Hinweise zu Billing](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-billing-additional-info.html) sagen, dass Buchungsperioden nur im Status Open angelegt werden können und dass eine Rechtseinheit aktiv sein muss, wenn abhängige Datensätze entstehen. Buchungssätze fließen dann von Salesforce ins ERP. Die [Produktseite zu Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/) beschreibt Salesforce als Nebenbuch, das Buchungssätze synchronisiert.

Am Periodenende ist das alte Nebenbuch geschlossen und mit dem ERP abgestimmt. Das neue System startet mit Eröffnungssalden, denen die Finanzabteilung zugestimmt hat. Mitten in einer Periode müssten Sie einen Monat auf zwei Nebenbücher aufteilen, und die Abstimmung wird doppelt so schwer.

Rechnungsnummern brauchen dieselbe Sorgfalt. Revenue Cloud Billing hat Objekte für Nummernkreise (SequencePolicy, SequenceGapReconciliation). Lassen Sie sich vom Partner zeigen, dass sie Ihre Rechnungsnummern abdecken. Setzen Sie die Startnummer so, dass neue Rechnungen den Nummernkreis ohne Überschneidung fortsetzen, und stimmen Sie das Format mit Ihrer Steuerberatung ab.

## Was muss vor dem ersten Rechnungslauf stehen?

Die Deployment-Hinweise nennen mehrere Einrichtungsschritte, die leicht übersehen werden:

1. Data Pipeline ist aktiviert, bevor Billing aktiviert wird.
2. Der Flow Order to Billing Schedule ist aus seiner Vorlage kopiert und aktiviert.
3. Rechtseinheiten und offene Buchungsperioden sind angelegt.
4. Abrechnungs-, Steuer- und Zahlungskonfiguration ist in der richtigen Reihenfolge aktiviert: Billing Treatment Item, Billing Treatment, Billing Policy; Tax Treatment, Tax Policy; Payment Term Item, Payment Term.
5. Steuer-Engine und Zahlungsanbieter sind angebunden und mit echten Adressen und Beträgen getestet.

Wie diese Konfigurationsdatensätze von der Sandbox in die Produktion kommen, beschreibt [Revenue Cloud Deployments](../revenue-cloud-konfiguration-deployment/), den allgemeinen Ansatz das Kapitel der DevOps-Masterclass zu [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/).

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer verkauft Fernüberwachung und Wartungsabos an 800 Kunden und rechnet sie quartalsweise aus Salesforce Billing ab. Maschinenrechnungen kommen aus SAP. Das Unternehmen stellt die Angebotserstellung auf Revenue Cloud um. Alle Zahlen sind Annahmen.

Das Billing-Team plant den Cutover zum 31. März, dem Quartalsende. Der letzte Rechnungslauf im Paket deckt das erste Quartal ab. Im April stimmt die Finanzabteilung das Nebenbuch mit SAP ab. 120 offene Rechnungen bleiben bis zur Zahlung im Paket. Die Assets für die 800 Abos werden im März migriert, die ersten Abrechnungspläne in Revenue Cloud beginnen am 1. April, der erste Rechnungslauf im Juli rechnet also das zweite Quartal ab. Abgeschlossene Rechnungen bleiben im Paket lesbar, bis die Lizenzen für CPQ und Billing enden.

Vor dem Cutover prüft die Finanzabteilung noch ein Thema: Ab 2027 greift in Deutschland die Pflicht zur E-Rechnung. Ob Rechnungen überhaupt aus Revenue Cloud kommen sollten, behandeln [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/) und [E-Rechnung ab 2027](../e-rechnung-pflicht-2027-revenue-cloud/).

## Wer gibt den Billing-Cutover frei?

Die Finanzabteilung, nicht das CRM-Team. Die Entscheidungen hier sind buchhalterische: Eröffnungssalden, Periodenabschluss, Steuerbehandlung, Buchungen ins ERP und Rechnungsnummern. Ich würde den Cutover mit einer schriftlichen Checkliste aufsetzen, die die Finanzabteilung unterschreibt, und die Lizenzkosten von Revenue Cloud Billing früh einplanen; wie sie berechnet werden, steht in [Revenue Cloud Billing Kosten](../revenue-cloud-billing-kosten/). Die Reihenfolge der gesamten Migration beschreibt [CPQ zu Revenue Cloud migrieren](../cpq-migration-revenue-cloud-phasen/) und das Masterclass-Kapitel [Von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/). Die Schnittstellen zwischen Salesforce und SAP gehören zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Ein Billing-Cutover gelingt, wenn er am Periodenende liegt und die Finanzabteilung die Checkliste verantwortet. Wenn Sie den Wechsel von Salesforce Billing planen, [schreiben Sie mir](#contact).
