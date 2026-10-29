---
title: "Enhanced Scheduling and Optimization: jetzt umstellen?"
description: "Soll eine bestehende Field-Service-Org auf Enhanced Scheduling and Optimization wechseln? Limits, was wegfällt, was sich ändert und wie Sie es testen."
pubDate: 2026-10-28
lang: de
slug: field-service-enhanced-scheduling-umstellen
translationKey: field-service-enhanced-scheduling-eso
topic: field-service
categories: [field-service]
tags: [Field Service, Enhanced Scheduling, Optimierung, Scheduling Console, Disposition]
takeaways:
  - "Neue Salesforce-Orgs haben Enhanced Scheduling and Optimization standardmäßig für alle Servicegebiete aktiv. Bestehende Orgs können alle Gebiete auf einmal oder Gebiet für Gebiet umstellen."
  - "Die neue Engine hebt Limits an, die in der Fertigung zählen: 250 Skills pro Serviceressource statt 100 und 50.000 optimierte Termine pro rollierenden 24 Stunden oder 500 pro Scheduling-Lizenz, je nachdem, was höher ist."
  - "Scheduling Recipes gibt es mit der neuen Engine nicht mehr, Salesforce verweist auf den Flow Fix Schedule Overlaps. Optimization Insights wird durch den Optimization Hub ersetzt."
  - "Mehrere Work Rules behandeln leere Felder anders, und ein Termin ohne Servicegebiet bekommt Kandidaten aus allen Gebieten. Die Datenqualität entscheidet, wie glatt der Wechsel läuft."
  - "Die neue Scheduling Console gibt es nur mit Enhanced Scheduling and Optimization. Die Entscheidung über die Engine entscheidet also auch über den Bildschirm der Disponenten."
faq:
  - q: "Was ist Enhanced Scheduling and Optimization in Salesforce Field Service?"
    a: "Es ist die neuere Planungs- und Optimierungs-Engine von Field Service. Sie verteilt Termine wie die ältere Engine nach Scheduling Policy auf Techniker, hat aber höhere Limits, behandelt einige Work Rules anders und rechnet Fahrzeiten punktgenau vorausschauend. Neue Orgs haben sie standardmäßig aktiv."
  - q: "Kann ich Enhanced Scheduling and Optimization nur für ein Servicegebiet einschalten?"
    a: "Ja. Laut dem Field-Service-Leitfaden können bestehende Orgs alle Servicegebiete umstellen oder die neue Engine pro Gebiet aktivieren. So ist ein Pilotgebiet möglich, bevor der Rest folgt."
  - q: "Was passiert mit Scheduling Recipes nach dem Wechsel?"
    a: "Scheduling Recipes sind mit Enhanced Scheduling and Optimization nicht verfügbar. Die Salesforce-Hilfe nennt den automatisierten Flow Fix Schedule Overlaps als Ersatz, genutzte Recipes müssen also vor dem Wechsel neu gebaut werden."
  - q: "Brauche ich Enhanced Scheduling and Optimization für die Scheduling Console?"
    a: "Ja. Laut Trailhead ist die Scheduling Console nur mit Enhanced Scheduling and Optimization verfügbar. Orgs mit der älteren Engine bleiben bei der Classic Dispatch Console."
draft: false
---

Eine bestehende Field-Service-Org sollte auf Enhanced Scheduling and Optimization umstellen, aber Gebiet für Gebiet und nach einer Prüfung der Daten, nicht in einem Schritt. Neue Orgs haben die neue Engine ohnehin für alle Gebiete aktiv, und die neue Scheduling Console funktioniert nur mit ihr. Der Wechsel bringt höhere Limits, etwa 250 Skills pro Techniker statt 100. Er entfernt aber auch Scheduling Recipes und ändert, wie mehrere Work Rules mit leeren Feldern umgehen. Meine Reihenfolge: Daten bereinigen, Recipes ersetzen, ein Pilotgebiet umstellen, vier Wochen lang Vorschläge vergleichen, dann den Rest umstellen.

## Was ist Enhanced Scheduling and Optimization?

Enhanced Scheduling and Optimization, kurz ESO, ist die neuere Engine hinter der Terminplanung in Salesforce Field Service. Sie macht dieselbe Arbeit wie die ältere Engine: Sie liest die Scheduling Policy, filtert mit Work Rules ungeeignete Techniker heraus, bewertet die übrigen mit Service Objectives und bucht einen Termin. Wie diese Entscheidung abläuft, beschreibe ich in [wie viel Terminplanung im Field Service automatisch laufen sollte](../salesforce-field-service-terminplanung-automatisieren/).

