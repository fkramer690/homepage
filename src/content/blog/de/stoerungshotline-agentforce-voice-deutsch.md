---
title: "Störungshotline mit Agentforce Voice: erst die Triage"
description: "Agentforce Voice spricht jetzt Deutsch. Wie Triage und Entitlements entscheiden, was ein Sprachagent an der Störungshotline bucht, und was ein Anruf kostet."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: stoerungshotline-agentforce-voice-deutsch
translationKey: breakdown-hotline-voice-agent
topic: field-service
categories: [field-service, ai]
tags: [Agentforce Voice, Field Service, Außendienst, Störungshotline, Entitlements, Flex Credits]
takeaways:
  - "Rufnummer, Kontakt und installierte Anlagen liefern mögliche Maschinen; der Anrufer bestätigt sie, bevor der Agent einen Fall anlegt oder bucht."
  - "Selbst bucht der Agent nur, wenn die Maschine läuft, der Vertrag den Einsatz abdeckt und die Fehlerklasse bekannt ist. Stillstände übernimmt die Disposition."
  - "Entitlement-Prüfung und Buchungssperre gehören in Agent-Script-Bedingungen, damit nie das LLM entscheidet, was der Vertrag zusagt."
  - "Ein Anruf mit vier Sprachaktionen kostet 120 Flex Credits, also 0,60 €. Mit Agentforce Voice Minutes sind es 60 Credits pro Minute."
faq:
  - q: "Unterstützt Agentforce Voice Deutsch?"
    a: "Ja. Die Dreamforce-2026-Ankündigungen von Salesforce führen Deutsch als eine von sechs neuen Sprachen für Agentforce Voice mit dem Status GA. Testen Sie trotzdem mit echten Anrufen Ihrer Kunden, inklusive Hallenlärm und Dialekt."
  - q: "Kann ein Agentforce-Voice-Agent selbst einen Außendiensttechniker buchen?"
    a: "Ja, unter Bedingungen. Die Salesforce-Hilfe dokumentiert die sprachgesteuerte Terminbuchung für Field Service mit Foundations, eingerichtetem Autonomous Scheduling, Partner-Telefonie und Omni-Channel. Gastbenutzer werden nicht unterstützt, und der Agent verifiziert per E-Mail an den Kontakt, den er über die Rufnummer findet; die Kontakte der Instandhalter müssen also gepflegt sein. Bei Störungen würde ich den Agenten nur einen Termin buchen lassen, wenn die Maschine noch läuft, das Entitlement den Einsatz abdeckt und der Fehler klassifiziert ist."
  - q: "Was kostet ein Anruf mit Agentforce Voice?"
    a: "Eine Sprachaktion kostet 30 Flex Credits, ein Anruf mit vier Aktionen also 120 Credits, beim EU-Listenpreis von 500 € je 100.000 Credits 0,60 €, mit sechs Aktionen 0,90 €. Wer Agentforce Voice Minutes nutzt, zahlt stattdessen 60 Credits pro Minute, bei fünf Minuten 1,50 €. Telefonie und Sprachlizenzen der Disponenten kosten extra."
  - q: "Was passiert, wenn der Sprachagent an einen Menschen übergibt?"
    a: "Laut Salesforce behält die native Telefonie mit Salesforce Voice das vollständige Gesprächsprotokoll und den Sitzungskontext auch bei Weiterleitungen. Die Disposition sieht also, was der Anrufer schon gesagt hat. Die Übergabe in Agent Script braucht eine aktive Omni-Channel-Verbindung."
  - q: "Sollte der Sprachagent Seriennummern abfragen?"
    a: "Nur als Rückfalllösung. Suchen Sie über Rufnummer, Kontakt, Account und installierte Anlagen nach Kandidaten, lassen Sie Standort und Maschinentyp bestätigen, und lassen Sie den Agenten eine gesprochene Seriennummer zurücklesen und vom Anrufer bestätigen, weil die Spracherkennung Codes oft falsch versteht."
draft: false
---

