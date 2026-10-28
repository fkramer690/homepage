---
title: "Release-Prozess: Eigentum, Rollen und Freigaben"
description: "Wem Repository, Pipeline und DevOps-Werkzeug gehören, welche Rollen ein Salesforce-Release braucht, wer was freigibt und was in jeden Partnervertrag gehört."
lang: de
slug: release-prozess-eigentum-rollen
course: devops
translationKey: devops-02
chapter: 2
pubDate: 2026-10-28
short: "Eigentum und Rollen"
summary: "Wem Repository und Pipeline gehören, welche vier Rollen ein Release braucht, wer was freigibt und wie der Prozess einen Partnerwechsel übersteht."
takeaways:
  - "Repository, Pipeline, DevOps-Werkzeug, Sandboxes und Zugangsdaten laufen auf den Auftraggeber; Partner arbeiten darin mit persönlichen Benutzern, deren Zugriff mit dem Auftrag endet."
  - "Ein Release-Prozess mit mehreren Partnern braucht vier benannte Rollen: Release Manager und Architekt auf Kundenseite, je einen technischen Lead pro Partner und Product Owner im Fachbereich."
  - "Freigaben gehören in eine Matrix und in die Git-Plattform: Branch-Schutz, Pflicht-Reviews und Code Owners setzen durch, was sonst nur im Konzept steht."
  - "Werkzeugwahl, Pull Requests, Standards, Release-Kalender und Ausstiegspflichten stehen in einer Anlage zum Rahmenvertrag, die für jeden Partner gleich ist."
  - "Ein Partnerwechsel kostet wenig, wenn der Prozess dem Kunden gehört: Zugriffe entziehen, Zertifikate erneuern, Org und Repository abgleichen."
articles: [client-owned-devops-tools, pull-request-reviews-enterprise, partners-ai-coding-sow-rules, ai-org-assessment-technical-debt]
faq:
  - q: "Wer sollte Release Manager in einem Salesforce-Programm sein?"
    a: "Eine Person auf Kundenseite, idealerweise intern. Ein externer Berater kann die Rolle aufbauen und einige Monate führen, sollte sie aber an einen internen Kollegen übergeben. Ein Partner, der selbst liefert, sollte nicht über die Releases aller Partner entscheiden."
  - q: "Darf ein Partner direkt in der Produktions-Org deployen?"
    a: "Nein. In Produktion deployt nur die Pipeline mit einem eigenen technischen Benutzer. Partnerbenutzer in Produktion brauchen weder Modify All Data noch Deploy Change Sets oder Author Apex, denn jede dieser Berechtigungen öffnet das Deployment über die Metadata API."
  - q: "Brauche ich für Pflicht-Reviews eine bestimmte Git-Lizenz?"
    a: "Bei GitHub gibt es geschützte Branches und Code Owners für private Repositories erst ab GitHub Pro, Team oder Enterprise. Bei GitLab gibt es Code Owners nur in Premium oder Ultimate. Prüfen Sie das, bevor Sie die Git-Plattform festlegen."
  - q: "Was passiert mit der Historie, wenn ein Partner das Programm verlässt?"
    a: "Liegt sie in Ihrem Repository und Ihrem Werkzeug, bleibt sie vollständig da. Sie entziehen nur die Benutzer und erneuern Zertifikate und Integrationspasswörter. Liegt sie beim Partner, müssen Sie exportieren und migrieren, oft mit Verlusten."
draft: false
---

Im Salesforce-Release-Prozess gehören Repository, Pipeline, DevOps-Werkzeug, Sandboxes und Zugangsdaten Ihnen als Auftraggeber. Partner arbeiten darin mit persönlichen Benutzern. Vier Rollen tragen den Prozess: ein Release Manager und ein Architekt auf Kundenseite, ein technischer Lead pro Partner und Product Owner im Fachbereich. Wer was freigibt, steht in einer Matrix und wird in der Git-Plattform technisch durchgesetzt, nicht nur in einem Konzept. Die Regeln für alle Partner stehen gleichlautend im Vertrag. Dann ist ein Partnerwechsel ein geplanter Vorgang: Benutzer entziehen, Zertifikate erneuern, weiterarbeiten.

