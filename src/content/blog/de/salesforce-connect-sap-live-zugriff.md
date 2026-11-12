---
title: "Salesforce Connect mit SAP: wann Live-Zugriff reicht"
metaTitle: "Salesforce Connect und SAP: Live-Zugriff oder Replikation?"
description: "Wann Salesforce Connect SAP-Rechnungen und Lieferungen live in Salesforce zeigt, wann Sie die Daten replizieren und welche Grenzen und Kosten gelten."
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
  - "Live-Zugriff genügt für Rechnungen, Lieferungen und offene Posten, die man nachschlägt, wenn der Bildschirm Antwortzeiten und Ausfälle von SAP verträgt."
  - "Replizieren Sie, wenn Salesforce auf Änderungen in SAP reagieren, Historie halten, große Mengen auswerten oder bei SAP-Ausfall weiterarbeiten muss."
  - "Salesforce setzt für die OData-Adapter kein Callout-Limit. Die Kapazitätsgrenze ist, was SAP Gateway oder Ihre Middleware bedienen kann."
  - "Salesforce Connect kostet 4.000 US-Dollar pro Verbindung und Monat (Listenpreis, jährlich). Vergleichen Sie das samt SAP-Seite mit einer Synchronisation."
faq:
  - q: "Was ist Salesforce Connect?"
    a: "Salesforce Connect ist ein kostenpflichtiges Add-on, das Daten aus einem Fremdsystem wie SAP als externe Objekte in Salesforce anzeigt, ohne die Datensätze zu importieren. Benutzer sehen sie in Listenansichten, Related Lists und Berichten, während die Daten im Quellsystem bleiben und erst beim Aufruf gelesen werden."
  - q: "Kann Salesforce Connect Daten aus SAP S/4HANA lesen?"
    a: "Ja, wenn SAP oder eine Integrationsschicht die Daten als OData-Dienst bereitstellt. Salesforce Connect hat Adapter für OData 2.0, 4.0 und 4.01, und SAP S/4HANA bietet Standard-OData-APIs, unter anderem für Fakturen. Ob ein Dienst für den produktiven Einsatz mit Salesforce Connect taugt, hängt von Filtern, Schlüsseln, Paging, Antwortzeit und Berechtigungen ab."
  - q: "Wann sollte ich SAP-Daten nach Salesforce replizieren?"
    a: "Replizieren Sie die Daten, wenn Salesforce auf eine Änderung in SAP reagieren, Historie speichern, große Mengen auswerten, bei einem SAP-Ausfall weiterarbeiten oder die Daten in eigenen Salesforce-Objekten verarbeiten soll, wie die Manufacturing Cloud die Ist-Mengen von Sales Agreements. Apex-Trigger stehen für externe Objekte nicht zur Verfügung, und Berichte lesen höchstens 20.000 Datensätze des Hauptobjekts."
  - q: "Was kostet Salesforce Connect?"
    a: "Die Salesforce-Preisliste nennt 4.000 US-Dollar pro Verbindung und Monat, jährlich abgerechnet, für die Enterprise und die Unlimited Edition. Klären Sie mit Ihrem Account Executive, wie Verbindungen bei Ihnen gezählt werden, etwa bei einem zweiten SAP-System oder mehreren OData-Endpunkten."
draft: false
---

Salesforce Connect zeigt SAP-Daten wie Rechnungen, Lieferungen und offene Posten live in Salesforce als externe Objekte, ohne die Datensätze zu importieren. Das genügt, wenn Vertrieb und Service die Daten neben dem Account oder dem Fall nachschlagen und der Bildschirm SAP-Antwortzeiten und Ausfälle verträgt. Replizieren Sie die Daten, wenn Salesforce auf eine Änderung in SAP reagieren, Historie halten, große Mengen auswerten oder bei einem SAP-Ausfall weiterarbeiten muss. Vergleichen Sie vor der Entscheidung das Add-on zu 4.000 US-Dollar pro Verbindung und Monat (Listenpreis) plus die SAP-Seite mit einer Synchronisation über Ihre Middleware.

## So liest Salesforce Connect SAP-Daten

