---
title: "Ersatzteilshop: nur Teile zur eigenen Maschine zeigen"
description: "Wie ein Store in Salesforce B2B Commerce Händlern nur die Ersatzteile zur installierten Maschine zeigt: Entitlement-Limits, Maschinenseite, Endpoint Extensions."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: ersatzteilshop-teile-pro-maschine
translationKey: commerce-spare-parts-per-machine
topic: commerce
categories: [b2b-commerce, field-service]
tags: [B2B Commerce, Ersatzteile, installierte Basis, Assets, PLM, Endpoint Extensions]
takeaways:
  - "Entitlements wirken pro Käufergruppe, nicht pro Seriennummer. Sie beantworten deshalb nicht, welche Teile zu einer bestimmten Maschine passen."
  - "Eine Käufergruppe pro Maschine scheitert an Limits: 2.000 Käufergruppen pro Produkt (fest) und standardmäßig 20 Käufergruppen pro Käuferkonto."
  - "Robust ist eine Maschinenseite: Eine eigene Komponente listet die Anlagen des Händlers und die Ersatzteile zu jeder davon, aus Salesforce oder dem PLM."
  - "Suche pro Maschine filtern geht über Endpoint Extensions. Die Basisklasse ist aber Beta, und nachträgliches Filtern reißt Lücken in Ergebnisseiten."
  - "Der Händler sieht nur Maschinen seines eigenen Kontos. Der Server prüft jedes Asset und jede Seriennummer gegen dieses Konto."
faq:
  - q: "Können Entitlements in B2B Commerce Teile nach Seriennummer einschränken?"
    a: "Nein. Entitlement Policies geben Käufergruppen Zugriff auf Produkte. Eine Seriennummer gehört zu einer installierten Maschine, meist einem Asset-Datensatz, und in der Dokumentation zu B2B Commerce habe ich keine Standardverbindung zwischen Assets und Entitlements gefunden."
  - q: "Was ist eine Maschinenseite in einem Ersatzteilshop?"
    a: "Eine eigene Seite im Store, die die auf das Händlerkonto registrierten Maschinen zeigt und zu jeder Maschine die passenden Ersatzteile. Die Teileliste kommt aus Asset-Datensätzen oder live aus dem PLM, und der Händler legt die Teile von dort in den Warenkorb."
  - q: "Was sind Commerce Endpoint Extensions?"
    a: "Apex-Klassen, die Anfrage oder Antwort eines einzelnen Commerce-Connect-API-Endpunkts ändern, zum Beispiel der Produktsuche. Salesforce nennt unter anderem Commerce_Endpoint_Search_Products, Commerce_Endpoint_Search_ProductSearch, Commerce_Endpoint_Catalog_Product und Commerce_Endpoint_Catalog_Products. Das Standardverhalten des Endpunkts ersetzen sie nicht."
  - q: "Können Händler im Experience-Cloud-Store Assets sehen?"
    a: "Laut Salesforce-Hilfe erlauben unter anderem die Lizenzen Customer Community Plus und Partner Community Lese-, Anlage- und Bearbeitungsrechte auf Assets. Welche Assets ein Händler sieht, ist dann eine Frage der Freigabe, die dem Konto folgen sollte, auf das die Maschine registriert ist."
draft: false
---

Ein Store in Salesforce B2B Commerce kann Ersatzteile im Standard nicht nach Seriennummer filtern. Entitlements regeln die Sichtbarkeit pro Käufergruppe, und die Limits schließen eine Gruppe pro Maschine aus. Bewährt hat sich eine Maschinenseite: Eine eigene Komponente zeigt die auf das Händlerkonto registrierten Maschinen und jeweils die passenden Teile. Die normale Suche pro Maschine zu filtern erfordert Endpoint Extensions, deren Basisklasse aber noch Beta ist. Wichtiger als die Komponente sind die Daten: Ohne As-built-Stückliste pro Seriennummer oder Regeln, die sie präzise aus Variante und Revision ableiten, kann kein Shop die Frage beantworten.

