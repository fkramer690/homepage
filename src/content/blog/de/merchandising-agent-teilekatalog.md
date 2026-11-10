---
title: "Merchandising Agent: Was er im Teilekatalog leistet"
metaTitle: "Salesforce Merchandising Agent: Funktionen und Grenzen"
description: "Der Merchandising Agent in Salesforce B2B Commerce für Ersatzteilshops: was dokumentiert ist, was er kostet, warum nur Englisch und wo seine Grenzen liegen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: merchandising-agent-teilekatalog
translationKey: commerce-merchandising-agent
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Merchandising Agent, Agentforce, Suche, Ersatzteile, Katalog]
takeaways:
  - "Auf der Preisseite führen Growth und Advanced den Merchant Agent unter Agentforce. Einen eigenen Preis nennt Salesforce nicht."
  - "Der Merchandising Agent für B2B ist seit August 2026 allgemein verfügbar. Die Hilfe dokumentiert vor allem Verkaufsaktionen und Kennzahlen."
  - "Salesforce dokumentiert für Agentforce Merchandising nur Englisch. Deutsche Anfragen und Fachbegriffe sollten Sie vor einem Pilot selbst testen."
  - "Der Agent setzt generative KI, Agentforce und Data 360 voraus und verbraucht Einstein Requests, auch in der Sandbox. Grenzen für Suchregeln gelten weiter."
  - "Materialnummer, Einheit und Vertriebsstatus bleiben im ERP oder PIM. Der Agent ändert Suchreihenfolge und Aktionen, nicht die Stammdaten."
faq:
  - q: "Was ist der Merchandising Agent in Salesforce B2B Commerce?"
    a: "Ein Backoffice-Agent für Merchandiser. Laut Salesforce hebt er Produkte in der Suche hervor oder stuft sie herab, legt neue Produkte an und verwaltet Käufer-Accounts im Gespräch statt per Klick. Salesforce führt ihn für B2B als allgemein verfügbar seit August 2026. Welche Aktionen in Ihrer Org tatsächlich verfügbar sind, prüfen Sie am besten in einer Sandbox."
  - q: "Versteht der Merchandising Agent Deutsch?"
    a: "Salesforce dokumentiert für Agentforce Merchandising derzeit nur Englisch als unterstützte Sprache. Für ein deutschsprachiges Team würde ich nicht voraussetzen, dass deutsche Anfragen produktiv funktionieren, sondern Sprache, Fachbegriffe und Teilenummern in der eigenen Org testen."
  - q: "Ist der Merchant Agent in B2B Commerce enthalten?"
    a: "Die Preisseite für B2B führt den Merchant Agent unter Agentforce in der Growth und in der Advanced Edition. Wie die Nutzung des Agenten gezählt wird, steht dort nicht; lassen Sie sich das schriftlich bestätigen."
  - q: "Was brauche ich, um Agentforce Skills for Merchandising zu aktivieren?"
    a: "Trailhead nennt generative KI von Salesforce, Agentforce, Bots und Data 360, aktiviert für den Shop. Die Einrichtung erfolgt ohne Code in der Commerce-App, Lizenzdetails stehen im Hilfeartikel von Salesforce zur Aktivierung."
  - q: "Sollte der Merchandising Agent Ersatzteile im Shop anlegen?"
    a: "Teile, die im ERP geführt werden, würde ich ihn nicht anlegen lassen. Materialnummer, Einheit und Vertriebsstatus werden über die Schnittstelle aus ERP oder PIM geliefert; der Agent eignet sich für Suchreihenfolge, Aktionen und Produkte, die es nur im Shop gibt."
draft: false
---

