---
title: "Wartung nach Betriebsstunden im Field Service einrichten"
description: "Wartung in Salesforce Field Service nach Betriebsstunden oder Zählern auslösen: Nutzungs- und Kriterienregeln, Herkunft des Zählers und welche Limits gelten."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-wartung-nach-betriebsstunden
translationKey: field-service-usage-based-maintenance
topic: field-service
categories: [field-service]
tags: [Field Service, Wartungspläne, Betriebsstunden, Assets, IoT, ERP]
takeaways:
  - "Nutzung ist ein Regeltyp in den Recordset Filter Criteria einer kriterienbasierten Regel und wird nur an Wartungs-Assets gesetzt."
  - "Eine kriterienbasierte Regel erzeugt keinen neuen Auftrag, solange der von ihr erzeugte offen ist. Andere Regeln am selben Asset können es trotzdem."
  - "Es gelten folgende Limits: 2.600 Arbeitsaufträge pro Lauf, 2.000 Assets bei RRULE mit COUNT. Salesforce empfiehlt höchstens fünf Regeln pro Plan oder Asset."
  - "In meinem Zielbild stammt der Zähler aus ERP oder IoT-Plattform. Rohdaten der Sensoren bleiben in der IoT-Plattform oder im Historian."
faq:
  - q: "Kann Salesforce Field Service Wartung nach Betriebsstunden planen?"
    a: "Ja. Eine Maintenance Work Rule vom Typ kriterienbasiert verweist auf Recordset Filter Criteria, die Nutzungsregeln wie einen Usage Counter für Betriebsstunden oder allgemeine Bedingungen auf Asset-Feldern enthalten können. Ist die Schwelle erreicht, entsteht ein Arbeitsauftrag."
  - q: "Wie richte ich 2.000 Stunden oder 12 Monate ein, je nachdem, was zuerst eintritt?"
    a: "Entweder kombinieren Sie eine Usage-Counter- und eine Usage-Duration-Regel mit ODER in denselben Recordset Filter Criteria, oder Sie nutzen zwei Bedingungen auf benutzerdefinierten Feldern, verknüpft mit ODER: Stunden seit der letzten Wartung ab 2.000, Monate seit der letzten Wartung ab 12. Die Salesforce-Hilfe beschreibt das zweite Muster anhand von Aktivierungen oder Monaten seit der letzten Überholung."
  - q: "Welche Felder können Recordset Filter Criteria nicht nutzen?"
    a: "Laut Salesforce-Hilfe werden Felder vom Typ URL, Mehrfachauswahlliste, verschlüsselte Felder und Textbereichsfelder nicht unterstützt; Währungsfelder können nicht als Filterkriterien verwendet werden. Zähler gehören in Zahlenfelder."
  - q: "Brauche ich IoT für Wartung nach Betriebsstunden?"
    a: "Nein. Den Zählerstand kann der Techniker erfassen, das ERP übermitteln oder eine IoT-Plattform schreiben. Wie oft der Wert aktualisiert werden muss, hängt davon ab, wie weit eine Maschine die Schwelle überschreiten darf: höchste Nutzungsrate mal Verzögerung, bis der Arbeitsauftrag existiert."
draft: false
---

In Salesforce Field Service lösen Sie Wartung nach Betriebsstunden mit einer kriterienbasierten Maintenance Work Rule aus, die einen Zähler am Asset liest statt eines Kalenderdatums. Ihre Recordset Filter Criteria enthalten entweder Nutzungsregeln, etwa einen Usage Counter mit einer Frequenz von 2.000 Stunden, oder allgemeine Bedingungen wie „Stunden seit letzter Wartung ab 2.000“. Sind sie erfüllt, erzeugt die Regel einen Arbeitsauftrag. In meinem Zielbild stammt der Zähler aus dem ERP oder der IoT-Plattform, und Rohdaten der Sensoren bleiben außerhalb von Salesforce.

## Kalender, Nutzung oder Kriterien: Welcher Auslöser passt?

Die meisten Wartungspläne beginnen mit dem Kalender: Inspektion alle sechs Monate. Für Maschinen, die bei einem Kunden einschichtig und bei einem anderen dreischichtig betrieben werden, ist das in zweierlei Hinsicht unpassend. Der Wenignutzer erhält Einsätze, die er nicht braucht, der Vielnutzer wartet zu lange.

