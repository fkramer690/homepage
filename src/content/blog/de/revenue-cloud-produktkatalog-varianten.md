---
title: "Produktkatalog in Revenue Cloud: Varianten abbilden"
description: "Wie Maschinenbauer Varianten, Optionen und Ersatzteile im Revenue-Cloud-Katalog mit Klassifizierungen, Attributen und Bundles abbilden, ohne SAP zu kopieren."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-produktkatalog-varianten
translationKey: revenue-cloud-product-catalog-variants
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Produktkatalog, Varianten, Produktklassifizierung, Bundles, SAP]
takeaways:
  - "Der Produktkatalog in Revenue Cloud bildet ab, was der Vertrieb verkauft: Kataloge, Kategorien, Produktklassifizierungen mit Attributen, einfache Produkte, Bundles und Verkaufsmodelle."
  - "Eine Produktklassifizierung ist eine Vorlage mit Attributen. Produkte, die daraus entstehen, erben die Attribute und können sie überschreiben, eine Maschinenfamilie braucht also eine Vorlage."
  - "Eine Variante wird ein eigenes Produkt, wenn das ERP eine eigene Materialnummer hat, wenn sie in einem Sales Agreement geplant wird oder wenn sie separat gelagert und gewartet wird."
  - "Das ERP liefert Materialnummern und Listenpreise. Kategorien, Vertriebsattribute, Bundle-Struktur und Verkaufsmodelle gibt es nur in Salesforce, und sie brauchen dort einen Verantwortlichen."
  - "Katalogdatensätze sind Daten: Der Developer Guide nennt für sie eine Deployment-Reihenfolge und Lookup-Felder, sie wandern also als Daten in fester Reihenfolge durch die Pipeline."
faq:
  - q: "Was ist eine Produktklassifizierung in Revenue Cloud?"
    a: "Eine Produktklassifizierung ist eine Vorlage mit Attributen, zum Beispiel Motorleistung, Spannung und Steuerung für eine Maschinenfamilie. Produkte, die aus der Klassifizierung entstehen, erben diese Attribute und können einzelne überschreiben, die nicht passen."
  - q: "Sollte jede Maschinenvariante ein eigenes Produkt in Salesforce sein?"
    a: "Nein. Ich lege ein eigenes Produkt nur an, wenn das ERP eine eigene Materialnummer für die Variante hat, wenn sie in einem Sales Agreement geplant wird oder wenn sie separat gelagert und gewartet wird. Alles andere ist ein Attributwert an der Grundmaschine."
  - q: "Muss ich den SAP-Materialstamm in Revenue Cloud kopieren?"
    a: "Nein. Salesforce braucht die verkaufsfähigen Produkte mit Materialnummer, Bezeichnung und Listenpreis. Stücklisten, Werksdaten und Einkaufsdaten bleiben in SAP, weil das Angebot sie nicht nutzt."
  - q: "Können Ersatzteile und Services in eigenen Katalogen liegen?"
    a: "Ja. Laut Trailhead können Sie mehrere Kataloge anlegen, zum Beispiel einen für Produkte und einen für Services, und ein Produkt mehreren Kategorien oder Unterkategorien zuordnen."
draft: false
---

Im Produktkatalog von Revenue Cloud bildet ein Maschinenbauer die Vertriebssicht ab, nicht den Materialstamm aus dem ERP. Jede Maschinenfamilie bekommt eine Produktklassifizierung, also eine Vorlage mit Attributen wie Presskraft oder Steuerung. Die Grundmaschinen erben diese Attribute, und Optionen ohne eigene Materialnummer bleiben Attributwerte. Zubehör mit eigener Materialnummer wird Bestandteil eines konfigurierbaren Bundles. SAP liefert Materialnummern und Listenpreise, Salesforce verantwortet Kategorien, Vertriebsattribute und Bundle-Struktur. Ersatzteile und Services kommen in eigene Kataloge. So bleibt der Katalog bei einigen hundert Datensätzen statt tausender Varianten.

