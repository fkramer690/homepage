---
title: "B2B-Shop-Suche: Ersatzteile über die Teilenummer finden"
description: "So richten Sie die Suche in Salesforce B2B Commerce ein, damit Händler Ersatzteile über neue und alte Teilenummer finden: Grenzen, Synonyme und Suchanalyse."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-shop-suche-teilenummer
translationKey: commerce-search-part-numbers
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Shopsuche, Ersatzteile, Teilenummern, Synonyme, Suchanalyse]
takeaways:
  - "Standardsuche findet nur ganze Begriffe. Partial SKU Search findet unvollständige SKUs und ignoriert Trennzeichen nur in Product SKU und Product Code."
  - "Ein Store erlaubt 25 durchsuchbare und 50 filterbare Merkmale sowie 100 Synonymregeln. Für Synonyme und Boost and Bury nennt die API-Seite niedrigere Werte."
  - "Alte Nummern und Vergleichsnummern gehören in ein durchsuchbares Feld am aktuellen Produkt. Synonymregeln passen besser zu Begriffen wie O-Ring."
  - "Die im Juli 2026 angekündigte Suchanalyse über Data 360 zeigt Suchen ohne Treffer: eine Diagnoseliste für Daten, Zugriff, Index und Sortiment."
  - "Nach Änderungen an Produkten, Kategorien oder Entitlements braucht der Suchindex ein Update, bei neuen durchsuchbaren Feldern ein vollständiges Update."
faq:
  - q: "Findet die Suche in B2B Commerce Teilenummern?"
    a: "Ja. Die Produkt-SKU ist standardmäßig durchsuchbar, ebenso Name und Beschreibung. Die Standardsuche braucht ganze Begriffe, aber B2B-Stores können Partial SKU Search für Product SKU und Product Code aktivieren. Sie findet unvollständige SKUs ab drei Zeichen und ignoriert Bindestriche, Leerzeichen, Punkte, Unterstriche und Schrägstriche. Für alte Nummern in benutzerdefinierten Feldern gelten weiter die Standardregeln."
  - q: "Wie viele Synonymregeln erlaubt ein B2B-Commerce-Store?"
    a: "Die Seite zu den Suchgrenzen nennt 100 Synonymregeln pro Store als harte Grenze. Die Seite zur Search Settings API nennt 50 Regeln pro Store für ihre Include Rules. Prüfen Sie den Wert in Ihrer Org, bevor Sie damit planen."
  - q: "Wie finden Händler alte, ersetzte Teilenummern?"
    a: "Speichern Sie jede alte Nummer in einem durchsuchbaren Textfeld am Nachfolgeprodukt. Ein Händler, der die alte Nummer eingibt, findet dann das aktuelle Teil, ohne eine Synonymregel pro Nummer."
  - q: "Was ist die B2B-Suche aus dem Juni 2026?"
    a: "Ein Marketingname, kein eigenes Produkt. Salesforce hat im Juni 2026 eine KI-gestützte und merkmalsbasierte Suche für B2B Commerce angekündigt. In der Dokumentation erscheint sie als semantische Suche, Partial SKU Search, gewichtete durchsuchbare Felder und Merchandising-Regeln."
draft: false
---

Händler finden Ersatzteile in einem Shop auf Salesforce B2B Commerce, wenn die eingegebenen Nummern dort stehen, wo die Suche sie berücksichtigt. Die Standardsuche braucht ganze Begriffe, aber B2B-Stores können Partial SKU Search aktivieren. Sie findet unvollständige aktuelle SKUs und ignoriert Trennzeichen. Die Arbeit liegt deshalb in den Einstellungen und Produktdaten: Partial SKU Search ist aktiviert, die aktuelle Nummer steht als SKU und alte Nummern sowie Vergleichsnummern mit ihren üblichen Schreibweisen in einem durchsuchbaren Feld. Synonymregeln sind für Begriffe wie "O-Ring" und "Dichtring" da, nicht für Tausende Nummern. Die Suchanalyse zeigt dann, welche Suchen nichts finden, und diese Liste sagt Ihnen, was als Nächstes zu tun ist.

