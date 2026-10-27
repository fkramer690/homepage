---
title: "Salesforce Document Builder: fünf Grenzen und Workarounds"
description: "Vorlagenwahl, Dateiname, E-Mail, Vorbelegung und Styling: fünf Grenzen des Salesforce Document Builder im Field Service und wie Flows und LWCs sie schließen."
pubDate: 2026-10-23
lang: de
slug: salesforce-document-builder-grenzen-workarounds
translationKey: document-builder-limits-workarounds
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Document Builder, Service Documents, Flow, LWC]
takeaways:
  - "Der Salesforce Document Builder deckt den Servicebericht im Field Service gut ab, aber fünf Lücken tauchen in jedem Projekt auf: Vorlagenwahl, Dateiname, E-Mail, Vorbelegung und Styling."
  - "Die Vorlage ist nur ein Textfeld, das auf eine Lightning-Seite verweist. Nutzer brauchen deshalb einen Screen Flow oder eine Quick Action, um die richtige zu wählen."
  - "Dateinamen lassen sich nicht festlegen, und Salesforce verschickt das Dokument nicht per E-Mail. Ein asynchroner Flow benennt die Datei um, ein Flow versendet die E-Mail."
  - "Sprache und Vorlage lassen sich per Flow auf Servicetermin und Arbeitsauftrag vorbelegen, damit der Techniker nichts auswählen muss."
  - "Eigene Lightning Web Components lassen sich wie Bausteine in die Vorlage stecken und lesen ihre Daten über GraphQL. So funktionieren sie auch offline und erscheinen korrekt in der Vorschau der mobilen App."
faq:
  - q: "Kann ich den Dateinamen eines Salesforce Service Document festlegen?"
    a: "Im Document Builder selbst nicht. Ein datensatzgesteuerter Flow mit asynchronem Pfad kann die Datei kurz nach der Erstellung umbenennen, zum Beispiel nach Auftragsnummer, Kunde und Datum."
  - q: "Kann der Document Builder den Servicebericht per E-Mail versenden?"
    a: "Nicht im Standard. Ein Flow, der bei Erstellung des Dokuments startet, kann das PDF an den Kundenkontakt schicken, mit der E-Mail-Vorlage und der Empfängerlogik, die Sie festlegen."
  - q: "Wie wählen Techniker die richtige Vorlage im Document Builder?"
    a: "Die Vorlage ist ein Textfeld, das auf eine Lightning-Seite verweist, und damit direkt schwer zu bedienen. Belegen Sie sie per Flow auf Arbeitsauftrag und Servicetermin vor oder bieten Sie einen Screen Flow oder eine Quick Action an, die nur passende Vorlagen zeigt."
  - q: "Funktionieren eigene Lightning Web Components im Document Builder offline?"
    a: "Ja, wenn sie ihre Daten über den GraphQL Wire Adapter lesen. In meinen Projekten funktioniert der Offline-Modus dann zuverlässig, und die Vorschau in der Field Service App zeigt die Daten korrekt an."
---

Der Salesforce Document Builder erstellt den Servicebericht im Field Service mit Unterschrift, Fotos und Offline-Unterstützung. In der Praxis hat er aber fünf Grenzen: Die Vorlagenwahl ist umständlich, der Dateiname steht fest, es gibt keinen E-Mail-Versand, nichts belegt Sprache und Vorlage vor, und das Styling ist einfach. Keine davon ist ein Grund, ein weiteres Tool zu kaufen. Jede lässt sich mit einem Flow oder einer kleinen Lightning Web Component schließen. Hier zeige ich, wie ich sie in meinen Projekten löse.

## Warum sind die Grenzen des Document Builder wichtig?

In [meinem ersten Artikel zu Service Documents](../salesforce-service-documents-document-builder-servicebericht/) habe ich beschrieben, was der Document Builder ist, was er kostet und wann Sie stattdessen ein Tool zur Dokumentenerstellung brauchen. Kurz gesagt: Für den Servicebericht vor Ort ist er die richtige Wahl, weil er in der Field-Service-Lizenz steckt und offline funktioniert.

