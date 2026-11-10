---
title: "KI-Fehlersuche im Außendienst: erst die Handbücher"
description: "Was Maschinenbauer mit Handbüchern, Bulletins und Wissensartikeln tun müssen, damit der Field-Service-Agent je Variante und Seriennummer richtig antwortet."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-fehlersuche-handbuecher-aussendienst
translationKey: field-service-ai-troubleshooting-manuals
topic: field-service
categories: [field-service, ai]
tags: [Field Service, Außendienst, Agentforce, Knowledge, Data 360, Maschinenbau]
takeaways:
  - "Der Agent findet Text, der zur Frage passt. Das richtige Handbuch findet er nur, wenn Dokument und Anlage einen Schlüssel teilen und dieser die Suche filtert."
  - "Service-Bulletins und Nachrüstungen brauchen ein Feld für Seriennummernbereich oder Baustand, sonst wendet der Agent sie auf jede Maschine des Typs an."
  - "Knowledge ersetzt beim erneuten Veröffentlichen die alte Fassung. Eine Datei-Bibliothek behält jede Datei, bis jemand sie löscht."
  - "Eine Data Library filtert Knowledge nur nach Datenkategorien. Wenn sich Varianten einen Index teilen, braucht es Filterfelder im erweiterten Data-360-Setup."
  - "Wartungsanleitungen mit festen Schritten gehören an den Work Type. Bestände, Preise und rohe E-Mail-Verläufe bleiben aus dem Index."
faq:
  - q: "Welche Quellen nutzt der Agent für die Fehlersuche in Field Service?"
    a: "Laut der Salesforce-Ankündigung vom April 2025 fragt er Produkthandbücher, ähnliche Reparaturen, Sensordaten sowie frühere Chats und E-Mails ab und führt den Techniker Schritt für Schritt, auch anhand von Fotos. Die Fehlersuche vor Ort war für Juni 2025 als allgemein verfügbar angekündigt."
  - q: "Kann eine Agentforce Data Library Handbücher nach Seriennummer filtern?"
    a: "Soweit die von mir geprüften Seiten es beschreiben, nicht pro Frage. Eine Knowledge-Bibliothek kann die Suche für die ganze Bibliothek auf ausgewählte Datenkategorien beschränken. Filter auf einzelne Felder wie Variantenschlüssel oder Seriennummernbereich brauchen Retriever-Filter auf einem Data-360-Suchindex mit definierten Filterfeldern, deren Werte zur Laufzeit übergeben werden können."
  - q: "Sollen alte Handbuchstände im Index bleiben?"
    a: "Nur, wenn Maschinen im Feld noch mit diesem Baustand laufen, und auch dann nur mit Seriennummernbereich, damit der Agent sie unterscheiden kann. Überholte Fassungen und ersetzte Service-Bulletins werden entfernt, denn der Agent kann nicht beurteilen, welche Fassung gilt."
  - q: "Kann der Agent Schaltpläne und Explosionszeichnungen lesen?"
    a: "Mit einer Standard-Data-Library nicht: Laut Salesforce-Hilfeartikel zerlegt Data Cloud nur Text in Chunks, aber keine Bilder. LLM-basiertes Parsing in Data 360 schickt ganze Dokumente an ein LLM und kostet 600 statt 150 Flex Credits pro MB."
draft: false
---

Ein KI-Agent für die Fehlersuche im Außendienst antwortet dem Techniker nur dann richtig, wenn er weiß, welches Handbuch zur Maschine vor Ort gehört. Den Agenten liefert Salesforce, das Dokumentenmodell ist Aufgabe des Maschinenbauers. Jedes Handbuch, jedes Service-Bulletin und jeder Wissensartikel braucht den Produktschlüssel, den die Anlage schon trägt, und einen Seriennummernbereich, wenn ein Bulletin nur für einen Teil der Maschinen gilt. Der Agent übergibt die Werte der Anlage als Filter an die Suche. Im Index liegt je Variante und Bauzustand eine gültige Fassung. Eine Data Library reicht, solange ein aktueller Handbuchstand für alle einbezogenen Maschinen gilt. Teilen sich Varianten einen Index, würde ich das erweiterte Data-360-Setup mit Filterfeldern nehmen.

## Was liest der Field-Service-Agent bei der Fehlersuche?

