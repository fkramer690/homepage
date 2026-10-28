---
title: "Salesforce DevOps und Release-Management Beratung"
headline: "Salesforce-Releases, die kein Wochenende mehr brauchen"
description: "Git-basierte Salesforce-Releases mit Branching, automatischen Prüfungen und Pull-Request-Reviews auf der Plattform des Kunden, etwa GitHub oder GitLab."
lang: de
slug: devops-und-release-management
translationKey: service-devops
contactBrief: devops
order: 3
lead: "Change Sets, manuelle Deployment-Schritte und Releases, die ein Wochenende brauchen, sind in großen Salesforce-Orgs noch verbreitet. Ich setze einen Git-basierten Release-Prozess mit automatischen Prüfungen und Reviews auf der Plattform des Kunden auf. Releases werden kleiner, häufiger und planbar."
situations:
  - "Deployments laufen noch mit Change Sets oder von Hand, und niemand kann genau sagen, was letzten Monat in Produktion ging."
  - "Jedes Release braucht eine lange Liste manueller Schritte vor und nach dem Deployment, die in einem Kopf oder einer Tabelle stehen."
  - "Sandboxes laufen auseinander, und ein Feature, das in UAT lief, bricht in Produktion."
  - "Mehrere Teams deployen in dieselbe Org ohne gemeinsames Branching-Modell."
  - "Ein kommerzielles DevOps-Tool ist im Einsatz, aber die Lizenzkosten steigen und nur wenige können es bedienen."
deliverables:
  - "Branching- und Umgebungsstrategie, passend zur Zahl der Teams und zum Release-Rhythmus"
  - "CI/CD-Pipeline auf GitHub, GitLab, Azure DevOps oder Bitbucket im Besitz des Kunden"
  - "Automatische Prüfungen bei jedem Pull Request: Validierungs-Deployment, Apex-Tests, statische Codeanalyse"
  - "Automatisierte Post-Deployment-Schritte und Daten-Deployments statt manueller Checklisten"
  - "Review-Regeln und Codequalitäts-Standards für interne Teams und Partner"
  - "Dokumentation und Schulung, damit interne Kollegen den Prozess selbst führen"
results:
  - "Jede Änderung in Produktion lässt sich einem Pull Request und einem Reviewer zuordnen"
  - "Kleinere, häufigere Releases statt großer Release-Wochenenden"
  - "Fehler werden bei der Validierung gefunden, bevor sie UAT oder Produktion erreichen"
  - "Keine laufenden Lizenzkosten für die Pipeline selbst, wenn sie mit Open-Source-Tools gebaut ist"
  - "Ein Prozess, der dem Kunden gehört und den er jedem Partner geben kann"
phases:
  - title: "Bestandsaufnahme"
    text: "Ich schaue mir den aktuellen Release-Prozess an, die Umgebungen, das Repository und die Schmerzpunkte der Teams: wo Deployments scheitern, was von Hand passiert, wer was freigibt."
  - title: "Zielprozess"
    text: "Wir einigen uns auf Branching-Modell, Umgebungen, Prüfungen pro Stufe und Review-Regeln. Das Design hängt von der Teamgröße ab und davon, wie oft das Business releasen möchte."
  - title: "Aufbau der Pipeline"
    text: "Ich baue die Pipeline auf der Git-Plattform des Kunden, meist mit sfdx-hardis, und bringe das erste Team darauf. Weitere Teams folgen, sobald der Prozess stabil läuft."
  - title: "Übergabe"
    text: "Interne Kollegen lernen, die Pipeline zu betreiben und zu erweitern. Die Dokumentation liegt im Repository des Kunden, direkt neben dem Code."
faq:
  - q: "Auf welchen Git-Plattformen kann eine Salesforce-Pipeline laufen?"
    a: "Ich habe Salesforce-Pipelines auf GitHub, GitLab, Azure DevOps und Bitbucket gebaut. Jede Plattform hat ihre Eigenheiten, aber die Pipelines werden in YAML definiert, daher ist das Grundgerüst überall gleich. Am besten passt meist die Plattform, die das Unternehmen schon nutzt."
  - q: "Brauchen wir ein kommerzielles DevOps-Tool wie Gearset oder Copado?"
    a: "Nicht unbedingt. Kommerzielle Tools funktionieren, haben aber laufende Lizenzkosten. Open-Source-Tools wie sfdx-hardis decken Branching, Prüfungen, Deployments und Monitoring auf der Git-Plattform des Kunden ab. Welcher Weg passt, hängt vom Team, vom Budget und davon ab, wie viel der Kunde selbst besitzen möchte."
  - q: "Wie misst man, ob der neue Release-Prozess funktioniert?"
    a: "Vorher-nachher-Zahlen sind oft schwer zu bekommen, weil viele Unternehmen ihren aktuellen Prozess nicht messen können und weil sich Releases verändern: Sie werden kleiner und häufiger. Ich setze auf Kennzahlen, die die Pipeline selbst liefert, etwa Deployment-Häufigkeit, fehlgeschlagene Deployments und Durchlaufzeit von Änderungen."
  - q: "Wie lange dauert die Einführung eines Git-basierten Release-Prozesses?"
    a: "Das hängt von der Zahl der Teams und vom Zustand der Org ab. Das erste Team arbeitet meist nach einigen Wochen mit dem neuen Prozess, weitere Teams folgen Schritt für Schritt, damit niemand über Nacht umstellen muss."
