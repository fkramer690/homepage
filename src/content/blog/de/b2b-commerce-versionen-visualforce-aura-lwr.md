---
title: "B2B Commerce Versionen: Visualforce, Aura oder LWR?"
description: "Welche Generation von Salesforce B2B Commerce Sie betreiben, Visualforce-Paket, Aura- oder LWR-Store, wie Sie es herausfinden und was daraus folgt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-commerce-versionen-visualforce-aura-lwr
translationKey: commerce-versions-visualforce-aura-lwr
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Visualforce, Aura, LWR, CloudCraze, Migration]
takeaways:
  - "B2B Commerce gibt es in drei Generationen: das Visualforce-Paket aus der CloudCraze-Übernahme 2018 und Stores mit Aura- oder LWR-Template."
  - "Die neueste dokumentierte Hauptversion für B2B Commerce for Visualforce ist 4.13 aus Winter '21. Seit Summer '25 gibt es nur noch Patch Notes."
  - "Laut Migrationsleitfaden erhalten nur Orgs Aura-Templates, in denen Commerce vor Spring '23 aktiviert war. Für neue Stores wird LWR empfohlen."
  - "Stand 9. November 2026 fand ich kein öffentliches Abkündigungsdatum für Aura-Stores oder das Visualforce-Paket. Planen Sie nach Funktionen und Betriebsrisiken."
faq:
  - q: "Was ist der Unterschied zwischen B2B Commerce for Visualforce und B2B Commerce auf Lightning?"
    a: "B2B Commerce for Visualforce ist das Managed Package, das aus CloudCraze hervorging und Shopseiten in Visualforce nutzt. B2B Commerce auf der Kernplattform setzt den Shop als Experience-Cloud-Site mit Experience Builder um, auf Basis eines Aura- oder LWR-Templates."
  - q: "Wird B2B Commerce for Visualforce abgekündigt?"
    a: "Stand 9. November 2026 fand ich kein öffentliches Abkündigungsdatum, und das Paket steht nicht auf der Liste der aktiven Abkündigungen. Diese Liste ist nicht vollständig, prüfen Sie deshalb auch Mitteilungen von Salesforce an Ihre Org. Die neueste in der Hilfe gelistete Hauptversion ist 4.13 aus Winter '21, seit Summer '25 pflegt Salesforce nur noch Patch Notes."
  - q: "Kann ich noch einen B2B-Commerce-Store mit Aura-Template anlegen?"
    a: "Laut LWR-Migrationsleitfaden nur, wenn Commerce in Ihrer Org vor Spring '23 aktiviert war. Andere Hilfeseiten sagen lediglich, dass neue B2B-Stores LWR nutzen. Prüfen Sie deshalb, welche Templates Ihre Org anbietet. Für neue Stores empfiehlt Salesforce das Template B2B Commerce (LWR)."
  - q: "Wie finde ich heraus, welche B2B-Commerce-Version wir betreiben?"
    a: "Beginnen Sie mit der URL des produktiven Stores und suchen Sie die zugehörige Site und den Store. Ein installiertes B2B-Commerce-Managed-Package deutet nur dann auf Visualforce, wenn die Seiten des produktiven Stores Visualforce nutzen. Bei Standard-Stores auf der Kernplattform zeigt der Checkout die Architektur: Aura-Stores konfigurieren ihn als Flow im Flow Builder, LWR-Stores die Checkout-Schritte im Experience Builder."
draft: false
---

Für die Roadmap zählt: Salesforce B2B Commerce gibt es in drei Generationen. Die älteste ist B2B Commerce for Visualforce, ein Managed Package, das mit der Übernahme von CloudCraze 2018 kam. Die beiden neueren Generationen laufen auf der Kernplattform als Experience-Cloud-Stores, gebaut mit einem Aura- oder einem LWR-Template. Laut Migrationsleitfaden erhalten nur Orgs Aura-Templates, in denen Commerce vor Spring '23 aktiviert war, und für neue Stores empfiehlt Salesforce LWR. Stand 9. November 2026 fand ich kein öffentliches Abkündigungsdatum für Aura-Stores oder das Visualforce-Paket. Welche Generation Sie betreiben, entscheidet, wie viel von der aktuellen Roadmap bei Ihrem Shop ankommt.

## Welche Generationen von B2B Commerce gibt es?

Salesforce B2B Commerce, das in einigen Salesforce-Inhalten wie Trailhead auch "Agentforce Commerce for B2B" genannt wird, hat eine Geschichte, die viel Verwirrung in Projekten erklärt:

| Generation | Technik | Stand Oktober 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed Package aus CloudCraze (übernommen 2018), Visualforce-Seiten | Neueste dokumentierte Hauptversion 4.13 (Winter '21), nur noch Patch Notes |
| B2B Commerce, Aura-Store | Kernplattform, Experience-Cloud-Site, Aura-Template | Neue Aura-Stores nur in Orgs, in denen Commerce vor Spring '23 aktiviert war |
| B2B Commerce, LWR-Store | Kernplattform, Experience-Cloud-Site, LWR-Template | Empfohlen für neue Stores |

Salesforce hat den Abschluss der [Übernahme von CloudCraze](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) am 6. April 2018 gemeldet und CloudCraze als B2B-Commerce-Plattform beschrieben, die nativ auf Salesforce basiert. Dieses Produkt lief als B2B Commerce for Visualforce weiter. Später hat Salesforce B2B Commerce in die Kernplattform geholt, mit eigenen Objekten für Stores, Käufergruppen, Warenkörbe und Bestellungen und mit Storefronts als Experience-Cloud-Sites. Ältere Unterlagen in der Hilfe und in Trailhead nennen das "B2B Commerce on Lightning Experience", neuere einfach "B2B Commerce".

```zeitleiste
2018-04-06 | Salesforce schließt die Übernahme von CloudCraze ab
Winter '21 | Version 4.13, die neueste dokumentierte Hauptversion von B2B Commerce for Visualforce
Spring '23 | Aura-Templates nur noch für Orgs, in denen Commerce vor Spring '23 aktiviert war
Summer '25 | Für das Visualforce-Paket pflegt Salesforce nur noch Patch Notes
2026-06 | Neuerungen mit Headless, Buyer Agent und Quote to Cart
```

## B2B Commerce for Visualforce bekommt nur noch Patches

Die [Seite mit den Release Notes in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.b2b_commerce_release_notes.htm&type=5) listet Patch Notes für die Versionen 4.5 bis 4.13. Die neueste ist [Version 4.13 aus Winter '21](https://help.salesforce.com/s/articleView?language=en_US&id=sf.b2b_commerce_rn_2021_winter_patches.htm&type=5). Auf derselben Seite steht, dass Salesforce seit Summer '25 für B2B Commerce for Visualforce nur noch Patch Notes pflegt. Die [Liste der Installations-URLs](https://help.salesforce.com/s/articleView?id=000388718&language=en_US&type=1) nennt das Paket "the B2B Commerce managed package" und rät, den neuesten Patch der eigenen Hauptversion zu installieren, weil Patches kumulativ sind.

Eine frühere Trailhead-Einheit zu B2B Commerce on Lightning Experience beantwortete die Frage, ob Kunden wechseln müssen, mit Nein: Salesforce unterstützt die Visualforce-Variante weiter. Diese Einheit ist nicht mehr online und war nicht datiert, deshalb würde ich mich nicht allein darauf stützen. Ich halte aber auch fest, dass die neueste gelistete Hauptversion aus Winter '21 stammt und dass die jüngsten Ankündigungen, etwa die [Neuerungen vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) mit Headless, Buyer Agent und Quote to Cart, das Visualforce-Paket nicht erwähnen.

Meine Lesart: Ein Visualforce-Shop läuft weiter, aber die öffentliche Dokumentation verspricht weder einen regelmäßigen Patch-Zyklus noch eine weitere Hauptversion. Neue Funktionen erscheinen auf der Kernplattform. Erfüllt Ihr Shop seinen Zweck und stehen auf Ihrer Roadmap keine neuen Funktionen, gibt es keine funktionsbedingte Frist. Prüfen Sie trotzdem Sicherheitsbefunde, Partnerkompetenzen und Integrationen, bevor Sie sich für den Verbleib entscheiden. Wollen Sie Agenten, die neue Suche oder Headless nutzen, führt der Weg nach meiner Erwartung zu einem Store auf der Kernplattform. Prüfen Sie aber für jede Funktion die unterstützte Store-Architektur in der Produktdokumentation. Den Wechsel würde ich als Neueinführung auf Basis derselben fachlichen Anforderungen planen.

## Was unterscheidet Aura- und LWR-Stores?

Beide laufen auf derselben Kernplattform mit denselben Commerce-Daten: Buyer Accounts, Käufergruppen, Entitlement Policies, Preisbücher, Warenkörbe und Bestellungen. Sie unterscheiden sich im Frontend. Der [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) nennt folgende wesentliche Unterschiede:

- **Komponenten.** Aura-Stores unterstützen Aura-Komponenten und Lightning Web Components. LWR-Stores unterstützen nur Lightning Web Components.
- **Gestaltung.** In Aura schreiben Sie eigene CSS-Klassen. In LWR nutzen Komponenten Shadow DOM, gestaltet wird über "--dxp"-Styling-Hooks, die auf das Theme-Panel abgebildet sind.
- **Datenzugriff.** Lightning Web Components holen Daten typischerweise über Wire-Adapter. Aura nutzt eingeschränktere, formularbasierte Komponenten wie force:recordData.
- **Checkout.** Laut [Entwicklerleitfaden zum Aura-Checkout](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html) läuft der Checkout in Aura-Stores als Flow, den Sie im Flow Builder konfigurieren. LWR-Stores nutzen Salesforce Commerce Checkout, dessen Schritte Sie im Experience Builder einstellen.

Der [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) sagt, dass Orgs, in denen Commerce vor Spring '23 aktiviert war, weiter ein Aura-Template wählen können, dass Salesforce für neue Stores das B2B-LWR-Template empfiehlt und dass Salesforce bestehenden Aura-Stores nahelegt, eine Migration zu prüfen.

## Gibt es ein Abkündigungsdatum für Aura oder Visualforce?

Keines, das ich finden konnte. Stand 9. November 2026 stehen weder Aura-Stores noch B2B Commerce for Visualforce in der [Liste der aktiven Produkt- und Funktionsabkündigungen](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), und der Migrationsleitfaden nennt kein Datum. Diese Liste ist allerdings nicht vollständig: Salesforce kündigt Abkündigungen auch in Release Notes und direkten Kundenmitteilungen an. Prüfen Sie deshalb Ihren Vertrag und die Mitteilungen an Ihre Org, und handeln Sie nicht aufgrund von Gerüchten.

Meine Planung richte ich daher an Funktionen aus. Rechenbeispiel: Ein Hersteller betreibt seit 2022 einen Aura-Store für Ersatzteile, mit 15 eigenen Aura-Komponenten für die Teileliste pro Maschine und einem eigenen Checkout-Flow. Ein Wechsel zu LWR braucht dann einen konkreten Anlass:

```pro-contra
pro: Aura-Store behalten
- Der Shop funktioniert, die Händler nutzen ihn
- Kein veröffentlichtes Abkündigungsdatum
- Ohne Anlass kostet die Migration Geld und führt am Ende zum gleichen Shop
contra: Anlässe für LWR
- Das Unternehmen will den Buyer Agent, der eigene Lizenzvoraussetzungen hat
- Der nächste Partner soll nur noch Lightning Web Components bauen
- Jede neue Aura-Erweiterung erhöht den späteren Migrationsaufwand
```

Zwei Prüfungen gehören in jede Roadmap-Runde:

- **Welche neue Funktion wollen wir, und dokumentiert Salesforce sie für unser Store-Template?** Die Ankündigungen vom Juni 2026 nennen kein Template. Lassen Sie sich vom Partner die Hilfe- oder Entwicklerseite zeigen, die bestätigt, dass die Funktion Ihren Store-Typ unterstützt.
- **Wie viel eigenen Aura-Code haben wir?** Die [Migration](../b2b-store-aura-lwr-migrieren/) bedeutet einen neuen LWR-Store, und jede eigene Aura-Komponente muss ersetzt oder entfernt werden. Die Komponenten sind ein Kostentreiber; weitere sind Checkout, Integrationen, Gestaltung, URLs und die Umstellung selbst.

## In einer Stunde herausfinden, was Sie betreiben

Viele Hersteller wissen es nicht genau, weil ein Partner den Shop vor Jahren aufgesetzt hat. Drei Prüfungen liefern die Antwort meist in einer Stunde. Beginnen Sie mit der URL des produktiven Stores, denn eine Org kann alte Pakete und mehrere Stores enthalten:

1. **Installierte Pakete.** Ist das B2B-Commerce-Managed-Package installiert und sind die Shopseiten Visualforce-Seiten, betreiben Sie die Visualforce-Generation.
2. **Stores im Setup.** Stores auf der Kernplattform erscheinen im Setup unter Stores. Der [LWR-Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html) beschreibt, wie Sie dort neue Stores mit dem Template "B2B Commerce (LWR)" anlegen.
3. **Checkout und Komponenten.** Läuft der Checkout als Flow im Flow Builder, nutzt der Store das Aura-Template. Werden die Checkout-Schritte im Experience Builder eingestellt, ist es LWR. Die [Vorbereitung der Migration](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html) empfiehlt außerdem, die Aura-Komponenten im Setup unter Lightning Components durchzugehen.

Notieren Sie das Ergebnis, die Zahl der eigenen Komponenten und den Partner, der sie gebaut hat. Diese eine Seite ist die Grundlage für jede spätere Entscheidung.

## Generation feststellen und Roadmap-Funktionen prüfen

Stellen Sie fest, welche Generation Sie betreiben, und listen Sie die Funktionen auf Ihrer Roadmap für die nächsten zwei Jahre. Prüfen Sie dann pro Funktion, ob Salesforce sie für Ihren Store-Typ dokumentiert. Erfordert keine Funktion auf der Liste eine neue Generation, behalten Sie den Shop und investieren in Daten und Prozesse. Braucht etwas davon eine neue Generation, planen Sie den Umzug mit Blick auf die [Releaseplanung für Salesforce-Releases](../../masterclass/devops-release-management/release-planung-salesforce-releases/), denn eine Store-Migration sollte nicht mit einem großen Release zusammenfallen. Die Kostenseite finden Sie in [Kapitel 1 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/), den Umzug selbst in [Kapitel 5 zu Agenten, Migration und Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) und die Lizenzfrage für Käufer in [B2B Commerce Lizenzen für Käufer](../b2b-commerce-lizenzen-kaeufer/). Architekturentscheidungen wie diese gehören zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