Der Merchandising Agent in Salesforce B2B Commerce erledigt Backoffice-Arbeit im Gespräch: Laut Salesforce hebt er Produkte in der Suche hervor oder stuft sie herab, legt Produkte an und verwaltet Käufer-Accounts. Seine Merchandising-Skills fassen Bestellwert und Conversion zusammen und entwerfen Verkaufsaktionen. Dokumentiert ist er derzeit nur für Englisch. Im Ersatzteilkatalog eines Herstellers ist die Suchreihenfolge der nützliche Teil: ersetzte Teile nach unten, aktuelle Sätze und Verschleißteile nach oben. Produktstammdaten bleiben in ERP oder PIM, und jede Änderung des Agenten würde ich prüfen lassen. Merchant Agent ist in beiden Editionen aufgeführt, allgemein verfügbar ist der B2B Merchandising Agent seit August 2026.

## Was ist der Merchandising Agent?

Für den Shopbetrieb in Salesforce B2B Commerce sind zwei Agenten relevant. Der Buyer Agent spricht mit Händlern, darum geht es in [B2B Buyer Agent: Bestellen per WhatsApp und SMS](../b2b-buyer-agent-whatsapp-bestellen/). Der Merchandising Agent arbeitet für das Team, das den Shop betreibt.

Salesforce verwendet dafür drei Namen auf verschiedenen Seiten und beschreibt dort nicht ganz denselben Umfang:

- **Merchant Agent** ist der Posten unter Agentforce auf der [Preisseite für B2B](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), in der Growth und in der Advanced Edition.
- **Merchandising-Agent (B2B)** steht auf der [Innovationsseite zu Commerce](https://www.salesforce.com/de/commerce/innovations/) mit der Angabe "AV Aug. 26". Salesforce beschreibt ihn als Backoffice-Agenten, der im Gespräch statt per Klick Produkte in den Suchergebnissen hervorhebt oder herabstuft, neue Produkte einführt und Käufer-Accounts verwaltet.
- **Agentforce Skills for Merchandising** heißt die [Trailhead-Einheit](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent), die Kennzahlen und Verkaufsaktionen erklärt. Auch die B2B-Hilfe nennt als Themen vor allem Verkaufsaktionen und Geschäftskennzahlen.

Wichtig für deutsche Shops: Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_merchant_considerations.htm&language=en_US&type=5) unterstützt Agentforce Merchandising derzeit nur Englisch. Ein Merchandising-Team, das auf Deutsch arbeitet, sollte Sprache, Fachbegriffe und Teilenummern in der eigenen Org testen, bevor es einen Prozess darauf aufbaut.

```hinweis offen
Wie die drei lizenzrechtlich zusammenhängen, erklärt Salesforce auf diesen Seiten nicht. Ich würde das Account-Team schriftlich fragen, welche Skills der enthaltene Merchant Agent in Ihrem Vertrag abdeckt, und in einer Sandbox prüfen, welche Aktionen in Ihrer Org wirklich verfügbar sind.
```

## Was leistet er im Ersatzteilkatalog?

Ein Ersatzteilkatalog ist ein Shop, in dem die Suche fast alles entscheidet. Händler tippen eine Teilenummer, eine alte Nummer oder eine kurze Beschreibung und erwarten das aktuelle Teil ganz oben. Drei Aufgaben des Agenten passen gut dazu.

**Boost und Bury.** Boost-und-Bury-Regeln heben Produkte in Such- und Kategorieergebnissen an oder senken sie ab. Der [Salesforce-Beitrag zu B2B Commerce vom Juli 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) nennt die Beispiele: margenstarke, überschüssige oder beworbene Produkte nach oben, Teile mit wenig Bestand oder am Ende ihres Lebenszyklus nach unten. Für Ersatzteile heißt das: ersetzte Nummern nach unten, Nachfolgeteil und komplette Reparatursätze nach oben. Heute pflegt ein Merchandiser diese Regeln von Hand. Die Suche unterstützt Regeln nach Attributen, und laut Innovationsseite hebt der Agent Produkte im Gespräch hervor oder stuft sie herab. Ob er aus einer Anfrage wie "alle Filter mit Status Auslauf nach unten" eine solche Regel baut, würde ich in der eigenen Org testen.

**Neue Produkte.** Der Agent kann Produkte anlegen. Das passt für Artikel, die es nur im Shop gibt, etwa ein Paket aus Verschleißteilen für ein Wartungsintervall. Teile aus dem ERP sollten weiterhin über die Schnittstelle geliefert werden.

