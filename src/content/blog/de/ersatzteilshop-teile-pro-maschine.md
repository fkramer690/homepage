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
  - "Bewährt hat sich eine Maschinenseite: Eine eigene Komponente listet die Anlagen des Händlers und zu jeder die Ersatzteile, aus Salesforce oder dem PLM."
  - "Die Suche pro Maschine lässt sich über Endpoint Extensions filtern. Die Basisklasse ist aber Beta, und nachträgliches Filtern reißt Lücken in Ergebnisseiten."
  - "Der Händler sieht nur Maschinen seines eigenen Kontos. Der Server prüft jedes Asset und jede Seriennummer gegen dieses Konto."
faq:
  - q: "Können Entitlements in B2B Commerce Teile nach Seriennummer einschränken?"
    a: "Nein. Entitlement Policies geben Käufergruppen Zugriff auf Produkte. Eine Seriennummer gehört zu einer installierten Maschine, meist einem Asset-Datensatz, und in der Dokumentation zu B2B Commerce habe ich keine Standardverbindung zwischen Assets und Entitlements gefunden."
  - q: "Was ist eine Maschinenseite in einem Ersatzteilshop?"
    a: "Das ist eine eigene Seite im Store, die die auf das Händlerkonto registrierten Maschinen und zu jeder Maschine die passenden Ersatzteile zeigt. Die Teileliste stammt aus Asset-Datensätzen oder live aus dem PLM, und der Händler legt die Teile von dort in den Warenkorb."
  - q: "Was sind Commerce Endpoint Extensions?"
    a: "Das sind Apex-Klassen, die die Anfrage oder die Antwort eines einzelnen Commerce-Connect-API-Endpunkts ändern, zum Beispiel bei der Produktsuche. Salesforce nennt unter anderem Commerce_Endpoint_Search_Products, Commerce_Endpoint_Search_ProductSearch, Commerce_Endpoint_Catalog_Product und Commerce_Endpoint_Catalog_Products. Das Standardverhalten des Endpunkts ersetzen sie nicht."
  - q: "Können Händler im Experience-Cloud-Store Assets sehen?"
    a: "Laut Salesforce-Hilfe erlauben unter anderem die Lizenzen Customer Community Plus und Partner Community Lese-, Anlage- und Bearbeitungsrechte auf Assets. Welche Assets ein Händler sieht, ist dann eine Frage der Freigabe, die sich nach dem Konto richten sollte, auf das die Maschine registriert ist."
draft: false
---

Ein Store in Salesforce B2B Commerce kann Ersatzteile im Standard nicht nach Seriennummer filtern. Entitlements regeln die Sichtbarkeit pro Käufergruppe, und die Limits schließen eine Gruppe pro Maschine aus. Bewährt hat sich eine Maschinenseite: Eine eigene Komponente zeigt die auf das Händlerkonto registrierten Maschinen und jeweils die passenden Teile. Die normale Suche pro Maschine zu filtern erfordert Endpoint Extensions, deren Basisklasse aber noch Beta ist. Wichtiger als die Komponente sind die Daten: Ohne As-built-Stückliste pro Seriennummer oder Regeln, die sie präzise aus Variante und Revision ableiten, kann kein Shop die Frage beantworten.

## Warum lösen Entitlements das Thema Teile pro Maschine nicht?

In Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen auch als "Agentforce Commerce for B2B" vermarktet, wird die Sichtbarkeit über mehrere Zuordnungen gesteuert. Ein Käuferkonto gehört zu Käufergruppen, und laut [Trailhead zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) legen Entitlement Policies fest, welche Produkte ein Käufer anhand seiner Gruppenmitgliedschaften sieht. Damit lässt sich die Frage beantworten: „Darf dieser Händler dieses Teil kaufen?“ Entscheidend ist dabei der Händler.

"Passt dieses Teil in diese Maschine?" ist dagegen eine Frage über die Maschine. Ein Händler mit 40 installierten Maschinen aus fünf Baureihen braucht für jede eine andere Teileliste, und eine Dichtung für Baureihe A ist vielleicht auch für Baureihe B als Ersatz bestellbar. Ein Entitlement entscheidet pro Produkt und Käufergruppe mit Ja oder Nein, ohne die einzelne Maschine einzubeziehen.

