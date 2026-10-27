---
title: "Ersatzteilshop: nur Teile zur eigenen Maschine zeigen"
description: "Wie ein Store in Salesforce B2B Commerce Händlern nur die Ersatzteile zur installierten Maschine zeigt: Entitlement-Limits, Maschinenseite, Endpoint Extensions."
pubDate: 2026-10-28
lang: de
slug: ersatzteilshop-teile-pro-maschine
translationKey: commerce-spare-parts-per-machine
topic: commerce
categories: [b2b-commerce, field-service]
tags: [B2B Commerce, Ersatzteile, installierte Basis, Assets, PLM, Endpoint Extensions]
takeaways:
  - "Entitlements in Salesforce B2B Commerce wirken pro Käufergruppe, nicht pro Seriennummer, und können deshalb nicht beantworten, welche Teile zu einer bestimmten Maschine passen."
  - "Eine Käufergruppe pro Maschine scheitert an festen Limits: 2.000 Buyer Entitlements pro Produkt und standardmäßig 20 Käufergruppen pro Käuferkonto."
  - "Robust ist eine Maschinenseite: Eine eigene Lightning-Web-Komponente listet die Anlagen des Händlers und die Ersatzteile zu jeder davon, aus Salesforce oder dem PLM."
  - "Suchergebnisse pro Maschine zu filtern geht über Endpoint Extensions, die Basisklasse ist aber noch als Beta markiert, und nachträgliches Filtern reißt Lücken in Ergebnisseiten."
  - "Der Händler sieht nur Maschinen, die auf sein eigenes Konto registriert sind, gelesen aus dem Asset-Datensatz und nie als Freitext eingegeben."
faq:
  - q: "Können Entitlements in B2B Commerce Teile nach Seriennummer einschränken?"
    a: "Nein. Entitlement Policies geben Käufergruppen Zugriff auf Produkte. Eine Seriennummer gehört zu einer installierten Maschine, meist einem Asset-Datensatz, und B2B Commerce hat keine Standardverbindung zwischen Assets und Entitlements."
  - q: "Was ist eine Maschinenseite in einem Ersatzteilshop?"
    a: "Eine eigene Seite im Store, die die auf das Händlerkonto registrierten Maschinen zeigt und zu jeder Maschine die passenden Ersatzteile. Die Teileliste kommt aus Asset-Datensätzen oder live aus dem PLM, und der Händler legt die Teile von dort in den Warenkorb."
  - q: "Was sind Commerce Endpoint Extensions?"
    a: "Apex-Klassen, die Anfrage oder Antwort eines einzelnen Commerce-Connect-API-Endpunkts ändern, zum Beispiel der Produktsuche. Salesforce nennt unter anderem Commerce_Endpoint_Search_ProductSearch und Commerce_Endpoint_Catalog_Products. Das Standardverhalten des Endpunkts ersetzen sie nicht."
  - q: "Können Händler im Experience-Cloud-Store Assets sehen?"
    a: "Laut Salesforce-Hilfe enthalten die Lizenzen Customer Community Plus und Partner Community Lese-, Anlage- und Bearbeitungsrechte auf Assets. Welche Assets ein Händler sieht, ist dann eine Frage der Freigabe, die dem Konto folgen sollte, auf das die Maschine registriert ist."
draft: false
---

Ein Store in Salesforce B2B Commerce kann Ersatzteile im Standard nicht nach Seriennummer filtern. Entitlements regeln die Sichtbarkeit pro Käufergruppe, und feste Limits schließen eine Gruppe pro Maschine aus. Was funktioniert, ist eine Maschinenseite: Eine eigene Komponente zeigt die Maschinen, die auf das Händlerkonto registriert sind, und zu jeder die Teile, aus Salesforce-Assets oder live aus dem PLM, mit Button für den Warenkorb. Die normale Suche pro Maschine zu filtern geht über Endpoint Extensions, deren Basisklasse aber noch als Beta markiert ist. Wichtiger als die Komponente sind die Daten: Ohne Stückliste pro Seriennummer kann kein Shop die Frage beantworten.

## Warum lösen Entitlements das Thema Teile pro Maschine nicht?

In Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen auch als "Agentforce Commerce for B2B" vermarktet, funktioniert Sichtbarkeit als Kette. Ein Käuferkonto gehört zu Käufergruppen, und laut [Trailhead zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) legen Entitlement Policies fest, welche Produkte ein Käufer anhand seiner Gruppenmitgliedschaften sieht. Das beantwortet "Darf dieser Händler dieses Teil kaufen?", also eine Frage über den Händler.

"Passt dieses Teil in diese Maschine?" ist eine Frage über die Maschine. Ein Händler mit 40 installierten Maschinen aus fünf Baureihen braucht für jede eine andere Teileliste, und eine Dichtung für Baureihe A ist vielleicht auch für Baureihe B als Ersatz bestellbar. Ein Entitlement sagt ja oder nein pro Produkt und Käufergruppe, ohne Maschine dazwischen.