blogTags: [devops, release management, release-management, sfdx-hardis, ci/cd, pull request review]
---

Salesforce DevOps bedeutet, dass jede Änderung über Git, einen Pull Request und eine automatische Pipeline läuft, bevor sie in Produktion ankommt. Release-Management ergänzt die Regeln darum: welche Branches es gibt, welche Prüfungen auf welcher Stufe laufen, wer freigibt und wann das Business neue Funktionen bekommt. In großen Orgs mit mehreren Teams macht genau das aus anstrengenden Release-Wochenenden Routine. Diesen Prozess setze ich auf Kundenseite auf, auf der Git-Plattform, die der Kunde schon besitzt.

## Warum machen Salesforce-Releases so viel Ärger?

Salesforce macht es leicht, direkt in einer Org etwas zu ändern. Am Anfang ist das praktisch, sobald mehrere Teams parallel arbeiten, wird es zum Problem. Ohne Versionskontrolle weiß niemand, welche Version eines Flows oder Permission Sets die richtige ist, und Sandboxes laufen auseinander. Die typischen Symptome beschreibe ich in [warum DevOps in Salesforce-Enterprise-Projekten zählt](../../blog/warum-devops-salesforce-enterprise-projekte/).

Der teuerste Teil ist oft unsichtbar: manuelle Schritte vor und nach jedem Deployment, etwa Flows aktivieren, Referenzdaten laden oder Einstellungen anpassen. Sie stehen in Checklisten oder in den Köpfen weniger Leute, und jedes Release hängt davon ab, dass diese Leute verfügbar sind.

## Was macht eine gute Salesforce-Pipeline?

Eine Pipeline für Enterprise-Teams deckt ein paar Grundlagen ab:

- **Prüfungen bei jedem Pull Request.** Ein Validierungs-Deployment gegen die Ziel-Org, Apex-Tests und statische Codeanalyse laufen, bevor jemand die Änderung reviewt.
- **Ein klarer Weg durch die Umgebungen.** Änderungen wandern über Promotion Branches von der Entwicklung in Integration, UAT und Produktion, und es ist immer sichtbar, welche Änderung in welcher Org liegt.
- **Automatisierte Post-Deployment-Schritte.** Was früher von Hand lief, ist Teil des Deployments, und Referenzdaten lassen sich mit SFDMU deployen, einem Open-Source-Plugin für Datenmigration.
- **Ein Review für jede Änderung.** Die Automatisierung findet die wiederholbaren Fehler, Menschen prüfen Design und Lesbarkeit. Mehr dazu in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../../blog/warum-pull-request-reviews-pflicht-sind/).

## Welche Tools setze ich ein?

Ich baue Pipelines auf der Git-Plattform, die das Unternehmen schon nutzt. Bisher waren das GitHub, GitLab, Azure DevOps und Bitbucket. Die Pipelines werden in YAML definiert, daher ist das Grundgerüst auf jeder Plattform gleich, auch wenn jede ihre Eigenheiten hat, zum Beispiel wie der Validierungsstatus eines Pull Requests angezeigt wird.

Für den Salesforce-Teil nutze ich oft sfdx-hardis, ein Open-Source-DevOps-Tool, das ich in eigenen Projekten einsetze. Es hat keine laufenden Lizenzkosten, und Repository, Pipeline und Zugriffsrechte bleiben beim Kunden. Was es kann, erkläre ich in [sfdx-hardis: Einführung in Open-Source-DevOps für Salesforce](../../blog/sfdx-hardis-einfuehrung-salesforce-devops/). Ich unterstütze das Projekt, habe aber keine finanziellen Verbindungen dazu. Hat ein Kunde schon ein kommerzielles Tool, das funktioniert, baue ich darauf auf.

Auch Plattformänderungen gehören zum Release-Management. Jedes Salesforce-Release, etwa [Winter '27](../../blog/salesforce-winter-27-aenderungen-pipeline/), kann API-Versionen, CLI-Verhalten oder Sicherheitseinstellungen ändern, von denen eine Pipeline abhängt.

## Wie passt das zu mehreren Partnern?

Ein gemeinsamer Release-Prozess ist die Grundlage, um mehrere Umsetzungspartner zu steuern. Deployt jeder Partner auf seine eigene Art, hält kein Governance-Rahmen. Deshalb geht DevOps meist mit [Partnersteuerung](../partnersteuerung/) zusammen. Kosten Ihre Releases mehr Zeit als nötig, [schreiben Sie mir](#contact).