## Wie findet die Suche in B2B Commerce eine Teilenummer?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, baut pro Store einen Suchindex auf. B2B- und D2C-Stores auf der Kernplattform nutzen dieselbe Shopsuche, wie das [Suchdatenmodell](https://developer.salesforce.com/docs/platform/data-models/guide/b2b-commerce-d2c-commerce-search.html) zeigt. Produktname, Produktbeschreibung und Produkt-SKU sind standardmäßig durchsuchbar, weitere Felder lassen sich ergänzen. Die [Hinweise zur B2B-Suche](https://help.salesforce.com/s/articleView?id=commerce.comm_search_comm_admin_cons.htm&language=en_US&type=5) von Salesforce beschreiben diese Standardregeln für den Abgleich:

- Die Suche gleicht Wortstämme ab.
- Ein Ergebnis erscheint nur, wenn alle Suchbegriffe darin vorkommen.
- Teiltreffer am Wortanfang oder in der Wortmitte werden nicht unterstützt.

Für Ersatzteile zählt die dritte Regel, und [Partial SKU Search](https://help.salesforce.com/s/articleView?id=commerce.comm_search_enable_partial_sku.htm&language=en_US&type=5), verfügbar seit Winter '26, ist die Antwort für aktuelle Nummern. Nach der Aktivierung unter Settings, Search findet sie eine SKU wie "123-57-ABC" über "ABC", "57-AB" oder "1235", ab drei Zeichen und bis zu 12 Zeichen der SKU. Dabei ignoriert sie Bindestriche, Unterstriche, Leerzeichen, Punkte und Schrägstriche. Sie funktioniert nur für Product SKU und Product Code und braucht ein vollständiges Index-Update. Für alte Nummern in einem benutzerdefinierten Feld gelten weiter die Standardregeln. Ich würde deshalb vor jeder Designentscheidung mit 50 echten aktuellen und alten Teilenummern testen.

Zuerst kommt die Sichtbarkeit. Ein Händler findet nur Produkte, für die seine Buyer Groups berechtigt sind, und nur die ersten 2.000 Buyer Groups eines Produkts werden indiziert. Diese Grenze erkläre ich in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/). Auch die Feldberechtigung zählt: Laut Trailhead kann ein Käufer ohne Zugriff auf ein indiziertes durchsuchbares Feld den Store gar nicht durchsuchen.

## 25 durchsuchbare Merkmale und 100 Synonymregeln pro Store

Salesforce führt die [Suchgrenzen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) auf einer Seite. Stand Oktober 2026:

| Grenze | Wert | Art |
|---|---|---|
| Durchsuchbare Merkmale pro Store | 25 | soft |
| Filterbare Merkmale pro Store | 50 | soft |
| Angezeigte Facetten pro Suche | 10, auf Anfrage bis 50 | soft |
| Filterfelder pro Suche | 10 | hart |
| Sortierregeln pro Store | 15 | hart |
| Synonymregeln pro Store | 100 | hart |
| Boost-and-Bury-Regeln pro Store | 100 | hart, siehe Hinweis |
| Produkte pro Ergebnisseite | 200 | hart |
| Sprachen (Locales) im Index | 25 | hart |

25 durchsuchbare Merkmale klingen nach viel, bis Sie aufschreiben, was Händler eintippen: aktuelle Nummer, alte Nummern, Vergleichsnummern, Maschinentyp, Bezeichnung, Kurztext, vielleicht eine EAN. Das passt, aber nicht ein Feld pro Sprache und Nummernart. Ich plane die durchsuchbaren Felder wie jede knappe Ressource und schreibe auf, warum jedes da ist.

```hinweis offen
Die [Seite zur Search Settings API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-search-settings-apis.html) sagt, dass Synonyme über Include Rules angelegt werden und dass pro Store bis zu 50 Regeln möglich sind. Die Limitseite nennt 100 Synonymregeln. Für Boost and Bury nennt dieselbe API-Seite 25 Regeln pro Store, während die Limitseite 100 nennt. Prüfen Sie die Werte in Ihrer Org, bevor Sie nahe an eine der Zahlen planen.
```

## Wohin gehören alte Nummern und Vergleichsnummern?

