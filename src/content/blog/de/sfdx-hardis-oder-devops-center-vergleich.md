---
title: "sfdx-hardis oder DevOps Center: der Vergleich 2026"
description: "sfdx-hardis und das DevOps Center, heute Lifecycle Center, im Vergleich: Git-Plattformen, Bedienung, Kosten, Monitoring und wann welches Tool passt."
pubDate: 2026-10-28
lang: de
slug: sfdx-hardis-oder-devops-center-vergleich
translationKey: sfdx-hardis-vs-devops-center
topic: devops
categories: [devops]
tags: [sfdx-hardis, DevOps Center, Lifecycle Center, Release-Management, CI/CD, Git]
takeaways:
  - "sfdx-hardis und das DevOps Center von Salesforce, seit Oktober 2026 Lifecycle Center genannt, kosten beide keine Lizenzgebühren, folgen aber einem anderen Ansatz."
  - "Lifecycle Center ist eine native App in einer Salesforce-Org mit Klickoberfläche und unterstützt nur GitHub.com-Cloud-Pläne und Bitbucket Cloud."
  - "sfdx-hardis läuft als Pipeline in der CI des Kunden auf GitHub, GitLab, Azure DevOps, Bitbucket oder Jenkins und bringt Monitoring, Backup und Dokumentation mit."
  - "Lifecycle Center passt zu kleineren, klickorientierten Teams auf GitHub oder Bitbucket Cloud, sfdx-hardis zu Programmen mit mehreren Partnern oder anderer Git-Plattform."
  - "Pro Repository sollte genau ein Werkzeug über Merges und Promotions entscheiden, sonst entstehen zwei Release-Prozesse."
faq:
  - q: "Was ist der Unterschied zwischen sfdx-hardis und dem DevOps Center?"
    a: "Das DevOps Center, heute Lifecycle Center, ist eine native Salesforce-App mit Klickoberfläche, in der Work Items durch eine Pipeline wandern. sfdx-hardis ist ein Open-Source-Toolkit aus CLI-Plugin und VS-Code-Erweiterung, das als Pipeline auf der Git-Plattform des Kunden läuft und zusätzlich Monitoring, Backup und Dokumentation liefert."
  - q: "Unterstützt das DevOps Center GitLab oder Azure DevOps?"
    a: "Nein. Lifecycle Center unterstützt GitHub.com-Cloud-Pläne einschließlich GitHub Enterprise Cloud sowie Bitbucket Cloud. GitLab und Azure DevOps hat Salesforce als Priorität genannt, aber ohne Termin."
  - q: "Ist sfdx-hardis kostenlos?"
    a: "Ja, sfdx-hardis ist Open Source und hat keine Lizenzgebühren. Kosten entstehen für die Git-Plattform, CI-Minuten, Einrichtung und eine Person, die das Setup verantwortet. Bezahlte Unterstützung gibt es bei Cloudity."
  - q: "Kann man sfdx-hardis und Lifecycle Center zusammen nutzen?"
    a: "Technisch kann man beide auf dieselbe Org zeigen lassen. Ich würde aber pro Repository nur ein Werkzeug über Merges und Promotions entscheiden lassen, sonst arbeiten zwei Release-Prozesse gegeneinander."
  - q: "Welches Tool ist besser für Admins?"
    a: "Lifecycle Center ist für Admins der leichtere Einstieg, weil alles in Salesforce passiert. Die VS-Code-Erweiterung von sfdx-hardis nimmt Admins die meisten Git-Befehle ab, setzt aber VS Code und etwas Grundwissen zu Branches voraus."
---

sfdx-hardis und das DevOps Center von Salesforce, das seit Oktober 2026 Lifecycle Center heißt, sind beide ohne Lizenzgebühren nutzbar und führen beide Änderungen über Git in die Produktion. Der Unterschied liegt darin, wo der Prozess lebt. Lifecycle Center ist eine native App in einer Salesforce-Org, mit Klickoberfläche, und arbeitet nur mit GitHub.com und Bitbucket Cloud. sfdx-hardis läuft als Pipeline in der CI des Kunden, auf GitHub, GitLab, Azure DevOps, Bitbucket oder Jenkins, und bringt Monitoring, Backup und Dokumentation mit. Meine Faustregel: Lifecycle Center für kleine, klickorientierte Teams, sfdx-hardis für Programme mit mehreren Partnern.

