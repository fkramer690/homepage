---
title: "Salesforce-Nutzung messen und Standards verankern"
description: "Reinforcement in Salesforce-Programmen: Nutzung auf vier Ebenen messen, Schattenlösungen erkennen, Standards bei Partnern mit Pipeline und CoE-Call verankern."
lang: de
slug: nutzung-messen-und-verankern
course: change-management
translationKey: cm-05
chapter: 5
pubDate: 2026-10-29
short: "Messen und verankern"
summary: "Reinforcement: Nutzung auf vier Ebenen messen, Schattenlösungen erkennen und Standards bei Partnern dauerhaft verankern."
takeaways:
  - "Ob ein Prozess angekommen ist, zeigen Berichte über angelegte und gepflegte Datensätze pro Gruppe und Land, nicht Logins und nicht die Zahl der Schulungen."
  - "Ich messe auf vier Ebenen: Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis, jeweils gegen einen Ausgangswert von vor dem Go-live."
  - "Gemessen wird mindestens ein halbes Jahr, monatlich; ob ein Prozess bleibt, zeigt sich erst nach drei bis sechs Monaten."
  - "Bei Partnern verankern Pipeline, Pull-Request-Review und ein Center-of-Excellence-Call die Standards, dauerhaft halten sie erst mit einem internen Verantwortlichen."
articles: [change-adoption-metrics, change-reinforcement-standards, salesforce-center-of-excellence, development-standards-definition-of-done, field-service-kpis-after-go-live]
faq:
  - q: "Welche Zahlen zeigen, ob Salesforce genutzt wird?"
    a: "Zahlen auf der Ebene des Prozesses, etwa der Anteil der Angebote, die in Salesforce entstehen, oder der Arbeitsaufträge, die in der App abgeschlossen werden. Dazu Datenqualität wie neue Dubletten. Logins allein sagen wenig, weil auch zählt, wer nur exportiert."
  - q: "Wie erkennt man Schattenlösungen neben Salesforce?"
    a: "An Lücken zwischen Anmeldungen und angelegten Datensätzen, an nachträglicher Massenpflege kurz vor Berichtsterminen und an häufigen Exporten nach Excel. Keines dieser Zeichen ist ein Beweis, aber jedes ist ein Grund, mit dem Team zu sprechen."
  - q: "Wie bleiben Entwicklungsstandards bei Partnern dauerhaft?"
    a: "Was sich automatisch prüfen lässt, kommt in die Pipeline. Der Rest läuft über Pull-Request-Reviews auf Kundenseite und einen regelmäßigen Call mit den technischen Leads. Der Vertrag verweist auf die geltende Fassung der Standards, und ein interner Verantwortlicher übernimmt sie."
draft: false
---

Reinforcement, die letzte Stufe im ADKAR-Modell, sorgt dafür, dass eine Veränderung bleibt. In Salesforce-Programmen heißt das zweierlei. Bei Fachbereichen messen Sie die Nutzung auf vier Ebenen, Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis, gegen einen Ausgangswert von vor dem Go-live, und der Sponsor bespricht die Zahlen jeden Monat. Bei Entwicklerteams und Partnern verankern Pipeline, Pull-Request-Review und ein regelmäßiger Center-of-Excellence-Call die Standards. Dauerhaft hält beides erst, wenn ein interner Verantwortlicher es führt.

## Warum fällt die Nutzung nach dem Go-live ab?

Die ersten Wochen nach dem Go-live sind verzerrt. Die Aufmerksamkeit ist hoch, Key User sind präsent, und viele probieren das neue System aus. Nach drei bis sechs Monaten ist das Projektteam weitergezogen, und dann zeigt sich, ob ein Prozess bleibt. Fällt eine Zahl in dieser Zeit ab, fehlt Reinforcement. Eine weitere Schulung ändert daran nichts, weil die Leute wissen, wie es geht. Es fehlen Gründe, dabeizubleiben: ein Sponsor, der nachfragt, Berichte, die auf den Daten aufbauen, und Prüfungen, die Abkürzungen auffallen lassen.

Viele Programme berichten nach dem Go-live, wie viele Personen geschult wurden. Die Zahl sagt, dass das Projekt seine Arbeit gemacht hat. Ob jemand anders arbeitet, sagt sie nicht.

## Welche Zahlen zeigen, ob ein Prozess angekommen ist?

Salesforce hilft beim Messen, weil fast alles, was ein Nutzer tut, einen Datensatz mit Zeitstempel und Besitzer hinterlässt. Ich messe auf vier Ebenen:

| Ebene | Frage | Beispiele |
|---|---|---|
| Aktivität | Öffnen die Nutzer das System? | aktive Nutzer pro Woche, Logins, Seitenaufrufe |
| Nutzung des Prozesses | Findet der Prozess in Salesforce statt? | Angebote aus Salesforce statt aus Word, Aufträge in der App abgeschlossen |
| Datenqualität | Sind die Daten brauchbar? | Pflichtfelder sinnvoll gefüllt statt mit Punkten, neue Dubletten |
| Ergebnis | Bringt es, wofür es gebaut wurde? | Prognosegenauigkeit, Erstlösungsquote, Durchlaufzeit vom Angebot zum Auftrag |

