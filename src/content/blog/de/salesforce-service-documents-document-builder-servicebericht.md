---
title: "Salesforce Service Documents: reicht der Document Builder?"
metaTitle: "Salesforce Document Builder für den Servicebericht"
description: "Was Salesforce Service Documents und der Document Builder im Field Service können, was sie kosten, wo die Grenzen liegen und wann Hersteller mehr brauchen."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-service-documents-document-builder-servicebericht
translationKey: service-documents-document-builder
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Service Documents, Document Builder, Dokumentenerstellung, Fertigung]
takeaways:
  - "Service Documents sind PDFs, die Field Service aus Arbeitsaufträgen, Positionen und Terminen erzeugt. Die Vorlagen entstehen im Document Builder."
  - "Der Document Builder ist in den Lizenzen Dispatcher und Mobile enthalten. Die Org erhält 250 Dokumente pro Nutzer und Monat, dazu einmalig 10.000."
  - "Seine Stärke ist der Servicebericht vor Ort: Kundenunterschrift, Fotos und Erstellung in der mobilen App, auch offline."
  - "Field-Service-Vorlagen gibt es für drei Objekte, nur als PDF, mit Ein- und Ausblenden je Komponente. Komplexe Logik und Massenläufe erfordern ein anderes Tool."
  - "Prüfen Sie Ihre bestehenden Berichte, Ihre iOS- und Android-Geräte und Ihr Dokumentenvolumen anhand der Grenzen, bevor Sie ein Zusatztool kaufen."
faq:
  - q: "Was sind Salesforce Service Documents?"
    a: "Service Documents sind PDF-Dokumente, die Salesforce Field Service zu einem Arbeitsauftrag (Work Order), einer Arbeitsauftragsposition oder einem Servicetermin (Service Appointment) erzeugt. Die Vorlagen werden im Document Builder gestaltet, das Ergebnis liegt als Service-Report-Datensatz am Vorgang."
  - q: "Kostet der Document Builder im Field Service extra?"
    a: "Nein. Der Document Builder ist in den Permission Set Licenses Field Service Dispatcher und Field Service Mobile enthalten. Die Org erhält dafür 250 Dokumente pro Monat für jeden Nutzer mit einer solchen Lizenz. Die Hilfeseite zu den Berechtigungen schließt Contractor- und Contractor+-Lizenzen aus."
  - q: "Funktionieren Service Documents offline in der Field Service App?"
    a: "Ja. Techniker erstellen Service Documents in der mobilen App auch ohne Verbindung, inklusive Unterschrift. Bei Android widerspricht sich die Salesforce-Hilfe: Die Limits-Seite erlaubt nur Vorlagen für Servicetermine, die Seite zum Anlegen von Vorlagen nennt alle drei Objekte. Testen Sie es auf Ihren Geräten."
  - q: "Wann brauche ich Salesforce Document Generation statt Document Builder?"
    a: "Wenn Sie Word-Vorlagen mit komplexer Logik, Ausgabe als DOCX oder PowerPoint, Dokumente am Asset oder an Custom Objects, Massenerzeugung oder eine DocuSign-Anbindung brauchen. Das alles deckt der Document Builder nicht ab; er kann Komponenten nur nach Kriterien ein- oder ausblenden."
  - q: "Kann ein Flow ein Document-Builder-Dokument erzeugen?"
    a: "Ja. Die Aktion createServiceDocument, verfügbar ab API-Version 60.0, erzeugt ein Service Document aus einem Flow oder über die REST API. Das hilft, wenn der Bericht automatisch entstehen soll, zum Beispiel beim Abschluss des Arbeitsauftrags, und nicht erst, wenn der Techniker auf den Knopf tippt."
---

Salesforce Service Documents sind die PDFs, die Field Service aus einem Arbeitsauftrag oder Servicetermin erzeugt: der Servicebericht mit Arbeitszeit, Ersatzteilen, Fotos und Kundenunterschrift. Die Vorlagen baut man im Document Builder, der ohne Aufpreis in den Field-Service-Lizenzen steckt. Für den klassischen Servicebericht im Außendienst, auch offline, ist das die richtige Wahl. Einfache Bedingungen gehen auch, denn jede Komponente lässt sich nach Kriterien ein- oder ausblenden. Für Dokumente am Asset, Word-Ausgabe, Massenläufe oder Prüfprotokolle mit komplexerer Logik als bloßem Ein- und Ausblenden reicht er nicht. Dann brauchen Sie Salesforce Document Generation oder ein Tool aus dem AppExchange.

## Was sind Salesforce Service Documents?

Ein Service Document ist ein PDF, das Salesforce Field Service zu einem von drei Datensätzen erzeugt: Arbeitsauftrag (Work Order), Arbeitsauftragsposition (Work Order Line Item) oder Servicetermin (Service Appointment). Salesforce speichert das Ergebnis als Service-Report-Datensatz am Vorgang. Das Dokument liegt also dort, wo Disposition und Innendienst ohnehin suchen.

