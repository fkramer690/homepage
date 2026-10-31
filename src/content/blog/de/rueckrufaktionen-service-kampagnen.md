---
title: "Rückrufaktionen in Salesforce: Servicekampagnen"
description: "Wie Product Service Campaigns in Salesforce einen Rückruf oder ein Upgrade über Hunderte Maschinen und Händler steuern und welche Daten Sie dafür brauchen."
pubDate: 2026-10-28
lang: de
slug: rueckrufaktionen-service-kampagnen
translationKey: manufacturing-cloud-product-service-campaigns
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, Rückrufaktion, Servicekampagnen, Händler, After-Sales]
takeaways:
  - "Product Service Campaigns gibt es seit API 51.0. Jede betroffene Maschine wird ein Kampagnenposten mit eigenem Status."
  - "Seit API 65.0 kommen Seriennummernbereiche, Fertigungschargen, Verursacherteile, Partner und unverkaufter Händlerbestand dazu."
  - "Händler und Servicepartner führen die Arbeit aus. Arbeitsaufträge und Termine sind Field Service und brauchen dessen Lizenzen."
  - "Welche Lizenz die Kampagnen selbst abdeckt, nennt weder die Preisseite noch die Referenz. Das gehört schriftlich ins Angebot."
faq:
  - q: "Was ist eine Product Service Campaign in Salesforce?"
    a: "Eine Product Service Campaign beschreibt Tätigkeiten an einer Gruppe von Assets, zum Beispiel einen Rückruf wegen Sicherheitsmängeln oder Produktfehlern, eine Nachbesserung oder ein Upgrade. Jede betroffene Maschine ist ein Product Service Campaign Item mit eigenem Status. Das Objekt gibt es ab API-Version 51.0."
  - q: "Woher weiß Salesforce, welche Maschinen ein Rückruf betrifft?"
    a: "Über Kampagnendefinitionen mit betroffenem Produkt, Produktionsbeginn, letzter betroffener Seriennummer und verknüpften Fertigungschargen. Das funktioniert nur, wenn Seriennummern und Fertigungschargen in Salesforce vorhanden sind, meist aus ERP oder Fertigung geladen."
  - q: "Können Händler Rückrufarbeiten in Salesforce erledigen?"
    a: "Das Datenmodell enthält Partner mit Rolle und Kommunikationskanal und den unverkauften Bestand pro Partner. Die Arbeit selbst läuft meist als Arbeitsauftrag und Termin, also in Field Service, oder über das Händlerportal."
  - q: "Sind Servicekampagnen in der Manufacturing Cloud enthalten?"
    a: "Trailhead führt Product Service Campaigns unter den Servicefunktionen der Manufacturing Cloud, die Preisseite erwähnt sie nicht. Lassen Sie sich schriftlich bestätigen, welche Edition sie enthält, bevor Sie einen Rückrufprozess darauf planen."
draft: false
---

Eine Product Service Campaign in Salesforce bündelt einen Rückruf, eine Nachbesserung oder ein Upgrade für eine festgelegte Gruppe von Assets: Die Kampagne beschreibt die Tätigkeit, ein Posten pro betroffener Maschine verfolgt den Status. Seit API 65.0 hält das Datenmodell auch das fehlerhafte Teil, Seriennummernbereiche, Fertigungschargen, Partner und unverkauften Händlerbestand. Ob eine Rückrufaktion über Hunderte Maschinen funktioniert, entscheidet die Rückverfolgbarkeit. Ohne Seriennummern und Fertigungschargen in Salesforce trifft die Kampagne zu viele Maschinen oder übersieht welche. Vor dem Bau würde ich klären, wer eine Kampagne auslöst, wer bezahlt und wie Händler jede erledigte Maschine melden.

## Was ist eine Product Service Campaign?

Die Objektreferenz beschreibt die [Product Service Campaign](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm) als „a set of activities to be performed on a product service campaign asset“, etwa „a product recall for safety issues or product defects“. Es gibt sie ab API 51.0. Das [Product Service Campaign Item](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaignitem.htm) steht für „a product service campaign's asset“, jede betroffene Maschine bekommt also eine eigene Zeile. Der Field Service Developer Guide führt beide Objekte und ein Statusobjekt unter den [Standardobjekten von Field Service](https://developer.salesforce.com/docs/atlas.en-us.232.0.field_service_dev.meta/field_service_dev/fsl_dev_soap_objects.htm).

