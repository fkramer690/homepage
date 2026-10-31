---
title: "Hypercare-Phase im Salesforce-Projekt: Dauer und Ablauf"
description: "Was die Hypercare-Phase nach einem Salesforce-Go-live bedeutet, wer dazugehört, wie lange sie dauert und an welchen Kriterien Sie ihr Ende festmachen."
pubDate: 2026-10-29
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
  - "Ein fester Termin sortiert jede Meldung in Fehler, Bedienfrage, Datenproblem oder Änderungswunsch. Kleine Wünsche werden noch in der Hypercare umgesetzt."
  - "In meinen Projekten lief die Hypercare teils bis zu drei Monate, mit wöchentlichen Status-Calls und der Umsetzung von Feedback und Quick Wins."
  - "Hypercare ist auch Change Management: Fragen der ersten Wochen zeigen, an welcher ADKAR-Stufe eine Gruppe hängt."
faq:
  - q: "Was bedeutet Hypercare-Phase?"
    a: "Die Hypercare-Phase ist die Zeit direkt nach einem Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar sind, Fehler schneller behoben werden und Fragen der Anwender gesammelt werden, bis der Betrieb übernimmt."
  - q: "Wie lange dauert Hypercare nach einem Salesforce-Go-live?"
    a: "Einige Wochen bis etwa drei Monate. Entscheidend sind Endkriterien, die vorher feststehen, etwa keine offenen kritischen Fehler und eine sinkende Zahl neuer Meldungen. Bei Rollouts in Wellen beginnt sie in jedem Land neu."
  - q: "Wer gehört zum Hypercare-Team?"
    a: "Der Product Owner, ein Admin, Entwickler des Umsetzungspartners, die Key User der betroffenen Gruppen und eine Person aus dem späteren Support, die den Betrieb übernimmt."
  - q: "Darf man in der Hypercare neue Funktionen ausliefern?"
    a: "Kleine Verbesserungen aus dem Feedback der Anwender ja, als Quick Wins über die normale Pipeline mit Test. Größere neue Funktionen gehen ins Backlog und kommen mit dem nächsten regulären Release."
draft: false
---

Die Hypercare-Phase ist die Zeit direkt nach einem Salesforce-Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar bleiben, bis der neue Prozess im Alltag stabil läuft. Sie dauert einige Wochen bis etwa drei Monate und endet nach vorher vereinbarten Kriterien, nicht an einem festen Datum. Ein fester Termin sortiert jede Meldung in Fehler, Bedienfrage, Datenproblem oder Änderungswunsch. Fehler werden behoben, Fragen beantwortet, kleine Wünsche als Quick Wins umgesetzt, große gehen ins Backlog. Hypercare ist außerdem die beste Quelle für Change Management, weil die Fragen der ersten Wochen zeigen, wo eine Gruppe hängt.

## Warum braucht ein Go-live eine Hypercare-Phase?

In den ersten Tagen nach einem Go-live kommen drei Dinge zusammen: Fehler, die der Test nicht gefunden hat, Fragen von Anwendern, die zum ersten Mal echte Fälle bearbeiten, und Daten aus der Migration, die nicht ganz stimmen. Der normale Support ist dafür nicht gebaut. Er kennt die neuen Abläufe noch nicht, und seine Reaktionszeiten passen nicht zu einem Vertrieb, der heute ein Angebot schicken muss.

Wer in dieser Phase keine schnelle Antwort bekommt, sucht sich einen Weg drumherum. Ein Angebot geht dann doch wieder aus Word raus, ein Einsatz wird per Telefon vergeben. Aus diesen Umwegen werden schnell Gewohnheiten, und die lassen sich später schwerer ändern als jeder Fehler. Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) ist das die Stufe Ability: Die Anwender wissen, wie es geht, schaffen es im Alltag aber noch nicht allein.

## Ein kleines Hypercare-Team, das entscheiden kann

Ein kleines Team, das Entscheidungen treffen und Fehler beheben kann:

- **Product Owner des Kunden.** Entscheidet, was ein Fehler ist und was ein Änderungswunsch, und priorisiert.
- **Admin.** Löst Rechte, Layouts und Datenkorrekturen sofort.
- **Entwickler des Umsetzungspartners.** Beheben Fehler in Code, Flows und Schnittstellen.
- **[Key User](../salesforce-key-user-netzwerk/) der betroffenen Gruppen.** Beantworten Bedienfragen vor Ort und melden, was im Team nicht funktioniert.
- **Eine Person aus dem späteren Support.** Lernt die Fälle von Anfang an mit, damit die Übergabe keine Lücke reißt.

Bei Schnittstellen zum ERP gehört außerdem jemand aus dem ERP-Team dazu. Viele Meldungen der ersten Tage sind Daten, die im ERP anders ankommen als erwartet, und die lassen sich nur gemeinsam klären.

## Ein fester Termin jeden Morgen

