---
title: "Field Service Kennzahlen nach dem Go-live: Was messen?"
description: "Welche Kennzahlen nach dem Go-live zeigen, ob Field Service wirkt, wie Sie die Erstlösungsquote definieren und was Operations Home und Dashboards beitragen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-kennzahlen-operations-home
translationKey: field-service-kpis-after-go-live
topic: field-service
categories: [field-service]
tags: [Field Service, Kennzahlen, Erstlösungsquote, Operations Home, Einführung, Analytics]
takeaways:
  - "Ich messe zusätzlich, wie oft Disponenten die Vorschläge der Engine vor der Freigabe ändern. Das zeigt, ob Datenqualität und Scheduling Policy passen."
  - "Das Salesforce-Dashboard berechnet die Erstlösungsquote aus dem Terminstatus. Eine auf Folgeeinsätzen beruhende Definition braucht eine eigene Berechnung."
  - "Die Erstlösungsquote braucht eine schriftliche Definition: Zeitfenster, gleiches Asset, gleicher Fehlercode und welche Folgeeinsätze nicht zählen."
  - "Ohne Ausgangswert aus dem Altsystem mit denselben Definitionen und über Saisonschwankungen hinweg kann niemand sagen, ob Field Service geholfen hat."
faq:
  - q: "Welche Kennzahlen zählen nach einem Field-Service-Go-live?"
    a: "Für einen Business Case mit Fokus auf Terminplanung und Produktivität nutze ich sechs: Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten, Ankunft im zugesagten Zeitfenster und den Anteil der Vorschläge, die Disponenten vor der Freigabe ändern. Dazu mindestens eine finanzielle oder kundenseitige Ergebniszahl, etwa Servicemarge oder Kundenzufriedenheit."
  - q: "Was ist Operations Home in Salesforce Field Service?"
    a: "Eine Startseite für den Innendienst. Im September 2025 beschrieb Salesforce sie mit 12 fertigen Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets, auf Basis von Tableau Next, Data Cloud und Agentforce. Prüfen Sie die aktuelle Vorlage in Ihrem Release."
  - q: "Ist Field Service Intelligence in der Field-Service-Lizenz enthalten?"
    a: "Nicht in jeder Edition. Mit Stand 9. November 2026 führt die Preisliste Field Service Intelligence und Operations Home bei mehreren Editionen als zukaufbar, und Field Service+ Advanced nennt Field Service Intelligence in seinem Umfang. Tableau Next ist für Dispatcher und Technician zukaufbar. Fragen Sie Ihr Account-Team, welche Positionen Sie für Ihre Edition brauchen."
  - q: "Wie berechnet man die Erstlösungsquote?"
    a: "Meine Definition: Anteil der Arbeitsaufträge ohne weiteren Einsatz am selben Asset für denselben Fehler innerhalb eines festen Zeitfensters, zum Beispiel 14 Tage, ohne geplante Folgeeinsätze wie mehrtägige Inbetriebnahmen. Das Dashboard von Field Service Intelligence rechnet anders: abgeschlossene Termine geteilt durch die Summe aus abgeschlossenen und nicht abschließbaren Terminen."
draft: false
---

Nach dem Go-live muss Salesforce Field Service die Kennzahlen aus dem Business Case verbessern. Bei einem Business Case mit Fokus auf Terminplanung und Produktivität sind das Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten und Ankunft im zugesagten Zeitfenster. Ich ergänze eine Kennzahl: wie oft Disponenten die Vorschläge der Engine vor der Freigabe ändern. Salesforce bietet fertige Ansichten in Operations Home und Field Service Intelligence, aber deren Erstlösungsquote beruht auf dem Terminstatus, nicht auf Folgeeinsätzen. Bevor Sie ein Dashboard bauen, legen Sie fest, wie jede Kennzahl definiert ist, und messen einen Ausgangswert im Altsystem.

## Welche Kennzahlen zeigen, ob Field Service wirkt?

Die Kennzahlen nach dem Go-live sind die vier Zahlen, mit denen ich entscheide, ob sich [Field Service lohnt](/blog/salesforce-field-service-lohnt-sich/), plus zwei, die zeigen, ob die Terminplanung funktioniert. Sie passen zu einem Business Case mit Fokus auf Terminplanung und Produktivität; daneben würde ich mindestens eine Ergebniszahl wie Servicemarge, Vertragsverlängerungen oder Kundenzufriedenheit verfolgen. Diese operative Auswahl würde ich pro Region und Monat verfolgen:

| Kennzahl | Wie ich sie definiere | Woher die Zahl kommt |
|---|---|---|
| Einsätze pro Techniker und Tag | Abgeschlossene Termine geteilt durch produktive Techniker-Tage, Einsätze von Crews einmal gezählt, möglichst nach Arbeitsart gewichtet | Servicetermine (Service Appointments) mit Status Completed |
| Fahrzeitanteil | Fahrzeit geteilt durch Arbeitszeit | Eine vereinbarte Quelle: tatsächliche Fahrzeit an der zugewiesenen Ressource, [Stundenzettel](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5) mit Fahrtkategorie, Telematik oder ERP-Zeitbuchungen |
| Erstlösungsquote | Arbeitsaufträge ohne weiteren Einsatz am selben Asset für denselben Fehler innerhalb von 14 Tagen | Arbeitsauftrag, Asset, Fehlercode |
| Eingehaltene Reaktionszeiten | Störungen, bei denen der Techniker in der zugesagten Zeit vor Ort war | Meilenstein-Ziel am Arbeitsauftrag, verglichen mit dem tatsächlichen Beginn |
| Ankunft im Zeitfenster | Tatsächlicher Beginn im zugesagten Ankunftsfenster | Felder am Service Appointment |
| Änderungsquote der Disposition | Anteil der Vorschläge, die vor dem Status Dispatched geändert werden | Eigener Schnappschuss von Vorschlag und finaler Zuweisung |

