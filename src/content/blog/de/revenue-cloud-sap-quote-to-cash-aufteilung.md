---
title: "Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?"
description: "Welche Schritte von Angebot bis Rechnung in Revenue Cloud gehören und welche in SAP S/4HANA: drei Schnitte, ein Eigentümer pro Objekt und was Billing bedeutet."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-sap-quote-to-cash-aufteilung
translationKey: revenue-cloud-sap-system-boundaries
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, SAP S/4HANA, Quote-to-Cash, Schnittstellen, Billing, Fertigung]
takeaways:
  - "Der SAP-Accelerator von MuleSoft legt den SAP-Auftrag aus Salesforce an, beschreibt das aber nur für Sales Cloud und CPQ, nicht für Revenue Cloud."
  - "Sinnvoll sind drei Schnitte: nur Angebot, Angebot und Auftrag oder Quote-to-Cash komplett mit Revenue Cloud Billing als Nebenbuch."
  - "Billing bringt eigene Legal Entities, Buchungsperioden und Sachkonten mit. Die Finanzabteilung muss vor der ersten Rechnung zustimmen."
  - "Halten Sie die Aufteilung in einer Tabelle fest, mit Eigentümer pro Objekt, Richtung jeder Schnittstelle und einer Person für Fehler."
faq:
  - q: "Soll SAP oder Revenue Cloud die Preise führen?"
    a: "Genau eines von beiden. Wenn SAP-Konditionen heute schon Kundenpreise und Rabatte abbilden, bleibt SAP führend, und das Angebot holt den Nettopreis über eine API. Salesforce Pricing lohnt sich, wenn die Logik ohnehin im Vertrieb lebt, etwa bei Abonnements und Bundles."
  - q: "Ersetzt Revenue Cloud den SAP-Kundenauftrag?"
    a: "Meist nicht. Revenue Cloud legt den Auftrag in Salesforce an und steuert ihn, eine Schnittstelle erzeugt den Kundenauftrag in SAP für die Lieferung und schreibt die SAP-Auftragsnummer zurück. Der SAP-Auftrag bleibt die Grundlage für Lieferung und Maschinenrechnung."
  - q: "Können Rechnungen aus Revenue Cloud Billing kommen, während SAP das Hauptbuch bleibt?"
    a: "Ja. Salesforce beschreibt Revenue Cloud Billing als Nebenbuch, das Buchungen und Periodenabschlüsse erzeugt und Abrechnungsdaten an das ERP synchronisiert. Die Finanzabteilung muss dann Legal Entities, Buchungsperioden und den Periodenabschluss festlegen."
  - q: "Gibt es eine Referenzarchitektur von Salesforce für Revenue Cloud mit SAP S/4HANA?"
    a: "Ich habe keine gefunden. Der MuleSoft Accelerator for SAP beschreibt Quote-to-Cash mit SAP S/4HANA für Sales Cloud und Salesforce CPQ. Das Muster lässt sich übertragen, das Design für Revenue Cloud stammt aber von Ihrem Partner und braucht eine Prüfung auf Ihrer Seite."
draft: false
---

Im Quote-to-Cash mit Revenue Cloud und SAP S/4HANA sollte Salesforce das führen, was der Vertrieb täglich ändert: Verkaufskatalog, Konfiguration, Angebot und Freigabe. SAP behält den Materialstamm, den Kundenauftrag für die Lieferung und im Maschinengeschäft die Rechnung. Revenue Cloud Billing kommt nur ins Spiel, wenn wiederkehrende oder nutzungsabhängige Umsätze in Salesforce verkauft und geändert werden. Dann wird Salesforce zum Nebenbuch, das Buchungen an SAP übergibt. Wählen Sie einen von drei Schnitten, benennen Sie einen Eigentümer pro Objekt und lassen Sie die Aufteilung von Vertrieb, Finanzen und IT unterschreiben, bevor ein Partner baut.

## Welches Muster beschreibt Salesforce für SAP?

