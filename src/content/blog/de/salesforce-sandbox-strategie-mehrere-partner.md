---
title: "Salesforce-Sandbox-Strategie für mehrere Partner"
description: "Welche Sandboxes ein Salesforce-Programm mit mehreren Partnern braucht, wem sie gehören, welche Daten hineingehören und wie oft Sie sie aktualisieren."
pubDate: 2026-10-29
lang: de
slug: salesforce-sandbox-strategie-mehrere-partner
translationKey: sandbox-strategy-multiple-partners
topic: devops
categories: [devops, architecture]
contactBrief: devops
tags: [Sandbox-Strategie, DevOps, Release-Management, Partnersteuerung]
takeaways:
  - "Ein Refresh kopiert die Endpunkte aus der Produktion mit. Ohne Post-Refresh-Skript spricht die Full Copy danach mit dem produktiven ERP."
  - "Jeder Entwickler bekommt eine eigene Umgebung, dazu kommen eine gemeinsame Integration, eine Partial Copy für ERP-Tests und eine Full Copy für UAT."
  - "Ein Refresh überschreibt alles in der Sandbox. Was nicht in Git liegt, ist danach weg, deshalb führt nur die Pipeline Änderungen durch die Umgebungen."
  - "Alle Sandboxes gehören dem Kunden und stehen in einer Liste mit Zweck, Verantwortlichem und Refresh-Termin."
faq:
  - q: "Wie viele Sandboxes braucht ein Salesforce-Programm?"
    a: "Eine Entwicklungsumgebung pro Entwickler, eine gemeinsame Integrations-Sandbox, eine Partial Copy für Schnittstellentests und eine Full Copy für UAT. Mehr Umgebungen lohnen sich nur, wenn jede einen eigenen Zweck und einen Verantwortlichen hat."
  - q: "Wie oft lässt sich eine Full-Copy-Sandbox aktualisieren?"
    a: "Salesforce erlaubt einen Refresh einer Full Copy alle 29 Tage, einer Partial Copy alle 5 Tage und von Developer-Sandboxes täglich."
  - q: "Sollte jeder Partner eigene Sandboxes haben?"
    a: "Jeder Entwickler braucht eine eigene Entwicklungsumgebung, aber alle Sandboxes sollten in der Produktions-Org des Kunden hängen und in einer gemeinsamen Liste stehen. Eigene Integrationsumgebungen pro Partner verschieben die Konflikte nur nach hinten."
  - q: "Was muss nach einem Sandbox-Refresh passieren?"
    a: "Schnittstellen auf Testsysteme umstellen, E-Mail-Versand prüfen, Testnutzer anlegen, personenbezogene Daten maskieren und Referenzdaten laden. Diese Schritte gehören in ein Skript, nicht in eine Checkliste im Kopf einer Person."
draft: false
---

Eine Salesforce-Sandbox-Strategie legt für jede Testumgebung fest, wozu sie dient, wer darin arbeitet, welche Daten sie enthält und wann sie aktualisiert wird. Arbeiten mehrere Umsetzungspartner an einer Org, empfehle ich eine feste Kette: eine eigene Entwicklungsumgebung pro Entwickler, eine gemeinsame Integrations-Sandbox, eine Partial Copy für Tests mit dem ERP und eine Full Copy für UAT und die Generalprobe vor dem Release. Änderungen wandern nur über die Pipeline durch diese Kette. Ohne diese Regeln baut jeder Partner seine eigene Welt, und die Unterschiede zeigen sich erst in Produktion.

## Welche Sandbox-Typen gibt es in Salesforce?