Zwei davon bauen auf Standardfeldern auf. Das Objekt Servicetermin (Service Appointment) hat Felder für den [tatsächlichen Beginn und das Ankunftsfenster](https://developer.salesforce.com/docs/service/salesforce-scheduler-dev-guide/guide/sforce-api-objects-serviceappointment.html), ein Bericht kann sie vergleichen, sofern Techniker den Startstatus bei Ankunft setzen und das zugesagte Fenster später nicht überschrieben wird. Reaktionszeiten brauchen Meilensteine am Arbeitsauftrag mit einem Entitlement-Prozess vom Typ Work Order, wie in [Wartungsverträge in Field Service abbilden](/blog/salesforce-field-service-wartungsvertraege/) beschrieben. Der Meilenstein liefert das zugesagte Ziel; ob der Techniker rechtzeitig da war, ergibt sich aus dem tatsächlichen Beginn oder einem definierten Check-in, und eine Regel oder Automation muss beides verbinden.

Die Änderungsquote der Disposition kostet etwas Aufwand und ist in den ersten Monaten die nützlichste Zahl. In [Wie viel Terminplanung automatisch laufen sollte](/blog/salesforce-field-service-terminplanung-automatisieren/) empfehle ich, dass Disponenten notieren, warum sie einen Vorschlag ändern. Eine Auswahlliste mit dem Grund allein misst aber keine Änderungen. Sie brauchen einen Schnappschuss von vorgeschlagener Ressource und Zeit, finaler Ressource und Zeit, wer wann geändert hat, plus den Grund; die Feldhistorie liefert einen Teil davon, wenn die richtigen Felder verfolgt werden. Eine hohe Quote kann heißen, dass Daten fehlen oder die Policy nicht passt. Sie kann aber auch auf Kundenänderungen, Notfälle, Abwesenheiten oder Disponenten zurückgehen, die der Engine noch nicht trauen. Die Gründe zeigen, welche Ursache zutrifft.

## Operations Home und Field Service Intelligence laufen auf Data 360

Salesforce verkauft Field Service heute als Agentforce Field Service and Operations. Die Auswertungen bestehen aus zwei Teilen. Laut [Salesforce-Blog vom September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/):

- **Operations Home** ist die Startseite für den Innendienst, mit 12 fertigen Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets. Sie basiert auf Tableau Next, Data Cloud und Agentforce, Concierge beantwortet Fragen in natürlicher Sprache.
- **Field Service Intelligence** hat fünf fertige Dashboards zu Arbeitsaufträgen, Terminen, Assets, Ersatzteilbestand und Ressourcen, mit mehr als 30 Kennzahlen.

Die aktuelle Einrichtung baut auf Data 360 und Tableau Next auf. Die Salesforce-Hilfe beschreibt außerdem noch eine ältere Fassung von [Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) mit Data 360, CRM Analytics und Agentforce Service; Sie brauchen nicht beide Generationen parallel. Ihr [Service Data Kit](https://help.salesforce.com/s/articleView?id=sf.ifs_install_data_kit.htm&language=en_US&type=5) richtet mehr als 20 Datenströme ein, und die Hilfe warnt davor, installierte Objekte, Felder oder Zuordnungen zu entfernen, weil die Dashboards darauf aufbauen. Tableau Next selbst braucht laut [Einrichtungsanleitung](https://help.tableau.com/current/tableau-next/en-us/tableau_next_setup_guide_configure_data_cloud.htm) zuerst eine konfigurierte Data Cloud.

Die Lizenzfrage ist aus der [Preisliste](https://www.salesforce.com/de/products/field-service/pricing/) nicht eindeutig abzulesen. Salesforce hat die Preisliste Anfang November 2026 umgestellt. Mit Stand 9. November 2026 führt die Vergleichstabelle Tableau Next bei Dispatcher und Technician als zukaufbar. Operations Home und Field Service Intelligence stehen bei mehreren Editionen als zukaufbar, und Field Service+ Advanced nennt Field Service Intelligence in seinem Umfang. Produktlizenz, Nutzerberechtigungen, Tableau-Next-Berechtigungen und Data-360-Verbrauch sind getrennte Fragen.

```hinweis offen
Welche Positionen Sie für Ihre Edition für Operations Home, Field Service Intelligence und Tableau Next brauchen, lassen Sie sich vom Account-Team bestätigen, bevor Sie jemandem ein Dashboard zusagen.
```

Meine Einschätzung: Die fertigen Ansichten lohnen sich, sobald die Definitionen abgestimmt sind und Data 360 ohnehin im Haus ist. Für die erste Welle decken Standardberichte zu Terminen und Arbeitsaufträgen die Zahlen aus dem Business Case ab.

## Die Erstlösungsquote braucht zuerst eine Definition

Ein Kennzahlname ist noch keine Formel. Das [Termin-Dashboard von Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_dashboards_sa.htm&language=en_US&type=5) berechnet die Erstlösungsquote als Termine mit Status Completed geteilt durch Termine mit Completed oder Cannot Complete. Diese Formel erfasst weder einen zweiten Besuch zwei Wochen später noch denselben Fehler am selben Asset. Eine auf Folgeeinsätzen beruhende Definition, wie die meisten Serviceleitungen sie meinen, braucht eine eigene Berechnung oder ein angepasstes Datenmodell. Ich halte fünf Entscheidungen schriftlich fest:

1. **Zeitfenster.** Ein Folgeeinsatz innerhalb von 7, 14 oder 30 Tagen?
2. **Bezug.** Gleiches Asset oder gleicher Kundenstandort?
3. **Fehler.** Gleicher Fehlercode oder jeder weitere Einsatz?
4. **Geplante Folgeeinsätze.** Eine mehrtägige Inbetriebnahme oder ein zweiter Besuch für ein Teil, das vernünftigerweise nicht im Fahrzeug sein konnte, zählen nicht als Fehlschlag. Ein zweiter Besuch, weil ein gängiges Teil im Fahrzeug fehlte, zählt dagegen, denn genau dieses Problem soll das Fahrzeuglager beheben.
5. **Fernlösungen.** Zählt ein Problem, das per Telefon oder Video gelöst wurde, als beim ersten Mal behoben? Mit [Visual Remote Assistance](/blog/visual-remote-assistant-fernhilfe-statt-einsatz/) wächst dieser Anteil, also legen Sie es vor der ersten Videositzung fest.

Die dritte Entscheidung lässt sich nur mit codierten Fehlern umsetzen. Stehen Fehlerursachen im Freitext, fließt jeder weitere Einsatz in die Quote ein, auch die Jahreswartung eine Woche später. Weichen die Definition des Herstellers und Ihre Definition voneinander ab, berichten Sie Ihre Definition und vermerken den Unterschied einmal.

## Wie kommen Sie an einen Ausgangswert aus dem Altsystem?

Messen Sie vor dem Go-live mit denselben Definitionen, die Sie danach verwenden, über einen Zeitraum, der Saisonschwankungen abdeckt; drei Monate sind das Minimum, ein Jahr Historie ist besser, wenn das Altsystem sie hat. Die Daten liegen meist in den Serviceaufträgen des ERP oder im alten Planungswerkzeug: abgeschlossene Einsätze pro Techniker, Fahrzeiten aus Stundenzetteln oder Fahrtenbüchern, Folgeeinsätze pro Maschine. Kann niemand diese Zahlen liefern, ist das schon ein Befund, und er schwächt jeden Business Case.

Vergleichen Sie dann pro Region und pro Welle. Die [Einführung in Wellen](/blog/salesforce-field-service-einfuehrung/) liefert eine Vergleichsgruppe: Regionen, die noch nicht live sind, arbeiten im alten Prozess. Hatten vergleichbare Regionen vor dem Go-live ähnliche Verläufe und verbessert sich nur die Live-Region, spricht das dafür, dass die Einführung beigetragen hat. Ein Beweis ist es nicht, weil Regionen sich in Kunden, Personal und Saison unterscheiden.

## Rechenbeispiel: Ausgangswert und erste Welle

Angenommen ist ein Komponentenhersteller mit 90 Technikern in drei Regionen, SAP als ERP und einer Einführung in drei Wellen.

**Ausgangswert aus SAP-Serviceaufträgen und Stundenzetteln.** 2,1 Einsätze pro Techniker und Tag, 38 Prozent Fahrzeitanteil, 71 Prozent Erstlösungsquote (14 Tage, gleiches Asset, gleicher Fehlercode), 84 Prozent der Störungen in der zugesagten Reaktionszeit.

**Region eins, drei Monate nach dem Go-live.** 2,4 Einsätze pro Tag, 33 Prozent Fahrzeit, 88 Prozent eingehaltene Reaktionszeiten. Die Erstlösungsquote liegt weiter bei 72 Prozent. Die Disponenten haben im ersten Monat 41 Prozent der Vorschläge geändert, im dritten 24 Prozent, meist wegen der Zugangszeiten beim Kunden.

**Die Deutung.** Die Terminplanung funktioniert, also verbessern sich Einsätze und Fahrzeit. Die Erstlösungsquote bewegt sich nicht, weil Techniker weiter ohne das passende Teil ankommen: Das Fahrzeuglager ist noch nicht in Salesforce. Vor der zweiten Welle bildet das Team die Fahrzeuglager als mobile Lagerorte im System ab, wie in [Ersatzteile zwischen ERP und Salesforce](/blog/salesforce-field-service-ersatzteile-erp/) beschrieben, und pflegt Besuchszeiten für die Accounts, bei denen die meisten Änderungen entstehen.

## Wem gehören die Zahlen nach dem Go-live?

Die Verantwortung liegt beim Fachbereich, nicht beim Projektteam. Ich würde die Definitionen der Serviceleitung zuordnen, die Änderungsquote der Dispositionsleitung und die Datenstrecke der IT. Eine halbe Stunde pro Monat und Region reicht: sechs Zahlen, die Gründe hinter Ausreißern und eine Entscheidung. Ob Disponenten und Techniker den neuen Prozess überhaupt nutzen, zeigen diese Zahlen nur indirekt. Welche Nutzungszahlen ich daneben stelle, steht in [Salesforce-Nutzung nach dem Go-live messen](/blog/salesforce-nutzung-messen-nach-go-live/). Die technische Seite des Betriebs, von Überwachung bis Backup, behandelt das DevOps-Kapitel [Betrieb, Monitoring und Backup](/masterclass/devops-release-management/betrieb-monitoring-backup/).

Kommen später Field-Service-Agenten dazu, messen Sie diese getrennt mit eigenen Kennzahlen, wie in [Agentforce-Kennzahlen nach dem Go-live](/blog/agentforce-kennzahlen-nach-go-live/) beschrieben. Ein Agent, der Wartungstermine bucht, verändert die Einsätze pro Tag nur mittelbar.

## Erster Schritt: höchstens sechs Kennzahlen aus dem Business Case

```schritte
Kennzahlen wählen
  Nehmen Sie die Zahlen aus Ihrem Business Case, höchstens sechs.
Definitionen aufschreiben
  Vor allem für die Erstlösungsquote.
Ausgangswert messen | mindestens drei Monate
  Im Altsystem, mit denselben Definitionen wie nach dem Go-live, länger, wenn Saisons eine Rolle spielen.
Mit Standardberichten starten
  In der ersten Welle; zu Operations Home oder Field Service Intelligence wechseln Sie, wenn Lizenzen und Definitionen geklärt sind.
Monatlich pro Region prüfen
  Ordnen Sie jeden Ausreißer einer Daten- oder Prozesskorrektur zu.
```

Da Sie für den Ausgangswert mindestens drei Monate brauchen, beginnt die Messung spätestens drei Monate vor dem Go-live. Wie die Kennzahlen in Einführung und Betrieb eingebettet werden, behandelt das [Kapitel KI-Agenten, Einführung und Betrieb der Field-Service-Masterclass](/masterclass/field-service/field-service-ki-agenten-einfuehrung/).
