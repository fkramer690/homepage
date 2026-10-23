---
title: "Warum DevOps über Salesforce-Großprojekte entscheidet"
description: "Change Sets reichen für einen Admin. Mit mehreren Partnern, globalen Rollouts und drei Releases im Jahr entscheidet DevOps, ob ein Programm beherrschbar bleibt."
pubDate: 2026-10-23
lang: de
slug: warum-devops-salesforce-enterprise-projekte
translationKey: devops-salesforce-enterprise
tags: [devops, release management, partnersteuerung, sfdx-hardis]
---

Der Einstieg in Salesforce ist leicht. Ein paar Klicks im Setup, ein Change Set, fertig. Genau diese Leichtigkeit ist der Grund, warum viele Enterprise-Programme ein Jahr später in Schwierigkeiten geraten. Sobald mehrere Teams, Partner und Länder an derselben Org arbeiten, lautet die Frage nicht mehr, wie man etwas baut. Sie lautet, wie man es sicher, wiederholbar und nachvollziehbar in Produktion bringt. Darum geht es bei DevOps, und in Großprojekten entscheidet es darüber, ob ein Programm beherrschbar bleibt.

## Was sich ändert, wenn ein Projekt groß wird

In einer kleinen Org kennt ein Admin jede Änderung. In einem Enterprise-Programm ist dieses Bild verschwunden. Ich habe Programme mit bis zu acht Projektteams und mehr als 30 Entwicklern auf einer Plattform gesteuert. In so einem Umfeld passieren ohne sauberes DevOps-Setup einige Dinge sehr zuverlässig:

- **Änderungen überschreiben sich gegenseitig.** Team A deployt ein Page Layout, Team B deployt einen Tag später dasselbe Objekt mit einem älteren Stand. Es fällt erst auf, wenn sich Anwender beschweren.
- **Niemand weiß, was in Produktion ist.** Wenn die Org selbst die einzige Quelle der Wahrheit ist, gibt es keine Historie, kein Review und keinen einfachen Weg zurück.
- **Releases werden zu Ereignissen.** Deployments finden spät abends statt, mit manuellen Vor- und Nacharbeiten aus einer Excel-Liste, und das ganze Team hält die Luft an.
- **Partner werden schwer austauschbar.** Liegt das Wissen über Deployments in den Köpfen und Tools eines Implementierungspartners, hängt der Kunde von diesem Partner ab.

Nichts davon ist zuerst ein Tool-Problem. Es ist ein Governance-Problem, das sich mit Tools lösen lässt.

## Warum Change Sets nicht skalieren

Change Sets sind für kleine, isolierte Änderungen in Ordnung. Für Enterprise-Arbeit fehlt ihnen fast alles, was man braucht:

- keine Versionshistorie und kein Rollback
- kein Code-Review, bevor eine Änderung die nächste Umgebung erreicht
- keine automatisierten Tests oder Qualitätsprüfungen als Schranke
- manuelles Zusammenklicken, bei dem leicht etwas fehlt
- keine Möglichkeit, dasselbe Deployment wiederholbar über mehrere Umgebungen zu fahren

Dazu kommen drei große Salesforce-Releases pro Jahr, Sandboxes auf unterschiedlichen Release-Ständen während der Preview-Phasen und globale Rollouts mit länderspezifischen Anforderungen. Mit manuellen Deployments ist das nicht mehr zu schaffen.

## Wie gutes Salesforce-DevOps aussieht

Ein solides Setup muss nicht kompliziert sein. In meinen Projekten sind diese Bausteine am wichtigsten:

1. **Git als Quelle der Wahrheit.** Alle Metadaten liegen in einem Repository. Jede Änderung ist ein Commit mit Autor, Begründung und Verweis auf die User Story.
2. **Eine klare Branch- und Umgebungsstrategie.** Zum Beispiel Entwickler-Sandboxes, Integration, UAT, Produktion und ein schneller Weg für Hotfixes. Jedes Team weiß, wohin seine Arbeit als Nächstes geht.
3. **Pull Requests mit Review.** Änderungen werden geprüft, bevor sie weiterwandern, mit einer klaren Verantwortung für Architekturentscheidungen.
4. **Automatisierte Qualitätsschranken.** Validierungs-Deployments, Apex-Tests und statische Code-Analyse laufen bei jedem Pull Request. Eine grüne Pipeline ist Voraussetzung für den Merge, keine Kür.
5. **Delta-Deployments.** Es wird nur deployt, was sich geändert hat. Das hält Deployments schnell und verringert Nebenwirkungen.
6. **Monitoring und Backup.** Regelmäßige Metadaten-Backups und Prüfungen zeigen Änderungen direkt in Produktion, veraltete API-Versionen oder ungenutzte Komponenten.

> Die Pipeline gehört dem Kunden, nicht dem Partner. Wer den Release-Prozess besitzt, besitzt die Plattform.

Dieser letzte Punkt ist mir als Architekt auf Kundenseite besonders wichtig. Ein Repository und eine Pipeline unter Kontrolle des Kunden machen Partner vergleichbar und austauschbar. Außerdem wird das Onboarding eines neuen Partners deutlich leichter, weil die Standards aufgeschrieben sind und automatisch durchgesetzt werden.

## sfdx-hardis als Beispiel

Um dorthin zu kommen, muss man keine kommerzielle Plattform kaufen. Ein gutes Beispiel ist [sfdx-hardis](https://sfdx-hardis.cloudity.com/), ein Open-Source-Toolkit, das Cloudity gemeinsam mit einer aktiven Community pflegt. Es bündelt viele der Bausteine von oben:

- **Eine fertige CI/CD-Pipeline** für GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins, damit die Pipeline dort läuft, wo die IT des Kunden ohnehin arbeitet.
- **Delta- und Smart-Deployments** auf Basis von sfdx-git-delta, die nur geänderte Metadaten deployen.
- **Org-Monitoring und Metadaten-Backup** mit Benachrichtigungen an Slack, Microsoft Teams oder andere Kanäle.
- **Generierte Dokumentation** des Projekts, einschließlich Flows, direkt aus dem Repository.
- **Eine VS-Code-Erweiterung**, die Admins und Beratern einen visuellen Zugang zum Git-Workflow gibt. So ist DevOps nicht nur etwas für Entwickler.

Kommerzielle Tools wie Gearset oder Copado haben ebenfalls ihre Berechtigung, vor allem wenn ein Team eine komplett verwaltete Oberfläche möchte. Die Wahl hängt vom Team, der vorhandenen Toolchain und dem Budget ab. Entscheidend ist, dass früh entschieden und für alle verbindlich durchgesetzt wird, auch für jeden Partner.

## Wo man anfängt

Wenn Ihr Salesforce-Programm noch mit Change Sets oder manuellen Deployments arbeitet, brauchen Sie keine Big-Bang-Umstellung. Eine pragmatische Reihenfolge:

1. Die aktuellen Produktions-Metadaten in ein Git-Repository bringen.
2. Validierungs-Deployments und Tests für jeden Pull Request einführen.
3. Branch- und Umgebungsstrategie festlegen und für alle Partner verbindlich machen.
4. Produktions-Deployments auf die Pipeline umstellen.
5. Monitoring, Backups und generierte Dokumentation ergänzen.

DevOps ist keine zusätzliche Schicht für später. In Enterprise-Projekten ist es Teil der Architektur, und es sollte stehen, bevor der zweite Partner an der Org arbeitet.
