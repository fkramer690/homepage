---
title: "Fit-Gap-Analyse im Salesforce-Projekt richtig aufsetzen"
metaTitle: "Fit-Gap-Analyse für Salesforce: Ablauf und Vorlage"
description: "Fit-Gap-Analyse für Salesforce: wie Sie Anforderungen am Standard prüfen, wer in die Workshops gehört und welche Spalten in die Vorlage gehören."
pubDate: 2026-11-23
lang: de
slug: fit-gap-analyse-salesforce
translationKey: fit-gap-analysis-salesforce
topic: governance
categories: [architecture]
tags: [Fit-Gap-Analyse, Discovery, Anforderungen, Make-or-buy, Change Requests, Entscheidungslog]
takeaways:
  - "Eine Lücke ist erst geklärt, wenn ein Lösungsweg festgelegt ist: Prozess anpassen, AppExchange, Eigenentwicklung oder ein anderes System."
  - "Der teuerste Fehler entsteht vor der Bewertung, wenn im Workshop Personen sitzen, die den Prozess nicht selbst ausführen."
  - "Bei Herstellern entsteht der Aufwand in den Randfällen. Eine Analyse nur für den Standardfall führt nach Vereinbarung des Festpreises zu Change Requests."
  - "Ob eine Anforderung zum Standard passt, richtet sich auch nach Edition und Lizenzen. Die Fit-Gap-Liste ist deshalb auch eine Lizenzfrage."
faq:
  - q: "Was ist der Unterschied zwischen Fit-Gap-Analyse und Gap-Analyse?"
    a: "Eine Gap-Analyse vergleicht allgemein einen Ist-Zustand mit einem Soll-Zustand, etwa bei Strategie, Qualität oder Qualifikationen. Eine Fit-Gap-Analyse prüft vor einer Softwareeinführung, welche Anforderungen der Standard eines bestimmten Produkts abdeckt und wo Lücken bleiben."
  - q: "Wer sollte die Fit-Gap-Analyse für Salesforce erstellen?"
    a: "Der Implementierungspartner bewertet die Anforderungen, weil er das Produkt im Detail kennt. Die Liste und die Entscheidung für jede Lücke gehören dem Kunden; ein Architekt auf Kundenseite prüft, ob Bewertung und Aufwand plausibel sind."
  - q: "Was passiert mit einer Lücke in der Fit-Gap-Analyse?"
    a: "Typische Wege sind: den Prozess an den Standard anpassen, eine AppExchange-Lösung kaufen, auf der Plattform selbst entwickeln, die Anforderung in einem anderen System belassen oder sie streichen beziehungsweise verschieben. Die Wahl hängt von Häufigkeit, Geschäftswert und dem Wartungsaufwand bei jedem Salesforce-Release ab."
  - q: "Wann findet die Fit-Gap-Analyse im Salesforce-Projekt statt?"
    a: "Vor dem verbindlichen Angebot, also in der Discovery oder einer bezahlten Vorphase. Erfolgt sie erst nach Vereinbarung des Festpreises, wird jede Lücke außerhalb des vereinbarten Umfangs in der Regel zum Change Request."
draft: false
---

Eine Fit-Gap-Analyse prüft vor der Umsetzung jede Anforderung Ihrer Prozesse am Salesforce-Standard und ordnet sie ein: Der Standard passt (Fit), er deckt die Anforderung nach Konfiguration ab, oder es bleibt eine Lücke (Gap), für die jemand einen Lösungsweg und einen Aufwand festlegt. Bei Herstellern hat die Analyse nur unter zwei Bedingungen Wert: Im Workshop sitzen die Personen, die den Prozess täglich ausführen, und die Randfälle werden offen benannt. Fehlt beides, finden Sie die Lücken erst im Abnahmetest, und jede davon wird zum Change Request.

## Was eine Fit-Gap-Analyse für Salesforce leistet

Die Fit-Gap-Analyse verbindet die Prozessaufnahme mit dem Angebot. Sie beantwortet für jede Anforderung, wie Salesforce sie abdeckt und was das kostet. Mit der allgemeinen Gap-Analyse aus dem Management teilt sie den Gedanken der Lücke, bezieht ihn aber auf ein konkretes Produkt: Was kann Salesforce mit der Edition und den Lizenzen, die Sie kaufen wollen?

Jede Anforderung erhält eine von drei Bewertungen:

```tabelle
titel: Bewertung in der Fit-Gap-Analyse
spalten: Bewertung | Was sie bedeutet | Beispiel bei Herstellern
Fit | Der Standard deckt die Anforderung ohne Anpassung ab | Ansprechpartner zu einem Kunden pflegen
Konfiguration | Der Standard deckt die Anforderung mit Feldern, Layouts, Flows oder Berechtigungen ab | Pflichtfelder je Auftragsart, Freigabe ab einem Rabatt
Gap | Der Standard reicht nicht; ein Lösungsweg muss festgelegt werden * | Mehrere Datensätze in einem Schritt im mobilen Flow des Technikers auswählen
fazit: Nur die markierte Zeile braucht eine Entscheidung über den Lösungsweg. Auch Konfiguration erfordert Designentscheidungen, verursacht Aufwand und gehört in die Schätzung.
```

Im SAP-Umfeld heißt ein verwandter Ansatz Fit-to-Standard: Zuerst wird der Standard vorgeführt, dann sagt der Fachbereich, wo er nicht ausreicht. Diese Reihenfolge funktioniert für Salesforce genauso gut, weil Fachbereiche einen Prozess, den sie auf dem Bildschirm sehen, besser beurteilen als eine Beschreibung auf einer Folie.

## Warum Fit-Gap-Analysen am Ist-Prozess scheitern

Viele Lücken, die in meinen Projekten spät aufgefallen sind, hatten ihren Ursprung in der Prozessaufnahme.

```praxis
In jedem meiner Projekte hat der Abnahmetest länger gedauert, als der Kunde geplant hatte, und danach folgten Change Requests, weil sich der Fachbereich vorher nicht genau genug mit seinem Ist-Zustand und der geplanten Lösung befasst hatte. In einem Projekt saßen in den Terminen zur Prozessanalyse nicht die richtigen Personen, weil die eigentlichen Ansprechpartner nicht freigestellt waren. Aus lückenhaft erfassten Ist-Prozessen entstanden Soll-Prozesse, die nicht ideal waren, und kurz vor dem Go-live stellte der Fachbereich zahlreiche Change Requests.
```

Eine Fit-Gap-Analyse kann nur bewerten, was im Workshop gesagt wird. Beschreibt eine Teamleitung den Prozess so, wie er im Handbuch steht, bewertet die Analyse genau diesen Prozess. Die Sachbearbeiterin im Innendienst, die Garantiefälle für drei Großkunden nach eigenen Regeln behandelt, sitzt nicht im Raum, und ihre Ausnahmen fehlen in der Liste. Sichtbar werden sie erst, wenn sie im Abnahmetest das System zum ersten Mal mit echten Fällen bedient.

## Wer in die Fit-Gap-Workshops gehört

Vier Rollen brauchen Sie in jedem Workshop:

- **Die Personen, die den Prozess täglich ausführen.** Sie arbeiten im Innendienst, in der Disposition, in der Serviceleitung oder im Außendienst. Sie kennen die Ausnahmen, weil sie sie jeden Tag lösen.
- **Ein Prozessverantwortlicher mit Entscheidungsbefugnis.** Er entscheidet direkt im Workshop, ob eine Ausnahme bleibt oder entfällt. Fehlt er, wird jede Lücke vertagt.
- **Ein Architekt, der Salesforce und die angrenzenden Systeme kennt.** Er erkennt, wann eine Anforderung ins ERP gehört oder wann der Standard sie mit einer anderen Lizenz abdeckt.
- **Der Business Analyst des Implementierungspartners.** Er kennt das Produkt im Detail, führt den Standard vor und dokumentiert die Bewertung. Bei Themen wie Field Service oder Schnittstellen nimmt ein Lösungsarchitekt des Partners teil.

Die erste Gruppe ist am schwersten freizustellen, weil sie im Tagesgeschäft gebraucht wird. Planen Sie die Freistellung für diese Termine deshalb so fest ein wie das Budget. Fehlen die Personen, verschieben Sie den Workshop: Mit den falschen Personen entsteht eine Liste, die vollständig aussieht und es nicht ist.

## Randfälle bestimmen den Aufwand

