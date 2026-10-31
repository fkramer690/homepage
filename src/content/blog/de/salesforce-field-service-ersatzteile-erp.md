---
title: "Ersatzteile im Außendienst: ERP oder Salesforce?"
description: "Wer führt den Ersatzteilbestand im Servicefahrzeug, ERP oder Salesforce Field Service? Aufgabenteilung, Datenflüsse und wo die Probleme wirklich entstehen."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-ersatzteile-erp
translationKey: field-service-spare-parts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 4 }
tags: [Field Service, Außendienst, Ersatzteile, ERP, Schnittstellen, Fertigung]
takeaways:
  - "Field Service braucht eine Kopie des Bestands, damit Disponent und Techniker sehen, welches Teil wo liegt, auch offline in der App."
  - "Der Techniker bucht verbrauchte Teile am Arbeitsauftrag. Field Service senkt den Fahrzeugbestand, die Schnittstelle meldet den Verbrauch ans ERP."
  - "Probleme lagen in meinen Projekten an der Pflege der Daten, nicht am ERP als führendem System. Darauf liegt vor dem Start der Fokus."
  - "Benötigte Teile lassen sich am Arbeitsauftrag hinterlegen. So weiß die Planung vor dem Einsatz, welches Teil der Techniker dabeihaben muss."
faq:
  - q: "Sollte Salesforce Field Service oder das ERP den Ersatzteilbestand führen?"
    a: "Das ERP. Es bewertet den Bestand, steuert Einkauf und Umlagerungen und ist mit der Buchhaltung verbunden. Field Service hält eine Kopie für Planung und Techniker und meldet Verbräuche zurück."
  - q: "Wie bildet Field Service den Bestand im Servicefahrzeug ab?"
    a: "Das Fahrzeug ist ein mobiler Standort (Location). Der Bestand je Teil ist ein Product Item mit der Menge an diesem Standort. Erfasst der Techniker einen Verbrauch am Arbeitsauftrag, sinkt die Menge automatisch."
  - q: "Was ist der Unterschied zwischen Products Required und Products Consumed?"
    a: "Products Required sind die Teile, die für einen Arbeitsauftrag gebraucht werden, und helfen bei der Vorbereitung. Products Consumed sind die Teile, die tatsächlich verbaut wurden, und reduzieren den Bestand."
  - q: "Welche Daten fließen zwischen ERP und Field Service?"
    a: "Vom ERP nach Salesforce fließen Materialstamm und Bestände je Lagerort. Von Salesforce ins ERP fließen Verbräuche aus Arbeitsaufträgen und Teileanforderungen der Techniker, die dort zu Umlagerungen oder Bestellungen werden."
draft: false
---

Den Ersatzteilbestand im Außendienst führt das ERP, auch den Bestand im Servicefahrzeug. In meinen Projekten war das immer so, und es gab damit relativ wenig Probleme. Salesforce Field Service braucht trotzdem eine Kopie des Bestands, damit Disponent und Techniker sehen, welches Teil wo liegt, und es meldet zurück, welche Teile verbaut wurden. Wo Probleme auftraten, lagen sie nicht an dieser Aufteilung, sondern an der Pflegequalität der Daten.

Dieser Artikel ist Teil 4 der Serie. In [Teil 2](../salesforce-field-service-stammdaten/) war „Ersatzteile nicht da“ einer der Gründe für Fehleinsätze. In [Teil 3](../salesforce-field-service-terminplanung-automatisieren/) war „Teil nicht im Fahrzeug“ ein typischer Grund, warum ein Disponent den Vorschlag der Planung ändert. Hier geht es darum, wie Ersatzteile in Field Service und im ERP zusammenkommen.

## Das ERP führt den Bestand

Ein Ersatzteil ist im ERP mehr als eine Menge an einem Ort. Es hat einen Wert in der Bilanz, einen Einkaufsprozess, Mindestbestände, Lieferanten und Umlagerungen zwischen Lagern. Jede Entnahme ist eine Buchung, die in der Buchhaltung ankommt. Das ERP ist dafür gebaut, und die Prozesse dort laufen meist seit Jahren.

Field Service kann Mengen je Standort halten und Bewegungen protokollieren. Bewertung, Einkauf und Buchhaltung kann es nicht, und es soll das auch nicht. Wer den Bestand in Salesforce führen will, baut einen Teil des ERP nach und muss beide Welten dauerhaft abstimmen. Ich habe keinen Kunden gesehen, der das gemacht hat, und ich würde auch keinem dazu raten.

## Was muss Field Service über Ersatzteile wissen?

Field Service braucht die Teile aus zwei Gründen: für die Vorbereitung eines Einsatzes und für die Dokumentation danach. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_manage_inventory.htm&language=en_US&type=5) gibt es dafür eine Reihe von Objekten:

- **Standorte (Locations)** sind Lager und Fahrzeuge. Ein Servicefahrzeug ist ein mobiler Standort mit Bestand, wie in Teil 2 beschrieben.
- **Product Items** sind der Bestand eines Teils an einem Standort, also „zwölf Dichtungen im Fahrzeug von Techniker A“.
- **Products Required** sind die Teile, die ein Arbeitsauftrag braucht. Sind sie hinterlegt, weiß der Innendienst vor dem Einsatz, was ins Fahrzeug muss.
- **Products Consumed** sind die Teile, die der Techniker tatsächlich verbaut hat. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_parts_guidelines.htm&language=en_US&type=5) sinkt die Menge des Product Items dabei automatisch.
- **Product Requests** sind Teileanforderungen, etwa wenn der Bestand im Fahrzeug knapp wird oder ein Einsatz ein bestimmtes Teil braucht. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_create_part_requests.htm&language=en_US&type=5) können sie an Arbeitsaufträgen hängen und ein Fahrzeug als Ziel haben.
- **Product Transfers** und **Return Orders** bilden Umlagerungen und Rücksendungen ab.