Hersteller benennen Teile um. Eine Dichtung bekommt nach einer Konstruktionsänderung eine neue Nummer, ein Zukaufteil bekommt die Herstellernummer, ein Händler hat noch die Nummer aus einer 15 Jahre alten Ersatzteilliste. Händler tippen sie alle.

Es gibt zwei Wege, eine alte Nummer auffindbar zu machen: eine Synonymregel pro Nummer, wobei die Search Settings API Synonyme aus einem und aus mehreren Wörtern unterstützt, oder ein durchsuchbares Textfeld "frühere und alternative Nummern" am aktuellen Produkt. Darin stehen alte Nummern, Lieferantennummern und Vergleichsnummern, getrennt durch Leerzeichen.

```pro-contra
pro: Durchsuchbares Feld am Produkt
- Nimmt viele alte und Vergleichsnummern innerhalb der praktischen Grenzen des Felds und des Index auf
- Zählt als eines der 25 durchsuchbaren Merkmale, egal wie viele Nummern darin stehen
contra: Synonymregel pro Nummer
- Nur 100 Regeln pro Store, laut API-Seite 50
- Reicht für eine Handvoll Nummern, nicht für eine Teilehistorie
```

Für Nummern würde ich immer das Feld nehmen. Die Daten gibt es im ERP schon, in Nachfolgeketten oder Notizen im Materialstamm, und die Schnittstelle kann das Feld bei jedem Lauf füllen. Rechenbeispiel: ein Hersteller mit 30.000 aktiven Ersatzteilen, von denen 8.000 eine oder mehrere Vorgängernummern haben. Als Synonymregeln unmöglich, als Feld eine Spalte mehr im Produktimport. Das ERP oder PIM verwaltet die strukturierte Nachfolgekette. Das Suchfeld ist nur eine flache Kopie davon für die Suche.

Weil Partial SKU Search Trennzeichen nur in SKU und Product Code ignoriert, braucht das Feld für alte Nummern weiterhin Schreibweisen: "4711-0020" und "47110020" nebeneinander, wenn Händler beides tippen. Welche Schreibweisen zählen, zeigt die Suchanalyse nach einigen Wochen.

In den Sucheinstellungen des Stores lassen sich durchsuchbare Felder außerdem von 1 bis 10 gewichten. So steht ein Treffer in der SKU oder im Feld für alte Nummern über einem Treffer in der Beschreibung. Für Wörter bleiben Synonymregeln nützlich. "O-Ring", "Dichtring" und das englische "seal ring" für dasselbe Teil, "Filterpatrone" und "Filterelement", der interne Name einer Maschinenbaureihe und der Name im Prospekt des Händlers. Dort reichen 100 Regeln weit.

## Drei Ankündigungen aus 2026 für die Teilesuche

**KI-gestützte Suche (Juni 2026).** Im [Beitrag zum Juni-Release](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) beschreibt Salesforce eine KI-gestützte und merkmalsbasierte Suche. In der Dokumentation entspricht das Funktionen wie semantischer Suche und Merchandising-Regeln, nicht einem separat benannten Produkt. Käufer brauchen nicht mehr den genauen Produktnamen oder die SKU und können in Alltagssprache beschreiben, was sie brauchen. Merchandiser bekommen eine feine Steuerung von merkmalsbasierter Suche und Produktsichtbarkeit. Für Händler, die ihre Teilenummer kennen, ändert das wenig. Für Endkunden oder neue Händler, die ein Teil beschreiben, kann es helfen. Ich würde es mit Ihren eigenen Beschreibungen testen, bevor ich mich darauf verlasse.

**Boost and Bury, Facettenreihenfolge und Suchanalyse (Juli 2026).** Laut [Beitrag zum Juli-Release](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) können Merchandiser Produkte in Such- und Kategorieergebnissen nach oben oder unten schieben, die Reihenfolge von Werten innerhalb von Filtern wie Marke, Größe oder Material festlegen und über Data 360, früher Data Cloud, Suchanfragen, Klickraten, Conversion und Suchen ohne Treffer sehen. Das Dashboard Search Intelligence Analytics braucht Data 360 for B2B Commerce, das Commerce Data Kit, CRM Analytics und die passenden Permission Sets. Alles muss eingerichtet und mit Daten versorgt sein.

