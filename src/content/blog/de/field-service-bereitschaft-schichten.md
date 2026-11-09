---
title: "Bereitschaftsdienst im Field Service: Schichten planen"
description: "Bereitschaft, Wochenenddienst und Überstunden in Salesforce Field Service mit Schichten planen, und was der Betriebsrat vorher mitbestimmen muss."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-bereitschaft-schichten
translationKey: field-service-on-call-shifts
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Bereitschaftsdienst, Schichten, Terminplanung, Betriebsrat]
takeaways:
  - "Arbeitszeiten beschreiben die wiederkehrende Arbeitszeit. Schichten ergänzen Verfügbarkeit an bestimmten Tagen, etwa Bereitschaft, Wochenende, Überstunden."
  - "Nur bestätigte Schichten zählen. Eine Extended-Schicht nimmt Termine nur an, wenn die Work Rule Service Resource Availability Überstunden erlaubt."
  - "Filterkriterien begrenzen eine Schicht auf bestimmte Termine. So bekommt der Wochenendtechniker nur Störungen und keine geplanten Wartungen."
  - "Eine Störung am Samstag braucht Verfügbarkeit, meist eine bestätigte Bereitschaftsschicht. Ohne sie findet die Planung keinen Techniker."
  - "In Deutschland unterliegen Bereitschaftspläne und Überstunden meist der Mitbestimmung des Betriebsrats nach § 87 BetrVG, wie Timesheets und Standortdaten."
faq:
  - q: "Was ist eine Schicht in Salesforce Field Service?"
    a: "Eine Schicht ist ein Block Arbeitszeit an einem bestimmten Tag, oft außerhalb der normalen Arbeitszeiten einer Ressource, etwa Bereitschaft, eine Nacht oder Überstunden. Sie kann sich auch mit den Arbeitszeiten überschneiden. Schichten fügen immer Verfügbarkeit hinzu. Shift ist ein Standardobjekt von Salesforce, für den vollen Funktionsumfang braucht es das Field Service Managed Package."
  - q: "Was ist der Unterschied zwischen Normal- und Extended-Schichten?"
    a: "Eine Normal-Schicht braucht keine erlaubten Überstunden, Termine müssen aber alle übrigen Work Rules und Filterkriterien erfüllen. Eine Extended-Schicht nimmt nur Termine an, die eine Work Rule Service Resource Availability mit erlaubten Überstunden planen darf."
  - q: "Kann ich Bereitschaftsschichten in großer Zahl anlegen?"
    a: "Ja. Schichtvorlagen füllen Felder vor, und Schichtmuster wiederholen Vorlagen über eine Länge in Tagen. Mit New from Pattern legen Sie ein Startdatum und ein Enddatum oder eine Anzahl an Wiederholungen fest. Die Ressource kann leer bleiben und später zugewiesen werden."
  - q: "Muss der Betriebsrat Bereitschaftsplänen in Field Service zustimmen?"
    a: "§ 87 BetrVG gibt dem Betriebsrat Mitbestimmung bei der Verteilung der Arbeitszeit, bei vorübergehender Verlängerung der Arbeitszeit und bei technischen Einrichtungen, die Mitarbeitende überwachen können, soweit kein Gesetz und kein Tarifvertrag die Frage schon regelt. Bereitschaftspläne in Field Service berühren diese Punkte meist. Klären Sie die Regeln vor dem Go-live."
draft: false
---

Bereitschaftsdienst, Wochenendservice und Überstunden planen Sie in Salesforce Field Service mit Schichten. Die Arbeitszeiten (Operating Hours) beschreiben die reguläre Arbeitszeit eines Servicegebiets, meist Montag bis Freitag. Eine Schicht ergänzt Verfügbarkeit an bestimmten Tagen, meist außerhalb davon: einen Samstag in Bereitschaft, eine Nacht, zwei Überstunden. Nur bestätigte Schichten zählen, und eine Extended-Schicht nimmt Termine nur an, wenn die Work Rule für Verfügbarkeit Überstunden erlaubt. Filterkriterien begrenzen eine Bereitschaftsschicht auf Störungen. Ohne bestätigte Schicht oder andere Verfügbarkeit am Samstag findet die Planung keinen Techniker für eine Störung mit zugesagter Reaktionszeit. In Deutschland bestimmt dabei meist der Betriebsrat mit.

