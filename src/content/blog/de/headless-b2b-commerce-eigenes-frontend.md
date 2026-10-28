---
title: "Headless B2B Commerce: eigenes Frontend, Salesforce-Kern"
description: "Wann ein Hersteller Salesforce B2B Commerce headless hinter der eigenen Website oder App betreiben sollte, was in Salesforce bleibt und was Sie selbst bauen."
pubDate: 2026-10-28
lang: de
slug: headless-b2b-commerce-eigenes-frontend
translationKey: commerce-headless-b2b
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Headless, Connect REST API, React, Storefront, Fertigung]
takeaways:
  - "Headless B2B Commerce heißt: Ihre eigene Website oder App ist der Shop, Salesforce hält Katalog, Preise, Warenkorb, Checkout und Aufträge und liefert sie über die Commerce Connect REST APIs."
  - "Salesforce führt Headless B2B Commerce als allgemein verfügbar, mit einem React B2B Storefront Blueprint und einer Headless-Referenz-App, deren Quellcode auf GitHub liegt."
  - "Headless betreibt Ihr Unternehmen Frontend, Hosting, Deployment-Pipeline und Login selbst; bei einem Store aus Experience Builder hostet und skaliert Salesforce die Seite."
  - "Preis-, Bestands- und Checkout-Extensions laufen bei den Connect-API-Aufrufen mit, deshalb gilt dieselbe ERP-Logik im LWR-Store und in Ihrer App."
  - "Headless lohnt sich, wenn eine Unternehmenswebsite oder Kunden-App und ein Team dafür schon da sind; für den ersten Shop ist ein LWR-Store der günstigere Start."
faq:
  - q: "Was ist Headless B2B Commerce bei Salesforce?"
    a: "Ein Aufbau, bei dem Ihr eigenes Frontend, etwa eine React-Website oder eine mobile App, die Commerce Connect REST APIs von Salesforce für Suche, Produktdetails, Preise, Warenkorb, Checkout und Bestellhistorie aufruft. Salesforce B2B Commerce bleibt das Commerce-Backend, die Oberfläche bauen und hosten Sie selbst."
  - q: "Braucht ein headless B2B-Shop trotzdem eine Experience-Cloud-Site?"
    a: "Für Gast-Warenkorb und Checkout mit JWT nennt der Salesforce Developer Guide eine aktive Experience-Cloud-Site, einen gestarteten Web Store und eine konfigurierte Domain als Voraussetzung. Für registrierte Käufer steht es in den gelesenen Guides nicht ausdrücklich, ich würde mit der Site planen und es in einer Sandbox bestätigen."
  - q: "Gibt es ein Startprojekt für einen headless B2B-Shop?"
    a: "Ja. Salesforce bietet einen React B2B Storefront Blueprint und eine B2B Commerce Headless-Referenz-App an. Der Quellcode der Referenz-App liegt im Repository trailheadapps/commerce-b2b-headless auf GitHub."
  - q: "Welche Lizenz brauchen Käufer in einem headless B2B-Shop?"
    a: "Die Headless-Guides, die ich gelesen habe, sagen es nicht. Für Käufer in einem Standard-Store nennt Trailhead Customer Community Plus. Ich würde mir die Lizenzlage für headless Käufer von Salesforce schriftlich bestätigen lassen, bevor der Business Case steht."
draft: false
---

Headless B2B Commerce heißt: Ihre eigene Website oder App ist der Shop, und Salesforce B2B Commerce hält Katalog, Preise, Warenkorb, Checkout und Aufträge und liefert sie über die Commerce Connect REST APIs. Salesforce führt das als allgemein verfügbar, mit einem React B2B Storefront Blueprint und einer Headless-Referenz-App als Startpunkt. Ich würde nur dann headless gehen, wenn eine Unternehmenswebsite oder Kunden-App schon existiert und ein Team sie betreibt. Sonst ist ein LWR-Store aus Experience Builder günstiger, weil Salesforce ihn hostet und Sie kein eigenes Frontend gegen jedes Salesforce-Release testen müssen.

## Was bedeutet Headless B2B Commerce?

In einem normalen B2B-Shop auf Salesforce ist die Storefront eine Experience-Cloud-Site, gebaut in Experience Builder, heute meist auf dem LWR-Template. Headless trennt die beiden Schichten. Salesforce beschreibt das im [Guide zur Headless-API-Architektur](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-api-architecture.html) als Architektur, in der die Präsentationsschicht vom Commerce-Backend getrennt ist. Ihr Frontend ruft die Commerce Connect REST APIs auf für:

- Anmeldung und Sitzungsverwaltung,
- Produktsuche, Kategorienavigation und Produktdetails,
- Preise und Promotions,
- Warenkorb und Checkout,
- Bestellung und Bestellhistorie,
- Konto- und Profildaten.