Salesforce hat die Fehlersuche vor Ort im April 2025 mit [Agentforce for Field Service](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) angekündigt und für Juni 2025 als allgemein verfügbar vorgesehen; Ankündigungen tragen den Hinweis, dass sich Funktionen ändern können, prüfen Sie den aktuellen Umfang also in Ihrer Org. Laut Ankündigung fragt der Agent „product manuals, similar repairs, and sensor data“ ab, dazu „previous chats and emails“, und führt den Techniker im Dialog durch jeden Schritt, auch anhand von Fotos. Die [Field-Service-Produktseite](https://www.salesforce.com/service/field-service-management/) verspricht Antworten „from your internal and external knowledge base“. Welche Funktionen heute live sind und was sie kosten, steht in [KI-Agenten im Außendienst: was Field Service heute kann](../ki-agenten-aussendienst-field-service/).

Wie der Agent das Handbuch für eine bestimmte Anlage auswählt, erklärt keine der Seiten, die ich geöffnet habe. Die Technik dahinter ist dokumentiert: Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud) zerlegt Data 360 Dokumente in Abschnitte (Chunks), legt sie als Vektoren in einen Suchindex, und ein Retriever, „the link between the prompt and the search index“, holt die Abschnitte, die der Frage am nächsten kommen. Ob ein Abschnitt Variante A oder Variante B beschreibt, spielt dabei keine Rolle, solange das Dokument diese Information nicht als Daten enthält.

## Handbücher im Maschinenbau verwirren einen Agenten

Bei Maschinenbauern gibt es selten nur ein Handbuch pro Produkt. Nehmen Sie ein Bearbeitungszentrum in drei Varianten, mit neuer Steuerung ab einem bestimmten Baujahr, einer Nachrüstung an einem Teil der Maschinen und einem Service-Bulletin nur für die Seriennummern 4100 bis 4380. Ein Techniker fragt nach Spindelalarm 2041. Beschreiben drei Handbuchstände diesen Alarm unterschiedlich, liefert der Retriever den Abschnitt, der am besten zur Formulierung passt, und der Agent trägt die falsche Anleitung mit derselben Sicherheit vor wie die richtige.

Zwei weitere Fallen sind typisch für technische Dokumentation:

- **Zeichnungen.** Der [Hilfeartikel zu Data Libraries](https://help.salesforce.com/s/articleView?id=004333412&language=en_US&type=1) sagt, Data Cloud „only chunks on text and not images of your files“. Die Bildinhalte von Schaltplänen und Explosionszeichnungen bleiben unsichtbar. LLM-basiertes Parsing schickt das ganze Dokument an ein LLM, laut [Abrechnungshinweisen](https://help.salesforce.com/s/articleView?id=data.c360_a_unstructured_data_billing_considerations.htm&language=en_US&type=5) zählt das als Intelligent Processing: 600 Credits pro MB laut [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) statt 150. Die Kostenseite steht in [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).
- **Zukaufkomponenten.** Ein Getriebe in der Maschine wird mit dem Handbuch des Lieferanten geliefert. Das Handbuch gehört zu dieser Komponente, die vielleicht in zwei Ihrer Produktlinien verbaut ist.

## Wie verknüpfen Sie Handbücher mit Anlage und Seriennummer?

Der Anker ist die Anlage (Asset). Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets) steht ein Asset für „a specific purchased or installed product“, lässt sich mit einem Produktdatensatz verknüpfen, und eine Anlagenhierarchie über das Feld Parent Asset fasst die Komponenten einer Maschine zusammen. Das Dokumentenmodell sollte genau diese Schlüssel verwenden. Ich würde jedem Dokument diese Merkmale geben:

| Merkmal | Beispiel | Zweck |
|---|---|---|
| Produkt- oder Variantenschlüssel | Code am Produkt der Anlage | grenzt die Suche auf den Maschinentyp ein |
| Seriennummernbereich oder Baustand | 4100 bis 4380 | Bulletins und Nachrüstungen gelten nur für einen Teil |
| Dokumentart | Handbuch, Bulletin, Anleitung | eine Regel legt fest, welches Bulletin welchen Handbuchschritt ersetzt |
| Komponente | Getriebe, Steuerung | Lieferantenhandbücher hängen an der Unteranlage |
| Sprache | DE, EN | eine Antwortsprache je Techniker |
| Status und gültig ab | freigegeben, März 2026 | überholte Stände bleiben draußen |

