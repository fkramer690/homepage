---
title: "Data 360 Kosten für KI-Agenten: Kataloge und Handbücher"
description: "Was Data 360 berechnet, wenn ein Agentforce-Agent Ersatzteilkataloge und Handbücher liest: Verarbeitung pro MB, Parser, Abfragen, Neuindexierung und Sandbox."
pubDate: 2026-10-27
lang: de
slug: data-360-kosten-fuer-ki-agenten
translationKey: data-360-costs-for-agents
topic: data
categories: [ai]
contactBrief: licences
tags: [Data 360, Agentforce, Flex Credits, Grounding, Ersatzteile, Maschinenbau]
takeaways:
  - "Data 360 berechnet das Grounding auf Dokumenten an drei Stellen: Verarbeitung pro MB beim Indexieren, Abfragen pro Million Zeilen bei jeder Suche des Agenten und Speicher für Dateien, Chunks und Indexobjekte."
  - "LLM-basiertes Parsing, das Ersatzteilkataloge mit Explosionszeichnungen oft brauchen, läuft als Intelligent Processing zu 600 Credits pro MB, viermal so teuer wie die 150 Credits des Standard-Parsers."
  - "Im Szenario kosten die Suchen des Agenten rund 14.400 Credits im Monat, 400 MB geänderte Dokumente dagegen 195.000; die Rechnung treiben geänderte Dokumente, nicht Fragen."
  - "Ändert sich ein Feld oder ein Anhang an einem Quelldatensatz, werden alle Anhänge dieses Datensatzes neu indexiert; Kataloge gehören nicht an Datensätze, die eine ERP-Schnittstelle jede Nacht aktualisiert."
  - "In der Sandbox hat Data 360 keine Mengenstaffeln: 6.000 MB Kataloge mit LLM-Parsing kosten dort 2,88 Mio. Credits, mehr als die 2,22 Mio. in Produktion."
faq:
  - q: "Was kostet Data 360 pro MB Dokumente?"
    a: "Laut Flex Credits Rate Card kostet Unstructured Processing in der Basisstaffel 150 Credits pro MB, Intelligent Processing wie LLM-basiertes Parsing 600 Credits pro MB. Bei 500 € je 100.000 Credits sind das 0,75 € und 3 € pro MB. Höhere Monatsmengen bekommen je Nutzungsart günstigere Sätze."
  - q: "Kosten die Suchen eines Agenten in Data 360 Credits?"
    a: "Ja. Abfragen kosten in der Basisstaffel 3 Credits pro Million Zeilen. Bei Vektorsuche zählt Salesforce die Vektoren im Suchindex, bei hybrider Suche Vektoren und Keyword-Datensätze, hybride Suche verdoppelt also ungefähr die gezählten Zeilen."
  - q: "Wird ein Dokument erneut berechnet, wenn es sich ändert?"
    a: "Ja, ein geändertes Dokument wird erneut verarbeitet. Liegt der Suchindex auf Datensätzen mit Dateianhängen, löst die Änderung eines Feldes oder eines Anhangs die Neuindexierung aller Anhänge dieses Datensatzes aus."
  - q: "Sind Data-360-Credits in den Kostenbeispielen von Salesforce enthalten?"
    a: "Nein. Die Agentforce-Preisseite vermerkt bei ihren Beispielen, dass Data-360-Credits und andere Verbrauchsdienste nicht enthalten sind. Budgetieren Sie sie separat."
  - q: "Wie teste ich Grounding auf Dokumenten ohne hohe Rechnung?"
    a: "Mit einer repräsentativen Stichprobe. Data 360 hat in der Sandbox keine Mengenstaffeln, ein vollständiger Katalog kostet dort mehr als in Produktion. Intelligent Context erlaubt Tests einer Konfiguration mit bis zu fünf Dateien."
draft: false
---

Die Data 360 Kosten für KI-Agenten entstehen vor allem durch Dokumente, die sich ändern, und kaum durch die Fragen an den Agenten. Liest ein Agentforce-Agent Ersatzteilkataloge, Betriebsanleitungen und Serviceinformationen, berechnet Data 360 fürs Indexieren 150 Flex Credits pro MB mit dem Standard-Parser und 600 pro MB mit LLM-basiertem Parsing. Suchen kosten 3 Credits pro Million Zeilen. Im Szenario unten kosten die Suchen rund 72 € im Monat, das Neuindexieren geänderter Dokumente fast 1.000 €. Die Hebel sind der Parser, der Dokumentenumfang und der Ort, an dem die Dateien liegen.

