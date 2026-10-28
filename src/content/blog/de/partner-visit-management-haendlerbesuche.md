---
title: "Partner Visit Management: Händlerbesuche mit KPIs"
description: "Wie Partner Visit Management in der Manufacturing Cloud Händlerbesuche in Aufgaben und Kennzahlen übersetzt und was der Außendienst mobil erfasst."
pubDate: 2026-10-28
lang: de
slug: partner-visit-management-haendlerbesuche
translationKey: manufacturing-cloud-partner-visit-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Partner Visit Management, Händler, Distributoren, Kennzahlen, Mobil]
takeaways:
  - "Partner Visit Management plant Händlerbesuche mit Ort, Account, Priorität und zugewiesenem Mitarbeiter und gibt jedem Besuch Aufgaben mit Kennzahlen, die der Außendienst am Handy erfasst."
  - "Jede Kennzahl hat einen Sollwert. Der Innendienst vergleicht so Soll und Ist pro Aufgabe über alle Händler, statt Besuchsberichte im Freitext zu lesen."
  - "Aufgaben können Kontext tragen, etwa ein Sales Agreement, einen Auftrag, eine Anlage oder eine Garantiebedingung, damit der Mitarbeiter beim Händler den richtigen Datensatz sieht."
  - "Die Funktion hat einen eigenen Schalter, enablePartnerVisitManagement, seit API-Version 56.0. Lizenz und Offline-Fähigkeit dokumentiert Trailhead nicht, fragen Sie Salesforce vor der Planung."
  - "Bei wenigen Händlern ohne feste Kennzahlen reicht ein einfaches Besuchsberichtsobjekt. Die Funktion lohnt sich, wenn viele Händler mit derselben Checkliste besucht werden."
faq:
  - q: "Was ist Partner Visit Management in Salesforce?"
    a: "Eine Funktion der Manufacturing Cloud für geplante und spontane Besuche bei Händlern, Distributoren und Lieferanten. Manager legen Aufgaben und Kennzahlen mit Sollwerten fest, der Außendienst führt den Besuch in einer mobilen App durch und erfasst Istwerte, Notizen und Screenshots."
  - q: "Welche Kennzahlen kann der Außendienst beim Besuch erfassen?"
    a: "Trailhead nennt als Beispiele Ersatzteilbestände, Ausschussquoten und Termine von Sicherheitsschulungen. Kennzahlen können Ja/Nein, Prozent, Dezimalzahl, Ganzzahl, Datum und Uhrzeit oder Text sein."
  - q: "Funktioniert Partner Visit Management offline?"
    a: "Die Trailhead-Units sagen dazu nichts. Die Preisseite nennt volle Offline-Funktion für Mobilgeräte in der Funktionsliste für den Vertrieb, ohne zu sagen, ob das die App Partner Visits umfasst. Lassen Sie sich das von Salesforce schriftlich bestätigen."
  - q: "Brauche ich Partner Visit Management für Händlerbesuche?"
    a: "Nicht bei einer Handvoll Händler und Besuchen ohne feste Kennzahlen. Ein eigenes Besuchsobjekt mit wenigen Feldern oder Standard-Termine in Salesforce sind günstiger im Betrieb. Die Funktion lohnt sich bei vielen Händlern und einer wiederkehrenden Checkliste."
draft: false
---

Partner Visit Management kann aus Händlerbesuchen vergleichbare Daten machen, wenn Sie die Kennzahlen vor dem ersten Besuch festlegen. Die Funktion der Manufacturing Cloud plant Besuche mit Aufgaben, jede Aufgabe trägt Kennzahlen mit Sollwert, und der Außendienst erfasst die Istwerte am Handy. Der Innendienst vergleicht dann Soll und Ist über alle Händler, statt Besuchsberichte zu lesen. Trailhead beschreibt den Ablauf gut. Nicht beschrieben sind die Lizenz für den Außendienst und die Frage, ob die App offline läuft. Beides gehört ins Angebot. Bei wenigen Händlern ohne feste Checkliste reicht ein einfaches Besuchsberichtsobjekt.

## Was leistet Partner Visit Management?

Partner Visit Management plant und dokumentiert Besuche bei Händlern, Distributoren und Lieferanten. Das [Trailhead-Modul](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management) beschreibt drei Teile:

