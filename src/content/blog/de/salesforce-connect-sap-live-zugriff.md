---
title: "Salesforce Connect mit SAP: wann Live-Zugriff reicht"
metaTitle: "Salesforce Connect und SAP: Live-Daten oder Kopie?"
description: "Wann Salesforce Connect SAP-Rechnungen und Lieferungen live in Salesforce zeigt, wo Sie weiter eine Kopie brauchen und welche Grenzen und Kosten gelten."
pubDate: 2026-11-12
lang: de
slug: salesforce-connect-sap-live-zugriff
translationKey: salesforce-connect-sap
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Connect, SAP, External Objects, OData, Schnittstellen, Maschinenbau]
takeaways:
  - "Salesforce Connect zeigt SAP-Daten als externe Objekte: Die Datensätze bleiben in SAP und werden bei jedem Aufruf per OData gelesen."
  - "Live-Zugriff genügt für Daten, die Vertrieb und Service nur ansehen, etwa Rechnungen, Lieferungen und offene Posten am Account."
  - "Sobald Salesforce mit den Daten rechnet, automatisiert oder über Zeit berichtet, brauchen Sie eine Kopie: Apex-Trigger und historische Trendberichte fehlen."
  - "Die Adapter für OData 2.0 und 4.0 erlauben standardmäßig 20.000 Aufrufe pro Stunde; OData 4.01 hat keine Grenze für Aufrufe."
  - "Salesforce Connect kostet laut Preisliste 4.000 US-Dollar pro Verbindung und Monat. Vergleichen Sie das mit einer Synchronisation über Ihre Middleware."
faq:
  - q: "Was ist Salesforce Connect?"
    a: "Salesforce Connect ist ein kostenpflichtiges Add-on, das Daten aus einem Fremdsystem wie SAP als externe Objekte in Salesforce anzeigt, ohne sie zu importieren. Benutzer sehen die Datensätze in Listenansichten, Related Lists und Berichten, während die Daten im Quellsystem bleiben und erst beim Aufruf gelesen werden."
  - q: "Kann Salesforce Connect Daten aus SAP S/4HANA lesen?"
    a: "Ja, wenn SAP die Daten als OData-Dienst bereitstellt. Salesforce Connect hat Adapter für OData 2.0, 4.0 und 4.01, und SAP S/4HANA bietet Standard-OData-APIs, unter anderem für Fakturen. Welche Dienste aktiv sind und wer sie aufrufen darf, entscheidet die SAP-Seite."
  - q: "Wann sollte ich SAP-Daten trotzdem nach Salesforce kopieren?"
    a: "Kopieren Sie die Daten, wenn Salesforce auf eine Änderung reagieren, mit ihnen rechnen oder über Zeit berichten soll. Apex-Trigger, historische Trendberichte und Zeilenformeln in Berichten stehen für externe Objekte nicht zur Verfügung, und Berichte lesen höchstens 20.000 Datensätze des Hauptobjekts."
  - q: "Was kostet Salesforce Connect?"
    a: "Die Salesforce-Preisliste nennt 4.000 US-Dollar pro Verbindung und Monat, jährlich abgerechnet, für die Enterprise und die Unlimited Edition. Was als eine Verbindung zählt, steht in Ihrem Bestellformular, und ein zweites SAP-System kann eine zweite Verbindung bedeuten. Lassen Sie sich die Zahl vom Account Executive bestätigen."
draft: false
---

Salesforce Connect zeigt SAP-Daten wie Rechnungen, Lieferungen und offene Posten live in Salesforce als externe Objekte, ohne einen einzigen Datensatz zu kopieren. Das genügt, wenn Vertrieb und Service die Daten nur neben dem Account oder dem Fall sehen müssen. Sobald Salesforce mit den Daten rechnen, auf eine Änderung reagieren oder über Monate berichten soll, brauchen Sie weiter eine Kopie: Apex-Trigger und historische Trendberichte stehen für externe Objekte nicht zur Verfügung. Vergleichen Sie vor der Entscheidung das Add-on zu 4.000 US-Dollar pro Verbindung und Monat (Listenpreis) mit einer Synchronisation über die Middleware, die Sie schon betreiben.

## So liest Salesforce Connect SAP-Daten

