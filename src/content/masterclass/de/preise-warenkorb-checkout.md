---
title: "B2B Commerce: Preise, Warenkorb und Checkout"
description: "Kundenpreise aus Preisbüchern oder dem ERP, Advanced Pricing, Angebotsanfrage, Checkout mit Bestellnummer und Nachbestellen im Salesforce-B2B-Shop."
lang: de
slug: preise-warenkorb-checkout
course: b2b-commerce
translationKey: commerce-03
chapter: 3
pubDate: 2026-10-28
short: "Preise, Warenkorb, Checkout"
summary: "Kundenpreise, Angebotsanfrage, Bestellnummer statt Karte und schnelles Nachbestellen im B2B-Shop."
takeaways:
  - "Preisbücher mit Best Price oder Priority Price decken Listenpreise und Händlerstufen ab. SAP-Konditionen brauchen einen Live-Aufruf ans ERP oder Advanced Pricing aus Revenue Cloud."
  - "Ein Preisaufruf im B2B-Store wertet nur die ersten 25 gültigen Preisbücher aus; alles darüber ignoriert der Store ohne Fehlermeldung."
  - "Advanced Pricing setzt Commerce Growth oder Advanced plus Revenue Cloud Advanced voraus und lohnt sich, wenn der Vertrieb seine Angebote schon in Revenue Cloud rechnet."
  - "Händler zahlen per Bestellnummer, die in Salesforce keine Zahlung auslöst. Kreditlimit und Auftragssperre prüft der Shop vor der Bestellung live im ERP."
  - "Das Volumen kommt über Nachbestellungen: alte Bestellung in den Warenkorb, Bestellvorlagen, CSV-Import. Ein Warenkorb fasst meist 500 Positionen, mit Large Cart 2.000."
articles: [commerce-customer-prices, commerce-advanced-pricing-revenue-cloud, commerce-request-for-quote, commerce-checkout-purchase-order, commerce-reorder-order-templates, partner-sales-assistant-dealer-quotes]
faq:
  - q: "Kann Salesforce B2B Commerce Händlerpreise direkt aus SAP zeigen?"
    a: "Ja, über den Extension Point Commerce_Domain_Pricing_Service. Er nutzt im Standard Preisbücher und lässt sich durch Apex-Logik ersetzen, die SAP live fragt. Dann muss SAP schnell antworten, und Sie brauchen eine Regel für den Fall, dass es nicht erreichbar ist."
  - q: "Brauche ich Revenue Cloud für einen B2B-Shop?"
    a: "Nicht für Listen- und Stufenpreise, die decken Preisbücher ab. Revenue Cloud Advanced kommt dazu, wenn Sie Pricing Procedures, Vertragspreise aus Salesforce, konfigurierbare Bundles oder Request for Quote wollen. Die Salesforce-Hilfe nennt Advanced Pricing als Voraussetzung für Request for Quote."
  - q: "Braucht ein B2B-Shop ein Payment Gateway?"
    a: "Nicht, wenn alle Käufer auf Rechnung bestellen. Die Purchase-Order-Komponente kommt ohne Gateway aus. Ein Gateway brauchen Sie erst, wenn eine Gruppe von Käufern mit Karte zahlt, etwa über Dual Payment oder Salesforce Payments mit Stripe."
  - q: "Wie bestellen Händler am schnellsten nach?"
    a: "Mit der passenden Funktion für ihr Muster: Add Order to Cart für eine Wiederholung der letzten Bestellung, Bestellvorlagen für feste Körbe und CSV- oder JSON-Import für lange Listen aus dem eigenen System. Gemeinsame Warenkörbe für Freigaben im Team sind für Januar 2027 angekündigt."
draft: false
---