- **Besuche.** Ein Besuch hat einen Ort, besondere Anweisungen und einen zugewiesenen Außendienstmitarbeiter. Wiederkehrende Besuche folgen einer Vorlage. Spontane Besuche klären dringende Themen, im Trailhead-Beispiel einen gemeldeten Fehler an einem Modell.
- **Aufgaben.** Jeder Besuch hat Aufgaben, die ihm einen Zweck geben, etwa Quartalsziele besprechen, Garantieverlängerungen prüfen oder den Bestand kontrollieren.
- **Kennzahlen.** Aufgaben tragen Messwerte wie Ersatzteilbestand, Ausschussquote oder Termine von Sicherheitsschulungen. Möglich sind Ja/Nein, Prozent, Dezimalzahl, Ganzzahl, Datum und Uhrzeit sowie Text.

Auf der [Produktseite](https://salesforce.com/manufacturing/cloud/sales) ergänzt Salesforce, dass Besuche Ort, Priorität, geschätzte Besuchsdauer und die Historie früherer Besuche zeigen und dass Admins die Besuchsseiten aus Komponenten namens Visit Overview, Visit Actions und Visit Task List bauen.

## Wie läuft ein Besuch von der Planung bis zur Kennzahl?

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

Der Außendienst öffnet die App Partner Visits über den App Launcher, sieht die geplanten Besuche, tippt auf Get Directions und arbeitet die Aufgaben ab. Zu jeder Aufgabe zeigt die App Kontext, Kennzahlen und Sollwerte. Der Mitarbeiter trägt Werte ein, ergänzt Notizen und lädt Screenshots hoch. Sind alle Kennzahlen einer Aufgabe erfasst, ist die Aufgabe erledigt, und sind alle Aufgaben erledigt, ist der Besuch abgeschlossen. Lässt sich eine Pflichtaufgabe nicht erledigen, bricht der Mitarbeiter den Besuch ab und muss einen Grund angeben.

Die erste Unit zeigt außerdem Aufgaben mit verknüpften Kundendatensätzen, etwa eine Garantiebedingung an einer Aufgabe zur Garantieverlängerung oder eine Anlage an einer Schadensprüfung. Das hilft bei Händlern, die [Garantieansprüche](../garantieansprueche-haendler-salesforce/) abwickeln: Der Mitarbeiter sieht in der Werkstatt die offenen Garantiebedingungen.

## Wie schalten Sie es ein, und was ist offen?

Die Funktion hat eine eigene Einstellung. In den [Metadaten IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) heißt sie `enablePartnerVisitManagement`, seit API-Version 56.0, neben `enablePartnerLeadManagement` und `enablePartnerPerformanceManagement`. Alle stehen standardmäßig auf aus. „Wir haben Manufacturing Cloud“ heißt also noch nicht, dass Besuche laufen.

Zwei Punkte sind in den Quellen, die ich geprüft habe, nicht dokumentiert:

- **Lizenz.** Trailhead verweist auf einen Hilfeartikel zu Permission Sets für Partner Visit Management, nennt in den Units aber weder Permission Set noch Lizenz. Die [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) führt „Visit Management“ in der Funktionsliste, ohne pro Edition zu zeigen, wo es enthalten ist. Ob der eigene Außendienst eine Manufacturing-Cloud-Lizenz braucht und ob Händlermitarbeiter Besuche mit einer Portallizenz durchführen können: Fragen Sie Salesforce.
- **Offline.** Die Units sprechen von „ihrer mobilen App“ und der App Partner Visits. Die Preisseite nennt „Full Offline Mobile Functionality“ in derselben Funktionsliste, wieder ohne Zuordnung zur Edition, und sagt nichts über die Besuchs-App. In Händlerwerkstätten und Lagern ist der Empfang oft schlecht. Fragen Sie Salesforce, ob Besuche, Aufgaben und Kennzahlen offline erfasst werden können, und testen Sie es vor dem Rollout im Keller.

Wie ich beide Punkte in der Lizenzplanung behandle, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Szenario: 60 Händler, quartalsweise, fünf Kennzahlen

Ein typisches Szenario, als Annahme: Ein Landmaschinenhersteller hat 60 Händler und sechs Gebietsverkaufsleiter. Jeder Händler wird einmal im Quartal besucht. Der Besuch prüft fünf Kennzahlen: Ersatzteilbestand der 20 Schnelldreher, Zahl geschulter Mechaniker, Vorführmaschinen vor Ort, offene Garantieansprüche älter als 30 Tage und den erreichten Anteil am Quartalsziel.

Das ergibt 240 Besuche und 1.200 Kennzahlwerte im Jahr, jeweils mit Sollwert. Nach einem Jahr sieht die Vertriebsleitung, welche Händler den Ersatzteilbestand jedes Quartal verfehlen und welcher Gebietsleiter die Schulungstermine nie erfasst. Heute steht das in Word-Dokumenten oder E-Mails, wenn überhaupt.

Drei Dinge entscheiden, ob es funktioniert:

1. **Kennzahlen vor dem Besuch.** Fünf Kennzahlen mit klarer Definition, abgestimmt mit der Vertriebsleitung. „Ersatzteilbestand“ braucht eine Teileliste und eine Zählregel.
2. **Sollwerte pro Händler.** Ein kleiner Händler und ein Flaggschiffhändler sollten nicht dasselbe Soll haben. Jemand muss die Sollwerte pflegen, am besten einmal im Jahr.
3. **Eine Vorlage.** Alle Quartalsbesuche nutzen dasselbe Action Plan Template, damit die Werte vergleichbar sind. Sonderthemen laufen als spontane Besuche.

Auch abgebrochene Besuche liefern Daten. Weil die App beim Abbruch einen Grund verlangt, sehen Sie nach einem Jahr, ob Pflichtaufgaben an fehlender Zeit, an fehlenden Ansprechpartnern beim Händler oder an unklaren Kennzahlen scheitern. Legen Sie die Gründe als Auswahlliste an, nicht als Freitext, sonst lässt sich das nicht auswerten.

Lassen sich gemeinsame Kennzahlen nicht vereinbaren, sammelt die Funktion Daten, die niemand vergleicht. Dann ist das Problem eine Führungsfrage im Vertrieb, und keine Software löst sie.

## Wann reicht ein einfacher Besuchsbericht?

Bei wenigen Händlern, seltenen Besuchen oder ohne feste Checkliste. Ein eigenes Objekt mit Datum, Händler, Mitarbeiter, drei Auswahllisten und einem Notizfeld oder Standard-Termine in Salesforce mit einem kurzen Seitenlayout decken das ab.

```pro-contra
pro: Partner Visit Management lohnt sich bei
- Vielen Händlern in festem Rhythmus, sodass Vorlagen Planungszeit sparen
- Denselben Kennzahlen für jeden Händler, sodass Vergleiche Sinn ergeben
- Kontext wie Sales Agreements, Anlagen oder Garantiebedingungen, den der Mitarbeiter vor Ort braucht
- Gesteuerter Händlerleistung, etwa als Eingang für [Händlerboni](../rebate-management-haendlerboni/) oder für das [Manufacturing-Cloud-Kundenportal](../manufacturing-cloud-kundenportal/)
contra: Was für den einfachen Bericht spricht
- Er kostet wenig und läuft mit den Lizenzen, die Ihr Vertrieb schon hat
- Er lässt sich leicht auswerten
- Lizenz und Offline-Fähigkeit der Besuchs-App sind nicht dokumentiert
```

Das Kapitel [Händler und Partnerkanal](../../masterclass/manufacturing-cloud/haendler-und-partnerkanal/) der Masterclass zeigt, wie Besuche neben Boni, Portalen und Ship and Debit stehen. Ob man eine solche Funktion kauft oder baut, gehört zu meiner Arbeit an [Make-or-Buy und Lizenzprognose](../../leistungen/make-or-buy-lizenzen/).

## Wo sollten Sie anfangen?

1. **Kennzahlen.** Fünf Kennzahlen mit Definition, Datentyp und Sollwert pro Händlergruppe aufschreiben.
2. **Lizenz und Offline.** Beides schriftlich bestätigen lassen, für den Außendienst und, falls geplant, für Händlermitarbeiter.
3. **Pilot.** Eine Region, ein Quartal, eine Vorlage.
4. **Auswertung.** Nach dem Quartal prüfen, welche Kennzahlen erfasst wurden und welche zu einer Entscheidung geführt haben.

Partner Visit Management macht Händlerbesuche vergleichbar, sobald die Kennzahlen vereinbart sind und die App dort funktioniert, wo Ihr Außendienst arbeitet. Wenn Sie das für Ihr Händlernetz prüfen möchten, [schreiben Sie mir](#contact).
