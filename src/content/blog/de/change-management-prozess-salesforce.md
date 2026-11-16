---
title: "Change-Management-Prozess im Salesforce-Projekt"
description: "Welche Change-Arbeit in welche Phase eines Salesforce-Projekts gehört, von Planung über Umsetzung und Abnahmetest bis Go-live und Betrieb, mit Ergebnissen."
pubDate: 2026-10-29
updatedDate: 2026-11-09
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
  - "In der Planung entsteht die Grundlage: welche Gruppen betroffen sind, was sich für jede ändert, wer im Management dahintersteht und woran Erfolg gemessen wird."
  - "Ab dem Go-live ist der neue Prozess der verbindliche Standard. Alte Wege bekommen ein Enddatum; Rückfallwege sind genehmigt, gemessen und befristet."
  - "Nach dem Go-live entscheidet sich, ob die Veränderung bleibt: messen, Lücken schließen und die Verantwortung an interne Rollen übergeben."
faq:
  - q: "Wie sieht ein Change-Management-Prozess aus?"
    a: "Nach Prosci besteht er aus drei Phasen: Vorgehen vorbereiten, Veränderung steuern, Ergebnisse sichern. In einem Salesforce-Projekt laufen sie parallel zu Planung, Umsetzung, Abnahmetest, Go-live und Betrieb."
  - q: "Wann beginnt Change Management in einem Salesforce-Projekt?"
    a: "Change Management beginnt in der Planung, mit einer ersten Impact-Analyse vor der Umsetzung, die mit den Designentscheidungen weiter geschärft wird. Welche Gruppen betroffen sind und was sich für sie ändert, beeinflusst auch die Lösung selbst. Wer erst kurz vor dem Go-live beginnt, kann nur noch informieren."
  - q: "Was ist eine Change-Impact-Analyse?"
    a: "Eine Übersicht je betroffener Gruppe, was sich für sie ändert, zum Beispiel Prozesse, Systeme, Rollen, Verhalten oder Berichtslinien. Sie ist die Grundlage für Kommunikation, Schulung und Sponsor-Plan."
  - q: "Wann endet der Change-Management-Prozess?"
    a: "Der Prozess endet mit einem Abschluss (Closeout): Die Zielwerte sind über mehrere Messperioden erreicht, offene Lücken sind mit Verantwortlichem und Termin dokumentiert, interne Rollen sind aktiv und der Sponsor nimmt die Übergabe an, also deutlich nach dem Go-live. Bei Rollouts in Wellen läuft der lokale Teil für jede Welle erneut."
draft: false
---

Der Change-Management-Prozess in einem Salesforce-Projekt läuft parallel zum Projektplan, und jede Projektphase hat ihre eigene Change-Aufgabe. In der Planung klären Sie, welche Gruppen betroffen sind, was sich für jede ändert, wer im Management dahintersteht und woran Sie Erfolg messen. Während der Umsetzung und des Abnahmetests beteiligen Sie Key User und bereiten Kommunikation und Schulung vor. Ab dem Go-live ist der neue Prozess der verbindliche Standard, und alte Wege bekommen ein Enddatum. Danach messen Sie die Nutzung, schließen Lücken und übergeben die Verantwortung an interne Rollen. Ich orientiere mich dabei am Prozess von Prosci und passe ihn an die Phasen eines Salesforce-Projekts an.

## Die drei Prosci-Phasen am Salesforce-Projektplan

Prosci gliedert die Arbeit in drei Phasen: Vorgehen vorbereiten, Veränderung steuern, Ergebnisse sichern. Was die Phasen allgemein bedeuten, erklärt Juliane Winterscheid in [Was ist Change Management?](/blog/was-ist-change-management/), und wie sich Prosci von Lewin und Kotter unterscheidet, in [Change-Management-Modelle im Vergleich](/blog/change-management-modelle/). Hier geht es um die Frage, die im Projekt zählt: Was ist in welcher Projektphase zu tun, und was liegt am Ende auf dem Tisch? Prosci selbst nennt als Ergebnisse die Change-Management-Strategie, den Master Change Management Plan mit Sponsor-, Führungskräfte-, Kommunikations- und Schulungsplan und den Abschluss (Change Management Closeout). Die Tabelle ist meine Anpassung an ein Salesforce-Projekt; den Sponsor-Plan bereite ich früher vor, als Prosci es vorsieht.

