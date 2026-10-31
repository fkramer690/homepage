---
title: "Visual Remote Assistant: Videohilfe statt Einsatz?"
description: "Wann eine Videositzung mit Visual Remote Assistant den Technikereinsatz beim Maschinenbauer ersetzt, was sie kostet und was Sie vorher klären müssen."
pubDate: 2026-10-28
lang: de
slug: visual-remote-assistant-fernhilfe-statt-einsatz
translationKey: visual-remote-assistant-instead-of-visit
topic: field-service
categories: [field-service]
tags: [Visual Remote Assistant, Field Service, Fernservice, Störungshotline, Betriebsrat]
takeaways:
  - "Der Kunde bekommt einen Link per SMS oder E-Mail. Das Video in beide Richtungen öffnet sich im Browser, ohne App, Login oder Passwort."
  - "Das Add-on kostet 50 € pro Nutzer und Monat (Stand Oktober 2026) und steckt in Agentforce 1 Field Service. Der Kunde braucht keine Lizenz."
  - "Video ersetzt den Einsatz bei Parametern, Bedienfehlern und Resets. Bei mechanischen Schäden verkürzt es ihn, weil das richtige Teil mitkommt."
  - "Vorher klären Sie die Einwilligung zur Aufzeichnung, den Betriebsrat und welche Fehler ohne Einsatz geschlossen werden dürfen."
  - "Zählen Sie in der Störungshistorie die Einsätze ohne Teil und Werkzeug. Dieser Anteil ist Ihr realistisches Potenzial."
faq:
  - q: "Was kostet Visual Remote Assistant?"
    a: "Laut Salesforce-Produktseite kostet das Add-on 50 € oder 50 Dollar pro Nutzer und Monat bei jährlicher Abrechnung (Oktober 2026). Im Paket Agentforce 1 Field Service ist es enthalten. Lizenzen brauchen nur die Personen, die Sitzungen führen, der Kunde kommt über einen Link dazu."
  - q: "Braucht der Kunde eine App für Visual Remote Assistant?"
    a: "Nein. Der Mitarbeiter schickt einen Link per SMS oder E-Mail, der Kunde tippt darauf, akzeptiert die Nutzungsbedingungen und gibt die Kamera frei. Das Video läuft dann im mobilen Browser, ohne App-Download, Login oder Passwort."
  - q: "Kann ein Techniker vor Ort eine Videositzung mit einem Experten starten?"
    a: "Ja. Laut Installationshandbuch lassen sich Sitzungen über eine App-Erweiterung aus der Field-Service-App starten, der Techniker landet dabei auf dem zugehörigen Arbeitsauftrag. Experten können auch zu einer laufenden Sitzung dazukommen."
  - q: "Wo liegen die Videodaten?"
    a: "Das Installationshandbuch nennt AWS Nordamerika als Standardregion und AWS Europa als Option. Für Kunden in der EU würde ich bei der Einrichtung die europäische Region wählen und die Entscheidung für den Datenschutz dokumentieren."
draft: false
---

Visual Remote Assistant ersetzt einen Technikereinsatz, wenn der Bediener vor Ort den Fehler mit Anleitung selbst beheben kann: ein falscher Parameter, ein Bedienfehler, ein Reset, ein verschmutzter Sensor. Der Kunde bekommt einen Link per SMS oder E-Mail und öffnet ein Video in beide Richtungen im mobilen Browser, ohne App und ohne Login, und Ihr Mitarbeiter zeichnet direkt ins Bild. Das Add-on kostet laut Produktseite vom Oktober 2026 50 € oder 50 Dollar pro Nutzer und Monat und ist in Agentforce 1 Field Service enthalten. Bei mechanischen Schäden spart das Video nicht den Einsatz, aber den zweiten, weil der Techniker gleich mit dem richtigen Teil kommt.

## Was kann Visual Remote Assistant?

Visual Remote Assistant ist ein Videowerkzeug für Service Cloud und Field Service, also für Hotline und Außendienst. Laut [Produktseite](https://salesforce.com/products/visual-remote-assistant) schickt der Mitarbeiter einen sicheren Link per SMS oder E-Mail auf das Smartphone des Kunden. Tippt der Kunde darauf, startet im mobilen Browser ein Video in beide Richtungen. App-Download, Login oder Passwort sind nicht nötig.

Während der Sitzung kann der Mitarbeiter laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/visual-remote-assistant/set-up-visual-remote-assistant):

