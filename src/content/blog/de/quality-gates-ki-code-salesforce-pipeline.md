---
title: "Quality Gates für KI-Code in der Salesforce-Pipeline"
description: "Welche automatischen Prüfungen KI-generierter Salesforce-Code vor dem Go-live bestehen muss, welche davon den Merge sperren und wem sie gehören sollten."
pubDate: 2026-10-27
updatedDate: 2026-11-05
lang: de
slug: quality-gates-ki-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [Quality Gates, KI-Coding, Code Analyzer, sfdx-hardis, DevOps, Maschinenbau]
takeaways:
  - "Prüfungen, die ein Coding-Agent auf dem Rechner des Partners ausführt, ersetzen nicht die Pipeline, die dem Kunden gehört."
  - "Die Codeanalyse stoppt erst etwas, wenn Sie festlegen, ab welcher Schwere der Build rot wird. Ich würde ab High sperren und den Rest berichten."
  - "Ein Testdeployment in eine Integrations-Sandbox fängt erfundene Felder und fehlende Abhängigkeiten ab, bevor jemand Zeit ins Review steckt."
  - "ApexGuru gibt es nur in Produktion und Full-Copy-Sandboxes. In der Pipeline behandle ich es als Bericht, nicht als Merge-Sperre."
  - "sfdx-hardis deckt Testdeployment und Codequalität als Open Source ab. Eine Prüfung auf ungefragte API-Versionswechsel ergänzen Sie selbst."
faq:
  - q: "Welche Quality Gates braucht KI-generierter Salesforce-Code?"
    a: "Mindestens Salesforce Code Analyzer mit Schwellenwert, ein Validierungsdeployment mit Apex-Tests gegen eine Integrations-Sandbox, einige eigene Regeln wie eine Prüfung der API-Version und Branch-Schutz, der den Merge sperrt, bis alles grün ist."
  - q: "Ersetzen die Prüfungen, die ein Coding-Agent selbst ausführt, die Pipeline?"
    a: "Nein. Die Salesforce-Skills für Claude Code führen Code Analyzer und Apex-Tests aus, bevor sie fertig melden, aber auf dem Rechner des Partners und mit dessen Konfiguration. Maßgeblich ist die Prüfung in einer Pipeline, die dem Kunden gehört, mit denselben Schwellen für jeden Partner."
  - q: "Sollte ApexGuru einen Merge blockieren?"
    a: "Ich würde es nicht blockierend einsetzen. ApexGuru gibt es nur in Produktion und Full-Copy-Sandboxes, und die Bewertung nutzt Laufzeitdaten, die einer Pipeline gegen eine Integrations-Sandbox fehlen können. Nutzen Sie es als Bericht am Pull Request und als regelmäßigen Scan des Haupt-Branches."
  - q: "Bringt sfdx-hardis Quality Gates mit?"
    a: "Ja. Jeder Pull Request startet einen Job, der das Deployment simuliert, Apex-Tests ausführt und die Abdeckung prüft, und einen Codequalitätsjob mit MegaLinter und PMD. ApexGuru und org-spezifische Regeln gehören nicht zu den dokumentierten Jobs."
draft: false
---

KI-generierter Salesforce-Code sollte dieselben Quality Gates bestehen wie Code, den ein Mensch geschrieben hat, unter drei Bedingungen: Jede Prüfung kann eine Änderung stoppen, sie läuft in einer Pipeline, die Ihnen gehört, und sie gilt für jeden Partner gleich. Konkret sind das fünf Prüfungen bei jedem Pull Request, dem Änderungsvorschlag, den ein Entwickler einreicht, bevor Code in den Hauptzweig kommt: Codeanalyse mit fester Schwelle, einige Regeln für typische Fehler von Agenten, ein Testdeployment in eine Sandbox, Performance-Hinweise von ApexGuru und eine Merge-Sperre, die niemand umgehen kann. Was eine Regel nicht entscheiden kann, bleibt beim menschlichen Reviewer.

