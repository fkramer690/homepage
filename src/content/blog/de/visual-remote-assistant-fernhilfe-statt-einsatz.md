---
title: "Visual Remote Assistance: Wann Video den Einsatz ersetzt"
metaTitle: "Visual Remote Assistance mit Salesforce: Video statt Einsatz"
description: "Visuelle Fernunterstützung mit Salesforce Visual Remote Assistant: wann Video den Technikereinsatz ersetzt, was es kostet und was Sie vorher klären."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: visual-remote-assistant-fernhilfe-statt-einsatz
translationKey: visual-remote-assistant-instead-of-visit
topic: field-service
categories: [field-service]
tags: [Visual Remote Assistance, Visual Remote Assistant, Field Service, Fernservice, Störungshotline, Betriebsrat]
takeaways:
  - "Der Kunde bekommt einen Link per SMS oder E-Mail. Die beidseitige Videoverbindung öffnet sich im Browser, ohne App, Login oder Passwort."
  - "Das Add-on kostet 50 € pro Nutzer und Monat zusätzlich zur Basislizenz und ist in Agentforce 1 Field Service enthalten. Externe Kunden brauchen keine Lizenz."
  - "Video ersetzt den Einsatz bei Parametern, Bedienfehlern und Resets. Bei mechanischen Schäden kann es ihn verkürzen."
  - "Vorher klären Sie die Einwilligung zur Aufzeichnung, die Einbindung des Betriebsrats und welche Fehler ohne Einsatz geschlossen werden dürfen."
  - "Zählen Sie in der Störungshistorie die Einsätze, bei denen weder Ersatzteil noch Werkzeug nötig war. Dieser Anteil ist eine erste Obergrenze, keine Prognose."
faq:
  - q: "Was ist Visual Remote Assistance im Field Service?"
    a: "Visual Remote Assistance, auf Deutsch visuelle Fernunterstützung, bedeutet: Ein Serviceexperte sieht die Maschine über die Handykamera des Kunden und leitet den Bediener per Video und mit Markierungen im Bild an. In Salesforce heißt das Produkt dafür Visual Remote Assistant, ein Add-on für Service Cloud (inzwischen auch Agentforce Service genannt) und Field Service."
  - q: "Was kostet Visual Remote Assistant?"
    a: "Laut Salesforce-Produktseite kostet das Add-on 50 € oder 50 Dollar pro Nutzer und Monat bei jährlicher Abrechnung (geprüft am 9. November 2026), zusätzlich zur Basislizenz für Service Cloud oder Field Service. Im Paket Agentforce 1 Field Service ist es enthalten. Interne Nutzer, die Sitzungen starten oder führen, brauchen eine Lizenz und die entsprechenden Berechtigungen; externe Eingeladene kommen über einen Link dazu und brauchen keine Lizenz."
  - q: "Braucht der Kunde eine App für Visual Remote Assistant?"
    a: "Nein. Der Mitarbeiter schickt einen Link per SMS oder E-Mail, der Kunde tippt darauf, akzeptiert die Nutzungsbedingungen und gibt die Kamera frei. Die Videoverbindung läuft dann im mobilen Browser, ohne App-Download, Login oder Passwort."
  - q: "Kann ein Techniker vor Ort eine Videositzung mit einem Experten starten?"
    a: "Ja. Ein Techniker kann eine Sitzung aus dem Arbeitsauftrag in der Field-Service-App heraus starten, und die Sitzung wird mit diesem Datensatz verknüpft. Experten können auch zu einer laufenden Sitzung dazukommen."
  - q: "Wo liegen die Videodaten?"
    a: "Das Installationshandbuch nennt AWS Nordamerika als Standardregion und AWS Europa als Option. Die Region lässt sich nur ändern, solange das VRA-Konto inaktiv ist. Für Kunden in der EU würde ich bei der Einrichtung die europäische Region wählen. Damit ist die Datenschutzprüfung aber noch nicht abgeschlossen: Aufzeichnungen, Bilder, SMS-Einladungen und Unterauftragsverarbeiter gehören ebenfalls in die Prüfung."
draft: false
---

Visual Remote Assistance, also visuelle Fernunterstützung per Video, ersetzt einen Technikereinsatz, wenn der Bediener vor Ort den Fehler mit Anleitung selbst beheben kann: ein falscher Parameter, ein Bedienfehler, ein Reset, ein verschmutzter Sensor. In Salesforce heißt das Werkzeug dafür Visual Remote Assistant. Der Kunde bekommt einen Link per SMS oder E-Mail und startet damit im mobilen Browser eine Videoverbindung, ohne App und Login. Ihr Mitarbeiter zeichnet direkt ins Bild. Das Add-on kostet 50 € pro Nutzer und Monat zusätzlich zur Basislizenz und ist in Agentforce 1 Field Service enthalten. Bei mechanischen Schäden erspart das Video selten den Einsatz, oft aber einen zweiten.

