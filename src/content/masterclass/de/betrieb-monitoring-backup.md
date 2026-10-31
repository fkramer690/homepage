---
title: "Salesforce Monitoring und Backup nach dem Go-live"
description: "Wie Sie eine Salesforce-Org nach dem Go-live betreiben: Org-Monitoring, Metadaten- und Daten-Backup, technische Schulden, DORA-Kennzahlen und Hotfixes."
lang: de
slug: betrieb-monitoring-backup
course: devops
translationKey: devops-09
chapter: 9
pubDate: 2026-10-28
short: "Betrieb und Monitoring"
summary: "Was nach dem Go-live dazugehört: tägliches Org-Monitoring, getestete Backups, sichtbare technische Schulden, DORA-Kennzahlen und ein Hotfix-Weg."
takeaways:
  - "Ein Metadaten-Backup in Git und ein Daten-Backup sind zwei Dinge. Git sichert keine Datensätze, und ein Daten-Backup kennt keine Konfigurationshistorie."
  - "Ein tägliches Org-Monitoring zeigt Änderungen direkt in Produktion mit Vorher und Nachher. Der Setup Audit Trail nennt nur, wer was geändert hat."
  - "Ein Backup ist erst dann etwas wert, wenn Sie den Restore geübt haben, inklusive neuer Datensatz-IDs, Sharing und Schnittstellen zu SAP."
  - "Ein Hotfix läuft über einen Branch und die Pipeline und wird danach in die laufende Entwicklung zurückgeführt, auch wenn es um ein einzelnes Feld geht."
articles: [sfdx-hardis-introduction, ai-org-assessment-technical-debt, devops-salesforce-enterprise]
faq:
  - q: "Reicht das Git-Repository der Pipeline als Backup?"
    a: "Für Metadaten zum großen Teil, für Daten gar nicht. Das Repository enthält nur, was über die Pipeline kam. Änderungen direkt in Produktion fängt ein tägliches Metadaten-Backup der Org ab, Datensätze brauchen ein eigenes Daten-Backup mit Restore."
  - q: "Welche Backup-Lösung bietet Salesforce selbst an?"
    a: "Salesforce bietet Backup & Recover an, früher Own Recover, mit täglichen Sicherungen von Daten, Dateien und Metadaten, dazu Backup & Recover Next als neue native Lösung. Preise nennt Salesforce nicht öffentlich, sie hängen vom Bedarf ab."
  - q: "Sichert sfdx-hardis auch Daten?"
    a: "Nein. Das Monitoring von sfdx-hardis sichert täglich die Metadaten der Org in Git und führt Prüfungen aus. Für Datensätze brauchen Sie eine Lösung wie Salesforce Backup & Recover, Gearset Data Backup oder Flosum Backup & Archive."
  - q: "Welche DORA-Kennzahlen gibt es aktuell?"
    a: "Fünf: Change Lead Time, Deployment-Häufigkeit und Wiederherstellungszeit nach einem fehlgeschlagenen Deployment für den Durchsatz, Change Fail Rate und Deployment Rework Rate für die Instabilität. Die Rework Rate kam 2024 dazu."
draft: false
---

Nach dem Go-live entscheidet der Betrieb, ob Ihr Release-Prozess hält. Dazu gehören fünf Dinge: ein tägliches Org-Monitoring, das Änderungen direkt in Produktion, Fehler und Limits meldet; ein Metadaten-Backup in Git; ein separates Daten-Backup mit geübtem Restore; eine sichtbare Liste technischer Schulden; und Kennzahlen nach DORA, die zeigen, wo Änderungen warten. Hotfixes laufen über dieselbe Pipeline und werden danach zurückgeführt. Für das Monitoring nutze ich sfdx-hardis als Beispiel, Gearset, Flosum und Salesforce Backup & Recover decken Teile davon kommerziell ab. Alles davon gehört dem Kunden, nicht dem Partner.

## Was gehört nach dem Go-live zum Betrieb?

Die ersten acht Kapitel haben den Weg einer Änderung bis in Produktion beschrieben, zuletzt die [Release-Planung rund um die drei Salesforce-Releases](../release-planung-salesforce-releases/). Mit dem Deployment ist die Arbeit nicht vorbei. In einem Programm mit mehreren Partnern ändern sich jede Woche Konfiguration, Daten und Nutzung der Org, und nicht jede Änderung kommt über die Pipeline.

