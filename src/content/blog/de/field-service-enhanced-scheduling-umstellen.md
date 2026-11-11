---
title: "Enhanced Scheduling and Optimization: jetzt umstellen?"
description: "Soll eine bestehende Field-Service-Org auf Enhanced Scheduling and Optimization wechseln? Limits, was wegfällt, was sich ändert und wie Sie es testen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-enhanced-scheduling-umstellen
translationKey: field-service-enhanced-scheduling-eso
topic: field-service
categories: [field-service]
tags: [Field Service, Enhanced Scheduling, Optimierung, Scheduling Console, Disposition]
takeaways:
  - "In neuen Orgs ist Enhanced Scheduling and Optimization für alle Servicegebiete aktiviert. Bestehende Orgs können alle Gebiete auf einmal oder einzeln umstellen."
  - "Die neue Engine erlaubt 250 statt 100 Skills pro Ressource und 50.000 optimierte Termine pro 24 Stunden oder 500 pro Scheduling-Lizenz."
  - "Scheduling Recipes entfallen, Salesforce verweist auf den Flow Fix Schedule Overlaps. Optimization Insights wird zum Optimization Hub."
  - "Mehrere Work Rules behandeln leere Felder anders, und bei einem Termin ohne Servicegebiet kommen Ressourcen aus allen Gebieten als Kandidaten infrage."
  - "Die neue Scheduling Console gibt es nur mit der neuen Engine. Wer bei der alten Engine bleibt, verzichtet also auch auf den neuen Disponenten-Bildschirm."
faq:
  - q: "Was ist Enhanced Scheduling and Optimization in Salesforce Field Service?"
    a: "Es ist die neuere Planungs- und Optimierungs-Engine von Field Service. Sie verteilt Termine ähnlich wie die ältere Engine anhand der Scheduling Policy auf Techniker, hat aber höhere Limits, behandelt einige Work Rules anders und berechnet Fahrzeiten vorausschauend von Punkt zu Punkt. In neuen Orgs ist sie standardmäßig aktiviert."
  - q: "Kann ich Enhanced Scheduling and Optimization nur für ein Servicegebiet einschalten?"
    a: "Ja. Laut dem Field-Service-Leitfaden können bestehende Orgs alle Servicegebiete umstellen oder die neue Engine pro Gebiet aktivieren. So ist ein Pilotgebiet möglich, bevor der Rest folgt."
  - q: "Was passiert mit Scheduling Recipes nach dem Wechsel?"
    a: "Scheduling Recipes sind mit Enhanced Scheduling and Optimization nicht verfügbar. Die Salesforce-Hilfe nennt den automatisierten Flow Fix Schedule Overlaps als Ersatz. Genutzte Recipes müssen also vor dem Wechsel neu gebaut werden."
  - q: "Brauche ich Enhanced Scheduling and Optimization für die Scheduling Console?"
    a: "Ja. Laut Trailhead ist die Scheduling Console nur mit Enhanced Scheduling and Optimization verfügbar. Orgs mit der älteren Engine bleiben bei der Classic Dispatch Console."
draft: false
---

Eine bestehende Field-Service-Org sollte auf Enhanced Scheduling and Optimization umstellen, aber Gebiet für Gebiet und nach einer Prüfung der Daten, nicht in einem Schritt. In neuen Orgs ist die neue Engine ohnehin für alle Gebiete aktiviert, und die neue Scheduling Console funktioniert nur mit ihr. Der Wechsel bringt höhere Limits, etwa 250 Skills pro Techniker statt 100. Er entfernt aber auch Scheduling Recipes und ändert, wie mehrere Work Rules mit leeren Feldern umgehen. Meine Reihenfolge: Daten bereinigen, Recipes ersetzen, ein Pilotgebiet umstellen, vier Wochen lang Vorschläge vergleichen, dann den Rest umstellen.

## Was ist Enhanced Scheduling and Optimization?

Enhanced Scheduling and Optimization, kurz ESO, ist die neuere Engine hinter der Terminplanung in Salesforce Field Service. Sie macht dieselbe Arbeit wie die ältere Engine: Sie liest die Scheduling Policy, filtert mit Work Rules ungeeignete Techniker heraus, bewertet die übrigen mit Service Objectives und bucht einen Termin. Wie diese Entscheidung abläuft, beschreibe ich in [wie viel Terminplanung im Field Service automatisch laufen sollte](../salesforce-field-service-terminplanung-automatisieren/).

