---
title: "Change-Management-Prozess im Salesforce-Projekt"
description: "Welche Change-Arbeit in welche Phase eines Salesforce-Projekts gehört, von der Planung über Bau und Abnahmetest bis Go-live und Betrieb, mit Ergebnis je Phase."
pubDate: 2026-10-29
lang: de
slug: change-management-prozess-salesforce
translationKey: change-process-salesforce
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [Change-Management-Prozess, Prosci, ADKAR, Salesforce-Einführung, Projektphasen]
takeaways:
  - "Jede Projektphase hat eine eigene Change-Aufgabe mit einem greifbaren Ergebnis, von der Impact-Analyse bis zur Übergabe an interne Rollen."
  - "In der Planung entsteht das Wichtigste: welche Gruppen betroffen sind, was sich für jede ändert, wer im Management dahintersteht und woran Erfolg gemessen wird."
  - "Zum Go-live muss sichergestellt sein, dass es keinen Weg zurück zur alten Arbeitsweise gibt. Sonst tritt keine Veränderung ein."
  - "Nach dem Go-live entscheidet sich, ob die Veränderung bleibt: messen, Lücken schließen und die Verantwortung an interne Rollen übergeben."
faq:
  - q: "Wie sieht ein Change-Management-Prozess aus?"
    a: "Nach Prosci in drei Phasen: Vorgehen vorbereiten, Veränderung steuern, Ergebnisse sichern. In einem Salesforce-Projekt laufen sie parallel zu Planung, Bau, Abnahmetest, Go-live und Betrieb."
  - q: "Wann beginnt Change Management in einem Salesforce-Projekt?"
    a: "In der Planung, bevor gebaut wird. Welche Gruppen betroffen sind und was sich für sie ändert, beeinflusst auch die Lösung selbst. Wer erst kurz vor dem Go-live beginnt, kann nur noch informieren."
  - q: "Was ist eine Change-Impact-Analyse?"
    a: "Eine Übersicht je betroffener Gruppe, was sich für sie ändert, zum Beispiel Prozesse, Systeme, Rollen, Verhalten oder Berichtswege. Sie ist die Grundlage für Kommunikation, Schulung und Sponsor-Plan."
  - q: "Wann endet der Change-Management-Prozess?"
    a: "Wenn die neue Arbeitsweise gemessen genutzt wird und interne Rollen die Verantwortung übernommen haben, also deutlich nach dem Go-live. Bei Rollouts in Wellen beginnt er in jedem Land neu."
draft: false
---

Der Change-Management-Prozess in einem Salesforce-Projekt läuft parallel zum Projektplan, und jede Projektphase hat ihre eigene Change-Aufgabe. In der Planung klären Sie, welche Gruppen betroffen sind, was sich für jede ändert, wer im Management dahintersteht und woran Sie Erfolg messen. Während Bau und Abnahmetest beteiligen Sie Key User und bereiten Kommunikation und Schulung vor. Zum Go-live stellen Sie sicher, dass es keinen Weg zurück gibt. Danach messen Sie die Nutzung, schließen Lücken und übergeben die Verantwortung an interne Rollen. Ich orientiere mich dabei am Prozess von Prosci und übersetze ihn in die Phasen eines Salesforce-Projekts.

## Die drei Prosci-Phasen am Salesforce-Projektplan

Prosci gliedert die Arbeit in drei Phasen: Vorgehen vorbereiten, Veränderung steuern, Ergebnisse sichern. Was die Phasen allgemein bedeuten, erklärt Juliane Winterscheid in [Was ist Change Management?](../was-ist-change-management/), und wie sich Prosci von Lewin und Kotter unterscheidet, in [Change-Management-Modelle im Vergleich](../change-management-modelle/). Hier geht es um die Frage, die im Projekt zählt: Was ist in welcher Projektphase zu tun, und was liegt am Ende auf dem Tisch?

