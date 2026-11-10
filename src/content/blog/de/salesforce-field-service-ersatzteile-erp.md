---
title: "Salesforce Field Service Ersatzteile: ERP oder Salesforce?"
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
  - "Field Service braucht eine Kopie des Bestands, damit Disponent und Techniker sehen, welches Teil wo liegt. Der Inventar-Tab der App ist offline nicht verfügbar."
  - "Der Techniker bucht verbrauchte Teile am Arbeitsauftrag. Field Service senkt den Fahrzeugbestand, die Schnittstelle meldet den Verbrauch ans ERP."
  - "Probleme lagen in meinen Projekten an der Datenpflege, nicht am ERP als führendem System. Darauf sollte vor dem Start der Fokus liegen."
  - "Benötigte Teile am Arbeitsauftrag dokumentieren den Bedarf. Der Abgleich mit dem Fahrzeugbestand ist ein eigener Prozess, kein Standard der Engine."
faq:
  - q: "Sollte Salesforce Field Service oder das ERP den Ersatzteilbestand führen?"
    a: "In meinen Projekten war das immer das ERP. Es bewertet den Bestand, steuert Einkauf und Umlagerungen und ist mit der Buchhaltung verbunden. In manchen Unternehmen übernimmt ein Lagerverwaltungs- oder Servicelogistiksystem diese Rolle. Field Service hält eine Kopie für Disponenten und Techniker und meldet Verbräuche zurück."
  - q: "Wie bildet Field Service den Bestand im Servicefahrzeug ab?"
    a: "Das Fahrzeug ist ein mobiler Standort (Location). Der Bestand je Teil ist ein Product Item mit der Menge an diesem Standort. Erfasst der Techniker einen Verbrauch am Arbeitsauftrag, sinkt die Menge automatisch."
  - q: "Was ist der Unterschied zwischen Products Required und Products Consumed?"
    a: "Products Required dokumentieren die Teile, die für einen Arbeitsauftrag gebraucht werden, und helfen bei der Vorbereitung. Sie reservieren keinen Bestand. Products Consumed sind die Teile, die tatsächlich verbaut wurden, und reduzieren den Bestand."
  - q: "Welche Daten fließen zwischen ERP und Field Service?"
    a: "Vom ERP nach Salesforce fließen Materialstamm und Bestände je Lagerort. Von Salesforce ins ERP fließen Verbräuche aus Arbeitsaufträgen und Teileanforderungen der Techniker, die dort zu Umlagerungen oder Bestellungen werden."
draft: false
---

In meinen Projekten hat immer das ERP den Ersatzteilbestand im Außendienst geführt, auch den Bestand im Servicefahrzeug, und es gab damit relativ wenig Probleme. Das empfehle ich auch, mit einer Einschränkung: In manchen Unternehmen übernimmt statt des ERP ein Lagerverwaltungs- oder Servicelogistiksystem diese Rolle. Entscheidend ist, dass genau ein System führend ist. Salesforce Field Service braucht trotzdem eine Kopie des Bestands, damit Disponent und Techniker sehen, welches Teil wo liegt, und es meldet zurück, welche Teile verbaut wurden. Wo Probleme auftraten, lagen sie nicht an dieser Aufteilung, sondern an der Pflegequalität der Daten.

Dieser Artikel ist Teil 4 der Serie. In [Teil 2](../salesforce-field-service-stammdaten/) war „Ersatzteile nicht da“ einer der Gründe für Fehleinsätze. In [Teil 3](../salesforce-field-service-terminplanung-automatisieren/) war „Teil nicht im Fahrzeug“ ein typischer Grund, warum ein Disponent den Vorschlag der Planung ändert. Hier geht es darum, wie Field Service und ERP bei Ersatzteilen zusammenspielen.

## Warum das ERP den Bestand führen sollte

Ein Ersatzteil ist im ERP mehr als eine Menge an einem Ort. Es hat einen Wert in der Bilanz, einen Einkaufsprozess, Mindestbestände, Lieferanten und Umlagerungen zwischen Lagern. Jede Entnahme ist eine Buchung, die in die Buchhaltung einfließt. Das ERP ist dafür gebaut, und die Prozesse dort sind meist seit Jahren etabliert.

Field Service kann Bestände je Standort verwalten und Bewegungen protokollieren. Bewertung, Einkauf und Buchhaltung deckt es nicht ab, und das soll es auch nicht. Wer den Bestand in Salesforce führen will, baut einen Teil des ERP nach und muss beide Welten dauerhaft abstimmen. Ich habe keinen Kunden gesehen, der das gemacht hat, und ich würde auch keinem dazu raten.

