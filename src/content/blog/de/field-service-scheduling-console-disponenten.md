---
title: "Scheduling Console im Field Service: Disponenten umstellen?"
description: "Sollen Disponenten von der Classic Dispatch Console auf die neue Scheduling Console im Field Service wechseln? Voraussetzungen, Lücken und ein Testplan."
pubDate: 2026-10-28
lang: de
slug: field-service-scheduling-console-disponenten
translationKey: field-service-scheduling-console
topic: field-service
categories: [field-service]
tags: [Field Service, Scheduling Console, Disposition, Enhanced Scheduling, Agentforce]
takeaways:
  - "Die Scheduling Console im Field Service zeigt Gantt, Terminliste und Karte auf einem Bildschirm und öffnet sich als Tab in der Field-Service-App."
  - "Die Scheduling Console gibt es nur mit Enhanced Scheduling and Optimization. Orgs mit der älteren Engine müssen zuerst die Engine umstellen."
  - "Die Kandidatensuche zeigt lesbare Empfehlungen statt Punktwerten, und Why? liefert eine KI-generierte Erklärung, warum ein Termin vorgeschlagen wurde."
  - "Anpassungen und Einstellungen bleiben laut Trailhead erhalten. Gleichwertig waren beide Konsolen laut einem Salesforce-Mitarbeiter im Mai 2026 noch nicht."
  - "Ich lasse zwei Disponenten die neue Konsole in einem Gebiet testen. Die anderen bleiben bei der alten, bis die für sie wichtigen Lücken geschlossen sind."
faq:
  - q: "Was ist die Scheduling Console im Field Service?"
    a: "Sie ist der neue Arbeitsplatz für Disponenten in Salesforce Field Service. Sie zeigt Gantt, Liste der Servicetermine und Karte auf einem Bildschirm, ist mit Lightning Web Components gebaut und schlägt Kandidaten mit KI-Erklärung vor."
  - q: "Was brauche ich für die Scheduling Console?"
    a: "Enhanced Scheduling and Optimization. Wird Agentforce Field Service über Salesforce Go aktiviert, schaltet sich die Konsole automatisch ein. Disponenten brauchen trotzdem Zugriff über das Permission Set, das Salesforce Go anlegt."
  - q: "Funktionieren Anpassungen der alten Dispositionskonsole weiter?"
    a: "Laut Trailhead funktionieren Anpassungen der Classic Dispatch Console in der Scheduling Console weiter, Gantt-Zustand und Nutzereinstellungen werden übernommen. Eigene Aktionen und Visualforce-Seiten würde ich trotzdem in einer Sandbox testen."
  - q: "Wird die Classic Dispatch Console abgeschaltet?"
    a: "Stand Oktober 2026 habe ich kein angekündigtes Abschaltdatum gefunden. Mit Summer '26 hat Salesforce den alten Tab in Classic Dispatch Console umbenannt, beide Konsolen lassen sich parallel nutzen."
draft: false
---

Disponenten sollten Schritt für Schritt auf die Scheduling Console im Field Service wechseln: erst eine kleine Gruppe in einem Gebiet, dann der Rest, sobald die Funktionen da sind, die sie täglich brauchen. Die Scheduling Console zeigt Gantt, Terminliste und Karte auf einem Bildschirm, erklärt vorgeschlagene Termine mit KI und übernimmt die Anpassungen der Classic Dispatch Console. Sie läuft nur mit Enhanced Scheduling and Optimization, und laut Salesforce sind beide Konsolen noch nicht ganz gleichwertig. Stand Oktober 2026 sehe ich kein Abschaltdatum für die alte Konsole, es gibt also keinen Grund, alle an einem Tag umzustellen.

## Was ist die Scheduling Console?

Die Scheduling Console ist der neue Arbeitsplatz für Disponenten in Salesforce Field Service. Laut der Trailhead-Einheit [Get to know the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-basics/get-to-know-the-scheduling-console) öffnet sie sich als Tab in der Field-Service-App, in der Disponenten auch Accounts und Serviceressourcen erreichen. Sie ist mit Lightning Web Components gebaut und nutzt serverseitige Filter und verzögertes Laden, damit sie auch bei großen Datenmengen schnell bleibt.

