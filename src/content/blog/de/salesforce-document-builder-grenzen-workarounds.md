---
title: "Salesforce Document Builder: fünf Grenzen und Workarounds"
metaTitle: "Salesforce Document Builder: Grenzen und Workarounds"
description: "Vorlagenwahl, Dateiname, E-Mail, Vorbelegung und Styling: fünf Grenzen des Salesforce Document Builder im Field Service und wie Flows und LWCs sie umgehen."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-document-builder-grenzen-workarounds
translationKey: document-builder-limits-workarounds
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Document Builder, Service Documents, Flow, LWC]
takeaways:
  - "Fünf Lücken zeigen sich in meinen Projekten: Vorlagenwahl, Dateiname, E-Mail, Vorbelegung und Styling. Für übliche Serviceberichte braucht es kein Zusatztool."
  - "Das Vorlagenfeld enthält nur eine ID. Salesforce nimmt den Wert vom Datensatz, vom Arbeitstyp oder den Standard; für Ausnahmen braucht es einen Screen Flow."
  - "Den Dateinamen setzt ein asynchroner Flow, die E-Mail verschickt ein weiterer Flow, denn Salesforce macht beides nicht selbst."
  - "Ein Flow kann die Sprache am Arbeitsauftrag und die Vorlage am Arbeitsauftrag oder Servicetermin vorbelegen, damit niemand auswählen muss."
  - "Eigene Lightning Web Components, die Daten über GraphQL und ohne Apex lesen, funktionieren offline und in der mobilen Vorschau, wenn die Daten vorgeladen sind."
faq:
  - q: "Kann ich den Dateinamen eines Salesforce Service Documents festlegen?"
    a: "Im Document Builder selbst nicht. Ein datensatzgesteuerter Flow mit asynchronem Pfad kann die Datei kurz nach der Erstellung umbenennen, zum Beispiel nach Auftragsnummer, Kunde und Datum."
  - q: "Kann der Document Builder den Servicebericht per E-Mail versenden?"
    a: "Nicht im Standard. Ein Flow, der bei Erstellung des Dokuments startet, kann das PDF an den Kundenkontakt schicken, mit der E-Mail-Vorlage und der Empfängerlogik, die Sie festlegen."
  - q: "Wie wählen Techniker die richtige Vorlage im Document Builder?"
    a: "Salesforce nimmt die Vorlage aus dem Feld am Datensatz, andernfalls die Vorlage vom Arbeitstyp oder die Standardvorlage der Org. Pflegen Sie diese Zuordnung oder belegen Sie das Feld per Flow vor; für echte Ausnahmen bieten Sie einen Screen Flow an, der nur passende Vorlagen zeigt."
  - q: "Funktionieren eigene Lightning Web Components im Document Builder offline?"
    a: "Ja, wenn sie ihre Daten über den GraphQL Wire Adapter lesen, kein Apex nutzen (das liefert offline ein leeres Ergebnis) und die Datensätze auf dem Gerät vorgeladen sind. In meinen Projekten hat der Offline-Modus dann funktioniert, und die Vorschau zeigte die Daten korrekt an."
---

Der Salesforce Document Builder erstellt den Servicebericht im Field Service mit Unterschrift, Fotos und Offline-Unterstützung. In der Praxis hat er aber fünf Grenzen: Die Vorlagenwahl ist umständlich, der Dateiname steht fest, es gibt keinen E-Mail-Versand, Sprache und Vorlage werden nicht vorbelegt, und das Styling ist schlicht. Für einen üblichen Servicebericht ist keine davon ein Grund, ein weiteres Tool zu kaufen. Jede lässt sich mit einem Flow oder einer kleinen Lightning Web Component schließen. Hier zeige ich, wie ich sie in meinen Projekten löse.

## Die Grenzen fallen erst im Test mit Technikern auf

In [meinem ersten Artikel zu Service Documents](../salesforce-service-documents-document-builder-servicebericht/) habe ich beschrieben, was der Document Builder ist, was er kostet und wann Sie stattdessen ein Tool zur Dokumentenerstellung brauchen. Kurz gesagt: Für den Servicebericht vor Ort ist er die richtige Wahl, weil er für Nutzer mit der Permission Set License Field Service Dispatcher oder Mobile enthalten ist und offline funktioniert.

Die offizielle Liste der Limits nennt technische Grenzen wie 50 Seiten pro Dokument oder drei unterstützte Objekte. Was sie nicht nennt, sind die Lücken, die erst im ersten Test mit Technikern und dem Serviceinnendienst auffallen. Sie sind klein, entscheiden aber darüber, ob die Nutzer den Bericht annehmen. Ein Techniker, der nach jedem Einsatz die richtige Vorlage suchen muss, oder ein Innendienst, der jedes PDF von Hand umbenennt, fragt bald nach dem alten Papierformular.

