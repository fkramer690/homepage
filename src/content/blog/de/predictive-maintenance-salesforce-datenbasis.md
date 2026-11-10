---
title: "Predictive Maintenance in Salesforce: die Datenbasis"
description: "Wann reicht die Servicehistorie eines Maschinenbauers für Ausfallprognosen in Salesforce, was kosten Maschinendaten in Data 360, und wann genügen Wartungspläne?"
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: predictive-maintenance-salesforce-datenbasis
translationKey: predictive-maintenance-data-readiness
topic: field-service
categories: [field-service, ai]
tags: [Predictive Maintenance, Field Service, Data 360, Asset Service Prediction, Maschinenbau, Flex Credits]
takeaways:
  - "Asset Service Prediction schätzt aus früheren Reparaturen, wie wahrscheinlich Folgeaufträge sind, und braucht dafür mindestens 400 mit der Anlage verknüpfte."
  - "Die Salesforce-Hilfe beschreibt die Installation von Asset Service Prediction, die Produktseite nennt keinen Preis. Lassen Sie sich die SKU schriftlich geben."
  - "Streaming in Data 360 kostet 3.500 Flex Credits pro Million Zeilen. Intervall und Zeilenaufbau bestimmen die Rechnung: eine Zeile pro Signal oder pro Maschine."
  - "Bei wenigen hundert Maschinen pro Baureihe und Fehlercodes im Freitext sind Wartungspläne mit Nutzungs- und Zustandsauslösern die bessere Wahl."
  - "Rohe Zeitreihen gehören in IoT-Plattform oder Historian; Salesforce braucht Zähler, Aggregate und Schwellwertereignisse, aus denen eine Regel Work Orders macht."
faq:
  - q: "Unterstützt Salesforce Field Service vorausschauende Wartung?"
    a: "Salesforce bietet Asset Service Prediction, das mit KI und Data 360 aus früheren Reparaturen die Wahrscheinlichkeit künftiger Work Orders für eine Anlage schätzt. Installation und Einrichtung beschreibt die Salesforce-Hilfe. Die Produktseite nennt keinen Preis. Klären Sie daher, in welchem Add-on Asset Service Prediction für Ihre Edition enthalten ist."
  - q: "Was kostet das Streaming von Maschinendaten in Data 360?"
    a: "Laut Flex Credits Rate Card vom 3. November 2026 kostet die Streaming Pipeline in der Basisstaffel 3.500 Credits pro Million Zeilen, die Real-Time Pipeline 250.000 Credits pro Million Ereignisse. Bei 500 € je 100.000 Credits kostet eine Million gestreamter Zeilen 17,50 € vor Mengenstaffeln."
  - q: "Wie viel Servicehistorie brauche ich für eine Ausfallprognose?"
    a: "Laut Salesforce-Hilfe braucht Einstein Studio mindestens 400 historische Anlagenreparaturen, um ein Modell zu erzeugen. Meine zusätzliche Faustregel: Pro Baureihe und Ausfallart sollten einige Dutzend dokumentierte Ausfälle mit codierter Ursache vorliegen, auf Work Orders, die über die Seriennummer mit der Anlage verknüpft sind."
  - q: "Was ist die Alternative zu Predictive Maintenance in Salesforce?"
    a: "Wartungspläne und Maintenance Work Rules erzeugen Work Orders im Intervall, und Salesforce beschreibt vorbeugende Pläne nach Nutzung, Zustand und Kriterien wie einem Temperaturschwellwert. Für August 2025 hat Salesforce einen Agenten angekündigt, der diese Termine mit dem Kunden bucht."
draft: false
---

Ein Maschinenbauer hat genug Daten für Predictive Maintenance in Salesforce, wenn mindestens 400 historische Anlagenreparaturen vorliegen, das Minimum, das Salesforce für Asset Service Prediction nennt. Nach meiner Erfahrung müssen die Reparaturen außerdem zu vergleichbaren Maschinen pro Baureihe gehören, über die Seriennummer verknüpft sein und codierte Ausfallursachen enthalten. Das Modell lernt aus dieser Servicehistorie, Sensordaten kommen erst danach. Ist die Historie dünn, sind [Wartungspläne mit nutzungs- und zustandsabhängigen Auslösern](../field-service-wartung-nach-betriebsstunden/) die bessere Wahl. Maschinendaten sind als Aggregate bezahlbar: Im Beispiel unten kosten Rohwerte im Sekundentakt von 300 Maschinen, eine Zeile pro Signal, rund 65.900 € im Monat an Flex Credits, 15-Minuten-Aggregate rund 180 €.

## Was bietet Salesforce heute für vorausschauende Wartung?