Der Schlüssel muss der sein, den die Anlage schon trägt. Steht an der Anlage „MC-800“ und heißt das PDF „Bearbeitungszentrum 800 Rev C“, gibt es keine Verbindung zwischen beiden. Das ist die Stammdatenfrage aus [Stammdaten für die Einsatzplanung](../salesforce-field-service-stammdaten/): Fehlt vielen Anlagen die Produktzuordnung, rettet auch das beste Dokumentenmodell die Antworten nicht.

Wartungsanleitungen mit festen Schritten brauchen gar keine Suche. Wissensartikel lassen sich an Work Types hängen, und laut [Trailhead](https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type) erscheinen sie „on work orders and work order line items that use the work type“. Für die geplante 2.000-Stunden-Wartung würde ich die Anleitung dort anhängen und dem Agenten die ungeplante Störung überlassen.

## Welche Handbuchstände darf der Agent sehen?

Salesforce Knowledge verwaltet Versionen besser als eine Datei-Bibliothek. Laut [Knowledge-Entwicklerhandbuch](https://developer.salesforce.com/docs/service/salesforce-knowledge-dev-guide/guide/knowledge-development-object-managing-articles.html) entsteht beim Ändern eines veröffentlichten Artikels ein Entwurf, der die bisherige Fassung beim Veröffentlichen ersetzt. Der Hilfeartikel zu Data Libraries ergänzt: Mit „Use Public Knowledge Articles“ liefert die Bibliothek nur Abschnitte aus veröffentlichten Artikeln. Für eine Datei-Bibliothek habe ich keinen solchen Mechanismus gefunden. Ein hochgeladenes PDF bleibt, bis jemand es entfernt.

Die Regeln, die ich festlegen würde:

- **Eine gültige Fassung je Variante und Baustand.** Ein älterer Stand bleibt nur, solange Maschinen im Feld damit laufen, und dann mit eigenem Seriennummernbereich.
- **Überholte Bulletins werden entfernt** oder ins aktuelle Handbuch übernommen.
- **Eine verantwortliche Person je Produktlinie** im Service gibt Dokumentänderungen frei wie Stammdaten.

## Data Library oder erweitertes Data-360-Setup?

Trailhead beschreibt zwei Wege. Die Agentforce Data Library verarbeitet Wissensartikel, Dateien oder Websuche, unterstützt nur unstrukturierte Daten, und „each library can only contain one data source“. Das erweiterte Setup in Data 360 kombiniert strukturierte und unstrukturierte Quellen und „takes more time, but gives you more control“. Bei Handbüchern sind diese Punkte entscheidend:

```pro-contra
pro: Data Library
- Schneller aufgesetzt als das erweiterte Setup
- Passt für einen Piloten, in dem ein aktueller Handbuchstand für alle einbezogenen Maschinen gilt
contra: Was Sie dafür aufgeben
- Die Quelle einer Bibliothek lässt sich später nicht mehr ändern, so die [Trailhead-Einheit zu dateibasierten Bibliotheken](https://trailhead.salesforce.com/content/learn/modules/agentforce-data-library-basics/build-a-file-based-data-library-for-an-agent)
- Höchstens 100 MB pro PDF und 4 MB pro Text- oder HTML-Datei; PDFs mit eingebetteten Inhalten werden laut Hilfeartikel nicht unterstützt
- Eine Knowledge-Bibliothek filtert nur für die ganze Bibliothek nach Datenkategorien, nicht pro Frage
- Filter für Teilmengen unterstützt nur ein Data-360-Retriever, und auch nur, [wenn der Suchindex Filterfelder definiert](https://trailhead.salesforce.com/content/learn/modules/agentforce-specialist-certification-maintenance-summer-25/learn-whats-new-with-agentforce-and-data-cloud), mit bis zu 10 Bedingungen auf Text-, Boolean-, Zahlen- oder Datumsfeldern laut [Referenz zu Retriever-Filtern](https://help.salesforce.com/s/articleView?id=data.c360_a_retriever_filter_reference.htm&language=en_US&type=5)
```

So lese ich das: Teilen sich mehrere Varianten einen Index, werden Variantenschlüssel und Seriennummernbereich zu Filterfeldern im erweiterten Setup. Die Filterreferenz beschreibt dynamische Filter, deren Werte zur Laufzeit übergeben werden, etwa aus einem Prompt Template. Sie müssen die Kette vom Arbeitsauftrag über die Anlage bis zu Variantenschlüssel und Seriennummer in diesen Filtern aufbauen und testen. Bei Seriennummernbereichen ist Vorsicht nötig: Die Referenz nennt Greater Than und Less Than, aber kein "oder gleich". Testen Sie also die Grenzwerte und das Format Ihrer Seriennummern. Wie Data 360 über Dokumente hinaus Kontext zusammenstellt, steht im Beitrag [Die Agent Context Engine erklärt](../salesforce-agent-context-engine-erklaert/).

## Bestände, Preise und E-Mail-Verläufe gehören nicht in den Index

- **Bestände, Preise und Liefertermine.** Sie ändern sich täglich und gehören ins ERP. Warum das ERP den Ersatzteilbestand führt, steht in [Ersatzteile zwischen ERP und Field Service](../salesforce-field-service-ersatzteile-erp/).
- **Überholte Fassungen und Entwürfe**, aus den Gründen oben.
- **Rohe E-Mail-Verläufe und Chats.** Die Ankündigung nennt sie als Quelle. Ich würde stattdessen abgeschlossene Fälle mit sauberen Feldern für Fehler und Lösung indexieren. Das hält auch Kundenkontakte und Technikernamen aus dem Index.
- **Dokumente an Datensätzen, die von einer Schnittstelle aktualisiert werden.** Laut Abrechnungshinweisen werden ein Data Model Object und alle zugehörigen Dateianhänge als eine Einheit verarbeitet. Eine Änderung an einem Feld oder Anhang kann daher eine Neuindexierung aller Anhänge auslösen.
- **Maschinen, die Sie nicht mehr betreuen.** Jedes Megabyte kostet Credits und erhöht das Risiko eines falschen Treffers.

## Rechenbeispiel: vier Produktlinien, 1.500 Maschinen

Nehmen wir einen Maschinenbauer mit vier Produktlinien, 1.500 Maschinen unter Wartungsvertrag, Field Service im Einsatz und 3.000 MB Handbüchern als PDF. Alle Zahlen sind Annahmen.

Die Bestandsaufnahme findet zwei bis vier Stände je Handbuch, 1.100 MB davon sind aktuelle Stände für Maschinen, die noch im Feld laufen. Von 180 Service-Bulletins sind 60 überholt, und 15 Prozent der Anlagen haben keine Produktzuordnung.

Die Reihenfolge: diese Anlagen den Produkten zuordnen, die 1.100 MB mit Variantenschlüssel, Seriennummernbereich, Dokumentart und Sprache versehen, die 120 gültigen Bulletins mit Seriennummernfeldern nach Knowledge übernehmen und die 25 Standard-Wartungsanleitungen an ihre Work Types hängen.

1.100 statt 3.000 MB mit dem Standard-Parser zu indexieren, kostet 165.000 statt 450.000 Credits pro vollem Lauf bei 150 Credits pro MB, bei [500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) also 825 € statt 2.250 € vor Mengenstaffeln. Der größere Effekt zeigt sich im Test mit 50 echten Störfällen je Produktlinie, deren richtige Antworten bekannt sind, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Der Pilot startet mit einer Data Library auf der Produktlinie mit den besten Dokumenten. Die zweite Produktlinie macht den Wechsel ins erweiterte Setup nötig.

## Dokumente je Produktlinie zählen, bevor der Agent startet

```schritte
Dokumente zählen
  Je Produktlinie: Stände, Sprachen, Megabyte.
Produktzuordnung prüfen
  Für jede Anlage in der installierten Basis.
Dokumentmerkmale festlegen
  Mit den Schlüsseln, die die Anlage schon trägt.
Überholte Stände entfernen
  Und eine verantwortliche Person je Produktlinie benennen.
Den Weg wählen
  Data Library, solange ein Handbuchstand für alle einbezogenen Maschinen passt, Filterfelder, sobald Varianten oder Bauzustände abweichen.
Mit echten Störfällen testen
  Bevor ein Techniker den Agenten sieht.
```

Das Dokumentenmodell überlebt jede Agentenversion, deshalb gehört es für mich zur [Salesforce-Architektur](../../leistungen/salesforce-architektur/). Das größere Bild steht im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).