## Rechenbeispiel: Das Ersatzteil ist plötzlich nicht mehr auf Lager

Angenommen sei ein Maschinenbauer mit SAP S/4, Service Cloud, Field Service für 150 Techniker und einem Händlerportal. Zwei Partner, einer onshore und einer nearshore, setzen seit diesem Jahr Coding-Agenten ein. Alle Zahlen sind Annahmen. Die Pull Requests steigen von etwa 60 auf 110 im Monat; auf Kundenseite prüfen weiterhin ein Architekt und ein Release Manager.

Ein Entwickler des Nearshore-Partners lässt einen Agenten einen Rundungsfehler in der Verfügbarkeitsprüfung für Ersatzteile beheben, die Techniker in der mobilen App nutzen. Der Agent behebt ihn, schreibt einen Test und stellt den Code nebenbei auf eine neuere Salesforce-API-Version um. Unter dieser Version sieht der Code nur noch die Datensätze, die der angemeldete Techniker sehen darf. Haben Techniker keinen Zugriff auf den Bestand im Zentrallager, fallen diese Teile aus dem Ergebnis. Der Test läuft nicht als Techniker, also besteht er. Die Codeanalyse ist grün, das Testdeployment ist grün, die Abdeckung liegt bei 91 Prozent.

```vergleich
ohne: Ohne Prüfung auf Versionswechsel
- Codeanalyse, Tests und Abdeckung sind grün.
- Techniker sehen „nicht auf Lager“ für Teile im Zentrallager.
- Disponenten bestellen per Eilauftrag Teile, die schon da sind.
mit: Mit Prüfung auf Versionswechsel
- Die Pipeline stoppt den Pull Request, bevor ihn jemand prüft.
- Der Partner nimmt die Version zurück oder testet als Techniker.
- Die fehlenden Datensätze fallen vor dem Release auf.
```

Diese Prüfung ist ein kurzes Skript, etwa ein Nachmittag Arbeit. Dagegen steht Pipeline-Zeit: Bei 25 Minuten pro Testdeployment sind 110 Läufe rund 46 Stunden im Monat, bezahlt in CI-Minuten, nicht in Kalendern. Warum der Versionswechsel so viel ändert, steht in [API 67.0 und User Mode](../api-67-apex-user-mode-weniger-datensaetze/).

## Die eigenen Prüfungen des Partners reichen nicht

Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) zeigt: KI-Nutzung erhöht den Durchsatz in der Softwareauslieferung, hängt aber weiterhin negativ mit deren Stabilität zusammen. Die Begründung: Ohne robuste Kontrollsysteme wie automatisierte Tests, ausgereifte Versionskontrolle und schnelle Rückmeldung führt mehr Änderungsvolumen zu Instabilität. In einem Salesforce-Programm ist die Pipeline dieses Kontrollsystem.

Die Salesforce-eigenen Skills für Claude Code prüfen schon auf dem Entwicklerrechner einiges. Laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) lehnen sie Datenbankabfragen in Schleifen ab, führen Code Analyzer und die Apex-Tests aus und sorgen für 75 Prozent Abdeckung, bevor sie fertig melden. Derselbe Beitrag empfiehlt trotzdem, Code Analyzer „manually as an extra safety check“ laufen zu lassen.

Für Sie als Kunde ist eine Prüfung auf dem Laptop eines Partners dessen Wort. Welche Konfiguration lief und welche Regeln abgeschaltet waren, sehen Sie nicht. Maßgeblich ist die Prüfung in einer Pipeline, die Ihnen gehört, mit denselben Schwellen für jeden Partner. Tests ohne Aussage, falsche Felder und Geschäftsregeln brauchen weiterhin einen Menschen; diese Aufteilung beschreibe ich in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

## Welche Quality Gates muss KI-generierter Code bestehen?

Ich würde fünf Prüfungen in dieser Reihenfolge laufen lassen, damit die günstigen zuerst scheitern.

