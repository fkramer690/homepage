---
title: "Salesforce UAT: Wer testet vor dem Release?"
description: "Wer beim Salesforce-Abnahmetest (UAT) was testet, wie viel Zeit der Fachbereich einplanen muss und wann ein Release freigegeben ist, auch mit mehreren Partnern."
pubDate: 2026-10-29
lang: de
slug: salesforce-uat-abnahmetest-fachbereich
translationKey: salesforce-uat-business-testing
topic: release
categories: [devops, architecture]
contactBrief: partner-governance
tags: [UAT, Abnahmetest, Release-Management, Partnersteuerung]
takeaways:
  - "40 Testfälle zu je 20 Minuten mit zwei Rollen ergeben mit Nachtests rund vier Personentage, die vor der Releaseplanung im Kalender der Tester stehen müssen."
  - "Den technischen Test schuldet der Partner vor UAT. Kommen Fehler wie fehlende Rechte oder kaputte Felder erst in UAT an, hat der Systemtest gefehlt."

  - "UAT läuft in der Full-Copy-Sandbox mit Testnutzern pro Rolle, und ein Release ist erst freigegeben, wenn der Fachbereich schriftlich zugestimmt hat."
faq:
  - q: "Was ist UAT in Salesforce-Projekten?"
    a: "UAT steht für User Acceptance Testing, auf Deutsch Abnahmetest. Fachanwender prüfen in einer produktionsnahen Sandbox, ob eine neue Funktion ihren Prozess richtig abbildet, bevor sie in Produktion geht."
  - q: "Wer sollte den Abnahmetest machen, Partner oder Fachbereich?"
    a: "Der Fachbereich. Der Partner testet vorher technisch, ob alles funktioniert. Testet der Partner auch die Abnahme, prüft er seine eigene Interpretation der Anforderung."
  - q: "Wie lange dauert ein UAT?"
    a: "Das hängt vom Umfang des Releases ab. Wichtiger als die Dauer ist, dass die Testerinnen und Tester für diese Zeit wirklich freigestellt sind und nicht nebenbei testen."
  - q: "Was passiert mit Fehlern aus dem UAT?"
    a: "Jeder Fehler bekommt eine Schwere. Blockierende Fehler verhindern die Freigabe, kleinere gehen dokumentiert in ein späteres Release. Diese Einstufung trifft der Fachbereich, nicht der Partner."
draft: false
---

Beim Salesforce-UAT (User Acceptance Testing, auf Deutsch Abnahmetest) prüft der Fachbereich, ob eine neue Funktion seinen Prozess richtig abbildet. Ob der Code und die Konfiguration technisch funktionieren, muss vorher feststehen: Diesen Systemtest schuldet der Umsetzungspartner. Testfälle entstehen aus den Akzeptanzkriterien der User Story, bevor gebaut wird, und gehören dem Kunden. UAT läuft in einer produktionsnahen Sandbox mit Testnutzern pro Rolle. Freigegeben ist ein Release erst, wenn der Fachbereich zugestimmt hat. Mit mehreren Partnern ist diese Trennung der wichtigste Hebel, damit UAT nicht zur Fehlersuche wird.

## Was ist UAT, und was ist es nicht?

In einem Salesforce-Programm gibt es mehrere Testarten, die oft durcheinandergehen:

| Test | Wer | Frage |
|---|---|---|
| Entwicklertest, Apex-Tests | Entwickler, automatisch in der Pipeline | Funktioniert mein Baustein? |
| Systemtest | Partner | Funktioniert das Feature mit den richtigen Rechten, Daten und Schnittstellen? |
| Integrationstest | Partner und ERP-Team | Kommen die Daten richtig im ERP an und zurück? |
| UAT, Abnahmetest | Fachbereich | Bildet die Funktion unseren Prozess ab? |
| Regressionstest | automatisch, wo möglich | Funktioniert alles, was vorher ging, noch? |

UAT ist die einzige Stufe, in der die Menschen testen, die später mit dem System arbeiten. Deshalb ist es teuer, sie mit Fehlern zu belasten, die eine frühere Stufe hätte finden müssen. Wenn ein Innendienstmitarbeiter in UAT feststellt, dass ihm das Recht auf ein Feld fehlt, hat der Systemtest gefehlt. Das kostet einen Testtag und Vertrauen in das Projekt.

## Mit mehreren Partnern wird UAT oft zur Fehlersuche

Partnerlieferungen werden in vielen Programmen ohne technisches Review abgenommen, und die Probleme zeigen sich erst in UAT oder in Produktion. Mit mehreren Partnern kommen zwei Effekte dazu:

- **Jeder testet seinen Teil.** Partner A testet den Angebotsprozess, Partner B die Auftragsübergabe ans ERP. Den Weg vom Angebot bis zum Auftrag im ERP testet erst der Fachbereich in UAT.
- **UAT ist der erste gemeinsame Stand.** Wenn jeder Partner in seiner eigenen Umgebung testet, treffen die Änderungen erst in der UAT-Sandbox aufeinander. Eine [Sandbox-Strategie mit einer gemeinsamen Integrationsumgebung](../salesforce-sandbox-strategie-mehrere-partner/) holt diesen Moment nach vorn.

Die Lösung ist dieselbe wie bei der Codequalität: Der Kunde legt die Regeln fest, und jede Lieferung wird geprüft, bevor sie weitergeht. Ein Feature kommt erst in UAT, wenn der Systemtest dokumentiert ist und das [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/) freigegeben hat.

