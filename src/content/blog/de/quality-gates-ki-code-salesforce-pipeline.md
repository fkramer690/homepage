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
  - "Die Codeanalyse stoppt einen Build erst, wenn Sie festlegen, ab welcher Schwere der Build rot wird. Ich würde ab High sperren und den Rest berichten."
  - "Ein Dry-Run-Deployment in eine Integrations-Sandbox fängt erfundene Felder und fehlende Abhängigkeiten ab, bevor jemand Zeit in das Review investiert."
  - "ApexGuru wird in Produktion oder Full Copy aktiviert und nutzt Laufzeitdaten aus dieser Umgebung. In der Pipeline behandle ich es als Bericht, nicht als Sperre."
  - "sfdx-hardis deckt Dry-Run-Deployment und Codequalität als Open Source unter AGPL-3.0 ab. Eine Prüfung auf ungefragte API-Versionswechsel ergänzen Sie selbst."
faq:
  - q: "Welche Quality Gates braucht KI-generierter Salesforce-Code?"
    a: "Mindestens Salesforce Code Analyzer mit festem Regelsatz und Schwellenwert, ein Dry-Run-Deployment mit Apex-Tests gegen eine Integrations-Sandbox, einige eigene Regeln wie eine Prüfung der API-Version und Branch-Schutz, der den Merge sperrt, bis alles grün ist. Vor dem Release folgt eine eigene Validierung gegen Produktion."
  - q: "Ersetzen die Prüfungen, die ein Coding-Agent selbst ausführt, die Pipeline?"
    a: "Nein. Die Salesforce-Skills für Claude Code führen Code Analyzer und Apex-Tests aus, bevor sie fertig melden, jedoch auf dem Rechner des Entwicklers. Selbst mit der Konfiguration aus dem Repository kann der Kunde nicht nachprüfen, ob sie ausgeführt oder verändert wurden. Maßgeblich ist die Prüfung in einer Pipeline, die dem Kunden gehört, mit denselben Schwellen für jeden Partner."
  - q: "Sollte ApexGuru einen Merge blockieren?"
    a: "Ich würde es nicht blockierend einsetzen. ApexGuru muss in einer Produktions- oder Full-Copy-Org aktiviert werden und priorisiert Befunde mit Laufzeitdaten aus dieser Org. Nach der Aktivierung zeigt Code Analyzer die Hinweise auch in Developer-Sandboxes, Scratch Orgs und CI/CD. Nutzen Sie es als Bericht am Pull Request und als regelmäßigen Scan des Haupt-Branches."
  - q: "Bringt sfdx-hardis Quality Gates mit?"
    a: "Ja. Für Pull Requests in einen Hauptzweig wie integration wird ein Job gestartet, der das Deployment simuliert, Apex-Tests ausführt und die Abdeckung prüft, und einen Codequalitätsjob mit MegaLinter und PMD. Ob die Jobs den Merge sperren, hängt von den Pflichtprüfungen Ihrer Git-Plattform ab. Für ApexGuru und org-spezifische Regeln sind eigene Schritte erforderlich."
draft: false
---

KI-generierter Salesforce-Code sollte dieselben Quality Gates bestehen wie Code, den ein Mensch geschrieben hat. Dafür müssen drei Bedingungen gelten: Die Gates können eine Änderung stoppen, sie laufen in einer Pipeline, die Ihnen gehört, und sie gelten für jeden Partner gleich. Konkret sind das vier sperrende Prüfungen bei jedem Pull Request, dem Änderungsvorschlag, den ein Entwickler einreicht, bevor Code in den Hauptzweig übernommen wird: Codeanalyse mit fester Schwelle, einige Regeln für typische Fehler von Agenten, ein Dry-Run-Deployment in eine Sandbox und ein geschützter Merge. ApexGuru liefert Performance-Hinweise als Bericht. Was sich nicht durch eine Regel entscheiden lässt, bleibt beim menschlichen Reviewer.

## Praxisbeispiel: Das Ersatzteil ist plötzlich nicht mehr auf Lager

Angenommen sei ein Maschinenbauer mit SAP S/4, Service Cloud, Field Service für 150 Techniker und einem Händlerportal. Zwei Partner, einer onshore und einer nearshore, setzen seit diesem Jahr Coding-Agenten ein. Alle Zahlen sind Annahmen. Die Pull Requests steigen von etwa 60 auf 110 im Monat; auf Kundenseite prüfen weiterhin ein Architekt und ein Release Manager.

