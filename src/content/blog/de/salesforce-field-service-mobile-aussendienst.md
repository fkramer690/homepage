---
title: "Salesforce Field Service Mobile: Führung und Sprache"
description: "Geführte Abläufe, Formulare aus Papiervorlagen und Spracheingabe: was die Funktionen der Field Service App für Hersteller mit Außendienst bedeuten."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-field-service-mobile-aussendienst
translationKey: field-service-mobile-guided-voice
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Mobile, Fertigung, Spracheingabe]
takeaways:
  - "Salesforce-Umfragen: US-Mobilbeschäftigte schätzen 18 % Zeitverlust durch Verwaltung; 43 % der Organisationen nutzen im Außendienst weiter Papierprotokolle."
  - "Für Hersteller zählen vollständige Servicedaten: Mit sauberem Datenmodell und ERP-Anbindung erreichen Ergebnisse und Ersatzteile den Innendienst ohne Abtippen."
  - "Ein schnell digitalisiertes Papierformular hilft nur mit sauberem Datenmodell dahinter. Sonst wird ein schlechtes Formular einfach digital."
  - "Spracheingaben und Transkripte können personenbezogene Daten enthalten und je Techniker ausgewertet werden. Binden Sie Datenschutz und Betriebsrat früh ein."
faq:
  - q: "Was ist neu in der Salesforce Field Service App?"
    a: "Salesforce hat drei Ansätze zusammen vorgestellt: eine Guided Experience mit Schritt-für-Schritt-Anleitung, die sich an den Einsatz anpasst, ein Headless-Setup, das digitale Formulare aus Papiervorlagen oder bestehenden Mobile Flows erzeugt, und Voice to Form, das Formularfelder aus gesprochener Eingabe füllt. Voice to Form und die Guided Experience standen bereits vorher in den Release Notes. Das Headless-Setup ist noch nicht als konfigurierbare Funktion dokumentiert."
  - q: "Wann sind die neuen Field-Service-Funktionen verfügbar?"
    a: "Das hängt von der jeweiligen Funktion ab. Voice to Form erfordert Enterprise, Unlimited oder Developer Edition, die Field Service Mobile User License, die Agentforce for Field Service SKU und das Einstein Field Service User Permission Set. Für Formulare in einer Guided Experience sind Workforce Scheduling, Discovery Framework und App-Version 264 oder höher dokumentiert. Für das Headless-Setup habe ich mit Stand vom 9. November 2026 keine Setup-Dokumentation gefunden."
  - q: "Wie profitieren Hersteller von geführten Abläufen im Außendienst?"
    a: "Wenn die Logik hinter der Führung sauber definiert ist, erhalten Techniker die passenden Prüfungen und Fragen für die tatsächliche Situation, die Dokumentation entsteht während des Einsatzes, und der Innendienst erhält vollständigere, strukturierte Daten für Abrechnung, Gewährleistung und Qualitätsanalyse."
  - q: "Was ist vor dem Einsatz von Spracheingabe für Techniker zu beachten?"
    a: "Klären Sie Datenschutz, Speicherung und Zweck der Sprachdaten, beziehen Sie einen vorhandenen Betriebsrat ein, testen Sie die unterstützten Sprachen mit echten Technikern und legen Sie fest, welche Felder per Sprache gefüllt werden dürfen."
---

Salesforce hat drei Ansätze für die mobile App von Agentforce Field Service and Operations, ehemals Field Service, vorgestellt: geführte Abläufe, die sich an die Situation vor Ort anpassen, ein Headless-Setup, das Papierformulare in digitale Formulare verwandelt, und Voice to Form, das Formularfelder anhand gesprochener Angaben des Technikers ausfüllt. Voice to Form und die Guided Experience sind mit Lizenzen und Voraussetzungen dokumentiert. Das Headless-Setup existiert bisher nur als Demo von Salesforce. Bei Herstellern trifft das einen wunden Punkt: zu viel Papierkram für Techniker, unvollständige oder späte Daten für den Innendienst. Der Nutzen hängt vom Datenmodell, der Anbindung an das ERP und einigen Fragen ab, die speziell Unternehmen in Deutschland betreffen.

