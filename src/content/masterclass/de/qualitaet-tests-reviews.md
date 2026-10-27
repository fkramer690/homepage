---
title: "Salesforce-Qualität: Tests, Reviews und Quality Gates"
description: "Welche Prüfungen jede Salesforce-Änderung bestehen muss: Pflicht-Reviews, Apex-Tests über 75 Prozent, Flow-Tests, Code Analyzer und harte Quality Gates."
lang: de
slug: qualitaet-tests-reviews
course: devops
translationKey: devops-06
chapter: 6
short: "Qualität, Tests, Reviews"
summary: "Welche Reviews, Tests und automatischen Prüfungen jede Änderung bestehen muss, bevor sie gemergt wird, für Code und für Flows."
takeaways:
  - "Ein Quality Gate ist eine Prüfung, die einen Merge oder ein Deployment technisch sperrt, solange sie rot ist; ein Bericht, den niemand lesen muss, ist keins."
  - "Salesforce verlangt 75 Prozent Apex-Abdeckung für Produktion und rät im selben Leitfaden, sich nicht auf die Prozentzahl zu konzentrieren; Asserts, Bulk-Tests und runAs zählen mehr."
  - "Flows sind Automatisierung wie Apex: Flow-Tests, Flow Scanner im Code Analyzer und die Abdeckungsgrenze für aktiv deployte Flows gehören in dieselbe Pipeline."
  - "Code Analyzer lässt einen Lauf nur scheitern, wenn Sie --severity-threshold setzen; ohne Schwelle bleibt die Pipeline grün, egal was im Bericht steht."
  - "Schwellenwerte, Regelsätze und Ausnahmen legt der Kunde fest und nur sein Release Manager ändert sie, für jeden Partner gleich."
articles: [pull-request-reviews-enterprise, quality-gates-ai-code-pipeline, reviewing-ai-generated-salesforce-code, api-67-user-mode-apex]
faq:
  - q: "Reichen 75 Prozent Testabdeckung für ein Salesforce-Release?"
    a: "Für das Deployment ja, für die Qualität nein. Salesforce schreibt selbst, man solle sich nicht auf die Prozentzahl konzentrieren. Prüfen Sie im Review, ob Tests echte Asserts, Negativfälle, einen Bulk-Fall mit mindestens 20 Datensätzen und einen Lauf mit eingeschränktem Benutzer enthalten."
  - q: "Kann man Salesforce Flows automatisiert testen?"
    a: "Ja. Für record-triggered und autolaunched Flows gibt es Flow-Tests als Metadatentyp FlowTest, die die Salesforce CLI mit sf flow run test ausführt. Für das Deployment als aktiver Flow zählt laut Salesforce Help die Abdeckung durch Apex-Tests."
  - q: "Wer darf Schwellenwerte und Ausnahmen in den Quality Gates ändern?"
    a: "Nur eine Person auf Kundenseite, typischerweise der Release Manager. Ändert ein Partner Schwellen oder schaltet Regeln ab, um schneller zu liefern, verlieren die Gates ihren Wert für alle anderen Teams."
  - q: "Brauche ich für Quality Gates ein kommerzielles DevOps-Werkzeug?"
    a: "Nein. Salesforce Code Analyzer, Validierungs-Deployments und Branch-Schutz Ihrer Git-Plattform reichen für den Kern, sfdx-hardis bündelt sie als Open Source. Gearset, Copado und Flosum bieten dasselbe mit Weboberfläche, eigenen Regelsätzen und Herstellersupport."
draft: false
---

Jede Salesforce-Änderung sollte vor dem Merge dieselben Prüfungen bestehen, und jede Prüfung muss technisch sperren können. Dazu gehören ein Pflicht-Review durch einen Menschen, ein Validierungs-Deployment mit Apex-Tests, die mehr beweisen als 75 Prozent Abdeckung, Flow-Tests für die wichtigsten Automatisierungen und statische Analyse mit Salesforce Code Analyzer samt Schwellenwert. Die Regeln, Schwellen und Ausnahmen legt der Kunde fest, für jeden Partner gleich. sfdx-hardis liefert diese Gates als Open Source, Gearset, Copado und Flosum als kommerzielle Plattform. KI-generierter Code bekommt keine eigenen Gates, sondern dieselben ohne Ausnahme.

## Was ist ein Quality Gate in einer Salesforce-Pipeline?

