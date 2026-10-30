---
title: "sfdx-hardis: Salesforce DevOps als Open Source erklärt"
description: "Was sfdx-hardis ist, was es von CI/CD über Monitoring bis Dokumentation abdeckt, wie es sich von Gearset oder Copado unterscheidet und wann es passt."
pubDate: 2026-10-23
lang: de
slug: sfdx-hardis-einfuehrung-salesforce-devops
translationKey: sfdx-hardis-introduction
topic: open-source
categories: [devops]
tags: [sfdx-hardis, DevOps, Open Source, Release-Management, CI/CD]
takeaways:
  - "sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps aus Salesforce-CLI-Plugin und VS-Code-Erweiterung, geführt von Nicolas Vuillamy und Cloudity."
  - "Es deckt den ganzen Release-Prozess ab: CI/CD-Pipeline, Delta-Deployments, Qualitätsprüfungen, Org-Monitoring, Metadaten-Backup und generierte Dokumentation."
  - "Die Pipeline läuft auf der Git-Plattform, die der Kunde schon nutzt, zum Beispiel GitHub, GitLab, Azure DevOps, Bitbucket oder Jenkins."
  - "Im Vergleich zu kommerziellen Tools wie Gearset oder Copado fallen keine laufenden Lizenzkosten an, das Team braucht aber Grundwissen zu Git und Pipelines."
  - "Es passt am besten, wenn der Kunde seinen Release-Prozess selbst besitzen will und internes DevOps-Wissen hat oder aufbaut."
faq:
  - q: "Was ist sfdx-hardis?"
    a: "sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps. Es besteht aus einem Salesforce-CLI-Plugin und einer VS-Code-Erweiterung und liefert eine fertige CI/CD-Pipeline, Monitoring, Backups und Dokumentation."
  - q: "Ist sfdx-hardis wirklich kostenlos?"
    a: "Ja. Das Tool selbst ist Open Source und hat keine Lizenzgebühren. Kosten entstehen nur für die Git-Plattform und CI-Minuten, die der Kunde ohnehin nutzt, sowie für Einrichtung und Betrieb."
  - q: "Welche Git-Plattformen unterstützt sfdx-hardis?"
    a: "sfdx-hardis unterstützt GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins und bringt Docker-Images für die Pipeline mit. Die Pipeline läuft dort, wo die IT des Kunden ohnehin arbeitet."
  - q: "Eignet sich sfdx-hardis auch für Admins und nicht nur für Entwickler?"
    a: "Ja. Die VS-Code-Erweiterung bietet Menüs und Buttons für die typischen Schritte. So arbeiten Admins und Berater mit Branches, Pull Requests und Deployments, ohne Git-Befehle auswendig zu kennen."
  - q: "Wie unterscheidet sich sfdx-hardis von Gearset oder Copado?"
    a: "Gearset und Copado sind kommerzielle Plattformen mit verwalteter Oberfläche und Support, abgerechnet pro Nutzer. sfdx-hardis hat keine Lizenzkosten und läuft auf der eigenen Git-Plattform, braucht aber mehr internes Wissen."
---

sfdx-hardis ist ein kostenloses Open-Source-Toolkit für Salesforce DevOps. Es verbindet ein Salesforce-CLI-Plugin mit einer VS-Code-Erweiterung und liefert eine fertige CI/CD-Pipeline, Delta-Deployments, Qualitätsprüfungen, Org-Monitoring, Metadaten-Backups und automatisch erzeugte Dokumentation. Es läuft auf der Git-Plattform, die ein Unternehmen bereits nutzt. Ich setze sfdx-hardis in Kundenprojekten ein und halte es für sehr gut, vor allem weil es das liefert, was die meisten Enterprise-Programme brauchen, ohne laufende Lizenzkosten.

## Was ist sfdx-hardis?

