---
title: "Sandbox-Strategie und Branching für Salesforce"
description: "Welche Sandboxes ein Salesforce-Programm braucht, wann Scratch Orgs passen, welches Branch-Modell trägt und wie Refresh und Hotfix sauber laufen."
lang: de
slug: umgebungen-und-branching
course: devops
translationKey: devops-03
chapter: 3
pubDate: 2026-10-28
short: "Umgebungen und Branches"
summary: "Wie Sandboxes, Scratch Orgs und Branches zusammenpassen, damit Entwickler-Orgs aktuell bleiben und Hotfixes nicht verloren gehen."
takeaways:
  - "Jede Stufe der Pipeline braucht eine eigene Org und einen eigenen Branch: Entwicklung, Integration, UAT, Staging und Produktion, dazu ein fester Weg für Hotfixes."
  - "Scratch Orgs leben höchstens 30 Tage und sind leer; in einer gewachsenen Kundenorg sind Developer-Sandboxes mit Source Tracking oft der pragmatischere Arbeitsplatz."
  - "Entwickler-Sandboxes veralten mit jedem Merge; sfdx-hardis backpromote, Gearset Developer Sandbox Updates und die Back Promotions von Copado und Flosum holen sie zurück."
  - "Ein Hotfix ist erst fertig, wenn er per Retrofit auch im Integrations-Branch steht; sonst überschreibt das nächste Release die Korrektur in Produktion."
  - "Ein Refresh ersetzt die Sandbox durch eine neue Kopie der Produktion; Source Tracking und nicht ausgelieferte Änderungen gehen dabei verloren."
articles: [devops-salesforce-enterprise, sfdx-hardis-training, sandbox-data-ai-coding-agents]
faq:
  - q: "Wie viele Sandboxes braucht ein Salesforce-Programm mit mehreren Partnern?"
    a: "Mindestens eine Entwicklungsumgebung pro Entwickler oder Story, eine Integrations-, eine UAT- und eine Staging-Sandbox. Ohne Partial-Copy-Lizenz teilen sich UAT und Staging die Full-Sandbox, dann laufen Abnahme und Generalprobe nacheinander."
  - q: "Sollten wir Scratch Orgs statt Sandboxes verwenden?"
    a: "Für neue, gut gekapselte Pakete ja. Eine über Jahre gewachsene Org lässt sich oft nicht vollständig aus dem Repository in eine leere Scratch Org deployen. Dann sind Developer-Sandboxes mit Source Tracking der bessere Arbeitsplatz."
  - q: "Was ist ein Backpromote in sfdx-hardis?"
    a: "Ein Backpromote deployt in eine Entwickler-Sandbox, was das Team seit dem letzten Lauf in den Eltern-Branch gemergt hat, inklusive Löschungen und Deployment Actions. Die Funktion ist laut Cloudity in Beta und verweigert Produktion und Orgs der Hauptbranches."
  - q: "Wie oft darf man eine Full-Sandbox aktualisieren?"
    a: "Laut Salesforce alle 29 Tage, eine Partial Copy alle 5 Tage, Developer- und Developer-Pro-Sandboxes täglich. Planen Sie Full-Refreshes trotzdem in den Release-Kalender ein, weil sie laufende Tests unterbrechen."
draft: false
---

Eine tragfähige Sandbox-Strategie für Salesforce ordnet jeder Stufe der Pipeline eine eigene Org und einen eigenen Git-Branch zu: Entwicklung in Developer-Sandboxes oder Scratch Orgs, danach Integration, UAT, Staging und Produktion. Feature-Branches leben kurz und wandern per Pull Request durch die Stufen-Branches. Zwei Dinge entscheiden im Alltag, ob das Modell hält: Entwickler-Sandboxes müssen regelmäßig den Stand des Teams nachziehen, und jeder Hotfix muss zurück in den Integrations-Branch. Sonst überschreibt das nächste Release die Korrektur in Produktion. Werkzeuge wie sfdx-hardis, Gearset, Copado oder Flosum unterstützen beides, die Regeln dafür legen Sie als Auftraggeber fest.

## Welche Sandboxes braucht ein Salesforce-Programm?