## Warum lösen Entitlements das Thema Teile pro Maschine nicht?

In Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen auch als "Agentforce Commerce for B2B" vermarktet, wird die Sichtbarkeit über mehrere Zuordnungen gesteuert. Ein Käuferkonto gehört zu Käufergruppen, und laut [Trailhead zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) legen Entitlement Policies fest, welche Produkte ein Käufer anhand seiner Gruppenmitgliedschaften sieht. Damit lässt sich die Frage beantworten: „Darf dieser Händler dieses Teil kaufen?“ Entscheidend ist dabei der Händler.

"Passt dieses Teil in diese Maschine?" ist eine Frage über die Maschine. Ein Händler mit 40 installierten Maschinen aus fünf Baureihen braucht für jede eine andere Teileliste, und eine Dichtung für Baureihe A ist vielleicht auch für Baureihe B als Ersatz bestellbar. Ein Entitlement sagt ja oder nein pro Produkt und Käufergruppe, ohne Maschine dazwischen.

Der naheliegende Umweg ist eine Käufergruppe pro Maschine. Die [Entitlement-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) und die [Käufergruppen-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) beenden das schnell:

```kennzahlen
2.000 | Käufergruppen pro Produkt, festes Limit
20 | Käufergruppen pro Käuferkonto, standardmäßig, durch Support erhöhbar
30 | Käufergruppen pro Käuferkonto mit Apex-Extension, ebenfalls ein Soft Limit
quelle: Salesforce Commerce Developer Guide, Entitlement-Limits und Käufergruppen-Limits
```

Bei der Suchindexierung werden nur die ersten 2.000 Käufergruppen eines Produkts in den Index übernommen. Eine Standardschraube, die in 6.000 Maschinen verbaut ist, wäre nur für ein Drittel davon auffindbar. Und ein Händler mit 40 Maschinen passt nicht in das Standardlimit pro Käuferkonto. Die Apex-Extension erfordert außerdem, Salesforce CDN und Edge Network für den Store zu deaktivieren.

Entitlements bleiben also bei dem, was sie gut können: welche Länder, Stufen und Marken welche Teile kaufen dürfen. Wie man diese Gruppen schneidet, steht in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/).

## Welche Daten braucht eine Teileliste pro Maschine?

Drei Quellen, dieselben wie beim [KI-Agenten für Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/):

- **Installierte Basis in Salesforce.** Die Maschine als Asset mit Seriennummer, Konto und Maschinentyp, am besten als Asset-Hierarchie mit Hauptbaugruppen. Das ist der Anker für den Händler: Welche Maschinen gehören zu mir?
- **As-built-Stückliste aus dem PLM.** Die Stückliste der ausgelieferten Maschine mit den tatsächlich verbauten Varianten und Revisionen, dazu ein Kennzeichen für ersatzteilrelevante Positionen.
- **Materialdaten aus dem ERP.** Materialnummer, Nachfolgematerial und Vertriebsstatus. Preise und Verfügbarkeit kommen über den üblichen Weg für Preise und Bestand in den Store.

Die dritte Quelle vergessen Projekte gern. Ein laut PLM verbautes Teil kann bereits vor Jahren durch ein Nachfolgematerial abgelöst worden sein. Wird der Nachfolger nicht aufgelöst, bevor der Shop das Teil zeigt, bestellt der Händler etwas, das es nicht mehr gibt. Auch bestätigte Teilewechsel auf abgeschlossenen Arbeitsaufträgen verändern die Maschine mit der Zeit. Verbrauchtes Material allein ist kein Beleg, weil ein Teil mitgenommen, aber nicht eingebaut worden sein kann. Warum Teile ins System gehören, erklärt [Ersatzteile im Außendienst: ERP oder Salesforce](../salesforce-field-service-ersatzteile-erp/).

## Option A: eine Maschinenseite mit eigener Komponente