Der naheliegende Umweg ist eine Käufergruppe pro Maschine. Die [Entitlement-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) und die [Käufergruppen-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) beenden das schnell:

```kennzahlen
2.000 | Käufergruppen pro Produkt, festes Limit
20 | Käufergruppen pro Käuferkonto, standardmäßig, durch Support erhöhbar
30 | Käufergruppen pro Käuferkonto mit Apex-Extension, ebenfalls ein Soft Limit
quelle: Salesforce Commerce Developer Guide, Entitlement-Limits und Käufergruppen-Limits
```

Bei der Suchindexierung werden nur die ersten 2.000 Käufergruppen eines Produkts in den Index übernommen. Eine Standardschraube, die in 6.000 Maschinen verbaut ist, wäre nur für ein Drittel davon auffindbar. Und ein Händler mit 40 Maschinen sprengt das Standardlimit pro Käuferkonto. Die Apex-Extension erfordert außerdem, Salesforce CDN und Edge Network für den Store zu deaktivieren.

Entitlements bleiben also bei dem, was sie gut können: welche Länder, Stufen und Marken welche Teile kaufen dürfen. Wie man diese Gruppen schneidet, steht in [Buyer Groups und Entitlements](/blog/buyer-groups-entitlements-sichtbarkeit/).

## Welche Daten braucht eine Teileliste pro Maschine?

Dafür braucht es drei Quellen, dieselben wie beim [KI-Agenten für Ersatzteile per Seriennummer](/blog/ersatzteile-seriennummer-ki-agent/):

- **Installierte Basis in Salesforce.** Die Maschine als Asset mit Seriennummer, Konto und Maschinentyp, am besten als Asset-Hierarchie mit Hauptbaugruppen. Das ist der Anker für den Händler: Welche Maschinen gehören zu mir?
- **As-built-Stückliste aus dem PLM.** Die Stückliste der ausgelieferten Maschine mit den tatsächlich verbauten Varianten und Revisionen, dazu ein Kennzeichen für ersatzteilrelevante Positionen.
- **Materialdaten aus dem ERP.** Materialnummer, Nachfolgematerial und Vertriebsstatus. Preise und Verfügbarkeit gelangen über den üblichen Preis- und Bestandsprozess in den Store.

Die dritte Quelle vergessen Projekte gern. Ein laut PLM verbautes Teil kann bereits vor Jahren durch ein Nachfolgematerial abgelöst worden sein. Wird der Nachfolger nicht aufgelöst, bevor der Shop das Teil zeigt, bestellt der Händler etwas, das es nicht mehr gibt. Auch bestätigte Teilewechsel auf abgeschlossenen Arbeitsaufträgen verändern die Maschine mit der Zeit. Verbrauchtes Material allein ist kein Beleg, weil ein Teil mitgenommen, aber nicht eingebaut worden sein kann. Warum Teile ins System gehören, erklärt [Ersatzteile im Außendienst: ERP oder Salesforce](/blog/salesforce-field-service-ersatzteile-erp/).

## Option A: eine Maschinenseite mit eigener Komponente

Mit der Maschinenseite würde ich anfangen. Eine Lightning-Web-Komponente auf einer eigenen Store-Seite listet die Assets des Kontos, zu dem der angemeldete Käufer gehört. Der Händler wählt eine Maschine, sieht ihre Hauptbaugruppen und die ersatzteilrelevanten Positionen und legt Teile in den Warenkorb. LWR-Stores, die Salesforce für neue Stores empfiehlt, unterstützen laut [LWR-Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) nur Lightning Web Components. Deshalb wird die Komponente von Anfang an als Lightning Web Component entwickelt.

Woher die Teileliste stammt, bestimmt den Aufwand:

- **Aus Salesforce.** Ersatzteilrelevante Positionen liegen pro Asset oder pro Maschinentyp vor, etwa als untergeordnete Assets oder in einem eigenen Objekt. Schnell und einfach, aber jede Position ist ein Datensatz, der geladen und mit dem PLM synchron gehalten werden muss.
- **Live aus dem PLM.** Die Komponente ruft eine Apex-Methode auf, die für die Seriennummer eine Teile-API im PLM oder in der Middleware abfragt. Keine replizierte Kopie in Salesforce, aber das PLM muss innerhalb der Zeit antworten, die ein Händler beim Laden einer Seite akzeptiert, und die Seite braucht eine klare Meldung, wenn das PLM nicht rechtzeitig antwortet.

In beiden Fällen liefert die Komponente nur Teilenummern. Jede davon muss einem Store-Produkt zugeordnet werden. Ob der Händler es kaufen darf und zu welchem Preis, muss im Kontext des Käufers aus den Standard-APIs von Commerce für Produkte und Preise stammen. Eine eigene Apex-Methode, die rohe Produktdaten liefert, würde Entitlements umgehen. Nennt das PLM ein Teil, für das die Käufergruppe des Händlers nicht freigeschaltet ist, sollte es als "auf Anfrage" erscheinen, statt kommentarlos zu verschwinden.

Der Vorteil der Maschinenseite: Sie ändert die Standardsuche und die Produktseiten nicht und bleibt dadurch weniger an deren Verhalten gekoppelt. Der Nachteil: Wer eine Teilenummer ins Suchfeld tippt, sieht weiterhin jedes Teil, das seine Käufergruppe kaufen darf, ob es passt oder nicht.

## Option B: Suche und Produktlisten pro Maschine filtern

Für genau solche Änderungen bietet Salesforce Endpoint Extensions an. Laut [Extensions Guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) ändern sie die Anfrage oder die Antwort eines Connect-API-Endpunkts, können dessen Standardverhalten aber nicht ersetzen. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) enthält `Commerce_Endpoint_Search_Products` und das ältere `Commerce_Endpoint_Search_ProductSearch` für die Produktsuche, `Commerce_Endpoint_Search_Suggestions` für Suchvorschläge sowie `Commerce_Endpoint_Catalog_Product` und `Commerce_Endpoint_Catalog_Products` für Produktdetails und Produktlisten. Eine After-Methode könnte aus der Antwort jedes Produkt entfernen, das nicht in der Teileliste der vom Händler gewählten Maschine steht. Das funktioniert nur, wenn die gewählte Maschine bei jeder Anfrage serverseitig gespeichert oder validiert wird und jeder dieser Endpunkte abgedeckt ist. Wer nur die Suche filtert, lässt Produktseiten weiterhin per URL erreichbar.

Ich würde das nur als zweiten Schritt nutzen, aus drei Gründen:

1. **Beta-Status.** Die [Apex-Referenz](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) nennt die Basisklasse "BaseEndpointExtension (Beta)", auch für API-Version 67.0. Salesforce garantiert nicht, dass Beta-Funktionen allgemein verfügbar werden.
2. **Verzerrte Ergebnisse.** Die Suche liefert laut [Such-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) höchstens 200 Ergebnisse pro Seite. Entfernt die Extension danach 150 davon, zeigt die Seite nur noch 50 Ergebnisse, und nach meiner Einschätzung passen Facettenzahlen und Trefferzahl nicht mehr zu dem, was der Händler sieht.
3. **Geschwindigkeit.** Jede Suche braucht dann die Teileliste der gewählten Maschine. Ohne Zwischenspeicher in Salesforce belasten häufige Suchanfragen und Suchvorschläge synchron das PLM.

Ein Mittelweg kommt ohne Extensions aus: Die Maschinenseite wendet einen Suchfilter auf ein Attribut wie die Baureihe an. Das funktioniert nur, wenn Teile die Baureihe als filterbares Attribut tragen und die Baureihe genau genug ist. Wie Attribute und Synonyme für Teilenummern eingerichtet werden, steht in [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](/blog/b2b-shop-suche-teilenummer/).

