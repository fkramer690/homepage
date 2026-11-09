---
title: "Quality Gates für KI-Code in der Salesforce-Pipeline"
description: "Welche automatischen Prüfungen KI-generierter Salesforce-Code vor dem Go-live bestehen muss, welche davon den Merge sperren und wem sie gehören sollten."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: quality-gates-ki-code-salesforce-pipeline
translationKey: quality-gates-ai-code-pipeline
topic: devops
categories: [devops, ai]
tags: [Quality Gates, KI-Coding, Code Analyzer, sfdx-hardis, DevOps, Maschinenbau]
takeaways:
  - "Prüfungen, die ein Coding-Agent auf dem Rechner des Partners ausführt, ersetzen nicht die Pipeline, die dem Kunden gehört."
  - "Die Codeanalyse stoppt erst etwas, wenn Sie festlegen, ab welcher Schwere der Build rot wird. Ich würde ab High sperren und den Rest berichten."
  - "Ein Probedeployment in eine Integrations-Sandbox fängt erfundene Felder und fehlende Abhängigkeiten ab, bevor jemand Zeit ins Review steckt."
  - "ApexGuru wird in Produktion oder Full Copy aktiviert und nutzt Laufzeitdaten von dort. In der Pipeline behandle ich es als Bericht, nicht als Sperre."
  - "sfdx-hardis deckt Testdeployment und Codequalität als Open Source unter AGPL-3.0 ab. Eine Prüfung auf ungefragte API-Versionswechsel ergänzen Sie selbst."
faq:
  - q: "Welche Quality Gates braucht KI-generierter Salesforce-Code?"
    a: "Mindestens Salesforce Code Analyzer mit festem Regelsatz und Schwellenwert, ein Probedeployment mit Apex-Tests gegen eine Integrations-Sandbox, einige eigene Regeln wie eine Prüfung der API-Version und Branch-Schutz, der den Merge sperrt, bis alles grün ist. Vor dem Release kommt eine eigene Validierung gegen Produktion."
  - q: "Ersetzen die Prüfungen, die ein Coding-Agent selbst ausführt, die Pipeline?"
    a: "Nein. Die Salesforce-Skills für Claude Code führen Code Analyzer und Apex-Tests aus, bevor sie fertig melden, aber auf dem Rechner des Entwicklers. Selbst mit der Konfiguration aus dem Repository kann der Kunde nicht nachprüfen, ob sie liefen oder verändert wurden. Maßgeblich ist die Prüfung in einer Pipeline, die dem Kunden gehört, mit denselben Schwellen für jeden Partner."
  - q: "Sollte ApexGuru einen Merge blockieren?"
    a: "Ich würde es nicht blockierend einsetzen. ApexGuru muss in einer Produktions- oder Full-Copy-Org aktiviert werden und priorisiert Befunde mit Laufzeitdaten von dort. Nach der Aktivierung zeigt Code Analyzer die Hinweise auch in Developer-Sandboxes, Scratch Orgs und CI/CD. Nutzen Sie es als Bericht am Pull Request und als regelmäßigen Scan des Haupt-Branches."
  - q: "Bringt sfdx-hardis Quality Gates mit?"
    a: "Ja. Pull Requests in einen Hauptzweig wie integration starten einen Job, der das Deployment simuliert, Apex-Tests ausführt und die Abdeckung prüft, und einen Codequalitätsjob mit MegaLinter und PMD. Ob die Jobs den Merge sperren, hängt von den Pflichtprüfungen Ihrer Git-Plattform ab. ApexGuru und org-spezifische Regeln brauchen eigene Schritte."
draft: false
---

KI-generierter Salesforce-Code sollte dieselben Quality Gates bestehen wie Code, den ein Mensch geschrieben hat, unter drei Bedingungen: Die Gates können eine Änderung stoppen, sie laufen in einer Pipeline, die Ihnen gehört, und sie gelten für jeden Partner gleich. Konkret sind das vier sperrende Prüfungen bei jedem Pull Request, dem Änderungsvorschlag, den ein Entwickler einreicht, bevor Code in den Hauptzweig kommt: Codeanalyse mit fester Schwelle, einige Regeln für typische Fehler von Agenten, ein Probedeployment in eine Sandbox und ein geschützter Merge. ApexGuru liefert Performance-Hinweise als Bericht. Was eine Regel nicht entscheiden kann, bleibt beim menschlichen Reviewer.

## Rechenbeispiel: Das Ersatzteil ist plötzlich nicht mehr auf Lager