Die [Release Notes zu Summer '23](https://resources.docs.salesforce.com/244/latest/en-us/sfdc/pdf/salesforce_summer23_release_notes.pdf) beschreiben die neue Engine als standardmäßig verfügbar für neue Nutzer. Der aktuelle [Field-Service-Leitfaden](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/support_field_service.pdf) sagt es deutlich: Neue Orgs haben Enhanced Scheduling and Optimization für alle Servicegebiete aktiv, bestehende Orgs können alle Gebiete umstellen oder die Engine pro Gebiet aktivieren.

Offen ist die Frage also nur für Orgs, die mit der älteren Engine live gegangen sind. Für sie ändert sich nichts von selbst. Die Engine läuft weiter wie bisher, bis jemand den Wechsel beschließt, und ohne Frist wird diese Entscheidung gern verschoben.

## Welche Limits ändern sich mit dem Wechsel?

Die [Limits für Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_limits.htm&language=en_US&type=5) in der Salesforce-Hilfe nennen die Zahlen. Für Maschinen- und Anlagenbauer zählen diese:

| Limit | Enhanced Scheduling and Optimization |
|---|---|
| Skills pro Serviceressource | 250, bei der älteren Engine 100 |
| Optimierte Servicetermine | 50.000 pro rollierenden 24 Stunden oder 500 pro Field Service Scheduling-Lizenz, je nachdem, was höher ist |
| Horizont für Abwesenheiten und Terminänderungen | 30 Tage, spätere Änderungen bekommen keine Aktualisierung von Fahrzeit und Mittagspause |
| Servicegebiete pro geplantem Optimierungsjob | 100, mit Dynamic Scaling 1.000 |

Auf das Skill-Limit würde ich zuerst schauen. Ein Servicetechniker bei einem Maschinenbauer hat oft Skills pro Baureihe, pro Steuerung, pro Sicherheitsunterweisung und pro Sprache. Mit 100 Skills wird das bei größeren Produktprogrammen eng. Mit 250 ist Luft.

Die 50.000 Termine sind selten der Engpass. Eine Serviceorganisation mit 45 Technikern bleibt weit darunter, und die Zahl gilt, bis Sie mehr als 100 Scheduling-Lizenzen haben. Den Verbrauch sehen Sie im Setup unter Unternehmensinformationen.

Der 30-Tage-Horizont betrifft geplante Wartungen. Bucht die Disposition Jahreswartungen zwei Monate im Voraus, liegen diese Termine außerhalb des Fensters, in dem die Engine Fahrzeiten aktualisiert. Das ist in Ordnung, solange die Optimierung den Plan neu ordnet, sobald die Termine ins Fenster rücken.

Laut den [Hinweisen zu Enhanced Scheduling and Optimization](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_considerations.htm&language=en_US&type=5) rechnet die Engine Fahrzeiten mit punktgenauem, vorausschauendem Routing. Dafür braucht es Kartenabdeckung in den Regionen, in denen Ihre Techniker arbeiten. Die Optimierung muss außerdem nicht eigens aktiviert werden, weil sie mit einem Platform Integration User läuft.

## Was fällt weg, und was verhält sich anders?

Zwei Dinge fallen weg. Scheduling Recipes, also Automatismen, die bestimmte Ereignisse auslösen, um Überschneidungen im Plan aufzulösen, sind nicht verfügbar. Die Salesforce-Hilfe nennt den automatisierten Flow Fix Schedule Overlaps als Ersatz. Optimization Insights wird durch den Optimization Hub ersetzt. Wenn Ihre Disponenten heute auf Recipes bauen, muss der Ersatz vor dem Wechsel entworfen und getestet sein, nicht danach.

Dazu kommen Work Rules, die mit denselben Daten andere Ergebnisse liefern. Derselbe Hilfeartikel listet sie auf.

```vertiefung Für Admins
titel: Welche Work Rules verhalten sich anders?
- **Match Fields und Extended Match** behandeln leere Felder anders.
- **Match Boolean** greift nicht, wenn das Boolean-Feld an der Serviceressource leer ist.
- **Match Territory** macht einen Termin ohne Servicegebiet für Ressourcen aus allen Gebieten offen.
- **Working Territories**: Sekundäre Gebietszuordnungen werden anders behandelt.
- **Match Skills** bekommt zusätzlich die Option "mindestens ein Skill passt".
- **Kapazitätsbasierte Ressourcen** verlieren die Unterstützung für Abwesenheiten und Effizienz.
- **In-Day-Optimierung** hat eine andere Laufzeit.
```

Die meisten Punkte haben eines gemeinsam: leere Felder. Ein Termin ohne Servicegebiet, eine Ressource ohne Wert in einem Checkbox-Feld, ein Arbeitsauftrag mit fehlendem Vergleichsfeld. Bei der älteren Engine waren solche Lücken vielleicht zufällig harmlos. Bei der neuen führen sie zu anderen Kandidaten. Deshalb ist der Wechsel zuerst ein Datenthema, und deshalb würde ich mit den Prüfungen aus [welche Daten die Terminplanung im Field Service braucht](../salesforce-field-service-stammdaten/) beginnen.

Eine Änderung hilft Herstellern direkt. Termine, die gegen eine Regel verstoßen, konnte die ältere Engine nicht optimieren. Mit der neuen Engine kann die Optimierung für sie einen vertretbaren Termin finden oder sie aus dem Plan nehmen.

## Warum entscheidet der Wechsel auch über die Dispositionskonsole?

Salesforce hat inzwischen zwei Oberflächen für Disponenten: die Classic Dispatch Console mit dem bekannten Gantt und die neue Scheduling Console. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console) ist die Scheduling Console nur mit Enhanced Scheduling and Optimization verfügbar.

