---
title: "Nachbestellen im B2B-Shop: Vorlagen, CSV, Reorder"
description: "Wie Händler in Salesforce B2B Commerce am schnellsten nachbestellen: alte Bestellung in den Warenkorb, Vorlagen, CSV-Import, Warenkorblimits, Reorder Portal."
pubDate: 2026-10-28
lang: de
slug: nachbestellen-b2b-shop-vorlagen
translationKey: commerce-reorder-order-templates
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Nachbestellung, Bestellvorlagen, Warenkorb, Ersatzteile, Händler]
takeaways:
  - "Nachbestellen geht auf vier Wegen: alte Bestellung in den Warenkorb, Bestellvorlagen, CSV- oder JSON-Datei in den Warenkorb und das Reorder Portal."
  - "Die Add Order to Cart API kopiert alle Positionen einer früheren Order Summary in den aktuellen Warenkorb und legt einen an, wenn keiner aktiv ist."
  - "Bestellvorlagen führt Salesforce als GA September 2026. Import und Export des Warenkorbs per CSV oder JSON kamen mit dem Release vom Juli 2026."
  - "Ein Warenkorb fasst meist 500 Positionen, mit Large-Cart-Unterstützung 2.000. Ein Nutzer kann einen aktiven und bis zu 99 weitere Warenkörbe haben."
  - "Multi-Cart-Zusammenarbeit, bei der mehrere Nutzer einen Warenkorb gemeinsam füllen und freigeben, ist für Januar 2027 angekündigt."
faq:
  - q: "Wie bestellt ein Händler in Salesforce B2B Commerce eine frühere Bestellung nach?"
    a: "Die Add Order to Cart API legt alle Positionen einer früheren Order Summary in den aktuellen Warenkorb und erzeugt einen neuen Warenkorb, wenn keiner aktiv ist. Danach ändert der Käufer Mengen und geht wie gewohnt zum Checkout."
  - q: "Was sind Bestellvorlagen in B2B Commerce?"
    a: "Mit Bestellvorlagen (Order Templates) erstellen, speichern und verwenden Käufer und Vertriebsmitarbeiter häufige Bestellungen wieder. Salesforce führt sie auf der Commerce-Innovationsseite als GA September 2026."
  - q: "Wie viele Positionen passen in einen B2B-Commerce-Warenkorb?"
    a: "Laut den Salesforce-Limits begrenzen die meisten Shops den Warenkorb auf 500 Positionen pro Bestellung. Mit aktivierter Large-Cart-Unterstützung verarbeitet ein Shop bis zu 2.000 Positionen pro Bestellung."
  - q: "Was ist das Salesforce Reorder Portal?"
    a: "Ein kleiner Commerce-Dienst, der Käufer auf ihre früheren Bestellungen konzentriert. Der Vertrieb lädt Käufer über Sales Cadences oder aus dem Auftragsdatensatz ein. Für die Anbindung an Sales Cloud braucht es eine Agentforce-Commerce-Lizenz und eine aktivierte Digital Experience."
  - q: "Können mehrere Personen beim Händler am selben Warenkorb arbeiten?"
    a: "Salesforce kündigt Multi-Cart-Zusammenarbeit für Januar 2027 an: Mehrere Nutzer bearbeiten denselben Warenkorb gleichzeitig, mit Rollenrechten und Audit-Trail. Bis dahin planen Sie mit einem Warenkorb pro Nutzer."
draft: false
---

Händler bestellen in Salesforce B2B Commerce am schnellsten nach, wenn der Shop den Weg anbietet, der zu ihrer Art des Einkaufs passt. Für "dasselbe wie letztes Mal" gibt es die Add Order to Cart API, die eine frühere Bestellung in den Warenkorb kopiert. Für wiederkehrende Körbe, etwa Verbrauchsmaterial jedes Quartal, gibt es Bestellvorlagen, laut Salesforce GA im September 2026. Für lange Listen aus dem eigenen System des Händlers gibt es den Warenkorbimport per CSV oder JSON aus dem Release vom Juli 2026. Ein Warenkorb fasst in den meisten Shops 500 Positionen, mit Large-Cart-Unterstützung 2.000. Gemeinsame Warenkörbe für Freigaben im Team sind für Januar 2027 angekündigt.

## Warum entscheidet das Nachbestellen, ob Händler den Shop nutzen?

