---
title: "Salesforce-Releases an den Fachbereich kommunizieren"
description: "Wie Fachbereiche vor jedem Salesforce-Release erfahren, was sich für sie ändert: Einführungsplan je Release, Release Notes in Alltagssprache, Feedbackschleife."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-releases-fachbereich-kommunizieren
translationKey: change-release-communication
topic: release
categories: [change-management, devops, architecture]
coAuthor: juliane
contactBrief: change
tags: [Release-Management, Change Management, Release Notes, Fachbereich]
takeaways:
  - "Kleinere, häufigere Releases können das Risiko je Release senken, verlangen aber einen festen Weg, auf dem Fachbereiche vorher erfahren, was sich ändert."
  - "Vor jedem Release steht im Plan, welche Teams betroffen sind, was sich für sie ändert und wer sie informiert, bevor die Entwicklung fertig ist."
  - "Release Notes für den Fachbereich beschreiben, was sich im Alltag ändert, nicht welche Felder und Flows deployt wurden."
  - "Zur Kommunikation gehört eine Feedbackschleife: Was im Alltag nicht passt, geht über die Triage in den Backlog statt in eine E-Mail."
faq:
  - q: "Wie informiert man Fachbereiche über ein Salesforce-Release?"
    a: "Mit einem Einführungsplan je Release, der betroffene Gruppen, Änderungen und Verantwortliche nennt, mit Release Notes in Alltagssprache und über Key User, die die Änderung im Team weitergeben."
  - q: "Wann sollte der Fachbereich von einem Release erfahren?"
    a: "Spätestens vor dem Abnahmetest, bei größeren Änderungen schon bei der Planung. Wer eine Änderung erst in Produktion sieht, sucht nach einer Umgehungslösung."
  - q: "Was gehört in Release Notes für den Fachbereich?"
    a: "Was sich für welche Gruppe ändert, warum, ab wann, was Anwender tun müssen, was gleich bleibt und wen man bei Fragen anspricht. Technische Details gehören in die Release Notes für die IT."
  - q: "Betreffen auch die Salesforce-Releases selbst den Fachbereich?"
    a: "Ja. Salesforce veröffentlicht drei große saisonale Releases im Jahr, manche Produkte zusätzlich monatlich. Sie können Oberflächen und Funktionen ändern. Was davon die eigenen Nutzer betrifft, gehört in dieselbe Kommunikation, abgestimmt auf den Termin, an dem Salesforce die betreffende Änderung aktiviert."
draft: false
---

Fachbereiche sollten vor jedem Salesforce-Release erfahren, was sich für sie ändert, nicht erst danach. Dafür braucht es einen Einführungsplan je Release, der festlegt, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert, Release Notes in Alltagssprache statt einer Liste deployter Komponenten und eine Feedbackschleife, über die Anwender melden, was im Alltag nicht passt. Mit kleineren, häufigeren Releases wird das wichtiger, weil Änderungen öfter anstehen. Der Plan steht, bevor die Entwicklung fertig ist.

## Kleinere Releases brauchen mehr Kommunikation

Mit einem sauberen Release-Prozess werden Releases meist kleiner und häufiger. Mit automatisierten Tests und kontrollierten Abhängigkeiten kann das das Risiko einzelner Releases senken. Für Fachbereiche bedeutet das aber auch: öfter kleine Änderungen statt einmal im Quartal ein großes Paket. Wer nicht weiß, dass sich etwas geändert hat, hält die Änderung für einen Fehler, ruft den Support an oder sucht eine Umgehungslösung.

Im [ADKAR-Modell](/blog/change-management-salesforce-einfuehrung/) fehlt in diesem Fall die erste Stufe, Awareness. Der Anwender weiß nicht, dass und warum sich etwas ändert. Keine Schulung kann das nachholen, wenn sie erst nach dem Release stattfindet.

```praxis
Vor jedem Release kläre ich mit den Verantwortlichen im Fachbereich, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert. Das steht im Release-Plan, bevor die Entwicklung fertig ist. Nach dem Release prüfe ich, ob die neuen Prozesse genutzt werden, und bringe Rückmeldungen aus dem Alltag in den Backlog.
```

## Was steht im Einführungsplan je Release?

Der Einführungsplan ist eine Tabelle mit einer Zeile pro betroffener Gruppe. Er entsteht, wenn der Umfang des Releases feststeht, und wird gemeinsam mit dem Release-Plan gepflegt:

| Gruppe | Was ändert sich | Wer informiert | Wann |
|---|---|---|---|
| Innendienst Deutschland | neues Pflichtfeld Liefertermin im Angebot | Teamleitung, Key User | zwei Wochen vorher |
| Serviceaußendienst | neues Formular für das Wartungsprotokoll in der App | regionale Ansprechperson | vor dem nächsten App-Update |
| Vertrieb alle Länder | keine sichtbare Änderung | niemand | nicht nötig |

Die letzte Zeile ist kein Scherz. Wenn ein Release eine Gruppe nicht betrifft, sollte sie auch keine Mail erhalten. Wer jede Woche Release-Mails erhält, die ihn nicht betreffen, liest auch die eine nicht, die ihn betrifft.

## Release Notes für den Fachbereich beschreiben den Alltag