Die Manufacturing Cloud baut darauf auf. Der [Überblick auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennt Servicekampagnen unter den Servicefunktionen: „Launch and manage proactive service campaigns for recalls, upgrades, or maintenance initiatives“. Die Kampagne ist also nicht auf Sicherheitsrückrufe beschränkt. Ein Nachrüstsatz für alle Maschinen einer Baureihe passt in dasselbe Modell.

## Seit API 65.0 kennt das Datenmodell Chargen und Verursacherteile

Das [Datenmodell für Product Service Campaigns](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) zeigt das Gesamtbild. Die mit API 65.0 hinzugekommenen Objekte sind in den Developer Guides von Manufacturing Cloud und Automotive Cloud dokumentiert:

| Objekt | Inhalt |
|---|---|
| Product Service Campaign | Die Kampagne selbst |
| Product Service Campaign Item | Ein betroffenes Asset mit Status |
| Group Definition | Übergeordneter Datensatz für Definitionen, Verursacherteile und Partner |
| [Campaign Definition](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccampaigndef.htm) | Betroffenes Produkt, Produktionsbeginn, letzte betroffene Seriennummer, Anzahl betroffener Einheiten |
| [Definition Production Batch](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccmpndefprodtbtch.htm) | Verknüpft eine Fertigungscharge mit der Definition |
| [Causal Item](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefcausalitm.htm) | Das fehlerhafte Produkt, das die Kampagne ausgelöst hat, mit Abhilfeart Notation, Repair oder Replace |
| [Group Definition Partner](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefptnr.htm) | Lieferant, Distributor oder Händler, mit Ansprechpartner und Kommunikationskanal |
| [Definition Partner Inventory](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpndefptnrinv.htm) | Unverkaufte betroffene Einheiten bei einem Partner, mit Menge und Bestandsstatus |

Das Causal Item trägt außerdem die Art der Ersatzforderung: entweder eine Gutschrift vom Lieferanten ohne Rücksendung des Teils oder eine Gutschrift gegen Rücksendung. Damit hängt die Kampagne am Lieferantenregress, den [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/) für einzelne Anträge beschreibt. Das Diagramm des Datenmodells enthält außerdem Arbeitsaufträge, Termine, Retouren und Garantieanträge.

## Wie finden Sie die betroffenen Maschinen?

Hier scheitern die meisten Rückrufe, in Salesforce wie anderswo. Die Definition wählt nach Produkt, Produktionsbeginn und letzter betroffener Seriennummer aus und kann Fertigungschargen verknüpfen. Das setzt drei Dinge voraus:

- **Jede Maschine existiert als Asset mit Seriennummer.** Wie die installierte Basis dorthin kommt, steht in [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).
- **Seriennummern sind innerhalb eines Produkts fortlaufend**, sodass ein Bereich etwas aussagt.
- **Die Verbindung von Bauteilcharge zu Maschine ist bekannt.** Ist die Ventilcharge eines Lieferanten fehlerhaft, müssen Sie wissen, in welche Maschinen sie verbaut wurde. Diese Verbauinformation liegt meist in Fertigung oder PLM, wie in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/) beschrieben.

Fehlt eines davon, wählen Sie zwischen zwei schlechten Varianten. Zu breit ausgewählt, bezahlen Sie Arbeit an Maschinen, die in Ordnung sind. Zu eng ausgewählt, bleiben fehlerhafte Maschinen im Feld. Ich würde die Auswahllogik an einem vergangenen Qualitätsfall testen, bevor ich ihr einen echten Rückruf anvertraue.

## Rechenbeispiel: eine fehlerhafte Ventilcharge

Angenommen, ein Maschinenbauer erfährt, dass eine Ventilcharge eines Lieferanten fehlerhaft ist. Das Ventil steckt in 1.800 Maschinen zweier Baureihen, verkauft über 70 Händler. 120 dieser Maschinen stehen noch unverkauft beim Händler.

