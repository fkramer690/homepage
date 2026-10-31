---
title: "Agentforce A2A: Welcher Agent führt das Händlergespräch?"
description: "Agentforce, SAP Joule und Copilot Studio bringen eigene Agenten. Welcher führt das Gespräch mit Händlern, und was leistet Agent-to-Agent (A2A) im Oktober 2026?"
pubDate: 2026-10-27
lang: de
slug: agentforce-a2a-mehrere-agenten-sap
translationKey: agentforce-a2a-multi-agent
topic: ai
categories: [architecture, ai]
tags: [Agentforce, A2A, Multi-Agent, MuleSoft, SAP, Architektur]
takeaways:
  - "Das Gespräch führt der Agent des Systems, in dem sich die Person anmeldet; für Händler und Servicekunden im Salesforce-Portal ist das Agentforce."
  - "Innerhalb einer Org ist Multi-Agent-Orchestrierung seit Winter '27 GA, zwischen Herstellern ist die MuleSoft A2A Bridge der dokumentierte Weg."
  - "Die A2A Bridge kennt für Agentforce keine asynchronen Tasks, und die Agent API bricht nach 120 Sekunden ab."
  - "SAP stellt Joule-Agenten per A2A für Dritte bereit, die bidirektionale Kommunikation mit fremden Agenten unterstützt SAP aber noch nicht."
  - "Datenabfragen mit genau einer richtigen Antwort gehören in eine API oder ein MCP-Tool und nicht an einen zweiten Agenten."
faq:
  - q: "Was ist A2A (Agent2Agent)?"
    a: "A2A ist ein offenes Protokoll, über das Agenten verschiedener Hersteller sich per Agent Card finden, Aufgaben übergeben und Ergebnisse zurückgeben. MCP verbindet einen Agenten mit Werkzeugen und Daten, A2A verbindet ihn mit einem anderen Agenten, der selbst schlussfolgert."
  - q: "Unterstützt Agentforce A2A nativ?"
    a: "Salesforce hat auf der Dreamforce 2026 gesagt, Agentforce könne als spezialisierter Subagent in jeder A2A-konformen Architektur arbeiten, ohne einen Status zu nennen. Dokumentiert ist heute die MuleSoft A2A Bridge, die A2A-Anfragen in Aufrufe der Agent API übersetzt."
  - q: "Kann Microsoft Copilot Studio einen Agentforce-Agenten aufrufen?"
    a: "Copilot Studio kann einen externen Agenten per A2A einbinden und Aufgaben an ihn delegieren. Ein Agentforce-Agent wird über die MuleSoft A2A Bridge per A2A erreichbar, dort ist Agentforce als verfügbar gelistet. Microsoft kennzeichnet die A2A-Funktion weder als Preview noch als GA, testen Sie sie also zuerst in einer Sandbox."
  - q: "Kann Agentforce mit SAP-Joule-Agenten sprechen?"
    a: "SAP dokumentiert, wie externe A2A-Clients Joule-Agenten über das Agent Gateway aufrufen, einige Komponenten sind noch nicht GA. Einen dokumentierten nativen A2A-Client in Agentforce habe ich nicht gefunden. Für Auftrags- oder Kreditdaten ist eine API-Aktion zu SAP einfacher und berechenbarer."
  - q: "Sollte ein Händler mit mehreren Agenten sprechen?"
    a: "Nein. Jede Zielgruppe bekommt einen Agenten, der das Gespräch führt und sich aus anderen Systemen holt, was er braucht. Mehrere Eingangstüren verwirren Händler, und lange Agentenketten vervielfachen Wartezeit, Kosten und Fehlerquellen."
draft: false
---

Mit Agentforce A2A, also Agent-to-Agent-Aufrufen zwischen Herstellern, verschiebt sich die Architekturfrage zur Zuständigkeit: Welcher Agent führt das Gespräch mit Händlern und Servicekunden? Meine Antwort: der Agent des Systems, in dem sich die Person anmeldet und in dem der Vorgang liegt. Händler im Salesforce-Portal sprechen mit Agentforce, das SAP über APIs liest. Innerhalb einer Org ist Multi-Agent-Orchestrierung seit Winter '27 allgemein verfügbar. Über Herstellergrenzen funktioniert heute die MuleSoft A2A Bridge, mit klaren Grenzen: nur synchron, keine Push-Benachrichtigungen, Task-Status im Gateway-Speicher. Natives A2A in Agentforce ist angekündigt, ohne Status.

