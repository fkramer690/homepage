---
title: "Revenue Cloud Billing oder SAP: Wo entsteht die Rechnung?"
description: "Wann Rechnungen aus Revenue Cloud Billing kommen sollten und wann aus SAP: was Billing kann, was ein Nebenbuch für Finance bedeutet und eine typische Aufteilung."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-billing-oder-sap-rechnung
translationKey: revenue-cloud-billing-or-erp-invoicing
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Revenue Cloud Billing, SAP, Rechnungsstellung, Nebenbuch, Finance, Fertigung]
takeaways:
  - "Bei einmaligen Maschinenverkäufen bleibt die Rechnung meist in SAP, weil Lieferung, Abnahme und Anzahlungen dort abgewickelt werden."
  - "Revenue Cloud Billing lohnt sich für Abonnements, Serviceverträge und nutzungsbasierte Entgelte, die in Salesforce verkauft und geändert werden."
  - "Billing macht Salesforce zum Nebenbuch mit eigenen Legal Entities, Buchungsperioden und Sachkonten und überträgt Buchungssätze an das ERP."
  - "Billing wird nach Rechnungsbetrag abgerechnet. Maschinenrechnungen mit hohen Beträgen über Salesforce zu schicken, erhöht die Kosten ohne großen Nutzen."
  - "Die Entscheidung gehört Finance: welche Umsatzarten Salesforce fakturiert, wer Perioden schließt und wie Forderungen mit SAP abgestimmt werden."
faq:
  - q: "Was macht Revenue Cloud Billing?"
    a: "Revenue Cloud Billing erzeugt Rechnungen aus Abrechnungsplänen, berechnet Steuern über eine externe Steuer-Engine, verwaltet Gutschriften, Zahlungen und Mahnwesen und arbeitet als Nebenbuch, das Buchungssätze mit dem ERP synchronisiert."
  - q: "Kann Revenue Cloud Billing die Fakturierung in SAP ersetzen?"
    a: "Technisch kann es viele Umsatzarten fakturieren. Für Maschinenverkäufe würde ich die Rechnung trotzdem nicht aus SAP herauslösen, denn Lieferung, Abnahme, Anzahlungen und Hauptbuch bleiben dort, und Billing würde diese Struktur doppeln."
  - q: "Braucht Revenue Cloud Billing ein eigenes Buchhaltungs-Setup?"
    a: "Ja. Billing arbeitet in Salesforce mit Legal Entities, Buchungsperioden, Sachkonten, Steuerregeln und Zahlungsbedingungen. Finance muss sie auf Buchungskreise, Perioden und Konten in SAP abbilden und festlegen, wer die Perioden schließt."
  - q: "Wer sollte entscheiden, ob Rechnungen aus Salesforce kommen?"
    a: "Finance, zusammen mit Vertrieb und IT. Das CRM-Team kann zeigen, was Billing kann, aber ein zweites Debitorenbuch und ein zweiter Periodenabschluss sind Themen der Finanzabteilung."
draft: false
---

Bei einem Hersteller sollte die Maschinenrechnung in der Regel in SAP bleiben. Revenue Cloud Billing sollte nur Umsätze fakturieren, die in Salesforce verkauft und geändert werden: Abonnements, Serviceverträge und nutzungsbasierte Entgelte. Billing macht Salesforce zum Nebenbuch mit eigenen Legal Entities, Buchungsperioden und Buchungssätzen, die an das ERP übertragen werden. Damit entsteht neben SAP eine zweite Buchhaltungsstruktur. Sie lohnt sich, wenn das wiederkehrende Geschäft groß ist und sich oft ändert. Die Entscheidung trifft Finance, das CRM-Team bereitet sie vor.

## Was kann Revenue Cloud Billing?

Revenue Cloud Billing ist das Abrechnungs-Add-on zu Revenue Cloud. In der Salesforce-Hilfe und in der Entwicklerdokumentation zu Winter '27 heißt die Produktfamilie Revenue Management, früher hieß sie Revenue Lifecycle Management. Laut [Produktseite](https://www.salesforce.com/sales/revenue-cloud-billing/) deckt Billing ab:

- **Rechnungen** nach beliebigem Zeitplan, nachvollziehbar bis zu Angebot und Auftrag.
- **Steuern** über externe Steuer-Engines, die die Steuer je Rechnungsposition berechnen.
- **Zahlungen** über elektronische Zahlungsarten und Payment Gateways.
- **Mahnwesen**, also automatische Nachverfolgung überfälliger Forderungen.
- **Ein Nebenbuch** für Buchungssätze, Periodenabschluss und Währungsumrechnung.

