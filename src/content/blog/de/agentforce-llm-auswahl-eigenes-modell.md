---
title: "Agentforce LLM-Auswahl: Default, Claude oder eigenes Modell"
description: "Welches LLM sollte Ihren Agentforce-Agenten antreiben? Salesforce Default, Claude, GPT oder Gemini pro Subagent oder BYOLLM über Ihren eigenen Azure-Vertrag."
pubDate: 2026-10-27
lang: de
slug: agentforce-llm-auswahl-eigenes-modell
translationKey: agentforce-llm-choice-byollm
topic: ai
categories: [ai, architecture]
tags: [Agentforce, LLM, BYOLLM, Modellauswahl, Architektur, Fertigung]
takeaways:
  - "Ohne eigene Wahl läuft Agentforce auf Salesforce Default, laut Supported-Models-Seite ein verwalteter Modellmix, der derzeit GPT-4o enthält."
  - "Agent Script legt das Modell pro Agent, Subagent und Router fest; mit Agenten getestet sind GPT 4.1, Claude Haiku 4.5 und Gemini 3.5 Flash."
  - "Ein Prompt bis 2.000 Tokens kostet 2 Flex Credits auf Basic, 4 auf Standard, 16 auf Advanced und 2 auf dem eigenen Modell, plus die Anbieterrechnung."
  - "Ein eigenes Modell über BYOLLM gilt im Datenschutz-FAQ von Salesforce als Nicht-Salesforce-Anwendung unter Ihrem eigenen Vertrag."
  - "Anthropic führt Claude Opus 5.5 und Sonnet 5.5, die verwaltete Modellliste von Salesforce endet bei Sonnet 5 und Opus 4.8."
faq:
  - q: "Welches LLM nutzt Agentforce standardmäßig?"
    a: "Standard ist Salesforce Default, laut Supported-Models-Seite ein verwalteter Mix vertrauenswürdiger Modelle, der derzeit GPT-4o enthält. Was im Mix steckt, entscheidet Salesforce; wer ein festes Modell braucht, legt es selbst fest."
  - q: "Kann ich pro Subagent ein anderes Modell nutzen?"
    a: "Ja. In Agent Script setzen Sie model_config auf Agentenebene, in einem Subagenten oder am Agent Router. Das Modell des Subagenten überschreibt das des Agenten, und dieses den Org-Standard aus dem Setup."
  - q: "Kann ich meinen bestehenden Azure-OpenAI-Vertrag mit Agentforce nutzen?"
    a: "Ja, über Bring Your Own LLM, das Amazon Bedrock, Azure OpenAI, OpenAI und Vertex AI mit eigenen Zugangsdaten unterstützt. Salesforce dokumentiert es für Prompt-Vorlagen, Models API und eigene Aktionen; als Reasoning-Modell des Agenten sollten Sie es sich schriftlich bestätigen lassen."
  - q: "Ist ein eigenes Modell über BYOLLM in Flex Credits günstiger?"
    a: "Pro Prompt ja: Starter Prompts für das eigene Modell kosten 2 Credits pro 2.000 Tokens, auf einem verwalteten Standard-Modell 4. Die Tokens rechnet dann Ihr Anbieter nach Ihrem Vertrag ab, die Gesamtersparnis ist deshalb meist klein."
  - q: "Wann kommt Claude Opus 5.5 in Agentforce?"
    a: "Salesforce hat kein Datum veröffentlicht. Stand 27. Oktober 2026 listet die Supported-Models-Seite Claude bis Sonnet 5 und Opus 4.8, obwohl Anthropic Opus 5.5 und Sonnet 5.5 bereits als aktuelle Modelle führt."
draft: false
---

Für die meisten Fertigungsunternehmen ist die richtige Agentforce LLM-Auswahl ein fest eingestelltes, von Salesforce verwaltetes Modell pro Subagent, gewählt aus den wenigen Modellen, die Salesforce mit Agenten getestet hat. Ein teureres Modell gibt es nur dort, wo Tests eine Qualitätslücke zeigen. Salesforce Default ist ein Mix, den Sie nicht steuern. Ein eigenes Modell über Bring Your Own LLM, etwa über einen bestehenden Azure-OpenAI-Vertrag, passt zu Prompt-Vorlagen und eigenen Aktionen, kostet weniger Flex Credits pro Prompt und verlagert den Datenschutz in Ihren eigenen Vertrag.