Salesforce Connect bildet die Entitätsmengen eines OData-Dienstes als externe Objekte ab. In der [Salesforce-Hilfe zu den OData-Adaptern](https://help.salesforce.com/s/articleView?language=en_US&id=platform.salesforce_connect_odata.htm&type=5) beschreibt Salesforce drei Adapter für SAP und ähnliche Systeme: OData 2.0, OData 4.0 und OData 4.01. Hinter dem Endpunkt kann SAP S/4HANA mit SAP Gateway stehen, SAP BTP oder eine Middleware, die den OData-Dienst selbst bereitstellt. SAP S/4HANA bietet zum Beispiel Standard-OData-APIs, die Fakturen lesen, laut [SAP Learning zu den Billing-APIs](https://learning.sap.com/learning-journeys/exploring-functions-and-innovations-in-sap-s-4hana-sales/identifying-odata-apis-for-billing-documents_b8ff7d91-8045-4881-a057-728ba4b23978).

Die Verbindung zum Account ist die SAP-Kundennummer. Eine indirekte Lookup-Beziehung verknüpft das externe Objekt mit einem eindeutigen Feld am Account, das die Kundennummer enthält, und die Account-Seite zeigt dann eine Related List mit den SAP-Rechnungen dieses Kunden. Salesforce zeigt diesen Aufbau mit SAP-Kundenaufträgen im [Schnellstart-Projekt auf Trailhead](https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect3). Betreiben Sie mehr als ein SAP-System oder einen weiteren Mandanten, kann dieselbe Nummer doppelt vorkommen; dann gehören System und Mandant mit in das Schlüsselfeld. Hat ein Händler mehrere SAP-Kundennummern, bilden Sie je Nummer einen Account unter einem übergeordneten Account ab oder lassen den OData-Dienst die Nummern zusammenfassen. Die Geschäftsdaten werden nicht in Salesforce gespeichert. Jedes Mal, wenn jemand die Liste öffnet, ruft Salesforce den konfigurierten OData-Endpunkt auf, der dann SAP abfragt.

```ablauf
sf: Account, Rechnungsliste
erp: OData-Dienst, Fakturen
Account --Kundennummer--> Rechnungsliste
Rechnungsliste --Abfrage beim Öffnen--> OData-Dienst
OData-Dienst --> Fakturen
Fakturen ..aktuelle Zeilen..> Rechnungsliste
```

Darin liegen Stärke und Grenze zugleich. Die Daten sind so aktuell, wie der OData-Endpunkt sie im Moment der Anfrage liefert, und niemand pflegt einen zweiten Rechnungsbestand. Salesforce kennt jedoch nur die Daten, die der Endpunkt in diesem Moment zurückgibt.

Eine Standard-API von SAP ist ein Anfang, aber kein Beleg, dass sie passt. Bevor jemand die Related List baut, prüft die SAP-Basis oder das Integrationsteam, welche Filter und Sortierungen der Dienst unterstützt, ob die Schlüssel stabil und eindeutig sind, wie er große Ergebnisse seitenweise liefert und wie schnell er eine Abfrage für einen Kunden beantwortet.

## Wann reicht Live-Zugriff statt einer Kopie?

Ich entscheide das für jede Datenart und jeden Prozess einzeln, nie pauschal für die gesamte SAP-Schnittstelle. Die Frage ist, was Salesforce mit den Daten macht, nachdem sie angezeigt werden, und was passiert, wenn SAP nicht antwortet.

```tabelle
titel: Live-Zugriff oder Replikation, je Prozess entschieden
spalten: Prozess | Salesforce Connect (live) | Replikation über Middleware
Vertrieb sieht vor dem Besuch Rechnungen und offene Posten | Genügt * | Nicht nötig
Service prüft Lieferung und Sendungsnummer zu einem Auftrag | Genügt * | Nicht nötig
Verlauf des Kreditlimits eines Kunden Monat für Monat | Nicht möglich: nur der aktuelle Stand | Nötig *
Automatisierung reagiert auf Zahlungssperre oder neue Lieferung in SAP | Kein datensatzgesteuerter Start; nur Änderungsereignisse, SAP-Events oder Abfragen in Intervallen | Meist der einfachere Weg *
Manufacturing Cloud rechnet Ist-Mengen gegen Sales Agreements | Nicht möglich | Nötig *
Servicefall muss während der SAP-Wartung bearbeitet werden | Nicht möglich | Nötig *
marke: passt
fazit: Live-Zugriff passt zum Nachschlagen bei Bedarf. Replikation passt zu Historie, Ereignissen, Mengen und Unabhängigkeit von der Verfügbarkeit von SAP.
```

Die Grenze bei der Automatisierung steht im [Apex Developer Guide zu externen Objekten](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_external_objects_considerations.htm): Apex-Trigger sind für externe Objekte nicht verfügbar, mit einer Ausnahme für Change-Data-Capture-Ereignisse aus OData-4.0-Verbindungen. Flows können externe Objekte lesen, aber kein Flow startet von selbst, weil sich eine Zeile in SAP geändert hat. Die Grenzen bei Berichten listet die [Salesforce-Hilfe zu Berichten mit Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5): Umgerechnete Währungsfelder, Kreuzfilter, Bucket-Felder, Berichte zu historischen Trends und Formeln auf Zeilenebene werden nicht unterstützt. Das Hauptobjekt liefert bis zu 20.000 Datensätze, und bei großen Datenquellen geben Summen und Formeln womöglich nur eine Teilmenge der Daten wieder. Eine Liste der Rechnungen eines Kunden aus den letzten 24 Monaten funktioniert meist live, wenn der Dienst nach Kunde filtert; ein Management-Bericht über mehrere hunderttausend Rechnungspositionen gehört in einen replizierten Datenbestand oder ein Data Warehouse.

Die Ist-Mengen von Sales Agreements sind ein klarer Fall für Replikation. Die Manufacturing Cloud vergleicht sie mit den geplanten Mengen, also müssen sie in den dafür vorgesehenen Salesforce-Objekten liegen.

```praxis
Als ich Sales Agreements mit Ist-Mengen aus dem ERP in der Manufacturing Cloud eingeführt habe, war die ERP-Schnittstelle der Stolperstein.
```

Bei installierter Basis und Ersatzteilbestand hängt es vom Prozess ab. Der Arbeitsauftrag eines Technikers braucht das Asset in Salesforce. Der Bestand eines Lagers ändert sich stündlich, eine Kopie kann also kurz nach der Synchronisation veraltet sein, und eine Live-Abfrage kann hier die bessere Antwort sein. Welche Daten zwischen SAP und der Manufacturing Cloud wohin fließen und warum man den Auftragsstatus besser live abfragt, beschreibe ich in [Manufacturing Cloud und SAP: welche Daten wohin fließen](../manufacturing-cloud-sap-integration-datenfluesse/).

## Grenzen, die Sie vor dem Go-live prüfen

Für die Adapter OData 2.0, 4.0 und 4.01 setzt Salesforce kein Callout-Limit mehr, laut den [allgemeinen Grenzen für Salesforce Connect](https://help.salesforce.com/s/articleView?language=en_US&id=platform.platform_connect_general_limits.htm&type=5). Dieselbe Seite weist darauf hin, dass das Fremdsystem eigene Grenzen für den Datenverkehr haben kann. Andere Grenzen bleiben, teils aus der [Seite zu Berichten](https://help.salesforce.com/s/articleView?language=en_US&id=sf.platform_connect_considerations_reports.htm&type=5) und den [Grenzen der OData-Adapter](https://help.salesforce.com/s/articleView?id=platform.odata_general_limits.htm&language=en_US&type=5):

```kennzahlen
100 | externe Objekte pro Org als Standard, auf Anfrage bis 200
4 | Joins pro Abfrage über externe und andere Objekte
20.000 | Datensätze des Hauptobjekts in einem Bericht
16 MB | Ergebnismenge einer OData-Abfrage
quelle: Salesforce-Hilfe, General Limits for Salesforce Connect, Salesforce Connect Support for Reports und General Limits for the OData Adapters, Stand November 2026
```

Die Frage nach der Kapazität verlagert sich damit zu SAP. Rechenbeispiel: 300 Benutzer in Service und Vertrieb öffnen je 25 Account-Seiten am Tag, und jede Seite zeigt zwei Related Lists aus SAP. Löst jede Anzeige einer Liste eine Anfrage aus, sind das 15.000 Anfragen am Tag. Fallen 30 Prozent davon in die stärkste Stunde, muss SAP Gateway oder die Middleware in dieser Stunde 4.500 Anfragen beantworten, jede schnell genug, damit die Account-Seite nicht träge wirkt. Ein Händlerportal mit mehreren tausend Benutzern oder ein Batch-Job, der externe Objekte liest, vervielfacht das. Verstehen Sie diese Zahlen als erste Schätzung des Bedarfs. Für den Lasttest braucht die SAP-Basis zusätzlich die typische und die größte Ergebnismenge je Abfrage, die erwartete Antwortzeit und die Zahl paralleler Anfragen, Berichte und Batch-Jobs eingeschlossen.

Vereinbaren Sie auch den Umgang mit Ausfällen. Ist SAP langsam oder in Wartung, kann die Related List leer bleiben, und Benutzer dürfen das nicht mit einem Kunden ohne offene Posten verwechseln. Machen Sie es zum Kriterium für den Go-live, dass ein technischer Fehler anders aussieht als ein leeres Ergebnis, und testen Sie das, indem Sie den Endpunkt in der Sandbox abschalten. Legen Sie fest, welche Bildschirme von SAP abhängen dürfen, welche Antwortzeit für eine Account- oder Fallseite akzeptabel ist und wer antwortet, wenn Benutzer leere Listen melden.

## Portal und Zugriff: wer sieht welche SAP-Zeilen?

Dieser Punkt wird am häufigsten übersehen. Die externe Datenquelle meldet sich entweder mit einem gemeinsamen Login für alle an (Named Principal) oder mit einem Login je Benutzer, laut der [Objektreferenz zu ExternalDataSource](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_externaldatasource.htm). Ein Login je Benutzer bedeutet ein SAP-Konto je Salesforce-Benutzer, was für ein Händlerportal mit Hunderten von Firmen selten praktikabel ist. Mit einem gemeinsamen Login liefert der Endpunkt, was dieser eine SAP-Benutzer lesen darf. Der OData-Dienst weiß dann nicht, welcher Händler anfragt, außer der Benutzerkontext erreicht ihn auf einem Weg, den der Benutzer nicht verändern kann, etwa über OAuth je Benutzer.

Apex Managed Sharing ist für externe Objekte nicht verfügbar, Restriction Rules dagegen schon: Laut der [Salesforce-Dokumentation zu Restriction Rules](https://developer.salesforce.com/docs/atlas.en-us.restriction_rules.meta/restriction_rules/restriction_rules_about.htm) funktionieren sie für externe Objekte aus den Adaptern OData 2.0, OData 4.0 und Cross-Org, nicht für OData 4.01 oder den Custom Adapter, mit bis zu zwei aktiven Regeln je Objekt in der Enterprise Edition. Für ein Händlerportal nutze ich beide Ebenen: SAP beschränkt den technischen Benutzer auf die Daten, die das Portal überhaupt zeigen darf, und eine Restriction Rule in Salesforce beschränkt jeden Händler auf seine eigenen Kundennummern. Erreicht der Benutzerkontext SAP sicher, filtern Sie zusätzlich dort, denn dann legt eine falsche Regel in Salesforce nicht die Rechnungen eines anderen Händlers offen.

Testen Sie beide Ebenen als Portalbenutzer, nie als Admin, und nicht nur auf der Account-Seite: Tabs, Suche, Berichte und die API erreichen das externe Objekt ebenfalls. Testen Sie auch einen Händler mit mehreren SAP-Kundennummern, denn dort sind Listen am häufigsten unvollständig oder zeigen zu viel. Wer welche Daten einschränkt, gehört in die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), bevor jemand die Related List baut.

## Was Salesforce Connect im Vergleich zur Synchronisation kostet

Die [Salesforce-Preisliste für Plattform-Add-ons](https://www.salesforce.com/platform/pricing-add-ons/) nennt für Salesforce Connect 4.000 US-Dollar pro Verbindung und Monat, jährlich abgerechnet, für die Enterprise und die Unlimited Edition. Das sind 48.000 US-Dollar im Jahr zum Listenpreis. Dafür sparen Sie Datenspeicher für kopierte Rechnungen und den Aufwand, einen Synchronisationsjob zu bauen und zu überwachen.

Das Add-on ist nicht die ganze Rechnung. Auf der SAP-Seite brauchen Sie einen OData-Dienst, der aktiviert oder gebaut wird, SAP Gateway, SAP BTP oder ein API-Management davor, Authentifizierung und Zertifikate, einen Lasttest, Überwachung des Endpunkts und einen abgestimmten Störungsprozess über beide Systeme. Eine Synchronisation braucht vieles davon ebenso, aber sie läuft im Hintergrund, und ein langsames SAP bremst die Account-Seite nicht.

Mischformen sind häufig: Stammdaten und Status repliziert, die Belege selbst live; oder die zuletzt bekannten Werte in Salesforce gespeichert und bei Bedarf live aktualisiert. Betreiben Sie schon eine Middleware für Aufträge und Stammdaten, kann eine zusätzliche Synchronisation der offenen Posten nur zum Lesen weniger kosten als eine neue Verbindung. Haben Sie keine Middleware und wollen nur Rechnungen anzeigen, ist das Add-on oft der schnellere Weg. Ich vergleiche beide Varianten mit denselben drei Zahlen: einmaliger Bauaufwand auf beiden Seiten, laufende Kosten pro Jahr und wer bei einer Störung reagiert. Wie ich die Schnittstellen zwischen Salesforce und dem ERP meist aufteile, beschreibe ich auf der [Leistungsseite Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

```vertiefung Für Entwickler
titel: Salesforce Connect mit SAP einrichten
- Die externe Datenquelle im Setup mit der URL des OData-Dienstes anlegen, dann Validate and Sync; Salesforce erzeugt die externen Objekte aus den Metadaten des Dienstes, erkennbar an der Endung __x.
- Die indirekte Lookup-Beziehung auf ein eindeutiges External-ID-Feld am Account anlegen, das die SAP-Kundennummer enthält.
- Batch Apex mit Database.QueryLocator braucht Request Row Counts an der externen Datenquelle. Verursacht diese Option mit dem SAP-Dienst Fehler oder lange Ladezeiten, verzichten Sie auf solche Batch-Jobs für diese Quelle. Live-Daten, die sich während eines Batch-Jobs ändern, sind ein eigenes Konsistenzproblem: Testen Sie das mit einer stabilen Sortierung.
- Die Option High Data Volume ändert, welche Salesforce-Funktionen verfügbar sind, darunter Berichte. Prüfen Sie Anforderungen an Oberfläche, Suche, Berichte und Automatisierung, bevor Sie sie einschalten.
- Grenzen der OData-Adapter: 8 MB je Anfrage und Antwort, 16 MB je Ergebnismenge, 1.000 Zeilen je Unterabfrage.
```

## Erster Schritt: SAP-Daten je Bildschirm auflisten und markieren, was Salesforce damit macht

Nehmen Sie die Bildschirme, mit denen Ihre Benutzer täglich arbeiten: Account, Fall, Opportunity und, wenn vorhanden, das Portal. Notieren Sie für jede SAP-Information darauf, welches System sie führt, ob Salesforce sie nur anzeigt oder auch darauf reagiert, ihre Historie hält oder sie auswertet, und ob der Bildschirm bei einem SAP-Ausfall funktionieren muss. Zwei Zeilen aus einer solchen Liste: offene Posten, Account-Seite, SAP führt, nur anzeigen, Kandidat für Salesforce Connect. Ist-Mengen, Sales Agreement, SAP liefert, Manufacturing Cloud rechnet, Replikation. Ergänzen Sie die erwartete Zahl der Benutzer je Bildschirm, denn sie bestimmt die Last auf dem OData-Dienst.

```schritte
Auflisten | 1 Woche · Architekt und Fachbereich
  SAP-Daten je Bildschirm: Rechnungen, Lieferungen, offene Posten, Ist-Mengen, Bestand.
Markieren | 1 Tag · Architekt
  Nur anzeigen oder auch reagieren, Historie halten, auswerten, ohne SAP arbeiten.
Prüfen | 1 bis 2 Wochen · SAP-Basis
  Gibt es einen passenden OData-Dienst, wer filtert nach Kunde, welche Last ist zu erwarten.
Rechnen | 1 Tag · IT-Leitung
  Connect-Verbindung plus SAP-Seite gegen Synchronisation über die vorhandene Middleware, pro Jahr.
```

Schon der erste Workshop zeigt Kandidaten für Salesforce Connect; die vollständige Liste dauert etwa eine Woche. Die Prüfung durch die SAP-Basis und der Kostenvergleich entscheiden dann, ob sich das Add-on lohnt.
