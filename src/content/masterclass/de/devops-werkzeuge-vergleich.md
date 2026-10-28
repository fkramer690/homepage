---
title: "DevOps-Werkzeuge für Salesforce im Vergleich"
description: "Change Sets, Salesforce CLI, Lifecycle Center, sfdx-hardis, Gearset, Copado und Flosum im Vergleich, mit Kriterien und Entscheidungsmatrix für Hersteller."
lang: de
slug: devops-werkzeuge-vergleich
course: devops
translationKey: devops-04
chapter: 4
short: "Werkzeuge im Überblick"
summary: "Vom Change Set bis zur kommerziellen Plattform: welches DevOps-Werkzeug zu Ihrer Git-Plattform, Ihrem Team und Ihren Partnern passt."
takeaways:
  - "Salesforce DevOps lässt sich mit drei Arten von Werkzeugen aufbauen: dem Standard von Salesforce, Open Source wie sfdx-hardis und kommerziellen Plattformen wie Gearset, Copado oder Flosum."
  - "Change Sets funktionieren nur zwischen Orgs derselben Produktion, enthalten keine Daten und bieten keine Versionskontrolle; für mehrere Partner an einer Org reichen sie nicht."
  - "Lifecycle Center, bis Oktober 2026 DevOps Center, ist nativ in Salesforce, unterstützt aber nur GitHub.com-Cloud-Pläne und Bitbucket Cloud und fehlt in der EU Operating Zone."
  - "Die Git-Plattform, die Ihre IT schon betreibt, schließt oft schon die Hälfte der Werkzeuge aus; klären Sie sie vor jeder Produktdemo."
  - "Ein kommerzielles Werkzeug ist mit dem Prinzip des Kundeneigentums vereinbar, solange Vertrag, Admin-Rechte und Repository auf Ihren Namen laufen."
articles: [sfdx-hardis-vs-devops-center, sfdx-hardis-introduction, devops-ai-agents-copado-gearset, client-owned-devops-tools]
faq:
  - q: "Reichen Change Sets für ein Salesforce-Programm mit mehreren Partnern?"
    a: "Nein. Change Sets übertragen Setup-Änderungen zwischen Orgs derselben Produktion, aber ohne Versionskontrolle, ohne Review und ohne Vergleich der Stände. Sobald zwei Teams an denselben Komponenten arbeiten, fehlt die Grundlage, um Konflikte zu sehen und zu lösen."
  - q: "Was ist Lifecycle Center?"
    a: "Lifecycle Center ist der neue Name des Next Generation DevOps Center seit Oktober 2026. Es ist eine native App in Salesforce ohne Paket, mit Work Items, Pipelines, Test-Suites und Quality Gates, und unterstützt als Git-Plattform GitHub.com-Cloud-Pläne und Bitbucket Cloud."
  - q: "Kann ich Lifecycle Center mit Azure DevOps oder GitLab nutzen?"
    a: "Heute nicht. Salesforce nennt nur GitHub.com-Cloud-Pläne einschließlich GitHub Enterprise Cloud und Bitbucket Cloud. GitLab und Azure hat Salesforce als Priorität genannt, aber ohne Termin."
  - q: "Ist ein kommerzielles DevOps-Werkzeug besser als sfdx-hardis?"
    a: "Es löst eine andere Frage. Gearset, Copado und Flosum verkaufen Oberfläche, Zusatzmodule und Herstellersupport. sfdx-hardis hat keine Lizenzkosten, verlangt aber jemanden beim Kunden, der die Pipeline versteht. Welche Rolle Sie besetzen können, entscheidet mehr als die Funktionsliste."
  - q: "Wer sollte den Vertrag für das DevOps-Werkzeug unterschreiben?"
    a: "Der Kunde. Lizenzen, Admin-Rechte und Repository gehören auf Ihren Namen, Partner bekommen benannte Benutzer. Dann bleibt der Release-Prozess bei Ihnen, auch wenn ein Partner geht."
draft: false
---

