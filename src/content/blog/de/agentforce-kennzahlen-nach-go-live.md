---
title: "Agentforce-Kennzahlen nach Go-live: lohnt sich der Agent?"
description: "Welche Agentforce-Kennzahlen 90 Tage nach Go-live zeigen, ob sich ein Agent für Hersteller lohnt, woher jede Zahl kommt und wann Sie ihn abschalten sollten."
pubDate: 2026-10-27
lang: de
slug: agentforce-kennzahlen-nach-go-live
translationKey: agentforce-kpis-after-go-live
topic: ai
categories: [ai]
tags: [Agentforce, Kennzahlen, Agent Analytics, Digital Wallet, Händlerservice, Maschinenbau]
takeaways:
  - "Es zählen Eskalationsquote, Task-Resolution-Quote, Kosten pro Lösung, Bearbeitungszeit eskalierter Fälle und der Anteil außerhalb der Servicezeiten."
  - "Agent Analytics liefert Eskalations-, Deflection- und Task-Resolution-Quote. Eskalation und Deflection sind laut Salesforce selbst nur Ersatzsignale."
  - "Die Kosten pro Lösung verbinden die Credits aus Digital Wallet mit Ihren Betriebskosten, im Rechenbeispiel 3,06 € gegenüber 6 € für eine Servicekraft."
  - "Die Abschaltregel steht vor dem Go-live und gilt pro Subagent. Im Rechenbeispiel kostet der Ersatzteil-Subagent 9,12 € pro Lösung und wird abgeschaltet."
faq:
  - q: "Wo finde ich die Kennzahlen eines Agentforce-Agenten?"
    a: "Eskalations-, Deflection-, Abbruch- und Task-Resolution-Quote stehen in Agent Analytics in Agentforce Studio unter Observe & Optimize. Die Credits pro Agent liefert Digital Wallet, die Bearbeitungszeit nach der Übergabe kommt aus Service Cloud."
  - q: "Welche Eskalationsquote ist für einen Agentforce-Agenten gut?"
    a: "Salesforce veröffentlicht keinen Zielwert. Ich starte mit einer Abschaltschwelle von 40 Prozent pro Subagent nach zwei Verbesserungsrunden und passe sie an die Ausgangswerte der jeweiligen Anfrageart an."
  - q: "Verbraucht Agentforce Observability Flex Credits?"
    a: "Nein. Seit Juli 2026 ist Agentforce Observability laut Salesforce für alle Kunden und alle Agentforce-SKUs ohne Verbrauchsabrechnung. Neue Dashboards und das Einlesen externer Daten werden weiter abgerechnet."
  - q: "Ist eine abgefangene Sitzung dasselbe wie eine gelöste Anfrage?"
    a: "Nein. Deflection heißt nur, dass die Sitzung ohne Eskalation endete, auch wenn der Händler mit einer falschen Antwort gegangen ist. Ich zähle die Task-Resolution-Quote und prüfe sie mit einer monatlichen Stichprobe von 50 Sitzungen."
  - q: "Wann sollte ein Hersteller einen Agentforce-Agenten abschalten?"
    a: "Sofort nach einem bestätigten Verstoß gegen eine harte Regel, etwa einer falschen Garantieaussage. Sonst an Tag 90, wenn eine gelöste Anfrage mehr kostet als bei einer Servicekraft oder die Eskalationsquote nach zwei Verbesserungsrunden hoch bleibt."
draft: false
---

Agentforce-Kennzahlen nach dem Go-live beantworten an Tag 90 eine Frage: Löst der Agent Händleranfragen günstiger als Ihr Service-Innendienst, ohne die schwierigen Fälle schlechter zu übergeben? Fünf Zahlen entscheiden: Eskalationsquote, Task-Resolution-Quote, Kosten pro gelöster Anfrage, Bearbeitungszeit eskalierter Anfragen und der Anteil der Anfragen, die außerhalb der Servicezeiten beantwortet werden. Agent Analytics, Digital Wallet und Service Cloud liefern sie. Die Abschaltregel steht vor dem Go-live fest, vereinbart mit der Serviceleitung, und sie gilt pro Subagent ebenso wie für den ganzen Agenten.

## Welche Kennzahlen zeigen, ob sich ein Agentforce-Agent lohnt?