Das nächstliegende offizielle Muster ist [Use Case 3a des MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), Quote-to-Cash zwischen Salesforce und SAP S/4HANA. Es gibt zwei Varianten. In der CPQ-Variante heißt es: "SAP S/4HANA is the system of record pricing conditions." Klickt der Vertrieb im Angebot auf Berechnen, holt die Schnittstelle den Nettopreis pro Position aus SAP und prüft einen Zusatzrabatt gegen Rabattschwellen, die in SAP gepflegt sind. Wird danach der Auftrag in Salesforce angelegt, entsteht der Auftrag in SAP S/4HANA, und die SAP-Auftragsnummer kommt zurück.

Drei Details auf dieser Seite sind für Hersteller wichtig:

- **Produkte kommen im Accelerator aus einem PIM**, globale IDs liegen in einem MDM-System. Liegt Ihr Materialstamm in SAP, übernimmt SAP diese Rolle.
- **Komplexe Preisfindung ist ausgeklammert**, ausdrücklich auch die SAP-Variantenkonfiguration. Wer Maschinen heute in SAP konfiguriert, bekommt hier keine Antwort.
- **Revenue Cloud kommt nicht vor.** Der Accelerator deckt Sales Cloud und Salesforce CPQ ab und wurde im Dezember 2021 veröffentlicht.

Das Muster lässt sich trotzdem auf Revenue Cloud übertragen, das in der Winter-'27-Dokumentation auch Revenue Management heißt und als Revenue Lifecycle Management begonnen hat. Revenue Cloud arbeitet auf Standardobjekten: Das [Datenmodell für Angebote](https://developer.salesforce.com/docs/platform/data-models/guide/transaction-management-quote.html) und das [Datenmodell für Aufträge](https://developer.salesforce.com/docs/platform/data-models/guide/transaction-mgmt-order.html) nennen Quote, Quote Line Item, Order, Order Item, Asset, Product2 und Pricebook Entry. Die Schnittstellenpunkte sind also dieselben, das Design stammt aber von Ihrem Partner, und jemand auf Ihrer Seite sollte es prüfen.

## Nur Angebot, Angebot und Auftrag oder alles bis zur Rechnung

Ich sehe drei Schnitte, die funktionieren. Jeder verschiebt die Grenze zwischen Salesforce und SAP einen Schritt weiter nach rechts.

| Schritt | Schnitt 1: nur Angebot | Schnitt 2: Angebot und Auftrag | Schnitt 3: Quote-to-Cash komplett |
|---|---|---|---|
| Verkaufskatalog, Konfiguration | Revenue Cloud | Revenue Cloud | Revenue Cloud |
| Preis | SAP oder Revenue Cloud, ein Master | ebenso | ebenso |
| Angebot und Freigabe | Revenue Cloud | Revenue Cloud | Revenue Cloud |
| Auftrag | SAP, aus dem angenommenen Angebot | Revenue Cloud, Übergabe an SAP | Revenue Cloud, Übergabe an SAP |
| Nachträge und Verlängerungen | SAP oder manuell | Revenue Cloud auf Assets | Revenue Cloud auf Assets |
| Rechnung | SAP | SAP | Revenue Cloud Billing, Buchungen an SAP |

**Schnitt 1** passt, wenn der Auftrag ein einmaliger Maschinenverkauf ist und nach der Unterschrift nur noch Logistik folgt. Salesforce übergibt ein angenommenes Angebot, SAP legt den Auftrag an.

**Schnitt 2** passt, wenn derselbe Kunde immer wieder kauft und ändert: nachgerüstete Optionen, Servicepakete, Abonnements für Fernüberwachung. Revenue Cloud hält dann Auftrag und Assets, und ein Nachtrag startet bei dem, was der Kunde schon hat. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders) geht ein aktivierter Auftrag an den Dynamic Revenue Orchestrator, der ein Fremdsystem per Callout aufrufen kann. An dieser Stelle bekommt SAP seinen Auftrag. Einzelheiten stehen in [Auftrag an SAP übergeben mit dem Dynamic Revenue Orchestrator](../revenue-cloud-auftragsorchestrierung-sap/).

