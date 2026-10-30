---
title: "E-Rechnung ab 2027: Was heißt das für Revenue Cloud?"
description: "Was die E-Rechnungspflicht ab 2027 für Hersteller bedeutet, die aus Revenue Cloud Billing oder SAP fakturieren: Regeln, Lücken in Salesforce und drei Wege."
pubDate: 2026-10-28
lang: de
slug: e-rechnung-pflicht-2027-revenue-cloud
translationKey: e-invoicing-germany-revenue-cloud
topic: revenue
categories: [revenue-cloud, architecture]
tags: [E-Rechnung, XRechnung, ZUGFeRD, Revenue Cloud Billing, SAP, Umsatzsteuer]
takeaways:
  - "Ab 1. Januar 2027 müssen Unternehmen mit mehr als 800.000 Euro Umsatz in 2026 inländische B2B-Rechnungen als E-Rechnung ausstellen, ab 1. Januar 2028 alle."
  - "Eine E-Rechnung ist ein strukturiertes elektronisches Format nach EN 16931, etwa XRechnung oder ZUGFeRD ab Version 2.0.1. Ein PDF per E-Mail zählt nicht mehr als E-Rechnung."
  - "Salesforce dokumentiert für Revenue Cloud Billing Rechnungs-PDFs. Eine native Ausgabe nach EN 16931 habe ich in der Dokumentation mit Stand Oktober 2026 nicht gefunden."
  - "Es gibt drei Wege: Rechnung aus SAP, Revenue Cloud Billing an einen E-Rechnungsdienst anbinden oder eine Partner-App nutzen."
  - "Bevor Rechnungen Salesforce verlassen, sollten Sie eine schriftliche Aussage von Salesforce zur E-Rechnung einholen und das Setup vom Steuerberater bestätigen lassen."
faq:
  - q: "Ab wann ist die E-Rechnung in Deutschland Pflicht?"
    a: "Der Empfang ist seit 1. Januar 2025 für alle inländischen Unternehmen Pflicht. Ausstellen müssen sie ab 1. Januar 2027 Unternehmen mit mehr als 800.000 Euro Vorjahresumsatz und ab 1. Januar 2028 alle für inländische B2B-Rechnungen."
  - q: "Ist eine PDF-Rechnung eine E-Rechnung?"
    a: "Nein. Eine E-Rechnung wird in einem strukturierten elektronischen Format nach EN 16931 ausgestellt, übermittelt und empfangen. Ein PDF per E-Mail gilt als sonstige Rechnung und ist nur noch in der Übergangszeit zulässig."
  - q: "Kann Revenue Cloud Billing XRechnung oder ZUGFeRD erzeugen?"
    a: "Mit Stand Oktober 2026 habe ich keine Salesforce-Dokumentation zu einer nativen Ausgabe nach EN 16931, XRechnung oder ZUGFeRD gefunden. Dokumentiert sind Rechnungs-PDFs. Fragen Sie Salesforce schriftlich und planen Sie SAP oder einen E-Rechnungsdienst als Weg ein."
  - q: "Gilt die E-Rechnungspflicht auch für Exportrechnungen?"
    a: "Die deutsche Pflicht betrifft inländische B2B-Umsätze zwischen Unternehmen, die in Deutschland ansässig sind. Rechnungen an Kunden im Ausland fallen nicht darunter, andere Länder haben aber eigene Regeln, die Ihr Steuerberater prüfen sollte."
draft: false
---

Ab 1. Januar 2027 müssen Unternehmen mit mehr als 800.000 Euro Umsatz in 2026 ihren inländischen Geschäftskunden E-Rechnungen schicken, ab 1. Januar 2028 gilt das für jede inländische B2B-Rechnung. Eine E-Rechnung ist eine strukturierte Datei nach EN 16931, etwa XRechnung oder ZUGFeRD. Ein PDF per E-Mail zählt nicht mehr. Kommen Ihre Rechnungen aus SAP, ist das ein SAP-Projekt. Kommen sie aus Revenue Cloud Billing, brauchen Sie einen Plan: Salesforce dokumentiert Rechnungs-PDFs, eine native Ausgabe nach EN 16931 habe ich mit Stand Oktober 2026 nicht gefunden. Fragen Sie Salesforce schriftlich und legen Sie den Weg fest, bevor die erste Rechnung Salesforce verlässt.

## Was verlangt die E-Rechnungspflicht?

Die Regeln stehen im Umsatzsteuergesetz und in Schreiben des Bundesfinanzministeriums. Die [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094) und die [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496) fassen sie zusammen. Der Zeitplan für inländische B2B-Rechnungen:

