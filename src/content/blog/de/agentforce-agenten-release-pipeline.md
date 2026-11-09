---
title: "Agentforce-Agenten in der Release-Pipeline: Wer gibt frei?"
description: "Wie ein Agentforce-Agent von der Sandbox in Produktion kommt: Agent Script in Git, Validieren, Publish, Version deployen, Aktivieren, Rollback und wer freigibt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-agenten-release-pipeline
translationKey: agentforce-agents-release-pipeline
topic: release
categories: [devops, ai]
tags: [Agentforce, Release-Management, DevOps, Agent Script, Partnersteuerung, Maschinenbau]
takeaways:
  - "Die Agent-Script-Datei liegt in einem Authoring Bundle in Git und läuft wie ein Flow durch Pull Request, Validierung und gezieltes Deployment."
  - "Seit API v68 wird in der Quell-Org veröffentlicht und die festgeschriebene Version deployt. Pro Agent kann höchstens eine Version aktiv sein."
  - "Festgeschriebene Versionen lassen sich nicht bearbeiten. Ein Schnellfix im Builder der Produktion lässt die Orgs auseinanderlaufen und blockiert Deployments."
  - "Es gibt kein atomares Rollback. Am schnellsten ist es, die vorherige Version zu aktivieren; Flows und Apex brauchen ein eigenes Revert."
  - "Der Partner baut und testet, der Release Manager des Kunden deployt und aktiviert, der Fachverantwortliche gibt die Aktivierung frei."
faq:
  - q: "Lässt sich ein Agentforce-Agent wie andere Salesforce-Metadaten deployen?"
    a: "Ja. Agent Script liegt im Metadatentyp AiAuthoringBundle. Seit API v68 beschreibt Salesforce, dass das Bundle in der Quell-Org veröffentlicht, die festgeschriebene Version abgerufen und mit der Salesforce CLI in die Ziel-Org deployt wird. Dort wird sie getestet und aktiviert."
  - q: "Was passiert beim Publish eines Agentforce-Agenten?"
    a: "Salesforce prüft, ob das Agent Script kompiliert, und legt dann einen neuen Agenten oder eine neue, festgeschriebene Version mit ihren Laufzeit-Metadaten an. Die Version lässt sich später aktivieren. Anwender sehen sie erst nach der Aktivierung."
  - q: "Wie macht man ein Rollback eines Agentforce-Agenten?"
    a: "Aktivieren Sie die vorherige Version. Nur eine Version kann aktiv sein und sf agent activate nimmt jede Versionsnummer an. Geänderte Flows oder Apex werden dadurch nicht zurückgedreht und brauchen ein eigenes Revert über die Pipeline. Es gibt kein atomares Rollback eines ganzen Releases."
  - q: "Wer sollte einen Agentforce-Agenten in Produktion aktivieren?"
    a: "Der Kunde. Ich empfehle, dass der Release Manager des Kunden über die Pipeline aktiviert, nachdem der Fachverantwortliche, etwa die Serviceleitung, die Testergebnisse freigegeben hat. Der Partner baut und testet in Sandboxes."
  - q: "Darf man einen Agenten direkt in Produktion im Agentforce Builder ändern?"
    a: "Nur indem man dort eine neue Version anlegt, und dann passen Quell- und Ziel-Org nicht mehr zusammen. Laut Salesforce blockieren abweichende Agenten weitere Deployments, eine Änderung in Produktion muss deshalb sofort in der Quell-Org nachgebaut werden."
draft: false
---

Ein Agentforce-Agent gehört in die Release-Pipeline wie alle anderen Metadaten. Seine Agent-Script-Datei liegt in einem Authoring Bundle in Git, läuft durch einen Pull Request und wird validiert; seit API v68 wird die Version einmal in der Quell-Org veröffentlicht und diese festgeschriebene Version in die nächste Org deployt. Die Aktivierung bleibt ein separater Schritt. Pro Agent kann höchstens eine Version aktiv sein. Für einen Hersteller, dessen Umsetzungspartner den Agenten baut, ist meine Antwort auf die Frage, wer den Release durchführt, kurz: Der Partner baut und testet, der Kunde deployt und aktiviert, der verantwortliche Fachbereich gibt die Aktivierung frei, bei einem Serviceagenten für Händler die Serviceleitung.

