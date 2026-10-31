---
title: "Revenue Cloud Billing und nutzungsbasierte Preise"
description: "Wann Rechnungen aus Revenue Cloud Billing kommen sollten, was Billing Events kosten, was die E-Rechnung ab 2027 verlangt und wie Pay-per-Use funktioniert."
lang: de
slug: abrechnung-und-nutzungsbasierte-preise
course: revenue-cloud
translationKey: revenue-04
chapter: 4
pubDate: 2026-10-28
short: "Abrechnung und Nutzung"
summary: "Wann Rechnungen aus Revenue Cloud Billing kommen sollten, was Billing kostet, was die E-Rechnung verlangt und wie Pay-per-Use funktioniert."
takeaways:
  - "Revenue Cloud Billing lohnt sich für Abonnements, Wartungsverträge und Nutzungsentgelte, die in Salesforce verkauft und geändert werden."
  - "Billing macht Salesforce zum Nebenbuch mit Legal Entities, Buchungsperioden und Buchungssätzen. Entscheidung und Periodenabschluss verantwortet Finance."
  - "Billing ist ein Add-on mit Preis auf Anfrage und verbraucht ein Billing Event je 50 Dollar Rechnungssumme ohne Steuern. Ungenutzte Events verfallen."
  - "Ab 2027 schicken deutsche Unternehmen über 800.000 Euro Vorjahresumsatz Geschäftskunden im Inland E-Rechnungen. Der Weg steht vor der ersten Billing-Rechnung."
  - "Pay-per-Use braucht einen verlässlichen Zähler je Maschine und einen Vertrag über Einheit, Datenlücken und Mindestentgelt, bevor jemand eine Rate Card baut."
articles: [revenue-cloud-billing-or-erp-invoicing, revenue-cloud-billing-costs-billing-events, e-invoicing-germany-revenue-cloud, usage-based-pricing-machines-revenue-cloud, service-contracts-recurring-billing]
faq:
  - q: "Sollte ein Maschinenbauer aus Revenue Cloud Billing oder aus SAP fakturieren?"
    a: "Maschinen und Ersatzteile werden mit Lieferung, Abnahme und Anzahlungen fakturiert, und die laufen in SAP. Deren Rechnungen bleiben deshalb meist dort. Abonnements, Wartungsverträge und Nutzungsentgelte, die der Vertrieb in Salesforce oft ändert, sind die Kandidaten für Revenue Cloud Billing."
  - q: "Wie wird Revenue Cloud Billing abgerechnet?"
    a: "Billing ist ein Add-on mit Preis auf Anfrage. Laut Rate Sheet vom Februar 2026 verbraucht es 0,02 Billing Events je Dollar Rechnungssumme, also ein Event je 50 Dollar. Steuern zählen nicht, Versandkosten schon, und ungenutzte Events werden nicht übertragen."
  - q: "Kann Revenue Cloud Billing XRechnung oder ZUGFeRD erzeugen?"
    a: "Eine native Ausgabe nach EN 16931 habe ich im Oktober 2026 in der Salesforce-Dokumentation nicht gefunden; dokumentiert sind Rechnungs-PDFs. Fragen Sie Salesforce schriftlich und planen Sie SAP oder einen E-Rechnungsdienst als Weg für deutsche Geschäftskunden."
  - q: "Kann Revenue Cloud Betriebsstunden von Maschinen abrechnen?"
    a: "Ja. Usage Management bildet Betriebsstunden als Nutzungsressource ab, bewertet sie mit Kontingenten und Rate Cards und übergibt eine Liable Summary an die Abrechnung. Die Maschinendaten aus der IoT-Plattform, mit Seriennummern und Plausibilitätsprüfung, sind Ihre eigene Integrationsarbeit."
draft: false
---

Bei einem Hersteller bleibt die Maschinenrechnung in der Regel in SAP. Revenue Cloud Billing lohnt sich für wiederkehrende und nutzungsbasierte Umsätze, die in Salesforce verkauft und geändert werden: Abonnements, Wartungsverträge und Pay-per-Use-Entgelte. Billing macht Salesforce zum Nebenbuch mit eigenen Legal Entities und Buchungsperioden, deshalb entscheidet Finance. Es ist ein Add-on mit Preis auf Anfrage und verbraucht ein Billing Event je 50 Dollar Rechnungsbetrag. Ab 2027 müssen Rechnungen an deutsche Geschäftskunden strukturierte E-Rechnungen sein, und eine native Ausgabe nach EN 16931 habe ich in der Salesforce-Dokumentation nicht gefunden. Pay-per-Use funktioniert, wenn jede Maschine einen verlässlichen Zähler hat und der Vertrag festlegt, was eine Stunde ist.

