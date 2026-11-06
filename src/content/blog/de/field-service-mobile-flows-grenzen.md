---
title: "Grenzen von Flows in der Field Service Mobile App"
description: "Welche Screen-Flow-Funktionen in der Salesforce Field Service Mobile App weiterhin fehlen, von Data Table bis IN-Operator, und was Data Capture dafür bietet."
pubDate: 2026-11-06
lang: de
slug: field-service-mobile-flows-grenzen
translationKey: field-service-mobile-flow-limits
topic: field-service
categories: [field-service]
tags: [field service, außendienst, mobile, flow, data capture, offline]
takeaways:
  - "Die App führt zwei Flow-Typen aus. Der klassische Field Service Mobile Flow ist weiter stark eingeschränkt, Data Capture hat seit Winter '26 viel nachgeholt."
  - "Keine Data Table auf dem Handy. Für die Auswahl mehrerer Datensätze dokumentiert Salesforce den Lookup und den Repeater mit Datenquelle in Data Capture."
  - "Der klassische Typ kennt kein IN oder NOT IN, keine bedingte Sichtbarkeit, keine Section und nur 25 Formelfunktionen ohne IF, AND oder OR."
  - "Offline liefert NOW() die Zeit der Synchronisation, nicht die Uhrzeit des Geräts. Zeitfelder ohne Datum unterstützt die App gar nicht."
  - "Mit Winter '27 laufen mobile Flows auf einer nativen Laufzeit. Welche Grenzen das aufhebt, sagt Salesforce nicht, also auf dem Gerät testen."
faq:
  - q: "Kann ich in einem Field Service Mobile Flow eine Data Table verwenden?"
    a: "Nein. Salesforce schreibt, dass die Screen-Komponente Data Table nicht mit mobilen Geräten kompatibel ist, und in der Liste der Data-Capture-Komponenten fehlt sie. Für die Auswahl mehrerer Datensätze gibt es in Data Capture die Lookup-Komponente oder einen Repeater mit einer Collection als Datenquelle."
  - q: "Funktioniert der IN-Operator in der Field Service Mobile App?"
    a: "Nicht in Flows vom Typ Field Service Mobile Flow: Salesforce führt In und Not In als nicht unterstützt. Für Data-Capture-Flows schweigt die Dokumentation, testen Sie es also auf dem Gerät, bevor Sie sich darauf verlassen."
  - q: "Was unterscheidet einen Field Service Mobile Flow von einem Data-Capture-Flow?"
    a: "Beide laufen in der Field Service Mobile App. Der Typ Data Capture braucht Lightning Data Service, läuft offline als Formular und unterstützt bedingte Sichtbarkeit, Sections, Repeater, Lookups und rund 50 Formelfunktionen. Der ältere Typ Field Service Mobile Flow kann nichts davon."
  - q: "Verhalten sich mobile Flows nach Winter '27 noch genauso?"
    a: "Nicht unbedingt. Seit Winter '27 laufen Flows in der App auf einer nativen Architektur, verteilt über die Patches 264 bis 264.3, und die Screens sehen aus wie normale Datensatzformulare. Salesforce hat die Liste der Flow-Einschränkungen dafür nicht angepasst, testen Sie also jeden mobilen Flow neu."
draft: false
---

Ein Screen Flow, der am Desktop läuft, scheitert in der Salesforce Field Service Mobile App oft, und woran, hängt vom Flow-Typ ab. Der klassische Typ Field Service Mobile Flow kennt weiterhin keine Data Table, keinen IN- oder NOT-IN-Operator, keine bedingte Sichtbarkeit, keine Section und nur 25 Formelfunktionen ohne IF. Der neuere Data-Capture-Flow hat seit Winter '26 viel nachgeholt: bedingte Sichtbarkeit, Sections, Repeater, einen Lookup für mehrere Datensätze und rund 50 Funktionen. Data Table und Transform fehlen in beiden. Mit Winter '27 laufen mobile Flows auf einer nativen Laufzeit, und Salesforce hat noch nicht gesagt, welche Grenzen damit fallen.

## In der App laufen zwei Flow-Typen, und sie können nicht dasselbe

Wer "mobiler Flow" sagt, meint einen von zwei Prozesstypen im Flow Builder:

- **Field Service Mobile Flow.** Der ältere Typ. Die [Flow-Hinweise für die Mobile App](https://help.salesforce.com/s/articleView?id=service.mfs_flow_considerations.htm&type=5) listen dafür rund 50 Einschränkungen.
- **Data-Capture-Flow.** Der Formulartyp für den Außendienst. Er braucht Lightning Data Service, das Salesforce bis Spring '26 für alle Orgs verpflichtend gemacht hat ([Lightning Data Service für Field Service Mobile](https://help.salesforce.com/s/articleView?id=service.mfs_lightning_data_service.htm&type=5)), und hat eine eigene [Seite mit Einschränkungen](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_limitations.htm&type=5).

In den letzten vier Releases ging fast jede neue Flow-Funktion für die App an Data Capture. Abgesehen von der neuen Laufzeit in Winter '27 habe ich in den Release Notes von Winter '26 bis Winter '27 keine neue Flow-Funktion für den klassischen Typ gefunden. Ein Screen Flow vom Desktop läuft gar nicht: Salesforce schreibt, dass nur Field-Service-Mobile-Flows unterstützt werden. Wie man Data-Capture-Formulare aufbaut, steht in [Field Service Data Capture: Prüfprotokolle ohne Papier](../field-service-data-capture-pruefprotokolle/).

```tabelle
titel: Was in welchem Flow-Typ geht (Hilfeseiten, Stand November 2026)
spalten: Funktion | Field Service Mobile Flow | Data-Capture-Flow *
Data Table | nein | nein
Transform-Element | nein | nein
IN / NOT IN | nein | nicht dokumentiert
Bedingte Sichtbarkeit | nein | ja, nicht mit Collection-Variablen
Section und Spalten | nein | ja, seit Summer '26
Repeater | nicht dokumentiert | ja, bis 30 Zeilen
Formelfunktionen | 25, ohne IF, AND, OR | rund 50, mit IF, CASE, TEXT
Globale Variablen | 3 | 11
fazit: "Nicht dokumentiert" heißt, die Hilfeseiten sagen weder ja noch nein. Transform ist abgeleitet: Salesforce nennt es nur für Screen-, Autolaunched- und Record-Triggered-Flows.
```

## Warum gibt es keine Data Table in der Field Service Mobile App?

Die [Komponente Data Table](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements_screencmp_data_table.htm&type=5) ist nicht mit mobilen Geräten kompatibel, das schreibt Salesforce in der eigenen Referenz. In der [Liste der Data-Capture-Komponenten](https://help.salesforce.com/s/articleView?id=service.mfs_data_capture_reference.htm&type=5) fehlt sie ebenfalls. Der klassische Typ erlaubt außer dem Datei-Upload gar keine Lightning-Komponenten auf Screens, eine eigene Tabellenkomponente scheidet also auch aus.

```praxis
In meinen Field-Service-Projekten schmerzt diese Lücke am meisten. Techniker müssen oft mehrere Datensätze in einem Schritt auswählen, und am Desktop erledigt die Data Table das mit einem Tipp pro Zeile.
```

Für Data-Capture-Flows dokumentiert Salesforce inzwischen zwei Wege, mehrere Datensätze auszuwählen oder abzuarbeiten:

- **Lookup-Komponente (Spring '26).** Der Techniker sucht einen oder mehrere Datensätze, etwa Assets, und wählt sie aus, auch offline. Die Auswahl landet in den Flow-Variablen.
- **Repeater mit Datenquelle (Summer '26).** Eine Collection-Variable füllt die Zeilen vorab, der Techniker prüft oder ändert jede Zeile. Die [Release Notes zu Summer '26](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_data_capture.htm&release=262&type=5) nennen Asset-Prüfungen und Lagerpositionen als Beispiele. Die Grenzen: 30 Zeilen, und eine Zeile kann keine Werte aus einer anderen Zeile verwenden. Prüfungen über mehrere Zeilen erledigt ein Loop nach dem Screen.

Beides ist keine Tabelle mit Checkboxen. Der Lookup passt, wenn der Techniker weiß, wonach er sucht, der Repeater, wenn die Liste schon vor dem Screen feststeht. Im klassischen Typ gibt es keinen guten Ersatz. Collection Choice Sets werden dort nicht unterstützt, und ein Record Choice Set behält nicht einmal den gewählten Wert: Den speichert nur die Eingabekomponente.

## IN, Transform und Formeln: die Logik muss neu gebaut werden

Der klassische Typ lehnt die **Operatoren IN und NOT IN** ab. Der übliche Ersatz ist eine Decision mit einer Bedingung pro Wert, doch eine Decision darf in diesem Typ höchstens neun Bedingungen haben, und Get Records akzeptiert weder OR noch eigene Logik. Bei längeren Wertelisten würde ich mit CONTAINS gegen einen Text prüfen, der die Werte mit Trennzeichen auflistet. Für Data Capture erwähnt die Dokumentation IN gar nicht. Sie schließt nur "contains" für Record-, Datums- und Datum/Uhrzeit-Collections in Decisions aus.

**Transform** taucht auf keiner Mobile-Seite auf. Die [Referenz der Flow-Elemente](https://help.salesforce.com/s/articleView?language=en_US&id=platform.flow_ref_elements.htm&type=5) beschränkt es auf Screen Flows, Autolaunched Flows ohne Trigger und Record-Triggered Flows. Beide mobilen Typen sind eigene Prozesstypen und stehen nicht auf dieser Liste. Ersatz ist ein Loop mit Assignments, und im klassischen Typ sind Zuweisungen an Collections auf Add, Equal und Equals Count beschränkt.

**Formeln** sorgen am häufigsten für Überraschungen. Der klassische Typ kennt 25 Funktionen: kein IF, kein AND oder OR als Funktion, kein TEXT, kein TODAY, kein ISPICKVAL. Logische Operatoren müssen als `&&`, `||` und `==` geschrieben werden. Data Capture unterstützt rund 50, darunter IF, CASE, TEXT, DATEVALUE und REGEX, aber INCLUDES, HOUR, MINUTE und TIMEVALUE fehlen auch dort.

```hinweis tipp
Testen Sie den klassischen Typ auf dem Handy, nicht nur im Debug. Debug und ein Lauf am Desktop verhalten sich wie ein normaler Screen Flow, eine Formel mit AND funktioniert dort also und scheitert erst in der App. Für Data Capture läuft der Debugger seit Winter '26 auf derselben Offline-Engine wie die App.
```

## Datum und Uhrzeit verhalten sich offline anders

Die Eingabe von Datum und Uhrzeit ist nicht das Problem. Data Capture hat eine eigene Komponente Date & Time mit Minimum, Maximum und Standardwert. Der Ärger beginnt drumherum:

- **NOW() offline.** Laut den [Offline-Hinweisen](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_offline_considerations.htm&type=5) liefert NOW() in einem Datum/Uhrzeit-Feld den Zeitpunkt der Synchronisation, nicht die Uhrzeit auf dem Gerät. Einen korrekten Zeitstempel für offline angelegte Datensätze gibt es nur mit der Einstellung "Accurate Record Dates for Offline", die der Salesforce-Support aktiviert.
- **NOW() in Validierungen.** Legen Sie es in eine eigene Formelressource, sonst nutzt der Flow womöglich einen alten Zeitstempel.
- **Uhrzeit ohne Datum.** Den Datentyp Time unterstützt die App überhaupt nicht ([unterstützte Datentypen](https://help.salesforce.com/s/articleView?id=service.mfs_data_types.htm&type=5)). Geplanter Start und geplantes Ende sowie das Ankunftsfenster des Servicetermins sind als Datum/Uhrzeit-Felder ebenfalls ausgenommen.
- **Fehler im Jahr 2026.** Die [mobilen Patch Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_mobile_patch_notes.htm&release=264&type=5) führen Korrekturen auf: 12:00 AM wurde verworfen (Android 260.2), Daten außerhalb des Picker-Bereichs ließen die App abstürzen (Android 262.3), der Picker ignorierte das Zeitintervall (iOS 262.2 und 262.3), und Screen-Felder mit $Flow.CurrentDateTime luden nicht (Android 264.1).

Meldet ein Techniker eine falsche Uhrzeit, prüfen Sie zuerst, ob der Datensatz offline entstanden ist und welche App-Version auf dem Handy lief.

## Was ändert sich mit nativen mobilen Flows in Winter '27?

Seit [Winter '27](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_mobile_native_flows.htm&release=264&type=5) laufen Flows in der App auf einer nativen Architektur: schnelleres Laden, bessere Offline-Fähigkeit, Screens im Design der normalen Datensatzformulare. Die Umstellung kommt schrittweise, je nach Instanz mit Patch 264, 264.1, 264.2 oder 264.3. Die Patch Notes von Juni bis September 2026 zeigen, wie viel sich darunter geändert hat: Record-Collections erscheinen jetzt als Liste, Lookups behalten ihre Auswahl, und leere Textfelder werden nicht mehr als leerer Text gesendet, was eine Decision auf den falschen Pfad schicken konnte.

```hinweis achtung
Salesforce hat die Seite mit den Flow-Einschränkungen für die native Laufzeit nicht angepasst. Dort stehen IN, Sections und bedingte Sichtbarkeit weiter als nicht unterstützt. Ob die native Laufzeit davon etwas für den klassischen Typ aufhebt, ist offen. Sobald ich diese Punkte auf einem Gerät getestet habe, ergänze ich die Ergebnisse hier.
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
  Flows, die Daten erfassen und Sichtbarkeitsregeln, Sections oder Mehrfachauswahl brauchen.
Auf beiden Plattformen testen
  Auf iOS und Android, online und im Flugmodus, mit der Patch-Version Ihrer Nutzer.
```

Welche Datensätze ein Flow offline lesen kann, entscheidet der Briefcase, siehe [Field Service offline: welche Daten aufs Gerät gehören](../field-service-app-offline-briefcase/). Ob ein Flow für einen mobilen Prozess überhaupt das richtige Werkzeug ist, gehört zur [Lösungsarchitektur](../../leistungen/salesforce-architektur/), die ich in Field-Service-Programmen mache.
