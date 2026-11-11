---
title: "Mehrtägige Field-Service-Einsätze: Inbetriebnahme und Crews"
description: "Inbetriebnahmen und Revisionen in Salesforce Field Service planen: mehrtägige Termine, Crews und Complex Work, und an welche Grenzen Sie zuerst stoßen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-mehrtaegige-einsaetze-inbetriebnahme
translationKey: field-service-multiday-crews-commissioning
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Mehrtägige Einsätze, Crews, Inbetriebnahme, Terminplanung]
takeaways:
  - "Ein mehrtägiger Termin darf bis zu acht Kalenderwochen umfassen. Automatische Planung und Optimierung erfassen aber nur Einsätze, die ganz in 30 Tage passen."
  - "Mehrtägige Termine lassen sich nicht mit Complex Work kombinieren und nicht Kapazitätsressourcen zuweisen. Ein reiner Kapazitätspartner fällt also aus."
  - "Eine Crew ist eine eigene Serviceressource. Die Planung sieht nur ihre Abwesenheiten, und Mitglieder erhalten keine Zuweisungsbenachrichtigung."
  - "ESO plant eine Abhängigkeitsgruppe von bis zu fünf Terminen ganz oder gar nicht ein. Nur Optimierungsläufe dürfen mehrtägige Termine verschieben oder entfernen."
  - "Bei Inbetriebnahmen plane ich Vorabbesichtigung und Haupteinsatz als getrennte Termine und halte den Projektplan außerhalb des Gantt-Diagramms."
faq:
  - q: "Wie lang darf ein mehrtägiger Termin in Salesforce Field Service sein?"
    a: "Laut Salesforce-Hilfe kann ein mehrtägiger Termin bis zu acht Kalenderwochen umfassen. Appointment Booking, Schedule und Optimierung erfassen nur bis zu 30 Tage, weil ihr Suchhorizont 30 Tage beträgt. Längere Einsätze planen Disponenten von Hand."
  - q: "Kann eine Crew einen mehrtägigen Termin übernehmen?"
    a: "Ja. Eine Crew ist eine Serviceressource vom Typ Crew und kann einen mehrtägigen Termin wie ein einzelner Techniker erhalten. Die Planung nutzt dann Abwesenheiten, Effizienz und Heimatstandort der Crew, nicht die der Mitglieder."
  - q: "Kann ich einen mehrtägigen Termin per Complex Work mit anderen Terminen verknüpfen?"
    a: "Nein. Die Salesforce-Hilfe schreibt, dass mehrtägige Planung und Complex Work nicht kombinierbar sind. Deshalb muss der Disponent oder eine eigene Automatisierung eine vorgelagerte Besichtigung in die richtige Reihenfolge bringen, etwa indem der Haupteinsatz erst nach abgeschlossener Besichtigung zur Planung freigegeben wird."
  - q: "Werden Crew-Mitglieder über eine Zuweisung informiert?"
    a: "Nein. Laut Salesforce-Hilfe erhalten Crew-Mitglieder keine Zuweisungsbenachrichtigung und werden nicht automatisch als Follower eingetragen. Eigene Push-Benachrichtigungen schließen diese Lücke."
draft: false
---

Salesforce Field Service kann Inbetriebnahmen, Revisionen und andere Einsätze planen, bei denen ein Team mehrere Tage beim Kunden arbeitet, allerdings mit klaren Grenzen. Ein mehrtägiger Termin darf bis zu acht Kalenderwochen umfassen, die automatische Planung und Optimierung erfassen aber nur Einsätze, die in 30 Tage passen. Teams bilden Sie als Crews ab, die von der Planung wie eine Ressource behandelt werden. Complex Work legt zeitliche Beziehungen zwischen Terminen fest, lässt sich aber nicht mit mehrtägigen Terminen kombinieren. Bei Herstellern, deren Außendienst vor allem Inbetriebnahmen durchführt, plane ich deshalb meist den langen Einsatz in Field Service und halte den Projektplan mit seinen Phasen im ERP oder einem Projektwerkzeug.

## Lange Einsätze brauchen ein eigenes Planungsmodell

