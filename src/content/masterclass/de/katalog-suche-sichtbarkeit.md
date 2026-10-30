---
title: "B2B Commerce: Katalog, Suche und Sichtbarkeit"
description: "Wie Buyer Groups, Entitlement Policies, Produktdaten und Suche in Salesforce B2B Commerce zusammenspielen und welche harten Grenzen das Design bestimmen."
lang: de
slug: katalog-suche-sichtbarkeit
course: b2b-commerce
translationKey: commerce-02
chapter: 2
pubDate: 2026-10-28
short: "Katalog, Suche, Sichtbarkeit"
summary: "Wie Produktdaten, Käufergruppen und Suche zusammenspielen, damit jeder Händler die richtigen Teile findet."
takeaways:
  - "Ob ein Händler ein Produkt sieht, entscheiden Buyer Groups und Entitlement Policies; ob er es findet, entscheiden Produktdaten und Sucheinstellungen."
  - "Ein Produkt sollte höchstens 2.000 Buyer Groups zugeordnet sein. Darüber nimmt Salesforce die übrigen Gruppen nicht in den Suchindex auf, und der Datenimport meldet keinen Fehler."
  - "Buyer Groups entstehen aus Land, Händlerstufe und Marke, nie eine Gruppe pro Händler. So bleibt ihre Zahl stabil, wenn neue Händler dazukommen."
  - "Ein Store hat genau einen Katalog und bis zu 4 Millionen Produkte, davon 1 Million durchsuchbar. Eine zweite Marke mit eigenem Kategoriebaum braucht deshalb einen zweiten Store."
  - "Entitlements kennen keine Seriennummer. Teile pro Maschine zeigt eine eigene Maschinenseite mit Daten aus Assets und PLM, nicht eine Buyer Group pro Maschine."
articles: [commerce-buyer-groups-entitlements, commerce-product-data-pim, commerce-search-part-numbers, commerce-stores-countries-brands, commerce-spare-parts-per-machine, spare-parts-serial-number-ai]
faq:
  - q: "Was ist eine Buyer Group in Salesforce B2B Commerce?"
    a: "Eine Buyer Group bündelt Käuferaccounts, die denselben Store, dieselben Entitlement Policies und dieselben Preisbücher nutzen. Käufer erreichen einen Store nur über eine Buyer Group, jeder Käuferaccount braucht also mindestens eine Mitgliedschaft."
  - q: "Wie viele Produkte kann ein B2B-Commerce-Store durchsuchen?"
    a: "Laut Salesforce-Limitseite hält ein Store bis zu 4 Millionen Produkte, von denen 1 Million mit der Standardsuche durchsuchbar ist. Wer mehr braucht, spricht mit seinem Salesforce-Ansprechpartner oder nutzt einen externen Suchanbieter."
  - q: "Brauche ich einen Store pro Land?"
    a: "Meist nicht. Ein Store unterstützt bis zu 25 Sprachen, und Sortiment und Preise pro Land laufen über Buyer Groups. Einen eigenen Store braucht es, wenn Marke, Kategoriebaum, Checkout oder das ERP dahinter wirklich abweichen."
  - q: "Wie finden Händler alte Teilenummern im Shop?"
    a: "Über ein durchsuchbares Textfeld am aktuellen Produkt, das alle Vorgänger- und Fremdnummern enthält. Synonymregeln sind mit 100 pro Store zu wenige für Nummern und besser für Begriffe wie O-Ring und Dichtring geeignet."
  - q: "Kann B2B Commerce Ersatzteile nach Seriennummer filtern?"
    a: "Nicht im Standard. Entitlements gelten pro Buyer Group. Für Teile pro Maschine braucht es eine eigene Komponente, die die Assets des Händlers und deren Teileliste aus Salesforce oder PLM zeigt."
draft: false
---