- Markierungen wie Pfeile oder Kreise auf das Display des Kunden setzen,
- Fotos für den Vorgang aufnehmen oder an einen Experten weiterleiten,
- einen Experten zur laufenden Sitzung holen,
- einen Folgetermin einplanen,
- Barcodes und QR-Codes per Texterkennung (OCR) lesen, etwa um eine Artikelnummer nachzuschlagen.

Die Produktseite nennt dazu die automatische Aufzeichnung zur späteren Auswertung, OCR, die passende Knowledge-Artikel vorschlägt, und eine Zufriedenheitsumfrage nach jeder Sitzung. Bildschirmfreigabe am Desktop gibt es ebenfalls.

Zwei technische Details aus dem [Installations- und Konfigurationshandbuch](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/vra_installation_configuration_manual.pdf) (Stand Summer '25) sind für Maschinenbauer wichtig. Erstens startet jede Sitzung an einem Salesforce-Datensatz, etwa einem Case oder Arbeitsauftrag, und die Zusammenfassung mit den Bildern hängt danach an diesem Datensatz. Zweitens kann ein Techniker die Sitzung über eine App-Erweiterung aus der Field-Service-App starten. Damit ist der zweite Anwendungsfall abgedeckt: Der Techniker vor Ort holt den Experten aus der Zentrale dazu.

## Das Add-on kostet 50 € pro Nutzer und Monat

```kennzahlen
50 € | pro Nutzer und Monat für das Add-on, bei jährlicher Abrechnung
650 € | pro Nutzer und Monat für Agentforce 1 Field Service, Add-on enthalten
quelle: Salesforce-Produktseite Visual Remote Assistant und Preisseite Field Service, Stand Oktober 2026
```

Die Produktseite nennt dieselben Beträge auch in Dollar. Die [Preisseite für Field Service](https://www.salesforce.com/service/field-service-management/pricing/) führt das Add-on nur in Dollar, mit denselben 50 Dollar, und listet Visual Remote Assistant als Bestandteil von Agentforce 1 Field Service. Trailhead nennt Service-Cloud- oder Field-Service-Lizenzen als Voraussetzung, die Lizenzen für Visual Remote Assistant kaufen Sie über den Account Executive.

Lizenziert werden die Personen, die Sitzungen starten: Hotline, Remote-Experten, vielleicht erfahrene Techniker. Der Kunde kommt über den Link dazu und braucht nichts. Acht Nutzer kosten zum Listenpreis 400 € im Monat oder 4.800 € im Jahr. Verglichen mit einer einzigen eingesparten Reise ins Ausland ist das wenig. Der eigentliche Aufwand liegt in der Einrichtung, in den Regeln für Ferndiagnosen und in der Schulung der Hotline.

## Wann ersetzt eine Videositzung den Einsatz?

Aus meiner Sicht passt Video beim Maschinenbauer in vier Situationen:

- **Bedienfehler und Parameter.** Die Maschine läuft, aber falsch, weil ein Rezept oder eine Einstellung geändert wurde. Ihr Mitarbeiter sieht das Bedienpanel und führt den Bediener zurück.
- **Einfache Handgriffe, die der Kunde machen darf.** Sensor reinigen, Schutztürschalter zurücksetzen, Stecker neu stecken. Was ein Bediener anfassen darf, legen Ihre eigenen Sicherheitsregeln fest.
- **Exportkunden weit weg.** Ein Einsatz auf einem anderen Kontinent kostet Tage. Ein Videoanruf, der auch nur jeden fünften Fall löst, rechnet sich schnell.
- **Diagnose vor dem Einsatz.** Der Bediener zeigt Typenschild, Fehlermeldung und das beschädigte Teil. Der Techniker fährt dann einmal, mit dem richtigen Teil und dem passenden Skill.

Keinen Einsatz ersetzt das Video, wenn die Arbeit Werkzeug, eine Elektrofachkraft oder eine unterschriebene Abnahme vor Ort braucht, oder wenn der Kunde in der Produktion keine Kameras erlaubt. In diesen Fällen verkürzt es den Einsatz. Dort liegt oft der größere Nutzen, denn ein zweiter Einsatz wegen eines fehlenden Teils kostet so viel wie der erste.

Visual Remote Assistant passt zur Triage, die ich für die [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/) beschreibe: Erst klären, ob die Maschine steht und was der Vertrag abdeckt, dann entscheiden, ob Video, ein Teileversand oder ein Techniker das Problem löst. Für den Experten hinter dem Video hilft der [Agent zur Fehlersuche](../ki-fehlersuche-handbuecher-aussendienst/) nur, wenn die Handbücher denselben Produktschlüssel tragen wie das Asset.

## Rechenbeispiel: 20 Prozent per Video gelöst

Die Zahlen sind angenommen. Ein Hersteller von Verpackungsmaschinen nimmt 150 Störungsmeldungen im Monat an, ein Drittel davon von Kunden außerhalb Europas. Heute endet fast jeder Anruf, der am Telefon nicht gelöst wird, mit einem Einsatz.

Der Hersteller lizenziert sechs Hotline-Mitarbeitende und zwei Remote-Experten, also acht Nutzer zu 50 €, zusammen 4.800 € im Jahr. Das Ziel für das erste Jahr: 20 Prozent der Störungen per Video lösen, also 30 Einsätze weniger im Monat. Dazu bekommt der Techniker vor jedem verbleibenden Einsatz den Fehler per Video bestätigt.

Wichtiger als das Ziel ist die Methode. Vor dem Pilot zieht das Serviceteam die Störungsaufträge eines Jahres und ordnet jeden einer Ursache zu: Bedienfehler, Parameter, Verschleißteil, mechanischer Schaden, elektrischer Fehler. Nur die ersten beiden Gruppen und Verschleißteile, die der Kunde selbst tauschen darf, kommen für eine Lösung per Video infrage. Machen sie 35 Prozent der Einsätze des Vorjahres aus, sind 20 Prozent realistisch. Machen sie 10 Prozent aus, trägt der Business Case nur über die bessere Diagnose, und das sollte man offen sagen.

Nach drei Monaten zeigen zwei Zahlen, ob es funktioniert: der Anteil der Videositzungen, die den Fall schließen, und der Anteil dieser Fälle mit erneutem Anruf innerhalb von sieben Tagen. Eine Lösung per Video, auf die zwei Tage später doch ein Einsatz folgt, hat nichts gespart.

## Vor der ersten Sitzung: Einwilligung, Betriebsrat, Abschlussregeln

**Einwilligung zur Aufzeichnung.** Sitzungen lassen sich aufzeichnen, gesteuert über eine eigene Berechtigung. Im Bild sind die Mitarbeitenden des Kunden und seine Produktionshalle. Vereinbaren Sie mit dem Kunden, ob überhaupt aufgezeichnet wird, wer die Aufnahme sieht und wie lange Sie sie aufbewahren. Manche Kunden werden ablehnen, der Prozess muss also auch ohne Aufzeichnung funktionieren.

**Betriebsrat für eigene Mitarbeitende.** Werden Sitzungen Ihrer eigenen Hotline oder Techniker aufgezeichnet oder ausgewertet, ist das eine technische Einrichtung, mit der sich Leistung überwachen lässt. Da hat der Betriebsrat mitzureden. Ich würde das Thema zusammen mit Zeiterfassung und Standort aus der [Field-Service-Einführung](../salesforce-field-service-einfuehrung/) einbringen.

**Region für das Hosting.** Das Installationshandbuch nennt AWS Nordamerika als Standard und AWS Europa als Option. Die Sitzungsdomains laufen unter techsee.me. Ihr Datenschutzbeauftragter sollte beides vor dem ersten Kundengespräch kennen.

**Welche Fehler ohne Einsatz geschlossen werden dürfen.** Legen Sie schriftlich fest, welche Fehlerklassen eine Videositzung ohne Einsatzbericht schließen darf und wie die Anweisung an den Bediener am Case dokumentiert wird. Wenn der Bediener einer falschen Anweisung folgt und die Maschine beschädigt, müssen Sie wissen, was gesagt wurde.

## Erster Schritt: die Störungen des letzten Jahres nach Ursache ordnen

```schritte
Störungen ordnen
  Die Einsätze des letzten Jahres nach Ursache ordnen und die zählen, die weder Teil noch Werkzeug gebraucht haben.
Pilot fahren | 3 Monate
  Eine Produktlinie, eine Exportregion, zwei oder drei Nutzer.
Messen und entscheiden
  Lösungsquote und erneute Anrufe auswerten, dann über den Rollout entscheiden.
```

Wie das zu mobiler App und Servicedokumenten passt, steht im [Masterclass-Kapitel zur mobilen App](../../masterclass/field-service/field-service-mobile-app-dokumente/). Ob sich Field Service überhaupt rechnet, beschreibe ich in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/), und die Lizenzfrage im Ganzen unter [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).
