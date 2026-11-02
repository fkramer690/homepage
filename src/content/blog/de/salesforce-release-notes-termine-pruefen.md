---
title: "Salesforce Release Notes prüfen, bevor das Release kommt"
description: "Salesforce Release Schedule erklärt: drei Releases pro Jahr, Sandbox Preview, Termine je Instanz und was die IT-Leitung vor jedem Release prüft."
pubDate: 2026-11-02
lang: de
slug: salesforce-release-notes-termine-pruefen
translationKey: salesforce-release-schedule
topic: devops
categories: [devops]
tags: [Salesforce Release, Release Notes, Sandbox Preview, Release Schedule, Release Updates, IT-Leitung]
takeaways:
  - "Salesforce bringt drei Releases pro Jahr: Spring im Februar, Summer im Juni und Winter im Oktober. Den Zeitpunkt wählen Sie nicht."
  - "Preview-Sandboxes erhalten das Release laut Salesforce vier bis fünf Wochen vor der Produktion. Welche das sind, entscheidet ein Refresh vor dem Stichtag."
  - "Bei Winter '27 erschienen die Release Notes am 19. August, die Produktion folgte an drei Wochenenden zwischen dem 4. September und dem 9. Oktober."
  - "Pro Release gehören fünf Prüfungen in den Plan: Release Notes nach Produkten, Release Updates, Regressionstest, Schnittstellen und Kommunikation."
faq:
  - q: "Wie oft gibt es ein Salesforce-Release?"
    a: "Dreimal im Jahr. Spring kommt im Februar, Summer im Juni und Winter im Oktober."
  - q: "Wann erscheinen die Salesforce Release Notes?"
    a: "Einige Wochen vor dem ersten Produktionstermin. Bei Winter '27 waren es der 19. August 2026, die ersten Produktionsinstanzen folgten am 4. September."
  - q: "Was ist die Salesforce Sandbox Preview?"
    a: "Sandboxes auf Preview-Instanzen erhalten das neue Release laut Salesforce vier bis fünf Wochen vor der Produktion. So lassen sich eigene Anpassungen vorab gegen das Release testen. Ob eine Sandbox auf Preview liegt, entscheidet ein Refresh vor dem Stichtag."
  - q: "Wann kommt Salesforce Spring '27?"
    a: "Spring-Releases kommen laut Salesforce im Februar, die Sandbox Preview im Januar. Die genauen Termine je Instanz stehen im Wartungskalender auf Salesforce Trust."
draft: false
---

Salesforce spielt dreimal im Jahr ein großes Release ein, im Februar, Juni und Oktober, und Sie bestimmen den Zeitpunkt nicht selbst. Der Salesforce Release Schedule gibt deshalb den Takt vor, in dem die IT-Leitung prüfen muss: Release Notes lesen, Sandboxes auf die Preview legen, testen und den Fachbereich informieren. Dieser Artikel zeigt den Ablauf am Beispiel von Winter '27, welche Prüfungen in jedes Release gehören und was für Spring '27 jetzt zu planen ist.

## Wie läuft ein Salesforce-Release ab?

