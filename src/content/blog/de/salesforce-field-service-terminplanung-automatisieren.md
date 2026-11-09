---
title: "Salesforce Field Service: Wie viel Planung automatisch?"
description: "Wie viel Terminplanung in Salesforce Field Service automatisch laufen sollte: Scheduling Policies, die Rolle der Disponenten und ein Weg zu mehr Automatik."
pubDate: 2026-10-26
lang: de
slug: salesforce-field-service-terminplanung-automatisieren
translationKey: field-service-scheduling-automation
topic: field-service
categories: [field-service]
series: { id: field-service, part: 3 }
tags: [Field Service, Außendienst, Terminplanung, Disposition, Fertigung]
takeaways:
  - "Zum Einstieg plant die Automatik bis zum Status Scheduled. Ein Disponent prüft den Plan und gibt jeden Termin mit Dispatched an den Techniker frei."
  - "Die Engine entscheidet nach einer Scheduling Policy: Work Rules schließen Techniker aus, gewichtete Service Objectives bewerten die übrigen."
  - "Der Disponent ergänzt, was nicht in den Daten steht, etwa einen Kunden, der die Maschine für die Wartung erst abschalten muss."
  - "Mehr Automatik lohnt sich, wenn die Zahlen es zeigen: wenig geänderte Vorschläge, eingehaltene Reaktionszeiten, ein stabiler Plan."
faq:
  - q: "Was ist der Unterschied zwischen Scheduled und Dispatched in Field Service?"
    a: "Scheduled heißt, dass ein Termin einem Techniker und einem Zeitfenster zugeordnet ist. Dispatched heißt, dass er an den Techniker freigegeben ist. Ob der Techniker ihn erst ab Dispatched sieht, hängt von den Freigabeeinstellungen ab, etwa der Einstellung, freigegebene Termine mit den zugeordneten Ressourcen zu teilen."
  - q: "Was ist eine Scheduling Policy?"
    a: "Eine Scheduling Policy legt fest, nach welchen Regeln und Zielen Field Service Termine an Techniker vergibt. Work Rules schließen ungeeignete Techniker aus, Service Objectives bewerten die übrigen mit einer Gewichtung."
  - q: "Welche Scheduling Policies liefert Salesforce mit?"
    a: "Field Service bringt vier Standard-Policies mit: Customer First, High Intensity für Spitzenzeiten, Soft Boundaries für gebietsübergreifende Einsätze und Emergency für Notfälle. Sie sind ein Startpunkt und werden meist angepasst."
  - q: "Kann Field Service Termine automatisch an Techniker freigeben?"
    a: "Ja. Geplante Jobs können Termine automatisch von Scheduled auf Dispatched setzen. Mit Drip Feed hält Field Service dabei nur eine festgelegte Zahl von Terminen in der Warteschlange jedes Technikers."
draft: false
---

Wie viel Terminplanung in Salesforce Field Service automatisch laufen sollte, hängt vor allem davon ab, wie viel Vertrauen das Unternehmen in die Technik hat, und dieses Vertrauen sollte auf gemessener Planungsqualität beruhen. Ein guter Einstieg ist eine Arbeitsteilung: Die Automatik plant Termine bis zum Status Scheduled. Ein Disponent schaut über den Plan, korrigiert, wo nötig, und gibt jeden Termin mit dem Status Dispatched an den Techniker frei. Wenn die Zahlen den Plan bestätigen, übernimmt die Automatik dann mehr, bis einfache Einsätze ganz ohne Disponent laufen.

Dieser Artikel ist Teil 3 der Serie. Ob sich Field Service lohnt, steht in [Teil 1](../salesforce-field-service-lohnt-sich/). Welche Stammdaten die Planung braucht, steht in [Teil 2](../salesforce-field-service-stammdaten/). Ohne diese Daten plant auch die beste Automatik falsch.

## Was passiert zwischen None und Dispatched?

Ein Termin (Service Appointment) durchläuft in Field Service mehrere Status. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=pfs_lifecycle.htm&language=en_US&type=5) sind das standardmäßig None, Scheduled, Dispatched, In Progress, Completed, Cannot Complete und Canceled. Für die Frage nach der Automatik zählen die ersten drei:

- **None:** Der Termin ist angelegt, aber keinem Techniker und keiner Zeit zugeordnet.
- **Scheduled:** Die Planung hat einen Techniker und ein Zeitfenster gewählt. Der Plan steht, ist aber noch nicht freigegeben.
- **Dispatched:** Der Termin ist an den Techniker freigegeben. Mit passenden Mobile-Einstellungen bekommt er eine Benachrichtigung.