```zeitleiste
2025-01-01 | Alle inländischen Unternehmen müssen E-Rechnungen empfangen können. Für den Versand sind Papier und, mit Zustimmung, PDF noch erlaubt.
2027-01-01 | Unternehmen mit mehr als 800.000 Euro Umsatz in 2026 müssen E-Rechnungen ausstellen. Kleinere dürfen weiter sonstige Rechnungen schicken. EDI-Rechnungen bleiben 2027 mit Zustimmung des Empfängers zulässig.
2028-01-01 | E-Rechnung für alle inländischen B2B-Rechnungen.
```

Eine E-Rechnung wird "in einem strukturierten elektronischen Format ausgestellt, übermittelt und empfangen", das der EU-Richtlinie 2014/55/EU und damit der europäischen Norm EN 16931 entspricht. Laut IHK Stuttgart lässt das Ministerium unter anderem XRechnung und ZUGFeRD ab Version 2.0.1 zu. Eine PDF-Rechnung per E-Mail gilt seit 2025 als sonstige Rechnung.

Ausgenommen sind unter anderem Rechnungen an Verbraucher, Kleinbetragsrechnungen bis 250 Euro, Fahrausweise und bestimmte steuerfreie Umsätze. Den Übermittlungsweg schreibt das Gesetz nicht vor: E-Mail, Schnittstelle oder Download aus einem Portal sind zulässig. Das ist eine Zusammenfassung für die Planung, keine Steuerberatung. Lassen Sie die Einzelheiten von Ihrem Steuerberater bestätigen, auch das Schreiben vom Oktober 2026.

## Welche Rechnungen eines Herstellers sind betroffen?

Jede Rechnung an einen in Deutschland ansässigen Geschäftskunden: Maschinen, Ersatzteile, Serviceeinsätze, Wartungsverträge und Abonnements. Bei einem Maschinenbauer mit deutschen Händlern und Endkunden ist das der Großteil des Inlandsvolumens. Rechnungen an Kunden im Ausland fallen nicht unter die deutsche Pflicht, andere Länder haben aber eigene Regeln.

Die Grenze von 800.000 Euro gilt je Unternehmen. Eine Gruppe mit mehreren deutschen Gesellschaften prüft jede einzeln. Daraus ergibt sich auch, welche Legal Entities in Salesforce Billing ab 2027 betroffen sind und welche erst ab 2028. Für einen typischen Maschinenbauer ist die Antwort einfach: über der Grenze, also Pflicht ab 1. Januar 2027.

## Was liefert Revenue Cloud Billing heute?

Revenue Cloud Billing erzeugt Rechnungen aus Abrechnungsplänen. Die Salesforce-Hilfe und die Entwicklerdokumentation zu Winter '27 führen es unter Revenue Management, dem neueren Namen der Produktfamilie, früher Revenue Lifecycle Management. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) erzeugen Sie aus einem Rechnungslauf mit "Generate Invoice Documents" einen Stapel Rechnungs-PDFs oder ein einzelnes PDF über Flow, Apex oder OmniScript, und gebuchte Rechnungen gehen per E-Mail an den Rechnungskontakt. Das [Objekt InvoiceDocument](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_invoicedocument.htm) verfolgt den Status der Dokumente, die für Rechnungen erzeugt wurden. Die [Produktseite](https://www.salesforce.com/sales/revenue-cloud-billing/) nennt "Invoicing Engine & Document Production".