Bei Herstellern lässt sich der Standardfall meist schnell vorführen: ein Servicefall, ein Einsatz, ein einfaches Angebot. Der Aufwand entsteht in den Sonderfällen und an den Grenzen zum ERP, etwa bei Preisen, Varianten und Verfügbarkeiten. Ich habe Schätzungen gesehen, für die in der Discovery nur der Happy Path besprochen wurde, der Standardfall nach Schema F. Die Randfälle wurden danach als Change Requests nachbeauftragt, und der Festpreis war nur noch auf dem Papier fest. Worauf Sie deshalb schon bei der Auswahl des Partners achten, steht in [Salesforce-Implementierungspartner auswählen](../salesforce-implementierungspartner-auswaehlen/).

Diese Fragen bringen Randfälle zutage:

- Was passiert, wenn ein Kunde bestellt, der im ERP gesperrt ist?
- Wie wird ein Einsatz über mehrere Tage mit wechselnden Technikern abgewickelt?
- Was tut der Techniker, wenn am Gerät keine Seriennummer lesbar ist?
- Wer gibt einen Auftrag frei, wenn die freigabeberechtigte Person im Urlaub ist?
- Welche Länder, Werke oder Marken weichen ab, und warum?

Manche Lücken zeigen sich erst, wenn jemand den Prozess Schritt für Schritt durchspielt. In meinen Field-Service-Projekten ist das die Lücke, die am meisten wehtut: Flows in der Field Service Mobile App haben keine Data-Table-Komponente; der Techniker kann also nicht mehrere Datensätze aus einer Liste in einem Schritt auswählen. Fällt das in der Fit-Gap-Analyse auf, plant das Team eine Lösung ein. Fällt es im Abnahmetest auf, wird daraus ein Change Request. Die Einzelheiten stehen in [Field Service Mobile App: Flow-Grenzen in Winter '27](../field-service-mobile-flows-grenzen/).

## Wie läuft eine Fit-Gap-Analyse ab?

Eine Fit-Gap-Analyse für Salesforce hat fünf Schritte. Die Dauer hängt davon ab, wie viele Prozesse und Varianten Sie haben.

```schritte
Prozesse abgrenzen | Kunde und Architekt
  Prozessliste mit Varianten je Land, Werk und Marke erstellen, Systeme an den Grenzen festhalten.
Ist-Prozess aufnehmen | Fachbereich
  Mit den Personen, die den Prozess ausführen, einschließlich der häufigsten Ausnahmen.
Standard vorführen | Partner
  Den Prozess in einer Demo-Org mit Standardfunktionen zeigen und Abweichungen notieren.
Bewerten | Partner und Architekt
  Jede Anforderung als Fit, Konfiguration oder Gap einstufen und den Aufwand grob schätzen.
Lücken entscheiden | Prozessverantwortliche
  Für jeden Gap einen Lösungsweg wählen und im Entscheidungslog festhalten.
```

Der dritte Schritt unterscheidet die Fit-Gap-Analyse von einer Anforderungsliste in Excel. Sieht der Fachbereich den Standard, fallen manche Anforderungen weg, weil der Standard sie anders und ausreichend löst. Andere zeigen sich erst jetzt, weil jemand sagt: So arbeiten wir nicht.

Maßstab sind die Lizenzen, die Sie kaufen wollen. Ob eine Anforderung ein Fit oder ein Gap ist, richtet sich oft nach der Edition, einem Add-on oder einer Industry Cloud. In einem Fertigungsprojekt waren Sales Agreements, eine Kernfunktion der Manufacturing Cloud, für das Geschäft nicht relevant. Eine eigene Lösung auf der Kernplattform war günstiger und einfacher zu warten. Solche Abwägungen beschreibe ich auf der Seite [Lizenz-Check und Make-or-buy](../../leistungen/make-or-buy-lizenzen/).

## Vorlage: welche Spalten die Fit-Gap-Liste braucht

Die Fit-Gap-Liste ist eine Tabelle mit einer Zeile pro Anforderung. Jede Zeile enthält diese Felder:

```eintrag Fit-Gap-Liste
Anforderung | Der Satz des Fachbereichs, mit Nummer und Prozessschritt
Häufigkeit und Risiko | Wie oft der Fall vorkommt und was passiert, wenn er nicht abgedeckt ist
Bewertung | Fit, Konfiguration oder Gap *
Lösungsweg | Bei einem Gap: Prozess anpassen, AppExchange, Eigenentwicklung oder anderes System
Aufwand und Lizenz | Grobe Schätzung und Hinweis, ob eine andere Edition, ein Add-on oder mehr Lizenzen nötig sind
Entscheidung | Wer wann entschieden hat, mit Verweis auf das Entscheidungslog
fazit: Mit dieser Liste kann jeder Partner eine erste Schätzung abgeben, und nach einem Partnerwechsel weiß der neue Partner, was aus welchem Grund gebaut wurde.
```

Die Spalte Häufigkeit und Risiko fehlt in vielen Vorlagen, dabei ist sie die nützlichste. Eine Lücke, die zweimal im Jahr auftritt, rechtfertigt selten eine Eigenentwicklung, die bei jedem der drei Salesforce-Releases im Jahr erneut getestet werden muss. Anders ist es, wenn der seltene Fall rechtliche oder vertragliche Folgen hat, etwa bei einem Rückruf oder einer zugesagten Reaktionszeit für einen Großkunden. Die Spalte Aufwand und Lizenz verhindert, dass eine Lösung beschlossen wird, deren Lizenzkosten niemand eingeplant hat. Für ein verbindliches Angebot reicht die Liste allein nicht: Dazu gehören Schnittstellen, Datenmigration, Berechtigungen und Abnahmekriterien.

## Jede Lücke braucht einen festgelegten Lösungsweg

Für jede Lücke stehen diese Wege zur Wahl, und jeder hat seinen Preis:

- **Prozess anpassen.** Passt, wenn die Abweichung keinen Geschäftswert hat und aus Gewohnheit entstanden ist. Dieser Weg ist am günstigsten, erfordert aber die Rückendeckung des Prozessverantwortlichen.
- **AppExchange-Lösung.** Passt, wenn ein Paket den Fall abdeckt. Dafür zahlen Sie laufende Lizenzkosten und binden einen weiteren Anbieter ein.
- **Eigenentwicklung auf der Plattform.** Passt, wenn der Fall häufig ist und einen klaren Geschäftswert hat. Sie zahlt sich nur aus, wenn Tests und Standards die Wartung bei jedem Release beherrschbar halten.
- **Anderes System.** Passt, wenn die Daten ohnehin dort geführt werden, etwa Preise oder Bestände im ERP. Dann wird aus der Lücke eine Schnittstelle, wie auf der Seite [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/) beschrieben.
- **Streichen oder verschieben.** Passt, wenn niemand den Wert der Anforderung begründen kann oder sie bis in eine spätere Phase warten kann. Halten Sie fest, wer das entschieden hat.

Die erste Frage bei jeder Lücke lautet deshalb, ob sich der Prozess anpassen lässt. Erst wenn der Prozessverantwortliche begründet, warum die Abweichung bleibt, lohnt die Diskussion über Code oder Pakete. Halten Sie die Entscheidung mit Begründung fest; wie ein solches [Entscheidungslog](../salesforce-architektur-entscheidungslog/) aussieht, zeigt der verlinkte Artikel.

## Wer die Fit-Gap-Analyse verantwortet

Meist erstellt der Implementierungspartner die Fit-Gap-Analyse als Teil der Discovery. Das ist sinnvoll, weil er das Produkt kennt. Zwei Dinge sollten trotzdem in der Hand des Kunden bleiben: die Liste selbst, in Ihrem eigenen Wiki oder Ticketsystem, und die Entscheidung für jede Lücke.

Der Partner bewertet, was er umsetzen würde, und kalkuliert sein Angebot auf dieser Grundlage. Ein Architekt auf Kundenseite prüft, ob die Bewertung und der Aufwand plausibel sind und ob sich eine Lücke durch den Standard, mit einer anderen Lizenz oder in einem anderen System günstiger schließen lässt. Den Unterschied zwischen beiden Rollen beschreibt [Salesforce-Architekt oder Systemintegrator?](../salesforce-architekt-oder-systemintegrator/), und wie ich diese Rolle ausfülle, steht auf der Seite [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

## Erster Schritt: zehn Ausnahmen pro Prozess sammeln

Bevor Sie den ersten Fit-Gap-Workshop planen, bitten Sie in jedem Prozessbereich eine Person, die den Prozess täglich ausführt, die zehn häufigsten Ausnahmen aufzuschreiben. Dazu kommen die seltenen Ausnahmen, die teuer werden, wenn sie nicht abgedeckt sind. Zu jeder Ausnahme gehört, was passiert, wie oft es vorkommt und wer heute entscheidet. Diese Liste senden Sie vor dem Workshop an den Partner. Nach einer Stunde Vorbereitung sehen Sie, ob Ihre Discovery den Standardfall bewertet oder Ihren Alltag abbildet.
