---
title: "Agentforce Datenresidenz: Wo laufen die KI-Modelle?"
description: "Wohin Agentforce Prompts mit Händlerdaten schickt: Bedrock oder Shared Trust Zone, Geo-aware Routing, EU Operating Zone und was Sie schriftlich klären sollten."
pubDate: 2026-10-27
lang: de
slug: agentforce-eu-datenresidenz-modelle
translationKey: agentforce-eu-data-residency
topic: security
categories: [architecture, ai]
tags: [Agentforce, Datenresidenz, DSGVO, Hyperforce, LLM, Maschinenbau]
takeaways:
  - "Claude- und Amazon-Modelle laufen in Agentforce auf Amazon Bedrock innerhalb der Salesforce Trust Boundary; andere Modelle betreiben Partner in einer Shared Trust Zone oder der LLM-Anbieter direkt."
  - "Die Unterauftragsverarbeiter-Liste von Salesforce nennt für OpenAI den Standort USA und für Microsoft Azure europäische Standorte wie Deutschland, Frankreich und Schweden; das Modell entscheidet, wohin ein Prompt geht."
  - "Geo-aware Routing schickt LLM-Anfragen an ein Rechenzentrum nahe der Data-360-Region Ihrer Org, eine Liste EU-fähiger Modelle fehlt aber, und für Agentforce Vibes dokumentiert Salesforce einen Fallback in die USA."
  - "Die Hyperforce EU Operating Zone umfasst eine geprüfte Auswahl an Produkten, ihre Seiten erwähnen Agentforce nicht; Koa, das eigene Reasoning-Modell von Salesforce, kommt zuerst in US-Regionen."
  - "Lassen Sie sich vor dem Go-live pro Agent schriftlich bestätigen: Modell, Verarbeitungsregion, Ausfallpfad, Unterauftragsverarbeiter und Aufbewahrung."
faq:
  - q: "Verarbeitet Agentforce Daten in der EU?"
    a: "Das hängt vom Modell und von der Data-360-Region Ihrer Org ab. Salesforce leitet LLM-Anfragen an ein nahes Rechenzentrum dieser Region und nennt europäische Standorte für AWS und Azure, veröffentlicht aber keine EU-Liste pro Modell. Lassen Sie es sich für Ihre Org schriftlich bestätigen."
  - q: "Was ist die Shared Trust Zone in Agentforce?"
    a: "So nennt Salesforce Modelle, die Partner außerhalb der eigenen Trust Boundary betreiben, etwa OpenAI-Modelle. Trailhead beschreibt Shared Trust als Daten, die bei Salesforce bleiben, mit gemeinsamer Moderation; für die genutzten LLM-Anbieter nennt Salesforce Zero Data Retention."
  - q: "Gibt es Agentforce in der Hyperforce EU Operating Zone?"
    a: "Ich habe keine Salesforce-Seite gefunden, die das für Agentforce-Agenten bestätigt. Die Seite zur EU Operating Zone nennt Sales Cloud, Service Cloud, Plattform und Industries ohne KI, und laut FAQ ist Agentforce Vibes dort nicht verfügbar. Fragen Sie Salesforce, bevor Sie damit planen."
  - q: "Gilt die Zero Data Retention von Salesforce auch für ein eigenes Modell per BYOLLM?"
    a: "Nein. Laut Datenschutz-FAQ von Salesforce zu Agentforce gelten die Antworten dort nicht für BYO LLM. Ihr Anbieter ist dann keine Salesforce-Anwendung, und Ihr eigener Vertrag mit ihm regelt die Daten."
  - q: "Können wir Koa in Europa nutzen?"
    a: "Noch nicht, so lese ich die Ankündigung. Salesforce hat Koa am 15. September 2026 als Pilot vorgestellt, die allgemeine Verfügbarkeit wird für Winter 2026 in US-Regionen erwartet. Ein EU-Termin ist nicht veröffentlicht."
draft: false
---

Beantwortet ein Agentforce-Agent die Anfrage eines europäischen Händlers, bleiben die CRM-Datensätze in Ihrer Org. Der Prompt, der daraus entsteht, geht aber an ein Sprachmodell, und das Modell entscheidet, wo das passiert. Claude- und Amazon-Modelle betreibt Salesforce auf Amazon Bedrock innerhalb der eigenen Trust Boundary, andere Modelle laufen bei Partnern in einer „Shared Trust Zone“ oder beim Anbieter. Geo-aware Routing folgt der Data-360-Region, die Seiten zur Hyperforce EU Operating Zone erwähnen keine KI, und Koa startet in US-Regionen. Für die Agentforce Datenresidenz in der EU brauchen Sie Modell, Region und Fallback schriftlich.