**Erweiterbare Such-Endpunkte.** Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) enthält Endpoint Extensions für die Produktsuche (Commerce_Endpoint_Search_ProductSearch und Commerce_Endpoint_Search_Products) und ab API-Version 67.0 für Suchvorschläge. Damit ändern Entwickler die Anfrage vor der Suche oder die Antwort danach. Dort gehört Logik hin, die Sucheinstellungen nicht abbilden, etwa Prüfziffern oder unternehmensspezifische Nummernlogik für alte Nummern. Richten Sie zuerst Partial SKU Search ein und nutzen Sie eine Extension nur für eine nachgewiesene Lücke. Salesforce bevorzugt inzwischen den GET-Endpunkt search/products gegenüber dem älteren POST-Endpunkt product-search. Das ist Eigenentwicklung und gehört wie jeder andere Code in die Pipeline des Kunden.

## Wie helfen Boost and Bury und Facetten bei Ersatzteilen?

Boost and Bury hilft bei Teilen in zwei Fällen. Das Boosten von Nachfolgeteilen erhöht die Wahrscheinlichkeit, dass ein Händler bei einem allgemeinen Begriff das aktuelle Teil vor dem alten sieht. Das Herabstufen von Auslaufteilen mit Restbestand schiebt sie nach unten, während sie auffindbar bleiben. Regeln beeinflussen das Ranking, garantieren aber keine Position. Das kann nur Pinning. Bei einer begrenzten Zahl von Regeln pro Store würde ich Regeln auf Merkmale wie den Vertriebsstatus bauen, nicht auf einzelne Produkte.

Facetten helfen, wenn eine Suche viele Treffer liefert, etwa "Filter" in einem Katalog mit 400 Filtern. Dann grenzen Baureihe, Maß und Werkstoff die Liste ein. 10 Facetten pro Suche reichen, wenn sie gut gewählt sind: die Merkmale, nach denen Händler entscheiden. Sie setzen saubere Merkmalswerte voraus, und das ist eine Frage der [Produktdaten aus ERP und PIM](../produktdaten-b2b-commerce-pim-erp/).

Händlern nur Teile zu zeigen, die zu einer bestimmten Maschine passen, ist eine andere Anforderung. Suche und Facetten wissen nicht, welche Maschinen ein Händler hat. Die Wege dafür stehen in [nur Teile zur eigenen Maschine zeigen](../ersatzteilshop-teile-pro-maschine/), die KI-Seite in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/).

## 200 Suchbegriffe aus dem Innendienst testen

Sammeln Sie, was Händler eintippen, bevor Sie etwas einstellen. Der Innendienst hat E-Mails und Telefonnotizen voller Teilenummern, alter Nummern und Beschreibungen. Nehmen Sie 200 davon und lassen Sie sie gegen einen Test-Store mit Ihren echten Daten laufen. Jeder Fehltreffer deutet auf fehlende Daten, ein fehlendes durchsuchbares Feld, eine Schreibweise, fehlenden Zugriff oder fehlende Berechtigung, einen veralteten Index oder ein Teil, das Sie schlicht nicht verkaufen.

Nach dem Go-live ist die Liste der Suchen ohne Treffer die Diagnoseliste für die nächste Bereinigung: Daten, Zugriff, Index, Sucheinstellungen und Sortiment. Prüfen Sie sie in den ersten Monaten jede Woche. Wie das zu anderen Kennzahlen passt, steht in [B2B-Shop-Kennzahlen nach dem Go-live](../b2b-shop-kennzahlen-nach-go-live/). Aktualisieren Sie nach Änderungen an Produkten, Kategorien oder Entitlement Policies den Suchindex. Dafür reicht ein partielles Update. Geänderte durchsuchbare Felder oder Sortierregeln brauchen ein vollständiges Update. In Produktions-Orgs prüft die automatische Aktualisierung alle fünf Minuten auf Änderungen.

Das Thema gehört zum [Kapitel zu Katalog, Suche und Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) meiner Masterclass B2B Commerce. Festzulegen, welche ERP-Felder die Suche füttern, gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
