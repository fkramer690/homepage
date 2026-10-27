---
title: "Advanced Pricing im B2B-Shop: Wann Revenue Cloud?"
description: "Wann ein B2B-Shop auf Salesforce Advanced Pricing powered by Revenue Cloud braucht: Lizenzen, Pricing Procedures, Vertragspreise, Bundles und wann SAP reicht."
pubDate: 2026-10-28
lang: de
slug: advanced-pricing-b2b-shop-revenue-cloud
translationKey: commerce-advanced-pricing-revenue-cloud
topic: revenue
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Revenue Cloud, Advanced Pricing, Vertragspreise, Pricing Procedures]
takeaways:
  - "Agentforce Revenue Management for B2B Commerce braucht eine Lizenz Commerce Growth oder Commerce Advanced plus Revenue Cloud Advanced, gekauft über den Salesforce Account Executive."
  - "Es ersetzt die einfache Preisbuchlogik durch Pricing Procedures, Entscheidungstabellen, Vertragspreise, Mengenstaffeln, konfigurierbare Bundles, Qualification Rules und Abonnements."
  - "Die Salesforce-Hilfe nennt Advanced Pricing for Commerce Powered by Revenue Cloud als Voraussetzung für Request for Quote in B2B-Stores."
  - "Der Hauptnutzen ist eine Preislogik für Angebote, Aufträge und Shop. Er zahlt sich aus, wenn der Vertrieb schon in Revenue Cloud kalkuliert."
  - "Berechnet SAP alle Kundenpreise und kalkuliert der Vertrieb außerhalb von Revenue Cloud, stellt Advanced Pricing eine zweite Preis-Engine neben SAP. Dann ist ein Live-Aufruf ans ERP meist einfacher."
faq:
  - q: "Was ist Advanced Pricing for Commerce Powered by Revenue Cloud?"
    a: "Die Preis-Engine von Revenue Cloud, eingesetzt in einem B2B-Commerce-Store. Statt nur Preisbüchern berechnet sie Preise mit Pricing Procedures, Entscheidungstabellen und Vertragspreisen, und Salesforce nennt sie als Grundlage für Funktionen wie Request for Quote."
  - q: "Welche Lizenzen braucht Advanced Pricing in B2B Commerce?"
    a: "Laut Salesforce-Hilfe eine Lizenz Commerce Growth oder Commerce Advanced zusammen mit Revenue Cloud Advanced. Die Revenue Settings müssen aktiviert sein. Gekauft werden die Lizenzen über den Salesforce Account Executive."
  - q: "Kann ein B2B-Store Vertragspreise aus Revenue Cloud zeigen?"
    a: "Ja. Die Salesforce-Hilfe führt vertragsbasierte Preise für B2B-Stores unter Advanced Pricing. In Revenue Cloud stehen Vertragspreise auf Contract Item Price-Datensätzen und werden von der Pricing Procedure angewendet, sobald der Vertrag aktiv ist."
  - q: "Brauche ich Revenue Cloud, wenn SAP meine Preise berechnet?"
    a: "Nicht unbedingt. Ist und bleibt SAP der Preis-Master, ist ein Live-Aufruf an SAP über die Pricing Extension meist einfacher, als dieselbe Logik in Revenue Cloud nachzubauen. Revenue Cloud lohnt sich, wenn der Vertrieb dort schon Angebote rechnet."
draft: false
---

Ein B2B-Shop braucht Advanced Pricing powered by Revenue Cloud, wenn seine Preise Regeln folgen, die Preisbücher nicht abbilden, und wenn diese Regeln schon in Salesforce liegen oder dort liegen sollen. Salesforce verkauft das als Agentforce Revenue Management for B2B Commerce: eine Lizenz Commerce Growth oder Advanced plus Revenue Cloud Advanced. Dazu kommen Pricing Procedures, Entscheidungstabellen, Vertragspreise, Mengenstaffeln, konfigurierbare Bundles und Qualification Rules, und Salesforce nennt es als Voraussetzung für Request for Quote. Meine Regel: Es lohnt sich, wenn der Vertrieb schon in Revenue Cloud kalkuliert. Ist SAP der Preis-Master, bekommen Sie vor allem eine zweite Preis-Engine.

## Was bringt Advanced Pricing in einen B2B-Store?

