---
title: "Salesforce DevOps einführen: Fahrplan und Messung"
description: "Der Fahrplan von Change Sets zur eigenen Salesforce-Pipeline in sieben Phasen: Teams schulen, typische Fehler vermeiden, Fortschritt messen, Agenten einplanen."
lang: de
slug: einfuehrung-fahrplan
course: devops
translationKey: devops-10
chapter: 10
pubDate: 2026-10-28
short: "Einführung und Fahrplan"
summary: "In sieben Phasen von Change Sets zur Pipeline in Kundenhand, mit Training, Kennzahlen und einem Ausblick auf Coding-Agenten."
takeaways:
  - "Die Einführung von Salesforce DevOps gelingt in Phasen mit prüfbarem Abschluss: Eigentum, Git, Validierung, Quality Gates, Daten, Release-Kalender und Betrieb, in dieser Reihenfolge."
  - "Ein Stream oder Partner geht als Pilot voran, die übrigen folgen zu Terminen, die im Vertrag stehen; ein Stichtag beendet Change Sets für UAT und Produktion."
  - "Die wichtigste Investition ist eine interne Release-Rolle; Lizenzersparnisse aus der Werkzeugwahl sind dort besser angelegt als in zusätzlichen Partnertagen."
  - "Messen Sie gegen eine Basislinie: DORA-Kennzahlen plus eigene Werte wie manuelle Schritte im Release-Plan und Wartezeit bis zum ersten Review."
  - "Coding-Agenten verstärken, was die Pipeline schon kann; sie kommen nach den Quality Gates, mit einer Regeldatei in Ihrem Repository und denselben Prüfungen wie für Menschen."
articles: [sfdx-hardis-training, quality-gates-ai-code-pipeline, agentforce-agents-release-pipeline, ai-rules-file-salesforce-repo, nearshore-teams-with-ai-agents]
faq:
  - q: "Wie lange dauert die Umstellung von Change Sets auf eine Salesforce-Pipeline?"
    a: "Das hängt von der Zahl der Teams, Partner und Schnittstellen ab. Planen Sie in Phasen mit Abschlusskriterien statt mit einem festen Enddatum. Der Pilot mit einem Stream zeigt nach wenigen Releases, wie schnell die übrigen folgen können."
  - q: "Müssen alle Partner gleichzeitig auf die neue Pipeline wechseln?"
    a: "Nein. Ein Stream geht voran, die anderen folgen zu festen Terminen. Werkzeug, Branch-Modell und Freigaberegeln gelten aber von Anfang an für alle und gehören in die Verträge."
  - q: "Welches Training brauchen Admins und Entwickler für Salesforce DevOps?"
    a: "Für Git, Pull Requests und Merge-Konflikte reichen praxisnahe Kurse wie Level 1 und 2 des kostenlosen sfdx-hardis-Trainings oder die kostenlosen Kurse auf DevOps Launchpad von Gearset. Release Manager brauchen zusätzlich Level 3 oder das Training ihres Werkzeuganbieters."
  - q: "Welche Kennzahlen zeigen, ob die DevOps-Einführung wirkt?"
    a: "Die fünf DORA-Kennzahlen, also Deployment-Häufigkeit, Durchlaufzeit, Änderungsfehlerrate, Wiederherstellungszeit und Deployment Rework Rate, gemessen gegen eine Basislinie. Dazu kommen eigene Werte: Anteil der Deployments über die Pipeline, manuelle Schritte pro Release und Wartezeit bis zum ersten Review."
  - q: "Wann sollten Coding-Agenten in die Salesforce-Pipeline?"
    a: "Wenn Pull-Request-Reviews Pflicht sind, die Quality Gates blockieren und eine Regeldatei im Repository des Kunden liegt. Vorher erzeugen Agenten vor allem mehr ungeprüfte Änderungen."
draft: false
---

Der Weg von Change Sets zu einer Salesforce-DevOps-Pipeline gelingt in Phasen statt in einem großen Umstieg. Ich empfehle sieben Phasen in der Reihenfolge dieser Masterclass: Eigentum und Werkzeug klären, Git als einzige Quelle einführen, eine Validierungspipeline bauen, Quality Gates scharf schalten, Daten und Konfiguration mitnehmen, einen Release-Kalender festlegen und den Betrieb absichern. Jede Phase endet mit einem prüfbaren Ergebnis. Ein Stream geht als Pilot voran, die anderen Partner folgen zu festen Terminen. Parallel bauen Sie Wissen im eigenen Haus auf, etwa mit dem kostenlosen sfdx-hardis-Training, und messen den Fortschritt gegen eine Basislinie. Coding-Agenten kommen erst, wenn diese Pipeline steht.

