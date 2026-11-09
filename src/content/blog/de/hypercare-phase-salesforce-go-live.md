---
title: "Hypercare-Phase im Salesforce-Projekt: Dauer und Ablauf"
metaTitle: "Salesforce-Hypercare: Dauer, Ablauf und Exit-Kriterien"
description: "Hypercare nach dem Salesforce-Go-live: Team, tägliche Triage, Eskalation, Regeln für Quick Wins und die Exit-Kriterien, an denen Sie das Ende festmachen."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: hypercare-phase-salesforce-go-live
translationKey: change-hypercare
topic: governance
categories: [change-management, devops]
coAuthor: juliane
contactBrief: change
tags: [Hypercare, Hypercare-Phase, Go-live, Change Management, Salesforce-Einführung, Support]
takeaways:
  - "Der normale Support kennt die neuen Abläufe noch nicht, und seine Reaktionszeiten passen nicht zu einem Vertrieb, der heute ein Angebot schicken muss."
  - "Sie endet nach vorher vereinbarten Kriterien, etwa ohne offene kritische Fehler und mit sinkender Zahl neuer Fragen, nicht an einem festen Datum."
  - "Kritische Störungen werden sofort eskaliert, alle übrigen Meldungen täglich sortiert. Kleine, testbare Wünsche werden noch in der Hypercare umgesetzt."
  - "Die intensive Phase dauert meist einige Wochen. In meinen Projekten lief die Hypercare danach mit wöchentlichen Calls teils bis zu drei Monate weiter."
  - "Hypercare ist auch Change Management: Fragen der ersten Wochen zeigen, an welcher ADKAR-Stufe eine Gruppe hängt."
faq:
  - q: "Was bedeutet Hypercare-Phase?"
    a: "Die Hypercare-Phase ist die Zeit direkt nach einem Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar sind, Fehler schneller behoben werden und Fragen der Anwender gesammelt werden, bis der Betrieb übernimmt."
  - q: "Wie lange dauert Hypercare nach einem Salesforce-Go-live?"
    a: "Die intensive Phase mit täglicher Triage dauert meist einige Wochen, bei komplexen Rollouts folgt eine ruhigere Stabilisierung mit wöchentlichen Terminen, insgesamt bis etwa drei Monate. Entscheidend sind Endkriterien, die vorher feststehen, etwa keine offenen kritischen Fehler und eine sinkende Zahl neuer Meldungen. Bei Rollouts in Wellen beginnt sie in jedem Land neu."
  - q: "Wer gehört zum Hypercare-Team?"
    a: "Der Product Owner, ein Admin, Entwickler des Umsetzungspartners, die Key User der betroffenen Gruppen und eine Person aus dem späteren Support, die den Betrieb übernimmt."
  - q: "Darf man in der Hypercare neue Funktionen ausliefern?"
    a: "Kleine Verbesserungen aus dem Feedback der Anwender ja, wenn sie testbar und rückbaubar sind, keine Fehlerbehebung verzögern und über die normale Pipeline mit Test laufen."
  - q: "Wer steuert die Hypercare bei mehreren Umsetzungspartnern?"
    a: "Der Kunde. Er führt eine gemeinsame Liste aller Meldungen, und jede Meldung hat genau einen koordinierenden Verantwortlichen, auch wenn Salesforce-, ERP- und Integrationspartner gemeinsam nach der Ursache suchen. Partnereigene Tickets darf es geben, sie ersetzen aber nicht den gemeinsamen Stand. Größere neue Funktionen gehen ins Backlog und kommen mit dem nächsten regulären Release."
draft: false
---

Die Hypercare-Phase ist die Zeit direkt nach einem Salesforce-Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar bleiben, bis der neue Prozess im Alltag stabil läuft. Die intensive Phase dauert meist einige Wochen, mit ruhigerer Stabilisierung insgesamt bis etwa drei Monate, und sie endet nach vorher vereinbarten Exit-Kriterien, nicht an einem festen Datum. Kritische Störungen werden sofort eskaliert, ein täglicher Termin sortiert alle übrigen Meldungen in Fehler, Bedienfrage, Datenproblem oder Änderungswunsch. Fehler werden behoben, Fragen beantwortet, kleine Wünsche als Quick Wins umgesetzt, große gehen ins Backlog. Hypercare ist außerdem die beste Quelle für Change Management, weil die Fragen der ersten Wochen zeigen, wo eine Gruppe hängt.