Ein B2B-Shop auf Salesforce zeigt Kundenpreise im Standard aus Preisbüchern. Das reicht für Listenpreise und Händlerstufen. Entstehen Ihre Preise aus SAP-Konditionen oder Verträgen, brauchen Sie einen Live-Aufruf ans ERP über die Pricing Extension oder Advanced Pricing aus Revenue Cloud, das eine zweite Lizenz kostet. Große oder ungewöhnliche Mengen laufen über Request for Quote. Im Checkout zahlen Händler mit Bestellnummer, und der Shop fragt vorher das ERP nach Kreditlimit und Auftragssperre. Den größten Hebel hat das Nachbestellen. Die wichtigste Entscheidung des Kapitels ist trotzdem eine schriftliche: welches System Preis-Master ist.

## Woher kommen die Preise im B2B-Store?

Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen auch als "Agentforce Commerce for B2B" vermarktet, nutzt dieselben Preisbuch-Objekte wie Sales Cloud. Laut [Salesforce-Hilfe zu Preisen in B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) bekommt jeder neue Store automatisch ein Standard-Preisbuch und ein Streichpreis-Preisbuch, das einen durchgestrichenen Vergleichspreis zeigt. Weitere Preisbücher ordnen Sie dem Store oder Käufergruppen zu. Wie Käufergruppen und Sichtbarkeit zusammenhängen, steht in [Kapitel 2](../katalog-suche-sichtbarkeit/).

Hat ein Käufer Zugriff auf mehrere Preisbücher, entscheidet die [Preisstrategie](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5):

- **Best Price** zeigt den niedrigsten Preis aus allen Preisbüchern des Käufers.
- **Priority Price** folgt der Reihenfolge, die Sie je Käufergruppe festlegen; die kleinere Zahl hat Vorrang.

Ich würde mit Priority Price anfangen, wenn Händler in mehreren Käufergruppen stecken, etwa Land und Stufe. Best Price belohnt jede Überschneidung, die beim Datenladen versehentlich entsteht.

Für Mengenstaffeln enthält das Preis-Datenmodell Price Adjustment Schedule und Price Adjustment Tier. Tiered Pricing steht zugleich auf der Liste der Revenue-Management-Funktionen. Welche Variante Ihre Staffeln abdeckt, prüfen Sie im Prototyp, bevor Sie Lizenzen kaufen.

Die [Limits für Preisbücher](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) prägen das Design früh:

| Limit | Wert |
|---|---|
| Preisbücher je Store | 5 |
| Einträge je Preisbuch | 350.000 (weich) |
| Ausgewertete Preisbücher je Preisaufruf | 25 (hart) |
| Käufergruppen je Preisbuch | 100 (weich) |
| Preisbücher je Käufergruppe | 50 in der Tabelle, 25 im Hinweis derselben Seite |

Die 25 je Aufruf sind das Limit, das in Projekten wehtun kann: Preisbücher darüber fließen nicht in die Preisfindung ein, ohne Fehlermeldung. Die widersprüchliche Angabe je Käufergruppe sollten Sie sich von Salesforce schriftlich klären lassen, wenn Ihr Design daran hängt. Details und Muster stehen in [Kundenpreise in B2B Commerce](../../../blog/kundenpreise-b2b-commerce-preisbuecher-erp/).

## Preisbücher kopieren oder das ERP live fragen?

Ein Preisbucheintrag hält einen Preis für ein Produkt in einem Preisbuch. Die Konditionstechnik in SAP berechnet den Nettopreis dagegen zum Zeitpunkt des Auftrags aus Kundenpreisen, Rabatten je Materialgruppe, Zuschlägen und Gültigkeiten. Für den Shop gibt es zwei Wege:

- **Replizieren:** Ein Job berechnet die Nettopreise vorab und lädt sie in Preisbücher. Der Shop ist schnell und unabhängig vom ERP, die Preise sind so alt wie die letzte Ladung, und die Preislogik existiert zweimal.
- **Live fragen:** Laut [Liste der Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) nutzt `Commerce_Domain_Pricing_Service` im Standard Preisbücher, und `Commerce_Domain_Pricing_CartCalculator` rechnet Warenkorb und Checkout auf Basis dieses Dienstes. Ersetzen Sie den Dienst durch Apex, das SAP aufruft, sieht der Käufer den echten Nettopreis. Dafür muss SAP so schnell antworten, wie ein Käufer auf einer Produktliste wartet.

