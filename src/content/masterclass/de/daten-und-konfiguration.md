---
title: "Daten und Konfiguration in der Salesforce-Pipeline"
description: "Wie Field-Service-Regeln, Custom Settings und Preisbücher mit SFDMU, Gearset oder Copado durch die Pipeline kommen und Sandbox-Daten maskiert bleiben."
lang: de
slug: daten-und-konfiguration
course: devops
translationKey: devops-07
chapter: 7
short: "Daten und Konfiguration"
summary: "Welche Konfigurations- und Referenzdaten keine Metadaten sind, wie sie durch die Pipeline kommen und wie Sandboxes maskiert bleiben."
takeaways:
  - "Field-Service-Planungsrichtlinien, Arbeitsregeln, Betriebszeiten und Custom-Settings-Datensätze sind Daten; ein Metadaten-Deployment nimmt sie nicht mit."
  - "Konfigurationsdaten gehören ins Repository und laufen nach dem Metadaten-Deployment durch dieselbe Pipeline, mit externen IDs statt Salesforce-IDs."
  - "SFDMU ist ein Open-Source-Plugin der Salesforce CLI für Datenmigrationen; sfdx-hardis ruft es als Deployment Action auf, Gearset, Copado und Flosum haben eigene Datenmodule."
  - "Stammdaten wie Produkte und Preise aus SAP kommen über die Schnittstelle oder als Seed-Datensatz, nie per Deployment aus einer Sandbox in die Produktion."
  - "Nach jedem Refresh einer Partial- oder Full-Sandbox läuft die Maskierung, bevor Partner Zugang bekommen; Data Mask & Seed von Salesforce ist dafür eine Option."
articles: [sandbox-data-ai-coding-agents, sfdx-hardis-introduction, sfdx-hardis-training, client-owned-devops-tools]
faq:
  - q: "Warum kommen Custom-Settings-Datensätze nicht mit dem Deployment mit?"
    a: "Laut Trailhead lassen sich Datensätze von Custom Settings weder per Paket noch per Metadata API oder Change Set deployen. Die Definition kommt mit, die Werte nicht. Datensätze von Custom Metadata Types dagegen sind Metadaten und reisen mit."
  - q: "Brauche ich für Konfigurationsdaten ein kommerzielles Werkzeug?"
    a: "Nein. SFDMU ist Open Source und läuft als Plugin der Salesforce CLI, sfdx-hardis bindet es als Deployment Action ein. Gearset, Copado und Flosum bieten dafür eine Oberfläche mit Abhängigkeitsanalyse, was Admins ohne Kommandozeile hilft."
  - q: "Kann ich ein Datendeployment zurückrollen?"
    a: "In der Regel nicht. Gearset schreibt in seiner Dokumentation ausdrücklich, dass Datendeployments nicht zurückgerollt werden können. Planen Sie deshalb ein Backup der betroffenen Objekte vor dem Release ein."
  - q: "Läuft Salesforce Data Mask automatisch nach einem Sandbox-Refresh?"
    a: "Laut Trailhead übernimmt die Sandbox beim Anlegen oder Refresh die Maskierungskonfiguration, den Lauf starten Sie aber selbst im Data-Mask-Tab der Sandbox. Die Produktseite von Data Mask & Seed nennt zusätzlich geplante Jobs täglich, wöchentlich oder monatlich."
  - q: "Was kostet Data Mask & Seed?"
    a: "Die Produktseite von Salesforce nennt keinen Preis, sie bietet eine 30-tägige Testversion und ein Gespräch mit dem Vertrieb an. Fragen Sie Ihren Account Executive nach einem Angebot."
draft: false
---

Daten und Konfiguration, die keine Metadaten sind, fallen in vielen Salesforce-Pipelines durch: Planungsrichtlinien und Arbeitsregeln in Field Service, Betriebszeiten, Custom-Settings-Datensätze, Produkte und Preisbücher. Ein Metadaten-Deployment nimmt sie nicht mit, also stehen sie als manueller Schritt in einer Release-Tabelle. Meine Regel: Konfigurationsdaten liegen im Repository und laufen nach dem Metadaten-Deployment durch dieselbe Pipeline, mit SFDMU oder dem Datenmodul eines kommerziellen Werkzeugs. Stammdaten aus SAP kommen über die Schnittstelle, Testdaten als Seed-Datensatz. Kundendaten in Partial- und Full-Sandboxes werden nach jedem Refresh maskiert, zum Beispiel mit Data Mask & Seed von Salesforce.