Ein Maschinenbauer kann seine Störungshotline mit einem Sprachagenten aus Agentforce Voice besetzen, seit Salesforce Deutsch als allgemein verfügbar führt. Ich würde dem Agenten aber zuerst Annahme und Triage überlassen und erst später die Terminbuchung. Er erkennt Anrufer und Maschine, fragt nach dem Stillstand und prüft die Vertragsdeckung in fester Logik. Selbst bucht er einen Techniker nur, wenn die Maschine noch läuft, der Vertrag den Einsatz abdeckt und die Fehlerklasse bekannt ist. Stillstände mit zugesagter Reaktionszeit übergibt er mit fertig angelegtem Fall an die Disposition. Pro Anruf rechne ich je nach Aktionen oder Minuten mit 0,60 € bis 1,80 € an Flex Credits.

## Was ändert sich für eine deutschsprachige Störungshotline?

In den [Dreamforce-2026-Ankündigungen](https://www.salesforce.com/blog/dreamforce-2026-announcements/) vom 28. September führt Salesforce sechs neue Sprachen für Agentforce Voice auf, darunter Deutsch, mit dem Status GA. Die [Produktseite von Agentforce Voice](https://www.salesforce.com/agentforce/voice/) nennt das Produkt „GA in all regions“. Vorher war Deutsch nicht allgemein verfügbar.

Für den Aufbau der Hotline zählen diese Fakten zur Plattform:

- **Telefonie.** Laut [Salesforce-Developer-Blog](https://developer.salesforce.com/blogs/2026/10/agentforce-voice-for-agent-script-voice-enabling-best-practices) läuft Agentforce Voice auf Salesforce Voice with Telephony Providers, früher Service Cloud Voice. [Trailhead](https://trailhead.salesforce.com/de/content/learn/modules/agentforce-voice-quick-look/meet-agentforce-voice) nennt zwei Wege: native Telefonie mit Salesforce Voice oder Ihren bestehenden Telefonieanbieter.
- **Übergabe.** Der native Weg behält laut derselben Trailhead-Einheit vollständige Gesprächsprotokolle und den Sitzungskontext während der gesamten Interaktion bei, auch bei Weiterleitungen. Die Disposition erhält Protokoll und Kontext; kritische Kennungen muss sie unter Umständen trotzdem bestätigen lassen.
- **Buchung per Telefon.** Die [Winter-'27-Highlights](https://trailhead.salesforce.com/de/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) führen Autonomous Scheduling with Agentforce Voice für Field Service. Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_agentforce_autonomous_scheduling_customer_initiated_create_agent_voice_studio.htm&language=en_US&type=5) beschreibt die Einrichtung: Field Service mit Foundations, Autonomous Scheduling, Partner-Telefonie und ein Omni-Channel-Flow für die Übergabe. Gastbenutzer werden nicht unterstützt, und der Agent verifiziert den Anrufer per E-Mail an den Kontakt, den er über dessen Rufnummer findet.

Die Beispiele von Salesforce drehen sich um geplante Termine: Die [Winter-'27-Ankündigung](https://salesforce.com/news/stories/winter-2027-product-release-announcement) verspricht, „15-minute booking calls“ auf Sekunden zu verkürzen. Ein Störungsanruf ist die schwierigere Aufgabe. Den allgemeinen Serviceagenten beschreibe ich in [Casey und der Service Rep Assistant](../service-cloud-casey-und-service-rep-assistant/).

## Ein Störungsanruf ist schwieriger als eine Terminbuchung

Am Telefon ist meist ein Instandhalter, der in einer lauten Halle neben einer stillstehenden Linie steht. Er will einen Techniker, kein Menü. Vier Angaben entscheiden über den nächsten Schritt, doch der Anrufer liefert sie selten in einer Form, die ein System verarbeiten kann:

- **Welche Maschine.** Seriennummern sind lang und alphanumerisch. Der Developer-Blog warnt, dass Spracherkennung Fachbegriffe falsch versteht, und der [Agentforce-Voice-Leitfaden](https://www.salesforce.com/agentforce/voice/agentforce-voice-guide-full/) von Salesforce rät, im Test vor dem Start zu prüfen, wie der Agent Produktkennungen und Zahlencodes ausspricht. Rufnummer, Kontakt, Account und installierte Anlagen würde ich nur zur Kandidatensuche nutzen, denn eine Werksnummer oder das Handy eines Fremddienstleisters kann mehrere Standorte abdecken. Der Anrufer bestätigt Standort und Maschinentyp, bevor der Agent einen Fall anlegt oder bucht, und nennt die Seriennummer, wenn der Account mehrere Maschinen dieses Typs hat.
- **Stillstand oder Betrieb.** „Sie macht ein komisches Geräusch, wir haben sie abgeschaltet“ kann beides heißen. Das LLM sollte das nicht aus einer Erzählung ableiten. Der Agent stellt eine geschlossene Frage, „Steht die Maschine gerade still?“, und speichert die Antwort in einer Variablen.
- **Was der Vertrag zusagt.** Das sind drei Prüfungen: Ist der Kunde supportberechtigt, deckt der Vertrag diese Anlage und Leistung ab, und welche Reaktionszeit gilt? Im [Entitlement Management von Salesforce](https://help.salesforce.com/s/articleView?id=service.entitlements_overview.htm&language=en_US&type=5) hängen Entitlements an Accounts, Anlagen und Service Contracts, und die Reaktionszeit ist ein Milestone im Entitlement-Prozess, der innerhalb der Geschäftszeiten läuft. Wie man das modelliert, steht in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/).
- **Sicherheit.** Verletzte, Brand, austretendes Medium: Der Agent fragt nur nach einer Rückrufnummer und leitet sofort weiter. Nimmt niemand an, nennt er die Notrufnummer, legt einen Fall mit höchster Priorität an und alarmiert die Rufbereitschaft.

## Wie entscheidet die Triage, was der Agent selbst bucht?

Mit diesen Regeln würde ich starten. Jede Zeile ist ein Zweig in der Logik, keine Anweisung im Prompt.

| Lage im Gespräch | Was der Agent tut | Wer entscheidet |
|---|---|---|
| Sicherheitsthema | Leitet sofort weiter | Mensch |
| Anrufer oder Maschine unklar | Leitet mit den bereits erfassten Angaben weiter | Disposition |
| Stillstand, Entitlement mit Reaktionszeit | Legt einen Fall mit hoher Priorität und Entitlement an der Anlage an, damit der Entitlement-Prozess den Milestone startet, verbindet live | Disposition |
| Stillstand, Vertragsdeckung nicht bestätigt | Legt einen Fall an, sagt, dass Kosten nach Prüfung anfallen können, verbindet oder vereinbart Rückruf | Disposition |
| Maschine läuft eingeschränkt, Entitlement gültig, Fehlerklasse bekannt | Bucht einen Termin aus der Field-Service-Planung, der den Milestone einhält | Agent |
| Maschine läuft, Fehler unklar | Legt einen Fall an, vereinbart Rückruf durch einen Servicetechniker | Servicetechniker |
| Frage zu Handbuch, Ersatzteil oder Auftragsstatus | Antwortet oder legt einen Fall an | Agent |

Warum soll der Agent Stillstände nicht auch selbst buchen? Eine stehende Presse mit vier Stunden Reaktionszeit kann bedeuten, einen Techniker aus einer Wartung abzuziehen. Diese Abwägung braucht den Tagesplan und einen Menschen, der den anderen Kunden anruft. Ist der Fehler unklar, kann der Rückruf des Servicetechnikers ein Videoanruf sein: Mit [Visual Remote Assistance](../visual-remote-assistant-fernhilfe-statt-einsatz/) sieht er die Maschine, bevor jemand losfährt.

In Agent Script gibt es die Bausteine dafür. Das [Fetch-Data-Muster](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-fetch-data.html) führt Aktionen aus, „to retrieve data before the LLM begins reasoning“; Anlage und Entitlement liegen also vor, bevor das Modell spricht. [Bedingungen](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html) werden laut Doku ausgewertet, bevor der Prompt das LLM erreicht. Mit [available when](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering) ist die Buchungsaktion für das LLM „completely hidden“, solange gültiges Entitlement, laufende Maschine und bekannte Fehlerklasse nicht zusammen vorliegen. Die Sperre hängt an diesen Variablen: Die Vertragsdeckung stammt aus Systemdaten, der Maschinenstatus aus einer geschlossenen Frage, die der Anrufer bestätigt, die Fehlerklasse aus einer festen Liste, und alles Unklare heißt: keine Buchung. Die Übergabe erfolgt über [`@utils.escalate`](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html) und braucht eine aktive Omni-Channel-Verbindung. Dem Modell bleibt, was es gut kann: deutsche Sprache verstehen und die nächste Frage stellen. Die Begründung für diese Aufteilung steht in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/).

## Was kostet ein Sprachanruf an der Hotline?

Die [Flex-Credits-Rate-Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 setzt für eine Standard- oder Custom-Sprachaktion 30 Credits in Produktion und 24 in der Sandbox an. Das Sprachbeispiel auf der [EU-Preisseite von Agentforce](https://www.salesforce.com/eu/agentforce/pricing/) rechnet für ein Reservierungsszenario mit vier Sprachaktionen pro Anruf, also 120 Credits; ein Störungsanruf mit sechs Aktionen braucht 180. Beim Listenpreis von 500 € je 100.000 Credits sind das 0,60 € und 0,90 € pro Anruf.

Eine Fußnote der Rate Card sagt, dass für bestimmte Kunden stattdessen die Nutzungsart Agentforce Voice Minutes gilt. Die [ergänzende Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Agentforce-Voice-Minutes-Supplemental-Rate-Card-02.03.2026.pdf) setzt dafür 60 Credits pro Minute an, 48 in der Sandbox. Ein Störungsanruf von fünf Minuten kostet dann 300 Credits oder 1,50 €, einer von sechs Minuten 1,80 €. Wo Voice Minutes gelten, ersetzen sie die Zählung nach Aktionen. Triage-Gespräche dauern oft länger, klären Sie also, welches Abrechnungsmodell Ihr Vertrag nutzt.

```kennzahlen
30 Credits | pro Sprachaktion in Produktion, 24 in der Sandbox
0,60 € | pro Anruf mit vier Sprachaktionen zum EU-Listenpreis
60 Credits | pro Minute bei Agentforce Voice Minutes, 48 in der Sandbox
quelle: Salesforce Flex Credits Rate Card vom 03.11.2026, ergänzende Rate Card Agentforce Voice Minutes,
  EU-Preisseite von Agentforce
```

```hinweis offen
Die Rate Card führt Speech to Text mit 150 Credits pro Stunde Transkription. Ob ein Anruf beim Sprachagenten das zusätzlich auslöst, steht dort nicht, und auch auf keiner anderen Salesforce-Seite habe ich eine Antwort gefunden.

Ebenso offen ist, ob Disponenten, die weitergeleitete Anrufe annehmen, einen eigenen Salesforce-Voice-Arbeitsplatz brauchen. Ich würde sie einplanen und mir beides vor der Unterschrift bestätigen lassen.
```

Für diese Arbeitsplätze nennt die [Preisseite von Salesforce Voice](https://www.salesforce.com/eu/service/call-center-integration/voice-pricing/) Contact Centre mit 125 € pro Nutzer und Monat inklusive unbegrenzter Plattform-Sprachminuten oder Partner Contact Centre mit 50 €, wenn Sie Ihren Telefonieanbieter behalten.

Wie man Kosten pro Aktion grundsätzlich schätzt, steht in [Agentforce-Kosten für Hersteller](../flex-credits-agentforce-kosten-pro-aktion/).

## Rechenbeispiel: 400 Hotline-Anrufe im Monat

Nehmen wir einen Maschinenbauer, der SAP, Service Cloud und Field Service betreibt, 1.200 Maschinen unter Vertrag hat und eine Hotline nutzt, die zwei Disponenten von 7 bis 17 Uhr besetzen. Außerhalb dieser Zeit nimmt ein Bereitschaftstechniker jeden Anruf an; wie Sie diese Schichten in Field Service planen, steht in [Bereitschaftsdienst im Field Service](../field-service-bereitschaft-schichten/). Alle Zahlen sind Annahmen.

Angenommen, es gibt 400 Anrufe im Monat: 120 Stillstände, 160 Maschinen mit Einschränkung, 120 Fragen. Jeder Anruf braucht etwa sechs Sprachaktionen: Anrufer erkennen, Anlage finden, Entitlement prüfen, Fall anlegen, Termine suchen oder den Anruf weiterleiten, bestätigen.

- **Credits nach Sprachaktionen.** 400 × 6 × 30 = 72.000 Credits, rund 360 € im Monat oder 0,90 € pro Anruf.
- **Credits nach Voice Minutes.** Bei fünf Minuten pro Anruf 400 × 5 × 60 = 120.000 Credits, rund 600 € im Monat oder 1,50 € pro Anruf.
- **Was der Agent bucht.** Von den 160 Anrufen mit Einschränkung haben der Annahme nach 100 ein gültiges Entitlement und eine bekannte Fehlerklasse. Sobald die Buchung freigeschaltet ist, bucht der Agent diese Einsätze selbst; der Rest wird als Fall an einen Menschen übergeben.
- **Was die Disposition gewinnt.** Angenommen sind heute acht Minuten Annahme pro Anruf, ein Ausgangswert von rund 53 Stunden im Monat. Die Einsparung ergibt sich aus dem Teil davon, den der Agent abschließt oder vorbereitet, abzüglich Übergabe und Prüfung. Die 120 Stillstände bearbeitet weiterhin ein Mensch, aber mit Anlage, Entitlement und laufendem Milestone im Fall.

Unter diesen Annahmen sind die Flex Credits nicht der größte Kostentreiber; Sprachlizenzen, Telefonie und Umsetzung wiegen mehr. Der Gewinn liegt in der Nacht: Der Bereitschaftstechniker erhält einen klassifizierten Fall statt eines rohen Anrufs.

## Das muss stehen, bevor der Agent ans Telefon geht

1. **Rufnummern an Kontakten und saubere Anlagen.** Ohne sie wird jeder Anruf zur Weiterleitung, und bei doppelt angelegten Maschinen wählt der Agent die falsche.
2. **Entitlements als Datensätze.** Liegen die Verträge in SAP, replizieren Sie die Reaktionszeiten nach Salesforce. Der Agentforce-Voice-Leitfaden nennt einen „2-second action latency benchmark“, und eine Live-Abfrage im ERP während des Gesprächs gefährdet dieses Ziel.
3. **Fehlerklassen.** Die Buchungssperre braucht eine kurze Liste von Klassen, für die ein Techniker planen kann.
4. **Tests auf Deutsch mit echtem Ton.** Salesforce führt Voice and Conversation Testing in den Dreamforce-Ankündigungen als Beta. Nehmen Sie Testanrufe mit Hallenlärm und Dialekt auf. Sprachaktionen kosten in der Sandbox 24 Credits; wie das Beta-Testwerkzeug abgerechnet wird, habe ich in keiner Salesforce-Quelle gefunden, fragen Sie also nach. Mehr in [Agentforce-Agenten testen](../agentforce-agenten-testen-freigeben/).
5. **Datenschutz und Kennzeichnung.** Trailhead nennt Richtlinien zur Null-Datenspeicherung bei OpenAI, Deepgram und ElevenLabs. Das deckt nur die Modellanbieter ab: Aufbewahrung von Protokollen und Aufnahmen in Salesforce, Zugriffsrechte und die Einbindung des Betriebsrats brauchen eine eigene Entscheidung. Die Begrüßung sollte sagen, dass eine KI antwortet; die rechtliche Seite steht in [EU AI Act: Was die neuen Fristen für Agentforce bedeuten](../eu-ai-act-fristen-agentforce/).

## Erster Schritt: vier Wochen nachts nur Triage

Wie sich das zwischen den anderen Außendienst-Agenten einordnet, beschreibe ich in [KI-Agenten im Außendienst: Was Field Service heute kann](../ki-agenten-aussendienst-field-service/), die Lizenzseite gehört zu [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/). Den Sprachagenten selbst würde ich in drei Stufen einführen:

```schritte
Nachts nur Triage | 4 Wochen
  Der Agent übernimmt außerhalb der Geschäftszeiten Annahme und Triage, ohne Buchung. Vergleichen Sie seine Einstufung mit dem Urteil des Bereitschaftstechnikers.
Buchung bei Einschränkung
  Schalten Sie die Buchung für die Zeile „läuft eingeschränkt“ frei.
Buchung tagsüber
  Erst danach geben Sie die Buchung auch für Anrufe während der Geschäftszeiten frei.
```
