---
title: "SAP an Salesforce anbinden: Leitfaden für Hersteller"
description: "SAP to Salesforce für Hersteller: wer welche Daten führt, welche Muster passen, MuleSoft oder SAP Integration Suite und was S/4HANA für Schnittstellen heißt."
pubDate: 2026-10-29
lang: de
slug: sap-salesforce-anbinden-ueberblick
translationKey: sap-salesforce-integration-overview
topic: data
categories: [architecture]
contactBrief: integration
tags: [SAP, Salesforce SAP Integration, MuleSoft, SAP Integration Suite, S/4HANA, Schnittstellen]
takeaways:
  - "Am Anfang einer SAP-to-Salesforce-Integration steht eine Landkarte: Jedes Geschäftsobjekt und, wo nötig, jedes kritische Feld hat genau ein führendes System."
  - "Die meisten SAP-Umgebungen kombinieren wenige Muster: Batch, Live-Abfrage, Auftragsübergabe mit Status zurück und Lesen zur Laufzeit."
  - "MuleSoft und SAP Integration Suite binden beide Salesforce an. Es entscheiden Ihr Integrationsstandard und der Betrieb, nicht die Konnektorliste."
  - "BAPI, RFC und IDoc verschwinden mit S/4HANA nicht einfach. Prüfen Sie jede Schnittstelle und verbergen Sie SAP hinter einem stabilen fachlichen Vertrag."
  - "Eine Schnittstelle ist fertig, wenn Fehler sichtbar sind, Dubletten ausgeschlossen sind und beide Seiten ihre Daten abgleichen können."
faq:
  - q: "Wie verbinde ich SAP mit Salesforce?"
    a: "Zuerst legen Sie fest, welches System Kunden, Produkte, Preise und Aufträge führt und welches Muster jede Verbindung braucht: Batch, Live-Abfrage, Auftragsübergabe mit Bestätigung oder Lesen zur Laufzeit. Danach wählen Sie die Plattform: MuleSoft, SAP Integration Suite, eine andere Integrationsplattform oder bei wenigen einfachen Schnittstellen eine direkte API-Anbindung."
  - q: "Brauche ich MuleSoft für SAP und Salesforce?"
    a: "Nein. MuleSoft hat einen OData-Konnektor für S/4HANA-APIs und einen SAP-Konnektor für RFC, BAPI und IDoc, der eine eigene Lizenz braucht. SAP Integration Suite hat eigene Salesforce-Adapter. Betreibt Ihr Unternehmen eine der beiden Plattformen schon als Integrationsstandard, ist das meist der bessere Ausgangspunkt."
  - q: "Kann Salesforce SAP-Daten anzeigen, ohne sie zu kopieren?"
    a: "Ja, mit Salesforce Connect, das eine eigene Lizenz braucht; prüfen Sie Edition und Vertrag. Externe Objekte lesen Daten zur Laufzeit über OData 2.0 oder 4.0 oder einen eigenen Adapter. Das passt für Rechnungen oder Lieferungen, die Nutzer kundenweise nachschlagen, solange SAP schnell und zuverlässig antwortet und die Grenzen bei Suche und Berichten tragbar sind."
  - q: "Was ändert der Wechsel von SAP ECC auf S/4HANA für Salesforce?"
    a: "Das hängt von der Schnittstelle ab. S/4HANA unterstützt weiter viele BAPIs, RFCs und IDocs, aber Geschäftsobjekte ändern sich, zum Beispiel werden Kunden zentral als Geschäftspartner gepflegt. Prüfen Sie jede Schnittstelle, etwa mit dem SAP Readiness Check, und geben Sie Salesforce einen stabilen fachlichen Vertrag in der Middleware."
draft: false
---

SAP an Salesforce anzubinden heißt, festzulegen, wer welche Daten führt, und dann für jede Verbindung das passende Muster zu wählen: Stammdaten per Batch, Preise und Verfügbarkeit live, Aufträge per Übergabe mit Bestätigung, große Historien zur Laufzeit gelesen. Erst danach geht es um die Technik, also MuleSoft, SAP Integration Suite oder eine direkte Anbindung. Für Hersteller zählt diese Reihenfolge, weil Ersatzteile, Verfügbarkeit, installierte Basis und Auftragsstatus oft aus SAP stammen und in Vertrieb und Service gebraucht werden.

## Welches System führt für welche Daten?

Die meisten Integrationsprobleme beginnen mit einer unklaren Antwort auf diese Frage. Können Salesforce und SAP dieselbe Kundenadresse oder denselben Preis ändern, sind sich die beiden Systeme früher oder später uneinig. Selten führt dabei ein System das ganze Objekt. Typisch ist: Ein Interessent entsteht in Salesforce, SAP vergibt später Kundennummer und Zahlungsbedingungen, und die Kontakte können weiter in Salesforce geführt werden. Manche Unternehmen haben zudem ein drittes führendes System: SAP Master Data Governance für Kunden, ein PIM oder PLM für Produkte, eine Pricing Engine für Preise.

