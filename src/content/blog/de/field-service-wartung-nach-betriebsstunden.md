---
title: "Wartung nach Betriebsstunden im Field Service einrichten"
description: "Wartung in Salesforce Field Service nach Betriebsstunden oder Zählern auslösen: Nutzungs- und Kriterienregeln, Herkunft des Zählers und welche Limits gelten."
pubDate: 2026-10-28
lang: de
slug: field-service-wartung-nach-betriebsstunden
translationKey: field-service-usage-based-maintenance
topic: field-service
categories: [field-service]
tags: [Field Service, Wartungspläne, Betriebsstunden, Assets, IoT, ERP]
takeaways:
  - "Salesforce Field Service löst Wartung nach Betriebsstunden über Maintenance Work Rules aus, die ein Feld am Asset lesen statt eines Kalenderdatums."
  - "Eine nutzungsbasierte Regel liest ein Nutzungsfeld am Asset, das eine Formel sein darf, und schreibt ein Feld für das nächste Auftreten, das keine Formel sein darf, weil das System es pflegt."
  - "Kriterienbasierte Regeln arbeiten mit Filterkriterien wie Stillstand ab 1.000 Stunden. Solange ein erzeugter Arbeitsauftrag offen ist, entsteht kein zweiter."
  - "Wichtige Limits: höchstens 2.600 Arbeitsaufträge und Positionen pro Lauf, 2.000 Assets in einem Plan mit Zählregel und nicht mehr als fünf Regeln pro Plan oder Asset."
  - "Der Zähler kommt einmal am Tag aus dem ERP oder der IoT-Plattform. Rohdaten der Sensoren bleiben außerhalb von Salesforce."
faq:
  - q: "Kann Salesforce Field Service Wartung nach Betriebsstunden planen?"
    a: "Ja. Maintenance Work Rules können nutzungsbasiert oder kriterienbasiert sein. Beide lesen Werte am Asset, etwa einen Betriebsstundenzähler, und erzeugen einen Arbeitsauftrag, wenn die Schwelle erreicht ist."
  - q: "Wie richte ich 2.000 Stunden oder 12 Monate ein, je nachdem, was zuerst eintritt?"
    a: "Mit einer kriterienbasierten Regel und zwei Bedingungen, verknüpft mit ODER: Stunden seit der letzten Wartung ab 2.000, Monate seit der letzten Wartung ab 12. Die Salesforce-Hilfe beschreibt dasselbe Muster mit Schaltspielen oder Monaten seit der letzten Überholung."
  - q: "Welche Felder können Recordset Filter Criteria nicht nutzen?"
    a: "Laut Salesforce-Hilfe werden URL-, Mehrfachauswahl-, verschlüsselte und Textbereichsfelder nicht unterstützt, Währungsfelder können keine Filterkriterien bilden. Zähler gehören in Zahlenfelder."
  - q: "Brauche ich IoT für Wartung nach Betriebsstunden?"
    a: "Nein. Den Zähler kann der Techniker eintippen, das ERP schicken oder eine IoT-Plattform schreiben. Für Intervalle von einigen Hundert Stunden reicht ein Wert pro Tag."
draft: false
---

In Salesforce Field Service lösen Sie Wartung nach Betriebsstunden mit Maintenance Work Rules aus, die einen Zähler am Asset lesen statt eines Kalenderdatums. Es gibt zwei Varianten. Eine nutzungsbasierte Regel liest ein Nutzungsfeld am Asset, das auch eine Formel sein darf, und das System pflegt ein Feld für das nächste Auftreten. Eine kriterienbasierte Regel arbeitet mit Filterkriterien, etwa „kumulierte Stillstandszeit ab 1.000 Stunden“, und erzeugt einen Arbeitsauftrag, sobald sie zutreffen. Der Zähler kommt einmal am Tag aus dem ERP oder der IoT-Plattform. Rohdaten der Sensoren bleiben außerhalb von Salesforce.

## Kalender, Nutzung oder Kriterien: Welcher Auslöser passt?

Die meisten Wartungspläne beginnen mit dem Kalender: Inspektion alle sechs Monate. Für Maschinen, die beim einen Kunden einschichtig und beim anderen dreischichtig laufen, ist das gleich doppelt falsch. Der Wenignutzer bekommt Einsätze, die er nicht braucht, der Vielnutzer wartet zu lange.

Field Service kennt drei Arten von Maintenance Work Rules, beschrieben auf der Hilfeseite zur [vorbeugenden Wartung](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5):

| Regeltyp | Liest | Typischer Einsatz |
|---|---|---|
| Kalenderbasiert | Intervall in Tagen, Wochen, Monaten | Gesetzliche Prüfungen, feste Vertragstermine |
| Nutzungsbasiert | Ein Nutzungsfeld am Asset und ein Feld für das nächste Auftreten | Betriebsstunden, Zyklen, Hübe |
| Kriterienbasiert | Recordset Filter Criteria auf Asset-Feldern | Schwellen, kombinierte Bedingungen, „was zuerst eintritt“ |