Der naheliegende Umweg ist eine Käufergruppe pro Maschine. Die [Entitlement-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) beenden das schnell: Ein Produkt kann 2.000 Buyer Entitlements haben, als festes Limit, und bei der Suchindexierung werden nur die ersten 2.000 Käufergruppen eines Produkts in den Index übernommen. Eine Standardschraube, die in 6.000 Maschinen verbaut ist, wäre nur für ein Drittel davon auffindbar. Dazu erlauben die [Käufergruppen-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) standardmäßig 20 Käufergruppen pro Käuferkonto, 30 mit einer Apex-Extension. Ein Händler mit 40 Maschinen passt nicht hinein.

Entitlements bleiben also bei dem, was sie gut können: welche Länder, Stufen und Marken welche Teile kaufen dürfen. Wie man diese Gruppen schneidet, steht in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/).

## Welche Daten braucht eine Teileliste pro Maschine?

Drei Quellen, dieselben wie beim [KI-Agenten für Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/):

- **Installierte Basis in Salesforce.** Die Maschine als Asset mit Seriennummer, Konto und Maschinentyp, am besten als Asset-Hierarchie mit Hauptbaugruppen. Das ist der Anker für den Händler: Welche Maschinen gehören zu mir?
- **As-built-Stückliste aus dem PLM.** Die Stückliste der ausgelieferten Maschine mit den tatsächlich verbauten Varianten und Revisionen, dazu ein Kennzeichen für ersatzteilrelevante Positionen.
- **Materialdaten aus dem ERP.** Materialnummer, Nachfolgematerial und Vertriebsstatus. Preise und Verfügbarkeit kommen über den üblichen Weg für Preise und Bestand in den Store.

Die dritte Quelle vergessen Projekte gern. Ein Teil, das laut PLM verbaut ist, kann seit Jahren ersetzt sein. Wird der Nachfolger nicht aufgelöst, bevor der Shop das Teil zeigt, bestellt der Händler etwas, das es nicht mehr gibt. Auch verbrauchte Teile auf abgeschlossenen Arbeitsaufträgen verändern die Maschine mit der Zeit. Warum sie ins System gehören, erklärt [Ersatzteile im Außendienst: ERP oder Salesforce](../salesforce-field-service-ersatzteile-erp/).

## Option A: eine Maschinenseite mit eigener Komponente

Mit der Maschinenseite würde ich anfangen. Eine Lightning-Web-Komponente auf einer eigenen Store-Seite listet die Assets des Kontos, zu dem der angemeldete Käufer gehört. Der Händler wählt eine Maschine, sieht ihre Hauptbaugruppen und die ersatzteilrelevanten Positionen und legt Teile in den Warenkorb. LWR-Stores, die Salesforce für neue Stores empfiehlt, unterstützen laut [LWR-Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) nur Lightning-Web-Komponenten, die Komponente entsteht also von Anfang an so.

Woher die Teileliste kommt, bestimmt den Aufwand:

- **Aus Salesforce.** Ersatzteilrelevante Positionen liegen pro Asset oder pro Maschinentyp vor, etwa als untergeordnete Assets oder in einem eigenen Objekt. Schnell und einfach, aber jede Position ist ein Datensatz, der geladen und mit dem PLM synchron gehalten werden muss.
- **Live aus dem PLM.** Die Komponente ruft eine Apex-Methode auf, die eine Teile-API im PLM oder in der Middleware für die Seriennummer abfragt. Keine Kopie, immer aktuell, aber das PLM muss in der Zeit antworten, die ein Händler auf eine Seite wartet.

In beiden Fällen liefert die Komponente nur Teilenummern. Ob der Händler ein Teil kaufen darf und zu welchem Preis, kommt weiter aus den Entitlements und der Preisfindung des Stores. Ein Teil, das das PLM nennt, für das die Käufergruppe des Händlers aber nicht freigeschaltet ist, sollte als "auf Anfrage" erscheinen, statt kommentarlos zu verschwinden.

Der Vorteil der Maschinenseite: Sie greift nicht in Standardsuche und Produktseiten ein, Salesforce-Releases brechen sie also selten. Der Nachteil: Wer eine Teilenummer ins Suchfeld tippt, sieht weiterhin jedes Teil, das seine Käufergruppe kaufen darf, ob es passt oder nicht.

## Option B: Suche und Produktlisten pro Maschine filtern

Für genau solche Änderungen bietet Salesforce Endpoint Extensions. Laut [Extensions Guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) ändern sie Anfrage und Antwort eines Connect-API-Endpunkts, ersetzen sein Standardverhalten aber nicht. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) enthält `Commerce_Endpoint_Search_ProductSearch` für die Produktsuche und `Commerce_Endpoint_Catalog_Products` für Produktlisten. Eine After-Methode könnte aus der Antwort jedes Produkt entfernen, das nicht in der Teileliste der vom Händler gewählten Maschine steht.

