---
title: "Request for Quote im B2B-Shop: vom Warenkorb zum Angebot"
description: "Wie Käufer in Salesforce B2B Commerce aus dem Warenkorb ein Angebot anfragen, wie das Angebot als Warenkorb zurückkommt und was der Innendienst regeln muss."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: request-for-quote-b2b-shop-angebot
translationKey: commerce-request-for-quote
topic: commerce
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Angebotsanfrage, Request for Quote, Revenue Cloud, Innendienst]
takeaways:
  - "Angemeldete Käufer senden ihren Warenkorb oder ein einzelnes Produkt als Angebotsanfrage. Salesforce bezeichnet die Funktion als allgemein verfügbar."
  - "Einfache Produkte brauchen B2B Commerce, Bundles zusätzlich Revenue Cloud. Abonnements werden bei Request for Quote nicht unterstützt."
  - "Seit Juni 2026 übernimmt der Käufer beim Round-Trip Quoting ein freigegebenes Angebot per Accept & Buy zu verhandelten Preisen in den Warenkorb und bestellt."
  - "ConnectApi.CommerceCart wandelt Warenkörbe in Angebote und freigegebene Angebote in Warenkörbe um; CommerceQuotes listet und aktualisiert Angebote."
  - "Aus meiner Sicht trägt die Funktion nur, wenn eine Antwortzeit veröffentlicht ist; sonst kehren Käufer zur E-Mail zurück."
faq:
  - q: "Was ist Request for Quote in Salesforce B2B Commerce?"
    a: "Eine Store-Funktion, mit der Käufer für komplexe oder hochpreisige Käufe ein Angebot anfragen: direkt aus dem Warenkorb oder für ein einzelnes Produkt von der Produktseite. Aus der Anfrage wird ein Angebot, das der Innendienst in Sales Cloud oder Agentforce Revenue Management bearbeitet."
  - q: "Braucht Request for Quote Revenue Cloud?"
    a: "Nicht für einfache Produkte. Laut Apex-Referenz werden einfache Produkte allein mit einer B2B-Commerce-Lizenz unterstützt, statische und dynamische Bundles brauchen B2B Commerce und Revenue Cloud. Abonnementprodukte werden nicht unterstützt. Lassen Sie sich die Antwort für Ihren Produktmix schriftlich von Salesforce bestätigen."
  - q: "Wie kommt ein freigegebenes Angebot zurück zum Käufer?"
    a: "Über Round-Trip Quoting, das Salesforce im Juni 2026 allgemein verfügbar gemacht hat. Der Käufer öffnet das freigegebene Angebot unter My Quotes und klickt auf Accept & Buy. Die Positionen werden zu den verhandelten Preisen in den Warenkorb übernommen, und der Käufer bestellt im Shop. Die Funktion muss vorher im Store eingerichtet werden."
  - q: "Kann ein Käufer ein Angebot im Shop ablehnen oder nachverhandeln?"
    a: "Ja. Laut Apex-Referenz (API 67.0) klickt der Käufer auf der Seite My Quotes bei einem freigegebenen Angebot auf Renegotiate oder Decline. Renegotiate setzt das Angebot mit den Kommentaren des Käufers auf Draft zurück, Decline setzt es auf Denied. Die Einrichtungsseite in der Hilfe nennt den erforderlichen Status Rejected, prüfen Sie deshalb die Werte in Ihrer Org."
draft: false
---

In Salesforce B2B Commerce kann ein angemeldeter Käufer seinen Warenkorb als Angebotsanfrage senden oder für ein einzelnes Produkt von der Produktseite ein Angebot anfragen. Die Anfrage wird als Angebot angelegt, das Ihr Innendienst in Sales Cloud oder Agentforce Revenue Management bearbeitet. Ist das Angebot freigegeben, nimmt der Käufer es im Shop an und bestellt den daraus erzeugten Warenkorb zu den verhandelten Preisen. Salesforce nennt das Round-Trip Quoting. Einfache Produkte brauchen nur B2B Commerce, Bundles zusätzlich Revenue Cloud, Abonnements werden nicht unterstützt. Meiner Erfahrung nach funktioniert Request for Quote nur, wenn Ihr Innendienst innerhalb einer veröffentlichten Antwortzeit reagiert.

## Warum braucht ein B2B-Shop Request for Quote?

Händler bestellen nicht nur bekannte Teile zu bekannten Preisen nach. Sie fragen nach einem Preis für 200 Stück statt 5, für ein Teil, das sie nie gekauft haben, oder für ein Projekt mit Liefertermin. Heute ist das eine E-Mail mit Excel-Liste an den Innendienst, und die Antwort ist ein PDF, das später jemand in einen Auftrag abtippt.

