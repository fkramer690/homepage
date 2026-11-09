---
title: "Asset-Hierarchie im Field Service: Wie tief pro Maschine?"
description: "Wie tief Maschinenbauer Maschinen, Baugruppen und Teile in Salesforce Field Service als Assets abbilden sollten, welche Limits gelten und wer den Baum pflegt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-asset-hierarchie-maschinen
translationKey: field-service-asset-hierarchy
topic: field-service
categories: [field-service, architecture]
tags: [Field Service, Assets, installierte Basis, Asset-Hierarchie, PLM, ERP]
takeaways:
  - "Salesforce erlaubt 50 Ebenen und 10.000 Assets pro Hierarchie, die Baumansicht navigiert aber nur 20 Ebenen und Hierarchien bis 500 Assets."
  - "Starke Signale für ein Asset: eigene Seriennummer, Wartung oder Garantie, wenn ein Serviceprozess genau diese Einheit getrennt verfolgen muss."
  - "Asset-Attribute sparen eigene Felder pro Baureihe, erlauben aber 25 pro Asset und sind nicht Teil der Offline-Briefcases."
  - "Die installierte Basis kommt aus dem System mit der seriennummerngenauen Konfiguration. Wer sie nach einem Tausch pflegt, steht vor dem Go-live fest."
  - "Jedes zusätzliche servicerelevante Asset belastet Wartungspläne und Datenpflege. Halten Sie die Zahl so klein, wie der Service es erlaubt."
faq:
  - q: "Wie viele Ebenen kann eine Asset-Hierarchie in Salesforce haben?"
    a: "Laut den Field-Service-Limits in der Salesforce-Hilfe bis zu 50 Ebenen, 2.000 untergeordnete Assets pro Asset und 10.000 Assets pro Hierarchie. Die Aktion View Asset Hierarchy navigiert bis zu 20 Ebenen und funktioniert nur bis 500 Assets."
  - q: "Sollte jedes Teil einer Maschine ein Asset werden?"
    a: "Nein. Ich bilde die Maschine und die Komponenten als Assets ab, die ein Serviceprozess getrennt identifizieren, warten, garantieren oder tauschen muss; eigene Seriennummer, Wartung oder Garantie sind starke Signale. Schrauben, Dichtungen und Kabel bleiben in der Stückliste im PLM und werden bei Bedarf angezeigt."
  - q: "Was sind Asset-Attribute in Salesforce?"
    a: "AssetAttribute ist ein Standardobjekt, das Attributwerte pro Asset speichert, etwa eine Firmware-Version oder einen Zähler. Jeder Wert verweist auf eine Attributdefinition, neue Werte brauchen also kein neues Feld. Salesforce erlaubt 25 Attribute pro Asset und empfiehlt höchstens 10, wenn sie nutzungsbasierte Wartung steuern."
  - q: "Wer sollte Assets nach einem Umbau aktualisieren?"
    a: "Meist erfasst der Techniker, der eine Baugruppe mit Seriennummer tauscht, den Tausch in der mobilen App, und das führende System für die installierte Basis bekommt die Änderung. Wer auch immer zuständig ist: Es braucht einen festen Prozess, sonst passt die Hierarchie nicht mehr zur Maschine."
draft: false
---

Ein Maschinenbauer sollte nur das als Asset abbilden, was ein Serviceprozess getrennt verfolgen muss, typischerweise Teile mit eigener Seriennummer, Wartung oder Garantie. Für die meisten Maschinen heißt das zwei oder drei Ebenen: die Linie oder Maschine, ihre Hauptbaugruppen mit Seriennummer und vielleicht einige Zukaufteile mit eigener Garantie. Alles andere bleibt in der Stückliste im PLM. Salesforce Field Service erlaubt deutlich mehr: 50 Ebenen und 10.000 Assets pro Hierarchie. Die echten Grenzen kommen früher, von Wartungsplänen, Datenpflege und der Baumansicht, die 20 Ebenen und Hierarchien bis 500 Assets navigiert.