Bei vier Händlerstufen und stabiler Preisliste reichen vier Preisbücher und eine nächtliche Ladung. Bei Preisen, die je Kunde verhandelt sind, würde ich SAP live fragen oder aufteilen: Preisbücher für die breite Masse, Live-Aufruf für die Schlüsselkunden. Ein Detail aus der Extension-Liste: Nutzt der Store Faster Add-to-Cart, braucht jedes Produkt trotzdem einen Eintrag in einem Store-Preisbuch.

Egal welcher Weg, eine Frage muss vor dem Go-live beantwortet sein: Welcher Preis gilt, wenn der Shop einen anderen zeigt als den, den SAP beim Auftragseingang berechnet? Ohne Regel landet sie beim Innendienst, Auftrag für Auftrag. Dasselbe Risiko beschreibe ich für KI-Angebote in [KI-Angebote für Händler mit dem Partner Sales Assistant](../../../blog/ki-angebote-haendler-partner-sales-assistant/). Welche Schnittstellen daraus folgen, behandelt [Kapitel 4](../erp-integration-bestand-auftraege/).

## Wann braucht der Shop Advanced Pricing aus Revenue Cloud?

Die dritte Option ist eine Preis-Engine in Salesforce. Die [Salesforce-Hilfe zu Agentforce Revenue Management for B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) nennt als Voraussetzung eine Lizenz Commerce Growth oder Commerce Advanced zusammen mit Revenue Cloud Advanced, gekauft über den Account Executive. Dazu gehören komplexe Preisstrategien mit Pricing Procedures, Staffelpreise, konfigurierbare Bundles, Request for Quote, Qualification Rules für die Sichtbarkeit und Abonnements. Vertragspreise für B2B-Stores haben in der Hilfe einen eigenen Artikel.

Zum Budget: Die B2B-Editionen stehen auf "Contact for Pricing", die [Preisseite von Revenue Cloud](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) nennt für Revenue Cloud Advanced 200 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung. Wie viele dieser Nutzerlizenzen ein Store mit externen Käufern braucht, steht auf keiner der beiden Seiten. Diese Frage gehört schriftlich an Salesforce, bevor Sie einen Business Case rechnen.

Meine Regel: Advanced Pricing lohnt sich, wenn der Vertrieb seine Angebote schon in Revenue Cloud rechnet, wenn Vertragspreise in Salesforce verhandelt werden oder wenn Sie Request for Quote brauchen. Berechnet SAP jeden Kundenpreis und soll das so bleiben, bauen Sie mit Revenue Cloud eine zweite Preis-Engine, die mit SAP übereinstimmen muss. Dann ist der Live-Aufruf einfacher. Die Abwägung im Detail steht in [Advanced Pricing im B2B-Shop](../../../blog/advanced-pricing-b2b-shop-revenue-cloud/). Für Rahmenverträge mit Mengen und Laufzeit, die eher den Absatz planen als den Shoppreis setzen, ist Manufacturing Cloud zuständig; das behandelt das Kapitel [Rahmenverträge und Prognosen](../../manufacturing-cloud/rahmenvertraege-und-prognosen/).

## Wie wird aus einer Anfrage ein Angebot und daraus eine Bestellung?

Händler fragen nach einem Preis für 200 Stück statt 5 oder für ein Projekt mit Liefertermin. Heute ist das eine E-Mail mit Excel-Liste. Mit Request for Quote senden angemeldete Käufer den Warenkorb als Angebotsanfrage, und der Innendienst bearbeitet das Angebot in Sales Cloud oder Agentforce Revenue Management. Salesforce nennt RFQ im [Beitrag vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) "already generally available". Im selben Beitrag stehen Quote to Cart und Round-Trip Quoting: Ein freigegebenes Angebot kommt als Warenkorb zum Käufer zurück, der es im Shop bestellt.

Für eigene Komponenten gibt es die Apex-Klasse [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm): getQuotes und getQuoteDetail ab API 66.0, createQuoteFromProduct und updateQuote ab API 67.0. Mit updateQuote verhandelt der Käufer ein freigegebenes Angebot nach oder lehnt es ab.