Salesforce Connect bildet eine Tabelle des Fremdsystems als externes Objekt ab. In der [Salesforce-Hilfe zu den OData-Adaptern](https://help.salesforce.com/s/articleView?language=en_US&id=platform.salesforce_connect_odata.htm&type=5) beschreibt Salesforce drei Adapter für SAP und ähnliche Systeme: OData 2.0, OData 4.0 und OData 4.01. Dafür muss SAP die Daten als OData-Dienst bereitstellen. SAP S/4HANA bietet zum Beispiel Standard-OData-APIs für Fakturen, mit denen sich eine Faktura lesen und als PDF abrufen lässt, laut [SAP Learning zu den Billing-APIs](https://learning.sap.com/learning-journeys/exploring-functions-and-innovations-in-sap-s-4hana-sales/identifying-odata-apis-for-billing-documents_b8ff7d91-8045-4881-a057-728ba4b23978).

Die Verbindung zum Account ist die SAP-Kundennummer. Eine indirekte Lookup-Beziehung verknüpft das externe Objekt mit einem Feld am Account, das die Kundennummer enthält, und die Account-Seite zeigt dann eine Related List mit den SAP-Rechnungen dieses Kunden. Salesforce zeigt diesen Aufbau mit SAP-Kundenaufträgen im [Schnellstart-Projekt auf Trailhead](https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect3). In Salesforce wird kein Datensatz gespeichert. Jedes Mal, wenn jemand die Liste öffnet, fragt Salesforce bei SAP an.

```ablauf
sf: Account, Rechnungsliste
erp: OData-Dienst, Fakturen
Account --Kundennummer--> Rechnungsliste
Rechnungsliste --Abfrage beim Öffnen--> OData-Dienst
OData-Dienst --> Fakturen
Fakturen ..aktuelle Zeilen..> Rechnungsliste
```

Darin liegen Stärke und Grenze zugleich. Die Daten sind immer aktuell, und niemand pflegt einen zweiten Rechnungsbestand, aber Salesforce kennt nur, was SAP in diesem Moment antwortet.

## Wann reicht Live-Zugriff statt einer Kopie?

Ich entscheide je Datenart, nie einmal für die ganze SAP-Schnittstelle. Die Frage ist, was Salesforce mit den Daten macht, nachdem sie angezeigt werden.

```tabelle
titel: Live-Zugriff oder Kopie, je Datenart entschieden
spalten: Verwendung der Daten | Salesforce Connect (live) | Kopie über Middleware
Vertrieb sieht vor dem Besuch Rechnungen und offene Posten | Genügt * | Nicht nötig
Service prüft Lieferung und Sendungsnummer zu einem Auftrag | Genügt * | Nicht nötig
Bericht Umsatz je Kunde über 24 Monate | Schwach: keine historischen Trends, Teilmenge der Daten | Nötig *
Automatisierung reagiert auf Zahlungssperre oder neue Lieferung | Nicht möglich: keine Apex-Trigger | Nötig *
Manufacturing Cloud rechnet Ist-Mengen gegen Sales Agreements | Nicht möglich | Nötig *
Agent oder Flow schreibt nach SAP zurück | Möglich mit beschreibbaren externen Objekten, mit Einschränkungen | Oft der sauberere Weg
marke: passt
fazit: Je mehr Salesforce mit den Daten macht, statt sie nur anzuzeigen, desto eher brauchen Sie eine Kopie.
```

Die Grenze bei der Automatisierung steht im [Apex Developer Guide zu externen Objekten](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_external_objects_considerations.htm): Apex-Trigger sind für externe Objekte nicht verfügbar, mit einer Ausnahme für Änderungsereignisse aus OData-4.0-Verbindungen. Die Grenzen bei Berichten listet die [Salesforce-Hilfe zu Berichten mit Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5): Umgerechnete Währungsfelder, Kreuzfilter, Buckets, historische Trendberichte und Zeilenformeln werden nicht unterstützt. Das Hauptobjekt liefert bis zu 20.000 Datensätze, und bei großen Datenquellen geben Summen und Formeln womöglich nur eine Teilmenge der Daten wieder.

Bei Herstellern ist die Trennlinie meist klar. Rechnungen, Lieferscheine, offene Posten und Kreditlimits sind Informationen, die ein Vertriebsmitarbeiter vor dem Kundentermin liest. Ist-Mengen für Sales Agreements, installierte Basis und Ersatzteilbestand sind Daten, die Salesforce weiterverarbeitet; sie gehören als Kopie nach Salesforce.

```praxis
Als ich Sales Agreements mit Ist-Mengen aus dem ERP in der Manufacturing Cloud eingeführt habe, war die ERP-Schnittstelle der Stolperstein.
```

Die Ist-Mengen mussten in Salesforce liegen, weil die Manufacturing Cloud sie mit den geplanten Mengen vergleicht. Welche Daten zwischen SAP und der Manufacturing Cloud wohin fließen und warum man den Auftragsstatus besser live abfragt, beschreibe ich in [Manufacturing Cloud und SAP: welche Daten wohin fließen](../manufacturing-cloud-sap-integration-datenfluesse/).

## Grenzen, die Sie vor dem Go-live prüfen

Salesforce Connect hat eigene Grenzen, und sie unterscheiden sich je Adapter. Die Zahlen stammen aus den [allgemeinen Grenzen für Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=platform.platform_connect_general_limits.htm&type=5) und der [Seite zu Berichten](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5):

```kennzahlen
20.000 | Aufrufe pro Stunde für OData 2.0 und 4.0 in Enterprise, Performance und Unlimited Edition; mehr über einen Supportfall
100 | externe Objekte pro Org als Standard, auf Anfrage bis 200
4 | Joins pro Abfrage über externe und andere Objekte
20.000 | Datensätze des Hauptobjekts in einem Bericht
quelle: Salesforce-Hilfe, General Limits for Salesforce Connect und Salesforce Connect Support for Reports, Stand November 2026
```

OData 4.01 hat laut denselben Seiten keine Grenze für Aufrufe. Die Grenze von 100.000 neuen Zeilen pro Stunde gilt nicht für Orgs auf Hyperforce, die Salesforce seit Spring '25 schrittweise davon ausgenommen hat. Für OData 4.01 hat Salesforce außerdem die stündlichen Grenzen für neue Datensatz-ID-Zuordnungen aufgehoben, ebenfalls schrittweise für Hyperforce-Orgs, laut den [Grenzen der OData-Adapter](https://help.salesforce.com/s/articleView?id=platform.odata_general_limits.htm&language=en_US&type=5).

Rechenbeispiel: 300 Benutzer in Service und Vertrieb öffnen je 25 Account-Seiten am Tag, und jede Seite zeigt zwei Related Lists aus SAP. Löst jede Anzeige einer Liste einen Aufruf aus, sind das 15.000 Aufrufe am Tag. Fallen 30 Prozent davon in die stärkste Stunde, kommen Sie in dieser Stunde auf 4.500 Aufrufe, weit unter 20.000. Ein Händlerportal mit mehreren tausend Benutzern sieht anders aus, ebenso ein Batch-Job, der externe Objekte liest. Dann wählen Sie OData 4.01 oder testen die Last mit einer realistischen Zahl von Benutzern.

Die zweite Grenze liegt in SAP. Jeder Seitenaufruf wird zu einer Anfrage an den OData-Dienst. Ist SAP langsam oder in Wartung, zeigt die Related List keine Daten. Stimmen Sie mit der SAP-Basis die Wartungsfenster ab und legen Sie fest, wer antwortet, wenn Benutzer leere Listen melden.

## Portal und Zugriff: wer sieht welche SAP-Zeilen?

Dieser Punkt wird am häufigsten übersehen. Die externe Datenquelle meldet sich entweder mit einem gemeinsamen Login für alle an (Named Principal) oder mit einem Login je Benutzer, laut der [Objektreferenz zu ExternalDataSource](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_externaldatasource.htm). Ein Login je Benutzer bedeutet ein SAP-Konto je Salesforce-Benutzer, was für ein Händlerportal mit Hunderten von Firmen selten praktikabel ist. Mit einem gemeinsamen Login liest jeder mit Zugriff auf das externe Objekt, was dieser eine SAP-Benutzer lesen darf.

Apex Managed Sharing ist für externe Objekte nicht verfügbar. Bevor ein Händlerportal SAP-Rechnungen zeigt, legen Sie fest, wo die Einschränkung auf die eigene Kundennummer des Händlers durchgesetzt wird, und testen Sie das als Portalbenutzer, nie als Admin. Testen Sie auch einen Händler mit mehreren SAP-Kundennummern, denn dort sind Listen am häufigsten unvollständig oder zeigen zu viel.

Am sichersten ist aus meiner Sicht ein OData-Dienst, der schon auf der SAP-Seite oder in der Middleware nach dem anfragenden Kunden filtert. Das ist eine Designentscheidung für SAP und Salesforce gemeinsam, und sie gehört in die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), bevor jemand die Related List baut.

