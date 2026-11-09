---
title: "B2B-Shop Kennzahlen: Was nach dem Go-live zählt"
description: "Welche Kennzahlen zeigen, ob ein Salesforce-B2B-Shop nach dem Go-live wirkt: Anteil der Positionen, Suchen ohne Treffer, Conversion, Innendienst, Data 360."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-shop-kennzahlen-nach-go-live
translationKey: commerce-kpis-after-go-live
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Kennzahlen, Suchanalyse, Data 360, Innendienst, Conversion]
takeaways:
  - "Die wichtigste Kennzahl ist der Anteil der shopfähigen Auftragspositionen über den Shop, je Buyer Group. Der Umsatz allein zeigt keinen Kanalwechsel."
  - "Suchen ohne Treffer zeigen fehlende Teilenummern und Synonyme. Das Search-Intelligence-Dashboard auf Data 360 zeigt sie zusammen mit Klickraten."
  - "Der Merchant Agent, enthalten in Growth und Advanced, fasst den durchschnittlichen Bestellwert und die Conversion eines Stores im Dialog zusammen."
  - "Innendienstminuten pro Position und der Korrekturaufwand je Shop-Position zeigen, ob der Shop Arbeit spart oder nur verschiebt."
  - "Growth enthält 250K und Advanced 500K Data-360-Credits. Sie sind ein Kostenfaktor, keine harte Grenze; prüfen Sie den Verbrauch im Digital Wallet."
faq:
  - q: "Welche Kennzahlen zählen nach dem Go-live eines B2B-Shops?"
    a: "Der Anteil der shopfähigen Auftragspositionen über den Shop je Buyer Group, Suchen ohne Treffer, die Conversion von der Suche zur Bestellung, Innendienstminuten pro Auftragsposition und der Korrekturaufwand je Shop-Position. Zusammen zeigen sie Akzeptanz, Auffindbarkeit und ob der Shop Arbeit spart."
  - q: "Hat Salesforce B2B Commerce eine Suchanalyse?"
    a: "Ja. Salesforce hat mit dem B2B-Commerce-Release vom Juli 2026 eine Suchanalyse angekündigt. Das Search-Intelligence-Dashboard in der Salesforce-Hilfe zeigt Suchen gesamt, Suchen mit und ohne Treffer, Klickraten und Suchbegriffe. Es braucht Data 360 (früher Data Cloud) für B2B Commerce und verbraucht damit Data-360-Credits. Eine Conversion von der Suche zur Bestellung gehört nicht zum dokumentierten Dashboard."
  - q: "Wie viele Data-360-Credits sind in B2B Commerce enthalten?"
    a: "Laut Salesforce-Preisseite, die noch Data-Cloud-Credits schreibt, enthält die Commerce Cloud B2B Growth Edition 250K und die Advanced Edition 500K. Wie viele Credits die Suchanalyse verbraucht, veröffentlicht Salesforce nicht. Ist das Kontingent aufgebraucht, gelten Zusatz-Credits oder Mehrverbrauch zum Vertragssatz, also beobachten Sie den Verbrauch im Digital Wallet."
  - q: "Wann sollte die erste Auswertung stattfinden?"
    a: "Fehler, ERP-Ablehnungen und Suchen ohne Treffer brauchen ab dem ersten Tag einen wöchentlichen Blick. Die erste Akzeptanzauswertung plane ich etwa drei Monate nach dem Go-live einer Buyer Group und wiederhole sie je Welle, weil frühere Zahlen vor allem Neugier zeigen, keine Gewohnheiten. Die Ausgangswerte müssen vor dem Go-live erhoben werden."
draft: false
---

