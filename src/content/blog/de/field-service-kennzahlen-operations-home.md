---
title: "Field Service Kennzahlen nach dem Go-live: Was messen?"
description: "Welche Kennzahlen nach dem Go-live zeigen, ob Salesforce Field Service wirkt, wie Sie die Erstlösungsquote definieren und was Operations Home ergänzt."
pubDate: 2026-10-28
lang: de
slug: field-service-kennzahlen-operations-home
translationKey: field-service-kpis-after-go-live
topic: field-service
categories: [field-service]
tags: [Field Service, Kennzahlen, Erstlösungsquote, Operations Home, Einführung, Analytics]
takeaways:
  - "Ich messe zusätzlich, wie oft Disponenten die Vorschläge der Engine vor der Freigabe ändern. Das zeigt, ob Daten und Scheduling Policy passen."
  - "Operations Home zeigt 12 Kennzahlen, Field Service Intelligence fünf Dashboards mit mehr als 30. Beide laufen auf Data 360 und brauchen Lizenzen."
  - "Die Erstlösungsquote braucht eine schriftliche Definition: Zeitfenster, gleiches Asset, gleicher Fehlercode und welche Folgeeinsätze nicht zählen."
  - "Ohne Ausgangswert aus dem Altsystem, drei Monate mit denselben Definitionen gemessen, kann niemand sagen, ob Field Service geholfen hat."
faq:
  - q: "Welche Kennzahlen zählen nach einem Field-Service-Go-live?"
    a: "Ich nutze sechs: Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten, Ankunft im zugesagten Zeitfenster und den Anteil der Vorschläge, die Disponenten vor der Freigabe ändern. Sie passen zum Business Case."
  - q: "Was ist Operations Home in Salesforce Field Service?"
    a: "Eine Startseite für den Innendienst mit 12 fertigen Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets. Laut Salesforce basiert sie auf Tableau Next, Data Cloud und Agentforce."
  - q: "Ist Field Service Intelligence in der Field-Service-Lizenz enthalten?"
    a: "Die Preisliste zeigt Field Service Intelligence und Operations Home mit Einträgen 'Available for Purchase', und Tableau Next ist nur in Agentforce 1 Field Service enthalten. Fragen Sie Ihr Account-Team, welche Positionen Ihre Edition braucht."
  - q: "Wie berechnet man die Erstlösungsquote?"
    a: "Anteil der Arbeitsaufträge ohne weiteren Einsatz am selben Asset für denselben Fehler innerhalb eines festen Zeitfensters, zum Beispiel 14 Tage. Legen Sie schriftlich fest, welche geplanten Folgeeinsätze, etwa mehrtägige Inbetriebnahmen, ausgenommen sind."
draft: false
---

Nach dem Go-live muss Salesforce Field Service die Zahlen aus dem Business Case bewegen: Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten und Ankunft im zugesagten Zeitfenster. Ich nehme eine Kennzahl dazu: wie oft Disponenten die Vorschläge der Engine vor der Freigabe ändern. Salesforce bietet zwei fertige Ansichten. Operations Home zeigt 12 Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets. Field Service Intelligence hat fünf Dashboards mit mehr als 30 Kennzahlen. Beide laufen auf Data 360 und müssen lizenziert werden. Vor jedem Dashboard legen Sie fest, wie jede Kennzahl definiert ist, und messen einen Ausgangswert im Altsystem.

## Welche Kennzahlen zeigen, ob Field Service wirkt?

Die Kennzahlen nach dem Go-live sind die vier Zahlen, mit denen ich entscheide, ob sich [Field Service lohnt](../salesforce-field-service-lohnt-sich/), plus zwei, die zeigen, ob die Terminplanung funktioniert. Diese Auswahl würde ich pro Region und Monat verfolgen:

| Kennzahl | Wie ich sie definiere | Woher die Zahl kommt |
|---|---|---|
| Einsätze pro Techniker und Tag | Abgeschlossene Termine geteilt durch Arbeitstage der Techniker | Service Appointments mit Status Completed |
| Fahrzeitanteil | Fahrzeit geteilt durch Arbeitszeit | [Stundenzettel](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5), die Fahrten und Pausen erfassen |
| Erstlösungsquote | Arbeitsaufträge ohne weiteren Einsatz am selben Asset für denselben Fehler innerhalb von 14 Tagen | Arbeitsauftrag, Asset, Fehlercode |
| Eingehaltene Reaktionszeiten | Störungen, bei denen der Techniker in der zugesagten Zeit vor Ort war | Meilensteine aus Entitlements am Arbeitsauftrag |
| Ankunft im Zeitfenster | Tatsächlicher Beginn im zugesagten Ankunftsfenster | Felder am Service Appointment |
| Änderungsquote der Disposition | Anteil der Vorschläge, die vor dem Status Dispatched geändert werden | Eigene Erfassung |

