---
title: "Hypercare-Phase im Salesforce-Projekt: Dauer und Ablauf"
description: "Was die Hypercare-Phase nach einem Salesforce-Go-live bedeutet, wer dazugehört, wie lange sie dauert und an welchen Kriterien Sie ihr Ende festmachen."
pubDate: 2026-10-29
lang: de
slug: hypercare-phase-salesforce-go-live
translationKey: change-hypercare
topic: governance
categories: [change-management, devops]
contactBrief: change
tags: [Hypercare, Hypercare-Phase, Go-live, Change Management, Salesforce-Einführung, Support]
takeaways:
  - "Die Hypercare-Phase ist die Zeit direkt nach dem Go-live, in der das Projektteam verstärkt erreichbar bleibt, bis der neue Prozess im Alltag stabil läuft."
  - "Sie endet nach vorher vereinbarten Kriterien, etwa ohne offene kritische Fehler und mit sinkender Zahl neuer Fragen, nicht an einem festen Datum."
  - "Ein kurzer täglicher Termin sortiert jede Meldung in Fehler, Bedienfrage, Datenproblem oder Änderungswunsch. Änderungswünsche gehen ins Backlog, nicht in die Hypercare."
  - "Hypercare ist auch Change Management: Fragen der ersten Wochen zeigen, an welcher ADKAR-Stufe eine Gruppe hängt."
faq:
  - q: "Was bedeutet Hypercare-Phase?"
    a: "Die Hypercare-Phase ist die Zeit direkt nach einem Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar sind, Fehler schneller behoben werden und Fragen der Anwender gesammelt werden, bis der Betrieb übernimmt."
  - q: "Wie lange dauert Hypercare nach einem Salesforce-Go-live?"
    a: "Meist einige Wochen. Entscheidend sind Endkriterien, die vorher feststehen, etwa keine offenen kritischen Fehler und eine sinkende Zahl neuer Meldungen. Bei Rollouts in Wellen beginnt sie in jedem Land neu."
  - q: "Wer gehört zum Hypercare-Team?"
    a: "Der Product Owner, ein Admin, Entwickler des Umsetzungspartners, die Key User der betroffenen Gruppen und eine Person aus dem späteren Support, die den Betrieb übernimmt."
  - q: "Darf man in der Hypercare neue Funktionen ausliefern?"
    a: "Nur Fehlerbehebungen. Neue Funktionen und Änderungswünsche gehen ins Backlog und kommen mit dem nächsten regulären Release, sonst entstehen neue Fehler, bevor die alten behoben sind."
draft: false
---

Die Hypercare-Phase ist die Zeit direkt nach einem Salesforce-Go-live, in der Projektteam, Partner und Key User verstärkt erreichbar bleiben, bis der neue Prozess im Alltag stabil läuft. Sie dauert meist einige Wochen und endet nach vorher vereinbarten Kriterien, nicht an einem festen Datum. Ein kurzer täglicher Termin sortiert jede Meldung in Fehler, Bedienfrage, Datenproblem oder Änderungswunsch. Fehler werden behoben, Fragen beantwortet, Änderungswünsche gehen ins Backlog. Hypercare ist außerdem die beste Quelle für Change Management, weil die Fragen der ersten Wochen zeigen, wo eine Gruppe hängt.

## Warum braucht ein Go-live eine Hypercare-Phase?

In den ersten Tagen nach einem Go-live kommen drei Dinge zusammen: Fehler, die der Test nicht gefunden hat, Fragen von Anwendern, die zum ersten Mal echte Fälle bearbeiten, und Daten aus der Migration, die nicht ganz stimmen. Der normale Support ist dafür nicht gebaut. Er kennt die neuen Abläufe noch nicht, und seine Reaktionszeiten passen nicht zu einem Vertrieb, der heute ein Angebot schicken muss.

Wer in dieser Phase keine schnelle Antwort bekommt, sucht sich einen Weg drumherum. Ein Angebot geht dann doch wieder aus Word raus, ein Einsatz wird per Telefon vergeben. Aus diesen Umwegen werden schnell Gewohnheiten, und die lassen sich später schwerer ändern als jeder Fehler. Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) ist das die Stufe Ability: Die Anwender wissen, wie es geht, schaffen es im Alltag aber noch nicht allein.