```tabelle
titel: Systemlandkarte, vereinfachtes Beispiel aus der Fertigung
spalten: Daten | Führt * | Salesforce | SAP
Interessenten und Kontakte | Salesforce | legt an und pflegt | erhält auftragsrelevante Kontakte
Kunde mit Aufträgen | SAP oder SAP MDG | ergänzt die Vertriebssicht | Kundennummer, Zahlungsbedingungen, Kreditlimit
Produkte | SAP, oft gespeist aus PLM oder PIM | liest, was Vertrieb und Service brauchen | Materialstamm
Preise und Konditionen | meist SAP | fragt ab oder rechnet nach Regeln | Konditionen
Aufträge, Lieferungen, Rechnungen | SAP | übergibt Aufträge, zeigt Status | verarbeitet und fakturiert
Fälle, Einsätze, Servicehistorie | Salesforce | führt, mit Verweis auf SAP-Aufträge | erhält abrechenbare Leistungen
fazit: Ein Beispiel, keine Vorlage. Halten Sie das führende System je Objekt und Lebenszyklusphase fest, bei wechselnder Datenhoheit auch je Feld.
```

Am stärksten unterscheiden sich Unternehmen bei Preisen. Ob Kundenpreise aus SAP-Konditionen kommen oder in Salesforce neu entstehen, vergleiche ich in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/). Die Landkarte gehört zur Architektur und nicht in die Spezifikation einer einzelnen Schnittstelle. Für die Aufteilung zwischen Teams funktioniert die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) genauso.

## Welche Integrationsmuster passen für SAP?

Salesforce beschreibt in seinem [Architektur-Leitfaden](https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html) sechs Integrationsmuster, eingeteilt nach Art der Integration und Zeitpunkt. Jede Schnittstelle nutzt eines davon, und die meisten SAP-Umgebungen kombinieren vier, dazu den Rückweg für den Status:

- **Batch Data Synchronization** für Daten, die einige Stunden alt sein dürfen, etwa Preislisten oder Produktstammdaten. Nicht alle Stammdaten passen dazu: Ein neu angelegter oder gesperrter Kunde kann binnen Minuten in Salesforce gebraucht werden. Entscheidend sind die nötige Aktualität und die Folgen veralteter Daten. Ob es Stammdaten sind, spielt dafür keine Rolle.
- **Request and Reply** für Live-Abfragen, etwa Verfügbarkeit, kundenspezifischer Preis oder Auftragsstatus. Laut Leitfaden passt das Muster für kleine Datenmengen in Echtzeit, nicht für Massendaten.
- **Fire and Forget** für die Übergabe von Aufträgen an SAP. Salesforce wartet nicht, SAP bestätigt später. Der Rückweg ist ein eigenes Muster, Remote Call-In: SAP oder die Middleware schreibt Auftragsnummer, Ablehnung und Statusänderungen über die API oder als Ereignis nach Salesforce. Für Aufträge funktioniert das nur mit Bestätigung: SAP meldet Auftragsnummer oder Ablehnung zurück, jeder Auftrag trägt einen eindeutigen Schlüssel, den SAP prüft, damit ein erneuter Versuch keinen zweiten Auftrag anlegt, und jemand sieht die Aufträge, die nicht angekommen sind. Müssen Kreditlimit, Preis oder Verfügbarkeit geprüft werden, solange der Kunde noch wartet, kommt zuerst eine Live-Prüfung und danach die asynchrone Übergabe.
- **Data Virtualization** mit Salesforce Connect. [Externe Objekte](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_external_objects.htm) lesen Daten zur Laufzeit über OData 2.0 oder 4.0, ohne sie in Salesforce zu speichern. Das passt für Rechnungen oder Lieferungen, von denen ein Servicemitarbeiter jeweils nur die eines Kunden braucht. Salesforce Connect braucht eine eigene Lizenz (Edition und Vertrag prüfen), SAP muss in dem Moment schnell antworten, in dem der Nutzer die Seite öffnet, und Suche, Berichte und Automatisierung funktionieren auf externen Objekten nur eingeschränkt.

Für komplexe Fälle empfiehlt der Leitfaden eine Middleware: wenn Daten transformiert, aus mehreren Systemen zusammengeführt oder über mehrere Systeme hinweg konsistent gehalten werden müssen.

## MuleSoft, SAP Integration Suite oder direkt?