Zwei davon gibt es fast geschenkt. Das Service Appointment hat Felder für den [tatsächlichen Beginn und das Ankunftsfenster](https://developer.salesforce.com/docs/service/salesforce-scheduler-dev-guide/guide/sforce-api-objects-serviceappointment.html), ein Standardbericht vergleicht sie. Reaktionszeiten kommen aus Meilensteinen am Arbeitsauftrag, die einen Entitlement-Prozess vom Typ Work Order brauchen, wie in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/) beschrieben.

Die Änderungsquote der Disposition kostet etwas Aufwand und ist in den ersten Monaten die nützlichste Zahl. In [Wie viel Terminplanung automatisch laufen sollte](../salesforce-field-service-terminplanung-automatisieren/) empfehle ich, dass Disponenten notieren, warum sie einen Vorschlag ändern. Eine Auswahlliste mit dem Grund am Termin macht daraus einen Bericht. Eine hohe Quote heißt: Daten fehlen oder die Policy passt nicht, und die Gründe zeigen, was davon.

## Operations Home und Field Service Intelligence laufen auf Data 360

Salesforce verkauft Field Service heute als Field Service and Operations, die Auswertungen kommen in zwei Teilen. Laut [Salesforce-Blog vom September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/):

- **Operations Home** ist die Startseite für den Innendienst, mit 12 fertigen Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets. Sie basiert auf Tableau Next, Data Cloud und Agentforce, Fragen in normaler Sprache beantwortet Concierge.
- **Field Service Intelligence** hat fünf fertige Dashboards zu Arbeitsaufträgen, Terminen, Assets, Ersatzteilbestand und Ressourcen, mit mehr als 30 Kennzahlen.

Die Salesforce-Hilfe beschreibt [Field Service Intelligence](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) als Paket aus Data 360, CRM Analytics und Agentforce Service. Ihr [Service Data Kit](https://help.salesforce.com/s/articleView?id=sf.ifs_install_data_kit.htm&language=en_US&type=5) richtet mehr als 20 Datenströme ein, und die Hilfe warnt davor, installierte Objekte, Felder oder Zuordnungen zu entfernen, weil die Dashboards darauf aufbauen. Tableau Next selbst braucht laut [Einrichtungsanleitung](https://help.tableau.com/current/tableau-next/en-us/tableau_next_setup_guide_configure_data_cloud.htm) zuerst eine konfigurierte Data Cloud.

Die Lizenzfrage ist aus der [Preisliste](https://www.salesforce.com/de/products/field-service/pricing/) nicht eindeutig abzulesen. Die Vergleichstabelle führt Tableau Next bei Dispatcher, Technician und Field Service Plus als "Available for Purchase", Agentforce 1 Field Service enthält es zusammen mit 2,5 Millionen Data-Cloud-Credits pro Org und Jahr. Auch Operations Home und Field Service Intelligence stehen mit Einträgen "Available for Purchase" in der Tabelle.

```hinweis offen
Welche Positionen Ihre Edition für Operations Home, Field Service Intelligence und Tableau Next braucht, lassen Sie sich vom Account-Team bestätigen, bevor Sie jemandem ein Dashboard zusagen.
```

Meine Einschätzung: Die fertigen Ansichten lohnen sich, sobald die Definitionen abgestimmt sind und Data 360 ohnehin im Haus ist. Für die erste Welle decken Standardberichte auf Terminen und Arbeitsaufträgen die Zahlen aus dem Business Case ab.

## Die Erstlösungsquote braucht zuerst eine Definition

Weil ein Kennzahlname noch keine Formel ist. Operations Home zeigt eine Erstlösungsquote. Ob sie dem entspricht, was Ihre Serviceleitung meint, müssen Sie prüfen. Ich halte fünf Entscheidungen schriftlich fest:

1. **Zeitfenster.** Ein Folgeeinsatz innerhalb von 7, 14 oder 30 Tagen?
2. **Bezug.** Gleiches Asset oder gleicher Kundenstandort?
3. **Fehler.** Gleicher Fehlercode oder jeder weitere Einsatz?
4. **Geplante Folgeeinsätze.** Ein zweiter Besuch, weil ein Teil bewusst bestellt wurde, oder eine mehrtägige Inbetriebnahme zählen nicht als Fehlschlag.
5. **Fernlösungen.** Zählt ein Problem, das per Telefon oder Video gelöst wurde, als beim ersten Mal behoben?

Die dritte Entscheidung funktioniert nur mit codierten Fehlern. Stehen Fehlerursachen im Freitext, zählt die Quote jeden weiteren Einsatz, auch die Jahreswartung eine Woche später. Weichen die Definition des Herstellers und Ihre voneinander ab, berichten Sie Ihre und vermerken den Unterschied einmal.

## Wie kommen Sie an einen Ausgangswert aus dem Altsystem?

Messen Sie drei Monate vor dem Go-live mit denselben Definitionen, die Sie danach verwenden. Die Daten liegen meist in den Serviceaufträgen des ERP oder im alten Planungswerkzeug: abgeschlossene Einsätze pro Techniker, Fahrzeiten aus Stundenzetteln oder Fahrtenbüchern, Folgeeinsätze pro Maschine. Kann niemand diese Zahlen liefern, ist das schon ein Befund, und er schwächt jeden Business Case.

Vergleichen Sie dann pro Region und pro Welle. Die [Einführung in Wellen](../salesforce-field-service-einfuehrung/) liefert eine natürliche Vergleichsgruppe: Regionen, die noch nicht live sind, arbeiten im alten Prozess. Verbessert sich eine Live-Region und bleibt eine wartende Region gleich, kommt die Änderung von Field Service und nicht von einer ruhigen Saison.

## Rechenbeispiel: Ausgangswert und erste Welle

Angenommen ist ein Komponentenhersteller mit 90 Technikern in drei Regionen, SAP als ERP und einer Einführung in drei Wellen.

**Ausgangswert, drei Monate aus SAP-Serviceaufträgen und Stundenzetteln.** 2,1 Einsätze pro Techniker und Tag, 38 Prozent Fahrzeitanteil, 71 Prozent Erstlösungsquote (14 Tage, gleiches Asset, gleicher Fehlercode), 84 Prozent der Störungen in der zugesagten Reaktionszeit.

**Region eins, drei Monate nach dem Go-live.** 2,4 Einsätze pro Tag, 33 Prozent Fahrzeit, 88 Prozent eingehaltene Reaktionszeiten. Die Erstlösungsquote steht weiter bei 72 Prozent. Die Disponenten haben im ersten Monat 41 Prozent der Vorschläge geändert, im dritten 24 Prozent, meist wegen der Zugangszeiten beim Kunden.

**Die Deutung.** Die Terminplanung funktioniert, also verbessern sich Einsätze und Fahrzeit. Die Erstlösungsquote bewegt sich nicht, weil Techniker weiter ohne das passende Teil ankommen: Das Fahrzeuglager ist noch nicht in Salesforce. Vor der zweiten Welle bringt das Team die Fahrzeuglager als mobile Lagerorte ins System, wie in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/) beschrieben, und pflegt Besuchszeiten für die Accounts, die die meisten Änderungen auslösen.

## Wem gehören die Zahlen nach dem Go-live?

Jemandem im Fachbereich und nicht dem Projekt. Ich würde die Definitionen der Serviceleitung geben, die Änderungsquote der Dispositionsleitung und die Datenstrecke der IT. Eine halbe Stunde pro Monat und Region reicht: sechs Zahlen, die Gründe hinter Ausreißern und eine Entscheidung. Ob Disponenten und Techniker den neuen Prozess überhaupt nutzen, zeigen diese Zahlen nur indirekt. Welche Nutzungszahlen ich daneben stelle, steht in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/). Die technische Seite des Betriebs, von Überwachung bis Backup, behandelt das DevOps-Kapitel [Betrieb, Monitoring und Backup](../../masterclass/devops-release-management/betrieb-monitoring-backup/).

Kommen später Field-Service-Agenten dazu, messen Sie diese getrennt mit eigenen Kennzahlen, wie in [Agentforce-Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/) beschrieben. Ein Agent, der Wartungstermine bucht, verändert die Einsätze pro Tag nur mittelbar.

## Erster Schritt: höchstens sechs Kennzahlen aus dem Business Case

```schritte
Kennzahlen wählen
  Nehmen Sie die Zahlen aus Ihrem Business Case, höchstens sechs.
Definitionen aufschreiben
  Vor allem für die Erstlösungsquote.
Ausgangswert messen | drei Monate
  Im Altsystem, mit denselben Definitionen wie nach dem Go-live.
Mit Standardberichten starten
  In der ersten Welle; zu Operations Home oder Field Service Intelligence wechseln Sie, wenn Lizenzen und Definitionen geklärt sind.
Monatlich pro Region prüfen
  Ordnen Sie jeden Ausreißer einer Daten- oder Prozesskorrektur zu.
```

Da der Ausgangswert drei Monate braucht, beginnt die Messung spätestens drei Monate vor dem Go-live. Wie die Kennzahlen in Einführung und Betrieb passen, behandelt das [Kapitel KI-Agenten, Einführung und Betrieb der Field-Service-Masterclass](../../masterclass/field-service/field-service-ki-agenten-einfuehrung/).
