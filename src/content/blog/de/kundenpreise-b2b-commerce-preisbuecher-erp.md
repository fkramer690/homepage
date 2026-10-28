---
title: "Kundenpreise in B2B Commerce: Preisbücher oder ERP?"
description: "Wie Salesforce B2B Commerce Kundenpreise zeigt: Preisbücher, Preisstrategie, Limits und wann ein Live-Aufruf ans ERP über die Pricing Extension besser passt."
pubDate: 2026-10-28
lang: de
slug: kundenpreise-b2b-commerce-preisbuecher-erp
translationKey: commerce-customer-prices
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Kundenpreise, Preisbücher, SAP, ERP-Anbindung, Commerce Extensions]
takeaways:
  - "Preise in Salesforce B2B Commerce kommen aus Preisbüchern, die dem Store und Käufergruppen zugeordnet sind; eine Preisstrategie, Best Price oder Priority Price, entscheidet, welches gilt."
  - "Ein Store hat bis zu 5 Preisbücher, ein Preisbuch bis zu 350.000 Einträge, und ein Preisaufruf wertet nur die ersten 25 gültigen Preisbücher aus. Das letzte Limit ist hart."
  - "SAP-Konditionen mit Kundenpreisen, Gruppenrabatten und Zuschlägen passen selten eins zu eins in Preisbücher, die einen Preis pro Produkt und Buch halten."
  - "Die Extension Commerce_Domain_Pricing_Service ersetzt Preisbücher durch eigene Logik, etwa einen Live-Aufruf ans ERP. Der Preis stimmt dann, aber das ERP muss schnell antworten."
  - "Legen Sie schriftlich fest, welches System Preis-Master ist, bevor ein Käufer einen Preis sieht, und was gilt, wenn Shoppreis und Auftragspreis abweichen."
faq:
  - q: "Woher kommen Kundenpreise in Salesforce B2B Commerce?"
    a: "Im Standard aus Preisbüchern: dem Standardpreisbuch, Store-Preisbüchern und Preisbüchern je Käufergruppe. Hat ein Käufer mehrere, entscheidet die Preisstrategie: Best Price zeigt den niedrigsten Preis, Priority Price folgt der Priorität, die Sie je Käufergruppe setzen."
  - q: "Wie viele Preisbücher kann ein B2B-Store nutzen?"
    a: "Einem Store lassen sich 5 Preisbücher zuordnen, ein Preisbuch fasst bis zu 350.000 Einträge (weiches Limit). Pro Preisaufruf werden nur die ersten 25 aktiven Preisbücher in der Währung des Käufers ausgewertet; dieses Limit ist hart."
  - q: "Kann B2B Commerce Preise live aus SAP holen?"
    a: "Ja, über den Extension Point Commerce_Domain_Pricing_Service. Er nutzt im Standard Preisbücher und lässt sich durch Apex-Logik ersetzen, die das ERP aufruft. Für den Warenkorb gibt es einen eigenen Pricing Cart Calculator."
  - q: "Wie viele Preisbücher darf eine Käufergruppe haben?"
    a: "Die Limit-Seite von Salesforce nennt beide Werte: 50 in der Tabelle und 25 in einem Hinweis auf derselben Seite. Klären Sie die Zahl mit Salesforce, bevor Sie ein Preisbuch pro Käufer planen."
draft: false
---

Kundenpreise in Salesforce B2B Commerce kommen im Standard aus Preisbüchern. Store-Preisbücher und Preisbücher je Käufergruppe decken Listenpreise, Händlerstaffeln und Mengenstaffeln gut ab. Entstehen Ihre Händlerpreise dagegen aus SAP-Konditionen, mit Kundenpreisen, Gruppenrabatten, Zuschlägen und Gültigkeiten, haben Sie zwei Wege: die berechneten Nettopreise in Preisbücher replizieren oder das ERP über die Pricing Extension live fragen. Beides funktioniert. Welcher Weg passt, hängt davon ab, wie viele Preiskombinationen es gibt und wie schnell Ihr ERP antwortet. Legen Sie den Preis-Master schriftlich fest, bevor ein Käufer einen Preis sieht.

## Wie funktionieren Preisbücher im B2B-Store?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, nutzt dieselben Preisbuch-Objekte wie Sales Cloud. Jedes Produkt braucht einen Eintrag im Standardpreisbuch, bevor es in ein anderes Preisbuch kommt. Darüber ordnen Sie eigene Preisbücher dem Store oder Käufergruppen zu. Eine Käufergruppe (Buyer Group) ist eine Menge von Käuferkonten mit gleicher Sichtbarkeit und gleichen Preisen, etwa alle Gold-Händler in Deutschland. Laut [Salesforce-Hilfe zu Preisen in B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) bekommt ein neuer Store automatisch ein Standard-Preisbuch und ein Streichpreis-Preisbuch. Das Streichpreis-Preisbuch zeigt einen durchgestrichenen Vergleichspreis neben dem Preis des Käufers.