Nach dem Go-live zeigen fünf Zahlen, ob ein B2B-Shop wirkt: der Anteil der Auftragspositionen, die über den Shop kommen, je Buyer Group, Suchen ohne Treffer, die Conversion von der Suche zur Bestellung, Innendienstminuten pro Auftragsposition und der Korrekturaufwand je Shop-Position. Sie zeigen Akzeptanz, Auffindbarkeit und ob der Shop Arbeit spart oder nur verschiebt. Einen Teil der Daten liefert Salesforce über die Suchanalyse auf Data 360 und den Merchant Agent, den Rest liefern das ERP und Ihre eigenen Ausgangswerte. Werten Sie die Akzeptanz je Buyer Group etwa drei Monate nach jeder Welle aus, und behalten Sie die Data-360-Credits im Blick.

## Welche Kennzahlen zeigen, ob ein B2B-Shop wirkt?

Ein B2B-Shop für Händler hat eine andere Aufgabe als ein Shop für Endkunden. Händler haben oft schon einen eingespielten Bestellweg, die Frage ist, ob sie über den Shop bestellen und ob Sie das weniger kostet. Deshalb nutze ich diese fünf Kennzahlen und lasse Besucherzahlen weg:

| Kennzahl | Frage dahinter | Quelle |
|---|---|---|
| Anteil der shopfähigen Auftragspositionen über den Shop | Wechseln die Händler? | ERP, nach Bestellkanal |
| Suchen ohne Treffer | Finden Händler ihre Teile? | Search Intelligence auf Data 360 |
| Conversion von Suche zu Bestellung | Führt Finden zu Kaufen? | Eigene Auswertung: Klickrate aus Search Intelligence plus Bestelldaten |
| Innendienstminuten pro Auftragsposition | Spart der Shop Arbeit? | Eigene Zeitmessung, vorher und nachher |
| Korrekturaufwand je Shop-Position | Stimmen die Daten? | ERP-Ablehnungs- und Änderungsprotokolle, Integrationsfehler oder ein Feld für den Korrekturgrund |

Es sind dieselben fünf, die ich in den [Business Case für einen B2B-Webshop](../b2b-webshop-business-case-hersteller/) schreiben würde. Die Auswertung nach dem Go-live prüft die Annahmen dieses Business Case an der Wirklichkeit.

## Warum Auftragspositionen und nicht Umsatz?

Der Umsatz über den Shop ist die Zahl, die jedes Dashboard zuerst zeigt, aber allein belegt sie keinen Kanalwechsel. Eine große Projektbestellung über den Shop treibt den Umsatz nach oben, ohne dass ein einziger Händler seine Gewohnheit ändert. Auftragspositionen bilden die Arbeit meist besser ab, weil der Erfassungsaufwand eher mit der Zahl der Positionen wächst als mit ihrem Wert. Preisabweichungen, Konfiguration und Liefertermine kosten ebenfalls Zeit, prüfen Sie die Näherung deshalb an der Zeitmessung.

Ich messe den Anteil der Auftragspositionen über den Shop gegen die Positionen, die überhaupt über den Shop laufen können. EDI-Bestellungen, konfigurierte Produkte und Projektaufträge bleiben aus dem Nenner, sonst erreicht eine Gruppe nie einen hohen Anteil, und die Kennzahl belohnt es, effizientes EDI in den Shop zu verlagern. Ich messe je Buyer Group, weil Buyer Groups die Wellen der Einführung sind, beschrieben in [B2B-Shop für Händler einführen](../b2b-shop-haendler-einfuehren/). Eine Gruppe, die nach drei Monaten bei 10 Prozent steht, braucht ein Gespräch mit ihren Händlern. Eine Gruppe bei 60 Prozent zeigt, was funktioniert. Die Summe über alle Händler verdeckt beides.

Die Quelle ist das ERP, denn dort liegen alle Bestellungen aus allen Kanälen. Bestellungen aus dem Shop brauchen dafür ein Kanalkennzeichen, das die Übergabe ins ERP übersteht, damit jede Position dem Shop, dem Telefon, der E-Mail oder EDI zugeordnet werden kann. Vereinbaren Sie dieses Feld beim Entwurf der Auftragsschnittstelle, nicht erst bei der ersten Auswertung.

## Was zeigt die Suchanalyse?

