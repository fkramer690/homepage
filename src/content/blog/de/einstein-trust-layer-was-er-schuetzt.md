---
title: "Einstein Trust Layer: Was er in Agentforce schützt"
metaTitle: "Einstein Trust Layer in Agentforce: Maskierung ist aus"
description: "Agentforce-Agenten geben Daten unmaskiert ans LLM. Was der Einstein Trust Layer trotzdem leistet und wie Sie Händlerpreise, Verträge und Personendaten schützen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: einstein-trust-layer-was-er-schuetzt
translationKey: einstein-trust-layer-explained
topic: security
categories: [ai, architecture]
tags: [Einstein Trust Layer, Agentforce, Datenmaskierung, Sicherheit, Maschinenbau]
takeaways:
  - "In einem Agentforce-Agenten schützt der Einstein Trust Layer vor allem über Zero-Data-Retention-Verträge, Toxizitätsbewertung und einen Audit Trail in Data 360."
  - "Salesforce hat muster- und feldbasierte Maskierung für Agenten abgeschaltet, auch für Prompt-Vorlagen, die ein Agent als Aktion aufruft."
  - "Im Agenten schützen nur Berechtigungen und Aktionen Händlerpreise und Konditionen. Außerhalb von Agenten kann feldbasierte Maskierung helfen."
  - "Der Audit Trail speichert den Prompt-Text in Data 360 und ist damit selbst ein sensibler Datenbestand, der Zugriffsregeln und eine Aufbewahrungsfrist braucht."
  - "Bei Hosted MCP entscheidet das Tool: Agenten und Prompt-Vorlagen laufen unter dem Trust Layer, Daten aus direkten Tools regelt Ihr KI-Vertrag."
faq:
  - q: "Maskiert der Einstein Trust Layer personenbezogene Daten in Agentforce-Agenten?"
    a: "Nein. Laut Salesforce-Hilfe ist muster- und feldbasierte Datenmaskierung für LLMs bei Agenten abgeschaltet. Für direkt genutzte Prompt-Builder-Vorlagen und eingebettete Funktionen wie Einstein Service Replies gilt sie weiter. Prüfen Sie im Audit Trail Ihrer eigenen Org, was beim Modell ankommt."
  - q: "Was bedeutet Zero Data Retention bei Agentforce?"
    a: "Salesforce hat mit seinen LLM-Partnern vereinbart, dass sie Prompts und Antworten nicht speichern. Laut Trailhead werden keine Kundendaten, auch kein Prompt-Text und keine generierte Antwort, außerhalb von Salesforce gespeichert."
  - q: "Verhindert der Trust Layer Prompt Injection?"
    a: "Salesforce führt Schutzmechanismen gegen Prompt Injection unter den Agentforce-Guardrails, sagt aber nicht, wie vollständig sie greifen. Ich behandle sie als eine Schicht neben engen Berechtigungen und Aktionen, die nur die nötigen Felder liefern."
  - q: "Maskiert eine Prompt-Builder-Vorlage noch, wenn ein Agent sie aufruft?"
    a: "Nein. Laut Salesforce-Hilfe folgt die Maskierung der Trust-Layer-Konfiguration, wenn eine Vorlage direkt genutzt wird, etwa in Service Replies. Ruft ein Agent sie über eine Aktion auf, ist die Maskierung abgeschaltet."
draft: false
---

Der Einstein Trust Layer schützt einen Agentforce-Agenten vor allem über Verträge, Bewertungen und Protokolle. Zero-Data-Retention-Vereinbarungen verbieten den Modellpartnern von Salesforce, Prompts zu speichern, eine Toxizitätsbewertung markiert schädliche Antworten, und ein Audit Trail hält Prompts und Werte in Data 360 fest. Die Datenmaskierung, an die die meisten beim Trust Layer zuerst denken, ist für Agenten laut Salesforce abgeschaltet, Werte, die ein Agent abruft, gehen also unmaskiert ans Modell. Händlerpreise, Vertragskonditionen und Personendaten in einem Agenten schützen deshalb die Berechtigungen des Agenten, Ihre Aktionen und die Modellwahl. Dort liegt die Konfigurationsarbeit für einen Hersteller.

## Was leistet der Einstein Trust Layer in einem Agentforce-Agenten?

