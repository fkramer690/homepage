---
title: "Pay-per-Use für Maschinen mit Revenue Cloud abrechnen"
description: "Betriebsstunden mit Revenue Cloud Usage Management abrechnen: wie das Rating funktioniert, woher die Maschinendaten kommen und was im Vertrag stehen muss."
pubDate: 2026-10-28
lang: de
slug: pay-per-use-maschinen-revenue-cloud
translationKey: usage-based-pricing-machines-revenue-cloud
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Pay-per-Use, Usage Management, Abrechnung, IoT, Maschinenbau]
takeaways:
  - "Revenue Cloud Usage Management bewertet Maschinenstunden oder Stückzahlen mit Kontingenten, Rate Cards und Wallets und übergibt eine Liable Summary an die Abrechnung."
  - "Die eigentliche Arbeit bei Pay-per-Use liegt außerhalb von Salesforce: ein verlässlicher Zähler je Maschine aus der IoT-Plattform, der Seriennummer zugeordnet und vor dem Rating geprüft."
  - "Schicken Sie einen Nutzungsdatensatz je Maschine und Tag nach Salesforce, nie Rohdaten der Sensoren; Zeitreihen bleiben in der IoT-Plattform oder im Historian."
  - "Der Vertrag muss festlegen, was als Nutzung zählt, welcher Zähler gilt, wie Datenlücken behandelt werden und wie hoch die Mindestgebühr ist, bevor jemand eine Rate Card anlegt."
  - "Usage Rating steht im Zusatzprodukt Revenue Cloud Billing, Preis auf Anfrage, abgerechnet in Billing Events, eines je 50 US-Dollar Rechnungszwischensumme."
faq:
  - q: "Kann Salesforce Revenue Cloud Betriebsstunden von Maschinen abrechnen?"
    a: "Technisch ja. Mit Usage Management definieren Sie eine Nutzungsressource wie Betriebsstunden, verkaufen sie mit einem Kontingent und einem Mehrpreis und bewerten die erfassten Stunden zu einer Liable Summary für die Abrechnung. Salesforce dokumentiert Beispiele aus Cloud-Speicher und Telekommunikation, die Anbindung der Maschinendaten ist Ihre eigene Integrationsarbeit."
  - q: "Was ist eine Liable Summary in Revenue Cloud?"
    a: "Laut Trailhead ist die Liable Summary der Betrag, den ein Kunde für die Nutzung eines Zeitraums schuldet. Sie entsteht aus den bewerteten Nutzungsdatensätzen, etwa durch den geplanten Flow Orchestrate Usage Management, und geht an die Abrechnung für die Rechnung."
  - q: "Woher kommen die Nutzungsdaten für Pay-per-Use?"
    a: "Von der Maschine, meist über die Steuerung und eine IoT-Plattform oder einen Historian. Salesforce erhält Nutzungsdatensätze mit Zeitstempel, Kunde, Produkt, Ressource und Menge. Die Zuordnung jedes Zählers zur Seriennummer und die Prüfung auf Lücken und Zählerstände nach einem Tausch gehören zu Ihrer Schnittstelle."
  - q: "Welche Lizenz brauche ich für nutzungsbasierte Abrechnung in Revenue Cloud?"
    a: "Die Preisseiten nennen Consumption & Invoicing in Revenue Cloud Advanced und Usage Rating & Digital Wallet im Zusatzprodukt Revenue Cloud Billing, dessen Preis auf Anfrage genannt wird. Lassen Sie im Bestellformular festhalten, welche Lizenz Rating und Rechnung in Ihrem Fall abdeckt."
draft: false
---

