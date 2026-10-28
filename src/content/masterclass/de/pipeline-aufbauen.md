---
title: "Salesforce-Pipeline aufbauen: vom Pull Request bis Prod"
description: "Wie eine Salesforce-Pipeline arbeitet: Pull Request, Validierung, Apex-Testlevel, Delta-Deployments, Deployment-Schritte, Löschungen und Login per JWT."
lang: de
slug: pipeline-aufbauen
course: devops
translationKey: devops-05
chapter: 5
pubDate: 2026-10-28
short: "Die Pipeline bauen"
summary: "Welche Bausteine eine Salesforce-Pipeline braucht, vom Pull Request über Testlevel und Delta-Deployments bis zum Login ohne Passwort."
takeaways:
  - "Jede Änderung läuft über einen Pull Request, der ein Validierungs-Deployment gegen die Zielorg auslöst; gemergt wird nur mit grüner Validierung und freigegebenem Review."
  - "Für Produktion ist RunLocalTests der Standard; RunRelevantTests ist laut Salesforce noch Beta und gehört noch nicht in Produktions-Pipelines."
  - "Quick Deploy übernimmt eine erfolgreiche Validierung bis zu zehn Tage lang ohne erneuten Testlauf und verkürzt so das Release-Fenster in Produktion."
  - "Schritte vor und nach dem Deployment gehören versioniert in die Pipeline, etwa als Deployment Actions in sfdx-hardis, statt in eine Tabelle mit manuellen Aufgaben."
  - "Die Pipeline meldet sich per JWT Bearer Flow mit Zertifikat an; Zertifikat und Schlüssel liegen beim Kunden und werden beim Partnerwechsel erneuert."
articles: [sfdx-hardis-introduction, pull-request-reviews-enterprise, salesforce-password-integrations-2027, sfdx-hardis-training]
faq:
  - q: "Welches Apex-Testlevel sollte eine Produktions-Pipeline nutzen?"
    a: "RunLocalTests. Es ist der Standard für Produktions-Deployments mit Apex und führt alle Tests außer denen aus installierten Paketen aus. RunSpecifiedTests spart Zeit, verlangt aber 75 Prozent Abdeckung für jede deployte Klasse und jeden Trigger einzeln. RunRelevantTests ist noch Beta."
  - q: "Was ist ein Quick Deploy in Salesforce?"
    a: "Ein Quick Deploy übernimmt eine erfolgreiche Validierung, ohne die Apex-Tests erneut auszuführen. Laut Metadata API Developer Guide darf die Validierung höchstens zehn Tage alt sein, und Tests und Abdeckung müssen bestanden sein."
  - q: "Warum sollte sich die Pipeline nicht mit Benutzername und Passwort anmelden?"
    a: "Der OAuth Username-Password Flow für Connected Apps endet am 20. Februar 2027. Für CI beschreibt Salesforce den JWT Bearer Flow mit Zertifikat; das Passwort eines technischen Benutzers liegt dann in keiner Pipeline-Variable mehr."
  - q: "Brauche ich für Schritte vor und nach dem Deployment ein kommerzielles Tool?"
    a: "Nein. sfdx-hardis bringt Deployment Actions als Open Source mit, Gearset und Copado haben eigene Varianten. Entscheidend ist, dass die Schritte im Repository oder im Werkzeug des Kunden stehen und nicht in einer Excel-Liste."
draft: false
---

Eine Salesforce-Pipeline bringt jede Änderung auf demselben Weg in Produktion: Feature-Branch, Pull Request, Validierungs-Deployment gegen die Zielorg mit Apex-Tests, Review, Merge, Deployment. Für Produktion ist `RunLocalTests` das richtige Testlevel, und nach dem Merge übernimmt ein Quick Deploy die bereits bestandene Validierung. Delta-Deployments halten die Läufe kurz. Schritte vor und nach dem Deployment stehen in der Pipeline statt in einer Excel-Liste, Löschungen laufen über destruktive Manifeste. Die Pipeline meldet sich per JWT mit Zertifikat an, nie mit Passwort, und schreibt Ergebnisse in den Pull Request und den Teamkanal. sfdx-hardis liefert diese Bausteine als Open Source, Gearset, Copado und Flosum als kommerzielle Plattform.

## Wie läuft ein Pull Request durch die Pipeline?