Die [Release Notes zu Summer '23](https://resources.docs.salesforce.com/244/latest/en-us/sfdc/pdf/salesforce_summer23_release_notes.pdf) beschreiben die neue Engine als standardmäßig verfügbar für neue Nutzer. Der aktuelle [Field-Service-Leitfaden](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/support_field_service.pdf) sagt es deutlich: In neuen Orgs ist Enhanced Scheduling and Optimization für alle Servicegebiete aktiviert, bestehende Orgs können alle Gebiete umstellen oder die Engine pro Gebiet aktivieren.

Offen ist die Frage also nur für Orgs, die mit der älteren Engine gestartet sind. Für sie ändert sich nichts von selbst. Die Engine arbeitet weiter wie bisher, bis jemand den Wechsel beschließt, und ohne Frist wird diese Entscheidung gern verschoben.

## Höhere Limits für Skills und optimierte Termine

Die [Limits für Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_limits.htm&language=en_US&type=5) in der Salesforce-Hilfe nennen die Zahlen. Für Maschinen- und Anlagenbauer sind vor allem diese relevant:

| Limit | Enhanced Scheduling and Optimization |
|---|---|
| Skills pro Serviceressource | 250, bei der älteren Engine 100 |
| Optimierte Servicetermine | 50.000 innerhalb rollierender 24 Stunden oder 500 pro Field Service Scheduling-Lizenz, je nachdem, was höher ist |
| Horizont für Abwesenheiten und Terminänderungen | 30 Tage, spätere Änderungen bekommen keine Aktualisierung von Fahrzeit und Mittagspause |
| Servicegebiete pro geplanter Optimierungsanfrage | 100, mit Dynamic Scaling 1.000 |

Auf das Skill-Limit würde ich zuerst schauen. Ein Servicetechniker bei einem Maschinenbauer verfügt oft über Skills für Baureihen, Steuerungen, Sicherheitsunterweisungen und Sprachen. Mit 100 Skills wird das bei größeren Produktprogrammen eng. Mit 250 Skills bleibt Spielraum.

Die 50.000 Termine sind selten der Engpass. Eine Serviceorganisation mit 45 Technikern bleibt weit darunter, und die Zahl gilt, bis Sie mehr als 100 Scheduling-Lizenzen haben. Den Verbrauch sehen Sie im Setup unter Unternehmensinformationen.

Der 30-Tage-Horizont betrifft geplante Wartungen. Bucht die Disposition Jahreswartungen zwei Monate im Voraus, liegen diese Termine außerhalb des Fensters, in dem die Engine Fahrzeiten aktualisiert. Im Piloten würde ich prüfen, ob die Optimierung diese Termine neu ordnet, sobald sie ins Fenster rücken, und weit in der Zukunft liegende Buchungen bewusst neu einplanen, statt davon auszugehen, dass das automatisch geschieht.

Laut den [Hinweisen zu Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_considerations.htm&language=en_US&type=5) rechnet die Engine Fahrzeiten mit vorausschauendem Punkt-zu-Punkt-Routing. Dafür braucht es Kartenabdeckung in den Regionen, in denen Ihre Techniker arbeiten. Für die Optimierung ist außerdem keine eigene Aktivierung nötig; sie läuft mit einem Platform Integration User.

## Was fällt weg, und was verhält sich anders?

Zwei Dinge fallen weg. Scheduling Recipes, also Automatisierungen, die bei bestimmten Ereignissen Überschneidungen im Terminplan auflösen, sind nicht verfügbar. Die Salesforce-Hilfe nennt den automatisierten Flow Fix Schedule Overlaps als Ersatz. Optimization Insights wird durch den Optimization Hub ersetzt. Wenn Ihre Disponenten heute auf Recipes bauen, muss der Ersatz vor dem Wechsel entworfen und getestet sein, nicht danach.

Dazu kommen Work Rules, die mit denselben Daten andere Ergebnisse liefern. Derselbe Hilfeartikel listet sie auf.

```vertiefung Für Admins
titel: Welche Work Rules verhalten sich anders?
- **Match Fields und Extended Match** behandeln leere Felder anders.
- **Match Boolean** greift nicht, wenn das Boolean-Feld an der Serviceressource leer ist.
- **Match Territory** öffnet einen Termin ohne Servicegebiet für Ressourcen aus allen Gebieten.
- **Working Territories**: Sekundäre Gebietszuordnungen werden anders behandelt.
- **Match Skills** erhält zusätzlich die Option "mindestens ein Skill passt".
- **Kapazitätsbasierte Ressourcen:** Die Unterstützung für Abwesenheiten und Ressourceneffizienz entfällt.
- **In-Day-Optimierung** hat eine andere Laufzeit.
```

Die meisten Punkte haben eines gemeinsam: leere Felder. Ein Termin ohne Servicegebiet, eine Ressource ohne Wert in einem Checkbox-Feld, ein Arbeitsauftrag mit fehlendem Vergleichsfeld. Bei der älteren Engine waren solche Lücken vielleicht zufällig harmlos. Bei der neuen führen sie zu anderen Kandidaten. Deshalb ist der Wechsel zuerst ein Datenthema, und deshalb würde ich mit den Prüfungen aus [welche Daten die Terminplanung im Field Service braucht](../salesforce-field-service-stammdaten/) beginnen.

Eine Änderung hilft Herstellern unmittelbar. Die ältere Engine konnte Termine, die gegen eine Regel verstoßen, nicht optimieren. Mit der neuen Engine kann die Optimierung für solche Termine einen vertretbaren Zeitpunkt finden oder die Termine aus dem Plan nehmen.

## Die neue Scheduling Console gibt es nur mit der neuen Engine

Salesforce hat inzwischen zwei Oberflächen für Disponenten: die Classic Dispatch Console mit dem bekannten Gantt und die neue Scheduling Console. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console) ist die Scheduling Console nur mit Enhanced Scheduling and Optimization verfügbar.