Die Standardpreise in Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, arbeiten mit Preisbüchern und einer Preisstrategie. Das deckt Listenpreise und Händlerstufen ab, wie ich in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/) beschreibe. Alles, was eine Berechnung statt eines gespeicherten Preises ist, braucht eigenen Code oder eine Preis-Engine.

Die [Salesforce-Hilfe zu Agentforce Revenue Management for B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) zählt auf, was die Revenue-Cloud-Seite in den Store bringt:

- **Komplexe Preise** mit Pricing Recipes, Entscheidungstabellen, Context Definitions und Pricing Procedures, angewendet auf Angebote, Aufträge und Abonnements ohne eigenen Code.
- **Staffelpreise**, bei denen Mengenrabatte an Schwellen greifen und die Staffeln dem Käufer angezeigt werden.
- **Konfigurierbare Bundles** mit einer regelbasierten Konfigurations-Engine für auftragsbezogen gefertigte Produkte.
- **Request for Quote**, damit Käufer aus dem Warenkorb eine Preisverhandlung starten.
- **Qualification Rules**, die Sichtbarkeit von Produkten und Kategorien je Käufergruppe aus Kontodaten ableiten und die manuelle Pflege von Entitlement Policies ersetzen.
- **Abonnements** für digitale Produkte, einmalig, unbefristet oder befristet.

Ein paar Begriffe, weil sie in jedem Workshop fallen. Eine Pricing Procedure ist die geordnete Folge von Schritten, die aus einem Listenpreis einen Nettopreis macht. Eine Entscheidungstabelle (Decision Table) ist eine Nachschlagetabelle, die die Procedure liest, etwa den Rabatt je Kundengruppe und Materialgruppe. Der [Preisbereich der Salesforce-Hilfe für B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) hat eigene Artikel zu Advanced Pricing, darunter Pricing Procedure Plans, das Aktualisieren der Entscheidungstabellen des Stores, eigene Felder in der Pricing Procedure und vertragsbasierte Preise für B2B-Stores.

## Welche Lizenzen brauchen Sie?

Laut Salesforce-Hilfe sind die Revenue-Management-Funktionen für B2B Commerce in Orgs mit einer Lizenz Commerce Growth oder Commerce Advanced zusammen mit einer Lizenz Revenue Cloud Advanced verfügbar. Die Revenue Settings müssen aktiviert sein, und die Lizenzen kaufen Sie über Ihren Account Executive.

Zwei Fakten aus den offiziellen Preisseiten für das Budget. Die [B2B-Commerce-Editionen](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) stehen auf "Contact for Pricing" und werden als Anteil am Bruttowarenwert (GMV) über den Storefront abgerechnet; einen Prozentsatz veröffentlicht Salesforce nicht. Die [Preisseite von Revenue Cloud](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) nennt für Revenue Cloud Advanced 200 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung und setzt eine Lizenz für Sales Cloud, Service Cloud oder CRM voraus. Wie viele Nutzer mit Revenue Cloud Advanced ein Store mit externen Käufern braucht, steht auf keiner der beiden Seiten. Stellen Sie diese Frage schriftlich, bevor Sie den Business Case rechnen, denn die Antwort kann die Zahl stark verschieben.

## Wie kommen Vertragspreise zum Käufer?

Vertragspreise sind der häufigste Grund, warum Hersteller sich Advanced Pricing ansehen. Ein großer Händler verhandelt für zwei Jahre einen Preis für eine Reihe von Ersatzteilen, und der Shop soll genau diesen Preis zeigen.

Die [Trailhead-Einheit zu vertragsbasierten Preisen](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) zeigt, wie Revenue Cloud das löst. Der verhandelte Preis steht auf einem Contract Item Price-Datensatz, der an einem Vertrag hängt. Mengenrabatte darauf kommen aus Contract Item Price Adjustment Tiers. Die Pricing Procedure hat einen Listenpreis-Schritt mit der Option "Use contract-based pricing", der einen Vertragspreis am aktiven Vertrag sucht und den Listenpreis damit ersetzt. Zwei Details im Betrieb sind wichtig: Der Vertrag muss aktiviert sein, und die Entscheidungstabellen für Vertragspreise und Volumenstaffeln müssen aktualisiert werden, bevor die Preisfindung die Daten sieht. Die Einheit zeigt das an einem Angebot; für den Store hat die Salesforce-Hilfe einen eigenen Artikel zu vertragsbasierten Preisen in B2B-Stores.

