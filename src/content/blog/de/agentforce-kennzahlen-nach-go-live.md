---
title: "Agentforce-Kennzahlen nach Go-live: lohnt sich der Agent?"
description: "Welche Agentforce-Kennzahlen 90 Tage nach Go-live zeigen, ob sich ein Agent für Hersteller lohnt, woher jede Zahl kommt und wann Sie ihn abschalten sollten."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: agentforce-kennzahlen-nach-go-live
translationKey: agentforce-kpis-after-go-live
topic: ai
categories: [ai]
tags: [Agentforce, Kennzahlen, Agent Analytics, Digital Wallet, Händlerservice, Maschinenbau]
takeaways:
  - "Es zählen Eskalationsquote, Task-Resolution-Quote, Kosten pro Lösung, Bearbeitungszeit eskalierter Fälle und der Anteil außerhalb der Servicezeiten."
  - "Agent Analytics liefert Eskalations-, Deflection- und Task-Resolution-Quote. Seit Juli 2026 bewertet ein LLM die Deflection anhand der ganzen Sitzung."
  - "Die Kosten pro Lösung verbinden die Credits aus Digital Wallet mit Ihren Betriebskosten, im Rechenbeispiel 2,98 € gegenüber 6 € für eine Servicekraft."
  - "Die Abschaltregel steht vor dem Go-live und gilt pro Subagent. Im Rechenbeispiel kostet der Ersatzteil-Subagent 8,94 € pro Lösung und wird abgeschaltet."
faq:
  - q: "Wo finde ich die Kennzahlen eines Agentforce-Agenten?"
    a: "Eskalations-, Deflection-, Abbruch- und Task-Resolution-Quote stehen in Agent Analytics in Agentforce Studio unter Observe & Optimize. Die Credits pro Agent liefert Digital Wallet, die Bearbeitungszeit nach der Übergabe kommt aus Service Cloud."
  - q: "Welche Eskalationsquote ist für einen Agentforce-Agenten gut?"
    a: "Salesforce veröffentlicht keinen Zielwert. Ich starte mit einer Abschaltschwelle von 40 Prozent pro Subagent nach zwei Verbesserungsrunden und passe sie an die Ausgangswerte der jeweiligen Anfrageart an."
  - q: "Verbraucht Agentforce Observability Flex Credits?"
    a: "Nein. Seit Juli 2026 ist Agentforce Observability laut Salesforce für alle Kunden und alle Agentforce-SKUs ohne Verbrauchsabrechnung. Die Nutzung erscheint weiterhin in Digital Wallet; neue Dashboards und das Einlesen externer Daten werden weiter abgerechnet."
  - q: "Ist eine abgefangene Sitzung dasselbe wie eine gelöste Anfrage?"
    a: "Nein. Seit 16. Juli 2026 bewertet ein LLM die ganze Sitzung mit einem Deflection-Wert von 1 bis 5, als abgefangen zählt eine Sitzung ohne Eskalation bei 4 oder 5. Das ist besser als die alte Regel, bleibt aber eine Einschätzung, keine bestätigte Lösung. Ich zähle die Task-Resolution-Quote und prüfe sie mit einer monatlichen Stichprobe von 50 Sitzungen."
  - q: "Wann sollte ein Hersteller einen Agentforce-Agenten abschalten?"
    a: "Sofort nach einem bestätigten Verstoß gegen eine harte Regel, etwa einer falschen Garantieaussage. Sonst an Tag 90, wenn eine gelöste Anfrage mehr kostet als bei einer Servicekraft oder die Eskalationsquote nach zwei Verbesserungsrunden hoch bleibt."
draft: false
---

