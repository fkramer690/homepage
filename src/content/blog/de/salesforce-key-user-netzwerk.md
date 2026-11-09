---
title: "Key User in Salesforce-Einführungen: was sie leisten"
metaTitle: "Salesforce Key User: Aufgaben, Auswahl und Zeitbedarf"
description: "Salesforce Key User: Aufgaben je Projektphase, Kriterien für die Auswahl und rund acht Arbeitstage als Planungswert für Workshops, Abnahmetest und Go-live."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-key-user-netzwerk
translationKey: change-key-users
topic: governance
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [Key User, Change Management, Salesforce-Einführung, Rollout]
takeaways:
  - "Key User sind Fachanwender, die das neue System früh kennen, im eigenen Team die ersten Fragen beantworten und Rückmeldungen aus dem Alltag ins Projekt tragen."
  - "Sie stärken im ADKAR-Modell vor allem Wissen und Fähigkeit: Sie zeigen am echten Fall, wie es geht, und sind da, wenn es im Alltag hakt."
  - "Die richtigen Key User sind die, deren Kollegen sie ohnehin um Rat fragen, nicht die, die gerade Zeit haben."
  - "Ein Key User ohne freigestellte Zeit ist ein Titel. Die Zeit gehört in die Planung des Fachbereichs, bevor das Projekt startet."
faq:
  - q: "Was ist ein Key User?"
    a: "Ein Key User ist ein Fachanwender, der das neue System vor allen anderen kennenlernt, an Tests mitwirkt und nach dem Go-live die erste Anlaufstelle für Fragen in seinem Team ist."
  - q: "Wie viele Key User braucht eine Salesforce-Einführung?"
    a: "So viele, dass alle wichtigen Prozesse, Benutzergruppen, Standorte und Sprachen abgedeckt sind. Ein Key User pro Land reicht nur, wenn dort ein weitgehend einheitlicher Prozess läuft. Für kritische Bereiche lieber zwei, damit Urlaub und Krankheit keine Lücke reißen."
  - q: "Wie viel Zeit brauchen Key User?"
    a: "Als erste Planungsannahme rund acht Arbeitstage je Key User für Workshops, Abnahmetest und die ersten zwei Wochen nach dem Go-live, im Betrieb dann wenige Stunden im Monat. Das ist ein Erfahrungswert, kein Benchmark: Umfang, Wellen und Schulungsbedarf ändern ihn. Wichtig ist, dass die Zeit vorher mit der Führungskraft vereinbart ist."
  - q: "Was ist der Unterschied zwischen Key User und Admin?"
    a: "Der Admin betreibt und konfiguriert die Plattform, mit Benutzern, Berechtigungen, Daten und Releases. Der Key User vertritt den Prozess im Fachbereich, testet echte Fälle, hilft Kollegen bei der Nutzung und meldet, was im Alltag nicht passt. Wo genau die Grenze im Support liegt, legt das Unternehmen fest."
draft: false
---

Key User sind Fachanwender, die das neue Salesforce-System vor allen anderen kennen, an den Tests mitwirken und nach dem Go-live die erste Anlaufstelle für Fragen in ihrem Team sind. Sie tragen außerdem Rückmeldungen aus dem Alltag zurück ins Projekt. Ohne sie landet jede Frage beim Projektteam oder beim Support, und viele Fragen werden gar nicht gestellt, sondern mit einer Excel-Liste umgangen. Gute Key User wählt man nach Ansehen im Team aus, nicht nach freier Zeit. Als Planungswert für Workshops, Abnahmetest und die ersten Wochen nach dem Go-live rechne ich mit rund acht Arbeitstagen je Key User, und die gehören vorher in die Planung des Fachbereichs.

## Key User stärken vor allem Wissen und Fähigkeit

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) tragen Key User vor allem zu zwei Stufen bei: Wissen (Knowledge) und Fähigkeit (Ability). Je nach Auswahl fördern sie auch die Bereitschaft und halten die neue Arbeitsweise nach dem Go-live stabil, ersetzen aber weder Sponsor noch Führung. Eine Schulung vermittelt Wissen, aber erst im Alltag zeigt sich, ob jemand die Funktion im Kundentermin oder am Telefon anwenden kann. In diesem Moment hilft keine Hotline, sondern die Kollegin am Nachbartisch, die es schon einmal gemacht hat.

Bei Herstellern kommt etwas dazu: Vertrieb, Innendienst und Service arbeiten in jedem Land und an jedem Standort ein wenig anders. Das Projektteam kennt diese Unterschiede nicht. Key User kennen sie und können früh sagen, wo der geplante Prozess im eigenen Team nicht funktionieren wird.

```praxis
Beim weltweiten Manufacturing-Cloud-Rollout gehörten zu jedem Land Key User, die das Template kannten und im Land die ersten Fragen beantworteten. In Field-Service-Einführungen hilft es, wenn Disponenten der nächsten Welle vorher in der laufenden Region zuschauen. Sie lernen dort mehr als in jeder Schulung, weil sie echte Fälle aus ihrem eigenen Alltag sehen.
```

## Die Aufgaben ändern sich mit der Projektphase

Die Aufgaben ändern sich mit der Phase des Projekts:

```schritte
Vor dem Bau | Workshops · Key User mit Product Owner
  Abläufe im eigenen Team beschreiben, Sonderfälle nennen, Akzeptanzkriterien für User Stories mitformulieren.
Vor dem Go-live | Tests · Key User
  Im Abnahmetest die eigenen Fälle durchspielen und Kollegen in kurzen Sitzungen am echten Fall zeigen, was sich ändert.
Erste Wochen | Alltag · Key User vor Ort
  Erste Anlaufstelle für Fragen, Probleme sammeln und gebündelt ans Projekt melden.
Betrieb | laufend · Key User und Admin
  Neue Kollegen einarbeiten, vor jedem Release erfahren, was kommt, und es im Team weitergeben.
```