Mit der Maschinenseite würde ich anfangen. Eine Lightning-Web-Komponente auf einer eigenen Store-Seite listet die Assets des Kontos, zu dem der angemeldete Käufer gehört. Der Händler wählt eine Maschine, sieht ihre Hauptbaugruppen und die ersatzteilrelevanten Positionen und legt Teile in den Warenkorb. LWR-Stores, die Salesforce für neue Stores empfiehlt, unterstützen laut [LWR-Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) nur Lightning Web Components. Deshalb wird die Komponente von Anfang an als Lightning Web Component entwickelt.

Woher die Teileliste kommt, bestimmt den Aufwand:

- **Aus Salesforce.** Ersatzteilrelevante Positionen liegen pro Asset oder pro Maschinentyp vor, etwa als untergeordnete Assets oder in einem eigenen Objekt. Schnell und einfach, aber jede Position ist ein Datensatz, der geladen und mit dem PLM synchron gehalten werden muss.
- **Live aus dem PLM.** Die Komponente ruft eine Apex-Methode auf, die eine Teile-API im PLM oder in der Middleware für die Seriennummer abfragt. Keine replizierte Kopie in Salesforce, aber das PLM muss in der Zeit antworten, die ein Händler auf eine Seite wartet, und die Seite braucht eine klare Meldung, wenn das PLM nicht rechtzeitig antwortet.

In beiden Fällen liefert die Komponente nur Teilenummern. Jede davon muss dem Store-Produkt zugeordnet werden, und ob der Händler sie kaufen darf und zu welchem Preis, muss im Kontext des Käufers aus den Standard-APIs von Commerce für Produkte und Preise kommen. Eine eigene Apex-Methode, die rohe Produktdaten liefert, würde Entitlements umgehen. Ein Teil, das das PLM nennt, für das die Käufergruppe des Händlers aber nicht freigeschaltet ist, sollte als "auf Anfrage" erscheinen, statt kommentarlos zu verschwinden.

Der Vorteil der Maschinenseite: Sie ändert Standardsuche und Produktseiten nicht und bleibt dadurch weniger an deren Verhalten gekoppelt. Der Nachteil: Wer eine Teilenummer ins Suchfeld tippt, sieht weiterhin jedes Teil, das seine Käufergruppe kaufen darf, ob es passt oder nicht.

## Option B: Suche und Produktlisten pro Maschine filtern

Für genau solche Änderungen bietet Salesforce Endpoint Extensions. Laut [Extensions Guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) ändern sie die Anfrage oder die Antwort eines Connect-API-Endpunkts, können dessen Standardverhalten aber nicht ersetzen. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) enthält `Commerce_Endpoint_Search_Products` und das ältere `Commerce_Endpoint_Search_ProductSearch` für die Produktsuche, `Commerce_Endpoint_Search_Suggestions` für Suchvorschläge sowie `Commerce_Endpoint_Catalog_Product` und `Commerce_Endpoint_Catalog_Products` für Produktdetails und Produktlisten. Eine After-Methode könnte aus der Antwort jedes Produkt entfernen, das nicht in der Teileliste der vom Händler gewählten Maschine steht. Das funktioniert nur, wenn die gewählte Maschine für jede Anfrage auf dem Server gespeichert oder validiert wird und jeder dieser Endpunkte abgedeckt ist. Nur die Suche zu filtern lässt Produktseiten weiterhin per URL erreichbar.

Ich würde das nur als zweiten Schritt nutzen, aus drei Gründen:

1. **Beta-Status.** Die [Apex-Referenz](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) nennt die Basisklasse "BaseEndpointExtension (Beta)", auch für API-Version 67.0. Salesforce garantiert nicht, dass Beta-Funktionen allgemein verfügbar werden.
2. **Verzerrte Ergebnisse.** Die Suche liefert laut [Such-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) höchstens 200 Ergebnisse pro Seite. Entfernt die Extension danach 150 davon, zeigt die Seite 50, und nach meiner Einschätzung passen Facettenzahlen und Trefferzahl nicht mehr zu dem, was der Händler sieht.
3. **Geschwindigkeit.** Jede Suche braucht dann die Teileliste der gewählten Maschine. Ohne Zwischenspeicher in Salesforce landen häufige Suchanfragen und Suchvorschläge synchron im PLM.

