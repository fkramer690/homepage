---
title: "Agentforce-Kosten für Hersteller: Flex Credits bis AELA"
metaTitle: "Agentforce-Preise 2026: 0,10 € pro Aktion, Rechenbeispiel"
description: "Eine Agentforce-Standardaktion kostet 20 Flex Credits (0,10 €). Dazu kommen Prompts, Data 360 und Tests: ein Serviceagent kostet rund 14.000 € im 1. Jahr."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: flex-credits-agentforce-kosten-pro-aktion
translationKey: flex-credits-agentforce-costs
topic: ai
categories: [ai, architecture]
contactBrief: licences
tags: [Agentforce, Flex Credits, AELA, Digital Wallet, Kostenschätzung, Maschinenbau]
takeaways:
  - "Prompts kosten je 2.000 Tokens 2, 4 oder 16 Credits, aber nur bei direkten LLM-Aufrufen. Prompt-Template-Aktionen eines Agenten zählen als Aktion."
  - "Der Preis pro Lösung (400 Credits) schlägt Flex Credits erst, wenn ein gelöstes Gespräch mehr als 20 Aktionen braucht; ungelöste werden ohnehin gezählt."
  - "Digital Wallet schlüsselt den Verbrauch nach Agent, Kanal und eigenen Tags auf, stoppt aber keinen Agenten, wenn ein Werk sein Budget verbraucht hat."
  - "MCP-Aufrufe externer Agenten werden als Headless Platform Interactions abgerechnet. Stand November 2026 ist der Satz noch mit TBA angegeben."
  - "Mit Flex Credits verglichen lohnt eine AELA zu angenommenen 150.000 € im Jahr erst ab 30 Mio. Credits, also 1,5 Mio. Aktionen."
faq:
  - q: "Was kostet eine Agentforce-Aktion?"
    a: "Eine Standard- oder Custom-Aktion verbraucht 20 Flex Credits. Bei 500 € je 100.000 Credits sind das 0,10 €. In Sandbox und Scratch Org kostet sie 16 Credits, eine Sprachaktion 30 Credits in Produktion und 24 Credits in der Sandbox."
  - q: "Was kostet ein Agentforce-Serviceagent für Händler pro Monat?"
    a: "Im Rechenbeispiel mit 3.000 Gesprächen und je drei Aktionen verbraucht er 180.000 Credits, rund 900 € im Monat. Mit Katalogpflege in Data 360 sind es 195.000. Das erste Jahr braucht mit Aufbau und Tests rund 2,7 Mio. Credits."
  - q: "Was passiert mit Flex Credits, die ich nicht nutze?"
    a: "Sie verfallen zum Enddatum der Bestellung und gehen nicht in die nächste Laufzeit über. Mehrverbrauch wird ohne Aufschlag zum vereinbarten Satz monatlich nachträglich abgerechnet. Kaufen Sie deshalb entlang des Go-live-Plans."
  - q: "Kann ich jedem Werk ein eigenes Flex-Credit-Limit geben?"
    a: "Als harte Grenze nicht, jedenfalls nicht in der Dokumentation, die ich geöffnet habe. Digital Wallet warnt bei Schwellenwerten und unterstützt Tags wie Kostenstelle, der Pool gilt aber pro Org. Werksbudgets vereinbaren Sie intern und prüfen sie gegen den getaggten Verbrauch."
  - q: "Kosten MCP-Aufrufe auf Salesforce heute schon Geld?"
    a: "Stand November 2026 kosten sie noch nichts. Laut Salesforce wird agentische Nutzung noch nicht gemessen; Salesforce kündigt den Start der Messung 30 Tage vorher an, und Sandboxes sind ausgenommen. Die Rate Card führt den Zähler Headless Platform Interactions bereits, mit dem Satz TBA."
  - q: "Was ist eine Salesforce AELA?"
    a: "Salesforce beschreibt sie als Vertrag mit festem Preis und fester Laufzeit, unbegrenztem Zugang zu den Verbrauchsdiensten, ohne Mehrverbrauchsgebühren und ohne nutzungsabhängige Abrechnung. Forrester nennt Agentforce, Data 360 und MuleSoft über zwei oder drei Jahre. Preise sind nicht öffentlich. Verhandeln Sie schon bei Unterschrift, was nach der Laufzeit gilt."
