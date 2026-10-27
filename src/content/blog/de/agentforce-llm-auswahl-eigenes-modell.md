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
  - "Agentforce läuft auf Salesforce Default, solange Sie nichts anderes wählen; die Supported-Models-Seite beschreibt das als verwalteten Modellmix, der derzeit GPT-4o enthält."
  - "Agent Script legt das Modell pro Agent, pro Subagent und für den Router fest; als gründlich mit Agenten getestet nennt Salesforce GPT 4.1, Claude Haiku 4.5 und Gemini 3.5 Flash."
  - "Die Modellstufe ist ein Preishebel: Ein Prompt bis 2.000 Tokens kostet 2 Flex Credits auf Basic, 4 auf Standard, 16 auf Advanced und 2 auf dem eigenen Modell, plus die Rechnung des Anbieters."
  - "Salesforce dokumentiert Bring Your Own LLM für Prompt-Vorlagen, Models API und eigene Aktionen; das Datenschutz-FAQ behandelt ein solches Modell als Nicht-Salesforce-Anwendung unter Ihrem eigenen Vertrag."
  - "Die verwaltete Modellliste hinkt den Herstellern hinterher: Anthropic führt Claude Opus 5.5 und Sonnet 5.5, die Liste von Salesforce endet bei Sonnet 5 und Opus 4.8."
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

Salesforce bietet drei Gruppen von Modellen an. Die [Supported-Models-Seite](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) nennt sie, trägt aber kein Aktualisierungsdatum:

- **Salesforce Default.** Beschrieben als „a managed mix of trusted models“, der derzeit GPT-4o enthält. Die Alternative „AWS-Hosted“ nutzt Claude Sonnet 4 auf Amazon Bedrock, das dieselbe Seite als umgeleitet auf Sonnet 4.6 führt. Den Standard ändern Sie auf der Seite Agentforce Agents im Setup.
- **Von Salesforce verwaltete Modelle.** Auf Bedrock: Claude Haiku 4.5, Sonnet 4.5, 4.6 und 5, Opus 4.5 bis 4.8, Amazon Nova und NVIDIA Nemotron 3 (Beta). Von OpenAI und Azure OpenAI: GPT-4o bis GPT 5.6 Luna, Sol und Terra, dazu o3 und o4-mini. Auf Vertex AI: Gemini 2.5 Flash bis 3.6 Flash und Gemini 3.1 Pro (Beta).
- **Bring Your Own LLM (BYOLLM).** Ihr eigenes Konto bei Amazon Bedrock, Azure OpenAI, OpenAI oder Vertex AI, oder jedes Modell hinter dem LLM Open Connector.

Wo das Modell läuft, unterscheidet sich je Gruppe. Modelle von Anthropic und Amazon laufen auf Bedrock „entirely within the Salesforce Trust Boundary“, andere verwaltete Modelle „inside a shared trust zone“ bei Partnern von Salesforce. Was das für Maskierung und Protokollierung bedeutet, steht in [was der Einstein Trust Layer schützt](../einstein-trust-layer-was-er-schuetzt/).

Zwei Ankündigungen ergänzen das Bild. Die [Claudeforce-Pressemitteilung vom 27. August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) nennt Claude „a reasoning model for the Atlas Reasoning Engine“ und schreibt, Claude sei „available in Agent Builder“. Zum Standard für Agenten erklärt sie Claude nicht, und die Entwicklerdokumentation nennt weiterhin GPT-4o im Standardmix. Salesforces eigenes CRM-Reasoning-Modell Koa ist laut [Ankündigung vom 15. September 2026](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx) im Pilot, die allgemeine Verfügbarkeit wird für „Winter 2026 in U.S. regions“ erwartet. Für einen deutschen Maschinenbauer, der jetzt plant, ist Koa noch keine Option.

## Wie legen Sie das Modell pro Agent oder Subagent fest?

