---
title: "Predictive Maintenance in Salesforce: die Datenbasis"
description: "Wann reicht die Servicehistorie eines Maschinenbauers für Ausfallprognosen in Salesforce, was kosten Maschinendaten in Data 360, und wann genügen Wartungspläne?"
pubDate: 2026-10-27
lang: de
slug: predictive-maintenance-salesforce-datenbasis
translationKey: predictive-maintenance-data-readiness
topic: field-service
categories: [field-service, ai]
tags: [Predictive Maintenance, Field Service, Data 360, Asset Service Prediction, Maschinenbau, Flex Credits]
takeaways:
  - "Asset Service Prediction lernt aus der Servicehistorie ähnlicher Anlagen. Verknüpfte Work Orders und codierte Ursachen zählen mehr als Sensoren."
  - "Asset Service Prediction war im Juni 2024 Open Beta, die Produktseite nennt heute keinen Status. Lassen Sie sich die Verfügbarkeit schriftlich geben."
  - "Streaming in Data 360 kostet 3.500 Flex Credits pro Million Zeilen. 15-Minuten-Aggregate sind damit einige hundert Mal billiger als Sekundenwerte."
  - "Bei wenigen hundert Maschinen pro Baureihe und Fehlercodes im Freitext sind Wartungspläne mit Nutzungs- und Zustandsauslösern die bessere Wahl."
  - "Rohe Zeitreihen gehören in die IoT-Plattform oder den Historian; Salesforce braucht Zähler, Aggregate und Schwellwertereignisse, die eine Work Order auslösen."
faq:
  - q: "Unterstützt Salesforce Field Service vorausschauende Wartung?"
    a: "Salesforce führt Asset Service Prediction, das aus aktuellen Anlagendaten und der Servicehistorie ähnlicher Anlagen vorhersagt, wann und warum eine Anlage ausfällt, auf Basis von Data 360. Angekündigt wurde es im Juni 2024 als Open Beta. Die Produktseite nennt keinen Status, klären Sie Verfügbarkeit und Preis für Ihre Edition."
  - q: "Was kostet das Streaming von Maschinendaten in Data 360?"
    a: "Laut Flex Credits Rate Card vom 31. August 2026 kostet die Streaming Pipeline in der Basisstaffel 3.500 Credits pro Million Zeilen, die Real-Time Pipeline 250.000 Credits pro Million Ereignisse. Bei 500 € je 100.000 Credits kostet eine Million gestreamter Zeilen 17,50 € vor Mengenstaffeln."
  - q: "Wie viel Servicehistorie brauche ich für eine Ausfallprognose?"
    a: "Salesforce nennt kein Minimum. Meine Faustregel: pro Baureihe und Ausfallart einige Dutzend dokumentierte Ausfälle mit codierter Ursache, auf Work Orders, die über die Seriennummer mit der Anlage verknüpft sind."
  - q: "Was ist die Alternative zu Predictive Maintenance in Salesforce?"
    a: "Wartungspläne und Maintenance Work Rules erzeugen Work Orders im Intervall, und Salesforce beschreibt vorbeugende Pläne nach Nutzung, Zustand und Kriterien wie einem Temperaturschwellwert. Für August 2025 hat Salesforce einen Agenten angekündigt, der diese Termine mit dem Kunden bucht."
draft: false
---

Ein Maschinenbauer hat genug Daten für Predictive Maintenance in Salesforce, wenn eine Baureihe Hunderte vergleichbarer Maschinen umfasst, jede Störungs-Work-Order an einer Seriennummer hängt und Ausfallursachen in codierten Feldern stehen. Asset Service Prediction lernt aus genau dieser Servicehistorie, Sensordaten kommen erst danach. Ist die Historie dünn, sind [Wartungspläne mit nutzungs- und zustandsabhängigen Auslösern](../field-service-wartung-nach-betriebsstunden/) die bessere Wahl. Maschinendaten sind als Aggregate bezahlbar: Im Beispiel unten kosten Rohwerte im Sekundentakt von 300 Maschinen rund 65.900 € im Monat an Flex Credits, 15-Minuten-Aggregate rund 180 €.

## Was bietet Salesforce heute für vorausschauende Wartung?

