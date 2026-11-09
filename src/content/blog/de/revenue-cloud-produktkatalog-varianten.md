---
title: "Produktkatalog in Revenue Cloud: Varianten abbilden"
description: "Wie Maschinenbauer Varianten, Optionen und Ersatzteile im Revenue-Cloud-Katalog mit Klassifizierungen, Attributen und Bundles abbilden, ohne SAP zu kopieren."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-produktkatalog-varianten
translationKey: revenue-cloud-product-catalog-variants
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Produktkatalog, Varianten, Produktklassifizierung, Bundles, SAP]
takeaways:
  - "Produkte aus einer Klassifizierung erben deren Attribute und können sie überschreiben. Eine Maschinenfamilie startet meist mit einer Vorlage."
  - "Eine eigene Materialnummer allein erzwingt kein eigenes Produkt. Mehrere ERP-SKUs können auf ein Produkt mit Attributen abgebildet werden."
  - "Kategorien, Bundles und Verkaufsmodelle brauchen Datensätze in Salesforce und einen Verantwortlichen, egal welches System führt."
  - "Katalogdatensätze wandern als Daten durch die Pipeline, mit der Reihenfolge des Developer Guide als Basis."
faq:
  - q: "Was ist eine Produktklassifizierung in Revenue Cloud?"
    a: "Eine Produktklassifizierung ist eine Vorlage mit Attributen, zum Beispiel Motorleistung, Spannung und Steuerung für eine Maschinenfamilie. Produkte, die aus der Klassifizierung entstehen, erben diese Attribute und können einzelne überschreiben, die nicht passen."
  - q: "Sollte jede Maschinenvariante ein eigenes Produkt in Salesforce sein?"
    a: "Nein. Eine Variante bleibt bei mir ein Attributwert an der Grundmaschine, solange der Vertrieb sie als ein Angebot verkauft. Braucht SAP eigene Materialnummern, kann Dynamic Revenue Orchestrator die Attributauswahl darauf abbilden. Ein eigenes Produkt lohnt sich bei eigener Preisliste, eigenem Servicemodell oder eigenem Lebenszyklus. Sales Agreements können dasselbe Produkt mehrfach mit unterschiedlichen Attributwerten führen."
  - q: "Muss ich den SAP-Materialstamm in Revenue Cloud kopieren?"
    a: "Nein. Salesforce braucht die verkaufsfähigen Produkte mit einem Schlüssel, der auf SAP abbildet, einer Bezeichnung und den Preisen, die das Angebot nutzt. Stücklisten, Werksdaten und Einkaufsdaten bleiben in SAP, weil das Angebot sie nicht nutzt."
  - q: "Können Ersatzteile und Services in eigenen Katalogen liegen?"
    a: "Ja. Laut Trailhead können Sie mehrere Kataloge anlegen, zum Beispiel einen für Produkte und einen für Services, und ein Produkt mehreren Kategorien oder Unterkategorien zuordnen."
draft: false
---

Im Produktkatalog von Revenue Cloud bildet ein Maschinenbauer die Vertriebssicht ab, nicht den Materialstamm aus dem ERP. Jede Maschinenfamilie bekommt eine Produktklassifizierung, also eine Vorlage mit Attributen wie Presskraft oder Steuerung. Die Grundmaschinen erben diese Attribute, und Optionen bleiben Attributwerte, solange der Vertrieb sie als ein Angebot verkauft. Zubehör, das separat gewählt wird, wird Bestandteil eines konfigurierbaren Bundles. SAP liefert meist Materialnummern und Listenpreise, Salesforce hält Kategorien, Vertriebsattribute und Bundle-Struktur. So bleibt das Angebotssortiment bei rund 140 Produktdatensätzen statt tausender Varianten.

## Woraus besteht der Produktkatalog in Revenue Cloud?

Product Catalog Management ist der Teil von Agentforce Revenue Management, früher Revenue Cloud, der Produkte und ihre Struktur hält. Ich bleibe hier beim Namen Revenue Cloud, weil die Lizenzen ihn noch tragen, etwa Revenue Cloud Advanced. Trailhead nennt es "a centralized product model that's the single source of truth for product data", und andere Clouds wie Agentforce Manufacturing (Manufacturing Cloud) können dieselben Produkt- und Preisinformationen über APIs nutzen, so das [Trailhead-Modul zu den Grundlagen](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). Die Dokumentation nutzt auch das kürzere Revenue Management; die [Übersicht der Produktnamen](../revenue-cloud-produktnamen-rlm-rca/) ordnet das.

