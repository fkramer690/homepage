---
title: "Produktdaten für B2B Commerce: PIM, ERP oder Salesforce?"
description: "Wo Produktdaten für einen Salesforce-B2B-Commerce-Shop gepflegt werden sollten, was der Shop von ERP und PIM braucht und welche Katalog-Grenzen gelten."
pubDate: 2026-10-28
lang: de
slug: produktdaten-b2b-commerce-pim-erp
translationKey: commerce-product-data-pim
topic: data
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Produktdaten, PIM, ERP, Katalog, Datenqualität]
takeaways:
  - "Für einen Shop in Salesforce B2B Commerce sollte das ERP Materialnummer, Mengeneinheit und Vertriebsstatus führen, ein PIM Texte, Merkmale und Bilder, Salesforce hält eine Kopie."
  - "Ein Store hat genau einen Katalog und fasst 4 Mio. Produkte, davon 1 Mio. durchsuchbar. Ein Variantenträger kann 200 Varianten haben."
  - "Pro Produkt sind 9 Bilder und 5 Dateianhänge möglich. Mit dem Release im Juli 2026 hat Salesforce angekündigt, dass sich externe DAM-Inhalte, 3D-Modelle und technische Daten auf Produktseiten zeigen lassen."
  - "Produktname, Beschreibung und SKU sind standardmäßig durchsuchbar. Die Shopsuche braucht einen Treffer für alle Suchbegriffe, deshalb entscheidet die Datenqualität, was Händler finden."
  - "Legen Sie pro Produktfeld einen Owner fest, bevor der erste Import läuft. Änderungen in Salesforce, die der nächste ERP- oder PIM-Lauf überschreibt, kosten mehr als der Import."
faq:
  - q: "Brauche ich ein PIM für Salesforce B2B Commerce?"
    a: "Nicht immer. Bei einigen tausend Ersatzteilen mit Texten aus dem ERP kann das ERP die einzige Quelle sein. Ein PIM lohnt sich, wenn für einen großen Katalog Vertriebstexte, viele technische Merkmale, Bilder und mehrere Sprachen gepflegt werden müssen."
  - q: "Wie viele Produkte fasst ein B2B-Commerce-Store?"
    a: "Laut Limitseite von Salesforce 4 Mio. Produkte pro Store, davon werden bis zu 1 Mio. von der Suche unterstützt. Ein Store hat einen Produktkatalog mit bis zu 3 Mio. Produkten."
  - q: "Wie viele Bilder kann ein Produkt in B2B Commerce haben?"
    a: "9 Bilder und bis zu 5 Dateianhänge pro Produkt. Für weitere Medien hat Salesforce im Juli 2026 die Product Media Extensibility angekündigt, die externe DAM-Plattformen, 3D-Modelle und technische Daten auf Produktseiten bringt."
  - q: "Sollen Merchandiser Produktdaten direkt in Salesforce ändern?"
    a: "Nur Felder, die Salesforce gehören, etwa Shop-Kategorien oder Sucheinstellungen. Felder aus ERP oder PIM sollten in Salesforce schreibgeschützt sein, sonst überschreibt der nächste Lauf die Änderung."
draft: false
---

Produktdaten für einen Shop in Salesforce B2B Commerce sollten nicht in Salesforce gepflegt werden. Das ERP führt, was es heute schon führt: Materialnummer, Mengeneinheit, Vertriebsstatus und den Bezug zu Preis und Bestand. Ein PIM, falls vorhanden, führt Texte, technische Merkmale, Bilder und Übersetzungen. Salesforce hält von beidem eine Kopie und ergänzt nur, was zum Shop gehört, etwa Kategorien und Sucheinstellungen. Die Grenzen des Stores sind weniger wichtig als diese Aufteilung: ein Katalog pro Store, 4 Mio. Produkte, davon 1 Mio. durchsuchbar, 200 Varianten pro Variantenträger, 9 Bilder pro Produkt. Händler finden, was die Daten hergeben.

## Was braucht ein B2B-Shop an Produktdaten?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, baut auf Standardobjekten auf. Laut [Übersicht zum Datenmodell](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html) enthält Product2 die verkauften Artikel, ein ProductCatalog ordnet sie in Kategorien, und ProductCategory bildet den Baum, durch den Käufer navigieren. Bilder und Anhänge hängen an eigenen Medienobjekten, Merkmale für Varianten an eigenen Merkmalsobjekten.

Für einen Händler, der Ersatzteile bestellt, braucht der Shop pro Produkt:

- **Identifikation:** Materialnummer, Bezeichnung, alte oder alternative Nummern.
- **Bestellinformationen:** Mengeneinheit, Mindestbestellmenge, Verpackungseinheit, Vertriebsstatus wie "bestellbar" oder "ausgelaufen".
- **Beschreibung und Merkmale:** Kurztext, technische Daten wie Maße, Werkstoff, Spannung oder Gewinde.
- **Medien:** mindestens ein Bild, oft eine Zeichnung oder ein Datenblatt.
- **Navigation:** Kategorie im Shop-Katalog.

Preis und Bestand kommen aus Preisbüchern oder einem Live-Aufruf ans ERP und aus dem Bestandsservice. Ich behandle sie getrennt im Kapitel zur ERP-Anbindung.

## Wer sollte welche Produktdaten führen?

Meine Regel ist ein Owner pro Feld, und der Owner ist das System, in dem die Daten entstehen. Bei den meisten Herstellern ergibt das diese Aufteilung:

| Daten | Owner | In Salesforce |
|---|---|---|
| Materialnummer, Mengeneinheit, Vertriebsstatus, Gewicht | ERP | Kopie, schreibgeschützt |
| Kurz- und Langtexte, Übersetzungen | PIM, ohne PIM das ERP | Kopie, schreibgeschützt |
| Technische Merkmale für Filter | PIM | Kopie, schreibgeschützt |
| Bilder, Zeichnungen, Datenblätter | PIM oder DAM | Verweis oder Kopie |
| Shop-Kategorien, Sucheinstellungen, Sortierung | Salesforce | Hier gepflegt |

Die letzte Zeile ist die einzige, die Merchandiser im Shop pflegen. Alles andere kommt über eine Schnittstelle, und diese Schnittstelle muss festlegen, welche Seite gewinnt. Korrigiert ein Merchandiser einen Tippfehler in Salesforce und der nächtliche ERP-Lauf überschreibt ihn, sieht der Händler am nächsten Tag wieder den Fehler, und der Merchandiser verliert das Vertrauen in den Shop. Dasselbe Prinzip gilt für jedes Objekt in einer Salesforce-Org. Ich beschreibe es in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

Brauchen Sie ein PIM? Nicht für jeden Shop. Ein typisches Szenario, als Annahme: ein Hersteller mit 6.000 Ersatzteilen, deutschen und englischen Texten aus dem ERP und einem Foto pro Teil. Hier kann das ERP die einzige Quelle sein, ein PIM brächte ein System mehr, aber keine Daten mehr. Bei 60.000 Teilen, 15 Sprachen, technischen Merkmalen für Filter und mehreren Bildern pro Teil würde ich ein PIM wollen, weil das niemand in ERP-Materialstämmen pflegt.

## Welche Katalog-Grenzen gelten?

Salesforce führt die [Grenzen für Produkte und Kategorien](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html) auf einer Seite. Stand Oktober 2026:

| Grenze | Wert | Art |
|---|---|---|
| Produktkataloge pro Store | 1 | hart |
| Produkte pro Store | 4 Mio., davon 1 Mio. durchsuchbar | hart |
| Produkte pro Katalog | 3 Mio. | hart |
| Varianten pro Variantenträger | 200 | hart |
| Bilder pro Produkt | 9, dazu 5 Dateianhänge | hart |
| Merkmale pro Merkmalsgruppe (Attribute Set) | 5 | soft |
| Kategorietiefe | 5 Ebenen | soft |
| Kategorien pro Katalog | 15.000 | soft |

Zwei davon prägen das Design. Ein Katalog pro Store heißt: Ein zweites Sortiment mit eigener Struktur braucht einen zweiten Store, das bespreche ich in [ein B2B-Store oder mehrere](../b2b-store-laender-marken-haendler/). Und der Abstand zwischen 4 Mio. Produkten und 1 Mio. durchsuchbaren zählt für Hersteller mit großem Ersatzteilsortiment.

```hinweis achtung
Salesforce schreibt, dass nur bis zu 1 Mio. Produkte von der Suche unterstützt werden, und bittet, für mehr als eine Million SKUs den Account Representative anzusprechen. Mit einem Suchanbieter eines Drittherstellers wie Coveo, Algolia oder Bloomreach gilt die Grenze von 4 Mio. nicht.
```

Die Kategorietiefe von 5 ist für Ersatzteile selten ein Problem. ERP-Warengruppen sind oft tiefer, aber Käufer klicken sich nicht durch acht Ebenen. Ich würde sie auf drei oder vier Ebenen verflachen und den Rest Suche und Filtern überlassen.

