---
title: "Agentforce Datenresidenz: Wo laufen die KI-Modelle?"
description: "Wohin Agentforce Prompts mit Händlerdaten schickt: Bedrock oder Shared Trust Zone, Geo-aware Routing, Hyperforce Operating Zone und was Sie schriftlich klären."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-eu-datenresidenz-modelle
translationKey: agentforce-eu-data-residency
topic: security
categories: [architecture, ai]
tags: [Agentforce, Datenresidenz, DSGVO, Hyperforce, LLM, Maschinenbau]
takeaways:
  - "Claude- und Amazon-Modelle laufen auf Amazon Bedrock innerhalb der Salesforce Trust Boundary, andere Modelle bei Partnern oder beim LLM-Anbieter."
  - "Außerhalb der USA gehen GPT-Anfragen an den Azure-OpenAI-Endpunkt nahe Ihrer Plattformregion. Den US-Fallback können Sie abschalten."
  - "Geo-aware Routing gilt für OpenAI, Anthropic und Gemini, doch Batch-Anfragen und Fallback folgen eigenen Regeln."
  - "Laut FAQ zur Hyperforce Operating Zone sind einzelne Einstein-Funktionen nicht verfügbar, ohne dass Agentforce genannt wird. Koa startet in US-Regionen."
  - "Klären Sie vor dem Go-live schriftlich pro Agent Modell, Region, Fallback, Batch-Nutzung, Unterauftragsverarbeiter und Aufbewahrung."
faq:
  - q: "Verarbeitet Agentforce Daten in der EU?"
    a: "Bei interaktiven Anfragen aus einer europäischen Org ist das meistens der Fall. Salesforce dokumentiert Geo-aware Routing pro Modellfamilie: GPT-Anfragen gehen an den nächsten Azure-OpenAI-Endpunkt, Claude-Anfragen an die nächste AWS-Region mit dem Modell. Ausnahmen sind der Fallback in die USA, Batch-Verarbeitung und die regionale Modellverfügbarkeit. Lassen Sie sich das für Ihre Org schriftlich bestätigen."
  - q: "Was ist die Shared Trust Zone in Agentforce?"
    a: "So nennt Salesforce Modelle, die Partner außerhalb der eigenen Trust Boundary betreiben, etwa OpenAI-Modelle. Der Begriff allein sagt nichts über die Verarbeitungsregion aus: Dafür brauchen Sie pro Modell Anbieter, Hosting-Plattform, Region und Fallback. Für die derzeit genutzten LLM-Anbieter nennt Salesforce Zero Data Retention."
  - q: "Gibt es Agentforce in der Hyperforce Operating Zone?"
    a: "Die öffentliche Dokumentation bestätigt das nicht für Agentforce-Agenten. Laut FAQ zur Hyperforce Operating Zone sind einzelne Einstein-Funktionen in Operating-Zone-Produkten nicht verfügbar, ohne Agentforce zu nennen. Klären Sie Vertrags- und SKU-Umfang mit Salesforce, bevor Sie damit planen."
  - q: "Gilt die Zero Data Retention von Salesforce auch für ein eigenes Modell per BYOLLM?"
    a: "Nein. Laut Datenschutz-FAQ von Salesforce zu Agentforce gelten die Antworten dort nicht für BYO LLM. Die Anbindung an Ihren Anbieter gilt dann als Nicht-Salesforce-Anwendung, und für die Daten gilt Ihr eigener Vertrag mit ihm."
  - q: "Können wir Koa in Europa nutzen?"
    a: "Eine allgemeine Verfügbarkeit in europäischen Regionen wurde nicht angekündigt. Salesforce hat Koa am 15. September 2026 als Pilot vorgestellt, die allgemeine Verfügbarkeit wird für Winter 2026 in US-Regionen erwartet. Die Pilotregionen veröffentlicht Salesforce nicht."
draft: false
---