Eine Sandbox ist eine Kopie der Produktions-Org für Entwicklung und Tests. Salesforce unterscheidet vier Typen, die sich vor allem in den Daten und im Refresh-Intervall unterscheiden ([Salesforce: What is a Salesforce Sandbox?](https://www.salesforce.com/platform/what-is-salesforce-sandbox/)):

| Typ | Inhalt | Speicher Daten / Dateien | Refresh frühestens |
|---|---|---|---|
| Developer | nur Metadaten | 200 MB / 5 MB | täglich |
| Developer Pro | nur Metadaten | 1 GB / 1 GB | täglich |
| Partial Copy | Metadaten und eine Stichprobe nach Vorlage | 5 GB / 5 GB | alle 5 Tage |
| Full Copy | Metadaten, alle Daten und Dateien | wie Produktion | alle 29 Tage |

Dazu kommen Scratch Orgs: kurzlebige Orgs, die aus einer Konfigurationsdatei im Repository entstehen und nach Tagen wieder verschwinden. Sie eignen sich für Entwickler, deren Arbeit vollständig in Git liegt.

Wie viele Sandboxes welcher Art im Vertrag enthalten sind, hängt von Edition und Vertrag ab. Full Copies sind fast immer knapp. Das ist der erste Grund, warum es eine Strategie braucht: Die teuerste Umgebung darf nicht einem Partner gehören, der sie für seine Entwicklung nutzt.

## Mit mehreren Partnern laufen Sandboxes auseinander

In einer kleinen Org mit einem Admin gibt es selten Ärger mit Sandboxes. Mit mehreren Partnern sehe ich immer wieder dieselben Ursachen:

- **Änderungen direkt in der Sandbox.** Ein Entwickler passt in der UAT-Sandbox ein Feld an, damit der Test durchläuft. Im Repository steht die Änderung nicht, und das nächste Deployment überschreibt sie oder die Produktion bekommt sie nie.
- **Jeder Partner hat seine eigene Integrationsumgebung.** Jeder testet gegen seinen Stand, nicht gegen den Stand der anderen. Konflikte zwischen zwei Streams fallen erst auf, wenn beide in UAT ankommen.
- **Niemand weiß, wofür eine Sandbox da ist.** Nach zwei Jahren hat eine Org zwanzig Sandboxes mit Namen wie `test2` und `partnerneu`, und keiner traut sich, eine zu löschen.
- **Refresh ohne Plan.** Jemand aktualisiert die Full Copy, und die Schnittstelle zeigt danach auf das produktive ERP, weil die Endpunkte aus der Produktion mitkopiert wurden.

Die Symptome sind immer gleich: Ein Feature läuft in UAT und bricht in Produktion. Mehr zu den Ursachen steht in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).

## Wie sieht eine Sandbox-Strategie für mehrere Partner aus?

Die Strategie folgt dem Weg einer Änderung. Jede Stufe hat einen Zweck und einen Verantwortlichen.

1. **Entwicklung.** Jeder Entwickler arbeitet in einer eigenen Developer-Sandbox oder Scratch Org. Testdaten kommen als Seed-Datensatz aus dem Repository. Diese Umgebung darf kaputtgehen.
2. **Integration.** Eine gemeinsame Developer-Pro-Sandbox, in die jeder Pull Request nach dem Review gemergt und deployt wird. Hier treffen die Streams zum ersten Mal aufeinander. Partner haben Leserechte, aber kein Recht, dort direkt etwas zu ändern.
3. **Schnittstellentest.** Eine Partial Copy, verbunden mit dem Testsystem des ERP. Die Stichprobe kommt aus einer Sandbox-Vorlage, die festlegt, welche Objekte kopiert werden. Personenbezogene Daten werden maskiert.
4. **UAT und Generalprobe.** Die Full Copy. Fachbereiche testen hier mit echten Datenmengen, und das Release wird einmal vollständig durchgespielt, inklusive Post-Deployment-Schritten.
5. **Hotfix.** Eine Developer-Pro-Sandbox mit dem Stand der Produktion, damit ein dringender Fehler behoben werden kann, ohne halbfertige Features mitzunehmen.

```hinweis achtung
Ein Refresh ersetzt die Sandbox vollständig durch eine neue Kopie der Produktion. Alles, was nur in der Sandbox gebaut wurde, ist danach weg. Deshalb gilt: Jede Änderung liegt zuerst in Git und kommt über die Pipeline in die Sandbox.
```

Mit einer Pipeline auf der Git-Plattform des Kunden ist jederzeit sichtbar, welcher Stand in welcher Umgebung liegt. Das ist der Teil, den ich unter [DevOps und Release-Management](../../leistungen/devops-und-release-management/) aufsetze.

## Die Sandboxes gehören dem Kunden

Alle Sandboxes hängen an der Produktions-Org, also technisch immer am Kunden. In der Praxis entscheidet aber oft ein Partner, wer Zugang bekommt und wann aktualisiert wird. Das halte ich für einen Fehler, aus demselben Grund, aus dem [Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/): Wer die Umgebungen steuert, bestimmt den Takt aller anderen.

Ich führe deshalb eine einfache Liste, die der Kunde besitzt:

- Name, Typ und Zweck jeder Sandbox
- Verantwortlicher auf Kundenseite
- Welche Teams Zugang haben und mit welchen Rechten
- Mit welchen Fremdsystemen sie verbunden ist
- Nächster geplanter Refresh

Eine Sandbox ohne Eintrag in dieser Liste wird nach Ankündigung gelöscht. Das klingt streng, spart aber Lizenzen und verhindert, dass vergessene Umgebungen mit Kundendaten herumstehen. Was Coding-Agenten in solchen Umgebungen lesen dürfen, beschreibe ich in [Sandbox-Kundendaten und KI-Coding-Agenten](../sandbox-kundendaten-ki-coding-agenten/).

## Wie oft sollten Sie Sandboxes aktualisieren?

Der Refresh-Kalender folgt dem Release-Kalender. Ich empfehle diesen Rhythmus:

- **Full Copy** nach jedem Produktions-Release, damit UAT mit dem Stand testet, den die Anwender haben. Bei einem monatlichen Release passt das zum Intervall von 29 Tagen.
- **Partial Copy** vor jeder größeren Testphase der Schnittstellen.
- **Integration** nur, wenn sie zu weit von der Produktion abweicht. Weil alles aus Git kommt, lässt sie sich jederzeit neu befüllen.
- **Developer-Sandboxes** so oft, wie der Entwickler es braucht. Scratch Orgs entstehen ohnehin für jede Aufgabe neu.

Nach jedem Refresh laufen dieselben Schritte: Endpunkte der Schnittstellen auf das Test-ERP umstellen, E-Mail-Versand auf „nur Systemmails“ prüfen, Testnutzer anlegen, Daten maskieren und Referenzdaten laden. Salesforce erlaubt dafür eine Apex-Klasse, die nach dem Erstellen oder Aktualisieren einer Sandbox automatisch läuft. Referenzdaten lassen sich mit SFDMU aus dem Repository laden, einem Open-Source-Plugin der Salesforce CLI. Stehen diese Schritte nur auf einer Checkliste, hängt jeder Refresh an der einen Person, die sie kennt.

```pro-contra
pro: Feste Kette mit einer gemeinsamen Integration
- Konflikte zwischen Streams fallen früh auf
- UAT testet den Stand, der in Produktion geht
- Weniger Sandboxes, klare Verantwortung
contra: Was Sie dafür aufgeben
- Partner verlieren die volle Kontrolle über ihre Umgebung
- Die Pipeline muss stehen, bevor die Kette funktioniert
```

## Alle Sandboxes mit Verantwortlichem auflisten

Fangen Sie mit der Liste an. Schreiben Sie jede vorhandene Sandbox mit Zweck und Verantwortlichem auf und löschen Sie die, für die sich niemand meldet. Danach legen Sie die Kette fest und sperren direkte Änderungen in Integration und UAT. Der Refresh-Kalender kommt zuletzt, wenn die Post-Refresh-Schritte als Skript vorliegen.