## Woraus besteht ein Agentforce-Agent im Repository?

Laut [Salesforce Developers Blog vom Mai 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) wird ein Agent in einer einzigen .agent-Datei in Agent Script definiert, gespeichert im Metadatentyp AiAuthoringBundle. Bis API v67 entstehen beim Committen einer Version daraus die Laufzeit-Metadaten:

- **Bot und BotVersion:** der Agent und eine Version davon. Ein Agent kann viele Versionen haben, aber nur eine aktive, so die [Metadatenreferenz](https://developer.salesforce.com/docs/ai/agentforce/references/agents-metadata-tooling/agents-metadata.html).
- **GenAiPlannerBundle:** Subagenten, Anweisungen und Aktionen einer veröffentlichten Version.
- **Die Aktionen darunter:** Flows, Apex und Prompt Templates, normale Metadaten mit eigenem Lebenszyklus.

Für Entscheider heißt das: Die Logik, die festlegt, was ein Händler zu Garantie oder Ersatzteilen hört, ist jetzt eine Textdatei, die sich prüfen und zurückdrehen lässt. Das zählt, sobald Regeln wie die Garantieberechtigung in [Agent Script statt im LLM](../agent-script-regeln-statt-llm/) stehen.

Ein Detail ist jetzt wichtig. Die [Metadata-API-Referenz](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) führt Winter '27 als API 68.0, und der [Agentforce-DX-Leitfaden zum Umzug von Agenten zwischen Orgs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html) sagt, dass sich die Agenten-Metadaten mit v68 geändert haben: Beide Orgs müssen auf v68 sein, um Agenten mit den neuen Typen zu übertragen (AiAgentDefinition in den Beispiel-Manifesten). Mit v68 wird eine festgeschriebene Version im Manifest als Agent#n aufgeführt, aus der Quell-Org abgerufen und in die Ziel-Org deployt. Die oben beschriebenen Planner- und Versionsmetadaten gelten für v67 und früher. Die übrigen Änderungen dieses Releases stehen in [Winter '27: was sich für Ihre Pipeline ändert](../salesforce-winter-27-aenderungen-pipeline/).

## Wie läuft ein Agent durch die Release-Pipeline?

Der [Beitrag zum Agentic Development Lifecycle vom Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) beschreibt den Pro-Code-Weg; der v68-Leitfaden ergänzt, wie eine festgeschriebene Version zwischen Orgs übertragen wird. In einer Pipeline auf Kundenseite:

```schritte
Pull Request
  Der Partner committet die geänderte .agent-Datei und geänderte Flows oder Apex auf einem Feature-Branch; der Reviewer liest den Diff im Agent Script wie Code.
Validieren
  sf agent validate authoring-bundle prüft, ob das Agent Script kompiliert. Laut Salesforce ist die Validierung Pflicht vor dem Publish, sie gehört also als Gate in die Pipeline.
Publish in der Quell-Org
  sf agent publish authoring-bundle legt einen neuen Agenten oder eine neue festgeschriebene Version eines bestehenden Agenten an, so die [CLI-Referenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_publish_authoring-bundle.html). Laut ADLC-Beitrag kann man jetzt veröffentlichen und später aktivieren.
Gezielt deployen
  Zuerst geänderte Flows und Apex, rückwärtskompatibel zur aktiven Version, dann die festgeschriebene Agentenversion, ausdrücklich im Manifest benannt. Der Beitrag warnt, dass ein nacktes sf project deploy start alles Geänderte ausliefert, Agenten-Metadaten eingeschlossen.
Testen
  Die Testsuite läuft in der Sandbox gegen die deployte Version; welche Version ein Test verwendet, hängt vom Werkzeug ab, und einige CLI-Tests brauchen einen aktiven Agenten. Schwellen und Passraten behandle ich in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).
Aktivieren
  sf agent activate mit --api-name und --version schaltet die Version ein. Laut [Referenz zu activate](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_activate.html) ist der Agent damit sofort für die Anwender verfügbar.
```

```hinweis achtung
Mit --json und ohne --version aktiviert sf agent activate automatisch die neueste Version, so dieselbe Referenz. In einem unbeaufsichtigten Skript gebe ich die Versionsnummer deshalb immer mit, damit die Pipeline aktiviert, was der Fachverantwortliche freigegeben hat, und nicht das, was zuletzt veröffentlicht wurde.
```