draft: false
---

Eine Standardaktion in Agentforce kostet 20 Flex Credits, also 0,10 €, doch die Kosten bestehen aus mehr als dem Preis pro Aktion. Dazu kommen Prompts nach Modellstufe, Sprachfunktionen, Data 360 für Handbücher und Ersatzteilkataloge, Testläufe in der Sandbox und bald MCP-Aufrufe externer KI-Agenten, deren Preis noch fehlt. Ungenutzte Credits verfallen zum Ende der Bestellung. Ein Serviceagent für Händleranfragen verbraucht im Rechenbeispiel unten Credits für knapp 1.000 € im Monat und rund 14.000 € im ersten Jahr, ohne Umsetzung, MuleSoft und Nutzerlizenzen. Ich schätze pro Gesprächstyp, kaufe entlang des Go-live-Plans, benenne eine Budgetverantwortliche für den Pool und prüfe eine Pauschale erst, wenn mehrere Agenten live sind.

## Flex Credits: Rate Card mit eigenem Satz pro Nutzungsart

Flex Credits sind die Währung, in der Salesforce den Agentforce-Verbrauch abrechnet. Die [Agentforce-Preisseite](https://www.salesforce.com/eu/agentforce/pricing/) nennt 500 € je 100.000 Credits, ein Credit kostet also einen halben Cent. Fast jede Nutzungsart wird mit einem festen Satz laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) mit Stand 3. November 2026 abgerechnet, geprüft am 9. November:

- **Aktionen:** 20 Credits in Produktion, 16 in Sandbox oder Scratch Org. Laut [Hilfeartikel zu den abrechenbaren Nutzungsarten](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) auch dann, wenn sie deterministisch laufen.
- **Sprachaktionen:** 30 Credits in Produktion, 24 in der Sandbox. Speech to Text kostet 150 Credits pro Stunde Audio und Text to Speech 6.000 pro Million Zeichen, gezählt unabhängig von den Sprachaktionen.
- **Data 360:** 150 Credits pro MB für Unstructured Processing, 600 für Intelligent Processing, Abfragen 3 Credits pro Million Zeilen. Die Staffel gilt pro Nutzungsart und setzt sich monatlich zurück: Oberhalb von 300.000 Credits sinkt der Satz in Stufen. In der Sandbox gilt pauschal 120 pro MB. Hybride Suche kostet laut [Salesforce Ben](https://www.salesforceben.com/data-360-formerly-data-cloud-deep-dive-your-guide-to-the-vector-database/) doppelt so viel wie Vektorsuche, und neue Dateien bauen den Index neu auf.
- **Headless Platform Interactions:** gelistet, aber ohne Satz („TBA“).

Prompts übersieht man leicht, weil die Beispiele der Preisseite nur Aktionen zählen. Gezählt wird pro Aufruf des LLM-Gateways in Einheiten bis 2.000 Tokens, ein Aufruf mit 6.500 Tokens zählt als vier Prompts. Die [Seite zur Modellunterstützung](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) ordnet jedes Modell einer Stufe zu:

| Stufe | Credits pro Prompt | Beispielmodelle |
|---|---|---|
| Basic | 2 | GPT-5 Mini, Gemini 2.5 Flash |
| Standard | 4 | Claude Sonnet 5, GPT-5, Gemini 2.5 Pro |
| Advanced | 16 | Claude Opus 4.8, GPT 5.5 |
| Starter | 2 | nur eigene Modelle (BYOLLM) |

Für eine Fallzusammenfassung, die eine Servicemitarbeiterin liest und korrigiert, würde ich mit einem Standard-Modell starten und nur wechseln, wenn Tests eine Qualitätslücke zeigen. Prompt-Sätze gelten für Funktionen, die das LLM-Gateway direkt aufrufen, etwa Service Replies oder eine Zusammenfassung in der Konsole. Laut [Hilfeartikel zur Abrechnung des Help Agent](https://help.salesforce.com/s/articleView?id=ai.help_agent_billing.htm&language=en_US&type=5) gelten sie nicht für Aktionen, die ein Agentforce-Agent ausführt; eine Prompt-Template-Aktion eines Agenten zählt als Aktion.

## Rechenbeispiel: ein Serviceagent für Händleranfragen

Nehmen wir einen Maschinenbauer mit 400 Händlern, SAP S/4HANA, einem Händlerportal und rund 2.000 MB Ersatzteilkatalogen und Handbüchern als PDF. Der Agent beantwortet 3.000 Gespräche im Monat zu Auftragsstatus, Lieferterminen und Ersatzteilverfügbarkeit, mit je drei Aktionen. Alle Mengen sind Annahmen, die Sätze stammen aus der Rate Card.

| Posten | Credits | EUR |
|---|---|---|
| Aktionen pro Monat: 3.000 × 3 × 20 | 180.000 | 900 |
| Data 360, 100 MB geänderte Dokumente pro Monat | 15.000 | 75 |
| **Laufender Betrieb pro Monat** | **195.000** | **975** |
| Erste Aufbereitung der 2.000 MB | 300.000 | 1.500 |
| Sandbox-Tests: 500 Gespräche × 4 Regressionsläufe × 3 Aktionen × 16 | 96.000 | 480 |
| Sandbox: 200 MB Katalogausschnitt × 120 | 24.000 | 120 |
| **Erstes Jahr: 12 Monate Gespräche, 11 Monate Änderungen, Aufbau, Tests** | **2.745.000** | **13.725** |

Nicht enthalten sind MuleSoft-Lizenzen, die Umsetzung, Lizenzen für Servicemitarbeitende und die Pflege; alle Werte sind Listenpreise. Den Katalog einmal aufzubereiten kostet so viel wie sieben Wochen Händlergespräche. Veraltete Katalogstände vorher auszusortieren ist die günstigste Einsparung im ganzen Projekt, mehr dazu in [Data-360-Kosten für KI-Agenten](/blog/data-360-kosten-fuer-ki-agenten/). Agententests laufen nur in Sandboxes, und laut [Testdokumentation](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html) verbrauchen sie Credits; wie viele Läufe sinnvoll sind, steht in [Agentforce-Agenten testen und freigeben](/blog/agentforce-agenten-testen-freigeben/).

```hinweis achtung
Den vollen Katalog mit 2.000 MB in der Sandbox aufzubereiten kostet 240.000 Credits, fast so viel wie in Produktion, weil dort keine Staffel gilt. Ein repräsentativer Ausschnitt von 200 MB kostet 24.000 Credits.
```

Auf der Nutzenseite steht: Braucht eine Servicemitarbeiterin heute sechs Minuten pro Anfrage und löst der Agent 60 Prozent, werden 180 Stunden im Monat frei, für rund 5 € Verbrauch pro Stunde. Nach meiner Einschätzung entscheidet der Verbrauch diesen Business Case selten. Aufbau, Tests und Pflege entscheiden ihn.

## Pro Aktion, pro Gespräch oder pro Lösung bezahlen?

Salesforce bietet mehrere Preismodelle, und sie liegen weit auseinander. Nicht jedes passt zu jedem Agenten, prüfen Sie also zuerst die Voraussetzungen:

- **Flex Credits pro Aktion.** Im Rechenbeispiel 60 Credits pro Gespräch, 900 € im Monat, ohne Katalogpflege.
- **Pro Gespräch.** Die Preisseite nennt 2 € pro Gespräch, also 6.000 € im Monat. Flex Credits und Gesprächspreise lassen sich laut Preisseite nicht in derselben Org kombinieren.
- **Pro Lösung.** Der Help Agent, inzwischen Casey genannt (siehe [Casey und der Service Rep Assistant](/blog/service-cloud-casey-und-service-rep-assistant/)), kostet 400 Credits pro gelöstem Gespräch. Aktionen und Data-360-Abfragen in einer gelösten Sitzung sind in der Lösung enthalten. Außerhalb einer gelösten Sitzung werden sie laut [Hilfeartikel zur Abrechnung des Help Agent](https://help.salesforce.com/s/articleView?id=ai.help_agent_billing.htm&language=en_US&type=5) nach ihren eigenen Nutzungsarten gezählt. Bei 60 Prozent gelösten Gesprächen sind das 3.600 € für Lösungen plus 360 € für die Aktionen der übrigen 1.200 Gespräche. Lösungen in der Sandbox sind laut [Salesforce Deutschland](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/) kostenlos. Für einen Help Agent im Serviceportal gibt es zusätzlich Lizenzen pro Login und pro Mitglied.

Der Vergleich ist einfach: Weil ungelöste Gespräche in beiden Modellen gezählt werden, gewinnt der Preis pro Lösung nur, wenn ein gelöstes Gespräch mehr als 400 Credits an Aktionen kosten würde, also mehr als 20 Aktionen. Mit drei Aktionen pro Gespräch sind Flex Credits bei jeder Lösungsquote günstiger. Was als gelöst zählt, steht im [Preisleitfaden von Salesforce Ben](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/); ohne Rückmeldung zählt auch eine Sitzung, die zwei Stunden offen bleibt. Für enge Händleranfragen würde ich mit Flex Credits planen. Der Preis pro Lösung passt zu Agenten, die pro Fall viele Schritte brauchen. Für Mitarbeitende in Salesforce gibt es einen weiteren Weg: das Add-on pro Nutzer mit „Unmetered Agentforce usage for employees“, 125 $ pro Nutzer und Monat (US-Listenpreis). Für Händler und Kunden greift es nicht.

## Der Pool einer Edition reicht für den Piloten, nicht fürs Programm

Die [Editionen Core, Advanced und Max](/blog/salesforce-editionen-core-advanced-max/) enthalten einen Flex-Credit-Pool. Die [EU-Preisseite für Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) nennt ihn pro Org und Jahr:

```kennzahlen
500.000 | Flex Credits pro Org und Jahr in Core
1 Mio. | Flex Credits pro Org und Jahr in Advanced
2,75 Mio. | Flex Credits pro Org und Jahr in Max
quelle: Salesforce EU-Preisseite Sales Cloud und Meldung zu den Editionen 2026
```

Der Serviceagent aus dem Rechenbeispiel braucht im ersten Jahr fast den ganzen Max-Pool, und dieser Pool deckt auch jede andere verbrauchsabhängige Nutzung in der Org. Zusätzliche Credits gibt es als Pre-Purchase, Pre-Commit oder PayGo, und das [Flex Agreement](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) erlaubt, Nutzerlizenzen in Flex Credits umzuwandeln und zurück. Mehrverbrauch wird ohne Strafaufschlag zum vereinbarten Satz nachträglich abgerechnet. Ungenutzte Credits verfallen dagegen zum Ende der Bestellung, „no rollover will be permitted“.

Daraus folgt die wichtigste Kaufregel: Kaufen Sie entlang des Go-live-Plans, nicht entlang des Budgetjahrs. Rutscht der Go-live von März auf Juni, sind drei Monate Volumen bezahlt und verloren. Ich würde mit einem kleinen Pre-Purchase für Pilot und Tests starten, den Hochlauf über PayGo oder Pre-Commit abdecken und erst größer kaufen, wenn Digital Wallet echte Zahlen zeigt.

## Kostenkontrolle über Werke: Digital Wallet und eine Budgetverantwortliche

Der Pool hängt an der Org und am Vertrag. Teilen sich zwei Werke, eine US-Tochter und eine Serviceregion eine Org, bedienen sich alle aus demselben Pool, und die Rechnung erhält, wer unterschrieben hat. [Digital Wallet](https://www.salesforce.com/eu/agentforce/digital-wallet/) liefert die Daten für die Verrechnung:

- **Aufschlüsselung** bis auf Agent, Aktion und Kanal.
- **Eigene Tags** nach Kategorien wie Abteilung oder Kostenstelle, laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.wallet_about.htm&type=5) mit getrennten Berechtigungen für Ansehen und Zuweisen.
- **Schwellenwert-Warnungen** per Flow-Vorlage an Admins, als Systembenachrichtigung oder in Slack.

Voraussetzung sind ein Digital-Wallet-fähiges Produkt, eine Data-360-Lizenz (eine Customer-Data-Platform-Lizenz reicht nicht) und die Berechtigung View Consumption; in Sandboxes ist Digital Wallet nicht verfügbar. Maßgeblich für die interne Rechnung ist laut [Trailhead](https://trailhead.salesforce.com/de/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) die Monatsabrechnung, kein Dashboard-Screenshot. Dort wird auch eine Falle für Konzerne beschrieben: Kauft eine Tochter eigene Credits für dieselbe Org, verbraucht Digital Wallet zuerst die Credits aus dem Vertrag, der am frühesten endet.

```hinweis offen
Einen automatischen Stopp habe ich nicht gefunden. Die Seiten, die ich geöffnet habe, beschreiben nur Warnungen. Ein Werksbudget bleibt damit eine Zahl im Controlling, und wer eine harte Grenze braucht, deaktiviert den Agenten selbst.
```

Ich würde eine Person in der Konzern-IT oder im [Salesforce Center of Excellence](/blog/salesforce-center-of-excellence-format/) zur Budgetverantwortlichen machen, Tags für Gesellschaft, Kostenstelle und Umgebung ab dem ersten Tag setzen und sechs Monate Showback nutzen, bevor Werke zahlen. Danach verrechne ich zum festen Satz von 5 € pro 1.000 Credits. Halten Sie vor dem ersten regionalen Go-live schriftlich fest, wer verfallene Credits trägt. Ohne Regel trägt das zentrale IT-Budget den Verlust, und niemand merkt es. Welche Kennzahlen Sie pro Agent verfolgen, steht in [Agentforce-Kennzahlen nach dem Go-live](/blog/agentforce-kennzahlen-nach-go-live/).

## MCP-Zugriffe externer Agenten: der Zähler ohne Preis

Nutzen Ihre Key Account Manager Claude oder ChatGPT mit Salesforce-Daten, entsteht ein Kostenposten, den kein Projekt plant. Laut [Salesforce Ben vom 24. September 2026](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/), der sich auf einen Salesforce-Hilfeartikel beruft, zählt jeder erfolgreiche Aufruf eines registrierten Agenten über MCP oder eine als agentisch eingestufte API als Headless Platform Interaction. Gemessen wird noch nicht, Salesforce kündigt den Start 30 Tage vorher an, Sandboxes sind ausgenommen, und bestehende Schnittstellen zu SAP oder Middleware behalten ihre Konditionen.

Bei einem eigenen Agentforce-Agenten legen Sie die Aktionen fest. Bei einem externen Agenten bestimmt dessen Verhalten, wie viele Aufrufe eine Frage braucht. Nehmen wir 60 Key Account Manager mit je 15 Fragen an 220 Arbeitstagen, also 198.000 Fragen im Jahr, und drei hypothetische Sätze:

| Angenommener Satz pro Aufruf | 2 Aufrufe pro Frage | 8 Aufrufe pro Frage |
|---|---|---|
| 1 Credit | 1.980 € | 7.920 € |
| 4 Credits | 7.920 € | 31.680 € |
| 20 Credits, wie eine Aktion | 39.600 € | 158.400 € |

Das Tool-Design verändert die Rechnung so stark wie der Satz selbst. Ein gezieltes Werkzeug, etwa ein Flow, der die Auftragsübersicht eines Händlers in einer Antwort liefert, spart bei jeder Frage Aufrufe; wer über diese Server welche Daten lesen darf, behandle ich in [Hosted MCP Server und Datenzugriff](/blog/salesforce-hosted-mcp-server-datenzugriff/). Dazu zahlen Sie doppelt: den KI-Anbieter für Lizenzen oder Tokens und Salesforce für die Aufrufe. Zählen Sie Aufrufe pro Aufgabe in der Sandbox, wo Salesforce nicht misst (der KI-Anbieter rechnet trotzdem ab), budgetieren Sie eine Spanne und lassen Sie sich Satz und Obergrenze vor der Ankündigung schriftlich geben. Unabhängig davon verbrauchen direkte API-Aufrufe das [tägliche API-Kontingent der Org](https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html), das Ihre SAP-Schnittstelle mitbenutzt.

## Wann lohnt eine AELA statt Flex Credits?

Salesforce beschreibt das Agentic Enterprise License Agreement (AELA) auf seiner [Seite zu Kaufmodellen](https://www.salesforce.com/pricing/flexible-buying-models/) als „a fixed-price, fixed-term agreement“ mit „unlimited access to Salesforce consumption services“, „no overages, and no usage-based billing“. Laut [Forrester](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) ist es ein Pauschalvertrag mit „unlimited use of consumption‑based products such as Agentforce, Data 360/Data Cloud, and MuleSoft for a fixed fee over two or three years“. Salesforce verkaufte laut [Transkript zum vierten Quartal FY26](https://s205.q4cdn.com/626266368/files/doc_financials/2026/q4/Transcript-Salesforce-Inc-Q4-FY26-Earnings-Conference-Call-2-25-26.pdf) über 120 solcher Verträge in einem Quartal. Preis, Fair-Use-Regeln und das Modell nach der Laufzeit sind nicht öffentlich, und „unlimited“ ist kein Standard: Bei Adecco unterliegt die Nutzung laut Fußnote dem Vertrag.

Rechnet man nur gegen zusätzliche Flex Credits, zeigt sich die Schwelle. Kostet die Pauschale oberhalb der heutigen Lizenzen angenommen 150.000 € im Jahr, lassen sich für dasselbe Geld 30 Mio. Flex Credits kaufen, also 1,5 Mio. Standardaktionen. Plant ein Hersteller drei Agenten, die über drei Jahre auf zusammen 13,5 Mio. Credits wachsen, kostet das zum Listenpreis 67.500 €, die AELA 450.000 €. Das ist ein Vergleich der nominalen Kosten, kein Break-even der AELA: Der Vertrag kann weitere Verbrauchsdienste, Rabatte und Lizenzbestandteile enthalten. Enthält das Angebot Lizenzen, die Sie ohnehin kaufen, vergleichen Sie den ganzen Vertrag.

```pro-contra
pro: Spricht für eine AELA
- **Mehrere Agenten sind freigegeben,** in mindestens zwei Bereichen wie Händlerservice und Außendienst.
- **Das Angebot enthält Lizenzen, die Sie ohnehin kaufen,** etwa ein Upgrade der Edition oder Field Service.
- **Der Verbrauch ist schwer zu schätzen,** weil große Dokumentbestände oder der MCP-Satz offen sind.
contra: Nicht unterschreiben
- In der Pilotphase oder für ein einzelnes Werk.
- Solange Ersatzteil- und Anlagendaten unzuverlässig sind.
- Ohne geregelte Verlängerung.
```

Die Finanzchefin von Salesforce sprach im selben Call davon, AELA-Kunden später in ein verbrauchsbasiertes Modell zu überführen. Was die AELA kostet, entscheidet sich deshalb im zweiten Vertrag. Schreiben Sie in den ersten Vertrag: Preismodell und Preisdeckel ab Jahr vier, jährliche Ausstiegspunkte (der Vertrag des [US-Veteranenministeriums](https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/) hat eine Laufzeit von einem Jahr plus zwei optionalen Verlängerungen), Umfang und Fair-Use-Regeln. Das ist eine kaufmännische Checkliste, keine Rechtsberatung.

## Erster Schritt: ein Verbrauchsplan pro Agent über drei Jahre

```schritte
Aktionen und direkte Prompts pro Gesprächstyp zählen
  Mit Protokollen aus Sandbox-Tests, Tokens direkter LLM-Aufrufe auf 2.000er-Einheiten aufgerundet.
Dokumente für Data 360 bemessen
  Erstbeladung und monatliche Änderungen in MB, veraltete Kataloge vorher aussortiert.
Auf Monate verteilen
  Pilot, Hochlauf und volle Last, mit Reserve für den MCP-Zähler.
Kaufmodell wählen
  Pool der Edition, Pre-Purchase für den Piloten, PayGo für den Hochlauf.
Budget zuordnen
  Eine Budgetverantwortliche, Tags pro Gesellschaft, Warnungen bei 50, 80 und 95 Prozent.
Vier Wochen nach Go-live neu rechnen
  Digital Wallet gegen die Schätzung, dann über weitere Agenten oder eine AELA entscheiden.
```

Die Methode für die Schätzung steht im [Masterclass-Kapitel zu Kosten und Token](/masterclass/ki-salesforce/kosten-und-token/). Lizenzmodelle über mehrere Jahre und Gesellschaften zu vergleichen gehört zu meiner Arbeit in [Make-or-buy und Lizenzplanung](/leistungen/make-or-buy-lizenzen/), auf Kundenseite und ohne eigenes Interesse am Abschluss. Bringen Sie zum ersten Gespräch Ihren Verbrauchsplan und, falls vorhanden, das schriftliche AELA-Angebot mit, dann rechnen wir beide Wege für Ihre Agenten nebeneinander.
