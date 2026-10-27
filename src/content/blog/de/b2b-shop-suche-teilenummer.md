---
title: "B2B-Shop-Suche: Ersatzteile über die Teilenummer finden"
description: "So richten Sie die Suche in Salesforce B2B Commerce ein, damit Händler Ersatzteile über neue und alte Teilenummer finden: Grenzen, Synonyme und Suchanalyse."
pubDate: 2026-10-28
lang: de
slug: b2b-shop-suche-teilenummer
translationKey: commerce-search-part-numbers
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Shopsuche, Ersatzteile, Teilenummern, Synonyme, Suchanalyse]
takeaways:
  - "Salesforce dokumentiert für die Shopsuche, dass alle Suchbegriffe passen müssen und Teiltreffer am Wortanfang oder in der Wortmitte nicht unterstützt werden. Teilenummern gehören so in die Daten, wie Händler sie tippen."
  - "Ein Store erlaubt 25 durchsuchbare und 50 filterbare Merkmale, 100 Synonymregeln und 100 Boost-and-Bury-Regeln. 10 Facetten pro Suche sind Standard, 50 auf Anfrage."
  - "Alte Nummern und Vergleichsnummern gehören in ein durchsuchbares Feld am aktuellen Produkt. Synonymregeln reichen für Nummern nicht und passen besser zu Begriffen wie O-Ring und Dichtring."
  - "Die im Juli 2026 angekündigte Suchanalyse über Data Cloud zeigt Suchen ohne Treffer. Sie sind die beste Liste fehlender Produktdaten."
  - "Nach Änderungen an durchsuchbaren Feldern, Produkten, Kategorien oder Entitlement Policies muss der Suchindex neu aufgebaut werden, bevor Händler das Ergebnis sehen."
faq:
  - q: "Findet die Suche in B2B Commerce Teilenummern?"
    a: "Ja. Die Produkt-SKU ist standardmäßig durchsuchbar, ebenso Name und Beschreibung. Teiltreffer am Wortanfang oder in der Wortmitte unterstützt Salesforce nicht, eine Nummer ohne führende Nullen oder mit anderem Trennzeichen passt deshalb eventuell nicht, wenn diese Schreibweise nicht auch gespeichert ist."
  - q: "Wie viele Synonymregeln erlaubt ein B2B-Commerce-Store?"
    a: "Die Seite zu den Suchgrenzen nennt 100 Synonymregeln pro Store als harte Grenze. Die Seite zur Search Settings API nennt 50 Regeln pro Store für ihre Include Rules. Prüfen Sie den Wert in Ihrer Org, bevor Sie damit planen."
  - q: "Wie finden Händler alte, ersetzte Teilenummern?"
    a: "Speichern Sie jede alte Nummer in einem durchsuchbaren Textfeld am Nachfolgeprodukt. Ein Händler, der die alte Nummer eingibt, findet dann das aktuelle Teil, ohne eine Synonymregel pro Nummer."
  - q: "Was ist die B2B-Suche aus dem Juni 2026?"
    a: "Salesforce hat im Juni 2026 eine KI-gestützte und merkmalsbasierte Suche für B2B Commerce angekündigt. Käufer können ein Teil in Alltagssprache beschreiben, Merchandiser steuern merkmalsbasierte Suche und Ranking."
draft: false
---

Händler finden Ersatzteile in einem Shop auf Salesforce B2B Commerce, wenn die Teilenummer genau so gespeichert ist, wie sie sie eintippen. Laut Salesforce muss die Shopsuche alle Suchbegriffe treffen und unterstützt keine Teiltreffer am Wortanfang oder in der Wortmitte. Die Arbeit liegt deshalb in den Produktdaten: die aktuelle Nummer als SKU, alte Nummern und Vergleichsnummern in einem durchsuchbaren Feld, Schreibweisen ohne Trennzeichen dort ergänzt, wo Händler sie nutzen. Synonymregeln, von denen ein Store 100 hat, sind für Begriffe wie "O-Ring" und "Dichtring" da, nicht für Tausende Nummern. Die Suchanalyse zeigt dann, welche Suchen nichts finden, und diese Liste sagt Ihnen, was als Nächstes zu tun ist.

## Wie findet die Suche in B2B Commerce eine Teilenummer?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, baut pro Store einen Suchindex auf. B2B- und D2C-Stores auf der Kernplattform nutzen dieselbe Shopsuche, wie das [Suchdatenmodell](https://developer.salesforce.com/docs/platform/data-models/guide/b2b-commerce-d2c-commerce-search.html) zeigt. Die [Trailhead-Einheit zur durchsuchbaren Shopseite](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-for-merchandisers/b2b2c-make-store-searchable), geschrieben für D2C-Merchandiser, sagt: Produktname, Produktbeschreibung und Produkt-SKU sind standardmäßig durchsuchbar, weitere Felder lassen sich ergänzen. Sie beschreibt diese Regeln für den Abgleich:

- Die Suche gleicht Wortstämme ab.
- Ein Ergebnis erscheint nur, wenn alle Suchbegriffe darin vorkommen.
- Teiltreffer am Wortanfang oder in der Wortmitte werden nicht unterstützt.

Die Einheit nennt diese Regeln für D2C-Stores. Eine eigene Beschreibung für B2B habe ich nicht gefunden, nehmen Sie sie also als Ausgangsannahme und testen Sie. Für Ersatzteile zählt die dritte Regel. Ein Händler, der nur die ersten Ziffern einer Nummer eintippt, findet die vollständige Nummer nicht. Wer "815" eingibt, findet "0815" nicht. Wie der Index Nummern mit Bindestrichen, Punkten oder Schrägstrichen in Wörter zerlegt, ist in den Quellen, die ich gelesen habe, nicht dokumentiert. Ich würde das vor jeder Designentscheidung mit 50 echten Teilenummern testen.

Zuerst kommt die Sichtbarkeit. Ein Händler findet nur Produkte, für die seine Buyer Groups berechtigt sind, und nur die ersten 2.000 Buyer Groups eines Produkts werden indiziert. Diese Grenze erkläre ich in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/). Auch die Feldberechtigung zählt: Laut Trailhead kann ein Käufer ohne Zugriff auf ein indiziertes durchsuchbares Feld den Store gar nicht durchsuchen.

## Welche Grenzen gelten für die Suche?

Salesforce führt die [Suchgrenzen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) auf einer Seite. Stand Oktober 2026:

| Grenze | Wert | Art |
|---|---|---|
| Durchsuchbare Merkmale pro Store | 25 | soft |
| Filterbare Merkmale pro Store | 50 | soft |
| Angezeigte Facetten pro Suche | 10, auf Anfrage bis 50 | soft |
| Filterfelder pro Suche | 10 | hart |
| Sortierregeln pro Store | 15 | hart |
| Synonymregeln pro Store | 100 | hart |
| Boost-and-Bury-Regeln pro Store | 100 | hart |
| Produkte pro Ergebnisseite | 200 | hart |
| Sprachen (Locales) im Index | 25 | hart |

25 durchsuchbare Merkmale klingen nach viel, bis Sie aufschreiben, was Händler eintippen: aktuelle Nummer, alte Nummern, Vergleichsnummern, Maschinentyp, Bezeichnung, Kurztext, vielleicht eine EAN. Das passt, aber nicht ein Feld pro Sprache und Nummernart. Ich plane die durchsuchbaren Felder wie jede knappe Ressource und schreibe auf, warum jedes da ist.

Ein offener Punkt: Die [Seite zur Search Settings API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-search-settings-apis.html) sagt, dass Synonyme über Include Rules angelegt werden und dass pro Store bis zu 50 Regeln möglich sind. Die Limitseite nennt 100 Synonymregeln. Prüfen Sie den Wert in Ihrer Org, bevor Sie nahe an eine der beiden Zahlen planen.

## Wohin gehören alte Nummern und Vergleichsnummern?

Hersteller benennen Teile um. Eine Dichtung bekommt nach einer Konstruktionsänderung eine neue Nummer, ein Zukaufteil bekommt die Herstellernummer, ein Händler hat noch die Nummer aus einer 15 Jahre alten Ersatzteilliste. Händler tippen sie alle.

Es gibt zwei Wege, eine alte Nummer auffindbar zu machen:

- **Eine Synonymregel pro Nummer.** Die Search Settings API unterstützt Synonyme aus einem und aus mehreren Wörtern. Mit 100 Regeln pro Store, laut API-Seite 50, reicht das für eine Handvoll Nummern, nicht für eine Teilehistorie.
- **Ein durchsuchbares Feld am aktuellen Produkt.** Ein Textfeld "frühere und alternative Nummern" enthält jede alte Nummer, jede Lieferantennummer und jede Vergleichsnummer, getrennt durch Leerzeichen. Das Feld zählt als eines der 25 durchsuchbaren Merkmale, egal wie viele Nummern darin stehen.

Für Nummern würde ich immer den zweiten Weg nehmen. Die Daten gibt es im ERP schon, in Nachfolgeketten oder Notizen im Materialstamm, und die Schnittstelle kann das Feld bei jedem Lauf füllen. Ein typisches Szenario, als Annahme: ein Hersteller mit 30.000 aktiven Ersatzteilen, von denen 8.000 eine oder mehrere Vorgängernummern haben. Als Synonymregeln unmöglich, als Feld eine Spalte mehr im Produktimport.

Dasselbe Feld kann Schreibweisen aufnehmen: "4711-0020" und "47110020" nebeneinander, wenn Händler beides tippen. Welche Schreibweisen zählen, zeigt die Suchanalyse nach einigen Wochen.

Für Wörter bleiben Synonymregeln nützlich. "O-Ring", "Dichtring" und das englische "seal ring" für dasselbe Teil, "Filterpatrone" und "Filterelement", der interne Name einer Maschinenbaureihe und der Name im Prospekt des Händlers. Dort reichen 100 Regeln weit.