Ein Quality Gate ist eine automatische oder menschliche Prüfung, die eine Änderung aufhält, bis sie bestanden ist. Entscheidend ist das Aufhalten: Ein Bericht über 300 Funde, der den Merge nicht sperrt, ändert am Release nichts. In [Kapitel 5](../pipeline-aufbauen/) haben Sie gesehen, wie ein Pull Request durch die Pipeline läuft und welches Apex-Testlevel wohin gehört. Dieses Kapitel klärt, was an den einzelnen Stationen geprüft wird und wer die Messlatte setzt.

Ich ordne Gates nach Kosten. Günstige Prüfungen laufen zuerst und scheitern schnell, teure kommen danach:

1. Statische Analyse von Apex, Lightning Web Components und Flows, Laufzeit in Minuten.
2. Validierungs-Deployment gegen die Zielorg mit Apex-Tests und Abdeckung.
3. Flow-Tests für die kritischen Automatisierungen.
4. Review durch einen Menschen, der nur noch Änderungen sieht, die 1 bis 3 bestanden haben.

Die Sperre selbst setzt Ihre Git-Plattform. Auf GitHub verlangt ein geschützter Branch laut [Dokumentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) eine festgelegte Zahl von Freigaben und bestandene Status Checks. Zwei Optionen würde ich in jedem Programm mit mehreren Partnern einschalten: Freigaben verfallen, wenn danach neue Commits kommen, und „Do not allow bypassing the above settings“, denn ohne diese Option gelten die Regeln nicht für Administratoren. Haben Partner Admin-Rechte im Repository, ist der Branch-Schutz sonst eine Empfehlung.

## Warum sind Reviews Pflicht, auch mit guter Automatisierung?

Werkzeuge prüfen Regeln. Ob eine Änderung zur Architektur passt, ob ein neues Feld wirklich gebraucht wird oder ob ein Trigger mit dem Flow eines anderen Teams kollidiert, sieht nur ein Mensch, der die Org kennt. Deshalb ist für mich jeder Pull Request ohne Freigabe gesperrt, ausnahmslos. Die Begründung und wie Sie Reviews einführen, ohne langsamer zu werden, steht in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/).

Für die Rollen aus [Kapitel 2](../release-prozess-eigentum-rollen/) heißt das konkret:

- **Partner reviewen sich gegenseitig** bei Änderungen innerhalb ihres Bereichs.
- **Der Architekt auf Kundenseite gibt frei**, was Datenmodell, Sharing, Permission Sets oder Schnittstellen zu SAP berührt. Auf GitHub erzwingen Sie das mit Code Ownern: Eine Datei mit Code Owner braucht dessen Freigabe.
- **Der Release Manager** verantwortet Schwellenwerte und Regelsätze und ist der Einzige, der sie ändert.

Flows, Page Layouts und Permission Sets gehören genauso ins Review wie Apex. Gerade in Service- und Field-Service-Orgs steckt ein großer Teil der Geschäftslogik in Flows, die Admins der Partner bauen. Ein Review, das nur Code ansieht, übersieht diese Hälfte.

## Apex-Tests: warum 75 Prozent nur die Untergrenze sind

Für ein Deployment nach Produktion verlangt Salesforce laut [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_intro.htm), dass Tests mindestens 75 Prozent des Apex-Codes abdecken, alle Tests bestehen und jeder Trigger etwas Abdeckung hat. Dieselbe Dokumentation sagt in den [Testing Best Practices](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_best_practices.htm) aber auch: „don't focus on the percentage of code that is covered.“ Abdeckung misst, welche Zeilen gelaufen sind, nicht, ob das Ergebnis stimmt.

Was ich stattdessen in der Definition of Done sehen will, steht fast wörtlich im selben Leitfaden:

- **Echte Asserts** mit den Methoden der `Assert`-Klasse, die fachliches Verhalten prüfen.
- **Positiv- und Negativfälle**, gültige und ungültige Eingaben.
- **Bulk-Tests mit mindestens 20 Datensätzen**, damit ein Trigger beim nächtlichen Import der Auftragsstände aus SAP nicht an Governor Limits scheitert.
- **Tests mit `runAs`** in verschiedenen Benutzerkontexten, etwa als Servicetechniker oder Händler im Portal.
- **Eigene Testdaten** statt Daten aus der Org, damit Tests nach einem Sandbox-Refresh noch laufen.