Welches Modell wo läuft, regelt Agent Script. Laut [Anleitung zur Modellkonfiguration](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-model.html) nutzt jeder Agent den Org-Standard aus dem Setup, solange Sie kein `model_config` setzen. Das geht auf drei Ebenen: für den ganzen Agenten, in einem einzelnen Subagenten und am Agent Router, der den passenden Subagenten auswählt. Das Modell des Subagenten hat Vorrang vor dem des Agenten.

Drei Modelle nennt Salesforce als „thoroughly tested with agents“: GPT 4.1, Claude Haiku 4.5 und Gemini 3.5 Flash. Für das Routing gibt es zusätzlich EinsteinHyperClassifier, ein Salesforce-Modell, das die Vorlage für den Agentforce Service Agent standardmäßig nutzt. Es klassifiziert nur und leitet weiter; andere Tools kann es nicht aufrufen.

Ich würde das Modell auch dann festlegen, wenn der Standard funktioniert. Salesforce Default ist ein Mix, den Salesforce ändern kann, und ein Agent, der im Mai seine Testsuite bestanden hat, antwortet im November womöglich anders, ohne dass Sie irgendetwas geändert haben. Die Anleitung warnt selbst, dass „some supported models may not be suitable for your agent or agent's tools“. Ist das Modell festgelegt, gehört es zur Agentenversion, und ein Modellwechsel läuft durch denselben Test- und Release-Prozess wie jede andere Änderung. Die Testschritte dafür beschreibe ich in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

## Was kostet die Modellstufe?

Salesforce ordnet jedes verwaltete Modell auf seiner [Seite zur Modellunterstützung](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) einer Abrechnungsstufe zu. Die [Rate Card mit Stand 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) berechnet für einen Prompt bis 2.000 Tokens 2 Flex Credits auf Basic, 4 auf Standard und 16 auf Advanced. Prompts an Ihr eigenes Modell heißen „Starter Prompts“ und kosten 2 Credits. Beim [Listenpreis von 500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) kostet ein Advanced-Prompt 0,08 €.

Die drei getesteten Modelle liegen in verschiedenen Stufen: Gemini 3.5 Flash ist Basic, Claude Haiku 4.5 und GPT 4.1 sind Standard. Alle Claude-Opus-Modelle und GPT 5.6 Sol sind Advanced. Wer einen Subagenten von Haiku auf Opus umstellt, vervierfacht dessen Promptkosten.

Eine Lücke bleibt. Der [Hilfeartikel zur abrechenbaren Nutzung](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) sagt nicht, ob die eigenen LLM-Aufrufe der Reasoning Engine zusätzlich zu den 20 Credits pro Aktion als Prompts gezählt werden. Für Prompt-Vorlagen gilt die Stufe sicher. Für das Reasoning des Agenten würde ich im Pilot mit Digital Wallet messen, bevor der Agent breit ausgerollt wird. Wie sich die Zähler pro Gespräch addieren, steht in [Flex Credits: Kosten pro Aktion schätzen](../flex-credits-agentforce-kosten-pro-aktion/), die Seite der Vorlagen in [Prompt Builder oder Agentforce-Agent](../prompt-builder-oder-agentforce-agent/).

## Wann lohnt sich Bring Your Own LLM?

BYOLLM bindet ein Modell aus Ihrem eigenen Konto bei Bedrock, Azure OpenAI, OpenAI oder Vertex AI mit Ihren eigenen Zugangsdaten an. Der [LLM Open Connector](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector) geht weiter: jedes Modell hinter einem REST-Endpunkt nach der Spezifikation von Salesforce, auch ein selbst betriebenes. Dann betreibt Ihr Team diesen Endpunkt, mit Verfügbarkeit, Skalierung und Sicherheit.

Drei Punkte entscheiden, ob sich das lohnt.