## Wer darf welche Maschine sehen?

Diese Regel würde ich nie lockern: Der Händler sieht nur Maschinen, die auf sein eigenes Konto registriert sind. Egal ob die Seriennummer aus einer Liste oder einem Textfeld stammt: Der Server löst sie zum Asset auf und prüft sie gegen die Assets, die für das Käuferkonto freigegeben sind, bevor er das PLM aufruft. Eine Auswahl allein im Browser lässt sich manipulieren, und dann liest ein Händler die Konfiguration einer Maschine, die ein anderer Händler verkauft hat.

Auf der Lizenzseite nennt die [Salesforce-Hilfe zu Experience-Cloud-Lizenzen](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) unter anderem Lese-, Anlage- und Bearbeitungsrechte auf Assets für Customer Community Plus und Partner Community. Welche Assets ein Käufer tatsächlich sieht, ist eine Frage der Freigabe. Praktisch heißt das: Das Konto des Assets muss das Käuferkonto sein, oder die Händlerbeziehung muss so modelliert sein, dass die Freigabe ihr folgt. Maschinen, die über einen Händler verkauft, aber auf den Endkunden registriert sind, brauchen vor dem Go-live eine klare Regel. Welche Portallizenz in Manufacturing Cloud welche Funktionen abdeckt, steht im Beitrag zum [Kundenportal in Manufacturing Cloud](/blog/manufacturing-cloud-kundenportal/).

## Rechenbeispiel: 6.000 Maschinen und 150 Händler

Angenommen, ein Maschinenbauer hat 6.000 installierte Maschinen in acht Baureihen, 150 Händler und ein PLM mit As-built-Stücklisten für Maschinen, die in den letzten zehn Jahren ausgeliefert wurden.

Eine Käufergruppe pro Maschine scheidet an den Limits oben aus. Eine Käufergruppe pro Baureihe läge mit bis zu acht Gruppen pro Händler innerhalb des Limits von 20, grenzt die Liste aber nur auf die Baureihe ein, nicht auf die Variante in einer bestimmten Maschine.

Die Entscheidung im Szenario: Käufergruppen bleiben pro Land und Händlerstufe. Eine Maschinenseite zeigt die Assets des Händlers und fragt für die gewählte Maschine die ersatzteilrelevanten Positionen live im PLM ab. Die As-built-Liste wird einen Tag lang am Asset zwischengespeichert, während Preis, Bestand und Vertriebsstatus im Store frisch ermittelt werden. Für Maschinen, die älter als zehn Jahre sind, zeigt die Seite ersatzweise die Teileliste der Baureihe und weist ausdrücklich darauf hin. Das Filtern der Suche per Extension wird verschoben, bis die Klasse allgemein verfügbar ist.

## 20 Bestellungen bis zur As-built-Stückliste prüfen

```schritte
Zuerst die Daten prüfen
  Nehmen Sie 20 aktuelle Ersatzteilbestellungen und testen Sie, ob Seriennummer, Asset und As-built-Stückliste zum tatsächlich bestellten Teil führen.
Die Asset-Freigabe aufräumen
  Klären Sie, welche Maschinen zu welchem Händlerkonto gehören, einschließlich der an Endkunden verkauften.
Die Teile-API vor der Seite bauen
  Der Ersatzteilinnendienst kann sie zuerst nutzen, Store, [Außendienst](/blog/salesforce-field-service-ersatzteile-erp/) und ein Agent später.
Mit der Maschinenseite starten
  Das Filtern der Suche gehen Sie erst an, wenn Händler danach fragen.
```

Das Kapitel [Katalog, Suche, Sichtbarkeit](/masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) der [Masterclass B2B Commerce](/masterclass/b2b-commerce/) ordnet diesen Ansatz in das Store-Design ein. Welches System welche Daten führt, ist Thema von [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/). Welche Salesforce-Themen bei Maschinenbauern außer dem Ersatzteilshop anstehen, steht unter [Salesforce-Beratung für Maschinenbauer](/salesforce-maschinenbau/).