Ersatzteilhändler suchen nach Teilenummer, alter Teilenummer oder Beschreibung. Findet die Suche nichts, greift der Händler zum Telefon. Damit sind Suchen ohne Treffer das nützlichste Frühwarnsignal, das ein Shop hat.

Mit dem B2B-Commerce-Release vom Juli 2026 hat Salesforce eine [Suchanalyse über Data Cloud](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) angekündigt, heute Data 360, in der Ankündigung mit „conversion outcomes“. Das in der Salesforce-Hilfe dokumentierte [Search-Intelligence-Dashboard](https://help.salesforce.com/s/articleView?id=commerce.comm_intelligence_dashboards_search.htm&type=5) zeigt Suchen gesamt, Suchen mit und ohne Treffer, Klickraten und die Suchbegriffe dahinter. Eine Conversion von der Suche zur Bestellung gehört nicht dazu. Behandeln Sie sie als eigene Auswertung mit festgelegter Zuordnung, etwa Klick auf einen Treffer und Bestellung in derselben Sitzung. Die Liste der Suchbegriffe ohne Treffer schaue ich in den ersten Monaten alle zwei Wochen durch. Die meisten Einträge haben eine von vier Ursachen: Eine alte Teilenummer fehlt als Attribut oder Synonym, die Händler nutzen eine andere Schreibweise, das Teil fehlt versehentlich im Katalog oder Entitlement, oder die Buyer Group darf das Teil zu Recht nicht kaufen, und der Shop sollte das erklären und auf einen Nachfolger oder Ansprechpartner verweisen. Die ersten beiden sind Sache der Sucheinrichtung, siehe [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/). Denken Sie an die Grenzen: Die [Suchlimits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) erlauben 100 Synonymregeln pro Store als harte Grenze, ersetzte Teilenummern gehören deshalb eher in Attribute als in Synonyme.

Die Klickrate zeigt den nächsten Schritt: Eine Suche mit 50 Treffern, aber ohne Klick, deutet meist auf eine schlechte Sortierung. Hier helfen Boost-and-Bury-Regeln, Salesforce erlaubt bis zu 100 davon.

## Der Merchant Agent fasst Bestellwert und Conversion zusammen

Laut der [Salesforce-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) enthalten beide B2B-Editionen, Growth und Advanced, den Merchant Agent. Das [Trailhead-Modul zum Merchant Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) zeigt, wie er den durchschnittlichen Bestellwert eines Stores abruft, zusammenfasst und die schwächste Kategorie nennt. Anfragen nach Details zur Conversion der Site beantwortet er ebenfalls. Zur Einrichtung aktivieren Sie generative KI, Agentforce, Bots und Data 360 für den Store.

Für die wöchentliche Frage eines Merchandisers, welche Kategorie nachgelassen hat, finde ich das nützlich. Für die Auswertung mit der Geschäftsführung würde ich mich nicht auf Chat-Antworten verlassen. Nutzen Sie den Agenten, um ein Thema zu finden, und prüfen Sie die Zahl dann in einem Bericht, den Sie wiederholen können. Die Editionen enthalten außerdem CRM-Analytics-Benutzerlizenzen, 3 bei Growth und 5 bei Advanced. Prüfen Sie, ob das für Admins, Dashboard-Verantwortliche und regelmäßige Leser in Ihrem Betriebsmodell reicht.

## Gesparte Arbeit in Innendienstminuten pro Position messen

Innendienstminuten pro Auftragsposition sind die Kennzahl, die den Shop bezahlt, und Salesforce kann sie nicht für Sie messen. Sie brauchen einen Ausgangswert von vor dem Go-live: Zwei Wochen lang notiert der Innendienst, wie lange die Erfassung einer Bestellung per Telefon oder E-Mail dauert, aufgeteilt nach Positionen. Drei Monate nach jeder Welle wiederholen Sie dieselbe Messung.

Die zweite Zahl ist der Korrekturaufwand: manuelle Korrekturminuten geteilt durch Shop-Positionen. Verfolgen Sie daneben den Anteil der Shop-Bestellungen mit irgendeiner Korrektur, und halten Sie die Ursache in einem Feld für den Korrekturgrund oder aus den ERP-Ablehnungen fest. Typische Ursachen sind einer falschen Lieferadresse, eine Preisdifferenz oder ein Teil, das das ERP ablehnt. Ein hoher Anteil heißt, dass der Shop Arbeit erzeugt statt spart. Die Ursache sind meist Daten: Preisbücher, die vom ERP abweichen, oder Entitlements für Teile, die nicht mehr bestellbar sind.

Rechenbeispiel: Vor dem Go-live erfasst der Innendienst 40.000 Auftragspositionen im Jahr mit je 4 Minuten, rund 2.670 Stunden. Nach sechs Monaten kommen 45 Prozent der Positionen, also 18.000, über den Shop, und 3 Prozent davon brauchen eine Korrektur von 10 Minuten. Die Ersparnis liegt bei rund 1.200 Stunden Erfassung abzüglich 90 Stunden Korrektur. Bei einer Korrekturquote von 20 Prozent würden Korrekturen 600 Stunden fressen, die Hälfte der Ersparnis.

## 250K oder 500K Data-360-Credits machen den Verbrauch zum Kostenfaktor

Die Suchanalyse läuft auf Data 360, früher Data Cloud, und Arbeit in Data 360 verbraucht Credits aus dem Kontingent Ihrer Edition. Die Analyse stoppt nicht, wenn sie aufgebraucht sind: Dann gelten Zusatz-Credits oder Mehrverbrauch zum Vertragssatz.

```kennzahlen
250K | Data-360-Credits in Commerce Cloud B2B Growth
500K | Data-360-Credits in Commerce Cloud B2B Advanced
quelle: Salesforce-Preisseite Commerce Cloud B2B (dort noch Data-Cloud-Credits), Stand 9.11.2026
```

Laut [Trailhead zum Credit-Verbrauch](https://trailhead.salesforce.com/content/learn/modules/data-cloud-credit-consumption-quick-look/get-started-with-data-cloud-credit-consumption) verbrauchen Datenaufnahme, Abfragen für Berichte und Dashboards, Segmentierung und Calculated Insights jeweils Credits, Calculated Insights bei jeder Aktualisierung erneut. Daten aus Ihrer Salesforce-Org über den CRM-Connector aufzunehmen, verbraucht keine Credits.

Wie viele Credits die Suchanalyse verbraucht, veröffentlicht Salesforce nicht. Prüfen Sie den Verbrauch deshalb nach dem ersten Monat im Digital Wallet und erneut, wenn sich Datenmenge, Transform-Zeitpläne oder die Aktualisierung der Dashboards ändern. Das treibt den Verbrauch stärker als die Zahl der Dashboards. Wie Credits mit anderen KI-Kosten zusammenhängen, steht im KI-Masterclass-Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/).

## Ausgangswerte vor dem Go-live erheben

Die Messung beginnt vor dem Go-live, nicht danach.

```schritte
Ausgangswerte erheben | 2 Wochen · Innendienst
  Auftragspositionen je Kanal und Buyer Group aus dem ERP, dazu die Innendienstzeit pro Position.
Kanalkennzeichen vereinbaren
  Im Entwurf der Auftragsschnittstelle, damit jede Position ihrem Kanal zugeordnet bleibt.
Erste Auswertung | 3 Monate nach der ersten Welle
  Termin vor dem Go-live festlegen, dieselben Messungen wiederholen. Fehler, ERP-Ablehnungen und Suchen ohne Treffer ab dem ersten Tag wöchentlich ansehen.
Je Welle wiederholen
  Jede weitere Buyer Group wird drei Monate nach ihrem Go-live gemessen.
```

Dieselbe Disziplin für Agenten beschreibe ich in [Agentforce Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/). Das ganze Kapitel steht in der Masterclass unter [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/).
