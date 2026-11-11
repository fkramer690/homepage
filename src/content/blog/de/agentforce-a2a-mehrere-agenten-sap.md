---
title: "Agentforce A2A: Welcher Agent führt das Händlergespräch?"
description: "Agentforce, SAP Joule und Copilot Studio bringen eigene Agenten. Welcher führt das Gespräch mit Händlern, und was leistet Agent-to-Agent (A2A) im November 2026?"
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-a2a-mehrere-agenten-sap
translationKey: agentforce-a2a-multi-agent
topic: ai
categories: [architecture, ai]
tags: [Agentforce, A2A, Multi-Agent, MuleSoft, SAP, Architektur]
takeaways:
  - "Im Normalfall führt das Gespräch der Agent des Systems, in dem sich die Person anmeldet; für Händler im Salesforce-Portal ist das Agentforce."
  - "Innerhalb einer Org ist Multi-Agent-Orchestrierung seit Winter '27 GA, zwischen Anbietern ist die MuleSoft A2A Bridge der dokumentierte Weg."
  - "Die A2A Bridge unterstützt für Agentforce keine asynchronen Tasks, und die Agent API bricht nach 120 Sekunden ab."
  - "Joule kann externe Agenten aufrufen, und SAP stellt Joule-Agenten per A2A 0.3.0 bereit; bidirektional über das Agent Gateway ist das noch nicht möglich."
  - "Datenabfragen mit einer richtigen Antwort sollten über eine API oder ein MCP-Tool beantwortet werden und nicht durch einen zweiten Agenten."
faq:
  - q: "Was ist A2A (Agent2Agent)?"
    a: "A2A ist ein offenes Protokoll, über das sich Agenten verschiedener Anbieter per Agent Card finden, Aufgaben übergeben und Ergebnisse zurückgeben. MCP verbindet einen Agenten mit Werkzeugen und Daten, A2A verbindet ihn mit einem anderen Agenten, der selbst schlussfolgert."
  - q: "Unterstützt Agentforce A2A nativ?"
    a: "Salesforce hat auf der Dreamforce 2026 erklärt, Agentforce könne als spezialisierter Subagent in jeder A2A-konformen Architektur arbeiten, ohne einen Status zu nennen. Dokumentiert ist heute die MuleSoft A2A Bridge, die A2A-Anfragen in Aufrufe der Agent API übersetzt."
  - q: "Kann Microsoft Copilot Studio einen Agentforce-Agenten aufrufen?"
    a: "Copilot Studio kann einen externen Agenten per A2A einbinden und Aufgaben an ihn delegieren. Ein Agentforce-Agent wird über die MuleSoft A2A Bridge per A2A erreichbar; dort ist Agentforce als verfügbar gelistet. Prüfen Sie A2A-Version und Authentifizierung beider Seiten im Pilot. Microsoft kennzeichnet die A2A-Funktion weder als Preview noch als GA. Testen Sie sie daher zuerst in einer Sandbox."
  - q: "Kann Agentforce mit SAP-Joule-Agenten sprechen?"
    a: "SAP dokumentiert, wie externe A2A-Clients Joule-Agenten über das Agent Gateway aufrufen und wie Joule externe Agenten aufruft; einige Komponenten sind laut Referenzarchitektur vom 26. Oktober 2026 noch nicht GA. Einen dokumentierten nativen A2A-Client in Agentforce habe ich nicht gefunden. Für Auftrags- oder Kreditdaten ist eine API-Aktion an SAP einfacher und berechenbarer."
  - q: "Sollte ein Händler mit mehreren Agenten sprechen?"
    a: "In der Regel nicht. Im Normalfall erhält jede Zielgruppe einen Agenten, der das Gespräch führt und die nötigen Informationen aus anderen Systemen abruft. Mehrere Eingangstüren verwirren Händler, und lange Agentenketten vervielfachen Wartezeit, Kosten und Fehlerquellen."
draft: false
---