## Woraus besteht der Produktkatalog in Revenue Cloud?

Product Catalog Management ist der Teil von Revenue Cloud, der Produkte und ihre Struktur hält. Trailhead nennt es "a centralized product model that's the single source of truth for product data", und andere Clouds wie Agentforce Manufacturing (Manufacturing Cloud) können dieselben Produkt- und Preisinformationen über APIs nutzen, so das [Trailhead-Modul zu den Grundlagen](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). Ein Hinweis zu den Namen: Trailhead sagt derzeit Agentforce Revenue Management, der Developer Guide Revenue Management, salesforce.com Revenue Cloud. Die [Übersicht der Produktnamen](../revenue-cloud-produktnamen-rlm-rca/) ordnet das.

Die Bausteine laut dem [Trailhead-Modul zu Product Catalog Management](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management):

- **Kataloge** enthalten die Produkte und Bundles, die ein Unternehmen anbietet. Sie können mehrere anlegen, zum Beispiel einen für Produkte und einen für Services.
- **Kategorien und Unterkategorien** gruppieren Produkte für Navigation und Suche. Ein Produkt kann in mehreren Kategorien stehen.
- **Attribute** beschreiben Produkte. Ein Attribut wird einmal definiert und für viele Produkte wiederverwendet, Picklisten ebenso, und Attributkategorien fassen zusammengehörige Attribute zusammen.
- **Produktklassifizierungen** sind Vorlagen mit Attributen. Ein Produkt, das aus einer Klassifizierung entsteht, erbt sie, einzelne Attribute lassen sich überschreiben.
- **Einfache Produkte und Bundles.** Einfache Produkte stehen für sich, Bundles haben eine Hierarchie aus mehreren Positionen.
- **Verkaufsmodelle** (Product Selling Models) legen fest, wie ein Produkt verkauft wird, etwa als Einmalverkauf, als unbefristetes Abo (evergreen) oder als Abo mit fester Laufzeit. Ein Produkt kann laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productsellingmodel.htm) mehrere haben.

Alles davon sind Standardobjekte auf der Kernplattform, von ProductCatalog und ProductClassification bis ProductRelatedComponent und ProductSellingModel, wie das [Datenmodell](https://developer.salesforce.com/docs/platform/data-models/guide/product-catalog-mgmt.html) zeigt.

## Wie bilden Sie Maschinenvarianten ohne tausende Produkte ab?

Die wichtigste Entscheidung lautet: Wann wird eine Variante ein Produkt, und wann bleibt sie ein Attributwert? Ich nutze drei Prüffragen. Eine Variante bekommt einen eigenen Produktdatensatz, wenn

1. **das ERP eine eigene Materialnummer dafür hat**, weil der Auftrag mit dieser Nummer in SAP ankommen muss,
2. **sie in einem Sales Agreement geplant wird**, weil Agreements Mengen pro Produkt führen, wie in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/) beschrieben,
3. **sie separat gelagert oder gewartet wird**, zum Beispiel als installiertes Asset mit Seriennummer.

Alles andere bleibt ein Attributwert an der Grundmaschine. Eine Abkantpresse mit drei Biegelängen, zwei Steuerungen und optionalem Hinteranschlag ist ein Produkt mit drei Attributen, solange SAP sie aus einem konfigurierbaren Material baut.

Die Klassifizierung trägt die Attribute pro Maschinenfamilie. Trailhead zeigt den Mechanismus an einem einfachen Beispiel: Produkte erben die Attribute ihrer Klassifizierung, und ein WLAN-Tablet braucht den SIM-Typ nicht, den ihm die Kategorie mitgeben würde, also wird das Attribut überschrieben. Für eine Maschinenfamilie heißt das: eine Vorlage mit den Attributen, die der Vertrieb abfragen muss, und wenige Überschreibungen für Modelle, bei denen ein Attribut nicht passt.

