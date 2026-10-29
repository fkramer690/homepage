---
title: "Terminplanung im Field Service: Engine, Konsole, Regeln"
description: "Wie Terminplanung in Salesforce Field Service für Hersteller trägt: Stammdaten, Policies, Enhanced Scheduling, neue Konsole, lange Einsätze, Bereitschaft."
lang: de
slug: field-service-terminplanung-disposition
course: field-service
translationKey: fsl-02
chapter: 2
pubDate: 2026-10-28
short: "Terminplanung und Disposition"
summary: "Stammdaten, Scheduling Policies, Enhanced Scheduling, die neue Scheduling Console und mehrtägige Einsätze: was die Planung im Außendienst trägt."
takeaways:
  - "Field Service plant nur so gut wie sechs Arten von Stammdaten: Gebiete mit Arbeitszeiten, Techniker mit Skills, Arbeitstypen, Assets, Besuchszeiten der Kunden und Abwesenheiten."
  - "Eine Scheduling Policy verbindet Work Rules, die Techniker ausschließen, mit gewichteten Service Objectives, die den Rest bewerten. Guter Start: Automatik bis Scheduled, ein Disponent gibt frei."
  - "Enhanced Scheduling and Optimization ist Standard für neue Orgs und die einzige Engine für die neue Scheduling Console; ältere Orgs stellen nach einer Datenprüfung Gebiet für Gebiet um."
  - "Mehrtägige Termine dürfen acht Wochen dauern, die automatische Planung schafft aber nur Einsätze, die in 30 Tage passen, und sie lassen sich nicht mit Complex Work verknüpfen."
  - "Vor dem Go-live brauchen drei Entscheidungen einen Namen: welche Engine, welche Disponentenkonsole und wer die Scheduling Policies verantwortet."
articles: [field-service-master-data, field-service-scheduling-automation, field-service-enhanced-scheduling-eso, field-service-scheduling-console, field-service-multiday-crews-commissioning, field-service-on-call-shifts]
faq:
  - q: "Was ist eine Scheduling Policy in Salesforce Field Service?"
    a: "Eine Scheduling Policy ist der Regelsatz, nach dem die Engine Termine vergibt. Work Rules schließen Techniker aus, die einen Einsatz nicht übernehmen können, etwa weil ein Skill fehlt. Gewichtete Service Objectives bewerten die übrigen Kandidaten, zum Beispiel nach Fahrzeit. Field Service liefert vier Standard-Policies als Startpunkt mit."
  - q: "Brauche ich Enhanced Scheduling and Optimization?"
    a: "Neue Orgs haben die Engine standardmäßig aktiv. Bestehende Orgs brauchen sie für die neue Scheduling Console und bekommen höhere Limits, etwa 250 Skills pro Techniker statt 100. Scheduling Recipes entfallen, und mehrere Work Rules behandeln leere Felder anders. Prüfen Sie deshalb zuerst die Daten und stellen Sie ein Pilotgebiet um."
  - q: "Kann Field Service eine Inbetriebnahme planen, die ein Team zwei Wochen bindet?"
    a: "Ja, als mehrtägigen Termin für eine Crew. Die automatische Planung übernimmt ihn, solange der Einsatz in 30 Tage passt. Längere Einsätze planen Disponenten von Hand, und eine vorgelagerte Baustellenbegehung lässt sich nicht per Complex Work mit dem mehrtägigen Termin verknüpfen."
  - q: "Wie bildet Field Service Bereitschaft am Wochenende ab?"
    a: "Mit bestätigten Schichten außerhalb der Arbeitszeiten des Gebiets. Eine Schicht vom Typ Extended nimmt nur Termine an, wenn die Scheduling Policy Überstunden erlaubt, und Filterkriterien beschränken sie auf Störungen. In Deutschland bestimmt der Betriebsrat bei Bereitschaftsplänen mit."
  - q: "Ersetzt ein KI-Agent den Disponenten?"
    a: "Bei Herstellern auf absehbare Zeit nicht. Agenten buchen Standardtermine und füllen Lücken, Winter '27 bringt die Buchung per Telefon. Störungen mit unklarer Ursache, Abschaltungen beim Kunden und lange Einsätze brauchen weiter einen Disponenten, der weiß, was nicht in den Daten steht."
draft: false
---

