---
title: "Agentforce-Agenten testen: wann ist einer produktionsreif?"
description: "Wann ist ein Agentforce-Agent reif für die Produktion? Testing Center, sf agent test, LLM als Prüfer, Passraten-Schwellen und Monitoring für Hersteller erklärt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-agenten-testen-freigeben
translationKey: testing-agentforce-agents
topic: ai
categories: [ai]
tags: [Agentforce, Testing Center, KI-Agenten, Quality Gates, DevOps, Maschinenbau]
takeaways:
  - "Salesforce liefert Testwerkzeuge, aber keine Schwelle. Den Testsatz und die Passrate über mehrere Läufe vereinbaren Sie selbst."
  - "Ein Testfall prüft Subagent, Aktionen und Ergebnis. Das Ergebnis bewertet ein Sprachmodell, harte Geschäftsregeln brauchen exakte Prüfungen auf Daten."
  - "Ob Testläufe Credits kosten, sollten Sie schriftlich klären: Laut Leitfaden zur Test-API verbrauchen sie Requests und Credits."
  - "Ich empfehle 100 Prozent für harte Regeln und kritische Fälle, rund 90 Prozent je Lauf für die Antwortqualität und eine menschliche Prüfung."
  - "Session Traces, Health-Metriken und ein gestufter Rollout sind ab dem ersten Tag aktiv, und typische fehlgeschlagene Gespräche werden neue Testfälle."
faq:
  - q: "Was ist das Agentforce Testing Center?"
    a: "Das Testing Center ist das Salesforce-Werkzeug, um Agenten vor dem Go-live zu testen. Es erzeugt synthetische Testanfragen, führt sie parallel in einer Sandbox aus und prüft Routing, Aktionen und Antworten. Entwickler nutzen dieselbe Art von Tests über die Befehle sf agent test in der CLI."
  - q: "Welche Passrate sollte ein Agentforce-Agent vor dem Go-live erreichen?"
    a: "Salesforce nennt keine Schwelle. Ich empfehle 100 Prozent für Regelprüfungen und Schutzfälle sowie rund 90 Prozent für die vom LLM bewerteten Antworten über drei Läufe. Diese Schwellen sollte die Fachseite mit IT, Security und Datenverantwortlichen vereinbaren, bevor die Tests beginnen. Kritische Fälle müssen in jedem Versuch bestehen."
  - q: "Kosten Agentforce-Tests Flex Credits?"
    a: "Lassen Sie sich das für Ihren Vertrag bestätigen. Laut Leitfaden zur Test-API verbrauchen Testläufe Requests und Credits, und die Rate Card nennt für Aktionen in Sandboxes und Scratch Orgs 16 statt 20 Flex Credits. Data-360-Abfragen in Tests können Data-360-Credits kosten."
  - q: "Lassen sich Agentforce-Tests in einer CI-Pipeline ausführen?"
    a: "Ja. sf agent test run liefert Ergebnisse als JSON, TAP oder JUnit. Eine Pipeline kann die Ergebnisse auswerten und ein Deployment stoppen, wenn die Passrate unter der vereinbarten Schwelle liegt."
  - q: "Mit wie vielen Testfällen sollte man anfangen?"
    a: "Anthropic nennt 20 bis 50 aus realen Fehlerfällen abgeleitete Aufgaben als guten Start. Für einen Händleragenten würde ich diese Testfälle aus echten Händler-E-Mails und Servicetickets ableiten und um Grenz- und Schutzfälle ergänzen."
draft: false
---

Wer Agentforce-Agenten testet, braucht am Ende eine Zahl, die über den Go-live entscheidet. Ein Agent ist produktionsreif, wenn er einen vereinbarten Testsatz mit einer vereinbarten Passrate besteht, über mehrere Läufe, in einer Sandbox, und wenn das Monitoring aktiv ist, bevor der erste Händler ihm schreibt. Diese Schwelle ist notwendig, aber nicht hinreichend: Berechtigungen, Datenschutz, Fallbacks, Lastverhalten und eine Abschaltmöglichkeit müssen ebenfalls geprüft werden. Salesforce liefert die Werkzeuge, nicht die Schwelle. Die Fachseite, etwa die Serviceleitung, legt sie mit IT, Security und Datenverantwortlichen fest, und ich würde sie vor dem Piloten schriftlich festhalten.

## Warum testet man einen KI-Agenten anders als Apex?