Meine Empfehlung für die ersten Tage nach dem Go-live: ein fester Termin am Morgen, 15 bis 30 Minuten, mit allen Meldungen des Vortags. Sobald die Zahl der Meldungen sinkt, reicht ein wöchentlicher Status-Call. Jede Meldung bekommt eine von vier Kategorien:

| Kategorie | Beispiel | Was passiert |
|---|---|---|
| Fehler | Angebot lässt sich nicht freigeben | Partner behebt, Fix geht über die Pipeline |
| Bedienfrage | „Wo finde ich die Ersatzteilliste?“ | Key User antwortet, Frage kommt in die Liste für Nachschulung |
| Datenproblem | Kunde aus der Migration ohne Ansprechpartner | Admin oder Datenteam korrigiert |
| Änderungswunsch | „Das Feld hätten wir gern weiter oben“ | klein: Quick Win in der Hypercare, groß: Backlog |

Die letzte Zeile verdient Aufmerksamkeit. Nach einem Go-live kommen viele berechtigte Wünsche. Kleine Verbesserungen, die schnell umgesetzt sind, gehören in die Hypercare: Die Anwender sehen, dass ihre Rückmeldung etwas bewirkt, und das stärkt die Bereitschaft mehr als eine Rundmail. Zwei Regeln gelten dabei. Fehler haben immer Vorrang, und auch Quick Wins gehen über die normale Pipeline mit Test, weil jede Änderung neue Fehler bringen kann. Größere Wünsche kommen ins Backlog und mit dem nächsten regulären Release. Wie Releases danach weiterlaufen, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/).

```hinweis tipp
Zählen Sie die Meldungen pro Kategorie und pro Gruppe jeden Tag mit. Viele Bedienfragen aus einem Team zeigen eine Lücke in der Schulung. Viele Änderungswünsche aus einem Team zeigen, dass es an den Entscheidungen vorher nicht beteiligt war.
```

## Welche Werkzeuge in Salesforce helfen?

Salesforce bringt einiges mit, was in der Hypercare Zeit spart. Mit „Als anderer Benutzer anmelden“ sieht der Admin, was ein Anwender sieht, und findet fehlende Rechte in Minuten statt nach langem Hin und Her. Der Setup Audit Trail zeigt, wer wann etwas am Setup geändert hat, was hilft, wenn nach einem Fix plötzlich etwas anderes nicht mehr geht. Die Login-Historie und einfache Berichte über angelegte Datensätze zeigen, welche Gruppen das System überhaupt nutzen.

Für die Nutzung lohnt es sich, schon zum Go-live die Berichte bereitzuhaben, die später den Erfolg messen. Dann zeigt die Hypercare von Anfang an, ob ein Team arbeitet oder nur liest. Welche Zahlen das sind, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

## Wann endet die Hypercare-Phase?

Wenn die vorher vereinbarten Kriterien erfüllt sind. Ein festes Datum führt dazu, dass Hypercare endet, während noch kritische Fehler offen sind, oder dass sie aus Gewohnheit weiterläuft. Vereinbaren Sie die Kriterien vor dem Go-live mit dem Product Owner und dem Betrieb, zum Beispiel:

- Seit einer Woche kein offener Fehler der höchsten Priorität.
- Die Zahl neuer Meldungen pro Tag sinkt seit mindestens einer Woche.
- Die wichtigsten Nutzungszahlen liegen auf dem Niveau, das vor dem Go-live als Ziel feststand.
- Der Support kennt die häufigsten Fälle und hat die Anleitungen dafür.

```praxis
Die Hypercare-Phase habe ich meist mit der Umsetzung von Feedback und Quick Wins verbunden. Teilweise lief sie bis zu drei Monate, mit wöchentlichen Status-Calls. Die Zeit lohnt sich, weil in diesen Wochen aus Rückmeldungen sichtbare Verbesserungen werden.
```

Planen Sie deshalb eher mit Wochen bis Monaten als mit Tagen, je nach Zahl der Gruppen und ERP-Schnittstellen. Bei einem Rollout in Wellen beginnt die Hypercare in jedem Land neu, wie in [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/) beschrieben.

## Wie übergeben Sie an den Betrieb?

Die Übergabe ist der Moment, in dem das Projektteam weiterzieht. Gut läuft sie, wenn der Support von Anfang an mit am Tisch saß und die Übergabe schrittweise passiert: zuerst übernimmt er Bedienfragen, dann Datenprobleme, zuletzt die Steuerung der Fehler mit dem Partner.

Nach der Übergabe bleibt eine Aufgabe für das Change Management: Die gesammelten Fragen und Meldungen zeigen, welche Gruppen noch Unterstützung brauchen. Diese Liste gehört zum Sponsor, nicht in die Ablage.

## Team, Termine und Endkriterien schriftlich festlegen

Legen Sie vor dem nächsten Go-live schriftlich fest, wer im Hypercare-Team sitzt, wie oft es sich trifft und nach welchen Kriterien die Hypercare endet. Planen Sie die Person aus dem Support von Anfang an ein, damit die Übergabe an den Betrieb schrittweise laufen kann. Wie wir Hypercare in Programmen aufsetzen, steht unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