Eine Pipeline ist eine feste Folge automatischer Schritte, die eine Änderung aus dem Repository in eine Org bringt. Welche Umgebungen und Branches es gibt, steht in [Kapitel 3](../umgebungen-und-branching/), welches Werkzeug Sie wählen, in [Kapitel 4](../devops-werkzeuge-vergleich/). Hier geht es um die Strecke selbst. Für eine Änderung sieht sie so aus:

1. Ein Entwickler oder Admin baut in seiner Entwickler-Sandbox und committet auf einen Feature-Branch, eine User Story pro Branch.
2. Er öffnet einen Pull Request gegen den Integrations-Branch.
3. Die Pipeline ermittelt die geänderten Metadaten, startet die statische Analyse und ein Validierungs-Deployment gegen die Org hinter dem Ziel-Branch, mit Apex-Tests.
4. Die Ergebnisse stehen als Kommentar im Pull Request. sfdx-hardis schreibt laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) die Ergebnisse der Deployment-Simulation in jeden Pull Request.
5. Ein Mensch prüft Architektur, Datenmodell und Seiteneffekte. Warum ich dieses Review für Pflicht halte, steht in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/).
6. Gemergt wird nur mit grüner Validierung und Freigabe. Das erzwingt der Branch-Schutz Ihrer Git-Plattform, nicht die Disziplin der Teams.
7. Nach dem Merge deployt die Pipeline in die Org, wenn möglich als Quick Deploy, und führt die Schritte vor und nach dem Deployment aus.
8. Team und Ticket erfahren das Ergebnis.

```praxis
In einem Programm, das ich begleitet habe, lief anfangs jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
```

