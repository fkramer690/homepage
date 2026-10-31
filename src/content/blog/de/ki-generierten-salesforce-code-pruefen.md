---
title: "KI-generierten Salesforce-Code als Kunde prüfen"
description: "Wie Sie KI-generierten Salesforce-Code Ihrer Partner prüfen: sechs typische Fehler, was die Pipeline abfangen muss und was ein Mensch auf Kundenseite prüft."
pubDate: 2026-10-27
lang: de
slug: ki-generierten-salesforce-code-pruefen
translationKey: reviewing-ai-generated-salesforce-code
topic: code-review
categories: [devops, ai]
tags: [Code-Review, KI-Coding, Apex, Partnersteuerung, DevOps, Maschinenbau]
takeaways:
  - "Die Pipeline findet SOQL in Schleifen und fehlende Sharing-Deklarationen. Menschliche Reviewzeit gehört Tests, Feldwahl, Datenzugriff und Geschäftsregeln."
  - "Veracode maß 2026 für reine Modelle eine Sicherheits-Passrate von 56 Prozent, Java lag bei 30 Prozent. Für Apex gibt es keine Daten."
  - "Ein Test, der nur auf ein Ergebnis ungleich null prüft, bringt Abdeckung und beweist nichts. Salesforce rät selbst, nicht auf die Prozentzahl zu schauen."
  - "Seit API-Version 67.0 läuft Apex standardmäßig im User Mode. Hebt ein Agent die Version an, braucht der Sprung einen eigenen Test."
  - "KI-Reviewer geben dem Partner Hinweise. Die Freigabe für Datenmodell, Sharing und Portalzugriff bleibt bei einer Person auf Kundenseite."
faq:
  - q: "Muss ich jede Zeile KI-generierten Salesforce-Codes lesen?"
    a: "Nein. Mit Code Analyzer, Apex-Tests und Validierungsdeployment als Merge-Voraussetzung konzentriert sich das menschliche Review auf Tests, Datenzugriff, Feldwahl, Umfang und Geschäftsregeln. Änderungen an Sharing, Datenmodell und Schnittstellen sollten immer eine menschliche Freigabe auf Kundenseite bekommen."
  - q: "Darf ein KI-Werkzeug Pull Requests in unserem Repository freigeben?"
    a: "GitHub kann Copilot-Freigaben auf die Pflichtfreigaben anrechnen, die Funktion ist aber Public Preview und standardmäßig aus. Für eine Org mit Kunden- und Händlerdaten würde ich sie auslassen und KI-Reviews als Hinweise für den Partner nutzen."
  - q: "Welches Werkzeug findet SOQL-Abfragen in Schleifen?"
    a: "Salesforce Code Analyzer führt PMD aus, dessen Regel OperationWithLimitsInLoop SOQL, DML und andere limitierte Operationen in Schleifen meldet. ApexGuru ergänzt Performance-Prüfungen, etwa für Schema-Describe-Aufrufe."
  - q: "Sollten Partner offenlegen, welchen Code ein KI-Agent erzeugt hat?"
    a: "Ja. Verlangen Sie, dass KI-generierte Teile im Pull Request gekennzeichnet sind, zusammen mit dem Testlauf und dem Ergebnis von Code Analyzer. Schreiben Sie die Regel in den Vertrag, damit sie für jeden Partner im Programm gilt."
draft: false
---

KI-generierten Salesforce-Code prüfen Sie als Kunde, indem Sie die Arbeit aufteilen. Die Pipeline Ihres Partners findet, was Maschinen zuverlässig erkennen: SOQL und DML in Schleifen, fehlende Sharing-Deklarationen, fehlende Prüfungen von Objekt- und Feldberechtigungen. Ihr menschlicher Reviewer verwendet seine Zeit auf das, was Werkzeuge übersehen: Tests ohne Aussagekraft, Felder, die existieren, aber die falschen sind, Geschäftsregeln, die nur richtig aussehen, und zu weiten Datenzugriff. Verlangen Sie Belege statt „alle Tests grün“, und behalten Sie die letzte Freigabe auf Ihrer Seite.

## Warum braucht KI-generierter Salesforce-Code ein anderes Review?

