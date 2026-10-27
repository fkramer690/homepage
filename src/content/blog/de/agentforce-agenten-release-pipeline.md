---
title: "Agentforce-Agenten in der Release-Pipeline: wer gibt frei?"
description: "Wie ein Agentforce-Agent von der Sandbox in Produktion kommt: Agent Script in Git, Validieren, Publish, Aktivieren, Rollback und wer in einer geteilten Org freigibt."
pubDate: 2026-10-27
lang: de
slug: agentforce-agenten-release-pipeline
translationKey: agentforce-agents-release-pipeline
topic: release
categories: [devops, ai]
tags: [Agentforce, Release-Management, DevOps, Agent Script, Partnersteuerung, Maschinenbau]
takeaways:
  - "Ein Agentforce-Agent ist Metadaten: Seine Agent-Script-Datei liegt in einem Authoring Bundle in Git und läuft wie ein Flow durch Pull Request, Validierung und gezieltes Deployment."
  - "Publish erzeugt eine neue Agentenversion im Status inaktiv; das Aktivieren ist ein eigener Schritt, und pro Agent kann immer nur eine Version aktiv sein."
  - "Committete Versionen lassen sich nicht bearbeiten, und Salesforce blockiert weitere Deployments, wenn Quell- und Ziel-Org auseinanderlaufen. Ein Schnellfix im Builder der Produktion bricht die Pipeline."
  - "Salesforce beschreibt kein Rollback-Verfahren; nach meiner Lesart ist die alte Version wieder zu aktivieren der schnellste Weg, Flows und Apex hinter den Aktionen brauchen ein eigenes Revert."
  - "Der Partner baut und testet, der Release Manager des Kunden deployt, published und aktiviert, und der Fachverantwortliche gibt die Aktivierung in Produktion frei."
faq:
  - q: "Lässt sich ein Agentforce-Agent wie andere Salesforce-Metadaten deployen?"
    a: "Ja. Agent Script liegt im Metadatentyp AiAuthoringBundle und wird mit der Salesforce CLI deployt. Danach wird das Bundle in der Ziel-Org gepublished, was die Agentenversion erzeugt, und anschließend aktiviert."
  - q: "Was passiert beim Publish eines Agentforce-Agenten?"
    a: "Salesforce prüft, ob das Agent Script kompiliert, und legt dann einen neuen Agenten oder eine neue Version mit den Metadaten Bot, BotVersion und GenAi an. Die Version startet inaktiv, Anwender sehen sie erst nach der Aktivierung."
  - q: "Wie macht man ein Rollback eines Agentforce-Agenten?"
    a: "Salesforce veröffentlicht kein Rollback-Verfahren. Weil nur eine Version aktiv sein kann und sf agent activate jede Versionsnummer annimmt, würde ich die vorherige Version wieder aktivieren und geänderte Flows oder Apex getrennt über die Pipeline zurückdrehen."
  - q: "Wer sollte einen Agentforce-Agenten in Produktion aktivieren?"
    a: "Der Kunde. Ich empfehle, dass der Release Manager des Kunden über die Pipeline aktiviert, nachdem der Fachverantwortliche, etwa die Serviceleitung, die Testergebnisse freigegeben hat. Der Partner baut und testet in Sandboxes."
  - q: "Darf man einen Agenten direkt in Produktion im Agentforce Builder ändern?"
    a: "Nur indem man dort eine neue Version anlegt, und dann passen Quell- und Ziel-Org nicht mehr zusammen. Laut Salesforce blockieren abweichende Agenten weitere Deployments, eine Änderung in Produktion muss deshalb sofort in der Quell-Org nachgebaut werden."
draft: false
---

Ein Agentforce-Agent gehört in die Release-Pipeline wie alle anderen Metadaten. Seine Agent-Script-Datei liegt in einem Authoring Bundle in Git, läuft durch einen Pull Request, wird validiert, in die nächste Org deployt und dort als neue, inaktive Version gepublished. Das Aktivieren ist ein eigener Schritt, und pro Agent kann nur eine Version aktiv sein. Für einen Hersteller, dessen Umsetzungspartner den Agenten baut, ist meine Antwort auf die Frage, wer freigibt, kurz: Der Partner baut und testet, der Kunde deployt und aktiviert, die Serviceleitung gibt frei.

## Woraus besteht ein Agentforce-Agent im Repository?