Die offizielle Liste der Limits nennt technische Grenzen wie 50 Seiten pro Dokument oder drei unterstützte Objekte. Was sie nicht nennt, sind die Lücken, die erst im ersten Test mit Technikern und Serviceinnendienst auffallen. Sie sind klein, entscheiden aber darüber, ob die Nutzer den Bericht annehmen. Ein Techniker, der nach jedem Einsatz die richtige Vorlage suchen muss, oder ein Innendienst, der jedes PDF von Hand umbenennt, fragt bald nach dem alten Papierformular.

Die gute Nachricht: Der Document Builder steht auf derselben Plattform wie alles andere in Salesforce. Flows und Lightning Web Components (LWC, der Standardweg für eigene Oberflächenkomponenten) schließen alle fünf Lücken ohne zusätzliche Lizenz.

## Grenze 1: Welche Vorlage soll der Techniker wählen?

Die Vorlage auf Arbeitsauftrag und Servicetermin ist nur ein Textfeld. Es verweist auf die Lightning-Seite (FlexiPage), die das Layout der Vorlage enthält. Für einen Techniker ist das ein technischer Wert ohne Bedeutung. Gibt es mehrere Vorlagen, etwa pro Auftragsart oder pro Land, wählen Nutzer die falsche oder gar keine.

**Workaround:** Legen Sie die Auswahl hinter einen Screen Flow oder eine Quick Action. Der Flow zeigt eine kurze Liste mit lesbaren Namen wie "Jahreswartung" oder "Reparatur mit Ersatzteilen" und schreibt den richtigen Wert in das Feld. Noch besser: Filtern Sie die Liste nach dem Einsatz, damit der Techniker nur Vorlagen sieht, die zur Auftragsart passen.

## Grenze 2: Warum kann ich den Dateinamen nicht festlegen?

Der Document Builder benennt die erzeugte Datei selbst. Ein Muster wie Auftragsnummer, Kunde und Datum lässt sich nicht hinterlegen. Für den Innendienst ist das lästig, denn das PDF landet im Postfach des Kunden, im ERP oder in einem Dokumentenarchiv, und niemand erkennt am Dateinamen, zu welchem Einsatz es gehört.

**Workaround:** Ein datensatzgesteuerter Flow mit asynchronem Pfad. Er startet, wenn das Dokument erstellt wurde, und benennt die Datei kurz danach um. Er muss asynchron laufen, also kurz nach der Erstellung, damit die Datei schon existiert, wenn der Flow sie umbenennt. Die Namensregel liegt dann an einer Stelle, und ein Admin kann sie ohne Code ändern.

## Grenze 3: Wie verschicke ich den Servicebericht per E-Mail?

Im Standard verschickt der Document Builder das Dokument nicht. Der Techniker erstellt das PDF, der Kunde unterschreibt, und dann liegt der Bericht am Arbeitsauftrag. In den meisten Serviceorganisationen erwartet der Kunde den Bericht noch am selben Tag per E-Mail, oft als Grundlage für die Rechnungsfreigabe.

**Workaround:** Ein Flow, der startet, wenn das Dokument fertig ist, und es als Anhang verschickt. Im Flow legen Sie fest, wer es bekommt, zum Beispiel den Kontakt am Arbeitsauftrag oder eine zentrale Serviceadresse des Kunden, welche E-Mail-Vorlage genutzt wird und in welcher Sprache. Zusammen mit Grenze 2 kommt die E-Mail mit einem Dateinamen an, den der Kunde ablegen kann.

## Grenze 4: Lassen sich Sprache und Vorlage vorbelegen?

Ja, per Flow. Im Standard wählt der Techniker Vorlage und Sprache, wenn er das Dokument erstellt. Das ist ein weiterer Schritt vor Ort und eine weitere Fehlerquelle, etwa ein deutscher Bericht für einen Kunden in Frankreich.

**Workaround:** Setzen Sie beide Felder per Flow auf Servicetermin und Arbeitsauftrag. Die Sprache kann vom Account oder vom Servicegebiet kommen, die Vorlage von der Auftragsart oder vom Asset. Der Techniker prüft dann nur noch die Vorschau und holt die Unterschrift ein.

## Grenze 5: Wie weit kommt man beim Styling?

Die Standardkomponenten decken Felder, Tabellen, Bilder und Unterschriften ab. Alles andere, etwa eine horizontale Linie zwischen Abschnitten oder eine andere verknüpfte Liste, fehlt. Und einige Grenzen aus der offiziellen Liste treffen den Bericht direkt: Lange Textfelder lassen sich in verknüpften Listen nicht anzeigen, und die Feldbezeichnungen sind die aus dem Datenmodell.