## Welche Modelle kann ein Agentforce-Agent heute nutzen?

Die [Supported-Models-Seite](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html), die kein Aktualisierungsdatum trägt, nennt drei Gruppen:

- **Salesforce Default**, „a managed mix of trusted models“, der derzeit GPT-4o enthält. Den Org-Standard ändern Sie auf der Seite Agentforce Agents im Setup.
- **Von Salesforce verwaltete Modelle**: Claude Haiku 4.5 bis Sonnet 5 und Opus 4.8, Amazon Nova und NVIDIA Nemotron 3 (Beta) auf Bedrock; GPT-4o bis GPT 5.6 Luna, Sol und Terra von OpenAI und Azure OpenAI; Gemini 2.5 Flash bis 3.6 Flash und Gemini 3.1 Pro (Beta) auf Vertex AI.
- **Bring Your Own LLM (BYOLLM)**: Ihr eigenes Konto bei Amazon Bedrock, Azure OpenAI, OpenAI oder Vertex AI, oder jedes Modell hinter dem LLM Open Connector.

Modelle von Anthropic und Amazon laufen auf Bedrock „entirely within the Salesforce Trust Boundary“, andere verwaltete Modelle „inside a shared trust zone“ bei Partnern von Salesforce. Was das für Maskierung und Protokollierung bedeutet, steht in [was der Einstein Trust Layer schützt](../einstein-trust-layer-was-er-schuetzt/).

Die [Claudeforce-Pressemitteilung vom 27. August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) nennt Claude „a reasoning model for the Atlas Reasoning Engine“ und „available in Agent Builder“. Zum Standard für Agenten erklärt sie Claude nicht, und die Entwicklerdokumentation nennt weiterhin GPT-4o im Standardmix. Salesforces eigenes CRM-Reasoning-Modell Koa ist laut [Ankündigung vom 15. September 2026](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx) im Pilot, die allgemeine Verfügbarkeit wird für „Winter 2026 in U.S. regions“ erwartet. Für einen deutschen Maschinenbauer, der jetzt plant, ist Koa noch keine Option.

## Das Modell pro Agent und Subagent festlegen

Laut [Anleitung zur Modellkonfiguration](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-model.html) nutzt jeder Agent den Org-Standard, solange Agent Script kein `model_config` setzt: für den ganzen Agenten, in einem einzelnen Subagenten oder am Agent Router, der den Subagenten auswählt. Das Modell des Subagenten hat Vorrang vor dem des Agenten.

Drei Modelle nennt Salesforce als „thoroughly tested with agents“: GPT 4.1, Claude Haiku 4.5 und Gemini 3.5 Flash. Für das Routing nutzt die Vorlage des Agentforce Service Agent EinsteinHyperClassifier, ein Salesforce-Modell, das nur klassifiziert und keine anderen Tools aufrufen kann.

Ich würde das Modell auch dann festlegen, wenn der Standard funktioniert. Salesforce kann den Mix ändern, und ein Agent, der im Mai seine Tests bestanden hat, antwortet im November womöglich anders, ohne dass Sie etwas geändert haben. Ein festgelegtes Modell gehört zur Agentenversion, ein Modellwechsel läuft dann durch dieselben Freigaben wie jede andere Änderung, beschrieben in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

## Was kostet die Modellstufe?

Salesforce ordnet jedes verwaltete Modell auf seiner [Seite zur Modellunterstützung](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) einer Abrechnungsstufe zu. Die [Rate Card mit Stand 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) berechnet den Prompt je nach Stufe, Prompts an Ihr eigenes Modell heißen dort „Starter Prompts“. Laut [Hilfeartikel zur abrechenbaren Nutzung](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) wird die Nutzung in Blöcken von 2.000 Tokens gezählt, aufgerundet. Beim [Listenpreis von 500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) kostet ein Advanced-Prompt 0,08 €.

```kennzahlen
2 | Flex Credits pro Prompt auf Basic
4 | Flex Credits pro Prompt auf Standard
16 | Flex Credits pro Prompt auf Advanced
2 | Flex Credits pro Starter Prompt an das eigene Modell
quelle: Flex Credits Rate Card, Stand 31. August 2026
```

