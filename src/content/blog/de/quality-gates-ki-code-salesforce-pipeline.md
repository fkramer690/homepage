---
title: "Quality Gates für KI-Code in der Salesforce-Pipeline"
description: "Welche automatischen Prüfungen KI-generierter Salesforce-Code bestehen muss: Code Analyzer, Validierung, Apex-Tests, ApexGuru, Merge-Sperre und sfdx-hardis."
pubDate: 2026-10-27
lang: de
slug: quality-gates-ki-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [Quality Gates, KI-Coding, Code Analyzer, sfdx-hardis, DevOps, Maschinenbau]
takeaways:
  - "KI-generierter Salesforce-Code sollte bei jedem Pull Request blockierende Prüfungen bestehen: Code Analyzer mit Schwellenwert, Validierungsdeployment mit Apex-Tests, eigene Regeln und eine Merge-Sperre ohne Ausnahme."
  - "Code Analyzer lässt eine Pipeline nur scheitern, wenn ein Fund den --severity-threshold erreicht; ohne diesen Parameter bleibt der Build grün. Ich würde ab High blockieren und den Rest berichten."
  - "Ein Validierungsdeployment führt immer Apex-Tests aus, ohne zu deployen, und liefert eine Job-ID; ein Quick Deploy mit dieser ID überspringt die Tests und ist 10 Tage gültig."
  - "ApexGuru gibt es nur in Produktion und Full-Copy-Sandboxes, die Bewertung nutzt Laufzeitdaten; in der Pipeline behandle ich es als Hinweis, nicht als Merge-Sperre."
  - "sfdx-hardis deckt Validierungs- und Codequalitätsjob als Open Source ab; Regeln für KI-typische Risiken wie angehobene API-Versionen ergänzen Sie selbst."
faq:
  - q: "Welche Quality Gates braucht KI-generierter Salesforce-Code?"
    a: "Mindestens Salesforce Code Analyzer mit Schwellenwert, ein Validierungsdeployment mit Apex-Tests gegen eine Integrations-Sandbox, einige eigene Regeln wie eine Prüfung der API-Version und Branch-Schutz, der den Merge sperrt, bis alles grün ist."
  - q: "Ersetzen die Prüfungen, die ein Coding-Agent selbst ausführt, die Pipeline?"
    a: "Nein. Die Salesforce-Skills für Claude Code führen Code Analyzer und Apex-Tests aus, bevor sie fertig melden, aber auf dem Rechner des Partners und mit dessen Konfiguration. Maßgeblich ist die Prüfung in einer Pipeline, die dem Kunden gehört, mit denselben Schwellen für jeden Partner."
  - q: "Sollte ApexGuru einen Merge blockieren?"
    a: "Ich würde es nicht blockierend einsetzen. ApexGuru gibt es nur in Produktion und Full-Copy-Sandboxes, und die Bewertung nutzt Laufzeitdaten, die einer Pipeline gegen eine Integrations-Sandbox fehlen können. Nutzen Sie es als Bericht am Pull Request und als regelmäßigen Scan des Haupt-Branches."
  - q: "Bringt sfdx-hardis Quality Gates mit?"
    a: "Ja. Jeder Pull Request startet einen Check-Deploy-Job, der das Deployment simuliert, Apex-Tests ausführt und die Abdeckung prüft, und einen Codequalitätsjob mit MegaLinter und PMD. ApexGuru und org-spezifische Regeln gehören nicht zu den dokumentierten Jobs."
draft: false
---

KI-generierter Salesforce-Code sollte dieselben Quality Gates bestehen wie menschlicher Code, aber jede Prüfung muss blockieren, in Ihrer Pipeline laufen und für jeden Partner gleich gelten. Konkret heißt das: Salesforce Code Analyzer mit Schwellenwert bei jedem Pull Request, ein Validierungsdeployment mit Apex-Tests gegen eine Integrations-Sandbox, einige Regeln für Muster, die Agenten falsch machen, und Branch-Schutz, den niemand umgeht. ApexGuru liefert Performance-Hinweise, wo Ihre Org das hergibt. sfdx-hardis deckt das meiste als Open Source ab. Was eine Regel nicht entscheiden kann, bleibt beim menschlichen Reviewer.