Agentforce Field Service and Operations, meist noch Salesforce Field Service genannt, kennt zwei Typen von Maintenance Work Rules, kalenderbasiert und kriterienbasiert, beschrieben auf der Hilfeseite zur [vorbeugenden Wartung](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5). Nutzung ist kein dritter Typ, sondern ein Regeltyp in den Recordset Filter Criteria, die eine kriterienbasierte Regel nutzt:

| Auslöser | Eingerichtet als | Typischer Einsatz |
|---|---|---|
| Kalender | Regeltyp kalenderbasiert, Intervall in Tagen, Wochen, Monaten | Gesetzliche Prüfungen, feste Vertragstermine |
| Nutzung | Kriterienbasierte Regel mit Nutzungsregeln (Usage Counter, Usage Duration) | Betriebsstunden, Zyklen, Hübe |
| Allgemeine Kriterien | Kriterienbasierte Regel mit Bedingungen auf Asset-Feldern | Schwellen, kombinierte Bedingungen, „was zuerst eintritt“ |

Recordset Filter Criteria sind gespeicherte Bedingungen auf Asset-Feldern, etwa „Betriebsstunden seit letzter Wartung größer oder gleich 2.000“. Die Grundlagen zu Wartungsplänen, Serviceverträgen und Entitlements stehen in [Field Service: Wie bildet man Wartungsverträge ab?](../salesforce-field-service-wartungsvertraege/).

## Wie funktioniert eine nutzungsbasierte Regel?

Laut Hilfeartikel zur [nutzungsbasierten Wartung](https://help.salesforce.com/s/articleView?id=sf.fs_create_usage_based_rfc.htm&language=en_US&type=5) wählen Sie in den Recordset Filter Criteria den Regeltyp Usage und verknüpfen die Recordset Filter Criteria mit einer kriterienbasierten Regel. Nutzungsregeln lassen sich nur an Wartungs-Assets hinzufügen, sie gelten also für jedes einzelne Wartungs-Asset und nicht zentral für den Plan. Eine Usage-Counter-Regel liest einen Zähler wie die Betriebsstunden, mit Frequenz, erstem Auftreten und Nutzungsrate; eine Usage-Duration-Regel zählt vergangene Zeit. Das Nutzungsfeld darf eine Formel sein, das Feld für das nächste Auftreten nicht, weil das System es aktualisiert.

Zwei Planungsarten bestimmen, wie der nächste Fälligkeitspunkt fortgeschrieben wird. Beim festen Plan werden Arbeitsaufträge in festen Intervallen des Gesamtzählerstands fällig; eine verspätete 5.000-Stunden-Wartung verschiebt die 10.000-Stunden-Wartung nicht. Beim gleitenden Plan ist der nächste Fälligkeitspunkt der Stand bei Abschluss plus Frequenz, und diese Neuberechnung erfolgt nur, wenn der Status des Arbeitsauftrags der Kategorie Closed oder Completed zugeordnet ist. Vorlaufzeit und Nutzungsrate ergeben ein vorgeschlagenes Wartungsdatum vor Erreichen der Schwelle. Ich teste beide Arten in einer Sandbox mit einigen echten Zählerständen, bevor der erste Plan produktiv genutzt wird.

```hinweis achtung
Eine Falle ist die Kombination von Regeln. Laut Hilfeartikel zur [kriterienbasierten Wartung](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5) erzeugen eine Kriterienregel und eine Kalenderregel ihre Arbeitsaufträge unabhängig voneinander, auch mit demselben vorgeschlagenen Datum. Wer neben die Stundenregel eine Kalenderregel „alle 12 Monate“ legt, erhält womöglich zwei Arbeitsaufträge für denselben Kompressor in derselben Woche. „Was zuerst eintritt“ sollte in einer einzigen Regel abgebildet werden: entweder Usage Counter und Usage Duration mit ODER, wobei das frühere Datum maßgeblich ist, oder allgemeine Bedingungen mit ODER.
```

## Eine kriterienbasierte Regel wartet, solange ihr Auftrag offen ist

Für allgemeine Kriterien legen Sie Recordset Filter Criteria mit Bedingungen auf Standard- oder benutzerdefinierten Asset-Feldern an, wählen, ob alle Bedingungen oder mindestens eine Bedingung zutreffen müssen, und verknüpfen sie mit einer Maintenance Work Rule vom Typ kriterienbasiert. Das Beispiel der Hilfe kombiniert 60.000 Aktivierungen oder sechs Monate seit der letzten Überholung mit ODER. Genau dieses Muster „was zuerst eintritt“ nehmen Maschinenbauer in ihre Serviceverträge auf.

Drei Regeln aus der Hilfe bestimmen das Design:

- **Ein offener Arbeitsauftrag pro Regel.** Solange der Arbeitsauftrag dieser Regel nicht abgeschlossen ist, erzeugt sie keinen neuen Arbeitsauftrag; andere, unabhängige Regeln am Asset können trotzdem Arbeitsaufträge erzeugen. Als abgeschlossen gelten Cannot Complete, Canceled, Completed und Closed.
- **Die Bedingung muss zurückgesetzt werden.** Trifft die Bedingung nach dem Abschluss noch zu, erzeugt der nächste Lauf den nächsten Arbeitsauftrag. Das Beispiel der Hilfe: Die kumulierte Stillstandszeit steigt von 982 auf 1.024 Stunden, ein Arbeitsauftrag entsteht, und weil der Wert über 1.000 bleibt, folgt der nächste. Vergleichen Sie deshalb mit „Stunden seit letzter Wartung“ und speichern Sie den Zählerstand, wenn die Wartung tatsächlich durchgeführt wurde. Die Hilfe schlägt dasselbe vor: ein benutzerdefiniertes Feld aktualisieren, wenn Arbeitsaufträge abgeschlossen werden. Der Flow sollte nur auf einen Status reagieren, der „Arbeit erledigt“ bedeutet, etwa Completed, nicht auf Canceled oder Cannot Complete, die zwar die Erzeugung freigeben, aber nicht für eine durchgeführte Wartung stehen.
- **Feldtypen.** Felder vom Typ URL, Mehrfachauswahlliste, verschlüsselte Felder und Textbereichsfelder werden nicht unterstützt; Währungsfelder können nicht als Filterkriterien verwendet werden. Zähler gehören in Zahlenfelder.

Die Hilfe nennt außerdem Asset-Attribute als Möglichkeit, Werte wie Aktivierungen seit der letzten Überholung zu führen. Das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm) gibt es seit API-Version 53.0; für nutzungsbasierte Wartung empfiehlt Salesforce höchstens 10 Attribute pro Asset, und Offline-Briefcases enthalten sie nicht. Wann ich Attribute und wann Felder nutze, beschreibe ich in [Asset-Hierarchie im Field Service: Wie tief pro Maschine?](../field-service-asset-hierarchie-maschinen/).