Bei der Lizenz lesen sich die Quellen unterschiedlich. Die Hilfe nennt Advanced Pricing als Voraussetzung für RFQ, die Apex-Referenz unterstützt einfache Produkte bei createQuoteFromProduct auch mit einer reinen B2B-Commerce-Lizenz. Holen Sie die Antwort für Ihre Produkte schriftlich ein.

Wichtiger als die Technik ist der Innendienst. Ein Käufer, der drei Tage auf ein Angebot aus dem Shop wartet, schickt die nächste Anfrage wieder per E-Mail. Antwortzeit, Zuständigkeit je Queue und Rabattgrenzen gehören vor dem Go-live auf Papier. Den ganzen Kreislauf beschreibe ich in [Request for Quote im B2B-Shop](../../../blog/request-for-quote-b2b-shop-angebot/).

## Checkout auf Rechnung: Bestellnummer statt Karte

Händler eines Herstellers zahlen meist auf Rechnung. Das Salesforce-Entwicklerhandbuch zu [Zahlungskomponenten](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-component-options.html) beschreibt eine Purchase Order als Zahlungsform, die "not technically a payment" ist und keinen Zahlungsvorgang auslöst; die Nummer nutzt das ERP für die Rechnung. Ohne Zahlungsautorisierung oder Bestellnummer lässt sich keine Bestellung abschicken.

Die Optionen für B2B-Stores:

- **Purchase Order:** nur Bestellnummern, kein Payment Gateway.
- **Dual Payment:** Karte und Bestellnummer, nur für B2B, mit serverseitigem Gateway für die Karte.
- **Salesforce Payments:** native Stripe-Integration, die in B2B-Stores auch eine Bestellnummer anbieten kann.
- **Eigene Komponente** oder ein eigenes serverseitiges Gateway mit Apex-Adapter.

Zahlungen lassen sich laut [Extension-Leitfaden](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) nicht mit Extensions anpassen. Sonderregeln für Zahlungen sind also eigener Code, den Ihr Team über jedes Release trägt.

Was der Standard nicht kann, ist die Prüfung, ob ein Händler überhaupt bestellen darf. Kreditlimit und Auftragssperre liegen im ERP. Der Ort dafür ist `Commerce_Domain_Checkout_PlaceOrder`: Er führt Warenkorbprüfungen aus, wenn der Käufer bestellt, und Sie überschreiben die Methode `validate` mit einem Live-Aufruf ans ERP. Entscheiden Sie dabei, was bei einer Zeitüberschreitung passiert und was der Käufer bei einer Sperre liest. Kreditlimits nachts nach Salesforce zu kopieren halte ich für falsch: Die Kopie stimmt genau dann nicht, wenn ein Händler heute Morgen drei große Bestellungen abgeschickt hat. Mehr dazu in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../../../blog/b2b-checkout-bestellnummer-rechnung/).

## Nachbestellen: Wo kommt das Volumen her?

Die meisten Ersatzteile und Verbrauchsmaterialien hat ein Händler schon einmal bestellt. Muss er jedes Teil neu suchen, geht er zurück zum Telefon. Salesforce bietet dafür mehrere Wege:

| Weg | Stand Oktober 2026 |
|---|---|
| Alte Bestellung in den Warenkorb ([Add Order to Cart](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html)) | verfügbar |
| Bestellvorlagen für Käufer und Vertrieb | laut [Innovationsseite](https://www.salesforce.com/de/commerce/innovations/) "AV Sept. 26" |
| Warenkorb als CSV oder JSON importieren und exportieren | [Release Juli 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) |
| Mehrere Nutzer bearbeiten einen Warenkorb live | "AV Jan. 27" |
| Reorder Portal für Vertriebsteams in Sales Cloud | verfügbar, Agentforce-Commerce-Lizenz nötig |

Add Order to Cart arbeitet mit Order Summaries in Salesforce. Eine Telefonbestellung, die nur in SAP existiert, kann der Händler deshalb nicht aus der Shop-Historie nachbestellen, solange Sie solche Aufträge nicht nach Salesforce holen.

Die [Warenkorblimits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-cart-limits.html): Die meisten Shops begrenzen einen Warenkorb auf 500 Positionen, mit Large-Cart-Unterstützung auf 2.000. Ein Nutzer hat bis zu 100 Warenkörbe, einen aktiven und 99 weitere. Prüfen Sie vor dem Versprechen "Laden Sie Ihre ganze Liste hoch", wie lang die längsten Bestellungen im ERP wirklich sind.

Das [Reorder Portal](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal) ist die schlanke Variante: Vertriebsmitarbeiter laden Käufer ein, die dann ihre früheren Bestellungen wiederholen. Für die Anbindung an Sales Cloud braucht es eine Agentforce-Commerce-Lizenz und eine aktivierte Digital Experience. Es passt, wenn kein Katalogprojekt geplant ist. Welche Funktion zu welchem Bestellmuster passt, steht in [Nachbestellen im B2B-Shop](../../../blog/nachbestellen-b2b-shop-vorlagen/).

## Ein typisches Szenario, als Annahme

Ein Hersteller von Kompressoren verkauft Ersatzteile an 600 Händler in 9 Ländern. SAP hält einen Listenpreis je Land, einen Rabatt je Händlerstufe und Kundenpreise für 40 große Händler. Alle Händler haben ein Debitorenkonto. Der Vertrieb kalkuliert Maschinen in SAP, Revenue Cloud gibt es nicht.

So würde ich entscheiden:

1. **Preise:** 27 Preisbücher für 9 Länder und 3 Stufen, nachts aus SAP berechnet; jeder Händler sieht genau eines. Die 40 großen Händler bekommen ihren Preis über die Pricing Extension live aus SAP. Kein Advanced Pricing, weil die Preislogik in SAP bleibt.
2. **Angebote:** RFQ erst in einer zweiten Stufe, wenn die Lizenzfrage geklärt ist; bis dahin geht Projektgeschäft wie heute an den Innendienst.
3. **Checkout:** nur Purchase-Order-Komponente, Kreditprüfung in `validate` gegen SAP. Bei Zeitüberschreitung nimmt der Shop die Bestellung an, weil SAP den Kredit beim Anlegen des Kundenauftrags ohnehin prüft.
4. **Nachbestellen:** Add Order to Cart und Bestellvorlagen für alle, CSV-Import für die großen Händler.

Die Zahlen sind erfunden, um die Methode zu zeigen. Ändern Sie eine Annahme, etwa einen Vertrieb, der schon in Revenue Cloud kalkuliert, kippt Punkt 1 zugunsten von Advanced Pricing.

## Wo fangen Sie an?

Schreiben Sie eine Seite zur Preis-Master-Entscheidung, bevor jemand den Store gestaltet:

1. Welches System berechnet den Preis je Käufergruppe: SAP, Preisbücher oder Revenue Cloud?
2. Welcher Preis erscheint wo: Produktliste, Warenkorb, Auftragsbestätigung?
3. Was zeigt der Shop, wenn der Live-Aufruf scheitert?
4. Welcher Preis gilt, wenn Shop und ERP abweichen, und wer klärt das?
5. Welche Käufergruppen zahlen mit Bestellnummer, welche mit Karte, und wer prüft den Kredit?

Diese Seite gehört neben Ihre [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/) und bestimmt die Schnittstellenliste für [Kapitel 4](../erp-integration-bestand-auftraege/). Den Entwurf der Preis- und Kreditaufrufe übernehme ich im Rahmen der [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/), die Lizenzfrage zu Revenue Cloud unter [Make-or-Buy und Lizenzen](../../../leistungen/make-or-buy-lizenzen/). Alle Kapitel finden Sie auf der [Übersichtsseite](../).

Ein B2B-Shop verkauft nur dann, wenn der Händler seinen Preis sieht, auf Rechnung bestellt und in einer Minute nachbestellt. Wenn Sie diese Entscheidungen für Ihren Shop klären möchten, [schreiben Sie mir](#contact).
