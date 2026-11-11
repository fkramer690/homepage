---
title: "Pay-per-Use für Maschinen mit Revenue Cloud abrechnen"
description: "Betriebsstunden mit Revenue Cloud Usage Management abrechnen: wie das Rating funktioniert, woher die Maschinendaten kommen und was im Vertrag stehen muss."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: pay-per-use-maschinen-revenue-cloud
translationKey: usage-based-pricing-machines-revenue-cloud
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Pay-per-Use, Usage Management, Abrechnung, IoT, Maschinenbau]
takeaways:
  - "Die eigentliche Arbeit liegt außerhalb von Salesforce: je Maschine ein verlässlicher Zähler, einer Seriennummer zugeordnet und vor dem Rating geprüft."
  - "Nach Salesforce fließen nur abrechnungsrelevante Nutzungsdaten, bei Stundenverträgen ein Satz je Maschine und Tag; Zeitreihen bleiben im IoT-System."
  - "Der Vertrag legt Nutzung, gültigen Zähler, Umgang mit Datenlücken und Mindestgebühr fest, bevor jemand eine Rate Card anlegt."
  - "Consumption, Wallets und Nutzungsrechnungen erfordern Revenue Cloud Billing zusätzlich zu Advanced; Preis auf Anfrage, Abrechnung in Billing Events."
faq:
  - q: "Kann Salesforce Revenue Cloud Betriebsstunden von Maschinen abrechnen?"
    a: "Technisch ja. Mit Usage Management definieren Sie eine Nutzungsressource wie Betriebsstunden, verkaufen sie mit einem Kontingent und einem Mehrpreis und bewerten die erfassten Stunden als Liable Summary für die Abrechnung. Salesforce dokumentiert Beispiele aus den Bereichen Cloud-Speicher und Telekommunikation; die Anbindung der Maschinendaten ist Ihre eigene Integrationsarbeit."
  - q: "Was ist eine Liable Summary in Revenue Cloud?"
    a: "Laut Trailhead ist die Liable Summary der Betrag, den ein Kunde für die Nutzung in einem Zeitraum schuldet. Sie entsteht aus den bewerteten Nutzungsdatensätzen, etwa durch den geplanten Flow Orchestrate Usage Management, und wird an die Abrechnung übergeben, die daraus die Rechnung erstellt."
  - q: "Woher kommen die Nutzungsdaten für Pay-per-Use?"
    a: "Von der Maschine, meist über die Steuerung und eine IoT-Plattform oder einen Historian. Salesforce erhält Nutzungsdatensätze mit Zeitstempel, Account, Asset, Nutzungsressource, Menge und einer eindeutigen Kennung. Die Zuordnung jedes Zählers zu einer Seriennummer und die Prüfung auf Lücken und Zählerrücksetzungen gehören zu Ihrer Schnittstelle."
  - q: "Welche Lizenz brauche ich für nutzungsbasierte Abrechnung in Revenue Cloud?"
    a: "Rate Management und Usage Selling sind in Revenue Cloud Growth und Advanced enthalten. Laut dem Salesforce-Lizenzvergleich erfordern Consumption und Wallet Management sowie nutzungsbasierte Rechnungen das Zusatzprodukt Revenue Cloud Billing, das außerdem Advanced voraussetzt und dessen Preis auf Anfrage erhältlich ist. Lassen Sie die Kombination im Bestellformular festhalten."
draft: false
---

Ein Maschinenbauer kann Betriebsstunden oder Stückzahlen mit Revenue Cloud nutzungsbasiert abrechnen. Usage Management legt fest, was gemessen wird, bewertet die Nutzung mit Kontingenten und Rate Cards, führt Guthaben in Wallets und übergibt eine Liable Summary an die Abrechnung. Salesforce erläutert das allerdings anhand von Cloud-Speicher und Mobilfunkverträgen. Bei Maschinen liegt die schwierige Arbeit außerhalb von Salesforce: Sie brauchen je Maschine einen verlässlichen Zähler, der einer Seriennummer zugeordnet und vor dem Rating geprüft wird, sowie einen Vertrag, der definiert, was als Stunde zählt. Ich würde Pay-per-Use mit Revenue Cloud nur umsetzen, wenn diese Datenstrecke steht und die Nutzungsrechnung ohnehin in Salesforce erstellt wird.

## Was kann Revenue Cloud Usage Management?

