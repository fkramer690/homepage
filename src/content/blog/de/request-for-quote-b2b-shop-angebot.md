---
title: "Request for Quote im B2B-Shop: vom Warenkorb zum Angebot"
description: "Wie Käufer in Salesforce B2B Commerce aus dem Warenkorb ein Angebot anfragen, wie das Angebot als Warenkorb zurückkommt und was der Innendienst regeln muss."
pubDate: 2026-10-28
lang: de
slug: request-for-quote-b2b-shop-angebot
translationKey: commerce-request-for-quote
topic: commerce
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Angebotsanfrage, Request for Quote, Revenue Cloud, Innendienst]
takeaways:
  - "Angemeldete Käufer senden ihren Warenkorb oder ein einzelnes Produkt als Angebotsanfrage. Salesforce nennt die Funktion allgemein verfügbar."
  - "Angebote bearbeitet der Innendienst in Sales Cloud oder Revenue Management. Die Hilfe nennt Advanced Pricing powered by Revenue Cloud als Voraussetzung."
  - "Quote to Cart und Round-Trip Quoting, im Juni 2026 angekündigt, schicken das verhandelte Angebot als Warenkorb zum Bestellen an den Käufer zurück."
  - "ConnectApi.CommerceQuotes listet Angebote, erzeugt eines von der Produktseite und lässt Käufer ein freigegebenes Angebot nachverhandeln oder ablehnen."
  - "Die Funktion trägt nur, wenn der Innendienst Anfragen in einer festen Zeit beantwortet; sonst gehen Käufer zurück zu E-Mail und Telefon."
faq:
  - q: "Was ist Request for Quote in Salesforce B2B Commerce?"
    a: "Eine Store-Funktion, mit der Käufer für komplexe oder große Bestellungen direkt aus dem Warenkorb ein Angebot anfragen, oder für ein einzelnes Produkt von der Produktseite. Aus der Anfrage wird ein Angebot, das der Innendienst in Sales Cloud oder Agentforce Revenue Management bearbeitet."
  - q: "Braucht Request for Quote Revenue Cloud?"
    a: "Die Salesforce-Hilfe nennt Advanced Pricing for Commerce Powered by Revenue Cloud als Voraussetzung für Request for Quote. Die Apex-Referenz zum Angebot aus der Produktseite unterstützt einfache Produkte mit einer B2B-Commerce-Lizenz und Bundles nur mit Revenue Cloud. Klären Sie Ihren Fall mit Salesforce."
  - q: "Wie kommt ein freigegebenes Angebot zurück zum Käufer?"
    a: "Über Quote to Cart, das Salesforce im Juni 2026 angekündigt hat: Ist ein Angebot verhandelt und freigegeben, teilt der Verkäufer es als Warenkorb, und der Käufer prüft und bestellt es im Shop."
  - q: "Kann ein Käufer ein Angebot im Shop ablehnen oder nachverhandeln?"
    a: "Ja. Laut Apex-Referenz (API 67.0) klickt der Käufer auf der Seite My Quotes bei einem freigegebenen Angebot auf Renegotiate oder Decline. Renegotiate setzt das Angebot mit seinen Kommentaren auf Draft zurück, Decline auf Denied."
draft: false
---

In Salesforce B2B Commerce kann ein angemeldeter Käufer seinen Warenkorb als Angebotsanfrage senden oder für ein einzelnes Produkt von der Produktseite ein Angebot anfragen. Die Anfrage landet als Angebot, das Ihr Innendienst in Sales Cloud oder Agentforce Revenue Management bearbeitet. Ist das Angebot verhandelt und freigegeben, schickt Quote to Cart, im Juni 2026 angekündigt, es als Warenkorb zum Bestellen an den Käufer zurück. Die Salesforce-Hilfe nennt Advanced Pricing powered by Revenue Cloud als Voraussetzung. Die Technik ist trotzdem der kleinere Teil. Request for Quote funktioniert nur, wenn Ihr Innendienst in einer festen Zeit antwortet.

## Warum braucht ein B2B-Shop Request for Quote?

Händler bestellen nicht nur bekannte Teile zu bekannten Preisen nach. Sie fragen nach einem Preis für 200 Stück statt 5, für ein Teil, das sie nie gekauft haben, oder für ein Projekt mit Liefertermin. Heute ist das eine E-Mail mit Excel-Liste an den Innendienst, und die Antwort ist ein PDF, das später jemand in einen Auftrag abtippt.