Von Integration nach UAT und von dort nach Produktion wiederholt sich dasselbe Muster. Gearset Pipelines arbeitet im Kern genauso: Laut [Gearset-Dokumentation](https://docs.gearset.com/en/articles/6166062-promoting-your-first-features-in-gearset-pipelines) prüft Gearset jeden Pull Request auf Merge-Konflikte und validiert seine Metadaten gegen die Zielorg; „Promote changes“ startet dann einen Job, der mergt und deployt. Der Unterschied liegt in der Bedienung über eine Weboberfläche.

## Validierung und Quick Deploy

Ein Validierungs-Deployment ist ein Deployment, das alle Prüfungen der Zielorg durchläuft, Apex-Tests eingeschlossen, aber nichts speichert. In der Salesforce CLI heißt es [`sf project deploy validate`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) und liefert eine Job-ID zurück. Mit dieser ID übernimmt `sf project deploy quick --job-id` die geprüften Komponenten laut [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-develop-any-org.html) ohne erneuten Testlauf.

Die Bedingungen stehen im [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deployRecentValidation.htm): Die Validierung ist höchstens zehn Tage alt, die Apex-Tests der Zielorg sind bestanden, und die Abdeckung reicht. Bei allen lokalen Tests heißt das 75 Prozent Gesamtabdeckung und etwas Abdeckung für jeden Trigger, bei `RunSpecifiedTests` 75 Prozent für jede deployte Klasse und jeden Trigger einzeln. Gearset nennt in seiner [Quick-Deploy-Anleitung](https://docs.gearset.com/en/articles/6952110-quick-deploy) zwei weitere praktische Bedingungen: Seit der Validierung lief kein anderes Deployment, und die Org hat sich nicht verändert.

sfdx-hardis versucht laut [Befehlsreferenz](https://sfdx-hardis.cloudity.com/hardis/project/deploy/sources/dx/) nach dem Merge automatisch einen Quick Deploy, abschaltbar über `SFDX_HARDIS_QUICK_DEPLOY=false`. Für Produktion empfehle ich, die Validierung tagsüber laufen zu lassen und im Release-Fenster nur noch den Quick Deploy zu starten. Die lange Testphase liegt dann außerhalb der Zeit, in der Außendienst und Service auf das System warten.

## Welches Apex-Testlevel passt zu welcher Umgebung?

Das Testlevel legt fest, welche Apex-Tests ein Deployment ausführt. Die [CLI-Referenz zu `project deploy start`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html) nennt fünf Werte:

| Testlevel | Was läuft | Mein Einsatz |
|---|---|---|
| `NoTestRun` | keine Tests; nur für Entwicklungsumgebungen, dort Standard | Rückabgleich in Entwickler-Sandboxes |
| `RunSpecifiedTests` | nur die genannten Testklassen; 75 % pro deployter Klasse und Trigger | schnelle Validierung im Feature-Pull-Request, wenn die Zuordnung von Tests gepflegt ist |
| `RunLocalTests` | alle Tests außer denen aus installierten Paketen; Standard für Produktions-Deployments mit Apex | Validierung gegen UAT, Staging und Produktion |
| `RunAllTestsInOrg` | zusätzlich die Tests installierter Pakete | selten sinnvoll |
| `RunRelevantTests` (Beta) | nur Tests, die zu den deployten Dateien passen | in einer Integrations-Sandbox ausprobieren |

`RunRelevantTests` ist mit Spring '26 gekommen. Im [Metadata API Developer Guide zu Winter '27](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_run_relevant_tests.htm) ist die Funktion noch als Beta markiert, die 75 Prozent gelten pro Klasse und Trigger. Der Salesforce-Blog sagt deutlich, dass sie noch nicht in Produktions-Pipelines gehört. Daran würde ich mich halten.

```vertiefung Für Entwickler
titel: Wie wählt RunRelevantTests die Tests aus?
Die Plattform wählt die Tests laut [Salesforce-Blog](https://www.salesforce.com/blog/faster-deployment-test-runs/) über den Abhängigkeitsgraphen zur Kompilierzeit aus und kann deshalb Abhängigkeiten übersehen, die erst zur Laufzeit entstehen, etwa über Dependency Injection.

Dafür gibt es zwei Annotationen: `@IsTest(testFor=...)` bindet eine Testklasse an bestimmte Klassen, `@IsTest(critical=true)` lässt sie bei jedem Deployment laufen.
```

sfdx-hardis kennt zusätzlich `RunRepositoryTests`, das alle Testklassen aus dem Repository erkennt und ausführt. Das hilft, wenn in der Org alte Tests liegen, die nicht im Repository verwaltet werden. Warum 75 Prozent Abdeckung nur die Untergrenze sind, behandelt [Kapitel 6](../qualitaet-tests-reviews/).

## Delta-Deployments: nur deployen, was sich geändert hat

Ein Delta-Deployment deployt nur die Metadaten, die sich zwischen zwei Git-Ständen geändert haben, statt des ganzen Repositorys. Bei einer gewachsenen Org mit tausenden Metadaten-Dateien ist das der Unterschied zwischen einem Lauf, auf den man wartet, und einem, den man nebenbei abschließt.

sfdx-hardis nutzt dafür das Open-Source-Plugin sfdx-git-delta und schaltet es mit `useDeltaDeployment: true` in `config/.sfdx-hardis.yml` ein. Laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-config-delta-deployment/) gilt Delta nur zwischen Neben- und Hauptbranches (minor und major branches), also etwa vom Feature- oder Hotfix-Branch nach `integration` oder `preprod`; zwischen Hauptbranches, etwa von UAT nach Produktion, bleibt das Deployment vollständig. Ich halte das für die richtige Aufteilung. Ein Delta übersieht gelegentlich eine Abhängigkeit, und das vollständige Deployment zwischen den Hauptstufen fängt sie ab, bevor sie Produktion erreicht. Gearset Pipelines validiert die Metadaten des jeweiligen Pull Requests, also ebenfalls nur die Änderung.

## Schritte vor und nach dem Deployment

Fast jedes Release hat Schritte, die keine Metadaten sind: einen Flow aktivieren, Referenzdaten laden, einen Batch-Job einplanen, Benutzer vor dem Release einfrieren. In vielen Programmen stehen sie in einer Tabelle, die jemand um 22 Uhr von Hand abarbeitet. Gehören sie zur Pipeline, laufen sie in jeder Umgebung gleich und sind im Repository nachvollziehbar.

In sfdx-hardis heißen sie [Deployment Actions](https://sfdx-hardis.cloudity.com/hardis/project/action/create/). Die wichtigsten Regeln aus der Dokumentation:

- **Typen:** Shell-Befehl, Datenimport mit SFDMU, Apex-Skript, Community veröffentlichen, manuelle Anweisung, Batch einplanen oder sofort starten, Einträge aus der `package.xml` entfernen, User Access Policies aktivieren.
- **Geltungsbereich:** für das ganze Projekt (`config/.sfdx-hardis.yml`), für einen Ziel-Branch oder für einen einzelnen Pull Request, jeweils als Datei im Repository.
- **Zeitpunkt:** vor oder nach dem Deployment. Standard ist der Kontext `process-deployment-only`, also nur beim echten Deployment, nicht bei der Validierung.
- **Sicherheit:** Aktionen nach dem Deployment laufen laut [Befehlsreferenz](https://sfdx-hardis.cloudity.com/hardis/project/deploy/sources/dx/) nie, wenn das Metadaten-Deployment fehlgeschlagen ist, und standardmäßig nur einmal pro Ziel-Org.
- **Nachweis:** Die Ergebnisse stehen in einem eigenen Kommentar „Deployment Actions“ im Pull Request.

Die kommerziellen Werkzeuge lösen dasselbe Problem mit eigener Oberfläche. Gearset hängt laut [Dokumentation](https://docs.gearset.com/en/articles/9859659-pre-and-post-deployment-steps-in-gearset-pipelines) manuelle Schritte vor und nach dem Deployment sowie automatische Schritte nach dem Deployment an den Pull Request, darunter Flows, Agenten und Bots aktivieren. Gut gelöst finde ich, dass ein Pull Request erst weitergeht, wenn die Vorab-Schritte erledigt sind. Die Funktion hängt an den Stufen Automation Starter, Teams und Enterprise Add-on. Copado führt in seiner [Dokumentation](https://docs.copado.com/article/7y7p18g4ef-deployment-steps) eigene Deployment Steps, die an der User Story hängen, darunter Schritte mit Apex. Wie sie in Ihrer Edition aussehen, klären Sie am besten in einer Demo mit Ihrer eigenen Org. Wie Sie Referenz- und Konfigurationsdaten sauber bewegen, behandelt [Kapitel 7](../daten-und-konfiguration/).

## Destruktive Änderungen: Löschen mit Plan

Löschen ist in Salesforce ein eigenes Deployment. Laut [Salesforce-Dokumentation](https://developer.salesforce.com/docs/platform/salesforce-migration-guide/guide/daas-destructive-changes.html) beschreibt ein Manifest `destructiveChanges.xml` die zu löschenden Komponenten. Mit `destructiveChangesPre.xml` wird vor dem Deployment gelöscht, mit `destructiveChangesPost.xml` danach. Das klassische Beispiel: Ein eigenes Objekt, das eine Apex-Klasse noch referenziert, lässt sich erst löschen, wenn die Klasse angepasst ist; beides geht in einem Deployment, mit der Löschung im Post-Manifest. Die CLI kennt dafür `--pre-destructive-changes` und `--post-destructive-changes`.

Zwei Details aus derselben Seite sollte jeder Release Manager kennen. Mit `purgeOnDelete` landen gelöschte Komponenten nicht im Papierkorb. Und Roll-up-Summary-Felder landen beim Löschen über die Metadata API nie im Papierkorb.

sfdx-hardis führt eine `manifest/destructiveChanges.xml` in einem eigenen Schritt aus und löscht Flows über die Tooling API. Flosum kennt laut [Dokumentation der Branch Actions](https://docs.flosum.com/devops/code/branch-actions) destruktive Änderungen vor oder nach dem Deployment pro Branch. In Copados Advanced-Edition lässt sich ein Deployment laut [Dokumentation](https://docs.essentials.copado.com/en/articles/8596017-deploying-destructive-changes-using-copado-essentials) als „Destructive“ oder „Standard Destructive“ anlegen; bei Git-Repositories entfernt Copado die Metadaten dabei auch aus dem Branch.

Meine Regel: Ein gelöschtes Feld löscht auch seine Daten. Nehmen Sie ein Feld am Asset, das die SAP-Equipmentnummer installierter Maschinen hält. Löschungen von Feldern und Objekten bekommen deshalb einen eigenen Pull Request mit Freigabe durch den Architekten und den fachlich Verantwortlichen. Und ich empfehle, in zwei Releases zu löschen: erst alle Referenzen entfernen und beobachten, dann im nächsten Release löschen.

## Wie meldet sich die Pipeline ohne Passwort an?

Die Pipeline braucht für jede Org einen Login, und der darf kein Passwort sein. Der [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-auth-jwt-flow.html) beschreibt dafür den JWT Bearer Flow: Die Pipeline signiert ein Token mit einem privaten Schlüssel, Salesforce prüft es mit dem Zertifikat einer External Client App. Für einen Dev Hub, der Scratch Orgs oder Sandboxes anlegt, braucht es laut Guide eine Connected App. Der Befehl lautet `sf org login jwt` mit Client-ID, Schlüsseldatei und Benutzername.

```hinweis achtung
Der OAuth Username-Password Flow endet am 20. Februar 2027. Wer seine Pipeline noch mit Benutzer, Passwort und Security Token anmeldet, findet die Details in [Passwort-Integrationen enden 2027](../../../blog/salesforce-passwort-integrationen-2027/).
```

sfdx-hardis richtet das mit [`hardis:project:configure:auth`](https://sfdx-hardis.cloudity.com/hardis/project/configure/auth/) ein: Der Befehl legt eine External Client App mit JWT Bearer Flow und Zertifikat an, pro Branch. Das Zertifikat liegt verschlüsselt im Repository oder auf Wunsch in einem Passwortmanager, Client-ID und Entschlüsselungsschlüssel liegen als Variablen auf der Git-Plattform. Bei kommerziellen Plattformen autorisieren Sie die Orgs in der Plattform des Herstellers. Fragen Sie dort, welcher Flow dahintersteht und wie die Verbindung beim Kündigen getrennt wird.

Für die Eigentumsfrage aus [Kapitel 2](../release-prozess-eigentum-rollen/) heißt das:

- ein eigener technischer Benutzer pro Org für die Pipeline, nur mit den Rechten, die ein Deployment braucht,
- Zertifikate, Schlüssel und Pipeline-Variablen im Tresor und auf der Git-Plattform des Kunden,
- neue Zertifikate, sobald ein Partner das Programm verlässt.

## Benachrichtigungen: wer erfährt was?

Eine Pipeline, deren Ergebnis niemand sieht, ist ein Log. Drei Empfänger brauchen unterschiedliche Informationen:

- **Der Autor** braucht Details im Pull Request: welche Komponente, welcher Test, welcher Fehler.
- **Das Team** braucht einen Kanal für fehlgeschlagene Läufe und erfolgreiche Deployments. sfdx-hardis meldet laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) an Slack, Microsoft Teams, Google Chat und per E-Mail und aktualisiert Tickets, wenn eine Änderung eine Org erreicht. Gearset Pipelines meldet laut [Gearset](https://docs.gearset.com/en/articles/10264886-setting-up-notifications-in-pipelines) Validierungen, Deployments und Merge-Konflikte an Slack und Microsoft Teams.
- **Der Fachbereich** braucht nur die Produktions-Releases, in seiner Sprache. Wie Sie das mit dem Release-Kalender verbinden, steht in [Kapitel 8](../release-planung-salesforce-releases/).

Ein Kanal, der jede erfolgreiche Validierung meldet, wird nach zwei Wochen stummgeschaltet.

## Ein typisches Szenario, als Annahme

Ein Hersteller von Industrieanlagen nutzt Field Service und eine Schnittstelle zu SAP. Alle Details sind Annahmen. Eine User Story ergänzt am Asset ein Feld für das Garantieende, passt einen Flow an und braucht einen neuen Work Type als Referenzdatensatz.

- Der Pull Request in den Integrations-Branch validiert per Delta mit `RunSpecifiedTests`, weil das Team seine Testklassen sauber zugeordnet hat.
- Eine Deployment Action nach dem Deployment lädt den Work Type per SFDMU, mit Geltungsbereich nur für diesen Pull Request.
- Ein altes Garantiefeld wird nicht mitgelöscht. Die Referenzen verschwinden jetzt, die Löschung folgt im nächsten Release mit eigener Freigabe.
- Gegen UAT und Produktion validiert die Pipeline vollständig mit `RunLocalTests`. Die Produktionsvalidierung läuft am Vormittag, am Abend folgt der Quick Deploy.
- Die Pipeline meldet sich per JWT an, das Service-Team bekommt eine Nachricht in seinem Teams-Kanal.

Nichts davon braucht ein teures Werkzeug, aber jemand muss es einrichten und pflegen. Ich setze sfdx-hardis seit rund zwei Jahren in Kundenprojekten ein; wie es aufgebaut ist, steht in der [Einführung in sfdx-hardis](../../../blog/sfdx-hardis-einfuehrung-salesforce-devops/), und wer die Strecke einmal selbst bauen will, findet im [kostenlosen sfdx-hardis-Training](../../../blog/sfdx-hardis-kostenloses-devops-training/) genau diese Schritte als Labs. Bei der Einrichtung unterstütze ich im Rahmen von [DevOps und Release-Management](../../../leistungen/devops-und-release-management/), alle Kapitel finden Sie auf der [Übersichtsseite](../).

Eine gute Pipeline macht jedes Release gleich langweilig, egal welcher Partner die Änderung gebaut hat. Wenn Sie Ihre Pipeline prüfen oder neu aufsetzen möchten, [schreiben Sie mir](#contact).