Angenommen sei ein Maschinenbauer mit SAP S/4, Service Cloud, Field Service für 150 Techniker und einem Händlerportal. Zwei Partner, einer onshore und einer nearshore, setzen seit diesem Jahr Coding-Agenten ein. Alle Zahlen sind Annahmen. Die Pull Requests steigen von etwa 60 auf 110 im Monat; auf Kundenseite prüfen weiterhin ein Architekt und ein Release Manager.

Ein Entwickler des Nearshore-Partners lässt einen Agenten einen Rundungsfehler in der Verfügbarkeitsprüfung für Ersatzteile beheben, die Techniker in der mobilen App nutzen. Der Agent behebt ihn, schreibt einen Test und stellt die Klasse nebenbei von API 66.0 auf 68.0 um. Ab 67.0 sieht der Code nur noch die Datensätze, die der angemeldete Techniker sehen darf. Haben Techniker keinen Zugriff auf den Bestand im Zentrallager, fallen diese Teile aus dem Ergebnis. Der Test läuft nicht als Techniker, also besteht er. Die Codeanalyse ist grün, das Testdeployment ist grün, die Abdeckung liegt bei 91 Prozent.

```vergleich
ohne: Ohne Prüfung auf Versionswechsel
- * Codeanalyse, Tests und Abdeckung sind grün.
- Techniker sehen „nicht auf Lager“ für Teile im Zentrallager.
- Disponenten bestellen per Eilauftrag Teile, die schon da sind.
mit: Mit Prüfung auf Versionswechsel
- * Die Pipeline stoppt den Pull Request, bevor ihn jemand prüft.
- Jemand entscheidet, ob Techniker den Zentralbestand sehen dürfen; danach folgen Freigaben oder ein dokumentierter System Mode.
- Die fehlenden Datensätze fallen vor dem Release auf.
zitat: Eine grüne Pipeline prüft nur, was jemand vorher als Prüfung eingebaut hat.
```

Diese Prüfung ist ein kurzes Skript, etwa ein Nachmittag Arbeit. Dagegen steht Pipeline-Zeit: Bei 25 Minuten pro Testdeployment bedeuten 110 Pull Requests mindestens 46 Stunden im Monat, mehr mit jedem neuen Commit oder Wiederholungslauf. Das kostet CI-Minuten, und längere Warteschlangen verzögern auch die Rückmeldung an die Entwickler. Warum der Versionswechsel so viel ändert, steht in [API 67.0 und User Mode](../api-67-apex-user-mode-weniger-datensaetze/).

## Die eigenen Prüfungen des Partners reichen nicht

Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) zeigt: KI-Nutzung erhöht den Durchsatz in der Softwareauslieferung, hängt aber weiterhin negativ mit deren Stabilität zusammen. Die Begründung: Ohne robuste Kontrollsysteme wie automatisierte Tests, ausgereifte Versionskontrolle und schnelle Rückmeldung führt mehr Änderungsvolumen zu Instabilität. In einem Salesforce-Programm ist die Pipeline dieses Kontrollsystem.

Die Salesforce-eigenen Skills für Claude Code prüfen schon auf dem Entwicklerrechner einiges. Laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) lehnen sie Datenbankabfragen in Schleifen ab, führen Code Analyzer und die Apex-Tests aus und sorgen für 75 Prozent Abdeckung, bevor sie fertig melden. Derselbe Beitrag empfiehlt trotzdem, Code Analyzer „manually as an extra safety check“ laufen zu lassen.

Für Sie als Kunde ist eine Prüfung auf dem Laptop eines Partners dessen Wort. Skills lassen sich pro Projekt mit der Konfiguration aus dem Repository installieren, trotzdem können Sie nicht nachprüfen, ob die Prüfung lief, ob sie verändert wurde und ob ihr Ergebnis den Merge steuert. Maßgeblich ist die Prüfung in einer Pipeline, die Ihnen gehört, mit denselben Schwellen für jeden Partner. Tests ohne Aussage, falsche Felder und Geschäftsregeln brauchen weiterhin einen Menschen; diese Aufteilung beschreibe ich in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

## Welche Quality Gates muss KI-generierter Code bestehen?

Ich würde vier sperrende Prüfungen und einen Bericht in dieser Reihenfolge laufen lassen, damit die günstigen zuerst scheitern.

```tabelle
titel: Die Prüfungen bei jedem Pull Request
spalten: Prüfung | Was sie stoppt | Sperrt den Merge? | Wem sie gehört
Codeanalyse | Bekannte Sicherheits- und Performancefehler | Ja, ab Schwere High * | Kunde legt die Schwelle fest
Regeln für Agenten | Ungefragte Versionswechsel, fest eingetragene Adressen | Ja * | Architekt des Kunden
Testdeployment | Erfundene Felder, fehlende Abhängigkeiten, rote Tests | Ja * | Pipeline, Integrations-Sandbox
ApexGuru | Langsamer Code unter echter Last | Nein, nur Bericht | Release Manager je Release
Merge-Sperre | Merge eines roten oder veralteten Builds, auch durch Admins | Ja * | Repository-Admin auf Kundenseite
fazit: Annahme für ein Programm mit mehreren Partnern. Schwellen und Verantwortliche gehören in den Partnervertrag.
```