## Warum brauchen KI-Coding-Agenten strengere Quality Gates?

Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) zeigt: KI-Nutzung erhöht den Durchsatz in der Softwareauslieferung, hängt aber weiterhin negativ mit deren Stabilität zusammen. Die Begründung: Ohne robuste Kontrollsysteme wie automatisierte Tests, ausgereifte Versionskontrolle und schnelle Rückmeldung führt mehr Änderungsvolumen zu Instabilität. In einem Salesforce-Programm ist die Pipeline dieses Kontrollsystem.

Die Salesforce-eigenen Skills für Claude Code prüfen schon auf dem Entwicklerrechner einiges. Laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) lehnen sie Abfragen in Schleifen ab, erzwingen ein Sharing-Schlüsselwort in jeder Klasse, führen Code Analyzer und `sf apex run test` aus und sorgen für 75 Prozent Abdeckung, bevor sie fertig melden. Derselbe Beitrag empfiehlt trotzdem, Code Analyzer „manually as an extra safety check“ laufen zu lassen. Prüfungen auf dem Laptop eines Partners sind ein Beleg für den Partner; welche Konfiguration lief, sehen Sie nicht. Maßgeblich ist die Prüfung in einer Pipeline, die Ihnen gehört, mit denselben Schwellen für jeden Partner.

Tests ohne Aussage, falsche Felder und Geschäftsregeln brauchen weiterhin einen Menschen; diese Aufteilung beschreibe ich in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

## Welche Quality Gates muss KI-generierter Code bestehen?

Ich würde fünf Prüfungen in dieser Reihenfolge laufen lassen, damit die günstigen zuerst scheitern.

### 1. Code Analyzer mit Schwellenwert

[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) v5 bündelt acht Engines, darunter PMD für Apex, ESLint für JavaScript in Lightning Web Components und einen Flow Scanner, der Sicherheitsprobleme in Flows meldet. In der CI rufen Sie `sf code-analyzer run` auf oder die offizielle GitHub Action in Version 2; Version 1 nutzt noch den abgekündigten Code Analyzer v4 ([CI/CD-Integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html)). Aus einem Bericht wird erst mit `--severity-threshold` eine Sperre: Erreicht oder überschreitet ein Fund diesen Wert, endet der Befehl mit einem Fehlercode ([Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).

```hinweis achtung
Ohne `--severity-threshold` bleibt die Pipeline grün, egal was im Bericht von Code Analyzer steht.
```

Meine Empfehlung: ab dem ersten Tag ab High blockieren und den Rest berichten. Wer in einer Org mit zehn Jahren Apex alles blockiert, bekommt Hunderte Altfunde, und Partner beginnen, Regeln abzuschalten, statt Code zu korrigieren.

### 2. Regeln für das, was Agenten falsch machen

Der Standard-Regelsatz heißt `Recommended` und kennt Ihre Org nicht. Zwei Ergänzungen lohnen sich bei KI-generiertem Code:

- **Eigene Regeln.** Die Regex-Engine nimmt eigene Regeln in `code-analyzer.yml` auf, jeweils mit Muster, Dateiendungen, Beschreibung und Schweregrad ([Regex-Engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)). Kandidaten: `WITH SYSTEM_MODE` ohne schriftliche Begründung oder fest codierte Endpunkte, wo Ihre SAP-Schnittstelle eine Named Credential nutzen soll.
- **Eine Prüfung der API-Version.** Seit API-Version 67.0 läuft Apex standardmäßig im User Mode, und Klassen ohne Sharing-Deklaration laufen im Sharing-Kontext des aktuellen Benutzers ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)). Die Änderung gilt pro Klassenversion, das Risiko steckt also im Versionssprung. Ein kurzes Skript, das die `apiVersion` in geänderten `-meta.xml`-Dateien mit dem Ziel-Branch vergleicht und ohne beauftragten Sprung scheitert, kostet einen Nachmittag. Warum der Sprung zählt, steht in [API 67.0 und User Mode](../api-67-apex-user-mode-weniger-datensaetze/).

