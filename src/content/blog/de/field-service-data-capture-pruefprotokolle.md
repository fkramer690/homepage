---
title: "Field Service Data Capture: Prüfprotokolle ohne Papier"
description: "Wie aus einem Prüf- oder Inbetriebnahmeprotokoll auf Papier ein Data-Capture-Formular wird, dessen Ergebnisse Innendienst und ERP wirklich nutzen können."
pubDate: 2026-10-28
lang: de
slug: field-service-data-capture-pruefprotokolle
translationKey: field-service-data-capture-forms
topic: field-service
categories: [field-service]
tags: [Field Service, Data Capture, Außendienst, Prüfprotokoll, Inbetriebnahme]
takeaways:
  - "Data-Capture-Formulare entstehen im Flow Builder, laufen direkt in der Field Service App und hängen am Arbeitsauftrag, am Service-Termin oder an einer Auftragsposition."
  - "Formulare funktionieren offline, speichern jede Eingabe automatisch und protokollieren jede Übermittlung, online wie offline. Ein Techniker kann ein Formular schließen und später fortsetzen."
  - "Voice to Form ist seit dem App-Release 260.0 im Spring '26 allgemein verfügbar, und Winter '27 ergänzt Spanisch, Japanisch, Italienisch, Französisch und Deutsch."
  - "Entscheiden Sie vor dem ersten Formular, welche Antworten Felder am Asset oder Arbeitsauftrag werden, etwa Messwerte, Gesamtergebnis und Teile, und welche Formularantworten bleiben."
  - "Teilen Sie ein langes Protokoll nach Maschinenvariante und Einsatzphase auf, statt ein Formular mit allen Prüfpunkten zu bauen und die meisten davon auszublenden."
faq:
  - q: "Was ist Data Capture in Salesforce Field Service?"
    a: "Data Capture ist die Formularfunktion der Field Service App. Admins bauen die Formulare im Flow Builder mit Feldern, Checkboxen, Lookups, Unterschriften, Fotos und bedingten Abschnitten, und Techniker füllen sie in der App aus, auch offline."
  - q: "Funktioniert Data Capture offline?"
    a: "Ja. Laut Trailhead nutzt Data Capture eine Offline-first-Architektur, speichert jede Eingabe automatisch und protokolliert jede Übermittlung online oder offline. Die Datensätze, die ein Formular braucht, müssen im Briefcase des Technikers liegen."
  - q: "Gibt es Voice to Form auf Deutsch?"
    a: "Voice to Form ist seit dem App-Release 260.0 im Spring '26 allgemein verfügbar. Die Release-Highlights zu Winter '27 nennen die Unterstützung für Spanisch, Japanisch, Italienisch, Französisch und Deutsch."
  - q: "Sollte ich jedes Papierprotokoll als Data-Capture-Formular nachbauen?"
    a: "Nicht eins zu eins. Legen Sie zuerst fest, welche Antworten Innendienst, ERP oder Wartungsplanung als Felder brauchen, streichen Sie Fragen, deren Antwort schon am Asset oder Arbeitsauftrag steht, und teilen Sie lange Protokolle nach Variante auf."
draft: false
---

Aus einem Prüf- oder Inbetriebnahmeprotokoll auf Papier wird ein Data-Capture-Formular im Flow Builder, das in der Field Service App läuft, auch offline, und am Arbeitsauftrag, am Service-Termin oder an einer Auftragsposition hängt. Das Formular ist schnell gebaut. Länger dauert die Entscheidung davor: Welche Antworten werden Felder am Asset oder Arbeitsauftrag, damit Wartungsplanung, Innendienst und ERP sie nutzen können, und welche bleiben Formularantworten für die Dokumentation? Teilen Sie lange Protokolle nach Maschinenvariante und Einsatzphase auf. Ein Formular mit 80 Prüfpunkten, von denen die meisten ausgeblendet sind, lässt sich schwer testen und schwer ändern.

## Was ist Data Capture in Field Service?

