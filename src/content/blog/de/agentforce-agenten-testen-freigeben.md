---
title: "Agentforce-Agenten testen: wann ist einer produktionsreif?"
description: "Wann ist ein Agentforce-Agent reif für Produktion? Testing Center, sf agent test, LLM als Prüfer, Passraten-Schwellen und Monitoring für Hersteller erklärt."
pubDate: 2026-10-27
lang: de
slug: agentforce-agenten-testen-freigeben
translationKey: testing-agentforce-agents
topic: ai
tags: [Agentforce, Testing Center, KI-Agenten, Quality Gates, DevOps, Maschinenbau]
takeaways:
  - "Ein Agentforce-Agent ist produktionsreif, wenn er einen vereinbarten Testsatz mit einer vereinbarten Passrate über mehrere Läufe besteht; Salesforce liefert die Werkzeuge, aber keine Schwelle."
  - "Jeder Agentforce-Testfall kann Subagent, ausgeführte Aktionen und Ergebnis prüfen; das Ergebnis bewertet ein Sprachmodell als Prüfer, harte Geschäftsregeln brauchen exakte Prüfungen."
  - "Agententests laufen in Sandboxes, verbrauchen Credits und können Daten ändern; eine Aktion kostet dort 16 Flex Credits, drei Läufe mit 60 Fällen à drei Aktionen also rund 43 $."
  - "Ich empfehle 100 Prozent für harte Regeln wie die Garantieberechtigung und rund 90 Prozent über drei Läufe für die Antwortqualität, vor dem Piloten mit der Fachseite vereinbart."
  - "Session Traces, Health-Metriken und ein gestufter Rollout müssen ab dem ersten Tag aktiv sein, und jedes fehlgeschlagene Gespräch in Produktion wird ein neuer Testfall."
faq:
  - q: "Was ist das Agentforce Testing Center?"
    a: "Das Testing Center ist das Salesforce-Werkzeug, um Agenten vor dem Go-live zu testen. Es erzeugt synthetische Testanfragen, führt sie parallel in einer Sandbox aus und prüft Routing, Aktionen und Antworten. Entwickler nutzen dieselbe Art von Tests über die Befehle sf agent test in der CLI."
  - q: "Welche Passrate sollte ein Agentforce-Agent vor dem Go-live erreichen?"
    a: "Salesforce nennt keine Schwelle. Ich empfehle 100 Prozent für Regelprüfungen und Schutzfälle und rund 90 Prozent für die vom LLM bewerteten Antworten über drei Läufe, bestätigt von der Fachseite, bevor die Tests beginnen."
  - q: "Kosten Agentforce-Tests Flex Credits?"
    a: "Ja. Laut Salesforce verbrauchen Testläufe Requests und Credits. Aktionen in Sandboxes und Scratch Orgs kosten 16 statt 20 Flex Credits, Testläufe gehören also ins Budget wie jede andere Nutzung."
  - q: "Lassen sich Agentforce-Tests in einer CI-Pipeline ausführen?"
    a: "Ja. sf agent test run liefert Ergebnisse als JSON, TAP oder JUnit. Eine Pipeline kann sie auswerten und ein Deployment stoppen, wenn die Passrate unter der vereinbarten Schwelle liegt."
  - q: "Mit wie vielen Testfällen sollte man anfangen?"
    a: "Anthropic nennt 20 bis 50 Aufgaben aus echten Fehlern einen guten Start. Für einen Händleragenten würde ich sie aus echten Händler-E-Mails und Servicetickets nehmen und um Grenz- und Schutzfälle ergänzen."
draft: false
---

Wer Agentforce-Agenten testet, braucht am Ende eine Zahl, die über den Go-live entscheidet. Ein Agent ist produktionsreif, wenn er einen vereinbarten Testsatz mit einer vereinbarten Passrate besteht, über mehrere Läufe, in einer Sandbox, und wenn das Monitoring läuft, bevor der erste Händler ihm schreibt. Salesforce liefert die Werkzeuge: das Testing Center, die Befehle `sf agent test` und ein Sprachmodell, das die Antworten bewertet. Die Schwelle liefert Salesforce nicht. Diese Zahl gehört der Fachseite, etwa der Serviceleitung, und ich würde sie vor dem Piloten schriftlich festhalten.