## Was berechnet Data 360, wenn ein Agent Dokumente liest?

Ein Agent liest kein PDF direkt. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud) zerlegt Data 360 das Dokument in Abschnitte (Chunks), wandelt jeden Chunk in einen Vektor um und legt ihn in einem Suchindex ab. Zur Laufzeit holt ein Retriever die passenden Chunks für den Prompt. Salesforce fasst das in den [Abrechnungshinweisen zu Agentforce Coworker](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-billing-considerations.html) in einem Satz zusammen: Data 360 verbraucht Credits, um Inhalte zu verarbeiten, semantisch zu indexieren und abzufragen. Wie Data 360 über Dokumente hinaus Kontext zusammenstellt, beschreibe ich in [Agent Context Engine einfach erklärt](../salesforce-agent-context-engine-erklaert/).

Daraus ergeben sich drei Zähler:

- **Verarbeitung pro MB**, sobald ein Dokument indexiert oder neu indexiert wird, getrennt nach Unstructured Processing und Intelligent Processing. Laut [Hilfeartikel zur Abrechnung unstrukturierter Daten](https://help.salesforce.com/s/articleView?id=data.c360_a_unstructured_data_billing_considerations.htm&language=en_US&type=5) zählen Chunking und Vektorisierung nur einmal, ein PDF mit 100 MB wird also als 100 MB berechnet.
- **Abfragen pro Million Zeilen** bei jeder Suche des Agenten.
- **Speicher.** Jede aufgenommene Datei zählt zum Data-360-Speicher, ebenso die Chunk- und Indexobjekte, die für den Suchindex entstehen.

```kennzahlen
150 | Credits pro MB Unstructured Processing, Basisstaffel
600 | Credits pro MB Intelligent Processing, Basisstaffel
3 | Credits pro Million Zeilen bei Abfragen, Basisstaffel
quelle: [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), Stand 31.08.2026
```

Die Sätze sinken mit der Menge. Bis 300.000 Credits im Monat gilt der Basissatz, danach fällt er in drei Stufen auf ein Fünftel, bei Unstructured Processing auf 30 Credits pro MB oberhalb von 12,5 Mio. Credits. Die Staffeln gelten je Nutzungsart und beginnen am ersten Tag jedes Kalendermonats neu. Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/), und dieselbe Seite vermerkt bei ihren Agentforce-Beispielen, dass Data-360-Credits nicht enthalten sind. Deshalb fehlen diese Zahlen in der ersten Schätzung so oft.

## Standard-Parser oder LLM-Parsing: Warum kosten Kataloge das Vierfache?

Ein Ersatzteilkatalog besteht zum großen Teil aus Explosionszeichnungen mit Positionsnummern und Tabellen mit Teilenummern. Der Standard-Parser zieht Text heraus. Für multimodale Dokumente beschreibt [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-process-content/use-rag-to-bring-unstructured-data-to-agentforce) einen LLM-basierten Parser, einen Docling-Parser für verschachtelte Tabellen und eine Bildverarbeitung für Diagramme. Der Hilfeartikel legt fest, wie jede Option abgerechnet wird:

- **LLM-basiertes Parsing:** Das ganze Dokument geht an das LLM, seine volle Größe läuft als Intelligent Processing.
- **LLM-basierte visuelle Vorverarbeitung:** Nur Dokumente mit Bildern oder Tabellen laufen als Intelligent Processing, der Rest als Unstructured Processing.
- **Bildverarbeitung:** Das ganze Dokument läuft als Intelligent Processing.