## Wie läuft ein UAT ab?

Ein UAT pro Release folgt diesen Schritten. Die Dauer hängt vom Umfang ab, deshalb steht hier nur die Verantwortung:

```schritte
Testfälle schreiben | vor dem Bau · Fachbereich mit Product Owner
  Aus den Akzeptanzkriterien jeder User Story entstehen Testfälle mit Ausgangsdaten und erwartetem Ergebnis.
Systemtest | vor UAT · Partner
  Der Partner testet jedes Feature mit den echten Rollen und dokumentiert das Ergebnis im Ticket.
UAT vorbereiten | wenige Tage vorher · Kunde
  Full Copy aktualisieren, Testnutzer pro Rolle anlegen, Testdaten und Schnittstellen zum Test-ERP prüfen.
Abnahmetest | festes Zeitfenster · Fachbereich
  Testerinnen und Tester spielen die Testfälle durch und erfassen Fehler mit Schwere und Screenshot.
Freigabe | Ende des Zeitfensters · Fachbereich
  Go oder No-Go: blockierende Fehler verhindern das Release, kleinere gehen dokumentiert in ein späteres Release.
```

Drei Punkte entscheiden darüber, ob das funktioniert:

1. **Testnutzer pro Rolle.** Wer als Administrator testet, findet keine Rechteprobleme. Jede Rolle aus dem [Berechtigungskonzept](../salesforce-berechtigungskonzept-permission-sets/) braucht einen Testnutzer mit genau ihren Rechten.
2. **Echte Datenmengen.** Ein Report, der in einer leeren Sandbox in einer Sekunde lädt, braucht mit drei Millionen Assets vielleicht dreißig. Deshalb läuft UAT in der Full Copy.
3. **Freigestellte Tester.** Fachanwender, die neben dem Tagesgeschäft testen, testen den einfachsten Weg und hören auf, sobald er funktioniert. Wer UAT plant, plant deshalb auch, wer im Fachbereich in dieser Zeit die Arbeit übernimmt. Gute Tester sind die Key User, die nach dem Go-live die erste Anlaufstelle in ihrem Team sind. Was sie sonst leisten und wie viel Zeit sie brauchen, steht in [Key User in Salesforce-Einführungen: was sie leisten](../salesforce-key-user-netzwerk/).

## Wie viel Zeit muss der Fachbereich einplanen?

Eine feste Zahl gibt es nicht, aber eine einfache Rechnung. Zählen Sie die Testfälle des Releases, schätzen Sie pro Testfall die Zeit für Durchführung und Dokumentation und multiplizieren Sie mit der Zahl der Rollen, die ihn durchspielen müssen. Auf das Ergebnis kommt ein Puffer für Nachtests, weil jede Korrektur noch einmal geprüft wird. Als Annahme: 40 Testfälle zu je 20 Minuten, zwei Rollen pro Testfall, ergeben rund 27 Stunden, mit Nachtests eher vier Personentage. Diese Tage müssen im Kalender der Tester stehen, bevor das Release geplant wird, nicht danach.

## Wer entscheidet, ob ein Fehler das Release stoppt?

Die Einstufung der Fehler trifft der Fachbereich. Der Partner kann einschätzen, wie aufwendig eine Korrektur ist, aber nicht, ob der Innendienst ohne das Feld arbeiten kann. Ich empfehle drei Stufen:

- **Blockierend:** Der Prozess ist ohne Korrektur nicht durchführbar. Das Release geht nicht live.
- **Wesentlich:** Es gibt einen Umweg, den die Anwender ein paar Wochen gehen können. Das Release geht live, die Korrektur kommt mit dem nächsten Release.
- **Kosmetisch:** Beschriftungen, Reihenfolge, Farben. Kommt ins Backlog.

```hinweis offen
Halten Sie im Vertrag mit dem Partner fest, was „abgenommen“ bedeutet: Wer stimmt zu, in welcher Form, und welche Fehlerstufen eine Abnahme verhindern. Sonst gilt eine Funktion als abgenommen, sobald sie in Produktion läuft.
```

## Automatisieren lässt sich, was vor und nach dem UAT kommt

UAT selbst lässt sich nicht automatisieren, weil es um das Urteil der Fachanwender geht. Automatisieren lässt sich aber, was davor und danach kommt: Regressionstests für die wichtigsten Prozesse, die bei jedem Release laufen, und die Vorbereitung der Sandbox nach dem Refresh. Ein guter Anfang sind die fünf Prozesse, an denen das meiste Geld hängt, etwa Angebot, Auftrag und Rechnung. Je mehr davon die Pipeline übernimmt, desto mehr Zeit bleibt den Testern für die neuen Funktionen. Für mobile Apps im Außendienst gilt das besonders, weil jede App-Version die Abläufe der Techniker verändern kann, siehe [Field Service App Updates testen](../field-service-app-updates-testen/).

## Erster Schritt: Systemtest und Abnahmetest trennen

Trennen Sie im nächsten Release Systemtest und Abnahmetest. Verlangen Sie vom Partner einen dokumentierten Systemtest pro Feature, bevor es in die UAT-Sandbox geht; diese Regel gehört in die [Partnersteuerung](../../leistungen/partnersteuerung/). Legen Sie Testnutzer pro Rolle an. Für das Release danach schreibt der Fachbereich die Testfälle schon beim Verfeinern der User Stories.
