---
title: "Merchandising Agent: Was er im Teilekatalog leistet"
description: "Was der Merchandising Agent in Salesforce B2B Commerce für den Ersatzteilkatalog eines Herstellers leistet: Boost und Bury, Produkte, Käufer-Accounts, Grenzen."
pubDate: 2026-10-28
lang: de
slug: merchandising-agent-teilekatalog
translationKey: commerce-merchandising-agent
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Merchandising Agent, Agentforce, Suche, Ersatzteile, Katalog]
takeaways:
  - "Beide B2B-Commerce-Editionen, Growth und Advanced, führen auf der Preisseite von Salesforce Merchant Agent unter Agentforce; einen eigenen Preis nennt Salesforce nicht."
  - "Der Merchandising Agent für B2B ist auf August 2026 datiert und hebt Produkte in der Suche hervor oder stuft sie herab, legt neue Produkte an und verwaltet Käufer-Accounts im Gespräch."
  - "Agentforce Skills for Merchandising fassen durchschnittlichen Bestellwert und Conversion Rate eines Shops zusammen und entwerfen Aktionen aus Vorlagen, die ein Mensch vor dem Einsatz prüft."
  - "Der Agent braucht aktivierte generative KI, Agentforce und Data 360; ein Shop erlaubt höchstens 100 Boost-und-Bury-Regeln, egal ob ein Mensch oder ein Agent sie anlegt."
  - "Materialnummer, Einheit und Vertriebsstatus bleiben im ERP oder PIM; lassen Sie den Agenten Suchreihenfolge und Aktionen ändern, nicht die Produktstammdaten."
faq:
  - q: "Was ist der Merchandising Agent in Salesforce B2B Commerce?"
    a: "Ein Backoffice-Agent für Merchandiser. Laut Salesforce hebt er Produkte in der Suche hervor oder stuft sie herab, legt neue Produkte an und verwaltet Käufer-Accounts im Gespräch statt per Klick. Salesforce führt ihn für B2B mit Verfügbarkeit im August 2026."
  - q: "Ist der Merchant Agent in B2B Commerce enthalten?"
    a: "Die Preisseite für B2B führt Merchant Agent unter Agentforce in der Growth und in der Advanced Edition. Wie die Nutzung des Agenten gezählt wird, steht dort nicht, lassen Sie sich das schriftlich geben."
  - q: "Was brauche ich, um Agentforce Skills for Merchandising zu aktivieren?"
    a: "Trailhead nennt generative KI von Salesforce, Agentforce, Bots und Data 360, aktiviert für den Shop. Die Einrichtung läuft ohne Code in der Commerce-App, Lizenzdetails stehen im Hilfeartikel von Salesforce zur Aktivierung."
  - q: "Sollte der Merchandising Agent Ersatzteile im Shop anlegen?"
    a: "Teile, die es im ERP gibt, würde ich ihn nicht anlegen lassen. Materialnummer, Einheit und Vertriebsstatus kommen über die Schnittstelle aus ERP oder PIM; der Agent passt für Suchreihenfolge, Aktionen und Produkte, die es nur im Shop gibt."
draft: false
---

Der Merchandising Agent in Salesforce B2B Commerce erledigt Backoffice-Arbeit im Gespräch: Er hebt Produkte in der Suche hervor oder stuft sie herab, legt Produkte an und verwaltet Käufer-Accounts, seine Merchandising-Skills fassen Bestellwert und Conversion zusammen und entwerfen Aktionen. Im Ersatzteilkatalog eines Herstellers ist die Suchreihenfolge der nützliche Teil: ersetzte Teile nach unten, aktuelle Sätze und Verschleißteile nach oben. Produktstammdaten bleiben in ERP oder PIM, und jede Änderung des Agenten braucht eine Prüfung. Merchant Agent steht in beiden Editionen, den B2B Merchandising Agent datiert Salesforce auf August 2026.

## Was ist der Merchandising Agent?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, hat zwei Arten von Agenten. Der Buyer Agent spricht mit Händlern, darum geht es in [B2B Buyer Agent: Bestellen per WhatsApp und SMS](../b2b-buyer-agent-whatsapp-bestellen/). Der Merchandising Agent arbeitet für die Leute, die den Shop betreiben.

Salesforce verwendet dafür drei Namen auf verschiedenen Seiten:

- **Merchant Agent** ist der Posten unter Agentforce auf der [Preisseite für B2B](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), in der Growth und in der Advanced Edition.
- **Merchandising-Agent (B2B)** steht auf der [Innovationsseite zu Commerce](https://www.salesforce.com/de/commerce/innovations/) mit "AV Aug. 26". Salesforce beschreibt ihn als Backoffice-Agenten, der im Gespräch statt per Klick Produkte in den Suchergebnissen hervorhebt oder herabstuft, neue Produkte einführt und Käufer-Accounts verwaltet.
- **Agentforce Skills for Merchandising** heißt die [Trailhead-Einheit](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent), die Kennzahlen und Aktionen erklärt.

Wie die drei lizenzrechtlich zusammenhängen, erklärt Salesforce auf diesen Seiten nicht. Ich würde das Account-Team schriftlich fragen, welche Skills der enthaltene Merchant Agent in Ihrem Vertrag abdeckt.

## Was leistet er im Ersatzteilkatalog?

Ein Ersatzteilkatalog ist ein Shop, in dem die Suche fast alles entscheidet. Händler tippen eine Teilenummer, eine alte Nummer oder eine kurze Beschreibung und erwarten das aktuelle Teil ganz oben. Drei Aufgaben des Agenten passen gut dazu.

**Boost und Bury.** Boost-und-Bury-Regeln heben Produkte in Such- und Kategorieergebnissen an oder senken sie ab. Der [Salesforce-Beitrag zu B2B Commerce vom Juli 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) nennt die Beispiele: margenstarke, überschüssige oder beworbene Produkte nach oben, Teile mit wenig Bestand oder am Ende ihres Lebenszyklus nach unten. Für Ersatzteile heißt das: ersetzte Nummern nach unten, Nachfolgeteil und komplette Reparatursätze nach oben. Heute pflegt ein Merchandiser diese Regeln von Hand, mit dem Agenten wird aus einer Bitte wie "alle Filter mit Status Auslauf nach unten" eine Regel.

**Neue Produkte.** Der Agent kann Produkte anlegen. Das passt für Artikel, die es nur im Shop gibt, etwa ein Paket aus Verschleißteilen für ein Wartungsintervall. Teile aus dem ERP sollten weiter über die Schnittstelle kommen.

**Käufer-Accounts.** Der Agent kann Käufer-Accounts verwalten. Bei einem Hersteller sind das Bitten wie "Lege die neue Filiale von Händler X als Käufer-Account an". In welcher Käufergruppe der Account landet, entscheidet, was er sieht und was er zahlt. Mit diesem Skill würde ich am vorsichtigsten umgehen. Wie Käufergruppen und Berechtigungen aufgebaut werden, steht im Kapitel [Katalog, Suche, Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/).

## Was bringen Kennzahlen und Aktionen?

Laut Trailhead rufen die Agentforce Skills for Merchandising den durchschnittlichen Bestellwert (AOV) und die Conversion Rate eines Shops ab, fassen sie zusammen und nennen abgeleitete Erkenntnisse wie die schwächste Kategorie. Das Beispiel auf Trailhead ist ein B2B-Shop. Außerdem schlagen die Skills Aktionen vor, indem sie vordefinierte Aktionsvorlagen in Salesforce Commerce passend auswählen, und erzeugen Text, Bedingungen und Konfiguration.

Trailhead nennt das "semiautonomous": Sie prüfen die Details der Aktion und ändern sie, bevor sie rausgeht. Aktionen in einem Ersatzteilshop sind bei Herstellern oft klein: ein Rabatt auf einen Wartungssatz vor der Saison oder versandfrei ab einem Bestellwert. Der Agent spart die Klicks. Ob ein Rabatt nach Händlerverträgen und Preisregeln erlaubt ist, bleibt eine Entscheidung des Vertriebs.

Zwei Kennzahlen zählen im Teileshop mehr als der Bestellwert: Suchen ohne Treffer und der Anteil der Auftragspositionen über den Shop. Suchen ohne Treffer zeigt die Suchanalyse über Data Cloud, die der Juli-Beitrag nennt. Ob der Agent auch diese Zahlen zusammenfassen kann, ist auf den Seiten, die ich gelesen habe, nicht dokumentiert.

## Was braucht der Agent, bevor er arbeitet?

Trailhead nennt die Voraussetzungen: generative KI von Salesforce, Agentforce, Bots und Data 360, aktiviert für den Shop. Die Einrichtung läuft geführt in der Commerce-App, Themen und Aktionen sind für Commerce vorkonfiguriert. Für die Lizenzierung verweist Trailhead auf den Hilfeartikel von Salesforce zur Aktivierung der Agentforce Skills for Merchandising.

Die Editionen enthalten laut Preisseite Data-Cloud-Credits: 250K in Growth und 500K in Advanced. Was der Agent pro Anfrage verbraucht, ist nicht veröffentlicht. Ich würde den Verbrauch deshalb vor dem Go-live in einer Sandbox mit echten Anfragen messen. Wie so eine Schätzung funktioniert, zeige ich in [Flex Credits: Agentforce-Kosten pro Aktion schätzen](../flex-credits-agentforce-kosten-pro-aktion/).

Die Grenzen des Shops gelten auch für den Agenten. Laut den [Suchgrenzen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) hat ein Shop höchstens 100 Boost-und-Bury-Regeln und 100 Synonymregeln, beides harte Grenzen, und durchsuchbare Attribute, filterbare Attribute und Sortierregeln teilen sich ein Maximum von 70. Ein Agent, der für jede Bitte eine neue Regel schreibt, verbraucht die 100 schnell. Jemand muss die Regeln regelmäßig aufräumen, egal wer sie angelegt hat.

## Was sollte der Agent nicht tun?

Produktstammdaten gehören in ERP oder PIM. Materialnummer, Einheit, Vertriebsstatus und Nachfolgeteil werden dort gepflegt, der Shop bekommt eine Kopie. Ändert der Agent ein Produkt in Salesforce, überschreibt die nächste Nachtladung die Änderung, oder schlimmer, Shop und ERP laufen auseinander. Wo welche Produktdaten hingehören, erkläre ich in [Produktdaten für B2B Commerce: PIM, ERP oder Salesforce?](../produktdaten-b2b-commerce-pim-erp/).

Meine Regel für einen Teileshop:

| Aufgabe | Agent | Grund |
|---|---|---|
| Boost und Bury in der Suche | Ja, mit Prüfung | Einstellung nur im Shop, umkehrbar |
| Aktion aus Vorlage | Ja, mit Freigabe durch den Vertrieb | Wirkt auf Preise |
| Produkt, das es nur im Shop gibt | Ja, mit Prüfung | Kein Master im ERP |
| Teil aus dem ERP-Materialstamm | Nein | ERP oder PIM ist Master |
| Neuer Käufer-Account | Nur mit benanntem Freigeber | Entscheidet Sichtbarkeit und Preise |

Jede Änderung des Agenten sollte nachvollziehbar sein: Wer hat gefragt, was hat sich geändert, wer hat freigegeben. Welche Protokolle Salesforce dafür bietet, steht in [Audit Trail für KI-Agenten in Salesforce: welche Logs?](../audit-trail-ki-agenten-salesforce/).

## Wie könnte das in der Praxis aussehen?

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren betreibt einen B2B-Shop mit 60.000 Ersatzteilen für 300 Händler. Jedes Quartal ersetzt die Konstruktion einige Hundert Teilenummern. Heute pflegt eine Merchandiserin die Suchregeln von Hand und liegt zwei Monate zurück.

Mit dem Agenten fragt sie nach jeder ERP-Aktualisierung: "Stufe jedes Teil mit Vertriebsstatus ersetzt herab und hebe sein Nachfolgeteil hervor." Der Agent schlägt die Regeln vor, sie prüft eine Stichprobe und gibt frei. Einmal im Monat fragt sie nach den Suchen ohne Treffer und gibt fehlende alte Nummern als Synonyme oder Attribute an das PIM-Team. Die Suchseite davon beschreibe ich in [B2B-Shop-Suche: Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/).

## Wo fangen Sie an?

1. **Lizenz klären.** Fragen Sie, welche Skills der enthaltene Merchant Agent abdeckt und wie Nutzung gezählt wird.
2. **Erst die Daten.** Sauberer Vertriebsstatus und Nachfolgeteil im ERP machen gute Boost-und-Bury-Bitten erst möglich.
3. **Mit der Suchreihenfolge beginnen.** Sie ist umkehrbar, bleibt im Shop und zeigt schnell Wirkung bei den Suchen ohne Treffer.
4. **Prüfregeln festlegen.** Aktionen und Käufer-Accounts nur mit benanntem Freigeber.
5. **Grenzen im Blick behalten.** 100 Boost-und-Bury-Regeln pro Shop, mit monatlichem Aufräumen.

Das Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) stellt den Merchandising Agent neben den Buyer Agent und die Einführung. Für die Frage, wem welche Daten zwischen ERP, PIM und Salesforce gehören, lesen Sie weiter bei [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Der Merchandising Agent spart Klicks bei Suche und Aktionen, solange die Produktstammdaten dort bleiben, wo sie heute gepflegt werden. Wenn Sie eine unabhängige Einschätzung zu Ihrem Teileshop möchten, [schreiben Sie mir](#contact).