## Warum braucht ein Go-live eine Hypercare-Phase?

In den ersten Tagen nach einem Go-live kommen drei Dinge zusammen: Fehler, die der Test nicht gefunden hat, Fragen von Anwendern, die zum ersten Mal echte Fälle bearbeiten, und Daten aus der Migration, die nicht ganz stimmen. Der normale Support ist dafür nicht gebaut. Er kennt die neuen Abläufe noch nicht, und seine Reaktionszeiten passen nicht zu einem Vertrieb, der heute ein Angebot schicken muss.

Wer in dieser Phase keine schnelle Antwort bekommt, sucht sich einen Weg drumherum. Ein Angebot geht dann doch wieder aus Word raus, ein Einsatz wird per Telefon vergeben. Aus diesen Umwegen werden schnell Gewohnheiten, und die lassen sich später schwerer ändern als jeder Fehler. Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) deutet das meist auf die Stufe Ability: Die Anwender wissen, wie es geht, schaffen es im Alltag aber noch nicht allein. Bewusste Umwege können aber auch heißen, dass der Nutzen nicht verstanden ist.

## Ein kleines Hypercare-Team, das entscheiden kann

Ein kleines Team, das Entscheidungen treffen und Fehler beheben kann:

- **Product Owner des Kunden.** Bewertet die geschäftliche Auswirkung und priorisiert. Ob etwas Fehler oder Änderungswunsch ist, klärt er im Streitfall mit Architektur und Partner anhand von Anforderung, Design und Abnahme.
- **Admin.** Klärt Rechte, Layouts und Datenprobleme schnell. Änderungen gehen je nach Risiko über den vereinbarten Freigabeweg, Datenkorrekturen werden dokumentiert.
- **Entwickler des Umsetzungspartners.** Beheben Fehler in Code, Flows und Schnittstellen.
- **[Key User](../salesforce-key-user-netzwerk/) der betroffenen Gruppen.** Beantworten Bedienfragen vor Ort und melden, was im Team nicht funktioniert.
- **Eine Person aus dem späteren Support.** Lernt die Fälle von Anfang an mit, damit die Übergabe keine Lücke reißt.

Bei Schnittstellen zum ERP gehört außerdem jemand aus dem ERP-Team dazu. Viele Meldungen der ersten Tage sind Daten, die im ERP anders ankommen als erwartet, und die lassen sich nur gemeinsam klären.

## Täglich sortieren, kritische Störungen sofort eskalieren

Alle Meldungen laufen über einen Eingang, nicht über Chat, E-Mail und Zuruf parallel. Was den Betrieb blockiert, etwa wenn Angebote nicht freigegeben werden oder Aufträge nicht im ERP ankommen, wartet nicht bis zum nächsten Morgen, sondern geht sofort über den vereinbarten Eskalationsweg. Für alles andere empfehle ich in den ersten Tagen nach dem Go-live einen festen Termin am Morgen, 15 bis 30 Minuten, mit allen Meldungen des Vortags. Sobald die Zahl der Meldungen sinkt, reicht ein wöchentlicher Status-Call. Jede Meldung bekommt eine von vier Kategorien:

| Kategorie | Beispiel | Was passiert |
|---|---|---|
| Fehler | Angebot lässt sich nicht freigeben | Partner behebt, Fix geht über die Pipeline |
| Bedienfrage | „Wo finde ich die Ersatzteilliste?“ | Key User antwortet, Frage kommt in die Liste für Nachschulung |
| Datenproblem | Kunde aus der Migration ohne Ansprechpartner | Admin oder Datenteam korrigiert |
| Änderungswunsch | „Das Feld hätten wir gern weiter oben“ | klein: Quick Win in der Hypercare, groß: Backlog |

Die letzte Zeile verdient Aufmerksamkeit. Nach einem Go-live kommen viele berechtigte Wünsche. Kleine Verbesserungen, die schnell umgesetzt, gut testbar und leicht rückbaubar sind, gehören in die Hypercare: Die Anwender sehen, dass ihre Rückmeldung etwas bewirkt, und das stärkt die Bereitschaft mehr als eine Rundmail. Zwei Regeln gelten dabei. Fehler haben immer Vorrang, und auch Quick Wins gehen über die normale Pipeline mit Test, weil jede Änderung neue Fehler bringen kann. Größere Wünsche kommen ins Backlog und mit dem nächsten regulären Release. Wie Releases danach weiterlaufen, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/).