Salesforce verkauft unter dem Stichwort proaktiver Service mehrere Funktionen, und nur zwei davon sagen etwas voraus. Die folgende Übersicht basiert auf der [Ankündigung zum Asset Management vom Juni 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/), der [Ankündigung von Agentforce for Manufacturing](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) vom August 2025 und der aktuellen [Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/):

| Funktion | Was sie tut | Status und Preis |
|---|---|---|
| Maintenance Plans und Work Rules | Erzeugen Work Orders pro Anlage im Intervall | Im Field-Service-Kern enthalten |
| Nutzungs- und Zustandskriterien | Vorbeugende Pläne nach „asset use, condition, and specific criteria“, etwa einem Temperaturschwellwert | Auf der [Produktseite](https://www.salesforce.com/service/field-service-management/), ohne eigenen Preis |
| Agent für proaktive Wartung | Kontaktiert Kunden und bucht Termine aus den Fälligkeiten der Wartungspläne | Für August 2025 als GA angekündigt, 20 Flex Credits pro Aktion |
| Agentenvorlage Asset Service | Erkennt „asset issues that require maintenance“, entwirft Reparaturangebote und Serviceaufträge | Verfügbar seit August 2025 |
| Asset Health Score | Bewertet Anlagen nach Alter, Nutzung, Telemetrie und Reparaturhistorie über Data 360 | Teil von Connected Assets, 15.000 $ pro Org und Monat (US-Listenpreis) |
| Asset Service Prediction | Schätzt aus früheren Reparaturen die Wahrscheinlichkeit künftiger Work Orders | Installation in der Hilfe beschrieben, kein Preis auf der Produktseite |

Die Manufacturing-Ankündigung vermeidet den Begriff Predictive Maintenance und spricht von Agenten, die Kunden und Serviceteams auf Probleme hinweisen, bevor sie auftreten. Die [Seite zum Asset Management](https://www.salesforce.com/service/field-service-management/asset-management/) führt Connected Assets mit 10.000 vernetzten digitalen Anlagen, dem Asset Health Score und einem „Actionable Telematics Framework“. Einen Überblick über die Agentenfunktionen gibt [KI-Agenten im Außendienst: was Field Service heute kann](../ki-agenten-aussendienst-field-service/). Hier geht es um eine engere Frage: Sind Ihre Daten für die letzten beiden Funktionen geeignet? Beide setzen voraus, dass die Maschinen als Asset-Datensätze geführt werden, siehe [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).

## Wann reicht die Servicehistorie für eine Ausfallprognose?

Salesforce beschreibt Asset Service Prediction als Modell, das häufige Probleme „based on current asset data and service history of similar assets“ erkennt. Das eigene Beispiel: Nach einem Lüfterausfall an einem bestimmten Generatormodell folgt oft ein Service am Kraftstoffsystem, also erledigt der Techniker beides in einem Einsatz. Das funktioniert nur, weil die alten Work Orders sagen, welches Bauteil ausgefallen ist. Die [Anleitung zu den Prognosen](https://help.salesforce.com/s/articleView?id=service.fs_asp_review_einstein_predictions.htm&language=en_US&type=5) ist genauer: Das Modell liefert einen Wert im Feld Predicted Is Subsequent Likely, und Einstein Studio braucht mindestens 400 historische Anlagenreparaturen, um ein Modell zu erzeugen. Die [Installation](https://help.salesforce.com/s/articleView?id=service.fs_asp_install.htm&language=en_US&type=5) legt Batch Data Transforms an, die Data-360-Credits verbrauchen. Ich prüfe sechs Punkte, bevor wir über Lizenzen sprechen:

- **Ähnliche Anlagen gibt es auch in den Daten.** Ähnlichkeit ist eine Modellierungsentscheidung. Ist jede Sondermaschine ein eigener Produktdatensatz ohne Baureihe, Variante und Umbaustand, hat das Modell keine vergleichbaren Einheiten.
- **Störungs-Work-Orders hängen an der Anlage.** Jede Reparatur trägt die Seriennummer. Alte Work Orders mit Account und Freitextfeld nützen wenig, bis jemand sie einer Anlage zuordnet. Die Grundlage dafür steht in [Stammdaten für Field Service](../salesforce-field-service-stammdaten/).
- **Ausfallursachen sind codiert.** Bauteil und Ursache sind Auswahllisten. Ein Einsatzbericht in Prosa hilft dem Kunden; für das Modell muss er erst aufbereitet werden.
- **Es gibt eine Nutzungsachse.** Betriebsstunden oder Zyklen zum Zeitpunkt des Ausfalls. Ohne sie sieht das Modell nur das Kalenderalter, und eine Maschine im Dreischichtbetrieb verschleißt schneller als eine im Einschichtbetrieb.
- **Reparaturen durch Dritte werden gemeldet.** Reparieren Händler oder [Servicepartner](../salesforce-field-service-servicepartner/) in ihren Ländern und melden nur Garantiefälle, hat die Historie Lücken genau dort, wo die Flotte am größten ist.
- **Genug Reparaturen.** Salesforce nennt 400 historische Anlagenreparaturen als Minimum für ein Modell. Meine zusätzliche Faustregel: Es sollten einige Dutzend dokumentierte, codierte Ausfälle pro Baureihe und Ausfallart vorliegen, bevor eine Prognose die Disposition steuert.

Ein Bericht über Störungs-Work-Orders pro Baureihe und Fehlercode zeigt an einem Nachmittag, ob eine Prognose realistisch ist.

## Streaming in Data 360 kostet 3.500 Flex Credits pro Million Zeilen

Die [Flex Credits Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) bepreist zwei Positionen für Maschinendaten:

- **Streaming Pipeline:** 3.500 Credits pro Million Zeilen in der Basisstaffel, bei höheren Monatsmengen 2.800, 1.400 und 700. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=data.c360_a_data_usage_types.htm&language=en_US&type=5) zählt die Streaming-Variante der Ingestion API hierzu.
- **Real-Time Pipeline:** 250.000 Credits pro Million Ereignisse, pro Einheit rund 71 Mal der Streaming-Satz. Gezählt werden Ereignisse nur, wenn sie zu einem Real-Time Data Graph gehören.

Die Staffeln gelten je Nutzungsart und beginnen am Monatsersten neu. Flex Credits kosten [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/). Die [Streaming Ingestion API](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-streaming-ingestion.htm) verarbeitet Daten „approximately every 3 minutes“. Für die Wartung, bei der eine Work Order Stunden oder Tage vor dem Einsatz entsteht, ist das schnell genug, und ich sehe keinen Grund, den Real-Time-Satz zu bezahlen. Die [Bulk-Variante](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-salesforce-cdp-ingestion.htm) passt für tägliche oder wöchentliche Ladungen. Die Hilfe führt sie als Batch Data Pipeline, eine Bezeichnung, die die Rate Card vom November nicht aufführt.

Rechnen wir mit 300 vernetzten Maschinen und je 12 Signalen:

```kennzahlen
65.900 € | im Monat für Rohwerte im Sekundentakt, eine Zeile pro Signal: 9,3 Milliarden Zeilen, selbst mit Mengenstaffeln rund 13,2 Mio. Credits
181 € | im Monat für 15-Minuten-Aggregate mit Minimum, Maximum und Mittelwert, eine Zeile pro Signal: 10,4 Mio. Zeilen, 36.288 Credits
quelle: Flex Credits Rate Card vom 3. November 2026 und Agentforce-Preisseite (500 € je 100.000 Credits), Mengen als Annahme
```

Beide Zahlen setzen eine Zeile pro Signal voraus. Trägt eine Zeile alle zwölf Signale einer Maschine, sinkt die Zeilenzahl auf ein Zwölftel: unter 10.000 € im Monat für Sekundenwerte und rund 15 € für 15-Minuten-Aggregate. Der Zeilenaufbau ist eine ebenso große Kostenentscheidung wie das Intervall.

Für Zeitreihen, die schon in einem Data Lake liegen, wirbt Salesforce mit Zero-Copy-Zugriff. Die Hilfe rechnet Federation nach Datensätzen ab, die aus der Quelle gelesen werden, und ich habe keine passende Position in der Rate Card gefunden.

```hinweis offen
Für die Bulk-Variante (Batch Data Pipeline) und für Federation zeigt die Rate Card keine eigene Position. Fragen Sie Ihren Account Executive, welche Position jeweils gilt, und lassen Sie sich beide Sätze schriftlich geben.
```

Das Grounding von Agenten auf Betriebsanleitungen ist ein eigener Kostenblock, beschrieben in [Data 360 Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

Rohe Zeitreihen gehören in die IoT-Plattform oder den Historian, den der Maschinenbauer ohnehin betreibt. Salesforce braucht Zähler, Aggregate und Schwellwertereignisse. Die Übernahme allein erzeugt nichts: Ein Flow oder eine Wartungsregel an der Anlage macht daraus eine Work Order.

## Wann sind Wartungspläne die bessere Wahl?

Ein großer Teil des Nutzens, der unter „predictive“ versprochen wird, kommt aus zwei einfacheren Dingen: Geplante Wartungstermine werden eingehalten, und die Intervalle richten sich nach der Nutzung statt nach dem Kalender. Beides deckt Field Service ohne Prognosemodell ab.

Wartungspläne erzeugen die Work Orders, und Maintenance Work Rules an der Anlage steuern abweichende Intervalle, wie in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/) beschrieben. Die Produktseite ergänzt Pläne nach Nutzung und Zustand, die einen Einsatz auslösen, sobald „an asset's temperature exceeds a set threshold“. Das Datenmodell hat dafür das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm), das Anlagenattribute speichert, „to track and analyze asset conditions“. Ein Betriebsstundenzähler, den SAP, proALPHA oder die IoT-Plattform einmal am Tag schreibt, reicht für nutzungsabhängige Intervalle oft aus, solange ein Tag Verzögerung vertretbar ist.

Den Termin bucht dann der Agent für proaktive Wartung. Bei angenommenen fünf Aktionen pro Buchung sind das 100 Credits oder 0,50 € für die Aktionen. Prompts kommen dazu; messen Sie sie in der Digital Wallet.

Für mich ist das die richtige Antwort, wenn Baureihen klein sind, Maschinen kundenspezifisch gebaut werden, Fehlercodes bis vor kurzem Freitext waren oder Händler keine Reparaturen melden. Ein Pilot zur Ausfallprognose lohnt sich, wenn eine Baureihe viele hundert Maschinen hat, die codierte Historie mehrere Jahre abdeckt und ungeplanter Stillstand bei einer Verfügbarkeitszusage im Servicevertrag echtes Geld kostet.

## Rechenbeispiel: 1.400 Maschinen in fünf Baureihen

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und Field Service im Betrieb. Alle Zahlen sind Annahmen, um die Methode zu zeigen.

1.400 Maschinen stehen bei Kunden, verteilt auf fünf Baureihen, die größte mit 350 Einheiten. 300 Maschinen sind über das eigene IoT-Gateway angebunden. Work Orders hängen seit einer Datenmigration 2022 an den Anlagen, Fehlercodes sind seit 2024 Auswahllisten. Händler in drei Ländern betreuen ihre Kunden selbst und melden nur Garantiefälle.

**Die Prüfung.** Für die größte Baureihe gibt es 14 Spindeltausche in vier Jahren, fünf davon mit codierter Ursache, keinen aus den Händlerländern. Das liegt weit unter den 400 Reparaturen, die Salesforce für ein Modell braucht, und ist zu dünn für eine Prognose, der die Disposition vertrauen würde.

**Die Entscheidung.**

1. **Nutzungsabhängige Intervalle.** Die IoT-Plattform schreibt einmal am Tag die Betriebsstunden auf den Anlagendatensatz. Die Maintenance Work Rules wechseln von halbjährlich auf alle 2.000 Betriebsstunden. Dafür braucht es keine Data-360-Credits.
2. **Drei Zustandssignale.** Spindeltemperatur, Vibration und Kühlmitteldruck gehen als 15-Minuten-Aggregate in Data 360, eine Zeile pro Signal: 2,6 Mio. Zeilen, 9.072 Credits, rund 45 € im Monat. Ein Flow schreibt die Werte auf den Anlagendatensatz zurück und legt eine Work Order an, wenn ein Schwellwert überschritten ist.
3. **Buchung durch den Agenten.** 250 Termine im Monat mit je fünf Aktionen: 25.000 Credits, rund 125 €.
4. **Erst die Historie.** Codierte Fehlerursachen werden für Händler Pflicht, als Teil des Garantieprozesses. 2028 zählt der Maschinenbauer die Fälle erneut.

Datenübernahme und Agentenaktionen ergeben rund 34.000 Credits, etwa 170 € im Monat; Datenaufbereitung, Abfragen und Prompts kommen dazu. Connected Assets für 15.000 $ pro Org und Monat (US-Listenpreis) rechnet sich erst, wenn der Health Score Entscheidungen stützt, die sich mit Schwellwerten nicht zuverlässig treffen lassen.

## Störungs-Work-Orders pro Baureihe zählen

1. **Zählen** Sie Störungs-Work-Orders pro Baureihe und codierter Ursache für die letzten drei Jahre.
2. **Schließen Sie die Lücken**: Verknüpfung mit der Anlage, Auswahllisten für Ursachen, Meldepflichten für Händler und Servicepartner.
3. **Legen Sie fest, wo Rohdaten liegen**, und welche Aggregate, Zähler und Ereignisse zu Salesforce gehen.
4. **Schätzen Sie Credits pro Signal**, bevor die erste Maschine angebunden wird, etwa mit [Flex Credits und Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).
5. **Fragen Sie Salesforce schriftlich**, welches Add-on Asset Service Prediction für Ihre Edition enthält und wie viele Data-360-Credits die Funktion verbraucht.

Wie Maschinendaten, ERP und Salesforce zusammenpassen, ist Teil meiner Arbeit an der [Schnittstellenarchitektur](../../leistungen/salesforce-schnittstellen/). Die Anbindung der Sensoren plane ich erst, wenn die Schritte 1 und 2 erledigt sind.