## Was hat Salesforce 2026 geändert?

Drei Ankündigungen aus 2026 zählen für die Teilesuche.

**B2B-Suche (Juni 2026).** Im [Beitrag zum Juni-Release](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) beschreibt Salesforce eine KI-gestützte und merkmalsbasierte Suche. Käufer brauchen nicht mehr den genauen Produktnamen oder die SKU und können in Alltagssprache beschreiben, was sie brauchen. Merchandiser bekommen eine feine Steuerung von merkmalsbasierter Suche und Produktsichtbarkeit. Für Händler, die ihre Teilenummer kennen, ändert das wenig. Für Endkunden oder neue Händler, die ein Teil beschreiben, kann es helfen. Ich würde es mit Ihren eigenen Beschreibungen testen, bevor ich mich darauf verlasse.

**Boost and Bury, Facettenreihenfolge und Suchanalyse (Juli 2026).** Laut [Beitrag zum Juli-Release](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) können Merchandiser Produkte in Such- und Kategorieergebnissen nach oben oder unten schieben, die Reihenfolge von Filtergruppen wie Marke, Größe oder Material festlegen und über Data Cloud Suchanfragen, Klickraten, Conversion und Suchen ohne Treffer sehen.

**Erweiterbare Such-Endpunkte.** Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) enthält Endpoint Extensions für die Produktsuche (Commerce_Endpoint_Search_ProductSearch und Commerce_Endpoint_Search_Products) und ab API-Version 67.0 für Suchvorschläge. Damit ändern Entwickler die Anfrage vor der Suche oder die Antwort danach. Dort gehört Logik hin, die Sucheinstellungen nicht abbilden, etwa eine eingegebene Teilenummer vor der Abfrage zu vereinheitlichen. Das ist Eigenentwicklung und gehört wie jeder andere Code in die Pipeline des Kunden.

## Wie helfen Boost and Bury und Facetten bei Ersatzteilen?

Boost and Bury hilft bei Teilen in zwei Fällen. Nachfolgeteile wandern nach oben, sodass ein Händler bei einem allgemeinen Begriff das aktuelle Teil vor dem alten sieht. Auslaufteile mit Restbestand wandern nach unten, bleiben aber auffindbar. Bei 100 Regeln pro Store würde ich Regeln auf Merkmale wie den Vertriebsstatus bauen, nicht auf einzelne Produkte.

Facetten helfen, wenn eine Suche viele Treffer liefert, etwa "Filter" in einem Katalog mit 400 Filtern. Dann grenzen Baureihe, Maß und Werkstoff die Liste ein. 10 Facetten pro Suche reichen, wenn sie gut gewählt sind: die Merkmale, nach denen Händler wirklich entscheiden, in der Reihenfolge, in der sie es tun. Sie setzen saubere Merkmalswerte voraus, und das ist eine Frage der [Produktdaten aus ERP und PIM](../produktdaten-b2b-commerce-pim-erp/).

Händlern nur Teile zu zeigen, die zu einer bestimmten Maschine passen, ist eine andere Anforderung. Suche und Facetten wissen nicht, welche Maschinen ein Händler hat. Die Wege dafür stehen in [nur Teile zur eigenen Maschine zeigen](../ersatzteilshop-teile-pro-maschine/), die KI-Seite in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/).

## Wo starten Sie?

Sammeln Sie, was Händler wirklich eintippen, bevor Sie etwas einstellen. Der Innendienst hat E-Mails und Telefonnotizen voller Teilenummern, alter Nummern und Beschreibungen. Nehmen Sie 200 davon und lassen Sie sie gegen einen Test-Store mit Ihren echten Daten laufen. Jeder Fehltreffer ist entweder fehlende Daten, ein fehlendes durchsuchbares Feld oder ein Problem mit der Schreibweise.

Nach dem Go-live ist die Liste der Suchen ohne Treffer die Arbeitsliste für die nächste Datenbereinigung. Prüfen Sie sie in den ersten Monaten jede Woche. Wie das zu anderen Kennzahlen passt, steht in [B2B-Shop-Kennzahlen nach dem Go-live](../b2b-shop-kennzahlen-nach-go-live/). Und nach jeder Änderung an durchsuchbaren Feldern, Produkten, Kategorien oder Entitlement Policies bauen Sie den Suchindex neu auf, denn Trailhead nennt all das als Auslöser.

Das Thema gehört zum [Kapitel zu Katalog, Suche und Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) meiner Masterclass B2B Commerce. Festzulegen, welche ERP-Felder die Suche füttern, gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Händler finden Teile, wenn die Nummern, die sie tippen, in den Daten stehen, also beginnen Sie mit ihren Suchbegriffen statt mit den Sucheinstellungen. Wenn Sie Ihre Teilenummern gegen ein Store-Design testen möchten, [schreiben Sie mir](#contact).