Die Bausteine laut dem [Trailhead-Modul zu Product Catalog Management](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management):

- **Kataloge** enthalten die Produkte und Bundles, die ein Unternehmen anbietet. Sie können mehrere anlegen, zum Beispiel einen für Produkte und einen für Services.
- **Kategorien und Unterkategorien** gruppieren Produkte für Navigation und Suche. Ein Produkt kann in mehreren Kategorien stehen.
- **Attribute** beschreiben Produkte. Ein Attribut wird einmal definiert und für viele Produkte wiederverwendet, Picklisten ebenso, und Attributkategorien fassen zusammengehörige Attribute zusammen.
- **Produktklassifizierungen** sind Vorlagen mit Attributen. Ein Produkt, das aus einer Klassifizierung entsteht, erbt sie, einzelne Attribute lassen sich überschreiben.
- **Einfache Produkte und Bundles.** Einfache Produkte stehen für sich, Bundles haben eine Hierarchie aus mehreren Positionen.
- **Verkaufsmodelle** (Product Selling Models) legen fest, wie ein Produkt verkauft wird, etwa als Einmalverkauf, als unbefristetes Abo (evergreen) oder als Abo mit fester Laufzeit. Für einen einfachen Katalog sind sie optional, und ein Produkt kann laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productsellingmodel.htm) mehrere haben.

