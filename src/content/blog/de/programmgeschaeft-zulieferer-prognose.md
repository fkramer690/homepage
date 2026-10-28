---
title: "Programmgeschäft: Prognosen für Zulieferer"
description: "Wie das Programmgeschäft der Manufacturing Cloud aus OEM-Programmprognosen Komponentenprognosen und Sales Agreements macht, und wann es zu viel ist."
pubDate: 2026-10-28
lang: de
slug: programmgeschaeft-zulieferer-prognose
translationKey: manufacturing-cloud-program-based-business
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Programmgeschäft, Absatzprognose, Zulieferer, Sales Agreements, Data Processing Engine]
takeaways:
  - "Das Programmgeschäft hilft Zulieferern, die Komponenten in OEM-Programme liefern: Es leitet Komponentenprognosen aus Programm- und Variantenprognosen ab und macht daraus Opportunities und Sales Agreements."
  - "Programm- und Variantenprognosen kommen als CSV-Dateien, etwa aus externen Marktdaten. Komponentenprognosen berechnen vier Vorlagen der Data Processing Engine."
  - "Jede Komponente braucht einen Product-Related-Material-Datensatz mit Menge pro Einheit, Mindestmenge und Vorlaufzeit. Diese Daten liegen meist in der Konstruktion oder im ERP."
  - "Das Programmgeschäft braucht Advanced Account Forecasting, Data Pipelines, die Funktion Program Based Business und zwei Berechtigungssätze. Eine Lizenz nennt Trailhead nicht, also fragen Sie."
  - "Bei einer Handvoll Programmen oder wenn ein Planungssystem den Komponentenbedarf schon ableitet, entsteht eine zweite Prognose statt einer besseren."
faq:
  - q: "Was ist das Programmgeschäft in der Manufacturing Cloud?"
    a: "Eine Funktion der Manufacturing Cloud für Zulieferer, die Komponenten in OEM-Programme liefern. Sie führt Prognosen pro Programm, Variante und Komponente, berechnet den Komponentenbedarf mit der Data Processing Engine und wandelt freigegebene Prognosen in Opportunities und Sales Agreements um."
  - q: "Woher kommen die Programmprognosen?"
    a: "Laut Trailhead importieren Account Manager Programm- und Variantenprognosen aus externen Marktdaten als CSV-Dateien. Datensätze werden über eine externe Referenznummer abgeglichen, eine neue Datei aktualisiert also bestehende Prognosen, statt sie zu verdoppeln."
  - q: "Wie wird aus einer Komponentenprognose ein Sales Agreement?"
    a: "Die Transformation API wandelt abgeschlossene Komponentenprognosen in eine Opportunity mit Positionen und Zeitplänen pro Periode um. Ist die Opportunity gewonnen, macht die Sales Agreement Connect API daraus ein Sales Agreement mit Produkten."
  - q: "Welche Berechtigungssätze braucht das Programmgeschäft?"
    a: "Trailhead nennt Manufacturing Advanced Account Forecast und Manufacturing Program Based Business für Anwender sowie Data Pipelines Base User für Admins, die Definitionen der Data Processing Engine ausführen."
draft: false
---

Das Programmgeschäft in der Manufacturing Cloud hilft Zulieferern, die Komponenten in OEM-Programme liefern und Mengen über Jahre im Voraus planen müssen. Es übernimmt Produktionsprognosen pro Programm und Variante, oft aus externen Marktdaten, berechnet daraus den Komponentenbedarf, lässt Account Manager und Konstruktion das Ergebnis anpassen und wandelt freigegebene Prognosen in Opportunities und Sales Agreements um. Das lohnt sich bei vielen Programmen, Varianten und Komponenten und Prognosen, die heute in Tabellen liegen. Bei einer Handvoll Programmen oder wenn ein Planungssystem den Komponentenbedarf schon ableitet, entsteht eine zweite Prognose statt einer besseren.

## Was ist das Programmgeschäft in der Manufacturing Cloud?

[Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) beschreibt die Zulieferpyramide: oben der OEM, darunter Tier-1-, Tier-2- und Tier-3-Zulieferer. Startet der OEM eine neue Produktlinie, ein Programm, muss jeder Zulieferer darunter schätzen, wie viele seiner Teile dieses Programm pro Variante und Monat braucht, lange bevor der erste Auftrag kommt.

Die [Produktseite für den Vertrieb](https://salesforce.com/manufacturing/cloud/sales) nennt, was die Funktion abdeckt: Marktgröße pro Hersteller und Programm, externe Bedarfsdaten mit IHS und Dodge als Beispielen, Margen und die Wirkung von Mengenänderungen auf die Fixkostenverteilung sowie Anbauquoten und Preise für technische Änderungen. Das Beispiel bei Trailhead ist ein Fahrzeugprogramm, das Modell passt aber zu jedem Zulieferer, dessen Teile in Serienprodukte weniger großer Kunden gehen.

Die Funktion gehört zu Kapitel 2 der Masterclass, [Rahmenverträge und Prognosen](../../masterclass/manufacturing-cloud/rahmenvertraege-und-prognosen/), neben Account Forecasting. Account Forecasting plant, was bestehende Kunden von bestehenden Produkten abnehmen. Das Programmgeschäft plant den Bedarf von Programmen, die vielleicht noch gar nicht in Serie sind.

## Wie wird ein Programm abgebildet?

Das Datenmodell hat laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/explore-forecast-facts-and-create-forecast-sets) drei Ebenen mit je einem eigenen Prognoseobjekt:

| Ebene | Objekt | Woher die Zahlen kommen |
|---|---|---|
| Programm | Manufacturing Program Forecast Fact | CSV-Import |
| Variante | Manufacturing Program Variant Forecast Fact | CSV-Import |
| Komponente | Manufacturing Program Component Forecast Fact | Data Processing Engine |

Jede Ebene hat ein Forecast Set mit Dimensionen wie Werk, Modell, Variante und Teil und mit Kennzahlen wie Programmmenge, Marktanteil, Verkaufspreis oder erwartetem Gewinn pro Einheit. Alle drei müssen denselben Periodentyp nutzen; das Trailhead-Beispiel arbeitet mit 24 Monatsperioden.

Eine Programmvorlage legt fest, welche Forecast Sets auf welcher Ebene gelten, und jedes neue Programm entsteht aus einer Vorlage. Die Verbindung zwischen dem Produkt des OEM und dem Teil des Zulieferers ist der Datensatz Product Related Material: Programm, Variante, Komponente, Menge pro Produkteinheit, Mindestmenge, Vorlaufzeit und Gültigkeitsdaten. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/set-up-programs-and-products) entstehen Komponentenprognosen auf Basis dieser Daten, und eine Prognose unter der Mindestmenge wird auf die Mindestmenge angehoben.

Diesen Datensatz würde ich zuerst klären. Menge pro Einheit und Vorlaufzeit sind Daten aus Konstruktion und ERP. Pflegt sie in Salesforce niemand, rechnet die Komponentenprognose mit Zahlen, die zum Programmstart gestimmt haben.

## Woher kommen die Zahlen für Programme und Varianten?

Aus Dateien. Account Manager importieren Programm- und Variantenprognosen als CSV-Dateien in die beiden Prognoseobjekte, mit „Add and Update Records“. Abgeglichen wird über das Feld ExternalReferenceNumber, die nächste Datei aktualisiert also bestehende Prognosen, statt sie zu verdoppeln. Im Trailhead-Beispiel kommen die Daten von IHS Markit und werden vor dem Import bereinigt.

Danach passen Menschen an. Forecast Sets legen Anpassungszeiträume fest: Im Beispiel dürfen Account Manager in den ersten fünf Tagen jedes Monats ändern, Konstruktionsleiter in den fünf Tagen danach. Jede Änderung wird mit Notiz festgehalten. Erfährt ein Account Manager vom Einkauf des OEM, dass sich eine Variante besser verkauft als die Marktdaten sagen, kann er die Zahl erhöhen, und der Grund bleibt sichtbar.

## Wie werden Komponentenprognosen berechnet?

Mit vier vordefinierten Vorlagen der Data Processing Engine, Prozesstyp Program Based Business, laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/track-and-transform-component-forecasts):

- **Generate Program Component Forecast** für den ersten Lauf eines Programms oder wenn sich Programm- und Variantenprognosen ändern.
- **Calculate Program Component Forecast** rechnet jede Periode neu, etwa wenn neue Komponenten oder Product-Related-Material-Datensätze dazukommen.
- **Rollover Program Component Forecast** läuft zum Monatsende: Die erste Periode läuft ab, eine neue kommt dazu.
- **Regenerate Program Component Forecast** nach Änderungen an Forecast Sets, Dimensionen oder Periodengruppen; bestehende Datensätze laufen ab, neue entstehen.

Admins klonen und passen die Vorlagen an, geplante Flows starten sie, im Beispiel wöchentlich. Die Engine liest Programme, Variantenprognosen, Product Related Material, Produkte, Preisbucheinträge und Perioden und schreibt prognostizierte Menge und Umsatz pro Komponente und Periode.

Für die Architektur folgt daraus zweierlei. Geklonte DPE-Definitionen, Forecast Sets und Flows sind Konfiguration, die wie alles andere durch den Release-Prozess muss, wie in [Daten und Konfiguration in der Pipeline](../../masterclass/devops-release-management/daten-und-konfiguration/) beschrieben. Und die Zahl der Datensätze wächst mit Programmen, Varianten, Komponenten, Dimensionen und Perioden.

```hinweis offen
Für Account Forecasting gibt es dokumentierte Grenzen bei Prognosedatensätzen, beschrieben in [Account Forecasting für die Absatzprognose](../account-forecasting-absatzprognose-vertrieb/). Ob Komponentenprognosen gegen dieselben Grenzen zählen, habe ich nicht dokumentiert gefunden; klären Sie das vor dem ersten großen Programm.
```

