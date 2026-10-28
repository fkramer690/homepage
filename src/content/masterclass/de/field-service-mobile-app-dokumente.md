---
title: "Field Service App: offline, Formulare und Berichte"
description: "Was Techniker in der Field Service App offline brauchen, wie Prüfprotokolle Papier ersetzen, wann Document Builder reicht und wie Sie App-Updates testen."
lang: de
slug: field-service-mobile-app-dokumente
course: field-service
translationKey: fsl-03
chapter: 3
short: "Mobile App und Dokumente"
summary: "Was Techniker offline brauchen, wie Prüfprotokolle ohne Papier entstehen, wann der Servicebericht reicht und wie Sie jedes App-Update testen."
takeaways:
  - "Die Field Service App ist eine eigene App für Techniker. Jede Field-Service-Org kann dort Lightning Web Components offline nutzen, die Salesforce Mobile App braucht dafür die Lizenz Mobile App Plus."
  - "Briefcase Builder legt fest, welche Datensätze jede Technikergruppe offline hält. Salesforce nennt keine Obergrenze, also schneiden Sie Briefcases nach Rolle zu und testen sie mit einem Partner-Benutzer."
  - "Data-Capture-Formulare entstehen im Flow Builder und funktionieren offline. Voice to Form ist seit App-Version 260.0 allgemein verfügbar, Winter '27 bringt Deutsch, Französisch, Italienisch, Spanisch und Japanisch."
  - "Document Builder deckt den Servicebericht mit Unterschrift und Offline-Erstellung ab, mit 250 Dokumenten pro Nutzer und Monat; Prüfberichte mit Bedingungslogik brauchen meist ein zweites Werkzeug."
  - "Die App hat neben den drei Plattform-Releases eigene Versionen. Beta-Builds kommen einen Monat vor Hauptversionen, so kann eine Pilotgruppe testen, bevor alle Geräte aktualisieren."
articles: [field-service-mobile-offline, field-service-data-capture-forms, field-service-mobile-guided-voice, service-documents-document-builder, document-builder-limits-workarounds, visual-remote-assistant-instead-of-visit, field-service-mobile-release-testing]
faq:
  - q: "Was unterscheidet die Field Service App von der Salesforce Mobile App?"
    a: "Es sind zwei getrennte Apps im App Store und bei Google Play. Die Field Service App ist für Techniker gebaut: Termine, Arbeitsaufträge, Teile, Formulare und Serviceberichte, auch offline. Laut Salesforce Developers kann jede Field-Service-Org dort Lightning Web Components offline nutzen, die Salesforce Mobile App braucht dafür die Lizenz Mobile App Plus."
  - q: "Funktioniert die Salesforce Field Service App ohne Netz?"
    a: "Ja. Eine Grundausstattung für offline ist von Haus aus dabei. Mit Briefcase Builder legt ein Admin fest, welche Datensätze jede Technikergruppe herunterlädt, und Performance Priming synchronisiert die wichtigsten Änderungen alle fünf Minuten, solange Verbindung besteht."
  - q: "Wie viele Serviceberichte sind im Document Builder enthalten?"
    a: "Laut den Field-Service-Limits in der Salesforce-Hilfe bringt jeder Nutzer mit einer Lizenz Field Service Dispatcher oder Field Service Mobile 250 Dokumente pro Monat mit. Für Spitzenmonate erhält die Org einmalig 10.000 zusätzliche Dokumente."
  - q: "Können Techniker Formulare auf Deutsch per Sprache ausfüllen?"
    a: "Voice to Form ist seit der App-Version 260.0 im Frühjahr 2026 allgemein verfügbar. Die Winter-'27-Highlights nennen zusätzlich Spanisch, Japanisch, Italienisch, Französisch und Deutsch. Klären Sie vor dem Pilot den Datenschutz und, wo vorhanden, den Betriebsrat."
  - q: "Wie teste ich eine neue Version der Field Service App?"
    a: "Melden Sie sich für das Beta-Programm der Field Service App an, das Builds einen Monat vor Hauptversionen und eine Woche vor Patches bereitstellt. Führen Sie auf iOS und Android eine feste Routine aus, mit Offline-Einsatz, Formular, Servicebericht und Partner-Benutzer, bevor die Version alle Geräte erreicht."