In Salesforce B2B Commerce entscheiden zwei getrennte Mechanismen, ob ein Händler das richtige Ersatzteil bestellt. Sichtbarkeit regeln Buyer Groups und Entitlement Policies: Ein Käuferaccount gehört zu Buyer Groups, und diese bekommen Produkte und Preisbücher zugeordnet. Auffindbarkeit regeln Produktdaten und Sucheinstellungen: Was nicht sauber im Produkt steht, findet keine Suche. Beide Seiten haben harte Grenzen, die Sie vor dem Design kennen sollten, etwa 2.000 Buyer Groups pro Produkt im Suchindex, ein Katalog pro Store und 1 Million durchsuchbare Produkte. Meine Empfehlung: wenige Buyer Groups nach Land, Stufe und Marke, ein klarer Eigentümer für jedes Produktfeld, und das Entitlement-Konzept auf einer Seite, bevor Daten geladen werden.

## Wie entscheidet B2B Commerce, wer welches Produkt sieht?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), steuert den Zugang über eine Kette von Standardobjekten. Die [Trailhead-Einheit zum Zugang der Käufer](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) sagt es knapp: Käufer sind über Buyer Groups mit Stores verbunden, und Entitlement Policies legen fest, welche Produkte ein Käufer aufgrund seiner Gruppenmitgliedschaften sieht.

```vertiefung Für Admins
titel: Welche Standardobjekte bilden die Kette?
- **BuyerAccount:** ein normaler Account, der für den Einkauf freigeschaltet ist. Seine Kontakte werden Käufer oder Buyer Manager.
- **BuyerGroup und BuyerGroupMember:** Die Gruppe bündelt Käuferaccounts mit gleichen Einstellungen, jede Mitgliedschaft ist ein eigener Datensatz.
- **WebStoreBuyerGroup:** verbindet eine Buyer Group mit einem Store.
- **CommerceEntitlementPolicy:** verbindet Buyer Groups mit Produkten und legt fest, ob Produkt und Preis sichtbar sind.
- **BuyerGroupPricebook:** hängt Preisbücher an die Buyer Group.
```

Sichtbarkeit und Preis hängen damit an denselben Gruppen. Wer Buyer Groups nur für das Sortiment schneidet, merkt in [Kapitel 3](../preise-warenkorb-checkout/), dass die Preise eine andere Einteilung bräuchten. Ich entwerfe beides deshalb zusammen. Was B2B Commerce überhaupt ist und was es kostet, steht in [Kapitel 1](../b2b-commerce-lohnt-sich-ueberblick/).

## Welche Grenzen bestimmen das Design?