| Projektphase | Prosci-Phase | Change-Arbeit | Ergebnis |
|---|---|---|---|
| Planung | Vorgehen vorbereiten | Betroffene Gruppen und Auswirkungen klären, Sponsor gewinnen, Erfolg definieren | Impact-Analyse, Sponsor-Plan, Kennzahlen mit Ausgangswert |
| Fachkonzept und Bau | Veränderung steuern | Key User beteiligen, Plan je Gruppe entlang ADKAR, Kommunikation starten | Plan je Gruppe, Kommunikationsplan |
| Abnahmetest | Veränderung steuern | Key User testen eigene Fälle, Schulung vorbereiten, Widerstände prüfen | Schulungskonzept, Liste offener Bedenken |
| Go-live | Veränderung steuern | Schulung, alte Wege schließen, Hypercare starten | Abschaltdatum alter Listen, Hypercare-Team |
| Betrieb | Ergebnisse sichern | Nutzung messen, Lücken schließen, Verantwortung übergeben | Monatsbericht an Sponsor, Übergabe an interne Rollen |

Die Tabelle beschreibt ein Release mit einem großen Go-live. Bei einem Rollout in Wellen läuft der Ablauf ab dem Fachkonzept für jedes Land neu, wie in [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/) beschrieben.

## Was gehört in die Planung?

Die Planung entscheidet am meisten, und genau hier fehlt Change Management am häufigsten. Drei Ergebnisse sollten stehen, bevor gebaut wird.