Für Salesforce DevOps gibt es drei Wege: den Standard von Salesforce mit Change Sets, Salesforce CLI und Lifecycle Center (bis Oktober 2026 DevOps Center), Open Source mit sfdx-hardis und kommerzielle Plattformen wie Gearset, Copado und Flosum. Change Sets reichen für ein Programm mit mehreren Partnern nicht, weil sie keine Versionskontrolle kennen. Lifecycle Center passt zu kleinen Admin-Teams auf GitHub.com oder Bitbucket Cloud. sfdx-hardis passt, wenn Sie die Pipeline selbst besitzen und betreiben wollen. Die kommerziellen Plattformen lohnen sich, wenn Sie Oberfläche, Zusatzmodule und Herstellersupport einkaufen wollen. Entscheiden sollten Git-Plattform, Team, Partner, Eigentum, Kosten und Support, in dieser Reihenfolge.

## Was bringt Salesforce selbst mit?

Salesforce liefert drei Werkzeuge ohne zusätzliche Lizenz. Sie bauen aufeinander auf, lösen aber sehr unterschiedliche Probleme.

### Change Sets

Ein Change Set überträgt Anpassungen von einer Org in eine andere, typischerweise aus einer Sandbox in die Produktion. Laut [Salesforce-Hilfe zu Change Sets](https://help.salesforce.com/apex/HTViewHelpDoc?id=changesets.htm) gelten drei Grenzen: Change Sets enthalten nur Änderungen, die man über das Setup-Menü machen kann, sie enthalten keine Daten, und sie funktionieren nur zwischen Orgs, die zur selben Produktion gehören und über eine Deployment-Verbindung verknüpft sind. Ein eingehendes Change Set wird immer als Ganzes deployt.

Für einen Admin, der alle paar Wochen ein Feld und eine Validierungsregel überträgt, ist das ausreichend. Für ein Programm mit mehreren Teams fehlt das Wesentliche: Es gibt keinen Verlauf in Git, keinen Pull Request, kein Review und keinen Vergleich, welcher Stand wo liegt. Wenn zwei Partner dasselbe Page Layout oder dieselbe Flow-Version anfassen, gewinnt, wer zuletzt deployt. Genau diesen Zustand beschreibt [Kapitel 1](../release-management-grundlagen/) als Ausgangspunkt des Reifegrads.

### Salesforce CLI

Die [Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) ist das Kommandozeilenwerkzeug von Salesforce für Entwicklung und Build-Automatisierung. Sie legt Orgs an, synchronisiert Quellcode in beide Richtungen zwischen Projekt und Org und läuft auf dem Rechner des Entwicklers oder in einer CI-Pipeline. Befehle wie [`sf project deploy validate`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) prüfen ein Deployment, ohne etwas zu ändern, standardmäßig mit `RunLocalTests`.

Die CLI ist das Fundament, den Prozess darüber liefert sie nicht. Wer nur sie nutzt, baut Branch-Regeln, Delta-Deployments, Benachrichtigungen und Tests selbst. Die CLI lässt sich über Plugins erweitern, und genau darauf setzt sfdx-hardis auf.

### Lifecycle Center, früher DevOps Center

Seit Oktober 2026 heißt das Next Generation DevOps Center [Lifecycle Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5). Es ist in die Plattform eingebaut, ein Paket wird nicht installiert. In einer Hub-Org legen Sie Projekte, Pipelines und Work Items an; ein Work Item wandert per Klick von Stufe zu Stufe, im Hintergrund entstehen Branches, Pull Requests und Deployments. Tests mit Test-Suites und Quality Gates sind standardmäßig dabei, eine Governance-Funktion für Entwickler und Coding-Agenten ist in Beta. Salesforce beschreibt Lifecycle Center ausdrücklich als Alternative zu Change Sets.

Die [Hinweise zur Einrichtung](https://help.salesforce.com/s/articleView?id=platform.next_gen_devops_center_setup_considerations.htm&language=en_US&type=5) enthalten die Punkte, die in der Fertigung oft den Ausschlag geben:

- Als Git-Plattform funktionieren nur GitHub.com-Cloud-Pläne, einschließlich GitHub Enterprise Cloud, und Bitbucket Cloud. GitLab und Azure hat Salesforce im [Admin-Blog](https://admin.salesforce.com/blog/2026/the-future-of-salesforce-devops-is-here-whats-new-for-admins) als Priorität genannt, ohne Termin.
- In der EU Operating Zone und in Government Cloud Plus ist Lifecycle Center nicht verfügbar.
- Die Hub-Org darf keine Sandbox sein, und es kann nur Lifecycle Center oder das alte DevOps Center als Managed Package aktiv sein.
- Die Migration von Projekten aus dem Managed Package ist eine Developer Preview. Für produktive Projekte würde ich darauf nicht bauen, bis sie allgemein verfügbar ist.

Wie Lifecycle Center im Detail gegen sfdx-hardis steht, habe ich im [Vergleich sfdx-hardis oder DevOps Center](../../../blog/sfdx-hardis-oder-devops-center-vergleich/) beschrieben. Kurz: Bei Lifecycle Center ist Salesforce die Steuerzentrale und Git der Speicher.

## sfdx-hardis: der Open-Source-Weg

[sfdx-hardis](https://sfdx-hardis.cloudity.com/) ist ein kostenloses Open-Source-Toolkit von Cloudity und einer großen Community. Es besteht aus einem Plugin für die Salesforce CLI, einer VS-Code-Erweiterung und Docker-Images für die Pipeline. Die Pipeline läuft auf der Git-Plattform des Kunden: GitHub, GitLab, Azure DevOps, Bitbucket oder Jenkins. Neben CI/CD bringt es Org-Monitoring, Metadaten-Backup und generierte Dokumentation mit.

Ich setze sfdx-hardis seit rund zwei Jahren in Kundenprojekten ein. Für Programme mit mehreren Implementierungspartnern zählt für mich, dass der ganze Prozess als Konfiguration im Repository des Kunden liegt. Mit Branch-Schutz ändert ihn ein Partner nur per Pull Request, den der Kunde freigibt.

Der Preis dafür ist Know-how. Lizenzgebühren fallen nicht an, wohl aber CI-Minuten, die Einrichtung und eine Person beim Kunden, die die Pipeline versteht. Unterstützung bietet Cloudity als Dienstleister an, nötig ist sie nicht. Was das Toolkit alles abdeckt, steht in meiner [Einführung in sfdx-hardis](../../../blog/sfdx-hardis-einfuehrung-salesforce-devops/).

## Was können Gearset, Copado und Flosum besser?

Die drei großen kommerziellen Plattformen verkaufen das, was Open Source nicht liefert: eine fertige Oberfläche, Zusatzmodule aus einer Hand und einen Hersteller, der für den Betrieb geradesteht. Die DevOps-Kurse aller drei Anbieter habe ich durchgearbeitet. Die folgenden Angaben stammen von den Seiten der Hersteller, Stand Oktober 2026.

**Gearset** läuft als Dienst außerhalb Ihrer Org, laut [Gearset](https://gearset.com/) muss in den Orgs nichts installiert werden. Gearset unterstützt GitHub, GitLab, Bitbucket, Azure DevOps, AWS CodeCommit und generisches Git. Die Stärke ist der visuelle Vergleich von Metadaten zwischen Orgs, dazu Pipelines, Backup, Sandbox Seeding mit maskierten Daten, Observability und Code Reviews als eigene Produkte. Gearset ist der einzige der drei mit öffentlicher [Preisliste](https://gearset.com/pricing/): Das Starter-Paket für Vergleich und Deployment kostet 215 USD pro Gearset-Nutzer und Monat, Pipelines und CI/CD gibt es als Automatisierungspaket ab 550 USD pro Team und Monat. Testen können Sie 30 Tage ohne Kreditkarte.

**Copado** beschreibt sich auf seiner [Website](https://www.copado.com/) als Salesforce-native DevOps-Lösung und bietet seit April 2026 die Editionen Agentia Advanced und Agentia Pro an. Laut [Copado-Dokumentation](https://docs.copado.com/) richtet sich die Edition Agentia Advanced an Teams mit einer Produktions-Org und 3 bis 10 Personen, Agentia Pro an Unternehmen mit mehreren Orgs, mit Quality Gates, Governance und dem Orchestrate Agent. Dazu kommen Robotic Testing und ein Context Hub für die KI-Agenten. Als Git-Plattformen nennt die Dokumentation der Advanced-Edition [GitHub, GitLab, Bitbucket und Azure](https://docs.essentials.copado.com/en/articles/4109764-setup-git-connections), jeweils auch selbst gehostet. Eine öffentliche Preisliste habe ich bei Copado nicht gefunden.

**Flosum** ist laut [Hersteller](https://www.flosum.com/products/devops) ebenfalls Salesforce-native und hat eine eigene, metadatenbewusste Versionskontrolle. Git ist dort ausdrücklich optional; angebunden werden können GitHub, GitLab, Bitbucket und Azure DevOps. Flosum betont Nachweise für Audits, die direkt in der Pipeline entstehen, und nennt Regelwerke wie SOX und GxP. Das ist für Hersteller von Medizintechnik oder Laborgeräten interessant. Neben DevOps gibt es Backup and Archive, einen Data Migrator und ein Trust Center. Die Preise sind laut Flosum angebotsbasiert.

Weitere Anbieter wie AutoRABIT oder Blue Canvas habe ich für dieses Kapitel nicht geprüft. Wie Copado und Gearset gerade KI-Agenten einbauen und was Sie vorher fragen sollten, steht in [Copado, Gearset und Provar mit KI-Agenten](../../../blog/copado-gearset-provar-ki-agenten/).

## Nach welchen Kriterien wählen Sie aus?

Ich gehe die Kriterien in dieser Reihenfolge durch, weil die ersten am meisten ausschließen.

1. **Git-Plattform.** Welche Plattform betreibt Ihre IT schon? Auf Azure DevOps oder einem selbst gehosteten GitLab fällt Lifecycle Center heute weg. Die Git-Plattform wechselt man nicht für ein Release-Werkzeug.
2. **Team.** Wer arbeitet täglich mit dem Werkzeug: Admins, die klicken, oder Entwickler, die mit VS Code und Branches umgehen? Und gibt es beim Kunden jemanden, der eine Pipeline verantworten kann?
3. **Partner.** Wie viele Teams und Implementierungspartner arbeiten an derselben Org? Ab dem zweiten Partner brauchen Sie Pull Requests mit [Pflicht-Review](../../../blog/warum-pull-request-reviews-pflicht-sind/) und einen Prozess, den alle gleich nutzen.
4. **Eigentum.** Läuft der Vertrag auf Sie, haben Ihre Mitarbeitenden Admin-Rechte, liegt das Repository in Ihrer Organisation? Warum das zählt, steht in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).
5. **Kosten.** Lizenz, CI-Minuten, Einrichtung und vor allem die Release-Rolle. Nach meiner Einschätzung kostet diese Rolle in einem Programm mit mehreren Partnern mehr als jedes Werkzeug.
6. **Support.** Brauchen Sie einen Vertrag mit Reaktionszeiten, oder reichen Community und ein Dienstleister bei Bedarf?

## Die Entscheidungsmatrix

Die Fakten in der Tabelle stammen von den oben verlinkten Herstellerseiten. Die Zeile „Passt zu“ ist meine Einschätzung.

| Kriterium | Change Sets | Lifecycle Center | sfdx-hardis | Gearset | Copado | Flosum |
|---|---|---|---|---|---|---|
| Git-Plattformen | keine | GitHub.com inkl. Enterprise Cloud, Bitbucket Cloud | GitHub, GitLab, Azure DevOps, Bitbucket, Jenkins | GitHub, GitLab, Bitbucket, Azure DevOps, AWS CodeCommit, generisches Git | GitHub, GitLab, Bitbucket, Azure, auch selbst gehostet | eigene Versionskontrolle, Git optional |
| Wo der Prozess lebt | Setup der Orgs | Hub-Org | Repository und CI des Kunden | Gearset-Dienst | laut Copado Salesforce-nativ | laut Flosum Salesforce-nativ |
| Bedienung | Klicks im Setup | Klicks in Salesforce | VS Code und CLI | Weboberfläche | Oberfläche des Herstellers | Oberfläche des Herstellers |
| Zusatzmodule | keine | Tests, Quality Gates, Governance (Beta) | Monitoring, Metadaten-Backup, Dokumentation | Backup, Seeding, Observability, Code Reviews | Robotic Testing, KI-Agenten | Backup, Data Migrator, Trust Center |
| Lizenzkosten | keine | keine | keine | öffentlich, ab 215 USD pro Nutzer und Monat | keine öffentliche Preisliste gefunden | auf Anfrage |
| Support | Salesforce | Salesforce | Community, Cloudity als Dienstleister | Hersteller | Hersteller | Hersteller |
| Passt zu | wenigen Admins, kleinen Änderungen | einem Admin-Team ohne Partner auf GitHub oder Bitbucket Cloud | mehreren Partnern, wenn eine Release-Rolle beim Kunden existiert | gemischten Teams, die Vergleich und Module aus einer Hand wollen | großen Programmen mit mehreren Orgs und Governance-Bedarf | regulierten Umgebungen mit Audit-Pflichten |

Zwei Dinge zeigt die Matrix nicht. Erstens die Qualität des Supports, die Sie nur in Referenzgesprächen erfahren. Zweitens, wie gut ein Werkzeug Ihre konkreten Metadaten verarbeitet, etwa Field-Service-Konfiguration oder Experience-Cloud-Seiten für ein Händlerportal. Das prüfen Sie in einem kurzen Test mit Ihrer eigenen Org, bevor Sie unterschreiben.

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer betreibt Sales Cloud für den Händlervertrieb, Service Cloud und Field Service für den Außendienst und eine SAP-Schnittstelle für Ersatzteile. Zwei Implementierungspartner arbeiten an derselben Org, einer davon mit einem Nearshore-Team. Die IT hat Azure DevOps für alle anderen Anwendungen. Bisher wird mit Change Sets deployt.

Die Git-Plattform schließt Lifecycle Center aus. Change Sets scheiden wegen der zwei Partner aus. Es bleiben sfdx-hardis, Gearset, Copado und Flosum. Hat der Hersteller jemanden, der eine Pipeline auf Azure DevOps verantworten kann oder diese Rolle aufbauen will, würde ich mit sfdx-hardis starten und die gesparten Lizenzkosten in genau diese interne Release-Rolle stecken. Fehlt diese Person und soll sie auch nicht entstehen, ist eine kommerzielle Plattform mit Herstellersupport die ehrlichere Wahl. Dann zählt, dass der Vertrag auf den Hersteller läuft und nicht auf einen der Partner.

## Wie machen Sie die Entscheidung verbindlich?

Die Werkzeugwahl gehört an den Anfang eines Programms und gilt für jeden Partner. Wer später dazukommt, arbeitet im bestehenden Setup und bringt kein eigenes mit. Das gehört in den Vertrag, wie in [Kapitel 2 zu Eigentum und Rollen](../release-prozess-eigentum-rollen/) beschrieben.

Drei Regeln halte ich für nicht verhandelbar:

- **Ein Werkzeug pro Repository entscheidet über Merges und Promotions.** Zwei Werkzeuge auf denselben Stage-Branches ergeben zwei Release-Prozesse.
- **Lizenzen und Admin-Rechte liegen beim Kunden.** Das gilt für Gearset, Copado und Flosum genauso wie für die Git-Plattform unter sfdx-hardis.
- **Die Historie bleibt portabel.** Bei Flosum, wo Git optional ist, würde ich die Git-Anbindung trotzdem einschalten, damit die Versionsgeschichte auch ohne das Werkzeug lesbar bleibt.

Die Sandboxes und Branches, auf denen jedes dieser Werkzeuge aufsetzt, beschreibt [Kapitel 3](../umgebungen-und-branching/). Wie daraus eine Pipeline mit Pull Requests, Validierungen und Delta-Deployments wird, folgt in [Kapitel 5](../pipeline-aufbauen/). Bei der Auswahl und dem Aufbau unterstütze ich im Rahmen von [DevOps und Release-Management](../../../leistungen/devops-und-release-management/) und, wenn mehrere Partner beteiligt sind, in der [Partnersteuerung](../../../leistungen/partnersteuerung/).

Das richtige Werkzeug ist das, das zu Ihrer Git-Plattform passt und für das Sie eine verantwortliche Person beim Kunden haben. Wenn Sie Ihre Auswahl gegen diese Kriterien prüfen möchten, [schreiben Sie mir](#contact).
