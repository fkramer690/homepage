---
title: "ADKAR-Modell: Diagnose für Salesforce-Einführungen"
description: "Das ADKAR-Modell als Diagnose: warum Salesforce-Einführungen bei Herstellern im Alltag hängen, welche Stufe je Gruppe fehlt und was Sie vorher festlegen."
lang: de
slug: change-management-adkar-diagnose
course: change-management
translationKey: cm-01
chapter: 1
pubDate: 2026-10-29
short: "ADKAR als Diagnose"
summary: "Warum Einführungen im Alltag hängen bleiben, wie ADKAR die Ursache je Gruppe zeigt und was vor dem ersten Release feststehen muss."
takeaways:
  - "Eine Salesforce-Einführung scheitert selten an der Technik, sondern daran, dass Menschen nach dem Go-live weiter mit Excel, E-Mail und eigenen Listen arbeiten."
  - "ADKAR zerlegt die Veränderung in fünf Stufen: Bewusstsein, Bereitschaft, Wissen, Fähigkeit und Verankerung. Eine Schulung hilft nur bei Wissen und Fähigkeit."
  - "Die Diagnose läuft je betroffener Gruppe, weil Innendienst, Außendienst und Partner an unterschiedlichen Stufen hängen."
  - "Vor dem ersten Release stehen drei Antworten schriftlich fest: welche Gruppen betroffen sind, was sich für jede ändert und wer im Management sichtbar dahintersteht."
articles: [change-management-hub, salesforce-center-of-excellence, change-adoption-metrics]
faq:
  - q: "Was ist das ADKAR-Modell?"
    a: "Ein Modell von Prosci mit fünf Stufen, die jede Person bei einer Veränderung durchläuft: Awareness, Desire, Knowledge, Ability und Reinforcement. Hakt eine Einführung, fehlt meist eine dieser Stufen, und jede Stufe braucht eine andere Maßnahme."
  - q: "Wann sollte Change Management in einem Salesforce-Programm beginnen?"
    a: "In der Planung, bevor gebaut wird. Change Management, das zwei Wochen vor dem Go-live beginnt, kann nur noch informieren. Welche Gruppen betroffen sind und was sich für sie ändert, beeinflusst sogar die Architektur, etwa bei einem globalen Template."
  - q: "Reicht eine gute Schulung nicht aus?"
    a: "Nur, wenn Wissen oder Fähigkeit fehlt. Wenn ein Team nicht weiß, wozu ein neuer Prozess gut ist, oder nicht mitmachen will, ändert eine weitere Schulung nichts. Das muss die Führungskraft der Gruppe erklären."
draft: false
---

Salesforce-Einführungen bei Herstellern scheitern selten an der Technik. Sie scheitern, wenn Vertrieb, Innendienst und Service nach dem Go-live weiter mit Excel, E-Mail und eigenen Listen arbeiten. Change Management verhindert das, indem es jede betroffene Gruppe durch die Veränderung führt. Ich nutze dafür das ADKAR-Modell von Prosci als Diagnose: Es zeigt je Gruppe, ob Bewusstsein, Bereitschaft, Wissen, Fähigkeit oder Verankerung fehlt. Daraus folgt die Maßnahme. Eine weitere Schulung hilft nur bei zwei der fünf Stufen. Dieses Kapitel klärt die Diagnose, die übrigen vier gehen die Stufen der Reihe nach durch.

## Warum bleibt Salesforce im Alltag hängen?

Ein Release ist technisch in Minuten ausgerollt. Ob danach jemand anders arbeitet, entscheidet sich in den Wochen danach. In Salesforce-Programmen sehe ich dafür immer wieder dieselben Gründe:

- **Betroffene erfahren zu spät davon.** Wer eine Änderung erst in Produktion sieht, sucht sich einen Weg drumherum.
- **Niemand erklärt, wozu.** Ein Vertriebsteam pflegt Opportunities, weil es muss, und weiß nicht, dass die Absatzplanung darauf aufbaut.
- **Der Rückhalt im Management fehlt.** Ohne Entscheidungen von oben bleiben neue Regeln eine Empfehlung.
- **Es gibt keinen Rückweg.** Probleme aus dem Alltag landen in E-Mails und nicht im Backlog.