Ein Detail bei den Berechtigungen: Salesforce verlangt für Maintenance Work Rule und Recordset Filter Criteria passende Vollzugriffsrechte und Freigaberegeln, sonst greifen die Regeln für manche Nutzer nicht.

## Woher kommt der Zähler?

Die Hilfe nennt drei Quellen: von Hand gepflegt, von einer IoT-Plattform aktualisiert oder über eine Integration aus AppExchange. Beim Maschinenbauer heißt das meist:

- **Die IoT-Plattform** schreibt die Betriebsstunden der vernetzten Maschinen, etwa einmal am Tag.
- **Das ERP**, zum Beispiel SAP, übermittelt Zählerstände, die es ohnehin vom Kunden oder aus Serviceberichten erhält.
- **Der Techniker** liest den Zähler vor Ort ab und trägt ihn in der mobilen App ein. Für nicht vernetzte Maschinen ist das meist die einzige Quelle.

Wie oft der Wert aktualisiert werden muss, folgt aus der zulässigen Überschreitung: höchste Nutzungsrate mal Verzögerung, bis der Arbeitsauftrag existiert. Bei einer Maschine mit 24 Stunden am Tag, täglichem Update und täglichem Generierungslauf kann der Zähler die Schwelle um etwa zwei Tage überschreiten; für ein 2.000-Stunden-Intervall passt das, für eine Sicherheitsprüfung nicht. 800 tägliche Updates der vernetzten Anlagen sind meist gut zu bewältigen, trotzdem braucht die Schnittstelle Wiederholungen, Massenverarbeitung und einen Blick auf Automationen, die bei jedem Update ausgelöst werden. In meinem Zielbild bleiben die Zeitreihen in der IoT-Plattform oder im Historian, wie in [Predictive Maintenance in Salesforce: die Datenbasis](../predictive-maintenance-salesforce-datenbasis/) beschrieben. Legen Sie fest, welche Quelle maßgeblich ist, wenn sich zwei Quellen widersprechen, etwa wenn der Techniker 2.140 Stunden abliest und das ERP noch 1.980 zeigt. Wie bei allen Stammdaten ist pro Feld ein führendes System erforderlich, siehe [welche Daten die Terminplanung braucht](../salesforce-field-service-stammdaten/). Die Schnittstelle selbst gehört auf die Liste der [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Die Limits: 2.600 Arbeitsaufträge pro Generierungslauf

Die [Limits von Field Service](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5), die für nutzungsbasierte Pläne zuerst relevant werden:

```kennzahlen
2.600 | Arbeitsaufträge pro Wartungsplan und Generierungslauf; bei einer Position pro Asset gilt die Grenze für die Positionen
2.000 | Wartungs-Assets, höchstens in einem Plan, dessen Kalenderregel mit RRULE COUNT endet
5 | Maintenance Work Rules pro Plan oder Asset, empfohlen von Salesforce (technisches Maximum 25.000 pro Plan)
365 Tage | Generation Horizon, höchstens
quelle: Salesforce-Hilfe, Field Service Limits
```

Als praktische Grenze nennt die Hilfe 2.600 Assets pro Plan, weniger als 1.300 bei zwei Regeln pro Asset und weniger als 650 bei vier. Diese Vereinfachung setzt einen Arbeitsauftrag pro Regel und Lauf voraus; ein kurzes Wiederholungsintervall über einen langen Generation Timeframe, der bis zu 20 Jahre betragen kann, erreicht 2.600 Datensätze viel früher. Die COUNT-Grenze betrifft Kalenderregeln wie „monatlich, 24 Mal“, nicht Betriebsstundenzähler.

In der Praxis teile ich Pläne nach Baureihe oder Serviceregion. So hat jeder Plan einen Verantwortlichen, und die Generierungsläufe bleiben überschaubar.

## Rechenbeispiel: 1.200 Kompressoren

Die Zahlen sind Annahmen. Ein Hersteller von Kompressoren betreut 1.200 Anlagen im Feld im Rahmen von Serviceverträgen. Im Vertrag steht: Wartung alle 2.000 Betriebsstunden oder alle 12 Monate, je nachdem, was zuerst eintritt. 800 Anlagen sind vernetzt, 400 nicht.

**Daten.** Jedes Asset erhält ein Zahlenfeld für die Betriebsstunden, ein Feld für den Stand bei der letzten Wartung und das Datum der letzten Wartung. Eine Formel berechnet die Stunden seit der letzten Wartung, eine zweite die Monate. Die IoT-Plattform schreibt jede Nacht die Stunden der vernetzten Anlagen. Bei den übrigen 400 tragen Techniker den Stand bei jedem Einsatz ein; dort greift die 12-Monats-Bedingung.

**Regel.** Eine kriterienbasierte Regel mit zwei allgemeinen Bedingungen, verknüpft mit ODER. Anstelle des nativen Usage Counter habe ich hier eigene Felder gewählt, weil die 400 nicht vernetzten Anlagen keine verlässliche Nutzungsrate haben und für alle dieselbe Rücksetzlogik gelten soll. Ein Flow schreibt Zählerstand und Datum auf das Asset, wenn der Arbeitsauftrag den Status Completed erreicht, und setzt damit beide Bedingungen zurück; Canceled und Cannot Complete tun das nicht.

**Pläne.** Drei Pläne nach Region mit je etwa 400 Assets, damit jede regionale Serviceleitung einen Plan verantwortet.

**Wirkung.** Angenommen, die Hälfte der vernetzten Anlagen läuft zweischichtig mit etwa 4.000 Stunden im Jahr: Sie erhalten zwei Wartungen im Jahr statt einer. Einschichtige Anlagen mit 1.800 Stunden im Jahr werden über die 12-Monats-Bedingung fällig. Verglichen mit einem festen Halbjahresrhythmus für alle 1.200 Anlagen sind das 1.600 statt 2.400 Einsätze im Jahr, und die stark genutzten Kompressoren werden trotzdem rechtzeitig gewartet.

## Erster Schritt: eine Baureihe mit zehn Assets in der Sandbox

Nehmen Sie eine Baureihe und schreiben Sie das Intervall aus dem Vertrag in einem Satz auf. Prüfen Sie, wo der Zählerstand heute gepflegt wird und wie oft er aktualisiert wird. Dann richten Sie Felder, eine kriterienbasierte Regel und den Flow zum Zurücksetzen in einer Sandbox ein und testen mit zehn echten Assets, bevor Sie die ganze Baureihe umstellen. Das [Masterclass-Kapitel zu Assets, Wartung und Teilen](../../masterclass/field-service/field-service-assets-wartung-teile/) zeigt, wie dieses Thema in den Kontext von Verträgen, Ersatzteilen und Servicepartnern einzuordnen ist.