| Projektphase | Prosci-Phase | Change-Arbeit | Ergebnis |
|---|---|---|---|
| Planung | Vorgehen vorbereiten | Betroffene Gruppen und Auswirkungen klären, Sponsor gewinnen, Erfolg definieren | Change-Strategie mit Impact-Analyse, erster Sponsor-Plan, Kennzahlen |
| Fachkonzept und Umsetzung | Veränderung steuern | Key User und Führungskräfte beteiligen, Plan je Gruppe entlang ADKAR, Kommunikation und Schulungslogistik starten | Plan je Gruppe, Führungskräfte-Plan, Kommunikationsplan, Entwurf Schulungskonzept |
| Abnahmetest | Veränderung steuern | Key User testen durchgängige Abläufe, Schulungsinhalte fertigstellen, Widerstände prüfen | Fertiges Schulungskonzept, Liste offener Bedenken |
| Go-live | Veränderung steuern | Schulung, alte Wege kontrolliert schließen, Hypercare starten | Abschaltdatum mit Kriterien und Ausnahmen, Hypercare-Team |
| Betrieb | Ergebnisse sichern | Nutzung messen, Lücken schließen, Verantwortung übergeben | Monatsbericht an Sponsor, Abschluss und Übergabe an interne Rollen |

Die Tabelle beschreibt ein Release mit einem großen Go-live. Bei einem Rollout in Wellen, nach Land, Werk, Marke oder Serviceorganisation, werden globales Design und Material wiederverwendet; Impact-Analyse, lokaler Fit-Gap, Aktivierung von Sponsor und Führungskräften, Kommunikation, Schulung und Ergebnissicherung laufen je Welle erneut, wie in [Change Management im weltweiten Salesforce-Rollout](/blog/change-management-weltweiter-rollout/) beschrieben.

## Was gehört in die Planung?

Die Planung legt die Grundlage, und in den Programmen, die ich sehe, fehlt Change Management genau hier am häufigsten. Drei Ergebnisse sollten vor der Umsetzung angelegt sein und mit den Designentscheidungen weiter geschärft werden.