Prosci befragt seit 1998 Projekte nach ihren Erfahrungen. In der 12. Ausgabe der Studie [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) mit 2.668 Teilnehmenden erreichten Projekte mit sehr gutem Change Management ihre Ziele in 88 Prozent der Fälle, mit schlechtem in 13 Prozent. Als wichtigsten Erfolgsfaktor nannten die Teilnehmenden aktives und sichtbares Sponsoring durch das Management.

```kennzahlen
88 % | Projekte mit sehr gutem Change Management, die ihre Ziele erreichten
13 % | Projekte mit schlechtem Change Management, die ihre Ziele erreichten
2.668 | Teilnehmende der 12. Ausgabe der Studie
quelle: Prosci, Best Practices in Change Management, 12. Ausgabe, Executive Summary
```

Betroffen sind nicht nur Fachbereiche. Wenn ein Programm neue Standards für Entwicklung und Release einführt, sind Entwicklerteams und Umsetzungspartner genauso Betroffene. Darum geht es in [Kapitel 5](../nutzung-messen-und-verankern/).

## Was zeigt das ADKAR-Modell für ein Salesforce-Programm?

Das [ADKAR-Modell](https://www.prosci.com/blog/adkar-model) beschreibt fünf Stufen, die jede Person bei einer Veränderung durchläuft. Die Stufen bauen aufeinander auf: Wer nicht versteht, warum sich etwas ändert, will auch nicht mitmachen, und wer nicht mitmachen will, lernt die neue Funktion nur halb. Für ein Salesforce-Programm übersetze ich sie so:

| Stufe | Frage der Betroffenen | Zeichen, dass sie fehlt | Wer hilft | Kapitel |
|---|---|---|---|---|
| Awareness (Bewusstsein) | Warum ändert sich etwas? | „Das alte System ging doch auch.“ | Führungskraft der Gruppe | 2 |
| Desire (Bereitschaft) | Will ich mitmachen? | Pflichtfelder werden mit Punkten gefüllt | Sponsor, direkte Führungskraft | 2 |
| Knowledge (Wissen) | Weiß ich, wie es geht? | Fragen nach dem Weg zu einer Funktion | Schulung, Key User | 3 |
| Ability (Fähigkeit) | Kann ich es im Alltag? | Klappt in der Schulung, nicht im Kundentermin | Key User vor Ort, Übung | 3 |
| Reinforcement (Verankerung) | Bleibe ich dabei? | Nach drei Monaten zurück bei Excel | Berichte, Prüfungen, Anerkennung | 5 |

Kapitel 4 nimmt dieselben Stufen für einen Rollout über mehrere Länder und Teams auf, weil dort jede Welle sie von vorn durchläuft.

Der Nutzen liegt in der Diagnose. Bei niedriger Nutzung setzen viele Programme reflexhaft die nächste Schulung an. Mit ADKAR fragen wir stattdessen je Gruppe, an welcher Stufe es hängt. Weiß der Vertrieb nicht, wofür gepflegte Opportunities gebraucht werden, fehlt Awareness, und das muss der Vertriebsleiter erklären, nicht der Trainer. Kennen Techniker die App, kommen aber offline nicht weiter, fehlt Ability, und das löst eine technische Änderung.

Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Das Vorgehen habe ich gemeinsam mit Juliane Winterscheid auf Salesforce-Programme übertragen, meiner Kooperationspartnerin für Change Management. Mehr dazu im Artikel [Change Management: Warum Salesforce-Einführungen scheitern](../../../blog/change-management-salesforce-einfuehrung/).

## Wie stellen Sie die Diagnose je Gruppe?

Eine Diagnose für „die Anwender“ ist zu grob. Innendienst, Außendienst, Disposition, Händler und Partner hängen an unterschiedlichen Stufen. Ich lege deshalb eine Tabelle mit einer Zeile je Gruppe an und beantworte drei Fragen:

1. **Was ändert sich für diese Gruppe im Alltag?** Konkret, etwa: Angebote entstehen künftig in Salesforce statt in Word, mit Liefertermin als Pflichtfeld.
2. **An welcher ADKAR-Stufe steht die Gruppe heute?** Eine ehrliche Schätzung aus Gesprächen mit Teamleitung und künftigen Key Usern reicht für den Anfang.
3. **Wer hilft an dieser Stufe?** Ein Name, keine Rolle.

Vor dem Go-live ist die Einschätzung eine Annahme. Nach dem Go-live ersetzen Nutzungszahlen die Schätzung: Ein Team, das sich täglich anmeldet, aber kaum Angebote anlegt, arbeitet woanders. Wie Sie das messen, beschreibt [Salesforce-Nutzung nach dem Go-live messen](../../../blog/salesforce-nutzung-messen-nach-go-live/).

```praxis
Viele Kunden meinen, sie bräuchten kein Change Management. Das Budget ist verteilt, die Schulungen sind geplant, und die Nutzer werden sich schon gewöhnen. Ich bringe es trotzdem immer wieder ins Gespräch, in der Planung, vor jedem Land und nach jedem Go-live.
```

## Wie läuft Change Management neben dem Release-Plan?

Prosci gliedert die Arbeit auf Ebene der Organisation in drei Phasen, den [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In einem Salesforce-Programm laufen sie neben dem Release-Plan:

```schritte
Vorgehen vorbereiten | vor dem ersten Release · Kunde mit Sponsor
  Festlegen, woran Erfolg gemessen wird, welche Gruppen betroffen sind, was sich für jede ändert und wer im Management die Einführung trägt.
Veränderung steuern | mit jedem Release · Kunde, Key User
  Je Gruppe ein Plan entlang der ADKAR-Stufen, verknüpft mit dem Release-Plan. Nutzung messen und nachsteuern, wo sie hängt.
Ergebnisse sichern | nach dem Go-live · interne Verantwortliche
  Lücken prüfen, neue Regeln in Pipeline, Berichten und Center-of-Excellence-Calls verankern, Verantwortung übergeben.
```

Entscheidend ist der Zeitpunkt. Change Management, das zwei Wochen vor dem Go-live beginnt, kann nur noch informieren. Die Frage, welche Gruppen betroffen sind, gehört in die Planung, bevor gebaut wird. Bei einem globalen Template ist sie Teil der Architektur, weil jede Abweichung pro Land auch eine Frage der Gewohnheit ist, wie [Kapitel 4](../change-management-rollout-laender/) zeigt.

## Wer verantwortet Change Management?

Der Kunde. Ein Umsetzungspartner baut das System, die Veränderung im eigenen Unternehmen kann er nicht verantworten, weil er keinem Vertriebsleiter sagen kann, wie dessen Team künftig arbeitet. In den Programmen, die ich begleite, verteilen sich die Rollen so:

- **Sponsor im Management:** steht sichtbar hinter der Einführung, entscheidet bei Konflikten zwischen Bereichen und fragt nach der Nutzung. Mehr in [Kapitel 2](../sponsor-und-kommunikation/).
- **Product Owner und Programmleitung:** halten den Einführungsplan je Release mit dem Release-Plan zusammen.
- **Key User:** tragen Wissen ins Team und Rückmeldungen ins Projekt, siehe [Kapitel 3](../key-user-und-schulung/).
- **Change-Managerin oder Change-Manager:** plant die Maßnahmen je Gruppe und Stufe und berät Sponsor und Führungskräfte. In großen Programmen lohnt dafür eine eigene Person mit Methodenerfahrung.
- **Architekt:** achtet darauf, dass Entscheidungen zu Template, Pflichtfeldern und Releases die Betroffenen mitdenken.

## Was legen Sie vor dem ersten Release fest?

Beantworten Sie für das nächste Release drei Fragen schriftlich: Welche Gruppen sind betroffen? Was ändert sich für jede im Alltag? Wer im Management steht sichtbar dahinter? Fehlt die dritte Antwort, ist das der erste Schritt. Danach legen Sie fest, woran Sie Erfolg messen, zum Beispiel am Anteil der Angebote, die in Salesforce entstehen, statt an der Zahl der Schulungen. Wie ich diese Arbeit mit Ihnen aufsetze, steht auf der Seite [Change Management für Salesforce-Programme](../../../leistungen/change-management/).

Das nächste Kapitel behandelt die ersten beiden Stufen, Awareness und Desire, mit Sponsor-Plan und Kommunikation je Release. Alle Kapitel finden Sie auf der [Übersichtsseite](../).