## Was kann Visual Remote Assistant?

Visual Remote Assistance ist der allgemeine Begriff: Ein Experte sieht, was der Kunde sieht, und leitet ihn per Video an. Visual Remote Assistant ist das Salesforce-Produkt dafür, ein Videowerkzeug für Service Cloud und Field Service, also für Hotline und Außendienst. Laut [Produktseite](https://salesforce.com/products/visual-remote-assistant) schickt der Mitarbeiter einen sicheren Link per SMS oder E-Mail auf das Smartphone des Kunden. Tippt der Kunde darauf, startet im mobilen Browser eine beidseitige Videoverbindung. App-Download, Login oder Passwort sind nicht nötig.

Während der Sitzung kann der Mitarbeiter laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/visual-remote-assistant/set-up-visual-remote-assistant):

- Markierungen wie Pfeile oder Kreise auf das Display des Kunden setzen,
- Fotos für den Vorgang aufnehmen oder an einen Experten weiterleiten,
- einen Experten zur laufenden Sitzung holen,
- einen Folgetermin einplanen,
- Barcodes und QR-Codes per Texterkennung (OCR) lesen, etwa um eine Artikelnummer nachzuschlagen.

Die Produktseite nennt außerdem die Aufzeichnung zur späteren Auswertung. Seit Winter '27 ist sie auch [auf Abruf](https://help.salesforce.com/s/articleView?id=release-notes.rn_fieldservice_264_vra_ondemand_recording.htm&language=en_US&type=5) möglich, sodass der Mitarbeiter nur wichtige Momente wie den Nachweis einer Installation aufzeichnet. Hinzu kommen eine OCR-Funktion, die passende Knowledge-Artikel vorschlägt, und eine Zufriedenheitsumfrage nach jeder Sitzung. Bildschirmfreigabe am Desktop gibt es ebenfalls.

Zwei technische Details aus dem [Installations- und Konfigurationshandbuch](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/vra_installation_configuration_manual.pdf) sind für Maschinenbauer wichtig; prüfen Sie sie im Handbuch Ihrer Paketversion, denn Salesforce unterstützt nur die aktuelle und die zwei vorherigen Versionen. Erstens startet jede Sitzung an einem Salesforce-Datensatz, etwa einem Case oder Arbeitsauftrag, und die Zusammenfassung mit den Bildern kann an diesem Datensatz gespeichert werden; Aufzeichnungen erscheinen dort nur, wenn sie in der VRA-Konfiguration eingeschaltet sind und der Flow zum Abholen aktiv ist. Zweitens kann ein Techniker die Sitzung aus dem Arbeitsauftrag in der Field-Service-App heraus starten. Damit ist der zweite Anwendungsfall abgedeckt: Der Techniker vor Ort zieht den Experten aus der Zentrale hinzu.

## Das Add-on kostet 50 € pro Nutzer und Monat

```kennzahlen
50 € | pro Nutzer und Monat für das Add-on, bei jährlicher Abrechnung
650 € | pro Nutzer und Monat für Agentforce 1 Field Service, Add-on enthalten
quelle: Salesforce-Produktseite Visual Remote Assistant und Preisseite Field Service, Stand Oktober 2026
```