**Wo es dokumentiert ist.** Laut Supported-Models-Seite können eigene Aktionen, die Prompt-Vorlagen, Apex oder die Models API ausführen, „any Salesforce-managed or BYO model“ nutzen. Die Anleitung zur Modellkonfiguration in Agent Script verweist nur auf Modelle der Supported-Liste und sagt nichts über eigene Modelle als Reasoning-Modell. Bis Salesforce das schriftlich bestätigt, plane ich BYOLLM für Aktionen auf Basis von Vorlagen, etwa eine Fallzusammenfassung, und lasse das Reasoning des Agenten auf einem verwalteten Modell.

**Wer für die Daten verantwortlich ist.** Die Trust-Layer-Funktionen werden laut Supported-Models-Seite auch bei BYOLLM „fully supported“. Die Vertragsseite ändert sich. Das [Agentforce-Datenschutz-FAQ](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) von Salesforce (Juni 2025) sagt, seine Antworten „do not apply to BYO LLM“, der Anbieter sei „a Non-SFDC Application“ und der Kunde müsse „its own contract with the LLM provider“ einhalten. Aufbewahrung, Trainingsnutzung und Region richten sich dann nach Ihrem Azure- oder AWS-Vertrag, nicht nach der Unterauftragsverarbeiterliste von Salesforce. Hat Ihre IT diesen Vertrag samt Auftragsverarbeitung bereits verhandelt, kann genau das der Grund für BYOLLM sein. Für alle anderen bedeutet es zusätzliche Vertragsarbeit. Das ist meine Lesart der Dokumente und keine Rechtsberatung.

**Was es spart.** Starter Prompts kosten 2 Credits statt 4 auf einem Standard-Modell, und die Supported-Models-Seite spricht von „30% fewer Einstein Requests“. Die Tokens rechnet Ihr Anbieter zusätzlich ab. Die Ersparnis auf der Salesforce-Seite ist echt, aber klein, wie das Szenario unten zeigt.

## Warum hinkt die Modellliste hinterher?

