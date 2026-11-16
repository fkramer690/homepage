---
title: "Rückrufaktionen in Salesforce: Servicekampagnen"
description: "Wie Product Service Campaigns in Salesforce einen Rückruf über Hunderte Maschinen und Händler organisieren und welche Daten Sie für die Auswahl brauchen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: rueckrufaktionen-service-kampagnen
translationKey: manufacturing-cloud-product-service-campaigns
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, Rückrufaktion, Servicekampagnen, Händler, After-Sales]
takeaways:
  - "Product Service Campaigns gibt es seit API 50.0, die Posten seit 51.0. Beim Maschinenrückruf erhält jede Einheit einen Posten mit eigenem Status."
  - "Seit API 65.0 sind Seriennummernbereiche, Fertigungschargen, Verursacherteile, Partner und unverkaufter Händlerbestand hinzugekommen."
  - "Bevorzugte Partner führen die Arbeit je Region aus. Einsatzplanung und Techniker-App brauchen Field-Service-Lizenzen."
  - "Kampagnen gehören zu Asset Service Lifecycle Management und brauchen das Add-on Industries Field Service. Lassen Sie sich Paket und Preis im Angebot bestätigen."
faq:
  - q: "Was ist eine Product Service Campaign in Salesforce?"
    a: "Eine Product Service Campaign beschreibt Tätigkeiten an einer Gruppe von Assets, zum Beispiel einen Rückruf wegen Sicherheitsmängeln oder Produktfehlern, eine Nachbesserung oder ein Upgrade. Beim Maschinenrückruf wird für jede betroffene Maschine ein Product Service Campaign Item mit eigenem Status angelegt. Die Kampagne gibt es ab API-Version 50.0, den Posten ab 51.0."
  - q: "Woher weiß Salesforce, welche Maschinen ein Rückruf betrifft?"
    a: "Die Kampagnendefinition hält den Umfang fest: Produkt, Produktionszeitraum, Seriennummernbereich und verknüpfte Fertigungschargen. Die Assets werden über eine Actionable List ausgewählt und der Kampagne hinzugefügt, oder die Posten werden von Hand angelegt. Das funktioniert nur, wenn die nötigen Daten in Salesforce vorliegen, meist aus ERP oder Fertigung geladen."
  - q: "Können Händler Rückrufarbeiten in Salesforce erledigen?"
    a: "Das Datenmodell kennt bevorzugte Partner, die die Arbeit je Region ausführen, zu informierende Partner mit Kommunikationskanal und den unverkauften Bestand pro Partner. Die Arbeit selbst wird meist über Arbeitsauftrag und Termin in Field Service abgewickelt oder über ein Händlerportal, das Sie eigens planen und lizenzieren."
  - q: "Sind Servicekampagnen in der Manufacturing Cloud enthalten?"
    a: "Trailhead führt Product Service Campaigns unter den Servicefunktionen der Manufacturing Cloud. Die Salesforce-Hilfe ordnet sie Asset Service Lifecycle Management zu, das die Add-on-Lizenz Industries Field Service braucht. Die Preisseite der Manufacturing Cloud erwähnt sie nicht; lassen Sie sich Paket und Preis also schriftlich bestätigen."
draft: false
---

Eine Product Service Campaign in Salesforce bündelt einen Rückruf, eine Nachbesserung oder ein Upgrade für eine festgelegte Gruppe von Assets: Die Kampagne beschreibt die Tätigkeit, beim Maschinenrückruf verfolgt ein Posten pro Einheit den Status. Seit API 65.0 erfasst sie auch das fehlerhafte Teil, Seriennummernbereiche, Chargen, Partner und Händlerbestand. Ob eine Rückrufaktion über Hunderte Maschinen funktioniert, entscheidet die Rückverfolgbarkeit: Ohne verlässliche Verbindung vom fehlerhaften Teil zur Maschine umfasst sie zu viele Maschinen oder übersieht einzelne. Vor der Umsetzung würde ich klären, wer eine Kampagne auslöst, wer bezahlt und wie Händler jede Maschine melden.

## Was ist eine Product Service Campaign?

Die Objektreferenz beschreibt die [Product Service Campaign](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm) als „a set of activities to be performed on a product service campaign asset“, etwa „a product recall for safety issues or product defects“. Es gibt sie ab API 50.0, Field Service muss aktiviert sein. Das [Product Service Campaign Item](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaignitem.htm), ab API 51.0, steht für „a product service campaign's asset“ und kann auf ein Asset, ein Produkt oder ein serialisiertes Produkt zeigen. Beim Maschinenrückruf lege ich für jede betroffene Maschine einen eigenen Posten an. Der Field Service Developer Guide führt beide Objekte und ein Statusobjekt unter den [Standardobjekten von Field Service](https://developer.salesforce.com/docs/service/field-service-dev/guide/fsl-dev-soap-objects.html). Die Salesforce-Hilfe ordnet die Funktion Asset Service Lifecycle Management zu, das die Add-on-Lizenz Industries Field Service braucht.

