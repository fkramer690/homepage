---
title: "B2B-Checkout: Bestellnummer, Karte oder Rechnung?"
description: "Welche Zahlarten ein B2B-Shop auf Salesforce braucht, wenn Händler auf Rechnung kaufen: Bestellnummer, Karte, Dual Payment, Stripe und Kreditprüfung im ERP."
pubDate: 2026-10-28
lang: de
slug: b2b-checkout-bestellnummer-rechnung
translationKey: commerce-checkout-purchase-order
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Checkout, Bestellnummer, Zahlung, Kreditlimit, ERP]
takeaways:
  - "Eine Bestellnummer (Purchase Order) gilt im Shop als Zahlungsform, löst aber keine Zahlung aus. Die Nummer geht für die Rechnung ans ERP."
  - "Eine Bestellung geht nur ab, wenn der Warenkorb eine Zahlungsautorisierung oder eine Bestellnummer hat. Jeder Checkout endet in einem der beiden."
  - "Die Purchase-Order-Komponente braucht kein Payment Gateway. Dual Payment bietet Karte und Bestellnummer, Salesforce Payments läuft über Stripe."
  - "Zahlungen lassen sich nicht mit einer Commerce Extension anpassen. Eigene Zahlungslogik braucht einen Apex-Adapter oder eine eigene Komponente."
  - "Kreditlimit und Auftragssperre gehören ins ERP. Die validate-Methode der PlaceOrder-Extension fragt das ERP, bevor die Bestellung entsteht."
faq:
  - q: "Braucht ein B2B-Shop auf Salesforce ein Payment Gateway?"
    a: "Nicht, wenn alle Käufer auf Rechnung bestellen. Die Purchase-Order-Komponente ist für B2B-Shops gedacht, die nur Bestellnummern annehmen und kein Gateway brauchen. Ein Gateway wird erst nötig, wenn ein Teil der Käufer mit Karte zahlt."
  - q: "Was passiert mit der Bestellnummer in Salesforce B2B Commerce?"
    a: "Der Käufer gibt sie im Checkout ein. Salesforce verarbeitet dafür keine Zahlung; laut Entwicklerhandbuch nutzen nachgelagerte Systeme die Nummer für Rechnung und Zahlungsabwicklung, bei den meisten Herstellern also das ERP."
  - q: "Kann der Shop das Kreditlimit eines Händlers vor der Bestellung prüfen?"
    a: "Nicht im Standard. Der Extension Point PlaceOrder führt Warenkorbprüfungen aus, wenn der Käufer bestellt, und Sie überschreiben dessen validate-Methode mit eigener Logik, etwa einem Live-Aufruf ans ERP, der offenen Kredit und Auftragssperren prüft."
  - q: "Kann ich jeden Zahlungsanbieter mit B2B Commerce nutzen?"
    a: "Salesforce nennt drei Wege: Anbieterpakete auf dem AppExchange, die B2B-Shops unterstützen, Salesforce Payments mit Stripe oder ein eigenes Gateway. Ein eigenes serverseitiges Gateway braucht einen Apex-Adapter, weil sich Zahlungen nicht mit Extensions anpassen lassen."
draft: false
---

Ein B2B-Shop für Händler, die auf Rechnung kaufen, braucht zuerst die Bestellnummer als Zahlart und erst danach, wenn überhaupt, die Karte. Salesforce B2B Commerce bietet eine Purchase-Order-Komponente ohne Payment Gateway, eine Dual-Payment-Komponente für Karte und Bestellnummer und Salesforce Payments auf Basis von Stripe, das in B2B-Shops ebenfalls eine Bestellnummer anbieten kann. Eine Bestellnummer löst in Salesforce keine Zahlung aus, die Rechnung bleibt im ERP. Was der Shop ergänzen muss, ist die Prüfung, ob der Händler überhaupt bestellen darf, also Kreditlimit und Auftragssperre. Diese Antwort muss vor der Bestellung aus dem ERP kommen.

## Was heißt Bezahlen in einem B2B-Shop?

Die meisten Händler eines Herstellers zahlen nach Lieferung auf Rechnung, zu den Zahlungsbedingungen aus dem Händlervertrag. Der Shop kassiert also kein Geld. Er nimmt eine Bestellung an und eine Referenz, die der Einkauf des Händlers auf der Rechnung wiedererkennt: die Bestellnummer, im Englischen Purchase Order oder PO-Nummer.

Das Salesforce-Entwicklerhandbuch beschreibt genau das. Eine Purchase Order kann in einem B2B-Shop als Zahlungsform dienen, ist aber "not technically a payment". Purchase Orders "do not trigger payment flows out of the box", und die Nummer nutzen nachgelagerte Systeme für Rechnung und Zahlungsabwicklung ([Salesforce Developers, Zahlungskomponenten](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-component-options.html)).