Bis v67 nannte der Mai-Beitrag zwei Varianten: Publish in jeder Org oder Deployment des erzeugten GenAiPlannerBundle, wobei die Nummern des Planners nicht unbedingt mit denen des Bundles übereinstimmen. Mit v68 ist das Deployment der festgeschriebenen Version der dokumentierte Weg, und die Agenten in Quell- und Ziel-Org müssen übereinstimmen. Jede Release Note sollte für Audit und Betrieb weiterhin festhalten, welche Produktivversion zu welchem Git-Commit gehört.

```vertiefung Für Entwickler
titel: Drei Fallen beim Umzug eines Agenten in eine neue Org
Der v68-Leitfaden zum Umzug von Agenten nennt sie:
- Das erste Deployment in eine neue Org braucht die komplette Agentendefinition, nicht nur eine Version.
- Eigene Objekte und Felder, die der Agent verwendet, müssen ins Manifest aufgenommen werden.
- Der Agent User und seine Berechtigungen müssen in der Ziel-Org zugewiesen sein.
```

## Warum bricht ein Schnellfix im Builder der Produktion die Pipeline?

Derselbe Leitfaden nennt zwei Regeln: Ein festgeschriebener Agent lässt sich nicht bearbeiten, und die Agenten in Quell- und Ziel-Org müssen übereinstimmen, sonst werden weitere Deployments blockiert. Eine Änderung in Produktion bedeutet also eine neue Version in Produktion, und das nächste Deployment aus der Pipeline ist blockiert, bis jemand eine passende Version in der Quell-Org anlegt.

Meine Regel, festgelegt vor dem ersten Go-live: In Produktion hat niemand Rechte zum Deployen oder Aktivieren außer dem Pipeline-User, dem Release Manager und einer benannten Vertretung. Auch ein Hotfix wird in der Quell-Org gebaut und durch einen beschleunigten Pipeline-Lauf gebracht. Erzwingt eine Störung doch einmal eine Änderung in Produktion, ist das eine dokumentierte Break-Glass-Ausnahme, und noch am selben Tag wird eine passende neue Version in der Quell-Org angelegt.

## Wie macht man ein Rollback eines Agentforce-Agenten?