Alles davon sind Salesforce-Standardobjekte aus Product Catalog Management, von ProductCatalog und ProductClassification bis ProductRelatedComponent und ProductSellingModel, wie das [Datenmodell](https://developer.salesforce.com/docs/platform/data-models/guide/product-catalog-mgmt.html) zeigt. Sie kommen mit der Revenue-Cloud-Lizenz und der Funktionsaktivierung, nicht mit jeder Org.

## Wie bilden Sie Maschinenvarianten ohne tausende Produkte ab?

Die wichtigste Entscheidung lautet: Wann wird eine Variante ein Produkt, und wann bleibt sie ein Attributwert? Salesforce bietet vier Modelle, und jedes passt zu einem anderen Fall:

| Modell | Passt, wenn |
|---|---|
| Produkt mit Attributen | Der Vertrieb verkauft ein Angebot mit wählbaren Werten |
| Produktvariationen | Mehrere verkaufbare Produkte mit eigener SKU gehören zusammen |
| Bundle-Bestandteil | Ein Teil wird separat gewählt, bepreist oder gezählt |
| Dekomposition | Das ERP braucht technische SKUs, die der Vertrieb nie sieht |

Eine eigene Materialnummer in SAP reicht für ein eigenes Produkt nicht. Salesforce [beschreibt das Gegenteil](https://help.salesforce.com/s/articleView?id=ind.rev_product_and_attributes_migration.htm&language=en_US&type=5): Mehrere ERP-SKUs können ein kommerzielles Produkt mit Attributen werden, und Dynamic Revenue Orchestrator bildet die Auswahl über Dekompositionsregeln auf die SKU ab, die die Abwicklung braucht. Produktvariationen gibt es seit Summer '26; sie fassen verkaufbare Produkte unter einem gemeinsamen Elternprodukt zusammen.

Auch Sales Agreements erzwingen keine eigenen Produkte. Der [Hilfeartikel](https://help.salesforce.com/s/articleView?id=ind.sa_user_addprod_task.htm&language=en_US&type=5) zeigt denselben Dieselgenerator zweimal, mit 2.000 und 2.500 Kilowatt, als zwei Zeilen in einem Agreement. Siehe auch [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/).

Ein eigenes Produkt gebe ich einer Variante, wenn sie eine eigene Preisliste, ein eigenes Servicemodell oder einen eigenen Lebenszyklus hat. Eine Seriennummer allein ist kein Grund, weil sie eine installierte Maschine bezeichnet, keine Produktdefinition. Eine Abkantpresse mit drei Biegelängen, zwei Steuerungen und optionalem Hinteranschlag ist ein Produkt mit drei Attributen.

Die Klassifizierung trägt die Attribute pro Maschinenfamilie. Trailhead zeigt den Mechanismus an einem einfachen Beispiel: Produkte erben die Attribute ihrer Klassifizierung, und ein WLAN-Tablet braucht den SIM-Typ nicht, den ihm die Kategorie mitgeben würde, also wird das Attribut überschrieben. Für eine Maschinenfamilie heißt das meist: eine Vorlage mit den Attributen, die der Vertrieb abfragen muss, und wenige Überschreibungen für Modelle, bei denen ein Attribut nicht passt. Brauchen Modelle sehr unterschiedliche Attributsätze, sind getrennte Klassifizierungen sauberer.

Zubehör und Pakete, die der Vertrieb separat wählt, bepreist oder zählt, gehören in ein Bundle. Die [Trailhead-Einheit zu Bundles](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/create-a-product-bundle) erklärt die Teile: Produktgruppen im Bundle, lokale Kardinalität pro Bestandteil (Pflicht, standardmäßig enthalten, Menge änderbar oder nicht, mit Standard-, Mindest- und Höchstmenge) und Gruppenkardinalität mit Mindest- und Höchstzahl an Produkten. Statische Bundles kann der Kunde nicht ändern, konfigurierbare Bundles lassen sich beim Verkauf anpassen. Für eine Maschine mit Werkzeugen, Sicherheitspaket und Inbetriebnahme ist das ein konfigurierbares Bundle mit drei Gruppen.

Welche Kombinationen erlaubt sind, entscheidet der Konfigurator, nicht der Katalog. Wie seine Regeln funktionieren, steht in [Revenue Cloud Konfigurator: Wann lohnen Constraint-Regeln?](../revenue-cloud-konfigurator-constraint-regeln/).

## Welche Daten kommen aus dem ERP und welche gibt es nur in Salesforce?

Den Materialstamm zu kopieren ist der erste Fehler, den ich in einem Katalogentwurf vermeiden würde. Eigene Datensätze für Kataloge, Kategorien, Bundles und Verkaufsmodelle braucht Salesforce ohnehin; welches System dafür führt, entscheiden Sie ausdrücklich. Salesforce braucht die verkaufsfähigen Produkte, keine Werksdaten, Einkaufsdaten oder Stücklisten. Eine Stückliste beschreibt, wie eine Maschine gebaut wird. Das Bundle beschreibt, wie sie verkauft wird. Beides sieht ähnlich aus und wird von unterschiedlichen Leuten gepflegt.

| Daten | Typisch führendes System | Hinweis |
|---|---|---|
| Materialnummer | ERP | Schlüssel für die Auftragsübergabe |
| Produktname und Kurztext | ERP oder PIM | Übersetzungen kommen mit |
| Listenpreis | ERP, wenn die Preisfindung dort liegt | Braucht synchronisierte Preisbucheinträge |
| Kategoriezuordnung | Meist Salesforce | Vertriebsstruktur, nicht die Warengruppe aus dem ERP |
| Klassifizierung und Vertriebsattribute | Salesforce | Attributwerte müssen auf gültige ERP-Werte abbilden |
| Bundle-Struktur und Kardinalität | Salesforce | Verantwortet das Produktmanagement |
| Verkaufsmodell | Meist Salesforce | Einmalig, feste Laufzeit oder unbefristet |
| Stückliste | ERP oder PLM | Nicht in Salesforce |

Die fünfte Zeile braucht Sorgfalt.

```hinweis achtung
Hat das Attribut "Steuerung" in Salesforce den Wert "S2", muss dieser Wert auf einen gültigen Merkmalswert oder ein technisches Produkt in SAP abbilden, sonst scheitert der Auftrag bei der Übergabe. Die Codes müssen nicht gleich sein, die Zuordnung aber vollständig. Ich würde pro Attribut eine Zuordnungstabelle führen und sie von der Schnittstelle prüfen lassen, bevor der Auftrag aktiviert wird.
```

Wer welches Objekt in der Org verantwortet, legt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/) fest. Wie die Preise dann aus dem Preisbuch kommen, steht in [Salesforce Pricing: Wie Revenue Cloud Preise berechnet](../revenue-cloud-preisprozeduren/).

## Brauchen Ersatzteile und Services eigene Kataloge?

Oft ja. Ein Maschinenbauer verkauft einige Dutzend Maschinen und oft zehntausende Ersatzteile. Im Angebot braucht der Vertrieb die Maschinen, ihre Optionen und das Zubehör. Ersatzteile spielen vor allem im Service und im Händlergeschäft eine Rolle. Trailhead nennt ausdrücklich mehrere Kataloge, etwa einen Produkt- und einen Servicekatalog, und Produkte können in mehreren Kategorien stehen, wenn ein Artikel an beiden Stellen gebraucht wird.

Wiederkehrende Services wie Wartungsverträge oder Fernüberwachung nutzen meist ein Verkaufsmodell mit fester Laufzeit oder ein unbefristetes; einmalige Services können ein Einmalmodell nutzen. Ob sie einen eigenen Katalog bekommen, hängt davon ab, wer sie über welchen Kanal, mit welchem Preisbuch und in welchem Angebotsprozess sucht. Unterschiedliche Verantwortliche in Produktmanagement und Service sind ein zusätzliches Argument, nicht das einzige.

## Rechenbeispiel: 40 Grundmaschinen mit Optionen

Ein Maschinenbauer verkauft 40 Grundmaschinen in vier Familien mit je etwa zwölf Vertriebsoptionen, dazu 60 Zubehörteile mit eigener Materialnummer und rund 8.000 Ersatzteile. Ohne Modell schlägt jemand vor, jede verkaufte Kombination als Produkt anzulegen, und schnell sind es tausende.

Mit dem Katalogmodell sieht es so aus:

- **4 Klassifizierungen**, eine pro Maschinenfamilie, mit je etwa 12 Attributen wie Arbeitsbreite, Antrieb, Steuerung und Spannung.
- **40 Produkte** für die Grundmaschinen, aus den Klassifizierungen angelegt, mit Überschreibungen, wo ein Attribut nicht passt. Jedes ist zugleich Wurzel eines konfigurierbaren Bundles mit Gruppen für Werkzeuge, Sicherheit und Services, also gibt es keinen zweiten Datensatz pro Maschine.
- **60 Zubehörprodukte** als einfache Produkte, die als Bundle-Bestandteile dienen.
- **Ein Ersatzteilkatalog** mit den 8.000 Teilen, geladen aus SAP, und ein Servicekatalog mit drei Abo-Produkten.

Das Sortiment für den Maschinenvertrieb umfasst dann rund 140 Produktdatensätze. Die Org enthält weiterhin die 8.000 Ersatzteile und die zugehörigen Katalogdatensätze, aber jede bestellbare Kombination ist ohne ein Produkt pro Kombination beschrieben.

## Katalogdaten sind Konfiguration und brauchen einen Verantwortlichen

Klassifizierungen, Attribute und Bundles sind Datensätze, keine Metadaten. Katalogänderungen werden also in einer Sandbox getestet und als Daten durch dieselbe Pipeline gebracht wie Metadaten. Wie das mit SFDMU oder kommerziellen Werkzeugen geht, steht im DevOps-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/), die Besonderheiten von Revenue Cloud in [Revenue Cloud Deployments](../revenue-cloud-konfiguration-deployment/).

```vertiefung Für Entwickler
titel: Was die Object Deployment Reference vorgibt
Der Developer Guide enthält eine [Object Deployment Reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm), die für Product Catalog Management Deployment-Reihenfolge, Objekttypen, Lookup-Felder und Anforderungen an Übersetzungen aufführt. Ich nutze diese Reihenfolge als Basis für die Abhängigkeiten. Inkrementelle Deployments brauchen trotzdem eine Abhängigkeitsprüfung und manchmal einen zweiten Aktualisierungslauf.
```

Verantwortlich sollte das Produktmanagement des Herstellers sein, nicht der Implementierungspartner. Nach dem Go-live kommen jedes Quartal neue Maschinen, Optionen und Preisänderungen, und wer den Katalog pflegt, bestimmt, wie schnell der Vertrieb sie anbieten kann.

## Maschinenfamilien und Vertriebsfragen auflisten

1. **Listen Sie die Maschinenfamilien auf** und die Fragen, die der Vertrieb pro Familie stellt. Daraus werden Klassifizierungen und Attribute.
2. **Wählen Sie für jede Variante das Modell**: Attributwert, Produktvariation, Bundle-Bestandteil oder Dekomposition auf ERP-SKUs.
3. **Stimmen Sie die Attributzuordnung mit SAP ab**, bevor die ersten Daten geladen werden.
4. **Trennen Sie Maschinen, Ersatzteile und Services** in Kataloge mit unterschiedlichen Verantwortlichen.
5. **Benennen Sie den Katalogverantwortlichen** und stellen Sie den Katalog als Daten unter Versionskontrolle.

Punkt 2 entscheidet über die Größe des Katalogs: Eine Variante ohne eigene Preisliste, eigenes Servicemodell oder eigenen Lebenszyklus bleibt ein Attribut und bekommt keinen eigenen Produktdatensatz. Das ganze Kapitel steht im Masterclass-Teil [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/), und die Grenze zwischen SAP und Salesforce zu ziehen gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
