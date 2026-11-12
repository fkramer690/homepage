---
title: "Von Salesforce Billing zu Revenue Cloud Billing"
description: "Was mit offenen Rechnungen, Abrechnungsplänen und Zahlungen passiert, wenn Sie vom Paket Salesforce Billing zu Revenue Cloud Billing wechseln, und wer freigibt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: von-salesforce-billing-zu-revenue-cloud-billing
translationKey: salesforce-billing-to-revenue-cloud-billing
topic: revenue
categories: [revenue-cloud]
tags: [Salesforce Billing, Revenue Cloud Billing, Migration, Cutover, Finanzen]
takeaways:
  - "Revenue Cloud Billing läuft auf Standardobjekten wie Invoice, CreditMemo, BillingSchedule und AccountingPeriod, nicht im Namespace blng."
  - "Bestehende Billing-Kunden behalten laut Salesforce vollen Zugriff einschließlich Support. Neukunden bietet Salesforce Revenue Cloud Advanced und Billing an."
  - "Abrechnungspläne werden aus migrierten Aufträgen, Assets oder per API neu aufgebaut, nicht aus dem alten Paket kopiert. Salesforce dokumentiert die Schritte."
  - "Ich stelle zum Periodenende um und entscheide für jede offene Rechnung: migrieren, im Paket abschließen oder nur den Saldo übernehmen."
  - "Die Finanzabteilung gibt die finanzielle Seite des Cutovers frei: Tax Engine, Payment Gateway, Buchungssätze für das ERP und Rechnungsnummerierung."
faq:
  - q: "Wird Salesforce Billing noch unterstützt?"
    a: "Ja. Im März 2025 erklärte ein Salesforce-Sprecher gegenüber SalesforceBen, bestehende Kunden von Salesforce CPQ und Salesforce Billing würden weiterhin vollen Zugriff einschließlich Kundensupport erhalten. Mit Stand vom 9. November 2026 habe ich auf den Salesforce-Seiten keine gesonderte Mitteilung zum Vertriebsende des Billing-Pakets gefunden; lassen Sie sich Ihren Verlängerungsstatus schriftlich bestätigen."
  - q: "Lassen sich Rechnungen aus Salesforce Billing in Revenue Cloud Billing umwandeln?"
    a: "Eine Umwandlung an Ort und Stelle gibt es nicht, weil Paketobjekte und Standardobjekte verschieden sind. Die Salesforce-Hilfe dokumentiert, wie Abrechnungspläne neu aufgebaut, historische, bereits gebuchte Rechnungen erzeugt und offene Gutschriften, Belastungen und Zahlungen migriert werden. Ob Sie die vollständige Historie oder nur offene Posten neu aufbauen, entscheidet die Finanzabteilung."
  - q: "Wann ist der beste Zeitpunkt für den Wechsel des Abrechnungssystems?"
    a: "Zum Ende einer Buchungsperiode, nach dem letzten Rechnungslauf im alten Paket und nachdem die Finanzabteilung das Nebenbuch mit dem ERP abgestimmt hat. Dann starten die Eröffnungssalden im neuen System von einem abgeschlossenen, abgestimmten Stand."
  - q: "Ersetzt Revenue Cloud Billing das ERP in der Buchhaltung?"
    a: "Nicht unbedingt. Salesforce beschreibt Revenue Cloud Billing als mögliches Nebenbuch, das Buchungssätze synchronisiert. Das Hauptbuch bleibt meist im ERP, und über diese Aufteilung entscheidet die Finanzabteilung."
draft: false
---

Der Wechsel vom Paket Salesforce Billing (Namespace blng) zu Revenue Cloud Billing bedeutet ein neues Abrechnungsdatenmodell auf Standardobjekten. Eine Umwandlung an Ort und Stelle gibt es nicht, Salesforce dokumentiert aber den Neuaufbau von Abrechnungsplänen und historischen Rechnungen sowie die Migration offener Posten. Ich empfehle, zum Ende einer Buchungsperiode umzustellen. Führen Sie den letzten Rechnungslauf im Paket aus, entscheiden Sie für jede offene Rechnung über die Übernahme oder Abwicklung im Paket und halten Sie die abgeschlossene Historie lesbar oder archiviert. Die Finanzabteilung gibt die finanziellen Kontrollen gemeinsam mit IT und Fachverantwortlichen frei, denn Steuer, Zahlungen und Buchungen ändern sich mit dem System.

## Wie ist der Stand bei Salesforce Billing?

