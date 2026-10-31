---
title: "Revenue Cloud Preise: Growth, Advanced und Add-ons"
description: "Was Revenue Cloud Growth, Advanced, Billing und die Add-ons im Oktober 2026 kosten, was sie enthalten und wie ein Hersteller seinen Lizenzbedarf ermittelt."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-editionen-preise
translationKey: revenue-cloud-editions-pricing
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: licences
tags: [Revenue Cloud, Preise, Lizenzen, Billing, Make-or-Buy]
takeaways:
  - "Der größte Hebel ist die Zahl der Lizenzen. Gruppieren Sie Nutzer danach, was sie mit Angeboten tun, bevor Sie Editionen vergleichen."
  - "Ein Angebotsnutzer mit Sales Cloud Core und Revenue Cloud Advanced kostet zum Listenpreis 395 Euro im Monat."
  - "Contract Lifecycle Management, Dynamic Revenue Orchestration, Invoice Management und External User Support sind Add-ons."
  - "Revenue Cloud Billing hat keinen veröffentlichten Preis und verbraucht ein Billing Event pro 50 Dollar Rechnungsbetrag."
faq:
  - q: "Was kostet Salesforce Revenue Cloud?"
    a: "Laut Preisseite von Salesforce (Oktober 2026) kostet Revenue Cloud Growth 150 Euro und Revenue Cloud Advanced 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung. Revenue Cloud Billing gibt es nur auf Anfrage."
  - q: "Was ist der Unterschied zwischen Revenue Cloud Growth und Advanced?"
    a: "Growth umfasst Angebote mit Konfigurator, Auftragserfassung und Abonnements. Advanced ergänzt Verträge und Aufträge, Verbrauch und Rechnungsstellung sowie KI und Analytics."
  - q: "Ist Revenue Cloud in Sales Cloud enthalten?"
    a: "Nein. Die Preisseite sagt, dass Revenue Cloud ein kostenpflichtiges Zusatzprodukt ist, das zusätzlich zum Sales-Cloud-Abonnement gekauft wird."
  - q: "Was bedeutet Freemium-Zugang bei Dynamic Revenue Orchestration?"
    a: "Die Preisseite markiert Dynamic Revenue Orchestration und Invoice Management mit 'Freemium access available', sagt aber nicht, was enthalten ist. Lassen Sie sich das enthaltene Volumen schriftlich geben, bevor Sie damit planen."
  - q: "Wie wird Revenue Cloud Billing abgerechnet?"
    a: "Über Billing Events. Das Rate Sheet vom Februar 2026 zählt ein Billing Event pro 50 Dollar Rechnungsbetrag, ohne Steuern und mit Versandkosten. Der Preis pro Event ist nicht veröffentlicht."
draft: false
---

Revenue Cloud kostet in der Edition Growth 150 Euro und in der Edition Advanced 200 Euro pro Nutzer und Monat zum Listenpreis, jährlich abgerechnet, Stand Oktober 2026. Beides kommt zu einem Sales-Cloud-Abonnement hinzu. Growth umfasst Angebote mit Konfigurator, Auftragserfassung und Abonnements, Advanced ergänzt Verträge und Aufträge, Verbrauch und Rechnungsstellung sowie KI und Analytics. Mehrere Funktionen sind Add-ons, und Revenue Cloud Billing gibt es nur auf Anfrage, abgerechnet nach Rechnungsvolumen. Für die meisten Hersteller ist die größere Frage nicht Growth oder Advanced, sondern welche Nutzer überhaupt eine Revenue-Cloud-Lizenz brauchen.

## Was kosten Revenue Cloud Growth und Advanced?

Die [Preisseite von Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/), zuletzt geändert am 28. September 2026, nennt diese Listenpreise pro Nutzer und Monat bei jährlicher Abrechnung:

| Edition | EUR | USD | GBP | Enthält |
|---|---|---|---|---|
| Revenue Cloud Growth | 150 € | 150 $ | 120 £ | Angebote und Konfigurator, Auftragserfassung, Abonnements |
| Revenue Cloud Advanced | 200 € | 200 $ | 160 £ | Alles aus Growth plus Verträge und Aufträge, Verbrauch und Rechnungsstellung, KI und Analytics |

Drei Details derselben Seite sind für das Budget wichtig:

- **Sales Cloud kommt hinzu.** Die FAQ sagt, dass Revenue Cloud ein kostenpflichtiges Zusatzprodukt ist, das zusätzlich zu einem Sales-Cloud-Abonnement gekauft wird. Mit Sales Cloud Core zu 195 Euro pro Nutzer und Monat laut [Sales-Cloud-Preisseite](https://www.salesforce.com/eu/sales/pricing/) kostet ein Angebotsnutzer mit Core und Advanced zum Listenpreis 395 Euro im Monat.
- **Jahresvertrag.** Die Seite sagt, dass die Edition einen Jahresvertrag voraussetzt.
- **Nur zur Information.** Die Preise gelten "for information purposes only and subject to change". Entscheidend ist das Angebot.

Eine kostenlose Testversion gibt es nicht. Die FAQ verweist stattdessen auf praktische Workshops.

## Die Funktionsliste pro Edition gehört ins Angebot

Die Editionskarten auf der Preisseite nennen drei Funktionen für Growth und drei weitere für Advanced, wie in der Tabelle oben. Darunter steht eine Vergleichstabelle mit diesen Zeilen: Produktkatalog und Preisverwaltung, Produktkonfigurator, Preis und Angebot, Auftragsverwaltung, Abonnement- und Asset-Lebenszyklus, Advanced Approvals, Advanced Doc Gen, Usage Selling, Contract Lifecycle Management, Revenue Management Intelligence, Agentforce-Vorlagen, Dynamic Revenue Orchestration, Invoice Management und External User Support.

Welche Zeile in welcher Edition enthalten ist, konnte ich auf der Seite nicht zuverlässig lesen, weil die Markierungen im Seitentext nicht ankommen. Ich würde deshalb nicht mit meiner eigenen Lesart der Tabelle planen, sondern mir die Funktionsliste pro Edition mit dem Angebot von Salesforce geben lassen.

Für einen ersten Schnitt reichen die Editionskarten:

```pro-contra
pro: Growth kann reichen, wenn
- der Auftrag an SAP geht und die Rechnung in SAP FI bleibt
- Angebote mit konfigurierten Produkten gebraucht werden
- Serviceabonnements genügen
contra: Advanced ist der Ausgangspunkt, wenn
- Verträge in Salesforce laufen sollen
- verbrauchsabhängige Preise gebraucht werden
- Rechnungen in Salesforce laufen sollen
```

Welche Schritte bei SAP bleiben, behandelt [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/).

## Welche Add-ons gibt es?

Die Vergleichstabelle markiert vier Zeilen mit "Available for purchase":

| Add-on | Markiert in Spalte | Hinweis auf der Seite |
|---|---|---|
| Contract Lifecycle Management | Growth | Advanced enthält bereits Verträge und Aufträge |
| Dynamic Revenue Orchestration | Advanced | "Freemium access available" |
| Invoice Management | Advanced | "Freemium access available" |
| External User Support | Advanced | Keine weitere Beschreibung |

Dynamic Revenue Orchestration zerlegt einen Auftrag in Erfüllungsschritte, zum Beispiel einen Aufruf an SAP.

```hinweis offen
"Freemium access" ist auf der Seite nicht erklärt. Baut Ihr Design auf Dynamic Revenue Orchestration oder Invoice Management, lassen Sie sich schriftlich geben, was der freie Zugang abdeckt und ab welchem Volumen er kostet.
```

Auch External User Support ist nicht beschrieben. Ich würde fragen, ob es Händler oder Kunden abdeckt, die in einem Portal Angebote erstellen, denn das verändert den Lizenzplan für ein Händlernetz.

Für das Vertragsmanagement gibt es einen zweiten Anhaltspunkt. Die ältere [Billing-Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/billing-pricing/) von Salesforce, zuletzt geändert im Mai 2025, nennt Salesforce Contracts ab 50 Dollar pro Nutzer und Monat. Dieselbe Seite führt noch CPQ ab 75 Dollar, obwohl Salesforce laut [CPQ-Seite zum Verkaufsende](https://www.salesforce.com/sales/cpq/end-of-life/) keine CPQ-Lizenzen mehr an Neukunden verkauft. Prüfen Sie bei jeder Preisseite, die Sie intern zitieren, das Änderungsdatum.

## Billing wird nach Rechnungsbetrag abgerechnet

Revenue Cloud Billing ist ein eigenes Add-on mit dem Preis "Request a Quote". Laut Preisseite enthält es Usage Rating und Digital Wallet, die Rechnungs-Engine mit Dokumenterstellung und das Accounting Subledger, also ein Nebenbuch für Buchungen. Add-ons werden getrennt von ihren Voraussetzungsprodukten verkauft und brauchen einen Jahresvertrag.

Der Verbrauch wird in Billing Events gezählt. Das [Rate Sheet vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) setzt 0,02 Billing Events pro Dollar Gesamtrechnungsbetrag an, also ein Event pro 50 Dollar. Die Zwischensumme enthält Versand- und Bearbeitungskosten, Steuern nicht. Rechnungen in anderen Währungen werden zum durchschnittlichen Tageskurs in Dollar umgerechnet. Events müssen vor dem Vertragsende verbraucht werden, ein Übertrag ist nicht erlaubt.

Ein Beispiel als Annahme: Ein Hersteller stellt über Revenue Cloud Billing Rechnungen über 20 Millionen Dollar im Jahr. Das sind 400.000 Billing Events. Was ein Event kostet, ist nicht öffentlich, das Budget ergibt sich also erst aus dem Angebot. Wie Sie das Volumen schätzen und was Sie verhandeln sollten, steht in [Revenue Cloud Billing Kosten: Was Billing Events bedeuten](../revenue-cloud-billing-kosten/).

## Wie viele Revenue-Cloud-Lizenzen braucht ein Hersteller?

Die Edition bestimmt den Preis pro Nutzer. Die Lizenzprognose bestimmt die Zahl der Nutzer, und die wirkt stärker. Ich gruppiere Nutzer danach, was sie mit Angeboten tun:

1. **Nutzer, die Angebote erstellen und ändern**, etwa Innendienst und Projektvertrieb. Sie brauchen eindeutig eine Revenue-Cloud-Lizenz.
2. **Nutzer, die Angebote nur ansehen**, zum Beispiel an der Opportunity. Fragen Sie Salesforce schriftlich, ob Lesezugriff eine Revenue-Cloud-Lizenz braucht.
3. **Freigeber** von Rabatten und Margen. Dieselbe Frage.
4. **Produktmanagement und Pricing**, die Katalog, Regeln und Preisprozeduren pflegen. Klären Sie, welche Lizenz Admins und Pflegende brauchen.
5. **Händler und Kunden**, die selbst Angebote erstellen. Das ist eine Frage für External User Support oder eine Portallizenz.
6. **Finanzwesen**, das mit Rechnungen arbeitet. Das gehört zum Billing-Add-on.

Rechenbeispiel: Ein Maschinenbauer hat 80 Sales-Cloud-Nutzer. 35 davon erstellen Angebote, die anderen 45 arbeiten an Accounts und Opportunities und sehen Angebote gelegentlich an. 35 Nutzer auf Advanced kosten 35 × 200 Euro × 12 = 84.000 Euro im Jahr zum Listenpreis, auf Growth 63.000 Euro. Bekämen alle 80 Nutzer Advanced, wären es 192.000 Euro. Die Differenz von 108.000 Euro im Jahr gilt nur, wenn Lesezugriff ohne Revenue-Cloud-Lizenz funktioniert, und genau deshalb gehört diese Frage ins Angebot.

Ob Growth und Advanced in einer Org gemischt werden können, steht auf der Preisseite ebenfalls nicht. Braucht nur der Projektvertrieb Verträge und Verbrauchsabrechnung, wäre eine Mischung der günstigere Plan, also fragen Sie ausdrücklich danach. Wie ich eine solche Prognose allgemein aufbaue, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Erster Schritt: Lizenzbedarf für Leser und Freigeber schriftlich klären

Listenpreise sind ein Ausgangspunkt, und Salesforce stellt sein Editionsmodell gerade über mehrere Clouds um. Sales Cloud gibt es jetzt als Core, Advanced und Max, wie in [Salesforce-Editionen Core, Advanced, Max für Hersteller](../salesforce-editionen-core-advanced-max/) beschrieben. Vor der Unterschrift würde ich mir diese Punkte schriftlich geben lassen:

- die Funktionsliste pro Edition, Zeile für Zeile, wie sie für Ihren Vertrag gilt,
- ob reine Leser und Freigeber eine Revenue-Cloud-Lizenz brauchen,
- ob Growth und Advanced in einer Org gemischt werden können,
- was der Freemium-Zugang bei Dynamic Revenue Orchestration und Invoice Management umfasst,
- den Preis pro Billing Event und die Zahl der enthaltenen Events,
- eine Preisobergrenze für die Verlängerung.

Ob sich Revenue Cloud überhaupt lohnt, steht in [Revenue Cloud für Hersteller: Wann lohnt es sich?](../revenue-cloud-lohnt-sich-hersteller/), und das [Überblickskapitel der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) stellt die Preise neben die anderen Entscheidungen. Lizenzprognosen gehören zu meiner Arbeit in [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