Die [Modellübersicht von Anthropic](https://platform.claude.com/docs/en/about-claude/models/overview) führt Claude Opus 5.5, Sonnet 5.5 und Haiku 5.5 als aktuelle Modelle. Die verwaltete Liste von Salesforce endet bei Sonnet 5 und Opus 4.8. Selbst die Seiten von Salesforce unterscheiden sich: Die Hilfeseite führt Gemini 3.7 Flash und 3.8 Flash in der Stufe Basic, die Entwicklerseite endet bei 3.6 Flash. Für die Planung gehe ich davon aus, dass ein neues Spitzenmodell Wochen bis Monate nach seinem Erscheinen in Agentforce ankommt, und rechne keinen Business Case mit einem Modell, das nicht auf der Liste steht.

Modelle verschwinden auch wieder. Abgekündigte Modelle bleiben bis zu ihrem Abschaltdatum nutzbar, danach werden Anfragen auf einen Nachfolger umgeleitet, etwa Claude Sonnet 4 auf Sonnet 4.6. Gemini 3 Pro (Beta) wurde am 23. April 2026 abgeschaltet. Ankündigungen erscheinen monatlich in den Release Notes der Einstein Platform, eine feste Vorlaufzeit nennt die Seite nicht. Ein umgeleitetes Modell ist ein Modellwechsel, den Ihre Tests nie gesehen haben. Jemand muss diese Notes also jeden Monat lesen.

Die Region ist die dritte Prüfung. Laut Hilfeseite werden verwaltete Modelle „eventually re-route to a US region“, wenn eine Anfrage in der vorgesehenen Region scheitert, es sei denn, ein Admin aktiviert „Enable In-Region Model Requests Only“, was für „some models“ gilt. Für Claude Sonnet 5 und Opus 4.8 nennt die Seite `eu`-Inference-Profile, GPT 5.6 Terra ist nur für die USA gelistet. Welches Modell für eine Verarbeitung in der EU in Frage kommt, behandelt [Agentforce und EU-Datenresidenz](../agentforce-eu-datenresidenz-modelle/).

## Ein typisches Szenario: ein Service-Agent und ein Azure-OpenAI-Vertrag

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service, einem Händlerportal und SAP. Die Konzern-IT betreibt einen internen Chatbot über einen Azure-OpenAI-Vertrag und fragt, warum Agentforce nicht einfach diesen nutzt. Alle Zahlen sind Annahmen.

Der Agent hat drei Subagenten hinter einem Router:

- **Router:** EinsteinHyperClassifier, wie in der Service-Vorlage.
- **Auftragsstatus** für Händler, gelesen aus SAP über MuleSoft: Gemini 3.5 Flash (Basic), denn die Antwort ist ein Nachschlagen.
- **Garantie-Vorprüfung**, die Regel selbst liegt in der [Logik von Agent Script](../agent-script-regeln-statt-llm/): Claude Haiku 4.5 (Standard), um Seriennummer und Fehlerbeschreibung aus Freitext zu lesen.
- **Fehlersuche** anhand von Handbüchern für Techniker der Händler: zunächst Claude Haiku 4.5, getestet gegen Claude Opus 4.8 an 100 echten Fehlerbeschreibungen, bevor jemand für Advanced bezahlt.

Dazu schreibt eine Prompt-Vorlage eine Fallzusammenfassung für den Techniker im Außendienst: 3.000 Zusammenfassungen im Monat mit etwa 5.000 Tokens, also je drei Prompts.

| Variante für die Zusammenfassung | Credits pro Monat | Salesforce-Seite |
|---|---|---|
| Verwaltetes Standard-Modell | 3.000 × 3 × 4 = 36.000 | 180 € |
| BYOLLM über Azure OpenAI (Starter) | 3.000 × 3 × 2 = 18.000 | 90 € plus Azure-Tokens |
| Verwaltetes Advanced-Modell | 3.000 × 3 × 16 = 144.000 | 720 € |

BYOLLM spart auf der Salesforce-Seite höchstens 90 € im Monat, rund 1.080 € im Jahr, vor der Token-Rechnung von Azure. Das allein rechtfertigt keinen zweiten Vertragsweg. Wichtiger ist die Modellstufe: Auf einem Advanced-Modell kostet dieselbe Zusammenfassung das Vierfache. In diesem Szenario würde ich verwaltete Modelle für den Agenten empfehlen, BYOLLM nur dann, wenn der Azure-Vertrag der IT der freigegebene Datenweg für Servicedaten ist, und Opus nur für die Fehlersuche, falls der Test eine klare Lücke zeigt.

## Wie sollten Sie das Modell auswählen?

1. **Das Modell festlegen**, für jeden Agenten und Subagenten in Agent Script, statt sich auf Salesforce Default zu verlassen.
2. **Mit einem getesteten Modell beginnen**, in der niedrigsten Stufe, die Ihre Testsuite besteht, und einzelne Subagenten nur mit Testergebnissen höher stufen.
3. **Die Region prüfen** für jedes gewählte Modell und entscheiden, ob In-Region-Only aktiviert wird.
4. **BYOLLM nur mit Grund nutzen**: ein bestehender, freigegebener Vertrag, ein Modell, das Salesforce nicht anbietet, oder Datenschutzvorgaben, die einen eigenen Anbieter verlangen. Aufbewahrung und Region kommen dann aus diesem Vertrag.
5. **Die monatlichen Release Notes lesen** und nach jeder Umleitung die Tests erneut laufen lassen.
6. **Im Pilot in Digital Wallet messen**, ob Reasoning-Aufrufe als Prompts auftauchen.

Diese Entscheidungen gehören in die Agentenarchitektur, neben Datenmodell und Berechtigungen. Deshalb behandle ich sie als Teil der [Salesforce-Architektur](../../leistungen/salesforce-architektur/) und nicht als Entwicklereinstellung.

Die Modellwahl in Agentforce ist eine Konfiguration mit Folgen für Kosten, Verträge und Tests, und sie gehört pro Subagent entschieden und dokumentiert. Wenn Sie eine zweite Meinung zum Modell-Setup Ihres Agenten möchten, [schreiben Sie mir](#contact).
