---
title: "Flex Credits: Agentforce-Kosten pro Aktion schätzen"
description: "Wie Flex Credits funktionieren und wie Sie Agentforce-Kosten pro Aktion, Prompt-Stufe, Sprache, Sandbox-Test und Data-360-Dokument schätzen, mit Rechenbeispiel."
pubDate: 2026-10-27
lang: de
slug: flex-credits-agentforce-kosten-pro-aktion
translationKey: flex-credits-agentforce-costs
topic: ai
category: ai
contactBrief: licences
tags: [Agentforce, Flex Credits, Kostenschätzung, Lizenzen, Data 360, Maschinenbau]
takeaways:
  - "Eine Agentforce-Schätzung braucht mehrere Zähler: Aktionen zu 20 Flex Credits, Sprachaktionen zu 30, Prompts nach Modellstufe, Data-360-Verarbeitung von Dokumenten und Testläufe in der Sandbox."
  - "Prompts werden je angefangene 2.000 Tokens abgerechnet: 2 Credits bei Basic-Modellen, 4 bei Standard-Modellen wie Claude Sonnet, 16 bei Advanced-Modellen wie Claude Opus oder GPT 5.5."
  - "Aktionen kosten in der Sandbox 16 statt 20 Credits, Prompts aber so viel wie in Produktion, und Unstructured Processing in Data 360 kostet dort pauschal 120 Credits pro MB."
  - "Nicht genutzte Flex Credits verfallen zum Ende der Bestellung, ohne Übertrag; kaufen Sie Credits deshalb entlang des Go-live-Plans statt entlang des Budgetjahrs."
  - "Im Beispielszenario verbraucht ein Ersatzteilagent für Händler rund 218.000 Credits im Monat, und reine Textaktionen machen davon nur 55 Prozent aus."
faq:
  - q: "Was ist ein Flex Credit wert?"
    a: "Salesforce listet Flex Credits zu 500 € oder 500 $ je 100.000 Credits, ein Credit kostet also einen halben Cent. Eine Standard- oder Custom-Aktion in Agentforce verbraucht 20 Credits, also 0,10 €."
  - q: "Werden Prompts zusätzlich zu Agentforce-Aktionen berechnet?"
    a: "Prompts werden pro Aufruf des LLM-Gateways gezählt, in Einheiten bis 2.000 Tokens. Ob die eigenen Reasoning-Aufrufe des Agenten als Prompts zählen, sagt der Hilfeartikel nicht; klären Sie das mit Ihrem Account Executive und beobachten Sie Digital Wallet im Piloten."
  - q: "Kosten Agententests in der Sandbox Flex Credits?"
    a: "Ja. Agententests laufen nur in Sandboxes, und laut Salesforce verbrauchen Testläufe Requests und Credits. Aktionen kosten dort 16 Credits, Prompts den vollen Satz."
  - q: "Was passiert mit Flex Credits, die ich nicht nutze?"
    a: "Sie verfallen. Flex Credits müssen vor dem Enddatum der Bestellung verbraucht werden und gehen nicht in die nächste Laufzeit über. Verbrauch über dem Kontingent wird ohne Aufschlag zum vereinbarten Satz abgerechnet."
  - q: "Wie sehe ich, was mein Agent tatsächlich verbraucht?"
    a: "Digital Wallet zeigt den Verbrauch nahezu in Echtzeit bis auf Agent, Aktion und Kanal und warnt bei selbst gesetzten Schwellen. Es ist mit Digital-Wallet-fähigen Produkten kostenlos, setzt aber ein aktiviertes Data 360 voraus."
draft: false
---

Die Agentforce-Kosten pro Aktion sind schnell genannt und leicht unterschätzt. Eine Standardaktion kostet 20 Flex Credits, also 0,10 €. Eine belastbare Schätzung zählt außerdem Prompts nach Modellstufe, Sprachaktionen zu 30 Credits, Data-360-Verarbeitung für Handbücher und Ersatzteilkataloge sowie Testläufe in der Sandbox. Nicht genutzte Credits verfallen zum Ende der Bestellung. Ich schätze pro Gesprächstyp, erfasse jeden Zähler einzeln und kaufe Credits entlang des Go-live-Plans. Im Beispielszenario unten machen reine Textaktionen nur 55 Prozent der Credits im Monat aus.