Die Kundenzahlen, die Salesforce selbst veröffentlicht, zeigen die richtige Art von Kennzahl. Die [Pressemitteilung zu Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) nennt 15 Prozent weniger durchschnittliche Bearbeitungszeit pro Fall bei Engine und 70 Prozent autonom gelöste administrative Chats bei 1-800Accountant in den Steuerwochen 2025. Beide Unternehmen sind keine Hersteller, und die Zahlen stammen von Salesforce selbst, aber sie messen Arbeit, die nicht mehr bei einem Menschen landet.

Für einen Händleragenten im Maschinenbau nutze ich fünf Kennzahlen:

| Kennzahl | Was sie misst | Woher die Zahl kommt |
|---|---|---|
| Eskalationsquote | Anteil der Sitzungen, die an eine Servicekraft oder einen anderen Agenten gehen | Agent Analytics |
| Task-Resolution-Quote | Anteil der Sitzungen, die als vollständig gelöst bewertet werden | Agent Analytics, Detektor im Trust Layer |
| Kosten pro gelöster Anfrage | Credits plus Betriebskosten, geteilt durch gelöste Sitzungen | Digital Wallet und Ihre eigene Kostenrechnung |
| Bearbeitungszeit eskalierter Anfragen | Minuten, die eine Servicekraft nach der Übergabe braucht | Service Cloud, Omni-Channel |
| Anteil außerhalb der Servicezeiten | Gelöste Anfragen, die eingingen, während der Innendienst geschlossen war | Startzeit der Sitzung gegen Servicezeiten |

## Woher die Zahlen kommen

**Agent Analytics.** Sie finden es in Agentforce Studio unter Observe & Optimize. Das [Trailhead-Modul zu Agent Analytics](https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/monitor-agent-metrics-and-scores) definiert die Eskalationsquote als Anteil der Sitzungen, die an einen Supportmitarbeitenden oder einen anderen Agenten eskaliert wurden, und die Deflection-Quote als Anteil, der ohne Eskalation endete. Als Abbruch zählen Sitzungen, die nach standardmäßig zwei Stunden ablaufen. Die Task-Resolution-Quote ist der Anteil, den der Task-Resolution-Detektor im Trust Layer als vollständig gelöst bewertet. Qualitätswerte wie Answer Faithfulness setzen Audit and Feedback im Setup voraus. Performance Insights zerlegt jede Kennzahl nach Subagent, Intent oder Aktion, und genau dort fällt die Abschaltentscheidung.

Das Lesen kostet keine Credits: Laut dem [Observability-Beitrag von Juli 2026](https://www.salesforce.com/blog/agentforce-observability/) ist Agentforce Observability „now unmetered for every customer across all Agentforce SKUs“.

**Digital Wallet.** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) schlüsselt den Verbrauch bis auf Agent, Aktion und Kanal auf und unterstützt eigene Tags. Voraussetzung ist Data 360. Die Credits eines Agenten geteilt durch seine gelösten Sitzungen ergeben den Verbrauchsanteil der Kosten pro gelöster Anfrage. Wissenspflege, Regressionstests und Partnertage stehen in Ihrer eigenen Kostenrechnung, und im Rechenbeispiel unten sind sie der größere Teil.