Agentforce-Kennzahlen nach dem Go-live beantworten an Tag 90 eine Frage: Löst der Agent Händleranfragen günstiger als Ihr Service-Innendienst, ohne die schwierigen Fälle schlechter zu übergeben? Fünf Zahlen tragen den Business Case: Eskalationsquote, Task-Resolution-Quote, Kosten pro gelöster Anfrage, Bearbeitungszeit eskalierter Anfragen und der Anteil der Anfragen, die außerhalb der Servicezeiten beantwortet werden. Agent Analytics, Digital Wallet und Service Cloud liefern sie. Harte Regeln zu Qualität und Datenzugriff kommen dazu. Die Abschaltregel steht vor dem Go-live fest, vereinbart mit der Serviceleitung, und sie gilt pro Subagent ebenso wie für den ganzen Agenten.

## Welche Kennzahlen zeigen, ob sich ein Agentforce-Agent lohnt?

Die Kundenzahlen, die Salesforce selbst veröffentlicht, zeigen die richtige Art von Kennzahl. Die [Pressemitteilung zu Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) nennt 15 Prozent weniger durchschnittliche Bearbeitungszeit pro Fall bei Engine und 70 Prozent autonom gelöste administrative Chats bei 1-800Accountant in den Steuerwochen 2025. Beide Unternehmen sind keine Hersteller, und die Zahlen stammen von Salesforce selbst, aber sie messen Arbeit, die nicht mehr bei einem Menschen landet.

Für einen Händleragenten im Maschinenbau nutze ich fünf Kennzahlen:

| Kennzahl | Was sie misst | Woher die Zahl kommt |
|---|---|---|
| Eskalationsquote | Anteil der Sitzungen, die an eine Servicekraft oder einen anderen Agenten gehen | Agent Analytics |
| Task-Resolution-Quote | Anteil der Sitzungen, die als vollständig gelöst bewertet werden | Agent Analytics, Detektor im Trust Layer |
| Kosten pro gelöster Anfrage | Credits plus Betriebskosten, geteilt durch gelöste Sitzungen | Digital Wallet und Ihre eigene Kostenrechnung |
| Bearbeitungszeit eskalierter Anfragen | Minuten, die eine Servicekraft nach der Übergabe braucht | Service Cloud, Omni-Channel |
| Anteil außerhalb der Servicezeiten | Gelöste Anfragen, die eingingen, während der Innendienst geschlossen war | Abgleich der Sitzungsstartzeit mit den Servicezeiten |

## Woher die Zahlen kommen