Ein Maschinenbauer kann Betriebsstunden oder Stückzahlen mit Revenue Cloud nutzungsbasiert abrechnen. Usage Management legt fest, was gemessen wird, bewertet die Nutzung mit Kontingenten und Rate Cards, führt Guthaben in Wallets und übergibt eine Liable Summary an die Abrechnung. Salesforce erklärt das allerdings mit Cloud-Speicher und Mobilfunkverträgen. Bei Maschinen liegt die schwierige Arbeit außerhalb von Salesforce: ein verlässlicher Zähler je Maschine, der Seriennummer zugeordnet und vor dem Rating geprüft, und ein Vertrag, der sagt, was eine Stunde ist. Ich würde Pay-per-Use mit Revenue Cloud nur umsetzen, wenn diese Datenstrecke steht und die Nutzungsrechnung ohnehin aus Salesforce kommt.

## Was kann Revenue Cloud Usage Management?

Usage Management ist der Teil von Revenue Cloud für verbrauchsabhängige Produkte. Trailhead nennt das Produkt noch "Agentforce Revenue Management", der Developer Guide zu Winter '27 "Revenue Management", die Preisseiten sagen Revenue Cloud. Laut der [Trailhead-Einheit zu Usage Management](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/get-to-know-usage-management) können Unternehmen damit verbrauchsabhängige Produkte definieren, messen, bewerten und abrechnen, verbunden mit Angebot, Assets und Abrechnung.

Die [Einheit zu Komponenten und Rollen](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) nennt fünf Bausteine:

| Komponente | Aufgabe |
|---|---|
| Usage Modeling | Verbrauchsprodukte, Nutzungsressourcen, Mengeneinheiten, Kontingente |
| Rate Management | Regeln, die Nutzung in Beträge umrechnen |
| Usage Selling | Nutzungsprodukte anbieten, bestellen und aktivieren |
| Wallet Management | Ein Wallet je gekaufter Ressource und Kunde, mit Guthaben |
| Consumption Management | Verbrauch verfolgen, rechnungsfertige Zusammenfassungen erzeugen |

Der Ablauf dahinter: Rohe Nutzungsereignisse landen im Transaction Journal. Die Datensätze werden gegen das Wallet geprüft, nach Tag, Woche, Monat oder Abrechnungszyklus zusammengefasst und mit der Rate Card bewertet. Die Liable Summary ist der Betrag, den der Kunde schuldet; der Flow Orchestrate Usage Management kann sie zeitgesteuert erzeugen. Die Abrechnung macht daraus die Rechnung. Der [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/usage_management_overview.htm) nennt Usage Management für Enterprise, Unlimited und Developer Edition in Lightning Experience.

## Wie passen Kontingente, Rate Cards und Mehrverbrauch zu einer Maschine?