Der Document Builder ist der Editor für die Vorlagen. Er läuft im Lightning App Builder und bietet per Drag-and-drop Standardkomponenten für Felder, Tabellen mit verknüpften Datensätzen, Bildergalerien und Unterschriftsfelder. Reicht eine Standardkomponente nicht, können Entwickler eigene Lightning Web Components bauen. Salesforce weist darauf hin, dass diese ein eigenes Druck-Styling brauchen. Komponenten aus der mobilen App lassen sich also nicht einfach wiederverwenden.

Eingeführt hat Salesforce Service Documents mit dem Release Spring '24. Die Hilfe nennt das Produkt inzwischen Agentforce Field Service and Operations; die Namen der Funktionen sind gleich geblieben. Die passende Aktion `createServiceDocument` gibt es ab API-Version 60.0. Damit lassen sich Dokumente auch aus einem Flow oder über die REST-API erzeugen. Die [Entwicklerdokumentation zur Aktion](https://developer.salesforce.com/docs/atlas.en-us.api_action.meta/api_action/actions_obj_create_service_document.htm) nennt zusätzlich Dokumenttypen für Angebote, darunter einen für Field-Service-Angebote. Salesforce nutzt den Document Builder auch für Angebots-PDFs in Revenue Cloud. Wie Angebote dort funktionieren, steht in [Kapitel 3 der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/).

Verwechseln Sie die Funktion nicht mit S-Docs. S-Docs ist ein eigenständiges Produkt im AppExchange und hat mit dieser Funktion nichts zu tun.

## Der Document Builder steckt in den Field-Service-Lizenzen

