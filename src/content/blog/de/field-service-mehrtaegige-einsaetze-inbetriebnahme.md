---
title: "Mehrtägige Einsätze im Field Service: Montage und Teams"
description: "Inbetriebnahmen und Revisionen in Salesforce Field Service planen: mehrtägige Termine, Crews und Complex Work, und welche Grenzen Sie zuerst treffen."
pubDate: 2026-10-28
lang: de
slug: field-service-mehrtaegige-einsaetze-inbetriebnahme
translationKey: field-service-multiday-crews-commissioning
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Mehrtägige Einsätze, Crews, Inbetriebnahme, Terminplanung]
takeaways:
  - "Salesforce Field Service plant lange Einsätze als mehrtägige Termine von bis zu acht Kalenderwochen, die automatische Planung und Optimierung erfassen aber nur Einsätze, die in 30 Tage passen."
  - "Mehrtägige Termine lassen sich nicht mit Complex Work kombinieren und nicht kapazitätsbasierten Ressourcen zuweisen. Ein Partner, der nur als Kapazität abgebildet ist, kann keine Inbetriebnahme übernehmen."
  - "Eine Crew ist eine eigene Serviceressource. Die Planung berücksichtigt Abwesenheiten und Effizienz der Crew, nicht die ihrer Mitglieder, und Mitglieder bekommen keine Zuweisungsbenachrichtigung."
  - "Mit Enhanced Scheduling and Optimization plant eine Abhängigkeitsgruppe bis zu fünf Termine ganz oder gar nicht, und mehrtägige Termine werden nie umgeplant oder verworfen."
  - "Bei Inbetriebnahmen plane ich Vorabbesichtigung und Haupteinsatz als getrennte Termine und halte den Projektplan außerhalb des Gantt."
faq:
  - q: "Wie lang darf ein mehrtägiger Termin in Salesforce Field Service sein?"
    a: "Laut Salesforce-Hilfe kann ein mehrtägiger Termin bis zu acht Kalenderwochen umfassen. Appointment Booking, Schedule und Optimierung erfassen nur bis zu 30 Tage, weil ihr Suchhorizont 30 Tage beträgt. Längere Einsätze planen Disponenten von Hand."
  - q: "Kann eine Crew einen mehrtägigen Termin übernehmen?"
    a: "Ja. Eine Crew ist eine Serviceressource vom Typ Crew und kann einen mehrtägigen Termin wie ein einzelner Techniker bekommen. Die Planung nutzt dann Abwesenheiten, Effizienz und Heimatstandort der Crew, nicht die der Mitglieder."
  - q: "Kann ich einen mehrtägigen Termin per Complex Work mit anderen Terminen verknüpfen?"
    a: "Nein. Die Salesforce-Hilfe schreibt, dass mehrtägige Planung und Complex Work nicht kombinierbar sind. Eine vorgelagerte Besichtigung muss deshalb der Disponent oder eine eigene Automatisierung in die richtige Reihenfolge bringen."
  - q: "Werden Crew-Mitglieder über eine Zuweisung informiert?"
    a: "Nein. Laut Salesforce-Hilfe bekommen Crew-Mitglieder keine Zuweisungsbenachrichtigung und werden nicht automatisch als Follower eingetragen. Eigene Push-Benachrichtigungen schließen diese Lücke."
draft: false
---

Salesforce Field Service kann Inbetriebnahmen, Revisionen und andere Einsätze planen, bei denen ein Team mehrere Tage beim Kunden arbeitet, allerdings mit klaren Grenzen. Ein mehrtägiger Termin darf bis zu acht Kalenderwochen umfassen, die automatische Planung und Optimierung erfassen aber nur Einsätze, die in 30 Tage passen. Teams bilden Sie als Crews ab, die die Planung wie eine Ressource behandelt. Complex Work verknüpft Termine in fester Reihenfolge, lässt sich aber nicht mit mehrtägigen Terminen kombinieren. Bei Herstellern, deren Außendienst vor allem Inbetriebnahmen fährt, plane ich deshalb den langen Einsatz in Field Service und halte den Projektplan mit seinen Phasen im ERP oder einem Projektwerkzeug.