| Aufgabe | Frage, die sie beantwortet | Beispiel für ein Werkzeug |
|---|---|---|
| Org-Monitoring | Was hat sich in Produktion geändert, was läuft schief? | sfdx-hardis Monitoring, Gearset Change Monitoring |
| Metadaten-Backup | Wie sah die Konfiguration gestern aus? | Git, sfdx-hardis, Gearset, Salesforce Backup & Recover |
| Daten-Backup und Restore | Wie bekomme ich verlorene oder überschriebene Datensätze zurück? | Salesforce Backup & Recover, Gearset, Flosum |
| Technische Schulden | Was in der Org ist ungenutzt, veraltet oder riskant? | sfdx-hardis Monitoring, Code Analyzer |
| DORA-Kennzahlen | Wie schnell und wie stabil liefern wir? | sfdx-hardis DORA-Bericht, Gearset Reporting |
| Incidents und Hotfixes | Wie kommt eine dringende Korrektur sicher in Produktion? | Ihre Pipeline mit Hotfix-Branch |

Für jede Zeile braucht es eine Person, die sie verantwortet. In den meisten Programmen ist das die Release-Rolle aus [Kapitel 2](../release-prozess-eigentum-rollen/), unterstützt von den Partnern.

## Org-Monitoring: was täglich geprüft werden sollte

Salesforce zeichnet Änderungen im Setup im [Setup Audit Trail](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) für mindestens 180 Tage auf. Dort steht, wer wann etwas geändert hat. Wie die Validierungsregel vorher aussah, steht dort nicht. Genau diese Frage kommt aber im Betrieb, etwa wenn Händler im Portal plötzlich keine Garantiefälle mehr anlegen können.

Das [Monitoring von sfdx-hardis](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/) löst das mit einem eigenen Git-Repository. Ein CI-Job zieht jede Nacht alle Metadaten der Org und legt einen Commit an, wenn sich etwas geändert hat. Auf diesem Backup laufen weitere Prüfungen, die meisten täglich, weniger dringende wöchentlich:

- **Täglich:** Apex-Tests, Apex- und Flow-Fehler zur Laufzeit, Org-Limits, Aufrufe veralteter API-Versionen, verdächtige Setup-Aktionen außerhalb des Deployment-Benutzers, Auswertung der Deployments und Validierungen, Codequalität über MegaLinter.
- **Wöchentlich:** Security Health Check, MFA-Konfiguration, Lizenznutzung, aktive Benutzer ohne Login seit sechs Monaten, anstehende Release Updates und das Datum des nächsten Salesforce-Upgrades.

Die Ergebnisse gehen an Slack, Microsoft Teams, E-Mail oder per API an Grafana. Laut Doku ersetzt sfdx-hardis Benutzernamen und E-Mail-Adressen in Berichten und Benachrichtigungen durch stabile Pseudonyme, wenn das Monitoring in CI läuft. Für einen Betriebsrat ist das ein hilfreiches Argument.

```hinweis tipp
Laut Doku heißt ein grüner Job nur, dass er durchgelaufen ist. Rote Tests oder ein Limit kurz vor dem Maximum stehen in den Benachrichtigungen. Rot wird der Job erst, wenn er selbst nicht laufen konnte, etwa wegen einer abgelaufenen Anmeldung. Richten Sie deshalb mindestens einen Kanal ein, den jemand wirklich liest.
```