**Schnitt 3** nimmt [Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/) dazu. Salesforce schreibt, dass es als Nebenbuch ("sub-ledger") arbeiten kann, mit Buchungen, Periodenabschlüssen und Währungsumrechnung, und dass Abrechnungsdaten und Buchungen an das ERP synchronisiert werden können. Das ist sinnvoll für wiederkehrende Umsätze, die in Salesforce verkauft werden. Eine Maschinenrechnung mit Lieferung, Zoll und Anzahlungen würde ich in SAP lassen. Die Abwägung steht in [Revenue Cloud Billing oder SAP: Wo entsteht die Rechnung?](../revenue-cloud-billing-oder-sap-rechnung/).

## Wem gehört welches Objekt?

Ein Schnitt nach Prozessschritten reicht nicht. Partner bauen auf Objekten, also muss die Aufteilung auch pro Objekt feststehen. Das ist dieselbe Idee wie die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), nur zwischen Systemen statt zwischen Teams.

| Objekt | Eigentümer | Was über die Grenze geht |
|---|---|---|
| Product2 | SAP oder PIM für Materialnummer und Status; Revenue Cloud für verkaufsrelevante Attribute und Katalogeinordnung | Materialnummer, Status, Einheiten nach Salesforce |
| Pricebook Entry | SAP für Listenpreise | Listenpreis pro Währung, geplant per Batch |
| Kundenpreise und Rabatte | Ein Master, SAP-Konditionen oder Salesforce Pricing | Nettopreis live aus SAP oder gar nichts |
| Quote | Revenue Cloud | Angenommenes Angebot an SAP in Schnitt 1 |
| Order | Revenue Cloud in Schnitt 2 und 3; SAP-Kundenauftrag für die Lieferung | Auftrag an SAP, SAP-Auftragsnummer und Status zurück |
| Asset | Revenue Cloud für das Verkaufte und seine Laufzeit | Seriennummer aus SAP oder Field Service |
| Invoice | SAP in Schnitt 1 und 2; Revenue Cloud Billing in Schnitt 3 | Rechnungsstatus zurück oder Buchungen an SAP |

Die Preiszeile macht den meisten Ärger. Zwei Systeme, die beide Kundenpreise rechnen, kommen irgendwann zu unterschiedlichen Ergebnissen, und der Kunde merkt es, wenn die Auftragsbestätigung aus SAP vom Angebots-PDF abweicht. Welcher Weg zu Ihren Konditionen passt, steht in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/).

## Was bedeutet Revenue Cloud Billing für die Finanzabteilung?

Eine zweite Buchhaltungsstruktur. Der Revenue Management Developer Guide listet die [Billing-Objekte für das Deployment](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_billing_objects.htm), darunter LegalEntity, AccountingPeriod, LegalEntityAccountingPeriod, GeneralLedgerAccount, TaxPolicy und PaymentTerm. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) erklärt, dass Legal Entities alle Abrechnungsvorgänge den richtigen Buchungsperioden und Sachkonten zuordnen.

Jeder dieser Datensätze existiert in SAP schon. Vor Schnitt 3 muss die Finanzabteilung deshalb entscheiden:

1. **Welche Gesellschaften aus Salesforce fakturieren** und welche in SAP bleiben.
2. **Wie die Buchungsperioden in Salesforce den SAP-Perioden folgen** und wer sie schließt.
3. **Wie die Sachkonten zugeordnet werden** und wer die Zuordnung ändert, wenn sich der Kontenplan ändert.
4. **In welchem Format der Kunde die Rechnung bekommt.** Ab 2027 dürfen laut [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094) nur noch Unternehmen mit bis zu 800.000 Euro Vorjahresumsatz inländischen Geschäftskunden mit deren Zustimmung ein PDF schicken, ab 2028 gelten die Anforderungen an die E-Rechnung für alle. Was das für Revenue Cloud heißt, steht in [E-Rechnung ab 2027](../e-rechnung-pflicht-2027-revenue-cloud/).