Recordset Filter Criteria sind gespeicherte Bedingungen auf Asset-Feldern, etwa „Betriebsstunden seit letzter Wartung größer oder gleich 2.000“. Die Grundlagen zu Wartungsplänen, Serviceverträgen und Entitlements stehen in [Field Service: Wie bildet man Wartungsverträge ab?](../salesforce-field-service-wartungsvertraege/).

## Wie funktioniert eine nutzungsbasierte Regel?

Die Regel zeigt auf zwei Felder am Asset. Das Nutzungsfeld enthält den Zähler, zum Beispiel die Betriebsstunden. Laut Hilfe darf es eine Formel sein, Sie können es also aus anderen Asset-Feldern berechnen. Das Feld für das nächste Auftreten enthält den Stand, bei dem die nächste Wartung fällig ist. Eine Formel darf es nicht sein, weil das System es selbst aktualisiert.

Pro Zählerart brauchen Sie also ein Zahlenfeld am Asset, das von außen gefüllt wird, und pro Regel ein Feld, das das System pflegt. Die Übersichtsseite nennt die Felder, beschreibt aber nicht jeden Schritt der Berechnung. Ich teste das deshalb in einer Sandbox mit ein paar echten Zählerständen, bevor der erste Plan live geht.

Eine Falle ist die Kombination von Regeln. Laut Hilfeartikel zur [kriterienbasierten Wartung](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5) erzeugen eine Kriterienregel und eine Kalenderregel ihre Arbeitsaufträge unabhängig voneinander, auch mit demselben vorgeschlagenen Datum. Wer neben die Stundenregel eine Kalenderregel „alle 12 Monate“ legt, bekommt womöglich zwei Arbeitsaufträge für denselben Kompressor in derselben Woche. „Was zuerst eintritt“ gehört in eine einzige Regel.

## Wie verhalten sich kriterienbasierte Regeln?

Sie legen Recordset Filter Criteria mit Bedingungen auf Standard- oder eigenen Asset-Feldern an, wählen, ob alle oder mindestens eine zutreffen müssen, und hängen sie an eine Maintenance Work Rule vom Typ kriterienbasiert. Das Beispiel der Hilfe kombiniert 60.000 Schaltspiele oder sechs Monate seit der letzten Überholung mit ODER. Genau dieses Muster „was zuerst eintritt“ schreiben Maschinenbauer in ihre Serviceverträge.

Drei Regeln aus der Hilfe bestimmen das Design:

- **Immer nur ein offener Arbeitsauftrag.** Solange ein erzeugter Arbeitsauftrag nicht abgeschlossen ist, erzeugt die Regel keinen neuen. Als abgeschlossen gelten Cannot Complete, Canceled, Completed und Closed.
- **Die Bedingung muss zurückgesetzt werden.** Trifft die Bedingung nach dem Abschluss noch zu, erzeugt der nächste Lauf den nächsten Arbeitsauftrag. Das Beispiel der Hilfe: Die kumulierte Stillstandszeit steigt von 982 auf 1.024 Stunden, ein Arbeitsauftrag entsteht, und weil der Wert über 1.000 bleibt, folgt der nächste. Vergleichen Sie deshalb gegen „Stunden seit letzter Wartung“ und speichern Sie den Zählerstand beim Abschluss, etwa per Flow, wenn der Arbeitsauftrag geschlossen wird. Die Hilfe schlägt dasselbe vor: ein eigenes Feld aktualisieren, wenn Arbeitsaufträge abgeschlossen werden.
- **Feldtypen.** URL-, Mehrfachauswahl-, verschlüsselte und Textbereichsfelder gehen nicht, Währungsfelder können keine Filterkriterien bilden. Zähler gehören in Zahlenfelder.

Die Hilfe nennt außerdem Asset-Attribute als Weg, Werte wie Schaltspiele seit der letzten Überholung zu führen. Das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_assetattribute.htm) gibt es seit API-Version 57.0. Wann ich Attribute und wann Felder nutze, beschreibe ich in [Asset-Hierarchie im Field Service: Wie tief pro Maschine?](../field-service-asset-hierarchie-maschinen/).

Ein Detail bei den Berechtigungen: Die Objekte Maintenance Work Rule und Recordset Filter Criteria brauchen denselben Zugriff und dieselbe Freigabe, sonst greifen die Regeln für manche Nutzer nicht.

## Woher kommt der Zähler?

Die Hilfe nennt drei Quellen: von Hand gepflegt, von einer IoT-Plattform aktualisiert oder über eine Integration vom AppExchange. Beim Maschinenbauer heißt das meist:

- **Die IoT-Plattform** schreibt einmal am Tag die Betriebsstunden der vernetzten Maschinen.
- **Das ERP**, zum Beispiel SAP, schickt Zählerstände, die es ohnehin vom Kunden oder aus Serviceberichten bekommt.
- **Der Techniker** liest den Zähler vor Ort ab und trägt ihn in der mobilen App ein. Für nicht vernetzte Maschinen ist das die einzige Quelle.