Damit hängen zwei Entscheidungen zusammen, die getrennt aussehen. Eine Org, die bei der älteren Engine bleibt, bleibt auch bei der Classic Dispatch Console. Neue Funktionen der Konsole, etwa KI-Erklärungen zu vorgeschlagenen Terminen oder mehrtägige Einsätze, die Winter '27 als einen zusammenhängenden Auftrag zeigt, bleiben dann außer Reichweite. Ob Ihre Disponenten jetzt wechseln sollten, behandle ich in [Scheduling Console im Field Service: Disponenten umstellen?](../field-service-scheduling-console-disponenten/).

## Ein typisches Szenario, als Annahme: erst ein Pilotgebiet

Ein typisches Szenario, als Annahme: Ein Maschinenbauer hat 45 Techniker in fünf Servicegebieten, Field Service läuft seit 2021 mit der älteren Engine, dazu vier Disponenten und zwei Scheduling Recipes für verspätete Termine. Alle Zahlen sind Annahmen, um die Methode zu zeigen.

```schritte
Datenprüfung | 2 Wochen
  Ein Bericht listet Termine ohne Servicegebiet, Ressourcen mit leeren Feldern, die Match-Fields- oder Match-Boolean-Regeln lesen, und Techniker mit sekundären Gebietszuordnungen. Ergebnis: 6 Prozent der offenen Termine haben kein Gebiet, meist Störungen, die aus Cases entstanden sind.
Recipes nachbauen | 2 Wochen
  Die beiden Recipes werden mit dem Flow Fix Schedule Overlaps nachgebaut und in einer Full Sandbox getestet.
Pilot | 4 Wochen
  Ein Gebiet mit neun Technikern wechselt auf die neue Engine. Die Disponenten notieren jeden Vorschlag, den sie ändern, und den Grund, so wie bei der Einführung der Automatik.
Vergleich
  Liegt der Anteil geänderter Vorschläge im Pilotgebiet nicht höher als in den anderen, folgen die übrigen Gebiete, eines pro Woche.
```

Die Konfiguration dafür, also die Einstellung pro Gebiet, Scheduling Policies und Work Rules, besteht aus Datensätzen, nicht aus Metadaten. Sie gehört in die Pipeline, wie im Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/) der DevOps-Masterclass beschrieben, sonst laufen getesteter Sandbox-Stand und Produktion auseinander.

## Wo fangen Sie an?

Fangen Sie mit drei Listen an: Termine ohne Servicegebiet, Work Rules, die häufig leere Felder lesen, und genutzte Recipes. Sie zeigen, wie viel Arbeit der Wechsel macht. Wählen Sie dann das Gebiet mit den saubersten Daten als Pilot. Wie die Engine in die gesamte Disposition passt, steht im Masterclass-Kapitel [Terminplanung und Disposition](../../masterclass/field-service/field-service-terminplanung-disposition/).

Für eine Org mit der älteren Engine ist der Wechsel fällig, sobald die Daten sauber sind, weil die neue Konsole und die höheren Limits nur mit ihm kommen.