Salesforce verkauft unter dem Stichwort proaktiver Service mehrere Funktionen, und nur zwei davon sagen etwas voraus. Stand laut [Ankündigung zum Asset Management vom Juni 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/), der [Ankündigung von Agentforce for Manufacturing](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) vom August 2025 und der aktuellen [Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/):

| Funktion | Was sie tut | Status und Preis |
|---|---|---|
| Maintenance Plans und Work Rules | Erzeugen Work Orders pro Anlage im Intervall | Standard in Field Service |
| Nutzungs- und Zustandskriterien | Vorbeugende Pläne nach „asset use, condition, and specific criteria“, etwa einem Temperaturschwellwert | Auf der [Produktseite](https://www.salesforce.com/service/field-service-management/), ohne eigenen Preis |
| Agent für proaktive Wartung | Kontaktiert Kunden und bucht Termine aus den Fälligkeiten der Wartungspläne | Für August 2025 als GA angekündigt, 20 Flex Credits pro Aktion |
| Agentenvorlage Asset Service | Erkennt „asset issues that require maintenance“, entwirft Reparaturangebote und Serviceaufträge | Verfügbar seit August 2025 |
| Asset Health Score | Bewertet Anlagen nach Alter, Nutzung, Telemetrie und Reparaturhistorie über Data 360 | Teil von Connected Assets, 15.000 $ pro Org und Monat (US-Listenpreis) |
| Asset Service Prediction | Sagt Zeitpunkt und Grund eines Ausfalls voraus | Open Beta im Juni 2024 angekündigt, Produktseite ohne Status |

Die Manufacturing-Ankündigung vermeidet den Begriff Predictive Maintenance und spricht von Agenten, die Kunden und Serviceteams vor Problemen warnen, „before they happen“. Die [Seite zum Asset Management](https://www.salesforce.com/service/field-service-management/asset-management/) führt Connected Assets mit 10.000 vernetzten digitalen Anlagen, dem Asset Health Score und einem „Actionable Telematics Framework“. Den Überblick über die Agentenfunktionen gibt [KI-Agenten im Außendienst: was Field Service heute kann](../ki-agenten-aussendienst-field-service/). Hier geht es um eine engere Frage: Tragen Ihre Daten die letzten beiden Zeilen? Beide Zeilen setzen auf den Maschinen als Assets auf, siehe [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).

## Wann reicht die Servicehistorie für eine Ausfallprognose?

Salesforce beschreibt Asset Service Prediction als Modell, das häufige Probleme „based on current asset data and service history of similar assets“ erkennt. Das eigene Beispiel: Nach einem Lüfterausfall an einem bestimmten Generatormodell folgt oft ein Service am Kraftstoffsystem, also erledigt der Techniker beides in einem Einsatz. Das funktioniert nur, weil die alten Work Orders sagen, welches Bauteil ausgefallen ist. Ich prüfe sechs Punkte, bevor wir über Lizenzen sprechen:

- **Ähnliche Anlagen gibt es auch in den Daten.** Ähnlichkeit ist eine Modellierungsentscheidung. Ist jede Sondermaschine ein eigener Produktdatensatz ohne Baureihe, Variante und Umbaustand, hat das Modell keine vergleichbaren Einheiten.
- **Störungs-Work-Orders hängen an der Anlage.** Jede Reparatur trägt die Seriennummer. Alte Work Orders mit Account und Freitextfeld zählen nicht. Die Grundlage dafür steht in [Stammdaten für Field Service](../salesforce-field-service-stammdaten/).
- **Ausfallursachen sind codiert.** Bauteil und Ursache sind Auswahllisten. Ein gut geschriebener Einsatzbericht in Prosa hilft dem Kunden, nicht dem Modell.
- **Es gibt eine Nutzungsachse.** Betriebsstunden oder Zyklen zum Zeitpunkt des Ausfalls. Ohne sie sieht das Modell nur das Kalenderalter, und eine Maschine im Dreischichtbetrieb verschleißt schneller als eine im Einschichtbetrieb.
- **Reparaturen durch Dritte werden gemeldet.** Reparieren Händler oder [Servicepartner](../salesforce-field-service-servicepartner/) in ihren Ländern und melden nur Garantiefälle, hat die Historie Lücken genau dort, wo die Flotte am größten ist.
- **Genug Ausfälle pro Art.** Meine Faustregel: einige Dutzend dokumentierte, codierte Ausfälle pro Baureihe und Ausfallart, bevor eine Prognose die Disposition steuert.

Ein Bericht über Störungs-Work-Orders pro Baureihe und Fehlercode zeigt an einem Nachmittag, ob eine Prognose realistisch ist.

## Streaming in Data 360 kostet 3.500 Flex Credits pro Million Zeilen

Die [Flex Credits Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) bepreist zwei Positionen für Maschinendaten:

- **Streaming Pipeline:** 3.500 Credits pro Million Zeilen in der Basisstaffel, bei höheren Monatsmengen 2.800, 1.400 und 700. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=data.c360_a_data_usage_types.htm&language=en_US&type=5) zählt die Streaming-Variante der Ingestion API hierzu.
- **Real-Time Pipeline:** 250.000 Credits pro Million Ereignisse, pro Einheit rund 71 Mal der Streaming-Satz. Gezählt werden Ereignisse nur, wenn sie zu einem Real-Time Data Graph gehören.

Die Staffeln gelten je Nutzungsart und beginnen am Monatsersten neu. Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/). Die [Streaming Ingestion API](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-streaming-ingestion.htm) verarbeitet Daten „approximately every 3 minutes“. Für die Wartung, bei der eine Work Order Stunden oder Tage vor dem Einsatz entsteht, ist das schnell genug, und ich sehe keinen Grund, den Real-Time-Satz zu bezahlen. Die [Bulk-Variante](https://developer.salesforce.com/docs/data/data-cloud-ref/guide/c360a-api-salesforce-cdp-ingestion.htm) passt für tägliche oder wöchentliche Ladungen. Die Hilfe verbucht sie als Batch Data Pipeline, ein Name, den die Rate Card vom August nicht zeigt.

Rechnen wir mit 300 vernetzten Maschinen und je 12 Signalen:

```kennzahlen
65.900 € | im Monat für Rohwerte im Sekundentakt: 9,3 Milliarden Zeilen, selbst mit Mengenstaffeln rund 13,2 Mio. Credits
181 € | im Monat für 15-Minuten-Aggregate mit Minimum, Maximum und Mittelwert pro Signal: 10,4 Mio. Zeilen, 36.288 Credits
quelle: Flex Credits Rate Card vom 31. August 2026 und Agentforce-Preisseite (500 € je 100.000 Credits), Mengen als Annahme
```

Für Zeitreihen, die schon in einem Data Lake liegen, wirbt Salesforce mit Zero-Copy-Zugriff. Die Hilfe rechnet Federation nach Datensätzen ab, die aus der Quelle gelesen werden, und ich habe keine passende Position in der Rate Card gefunden.

```hinweis offen
Für die Bulk-Variante (Batch Data Pipeline) und für Federation zeigt die Rate Card keine eigene Position. Fragen Sie Ihren Account Executive, welche Position jeweils gilt, und lassen Sie sich beide Sätze schriftlich geben.
```

Das Grounding von Agenten auf Betriebsanleitungen ist ein eigener Kostenblock, beschrieben in [Data 360 Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

Rohe Zeitreihen gehören in die IoT-Plattform oder den Historian, den der Maschinenbauer ohnehin betreibt. Salesforce braucht Zähler, Aggregate und Schwellwertereignisse, denn genau die lösen eine Work Order aus.

## Wann sind Wartungspläne die bessere Wahl?

Ein großer Teil des Nutzens, der unter „predictive“ versprochen wird, kommt aus zwei einfacheren Dingen: Keine geplante Wartung geht verloren, und die Intervalle folgen der echten Nutzung statt dem Kalender. Beides deckt Field Service ohne Prognosemodell ab.

Wartungspläne erzeugen die Work Orders, und Maintenance Work Rules an der Anlage steuern abweichende Intervalle, wie in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/) beschrieben. Die Produktseite ergänzt Pläne nach Nutzung und Zustand, mit einem Einsatz, sobald „an asset's temperature exceeds a set threshold“. Das Datenmodell hat dafür das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm), das Anlagenattribute speichert, „to track and analyze asset conditions“, verfügbar ab API-Version 57.0. Ein Betriebsstundenzähler, den SAP, proALPHA oder die IoT-Plattform einmal am Tag schreibt, reicht für nutzungsabhängige Intervalle.

Den Termin bucht dann der Agent für proaktive Wartung. Braucht eine Buchung fünf Aktionen, sind das 100 Credits oder 0,50 €.

Für mich ist das die richtige Antwort, wenn Baureihen klein sind, Maschinen kundenspezifisch gebaut werden, Fehlercodes bis vor kurzem Freitext waren oder Händler keine Reparaturen melden. Ein Pilot zur Ausfallprognose lohnt sich, wenn eine Baureihe viele hundert vernetzte Maschinen hat, die codierte Historie mehrere Jahre abdeckt und ungeplanter Stillstand unter einer Verfügbarkeitszusage im Servicevertrag echtes Geld kostet.

## Rechenbeispiel: 1.400 Maschinen in fünf Baureihen

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und Field Service im Betrieb. Alle Zahlen sind Annahmen, um die Methode zu zeigen.

1.400 Maschinen stehen beim Kunden, verteilt auf fünf Baureihen, die größte mit 350 Einheiten. 300 Maschinen sind über das eigene IoT-Gateway angebunden. Work Orders hängen seit einer Datenmigration 2022 an den Anlagen, Fehlercodes sind seit 2024 Auswahllisten. Händler in drei Ländern betreuen ihre Kunden selbst und melden nur Garantiefälle.

**Die Prüfung.** Die größte Baureihe zeigt 14 Spindeltausche in vier Jahren, fünf davon mit codierter Ursache, keiner aus den Händlerländern. Das ist zu dünn für eine Prognose, der die Disposition vertrauen würde.

**Die Entscheidung.**

1. **Nutzungsabhängige Intervalle.** Die IoT-Plattform schreibt einmal am Tag die Betriebsstunden an die Anlage. Die Maintenance Work Rules wechseln von halbjährlich auf alle 2.000 Betriebsstunden. Dafür braucht es keine Data-360-Credits.
2. **Drei Zustandssignale.** Spindeltemperatur, Vibration und Kühlmitteldruck gehen als 15-Minuten-Aggregate in Data 360: 2,6 Mio. Zeilen, 9.072 Credits, rund 45 € im Monat. Ein Schwellwert erzeugt eine Work Order.
3. **Buchung durch den Agenten.** 250 Termine im Monat mit je fünf Aktionen: 25.000 Credits, rund 125 €.
4. **Erst die Historie.** Codierte Fehlercodes werden für Händler Pflicht, als Teil des Garantieprozesses. 2028 zählt der Maschinenbauer erneut.

Zusammen sind das rund 34.000 Credits, etwa 170 € im Monat. Connected Assets für 15.000 $ pro Org und Monat (US-Listenpreis) rechnet sich erst, wenn der Health Score Entscheidungen trägt, die Schwellwerte nicht treffen können.

## Störungs-Work-Orders pro Baureihe zählen

1. **Zählen** Sie Störungs-Work-Orders pro Baureihe und codierter Ursache für die letzten drei Jahre.
2. **Schließen Sie die Lücken**: Verknüpfung mit der Anlage, Auswahllisten für Ursachen, Meldepflichten für Händler und Servicepartner.
3. **Legen Sie fest, wo Rohdaten liegen**, und welche Aggregate, Zähler und Ereignisse zu Salesforce gehen.
4. **Schätzen Sie Credits pro Signal**, bevor die erste Maschine angebunden wird, etwa mit [Flex Credits und Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).
5. **Fragen Sie Salesforce schriftlich** nach Status und Preis von Asset Service Prediction für Ihre Edition.

Wie Maschinendaten, ERP und Salesforce zusammenpassen, ist Teil meiner Arbeit an der [Schnittstellenarchitektur](../../leistungen/salesforce-schnittstellen/). Die Anbindung der Sensoren plane ich erst, wenn die Schritte 1 und 2 erledigt sind.