Das Produkt trägt gerade mehrere Namen. Die Salesforce-Hilfe schreibt weiter "Salesforce B2B Commerce", Trailhead schreibt, B2B Commerce heiße jetzt [Agentforce Commerce for B2B](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Headless läuft mit demselben Produkt, eine eigene Headless-Edition gibt es nicht.

Auf der [Seite zu den Commerce-Neuerungen](https://www.salesforce.com/de/commerce/innovations/) steht Headless B2B Commerce mit "AV heute", also verfügbar, und dem Versprechen von B2B-Einkauf "auf Ihrer Website, in Ihrer App, sogar in Slack". Im selben Eintrag nennt Salesforce einen neuen React B2B Storefront Blueprint und einen erweiterbaren Checkout. Im [Release-Beitrag vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) kommt eine Headless-Referenz-App dazu: eine lauffähige Anwendung, die die empfohlenen API-Abfolgen vom Katalog bis zum Checkout zeigt, für Teams, die mit React oder Vue bauen. Der [Developer Guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-journey-overview.html) verlinkt den Quellcode im Repository `trailheadapps/commerce-b2b-headless`.

## Was bleibt in Salesforce, was wandert zu Ihnen?

Die Aufteilung ist klarer als in den meisten Architekturdiskussionen, weil Salesforce sie im Architektur-Guide selbst nennt: Headless verwaltet Ihr Unternehmen Frontend-Hosting, Deployment-Pipelines und Integrationsschichten. Bei Experience Builder kümmert sich Salesforce um Hosting, Skalierung und die Plattform-Infrastruktur.

| Teil | Store aus Experience Builder (LWR) | Headless |
|---|---|---|
| Katalog, Entitlements, Käufergruppen | Salesforce | Salesforce |
| Preise, Warenkorb, Checkout-Logik, Extensions | Salesforce | Salesforce |
| Order Summaries und Bestellhistorie | Salesforce | Salesforce |
| Seitenaufbau, Design, Routing | Experience Builder | Ihr Frontend-Code |
| Hosting und Skalierung der Storefront | Salesforce | Sie |
| Login und Sitzung | Login der Site | Ihr Backend mit OAuth |
| Deployment-Pipeline des Frontends | Release der Site in Salesforce | Ihre Pipeline |
| Tests gegen Salesforce-Releases | Ihre Regressionstests für den Store | Ihre Regressionstests für Store und Frontend |

Alles, was entscheidet, was ein Käufer sehen, zahlen und bestellen darf, bleibt in Salesforce. Das ist das Hauptargument für headless: Sie bekommen Ihre eigene Oberfläche, ohne eine zweite Commerce-Engine zu bauen.

## Wie funktioniert ein headless Checkout technisch?

Der [Guide zum Headless-Checkout](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-checkout.html) zeigt die Abfolge. Das Frontend liest den aktiven Checkout und legt aus dem aktiven Warenkorb einen an, wenn es keinen gibt. Es setzt Lieferadresse und Versandart per PATCH, autorisiert eine Zahlung auf Bestellnummer mit dem Request-Typ `SimplePurchaseOrder` und der Bestellnummer als Token und platziert den Auftrag dann in zwei Schritten, `prepare` und `submit`. Die Antwort enthält Auftragsnummer und Order-Summary-ID.

Der wichtige Punkt für die Architektur: Hinter diesen Aufrufen laufen Preis-, Bestands-, Steuer- und Checkout-Logik. Commerce Extensions werden durch Connect-API-Aufrufe ausgelöst, eine Preis-Extension, die SAP nach dem Kundenpreis fragt, läuft also für Ihre React-App genauso wie für den LWR-Store. Wie man diese Extensions so baut, dass sie Releases überstehen, steht in [Commerce Extensions: Eigenentwicklung, die Updates übersteht](../commerce-extensions-eigenentwicklung/), woher Kundenpreise kommen sollten in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/).

```ablauf
ext: Ihr Frontend
sf: Connect REST API, Preis-Extension, Order Summary
erp: SAP Kundenpreis
Ihr Frontend --Checkout-Aufruf--> Connect REST API
Connect REST API --löst aus--> Preis-Extension
Preis-Extension --fragt Preis--> SAP Kundenpreis
SAP Kundenpreis ..Preis zurück..> Preis-Extension
Connect REST API --prepare, submit--> Order Summary
```

Den Login bauen Sie selbst. Für registrierte Käufer nutzt der [Guide zum Headless-Login](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-login.html) die OAuth-Endpunkte für Authorize und Token, unterstützt externe Identity Provider und eigene Anmeldung in Apex, und nach dem Login hängen alle Storefront-Aufrufe nur an der aktiven Sitzung. Für Gäste dokumentiert Salesforce [Warenkorb und Checkout mit einem JWT](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-guest-jwt.html): ein Backend for Frontend, eine eindeutige Besucher-ID pro Gast und als Voraussetzung eine aktive Experience-Cloud-Site, einen gestarteten Web Store und eine konfigurierte Domain. Headless heißt also nicht, dass die Experience-Cloud-Site wegfällt.

```hinweis offen
Welche Lizenz Käufer in einem headless Shop brauchen, steht in den Guides, die ich gelesen habe, nicht. Für einen Standard-Store nennt Trailhead Customer Community Plus, siehe [B2B Commerce Lizenzen für Käufer](../b2b-commerce-lizenzen-kaeufer/). Den Headless-Fall würde ich mir schriftlich bestätigen lassen, bevor jemand einen Business Case rechnet.
```

## Wann lohnt sich headless für einen Hersteller?

Ich sehe vier Bedingungen, und mindestens die erste und die letzte sollten erfüllt sein:

1. **Es gibt schon ein Frontend, das Käufer nutzen.** Eine Unternehmenswebsite mit Produktinhalten oder eine Kunden-App für Maschinenbediener. Diese Inhalte in einer Experience-Cloud-Site zu verdoppeln, kostet mehr als die Anbindung.
2. **Bestellen ist eine Funktion unter mehreren.** In einer Maschinen-App steht das Bestellen von Verschleißteilen neben Maschinenstatus und Dokumenten. Ein separater Shop würde diesen Ablauf zerreißen.
3. **Mehrere Kanäle teilen ein Backend.** Website, App und später Slack oder ein Agent nutzen denselben Katalog, dieselben Preise und dieselben Aufträge.
4. **Ein Frontend-Team bleibt über Jahre.** Intern oder über einen langen Vertrag, mit React-Kenntnissen, eigener Pipeline und jemandem, der ans Telefon geht, wenn der Shop langsam ist.

Ein typisches Szenario, als Annahme: Ein Maschinenbauer betreibt eine React-App, in der 3.000 Bediener den Status ihrer Maschinen sehen. Wenn "Verschleißteile bestellen" über die Connect APIs in diese App kommt, bleibt der Käufer in einem Werkzeug, das er ohnehin täglich öffnet. Die 200 Händler desselben Herstellers, die Ersatzteile in großen Mengen bestellen, sind mit einem Standard-LWR-Store besser bedient. Beides kann auf demselben Salesforce-Katalog laufen.

Falsch ist headless für einen ersten Shop ohne Frontend-Team, oder wenn das Ziel vor allem ist, Händler schnell vom Telefon wegzubekommen. Wer nur eine mobile App braucht: Der Juni-Beitrag nennt auch Mobile Publisher, der eine App in Ihrem Design in die Stores von Apple und Google bringt, ohne ein headless Frontend zu bauen.

## Was kostet headless über die Lizenz hinaus?

Salesforce verkauft B2B Commerce als Anteil am Shop-Umsatz und veröffentlicht keinen Prozentsatz, siehe [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/). Einen eigenen Preis für headless habe ich nicht gefunden. Die echten Zusatzkosten liegen bei Ihnen:

- Bau des Frontends und eines Backend for Frontend, das die OAuth-Zugangsdaten hält,
- Hosting, Monitoring und Bereitschaft für die Storefront,
- Regressionstests gegen jedes Salesforce-Release für die APIs, die Ihr Frontend aufruft,
- bewusste Anhebung der API-Version in Ihren Aufrufen, statt sie veralten zu lassen.

Repository und Pipeline des Frontends sollten Ihnen gehören, nicht der Agentur, die es baut, aus denselben Gründen wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/). Soll in Ihrer App auch ein Agentforce-Agent antworten, ist die [Agent API](../agentforce-agent-api-eigene-apps/) der eigene Einstieg, mit eigenen Fragen zur Identität. Wie Agenten dieselben Schnittstellen nutzen, beschreibt das Kapitel [MCP und Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/) der KI-Masterclass.

## Wo starten Sie?

Schreiben Sie auf, welche Kanäle Käufer heute wirklich nutzen und welcher Bestellungen annehmen soll. Prüfen Sie dann, ob es in den nächsten drei Jahren ein Frontend-Team gibt. Zeigen beide Antworten auf headless, bauen Sie einen kurzen Test mit der Referenz-App gegen eine Sandbox mit Ihrem echten Katalog und Ihrer Preis-Extension und messen Sie, wie schnell Warenkorb und Checkout mit dem Live-Aufruf ins ERP antworten. Die Datenflüsse dahinter sind Teil des Kapitels [ERP-Anbindung](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) meiner Masterclass B2B Commerce, und solche Entscheidungen begleite ich unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Headless ist eine gute Option für Hersteller, die schon ein genutztes Frontend betreiben, und ein teurer Umweg für alle anderen; wenn Sie prüfen möchten, welcher Fall bei Ihnen vorliegt, [schreiben Sie mir](#contact).
