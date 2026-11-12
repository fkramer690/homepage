---
title: "sfdx-hardis: Salesforce DevOps als Open Source erklärt"
metaTitle: "sfdx-hardis: kostenloses Salesforce-DevOps-Toolkit erklärt"
description: "sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps: CI/CD, Delta-Deployments, Monitoring, Backups. Vergleich mit Gearset und Copado."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: sfdx-hardis-einfuehrung-salesforce-devops
translationKey: sfdx-hardis-introduction
topic: open-source
categories: [devops]
tags: [sfdx-hardis, DevOps, Open Source, Release-Management, CI/CD]
takeaways:
  - "sfdx-hardis besteht aus einem Plugin für die Salesforce CLI und einer VS-Code-Erweiterung und wird von Nicolas Vuillamy und Cloudity geleitet."
  - "Es deckt den technischen Release-Prozess ab: CI/CD, optionale Delta-Deployments, Qualitätsprüfungen, Org-Monitoring, Metadaten-Backup und Dokumentation."
  - "Die Pipeline läuft auf der Git-Plattform, die der Kunde schon nutzt, zum Beispiel GitHub, GitLab, Azure DevOps, Bitbucket oder Jenkins."
  - "Anders als bei Gearset oder Copado fällt für sfdx-hardis selbst keine Lizenzgebühr an, aber das Team braucht Git- und Pipeline-Wissen und verantwortet Upgrades."
  - "Es passt am besten, wenn der Kunde seinen Release-Prozess selbst besitzen will und internes DevOps-Wissen hat oder aufbaut."
faq:
  - q: "Was ist sfdx-hardis?"
    a: "sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps. Es besteht aus einem Salesforce-CLI-Plugin und einer VS-Code-Erweiterung und liefert eine fertige CI/CD-Pipeline, Monitoring, Metadaten-Backups und Dokumentation."
  - q: "Ist sfdx-hardis wirklich kostenlos?"
    a: "Das Tool selbst ist unter der AGPL-3.0-Lizenz Open Source, und es fallen keine Lizenzgebühren an. Kosten entstehen für die Git-Plattform und CI-Minuten, für Einrichtung, Upgrades und Betrieb sowie optional für ein bezahltes Support-Abonnement bei Cloudity."
  - q: "Welche Git-Plattformen unterstützt sfdx-hardis?"
    a: "sfdx-hardis unterstützt GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins und bringt Docker-Images für die Pipeline mit. Die Pipeline läuft dort, wo die IT des Kunden ohnehin arbeitet."
  - q: "Eignet sich sfdx-hardis auch für Admins und nicht nur für Entwickler?"
    a: "Ja, für die tägliche Arbeit. Die VS-Code-Erweiterung bietet Menüs und Buttons für die typischen Schritte. So arbeiten Admins und Berater mit Branches, Pull Requests und Deployments, ohne Git-Befehle auswendig zu kennen. Wer die Pipeline einrichtet und pflegt, braucht weiterhin Kenntnisse in Git, CI/CD und Salesforce-Deployments."
  - q: "Wie unterscheidet sich sfdx-hardis von Gearset oder Copado?"
    a: "Gearset und Copado sind kommerzielle Plattformen mit verwalteter Oberfläche und Herstellersupport, meist abgerechnet pro Nutzer. Für sfdx-hardis fallen keine Lizenzkosten an, und es läuft auf der eigenen Git-Plattform, erfordert aber mehr internes Wissen."
---

sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps. Es verbindet ein Salesforce-CLI-Plugin mit einer VS-Code-Erweiterung und liefert eine fertige CI/CD-Pipeline, optionale Delta-Deployments, Qualitätsprüfungen, Org-Monitoring, Metadaten-Backups und automatisch erzeugte Dokumentation. Es läuft auf der Git-Plattform, die ein Unternehmen bereits nutzt. Ich setze sfdx-hardis in Kundenprojekten ein und halte es für sehr gut, vor allem weil es das liefert, was die meisten Enterprise-Programme brauchen, ohne Lizenzgebühren für das Tool selbst.

Dieser Artikel gibt meinen Überblick über sfdx-hardis. Zwei weitere Artikel gehen mehr ins Detail: Der [Vergleich von sfdx-hardis und DevOps Center](/blog/sfdx-hardis-oder-devops-center-vergleich/) zeigt, wann das native Werkzeug von Salesforce reicht, und mein [Erfahrungsbericht zum kostenlosen sfdx-hardis-Training](/blog/sfdx-hardis-kostenloses-devops-training/) beschreibt, wie Sie das Toolkit in einem Tag selbst ausprobieren.

## Was ist sfdx-hardis?