Ich würde das nur als zweiten Schritt nutzen, aus drei Gründen:

1. **Beta-Status.** Die [Apex-Referenz](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) nennt die Basisklasse "BaseEndpointExtension (Beta)", auch für API-Version 67.0. Salesforce garantiert nicht, dass Beta-Funktionen allgemein verfügbar werden.
2. **Verzerrte Ergebnisse.** Die Suche liefert laut [Such-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) höchstens 200 Ergebnisse pro Seite. Entfernt die Extension danach 150 davon, zeigt die Seite 50, und nach meiner Einschätzung passen Facettenzahlen und Trefferzahl nicht mehr zu dem, was der Händler sieht.
3. **Geschwindigkeit.** Jede Suche braucht dann die Teileliste der gewählten Maschine. Ohne Zwischenspeicher in Salesforce landet jeder Tastendruck im PLM.

Ein Mittelweg kommt ohne Extensions aus: Die Maschinenseite setzt einen Suchfilter auf ein Attribut wie die Baureihe. Das funktioniert nur, wenn Teile die Baureihe als filterbares Attribut tragen und die Baureihe genau genug ist. Wie Attribute und Synonyme für Teilenummern eingerichtet werden, steht in [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/).

## Wer darf welche Maschine sehen?

Diese Regel würde ich nie lockern: Der Händler sieht nur Maschinen, die auf sein eigenes Konto registriert sind. Die Seriennummer kommt aus dem Asset-Datensatz, der für dieses Konto freigegeben ist, nie aus einem Freitextfeld. Sonst liest ein Händler die Konfiguration einer Maschine, die ein anderer verkauft hat.

Auf der Lizenzseite nennt die [Salesforce-Hilfe zu Experience-Cloud-Lizenzen](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) Lese-, Anlage- und Bearbeitungsrechte auf Assets für Customer Community Plus und Partner Community. Welche Assets ein Käufer tatsächlich sieht, ist eine Frage der Freigabe. Praktisch heißt das: Das Konto des Assets muss das Käuferkonto sein, oder die Händlerbeziehung muss so modelliert sein, dass die Freigabe ihr folgt. Maschinen, die über einen Händler verkauft, aber auf den Endkunden registriert sind, brauchen vor dem Go-live eine klare Regel. Welche Portallizenz in Manufacturing Cloud was abdeckt, steht im Beitrag zum [Kundenportal in Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

## Ein typisches Szenario: 6.000 Maschinen und 150 Händler

Ein typisches Szenario, als Annahme: Ein Maschinenbauer hat 6.000 installierte Maschinen in acht Baureihen, 150 Händler und ein PLM mit As-built-Stücklisten für Maschinen, die in den letzten zehn Jahren ausgeliefert wurden.

Eine Käufergruppe pro Maschine scheidet an den Limits oben aus. Eine Käufergruppe pro Baureihe ergäbe bis zu acht Gruppen pro Händler, innerhalb der 20, grenzt die Liste aber nur auf die Baureihe ein, nicht auf die Variante in einer bestimmten Maschine.

Die Entscheidung im Szenario: Käufergruppen bleiben pro Land und Händlerstufe. Eine Maschinenseite zeigt die Assets des Händlers und fragt für die gewählte Maschine die ersatzteilrelevanten Positionen live im PLM ab, das Ergebnis wird einen Tag am Asset zwischengespeichert. Für Maschinen, die älter als zehn Jahre sind, fällt die Seite auf die Teileliste der Baureihe zurück und sagt das auch. Das Filtern der Suche per Extension wird verschoben, bis die Klasse allgemein verfügbar ist.

## Womit sollten Sie anfangen?

1. **Zuerst die Daten prüfen.** Nehmen Sie 20 aktuelle Ersatzteilbestellungen und testen Sie, ob Seriennummer, Asset und As-built-Stückliste zum tatsächlich bestellten Teil führen.
2. **Die Asset-Freigabe aufräumen.** Welche Maschinen gehören zu welchem Händlerkonto, einschließlich der an Endkunden verkauften.
3. **Die Teile-API vor der Seite bauen.** Der Ersatzteilinnendienst kann sie zuerst nutzen, Store, [Außendienst](../salesforce-field-service-ersatzteile-erp/) und ein Agent später.
4. **Mit der Maschinenseite starten** und das Filtern der Suche erst angehen, wenn Händler danach fragen.

Das Kapitel [Katalog, Suche, Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) ordnet das in das Store-Design ein. Welches System welche Daten führt, ist Thema von [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Ein Ersatzteilshop zeigt pro Maschine nur so zuverlässig die richtigen Teile, wie Ihre Seriennummern zu einer As-built-Stückliste führen. Wenn Sie das prüfen wollen, bevor ein Partner eine Komponente baut, [schreiben Sie mir](#contact).
