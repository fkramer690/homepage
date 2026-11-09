---
title: "Partner Visit Management: Händlerbesuche mit KPIs"
description: "Wie Partner Visit Management in der Manufacturing Cloud Händlerbesuche in Aufgaben und Kennzahlen übersetzt und was der Außendienst mobil erfasst."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: partner-visit-management-haendlerbesuche
translationKey: manufacturing-cloud-partner-visit-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Partner Visit Management, Händler, Distributoren, Kennzahlen, Mobil]
takeaways:
  - "Ein Besuch kann Aufgaben mit Ort, Priorität und Kennzahlen, die der Außendienst am Handy erfasst."
  - "Aufgaben tragen Kontext wie ein Sales Agreement, einen Auftrag oder eine Anlage, damit der Mitarbeiter beim Händler den richtigen Datensatz sieht."
  - "Der Schalter enablePartnerVisitManagement existiert seit API 56.0. Lizenzumfang je Edition und Offline-Betrieb müssen Sie bestätigen lassen."
  - "Die Funktion ist ein starker Kandidat, wenn viele Händler mit derselben Checkliste besucht werden."
faq:
  - q: "Was ist Partner Visit Management in Salesforce?"
    a: "Eine Funktion der Manufacturing Cloud für geplante und spontane Besuche bei Händlern, Distributoren und Lieferanten. Manager legen Aufgaben und Kennzahlen mit Sollwerten fest, der Außendienst führt den Besuch in einer mobilen App durch und erfasst Istwerte, Notizen und Screenshots."
  - q: "Welche Kennzahlen kann der Außendienst beim Besuch erfassen?"
    a: "Trailhead nennt als Beispiele Ersatzteilbestände, Ausschussquoten und Termine von Sicherheitsschulungen. Kennzahlen können Ja/Nein, Prozent, Dezimalzahl, Ganzzahl, Datum und Uhrzeit oder Text sein."
  - q: "Funktioniert Partner Visit Management offline?"
    a: "Die Quellen zu Partner Visit Management, die ich geprüft habe, bestätigen es nicht. Lassen Sie sich schriftlich bestätigen, welche Schritte offline laufen, vom Start des Besuchs bis zu Kennzahlen und Datei-Upload, und testen Sie Flugmodus und Wiederverbindung vor dem Rollout."
  - q: "Brauche ich Partner Visit Management für Händlerbesuche?"
    a: "Nicht bei einer Handvoll Händler und Besuchen ohne feste Kennzahlen. Ein eigenes Besuchsobjekt mit wenigen Feldern oder Standard-Termine in Salesforce können reichen, je nach Lizenzen und benötigter Logik. Die Funktion ist ein starker Kandidat bei vielen Händlern und einer wiederkehrenden Checkliste."
draft: false
---

Partner Visit Management kann aus Händlerbesuchen vergleichbare Daten machen, wenn Sie die Kennzahlen vor dem ersten Besuch festlegen. Die Funktion der Manufacturing Cloud plant Besuche mit Aufgaben, Aufgaben können Kennzahlen mit Sollwert tragen, und der Außendienst erfasst die Istwerte am Handy. Mit passenden Berichten vergleicht der Innendienst Soll und Ist über die Händler, statt Besuchsberichte zu lesen. Ablauf und Permission Sets dokumentiert Salesforce gut. Welche Editionen die Lizenzen enthalten und ob die App offline läuft, gehört ins Angebot. Bei wenigen Händlern ohne feste Checkliste reicht ein einfaches Besuchsberichtsobjekt.

## Was leistet Partner Visit Management?

Partner Visit Management plant und dokumentiert Besuche bei Händlern, Distributoren und Lieferanten. Das [Trailhead-Modul](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management) beschreibt drei Teile:

- **Besuche.** Ein Besuch hat einen Ort, besondere Anweisungen und einen zugewiesenen Außendienstmitarbeiter. Für wiederkehrende Besuchsarten nutzen Manager ein Action Plan Template erneut. Spontane Besuche klären dringende Themen, im Trailhead-Beispiel einen gemeldeten Fehler an einem Modell.
- **Aufgaben.** Jeder Besuch hat Aufgaben, die ihm einen Zweck geben, etwa Quartalsziele besprechen, Garantieverlängerungen prüfen oder den Bestand kontrollieren.
- **Kennzahlen.** Aufgaben tragen Messwerte wie Ersatzteilbestand, Ausschussquote oder Termine von Sicherheitsschulungen. Möglich sind Ja/Nein, Prozent, Dezimalzahl, Ganzzahl, Datum und Uhrzeit sowie Text.