## Was muss Field Service über Ersatzteile wissen?

Field Service braucht die Teile aus zwei Gründen: für die Vorbereitung eines Einsatzes und für die Dokumentation danach. Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_manage_inventory.htm&language=en_US&type=5) beschreibt eine ganze Reihe von Lagerobjekten. Für den Start reichen drei:

- **Bestand je Fahrzeug.** Das Fahrzeug ist ein mobiler Standort (Location), der Bestand eines Teils dort ist ein Product Item, also „zwölf Dichtungen im Fahrzeug von Techniker A“.
- **Benötigte Teile am Arbeitsauftrag (Products Required).** Sie zeigen dem Innendienst vor dem Einsatz, welche Teile ins Fahrzeug gehören. Sie dokumentieren den Bedarf; sie reservieren keinen Bestand, und die Planungsengine gleicht sie standardmäßig nicht mit dem Fahrzeug ab.
- **Verbrauchte Teile (Products Consumed).** Der Techniker erfasst, was er verbaut hat, und laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_parts_guidelines.htm&language=en_US&type=5) sinkt der Bestand dabei automatisch.

Teileanforderungen, Umlagerungen und Rücksendungen gibt es ebenfalls als Objekte. Ich übernehme sie nur dann nach Salesforce, wenn das ERP sie nicht schon gut abwickelt, denn jedes weitere Objekt ist eine weitere Schnittstelle, die gepflegt werden muss.

## Wie fließen die Daten zwischen ERP und Field Service?

Die Aufteilung folgt einer einfachen Regel: Das ERP liefert Stammdaten und Bestände, Salesforce liefert, was vor Ort passiert ist.

| Information | Richtung | Zeitpunkt |
|---|---|---|
| Materialstamm (Teile, Nummern, Bezeichnungen) | ERP nach Salesforce | bei Änderung |
| Bestand je Lager und Fahrzeug | ERP nach Salesforce | je nach Planungshorizont, siehe unten |
| Verbrauchte Teile am Arbeitsauftrag | Salesforce nach ERP | nach Abschluss des Einsatzes |
| Teileanforderungen der Techniker | Salesforce nach ERP | sofort, dort Umlagerung oder Bestellung |
| Rücksendungen | je nach Prozess | mit dem Wareneingang im ERP |

Sie sollten früh entscheiden, wie aktuell der Bestand in Salesforce sein muss. Für die Planung des nächsten Tages reicht oft ein nächtlicher Abgleich. Wer am Einsatztag umplant, braucht kürzere Abstände, denn ein Bestand von letzter Nacht erzeugt falsche Sicherheit. Klären Sie auch Reservierungen und die Reihenfolge der Buchungen: Was passiert, wenn ERP und App dasselbe Teil gleichzeitig buchen? Ein B2B-Shop steht vor derselben Frage, nur mit anderen Nutzern, siehe [Bestand im B2B-Shop](../bestand-b2b-shop-erp-live/). Danach stellt sich die Frage, was offline passiert. Die mobile App arbeitet auch ohne Netz, aber nicht alle Funktionen sind offline verfügbar. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.mfs_products_location.htm&type=5) ist der Inventar-Tab, in dem Techniker ihren Fahrzeugbestand sehen und pflegen, offline nicht verfügbar. Was offline verfügbar ist, hängt davon ab, was die App mit dem Arbeitsauftrag oder per Briefcase vorlädt, etwa die benötigten Teile. Planen Sie deshalb, welche Teileinformationen der Techniker vor Ort braucht, und testen Sie das vor dem Start im Keller einer Fabrikhalle. Ein reiner Live-Abruf aus dem ERP funktioniert dort ebenso wenig. Welche Daten die App offline vorhält, beschreibe ich in [Field Service App offline](../field-service-app-offline-briefcase/).

Eine dritte Frage betrifft die Datenmenge. Jedes Teil an jedem Standort ist ein eigener Datensatz. 40 Fahrzeuge mit je 300 Teilen ergeben bereits 12.000 Product Items, hinzu kommen die Lager. Das ist für Salesforce kein Problem, aber jeder Datensatz muss abgeglichen werden, und die App zeigt in ihren Inventarlisten höchstens 1.000 Produkte. Ich würde deshalb nur die Standorte nach Salesforce übertragen, die für den Außendienst relevant sind: die Fahrzeuge und die Lager, aus denen sie nachgefüllt werden. Der übrige Bestand des Unternehmens bleibt im ERP, und bei Bedarf fragt der Innendienst ihn dort ab.

