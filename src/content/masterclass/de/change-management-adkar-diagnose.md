---
title: "ADKAR-Modell: Diagnose für Salesforce-Einführungen"
description: "Das ADKAR-Modell als Diagnose: warum Salesforce-Einführungen bei Herstellern im Alltag stocken, welche Stufe je Gruppe fehlt und was Sie vorher festlegen."
lang: de
slug: change-management-adkar-diagnose
course: change-management
translationKey: cm-01
chapter: 1
pubDate: 2026-10-29
short: "ADKAR als Diagnose"
summary: "Warum Einführungen im Alltag ins Stocken geraten, wie ADKAR die Ursache je Gruppe zeigt und was vor dem ersten Release feststehen muss."
takeaways:
  - "Laut Prosci erreichten Projekte mit sehr gutem Change Management in 88 Prozent der Fälle ihre Ziele, mit schlechtem in 13 Prozent."
  - "ADKAR zerlegt die Veränderung in fünf Stufen: Bewusstsein, Bereitschaft, Wissen, Fähigkeit und Verankerung. Eine Schulung hilft nur bei Wissen und Fähigkeit."
  - "Die Diagnose erfolgt je betroffener Gruppe, weil Innendienst, Außendienst und Partner auf unterschiedlichen Stufen stehen."
  - "Vor dem ersten Release steht schriftlich fest, welche Gruppen betroffen sind, was sich für jede ändert und wer im Management dahintersteht."
articles: [change-management-hub, salesforce-center-of-excellence, change-adoption-metrics]
faq:
  - q: "Was ist das ADKAR-Modell?"
    a: "Ein Modell von Prosci mit fünf Stufen, die jede Person bei einer Veränderung durchläuft: Awareness, Desire, Knowledge, Ability und Reinforcement. Stockt eine Einführung, fehlt meist eine dieser Stufen, und jede Stufe braucht eine andere Maßnahme."
  - q: "Wann sollte Change Management in einem Salesforce-Programm beginnen?"
    a: "In der Planung, bevor gebaut wird. Change Management, das zwei Wochen vor dem Go-live beginnt, kann nur noch informieren. Welche Gruppen betroffen sind und was sich für sie ändert, beeinflusst sogar die Architektur, etwa bei einem globalen Template."
  - q: "Reicht eine gute Schulung nicht aus?"
    a: "Nur, wenn Wissen oder Fähigkeit fehlt. Wenn ein Team nicht weiß, wozu ein neuer Prozess gut ist, oder nicht mitmachen will, ändert eine weitere Schulung nichts. Das muss die Führungskraft der Gruppe erklären."
draft: false
---

Salesforce-Einführungen bei Herstellern scheitern selten an der Technik. Sie scheitern, wenn Vertrieb, Innendienst und Service nach dem Go-live weiter mit Excel, E-Mail und eigenen Listen arbeiten. Change Management verhindert das, indem es jede betroffene Gruppe durch die Veränderung führt. Ich nutze dafür das ADKAR-Modell von Prosci als Diagnose: Es zeigt je Gruppe, ob Bewusstsein, Bereitschaft, Wissen, Fähigkeit oder Verankerung fehlt. Daraus folgt die Maßnahme. Eine weitere Schulung hilft nur bei zwei der fünf Stufen. Dieses Kapitel klärt die Diagnose, die übrigen vier behandeln die Stufen der Reihe nach.

## Warum wird Salesforce im Alltag nicht genutzt?

Ein Release ist technisch in Minuten ausgerollt. Ob danach jemand anders arbeitet, entscheidet sich in den Wochen danach. Die Ursachen, die ich in Salesforce-Programmen sehe, lassen sich fast immer einer ADKAR-Stufe zuordnen: Wer eine Änderung erst in Produktion entdeckt, hatte keine Awareness und baut sich einen Umweg. Wer Opportunities nur pflegt, weil es Pflicht ist, kennt den Zweck nicht, etwa die Absatzplanung, die darauf aufbaut. Ohne Entscheidungen aus dem Management bleibt jede neue Regel freiwillig, das schwächt Desire und Reinforcement. Und wenn Probleme aus dem Alltag in E-Mails untergehen, statt im Backlog erfasst zu werden, fehlt der Rückkanal, über den Knowledge und Ability nachwachsen. Die ausführliche Liste der Gründe steht im Artikel [Salesforce Change Management: warum Einführungen scheitern](../../../blog/change-management-salesforce-einfuehrung/).