Usage Management ist der Teil von Revenue Cloud für verbrauchsabhängige Produkte. Salesforce hat das Produkt in "Agentforce Revenue Management" umbenannt, Help und der Developer Guide kürzen es oft zu "Revenue Management", die Preisseiten verwenden weiterhin den Namen Revenue Cloud. Laut der [Trailhead-Einheit zu Usage Management](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/get-to-know-usage-management) können Unternehmen damit verbrauchsabhängige Produkte definieren, messen, bewerten und abrechnen, verbunden mit Angebot, Assets und Abrechnung.

Die [Einheit zu Komponenten und Rollen](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) nennt fünf Bausteine:

| Komponente | Aufgabe |
|---|---|
| Usage Modeling | Verbrauchsprodukte, Nutzungsressourcen, Mengeneinheiten, Kontingente |
| Rate Management | Regeln, die Nutzung in Beträge umrechnen |
| Usage Selling | Nutzungsprodukte in Angeboten erfassen, bestellen und aktivieren |
| Wallet Management | Wallets mit Guthaben je Nutzungsressource, gebunden an ein Asset, einen Account oder Vertrag |
| Consumption Management | Verbrauch verfolgen, rechnungsfertige Zusammenfassungen erzeugen |

Der Ablauf dahinter: Rohe Nutzungsereignisse werden im Transaction Journal erfasst. Die Datensätze werden gegen das Wallet geprüft, nach Tag, Woche, Monat oder Abrechnungszyklus zusammengefasst und mit der Rate Card bewertet. Die Liable Summary ist der Betrag, den der Kunde schuldet; der Flow Orchestrate Usage Management kann sie zeitgesteuert erzeugen. Die Abrechnung erstellt daraus die Rechnung. Der [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/usage_management_overview.htm) nennt Usage Management für Enterprise, Unlimited und Developer Edition in Lightning Experience.

## Wie passen Kontingente, Rate Cards und Mehrverbrauch zu einer Maschine?