Salesforce Billing stammt zusammen mit Salesforce CPQ von SteelBrick und ist ein Managed Package. Im März 2025 erklärte ein Salesforce-Sprecher gegenüber [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/), bestehende Kunden von Salesforce CPQ und Salesforce Billing würden weiterhin vollen Zugriff einschließlich Kundensupport erhalten. Neukunden und Bestandskunden, die ihre Produkte modernisieren wollen, bietet Salesforce Revenue Cloud Advanced und Revenue Cloud Billing an. Advanced enthält bereits die grundlegende Rechnungsstellung; Zahlungen, das Nebenbuch und die Rechnungsnummerierung benötigen Billing.

Die [CPQ-End-of-Life-Seite](https://www.salesforce.com/sales/cpq/end-of-life/) beschreibt Revenue Cloud Billing lediglich als eigenes, ergänzendes Produkt der Suite. Mit Stand vom 9. November 2026 habe ich auf den Salesforce-Seiten keine gesonderte Mitteilung zum Vertriebsende des Billing-Pakets gefunden. Mir ist also keine öffentliche Frist für Billing bekannt, aber lassen Sie sich Ihren Vertrags- und Verlängerungsstatus von Salesforce schriftlich bestätigen. Auslöser für den Wechsel ist meist die CPQ-Migration: Sobald Angebote, Aufträge und Assets auf Standardobjekten liegen, passt ein Billing-Paket, das CPQ-Objekte liest, nicht mehr.

Zu den Namen: Salesforce hat das Produkt in Agentforce Revenue Management umbenannt, die Hilfe verkürzt den Namen oft zu Revenue Management, und früher hieß es Revenue Lifecycle Management. Die Lizenzen heißen weiterhin Revenue Cloud Growth, Advanced und Billing.

## Paketobjekte im Namespace blng gegen Standardobjekte

Das Paket hat laut seinem [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm) 59 eigene Objekte. Revenue Cloud Billing nutzt Standardobjekte aus dem [Revenue Management Developer Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-std-objects-parent.html). Salesforce veröffentlicht kein offizielles Mapping; die Tabelle ist meine Zuordnung nach Funktion:

| Funktion | Salesforce Billing (Paket) | Revenue Cloud Billing (Standardobjekte) |
|---|---|---|
| Abrechnungslogik | blng__BillingRule__c, blng__BillingTreatment__c | BillingPolicy, BillingTreatment, BillingTreatmentItem |
| Steuer | blng__TaxRule__c, blng__TaxIntegration__c | TaxPolicy, TaxTreatment, TaxEngine mit Provider-Adapter |
| Rechnung | blng__Invoice__c, blng__InvoiceLine__c | Invoice, InvoiceLine, InvoiceLineTax |
| Rechnungslauf | blng__InvoiceRun__c | InvoiceBatchRun |
| Gutschrift und Belastung | blng__CreditNote__c, blng__DebitNote__c | CreditMemo, DebitMemo |
| Buchhaltung | blng__FinanceBook__c, blng__FinancePeriod__c, blng__GLAccount__c | AccountingPeriod, GeneralLedgerAccount, GeneralLedgerJrnlEntryRule |
| Rechtseinheit | blng__LegalEntity__c | LegalEntity |
| Zahlungen | blng__Payment__c, blng__PaymentGateway__c | Payment, PaymentLineInvoice oder PaymentLineInvoiceLine und weitere Objekte von Salesforce Payments |

Zwei Unterschiede wiegen schwerer als die Namen; ein dritter Punkt ist offen:

- **Abrechnungspläne werden neu aufgebaut, nicht kopiert.** Laut [Billing-Übersicht](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html) erzeugt Revenue Cloud Abrechnungspläne aus Aufträgen über den Context Service und erstellt daraus die Rechnungen. Die [Schritte zur Billing-Migration](https://help.salesforce.com/s/articleView?id=ind.rev_billing_migration_flow.htm&language=en_US&type=5) bieten drei Wege: migrierte historische Aufträge nacheinander aktivieren, die eigenständige Billing Schedules API mit Billing-Lizenz für Aufträge, Assets oder externe Assets nutzen oder Pläne manuell über die sObject APIs anlegen.
- **Steuer und Zahlungen sind anders angebunden.** Steuer wird über einen TaxEngine-Datensatz berechnet mit Provider-Adapter und Named Credential. Zahlungen nutzen Standardobjekte von Salesforce Payments mit einem externen Zahlungsanbieter. Steuer- und Zahlungsanbieter müssen die neue Anbindung bestätigen.

```hinweis offen
**Umsatzrealisierung.** Das Paket hat Objekte wie blng__RevenueSchedule__c. In der Liste der Billing-Standardobjekte habe ich kein Objekt für Umsatzpläne gefunden. Wenn Sie heute im Paket Umsätze realisieren, fragen Sie Salesforce schriftlich, wo das nach dem Wechsel passiert.
```

## Was passiert mit offenen Rechnungen, Plänen und Zahlungen?

Die Salesforce-Hilfe führt Billing-Daten im [Migrationsleitfaden](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) als eigenes Thema neben Produkt- und Asset-Daten und dokumentiert die Erzeugung historischer, bereits gebuchter Rechnungen sowie die Migration offener Gutschriften, Belastungen und Zahlungen. Pro Datenart würde ich so entscheiden:

- **Abgeschlossene und bezahlte Rechnungen aus der Historie:** normalerweise nicht migrieren. Halten Sie sie für die Aufbewahrungsfrist im Paket lesbar oder exportieren Sie sie in ein Archiv, das die Finanzabteilung durchsuchen kann. Wenn die Finanzabteilung die vollständige Historie im neuen System benötigt, erzeugen Sie wie dokumentiert historische, bereits gebuchte Rechnungen.
- **Offene Rechnungen:** entweder mit ihren Positionen, Fälligkeiten und Steuern migrieren oder im Paket abschließen und die Zahlungen dort verbuchen. Nur den offenen Betrag als Saldo mit Verweis auf die alte Rechnungsnummer zu übernehmen, ist die Minimalvariante; dabei gehen im neuen System Informationen zum Forderungsalter und die Positionsdetails verloren.
- **Offene Gutschriften:** wenn möglich vor dem Cutover verrechnen. Der Rest wird als Credit Memo migriert oder wie eine offene Rechnung behandelt.
- **Abrechnungspläne aktiver Verträge:** aus migrierten Aufträgen, Assets oder über APIs neu aufbauen. Der erste Rechnungslauf in Revenue Cloud muss genau nach dem letzten abgerechneten Zeitraum im Paket beginnen, sonst erhält ein Kunde doppelt oder gar keine Rechnung.
- **Gespeicherte Zahlungsmittel:** Klären Sie mit dem Zahlungsanbieter, ob Tokens in der neuen Anbindung weiter nutzbar sind.

## Der Cutover gehört ans Periodenende

Revenue Cloud Billing verknüpft Buchungsperioden über LegalEntityAccountingPeriod-Datensätze mit Rechtseinheiten. Die [Deployment-Hinweise zu Billing](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-billing-additional-info.html) sagen, dass Buchungsperioden nur im Status Open angelegt werden können und dass eine Rechtseinheit aktiv sein muss, wenn dieser Verknüpfungsdatensatz entsteht. Buchungssätze erreichen das ERP dann über eine Integration, die Sie aufbauen und abstimmen. Die [Produktseite zu Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/) beschreibt Revenue Cloud Billing als Nebenbuch, das Buchungssätze synchronisiert.

```ablauf
sf: Auftrag, Abrechnungsplan, Rechnung, Buchungssatz
erp: ERP
Auftrag --Context Service--> Abrechnungsplan
Abrechnungsplan --Rechnungslauf--> Rechnung
Rechnung --> Buchungssatz
Buchungssatz --ERP-Integration--> ERP
```

Am Periodenende wird das alte Nebenbuch für Neugeschäft geschlossen und mit dem ERP abgestimmt. Das neue System startet mit Eröffnungssalden, denen die Finanzabteilung zugestimmt hat. Mitten in einer Periode müssten Sie einen Monat auf zwei Nebenbücher aufteilen, und die Abstimmung wird doppelt so schwer. Wenn offene Rechnungen im Paket abgewickelt werden, bleiben beide Systeme eine Zeit lang aktiv; Salesforce dokumentiert diese [Koexistenz](https://help.salesforce.com/s/articleView?id=ind.rev_cloud_coexistence_billing_package.htm&language=en_US&type=5) für Orgs mit Revenue Cloud Advanced und Billing-Lizenzen. Sie benötigt aber eine eigene Abstimmung.

Rechnungsnummern brauchen dieselbe Sorgfalt. Revenue Cloud Billing hat Objekte für Nummernkreise (SequencePolicy, SequenceGapReconciliation). Lassen Sie sich vom Partner zeigen, dass diese Nummernkreise Ihre Rechnungsnummern abdecken. Setzen Sie die Startnummer so, dass die Nummern neuer Rechnungen den Nummernkreis ohne Überschneidung fortsetzen, und stimmen Sie das Format mit Ihrer Steuerberatung ab.

## Was muss vor dem ersten Rechnungslauf stehen?

Die Deployment-Hinweise nennen mehrere Einrichtungsschritte, die leicht übersehen werden:

```schritte
Data Pipeline
  Ist aktiviert, bevor Billing aktiviert wird.
Order to Billing Schedule Flow
  Ist aus seiner Vorlage kopiert und aktiviert.
Rechtseinheiten und Perioden
  Rechtseinheiten und offene Buchungsperioden sind angelegt.
Aktivierungsreihenfolge
  Billing Treatment Item, Billing Treatment, Billing Policy; Tax Treatment, Tax Policy; Payment Term Item, Payment Term.
Steuer und Zahlungen
  Steuer-Engine und Zahlungsanbieter sind angebunden und mit echten Adressen und Beträgen getestet.
```

Wie diese Konfigurationsdatensätze von der Sandbox in die Produktion gelangen, beschreibt [Revenue Cloud Deployments](/blog/revenue-cloud-konfiguration-deployment/); den allgemeinen Ansatz beschreibt das Kapitel der DevOps-Masterclass zu [Daten und Konfiguration](/masterclass/devops-release-management/daten-und-konfiguration/).

## Rechenbeispiel: 800 Abo-Kunden mit Quartalsrechnung

Ein Maschinenbauer verkauft Fernüberwachungs- und Wartungsabos an 800 Kunden und rechnet diese Leistungen quartalsweise nachträglich über Salesforce Billing ab. Maschinenrechnungen stammen aus SAP. Das Unternehmen stellt die Angebotserstellung auf Revenue Cloud um. Alle Zahlen sind Annahmen.

Das Billing-Team plant den Cutover zum 31. März, dem Quartalsende. Der letzte Rechnungslauf im Paket deckt das erste Quartal ab. Im April stimmt die Finanzabteilung das Nebenbuch mit SAP ab. 120 offene Rechnungen bleiben bis zur Zahlung im Paket, sodass beide Abrechnungssysteme etwa zwei Monate parallel betrieben werden und die Finanzabteilung beide abstimmt. Die Assets für die 800 Abos werden im März migriert, die ersten Abrechnungspläne in Revenue Cloud beginnen am 1. April, der erste Rechnungslauf im Juli rechnet also das zweite Quartal ab. Abgeschlossene Rechnungen bleiben im Paket lesbar; bevor die Lizenzen für CPQ und Billing enden, exportiert die Finanzabteilung sie in ein Archiv, das die Aufbewahrungsvorschriften erfüllt.

Vor dem Cutover prüft die Finanzabteilung noch ein Thema: Deutsche Unternehmen müssen E-Rechnungen bereits empfangen können, und die Übergangsfrist für ihre Ausstellung endet Ende 2026, bei Unternehmen mit höchstens 800.000 € Vorjahresumsatz Ende 2027. Ob Rechnungen überhaupt in Revenue Cloud erzeugt werden sollten, behandeln [Revenue Cloud Billing oder SAP](/blog/revenue-cloud-billing-oder-sap-rechnung/) und [E-Rechnung ab 2027](/blog/e-rechnung-pflicht-2027-revenue-cloud/).

## Erster Schritt: die Finanzabteilung unterschreibt die Cutover-Checkliste

Die Finanzabteilung gibt die finanziellen Kontrollen frei, nicht das CRM-Team allein; der gesamte Go-live bleibt eine gemeinsame Entscheidung mit IT und Fachverantwortlichen. Die zentralen Entscheidungen sind hier buchhalterisch: Eröffnungssalden, Periodenabschluss, Steuerbehandlung, Buchungen ins ERP und Rechnungsnummern. Ich würde den Cutover mit einer schriftlichen Checkliste vorbereiten, die die Finanzabteilung unterschreibt, und die Lizenzkosten von Revenue Cloud Billing früh einplanen; wie sie berechnet werden, steht in [Revenue Cloud Billing Kosten](/blog/revenue-cloud-billing-kosten/). Die Reihenfolge der gesamten Migration beschreiben [CPQ zu Revenue Cloud migrieren](/blog/cpq-migration-revenue-cloud-phasen/) und das Masterclass-Kapitel [Von CPQ zu Revenue Cloud](/masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/). Die Schnittstellen zwischen Salesforce und SAP gehören zu meiner Arbeit bei [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).