Bei diesem Aktualisieren würde ich im Design zuerst hinsehen. Entstehen Vertragspreise in Salesforce, gehört das Aktualisieren zum Prozess. Kommen sie aus SAP, braucht jede SAP-Änderung einen Import plus ein Aktualisieren, bevor der Shop stimmt.

## Wann lohnt sich Advanced Pricing?

Das stärkste Argument ist Einheitlichkeit. Salesforce schreibt in seinem [Beitrag zu den B2B-Neuerungen für Spring '26](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/), Käufer sollten über Website, Agent und Vertrieb hinweg "one price, one catalog, and one history" sehen. Mit Advanced Pricing berechnet dieselbe Procedure, die für den Innendienst ein Angebot kalkuliert, auch den Warenkorb des Händlers.

Ich würde es empfehlen, wenn

- der Vertrieb schon in Revenue Cloud Angebote rechnet, die Preislogik dort also existiert und gepflegt wird,
- der Shop konfigurierte Bundles oder auftragsbezogene Varianten verkauft, die die Konfigurations-Engine brauchen,
- Vertragspreise in Salesforce verhandelt und gespeichert werden, nicht in SAP,
- Sie Request for Quote wollen, weil die Salesforce-Hilfe Advanced Pricing dafür voraussetzt.

Vorsichtig wäre ich, wenn

- SAP jeden Kundenpreis berechnet und das auch weiter tun soll. Dann bauen Sie die SAP-Logik in Entscheidungstabellen nach, also zwei Engines, die übereinstimmen müssen, oder Sie rufen SAP ohnehin auf,
- der Vertrieb in SAP oder einem anderen CPQ-Werkzeug kalkuliert und keinen Wechsel plant,
- der Shop vor allem Ersatzteile zu Stufenpreisen verkauft, die Preisbücher abdecken.

Wo Ihre Preis-Engine grundsätzlich liegen sollte, ist eine Frage für die Masterclass Revenue Cloud. Für den Shop folgt die Entscheidung dem Preis-Master: Das System, dem der Vertrieb bei einem Angebot vertraut, sollte auch den Warenkorb rechnen.

## Ein typisches Szenario, als Annahme

Ein typisches Szenario, als Annahme: Ein Hersteller von Verpackungsmaschinen hat vor einem Jahr Revenue Cloud für Maschinenangebote eingeführt, mit Pricing Procedures für Länderzuschläge und Vertragspreisen für 30 Schlüsselkunden. Jetzt will er einen Shop für Ersatzteile und Service-Kits für seine 300 Kunden. SAP hält weiter die Listenpreise.

Hier passt Advanced Pricing. Listenpreise kommen wie heute aus SAP in Preisbücher, die bestehende Procedure ergänzt den Länderzuschlag und wendet die Vertragspreise an, und Schlüsselkunden sehen im Shop, was ihr Vertriebsmitarbeiter anbieten würde. Große oder ungewöhnliche Bestellungen gehen über Request for Quote an denselben Innendienst.

Ändern Sie eine Annahme: Der Hersteller kalkuliert Maschinen in SAP und hat kein Revenue Cloud. Dann würde ich Ersatzteile mit Preisbüchern für die Stufen und einem Live-Aufruf an SAP für die 30 Schlüsselkunden bepreisen und keine Preis-Engine nur für den Shop kaufen.

## Wo starten Sie?

Schreiben Sie drei Dinge auf, bevor Sie mit Salesforce über Lizenzen sprechen: wo Ihre Preislogik heute liegt, wer Vertragspreise pflegt und ob Sie Request for Quote oder konfigurierte Bundles im Shop brauchen. Zeigen zwei der drei Antworten auf Salesforce, lohnt sich ein Proof of Concept mit Ihren echten Procedures. Die Lizenzfrage gehört in dieselbe Prüfung, die ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) beschreibe.

Das Gesamtbild zu Preisen, Angeboten und Checkout steht im Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/). Wie Käufer aus dem Warenkorb ein Angebot machen, zeigt [Request for Quote im B2B-Shop](../request-for-quote-b2b-shop-angebot/), die Händlerseite von KI-Angeboten [KI-Angebote mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/).

Advanced Pricing lohnt sich, wenn der Shop so rechnen soll, wie der Vertrieb es in Revenue Cloud schon tut. Wenn Sie das für Ihre Preisfindung prüfen möchten, [schreiben Sie mir](#contact).