## Wie sieht der Fahrplan von Change Sets zur Pipeline aus?

Die neun Kapitel davor beschreiben jeweils einen Baustein. Für die Einführung zählt die Reihenfolge, denn jede Phase setzt die vorige voraus:

| Phase | Was entsteht | Abschlusskriterium | Kapitel |
|---|---|---|---|
| 1. Eigentum und Werkzeug | Repository, Pipeline und Werkzeuge gehören Ihnen, Rollen und Freigaben sind benannt | Release Manager benannt, Werkzeugentscheidung schriftlich, Regeln in allen Partnerverträgen | [1](../release-management-grundlagen/), [2](../release-prozess-eigentum-rollen/), [4](../devops-werkzeuge-vergleich/) |
| 2. Git als Quelle | Metadaten der Produktion im Repository, Sandbox-Strategie, Branch-Modell | Jede Änderung beginnt auf einem Feature-Branch | [3](../umgebungen-und-branching/) |
| 3. Validierungspipeline | Pull Requests, Validierungsdeployments, Delta-Deployments, Anmeldung ohne Passwort | UAT und Produktion nehmen keine Change Sets mehr an | [5](../pipeline-aufbauen/) |
| 4. Quality Gates | Pflicht-Reviews, Apex- und Flow-Tests, statische Analyse mit Schwellenwert | Merge nur bei grüner Pipeline und Freigabe | [6](../qualitaet-tests-reviews/) |
| 5. Daten und Konfiguration | Referenz- und Konfigurationsdaten aus dem Repository, maskierte Sandboxes | Kein manueller Datenschritt mehr im Release-Plan | [7](../daten-und-konfiguration/) |
| 6. Release-Rhythmus | Release-Kalender, Freeze-Fenster, Plan für die drei Salesforce-Releases | Kalender für zwölf Monate veröffentlicht | [8](../release-planung-salesforce-releases/) |
| 7. Betrieb | Monitoring, Backup, Hotfix-Weg, Kennzahlen | Restore einmal geprobt, Hotfix läuft über die Pipeline | [9](../betrieb-monitoring-backup/) |

**Phase 1 braucht kaum Technik und entscheidet am meisten.** Wer das Werkzeug wählt, setzt den Standard. Fällt die Wahl spät oder überlässt ein Kunde sie dem ersten Partner, bauen zwei Partner zwei Prozesse, und der Kunde bezahlt die Zusammenführung. Ich empfehle deshalb, die Werkzeugentscheidung früh zu treffen und für jeden Partner verbindlich zu machen, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/) begründet.

**Phase 2 beginnt mit der Produktion als Wahrheit.** Bis das Repository steht, ist die Produktiv-Org die einzige vollständige Quelle. Den Ausgangsstand holen Sie mit `sf project retrieve start` und einer `package.xml` über `--manifest`, so die [CLI-Referenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_retrieve_start.html). Ab diesem Tag gilt: Wer in Produktion im Setup etwas ändert, erzeugt Drift, und Drift wird zurück ins Repository geholt, bevor das nächste Release läuft.

**Phase 3 und 4 laufen zeitversetzt.** Eine Pipeline, die vom ersten Tag an alles blockiert, trifft in einer gewachsenen Org auf Hunderte Altfunde. Partner schalten dann Regeln ab, statt Code zu korrigieren. Ich würde zuerst nur schwere Funde blockieren und den Rest berichten, wie in [Quality Gates für KI-Code](../../../blog/quality-gates-ki-code-salesforce-pipeline/) beschrieben, und die Schwelle mit jedem Quartal anziehen.

**Ein Pilot geht voran.** Wählen Sie einen Stream mit vielen kleinen Änderungen und überschaubarem Risiko, etwa das Händlerportal, nicht die SAP-Schnittstelle. Nach zwei oder drei Releases im Pilot sehen Sie, wo Ihre Pipeline hakt, bevor alle Partner davon abhängen. Die übrigen Streams folgen zu Terminen, die im Vertrag stehen. Ein Stichtag beendet Change Sets für UAT und Produktion; danach gibt es keine Ausnahme für „nur dieses eine Feld“.