Dafür fallen keine zusätzlichen Lizenzkosten an: Salesforce führt den Document Builder als Teil der Field-Service-SKUs. Laut [Salesforce-Hilfe zu den Berechtigungen](https://help.salesforce.com/s/articleView?id=fs_document_builder_perm_sets.htm&language=en_US&type=5) brauchen Nutzer entweder die Permission Set License Field Service Dispatcher oder Field Service Mobile.

```hinweis achtung
Die Berechtigungsseite schließt Contractor- und Contractor+-Lizenzen aus. Das ist wichtig, wenn Subunternehmer Dokumente erstellen sollen. Testen Sie es in Ihrer Org, bevor Sie mit Partnertechnikern planen.
```

Das Volumen ist begrenzt:

```kennzahlen
250 | Dokumente pro Monat je Nutzer mit Dispatcher-, Dispatcher-Plus- oder Mobile-Lizenz, als Kontingent der Org
10.000 | Dokumente als einmaliges Zusatzkontingent, sobald die Org ihr Monatskontingent überschreitet
quelle: Salesforce-Hilfe zu Document Builder und zu den Field-Service-Limits
```

Das Kontingent gilt für die Org: 40 Techniker und 4 Disponenten ergeben 11.000 Dokumente im Monat. Ein Techniker mit fünf Einsätzen am Tag und 21 Arbeitstagen erstellt rund 105 Berichte im Monat, also deutlich weniger als das Kontingent von 250 Dokumenten. Eng wird es, wenn pro Einsatz mehrere Dokumente entstehen, etwa Servicebericht, Checkliste und eine korrigierte Fassung nach einer Reklamation.

Die Einrichtung selbst ist schnell erledigt. Sie aktivieren den Document Builder in den Field Service Settings und warten auf die E-Mail, die die Registrierung der Org bestätigt. Dann bekommen Disponenten und Techniker die Berechtigungen, über die Standard-Permission-Sets oder ein Permission Set mit den Systemberechtigungen "Document Builder" und "Lightning SDK for Field Service Mobile". Außerdem muss das Vorlagenfeld in die Seitenlayouts von Arbeitsauftrag und Servicetermin aufgenommen werden, sonst kann niemand eine Vorlage wählen. Für die Umstellung gilt eine klare Regel: Jeder Nutzer bekommt entweder die klassischen Service Reports oder den Document Builder, nicht beides; mit dem Document Builder verschwindet für ihn der Button für Service Reports.

## Was können Service Documents im Außendienst?

Die Stärke des Document Builders zeigt sich direkt an der Maschine des Kunden:

- **Offline-Erstellung.** Techniker erzeugen das Dokument in der Field Service App, auch ohne Verbindung. In einer Werkshalle oder einem Technikraum im Keller fehlt die Verbindung häufig.
- **Unterschriften.** Jede Vorlage unterstützt Unterschriftstypen wie Kunde und Techniker. Müssen zwei Personen derselben Rolle unterschreiben, nummerieren Sie die Typen (Customer1, Customer2).
- **Fotos.** Bildergalerien zeigen, was der Techniker fotografiert hat, zum Beispiel den Zustand vor und nach der Reparatur.
- **Verknüpfte Datensätze.** Tabellen zeigen bis zu 1.000 verknüpfte Datensätze, etwa verbaute Ersatzteile oder Arbeitsschritte.
- **Übersetzungen.** Vorlagen lassen sich in viele Sprachen übersetzen, Deutsch inklusive. Für Hersteller mit Serviceteams in mehreren Ländern erspart das separate Vorlagen für jede Sprache.

```staerken-grenzen
titel: Document Builder: stark für den Servicebericht vor Ort
+ Unterschrift | Kunde und Techniker, auch offline in der mobilen App
+ Fotos | Bildergalerien, z. B. vor und nach der Reparatur
+ Deutsche Übersetzung | eine Vorlage für mehrere Länder
+ Enthalten | in der Field-Service-Lizenz, Kontingent von 250 Dokumenten pro Nutzer und Monat für die Org *
- Format | nur PDF und nur synchron
- Objekte | nur Arbeitsauftrag, Arbeitsauftragsposition und Servicetermin
- Android | Hilfe widersprüchlich, testen
- Umfang | maximal 50 Seiten und 100 MB
- Logik | Ein- und Ausblenden je Komponente, mehr nicht
besser: Für komplexe Prüfprotokolle, Maschinenakten und Massenläufe: Salesforce Document Generation oder ein AppExchange-Tool.
```
## Die Grenzen: nur PDF, drei Objekte, einfache Bedingungen

Die [Übersicht der Field-Service-Limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) listet sie auf. In Projekten bei Herstellern fallen vor allem diese Grenzen ins Gewicht:

- **Nur drei Objekte.** Vorlagen gibt es für Arbeitsauftrag, Arbeitsauftragsposition und Servicetermin. Ein Wartungsprotokoll am Asset oder ein Dokument an einem Custom Object ist nicht möglich.
- **Android braucht einen Test.** Die Limits-Seite erlaubt unter iOS Vorlagen für Arbeitsauftrag und Servicetermin, unter Android nur für Servicetermine. Die [Seite zum Anlegen von Vorlagen](https://help.salesforce.com/s/articleView?id=service.fs_create_service_document_templates.htm&language=en_US&type=5) nennt alle drei Objekte auf beiden Plattformen. Arbeiten Ihre Techniker mit Android-Geräten, testen Sie die Vorlagen dort, bevor Sie die Vorlagenstrategie festlegen.
- **Die falsche Vorlage auf dem Mobilgerät.** Erstellt ein Techniker auf dem Mobilgerät ein Dokument aus dem Arbeitsauftrag, bietet die App die Vorlage des Servicetermins an. Planen Sie das in der Schulung ein oder bauen Sie nur Vorlagen für Servicetermine.
- **Nur PDF, nur synchron.** Keine Word-Ausgabe und keine Massenläufe, etwa um am Quartalsende alle Wartungsberichte eines Vertrags zu verschicken.
- **Umfang.** Höchstens 50 Seiten und 100 MB pro Dokument. Für einen Servicebericht reicht das, für die Dokumentation einer ganzen Produktionslinie nicht.
- **Lücken in der Darstellung.** Lookup-Felder in verknüpften Listen zeigen Datensatz-IDs statt Namen, Bild-URLs werden nicht gerendert, Rich Text wird nur schwarz gedruckt, lange Textfelder funktionieren in verknüpften Listen nicht. Formelfelder helfen oft, aber das sollten Sie vor dem Vorlagen-Workshop wissen.
- **Übersetzung.** Im Rich Text werden nur Custom Labels übersetzt. Layouts für Schreibrichtungen von rechts nach links werden nicht unterstützt.

Bedingungslogik ist enger als in einem Tool zur Dokumenterzeugung. Laut [Hilfeseite zu den Standardkomponenten](https://help.salesforce.com/s/articleView?id=service.fs_document_builder_standard_components.htm&language=en_US&type=5) lässt sich jede Komponente nur abhängig von bestimmten Kriterien anzeigen; "Druckprüfung nur für diesen Maschinentyp" lässt sich also umsetzen. Berechnungen, wiederholte Blöcke je Prüfpunkt oder ein Aufbau, der sich je Variante ändert, sind etwas anderes. Wenn Ihre Prüfprotokolle heute so aufgebaut sind, prüfen Sie sie zuerst anhand der Regeln für das Ein- und Ausblenden. Fünf kleinere Lücken, von der Vorlagenwahl bis zur E-Mail, lassen sich mit Flows und Komponenten schließen; ich beschreibe sie in [Document Builder: fünf Grenzen und Workarounds](../salesforce-document-builder-grenzen-workarounds/).

## Was ich bei der Tool-Auswahl sehe

Ich begleite Kunden regelmäßig bei Make-or-buy-Entscheidungen, und Dokumentenerstellung mit E-Signatur ist eines der wiederkehrenden Themen. Mein Vorgehen ist jedes Mal gleich: zuerst eine Bestandsaufnahme aller Dokumente mit Volumen, Datenquelle und Angabe, wer unterschreibt, danach die Kosten über mehrere Jahre. Dazu gehören Lizenzen für jede Nutzergruppe, die Umsetzung, die Wartung mit jedem Salesforce-Release und die Folgekosten, falls Sie später wechseln müssen.

Auf Field Service übertragen teilt sich die Bestandsaufnahme in zwei Gruppen. Nach Volumen ist der Servicebericht aus dem Außendienst die größte Gruppe, und die deckt der Document Builder ab. Die kleinere Gruppe enthält die Dokumente mit komplexer Logik: manche Prüfprotokolle, Zertifikate, Vertragsunterlagen. Einfache Angebote können im Document Builder bleiben. Für diese Gruppe ist ein zweites Tool oft gerechtfertigt. Den Fehler, den ich vermeiden will: wegen der kleinen Gruppe das große Tool für alles zu kaufen und Lizenzen für jeden Techniker zu bezahlen, der nur den Servicebericht braucht.

Organisationen mit vielen kurzen Einsätzen erzeugen besonders viele Serviceberichte. Der Standard deckt also den Großteil des Volumens dort ab, wo er am meisten zählt.

## Document Builder oder Document Generation?

- **Klassische Service Reports.** Der ältere Vorlageneditor in Field Service. Er ist bewährt und einfach, unterstützt bis zu 20 Unterschriftsblöcke, bietet aber wenig Gestaltungsspielraum. Abschnittstitel lassen sich nicht übersetzen, und in der Salesforce Mobile App steht die Aktion nicht zur Verfügung.
- **Salesforce Document Generation.** Word-Vorlagen mit Platzhaltern und bedingten Abschnitten, für alle Standard- und Custom Objects, Ausgabe als PDF, DOCX oder PPTX, synchron und als Massenlauf, DocuSign-Anbindung. Nicht offline und nicht mobil. Manche SKUs enthalten sie, etwa Industry Clouds und Revenue Cloud Advanced, sonst braucht sie eine eigene Lizenz; Salesforce vergleicht beide im [Hilfeartikel zu Document Builder und Document Generation](https://help.salesforce.com/s/articleView?id=ind.sf_docgen_understand_doc_builder_and_doc_generation.htm&language=en_US&type=5).
- **OmniStudio Document Generation.** Wie Document Generation, zusätzlich externe Daten über DataRaptors und Integration Procedures. Setzt OmniStudio voraus, das mit den Industry Clouds und einigen Revenue-Cloud-Editionen kommt.
- **AppExchange-Tools** wie S-Docs, Conga Composer oder Nintex DocGen. Ausgereifte Vorlagenlogik, viele Formate, Anbindungen an E-Signatur-Dienste. Für sie fallen zusätzliche Kosten pro Nutzer an, und sie bringen ein weiteres Tool in den Betrieb. Klären Sie Offline-Fähigkeit und Preise beim Anbieter, bevor Sie entscheiden.

Die Kombination, die oft sinnvoll ist: Document Builder für alles, was der Techniker vor Ort erstellt, und ein Tool zur Dokumentenerstellung für den Innendienst, lizenziert nur für die Nutzer, die es brauchen.

## Die heutigen Berichte mit Volumen sammeln

1. **Sammeln Sie Ihre heutigen Berichte.** Erfassen Sie jedes Papierformular und jedes PDF, das Techniker und Serviceinnendienst heute erstellen, jeweils mit dem Volumen pro Monat.
2. **Prüfen Sie sie anhand der Grenzen des Document Builder.** Objekt, Bedingungslogik, Seitenzahl, Ausgabeformat, wer unterschreibt.
3. **Prüfen Sie Ihre Geräte.** iOS oder Android entscheidet, welche Vorlagen mobil nutzbar sind.
4. **Bauen Sie eine Vorlage im Document Builder**, meist für den Standard-Servicebericht, und testen Sie sie mit zwei Technikern in einem echten Einsatz, auch offline.
5. **Planen Sie erst dann ein zweites Tool** für die Dokumente, die in Schritt 2 nicht bestanden haben, und rechnen Sie über mehrere Jahre statt nur mit dem Preis im ersten Jahr.

In den meisten Field-Service-Projekten deckt der Standard den Servicebericht ab, und das Zusatztool lohnt sich für eine kurze Liste von Dokumenten mit komplexer Logik. Was die neuen mobilen Funktionen für Techniker bedeuten, steht in [meinem Artikel zu geführten Abläufen und Spracheingabe im Außendienst](../salesforce-field-service-mobile-aussendienst/).
