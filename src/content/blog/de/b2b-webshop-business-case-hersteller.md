---
title: "B2B-Webshop Business Case für Hersteller"
description: "Wie ein Hersteller rechnet, ob sich ein B2B-Shop auf Salesforce lohnt: GMV-Gebühr, Käuferlizenzen, Innendienstzeit pro Bestellposition und ein Dreijahresmodell."
pubDate: 2026-10-28
lang: de
slug: b2b-webshop-business-case-hersteller
translationKey: commerce-business-case
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Business Case, Ersatzteile, Innendienst, GMV, Make-or-Buy]
takeaways:
  - "Die meisten Schätzungen vergessen mindestens zwei von fünf Kostenposten. Die GMV-Gebühr steigt genau dann, wenn der Shop Erfolg hat."
  - "Die GMV-Gebühr wächst mit dem Wert jeder Position, die Zeitersparnis mit der Zahl der Positionen. Bei teuren Teilen frisst die Gebühr den Großteil."
  - "Im Rechenbeispiel mit 40.000 Positionen und 2 Prozent GMV-Gebühr decken Zeit- und Fehlerersparnis nur rund 37 Prozent der Dreijahreskosten."
  - "Ein Shop rechnet sich meist über zusätzlichen Umsatz, etwa Bestellungen nach Feierabend. Diese Zahl braucht die strengste Prüfung."
  - "Die von Salesforce beauftragte Forrester-TEI-Studie beruht auf einem zusammengesetzten Unternehmen. Sie zeigt Hebel, nicht das Ergebnis Ihres Shops."
faq:
  - q: "Wie rechne ich den Business Case für einen B2B-Webshop?"
    a: "Rechnen Sie drei Jahre. Kosten sind GMV-Gebühr, Käuferlizenzen, Umsetzung, ERP-Anbindung und Betrieb. Nutzen sind Innendienstzeit pro Bestellposition, vermiedene Erfassungsfehler, weniger Statusanrufe und zusätzlicher Umsatz. Lassen Sie den digitalen Anteil Jahr für Jahr steigen, denn die Gebühr steigt mit."
  - q: "Wie viel Innendienstzeit spart ein B2B-Shop?"
    a: "Das hängt von Ihrem eigenen Ablauf ab. Messen Sie, wie lange das Erfassen einer Bestellposition heute dauert, einschließlich Prüfung und Rückfragen, und multiplizieren Sie mit den erwarteten Positionen im Store. In meinem angenommenen Szenario ergeben 4 Minuten bei 55 Euro pro Stunde rund 3,70 Euro pro Position."
  - q: "Wie belastbar ist die Forrester-Studie zu Salesforce B2B Commerce?"
    a: "Es ist eine Total-Economic-Impact-Studie von Forrester Consulting im Auftrag von Salesforce aus dem April 2024. Befragt wurden vier Kundenvertreter, zusammengefasst zu einem fiktiven Hersteller mit 1 Milliarde Dollar Umsatz. Forrester selbst empfiehlt, mit eigenen Schätzungen zu rechnen."
  - q: "Sollen Händler im B2B-Store Mitglieds- oder Login-Lizenzen bekommen?"
    a: "Laut Preisliste für Experience Cloud for Manufacturing kostet Customer Community Plus 35 € pro Mitglied oder 15 € pro Login im Monat. Ein Händler, der sich an weniger als drei Tagen im Monat anmeldet, ist mit Login-Lizenz günstiger, weil mehrere Logins an einem Tag als einer zählen."
draft: false
---

Ein Hersteller rechnet einen B2B-Shop auf Salesforce über drei Jahre: GMV-Gebühr, Käuferlizenzen, Umsetzung, ERP-Anbindung und Betrieb auf der einen Seite, eingesparte Innendienstzeit, weniger Erfassungsfehler und zusätzlicher Umsatz auf der anderen. Wichtig ist, dass die GMV-Gebühr mit dem Umsatz des Shops wächst, die Kosten steigen also genau dann, wenn der Shop Erfolg hat. Im Rechenbeispiel unten decken Zeit- und Fehlerersparnis allein nur rund ein Drittel der Kosten. Ein Shop rechnet sich meist über zusätzlichen Umsatz und über Innendienstkapazität, die Sie tatsächlich anders einsetzen. Beides braucht ehrliche Zahlen, keine Durchschnittswerte von Herstellern.

## Fünf Kostenposten, von denen meist zwei fehlen

Fünf Posten, und die meisten Schätzungen vergessen mindestens zwei:

1. **GMV-Gebühr.** Salesforce berechnet einen Prozentsatz des Bruttowarenwerts, also des Store-Umsatzes abzüglich Steuern und Versand. Die [Preisseite](https://www.salesforce.com/de/commerce/b2b-ecommerce/pricing/) zeigt für Growth und Advanced "Preisangebot anfordern" und nennt keinen Prozentsatz. Details stehen in [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/).
2. **Käuferlizenzen.** Käufer brauchen Customer Community Plus. Laut [Preisliste für Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) kostet sie 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet.
3. **Umsetzung.** Store-Einrichtung, Katalog, Käufergruppen, Sichtbarkeitsregeln, Preisbücher, Checkout, Tests.
4. **ERP-Anbindung.** Preis- und Bestandsaufrufe, Auftragsübergabe, Status und Rechnungen zurück. In der Fertigung ist das oft größer als der Store selbst.
5. **Betrieb.** Katalogpflege, Support für Händler, drei Salesforce-Releases im Jahr mit Regressionstests.

## Was gehört auf die Nutzenseite?

Vier Posten, in der Reihenfolge, in der ich ihnen traue:

1. **Innendienstzeit pro Bestellposition.** Messen Sie, wie lange das Erfassen einer Position heute dauert, einschließlich der Rückfrage, wenn eine Teilenummer falsch ist. Das ist die verlässlichste Zahl, weil Sie die Zeit stoppen können.
2. **Erfassungsfehler.** Falsches Teil, falsche Menge, falsche Adresse. Jeder Fehler kostet eine Retoure, eine Gutschrift und eine zweite Lieferung.
3. **Weniger Statusanrufe.** Sehen Händler Auftragsstatus und Historie im Store, fallen manche Anrufe weg.
4. **Zusätzlicher Umsatz.** Bestellungen nachts oder am Wochenende, Händler, die vorher bei einem Dritten gekauft haben, Aufträge, die nie kamen, weil die E-Mail liegen blieb. Das ist der größte und unsicherste Posten.

Eine Regel für Posten 1: Eingesparte Zeit ist erst dann Geld, wenn Sie sie nutzen. Behält der Innendienst dieselbe Besetzung und dieselbe Arbeit, bleibt die Ersparnis auf dem Papier. Legen Sie vorher fest, was mit der frei werdenden Kapazität passiert, zum Beispiel aktive Anrufe bei Händlern, die weniger bestellen als im Vorjahr.

## Rechenbeispiel: Ersatzteilshop für 250 Händler

Angenommen, ein Hersteller von Förderanlagen verkauft Ersatzteile über 250 Händler. Die Zahlen:

- 40.000 Ersatzteil-Bestellpositionen im Jahr, durchschnittlich 150 Euro pro Position, also 6 Millionen Euro netto.
- Der Innendienst braucht 4 Minuten pro Position bei Vollkosten von 55 Euro pro Stunde: rund 3,67 Euro pro Position.
- 2 Prozent der manuell erfassten Positionen enthalten einen Fehler, dessen Korrektur 60 Euro kostet: 1,20 Euro pro Position.
- Die GMV-Gebühr ist mit 2 Prozent angenommen.
- Eine Mitgliedslizenz pro aktivem Händler zu 35 Euro im Monat.
- Umsetzung einschließlich ERP-Anbindung 250.000 Euro, Betrieb 40.000 Euro im Jahr.

```hinweis offen
Den GMV-Satz von 2 Prozent nennen Integratoren, Salesforce bestätigt ihn nicht. Ersetzen Sie ihn durch den Satz aus Ihrem Angebot.
```

Bei einem digitalen Anteil, der über drei Jahre von 25 auf 70 Prozent steigt, sieht das so aus:

| Jahr | Store-Anteil | Positionen im Store | Zeit- und Fehlerersparnis | GMV-Gebühr | Käuferlizenzen | Betrieb | Kosten |
|---|---|---|---|---|---|---|---|
| 1 | 25 % | 10.000 | 48.700 € | 30.000 € | 42.000 € (100 Händler) | 40.000 € | 112.000 € |
| 2 | 50 % | 20.000 | 97.300 € | 60.000 € | 73.500 € (175 Händler) | 40.000 € | 173.500 € |
| 3 | 70 % | 28.000 | 136.300 € | 84.000 € | 105.000 € (250 Händler) | 40.000 € | 229.000 € |

Über drei Jahre spart der Store rund 282.000 Euro. Die Kosten liegen bei 514.500 Euro plus 250.000 Euro Umsetzung, also 764.500 Euro. Die Ersparnis deckt rund 37 Prozent. Um die Lücke von etwa 482.000 Euro zu schließen, muss der Store rund 160.000 Euro zusätzlichen Deckungsbeitrag im Jahr bringen. Bei einem Deckungsbeitrag von 30 Prozent nach GMV-Gebühr sind das etwa 536.000 Euro mehr Ersatzteilumsatz im Jahr, fast 9 Prozent auf 6 Millionen.

Das kann durchaus realistisch sein. Aber auf dieser Zahl ruht die Entscheidung, und sie sollte aus dem Vertrieb kommen, mit einer Begründung je Händlergruppe, nicht von einer Folie.

## Warum wächst die GMV-Gebühr mit dem Erfolg?

Betrachten Sie das Szenario pro Bestellposition. Der Store spart 4,87 Euro pro Position an Zeit und Fehlern. Die GMV-Gebühr von 2 Prozent auf 150 Euro beträgt 3 Euro pro Position. Im dritten Jahr kommen 3,75 Euro Käuferlizenz pro Position dazu. Pro Position kostet der Store mehr, als er an Zeit spart.

Dahinter stecken zwei Effekte. Erstens skaliert die Gebühr mit dem Wert einer Position, die Ersparnis mit der Zahl der Positionen. Eine Position über 1.500 Euro kostet zehnmal so viel Gebühr wie eine über 150 Euro, braucht aber dieselben 4 Minuten Erfassung. Stores mit vielen günstigen Verbrauchsteilen schneiden auf dieser Seite besser ab als Stores mit teuren Baugruppen. Zweitens ist die Lizenz pro Händler fix, während kleine Händler wenige Positionen bestellen. Ein Händler, der sich an zwei Tagen im Monat anmeldet, ist mit einer Login-Lizenz zu 15 Euro günstiger, weil laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) mehrere Logins an einem Tag als einer zählen. Der Lizenztyp je Händlergruppe ist ein echter Hebel im Modell.