## Warum brauchen lange Einsätze ein eigenes Planungsmodell?

Field Service ist für viele kurze Einsätze pro Techniker und Tag gebaut. Dort lohnt sich Routen- und Terminoptimierung, wie in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/) beschrieben. Salesforce verkauft das Produkt heute als Field Service and Operations, die Planungslogik ist dieselbe geblieben.

Eine Linieninbetriebnahme beim Kunden sieht anders aus. Drei Personen arbeiten zwei Wochen an einem Standort, reisen einmal an und brauchen Zeichnungen, Prüfprotokolle und die Abnahme des Kunden. Niemand optimiert am Nachmittag ihre Route. Wichtig ist, dass das Team für die richtigen Tage geblockt ist, dass niemand zwischendurch eine Wartung für sie einplant und dass die Vorarbeiten erledigt sind, wenn sie ankommen.

Field Service hat dafür drei Werkzeuge: mehrtägige Termine, Crews und Complex Work. Jedes löst einen Teil des Problems, und jedes hat Grenzen, die Sie kennen sollten, bevor ein Partner die Lösung entwirft. Alle drei gehören in [Kapitel 2 der Masterclass Field Service](../../masterclass/field-service/field-service-terminplanung-disposition/), neben Stammdaten und Scheduling Policies.

## Wie funktionieren mehrtägige Termine?

Ein mehrtägiger Termin ist ein normaler Servicetermin (Service Appointment), bei dem das Feld Is MultiDay gesetzt ist. Laut [Salesforce-Hilfe zu mehrtägigen Einsätzen](https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5) schaltet ein Admin die Funktion in den Field-Service-Einstellungen ein. Disponenten bekommen in der Classic Dispatch Console die Long-Term-Gantt-Ansicht, die bis zu sechs Monate und bis zu 1.000 Termine zeigt.

Diese Regeln zählen in der Praxis:

- **Länge.** Ein mehrtägiger Termin kann bis zu acht Kalenderwochen umfassen. Appointment Booking, Schedule und Optimierung arbeiten nur bis 30 Tage, weil ihr Suchhorizont 30 Tage beträgt. Der ganze Termin muss in dieses Fenster passen.
- **Arbeitszeit.** Geplanter Start und geplantes Ende müssen in den Arbeitszeiten des Technikers liegen. Die Besuchszeiten des Kunden am Arbeitsauftrag werden nicht berücksichtigt.
- **Fahrt.** Die Spanne enthält die tägliche Fahrt vom und zum Heimatstandort, einstellbar an der Work Rule Service Resource Availability.
- **Blockade.** Während eines mehrtägigen Termins kann die Ressource keine anderen Termine übernehmen.
- **Keine Kapazität.** Mehrtägige Termine lassen sich nicht kapazitätsbasierten Ressourcen zuweisen.

Mit Enhanced Scheduling and Optimization (ESO), der neueren Planungs-Engine, ändern sich zwei weitere Dinge. Andere Termine können um einen mehrtägigen Termin herum nur früher oder später am Tag rutschen, er selbst wird nie umgeplant oder verworfen, auch nicht für einen Auftrag mit hoher Priorität. Und die Auslastung ignoriert mehrtägige Termine. Ein Inbetriebnahme-Team, das zwei Wochen beim Kunden ist, sieht in den Auslastungszahlen also untätig aus. Was der Wechsel zu ESO sonst bedeutet, steht in [Enhanced Scheduling and Optimization: jetzt umstellen?](../field-service-enhanced-scheduling-umstellen/).

## Wie funktionieren Crews für ein Inbetriebnahme-Team?