[sfdx-hardis](https://sfdx-hardis.cloudity.com/) wird von Nicolas Vuillamy und Cloudity, einem Salesforce-Beratungshaus, geleitet und von einer großen Community aus externen Mitwirkenden und Übersetzern unterstützt. Technisch besteht es aus zwei Teilen:

- **Ein Salesforce-CLI-Plugin** mit Befehlen für Deployments, Monitoring, Dokumentation und Projekt-Setup. Die Befehle laufen lokal und in der Pipeline.
- **Eine VS-Code-Erweiterung**, die diese Befehle über Menüs und Buttons zugänglich macht. Sie funktioniert auch in VS-Code-Varianten wie Cursor.

Beide werden unter der AGPL-3.0-Lizenz veröffentlicht und sollten deshalb in die übliche Open-Source-Prüfung einbezogen werden.

Die Idee dahinter: Salesforce DevOps soll nicht von einer teuren Plattform abhängen. Die meisten Bausteine eines guten Release-Prozesses lassen sich aus offenen Werkzeugen zusammensetzen, und sfdx-hardis bündelt sie zu einem stimmigen Setup. Wenn Sie neu im Thema sind, erklärt mein Artikel [warum DevOps über Salesforce-Großprojekte entscheidet](/blog/warum-devops-salesforce-enterprise-projekte/) zuerst die Grundlagen.

Zur Transparenz: Ich unterstütze das Open-Source-Projekt, habe aber keine finanziellen oder sonstigen Verbindungen zu Cloudity.

## sfdx-hardis deckt den technischen Release-Prozess ab

Der Umfang ist größer, als viele bei einem Open-Source-Tool erwarten. Die wichtigsten Bereiche:

1. **CI/CD-Pipeline.** Eine vorkonfigurierte Pipeline für GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins, mit Docker-Images für die Pipeline-Runner. Jeder Pull Request für einen konfigurierten Hauptbranch löst ein Validierungsdeployment, Apex-Tests und Qualitätsprüfungen aus.
2. **Smart- und Delta-Deployments.** Sobald Delta-Deployments eingeschaltet sind, deployt sfdx-git-delta bei Pull Requests aus Feature-Branches nur die geänderten Metadaten. Überführungen zwischen Haupt-Branches bleiben standardmäßig vollständige Deployments. Schlägt ein Deployment fehl, zeigt sfdx-hardis Hinweise zur Behebung an, was den Analyseaufwand deutlich reduziert.
3. **Deployment Actions.** Schritte vor und nach dem Deployment, etwa Datenkorrekturen oder das Laden von Referenzdaten mit SFDMU, werden als Teil der Pipeline ausgeführt; eine Tabelle mit manuellen Arbeitsschritten entfällt.
4. **Qualitätsprüfungen.** Die Ergebnisse im Pull Request enthalten statische Analysen von MegaLinter, sodass Qualitätsprobleme vor dem Merge sichtbar werden.
5. **Org-Monitoring und Metadaten-Backup.** Geplante Jobs sichern Metadaten in Git und prüfen zum Beispiel auf Apex- und Flow-Fehler, Org-Limits, veraltete API-Versionen, inaktive Benutzer oder ausgewählte ungenutzte Metadaten. Das ist kein Backup Ihrer Geschäftsdaten. Die Ergebnisse gehen an Slack, Microsoft Teams, Google Chat oder per E-Mail und können in Dashboards einfließen.
6. **Generierte Dokumentation.** Projektdokumentation inklusive Flows wird aus dem Repository erzeugt und lässt sich veröffentlichen, zum Beispiel in Confluence oder Salesforce.
7. **Ticket-Anbindung.** Jira, Azure Boards und weitere Tools lassen sich anbinden, sodass User Stories und Deployments verknüpft sind.
8. **DORA-Metriken.** sfdx-hardis erzeugt einen Bericht über fünf zentrale Kennzahlen: Deployment-Häufigkeit, Durchlaufzeit von Änderungen, Fehlerquote von Änderungen, mittlere Wiederherstellungszeit und Nacharbeitsquote bei Deployments.

Am meisten überzeugt mich, wo all das liegt. Weil sfdx-hardis auf der Git-Plattform des Kunden läuft, bleiben Repository, Pipeline und Konfiguration beim Kunden, egal welcher Partner die Funktionen entwickelt.

## Wie unterscheidet sich sfdx-hardis von Gearset oder Copado?

Kommerzielle Tools wie Gearset oder Copado haben ihre Berechtigung. Sie bieten eine verwaltete Weboberfläche, Herstellersupport und Funktionen wie Org-Vergleiche mit wenigen Klicks. Für manche Teams rechtfertigt das die Kosten. Es gibt aber Abwägungen:

- **Lizenzkosten.** Kommerzielle Plattformen werden meist pro Nutzer und Jahr abgerechnet. In einem Programm mit Dutzenden Entwicklern und Admins über mehrere Partner summiert sich das schnell. Für sfdx-hardis selbst fallen keine Lizenzgebühren an.
- **Wo der Prozess liegt.** Bei einer kommerziellen Plattform liegt ein Teil des Release-Prozesses im Produkt des Herstellers. Bei sfdx-hardis liegt er im Repository und in der Pipeline-Konfiguration des Kunden, in einfachen Dateien.
- **Wissen.** sfdx-hardis setzt voraus, dass das Team Git, Branches und Pipelines zumindest grundlegend versteht. Eine kommerzielle Plattform versteckt mehr davon. Die VS-Code-Erweiterung schließt für Admins einen großen Teil dieser Lücke, aber nicht alles.
- **Support.** Die Community leistet kostenlosen Support nach dem Best-Effort-Prinzip. Cloudity verkauft außerdem monatliche und jährliche Support-Abonnements mit bevorzugter Bearbeitung. Für die meisten Enterprise-Teams, mit denen ich arbeite, ist das in Ordnung, solange mindestens eine interne Person das Setup verantwortet und dabei getestete Versionen festschreibt, statt immer die neueste einzusetzen.

```tabelle
titel: sfdx-hardis im Vergleich mit kommerziellen Plattformen
spalten: | sfdx-hardis * | Kommerzielle Plattformen wie Gearset oder Copado ~ Gearset, Copado und Co.
Lizenzkosten | Keine Lizenzgebühren | Meist pro Nutzer und Jahr abgerechnet
Wo der Prozess liegt | Im Repository und in der Pipeline-Konfiguration des Kunden, in einfachen Dateien | Teilweise im Produkt des Herstellers
Wissen | Git-Grundlagen nötig. Die VS-Code-Erweiterung schließt für Admins einen großen Teil der Lücke | Versteckt mehr von Git hinter einer verwalteten Weboberfläche
Support | Community-Support, bezahltes Support-Abonnement oder Beratung | Herstellersupport
fazit: Kein Tool passt für jedes Team. Früh wählen, sauber begründen, für jeden Partner verbindlich machen.
```
Das DevOps Center von Salesforce, das jetzt Lifecycle Center heißt, ist eine weitere kostenlose Option. Es ist ein guter Einstieg für Teams, die vor allem über die Oberfläche arbeiten, deckt aber weniger Funktionen in den Bereichen Pipeline, Monitoring und Dokumentation ab. Den ausführlichen Vergleich, inklusive der unterstützten Git-Plattformen, finden Sie in [sfdx-hardis und DevOps Center](/blog/sfdx-hardis-oder-devops-center-vergleich/).

Wichtig ist mir dabei: Es gibt kein Tool, das für jedes Team richtig ist. Entscheidend ist, dass die Wahl früh getroffen, sauber begründet und dann für alle Beteiligten verbindlich wird, auch für jeden Partner. Ein Programm, in dem jeder Partner sein eigenes Werkzeug mitbringt, hat am Ende mehrere Release-Prozesse und damit keinen.

## Wann ist sfdx-hardis die richtige Wahl?

Aus meiner Projekterfahrung hängt die Antwort von diesen Punkten ab:

```pro-contra
pro: sfdx-hardis passt gut, wenn
- mehrere Teams oder Partner an derselben Org arbeiten und einen verbindlichen Release-Prozess brauchen
- der Kunde den Prozess selbst besitzen und die Abhängigkeit von einem Partner oder Tool-Hersteller verringern will
- der Kunde bereits GitHub, GitLab oder Azure DevOps betreibt und die Pipeline dort haben möchte
- es mindestens eine interne Person gibt oder geben wird, die das Setup übernimmt
- Lizenzbudgets knapp sind oder besser in Menschen als in Gebühren pro Nutzer fließen
contra: Weniger geeignet, wenn
- auf Kundenseite niemand mit Git arbeiten möchte
- ein Team vom ersten Tag an ein vollständig verwaltetes Tool mit vertraglich zugesichertem Support braucht
```

Im zweiten Fall kann eine kommerzielle Plattform die ehrlichere Antwort sein.

Das Thema Lizenzbudgets wird oft unterschätzt. Die eingesparten Lizenzkosten investieren Sie am besten in eine interne Rolle, die das Setup pflegt, neue Teams einarbeitet und den Release-Kalender verantwortet. Ohne diese Rolle verliert auch das beste Werkzeug nach einigen Monaten an Wirkung. Mit Entwicklungsstandards bei Partnern ist es genauso, siehe [Reinforcement: Standards bei Partnern verankern](/blog/standards-partner-verankern-reinforcement/).

## Mit dem kostenlosen Training einsteigen

Am schnellsten verstehen Sie sfdx-hardis, indem Sie es ausprobieren. Cloudity bietet ein kostenloses Praxistraining mit drei Levels und verifizierten Badges an. Ich habe alle drei abgeschlossen und meine Erfahrungen in [was ich aus dem kostenlosen sfdx-hardis-Training mitgenommen habe](/blog/sfdx-hardis-kostenloses-devops-training/) aufgeschrieben.

Die Wahl der Werkzeuge gehört zu [Architektur und Partnersteuerung](/leistungen/partnersteuerung/) und ist keine Nebenentscheidung der Entwickler. Für ein laufendes Programm empfehle ich diese Reihenfolge:

```schritte
Repository aufbauen
  Die Produktions-Metadaten in ein Repository auf der Git-Plattform des Kunden bringen.
Pipeline einrichten
  Die sfdx-hardis-Pipeline mit Validierung bei jedem Pull Request einrichten.
Regeln festlegen
  Die Branch-Strategie festlegen und Pull-Request-Reviews verpflichtend machen.
Deployment Actions
  Deployment-Schritte aus Tabellen in Deployment Actions überführen.
Betrieb einschalten
  Monitoring, Metadaten-Backups und generierte Dokumentation einschalten.
```
