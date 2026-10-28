---
title: "Release-Planung für Salesforce: Kalender und Releases"
description: "Release-Kalender, Rhythmus und Freeze-Fenster für Salesforce, dazu Sandbox Preview, Release Updates, API-Versionen und Abschaltungen, die Pipelines treffen."
lang: de
slug: release-planung-salesforce-releases
course: devops
translationKey: devops-08
chapter: 8
pubDate: 2026-10-28
short: "Release-Planung"
summary: "Wie Sie Ihren Release-Kalender mit den drei Salesforce-Releases, Release Updates und Abschaltungen abstimmen."
takeaways:
  - "Ein Salesforce-Release-Kalender legt zwei Kalender übereinander: den eigenen Rhythmus mit Freeze-Fenstern und den Kalender von Salesforce mit drei Releases, Release Updates und Abschaltungen."
  - "Ob eine Sandbox das neue Release früh bekommt, entscheidet ihre Instanz; ändern lässt sich das nur per Refresh vor dem Stichtag, für Winter '27 war das der 27. August 2026."
  - "Sandboxes auf der Preview-Version gehören nicht in die Deployment-Kette nach Produktion, weil sie mit einer neueren API-Version arbeiten als die Produktions-Org."
  - "Release Updates haben ein Datum, bis zu dem Sie die Schritte erledigt haben sollen; ein Testlauf schaltet die Änderung sofort ein und gehört deshalb zuerst in eine Sandbox."
  - "Bis Summer '28 laufen mehrere Abschaltungen mit festen Terminen, vom CLI-Token am 28. Oktober 2026 bis zu den API-Versionen 31.0 bis 40.0."
articles: [salesforce-winter-27-pipeline, api-67-user-mode-apex, salesforce-password-integrations-2027, salesforce-dx-mcp-server-end-of-life]
faq:
  - q: "Wie oft bringt Salesforce ein neues Release?"
    a: "Dreimal im Jahr: Spring, Summer und Winter. Laut Salesforce kommt Spring üblicherweise im Februar, Summer im Juni und Winter im Oktober. Die genauen Termine Ihrer Instanz stehen im Maintenance Calendar auf Salesforce Trust."
  - q: "Wie bekomme ich eine Sandbox auf die Preview-Version?"
    a: "Erstellen oder aktualisieren Sie die Sandbox vor dem Stichtag aus den Sandbox Preview Instructions. Ob eine Sandbox auf einer Preview-Instanz liegt, zeigt die Spalte Release Type auf der Sandbox-Seite im Setup. Ein Refresh nach dem Stichtag schiebt sie auf eine Non-Preview-Instanz."
  - q: "Was passiert, wenn ich ein Release Update ignoriere?"
    a: "Salesforce setzt es mit dem Release durch, das in der Spalte Enforcement Scheduled or Enforced In steht. Nach dem Datum Complete Steps By wird es als überfällig angezeigt. Dann gilt die Änderung ohne Ihren Test."
  - q: "Darf während der Sandbox Preview deployt werden?"
    a: "Ja, solange der Weg nach Produktion nur über Sandboxes auf dem Produktionsrelease läuft. Aus einer Preview-Sandbox nach Produktion zu deployen, scheitert leicht an Metadaten, die die ältere API-Version nicht kennt."
draft: false
---

Release-Planung für Salesforce heißt, zwei Kalender übereinanderzulegen. Ihr eigener Kalender legt fest, in welchem Rhythmus Änderungen in Produktion gehen, wann eingefroren wird und wer die Fachbereiche informiert. Der Kalender von Salesforce bringt drei Releases im Jahr, jeweils mit Sandbox Preview, Release Updates und einer neuen API-Version, dazu Abschaltungen mit festen Terminen. Im Herbst 2026 sind das unter anderem der 28. Oktober für die Salesforce CLI, der 1. Dezember für SOAP-Logins und der 20. Februar 2027 für den Passwort-Flow. Ein Release-Manager auf Kundenseite pflegt beide Kalender an einer Stelle und gibt sie allen Partnern verbindlich vor.

## Was gehört in einen Salesforce-Release-Kalender?