Der Document Builder basiert aber auf derselben Plattform wie alles andere in Salesforce. Flows und Lightning Web Components (LWC, der Standardweg für eigene Oberflächenkomponenten) schließen alle fünf Lücken ohne zusätzliche Lizenz.

## Grenze 1: Die Vorlagenwahl braucht einen Screen Flow

Das Vorlagenfeld am Arbeitsauftrag, an der Arbeitsauftragsposition und am Servicetermin enthält die ID einer Service-Document-Vorlage, die wiederum auf die Lightning-Seite (FlexiPage) mit dem Layout verweist. Für einen Techniker ist das ein technischer Wert ohne Bedeutung. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_service_document_template_field.htm&language=en_US&type=5) übernimmt Salesforce den Wert aus dem Datensatz, andernfalls eine Vorlage vom Arbeitstyp oder die Standardvorlage der Org. Gibt es mehrere Vorlagen, etwa pro Arbeitstyp oder pro Land, muss diese Zuordnung gepflegt sein, sonst nutzt der Bericht die falsche.

**Workaround:** Pflegen Sie die Vorlagen zuerst an den Arbeitstypen. Für die Ausnahmen legen Sie die Auswahl in einen Screen Flow, der in der Field Service App läuft. Der Flow zeigt eine kurze Liste mit lesbaren Namen wie "Jahreswartung" oder "Reparatur mit Ersatzteilen" und schreibt den richtigen Wert in das Feld. Noch besser: Filtern Sie die Liste nach dem Einsatz, damit der Techniker nur Vorlagen sieht, die zum Arbeitstyp passen.

## Grenze 2: Der Dateiname steht fest

Der Document Builder benennt die erzeugte Datei selbst. Ein Muster wie Auftragsnummer, Kunde und Datum lässt sich nicht hinterlegen. Für den Innendienst ist das lästig, denn das PDF wird im Postfach des Kunden, im ERP oder in einem Dokumentenarchiv abgelegt, und niemand erkennt am Dateinamen, zu welchem Einsatz es gehört.

**Workaround:** Ein datensatzgesteuerter Flow mit asynchronem Pfad. Er startet, wenn das Dokument erstellt wurde, und benennt die Datei kurz danach um. Die Namensregel liegt dann an einer Stelle, und ein Admin kann sie ohne Code ändern.

```hinweis achtung
Der Flow muss asynchron laufen, also kurz nach der Erstellung. Nur dann existiert die Datei schon, wenn der Flow sie umbenennt.
```

## Grenze 3: Wie verschicke ich den Servicebericht per E-Mail?

Im Standard verschickt der Document Builder das Dokument nicht. Der Techniker erstellt das PDF, der Kunde unterschreibt, und anschließend liegt der Bericht am Arbeitsauftrag. In den meisten Serviceorganisationen erwartet der Kunde den Bericht noch am selben Tag per E-Mail, oft als Grundlage für die Rechnungsfreigabe.

**Workaround:** Ein Flow, der startet, wenn das Dokument fertig ist, und es als Anhang verschickt. Im Flow legen Sie fest, an wen es verschickt wird, zum Beispiel an den Kontakt am Arbeitsauftrag oder an eine zentrale Serviceadresse des Kunden, welche E-Mail-Vorlage genutzt wird und in welcher Sprache. Zusammen mit Grenze 2 trägt der Anhang einen Dateinamen, unter dem der Kunde ihn ablegen kann.

## Grenze 4: Lassen sich Sprache und Vorlage vorbelegen?

Ja, per Flow. Im Standard werden Sprache und Vorlage nicht vom Kunden abgeleitet: Die Vorlage stammt vom Datensatz, vom Arbeitstyp oder aus dem Standard, die Sprache wird nur am Arbeitsauftrag gesetzt und gilt für alle seine Servicetermine. Setzt niemand die Sprache, erhält ein Kunde in Frankreich einen deutschen Bericht.

**Workaround:** Setzen Sie per Flow die Sprache am Arbeitsauftrag und die Vorlage am Arbeitsauftrag oder Servicetermin. Die Sprache kann vom Account oder vom Servicegebiet stammen, die Vorlage vom Arbeitstyp oder vom Asset. Der Techniker prüft dann nur noch die Vorschau und holt die Unterschrift ein.

## Grenze 5: Wie weit kommt man beim Styling?

Die Standardkomponenten decken Felder, Tabellen, Bilder und Unterschriften ab. Alles andere, etwa eine horizontale Linie zwischen Abschnitten oder eine andere verknüpfte Liste, fehlt. Einige Grenzen aus der offiziellen Liste treffen den Bericht direkt: Lange Textfelder lassen sich in verknüpften Listen nicht anzeigen, und die Feldbezeichnungen stammen aus dem Datenmodell.