Die Abläufe hängen am Auftrag. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices) erzeugt die Aktivierung eines Auftrags Billing Schedule Groups und Billing Schedules, also Abrechnungspläne. Rechnungsläufe nehmen die Pläne, die zur Fakturierung bereit sind, und nutzen für große Mengen die Data Processing Engine. Erst beim Buchen einer Rechnung berechnet die externe Engine die Steuer. Das [Billing-Modul auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) ergänzt Rechnungsvorschauen, Gutschriften, Zahlungsläufe und Rechnungs-PDFs, die an den Rechnungskontakt gemailt werden können.

Der [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/billing_overview.htm) beschreibt Standardobjekte für Abrechnungs- und Steuerkonfiguration, Gutschriften, Rechnungen und Buchungsperioden je Legal Entity, dazu Zahlungsobjekte, die die Revenue-Cloud-Billing-Lizenz voraussetzen. Den Preis nennt Salesforce nur auf Anfrage. Wie Billing nach Rechnungsbetrag abgerechnet wird, steht in [Revenue Cloud Billing: Kosten](../revenue-cloud-billing-kosten/).

## Was bedeutet "Salesforce als Nebenbuch" für Finance?

Salesforce schreibt, Billing erlaube es Salesforce, als "sub-ledger" zu arbeiten und dabei Buchungssätze zu synchronisieren. Ein Nebenbuch führt die Einzelheiten der Forderungen, hier jede Rechnung, Gutschrift und Zahlung, und übergibt Buchungssätze an das Hauptbuch. Das Hauptbuch bleibt in SAP.

Das klingt harmlos, bis man die Konfiguration sieht. Die [Liste der Billing-Objekte für Deployments](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_billing_objects.htm) beginnt mit LegalEntity und geht weiter mit Abrechnungsregeln, Steuer-Engines und Steuerregeln, Zahlungsbedingungen, AccountingPeriod, LegalEntityAccountingPeriod, GeneralLedgerAccount und Regeln für Buchungssätze. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) sagt es deutlich: In Billing hängen alle Vorgänge an Legal-Entity-Datensätzen, die abbilden, wie ein Unternehmen aufgebaut ist. Alle diese Daten gibt es in SAP schon, als Buchungskreise, Geschäftsjahresperioden und Sachkonten.

Finance muss also Fragen beantworten, die es mit dem CRM-Team vermutlich nie besprochen hat:

1. Welche Buchungskreise fakturieren aus Salesforce, und welche Legal Entities entsprechen ihnen?
2. Wer schließt eine Buchungsperiode in Salesforce, und in welcher Reihenfolge zum Periodenabschluss in SAP? Laut Trailhead schließt eine Definition der Data Processing Engine die Periode je Legal Entity.
3. Wer pflegt die Zuordnung der Sachkonten, wenn sich der Kontenplan ändert?
4. Wie werden die Forderungen in Salesforce und SAP zum Monatsende abgestimmt, und wer klärt Differenzen?

Trailhead nennt eine [Rolle Accounts Receivable Admin](https://trailhead.salesforce.com/content/learn/modules/billing-basics-in-revenue-cloud/explore-billing-features-and-roles), die Buchungsperioden, Buchungssätze und Finanzberichte verwaltet. In einem Fertigungsunternehmen sitzt diese Person in der Buchhaltung. Übernimmt dort niemand die Rolle, sollte Billing nicht live gehen.

## Wann sollte die Rechnung in SAP bleiben?

Bei einmaligen Maschinenverkäufen lasse ich die Rechnung in SAP. Die Gründe sind praktisch:

- **Die Lieferung bestimmt die Rechnung.** Maschinen werden nach Versand oder Abnahme fakturiert, und Versand, Zoll und Abnahme laufen in SAP.
- **Anzahlungen und Meilensteine** werden gegen den SAP-Auftrag gebucht. Billing kennt im Datenmodell zwar Billing Milestone Plans, aber die Anzahlungsbuchhaltung für eine Produktlinie aus SAP herauszulösen, lohnt sich selten.
- **Kosten.** Billing wird nach Rechnungsbetrag abgerechnet. Eine Maschinenrechnung über 2 Millionen Euro, in Salesforce gebucht, verbraucht Billing Events für den vollen Betrag, für eine Rechnung, die SAP ohnehin erstellen könnte.
- **E-Rechnung.** Ab 2027 müssen Unternehmen in Deutschland mit mehr als 800.000 Euro Vorjahresumsatz inländischen Geschäftskunden strukturierte E-Rechnungen schicken. Erzeugt SAP sie bereits, bedeutet ein zweites Fakturasystem ein zweites Compliance-Projekt. Einzelheiten stehen in [E-Rechnung ab 2027 und Revenue Cloud](../e-rechnung-pflicht-2027-revenue-cloud/).

Dasselbe gilt für Ersatzteile, die mit der Lieferung fakturiert werden. Die Zahlung im B2B-Shop ist eine eigene Frage, beschrieben in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/).