Ein Release-Kalender ist die eine Übersicht, aus der jedes Team abliest, wann es liefern darf und wann nicht. In einem Programm mit mehreren Implementierungspartnern auf einer Org hat jeder Partner seinen eigenen Sprintplan. Der Kalender gehört deshalb dem Kunden, gepflegt vom Release-Manager aus [Kapitel 2](../release-prozess-eigentum-rollen/), und die Partner planen in ihn hinein. Bei acht Teams auf einer Org, wie in einem meiner Programme, ist er die einzige Stelle, an der alle Termine zusammenkommen.

Vier Ebenen gehören hinein:

1. **Ihre eigenen Releases:** reguläre Termine, Hotfix-Regeln, Freeze-Fenster.
2. **Die Salesforce-Releases:** Pre-Release-Org, Release Notes, Stichtag für die Sandbox Preview, Upgrade der Sandboxes, Upgrade Ihrer Produktionsinstanz.
3. **Abschaltungen und Release Updates:** Termine, an denen etwas aufhört zu funktionieren, wenn niemand handelt.
4. **Termine aus dem Geschäft:** Quartalsabschluss im Vertrieb, Inventur, Werksferien, Releases im SAP, Messen mit neuen Produkten im Händlerportal.

Die vierte Ebene wird am häufigsten vergessen. Ein Release am letzten Tag des Quartals trifft den Vertrieb genau dann, wenn Angebote und Aufträge durch Salesforce müssen. Ein Release, das die Schnittstelle zu SAP ändert, gehört nicht in die Woche, in der das SAP-Team selbst Transporte einspielt.

## Welcher Rhythmus und welche Freeze-Fenster passen?

Ich empfehle einen festen Rhythmus statt Releases nach Bedarf. Alle zwei oder drei Wochen am selben Wochentag ist für die meisten Programme ein guter Start. Ein fester Termin zwingt die Partner, kleine Pakete zu schnüren, und die Fachbereiche wissen, wann sich etwas ändert. Was dringend ist und nicht warten kann, läuft über den Hotfix-Pfad aus [Kapitel 3](../umgebungen-und-branching/), nicht über ein Sonder-Release.

Ein Freeze-Fenster ist ein Zeitraum, in dem nichts nach Produktion deployt wird außer Hotfixes mit Freigabe. Drei Arten sind bei Salesforce sinnvoll:

- **Rund um das Upgrade Ihrer Produktionsinstanz.** Der Freitag vor dem Upgrade-Wochenende und die ersten Arbeitstage danach. In dieser Zeit wollen Sie Fehler eindeutig zuordnen können: Kommt er vom Salesforce-Release oder von Ihrem?
- **Während der Sandbox Preview für den Weg nach Produktion.** Deployments laufen weiter, aber nur über Sandboxes, die auf demselben Release stehen wie Produktion. Dazu unten mehr.
- **Aus dem Geschäft.** Quartals- und Jahresabschluss, Inventur, Go-live-Termine im SAP.

Die Freeze-Fenster stehen im Kalender, bevor die Partner ihre Sprints planen. Eine Freeze-Regel, die erst zwei Tage vorher bekannt wird, wird umgangen.

## Wie laufen die drei Salesforce-Releases im Jahr ab?