Im Abnahmetest gehören Key User dazu, weil sie wissen, welche Fälle und Ausnahmen in ihrem Team vorkommen. Sie prüfen vorab festgelegte Abläufe von Anfang bis Ende mit realistischen Daten; die formale Freigabe bleibt bei den benannten Fachverantwortlichen. Wie UAT aufgebaut sein sollte, beschreibe ich in [Salesforce UAT: Wer testet vor dem Release?](../salesforce-uat-abnahmetest-fachbereich/).

## Wie wählen Sie die richtigen Key User aus?

Die häufigste Auswahl ist die schlechteste: Wer gerade Zeit hat, wird Key User. Das sind selten die Personen, die das Team bei Fragen ohnehin anspricht. Ich achte auf andere Kriterien:

- **Ansehen im Team.** Kollegen fragen diese Person schon heute um Rat, egal zu welchem System.
- **Kenntnis des Prozesses.** Sie weiß, wie ein Angebot, ein Auftrag oder ein Serviceeinsatz im eigenen Team läuft, inklusive der Ausnahmen.
- **Neugier statt Begeisterung.** Ein Key User muss nicht von Salesforce begeistert sein. Kritische Key User finden die Schwächen früher, und wenn sie überzeugt sind, überzeugen sie andere.
- **Bleibt eine Weile.** Wer in drei Monaten die Stelle wechselt, nimmt das Wissen mit.

Planen Sie das Netzwerk nicht pauschal nach Ländern, sondern so, dass jede wichtige Kombination aus Prozess, Rolle, Standort oder Sprache und Rollout-Welle abgedeckt ist, bei kritischen Bereichen mit Vertretung. Fällt der einzige Key User eines Landes in der Woche nach dem Go-live aus, fällt die Unterstützung für das ganze Land aus.

## Was ist ein Key User nicht?

Ein Key User ersetzt weder den Support noch den Admin. Der Key User vertritt die fachliche Sicht seines Bereichs, der Admin betreibt die Plattform mit Benutzern, Berechtigungen, Konfiguration und Releases. Der Key User beantwortet Fragen zur Nutzung, ändert aber keine Konfiguration und behebt keine Fehler in Schnittstellen. Fehler gehen weiter über das Ticketsystem, damit sie gezählt und priorisiert werden. Ein Key User sollte auch nicht allein für Planung und Durchführung des ganzen Schulungsprogramms verantwortlich sein. Kurze Einweisungen und Sprechstunden am echten Fall passen gut zur Rolle, ganze Schulungsprogramme nicht. Wer diese Grenzen nicht zieht, überlastet die Rolle nach wenigen Wochen, und der Key User hört auf, Fragen zu beantworten.

## Wie viel Zeit muss der Fachbereich freistellen?

Ein Key User ohne freigestellte Zeit ist ein Titel. In der Phase vor und kurz nach dem Go-live braucht die Rolle deutlich mehr Zeit als im Betrieb, weil Workshops, Tests und die ersten Wochen mit vielen Fragen zusammenfallen. Wie viel genau, hängt vom Umfang der Einführung ab. Als Annahme für die Planung: vier Workshops zu je vier Stunden, eine Woche Abnahmetest zur Hälfte der Zeit und zwei Wochen nach dem Go-live zu einem Drittel ergeben zusammen knapp acht Arbeitstage. Dazu kommen Vorbereitung und kurze Sitzungen mit Kollegen. Im Betrieb sinkt der Aufwand auf wenige Stunden im Monat, vor allem rund um Releases.

Diese Zeit muss die Führungskraft vor dem Projektstart zusagen, und jemand muss die Arbeit des Key Users in dieser Zeit übernehmen. Sonst testet der Key User nebenbei, und die ersten Fragen nach dem Go-live bleiben liegen, weil das Tagesgeschäft vorgeht.

```hinweis tipp
Vereinbaren Sie die Zeit der Key User schriftlich mit der Führungskraft, mit Wochen und Stunden, und legen Sie fest, wer in dieser Zeit ihre Arbeit übernimmt. Diese Vereinbarung ist Teil des Sponsor-Plans.
```

## Das Netzwerk braucht einen festen Termin

Ein Netzwerk aus Key Usern braucht einen festen Termin. Ich empfehle einen kurzen Austausch, in dem Key User ihre wichtigsten Rückmeldungen einbringen und vorab erfahren, was das nächste Release ändert. So wird jeder Key User zum Kanal in beide Richtungen: Änderungen kommen über ihn ins Team, und Probleme aus dem Team kommen über ihn ins Projekt. Wie dieser Weg vor einem Release aussieht, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/).

Wichtig ist auch, dass die Rolle sichtbar anerkannt wird. Wer zusätzliche Arbeit für das Projekt übernimmt, sollte das in seinem Jahresgespräch und in angepassten Tageszielen wiederfinden. Das entscheidet darüber, ob sich beim nächsten Projekt wieder jemand meldet.

## Fragen, wen das Team heute um Rat bittet

Fragen Sie in jedem betroffenen Team: Wen fragen Sie heute, wenn Sie im System nicht weiterkommen? Die Namen, die mehrfach fallen, sind Ihre Kandidaten. Danach vereinbaren Sie mit den Führungskräften die Zeit und nehmen die Key User in die ersten Workshops mit, bevor gebaut wird. Fällt in einem Team kein Name, trägt dort noch niemand das Thema, und dieses Team braucht in der Schulung mehr Begleitung. Wie wir das Netzwerk in Programmen aufbauen, steht unter [Change Management für Salesforce-Programme](../../leistungen/change-management/).