## Was sind Arbeitszeiten, und was sind Schichten?

Arbeitszeiten sind die Zeitfenster pro Wochentag, in denen ein Servicegebiet arbeitet. Techniker übernehmen sie über ihre Mitgliedschaft im Servicegebiet, sofern die Mitgliedschaft keine eigenen Arbeitszeiten hat. Das gehört zu den Stammdaten, die die Planung braucht, beschrieben in [Welche Daten braucht die Planung?](../salesforce-field-service-stammdaten/).

Schichten decken ab, was nicht in dieses Raster passt. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/get-to-know-shifts) definiert eine Schicht als "any set of working hours that are not normal operating hours", also jede Arbeitszeit außerhalb der normalen Arbeitszeiten. Sie kann zusätzlich zu den Arbeitszeiten kommen, wie bei Überstunden, oder sich mit ihnen überschneiden. Shift ist ein Standardobjekt von Salesforce, der volle Funktionsumfang braucht aber das Field Service Managed Package. Vor der ersten Schicht müssen Servicegebiete, Serviceressourcen und Arbeitszeiten eingerichtet sein.

Die [Salesforce-Hilfe zur Verfügbarkeit von Schichten](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_shifts_guidelines.htm&type=5) nennt drei Regeln, die für Bereitschaft zählen:

- **Schichten fügen immer Verfügbarkeit hinzu.** Ist ein Techniker nicht verfügbar, ist das eine Abwesenheit und keine kürzere Schicht.
- **Schichten liegen in einer Gebietsmitgliedschaft.** Eine Schicht mit Servicegebiet muss vollständig in der primären Mitgliedschaft des Technikers in diesem Gebiet liegen.
- **Gebietsbezogene Schichten gewinnen.** Überschneiden sich zwei Schichten, hat die mit Servicegebiet Vorrang vor der ohne.

Salesforce nennt das Produkt heute Agentforce Field Service and Operations, früher Field Service. Die hier beschriebene Schichtlogik gilt dort.

## Wie richten Sie eine Bereitschaftsschicht ein?

