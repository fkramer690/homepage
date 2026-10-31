---
title: "Field Service App offline: Welche Daten aufs Gerät?"
description: "Welche Datensätze die Salesforce Field Service App offline für Techniker in Werkshallen braucht, wie Briefcase Builder arbeitet und welche Lücken Sie testen."
pubDate: 2026-10-28
lang: de
slug: field-service-app-offline-briefcase
translationKey: field-service-mobile-offline
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, mobile App, offline, Briefcase Builder]
takeaways:
  - "Briefcase Builder legt fest, was jede Technikergruppe lädt. Performance Priming synchronisiert die wichtigsten Änderungen alle fünf Minuten."
  - "Salesforce dokumentiert Lücken: Aufgaben im Briefcase werden nicht geladen, und globale Quick Actions erhalten offline keine Datensatz-ID."
  - "Nutzer mit Community-Lizenz können beim Öffnen eines Termins einen Fehler bekommen. Jeder Offline-Test braucht deshalb einen Partnertechniker."
  - "Aufs Gerät gehören Termin, Arbeitsauftrag, Asset mit Historie, Fahrzeuglager und Handbuch. Preislisten und alle Assets eines Gebiets bleiben online."
  - "Salesforce nennt keine Obergrenze für Datensätze offline. Schneiden Sie den Briefcase nach Rolle zu und messen Sie die Synchronisation."
faq:
  - q: "Funktioniert die Salesforce Field Service App offline?"
    a: "Ja. Laut Trailhead bringt die App eine Grundausstattung für den Offline-Betrieb mit. Mit Briefcase Builder legt ein Admin fest, welche Datensätze jede Gruppe herunterlädt, und offline erfasste Änderungen werden synchronisiert, sobald das Gerät wieder Verbindung hat."
  - q: "Was ist Briefcase Builder in Salesforce Field Service?"
    a: "Briefcase Builder ist die Setup-Seite, auf der Sie festlegen, welche Datensätze für welche Nutzer und mit welchen Filtern offline verfügbar sind. Performance Priming lädt anhand dieser Briefcases genau die Datensätze und Metadaten, die das Profil eines Technikers braucht."
  - q: "Wie oft synchronisiert die Field Service App Offline-Daten?"
    a: "Mit Performance Priming synchronisiert die App die wichtigsten Änderungen alle fünf Minuten, solange das Gerät verbunden ist. Offline geänderte Datensätze bleiben auf dem Gerät gespeichert und werden übertragen, wenn die Verbindung zurück ist."
  - q: "Welche Offline-Probleme sollte ich vor dem Go-live testen?"
    a: "Salesforce nennt fünf: Aufgaben im Briefcase werden nicht geladen, globale Quick Actions erhalten keine Datensatz-ID, Nutzer mit Community-Lizenz können einen Fehler wegen fehlender Datensätze sehen, Appointment Assistant kann mit LWC Offline kollidieren, und unter iOS laden geänderte Komponenten erst nach einem Kaltstart."
draft: false
---

Die Salesforce Field Service App sollte offline alles enthalten, was ein Techniker für die heutigen Einsätze braucht, und nicht mehr: den Service-Termin, den Arbeitsauftrag mit seinen Positionen, das Asset mit der jüngeren Historie, das Fahrzeuglager und das Handbuch zur Maschine. Das legen Sie pro Technikergruppe in Briefcase Builder fest, und Performance Priming hält diese Daten alle fünf Minuten aktuell, solange Verbindung besteht. Vollständige Preislisten oder alle Assets eines Gebiets gehören nicht aufs Gerät. Testen Sie die dokumentierten Offline-Lücken vor dem Go-live mit einem internen Techniker und einem Partnernutzer, in einer Halle ohne Netz.

## Was hält die Field Service App offline vor?