## Was ist der Unterschied zwischen sfdx-hardis und dem DevOps Center?

**Lifecycle Center** ist das, was bis vor Kurzem Next Generation DevOps Center hieß. Salesforce hat die App 2026 in die Plattform geholt: Sie öffnen sie aus dem App Launcher, ein Paket wird nicht installiert. Die Org, in der sie läuft, nennt Salesforce Hub-Org. Dort legen Sie Projekte, Pipelines und Work Items an. Ein Work Item ist eine fachliche Änderung, die Sie per Klick von Stufe zu Stufe befördern, im Hintergrund erzeugt die App Branches, Pull Requests und Deployments. Das alte DevOps Center als Managed Package läuft bei Bestandskunden weiter, Salesforce empfiehlt aber den Wechsel, und es kann immer nur eine der beiden Varianten aktiv sein. Die Einzelheiten zum Umstieg stehen in der [Salesforce-Hilfe zu Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5).

**sfdx-hardis** ist ein Open-Source-Toolkit von Cloudity und einer großen Community. Es besteht aus einem Plugin für die Salesforce CLI, einer VS-Code-Erweiterung und Docker-Images für die Pipeline. Der Prozess steckt in Konfigurationsdateien im Repository und in der CI-Pipeline des Kunden. Was es alles abdeckt, habe ich in meiner [Einführung in sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/) beschrieben.

Kurz gesagt: Bei Lifecycle Center ist Salesforce die Steuerzentrale und Git der Speicher. Bei sfdx-hardis ist die Git-Plattform die Steuerzentrale, und Salesforce ist das Ziel.

## Die Gegenüberstellung auf einen Blick

| Kriterium | Lifecycle Center (DevOps Center) | sfdx-hardis |
|---|---|---|
| Herkunft | Salesforce, native App | Open Source, Cloudity und Community |
| Bedienung | Klickoberfläche in Salesforce, dazu DX Inspector in der Dev-Org | VS-Code-Erweiterung und CLI |
| Wo die Pipeline läuft | Hub-Org, ein Salesforce-Dienst ruft die Git-Plattform auf | In der CI des Kunden |
| Git-Plattformen | GitHub.com inkl. Enterprise Cloud, Bitbucket Cloud | GitHub, GitLab, Azure DevOps, Bitbucket, Jenkins |
| Tests und Quality Gates | Test-Suites und Quality Gates vor Review und Promotion | Validierung, Apex-Tests und statische Analyse bei jedem Pull Request |
| Daten mitdeployen | Über DX Inspector | Über Deployment Actions, zum Beispiel mit SFDMU |
| Monitoring und Backup | Nicht enthalten | Geplante Org-Prüfungen, Metadaten-Backup, Grafana-Dashboards |
| Dokumentation | Nicht enthalten | Generiert aus dem Repository, inklusive Flows |
| Ticketsysteme | Jira-Import als einmalige Kopie | Jira, Azure Boards, ServiceNow und weitere |
| KI | MCP-Tools im Salesforce DX MCP Server, Governance (Beta) | Coding-Agenten für Fehlerbehebung, Deployment Agent (Beta) |
| Support | Salesforce-Support | Community, bezahlt über Cloudity |

Die Quellen für Lifecycle Center sind die Salesforce-Hilfe und die Release Notes zu Winter '27, für sfdx-hardis die [Projektdokumentation](https://sfdx-hardis.cloudity.com/) und die [Übersicht zu Version 8](https://sfdx-hardis.cloudity.com/sfdx-hardis-v8/), Stand Oktober 2026.

## Welche Git-Plattformen werden unterstützt?

