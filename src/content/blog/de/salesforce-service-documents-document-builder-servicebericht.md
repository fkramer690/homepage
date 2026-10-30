---
title: "Salesforce Service Documents: reicht der Document Builder?"
description: "Was Salesforce Service Documents und der Document Builder im Field Service können, was sie kosten, wo die Grenzen liegen und wann Hersteller mehr brauchen."
pubDate: 2026-10-23
lang: de
slug: salesforce-service-documents-document-builder-servicebericht
translationKey: service-documents-document-builder
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Service Documents, Document Builder, Dokumentenerstellung, Fertigung]
takeaways:
  - "Salesforce Service Documents sind PDFs, die Field Service aus Arbeitsaufträgen, Auftragspositionen und Serviceterminen erzeugt. Die Vorlagen entstehen im Document Builder."
  - "Der Document Builder ist in den Lizenzen Field Service Dispatcher und Mobile enthalten, mit 250 Dokumenten pro Nutzer und Monat und einem einmaligen Zusatzkontingent von 10.000 Dokumenten."
  - "Seine Stärke ist der Servicebericht vor Ort: Kundenunterschrift, Fotos und Erstellung in der mobilen App, auch offline."
  - "Er erzeugt nur PDFs, nur auf drei Objekten und ohne dokumentierte Bedingungslogik. Prüfprotokolle, Maschinenakten und Angebote brauchen meist Document Generation oder ein AppExchange-Tool."
  - "Prüfen Sie Ihre bestehenden Berichte, Ihre iOS- und Android-Geräte und Ihr Dokumentenvolumen gegen die Grenzen, bevor Sie ein Zusatztool kaufen."
faq:
  - q: "Was sind Salesforce Service Documents?"
    a: "Service Documents sind PDF-Dokumente, die Salesforce Field Service zu einem Arbeitsauftrag (Work Order), einer Auftragsposition oder einem Servicetermin (Service Appointment) erzeugt. Die Vorlagen werden im Document Builder gestaltet, das Ergebnis liegt als Service-Report-Datensatz am Vorgang."
  - q: "Kostet der Document Builder im Field Service extra?"
    a: "Nein. Der Document Builder ist in den Permission Set Licenses Field Service Dispatcher und Field Service Mobile enthalten, inklusive 250 Dokumenten pro Nutzer und Monat. Contractor- und Contractor+-Lizenzen können ihn nicht nutzen."
  - q: "Funktionieren Service Documents offline in der Field Service App?"
    a: "Ja. Techniker erstellen Service Documents in der mobilen App auch ohne Verbindung, inklusive Unterschrift. Unter Android werden nur Vorlagen für Servicetermine unterstützt, unter iOS auch für Arbeitsaufträge."
  - q: "Wann brauche ich Salesforce Document Generation statt Document Builder?"
    a: "Wenn Sie Word-Vorlagen mit bedingten Abschnitten, Ausgabe als DOCX oder PowerPoint, Dokumente am Asset oder an Custom Objects, Massenerzeugung oder eine DocuSign-Anbindung brauchen. Das alles deckt der Document Builder nicht ab."
---

Salesforce Service Documents sind die PDFs, die Field Service aus einem Arbeitsauftrag oder Servicetermin erzeugt: der Servicebericht mit Arbeitszeit, Ersatzteilen, Fotos und Kundenunterschrift. Die Vorlagen baut man im Document Builder, der ohne Aufpreis in den Field-Service-Lizenzen steckt. Für den klassischen Servicebericht im Außendienst, auch offline, ist das die richtige Wahl. Für Prüfprotokolle mit Bedingungslogik, Dokumente am Asset, Word-Ausgabe oder Massenläufe reicht er nicht. Dann brauchen Sie Salesforce Document Generation oder ein Tool aus dem AppExchange.

## Was sind Salesforce Service Documents?

Ein Service Document ist ein PDF, das Salesforce Field Service zu einem von drei Datensätzen erzeugt: Arbeitsauftrag (Work Order), Auftragsposition (Work Order Line Item) oder Servicetermin (Service Appointment). Salesforce speichert das Ergebnis als Service-Report-Datensatz am Vorgang. Das Dokument liegt also dort, wo Disposition und Innendienst ohnehin suchen.