[sfdx-hardis](https://sfdx-hardis.cloudity.com/) wird von Nicolas Vuillamy und Cloudity, einem Salesforce-Beratungshaus, geführt, zusammen mit einer großen Community aus externen Mitwirkenden und Übersetzern. Technisch besteht es aus zwei Teilen:

- **Ein Salesforce-CLI-Plugin** mit Befehlen für Deployments, Monitoring, Dokumentation und Projekt-Setup. Die Befehle laufen lokal und in der Pipeline.
- **Eine VS-Code-Erweiterung**, die diese Befehle hinter Menüs und Buttons legt. Sie funktioniert auch in VS-Code-Varianten wie Cursor.

Die Idee dahinter: Salesforce DevOps soll nicht von einer teuren Plattform abhängen. Die meisten Bausteine eines guten Release-Prozesses lassen sich aus offenen Werkzeugen zusammensetzen, und sfdx-hardis bündelt sie zu einem stimmigen Setup. Wenn Sie neu im Thema sind, erklärt mein Artikel [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) zuerst die Grundlagen.

Zur Transparenz: Ich unterstütze das Open-Source-Projekt, habe aber keine finanziellen oder sonstigen Verbindungen zu Cloudity.

## Was deckt sfdx-hardis ab?

Der Umfang ist größer, als viele bei einem Open-Source-Tool erwarten. Die wichtigsten Bereiche:

1. **CI/CD-Pipeline.** Eine vorkonfigurierte Pipeline für GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins, mit Docker-Images für die Pipeline-Runner. Jeder Pull Request löst ein Validierungsdeployment, Apex-Tests und Qualitätsprüfungen aus.
2. **Smart- und Delta-Deployments.** Auf Basis von sfdx-git-delta werden nur geänderte Metadaten deployt. Schlägt ein Deployment fehl, zeigt sfdx-hardis Hinweise zur Behebung an, was viel Sucherei spart.
3. **Deployment Actions.** Schritte vor und nach dem Deployment, etwa Datenkorrekturen oder Referenzdaten über SFDMU, ein Open-Source-Plugin der Salesforce CLI für Datenmigrationen, laufen als Teil der Pipeline statt aus einer Tabelle mit manuellen Schritten.
4. **Qualitätsprüfungen.** Die Ergebnisse im Pull Request enthalten statische Analysen über MegaLinter, sodass Qualitätsprobleme vor dem Merge sichtbar werden.
5. **Org-Monitoring und Backup.** Geplante Jobs sichern Metadaten und prüfen zum Beispiel auf Apex- und Flow-Fehler, Org-Limits, veraltete API-Versionen, inaktive Benutzer oder ungenutzte Metadaten. Die Ergebnisse gehen an Slack, Microsoft Teams, Google Chat oder per E-Mail und können in Dashboards einfließen.
6. **Generierte Dokumentation.** Projektdokumentation inklusive Flows wird aus dem Repository erzeugt und lässt sich veröffentlichen, zum Beispiel in Confluence oder Salesforce.
7. **Ticket-Anbindung.** Jira, Azure Boards und weitere Tools lassen sich anbinden, sodass User Stories und Deployments verknüpft sind.
8. **DORA-Metriken.** Ein Bericht über die vier DevOps-Kennzahlen: Deployment-Häufigkeit, Durchlaufzeit von Änderungen, Fehlerquote von Änderungen und Wiederherstellungszeit.

Am meisten überzeugt mich, wo all das liegt. Weil sfdx-hardis auf der Git-Plattform des Kunden läuft, bleiben Repository, Pipeline und Konfiguration beim Kunden, egal welcher Partner die Funktionen baut.

## Wie unterscheidet sich sfdx-hardis von Gearset oder Copado?

Kommerzielle Tools wie Gearset oder Copado haben ihre Berechtigung. Sie bieten eine verwaltete Weboberfläche, Herstellersupport und Funktionen wie Org-Vergleiche mit wenigen Klicks. Für manche Teams ist das sein Geld wert. Es gibt aber Abwägungen:

- **Lizenzkosten.** Kommerzielle Plattformen werden meist pro Nutzer und Jahr abgerechnet. In einem Programm mit Dutzenden Entwicklern und Admins über mehrere Partner summiert sich das schnell, und es hört nie auf. sfdx-hardis hat keine Lizenzgebühren.
- **Wo der Prozess liegt.** Bei einer kommerziellen Plattform liegt ein Teil des Release-Prozesses im Produkt des Herstellers. Bei sfdx-hardis liegt er im Repository und in der Pipeline-Konfiguration des Kunden, in einfachen Dateien.
- **Wissen.** sfdx-hardis setzt voraus, dass das Team Git, Branches und Pipelines zumindest grundlegend versteht. Eine kommerzielle Plattform versteckt mehr davon. Die VS-Code-Erweiterung schließt für Admins einen großen Teil dieser Lücke, aber nicht alles.
- **Support.** Open Source heißt Community-Support oder bezahlte Beratung, keine Hersteller-Hotline. Für die meisten Enterprise-Teams, mit denen ich arbeite, ist das in Ordnung, solange mindestens eine interne Person das Setup verantwortet.

![Vergleich von sfdx-hardis mit kommerziellen Plattformen wie Gearset oder Copado: sfdx-hardis hat keine Lizenzgebühren, hält den Prozess im Repository und in der Pipeline-Konfiguration des Kunden in einfachen Dateien, setzt Git-Grundlagen voraus, wobei die VS-Code-Erweiterung für Admins einen großen Teil der Lücke schließt, und setzt auf Community-Support oder bezahlte Beratung. Kommerzielle Plattformen werden meist pro Nutzer und Jahr abgerechnet, halten einen Teil des Prozesses im Produkt des Herstellers, verstecken mehr von Git hinter einer verwalteten Weboberfläche und bieten Herstellersupport. Kein Tool passt für jedes Team: früh wählen, sauber begründen und für jeden Partner verbindlich machen.](../../../assets/blog/sfdx-hardis-vs-commercial-de.png)

Das DevOps Center von Salesforce ist eine weitere kostenlose Option. Es ist ein guter Einstieg für Teams, die vor allem klicken, deckt aber weniger von Pipeline, Monitoring und Dokumentation ab. Den ausführlichen Vergleich, inklusive der unterstützten Git-Plattformen, finden Sie in [sfdx-hardis oder DevOps Center](../sfdx-hardis-oder-devops-center-vergleich/).

Wichtig ist mir dabei: Es gibt kein Tool, das für jedes Team richtig ist. Entscheidend ist, dass die Wahl früh getroffen, sauber begründet und dann für alle Beteiligten verbindlich wird, auch für jeden Partner. Ein Programm, in dem jeder Partner sein eigenes Werkzeug mitbringt, hat am Ende mehrere Release-Prozesse und damit keinen.

## Wann ist sfdx-hardis die richtige Wahl?

Aus meiner Projekterfahrung hängt die Antwort an diesen Punkten:

```pro-contra
pro: sfdx-hardis passt gut, wenn
- mehrere Teams oder Partner an derselben Org arbeiten und einen verbindlichen Release-Prozess brauchen
- der Kunde den Prozess selbst besitzen und keine Abhängigkeit von einem Partner oder Tool-Hersteller will
- der Kunde bereits GitHub, GitLab oder Azure DevOps betreibt und die Pipeline dort haben möchte
- es mindestens eine interne Person gibt oder geben wird, die das Setup übernimmt
- Lizenzbudgets knapp sind oder besser in Menschen als in Gebühren pro Nutzer fließen
contra: Weniger geeignet, wenn
- auf Kundenseite niemand mit Git arbeiten möchte
- ein Team vom ersten Tag an ein vollständig verwaltetes Tool mit vertraglich zugesichertem Support braucht
```

Im zweiten Fall kann eine kommerzielle Plattform die ehrlichere Antwort sein.

Der Punkt mit den Lizenzbudgets wird oft unterschätzt. Die eingesparten Lizenzkosten sind am besten in eine interne Rolle investiert, die das Setup pflegt, neue Teams einarbeitet und den Release-Kalender verantwortet. Ohne diese Rolle verliert auch das beste Werkzeug nach einigen Monaten an Wirkung. Mit Entwicklungsstandards bei Partnern ist es genauso, siehe [Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/).

## Wie steigen Sie ein?

Am schnellsten verstehen Sie sfdx-hardis, indem Sie es ausprobieren, nicht indem Sie darüber lesen. Cloudity bietet ein kostenloses Praxistraining mit drei Leveln und geprüften Badges an. Ich habe alle drei abgeschlossen und meine Erfahrungen in [was ich aus dem kostenlosen sfdx-hardis-Training mitgenommen habe](../sfdx-hardis-kostenloses-devops-training/) aufgeschrieben.

Für ein echtes Programm empfehle ich diese Reihenfolge:

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
  Monitoring, Backups und generierte Dokumentation einschalten.
```

Die Wahl der Werkzeuge gehört zu [Architektur und Partnersteuerung](../../leistungen/partnersteuerung/) und ist keine Nebenentscheidung der Entwickler. sfdx-hardis liefert einen professionellen Release-Prozess ohne Lizenzkosten, solange jemand ihn verantwortet.