Data Capture ist die Formularfunktion der Field Service App im Außendienst. Laut dem [Trailhead-Modul Data Capture: Quick Look](https://trailhead.salesforce.com/content/learn/modules/data-capture-quick-look) baut Data Capture direkt auf dem Flow Builder auf, also dem Werkzeug, das Admins schon für Automatisierung nutzen. Die Formulare laufen nativ in der App und lassen sich an Arbeitsaufträge, Service-Termine und Auftragspositionen hängen.

Was ein Formular enthalten kann:

- **Felder und Eingaben:** Text, Checkboxen, Lookups und Unterschrift.
- **Bedingte Sichtbarkeit:** Felder erscheinen oder verschwinden je nachdem, was der Techniker schon eingegeben hat.
- **Medien:** Fotos, Markierungen auf Fotos und Bildraster.

Für den Einsatz vor Ort zählen zwei Eigenschaften mehr als die Bausteine. Die Formulare funktionieren offline mit einer eigenen Offline-Engine, und die automatische Speicherung sichert jede Eingabe. Ein Techniker kann ein Formular an der Maschine schließen und später weitermachen. Jede Übermittlung wird protokolliert, online wie offline.

Offline funktioniert nur, wenn die Datensätze, die das Formular liest, auf dem Gerät liegen. Welche Datensätze in den Briefcase gehören, steht in [Field Service App offline: Welche Daten aufs Gerät?](../field-service-app-offline-briefcase/).

## Was ist allgemein verfügbar, und was kam später?

Der Stand ändert sich mit jedem App-Release, deshalb lohnt der genaue Blick.

- **App-Release 260.0 (Spring '26).** Der [Release-Beitrag von Salesforce in der Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000j9vu70AA) kennzeichnet Data Capture Voice to Form als GA. Techniker diktieren, die App schreibt mit und füllt die Formularfelder. Derselbe Beitrag nennt eine Lookup-Komponente, die auch offline funktioniert, eine Vorschau für mehrere Bilder und die Möglichkeit, Formulare von Assets, eigenen Objekten und mobilen Zeiterfassungen aus zu starten. Diese Punkte tragen im Beitrag kein GA-Kennzeichen. Prüfen Sie ihren Stand in Ihrer Org, bevor Sie damit planen.
- **Winter '27.** Die [Release-Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) ergänzen Voice to Form auf Spanisch, Japanisch, Italienisch, Französisch und Deutsch.

Spracheingabe auf Deutsch macht die Funktion für viele Serviceorganisationen im DACH-Raum interessant. Sie verarbeitet aber die Sprache von Beschäftigten, und damit kommen Datenschutz und, wo vorhanden, der Betriebsrat ins Spiel. Diese Fragen habe ich in [Salesforce Field Service Mobile: Führung und Sprache](../salesforce-field-service-mobile-aussendienst/) beschrieben. Für das Formular heißt das: Legen Sie fest, welche Felder per Sprache gefüllt werden dürfen und welche Werte der Techniker von Hand bestätigt, etwa einen sicherheitsrelevanten Messwert.

## Welche Antworten sollten Felder werden?

Diese Entscheidung würde ich vor dem ersten Formular treffen. Eine Formularantwort reicht, um festzuhalten, was geprüft wurde. Ein Wert, den später jemand auswertet, gehört in ein Feld am Asset oder am Arbeitsauftrag, denn Berichte, Wartungspläne und Schnittstellen arbeiten mit Feldern.

| Antwort im Protokoll | Wohin sie gehört | Warum |
|---|---|---|
| Betriebsstunden oder Zählerstand | Feld am Asset | Wartung nach Nutzung liest es |
| Messwerte mit Verlauf (Druck, Temperatur) | Feld am Asset oder Arbeitsauftrag | Vergleich über mehrere Einsätze |
| In Ordnung oder nicht pro Prüfpunkt | Formularantwort | Nachweis der Prüfung |
| Gesamtergebnis der Prüfung | Feld am Arbeitsauftrag | Auswertung und Abrechnung |
| Gefundener Mangel | Neue Auftragsposition oder Folgeauftrag | Wird geplant und disponiert |
| Verbrauchte Teile | Products Consumed am Arbeitsauftrag | Fahrzeuglager und ERP |
| Unterschrift des Kunden | Formular und Servicebericht | Nachweis der Abnahme |

Aus der Tabelle folgen zwei Regeln. Erstens fragt ein Formular nichts ab, was schon am Asset oder Arbeitsauftrag steht, etwa Seriennummer, Kunde oder Maschinentyp. Zweitens wird Verbrauch als Products Consumed gebucht, nie als Freitextfeld im Formular, sonst sehen Fahrzeuglager und ERP ihn nicht.

Messwerte am Asset verbinden das Formular mit der Wartungsplanung. Wie Wartungspläne und Entitlements zusammenspielen, steht in [Field Service: Wie bildet man Wartungsverträge ab?](../salesforce-field-service-wartungsvertraege/). Das ist klassische [Architekturarbeit](../../leistungen/salesforce-architektur/) und gehört der Serviceorganisation genauso wie der IT.

## Wie hängt das Formular mit dem Servicebericht zusammen?

Data Capture sammelt die Daten. Das PDF, das der Kunde bekommt, entsteht im Document Builder. Der Document Builder arbeitet auf Arbeitsaufträgen, Auftragspositionen und Service-Terminen, wie in [Salesforce Service Documents: reicht der Document Builder?](../salesforce-service-documents-document-builder-servicebericht/) beschrieben. Braucht der Kunde die Prüfergebnisse im Bericht, klären Sie im ersten Sprint, wie die Antworten in die Vorlage kommen. Werte, die als Feld am Arbeitsauftrag stehen, lassen sich direkt in die Vorlage setzen.

Prüfberichte mit viel bedingtem Inhalt können über den Document Builder hinauswachsen. Dann ist ein eigenes Prüfdokument aus Document Generation oder einem AppExchange-Tool die ehrliche Antwort, und das Formular liefert weiterhin die Daten.

## Ein typisches Szenario, als Annahme: 80 Prüfpunkte, drei Varianten

Ein Maschinenbauer nimmt Verpackungsmaschinen in drei Varianten in Betrieb. Das Papierprotokoll hat 80 Prüfpunkte auf zwölf Seiten, dazu eine Seite für die Abnahme durch den Kunden. Heute füllt der Techniker es von Hand aus, scannt es abends ein, und der Innendienst tippt die Messwerte ins ERP.

Als ein einziges Formular enthielte es jeden Prüfpunkt jeder Variante, und die bedingte Sichtbarkeit würde die meisten ausblenden. Jede Änderung an einer Variante würde das Formular für alle drei berühren. Ich würde es aufteilen:

- **Formular 1, allgemeine Prüfungen (30 Punkte).** Aufstellort, Stromversorgung, Schutzeinrichtungen, Not-Halt. Für jede Variante gleich, am Service-Termin.
- **Formular 2, Variantenprüfung (35 Punkte).** Ein Formular pro Variante, an der Auftragsposition für den Inbetriebnahmeschritt dieser Variante. Messwerte wie Taktzahl und Siegeltemperatur landen in Feldern am Asset.
- **Formular 3, Abnahme (15 Punkte).** Offene Punkte, Einweisung des Kunden, Unterschrift. Das Gesamtergebnis geht in ein Feld am Arbeitsauftrag.

Eine Maschine bekommt damit weiterhin 80 Prüfpunkte, aber jedes Formular ist kurz genug, um es zu testen. Mängel aus Formular 2 werden Auftragspositionen, und die Disposition sieht die Folgearbeit.

## Wo fangen Sie an?

1. **Ein Protokoll auswählen** mit hohem Volumen, etwa die Jahreswartung Ihres häufigsten Maschinentyps.
2. **Jede Frage markieren** als Feld, Formularantwort, Auftragsposition oder "schon bekannt". Die letzte Gruppe streichen.
3. **Die Felder mit Innendienst und ERP-Team abstimmen**, bevor jemand den Flow Builder öffnet.
4. **Offline bauen und testen**, unter iOS und Android, mit einem internen und einem Partnertechniker.
5. **Voice to Form in einem eigenen Schritt ergänzen**, wenn Datenschutz und Betriebsrat zugestimmt haben.

Formulare, Offline-Daten und Servicebericht bilden zusammen [Kapitel 3 der Masterclass Field Service](../../masterclass/field-service/field-service-mobile-app-dokumente/).

Ein Papierprotokoll wird zu nutzbaren Daten, wenn Sie zuerst festlegen, welche Antworten Felder werden, und erst dann das Formular bauen. Wenn Sie Prüfprotokolle im Außendienst ablösen wollen, [schreiben Sie mir](#contact).