## Was erlaubt Salesforce?

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets) steht ein Asset für ein bestimmtes gekauftes oder installiertes Produkt. Es kann mit Cases, Arbeitsaufträgen, Wartungsplänen, Entitlements und Serviceverträgen verknüpft werden, und hängt meist an einem Account, einem Kontakt oder beidem. Die Hierarchie entsteht über das Feld Parent Asset. Trailhead beschreibt Asset-Hierarchien als Weg, zusammengehörige Assets wie die Komponenten einer Maschine als Einheit zu führen, und zeigt sie in einer aufklappbaren Baumansicht.

Die [Field-Service-Limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) in der Salesforce-Hilfe, für das Produkt, das offiziell inzwischen Agentforce Field Service and Operations heißt:

| Limit | Wert |
|---|---|
| Untergeordnete Assets pro Asset | 2.000 |
| Ebenen in einer Hierarchie (Datenmodell) | 50 |
| Ebenen, die die Baumansicht navigiert | 20 |
| Assets in einer Hierarchie | 10.000 |
| Größe einer Hierarchie für die Baumansicht | 500 |

Die 20 Ebenen und 500 Assets stammen aus dem Hilfeartikel zu [Asset-Hierarchien](https://help.salesforce.com/s/articleView?id=service.assets_rel_hierarchical.htm&language=en_US&type=5); größere Hierarchien funktionieren weiter über die Liste Child Assets und die Felder Parent Asset, Root Asset und Asset Level. In der Field Service App gibt es die Hierarchieansicht nicht.

Ersetzt eine Komponente eine andere, hält eine Asset-Beziehung das fest, zum Beispiel vom Typ Upgrade. Sie hängt das neue Asset aber nicht von selbst in die Hierarchie und setzt das alte nicht außer Betrieb; dafür braucht es einen festen Prozess oder eine Automation.

## Welche Komponenten sollten Assets werden?

Meine Faustregel hat drei Fragen. Jedes Ja ist ein starkes Signal; entscheidend ist, ob ein Serviceprozess in Salesforce genau diese installierte Einheit getrennt identifizieren, warten, garantieren oder tauschen muss:

- **Hat sie eine eigene Seriennummer?** Ein zugekauftes Getriebe, ein Roboter oder ein Schaltschrank mit Typenschild. Der Techniker muss festhalten, welches Exemplar eingebaut oder getauscht wurde.
- **Hat sie eine eigene Wartung?** Eine Spindel mit eigenem Intervall in Betriebsstunden, eine Filteranlage mit eigener Prüfung. Maintenance Work Rules hängen an Assets, also braucht die Komponente eines.
- **Hat sie eine eigene Garantie?** Ein Lieferantenteil, dessen Garantie an einem anderen Datum beginnt als die der Maschine. Ohne eigenes Asset kann niemand sagen, ob der Anspruch an den Lieferanten geht.

Alles andere bleibt in der Stückliste: Schrauben, Dichtungen, Kabel, Normteile. Der Techniker muss sie trotzdem finden, aber das ist eine Frage für PLM und Ersatzteilkatalog. In [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/) empfehle ich dieselbe Aufteilung: Salesforce führt die Maschine und ihre für den Service wichtigen Hauptbaugruppen, die vollständige As-built-Stückliste bleibt im PLM und wird live gelesen.

## Felder oder Asset-Attribute für Maschinendaten?

Baureihen unterscheiden sich. Die eine hat eine Firmware-Version und einen Hubzähler, die nächste eine Laserquelle mit Stunden und eine Kühlmittelsorte. Bekommt jede Baureihe ihre eigenen Felder am Asset, wächst das Objekt mit jeder neuen Produktlinie.

Das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm), speichert laut Dokumentation Asset-Attribute, um den Zustand von Assets zu verfolgen und auszuwerten. Jeder Datensatz verbindet ein Asset mit einer Attributdefinition und speichert einen Wert, bei Auswahllisten mit den zugehörigen Werten. Neue Attribute brauchen eine neue Definition, kein neues Feld.