Request for Quote (RFQ), auf Deutsch Angebotsanfrage, hält dieses Gespräch im Shop. Salesforce beschreibt es in seinem [Beitrag zu den B2B-Neuerungen für Spring '26](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/) als Schritt "from self-service to sales-assisted": Käufer fragen ein Angebot an, ohne den Shop zu verlassen. Der [Beitrag vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) nennt RFQ "already generally available". Auch Trailhead nennt das Produkt "Agentforce Commerce for B2B"; die Funktion ist unter beiden Namen dieselbe.

Die [Salesforce-Hilfe zu Preisen in B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) beschreibt es so: Käufer in B2B-Stores fragen Angebote für komplexe oder hochpreisige Käufe direkt aus dem Warenkorb an, und Sie bearbeiten die Angebote in Sales Cloud oder Agentforce Revenue Management. Welche Produkte funktionieren, hängt von der Lizenz ab: Laut [Apex-Referenz für ConnectApi.CommerceCart](https://developer.salesforce.com/docs/platform/apex-ref/references/apex-ref/apex-connectapi-commercecart-static-methods.html) werden einfache Produkte allein mit B2B Commerce unterstützt, statische und dynamische Bundles nur mit B2B Commerce und Revenue Cloud und Abonnementprodukte gar nicht. Wann sich Revenue-Cloud-Preise im Shop lohnen, steht in [Advanced Pricing im B2B-Shop](/blog/advanced-pricing-b2b-shop-revenue-cloud/).

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
  Mit Accept & Buy wird das freigegebene Angebot zum Warenkorb. Der Käufer bestellt zu den verhandelten Preisen, meist mit Bestellnummer, wie in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](/blog/b2b-checkout-bestellnummer-rechnung/) beschrieben.
```

Im Juni-Beitrag heißt es zu Schritt 4: "once a quote is negotiated and approved, sellers can share it with customers as a cart". Salesforce nennt das Round-Trip Quoting und bezeichnet es seit Juni 2026 als allgemein verfügbar. Automatisch geschieht das trotzdem nicht: Der Store braucht die Angebotskomponenten auf der Seite My Quotes, und der Käufer stößt die Umwandlung an. Die Apex-Referenz nennt Grenzen, die für das Design wichtig sind:

- **Accept & Buy gegenüber Duplicate to Cart.** Accept & Buy funktioniert nur bei Angeboten mit dem Status Approved oder Accepted und behält die verhandelten Preise. Duplicate to Cart kopiert ein Angebot im Status Draft mit den ursprünglichen Preisen in einen Warenkorb.
- **Keine Überschneidung, keine teilweise Umwandlung.** Die Umwandlung scheitert, wenn der Warenkorb des Käufers bereits ein Produkt aus dem Angebot enthält. Ein Angebot lässt sich nicht teilweise umwandeln. Promotions und Bonusprodukte werden nicht unterstützt.
- **Einmal je Auftrag.** Ein Angebot wird nur einmal in einen Warenkorb umgewandelt, wenn mit diesem Warenkorb ein Auftrag aufgegeben wird.

## Die Angebots-APIs für eigene Komponenten

Bauen Sie eigene Komponenten, sind zwei Apex-Klassen wichtig; ein Headless-Frontend nutzt die entsprechenden Commerce-Connect-REST-Ressourcen. Der Kreislauf selbst steckt in [ConnectApi.CommerceCart](https://developer.salesforce.com/docs/platform/apex-ref/references/apex-ref/apex-connectapi-commercecart-static-methods.html): createQuoteFromCart (API 66.0) wandelt den aktiven Warenkorb in ein Angebot um, createCartFromQuote (API 67.0) das freigegebene Angebot zurück in einen Warenkorb. [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm) hat vier Methoden für alles Weitere:

| Methode | API-Version | Was sie tut |
|---|---|---|
| getQuotes | 66.0 | Alle Angebote eines Accounts, mit Sortierung, Paginierung und Datumsfilter |
| getQuoteDetail | 66.0 | Details eines Angebots für einen Account |
| createQuoteFromProduct | 67.0 | Erzeugt ein Angebot von der Produktseite |
| updateQuote | 67.0 | Freigegebenes Angebot nachverhandeln oder ablehnen |

Zwei Details aus der Referenz sind für das Design wichtig:

- **createQuoteFromProduct** legt zur Verarbeitung einen temporären zweiten Warenkorb an und löscht ihn danach, egal, ob der Aufruf gelingt oder scheitert. Der eigentliche Warenkorb des Käufers bleibt unberührt.
- **updateQuote** funktioniert nur bei freigegebenen Angeboten. Renegotiate setzt das Angebot auf Draft zurück und speichert die Kommentare des Käufers, Decline setzt es auf Denied. Die Einrichtungsseite in der Hilfe nennt bei den erforderlichen Statuswerten Rejected statt Denied, prüfen Sie deshalb die Auswahlliste in Ihrer Org.

Die Statuswerte sind ein Ausgangspunkt für Ihren Prozess: Ein Angebot im Status Draft aus dem Store bedeutet üblicherweise Arbeit für den Innendienst, ein Approved-Angebot liegt beim Käufer, ein abgelehntes Angebot hat einen Grund, den man lesen sollte. Für Routing und Antwortzeiten brauchen Sie weiterhin einen Queue-Verantwortlichen und eigene Felder.

```hinweis offen
**Lizenzen je Produkttyp.** Laut Apex-Referenz werden einfache Produkte mit Lizenzen für B2B Commerce oder B2B Commerce und Revenue Cloud unterstützt; statische und dynamische Bundles brauchen B2B Commerce und Revenue Cloud; Abonnementprodukte werden gar nicht unterstützt. Für einen Hersteller, der Maschinen als Bundles oder Services als Abonnements verkauft, entscheidet das über den Umfang. Holen Sie sich die verbindliche Antwort für Ihre Produkte schriftlich von Salesforce.
```

## Wer beantwortet das Angebot, und wie schnell?

Hier entscheidet sich, ob RFQ funktioniert, und nichts davon ist Konfiguration. Ein Käufer, der im Shop ein Angebot anfragt und drei Tage wartet, schickt die nächste Anfrage per E-Mail, weil die wenigstens einen Menschen erreicht.

Vor dem Go-live würde ich diese Punkte schriftlich festlegen:

- **Antwortzeit.** Zum Beispiel eine Antwort innerhalb eines Arbeitstags für Ersatzteile und drei Tage für Projektmengen. Messen Sie das ab dem ersten Tag.
- **Zuständigkeit.** Welches Team erhält die Anfragen aus welcher Käufergruppe oder welchem Land, und wer übernimmt bei Abwesenheit die Vertretung? Eine Queue ohne Verantwortlichen ist ein Wartezimmer.
- **Preiskompetenz.** Bis zu welchem Rabatt der Innendienst allein freigibt und ab wann eine Führungskraft zustimmt. Erfolgen Freigaben in Revenue Cloud, gehören die Grenzen dort in Regeln.
- **Gültigkeit.** Wie lange ein freigegebenes Angebot gilt, bevor Preise neu geprüft werden.
- **Bestellweg.** Was passiert, wenn ein Käufer per E-Mail statt im Shop annimmt. Tippt der Innendienst den Auftrag dann von Hand ein, bricht der Kreislauf.

Bei großen Händlern gehen Anfragen außerdem über Außendienst und Partnerportale ein. Erstellt dort ebenfalls eine KI Angebote, sollten derselbe Innendienst und dieselben Preisregeln beide Kanäle bedienen, wie ich es für den [AI Partner Sales Assistant](/blog/ki-angebote-haendler-partner-sales-assistant/) beschreibe.

## Rechenbeispiel: 400 Systemintegratoren

Angenommen, ein Hersteller von Fördertechnik-Komponenten verkauft an 400 Systemintegratoren. Die meisten Bestellungen sind Nachbestellungen zu Stufenpreisen, aber bei etwa jeder zehnten geht es um Projektgeschäft mit größeren Mengen und einem Zielpreis. Der Innendienst erhält diese Anfragen heute per E-Mail und antwortet im Schnitt nach vier Tagen.

Mit RFQ legt der Integrator die Stückliste in den Warenkorb, fragt ein Angebot an und trägt den Projektnamen in das Kommentarfeld ein. Das Angebot wird in eine Queue je Land geleitet, der Innendienst kalkuliert es mit der Revenue-Cloud-Procedure, die der Vertrieb schon für Maschinenangebote nutzt, und gibt es frei. Der Integrator sieht das Angebot unter My Quotes, bittet über Renegotiate um eine Änderung, erhält das überarbeitete Angebot, klickt auf Accept & Buy und bestellt den Warenkorb. Der Auftrag erreicht SAP mit den verhandelten Preisen und der Angebotsnummer als Referenz.

Die Zahlen sind erfunden, um die Methode zu zeigen. Was ich in den ersten drei Monaten messen würde: Anteil der Angebotsanfragen über den Shop statt per E-Mail, Antwortzeit und Anteil der freigegebenen Angebote, die zu Aufträgen werden.

## Antwortzeit und Preiskompetenz im Innendienst festlegen

Starten Sie beim Innendienst, nicht bei der Komponente. Legen Sie Antwortzeit, Verantwortliche je Queue und Preiskompetenz fest und testen Sie den Kreislauf mit einer Käufergruppe, die heute schon viele Anfragen schickt. Klären Sie danach die Lizenzfrage für Ihre Produkttypen mit Salesforce, besonders für Bundles und Abonnements.

Das Kapitel [Preise, Warenkorb, Checkout](/masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](/masterclass/b2b-commerce/) zeigt, wie RFQ mit Kundenpreisen, Checkout und Nachbestellung zusammenspielt. Wie aus dem Angebot in Revenue Cloud ein Vertrag und ein Auftrag werden, behandelt das Kapitel [Angebot, Vertrag, Auftrag](/masterclass/revenue-cloud/angebot-vertrag-auftrag/) der Masterclass Revenue Cloud. Wo RFQ mehrere Partner und Teams berührt, gehört die Steuerung zu meiner Arbeit in der [Partnersteuerung](/leistungen/partnersteuerung/).