Beantwortet ein Agentforce-Agent die Anfrage eines europäischen Händlers, bleiben die CRM-Datensätze in Ihrer Org. Der daraus erstellte Prompt geht aber an ein Sprachmodell. Wo das passiert, hängt vom Modell, Ihrer Plattformregion, den Routing-Regeln und den Fallback-Einstellungen ab. Claude- und Amazon-Modelle betreibt Salesforce auf Amazon Bedrock innerhalb der eigenen Trust Boundary, andere Modelle laufen bei Partnern in einer „Shared Trust Zone“ oder beim Anbieter. Geo-aware Routing leitet interaktive Anfragen an Rechenzentren nahe Ihrer Plattformregion, wobei Ausnahmen gelten. Lassen Sie sich für die Agentforce-Datenresidenz in der EU Modell, Region und Fallback schriftlich bestätigen.

## Wohin geht ein Prompt in Agentforce?

Ein Serviceagent, der die Frage „Wo ist meine Ersatzteilbestellung?“ beantwortet, nimmt das Händlerkonto, den Auftrag und eventuell einen Liefertermin aus SAP in den Prompt auf. Die Datensätze selbst bleiben an ihrem Speicherort. Prompts, Antworten und Traces können jedoch in Data 360 protokolliert werden, wenn Sie Audit oder Session Tracing aktivieren. Laut [Datenschutz-FAQ zu Agentforce](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) von Salesforce (Juni 2025) werden Kundendaten nicht in Agentforce gespeichert, sondern in den zugrunde liegenden Salesforce-Diensten. Der Prompt dagegen reist. Die Seite [Supported Models](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) beschreibt drei Wege:

- **Innerhalb der Trust Boundary.** Anthropic- und Amazon-Modelle laufen laut Salesforce auf Amazon-Bedrock-Infrastruktur „entirely within the Salesforce Trust Boundary“. Anthropic schrieb bei der Erweiterung der Partnerschaft im [Oktober 2025](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), der gesamte Claude-Verkehr bleibe in der Virtual Private Cloud von Salesforce.
- **Shared Trust Zone.** Andere Modelle betreiben Salesforce-Partner, „either inside a shared trust zone or through the LLM provider directly“. Das [Trailhead-Modul zu Sprachmodellen](https://trailhead.salesforce.com/content/learn/modules/large-language-models/learn-how-salesforce-uses-large-language-models) fasst Shared Trust so zusammen: Daten bleiben bei Salesforce, die Moderation erfolgt gemeinsam.
- **Eigenes Modell (BYOLLM).** Sie binden ein Modell aus Ihrem eigenen Vertrag mit Amazon Bedrock, Azure OpenAI, OpenAI oder Vertex AI an. Die Inferenz läuft bei Ihrem Anbieter, die Anfrage geht trotzdem durch die Models API und den Trust Layer.

Die Datenschutz-FAQ ergänzt die Vertragssicht. In manchen Fällen gehen Kundendaten direkt an OpenAI, und OpenAI ist Unterauftragsverarbeiter von Salesforce. Bei Anthropic auf AWS und OpenAI auf Microsoft Azure ist der Hosting-Anbieter der Unterauftragsverarbeiter. Für die Drittanbieter, die Salesforce derzeit nutzt, nennt das Dokument eine Zero-Data-Retention-Policy. Dieselbe FAQ stellt klar, dass ihre Antworten nicht für BYO LLM gelten: Mit eigenem Modell regelt Ihr eigener Vertrag mit dem Anbieter die Daten.

## Welches Modell beantwortet heute Ihren Händler?

Die erste Frage lautet, welches Modell Ihr Agent überhaupt nutzt. Laut Supported Models ist die Option „Salesforce Default“ ein verwalteter Mix, der derzeit GPT-4o enthält; die Option „AWS-Hosted“ nutzt Claude Sonnet 4 auf Bedrock. Trailhead nennt für Aufrufe der Agentforce Reasoning Engine OpenAI GPT-4o als Standard, in manchen Fällen Azure OpenAI GPT-4o. Seit der [Claudeforce-Meldung](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) vom 27. August 2026 dient Claude außerdem als ein Reasoning-Modell für die Atlas Reasoning Engine.

Das Dokument [Infrastructure and Sub-processors](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/misc/salesforce-infrastructure-and-subprocessors.pdf) vom 19. Dezember 2025 führt Agentforce unter den Einstein Generative AI Services und nennt unter anderem:

| Anbieter | Genannte Standorte | Hinweis zum Routing |
|---|---|---|
| OpenAI | USA | bei Ausfall Umleitung an einen Endpunkt auf Microsoft Azure, Vorrang für die Region, in der die Org bereitgestellt ist, sofern verfügbar |
| Microsoft Azure | USA, Schweiz, Frankreich, Deutschland, Schweden, Großbritannien und weitere | keiner |
| Amazon Web Services | USA, Deutschland, Frankreich, Italien, Schweden, Schweiz, Großbritannien und weitere | bei LLM-Aufrufen über AWS-Endpunkte gilt die genannte Region, die der Org am nächsten liegt; Schweizer Daten können bei Ausfall über AWS in den USA laufen |

Das Unterauftragsverarbeiter-Dokument bildet die vertragliche Seite ab. Die Routing-Regeln pro Modell stehen in der Salesforce-Hilfe und sind genauer, wie der nächste Abschnitt zeigt.

## Hält Geo-aware Routing die Anfragen in der EU?

Laut Supported Models leiten geo-aware Modelle die LLM-Anfrage an ein nahes Rechenzentrum, abhängig davon, wo Data 360 für Ihre Org bereitgestellt ist; die Region der Einstein-Generative-AI-Plattform entspricht der Data-360-Region. Der [Hilfeartikel zu Geo-aware Routing](https://help.salesforce.com/s/articleView?id=ai.generative_ai_platform_geo_aware_routing.htm&language=en_US&type=5) nennt KI-Agenten und drei Modellfamilien: OpenAI-Modelle, Anthropic-Modelle auf Amazon Bedrock und Gemini-Modelle auf Vertex AI, sofern die Modelle in den jeweiligen Regionen verfügbar sind.

Für GPT-Modelle ist die [OpenAI-Routing-Seite](https://help.salesforce.com/s/articleView?id=ai.generative_ai_platform_geo_aware_routing_openai.htm&language=en_US&type=5) eindeutig: Anfragen außerhalb der USA gehen an einen unterstützten Azure-OpenAI-Endpunkt, der dem Standort Ihrer Instanz der Einstein-Generative-AI-Plattform am nächsten liegt. Die Tabelle nennt Frankreich, Deutschland, Italien, Schweden, die Schweiz und Großbritannien. Claude-Anfragen gehen an das nächste AWS-Rechenzentrum, in dem das Modell verfügbar ist. Ein [Hilfeartikel von Salesforce](https://help.salesforce.com/s/articleView?id=000396615&language=en_US&type=1) nennt AWS-Instanzen der Einstein-Plattform und von Agentforce in Frankfurt, Paris, Mailand, Stockholm, London und Zürich.

Drei Ausnahmen sind wichtig, Stand 9. November 2026:

- **Ausfall.** Reagieren primärer und sekundärer Endpunkt nicht, weicht die Anfrage auf Azure OpenAI in den USA aus. Eine Einstellung im Einstein Setup verhindert das; für Anthropic- und GPT-Modelle deaktiviert sie den regionalen Fallback vollständig. Zum Fallback bei Gemini macht die Hilfe keine Aussage.
- **Batch-Verarbeitung.** Für GPT 4 Omni, GPT 4 Omni Mini und GPT 4.1 nutzt Azure OpenAI bei Batch-Anfragen einen globalen Endpunkt, der den Regeln für Geo-aware Routing nicht folgt und keine Verarbeitung innerhalb der Region erzwingt.
- **Schweiz.** Für Schweizer Daten nennt das Unterauftragsverarbeiter-Dokument vom 19. Dezember 2025 einen Ausfallpfad über AWS in den USA, der für Schweizer Standorte und Händler relevant ist.

```vertiefung Für Admins
titel: Was die Einstellung „Enable In-Region Model Request Only“ bewirkt
Sie liegt im Einstein Setup und setzt Data 360 voraus. Ist sie aktiviert und sind die regionalen Endpunkte nicht erreichbar, wird ein Fehler ausgegeben, statt die Anfrage in die USA umzuleiten. Laut Salesforce-Hilfe deaktiviert sie den regionalen Fallback für Anthropic- und GPT-Modelle vollständig; das System versucht weiterhin zuerst, den primären und sekundären Endpunkt in der Region zu erreichen. Auf die Batch-Verarbeitung wirkt sie nicht.
```

In-Region-only hat einen Preis: Bei einem Ausfall liefert der Agent einen Fehler. Beim Auftragsstatus ist das mit einer Übergabe an einen Menschen vertretbar. Für eine [Störungshotline](../stoerungshotline-agentforce-voice-deutsch/) würde ich das ohne getestete Übergabe an einen Disponenten nicht akzeptieren.

## Für Agentforce ist die Hyperforce Operating Zone nicht bestätigt

Salesforce hat die Hyperforce EU Operating Zone am 2. März 2023 [gestartet](https://www.salesforce.com/news/press-releases/2023/03/02/hyperforce-eu-operating-zone-news/). Heute heißt das Angebot Hyperforce Operating Zone und umfasst getrennte Angebote für die EU und die Schweiz, damit Kunden ihre Daten in der EU speichern und verarbeiten können, unterstützt durch Personal in der EU. Die [Produktseite](https://salesforce.com/platform/data-residence-eu-oz) spricht von Verarbeitung und Speicherung „strictly within the region (EU and Switzerland)“ und von einer Auswahl geprüfter Produkte und Funktionen, die Sales Cloud, Service Cloud, die Plattform und Industries umfasst. Agentforce erwähnen beide Seiten nicht. Laut [FAQ zur Operating Zone](https://help.salesforce.com/s/articleView?id=xcloud.hf_operating_zone_faq.htm&language=en_US&type=5) sind einzelne Einstein-Funktionen nicht als Teil der Operating-Zone-Produkte verfügbar, ohne dass die FAQ diese Funktionen auflistet. Unabhängig davon steht in der [FAQ zu Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html), dass der Coding-Assistent in der Operating Zone nicht verfügbar ist; das sagt nichts über Serviceagenten aus.

```hinweis offen
Läuft Ihre Org in der Hyperforce Operating Zone, würde ich Agentforce-Agenten dort als unbestätigt behandeln, bis Salesforce den Umfang in Ihrem Vertrag oder Ihrer SKU schriftlich nennt.
```

Koa, das eigene CRM-Reasoning-Modell von Salesforce, kommt zuerst in die USA. Laut [Investor-Meldung](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx) vom 15. September 2026 steht es ausgewählten Pilotkunden zur Verfügung, die allgemeine Verfügbarkeit wird für Winter 2026 in US-Regionen erwartet. Die Inferenz läuft laut Salesforce vollständig in der eigenen Trust Boundary. Eine allgemeine Verfügbarkeit in europäischen Regionen wurde nicht angekündigt, und Salesforce veröffentlicht die Pilotregionen nicht.

## Ist eine Verarbeitung in der EU Pflicht?

Ich bin Salesforce-Architekt, kein Anwalt, und das hier ist keine Rechtsberatung. So wie ich es lese, verlangt die DSGVO nicht, dass Daten in der EU bleiben. Laut Datenschutz-FAQ von Salesforce sind alle Salesforce-Dienste einschließlich Agentforce durch die EU-Standardvertragsklauseln abgedeckt, dazu kommen Binding Corporate Rules für Auftragsverarbeiter. Ob das für einen konkreten Datenfluss reicht, entscheidet Ihr Datenschutzbeauftragter: Modellroute, Unterauftragsverarbeiter, Datenkategorien, Übermittlungsinstrument und mögliche ergänzende Maßnahmen gehören in diese Transferbewertung. Ein Datenschutzbeauftragter kann trotzdem eine Verarbeitung in der EU verlangen, sobald Prompts Händlerkontakte, Namen von Technikern im Außendienst oder Garantiefälle enthalten.

Drei benachbarte Themen folgen eigenen Regeln: die [Fristen des EU AI Act für Agentforce](../eu-ai-act-fristen-agentforce/), [KI-Coding-Tools mit Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/) und externe Modelle, die über [Hosted MCP Server](../salesforce-hosted-mcp-server-datenzugriff/) Salesforce-Daten lesen und für die die Aufbewahrungsvereinbarungen von Salesforce nicht greifen.

## Rechenbeispiel: Händleranfragen aus fünf Ländern

Nehmen wir einen Maschinenbauer in Deutschland mit 300 Händlern in Frankreich, Italien, Österreich, der Schweiz und Polen, mit Service Cloud, SAP S/4HANA für Aufträge und Data 360 in einer europäischen Region. Alle Zahlen sind Annahmen. Ein Serviceagent soll rund 3.000 Händleranfragen pro Monat zu Auftragsstatus, Ersatzteilverfügbarkeit und Stand von Garantiefällen beantworten. Die Prompts enthalten Namen von Ansprechpartnern, Seriennummern und Auftragswerte.

**Das Modell.** Der Agent läuft auf Salesforce Default. Die Datenschutzbeauftragte findet OpenAI mit Standort USA auf der Unterauftragsverarbeiter-Liste und den dokumentierten US-Fallback für GPT-Modelle. Das Team aktiviert die Einstellung für Anfragen nur innerhalb der Region, hält Batch-Prompt-Templates aus dem Händlerprozess heraus und bittet Salesforce, Verarbeitungsregion und Ausfallpfad für die eigene Org zu bestätigen.

**Schweiz.** Der dokumentierte Ausfallpfad für Schweizer Daten läuft über AWS in den USA. Die Datenschutzbeauftragte akzeptiert das auf Basis der Standardvertragsklauseln und dokumentiert es.

**Der Prompt.** Der Agent erkennt Händler an der Kundennummer und lässt Namen von Ansprechpartnern weg, die die Antwort nicht braucht.

**Koa.** Die Bewertung wird verschoben, bis es einen EU-Termin gibt.

Das Warten auf die schriftliche Bestätigung verschiebt den Go-live um etwa drei Wochen. Aus meiner Sicht ist das billiger, als den Datenfluss hinterher zu erklären.

## Modell, Region und Ausfallpfad pro Agent schriftlich bestätigen lassen

Fragen Sie Salesforce pro Agent und legen Sie die Antworten in der Architekturdokumentation ab:

1. **Modell.** Welches Modell nutzt jeder Agent, und was bedeutet Salesforce Default heute für Ihre Org?
2. **Region.** Wo ist Data 360 bereitgestellt, und in welcher Region verarbeitet die Einstein-Generative-AI-Plattform Ihre Prompts?
3. **Ausfall.** Wohin geht eine Anfrage, wenn die regionalen Endpunkte nicht erreichbar sind, und ist die In-Region-only-Einstellung für Ihren Modellanbieter aktiviert?
4. **Batch.** Nutzt ein Prozess Batch-Prompt-Templates, die Geo-aware Routing umgehen?
5. **Unterauftragsverarbeiter.** Wer verarbeitet den Prompt für dieses Modell: OpenAI, Azure, AWS oder Google?
6. **Operating Zone.** Falls Ihre Org in der Hyperforce Operating Zone läuft: Darf sie Agentforce nutzen, und mit welchen Einschränkungen?
7. **Aufbewahrung.** Gilt Zero Data Retention für Ihr Modell, welche Prompts und Traces werden in Data 360 gespeichert, und welche Klauseln Ihres eigenen Anbietervertrags greifen bei BYOLLM?
8. **Änderungen.** Wie erfahren Sie, wenn sich das Standardmodell, das Routing oder die Unterauftragsverarbeiter-Liste ändert?

Ändert Salesforce das Standardmodell oder die Liste der Unterauftragsverarbeiter, stellen Sie die Fragen 1 bis 5 neu; am einfachsten hält ein Eintrag im [Entscheidungslog](../salesforce-architektur-entscheidungslog/) fest, welche Antwort für welchen Agenten gilt. Diese Fragen pro Agent zu klären, gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/); den größeren Überblick über Agenten in der Fertigung gibt [Kapitel 10 der KI-Masterclass](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).