Zubehör und Pakete mit eigener Materialnummer gehören in ein Bundle. Die [Trailhead-Einheit zu Bundles](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/create-a-product-bundle) erklärt die Teile: Produktgruppen im Bundle, lokale Kardinalität pro Bestandteil (Pflicht, standardmäßig enthalten, Menge änderbar oder nicht) und Gruppenkardinalität mit Mindest- und Höchstzahl an Produkten. Statische Bundles kann der Kunde nicht ändern, konfigurierbare Bundles lassen sich beim Verkauf anpassen. Für eine Maschine mit Werkzeugen, Sicherheitspaket und Inbetriebnahme ist das ein konfigurierbares Bundle mit drei Gruppen.

Welche Kombinationen erlaubt sind, entscheidet der Konfigurator, nicht der Katalog. Wie seine Regeln funktionieren, steht in [Revenue Cloud Konfigurator: Wann lohnen Constraint-Regeln?](../revenue-cloud-konfigurator-constraint-regeln/).

## Welche Daten kommen aus dem ERP und welche gibt es nur in Salesforce?

Den Materialstamm zu kopieren ist der erste Fehler, den ich in einem Katalogentwurf vermeiden würde. Salesforce braucht die verkaufsfähigen Produkte, keine Werksdaten, Einkaufsdaten oder Stücklisten. Eine Stückliste beschreibt, wie eine Maschine gebaut wird. Das Bundle beschreibt, wie sie verkauft wird. Beides sieht ähnlich aus und wird von unterschiedlichen Leuten gepflegt.

| Daten | Führendes System | Hinweis |
|---|---|---|
| Materialnummer | ERP | Schlüssel für die Auftragsübergabe |
| Produktname und Kurztext | ERP oder PIM | Übersetzungen kommen mit |
| Listenpreis | ERP | Landet im Preisbuch |
| Kategoriezuordnung | Salesforce | Vertriebsstruktur, nicht die Warengruppe aus dem ERP |
| Klassifizierung und Vertriebsattribute | Salesforce | Attributwerte müssen zu den ERP-Merkmalen passen |
| Bundle-Struktur und Kardinalität | Salesforce | Verantwortet das Produktmanagement |
| Verkaufsmodell | Salesforce | Einmalig, feste Laufzeit oder unbefristet |
| Stückliste | ERP oder PLM | Nicht in Salesforce |

Die fünfte Zeile braucht Sorgfalt.

```hinweis achtung
Hat das Attribut "Steuerung" in Salesforce den Wert "S2", muss derselbe Wert in SAP als Merkmalswert existieren, sonst scheitert der Auftrag bei der Übergabe. Ich würde pro Attribut eine Zuordnungstabelle führen und sie von der Schnittstelle prüfen lassen.
```

Wer welches Objekt in der Org verantwortet, legt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/) fest. Wie die Preise dann aus dem Preisbuch kommen, steht in [Salesforce Pricing: Wie Revenue Cloud Preise berechnet](../revenue-cloud-preisprozeduren/).

## Brauchen Ersatzteile und Services eigene Kataloge?

In den meisten Fällen ja. Ein Maschinenbauer verkauft einige Dutzend Maschinen und oft zehntausende Ersatzteile. Im Angebot braucht der Vertrieb die Maschinen, ihre Optionen und das Zubehör. Ersatzteile spielen vor allem im Service und im Händlergeschäft eine Rolle. Trailhead nennt ausdrücklich mehrere Kataloge, etwa einen Produkt- und einen Servicekatalog, und Produkte können in mehreren Kategorien stehen, wenn ein Artikel an beiden Stellen gebraucht wird.

Services wie Wartungsverträge oder Fernüberwachung brauchen zusätzlich ein Verkaufsmodell mit fester Laufzeit oder ein unbefristetes, weil sie als Abo verkauft werden. Ich würde sie in einen eigenen Katalog legen, damit Produktmanagement und Serviceleitung jeweils ihren Teil pflegen.