**Eine Impact-Analyse je Gruppe.** Prosci betrachtet zehn Aspekte einer Veränderung, darunter Prozesse, Systeme, Werkzeuge, Rollen, entscheidendes Verhalten, Berichtswege und Leistungsbeurteilung ([Prosci: Defining Change Impact](https://www.prosci.com/blog/defining-change-impact)). In einem Salesforce-Projekt bei einem Hersteller sieht das zum Beispiel so aus: Der Innendienst erstellt Angebote künftig im Konfigurator statt in Word (Prozess, Werkzeug). Der Vertrieb pflegt Opportunities, aus denen die Absatzprognose entsteht (Verhalten). Die Vertriebsleitung bespricht die Pipeline aus einem Dashboard statt aus einer Excel-Liste (Berichtsweg). Je mehr Aspekte sich für eine Gruppe ändern, desto mehr Begleitung braucht sie.

**Ein Sponsor-Plan.** Er legt fest, wer im Management die Einführung trägt und was diese Person wann sichtbar tut: im Vertriebsmeeting erklären, warum Prognosen künftig aus Salesforce kommen, bei Streit zwischen Bereichen entscheiden, im Monatsbericht nach der Nutzung fragen.

**Erfolgskennzahlen mit Ausgangswert.** Woran erkennen Sie in sechs Monaten, dass der Prozess angekommen ist? Zum Beispiel am Anteil der Angebote, die aus Salesforce kommen. Den Ausgangswert messen Sie vor dem Go-live, sonst fehlt der Vergleich. Welche Zahlen sich eignen, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

```praxis
Viele Kunden meinen am Anfang, Schulungen reichten als Change Management. Ich bringe das Thema deshalb nicht nur einmal ein, sondern in der Planung, vor jedem Land und nach jedem Go-live erneut.
```

In der Planung wirkt es am stärksten, weil die Impact-Analyse dort noch die Lösung selbst beeinflussen kann.

## Was passiert während Bau und Abnahmetest?

In dieser Zeit läuft die eigentliche Steuerung. Für jede betroffene Gruppe entsteht ein Plan entlang der fünf ADKAR-Stufen: Wer erklärt, warum sich etwas ändert, wer sorgt für Bereitschaft, wann wird geschult, wer hilft im Alltag, wie wird verankert. Wie Sie für eine Gruppe herausfinden, an welcher Stufe es hängt, zeigt das Kapitel [ADKAR-Modell: Diagnose für Salesforce-Einführungen](../../masterclass/change-management/change-management-adkar-diagnose/) der Masterclass.

Drei Dinge sind in dieser Phase besonders wirksam:

- **[Key User](../salesforce-key-user-netzwerk/) beteiligen.** Sie beschreiben die Abläufe ihres Teams, formulieren Akzeptanzkriterien mit und testen im Abnahmetest ihre eigenen Fälle. Wer an der Lösung mitgebaut hat, verteidigt sie später im Team.
- **Früh kommunizieren.** Betroffene erfahren vor dem Bau, was kommt, und vor jedem Release, was sich ändert. Wie das bei laufenden Releases aussieht, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/).
- **Bedenken ernst nehmen.** Fragen und Einwände aus Workshops und Abnahmetest gehören auf eine Liste mit Antwort und Verantwortlichem. Ein Einwand, der im Abnahmetest auftaucht, kommt nach dem Go-live als Excel-Liste zurück, wenn ihn niemand beantwortet.

Am Ende des Abnahmetests steht das [Schulungskonzept](../salesforce-schulungskonzept-einfuehrung/): welche Rolle welche Abläufe lernt, in welchem Format und wann.

## Zum Go-live gibt es keinen Weg zurück

Zum Go-live kommt der Teil, den viele Projekte unterschätzen. Ich achte darauf, dass es keinen Weg zurück gibt. Solange es die Option gibt, nach der alten Weise zu arbeiten, tritt keine Veränderung ein. Das heißt: Alte Vorlagen und Listen bekommen ein Abschaltdatum, das die Führung ankündigt, und Berichte an die Geschäftsführung kommen ab diesem Tag aus Salesforce.

```hinweis achtung
Ein Go-live ohne Abschaltdatum für die alten Wege ist ein Parallelbetrieb ohne Ende. Legen Sie das Datum mit dem Sponsor fest, bevor die Schulungen beginnen, und sagen Sie es in jeder Schulung.
```

Gleichzeitig beginnt die [Hypercare-Phase](../hypercare-phase-salesforce-go-live/). Projektteam, Partner und Key User bleiben verstärkt erreichbar, Fehler werden schnell behoben und kleine Verbesserungen aus dem Feedback als Quick Wins umgesetzt. Für den Change-Management-Prozess ist sie die wichtigste Quelle: Die Fragen der ersten Wochen zeigen, welche Gruppe an welcher Stelle hängt.

## Wie sichern Sie das Ergebnis nach dem Go-live?

Die dritte Prosci-Phase beginnt nach dem Go-live und wird am häufigsten gestrichen, weil das Projektteam weiterzieht. Sie hat drei Teile. Messen: Der Sponsor bekommt jeden Monat die Kennzahlen aus der Planung, pro Gruppe und Land. Lücken schließen: Wo die Nutzung hängt, wird nach der fehlenden ADKAR-Stufe gefragt, nicht automatisch nachgeschult. Die Verantwortung übergeben: Interne Rollen übernehmen, was das Projekt aufgebaut hat, etwa der Key-User-Austausch, die Release-Kommunikation und regelmäßige Termine wie ein [Center-of-Excellence-Call](../salesforce-center-of-excellence-format/), in dem neue Themen vorab auf den Tisch kommen.

Der Prozess endet, wenn die neue Arbeitsweise gemessen genutzt wird und niemand aus dem Projekt mehr dafür gebraucht wird. Das ist deutlich nach dem Go-live.

## Ein Change-Ergebnis in jede Projektphase eintragen

Nehmen Sie den Projektplan Ihres nächsten Salesforce-Vorhabens und tragen Sie für jede Phase ein, welches Change-Ergebnis am Ende vorliegen soll. Fehlen in der Planung die Impact-Analyse, der Sponsor-Plan oder die Kennzahlen, ist das Ihr erster Schritt. Der Hub-Artikel [Salesforce Change Management: warum Einführungen scheitern](../change-management-salesforce-einfuehrung/) zeigt, welche Themen dazugehören. Wie wir den Prozess in Programmen begleiten, steht unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