Routen- und Terminoptimierung lohnt sich am meisten bei vielen kurzen Einsätzen pro Techniker und Tag, wie in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/) beschrieben. Sie bringt weniger, wenn eine Crew wochenlang an einem Standort bleibt und es wenig konkurrierende Aufträge zu optimieren gibt. Die Salesforce-Hilfe nennt das Produkt inzwischen Agentforce Field Service and Operations, früher Field Service; Teile der Website und Dokumentation nutzen noch die kürzeren Namen.

Eine Linieninbetriebnahme beim Kunden sieht anders aus. Drei Personen arbeiten zwei Wochen an einem Standort, reisen einmal an und brauchen Zeichnungen, Prüfprotokolle und die Abnahme des Kunden. Niemand optimiert am Nachmittag ihre Route. Wichtig ist, dass das Team für die richtigen Tage geblockt ist, dass niemand zwischendurch eine Wartung für sie einplant und dass die Vorarbeiten erledigt sind, wenn sie ankommen.

Field Service hat dafür drei Werkzeuge: mehrtägige Termine, Crews und Complex Work. Jedes löst einen Teil des Problems, und jedes hat Grenzen, die Sie kennen sollten, bevor ein Partner die Lösung entwirft. Alle drei gehören in [Kapitel 2 der Masterclass Field Service](../../masterclass/field-service/field-service-terminplanung-disposition/), neben Stammdaten und Scheduling Policies.

## Wie funktionieren mehrtägige Termine?

Ein mehrtägiger Termin ist ein normaler Servicetermin (Service Appointment), bei dem das Feld Is MultiDay gesetzt ist. Laut [Salesforce-Hilfe zu mehrtägigen Einsätzen](https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5) schaltet ein Admin die Funktion in den Field-Service-Einstellungen ein. Disponenten erhalten eine Langzeitansicht. In der Classic Dispatch Console zeigt das Long-Term-Gantt bis zu sechs Monate und bis zu 1.000 Termine; diese Grenzen gehören zur klassischen Konsole. Die neuere [Scheduling Console](../field-service-scheduling-console-disponenten/) hat eigene Langzeitansichten und zeigt seit Winter '27 einen Einsatz über mehrere Tage als einen zusammenhängenden Auftrag.

Diese Regeln zählen in der Praxis:

- **Länge.** Ein mehrtägiger Termin kann bis zu acht Kalenderwochen umfassen. Appointment Booking, Schedule und Optimierung arbeiten nur bis 30 Tage, weil ihr Suchhorizont 30 Tage beträgt. Der ganze Termin muss in dieses Fenster passen.
- **Arbeitszeit.** Der geplante Start und das geplante Ende müssen in den Betriebszeiten des Technikers liegen. Die Besuchszeiten des Kunden am Arbeitsauftrag werden nicht berücksichtigt.
- **Fahrt.** Die Spanne enthält die tägliche Fahrt vom und zum Heimatstandort, einstellbar an der Work Rule Service Resource Availability.
- **Blockade.** Während eines mehrtägigen Termins kann die Ressource keine anderen Termine übernehmen.
- **Keine Kapazität.** Mehrtägige Termine lassen sich nicht kapazitätsbasierten Ressourcen zuweisen.

