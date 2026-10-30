---
title: "B2B Commerce Versionen: Visualforce, Aura oder LWR?"
description: "Welche Generation von Salesforce B2B Commerce Sie betreiben, Visualforce-Paket, Aura- oder LWR-Store, wie Sie es herausfinden und was daraus folgt."
pubDate: 2026-10-28
lang: de
slug: b2b-commerce-versionen-visualforce-aura-lwr
translationKey: commerce-versions-visualforce-aura-lwr
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Visualforce, Aura, LWR, CloudCraze, Migration]
takeaways:
  - "Salesforce B2B Commerce gibt es in drei Generationen: das Visualforce-Managed-Package aus der CloudCraze-Übernahme 2018 und Stores auf der Kernplattform mit Aura- oder LWR-Template."
  - "Die letzte Hauptversion von B2B Commerce for Visualforce in der Salesforce-Hilfe ist 4.13 aus Winter '21. Seit Summer '25 pflegt Salesforce dafür nur noch Patch Notes."
  - "Aura-Store-Templates bekommen nur Orgs, in denen Commerce vor Spring '23 aktiviert war. Für neue Stores empfiehlt Salesforce das LWR-Template."
  - "Stand 27. Oktober 2026 hat Salesforce kein Abkündigungsdatum für Aura-Stores oder das Visualforce-Paket veröffentlicht. Planen Sie nach Funktionen, nicht aus Angst vor einer Frist."
faq:
  - q: "Was ist der Unterschied zwischen B2B Commerce for Visualforce und B2B Commerce auf Lightning?"
    a: "B2B Commerce for Visualforce ist das Managed Package, das mit CloudCraze kam, mit Shopseiten in Visualforce. B2B Commerce auf der Kernplattform baut den Shop als Experience-Cloud-Site mit Experience Builder, auf Basis eines Aura- oder LWR-Templates."
  - q: "Wird B2B Commerce for Visualforce abgekündigt?"
    a: "Salesforce hat Stand Oktober 2026 kein Datum veröffentlicht, und das Paket steht nicht auf der Liste der aktiven Abkündigungen. Die letzte Hauptversion in der Hilfe ist 4.13 aus Winter '21, seit Summer '25 pflegt Salesforce nur noch Patch Notes."
  - q: "Kann ich noch einen B2B-Commerce-Store mit Aura-Template anlegen?"
    a: "Nur wenn Commerce in Ihrer Org vor Spring '23 aktiviert war. Für neue Stores empfiehlt Salesforce das Template B2B Commerce (LWR)."
  - q: "Wie finde ich heraus, welche B2B-Commerce-Version wir betreiben?"
    a: "Ein installiertes B2B-Commerce-Managed-Package deutet auf Visualforce. Bei Stores auf der Kernplattform verrät es der Checkout: Aura-Stores konfigurieren ihn als Flow im Flow Builder, LWR-Stores die Checkout-Schritte im Experience Builder."
draft: false
---

Salesforce B2B Commerce gibt es in drei Generationen. Die älteste ist B2B Commerce for Visualforce, ein Managed Package, das mit der Übernahme von CloudCraze 2018 kam. Die beiden neueren laufen auf der Kernplattform als Stores auf Experience Cloud, gebaut mit einem Aura- oder einem LWR-Template. Aura-Templates bekommen nur Orgs, in denen Commerce vor Spring '23 aktiviert war, und für neue Stores empfiehlt Salesforce LWR. Stand 27. Oktober 2026 gibt es kein veröffentlichtes Abkündigungsdatum für Aura-Stores oder das Visualforce-Paket. Welche Generation Sie betreiben, entscheidet, wie viel von der aktuellen Roadmap bei Ihrem Shop ankommt.

## Welche Generationen von B2B Commerce gibt es?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, hat eine Geschichte, die viel Verwirrung in Projekten erklärt:

| Generation | Technik | Stand Oktober 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed Package aus CloudCraze (übernommen 2018), Visualforce-Seiten | Letzte Hauptversion 4.13 (Winter '21), nur noch Patch Notes |
| B2B Commerce, Aura-Store | Kernplattform, Experience-Cloud-Site, Aura-Template | Neue Aura-Stores nur in Orgs, die vor Spring '23 aktiviert waren |
| B2B Commerce, LWR-Store | Kernplattform, Experience-Cloud-Site, LWR-Template | Empfohlen für neue Stores |

Salesforce hat den Abschluss der [Übernahme von CloudCraze](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) am 6. April 2018 gemeldet und CloudCraze als B2B-Commerce-Plattform beschrieben, die nativ auf Salesforce gebaut ist. Dieses Produkt lief als B2B Commerce for Visualforce weiter. Später hat Salesforce B2B Commerce in die Kernplattform geholt, mit eigenen Objekten für Stores, Käufergruppen, Warenkörbe und Bestellungen und mit Storefronts als Experience-Cloud-Sites. Ältere Unterlagen in Hilfe und Trailhead nennen das "B2B Commerce on Lightning Experience", neuere einfach "B2B Commerce".

```zeitleiste
2018-04-06 | Salesforce schließt die Übernahme von CloudCraze ab
Winter '21 | Version 4.13, die letzte Hauptversion von B2B Commerce for Visualforce
Spring '23 | Aura-Templates nur noch für Orgs, in denen Commerce vorher aktiviert war
Summer '25 | Für das Visualforce-Paket pflegt Salesforce nur noch Patch Notes
2026-06 | Neuerungen mit Headless, Buyer Agent und Quote to Cart, ohne das Visualforce-Paket
```

## Was muss ich über B2B Commerce for Visualforce wissen?

Die [Seite mit den Release Notes in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.b2b_commerce_release_notes.htm&type=5) listet Patch Notes für die Versionen 4.5 bis 4.13. Die neueste ist [Version 4.13 aus Winter '21](https://help.salesforce.com/s/articleView?language=en_US&id=sf.b2b_commerce_rn_2021_winter_patches.htm&type=5). Auf derselben Seite steht, dass Salesforce seit Summer '25 für B2B Commerce for Visualforce nur noch Patch Notes pflegt. Die [Liste der Installations-URLs](https://help.salesforce.com/s/articleView?id=000388718&language=en_US&type=1) nennt es "the B2B Commerce managed package" und rät, den neuesten Patch der eigenen Hauptversion zu installieren, weil Patches kumulativ sind.

Eine frühere Trailhead-Einheit zu B2B Commerce on Lightning Experience beantwortete die Frage, ob Kunden wechseln müssen, mit Nein: Salesforce unterstützt die Visualforce-Variante weiter. Das nehme ich so, wie es dasteht. Ich halte aber auch fest, dass die letzte gelistete Hauptversion aus Winter '21 stammt und dass die jüngsten Ankündigungen, etwa die [Neuerungen vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) mit Headless, Buyer Agent und Quote to Cart, das Visualforce-Paket nicht erwähnen.

Meine Lesart: Ein Visualforce-Shop läuft weiter und bekommt Fehlerbehebungen. Neue Fähigkeiten kommen auf der Kernplattform. Erfüllt Ihr Shop seinen Zweck und braucht Ihre Roadmap nichts Neues, gibt es keine Eile. Wollen Sie Agenten, die neue Suche oder Headless, führt der Weg zu einem Store auf der Kernplattform. Den würde ich als Neueinführung mit denselben fachlichen Anforderungen planen, nicht als Upgrade.

## Was unterscheidet Aura- und LWR-Stores?

Beide laufen auf derselben Kernplattform mit denselben Commerce-Daten: Buyer Accounts, Käufergruppen, Entitlement Policies, Preisbücher, Warenkörbe und Bestellungen. Sie unterscheiden sich im Frontend. Die [Key Differences im Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) nennen diese Punkte:

- **Komponenten.** Aura-Stores unterstützen Aura-Komponenten und Lightning Web Components. LWR-Stores unterstützen nur Lightning Web Components.
- **Gestaltung.** In Aura schreiben Sie eigene CSS-Klassen. In LWR nutzen Komponenten Shadow DOM, gestaltet wird über "--dxp"-Styling-Hooks, die auf das Theme-Panel abgebildet sind.
- **Datenzugriff.** Lightning Web Components holen Daten über Wire-Adapter. Aura nutzt eingeschränktere, formularbasierte Komponenten wie force:recordData.
- **Checkout.** Laut [Entwicklerleitfaden zum Aura-Checkout](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html) läuft der Checkout in Aura-Stores als Flow, den Sie im Flow Builder konfigurieren. LWR-Stores nutzen Salesforce Commerce Checkout, dessen Schritte Sie im Experience Builder einstellen.

Der [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) sagt, dass Orgs, in denen Commerce vor Spring '23 aktiviert war, weiter ein Aura-Template wählen können, dass Salesforce für neue Stores das B2B-LWR-Template empfiehlt und bestehenden Aura-Stores nahelegt, eine Migration zu prüfen.

## Gibt es ein Abkündigungsdatum für Aura oder Visualforce?

Nein. Stand 27. Oktober 2026 stehen weder Aura-Stores noch B2B Commerce for Visualforce in der [Liste der aktiven Produkt- und Funktionsabkündigungen](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), und der Migrationsleitfaden nennt kein Datum. Ich würde nur auf ein Datum reagieren, das Salesforce in der Hilfe oder in Release Notes veröffentlicht.

Deshalb plane ich nach Funktionen, nicht aus Angst. Ein typisches Szenario, als Annahme: Ein Hersteller betreibt seit 2022 einen Aura-Store für Ersatzteile, mit 15 eigenen Aura-Komponenten für die Teileliste pro Maschine und einem eigenen Checkout-Flow. Ein Wechsel zu LWR braucht dann einen konkreten Anlass:

```pro-contra
pro: Aura-Store behalten
- Der Shop funktioniert, die Händler nutzen ihn
- Kein veröffentlichtes Abkündigungsdatum
- Ohne Anlass kostet die Migration Geld und bringt denselben Shop
contra: Anlässe für LWR
- Das Unternehmen will den Buyer Agent
- Der nächste Partner soll nur noch Lightning Web Components bauen
- Der Aura-Code wächst mit jedem Release
```

Zwei Prüfungen gehören in jede Roadmap-Runde:

- **Welche neue Funktion wollen wir, und dokumentiert Salesforce sie für unser Store-Template?** Die Ankündigungen vom Juni 2026 nennen kein Template. Lassen Sie sich vom Partner die Seite in Hilfe oder Entwicklerdoku zeigen, die Ihren Store-Typ bestätigt.
- **Wie viel eigenen Aura-Code haben wir?** Jede Aura-Komponente ist ein Teil, das die [Migration](../b2b-store-aura-lwr-migrieren/) ersetzt. Je mehr es sind, desto größer der Umzug.

## Wie finde ich heraus, was wir betreiben?

Viele Hersteller wissen es nicht genau, weil ein Partner den Shop vor Jahren aufgesetzt hat. Drei Prüfungen liefern die Antwort in einer Stunde:

1. **Installierte Pakete.** Ist das B2B-Commerce-Managed-Package installiert und sind die Shopseiten Visualforce, betreiben Sie die Visualforce-Generation.
2. **Stores im Setup.** Stores auf der Kernplattform erscheinen im Setup unter Stores. Der [LWR-Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html) legt dort neue Stores mit dem Template "B2B Commerce (LWR)" an.
3. **Checkout und Komponenten.** Läuft der Checkout als Flow im Flow Builder, nutzt der Store das Aura-Template. Werden die Checkout-Schritte im Experience Builder eingestellt, ist es LWR. Die [Vorbereitung der Migration](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html) empfiehlt außerdem, die Aura-Komponenten im Setup unter Lightning Components durchzugehen.

Schreiben Sie das Ergebnis auf, mit der Zahl der eigenen Komponenten und dem Partner, der sie gebaut hat. Diese eine Seite ist die Grundlage für jede spätere Entscheidung.

## Wo starten Sie?

Stellen Sie fest, welche Generation Sie betreiben, und listen Sie die Funktionen auf Ihrer Roadmap für die nächsten zwei Jahre. Prüfen Sie dann pro Funktion, ob Salesforce sie für Ihren Store-Typ dokumentiert. Braucht nichts auf der Liste eine neue Generation, behalten Sie den Shop und investieren in Daten und Prozesse. Braucht etwas sie, planen Sie den Umzug mit Blick auf die [Releaseplanung für Salesforce-Releases](../../masterclass/devops-release-management/release-planung-salesforce-releases/), denn eine Store-Migration sollte nicht mit einem großen Release zusammenfallen. Die Kostenseite steht in [Kapitel 1 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/), der Umzug selbst in [Kapitel 5 zu Agenten, Migration und Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) und die Lizenzfrage für Käufer in [B2B Commerce Lizenzen für Käufer](../b2b-commerce-lizenzen-kaeufer/). Architekturentscheidungen wie diese gehören zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Kennen Sie Ihre Generation, bevor Sie über die Roadmap sprechen, und ziehen Sie erst um, wenn eine benötigte Funktion es verlangt.
