---
title: "Grenzen von Flows in der Field Service Mobile App"
description: "Welche Flow-Funktionen die Salesforce Field Service Mobile App nicht unterstützt, was Data Capture verbessert und welche Lücken einen Umbau verlangen."
pubDate: 2026-11-06
lang: de
slug: field-service-mobile-flows-grenzen
translationKey: field-service-mobile-flow-limits
topic: field-service
categories: [field-service]
tags: [field service, außendienst, mobile, flow, data capture, offline]
takeaways:
  - "Die App führt zwei Flow-Typen aus. Der klassische Typ ist weiter stark eingeschränkt, Data Capture bekam seit Winter '26 in jedem Release Neues."
  - "Es gibt keine mobile Data Table und keinen gleichwertigen Ersatz. Der Lookup in Data Capture ist der einzige dokumentierte Weg zur Mehrfachauswahl."
  - "Der klassische Typ kennt kein IN oder NOT IN, keine bedingte Sichtbarkeit und keine Section. IF(), AND() und OR() fehlen, && und || gehen."
  - "Data-Capture-Formulare lassen sich offline ausfüllen, Datensätze ändern sie aber erst, wenn das Gerät wieder online ist."
  - "Mit Winter '27 laufen mobile Flows auf einer nativen Laufzeit. Dass dadurch eine dokumentierte Grenze fällt, sagt Salesforce nicht: jeden Flow am Gerät testen."
faq:
  - q: "Kann ich in einem Field Service Mobile Flow eine Data Table verwenden?"
    a: "Nein. Salesforce schreibt, dass die Screen-Komponente Data Table nicht mit mobilen Geräten kompatibel ist, und in der Liste der Data-Capture-Komponenten fehlt sie. Mit dem Lookup in Data Capture wählt ein Techniker einen oder mehrere Datensätze; für eine Tabelle mit Checkbox pro Zeile gibt es keinen Standardersatz."
  - q: "Funktioniert der IN-Operator in der Field Service Mobile App?"
    a: "Gehen Sie davon aus, dass nicht. Die Flow-Hinweise für die Mobile App führen In und Not In als nicht unterstützt, ohne Ausnahme für Data Capture, und die Data-Capture-Seite erwähnt sie nicht. Bilden Sie die Prüfung mit einzelnen Bedingungen ab oder verlagern Sie die Logik ins Backend."
  - q: "Was unterscheidet einen Field Service Mobile Flow von einem Data-Capture-Flow?"
    a: "Beide laufen in der Field Service Mobile App. Data Capture braucht Lightning Data Service und unterstützt bedingte Sichtbarkeit, Sections, Repeater, Lookups und 50 Formelfunktionen, dem älteren Typ Field Service Mobile Flow fehlen diese Screen-Funktionen, und er kennt nur 25 Formelfunktionen. In Data Capture laufen Anlegen, Ändern und Löschen erst, wenn das Gerät online ist."
  - q: "Verhalten sich mobile Flows nach Winter '27 noch genauso?"
    a: "Nicht unbedingt. Seit Winter '27 laufen Flows in der App auf einer nativen Architektur, verteilt über die Patches 264 bis 264.3, und die Screens sehen aus wie normale Datensatzformulare. Die Seite mit den Einschränkungen listet weiter die alten Grenzen, testen Sie also jeden mobilen Flow neu."
draft: false
---

Die Salesforce Field Service Mobile App führt zwei Flow-Typen aus, und für neue Formulare im Außendienst ist Data Capture meist die bessere Wahl: bedingte Sichtbarkeit, Sections, Repeater, ein Lookup für mehrere Datensätze, und die Formulare lassen sich offline ausfüllen. Keiner der beiden Typen hat eine Data Table, um Datensätze aus einer Liste zu wählen, und keiner unterstützt den IN-Operator. Offline sammelt Data Capture die Antworten, legt Datensätze aber erst an oder ändert sie, wenn das Gerät wieder online ist. Dem klassischen Field Service Mobile Flow fehlt das meiste davon. Mit Winter '27 laufen beide auf einer neuen nativen Laufzeit, jeder bestehende mobile Flow braucht also einen neuen Test am Gerät.

## In der App laufen zwei Flow-Typen, und sie können nicht dasselbe

Wer "mobiler Flow" sagt, meint einen von zwei Prozesstypen im Flow Builder:

- **Field Service Mobile Flow.** Der ältere Typ. Die [Flow-Hinweise für die Mobile App](https://help.salesforce.com/s/articleView?id=service.mfs_flow_considerations.htm&type=5) listen seine Einschränkungen.
- **Data-Capture-Flow.** Der Formulartyp für den Außendienst. Er braucht Lightning Data Service, das Salesforce bis Spring '26 für alle Orgs verpflichtend gemacht hat ([Lightning Data Service für Field Service Mobile](https://help.salesforce.com/s/articleView?id=service.mfs_lightning_data_service.htm&type=5)), und hat eine eigene [Seite mit Einschränkungen](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_limitations.htm&type=5).

In den Release Notes zu Data Capture von Winter '26 bis Summer '26 habe ich in jedem Release eine neue Flow-Funktion gezählt. Für den klassischen Typ habe ich im selben Zeitraum keine gefunden (Stand November 2026). Der normale Prozesstyp Screen Flow wird in der App nicht unterstützt, nur diese beiden. Wie man Data-Capture-Formulare aufbaut, steht in [Field Service Data Capture: Prüfprotokolle ohne Papier](../field-service-data-capture-pruefprotokolle/).

```tabelle
titel: Was in welchem Flow-Typ geht (Hilfeseiten, Stand November 2026)
spalten: Funktion | Field Service Mobile Flow | Data-Capture-Flow *
Data Table | nein | nein
IN / NOT IN | nein | nein, gilt für die ganze App
Transform-Element | nicht genannt | nicht genannt
Bedingte Sichtbarkeit | nein | ja, nicht mit Collection-Variablen
Section und Spalten | nein | ja, seit Summer '26
Lookup für mehrere Datensätze | nein | ja, seit Spring '26
Formelfunktionen | 25, ohne IF(), AND(), OR() | 50, mit IF(), CASE(), TEXT()
Globale Variablen | 3 | 11
fazit: "Nicht genannt": Die Transform-Referenz nennt nur Screen-, Autolaunched- und Record-Triggered-Flows. Dass es in beiden mobilen Typen fehlt, ist meine Schlussfolgerung aus dieser Liste.
```

"Läuft offline" hat drei Ebenen, die leicht durcheinandergeraten. Der Techniker kann ein Data-Capture-Formular ohne Verbindung öffnen und ausfüllen. Das Formular kann nur die Datensätze lesen, die im Briefcase des Technikers liegen. Und Anlegen, Ändern und Löschen müssen am Ende des Flows stehen und warten, bis das Gerät online ist, und das nur für Objekte, die die User Interface API unterstützt. Für einen Prozess, der vor Ort einen neuen Datensatz braucht, wiegt dieser letzte Punkt schwerer als eine fehlende Formelfunktion.

## Warum gibt es keine Data Table in der Field Service Mobile App?

Die [Komponente Data Table](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements_screencmp_data_table.htm&type=5) ist nicht mit mobilen Geräten kompatibel, das schreibt Salesforce in der eigenen Referenz. In der [Liste der Data-Capture-Komponenten](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_reference.htm&type=5) fehlt sie ebenfalls. Der klassische Typ erlaubt außer dem Datei-Upload gar keine Lightning-Komponenten auf Screens, und Data Capture unterstützt ebenfalls keine eigenen Lightning Web Components. Eine selbst gebaute Tabelle scheidet also in beiden Typen aus.

```praxis
In meinen Field-Service-Projekten schmerzt diese Lücke am meisten. Techniker müssen oft mehrere Datensätze in einem Schritt auswählen, und am Desktop erledigt die Data Table das mit einem Tipp pro Zeile.
```

Einen gleichwertigen Ersatz gibt es nicht. Was Salesforce für Data Capture dokumentiert:

- **Lookup-Komponente (Spring '26).** Der Techniker sucht einen oder mehrere Datensätze, etwa Assets, und wählt sie aus, auch offline. Das ist die einzige dokumentierte Mehrfachauswahl. Sie passt, wenn der Techniker weiß, wonach er sucht. Eine vorbereitete Liste zum Abhaken zeigt sie nicht.
- **Repeater mit Datenquelle (Summer '26).** Eine Collection füllt die Zeilen vorab, der Techniker prüft oder ändert jede Zeile. Der Repeater ist dafür gedacht, Daten zu mehreren Positionen zu erfassen, nicht dafür, sie auszuwählen. Eine Auswahl lässt sich mit einer Checkbox pro Zeile nachbauen und nach dem Screen auswerten, bis 30 Zeilen.

Rechenbeispiel: Bei der Jahreswartung einer Verpackungslinie muss der Techniker markieren, welche von acht Baugruppen er geprüft hat und welche einen Folgeauftrag brauchen. Am Desktop ist das eine Data Table mit acht Checkboxen. In Data Capture werden daraus entweder acht Lookup-Suchen oder ein Repeater mit acht vorbefüllten Zeilen und je einer Checkbox, dazu ein Loop nach dem Screen, der die angehakten Zeilen einsammelt.

Im klassischen Typ gibt es beides nicht. Collection Choice Sets werden dort nicht unterstützt, und ein Record Choice Set behält nicht einmal den gewählten Wert: Den speichert nur die Eingabekomponente.

## IN, Transform und Formeln: die Logik muss neu gebaut werden

Die Flow-Hinweise für die Mobile App führen die **Operatoren IN und NOT IN** als nicht unterstützt in der Field Service Mobile App. Dieselbe Seite nennt Data Capture als Ausnahme bei der bedingten Sichtbarkeit, aber nicht bei IN, und die Data-Capture-Seite erwähnt IN gar nicht. Ich behandle es deshalb in beiden Typen als nicht unterstützt. Eine lange Werteliste in einer Decision ist ein Zeichen, dass die Logik ins Backend gehört oder in ein Feld, das vor dem Start des Flows gesetzt wird.

**Transform** taucht auf keiner Mobile-Seite auf, und die [Referenz der Flow-Elemente](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements.htm&type=5) nennt dafür nur Screen-, Autolaunched- und Record-Triggered-Flows. Ersatz ist ein Loop mit Assignments.

**Formeln** sorgen am häufigsten für Überraschungen. Der klassische Typ kennt 25 Funktionen. IF(), AND(), OR(), TEXT(), TODAY() und ISPICKVAL() gehören nicht dazu; logische Verknüpfungen gehen nur mit Operatoren. Data Capture listet 50 Funktionen, darunter IF(), CASE(), TEXT(), DATEVALUE() und REGEX(), aber INCLUDES(), HOUR() und MINUTE() fehlen auch dort.

```vertiefung Für Entwickler
titel: Regeln für den klassischen Typ, die erst auf dem Handy auffallen
- Logische Operatoren müssen als `&&`, `||`, `==` und `!=` geschrieben werden; `AND`, `OR`, `=` und `<>` scheitern in der App.
- Eine Decision darf höchstens neun Bedingungen haben; Get Records akzeptiert weder OR noch eigene Logik.
- Zuweisungen an Collections sind auf Add, Equal und Equals Count beschränkt.
- Wer IN durch CONTAINS auf eine Werteliste ersetzt, setzt das Trennzeichen um die Liste und um den Suchwert, etwa `;A1;A10;` und `;A1;`, sonst trifft A1 auch A10.
- Debug und ein Lauf am Desktop verhalten sich wie ein normaler Screen Flow, eine Formel mit AND funktioniert dort also und scheitert erst in der App. Für Data Capture läuft der Debugger seit Winter '26 auf derselben Offline-Engine wie die App.
```

```hinweis achtung
"Is Required" und die Reihenfolge mehrerer Formulare werden nicht erzwungen. Laut einem [Salesforce-Wissensartikel vom 15. September 2026](https://help.salesforce.com/s/articleView?id=005459773&language=en_US&type=1) kann ein Techniker ein Data-Capture-Formular mit leerer Pflichtfrage absenden und Formulare in beliebiger Reihenfolge ausfüllen. Salesforce empfiehlt eine Prüfung am Arbeitsauftrag oder Servicetermin, die den Status Abgeschlossen sperrt, bis die Formularergebnisse vorliegen.
```

Bei Prüf- und Abnahmeprotokollen ist das die Grenze, die ich als erste mit der Serviceleitung besprechen würde, weil sie entscheidet, ob das Ausfüllen erzwungen oder nur auf dem Screen erbeten wird. Ob ein Formular als Nachweis gegenüber Kunde oder Behörde reicht, ist eine eigene Frage.

## Datum und Uhrzeit verhalten sich offline anders

Die Eingabe von Datum und Uhrzeit ist nicht das Problem. Data Capture hat eine eigene Komponente Date & Time mit Minimum, Maximum und Standardwert. Der Ärger beginnt drumherum, und es hilft, vier Zeitpunkte zu trennen: wann die Arbeit stattfand, wann eine Formel ausgewertet wurde, wann der Datensatz synchronisiert wurde und die Audit-Felder des Datensatzes.

- **NOW() offline.** Laut den [Offline-Hinweisen](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_offline_considerations.htm&type=5) liefert NOW() in einem Datum/Uhrzeit-Feld den Zeitpunkt, zu dem der Datensatz mit dem Server synchronisiert wurde, nicht die Uhrzeit auf dem Gerät.
- **Audit-Felder.** Erstell- und Änderungsdatum offline geänderter Datensätze stimmen nur mit der Einstellung "Accurate Record Dates for Offline", die der Salesforce-Support aktiviert. Einen fachlichen Zeitstempel aus NOW() korrigiert sie nicht.
- **Uhrzeit ohne Datum.** Den Datentyp Time unterstützt die App überhaupt nicht ([unterstützte Datentypen](https://help.salesforce.com/s/articleView?id=service.mfs_data_types.htm&type=5)). Geplanter Start und geplantes Ende sowie das Ankunftsfenster des Servicetermins sind als Datum/Uhrzeit-Felder ebenfalls ausgenommen.
- **Fehler im Jahr 2026.** Die [mobilen Patch Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_mobile_patch_notes.htm&release=264&type=5) führen Korrekturen auf: 12:00 AM wurde verworfen (Android 260.2), der Picker ignorierte das Zeitintervall (iOS 262.3), und Screen-Felder mit $Flow.CurrentDateTime luden nicht (Android 264.1).

Wenn der Zeitpunkt der Arbeit zählt, erfassen Sie ihn in einem eigenen Feld und legen Sie fest, ob der Techniker ihn eingeben darf, das Gerät ihn setzt oder der Server ihn vergibt. Diese Wahl testen Sie dann online und offline.

## Was ändert sich mit nativen mobilen Flows in Winter '27?

Seit [Winter '27](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_mobile_native_flows.htm&release=264&type=5) laufen Flows in der App auf einer nativen Architektur: schnelleres Laden, bessere Offline-Fähigkeit, Screens im Design der normalen Datensatzformulare. Die Umstellung kommt schrittweise, je nach Instanz mit Patch 264, 264.1, 264.2 oder 264.3. Die Patch Notes von Juni bis September 2026 zeigen, wie viel sich darunter bewegt hat. Allein die Patches 262.2 und 262.3 haben auf iOS und Android mehrere Fehler bei der Übergabe leerer und Null-Werte behoben, von denen einige eine Decision auf den falschen Pfad schickten.

```hinweis achtung
Die aktuelle Seite mit den Einschränkungen listet IN, Sections und bedingte Sichtbarkeit weiter als Grenzen, und die Release Note zur nativen Laufzeit sagt nicht, dass eine davon wegfällt. Gehen Sie nicht davon aus, dass die native Laufzeit davon etwas aufhebt. Sobald ich diese Punkte auf einem Gerät getestet habe, ergänze ich die Ergebnisse hier.
```

Bis dahin behandle ich jeden mobilen Flow nach der Umstellung als ungetestet. Wie man App-Versionen testet, bevor sie alle Techniker erreichen, steht in [Field Service App-Updates testen](../field-service-app-updates-testen/).

## Erster Schritt: mobile Flows nach Typ sortieren und die Lücken am Handy testen

Listen Sie jeden Flow auf, den Techniker in der App starten, und notieren Sie den Prozesstyp. Dann gehen Sie so vor:

```schritte
Flows auflisten
  Flow-Name, Prozesstyp, aus welchem Objekt er startet und ob er offline laufen muss.
Mit der Tabelle abgleichen
  Jedes Element, jeden Operator und jede Formelfunktion markieren, die die Hilfeseiten ausschließen.
Formulare zu Data Capture
  Flows, die Daten erfassen und Sichtbarkeitsregeln, Sections oder einen Lookup für mehrere Datensätze brauchen.
Auf beiden Plattformen testen
  Auf iOS und Android, online und im Flugmodus, mit der Patch-Version Ihrer Nutzer.
```

Welche Datensätze ein Flow offline lesen kann, entscheidet der Briefcase, siehe [Field Service offline: welche Daten aufs Gerät gehören](../field-service-app-offline-briefcase/). In Field-Service-Programmen entscheide ich mit dem Team, welcher mobile Prozess in Data Capture, in einen mobilen Flow, in eine normale Datensatzbearbeitung oder ins Backend gehört; das ist Teil meiner Arbeit an der [Lösungsarchitektur](../../leistungen/salesforce-architektur/).