Mit Enhanced Scheduling and Optimization (ESO), der neueren Planungs-Engine, gilt zweierlei. Laut [Salesforce-Hilfe zur Multiday Work Optimization](https://help.salesforce.com/s/articleView?id=service.pfs_multiday_optimization.htm&language=en_US&type=5) können Global Optimization und In-Day Optimization mehrtägige Einsätze inzwischen planen, verschieben oder entfernen, etwa um Arbeit am selben Standort zu bündeln oder für einen Notfall einen niedriger priorisierten mehrtägigen Einsatz herauszunehmen. Appointment Booking, Get Candidates, Book Appointment, Drag and Drop, manuelles Umplanen und Auto-Dispatch tun das nicht. Und in der Classic Dispatch Console ignoriert die Auslastungsanzeige unter ESO mehrtägige Termine. Ein Inbetriebnahme-Team, das zwei Wochen beim Kunden ist, wird dort also als untätig dargestellt. Arbeiten Ihre Disponenten schon in der Scheduling Console, prüfen Sie in einer Sandbox, wie sie mehrtägige Arbeit zählt. Was der Wechsel zu ESO sonst bedeutet, steht in [Enhanced Scheduling and Optimization: jetzt umstellen?](../field-service-enhanced-scheduling-umstellen/).

## Wie funktionieren Crews für ein Inbetriebnahme-Team?

Eine Crew ist eine Gruppe von Technikern, die von der Planung als eine Einheit behandelt wird. Technisch ist sie eine Serviceressource vom Typ Crew. Laut [Salesforce-Hilfe zu Crews](https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_service_crews_considerations.htm&type=5) gelten diese Regeln:

- Nur aktive Ressourcen vom Typ Technician können Mitglied werden, und Crews können keine Crews enthalten. Mitglieder brauchen eine Mitgliedschaft im Servicegebiet der Crew, und ein Techniker kann in mehreren Crews sein, wenn sich die Zeiträume nicht überschneiden.
- Abwesenheiten werden nur für die Crew-Ressource berücksichtigt. Ist ein Mitglied im Urlaub, sieht die Planung das nicht.
- Die Effizienz der Crew bestimmt das geplante Ende. Die Effizienz der Mitglieder wird ignoriert.
- Nur der Standort des Crew-Leiters wird verfolgt; für die Fahrzeit gilt der Heimatstandort der Crew-Ressource.
- Mitglieder erhalten keine Zuweisungsbenachrichtigung und werden beim Dispatch nicht als Follower eingetragen.
- Arbeitstypen, Arbeitsaufträge und Positionen tragen eine minimale und eine empfohlene Crew-Größe. Nur das Minimum wirkt auf die Planung.
- Mit Skill Grouping berücksichtigt die Planung die Qualifikationen aller Mitglieder zusammen.

Für ein Inbetriebnahme-Team heißt das: Die Crew braucht sorgfältige Pflege. Ein Urlaub wird entweder zu einer geänderten Crew-Mitgliedschaft oder, wenn die Crew ohne diese Person nicht arbeiten kann, zu einer Abwesenheit an der Crew. Sonst zeigt der Plan drei Personen, obwohl nur zwei ankommen.

## Complex Work verknüpft bis zu fünf Termine

Complex Work legt zeitliche Beziehungen zwischen Terminen fest, etwa einen gemeinsamen Start oder einen Start nach Ende eines anderen Termins.

```vertiefung Für Admins
titel: Welche Abhängigkeitstypen kennt Complex Work?
Die [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_fsl__time_dependency__c.htm) nennt vier Abhängigkeitstypen: Same Start, Start After Finish, Start After Finish And Same Day und Immediately Follow. Ein eigenes Kennzeichen legt fest, ob beide Termine derselben Ressource zugewiesen werden.
```

Laut [Salesforce-Hilfe zu Complex Work](https://help.salesforce.com/s/articleView?id=pfs_complex_work_considerations.htm&language=en_US&type=0) plant ESO eine Abhängigkeitsgruppe ganz oder gar nicht, mit bis zu fünf Terminen pro Gruppe. Größere Gruppen planen Disponenten von Hand. Ohne ESO werden Abhängigkeiten nur paarweise geprüft. Ketten aus drei oder mehr Terminen können also reißen. Kapazitätsbasierte Ressourcen lassen sich abhängigen Terminen nicht automatisch zuweisen.

```hinweis achtung
Die Grenze, die Inbetriebnahmen am stärksten trifft: Mehrtägige Planung und Complex Work sind nicht kombinierbar. Eine Besichtigung mit anschließender zweiwöchiger Inbetriebnahme lässt sich nicht per Abhängigkeit verknüpfen.
```

| Bedarf | Funktion | Grenze, die zählt |
|---|---|---|
| Team 12 Tage vor Ort | Mehrtägiger Termin | Automatisch nur bis 30 Tage |
| Drei Personen als Einheit | Crew | Abwesenheiten und Benachrichtigungen nur auf Crew-Ebene |
| Besichtigung vor Montage | Complex Work | Nicht mit mehrtägigen Terminen |
| Partner stellt einen Monteur | Einzelne Serviceressource | Partner als Kapazität können keine mehrtägigen Einsätze übernehmen |

## Rechenbeispiel: eine Verpackungslinie in 12 Arbeitstagen

Die Zahlen sind angenommen. Ein Hersteller von Verpackungsmaschinen nimmt beim Kunden eine Linie in Betrieb. Die Inbetriebnahme dauert 12 Arbeitstage mit einer Crew aus drei Personen: Crew-Leiter, Mechaniker und Elektriker. Zwei Wochen vorher findet eine eintägige Besichtigung statt. Der Elektriker stammt von einem Servicepartner.

So würde ich das in Field Service aufsetzen:

1. **Besichtigung als eigener Termin.** Sie erhält einen Arbeitstyp mit der Qualifikation "Vor-Ort-Besichtigung" und wird normal geplant. Weil keine Abhängigkeit zum mehrtägigen Termin möglich ist, wird die Inbetriebnahme bis zur abgeschlossenen Besichtigung nicht für die automatische Planung freigegeben. Dann setzt ein Flow ihren frühestmöglichen Start auf den Folgetag, und der Disponent plant sie ein. Verschiebt sich die Besichtigung, während die Inbetriebnahme schon geplant ist, verschiebt der Flow die Inbetriebnahme nicht automatisch mit; der Disponent muss umplanen.
2. **Inbetriebnahme als mehrtägiger Termin.** Bei einer Fünftagewoche ohne Feiertage umfassen 12 Arbeitstage etwa 16 Kalendertage. Das passt in den 30-Tage-Horizont. Die Planung kann die Crew also noch vorschlagen.
3. **Crew mit fester Mitgliedschaft.** Der Elektriker des Partners ist eine eigene Serviceressource, wie in [Wie bindet man Servicepartner ein?](../salesforce-field-service-servicepartner/) beschrieben. Ein Partner, der nur als Kapazität abgebildet ist, könnte an diesem Einsatz nicht teilnehmen.
4. **Benachrichtigungen.** Eine eigene Push-Benachrichtigung informiert beim Dispatch alle drei Mitglieder, weil Field Service das für Crew-Mitglieder nicht tut.
5. **Phasen außerhalb des Gantt.** Mechanische Montage, elektrische Inbetriebnahme, Probelauf und Abnahme bleiben als Meilensteine im Projektplan des ERP. Der Termin trägt die Arbeit, die Zeiten und die Dokumentation.

Dauerte die Inbetriebnahme sechs Wochen, würde ich den Termin von Hand planen oder in zwei mehrtägige Termine von je drei Wochen teilen. Jede Teilung bringt zusätzlichen Abstimmungsaufwand mit, deshalb mache ich das nur, wenn die automatische Planung dadurch Vorschläge machen kann.

## Wann sollten lange Einsätze außerhalb von Field Service bleiben?

Meine Regel, als Architekturempfehlung und nicht als Produktgrenze: Besteht Ihr Außendienst überwiegend aus Inbetriebnahmen und Revisionen, lohnt sich Field Service für die Planung allein selten. Die Optimierung mehrtägiger Arbeit hilft, wenn lange und kurze Einsätze um dieselben Leute konkurrieren; ist ein Team einfach zwei Wochen gebucht, hat die Engine wenig zu optimieren. Projektcontrolling, Kosten, Materialtermine, Abnahmen und Änderungsanträge liegen meist ohnehin im ERP oder einem Projektwerkzeug. Field Service verdient seinen Platz, wenn dieselben Techniker zwischen den Projekten auch Wartungen und Störungseinsätze fahren, weil dann beide Arten von Arbeit in einem Plan stehen.

Zwei Entscheidungen gehören in das Design, bevor ein Partner etwas baut. Die erste: Welches System führt den Projektplan mit Phasen und Terminen, und wie werden die Termine mit dem Service Appointment verknüpft? Die zweite: Wie schützen Disponenten lange Einsätze vor kurzen? Die Scheduling Policy aus [Wie viel Planung darf automatisch laufen?](../salesforce-field-service-terminplanung-automatisieren/) braucht dafür eine klare Regel. Wo die Architekturfrage über Field Service hinausgeht, beschreibe ich mein Vorgehen unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

## Die letzten zehn Inbetriebnahmen auswerten

Nehmen Sie Ihre letzten zehn Inbetriebnahmen und notieren Sie Dauer, Teamgröße, Vorarbeiten und ob Partner beteiligt waren. Bleiben die meisten unter 30 Tagen und sind die Teams stabil, tragen mehrtägige Termine mit Crews die Planung. Dauern viele länger oder umfassen sie mehr als fünf verknüpfte Schritte, halten Sie den Projektplan außerhalb und nutzen Field Service für die Arbeit vor Ort.