Salesforce liefert laut der [Release-Seite](https://www.salesforce.com/releases/) dreimal im Jahr ein großes Release: Spring üblicherweise im Februar, Summer im Juni, Winter im Oktober. Der Ablauf ist jedes Mal gleich. Für Winter '27 sah er laut dem [Admin-Countdown von Salesforce](https://admin.salesforce.com/blog/2026/admin-winter-27-release-countdown) und den [Sandbox Preview Instructions](https://help.salesforce.com/s/articleView?id=000391927&language=en_US&type=1) so aus:

| Termin | Schritt |
|---|---|
| 13. August 2026 | Anmeldung für die Pre-Release-Org |
| 19. August 2026 | Release Notes auf Salesforce Help |
| 27. August 2026, 18 Uhr Pacific Time | Stichtag für Sandboxes, die auf die Preview-Version sollen |
| 28. und 29. August 2026 | Upgrade der Sandboxes auf Preview-Instanzen |
| 4. September, 2. Oktober, 9. Oktober 2026 | Upgrade der Produktions-Orgs, je nach Instanz |
| 9. und 10. Oktober 2026 | Upgrade der Sandboxes auf Non-Preview-Instanzen |

Den genauen Termin Ihrer Produktionsinstanz zeigt der [Maintenance Calendar auf Salesforce Trust](https://status.salesforce.com/products/all/maintenances). Für Spring '27 nenne ich hier keine Termine, weil ich sie bei Salesforce noch nicht nachlesen konnte. Tragen Sie sie ein, sobald Trust sie für Ihre Instanz zeigt. Wenn Spring '27 wie üblich im Februar kommt, fällt es in dieselben Wochen wie das Ende des Passwort-Flows am 20. Februar 2027. Das gehört in die Planung.

### Sandbox Preview: welche Sandbox bekommt das Release früher?

Ob eine Sandbox das neue Release früh bekommt, hängt an ihrer Instanz. Alle Sandboxes auf einer Preview-Instanz werden gemeinsam aktualisiert, Sandboxes auf Non-Preview-Instanzen bleiben auf dem aktuellen Release, bis auch Produktion umgestellt ist. Welche Instanz eine Sandbox hat, zeigt die Spalte Release Type auf der Sandbox-Seite im Setup. Ändern lässt sich das nur per Refresh: Laut Salesforce Help landet eine Sandbox, die nach dem Stichtag erstellt oder aktualisiert wird, auf einer Non-Preview-Instanz und fällt auf das alte Release zurück. Ein Refresh baut die Sandbox aus Produktion neu auf, eigene Daten und Konfiguration darin sind danach weg.

Für den Release-Kalender folgen daraus zwei Regeln:

- **Mindestens eine Sandbox bewusst auf Preview.** Salesforce empfiehlt das im [Trailhead-Modul zur Sandbox Preview](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf-releases-sandbox-preview). Dort laufen Regressionstests, die Schnittstellentests zu SAP und der Test der Release Updates. Geplante Sandbox-Refreshes aus [Kapitel 3](../umgebungen-und-branching/) legen Sie vor den Stichtag.
- **Preview-Sandboxes nicht in der Deployment-Kette nach Produktion.** Eine Preview-Sandbox arbeitet mit der neuen API-Version und kennt Metadaten, die Produktion noch nicht kennt. Gearset rät in seiner [Dokumentation zu Preview-Sandboxes](https://docs.gearset.com/en/articles/9297189-salesforce-preview-and-non-preview-sandboxes) ausdrücklich, sie nicht in die Pipeline aufzunehmen, und stellt neue API-Versionen erst nach dem allgemeinen Release als [Standard](https://docs.gearset.com/en/articles/4934349-how-does-gearset-handle-salesforce-metadata-api-releases) ein. Salesforce selbst hat für Winter '27 eine Apex-Einstellung angeboten, mit der ein Deployment aus einer Winter-'27-Sandbox in eine Produktion auf Summer '26 das alte Heap-Limit behält, wie der [Entwickler-Leitfaden zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) beschreibt.

Für die Salesforce CLI, auf der auch sfdx-hardis aufsetzt, gilt laut [Salesforce-Dokumentation](https://developer.salesforce.com/docs/platform/sfdx-setup/guide/sfdx-setup-apiversion.html): Ohne Vorgabe nimmt die CLI die höchste API-Version, die die Ziel-Org unterstützt. Legen Sie deshalb `sourceApiVersion` in `sfdx-project.json` fest und heben Sie den Wert erst nach dem Upgrade von Produktion an, in einem eigenen Pull Request.

### Release Updates: Änderungen mit Durchsetzungstermin

Release Updates sind Änderungen, die Salesforce ankündigt und zu einem festen Release durchsetzt, weil sie bestehende Anpassungen verändern können. Sie stehen im Setup unter [Release Updates](https://help.salesforce.com/s/articleView?language=en_US&id=sf.release_updates.htm&type=5), sortiert nach Needs Action, Due Soon, Overdue und Archived. Jedes Update nennt ein Datum Complete Steps By und das Release, in dem Salesforce es durchsetzt. Bei vielen Updates gibt es einen Testlauf. Laut Salesforce Help ist die Änderung damit „immediately enabled in your org“, und in Sandboxes kann der Testzeitraum früher enden.

Daraus wird ein fester Punkt im Kalender: Nach jedem Salesforce-Release geht der Release-Manager die Liste durch, gibt jedem Update einen Verantwortlichen, startet den Testlauf zuerst in der Preview- oder Integrationssandbox und aktiviert das Update in Produktion an einem eigenen Termin, bevor Salesforce es tut. Zwei aktuelle Beispiele: Die neue Berechtigung „Use Any API Auth“ für SOAP-Logins ab 1. Dezember 2026 lässt sich laut Salesforce über das Release Update im Setup vorab testen. Das Ende des OAuth-Passwort-Flows ist ebenfalls als [Release Update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) veröffentlicht.

Wer die Liste nicht von Hand prüfen will: Das Monitoring von sfdx-hardis sammelt laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/) wöchentlich Warnungen zu anstehenden und überfälligen Release Updates und meldet den nächsten Upgrade-Termin der Instanz. Mehr zum Monitoring in [Kapitel 9](../betrieb-monitoring-backup/).

### API-Versionen: jedes Release bringt eine neue

Mit jedem Release kommt eine neue API-Version, mit Winter '27 die 68.0. Das allein ändert nichts an Ihrem Code, denn jede Apex-Klasse und jeder Trigger speichert seine eigene Version. Riskant wird das Anheben. Ab API 67.0 laufen Apex-Klassen im User Mode und mit Sharing, Abfragen liefern dann still weniger Datensätze. Warum das passiert und wie Sie das Anheben planen, steht in [API 67.0: warum Apex weniger Datensätze sieht](../../../blog/api-67-apex-user-mode-weniger-datensaetze/). Coding-Agenten heben Versionen gern nebenbei an, deshalb gehört eine Regel dazu auch in die Regeldatei aus [Kapitel 8 der KI-Masterclass](../../ki-salesforce/best-practices-ki-code/).

Mein Vorschlag für den Kalender: einmal im Jahr ein geplantes Paket, das `sourceApiVersion` und die Klassen in Schüben nach Fachbereich anhebt, mit Tests als echte Benutzer. Dazu gehören die Klassen, für die der Compiler seit Winter '27 warnt, weil sie auf Version 9.0 bis 19.0 gespeichert sind.

## Welche Abschaltungen treffen Ihre Pipeline?

Abschaltungen sind Termine, an denen etwas aufhört zu funktionieren. Bis Summer '28 stehen diese im Kalender:

| Termin | Was endet | Wen es trifft |
|---|---|---|
| 28. Oktober 2026 | `sf org display` gibt keine Access Tokens mehr aus, die Übergangslösung endet | Pipeline-Skripte, die das Token lesen |
| 2. November 2026 | lokaler Salesforce DX MCP Server laut README am Ende seiner Lebensdauer | Coding-Agenten der Partner |
| 1. Dezember 2026 | SOAP login() braucht „Use Any API Auth“ | Integrationsbenutzer |
| 20. Februar 2027 | OAuth-Username-Password-Flow für Connected Apps | Schnittstellen, Datenlader, Werkzeuge |
| Summer '27 | SOAP login() in API 31.0 bis 64.0; API 31.0 bis 40.0 ohne Updates | ältere Schnittstellen |
| Summer '28 | SOAP-, REST- und Bulk-API 31.0 bis 40.0 fallen aus | ältere Schnittstellen |

Dazu braucht die Salesforce CLI seit Winter '27 Node.js 22 oder neuer, was CI-Runner und Docker-Images betrifft. Die Details stehen in vier Artikeln: [Winter '27 und Ihre Pipeline](../../../blog/salesforce-winter-27-aenderungen-pipeline/), [Passwort-Integrationen enden 2027](../../../blog/salesforce-passwort-integrationen-2027/), [Ende des DX MCP Servers](../../../blog/salesforce-dx-mcp-server-ende/) und der Artikel zu API 67.0 oben. Wie die Pipeline sich ohne Passwörter anmeldet, steht in [Kapitel 5](../pipeline-aufbauen/).

Für die Planung zählt, dass jede Abschaltung einen Verantwortlichen auf Kundenseite und einen Erledigt-Termin vor dem Salesforce-Termin bekommt. Beim Passwort-Flow würde ich das Setting in Produktion einige Tage vorher selbst abschalten, mit dem Team in Bereitschaft. Dann passiert der Ausfall an einem Tag, den Sie gewählt haben.

## Fachbereiche informieren

Die Fachbereiche merken ein Release, egal ob es von Ihnen oder von Salesforce kommt. Salesforce aktiviert mit jedem Release Funktionen automatisch, im [Trailhead-Modul zur Release-Strategie](https://trailhead.salesforce.com/content/learn/modules/sf_releases/sf_releases_strategy) heißen sie „Quick Wins“. Ein geänderter Bildschirm im Außendienst ist für den Techniker auf der Baustelle eine Änderung, egal wer sie ausgelöst hat.

Was sich bewährt, ohne viel Aufwand:

- **Ein Kalender, den die Fachbereiche sehen.** Releasetermine, Freeze-Fenster und das Salesforce-Upgrade, ohne technische Details.
- **Release Notes für Anwender pro Release.** Gegliedert nach Rolle: Innendienst, Service, Field Service, Vertrieb, Händler im Portal. Pro Punkt ein Satz, was sich für die Rolle ändert.
- **Key User testen in der Preview-Sandbox.** Wer die Prozesse kennt, sieht in einer Stunde, ob ein Salesforce-Release die Garantieabwicklung oder die Ersatzteilbestellung verändert.
- **Ein Kanal für Rückmeldungen.** Salesforce rät selbst, Anwendern zu sagen, wo sie Fragen und Probleme melden.
- **Externe Benutzer rechtzeitig.** Händler im Portal planen ihre Schulungen nicht nach Ihrem Sprint. Für sie gilt ein längerer Vorlauf.

## Ein typisches Szenario, als Annahme: ein Maschinenbauer vor Spring '27

Ein typisches Szenario, als Annahme: Ein Maschinenbauer betreibt Service Cloud, Field Service und ein Händlerportal, angebunden an SAP S/4. Drei Partner arbeiten auf einer Org, Releases gehen alle zwei Wochen am Donnerstag live. Die Release-Managerin auf Kundenseite plant im November:

1. Sie trägt den Termin für SOAP-Logins am 1. Dezember und das Ende des Passwort-Flows am 20. Februar ein und gibt beiden einen Verantwortlichen. Die Integrationsinventur läuft bis Ende November.
2. Sobald Trust die Spring-'27-Termine zeigt, setzt sie den Stichtag für die Sandbox Preview, das Upgrade-Wochenende der Produktionsinstanz und ein Freeze-Fenster darum herum in den Kalender.
3. Eine eigene Developer-Pro-Sandbox außerhalb der Deployment-Kette wird vor dem Stichtag aktualisiert und ist die Preview-Sandbox für SAP-Schnittstellentests und Release Updates. Integration, UAT und Staging bleiben auf dem Release von Produktion.
4. Weil Spring '27 und das Ende des Passwort-Flows in denselben Wochen liegen könnten, schaltet sie den Passwort-Flow schon Ende Januar selbst ab, getrennt vom Salesforce-Upgrade.
5. Die Partner bekommen den Kalender schriftlich. Wer im Freeze liefern will, braucht ihre Freigabe.

Keiner dieser Schritte braucht ein neues Werkzeug. Er braucht jemanden auf Kundenseite, der den Kalender besitzt, und Partner, die vertraglich in ihn hinein planen. Wie solche Regeln in die Partnerverträge kommen, beschreibe ich unter [Partnersteuerung](../../../leistungen/partnersteuerung/); die Datenseite eines Releases behandelt [Kapitel 7](../daten-und-konfiguration/), alle Kapitel finden Sie auf der [Übersichtsseite](../).

Ein Release-Kalender, der Ihre Termine und die von Salesforce an einer Stelle zeigt, macht aus Abschaltungen und Upgrades planbare Arbeit; wenn Sie Ihren Kalender oder Ihren Release-Prozess dafür prüfen lassen möchten, [schreiben Sie mir](#contact).