Die getesteten Modelle liegen in verschiedenen Stufen: Gemini 3.5 Flash ist Basic, Claude Haiku 4.5 und GPT 4.1 sind Standard. Alle Claude-Opus-Modelle und GPT 5.6 Sol sind Advanced. Wer einen Subagenten von Haiku auf Opus umstellt, vervierfacht dessen Promptkosten.

Dieser Hilfeartikel sagt nicht, ob die eigenen LLM-Aufrufe der Reasoning Engine zusätzlich zu den 20 Credits pro Aktion als Prompts zählen. Für Prompt-Vorlagen gilt die Stufe sicher, für das Reasoning würde ich im Pilot mit Digital Wallet messen. Alle Zähler stehen in [Flex Credits: Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), die Seite der Vorlagen in [Prompt Builder oder Agentforce-Agent](../prompt-builder-oder-agentforce-agent/).

## Wann lohnt sich Bring Your Own LLM?

BYOLLM bindet ein Modell aus Ihrem eigenen Konto bei Bedrock, Azure OpenAI, OpenAI oder Vertex AI mit eigenen Zugangsdaten an. Der [LLM Open Connector](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector) akzeptiert jedes Modell hinter einem REST-Endpunkt nach der Spezifikation von Salesforce, auch ein selbst betriebenes. Diesen Endpunkt betreibt dann Ihr Team. Drei Punkte entscheiden, ob sich das lohnt.

**Wo es dokumentiert ist.** Laut Supported-Models-Seite können eigene Aktionen, die Prompt-Vorlagen, Apex oder die Models API ausführen, „any Salesforce-managed or BYO model“ nutzen. Die Anleitung zu Agent Script verweist nur auf Modelle der Supported-Liste und sagt nichts über eigene Modelle für das Reasoning.

```hinweis offen
Ob ein eigenes Modell über BYOLLM auch das Reasoning des Agenten übernehmen darf, lassen Sie sich von Salesforce schriftlich bestätigen. Bis dahin plane ich BYOLLM für Aktionen auf Basis von Vorlagen, etwa eine Fallzusammenfassung, und lasse das Reasoning auf einem verwalteten Modell.
```

**Wer für die Daten verantwortlich ist.** Die Trust-Layer-Funktionen werden laut Supported-Models-Seite auch bei BYOLLM „fully supported“. Die Vertragsseite ändert sich. Das [Agentforce-Datenschutz-FAQ](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) von Salesforce (Juni 2025) sagt, seine Antworten „do not apply to BYO LLM“, der Anbieter sei „a Non-SFDC Application“ und der Kunde müsse „its own contract with the LLM provider“ einhalten. Aufbewahrung, Trainingsnutzung und Region richten sich dann nach Ihrem Azure- oder AWS-Vertrag. Hat Ihre IT diesen Vertrag samt Auftragsverarbeitung bereits verhandelt, kann genau das der Grund für BYOLLM sein; für alle anderen ist es zusätzliche Vertragsarbeit. Das ist meine Lesart der Dokumente und keine Rechtsberatung.

**Was es spart.** Starter Prompts kosten 2 Credits statt 4 auf Standard, und die Supported-Models-Seite spricht von „30% fewer Einstein Requests“. Die Tokens rechnet Ihr Anbieter zusätzlich ab.

## Die Modellliste hinkt den Herstellern hinterher