## Wohin geht ein Prompt in Agentforce?

Ein Serviceagent, der die Frage „Wo ist meine Ersatzteilbestellung?“ beantwortet, packt Händler-Account, Auftrag und vielleicht einen Liefertermin aus SAP in einen Prompt. Die Datensätze selbst bleiben, wo sie sind: Laut [Datenschutz-FAQ zu Agentforce](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) von Salesforce (Juni 2025) werden Kundendaten nicht in Agentforce gespeichert, sondern in den zugrunde liegenden Salesforce-Diensten. Der Prompt dagegen reist. Die Seite [Supported Models](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) beschreibt drei Wege:

- **Innerhalb der Trust Boundary.** Anthropic- und Amazon-Modelle laufen laut Salesforce auf Amazon-Bedrock-Infrastruktur „entirely within the Salesforce Trust Boundary“. Anthropic schrieb bei der Erweiterung der Partnerschaft im [Oktober 2025](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), der gesamte Claude-Verkehr bleibe in der Virtual Private Cloud von Salesforce.
- **Shared Trust Zone.** Andere Modelle betreiben Salesforce-Partner, „either inside a shared trust zone or through the LLM provider directly“. Das [Trailhead-Modul zu Sprachmodellen](https://trailhead.salesforce.com/content/learn/modules/large-language-models/learn-how-salesforce-uses-large-language-models) fasst Shared Trust so zusammen: Daten bleiben bei Salesforce, die Moderation erfolgt gemeinsam.
- **Eigenes Modell (BYOLLM).** Sie binden Ihren eigenen Vertrag mit Amazon Bedrock, Azure OpenAI, OpenAI oder Vertex AI an. Die Inferenz läuft bei Ihrem Anbieter, die Anfrage geht trotzdem durch die Models API und den Trust Layer.

Die Datenschutz-FAQ ergänzt die Vertragssicht. In manchen Fällen gehen Kundendaten direkt an OpenAI, und OpenAI ist Unterauftragsverarbeiter von Salesforce. Bei Anthropic auf AWS und OpenAI auf Microsoft Azure ist der Hosting-Anbieter der Unterauftragsverarbeiter. Für die Drittanbieter, die Salesforce derzeit nutzt, nennt das Dokument eine Zero-Data-Retention-Policy. Dieselbe FAQ stellt klar, dass ihre Antworten nicht für BYO LLM gelten: Mit eigenem Modell regelt Ihr eigener Vertrag mit dem Anbieter die Daten.

## Welches Modell beantwortet heute Ihren Händler?

Die erste Frage lautet, welches Modell Ihr Agent überhaupt nutzt. Laut Supported Models ist die Option „Salesforce Default“ ein verwalteter Mix, der derzeit GPT-4o enthält; die Option „AWS-Hosted“ nutzt Claude Sonnet 4 auf Bedrock. Trailhead nennt für Aufrufe der Agentforce Reasoning Engine OpenAI GPT-4o als Standard, in manchen Fällen Azure OpenAI GPT-4o. Seit der [Claudeforce-Meldung](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) vom 27. August 2026 dient Claude außerdem als ein Reasoning-Modell für die Atlas Reasoning Engine.

Das Dokument [Infrastructure and Sub-processors](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/misc/salesforce-infrastructure-and-subprocessors.pdf) vom 19. Dezember 2025 führt Agentforce unter den Einstein Generative AI Services und nennt unter anderem:

| Anbieter | Genannte Standorte | Hinweis zum Routing |
|---|---|---|
| OpenAI | USA | bei Ausfall Umleitung an einen Endpunkt auf Microsoft Azure, Vorrang für die Region, in der die Org bereitgestellt ist, sofern verfügbar |
| Microsoft Azure | USA, Schweiz, Frankreich, Deutschland, Schweden, Großbritannien und weitere | keiner |
| Amazon Web Services | USA, Deutschland, Frankreich, Italien, Schweden, Schweiz, Großbritannien und weitere | bei LLM-Aufrufen über AWS-Endpunkte gilt die genannte Region, die der Org am nächsten liegt; Schweizer Daten können bei Ausfall über AWS in den USA laufen |

Meine Lesart: Für ein Modell auf Bedrock gibt es eine dokumentierte Regel, die es an die nächstgelegene AWS-Region bindet. Für GPT-Modelle lassen die Dokumente OpenAI in den USA und Azure in Europa zu, ohne zu sagen, was für Ihre Org gilt. Diese Lücke müssen Sie mit Salesforce schließen, und die Modellwahl pro Agent ist Ihr Hebel.

## Hält Geo-aware Routing die Anfragen in der EU?

Laut Supported Models leiten geo-aware Modelle die LLM-Anfrage an ein nahes Rechenzentrum, abhängig davon, wo Data 360 für Ihre Org bereitgestellt ist; die Region der Einstein-Generative-AI-Plattform entspricht der Data-360-Region. Ein [Hilfeartikel von Salesforce](https://help.salesforce.com/s/articleView?id=000396615&language=en_US&type=1) nennt Instanzen der Einstein-Plattform und von Agentforce auf AWS in Frankfurt, Paris, Mailand, Stockholm, London und Zürich.

Drei Punkte bleiben offen:

- **Welche Modelle geo-aware sind.** Supported Models nennt weder Modelle noch Regionen.
- **Was bei einem Ausfall passiert.** Für Agentforce Vibes, den Coding-Assistenten, [dokumentiert Salesforce](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-geo-aware-routing.html), dass Anfragen standardmäßig in die USA ausweichen, wenn der regionale Endpunkt nicht erreichbar ist. Eine Einstellung im Einstein Setup unterbindet das; fragen Sie Salesforce, ob sie auch für Ihre Serviceagenten gilt.
- **Schweiz.** Für Schweizer Daten nennt das Unterauftragsverarbeiter-Dokument einen Ausfallpfad über AWS in den USA, relevant für Schweizer Standorte und Händler.

```vertiefung Für Admins
titel: Was die Einstellung „Enable In-Region Model Request Only“ tut
Sie liegt im Einstein Setup und setzt Data 360 voraus. Ist der regionale Endpunkt nicht erreichbar, liefert sie einen Fehler, statt die Anfrage in die USA umzuleiten. Laut der Salesforce-Seite zu Agentforce Vibes wirkt sie derzeit nicht für Modelle von Anthropic und Gemini.
```

In-Region-only hat einen Preis: Bei einem Ausfall liefert der Agent einen Fehler. Beim Auftragsstatus ist das mit Übergabe an einen Menschen vertretbar. Für eine [Störungshotline](../stoerungshotline-agentforce-voice-deutsch/) würde ich es ohne getesteten Fallback zur Disposition nicht akzeptieren.

## Was deckt die Hyperforce EU Operating Zone ab?

Salesforce hat die Hyperforce EU Operating Zone am 2. März 2023 [gestartet](https://www.salesforce.com/news/press-releases/2023/03/02/hyperforce-eu-operating-zone-news/), damit Kunden ihre Daten in der EU speichern und verarbeiten können, mit Support durch Personal in der EU. Die [Produktseite](https://salesforce.com/platform/data-residence-eu-oz) spricht von Verarbeitung und Speicherung „strictly within the region (EU and Switzerland)“ und von einer ausgewählten, geprüften Menge an Produkten und Funktionen aus Sales Cloud, Service Cloud, Plattform und Industries. Agentforce, Einstein oder Data 360 erwähnen beide Seiten nicht.

Die einzige ausdrückliche Aussage zu KI habe ich in der [FAQ zu Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) gefunden: „Agentforce Vibes isn’t available in the EU Operating Zone.“

```hinweis offen
Läuft Ihre Org in der EU Operating Zone, würde ich Agentforce-Agenten dort als unbestätigt behandeln, bis Salesforce den Umfang schriftlich nennt.
```

Koa, das eigene CRM-Reasoning-Modell von Salesforce, kommt zuerst in die USA. Laut [Investor-Meldung](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx) vom 15. September 2026 steht es ausgewählten Pilotkunden zur Verfügung, die allgemeine Verfügbarkeit wird für Winter 2026 in US-Regionen erwartet. Die Inferenz läuft laut Salesforce vollständig in der eigenen Trust Boundary. Einen EU-Termin gibt es noch nicht.

## Ist eine Verarbeitung in der EU Pflicht?

Ich bin Salesforce-Architekt, kein Anwalt, und das hier ist keine Rechtsberatung. So wie ich es lese, verlangt die DSGVO nicht, dass Daten in der EU bleiben. Laut Datenschutz-FAQ von Salesforce sind alle Salesforce-Dienste einschließlich Agentforce durch die EU-Standardvertragsklauseln abgedeckt, dazu kommen Binding Corporate Rules für Auftragsverarbeiter. Ob das reicht, entscheidet Ihr Datenschutzbeauftragter. Ein Datenschutzbeauftragter kann trotzdem eine Verarbeitung in der EU verlangen, sobald Prompts Händlerkontakte, Namen von Technikern im Außendienst oder Garantiefälle enthalten.

Drei benachbarte Themen folgen eigenen Regeln: die [Fristen des EU AI Act für Agentforce](../eu-ai-act-fristen-agentforce/), [KI-Coding-Tools mit Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/) und externe Modelle, die über [Hosted MCP Server](../salesforce-hosted-mcp-server-datenzugriff/) Salesforce-Daten lesen und für die die Aufbewahrungsvereinbarungen von Salesforce nicht greifen.

## Ein typisches Szenario: Händleranfragen aus fünf Ländern

Nehmen wir einen Maschinenbauer in Deutschland mit 300 Händlern in Frankreich, Italien, Österreich, der Schweiz und Polen, mit Service Cloud, SAP S/4HANA für Aufträge und Data 360 in einer europäischen Region. Alle Zahlen sind Annahmen. Ein Serviceagent soll rund 3.000 Händleranfragen pro Monat zu Auftragsstatus, Ersatzteilverfügbarkeit und Stand von Garantiefällen beantworten. Die Prompts enthalten Namen von Ansprechpartnern, Seriennummern und Auftragswerte.

**Das Modell.** Der Agent läuft auf Salesforce Default. Die Datenschutzbeauftragte findet OpenAI mit Standort USA auf der Unterauftragsverarbeiter-Liste. Das Team stellt auf ein Claude-Modell auf Bedrock um und bittet Salesforce, Verarbeitungsregion und Ausfallpfad für die eigene Org zu bestätigen.

**Schweiz.** Der dokumentierte Ausfallpfad für Schweizer Daten läuft über AWS in den USA. Die Datenschutzbeauftragte akzeptiert das auf Basis der Standardvertragsklauseln und dokumentiert es.

**Der Prompt.** Der Agent erkennt Händler an der Kundennummer und lässt Namen von Ansprechpartnern weg, die die Antwort nicht braucht.

**Koa.** Die Bewertung wird verschoben, bis es einen EU-Termin gibt.

Das Warten auf die schriftliche Bestätigung verschiebt den Go-live um etwa drei Wochen. Aus meiner Sicht ist das billiger, als den Datenfluss hinterher zu erklären.

## Was sollte ein Hersteller schriftlich bestätigen lassen?

Fragen Sie Salesforce pro Agent und legen Sie die Antworten in der Architekturdokumentation ab:

1. **Modell.** Welches Modell nutzt jeder Agent, und was bedeutet Salesforce Default heute für Ihre Org?
2. **Region.** Wo ist Data 360 bereitgestellt, und in welcher Region verarbeitet die Einstein-Generative-AI-Plattform Ihre Prompts?
3. **Ausfall.** Wohin geht eine Anfrage, wenn der regionale Endpunkt nicht erreichbar ist, und gilt eine In-Region-only-Einstellung für Ihre Agenten und Ihren Modellanbieter?
4. **Unterauftragsverarbeiter.** Wer verarbeitet den Prompt für dieses Modell: OpenAI, Azure, AWS oder Google?
5. **EU Operating Zone.** Falls Ihre Org dort läuft: Darf sie Agentforce nutzen, und mit welchen Einschränkungen?
6. **Aufbewahrung.** Gilt Zero Data Retention für Ihr Modell, und welche Klauseln Ihres eigenen Anbietervertrags greifen bei BYOLLM?
7. **Änderungen.** Wie erfahren Sie, wenn sich das Standardmodell oder die Unterauftragsverarbeiter-Liste ändert?

Diese Fragen pro Agent zu klären, gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/); den größeren Überblick über Agenten in der Fertigung gibt [Kapitel 10 der KI-Masterclass](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).

Wo ein Agentforce-Agent Ihre Händlerdaten verarbeitet, hängt vom gewählten Modell ab, und nur eine schriftliche Bestätigung von Salesforce für Ihre Org klärt es.