Ein Wert pro Tag reicht. Ein Intervall von 2.000 Stunden braucht keine Minutenwerte, und 1.200 Zählerstände am Tag sind eine kleine Schnittstelle. Die Zeitreihen bleiben in der IoT-Plattform oder im Historian, wie in [Predictive Maintenance in Salesforce: die Datenbasis](../predictive-maintenance-salesforce-datenbasis/) beschrieben. Legen Sie fest, welche Quelle gewinnt, wenn zwei sich widersprechen, etwa wenn der Techniker 2.140 Stunden abliest und das ERP noch 1.980 zeigt. Wie bei allen Stammdaten braucht es pro Feld ein führendes System, siehe [welche Daten die Terminplanung braucht](../salesforce-field-service-stammdaten/). Die Schnittstelle selbst gehört auf die Liste der [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Welche Limits zählen?

Die [Limits von Field Service](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5), die nutzungsbasierte Pläne zuerst treffen:

- **2.600 Arbeitsaufträge pro Lauf.** Ein Generierungslauf erzeugt pro Wartungsplan höchstens 2.600 Arbeitsaufträge und Positionen zusammen.
- **Praktische Zahl an Assets.** Die Hilfe nennt 2.600 Assets pro Plan als praktische Grenze, weniger als 1.300 bei zwei Regeln pro Asset und weniger als 650 bei vier.
- **Zählregeln.** Ein Plan mit einer Regel vom Typ Count ist auf 2.000 Wartungs-Assets begrenzt.
- **Fünf Regeln.** Salesforce empfiehlt höchstens fünf Maintenance Work Rules pro Plan oder Asset.
- **Horizont.** Der Generation Horizon beträgt höchstens 365 Tage, der Generation Timeframe höchstens 20 Jahre.

In der Praxis teile ich Pläne nach Baureihe oder Serviceregion. So bleibt jeder Plan unter den Grenzen, und jeder hat einen Verantwortlichen.

## Ein typisches Szenario, als Annahme: 1.200 Kompressoren

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren betreut 1.200 Anlagen im Feld unter Vertrag. Im Vertrag steht: Wartung alle 2.000 Betriebsstunden oder alle 12 Monate, je nachdem, was zuerst eintritt. 800 Anlagen sind vernetzt, 400 nicht.

**Daten.** Jedes Asset bekommt ein Zahlenfeld für die Betriebsstunden, ein Feld für den Stand bei der letzten Wartung und das Datum der letzten Wartung. Eine Formel berechnet die Stunden seit der letzten Wartung, eine zweite die Monate. Die IoT-Plattform schreibt jede Nacht die Stunden der vernetzten Anlagen. Bei den übrigen 400 tragen Techniker den Stand bei jedem Einsatz ein, dort greift die 12-Monats-Bedingung.

**Regel.** Eine kriterienbasierte Regel mit zwei Bedingungen, verknüpft mit ODER. Ein Flow schreibt Zählerstand und Datum ans Asset, wenn der Arbeitsauftrag abgeschlossen wird, und setzt damit beide Bedingungen zurück.

**Pläne.** Drei Pläne nach Region mit je etwa 400 Assets, weit unter 2.600 Arbeitsaufträgen pro Lauf.

**Wirkung.** Angenommen, die Hälfte der vernetzten Anlagen läuft zweischichtig mit etwa 4.000 Stunden im Jahr: Sie bekommen zwei Wartungen im Jahr statt einer. Einschichtige Anlagen mit 1.800 Stunden im Jahr fallen auf die 12-Monats-Bedingung zurück. Verglichen mit einem festen Halbjahresrhythmus für alle 1.200 Anlagen sind das 1.600 statt 2.400 Einsätze im Jahr, und die stark genutzten Kompressoren werden trotzdem rechtzeitig gewartet.

## Wo fangen Sie an?

Nehmen Sie eine Baureihe und schreiben Sie das Intervall aus dem Vertrag in einem Satz auf. Prüfen Sie, wo der Zähler heute liegt und wie oft er aktualisiert wird. Dann bauen Sie Felder, eine kriterienbasierte Regel und den Flow zum Zurücksetzen in einer Sandbox und testen mit zehn echten Assets, bevor Sie die ganze Baureihe umstellen. Das [Masterclass-Kapitel zu Assets, Wartung und Teilen](../../masterclass/field-service/field-service-assets-wartung-teile/) zeigt, wo das neben Verträgen, Ersatzteilen und Servicepartnern steht.

Wartung nach Betriebsstunden braucht einen Zähler am Asset, eine Regel mit ODER und ein Zurücksetzen beim Abschluss. Wenn Sie eine zweite Meinung zu Ihrem Wartungsmodell wollen, [schreiben Sie mir](#contact).