**Agent Analytics.** Sie finden es in Agentforce Studio unter Observe & Optimize. Das [Trailhead-Modul zu Agent Analytics](https://trailhead.salesforce.com/content/learn/modules/agent-analytics-and-monitoring/monitor-agent-metrics-and-scores) definiert die Eskalationsquote als Anteil der Sitzungen, die an einen Supportmitarbeitenden oder einen anderen Agenten eskaliert wurden. Deflection und Abbruch bewertet bei Service-Agenten [seit 16. Juli 2026 ein LLM](https://help.salesforce.com/s/articleView?id=005305353&language=en_US&type=1): Deflection ist ein Wert von 1 bis 5, Abbruch wahr, falsch oder unsicher, und eine Sitzung ohne Eskalation zählt bei 4 oder 5 als abgefangen. Die Task-Resolution-Quote ist der Anteil, den der Task-Resolution-Detektor im Trust Layer als vollständig gelöst bewertet; er arbeitet mit Agenten aus dem neuen Agentforce Builder. Qualitätswerte wie Answer Faithfulness setzen Audit and Feedback im Setup voraus. Performance Insights zerlegt jede Kennzahl nach Subagent, Intent oder Aktion, und genau dort fällt die Abschaltentscheidung.

Das Lesen kostet keine Credits: Laut dem [Observability-Beitrag von Juli 2026](https://www.salesforce.com/blog/agentforce-observability/) ist Agentforce Observability „now unmetered for every customer across all Agentforce SKUs“.

**Digital Wallet.** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) schlüsselt den Verbrauch bis auf Agent, Aktion und Kanal auf und unterstützt eigene Tags für Ihr Reporting. Voraussetzung ist Data 360. Die Credits eines Agenten geteilt durch seine gelösten Sitzungen ergeben den Verbrauchsanteil der Kosten pro gelöster Anfrage. Wissenspflege, Regressionstests und Partnertage stehen in Ihrer eigenen Kostenrechnung, und im Rechenbeispiel unten sind sie der größere Teil.

**Service Cloud.** Eskalationen, die über Omni-Channel geroutet werden, werden zu AgentWork-Datensätzen, laut Salesforce eine [Arbeitszuweisung an einen Agenten](https://developer.salesforce.com/docs/atlas.en-us.260.0.object_reference.meta/object_reference/sforce_api_objects_agentwork.htm), hier also an die Servicekraft. Werten Sie die Bearbeitungszeit nach der Übergabe gegen die Ausgangswerte vor dem Go-live aus. Eine saubere Zusammenfassung durch den Agenten senkt sie; Händler, die nach drei erfolglosen Versuchen verärgert ankommen, treiben sie hoch.

**Anteil außerhalb der Servicezeiten.** Dafür gibt es keine fertige Kennzahl. Ich zähle die Sitzungen, die außerhalb der Servicezeiten beginnen, pro Land, und wie viele davon gelöst wurden. Für einen Exporteur mit Händlern in Asien oder Amerika kann das das stärkste Argument sein.

Agent Health Monitoring, in den [Dreamforce-2026-Ankündigungen](https://www.salesforce.com/blog/dreamforce-2026-announcements/) als GA geführt, mit „16+ built-in metrics“, deckt Fehler und Latenz ab. Es zeigt, ob der Agent läuft, und sagt nichts darüber, ob er sich rechnet.

## Warum zählt eine abgefangene Sitzung nicht als gelöst?

Deflection ist die Zahl, die Anbieter gern zeigen, und die schwächste der fünf. Nach der alten, ereignisbasierten Regel zählte ein Händler, der einen falschen Liefertermin bekam und das Fenster schloss, als abgefangen. Salesforce schrieb im Observability-Beitrag selbst, dass diese Quoten „typically measure proxy signals“, und seit 16. Juli 2026 bewertet ein LLM stattdessen die ganze Sitzung. Das verbessert die Kennzahl, aber auch der Bewerter kann eine Sitzung falsch lesen, und Sitzungen vor Mai 2026 haben keinen Wert.

```hinweis achtung
Seit ein LLM Deflection und Abbruch bewertet, kann sich die Definition unter Ihrer Zeitreihe ändern. Notieren Sie das Umstellungsdatum und die Prompt-Version neben jedem Monatswert.
```

Die Abrechnung bringt eine dritte Definition. Bei der Abrechnung pro Lösung für den Help Agent berechnet die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.service_cloud_billable_usage_types.htm&language=en_US&type=5) 400 Credits pro Lösung, wenn die Sitzung nicht abgebrochen ist, mindestens zwei Nachrichten des Nutzers und zwei Antworten des Agenten hat und mit positivem Feedback endet oder, ohne Feedback, ohne Eskalationswunsch. Im Enhanced Chat umfasst eine Lösung bis zu zwei Stunden; eine längere Sitzung zählt erneut. Den Vergleich mit Flex Credits rechne ich in [was ein Serviceagent für Händleranfragen kostet](../flex-credits-agentforce-kosten-pro-aktion/) durch.

Ich zähle eine Anfrage deshalb nur als gelöst, wenn der Task-Resolution-Detektor das sagt, und eine erfahrene Servicekraft liest 50 Sitzungen im Monat. Findet die Stichprobe falsche Antworten in Sitzungen, die als gelöst markiert sind, ist die Kennzahl zu optimistisch, und diese Lücke gehört in den Bericht.

## Rechenbeispiel: ein Händleragent nach 90 Tagen

Nehmen wir einen Maschinenbauer mit 350 Händlern in 30 Ländern, SAP als ERP und einem Agenten im Händlerportal mit zwei Subagenten: Auftragsstatus und Ersatzteilverfügbarkeit. Alle Zahlen sind Annahmen, um die Methode zu zeigen; nur die Credit-Faktoren und der Listenpreis stammen von Salesforce.

**Monat drei.** 2.400 Sitzungen, davon 1.500 zum Auftragsstatus und 900 zu Ersatzteilen. Eskalationsquote 30 Prozent (720 Sitzungen), Abbruch 8 Prozent, Task-Resolution-Quote 52 Prozent (1.248 Sitzungen). Die monatliche Stichprobe von 50 Sitzungen zeigt drei falsche Liefertermine.

**Kosten.** Drei Aktionen zu je 20 Credits laut [Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) ergeben 60 Credits pro Sitzung, 144.000 im Monat; ein Prompt-Template, das der Agent als Aktion aufruft, wird als diese Aktion abgerechnet, nicht noch einmal als Prompt. Zum Listenpreis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) sind das 720 €. Dazu kommen angenommene drei Partnertage zu 1.000 € für Wissenspflege, Korrekturen und Regressionstests: 3.720 € im Monat oder 2,98 € pro gelöster Anfrage. Vor dem Go-live brauchte eine Servicekraft angenommen sechs Minuten pro Anfrage bei 60 € pro Stunde, also 6 €. Die beiden Zahlen haben einen unterschiedlichen Umfang: Rechnet man die Innendienststunden für Eskalationen unten mit, kostet jede eingehende Anfrage rund 4,05 €.

**Bearbeitungszeit.** Die 720 eskalierten Anfragen dauern je 7,5 Minuten, länger als früher, weil nur noch die schwierigen ankommen: 90 Stunden Innendienst statt 240 vor dem Go-live. Ruft die Hälfte der 192 Händler mit abgebrochener Sitzung danach an, kommen 10 Stunden dazu. Brutto sparen Sie rund 140 Stunden oder 8.400 € im Monat; nach 3.720 € Agentenkosten bleiben rund 4.680 €.

**Außerhalb der Servicezeiten.** 26 Prozent der Sitzungen beginnen außerhalb von 7 bis 18 Uhr MEZ, davon werden 58 Prozent gelöst: rund 360 Sitzungen im Monat, in denen ein Händler nicht mehr bis zum nächsten Morgen wartet.

**Pro Subagent.** Auftragsstatus: Eskalation 14 Prozent, Task Resolution 70 Prozent. Ersatzteile: Eskalation 57 Prozent, Task Resolution 22 Prozent, weil Teile außerhalb des Zentrallagers eine manuelle Prüfung durch die Ersatzteilabteilung brauchen. Der Ersatzteil-Subagent verbraucht 270 € an Credits und hat laut Ticketprotokoll des Partners die Hälfte der Korrekturen verursacht, trägt also die Hälfte der Betriebskosten: 1.770 € für 198 gelöste Anfragen, also 8,94 € pro gelöster Anfrage und damit mehr als eine Servicekraft. Mit einem anderen Verteilschlüssel ändert sich die Zahl, erfassen Sie den Partneraufwand deshalb vom ersten Tag an pro Subagent.

```kennzahlen
2,98 € | pro gelöster Anfrage, ganzer Agent
6 € | pro Anfrage bei einer Servicekraft vor dem Go-live
8,94 € | pro gelöster Anfrage, Ersatzteil-Subagent
quelle: Rechenbeispiel mit angenommenen Werten; Credit-Faktoren laut Flex Credits Rate Card vom 3. November 2026, Listenpreis laut Salesforce
```

Die Entscheidung an Tag 90: Der Auftragsstatus bleibt und geht an die nächste Händlergruppe. Ersatzteile kommen aus dem Agenten heraus und gehen über ein strukturiertes Portalformular an die Ersatzteilabteilung, bis die Bestände der Regionallager in Salesforce ankommen. Wie ein Agent das richtige Teil findet, behandle ich in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/).