Der Bildschirm hat drei Teile:

- **Gantt.** Serviceressourcen als Zeilen, ihre Termine als Blöcke. Disponenten filtern Ressourcen nach Name, Typ oder Skill, verschieben Termine, tragen Abwesenheiten ein und erweitern die Ansicht auf mehrere Tage.
- **Liste der Servicetermine.** Offene und geplante Termine in einer normalen Salesforce-Listenansicht mit eigenen Spalten und Filtern. Termine werden aus der Liste auf das Gantt gezogen.
- **Karte.** Ressourcen und Termine in Echtzeit, mit Ebenen für geplante Routen, Verkehr und genaue Einsatzorte, synchron mit Gantt und Liste.

Die alte Konsole hat inzwischen einen neuen Namen. Laut einem [Wissensartikel von Salesforce](https://help.salesforce.com/s/articleView?id=005389875&language=en_US&type=1) wurde der Tab des Managed Package mit Version 262 (Summer '26) in Classic Dispatch Console umbenannt, um ihn von der neuen Scheduling Console zu unterscheiden.

```hinweis achtung
Zeigen Visualforce-Seiten, eigene Tabs oder Navigationsregeln auf die alte Bezeichnung, können sie brechen. Der Artikel beschreibt einen Workaround mit einem eigenen Visualforce-Tab.
```

## Die neue Konsole erklärt ihre Vorschläge

Die größte Änderung für Disponenten ist die Kandidatensuche. Laut der Trailhead-Einheit [Dispatch smarter with the Scheduling Console](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console) zeigt die Konsole lesbare Empfehlungen statt Punktwerten. Ein **Why?** neben einem Kandidaten liefert eine KI-generierte Erklärung, warum dieser Termin vorgeschlagen wurde.

Das ist mehr wert, als es klingt. In der Classic Dispatch Console sieht ein Disponent einen Punktwert und muss raten, welches Service Objective ihn bestimmt hat. Ein erfahrener Disponent, der Vorschläge überschreibt, weil er dem Wert nicht traut, ist genau das Muster aus [wie viel Terminplanung im Field Service automatisch laufen sollte](../salesforce-field-service-terminplanung-automatisieren/). Eine Erklärung in Klartext zeigt schneller, ob die Engine danebenliegt oder ob Daten fehlen.

Trailhead nennt weitere Änderungen:

- **Drag and Drop** von der Liste auf das Gantt, auch über zwei Bildschirme.
- **Globale Suche** nach Terminen über Gebiete, Zeiträume und Listenfilter hinweg, mit Ergebnissen in einer temporären Liste von bis zu 50 Datensätzen.
- **Details beim Überfahren** von Terminen, Ressourcen und Abwesenheiten, ohne den Datensatz zu öffnen.
- **Live-Aktualisierung**, wenn die Liste mit den Gebieten des Gantt synchronisiert ist, also ohne manuelles Neuladen.

Für Winter '27 nennt Salesforce [Scheduling Console Enhancements](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center): Termine über mehrere Besuche oder Tage erscheinen als ein zusammenhängender Auftrag und lassen sich mit einem Zug verschieben. Für Maschinenbauer mit Inbetriebnahmen oder Überholungen über mehrere Tage ist das bisher die nützlichste Ergänzung.

## Die Scheduling Console braucht die neue Engine

Die erste Voraussetzung ist die Engine. Die Scheduling Console gibt es nur mit Enhanced Scheduling and Optimization. Orgs, die mit der älteren Engine live gegangen sind, müssen zuerst umstellen, und dieser Wechsel hat eigene Hausaufgaben: Scheduling Recipes fallen weg, und mehrere Work Rules behandeln leere Felder anders. Die Einzelheiten stehen in [Enhanced Scheduling and Optimization: jetzt umstellen?](../field-service-enhanced-scheduling-umstellen/).

Die zweite Voraussetzung ist die Einrichtung. Laut Trailhead schaltet sich die Konsole automatisch ein, wenn Agentforce Field Service über Salesforce Go aktiviert wird. Disponenten brauchen trotzdem Zugriff: In Salesforce Go gibt ein Admin den Disponenten Zugriff auf die Scheduling Console und weist das Permission Set zu, das das System anlegt. Das macht einen Start mit einer kleinen Gruppe einfach, weil nur Nutzer mit dem Permission Set die neue Konsole bekommen.

## Was wird übernommen, und was fehlt noch?

Trailhead nennt den Umstieg risikoarm: Anpassungen der Classic Dispatch Console funktionieren in der Scheduling Console weiter, Gantt-Zustand und Nutzereinstellungen werden übernommen. Ich würde trotzdem jede eigene Aktion und jede Visualforce-Seite in einer Sandbox testen, weil Überraschungen zuerst im eigenen Code auftauchen.

Gleich sind beide Konsolen noch nicht. In einem [Thread der Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pMqC00AK) vom Mai 2026 berichtete ein Kunde nach dem Upgrade auf Summer '26, dass Farbpaletten fehlten und die neue Konsole Ansichten von einem Tag bis zu einer Woche bot, während das klassische Gantt auch Ansichten wie Utilization und Long-Term hatte. Ein Salesforce-Mitarbeiter antwortete, beide Konsolen seien noch nicht zu 100 Prozent gleichwertig und diese Funktionen seien nicht vergessen, ohne Termin.

Für Hersteller ist das der entscheidende Punkt. Disponenten, die Jahreswartungen Wochen im Voraus planen oder die Auslastung eines ganzen Gebiets im Blick behalten, arbeiten genau in diesen langen Ansichten. Disponenten, die vor allem Störungen für heute und morgen einplanen, vermissen sie kaum. Welche Gruppe Sie haben, bestimmt das Tempo des Umstiegs.

## Rechenbeispiel: zwei Disponenten testen zuerst

Die Zahlen sind angenommen. Ein Komponentenhersteller mit vier Disponenten und drei Servicegebieten nutzt bereits Enhanced Scheduling and Optimization. Alle Zahlen sind Annahmen, um die Methode zu zeigen.

```schritte
Bestandsaufnahme | 1 Woche · Admin und Disponenten
  Der Admin listet jede Anpassung der Classic Dispatch Console auf: eigene Aktionen, Visualforce-Seiten, Filter, Farbregeln. Jeder Disponent notiert, welche Gantt-Ansichten er täglich nutzt.
Pilot | 6 Wochen · zwei Disponenten
  Zwei Disponenten bekommen das Permission Set und planen ein Gebiet in der Scheduling Console. Die anderen beiden bleiben für die übrigen Gebiete bei der Classic Dispatch Console.
Wöchentlicher Abgleich | wöchentlich · Pilot-Disponenten
  Die Pilot-Disponenten notieren, was sie in der neuen Konsole nicht erledigen konnten und in der alten tun mussten, und wie oft sie Why? genutzt haben, um einen Vorschlag zu verstehen.
Entscheidung
  Blockiert nichts auf der Liste die tägliche Arbeit, folgen die anderen beiden. Fehlen noch die langen Ansichten, behält die Planerin für vorbeugende Wartung die Classic Dispatch Console für diese Aufgabe.
```

Die Notiz zu Why? lohnt sich. Nutzen Disponenten die Erklärung oft und ändern den Vorschlag trotzdem, zeigt sie auf fehlende Daten oder eine unpassende Policy. Das ist eine nützliche Rückmeldung, lange bevor ein KI-Agent selbst plant. Welche Agenten Disponenten heute helfen, steht in [KI-Agenten im Außendienst: Was Field Service heute kann](../ki-agenten-aussendienst-field-service/), das größere Bild im Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/) der KI-Masterclass.

## Erster Schritt: prüfen, welche Engine läuft

Prüfen Sie zuerst die Engine. Ist es noch die ältere, wartet die Frage nach der Konsole, bis Sie auf Enhanced Scheduling and Optimization umgestellt haben. Ist es schon die neue, geben Sie zwei Disponenten das Permission Set und lassen Sie sie einige Wochen ein Gebiet planen. Engine, Konsole und Verantwortlicher für die Policies sind die drei Entscheidungen im Masterclass-Kapitel [Terminplanung und Disposition](../../masterclass/field-service/field-service-terminplanung-disposition/).