Dass sich der Aufwand lohnt, belegt die Langzeitstudie von Prosci. Für die 12. Ausgabe von [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) gaben 2.668 Personen Auskunft. Der Abstand zwischen gutem und schlechtem Change Management ist groß, und an erster Stelle der Erfolgsfaktoren steht ein Management, das die Einführung aktiv und sichtbar trägt.

```kennzahlen
88 % | Projekte mit sehr gutem Change Management, die ihre Ziele erreichten
13 % | Projekte mit schlechtem Change Management, die ihre Ziele erreichten
2.668 | Teilnehmende der 12. Ausgabe der Studie
quelle: Prosci, Best Practices in Change Management, 12. Ausgabe, Executive Summary
```

Die Diagnose gilt auch für die Technik. Führt ein Programm neue Regeln für Entwicklung und Release ein, stehen Entwicklerteams und Umsetzungspartner an denselben Stufen wie der Vertrieb. Darum geht es in [Kapitel 5](../nutzung-messen-und-verankern/).

## Die fünf ADKAR-Stufen im Salesforce-Programm

Das [ADKAR-Modell](https://www.prosci.com/blog/adkar-model) zerlegt eine Veränderung in fünf Stufen, die jede Person nacheinander durchläuft. Eine fehlende Stufe blockiert alle folgenden: Ohne Grund keine Bereitschaft, ohne Bereitschaft nur halbes Lernen. Für Salesforce-Programme lese ich die Stufen so:

| Stufe | Was die Person sich fragt | Woran Sie die Lücke erkennen | Wer sie schließt | Kapitel |
|---|---|---|---|---|
| Awareness (Bewusstsein) | Wozu das Ganze? | Sätze wie „Mit dem alten System lief es auch“ | die eigene Führungskraft | 2 |
| Desire (Bereitschaft) | Mache ich mit? | In Pflichtfeldern steht nur ein Punkt | Sponsor und Teamleitung | 2 |
| Knowledge (Wissen) | Wie geht das? | Anwender fragen, wo eine Funktion zu finden ist | Schulung und Key User | 3 |
| Ability (Fähigkeit) | Schaffe ich das im Tagesgeschäft? | In der Schulung funktioniert es, beim Kunden nicht | Key User vor Ort, Übung am echten Fall | 3 |
| Reinforcement (Verankerung) | Bleibe ich dabei? | Drei Monate später wieder die alte Excel-Liste | Berichte, Prüfungen, Anerkennung | 5 |

Kapitel 4 nimmt dieselben Stufen für einen Rollout über mehrere Länder und Teams auf, weil dort jede Welle sie von vorn durchläuft.

Der Nutzen liegt in der Diagnose. Bei niedriger Nutzung setzen viele Programme reflexhaft die nächste Schulung an. Mit ADKAR fragen wir stattdessen je Gruppe, auf welcher Stufe es stockt. Weiß der Vertrieb nicht, wofür gepflegte Opportunities gebraucht werden, fehlt Awareness, und das muss der Vertriebsleiter erklären, nicht der Trainer. Kennen Techniker die App, kommen aber offline nicht weiter, fehlt Ability, und das löst eine technische Änderung.

Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Übertragen auf Salesforce-Programme habe ich das Modell zusammen mit [Juliane Winterscheid](../../../partner/juliane-winterscheid/), mit der ich beim Change Management zusammenarbeite.

## Diagnose mit einer Zeile je Gruppe

Eine Diagnose für „die Anwender“ ist zu grob. Innendienst, Außendienst, Disposition, Händler und Partner stehen auf unterschiedlichen Stufen. Ich lege deshalb eine Tabelle mit einer Zeile je Gruppe an und beantworte darin diese Fragen:

1. **Was ändert sich für diese Gruppe im Alltag?** Konkret, etwa: Angebote entstehen künftig in Salesforce statt in Word, mit Liefertermin als Pflichtfeld.
2. **Auf welcher ADKAR-Stufe steht die Gruppe heute?** Eine ehrliche Schätzung aus Gesprächen mit Teamleitung und künftigen Key Usern reicht für den Anfang.
3. **Wer hilft an dieser Stufe?** Ein Name, keine Rolle.

Vor dem Go-live ist die Einschätzung eine Annahme. Nach dem Go-live ersetzen Nutzungszahlen die Schätzung: Ein Team, das sich täglich anmeldet, aber kaum Angebote anlegt, arbeitet woanders. Wie Sie das messen, beschreibt [Salesforce-Nutzung nach dem Go-live messen](../../../blog/salesforce-nutzung-messen-nach-go-live/).

```praxis
Den Satz „Change Management brauchen wir nicht“ höre ich oft. Das Budget ist vergeben, Schulungen stehen im Plan, an den Rest gewöhne man sich. Ich spreche das Thema trotzdem an, bei der Planung, vor jedem neuen Land und nach jedem Go-live.
```

## Change Management verläuft in Phasen parallel zum Release-Plan

Für die Ebene der Organisation beschreibt Prosci drei Phasen, den [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). Im Salesforce-Programm koppele ich sie an den Release-Plan:

```schritte
Vorgehen vorbereiten | vor dem ersten Release · Kunde mit Sponsor
  Erfolgsmaß, betroffene Gruppen und deren Änderungen sowie den Sponsor im Management schriftlich festhalten.
Veränderung steuern | mit jedem Release · Kunde, Key User
  Für jede Gruppe Maßnahmen je ADKAR-Stufe planen, an die Releases koppeln, Nutzung verfolgen und dort nachlegen, wo sie stockt.
Ergebnisse sichern | nach dem Go-live · interne Verantwortliche
  Offene Lücken schließen, Regeln in Pipeline, Berichten und Center-of-Excellence-Runden festschreiben, Verantwortung an das Unternehmen übergeben.
```

Der Zeitpunkt entscheidet. Startet Change Management zwei Wochen vor dem Go-live, bleibt nur noch Information. Welche Gruppen sich umstellen müssen, gehört deshalb in die Planung, bevor gebaut wird. Bei einem globalen Template wird das zur Architekturfrage, denn hinter vielen Abweichungswünschen eines Landes steht Gewohnheit, wie [Kapitel 4](../change-management-rollout-laender/) zeigt.

## Wer verantwortet Change Management?

Der Kunde. Ein Umsetzungspartner baut das System, die Veränderung im eigenen Unternehmen kann er nicht verantworten, weil er keinem Vertriebsleiter sagen kann, wie dessen Team künftig arbeitet. In den Programmen, die ich begleite, verteilen sich die Rollen so:

| Rolle | Aufgabe |
|---|---|
| Sponsor im Management | Steht sichtbar hinter der Einführung, entscheidet bei Konflikten zwischen Bereichen und fragt nach der Nutzung. Mehr in [Kapitel 2](../sponsor-und-kommunikation/). |
| Product Owner und Programmleitung | Halten den Einführungsplan je Release mit dem Release-Plan zusammen. |
| Key User | Tragen Wissen ins Team und Rückmeldungen ins Projekt, siehe [Kapitel 3](../key-user-und-schulung/). |
| Change-Managerin oder Change-Manager | Plant die Maßnahmen je Gruppe und Stufe und berät Sponsor und Führungskräfte. In großen Programmen lohnt dafür eine eigene Person mit Methodenerfahrung. |
| Architekt | Achtet darauf, dass Entscheidungen zu Template, Pflichtfeldern und Releases die Betroffenen mitdenken. |

## Erster Schritt: den Sponsor für das nächste Release benennen

Nehmen Sie sich das nächste Release vor und schreiben Sie drei Antworten auf: welche Gruppen es betrifft, was sich für jede im Alltag ändert und wer im Management sich dafür sichtbar einsetzt. Bleibt die letzte Antwort leer, fangen Sie dort an. Dann legen Sie das Erfolgsmaß fest, etwa den Anteil der Angebote aus Salesforce, und nicht die Zahl der Schulungen. Wie ich diese Arbeit mit Ihnen aufsetze, steht auf der Seite [Change Management für Salesforce-Programme](../../../leistungen/change-management/).

Das nächste Kapitel behandelt die ersten beiden Stufen, Awareness und Desire, mit Sponsor-Plan und Kommunikation je Release. Alle Kapitel finden Sie auf der [Übersichtsseite](../).