Der Code kompiliert und sieht ordentlich aus, und genau darin liegt die Falle. Veracode hat für den [GenAI Code Security Report 2026](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) aktuelle Modelle getestet und eine durchschnittliche Sicherheits-Passrate von 56 Prozent gemessen. Java lag mit 30 Prozent auf dem letzten Platz. Getestet wurden die reinen Modelle, ohne Agenten-Werkzeuge, Leitplanken oder menschliches Review. Eine Studie speziell zu Apex gibt es nicht, aber Apex ist Java ähnlich genug, dass ich das als Warnung lese.

Der zweite Unterschied ist die Menge. Arbeiten die Entwickler Ihres Partners mit Coding-Agenten, steigt die Zahl der Pull Requests, Ihre Reviewkapazität bleibt gleich. Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) mit knapp 5.000 Befragten zeigt: KI-Nutzung erhöht den Durchsatz in der Softwareauslieferung, hängt aber weiterhin negativ mit deren Stabilität zusammen. Mehr Änderungen erreichen Ihre Org schneller, und das Review entscheidet, ob sie auch schneller etwas kaputt machen.

Salesforce schreibt es in der Dokumentation des eigenen Coding-Agenten Agentforce Vibes deutlich: „Permission modes protect your filesystem. Code review protects your application.“ ([Trust and Verification](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html)). Warum Reviews in Programmen mit mehreren Partnern Pflicht sind und wie Sie sie einführen, steht in [Warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/). Hier geht es darum, was sich ändert, wenn ein Agent den Code geschrieben hat.

## Sechs typische Fehler in KI-generiertem Salesforce-Code

Die meisten dieser Fehler nennt Salesforce selbst in seinen Checklisten für Agenten-Code. Einen Teil findet die Pipeline, den Rest nur jemand, der Ihre Org kennt.