Ich setze sfdx-hardis seit etwa zwei Jahren in Kundenprojekten ein, und das Monitoring braucht kein CI/CD-Projekt. Sie können es also auch einschalten, bevor die Pipeline steht. Gearset bietet mit dem [Change Monitoring](https://docs.gearset.com/en/articles/604536-automating-org-change-tracking-and-metadata-backup) einen täglichen Snapshot der Metadaten mit Vergleich zum Vortag, Rollback einzelner Änderungen und Benachrichtigung per E-Mail, Slack, Teams oder Chatter. Wer Gearset ohnehin für Deployments nutzt, bekommt das ohne eigenes Repository und mit einer gut gemachten Oberfläche.

Die wichtigste Meldung im Alltag ist die Änderung direkt in Produktion. Ein Admin passt beim Händler-Onboarding schnell ein Permission Set an, ein Partner korrigiert eine Formel im Setup. Beim nächsten Deployment aus dem Repository ist diese Änderung weg. Das Monitoring zeigt sie am nächsten Morgen, und sie wandert als User Story ins Repository zurück.

## Welche Backups braucht eine Salesforce-Org?

Zwei, und sie lösen verschiedene Probleme. Das **Metadaten-Backup** sichert Konfiguration und Code: Objekte, Felder, Flows, Apex, Profile, Permission Sets. Das **Daten-Backup** sichert Datensätze: Kunden, Anlagen, Arbeitsaufträge, Garantiefälle, Dateien.

Ihr Git-Repository ist bereits ein Metadaten-Backup, aber nur für das, was über die Pipeline kam. Das tägliche Backup aus dem Monitoring ergänzt den Rest. sfdx-hardis liest dabei laut [Doku zum Metadaten-Backup](https://sfdx-hardis.cloudity.com/salesforce-monitoring-metadata-backup/) Profile vollständig nach und bildet gelöschte Komponenten als Löschung in der Git-Historie ab. Datensätze sichert sfdx-hardis nicht.

Für Daten gibt es mehrere Wege:

| Lösung | Was gesichert wird | Rhythmus laut Hersteller |
|---|---|---|
| [Salesforce Backup & Recover](https://help.salesforce.com/s/articleView?id=xcloud.backup_recover_o_overview.htm&language=en_US&type=5) | Daten, Dateien, Metadaten, Managed Packages, Sandboxes | täglich, optional Continuous Data Protection |
| [Backup & Recover Next](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_recover.htm&type=5) | Daten, erst eine Vollsicherung, dann inkrementell | täglich |
| [Gearset Data Backup](https://docs.gearset.com/en/articles/8120431-data-backup) | Daten und Metadaten | alle 24 Stunden, stündlich für bis zu 10 Objekte |
| [Flosum Backup & Archive](https://docs.flosum.com/backup-and-archive) | Daten und Metadaten, dazu Archivierung | geplant oder manuell |

Backup & Recover hieß früher Own Recover. Salesforce hat Own im September 2024 [übernommen](https://www.salesforce.com/news/press-releases/2024/09/05/salesforce-signs-definitive-agreement-to-acquire-own-company/), der Abschluss war am 18. November 2024. Auf der [Produktseite](https://www.salesforce.com/platform/data-backup-recovery/) nennt Salesforce eine Standard-Aufbewahrung von 99 Jahren und für Preise nur „varies based on each customer's individual needs“. Gearset speichert Backups laut Doku bei AWS in den Regionen USA, Irland, Australien oder Kanada und bietet laut [Produktseite](https://gearset.com/solutions/backup) Warnungen, wenn ungewöhnlich viele Datensätze angelegt, geändert oder gelöscht werden. Bei Flosum sollten Sie den Speicherort im Gespräch klären.

Welche Lösung passt, hängt weniger an Funktionen als an Ihrem Umfeld: Wo dürfen die Daten liegen, welches Werkzeug nutzen Sie schon für Deployments, wer darf einen Restore auslösen? Diese Entscheidung gehört in die Werkzeugwahl aus [Kapitel 4](../devops-werkzeuge-vergleich/), nicht in eine spätere Nachbestellung.

### Warum Sie den Restore üben sollten

Ein Backup, aus dem nie wiederhergestellt wurde, ist eine Annahme. Die [Salesforce-Hilfe zum Restore mit Salesforce Backup](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_restore_restore_records.htm&type=5) zeigt zwei Punkte, die in der Fertigung wehtun können. Nach einem Restore lässt sich ein Bericht exportieren, der die ursprüngliche Datensatz-ID der neuen zuordnet; wiederhergestellte Datensätze können also neue IDs haben.

```hinweis achtung
Schreibt Ihre SAP-Schnittstelle Auftragsstände über die Salesforce-ID zurück, laufen diese Updates nach einem Restore ins Leere. Externe IDs auf den betroffenen Objekten helfen dagegen.
```

Außerdem können laut [Leitfaden zur Backup-Strategie](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.backup_restore_plan.htm&type=5) wiederhergestellte Share-Objekte veraltete Zugriffsrechte zurückbringen. Prüfen Sie nach einem Restore deshalb, ob Händler nur ihre eigenen Anlagen sehen. Salesforce Help führt Salesforce Backup, Backup & Recover und Backup & Recover Next als getrennte Themen; klären Sie, welches Produkt Sie lizenziert haben, und üben Sie den Restore genau damit.

Ich würde einen Restore einmal pro Quartal in einer Sandbox üben, mit einem Objekt, an dem Prozesse hängen, etwa Assets mit Wartungsplänen. Wie Daten zwischen Orgs bewegt und maskiert werden, beschreibt [Kapitel 7](../daten-und-konfiguration/).

## Technische Schulden sichtbar halten

Technische Schulden wachsen in einer Org mit mehreren Partnern leise: eine Apex-Klasse, die niemand mehr aufruft, ein Permission Set mit zwei Benutzern, ein Feld ohne Beschreibung, Klassen auf alten API-Versionen. Die wöchentlichen Prüfungen von sfdx-hardis finden genau das, unter anderem ungenutzte Apex-Klassen, ungenutzte Custom Labels, inaktive Metadaten, wenig genutzte Permission Sets, fehlende Feldbeschreibungen und Apex mit veralteter API-Version. Die Qualitätsprüfungen vor dem Merge aus [Kapitel 6](../qualitaet-tests-reviews/) verhindern neue Schulden, das Monitoring zeigt die alten.

Eine Liste allein ändert nichts. Ich empfehle einen eigenen Backlog für technische Schulden, aus dem jedes Release einen festen Anteil der Kapazität abarbeitet, und eine klare Zuordnung: Wer eine Komponente gebaut hat, räumt sie auf. Vor einem Partnerwechsel lohnt eine tiefere Analyse. Wie ein LLM dabei das Lesen übernimmt und die Tools die Fakten liefern, beschreibe ich in [KI-Org-Analyse: technische Schulden vor dem Partnerwechsel](../../../blog/ki-org-analyse-technische-schulden/).

## Welche DORA-Kennzahlen sind für Salesforce sinnvoll?

DORA (DevOps Research and Assessment) ist das Forschungsprogramm, aus dem die verbreitetsten Kennzahlen für Softwarelieferung stammen. Laut [dora.dev](https://dora.dev/guides/dora-metrics/) sind es heute fünf:

| Kennzahl | Was sie misst |
|---|---|
| Change Lead Time | Die Zeit, die eine Änderung vom Commit in die Versionsverwaltung bis zum Deployment in Produktion braucht. |
| Deployment-Häufigkeit | Die Zahl der Deployments in einem Zeitraum oder die Zeit zwischen zwei Deployments. |
| Failed Deployment Recovery Time | Die Zeit, bis ein fehlgeschlagenes Deployment behoben ist, das sofortiges Eingreifen verlangt hat. |
| Change Fail Rate | Der Anteil der Deployments, die sofortiges Eingreifen erfordern, etwa einen Rollback oder einen Hotfix. |
| Deployment Rework Rate | Der Anteil ungeplanter Deployments, die wegen eines Incidents in Produktion nötig wurden. |

Die ersten drei messen den Durchsatz, die letzten zwei die Instabilität. Laut der [Geschichte der Kennzahlen](https://dora.dev/guides/dora-metrics/history/) wurde die frühere MTTR 2023 umbenannt und neu definiert, die Rework Rate kam 2024 dazu. Viele Werkzeuge zeigen noch die vier alten Kennzahlen.

sfdx-hardis berechnet mit dem [DORA-Bericht](https://sfdx-hardis.cloudity.com/hardis/doc/salesforce-devops-dora-report/) alle fünf pro Stufe der Pipeline, aus den Deployment-Jobs und Pull Requests Ihrer Git-Plattform. Deployments außerhalb der Pipeline, etwa per Change Set, zählen nicht. Für einen Auftraggeber am nützlichsten finde ich die Auswertung, wie lange Änderungen auf jeder Stufe warten. Liegen User Stories drei Wochen in UAT, weil der Service-Fachbereich keine Zeit zum Testen hat, sehen Sie das dort. Gearset zeigt in seinem [DevOps-Performance-Dashboard](https://docs.gearset.com/en/articles/11560575-measuring-your-devops-performance) die vier klassischen Kennzahlen, mit der Change Failure Rate auf Basis von Fehlern, die Ihr Team meldet. Es setzt eine Lizenz der Automation Platform in der Stufe Teams oder Enterprise voraus.

Zwei Regeln würde ich festlegen. Erstens: Vergleichen Sie Zahlen nur innerhalb eines Werkzeugs. sfdx-hardis misst die Lead Time ab Erstellung des Pull Requests, DORA ab dem Commit. Zweitens: Messen Sie den Prozess, nicht die Partner. Eine Rangliste führt dazu, dass Teams Änderungen klein schneiden, um gut auszusehen, und Fehler anders etikettieren.

## Incidents und Hotfixes im Betrieb

Wenn in Produktion etwas kaputt ist, ist die erste Frage: Daten oder Metadaten? Davon hängt der Weg ab.

```schritte
Erkennen
  Das Monitoring meldet Apex- oder Flow-Fehler, oder Anwender melden sich. Gearset kann ungewöhnliche Datenänderungen melden.
Einordnen
  Ist Konfiguration oder Code falsch, geht es über die Pipeline. Sind Datensätze verloren oder überschrieben, geht es über das Daten-Backup.
Korrigieren
  Metadaten über einen Hotfix-Branch mit Review und Validierung. Daten über einen gezielten Restore der betroffenen Felder und Datensätze.
Zurückführen
  Der Hotfix kommt zurück in die Entwicklungs-Branches.
Nachbereiten
  Ursache, Dauer und ob ein Deployment beteiligt war, festhalten. Daraus speisen sich Change Fail Rate und Rework Rate.
```

sfdx-hardis beschreibt das als zwei Ströme: RUN für schnelle Korrekturen, BUILD für die nächste Version. Ein [Hotfix](https://sfdx-hardis.cloudity.com/salesforce-devops-hotfixes/) geht über einen Branch nach Preprod und Produktion, danach folgt der Retrofit in die BUILD-Branches. Die Doku formuliert es deutlich: Eine Korrektur von Hand im Setup ist nie vorgesehen, auch nicht um zwei Uhr nachts, weil das nächste Deployment sie überschreibt. Den Hotfix-Weg in der Branch-Strategie beschreibt [Kapitel 3](../umgebungen-und-branching/), die Validierung in der Pipeline [Kapitel 5](../pipeline-aufbauen/).

Angenommen, ein Maschinenbauer betreibt Field Service und ein Händlerportal. Am Montagmorgen meldet das Monitoring Flow-Fehler beim Anlegen von Arbeitsaufträgen. Der Audit Trail zeigt eine Änderung am Freitag im Setup, das Metadaten-Backup zeigt die geänderte Entscheidung im Flow. Gleichzeitig fällt auf, dass ein Datenimport am Wochenende das Garantieende auf tausenden Anlagen überschrieben hat. Der Flow wird per Hotfix korrigiert und zurückgeführt. Das Garantieende kommt per Restore genau dieses Feldes aus dem Backup vom Freitag zurück, ohne die neuen Arbeitsaufträge vom Montag anzufassen.

## Wem gehört der Betrieb?

Monitoring-Repository, Backup-Lösung, Benachrichtigungskanäle und Kennzahlen gehören dem Kunden, aus denselben Gründen wie Repository und Pipeline: Sie sollen einen Partnerwechsel überleben. Warum ich das so sehe, steht in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/). Die Partner bekommen Zugriff auf die Kanäle und die Pflicht, auf Meldungen zu ihren Komponenten in einer vereinbarten Zeit zu reagieren. Das gehört in den Vertrag, siehe [Partnersteuerung](../../../leistungen/partnersteuerung/).

Wie Monitoring und Backup in den gesamten Prozess passen, zeigen [warum DevOps über Salesforce-Großprojekte entscheidet](../../../blog/warum-devops-salesforce-enterprise-projekte/) und die [Einführung in sfdx-hardis](../../../blog/sfdx-hardis-einfuehrung-salesforce-devops/). In welcher Reihenfolge Sie all das einführen, beschreibt das letzte Kapitel, [Einführung und Fahrplan](../einfuehrung-fahrplan/). Mein Rat für den Start: Monitoring und Daten-Backup zuerst, denn beides können Sie einschalten, bevor die Pipeline fertig ist. Wie ich Sie dabei unterstütze, steht unter [DevOps und Release-Management](../../../leistungen/devops-und-release-management/).