**Eine Impact-Analyse je Gruppe.** Prosci betrachtet zehn Aspekte einer Veränderung, darunter Prozesse, Systeme, Werkzeuge, Rollen, entscheidendes Verhalten, Berichtslinien und Leistungsbeurteilung ([Prosci: Defining Change Impact](https://www.prosci.com/blog/defining-change-impact)). In einem Salesforce-Projekt bei einem Hersteller sieht das zum Beispiel so aus: Der Innendienst erstellt Angebote künftig im Konfigurator statt in Word (Prozess, Werkzeug). Der Vertrieb pflegt Opportunities, die in die Vertriebsprognose einfließen (Verhalten). Die Vertriebsleitung bespricht die Pipeline anhand eines Dashboards statt anhand einer Excel-Liste (Berichterstattung). Je mehr Aspekte sich für eine Gruppe ändern, desto mehr Begleitung braucht sie.

**Ein Sponsor-Plan.** Er legt fest, wer im Management die Einführung trägt und was diese Person wann sichtbar tut: im Vertriebsmeeting erklären, warum Prognosen künftig aus Salesforce stammen, bei Konflikten zwischen Bereichen entscheiden und im Monatsbericht nach der Nutzung fragen.

**Erfolgskennzahlen.** Woran erkennen Sie in sechs Monaten, dass der Prozess angekommen ist? Trennen Sie drei Ebenen: Nutzung, etwa den Anteil der Angebote aus Salesforce; Prozessleistung, etwa Durchlaufzeit oder Nacharbeit bei Angeboten; und Geschäftsergebnis, etwa die Prognosegenauigkeit. Einen Ausgangswert messen Sie vor dem Go-live dort, wo es heute einen vergleichbaren Wert gibt, zum Beispiel die Durchlaufzeit eines Angebots. Für neue Nutzungskennzahlen, deren Ausgangswert null ist, legen Sie stattdessen Zielwert, Messzeitraum und erwartete Anlaufkurve fest. Welche Zahlen sich eignen, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](/blog/salesforce-nutzung-messen-nach-go-live/).

```praxis
Viele Kunden meinen am Anfang, Schulungen reichten als Change Management. Ich bringe das Thema deshalb nicht nur einmal ein, sondern immer wieder: in der Planung, vor jedem Länder-Rollout und nach jedem Go-live.
```

Am stärksten wirkt Change Management in der Planung, weil die Impact-Analyse dort noch die Lösung selbst beeinflussen kann.

## Was passiert während Umsetzung und Abnahmetest?

In dieser Zeit findet die eigentliche Steuerung statt. Für jede betroffene Gruppe entsteht ein Plan entlang der fünf ADKAR-Elemente: Wer erklärt, warum sich etwas ändert, wer sorgt für Bereitschaft, wann wird geschult, wer hilft im Alltag, und wie wird das neue Verhalten verankert. ADKAR beschreibt individuelle Veränderung, der Gruppenplan bündelt also typische Hürden; Menschen derselben Gruppe können trotzdem an verschiedenen Elementen hängen. Wie Sie für eine Gruppe herausfinden, an welcher Stufe es hängt, zeigt das Kapitel [ADKAR-Modell: Diagnose für Salesforce-Einführungen](/masterclass/change-management/change-management-adkar-diagnose/) der Masterclass.

Nach meiner Erfahrung sind vier Dinge in dieser Phase besonders wirksam:

- **[Key User](/blog/salesforce-key-user-netzwerk/) beteiligen.** Sie beschreiben die Abläufe ihres Teams, formulieren Akzeptanzkriterien mit und testen im Abnahmetest durchgängige Abläufe, auch Ausnahmen und Rollenwechsel. Beteiligung schafft Vertrauen, wenn Entscheidungen und der Umgang mit dem Feedback der Key User nachvollziehbar sind; Key User, deren Hinweise ignoriert werden, werden zu glaubwürdigen Kritikern.
- **Führungskräfte vorbereiten.** Vertriebsleitung, Serviceleitung und Teamleiter setzen neue Regeln im Alltag durch, sehen Widerstand zuerst und begleiten ihre Teams. Ein Führungskräfte-Plan legt fest, was sie wann sagen und worauf sie achten, etwa dass die Vertriebsleitung das Pipeline-Meeting aus Salesforce führt.
- **Früh kommunizieren.** Betroffene erfahren vor der Umsetzung, was sich ändert, und vor jedem Release, was sich ändert. Wie das bei laufenden Releases aussieht, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](/blog/salesforce-releases-fachbereich-kommunizieren/).
- **Bedenken ernst nehmen.** Fragen und Einwände aus Workshops und aus dem Abnahmetest gehören auf eine Liste mit Antwort und Verantwortlichem. Ein Einwand, der im Abnahmetest auftaucht, kommt nach dem Go-live als Excel-Liste zurück, wenn ihn niemand beantwortet.

Die Planung für das [Schulungskonzept](/blog/salesforce-schulungskonzept-einfuehrung/) beginnt schon in der Umsetzung: Rollen und Lernpfade, Sprachen, Trainer, Schulungsumgebung und Daten, Geräte und Schichtpläne. Am Ende des Abnahmetests stehen die Inhalte fest: welche Rolle welche Abläufe lernt, in welchem Format und wann.