## Wann sollten Sie einen Agenten abschalten?

Gartner [erwartet](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), dass bis Ende 2027 mehr als 40 Prozent der Projekte mit agentischer KI eingestellt werden, wegen steigender Kosten, unklarem Geschäftsnutzen oder unzureichender Risikokontrollen. Eine Abschaltregel, die vor dem Go-live feststeht, macht daraus eine Routineentscheidung. Ich würde diese Auslöser mit der Serviceleitung vereinbaren und pro Subagent anwenden:

1. **Sofort:** ein bestätigter Verstoß gegen eine harte Regel, etwa eine falsche Garantieaussage oder Auftragsdaten eines anderen Händlers. Der Subagent bleibt aus, bis die Korrektur die Regressionstests aus [Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) besteht.
2. **Nach zwei Verbesserungsrunden von je 30 Tagen:** Eskalationsquote über 40 Prozent oder Task-Resolution-Quote unter 40 Prozent.
3. **An Tag 90:** Die Kosten pro gelöster Anfrage liegen über den Kosten einer Anfrage, die eine Servicekraft bearbeitet, außer der Business Case bezahlt ausdrücklich etwas anderes, etwa die Abdeckung außerhalb der Servicezeiten.
4. **Jederzeit:** Bearbeitungszeit eskalierter Anfragen deutlich über dem Ausgangswert derselben Anfrageart, denn dann verschiebt der Agent Arbeit, statt sie zu sparen.