draft: false
---

Die Field Service App muss dort funktionieren, wo das Netz endet. Die erste Entscheidung ist deshalb, welche Datensätze jede Technikergruppe offline hält. Data-Capture-Formulare aus dem Flow Builder ersetzen Papierprotokolle, Document Builder erzeugt den Servicebericht mit Unterschrift und Fotos. Prüfberichte mit Bedingungslogik brauchen meist ein zweites Werkzeug. Visual Remote Assistant spart Einsätze, wenn der Bediener eine Störung mit Anleitung selbst beheben kann. Die App hat eigene Versionen neben den Plattform-Releases, also braucht jede einen kurzen Test, bevor sie auf die Geräte kommt. Alles baut auf einem Datenmodell auf, das vor dem ersten Formular steht.

## Was leistet die Field Service App?

Field Service, das Salesforce heute als [Field Service and Operations](https://www.salesforce.com/de/products/field-service/pricing/) verkauft, bringt für Techniker eine eigene App mit. [Kapitel 2](../field-service-terminplanung-disposition/) hat gezeigt, wie ein Einsatz eingeplant wird. Dieses Kapitel beginnt dort, wo der Techniker den Einsatz öffnet.

Die Field Service App ist eine eigene App im App Store und bei Google Play. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-mobile/work-from-anywhere) bekommen Techniker darin ihre Einsätze, Kundendaten, Änderungen am Arbeitsauftrag und die Unterschrift des Kunden, ohne im Büro anzurufen. Die Salesforce Mobile App ist die allgemeine App für Vertrieb und Innendienst. Für einen Hersteller zählt vor allem der Unterschied beim Offline-Betrieb: Laut [Salesforce Developers](https://developer.salesforce.com/docs/atlas.en-us.mobile_offline.meta/mobile_offline/intro_enabled_apps.htm) kann jede Field-Service-Org eigene Lightning Web Components in der Field Service App offline nutzen, die Salesforce Mobile App braucht dafür die Lizenz Mobile App Plus. Meine Regel: Techniker arbeiten in der Field Service App, Disposition und Innendienst bleiben im Browser.

## Welche Daten braucht der Techniker offline?

Eine Grundausstattung für offline bringt die App mit. Laut dem [Trailhead-Modul zu Offline-Briefcases](https://trailhead.salesforce.com/content/learn/modules/offline-briefcase/allow-access-to-information-online) legt Briefcase Builder fest, welche Datensätze jede Technikergruppe herunterlädt, und Performance Priming synchronisiert die wichtigsten Änderungen alle fünf Minuten, solange Verbindung besteht. Offline erfasste Änderungen speichert das Gerät und überträgt sie später.

Bei einem Maschinenbauer kommt aufs Gerät, was der Techniker braucht, um die Einsätze des Tages abzuschließen und zu dokumentieren, ohne im Büro anzurufen: Termine für heute und morgen, Arbeitsauftrag mit Positionen, das Asset mit seiner jüngsten Historie, das Fahrzeuglager und das Handbuch zu dieser Maschine. Vollständige Preislisten und alle Assets eines Gebiets bleiben online. Salesforce nennt keine feste Zahl an Datensätzen, die ein Gerät halten kann. Messen Sie deshalb die Synchronisation am Morgen mit Ihrer größten Region, statt mit einer Zahl zu planen.

Die [Hinweise zu LWC Offline](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sfs_gs_lwc_considerations.htm) nennen fünf bekannte Probleme. Drei davon bestimmen den Testplan:

- **Aufgaben werden nicht geladen.** Ein Task-Objekt im Briefcase löst beim Priming einen Fehler aus.
- **Partner-Benutzer.** Ein Benutzer mit Community-Lizenz kann beim Öffnen eines Service-Termins einen Fehler wegen eines fehlenden Datensatzes bekommen. Partnertechniker brauchen deshalb einen eigenen Briefcase und einen eigenen Test.
- **Kaltstart unter iOS.** Geänderte Lightning Web Components lädt die App erst, wenn sie ganz beendet und neu gestartet wurde.

Den Briefcase pro Rolle, die vollständige Liste und einen Tag im Keller ohne Netz beschreibe ich in [Field Service App offline: Welche Daten aufs Gerät?](../../../blog/field-service-app-offline-briefcase/).

## Wie werden aus Papierprotokollen Formulare?

Data Capture ist die Formularfunktion der Field Service App. Laut dem [Trailhead-Überblick](https://trailhead.salesforce.com/content/learn/modules/data-capture-quick-look) baut sie direkt auf dem Flow Builder auf, und Formulare hängen an Service-Terminen, Arbeitsaufträgen und Auftragspositionen. Sie enthalten Unterschrift, Textfelder, Nachschlagefelder und Checkboxen, und Abschnitte können abhängig von früheren Antworten erscheinen. Formulare funktionieren offline, jede Eingabe wird automatisch gespeichert, und jede Übermittlung wird protokolliert.

Das Formular ist schnell gebaut. Länger dauert die Entscheidung davor: Welche Antworten werden Felder am Asset oder am Arbeitsauftrag, und welche bleiben Formularantworten? Betriebsstunden, Messwerte, die Sie über Besuche vergleichen, und das Gesamtergebnis gehören in Felder, denn Wartungspläne, Berichte und die ERP-Schnittstelle arbeiten mit Feldern. Bestanden oder nicht bestanden pro Prüfpunkt kann im Formular bleiben. Verbaute Teile werden als verbrauchte Produkte gebucht, nie als Freitext, sonst sehen Fahrzeuglager und ERP sie nicht. Die vollständige Zuordnungstabelle und wie Sie ein langes Protokoll nach Variante aufteilen, stehen in [Field Service Data Capture: Prüfprotokolle ohne Papier](../../../blog/field-service-data-capture-pruefprotokolle/).

### Voice to Form und geführte Arbeit: Was ist verfügbar?

Der Stand ändert sich mit jeder App-Version, deshalb trenne ich ihn vom Formulardesign:

| Funktion | Stand Oktober 2026 | Quelle |
|---|---|---|
| Voice to Form | allgemein verfügbar seit App-Version 260.0 (Spring '26) | [Release-Beitrag in der Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000j9vu70AA) |
| Voice to Form auf Deutsch, Französisch, Italienisch, Spanisch, Japanisch | Winter '27 | [Winter-'27-Highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) |
| Nachschlagefeld offline, Vorschau mehrerer Bilder, Formulare an Assets und Zeitnachweisen | in 260.0 genannt, Stand in Ihrer Org prüfen | Release-Beitrag 260.0 |
| Guided Experience, Formulare aus dem Foto eines Papierformulars | angekündigt am 20. Oktober 2026, ohne Termin | [Salesforce-Blog](https://www.salesforce.com/blog/guided-mobile-work/) |

Spracheingabe auf Deutsch macht die Funktion für Serviceteams in der DACH-Region interessant. Sie verarbeitet aber die Sprache von Beschäftigten, und damit sind Datenschutz und, wo vorhanden, der Betriebsrat gefragt. Diese Fragen und das Risiko, ein schlechtes Papierformular eins zu eins zu digitalisieren, beschreibe ich in [Salesforce Field Service Mobile: Führung und Sprache](../../../blog/salesforce-field-service-mobile-aussendienst/). Meine Reihenfolge: erst Formular und Felder, dann Sprache als zweiter Schritt.

## Wann reicht der Servicebericht aus dem Document Builder?

Document Builder erzeugt den Servicebericht als PDF aus einem Arbeitsauftrag, einer Auftragsposition oder einem Service-Termin. Laut den [Field-Service-Limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) bringt jeder Nutzer mit einer Lizenz Field Service Dispatcher oder Field Service Mobile 250 Dokumente pro Monat mit, für Spitzenmonate gibt es einmalig 10.000 zusätzliche Dokumente. Ein Techniker mit fünf Einsätzen am Tag erstellt etwa 105 Berichte im Monat, deutlich unter der Grenze.

Für den klassischen Bericht an der Maschine, mit Arbeitszeit, Teilen, Fotos und Unterschrift des Kunden, offline erstellt, ist Document Builder die richtige Wahl. Die Grenzen auf derselben Seite sind für die Planung wichtig:

- **Nur drei Objekte.** Kein Dokument am Asset oder an einem eigenen Objekt.
- **Android hinkt hinterher.** Unter iOS entstehen Dokumente aus Arbeitsauftrag und Service-Termin, unter Android nur aus dem Service-Termin.
- **Umfang.** Höchstens 50 Seiten und 100 MB pro Dokument.

Fünf kleinere Lücken sollten Sie beim Standardbericht einplanen: Vorlagenwahl, Dateiname, E-Mail, Vorbelegung und Gestaltung. Flows und kleine Komponenten schließen sie ohne weitere Lizenz, wie ich in [Document Builder: fünf Grenzen und Workarounds](../../../blog/salesforce-document-builder-grenzen-workarounds/) zeige.

### Wann brauchen Sie ein zweites Werkzeug?

Prüfberichte mit bedingten Abschnitten, Maschinenakten am Asset, Zertifikate und Word-Ausgabe gehen über Document Builder hinaus. Dafür würde ich Salesforce Document Generation oder ein Werkzeug aus dem AppExchange für die Nutzer im Innendienst lizenzieren, die es brauchen, und den Servicebericht im Document Builder lassen. Den Vergleich finden Sie in [Salesforce Service Documents: reicht der Document Builder?](../../../blog/salesforce-service-documents-document-builder-servicebericht/).

Angebote sind ein eigener Fall. Sieht der Techniker Zusatzarbeit oder ein verschlissenes Teil und will der Kunde vor Ort einen Preis, gehört das Angebot in den Vertriebsprozess mit seinen Freigaben. Wie Angebote, Verträge und Aufträge dort laufen, beschreibt das Kapitel [Angebot, Vertrag, Auftrag](../../revenue-cloud/angebot-vertrag-auftrag/) der Masterclass Revenue Cloud.

## Wann ersetzt ein Videoanruf den Einsatz?

Visual Remote Assistant ist ein Videowerkzeug für Service Cloud und Field Service. Laut [Produktseite](https://salesforce.com/products/visual-remote-assistant) tippt der Kunde auf einen Link per SMS oder E-Mail, und ein Video in beide Richtungen öffnet sich im mobilen Browser, ohne App, Login oder Passwort. Sitzungen lassen sich aufzeichnen. Das Add-on kostet laut [Preisliste, Oktober 2026](https://www.salesforce.com/service/field-service-management/pricing/) 50 US-Dollar pro Nutzer und Monat und ist in Agentforce 1 Field Service enthalten. Der Kunde braucht keine Lizenz.

Aus meiner Sicht ersetzt Video einen Einsatz, wenn der Bediener die Störung mit Anleitung selbst beheben kann: ein verstellter Parameter, ein Bedienfehler, ein Reset. Bei mechanischen Reparaturen spart es den zweiten Einsatz, weil der Techniker mit dem richtigen Teil anreist. Klären Sie vor der ersten Sitzung die Einwilligung des Kunden zur Aufzeichnung, den Betriebsrat für Ihre eigenen Beschäftigten und welche Störungen ohne Einsatz abgeschlossen werden dürfen. Wie Sie das Potenzial aus den Störungseinsätzen des letzten Jahres schätzen, steht in [Visual Remote Assistant: Videohilfe statt Einsatz?](../../../blog/visual-remote-assistant-fernhilfe-statt-einsatz/).

## Wie testen Sie jede App-Version?

Neben den drei Plattform-Releases im Jahr hat die App eigene Haupt- und Patch-Versionen. Laut dem [Beta-Programm der Field Service App](https://developer.salesforce.com/tools/field-service-mobile-beta) gibt es Beta-Builds einen Monat vor Hauptversionen und eine Woche vor Patches, und mit Debug-Builds testen Entwickler ihre eigenen Komponenten im Emulator oder Simulator. Laut Release-Beitrag zu 260.0 verteilt Salesforce Versionen über mehrere Tage, manche Nutzer bekommen ein Update erst sieben Tage nach der allgemeinen Verfügbarkeit. Bis zu einer Woche laufen also verschiedene Versionen bei Ihren Technikern.

Meine Routine pro Version, auf iOS und Android, passt in einen halben Tag:

1. Anmeldung und Rückkehr nach einer Stunde im Hintergrund.
2. Priming mit einem echten Technikerprofil, dann ein vollständiger Einsatz im Flugmodus mit verbrauchten Teilen.
3. Ein echtes Data-Capture-Formular, zur Hälfte geschlossen und wieder aufgenommen.
4. Der Servicebericht mit Unterschrift, offline.
5. Eigene Komponenten nach einem Kaltstart.
6. Dasselbe mit einem Partner-Benutzer.
7. Nach der Synchronisation: Verbrauch und Bericht im Innendienst und im ERP.

Pilotgruppe, Kalender und wer für App-Versionen verantwortlich ist, beschreibe ich in [Field Service App Updates: jede Version vorher testen](../../../blog/field-service-app-updates-testen/). App-Versionen gehören in denselben Kalender wie die Plattform-Releases, beschrieben im Kapitel [Release-Planung](../../devops-release-management/release-planung-salesforce-releases/) der DevOps-Masterclass. Wie solche Testskripte in Qualitätsprüfungen passen, steht im Kapitel [Qualität, Tests und Reviews](../../devops-release-management/qualitaet-tests-reviews/).

## Ein typisches Szenario, als Annahme: Das Inbetriebnahmeprotokoll verlässt das Papier

Ein typisches Szenario, als Annahme: Ein Maschinenbauer mit 60 Technikern nimmt Verpackungsmaschinen in drei Varianten in Betrieb. Das Papierprotokoll hat 80 Prüfpunkte. Der Techniker füllt es von Hand aus und scannt es abends ein, der Innendienst tippt die Messwerte ins ERP. Alle Zahlen sind Annahmen, um die Reihenfolge der Entscheidungen zu zeigen.

1. **Wochen 1 und 2, Datenmodell.** Service, Innendienst und ERP-Team markieren jeden Prüfpunkt als Feld, Formularantwort, Folgeposition oder bereits bekannt. Zwölf Fragen fallen weg, weil Seriennummer, Kunde und Maschinentyp schon am Asset stehen.
2. **Woche 3, Briefcase.** Ein Briefcase für eigene Techniker, einer für die zwei Partnerfirmen, beide gefiltert nach Gebiet und Datum.
3. **Wochen 4 bis 7, Formulare.** Drei Formulare: allgemeine Prüfungen am Service-Termin, ein Variantenformular pro Maschinentyp an der Auftragsposition, Abnahme mit Unterschrift. Messwerte wie die Taktzahl landen in Feldern am Asset.
4. **Woche 8, Bericht.** Die Vorlage für den Servicebericht zeigt das Gesamtergebnis aus dem Feld am Arbeitsauftrag. Der ausführliche Prüfbericht mit Variantenlogik bleibt ein eigenes Dokument aus dem Innendienst.
5. **Wochen 9 und 10, Pilot.** Acht Techniker, darunter einer von einem Partner, fahren echte Inbetriebnahmen und die Testroutine auf beiden Plattformen.

Voice to Form wartet, bis Datenschutz und Betriebsrat zugestimmt haben. Nach dem Pilot stehen die Messwerte am Abend des Einsatzes am Asset, und niemand tippt sie noch einmal ab.

## Was entscheiden Sie vor dem ersten Formular?

Vier Entscheidungen brauchen einen Namen, bevor ein Partner Formulare baut:

- **Zieldatenmodell für Servicedaten.** Welche Werte werden Felder an Asset und Arbeitsauftrag, welche Auswahllisten werden geteilt, wie werden Mängel zu Folgearbeit?
- **Briefcase pro Rolle.** Eigener Techniker, Partnertechniker, Teamleiter.
- **Aufteilung der Dokumente.** Servicebericht im Document Builder, Dokumente mit Logik in einem zweiten Werkzeug, Angebote im Vertriebsprozess.
- **Verantwortung für App-Versionen.** Meist der Release Manager, gemeinsam mit dem Gerätemanagement.

Das Datenmodell ist Arbeit an der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/) und entscheidet, ob Formulare, Berichte und später KI-Agenten die Daten nutzen können. [Kapitel 4](../field-service-assets-wartung-teile/) baut darauf auf, mit Assets, Wartungsplänen und Ersatzteilen, und die [Übersicht](../) zeigt alle Kapitel.

Die App des Technikers trägt, wenn das Datenmodell vor dem ersten Formular steht und jede App-Version getestet ist, bevor sie die Geräte erreicht. Wenn Sie einen unabhängigen Blick auf Ihre mobile Lösung und Ihre Dokumente möchten, [schreiben Sie mir](#contact).