In vielen Unternehmen entscheidet sich die Frage schon hier. Laut den [Hinweisen zur Einrichtung von Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.next_gen_devops_center_setup_considerations.htm&language=en_US&type=5) funktionieren nur GitHub.com-Cloud-Pläne, einschließlich GitHub Enterprise Cloud, und Bitbucket Cloud. GitHub Enterprise Server, Bitbucket Data Center, GitLab und Azure DevOps fallen heraus. Salesforce hat GitLab und Azure als Priorität nach dem Start genannt, einen Termin gibt es nicht. Schon beim Start des DevOps Center 2022 wurden weitere Anbieter in Aussicht gestellt, gekommen ist bisher nur Bitbucket Cloud.

sfdx-hardis bringt fertige Pipelines für GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins mit. Weil die Pipeline in der CI des Kunden läuft, kommt die Verbindung von innen: Der Runner holt sich das Repository und deployt in die Org. Ob Ihre selbst gehostete Variante damit vollständig abgedeckt ist, etwa bei Kommentaren in Pull Requests, prüfen Sie am besten in einem kurzen Test. Bei Lifecycle Center ist die Antwort für selbst gehostete Plattformen dagegen eindeutig nein.

Wer auf Azure DevOps arbeitet, wie viele Industrieunternehmen mit Microsoft-Landschaft, kann Lifecycle Center heute also nicht nutzen, ohne die Git-Plattform zu wechseln. Und die Git-Plattform wechselt man nicht für ein Release-Werkzeug.

## Wo liegt der Release-Prozess, und wem gehört er?

Bei Lifecycle Center liegen Projekte, Pipelines und Work Items als Daten in der Hub-Org. Das Repository bleibt beim Kunden, der Prozess drumherum lebt in Salesforce.

```vertiefung Für die IT
titel: Was die IT vor der Anbindung von Lifecycle Center wissen sollte
- Die GitHub-Anbindung läuft über eine OAuth-App von Salesforce, die Zugriff auf alle Repositories des Accounts anfragt.
- Repositories einer GitHub-Organisation erscheinen erst, wenn ein Owner der Organisation die App freigibt.
- Hat die Git-Plattform IP-Beschränkungen, müssen die Adressen von Lifecycle Center in die Allowlist.
```

Bei sfdx-hardis liegt alles in Dateien im Repository und in der Pipeline-Konfiguration. Mit Branch-Schutz ändert ein Partner sie nur per Pull Request, den der Kunde freigibt. Das passt zu meiner Grundregel, dass [Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/): Wer Repository und Pipeline kontrolliert, kontrolliert den Release-Prozess.

Für den Betrieb heißt das: Lifecycle Center braucht einen Admin in der Hub-Org, sfdx-hardis braucht jemanden, der die Pipeline versteht. Beides ist eine Rolle, die jemand beim Kunden übernehmen sollte.

## Was kostet beides wirklich?

Lizenzgebühren fallen bei keinem der beiden an. Die echten Kosten liegen woanders:

- **Lifecycle Center:** Sie brauchen GitHub oder Bitbucket Cloud, mit den Kosten pro Nutzer, die dort anfallen. Die KI-Funktionen über MCP-Tools können laut Salesforce zusammen mit Diensten genutzt werden, die kostenpflichtige Credits verbrauchen. Die Einrichtung ist schnell, weil nichts installiert wird.
- **sfdx-hardis:** CI-Minuten auf der Git-Plattform, die Einrichtung der Pipeline und eine Person, die das Setup pflegt. Bezahlte Unterstützung bietet Cloudity an, nötig ist sie nicht.

In Programmen, die ich begleite, sind die Personalkosten für eine verantwortliche Release-Rolle immer größer als die Werkzeugkosten. Das Werkzeug sollte also danach gewählt werden, welche Rolle Sie wirklich besetzen können: einen Admin, der klickt, oder jemanden, der mit Pipelines umgeht.

## Was ich in Projekten sehe