## Warum testet man einen KI-Agenten anders als Apex?

Ein Apex-Test liefert jedes Mal dasselbe Ergebnis: gleiche Eingabe, gleiche Ausgabe, grün oder rot. Ein Agent auf Basis eines Sprachmodells kann dieselbe Händlerfrage in zwei Läufen unterschiedlich beantworten. Beide Antworten können passen, oder eine ist falsch. Anthropic beschreibt das in seinem [Leitfaden zu Agenten-Evaluierungen](https://anthropic.com/engineering/demystifying-evals-for-ai-agents): Weil Modellausgaben zwischen Läufen schwanken, prüft man jede Aufgabe mehrfach. Derselbe Leitfaden zeigt, warum ein grüner Lauf wenig beweist. Ein Agent, der eine Aufgabe in 75 Prozent der Versuche löst, besteht drei Versuche hintereinander nur in etwa 42 Prozent der Fälle.

Die Frage lautet also: Wie oft besteht er, und mit welchen Fehlern können wir leben? Eine holprige Zusammenfassung eines Liefertermins ärgert. Eine falsche Aussage, die Maschine sei noch in der Garantie, kostet eine Gutschrift. Diese Fehler brauchen unterschiedliche Schwellen.

## Welche Werkzeuge bietet Salesforce zum Testen von Agenten?

Salesforce hat das [Agentforce Testing Center](https://www.salesforce.com/news/?p=83400) im November 2024 vorgestellt. Es erzeugt Hunderte synthetische Anfragen aus einer Beschreibung in normaler Sprache und führt sie parallel in einer Sandbox aus. Für Teams mit Versionsverwaltung bietet [Agentforce DX](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html) dasselbe über VS Code, CLI-Befehle und eine Test-API.

Im Pro-Code-Weg ist ein Test eine YAML-Datei. Laut [Salesforce Developers Blog vom Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) enthält jeder Testfall eine Nutzeranfrage und bis zu drei Erwartungen: den Subagenten, an den das Gespräch gehen soll, die Aktionen, die laufen sollen, und eine Beschreibung des richtigen Ergebnisses in normaler Sprache. Dieses Ergebnis bewertet ein Sprachmodell als Prüfer, im Englischen „LLM as a judge“. `sf agent test create` lädt die Spezifikation in die Org, `sf agent test run` führt sie aus. Dazu kommen:

- **Qualitätsmetriken.** Kohärenz, Vollständigkeit und Prägnanz, jeweils als bestanden oder nicht bestanden, dazu die Latenz in Millisekunden, laut [Dokumentation zur Testspezifikation](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-customize.html).
- **Eigene Prüfungen.** Exakte Text- oder Zahlenvergleiche auf Daten, die eine Aktion erzeugt hat, ausgewählt per JSONPath. Salesforce [zeigt](https://developer.salesforce.com/blogs/2025/10/test-your-agentforce-agents-with-custom-evaluation-criteria) `string_comparison` und `numeric_comparison`. Das ist der deterministische Teil des Agententests, und ich nutze ihn für jede Regel, die ausnahmslos gelten muss.
- **Ausgabe für CI.** Ergebnisse kommen als JSON, TAP oder JUnit, laut [Dokumentation zu Testläufen](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-test-run.html). Eine Pipeline liest sie wie Apex-Testergebnisse.

Die Werkzeuge ändern sich schnell. Erweiterungen des Testing Center mit eigenen Bewertungen und mehrstufigen Gesprächstests sind laut [TDX-2026-Rückblick](https://www.salesforce.com/blog/tdx-2026-roundup-agentforce-edition/) seit Mai 2026 GA. Zur [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) kamen Gesprächstests mit einer Metrik für die Aufgabenerledigung (Beta) und Custom Scorers (API GA, Oberfläche in Beta) dazu. Die Entwicklerdokumentation beschreibt noch den bisherigen Testprozess; die Dokumentation für das neue Testing Center in Agentforce Studio ist angekündigt. Halten Sie Ihre Testfälle als einfache Dateien in Git, dann überstehen sie den nächsten Werkzeugwechsel.

Zwei praktische Punkte gehen leicht unter. Agententests sind [nur in Sandboxes verfügbar](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), und Salesforce weist darauf hin, dass Testläufe Requests und Credits verbrauchen und Daten ändern können. Laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) kostet eine Aktion in einer Sandbox oder Scratch Org 16 Credits statt 20 in Produktion. Und reserviert eine Aktion ein Teil in einem angebundenen Test-ERP, tut sie das bei jedem Testlauf.

## Wie legen Sie Passraten-Schwellen für den Go-live fest?

Salesforce liefert Bewertungen, aber keine Schwelle, die „bereit“ bedeutet. Der Lifecycle-Beitrag vom Juni 2026 nennt keine, die Testdokumentation auch nicht. Die Schwellen sind also eine Projektentscheidung, und ich teile sie nach Risiko auf:

1. **Geschäftsregeln: 100 Prozent, exakt geprüft.** Garantieberechtigung, Kreditlimits, Rabattfreigaben. Sie gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben, und Sie testen sie mit Aktionsprüfungen und eigenen Prüfungen ohne Interpretationsspielraum. Ein Fehler stoppt das Release.
2. **Routing und Aktionen: nahe 100 Prozent.** Landet eine Ersatzteilfrage im falschen Subagenten oder läuft die Auftragsabfrage nicht, kann die Antwort nicht stimmen. Diese Prüfungen sind binär und günstig zu wiederholen.
3. **Antwortqualität: eine Passrate über mehrere Läufe.** Für das vom LLM bewertete Ergebnis starte ich mit 90 Prozent in jedem von drei vollständigen Läufen. Das ist mein Ausgangswert, keine Salesforce-Vorgabe; die Fachseite bestätigt oder ändert ihn.
4. **Schutzfälle: keine Fehler.** Anfragen außerhalb des Auftrags, Fragen nach Aufträgen eines anderen Händlers, versteckte Anweisungen in Freitext. Händlerportale und Garantieformulare sind Einfallstore für Prompt Injection, das beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Auch der Prüfer braucht eine Kontrolle. Anthropic empfiehlt, Modell-Bewerter eng an menschlichen Fachleuten zu kalibrieren. Die Serviceexpertin liest also in den ersten Läufen eine Stichprobe der bewerteten Antworten. Weichen Expertin und Prüfer oft voneinander ab, sind die Ergebnisbeschreibungen in den Testfällen zu vage.

## Ein typisches Szenario: ein Ersatzteilagent für Händler

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und einem Händlerportal. Der geplante Agent beantwortet Händlerfragen zu Ersatzteilverfügbarkeit und Auftragsstatus. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Der Testsatz.** Das Team schreibt 60 Testfälle: 40 typische Fragen aus echten Händler-E-Mails, 10 Grenzfälle wie ersetzte Teilenummern oder eine Seriennummer, die in der installierten Basis fehlt, und 10 Schutzfälle wie die Frage nach Aufträgen eines anderen Händlers. Jeder Fall nutzt im Schnitt drei Aktionen: Maschine identifizieren, SAP abfragen, Antwort formulieren. Anthropics Leitfaden nennt 20 bis 50 Aufgaben aus echten Fehlern einen guten Start.

**Die Kosten.** Ein vollständiger Lauf sind 60 × 3 = 180 Aktionen zu 16 Sandbox-Credits, also 2.880 Credits. Drei Läufe pro Release ergeben 8.640 Credits, beim [Listenpreis von 500 $ je 100.000 Credits](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) rund 43 $, ohne Prompts. Drei Läufe pro Woche über einen zwölfwöchigen Piloten kosten rund 520 $, weniger als eine falsche Verfügbarkeitszusage an einen Händler, dessen Maschine steht.

**Das erste Ergebnis.** Routing und Aktionen bestehen in 58 von 60 Fällen, das Ergebnis in 49 von 60. Die Fehler häufen sich: Acht der elf betreffen ersetzte Teilenummern, bei denen SAP die alte Nummer liefert und der Agent das Teil als nicht verfügbar meldet. Das ist eine Aufgabe für das SAP-Team, kein Prompt-Problem. Liefert die API das Nachfolgeteil, besteht das Ergebnis in drei Läufen in 56, 55 und 56 von 60 Fällen, jedes Mal über 90 Prozent, alle Schutzfälle bestehen, und die Serviceleitung gibt den Go-live zuerst für die Händler eines Landes frei.

Die meisten Fehler in so einem Lauf zeigen auf Daten und Schnittstellen. Deshalb stelle ich [Business Value und Datenqualität an den Anfang](../agentforce-business-value-datenqualitaet/).

## Was passiert nach dem Go-live?

Tests decken die Fragen ab, an die Sie gedacht haben. Händler stellen andere. Deshalb läuft das Monitoring ab dem ersten Tag:

- **Session Traces.** Mit [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) hat Salesforce ein Datenmodell für Session Tracing in Data Cloud eingeführt, heute Data 360, auf Basis von OpenTelemetry. Die Session Trace OTel API (Beta) exportiert Traces in Werkzeuge wie Splunk oder Datadog.
- **Zustand und Alarme.** Das Command Center zeigt Latenz, Eskalationen und Fehlerquoten und verschickt Alarme. Agent Health Monitoring mit mehr als 16 eingebauten Metriken ist seit der Dreamforce 2026 GA.
- **Gestufter Rollout.** Beim Veröffentlichen entsteht eine inaktive Agentenversion, das Aktivieren ist ein eigener Schritt. Starten Sie mit einer Händlergruppe und erweitern Sie, wenn die Zahlen halten.
- **Rückkopplung.** Jedes Gespräch in Produktion, das schiefging, wird ein neuer Testfall.

Testen Sie neu, sobald sich etwas unter dem Agenten ändert: ein Subagent, ein Flow, Wissensartikel, ein Salesforce-Release, die SAP-API.

## Wo fangen Sie an, und wem gehören die Tests?

Dem Kunden. Der Partner schreibt die Tests und führt sie aus, aber Testsatz, Schwellen und Go-live-Entscheidung gehören dem Unternehmen, das gegenüber seinen Händlern geradesteht. Das ist das Prinzip aus [DevOps in Enterprise-Projekten](../warum-devops-salesforce-enterprise-projekte/): Agententests liegen im selben Repository und laufen in derselben Pipeline, mit JUnit-Ausgabe und einer Schranke, die das Deployment unter der Schwelle stoppt. Das aufzusetzen gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

1. **Die inakzeptablen Fehler benennen**, gemeinsam mit der Fachseite, etwa eine falsche Garantieaussage oder Daten eines anderen Händlers.
2. **20 bis 50 echte Fragen sammeln** aus Händler-E-Mails und Servicetickets, dann Grenz- und Schutzfälle ergänzen.
3. **Die Regeln markieren**, die exakte Prüfungen statt des LLM-Prüfers brauchen.
4. **Schwellen und Anzahl der Läufe vereinbaren**, vor dem ersten Test, nicht nach dem ersten Ergebnis.
5. **Sandbox-Credits budgetieren** für jeden Regressionslauf bis zum Ende des Piloten.
6. **Monitoring einschalten und die Rollout-Gruppe festlegen**, bevor Sie den Agenten aktivieren.

Ein Agentforce-Agent ist bereit, wenn er vorab festgelegte Schwellen Lauf für Lauf erreicht und Sie ab dem ersten Tag sehen, was er in Produktion tut. Wenn Sie eine zweite Meinung zu Ihrem Testsatz oder Ihren Go-live-Kriterien möchten, [schreiben Sie mir](#contact).