## Welche Daten gehören zur Konfiguration, und welche nicht?

[Kapitel 6](../qualitaet-tests-reviews/) hat beschrieben, wie Metadaten geprüft in Produktion kommen. Eine Salesforce-Org lebt aber auch von Datensätzen, die Verhalten steuern. Ich teile sie in vier Gruppen, weil jede Gruppe einen anderen Weg braucht:

| Gruppe | Beispiele in der Fertigung | Quelle der Wahrheit | Weg in die Orgs |
|---|---|---|---|
| Konfigurationsdaten | Planungsrichtlinien, Arbeitsregeln, Serviceziele, Betriebszeiten, Custom-Settings-Werte, Zuordnungstabellen in eigenen Objekten | Repository | Pipeline, nach dem Metadaten-Deployment |
| Stammdaten | Produkte, Preisbücher, Materialnummern, Händlerstamm | SAP oder ein anderes führendes System | Schnittstelle in Produktion, Seed-Datensatz in Sandboxes |
| Testdaten | 30 Händler, 200 Anlagen, Sonderfälle aus dem Service | Repository | Seed in Scratch Orgs und Developer-Sandboxes |
| Kundendaten | Fälle, Arbeitsaufträge, Verträge, Garantieanträge | Produktion | Kopie in Partial und Full, danach maskiert |

Die Field-Service-Beispiele sind keine Theorie. Im Trailhead-Modul zu [Planungsrichtlinien](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies) legen Sie Arbeitsregeln über eine eigene Registerkarte an und wählen dabei einen Datensatztyp; die Richtlinie bündelt Arbeitsregeln und Serviceziele für die Planungs-Engine. Betriebszeiten sind laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_operatinghours.htm) das Objekt `OperatingHours`, das festlegt, wann ein Servicegebiet, eine Ressource oder ein Account für Arbeit verfügbar ist. Ändert jemand in der Integrationssandbox eine Arbeitsregel, damit Techniker nur Anlagen mit passender Qualifikation bekommen, ist das ein Datensatz. Kein Metadaten-Deployment trägt ihn weiter.

Die wichtigste Grenze verläuft zwischen Konfigurations- und Stammdaten. Ein Preisbuch ist laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_pricebook2.htm) die Liste der Produkte, die eine Org verkauft. Kommt diese Liste bei Ihnen aus SAP, wäre ein Deployment aus der Sandbox in die Produktion ein zweiter, konkurrierender Weg. Ich lasse Stammdaten deshalb nie durch die Release-Pipeline in die Produktion laufen.

## Custom Metadata Types, Custom Settings und die Grenze zum Deployment