Laut [Salesforce-Hilfe zum Anlegen von Schichten](https://help.salesforce.com/s/articleView?id=sf.fs_shifts_create.htm&language=en_US&type=5) und der [Liste der Schichtfelder](https://help.salesforce.com/s/articleView?id=fs_shifts_fields.htm&language=en_US&type=5) entscheiden fünf Einstellungen, wie sich eine Bereitschaftsschicht verhält:

| Einstellung | Was sie bewirkt | Für Bereitschaft |
|---|---|---|
| Time Slot Type | Normal braucht keine Überstunden, Extended nimmt nur als Überstunden erlaubte Termine | Extended |
| Status | Tentative, Published, Confirmed; nur Confirmed zählt für die Planung | Confirmed, sobald der Plan abgestimmt ist |
| Recordset Filter Criteria | Begrenzt, welche Termine die Schicht annimmt | Nur Termine mit dem Work Type Störung |
| Job Profile | Mit Match Skills kommen für die automatische Zuweisung nur Techniker mit den Qualifikationen des Profils infrage | Störungsqualifikationen der Region |
| Non-Standard | Kennzeichnet Abend- oder Bereitschaftsschichten | Gesetzt, damit Regeln der Schichtplanung sie begrenzen oder ausgleichen können |

Die Verbindung zwischen Extended-Schichten und Überstunden liegt in der Scheduling Policy. Laut Hilfe steuert das Feld Overtime an der Work Rule Service Resource Availability, ob Termine auf Extended-Schichten geplant werden dürfen. Eine Policy für geplante Wartungen mit ausgeschaltetem Overtime landet deshalb nie auf einer Bereitschaftsschicht, die Policy für Notfälle mit eingeschaltetem Overtime schon. Damit Kennzeichnungen und Filterkriterien der Schichten berücksichtigt werden, braucht die Policy außerdem die Work Rule Timeslot Designated.

Schichten müssen Sie nicht einzeln anlegen. [Trailhead zu Vorlagen und Mustern](https://trailhead.salesforce.com/content/learn/modules/shift-creation-assignment/simplify-shift-creation-with-templates-and-patterns) zeigt Schichtvorlagen, die Felder vorbelegen, etwa eine Vorlage "Weekly on Call", und Schichtmuster, die Vorlagen über eine Länge in Tagen wiederholen. Mit New from Pattern wählen Sie ein Startdatum und ein Enddatum oder eine Anzahl an Wiederholungen. Bleibt die Serviceressource leer, lässt sich die Schicht später zuweisen, von Hand oder durch die Planungswerkzeuge.

## Warum findet eine Störung am Samstag keinen Techniker?

Das ist eine typische Überraschung nach dem Go-live. Ein Kunde mit dem Vertrag "Techniker innerhalb von 24 Stunden vor Ort" meldet am Samstagmorgen eine stehende Maschine. Der Arbeitsauftrag bekommt das Entitlement, der Milestone startet, und die Planung sucht einen Kandidaten im Zeitfenster des Servicetermins.

```hinweis achtung
Haben weder das Gebiet noch die Mitgliedschaft des Technikers Samstagszeiten und gibt es keine passende bestätigte Schicht, ist niemand verplanbar. Der Termin bleibt im Status None, und die Reaktionszeit läuft.
```

Damit die Störung beim Bereitschaftstechniker landet, muss Folgendes zusammenpassen:

1. **Entitlement und Terminfenster.** Der Milestone des Entitlements überwacht die Reaktionszeit, begrenzt die Planung aber nicht von selbst. Eine Automatisierung muss die Reaktionszeit in Earliest Start Permitted und Due Date des Servicetermins übersetzen. Wie Reaktionszeiten in die Disposition kommen, steht in [Wie bildet man Wartungsverträge ab?](../salesforce-field-service-wartungsvertraege/).
2. **Die Schicht.** Eine bestätigte Extended-Schicht für das Wochenende, mit einem Filter, der Störungen durchlässt.
3. **Die Policy.** Die Policy für Störungen hat Overtime in der Work Rule Service Resource Availability eingeschaltet und enthält die Work Rule Timeslot Designated.

Nimmt außerhalb der Geschäftszeiten ein Sprachagent den Anruf an, bekommt der Bereitschaftstechniker einen klassifizierten Case statt eines rohen Anrufs. Wie ich die Triage an der Hotline aufsetzen würde, steht in [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/). Buchen kann der Agent aber nichts, wenn keine Verfügbarkeit dahintersteht.

## Der Betriebsrat bestimmt nach § 87 BetrVG mit

Das deutsche Recht unterscheidet Bereitschaftsdienst, der grundsätzlich Arbeitszeit ist, und Rufbereitschaft, bei der grundsätzlich nur die tatsächlichen Einsätze zählen. In beiden Fällen ist der Betriebsrat im Spiel. [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) gibt ihm, soweit kein Gesetz und kein Tarifvertrag die Frage schon regelt, unter anderem Mitbestimmung bei Beginn und Ende der täglichen Arbeitszeit und ihrer Verteilung auf die Wochentage (Nr. 2), bei vorübergehender Verlängerung der betriebsüblichen Arbeitszeit (Nr. 3) und bei technischen Einrichtungen, die dazu bestimmt sind, Verhalten oder Leistung zu überwachen (Nr. 6).

Ein Bereitschaftsplan in Field Service berührt diese Punkte meist. Schichten verteilen Arbeitszeit, Extended-Schichten stehen oft für Mehrarbeit, und das System hält fest, wer wann welche Schicht übernommen hat. Ob eine Extended-Schicht rechtlich oder bei der Vergütung als Überstunde zählt, entscheiden Ihr Arbeitszeitmodell und Ihre Vereinbarungen, nicht Salesforce. Diese Punkte würde ich vor dem Go-live mit dem Betriebsrat besprechen:

- wer Bereitschaftsschichten anlegt und bestätigt, und wie weit im Voraus
- wie Bereitschaftsschichten fair verteilt werden; das Kennzeichen Non-Standard macht sie pro Techniker zählbar, und Regeln der Schichtplanung können sie begrenzen
- ob Auswertungen pro Techniker erlaubt sind und wer sie sieht
- wie der Bereitschaftsplan mit Zeiterfassung und Vergütung zusammenhängt

Das ist dasselbe Gespräch wie bei Timesheets und Standort, das ich in [Salesforce Field Service Einführung: Warum in Wellen?](../salesforce-field-service-einfuehrung/) beschreibe. Einfacher ist es, dieses Gespräch einmal für alle Themen zu führen. Ich bin kein Jurist, die rechtliche Bewertung gehört zu Ihren Fachleuten für Arbeitsrecht.

## Rechenbeispiel: Wochenendbereitschaft in drei Regionen

Die Zahlen sind angenommen. Ein Hersteller von Kompressoren betreibt den Service in drei Regionen. In jeder Region hat ein Techniker Wochenendbereitschaft von Samstag 7:00 bis Sonntag 19:00. Verträge sagen Premiumkunden 24 Stunden bis zum Eintreffen zu.

So würde ich es aufsetzen:

1. **Eine Vorlage "Wochenendbereitschaft"** mit dem Job Profile "Störung". An den Schichten: Time Slot Type Extended und ein Filter, der nur den Work Type Störung durchlässt. Das Job Profile entscheidet, wer für die Schicht infrage kommt; der Störungstermin braucht trotzdem eigene Qualifikationsanforderungen.
2. **Ein Muster mit 7 Tagen Länge** und einem Eintrag am Samstag. Eine Vorlage hat kein Servicegebiet, und ein Lauf von New from Pattern nimmt nur ein Gebiet, deshalb starte ich ihn einmal pro Region, jeweils mit 13 Wiederholungen. Das legt die Schichten für ein Quartal an, insgesamt 39.
3. **Zuweisung** durch die Serviceleitung jeder Region, Status Tentative, bis das mit dem Betriebsrat vereinbarte Verfahren abgeschlossen ist, dann Confirmed.
4. **Zwei Policies.** Geplante Wartung mit Overtime aus, Störungen mit Overtime an.
5. **Ein Test an einem Samstag in der Sandbox:** Ein Störungsauftrag mit Premium-Entitlement muss beim Bereitschaftstechniker landen, ein Wartungstermin darf es nicht. Ich würde auch zwei Störungen hintereinander und einen nächtlichen Einsatz mit Folgetermin testen.

Die 36-Stunden-Schicht ist Verfügbarkeit für die Planung, keine 36 Stunden zulässige Arbeit. Legen Sie fest, wie Einsätze, Fahrten, Höchstarbeitszeit und Ruhezeiten die weitere Verfügbarkeit verringern. Das Datenmodell ist klein. Der Aufwand liegt in der Abstimmung des Plans und darin, die Schichten jedes Quartal zu bestätigen.

## Die heutigen Bereitschaftsregeln aufschreiben

Schreiben Sie Ihre heutigen Bereitschaftsregeln auf: wer wann Bereitschaft hat, für welche Kunden und welche Arten von Einsätzen. Prüfen Sie dann, ob Ihre Scheduling Policies zwischen geplanter Arbeit und Störungen unterscheiden. Wenn nicht, beheben Sie das zuerst, denn Extended-Schichten funktionieren nur über diese Unterscheidung. Wo Schichten in die Planung insgesamt passen, steht in [Kapitel 2 der Masterclass Field Service](../../masterclass/field-service/field-service-terminplanung-disposition/), lange Einsätze über mehrere Tage in [Mehrtägige Einsätze im Field Service](../field-service-mehrtaegige-einsaetze-inbetriebnahme/).