## Warum bringt jeder Hersteller jetzt einen eigenen Agenten?

Ein Maschinenbauer mit Salesforce, SAP und Microsoft 365 bekommt drei Agenten gleichzeitig angeboten. Salesforce verkauft Agentforce für Service, Händlerportal und Vertrieb. SAPs KI-Chef beschrieb Joule in einem [Beitrag vom April 2025](https://news.sap.com/?p=233102) als "agent orchestrator working across enterprise workflows" und nennt SAP dort einen der Gründungsunterstützer des A2A-Protokolls. Microsoft dokumentiert, wie ein Agent in Copilot Studio [einen anderen Agenten per A2A einbindet](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent) und Aufgaben an ihn delegiert, statt nur APIs aufzurufen. Jeder Hersteller stellt seinen Agenten nach vorn.

Die Frage eines Händlers hält sich an diese Grenzen nicht. "Ist der Dichtungssatz für Maschine 4711 lieferbar, und ist mein Garantieantrag für diese Maschine freigegeben?" berührt die Verfügbarkeit in SAP sowie Antrag und Anlage in Salesforce. Will jeder Systemagent selbst antworten, bekommt der Händler drei Eingangstüren oder eine Kette von Agenten, die sich gegenseitig fragen. Beides ist schlechter als ein Agent, der das Gespräch führt und sich holt, was er braucht.

A2A (Agent2Agent) ist ein offenes Protokoll, über das Agenten verschiedener Hersteller sich über eine "Agent Card" finden, Aufgaben übergeben und Ergebnisse zurückgeben. Der Unterschied zu MCP zählt für den Entwurf: MCP verbindet einen Agenten mit Werkzeugen und Daten, A2A mit einem anderen Agenten, der selbst schlussfolgert. Was MCP für die IT bedeutet, steht in [MCP und Salesforce für die IT-Leitung erklärt](../mcp-salesforce-erklaert-it-leitung/).

## Was leistet Agent-to-Agent-Interoperabilität heute?

Stand 27. Oktober 2026 unterscheidet sich der Status je nach Weg. Ich würde nur mit dem dokumentierten planen:

- **Innerhalb einer Salesforce-Org: allgemein verfügbar.** Der [Entwicklerleitfaden zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) schreibt "Multi-Agent Orchestration is generally available". Ein Orchestrator-Agent übergibt an Spezialisten in derselben Org, die in Agent Script als `connected_subagent` deklariert sind.
- **Agentforce als A2A-Server über MuleSoft: verfügbar, mit Grenzen.** Die [A2A Bridge](https://docs.mulesoft.com/general/exp-services-create-a2a-bridge) läuft als Policy-Kette auf einem Omni Gateway vor dem Agenten, übersetzt A2A-Anfragen in Aufrufe der Agent API und leitet eine Agent Card ab. Agentforce ist als verfügbar gelistet, mit Streaming und Human-in-the-Loop. In der [Pressemitteilung zu Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) hatte Salesforce die A2A-Unterstützung von MuleSoft für Juli 2025 als allgemein verfügbar angekündigt.
- **Natives A2A in Agentforce: angekündigt.** Laut [Dreamforce-2026-Rückblick](https://www.salesforce.com/blog/dreamforce-2026-announcements/) kann Agentforce "act as a specialized subagent in any A2A-compliant architecture" und Agenten von AWS, Azure und Google orchestrieren. Der Abschnitt nennt keinen Status, und eine Salesforce-Dokumentation für einen nativen A2A-Endpunkt habe ich nicht gefunden.
- **SAP Joule: nur eingehend.** SAPs [Referenzarchitektur für eingehendes A2A](https://architecture.learning.sap.com/docs/ref-arch/fe0d1d), aktualisiert am 26. Oktober 2026, stellt Joule-Agenten über das Agent Gateway mit A2A 0.3.0 für Clients anderer Hersteller bereit, das Vertrauen läuft über SAP Cloud Identity Services. Laut Hinweis sind einige Komponenten noch nicht GA, und die bidirektionale Kommunikation mit Agenten anderer Hersteller über das Agent Gateway "is not yet supported".
- **Microsoft Copilot Studio: Client-Seite dokumentiert.** Die Copilot-Studio-Seite kennzeichnet die A2A-Funktion weder als Preview noch als GA. Auf der Bridge-Liste von MuleSoft steht Copilot Studio als Quellagent auf "geplant", ein Copilot-Agent lässt sich über MuleSoft also noch nicht per A2A erreichbar machen.

Die Grenzen der A2A Bridge entscheiden, welche Aufgaben passen.

```hinweis achtung
Für Agentforce unterstützt die A2A Bridge keine asynchronen Tasks, Aufgaben über dem Gateway-Timeout schlagen fehl. Es gibt keine Push-Benachrichtigungen und kein Task-Abonnement, und der Task-Status liegt im Gateway-Speicher und geht bei einem Neustart verloren. Die [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html) dahinter hat ein Timeout von 120 Sekunden und unterstützt keine Agenten vom Typ "Agentforce (Default)".
```

Herstellerübergreifendes A2A passt heute also zu einer Frage, die in Sekunden beantwortet ist. Eine Garantieprüfung, die tagelang auf den Bericht des Technikers wartet, passt nicht.

## Welcher Agent sollte das Gespräch mit Händlern und Servicekunden führen?

Das Gespräch führt der Agent des Systems, in dem sich die Person anmeldet und in dem das Ergebnis festgehalten wird. Diese Fragen entscheiden es:

1. **Wer kennt die Person?** Ein Händler im Experience-Cloud-Portal ist ein Kontakt an einem Account mit der SAP-Auftraggebernummer. Jede Sichtbarkeitsregel beginnt dort.
2. **Wo liegt das Ergebnis?** Fälle, Garantieanträge und Arbeitsaufträge liegen in Salesforce, also schreibt der führende Agent das Ergebnis dorthin.
3. **Welcher Kanal?** Portal-Chat, Service-Hotline und E-Mail-to-Case sind Salesforce-Kanäle. Teams gehört zu Microsoft.
4. **Wer übernimmt vom Agenten?** Die Eskalations-Queue des Serviceteams läuft in Salesforce Omni-Channel.

Für einen Maschinenbauer ergibt das eine klare Aufteilung. Händler und Servicekunden sprechen mit Agentforce, SAP-Daten kommen über eine API-Aktion, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/) beschrieben. Vertriebsmitarbeitende, die in Teams und Outlook arbeiten, können Copilot als Eingangstür haben, mit einem Agentforce-Agenten dahinter für CRM-Fragen. Wer im Kreditmanagement oder in der Fakturierung in SAP arbeitet, bekommt Joule.

```ablauf
sf: Portal-Agent, Agentforce-Spezialist
erp: SAP S/4HANA
ext: Händler, Copilot in Teams, MuleSoft A2A Bridge
Händler --Portal-Chat--> Portal-Agent
Portal-Agent --API-Aktion--> SAP S/4HANA
Copilot in Teams --A2A--> MuleSoft A2A Bridge
MuleSoft A2A Bridge --Agent API--> Agentforce-Spezialist
```

Ich würde das pro Zielgruppe schriftlich festlegen, so wie jedes Objekt genau einen Owner hat. Den Ausschlag sollte nie geben, welcher Hersteller an dem Tag die beste Demo gezeigt hat.

## Ein zweiter Agent lohnt sich nur, wenn er eigene Logik besitzt

Eine Datenabfrage mit genau einer richtigen Antwort gehört in eine API oder ein MCP-Tool. Fragt ein Agent einen anderen nach dem Auftragsstatus, ist das ein API-Aufruf mit zwei Sprachmodellen dazwischen, und beide können die Frage falsch verstehen. Delegieren Sie an einen anderen Agenten nur, wenn er Urteil und Regeln besitzt, die Sie nicht nachbauen wollen, etwa einen SAP-seitigen Prozess, der bereits mit SAPs eigenen Prüfungen läuft.

Vor dem Go-live wirft jeder Sprung vier Fragen auf:

- **Als wer läuft der Spezialist?** Die A2A Bridge meldet sich mit Client-ID und Secret an der Salesforce-Org an. Im dokumentierten [Client-Credentials-Setup](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html) mit `bypassUser` auf true nutzt die API den Benutzer, der dem Agenten zugeordnet ist, nicht die Person, die in Teams gefragt hat. Dessen Freigaben bestimmen, was der Spezialist lesen darf. Sperren gehören auf der empfangenden Seite in Code, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).
- **Wie lange darf es dauern?** Höchstens 120 Sekunden, sonst bricht der Aufruf ab.
- **Wer zahlt?** Laut Salesforce zählt die Nutzung der Agent API zum Credit-Verbrauch, und die aufrufende Plattform rechnet ihre eigene Nutzung ab. Eine Händlerfrage läuft dann über zwei Zähler.
- **Wo liegt die Spur?** Ein Fehler über zwei Hersteller bedeutet zwei Logs und zwei Supportverträge. Herstellerübergreifende Fälle gehören in die Testfälle aus [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

## Rechenbeispiel: Händlerportal, Teams und ein Joule-Agent

Nehmen wir einen Maschinenbauer mit 250 Händlern, SAP S/4HANA, Microsoft 365 und einem Agentforce-Agenten im Händlerportal, der Garantie- und Auftragsfragen beantwortet. Alle Zahlen sind Annahmen. In einem Quartal kommen drei Anfragen bei der IT an.

**Der Vertrieb will den Händleragenten in Teams.** Gebietsverkaufsleiter fragen etwa, wie viele Garantieanträge ein Händler offen hat. Ein Copilot-Studio-Agent ruft einen Agentforce-Spezialisten über die MuleSoft A2A Bridge auf. Die Antwort kommt in Sekunden, das passt zu den synchronen Grenzen. Vorher prüfen: Die Bridge akzeptiert JWT, Basic Authentication oder Client-ID-Prüfung, Copilot Studio bietet API-Schlüssel oder OAuth 2.0, beide Seiten brauchen also ein gemeinsames Verfahren. Weil der Spezialist als Agentenbenutzer läuft, würde ich ihn auf lesende Fragen beschränken, die jeder Vertriebsmitarbeitende ohnehin sehen darf, und Antragsdetails in Salesforce lassen.

**Das SAP-Team schlägt einen Joule-Agenten für Kreditprüfungen vor.** Der Portalagent soll Joule fragen, ob ein Händler trotz Kreditsperre bestellen darf. Das würde ich ablehnen. Eine Kreditsperre ist in SAP ein Ja oder Nein, eine API liefert es deterministisch, und der bidirektionale Weg über Joule ist noch nicht unterstützt.

**Der Service will einen Agenten für die Garantieprüfung.** Die Prüfung wartet zwei bis fünf Tage auf den Bericht des Technikers im Außendienst. Ohne asynchrone Tasks für Agentforce in der Bridge und mit 120 Sekunden Timeout bleibt das ein Salesforce-Prozess mit Fall, Arbeitsauftrag und Freigabe statt einer A2A-Aufgabe.

Eine von drei Anfragen läuft über A2A. Für ein erstes Jahr halte ich dieses Verhältnis für gesund.

## Pro Zielgruppe einen führenden Agenten festlegen

1. **Legen Sie pro Zielgruppe einen führenden Agenten fest**, samt Kanal: Händler, Servicekunden, Vertrieb, Backoffice.
2. **Listen Sie die Fragen auf, die Systemgrenzen überschreiten**, und markieren Sie jede als Datenabfrage (API oder MCP) oder delegiertes Urteil (Agent).
3. **Nutzen Sie zuerst die Multi-Agent-Orchestrierung innerhalb der Org.** Sie ist GA und hält Identität, Logs und Abrechnung an einem Ort.
4. **Prüfen Sie Identität, Timeout, Kosten und Logging** für jeden herstellerübergreifenden Sprung, bevor Sie ihn bauen.
5. **Pilotieren Sie einen lesenden A2A-Sprung**, wenn MuleSoft bei Ihnen schon läuft, und lassen Sie sich von SAP und Microsoft den GA-Status ihrer Seite schriftlich bestätigen.

Für den ersten Punkt reicht eine Tabelle mit Zielgruppe, Kanal, führendem Agenten und den Systemen, die er abfragt. Welches Integrationsmuster zu welchem System passt, gehört zu [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/), und das Masterclass-Kapitel [MCP und Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/) ordnet die Protokolle ein.