**Service Cloud.** Eskalationen, die über Omni-Channel geroutet werden, werden zu AgentWork-Datensätzen, laut Salesforce eine [Arbeitszuweisung an einen Agenten](https://developer.salesforce.com/docs/atlas.en-us.260.0.object_reference.meta/object_reference/sforce_api_objects_agentwork.htm), hier also an die Servicekraft. Werten Sie die Bearbeitungszeit nach der Übergabe gegen die Ausgangswerte vor dem Go-live aus. Eine saubere Zusammenfassung durch den Agenten senkt sie; Händler, die nach drei erfolglosen Versuchen verärgert ankommen, treiben sie hoch.

**Anteil außerhalb der Servicezeiten.** Dafür gibt es keine fertige Kennzahl. Ich zähle die Sitzungen, die außerhalb der Servicezeiten beginnen, pro Land, und wie viele davon gelöst wurden. Für einen Exporteur mit Händlern in Asien oder Amerika kann das das stärkste Argument sein.

Agent Health Monitoring, in den [Dreamforce-2026-Ankündigungen](https://www.salesforce.com/blog/dreamforce-2026-announcements/) als GA geführt, mit „16+ built-in metrics“, deckt Fehler und Latenz ab. Es zeigt, ob der Agent läuft, und sagt nichts darüber, ob er sich rechnet.

## Warum zählt eine abgefangene Sitzung nicht als gelöst?

Deflection ist die Zahl, die Anbieter gern zeigen, und die schwächste der fünf. Ein Händler, der einen falschen Liefertermin bekommt und das Fenster schließt, zählt als abgefangen. Salesforce schreibt im Observability-Beitrag selbst, dass diese Quoten „typically measure proxy signals“, und lässt Deflection und Abbruch künftig von einem LLM bewerten, das die ganze Sitzung mit einem anpassbaren Prompt liest. Das verbessert die Kennzahl.

```hinweis achtung
Wenn ein LLM Deflection und Abbruch bewertet, kann sich die Definition unter Ihrer Zeitreihe ändern. Notieren Sie die Prompt-Version neben jedem Monatswert.
```

Die Abrechnung bringt eine dritte Definition. Bei der Abrechnung pro Lösung für den Help Agent gilt laut [Salesforce Ben](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/) eine Messaging-Sitzung mit mehr als zwei Wortwechseln, ohne Feedback und ohne Eskalationswunsch, die länger als zwei Stunden läuft, als gelöst und wird berechnet. Den Vergleich mit Flex Credits rechne ich in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/) durch.

Ich zähle eine Anfrage deshalb nur als gelöst, wenn der Task-Resolution-Detektor das sagt, und eine erfahrene Servicekraft liest 50 Sitzungen im Monat. Findet die Stichprobe falsche Antworten in Sitzungen, die als gelöst markiert sind, ist die Kennzahl zu optimistisch, und diese Lücke gehört in den Bericht.

## Rechenbeispiel: ein Händleragent nach 90 Tagen

Nehmen wir einen Maschinenbauer mit 350 Händlern in 30 Ländern, SAP als ERP und einem Agenten im Händlerportal mit zwei Subagenten: Auftragsstatus und Ersatzteilverfügbarkeit. Alle Zahlen sind Annahmen, um die Methode zu zeigen; nur die Credit-Faktoren und der Listenpreis stammen von Salesforce.

**Monat drei.** 2.400 Sitzungen, davon 1.500 zum Auftragsstatus und 900 zu Ersatzteilen. Eskalationsquote 30 Prozent (720 Sitzungen), Abbruch 8 Prozent, Task-Resolution-Quote 52 Prozent (1.248 Sitzungen). Die monatliche Stichprobe von 50 Sitzungen zeigt drei falsche Liefertermine.

**Kosten.** Drei Aktionen zu je 20 Credits und zwei Standard Prompts zu je 4 Credits laut [Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) ergeben 68 Credits pro Sitzung, 163.200 im Monat. Zum Listenpreis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) sind das 816 €. Dazu kommen angenommene drei Partnertage zu 1.000 € für Wissenspflege, Korrekturen und Regressionstests: 3.816 € im Monat oder 3,06 € pro gelöster Anfrage. Vor dem Go-live brauchte eine Servicekraft angenommen sechs Minuten pro Anfrage bei 60 € pro Stunde, also 6 €.

**Bearbeitungszeit.** Die 720 eskalierten Anfragen dauern je 7,5 Minuten, länger als früher, weil nur noch die schwierigen ankommen: 90 Stunden Innendienst statt 240 vor dem Go-live. Ruft die Hälfte der 192 Händler mit abgebrochener Sitzung danach an, kommen 10 Stunden dazu. Netto sparen Sie rund 140 Stunden, 8.400 € im Monat gegenüber 3.816 € Agentenkosten.

**Außerhalb der Servicezeiten.** 26 Prozent der Sitzungen beginnen außerhalb von 7 bis 18 Uhr MEZ, davon werden 58 Prozent gelöst: rund 360 Händler im Monat, die nicht mehr bis zum nächsten Morgen warten.

**Pro Subagent.** Auftragsstatus: Eskalation 14 Prozent, Task Resolution 70 Prozent. Ersatzteile: Eskalation 57 Prozent, Task Resolution 22 Prozent, weil Teile außerhalb des Zentrallagers eine manuelle Prüfung durch die Ersatzteilabteilung brauchen. Der Ersatzteil-Subagent verbraucht 306 € an Credits und hat die meisten Korrekturen verursacht, trägt also die Hälfte der Betriebskosten: 1.806 € für 198 gelöste Anfragen, 9,12 € pro Stück und damit mehr als eine Servicekraft.