Auf der [Produktseite](https://salesforce.com/manufacturing/cloud/sales) ergänzt Salesforce, dass Besuche Ort, Priorität, geschätzte Besuchsdauer und die Historie früherer Besuche zeigen und dass Admins die Besuchsseiten aus Komponenten namens Visit Overview, Visit Actions und Visit Task List bauen.

## Ein Besuch läuft von der Planung bis zur Kennzahl

Die [Unit zum Anlegen und Durchführen von Besuchen](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/create-and-execute-partner-visits) zeigt die Schritte im Innendienst:

```schritte
Aufgaben
  Allgemeine Aufgaben anlegen und wiederverwendbare als Task Definitions markieren.
Kontext
  Eine Aufgabe mit einem Distributor-Account, einem Produkt, einem Auftrag oder einem Sales Agreement verknüpfen.
Assessment Indicator Definitions
  Festlegen, was gemessen wird und in welchem Datentyp.
Generic Visit KPIs
  Den Sollwert pro Aufgabe hinterlegen.
Action Plan Templates
  Aufgaben und Kennzahlen für wiederkehrende Besuche bündeln. Spontane Besuche brauchen keine Vorlage.
Besuch
  Ort, Account und Priorität eintragen, optional einen Mitarbeiter zuweisen.
```

Der Außendienst öffnet die Besuchs-App über den App Launcher (die Salesforce-Doku nennt sie derzeit mal Partner Visits, mal Generic Visits, prüfen Sie den Namen in Ihrer Org), sieht die geplanten Besuche, tippt auf Get Directions und arbeitet die Aufgaben ab. Zu jeder Aufgabe zeigt die App Kontext, Kennzahlen und Sollwerte. Der Mitarbeiter trägt Werte ein, ergänzt Notizen und lädt Screenshots hoch. Sind alle Kennzahlen einer Aufgabe erfasst, ist die Aufgabe erledigt, und sind alle Aufgaben erledigt, beendet der Mitarbeiter den Besuch. Sind nur optionale Aufgaben offen, kann er den Besuch mit Begründung abschließen. Lässt sich eine Pflichtaufgabe nicht erledigen, bricht er den Besuch ab und muss einen Grund angeben. „Abgeschlossen“ heißt also nicht immer, dass jede Aufgabe erledigt ist.

Die erste Unit zeigt außerdem Aufgaben mit verknüpften Kundendatensätzen, etwa eine Garantiebedingung an einer Aufgabe zur Garantieverlängerung oder eine Anlage an einer Schadensprüfung. Das hilft bei Händlern, die [Garantieansprüche](../garantieansprueche-haendler-salesforce/) abwickeln: Der Mitarbeiter sieht in der Werkstatt die offenen Garantiebedingungen.

## Einschalten ist einfach, Lizenzumfang und Offline sind offen

Die Funktion hat eine eigene Einstellung. In den [Metadaten IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) heißt sie `enablePartnerVisitManagement`, seit API-Version 56.0, neben `enablePartnerLeadManagement` und `enablePartnerPerformanceManagement`. Alle stehen standardmäßig auf aus. „Wir haben Manufacturing Cloud“ heißt also noch nicht, dass Besuche laufen.

Zwei Punkte sollten Sie klären, bevor Sie damit planen:

- **Lizenz.** Die Salesforce-Hilfe nennt das Permission Set und die Permission Set License für Partner Visit Management für interne Nutzer und Partner Visit Management for Experience Cloud für externe Nutzer, im Beispiel mit einer Partner-Community-Lizenz. Die [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) führt „Visit Management“ im Editionsvergleich. Welche Ihrer Editionen diese Permission Set Licenses in welcher Menge enthalten und ob der externe Ablauf dem internen mobilen entspricht: Lassen Sie es schriftlich bestätigen.
- **Offline.** Die Quellen zu Partner Visit Management, die ich geprüft habe, bestätigen keinen Offline-Betrieb. Die allgemeine Zeile „Full Offline Mobile Functionality“ auf der Preisseite sagt nichts über die Besuchskomponenten. In Händlerwerkstätten und Lagern ist der Empfang oft schlecht. Fragen Sie Salesforce, ob Start und Ende des Besuchs, Aufgaben, Kennzahlen und Datei-Upload offline laufen, und testen Sie vor dem Rollout Flugmodus und Wiederverbindung mit widersprüchlichen Änderungen.

Wie ich beide Punkte in der Lizenzplanung behandle, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Rechenbeispiel: 60 Händler, quartalsweise, fünf Kennzahlen

Angenommen, ein Landmaschinenhersteller hat 60 Händler und sechs Gebietsverkaufsleiter. Jeder Händler wird einmal im Quartal besucht. Der Besuch prüft fünf Kennzahlen: Ersatzteilbestand der 20 Schnelldreher, Zahl geschulter Mechaniker, Vorführmaschinen vor Ort, offene Garantieansprüche älter als 30 Tage und den erreichten Anteil am Quartalsziel.

Das ergibt 240 Besuche und 1.200 Kennzahlwerte im Jahr, jeweils mit Sollwert. Mit passenden Berichten sieht die Vertriebsleitung nach einem Jahr, welche Händler den Ersatzteilbestand jedes Quartal verfehlen und welcher Gebietsleiter die Schulungstermine nie erfasst. Heute steht das in Word-Dokumenten oder E-Mails, wenn überhaupt.

Drei Dinge entscheiden, ob es funktioniert:

1. **Kennzahlen vor dem Besuch.** Fünf Kennzahlen mit klarer Definition, abgestimmt mit der Vertriebsleitung. „Ersatzteilbestand“ braucht eine Teileliste und eine Zählregel.
2. **Sollwerte pro Händler.** Ein kleiner Händler und ein Flaggschiffhändler sollten nicht dasselbe Soll haben. Jemand muss die Sollwerte pflegen, am besten einmal im Jahr.
3. **Eine Vorlage.** Alle Quartalsbesuche nutzen dasselbe Action Plan Template, damit die Werte vergleichbar sind. Sonderthemen laufen als spontane Besuche.

Auch abgebrochene Besuche liefern Daten. Weil die App beim Abbruch einen Grund verlangt, sehen Sie nach einem Jahr, ob Pflichtaufgaben an fehlender Zeit, an fehlenden Ansprechpartnern beim Händler oder an unklaren Kennzahlen scheitern. Das Standardfeld für den Grund (StatusRemarks am Visit) ist Freitext. Wollen Sie Gründe auswerten, legen Sie ein eigenes Auswahllistenfeld an und prüfen, ob die mobile Standardaktion es abfragt oder der Flow erweitert werden muss.

Lassen sich gemeinsame Kennzahlen nicht vereinbaren, sammelt die Funktion Daten, die niemand vergleicht. Dann ist das Problem eine Führungsfrage im Vertrieb, und keine Software löst sie.

## Wann reicht ein einfacher Besuchsbericht?

Bei seltenen Besuchen, ohne feste Checkliste und ohne Bedarf an Aufgaben, Sollwerten oder Vorlagen. Dann kann ein eigenes Objekt mit Datum, Händler, Mitarbeiter, drei Auswahllisten und einem Notizfeld oder Standard-Termine in Salesforce mit einem kurzen Seitenlayout reichen. Entscheidend ist, wie komplex und wiederholbar der Besuchsablauf ist, nicht allein die Zahl der Händler.

```pro-contra
pro: Partner Visit Management ist ein starker Kandidat bei
- Vielen Händlern in festem Rhythmus, sodass Vorlagen Planungszeit sparen
- Denselben Kennzahlen für jeden Händler, sodass Vergleiche Sinn ergeben
- Kontext wie Sales Agreements, Anlagen oder Garantiebedingungen, den der Mitarbeiter vor Ort braucht
- Gesteuerter Händlerleistung, etwa als Eingang für [Händlerboni](../rebate-management-haendlerboni/) oder für das [Manufacturing-Cloud-Kundenportal](../manufacturing-cloud-kundenportal/)
contra: Was für den einfachen Bericht spricht
- Für einen engen Ablauf ist er schnell gebaut und läuft eventuell mit den Lizenzen, die Ihr Vertrieb schon hat (prüfen)
- Er lässt sich leicht auswerten
- Lizenzumfang und Offline-Betrieb der Besuchs-App sind noch zu bestätigen
```

Das Kapitel [Händler und Partnerkanal](../../masterclass/manufacturing-cloud/haendler-und-partnerkanal/) der Masterclass zeigt, wie Besuche neben Boni, Portalen und Ship and Debit stehen. Ob man eine solche Funktion kauft oder baut, gehört zu meiner Arbeit an [Make-or-Buy und Lizenzprognose](../../leistungen/make-or-buy-lizenzen/).

## Kennzahlen mit Sollwert aufschreiben, dann eine Region pilotieren

1. **Kennzahlen.** Fünf Kennzahlen mit Definition, Datentyp und Sollwert pro Händlergruppe aufschreiben.
2. **Lizenz und Offline.** Lizenzumfang und Offline-Betrieb schriftlich bestätigen lassen, für den Außendienst und, falls geplant, für Händlermitarbeiter.
3. **Pilot.** Eine Region, ein Quartal, eine Vorlage.
4. **Auswertung.** Nach dem Quartal prüfen, welche Kennzahlen erfasst wurden und welche zu einer Entscheidung geführt haben.

Den Pilot werte ich mit der Vertriebsleitung aus. Kennzahlen, die nach einem Quartal zu keiner Entscheidung geführt haben, fliegen aus der Vorlage, bevor sie auf alle Regionen geht.