**Käufer-Accounts.** Der Agent kann Käufer-Accounts verwalten. Bei einem Hersteller sind das Anfragen wie "Lege die neue Filiale von Händler X als Käufer-Account an". Welcher Käufergruppe der Account zugeordnet wird, entscheidet, was er sieht und was er zahlt. Mit diesem Skill würde ich am vorsichtigsten umgehen. Wie Käufergruppen und Berechtigungen aufgebaut werden, steht im Kapitel [Katalog, Suche, Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/).

## Kennzahlen zusammenfassen, Verkaufsaktionen entwerfen

Laut Trailhead rufen die Agentforce Skills for Merchandising den durchschnittlichen Bestellwert (AOV) und die Conversion Rate eines Shops ab, fassen sie zusammen und nennen abgeleitete Erkenntnisse wie die schwächste Kategorie. Das Beispiel auf Trailhead ist ein B2B-Shop. Außerdem schlagen die Skills Verkaufsaktionen (Promotions) vor, indem sie vordefinierte Vorlagen in Salesforce Commerce passend auswählen, und erzeugen Text, Bedingungen und Konfiguration.

Trailhead nennt das "semiautonomous": Sie prüfen die Details der Aktion und ändern sie, bevor sie veröffentlicht wird. Aktionen in einem Ersatzteilshop sind bei Herstellern oft klein: ein Rabatt auf einen Wartungssatz vor der Saison oder versandfrei ab einem Bestellwert. Der Agent spart die Klicks. Ob ein Rabatt nach Händlerverträgen und Preisregeln erlaubt ist, bleibt eine Entscheidung des Vertriebs.

Zwei Kennzahlen zählen im Teileshop mehr als der Bestellwert: Suchen ohne Treffer und der Anteil der Auftragspositionen, die über den Shop eingehen. Die Suchanalyse über Data Cloud, die der Juli-Beitrag nennt, zeigt Suchen ohne Treffer. Ob der Agent auch diese Zahlen zusammenfassen kann, ist auf den Seiten, die ich gelesen habe, nicht dokumentiert.

## Generative KI, Agentforce und Data 360 als Voraussetzung

Trailhead nennt die Voraussetzungen: generative KI von Salesforce, Agentforce, Bots und Data 360, aktiviert für den Shop. Die aktuelle Einrichtungshilfe führt Bots nicht mehr als eigenen Schritt; maßgeblich ist die Hilfe für Ihr Release. Die Einrichtung erfolgt geführt in der Commerce-App, Themen und Aktionen sind für Commerce vorkonfiguriert. Für die Lizenzierung verweist Trailhead auf den Hilfeartikel von Salesforce zur Aktivierung der Agentforce Skills for Merchandising.

Die Editionen enthalten laut Preisseite Data-Cloud-Credits: 250K in Growth und 500K in Advanced. Für Agentforce Merchandising nennt Salesforce aber Einstein Requests als Nutzungsmetrik, dazu möglicherweise Data-360-Credits, in Produktion und Sandbox. Wie viel eine einzelne Anfrage verbraucht, ist nicht veröffentlicht. Ich würde den Verbrauch deshalb vor dem Go-live in einer Sandbox mit echten Anfragen messen. Wie eine solche Schätzung funktioniert, zeige ich in [Agentforce-Kosten für Hersteller](../flex-credits-agentforce-kosten-pro-aktion/).

Die Grenzen des Shops gelten auch für den Agenten. Der Developer Guide nennt diese Werte:

```kennzahlen
100 | Boost-und-Bury-Regeln pro Shop
100 | Synonymregeln pro Shop
70 | durchsuchbare und filterbare Attribute plus Sortierregeln zusammen
quelle: Salesforce Developers, [Suchgrenzen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html)
```

