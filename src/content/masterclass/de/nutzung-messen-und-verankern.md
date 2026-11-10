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
  - "Ob ein Prozess genutzt wird, zeigen Berichte über angelegte und gepflegte Datensätze pro Gruppe und Land, nicht Logins und nicht die Zahl der Schulungen."
  - "Ich messe auf vier Ebenen: Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis, jeweils gegen einen Ausgangswert von vor dem Go-live."
  - "Gemessen wird mindestens ein halbes Jahr, monatlich; ob ein Prozess bleibt, zeigt sich erst nach drei bis sechs Monaten."
  - "Bei Partnern verankern Pipeline, Pull-Request-Review und Center-of-Excellence-Call die Standards. Dauerhaft wirken sie erst mit einem internen Verantwortlichen."
articles: [change-adoption-metrics, change-reinforcement-standards, salesforce-center-of-excellence, development-standards-definition-of-done, field-service-kpis-after-go-live]
faq:
  - q: "Welche Zahlen zeigen, ob Salesforce genutzt wird?"
    a: "Zahlen auf der Ebene des Prozesses, etwa der Anteil der Angebote, die in Salesforce entstehen, oder der Arbeitsaufträge, die in der App abgeschlossen werden. Dazu Datenqualität wie neue Dubletten. Logins allein sagen wenig, weil auch mitgezählt wird, wer nur exportiert."
  - q: "Wie erkennt man Schattenlösungen neben Salesforce?"
    a: "An Lücken zwischen Anmeldungen und angelegten Datensätzen, an nachträglicher Massenpflege kurz vor Berichtsterminen und an häufigen Exporten nach Excel. Keines dieser Zeichen ist ein Beweis, aber jedes ist ein Grund, mit dem Team zu sprechen."
  - q: "Wie bleiben Entwicklungsstandards bei Partnern dauerhaft erhalten?"
    a: "Was sich automatisch prüfen lässt, wird in der Pipeline geprüft. Für den Rest sorgen Pull-Request-Reviews auf Kundenseite und ein regelmäßiger Call mit den technischen Leads. Der Vertrag verweist auf die geltende Fassung der Standards, und ein interner Verantwortlicher übernimmt sie."
draft: false
---

Reinforcement, die letzte Stufe im ADKAR-Modell, sorgt dafür, dass eine Veränderung bleibt. In Salesforce-Programmen heißt das zweierlei. Bei Fachbereichen messen Sie die Nutzung auf vier Ebenen, Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis, gegen einen Ausgangswert von vor dem Go-live, und der Sponsor bespricht die Zahlen jeden Monat. Bei Entwicklerteams und Partnern verankern Pipeline, Pull-Request-Review und ein regelmäßiger Center-of-Excellence-Call die Standards. Dauerhaft wirkt beides erst, wenn ein interner Verantwortlicher es übernimmt.

## Warum fällt die Nutzung nach dem Go-live ab?

Was in den ersten Wochen nach dem Go-live passiert, täuscht. Alle schauen hin, Key User sitzen mit im Team, und viele probieren das neue System aus Neugier. Nach drei bis sechs Monaten ist das Projektteam weitergezogen, und dann zeigt sich, ob ein Prozess bleibt. Fällt eine Zahl in dieser Zeit ab, fehlt Reinforcement. Eine weitere Schulung ändert daran nichts, weil die Anwender wissen, wie der Prozess funktioniert. Es fehlen Gründe, dabeizubleiben: ein Sponsor, der nachfragt, Berichte, die auf den Daten aufbauen, und Prüfungen, die Abkürzungen auffallen lassen.

Die Zahl der geschulten Personen eignet sich dafür nicht als Maß. Sie belegt die Arbeit des Projekts, über den Alltag der Teams verrät sie nichts.

## Vier Ebenen, gemessen gegen den Ausgangswert vor dem Go-live

In Salesforce hinterlässt fast jede Handlung einen Datensatz mit Zeitstempel und Besitzer, das macht Messen einfach. Ich messe auf vier Ebenen. Für die Masterclass ist wichtiger, was ein Einbruch auf einer Ebene über die ADKAR-Stufe verrät:

| Ebene | Typische Zahl | Bricht sie ein, fehlt meist |
|---|---|---|
| Aktivität | aktive Nutzer je Woche | Awareness oder Desire: Das Team sieht keinen Grund, sich anzumelden |
| Nutzung des Prozesses | Anteil der Angebote aus Salesforce | Ability: Der Prozess funktioniert im Alltag nicht, oder eine Liste nebenher ist bequemer |
| Datenqualität | Pflichtfelder mit echtem Inhalt, neue Dubletten | Desire oder Knowledge: Felder werden ausgefüllt, weil es Pflicht ist, ohne den Zweck zu kennen |
| Ergebnis | Prognosegenauigkeit, Durchlaufzeit Angebot bis Auftrag | Reinforcement: Niemand fragt nach den Zahlen, also bleibt alles beim Alten |

Die erste Ebene liefert Salesforce fast ohne Aufwand über Login-Historie und Nutzungsdaten der Lightning-Oberfläche. Die aussagekräftigen Zahlen liegen auf der zweiten und dritten Ebene, und die müssen Sie für Ihre Prozesse selbst definieren. Für den Außendienst steht die Kennzahlenliste in [Field Service Kennzahlen nach dem Go-live](../../../blog/field-service-kennzahlen-operations-home/), für alle anderen Bereiche die Methode in [Salesforce-Nutzung nach dem Go-live messen](../../../blog/salesforce-nutzung-messen-nach-go-live/).