```kennzahlen
3,06 € | pro gelöster Anfrage, ganzer Agent
6 € | pro Anfrage bei einer Servicekraft vor dem Go-live
9,12 € | pro gelöster Anfrage, Ersatzteil-Subagent
quelle: Rechenbeispiel mit angenommenen Werten; Credit-Faktoren laut Flex Credits Rate Card vom 31. August 2026, Listenpreis laut Salesforce
```

Die Entscheidung an Tag 90: Der Auftragsstatus bleibt und geht an die nächste Händlergruppe. Ersatzteile kommen aus dem Agenten heraus und gehen über ein strukturiertes Portalformular an die Ersatzteilabteilung, bis die Bestände der Regionallager in Salesforce ankommen. Wie ein Agent das richtige Teil findet, behandle ich in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/).

## Wann sollten Sie einen Agenten abschalten?

Gartner [erwartet](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), dass bis Ende 2027 mehr als 40 Prozent der Projekte mit agentischer KI eingestellt werden, wegen steigender Kosten, unklarem Geschäftsnutzen oder unzureichender Risikokontrollen. Eine Abschaltregel, die vor dem Go-live feststeht, macht daraus eine Routineentscheidung. Ich würde diese Auslöser mit der Serviceleitung vereinbaren und pro Subagent anwenden:

1. **Sofort:** ein bestätigter Verstoß gegen eine harte Regel, etwa eine falsche Garantieaussage oder Auftragsdaten eines anderen Händlers. Der Subagent bleibt aus, bis die Korrektur die Regressionstests aus [Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) besteht.
2. **Nach zwei Verbesserungsrunden von je 30 Tagen:** Eskalationsquote über 40 Prozent oder Task-Resolution-Quote unter 40 Prozent.
3. **An Tag 90:** Kosten pro gelöster Anfrage über den Kosten einer Servicekraft pro Anfrage.
4. **Jederzeit:** Bearbeitungszeit eskalierter Anfragen deutlich über dem Ausgangswert derselben Anfrageart, denn dann verschiebt der Agent Arbeit, statt sie zu sparen.

Die 40 Prozent sind meine Startwerte, keine Vorgaben von Salesforce. Abschalten muss nicht Aufhören heißen: Sie können den Agenten auf einen Subagenten verkleinern, ihn nur außerhalb der Servicezeiten laufen lassen oder korrigieren und neu testen. Für die letzte Option ordnet der Agent Optimizer wiederkehrende Fehlermuster aus Produktivsitzungen nach Auswirkung. Salesforce nennt ihn im [Beitrag vom September 2026](https://www.salesforce.com/blog/agent-optimizer/) als Beta verfügbar, die Dreamforce-Liste kündigt GA für Oktober an. A/B Experimentation lässt eine Korrektur auf geteiltem Verkehr gegen die aktuelle Version antreten und ist als Beta für Oktober angekündigt; prüfen Sie den Status in Ihrer Org.

## Die 90-Tage-Prüfung mit drei Monaten Ausgangswerten vorbereiten

1. **Ausgangswerte messen**, drei Monate lang: Händleranfragen nach Art, Bearbeitungszeit, Eingangszeit nach Land.
2. **Audit and Feedback einschalten**, damit Qualitäts- und Vertrauenswerte ab dem ersten Tag vorliegen.
3. **Den Agenten in Digital Wallet taggen**, damit seine Credits getrennt von anderen Agenten der Org sichtbar bleiben.
4. **Schwellen und Entscheider festhalten**: die Serviceleitung, nicht die IT.
5. **Die Stichprobe einplanen**: 50 Sitzungen im Monat, im Kalender einer namentlich benannten Person.
6. **Prüftermine festlegen**: Tag 30, Tag 60, Entscheidung an Tag 90.

Die Kennzahlen brauchen einen Business Case aus der Zeit vor dem Go-live, deshalb stelle ich [Business Value und Datenqualität an den Anfang](../agentforce-business-value-datenqualitaet/). Welche Agenten ihre Kosten wert sind, kläre ich im Rahmen von [Make-or-Buy und Lizenzplanung](../../leistungen/make-or-buy-lizenzen/).
