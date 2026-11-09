---
title: "Vertriebsteam nutzt Salesforce nicht? Ursachen und Lösungen"
description: "Warum der Vertrieb Salesforce nach dem Go-live umgeht, wie Sie Prozesslücken von ADKAR-Lücken trennen und welche vier Hebel die Akzeptanz heben."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-akzeptanz-vertrieb
translationKey: change-sales-adoption
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [CRM-Akzeptanz, Vertrieb, Change Management, ADKAR, Salesforce-Einführung]
takeaways:
  - "In meinen Vertriebseinführungen fehlte öfter die Bereitschaft (Desire im ADKAR-Modell) als das Wissen. Eine weitere Schulung ändert dann wenig."
  - "Akzeptanz entsteht, wenn der Vertriebler vor dem Kundentermin in Salesforce mehr findet als in seiner Liste, etwa Aufträge und Servicefälle aus dem ERP."
  - "Alte Wege brauchen ein Abschaltdatum. Solange der Vertrieb unbegrenzt wie bisher arbeiten kann, ändert sich wenig, und Doppelpflege führt zur Schattenliste."
  - "Das Pipeline-Meeting entscheidet: Bespricht der Vertriebsleiter nur, was in Salesforce steht, wird Salesforce gepflegt."
faq:
  - q: "Warum nutzt der Vertrieb das CRM nicht?"
    a: "Prüfen Sie zuerst, ob Salesforce den Vertriebsprozess zuverlässig unterstützt: Ladezeiten, Berechtigungen, mobile Nutzung und integrierte Daten. Wenn ja, sehe ich am häufigsten diese Gründe: Die Pflege hat für den einzelnen Vertriebler keinen Nutzen, Daten müssen doppelt eingegeben werden, und die Führung arbeitet weiter mit Excel-Listen."
  - q: "Wie erhöht man die CRM-Akzeptanz im Vertrieb?"
    a: "Indem Salesforce dem Vertriebler etwas gibt, was er sonst nicht hat, etwa Daten aus dem ERP, Doppelpflege wegfällt, nur wenige Pflichtfelder bleiben und der Vertriebsleiter Pipeline und Prognose ausschließlich aus Salesforce bespricht."
  - q: "Helfen mehr Pflichtfelder gegen schlechte Datenqualität im Vertrieb?"
    a: "Selten. Zu viele Pflichtfelder werden mit Platzhaltern gefüllt. Besser sind wenige Pflichtfelder, für die jemand sichtbar einen Zweck hat, und Berichte, die zeigen, wo Felder leer bleiben."
  - q: "Darf man die CRM-Nutzung einzelner Vertriebler auswerten?"
    a: "Wo ein Betriebsrat besteht, kann eine personenbezogene Nutzungsauswertung nach § 87 Abs. 1 Nr. 6 BetrVG mitbestimmungspflichtig sein. Prüfen Sie sie vorher gegen die geltende IT- oder CRM-Betriebsvereinbarung und wählen Sie die geringste Detailtiefe, die den Zweck erfüllt."
draft: false
---

Der Vertrieb umgeht Salesforce, wenn die Pflege dem Management nützt und für den Vertriebler selbst nur Arbeit bedeutet. Dann leben Kontakte in Outlook, Prognosen in Excel und Absprachen im Kopf, und Salesforce bekommt am Monatsende eine Zusammenfassung. Funktioniert das System selbst, fehlte in den Einführungen, die ich erlebt habe, öfter die Bereitschaft als das Wissen. Eine weitere Schulung hilft deshalb wenig. Was die Akzeptanz im Vertrieb erhöht: Salesforce muss vor dem Kundentermin mehr zeigen als die eigene Liste, Doppelpflege muss verschwinden, und der Vertriebsleiter bespricht Pipeline und Prognose nur noch aus Salesforce.

## Warum umgeht der Vertrieb Salesforce?

