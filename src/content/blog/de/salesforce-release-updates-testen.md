---
title: "Salesforce Release Updates vor der Durchsetzung testen"
metaTitle: "Salesforce Release Updates testen: Fristen bis 2027"
description: "Salesforce setzt Release Updates zu einem geplanten Termin durch. Welche bis Sommer 2027 Hersteller treffen (Stand 11/2026) und wie Sie sie richtig testen."
pubDate: 2026-11-09
lang: de
slug: salesforce-release-updates-testen
translationKey: salesforce-release-updates
topic: release
categories: [devops]
tags: [Salesforce Release, Release Updates, Sandbox, Schnittstellen, IT-Leitung]
takeaways:
  - "Viele Release Updates bieten einen Testlauf, der das neue Verhalten früher einschaltet. Nicht jeder Testlauf lässt sich wieder abschalten."
  - "Schritte als erledigt markieren hält nur Ihren Fortschritt fest. Die Änderung selbst kommt mit dem Testlauf oder mit der Durchsetzung."
  - "Stand November 2026 treffen die riskantesten Updates für Hersteller die Schnittstellen: SOAP-Login, OAuth-Passwort-Flow und falsche Instanz-URLs."
  - "Bei Berechtigungsänderungen beweist ein Test als Admin wenig. Bei Login-Änderungen zählt nur der Integrationsuser mit produktionsgleicher Konfiguration."
  - "Ein Schnittstellen-Update ist erledigt, wenn die Gegenseite schriftlich freigibt: Methode, Endpunkt, Testergebnis und Abbruchbedingung."
faq:
  - q: "Was ist ein Salesforce Release Update?"
    a: "Ein Release Update ist eine Änderung der Salesforce-Plattform, die Salesforce im Setup unter Release Updates mit Termin oder Release aufführt. Bis dahin können Sie sie testen, oft mit einem Testlauf; danach setzt Salesforce sie in jeder betroffenen Org nach ihrem Rollout-Plan durch."
  - q: "Kann ich ein Salesforce Release Update verschieben?"
    a: "Meist nicht. Laut Salesforce bieten einige Release Updates eine begrenzte Verlängerung zur Selbstbedienung, die meisten nicht. Prüfen Sie das Update im Setup, statt mit einer Verlängerung zu planen."
  - q: "Was ist der Unterschied zwischen Testlauf und erledigt markierten Schritten?"
    a: "Der Testlauf schaltet das neue Verhalten in der Org ein. Erledigt markierte Schritte dokumentieren nur Ihren Fortschritt und ändern nichts in der Org; dauerhaft wird die Änderung, wenn Salesforce sie durchsetzt."
  - q: "Welche Salesforce-Änderungen betreffen 2027 die Schnittstellen?"
    a: "Stand November 2026: strengerer SOAP login() aus breiten IP-Bereichen ab 31. Januar 2027 in Produktion, das Ende des OAuth 2.0 Username-Password Flow für Connected Apps am 20. Februar 2027, das Support-Ende für falsche Instanz-URLs zwischen Januar und März 2027 und das Aus für SOAP login() in den API-Versionen 31.0 bis 64.0 mit Summer '27."
draft: false
---

Salesforce Release Updates sind Änderungen der Plattform, die Salesforce im Setup unter Release Updates mit einem Termin aufführt, ab dem es sie in jeder betroffenen Org durchsetzt. Bis dahin legen Sie fest, wann Sie das neue Verhalten testen: zuerst in einer Sandbox, dann in einem geplanten Produktionsfenster, in dem die Prozessverantwortlichen erreichbar sind. Stand November 2026 treffen die riskantesten Updates für Hersteller die Schnittstellen: Der SOAP-Login braucht ab 1. Dezember 2026 eine neue Berechtigung und ab 31. Januar 2027 strengere Prüfungen, der OAuth 2.0 Username-Password Flow für Connected Apps endet am 20. Februar 2027, und Summer '27 schaltet SOAP login() in älteren API-Versionen ab.

## Was ist ein Salesforce Release Update?