Ein Entwickler des Nearshore-Partners lässt einen Agenten einen Rundungsfehler in der Verfügbarkeitsprüfung für Ersatzteile beheben, die Techniker in der mobilen App nutzen. Der Agent behebt ihn, schreibt einen Test und stellt dabei die Klasse von API 66.0 auf 68.0 um. Ab 67.0 berücksichtigt der Code nur noch die Datensätze, die der angemeldete Techniker sehen darf. Haben Techniker keinen Zugriff auf den Bestand im Zentrallager, werden diese Teile im Ergebnis nicht berücksichtigt. Der Test wird nicht als Techniker ausgeführt, also besteht er. Die Codeanalyse ist grün, das Dry-Run-Deployment ist grün, die Abdeckung liegt bei 91 Prozent.

```vergleich
ohne: Ohne Prüfung auf Versionswechsel
- * Codeanalyse, Tests und Abdeckung sind grün.
- Techniker sehen „nicht auf Lager“ für Teile im Zentrallager.
- Disponenten bestellen per Eilauftrag Teile, die bereits vorhanden sind.
mit: Mit Prüfung auf Versionswechsel
- * Die Pipeline stoppt den Pull Request, bevor ihn jemand prüft.
- Jemand entscheidet, ob Techniker den Zentralbestand sehen dürfen; danach werden die Freigabeeinstellungen angepasst oder ein dokumentierter System Mode eingesetzt.
- Die fehlenden Datensätze fallen vor dem Release auf.
zitat: Eine grüne Pipeline prüft nur, was jemand vorher als Prüfung eingebaut hat.
```

Diese Prüfung lässt sich mit einem kurzen Skript umsetzen; der Aufwand beträgt etwa einen Nachmittag. Demgegenüber steht die Pipeline-Laufzeit: Bei 25 Minuten pro Dry-Run-Deployment bedeuten 110 Pull Requests mindestens 46 Stunden im Monat, und sie steigt mit jedem neuen Commit oder Wiederholungslauf. Das kostet CI-Minuten, und längere Warteschlangen verzögern auch die Rückmeldung an die Entwickler. Welche Auswirkungen der Versionswechsel hat, steht in [API 67.0 und User Mode](../api-67-apex-user-mode-weniger-datensaetze/).

## Die eigenen Prüfungen des Partners reichen nicht

Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) zeigt: KI-Nutzung erhöht den Durchsatz in der Softwareauslieferung, steht aber weiterhin in einem negativen Zusammenhang mit deren Stabilität. Der Bericht begründet das, übersetzt, so: „Ohne robuste Kontrollsysteme wie starke automatisierte Tests, ausgereifte Versionskontrolle und schnelle Feedbackschleifen führt ein höheres Änderungsvolumen zu Instabilität.“ In einem Salesforce-Programm ist die Pipeline dieses Kontrollsystem.

Die Salesforce-eigenen Skills für Claude Code führen bereits auf dem Entwicklerrechner mehrere Prüfungen aus. Laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) lehnen sie Datenbankabfragen in Schleifen ab, führen Code Analyzer und die Apex-Tests aus und sorgen für 75 Prozent Abdeckung, bevor sie den Abschluss melden. Derselbe Beitrag empfiehlt trotzdem, Code Analyzer „manually as an extra safety check“ laufen zu lassen.

Für Sie als Kunde ist eine Prüfung auf dem Laptop eines Partners nur dessen Zusicherung. Skills lassen sich pro Projekt mit der Konfiguration aus dem Repository installieren, trotzdem können Sie nicht nachprüfen, ob die Prüfung ausgeführt wurde, ob sie verändert wurde und ob ihr Ergebnis den Merge steuert. Maßgeblich ist die Prüfung in einer Pipeline, die Ihnen gehört, mit denselben Schwellen für jeden Partner. Nicht aussagekräftige Tests, falsche Felder und Geschäftsregeln brauchen weiterhin einen Menschen; diese Aufteilung beschreibe ich in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

## Welche Quality Gates muss KI-generierter Code bestehen?

Ich würde vier sperrende Prüfungen und einen Bericht in dieser Reihenfolge ausführen, damit die günstigen zuerst scheitern.

```tabelle
titel: Die Prüfungen bei jedem Pull Request
spalten: Prüfung | Was sie stoppt | Sperrt den Merge? | Wem sie gehört
Codeanalyse | Bekannte Sicherheits- und Performancefehler | Ja, ab Schweregrad High * | Kunde legt Regeln und Schwelle fest
Regeln für Agenten | Ungefragte Versionswechsel, fest eingetragene Adressen | Ja * | Architekt des Kunden
Dry-Run-Deployment | Erfundene Felder, fehlende Abhängigkeiten, rote Tests | Ja * | Pipeline, Integrations-Sandbox
ApexGuru | Langsamer Code unter echter Last | Nein, nur Bericht | Release Manager je Release
Merge-Sperre | Merge eines roten oder veralteten Builds, auch durch Admins | Ja * | Repository-Admin auf Kundenseite
fazit: Annahme für ein Programm mit mehreren Partnern. Schwellen und Verantwortliche gehören in den Partnervertrag.
```