Testqualität beurteilt PMD nicht. Die Regel `ApexUnitTestClassShouldHaveAsserts` prüft nur auf „at least one assertion“ ([PMD Best Practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)), `System.assertNotEquals(null, result)` besteht sie also.

### 3. Validierungsdeployment mit Apex-Tests

`sf project deploy validate` prüft, ob ein Deployment gelingen würde, ohne etwas zu deployen. Der Befehl führt immer Apex-Tests aus, standardmäßig `RunLocalTests`, und liefert eine Job-ID. War die Validierung erfolgreich, deployt `sf project deploy quick` mit dieser ID innerhalb von 10 Tagen und überspringt die Tests ([Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)). Für Produktion verlangt Salesforce 75 Prozent Abdeckung, durchgehend grüne Tests und eine Abdeckung für jeden Trigger ([Apex Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)).

Validieren Sie gegen eine Integrations-Sandbox mit vollständigem Feldbestand, auch den Feldern, die Ihre SAP-Schnittstelle pflegt. Dort scheitern erfundene Felder und fehlende Abhängigkeiten, bevor jemand reviewt. `RunRelevantTests`, bei dem Salesforce die Tests auswählt, ist noch Beta; für alles, was Richtung UAT und Produktion geht, würde ich bei `RunLocalTests` bleiben.

### 4. ApexGuru als beratende Prüfung

ApexGuru findet Performance-Antipattern wie SOQL in Schleifen, unbegrenzte Abfragen und teure Schema-Abfragen und scannt in Code Analyzer gegen eine verbundene Org. Laut Salesforce ist ApexGuru „available only in Production and Full Copy Sandbox orgs“ und bewertet den Schweregrad mit Laufzeitdaten von dort ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). Einer Pipeline gegen eine Integrations-Sandbox fehlen diese Daten womöglich, deshalb behandle ich ApexGuru als Bericht, nicht als Merge-Sperre.

### 5. Eine Merge-Sperre ohne Ausnahme

Prüfungen wirken nur, wenn eine rote Pipeline den Merge stoppt. Auf GitHub müssen Required Status Checks bestanden sein, bevor jemand einen geschützten Branch ändert, und Code Owner können als Pflichtfreigabe für ihre Pfade gesetzt werden. Administratoren können beides umgehen, solange „Do not allow bypassing the above settings“ nicht aktiv ist ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Haben Partner Admin-Rechte im Repository, würde ich die Option einschalten und eine Person auf Kundenseite zum Code Owner für Sharing, Permission Sets und Schnittstellenklassen machen.

## Was deckt sfdx-hardis ab?

[sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/) startet laut seiner [Dokumentation zu den Pull-Request-Ergebnissen](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/) bei jedem Pull Request zwei Kontrolljobs:

```vertiefung Für Entwickler
titel: Was die beiden Jobs von sfdx-hardis im Pull Request tun
- **Check-Deploy-Job.** Er simuliert das Deployment in der Ziel-Org, führt die Apex-Tests aus, berechnet die Abdeckung und schreibt das Ergebnis als Kommentar in den Pull Request, mit einem visuellen Diff geänderter Flows. Laut [Übersicht von sfdx-hardis](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) nutzt Quick Deploy die validierte Bereitstellung nach dem Merge erneut.
- **Codequalitätsjob.** Er führt MegaLinter aus, der Apex mit PMD und Lightning Web Components mit ESLint prüft und das Ergebnis im Pull Request kommentiert. In der [dokumentierten Konfiguration](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/) trägt der Schwellenwert für Apex-Fehler den Hinweis, dass nur der Release Manager ihn ändern darf, und `// NOPMD` ist „only for false positives, never to publish faster“ gedacht.
```

Standard-Testlevel ist `RunLocalTests` ([Smart Deployment](https://sfdx-hardis.cloudity.com/salesforce-devops-smart-deployment/)). sfdx-hardis führt außerdem ein [Coding Agent Auto-Fix (Beta)](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) für gescheiterte Deployments. Ich würde solche Agentenvorschläge nur zulassen, wenn sie dieselben Prüfungen durchlaufen und eine Person sie prüft.

ApexGuru und org-spezifische Regeln wie die Prüfung der API-Version gehören nicht zu den dokumentierten Jobs; die ergänzen Sie als zusätzliche Schritte. Wie die übrige Pipeline aufgebaut ist, steht in [Warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).

## Ein typisches Szenario: zwei Partner und eine Ersatzteilabfrage

Nehmen wir einen Maschinenbauer mit SAP S/4, Service Cloud, Field Service für 150 Servicetechniker im Außendienst und einem Händlerportal. Zwei Partner, einer onshore und einer nearshore, arbeiten seit diesem Jahr mit Coding-Agenten. Alle Zahlen sind Annahmen. Die Zahl der Pull Requests steigt von rund 60 auf 110 im Monat; auf Kundenseite prüfen weiterhin ein Architekt und ein Release Manager.

Ein Nearshore-Entwickler lässt einen Agenten einen Rundungsfehler in einer Klasse zur Ersatzteilverfügbarkeit beheben, die Techniker aus der mobilen App aufrufen. Der Agent behebt den Fehler, ergänzt einen Test und hebt die Klasse nebenbei von API-Version 61.0 auf 67.0. Unter 67.0 laufen ihre Abfragen im User Mode, also mit den Rechten des Technikers. Verbirgt das Sharing-Modell den Bestand im Zentrallager vor Technikern, fallen diese Datensätze aus dem Ergebnis. Der Test legt eigene Daten an und läuft ohne `System.runAs()`, er ist also grün. Code Analyzer ist grün, das Validierungsdeployment ist grün, die Abdeckung liegt bei 91 Prozent.

Die Prüfung der API-Version stoppt den Pull Request. Der Partner setzt die Version zurück oder ergänzt einen `runAs`-Test mit einem eingeschränkten Techniker-Benutzer, der die fehlenden Datensätze zeigt. Ohne diese Prüfung sähen Techniker „nicht auf Lager“ für Teile, die im Zentrallager liegen, und die Disposition löste unnötige Eilbestellungen aus. Dagegen stehen, angenommen mit 25 Minuten pro Validierung, rund 46 Stunden Pipeline-Laufzeit im Monat für 110 Läufe, bezahlt in CI-Minuten, nicht in Arbeitszeit.

## Wo fangen Sie an?

1. **Die Pipeline gehört Ihnen.** Repository, Pipeline und Schwellenwerte liegen bei Ihnen, wie in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.
2. **Schalten Sie Code Analyzer mit `--severity-threshold`** auf High und veröffentlichen Sie den vollständigen Bericht bei jedem Pull Request.
3. **Validieren Sie jeden Pull Request** gegen eine Integrations-Sandbox mit `RunLocalTests` und nutzen Sie Quick Deploy für Releases.
4. **Ergänzen Sie die Prüfung der API-Version** und die Regel, dass ein Versionssprung einen `runAs`-Test braucht. Schreiben Sie dieselbe Regel in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/), damit Agenten sie kennen, bevor die Prüfung sie stoppt.
5. **Schützen Sie die Branches** ohne Admin-Ausnahme, mit Code Ownern auf Kundenseite für Sharing und Schnittstellen.
6. **Lassen Sie ApexGuru** auf dem Haupt-Branch gegen eine Org mit Laufzeitdaten laufen und sehen Sie die Funde je Release durch.
7. **Zählen Sie gescheiterte Prüfungen** jeden Monat nach Partner und Kategorie. Eine steigende Kategorie zeigt, welche Regel in der Regeldatei oder im Vertrag fehlt.

Diese Prüfungen für Programme mit mehreren Partnern aufzusetzen ist der Kern meiner Arbeit in [DevOps und Release Management](../../leistungen/devops-und-release-management/).

Quality Gates machen KI-generierten Code genau so sicher wie die Regeln, die sie durchsetzen, und diese Regeln gehören in Ihre Pipeline, nicht in den Prompt eines Partners. Wenn Sie eine zweite Meinung zu Ihren Prüfungen möchten, [schreiben Sie mir](#contact).