Der Document Builder ist der Editor für die Vorlagen. Er läuft im Lightning App Builder und funktioniert per Drag-and-drop: Standardkomponenten für Felder, Tabellen mit verknüpften Datensätzen, Bildergalerien und Unterschriftsfelder. Reicht eine Standardkomponente nicht, können Entwickler eigene Lightning Web Components bauen. Salesforce weist darauf hin, dass diese ein eigenes Druck-Styling brauchen. Komponenten aus der mobilen App lassen sich also nicht einfach wiederverwenden.

Eingeführt hat Salesforce Service Documents mit dem Release Spring '24. Die passende Aktion `createServiceDocument` gibt es ab API-Version 60.0. Damit lassen sich Dokumente auch aus einem Flow oder über die REST-API erzeugen. Die [Entwicklerdokumentation zur Aktion](https://developer.salesforce.com/docs/atlas.en-us.api_action.meta/api_action/actions_obj_create_service_document.htm) nennt zusätzlich Dokumenttypen für Angebote. Der Grund: Salesforce nutzt dieselbe Technik für Angebots-PDFs in Revenue Cloud. Wie Angebote dort funktionieren, steht in [Kapitel 3 der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/).

Nicht verwechseln sollten Sie den Namen mit S-Docs. S-Docs ist ein eigenständiges Produkt im AppExchange und hat mit dieser Funktion nichts zu tun.

## Was kostet der Document Builder?