Damit sind zwei scheinbar getrennte Entscheidungen verknüpft, allerdings nur in eine Richtung. Eine Org, die bei der älteren Engine bleibt, bleibt auch bei der Classic Dispatch Console; eine Org mit der neuen Engine kann die Classic Dispatch Console im Übergang weiter nutzen. Neue Funktionen der Konsole, etwa KI-Erklärungen zu vorgeschlagenen Terminen oder mehrtägige Einsätze, die in Winter '27 als zusammenhängender Auftrag angezeigt werden, bleiben dann außer Reichweite. Ob Ihre Disponenten jetzt wechseln sollten, behandle ich in [Scheduling Console im Field Service: Disponenten umstellen?](../field-service-scheduling-console-disponenten/).

## Rechenbeispiel: erst ein Pilotgebiet

Ein Maschinenbauer hat 45 Techniker in fünf Servicegebieten, Field Service ist seit 2021 mit der älteren Engine im Einsatz, außerdem gibt es vier Disponenten und zwei Scheduling Recipes für verspätete Termine. Alle Zahlen sind Annahmen, um die Methode zu zeigen.

```schritte
Datenprüfung | 2 Wochen
  Ein Bericht listet Termine ohne Servicegebiet, Ressourcen mit leeren Feldern, die Match-Fields- oder Match-Boolean-Regeln lesen, und Techniker mit sekundären Gebietszuordnungen. Ergebnis: 6 Prozent der offenen Termine haben kein Gebiet, meist Störungen, die aus Cases entstanden sind.
Recipes nachbauen | 2 Wochen
  Die beiden Recipes werden mit dem Flow Fix Schedule Overlaps nachgebaut und in einer Full Sandbox getestet.
Pilot | 4 Wochen
  Ein Gebiet mit neun Technikern wechselt auf die neue Engine. Die Disponenten notieren jeden Vorschlag, den sie ändern, und den Grund, so wie bei der Einführung der Automatik.
Vergleich
  Liegt der Anteil geänderter Vorschläge im Pilotgebiet nicht höher als in den anderen und werden Fahrzeit, Überstunden und ungeplante Termine nicht schlechter, folgen die übrigen Gebiete, eines pro Woche.
```

Die Konfiguration dafür, also die Einstellungen pro Gebiet, Scheduling Policies und Work Rules, besteht aus Datensätzen, nicht aus Metadaten. Sie gehört in die Pipeline, wie im Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/) der DevOps-Masterclass beschrieben. Sonst weichen der getestete Sandbox-Stand und die Produktion voneinander ab.

## Termine ohne Gebiet, Work Rules und Recipes auflisten

Fangen Sie mit drei Listen an: Termine ohne Servicegebiet, Work Rules, die häufig leere Felder auswerten, und genutzte Recipes. Sie zeigen, wie viel Arbeit der Wechsel macht. Wählen Sie dann das Gebiet mit den saubersten Daten als Pilot. Wie die Engine in die gesamte Disposition passt, steht im Masterclass-Kapitel [Terminplanung und Disposition](../../masterclass/field-service/field-service-terminplanung-disposition/).