Das [Trailhead-Modul zu Offline-Briefcases](https://trailhead.salesforce.com/content/learn/modules/offline-briefcase/allow-access-to-information-online) beschreibt drei Ebenen.

- **Grundausstattung.** Die App funktioniert ohne Netz von Haus aus, mit einer begrenzten Menge an Datensätzen auf dem Gerät.
- **Briefcases.** In Briefcase Builder wählt ein Admin Objekte, Filter und die Nutzer oder Gruppen, für die ein Briefcase gilt. Auch eigene Objekte können so offline verfügbar werden.
- **Performance Priming.** Es nutzt die Briefcases, um genau die Datensätze und Metadaten zu laden, die das Profil eines Technikers braucht, hält mehr Datensätze als Standard-Priming und synchronisiert die wichtigsten Änderungen alle fünf Minuten.

Offline erfasste Änderungen speichert das Gerät und überträgt sie an Salesforce, sobald die Verbindung zurück ist. Flows, die auf Datensätze aus dem Briefcase zugreifen, laufen ebenfalls offline. Das ist für Formulare und geführte Arbeitsschritte wichtig.

Was Salesforce nicht veröffentlicht, ist eine feste Zahl an Datensätzen, die ein Gerät halten kann. Ich habe keine offizielle Grenze gefunden und würde deshalb auch nicht mit einer planen. Schneiden Sie den Briefcase nach Rolle zu und messen Sie, wie lange das Priming auf einem echten Gerät dauert.

## Welche Daten gehören bei einem Maschinenbauer aufs Gerät?

Meine Regel: Offline gehört, was der Techniker braucht, um den Einsatz abzuschließen und zu dokumentieren, ohne im Büro anzurufen. Alles andere bleibt online, denn jeder Datensatz muss synchronisiert werden, und ein schwerer Briefcase macht die Synchronisation am Morgen langsam.

| Auf dem Gerät | Warum |
|---|---|
| Service-Termine für heute und morgen | Der Tagesplan, auch wenn ein Einsatz auf den nächsten Morgen rutscht |
| Arbeitsauftrag mit Positionen und benötigten Teilen | Was zu tun ist und was mit muss |
| Asset mit den letzten Arbeitsaufträgen | Frühere Störungen und Reparaturen an dieser Maschine |
| Fahrzeuglager (Product Items des Fahrzeugs) | Teile prüfen und Verbrauch erfassen |
| Handbuch und Service-Bulletins zum Asset | Fehlersuche an der Maschine |
| Formulare und Vorlagen für den Servicebericht | Dokumentation vor Ort |

| Bleibt online | Warum |
|---|---|
| Vollständige Preislisten | Preise entstehen im Innendienst oder im ERP |
| Alle Assets des Gebiets | Tausende Datensätze, die heute niemand öffnet |
| Bestände aller Lager | Das ERP führt sie, der Innendienst schaut dort nach |
| Abgeschlossene Aufträge, älter als einige Monate | Selten gebraucht, schwer zu synchronisieren |

Das Fahrzeuglager wird leicht unterschätzt. Eine Live-Abfrage im ERP funktioniert im Keller einer Werkshalle nicht, wie ich in [Ersatzteile im Außendienst: ERP oder Salesforce?](../salesforce-field-service-ersatzteile-erp/) beschrieben habe. Die Kopie des Fahrzeugbestands muss in Salesforce und auf dem Gerät liegen.

Handbücher brauchen einen zweiten Blick. Ein Agent zur Fehlersuche findet das richtige Handbuch nur, wenn jedes Dokument denselben Produktschlüssel trägt wie das Asset. Das steht in [KI-Fehlersuche im Außendienst: erst die Handbücher](../ki-fehlersuche-handbuecher-aussendienst/). Derselbe Schlüssel entscheidet, ob der Briefcase das richtige Handbuch für das Gerät filtern kann. Ob sich die Datei selbst ohne Netz öffnet, hängt davon ab, wie sie gespeichert ist. Testen Sie das mit einem großen PDF.

## Welche Offline-Lücken dokumentiert Salesforce?

Die [Hinweise zu LWC Offline in der Field Service App](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sfs_gs_lwc_considerations.htm) nennen fünf bekannte Probleme. In einem ersten Test mit einem Admin-Nutzer fallen sie leicht durch, deshalb nehme ich alle fünf in den Testplan auf.

1. **Aufgaben werden nicht geladen.** Ein Task-Objekt im Briefcase löst beim Priming einen Fehler aus. Die übrigen Objekte werden trotzdem geladen. Abhilfe: Aufgaben aus dem Briefcase entfernen.
2. **Globale Quick Actions erhalten keine Datensatz-ID.** Von einer Datensatzseite gestartet, wissen sie nicht, welchen Datensatz der Techniker gerade ansieht. Eine eigene Aktion, die auf dem aktuellen Arbeitsauftrag arbeiten soll, gehört deshalb ans Objekt und nicht zu den globalen Aktionen.
3. **Fehlender Datensatz bei Community-Lizenzen.** Öffnet ein Nutzer mit Community-Lizenz einen Service-Termin, kann der Datensatz fehlen.
4. **Appointment Assistant und LWC Offline.** Salesforce nennt einen Konflikt, der zu fehlenden URLs führen kann.
5. **Kaltstart unter iOS.** Änderungen an Lightning Web Components lädt die App unter iOS erst, wenn sie vollständig beendet und neu gestartet wurde. Ein Techniker, der die App nie schließt, arbeitet mit der alten Version weiter.

```hinweis achtung
Punkt 5 betrifft auch jedes Release Ihrer eigenen Komponenten. Wer sagt 50 Technikern, dass sie die App nach einem Deployment komplett schließen sollen? Das gehört in den Release-Plan, zusammen mit den App-Versionen, die Salesforce ausliefert. Die Routine dafür beschreibe ich in [Field Service App Updates: jede Version vorher testen](../field-service-app-updates-testen/).
```

## Partnertechniker testen offline getrennt

Viele Hersteller holen Subunternehmer in dieselbe App. Partnertechniker arbeiten dann als Community-Nutzer mit Field-Service-Berechtigungen, wie in [Field Service: Wie bindet man Servicepartner ein?](../salesforce-field-service-servicepartner/) beschrieben. Punkt 3 der Liste oben trifft genau diese Nutzer.

Partner haben außerdem andere Freigaben. Sie sehen nur ihr eigenes Gebiet und ihre eigenen Termine. Ein Briefcase, der für interne Techniker funktioniert, liefert einem Partner deshalb unter Umständen weniger Datensätze oder keine der verknüpften. Mein Rat: Geben Sie Partnern einen eigenen Briefcase und testen Sie ihn mit einem echten Partnernutzer, nie mit einem Admin, der das Profil wechselt.

## Rechenbeispiel: ein Tag ohne Netz

Ein Maschinenbauer schickt einen Techniker in die Produktionshalle eines Kunden. Die Kompressoren stehen im Keller, von 7 bis 16 Uhr gibt es kein Mobilfunknetz, und das Gast-WLAN des Kunden reicht nicht bis nach unten.

- **7:00 Uhr, auf dem Parkplatz.** Die App lädt drei Termine für den Tag: Jahreswartung an zwei Kompressoren und eine Undichtigkeit an einem dritten. Die Asset-Historie zeigt ein vor vier Monaten getauschtes Ventil am dritten Kompressor.
- **9:30 Uhr, an der Maschine.** Der Techniker prüft im Fahrzeuglager einen Dichtungssatz, bucht ihn als verbraucht, füllt das Prüfformular aus und holt die Unterschrift des Kunden auf dem Servicebericht. Alles liegt auf dem Gerät.
- **11:00 Uhr, im Innendienst.** Die Disponentin plant einen vierten Einsatz beim selben Kunden. Der Techniker sieht ihn nicht, weil das Gerät keine Verbindung hat. Die Disponentin muss den Ansprechpartner vor Ort anrufen.
- **16:30 Uhr, zurück im Auto.** Die App synchronisiert. Der Verbrauch geht nach Salesforce und über die Schnittstelle ins ERP, der Servicebericht kommt im Innendienst an, und der vierte Einsatz erscheint.

Das Szenario zeigt, was offline für die Planung bedeutet. Das Gerät arbeitet, aber der Plan bleibt auf dem Stand der letzten Synchronisation stehen. Disponenten müssen wissen, welche Techniker in Hallen ohne Netz arbeiten, und ein kurzer Anruf gehört zum Prozess.

Der Servicebericht in diesem Szenario kommt aus dem Document Builder. Eigene Komponenten in der Vorlage müssen ihre Daten ebenfalls offline lesen. Wie das geht, steht in [Salesforce Document Builder: fünf Grenzen und Workarounds](../salesforce-document-builder-grenzen-workarounds/).

## Einen Briefcase pro Rolle zuschneiden

```schritte
Rollen auf Briefcases abbilden
  Interner Techniker, Partnertechniker, Meister. Ein Briefcase pro Rolle, mit Filtern auf Gebiet und Datum.
Datensätze pro Einsatzart auflisten
  Für Jahreswartung, Störung und Inbetriebnahme prüfen, was der Techniker vor Ort öffnet. Alles weglassen, was niemand öffnet.
In einer echten Halle testen
  Morgens laden, in den Flugmodus wechseln, einen kompletten Einsatz mit Teilen, Formular und Unterschrift durchspielen, abends synchronisieren.
Die fünf bekannten Probleme durchgehen
  Jedes mit internem Nutzer und Partnernutzer, unter iOS und Android.
Die Synchronisation messen
  Dauer des Primings am Morgen und Speicherbedarf auf dem Gerät, mit dem Briefcase Ihrer stärksten Region.
```

Das Offline-Design entscheidet, ob Formulare und Dokumente später funktionieren. Der nächste Schritt ist das Formular selbst, beschrieben in [Field Service Data Capture: Prüfprotokolle ohne Papier](../field-service-data-capture-pruefprotokolle/). Das ganze Thema gehört zu [Kapitel 3 der Masterclass Field Service](../../masterclass/field-service/field-service-mobile-app-dokumente/).