```tabelle
titel: Die fünf Prüfungen bei jedem Pull Request
spalten: Prüfung | Was sie stoppt | Sperrt den Merge? | Wem sie gehört
Codeanalyse | Bekannte Sicherheits- und Performancefehler | Ja, ab Schwere High * | Kunde legt die Schwelle fest
Regeln für Agenten | Ungefragte Versionswechsel, fest eingetragene Adressen | Ja * | Architekt des Kunden
Testdeployment | Erfundene Felder, fehlende Abhängigkeiten, rote Tests | Ja * | Pipeline, Integrations-Sandbox
ApexGuru | Langsamer Code unter echter Last | Nein, nur Bericht | Release Manager je Release
Merge-Sperre | Merge eines roten Builds, auch durch Admins | Ja * | Code Owner auf Kundenseite
fazit: Annahme für ein Programm mit mehreren Partnern. Schwellen und Verantwortliche gehören in den Partnervertrag.
```

**Codeanalyse.** [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) prüft Apex, Lightning-Komponenten und Flows auf bekannte Sicherheits- und Performanceprobleme. Von sich aus schreibt er nur einen Bericht. Ich würde ihn vom ersten Tag an ab Schwere High sperren lassen und alles darunter berichten. Alles zu sperren erzeugt in einer Org mit zehn Jahren Apex Hunderte alter Befunde, und Partner fangen an, Regeln abzuschalten, statt sie zu beheben.

```hinweis achtung
Ein Bericht stoppt nichts. Solange die Pipeline nicht weiß, ab welcher Schwere sie scheitern soll, bleibt sie grün, egal was die Analyse findet.
```

**Regeln für Agenten.** Die Standardregeln kennen Ihre Org nicht. Zwei Ergänzungen lohnen sich bei KI-generiertem Code: eigene Regeln für Muster, die Sie nie wollen, etwa fest eingetragene Adressen, wo Ihre SAP-Schnittstelle eine hinterlegte Verbindung nutzen soll, und die Versionsprüfung aus dem Beispiel oben. Erwarten Sie von der Analyse kein Urteil über Testqualität: Ein Test mit einer nichtssagenden Prüfung besteht sie.

**Testdeployment.** Bevor etwas gemergt wird, spielt die Pipeline die Änderung probeweise in eine Integrations-Sandbox ein, eine Testkopie Ihrer Org mit allen Feldern, und führt alle eigenen Tests aus. Installiert wird dabei nichts; der Lauf zeigt nur, ob das Release funktionieren würde. Dort scheitern ein erfundenes Feld oder eine fehlende Abhängigkeit, bevor ein Mensch prüft. Für Produktion verlangt Salesforce 75 Prozent Testabdeckung und ausschließlich bestandene Tests ([Apex Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)). Ein erfolgreicher Lauf lässt sich innerhalb von 10 Tagen ohne erneute Tests ausrollen ([Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)).

**ApexGuru.** ApexGuru findet langsame Muster wie Abfragen ohne Begrenzung. Laut Salesforce ist es „available only in Production and Full Copy Sandbox orgs“ und bewertet Befunde mit den Laufzeitdaten von dort ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). Einer Pipeline gegen eine Integrations-Sandbox fehlen diese Daten womöglich, deshalb nutze ich ApexGuru als Bericht je Release.

**Merge-Sperre.** Prüfungen wirken nur, wenn eine rote Pipeline den Merge stoppt. Auf GitHub können Administratoren den Branch-Schutz umgehen, solange eine eigene Einstellung das nicht verbietet ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Haben Partner-Admins Zugriff auf das Repository, würde ich diese Einstellung einschalten und eine Person auf Kundenseite zum Code Owner für Sharing, Berechtigungen und Schnittstellencode machen.