Hat ein Käufer Zugriff auf mehrere Preisbücher, braucht der Store eine Regel. Die [Salesforce-Hilfe zu Preisstrategien](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5) bietet zwei:

- **Best Price** zeigt den niedrigsten Preis aus allen Preisbüchern des Käufers.
- **Priority Price** folgt der Reihenfolge, die Sie je Käufergruppe festlegen. Je kleiner die Zahl, desto höher die Priorität.

Für Mengenrabatte gibt es Staffelpreise (Tiered Pricing). Das Preis-Datenmodell enthält dafür Price Adjustment Schedule und Price Adjustment Tier, und der LWR-Store hat eine Komponente Tiered Discounts, die die Staffel auf der Produktseite zeigt.

Die Salesforce-Hilfe nennt drei typische Muster: je Händlerstufe eine Käufergruppe, eine Entitlement Policy und ein Preisbuch; je Käufer ein Preisbuch und eine Käufergruppe, wenn Sie käuferindividuelle Preise wollen; und Käufergruppen je Produktgruppe, um Sichtbarkeit zu steuern. Mit dem ersten Muster würde ich anfangen.

## Welche Limits prägen das Preisdesign?

Die [Limits für Preisbuchdaten](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) entscheiden früh, ob Preisbücher für Sie realistisch sind:

| Limit | Wert | Art |
|---|---|---|
| Preisbücher je Store | 5 | hart |
| Einträge je Preisbuch | 350.000 | weich |
| Ausgewertete Preisbücher je Preisaufruf | 25 | hart |
| Käufergruppen je Preisbuch | 100 | weich |
| Preisbücher je Org | 300.000 | weich |
| Preisbucheinträge je Org | 50 Millionen | weich |
| Preisbücher je Käufergruppe | 50 oder 25 | unklar |

Am wichtigsten sind die 25 je Aufruf. Ausgewertet werden nur die ersten 25 gültigen Preisbücher, also aktiv und in der Währung des Käufers; alles darüber ignoriert der Store ohne Fehlermeldung. Ein Käufer in vielen Käufergruppen mit jeweils mehreren Preisbüchern kann so einen Preis sehen, den Sie nicht vorgesehen haben. Ein Käuferkonto kann im Standard bis zu 20 Käufergruppen angehören.

```hinweis offen
Die letzte Zeile ist ein Problem der Dokumentation. Dieselbe Salesforce-Seite nennt in der Tabelle 50 Preisbücher je Käufergruppe und in einem Hinweis 25. Hängt Ihr Design an dieser Zahl, holen Sie sich die Antwort von Salesforce schriftlich.
```

## Warum passen SAP-Konditionen selten eins zu eins in Preisbücher?

Ein Preisbucheintrag ist ein Preis für ein Produkt in einem Preisbuch, mit Währung und Aktiv-Kennzeichen. Die Preisfindung in SAP arbeitet anders. Die Konditionstechnik durchsucht kundenindividuelle Preise, Preislisten, Rabatte je Materialgruppe, Zuschläge und Staffeln, jeweils mit eigener Gültigkeit, und berechnet den Nettopreis zum Zeitpunkt des Auftrags.

Um das in Preisbücher zu bringen, müssen Sie das Ergebnis für jede Kombination vorab berechnen, die ein Käufer sehen kann. Bei vier Händlerstufen und stabiler Preisliste ist das einfach: vier Preisbücher, eine nächtliche Ladung. Bei Preisen, die je Kunde verhandelt sind, wächst das schnell, und jede Änderung in SAP braucht eine neue Ladung, bevor der Shop den richtigen Preis zeigt. Befristete Aktionen, Frachtzuschläge und Mindermengenzuschläge sind meist die Stellen, an denen die Replikation zuerst scheitert.

Das zweite Risiko ist leiser. Zeigt der Shop einen Preis aus einer Kopie und berechnet SAP beim Eingang des Auftrags einen anderen, muss jemand entscheiden, welcher gilt. Hat das vor dem Go-live niemand entschieden, landet diese Frage beim Innendienst, Auftrag für Auftrag. Dasselbe Risiko beschreibe ich für KI-Angebote in [KI-Angebote für Händler mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/).

## Wann sollte der Preis live aus dem ERP kommen?

B2B Commerce hat dafür Extension Points. Laut der [Liste verfügbarer Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) nutzt Commerce_Domain_Pricing_Service im Standard die Salesforce-Preisbücher, und Commerce_Domain_Pricing_CartCalculator berechnet die Preise für Warenkorb und Checkout auf Basis dieses Dienstes. Sie erweitern in Apex die Basisklasse [PricingService](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/PricingService.html). Sie hat zwei Methoden: processPrice für Produktpreise und processTransactionalPrice für Preise und Summen, die vom Katalogpreis ausgeht und dann Anpassungen anwendet.