```hinweis achtung
Halten Sie vor dem Go-live fest, wie viele Angebote heute im Monat entstehen, ganz gleich in welchem Werkzeug. Fehlt diese Zahl, können Sie 200 Angebote in Salesforce später weder als Erfolg noch als Warnsignal lesen.
```

## Wie erkennen Sie Schattenlösungen?

Am teuersten wird niedrige Nutzung, wenn neben Salesforce eine eigene Liste weitergeführt wird. Sie verrät sich auf drei Wegen. Hohe Anmeldezahlen bei wenigen neuen Datensätzen bedeuten, dass das Team nur nachschaut und woanders arbeitet. Große Aktualisierungswellen kurz vor dem Monatsbericht an die Geschäftsführung deuten darauf hin, dass Daten nachgetragen werden. Und Berichte, die regelmäßig als Excel-Datei exportiert werden, füttern oft genau diese Liste.

Beweisen lässt sich damit nichts, aber jedes Zeichen ist Anlass für ein Gespräch mit dem Team, am besten über den Key User aus [Kapitel 3](../key-user-und-schulung/). Dann folgt die Diagnose aus [Kapitel 1](../change-management-adkar-diagnose/): Auf welcher Stufe kommt die Gruppe nicht weiter?

## Wer erhält welche Zahl?

Im Lenkungsausschuss reichen je Prozess zwei bis drei Zahlen aus Prozessnutzung und Ergebnis, jeweils mit dem Verlauf seit dem Go-live. Der Sponsor eines Landes oder Bereichs sieht dieselben Zahlen für seine Teams, und schon seine Nachfrage im Monatsbericht wirkt als Reinforcement. Key User und Teamleitungen erhalten die Detailsicht, als Grundlage für Gespräche. Eine öffentliche Rangliste einzelner Personen führt dazu, dass Zahlen geschönt werden statt Daten gepflegt, und in Deutschland muss eine solche Auswertung vorher mit dem Betriebsrat geklärt werden, wie in [Kapitel 2](../sponsor-und-kommunikation/) beschrieben. Bei einem weltweiten Rollout messen Sie pro Land, weil jedes Land einen eigenen Verlauf hat.

## Bei Partnern verankern Pipeline, Review und Center-of-Excellence-Call die Standards

Change Management betrifft auch Entwicklerteams und Umsetzungspartner. Neue Standards für Entwicklung und Release verwässern nach einigen Monaten, wenn neue Entwickler hinzukommen, der Termindruck steigt und die Aufmerksamkeit nachlässt. Dann fehlt nicht das Wissen, sondern die Verankerung.

```praxis
In meinem größten Programm mit mehr als 30 Entwicklern in acht Streams und fünf Umsetzungspartnern habe ich anfangs jeden Pull Request selbst geprüft. Bis die Standards im Alltag eingehalten wurden, hat es etwa drei Monate gedauert. Danach besprachen wir neue Themen alle zwei Wochen in einem Center-of-Excellence-Call mit den technischen Leads der Streams. Als der Prozess stabil war, habe ich ihn an einen internen Kollegen übergeben.
```

Jeder Hebel deckt einen anderen Teil ab:

- **Automatische Prüfung in der Pipeline** für Namen, verbotene Muster und Testabdeckung. Sie ist der günstigste Hebel, weil sie nie müde wird.
- **Pull-Request-Review auf Kundenseite** für Design, Verantwortung für Objekte und Passung zur Architektur.
- **Center-of-Excellence-Call** für neue Randfälle. Die technischen Leads tragen die Entscheidungen in ihre Teams, Format und Rhythmus stehen in [Salesforce Center of Excellence: Format und Rhythmus](../../../blog/salesforce-center-of-excellence-format/).
- **Einarbeitung neuer Entwickler,** verantwortet vom Partner und geprüft vom Kunden.
- **Vertrag,** der auf die geltende Fassung der Standards verweist und Verstöße von der Abnahme ausschließt.

Ausnahmen unter Termindruck wird es geben. Sie brauchen im Pull Request eine Begründung und ein Ticket für die Korrektur. Alle Hebel im Detail beschreibe ich in [Reinforcement: Standards bei Partnern verankern](../../../blog/standards-partner-verankern-reinforcement/).

## Die Veränderung ist verankert, wenn sie ohne ihre Einführer funktioniert

Bei Fachbereichen bleiben die Zahlen auf der Ebene des Prozesses nach sechs Monaten stabil, und neue Kollegen lernen den Prozess von Key Usern statt aus alten Listen. Bei Partnern merken Reviewer seltener dieselben Punkte an, neue Randfälle werden vor der Umsetzung im Call besprochen, und neue Entwickler halten die Regeln ein, ohne dass jemand sie einzeln erklärt. In beiden Fällen gilt: Die Veränderung ist verankert, wenn sie auch ohne die Person Bestand hat, die sie eingeführt hat. Planen Sie deshalb von Anfang an, wer auf Kundenseite übernimmt. Wie ich Sie dabei begleite, steht auf der Seite [Change Management für Salesforce-Programme](../../../leistungen/change-management/).

Mit diesem Kapitel endet die Masterclass. Alle Kapitel und Fachartikel finden Sie auf der [Übersichtsseite](../).
