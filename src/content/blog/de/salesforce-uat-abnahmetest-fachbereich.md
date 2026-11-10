---
title: "Salesforce UAT: Wer testet vor dem Release?"
description: "Wer beim Salesforce-Abnahmetest (UAT) was testet, wie viel Zeit der Fachbereich einplanen muss und wann ein Release freigegeben ist, auch mit mehreren Partnern."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-uat-abnahmetest-fachbereich
translationKey: salesforce-uat-business-testing
topic: release
categories: [devops, architecture]
contactBrief: partner-governance
tags: [UAT, Abnahmetest, Release-Management, Partnersteuerung]
takeaways:
  - "40 Testfälle zu je 20 Minuten für zwei Rollen ergeben rund 27 Stunden, mit 20 Prozent Puffer rund vier Personentage im Kalender der Tester."
  - "Ein dokumentierter Systemtest ist Eingangskriterium für UAT. Wer ihn liefert und wer den Ende-zu-Ende-Test über alle Partner verantwortet, regelt der Vertrag."
  - "UAT läuft in einer produktionsnahen Sandbox mit Testnutzern pro fachlicher Rolle. Ein Release ist erst freigegeben, wenn der Fachbereich schriftlich zustimmt."
faq:
  - q: "Was ist UAT in Salesforce-Projekten?"
    a: "UAT steht für User Acceptance Testing, auf Deutsch Abnahmetest. Fachanwender prüfen in einer produktionsnahen Sandbox, ob eine neue Funktion ihren Prozess richtig abbildet, bevor sie in Produktion geht. Die Abnahmeentscheidung trifft der Fachbereich, nicht der Umsetzungspartner."
  - q: "Wer sollte den Abnahmetest machen, Partner oder Fachbereich?"
    a: "Der Fachbereich. Der Partner testet vorher technisch, ob alles funktioniert. Führt der Partner auch den Abnahmetest durch, prüft er seine eigene Interpretation der Anforderung."
  - q: "Wie lange dauert ein UAT?"
    a: "Das hängt vom Umfang des Releases ab. Als Faustformel gilt: Anzahl der Testfälle mal Minuten pro Testfall mal Zahl der Rollen, plus Puffer für Nachtests. 40 Testfälle zu je 20 Minuten für zwei Rollen ergeben rund vier Personentage. Wichtiger als die Dauer ist, dass die Testerinnen und Tester für diese Zeit freigestellt sind."
  - q: "Was passiert mit Fehlern aus dem UAT?"
    a: "Jeder Fehler bekommt einen Schweregrad. Blockierende Fehler verhindern die Freigabe, kleinere gehen dokumentiert in ein späteres Release. Die fachliche Auswirkung bewertet der Fachbereich, nicht der Partner. Fehler bei Berechtigungen, Datenschutz oder Datenintegrität bewerten IT und Datenschutz mit."
  - q: "Wann ist ein Salesforce-UAT abgeschlossen?"
    a: "Wenn alle kritischen Testfälle durchgeführt sind, kein blockierender Fehler mehr offen ist, Nachtests bestanden sind und der Fachbereich die getestete Version schriftlich freigegeben hat. Für offene wesentliche Fehler braucht es einen vereinbarten Termin für die Korrektur."
draft: false
---

Beim Salesforce-UAT (User Acceptance Testing, auf Deutsch Abnahmetest) prüft der Fachbereich, ob eine neue Funktion seinen Prozess richtig abbildet. Ob der Code und die Konfiguration technisch funktionieren, muss vorher feststehen: Diesen Systemtest liefert der Umsetzungspartner, und der Vertrag sollte das so festhalten. Testfälle entstehen aus den Akzeptanzkriterien der User Story, bevor die Umsetzung beginnt, und gehören dem Kunden. UAT läuft in einer produktionsnahen Sandbox mit Testnutzern pro fachlicher Rolle. Freigegeben ist ein Release erst, wenn der Fachbereich schriftlich zugestimmt hat. Mit mehreren Partnern ist diese Trennung der wichtigste Hebel, damit UAT nicht zur Fehlersuche wird.

## Was ist UAT, und was ist es nicht?

In einem Salesforce-Programm gibt es mehrere Testarten, die oft durcheinandergehen:

| Test | Wer | Frage |
|---|---|---|
| Entwicklertest, Apex-Tests | Entwickler, automatisiert in der Pipeline | Funktioniert mein Baustein? |
| Systemtest | Partner | Funktioniert das Feature mit den richtigen Rechten, Daten und Schnittstellen? |
| Integrationstest | Partner und ERP-Team | Kommen die Daten richtig im ERP an und zurück? |
| UAT, Abnahmetest | Fachbereich | Bildet die Funktion unseren Prozess ab? |
| Regressionstest | automatisch, wo möglich | Funktioniert alles, was vorher ging, noch? |