1. **SOQL und DML in Schleifen.** Der Code funktioniert mit einem Datensatz und bricht bei einer Datenladung oder einem Massenupdate aus dem ERP. Die Salesforce-Checkliste fragt, ob Abfragen in Triggern bei Massenoperationen „the 100 SOQL limit“ erreichen könnten. Die PMD-Regel `OperationWithLimitsInLoop` meldet Abfragen, DML und andere limitierte Operationen in Schleifen ([PMD Performance-Regeln](https://docs.pmd-code.org/latest/pmd_rules_apex_performance.html)). Pipeline.
2. **Fehlendes Sharing und fehlende Feldberechtigungen.** PMD meldet Klassen mit DML ohne Sharing-Deklaration und Datenzugriffe ohne Berechtigungsprüfung. Seit API-Version 67.0 läuft Apex standardmäßig im User Mode. Nach meiner Einschätzung werden Modelle, die überwiegend mit älterem Apex trainiert sind, die alten Muster noch eine Weile erzeugen, und ein Agent hebt die API-Version einer Klasse womöglich nebenbei an, wenn Ihre Regeln das nicht verbieten. Warum Abfragen danach weniger Datensätze liefern können, beschreibe ich in [API 67.0 und User Mode](../api-67-apex-user-mode-weniger-datensaetze/). Pipeline für die Deklaration, Mensch für die Absicht.
3. **Tests ohne Aussagekraft.** Salesforce verlangt 75 Prozent Testabdeckung für ein Deployment und schreibt im selben Leitfaden „don't focus on the percentage“ ([Apex Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)). Ein Agent, dem man 75 Prozent als Ziel gibt, erreicht 75 Prozent. Die Salesforce-Checkliste für Agenten-Code nennt `System.assertNotEquals(null, result)` als Beispiel für eine Assertion ohne Aussage. Mensch.
4. **Erfundene oder falsche Felder.** Salesforce fragt, ob der Code „real fields and objects from your org (not placeholder names)“ verwendet ([Workflow Patterns](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html)). Ein Feld, das es nicht gibt, scheitert meist schon am Validierungsdeployment. Teuer wird ein Feld, das existiert, aber das falsche ist, etwa ein altes Garantieende aus einer Datenmigration neben dem Feld, das Ihre SAP-Schnittstelle pflegt. Das sieht nur, wer Ihr Datenmodell kennt. Mensch.
5. **Unvollständige Metadaten.** Neue Felder fehlen in den Permission Sets, oder referenzierte Objekte sind nicht Teil des Deployments. Fehlende Referenzen findet das Validierungsdeployment; fehlende Berechtigungen fallen erst auf, wenn der Innendienst leere Felder meldet. Pipeline plus Checkliste.
6. **Geschäftslogik, die richtig aussieht.** Garantieberechtigung, Rabattgrenzen, Lieferterminregeln für Ersatzteile. Der Agent baut, was in der User Story steht, und User Stories im Maschinenbau nennen selten jede Ausnahme. Mensch, am besten der fachliche Lead.

```vertiefung Für Entwickler
titel: Welche PMD-Regeln greifen bei Sharing, und was ändert API-Version 67.0?
`ApexSharingViolations` meldet Klassen mit DML ohne Sharing-Deklaration, `ApexCRUDViolation` Datenzugriffe ohne Berechtigungsprüfung; eine Abfrage `WITH USER_MODE` besteht diese Regel ([PMD Security-Regeln](https://docs.pmd-code.org/latest/pmd_rules_apex_security.html)).

Seit API-Version 67.0 laufen Klassen ohne Deklaration im Sharing-Kontext des aktuellen Benutzers, und `WITH SECURITY_ENFORCED` kompiliert nicht mehr ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)).
```

## Was sollte die Pipeline automatisch prüfen?

Alles, was eine Regel entscheiden kann, gehört in die Pipeline, damit Ihr Reviewer es nie kommentieren muss. Für Salesforce heißt das mindestens:

- **Salesforce Code Analyzer** bei jedem Pull Request. Version 5 bringt acht Engines mit, darunter PMD für Apex, die Salesforce Graph Engine für tiefere Sicherheitsanalysen in Apex, einen Flow Scanner und ApexGuru ([Code Analyzer Engines](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html)).
- **Apex-Tests und ein Validierungsdeployment** gegen eine Integrations-Sandbox, damit fehlende Felder und Abhängigkeiten scheitern, bevor jemand reviewt.
- **Eine Merge-Sperre**, bis die Pipeline grün ist.

Welche Prüfungen in welcher Reihenfolge laufen und welche Open-Source-Werkzeuge helfen, beschreibe ich in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/). Ein Punkt gehört hierher: KI-Reviewer. GitHub Copilot und Claude Code können Pull Requests reviewen, und ein frischer Reviewer, der den Code nicht geschrieben hat, findet tatsächlich etwas. Anthropic warnt in den [Best Practices für Claude Code](https://code.claude.com/docs/en/best-practices), dass ein Reviewer, der Probleme finden soll, immer etwas findet, und dass das Umsetzen jedes Fundes zu überflüssigen Abstraktionsschichten führt. GitHub kann Copilot-Freigaben auf die Pflichtfreigaben anrechnen, das ist aber Public Preview und standardmäßig aus ([GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/code-review)). Ich würde es auslassen. Ein KI-Review ist ein guter Hinweis für den Partner; die Freigabe für Ihre Org bleibt bei einem Menschen.

## Was prüft der menschliche Reviewer auf Kundenseite?

Sie müssen nicht jede Zeile lesen. Ist die Pipeline grün, würde ich einen Pull Request mit KI-generiertem Code in dieser Reihenfolge durchgehen:

1. **Zuerst die Tests.** Prüfen die Assertions fachliches Verhalten, auch einen Negativfall und einen Massenfall mit mindestens 20 Datensätzen, wie Salesforce es empfiehlt? Eine Testklasse, die einen Datensatz anlegt und auf „nicht null“ prüft, geht zurück.
2. **Datenzugriff.** Jedes `without sharing` und jedes `WITH SYSTEM_MODE` braucht eine schriftliche Begründung. In einem Händlerportal entscheidet genau diese Zeile, ob ein Händler die Daten eines anderen sieht.
3. **Felder und Objekte.** Sind das die Felder, die der Fachbereich wirklich pflegt? Stehen neue Felder in den richtigen Permission Sets?
4. **Umfang.** Berührt der Diff nur, was die Story braucht? Ein Agent, der „nebenbei“ drei weitere Klassen aufgeräumt oder ihre API-Version angehoben hat, bringt Risiko, das niemand bestellt hat.
5. **Geschäftsregel.** Passt die Logik zu den Akzeptanzkriterien, auch bei den Ausnahmen? Bei allem rund um Garantie, Preise oder Kreditlimits würde ich den fachlichen Lead dazuholen.

Verlangen Sie Belege vom Partner. Anthropic formuliert es in seinem Leitfaden treffend: „All tests pass“ allein sagt wenig, der ausgeführte Befehl und seine Ausgabe sagen mehr. Ich möchte den Testlauf und das Ergebnis von Code Analyzer im Pull Request sehen, dazu einen Hinweis, welche Teile ein Agent erzeugt hat. Das gehört in den Vertrag, wie in [Regeln für Partner, die mit KI programmieren](../partner-ki-coding-regeln-vertrag/) beschrieben, und ist Teil meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).

## Rechenbeispiel: eine Story im Händlerportal

Nehmen wir einen Maschinenbauer mit einem Händlerportal auf Experience Cloud, Service Cloud und SAP als ERP. Ein Partner setzt die Story „Händler sehen die offenen Garantieanträge zu ihren Maschinen“ um. Alle Zahlen sind Annahmen. Der Pull Request enthält einen Apex-Controller, eine Testklasse, eine Lightning Web Component und zwei neue Felder, rund 400 geänderte Zeilen, die meisten von einem Agenten erzeugt.

Die Pipeline findet in wenigen Minuten zwei Dinge: eine Abfrage nach Garantieanträgen in einer Schleife über die Anlagen des Händlers und eine Hilfsklasse ohne Sharing-Deklaration. Der Partner behebt beides, bevor ein Mensch den Pull Request ansieht.

Das menschliche Review dauert rund 45 Minuten und findet drei Punkte, die kein Werkzeug meldet:

- Die Testklasse legt eine Anlage und einen Antrag an und prüft, ob das Ergebnis nicht null ist. Die Abdeckung liegt bei 92 Prozent. Der Test wäre auch grün, wenn der Controller alle Anträge der Org zurückgäbe.
- Die Abfrage filtert auf ein Feld für das Garantieende aus einer alten Migration, das niemand mehr pflegt. Das Feld, das die SAP-Schnittstelle aktualisiert, heißt ähnlich.
- Der Controller läuft `without sharing`, mit dem Kommentar „needed for portal users“. Damit könnte ein Händler Anträge zu Maschinen sehen, die andere Händler verkauft haben.

Der dritte Fund ist der teure. In Produktion wäre das ein Datenabfluss zwischen konkurrierenden Händlern, und keine Abdeckungszahl hätte ihn gezeigt. Dagegen sind 45 Minuten Review günstig.

## Freigabe für Sharing und Datenmodell auf der Kundenseite halten

```schritte
Haupt-Branches schützen
  Verlangen Sie für Änderungen an Datenmodell, Sharing, Schnittstellen und Portalzugriff die Freigabe einer Person auf Ihrer Seite.
Prüfungen vor jeden Merge
  Setzen Sie Code Analyzer, Apex-Tests und ein Validierungsdeployment vor jeden Merge, in einer Pipeline, die Ihnen gehört. Das ist der Kern meiner Arbeit in [DevOps und Release Management](../../leistungen/devops-und-release-management/).
Review-Checkliste schreiben
  Schreiben Sie eine einseitige Checkliste mit den sechs Fehlern oben und geben Sie sie jedem Partner.
Belege verlangen
  Verlangen Sie im Pull Request Testausgabe, Ergebnis von Code Analyzer und gekennzeichnete KI-Anteile.
Pull Requests klein halten
  Eine Story pro Pull Request; ein Agenten-Diff mit 400 Zeilen lässt sich prüfen, einer mit 4.000 Zeilen wird durchgewunken.
Funde zählen
  Zählen Sie Review-Funde nach Kategorie. Nach einigen Sprints wissen Sie, welche Regeln in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/) gehören und welche Prüfung in der Pipeline fehlt.
```