**Codeanalyse.** [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) prüft Apex, Lightning-Komponenten und Flows auf bekannte Sicherheits- und Performanceprobleme. Von sich aus schreibt er nur einen Bericht und wählt nur Regeln mit dem Tag Recommended. Ich würde Engines und Regeln in einer Konfigurationsdatei festlegen, die der Kunde freigibt, ihn vom ersten Tag an ab Schwere High sperren lassen und alles darunter berichten. Auch Ausnahmen brauchen einen Verantwortlichen, sonst verkleinert ein Partner den Umfang, ohne die Schwelle anzufassen. Alles zu sperren erzeugt in einer Org mit zehn Jahren Apex Hunderte alter Befunde, und Partner fangen an, Regeln abzuschalten, statt sie zu beheben.

```hinweis achtung
Ein Bericht stoppt nichts. Solange die Pipeline nicht weiß, ab welcher Schwere sie scheitern soll, bleibt sie grün, egal was die Analyse findet.
```

**Regeln für Agenten.** Die Standardregeln kennen Ihre Org nicht. Zwei Ergänzungen lohnen sich bei KI-generiertem Code: eigene Regeln für Muster, die Sie nie wollen, etwa fest eingetragene Adressen, wo Ihre SAP-Schnittstelle eine hinterlegte Verbindung nutzen soll, und die Versionsprüfung aus dem Beispiel oben. Erwarten Sie von der Analyse kein Urteil über Testqualität: Ein Test mit einer nichtssagenden Prüfung besteht sie.

**Testdeployment.** Bevor etwas gemergt wird, spielt die Pipeline die Änderung als Probelauf in eine Integrations-Sandbox ein, eine Testkopie Ihrer Org mit allen Feldern, und führt alle eigenen Tests aus. Installiert wird dabei nichts; der Lauf zeigt nur, ob die Änderung dort deployen würde. Dort scheitern ein erfundenes Feld oder eine fehlende Abhängigkeit, bevor ein Mensch prüft. Für Produktionsdeployments mit lokalen Tests verlangt Salesforce 75 Prozent Gesamtabdeckung und ausschließlich bestandene Tests ([Apex Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)); mit ausgewählten Tests braucht jede deployte Klasse und jeder Trigger 75 Prozent. Der Sandbox-Lauf ersetzt die Release-Prüfung nicht: Eine Validierung gegen Produktion lässt sich innerhalb von 10 Tagen ohne erneute Tests ausrollen ([Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)), und diese Job-ID gilt nur für die Org, gegen die validiert wurde.