Die meisten Ersatzteile und Verbrauchsmaterialien, die ein Händler kauft, hat er schon einmal gekauft. Er kennt die Teilenummer, oft die Menge, und will die Bestellung in einer Minute erledigt haben. Muss er jedes Teil im Shop neu suchen, geht er zurück zu E-Mail und Telefon, und der Innendienst tippt die Bestellung wie bisher ins ERP.

Deshalb schaue ich mir in einem B2B-Shop eines Herstellers die Wege zum Nachbestellen vor der Produktdetailseite an. Suche und Katalog sind für neue Teile wichtig, das Volumen kommt über Nachbestellungen. Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B"; alle Funktionen unten gehören zum selben Produkt.

## Vier Wege zum Nachbestellen in Salesforce B2B Commerce

| Weg | Was der Käufer tut | Stand Oktober 2026 |
|---|---|---|
| Alte Bestellung in den Warenkorb | Wählt eine Bestellung aus der Historie, alle Positionen landen im Warenkorb | Verfügbar, API dokumentiert |
| Bestellvorlagen | Speichert eine häufige Bestellung und nutzt sie wieder | Als GA September 2026 geführt |
| Warenkorb importieren und exportieren | Lädt eine CSV- oder JSON-Datei hoch, exportiert den Warenkorb zur Freigabe | Release Juli 2026 |
| Multi-Cart-Zusammenarbeit | Mehrere Nutzer füllen und geben einen Warenkorb frei | Für Januar 2027 angekündigt |
| Reorder Portal | Nutzt eine kleine Seite, die auf frühere Bestellungen ausgerichtet ist | Verfügbar, Trailhead-Modul |

**Alte Bestellung in den Warenkorb.** Zu den [Order-Summary-APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html) gehört Add Order to Cart. Die API vereinfacht laut Salesforce das Nachbestellen, indem sie alle Positionen einer Order Summary direkt in den aktuellen Warenkorb legt. Gibt es keinen aktiven Warenkorb, legt sie einen an.

```hinweis achtung
Wie Positionen behandelt werden, die nicht mehr bestellbar sind, steht nicht in der Dokumentation. Eine ersetzte Teilenummer sollten Sie also in der Sandbox testen, nicht voraussetzen.
```

Eine Folge für Hersteller: Die API arbeitet mit Order Summaries in Salesforce. Eine Telefonbestellung, die nur in SAP existiert, ist keine Order Summary, also kann der Händler sie nicht aus der Shop-Historie nachbestellen. Erwarten Händler, alle ihre Aufträge zu sehen, wird daraus eine Integrationsentscheidung, die ins Masterclass-Kapitel [ERP-Anbindung](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) gehört.

