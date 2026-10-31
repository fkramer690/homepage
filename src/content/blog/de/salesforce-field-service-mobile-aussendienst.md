---
title: "Salesforce Field Service Mobile: Führung und Sprache"
description: "Geführte Abläufe, Formulare aus Papiervorlagen und Spracheingabe: was die neuen Funktionen der Field Service App für Hersteller mit Außendienst bedeuten."
pubDate: 2026-10-23
lang: de
slug: salesforce-field-service-mobile-aussendienst
translationKey: field-service-mobile-guided-voice
topic: field-service
categories: [field-service]
tags: [Field Service, Außendienst, Mobile, Fertigung, Spracheingabe]
takeaways:
  - "Laut einer Salesforce-Studie verbringen Techniker rund 18 Prozent ihrer Zeit mit Verwaltung, und 43 Prozent der Firmen nutzen noch Papierprotokolle."
  - "Für Hersteller zählen vollständige Servicedaten: Prüfergebnisse, Messwerte und Ersatzteile kommen ohne Abtippen im Innendienst und im ERP an."
  - "Ein schnell digitalisiertes Papierformular hilft nur mit sauberem Datenmodell dahinter. Sonst wird ein schlechtes Formular einfach digital."
  - "Spracheingabe verarbeitet die Sprache von Mitarbeitenden und braucht deshalb früh den Datenschutz und, wo vorhanden, den Betriebsrat."
faq:
  - q: "Was ist neu in der Salesforce Field Service App?"
    a: "Salesforce hat eine geführte Erfahrung mit Schritt-für-Schritt-Anleitung angekündigt, die sich an den Einsatz anpasst, ein Headless-Setup, das digitale Formulare aus Papiervorlagen oder bestehenden Mobile Flows erzeugt, und Voice to Form, das Formularfelder aus gesprochener Eingabe füllt."
  - q: "Wann sind die neuen Field-Service-Funktionen verfügbar?"
    a: "Die Ankündigung vom 20. Oktober 2026 nennt weder Verfügbarkeit noch Editionen oder Lizenzen. Prüfen Sie die Release Notes und sprechen Sie mit Ihrem Account-Team, bevor Sie einen Rollout planen."
  - q: "Wie profitieren Hersteller von geführten Abläufen im Außendienst?"
    a: "Techniker bekommen die passenden Prüfungen und Fragen für die tatsächliche Situation, die Dokumentation entsteht während des Einsatzes, und der Innendienst erhält vollständige, strukturierte Daten für Abrechnung, Gewährleistung und Qualitätsanalyse."
  - q: "Was ist vor dem Einsatz von Spracheingabe für Techniker zu beachten?"
    a: "Klären Sie Datenschutz, Speicherung und Zweck der Sprachdaten, beziehen Sie einen vorhandenen Betriebsrat ein, testen Sie die unterstützten Sprachen mit echten Technikern und legen Sie fest, welche Felder per Sprache gefüllt werden dürfen."
---

Salesforce hat drei neue Funktionen für die Field Service App angekündigt: geführte Abläufe, die sich an die Situation vor Ort anpassen, ein Headless-Setup, das Papierformulare in digitale Formulare verwandelt, und Spracheingabe, die Formulare aus dem füllt, was der Techniker sagt. Für Hersteller mit eigenem Außendienst trifft das ein altes Problem. Techniker verbringen zu viel Zeit mit Papierkram, und der Innendienst bekommt unvollständige oder späte Daten. Die Funktionen klingen vielversprechend, ihr Nutzen hängt aber vom Datenmodell, der Anbindung an das ERP und einigen Fragen ab, die speziell Unternehmen in Deutschland betreffen.

## Was genau hat Salesforce angekündigt?