## Welche Rechnungen gehören in Revenue Cloud Billing?

Billing kann fast jede Umsatzart fakturieren. Entscheidend ist, welches System schon alles weiß, wovon die Rechnung abhängt.

Eine Maschinenrechnung hängt an Versand, Abnahme und Anzahlungen, und alle drei laufen in SAP. Ein Abonnement für Fernüberwachung hängt am Angebot, an der Laufzeit und an jedem Nachtrag seitdem, und in Revenue Cloud liegt all das in Salesforce. Deshalb trenne ich nach Umsatzart:

| Umsatzart | Rechnung aus | Grund |
|---|---|---|
| Maschine | SAP | Lieferung, Abnahme, Anzahlungen |
| Ersatzteile | SAP | Fakturiert mit der Lieferung |
| Abonnements wie Fernüberwachung | Revenue Cloud Billing | In Salesforce verkauft, geändert und verlängert |
| Wartungspauschalen | Revenue Cloud Billing | Feste Gebühr je Periode, Nachträge aus dem Vertrieb |
| Nutzung über ein Kontingent hinaus | Revenue Cloud Billing | In Salesforce bewertet |

Das Signal, auf das ich achte: Der Vertrieb ändert jede Woche Verträge, und die Buchhaltung korrigiert jeden Monat Rechnungen, weil SAP von einer Änderung nichts erfahren hat. Dann spart Billing in Salesforce eine Übergabe. Besteht das wiederkehrende Geschäft aus ein paar hundert Verträgen mit einer Rechnung im Jahr, reicht SAP. Die ganze Abwägung steht in [Revenue Cloud Billing oder SAP](../../../blog/revenue-cloud-billing-oder-sap-rechnung/), die Systemgrenze für den gesamten Prozess aus [Kapitel 1](../revenue-cloud-ueberblick/) in [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../../../blog/revenue-cloud-sap-quote-to-cash-aufteilung/).

Die Zahlung in einem B2B-Shop ist eine eigene Grenze. Händler, die Ersatzteile im Shop bestellen, zahlen meist auf Rechnung, und die Rechnung kommt aus dem ERP. Das behandelt das [B2B-Commerce-Kapitel zu Preisen, Warenkorb und Checkout](../../b2b-commerce/preise-warenkorb-checkout/).

## Revenue Cloud Billing macht Salesforce zum Nebenbuch

Revenue Cloud Billing ist das Abrechnungs-Add-on zu Revenue Cloud. Die Salesforce-Hilfe und der [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/billing_overview.htm) zu Winter '27 nennen die Produktfamilie Revenue Management, Trailhead sagt Agentforce Revenue Management, und der frühere Name war Revenue Lifecycle Management. Suchen Sie unter allen Namen.

Die Abläufe folgen dem Auftrag aus [Kapitel 3](../angebot-vertrag-auftrag/). Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices) erzeugt die Aktivierung eines Auftrags Billing Schedule Groups und je Auftragsposition einen Billing Schedule, also einen Abrechnungsplan, für Neuverkauf, Nachtrag, Verlängerung und Kündigung gleichermaßen. Invoice Scheduler nehmen die Pläne, die zur Fakturierung bereit sind, und der Rechnungslauf nutzt für große Mengen die Data Processing Engine. Die Steuer berechnet eine externe Steuer-Engine über Steuerregeln.

Die [Produktseite](https://www.salesforce.com/sales/revenue-cloud-billing/) nennt dazu Zahlungen über Payment Gateways, Mahnwesen mit automatischen Erinnerungen und eine Buchhaltungsbasis für Buchungssätze, Periodenabschluss und Währungsumrechnung. Salesforce formuliert, Billing erlaube es Salesforce, als "sub-ledger" zu arbeiten und dabei Buchungssätze zu synchronisieren. Wegen dieses Satzes muss Finance mit am Tisch sitzen.

## Wer schließt die Periode: Finance oder das CRM-Team?

Ein Nebenbuch führt die Einzelheiten der Forderungen, also jede Rechnung, Gutschrift und Zahlung, und übergibt Buchungssätze an das Hauptbuch. Das Hauptbuch bleibt in SAP. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) ordnen Legal Entities jede Abrechnungsbuchung der richtigen Buchungsperiode und dem richtigen Sachkonto zu. All das gibt es in SAP schon, als Buchungskreise, Geschäftsjahresperioden und Sachkonten.