Salesforce bietet [vier Sandbox-Typen](https://www.salesforce.com/platform/what-is-salesforce-sandbox/) mit unterschiedlichen Daten und Refresh-Intervallen:

| Sandbox-Typ | Inhalt | Datenspeicher | Refresh frühestens |
|---|---|---|---|
| Developer | nur Metadaten | 200 MB | täglich |
| Developer Pro | nur Metadaten | 1 GB | täglich |
| Partial Copy | Metadaten und Auszug laut Sandbox-Vorlage | 5 GB | alle 5 Tage |
| Full | Metadaten, alle Daten und Dateien | wie Produktion | alle 29 Tage |

Wie viele Sandboxes Sie von welchem Typ haben, hängt von Edition und zugekauften Lizenzen. Für ein Programm mit mehreren Partnern würde ich die Umgebungen so verteilen:

| Stufe | Org | Wer arbeitet dort | Daten |
|---|---|---|---|
| Entwicklung | Developer-Sandbox oder Scratch Org, eine pro Entwickler oder Story | Entwickler, Admins des Partners | Seed-Testdaten |
| Integration | Developer Pro | nur die Pipeline deployt, Entwickler testen | Seed-Testdaten, Schnittstellen-Stubs |
| UAT | Partial Copy, maskiert | Fachbereich, Key User | Auszug, maskiert |
| Staging (Preprod) | Full | Release Manager, Tests mit dem SAP-QS-System | alle Daten |
| Produktion | Produktion | nur die Pipeline deployt | echte Daten |

Zwei Regeln halte ich für nicht verhandelbar. In Integration, UAT, Staging und Produktion deployt ausschließlich die Pipeline, kein Mensch über Change Sets oder das Setup. Und welche Daten in welcher Stufe liegen dürfen, ist eine Entscheidung mit dem Datenschutzbeauftragten; die Details stehen in [Sandbox-Kundendaten: was KI-Coding-Agenten lesen dürfen](../../../blog/sandbox-kundendaten-ki-coding-agenten/). Ohne Partial-Copy-Lizenz teilen sich UAT und Staging die Full-Sandbox, und Abnahme und Generalprobe müssen nacheinander laufen.

Wer welche Org besitzt und wer Deployments dorthin freigibt, regelt [Kapitel 2 zu Eigentum und Rollen](../release-prozess-eigentum-rollen/). Die Sandboxes gehören dem Kunden, auch wenn ein Partner sie täglich nutzt.

## Wann passen Scratch Orgs, und wo stoßen sie an Grenzen?

Salesforce beschreibt die Scratch Org als [„source-driven and disposable deployment of Salesforce code and metadata“](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs.html). Sie entsteht aus dem Repository, ist standardmäßig leer und lebt höchstens 30 Tage; laut [Leitfaden zum Anlegen](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs-create.html) sind 7 Tage der Standard. Nach Ablauf lässt sie sich nicht wiederherstellen. Personenbezogene Daten gehören laut Salesforce ausdrücklich nicht hinein.

Die Anzahl begrenzt der Dev Hub, also Ihre Produktions-Org. Laut [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs-editions-and-allocations.html) gilt:

| Edition des Dev Hub | Aktive Scratch Orgs | Neu angelegte pro 24 Stunden |
|---|---|---|
| Enterprise | 40 | 80 |
| Unlimited, Performance | 100 | 200 |

Jede Scratch Org hat 500 MB Daten- und 50 MB Dateispeicher. Für ein Programm mit 30 Entwicklern auf Enterprise Edition reicht das, solange abgelaufene Orgs konsequent gelöscht werden.

Die eigentliche Grenze liegt woanders. Eine Scratch Org enthält nur, was im Repository steht und sich deployen lässt, plus die Features und Einstellungen aus der Definitionsdatei, die Salesforce „org shape“ nennt. Eine Org, die über Jahre mit Service Cloud, Field Service, Händlerportal, Managed Packages und manuellen Einstellungen gewachsen ist, lässt sich nach meiner Einschätzung selten vollständig in eine leere Scratch Org deployen. Der Aufwand dafür ist ein Projekt für sich.

Mein Rat für gewachsene Orgs: Developer- oder Developer-Pro-Sandboxes als Arbeitsplatz, mit eingeschaltetem [Source Tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html). Das gibt es nur für diese beiden Typen, nicht für Partial Copy und Full. Scratch Orgs lohnen sich für neue, gekapselte Teile, etwa ein eigenes Paket für eine Garantie-App. sfdx-hardis unterstützt beide Wege; das [kostenlose Training](../../../blog/sfdx-hardis-kostenloses-devops-training/) richtet zum Beispiel Dev Hub und Scratch Orgs ein, für eine gewachsene Kundenorg würde ich trotzdem mit Sandboxes starten.

## Wie sieht ein Branch-Modell aus, das mehrere Partner trägt?

Ein Branch ist ein eigener Entwicklungsstrang im Git-Repository. Für Salesforce hat sich ein Modell mit zwei Arten von Branches durchgesetzt:

- **Stufen-Branches** (Hauptbranches) gehören fest zu einer Org. sfdx-hardis nennt sie [„major branches“](https://sfdx-hardis.cloudity.com/salesforce-devops-deploy-major-branches/), definiert als „git branches that have an associated CI/CD org“, mit der Kette `integration`, `uat`, `preprod` und `main` für Produktion. Ein Merge in den Branch deployt in die zugehörige Org.
- **Feature-Branches** (User-Story-Branches) haben keine eigene Org im Pipeline-Sinn. Ein Entwickler baut eine Story in seiner Sandbox, committet in den Feature-Branch und öffnet einen Pull Request nach `integration`.

```ablauf
sf: Feature-Branch, integration, uat, preprod, main Produktion
Feature-Branch --Pull Request--> integration
integration --Beförderung--> uat
uat --Beförderung--> preprod
preprod --Beförderung--> main Produktion
```

Von dort wandern Änderungen per Pull Request zwischen den Stufen-Branches nach oben. Ein solcher Pull Request befördert laut sfdx-hardis alles, was seit der letzten Beförderung in den Quell-Branch gemergt wurde. Gearset arbeitet in seinen Pipelines ebenfalls mit langlebigen Umgebungs-Branches. Die Werkzeuge vergleicht [Kapitel 4](../devops-werkzeuge-vergleich/).

Eine ehrliche Einschränkung: DORA empfiehlt für leistungsstarke Teams [Trunk-Based Development](https://dora.dev/capabilities/trunk-based-development/) mit höchstens drei aktiven Branches und mindestens einem Merge pro Tag in den Hauptstrang. Ein Modell mit vier Stufen-Branches widerspricht dem. Ich halte es in Programmen mit Fachbereichsabnahme und mehreren Partnern trotzdem für richtig, weil jede Stufe eine andere Freigabe darstellt. Den Preis zahlen Sie über Feature-Branches, die lange leben. Meine Regel deshalb: Feature-Branches leben Tage, keine Wochen, und eine Story, die nicht in einen Sprint passt, wird geschnitten.

Stories, die in UAT noch nicht abgenommen sind, blockieren eine Beförderung von `uat` nach `preprod`. sfdx-hardis bietet dafür [Promotion Branches](https://sfdx-hardis.cloudity.com/salesforce-devops-promotion-branches/) in Beta an, nennt sie aber selbst den Ausnahmeweg. Der Normalfall bleibt, UAT als Ganzes getestet zu befördern.

## Wie bleiben Entwickler-Sandboxes aktuell?

Mit jedem Merge in `integration` veraltet jede Entwickler-Sandbox ein Stück. Wer auf einem Stand von vor drei Wochen baut, erzeugt Konflikte, die erst im Pull Request auffallen, oder deployt alte Versionen fremder Komponenten mit. So entstehen die sich gegenseitig überschreibenden Änderungen, die ich in [warum DevOps über Salesforce-Großprojekte entscheidet](../../../blog/warum-devops-salesforce-enterprise-projekte/) beschrieben habe.

Der Vorgang heißt Back Promotion oder Backpromote: Änderungen aus einer höheren Stufe werden zurück in die Entwicklungsumgebungen gebracht. So lösen es die Werkzeuge:

```vertiefung Werkzeuge
titel: Back Promotion in sfdx-hardis, Gearset, Copado und Flosum
- **sfdx-hardis.** Der [Backpromote](https://sfdx-hardis.cloudity.com/salesforce-devops-backpromote/) deployt in eine Entwickler-Sandbox oder Scratch Org, was seit dem letzten Lauf in den Eltern-Branch gemergt wurde, inklusive Löschungen und Deployment Actions. Vor dem Lauf zeigt er jedes Element mit seinem Vergleich zur Sandbox; bei Abweichungen entscheiden Sie zwischen Überschreiben, Behalten und Zusammenführen. Er verweigert Produktion und die Orgs der Hauptbranches, führt keine Deployment Action zweimal in derselben Sandbox aus und läuft über die VS-Code-Erweiterung oder `sf hardis:work:backpromote`. Die Funktion ist laut Cloudity in Beta.
- **Gearset.** [Developer Sandbox Updates](https://docs.gearset.com/en/articles/9729558-getting-started-with-developer-sandbox-updates-in-pipelines) listen jede Beförderung in den Basis-Branch als Update, das Sie in die Sandbox deployen. Vorher sichert Gearset nicht committete Arbeit aus der Sandbox und führt sie mit den Updates zusammen.
- **Copado.** Die [Back Promotions](https://docs.essentials.copado.com/en/articles/8098362-back-promotions-with-copado-essentials) zeigen, welche Deployments einer Umgebung fehlen, und deployen sie gesammelt zurück, auch ohne Refresh.
- **Flosum.** Eine [Backpromotion-Pipeline](https://flosum.com/blog/keep-all-your-salesforce-sandboxes-in-sync-using-flosum-pipelines) bringt Änderungen aus Produktion in die Sandboxes.
```

Die kommerziellen Werkzeuge machen das bequem und mit wenig Git-Wissen bedienbar, das ist ihre Stärke. Welches Werkzeug Sie wählen, ist zweitrangig. Wichtig ist eine Regel im Partnervertrag: Vor jeder neuen Story und nach jedem Refresh wird die Entwickler-Sandbox auf den Stand des Eltern-Branches gebracht.

## Sandbox-Refresh ohne Überraschungen

Ein Refresh ersetzt die Sandbox durch eine neue Kopie der Produktion. Laut [Salesforce Help zu Benutzern und Kontakten in Sandboxes](https://help.salesforce.com/s/articleView?id=platform.data_sandbox_users_and_contacts.htm&language=en_US&type=5) bekommen E-Mail-Adressen der Benutzer beim Anlegen oder Refresh die Endung `.invalid`. Andere E-Mail-Adressen, etwa in Kontakten, ändert Salesforce nicht; bei einem Hersteller mit Tausenden Händlerkontakten in einer Full-Sandbox ist das ein echtes Risiko für versehentliche Mails. Source Tracking wird beim Refresh [gelöscht](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html). Über die Salesforce CLI läuft ein Refresh mit [`sf org refresh sandbox`](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_org_refresh_sandbox.html), standardmäßig mit automatischer Aktivierung.

Meine Checkliste für jeden Refresh einer Stufen-Sandbox:

```schritte
Vorher sichern
  Alle Änderungen, die nur in der Sandbox stehen, committen oder bewusst verwerfen. Gearset empfiehlt außerdem, den Umgebungs-Branch vorher mit `main` abzugleichen und Pipeline-Läufe in diese Org während des Refreshs [anzuhalten](https://docs.gearset.com/en/articles/10256103-salesforce-sandbox-refresh-in-a-pipeline).
Stufen-Branch deployen
  Die Sandbox enthält nach dem Refresh nur, was schon in Produktion ist.
Schnittstellen prüfen
  Zeigen Named Credentials und Endpunkte auf das SAP-QS-System statt auf das produktive?
Daten nachziehen
  Kontaktadressen, Maskierung und Seed-Daten, wie in [Kapitel 7 zu Daten und Konfiguration](../daten-und-konfiguration/) beschrieben.
Pipeline-Zugang neu einrichten
  Falls die Authentifizierung an der alten Org hing.
```

Bei Entwickler-Sandboxes ist es einfacher: Nach dem Refresh ein Backpromote, und der Entwickler ist auf Stand. sfdx-hardis markiert frühere Läufe dann als „Before refresh“ und behandelt Deployment Actions als noch nicht ausgeführt.

Der Zeitpunkt eines Refreshs hat noch eine Nebenwirkung: Er entscheidet, ob eine Sandbox auf einer [Preview-Instanz](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf-releases-sandbox-preview) liegt und das nächste Salesforce-Release etwa vier bis sechs Wochen vor der Produktion bekommt. Wie Sie das planen, steht in [Kapitel 8 zur Release-Planung](../release-planung-salesforce-releases/).

## Der Hotfix-Pfad

Ein Fehler in Produktion kann nicht warten, bis UAT abgenommen ist. Deshalb braucht jedes Programm einen zweiten, kurzen Weg. In sfdx-hardis sieht er laut [Hotfix-Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-hotfixes/) so aus: Der Entwickler startet eine Story mit Ziel `preprod` in einer Sandbox mit Produktionsstand, der Pull Request geht nach `preprod` und von dort nach `main`.

```hinweis achtung
Der zweite Pull Request nach `main` befördert alles, was seit der letzten Beförderung in `preprod` liegt, nicht nur den Hotfix. In `preprod` darf deshalb nichts Halbfertiges liegen.
```

Der kritische Schritt kommt danach. Die Stufen-Branches darunter wurden vor dem Fix abgezweigt und enthalten die alte Version derselben Metadaten. Werden sie befördert, verschwindet die Korrektur wieder aus Produktion. sfdx-hardis nennt den Rückweg [Retrofit](https://sfdx-hardis.cloudity.com/salesforce-devops-retrofit/): `main` wird in einen Branch `retrofit/from-main` gemergt und per Pull Request nach `integration` gebracht, und zwar sofort, weil ein aufgeschobener Retrofit zu einem wachsenden Konflikt wird. Gearset erzeugt nach einem Hotfix in `main` automatisch [Back-Propagation-Pull-Requests](https://docs.gearset.com/en/articles/9773388-org-syncing-with-pipelines) für die tieferen Umgebungen, befördert sie aber nicht selbst. Jemand muss sie also prüfen und mergen.

Dieselbe Logik gilt für Änderungen, die jemand von Hand in Produktion gemacht hat. Sie kommen als normale Story von unten zurück ins Repository. Wie Sie solche Änderungen überhaupt bemerken, behandelt [Kapitel 9 zu Betrieb und Monitoring](../betrieb-monitoring-backup/).

## Ein typisches Szenario, als Annahme: drei Partner auf einer Service-Org

Ein Maschinenbauer betreibt Service Cloud, Field Service und ein Händlerportal auf einer Org, mit SAP als ERP. Drei Partner arbeiten parallel: einer am Außendienst, einer am Portal, ein Nearshore-Team an Schnittstellen. Alle Zahlen hier sind Annahmen.

- **18 Entwickler-Sandboxes** vom Typ Developer mit Source Tracking, je eine pro Entwickler, dazu ein gemeinsamer Seed-Datensatz im Repository.
- **Eine Integrationssandbox** (Developer Pro) und ein Branch `integration`. Jeder Partner merged nur per Pull Request mit Review dorthin.
- **Eine Partial Copy** für UAT, maskiert, mit Abnahme durch Service und Vertrieb.
- **Eine Full-Sandbox** für Staging und die End-to-End-Tests mit dem SAP-QS-System, Refresh nach jedem eigenen Quartals-Release.
- **Ein Hotfix-Weg** über `preprod`, mit Retrofit am selben Tag.

Die Regeln dazu stehen im Vertrag mit jedem Partner: Backpromote vor jeder Story, keine Änderung im Setup einer Stufen-Org, kein Feature-Branch älter als zwei Wochen. Wie die Pipeline zwischen diesen Stufen technisch läuft, beschreibt [Kapitel 5](../pipeline-aufbauen/). Solche Modelle entwerfe ich in meiner Arbeit zu [DevOps und Release-Management](../../../leistungen/devops-und-release-management/).

Umgebungen und Branches funktionieren, wenn jede Org genau einem Branch gehört und Änderungen in beide Richtungen nach festen Regeln fließen. Wenn Sie Ihre Sandbox-Strategie oder Ihren Hotfix-Weg prüfen lassen möchten, [schreiben Sie mir](#contact).