Wie man solche Schnittstellen und die Frage nach dem führenden System sauber klärt, beschreibe ich auf der Seite [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Die Probleme entstehen bei der Datenpflege

```praxis
In meinen Field-Service-Projekten stammten Ersatzteile und installierte Basis aus dem ERP. Die Aufteilung selbst hat dabei selten Schwierigkeiten verursacht. Wenn es Probleme gab, lagen sie an der Pflegequalität der Daten.
```

Daran würde ich vor dem Start arbeiten:

- **Materialnummern:** Ein Teil, das im ERP doppelt oder mit veralteter Nummer existiert, erscheint auch doppelt in Salesforce. Der Techniker bucht dann auf das falsche Teil.
- **Nicht gebuchte Entnahmen:** Nimmt ein Techniker ein Teil aus dem Lager, ohne dass es gebucht wird, stimmt der Fahrzeugbestand nicht mehr. Field Service zeigt dann ein Teil als vorhanden an, obwohl es nicht verfügbar ist.
- **Teile ohne Bezug zur Anlage:** Ohne die Zuordnung, welches Teil in welche Maschine passt, kann niemand vorab bestimmen, welche Teile für einen Einsatz benötigt werden. Hier hilft die Anlagenhierarchie aus Teil 2.
- **Verbrauch nur auf Papier:** Erfasst der Techniker den Verbrauch erst abends oder gar nicht in der App, wird er verspätet oder falsch im ERP gebucht. Die neuen Formulare und die Spracheingabe aus [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/) können das erleichtern.

Keines dieser Probleme löst eine Software. Jedes braucht einen Verantwortlichen, der die Daten pflegt, und einen Prozess, der falsche Buchungen sichtbar macht. Eine regelmäßige Inventur einzelner Fahrzeuge ist dafür ein einfacher erster Schritt.

## Was müssen Sie entscheiden?

Die Aufteilung zwischen ERP und Salesforce ist der einfache Teil. Drei Entscheidungen kosten in jedem Fall Geld und sollten gemeinsam von Serviceleitung, Logistik und IT getroffen werden:

- **Wie aktuell der Bestand sein muss.** Ein nächtlicher Abgleich ist günstig, eine Schnittstelle nahezu in Echtzeit nicht. Die Frage ist, was eine falsche Bestandszahl kostet: einen zweiten Einsatz, eine Expresslieferung, einen verärgerten Kunden. Wer am Einsatztag plant, wiegt sich mit einer Zahl von letzter Nacht in falscher Sicherheit.
- **Wer Bestandsdifferenzen verantwortet.** Weicht der Fahrzeugbestand vom Bestand im ERP ab, muss jemand das klären und die Buchung korrigieren. Ohne Verantwortlichen bleibt die Differenz, und die Techniker vertrauen der App nicht mehr.
- **Ob Teile die Planung steuern sollen.** Benötigte Teile anzuzeigen ist Standard. Dass die Planung berücksichtigt, ob ein Techniker das Teil im Fahrzeug hat, ist ein eigener Prozess oder eine eigene Automatisierung. Entscheiden Sie, ob die Fehleinsätze wegen fehlender Teile diesen Aufwand rechtfertigen.

Drei Warnzeichen dafür, dass die Teilearchitektur nicht tragfähig ist: Techniker rufen vor jedem Einsatz im Lager an, der Verbrauch wird Tage später im ERP gebucht, und der Bestand wird in zwei Systemen von Hand gepflegt.

## Drei Techniker ihr Fahrzeug zählen lassen

Prüfen Sie, wie genau der Fahrzeugbestand im ERP heute ist.

```hinweis tipp
Ein einfacher Test: Lassen Sie drei Techniker den Bestand in ihrem Fahrzeug zählen und vergleichen Sie das Ergebnis mit dem ERP. Weicht es stark ab, hat dieses Thema Priorität vor jeder Schnittstelle.
```

Stimmt der Fahrzeugbestand, starten Sie mit Bestandsdaten, benötigten Teilen und Verbrauch. Wie Wartungsverträge und zugesagte Reaktionszeiten in die Planung einfließen, zeigt der [nächste Teil der Serie](../salesforce-field-service-wartungsvertraege/).

