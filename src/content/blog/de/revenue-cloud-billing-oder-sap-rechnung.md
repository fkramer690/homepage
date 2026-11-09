---
title: "Revenue Cloud Billing oder SAP: Wo entsteht die Rechnung?"
description: "Wann Rechnungen aus Revenue Cloud Billing kommen sollten und wann aus SAP: was Billing kann, was ein Nebenbuch für Finance heißt und eine typische Aufteilung."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-billing-oder-sap-rechnung
translationKey: revenue-cloud-billing-or-erp-invoicing
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Revenue Cloud Billing, SAP, Rechnungsstellung, Nebenbuch, Finance, Fertigung]
takeaways:
  - "Bei einmaligen Maschinenverkäufen bleibt die Rechnung meist in SAP, weil Lieferung, Abnahme und Anzahlungen dort abgewickelt werden."
  - "Billing macht Salesforce zum Debitorennebenbuch mit eigenen Legal Entities, Perioden und Konten; die SAP-Schnittstelle ist ein eigenes Projekt."
  - "Billing-Nutzung wird an gebuchten Rechnungsbeträgen gemessen. Hohe Maschinenrechnungen verbrauchen Billing Events ohne großen Nutzen."
  - "Die Entscheidung gehört Finance: welche Umsatzarten Salesforce fakturiert, wer Perioden schließt und wie Forderungen mit SAP abgestimmt werden."
faq:
  - q: "Was macht Revenue Cloud Billing?"
    a: "Revenue Cloud Billing erzeugt Rechnungen aus Abrechnungsplänen, berechnet Steuern über eine externe Steuer-Engine, verwaltet Gutschriften, Zahlungen und Mahnwesen und kann als Nebenbuch arbeiten. Buchungssätze erreichen das ERP über eine Integration, die Sie entwickeln und betreiben."
  - q: "Kann Revenue Cloud Billing die Fakturierung in SAP ersetzen?"
    a: "Technisch kann es viele Umsatzarten fakturieren. Für Maschinenverkäufe würde ich die Rechnung trotzdem nicht aus SAP herauslösen, denn Lieferung, Abnahme, Anzahlungen und Hauptbuch bleiben dort, und Billing würde diese Struktur doppeln."
  - q: "Braucht Revenue Cloud Billing ein eigenes Buchhaltungs-Setup?"
    a: "Ja. Billing arbeitet in Salesforce mit Legal Entities, Buchungsperioden, Sachkonten, Steuerregeln und Zahlungsbedingungen. Finance muss sie auf Buchungskreise, Perioden und Konten in SAP abbilden und festlegen, wer die Perioden schließt."
  - q: "Wer sollte entscheiden, ob Rechnungen aus Salesforce kommen?"
    a: "Finance, zusammen mit Vertrieb und IT. Das CRM-Team kann zeigen, was Billing kann, aber ein zweites Debitorenbuch und ein zweiter Periodenabschluss sind Themen der Finanzabteilung."
draft: false
---

Bei einem Hersteller sollte die Maschinenrechnung in der Regel in SAP bleiben. Revenue Cloud Billing sollte nur Umsätze fakturieren, die in Salesforce verkauft und geändert werden: Abonnements, Serviceverträge und nutzungsbasierte Entgelte. Billing macht Salesforce zum Nebenbuch mit eigenen Legal Entities, Buchungsperioden und Buchungssätzen, die eine separat entwickelte Integration an das ERP überträgt. Damit entsteht neben SAP eine zweite Buchhaltungsstruktur. Sie lohnt sich, wenn das wiederkehrende Geschäft groß ist und sich oft ändert. Die Entscheidung trifft Finance, das CRM-Team bereitet sie vor.

## Was kann Revenue Cloud Billing?

Revenue Cloud Billing ist das Abrechnungs-Add-on zu Revenue Cloud, das Salesforce inzwischen Revenue Management nennt, in den Versionshinweisen zu Winter '27 Agentforce Revenue Management. Früher hieß es Revenue Lifecycle Management. Billing allein umfasst weder Pricing noch Produktkonfigurator, Transaktionsmanagement oder Verträge: Der hier beschriebene Angebots-, Änderungs- und Nutzungsprozess kombiniert typischerweise Revenue Cloud Advanced mit Billing. Prüfen Sie die genauen Lizenzen anhand der aktuellen Lizenzmatrix von Salesforce. Laut [Produktseite](https://www.salesforce.com/sales/revenue-cloud-billing/) deckt Billing ab:

- **Rechnungen** nach beliebigem Zeitplan, nachvollziehbar bis zu Angebot und Auftrag.
- **Steuern** über externe Steuer-Engines, die die Steuer je Rechnungsposition berechnen.
- **Zahlungen** über elektronische Zahlungsarten und Payment Gateways.
- **Mahnwesen**, also automatische Nachverfolgung überfälliger Forderungen.
- **Ein Nebenbuch** für Buchungssätze, Periodenabschluss und Währungsumrechnung.

Die Abläufe hängen am Auftrag. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices) erzeugt die Aktivierung eines Auftrags Billing Schedule Groups und Billing Schedules, also Abrechnungspläne. Rechnungsläufe nehmen die Pläne, die zur Fakturierung bereit sind, und nutzen für große Mengen die Data Processing Engine. Rechnungsentwürfe zeigen die geschätzte Steuer. Beim Buchen einer Rechnung berechnet die externe Engine die tatsächliche Steuer. Das [Billing-Modul auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) ergänzt Rechnungsvorschauen, Gutschriften, Zahlungsläufe und Rechnungs-PDFs, die an den Rechnungskontakt gemailt werden können.

Der [Developer Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html) beschreibt Standardobjekte für Abrechnungs- und Steuerkonfiguration, Gutschriften, Rechnungen und Buchungsperioden je Legal Entity, dazu Zahlungsobjekte, die die Revenue-Cloud-Billing-Lizenz voraussetzen. Den Preis nennt Salesforce nur auf Anfrage. Salesforce misst die Billing-Nutzung anhand der positiven Beträge gebuchter Rechnungspositionen. Einzelheiten stehen in [Revenue Cloud Billing: Kosten](../revenue-cloud-billing-kosten/).

## Was bedeutet "Salesforce als Nebenbuch" für Finance?

Salesforce schreibt, Billing erlaube es Salesforce, als "sub-ledger" zu arbeiten und dabei Buchungssätze zu synchronisieren. In der Praxis erfordert das Konfiguration: Die Erstellung von Transaction Journals ist standardmäßig deaktiviert und benötigt Regeln für die Zuordnung von Sachkonten. Die Übertragung an SAP mit Mapping, Fehlerbehandlung und Abstimmung ist eine Integration, die Sie entwickeln. Ein Nebenbuch führt die Einzelheiten der Forderungen, hier jede Rechnung, Gutschrift und Zahlung, und übergibt Buchungssätze an das Hauptbuch. Das Hauptbuch bleibt in SAP.

Das klingt harmlos, bis man die Konfiguration sieht. Die [Liste der Billing-Objekte für Deployments](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_billing_objects.htm) beginnt mit LegalEntity und geht weiter mit Abrechnungsregeln, Steuer-Engines und Steuerregeln, Zahlungsbedingungen, AccountingPeriod, LegalEntityAccountingPeriod, GeneralLedgerAccount und Regeln für Buchungssätze. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) sagt es deutlich: In Billing hängen alle Vorgänge an Legal-Entity-Datensätzen, die abbilden, wie ein Unternehmen aufgebaut ist. Mehrere dieser Strukturen haben Entsprechungen in SAP, besonders Buchungskreise, Geschäftsjahresperioden, Sachkonten und Zahlungsbedingungen. Sie müssen trotzdem in Salesforce modelliert und ausdrücklich zugeordnet werden, und eine Legal Entity entspricht nicht automatisch genau einem Buchungskreis. Abrechnungsregeln und Buchungssatzregeln sind zusätzliche Salesforce-Konfiguration.

Finance muss also Fragen beantworten, die es mit dem CRM-Team vermutlich nie besprochen hat:

1. Welche Buchungskreise fakturieren aus Salesforce, und welche Legal Entities entsprechen ihnen?
2. Wer schließt eine Buchungsperiode in Salesforce, und in welcher Reihenfolge zum Periodenabschluss in SAP? Laut Trailhead schließt eine Definition der Data Processing Engine die Periode je Legal Entity.
3. Wer pflegt die Zuordnung der Sachkonten, wenn sich der Kontenplan ändert?
4. Wie werden die Forderungen in Salesforce und SAP zum Monatsende abgestimmt, und wer klärt Differenzen?
5. Wo liegen die verbindlichen offenen Posten, und wo werden Zahlungseingänge, Ausgleich, Mahnungen, Erstattungen, Streitfälle und Abschreibungen bearbeitet?
6. Erhält SAP Sammelbuchungen oder Posten auf Kundenebene?