Auf derselben Seite steht die Regel, die jedes Checkout-Design prägt: Hat der Warenkorb weder eine Zahlungsautorisierung noch eine Purchase Order, kann die Bestellung nicht abgeschickt werden. Jeder Käufer braucht also mindestens einen der beiden Wege zum Abschluss.

Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B". Die Checkout-Komponenten sind unter beiden Namen dieselben.

## Die Zahlungskomponenten von Salesforce B2B Commerce

Das Entwicklerhandbuch nennt für B2B-Shops diese Optionen, verfügbar in Enterprise, Unlimited und Developer Edition:

| Komponente | Was sie tut | Voraussetzung |
|---|---|---|
| Purchase Order | Für B2B-Shops, die nur Bestellnummern annehmen | Kein Gateway |
| Payment | Kartenzahlung über einen Drittanbieter | Serverseitiges Gateway |
| Dual Payment | Karte und Bestellnummer, nur für B2B | Serverseitiges Gateway für die Karte |
| Salesforce Payments | Mehrere Zahlarten, gespeicherte Zahlungsmittel optional, in B2B mit Bestellnummer | Händlerkonto in der Commerce-App |
| Express Checkout | Apple Pay, Google Pay, PayPal und Venmo | Salesforce Payments |
| Eigene Komponente | Clientseitige Komponente, die direkt mit dem Anbieter spricht | Eigenentwicklung |

Für das Gateway nennt die [Seite zu den Gateway-Optionen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-gateway-options.html) drei Wege: ein Anbieterpaket vom AppExchange, Salesforce Payments als native Stripe-Integration oder ein eigenes Gateway. Bei AppExchange-Paketen sollen Sie laut Salesforce prüfen, ob das Paket B2B-Shops unterstützt. Ein eigenes serverseitiges Gateway braucht einen Apex-Adapter.

```vertiefung Für Entwickler
titel: Wo landet eigene Zahlungslogik?
Das Extension-Framework, das Preise, Bestand, Steuer, Versand und Auftragserzeugung abdeckt, gilt nicht für Zahlungen: "Currently, payments can't be customized with an extension" ([Salesforce Developers, Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html)). Sonderregeln für Zahlungen landen deshalb im Apex-Adapter oder in einer eigenen Komponente, und beides ist Code, den Ihr Team über jedes Release hinweg verantwortet.
```

Im Flow-basierten Checkout wählen Käufer auf der Bestellübersicht zwischen Bestellnummer und Karte. Wer die Bestellnummer wählt, gibt PO-Nummer und Rechnungsadresse ein ([Salesforce Developers, Purchase Order oder Kreditkarte](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-checkout-choose-po-or-cc.html)).

## Wann brauchen Händler überhaupt eine Karte?

Meine Sicht: In einem Ersatzteilshop eines Herstellers ist die Karte die Ausnahme. Händler mit Debitorenkonto im ERP haben schon Zahlungsbedingungen und tauschen diese nicht gegen einen Webshop. Drei Fälle sehe ich, in denen eine Karte sinnvoll ist:

- **Neue Käufer**, die noch kein Debitorenkonto und keine Bonitätsprüfung haben und heute bestellen wollen.
- **Einmalkäufer**, etwa kleine Werkstätten, die zweimal im Jahr ein Teil bestellen.
- **Käufer ohne Kreditrahmen**, deren Aufträge die Buchhaltung nur gegen sofortige Zahlung annimmt.

Jede Kartenzahlung bringt Arbeit, die die Bestellnummer nicht hat. Jemand muss die Zahlung im ERP gegen die Rechnung buchen, und jemand muss Erstattungen und Rückbuchungen bearbeiten. Salesforce schreibt, dass Salesforce Payments und manche AppExchange-Anbieter mit Order Management "may be interoperable" sind; das ist ein Hinweis zum Prüfen, keine Zusage für Ihr ERP.

Ich empfehle daher die Purchase-Order-Komponente, wenn der Shop nur für bekannte Händler gedacht ist, und Dual Payment oder Salesforce Payments mit Bestellnummer, wenn eine klar umrissene Gruppe per Karte zahlen soll. Wer mit der Karte anfängt, weil Endkundenshops das so machen, holt sich Gateway, Gebühren und einen Abstimmungsprozess für Bestellungen, die ohnehin auf Rechnung gekommen wären.

## Kreditlimit und Auftragssperre prüft die PlaceOrder-Extension

Kreditlimit, offene Posten und Auftragssperren liegen im ERP, bei SAP zum Beispiel im Kreditmanagement. Der Shop kennt davon nichts. Ohne Prüfung kann ein gesperrter Händler eine Bestellung abschicken, die das ERP später ablehnt, und der Innendienst muss anrufen und erklären.

Der Ort für die Prüfung ist der PlaceOrder-Service, Extension Point `Commerce_Domain_Checkout_PlaceOrder`. Laut [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) führt er Warenkorbprüfungen aus, wenn ein Käufer bestellt, als Teil der Place Order Action API. Für eigene Logik erweitern Sie die Apex-Basisklasse und überschreiben die Methode `validate`. Darin fragt ein Live-Aufruf das ERP zwei Dinge: Ist das Konto gesperrt, und passt die Bestellsumme in den offenen Kreditrahmen? Wenn nicht, entsteht keine Bestellung, und der Käufer sieht einen Hinweis.