Die Manufacturing Cloud baut darauf auf. Der [Überblick auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennt Servicekampagnen unter den Servicefunktionen: „Launch and manage proactive service campaigns for recalls, upgrades, or maintenance initiatives“. Die Kampagne ist also nicht auf Sicherheitsrückrufe beschränkt. Ein Nachrüstsatz für alle Maschinen einer Baureihe passt in dasselbe Modell. Nicht abgedeckt sind Meldungen an Behörden, Verkaufssperren und rechtlich geprüfte Kundenschreiben; sie bleiben in Ihren Qualitäts- und Rechtsprozessen.

## Seit API 65.0 kennt das Datenmodell Chargen und Verursacherteile

Das [Datenmodell für Product Service Campaigns](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) zeigt das Gesamtbild; die Tabelle unten nennt die Objekte, die für dieses Beispiel zählen. Die mit API 65.0 hinzugekommenen Objekte sind in den Developer Guides von Manufacturing Cloud und Automotive Cloud dokumentiert:

| Objekt | Inhalt |
|---|---|
| Product Service Campaign | Die Kampagne selbst |
| Product Service Campaign Item | Ein betroffenes Asset mit Status |
| Group Definition | Übergeordneter Datensatz für Definitionen, Verursacherteile und Partner |
| [Campaign Definition](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccampaigndef.htm) | Betroffenes Produkt, Produktionsbeginn und -ende, erste und letzte Seriennummer, Anzahl betroffener Einheiten |
| [Definition Production Batch](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccmpndefprodtbtch.htm) | Verknüpft eine Fertigungscharge mit der Definition |
| [Causal Item](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefcausalitm.htm) | Das fehlerhafte Produkt, das die Kampagne ausgelöst hat, mit Abhilfeart Notation, Repair oder Replace |
| [Group Definition Partner](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefptnr.htm) | Zu informierender Lieferant, Distributor oder Händler, mit Ansprechpartner und Kommunikationskanal |
| Preferred Partner | Servicepartner, der die Arbeit in einer Region ausführt, mit Rangfolge |
| [Definition Partner Inventory](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpndefptnrinv.htm) | Unverkaufte betroffene Einheiten bei einem Partner, mit Menge und Bestandsstatus |

Das Causal Item enthält außerdem die Art der Ersatzforderung: entweder eine Gutschrift vom Lieferanten ohne Rücksendung des Teils oder eine Gutschrift gegen Rücksendung. Das hält die beabsichtigte Behandlung fest; der eigentliche Regress wird als eigener Lieferantenanspruch abgewickelt, den der Lieferant ganz, teilweise oder gar nicht genehmigen kann. [Garantieansprüche von Händlern](/blog/garantieansprueche-haendler-salesforce/) beschreibt diesen Ablauf für einzelne Anträge. Das Diagramm des Datenmodells enthält außerdem Arbeitsaufträge, Termine, Retouren und Garantieanträge.

## Wie finden Sie die betroffenen Maschinen?

Hier scheitern die meisten Rückrufe, in Salesforce wie anderswo. Die Definition hält den Umfang nach Produkt, Produktionszeitraum und Seriennummernbereich fest und kann Fertigungschargen verknüpfen. Ausgewählt wird über eine Actionable List, die die Assets segmentiert und der Kampagne hinzufügt, oder Sie legen Posten von Hand an. In beiden Fällen müssen die Daten vorhanden sein:

- **Jede Maschine existiert als Asset, meist mit Seriennummer.** Wie die installierte Basis nach Salesforce gelangt, steht in [Installierte Basis in Manufacturing Cloud](/blog/installierte-basis-asset-meilensteine/).
- **Seriennummern sind innerhalb eines Produkts fortlaufend**, falls Sie überhaupt mit Bereichen arbeiten wollen.
- **Die Verbindung von Bauteilcharge zu Maschine ist bekannt.** Ist die Ventilcharge eines Lieferanten fehlerhaft, müssen Sie wissen, in welche Maschinen sie verbaut wurde. Diese Verbauinformation liegt meist in Fertigungssystemen oder im PLM, wie in [Ersatzteile per Seriennummer](/blog/ersatzteile-seriennummer-ki-agent/) beschrieben.

Fehlt eines davon, wählen Sie zwischen zwei schlechten Varianten. Wenn Sie zu breit auswählen, bezahlen Sie Arbeit an Maschinen, die in Ordnung sind. Wenn Sie zu eng auswählen, bleiben fehlerhafte Maschinen im Feld. Ich würde die Auswahllogik an einem vergangenen Qualitätsfall testen, bevor ich ihr einen echten Rückruf anvertraue.

## Praxisbeispiel: eine fehlerhafte Ventilcharge

Angenommen, ein Maschinenbauer erfährt, dass eine Ventilcharge eines Lieferanten fehlerhaft ist. Das Ventil ist in 1.800 Maschinen zweier Baureihen verbaut, verkauft über 70 Händler. 120 dieser Maschinen stehen noch unverkauft bei Händlern.

Im Datenmodell wird daraus eine Kampagne und eine Group Definition. Das Causal Item ist das Ventil. Als Abhilfeart ist Replace hinterlegt, als vorgesehene Behandlung die Rücksendung gegen Gutschrift; der Anspruch gegen den Lieferanten wird getrennt über den Lieferantenregress abgewickelt. Zwei Definitionen decken die beiden Baureihen ab, jeweils mit Produktionszeitraum, Seriennummernbereich und verknüpften Fertigungschargen. Eine Actionable List wählt die betroffenen Assets über die Chargenverknüpfung aus. Lieferant und 70 Händler sind zu informierende Group Definition Partner, die ausführenden Händler sind bevorzugte Partner für ihre Region. Die 120 unverkauften Maschinen werden im Definition Partner Inventory mit der entsprechenden Menge erfasst; Verkaufssperre und Erledigungsnachweis pro Maschine müssen Sie zusätzlich aufsetzen, damit sie repariert werden, bevor sie an Kunden ausgeliefert werden.

1.680 Maschinen bei Endkunden werden zu Kampagnenposten. Die Händler kontaktieren ihre Kunden, vereinbaren den Termin, tauschen das Ventil und melden jede Maschine als erledigt. Ist jeder Arbeitsauftrag mit dem ausführenden Händler verknüpft, sieht das Qualitätsteam pro Posten und pro Händler, wie weit die Kampagne fortgeschritten ist. Alle Zahlen sind Annahmen, die das Vorgehen zeigen.

## Wer führt die Arbeit aus?

Meist Händler und Servicepartner, manchmal eigene Techniker des Herstellers. Die Lizenzen richten sich nach der Rolle: Die Kampagne selbst erfordert das Add-on für Asset Service Lifecycle Management. Ob Arbeitsaufträge verfügbar sind, hängt vom Basisprodukt ab; Disposition, Einsatzplanung und Techniker-App erfordern Field-Service-Lizenzen für Disponenten und Techniker. Wie Partnertechniker in Field Service arbeiten, beschreiben der Beitrag zu [Servicepartnern in Field Service](/blog/salesforce-field-service-servicepartner/) und das [Kapitel zu Assets und Teilen der Field-Service-Masterclass](/masterclass/field-service/field-service-assets-wartung-teile/).

Händler ohne Field Service können die Erledigung über ein Experience-Cloud-Portal melden, aber externe Lizenzen, Objektrechte und Ablauf müssen Sie eigens planen und bestätigen lassen. Lizenzen für das Portal behandelt der Beitrag zum [Kundenportal der Manufacturing Cloud](/blog/manufacturing-cloud-kundenportal/). Unabhängig vom gewählten Weg: Die Erledigung muss pro Maschine gemeldet werden, nicht als Zahl pro Händler, sonst bildet der Kampagnenstatus in Salesforce nicht die Wirklichkeit ab.

## Wann reicht eine Liste im Qualitätssystem?

Nicht jeder Hersteller braucht dieses Datenmodell. Für kleine Aktionen reicht eine Liste der Seriennummern im Qualitätssystem plus ein Arbeitsauftrag oder Case pro Maschine. Der Aufwand für Definitionen, Partner und Partnerbestand lohnt sich erst ab einer gewissen Größe. Ich würde Product Service Campaigns einsetzen, wenn mehrere der folgenden Punkte zutreffen:

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

## Auslöser, Kosten und Meldeweg schriftlich klären

Diese Fragen würde ich vor der Umsetzung schriftlich beantworten:

1. **Wer löst eine Kampagne aus?** Meist ist die Qualität zuständig, bei Upgrades manchmal das Produktmanagement. Eine Rolle erstellt die Kampagne, eine andere gibt sie frei.
2. **Wer zahlt?** Teile, Arbeitszeit des Händlers, Anfahrt. Das Causal Item hält die beabsichtigte Gutschrift fest, der Lieferantenregress ist ein eigener Ablauf; ob Händlern ihre Arbeitszeit über Garantieanträge oder pauschal vergütet wird, entscheiden Sie.
3. **Wie wird die Erledigung gemeldet?** Sie wird pro Maschine, mit Datum und Ausführendem, über Arbeitsauftrag, Portal oder Antrag gemeldet.

Hinzu kommt die Lizenzfrage:

```hinweis offen
Die Salesforce-Hilfe nennt das Add-on Industries Field Service (Asset Service Lifecycle Management) als Lizenz für Product Service Campaigns, die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) erwähnt sie aber nicht. Lassen Sie sich von Salesforce schriftlich bestätigen, welche Ihrer Editionen es enthalten, für welche Nutzer und zu welchem Preis.
```

Den Meldeweg aus Frage 3 teste ich mit zwei Händlern, bevor die erste Kampagne startet. Einen umfassenden Überblick zum After-Sales finden Sie im [Kapitel Garantie und After-Sales](/masterclass/manufacturing-cloud/garantie-und-after-sales/) der Masterclass Manufacturing Cloud.