Die [Einheit zu Nutzungsressourcen und Kontingenten](https://trailhead.salesforce.com/content/learn/modules/usage-management-with-agentforce-revenue-management/create-usage-resources-and-grants) arbeitet mit einem Mobilfunktarif aus SMS, Daten und Minuten. Übertragen auf eine Maschine sieht das so aus:

- **Nutzungsressource (Usage Resource):** Betriebsstunden mit der Mengeneinheit Stunde. Produzierte Teile oder Zyklen wären eine zweite Ressource.
- **Product Usage Resource:** verknüpft das verkaufte Produkt, etwa "Kompressor im Pay-per-Use", mit der Ressource. Ein Produkt kann mit mehreren Ressourcen verknüpft sein.
- **Kontingent (Product Usage Grant):** die enthaltene Menge, etwa 300 Stunden im Monat, mit Gültigkeit, einer Regel für den Übertrag ungenutzter Stunden und einer Verbrauchsreihenfolge.
- **Mehrverbrauch:** Eine Mehrverbrauchsregel am Kontingent, in neueren Releases eine Usage Overage Policy, berechnet Nutzung über der enthaltenen Menge zum Preis der Rate Card.
- **Rate Card:** feste oder gestaffelte Preise je Ressource, mit Einträgen, die von der Menge oder von Merkmalen wie Region oder Kundentyp abhängen können.

Mit Wallets lassen sich Warnungen auslösen, weitere Nutzung sperren oder Nachkäufe anbieten, wenn das Guthaben aufgebraucht ist. Bei Maschinen würde ich nur die Warnungen nutzen. Eine Sperre in Salesforce hält keinen Kompressor an, und eine Kundenmaschine wegen eines Abrechnungsstands abzuschalten, gehört, wenn überhaupt, in den Vertrag und in die Steuerung.

## Abrechnungsrelevante Nutzungsdatensätze aus der IoT-Plattform

Salesforce erwartet im Transaction Journal Nutzungsdatensätze mit Zeitstempel, Account, Asset, Nutzungsressource, Menge und eindeutiger Kennung. Wie sie von der Maschine dorthin gelangen, regelt Ihre Schnittstelle. Üblich ist: Die Steuerung meldet an eine IoT-Plattform oder einen Historian, der die Zeitreihen speichert. Von dort überträgt ein Job Nutzungsdatensätze in der Granularität nach Salesforce, die der Vertrag verlangt. Für einen einfachen Betriebsstundenvertrag würde ich einen verdichteten Datensatz je Maschine und Tag senden; Tarife nach Tageszeit oder eine Abrechnung von Spitzenwerten erfordern feinere Datensätze.

```ablauf
ext: Steuerung, IoT-Plattform
sf: Nutzungsdatensatz, Rating, Liable Summary, Rechnung
Steuerung --> IoT-Plattform
IoT-Plattform --je Tag verdichtet--> Nutzungsdatensatz
Nutzungsdatensatz --Wallet, Rate Card--> Rating
Rating --> Liable Summary
Liable Summary --> Rechnung
```

Zwischen den beiden Systemen liegen die Prüfungen, von denen die Richtigkeit der Rechnung abhängt:

1. **Seriennummer zu Asset und Account.** Jeder Zähler muss dem Asset und dem Account des Kunden zugeordnet sein, an den die Maschine verkauft wurde. Bei umgesetzten oder weiterverkauften Maschinen geht diese Zuordnung zuerst verloren.
2. **Zählerstände nach einem Tausch.** Nach einem Steuerungstausch beginnt der Zähler wieder bei null. Eine negative Differenz muss die Verarbeitung des Datensatzes stoppen und darf keine Gutschrift erzeugen.
3. **Lücken.** Eine Maschine ist drei Tage offline, sendet keine Daten und übermittelt danach einen großen Sprung. Ob das zulässig ist, regelt der Vertrag.
4. **Dubletten.** Eine wiederholte Übertragung darf nicht dazu führen, dass derselbe Tag zweimal abgerechnet wird.

Hochfrequente Sensordaten gehören nicht nach Salesforce. Das gilt genauso bei [Predictive Maintenance](../predictive-maintenance-salesforce-datenbasis/), wo Rohdaten über Data 360 schnell teuer werden. Der tägliche Betriebsstundenzähler ist zugleich die Grundlage, die Field Service für die Wartung nach Nutzung braucht; eine Datenstrecke kann also beide Zwecke erfüllen, sofern die Schnittstelle auch das Zählerfeld am Asset aktualisiert; die Sicht von Field Service steht im [Kapitel zu Assets und Wartung](../../masterclass/field-service/field-service-assets-wartung-teile/). Wie ich diese Schnittstelle aufsetze, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Rechenbeispiel: 120 Kompressoren mit 300 Stunden Grundkontingent

Ein Kompressorenhersteller bietet 120 Kompressoren für 40 Kunden im Pay-per-Use an. Jeder Vertrag hat eine monatliche Grundgebühr, die 300 Betriebsstunden enthält, Mehrstunden kosten in zwei Staffeln, die Rechnung wird monatlich nachträglich gestellt.

In Revenue Cloud ist die Grundgebühr ein Abo, die Betriebsstunden sind eine Nutzungsressource mit einem Kontingent von 300 Stunden im Monat ohne Übertrag, und die Rate Card enthält die beiden Staffeln. Mit der Aktivierung des Auftrags wird jeder Kompressor zu einem Asset. Weil die 300 Stunden je Kompressor gelten, erhält jedes Asset ein eigenes Wallet für Betriebsstunden. Würden die Stunden je Kunde zusammengefasst, wäre das Kontingent stattdessen an den Account gebunden, eine Entscheidung, die Sie nach dem Anlegen der Assets nicht mehr ändern können. Die IoT-Plattform übermittelt einen Datensatz je Kompressor und Tag. Am Monatsende bewertet der geplante Flow die Nutzung, die Liable Summary wird an die Abrechnung übergeben, und der Kunde erhält eine Rechnung mit Grundgebühr und Mehrstunden.

Ich würde erwarten, dass die meisten Fehler in so einem Aufbau durch die Daten entstehen: zwei Kompressoren, die zwischen Standorten getauscht wurden, ein Zähler, der beim Service ersetzt wurde, ein Kunde, der 40 Stunden für eine Woche bestreitet, in der die Maschine stillstand.

## Was muss im Pay-per-Use-Vertrag stehen?

Bevor jemand eine Rate Card anlegt, müssen sich Recht, Finanzen und Vertrieb auf diese Punkte einigen:

- **Die Einheit.** Betriebsstunden, Laststunden, Zyklen oder Gutteile. Laststunden und Gutteile sind fairer für den Kunden und schwerer zu messen.
- **Der maßgebliche Zähler.** Welches Gerät und welches System für die Rechnung maßgeblich sind und wer korrigieren darf.
- **Lücken und Ausfälle.** Schätzwert, letzter bekannter Wert oder keine Abrechnung für Zeiträume ohne Daten.
- **Mindestgebühr.** Eine Grundgebühr oder Mindestmenge sichert die Finanzierung der Maschine ab. Ohne sie kann ein Kunde die Maschine ein Quartal lang ungenutzt lassen.
- **Vorauszahlung oder nachträglich.** Bei einem vorausbezahlten Stundenpaket dient das Wallet als Budget; nach meiner Einschätzung ist die nachträgliche Abrechnung für die meisten Industriekunden einfacher.
- **Einwände.** Eine Frist, in der der Kunde widersprechen kann, und ein Nutzungsnachweis, den Sie jeder Rechnung beilegen.

Das sind kaufmännische und rechtliche Entscheidungen. Das Implementierungsteam kann diese Entscheidungen konfigurieren, Ihr Unternehmen muss sie treffen.

## Nutzungsrechnungen brauchen das Zusatzprodukt Revenue Cloud Billing

Die [Preisseite von Revenue Cloud](https://www.salesforce.com/de/sales/cpq/pricing/) nennt Revenue Cloud Advanced mit 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung, Stand 9. November 2026. Dieselbe Seite führt Revenue Cloud Billing als Zusatzprodukt mit "Usage Rating & Digital Wallet", der Rechnungsmaschine und dem Accounting Subledger, Preis auf Anfrage. Der Lizenzvergleich in Salesforce Help klärt die Aufteilung: Rate Management und Usage Selling sind in Growth und Advanced enthalten, während Consumption und Wallet Management sowie nutzungsbasierte Rechnungen Billing brauchen. Consumption Management mit Billing setzt außerdem Advanced voraus. Die Einzelheiten stehen in [Revenue Cloud: Editionen und Preise](../revenue-cloud-editionen-preise/).

Die Nutzung von Billing wird in Billing Events abgerechnet. Laut dem [Rate Sheet vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) wird ein Event je 50 US-Dollar Gesamtrechnungsbetrag verbraucht, also für gebuchte Rechnungszwischensummen einschließlich Versand und ohne Steuern. Andere Währungen werden zum durchschnittlichen Tageskurs umgerechnet, ungenutzte Events verfallen. Summieren sich die Rechnungen im Szenario oben auf 1 Million US-Dollar im Jahr, verbrauchen sie 20.000 Events. Den Preis je Event veröffentlicht Salesforce nicht. Die Einzelheiten stehen in [Revenue Cloud Billing: Kosten](../revenue-cloud-billing-kosten/).

## Wann würde ich Revenue Cloud für Pay-per-Use nicht nehmen?

In diesen Fällen prüfe ich zuerst Alternativen:

- **Die Rechnung bleibt in SAP.** Werden alle Rechnungen in SAP erstellt, fügt ein Rating in Salesforce nur zur Übergabe an SAP ein System hinzu. Einen fertigen Connector, der bewertete Nutzung als Abrechnungsbelege an SAP übergibt, habe ich nicht gefunden. Die Liable Summaries sind über die API zugänglich, eine individuelle Schnittstelle ist also möglich, aber fragen Sie Salesforce und Ihren Partner, bevor Sie eine einplanen. Die Grundsatzfrage steht in [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/).
- **Ein paar Dutzend Maschinen.** Nach meiner Einschätzung können ein monatlicher Export und ein Fakturierungsplan im ERP reichen.
- **Kein verlässlicher Zähler.** Dann beginnt das Projekt mit der Maschinenanbindung und nicht mit Revenue Cloud.
- **Pay-per-Use ist ein Pilot.** Testen Sie das Geschäftsmodell mit wenigen Kunden, bevor Sie Rate Cards für alle konfigurieren.
- **Maschinen wechseln häufig den Besitzer.** Laut Salesforce Help unterstützt Usage Management weder Übertragungen von Accounts und Assets noch Upgrades, Downgrades, Tauschvorgänge oder Nutzungsprodukte innerhalb von Bundles. Für Maschinen, die weiterverkauft, umgesetzt oder vermietet werden, brauchen Sie dafür einen manuellen Prozess.

Bevor Sie die erste Rate Card anlegen, würde ich für drei Maschinen einen Monat lang den Zähler aus der IoT-Plattform mit dem Betriebsstundenzähler an der Maschine vergleichen. Wie sich Pay-per-Use zu klassischen Wartungsverträgen verhält, beschreibe ich in [Wartungsverträge wiederkehrend abrechnen](../wartungsvertraege-wiederkehrend-abrechnen/), und das Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) ordnet beides ein.