## Wie funktionieren Varianten und Merkmale?

Varianten bündeln Produkte, die sich in einem oder mehreren Merkmalen unterscheiden, etwa eine Dichtung in fünf Durchmessern. Ein Variantenträger fasst bis zu 200 Varianten, und die Merkmale, die die Varianten unterscheiden, gehören zu einer Merkmalsgruppe. Das Soft Limit von 5 Merkmalen pro Gruppe reicht für die meisten Teile.

Mehr Ärger als die Grenze machen die Quelldaten. Varianten brauchen saubere, einheitliche Merkmalswerte: "50 mm", "50mm" und "DN50" in drei Materialstämmen ergeben drei Werte im Filter. In vielen ERP-Systemen stehen solche Angaben im Freitext statt in Feldern. Bevor Varianten live gehen, muss jemand diese Werte vereinheitlichen, und zwar im führenden System, nicht in Salesforce.

Für viele Ersatzteile brauchen Sie gar keine Varianten. Ein Händler sucht meist eine bestimmte Teilenummer. Varianten passen besser zu Verbrauchsmaterial und Zubehör, wo der Käufer Größe oder Farbe wählt.

## Wo liegen Bilder, Zeichnungen und 3D-Modelle?

9 Bilder pro Produkt reichen für die meisten Ersatzteile. Zeichnungen, Datenblätter und Zertifikate sind etwas anderes: Sie ändern sich mit Revisionen und liegen oft schon in einem DAM- oder PLM-System. Eine Kopie in Salesforce erzeugt eine zweite Version, die bald nicht mehr stimmt.

Mit dem Release im Juli 2026 hat Salesforce die Product Media Extensibility angekündigt. Laut [Salesforce-Blog](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) lassen sich damit externe DAM-Plattformen (Digital Asset Management), 3D-Modelle, technische Daten und gehostete CMS-Videos anbinden und über LWC-Wrapper auf Produktdetailseiten zeigen. Die Richtung stimmt: Medien bleiben im System, das Revisionen verwaltet, und der Shop zeigt sie an.

```hinweis offen
Der Beitrag nennt keine Verfügbarkeit pro Funktion. Ich würde die Product Media Extensibility deshalb in einer Sandbox testen, bevor ich damit plane.
```

## Warum entscheidet die Datenqualität über die Suche?

Die Shopsuche findet nur, was in den Daten steht. Laut Salesforce sind Produktname, Beschreibung und SKU standardmäßig durchsuchbar, weitere Felder lassen sich ergänzen. Die Einheit ist für D2C-Stores auf derselben Plattformsuche geschrieben und beschreibt auch, wie der Abgleich funktioniert: Ergebnisse erscheinen nur, wenn alle Suchbegriffe vorkommen, und Teiltreffer am Wortanfang oder in der Wortmitte werden nicht unterstützt.

Für einen Teilekatalog hat das direkte Folgen:

- Ein Händler, der "Dichtung 50" eingibt, findet nichts, wenn im Namen "O-Ring" steht und der Durchmesser in einem nicht durchsuchbaren Feld liegt.
- Eine Teilenummer ohne führende Nullen oder mit anderem Trennzeichen passt nicht.
- Eine alte Teilenummer, die nur in der ERP-Historie steht, ist gar nicht zu finden.

Behoben wird all das in den Produktdaten und in der Sucheinrichtung, beschrieben in [Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/).

## Wo starten Sie?

Nehmen Sie eine Stichprobe von 200 typischen Ersatzteilen aus dem ERP und prüfen Sie jedes gegen die Liste oben: Gibt es eine brauchbare Bezeichnung, ein Bild, die Merkmale, nach denen ein Händler filtern würde, einen sauberen Vertriebsstatus? Das Ergebnis zeigt, wie viel Datenarbeit vor dem Shop liegt. Schreiben Sie dann die Owner-Tabelle für Produktfelder und nehmen Sie sie in die Schnittstellenliste auf. Welche Daten wie oft von SAP in den Shop fließen, steht in [B2B Commerce und SAP: Datenflüsse](../b2b-commerce-sap-datenfluesse/), und das ganze Thema gehört zum [Kapitel zu Katalog, Suche und Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) meiner Masterclass B2B Commerce. Solche Schnittstellen zu entwerfen, gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Ein B2B-Shop ist nur so gut wie die Produktdaten, die ERP und PIM ihm liefern.