## Wie befähigen Sie Ihr Team und Ihre Partner?

Die wichtigste Investition ist eine Person: eine interne Release-Rolle, die Pipeline, Kalender und Freigaben verantwortet. Wählen Sie ein Open-Source-Werkzeug oder ein günstigeres Paket, ist die Lizenzersparnis dort besser angelegt als in zusätzlichen Partnertagen. Ohne diese Rolle gehört der Prozess faktisch wieder dem Partner, der ihn am besten kennt.

Dazu kommt Training, und zwar praxisnah. Ich setze sfdx-hardis seit rund zwei Jahren in Kundenprojekten ein und habe im Oktober 2026 alle drei Level des [kostenlosen sfdx-hardis-Trainings](https://sfdx-hardis.cloudity.com/salesforce-devops-training/) abgeschlossen. In 27 Labs entsteht auf kostenlosen Developer Edition Orgs und einem GitHub-Account eine komplette Pipeline, und ein Badge gibt es erst, wenn ein Job die Arbeit im eigenen Repository geprüft hat. Trotz Vorerfahrung habe ich fast einen Tag gebraucht. Meine Eindrücke stehen in [was ich aus dem sfdx-hardis-Training lernte](../../../blog/sfdx-hardis-kostenloses-devops-training/).

Die kommerziellen Anbieter haben eigene Angebote, und ich habe Kurse von Gearset, Flosum und Copado gemacht. Gearset betreibt mit [DevOps Launchpad](https://docs.gearset.com/en/articles/4497508-what-is-devops-launchpad) eine kostenlose Plattform mit Kursen, Quizzes und Zertifikaten, deren Inhalte größtenteils nicht an Gearset gebunden sind. Copado bietet laut seiner [Trainingsseite](https://copado.com/training) die Copado Academy und kostenlose Workshops mit Prüfungsgutschein an. Flosum führt mit [Flosum Certified Learning](https://flosum.com/certification) zwei Kurse, Professional und Expert. Nutzen Sie das Training des Werkzeugs, das Sie gewählt haben; für die Grundlagen von Git und Pull Requests taugen alle.

| Rolle | Was sie können muss | Passendes Training |
|---|---|---|
| Admins und Berater | Branch, Pull Request, Merge-Konflikt ohne Angst | sfdx-hardis Level 1 und 2, DevOps Launchpad |
| Entwickler und Tech Leads | Deployment-Schritte, Quality Gates, Testabdeckung | sfdx-hardis Level 2, Training des Werkzeuganbieters |
| Release Manager | Reviews, UAT, Produktion, Hotfix, Kennzahlen | sfdx-hardis Level 3, Training des Werkzeuganbieters |
| Product Owner, Fachbereich | Release-Kalender lesen, UAT abnehmen | kein Kurs, eine Stunde mit dem Release Manager |

Partner würde ich wie interne Teams behandeln und im Vertrag verlangen, dass jeder Entwickler vor dem ersten Pull Request das Basistraining nachweist und das Onboarding-Dokument aus Ihrem Repository gelesen hat. Das kostet einen Tag pro Person und spart die Diskussion im dritten Sprint, warum der Partner doch wieder per Change Set deployen möchte. Wie das in die Steuerung mehrerer Partner passt, beschreibe ich in der [Partnersteuerung](../../../leistungen/partnersteuerung/).

## Welche Fehler bremsen die Einführung?

Die folgenden Muster folgen aus der Struktur eines Programms mit mehreren Partnern und tauchen deshalb immer wieder auf:

- **Das Werkzeug kommt vor dem Prozess.** Eine Lizenz ersetzt kein Branch-Modell, keine Freigaberegel und keinen Release Manager.
- **Der erste Partner richtet alles ein.** Dann liegen Repository und Pipeline in seiner Organisation, und ein Partnerwechsel wird zum Migrationsprojekt.
- **Alle Streams wechseln gleichzeitig.** Ein Fehler in der Pipeline stoppt dann das ganze Programm statt eines Piloten.
- **Produktion bleibt offen.** Ein Schnellfix im Setup der Produktion erzeugt Drift, das nächste Deployment überschreibt ihn oder scheitert.
- **Gates blockieren vom ersten Tag an alles.** Die Folge sind abgeschaltete Regeln und `// NOPMD`-Kommentare statt besseren Codes.
- **Nur Entwickler werden geschult.** Admins bauen weiter im Setup, weil ihnen niemand Pull Requests gezeigt hat.
- **Niemand misst.** Ohne Basislinie lässt sich dem Lenkungsausschuss nicht zeigen, was die Umstellung gebracht hat.

Pflicht-Reviews gehören von Anfang an dazu, auch wenn die Pipeline noch einfach ist. Warum, steht in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/).

## Wie messen Sie den Fortschritt?

DORA beschreibt heute [fünf Kennzahlen](https://dora.dev/guides/dora-metrics-four-keys/) für die Auslieferung von Software: Durchlaufzeit von Änderungen, Deployment-Häufigkeit, Wiederherstellungszeit nach einem fehlgeschlagenen Deployment, Änderungsfehlerrate und die Rate der ungeplanten Deployments nach einem Produktionsvorfall (Deployment Rework Rate). Die ersten drei messen Durchsatz, die letzten zwei Instabilität.

Die Werkzeuge liefern einen Teil davon mit. Der [DORA-Bericht von sfdx-hardis](https://sfdx-hardis.cloudity.com/hardis/doc/salesforce-devops-dora-report/) berechnet laut Dokumentation alle fünf pro Hauptbranch, wie in [Kapitel 9](../betrieb-monitoring-backup/) beschrieben, und die [Übersicht](https://sfdx-hardis.cloudity.com/salesforce-devops-home/) ordnet die klassischen vier gegen Branchenwerte ein. Gearset hat ein [DevOps-Performance-Dashboard](https://docs.gearset.com/en/articles/11560575-measuring-your-devops-performance) mit denselben vier, das eine Lizenz für Teams oder Enterprise Automation Platform und Pipelines mit Promotion-Branch-Strategie voraussetzt; Änderungsfehlerrate und Wiederherstellungszeit beruhen dort auf Fehlern, die Ihr Team in den Promotions meldet. Beide Zahlen sind also nur so gut wie die Disziplin beim Melden.

Für ein Programm in der Einführung würde ich vier eigene Werte ergänzen, weil sie den Fortschritt früher zeigen als DORA:

1. **Anteil der Deployments über die Pipeline** an allen Deployments nach UAT und Produktion. Ziel ist 100 Prozent zum Stichtag.
2. **Manuelle Schritte im Release-Plan.** Jede Zeile, die jemand von Hand im Setup ausführt, ist ein Risiko am Release-Abend.
3. **Wartezeit bis zum ersten Review** pro Pull Request. Steigt sie, fehlt Review-Kapazität, nicht Entwicklerkapazität.
4. **Drift-Funde pro Monat** aus dem Monitoring, also Änderungen in Produktion, die nicht aus dem Repository kamen.

Erheben Sie die Basislinie, bevor Phase 2 beginnt, notfalls aus den Release-Plänen des letzten Halbjahres. Dem Lenkungsausschuss würde ich diese Werte quartalsweise auf einer Seite berichten, nach Stream und Partner getrennt.

## Ein typisches Szenario, als Annahme: drei Partner, eine Org

Ein typisches Szenario, als Annahme: Ein Maschinenbauer betreibt Service Cloud, Field Service für den Außendienst, ein Händlerportal auf Experience Cloud und eine SAP-Schnittstelle für Aufträge und Ersatzteile. Drei Partner deployen per Change Set, alle vier Wochen gibt es ein Release mit einem Plan von 60 manuellen Zeilen. Alle Zahlen sind Annahmen.

```schritte
Eigentum klären | Monate 1 und 2 · Kunde
  Der Kunde benennt eine interne Release Managerin, entscheidet sich für ein Werkzeug und ergänzt die drei Verträge um eine Anlage mit Branch-Modell, Review-Pflicht und Stichtag.
Pilot starten | Monat 3
  Das Repository entsteht aus Produktion, der Händlerportal-Stream startet als Pilot.
Validieren und schulen | Monate 4 und 5
  Validierung bei jedem Pull Request, Gates blockieren schwere Funde. Die Release Managerin und zwei Admins machen das Training.
Alle Streams umstellen | Monat 6
  Die Partner für Field Service und SAP wechseln, Stichtag für Change Sets.
Daten und Betrieb | Monate 7 bis 9
  Preisbücher und Field-Service-Konfiguration kommen ins Repository, der Release-Kalender steht, das Monitoring meldet Drift.
```

Nach neun Monaten hat der Release-Plan zwölf statt 60 manuelle Zeilen, UAT bekommt wöchentlich statt monatlich neue Stände, und ein Partnerwechsel im Field-Service-Stream wäre eine Vertragsfrage, kein Technikprojekt. Diese Zahlen sind Planwerte für das Beispiel, keine Messung.

## Was ändert sich, wenn Coding-Agenten in der Pipeline arbeiten?

Coding-Agenten schreiben Code schneller, als Menschen ihn prüfen. Eine Pipeline mit Pflicht-Reviews und blockierenden Gates fängt das ab, eine Pipeline ohne sie leitet es nur schneller in Produktion. DORA zählt [kleine Batches](https://dora.dev/capabilities/) deshalb zu den Fähigkeiten, die das Risiko ausgleichen, wenn KI die Entwicklung beschleunigt. Für mich folgt daraus eine klare Reihenfolge: erst die Phasen 1 bis 4, dann Agenten.

Wenn es so weit ist, ändern sich vier Dinge:

- **Eine Regeldatei kommt ins Repository.** `CLAUDE.md`, `AGENTS.md` oder `.vibes/rules/` gehören Ihnen und haben eine verantwortliche Person auf Ihrer Seite, siehe [die KI-Regeldatei im Salesforce-Repository](../../../blog/ki-regeldatei-salesforce-repository/).
- **Die Gates bekommen Regeln für typische Agentenfehler**, etwa eine Prüfung, ob ein Agent nebenbei die API-Version einer Apex-Klasse angehoben hat. Details in [Quality Gates für KI-Code](../../../blog/quality-gates-ki-code-salesforce-pipeline/).
- **Agentforce-Agenten werden selbst zu Release-Gegenständen.** Ihr Agent Script liegt in Git und läuft durch Validierung, Publish und Aktivierung, siehe [Agentforce-Agenten in der Release-Pipeline](../../../blog/agentforce-agenten-release-pipeline/).
- **Die DevOps-Werkzeuge bringen eigene Agenten mit.** sfdx-hardis führt in seiner Übersicht ein Coding Agent Auto-Fix (Beta) für Deployment-Fehler, Copado und Gearset haben eigene Agenten angekündigt, die ich in [Copado, Gearset und Provar im Kundencheck](../../../blog/copado-gearset-provar-ki-agenten/) einordne. Jeder Vorschlag eines Agenten durchläuft dieselben Prüfungen und ein menschliches Review.

Am stärksten trifft das die Review-Kapazität, besonders bei Nearshore-Teams in anderen Zeitzonen. Ich habe mit Nearshore-Teams in Osteuropa und Indien gearbeitet, und was sich mit Agenten dort verschiebt, beschreibe ich in [Nearshore-Salesforce-Teams mit KI-Agenten](../../../blog/nearshore-salesforce-teams-ki-agenten/).

Ab hier übernimmt die KI-Masterclass. Welcher Coding-Agent zu Ihrem Team oder Partner passt und was dafür im Vertrag stehen muss, behandelt [Kapitel 4 der KI-Masterclass](../../ki-salesforce/externe-coding-agenten/). Wie sich Rollen, Review-Gates und Kennzahlen ändern, wenn Teams mit Agenten liefern, steht in [Kapitel 9 der KI-Masterclass](../../ki-salesforce/teamarbeit-und-delivery/). Den Betrieb, auf dem diese Phase aufsetzt, beschreibt das vorige [Kapitel 9 zu Betrieb und Monitoring](../betrieb-monitoring-backup/), alle Kapitel dieser Masterclass finden Sie auf der [Übersichtsseite](../). Die Einführung selbst begleite ich im [DevOps- und Release-Management](../../../leistungen/devops-und-release-management/).

Eine DevOps-Einführung ist dann fertig, wenn Ihr eigenes Team den Release-Prozess auch ohne den heutigen Partner betreiben könnte. Wenn Sie wissen möchten, in welcher Phase Ihr Programm steht und was als Nächstes kommt, [schreiben Sie mir](#contact).