Terminplanung in Salesforce Field Service trägt, wenn vier Dinge stimmen: saubere Stammdaten, eine Scheduling Policy, die so denkt wie Ihre Disponenten, die richtige Engine und eine Konsole, der die Disponenten vertrauen. Bei Herstellern starte ich mit Automatik bis zum Status Scheduled und einem Disponenten, der jeden Einsatz freigibt. Die Engine der Wahl ist Enhanced Scheduling and Optimization; ältere Orgs stellen Gebiet für Gebiet um. Die neue Scheduling Console läuft nur damit und kann noch nicht alles, was die Classic Dispatch Console kann. Lange Einsätze, Crews und Bereitschaft haben jeweils ein eigenes Modell mit klaren Grenzen. Engine, Konsole und Policy-Verantwortung entscheiden Sie vor dem Go-live.

## Was braucht die Planung, bevor die Engine läuft?

Field Service, das Salesforce heute als [Field Service and Operations](https://www.salesforce.com/de/products/field-service/pricing) verkauft, entscheidet mit den Daten, die es hat. Ob sich das Produkt lohnt und welche Rolle welche Lizenz braucht, steht in Kapitel 1, [Nutzen und Lizenzen](../field-service-lohnt-sich-lizenzen/). Dieses Kapitel beginnt dort, wo der erste Techniker eingeplant wird.

Die Engine braucht sechs Arten von Stammdaten, ausführlich beschrieben in [welche Daten die Planung im Field Service braucht](../../../blog/salesforce-field-service-stammdaten/):

- **Servicegebiete mit Arbeitszeiten.** Salesforce empfiehlt bis zu 50 Techniker pro Gebiet.
- **Techniker mit Skills.** Die Stufen reichen von 0 bis 99,99; was eine Stufe bedeutet, legt das Unternehmen fest.
- **Arbeitstypen.** Vorlagen für Jahreswartung, Störungsbehebung oder Inbetriebnahme, mit Dauer und benötigten Skills.
- **Assets.** Die Maschinen beim Kunden, meist aus dem ERP.
- **Besuchszeiten der Kunden.** Arbeitszeiten am Account, die nur zählen, wenn die Work Rule für Besuchszeiten aktiv ist.
- **Abwesenheiten.** Urlaub und Schulungen aus der Zeiterfassung.

Kaum etwas davon entsteht in Field Service. Assets kommen aus dem ERP, Skills aus HR oder dem Schulungssystem, Abwesenheiten aus der Zeiterfassung. Deshalb lege ich für jede Art ein führendes System und einen Verantwortlichen fest, bevor die erste Schnittstelle gebaut wird. Welches System zwischen ERP und Salesforce führt, behandle ich unter [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

Mein Einstieg in die Datenprüfung ist immer derselbe: die gescheiterten Einsätze der letzten drei Monate, jeweils mit Ursache. Teile fehlten, kein Zugang zur Maschine, falscher Techniker, Techniker abwesend. Die häufigste Ursache zeigt, welche Daten zuerst sauber sein müssen.

```praxis
Ich habe Field Service für Wartung, Störungseinsätze und Inbetriebnahmen eingeführt, mit automatischer Planung statt reiner Disposition per Hand. Ob die Engine gute Vorschläge macht, hing dort vor allem an den Stammdaten aus diesem Abschnitt.
```

## Wie entscheidet die Scheduling Engine?

Die Engine vergibt Termine nach einer Scheduling Policy. Work Rules filtern Techniker heraus, die einen Einsatz nicht übernehmen können, etwa Match Skills oder die Regel für Besuchszeiten. Service Objectives bewerten die übrigen mit einem Gewicht: kurze Fahrt, früher Termin, bevorzugter Techniker. Field Service bringt vier Policies mit: Customer First, High Intensity, Soft Boundaries und Emergency. Ich starte mit Customer First und passe die Gewichte an, statt eine Policy von Grund auf zu bauen.

Die zweite Entscheidung betrifft die Reichweite der Automatik. Ein Termin wandert von None zu Scheduled, sobald er Techniker und Zeitfenster hat, und zu Dispatched, wenn er in der App des Technikers freigegeben ist. Zwischen Scheduled und Dispatched kann ein Disponent noch eingreifen. Für Hersteller empfehle ich genau diese Aufteilung zum Start: Die Engine plant, der Disponent prüft und gibt frei. Er weiß, dass ein Kunde vor der Wartung eine Linie abschalten muss, und das steht in keinem Feld.

Die Automatik wächst, wenn Disponenten die Vorschläge kaum noch ändern. Dafür notieren sie vier Wochen lang, warum sie einen Vorschlag geändert haben, und aus jedem Grund wird ein Datum oder eine Work Rule. Den ganzen Weg bis zur automatischen Freigabe mit Drip Feed beschreibe ich in [wie viel Planung im Field Service automatisch laufen darf](../../../blog/salesforce-field-service-terminplanung-automatisieren/).

## Sollten Sie auf Enhanced Scheduling and Optimization umstellen?

Enhanced Scheduling and Optimization, kurz ESO, ist die neuere Engine der Terminplanung. Laut [Field-Service-Leitfaden](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/support_field_service.pdf) haben neue Orgs sie für alle Gebiete aktiv, bestehende Orgs können alle Gebiete auf einmal oder einzeln umstellen. Für eine Org, die mit der älteren Engine live gegangen ist, lautet meine Antwort: ja, aber Gebiet für Gebiet. Die Details stehen in [Enhanced Scheduling and Optimization: jetzt umstellen?](../../../blog/field-service-enhanced-scheduling-umstellen/).

Drei Punkte bestimmen den Aufwand:

- **Höhere Limits.** Laut den [ESO-Limits](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_limits.htm&language=en_US&type=5) kann ein Techniker 250 Skills tragen statt 100, und die Optimierung schafft 50.000 Termine pro rollierenden 24 Stunden oder 500 pro Scheduling-Lizenz. Maschinenbauer mit Skills pro Baureihe, Steuerung und Sicherheitsschulung brauchen diesen Platz.
- **Was wegfällt.** Scheduling Recipes gibt es nicht mehr; Salesforce Help nennt den Flow Fix Schedule Overlaps als Ersatz. Aus Optimization Insights wird der Optimization Hub.
- **Was sich anders verhält.** Laut den [ESO-Hinweisen](https://help.salesforce.com/s/articleView?id=sf.pfs_enhanced_available_considerations.htm&language=en_US&type=5) behandeln mehrere Work Rules leere Felder anders, und ein Termin ohne Gebiet bekommt Kandidaten aus allen Gebieten. Datenlücken, die bisher folgenlos blieben, ändern jetzt Ergebnisse.

### Globale, untertägige oder Einzel-Optimierung?

Die Optimierung ordnet einen Plan nach der ersten Buchung neu. Field Service kennt drei Arten, und jede passt zu einem anderen Einsatzmix:

| Optimierung | Was sie tut | Passt zu |
|---|---|---|
| Global | Ordnet ein oder mehrere Gebiete über mehrere Tage neu, etwa jede Nacht | Geplante Wartung, mehrtägige Anforderungen mit weitem Horizont |
| In-Day | Fängt kurzfristige Änderungen am Einsatztag ab | Störungen, die den Tagesplan verschieben |
| Resource Schedule Optimization | Repariert den Tag eines Technikers nach Absage oder Verspätung und füllt Lücken | Ein verspäteter Einsatz, ein früheres Ende |

Laut [Salesforce Help zur Resource Schedule Optimization](https://help.salesforce.com/s/articleView?id=service.pfs_resource_optimization_user.htm&language=en_US&type=5) ist die Einzel-Optimierung ein taktisches Werkzeug für heute oder morgen. Sie kann anderen Technikern Arbeit wegnehmen, wenn Sie sie nicht auf die Ressource beschränken. Für mehrtägige Anforderungen verweist Help auf die globale Optimierung.

## Scheduling Console oder Classic Dispatch Console?

Salesforce hat inzwischen zwei Oberflächen für Disponenten. Die Classic Dispatch Console ist das bekannte Gantt, mit Summer '26 umbenannt. Die neue Scheduling Console zeigt Gantt, Terminliste und Karte auf einem Bildschirm. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scheduling-console-quick-look/didispatch-smarter-with-the-scheduling-console) gibt es sie nur mit ESO, und sie zeigt lesbare Empfehlungen mit einem **Why?**, das einen vorgeschlagenen Termin per KI erklärt. Anpassungen der alten Konsole übernimmt sie laut Trailhead.

Gleichwertig sind beide noch nicht. In einem [Thread der Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pMqC00AK) vom Mai 2026 hat ein Salesforce-Mitarbeiter das bestätigt, nachdem ein Kunde Ansichten mit langem Horizont wie Utilization und Long-Term vermisst hatte. Für Hersteller zählt das: Wer Jahreswartungen Wochen im Voraus plant, arbeitet genau in diesen Ansichten. Ein Abschaltdatum für die Classic Dispatch Console habe ich bis Oktober 2026 nicht gefunden. Deshalb lasse ich zuerst zwei Disponenten die neue Konsole in einem Gebiet testen. Den Testplan finden Sie in [Scheduling Console im Field Service: Disponenten umstellen?](../../../blog/field-service-scheduling-console-disponenten/).

## Wie planen Sie Inbetriebnahmen und andere lange Einsätze?

Field Service ist für viele kurze Einsätze pro Tag gebaut. Inbetriebnahmen, Generalüberholungen und Umbauten binden ein Team tagelang beim Kunden. Dafür hat Field Service drei Werkzeuge, und jedes hat eine Grenze, die das Design bestimmt:

- **Mehrtägige Termine** dürfen laut [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5) bis zu acht Kalenderwochen dauern. Buchung, Schedule und Optimierung schaffen nur Einsätze, die in 30 Tage passen. Unter ESO wird ein mehrtägiger Termin nie umgeplant oder aus dem Plan genommen, und die Auslastung ignoriert ihn.
- **Crews** sind eine Serviceressource vom Typ Crew. Abwesenheiten und Effizienz zählen nur an der Crew, nicht an den Mitgliedern, und die Mitglieder bekommen keine Benachrichtigung über die Zuweisung.
- **Complex Work** verknüpft Termine in fester Reihenfolge. Mit ESO plant die Engine eine Gruppe von bis zu fünf abhängigen Terminen ganz oder gar nicht. Mehrtägige Termine können nicht dazugehören.

Die letzte Grenze trifft Inbetriebnahmen am härtesten: Eine Baustellenbegehung lässt sich nicht mit der zweiwöchigen Montage verknüpfen, die auf sie folgt. Kapazitätsbasierte Ressourcen können keine mehrtägigen Einsätze übernehmen, ein Partnerunternehmen, das nur als Kapazität abgebildet ist, fällt also heraus. Meine Regel: Der Projektplan mit Phasen und Meilensteinen bleibt im ERP oder einem Projektwerkzeug, Field Service trägt die Arbeit vor Ort, die Zeiten und die Dokumentation. Den Aufbau beschreibe ich in [mehrtägige Einsätze im Field Service](../../../blog/field-service-mehrtaegige-einsaetze-inbetriebnahme/).

## Bereitschaft und Überstunden

Arbeitszeiten beschreiben die reguläre Arbeitszeit eines Gebiets, meist Montag bis Freitag. Das Objekt Shift ergänzt Arbeitszeit außerhalb davon: Wochenendbereitschaft, Nächte, Überstunden. Für die Planung zählen nur bestätigte Schichten. Eine Schicht vom Typ Extended nimmt nur Termine an, wenn die Work Rule Service Resource Availability in der Policy Überstunden erlaubt, und Filterkriterien beschränken eine Schicht auf bestimmte Einsätze, etwa Störungen mit hoher Priorität.

Eine typische Überraschung nach dem Go-live: Ein Vertrag verspricht einen Techniker binnen 24 Stunden, am Samstag steht eine Maschine, und der Termin bleibt auf None, weil keine bestätigte Schicht existiert. Entitlement, Schicht und Policy müssen zusammenpassen. In Deutschland bestimmt der Betriebsrat bei Bereitschaftsplänen und Überstunden nach [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) mit. Einrichtung und Abstimmungspunkte stehen in [Bereitschaftsdienst im Field Service](../../../blog/field-service-bereitschaft-schichten/).

## Wo bleibt der Disponent, wenn KI-Agenten planen?

Salesforce bewegt die Terminplanung in Richtung Agenten. Das Füllen von Lücken nach Absagen ist für Disponenten allgemein verfügbar, und Kunden können über einen Agenten buchen und umbuchen, der mit Flex Credits abgerechnet wird. Die [Highlights zu Winter '27](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) bringen Autonomous Scheduling mit Agentforce Voice: Sprachagenten buchen rund um die Uhr, prüfen die Verfügbarkeit und wählen einen Techniker im passenden Gebiet, während der Kunde am Telefon ist. Dasselbe Release lässt Agentforce Umbuchungsanrufe für Disponenten übernehmen.

Bei einem Maschinenbauer sehe ich den Disponenten an drei Stellen: bei Störungen mit unklarer Ursache, bei Einsätzen, die eine Abschaltung beim Kunden brauchen, und bei langen Einsätzen. Geplante Wartung aus Wartungsplänen ist der erste Kandidat für einen Agenten, weil die Regeln bekannt sind. Welche Agenten heute tragen, steht in [KI-Agenten im Field Service](../../../blog/ki-agenten-aussendienst-field-service/), die Sicht auf die Fertigung im Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/) der KI-Masterclass, Einführung und Kosten in [Kapitel 5](../field-service-ki-agenten-einfuehrung/). Ein Agent bucht mit derselben Policy wie die Engine, alles aus diesem Kapitel gilt also auch für ihn.

## Ein typisches Szenario, als Annahme: vier Disponenten verlassen Excel

Ein typisches Szenario, als Annahme: ein Komponentenhersteller mit 40 Technikern in drei Gebieten und vier Disponenten. Field Service läuft seit 2022 mit der älteren Engine. Zwei Disponenten planen Wartungen in Excel und übertragen Termine in die Classic Dispatch Console, zwei bearbeiten Störungen direkt im Gantt. Alle Zahlen sind Annahmen und sollen das Vorgehen zeigen.

```schritte
Daten | Woche 1 bis 3
  Die gescheiterten Einsätze eines Quartals gehen meist auf fehlende Skills und fehlende Besuchszeiten zurück. Skills kommen per Schnittstelle aus dem Schulungssystem, Besuchszeiten pflegt der Innendienst. Ein Bericht findet 8 Prozent offene Termine ohne Gebiet.
Policy | Woche 4 bis 6
  Customer First mit angepassten Gewichten für Wartungen, Emergency mit erlaubten Überstunden für Störungen. Ein Scheduling Recipe für verspätete Einsätze wird als Flow Fix Schedule Overlaps neu gebaut.
Pilot | Woche 7 bis 10
  Ein Gebiet wechselt auf ESO. Die Engine plant, die Disponenten geben frei und notieren jede Änderung mit Grund. Zwei Disponenten bekommen für dieses Gebiet das Permission Set der Scheduling Console.
Entscheidung | Woche 11
  Im Pilotgebiet ändern die Disponenten nicht mehr Vorschläge als vorher, also folgen die anderen Gebiete. Die Wartungsplanerin behält die Classic Dispatch Console für die Ansichten mit langem Horizont, bis die neue Konsole sie hat.
Bereitschaft | parallel
  Wochenendschichten pro Region entstehen aus einem Muster und werden bestätigt, sobald der Betriebsrat den Plan für das Quartal freigegeben hat.
```

Nach Woche 10 ist die Excel-Liste weg. Die Disponenten entscheiden weiter, aber auf Basis eines Vorschlags statt eines leeren Kalenders.

## Was Sie vor dem Go-live entscheiden

Drei Entscheidungen brauchen einen Namen, bevor ein Partner die Terminplanung konfiguriert:

- **Engine.** ESO für jedes Gebiet, bei älteren Orgs mit einem Datum. Ohne Datum wird der Wechsel verschoben.
- **Konsole.** Welche Disponenten auf die Scheduling Console wechseln und welche Ansichten sie täglich brauchen.
- **Policy-Verantwortung.** Eine Person im Servicemanagement verantwortet Scheduling Policies, Work Rules und Gewichte und gibt jede Änderung frei.

```hinweis achtung
Policies, Work Rules, Arbeitszeiten und Gebiete sind Datensätze und keine Metadaten. Ein Metadaten-Deployment nimmt sie nicht mit, sie gehören deshalb in die Pipeline, wie im Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/) der DevOps-Masterclass beschrieben. Sonst laufen getestete Sandbox und Produktion nach der ersten Änderung auseinander.
```

Wo das Planungsdesign ERP, Projektwerkzeuge und Partner berührt, unterstütze ich bei der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/). Der nächste Schritt für die Techniker ist die App: [Kapitel 3](../field-service-mobile-app-dokumente/) behandelt Offline-Daten, Formulare und Serviceberichte, die [Übersicht](../) zeigt alle Kapitel.

Gute Terminplanung im Field Service beginnt mit sauberen Daten und einer verantwortlichen Person für die Policies, Engine, Konsole und Agenten bauen darauf auf.