Die Hilfe- und Release-Seiten unterscheiden zusätzlich zwischen Regeln für den ganzen Shop, für Kategorien und für Suchbegriffe, mit teils niedrigeren Werten. Prüfen Sie die Grenzwerte Ihres Releases in der Org. Ein Agent, der für jede Anfrage eine neue Regel schreibt, schöpft sie in jedem Fall schnell aus. Jemand muss die Regeln regelmäßig aufräumen, egal, wer sie angelegt hat.

## Was sollte der Agent nicht tun?

Produktstammdaten gehören in ERP oder PIM. Materialnummer, Einheit, Vertriebsstatus und Nachfolgeteil werden dort gepflegt, der Shop erhält eine Kopie. Ändert der Agent ein Produkt in Salesforce, überschreibt die nächste Nachtladung die Änderung, oder, schlimmer noch, Shop und ERP weichen voneinander ab. Wo welche Produktdaten gepflegt werden sollten, erkläre ich in [Produktdaten für B2B Commerce: PIM, ERP oder Salesforce?](../produktdaten-b2b-commerce-pim-erp/).

Meine Regel für einen Teileshop:

| Aufgabe | Agent | Grund |
|---|---|---|
| Boost und Bury in der Suche | Ja, mit Prüfung | Einstellung nur im Shop, umkehrbar |
| Verkaufsaktion aus Vorlage | Ja, mit Freigabe durch den Vertrieb | Wirkt auf Preise |
| Produkt, das es nur im Shop gibt | Ja, mit Prüfung | Kein Master im ERP |
| Teil aus dem ERP-Materialstamm | Nein | ERP oder PIM ist Master |
| Neuer Käufer-Account | Nur mit benanntem Freigeber | Entscheidet Sichtbarkeit und Preise |

Jede Änderung des Agenten sollte nachvollziehbar sein: Wer hat gefragt, was hat sich geändert, wer hat freigegeben. Welche Protokolle Salesforce dafür bietet, steht in [Audit-Trail für KI-Agenten in Salesforce: welche Logs?](../audit-trail-ki-agenten-salesforce/).

## Beispiel: 60.000 Ersatzteile für 300 Händler

Angenommen, ein Hersteller von Kompressoren betreibt einen B2B-Shop mit 60.000 Ersatzteilen für 300 Händler. Jedes Quartal ersetzt die Konstruktion einige Hundert Teilenummern. Heute pflegt eine Merchandiserin die Suchregeln von Hand und ist zwei Monate im Rückstand.

Nach jeder ERP-Aktualisierung weist sie den Agenten an: "Stufe jedes Teil mit Vertriebsstatus ersetzt herab und hebe sein Nachfolgeteil hervor." Der Agent schlägt die Regeln vor, sie prüft eine Stichprobe und gibt frei. Einmal im Monat fragt sie nach den Suchen ohne Treffer und meldet fehlende alte Nummern als Synonyme oder Attribute an das PIM-Team. Die Suche selbst beschreibe ich in [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/).

## Lizenz und enthaltene Skills klären

1. **Lizenz klären.** Fragen Sie, welche Skills der enthaltene Merchant Agent abdeckt und wie die Nutzung gezählt wird.
2. **Erst die Daten.** Sauberer Vertriebsstatus und Nachfolgeteil im ERP machen gute Boost-und-Bury-Anfragen erst möglich.
3. **Mit der Suchreihenfolge beginnen.** Änderungen daran sind umkehrbar, bleiben im Shop und zeigen schnell Wirkung bei den Suchen ohne Treffer.
4. **Prüfregeln festlegen.** Verkaufsaktionen und Käufer-Accounts nur mit benanntem Freigeber.
5. **Grenzen im Blick behalten.** Regelgrenzen des eigenen Releases kennen und monatlich aufräumen.
6. **Sprache testen.** Deutsche Anfragen und Teilenummern im Pilot prüfen, solange Salesforce nur Englisch dokumentiert.

Das Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) ordnet den Merchandising Agent neben dem Buyer Agent und der Einführung ein. Wenn Sie klären möchten, welchem System welche Daten zwischen ERP, PIM und Salesforce zugeordnet sind, lesen Sie weiter bei [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
