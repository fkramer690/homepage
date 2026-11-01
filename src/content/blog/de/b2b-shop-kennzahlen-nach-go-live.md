---
title: "B2B-Shop Kennzahlen: Was nach dem Go-live zählt"
description: "Welche Kennzahlen zeigen, ob ein Salesforce-B2B-Shop nach dem Go-live wirkt: Anteil der Positionen, Suchen ohne Treffer, Conversion, Innendienst, Credits."
pubDate: 2026-10-28
lang: de
slug: b2b-shop-kennzahlen-nach-go-live
translationKey: commerce-kpis-after-go-live
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Kennzahlen, Suchanalyse, Data Cloud, Innendienst, Conversion]
takeaways:
  - "Die wichtigste Kennzahl ist der Anteil der Auftragspositionen über den Shop, je Buyer Group. Der Shop-Umsatz allein verdeckt, ob Händler gewechselt haben."
  - "Suchen ohne Treffer zeigen fehlende Teilenummern und Synonyme. Salesforce hat dafür im Juli 2026 eine Suchanalyse über Data Cloud angekündigt."
  - "Der Merchant Agent, enthalten in Growth und Advanced, fasst den durchschnittlichen Bestellwert und die Conversion eines Stores im Dialog zusammen."
  - "Innendienstminuten pro Position und der Anteil von Hand korrigierter Bestellungen zeigen, ob der Shop Arbeit spart oder nur verschiebt."
  - "Growth enthält 250K und Advanced 500K Data-Cloud-Credits. Prüfen Sie den Verbrauch im Digital Wallet, bevor Sie weitere Dashboards auf Data Cloud bauen."
faq:
  - q: "Welche Kennzahlen zählen nach dem Go-live eines B2B-Shops?"
    a: "Der Anteil der Auftragspositionen über den Shop je Buyer Group, Suchen ohne Treffer, die Conversion von der Suche zur Bestellung, Innendienstminuten pro Auftragsposition und der Anteil der Bestellungen mit manueller Korrektur. Zusammen zeigen sie Akzeptanz, Auffindbarkeit und ob der Shop Arbeit spart."
  - q: "Hat Salesforce B2B Commerce eine Suchanalyse?"
    a: "Salesforce hat mit dem B2B-Commerce-Release vom Juli 2026 eine Suchanalyse über Data Cloud angekündigt. Sie zeigt Suchanfragen, Klickraten, Conversions und Suchen ohne Treffer. Sie läuft auf Data Cloud und verbraucht damit die Data-Cloud-Credits Ihrer Edition."
  - q: "Wie viele Data-Cloud-Credits sind in B2B Commerce enthalten?"
    a: "Laut Salesforce-Preisseite enthält die Commerce Cloud B2B Growth Edition 250K Data-Cloud-Credits und die Advanced Edition 500K. Wie viele Credits die Suchanalyse verbraucht, veröffentlicht Salesforce nicht, also beobachten Sie den Verbrauch im Digital Wallet."
  - q: "Wann sollte die erste Auswertung stattfinden?"
    a: "Ich plane die erste Auswertung etwa drei Monate nach dem Go-live einer Buyer Group und wiederhole sie je Welle. Frühere Zahlen zeigen vor allem Neugier, keine Gewohnheiten. Die Ausgangswerte aus der Zeit vor dem Shop müssen vor dem Go-live erhoben werden."
draft: false
---

Nach dem Go-live zeigen fünf Zahlen, ob ein B2B-Shop wirkt: der Anteil der Auftragspositionen, die über den Shop kommen, je Buyer Group, Suchen ohne Treffer, die Conversion von der Suche zur Bestellung, Innendienstminuten pro Auftragsposition und der Anteil der Bestellungen, die von Hand korrigiert werden. Sie zeigen Akzeptanz, Auffindbarkeit und ob der Shop Arbeit spart oder nur verschiebt. Einen Teil der Daten liefert Salesforce über die Suchanalyse in Data Cloud und den Merchant Agent, den Rest liefern das ERP und Ihre eigenen Ausgangswerte. Messen Sie je Buyer Group, etwa drei Monate nach jeder Welle, und behalten Sie die Data-Cloud-Credits im Blick.

## Welche Kennzahlen zeigen, ob ein B2B-Shop wirkt?

Ein B2B-Shop für Händler hat eine andere Aufgabe als ein Shop für Endkunden. Händler bestellen ohnehin, die Frage ist, ob sie über den Shop bestellen und ob Sie das weniger kostet. Deshalb nutze ich diese fünf Kennzahlen und lasse Besucherzahlen weg:

| Kennzahl | Frage dahinter | Quelle |
|---|---|---|
| Anteil der Auftragspositionen über den Shop | Wechseln die Händler? | ERP, nach Bestellkanal |
| Suchen ohne Treffer | Finden Händler ihre Teile? | Suchanalyse über Data Cloud |
| Conversion von Suche zu Bestellung | Führt Finden zu Kaufen? | Suchanalyse, Merchant Agent |
| Innendienstminuten pro Auftragsposition | Spart der Shop Arbeit? | Eigene Zeitmessung, vorher und nachher |
| Bestellungen mit manueller Korrektur | Stimmen die Daten? | ERP oder Order Summaries in Salesforce |

Es sind dieselben fünf, die ich in den [Business Case für einen B2B-Webshop](../b2b-webshop-business-case-hersteller/) schreiben würde. Die Auswertung nach dem Go-live prüft die Annahmen dieses Business Case an der Wirklichkeit.

## Warum Auftragspositionen und nicht Umsatz?

Der Umsatz über den Shop ist die Zahl, die jedes Dashboard zuerst zeigt, und sie führt in die Irre. Eine große Projektbestellung über den Shop treibt den Umsatz nach oben, ohne dass ein einziger Händler seine Gewohnheit ändert. Auftragspositionen zeigen die Arbeit: Der Aufwand im Innendienst wächst mit der Zahl der getippten Positionen, nicht mit ihrem Wert.

Ich messe den Anteil der Auftragspositionen über den Shop je Buyer Group, weil Buyer Groups die Wellen der Einführung sind, beschrieben in [B2B-Shop für Händler einführen](../b2b-shop-haendler-einfuehren/). Eine Gruppe, die nach drei Monaten bei 10 Prozent steht, braucht ein Gespräch mit ihren Händlern. Eine Gruppe bei 60 Prozent zeigt, was funktioniert. Die Summe über alle Händler verdeckt beides.

Die Quelle ist das ERP, denn dort liegen alle Bestellungen aus allen Kanälen. Bestellungen aus dem Shop brauchen dafür ein Kanalkennzeichen, das die Übergabe ins ERP übersteht, damit jede Position dem Shop, dem Telefon, der E-Mail oder EDI zugeordnet werden kann. Vereinbaren Sie dieses Feld beim Entwurf der Auftragsschnittstelle, nicht erst bei der ersten Auswertung.

## Was zeigt die Suchanalyse?

Ersatzteilhändler suchen nach Teilenummer, alter Teilenummer oder Beschreibung. Findet die Suche nichts, greift der Händler zum Telefon. Damit sind Suchen ohne Treffer das nützlichste Frühwarnsignal, das ein Shop hat.

Mit dem B2B-Commerce-Release vom Juli 2026 hat Salesforce eine [Suchanalyse über Data Cloud](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) angekündigt: Einblick in Suchanfragen, Klickraten, Conversions und Suchen ohne Treffer. Die Liste der Suchbegriffe ohne Treffer schaue ich in den ersten Monaten alle zwei Wochen durch. Die meisten Einträge haben eine von drei Ursachen: Eine alte Teilenummer fehlt als Attribut oder Synonym, die Händler nutzen eine andere Schreibweise, oder das Teil fehlt im Entitlement der Buyer Group. Die ersten beiden sind Sache der Sucheinrichtung, siehe [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/). Denken Sie an die Grenzen: Die [Suchlimits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) erlauben 100 Synonymregeln pro Store als harte Grenze, ersetzte Teilenummern gehören deshalb eher in Attribute als in Synonyme.

Klickrate und Conversion zeigen den nächsten Schritt: Eine Suche mit 50 Treffern, aber ohne Klick, deutet meist auf eine schlechte Sortierung. Hier helfen Boost-and-Bury-Regeln, Salesforce erlaubt bis zu 100 davon.

## Der Merchant Agent fasst Bestellwert und Conversion zusammen

Laut der [Salesforce-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) enthalten beide B2B-Editionen, Growth und Advanced, den Merchant Agent. Das [Trailhead-Modul zum Merchant Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) zeigt, wie er den durchschnittlichen Bestellwert eines Stores abruft, zusammenfasst und die schwächste Kategorie nennt. Anfragen nach Details zur Conversion der Site beantwortet er ebenfalls. Zur Einrichtung aktivieren Sie generative KI, Agentforce, Bots und Data 360 für den Store.