**Codeanalyse.** [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) prüft Apex, Lightning-Komponenten und Flows auf bekannte Sicherheits- und Performanceprobleme. Von sich aus erstellt er nur einen Bericht und verwendet nur Regeln mit dem Tag Recommended. Ich würde Engines und Regeln in einer Konfigurationsdatei festlegen, die der Kunde freigibt, die Pipeline vom ersten Tag an ab Schweregrad High scheitern lassen und alles darunter nur berichten. Auch Ausnahmen brauchen einen Verantwortlichen, sonst verkleinert ein Partner den Umfang, ohne die Schwelle anzufassen. Alles zu sperren erzeugt in einer Org mit zehn Jahren Apex Hunderte alter Befunde, und Partner beginnen, Regeln abzuschalten, statt sie zu beheben.

```hinweis achtung
Ein Bericht stoppt nichts. Solange in der Pipeline nicht festgelegt ist, ab welcher Schwere sie scheitern soll, bleibt sie grün, egal, was die Analyse findet.
```

**Regeln für Agenten.** Die Standardregeln kennen Ihre Org nicht. Zwei Ergänzungen lohnen sich bei KI-generiertem Code: eigene Regeln für Muster, die Sie nie wollen, etwa fest eingetragene Adressen an Stellen, an denen Ihre SAP-Schnittstelle eine hinterlegte Verbindung nutzen soll, und die Versionsprüfung aus dem Beispiel oben. Erwarten Sie von der Analyse kein Urteil über Testqualität: Ein Test mit einer nichtssagenden Prüfung besteht diese Analyse.

**Dry-Run-Deployment.** Bevor etwas gemergt wird, führt die Pipeline ein Dry-Run-Deployment gegen eine Integrations-Sandbox aus, eine Testkopie Ihrer Org mit allen Feldern, und führt dort alle kundeneigenen Tests aus. Installiert wird dabei nichts; der Lauf zeigt nur, ob die Änderung dort deployen würde. Dort führen ein erfundenes Feld oder eine fehlende Abhängigkeit zum Scheitern, bevor ein Mensch prüft. Für Produktionsdeployments mit lokalen Tests verlangt Salesforce 75 Prozent Gesamtabdeckung und ausschließlich bestandene Tests ([Apex Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_testing_best_practices.htm)); mit ausgewählten Tests braucht jede deployte Klasse und jeder Trigger 75 Prozent. Der Sandbox-Lauf ersetzt die Release-Prüfung nicht: Ein validiertes Deployment gegen Produktion lässt sich innerhalb von 10 Tagen ohne erneute Tests ausführen ([Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html)), und diese Job-ID gilt nur für die Org, gegen die validiert wurde.

**ApexGuru.** ApexGuru findet langsame Muster wie Abfragen ohne Begrenzung. Es muss in einer Produktions- oder Full-Copy-Org aktiviert werden und priorisiert Befunde mit den Laufzeitdaten aus dieser Org ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server)). Nach der Aktivierung zeigt Code Analyzer die Hinweise laut [ApexGuru-FAQ](https://help.salesforce.com/s/articleView?id=sf.apexguru_faq.htm&language=en_US&type=5) auch in Developer-Sandboxes, Scratch Orgs und CI/CD. Weil die Gewichtung von der Last in Produktion abhängt, nutze ich ApexGuru als Bericht und nicht als sperrendes Gate.

**Merge-Sperre.** Prüfungen wirken nur, wenn eine rote Pipeline den Merge stoppt. Auf GitHub können Administratoren den Branch-Schutz umgehen, solange eine eigene Einstellung das nicht verbietet ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). Wer die Regeln ändern darf, kann sie dennoch entfernen; Partner sollten deshalb keine Repository- oder Organisations-Admins sein, und Regeländerungen brauchen eine Protokollierung. Bei mehreren Partnern können zwei Pull Requests einzeln grün sein und gemeinsam den Hauptzweig in einen fehlerhaften Zustand bringen; strikte Statusprüfungen oder eine Merge Queue testen den gemeinsamen Stand. Eine Person auf Kundenseite sollte Code Owner für Sharing, Berechtigungen und Schnittstellencode sein.