Eine Crew ist eine Gruppe von Technikern, die die Planung als eine Einheit behandelt. Technisch ist sie eine Serviceressource vom Typ Crew. Laut [Salesforce-Hilfe zu Crews](https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_service_crews_considerations.htm&type=5) gelten diese Regeln:

- Nur aktive Ressourcen vom Typ Technician können Mitglied werden, und Crews können keine Crews enthalten. Mitglieder brauchen eine Mitgliedschaft im Servicegebiet der Crew, und ein Techniker kann in mehreren Crews sein, wenn sich die Zeiträume nicht überschneiden.
- Abwesenheiten zählen nur an der Ressource der Crew. Ist ein Mitglied im Urlaub, sieht die Planung das nicht.
- Die Effizienz der Crew bestimmt das geplante Ende. Die Effizienz der Mitglieder wird ignoriert.
- Nur der Standort des Crew-Leiters wird verfolgt, und die Ressource der Crew ist der Heimatstandort für Fahrzeiten.
- Mitglieder bekommen keine Zuweisungsbenachrichtigung und werden beim Dispatch nicht als Follower eingetragen.
- Arbeitstypen, Arbeitsaufträge und Positionen tragen eine minimale und eine empfohlene Crew-Größe. Nur das Minimum wirkt auf die Planung.
- Mit Skill Grouping berücksichtigt die Planung die Qualifikationen aller Mitglieder zusammen.

Für ein Inbetriebnahme-Team heißt das: Die Crew braucht sorgfältige Pflege. Ein Urlaub wird entweder zu einer geänderten Crew-Mitgliedschaft oder, wenn die Crew ohne diese Person nicht arbeiten kann, zu einer Abwesenheit an der Crew. Sonst zeigt der Plan drei Personen, wo nur zwei ankommen.

## Was leistet Complex Work, und wo hört es auf?

Complex Work verknüpft Termine in einer festen Reihenfolge. Die [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_fsl__time_dependency__c.htm) nennt vier Abhängigkeitstypen: Same Start, Start After Finish, Start After Finish And Same Day und Immediately Follow. Ein eigenes Kennzeichen legt fest, ob beide Termine an dieselbe Ressource gehen.