Prosci hat in seiner Forschung fünf Hauptgründe gefunden, warum Mitarbeitende sich gegen eine Veränderung sträuben: Sie verstehen den Grund nicht, ihre Rolle ändert sich, sie fürchten das Unbekannte, ihnen fehlt Vertrauen in die Führung, oder sie wurden an den Entscheidungen nicht beteiligt ([Prosci: Understanding Why People Resist Change](https://www.prosci.com/blog/understanding-why-people-resist-change)). Im Vertrieb treffen meist mehrere davon zusammen.

Dazu kommt ein Grund, der für den Vertrieb typisch ist: Ein CRM wirkt schnell wie ein Kontrollinstrument. Wer seine Kunden seit Jahren kennt, sieht wenig Sinn darin, Besuchsberichte für jemanden zu schreiben, der sie nie liest. Und Zeit ist knapp. Für die siebte Ausgabe des [State of Sales](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf) befragte Salesforce im August und September 2025 insgesamt 4.050 Vertriebsmitarbeitende. Demnach verbringen sie 60 Prozent ihrer Arbeitszeit mit anderen Tätigkeiten als dem Verkaufen. Jedes zusätzliche Feld geht von dieser Zeit ab.

Bevor Sie ein Problem bei den Menschen suchen, prüfen Sie, ob Salesforce die Arbeit zuverlässig unterstützt: Ladezeiten, Berechtigungen und Datenzugriff, mobile und Offline-Nutzung, Qualität der integrierten ERP-Daten und ob der CRM-Prozess zum tatsächlichen Vertriebsablauf passt. Erst dann hilft das [ADKAR-Modell](../change-management-salesforce-einfuehrung/) einzugrenzen, woran es hängt. Eine Beobachtung löst die Diagnose aus, sie beweist die Stufe noch nicht:

| Was Sie beobachten | Möglicher Engpass | Was hilft |
|---|---|---|
| „Wofür brauchen die das alles?“ | Awareness | Vertriebsleiter erklärt, welche Entscheidung auf den Daten beruht |
| Pflichtfelder voller Punkte und Platzhalter | Desire | Weniger Felder, sichtbarer Nutzen für den Vertriebler |
| Fragen nach dem Weg zu einer Funktion | Knowledge | Schulung anhand der eigenen Kunden, Key User im Team |
| Pflege gelingt im Büro, nicht unterwegs | Ability | Mobile App, Outlook-Integration |
| Nach drei Monaten zurück bei Excel | Reinforcement | Pipeline-Meeting nur aus Salesforce |

In den Einführungen, die ich erlebt habe, kam die zweite Zeile am häufigsten vor, typischerweise wenn das System für den Vertrieb gebaut wurde, aber nicht mit ihm. Platzhalter können auch heißen, dass ein Feld zu früh Pflicht ist oder die Information zu diesem Zeitpunkt noch fehlt.

## Was hat der Vertriebler selbst davon?

Diese Frage entscheidet über die Bereitschaft, und sie braucht eine konkrete Antwort. „Bessere Daten für das Unternehmen“ reicht nicht. Bei Herstellern liegt die überzeugendste Antwort meist im ERP: Aufträge, Lieferstände, offene Rechnungen und Abnahmemengen aus Rahmenverträgen. Wer vor dem Termin in Salesforce sieht, dass der Kunde zum Beispiel nur 60 Prozent der vereinbarten Menge abgerufen hat und gerade zwei Servicefälle offen sind, geht besser vorbereitet hinein als mit seiner eigenen Liste.

```praxis
In Manufacturing Cloud habe ich Rahmenverträge (Sales Agreements) mit Ist-Mengen aus dem ERP eingeführt; in diesem Projekt war das ERP die gewählte Quelle, Salesforce kann Ist-Werte auch aus Aufträgen in Salesforce berechnen oder per API übernehmen. Der Stolperstein war die ERP-Schnittstelle, und genau an ihr hängt der Nutzen für den Vertrieb: Ohne Ist-Mengen zeigt ein Rahmenvertrag nur, was vereinbart war, nicht was der Kunde wirklich abnimmt.
```

Wie diese Daten in Salesforce kommen, beschreibe ich in [Manufacturing Cloud und SAP: welche Daten wohin fließen](../manufacturing-cloud-sap-integration-datenfluesse/). Für die Akzeptanz zählt vor allem die Reihenfolge: Zum Go-live sollte der Vertrieb mindestens einen klaren, verlässlichen Nutzen haben, abgeleitet aus seiner Terminvorbereitung, nicht erst in einer späteren Phase. Eine instabile Schnittstelle schadet dem Vertrauen mehr als eine erste Ausbaustufe mit offen benannten Grenzen. Sonst lernt der Vertrieb in den ersten Wochen, dass Salesforce nur nimmt und nichts gibt, und dieser Eindruck hält.

## Doppelpflege führt direkt zur Schattenliste

Doppelpflege ist der schnellste Weg zur Schattenliste. Jede Information, die schon an anderer Stelle steht, sollte niemand ein zweites Mal eintippen müssen. Drei Stellen sollten Sie vor dem Go-live im Vertrieb prüfen:

- **E-Mail und Kalender.** Die [Outlook- und Gmail-Integration](https://trailhead.salesforce.com/content/learn/modules/email-and-calendar-integrations-quick-look/learn-about-email-and-calendar-integration-tools) zeigt passende Salesforce-Datensätze direkt neben der E-Mail, und Vertriebler können Mails und Termine dort protokollieren. Einstein Activity Capture kann Mails und Termine automatisch erfassen und je nach Einrichtung auch Kontakte synchronisieren. Ist es für die benötigten Termine eingerichtet, muss niemand Besuche, die ohnehin im Kalender stehen, noch einmal erfassen.
- **Daten aus dem ERP.** Kundennummern, Adressen, Aufträge und Umsätze kommen per Schnittstelle. Der Vertrieb pflegt sie nicht von Hand nach.
- **Alte Listen.** Die Excel-Prognose und die eigene Kundendatei bekommen ein Abschaltdatum, das der Vertriebsleiter ankündigt. Solange beide Wege offen sind, gewinnt der gewohnte.

Der letzte Punkt ist für mich der wichtigste. Wenn neue Prozesse oder Systeme eingeführt werden, braucht der alte Weg ein Enddatum. Bleibt die Option, nach der alten Weise zu arbeiten, unbegrenzt offen, ändert sich wenig. Sie müssen den alten Weg dabei nicht über Nacht abschalten. Legen Sie fest, unter welchen Bedingungen Sie ihn schließen, halten Sie einen befristeten Notfallweg bereit und schalten Sie ihn ab, sobald der neue Prozess nachweislich funktioniert. Das heißt konkret: Die alte Vorlage verschwindet aus dem Laufwerk, der alte Bericht wird nicht mehr verschickt, und wenn Salesforce das vereinbarte System für Angebote ist, gibt die Führungskraft Angebote von außerhalb nicht mehr frei.

## Wie viele Pflichtfelder verträgt eine Opportunity?

Weniger, als die meisten Fachkonzepte vorsehen. Jedes Pflichtfeld braucht jemanden, der den Inhalt tatsächlich verwendet, in einem Bericht, einer Prognose oder einer Entscheidung. Findet sich niemand, wird das Feld optional oder fällt weg. Die Frage für jedes Pflichtfeld im Workshop lautet: Wer liest das, und was tut er damit?

Zu viele Pflichtfelder zeigen sich schnell in den Daten: Platzhalter, immer derselbe Wert in einer Auswahlliste, Abschlussdaten, die monatlich um vier Wochen verschoben werden. Wie Sie diese Zeichen in Berichten finden, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

```hinweis tipp
Lassen Sie die Felder einer Opportunity von zwei Vertrieblern und dem Vertriebsleiter gemeinsam durchgehen, bevor gebaut wird. Was keiner der drei braucht, bleibt optional. So wird der Vertrieb an der Entscheidung beteiligt, einer der Punkte, die Prosci gegen Widerstand nennt.
```

## Das Pipeline-Meeting entscheidet über die Pflege

Am Ende verankert die Führung, ob Salesforce gepflegt wird. Wenn der Vertriebsleiter im wöchentlichen Pipeline-Meeting das Salesforce-Dashboard öffnet und nur bespricht, was darin steht, pflegt das Team Salesforce. Wenn er sich vor dem Meeting eine Excel-Liste schicken lässt, pflegt das Team die Excel-Liste. Das ist die Stufe Reinforcement, und sie kostet keine Lizenz und keine Entwicklung.

Dasselbe gilt eine Ebene höher. Kommt die Absatzprognose an die Geschäftsführung aus Salesforce, wird sie dort gepflegt. Wie eine Prognose aus Salesforce für Hersteller aussehen kann, beschreibe ich in [Account Forecasting: Absatzprognose im Vertrieb](../account-forecasting-absatzprognose-vertrieb/).

Eine Grenze ziehe ich dabei. Ranglisten einzelner Vertriebler nach Feldfüllquote führen leicht zu gepflegten Zahlen statt zu gepflegten Daten. Wo ein Betriebsrat besteht, kann eine Auswertung pro Person nach § 87 Abs. 1 Nr. 6 BetrVG mitbestimmungspflichtig sein. Prüfen Sie sie deshalb vorher gegen die geltende IT- oder CRM-Betriebsvereinbarung; der Datenschutz gilt in jedem Fall. Für die Steuerung wählen Sie die geringste Detailtiefe, die den Zweck erfüllt, oft Team oder Land, und das Gespräch mit Einzelnen führt die Führungskraft oder der [Key User](../salesforce-key-user-netzwerk/).

## Zwei Vertriebler nach ihrer Terminvorbereitung fragen

Setzen Sie sich mit zwei Vertrieblern zusammen und fragen Sie: Was schauen Sie sich vor einem Kundentermin an, und wo steht es heute? Alles, was die beiden nennen und nicht in Salesforce steht, ist Ihre Liste für die nächsten Releases. Danach vereinbaren Sie mit dem Vertriebsleiter ein Datum, ab dem Pipeline und Prognose nur noch aus Salesforce besprochen werden. Das Vorgehen habe ich mit meiner Kooperationspartnerin [Juliane Winterscheid](../../partner/juliane-winterscheid/) entwickelt, die unter anderem einen globalen Sales-Cloud-Rollout begleitet hat. Mehr dazu lesen Sie unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