Für die wöchentliche Frage eines Merchandisers, welche Kategorie nachgelassen hat, finde ich das nützlich. Für die Auswertung mit der Geschäftsführung würde ich mich nicht auf Chat-Antworten verlassen. Nutzen Sie den Agenten, um ein Thema zu finden, und prüfen Sie die Zahl dann in einem Bericht, den Sie wiederholen können. Die Editionen enthalten außerdem CRM Analytics, 3 Benutzer bei Growth und 5 bei Advanced. Das reicht für die Personen, die das Dashboard bauen und verantworten.

## Gesparte Arbeit in Innendienstminuten pro Position messen

Innendienstminuten pro Auftragsposition sind die Kennzahl, die den Shop bezahlt, und Salesforce kann sie nicht für Sie messen. Sie brauchen einen Ausgangswert von vor dem Go-live: Zwei Wochen lang notiert der Innendienst, wie lange die Erfassung einer Bestellung per Telefon oder E-Mail dauert, aufgeteilt nach Positionen. Drei Monate nach jeder Welle wiederholen Sie dieselbe Messung.

Die zweite Zahl ist der Anteil der Shop-Bestellungen, die jemand von Hand korrigieren muss, etwa wegen einer falschen Lieferadresse, einer Preisdifferenz oder eines Teils, das das ERP ablehnt. Ein hoher Anteil heißt, dass der Shop Arbeit erzeugt statt spart. Die Ursache sind meist Daten: Preisbücher, die vom ERP abweichen, oder Entitlements für Teile, die nicht mehr bestellbar sind.

Rechenbeispiel: Vor dem Go-live erfasst der Innendienst 40.000 Auftragspositionen im Jahr mit je 4 Minuten, rund 2.670 Stunden. Nach sechs Monaten kommen 45 Prozent der Positionen, also 18.000, über den Shop, und 3 Prozent davon brauchen eine Korrektur von 10 Minuten. Die Ersparnis liegt bei rund 1.200 Stunden Erfassung abzüglich 90 Stunden Korrektur. Bei einer Korrekturquote von 20 Prozent würden Korrekturen 600 Stunden fressen, die Hälfte der Ersparnis.

## 250K oder 500K Data-Cloud-Credits begrenzen die Analyse

Die Suchanalyse läuft auf Data Cloud, und Arbeit in Data Cloud verbraucht Credits aus dem Kontingent Ihrer Edition.

```kennzahlen
250K | Data-Cloud-Credits in Commerce Cloud B2B Growth
500K | Data-Cloud-Credits in Commerce Cloud B2B Advanced
quelle: Salesforce-Preisseite Commerce Cloud B2B
```

Laut [Trailhead zum Credit-Verbrauch](https://trailhead.salesforce.com/content/learn/modules/data-cloud-credit-consumption-quick-look/get-started-with-data-cloud-credit-consumption) verbrauchen Datenaufnahme, Abfragen für Berichte und Dashboards, Segmentierung und Calculated Insights jeweils Credits, Calculated Insights bei jeder Aktualisierung erneut. Daten aus Ihrer Salesforce-Org über den CRM-Connector aufzunehmen, verbraucht keine Credits.

Wie viele Credits die Suchanalyse verbraucht, veröffentlicht Salesforce nicht. Prüfen Sie den Verbrauch deshalb nach dem ersten Monat im Digital Wallet, bevor jemand zehn weitere Dashboards auf Data Cloud baut. Wie Credits mit anderen KI-Kosten zusammenhängen, steht im KI-Masterclass-Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/).

## Ausgangswerte vor dem Go-live erheben

Die Messung beginnt vor dem Go-live, nicht danach.

```schritte
Ausgangswerte erheben | 2 Wochen · Innendienst
  Auftragspositionen je Kanal und Buyer Group aus dem ERP, dazu die Innendienstzeit pro Position.
Kanalkennzeichen vereinbaren
  Im Entwurf der Auftragsschnittstelle, damit jede Position ihrem Kanal zugeordnet bleibt.
Erste Auswertung | 3 Monate nach der ersten Welle
  Termin vor dem Go-live festlegen, dieselben Messungen wiederholen.
Je Welle wiederholen
  Jede weitere Buyer Group wird drei Monate nach ihrem Go-live gemessen.
```

Dieselbe Disziplin für Agenten beschreibe ich in [Agentforce Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/). Das ganze Kapitel steht in der Masterclass unter [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/).