Die [Entwicklerdokumentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) nennt fünf Bausteine: Grounding in CRM-Daten, Maskierung sensibler Daten, Toxizitätserkennung, Audit Trail mit Feedback und Zero-Data-Retention-Vereinbarungen mit externen LLM-Partnern. Für einen Agenten bedeutet das:

- **Zero Data Retention.** Der LLM-Partner ist vertraglich verpflichtet, Prompts und Antworten nicht aufzubewahren. Trailhead formuliert es in der [Response Journey](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey) so: "no customer data including the prompt text and generated responses are stored outside of Salesforce."
- **Toxizitätserkennung.** Dieselbe Einheit beschreibt einen Wert von 0 bis 1 über Kategorien wie Gewalt, Hass und Obszönität, der mit der Antwort zurückkommt. Die [Guardrails-Einheit](https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns) sagt: "Potentially harmful LLM responses are detected and flagged."
- **Audit Trail.** Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud) enthält er Prompt-ID und Benutzer, "Prompt text and PII-masked prompt", Sicherheits- und Toxizitätswerte sowie das Feedback der Anwender. "This data is stored and analyzed in Data 360." Fertige Dashboards zeigen Maskierung, Toxizität, Nutzungstrends und Akzeptanzraten.
- **Grounding.** Ausgewählte CRM-Datensätze und Data-360-Inhalte kommen in den Prompt, damit das Modell seine Antwort darauf stützen kann. Das verbessert die Relevanz, garantiert aber keine richtige Antwort.

Auffällig ist, was in der Liste fehlt: alles, was festlegt, welche Datensätze ein Agent lesen darf. Der Abruf beachtet bestehende Berechtigungen, legt sie aber nicht fest. Sie kommen vom Benutzer des Agenten.

```vertiefung Für Admins
titel: Unter welchem Benutzer liest ein Agent Daten?
Ein Service-Agent läuft unter einem eigenen Agentenbenutzer; im [Trailhead-Beispiel](https://trailhead.salesforce.com/content/learn/modules/programmatic-instructions-in-agentforce/give-your-agent-more-information-with-flows-actions-and-permissions) muss der Lesezugriff auf ein eigenes Feld ausdrücklich im Permission Set "Service Agent Permissions" freigegeben werden. Mitarbeiteragenten sind laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees) "logged in as the person they're helping" und folgen dessen Berechtigungen.
```

## Warum ist die Datenmaskierung für Agenten abgeschaltet?