Ich setze sfdx-hardis seit rund zwei Jahren in Kundenprojekten ein und habe im Oktober 2026 alle drei Level des [kostenlosen sfdx-hardis-Trainings](../sfdx-hardis-kostenloses-devops-training/) abgeschlossen. In Programmen mit mehreren Implementierungspartnern zählt für mich vor allem die Verbindlichkeit: Jeder Partner arbeitet über dieselbe Pipeline, jeder Pull Request wird gleich validiert, und [Reviews sind Pflicht](../warum-pull-request-reviews-pflicht-sind/), bevor etwas gemergt wird. Monitoring und generierte Dokumentation kommen ohne eigenes Projekt dazu.

Mit Lifecycle Center habe ich keine Projekterfahrung, die ich hier anführen könnte. Den folgenden Fall beschreibe ich deshalb als Annahme: Ein mittelständischer Maschinenbauer betreibt eine Salesforce-Org mit zwei Admins, ohne eigene Entwickler, und hat bereits GitHub für ein anderes Team. Für diesen Kunden wäre Lifecycle Center ein guter Schritt weg von Change Sets. Die Admins bleiben in Salesforce, Versionskontrolle kommt trotzdem dazu, und Quality Gates sowie Testläufe sind eingebaut. sfdx-hardis wäre dort zu viel Werkzeug für zu wenig Team.

## Wann passt welches Tool?

Lifecycle Center passt, wenn

- vor allem Admins und Berater klicken und wenig Code entsteht,
- GitHub.com oder Bitbucket Cloud bereits gesetzt ist,
- ein Team an einer Org arbeitet, ohne mehrere Partner,
- die Org nicht in der EU Operating Zone oder Government Cloud Plus liegt, denn dort ist Lifecycle Center nicht verfügbar.

sfdx-hardis passt, wenn

- mehrere Teams oder Partner an derselben Org arbeiten,
- die Git-Plattform GitLab, Azure DevOps oder eine selbst gehostete Variante ist,
- Monitoring, Metadaten-Backup und Dokumentation gebraucht werden,
- jemand beim Kunden die Pipeline verantworten kann oder diese Rolle aufgebaut wird.

Brauchen Sie dagegen einen vollständig verwalteten Dienst mit Org-Vergleichen und vertraglichem Support, sind kommerzielle Plattformen wie Gearset oder Copado die ehrlichere Antwort. Wie diese Anbieter gerade KI-Agenten in ihre Produkte bauen, habe ich in [Copado, Gearset und Provar mit KI-Agenten](../copado-gearset-provar-ki-agenten/) zusammengefasst.

## Kann man beides kombinieren?

Technisch können beide auf dieselbe Org und sogar dasselbe Repository zeigen. Lifecycle Center kennt Merges, die außerhalb der App passieren, und sfdx-hardis validiert jeden Pull Request, egal woher er kommt. Ich würde es trotzdem nicht tun. Wenn zwei Werkzeuge über dieselben Stage-Branches entscheiden, gibt es zwei Release-Prozesse, und am Ende weiß niemand, welcher Stand in der Produktion gilt.

```hinweis tipp
Entscheiden Sie pro Repository, welches Werkzeug Merges und Promotions verantwortet. Wechseln Sie später, dann als geplanter Schnitt, nicht als schleichender Übergang.
```

Für Teams, die Coding-Agenten einsetzen, wird diese Frage wichtiger. Lifecycle Center baut eine Governance-Schicht für Agenten in der Hub-Org, sfdx-hardis setzt auf die Prüfungen in der Pipeline. Welche [Quality Gates KI-generierten Code aufhalten sollten](../quality-gates-ki-code-salesforce-pipeline/), gilt für beide Werkzeuge gleich.

## Wo starten Sie?

Klären Sie zuerst drei Fragen: Welche Git-Plattform ist bei Ihnen gesetzt, wie viele Teams und Partner arbeiten an der Org, und wer übernimmt die Release-Rolle? Mit diesen drei Antworten ist die Wahl in den meisten Fällen getroffen. Wenn Sie neu im Thema sind, erklärt [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) die Grundlagen, und die Einrichtung eines verbindlichen Prozesses gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

Beide Werkzeuge sind gut, sie passen nur zu unterschiedlichen Teams. Wenn Sie besprechen möchten, welches zu Ihrem Programm passt, [schreiben Sie mir](#contact).