Nichts extra, solange Field Service lizenziert ist. Laut [Salesforce-Hilfe zu den Berechtigungen](https://help.salesforce.com/s/articleView?id=fs_document_builder_perm_sets.htm&language=en_US&type=5) brauchen Nutzer entweder die Permission Set License Field Service Dispatcher oder Field Service Mobile.

```hinweis achtung
Contractor- und Contractor+-Lizenzen sind ausgeschlossen. Das ist wichtig, wenn Subunternehmer Dokumente erstellen sollen.
```

Das Volumen ist begrenzt:

```kennzahlen
250 | Dokumente pro Nutzer und Monat mit Dispatcher-, Dispatcher-Plus- oder Mobile-Lizenz
10.000 | Dokumente als einmaliges Zusatzkontingent, wenn die Org mehr braucht
quelle: Salesforce-Hilfe zu Document Builder und zu den Field-Service-Limits
```

Eine schnelle Rechnung: Ein Techniker mit fünf Einsätzen am Tag und 21 Arbeitstagen erstellt rund 105 Berichte im Monat. Das liegt deutlich unter der Grenze. Eng wird es, wenn pro Einsatz mehrere Dokumente entstehen, etwa Servicebericht, Checkliste und eine korrigierte Fassung nach einer Reklamation.

Die Einrichtung dauert etwa eine Stunde. Sie legen ein Permission Set ohne Lizenz an, aktivieren die Systemberechtigungen "Document Builder" und "Lightning SDK for Field Service Mobile" und weisen es Disponenten und Technikern zu. Außerdem muss das Vorlagenfeld auf die Seitenlayouts von Arbeitsauftrag und Servicetermin, sonst kann niemand eine Vorlage wählen.

## Was können Service Documents im Außendienst?

Die Stärke des Document Builder ist der Moment an der Maschine des Kunden:

- **Offline-Erstellung.** Techniker erzeugen das Dokument in der Field Service App, auch ohne Verbindung. In einer Werkshalle oder einem Technikraum im Keller passiert das täglich.
- **Unterschriften.** Jede Vorlage unterstützt Unterschriftstypen wie Kunde und Techniker. Müssen zwei Personen derselben Rolle unterschreiben, nummerieren Sie die Typen (Customer1, Customer2).
- **Fotos.** Bildergalerien zeigen, was der Techniker fotografiert hat, zum Beispiel den Zustand vor und nach der Reparatur.
- **Verknüpfte Datensätze.** Tabellen zeigen bis zu 1.000 verknüpfte Datensätze, etwa verbaute Ersatzteile oder Arbeitsschritte.
- **Übersetzungen.** Vorlagen lassen sich in viele Sprachen übersetzen, Deutsch inklusive. Für Hersteller mit Serviceteams in mehreren Ländern spart das eigene Vorlagen pro Sprache.

```staerken-grenzen
titel: Document Builder: stark für den Servicebericht vor Ort
+ Unterschrift | Kunde und Techniker, auch offline in der mobilen App
+ Fotos | Bildergalerien, z. B. vor und nach der Reparatur
+ Deutsche Übersetzung | eine Vorlage für mehrere Länder
+ Enthalten | in der Field-Service-Lizenz, 250 Dokumente pro Nutzer und Monat *
- Format | nur PDF und nur synchron
- Objekte | nur Arbeitsauftrag, Auftragsposition und Servicetermin
- Android | nur Servicetermin
- Umfang | maximal 50 Seiten und 100 MB
- Logik | keine dokumentierte Bedingungslogik
besser: Für Prüfprotokolle, Maschinenakten, Angebote und Massenläufe: Salesforce Document Generation oder ein AppExchange-Tool.
```
## Wo liegen die Grenzen des Document Builder?

Die [Übersicht der Field-Service-Limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) listet sie auf. Diese zählen in Projekten bei Herstellern:

- **Nur drei Objekte.** Vorlagen gibt es für Arbeitsauftrag, Auftragsposition und Servicetermin. Ein Wartungsprotokoll am Asset oder ein Dokument an einem Custom Object ist nicht möglich.
- **Android hinkt hinterher.** Unter iOS können Techniker Vorlagen für Arbeitsauftrag und Servicetermin nutzen, unter Android nur für Servicetermine. Arbeiten Ihre Techniker mit Android-Geräten, muss sich die Vorlagenstrategie danach richten.
- **Die falsche Vorlage auf dem Tablet.** Erstellt ein Techniker auf dem Mobilgerät ein Dokument aus dem Arbeitsauftrag, bietet die App die Vorlage des Servicetermins an. Planen Sie das in der Schulung ein oder bauen Sie nur Vorlagen für Servicetermine.
- **Nur PDF, nur synchron.** Keine Word-Ausgabe und keine Massenläufe, etwa um am Quartalsende alle Wartungsberichte eines Vertrags zu verschicken.
- **Umfang.** Höchstens 50 Seiten und 100 MB pro Dokument. Für einen Servicebericht reicht das, für die Dokumentation einer ganzen Produktionslinie nicht.
- **Lücken in der Darstellung.** Lookup-Felder in verknüpften Listen zeigen Datensatz-IDs statt Namen, Bild-URLs werden nicht gerendert, Rich Text druckt nur schwarz, lange Textfelder gehen in verknüpften Listen nicht. Formelfelder helfen oft, aber das sollten Sie vor dem Vorlagen-Workshop wissen.
- **Übersetzung.** Im Rich Text werden nur Custom Labels übersetzt. Layouts für Schriften von rechts nach links werden nicht unterstützt.

Am meisten fehlt mir Bedingungslogik. Salesforce dokumentiert keine bedingten Abschnitte wie "Druckprüfung nur für diesen Maschinentyp anzeigen". Wenn Ihre Prüfprotokolle heute so aufgebaut sind, bildet der Document Builder sie nicht ab. Fünf kleinere Lücken, von der Vorlagenwahl bis zur E-Mail, lassen sich mit Flows und Komponenten schließen; ich beschreibe sie in [Document Builder: fünf Grenzen und Workarounds](../salesforce-document-builder-grenzen-workarounds/).

## Was ich bei Tool-Auswahlen sehe

Ich begleite Kunden regelmäßig bei Make-or-buy-Entscheidungen, und Dokumentenerstellung mit E-Signatur ist eines der wiederkehrenden Themen. Mein Vorgehen ist jedes Mal gleich: zuerst eine Bestandsaufnahme aller Dokumente mit Volumen, Datenquelle und wer unterschreibt, danach die Kosten über mehrere Jahre. Dazu gehören Lizenzen für jede Nutzergruppe, die Umsetzung, die Wartung mit jedem Salesforce-Release und die Folgekosten, falls Sie später wechseln müssen.

Auf Field Service übertragen zerfällt die Bestandsaufnahme in zwei Gruppen. Der Servicebericht aus dem Außendienst ist nach Volumen die große Gruppe, und die deckt der Document Builder ab. Die kleinere Gruppe enthält die Dokumente mit Logik: Prüfprotokolle, Zertifikate, Angebote, Vertragsunterlagen. Für diese Gruppe ist ein zweites Tool oft gerechtfertigt. Den Fehler, den ich vermeiden will: wegen der kleinen Gruppe das große Tool für alles zu kaufen und Lizenzen für jeden Techniker zu bezahlen, der nur den Servicebericht braucht.

Field Service selbst lohnt sich am meisten bei vielen kurzen Einsätzen, wo Terminplanung und Routenoptimierung die Kennzahlen verbessern. Das sind auch die Organisationen mit den meisten Serviceberichten. Der Standard deckt also den Großteil des Volumens genau dort ab, wo Field Service am besten passt.

## Welche Alternative passt zu welchem Dokument?

- **Klassische Service Reports.** Der ältere Vorlageneditor in Field Service. Bewährt und einfach, bis zu 20 Unterschriftsblöcke, aber wenig Gestaltungsspielraum. Abschnittstitel lassen sich nicht übersetzen, und in der Salesforce Mobile App steht die Aktion nicht zur Verfügung.
- **Salesforce Document Generation.** Word-Vorlagen mit Platzhaltern und bedingten Abschnitten, für alle Standard- und Custom Objects, Ausgabe als PDF, DOCX oder PPTX, synchron und als Massenlauf, DocuSign-Anbindung. Nicht offline und nicht mobil. Sie braucht eine eigene Lizenz; Salesforce vergleicht beide im [Hilfeartikel zu Document Builder und Document Generation](https://help.salesforce.com/s/articleView?id=ind.sf_docgen_understand_doc_builder_and_doc_generation.htm&language=en_US&type=5).
- **OmniStudio Document Generation.** Wie Document Generation, zusätzlich externe Daten über DataRaptors und Integration Procedures. Setzt OmniStudio voraus, das mit den Industry Clouds und einigen Revenue-Cloud-Editionen kommt.
- **AppExchange-Tools** wie S-Docs, Conga Composer oder Nintex DocGen. Ausgereifte Vorlagenlogik, viele Formate, Anbindungen an E-Signatur-Dienste. Sie kosten pro Nutzer extra und bringen ein weiteres Tool in den Betrieb. Klären Sie Offline-Fähigkeit und Preise beim Anbieter, bevor Sie entscheiden.

Die Kombination, die oft sinnvoll ist: Document Builder für alles, was der Techniker vor Ort erstellt, und ein Tool zur Dokumentenerstellung für den Innendienst, lizenziert nur für die Nutzer, die es brauchen.

## Wie fangen Sie am besten an?

1. **Sammeln Sie Ihre heutigen Berichte.** Jedes Papierformular und jedes PDF, das Techniker und Serviceinnendienst heute erstellen, mit dem Volumen pro Monat.
2. **Prüfen Sie sie gegen die Grenzen oben.** Objekt, Bedingungslogik, Seitenzahl, Ausgabeformat, wer unterschreibt.
3. **Prüfen Sie Ihre Geräte.** iOS oder Android entscheidet, welche Vorlagen mobil nutzbar sind.
4. **Bauen Sie eine Vorlage im Document Builder**, meist den Standard-Servicebericht, und testen Sie sie mit zwei Technikern in einem echten Einsatz, auch offline.
5. **Planen Sie erst dann ein zweites Tool**, für die Dokumente, die in Schritt 2 durchgefallen sind, und rechnen Sie über mehrere Jahre statt mit dem Preis im ersten Jahr.

In den meisten Field-Service-Projekten deckt der Standard den Servicebericht ab, und das Zusatztool lohnt sich für eine kurze Liste von Dokumenten mit Logik. Was die neuen mobilen Funktionen für Techniker bedeuten, steht in [meinem Artikel zu geführten Abläufen und Spracheingabe im Außendienst](../salesforce-field-service-mobile-aussendienst/).