Am 20. Oktober 2026 hat Salesforce die neuen Funktionen in einem [Blogbeitrag zu geführter mobiler Arbeit](https://www.salesforce.com/blog/guided-mobile-work/) beschrieben:

- **Guided Experience.** Die App gibt Technikern Schritt für Schritt vor, was als Nächstes zu tun ist. Ändern sich die Bedingungen, etwa weil ein Techniker etwas als dringend markiert, passt sich die Führung an: Relevante Schritte und Fragen erscheinen, irrelevante verschwinden. Bei jedem Schritt kommen Dokumentationsaufforderungen, sodass Daten während des Einsatzes erfasst werden und nicht danach.
- **Headless-Setup.** Digitale Formulare lassen sich aus bestehenden Papierformularen oder vorhandenen Mobile Flows erzeugen, mit denselben Datenfeldern. Salesforce beschreibt es als so einfach wie ein Foto aufzunehmen. Ziel ist, lange Projekte nur für die Digitalisierung eines Formulars zu vermeiden.
- **Voice to Form.** Techniker beschreiben, was sie sehen oder tun, und das System interpretiert die Sprache und füllt die passenden Felder. Die Formulare passen sich dynamisch an das Gesagte an. Laut Salesforce werden mehrere Sprachen unterstützt.

Salesforce stützt das mit eigener Forschung:

```kennzahlen
18 % | der Arbeitszeit im Außendienst fließen laut Schätzung der Befragten in Verwaltung, mehr als sieben Stunden pro Woche
43 % | der befragten Organisationen nutzen im Außendienst noch Papierprotokolle
16 % | sagen, dass Technik im Außen- und Innendienst auf einer Plattform zusammenarbeitet
quelle: Salesforce-Forschung, zitiert im Blogbeitrag zu geführter mobiler Arbeit vom 20. Oktober 2026
```

```hinweis offen
Die Ankündigung zeigt Demos, nennt aber weder Verfügbarkeit noch Editionen oder Lizenzen. Bevor Sie einen Rollout planen, prüfen Sie die Release Notes und sprechen Sie mit Ihrem Account-Team.
```

## Für Hersteller zählen vollständige Servicedaten

In der Fertigung entscheidet sich die Kundenbeziehung oft im Außendienst. Techniker installieren Maschinen, warten sie, beheben Störungen und prüfen Anlagen. Was sie vor Ort erfassen, speist mehrere Prozesse gleichzeitig:

- **Abrechnung**, auf Basis von Arbeitszeit, Anfahrt und Ersatzteilen.
- **Gewährleistung und Kulanz**, auf Basis der dokumentierten Fehlerursache.
- **Qualitäts- und Produktmanagement**, das strukturierte Fehlercodes und Messwerte braucht, um Muster über die installierte Basis zu erkennen.
- **Ersatzteile und Logistik**, die wissen müssen, was verbraucht wurde und nachbestellt werden muss.
- **Vertrieb**, der aus Serviceberichten erfährt, wo eine Maschine das Ende ihrer Lebensdauer erreicht.

Kommen diese Informationen als Freitext, auf Papier oder Tage später an, leidet jeder dieser Prozesse. Geführte Abläufe und Spracheingabe zielen genau auf diesen Punkt: bessere Daten, erfasst während des Einsatzes, mit weniger Aufwand für den Techniker.

![Ein Servicebericht speist fünf Prozesse: Der Techniker vor Ort erfasst Arbeitszeit, Anfahrt, Ersatzteile, Fehlerursache, Fehlercodes und Messwerte. Daraus speisen sich Abrechnung, Gewährleistung und Kulanz, Qualitäts- und Produktmanagement, Ersatzteile und Logistik sowie der Vertrieb, der von Maschinen am Ende ihrer Lebensdauer erfährt. Als Freitext, auf Papier oder Tage später leidet jeder dieser Prozesse.](../../../assets/blog/field-service-report-de.png)

## Wo helfen geführte Abläufe am meisten?

Geführte Abläufe machen den größten Unterschied, wo Einsätze variieren und Fehler teuer sind:

- **Prüfungen und Sicherheitschecks**, bei denen die nötigen Prüfschritte vom Maschinentyp, vom Land oder vom Ergebnis eines vorherigen Schritts abhängen.
- **Komplexe Reparaturen**, bei denen sich der Umfang vor Ort ändert und zusätzliche Fragen dokumentiert werden müssen, etwa zur Sicherheit oder zur Freigabe von Zusatzarbeiten durch den Kunden.
- **Neue oder weniger erfahrene Techniker**, die von einer Führung profitieren, die erfahrene Kollegen im Kopf haben.

Voraussetzung ist, dass die Logik hinter der Führung sauber definiert ist. Jemand muss entscheiden, welche Schritte für welche Anlage gelten, welche Werte Pflicht sind und welche Ergebnisse Folgeaktionen auslösen. Das ist Prozess- und Datenarbeit, und sie gehört in die Serviceorganisation, nicht nur in die IT.

## Eine schnelle Digitalisierung übernimmt die Fehler des Papierformulars

Das Headless-Setup verspricht, aus einem Papierformular in sehr kurzer Zeit ein digitales zu machen. Das ist nützlich, denn viele Serviceorganisationen haben Dutzende Protokolle und Checklisten, die es nie ins System geschafft haben.

Eine schnelle digitale Kopie übernimmt aber jeden Fehler des Papierformulars. Typische Probleme, die ich zuerst prüfen würde:

- **Felder ohne klare Bedeutung**, etwa ein Freitextfeld „Bemerkungen“, in dem die Hälfte der relevanten Informationen steht.
- **Doppelte Daten**, wenn das Formular Informationen abfragt, die bereits an der Anlage oder am Auftrag hinterlegt sind.
- **Fehlende Struktur**, zum Beispiel Fehlerbeschreibungen als Freitext statt als Codes, die das Qualitätsmanagement auswerten kann.
- **Formulare, die sich je Region oder Team unterscheiden**, für denselben Einsatz.

Bevor Formulare in großem Stil digitalisiert werden, lohnt sich eine Entscheidung über ein Zieldatenmodell für Serviceprotokolle: Welche Werte werden als Felder erfasst, welche Auswahllisten werden geteilt, wie hängen Ergebnisse an Anlage und Auftrag? Das ist klassische [Architekturarbeit](../../leistungen/salesforce-architektur/), und sie entscheidet, ob die Daten später für Reporting, KI-Agenten oder die Anbindung an das ERP nutzbar sind. Wie Prüfprotokolle mit Data Capture aussehen, steht in [Field Service Data Capture: Prüfprotokolle ohne Papier](../field-service-data-capture-pruefprotokolle/).

## Was muss vor dem Einsatz von Spracheingabe geklärt sein?

Spracheingabe ist attraktiv für Techniker, die mit Handschuhen, in der Höhe oder in lauter Umgebung arbeiten. Für Unternehmen in Deutschland brauchen drei Fragen vor einem Pilot eine Antwort:

1. **Datenschutz.** Sprache ist ein personenbezogenes Datum. Klären Sie, wo sie verarbeitet und gespeichert wird, wie lange und zu welchem Zweck. Der Datenschutzbeauftragte sollte früh beteiligt sein.
2. **Betriebsrat.** Wo ein Betriebsrat existiert, wird er in der Regel mitbestimmen, wenn ein System Sprache von Mitarbeitenden verarbeitet und zur Leistungskontrolle genutzt werden könnte. Ihn früh einzubinden, spart später Monate.
3. **Sprache und Umgebung.** Testen Sie die unterstützten Sprachen und Dialekte mit echten Technikern unter echten Bedingungen, auch bei Lärm. Fachbegriffe und Produktnamen sind dabei der schwierigste Teil.

Außerdem ist es sinnvoll festzulegen, welche Felder per Sprache gefüllt werden dürfen und welche Werte der Techniker bestätigen muss, etwa sicherheitsrelevante Messwerte.

## Erster Schritt: eine Einsatzart mit hohem Volumen auswählen

Eine pragmatische Reihenfolge für einen Hersteller mit eigenem Außendienst:

```schritte
Verfügbarkeit bestätigen
  Verfügbarkeit und Lizenzen für Ihre Org und Editionen klären.
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

Ob die Techniker die neuen Funktionen dann auch nutzen, entscheidet sich daran, was sie selbst davon haben. Darum geht es in [Field Service App: wie Techniker sie annehmen](../field-service-app-akzeptanz-techniker/). Vollständige Außendienstdaten braucht später auch jeder KI-Agent im Service, wie ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) erkläre.
