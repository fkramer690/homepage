---
title: "Störungshotline mit Agentforce Voice: erst die Triage"
description: "Agentforce Voice spricht jetzt Deutsch. Wie Triage und Entitlements entscheiden, was ein Sprachagent an der Störungshotline bucht, und was ein Anruf kostet."
pubDate: 2026-10-27
lang: de
slug: stoerungshotline-agentforce-voice-deutsch
translationKey: breakdown-hotline-voice-agent
topic: field-service
categories: [field-service, ai]
tags: [Agentforce Voice, Field Service, Außendienst, Störungshotline, Entitlements, Flex Credits]
takeaways:
  - "Salesforce führt Deutsch seit der Dreamforce 2026 als allgemein verfügbare Sprache von Agentforce Voice, damit ist ein Sprachagent an einer deutschsprachigen Störungshotline technisch möglich."
  - "An der Störungshotline sollte der Sprachagent zuerst Annahme und Triage übernehmen: Anrufer und Maschine erkennen, nach dem Stillstand fragen, das Entitlement prüfen, den Fall anlegen."
  - "Selbst bucht der Agent einen Techniker nur, wenn die Maschine noch läuft, das Entitlement den Einsatz abdeckt und die Fehlerklasse bekannt ist; Stillstände mit Reaktionszeit gehen an die Disposition."
  - "Entitlement-Prüfung und Buchungssperre gehören in deterministische Logik, etwa Agent-Script-Bedingungen und available when, damit nie das LLM entscheidet, was der Vertrag zusagt."
  - "Ein Anruf kostet mit vier Sprachaktionen 120 Flex Credits, also 0,60 €, oder bei Verträgen mit Agentforce Voice Minutes 60 Credits (0,30 €) pro Minute, jeweils zum Listenpreis."
faq:
  - q: "Unterstützt Agentforce Voice Deutsch?"
    a: "Ja. Die Dreamforce-2026-Ankündigungen von Salesforce führen Deutsch unter sechs neuen Sprachen von Agentforce Voice mit dem Status GA. Testen Sie trotzdem mit echten Anrufen Ihrer Kunden, inklusive Hallenlärm und Dialekt."
  - q: "Kann ein Agentforce-Voice-Agent selbst einen Außendiensttechniker buchen?"
    a: "Ja, Salesforce führt Autonomous Scheduling with Agentforce Voice in den Winter-'27-Highlights. Bei Störungen würde ich ihn nur buchen lassen, wenn die Maschine noch läuft, das Entitlement den Einsatz abdeckt und der Fehler klassifiziert ist."
  - q: "Was kostet ein Anruf mit Agentforce Voice?"
    a: "Eine Sprachaktion kostet 30 Flex Credits, ein Anruf mit vier Aktionen also 120 Credits, beim EU-Listenpreis von 500 € je 100.000 Credits 0,60 €. Wer Agentforce Voice Minutes gekauft hat, zahlt stattdessen 60 Credits pro Minute. Telefonie und Sprachlizenzen der Disponenten kommen dazu."
  - q: "Was passiert, wenn der Sprachagent an einen Menschen übergibt?"
    a: "Laut Salesforce behält die native Telefonie mit Salesforce Voice das vollständige Gesprächsprotokoll und den Sitzungskontext auch bei Weiterleitungen. Die Disposition sieht also, was der Anrufer schon gesagt hat. Die Übergabe in Agent Script braucht eine aktive Omni-Channel-Verbindung."
  - q: "Sollte der Sprachagent Seriennummern abfragen?"
    a: "Nur als Rückfalllösung. Erkennen Sie die Maschine zuerst über Rufnummer, Kontakt, Account und installierte Anlagen, und lassen Sie eine gesprochene Seriennummer vorlesen und bestätigen, weil Spracherkennung Codes oft falsch versteht."
draft: false
---

Ein Maschinenbauer kann seine Störungshotline mit einem Sprachagenten aus Agentforce Voice besetzen, seit Salesforce Deutsch als allgemein verfügbar führt. Ich würde dem Agenten aber zuerst Annahme und Triage überlassen und erst später den Kalender. Er erkennt Anrufer und Maschine, fragt nach dem Stillstand und prüft das Entitlement in fester Logik. Selbst bucht er einen Techniker nur, wenn die Maschine noch läuft, der Vertrag den Einsatz abdeckt und die Fehlerklasse bekannt ist. Stillstände mit zugesagter Reaktionszeit gehen mit fertigem Fall an die Disposition. Pro Anruf rechne ich mit 0,60 € bis 1,80 € an Flex Credits.

