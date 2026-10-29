---
title: "Salesforce-Releases an den Fachbereich kommunizieren"
description: "Wie Fachbereiche vor jedem Salesforce-Release erfahren, was sich für sie ändert: Einführungsplan je Release, Release Notes in Alltagssprache und der Rückweg."
pubDate: 2026-10-29
lang: de
slug: salesforce-releases-fachbereich-kommunizieren
translationKey: change-release-communication
topic: release
categories: [devops, architecture]
contactBrief: change
tags: [Release-Management, Change Management, Release Notes, Fachbereich]
takeaways:
  - "Kleinere, häufigere Releases senken das technische Risiko, verlangen aber einen festen Weg, auf dem Fachbereiche vorher erfahren, was sich ändert."
  - "Vor jedem Release steht im Release-Plan, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert, bevor die Entwicklung fertig ist."
  - "Release Notes für den Fachbereich beschreiben, was sich im Alltag ändert, nicht welche Felder und Flows deployt wurden."
  - "Zur Kommunikation gehört ein Rückweg: Was im Alltag nicht passt, landet im Backlog statt in einer E-Mail."
faq:
  - q: "Wie informiert man Fachbereiche über ein Salesforce-Release?"
    a: "Mit einem Einführungsplan je Release, der betroffene Gruppen, Änderungen und Verantwortliche nennt, mit Release Notes in Alltagssprache und über Key User, die die Änderung im Team weitergeben."
  - q: "Wann sollte der Fachbereich von einem Release erfahren?"
    a: "Spätestens vor dem Abnahmetest, bei größeren Änderungen schon bei der Planung. Wer eine Änderung erst in Produktion sieht, sucht sich einen Weg drumherum."
  - q: "Was gehört in Release Notes für den Fachbereich?"
    a: "Was sich für welche Gruppe ändert, warum, ab wann, was gleich bleibt und wen man bei Fragen anspricht. Technische Details gehören in die Release Notes für die IT."
  - q: "Betreffen auch die Salesforce-Releases selbst den Fachbereich?"
    a: "Ja. Salesforce veröffentlicht drei Releases im Jahr, die Oberflächen und Funktionen ändern können. Was davon die eigenen Nutzer betrifft, gehört in dieselbe Kommunikation."
draft: false
---

Fachbereiche sollten vor jedem Salesforce-Release erfahren, was sich für sie ändert, nicht erst danach. Dafür braucht es drei Dinge: einen Einführungsplan je Release, der festlegt, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert, Release Notes in Alltagssprache statt einer Liste deployter Komponenten und einen Rückweg, auf dem Anwender melden, was im Alltag nicht passt. Mit kleineren, häufigeren Releases wird das wichtiger, weil Änderungen öfter kommen. Der Plan steht, bevor die Entwicklung fertig ist.

## Warum reicht ein gutes Release nicht?

Mit einem sauberen Release-Prozess werden Releases kleiner und häufiger. Das senkt das Risiko einzelner Releases. Für Fachbereiche heißt es aber auch: öfter kleine Änderungen statt einmal im Quartal ein großes Paket. Wer nicht weiß, dass sich etwas geändert hat, hält die Änderung für einen Fehler, ruft den Support an oder baut sich einen Umweg.

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) fehlt in diesem Fall die erste Stufe, Awareness. Der Anwender weiß nicht, dass und warum sich etwas ändert. Keine Schulung kann das nachholen, wenn sie erst nach dem Release stattfindet.

```praxis
Vor jedem Release kläre ich mit den Verantwortlichen im Fachbereich, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert. Das steht im Release-Plan, bevor die Entwicklung fertig ist. Nach dem Release prüfe ich, ob die neuen Prozesse genutzt werden, und bringe Rückmeldungen aus dem Alltag in den Backlog.
```

## Was steht im Einführungsplan je Release?

Der Einführungsplan ist eine Tabelle mit einer Zeile pro betroffener Gruppe. Er entsteht, wenn der Umfang des Releases feststeht, und wird mit dem Release-Plan zusammen gepflegt:

| Gruppe | Was ändert sich | Wer informiert | Wann |
|---|---|---|---|
| Innendienst Deutschland | neues Pflichtfeld Liefertermin im Angebot | Teamleitung, Key User | zwei Wochen vorher |
| Außendienst Service | neues Formular für Wartungsprotokoll in der App | Ansprechpartner der Region | vor dem nächsten App-Update |
| Vertrieb alle Länder | keine sichtbare Änderung | niemand | nicht nötig |

Die letzte Zeile ist kein Scherz. Wenn ein Release eine Gruppe nicht betrifft, sollte sie auch keine Mail bekommen. Wer jede Woche Release-Mails bekommt, die ihn nicht betreffen, liest auch die eine nicht, die ihn betrifft.

## Wie sehen Release Notes für den Fachbereich aus?

Technische Release Notes listen User Stories, Felder und Flows. Für den Fachbereich sind sie nutzlos. Release Notes für Anwender beantworten fünf Fragen:

- **Was ändert sich für mich?** Getrennt nach Gruppen, mit einem Bildschirmfoto, wenn sich die Oberfläche ändert.
- **Warum?** Ein Satz, zum Beispiel: Der Liefertermin wird Pflicht, weil die Absatzplanung ihn braucht.
- **Ab wann?** Datum des Releases.
- **Was bleibt gleich?** Das nimmt viel Unsicherheit.
- **Wen frage ich?** Den Key User des Teams, mit Namen.

Mehr als eine halbe Seite pro Gruppe ist zu viel. Bei Herstellern mit Gesellschaften in mehreren Ländern kommen die Release Notes in der Landessprache. Die Key User geben sie im Team weiter und beantworten die ersten Fragen, siehe [Key User in Salesforce-Einführungen](../salesforce-key-user-netzwerk/).

## Wann erfährt wer was?

Ein fester Ablauf je Release hilft, weil Fachbereiche lernen, wann sie mit Informationen rechnen können:

```schritte
Planung | wenn der Umfang feststeht · Product Owner mit Fachbereich
  Einführungsplan je Gruppe anlegen, Sponsor informieren, wenn eine Änderung umstritten ist.
Vor dem Abnahmetest | etwa zwei Wochen vorher · Key User
  Key User sehen die Änderung, testen sie im Abnahmetest und bereiten Fragen ihres Teams vor.
Kurz vor dem Release | wenige Tage vorher · Teamleitung, Key User
  Release Notes für Anwender gehen an die betroffenen Gruppen, in Landessprache.
Nach dem Release | erste Woche · Key User, Projektteam
  Fragen sammeln, Nutzung prüfen, Rückmeldungen in den Backlog übernehmen.
```

Für Hinweise direkt in Salesforce bietet die Plattform In-App Guidance: kurze Einblendungen auf einer Seite, die neue Felder oder Abläufe erklären. Sie ersetzen keine Release Notes, helfen aber in der ersten Woche, wenn ein Anwender die Änderung zum ersten Mal sieht.

## Wie funktioniert der Rückweg?

Kommunikation in eine Richtung reicht nicht. Probleme aus dem Alltag landen sonst in E-Mails an einzelne Personen, und nach einem Monat weiß niemand mehr, wie oft dieselbe Frage kam. Ich richte deshalb einen festen Rückweg ein:

- **Ein Ort für Rückmeldungen**, etwa ein einfaches Formular oder eine Kategorie im Ticketsystem, die Key User und Anwender kennen.
- **Eine Unterscheidung zwischen Fehler und Wunsch.** Fehler gehen in den Support, Wünsche in den Backlog, wo der Product Owner sie bewertet.
- **Eine sichtbare Antwort.** Wer etwas meldet, erfährt, was daraus wird, auch wenn die Antwort nein ist.

Der Rückweg ist der Teil, der Vertrauen schafft. Ein Fachbereich, der erlebt, dass seine Rückmeldung im nächsten Release umgesetzt ist, liest auch die nächsten Release Notes.

## Was tun, wenn eine Änderung umstritten ist?

Manche Änderungen gefallen nicht allen, etwa ein neues Pflichtfeld, das dem Innendienst Arbeit macht und der Absatzplanung hilft. Solche Änderungen sollten nicht über die Release Notes zum ersten Mal bekannt werden. Hier tritt der Sponsor auf: Er erklärt vorher, warum die Änderung kommt, und entscheidet, wenn zwei Bereiche sich nicht einigen. Im Einführungsplan markiere ich diese Zeilen, damit sie vor dem Abnahmetest besprochen sind.

## Was ist mit den Releases von Salesforce selbst?

Salesforce veröffentlicht drei Releases im Jahr: Spring, Summer und Winter. Sie können Oberflächen ändern, Funktionen einführen oder alte abschalten. Die meisten Änderungen betreffen Admins und Entwickler, einige auch Anwender. Was in [Winter '27](../salesforce-winter-27-aenderungen-pipeline/) für die Pipeline wichtig war, habe ich beschrieben. Für den Fachbereich gilt derselbe Weg: Was die eigenen Nutzer sehen, kommt in den Einführungsplan des nächsten eigenen Releases.

## Wo fangen Sie an?

Legen Sie für Ihr nächstes Release einen Einführungsplan mit einer Zeile pro betroffener Gruppe an, bevor die Entwicklung fertig ist. Schreiben Sie die Release Notes für Anwender getrennt von den technischen und lassen Sie sie von einem Key User gegenlesen: Versteht er sie ohne Erklärung, passen sie. Nach dem Release fragen Sie die Key User, welche Fragen gekommen sind, und übernehmen die Antworten in die nächsten Release Notes.

Ein Release ist erst angekommen, wenn die Betroffenen wissen, was sich ändert. Wenn Ihre Fachbereiche von Änderungen zu spät erfahren, [schreiben Sie mir](#contact) oder lesen Sie mehr über [DevOps und Release-Management](../../leistungen/devops-und-release-management/).