## Wann lohnt sich Revenue Cloud Billing?

Billing lohnt sich dort, wo die Rechnung eher dem Vertrag folgt als der Lieferung:

- **Abonnements** wie Fernüberwachung, Softwareoptionen oder Datendienste, monatlich oder quartalsweise abgerechnet.
- **Service- und Wartungsverträge** mit fester Gebühr je Periode, die angepasst werden, wenn Maschinen dazukommen oder stillgelegt werden. Wie man sie abrechnet, steht in [Wartungsverträge wiederkehrend abrechnen](../wartungsvertraege-wiederkehrend-abrechnen/).
- **Nutzungsbasierte Entgelte** wie Maschinenstunden oder Ausbringung, die Revenue Cloud bewertet und an Billing übergibt. Den Maschinenfall beschreibt [Pay-per-Use für Maschinen](../pay-per-use-maschinen-revenue-cloud/).
- **Häufige Vertragsänderungen.** In Revenue Cloud erzeugt ein Nachtrag ein Angebot und einen Auftrag auf den bestehenden Assets, und die Abrechnungspläne ziehen nach. Fakturiert stattdessen SAP, muss jede Änderung vor dem nächsten Rechnungslauf über eine Schnittstelle in SAP ankommen.

Das Signal, auf das ich achte: Wenn der Vertrieb jede Woche Verträge ändert und die Buchhaltung jeden Monat Rechnungen korrigiert, weil SAP von einer Änderung nichts wusste, spart Billing in Salesforce eine Übergabe. Besteht das wiederkehrende Geschäft aus ein paar hundert Verträgen mit einer Rechnung im Jahr, reicht die Fakturierung aus SAP meistens.

## Eine typische Aufteilung, als Annahme

Ein typisches Szenario, als Annahme: Ein Maschinenbauer mit SAP S/4HANA verkauft Maschinen, Ersatzteile, ein Fernüberwachungs-Abo pro Maschine und Wartungsverträge. Der Vertrieb erstellt alle Angebote in Revenue Cloud.

Ich würde so aufteilen:

| Umsatz | Rechnung aus | Warum |
|---|---|---|
| Maschine | SAP | Lieferung, Abnahme, Anzahlungen |
| Ersatzteile | SAP | Fakturiert mit der Lieferung |
| Fernüberwachungs-Abo | Revenue Cloud Billing | In Salesforce verkauft, geändert und verlängert |
| Wartungsgebühr | Revenue Cloud Billing | Feste Gebühr je Periode, Nachträge aus dem Vertrieb |
| Nutzung über Inklusivstunden | Revenue Cloud Billing | In Salesforce bewertet |

Billing erzeugt dann Buchungssätze für Abo- und Vertragsrechnungen, und SAP erhält sie über die Schnittstelle. Der Kunde bekommt zwei Arten von Rechnungen, die der Kundenservice erklären können muss. Ist das nicht akzeptabel, bleibt jede Rechnung in SAP, und Revenue Cloud liefert die Abrechnungsdaten. Dafür braucht es eine verlässliche Schnittstelle für Nachträge. Welches System welches Objekt führt, steht in [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/).

## Wer sollte entscheiden?

Finance. Das CRM-Team kann zeigen, was Billing kann, aber die Folgen trägt die Finanzabteilung: ein zweites Debitorenbuch, ein zweiter Periodenabschluss und eine zweite Stelle, die sich Wirtschaftsprüfer ansehen. Die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) hilft auch hier: Jedes Billing-Objekt braucht einen Owner, und bei Legal Entities, Buchungsperioden und Sachkonten sitzt dieser Owner in der Buchhaltung.

Ich würde die Leitung Rechnungswesen in den ersten Architektur-Workshop holen, nicht erst in den Abnahmetest. Halten Sie drei Punkte schriftlich fest: welche Umsatzarten Salesforce fakturiert, wer Perioden schließt und wie die Abstimmung mit SAP funktioniert. Die Schnittstellen für Buchungssätze und Rechnungsstatus gehören zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Wo starten Sie?

Listen Sie Ihre Umsatzarten auf und notieren Sie zu jeder, wer heute fakturiert und wie oft sich der Vertrag ändert. Zeilen mit wiederkehrenden Gebühren und häufigen Änderungen sind Kandidaten für Billing, alles andere bleibt in SAP. Das Masterclass-Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) ordnet diese Entscheidung in den gesamten Quote-to-Cash-Prozess ein.

Maschinenrechnungen bleiben in SAP, wiederkehrende Umsätze mit häufigen Änderungen können in Revenue Cloud Billing wandern, und Finance legt fest, wo die Grenze verläuft. Wenn Sie diese Grenze für Ihr Unternehmen prüfen möchten, [schreiben Sie mir](#contact).