## Zum Go-live wird der neue Prozess zum Standard

Zum Go-live folgt der Teil, den nach meiner Erfahrung viele Projekte unterschätzen. Ab einem festen Datum ist der neue Prozess der verbindliche Standard. Bleibt die Option, auf dem bisherigen Weg zu arbeiten, unbegrenzt offen, ändert sich wenig. Das schließt einen kontrollierten Rückfallweg nicht aus: Ausnahmen und Rückfallwege sind genehmigt, gemessen und befristet. Alte Vorlagen und Listen bekommen ein Abschaltdatum, das die Führung ankündigt. Vor dem Abschalten bestätigt der Sponsor die Kriterien: Migration abgeglichen, Datenqualität ausreichend, Berechtigungen und Schnittstellen geprüft, Lesezugriff auf die Altdaten und deren Aufbewahrung geklärt sowie festgelegt, wer einen Rollback auslösen darf. Berichte an die Geschäftsführung werden aus Salesforce erstellt, sobald ihre Zahlen gegen die alte Quelle geprüft sind.

```hinweis achtung
Ein Go-live ohne Abschaltdatum für die alten Wege ist ein Parallelbetrieb ohne Ende. Legen Sie das Datum und die zugehörigen Kriterien mit dem Sponsor fest, bevor die Schulungen beginnen, und nennen Sie beides in jeder Schulung.
```

Gleichzeitig beginnt die [Hypercare-Phase](/blog/hypercare-phase-salesforce-go-live/). Projektteam, Partner und Key User bleiben verstärkt erreichbar, und Rückmeldungen werden schnell in drei Gruppen sortiert: kritische Fehler werden unter Release-Kontrolle behoben, Anwendungsfragen werden direkt beantwortet oder mit einer kurzen Schulung aufgegriffen, und Erweiterungswünsche gehen ins Backlog. Für den Change-Management-Prozess ist die Hypercare-Phase die wichtigste Quelle: Die Fragen der ersten Wochen zeigen, welche Gruppe an welcher Stelle hängt.

## Wie sichern Sie das Ergebnis nach dem Go-live?

Die dritte Prosci-Phase beginnt nach dem Go-live und wird nach meiner Erfahrung am häufigsten gestrichen, weil das Projektteam weiterzieht. Sie hat drei Teile. Messen: Der Sponsor bekommt jeden Monat die Kennzahlen aus der Planung, pro Gruppe und Land. Lücken schließen: Wo die Nutzung hängt, wird nach der fehlenden ADKAR-Stufe gefragt, nicht automatisch nachgeschult. Verantwortung übergeben: Interne Rollen übernehmen, was das Projekt aufgebaut hat, etwa den Key-User-Austausch, die Release-Kommunikation und regelmäßige Termine wie einen [Center-of-Excellence-Call](/blog/salesforce-center-of-excellence-format/), in dem neue Themen vorab auf den Tisch kommen.

Der Prozess endet mit einem Abschluss: Zielwerte über mehrere Messperioden erreicht, offene Lücken mit Verantwortlichem und Termin dokumentiert, interne Rollen aktiv, Materialien und die Erfolgsmessung übergeben, und der Sponsor nimmt den Abschluss an. Dieser Punkt liegt deutlich nach dem Go-live.

## Ein Change-Ergebnis in jede Projektphase eintragen

Nehmen Sie den Projektplan Ihres nächsten Salesforce-Vorhabens und tragen Sie für jede Phase ein, welches Change-Ergebnis am Ende vorliegen soll. Fehlen in der Planung die Impact-Analyse, der Sponsor-Plan oder die Kennzahlen, ist das Ihr erster Schritt. Der Hub-Artikel [Salesforce Change Management: warum Einführungen scheitern](/blog/change-management-salesforce-einfuehrung/) zeigt, welche Themen dazugehören. Wie wir den Prozess in Programmen begleiten, steht unter [Change Management Beratung für Salesforce](/leistungen/change-management/).