Agentforce A2A, also Agent-to-Agent-Aufrufe zwischen Anbietern, ist inzwischen konkret genug, um die Architekturfrage auf die Zuständigkeit zu verlagern: Welcher Agent führt das Gespräch mit Händlern und Servicekunden? Meine Antwort: der Agent des Systems, in dem sich die Person anmeldet und in dem der Vorgang liegt. Händler im Salesforce-Portal sprechen mit Agentforce, das über APIs auf SAP zugreift. Innerhalb einer Org ist Multi-Agent-Orchestrierung seit Winter '27 allgemein verfügbar. Anbieterübergreifend funktioniert die MuleSoft A2A Bridge, mit klaren Grenzen: nur synchron, keine Push-Benachrichtigungen, Task-Status im Gateway-Speicher. Natives A2A in Agentforce wurde auf der Dreamforce 2026 angekündigt, jedoch ohne Angabe zum Status.

## Warum bringt jeder Hersteller jetzt einen eigenen Agenten?

Ein Maschinenbauer mit Salesforce, SAP und Microsoft 365 erhält drei Agentenangebote gleichzeitig. Salesforce verkauft Agentforce für Service, Händlerportal und Vertrieb. SAPs KI-Chef beschrieb Joule in einem [Beitrag vom April 2025](https://news.sap.com/?p=233102) als "agent orchestrator working across enterprise workflows" und nennt SAP dort einen der Gründungsunterstützer des A2A-Protokolls. Microsoft dokumentiert, wie ein Agent in Copilot Studio [einen anderen Agenten per A2A einbindet](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent) und Aufgaben an ihn delegiert, statt nur APIs aufzurufen. Jeder Anbieter rückt seinen eigenen Agenten in den Mittelpunkt.

Die Frage eines Händlers folgt diesen Grenzen jedoch nicht. "Ist der Dichtungssatz für Maschine 4711 lieferbar, und ist mein Garantieantrag für diese Maschine freigegeben?" berührt die Verfügbarkeit in SAP sowie den Garantieantrag und das Asset in Salesforce. Will jeder Systemagent selbst antworten, steht der Händler vor drei Eingangstüren oder vor einer Kette von Agenten, die sich gegenseitig fragen. Beides ist schlechter als ein Agent, der das Gespräch führt und die nötigen Informationen selbst abruft.

A2A (Agent2Agent) ist ein offenes Protokoll, über das sich Agenten verschiedener Anbieter über eine "Agent Card" finden, Aufgaben übergeben und Ergebnisse zurückgeben. Der Unterschied zu MCP ist für den Entwurf wichtig: MCP verbindet einen Agenten mit Werkzeugen und Daten, A2A mit einem anderen Agenten, der selbst schlussfolgert. Was MCP für die IT bedeutet, steht in [MCP und Salesforce für die IT-Leitung erklärt](../mcp-salesforce-erklaert-it-leitung/).

## Was leistet Agent-to-Agent-Interoperabilität heute?

Stand 9. November 2026 unterscheidet sich der Status je nach Weg. Ich würde nur mit dem dokumentierten planen:

- **Innerhalb einer Salesforce-Org: allgemein verfügbar, abhängig von Edition und Add-ons.** Der [Entwicklerleitfaden zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) schreibt "Multi-Agent Orchestration is generally available". Ein Orchestrator-Agent übergibt an Spezialisten in derselben Org, die in Agent Script als `connected_subagent` deklariert sind.
- **Agentforce als A2A-Server über MuleSoft: verfügbar, mit Grenzen.** Die [A2A Bridge](https://docs.mulesoft.com/general/exp-services-create-a2a-bridge) läuft als Policy-Kette auf einem Omni Gateway vor dem Agenten, übersetzt A2A-Anfragen in Aufrufe der Agent API und leitet eine Agent Card ab. Agentforce ist mit Streaming als verfügbar gelistet; Human-in-the-Loop ist eingeschränkt, weil manche Agententypen eine Aufgabe nicht für weitere Eingaben anhalten können. Die Bridge erzeugt eine A2A-v1-Agent-Card. In der [Pressemitteilung zu Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) hatte Salesforce die A2A-Unterstützung von MuleSoft für Juli 2025 als allgemein verfügbar angekündigt.
- **Natives A2A in Agentforce: angekündigt.** Laut [Dreamforce-2026-Rückblick](https://www.salesforce.com/blog/dreamforce-2026-announcements/) kann Agentforce "act as a specialized subagent in any A2A-compliant architecture" und Agenten von AWS, Azure, Google und weiteren Anbietern orchestrieren. Der Abschnitt nennt keinen Status, und eine Salesforce-Dokumentation für einen nativen A2A-Endpunkt habe ich nicht gefunden.
- **SAP Joule: beide Richtungen dokumentiert, bidirektional noch nicht.** Mit Bring Your Own Agent schreibt SAPs [A2A-Referenzarchitektur](https://architecture.learning.sap.com/docs/ref-arch/76ec36), "Joule can call external agents developed using third-party frameworks". Für die Gegenrichtung stellt SAPs [Referenzarchitektur für eingehendes A2A](https://architecture.learning.sap.com/docs/ref-arch/fe0d1d), aktualisiert am 26. Oktober 2026, Joule-Agenten über das Agent Gateway mit A2A 0.3.0 für Clients anderer Anbieter bereit, die Vertrauensstellung wird über SAP Cloud Identity Services hergestellt. Laut Hinweis sind einige Komponenten noch nicht GA, und bidirektionale Kommunikation mit Agenten anderer Anbieter über das Agent Gateway "is not yet supported".
- **Microsoft Copilot Studio: beide Seiten möglich.** Die Copilot-Studio-Seite kennzeichnet die A2A-Funktion weder als Preview noch als GA. Auf der Bridge-Liste von MuleSoft steht Copilot Studio als Quellagent inzwischen auf "verfügbar", über die Direct Line API; ein Copilot-Studio-Agent lässt sich über MuleSoft also per A2A erreichbar machen. Agenten von Microsoft 365 Copilot unterstützt die Bridge nicht.

Noch eine Prüfung: SAPs Agent Gateway spricht A2A 0.3.0, die MuleSoft-Bridge erzeugt A2A-v1-Agent-Cards, und Version 1.0 enthält inkompatible Änderungen gegenüber 0.3. "A2A-konform" bedeutet nicht Plug and Play; Protokollversion, Transport, Authentifizierung und Task-Status müssen im Interoperabilitätstest geprüft werden.

Die Grenzen der A2A Bridge entscheiden, welche Aufgaben passen.

```hinweis achtung
Für Agentforce unterstützt die A2A Bridge keine asynchronen Tasks. Aufgaben, die den Gateway-Timeout überschreiten, schlagen deshalb fehl. Es gibt keine Push-Benachrichtigungen und kein Task-Abonnement, und der Task-Status liegt im Gateway-Speicher und geht bei einem Neustart verloren. Die [Agent API](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html) dahinter hat ein Timeout von 120 Sekunden und unterstützt keine Agenten vom Typ "Agentforce (Default)".
```

Anbieterübergreifendes A2A passt heute also zu einer Frage, die in Sekunden beantwortet ist. Eine Garantieprüfung, bei der tagelang auf den Bericht des Technikers gewartet wird, passt nicht.

## Welcher Agent sollte das Gespräch mit Händlern und Servicekunden führen?

Im Normalfall führt das Gespräch der Agent des Systems, in dem sich die Person anmeldet und in dem das Ergebnis festgehalten wird. Wenn Anmeldung und Ergebnis in verschiedenen Systemen liegen, ist entscheidend, wer Dialogzustand, Berechtigung, Übergabe an Menschen und Audit verantwortet. Diese Fragen helfen:

1. **Wer kennt die Person?** Ein Händler im Experience-Cloud-Portal ist ein Kontakt an einem Account mit der SAP-Auftraggebernummer. Jede Sichtbarkeitsregel beginnt dort.
2. **Wo liegt das Ergebnis?** In diesem Beispiel liegen Fälle, Garantieanträge und Arbeitsaufträge in Salesforce, also schreibt der führende Agent das Ergebnis dorthin.
3. **Welcher Kanal?** Hier werden Portal-Chat, Service-Hotline und E-Mail-to-Case über Salesforce abgewickelt. Teams gehört zu Microsoft.
4. **Wer übernimmt vom Agenten?** In diesem Beispiel liegt die Eskalations-Queue des Serviceteams in Salesforce Omni-Channel.

Für einen Maschinenbauer ergibt das eine klare Aufteilung. Händler und Servicekunden sprechen mit Agentforce, SAP-Daten werden über eine API-Aktion abgerufen, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/) beschrieben. Vertriebsmitarbeitende, die in Teams und Outlook arbeiten, können Copilot als Eingangstür nutzen, mit einem Agentforce-Agenten im Hintergrund für CRM-Fragen. Wer im Kreditmanagement oder in der Fakturierung in SAP arbeitet, nutzt Joule.

```ablauf
sf: Portal-Agent, Agentforce-Spezialist
erp: SAP S/4HANA
ext: Händler, Copilot in Teams, MuleSoft A2A Bridge
Händler --Portal-Chat--> Portal-Agent
Portal-Agent --API-Aktion--> SAP S/4HANA
Copilot in Teams --A2A--> MuleSoft A2A Bridge
MuleSoft A2A Bridge --Agent API--> Agentforce-Spezialist
```

Ich würde das pro Zielgruppe schriftlich festlegen, so wie jedes Objekt genau einen Owner hat. Den Ausschlag sollte nie geben, welcher Anbieter an dem Tag die beste Demo gezeigt hat.

## Ein zweiter Agent lohnt sich nur an einer echten Grenze

Eine Datenabfrage mit genau einer richtigen Antwort sollte über eine API oder ein MCP-Tool beantwortet werden. Fragt ein Agent einen anderen nach dem Auftragsstatus, entsteht eine zusätzliche Ebene für Orchestrierung, Berechtigungen, Fehlerbehandlung und Nachverfolgung, je nach Umsetzung auch ein zweites Modell, das die Frage falsch verstehen kann. Delegieren Sie an einen anderen Agenten, wenn es eine echte Grenze gibt: Der andere Agent verantwortet Entscheidungen und Regeln, die Sie nicht nachbauen wollen, etwa einen SAP-seitigen Prozess, der bereits SAPs eigene Prüfungen nutzt, oder er gehört einem anderen Team mit eigener Sicherheit, eigenen Releases und eigener Governance.

Vor dem Go-live wirft jeder Übergang zwischen Agenten vier Fragen auf:

- **Als wer läuft der Spezialist?** Die A2A Bridge meldet sich mit Client-ID und Secret an der Salesforce-Org an. Im dokumentierten [Client-Credentials-Setup](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html) mit `bypassUser` auf true nutzt die API den Benutzer, der dem Agenten zugeordnet ist, nicht die Person, die in Teams die Anfrage gestellt hat. Dessen Freigaben bestimmen, was der Spezialist lesen darf. Die Bridge authentifiziert den technischen Client, nicht die Person, also ordnen Sie die externe Identität ausdrücklich zu, prüfen Sie je Anfrage, welche Händler oder Accounts die anfragende Person sehen darf, geben Sie dem Agentenbenutzer nur die nötigen Rechte und protokollieren Sie, wer die Anfrage ausgelöst hat. Zugriffsprüfungen gehören auf der empfangenden Seite in Code, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).
- **Wie lange darf es dauern?** Die Agent API erlaubt höchstens 120 Sekunden; ein niedrigerer Gateway-Timeout in der Bridge greift früher.
- **Wer zahlt?** Laut Salesforce zählt die Nutzung der Agent API zum Credit-Verbrauch, und die aufrufende Plattform kann je nach Lizenzmodell ihre eigene Nutzung abrechnen. Eine Händlerfrage kann dann auf zwei Zählern Kosten verursachen; prüfen Sie beide Abrechnungsmodelle vor dem Entwurf.
- **Wo liegt die Spur?** Ein Fehler über zwei Anbieter hinweg bedeutet zwei Logs und zwei Supportverträge. Anbieterübergreifende Fälle gehören in die Testfälle aus [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

## Praxisbeispiel: Händlerportal, Teams und ein Joule-Agent

Nehmen wir einen Maschinenbauer mit 250 Händlern, SAP S/4HANA, Microsoft 365 und einem Agentforce-Agenten im Händlerportal, der Garantie- und Auftragsfragen beantwortet. Alle Zahlen sind Annahmen. In einem Quartal gehen bei der IT drei Anfragen ein.

**Der Vertrieb will Händlerinformationen in Teams.** Das ist eine eigene Zielgruppe: Gebietsverkaufsleiter fragen etwa, wie viele Garantieanträge ein Händler offen hat. Ein Copilot-Studio-Agent ruft einen Agentforce-Spezialisten über die MuleSoft A2A Bridge auf. Die Antwort liegt in Sekunden vor, das passt zu den synchronen Grenzen. Vorher prüfen: Die Bridge akzeptiert JWT, Basic Authentication oder Client-ID-Prüfung, Copilot Studio bietet API-Schlüssel oder OAuth 2.0. Die Begriffe passen nicht eins zu eins, die funktionierende Kombination muss der Pilot belegen. Weil der Spezialist unter dem Agentenbenutzer ausgeführt wird, würde ich ihn auf Anfragen mit reinem Lesezugriff beschränken, je Anfrage prüfen, für welche Händler der fragende Gebietsleiter zuständig ist, und Antragsdetails in Salesforce lassen.

**Das SAP-Team schlägt einen Joule-Agenten für Kreditprüfungen vor.** Der Portalagent soll Joule fragen, ob ein Händler trotz Kreditsperre bestellen darf. Das würde ich ablehnen. Eine Kreditsperre hat in SAP den Wert Ja oder Nein, eine API liefert ihn deterministisch, und der bidirektionale Weg über das Agent Gateway ist noch nicht unterstützt.

**Der Service will einen Agenten für die Garantieprüfung.** Die Prüfung wartet zwei bis fünf Tage auf den Bericht des Technikers im Außendienst. Ohne asynchrone Tasks für Agentforce in der Bridge und mit einem Timeout von 120 Sekunden bleibt das ein Salesforce-Prozess mit Fall, Arbeitsauftrag und Freigabe statt einer A2A-Aufgabe.

Eine von drei Anfragen wird über A2A umgesetzt. Für ein erstes Jahr halte ich dieses Verhältnis für gesund.

## Pro Zielgruppe einen führenden Agenten festlegen

1. **Legen Sie pro Zielgruppe einen führenden Agenten fest**, samt Kanal: Händler, Servicekunden, Vertrieb, Backoffice.
2. **Listen Sie die Fragen auf, die Systemgrenzen überschreiten**, und markieren Sie jede als Datenabfrage (API oder MCP) oder delegiertes Urteil (Agent).
3. **Nutzen Sie zuerst die Multi-Agent-Orchestrierung innerhalb der Org.** Sie ist GA, sofern Edition und Add-ons sie abdecken, und hält Identität, Logs und Abrechnung an einem Ort.
4. **Prüfen Sie Identität, Timeout, Kosten und Logging** für jeden anbieterübergreifenden Aufruf, bevor Sie ihn bauen.
5. **Erproben Sie einen A2A-Aufruf mit reinem Lesezugriff**, wenn MuleSoft bei Ihnen bereits im Einsatz ist, und lassen Sie sich von SAP und Microsoft den GA-Status ihrer Seite schriftlich bestätigen.

Für den ersten Punkt reicht eine Tabelle mit Zielgruppe, Kanal, führendem Agenten und den Systemen, die er abfragt. Welches Integrationsmuster zu welchem System passt, gehört zu [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/), und das Masterclass-Kapitel [MCP und Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/) ordnet die Protokolle ein.