Zwischen Scheduled und Dispatched liegt die Stelle, an der ein Mensch noch eingreifen kann, bevor der Techniker sich auf einen Plan verlässt. Genau dort setzt die Arbeitsteilung an. Was der Techniker sieht, steuert aber nicht der Status allein, sondern die Freigabe (Sharing). Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_sharing.htm&language=en_US&type=5) bieten die Field-Service-Einstellungen dafür „Share dispatched service appointments with their assigned resources“, damit Disponenten den Zugriff steuern, bis der Plan steht. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments) lassen sich Termine zudem als privat markieren, bis sie freigegeben sind. Klären Sie beides vor dem Start, sonst sehen Techniker den vorläufigen Plan.

## Wie entscheidet die Planungsengine?

Die Engine vergibt Termine nach einer Scheduling Policy. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling.htm&language=en_US&type=5) besteht sie aus zwei Teilen:

- **Work Rules** filtern Techniker aus, die einen Termin nicht übernehmen können, etwa weil eine Qualifikation fehlt oder der Kunde zu dieser Zeit nicht öffnet. Einige sind Pflicht, zum Beispiel die Verfügbarkeit des Technikers.
- **Service Objectives** bewerten die übrigen Kandidaten, etwa nach kurzer Fahrzeit, frühem Termin oder bevorzugtem Techniker. Jedes Ziel hat eine Gewichtung, die sich schrittweise an die eigenen Kennzahlen anpassen lässt.

Salesforce liefert vier Policies mit. Customer First wägt Kundenwunsch und kurze Fahrzeit ab. High Intensity stellt die Produktivität der Techniker über Kundenwünsche, gedacht für Spitzenzeiten. Soft Boundaries erlaubt, Techniker über Gebietsgrenzen hinweg einzusetzen. Emergency ist für Notfälle. Von welcher Sie ausgehen, hängt am wichtigsten Ziel: zugesagte Reaktionszeiten, kurze Fahrten, Kundenwunsch, Auslastung oder knappe Spezialisten. Starten Sie in jedem Fall mit einer mitgelieferten Policy und passen Sie die Gewichte an, statt eine von null aufzubauen.

Dazu kommt die Optimierung. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=pfs_optimization.htm&language=en_US&type=5) kann sie den Plan für ein oder mehrere Gebiete über mehrere Tage neu ordnen, etwa jede Nacht. Am Einsatztag fängt eine In-Day-Optimierung kurzfristige Änderungen auf, und für einzelne Techniker gibt es eine eigene Optimierung, wenn ein Termin ausfällt oder sich verspätet. Ob sich der Umstieg auf die neuere Engine lohnt, steht in [Enhanced Scheduling and Optimization: jetzt umstellen?](../field-service-enhanced-scheduling-umstellen/), das Gesamtbild aus Engine, Konsole und Regeln in [Kapitel 2 der Masterclass Field Service](../../masterclass/field-service/field-service-terminplanung-disposition/).

## Der Disponent ergänzt, was nicht in den Daten steht

Die Engine kennt nur, was in den Daten steht. Ein erfahrener Disponent weiß mehr. Er weiß, dass ein Kunde die Maschine für die Wartung erst abschalten muss und das nur an bestimmten Tagen geht. Er weiß, dass ein Ersatzteil zwar im Lager gebucht, aber noch nicht im Fahrzeug ist. Er weiß, welcher Techniker bei einem Kunden schon einmal Ärger hatte, auch wenn das nirgends steht.

```praxis
In meinen Field-Service-Projekten mit automatischer Terminplanung hat am Ende das Vertrauen des Kunden in die Technik entschieden, wie viel er der Automatik überlässt. Wer die Planung über Jahre in erfahrenen Händen hatte, gibt sie nicht am ersten Tag an eine Software ab.
```

Vertrauen allein ist allerdings ein schwaches Kriterium. Es sollte aus Zahlen wachsen, nicht aus Gewohnheit. Deshalb messe ich vom ersten Tag an, wie gut die Vorschläge der Engine sind.

Ein Modell, bei dem die Automatik bis Scheduled plant und der Disponent mit Dispatched freigibt, nimmt das ernst. Der Disponent bleibt verantwortlich, beginnt aber mit einem fertigen Vorschlag statt mit einem leeren Kalender.