Technische Release Notes listen User Stories, Komponenten, Abhängigkeiten und Deployment-Schritte. Als alleinige Kommunikation für Anwender reichen sie nicht aus. Release Notes für Anwender beantworten sechs Fragen:

- **Was ändert sich für mich?** Getrennt nach Gruppen, mit einem Screenshot, wenn sich die Oberfläche ändert.
- **Warum?** Ein Satz, zum Beispiel: Der Liefertermin wird Pflicht, weil die Absatzplanung ihn braucht. Zum Pflichtfeld wird ein Feld erst, wenn der Anwender den Wert zu diesem Zeitpunkt kennen kann.
- **Ab wann?** Datum des Releases.
- **Was muss ich tun?** Zum Beispiel ein neues Feld füllen, die App aktualisieren oder an einer kurzen Schulung teilnehmen.
- **Was bleibt gleich?** Das nimmt viel Unsicherheit.
- **Wen frage ich?** Den Key User des Teams, mit Namen.

Mehr als eine halbe Seite pro Gruppe ist zu viel. Bei Herstellern mit Gesellschaften in mehreren Ländern erscheinen die Release Notes in der Landessprache. Die Key User geben sie im Team weiter und beantworten die ersten Fragen, siehe [Key User in Salesforce-Einführungen](/blog/salesforce-key-user-netzwerk/).

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

Für Hinweise direkt in Salesforce bietet die Plattform In-App Guidance, deren Funktionsumfang und Limits von Edition und Lizenz abhängen: kurze Einblendungen auf einer Seite, die neue Felder oder Abläufe erklären. Sie ersetzen keine Release Notes, helfen aber in der ersten Woche, wenn ein Anwender die Änderung zum ersten Mal sieht.

## Die Feedbackschleife führt ins Backlog

Kommunikation in eine Richtung reicht nicht. Probleme aus dem Alltag enden sonst in E-Mails an einzelne Personen, und nach einem Monat weiß niemand mehr, wie oft dieselbe Frage gestellt wurde. Ich richte deshalb eine feste Feedbackschleife ein:

- **Ein Ort für Rückmeldungen**, etwa ein einfaches Formular oder eine Kategorie im Ticketsystem, die Key User und Anwender kennen.
- **Eine kurze Triage.** Fehler werden an den Support übergeben, Fragen und Schulungsbedarf an die Key User weitergeleitet, echte Änderungswünsche im Backlog erfasst, wo der Product Owner sie bewertet.
- **Eine sichtbare Antwort.** Wer etwas meldet, erfährt, was daraus wird, auch wenn die Antwort Nein lautet.

Die Feedbackschleife ist der Teil, der Vertrauen schafft. Ein Fachbereich, der erlebt, dass seine Rückmeldung im nächsten Release umgesetzt wird, liest auch die nächsten Release Notes.

## Was tun, wenn eine Änderung umstritten ist?

Manche Änderungen gefallen nicht allen, etwa ein neues Pflichtfeld, das für den Innendienst zusätzlichen Aufwand verursacht und der Absatzplanung hilft. Solche Änderungen sollten nicht über die Release Notes zum ersten Mal bekannt werden. Hier tritt der Sponsor auf: Er erklärt vorher, warum die Änderung nötig ist, und entscheidet, wenn sich die Prozessverantwortlichen zweier Bereiche nicht einigen. Im Einführungsplan markiere ich diese Zeilen, damit die betreffenden Änderungen vor dem Abnahmetest besprochen werden.

## Was ist mit den Releases von Salesforce selbst?

Salesforce veröffentlicht drei große saisonale Releases im Jahr: Spring, Summer und Winter. Für manche Produkte und Funktionen erscheinen zusätzlich monatliche Releases. Sie können Oberflächen ändern, Funktionen einführen oder bestehende Funktionen abschalten. Die meisten Änderungen betreffen Admins und Entwickler, einige auch Anwender. Was in [Winter '27](/blog/salesforce-winter-27-aenderungen-pipeline/) für die Pipeline wichtig war, habe ich beschrieben. Für den Fachbereich gilt derselbe Weg, aber der Zeitpunkt richtet sich nach Salesforce: Diese Änderungen werden zu dem Termin in Produktion aktiviert, den Salesforce festlegt. Manche werden automatisch aktiviert oder später als Release Update verpflichtend. Ich prüfe Release Notes und Release Updates, teste in der Preview-Sandbox und informiere die betroffenen Nutzer, bevor die Änderung aktiv wird, im Einführungsplan des Releases, das zuerst ansteht.

## Erster Schritt: ein Einführungsplan für das nächste Release

Legen Sie für Ihr nächstes Release einen Einführungsplan mit einer Zeile pro betroffener Gruppe an, bevor die Entwicklung fertig ist. Schreiben Sie die Release Notes für Anwender getrennt von den technischen Release Notes und lassen Sie sie von einem Key User gegenlesen: Versteht er sie ohne Erklärung, sind sie verständlich genug. Nach dem Release fragen Sie die Key User, welche Fragen gestellt wurden, und übernehmen die Antworten in die nächsten Release Notes. Wiederholen Sie das bei jedem Release in derselben Reihenfolge, damit Fachbereiche wissen, wann sie mit Informationen rechnen können. Wie ich Releases in Programmen aufsetze, steht unter [DevOps und Release-Management](/leistungen/devops-und-release-management/).