## Was genau hat Salesforce angekündigt?

Am 20. Oktober 2026 hat Salesforce die drei Funktionen gemeinsam in einem [Blogbeitrag zu geführter mobiler Arbeit](https://www.salesforce.com/blog/guided-mobile-work/) beschrieben. Voice to Form war seit Release 258 eine Betaversion, und die Guided Experience stand bereits vor dem Beitrag in den Mobile Patch Notes zu Version 264:

- **Guided Experience.** Die App gibt Technikern Schritt für Schritt vor, was als Nächstes zu tun ist. Ändern sich die Bedingungen, etwa weil ein Techniker etwas als dringend markiert, passt sich die Führung an: Relevante Schritte und Fragen erscheinen, irrelevante verschwinden. Bei jedem Schritt erscheinen Dokumentationsaufforderungen, sodass Daten während des Einsatzes erfasst werden und nicht danach. Die von mir gefundene Setup-Dokumentation verknüpft Formulare in einer Guided Experience mit Besuchen in Workforce Scheduling sowie mit Discovery Framework und App-Version 264 oder höher.
- **Headless-Setup.** Digitale Formulare lassen sich aus bestehenden Papierformularen oder vorhandenen Mobile Flows erzeugen, mit denselben Datenfeldern. Salesforce beschreibt es als so einfach wie das Aufnehmen eines Fotos. Ziel ist es, lange Projekte zur bloßen Digitalisierung eines Formulars zu vermeiden. Ich habe dazu noch keine Release Notes oder Setup-Dokumentation gefunden. Data-Capture-Formulare sind weiterhin als Flows dokumentiert, die im Flow Builder erstellt werden.
- **Voice to Form.** Techniker sprechen, und das System füllt die passenden Felder eines Data-Capture-Formulars. Laut [Setup-Anleitung](https://help.salesforce.com/s/articleView?id=service.mfs_voice_to_form_setup.htm&language=en_US&type=5) sollen Benutzer das Feld nennen, das sie füllen möchten. Die Funktion arbeitet damit eher wie ein strukturierter Befehl als wie eine freie Erzählung, und nicht jede Formularkomponente unterstützt sie. Die Diktierfunktion unterstützt Deutsch, Englisch, Französisch, Italienisch, Japanisch und Spanisch. Für jede Sprache außer Englisch wird ein übersetzter Data Capture Flow bereitgestellt. Data Cloud ist nicht erforderlich.

Salesforce stützt das mit eigener Forschung:

```kennzahlen
18 % | ihrer Zeit sehen mobile Beschäftigte in den USA als durch Verwaltung vergeudet, mehr als sieben Stunden pro Woche (Umfrage unter 350 Personen, 2025)
43 % | der befragten Organisationen nutzen im Außendienst noch Papierprotokolle (State of Field Service 2026)
16 % | sagen, dass Technik im Außen- und Innendienst auf einer Plattform zusammenarbeitet (State of Field Service 2026)
quelle: Salesforce-Forschung aus zwei Umfragen, zitiert im Blogbeitrag zu geführter mobiler Arbeit vom 20. Oktober 2026
```

```hinweis offen
Der Blogbeitrag zeigt Demos und nennt keine Lizenzen. Die Dokumentation nennt diese Angaben je nach Funktion: Voice to Form erfordert Enterprise, Unlimited oder Developer Edition, die Field Service Mobile User License, die Agentforce for Field Service SKU und das Einstein Field Service User Permission Set. Formulare in einer Guided Experience erfordern Workforce Scheduling und Discovery Framework. Fragen Sie für das Headless-Setup Ihr Account-Team, bevor Sie damit planen.
```

## Für Hersteller zählen vollständige Servicedaten

In der Fertigung entscheidet sich die Kundenbeziehung oft im Außendienst. Techniker installieren Maschinen, warten sie, beheben Störungen und prüfen Anlagen. Was sie vor Ort erfassen, speist mehrere Prozesse gleichzeitig:

- **Abrechnung**, auf Basis von Arbeitszeit, Anfahrt und Ersatzteilen.
- **Gewährleistung und Kulanz**, auf Basis der dokumentierten Fehlerursache.
- **Qualitäts- und Produktmanagement**, das strukturierte Fehlercodes und Messwerte braucht, um Muster über die installierte Basis zu erkennen.
- **Ersatzteile und Logistik**, die wissen müssen, was verbraucht wurde und nachbestellt werden muss.
- **Vertrieb**, der aus Serviceberichten erfährt, welche Maschinen sich dem Ende ihrer Lebensdauer nähern.

Treffen diese Informationen als Freitext, auf Papier oder Tage später ein, leidet jeder dieser Prozesse. Geführte Abläufe und Spracheingabe zielen genau auf diesen Punkt: bessere Daten, erfasst während des Einsatzes, mit weniger Aufwand für den Techniker. Diese Funktionen füllen Felder in Salesforce. Um die Daten ins ERP zu übertragen, braucht es weiterhin eine eigene Integration, ein Mapping und eine Fehlerbehandlung.

![Ein Servicebericht speist fünf Prozesse: Der Techniker vor Ort erfasst Arbeitszeit, Anfahrt, Ersatzteile, Fehlerursache, Fehlercodes und Messwerte. Daraus speisen sich Abrechnung, Gewährleistung und Kulanz, Qualitäts- und Produktmanagement, Ersatzteilmanagement und Logistik sowie der Vertrieb, der von Maschinen erfährt, die sich dem Ende ihrer Lebensdauer nähern. Kommen die Informationen als Freitext, auf Papier oder Tage später an, leidet jeder dieser Prozesse.](../../../assets/blog/field-service-report-de.png)

## Wo helfen geführte Abläufe am meisten?

Geführte Abläufe machen den größten Unterschied, wo Einsätze variieren und Fehler teuer sind:

- **Prüfungen und Sicherheitschecks**, bei denen die nötigen Prüfschritte vom Maschinentyp, vom Land oder vom Ergebnis eines vorherigen Schritts abhängen.
- **Komplexe Reparaturen**, bei denen sich der Umfang vor Ort ändert und zusätzliche Fragen dokumentiert werden müssen, etwa zur Sicherheit oder zur Freigabe von Zusatzarbeiten durch den Kunden.
- **Neue oder weniger erfahrene Techniker**, die von einer Führung profitieren, die erfahrene Kollegen im Kopf haben.

Voraussetzung ist, dass die Logik hinter der Führung sauber definiert ist. Jemand muss entscheiden, welche Schritte für welche Anlage gelten, welche Werte Pflicht sind und welche Ergebnisse Folgeaktionen auslösen. Das ist Prozess- und Datenarbeit, und sie gehört in die Serviceorganisation, nicht nur in die IT.

## Eine schnelle Digitalisierung übernimmt die Fehler des Papierformulars

Die Demo des Headless-Setups von Salesforce verspricht, aus einem Papierformular in sehr kurzer Zeit ein digitales zu machen. Das ist nützlich, denn viele Serviceorganisationen haben Dutzende Protokolle und Checklisten, die es nie ins System geschafft haben.

Eine schnelle digitale Kopie übernimmt aber jeden Fehler des Papierformulars. Typische Probleme, die ich zuerst prüfen würde:

- **Felder ohne klare Bedeutung**, etwa ein Freitextfeld „Bemerkungen“, in dem die Hälfte der relevanten Informationen steht.
- **Doppelte Daten**, wenn das Formular Informationen abfragt, die bereits an der Anlage oder am Auftrag hinterlegt sind.
- **Fehlende Struktur**, zum Beispiel Fehlerbeschreibungen als Freitext statt als Codes, die das Qualitätsmanagement auswerten kann.
- **Formulare, die sich je Region oder Team unterscheiden**, für denselben Einsatz.

Bevor Formulare in großem Stil digitalisiert werden, lohnt sich eine Entscheidung über ein Zieldatenmodell für Serviceprotokolle: Welche Werte werden als Felder erfasst, welche Auswahllisten werden gemeinsam verwendet und wie werden Ergebnisse mit dem Asset und dem Arbeitsauftrag verknüpft? Das ist klassische [Architekturarbeit](/leistungen/salesforce-architektur/), und sie entscheidet, ob die Daten später für Reporting, KI-Agenten oder die Anbindung an das ERP nutzbar sind. Wie Prüfprotokolle mit Data Capture aussehen, steht in [Field Service Data Capture: Prüfprotokolle ohne Papier](/blog/field-service-data-capture-pruefprotokolle/).

## Was muss vor dem Einsatz von Spracheingabe geklärt sein?

Spracheingabe ist attraktiv für Techniker, die mit Handschuhen, in der Höhe oder in lauter Umgebung arbeiten. Unternehmen in Deutschland sollten vor einem Pilotprojekt drei Fragen klären:

1. **Datenschutz.** Gesprochene Eingaben und Transkripte können personenbezogene Daten über Techniker und Kunden enthalten. Klären Sie, wo Audio, Transkript und Feldwerte verarbeitet und gespeichert werden, wie lange, durch welche Unterauftragsverarbeiter und zu welchem Zweck. Der Datenschutzbeauftragte sollte früh beteiligt sein.
2. **Betriebsrat.** Wo ein Betriebsrat existiert, hat er mitzubestimmen, wenn ein technisches System dazu geeignet ist, Verhalten oder Leistung zu überwachen (§ 87 Abs. 1 Nr. 6 BetrVG), etwa durch Zeitstempel, Korrekturen oder Vergleiche je Techniker. Ihn früh einzubinden, spart später Monate. Dies ist keine Rechtsberatung.
3. **Sprache und Umgebung.** Testen Sie die unterstützten Sprachen und Dialekte mit echten Technikern unter echten Bedingungen, auch bei Lärm. Fachbegriffe und Produktnamen sind dabei der schwierigste Teil.

Außerdem ist es sinnvoll festzulegen, welche Felder per Sprache gefüllt werden dürfen und welche Werte der Techniker bestätigen muss, etwa sicherheitsrelevante Messwerte.

## Eine Einsatzart mit hohem Volumen auswählen

Eine pragmatische Reihenfolge für einen Hersteller mit eigenem Außendienst:

```schritte
Verfügbarkeit bestätigen
  Lizenzen je Funktion klären und prüfen, ob Sie das klassische Service-Appointment-Modell oder Besuche in Workforce Scheduling verwenden.
Eine Einsatzart wählen
  Hohes Volumen und klares Protokoll, zum Beispiel die jährliche Wartung eines verbreiteten Maschinentyps.
Datenmodell aufräumen
  Für diese Einsatzart: Anlagendaten, Pflichtwerte, Fehlercodes, Bezug zu Ersatzteilen.
Geführten Ablauf bauen
  Gemeinsam mit der Serviceorganisation bauen und mit Technikern unterschiedlicher Erfahrung testen.
Spracheingabe separat pilotieren
  Erst nachdem Datenschutz und Betriebsrat zugestimmt haben.
Wirkung messen
  Zeit für Dokumentation, Vollständigkeit der Berichte, Zeit bis zur Abrechnung.
```

Ob die Techniker die neuen Funktionen dann auch nutzen, hängt davon ab, welchen Nutzen sie selbst davon haben. Darum geht es in [Field Service App: wie Techniker sie annehmen](/blog/field-service-app-akzeptanz-techniker/). Vollständige Field-Service-Daten braucht später auch jeder KI-Agent im Service, wie ich in [Agentforce: Business Value und Datenqualität zuerst](/blog/agentforce-business-value-datenqualitaet/) erkläre.