Salesforce dokumentiert die Grenzen auf eigenen Seiten für [Entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html), [Buyer Groups](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), [Produkte](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [Suche](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html), [Stores](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html) und [Preisbücher](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html). Soft Limits erhöht der Salesforce-Support auf Anfrage, harte Grenzen nicht. Für Hersteller zählen diese, Stand Oktober 2026:

| Grenze | Wert | Art |
|---|---|---|
| Buyer Groups pro Käuferaccount | 20, mit Apex-Erweiterung 30 | soft |
| Buyer Groups pro Entitlement Policy | 200 | hart |
| Buyer Groups pro Produkt (Buyer Entitlements) | 2.000 | hart |
| Kataloge pro Store | 1 | hart |
| Produkte pro Store | 4 Millionen, davon 1 Million durchsuchbar | hart |
| Varianten pro Variantenprodukt | 200 | hart |
| Bilder pro Produkt | 9, plus 5 Dateianhänge | hart |
| Kategorietiefe | 5 Ebenen | soft |
| Stores pro Org | 100 | hart |
| Preisbücher pro Store | 5 | hart |

Die Grenze von 2.000 Buyer Groups pro Produkt hat die unangenehmste Wirkung.

```hinweis achtung
Laut Salesforce nimmt die Suchindizierung nur die ersten 2.000 Buyer Groups eines Produkts auf, und der Datenimport prüft die Grenze nicht. Der Import läuft also durch, und einige Händler finden das Teil danach einfach nicht mehr.
```

Auf der Seite zu Buyer Groups steht in einer Anmerkung außerdem ein anderer Wert als in der Tabelle; ich plane mit den 20 aus der Tabelle.

## Warum nie eine Buyer Group pro Händler?

Die Idee liegt nahe, weil sie das ERP spiegelt: Jeder Kunde hat eigene Konditionen, also bekommt jeder Kunde eine eigene Gruppe. Bei 50 Händlern geht das. Bei 2.500 Händlern ist ein Ersatzteil, das alle kaufen dürfen, 2.500 Gruppen zugeordnet und liegt über der Indexgrenze. Eine Policy "alle Ersatzteile" bedient höchstens 200 Gruppen und müsste mehrfach kopiert und gleich gehalten werden. Jeder neue Händler wird zum Datenprojekt.

Ich schneide Buyer Groups nach Merkmalen, die sich selten ändern und die das ERP im Kundenstamm schon hat: Land oder Verkaufsorganisation, Händlerstufe wie Servicepartner oder Vertriebspartner, und Marke, wenn Händler nur eine Marke führen. Entitlement Policies folgen dann Sortimenten, nicht Kunden: "Ersatzteile allgemein", "Ersatzteile für Servicepartner", "Verbrauchsmaterial". Wie Sie die Mitgliedschaften aus dem ERP setzen und wann eine Zuordnung per Apex oder Regel lohnt, steht in [Buyer Groups und Entitlements](../../../blog/buyer-groups-entitlements-sichtbarkeit/).

```vergleich
ohne: Eine Buyer Group pro Händler
- Ein Teil, das alle 2.500 Händler kaufen dürfen, hängt an 2.500 Gruppen und liegt über der Indexgrenze
- Eine Policy bedient höchstens 200 Gruppen und muss kopiert und gleich gehalten werden
- Jeder neue Händler wird zum Datenprojekt
mit: Buyer Groups nach Merkmalen
- Land oder Verkaufsorganisation, Händlerstufe und Marke
- Merkmale, die sich selten ändern und die das ERP im Kundenstamm schon hat
- Entitlement Policies folgen Sortimenten, nicht Kunden
```

## Wem gehören die Produktdaten?

Produktdaten für den Shop sollten nicht in Salesforce gepflegt werden. Das ERP besitzt, was es heute schon besitzt: Materialnummer, Mengeneinheit, Vertriebsstatus. Ein PIM, falls vorhanden, besitzt Texte, technische Merkmale, Bilder und Übersetzungen. Salesforce hält eine Kopie und pflegt nur, was zum Store gehört, etwa Kategorien und Sucheinstellungen. Korrigiert ein Merchandiser einen Tippfehler in Salesforce und überschreibt ihn der nächtliche ERP-Import, sieht der Händler den Fehler am nächsten Tag wieder. Danach vertraut der Merchandiser dem Shop nicht mehr. Das Prinzip gilt für jedes Objekt der Org und steht ausführlich in der [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/).

Ob Sie ein PIM brauchen, hängt vom Umfang ab. Bei einigen tausend Teilen mit deutschen und englischen Texten aus dem ERP reicht das ERP als einzige Quelle. Bei zehntausenden Teilen, vielen Sprachen und Filtermerkmalen pflegt das niemand im Materialstamm.

Zwei Grenzen aus der Tabelle prägen die Produktdaten. Neun Bilder pro Produkt reichen für die meisten Ersatzteile, aber Zeichnungen und Datenblätter mit Revisionen liegen besser im DAM oder PLM. Salesforce hat im [Juli 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) angekündigt, externe DAM-Plattformen, 3D-Modelle und technische Daten über LWC-Wrapper auf Produktseiten anzuzeigen; das würde ich vor der Planung in einer Sandbox testen. Und Varianten brauchen saubere Merkmalswerte. "50 mm", "50mm" und "DN50" in drei Materialstämmen ergeben drei Filterwerte. Die Aufteilung zwischen ERP, PIM und Salesforce im Detail steht in [Produktdaten für B2B Commerce](../../../blog/produktdaten-b2b-commerce-pim-erp/).

## Wie finden Händler Ersatzteile über die Teilenummer?

Die Store-Suche findet nur, was in den Daten steht, und sie ist streng. Laut Salesforce sind Produktname, Beschreibung und SKU standardmäßig durchsuchbar, ein Treffer erscheint nur, wenn alle Suchbegriffe vorkommen, und Teiltreffer am Wortanfang oder in der Wortmitte werden nicht unterstützt. Die Einheit ist für D2C-Merchandiser geschrieben, B2B nutzt dieselbe Suche auf der Plattform. Ein Händler, der "815" tippt, findet "0815" also nicht.

Die Grenzen der Suche pro Store:

| Grenze pro Store | Wert |
|---|---|
| Durchsuchbare Merkmale | 25 |
| Filterbare Merkmale | 50 |
| Synonymregeln | 100 |
| Boost-and-Bury-Regeln | 100 |
| Facetten pro Suchanfrage | 10 |
| Treffer pro Ergebnisseite | 200 |

Daraus folgen drei Regeln für Teilekataloge:

1. **Alte Nummern gehören in ein Feld.** Vorgänger-, Lieferanten- und Fremdnummern stehen in einem durchsuchbaren Textfeld am aktuellen Produkt. Das Feld zählt als eines der 25 Merkmale, egal wie viele Nummern es enthält.
2. **Synonyme sind für Wörter.** 100 Regeln reichen für "O-Ring" und "Dichtring", nicht für 8.000 Vorgängernummern.
3. **Nach jeder Änderung neu indizieren.** Trailhead nennt geänderte durchsuchbare Felder, Produkte, Kategorien und Entitlement Policies als Anlässe, den Suchindex neu aufzubauen.

Salesforce hat 2026 nachgelegt. Mit den Neuerungen vom [Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) beschreibt Salesforce eine B2B-Suche, bei der Käufer ein Teil in eigenen Worten beschreiben, statt Namen oder SKU zu kennen. Im Juli folgten Boost and Bury, die Reihenfolge von Filtergruppen und Suchanalysen über Data Cloud mit Klickraten, Conversion und Suchen ohne Treffer. Diese Nullsuchen sind nach dem Go-live die beste Liste fehlender Produktdaten. Einrichtung und Grenzen im Detail beschreibt [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../../../blog/b2b-shop-suche-teilenummer/).

## Ein Store oder mehrere?

Die meisten Hersteller brauchen einen Store pro Marke, oder pro rechtlicher Einheit mit eigenem Checkout, und Buyer Groups für alles andere. Länder und Händlerstufen rechtfertigen selten einen eigenen Store: Ein Store unterstützt bis zu 25 Sprachen, und Sortiment und Preise pro Land laufen über Buyer Groups und deren Preisbücher.

Einen zweiten Store plane ich in vier Fällen:

| Fall | Warum ein eigener Store |
|---|---|
| Eigene Marke mit eigenem Auftritt | Ein Händler von Marke B soll sich nicht in einem Shop anmelden, der wie Marke A aussieht. |
| Eigener Kategoriebaum | Ein Katalog pro Store heißt ein Kategoriebaum. Umgekehrt kann laut Salesforce ein Katalog mehreren Stores dienen, zwei Marken mit gleichen Teilen teilen sich dann die Produktdaten. |
| Anderer Checkout oder anderes ERP | Erweiterungen für Preise, Bestand oder Auftragsanlage werden pro Store zugeordnet. |
| Andere Käufer | Endkunden neben Händlern bekommen einen eigenen D2C-Store mit gemeinsamen Produktdaten. |

Die Lizenzseite setzt eine frühere Grenze als die 100 Stores pro Org. Laut [Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) enthält die Growth Edition sechs Storefronts, die Advanced Edition zehn. Und jeder weitere Store bringt eigene Seiten, Übersetzungen und einen eigenen Regressionstest nach jedem der drei Salesforce-Releases im Jahr. Die Entscheidung mit Beispiel steht in [Ein B2B-Store oder mehrere](../../../blog/b2b-store-laender-marken-haendler/).

## Teile pro Maschine: wo Entitlements aufhören

"Darf dieser Händler dieses Teil kaufen?" beantworten Entitlements. "Passt dieses Teil in diese Maschine?" beantworten sie nicht, denn eine Seriennummer kommt in der Kette nicht vor. Eine Buyer Group pro Maschine scheitert an den Grenzen: Eine Normschraube in 6.000 Maschinen läge weit über 2.000 Gruppen, und ein Händler mit 40 Maschinen hätte mehr als 20 Gruppen.

Der robuste Weg ist eine Maschinenseite. Eine eigene Lightning-Web-Komponente zeigt die Maschinen, die auf den Account des Händlers registriert sind, und für jede die ersatzteilrelevanten Positionen, aus Salesforce-Assets oder live aus dem PLM. Preis und Kaufrecht kommen weiter aus Entitlements und Preisbüchern. Die normale Suche pro Maschine zu filtern geht über Endpoint-Erweiterungen wie `Commerce_Endpoint_Search_ProductSearch` aus der [Liste der verfügbaren Erweiterungen](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), aber die Basisklasse führt Salesforce in der [Apex-Referenz](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) noch als Beta. Damit würde ich warten.

```ablauf
sf: Händler-Account, Maschine als Asset, Maschinenseite, Entitlements und Preise
ext: PLM
Händler-Account --registriert--> Maschine als Asset
Maschine als Asset --Positionen--> Maschinenseite
PLM ..live..> Maschinenseite
Entitlements und Preise --Kaufrecht und Preis--> Maschinenseite
```

Die Daten entscheiden mehr als die Komponente: Ohne Stückliste pro Seriennummer, also die Teile, die in genau dieser Maschine verbaut sind, kann kein Shop die Frage beantworten. Die Optionen stehen in [Ersatzteilshop: nur Teile zur eigenen Maschine](../../../blog/ersatzteilshop-teile-pro-maschine/), dieselbe Datenlage aus Sicht eines Agenten in [Ersatzteile per Seriennummer finden](../../../blog/ersatzteile-seriennummer-ki-agent/). Wie die installierte Basis als Asset gepflegt wird, behandelt die Masterclass Manufacturing Cloud im Kapitel [Garantie und After-Sales](../../manufacturing-cloud/garantie-und-after-sales/). Eine Regel lockere ich nie: Der Händler sieht nur Maschinen, die auf seinen eigenen Account registriert sind, gelesen aus dem Asset, nie aus einem Freitextfeld.

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer verkauft Ersatzteile über 800 Händler in 12 Ländern, mit drei Händlerstufen und zwei Marken. Alle Details sind Annahmen.

- Land und Stufe ergeben 36 Buyer Groups, die Marken zwei weitere. Jeder Händleraccount sitzt in zwei Gruppen, weit unter 20, und ein gängiges Teil hängt an 36 Gruppen statt an 800.
- Beide Marken haben eigene Kategoriebäume, also zwei Stores. Das passt in die sechs Storefronts der Growth Edition.
- 30.000 aktive Ersatzteile kommen aus SAP, 8.000 davon haben Vorgängernummern. Diese stehen in einem durchsuchbaren Feld, Synonymregeln bleiben für Begriffe.
- Teile pro Maschine zeigt zuerst eine Maschinenseite für die drei wichtigsten Baureihen.

## Wo fangen Sie an?

Schreiben Sie das Entitlement-Konzept auf eine Seite, bevor jemand Daten lädt:

- die Liste der Buyer Groups mit den Kriterien, die einen Account hineinbringen,
- die Liste der Entitlement Policies mit dem Sortiment, das jede abdeckt,
- eine Matrix, welche Gruppe welche Policy und welches Preisbuch bekommt,
- eine Zählung gegen die Grenzen oben, für heute und für drei Jahre später,
- 200 echte Suchbegriffe von Händlern aus E-Mails und Telefonnotizen, gegen einen Teststore geprüft.

Die ERP-Felder, die Mitgliedschaften und Suche speisen, wandern danach in die Schnittstellenliste aus [Kapitel 4](../erp-integration-bestand-auftraege/). Solche Konzepte prüfe ich, bevor ein Partner baut, im Rahmen von [Salesforce-Architektur](../../../leistungen/salesforce-architektur/); welche Daten aus welchem System kommen, ist Teil von [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/). Alle Kapitel finden Sie auf der [Übersichtsseite](../).

Wenige Buyer Groups und saubere Produktdaten entscheiden mehr über einen B2B-Shop als jede Sucheinstellung.