```vertiefung Für Entwickler
titel: Befehle und Einstellungen hinter den fünf Prüfungen
- **Codeanalyse:** `sf code-analyzer run --severity-threshold 2` (2 ist High) oder die offizielle GitHub Action in Version 2; Version 1 nutzt noch den abgekündigten Code Analyzer v4 ([CI/CD-Integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), [Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).
- **Eigene Regeln:** Regex-Regeln in `code-analyzer.yml` mit Muster, Dateiendungen und Schwere ([Regex-Engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)), etwa `WITH SYSTEM_MODE` ohne schriftliche Begründung. Die PMD-Regel `ApexUnitTestClassShouldHaveAsserts` prüft nur auf „at least one assertion“ ([PMD Best Practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)).
- **Versionsprüfung:** `apiVersion` in geänderten `-meta.xml`-Dateien mit dem Ziel-Branch vergleichen und scheitern, wenn der Wechsel nicht beauftragt war. Ab 67.0 läuft Apex standardmäßig im User Mode ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)); ein Wechsel braucht einen Test mit `System.runAs()` und eingeschränktem Nutzer.
- **Testdeployment:** `sf project deploy validate` mit `RunLocalTests`, Release mit `sf project deploy quick` und der Job-ID. `RunRelevantTests` ist noch Beta.
- **Merge-Sperre:** Required Status Checks, Code Owners und „Do not allow bypassing the above settings“ am geschützten Branch.
```

## sfdx-hardis deckt das meiste als Open Source ab

[sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/) startet laut seiner [Dokumentation zu den Pull-Request-Ergebnissen](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/) bei jedem Pull Request zwei Kontrolljobs. Der eine simuliert das Deployment in der Ziel-Org, führt die Tests aus, prüft die Abdeckung und schreibt das Ergebnis als Kommentar in den Pull Request. Der andere prüft die Codequalität und kommentiert seine Befunde ebenfalls. In der dokumentierten Konfiguration darf nur der Release Manager die Fehlerschwelle ändern, und Ausnahmen sind „only for false positives, never to publish faster“ gedacht ([MegaLinter-Fehler](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/)).

ApexGuru und org-spezifische Regeln wie die Versionsprüfung gehören nicht zu den dokumentierten Jobs; ergänzen Sie sie als eigene Schritte. sfdx-hardis führt außerdem eine automatische Korrektur durch einen Coding-Agenten für gescheiterte Deployments, noch als Beta ([Übersicht](https://sfdx-hardis.cloudity.com/salesforce-devops-home/)). Solche Korrekturen würde ich nur annehmen, wenn sie dieselben Prüfungen bestehen und ein Mensch sie prüft. Wie der Rest der Pipeline zusammenpasst, steht in [Warum DevOps über Salesforce-Enterprise-Projekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).

## Schreiben Sie die Prüfungen in jeden Partnervertrag

Diese Prüfungen für Programme mit mehreren Partnern aufzusetzen, ist der Kern meiner Arbeit im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/). Die Reihenfolge zählt, denn ein Partner kann jede Schwelle abschalten, solange die Pipeline ihm gehört.

1. **Die Pipeline gehört Ihnen.** Repository, Pipeline und Schwellen liegen bei Ihnen, wie in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.
2. **Codeanalyse ab High sperren lassen** und den vollständigen Bericht bei jedem Pull Request veröffentlichen.
3. **Jeden Pull Request testweise deployen**, in eine Integrations-Sandbox und mit allen eigenen Tests.
4. **Ungefragte Versionswechsel stoppen** und für jeden beauftragten Wechsel einen Test mit eingeschränktem Nutzer verlangen. Dieselbe Regel gehört in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/), damit Agenten sie kennen, bevor die Pipeline sie stoppt.
5. **Den Hauptzweig schützen**, ohne Ausnahme für Admins und mit Code Owners auf Ihrer Seite für Sharing und Schnittstellen.
6. **ApexGuru je Release laufen lassen**, gegen eine Org, in der es Laufzeitdaten hat.
7. **Gescheiterte Prüfungen je Partner und Kategorie zählen**, jeden Monat. Eine steigende Kategorie zeigt, welche Regel in der Regeldatei oder im Vertrag fehlt.
