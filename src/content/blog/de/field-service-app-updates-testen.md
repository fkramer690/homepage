---
title: "Field Service App Updates: jede Version vorher testen"
description: "Wie ein Hersteller neue Versionen der Salesforce Field Service App mit Beta-Builds, Debug-Builds und fester Routine testet, bevor sie die Techniker erreichen."
pubDate: 2026-10-28
lang: de
slug: field-service-app-updates-testen
translationKey: field-service-mobile-release-testing
topic: field-service
categories: [field-service, devops]
tags: [Field Service, Außendienst, mobile App, Release-Management, Test, Beta]
takeaways:
  - "Neben den drei Plattform-Releases im Jahr hat die Field Service App eigene Haupt- und Patch-Versionen, die über App Store und Google Play zu den Technikern kommen."
  - "Das Beta-Programm liefert Builds einen Monat vor Hauptversionen und eine Woche vor Patches. Mit Debug-Builds testen Entwickler ihre eigenen Komponenten in Sandboxes."
  - "Salesforce verteilt Haupt- und Patch-Versionen über mehrere Tage, und ein Update erreicht unter Umständen erst sieben Tage nach der allgemeinen Verfügbarkeit alle Nutzer."
  - "Eine Testroutine pro Version umfasst fünf bis zehn Einsätze nach Skript unter iOS und Android, mit Offline-Priming, Data-Capture-Formular, Servicebericht und einem Partnernutzer."
  - "Eine Pilotgruppe von Technikern, die vor jeder Hauptversion zwei Wochen mit der Beta testet, findet die Fehler, die Admins im Büro übersehen."
faq:
  - q: "Wie oft wird die Salesforce Field Service App aktualisiert?"
    a: "Die App hat Hauptversionen wie 260.0 für Spring '26 und dazwischen Patch-Versionen. Allein im September 2026 hat Salesforce am 4. September den Patch 262.3 und am 23. September einen weiteren Patch veröffentlicht."
  - q: "Wie bekomme ich Beta-Versionen der Field Service App?"
    a: "Über das Field Service Mobile Beta and Early Adopters Program auf Salesforce Developers. Beta-Builds gibt es einen Monat vor Hauptversionen und eine Woche vor Patches nach Bedarf. Die Beta zu 260.0 funktionierte nur mit Sandbox-Orgs auf Spring '26."
  - q: "Kann ich verhindern, dass sich die Field Service App auf den Geräten aktualisiert?"
    a: "Salesforce veröffentlicht die App über App Store und Google Play und verteilt sie über mehrere Tage. Ob Sie ein Update zurückhalten können, hängt von Ihrem Gerätemanagement ab. Klären Sie das mit dem Team, das die Geräte verwaltet."
  - q: "Was sollte eine Testroutine für eine neue App-Version abdecken?"
    a: "Anmeldung und Rückkehr aus dem Hintergrund, Offline-Priming und einen kompletten Einsatz ohne Netz, verbrauchte Teile, ein Data-Capture-Formular, den Servicebericht mit Unterschrift, eigene Komponenten nach einem Kaltstart und einen Partnernutzer, jeweils unter iOS und Android."
draft: false
---

Ein Hersteller sollte jede neue Version der Salesforce Field Service App testen, bevor sie bei den Technikern im Außendienst ankommt, und hat dafür drei Werkzeuge. Das Beta-Programm liefert Builds einen Monat vor Hauptversionen und eine Woche vor Patches. Mit Debug-Builds prüfen Entwickler ihre eigenen Komponenten in einer Sandbox. Und eine feste Routine aus fünf bis zehn Einsätzen nach Skript unter iOS und Android deckt Offline-Arbeit, Formulare, Servicebericht und einen Partnernutzer ab. Salesforce verteilt Versionen über mehrere Tage, die Pilotgruppe hat also noch Zeit, Probleme zu melden. Die App-Versionen gehören in denselben Release-Kalender wie die drei Plattform-Releases.

## Wie oft ändert sich die Field Service App?

Die App hat eigene Versionsnummern neben den Plattform-Releases: Die Hauptversion 260.0 gehörte zu Spring '26. Dazwischen kommen Patch-Versionen. Einige Daten aus den Release-Beiträgen der Gruppe Field Service Mobile in der Trailblazer Community:

| Version | Beta | Veröffentlichung | Inhalt |
|---|---|---|---|
| 260.0 (Spring '26) | 14. Januar 2026 | GA im März 2026 | Voice to Form GA, neue Data-Capture-Funktionen, GIS-Karten, Startfortschritt |
| 262.3 (Patch) | 26. August 2026 | 4. September 2026 | Korrekturen bei Anmeldung und Start unter iOS und Android |
| 262.3.1 iOS, E-Patch Android | keine genannt | 23. September 2026 | Weiterer Patch |

Der [Beitrag zu 262.3](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000pPWBC0A4) zeigt, warum Patches zählen. Unter iOS konnte die App Nutzer unerwartet abmelden, nachdem sie im Hintergrund gelegen hatte, und eine Startüberwachung rechnete die Zeit im Hintergrund mit und meldete falsche Zeitüberschreitungen. Unter Android konnten Nutzer bei der Anmeldung im App-internen Browser hängen bleiben. Genau solche Fehler halten einen Techniker vor der Tür des Kunden auf.

Beide Beiträge ergänzen, dass Salesforce Haupt- und Patch-Versionen über mehrere Tage verteilt und Updates unter Umständen erst sieben Tage nach der allgemeinen Verfügbarkeit alle Nutzer erreichen. Für eine Serviceorganisation heißt das: Bis zu einer Woche arbeiten manche Techniker mit der alten und manche mit der neuen Version. Der Support muss zuerst nach der Version fragen. Sie steht in der App unter Profil, Einstellungen, Info.

## Was bieten Beta-Programm und Debug-Builds?

Das [Field Service Mobile Beta and Early Adopters Program](https://developer.salesforce.com/tools/field-service-mobile-beta) steht Kunden offen. Laut Salesforce gibt es Beta-Versionen einen Monat vor Hauptversionen und eine Woche vor Patches nach Bedarf. Die Daten zu 262.3 passen dazu: Beta am 26. August, Veröffentlichung am 4. September.

Zwei Einschränkungen zählen für die Planung. Erstens hängt die Beta an der passenden Vorschau: Laut dem Beitrag zu 260.0 ließ sich diese Beta nur mit Sandbox-Orgs auf Spring '26 nutzen. Techniker können sie also nicht im Tagesgeschäft gegen die Produktion testen. Zweitens beschreibt Salesforce die Beta als Möglichkeit, Kompatibilität zu prüfen und eigene Anpassungen vor dem Rollout vorzubereiten. Sie gehört also auf Testgeräte.

Debug-Builds sind das Werkzeug der Entwickler. Salesforce bietet sie für Haupt- und Patch-Versionen an, um eigene Anpassungen in Sandboxes zu testen. Sie laufen im Android-Emulator oder im iOS-Simulator, brauchen also einen Entwicklerrechner und kein Technikergerät.

## Welche Testroutine sollte pro Version laufen?

Eine gute Routine ist kurz genug für einen halben Tag und deckt die Stellen ab, an denen ein Versionswechsel etwas kaputt macht. Meine hat diese Schritte, jeweils unter iOS und unter Android:

1. **Anmeldung und Rückkehr.** Mit Single Sign-on anmelden, die App eine Stunde in den Hintergrund legen, wieder öffnen.
2. **Offline-Priming.** Mit einem echten Technikerprofil laden, in den Flugmodus wechseln, Termin, Arbeitsauftrag und Asset-Historie öffnen.
3. **Kompletter Einsatz offline.** Verbrauchte Teile aus dem Fahrzeuglager buchen, Status ändern, Foto anhängen.
4. **Data-Capture-Formular.** Ein echtes Prüfformular ausfüllen, zur Hälfte schließen, fortsetzen, absenden.
5. **Servicebericht.** Mit Unterschrift offline erstellen, Vorschau prüfen, synchronisieren.
6. **Eigene Komponenten.** Die App vollständig schließen und neu starten, denn unter iOS laden geänderte Lightning Web Components erst nach einem Kaltstart.
7. **Partnernutzer.** Schritte 1 bis 3 mit einem Nutzer mit Community-Lizenz wiederholen.
8. **Innendienst und ERP.** Nach der Synchronisation prüfen, ob Verbrauch und Bericht angekommen sind, einschließlich der Schnittstelle ins ERP.

Die Schritte 2 und 7 kommen aus den bekannten Offline-Lücken, beschrieben in [Field Service App offline: Welche Daten aufs Gerät?](../field-service-app-offline-briefcase/). Schritt 4 zählt, weil sich Data Capture mit fast jeder Version ändert, siehe [Field Service Data Capture: Prüfprotokolle ohne Papier](../field-service-data-capture-pruefprotokolle/). Schritt 5 testet die eigenen Komponenten in Ihren Berichtsvorlagen, die ich in [Document Builder: fünf Grenzen und Workarounds](../salesforce-document-builder-grenzen-workarounds/) beschrieben habe.

Schreiben Sie die Schritte als Skripte mit erwartetem Ergebnis, genauso wie Testfälle für ein Plattform-Release. Das [Kapitel zu Qualität und Tests in der DevOps-Masterclass](../../masterclass/devops-release-management/qualitaet-tests-reviews/) erklärt, wie solche Tests in Quality Gates passen.

## Wem gehören App-Versionen und Geräte?

App-Versionen liegen zwischen zwei Teams. Das Salesforce-Team kennt die Org und die Anpassungen. Das Gerätemanagement kennt die Geräte, die Betriebssystemversionen und die Regeln für App-Updates. Keines der beiden sieht allein das ganze Bild.

Ich würde eine Person für jede App-Version verantwortlich machen, meist den Release-Manager des Salesforce-Programms. Diese Person verfolgt die Release-Beiträge, startet den Beta-Test, sammelt Ergebnisse und entscheidet mit dem Gerätemanagement, ob etwas warten muss. Betriebssystem-Updates auf den Geräten gehören in denselben Plan, denn eine neue iOS-Version verändert das Verhalten der App genauso wie eine neue App-Version.

Der Kalender dafür ist derselbe, der die Plattform-Releases enthält. Wie Sie ihn mit Freeze-Fenstern und Preview-Sandboxes aufbauen, steht im [Kapitel Release-Planung der DevOps-Masterclass](../../masterclass/devops-release-management/release-planung-salesforce-releases/). Was Winter '27 für Pipelines geändert hat, steht in [Salesforce Winter '27: Was sich für Ihre Pipeline ändert](../salesforce-winter-27-aenderungen-pipeline/).

## Ein typisches Szenario, als Annahme: acht Pilottechniker

Ein Maschinenbauer beschäftigt 100 Techniker, 70 mit iPads und 30 mit Android-Tablets, dazu 15 Partnertechniker. Der Release-Manager stellt eine Pilotgruppe aus acht Personen zusammen: fünf interne Techniker unter iOS, zwei unter Android und ein Partnertechniker.

- **Vier Wochen vor einer Hauptversion.** Die Beta kommt. Der Release-Manager aktualisiert eine Preview-Sandbox mit Testdaten von drei typischen Maschinen.
- **Woche eins und zwei der Beta.** Die Pilottechniker spielen die Routine einmal pro Woche durch, jeweils etwa zwei Stunden, auf Ersatzgeräten mit der Beta. Parallel testen Entwickler die eigenen Komponenten mit Debug-Builds.
- **Zwei Wochen vor der Veröffentlichung.** Die Ergebnisse liegen vor. In diesem Szenario zeigt eine eigene Komponente im Servicebericht unter Android ein leeres Feld. Der Entwickler behebt es, und die Korrektur geht ins nächste Deployment, bevor die App-Version die Produktion erreicht.
- **Woche der Veröffentlichung.** Das Update verteilt sich über mehrere Tage. Die Pilottechniker sind die ersten Ansprechpartner für Kollegen, und der Support fragt bei jedem Ticket nach der Versionsnummer.

Der Aufwand liegt bei etwa 32 Stunden Technikerzeit pro Hauptversion, dazu die Zeit des Release-Managers. Eine fehlgeschlagene Anmeldewelle bei 100 Technikern an einem Montagmorgen kostet mehr.

## Wo fangen Sie an?

1. **Für das Beta-Programm anmelden** und die Release-Beiträge der Gruppe Field Service Mobile abonnieren.
2. **Die Routine schreiben**, als acht Skripte mit erwartetem Ergebnis.
3. **Die Pilotgruppe benennen**, mit beiden Plattformen und mindestens einem Partnertechniker.
4. **App-Versionen in den Release-Kalender aufnehmen**, neben die Plattform-Releases.
5. **Mit dem Gerätemanagement klären**, wie App- und Betriebssystem-Updates auf die Geräte kommen.

App-Tests gehören zu [Kapitel 3 der Masterclass Field Service](../../masterclass/field-service/field-service-mobile-app-dokumente/), und einen Release-Prozess aufzusetzen, der sie abdeckt, gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

Jede App-Version, die eine Pilotgruppe getestet hat, bevor sie auf 100 Geräten landet, erspart einen Vormittag voller Supportanrufe. Wenn Sie eine solche Routine für Ihren Außendienst aufsetzen möchten, [schreiben Sie mir](#contact).