Für neue Konfiguration gibt es eine einfache Entscheidung, die viel Datenarbeit spart. Trailhead beschreibt den Unterschied im Modul zu [Custom Metadata Types](https://trailhead.salesforce.com/content/learn/modules/custom_metadata_types_dec/cmt_overview) deutlich: Datensätze von Custom Metadata Types lassen sich paketieren und über Metadata API oder Change Sets deployen. Datensätze von Custom Settings lassen sich auf keinem dieser Wege deployen.

Für einen Hersteller heißt das:

- **Custom Metadata Types** für Konfiguration, die im Repository versioniert und mit dem Release ausgerollt wird: Zuordnung von Produktgruppen zu Service-Warteschlangen, Schwellenwerte für Garantieprüfungen, Endpunkt-Schalter für Schnittstellen. Sie laufen im normalen Pull Request mit Review. Bei Delta-Deployments nimmt sfdx-hardis laut [Dokumentation](https://sfdx-hardis.cloudity.com/salesforce-devops-config-delta-deployment/) alle Datensätze eines Custom Metadata Types mit, sobald einer davon geändert wurde.
- **Custom Settings** nur dort, wo es fachlich nötig ist, etwa für Werte pro Benutzer oder Profil. Ihre Datensätze brauchen dann einen Datenschritt in der Pipeline.
- **Eigene Objekte und Standardobjekte als Konfiguration**, etwa die Field-Service-Objekte oder Preisregeln in einem Konfigurator. Hier haben Sie keine Wahl, sie sind Daten.

Bei bestehenden Orgs würde ich Custom Settings nicht pauschal umbauen. Ich würde aber in die Partnerregeln schreiben, dass neue Konfiguration als Custom Metadata Type entsteht, sofern es keinen fachlichen Grund dagegen gibt. Wer diese Regeln festlegt und durchsetzt, beschreibt [Kapitel 2](../release-prozess-eigentum-rollen/).

## Wie kommen Konfigurationsdaten durch die Pipeline?

Drei Dinge machen einen Datenschritt wiederholbar.

**Externe IDs statt Salesforce-IDs.** Eine Arbeitsregel hat in jeder Org eine andere Salesforce-ID. Ein Datenschritt muss den Datensatz an einem fachlichen Schlüssel erkennen, sonst legt er beim zweiten Lauf Dubletten an. Ich gebe jedem Konfigurationsobjekt ein Feld als externe ID, etwa einen sprechenden Code wie `WR_SKILL_HYDRAULIK`.

**Die Daten liegen im Repository.** Dann gilt für sie, was für Code gilt: Pull Request, Review, Historie. Ein geänderter Schwellenwert ist im Diff sichtbar, und niemand muss raten, wer ihn wann geändert hat.

**Erst Metadaten, dann Daten.** Ein Datensatz kann erst geladen werden, wenn das Feld existiert, in das er schreibt. Der Datenschritt läuft deshalb nach dem Metadaten-Deployment und nur, wenn dieses erfolgreich war.

### SFDMU und sfdx-hardis

[SFDMU](https://help.sfdmu.com/) ist ein Open-Source-Plugin der Salesforce CLI für Datenmigrationen, laut [npm-Eintrag](https://www.npmjs.com/package/sfdmu) unter BSD-3-Lizenz. Es kopiert Datensätze direkt von Org zu Org oder aus CSV-Dateien, beherrscht Insert, Upsert, Update und Delete, verarbeitet mehrere verknüpfte Objekte in einem Lauf und wird über eine einzige Datei `export.json` konfiguriert. Dazu kommen Feldzuordnungen, Anonymisierung und zusammengesetzte externe ID-Schlüssel. Die Verarbeitung läuft lokal oder auf dem Pipeline-Runner, ohne Cloud-Dienst dazwischen.

sfdx-hardis bindet SFDMU über [Deployment Actions](https://sfdx-hardis.cloudity.com/salesforce-devops-work-on-user-story-deployment-actions/) ein. Eine Aktion vom Typ `data` lädt Datensätze aus einem SFDMU-Arbeitsbereich des Projekts in die Ziel-Org. Die Aktionen stehen in `config/.sfdx-hardis.yml` oder in einer Datei pro Pull Request, laufen standardmäßig einmal pro Org und werden nach einem fehlgeschlagenen Metadaten-Deployment nicht ausgeführt. Eine gescheiterte Aktion läuft beim nächsten Deployment mit demselben Pull Request erneut. Wie Deployment Actions in den Pull-Request-Fluss passen, steht in [Kapitel 5](../pipeline-aufbauen/). In der kostenlosen sfdx-hardis-Schulung habe ich Datenladungen mit SFDMU genau so in der Pipeline laufen lassen; meine Eindrücke stehen in [was ich aus dem sfdx-hardis-Training mitgenommen habe](../../../blog/sfdx-hardis-kostenloses-devops-training/), eine Einführung in [sfdx-hardis: Open-Source-DevOps erklärt](../../../blog/sfdx-hardis-einfuehrung-salesforce-devops/).

Für kleine Seed-Datensätze reicht oft die Salesforce CLI selbst. Salesforce empfiehlt die [data-tree-Befehle](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-test-data.html) für kleine Mengen, etwa unter 3.000 Datensätzen, und die data-bulk-Befehle für große Volumen.

## Was leisten Gearset, Copado und Flosum bei Daten?

Die kommerziellen Plattformen haben eigene Datenmodule mit Oberfläche. Laut Dokumentation der Anbieter:

| Werkzeug | Was es bei Daten kann | Zu beachten |
|---|---|---|
| [Gearset Data Deployments](https://docs.gearset.com/en/articles/2529745-running-your-first-data-deployment) | Abhängigkeiten über bis zu 15 Ebenen, Abgleich über externe ID, Maskierung mit Ersatzwerten, Flows, Trigger und Validierungsregeln vorübergehend abschaltbar, [Vorlagen](https://gearset.com/blog/data-deployment-templates/), [CPQ- und Vlocity-Konfiguration](https://gearset.com/product/data-deploy) | Teil des Add-ons „Sandbox seeding & compliance“, nicht in der Deployment-Lizenz; laut [Gearset](https://docs.gearset.com/en/articles/1376661-data-deployments-with-gearset) kein Rollback, kein Löschen, Produktion standardmäßig gesperrt |
| [Copado Data Deploy](https://www.copado.com/platform/deliver/) | Datenvorlagen für Konfigurationsdatensätze mit komplexen Beziehungen, fertige Vorlagen aus der DevOps Exchange, Maskierung sensibler Werte | in Copado Essentials laut [Dokumentation](https://docs.essentials.copado.com/en/articles/6325474-how-to-deploy-relational-data-with-data-deploy-essentials) eine Option von Essentials Plus mit Lizenz pro Benutzer |
| [Flosum Data Migrator](https://docs.flosum.com/data-migrator) | Vorlagen mit Objekten, Feldern und Filtern, Beziehungen bleiben erhalten, Maskierung, Trigger abschaltbar | Fehlerbericht pro Datensatz |

Was diese Werkzeuge gut machen: Ein Admin sieht vor dem Lauf, welche verknüpften Datensätze mitgehen, und muss keine `export.json` schreiben. Für CPQ-Konfiguration mit vielen verschachtelten Objekten ist das ein echter Vorteil. Welches Werkzeug insgesamt zu Ihrem Programm passt, entscheidet [Kapitel 4](../devops-werkzeuge-vergleich/); für Daten gilt dieselbe Regel wie für Metadaten. Das Werkzeug läuft auf Ihren Namen, und die Datenvorlagen liegen bei Ihnen, nicht im Konto eines Partners. Warum, steht in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

Ein Punkt gilt für alle Werkzeuge. Gearset schreibt offen, dass ein abgebrochenes Datendeployment Daten nur teilweise einspielen kann. Sichern Sie die betroffenen Objekte vor jedem Release mit Datenschritt; Backup und Wiederherstellung behandelt [Kapitel 9](../betrieb-monitoring-backup/).

## Wie bleiben Kundendaten in Sandboxes geschützt?

Partial- und Full-Sandboxes enthalten nach jedem Refresh echte Kundendaten. Welche Umgebung welche Daten tragen darf, habe ich in [Kapitel 3](../umgebungen-und-branching/) festgelegt; welche Felder bei einem Hersteller heikel sind und was Coding-Agenten lesen dürfen, steht in [Sandbox-Kundendaten: was KI-Coding-Agenten lesen dürfen](../../../blog/sandbox-kundendaten-ki-coding-agenten/).

Salesforce verkauft dafür [Data Mask & Seed](https://www.salesforce.com/de/platform/data-masking/). Laut Trailhead ist [Data Mask](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/get-to-know-salesforce-data-mask) ein Managed Package, das Sie in der Produktion installieren und das Daten in Full- und Partial-Sandboxes maskiert; die Produktion bleibt unverändert, und maskierte Daten lassen sich nicht zurückholen. Pro Feld wählen Sie laut [Konfigurationsmodul](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/install-and-configure-salesforce-data-mask) Zufallszeichen oder Zufallszahlen, einen Ersatz aus einer Bibliothek wie Namen oder Adressen, oder Löschen. Checkbox-, Lookup- und Picklist-Felder werden nicht unterstützt. Die Konfiguration kommt beim Refresh mit, den Lauf starten Sie in der Sandbox.

Der Seed-Teil füllt laut Produktseite Developer-, Developer-Pro-, Partial- und Full-Sandboxes mit Datensätzen, die Seed-Vorlagen filtern. Masken- und Seeding-Jobs lassen sich täglich, wöchentlich oder monatlich planen, und das Seeding umgeht Automatisierungen. Einen Preis nennt die Seite nicht. Gearset, Copado und Flosum maskieren beim Datentransport ebenfalls, und SFDMU kann anonymisieren. Der Unterschied: Data Mask bearbeitet eine vorhandene Sandbox-Kopie, die anderen maskieren Daten, die sie gerade bewegen.

Meine Reihenfolge nach jedem Refresh einer Partial- oder Full-Sandbox:

1. Maskierung starten und das Ausführungsprotokoll prüfen.
2. Neue Felder seit dem letzten Lauf in die Maskierung aufnehmen; diese Prüfung steht in der Release-Checkliste.
3. E-Mail-Felder in Kontakten auf der Maskierungsliste haben, damit keine Händlerin eine Testbenachrichtigung bekommt.
4. Konfigurationsdaten aus dem Repository einspielen, falls die Sandbox einen neueren Stand braucht als die Produktion.
5. Erst danach Zugänge für Partner und Fachbereich freigeben.

Für Coding-Agenten gilt eine strengere Regel, die [Kapitel 8 der KI-Masterclass](../../ki-salesforce/best-practices-ki-code/) beschreibt: Sie arbeiten in Scratch Orgs und Developer-Sandboxes mit Seed-Daten, nie in einer Full Copy.

## Ein typisches Szenario, als Annahme: Field Service für den Wartungsservice

Nehmen wir einen Maschinenbauer, der Field Service für Wartung und Reparatur beim Kunden einführt. Zwei Partner arbeiten auf derselben Org, SAP liefert Produkte, Materialnummern und Preise. Alle Zahlen sind Annahmen.

Ohne Datenschritt in der Pipeline sieht der Go-live so aus: Die Metadaten laufen sauber durch, dann pflegt ein Berater zwei Tage lang 6 Planungsrichtlinien, 25 Arbeitsregeln, 40 Betriebszeiten und 15 Servicegebiete von Hand in der Produktion nach, mit einer Tabelle aus der UAT-Sandbox als Vorlage. Drei Regeln stimmen danach nicht mit dem getesteten Stand überein, was erst auffällt, als Techniker Aufträge außerhalb ihres Gebiets bekommen.

Mit Datenschritt sieht derselbe Go-live anders aus:

- Jedes Konfigurationsobjekt hat ein Feld als externe ID, die Datensätze liegen als SFDMU-Arbeitsbereich im Repository des Herstellers.
- Änderungen an Arbeitsregeln laufen als Pull Request mit Review durch den Service-Prozessverantwortlichen.
- Nach dem Metadaten-Deployment lädt eine Deployment Action die Konfiguration in Integration, UAT, Staging und Produktion, jedes Mal mit demselben Stand.
- Produkte und Preisbücher kommen in der Produktion aus SAP; Sandboxes bekommen einen Seed-Datensatz mit 300 Teilen und zwei Preisbüchern.
- Die UAT-Sandbox als Partial Copy wird nach jedem Refresh maskiert, bevor der Partner Zugang bekommt.

Wäre das Programm auf Gearset, Copado oder Flosum, sähe die Struktur gleich aus, nur mit einer Datenvorlage statt `export.json`. Entscheidend ist, dass kein manueller Datenschritt mehr im Release-Plan steht.

## Was gehört in die Partnerregeln?

Fünf Regeln würde ich in jeden Vertrag schreiben:

1. Konfigurationsdaten werden nie direkt in einer Stufen-Org gepflegt, nur im Repository.
2. Jedes Konfigurationsobjekt hat eine externe ID.
3. Neue Konfiguration entsteht als Custom Metadata Type, wenn kein fachlicher Grund dagegen spricht.
4. Stammdaten aus SAP laufen nie durch die Release-Pipeline in die Produktion.
5. Kein Partner bekommt Zugang zu einer Sandbox, bevor die Maskierung nach dem Refresh gelaufen ist.

Wann Sie Datenschritte im Release-Kalender einplanen und wie die drei Salesforce-Releases pro Jahr hineinspielen, behandelt [Kapitel 8](../release-planung-salesforce-releases/). Datenschritte und Sandbox-Stufen gehören zu meiner Arbeit in [DevOps und Release-Management](../../../leistungen/devops-und-release-management/).

Konfigurationsdaten verdienen denselben Weg wie Code: Repository, Review, Pipeline, und Kundendaten bleiben maskiert. Wenn Sie den manuellen Datenschritt aus Ihrem Release-Plan streichen möchten, [schreiben Sie mir](#contact).