**Workaround:** Die Vorlage ist eine Lightning-Seite und damit aus Komponenten aufgebaut, ähnlich wie aus Bausteinen. Eigene LWCs lassen sich neben die Standardkomponenten setzen, sofern sie die Offline-Anforderungen erfüllen und für den Druck gestaltet sind. Zwei Beispiele aus meinen Projekten:

- **Grafische Elemente.** Eine horizontale Trennlinie oder ähnliche Zwischenelemente zwischen Abschnitten. Das ist eine kleine Änderung, aber der Bericht wirkt dadurch wie ein gestaltetes Dokument statt wie ein Datenexport.
- **Eigene verknüpfte Liste.** Eine Komponente, die auch Felder mit mehr als 255 Zeichen anzeigt, etwa die Arbeitsbeschreibung des Technikers, und Feldbezeichnungen nur für den Bericht überschreibt. Das Standardfeld "Erstellt von" erscheint im Dokument dann als "Techniker", ohne dass sich die Bezeichnung in der ganzen Org ändert.

```vertiefung Für Entwickler
titel: Kann ich LWCs aus der mobilen App wiederverwenden?
Nicht einfach so. Salesforce weist darauf hin, dass LWCs für Service Documents ein eigenes Druck-Styling brauchen. Das ist im [Entwicklerleitfaden für eigene Komponenten in Service Documents](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_mobile_document_builder.htm) beschrieben. Planen Sie die Komponenten für den Bericht deshalb als eigene kleine Bibliothek.
```

![Fünf Grenzen des Salesforce Document Builder und wie man sie schließt. Vorlagenwahl: Das Vorlagenfeld ist nur ein Textfeld, das auf eine Lightning-Seite verweist, gelöst mit Screen Flow oder Quick Action. Dateiname: nicht festlegbar, ein asynchroner Flow benennt die Datei kurz nach der Erstellung um. E-Mail: kein Versand im Standard, per Flow nachgebaut. Vorbelegung: Sprache per Flow am Arbeitsauftrag, Vorlage an Arbeitsauftrag oder Servicetermin. Styling: eigene LWCs als Bausteine, zum Beispiel Trennlinie oder verknüpfte Liste mit langen Textfeldern und Berichtsbezeichnungen wie Techniker statt Erstellt von. Eigene Komponenten lesen Daten über GraphQL, funktionieren offline und erscheinen korrekt in der mobilen Vorschau.](../../../assets/blog/document-builder-workarounds-de.png)

## Funktionieren die Workarounds offline?

Das Hauptargument für den Document Builder ist die Offline-Erstellung an der Maschine des Kunden, also dürfen die Workarounds die Offline-Fähigkeit nicht beeinträchtigen. In meinen Projekten blieb sie erhalten. Eigene Komponenten lesen ihre Daten über GraphQL (die Abfrageschnittstelle, die die Field Service App für Offline-Daten nutzt) und nicht über Apex, das offline ein leeres Ergebnis liefert. Vorgeladene Daten liegen deshalb auch ohne Verbindung auf dem Gerät. Die Vorschau in der mobilen App zeigt die Informationen korrekt an, einschließlich der eigenen verknüpften Liste und der überschriebenen Bezeichnungen.

Die Flows aus Grenze 2 und 3 laufen nach der nächsten Synchronisierung auf dem Server. Dort gehören sie hin: Der Techniker wartet vor Ort nicht auf die E-Mail, und die umbenannte Datei und die E-Mail folgen, sobald das Gerät wieder online ist. Die Flows für Grenze 4 können ausgeführt werden, wenn die Disposition den Einsatz plant. Dann liegen die Werte auf dem Gerät, bevor der Techniker losfährt.

## Was ich für den Rollout empfehle

- **Planen Sie die fünf Themen in den ersten Sprint ein.** Sie sind klein, gehören aber zur Definition of Done des Serviceberichts und nicht in eine spätere Phase.
- **Bündeln Sie die Flow-Logik an einer Stelle.** Nutzen Sie einen Flow für die Vorbelegung und einen für die Umbenennung und E-Mail. Dann findet ein Admin die Regeln und kann sie ändern.
- **Bauen Sie die LWCs als kleine Bibliothek.** Trennlinie, verknüpfte Liste, eventuell ein Kopf mit Logo. So bleiben die Komponenten in jeder Vorlage wiederverwendbar.
- **Testen Sie offline mit echten Geräten.** Einschließlich der Vorschau, auf iOS und Android, bevor der erste Techniker produktiv arbeitet.