**Workaround:** Die Vorlage ist eine Lightning-Seite und damit aus Komponenten wie aus Bausteinen aufgebaut. Eigene LWCs lassen sich per Plug and Play neben die Standardkomponenten setzen. Zwei Beispiele aus meinen Projekten:

- **Grafische Elemente.** Eine horizontale Trennlinie oder ähnliche Zwischenelemente zwischen Abschnitten. Klein, aber der Bericht wirkt wie ein gestaltetes Dokument statt wie ein Datenexport.
- **Eigene verknüpfte Liste.** Eine Komponente, die auch Felder mit mehr als 255 Zeichen anzeigt, etwa die Arbeitsbeschreibung des Technikers, und Feldbezeichnungen nur für den Bericht überschreibt. Das Standardfeld "Erstellt von" erscheint im Dokument dann als "Techniker", ohne dass sich die Bezeichnung in der ganzen Org ändert.

Salesforce weist darauf hin, dass LWCs für Service Documents ein eigenes Druck-Styling brauchen, beschrieben im [Entwicklerleitfaden für eigene Komponenten in Service Documents](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_mobile_document_builder.htm). Komponenten aus der mobilen App lassen sich nicht einfach wiederverwenden. Planen Sie sie als eigene kleine Bibliothek.

![Fünf Grenzen des Salesforce Document Builder und wie man sie schließt. Vorlagenwahl: Die Vorlage ist nur ein Textfeld, das auf eine Lightning-Seite verweist, gelöst mit Screen Flow oder Quick Action. Dateiname: nicht festlegbar, ein asynchroner Flow benennt die Datei kurz nach der Erstellung um. E-Mail: kein Versand im Standard, per Flow nachgebaut. Vorbelegung: Sprache und Vorlage per Flow auf Servicetermin und Arbeitsauftrag. Styling: eigene LWCs als Bausteine, zum Beispiel Trennlinie oder verknüpfte Liste mit langen Textfeldern und Berichtsbezeichnungen wie Techniker statt Erstellt von. Eigene Komponenten lesen Daten über GraphQL, funktionieren offline und erscheinen korrekt in der mobilen Vorschau.](../../../assets/blog/document-builder-workarounds-de.png)

## Funktionieren die Workarounds offline?

Das Hauptargument für den Document Builder ist die Offline-Erstellung an der Maschine des Kunden, also dürfen die Workarounds das nicht kaputt machen. In der Praxis tun sie das nicht. Eigene Komponenten lesen ihre Daten über GraphQL (die Abfrageschnittstelle, die die Field Service App für Offline-Daten nutzt), deshalb liegen die Daten ohne Verbindung auf dem Gerät. Die Vorschau in der mobilen App zeigt die Informationen korrekt an, einschließlich der eigenen verknüpften Liste und der überschriebenen Bezeichnungen.

Die Flows aus Grenze 2 und 3 laufen nach der nächsten Synchronisierung auf dem Server. Dort gehören sie hin: Der Techniker wartet vor Ort nicht auf die E-Mail, und die umbenannte Datei und die E-Mail folgen, sobald das Gerät wieder online ist. Die Flows für Grenze 4 können laufen, wenn die Disposition den Einsatz plant. Dann liegen die Werte auf dem Gerät, bevor der Techniker losfährt.

## Was ich für den Rollout empfehle

- **Planen Sie die fünf Themen in den ersten Sprint ein.** Sie sind klein, gehören aber zur Definition of Done des Serviceberichts und nicht in eine spätere Phase.
- **Halten Sie die Flows an einer Stelle.** Ein Flow für die Vorbelegung, einer für Umbenennung und E-Mail. Dann findet ein Admin die Regeln und kann sie ändern.
- **Bauen Sie die LWCs als kleine Bibliothek.** Trennlinie, verknüpfte Liste, eventuell ein Kopf mit Logo. Wiederverwendbar in jeder Vorlage.
- **Testen Sie offline mit echten Geräten.** Einschließlich der Vorschau, auf iOS und Android, bevor der erste Techniker live geht.

Wenn Sie einen Field-Service-Rollout planen und den Servicebericht von Anfang an richtig aufsetzen wollen, sehen Sie sich meine [Leistungen](../../leistungen/) an oder [schreiben Sie mir](#contact).