## Was Salesforce Connect im Vergleich zur Synchronisation kostet

Die [Salesforce-Preisliste für Plattform-Add-ons](https://www.salesforce.com/platform/pricing-add-ons/) nennt für Salesforce Connect 4.000 US-Dollar pro Verbindung und Monat, jährlich abgerechnet, für die Enterprise und die Unlimited Edition. Das sind 48.000 US-Dollar im Jahr zum Listenpreis. Dafür sparen Sie Datenspeicher für kopierte Rechnungen und den Aufwand, einen Synchronisationsjob zu bauen und zu überwachen. Sie verzichten bei diesen Objekten auf Apex-Trigger, historische Trendberichte und Apex Managed Sharing.

Betreiben Sie schon eine Middleware für Aufträge und Stammdaten, kann eine zusätzliche Synchronisation der offenen Posten nur zum Lesen weniger kosten als eine neue Verbindung. Haben Sie keine Middleware und wollen nur Rechnungen anzeigen, ist das Add-on oft der schnellere Weg. Ich vergleiche beide Varianten mit denselben drei Zahlen: einmaliger Bauaufwand, laufende Kosten pro Jahr und wer bei einer Störung reagiert. Wie ich die Schnittstellen zwischen Salesforce und dem ERP meist aufteile, beschreibe ich auf der [Leistungsseite Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

```vertiefung Für Entwickler
titel: Salesforce Connect mit SAP einrichten
- Die externe Datenquelle im Setup mit der OData-URL des SAP-Dienstes anlegen, dann Validate and Sync; Salesforce erzeugt je Tabelle ein externes Objekt mit der Endung __x.
- Die indirekte Lookup-Beziehung auf ein External-ID-Feld am Account anlegen, das die SAP-Kundennummer enthält.
- Server-Driven Paging und Request Row Counts aktivieren, wenn Batch-Jobs die externen Objekte lesen, damit keine Datensätze übersprungen oder doppelt verarbeitet werden.
- Die Option High Data Volume nur nutzen, wenn Sie an Ratenlimits stoßen: Sie umgeht die meisten davon, schränkt aber andere Funktionen ein, darunter Berichte.
- Grenzen der OData-Adapter: 8 MB je Anfrage und Antwort, 16 MB je Ergebnismenge, 1.000 Zeilen je Unterabfrage.
```

## Erster Schritt: SAP-Daten je Bildschirm auflisten und markieren, was Salesforce damit macht

Nehmen Sie die Bildschirme, mit denen Ihre Benutzer täglich arbeiten: Account, Fall, Opportunity und, wenn vorhanden, das Portal. Notieren Sie für jede SAP-Information darauf, welches System sie führt und ob Salesforce sie nur anzeigt oder auch damit rechnet, automatisiert oder über Zeit berichtet. Zwei Zeilen aus einer solchen Liste: offene Posten, Account-Seite, SAP führt, nur anzeigen, Kandidat für Salesforce Connect. Ist-Mengen, Sales Agreement, SAP liefert, Manufacturing Cloud rechnet, Kopie. Ergänzen Sie die erwartete Zahl der Benutzer je Bildschirm, denn sie bestimmt die Last auf dem OData-Dienst.

```schritte
Auflisten | 1 Woche · Architekt und Fachbereich
  SAP-Daten je Bildschirm: Rechnungen, Lieferungen, offene Posten, Ist-Mengen, Bestand.
Markieren | 1 Tag · Architekt
  Nur anzeigen oder auch rechnen, automatisieren, über Zeit berichten.
Prüfen | 1 bis 2 Wochen · SAP-Basis
  Gibt es einen OData-Dienst, wer filtert nach Kunde, welche Last ist zu erwarten.
Rechnen | 1 Tag · IT-Leitung
  Connect-Verbindung gegen Synchronisation über die vorhandene Middleware, pro Jahr.
```

Alles, was mit „nur anzeigen“ markiert ist, kommt für Salesforce Connect in Frage. Alles andere bleibt in der Synchronisation, und die Liste zeigt Ihnen noch am selben Tag, ob sich das Add-on lohnt.