Der [Leitfaden zu Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) zeigt ein Beispiel, das den Preis von einem externen Dienst holt, und empfiehlt ausdrücklich, super() aufzurufen, wenn Sie das Standardverhalten nur verändern. Ein Detail aus der Extension-Liste: Nutzt der Store Faster Add-to-Cart, braucht jedes Produkt trotz eigener Preislogik einen Eintrag in einem Store-Preisbuch.

Die Abwägung ist klar:

- **Live-Aufruf:** Der Käufer sieht den SAP-Nettopreis. Dafür müssen ERP und Middleware so schnell antworten, wie ein Käufer es auf einer Produktliste akzeptiert, und Sie brauchen eine Regel, was der Shop zeigt, wenn SAP nicht erreichbar ist.
- **Replizierte Preisbücher:** schnell und unabhängig vom ERP. Dafür sind die Preise so alt wie die letzte Ladung, und die Preislogik existiert zweimal.
- **Gemischt:** Preisbücher für Listen- und Staffelpreise auf Produktseiten, der Live-Aufruf dort, wo der Preis verbindlich wird. Die Dokumentation sagt nicht, welche Methode auf welcher Seite läuft. Diese Aufteilung würde ich deshalb in einem Prototyp beweisen, bevor ich mich festlege.

Eine dritte Option ist Advanced Pricing powered by Revenue Cloud, eine Preis-Engine innerhalb von Salesforce. Wann sich die zusätzliche Lizenz lohnt, steht in [Advanced Pricing im B2B-Shop](../advanced-pricing-b2b-shop-revenue-cloud/).

## Ein typisches Szenario, als Annahme

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren verkauft Ersatzteile an 600 Händler in 9 Ländern. SAP hält einen Listenpreis je Land, einen Rabatt je Händlerstufe und Materialgruppe und Kundenpreise für etwa 40 große Händler. Rund 25.000 Teile werden online verkauft.

Ich würde aufteilen. Für die rund 560 Händler mit Stufenrabatt berechnet ein nächtlicher Job die Nettopreise in je ein Preisbuch pro Land und Stufe; bei 9 Ländern und 3 Stufen sind das 27 Preisbücher mit höchstens 25.000 Einträgen, und jeder Käufer sieht genau eines davon. Für die 40 großen Händler mit Kundenpreisen fragt die Pricing Extension im Warenkorb live bei SAP. Fracht- und Mindermengenzuschläge kommen für alle im Checkout aus SAP. Der Auftrag, der zurück an SAP geht, trägt den Preis, den der Käufer gesehen hat, und SAP prüft ihn mit einer festgelegten Toleranz gegen das eigene Ergebnis.

```ablauf
sf: Store-Preisbücher, Pricing Extension, Warenkorb
erp: SAP-Preisfindung, SAP-Auftrag
SAP-Preisfindung --nächtliche Ladung--> Store-Preisbücher
Store-Preisbücher --560 Händler--> Warenkorb
SAP-Preisfindung --Live-Preis--> Pricing Extension
Pricing Extension --40 Händler--> Warenkorb
Warenkorb --Auftrag mit Preis--> SAP-Auftrag
```

Die Zahlen sind erfunden, um die Methode zu zeigen. Entscheidend ist, dass die Aufteilung der Preisfindung in SAP folgt und nicht dem, was der Shop technisch kann.

## Wo starten Sie?

Schreiben Sie vor dem Store-Design eine Seite zur Preis-Master-Entscheidung:

1. Welches System berechnet den Preis je Käufergruppe: SAP, Preisbücher oder Revenue Cloud?
2. Welcher Preis erscheint wo: Produktliste, Produktseite, Warenkorb, Auftragsbestätigung?
3. Wie alt darf ein replizierter Preis sein, und wer lädt ihn?
4. Was zeigt der Shop, wenn der Live-Aufruf scheitert?
5. Welcher Preis gilt, wenn Shop und ERP abweichen, und wer klärt das?

Diese Entscheidung gehört in dasselbe Dokument wie Ihre [Object Ownership Matrix](../object-ownership-matrix-salesforce/) und bestimmt die Schnittstellenliste zum ERP, wie in [B2B Commerce und SAP: Welche Daten fließen wohin?](../b2b-commerce-sap-datenfluesse/) beschrieben. Wie Preise, Angebote, Checkout und Nachbestellung zusammenspielen, behandelt das Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/). Den Entwurf der Schnittstelle selbst übernehme ich im Rahmen der [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Preisbücher reichen für Stufenpreise, SAP-Konditionen brauchen einen Live-Aufruf oder eine bewusste Replikation. Wenn Sie Ihre Preis-Master-Entscheidung besprechen möchten, [schreiben Sie mir](#contact).