Request for Quote (RFQ), auf Deutsch Angebotsanfrage, hält dieses Gespräch im Shop. Salesforce beschreibt es in seinem [Beitrag zu den B2B-Neuerungen für Spring '26](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/) als Schritt "from self-service to sales-assisted": Käufer fragen ein Angebot an, ohne den Storefront zu verlassen. Der [Beitrag vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) nennt RFQ "already generally available". Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B"; die Funktion ist unter beiden Namen dieselbe.

Die [Salesforce-Hilfe zu Preisen in B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) beschreibt es so: Käufer in B2B-Stores fragen Angebote für komplexe oder große Bestellungen direkt aus dem Warenkorb an, und Sie bearbeiten die Angebote in Sales Cloud oder Agentforce Revenue Management. Dieselbe Seite nennt Advanced Pricing for Commerce Powered by Revenue Cloud als Voraussetzung für Request for Quote. Wann sich diese Lizenz lohnt, steht in [Advanced Pricing im B2B-Shop](../advanced-pricing-b2b-shop-revenue-cloud/).

## Wie wird aus dem Warenkorb ein Angebot und daraus wieder ein Warenkorb?

Der Kreislauf hat vier Schritte:

```schritte
Anfrage | Käufer
  Der Käufer füllt einen Warenkorb oder öffnet eine Produktseite und fragt ein Angebot an, statt zu bestellen.
Verhandlung | Innendienst
  Aus der Anfrage wird ein Angebot. Der Innendienst passt Preise oder Mengen an und gibt es in Sales Cloud oder Revenue Management frei.
Antwort | Käufer
  Der Käufer sieht das Angebot auf der Seite My Quotes und nimmt es an, bittet um Änderungen oder lehnt ab.
Bestellung | Käufer
  Mit Quote to Cart kommt das freigegebene Angebot als Warenkorb zurück. Der Käufer bestellt zu den verhandelten Preisen, meist mit Bestellnummer, wie in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/) beschrieben.
```

Im Juni-Beitrag heißt es zu Schritt 4: "once a quote is negotiated and approved, sellers can share it with customers as a cart". Salesforce nennt das Round-Trip Quoting. Der Juni-Beitrag stellt Quote to Cart und Round-Trip Quoting als Teil eines Pakets mit dem Etikett "GA June 2026" vor, den ausdrücklichen Status "generally available" gibt er aber nur für RFQ an. Bevor Sie Schritt 4 in eine Einführung einplanen, prüfen Sie in Ihrer Org, welche Teile aktiv sind.

## Die CommerceQuotes-APIs für eigene Komponenten

Bauen Sie eigene Komponenten oder ein Headless-Frontend, ist die Apex-Klasse [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm) die Schnittstelle. Sie hat vier Methoden:

| Methode | API-Version | Was sie tut |
|---|---|---|
| getQuotes | 66.0 | Alle Angebote eines Kontos, mit Sortierung, Seiten und Datumsfilter |
| getQuoteDetail | 66.0 | Details eines Angebots für ein Konto |
| createQuoteFromProduct | 67.0 | Erzeugt ein Angebot von der Produktseite |
| updateQuote | 67.0 | Freigegebenes Angebot nachverhandeln oder ablehnen |

Zwei Details aus der Referenz sind für das Design wichtig:

- **createQuoteFromProduct** legt zur Verarbeitung einen temporären zweiten Warenkorb an und löscht ihn danach, egal ob der Aufruf gelingt oder scheitert. Der eigentliche Warenkorb des Käufers bleibt unberührt.
- **updateQuote** funktioniert nur bei freigegebenen Angeboten. Renegotiate setzt das Angebot auf Draft zurück und speichert die Kommentare des Käufers, Decline setzt es auf Denied.

Die Status sind der Anker für Ihren Prozess. Jedes Angebot in Draft ist Arbeit für den Innendienst, jedes Approved-Angebot wartet auf den Käufer, jedes Denied-Angebot hat einen Grund, den man lesen sollte.

```hinweis offen
**Lizenzen je Produkttyp.** Laut Apex-Referenz werden einfache Produkte mit Lizenzen für B2B Commerce oder B2B Commerce und Revenue Cloud unterstützt; statische Bundles brauchen B2B Commerce und Revenue Cloud. Das liest sich weniger streng als die Hilfe-Seite, die Advanced Pricing für Request for Quote voraussetzt. Holen Sie sich die verbindliche Antwort für Ihre Produkte schriftlich von Salesforce.
```

## Wer beantwortet das Angebot, und wie schnell?

Hier entscheidet sich RFQ, und nichts davon ist Konfiguration. Ein Käufer, der im Shop ein Angebot anfragt und drei Tage wartet, schickt die nächste Anfrage per E-Mail, weil die wenigstens einen Menschen erreicht.

Vor dem Go-live würde ich diese Punkte schriftlich festlegen:

- **Antwortzeit.** Zum Beispiel eine Antwort innerhalb eines Arbeitstags für Ersatzteile und drei Tage für Projektmengen. Messen Sie das ab dem ersten Tag.
- **Zuständigkeit.** Welches Team bekommt Anfragen welcher Käufergruppe oder welches Landes, und wer vertritt bei Abwesenheit. Eine Queue ohne Verantwortlichen ist ein Wartezimmer.
- **Preiskompetenz.** Bis zu welchem Rabatt der Innendienst allein freigibt und ab wann eine Führungskraft zustimmt. Laufen Freigaben in Revenue Cloud, gehören die Grenzen dort in Regeln.
- **Gültigkeit.** Wie lange ein freigegebenes Angebot gilt, bevor Preise neu geprüft werden.
- **Bestellweg.** Was passiert, wenn ein Käufer per E-Mail statt im Shop annimmt. Tippt der Innendienst den Auftrag dann von Hand ein, bricht der Kreislauf.

Große Händler fragen außerdem über Außendienst und Partnerportale an. Baut dort ebenfalls eine KI Angebote, sollten derselbe Innendienst und dieselben Preisregeln beide Kanäle bedienen, wie ich es für den [Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/) beschreibe.

## Rechenbeispiel: 400 Systemintegratoren

Angenommen, ein Hersteller von Fördertechnik-Komponenten verkauft an 400 Systemintegratoren. Die meisten Bestellungen sind Nachbestellungen zu Stufenpreisen, aber etwa jede zehnte ist Projektgeschäft mit größeren Mengen und einem Zielpreis. Der Innendienst bekommt diese Anfragen heute per E-Mail und antwortet im Schnitt nach vier Tagen.

Mit RFQ legt der Integrator die Stückliste in den Warenkorb und fragt ein Angebot an, den Projektnamen im Kommentar. Das Angebot landet in einer Queue je Land, der Innendienst kalkuliert es mit der Revenue-Cloud-Procedure, die der Vertrieb schon für Maschinenangebote nutzt, und gibt es frei. Der Integrator sieht das Angebot unter My Quotes, bittet über Renegotiate um eine Änderung, bekommt das überarbeitete Angebot und bestellt den Warenkorb, den Quote to Cart erzeugt. Der Auftrag erreicht SAP mit den verhandelten Preisen und der Angebotsnummer als Referenz.

Die Zahlen sind erfunden, um die Methode zu zeigen. Was ich in den ersten drei Monaten messen würde: Anteil der Angebotsanfragen über den Shop statt per E-Mail, Antwortzeit und Anteil der freigegebenen Angebote, die zu Aufträgen werden.

## Erster Schritt: Antwortzeit und Preiskompetenz im Innendienst festlegen

Starten Sie beim Innendienst, nicht bei der Komponente. Legen Sie Antwortzeit, Verantwortliche je Queue und Preiskompetenz fest und testen Sie den Kreislauf mit einer Käufergruppe, die heute schon viele Anfragen schickt. Klären Sie danach die Lizenzfrage für Ihre Produkttypen mit Salesforce, weil Hilfe und Apex-Referenz sich unterschiedlich lesen.

Das Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) zeigt, wie RFQ neben Kundenpreisen, Checkout und Nachbestellung steht. Wie aus dem Angebot in Revenue Cloud Vertrag und Auftrag werden, behandelt das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/) der Masterclass Revenue Cloud. Wo RFQ mehrere Partner und Teams berührt, gehört die Steuerung zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).