Die US-Produktseite nennt dieselben Zahlen in Dollar. Die [Preisseite für Field Service](https://www.salesforce.com/service/field-service-management/pricing/) führt das Add-on nur in Dollar mit denselben 50 Dollar auf und listet Visual Remote Assistant als Bestandteil von Agentforce 1 Field Service. Trailhead nennt Service-Cloud- oder Field-Service-Lizenzen als Voraussetzung; die Lizenzen für Visual Remote Assistant selbst kaufen Sie über Ihren Account Executive.

Lizenziert werden die internen Nutzer, die Sitzungen starten oder führen: Hotline, Remote-Experten, vielleicht erfahrene Techniker. Externe Kunden kommen über den Link dazu und brauchen keine Lizenz. Acht Nutzer kosten zum Listenpreis 400 € im Monat oder 4.800 € im Jahr, zusätzlich zu ihren Service-Cloud- oder Field-Service-Lizenzen. Verglichen mit einer einzigen eingesparten Reise ins Ausland ist das wenig. Der eigentliche Aufwand liegt in der Einrichtung, in Netz- und Geräteprüfungen, in den Regeln für Fehlerbehebungen per Video und in der Schulung der Hotline.

## Wann ersetzt Visual Remote Assistance den Einsatz?

Aus meiner Sicht passt Video für Maschinenbauer in vier Situationen:

- **Bedienfehler und Parameter.** Die Maschine läuft, aber falsch, weil ein Rezept oder eine Einstellung geändert wurde. Ihr Mitarbeiter sieht das Bedienpanel und führt den Bediener zurück zur richtigen Einstellung.
- **Einfache Handgriffe, die der Kunde machen darf.** Sensor reinigen, Schutztürschalter zurücksetzen, Stecker neu stecken. Was ein Bediener anfassen darf, legen Ihre eigenen Sicherheitsregeln fest.
- **Exportkunden in großer Entfernung.** Ein Einsatz auf einem anderen Kontinent kostet Tage. Sind solche Reisen häufig, kann sich ein Videoanruf, der auch nur jeden fünften Fall löst, schnell rechnen.
- **Diagnose vor dem Einsatz.** Der Bediener zeigt Typenschild, Fehlermeldung und das beschädigte Teil. Der Techniker hat dann bessere Chancen, nur einmal zu fahren, mit dem richtigen Teil und der passenden Qualifikation.

Das Video kann einen Einsatz nicht ersetzen, wenn die Arbeit Werkzeug, eine Elektrofachkraft oder eine unterschriebene Abnahme vor Ort erfordert oder wenn der Kunde in der Produktion keine Kameras erlaubt. In diesen Fällen verkürzt es den Einsatz. Dort liegt oft der größere Nutzen, denn ein zweiter Einsatz wegen eines fehlenden Teils kostet etwa so viel wie der erste.

Visual Remote Assistant passt zur Triage, die ich für die [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/) beschreibe: Erst klären, ob die Maschine steht und was der Vertrag abdeckt, dann entscheiden, ob Video, ein Teileversand oder ein Techniker das Problem löst. Dem Experten, der die Videositzung führt, hilft der [Agent zur Fehlersuche](../ki-fehlersuche-handbuecher-aussendienst/) nur, wenn die Handbücher denselben Produktschlüssel haben wie das Asset.

## Rechenbeispiel: 20 Prozent per Video gelöst

Die Zahlen sind angenommen. Bei einem Hersteller von Verpackungsmaschinen führen 150 Störungsmeldungen im Monat zu einem Technikereinsatz, ein Drittel davon bei Kunden außerhalb Europas. Das sind die Anrufe, die am Telefon nicht gelöst wurden.

Der Hersteller lizenziert sechs Hotline-Mitarbeitende und zwei Remote-Experten, also acht Nutzer zu je 50 €, zusammen 4.800 € im Jahr. Das Ziel für das erste Jahr ist, 20 Prozent dieser Einsätze per Video zu lösen, also 30 Einsätze weniger im Monat. Das setzt voraus, dass der Kunde die Videositzung annimmt, vor Ort Kamera und Netz verfügbar sind und ein qualifizierter Bediener anwesend ist; messen Sie deshalb auch Angebots-, Annahme- und Verbindungsquote. Außerdem lässt sich der Techniker vor jedem verbleibenden Einsatz den Fehler per Video bestätigen.

Wichtiger als das Ziel ist die Methode. Vor dem Pilotprojekt wertet das Serviceteam die Störungsaufträge eines Jahres aus und ordnet jeden einer Ursache zu: Bedienfehler, Parameter, Verschleißteil, mechanischer Schaden, elektrischer Fehler. Nur Fälle aus den ersten beiden Gruppen sowie Verschleißteile, die der Kunde selbst tauschen darf, kommen für eine Lösung per Video infrage. Machen diese Fälle 35 Prozent der Einsätze des Vorjahres aus, sind 20 Prozent realistisch. Machen sie 10 Prozent aus, rechnet sich der Business Case nur über die bessere Diagnose, und das sollte man offen sagen.

Nach drei Monaten zeigen zwei Zahlen, ob es funktioniert: der Anteil der Videositzungen, nach denen der Fall geschlossen wird, und der Anteil dieser Fälle mit erneutem Anruf innerhalb von sieben Tagen. Eine Lösung per Video, auf die zwei Tage später doch ein Einsatz folgt, hat keinen Einsatz gespart, auch wenn sie ihn verkürzt hat. Messen Sie den Nutzen für die Diagnose deshalb getrennt, zum Beispiel über die Erstlösungsquote und über Einsätze mit fehlendem Teil.

## Visual Remote Assistant oder ein Drittanbieter?

Salesforce ist nicht der einzige Anbieter. TechSee, SightCall und Zoho Lens verkaufen visuelle Fernunterstützung als eigenes Produkt, und TechSee führt eine App für Agentforce auf der AppExchange. Für einen Hersteller ist weniger entscheidend, welches Video besser ist, als wo die Sitzung abgelegt wird.

- **Visual Remote Assistant** läuft in Ihrer Salesforce-Org. Sitzungen starten am Fall oder am Arbeitsauftrag, und das Ergebnis bleibt an diesem Datensatz. Das passt, wenn der Service ohnehin in Service Cloud und Field Service arbeitet und Sie die Lizenzierung in einem Gespräch bündeln wollen.
- **Ein Drittanbieter** passt, wenn Sie mehr brauchen als Video und Zeichnen, etwa Bilderkennung mit KI, Anleitungen mit Augmented Reality oder Fernhilfe für Kunden außerhalb Ihrer Salesforce-Prozesse. Dann muss die Integration Teil des Projekts sein: Wer startet die Sitzung, wo werden Aufzeichnung und Ergebnis gespeichert, und welche Daten verarbeitet der Anbieter?

Meine Faustregel: Beginnen Sie mit dem Werkzeug, das die Sitzung dort ablegt, wo Ihr Serviceteam schon arbeitet. Wechseln Sie erst, wenn das Werkzeug eine konkrete Anforderung nicht erfüllt, etwa eine AR-Anleitung für eine komplexe Baugruppe, und testen Sie den Kandidaten zuerst mit Ihren drei häufigsten Störungsarten.

## Vor der ersten Sitzung: Einwilligung, Betriebsrat, Abschlussregeln

**Aufzeichnung und Datenschutz.** Die Aufzeichnung wird in der VRA-Konfiguration eingeschaltet, entweder für ganze Sitzungen oder seit Winter '27 auf Abruf. Im Bild sind die Mitarbeitenden des Kunden und seine Produktionshalle. Eine Vereinbarung mit dem Kundenunternehmen ersetzt nicht die Rechtsgrundlage und die Information der Personen vor der Kamera; klären Sie mit Ihrem Datenschutzbeauftragten die Rechtsgrundlage für das Livevideo und getrennt davon für die Aufzeichnung, außerdem die Aufbewahrung und wer die Aufzeichnungen sehen darf. Manche Kunden werden Aufzeichnungen ablehnen, der Prozess muss also auch ohne Aufzeichnung funktionieren.

**Betriebsrat für eigene Mitarbeitende.** Auch ohne Aufzeichnung machen Sitzungszeiten, Dauer, Notizen und VRA-Berichte pro Nutzer das System zu einer technischen Einrichtung, mit der sich die Leistung überwachen lässt. Hier redet der Betriebsrat von Anfang an mit, auch bei Zugriffen, Berichten und Aufbewahrung. Ich würde das Thema zusammen mit Zeiterfassung und Standortdaten im Rahmen der [Field-Service-Einführung](../salesforce-field-service-einfuehrung/) einbringen.

**Region für das Hosting.** Das Installationshandbuch nennt AWS Nordamerika als Standard und AWS Europa als Option. Die Sitzungsdomains verwenden techsee.me, SMS-Einladungen laufen über Gateway-Anbieter. Ihr Datenschutzbeauftragter sollte darüber vor dem ersten Kundengespräch informiert sein, und Ihre IT prüft Firewall-Regeln, Browser und die Kamerafreigabe auf Kundengeräten.

**Welche Fehler ohne Einsatz geschlossen werden dürfen.** Legen Sie schriftlich fest, welche Fehlerklassen eine Videositzung ohne Einsatzbericht schließen darf und wie die Anweisung an den Bediener am Case dokumentiert wird. Wenn der Bediener einer falschen Anweisung folgt und die Maschine beschädigt, müssen Sie wissen, was gesagt wurde.

## Die Störungen des letzten Jahres nach Ursache ordnen

```schritte
Störungen ordnen
  Die Störungseinsätze des letzten Jahres nach Ursache ordnen und die zählen, für die weder Ersatzteil noch Werkzeug nötig war. Dieser Anteil ist eine erste Obergrenze.
Pilotprojekt durchführen | 3 Monate
  Eine Produktlinie, eine Exportregion, zwei oder drei Nutzer.
Messen und entscheiden
  Lösungsquote und erneute Anrufe auswerten, dann über den Rollout entscheiden.
```

Wie das zur mobilen App und zu Servicedokumenten passt, steht im [Masterclass-Kapitel zur mobilen App](../../masterclass/field-service/field-service-mobile-app-dokumente/). Ob sich Field Service überhaupt rechnet, beschreibe ich in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/), und die Lizenzfrage als Ganzes unter [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).