Deshalb rechne ich immer drei Jahre mit steigendem Anteil. Eine Einjahresbetrachtung verdeckt, dass die Gebühr steigt, während die Umsetzung schon bezahlt ist.

## Die Forrester-Studie zeigt Hebel, kein Ergebnis

Salesforce wirbt mit einer [Total-Economic-Impact-Studie von Forrester Consulting](https://tei.forrester.com/go/salesforce/b2bcommerce2024), beauftragt von Salesforce und veröffentlicht im April 2024. Ihre Kernzahlen:

```kennzahlen
289 % | Dreijahres-ROI laut Studie
unter 6 Monate | Amortisation laut Studie
4 | befragte Kundenvertreter als Grundlage
quelle: Forrester Consulting, Total-Economic-Impact-Studie zu Salesforce B2B Commerce im Auftrag von Salesforce, April 2024
```

Die vier Interviews sind zu einem fiktiven Hersteller mit 1 Milliarde Dollar Umsatz zusammengefasst. Forrester selbst empfiehlt, mit eigenen Schätzungen zu rechnen.

Ich lese solche Studien als Liste von Hebeln: Welchen Nutzen haben diese Kunden gesehen, welche Kosten haben sie genannt. Die Zahlen lassen sich nicht auf einen Hersteller mit 250 Händlern und 6 Millionen Euro Ersatzteilumsatz übertragen. Ihre eigene Stoppuhr im Innendienst sagt Ihnen mehr als ein zusammengesetztes Unternehmen.

## Erster Schritt: vier Zahlen aus den letzten zwölf Monaten

Erheben Sie vier Zahlen aus den letzten zwölf Monaten: Bestellpositionen je Kanal, Durchschnittswert pro Position, Minuten pro manuell erfasster Position und Kosten von Erfassungsfehlern. Bauen Sie dann das Dreijahresmodell mit dem GMV-Satz als Variable bei 1, 2 und 3 Prozent. Ob überhaupt ein Store oder ein Portal passt, steht in [B2B Commerce oder Händlerportal: Wann lohnt ein Shop?](../b2b-commerce-oder-haendlerportal/), und welche Zahlen Sie nach dem Start messen, in [B2B-Shop Kennzahlen: Was nach dem Go-live zählt](../b2b-shop-kennzahlen-nach-go-live/). Die Gesamtentscheidung behandelt das [Masterclass-Kapitel zur Frage, ob sich B2B Commerce lohnt](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/), und eine unabhängige Prüfung der Zahlen gehört zu meiner Arbeit bei [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