Salesforce hat die Agentenentwicklung 2026 auf ein Metadatenmodell umgestellt. Laut [Salesforce Developers Blog vom Mai 2026](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) steckt die Definition eines Agenten zur Entwurfszeit in einer einzigen `.agent`-Datei in Agent Script, gespeichert im Metadatentyp `AiAuthoringBundle`. Wird eine Version committet, erzeugt die Plattform daraus die Laufzeit-Metadaten:

- **Bot und BotVersion:** der Agent selbst und die Einstellungen einer Version. Die [Agentforce-Metadatenreferenz](https://developer.salesforce.com/docs/ai/agentforce/references/agents-metadata-tooling/agents-metadata.html) sagt dazu: "A single Einstein Bot or Agentforce Agent can have many versions, but only one version can be active."
- **GenAiPlannerBundle:** Subagenten, Anweisungen, Aktionen und Steuerungslogik einer gepublishten Version.
- **Die Aktionen darunter:** Flows, Apex-Klassen und Prompt Templates, die der Agent aufruft. Sie sind normale Metadaten mit eigenem Lebenszyklus.

Für Entscheider heißt das: Die Logik, die festlegt, ob ein Händler eine Antwort zu Garantie oder Ersatzteilen bekommt, ist jetzt eine Textdatei, die sich vergleichen, prüfen und zurückdrehen lässt. Das zählt, sobald Regeln wie die Garantieberechtigung in Agent Script stehen, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

Ein Versionsdetail braucht jetzt Aufmerksamkeit. Die [Metadata-API-Referenz](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) führt Winter '27 als API-Version 68.0, und der [Agentforce-DX-Leitfaden zum Umzug von Agenten zwischen Orgs](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-deploy-metadata.html) sagt, dass die Agenten-Metadaten mit API v68 überarbeitet wurden: Beide Orgs müssen auf v68 sein, um Agenten mit den neuen Typen zu übertragen, die in den Beispiel-Manifesten `AiAgentDefinition` und `AiAgentDefinitionVersion` heißen. Eine Pipeline aus dem Frühjahr gehört vor dem nächsten Agenten-Release auf den Prüfstand. Die übrigen Pipeline-Änderungen dieses Releases stehen in [Winter '27: was sich für Ihre Pipeline ändert](../salesforce-winter-27-aenderungen-pipeline/).

## Wie läuft ein Agent durch die Release-Pipeline?

Der [Beitrag zum Agentic Development Lifecycle vom Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) beschreibt den Pro-Code-Weg Schritt für Schritt. In einer Pipeline auf Kundenseite sieht er so aus:

1. **Pull Request.** Der Partner committet die geänderte `.agent`-Datei und geänderte Flows oder Apex-Klassen auf einem Feature-Branch. Der Reviewer liest den Diff im Agent Script wie Code.
2. **Validieren.** `sf agent validate authoring-bundle` prüft, ob das Agent Script kompiliert. Laut Salesforce ist die Validierung "required before the agent can be published", sie gehört also als Gate in die Pipeline.
3. **Gezieltes Deployment.** Erst die Flows, dann das Authoring Bundle, jeweils mit `--metadata` benannt. Der Beitrag rät von einem nackten `sf project deploy start` ab, weil es alles Geänderte ausliefert und Agenten-Metadaten versehentlich mitnehmen kann.
4. **Publish.** `sf agent publish authoring-bundle` kompiliert das Agent Script und legt einen neuen Agenten oder eine neue Version eines bestehenden an, mit den Metadaten Bot, BotVersion und GenAi, so die [CLI-Referenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_publish_authoring-bundle.html). Die neue Version ist inaktiv; laut ADLC-Beitrag kann man jetzt publishen und später aktivieren.
5. **Testen.** Die Testsuite läuft in der Sandbox gegen die gepublishte Version. Schwellen und Passraten behandle ich in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).
6. **Aktivieren.** `sf agent activate` mit `--api-name` und `--version` schaltet die Version ein. Laut [Referenz zu activate](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_agent_activate.html) ist der Agent damit sofort für die Anwender verfügbar.

Ein Flag verdient eine Zeile im Pipeline-Review. Dieselbe Referenz sagt: Mit `--json` und ohne `--version` wird "the latest agent version" automatisch aktiviert. In einem Skript, das unbeaufsichtigt läuft, gebe ich die Versionsnummer deshalb immer mit. So aktiviert die Pipeline, was der Fachverantwortliche freigegeben hat, und nicht das, was zuletzt gepublished wurde.