Trailhead nennt eine [Rolle Accounts Receivable Admin](https://trailhead.salesforce.com/content/learn/modules/billing-basics-in-revenue-cloud/explore-billing-features-and-roles), die Buchungsperioden, Buchungssätze und Finanzberichte verwaltet. Das Permission Set sagt nichts über die Abteilung aus. Finance muss die Bilanzierungsregeln und Entscheidungen zum Periodenabschluss verantworten, auch wenn ein Salesforce-Operations-Team Teile der Administration übernimmt. Übernimmt niemand in Finance diese Verantwortung, sollte Billing nicht live gehen.

## Die Maschinenrechnung bleibt in SAP

Bei einmaligen Maschinenverkäufen lasse ich die Rechnung dort in SAP, wo Versand, Abnahme, Anzahlungen und Meilensteine aus SAP gesteuert werden. Die Gründe sind praktisch:

- **Die Lieferung bestimmt die Rechnung.** Maschinen werden oft nach Versand oder Abnahme fakturiert, und in vielen Unternehmen laufen Versand, Zoll und Abnahme in SAP.
- **Anzahlungen und Meilensteine** werden üblicherweise gegen den SAP-Auftrag gebucht. Billing kennt im Datenmodell zwar Billing Milestone Plans, aber die Anzahlungsbuchhaltung für eine Produktlinie aus SAP herauszulösen, lohnt sich selten.
- **Kosten.** Die Billing-Nutzung wird anhand der positiven Beträge gebuchter Rechnungspositionen gemessen. Eine Maschinenrechnung über 2 Millionen Euro, in Salesforce gebucht, verbraucht Billing Events für den vollen Betrag, für eine Rechnung, die SAP ohnehin erstellen könnte. Ob dadurch zusätzliche Kosten entstehen, hängt von den in Ihrem Vertrag enthaltenen Events ab.
- **E-Rechnung.** Ab dem 1. Januar 2027 entfällt für Rechnungsaussteller mit mehr als 800.000 Euro Vorjahresumsatz grundsätzlich die Übergangsoption, für inländische B2B-Umsätze Papier- oder unstrukturierte Rechnungen zu senden. Gesetzliche Ausnahmen und die EDI-Übergangsfrist bis Ende 2027 müssen weiterhin geprüft werden. Erzeugt SAP sie bereits, bedeutet ein zweites Fakturasystem ein zweites Compliance-Projekt. Einzelheiten stehen in [E-Rechnung ab 2027 und Revenue Cloud](../e-rechnung-pflicht-2027-revenue-cloud/).

Dasselbe gilt für Ersatzteile, die mit der Lieferung fakturiert werden. Die Zahlung im B2B-Shop ist eine eigene Frage, beschrieben in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/).

## Wann lohnt sich Revenue Cloud Billing?

Billing lohnt sich dort, wo die Rechnung eher dem Vertrag folgt als der Lieferung:

- **Abonnements** wie Fernüberwachung, Softwareoptionen oder Datendienste, monatlich oder quartalsweise abgerechnet.
- **Service- und Wartungsverträge** mit fester Gebühr je Periode, die angepasst werden, wenn Maschinen dazukommen oder stillgelegt werden. Wie man sie abrechnet, steht in [Wartungsverträge wiederkehrend abrechnen](../wartungsvertraege-wiederkehrend-abrechnen/).
- **Nutzungsbasierte Entgelte** wie Maschinenstunden oder Ausbringung, die Revenue Cloud bewertet und an Billing übergibt. Den Maschinenfall beschreibt [Pay-per-Use für Maschinen](../pay-per-use-maschinen-revenue-cloud/).
- **Häufige Vertragsänderungen.** In Revenue Cloud erzeugt ein Nachtrag ein Angebot und einen Auftrag auf den bestehenden Assets, und die Abrechnungspläne ziehen nach. Fakturiert stattdessen SAP, muss jede Änderung vor dem nächsten Rechnungslauf über eine Schnittstelle in SAP ankommen.