Saß die Finanzabteilung bei diesen vier Punkten nicht mit am Tisch, ist Schnitt 3 nicht reif.

## Rechenbeispiel: Maschinen, Ersatzteile und Fernüberwachung

Ein Maschinenbauer mit SAP S/4HANA verkauft 40 Grundmaschinen mit Optionen, Ersatzteile und pro Maschine ein Abonnement für Fernüberwachung. Kundenpreise für Ersatzteile sind seit Jahren gepflegte SAP-Konditionen. Maschinenpreise folgen Listenpreisen plus Aufpreisen für Optionen.

Ich würde Schnitt 2 wählen. Revenue Cloud führt Katalog, Konfiguration und Angebot für Maschinen und Abonnements. Maschinenpreise rechnet Revenue Cloud auf Listenpreisen, die aus SAP synchronisiert werden. Ersatzteile im selben Angebot bekommen ihren Nettopreis per API aus SAP, denn diese Konditionen sollte niemand nachbauen. Der aktivierte Auftrag geht per Callout an SAP, die SAP-Auftragsnummer kommt zurück. Das Abonnement bleibt ein Asset in Salesforce, Verlängerungen und Nachträge beginnen dort. Die Rechnung für Maschine und Abonnement kommt im ersten Jahr aus SAP. Billing in Salesforce wird erst ein Thema, wenn die Abonnements zu einem eigenen Geschäft wachsen.

```ablauf
sf: Angebot, Auftrag, Abonnement-Asset
erp: SAP-Listenpreise, SAP-Konditionen, SAP-Auftrag, SAP-Rechnung
SAP-Listenpreise --Synchronisation--> Angebot
SAP-Konditionen --Nettopreis per API--> Angebot
Angebot --> Auftrag
Auftrag --Callout--> SAP-Auftrag
SAP-Auftrag ..Auftragsnummer..> Auftrag
Auftrag --> Abonnement-Asset
SAP-Auftrag --> SAP-Rechnung
```

Was der Vertriebsinnendienst dann zusätzlich braucht, etwa den Auftragsstatus live aus SAP, folgt dem Muster aus [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

## Eine Tabelle mit Eigentümer pro Objekt

Auf einer Seite, so dass ein neuer Partner sie in zehn Minuten versteht:

- **Pro Prozessschritt:** welches System führt, vom Katalog bis zum Zahlungseingang.
- **Pro Objekt:** der Eigentümer wie in der Tabelle oben, dazu eine benannte Person.
- **Pro Schnittstelle:** Richtung, Auslöser, live oder per Batch, und was passiert, wenn SAP nicht antwortet.
- **Pro Fehler:** wer einen Auftrag repariert, den SAP ablehnt. Fehlerhafte Aufträge ohne Eigentümer landen beim Vertrieb, der sie nicht beheben kann.
- **Unterschrift:** Vertriebsleitung, Finanzleitung und IT-Leitung, festgehalten im Decision Log.

Diese Schnittstellen zu entwerfen ist ein großer Teil meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/). Die größere Frage, ob Revenue Cloud überhaupt passt, behandelt das Masterclass-Kapitel [Revenue Cloud: Überblick und Entscheidung](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/).

## Die unklaren Zeilen mit der Finanzabteilung klären

Schreiben Sie Ihre Quote-to-Cash-Schritte in eine Spalte und daneben SAP oder Salesforce, so wie es heute läuft. Markieren Sie dann die drei Zeilen, bei denen die Antwort unklar ist: In den meisten Unternehmen sind das Preis, Auftrag und Rechnung. Klären Sie diese drei mit der Finanzabteilung, bevor Sie Partner um Schätzungen bitten, denn jede Antwort verändert den Umfang um Wochen.