Attribute haben laut [Hinweisen](https://help.salesforce.com/s/articleView?id=fs_asset_attrib_manage_monit_consider.htm&language=en_US&type=5) Grenzen: 25 pro Asset, und höchstens 10 empfohlen, wenn nutzungsbasierte Wartung daraus Arbeitsaufträge erzeugt. Validierungsregeln, Datensatztypen und Feldhistorie werden nicht unterstützt. Und Briefcases für das Offline-Priming [enthalten keine Asset-Attribute](https://help.salesforce.com/s/articleView?id=service.wfs_mobile_work_with_performance_priming.htm&language=en_US&type=5), Techniker brauchen also Verbindung, um sie zu lesen.

Ich nutze Attribute für beschreibende Werte, die je Baureihe verschieden sind. Für wenige Zähler, die über alle Baureihen zählen, Validierung oder Historie brauchen oder offline lesbar sein müssen, etwa Betriebsstunden, nehme ich lieber ein Zahlenfeld am Asset. Nutzungsbasierte Wartung funktioniert mit beidem. Wie das im Detail funktioniert, steht in [Wartung nach Betriebsstunden im Field Service einrichten](../field-service-wartung-nach-betriebsstunden/).

## Wer hält die Hierarchie aktuell?

Die installierte Basis kommt bei Auslieferung aus dem System, das die seriennummerngenaue Konfiguration hält, oft dem ERP, manchmal MES, PLM oder einem Konfigurator: Maschine, Seriennummern der Hauptbaugruppen, Kunde, Standort, Lieferdatum. Dieser Import ist der einfache Teil. Der schwierige beginnt ein Jahr später, wenn ein Techniker ein Getriebe tauscht, ein Kunde einen zweiten Roboter nachrüstet oder ein Händler die Maschine in ein anderes Werk bringt.

Ohne festen Prozess zeigt die Hierarchie in Salesforce dann die Maschine im Auslieferungszustand, und niemand vertraut ihr mehr. Diese Punkte gehören vor dem Go-live geklärt:

1. **Wer erfasst eine getauschte Baugruppe?** Aus meiner Sicht der Techniker in der mobilen App, mit der Seriennummer des neuen Teils, denn er hat es in der Hand.
2. **Welches System führt danach?** Bleibt das ERP führend für die installierte Basis, muss die Änderung aus der App zurück ins ERP. Führt Salesforce nach der Auslieferung, bekommt das ERP eine Kopie. Beides funktioniert. Eine Mischung funktioniert nur mit klarer Zuständigkeit je Datenbereich und Änderungsereignis, dazu Regeln für Konflikte und Abgleich. Das ist dieselbe Frage nach dem führenden System wie bei den [Stammdaten für die Planung](../salesforce-field-service-stammdaten/), und sie gehört in das Schnittstellendesign, siehe [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
3. **Was ist mit Umbauten durch Händler oder Kunden?** Tauscht ein Händler eine Komponente und meldet nur Garantiefälle, hat die Hierarchie Lücken. Das schadet auch jeder späteren Auswertung, wie in [Predictive Maintenance in Salesforce: die Datenbasis](../predictive-maintenance-salesforce-datenbasis/) beschrieben.

Field Service kann Garantiebedingungen und Asset-Garantien speichern. Erfassung von Partneransprüchen, Prüfung und Lieferantenregress gehören zu Warranty Lifecycle Management in Manufacturing Cloud, mit eigener Lizenz, und stehen im Kapitel [Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/) dieser Masterclass.

## Jedes zusätzliche Asset kostet später

Jedes Asset wirkt billig, wenn die Daten einmal geladen werden. Teuer wird es später, an drei Stellen, und dabei zählt die Zahl der servicerelevanten Assets mehr als die Tiefe allein:

```kennzahlen
2.600 | Assets pro Wartungsplan als praktische Grenze
1.300 | Assets pro Plan bei zwei Maintenance Work Rules je Asset
500 | Assets, ab denen die Baumansicht die Hierarchie nicht mehr zeigt
quelle: Salesforce Hilfe, Grenzen von Field Service
```

- **Wartungspläne.** Die Hilfe nennt 2.600 Assets pro Plan als praktische Grenze, weniger als 1.300 bei zwei Maintenance Work Rules pro Asset. Der Grund: Ein Planlauf erzeugt höchstens 2.600 Arbeitsauftragsdatensätze. Untergeordnete Assets ohne Wartungsplan zählen nicht mit, aber ist jede Komponente ein Wartungs-Asset, laufen Pläne schnell voll.
- **Die Baumansicht.** Über 500 Assets steht die Aktion View Asset Hierarchy nicht zur Verfügung, und sie navigiert nur 20 Ebenen. Eine Linie mit 900 Teilen als Assets ist für den Innendienst dann schwer lesbar.
- **Die mobile App.** Was das Gerät des Technikers lädt, hängt von den Briefcase-Regeln ab, nicht automatisch von der ganzen Hierarchie. Trotzdem vergrößert jedes geladene Asset die Datenmenge, die offline aktuell bleiben muss; ich würde die Ladezeit mit einer echten Maschine testen, bevor Teile auf jedes Tablet wandern.

Dasselbe gilt für Händlerportale: Jedes Asset, das ein Händler sehen darf, muss richtig freigegeben sein, wie beim [Ersatzteilshop pro Maschine](../ersatzteilshop-teile-pro-maschine/).

## Rechenbeispiel: eine Verpackungslinie

Alle Zahlen sind Annahmen. Ein Hersteller von Verpackungsmaschinen liefert eine Linie mit 6 Maschinen. Darin stecken 40 Baugruppen mit Seriennummer, etwa Servoantriebe, Roboter und Etikettierer, und rund 900 weitere Teile.

**Vollständige Kopie.** Linie, Maschinen, Baugruppen und Teile als Assets: etwa 947 Datensätze pro Linie. Das liegt weit unter dem Limit von 10.000, aber über den 500 für die Baumansicht, und 900 Datensätze pro Linie müssen mit dem PLM übereinstimmen.

**Empfohlene Tiefe.** Die Linie als oberstes Asset, weil der Servicevertrag sie als Ganzes abdeckt. Darunter die 6 Maschinen, darunter die 40 Baugruppen mit Seriennummer: 47 Assets in drei Ebenen. Zwölf Baugruppen mit eigenem Intervall bekommen Maintenance Work Rules. Die 900 Teile bleiben im PLM und erscheinen auf der Maschinenseite oder im Agenten, wenn jemand sie braucht.

Bei 50 Linien im Feld sind das 2.350 Assets statt rund 47.000, und jedes davon trägt eine Information, die der Service nutzt.

## Einen Maschinentyp mit der Faustregel durchgehen

Nehmen Sie einen Maschinentyp und gehen Sie seine Stückliste mit der Faustregel durch: Seriennummer, eigene Wartung, eigene Garantie und ob ein Serviceprozess die Einheit getrennt verfolgen muss. Schreiben Sie die Ebenen auf, die dabei herauskommen, und zählen Sie die Assets pro Maschine. Dann entscheiden Sie, wer eine getauschte Baugruppe erfasst und welches System nach der Auslieferung führt, und zwar vor dem ersten Import aus dem ERP. Das [Masterclass-Kapitel zu Assets, Wartung und Teilen](../../masterclass/field-service/field-service-assets-wartung-teile/) zeigt, wie die Hierarchie mit Wartungsplänen, Ersatzteilen und Servicepartnern zusammenhängt.