## Wie funktionieren Flex Credits?

Flex Credits sind die Währung, in der Salesforce den Agentforce-Verbrauch abrechnet. Die [Agentforce-Preisseite](https://www.salesforce.com/agentforce/pricing/) nennt 500 € oder 500 $ je 100.000 Credits. Jedes abrechenbare Ereignis zieht eine feste Zahl Credits laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) mit Stand 31. August 2026. Eine Aktion ist laut Salesforce „a specific function that an AI agent executes on the platform“, etwa einen Auftrag aus SAP lesen oder ein Ersatzteil nachschlagen. Ob sich ein Agent überhaupt lohnt, steht in [Agentforce für Hersteller](../agentforce-ja-oder-nein-hersteller/).

Für die Planung zählen drei Details:

- **Alle Credits kommen aus einem Topf.** Aktionen, Prompts, Sprache und Übersetzung ziehen dieselben Credits, und die Rate Card rechnet auch Data 360 in Flex Credits ab.
- **Auch deterministische Schritte kosten.** Laut [Hilfeartikel zu den abrechenbaren Nutzungsarten](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) werden Aktionen abgerechnet, wenn sie laufen, auch wenn sie deterministisch laufen. Eine Garantieregel in [Agent Script](../agent-script-regeln-statt-llm/) macht den Agenten verlässlicher, nicht günstiger.
- **Ein Preismodell pro Org.** Flex Credits und das Modell mit 2 $ pro Gespräch werden nicht in derselben Org unterstützt.

Es gibt drei Kaufmodelle: Pre-Purchase zahlt die ganze Laufzeit im Voraus, Pre-Commit rechnet eine Grundmenge monatlich nachträglich ab und gleicht zum Laufzeitende aus, PayGo rechnet ab, was Sie nutzen. Verbrauch über dem Kontingent kostet den vereinbarten Satz, ohne Strafaufschlag. Das [im Mai 2025 angekündigte Flex Agreement](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) erlaubt außerdem, Nutzerlizenzen in Flex Credits umzuwandeln und zurück.

## Was kosten Prompts, und warum zählt das Modell?

Prompts übersieht man leicht, weil die Beispiele auf der Preisseite nur Aktionen zählen. Laut Hilfeartikel wird pro Aufruf des LLM-Gateways gezählt, und ein Prompt umfasst bis zu 2.000 Tokens Ein- und Ausgabe. Ein Aufruf mit 6.500 Tokens zählt als vier Prompts. Der Preis pro Prompt hängt von der Modellstufe ab, und die [Seite zur Modellunterstützung](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) ordnet jedes Modell einer Stufe zu:

| Stufe | Credits pro Prompt | Beispielmodelle |
|---|---|---|
| Basic | 2 | GPT-5 Mini, Gemini 2.5 Flash, Nova Lite |
| Standard | 4 | Claude Sonnet 4.6, Claude Sonnet 5, GPT-5, Gemini 2.5 Pro |
| Advanced | 16 | Claude Opus 4.8, GPT 5.5, GPT 5.6 Sol |
| Starter | 2 | nur für eigene Modelle (BYOLLM) |

Advanced-Prompts werden seit dem 21. Juli 2026 gezählt. Dieselbe Zusammenfassung mit 6.500 Tokens kostet auf einem Basic-Modell 8 Credits, auf Standard 16 und auf Advanced 64. Für eine Fallzusammenfassung, die eine Servicemitarbeiterin liest und korrigiert, würde ich mit einem Standard-Modell starten und nur wechseln, wenn Tests eine Qualitätslücke zeigen.

Der Hilfeartikel nennt außerdem eingebettete generative Funktionen wie Service Replies. Er sagt nicht, ob die eigenen LLM-Aufrufe der Reasoning Engine zusätzlich zu den Aktionen als Prompts zählen. Ich budgetiere jede Prompt-Vorlage und jede generative Funktion im Design und prüfe im Piloten, ob Digital Wallet mehr zeigt.

## Sprache, Sandbox und Data 360: wo Schätzungen danebenliegen

### Sprache

Sprachaktionen kosten 30 Credits in Produktion und 24 in der Sandbox; das Sprachbeispiel der Preisseite rechnet mit vier pro Anruf. Die Rate Card führt zusätzlich Speech to Text mit 150 Credits pro Stunde Audio und Text to Speech mit 6.000 pro Million Zeichen, gezählt unabhängig von anderen Nutzungsarten. Fragen Sie Ihren Account Executive, ob Ihr Sprachkanal diese Zähler zusätzlich zu den Sprachaktionen auslöst. Für einen Maschinenbauer passt Sprache zu einer Ersatzteil-Hotline, die Servicetechniker aus der Werkstatt oder im Außendienst anrufen. Im Händlerportal ist Text pro Schritt günstiger.

### Sandbox und Tests

Aktionen in Sandboxes und Scratch Orgs kosten 16 Credits, Prompts den vollen Satz. Agententests [laufen nur in Sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), und laut Salesforce verbrauchen Testläufe Credits. Eine Testsuite, die nach jeder Änderung läuft, ist ein laufender Kostenposten. Wie viele Läufe sinnvoll sind, beschreibe ich in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

### Data 360

Stützt sich der Agent auf Handbücher oder Ersatzteilkataloge, verarbeitet Data 360 diese Dokumente. Die Basisstufe kostet 150 Credits pro MB für Unstructured Processing und 600 pro MB für Intelligent Processing. Die Staffel setzt sich monatlich pro Nutzungsart zurück: Oberhalb von 300.000 Credits sinkt der Satz in drei Schritten auf ein Fünftel, 30 Credits pro MB ab 12,5 Mio. Abfragen kosten 3 Credits pro Million Zeilen. In der Sandbox gibt es keine Staffel; Unstructured Processing kostet dort pauschal 120 Credits pro MB.

Zwei weitere Punkte nennt [Salesforce Bens Leitfaden zur Vektordatenbank in Data 360](https://www.salesforceben.com/data-360-formerly-data-cloud-deep-dive-your-guide-to-the-vector-database/): Hybride Suche kostet doppelt so viele Credits wie Vektorsuche, und Indizes müssen neu aufgebaut werden, wenn neue Dateien dazukommen. Planen Sie also das monatliche Änderungsvolumen, nicht nur die Erstbeladung. Mehr dazu in [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

## Ein typisches Szenario: ein Ersatzteilagent für Händler

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud, einem Händlerportal und rund 2.000 MB Ersatzteilkatalogen und Handbüchern als PDF. Der Agent beantwortet Händlerfragen zu Teilenummern, Verfügbarkeit und Lieferterminen, im Portal und am Telefon. Alle Zahlen sind Annahmen.

| Posten pro Monat | Annahme | Credits |
|---|---|---|
| Textaktionen | 2.000 Portalgespräche × 3 Aktionen × 20 | 120.000 |
| Prompts | 2.000 Zusammenfassungen à 3.000 Tokens = 2 Prompts × 4 (Standard) | 16.000 |
| Sprachaktionen | 400 Anrufe × 4 Sprachaktionen × 30 | 48.000 |
| Speech to Text, falls berechnet | 400 Anrufe × 4 Minuten ≈ 27 Stunden × 150 | 4.000 |
| Data-360-Aktualisierung | 200 MB geänderte Dokumente × 150 | 30.000 |
| **Summe** | | **218.000, rund 1.090 €** |

Dazu kommen Aufbau und Tests. Die einmalige Verarbeitung der 2.000 MB kostet 300.000 Credits oder 1.500 €. Zehn Testläufe mit je 200 Gesprächen kosten 112.000 Credits: pro Lauf 9.600 für Aktionen zu 16 und 1.600 für Prompts. Eine Stichprobe von 200 MB der Kataloge in der Sandbox kostet 24.000 Credits; die vollen 2.000 MB kosteten dort 240.000. Zwölf Monate volle Last plus Aufbau und Tests ergeben rund 3,05 Mio. Credits.

Das Szenario zeigt drei Dinge:

- **Textaktionen sind nur 55 Prozent der monatlichen Credits.** Wer Gespräche mal Aktionen rechnet, übersieht fast die Hälfte.
- **Das Modell ist ein Preishebel.** Auf einem Advanced-Modell kosteten dieselben Zusammenfassungen 64.000 statt 16.000 Credits im Monat.
- **Enthaltene Kontingente sind schnell weg.** Mit Aufbau und Tests braucht dieser eine Agent mehr als die 2,75 Mio. Credits pro Org und Jahr, die die Preisseite für die Max Edition nennt, und das Sechsfache der 500.000 in der Core Edition. Siehe [die Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/).

Die Rechnung für einen Auftragsstatus-Agenten, verglichen mit dem Preis pro Gespräch, steht in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/).

## Wie schätzen Sie Agentforce-Kosten pro Aktion?

1. **Aktionen pro Gesprächstyp zählen.** Die Beispiele der Preisseite geben ein Gefühl: zwei Aktionen für eine Auftragsstatusabfrage, fünf für die Terminbuchung im Außendienst. Bestätigen Sie die Zahl mit Protokollen aus Sandbox-Tests.
2. **Jeden LLM-Aufruf auflisten**, der außerhalb der Aktionen läuft, die Tokens auf 2.000er-Einheiten aufrunden und mit der Modellstufe multiplizieren.
3. **Sprache getrennt rechnen**: 30 Credits pro Sprachaktion, dazu Speech-Zähler, falls sie greifen.
4. **Dokumente für Data 360 bemessen**: Erstbeladung und monatliche Änderungen in MB.
5. **Testlast budgetieren**: Testfälle × Läufe × Aktionen zu 16, dazu Prompts und eine Dokumentstichprobe.
6. **Auf Monate verteilen**: Pilot, Hochlauf, volle Last.
7. **Reserve für offene Zähler einplanen.** Headless Platform Interactions, der Zähler für agentische MCP- und API-Aufrufe, stehen in der Rate Card als „TBA“; [laut Salesforce Ben](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) kündigt Salesforce den Start 30 Tage vorher an, gezählt wird in Produktions-Orgs. Siehe [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

Vier Wochen nach dem Go-live vergleichen Sie die Schätzung mit [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/). Es zeigt den Verbrauch bis auf Agent, Aktion und Kanal und warnt bei Schwellen, die Sie setzen. Voraussetzung ist ein aktiviertes Data 360.

## Was passiert mit nicht genutzten Flex Credits?

Sie verfallen. Laut Rate Card müssen Flex Credits vor dem Enddatum der Bestellung verbraucht werden, ohne Übertrag in die nächste Laufzeit. Kaufen Sie im Januar Credits für ein Jahr und rutscht der Go-live von März auf Juni, sind drei Monate Volumen bezahlt und verloren.

Ich würde das erste Jahr entlang des Hochlaufs kaufen: ein kleines Pre-Purchase für Pilot und Tests, PayGo oder Pre-Commit für den Hochlauf und ein größeres Volumen, sobald Digital Wallet echte Zahlen zeigt. Weil Mehrverbrauch ohne Aufschlag zum vereinbarten Satz abgerechnet wird, ist ein knapper erster Kauf wenig riskant. Fragen Sie außerdem, ob enthaltene Credits einer Edition pro Org und pro Jahr gelten: Die Preisseite sagt das für Max, die [Ankündigung der Editionen vom September 2026](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) sagt es für Core und Advanced nicht. Diese Fragen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Flex Credits sind pro Aktion einfach bepreist, planen lassen sie sich aber nur pro Gespräch und mit allen Zählern. Wenn Sie eine zweite Meinung zu Ihrer Agentforce-Schätzung möchten, [schreiben Sie mir](#contact).