**ApexGuru.** ApexGuru findet langsame Muster wie Abfragen ohne Begrenzung. Es muss in einer Produktions- oder Full-Copy-Org aktiviert werden und priorisiert Befunde mit den Laufzeitdaten von dort ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). Nach der Aktivierung zeigt Code Analyzer die Hinweise laut [ApexGuru-FAQ](https://help.salesforce.com/s/articleView?id=sf.apexguru_faq.htm&language=en_US&type=5) auch in Developer-Sandboxes, Scratch Orgs und CI/CD. Weil die Gewichtung von der Last in Produktion abhängt, nutze ich ApexGuru als Bericht, nicht als Gate.

**Merge-Sperre.** Prüfungen wirken nur, wenn eine rote Pipeline den Merge stoppt. Auf GitHub können Administratoren den Branch-Schutz umgehen, solange eine eigene Einstellung das nicht verbietet ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Wer die Regeln ändern darf, kann sie trotzdem entfernen; Partner sollten deshalb keine Repository- oder Organisations-Admins sein, und Regeländerungen brauchen eine Protokollierung. Bei mehreren Partnern können zwei Pull Requests einzeln grün sein und zusammen den Hauptzweig brechen; strikte Statusprüfungen oder eine Merge Queue testen den gemeinsamen Stand. Eine Person auf Kundenseite sollte Code Owner für Sharing, Berechtigungen und Schnittstellencode sein.

```vertiefung Für Entwickler
titel: Befehle und Einstellungen hinter den fünf Prüfungen
- **Codeanalyse:** `sf code-analyzer run --severity-threshold 2` (2 ist High) mit Regelauswahl in `code-analyzer.yml` oder die offizielle GitHub Action in Version 2; Version 1 nutzt noch den abgekündigten Code Analyzer v4 ([CI/CD-Integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), [Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).
- **Eigene Regeln:** Regex-Regeln in `code-analyzer.yml` mit Muster, Dateiendungen und Schwere ([Regex-Engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)), etwa `WITH SYSTEM_MODE` ohne schriftliche Begründung. Die PMD-Regel `ApexUnitTestClassShouldHaveAsserts` prüft nur auf „at least one assertion“ ([PMD Best Practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)).
- **Versionsprüfung:** `apiVersion` in geänderten `-meta.xml`-Dateien mit dem Ziel-Branch vergleichen und scheitern, wenn der Wechsel nicht beauftragt war. Ab 67.0 läuft Apex standardmäßig im User Mode ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)), kritisch ist also der Sprung von 66.0 oder älter auf 67.0 oder neuer; er braucht eine Entscheidung zum Zugriff und einen Test mit `System.runAs()` und eingeschränktem Nutzer.
- **Testdeployment:** in der Sandbox `sf project deploy start --dry-run --test-level RunLocalTests`; `deploy validate` soll laut Salesforce nicht gegen Sandboxes laufen. Vor dem Release `sf project deploy validate` gegen Produktion, dann `sf project deploy quick` mit dieser Job-ID. `RunRelevantTests` ist noch Beta.
- **Merge-Sperre:** Required Status Checks im strikten Modus oder eine Merge Queue, Code Owners und „Do not allow bypassing the above settings“ am geschützten Branch.
```

## sfdx-hardis deckt das meiste als Open Source ab

[sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/), Open Source unter AGPL-3.0, startet laut seiner [Dokumentation zu den Pull-Request-Ergebnissen](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/) bei Pull Requests in einen Hauptzweig wie integration zwei Kontrolljobs. Der eine simuliert das Deployment in der Ziel-Org, führt die Tests aus, prüft die Abdeckung und schreibt das Ergebnis als Kommentar in den Pull Request. Der andere prüft die Codequalität und kommentiert seine Befunde ebenfalls. Ein Kommentar ist noch kein Gate: Die Jobs sperren den Merge erst, wenn sie Pflichtprüfungen am geschützten Branch sind. In der dokumentierten Konfiguration darf nur der Release Manager die Fehlerschwelle ändern, und Ausnahmen sind „only for false positives, never to publish faster“ gedacht ([MegaLinter-Fehler](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/)).

ApexGuru und org-spezifische Regeln wie die Versionsprüfung gehören nicht zu den dokumentierten Jobs; ergänzen Sie sie als eigene Schritte. sfdx-hardis führt außerdem eine automatische Korrektur durch einen Coding-Agenten für gescheiterte Deployments, noch als Beta ([Übersicht](https://sfdx-hardis.cloudity.com/salesforce-devops-home/)). Solche Korrekturen würde ich nur annehmen, wenn sie dieselben Prüfungen bestehen und ein Mensch sie prüft. Wie der Rest der Pipeline zusammenpasst, steht in [Warum DevOps über Salesforce-Enterprise-Projekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).

## Schreiben Sie die Prüfungen in jeden Partnervertrag

Diese Prüfungen für Programme mit mehreren Partnern aufzusetzen, ist der Kern meiner Arbeit im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/). Die Reihenfolge zählt, denn ein Partner kann jede Schwelle abschalten, solange die Pipeline ihm gehört.

1. **Die Pipeline gehört Ihnen.** Repository, Pipeline und Schwellen liegen bei Ihnen, wie in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.
2. **Codeanalyse ab High sperren lassen** und den vollständigen Bericht bei jedem Pull Request veröffentlichen.
3. **Jeden Pull Request probeweise deployen**, in eine Integrations-Sandbox und mit allen eigenen Tests, und vor jedem Release gegen Produktion validieren.
4. **Ungefragte Versionswechsel stoppen** und für jeden beauftragten Wechsel einen Test mit eingeschränktem Nutzer verlangen. Dieselbe Regel gehört in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/), damit Agenten sie kennen, bevor die Pipeline sie stoppt.
5. **Den Hauptzweig schützen**, ohne Ausnahme für Admins, mit strikten Prüfungen oder Merge Queue und mit Code Owners auf Ihrer Seite für Sharing und Schnittstellen.
6. **ApexGuru als Bericht nutzen**, aktiviert in einer Org, in der es Laufzeitdaten hat.
7. **Gescheiterte Prüfungen je Partner und Kategorie zählen**, jeden Monat. Eine steigende Kategorie zeigt, welche Regel in der Regeldatei oder im Vertrag fehlt.