## Was sollte Ihnen als Auftraggeber gehören?

[Kapitel 1](../release-management-grundlagen/) hat die Grundannahme gesetzt: Der Release-Prozess gehört Ihnen. Konkret heißt das, dass Verträge, Lizenzen und Admin-Rechte der folgenden Bausteine auf Ihren Namen laufen. Besitzen heißt dabei nicht, eigene Server zu betreiben. Eine GitHub-Organisation in der Cloud reicht, solange sie Ihnen gehört.

| Baustein | Gehört | Partner erhalten |
|---|---|---|
| Git-Repository und Organisation auf der Git-Plattform | Ihnen, mit mindestens zwei internen Admins | Schreibrechte auf Feature-Branches, keine Admin-Rechte |
| Pipeline-Konfiguration und CI-Variablen | Ihnen | Lesezugriff, Änderungen nur per Pull Request |
| DevOps-Werkzeug (sfdx-hardis-Konfiguration, Gearset-Team, Copado- oder Flosum-Org) | Ihnen | persönliche Lizenz oder Benutzer, zugewiesen von Ihnen |
| Produktion, Sandboxes, Dev Hub | Ihnen | Benutzer pro Person, Rechte passend zur Stufe |
| Zertifikate, technische Benutzer, Integrationszugänge zu SAP | Ihnen, im eigenen Tresor | keinen direkten Zugriff |
| Backlog, Wiki, Standards | Ihnen | Bearbeitungsrechte im Projekt |