Die [Einheit zu Nutzungsressourcen und Kontingenten](https://trailhead.salesforce.com/content/learn/modules/usage-management-with-agentforce-revenue-management/create-usage-resources-and-grants) arbeitet mit einem Mobilfunktarif aus SMS, Daten und Minuten. Übertragen auf eine Maschine sieht das so aus:

- **Nutzungsressource (Usage Resource):** Betriebsstunden mit der Mengeneinheit Stunde. Produzierte Teile oder Zyklen wären eine zweite Ressource.
- **Product Usage Resource:** verknüpft das verkaufte Produkt, etwa "Kompressor im Pay-per-Use", mit der Ressource. Ein Produkt kann mehrere Ressourcen tragen.
- **Kontingent (Product Usage Grant):** die enthaltene Menge, etwa 300 Stunden im Monat, mit Gültigkeit, einer Regel für den Übertrag ungenutzter Stunden und einer Verbrauchsreihenfolge.
- **Mehrverbrauch:** Ist das Kontingent als "Overage Chargeable" markiert, wird Nutzung über der enthaltenen Menge zum Preis der Rate Card berechnet.
- **Rate Card:** feste oder gestaffelte Preise je Ressource, mit Einträgen, die von der Menge oder von Merkmalen wie Region oder Kundentyp abhängen können.

Wallets können warnen, weitere Nutzung sperren oder ein Nachkaufen anbieten, wenn das Guthaben aufgebraucht ist. Bei Maschinen würde ich nur die Warnungen nutzen. Eine Sperre in Salesforce hält keinen Kompressor an, und eine Kundenmaschine wegen eines Abrechnungsstands abzuschalten, gehört, wenn überhaupt, in den Vertrag und in die Steuerung.

## Woher kommen die Maschinendaten?

Salesforce erwartet Nutzungsdatensätze mit Zeitstempel, Kunde, Produkt, Ressource und Menge. Wie sie von der Maschine dorthin kommen, ist Ihre Schnittstelle. Üblich ist: Die Steuerung meldet an eine IoT-Plattform oder einen Historian, der die Zeitreihen hält. Von dort schickt ein Job einen verdichteten Datensatz je Maschine und Tag nach Salesforce.

```ablauf
ext: Steuerung, IoT-Plattform
sf: Nutzungsdatensatz, Rating, Liable Summary, Rechnung
Steuerung --> IoT-Plattform
IoT-Plattform --je Tag verdichtet--> Nutzungsdatensatz
Nutzungsdatensatz --Wallet, Rate Card--> Rating
Rating --> Liable Summary
Liable Summary --> Rechnung
```

Zwischen den beiden Systemen liegen die Prüfungen, an denen die Rechnung hängt:

1. **Seriennummer zu Asset und Kunde.** Jeder Zähler muss auf das Asset zeigen, das an einen bestimmten Kunden verkauft wurde. Umgesetzte oder weiterverkaufte Maschinen brechen diese Zuordnung zuerst.
2. **Zählerstände nach einem Tausch.** Nach einem Steuerungstausch beginnt der Zähler wieder bei null. Ein negativer Wert muss den Datensatz anhalten und darf keine Gutschrift erzeugen.
3. **Lücken.** Eine Maschine ist drei Tage offline, sendet nichts und danach einen großen Sprung. Ob das zulässig ist, regelt der Vertrag.
4. **Dubletten.** Eine wiederholte Übertragung darf denselben Tag nicht zweimal abrechnen.

Rohdaten gehören nicht nach Salesforce. Das gilt genauso bei [Predictive Maintenance](../predictive-maintenance-salesforce-datenbasis/), wo Rohdaten über Data 360 schnell teuer werden. Der tägliche Betriebsstundenzähler ist zugleich das, was Field Service für die Wartung nach Nutzung braucht, eine Datenstrecke kann also beides bedienen; die Sicht von Field Service steht im [Kapitel zu Assets und Wartung](../../masterclass/field-service/field-service-assets-wartung-teile/). Wie ich diese Schnittstelle aufsetze, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Ein typisches Szenario, als Annahme

Ein Kompressorenhersteller bietet 120 Kompressoren bei 40 Kunden im Pay-per-Use an. Jeder Vertrag hat eine monatliche Grundgebühr, die 300 Betriebsstunden enthält, Mehrstunden kosten in zwei Staffeln, die Rechnung kommt monatlich nachträglich.

In Revenue Cloud ist die Grundgebühr ein Abo, die Betriebsstunden sind eine Nutzungsressource mit einem Kontingent von 300 Stunden im Monat ohne Übertrag, und die Rate Card enthält die beiden Staffeln. Mit der Aktivierung des Auftrags bekommt jeder Kunde ein Asset und ein Wallet für Betriebsstunden. Die IoT-Plattform schickt einen Datensatz je Kompressor und Tag. Am Monatsende bewertet der geplante Flow die Nutzung, die Liable Summary geht an die Abrechnung, und der Kunde erhält eine Rechnung mit Grundgebühr und Mehrstunden.

Die Fehler in so einem Aufbau kommen meist aus den Daten: zwei Kompressoren, die zwischen Standorten getauscht wurden, ein Zähler, der beim Service ersetzt wurde, ein Kunde, der 40 Stunden aus einer Woche bestreitet, in der die Maschine stand.

## Was muss im Pay-per-Use-Vertrag stehen?

Bevor jemand eine Rate Card baut, müssen sich Recht, Finanzen und Vertrieb auf diese Punkte einigen:

- **Die Einheit.** Betriebsstunden, Laststunden, Zyklen oder Gutteile. Laststunden und Gutteile sind fairer für den Kunden und schwerer zu messen.
- **Der maßgebliche Zähler.** Welches Gerät und welches System für die Rechnung zählen und wer korrigieren darf.
- **Lücken und Ausfälle.** Schätzwert, letzter bekannter Wert oder keine Berechnung für Zeiträume ohne Daten.
- **Mindestgebühr.** Eine Grundgebühr oder Mindestmenge sichert die Finanzierung der Maschine ab. Ohne sie kann ein Kunde die Maschine ein Quartal lang stehen lassen.
- **Vorauszahlung oder nachträglich.** Ein vorausbezahltes Stundenpaket nutzt das Wallet als Budget; nachträgliche Abrechnung ist für die meisten Industriekunden einfacher.
- **Einwände.** Eine Frist, in der der Kunde widersprechen kann, und der Nutzungsnachweis, den Sie jeder Rechnung beilegen.

Das sind kaufmännische und rechtliche Entscheidungen. Ein Partner konfiguriert sie, treffen muss sie Ihr Unternehmen.

## Welche Lizenzen braucht Pay-per-Use?

Die [Preisseite von Revenue Cloud](https://www.salesforce.com/de/sales/cpq/pricing/) nennt Revenue Cloud Advanced mit 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung, mit "Consumption & Invoicing" im Umfang. Dieselbe Seite führt Revenue Cloud Billing als Zusatzprodukt mit "Usage Rating & Digital Wallet", der Rechnungsmaschine und dem Accounting Subledger, Preis auf Anfrage.

```hinweis offen
Welches der beiden Produkte Rating und Rechnung für Ihren Vertrag abdeckt, gehört ins Bestellformular.
```

Billing wird in Billing Events abgerechnet. Laut dem [Rate Sheet vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) wird ein Event je 50 US-Dollar Rechnungszwischensumme verbraucht, andere Währungen werden zum durchschnittlichen Tageskurs umgerechnet, ungenutzte Events verfallen. Summieren sich die Rechnungen im Szenario oben auf 1 Million US-Dollar im Jahr, verbrauchen sie 20.000 Events. Den Preis je Event veröffentlicht Salesforce nicht. Die Einzelheiten stehen in [Revenue Cloud Billing: Kosten](../revenue-cloud-billing-kosten/).

## Wann würde ich Revenue Cloud für Pay-per-Use nicht nehmen?

In diesen Fällen schaue ich zuerst woanders hin:

- **Die Rechnung bleibt in SAP.** Kommen alle Rechnungen aus SAP, fügt ein Rating in Salesforce nur zur Übergabe an SAP ein System hinzu. Eine dokumentierte Standardübergabe bewerteter Nutzung an ein externes Abrechnungssystem habe ich nicht gefunden, fragen Sie Salesforce und Ihren Partner also, bevor Sie eine einplanen. Die Grundsatzfrage steht in [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/).
- **Ein paar Dutzend Maschinen.** Ein monatlicher Export und ein Fakturierungsplan im ERP können reichen.
- **Kein verlässlicher Zähler.** Dann beginnt das Projekt mit der Maschinenanbindung und nicht mit Revenue Cloud.
- **Pay-per-Use ist ein Pilot.** Testen Sie das Geschäftsmodell mit wenigen Kunden, bevor Sie Rate Cards für alle konfigurieren.

Wie Pay-per-Use neben klassischen Wartungsverträgen steht, beschreibe ich in [Wartungsverträge wiederkehrend abrechnen](../wartungsvertraege-wiederkehrend-abrechnen/), und das Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) ordnet beides ein.

Pay-per-Use mit Revenue Cloud funktioniert, wenn Zähler und Vertrag sauber sind, denn Salesforce bewertet nur, was Sie liefern. Wenn Sie gerade ein Nutzungsmodell für Ihre Maschinen entwerfen, [schreiben Sie mir](#contact).