Der Mai-Beitrag beschreibt zwei Wege in die nächste Org. Die meisten Pipelines halten nur das `AiAuthoringBundle` in Git, deployen es und publishen in jeder Org eine neue Version. Voll automatisierte Pipelines halten zusätzlich das erzeugte `GenAiPlannerBundle` in Git und deployen beides zusammen, damit entfällt der manuelle Commit-Schritt. Für einen Hersteller mit einer Produktiv-Org ziehe ich den ersten Weg vor: In Git liegt nur, was Menschen schreiben, und jede Org erzeugt ihre Laufzeit-Metadaten selbst. Der Preis sind abweichende Versionsnummern zwischen den Orgs; Salesforce schreibt, dass die Nummern des Planners "won't necessarily match" mit denen des Bundles. Jede Release Note sollte deshalb festhalten, welche Produktivversion zu welchem Git-Commit gehört.

Drei Punkte aus dem Leitfaden zum Umzug zwischen Orgs erwischen Teams gern:

- Das erste Deployment in eine Ziel-Org braucht die komplette Agentendefinition, nicht nur eine Version.
- Flow-, Apex- und Prompt-Template-Aktionen werden automatisch mit abgerufen; Abhängigkeiten zu Data 360 und eigene Objekte müssen ins Manifest.
- Der Agent User muss in der Ziel-Org zugewiesen sein, mit den Rechten, die der Agent braucht. Außerdem warnt Salesforce davor, abgerufene Agenten-Metadaten von Hand zu ändern, weil das eine Org beschädigen kann.

## Warum bricht ein Schnellfix im Builder der Produktion die Pipeline?

Derselbe Leitfaden nennt zwei Regeln: "You can't edit a committed agent", und Agenten in Quell- und Ziel-Org "must match or future deployments will be blocked". Eine Änderung in Produktion bedeutet also eine neue Version in Produktion, und das nächste Deployment aus der Pipeline ist blockiert, bis jemand eine passende Version in der Quell-Org anlegt.

Wer einen Agenten in Produktion ändern darf, ist eine Berechtigungsfrage, und die kläre ich vor dem ersten Go-live. Meine Regel: In Produktion hat niemand Rechte zum Publishen oder Aktivieren außer dem Release Manager und einer benannten Vertretung. Muss sich ein Händler-Agent während einer Störung ändern, machen diese beiden die Änderung, dokumentieren sie und bauen dieselbe Version noch am selben Tag in der Quell-Org nach.

## Wie macht man ein Rollback eines Agentforce-Agenten?