Die [Liste der Data-360-Nutzungsarten](https://help.salesforce.com/s/articleView?id=data.c360_a_data_usage_types.htm&language=en_US&type=5) zählt auch Intelligent Context, den Arbeitsbereich zum Ausprobieren von Parsing- und Chunking-Einstellungen, zu den Funktionen, die als Intelligent Processing berechnet werden. Bei Katalogen heißt „nur Dokumente mit Bildern“ fast alle Dokumente, die visuelle Vorverarbeitung spart dort wenig. Für Betriebsanleitungen, die überwiegend aus Text bestehen, reicht oft der Standard-Parser. Ich würde je Dokumenttyp entscheiden und die Trefferqualität an einer Stichprobe testen, denn 600 gegen 150 Credits pro MB ist der größte einzelne Hebel in der Schätzung.

## Ein typisches Szenario: After-Sales-Dokumente bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer, dessen Agent Händlern und Servicemitarbeitenden Fragen zu Ersatzteilen und Wartung beantwortet. Alle Mengen sind Annahmen, die das Vorgehen zeigen sollen; die Sätze stammen aus der Rate Card zum Listenpreis.

- 6.000 MB Ersatzteilkataloge als PDF, mit LLM-basiertem Parsing
- 3.000 MB Betriebs- und Wartungsanleitungen plus 200 MB Serviceinformationen, Standard-Parser
- rund 300.000 Chunks in einem hybriden Suchindex
- 4.000 Gespräche im Monat mit je zwei Suchen
- 300 MB geänderte Kataloge und 100 MB andere geänderte Dokumente pro Monat

| Posten | Rechnung | Credits |
|---|---|---|
| Erstbefüllung Kataloge | 500 MB × 600, 2.500 × 480, 3.000 × 240 | 2.220.000 |
| Erstbefüllung Anleitungen und Serviceinfos | 2.000 MB × 150, 1.200 × 120 | 444.000 |
| **Erstbefüllung in einem Monat** | | **2.664.000 (13.320 €)** |
| Monatliche Änderungen | 300 MB × 600 + 100 MB × 150 | 195.000 |
| Monatliche Suchen | 8.000 × 600.000 Zeilen × 3 je Million | 14.400 |
| **Laufende Kosten pro Monat** | | **209.400 (1.047 €)** |

Bei den Suchen nehme ich an, dass jede Abfrage den ganzen Index zählt. Laut Hilfeartikel werden bei hybrider Suche „the number of vectors and keyword records in the search index“ gezählt, und ein typischer Index hat so viele Keyword-Datensätze wie Vektoren. Das [Preisbeispiel von Salesforce](https://www.salesforce.com/data/pricing/agentforce-use-case/) geht davon aus, dass eine Abfrage 20 Prozent der unstrukturierten Daten durchsucht; meine Zahl liegt also auf der sicheren Seite.

Drei Ergebnisse fallen auf. Die Suchen machen 7 Prozent der laufenden Kosten aus, geänderte Dokumente den Rest. Mit dem Standard-Parser auch für die Kataloge kostete die Erstbefüllung 1.164.000 statt 2.664.000 Credits. Und das erste Jahr kommt auf rund 5 Mio. Credits, mehr als die 2,75 Mio. Flex Credits pro Org und Jahr, die Salesforce für die Max Edition nennt, und das vor der ersten Agentenaktion. Die Agentenseite der Rechnung steht in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/).

## Wo stecken die versteckten Data-360-Kosten?

### Neuindexierung ganzer Datensätze

```hinweis achtung
Der Hilfeartikel behandelt einen Quelldatensatz und alle seine Dateianhänge als eine Einheit. Ändert sich ein Feld an diesem Datensatz oder ein einziger Anhang, werden alle Anhänge neu indexiert.
```

Stellen Sie sich Kataloge vor, die an Produktdatensätzen hängen, deren Preise oder Bestände die SAP-Schnittstelle jede Nacht aktualisiert. Würde das alle Kataloge auch nur einmal pro Woche neu verarbeiten, stünden im Monat 24.000 MB Intelligent Processing auf der Rechnung: rund 6,5 Mio. Credits oder 32.700 € statt der geplanten 195.000 Credits. Ich würde Dokumente an Objekten oder in einer Data Library ablegen, die keine Schnittstelle anfasst, und das Verhalten vor dem Go-live mit einer kleinen Stichprobe in der Sandbox prüfen.

### Staffeln beginnen jeden Monat neu

Weil die Staffeln am Monatsersten neu starten, zählt der Zeitpunkt. Die Erstbefüllung oben kostet in einem Monat 2.664.000 Credits. Auf drei Monate verteilt kosten dieselben Dokumente rund 3,54 Mio., also 4.380 € mehr. Ich plane die Erstbefüllung als einen Lauf in einem Kalendermonat.

### Sandbox ohne Staffeln

In der Sandbox hat Data 360 keine Mengenstaffeln: 120 Credits pro MB unstrukturiert, 480 intelligent. Alle 6.000 MB Kataloge dort zu indexieren kostet 2,88 Mio. Credits, mehr als die 2,22 Mio. in Produktion. Mit [Intelligent Context](https://developer.salesforce.com/docs/ai/power-agentforce-visual-data/guide/aes-configure-data-360.html) lässt sich eine Konfiguration mit bis zu fünf Dateien testen, und eine Stichprobe von 150 MB kostet in der Sandbox 72.000 Credits. Das reicht, um Parser zu vergleichen.

### Angereicherte Indizes

Angereicherte Indizes (Enriched Indexing) erzeugen per LLM zusätzliche Chunks, laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/search-index-types-data-cloud-quick-look/get-to-know-search-index-types-in-data-cloud) entstehen drei neue Chunks. Der Hilfeartikel rechnet diese LLM-Aufrufe als Standard Prompts ab, zu 4 Credits je 2.000 Tokens. Braucht jeder der 300.000 Chunks einen solchen Aufruf, kommen 1,2 Mio. Credits dazu, und der größere Index erhöht die Zeilen, die jede Suche zählt. Die Bedingung von Trailhead passt: nur dort, wo höhere Trefferqualität einen messbaren Nutzen bringt.

### Hybride Suche

Teilenummern und Fehlercodes sind exakte Begriffe, und Trailhead empfiehlt hybride Suche für lange Anfragen mit konkreten Suchbegriffen. Der Aufbau kostet für Vektor- und Hybridindex gleich viel, aber jede hybride Abfrage zählt Vektoren und Keyword-Datensätze, also ungefähr die doppelte Zeilenzahl. Bei 14.400 Credits im Monat würde ich das für korrekte Teilenummern bezahlen.

## Welche Inhalte gehören nicht in den Index?

Das günstigste Megabyte ist das, das Sie nie verarbeiten.

- **Bestände, Preise und Liefertermine.** Sie liegen im ERP und ändern sich täglich. Der Agent sollte sie über eine API-Aktion lesen, wie in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschrieben, und nicht aus einer indexierten Preisliste. Warum das ERP den Ersatzteilbestand führt, steht in [Ersatzteile zwischen ERP und Field Service](../salesforce-field-service-ersatzteile-erp/).
- **Überholte Katalogversionen.** Mit beiden Versionen im Index zahlen Sie doppelt, und der Agent nennt womöglich eine alte Teilenummer.
- **Dateien über den Grenzen der Data Library.** Trailhead nennt [100 MB pro PDF und 4 MB pro Text- oder HTML-Datei](https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent), und die Datenquelle einer Library lässt sich später nicht ändern. Große Kataloge müssen geteilt werden, am besten nach Produktlinie.
- **Dokumente, nach denen niemand fragt.** Beginnen Sie mit den Katalogen hinter den häufigsten Händleranfragen und ergänzen Sie den Rest, wenn die Fragen kommen.

## Wie budgetieren Sie Data 360 für einen Agenten?

1. **Dokumente in MB je Typ messen**, nachdem alte Versionen und Dubletten entfernt sind.
2. **Den Parser je Typ wählen**, anhand einer Stichprobe in Intelligent Context oder der Sandbox.
3. **Prüfen, wo die Dateien hängen** und ob eine Schnittstelle diese Datensätze aktualisiert.
4. **Die Erstbefüllung planen** als einen Lauf in einem Kalendermonat.
5. **Monatliche Änderungen schätzen**, nicht nur das Anfangsvolumen.
6. **Abfragen rechnen** als Suchen × Zeilen im Index, bei hybrider Suche doppelt.
7. **Warnschwellen im [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) setzen**, das den Verbrauch bis auf Agent, Aktion und Kanal zeigt, und nach vier Wochen mit der Schätzung vergleichen.

Wie Sie Credits über alle Zähler planen, beschreibe ich in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/). Ob dieses Budget überhaupt in Salesforce gehört, ist Teil meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Grounding mit Data 360 ist pro Frage günstig und pro geändertem Megabyte teuer, entscheiden Sie Parser, Umfang und Ablageort deshalb vor der ersten Befüllung. Wenn Sie eine zweite Meinung zu Ihrer Dokumentenschätzung möchten, [schreiben Sie mir](#contact).