Laut [Salesforce-Hilfe zu Complex Work](https://help.salesforce.com/s/articleView?id=pfs_complex_work_considerations.htm&language=en_US&type=0) plant ESO eine Abhängigkeitsgruppe ganz oder gar nicht, mit bis zu fünf Terminen pro Gruppe. Größere Gruppen planen Disponenten von Hand. Ohne ESO werden Abhängigkeiten nur paarweise geprüft, Ketten aus drei oder mehr Terminen können also reißen. Kapazitätsbasierte Ressourcen lassen sich abhängigen Terminen nicht automatisch zuweisen.

Die Grenze, die Inbetriebnahmen am stärksten trifft: Mehrtägige Planung und Complex Work sind nicht kombinierbar. Eine Besichtigung mit anschließender zweiwöchiger Inbetriebnahme lässt sich nicht per Abhängigkeit verknüpfen.

| Bedarf | Funktion | Grenze, die zählt |
|---|---|---|
| Team 12 Tage vor Ort | Mehrtägiger Termin | Automatisch nur bis 30 Tage |
| Drei Personen als Einheit | Crew | Abwesenheiten und Benachrichtigungen nur auf Crew-Ebene |
| Besichtigung vor Montage | Complex Work | Nicht mit mehrtägigen Terminen |
| Partner stellt einen Monteur | Einzelne Serviceressource | Partner als Kapazität können keine mehrtägigen Einsätze übernehmen |

## Ein typisches Szenario, als Annahme

Ein Hersteller von Verpackungsmaschinen nimmt beim Kunden eine Linie in Betrieb. Die Inbetriebnahme dauert 12 Arbeitstage mit einer Crew aus drei Personen: Crew-Leiter, Mechaniker und Elektriker. Zwei Wochen vorher findet eine eintägige Besichtigung statt. Der Elektriker kommt von einem Servicepartner.

So würde ich das in Field Service aufsetzen:

1. **Besichtigung als eigener Termin.** Sie bekommt einen Arbeitstyp mit der Qualifikation "Vor-Ort-Besichtigung" und wird normal geplant. Weil keine Abhängigkeit zum mehrtägigen Termin möglich ist, setzt ein Flow den frühestmöglichen Start der Inbetriebnahme auf den Tag nach der abgeschlossenen Besichtigung.
2. **Inbetriebnahme als mehrtägiger Termin.** 12 Arbeitstage sind etwa 16 Kalendertage. Das passt in den 30-Tage-Horizont, die Planung kann die Crew also noch vorschlagen.
3. **Crew mit fester Mitgliedschaft.** Der Elektriker des Partners ist eine eigene Serviceressource, wie in [Wie bindet man Servicepartner ein?](../salesforce-field-service-servicepartner/) beschrieben. Ein Partner, der nur als Kapazität abgebildet ist, könnte an diesem Einsatz nicht teilnehmen.
4. **Benachrichtigungen.** Eine eigene Push-Benachrichtigung informiert beim Dispatch alle drei Mitglieder, weil Field Service das für Crew-Mitglieder nicht tut.
5. **Phasen außerhalb des Gantt.** Mechanische Montage, elektrische Inbetriebnahme, Probelauf und Abnahme bleiben als Meilensteine im Projektplan des ERP. Der Termin trägt die Arbeit, die Zeiten und die Dokumentation.

Dauerte die Inbetriebnahme sechs Wochen, würde ich den Termin von Hand planen oder in zwei mehrtägige Termine von je drei Wochen teilen. Jede Teilung bringt zusätzliche Abstimmung, deshalb mache ich das nur, wenn die automatische Planung wirklich hilft.

## Wann sollten lange Einsätze außerhalb von Field Service bleiben?

Meine Regel: Besteht Ihr Außendienst überwiegend aus Inbetriebnahmen und Revisionen, lohnt sich Field Service für die Planung allein selten. Die Engine hat wenig zu optimieren, wenn ein Team zwei Wochen gebucht ist. Field Service verdient seinen Platz, wenn dieselben Techniker zwischen den Projekten auch Wartungen und Störungseinsätze fahren, weil dann beide Arten von Arbeit in einem Plan landen.

Zwei Entscheidungen gehören in das Design, bevor ein Partner etwas baut. Erstens: Welches System hält den Projektplan mit Phasen und Terminen, und wie kommen die Termine an das Service Appointment? Zweitens: Wie schützen Disponenten lange Einsätze vor kurzen? Die Scheduling Policy aus [Wie viel Planung darf automatisch laufen?](../salesforce-field-service-terminplanung-automatisieren/) braucht dafür eine klare Regel. Wo die Architekturfrage über Field Service hinausgeht, beschreibe ich mein Vorgehen unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

## Wo sollten Sie anfangen?

Nehmen Sie Ihre letzten zehn Inbetriebnahmen und notieren Sie Dauer, Teamgröße, Vorarbeiten und ob Partner beteiligt waren. Bleiben die meisten unter 30 Tagen und sind die Teams stabil, tragen mehrtägige Termine mit Crews die Planung. Laufen viele länger oder haben mehr als fünf verknüpfte Schritte, halten Sie den Projektplan außerhalb und nutzen Field Service für die Arbeit vor Ort.

Field Service plant mehrtägige Einsätze und Crews gut, solange sie in 30 Tage passen und ohne Abhängigkeiten auskommen, bei längeren Einsätzen muss ein Projektplan die Last tragen. Wenn Sie Ihren Inbetriebnahme-Prozess an diesen Grenzen prüfen möchten, [schreiben Sie mir](#contact).