Für die Prüfung hilft ein fester Rhythmus. Trailhead empfiehlt, morgens die Vormittagstermine freizugeben und den Plan vor Mittag noch einmal zu prüfen, bevor die Nachmittagstermine rausgehen. So bleibt der Nachmittag beweglich, wenn am Vormittag etwas schiefgeht.

Das Modell hat auch Kosten. Jeder Disponent braucht eine Dispatcher-Lizenz, und laut Preisliste kostet sie so viel wie eine Technician-Lizenz. Die Zahlen stehen in Teil 1. Wer den Disponenten dauerhaft jeden Termin von Hand prüfen lässt, zahlt für Automatik, die er nicht nutzt.

## Wann kann der Dispatch automatisch laufen?

Field Service kann Termine auch automatisch freigeben. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.pfs_dispatching_appointments.htm&language=en_US&type=5) setzt ein geplanter Job Termine von Scheduled auf Dispatched. Mit Drip Feed hält Field Service dabei nur eine festgelegte Zahl von Terminen in der Warteschlange jedes Technikers, bei einem Wert von zwei also zwei. Ist ein Termin erledigt, rückt der nächste nach. Der Rest des Plans bleibt beweglich.

Den Schritt dorthin würde ich an gemessener Planungsqualität festmachen. Die Leitzahl ist, wie oft der Disponent den Vorschlag der Engine ändert, bevor er freigibt. Eine niedrige Quote allein reicht nicht, denn ein Disponent unter Zeitdruck winkt Vorschläge vielleicht einfach durch. Deshalb sehe ich sie zusammen mit eingehaltenen Reaktionszeiten, Erstlösungsquote, Fehlzuweisungen und der Stabilität des Tagesplans. Ändert er Vorschläge häufig, fehlen Daten oder die Policy passt nicht. Dann hilft es, die Gründe für jede Änderung zu sammeln und in Daten oder Work Rules zu übersetzen. Typische Gründe und was daraus folgt:

| Grund für die Änderung | Was in Field Service fehlt |
|---|---|
| Kunde nur an bestimmten Tagen zugänglich | Arbeitszeiten am Account und die Work Rule für Besuchszeiten |
| Teil nicht im Fahrzeug | Bestand am Fahrzeug als mobilem Standort, dazu eine Prüfung durch den Disponenten oder eigene Automatisierung, die benötigte Teile mit diesem Bestand abgleicht |
| Techniker kennt die Anlage nicht | Skill oder Zertifizierung am Techniker, bei Bedarf ein bevorzugter Techniker am Account |
| Techniker ist an dem Tag in einer Schulung | Abwesenheit in Salesforce |

Bevorzugte, erforderliche oder ausgeschlossene Techniker lassen sich laut [Salesforce-Datenmodell](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) als Resource Preference am Account oder Arbeitsauftrag hinterlegen. Das ersetzt einen Teil des Wissens, das sonst nur im Kopf des Disponenten steht. Ändert er ihn kaum noch und halten die übrigen Zahlen, kann der Dispatch für einfache Arbeitstypen automatisch laufen, etwa für planbare Wartungen. Störungen mit unklarer Ursache oder Einsätze mit Abschaltung beim Kunden bleiben länger beim Disponenten.

So wächst die Automatik mit nachgewiesener Qualität und nicht nach einem Plan, den jemand vor dem Projekt festgelegt hat. Welche Rolle die Ersatzteile dabei spielen, also wer weiß, ob das Teil im Fahrzeug ist, ist Thema des nächsten Teils der Serie.

## Mit Freigabe durch den Disponenten starten

```schritte
Mit Freigabe starten
  Eine mitgelieferte Policy, die zum wichtigsten Ziel passt, die Work Rules für Qualifikationen und Besuchszeiten und die Regel, dass der Disponent jeden Termin freigibt.
Änderungen notieren | 4 Wochen · Disponenten
  Die Disponenten schreiben auf, warum sie einen Vorschlag der Engine ändern.
Gründe in Daten übersetzen
  Aus der Liste werden Arbeitszeiten, Skills, Abwesenheiten, Resource Preferences oder Work Rules.
Dispatch automatisieren
  Ändert der Disponent die Vorschläge kaum noch und halten Reaktionszeiten und Erstlösungsquote, laufen einfache Arbeitstypen wie planbare Wartungen ohne ihn.
```