Die 40 Prozent sind meine Startwerte, keine Vorgaben von Salesforce. Abschalten muss kein endgültiges Aus bedeuten: Sie können den Agenten auf einen Subagenten verkleinern, ihn nur außerhalb der Servicezeiten laufen lassen oder korrigieren und neu testen. Für die letzte Option ordnet der Agent Optimizer wiederkehrende Fehlermuster aus Produktivsitzungen nach Auswirkung. Salesforce nennt ihn im [Beitrag vom September 2026](https://www.salesforce.com/blog/agent-optimizer/) als Beta verfügbar, die Dreamforce-Liste kündigte GA für Oktober an; am 9. November 2026 führt die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ai.generative_ai_optimization_agent_use.htm&language=en_US&type=5) ihn noch als Pilot oder Beta. A/B Experimentation lässt eine Korrektur auf geteiltem Verkehr gegen die aktuelle Version antreten und ist als Beta für Oktober angekündigt; prüfen Sie den Status in Ihrer Org.

## Die 90-Tage-Prüfung mit drei Monaten Ausgangswerten vorbereiten

1. **Ausgangswerte messen**, drei Monate lang: Händleranfragen nach Art, Bearbeitungszeit, Eingangszeit nach Land.
2. **Audit and Feedback einschalten**, damit Qualitäts- und Vertrauenswerte ab dem ersten Tag vorliegen.
3. **Agenten- und Aktions-Tags in Digital Wallet prüfen** und eigene Tags pro Subagent ergänzen, damit Sie seine Credits getrennt auswerten können.
4. **Schwellen und Entscheider festhalten**: die Serviceleitung, nicht die IT.
5. **Die Stichprobe einplanen**: 50 Sitzungen im Monat, im Kalender einer namentlich benannten Person, mit Schwerpunkt auf Garantie und anderen riskanten Anliegen.
6. **Prüftermine festlegen**: Tag 30, Tag 60, Entscheidung an Tag 90.

Die Kennzahlen brauchen einen Business Case aus der Zeit vor dem Go-live, deshalb stelle ich [Business Value und Datenqualität an den Anfang](../agentforce-business-value-datenqualitaet/). Welche Agenten ihre Kosten wert sind, kläre ich im Rahmen von [Make-or-Buy und Lizenzplanung](../../leistungen/make-or-buy-lizenzen/).