## Wie wird aus einer freigegebenen Prognose ein Sales Agreement?

In zwei API-Schritten. Zuerst wandelt die Transformation API abgeschlossene Komponentenprognosen in eine Opportunity um. Die Zuordnungen werden über die Metadaten ObjectHierarchyRelationship mit dem Usage Type Transformation Mapping definiert: Komponentenprognose zu Opportunity, zu Opportunity-Position und zu deren Zeitplan, dazu eine Hilfszuordnung vom Programm zur Opportunity, weil der Account nicht automatisch gesetzt wird. Ergebnis ist eine Opportunity mit einer Position pro Komponente und einem Zeitplan pro Periode.

Ist die Opportunity gewonnen, macht die Sales Agreement Connect API aus Opportunity und Positionen ein Sales Agreement mit Produkten. Ab dann übernehmen die Ist-Mengen aus dem ERP, wie in [Sales Agreements: Kunden mit offenen Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/) beschrieben. Entsteht das Agreement stattdessen aus einem konfigurierten Angebot, steht der Weg in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/).

```ablauf
ext: Marktdaten CSV
sf: Programmprognose, Komponentenprognose, Opportunity, Sales Agreement
erp: ERP
Marktdaten CSV --Import--> Programmprognose
Programmprognose --DPE--> Komponentenprognose
Komponentenprognose --Transformation API--> Opportunity
Opportunity --gewonnen--> Sales Agreement
ERP ..Ist-Mengen..> Sales Agreement
```

Einen Freigabestatus für die Prognose beschreibt Trailhead nicht. Wer eine Komponentenprognose wann für abgeschlossen erklärt, müssen Sie selbst festlegen. Der Sales-Planning-Agent hat einen dokumentierten Subagenten, der Programmkomponentenprognosen in Opportunities umwandelt, beschrieben in [was der Sales-Planning-Agent wirklich tut](../agentforce-vertriebsplanung-rahmenvertraege/). Laufen lassen würde ich ihn erst, wenn dieser Freigabeschritt existiert.

## Was brauchen Sie, bevor Sie anfangen?

- **Funktionen im Setup:** Advanced Account Forecasting, Data Pipelines und Program Based Business. Den Metadatenschalter für Programme gibt es seit API 54.0.
- **Berechtigungssätze:** Manufacturing Advanced Account Forecast und Manufacturing Program Based Business für Anwender, Data Pipelines Base User für Admins.
- **Lizenz:** Trailhead nennt keine. Lassen Sie sie im Angebot bestätigen, wie jede Funktion aus [Manufacturing Cloud Funktionen: was enthalten ist](../manufacturing-cloud-funktionen-ueberblick/).
- **Daten:** eine Quelle für Programm- und Variantenprognosen, Product Related Material aus Konstruktion oder ERP und Preisbucheinträge für Verkaufspreise.

## Ein typisches Szenario, als Annahme

Ein Hersteller von Hydraulikzylindern liefert in 12 Programme von vier Landmaschinen-OEMs. Jedes Programm hat etwa vier Varianten, jede Variante nutzt etwa zehn Teile des Zulieferers, gefertigt in zwei Werken. Heute führt jeder Key Account Manager eine Tabelle pro OEM.

Bei 24 Monatsperioden sind das etwa 12 x 4 x 10 x 2 x 24 = 23.040 Komponentenprognosen pro Lauf, noch wenig genug, dass das Team die großen Abweichungen prüfen kann. Der Nutzen liegt an drei Stellen: eine Rechenlogik statt zwölf Tabellen, Anpassungen mit Begründung und Opportunities, die aus der Prognose entstehen, statt neu abgetippt zu werden. Die Kosten liegen in den Daten: Vorlaufzeiten und Mengen pro Einheit müssen aus der Konstruktion kommen, und Marktdaten zu Landmaschinenprogrammen müssen gekauft oder gesammelt werden.

## Wann ist das Programmgeschäft zu viel?

- **Eine Handvoll Programme.** Bei drei Programmen reichen Opportunity-Zeitpläne und eine Tabelle.
- **Ein Planungssystem leitet den Komponentenbedarf bereits** aus OEM-Prognosen ab. Dann hätte Salesforce eine zweite Prognose, und im Meeting wird über die gültige Zahl gestritten.
- **Keine externen oder OEM-Prognosen.** Ohne Programmzahlen gibt es nichts, woraus sich Komponenten ableiten lassen.
- **Keine Sales Agreements danach.** Die Umwandlung in Opportunities und Rahmenverträge ist die Hälfte des Nutzens.

Wenn Sie es einführen, braucht die Anbindung an die Planung im ERP eine führende Zahl. Das gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Das Programmgeschäft lohnt sich für Zulieferer mit vielen Programmen und einem klaren Verantwortlichen für die Komponentendaten. Wenn Sie prüfen möchten, ob es zu Ihrem OEM-Geschäft passt, [schreiben Sie mir](#contact).