Ein Release Update ist eine Änderung, die Salesforce für Sicherheit, Leistung oder neues Verhalten an der Plattform vornimmt und im Setup ankündigt, bevor sie Pflicht wird. Die [Seite Release Updates im Setup](https://help.salesforce.com/s/articleView?id=xcloud.release_updates_view.htm&language=en_US&type=5) sortiert sie in Ansichten wie Needs Action, Due Soon, Overdue und Archived. Jedes Update erklärt, was sich ändert, wen es betrifft und wie es Ihre Org berührt, und listet die Schritte mit Datum.

Vier Begriffe werden leicht verwechselt, und der Unterschied entscheidet, was Sie noch rückgängig machen können, laut der [Salesforce-Hilfe zu Release Updates](https://help.salesforce.com/s/articleView?id=xcloud.release_updates_troubleshoot.htm&language=en_US&type=5):

```tabelle
titel: Vier Begriffe rund um ein Salesforce Release Update
spalten: Begriff | Was in der Org passiert | Rückgängig?
Testlauf eingeschaltet | Das neue Verhalten ist an, vor der Durchsetzung | Oft, mit Disable Test Run, aber nicht bei jedem Update
Schritte erledigt markiert | Nichts, es hält nur Ihren Fortschritt fest | Nicht relevant
Durchgesetzt | Salesforce schaltet die Änderung endgültig ein | Nein *
Verlängerung | Der Termin verschiebt sich für Ihre Org | Nur manche Updates bieten eine begrenzte Verlängerung zur Selbstbedienung
fazit: Lesen Sie bei jedem Update, ob es einen Testlauf hat und ob sich der Testlauf wieder abschalten lässt.
```

Release Updates sind eine der sechs Prüfungen, die ich für jedes Salesforce-Release empfehle, neben Release Notes, Regressionstest, Schnittstellen, Kommunikation und der Kontrolle nach dem Upgrade. Den ganzen Ablauf beschreibe ich in [Salesforce Release Notes und Termine: was die IT-Leitung prüft](../salesforce-release-notes-termine-pruefen/). Dieser Artikel geht bei den Release Updates in die Tiefe, weil sie die Prüfung sind, bei der Salesforce das Ergebnis für Sie festlegt, wenn Sie den Termin verpassen.

Termine verschieben sich. Das Ende des OAuth-Passwort-Flows war zuerst für das Winter-'27-Release geplant und hat jetzt einen eigenen Termin, den 20. Februar 2027, laut dem [Salesforce-Wissensartikel zum Username-Password Flow](https://help.salesforce.com/s/articleView?id=005461279&language=en_US&type=1). Es gilt der Termin im Setup Ihrer Produktions-Org, vor jedem Release noch einmal geprüft.

## Welche Release Updates treffen Hersteller-Orgs bis Sommer 2027?

Hersteller betreiben Salesforce selten allein. Installierte Basis, Ersatzteilpreise und Auftragsstatus kommen aus dem ERP, oft über eine Middleware, Händlerportale melden sich über Salesforce an, und Partner bringen Pakete mit. Genau dort greifen die aktuellen Änderungen. In der Liste stehen zwei Arten nebeneinander: Release Updates, die Sie früh testen können, und Abschaltungen, auf die Sie nur mit einer Migration reagieren können.

```tabelle
titel: Änderungen für Schnittstellen bis Sommer 2027 (Stand 9. November 2026)
spalten: Änderung | Termin | Art | Wo es Hersteller trifft
SOAP login() braucht Use Any API Auth | 1.12.2026 | Release Update | ERP-Middleware und Data Loader mit SOAP-Login *
SOAP login() aus breiten IP-Bereichen braucht Token oder mTLS; ungenutzter SOAP-Login wird abgeschaltet | 15.12.2026 Sandbox, 31.1.2027 Produktion | Sicherheitsvorgabe | Integrationen aus sehr breitem Login-IP-Bereich, Orgs mit kaum SOAP-Login *
OAuth Username-Password Flow endet | 20.2.2027 | Release Update | Nächtliche Synchronisation, Reporting-Exporte, ältere Konnektoren *
Falsche Instanz-URLs in API-Aufrufen ohne Support | Produktion 12.1. bis 25.3.2027, je Instanz | Release Update | Middleware-Konfiguration mit Hostnamen einer alten Instanz
SOAP login() in API 31.0 bis 64.0 entfällt | Summer '27 | Abschaltung | Ältere Konnektoren und Skripte
API 31.0 bis 40.0 ohne Support, Aufrufe scheitern ab Summer '28 | Summer '27 und Summer '28 | Abschaltung | Schnittstellen, die seit Jahren niemand angefasst hat
marke: Schnittstelle
fazit: Bei Release Updates gilt der Termin im Setup Ihrer Produktions-Org. Bei Sicherheitsvorgaben und Abschaltungen prüfen Sie den verlinkten Zeitplan von Salesforce.
```

Die SOAP-Termine stehen im [Salesforce-Artikel zum Aus für SOAP login()](https://help.salesforce.com/s/articleView?id=005132110&language=en_US&type=1): Ab 15. Dezember 2026 in Sandboxes und 31. Januar 2027 in Produktion brauchen Aufrufe aus sehr breiten vertrauenswürdigen IP-Bereichen ein Security Token oder Mutual TLS, und in Orgs, die in den sechs Monaten davor überhaupt keinen SOAP-Login hatten, schaltet Salesforce den SOAP-Login einmalig ab. Diese Prüfung zählt die ganze Org: Ein regelmäßiger SOAP-Aufrufer hält SOAP login() aktiviert. Ist eine jährliche Bestandssynchronisation oder ein saisonaler Preisupload der einzige SOAP-Aufrufer, ist er jetzt gefährdet; jeder verbleibende SOAP-Aufrufer ist es mit Summer '27. Die API-Versionen folgen der [API-End-of-Life-Richtlinie](https://developer.salesforce.com/docs/platform/api-rest/guide/api-rest-eol.html): Ab Summer '27 bekommen die Versionen 31.0 bis 40.0 der SOAP-, REST- und Bulk-API keine Fehlerbehebungen und keine Sicherheitsupdates mehr, ab Summer '28 scheitern Aufrufe an sie.

Die Änderung bei den Instanz-URLs betrifft nur Aufrufe an den Hostnamen einer Instanz, auf der Ihre Org nicht mehr läuft, etwa nach einer Org-Migration. Laut dem [Salesforce-Zeitplan zum Support-Ende](https://help.salesforce.com/s/articleView?id=005228941&language=en_US&type=1) wurden die meisten Sandboxes am 3. bis 5. November 2026 umgestellt. Ihre Sandboxes verhalten sich also womöglich schon so, wie es Produktion im Frühjahr tun wird. Wie Sie jede Integration finden, die sich noch mit Passwort anmeldet, steht in [Salesforce: Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).

Ein Update aus Winter '27 ist im Service wichtig: die [Profilfilterung](https://help.salesforce.com/s/articleView?id=release-notes.rn_permissions_profile_filtering_enforced.htm&language=en_US&type=5). Benutzer sehen nur noch ihren eigenen Profilnamen, außer sie haben eine Berechtigung, die mehr erlaubt, etwa View All Profiles. Prüfen Sie Automatisierungen und Komponenten, die Profilnamen anderer Benutzer lesen, zum Beispiel bei der Zuordnung zu Queues oder Technikern, und testen Sie sie mit dem Benutzer, unter dem sie laufen.

## Testläufe beweisen nur mit den betroffenen Identitäten etwas

Wer testet, entscheidet, was der Test beweist. Bei Berechtigungsänderungen wie der Profilfilterung hat ein Admin oft genau die Berechtigungen, die das alte Verhalten erhalten, also besteht der Test des Admins und der des Disponenten scheitert. Bei Login-Änderungen hilft keine Benutzerrolle: Nur der Integrationsuser mit einer Client-Konfiguration, die der Produktion entspricht, zeigt, ob der Aufruf noch funktioniert. Gleiche Login-Methode, gleiche Konnektor-Version, gleiche Sicherheitseinstellungen; Zugangsdaten und Zielsysteme bleiben Sandbox-spezifisch.

Jeder Testlauf braucht deshalb die Identitäten, die betroffen sind. Bei Herstellern sind das meist der Integrationsuser der ERP-Schnittstelle, ein Techniker mit der Field Service Mobile App, ein Händler im Partnerportal und ein Service-Agent. Testen Sie für jede Schnittstelle, die einen der betroffenen Login-Wege nutzt, den fachlichen Fall, der durch sie läuft, zum Beispiel:

- wenn die Schnittstelle der installierten Basis sich per SOAP anmeldet: eine neue Anmeldung erzwingen, dann eine neue Seriennummer aus dem ERP übertragen,
- wenn die Ersatzteilpreis-Abfrage das ERP über eine Middleware mit dem Passwort-Flow aufruft: eine Abfrage von Preis und Verfügbarkeit aus einem Servicefall,
- wenn das Händlerportal Aufträge über einen alten Endpunkt ans ERP gibt: ein Auftrag aus dem Portal, bis er im ERP ankommt.

Ein erfolgreicher Synchronisationszyklus reicht nicht. Testen Sie bei Schnittstellen-Updates den Login, den fachlichen Normalfall, einen Fehlerfall, eine neue Anmeldung nach Ablauf von Sitzung oder Token und mindestens einen geplanten Batch. Fragen Sie nach Jobs, die nur einmal im Monat oder im Jahr laufen, denn genau die sieht ein Testlauf im November nicht.

```schritte
Sortieren | Woche 1 · Admin
  Alle offenen Updates mit Termin und Art auflisten und die markieren, die Schnittstellen oder Zuordnung berühren.
Zuordnen | Woche 1 · Architekt
  Ein Verantwortlicher je Update, bei Schnittstellen auch der der Gegenseite.
Testen | Woche 2 bis 4 · Key User und Integration
  Testlauf in der Sandbox, Prozesse als betroffene Identitäten, seltene Jobs eingeschlossen.
Einschalten | vor dem Termin · Betrieb
  Wo möglich und der Fallback tragbar ist: Testlauf in Produktion in einem beobachteten Fenster, mit Abbruchbedingung.
Beobachten | erste Woche · Betrieb
  Login History, Middleware-Logs und die Queues, die das Update berühren kann.
```

Wählen Sie die Sandbox nach Risiko, nicht nach Typ. Entscheidend sind eine Konfiguration nahe an Produktion, dieselben Berechtigungen, dieselbe Endpunkt-Konfiguration in der Middleware und Daten, die Ihre Prozesse abbilden. Eine Full Sandbox ist nicht immer die beste Wahl: Sie erhöht den Aufwand für Datenschutz, und Fremdsysteme sind darin oft abgeschaltet oder zeigen woandershin. Welche Sandbox beim nächsten Release auf der Preview liegt, beschreibe ich in der [Sandbox-Strategie mit mehreren Partnern](../salesforce-sandbox-strategie-mehrere-partner/).

## In Produktion zu Ihrem Termin einschalten, bevor Salesforce durchsetzt

Bietet ein Update einen Testlauf in Produktion, hat der Sandbox-Test bestanden und sind Auswirkung und Fallback tragbar, schalten Sie ihn vor der Durchsetzung selbst ein, in einem beobachteten Fenster. Wer auf die Durchsetzung wartet, bekommt die Änderung an einem Termin, den er nicht steuert, oft nah am Release-Upgrade, und die Suche, ob ein Fehler vom Release oder vom Update kommt, dauert länger.

```vergleich
ohne: Salesforce setzt zum eigenen Termin durch
- Die Änderung kommt nah am Release-Upgrade.
- Ob ein Fehler vom Release oder vom Update kommt, ist schwerer und langsamer zu klären.
- Der Verantwortliche der Schnittstelle erfährt es aus einer gescheiterten Synchronisation.
mit: Sie schalten in Ihrem Fenster ein
- Der Termin steht im Teamkalender, und alle Verantwortlichen sind erreichbar.
- Eine Änderung auf einmal, damit die Ursache eines Fehlers klar ist.
- Abbruchbedingung und Fallback stehen vorher fest.
```

Bei Herstellern mit Schichtbetrieb und Werken in mehreren Zeitzonen ist ein Nachtfenster nicht automatisch das beste. Wählen Sie das Fenster, in dem der Salesforce-Verantwortliche, der Verantwortliche der Schnittstelle und der Prozessverantwortliche im Fachbereich erreichbar sind und im Werk zu dieser Zeit keine Spitzenlast herrscht. Schreiben Sie vor dem Einschalten drei Dinge auf: welcher Nachweis zeigt, dass das Update funktioniert, welches Symptom es stoppt und was Sie dann tun. Lässt sich der Testlauf nicht abschalten, planen Sie Schadensbegrenzung oder eine direkte Korrektur ohne Rollback: Automatisierung oder Berechtigung in Salesforce korrigieren, die betroffene Schnittstelle anhalten oder die Client-Seite reparieren. Legen Sie je Update fest, welche Seite das ist, und halten Sie deren Verantwortlichen in Bereitschaft.

## Schnittstellen und Pakete brauchen die schriftliche Freigabe der Gegenseite

Bei Updates, die Schnittstellen berühren, kann der Salesforce-Admin nicht allein Entwarnung geben. SOAP-Login, Passwort-Flow und Endpunkte sind in der Middleware, im ERP-Konnektor oder im Paket des Partners eingestellt, nicht in Salesforce. Eine Freigabe hilft nur, wenn sie sagt, was getestet wurde:

```eintrag Freigabe eines Schnittstellen-Updates
System und Verantwortlicher | Welches System ruft Salesforce auf, wer steht dafür ein
Login | Methode, Integrationsuser, Client-Konfiguration
Endpunkt und API-Version | My-Domain-URL, Version im Konnektor
Test und Ergebnis | Welche Fälle liefen, wann, mit welchem Ergebnis *
Nachweis | Login History oder Middleware-Log des Tests
Abbruchbedingung | Welches Symptom stoppt das Einschalten, wer entscheidet
fazit: Bei Paketen fragen Sie den Hersteller schriftlich nach denselben Feldern.
```

Die Zeit für diese Tests kommt von Key Usern und Verantwortlichen der Schnittstellen, die nebenbei ihr Tagesgeschäft haben, und genau dort rutschen Pläne. Meine Erfahrung stammt aus Abnahmetests allgemein, nicht speziell aus Release Updates:

```praxis
In jedem Projekt bisher dauerten UAT oder die Abnahme von Stories länger, als der Kunde geplant hatte, weil seine Leute nicht verfügbar waren.
```

Buchen Sie die Zeit der Key User für die Tests der Release Updates, sobald der Termin im Setup bekannt ist. Wie Sie die Abnahme mit dem Fachbereich organisieren, beschreibe ich in [Salesforce UAT: Abnahmetest mit dem Fachbereich](../salesforce-uat-abnahmetest-fachbereich/). Release Updates gehören in denselben Release-Rhythmus, den ich unter [DevOps und Release-Management](../../leistungen/devops-und-release-management/) beschreibe.

```vertiefung Für Entwickler
titel: So finden Sie die Aufrufer hinter einem Schnittstellen-Update
- Login History nach Login-Typ und API-Version filtern, um zu sehen, welche Benutzer sich per SOAP und mit welcher Version anmelden.
- Middleware-Konfiguration, Named Credentials und Skripte nach Hostnamen alter Instanzen durchsuchen und durch die My-Domain-URL ersetzen.
- Code und Konnektor-Einstellungen nach dem OAuth Grant Type „password“ durchsuchen.
- Use Any API Auth per Permission Set nur den Integrationsusern geben, die noch SOAP-Login brauchen, und ihren Umstieg auf OAuth mit einer External Client App vor Summer '27 planen.
```

## Erster Schritt: eine Liste mit einem Verantwortlichen für jedes offene Release Update

Öffnen Sie in Produktion das Setup, gehen Sie zu Release Updates und schreiben Sie jedes offene Update mit Termin, Art, Testlauf-Option und den berührten Prozessen in eine Liste. Geben Sie jedem einen namentlichen Verantwortlichen, bei Schnittstellen-Updates zusätzlich den der Gegenseite. Für den Stand November 2026 beginnen Sie mit dem SOAP-Login: Use Any API Auth bis 1. Dezember und die selten laufenden Jobs vor dem 31. Januar 2027.