```vertiefung Für Entwickler
titel: Befehle und Einstellungen hinter den fünf Prüfungen
- **Codeanalyse:** `sf code-analyzer run --severity-threshold 2` (2 ist High) mit Regelauswahl in `code-analyzer.yml` oder die offizielle GitHub Action in Version 2; Version 1 nutzt noch den abgekündigten Code Analyzer v4 ([CI/CD-Integration](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html), [Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html)).
- **Eigene Regeln:** Regex-Regeln in `code-analyzer.yml` mit Muster, Dateiendungen und Schwere ([Regex-Engine](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engine-regex.html)), etwa `WITH SYSTEM_MODE` ohne schriftliche Begründung. Die PMD-Regel `ApexUnitTestClassShouldHaveAsserts` prüft nur auf „at least one assertion“ ([PMD Best Practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html)).
- **Versionsprüfung:** `apiVersion` in geänderten `-meta.xml`-Dateien mit dem Ziel-Branch vergleichen und scheitern, wenn der Wechsel nicht beauftragt war. Ab 67.0 läuft Apex standardmäßig im User Mode ([Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm)), kritisch ist also der Sprung von 66.0 oder älter auf 67.0 oder neuer; er braucht eine Entscheidung zum Zugriff und einen Test mit `System.runAs()` und eingeschränktem Nutzer.
- **Dry-Run-Deployment:** in der Sandbox `sf project deploy start --dry-run --test-level RunLocalTests`; `deploy validate` soll laut Salesforce nicht gegen Sandboxes ausgeführt werden. Vor dem Release `sf project deploy validate` gegen Produktion, dann `sf project deploy quick` mit dieser Job-ID. `RunRelevantTests` ist noch Beta.
- **Merge-Sperre:** Required Status Checks im strikten Modus oder eine Merge Queue, Code Owners und „Do not allow bypassing the above settings“ am geschützten Branch.
```

## sfdx-hardis deckt das meiste als Open Source ab

[sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/), Open Source unter AGPL-3.0, startet laut seiner [Dokumentation zu den Pull-Request-Ergebnissen](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/) bei Pull Requests in einen Hauptzweig wie integration zwei Kontrolljobs. Der eine simuliert das Deployment in der Ziel-Org, führt die Tests aus, prüft die Abdeckung und schreibt das Ergebnis als Kommentar in den Pull Request. Der andere prüft die Codequalität und kommentiert seine Befunde ebenfalls. Ein Kommentar ist noch kein Gate: Die Jobs sperren den Merge erst, wenn sie Pflichtprüfungen am geschützten Branch sind. In der dokumentierten Konfiguration darf nur der Release Manager die Fehlerschwelle ändern, und Ausnahmen sind „only for false positives, never to publish faster“ gedacht ([MegaLinter-Fehler](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/)).

ApexGuru und org-spezifische Regeln wie die Versionsprüfung gehören nicht zu den dokumentierten Jobs; ergänzen Sie sie als eigene Schritte. sfdx-hardis führt außerdem die automatische Korrektur gescheiterter Deployments durch einen Coding-Agenten als Betafunktion auf ([Übersicht](https://sfdx-hardis.cloudity.com/salesforce-devops-home/)). Solche Korrekturen würde ich nur annehmen, wenn sie dieselben Prüfungen bestehen und von einem Menschen geprüft werden. Wie die übrige Pipeline zusammenspielt, steht in [Warum DevOps über Salesforce-Enterprise-Projekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).

## Schreiben Sie die Prüfungen in jeden Partnervertrag

Diese Prüfungen für Programme mit mehreren Partnern aufzusetzen, ist der Kern meiner Arbeit im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/). Die Reihenfolge ist wichtig, denn ein Partner kann jede Schwelle abschalten, solange er die Pipeline kontrolliert.

1. **Die Pipeline gehört Ihnen.** Repository, Pipeline und Schwellen liegen bei Ihnen, wie in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.
2. **Codeanalyse ab High sperren lassen** und den vollständigen Bericht bei jedem Pull Request veröffentlichen.
3. **Jeden Pull Request probeweise deployen**, in eine Integrations-Sandbox und mit allen eigenen Tests, und vor jedem Release gegen Produktion validieren.
4. **Ungefragte Versionswechsel stoppen** und für jeden beauftragten Wechsel einen Test mit eingeschränktem Nutzer verlangen. Dieselbe Regel gehört in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/), damit Agenten sie kennen, bevor die Pipeline sie stoppt.
5. **Den Hauptzweig schützen**, ohne Ausnahme für Admins, mit strikten Prüfungen oder Merge Queue und Code Owners auf Ihrer Seite für Sharing und Schnittstellen.
6. **ApexGuru als Bericht nutzen**, aktiviert in einer Org, in der es Laufzeitdaten hat.
7. **Gescheiterte Prüfungen je Partner und Kategorie zählen**, jeden Monat. Eine steigende Zahl in einer Kategorie zeigt, welche Regel in der Regeldatei oder im Vertrag fehlt.