Keine dieser Quellen erwähnt EN 16931, XRechnung, ZUGFeRD oder Peppol, und weitere Salesforce-Dokumentation zu einer nativen E-Rechnungsausgabe habe ich mit Stand Oktober 2026 nicht gefunden. Ein Community-Beitrag auf [UnofficialSF](https://unofficialsf.com/e-invoicing-with-revenue-cloud/) vom Oktober 2025 beschreibt die E-Rechnung mit Revenue Cloud als Erweiterung: Eine gebuchte Rechnung löst ein Platform Event aus, Middleware wie MuleSoft bildet die Daten auf ein Format wie UBL oder Factur-X/ZUGFeRD ab, und ein externer Anbieter stellt sie zu, zum Beispiel über Peppol. Das ist der Ansatz eines Autors und keine Produktdokumentation.

```hinweis offen
Behandeln Sie die E-Rechnung also als Lücke, die Sie schließen müssen, und bitten Sie Salesforce um eine schriftliche Aussage, was Billing für Deutschland unterstützt und ab wann.
```

## Welche Wege gibt es?

Ich sehe drei Wege, und welcher passt, hängt davon ab, woher Ihre Rechnungen heute kommen.

| Weg | Wie es funktioniert | Wann es passt |
|---|---|---|
| Rechnung aus SAP | Revenue Cloud liefert Abrechnungsdaten an SAP, SAP stellt die E-Rechnung aus | SAP erzeugt bereits E-Rechnungen, und das wiederkehrende Volumen ist klein |
| E-Rechnungsdienst | Billing bucht die Rechnung, Middleware bildet XRechnung oder ZUGFeRD ab, ein Dienst prüft und stellt zu | Billing fakturiert wiederkehrende Umsätze, und alle Rechnungen sollen über einen Kanal laufen |
| Partner-App | Eine App in der Org erzeugt aus der Rechnung die strukturierte Datei | Eine App deckt Ihre Formate ab, und ein weiterer Anbieter in der Org ist akzeptabel |

**Rechnung aus SAP** hält die Compliance in einem Fakturasystem. SAP bietet die E-Rechnung für Deutschland in [SAP Document and Reporting Compliance](https://blogs.sap.com/2022/08/05/meet-your-german-customers-request-electronic-invoices-attached-to-e-mails/) an, darunter XRechnung per E-Mail und über Peppol. Fragen Sie Ihr SAP-Team, ob das bereits lizenziert und eingerichtet ist. Der Preis: Jede Vertragsänderung in Revenue Cloud muss vor dem nächsten Rechnungslauf in SAP ankommen. Die Abwägung steht in [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/).

**Ein E-Rechnungsdienst** lässt Billing als Fakturasystem bestehen. Ich würde einen Dienst wählen, der auch die Rechnungen aus SAP verarbeitet, damit Kunden jede Rechnung über denselben Kanal und mit derselben Prüfung erhalten. Die Anbindung ist ein normales Schnittstellenprojekt mit Verantwortlichem, Monitoring und Fehlerbehandlung, also die Arbeit, die ich unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/) beschreibe.

**Eine Partner-App** hält die Logik in der Org, bringt aber einen weiteren Anbieter in jedes Salesforce-Release. Prüfen Sie, welche Formate und Versionen sie unterstützt, wie sie validiert, wie sie mit Gutschriften umgeht und wer sie repariert, wenn ein Release etwas kaputt macht.

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer mit 60 Millionen Euro Umsatz fakturiert Maschinen und Ersatzteile aus SAP, das bereits E-Rechnungen ausstellt. Ab Mitte 2027 will er Fernüberwachungs-Abos aus Revenue Cloud Billing fakturieren.

Die Pflicht gilt schon, wenn die erste Billing-Rechnung rausgeht, für den neuen Prozess gibt es also keine Übergangszeit. Ich würde Billing-Rechnungen nicht als PDF starten und das Format später nachziehen. Entweder laufen die Abo-Rechnungen im ersten Jahr über SAP, oder Billing wird an den E-Rechnungsdienst angebunden, den die SAP-Rechnungen schon nutzen. Was davon passt, hängt davon ab, wie oft sich Abos ändern, beschrieben in [Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/).

## Welche Checkliste braucht das Projekt?

1. **Grenze je Gesellschaft.** Welche deutschen Gesellschaften stellen Rechnungen aus, und gilt für jede die Pflicht ab 2027 oder ab 2028?
2. **Rechnungsquelle je Umsatzart.** Welche Rechnungen kommen aus Salesforce, welche aus SAP.
3. **Format und Kanal je Kunde.** XRechnung oder ZUGFeRD, E-Mail, Peppol oder Portal, abgestimmt mit den wichtigsten Kunden.
4. **Feldzuordnung.** Jedes Pflichtfeld nach EN 16931 einem Salesforce-Feld zuordnen, mit Ihrem E-Rechnungsanbieter oder Steuerberater.
5. **Prüfung und Fehler.** Vor dem Versand validieren und festlegen, wer eine abgelehnte Rechnung korrigiert.
6. **Gutschriften.** Mit dem Steuerberater klären, wie Gutschriften und Rechnungskorrekturen ausgestellt werden.
7. **Archivierung.** Klären, wo die strukturierte Datei archiviert wird.
8. **Aussage von Salesforce.** Schriftlich, mit dem Datum, an dem Sie sie erhalten haben.

Die Kostenseite der Fakturierung aus Salesforce steht in [Revenue Cloud Billing: Kosten](../revenue-cloud-billing-kosten/), und das Masterclass-Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) ordnet die E-Rechnung in den gesamten Quote-to-Cash-Prozess ein.

Verlassen ab 2027 Rechnungen Revenue Cloud Billing, brauchen sie vom ersten Tag an einen strukturierten Weg nach EN 16931, also klären Sie ihn vor dem Go-live.