Das Signal, auf das ich achte: Wenn der Vertrieb jede Woche Verträge ändert und die Buchhaltung jeden Monat Rechnungen korrigiert, weil SAP von einer Änderung nichts wusste, spart Billing in Salesforce eine Übergabe. Ändern sich Verträge selten, ist die Nutzung gering und gibt es nur eine Rechnung im Jahr, reicht die Fakturierung aus SAP meistens. Die Zahl der Verträge allein entscheidet nicht. Änderungshäufigkeit, rückwirkende Änderungen, Nutzungsvolumen, Legal Entities und Abstimmungsaufwand sind wichtiger.

## Rechenbeispiel: Aufteilung bei einem Maschinenbauer

Angenommen, ein Maschinenbauer mit SAP S/4HANA verkauft Maschinen, Ersatzteile, ein Fernüberwachungs-Abo pro Maschine und Wartungsverträge. Der Vertrieb erstellt alle Angebote in Revenue Cloud.

Ich würde so aufteilen:

| Umsatz | Rechnung aus | Warum |
|---|---|---|
| Maschine | SAP | Lieferung, Abnahme, Anzahlungen |
| Ersatzteile | SAP | Fakturiert mit der Lieferung |
| Fernüberwachungs-Abo | Revenue Cloud Billing | In Salesforce verkauft, geändert und verlängert |
| Wartungsgebühr | Revenue Cloud Billing | Feste Gebühr je Periode, Nachträge aus dem Vertrieb |
| Nutzung über Inklusivstunden | Revenue Cloud Billing | In Salesforce bewertet |

Für Abo- und Vertragsrechnungen erzeugt Billing die Buchungssätze, sobald Transaction Journals und Kontenzuordnungsregeln konfiguriert sind, und SAP erhält sie über die Schnittstelle:

```ablauf
sf: Auftrag, Abrechnungsplan, Rechnung Billing
erp: Lieferung SAP, Rechnung SAP, Hauptbuch SAP
Auftrag --Abo, Wartung--> Abrechnungsplan
Abrechnungsplan --Rechnungslauf--> Rechnung Billing
Rechnung Billing --Buchungssätze--> Hauptbuch SAP
Auftrag --Maschine, Teile--> Lieferung SAP
Lieferung SAP --> Rechnung SAP
Rechnung SAP --> Hauptbuch SAP
```

Der Kunde bekommt zwei Arten von Rechnungen, die der Kundenservice erklären können muss. Ist das nicht akzeptabel, bleibt jede Rechnung in SAP, und Revenue Cloud liefert die Abrechnungsdaten. Dafür braucht es eine verlässliche Schnittstelle für Nachträge. Welches System welches Objekt führt, steht in [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/).

## Finance zieht die Grenze

Finance. Das CRM-Team kann zeigen, was Billing kann, aber die Folgen trägt die Finanzabteilung: ein zweites Debitorenbuch, ein zweiter Periodenabschluss und eine zweite Stelle, die sich Wirtschaftsprüfer ansehen. Die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) hilft auch hier: Jedes Billing-Objekt braucht einen Owner, und bei Legal Entities, Buchungsperioden und Sachkonten sitzt dieser Owner in der Buchhaltung.

Ich würde die Leitung Rechnungswesen in den ersten Architektur-Workshop holen, nicht erst in den Abnahmetest.

```hinweis offen
Halten Sie mit Finance mindestens schriftlich fest: welche Umsatzarten Salesforce fakturiert, Rechnungsnummerierung und rechtlicher Aussteller, wer Perioden schließt, Stornierung und Korrektur, Verantwortung für Zahlungen und Ausgleich, Mahnwesen und Abschreibungen, Aufbewahrung von Dokumenten, Fehlerbehandlung der SAP-Schnittstelle und wie die Abstimmung mit SAP funktioniert.
```

Die Schnittstellen für Buchungssätze und Rechnungsstatus gehören zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Umsatzarten mit Rechnungsquelle auflisten

Listen Sie Ihre Umsatzarten auf und notieren Sie zu jeder, wer heute fakturiert und wie oft sich der Vertrag ändert. Zeilen mit wiederkehrenden Gebühren und häufigen Änderungen sind Kandidaten für Billing, alles andere bleibt in SAP. Das Masterclass-Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) ordnet diese Entscheidung in den gesamten Quote-to-Cash-Prozess ein.