```ablauf
sf: Checkout, validate-Prüfung, Order Summary
erp: Kreditprüfung, Kundenauftrag, Rechnung
Checkout --Bestellnummer--> validate-Prüfung
validate-Prüfung --Live-Aufruf--> Kreditprüfung
Kreditprüfung ..Antwort..> validate-Prüfung
validate-Prüfung --> Order Summary
Order Summary --Übergabe--> Kundenauftrag
Kundenauftrag --> Rechnung
```

Drei Entscheidungen gehören in die Spezifikation:

1. **Was der Käufer sieht.** "Bitte wenden Sie sich an Ihren Ansprechpartner im Vertrieb" reicht; das Kreditlimit selbst sollte der Einkäufer eines Händlers in der Regel nicht im Shop lesen.
2. **Was bei Zeitüberschreitung passiert.** Antwortet das ERP nicht rechtzeitig, sperrt der Shop die Bestellung oder nimmt sie an. Prüft Ihr ERP den Kredit beim Anlegen des Kundenauftrags ohnehin noch einmal, ist Annehmen die freundlichere Wahl.
3. **Kartenbestellungen.** Eine autorisierte Kartenzahlung braucht keine Kreditprüfung. Die validate-Logik muss wissen, wie der Käufer zahlt.

Ich würde Kreditlimits nicht nachts nach Salesforce kopieren, um den Live-Aufruf zu sparen. Eine Kopie von gestern Abend ist genau dann falsch, wenn es darauf ankommt: bei dem Händler, der heute Morgen drei große Bestellungen abgeschickt hat.

## Rechenbeispiel: Pumpenhersteller mit 300 Händlern

Ein Pumpenhersteller verkauft Ersatzteile über 300 Händler in Deutschland, Österreich und der Schweiz. Alle Händler haben ein Debitorenkonto in SAP und zahlen innerhalb von 30 Tagen. Dazu bestellen rund 50 kleine Servicewerkstätten pro Jahr ein- oder zweimal und haben kein Debitorenkonto.

Hier würde ich Salesforce Payments oder Dual Payment wählen, mit Bestellnummer für die Käufergruppe der Händler und Karte für die Werkstätten. Jede Bestellung auf Rechnung läuft durch die validate-Prüfung gegen SAP. Kartenbestellungen überspringen die Kreditprüfung, ihre Zahlung muss aber in die Buchhaltung in SAP, und das ist eine Schnittstelle mehr. Vor der Entscheidung würde ich die Buchhaltung fragen, welche Händler Rechnungen ohne eigene Bestellnummer zurückweisen; für diese kann die validate-Methode auch ein leeres Bestellnummernfeld ablehnen.

Sind es am Ende weniger Werkstätten als gedacht, ist die einfachere Alternative ein Shop nur mit Purchase-Order-Komponente und ein Vertriebsprozess, der vor der ersten Bestellung ein Debitorenkonto anlegt.

## Was passiert nach dem Abschicken der Bestellung?

Eine Bestellung im Shop erzeugt in Salesforce eine Order Summary. Order Summaries, die B2B Commerce selbst anlegt, haben den Lebenszyklustyp unmanaged, solche aus Salesforce Order Management sind managed. Bei unmanaged gilt: Änderungen im externen System "must be reflected in Salesforce" ([Salesforce Developers, managed und unmanaged Order Summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html)). Die Bestellung mit Bestellnummer, Rechnungsadresse und Zahlungsinformation geht ans ERP, das den Kundenauftrag und später die Rechnung erzeugt.

Wem der Auftrag ab dann gehört, beschreibe ich in [Shop-Bestellungen ins ERP](../shop-bestellungen-erp-auftrag/), welche Daten zwischen Shop und SAP fließen, in [B2B Commerce und SAP](../b2b-commerce-sap-datenfluesse/). Wie Händler mit alten Bestellungen und Vorlagen schneller zum Checkout kommen, steht in [Nachbestellen im B2B-Shop](../nachbestellen-b2b-shop-vorlagen/).

## Erster Schritt: bei der Buchhaltung fragen, wie Händler zahlen

Fangen Sie bei der Buchhaltung an, vor dem Shop-Design. Fragen Sie, wie jede Käufergruppe heute zahlt, welches System Kreditlimits und Auftragssperren führt und wie schnell es einen Live-Aufruf beantwortet. Wählen Sie danach die Komponente und schreiben Sie die validate-Logik mit ihrem Verhalten bei Zeitüberschreitung auf. Das Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) stellt den Checkout neben die Entscheidungen zu Preisen und Nachbestellung, und die Schnittstellenarbeit hinter der Kreditprüfung gehört zu [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