Den maschinell prüfbaren Teil davon erzwingen PMD-Regeln aus der Kategorie [Best Practices](https://docs.pmd-code.org/latest/pmd_rules_apex_bestpractices.html): `ApexUnitTestClassShouldHaveAsserts` verlangt mindestens einen Assert, `ApexUnitTestShouldNotUseSeeAllDataTrue` verbietet den Zugriff auf Org-Daten, `ApexUnitTestClassShouldHaveRunAs` verlangt mindestens ein `runAs`. Die erste Regel besteht auch ein Test, der nur auf „nicht null“ prüft. Ob ein Assert etwas beweist, bleibt Aufgabe des Reviews.

Die Abdeckungsgrenze selbst können Sie anheben. In sfdx-hardis heißt der Parameter [`apexTestsMinCoverageOrgWide`](https://sfdx-hardis.cloudity.com/schema/sfdx-hardis-json-schema-parameters.html), Standard 75, und die Dokumentation empfiehlt für saubere Projekte strengere Werte wie 80 oder 90. In einer gewachsenen Org mit Jahren an Altcode würde ich die Grenze für neue und geänderte Klassen anheben und die Gesamtabdeckung schrittweise nachziehen. Ein Sonderfall ist API-Version 67.0: Apex läuft dort standardmäßig im User Mode, und ein Test ohne `runAs` sieht nicht, welche Datensätze ein eingeschränkter Benutzer verliert. Details in [API 67.0: warum Apex weniger Datensätze sieht](../../../blog/api-67-apex-user-mode-weniger-datensaetze/).

## Wie testen Sie Flows?

Flows sind in vielen Fertigungs-Orgs die größere Automatisierung: Statuswechsel im Serviceauftrag, Eskalationen bei Garantiefällen, Benachrichtigungen an Händler. Trotzdem laufen sie in vielen Pipelines ungeprüft durch. Drei Werkzeuge gibt es:

**Flow-Tests.** Für record-triggered, autolaunched und Data-Cloud-triggered Flows lassen sich laut [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_flowtest.htm) Tests anlegen, die erwartete Ergebnisse prüfen. Sie liegen als Metadatentyp `FlowTest` im Repository. Die Salesforce CLI führt sie mit [`sf flow run test`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_flow_run_test.html) aus, Ergebnisse auch im JUnit-Format für die Pipeline; `sf logic run test` führt Flow- und Apex-Tests zusammen aus. Ein praktisches Detail: Der ausführende Benutzer braucht die Berechtigung „View All Data“. Das betrifft den technischen Benutzer Ihrer Pipeline.

**Abdeckung für aktiv deployte Flows.** Standardmäßig kommen Flows, die in der Sandbox aktiv sind, laut [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=flow_distribute_deploy_active.htm) inaktiv in Produktion an und müssen von Hand aktiviert werden. Mit der Einstellung „Deploy processes and flows as active“ in den Process Automation Settings legen Sie eine Abdeckungsgrenze fest. Gemessen wird sie über Apex-Tests: Mindestens ein Apex-Test muss die eingestellte Abdeckung der aktiven autolaunched Flows erreichen, Flows mit Screens sind ausgenommen. Die Werte stehen im Tooling-API-Objekt [`FlowTestCoverage`](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_flowtestcoverage.htm). Für eine Pipeline, die auch nach Produktion ohne Handarbeit deployen soll, ist diese Einstellung der saubere Weg.

**Statische Analyse von Flows.** Der Flow Scanner in Code Analyzer findet typische Baufehler in Flows, bevor überhaupt ein Test läuft.

Meine Empfehlung: Jeder record-triggered Flow auf einem Kernobjekt wie Arbeitsauftrag, Anlage oder Garantiefall bekommt mindestens einen Flow-Test für den Hauptpfad und einen für den wichtigsten Fehlerfall. Screen Flows testen Sie weiterhin fachlich in UAT.

## Statische Analyse mit Salesforce Code Analyzer

[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html) bündelt in Version 5 acht Engines, alle standardmäßig aktiv. Für Ihre Pipeline zählen vor allem diese:

| Engine | Prüft | Typischer Fund |
|---|---|---|
| PMD | Apex und Visualforce | SOQL in Schleifen, fehlende Sharing-Deklaration, Tests ohne Assert |
| ESLint | JavaScript in Lightning Web Components | unsichere Muster, Fehler im Komponentencode |
| Flow Scanner | Flows | Datenbankzugriffe in Schleifen, fehlende Fehlerpfade, fest codierte IDs |
| Salesforce Graph Engine | tiefere Analyse von Apex über Aufrufpfade | Sicherheitslücken, die erst über mehrere Klassen sichtbar werden |
| Regex | eigene Muster aus `code-analyzer.yml` | fest codierte Endpunkte statt Named Credential |
| CPD | doppelten Code | kopierte Logik in mehreren Handlern |

Die [Regeln des Flow Scanners](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/rules-flow.html) sind für Admins der Partner besonders nützlich: `DbInLoop` meldet Get-, Create-, Update- und Delete-Elemente in Schleifen, `MissingFaultHandler` Elemente ohne Fehlerpfad, `HardcodedId` org-spezifische IDs, die beim Deployment brechen. Zwei Regeln melden, wenn Benutzereingaben in einem Flow im Systemkontext Datensätze auswählen oder ändern, ein Risiko für Rechteausweitung.

In der Pipeline rufen Sie `sf code-analyzer run` auf oder die GitHub Action. Laut [CI/CD-Leitfaden](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html) muss es Version 2 der Action sein, Version 1 nutzt den abgekündigten Code Analyzer v4. Zum Gate wird der Lauf erst mit `--severity-threshold`: Laut [Befehlsreferenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_code-analyzer_run.html) endet der Befehl mit einem Fehlercode, sobald ein Fund diesen Schweregrad erreicht. Ohne den Parameter bleibt alles grün. Ohne `--rule-selector` läuft der Regelsatz `Recommended`.

In einer Org mit zehn Jahren Apex würde ich ab „High“ blockieren und den Rest berichten. Wer am ersten Tag alles blockiert, bekommt Hunderte Altfunde, und Partner fangen an, Regeln abzuschalten statt Code zu korrigieren. Die Schwelle senken Sie, sobald der Bestand aufgeräumt ist; wie Sie technische Schulden vorher sichtbar machen, beschreibe ich in [Kapitel 9](../betrieb-monitoring-backup/).

## Wie laufen die Gates in sfdx-hardis und in kommerziellen Werkzeugen?

Alle Werkzeuge aus [Kapitel 4](../devops-werkzeuge-vergleich/) decken die Gates ab, mit unterschiedlicher Bedienung.

**sfdx-hardis**, das ich seit rund zwei Jahren in Kundenprojekten einsetze, startet laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-handle-merge-request-results/) bei jedem Pull Request zwei Kontrolljobs. Der erste simuliert das Deployment in der Zielorg, führt die Apex-Tests aus, berechnet die Abdeckung und schreibt das Ergebnis mit einem visuellen Diff geänderter Flows in den Pull Request. Der zweite führt MegaLinter mit PMD für Apex, ESLint für Lightning Web Components, einer Suche nach fest codierten Tokens und einer Copy-Paste-Erkennung aus. Gemergt wird laut Dokumentation nur, wenn beide grün sind. Die [MegaLinter-Konfiguration](https://sfdx-hardis.cloudity.com/salesforce-devops-solve-megalinter-errors/) markiert den PMD-Schwellenwert mit dem Kommentar, dass nur der Release Manager ihn ändern darf, und `// NOPMD` ist „only for false positives, never to publish faster“ gedacht. Genau diese Haltung will ich in jedem Programm. Achten Sie auf die Option `testCoverageNotBlocking`, die laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-smart-deployment/) Deployments trotz zu geringer Abdeckung zulässt. Sie gehört in kein Produktions-Setup.

**Gearset** bringt mit [Code Reviews](https://docs.gearset.com/en/articles/11478945-what-is-code-reviews) eigene, anpassbare Regelsätze für alle Metadatentypen mit, Flows eingeschlossen, dazu eine automatische Korrektur und Dashboards zu technischen Schulden. Als Status Check an einem geschützten Branch sperrt es laut [Gearset](https://docs.gearset.com/en/articles/10139478-integrating-clayton-into-your-gearset-pipeline) die Promotion eines Pull Requests, der die Prüfung nicht besteht. Eine eigene Regel meldet [Flows ohne Test](https://docs.gearset.com/en/articles/14121616-code-reviews-rule-untested-flows). Das spart Ihnen das Skript, das Sie sonst selbst schreiben.

**Copado** wirbt mit durchsetzbaren [Quality Gates](https://www.copado.com/product-detail/quality-assurance) entlang Ihrer Definition of Done und mit Robotic Testing für automatisierte Oberflächentests. Code Analyzer lässt sich laut [Salesforce-Leitfaden](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/ci-cd.html) so einbinden, dass gewählte Schweregrade Deployments blockieren.

**Flosum** bietet einen [Code-Scan-Schritt](https://docs.flosum.com/devops/pipeline/pipeline-operations/pipeline-operation-code-scan) in der Pipeline mit PMD oder einem eigenen, breiteren Regelsatz, der auch Flows prüft. Erreicht ein Fund die eingestellte Schwelle, scheitert der Schritt.

Die kommerziellen Werkzeuge punkten bei Oberfläche, eigenen Regelsätzen und Support. sfdx-hardis punktet bei Transparenz, weil jede Regel und jeder Schwellenwert als Datei im Repository liegt, das Ihnen gehört. Wichtig ist bei allen dasselbe: Die Schwellen stehen in Ihrem Repository oder Ihrem Werkzeugkonto, nicht beim Partner.

## KI-generierter Code: dieselben Gates, keine Ausnahmen

Arbeiten Ihre Partner mit Coding-Agenten, steigt die Zahl der Pull Requests, Ihre Reviewkapazität bleibt gleich. Das spricht dafür, die Gates oben ohne Ausnahme durchzusetzen. Neue Gates braucht es kaum. Typische Fehler von KI-Code wie Abfragen in Schleifen, fehlende Sharing-Deklarationen und Tests ohne Aussage findet dieselbe Kombination aus Code Analyzer, Validierung und Review. Zwei Ergänzungen lohnen sich: eine Prüfung, die einen Sprung der API-Version auf 67.0 ohne Auftrag stoppt, und die Pflicht, KI-Anteile im Pull Request zu kennzeichnen.

Was KI-Code darüber hinaus braucht, von der Regeldatei bis zu Org-Grenzen für Agenten, behandelt [Kapitel 8 der KI-Masterclass](../../ki-salesforce/best-practices-ki-code/). Die Gates im Detail stehen in [Quality Gates für KI-Code](../../../blog/quality-gates-ki-code-salesforce-pipeline/), das Review aus Kundensicht in [KI-generierten Salesforce-Code prüfen](../../../blog/ki-generierten-salesforce-code-pruefen/).

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer betreibt Service Cloud mit Field Service für seine Außendiensttechniker, ein Händlerportal und eine Schnittstelle zu SAP. Zwei Partner arbeiten auf derselben Org, einer am Außendienst, einer am Portal. Alle Details sind Annahmen.

Ein Admin des ersten Partners baut einen record-triggered Flow auf dem Arbeitsauftrag, der bei Statuswechsel die zugehörigen Termine aktualisiert, mit einem Update-Element in einer Schleife. In der Sandbox funktioniert er mit einem Auftrag. Im Pull Request meldet der Flow Scanner `DbInLoop` und `MissingFaultHandler`, beide über der Schwelle, der Merge ist gesperrt. Der Admin baut das Update nach der Schleife, ergänzt einen Fehlerpfad und zwei Flow-Tests.

Im Validierungs-Deployment scheitert danach ein Apex-Test des zweiten Partners: Der Bulk-Test der SAP-Importklasse legt 200 Arbeitsaufträge an und läuft jetzt durch den neuen Flow. Ohne diesen Test wäre das Problem erst beim nächtlichen Import in Produktion aufgefallen. Das Review durch den Architekten des Kunden klärt am Ende die fachliche Frage, die kein Werkzeug stellt: ob der Termin bei einem stornierten Auftrag gelöscht oder nur abgesagt werden soll.

Welche Konfigurationsdaten solche Flows in Sandboxes brauchen, damit Tests aussagekräftig sind, behandelt [Kapitel 7](../daten-und-konfiguration/). Wie ich Programme dabei unterstütze, steht unter [DevOps und Release-Management](../../../leistungen/devops-und-release-management/) und [Partnersteuerung](../../../leistungen/partnersteuerung/).

Qualität entsteht in Salesforce-Programmen mit mehreren Partnern durch Gates, die sperren, und durch Schwellen, die der Kunde festlegt. Wenn Sie Ihre Tests, Reviews und Quality Gates prüfen lassen möchten, [schreiben Sie mir](#contact).