Fachanwender können schon früher beteiligt sein, etwa an Prototypen oder Demos. Spätestens im UAT prüfen sie selbst und entscheiden über die fachliche Eignung. Deshalb ist es teuer, sie mit Fehlern zu belasten, die eine frühere Stufe hätte finden müssen. Wenn ein Innendienstmitarbeiter im UAT feststellt, dass ihm die Berechtigung für ein Feld fehlt, war der Systemtest unzureichend. Das blockiert geplante Testläufe, bindet Fachbereichszeit und kostet Vertrauen in das Projekt.

## Mit mehreren Partnern wird UAT oft zur Fehlersuche

Partnerlieferungen werden in vielen Programmen ohne technisches Review abgenommen, und die Probleme zeigen sich erst im UAT oder in der Produktion. Mit mehreren Partnern kommen zwei Effekte dazu:

- **Jeder testet seinen Teil.** Partner A testet den Angebotsprozess, Partner B die Auftragsübergabe ans ERP. Den Weg vom Angebot bis zum Auftrag im ERP testet erst der Fachbereich im UAT.
- **UAT ist der erste gemeinsame Stand.** Wenn jeder Partner in seiner eigenen Umgebung testet, werden die Änderungen erst in der UAT-Sandbox zusammengeführt. Eine [Sandbox-Strategie mit einer gemeinsamen Integrationsumgebung](../salesforce-sandbox-strategie-mehrere-partner/) holt diesen Moment nach vorn.

Der Kunde legt deshalb die Regeln fest, und jede Lieferung wird geprüft, bevor sie in die nächste Stufe geht. Für den Weg über mehrere Partner hinweg braucht es eine benannte Verantwortung: eine kundenseitige Testleitung, einen Lead-Partner oder die Programmleitung, die den Ende-zu-Ende-Test koordiniert und über den Start des UAT entscheidet. Ein Feature kommt erst ins UAT, wenn diese Eingangskriterien erfüllt sind:

- Der Release-Kandidat ist vollständig in der UAT-Sandbox installiert, mit eindeutiger Version.
- System- und Integrationstests sind dokumentiert und bestanden, das [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/) hat den Code freigegeben.
- Testnutzer, Testdaten und Schnittstellen zum Test-ERP sind geprüft.
- Bekannte Fehler sind dokumentiert, und ein kurzer Smoke-Test der Umgebung ist bestanden.

## Wie läuft ein UAT ab?

Ein UAT pro Release folgt diesen Schritten. Die Dauer hängt vom Umfang ab, deshalb nenne ich hier nur, wer verantwortlich ist:

```schritte
Testfälle schreiben | vor dem Bau · Fachbereich mit Product Owner
  Aus den Akzeptanzkriterien jeder User Story entstehen Testfälle mit Ausgangsdaten und erwartetem Ergebnis.
Systemtest | vor UAT · Partner
  Der Partner testet jedes Feature mit den echten Rollen und dokumentiert das Ergebnis im Ticket.
UAT vorbereiten | vor dem Testfenster · Kunde
  Sandbox-Refresh einplanen, personenbezogene Daten maskieren, Testnutzer pro Rolle anlegen, Testdaten und Schnittstellen zum Test-ERP prüfen.
Abnahmetest | festes Zeitfenster · Fachbereich
  Testerinnen und Tester spielen die Testfälle durch und erfassen Fehler mit Schwere und Screenshot.
Freigabe | Ende des Zeitfensters · Fachbereich
  Go oder No-Go für die getestete Version, schriftlich: blockierende Fehler verhindern das Release, kleinere gehen dokumentiert in ein späteres Release.
```

Drei Punkte entscheiden im Fachbereich darüber, ob das funktioniert:

1. **Testnutzer pro Rolle.** Wer als Administrator testet, findet keine Rechteprobleme. Jede fachliche Rolle aus dem [Berechtigungskonzept](../salesforce-berechtigungskonzept-permission-sets/), etwa Innendienst oder Servicedisponent, braucht einen Testnutzer mit genau ihren Rechten: Lizenz, Permission Sets und Freigaben.
2. **Echte Datenmengen.** Ein Report, der in einer fast leeren Sandbox schnell lädt, kann mit Millionen von Assets deutlich langsamer sein. Deshalb läuft UAT bei großen Datenmengen und komplexen Datenbeziehungen in der Full Sandbox. Für klar abgegrenzte Releases kann eine Partial Copy Sandbox mit gezielt ausgewählten Testdaten reichen. Eine Full Sandbox lässt sich nur alle 29 Tage aktualisieren, und der Refresh kann mehrere Tage dauern, deshalb gehört er früh in den Releaseplan. Wer Produktionsdaten kopiert, maskiert personenbezogene und vertrauliche Felder, gerade wenn mehrere Partner Zugriff auf die Sandbox haben.
3. **Freigestellte Tester.** Fachanwender, die neben dem Tagesgeschäft testen, testen den einfachsten Weg und hören auf, sobald er funktioniert. Wer UAT plant, plant deshalb auch, wer im Fachbereich in dieser Zeit die Arbeit übernimmt. Gute Tester sind die Key User, die nach dem Go-live die erste Anlaufstelle in ihrem Team sind. Was sie sonst leisten und wie viel Zeit sie brauchen, steht in [Key User in Salesforce-Einführungen: was sie leisten](../salesforce-key-user-netzwerk/).

## Wie viel Zeit muss der Fachbereich einplanen?

Eine feste Zahl gibt es nicht, aber eine einfache Rechnung. Zählen Sie die Testfälle des Releases, schätzen Sie pro Testfall die Zeit für Durchführung und Dokumentation und multiplizieren Sie mit der Zahl der Rollen, die ihn durchspielen müssen. Auf das Ergebnis kommt ein Puffer für Nachtests, weil jede Korrektur noch einmal geprüft wird. Als Rechenbeispiel: 40 Testfälle zu je 20 Minuten, zwei Rollen pro Testfall, ergeben rund 27 Stunden reine Testzeit. Mit 20 Prozent Puffer für Nachtests sind es rund 32 Stunden, also vier Personentage. Vorbereitung und Fehlerbesprechungen kommen dazu. Diese Tage müssen im Kalender der Tester stehen, bevor das Release geplant wird, nicht danach.

## Wer entscheidet, ob ein Fehler das Release stoppt?

Die fachliche Auswirkung eines Fehlers bewertet der Fachbereich. Der Partner kann einschätzen, wie aufwendig eine Korrektur ist, aber nicht, ob der Innendienst ohne das Feld arbeiten kann. Fehler bei Berechtigungen, Datenschutz oder Datenintegrität, etwa eine doppelte Buchung im ERP, bewerten IT und Datenschutz mit; sie gelten nie als kosmetisch. Ich empfehle drei Stufen:

- **Blockierend:** Der Prozess ist ohne Korrektur nicht durchführbar. Das Release geht nicht live.
- **Wesentlich:** Es gibt einen Umweg, den die Anwender ein paar Wochen gehen können. Das Release geht live, die Korrektur kommt mit dem nächsten Release.
- **Kosmetisch:** Beschriftungen, Reihenfolge, rein optische Abweichungen ohne Einfluss auf Bedienung oder Verständnis. Kommt ins Backlog.

```hinweis offen
Halten Sie im Vertrag mit dem Partner fest, was „abgenommen“ bedeutet: Wer stimmt zu, in welcher Form, und welche Fehlerstufen eine Abnahme verhindern. Sonst entsteht später Streit darüber, ob die Produktivsetzung oder die Nutzung schon als Abnahme gilt.
```

## Automatisieren lässt sich, was vor und nach dem UAT kommt

Die Abnahmeentscheidung bleibt beim Menschen, weil es um das Urteil der Fachanwender geht. Automatisieren lässt sich aber vieles davor und danach, etwa mit Apex-Tests und Flow-Tests in der Pipeline: Regressionstests für die wichtigsten Prozesse, die bei jedem Release laufen, und die Vorbereitung der Sandbox nach dem Refresh. Ein guter Anfang sind die fünf Prozesse mit dem größten finanziellen Einfluss, etwa Angebot, Auftrag und Rechnung. Je mehr Tests die Pipeline übernimmt, desto mehr Zeit bleibt den Testern für die neuen Funktionen. Für mobile Apps im Außendienst gilt das besonders, weil neue App-Versionen, Betriebssystem-Updates und geänderte Offline-Einstellungen die Abläufe der Techniker verändern können, siehe [Field Service App Updates testen](../field-service-app-updates-testen/).

## Systemtest und Abnahmetest im nächsten Release trennen

Trennen Sie im nächsten Release Systemtest und Abnahmetest. Verlangen Sie vom Partner einen dokumentierten Systemtest pro Feature, bevor es in die UAT-Sandbox geht; diese Regel gehört in die [Partnersteuerung](../../leistungen/partnersteuerung/). Legen Sie Testnutzer pro Rolle an. Für das Release danach schreibt der Fachbereich die Testfälle schon beim Verfeinern der User Stories.