```hinweis tipp
Zählen Sie die Meldungen pro Kategorie und pro Gruppe jeden Tag mit. Viele Bedienfragen aus einem Team zeigen eine Lücke in der Schulung. Viele Änderungswünsche aus einem Team zeigen, dass es an den Entscheidungen vorher nicht beteiligt war.
```

## Welche Werkzeuge in Salesforce helfen?

Salesforce bringt einiges mit, was in der Hypercare Zeit spart. Mit „Als anderer Benutzer anmelden“ sieht der Admin, was ein Anwender sieht, und findet fehlende Rechte ohne langes Hin und Her. Dafür braucht er die passende Berechtigung, und je nach Einstellung muss der Anwender den Zugriff vorher freigeben. Der Setup Audit Trail zeigt, wer wann etwas am Setup geändert hat, was hilft, wenn nach einem Fix plötzlich etwas anderes nicht mehr geht. Die Login-Historie zeigt, wer sich anmeldet, und Berichte über angelegte Datensätze zeigen, welche Gruppen überhaupt im System arbeiten. Beides sind Signale für Aktivität, kein Beweis, dass ein Prozess richtig läuft.

Für die Nutzung lohnt es sich, schon zum Go-live die Berichte bereitzuhaben, die später den Erfolg messen. Dann zeigt die Hypercare von Anfang an, ob ein Team arbeitet oder nur liest. Welche Zahlen das sind, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

## Wann endet die Hypercare-Phase?

Wenn die vorher vereinbarten Kriterien erfüllt sind. Ein festes Datum führt dazu, dass Hypercare endet, während noch kritische Fehler offen sind, oder dass sie aus Gewohnheit weiterläuft. Vereinbaren Sie die Kriterien vor dem Go-live mit dem Product Owner und dem Betrieb, zum Beispiel:

- Seit einer Woche kein offener Fehler der höchsten Priorität.
- Die Zahl neuer Meldungen pro Tag sinkt seit mindestens einer Woche.
- Schnittstellen und Batchläufe zum ERP laufen stabil.
- Jeder offene Restpunkt hat einen Verantwortlichen, einen Termin und ein Ziel-Release.
- Der Support kennt die häufigsten Fälle und hat die Anleitungen dafür.

Nutzungszahlen gehören in den Blick, aber nicht zwingend in die Exit-Kriterien. Ein System kann stabil und an den Betrieb übergeben sein, während das Change Management für einzelne Gruppen weiterläuft.

```praxis
Die Hypercare-Phase habe ich meist mit der Umsetzung von Feedback und Quick Wins verbunden. Teilweise lief sie bis zu drei Monate, mit wöchentlichen Status-Calls. Die Zeit lohnt sich, weil in diesen Wochen aus Rückmeldungen sichtbare Verbesserungen werden.
```

Planen Sie deshalb eher mit Wochen bis Monaten als mit Tagen, je nach Zahl der Gruppen und ERP-Schnittstellen. Bei einem Rollout in Wellen beginnt die Hypercare in jedem Land neu, wie in [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/) beschrieben.

Eine kürzere Fassung ohne Salesforce-Bezug, die genauso für ERP oder ein Serviceportal gilt, steht als Artikel auf LinkedIn: [Hypercare-Phase: Was sie bedeutet, wie lange sie dauert und wann sie endet](https://www.linkedin.com/pulse/hypercare-phase-sie-bedeutet-wie-lange-dauert-1rvae/).

## Wie übergeben Sie an den Betrieb?

Die Übergabe ist der Moment, in dem das Projektteam weiterzieht. Gut läuft sie, wenn der Support von Anfang an mit am Tisch saß und die Übergabe schrittweise passiert: zuerst übernimmt er Bedienfragen, dann Datenprobleme, zuletzt die Steuerung der Fehler mit dem Partner.

Nach der Übergabe bleibt eine Aufgabe für das Change Management: Die gesammelten Fragen und Meldungen zeigen, welche Gruppen noch Unterstützung brauchen. Diese Liste gehört zum Sponsor, nicht in die Ablage.

## Team, Termine und Endkriterien schriftlich festlegen

Legen Sie vor dem nächsten Go-live schriftlich fest, wer im Hypercare-Team sitzt, wie oft es sich trifft und nach welchen Kriterien die Hypercare endet. Planen Sie die Person aus dem Support von Anfang an ein, damit die Übergabe an den Betrieb schrittweise laufen kann. Wie wir Hypercare in Programmen aufsetzen, steht unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