Ein Apex-Unit-Test ist so gebaut, dass er bei gleicher kontrollierter Eingabe dasselbe Ergebnis liefert: grün oder rot. Ein Agent auf Basis eines Sprachmodells kann dieselbe Händlerfrage in zwei Läufen unterschiedlich beantworten. Beide Antworten können passen, oder eine ist falsch. Anthropic beschreibt das in seinem [Leitfaden zu Agenten-Evaluierungen](https://anthropic.com/engineering/demystifying-evals-for-ai-agents): Weil Modellausgaben zwischen Läufen schwanken, prüft man jede Aufgabe mehrfach. Derselbe Leitfaden zeigt, warum ein grüner Lauf wenig beweist. Ein Agent, der eine Aufgabe in 75 Prozent der Versuche löst, besteht drei Versuche hintereinander nur in etwa 42 Prozent der Fälle.

Die Frage lautet also: Wie oft besteht er, und mit welchen Fehlern können wir leben? Eine holprige Zusammenfassung eines Liefertermins ist ärgerlich. Eine falsche Aussage, die Maschine sei noch in der Garantie, kostet eine Gutschrift. Diese Fehler brauchen unterschiedliche Schwellen.

## Die Testwerkzeuge von Salesforce

Salesforce hat das [Agentforce Testing Center](https://www.salesforce.com/news/?p=83400) im November 2024 vorgestellt. Es erzeugt Hunderte synthetische Anfragen aus einer Beschreibung in normaler Sprache und führt sie parallel in einer Sandbox aus. Für Teams mit Versionsverwaltung bietet [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) dasselbe über VS Code, CLI-Befehle und eine Test-API.

Salesforce hat derzeit zwei Testwege. Das bisherige Testing Center und die Test-API, auf die sich der größte Teil der unten genannten Dokumentation bezieht, speichern Tests als `AiEvaluationDefinition`. Das neuere Testing Center in Agentforce Studio nutzt eigene Testdefinitionen und einen eigenen Runner (`--test-runner agentforce-studio` in der CLI) und ist in der Salesforce-Hilfe als Beta gekennzeichnet. Im Pro-Code-Ansatz des bisherigen Modells ist ein Test eine YAML-Datei. Laut [Salesforce Developers Blog vom Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) enthält jeder Testfall eine Nutzeranfrage und bis zu drei Erwartungen: den Subagenten, an den das Gespräch übergeben werden soll, die Aktionen, die ausgeführt werden sollen, und eine Beschreibung des richtigen Ergebnisses in normaler Sprache. Dieses Ergebnis bewertet ein Sprachmodell als Prüfer, im Englischen „LLM as a judge“. `sf agent test create` lädt die Spezifikation in die Org, `sf agent test run` führt sie aus.

```vertiefung Für Entwickler
titel: Was eine Testspezifikation außerdem prüft
- **Qualitätsmetriken.** Kohärenz, Vollständigkeit und Prägnanz, jeweils als bestanden oder nicht bestanden, dazu die Latenz in Millisekunden, laut [Dokumentation zur Testspezifikation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-customize.html).
- **Eigene Prüfungen.** Exakte Text- oder Zahlenvergleiche anhand von Daten, die eine Aktion erzeugt hat, ausgewählt per JSONPath. Salesforce [zeigt](https://developer.salesforce.com/blogs/2025/10/test-your-agentforce-agents-with-custom-evaluation-criteria) `string_comparison` und `numeric_comparison`. Das ist der deterministische Teil des Agententests im bisherigen Modell, und ich würde ihn für jede Regel nutzen, die ausnahmslos gelten muss. Die neueren Custom Scorers in Agentforce Studio nutzen ein LLM als Prüfer und ersetzen daher keine exakte Prüfung.
- **Ausgabe für CI.** Ergebnisse werden als JSON, TAP oder JUnit ausgegeben, laut [Dokumentation zu Testläufen](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-run.html). Eine Pipeline liest sie wie Apex-Testergebnisse.
```

Die Werkzeuge ändern sich schnell. Der [TDX-2026-Rückblick](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/) kündigte an, dass Erweiterungen des Testing Centers mit eigenen Bewertungen und mehrstufigen Gesprächstests im Mai 2026 GA werden sollen. Die Salesforce-Hilfe kennzeichnet das Testing Center in Agentforce Studio aber weiter als Beta. Zur [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) stellte Salesforce Gesprächstests mit einer Metrik für die Aufgabenerledigung (Beta) und Custom Scorers (API GA, Oberfläche in Beta) vor. Die hier zitierte Entwicklerdokumentation beschreibt noch den bisherigen Testprozess und nicht das neuere Testing Center in Agentforce Studio; prüfen Sie Status und Beta-Bedingungen daher in Ihrer Org. Halten Sie Ihre Testfälle als einfache Dateien in Git, dann überstehen sie den nächsten Werkzeugwechsel.

```hinweis achtung
Agententests sind [nur in Sandboxes verfügbar](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), und der Leitfaden zur Test-API weist darauf hin, dass Testläufe Requests und Credits verbrauchen und Daten ändern können. Laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 kostet eine Aktion in einer Sandbox oder Scratch Org 16 Credits statt 20 in Produktion. Da sich die Abrechnungsregeln für Tests mit den Releases ändern, sollten Sie sich schriftlich bestätigen lassen, ob Ihre Testläufe abgerechnet werden.

Wenn eine Aktion in einem angebundenen Test-ERP ein Teil reserviert, geschieht das bei jedem Testlauf.
```

## Wie legen Sie Passraten-Schwellen für den Go-live fest?

Salesforce liefert Bewertungen, aber keine Schwelle, ab der ein Agent als „bereit“ gilt. Der Lifecycle-Beitrag vom Juni 2026 nennt keine, die Testdokumentation auch nicht. Die Schwellen sind also eine Projektentscheidung, und ich teile sie nach Risiko auf:

1. **Geschäftsregeln: 100 Prozent, exakt geprüft.** Garantieberechtigung, Kreditlimits, Rabattfreigaben. Sie gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben, und Sie testen sie mit Aktionsprüfungen und eigenen Prüfungen ohne Interpretationsspielraum. Ein Fehler stoppt das Release.
2. **Routing und Aktionen: nahe 100 Prozent.** Wird eine Ersatzteilfrage an den falschen Subagenten geleitet oder wird die Auftragsabfrage nicht ausgeführt, kann die Antwort nicht stimmen. Diese Prüfungen sind binär und günstig zu wiederholen.
3. **Antwortqualität: eine Passrate über mehrere Läufe.** Für das vom LLM bewertete Ergebnis starte ich mit 90 Prozent in jedem von drei vollständigen Läufen und schaue, welche Fälle scheitern: Ein Fall, der in jedem Lauf scheitert, ist ein Befund, auch wenn die Gesamtquote über 90 Prozent bleibt. Das ist mein Ausgangswert, keine Salesforce-Vorgabe; die Fachseite bestätigt oder ändert ihn.
4. **Schutzfälle: keine Fehler.** Anfragen außerhalb des Auftrags, Fragen nach Aufträgen eines anderen Händlers, versteckte Anweisungen in Freitext. Händlerportale und Garantieformulare sind Einfallstore für Prompt Injection, das beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Auch die Bewertung durch den Prüfer muss kontrolliert werden. Anthropic empfiehlt, Modell-Bewerter eng mit den Urteilen menschlicher Fachleute abzugleichen. Die Serviceexpertin liest also in den ersten Läufen eine Stichprobe der bewerteten Antworten. Weichen Expertin und Prüfer oft voneinander ab, sind die Ergebnisbeschreibungen in den Testfällen zu vage.

## Rechenbeispiel: ein Ersatzteilagent für Händler

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und einem Händlerportal. Der geplante Agent beantwortet Händlerfragen zu Ersatzteilverfügbarkeit und Auftragsstatus. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Der Testsatz.** Das Team schreibt 60 Testfälle: 40 typische Fragen aus echten Händler-E-Mails, 10 Grenzfälle wie ersetzte Teilenummern oder eine Seriennummer, die in der installierten Basis fehlt, und 10 Schutzfälle wie die Frage nach Aufträgen eines anderen Händlers. Jeder Fall nutzt im Schnitt drei Aktionen: Maschine identifizieren, SAP abfragen, Antwort formulieren. Der Leitfaden von Anthropic nennt 20 bis 50 aus realen Fehlerfällen abgeleitete Aufgaben als guten Start.

**Die Kosten.** Werden Testaktionen zum Sandbox-Satz abgerechnet, sind ein vollständiger Lauf 60 × 3 = 180 Aktionen zu 16 Credits, also 2.880 Credits. Drei Läufe pro Release ergeben 8.640 Credits, beim [Listenpreis von 500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) rund 43 €, ohne Prompts und Data 360. Drei Läufe pro Woche über einen zwölfwöchigen Piloten kosteten rund 520 €, weniger als eine falsche Verfügbarkeitszusage an einen Händler, dessen Maschine steht. Werden Ihre Testläufe nicht abgerechnet, bleiben als Kostenfaktoren nur angebundene Systeme und Data 360. Wie Sie den Rest der Rechnung schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

**Das erste Ergebnis.** Routing und Aktionen bestehen in 58 von 60 Fällen, das Ergebnis in 49 von 60. Die Fehler häufen sich: Acht der elf betreffen ersetzte Teilenummern, bei denen SAP die alte Nummer liefert und der Agent das Teil als nicht verfügbar meldet. Das ist eine Aufgabe für das SAP-Team, kein Prompt-Problem. Liefert die API das Nachfolgeteil, besteht die Ergebnisprüfung in drei Läufen in 56, 55 und 56 von 60 Fällen, jedes Mal über 90 Prozent. Kein Fall scheitert in allen drei Läufen, alle Schutzfälle bestehen, eine Serviceexpertin hat eine Stichprobe der Bewertungen gelesen, und die Serviceleitung gibt den Go-live zuerst für die Händler eines Landes frei.

Die meisten Fehler in so einem Lauf weisen auf Daten und Schnittstellen hin. Deshalb stelle ich [Business Value und Datenqualität an den Anfang](../agentforce-business-value-datenqualitaet/).

## Nach dem Go-live läuft das Monitoring ab dem ersten Tag

Tests decken die Fragen ab, an die Sie gedacht haben. Händler stellen andere. Deshalb ist das Monitoring ab dem ersten Tag aktiv:

- **Session Traces.** Mit [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) hat Salesforce auf Basis von OpenTelemetry ein Datenmodell für Session Tracing in Data Cloud eingeführt, heute Data 360. Mit der Session Trace OTel API (Beta) lassen sich Traces pro Sitzung abrufen und an Werkzeuge wie Splunk oder Datadog weiterleiten; sie setzt Data 360 voraus. Traces enthalten Nachrichten und Aktionseingaben, deshalb muss der Zugriff darauf beschränkt sein.
- **Zustand und Alarme.** Agentforce Observability zeigt Latenz, Eskalations- und Fehlerquoten. Alarme für jede Metrik richten Sie in Agentforce Studio ein. Agent Health Monitoring mit mindestens 16 eingebauten Metriken ist seit der Dreamforce 2026 GA.
- **Gestufter Rollout.** Beim Veröffentlichen entsteht eine inaktive Agentenversion. Die Aktivierung ist ein eigener Schritt. Starten Sie mit einer Händlergruppe und erweitern Sie den Kreis, wenn die Kennzahlen stabil bleiben.
- **Feedbackschleife.** Sichten Sie fehlgeschlagene Gespräche, entfernen Sie Dubletten und personenbezogene Daten, und nehmen Sie typische oder riskante Fehler in die Regressionstests auf.

Testen Sie neu, sobald sich etwas unter dem Agenten ändert: ein Subagent, ein Flow, Wissensartikel, ein Salesforce-Release, die SAP-API.

## Die Tests gehören dem Kunden

Umsetzungspartner können die Tests schreiben und ausführen, aber Testsatz, Schwellen und Go-live-Entscheidung gehören dem Unternehmen, das gegenüber seinen Händlern verantwortlich ist. Das ist das Prinzip aus [DevOps in Enterprise-Projekten](../warum-devops-salesforce-enterprise-projekte/): Agententests liegen im selben Repository und laufen in derselben Pipeline, mit JUnit-Ausgabe und einer Regel, die das Deployment stoppt, wenn die Passrate unter der Schwelle liegt. Das aufzusetzen gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

```schritte
Inakzeptable Fehler benennen
  Gemeinsam mit der Fachseite, etwa eine falsche Garantieaussage oder Daten eines anderen Händlers.
20 bis 50 echte Fragen sammeln
  Aus Händler-E-Mails und Servicetickets, dann Grenz- und Schutzfälle ergänzen.
Regeln markieren
  Welche Regeln brauchen exakte Prüfungen statt des LLM-Prüfers?
Schwellen vereinbaren
  Schwellen und Anzahl der Läufe, vor dem ersten Test, nicht nach dem ersten Ergebnis.
Testabrechnung klären
  Ob Testläufe abgerechnet werden, und das Budget für jeden Regressionslauf bis zum Ende des Piloten.
Monitoring einschalten
  Und die Rollout-Gruppe festlegen, bevor Sie den Agenten aktivieren.
```