Nicht jedes Unternehmen braucht alle davon. Wenn das ERP Teileanforderungen und Umlagerungen schon gut abwickelt, reicht in Salesforce oft der Bestand zur Anzeige, die benötigten Teile am Auftrag und der Verbrauch. Jedes weitere Objekt ist eine weitere Schnittstelle, die gepflegt werden muss.

## Wie fließen die Daten zwischen ERP und Field Service?

Die Aufteilung folgt einer einfachen Regel: Das ERP liefert Stammdaten und Bestände, Salesforce liefert, was vor Ort passiert ist.

| Information | Richtung | Zeitpunkt |
|---|---|---|
| Materialstamm (Teile, Nummern, Bezeichnungen) | ERP nach Salesforce | bei Änderung |
| Bestand je Lager und Fahrzeug | ERP nach Salesforce | regelmäßig, mindestens täglich |
| Verbrauchte Teile am Arbeitsauftrag | Salesforce nach ERP | nach Abschluss des Einsatzes |
| Teileanforderungen der Techniker | Salesforce nach ERP | sofort, dort Umlagerung oder Bestellung |
| Rücksendungen | je nach Prozess | mit dem Wareneingang im ERP |

Früh entscheiden sollten Sie, wie aktuell der Bestand in Salesforce sein muss. Für die Planung des nächsten Tages reicht oft ein nächtlicher Abgleich. Wer am Einsatztag umplant, braucht kürzere Abstände. Ein B2B-Shop steht vor derselben Frage, nur mit anderen Nutzern, siehe [Bestand im B2B-Shop](../bestand-b2b-shop-erp-live/). Danach kommt die Frage, was offline passiert. Die mobile App arbeitet auch ohne Netz. Damit der Techniker dort seinen Fahrzeugbestand sieht, muss er als Kopie in Salesforce liegen. Ein reiner Live-Abruf aus dem ERP funktioniert im Keller einer Fabrikhalle nicht. Welche Daten die App offline vorhält, beschreibe ich in [Field Service App offline](../field-service-app-offline-briefcase/).

Eine dritte Frage betrifft die Menge. Jedes Teil an jedem Standort ist ein eigener Datensatz. 40 Fahrzeuge mit je 300 Teilen sind schon 12.000 Product Items, dazu die Lager. Das ist für Salesforce kein Problem, aber jeder Datensatz muss abgeglichen werden und landet offline auf dem Gerät des Technikers. Ich würde deshalb nur die Standorte nach Salesforce holen, die für den Außendienst zählen: die Fahrzeuge und die Lager, aus denen sie nachgefüllt werden. Der übrige Bestand des Unternehmens bleibt im ERP, und bei Bedarf fragt der Innendienst ihn dort ab.

Wie man solche Schnittstellen und die Frage nach dem führenden System sauber klärt, beschreibe ich auf der Seite [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Die Probleme entstehen bei der Datenpflege

```praxis
In meinen Field-Service-Projekten kamen Ersatzteile und installierte Basis aus dem ERP. Die Aufteilung selbst hat dabei selten Ärger gemacht. Wenn es Probleme gab, lagen sie an der Pflegequalität der Daten.
```

Daran würde ich vor dem Start arbeiten:

- **Materialnummern:** Ein Teil, das im ERP doppelt oder mit veralteter Nummer existiert, landet auch doppelt in Salesforce. Der Techniker bucht dann auf das falsche.
- **Nicht gebuchte Entnahmen:** Nimmt ein Techniker ein Teil aus dem Lager, ohne dass es gebucht wird, stimmt der Fahrzeugbestand nicht mehr. Field Service zeigt dann ein Teil, das nicht da ist.
- **Teile ohne Bezug zur Anlage:** Ohne Zuordnung, welches Teil in welche Maschine passt, kann niemand vorab sagen, was ein Einsatz braucht. Hier hilft die Anlagenhierarchie aus Teil 2.
- **Verbrauch nur auf Papier:** Erfasst der Techniker den Verbrauch erst abends oder gar nicht in der App, kommt er spät oder falsch im ERP an. Die neuen Formulare und die Spracheingabe aus [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/) können das erleichtern.

Keines dieser Probleme löst eine Software. Jedes braucht einen Verantwortlichen, der die Daten pflegt, und einen Prozess, der falsche Buchungen sichtbar macht. Eine regelmäßige Inventur einzelner Fahrzeuge ist dafür ein einfacher erster Schritt.

## Erster Schritt: drei Techniker ihr Fahrzeug zählen lassen

Prüfen Sie, wie genau der Fahrzeugbestand im ERP heute ist.

```hinweis tipp
Ein einfacher Test: Lassen Sie drei Techniker ihr Fahrzeug zählen und vergleichen Sie das Ergebnis mit dem ERP. Weicht es stark ab, ist das die erste Baustelle, vor jeder Schnittstelle.
```

Stimmt es, legen Sie fest, welche der Objekte oben Sie brauchen, und starten Sie mit Bestand, benötigten Teilen und Verbrauch. Wie Wartungsverträge und zugesagte Reaktionszeiten in die Planung kommen, zeigt der [nächste Teil der Serie](../salesforce-field-service-wartungsvertraege/).