Salesforce bietet kein atomares Rollback eines ganzen Releases. Die Dokumentation nennt das Aktivieren einer früheren Version als Rückweg, der ADLC-Beitrag empfiehlt Git, um zu einer funktionierenden Version zurückkehren zu können, sf agent activate nimmt jede Versionsnummer an, und ein [Beitrag im Developers Blog vom Mai 2025](https://developer.salesforce.com/blogs/2025/05/deploy-your-agentforce-agents-with-zero-downtime-using-agent-versions) beschreibt den Versionswechsel als sofort und ohne Ausfallzeit. Nach meiner Lesart dieser Quellen ist der schnellste Rollback, die vorherige Versionsnummer wieder zu aktivieren: Minuten, kein Deployment.

Das hat eine Grenze, die jede Serviceleitung kennen sollte. Nach meiner Lesart des Metadatenmodells enthält die Agentenversion den Planner und Verweise auf Aktionen, während der Flow oder die Apex-Klasse hinter einer Aktion eigene Metadaten sind. Hat ein Release sowohl das Agent Script als auch einen Flow geändert, bringt die alte Version die alten Anweisungen zurück, aber mit dem neuen Flow. Der Flow braucht ein eigenes Revert, ein Grund mehr, Änderungen am Agenten und an Aktionen in getrennten Pull Requests zu halten.

Deaktivieren ist die Notbremse, und zwar eine harte. Laut [Agentforce-DX-Dokumentation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-manage.html) beendet das Deaktivieren offene Interaktionen und macht den Agenten für alle Verbindungen unerreichbar. Das Verhalten kann je nach Kanal abweichen, deshalb würde ich es im Händlerportal testen, bevor ich mich darauf verlasse, und vorher festlegen, wo Händler dann landen, etwa in einem Fallformular oder bei der Service-Hotline.

## Beispiel: Der Partner baut, der Kunde führt den Release durch

Nehmen wir einen Maschinenbauer mit Service Cloud, SAP, Händlerportal und einer Produktiv-Org. Ein Partner hat den Serviceagenten für Händleranfragen gebaut; ein internes Team aus vier Personen verantwortet Git und Pipeline, alle zwei Wochen gibt es ein Release. Alle Zahlen sind Annahmen.

Version 3 des Agenten beantwortet in Produktion Fragen zu Auftragsstatus und Garantie. Für Release 4 ergänzt der Partner einen Subagenten für Ersatzteile und erweitert den Auftragsstatus-Flow, damit er für ein abgelöstes Teil auch dessen Nachfolgeteil zurückgibt. Der Architekt des Kunden prüft zwei Pull Requests, einen für den Flow und einen für die .agent-Datei; die Pipeline validiert, veröffentlicht Version 4 in der Integrations-Sandbox, deployt sie in die UAT-Sandbox und lässt 60 Testfälle laufen, und die Serviceleitung gibt die Ergebnisse frei. Am Release-Tag wird dieselbe Version 4 inaktiv in Produktion deployt, und um 7 Uhr aktiviert die Pipeline sie mit der Versionsnummer aus der freigegebenen Release Note.

Zwei Tage später empfiehlt der Ersatzteil-Subagent für eine Produktlinie das falsche Nachfolgeteil. Der Release Manager aktiviert innerhalb von 15 Minuten wieder Version 3; Auftragsstatus und Garantieauskünfte laufen weiter. Auch Version 3 ruft den erweiterten Flow auf, aber das zusätzliche Feld schadet nicht, also bleibt der Flow, und die Korrektur kommt als Version 5 über den normalen Weg. Produktionsrechte hat der Partner dabei nie gebraucht.

## Der Kunde führt den Release durch, auch in einer gemeinsam genutzten Org

Auf Kundenseite sind die Rollen klar abgegrenzt:

- **Partner:** baut in Scratch Orgs oder Sandboxes, schreibt Tests, eröffnet Pull Requests. Der ADLC-Beitrag rät, dem Agenten beim Bauen nie Zugriff auf die Produktion zu geben; ich dehne das auf die Build-User des Partners aus.
- **Architekt des Kunden:** prüft Agent Script und Aktionen, vor allem Regeln zu Garantie, Rabatten und Kreditlimits.
- **Release Manager des Kunden:** verantwortet die Pipeline, steuert das Deployment und aktiviert in Produktion, mit einem technischen Pipeline-User für das Deployment selbst.
- **Fachverantwortlicher, etwa die Serviceleitung:** gibt die Aktivierung auf Basis der Testergebnisse frei und entscheidet mit dem Release Manager über ein Rollback, ohne technische Aktivierungsrechte.

Jeder Agent bekommt in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/) genau einen Owner, damit nie zwei Partner Versionen desselben Agenten bauen. Pipeline und Repository gehören dem Kunden, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) begründet; sie aufzusetzen ist Teil meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

Unternehmensgruppen mit einer Produktiv-Org je Tochtergesellschaft stehen vor einer Lücke. Die [Referenz der agent-Befehle](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm) nennt eine Agentenvorlage für Second-Generation Managed Packages, was eher zu ISVs passt als zu einer Unternehmensgruppe mit eigenen Orgs. Ich würde jede Org als eigenes Release-Ziel behandeln: dieselbe Quellversion, aber eigene Tests, eigener Agent User, eigene Berechtigungen, eigene Aktivierung und eigenes Versionsprotokoll.

## Die .agent-Dateien ins Repository des Kunden legen

1. Legen Sie die .agent-Datei jedes Agenten ins Repository des Kunden und bauen Sie Agenten nicht mehr direkt in geteilten Orgs.
2. Nehmen Sie sf agent validate authoring-bundle und gezielte Deployments in die Pipeline auf.
3. Entziehen Sie in Produktion allen außer dem Pipeline-User, dem Release Manager und einer Vertretung die Rechte zum Deployen und Aktivieren.
4. Führen Sie ein Versionsprotokoll pro Org: Git-Commit, Versionsnummer, Datum, Freigabe.
5. Schreiben Sie ein Rollback-Runbook: welche Version wieder aktiviert wird, welche Flows zurückgedreht werden, wohin Händler gehen, wenn der Agent aus ist.
6. Prüfen Sie, ob die Salesforce CLI aktuell ist und das Projekt und die Manifeste API 68.0 mit den neuen Agenten-Metadatentypen verwenden.