Im Datenmodell wird daraus eine Kampagne und eine Group Definition. Das Causal Item ist das Ventil, Abhilfeart Replace, mit Rücksendung gegen Gutschrift, damit der Lieferant zahlt. Zwei Definitionen decken die beiden Baureihen ab, jeweils mit Produktionsbeginn, letzter betroffener Seriennummer und verknüpften Fertigungschargen. Lieferant und 70 Händler sind Group Definition Partner. Die 120 unverkauften Maschinen erscheinen als Partner Inventory, damit sie repariert werden, bevor sie beim Kunden ankommen.

1.680 Maschinen bei Endkunden werden zu Kampagnenposten. Die Händler kontaktieren ihre Kunden, vereinbaren den Termin, tauschen das Ventil und melden jede Maschine als erledigt. Das Qualitätsteam sieht pro Posten und pro Händler, wie weit die Kampagne ist. Alle Zahlen sind Annahmen, die das Vorgehen zeigen.

## Wer führt die Arbeit aus?

Meist Händler und Servicepartner, manchmal eigene Techniker des Herstellers. Arbeitsaufträge, Termine und Einsatzplanung gehören zu Field Service und brauchen Field-Service-Lizenzen. Wie Partnertechniker darin arbeiten, beschreiben der Beitrag zu [Servicepartnern in Field Service](../salesforce-field-service-servicepartner/) und das [Kapitel zu Assets und Teilen der Field-Service-Masterclass](../../masterclass/field-service/field-service-assets-wartung-teile/).

Händler ohne Field Service melden über das Portal. Welche Lizenz das braucht, steht im Beitrag zum [Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/). Egal welcher Weg: Die Erledigung muss pro Maschine gemeldet werden, nicht als Zahl pro Händler, sonst ist der Kampagnenstatus in Salesforce Fiktion.

## Wann reicht eine Liste im Qualitätssystem?

Nicht jeder Hersteller braucht dieses Datenmodell. Für kleine Aktionen reicht eine Liste der Seriennummern im Qualitätssystem plus ein Arbeitsauftrag oder Case pro Maschine. Der Aufwand für Definitionen, Partner und Partnerbestand lohnt sich erst ab einer gewissen Größe. Ich würde Product Service Campaigns einsetzen, wenn mehrere der Punkte für sie zutreffen:

```pro-contra
pro: Was für Servicekampagnen spricht
- **Hunderte Maschinen pro Aktion**, verteilt auf viele Kunden
- **Händler oder Servicepartner erledigen die Arbeit**, und Sie brauchen den Status pro Maschine von außerhalb des eigenen Unternehmens
- **Unverkaufter Bestand steht bei Händlern** und muss vor dem Verkauf repariert werden
- **Lieferantenregress ist relevant**, weil das fehlerhafte Teil zugekauft wurde
- **Upgrades kommen regelmäßig vor**, etwa Nachrüstsätze für eine ganze Baureihe
contra: Wann eine Liste reicht
- Ein oder zwei Feldaktionen im Jahr
- Einige Dutzend Maschinen pro Aktion
- Eigene Techniker erledigen die Arbeit
```

Für die Auswahl der Maschinen gilt in beiden Fällen dasselbe: Ohne saubere Seriennummern und Chargen hilft auch die beste Liste nicht.

## Erster Schritt: Auslöser, Kosten und Meldeweg schriftlich klären

Diese Fragen würde ich vor dem Bau schriftlich beantworten:

1. **Wer löst eine Kampagne aus?** Meist die Qualität, bei Upgrades manchmal das Produktmanagement. Eine Rolle legt an, eine andere gibt frei.
2. **Wer zahlt?** Teile, Arbeitszeit des Händlers, Anfahrt. Das Causal Item deckt den Lieferantenregress ab; ob Händler ihre Arbeitszeit über Garantieanträge oder pauschal vergütet bekommen, entscheiden Sie.
3. **Wie wird die Erledigung gemeldet?** Pro Maschine, mit Datum und Ausführendem, über Arbeitsauftrag, Portal oder Antrag.

Dazu kommt die Lizenzfrage:

```hinweis offen
Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) erwähnt Servicekampagnen nicht, und die Referenzseiten nennen keine Lizenz. Lassen Sie sich von Salesforce schriftlich bestätigen, welche Lizenz Product Service Campaigns abdeckt.
```

Den Meldeweg aus Frage 3 spiele ich mit zwei Händlern durch, bevor die erste Kampagne startet. Das ganze Bild zum After-Sales steht im [Kapitel Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/) der Masterclass Manufacturing Cloud.