```hinweis offen
Bevor ein Partner etwas konfiguriert, beantwortet Finance deshalb vier Fragen:

- Welche Buchungskreise fakturieren aus Salesforce, und welche Legal Entities entsprechen ihnen?
- Wer schließt eine Buchungsperiode in Salesforce, und in welcher Reihenfolge zum Periodenabschluss in SAP?
- Wer pflegt die Zuordnung der Sachkonten, wenn sich der Kontenplan ändert?
- Wie werden die Forderungen in Salesforce und SAP zum Monatsende abgestimmt, und wer klärt Differenzen?
```

Trailhead beschreibt eine Rolle [Accounts Receivable Admin](https://trailhead.salesforce.com/content/learn/modules/billing-basics-in-revenue-cloud/explore-billing-features-and-roles), die Buchungsperioden, Buchungssätze und Finanzberichte verwaltet. In einem Fertigungsunternehmen sitzt diese Person in der Buchhaltung. Übernimmt dort niemand die Rolle, würde ich Billing nicht live nehmen. Die Schnittstellen für Buchungssätze und Rechnungsstatus gehören zu meiner Arbeit an [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

## Was kostet Billing?

Für Revenue Cloud selbst gibt es Listenpreise. Die [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) zeigt Revenue Cloud Growth mit 150 Euro und Revenue Cloud Advanced mit 200 Euro je Benutzer und Monat bei jährlicher Abrechnung, mit "Consumption & Invoicing" in Advanced. Auf der [US-Preisseite](https://www.salesforce.com/sales/cpq/pricing/) steht Revenue Cloud Billing daneben als Add-on mit "Request a Quote", bestehend aus Usage Rating & Digital Wallet, Invoicing Engine & Document Production und Accounting Subledger.

Billing wird nach Rechnungsvolumen abgerechnet, nicht nach Benutzern. Das [Rate Sheet vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) setzt 0,02 Billing Events je Dollar Rechnungssumme an, also ein Event je 50 Dollar. Gezählt wird die Zwischensumme gebuchter Rechnungen, mit Versandkosten und ohne Steuern. Andere Währungen werden zum Tagesdurchschnittskurs in Dollar umgerechnet. Die Events müssen bis zum Vertragsende verbraucht sein, nichts wird übertragen. Einen Preis je Event veröffentlicht Salesforce nicht.

```kennzahlen
150 € | Revenue Cloud Growth je Benutzer und Monat, jährlich abgerechnet
200 € | Revenue Cloud Advanced je Benutzer und Monat, mit Consumption & Invoicing
0,02 | Billing Events je Dollar Rechnungssumme, also ein Event je 50 Dollar
quelle: Revenue Cloud Preisseite (EU) und Revenue Cloud Billing Rate Sheet vom Februar 2026
```

Rechenbeispiel: Ein Maschinenbauer fakturiert 18 Millionen Euro im Jahr an Abonnements und Wartungspauschalen aus Billing, ohne Steuer. Bei angenommenen 1,15 Dollar je Euro sind das 20,7 Millionen Dollar oder 414.000 Billing Events im Jahr. Laufen zusätzlich 120 Millionen Euro Maschinenrechnungen über Billing, steigt die Zahl auf mehr als das Siebenfache, für Rechnungen, die SAP ohnehin erstellt. Der Umfang bestimmt die Kosten stärker als jede Verhandlung.

Was ins Order Form gehört, wie Rundung und Gutschriften zählen könnten und wie Sie das Kontingent über die Laufzeit staffeln, steht in [Revenue Cloud Billing: Kosten](../../../blog/revenue-cloud-billing-kosten/). Solche Lizenzprognosen gehören zu meiner Arbeit an [Make-or-Buy und Lizenzen](../../../leistungen/make-or-buy-lizenzen/).

## Was verlangt die E-Rechnungspflicht ab 2027?

Laut [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094) gelten für deutsche Unternehmen diese Stufen:

```zeitleiste
2025-01-01 | Jedes deutsche Unternehmen muss E-Rechnungen empfangen können
2027-01-01 | Sonstige Rechnungen wie PDFs nur noch für Aussteller mit bis zu 800.000 Euro Vorjahresumsatz erlaubt, dazu EDI-Rechnungen mit Zustimmung des Empfängers
2028-01 | Ab 2028 ist die E-Rechnung für alle inländischen B2B-Rechnungen Pflicht
```

Eine E-Rechnung wird in einem strukturierten Format nach EN 16931 ausgestellt, übermittelt und empfangen. Eine per E-Mail versandte PDF-Rechnung gilt seit 2025 nicht mehr als E-Rechnung. Die [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496) nennt XRechnung und ZUGFeRD ab Version 2.0.1 als zulässige Formate.

Für einen typischen Maschinenbauer heißt das: 1. Januar 2027, und zwar für jede Rechnung an einen deutschen Geschäftskunden, ob Maschine, Ersatzteil, Wartungspauschale oder Abonnement.

Auf der Salesforce-Seite dokumentiert [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) Rechnungs-PDFs aus Billing, erzeugt je Rechnungslauf oder einzeln und per E-Mail an den Rechnungskontakt versandt. Die Produktseite erwähnt die E-Rechnung nicht, und eine Salesforce-Dokumentation zu nativer Ausgabe nach EN 16931, XRechnung oder ZUGFeRD habe ich im Oktober 2026 nicht gefunden. Es bleiben drei Wege:

- **Rechnung aus SAP.** Revenue Cloud liefert die Abrechnungsdaten, SAP stellt die E-Rechnung aus. Ein Compliance-Setup, aber jeder Nachtrag muss vor dem nächsten Rechnungslauf in SAP ankommen.
- **E-Rechnungsdienst.** Billing bucht die Rechnung, eine Middleware bildet sie auf das strukturierte Format ab, ein Dienst prüft und versendet sie. Ich bevorzuge einen Dienst, der auch die SAP-Rechnungen übernimmt, damit Kunden alles über einen Kanal bekommen.
- **Partner-App in der Org.** Hält die Logik in Salesforce und bringt einen weiteren Anbieter in jedes Release.

Gehen Billing-Rechnungen nach dem 1. Januar 2027 hinaus, brauchen sie ab der ersten Rechnung einen strukturierten Weg. Starten Sie nicht mit PDFs, um das Format später nachzuziehen. Checkliste und rechtliche Details stehen in [E-Rechnung ab 2027](../../../blog/e-rechnung-pflicht-2027-revenue-cloud/). Lassen Sie das Setup von Ihrer Steuerberatung bestätigen; ich beschreibe die Systemseite, nicht das Steuerrecht.

## Pay-per-Use mit Usage Management braucht einen Zähler je Maschine

Usage Management ist der Teil von Revenue Cloud für verbrauchsbasierte Produkte. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) nennt fünf Bausteine: Usage Modelling, Rate Management, Usage Selling, Wallet Management und Consumption Management. Rohe Nutzungsereignisse landen im Transaction Journal. Bewertete Nutzung endet in einer Liable Summary, dem Betrag, den der Kunde schuldet, und die geht zur Rechnung an Billing.

```ablauf
ext: IoT-Plattform
sf: Transaction Journal, Liable Summary, Billing-Rechnung
IoT-Plattform --Wert je Tag--> Transaction Journal
Transaction Journal --Rate Card--> Liable Summary
Liable Summary --> Billing-Rechnung
```

Für eine Maschine lässt sich das direkt übertragen. Betriebsstunden werden zur Nutzungsressource, das verkaufte Produkt trägt ein Kontingent von zum Beispiel 300 Stunden im Monat, und eine Rate Card bepreist die Stunden darüber in Staffeln. Jeder Kunde bekommt mit der Auftragsaktivierung ein Wallet je Ressource. Die Beispiele von Salesforce sind allerdings Cloud-Speicher und Mobilfunktarife, und der schwierige Teil liegt bei Maschinen außerhalb von Salesforce:

| Voraussetzung | Was dazu gehört |
|---|---|
| Ein verlässlicher Zähler je Maschine | Die Steuerung meldet an eine IoT-Plattform oder einen Historian, der die Zeitreihen hält. Salesforce bekommt einen Datensatz je Maschine und Tag, nie Rohwerte. |
| Prüfungen vor der Bewertung | Seriennummer zu Asset und Account, Zählerrücksprünge nach einem Steuerungstausch, Lücken, wenn eine Maschine offline war, Dubletten aus wiederholten Übertragungen. |
| Ein Vertrag, der die Einheit festlegt | Betriebsstunden, Laststunden oder Gutteile; welcher Zähler verbindlich ist; wie Lücken behandelt werden; das Mindestentgelt, das die Finanzierung der Maschine absichert. |

Derselbe Tageszähler steuert oft auch die Wartung nach Betriebsstunden in Field Service, ein Datenstrom kann also beides bedienen. Die Field-Service-Sicht steht im [Kapitel zu Assets und Wartung](../../field-service/field-service-assets-wartung-teile/). Die Bewertung steckt als "Usage Rating & Digital Wallet" im Billing-Add-on; klären Sie im Order Form, welche Lizenz sie abdeckt. Szenario und Vertrags-Checkliste stehen in [Pay-per-Use für Maschinen](../../../blog/pay-per-use-maschinen-revenue-cloud/).

Bleiben alle Rechnungen in SAP, würde ich zweimal überlegen, ob die Nutzung in Salesforce bewertet werden soll. Eine dokumentierte Standardübergabe bewerteter Nutzung an ein externes Abrechnungssystem habe ich nicht gefunden.

## Wartungsverträge als wiederkehrender Umsatz

Die meisten Maschinenbauer haben den wiederkehrenden Umsatz, für den Billing gebaut ist, schon: Wartungsverträge. In Revenue Cloud ist der Vertrag ein Produkt mit einem Abo-Verkaufsmodell. Die Auftragsaktivierung erzeugt ein Asset für den Vertrag und Abrechnungspläne, und ein Invoice Scheduler fakturiert ihn, zum Beispiel quartalsweise im Voraus. Jede Erweiterung, Verlängerung oder Kündigung läuft über Angebot und Auftrag, wie in [Kapitel 3](../angebot-vertrag-auftrag/) beschrieben. Ein Servicemanager, der am Telefon eine Maschine in den Vertrag aufnimmt, hat für Billing nichts geändert.

Field Service liest keine Revenue-Cloud-Abonnements. Servicevertrag, Vertragspositionen, Wartungsplan und Entitlement liefern die Einsätze, und eine dokumentierte Standardverbindung vom verkauften Abonnement zum Servicevertrag habe ich nicht gefunden. Planen Sie einen Flow bei Auftragsaktivierung, der sie anlegt oder aktualisiert. Meine Regel für die Datensätze:

- Das Revenue-Cloud-Asset beantwortet, was verkauft wurde, für wie lange und zu welchem Preis.
- Der Field-Service-Servicevertrag beantwortet, welche Maschinen welchen Service-Level bekommen.
- Das Maschinen-Asset mit Seriennummer gehört dem Service und kommt meist aus dem ERP.

Die Details, mit einem Szenario über 800 quartalsweise abgerechnete Maschinen, stehen in [Wartungsverträge wiederkehrend abrechnen](../../../blog/wartungsvertraege-wiederkehrend-abrechnen/).

## Erster Schritt: Finance legt den Rechnungssteller je Umsatzart fest

Ein angenommenes Beispiel: Ein Maschinenbauer mit SAP S/4HANA erstellt Angebote für Maschinen, Ersatzteile, Fernüberwachung und Wartungsverträge in Revenue Cloud. Maschinen und Ersatzteile fakturiert SAP, das bereits E-Rechnungen erzeugt. Abonnements, Wartungspauschalen und zusätzliche Betriebsstunden gehen an Billing, angebunden an den E-Rechnungsdienst, den SAP schon nutzt. Der Kunde bekommt zwei Arten von Rechnungen über einen Kanal, und der Kundendienst kann erklären, warum.

Damit das klappt, legt der Kunde diese Punkte selbst fest, bevor der Partner konfiguriert:

| Festlegung | Was dazu gehört |
|---|---|
| Den Rechnungssteller je Umsatzart | Schriftlich und von Finance unterschrieben. |
| Den Accounts Receivable Admin | In der Buchhaltung, dazu die Reihenfolge des Periodenabschlusses in Salesforce und SAP. |
| Den E-Rechnungsweg | Für jede deutsche Legal Entity, vor der ersten Billing-Rechnung. |
| Eine Prognose der Billing Events | Je Vertragsjahr, verantwortet von Finance, mit dem Preis je Event aus dem Angebot. |
| Den Nutzungsdatenstrom und die Vertragsbedingungen | Für Pay-per-Use, bevor es eine Rate Card gibt. |
| Die Verbindung zu Field Service | Für Wartungsverträge, als Automatisierung mit Verantwortlichem. |

Wer heute noch das alte Salesforce-Billing-Paket nutzt, muss zusätzlich offene Rechnungen, Abrechnungspläne und Zahlungshistorie umziehen. Diese Migration gehört zu [Kapitel 5, von CPQ zu Revenue Cloud](../von-cpq-zu-revenue-cloud/).