Ein Mittelweg kommt ohne Extensions aus: Die Maschinenseite setzt einen Suchfilter auf ein Attribut wie die Baureihe. Das funktioniert nur, wenn Teile die Baureihe als filterbares Attribut tragen und die Baureihe genau genug ist. Wie Attribute und Synonyme für Teilenummern eingerichtet werden, steht in [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/).

## Wer darf welche Maschine sehen?

Diese Regel würde ich nie lockern: Der Händler sieht nur Maschinen, die auf sein eigenes Konto registriert sind. Ob die Seriennummer aus einer Liste oder einem Textfeld kommt, der Server löst sie zum Asset auf und prüft sie gegen die Assets, die für das Käuferkonto freigegeben sind, bevor er das PLM aufruft. Eine Auswahl allein im Browser lässt sich manipulieren. Sonst liest ein Händler die Konfiguration einer Maschine, die ein anderer verkauft hat.

Auf der Lizenzseite nennt die [Salesforce-Hilfe zu Experience-Cloud-Lizenzen](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) unter anderem Lese-, Anlage- und Bearbeitungsrechte auf Assets für Customer Community Plus und Partner Community. Welche Assets ein Käufer tatsächlich sieht, ist eine Frage der Freigabe. Praktisch heißt das: Das Konto des Assets muss das Käuferkonto sein, oder die Händlerbeziehung muss so modelliert sein, dass die Freigabe ihr folgt. Maschinen, die über einen Händler verkauft, aber auf den Endkunden registriert sind, brauchen vor dem Go-live eine klare Regel. Welche Portallizenz in Manufacturing Cloud was abdeckt, steht im Beitrag zum [Kundenportal in Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

## Rechenbeispiel: 6.000 Maschinen und 150 Händler

Angenommen, ein Maschinenbauer hat 6.000 installierte Maschinen in acht Baureihen, 150 Händler und ein PLM mit As-built-Stücklisten für Maschinen, die in den letzten zehn Jahren ausgeliefert wurden.

Eine Käufergruppe pro Maschine scheidet an den Limits oben aus. Eine Käufergruppe pro Baureihe ergäbe bis zu acht Gruppen pro Händler, innerhalb der 20, grenzt die Liste aber nur auf die Baureihe ein, nicht auf die Variante in einer bestimmten Maschine.

Die Entscheidung im Szenario: Käufergruppen bleiben pro Land und Händlerstufe. Eine Maschinenseite zeigt die Assets des Händlers und fragt für die gewählte Maschine die ersatzteilrelevanten Positionen live im PLM ab. Die As-built-Liste wird einen Tag am Asset zwischengespeichert, während Preis, Bestand und Vertriebsstatus frisch aus dem Store kommen. Für Maschinen, die älter als zehn Jahre sind, zeigt die Seite ersatzweise die Teileliste der Baureihe und weist ausdrücklich darauf hin. Das Filtern der Suche per Extension wird verschoben, bis die Klasse allgemein verfügbar ist.

## 20 Bestellungen bis zur As-built-Stückliste prüfen

```schritte
Zuerst die Daten prüfen
  Nehmen Sie 20 aktuelle Ersatzteilbestellungen und testen Sie, ob Seriennummer, Asset und As-built-Stückliste zum tatsächlich bestellten Teil führen.
Die Asset-Freigabe aufräumen
  Klären Sie, welche Maschinen zu welchem Händlerkonto gehören, einschließlich der an Endkunden verkauften.
Die Teile-API vor der Seite bauen
  Der Ersatzteilinnendienst kann sie zuerst nutzen, Store, [Außendienst](../salesforce-field-service-ersatzteile-erp/) und ein Agent später.
Mit der Maschinenseite starten
  Das Filtern der Suche gehen Sie erst an, wenn Händler danach fragen.
```

Das Kapitel [Katalog, Suche, Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) ordnet das in das Store-Design ein. Welches System welche Daten führt, ist Thema von [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