## Ein typisches Szenario, als Annahme: 40 Grundmaschinen mit Optionen

Ein Maschinenbauer verkauft 40 Grundmaschinen in vier Familien mit je etwa zwölf Vertriebsoptionen, dazu 60 Zubehörteile mit eigener Materialnummer und rund 8.000 Ersatzteile. Ohne Modell schlägt jemand vor, jede verkaufte Kombination als Produkt anzulegen, und schnell sind es tausende.

Mit dem Katalogmodell sieht es so aus:

- **4 Klassifizierungen**, eine pro Maschinenfamilie, mit je etwa 12 Attributen wie Arbeitsbreite, Antrieb, Steuerung und Spannung.
- **40 Produkte** für die Grundmaschinen, aus den Klassifizierungen angelegt, mit Überschreibungen, wo ein Attribut nicht passt.
- **40 konfigurierbare Bundles**, eines pro Grundmaschine, mit Gruppen für Werkzeuge, Sicherheit und Services.
- **60 Zubehörprodukte** als einfache Produkte, die als Bundle-Bestandteile dienen.
- **Ein Ersatzteilkatalog** mit den 8.000 Teilen, geladen aus SAP, und ein Servicekatalog mit drei Abo-Produkten.

Der Produktkatalog für Angebote umfasst dann rund 140 Datensätze plus die Bundles, und jede Kombination, die ein Kunde bestellen kann, ist trotzdem vollständig beschrieben.

## Katalogdaten sind Konfiguration: Wer pflegt sie, und wie kommen sie in die Produktion?

Klassifizierungen, Attribute und Bundles sind Datensätze, keine Metadaten. Katalogänderungen werden also in einer Sandbox getestet und als Daten durch dieselbe Pipeline gebracht wie Metadaten. Wie das mit SFDMU oder kommerziellen Werkzeugen geht, steht im DevOps-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/), die Besonderheiten von Revenue Cloud in [Revenue Cloud Deployments](../revenue-cloud-konfiguration-deployment/).

```vertiefung Für Entwickler
titel: Was die Object Deployment Reference vorgibt
Der Developer Guide enthält eine [Object Deployment Reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm), die für Product Catalog Management Deployment-Reihenfolge, Objekttypen, Lookup-Felder und Anforderungen an Übersetzungen aufführt. Die Katalogdaten wandern in genau dieser Reihenfolge durch die Pipeline.
```

Verantwortlich sollte das Produktmanagement des Herstellers sein, nicht der Implementierungspartner. Nach dem Go-live kommen jedes Quartal neue Maschinen, Optionen und Preisänderungen, und wer den Katalog pflegt, bestimmt, wie schnell der Vertrieb sie anbieten kann.

## Wo starten Sie?

1. **Listen Sie die Maschinenfamilien auf** und die Fragen, die der Vertrieb pro Familie stellt. Daraus werden Klassifizierungen und Attribute.
2. **Wenden Sie die drei Prüffragen** auf jede Variante an: eigene Materialnummer, im Sales Agreement geplant, separat gelagert oder gewartet.
3. **Stimmen Sie die Attributzuordnung mit SAP ab**, bevor die ersten Daten geladen werden.
4. **Trennen Sie Maschinen, Ersatzteile und Services** in Kataloge mit unterschiedlichen Verantwortlichen.
5. **Benennen Sie den Katalogverantwortlichen** und stellen Sie den Katalog als Daten unter Versionskontrolle.

Das ganze Kapitel steht im Masterclass-Teil [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/), und die Grenze zwischen SAP und Salesforce zu ziehen gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Ein guter Revenue-Cloud-Katalog beschreibt jede bestellbare Maschine mit einigen hundert Datensätzen, solange Varianten Attribute bleiben, bis das ERP etwas anderes sagt.