Laut [Salesforce-FAQ zum Release-Zeitplan](https://help.salesforce.com/s/articleView?id=005224913&language=en_US&type=1) kommen neue Funktionen dreimal im Jahr: Spring im Februar, Summer im Juni und Winter im Oktober. Upgrades laufen außerhalb der Geschäftszeiten und am Wochenende. Den Wartungsplan veröffentlicht Salesforce ein Jahr im Voraus.

Jedes Release hat dieselben Stationen. Beim Release Winter '27 sahen sie laut [Admin-Blog von Salesforce](https://admin.salesforce.com/blog/2026/admin-winter-27-release-countdown) so aus:

```zeitleiste
2026-08-13 | Anmeldung für Pre-Release-Orgs
2026-08-19 | Release Notes veröffentlicht
2026-08-27 | Stichtag für Sandbox-Refresh
2026-08-28 | Sandbox Preview beginnt
2026-09-04 | Erste Produktionsinstanzen, weitere am 2. und 9. Oktober
```

Zwischen den Release Notes und dem letzten Produktionstermin lagen also rund sieben Wochen, bei manchen Instanzen nur gut zwei. Wer erst nach dem Produktionstermin liest, was sich ändert, hat keinen Puffer mehr.

## Pre-Release-Org und Preview-Sandbox haben verschiedene Aufgaben

Salesforce bietet vor jedem Release zwei Möglichkeiten, Neues früh zu sehen. Die Pre-Release-Org ist eine leere Developer Edition, für die man sich laut Admin-Blog einige Tage vor den Release Notes anmelden kann, bei Winter '27 ab dem 13. August. Sie eignet sich, um neue Funktionen kennenzulernen und zu entscheiden, ob sich ein Pilot lohnt. Ihre eigenen Anpassungen, Daten und Schnittstellen enthält sie nicht.

Dafür ist die Preview-Sandbox da. Sie ist eine Kopie Ihrer Org auf dem neuen Release. Erst dort zeigt sich, ob ein eigener Flow, eine Validierungsregel oder eine Komponente eines Partners mit dem Release noch so funktioniert wie vorher. Für die IT-Leitung ist die Preview-Sandbox deshalb das wichtigere Werkzeug. Die Pre-Release-Org ist eher etwas für Architekten und Produktverantwortliche, die über neue Funktionen entscheiden.

Wenn Partner für Sie entwickeln, gehört in die Vereinbarung, wer die Tests in der Preview-Sandbox übernimmt und bis wann Ergebnisse vorliegen. Sonst testet am Ende niemand, weil jeder annimmt, der andere habe es getan.

## Der Termin hängt an der Instanz Ihrer Org

Ihre Produktionsorg liegt auf einer Instanz, und jede Instanz hat ihren eigenen Termin. Welcher es ist, steht im Wartungskalender auf Salesforce Trust. Bei Winter '27 gab es drei Produktionswochenenden.

Für Sandboxes gibt es eine zweite Unterscheidung. Laut [Hinweisen zur Sandbox Preview](https://help.salesforce.com/s/articleView?id=000391927&type=1&language=en_US) werden Sandboxes auf Preview-Instanzen vorab auf das neue Release gehoben, bei Winter '27 am 28. und 29. August. Sandboxes auf anderen Instanzen bleiben auf dem alten Release und kommen mit der Produktion. Welche Instanz eine Sandbox hat, ändern Sie nur durch einen Refresh, und der zählt nur, wenn er vor dem Stichtag liegt.

Für die Planung heißt das: Mindestens eine Sandbox sollte auf der Preview liegen, damit Sie das Release testen können, bevor es in die Produktion kommt. Mindestens eine sollte auf dem alten Release bleiben, damit laufende Entwicklung und Hotfixes gegen den Stand der Produktion getestet werden.

## Was prüft die IT-Leitung je Release?

Die Release Notes sind lang. Niemand muss alles lesen, aber für jede Prüfung braucht es einen Verantwortlichen und einen Termin:

```schritte
Release Notes | Woche 1 · Architekt
  Nach genutzten Produkten filtern und Änderungen mit Wirkung markieren.
Release Updates | Woche 1 bis 2 · Admin
  Im Setup prüfen, welche Updates erzwungen werden und bis wann.
Regressionstest | Woche 2 bis 4 · Team und Key User
  Kernprozesse in der Preview-Sandbox durchspielen.
Schnittstellen | Woche 2 bis 4 · Integration
  API-Versionen, Anmeldungen und abgekündigte Funktionen prüfen.
Kommunikation | vor Produktion · Produktverantwortung
  Den Fachbereich über sichtbare Änderungen informieren.
```

Bei den **Release Notes** hilft ein Filter nach den Produkten, die die Org wirklich nutzt. Markieren Sie dann drei Arten von Änderungen: was Nutzer sehen, was eigene Anpassungen brechen kann und was abgeschaltet wird. Ein Beispiel für die Pipeline zeigt [Salesforce Winter '27: Was sich für Ihre Pipeline ändert](../salesforce-winter-27-aenderungen-pipeline/).

**Release Updates** im Setup sind Änderungen, die Salesforce zu einem festen Datum erzwingt. Sie lassen sich vorher in einer Sandbox aktivieren und testen. Wer sie liegen lässt, erlebt sie am Stichtag in der Produktion.

Beim **Regressionstest** zählen die Prozesse, mit denen das Unternehmen Geld verdient oder Kunden bedient: Angebot, Auftrag, Servicefall, Einsatz. Halten Sie die Testfälle von Release zu Release fest, damit der nächste Durchlauf schneller geht. Automatisierte Tests für die wichtigsten Abläufe lohnen sich hier besonders, weil sie dreimal im Jahr gegen ein Release laufen, das Sie nicht selbst gebaut haben. Für die mobile App im Außendienst gilt ein eigener Takt, den ich in [Field Service App Updates testen](../field-service-app-updates-testen/) beschreibe.

```praxis
In einem Programm habe ich den Release-Prozess aufgebaut. Anfangs lief jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
```

Die Releases von Salesforce gehören in denselben Prozess, mit denselben Tests und Freigaben wie die eigenen Releases.

Für die **Kommunikation** reicht selten eine weitergeleitete Mail von Salesforce. Was der Fachbereich wissen muss, beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/). Ob die eigenen Releases stabil laufen, zeigen die [DORA-Metriken für Salesforce](../dora-metriken-salesforce-releases/).

## Spring '27 kommt im Februar, die Preview im Januar

Nach dem Muster aus der FAQ erhalten Preview-Sandboxes Spring '27 im Januar 2027, die Produktion folgt im Februar. Die genauen Termine je Instanz stehen im Wartungskalender auf Trust, sobald Salesforce sie freigibt. Ich aktualisiere diesen Artikel mit jedem Release.

```hinweis tipp
Tragen Sie die drei Releases pro Jahr als feste Termine in die eigene Release-Planung ein. Legen Sie in den Wochen um den Produktionstermin keine großen eigenen Deployments, damit ein Fehler eindeutig zuzuordnen ist.
```

Wie ich Release-Prozesse mit Kunden aufbaue, steht unter [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

## Den Sandbox-Plan für Spring '27 im Dezember festlegen

Legen Sie noch im Dezember fest, welche Sandbox auf die Preview für Spring '27 geht und welche auf dem aktuellen Release bleibt. Prüfen Sie mit dem Sandbox Preview Guide von Salesforce, auf welcher Instanz jede Sandbox liegt, und planen Sie den nötigen Refresh vor dem Stichtag im Januar. Benennen Sie für jede der fünf Prüfungen einen Verantwortlichen und tragen Sie die Termine in den Kalender des Teams ein, sobald Salesforce die Release Notes ankündigt.