Die Konnektorlisten beider Plattformen ähneln sich. Wichtiger sind vier Fragen: Welche Integrationsplattform ist in Ihrem Unternehmen schon Standard? Wer betreibt die Schnittstellen im Alltag, das SAP-Team oder das CRM-Team? Wie viele Systeme neben SAP und Salesforce sind beteiligt? Und wie viele Schnittstellen nutzen mehrere Kanäle, etwa ein Auftragsstatus für Portal, Shop und Agent?

- **MuleSoft** gehört zu Salesforce und bringt Konnektoren für beide SAP-Welten mit. Der [SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) unterstützt die OData-APIs von S/4HANA Cloud und on-premise. Der [SAP Connector](https://docs.mulesoft.com/sap-connector/latest/) arbeitet mit BAPI, RFC und IDoc, für ECC ebenso wie für S/4HANA on-premise, und braucht eine eigene Lizenz und die Bibliotheken von SAP. Eine häufige Konstellation: Salesforce und andere Nicht-SAP-Systeme überwiegen, und ein Integrationsteam außerhalb von SAP betreibt die Schnittstellen.
- **SAP Integration Suite** ist die Plattform von SAP. SAP liefert dort eigene [Salesforce-Adapter](https://help.sap.com/docs/integration-suite/sap-integration-suite/salesforce-adapter) für Sender- und Empfängerseite und für Salesforce-Ereignisse (Pub/Sub), und die Plattform erreicht SAP-Systeme im eigenen Rechenzentrum über den SAP Cloud Connector. Eine häufige Konstellation: Die Plattform ist schon im Haus, und die SAP-Organisation betreibt die Schnittstellen. Beide Plattformen verbinden auch Systeme anderer Hersteller.
- **Direkte Anbindung** passt für ein oder zwei HTTP-basierte APIs mit wenig Mapping, etwa eine Statusabfrage aus Salesforce an einen OData-Service von S/4HANA. Wiederholung, Überwachung und Zertifikate müssen dann in Salesforce oder SAP selbst gelöst werden. Für RFC und IDoc braucht Salesforce immer eine Komponente dazwischen.

```pro-contra
pro: Middleware
- Schnittstellen werden wiederverwendbar, etwa ein Auftragsstatus für Portal, Shop und Agent
- Fehler sind an einer Stelle sichtbar
- Ein stabiler fachlicher Vertrag kann den Wechsel von ECC auf S/4HANA verbergen
contra: Was sie kostet
- Lizenz und Betrieb einer weiteren Plattform
- Ein Team, das die Plattform beherrscht
- Bei zwei, drei Schnittstellen oft mehr Aufwand als Nutzen
```

Meine eigene MuleSoft-Erfahrung stammt aus einem globalen CTI-Rollout, nicht aus einer SAP-Schnittstelle. Für die Umsetzung arbeite ich mit Partnern, die Integrationserfahrung aus großen internationalen Programmen haben. Architektur und Plattformwahl bleiben dabei auf Kundenseite, und ich entscheide mit dem Kunden, welcher Partner sie umsetzt. Wie ich Schnittstellen plane, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Was ändert der Wechsel auf S/4HANA?

Viele Hersteller betreiben noch SAP ECC und planen den Umstieg auf S/4HANA. SAP hat die Fristen im [Februar 2020](https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/) festgelegt:

```zeitleiste
2027-12-31 | Reguläre Wartung für Kernanwendungen der SAP Business Suite 7 wie ERP 6.0 endet
2030-12-31 | Optionale verlängerte Wartung für ECC endet
2040-12-31 | Zusage von SAP für S/4HANA: mindestens ein Release in Wartung
```

BAPI, RFC und IDoc verschwinden mit S/4HANA nicht. Viele davon bleiben unterstützt. Daneben gibt es für viele Szenarien freigegebene OData- und SOAP-APIs, deren Umfang sich je Edition und Release unterscheidet. Was sich ändert, sind Geschäftsobjekte und Prozesse: Kunden werden zentral als Geschäftspartner gepflegt, Statuswerte und Pflichtfelder ändern sich, manche Objekte werden vereinfacht. Manche Schnittstellen laufen deshalb weiter, andere brauchen Anpassungen oder einen Neubau. Der SAP Readiness Check listet die bestehenden Schnittstellen eines Systems auf und zeigt, welche betroffen sind.

Für Salesforce heißt das: Kapseln Sie die SAP-Seite hinter einem stabilen fachlichen Vertrag in der Middleware. Salesforce ruft dann „Auftragsstatus abfragen“ mit eigenen Feldern auf und muss nicht wissen, ob dahinter ECC oder S/4HANA antwortet. Eine Middleware, die SAP-Strukturen nur durchreicht, schützt Sie nicht, sie verschiebt die Abhängigkeit nur. Laufen Salesforce-Einführung und S/4HANA-Umstieg parallel, gehört diese Abhängigkeit in den gemeinsamen Programmplan.

## Fertig ist eine Schnittstelle, wenn sie sich betreiben lässt

Viele SAP-Schnittstellen funktionieren im Test und scheitern im Alltag. Vor dem Go-live prüfe ich für jede Schnittstelle, ob diese Punkte geklärt sind:

- **Keine Dubletten:** Jeder Auftrag und jede Änderung trägt einen eindeutigen Schlüssel, den der Empfänger prüft, sodass eine wiederholte Anfrage keinen zweiten Auftrag anlegt.
- **Fehler mit Verantwortlichem:** Technische Fehler werden automatisch wiederholt, fachliche Fehler wie ein gesperrter Kunde gehen an eine benannte Person im Fachbereich.
- **Abgleich:** Ein regelmäßiger Vergleich zeigt, ob beide Systeme dieselben Aufträge und Status haben.
- **Überwachung:** Jemand sieht eine hängende Schnittstelle, bevor Vertrieb oder Service anrufen.
- **Technischer Benutzer und Anmeldung:** Jede Schnittstelle meldet sich mit einem erkennbaren technischen Benutzer an, der nur die Rechte hat, die er braucht.

```hinweis achtung
Der OAuth Username-Password Flow für Connected Apps funktioniert ab dem 20. Februar 2027 nicht mehr. Prüfen Sie, welche Ihrer SAP-Schnittstellen sich noch so an Salesforce anmelden, wie in [Salesforce-Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/) beschrieben.
```

## Jedes Salesforce-Produkt bringt eine eigene Integrationsfrage

Die Produkte brauchen andere SAP-Daten, und jedes wirft eine andere Architekturfrage auf:

- **Manufacturing Cloud:** Ist-Mengen für Sales Agreements kommen unter Umständen in großen Paketen und werden später korrigiert, die Frage ist der Zeitpunkt und der Umgang mit Gutschriften. Beschrieben in [Manufacturing Cloud und SAP: welche Daten wohin](../manufacturing-cloud-sap-integration-datenfluesse/).
- **B2B Commerce:** Im Warenkorb und beim Checkout wartet der Kunde auf eine Antwort. Live-Abfragen brauchen deshalb kurze Antwortzeiten und ein Ersatzverfahren, falls SAP nicht antwortet. In [B2B Commerce und SAP](../b2b-commerce-sap-datenfluesse/).
- **Revenue Cloud:** Angebot, Vertrag und Rechnung gehen über die Systemgrenze. Zu klären ist, welches System welchen Schritt im Quote-to-Cash führt. In [Revenue Cloud und SAP](../revenue-cloud-sap-quote-to-cash-aufteilung/).
- **Field Service:** Arbeiten Techniker offline, müssen die nötigen Ersatzteile, Bestände und Anlagen vor dem Einsatz auf dem Gerät sein. In [Ersatzteile im Außendienst](../salesforce-field-service-ersatzteile-erp/).
- **Agentforce:** Ein Agent ruft freigegebene Aktionen mit eigener technischer Identität auf, die Frage ist, welche Aktionen er auslösen darf und wie seine Zugriffe protokolliert werden. In [Agentforce und SAP](../agentforce-sap-auftragsstatus/).

```praxis
Ich habe Sales Agreements mit Ist-Mengen aus dem ERP in der Manufacturing Cloud eingeführt, und die ERP-Schnittstelle war dabei der Stolperstein. In Field-Service-Projekten kamen Ersatzteile und installierte Basis aus dem ERP, und auch dort waren die ERP-Schnittstellen einer der Stolpersteine.
```

## Mit der Landkarte der Daten beginnen

Zeichnen Sie die Landkarte, bevor Sie über Werkzeuge sprechen: eine Zeile pro Geschäftsobjekt, eine Spalte für das führende System, eine für die Richtung und eine für den Zeitpunkt, also Batch, live, Übergabe oder Lesen zur Laufzeit. Markieren Sie die Felder, bei denen die Führung wechselt. Listen Sie dann auf, welche Schnittstellen es heute gibt, und lassen Sie das SAP-Team prüfen, welche davon ein geplanter S/4HANA-Umstieg betrifft. Erst mit dieser Liste lässt sich entscheiden, ob sich eine Middleware lohnt und welche. Am Ende stehen drei Dokumente: eine abgestimmte Landkarte der Datenhoheit, eine Schnittstellenliste mit Muster, nötiger Aktualität und einem Verantwortlichen auf Kundenseite, der nach dem Go-live die Fehlerbearbeitung übernimmt, und die Plattformentscheidung auf Basis von beidem.