## Was ändert sich für eine deutschsprachige Störungshotline?

In den [Dreamforce-2026-Ankündigungen](https://www.salesforce.com/blog/dreamforce-2026-announcements/) vom 28. September führt Salesforce sechs neue Sprachen für Agentforce Voice auf, darunter Deutsch, mit dem Status GA. Die [Produktseite von Agentforce Voice](https://www.salesforce.com/agentforce/voice/) nennt das Produkt „GA in all regions“. Vorher sprach Agentforce Voice kein Deutsch.

Für den Aufbau der Hotline zählen diese Fakten zur Plattform:

- **Telefonie.** Laut [Salesforce-Developer-Blog](https://developer.salesforce.com/blogs/2026/10/agentforce-voice-for-agent-script-voice-enabling-best-practices) läuft Agentforce Voice auf Salesforce Voice with Telephony Providers, früher Service Cloud Voice. [Trailhead](https://trailhead.salesforce.com/de/content/learn/modules/agentforce-voice-quick-look/meet-agentforce-voice) nennt zwei Wege: native Telefonie mit Salesforce Voice oder Ihren bestehenden Telefonieanbieter.
- **Übergabe.** Der native Weg behält laut derselben Trailhead-Einheit vollständige Gesprächsprotokolle und den Sitzungskontext während der gesamten Interaktion bei, auch bei Weiterleitungen. Die Disposition muss die Seriennummer nicht noch einmal abfragen.
- **Buchung per Telefon.** Die [Winter-'27-Highlights](https://trailhead.salesforce.com/de/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) führen Autonomous Scheduling with Agentforce Voice für Field Service. Einen Status nennen sie nicht, prüfen Sie die Verfügbarkeit in Ihrer Org.

Die Beispiele von Salesforce sind geplante Termine: Die [Winter-'27-Ankündigung](https://salesforce.com/news/stories/winter-2027-product-release-announcement) verspricht, „15-minute booking calls“ auf Sekunden zu verkürzen. Ein Störungsanruf ist die schwierigere Aufgabe. Den allgemeinen Serviceagenten beschreibe ich in [Casey und der Service Rep Assistant](../service-cloud-casey-und-service-rep-assistant/).

## Warum ist ein Störungsanruf schwieriger als eine Terminbuchung?

Am Telefon ist meist ein Instandhalter, der neben einer stehenden Linie in einer lauten Halle steht. Er will einen Techniker, kein Menü. Vier Dinge entscheiden über den nächsten Schritt, und keines davon sagt der Anrufer in einer Form, mit der ein System arbeiten kann:

- **Welche Maschine.** Seriennummern sind lang und alphanumerisch. Der Developer-Blog warnt, dass Spracherkennung Fachbegriffe falsch versteht, und der [Agentforce-Voice-Leitfaden](https://www.salesforce.com/agentforce/voice/agentforce-voice-guide-full/) von Salesforce rät, im Test vor dem Start zu prüfen, wie der Agent Produktkennungen und Zahlencodes ausspricht. Ich würde die Maschine über Rufnummer, Kontakt, Account und installierte Anlagen bestimmen und die Seriennummer nur abfragen, wenn der Account mehrere Maschinen dieses Typs hat.
- **Stillstand oder Betrieb.** „Sie macht ein komisches Geräusch, wir haben sie abgeschaltet“ kann beides heißen. Das LLM sollte das nicht aus einer Erzählung ableiten. Der Agent stellt eine geschlossene Frage, „Steht die Maschine gerade still?“, und speichert die Antwort in einer Variablen.
- **Was der Vertrag zusagt.** Die Reaktionszeit steht im Entitlement. Laut [Salesforce Ben](https://www.salesforceben.com/complete-guide-to-salesforce-entitlements-and-milestones-in-service-cloud/) lassen sich Entitlements mit Accounts, Anlagen, Fällen und Service Contracts verknüpfen, und Milestones laufen innerhalb der Geschäftszeiten ab. Wie man das modelliert, steht in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/).
- **Sicherheit.** Verletzte, Brand, austretendes Medium: Der Agent leitet sofort weiter und fragt nur nach einer Rückrufnummer.

## Wie entscheidet die Triage, was der Agent selbst bucht?

Mit diesen Regeln würde ich starten. Jede Zeile ist ein Zweig in der Logik, keine Anweisung im Prompt.

| Lage im Gespräch | Was der Agent tut | Wer entscheidet |
|---|---|---|
| Sicherheitsthema | Leitet sofort weiter | Mensch |
| Anrufer oder Maschine unklar | Leitet mit dem Bekannten weiter | Disposition |
| Stillstand, Entitlement mit Reaktionszeit | Legt einen Fall mit hoher Priorität an der Anlage an, startet den Milestone, verbindet live | Disposition |
| Stillstand, kein gültiges Entitlement | Legt einen Fall an, sagt, dass der Einsatz kostenpflichtig ist, verbindet oder vereinbart Rückruf | Disposition |
| Maschine läuft eingeschränkt, Entitlement gültig, Fehlerklasse bekannt | Bucht einen Technikertermin innerhalb der Zeiten des Entitlements | Agent |
| Maschine läuft, Fehler unklar | Legt einen Fall an, vereinbart Rückruf durch einen Servicetechniker | Servicetechniker |
| Frage zu Handbuch, Ersatzteil oder Auftragsstatus | Antwortet oder legt einen Fall an | Agent |

Warum soll der Agent Stillstände nicht auch selbst buchen? Eine stehende Presse mit vier Stunden Reaktionszeit kann bedeuten, einen Techniker aus einer Wartung abzuziehen. Diese Abwägung braucht den Tagesplan und einen Menschen, der den anderen Kunden anruft.

In Agent Script gibt es die Bausteine dafür. Das [Fetch-Data-Muster](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-fetch-data.html) führt Aktionen aus, „to retrieve data before the LLM begins reasoning“, Anlage und Entitlement liegen also vor, bevor das Modell spricht. [Bedingungen](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html) werden laut Doku ausgewertet, bevor der Prompt das LLM erreicht. Mit [available when](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering) ist die Buchungsaktion für das LLM „completely hidden“, solange nicht gültiges Entitlement, laufende Maschine und bekannte Fehlerklasse zusammen zutreffen. Die Übergabe läuft über [`@utils.escalate`](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html) und braucht eine aktive Omni-Channel-Verbindung. Dem Modell bleibt, was es gut kann: deutsche Sprache verstehen und die nächste Frage stellen. Die Begründung für diese Aufteilung steht in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/).

## Was kostet ein Sprachanruf an der Hotline?

Die [Flex-Credits-Rate-Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) vom 31. August 2026 setzt für eine Standard- oder Custom-Sprachaktion 30 Credits in Produktion und 24 in der Sandbox an. Das Sprachbeispiel auf der [EU-Preisseite von Agentforce](https://www.salesforce.com/eu/agentforce/pricing/) rechnet mit vier Sprachaktionen pro Anruf, also 120 Credits. Beim Listenpreis von 500 € je 100.000 Credits sind das 0,60 € pro Anruf.

Eine Fußnote der Rate Card sagt, dass für bestimmte Kunden stattdessen die Nutzungsart Agentforce Voice Minutes gilt. Die [ergänzende Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Agentforce-Voice-Minutes-Supplemental-Rate-Card-02.03.2026.pdf) setzt dafür 60 Credits pro Minute an, 48 in der Sandbox. Ein Störungsanruf von sechs Minuten kostet dann 360 Credits oder 1,80 €. Triage-Gespräche dauern, fragen Sie also, welches Modell Ihr Vertrag nutzt.

Zwei Punkte sind offen oder kommen dazu:

- **Sprachzähler.** Die Rate Card führt Speech to Text mit 150 Credits pro Stunde Transkription. Ob ein Anruf beim Sprachagenten das zusätzlich auslöst, steht dort nicht, und ich habe keine Salesforce-Seite gefunden, die es sagt. Klären Sie das vor der Unterschrift.
- **Telefonie und Arbeitsplätze.** Ich habe keine Salesforce-Seite gefunden, die sagt, ob Disponenten, die weitergeleitete Anrufe annehmen, einen eigenen Salesforce-Voice-Arbeitsplatz brauchen. Ich würde damit planen und nachfragen. Die [Preisseite von Salesforce Voice](https://www.salesforce.com/eu/service/call-center-integration/voice-pricing/) nennt Contact Centre mit 125 € pro Nutzer und Monat inklusive unbegrenzter Plattform-Sprachminuten oder Partner Contact Centre mit 50 €, wenn Sie Ihren Telefonieanbieter behalten.

Wie man Kosten pro Aktion grundsätzlich schätzt, steht in [Flex Credits: Agentforce-Kosten pro Aktion schätzen](../flex-credits-agentforce-kosten-pro-aktion/).

## Ein typisches Szenario: 400 Hotline-Anrufe im Monat

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud und Field Service im Betrieb, 1.200 Maschinen unter Vertrag und einer Hotline, die zwei Disponenten von 7 bis 17 Uhr besetzen. Außerhalb dieser Zeit nimmt ein Bereitschaftstechniker jeden Anruf an; wie Sie diese Schichten in Field Service planen, steht in [Bereitschaftsdienst im Field Service](../field-service-bereitschaft-schichten/). Alle Zahlen sind Annahmen.

Angenommen sind 400 Anrufe im Monat: 120 Stillstände, 160 Maschinen mit Einschränkung, 120 Fragen. Jeder Anruf braucht etwa sechs Sprachaktionen: Anrufer erkennen, Anlage finden, Entitlement prüfen, Fall anlegen, Termine suchen oder weiterleiten, bestätigen.

- **Credits nach Sprachaktionen.** 400 × 6 × 30 = 72.000 Credits, rund 360 € im Monat.
- **Credits nach Voice Minutes.** Bei fünf Minuten pro Anruf 400 × 5 × 60 = 120.000 Credits, rund 600 € im Monat.
- **Was der Agent bucht.** Von den 160 Anrufen mit Einschränkung haben angenommen 100 ein gültiges Entitlement und eine bekannte Fehlerklasse. Sobald die Buchung freigeschaltet ist, bucht der Agent diese; der Rest geht als Fall an einen Menschen.
- **Was die Disposition gewinnt.** Angenommen sind heute acht Minuten Annahme pro Anruf, rund 53 Stunden im Monat. Die 120 Stillstände landen weiter bei einem Menschen, aber mit Anlage, Entitlement und laufendem Milestone im Fall.

Die Credits sind in beiden Modellen klein. Der Gewinn liegt in der Nacht: Der Bereitschaftstechniker bekommt einen klassifizierten Fall statt eines rohen Anrufs.

## Was muss stehen, bevor der Agent ans Telefon geht?

1. **Rufnummern an Kontakten und saubere Anlagen.** Ohne sie wird jeder Anruf zur Weiterleitung, und bei doppelt angelegten Maschinen wählt der Agent die falsche.
2. **Entitlements als Datensätze.** Liegen die Verträge in SAP, replizieren Sie die Reaktionszeiten nach Salesforce. Der Agentforce-Voice-Leitfaden nennt einen „2-second action latency benchmark“, und eine Live-Abfrage im ERP während des Gesprächs gefährdet ihn.
3. **Fehlerklassen.** Die Buchungssperre braucht eine kurze Liste von Klassen, für die ein Techniker planen kann.
4. **Tests auf Deutsch mit echtem Ton.** Salesforce führt Voice and Conversation Testing in den Dreamforce-Ankündigungen als Beta. Nehmen Sie Testanrufe mit Hallenlärm und Dialekt auf und planen Sie die Testlast mit 24 Credits pro Sprachaktion ein, wie in [Agentforce-Agenten testen](../agentforce-agenten-testen-freigeben/) beschrieben.
5. **Datenschutz und Kennzeichnung.** Trailhead nennt Vereinbarungen zur Null-Datenspeicherung mit OpenAI, Deepgram und ElevenLabs. Die Begrüßung sollte trotzdem sagen, dass eine KI antwortet; die rechtliche Seite steht in [EU AI Act: Was die neuen Fristen für Agentforce bedeuten](../eu-ai-act-fristen-agentforce/).

## Wo fangen Sie an?

Setzen Sie den Sprachagenten zuerst außerhalb der Geschäftszeiten ein, nur für Annahme und Triage, ohne Buchung. Vergleichen Sie vier Wochen lang seine Einstufung mit dem Urteil des Bereitschaftstechnikers. Dann schalten Sie die Buchung für die Zeile „läuft eingeschränkt“ frei und erst danach für Anrufe tagsüber. Wo das zwischen den anderen Außendienst-Agenten steht, beschreibe ich in [KI-Agenten im Außendienst: Was Field Service heute kann](../ki-agenten-aussendienst-field-service/), die Lizenzseite gehört zu [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Ein Sprachagent an der Störungshotline lohnt sich, wenn er der Disposition einen klassifizierten Fall übergibt und die Entscheidung über Stillstände bei ihr lässt. Wenn Sie die Triage-Regeln für Ihre Hotline durchgehen möchten, [schreiben Sie mir](#contact).