**Bestellvorlagen.** Auf der [Commerce-Innovationsseite](https://www.salesforce.com/de/commerce/innovations/) führt Salesforce wiederverwendbare Bestellungen mit "AV Sept. 26": Einkäufer und Vertriebsmitarbeiter erstellen, speichern und verwenden häufig vorkommende Bestellungen wieder. Das passt zu Händlern mit festem Korb, etwa dem Filter- und Dichtungssatz für jeden Wartungseinsatz.

**Warenkorb importieren und exportieren.** Das [B2B-Commerce-Release vom Juli 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) brachte Import und Export des Warenkorbs als CSV oder JSON. Käufer laden eine vorbereitete Tabelle in den Warenkorb und exportieren den Warenkorb mit einem Klick zur internen Freigabe. Für Händler, die ihren Bestand im eigenen Warenwirtschaftssystem planen, ist eine Datei schneller als Klicken im Shop.

## 500 Positionen pro Warenkorb, 2.000 mit Large Cart

Die [Warenkorblimits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-cart-limits.html) setzen den Rahmen für Importe und Vorlagen. Die Zahl der Warenkörbe pro Nutzer ist ein Soft Limit, das der Salesforce-Support erhöhen kann.

```kennzahlen
500 | Positionen pro Warenkorb in den meisten Shops
2.000 | Positionen mit aktivierter Large-Cart-Unterstützung
100 | Warenkörbe pro Nutzer, ein aktiver und bis zu 99 weitere
7 Tage | Gültigkeit eines laufenden Checkouts, höchstens 30 Tage
quelle: Salesforce Developer Documentation, Cart Limits, Stand Oktober 2026
```

500 Positionen klingen nach viel, bis ein Händler die Jahresbestellung für eine neue Filiale importiert. Bevor jemand "Laden Sie Ihre ganze Liste hoch" verspricht, würde ich aus dem ERP holen, wie lang die längsten Bestellungen wirklich sind, und mit dieser Zahl über Large Carts entscheiden. Lange Warenkörbe bedeuten auch lange Preis- und Bestandsabfragen ans ERP im Checkout, und die haben eigene Grenzen bei der Antwortzeit.

## Wie geben Händlerteams einen Warenkorb gemeinsam frei?

Bei größeren Händlern füllt ein Techniker oder Lagerist den Warenkorb, und jemand im Einkauf gibt ihn frei. Heute deckt der Export das ab: Der Warenkorb geht per E-Mail raus, kommt freigegeben zurück, und der Käufer schließt ab.

Salesforce führt Multi-Cart-Zusammenarbeit auf der Innovationsseite mit "AV Jan. 27": Mehrere Nutzer füllen und prüfen denselben Warenkorb gleichzeitig. Die [Winter '27 Release Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) nennen dazu Echtzeit-Synchronisierung, Rollenrechte und einen Audit-Trail. Ich würde jetzt keinen eigenen Freigabeprozess bauen, den der Standard in wenigen Monaten ersetzt. Ist die Freigabe für einen Go-live vor Januar Pflicht, ist der Export die Brücke.

## Wann reicht das Reorder Portal?

Das Reorder Portal ist eine schlankere Variante für Unternehmen, die keinen vollständigen Shop wollen. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal) ist es ein Commerce-Microservice, der Käufer auf ihre früheren Bestellungen ausrichtet: Bestellungen ansehen, Mengen ändern, neu bestellen, Status prüfen. Der Vertrieb lädt Käufer über Sales Cadences oder aus dem Auftragsdatensatz ein. Für die Anbindung an Sales Cloud braucht es eine Agentforce-Commerce-Lizenz und eine aktivierte Digital Experience; laut Trailhead ist das Portal in 30 Minuten installiert und eingerichtet, aufgebaut aus einer Vorlage mit LWR-Komponenten.

Meine Sicht: Das Reorder Portal passt, wenn ein Vertriebsteam Wiederholungsbestellungen von einigen hundert Bestandskunden will und kein Katalogprojekt hat. Sobald Händler neue Teile finden, eigene Sortimente sehen oder lange Listen importieren sollen, ist der vollständige Shop die bessere Grundlage.

## Rechenbeispiel: 180 Händler, zwei Drittel Wiederholungen

Ein Kompressorenhersteller hat 180 Händler. Zwei Drittel ihrer Ersatzteilbestellungen wiederholen eine frühere Bestellung mit kleinen Änderungen, ein Viertel sind Wartungssätze mit festem Inhalt, und einige große Händler schicken zweimal im Jahr Listen mit 300 bis 800 Positionen aus ihrem eigenen System.

Für diese Mischung würde ich alle drei Wege einschalten: alte Bestellung in den Warenkorb für die Wiederholungen, Bestellvorlagen für die Wartungssätze, CSV-Import für die großen Händler, mit Large-Cart-Unterstützung, weil 800 Positionen über den üblichen 500 liegen. Drei Monate lang würde ich messen, welche Käufergruppe welchen Weg nutzt, bevor ich weiter investiere. Gemeinsame Warenkörbe für die großen Händler kommen mit dem Release im Januar 2027.

## Erster Schritt: Bestellpositionen der letzten zwölf Monate sortieren

Holen Sie die Bestellpositionen der letzten zwölf Monate aus dem ERP und sortieren Sie sie in Wiederholungen, feste Körbe und lange Listen. Daran sehen Sie, welcher Weg am meisten zählt und ob 500 Positionen reichen. Wie die Bestellung danach mit Bestellnummer und Kreditprüfung den Shop verlässt, steht in [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/). Nachbestellen im Chat über WhatsApp ist Thema von [B2B Buyer Agent](../b2b-buyer-agent-whatsapp-bestellen/), Nachschubvorschläge aus Händlerbeständen beschreibe ich in [Agentforce für Händlerbestand und Nachschub](../haendlerbestand-nachschub-agentforce/). Das Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) bringt diese Entscheidungen zusammen, und das Zielbild über Shop, ERP und Vertrieb gehört zu meiner Arbeit an der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