## Wer gehört zum Hypercare-Team?

Ein kleines Team, das Entscheidungen treffen und Fehler beheben kann:

- **Product Owner des Kunden.** Entscheidet, was ein Fehler ist und was ein Änderungswunsch, und priorisiert.
- **Admin.** Löst Rechte, Layouts und Datenkorrekturen sofort.
- **Entwickler des Umsetzungspartners.** Beheben Fehler in Code, Flows und Schnittstellen.
- **[Key User](../salesforce-key-user-netzwerk/) der betroffenen Gruppen.** Beantworten Bedienfragen vor Ort und melden, was im Team nicht funktioniert.
- **Eine Person aus dem späteren Support.** Lernt die Fälle von Anfang an mit, damit die Übergabe keine Lücke reißt.

Bei Schnittstellen zum ERP gehört außerdem jemand aus dem ERP-Team dazu. Viele Meldungen der ersten Tage sind Daten, die im ERP anders ankommen als erwartet, und die lassen sich nur gemeinsam klären.

## Wie läuft der tägliche Termin?

Ein fester Termin am Morgen, 15 bis 30 Minuten, mit allen Meldungen des Vortags. Jede Meldung bekommt eine von vier Kategorien:

| Kategorie | Beispiel | Was passiert |
|---|---|---|
| Fehler | Angebot lässt sich nicht freigeben | Partner behebt, Fix geht über die Pipeline |
| Bedienfrage | „Wo finde ich die Ersatzteilliste?“ | Key User antwortet, Frage kommt in die Liste für Nachschulung |
| Datenproblem | Kunde aus der Migration ohne Ansprechpartner | Admin oder Datenteam korrigiert |
| Änderungswunsch | „Das Feld hätten wir gern weiter oben“ | Backlog, nächstes reguläres Release |

Die letzte Zeile ist die schwierigste. Nach einem Go-live kommen viele berechtigte Wünsche, und es ist verlockend, sie schnell umzusetzen. Jede Änderung in dieser Phase kann aber neue Fehler bringen, bevor die alten behoben sind. In der Hypercare gehen deshalb nur Fehlerbehebungen nach Produktion, und auch die über die normale Pipeline mit Test. Wie Releases danach weiterlaufen, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/).

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

Als Annahme für die Planung: Bei einer Einführung für eine Gruppe reichen oft zwei bis vier Wochen, bei mehreren Gruppen und ERP-Schnittstellen eher mehr. Bei einem Rollout in Wellen beginnt die Hypercare in jedem Land neu, wie in [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/) beschrieben.

## Wie übergeben Sie an den Betrieb?

Die Übergabe ist der Moment, in dem das Projektteam weiterzieht. Gut läuft sie, wenn der Support von Anfang an mit am Tisch saß und die Übergabe schrittweise passiert: zuerst übernimmt er Bedienfragen, dann Datenprobleme, zuletzt die Steuerung der Fehler mit dem Partner.

```praxis
Beim Aufbau eines Release-Prozesses lief anfangs jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben. Diese Reihenfolge, erst eng begleiten und dann bewusst abgeben, gilt für die Hypercare genauso.
```

Nach der Übergabe bleibt eine Aufgabe für das Change Management: Die gesammelten Fragen und Meldungen zeigen, welche Gruppen noch Unterstützung brauchen. Diese Liste gehört zum Sponsor, nicht in die Ablage.

## Wo fangen Sie an?

Legen Sie vor dem nächsten Go-live drei Dinge schriftlich fest: wer im Hypercare-Team sitzt, wann der tägliche Termin ist und nach welchen Kriterien die Hypercare endet. Planen Sie die Person aus dem Support von Anfang an ein.

Ein Go-live ist erst geschafft, wenn der Betrieb ihn ohne Projektteam trägt. Wenn ein Go-live ansteht und Hypercare noch nicht geplant ist, [schreiben Sie mir](#contact) oder lesen Sie mehr über [Change Management Beratung für Salesforce](../../leistungen/change-management/), die ich mit meiner Kooperationspartnerin [Juliane Winterscheid](../../partner/juliane-winterscheid/) anbiete.