Salesforce beschreibt kein Rollback-Verfahren. Der ADLC-Beitrag empfiehlt, Agent Script in Git zu committen, um zu einer funktionierenden Version zurückkehren zu können, und `sf agent activate` nimmt jede Versionsnummer an. Ein [Beitrag im Developers Blog vom Mai 2025](https://developer.salesforce.com/blogs/2025/05/deploy-your-agentforce-agents-with-zero-downtime-using-agent-versions) beschreibt das Aktivieren einer neuen Version als sofortigen Wechsel ohne Ausfallzeit für die Anwender. Nach meiner Lesart dieser Quellen ist der schnellste Rollback, die vorherige Versionsnummer wieder zu aktivieren. Das dauert Minuten und braucht kein Deployment.

Diese Lösung hat eine Grenze, die ich jeder Serviceleitung vor dem ersten Release erklären würde. Nach meiner Lesart des Metadatenmodells enthält die Agentenversion den Planner, die Subagenten und Verweise auf Aktionen, während der Flow oder die Apex-Klasse hinter einer Aktion eigene Metadaten sind. Hat ein Release sowohl das Agent Script als auch einen Flow geändert, bringt die alte Version die alten Anweisungen zurück, aber mit dem neuen Flow. Der Flow braucht ein eigenes Revert über die Pipeline. Ein guter Grund, Änderungen am Agenten und an Aktionen in getrennten, kleinen Pull Requests zu halten.

Deaktivieren ist die Notbremse, und zwar eine harte. Laut [Agentforce-DX-Dokumentation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-manage.html) beendet das Deaktivieren offene Interaktionen und macht den Agenten für alle Verbindungen unerreichbar. Für ein Händlerportal würde ich vorher festlegen, wo Händler landen, wenn der Agent aus ist, etwa in einem Fallformular oder bei der Service-Hotline.

## Ein typisches Szenario: Der Partner baut, der Kunde gibt frei

Nehmen wir einen Maschinenbauer mit Service Cloud, SAP und Händlerportal, einer Produktiv-Org und einem Umsetzungspartner, der einen Serviceagenten für Händleranfragen gebaut hat. Ein internes Salesforce-Team mit vier Personen verantwortet Git und Pipeline, Releases gehen alle zwei Wochen live. Alle Zahlen hier sind Annahmen.

Version 3 des Agenten beantwortet in Produktion Fragen zu Auftragsstatus und Garantie. Für Release 4 ergänzt der Partner einen Subagenten für Ersatzteile und erweitert den Auftragsstatus-Flow, damit er zu einem ersetzten Teil auch das Nachfolgeteil liefert. Der Partner eröffnet zwei Pull Requests, einen für den Flow und einen für die `.agent`-Datei. Der Architekt des Kunden prüft beide, die Pipeline validiert, deployt in die UAT-Sandbox, published und lässt 60 Testfälle laufen. Die Serviceleitung gibt die Ergebnisse frei. Am Release-Tag deployt und published der Release Manager in Produktion, wo Version 4 als inaktiv erscheint. Um 7 Uhr, bevor die Händler im ersten Land anfangen, aktiviert die Pipeline Version 4 mit der Versionsnummer aus der freigegebenen Release Note.

Zwei Tage später empfiehlt der Ersatzteil-Subagent für eine Produktlinie das falsche Nachfolgeteil. Der Release Manager aktiviert innerhalb einer Viertelstunde wieder Version 3, Auftragsstatus und Garantieauskünfte laufen weiter. Die Release Note zeigt, dass auch Version 3 den erweiterten Auftragsstatus-Flow aufruft. Das zusätzliche Feld schadet nicht, also bleibt der Flow, und die Korrektur kommt als Version 5 über den normalen Weg. Produktionsrechte hat der Partner dabei nie gebraucht.

## Wer gibt den Agenten frei, wenn Kunde und Partner eine Org teilen?

Der Kunde, mit klaren Grenzen zwischen den Rollen:

- **Partner:** baut in Scratch Orgs oder Sandboxes, schreibt Tests, eröffnet Pull Requests, behebt Befunde. Der ADLC-Beitrag sagt deutlich "never give your agent access to the production environment", und ich dehne das auf die Build-User des Partners aus.
- **Architekt des Kunden:** prüft Agent Script und Aktionen, vor allem Regeln zu Garantie, Rabatten und Kreditlimits.
- **Release Manager des Kunden:** verantwortet die Pipeline, deployt, published und aktiviert in Produktion.
- **Fachverantwortlicher, etwa die Serviceleitung:** gibt die Aktivierung auf Basis der Testergebnisse frei und entscheidet gemeinsam mit dem Release Manager über ein Rollback.

Jeder Agent bekommt in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/) genau einen Owner, wie ein Objekt. Bei mehreren Partnern dürfen nie zwei Teams Versionen desselben Agenten publishen. Pipeline und Repository gehören dem Kunden, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) begründet.

Unternehmensgruppen mit mehreren Produktiv-Orgs, etwa einer je Tochtergesellschaft, stehen vor einer Lücke. Die CLI kann laut [Referenz der agent-Befehle](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm) eine Agentenvorlage für die Paketierung in einem Second-Generation Managed Package erzeugen, aber eine Anleitung von Salesforce, wie man einen Agenten in mehrere eigene Orgs ausrollt, habe ich nicht gefunden. Bis es eine gibt, würde ich jede Org als eigenes Release-Ziel mit eigenem Versionsprotokoll behandeln.

## Wo fangen Sie an?

1. Legen Sie die `.agent`-Datei jedes Agenten ins Repository des Kunden und bauen Sie Agenten nicht mehr direkt in geteilten Orgs.
2. Nehmen Sie `sf agent validate authoring-bundle` und gezielte Deployments in die Pipeline auf.
3. Entziehen Sie in Produktion allen außer dem Release Manager und einer Vertretung die Rechte zum Publishen und Aktivieren.
4. Führen Sie ein Versionsprotokoll pro Org: Git-Commit, Versionsnummer, Datum, Freigabe.
5. Schreiben Sie ein Rollback-Runbook: welche Version wieder aktiviert wird, welche Flows zurückgedreht werden, wohin Händler gehen, wenn der Agent aus ist.
6. Prüfen Sie vor dem nächsten Agenten-Deployment mit den neuen Metadatentypen, ob Quell- und Ziel-Org auf API v68 sind.

Diesen Ablauf aufzusetzen ist Teil meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

Ein Agent ist reif für einen Enterprise-Release-Prozess, wenn jede Version, jede Aktivierung und jedes Rollback so nachvollziehbar ist wie jede andere Änderung. Wenn Ihr Partner bald einen Agenten liefert und der Release-Weg noch offen ist, [schreiben Sie mir](#contact).
