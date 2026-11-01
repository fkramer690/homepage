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
  - "Ich lege mit Ihnen Branching-Modell, Umgebungen und die Prüfungen pro Stufe fest, passend zur Zahl der Teams und zum Release-Rhythmus."
  - "Ich baue die Pipeline auf der Git-Plattform, die Sie schon nutzen, meist mit dem Open-Source-Tool sfdx-hardis."
  - "Ich mache aus den manuellen Schritten vor und nach dem Deployment automatisierte Schritte und Daten-Deployments."
  - "Am Anfang reviewe ich selbst mit, bis interne Kollegen die Reviews übernehmen."
  - "Ich schule Ihre Kollegen, bis sie die Pipeline selbst betreiben und erweitern."
results:
  - "Eine CI/CD-Pipeline in Ihrem Repository, die jeden Pull Request gegen die Ziel-Org validiert, Apex-Tests und statische Codeanalyse ausführt"
  - "Review-Regeln und Codequalitäts-Standards, die für interne Teams und Partner gelten"
  - "Eine Historie, in der jede Änderung in Produktion einem Pull Request und einem Reviewer zugeordnet ist"
  - "Die Dokumentation des Prozesses im Repository, direkt neben dem Code"
phases:
  - title: "Bestandsaufnahme"
    icon: "analyse"
    text: "Ich schaue mir den aktuellen Release-Prozess an, die Umgebungen, das Repository und die Schmerzpunkte der Teams: wo Deployments scheitern, was von Hand passiert, wer was freigibt."
  - title: "Zielprozess"
    icon: "target"
    text: "Wir einigen uns auf Branching-Modell, Umgebungen, Prüfungen pro Stufe und Review-Regeln. Das Design hängt von der Teamgröße ab und davon, wie oft das Business releasen möchte."
  - title: "Aufbau der Pipeline"
    icon: "pipeline"
    text: "Ich baue die Pipeline auf der Git-Plattform des Kunden, meist mit sfdx-hardis, und bringe das erste Team darauf. Weitere Teams folgen, sobald der Prozess stabil läuft."
  - title: "Übergabe"
    icon: "handshake"
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

Salesforce macht es leicht, direkt in einer Org etwas zu ändern. Am Anfang ist das praktisch, sobald mehrere Teams parallel arbeiten, wird es zum Problem. Die typischen Symptome beschreibe ich in [warum DevOps in Salesforce-Enterprise-Projekten zählt](../../blog/warum-devops-salesforce-enterprise-projekte/).

```vergleich
ohne: Änderungen direkt in der Org
- Wer etwas ändert, ändert es direkt in einer Sandbox oder in Produktion.
- Welche Version gilt, weiß nur, wer zuletzt daran gearbeitet hat.
- Vor und nach dem Deployment arbeitet jemand eine Checkliste ab.
- Ein Release braucht die zwei, drei Leute, die den Ablauf kennen.
mit: Git, Pull Request und Pipeline
- Jede Änderung beginnt als Branch und endet als Pull Request.
- Die gültige Version steht in Git, nicht in einer Org.
- Die Checkliste ist Code und läuft mit jedem Deployment.
- Ein Release startet mit einem Merge, nicht mit einem Termin am Wochenende.
```

## Was eine gute Salesforce-Pipeline abdeckt

Für Enterprise-Teams baue ich die Pipeline auf diese Grundlagen:

```saeulen
dach: Eine gute Salesforce-Pipeline
check | Prüfungen | Bei jedem Pull Request | Ein Validierungs-Deployment gegen die Ziel-Org, Apex-Tests und statische Codeanalyse laufen, bevor jemand die Änderung reviewt.
pipeline | Umgebungen | Ein klarer Weg bis Produktion | Änderungen wandern über Promotion Branches von der Entwicklung in Integration, UAT und Produktion, und es ist immer sichtbar, welche Änderung in welcher Org liegt.
gear | Automatisierung | Nach dem Deployment | Was früher von Hand lief, ist Teil des Deployments, und Referenzdaten lassen sich mit SFDMU deployen, einem Open-Source-Plugin für Datenmigration.
analyse | Review | Für jede Änderung | Die Automatisierung findet die wiederholbaren Fehler, Menschen prüfen Design und Lesbarkeit.
basis: Auf der Git-Plattform des Kunden
```

Mehr zu Reviews steht in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../../blog/warum-pull-request-reviews-pflicht-sind/).

```praxis
In einem Programm habe ich den Release-Prozess selbst aufgebaut. Am Anfang ging jeder Pull Request über meinen Tisch, später habe ich diese Aufgabe an einen internen Kollegen übergeben.
```

## Die Pipeline läuft auf Ihrer Git-Plattform, meist mit sfdx-hardis

```kennzahlen
4 | Git-Plattformen: GitHub, GitLab, Azure DevOps und Bitbucket
1 | Grundgerüst in YAML, gleich auf jeder Plattform
0 € | laufende Lizenzkosten für sfdx-hardis
quelle: meine Pipelines in Kundenprojekten
```

Ich baue Pipelines auf der Git-Plattform, die das Unternehmen schon nutzt. Bisher waren das GitHub, GitLab, Azure DevOps und Bitbucket. Die Pipelines werden in YAML definiert, daher ist das Grundgerüst auf jeder Plattform gleich, auch wenn jede ihre Eigenheiten hat, zum Beispiel wie der Validierungsstatus eines Pull Requests angezeigt wird.

Für den Salesforce-Teil nutze ich oft sfdx-hardis, ein Open-Source-DevOps-Tool, das ich in eigenen Projekten einsetze. Es hat keine laufenden Lizenzkosten, und Repository, Pipeline und Zugriffsrechte bleiben beim Kunden. Was es kann, erkläre ich in [sfdx-hardis: Einführung in Open-Source-DevOps für Salesforce](../../blog/sfdx-hardis-einfuehrung-salesforce-devops/). Ich unterstütze das Projekt, habe aber keine finanziellen Verbindungen dazu. Hat ein Kunde schon ein kommerzielles Tool, das funktioniert, baue ich darauf auf.

```hinweis tipp
Auch Plattformänderungen gehören zum Release-Management. Jedes Salesforce-Release, etwa [Winter '27](../../blog/salesforce-winter-27-aenderungen-pipeline/), kann API-Versionen, CLI-Verhalten oder Sicherheitseinstellungen ändern, von denen eine Pipeline abhängt.
```

## Ein Release-Prozess für alle Partner

Ein gemeinsamer Release-Prozess ist die Grundlage, um mehrere Umsetzungspartner zu steuern. Jeder Partner liefert über Pull Requests in dasselbe Repository, jede Lieferung läuft durch dieselben Prüfungen, und die Freigabe liegt beim Kunden. Deployt dagegen jeder Partner auf seine eigene Art, hält kein Governance-Rahmen. Die Regeln für Standards, Verantwortung und Reviews über mehrere Partner beschreibe ich unter [Partnersteuerung](../partnersteuerung/).