Die [Modellübersicht von Anthropic](https://platform.claude.com/docs/en/about-claude/models/overview) führt Claude Opus 5.5, Sonnet 5.5 und Haiku 5.5 als aktuelle Modelle, die verwaltete Liste von Salesforce endet bei Sonnet 5 und Opus 4.8. Selbst die Seiten von Salesforce unterscheiden sich: Die Hilfeseite führt Gemini 3.7 und 3.8 Flash, die Entwicklerseite endet bei 3.6 Flash. Ich gehe davon aus, dass ein neues Spitzenmodell Wochen bis Monate nach Erscheinen in Agentforce ankommt, und rechne nie einen Business Case mit einem Modell, das nicht auf der Liste steht.

Modelle verschwinden auch wieder. Nach dem Abschaltdatum wird ein abgekündigtes Modell auf einen Nachfolger umgeleitet, etwa Claude Sonnet 4 auf Sonnet 4.6, und Gemini 3 Pro (Beta) wurde am 23. April 2026 abgeschaltet. Die Modellseite nennt Abkündigungs- und Umleitungsdaten, eine Vorlaufzeit habe ich nicht gefunden. Eine Umleitung ist ein Modellwechsel, den Ihre Tests nie gesehen haben.

Die Region ist die dritte Prüfung. Verwaltete Modelle werden „eventually re-route to a US region“, wenn eine Anfrage in der vorgesehenen Region scheitert, es sei denn, ein Admin aktiviert „Enable In-Region Model Requests Only“, was für „some models“ gilt. Die Hilfeseite nennt `eu`-Inference-Profile für Claude Sonnet 5 und Opus 4.8 und für GPT 5.6 Terra nur die USA. Mehr in [Agentforce und EU-Datenresidenz](../agentforce-eu-datenresidenz-modelle/).

## Rechenbeispiel: ein Service-Agent und ein Azure-OpenAI-Vertrag

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service, einem Händlerportal und SAP. Die Konzern-IT hat einen Azure-OpenAI-Vertrag und fragt, warum Agentforce nicht diesen nutzt. Alle Zahlen sind Annahmen.

- **Router:** EinsteinHyperClassifier, wie in der Service-Vorlage.
- **Auftragsstatus** für Händler aus SAP über MuleSoft: Gemini 3.5 Flash (Basic), denn die Antwort ist ein Nachschlagen.
- **Garantie-Vorprüfung**, die Regel selbst in der [Logik von Agent Script](../agent-script-regeln-statt-llm/): Claude Haiku 4.5 (Standard) liest Seriennummer und Fehlerbeschreibung aus Freitext.
- **Fehlersuche** anhand von Handbüchern für Techniker der Händler: Claude Haiku 4.5, getestet gegen Opus 4.8 an 100 echten Fehlerbeschreibungen, bevor jemand für Advanced bezahlt.

Dazu schreibt eine Prompt-Vorlage eine Fallzusammenfassung für den Techniker im Außendienst: 3.000 im Monat mit etwa 5.000 Tokens, also je drei Prompts.

| Variante für die Zusammenfassung | Credits pro Monat | Salesforce-Seite |
|---|---|---|
| Verwaltetes Standard-Modell | 3.000 × 3 × 4 = 36.000 | 180 € |
| BYOLLM über Azure OpenAI (Starter) | 3.000 × 3 × 2 = 18.000 | 90 € plus Azure-Tokens |
| Verwaltetes Advanced-Modell | 3.000 × 3 × 16 = 144.000 | 720 € |

BYOLLM spart höchstens 90 € im Monat, rund 1.080 € im Jahr, vor der Token-Rechnung von Azure. Das allein rechtfertigt keinen zweiten Vertragsweg; die Modellstufe bewegt das Vierfache. Ich würde hier verwaltete Modelle für den Agenten empfehlen, BYOLLM nur, wenn der Azure-Vertrag der freigegebene Datenweg der IT für Servicedaten ist, und Opus für die Fehlersuche nur, wenn der Test eine klare Lücke zeigt.

## Erster Schritt: das Modell pro Subagent festlegen

1. **Das Modell festlegen**, pro Agent und Subagent in Agent Script.
2. **Mit einem getesteten Modell beginnen**, in der niedrigsten Stufe, die besteht; einen Subagenten nur mit Testergebnissen höher stufen.
3. **Die Region prüfen** für jedes Modell und über In-Region-Only entscheiden.
4. **BYOLLM nur mit Grund nutzen**: ein freigegebener Vertrag, ein Modell, das Salesforce nicht anbietet, oder Datenschutzvorgaben, die einen eigenen Anbieter verlangen.
5. **Modellseite und Release Notes regelmäßig prüfen** und nach jeder Umleitung die Tests erneut laufen lassen.
6. **In Digital Wallet messen**, ob Reasoning-Aufrufe als Prompts auftauchen.

Ich behandle diese Entscheidungen als Teil der [Salesforce-Architektur](../../leistungen/salesforce-architektur/), neben Datenmodell und Berechtigungen. Pro Subagent halte ich Modell, Stufe, Region und Testergebnis schriftlich fest, weil jede Änderung Kosten, Verträge und Tests berührt.