Die erste Ebene liefert Salesforce fast ohne Aufwand über Login-Historie und Nutzungsdaten der Lightning-Oberfläche. Die aussagekräftigen Zahlen liegen auf der zweiten und dritten Ebene, und die müssen Sie für Ihre Prozesse selbst definieren. Für den Außendienst steht die Kennzahlenliste in [Field Service Kennzahlen nach dem Go-live](../../../blog/field-service-kennzahlen-operations-home/), für alle anderen Bereiche die Methode in [Salesforce-Nutzung nach dem Go-live messen](../../../blog/salesforce-nutzung-messen-nach-go-live/).

```hinweis achtung
Legen Sie vor dem Go-live einen Ausgangswert fest, etwa wie viele Angebote heute pro Monat erstellt werden, egal in welchem System. Ohne Ausgangswert wissen Sie nach dem Go-live nicht, ob 200 Angebote in Salesforce viel oder wenig sind.
```

## Wie erkennen Sie Schattenlösungen?

Die teuerste Form niedriger Nutzung ist die Liste neben dem System. Drei Zeichen deuten darauf hin:

- **Lücken zwischen Aktivität und Prozess.** Ein Team meldet sich täglich an, legt aber kaum Datensätze an. Dann wird gelesen und anderswo gearbeitet.
- **Nachträgliche Massenpflege.** Datensätze werden einmal im Monat in großen Mengen aktualisiert, kurz vor dem Bericht an die Geschäftsführung.
- **Häufige Exporte.** Berichte, die regelmäßig nach Excel gehen, sind oft die Grundlage einer eigenen Liste.

Keines dieser Zeichen ist ein Beweis. Es ist ein Grund, mit dem Team zu sprechen, am besten über den Key User aus [Kapitel 3](../key-user-und-schulung/). Dann folgt die Diagnose aus [Kapitel 1](../change-management-adkar-diagnose/): An welcher Stufe hängt die Gruppe?

## Wer bekommt welche Zahl?

Der Lenkungsausschuss braucht zwei oder drei Zahlen pro Prozess auf den Ebenen Nutzung und Ergebnis, mit dem Verlauf seit dem Go-live. Der Sponsor eines Landes oder Bereichs braucht dieselben Zahlen für seine Teams. Wenn er im Monatsbericht danach fragt, ist das selbst schon Reinforcement. Key User und Teamleitungen brauchen die Detailsicht, aber für Gespräche und nicht für Ranglisten. Wer Einzelpersonen öffentlich vergleicht, bekommt gepflegte Zahlen statt gepflegter Daten, und in Deutschland gehört eine solche Auswertung vorher mit dem Betriebsrat geklärt, wie in [Kapitel 2](../sponsor-und-kommunikation/) beschrieben. Bei einem weltweiten Rollout messen Sie pro Land, weil jedes Land einen eigenen Verlauf hat.

## Wie verankern Sie Standards bei Partnern?

Change Management betrifft auch Entwicklerteams und Umsetzungspartner. Neue Standards für Entwicklung und Release verwässern nach einigen Monaten, wenn neue Entwickler dazukommen, der Termindruck steigt und die Aufmerksamkeit nachlässt. Dann fehlt nicht das Wissen, sondern die Verankerung.

```praxis
In meinem größten Programm mit mehr als 30 Entwicklern in acht Streams und fünf Umsetzungspartnern lief anfangs jeder Pull Request über meinen Schreibtisch. Bis die Standards gelebt wurden, hat es etwa drei Monate gedauert. Danach brachten wir neue Themen alle zwei Wochen in einem Center-of-Excellence-Call mit den technischen Leads der Streams auf den Tisch. Als der Prozess rund lief, habe ich ihn an einen internen Kollegen übergeben.
```

Jeder Hebel deckt einen anderen Teil ab:

- **Automatische Prüfung in der Pipeline** für Namen, verbotene Muster und Testabdeckung. Sie ist der günstigste Hebel, weil sie nie müde wird.
- **Pull-Request-Review auf Kundenseite** für Design, Verantwortung für Objekte und Passung zur Architektur.
- **Center-of-Excellence-Call** für neue Randfälle. Die technischen Leads tragen die Entscheidungen in ihre Teams, Format und Rhythmus stehen in [Salesforce Center of Excellence: Format und Rhythmus](../../../blog/salesforce-center-of-excellence-format/).
- **Einarbeitung neuer Entwickler,** verantwortet vom Partner und geprüft vom Kunden.
- **Vertrag,** der auf die geltende Fassung der Standards verweist und Verstöße von der Abnahme ausschließt.

Ausnahmen unter Termindruck wird es geben. Sie brauchen im Pull Request eine Begründung und ein Ticket für die Korrektur. Alle Hebel im Detail beschreibe ich in [Reinforcement: Standards bei Partnern verankern](../../../blog/standards-partner-verankern-reinforcement/).

## Woran erkennen Sie, dass die Veränderung bleibt?

Bei Fachbereichen bleiben die Zahlen auf der Ebene des Prozesses nach sechs Monaten stabil, und neue Kollegen lernen den Prozess von Key Usern statt aus alten Listen. Bei Partnern merken Reviewer seltener dieselben Punkte an, neue Randfälle kommen vor dem Bau in den Call, und neue Entwickler halten die Regeln ein, ohne dass jemand sie einzeln erklärt. In beiden Fällen gilt: Die Veränderung ist verankert, wenn sie ohne die Person hält, die sie eingeführt hat. Planen Sie deshalb von Anfang an, wer auf Kundenseite übernimmt. Wie ich Sie dabei begleite, steht auf der Seite [Change Management für Salesforce-Programme](../../../leistungen/change-management/).

Mit diesem Kapitel endet die Masterclass. Alle Kapitel und Fachartikel finden Sie auf der [Übersichtsseite](../).