Die Maskierung ersetzt sensible Werte durch Platzhalter, bevor der Prompt Salesforce verlässt, und setzt sie in der Antwort wieder ein. Für Agenten ist sie aus. In einem [Salesforce-Blogbeitrag vom 10. Juni 2025](https://www.salesforce.com/blog/llm-data-masking/) schreibt Tejas Sanghavi, Senior Director of Product Management für Agentforce: "Last year, we made the decision to disable data masking for Agentforce use cases." Die Begründung: Maskierung "adds latency and hinders the planner and action workflows", und "Many customers report accuracy degradation in agent responses when masking is enabled." Das aktuelle Trailhead-Modul [Meet the Einstein Trust Layer](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/meet-the-einstein-trust-layer) sagt dasselbe: "Data masking for LLMs is currently disabled for agents." Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ai.agent_trust_data_masking.htm&language=en_US&type=5) ist genauer: "pattern-based and field-based data masking for large language models (LLMs) is disabled for agents", und "When a prompt template is called through an agent action, data masking is disabled." Ihre Maskierung behält eine Vorlage nur, wenn sie direkt genutzt wird.

Eine Trailhead-Einheit zu [Agenten in Marketing Cloud Next](https://trailhead.salesforce.com/content/learn/modules/conversational-marketing-fundamentals-for-marketing-cloud-next/secure-agents-with-the-einstein-trust-layer) beschreibt noch eine Maskierung vor dem Versand des Prompts. Ich nehme den Hilfeartikel als Grundlage und vergleiche im Audit Trail der eigenen Org Prompt-Text und maskierten Prompt.

Außerhalb von Agentforce arbeitet die Maskierung laut Blogbeitrag "the same as it always has". Das [Trailhead-Modul zur Maskierung](https://trailhead.salesforce.com/content/learn/modules/llm-data-masking-in-the-einstein-trust-layer/configure-llm-data-masking-policies) zeigt, wie sie entscheidet: Name, E-Mail-Adresse, Telefonnummer, Kreditkarte und US-Sozialversicherungsnummer sind standardmäßig maskiert, der Firmenname lässt sich zuschalten, und Formate werden geprüft: "If an item isn't a valid value, it won't be masked." Für einen Hersteller folgt daraus der entscheidende Punkt.

```hinweis achtung
Ein Händlernettopreis, ein Bonus von 3 Prozent oder "Zahlung 60 Tage netto" passt auf keines dieser Muster. Außerhalb von Agenten kann feldbasierte Maskierung ein Preis- oder Vertragsfeld trotzdem schützen, wenn es über Datenklassifizierung oder Shield-Verschlüsselung gekennzeichnet ist. Im Agenten greift keine der beiden Maskierungen.
```

## Die Grenzen des Trust Layers

Für eine Architekturentscheidung zählen vier Grenzen.

**Die Prüfungen arbeiten mit Wahrscheinlichkeiten.** Die Maskierung stützt sich auf Erkennungsmodelle, die mit Mustern und Kontext arbeiten, und die [Models-API-Dokumentation](https://developer.salesforce.com/docs/einstein/genai/guide/data-masking.html) schreibt offen, dass "no model can guarantee 100% accuracy" und dass "cross-region and multi-country use cases can affect the ability to detect specific data patterns." Ein Händlernetz über viele Länder ist genau so ein Fall. Toxizität ist ein Wert, kein Urteil. Die Guardrails-Einheit führt Prompt Injection unter den Agentforce-Guardrails und nicht bei den Funktionen des Trust Layers; wie weit sie bei Text aus Datensätzen greift, beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

**Maskierung kostet Kontext.** Auf der Seite [Supported Models](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) steht: "All models are currently limited to a context size of 65,536 tokens when data masking is turned on". Eine Prompt-Builder-Vorlage, die einen langen Servicevertrag oder zehn Jahre Maschinenhistorie zusammenfasst, stößt an diese Grenze. Wann eine Vorlage passt und wann ein Agent, steht in [Prompt Builder oder Agentforce-Agent](../prompt-builder-oder-agentforce-agent/).

**Wo das Modell läuft, ist eine eigene Frage.** Dieselbe Seite sagt: "Anthropic and Amazon models are operated on Amazon Bedrock infrastructure entirely within the Salesforce Trust Boundary", andere Modelle betreiben Salesforce-Partner "inside a shared trust zone". Bei Bring Your Own LLM gilt "Trust Layer features are fully supported", die Inferenz übernimmt aber Ihr Anbieter. Nach meinem Verständnis kommen die Aufbewahrungsregeln dann aus Ihrem Vertrag mit diesem Anbieter und nicht aus den Partnerverträgen von Salesforce. Regionen und Datenresidenz behandelt [Agentforce und EU-Datenresidenz](../agentforce-eu-datenresidenz-modelle/).

**Bei externen Modellen entscheidet das Tool.** Ruft Claude oder ChatGPT über [Hosted MCP](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html) einen Agentforce-Agenten oder eine Prompt-Vorlage auf, führt Salesforce sie selbst aus, und "Einstein Trust Layer policies apply"; das externe Modell bekommt das Ergebnis. Ruft es dagegen Datensatz- oder Abfrage-Tools direkt auf, macht Salesforce keinen LLM-Aufruf, der Trust Layer hat keinen Schritt, an dem er eingreifen könnte, und die Daten landen unter Ihrem Vertrag mit dem KI-Anbieter im externen Modell. Diesen Weg erkläre ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

```hinweis achtung
Der Audit Trail speichert den Prompt-Text selbst. Was ein Agent in einen Prompt schreibt, auch Preise und Personendaten, landet in Data-360-Objekten. Die Trailhead-Einheiten, die ich gelesen habe, nennen keine Aufbewahrungsfrist, die Entscheidung liegt also bei Ihnen, und sie berührt die Protokollpflichten aus [EU AI Act: Fristen für Agentforce](../eu-ai-act-fristen-agentforce/).
```

## Rechenbeispiel: Händleragent mit Nettopreisen

Nehmen wir einen Maschinenbauer mit 60 Händlern in 14 Ländern, Service Cloud, einem Händlerportal auf Experience Cloud und SAP als führendem System für Preise und Bestände. Alle Zahlen sind Annahmen. Ein Service-Agent im Portal soll die Verfügbarkeit von Ersatzteilen und den eigenen Nettopreis des Händlers nennen; ein Mitarbeiteragent soll 15 Key Account Manager bei der Vorbereitung von Händlergesprächen unterstützen.

Was der Trust Layer hier beiträgt: Der Modellanbieter speichert keine Prompts, schädliche Antworten werden markiert, Gespräche lassen sich protokollieren, je nachdem, welche Audit- und Session-Tracing-Funktionen Sie aktivieren. Was er nicht beiträgt: eine Maskierung des Nettopreises, weil die Maskierung für Agenten abgeschaltet ist, und jede Prüfung, ob Händler A den Preis von Händler B sieht.

Den Schutz trägt deshalb das Design:

- **Agentenbenutzer.** Das Permission Set des Service-Agenten erhält Lesezugriff auf Teilenummer, Bezeichnung und Verfügbarkeit, aber keinen Zugriff auf das Objekt mit den Preisvereinbarungen.
- **Preisaktion.** Ein Flow fragt SAP ab, mit dem Händler-Account des angemeldeten Portalbenutzers und nie mit Text, den das Modell erzeugt hat, und liefert einen Preis für ein Teil. Warum solche Entscheidungen in Code gehören, steht in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).
- **Vertragskonditionen.** Zahlungsziele und Haftungsgrenzen bleiben außerhalb des Agenten. Eine Frage dazu führt zur Übergabe an den Key Account Manager.
- **Mitarbeiteragent.** Er erbt die Rechte der Key Account Manager, deshalb wird deren Feldberechtigung auf Margenfelder vor dem Go-live geprüft.
- **Audit Trail.** Lesezugriff auf die Audit-Daten in Data 360 erhalten drei benannte Personen, die Aufbewahrungsfrist ist mit dem Datenschutz abgestimmt.

Aus Architektensicht ist das die normale Arbeitsteilung: Der Trust Layer kümmert sich um den Modellanbieter, Ihr Design darum, wer was sieht.

## Maskierung, Agentenbenutzer und Aktionen einstellen

1. **Maskierungsstatus je Funktion klären.** Für Agenten von "aus" ausgehen und im Audit Trail prüfen. Für Prompt Builder und eingebettete Funktionen im Einstein Trust Layer Setup festlegen, welche Datentypen maskiert werden, auch den Firmennamen.
2. **Agentenbenutzer auf das Minimum schneiden.** Jeder Service-Agent bekommt einen eigenen Ausführungsbenutzer mit einer minimalen, prüfbaren Permission-Set-Zuordnung und keine Preis-, Margen- oder Vertragsfelder, solange keine Aktion sie braucht. Permission Sets nur teilen, wo Agenten wirklich denselben Zugriff brauchen.
3. **Benutzer hinter Mitarbeiteragenten prüfen.** Die Feldberechtigung auf Preise, Boni und Personendaten von Servicetechnikern im Außendienst entscheidet, was beim Modell ankommt.
4. **Enge Aktionen bauen.** Jede Aktion liefert nur die Felder, die die Antwort braucht, und die Identität kommt aus der Sitzung, nicht aus dem Prompt.
5. **Das Modell bewusst wählen.** Modelle auf Bedrock innerhalb der Trust Boundary, Partnermodelle in einer Shared Trust Zone oder ein eigener Vertrag bei Bring Your Own LLM.
6. **Den Audit Trail als sensible Daten behandeln.** Zugriff, Aufbewahrung und Löschung sind vor dem Go-live geregelt, ebenso für Session-Tracing-Daten, wenn Sie sie aktivieren.
7. **Sprachen prüfen.** Salesforce fordert Entwickler auf, die Unterstützung jeder Sprache und jedes Gebietsschemas im Trust Layer zu prüfen; machen Sie das für jedes Händlerland.
8. **Die Dashboards verfolgen.** Toxizitäts- und Maskierungs-Dashboards gehören in die wöchentliche Durchsicht eines neuen Agenten.

Diese Konfiguration ist Teil meiner Arbeit an der [Salesforce-Architektur](../../leistungen/salesforce-architektur/), weil die Entscheidungen im Datenmodell und in den Berechtigungen fallen und nicht im Prompt des Agenten. Vom Trust Layer selbst bleibt für Agenten vor allem, dass der Modellanbieter Ihre Daten nicht speichert.