Wie das bei den Werkzeugen aussieht, hängt vom Produkt ab. Bei sfdx-hardis liegt die Konfiguration als Dateien im Repository, wer das Repository besitzt, besitzt also den Prozess. Bei Gearset verwalten laut [Gearset-Dokumentation](https://docs.gearset.com/en/articles/2477938-team-ownership-and-management) nur Team Owner die Zuweisung der Lizenzen, und wer aus dem Team entfernt wird, verliert sofort den Zugriff auf die gemeinsame Historie, während die Historie beim Team bleibt. Das ist genau das Verhalten, das Sie wollen, aber nur, wenn das Team Ihnen gehört. Flosum läuft laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/development-lifecycle-management-with-flosum/understand-platform-structure-and-flow) auf der Salesforce-Plattform selbst und muss Daten nicht an einen anderen Ort bewegen. Achten Sie dort darauf, dass die Org, in der Flosum läuft, Ihnen gehört. Welches Werkzeug zu Ihnen passt, vergleicht [Kapitel 4](../devops-werkzeuge-vergleich/). Für dieses Kapitel zählt nur: Wer den Vertrag des Werkzeugs hält, entscheidet, wer Zugriff hat.

Warum das auch für Jira, Confluence und Miro gilt und wie Sie einen Umzug planen, wenn ein Partner heute Teile davon besitzt, beschreibe ich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

## Welche Rollen braucht ein Release-Prozess?

In Programmen mit mehreren Partnern entsteht leicht dieselbe Lücke: Jeder Partner verantwortet seinen Stream, niemand das Ganze. Vier Rollen schließen sie. Eine Person kann in kleinen Programmen zwei Rollen tragen, die Verantwortung muss trotzdem benannt sein.

- **Release Manager (Kundenseite).** Verantwortet Pipeline, Release-Kalender und jede Promotion von Integration über UAT bis Produktion. Die [Release-Manager-Anleitung von sfdx-hardis](https://sfdx-hardis.cloudity.com/salesforce-devops-release-home/) beschreibt die Aufgaben gut: Validierungsjobs prüfen, Konflikte lösen, in die Stufen-Branches mergen, Hotfixes ausliefern und danach zurück in die Entwicklungs-Branches bringen, Release Notes und DORA-Kennzahlen erzeugen. Laut derselben Seite übernehmen das ein oder zwei Teammitglieder, in kleinen Projekten ein Tech Lead oder erfahrener Admin in Teilzeit.
- **Architekt (Kundenseite).** Schreibt die Entwicklungs- und Architekturstandards, gibt architekturrelevante Änderungen frei (neue Objekte, Schnittstellen, Sharing, Rechtekonzept) und entscheidet, wenn zwei Streams dasselbe Objekt brauchen. Welcher Stream welches Objekt verantwortet, steht in einer [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/).
- **Technischer Lead pro Partner.** Sorgt dafür, dass die Pull Requests seines Teams vollständig, klein und geprüft ankommen, macht das erste Review im eigenen Stream und liefert die Angaben für die Release Notes. Er hat keine Freigaberechte für Stufen, die andere Partner betreffen.
- **Product Owner im Fachbereich.** Etwa die Serviceleitung für Field Service oder die Vertriebsleitung für das Händlerportal. Nimmt Stories in UAT ab und entscheidet fachlich, ob eine Funktion mit dem nächsten Release für Anwender freigeschaltet wird.

Die Release-Rolle ist die, an der am häufigsten gespart wird. Meine Position dazu steht in mehreren Artikeln: Wer mit einem Open-Source-Werkzeug wie sfdx-hardis Lizenzkosten spart, investiert das Geld am besten in eine interne Release-Rolle. Bei kommerziellen Plattformen wie Gearset, Copado oder Flosum gilt dasselbe. Ihr Vorteil ist, dass sich Rollen und Freigaben in einer Oberfläche einrichten lassen und der Hersteller Support leistet; verantworten muss die Freigaben trotzdem ein Mensch auf Ihrer Seite. Den Weg, den ich empfehle, fasse ich so zusammen: extern aufbauen, intern übergeben. Wie das in einem Programm aussehen kann, beschreibe ich in [warum DevOps über Salesforce-Großprojekte entscheidet](../../../blog/warum-devops-salesforce-enterprise-projekte/).

## Wer gibt was frei?

Eine Freigabematrix beantwortet für jede Art von Änderung zwei Fragen: Wer prüft, und wer entscheidet? So sieht ein Ausgangspunkt aus, den ich mit Ihnen an Ihre Streams anpassen würde:

| Änderung | Prüft | Gibt frei |
|---|---|---|
| Pull Request innerhalb eines Streams | zweiter Entwickler oder Lead des Partners | Lead des Partners, bei grüner Pipeline |
| Änderung an einem Objekt, das ein anderer Stream verantwortet | Lead des verantwortlichen Streams | Architekt |
| Neues Objekt, neue Schnittstelle, Sharing oder Permission-Konzept | Architekt | Architekt |
| Promotion nach UAT | Release Manager | Release Manager |
| Release nach Produktion | Release Manager, Product Owner | Product Owner fachlich, Release Manager technisch |
| Hotfix | Architekt oder Lead | Release Manager und betroffener Product Owner |
| Pipeline, Branch-Schutz, Werkzeugkonfiguration | Release Manager | nur Kundenseite |

Was ein gutes Review prüft und wie es schnell bleibt, beschreibe ich in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/). Hier geht es um die Durchsetzung, denn eine Matrix im Wiki hält niemanden auf.

### In der Git-Plattform

Bei GitHub verlangen [geschützte Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) eine Mindestzahl an Freigaben und grüne Statusprüfungen vor dem Merge. Zwei Details übersehen viele. Admins sind standardmäßig von den Regeln ausgenommen, bis Sie „Do not allow bypassing the above settings“ aktivieren. Und in privaten Repositories gibt es geschützte Branches erst ab GitHub Pro, Team oder Enterprise. Eine [CODEOWNERS-Datei](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) fordert den verantwortlichen Stream automatisch als Reviewer an, wenn ein Pull Request seine Dateien ändert, mit „Require review from Code Owners“ wird das zur Pflicht. So bilden Sie die zweite Zeile der Matrix ab: Die Metadaten des Auftragsobjekts gehören dem Integrations-Stream, und kein anderer Partner merged daran vorbei.

GitLab bietet [Code Owners](https://docs.gitlab.com/user/project/codeowners) in Premium und Ultimate an; auf geschützten Branches lassen sich Freigaben durch Code Owners zur Pflicht machen. In Azure DevOps heißen die Bausteine [Branch Policies](https://learn.microsoft.com/en-us/vsts/git/branch-policies): eine Mindestzahl an Reviewern und automatisch hinzugefügte Reviewer für bestimmte Ordner, die Sie als „Required“ markieren können.

### In den DevOps-Werkzeugen

Die kommerziellen Plattformen bringen eigene Freigaben mit. Gearset erlaubt laut [Dokumentation](https://docs.gearset.com/en/articles/9927191-gearset-security-roles) ab „Deployment Teams and Automation Starter“ eigene Rollen mit Rechten auf Pipelines, CI-Jobs und Orgs und schlägt als Beispiel eine Rolle „Production Deployment“ vor, die nur bei Bedarf vergeben wird. Copado Essentials Plus hat einen [Freigabeprozess](https://docs.essentials.copado.com/en/articles/6887394-approval-process-with-copado-essentials), in dem Benutzer mit der Rolle Owner oder Team Lead Deployments aus einer Org freigeben. Bei sfdx-hardis laufen Freigaben über die Pull Requests der Git-Plattform, also über den Branch-Schutz oben.

### In der Salesforce-Org

Die Pipeline nützt wenig, wenn jemand an ihr vorbei deployen kann. Für Deployments über die Metadata API braucht ein Benutzer laut [Metadata API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_metadata_perm.htm) „Modify Metadata Through Metadata API Functions“ oder „Modify All Data“, und die erste Berechtigung wird automatisch aktiv, sobald jemand „Deploy Change Sets“ oder „Author Apex“ hat. Prüfen Sie also in Produktion, UAT und Staging, welche Partnerbenutzer eine dieser Berechtigungen tragen. Deployen sollte dort nur der technische Benutzer der Pipeline, wie [Kapitel 5](../pipeline-aufbauen/) beschreibt. Für befristete Rechte, etwa für eine Analyse in Produktion, können Permission-Set-Zuweisungen laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/platform-app-builder-certification-maintenance-winter-23/get-hands-on-with-permission-set-expiration) ein Ablaufdatum bekommen, nach dem die Rechte automatisch entfallen.

## Welche Regeln gehören in jeden Partnervertrag?

Ich bin Architekt, kein Anwalt. Die folgenden Punkte beschreiben, was ich aus technischer Sicht schriftlich sehen möchte. Ihre Rechtsabteilung macht daraus Klauseln. Ich empfehle eine Anlage zum Rahmenvertrag, die für jeden Partner identisch gilt, statt Regeln in jeder Leistungsbeschreibung neu zu verhandeln.

1. **Arbeiten in Ihren Werkzeugen.** Code, Tickets und Dokumentation entstehen in Ihrem Repository und Ihrem Backlog, mit persönlichen, benannten Benutzern. Geteilte Logins sind ausgeschlossen.
2. **Das Werkzeug steht fest.** Die Wahl fällt am Anfang des Programms und gilt für jeden Partner. Wer später kommt, bringt kein eigenes Release-Werkzeug mit.
3. **Jede Änderung per Pull Request.** Auch Flows, Permission Sets und Layouts. In Integration, UAT, Staging und Produktion ändert niemand etwas direkt im Setup.
4. **Standards und Review-Regeln gelten.** Das Standarddokument des Kunden ist Teil des Vertrags, ebenso vereinbarte Reaktionszeiten für Reviews.
5. **Definition of Done.** Tests mit echten Asserts, Pull-Request-Beschreibung mit Bezug zur Story, dokumentierte Vor- und Nacharbeiten für das Deployment.
6. **Release-Kalender und Freeze-Fenster.** Der Partner plant gegen Ihren Kalender, nicht gegen seinen eigenen. Wie der Kalender entsteht, beschreibt [Kapitel 8](../release-planung-salesforce-releases/).
7. **Hotfixes über dieselbe Pipeline.** Ohne Ausnahme für „dringend“.
8. **Regeln für KI-Coding.** Welche Tools, welche Daten, welches Review. Die Prüfpunkte dafür stehen in [Partner codet mit KI: Was in den Vertrag gehört](../../../blog/partner-ki-coding-regeln-vertrag/).
9. **Ausstieg.** Übergabe ohne Arbeit außerhalb des Repositorys, Bestätigung, dass lokale Kopien mit Ihrem Code und Ihren Zugangsdaten gelöscht sind, aktive Mitarbeit an der Übergabe für einen vereinbarten Zeitraum.

Ich habe mit Nearshore-Teams in Osteuropa und Indien gearbeitet, und meine Einschätzung ist: Schriftliche Regeln sind mehr wert als jede Abstimmung im Call. Ein Team in einer anderen Zeitzone kann nicht kurz nachfragen, ob ein Setup-Klick in UAT in Ordnung ist. Es braucht die Regel vorher.

## Wie übersteht der Release-Prozess einen Partnerwechsel?

Wenn Eigentum, Rollen und Vertragsregeln stehen, ist ein Partnerwechsel ein Vorgang mit Checkliste. Ein typisches Szenario, als Annahme: Ein Hersteller von Verpackungsmaschinen betreibt Service Cloud mit Field Service, ein Händlerportal und eine SAP-Schnittstelle. Drei Partner arbeiten auf der Org. Der Partner für den Service-Stream wird nach einer Ausschreibung durch einen neuen ersetzt, mit vier Wochen Überlappung.

1. **Bestand aufnehmen, bevor der Ausstieg verkündet wird.** Ein Abgleich zwischen Produktion und Repository zeigt, was nie im Repository angekommen ist. Das Setup Audit Trail hilft dabei, es zeigt laut [Salesforce-Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) Setup-Änderungen der mindestens letzten 180 Tage. Ältere Abweichungen findet nur der Abgleich. Wie eine Analyse technischer Schulden vor dem Wechsel aussieht, beschreibe ich in [KI-Org-Analyse: technische Schulden vor dem Partnerwechsel](../../../blog/ki-org-analyse-technische-schulden/).
2. **Den neuen Partner im bestehenden Setup einarbeiten.** Er bekommt Benutzer im Repository, im Werkzeug und in den Sandboxes, liest die Standards und reicht in der ersten Woche kleine Pull Requests ein, die der Release Manager eng begleitet.
3. **CODEOWNERS umstellen.** Die Objekte des Service-Streams wechseln den Verantwortlichen, ohne dass sich der Prozess ändert.
4. **Zugriffe entziehen.** Am letzten Tag verlieren alle Benutzer des alten Partners ihren Zugriff auf Git-Plattform, Werkzeug, Sandboxes und Produktion.
5. **Geheimnisse erneuern.** Zertifikate der Pipeline, Passwörter technischer Benutzer, Zugänge zur SAP-Middleware. Alles, was der alte Partner je gesehen hat, wird ersetzt.

Der Release-Kalender läuft in diesem Szenario ohne Pause weiter, denn Pipeline, Historie und Standards gehören dem Hersteller. Der neue Partner arbeitet ab Tag eins nach denselben Regeln wie die beiden anderen, und die Partner bleiben vergleichbar. Dieselbe Situation mit einer Pipeline im Account des alten Partners hätte einen Umzug mitten im Wechsel bedeutet.

## Wo fangen Sie an?

1. Listen Sie jedes Werkzeug mit Vertragsinhaber, Admins und Partnerbenutzern auf.
2. Benennen Sie Release Manager und Architekt auf Kundenseite, auch wenn eine Person beides übernimmt.
3. Schreiben Sie die Freigabematrix auf eine Seite und bilden Sie sie in Branch-Schutz und CODEOWNERS ab.
4. Entziehen Sie Partnerbenutzern in Stufen-Orgs die Rechte für direkte Deployments.
5. Entwerfen Sie mit Ihrer Rechtsabteilung die Anlage für alle Partnerverträge.

Diese Steuerung über alle Partner hinweg ist der Kern meiner Arbeit in der [Partnersteuerung](../../../leistungen/partnersteuerung/). Welche Orgs und Branches die Rollen aus diesem Kapitel bespielen, folgt in [Kapitel 3 zu Umgebungen und Branches](../umgebungen-und-branching/).

Ein Release-Prozess bleibt stabil, wenn er Ihnen gehört, jede Rolle benannt ist und jeder Partner dieselben Regeln unterschrieben hat. Wenn Sie Eigentum, Rollen und Partnerverträge in Ihrem Programm prüfen lassen möchten, [schreiben Sie mir](#contact).
