---
title: "Einstein Bot auf Agentforce umstellen oder Menü behalten?"
description: "Soll der Einstein Bot im Händlerportal ein Agentforce Service Agent werden? Was Upgrade Agent leistet, was sich bei Kosten und Tests ändert, was Menü bleibt."
pubDate: 2026-10-27
lang: de
slug: einstein-bots-agentforce-umstellen
translationKey: einstein-bots-to-agentforce
topic: service
categories: [ai]
tags: [Einstein Bots, Agentforce, Service Cloud, Händlerportal, Flex Credits, Maschinenbau]
takeaways:
  - "Upgrade Agent, vorgestellt auf der Dreamforce 2026, baut aus einem Einstein Bot einen Agentforce Service Agent, während der Bot weiterläuft; das Werkzeug liegt in Agentforce Labs, laut Salesforce experimentell."
  - "Ein Abschaltdatum für Einstein Bots habe ich auf den Salesforce-Seiten nicht gefunden, die Umstellung ist also eine fachliche Entscheidung; der alte Chat dagegen sollte am 14. Februar 2026 enden."
  - "Bot-Gespräche steckten als Kontingent in der Lizenz; ein Agent rechnet nach Verbrauch ab, mit 20 Flex Credits (0,10 €) pro Aktion oder 2 € pro Gespräch, und beides zusammen in einer Org unterstützt Salesforce nicht."
  - "Im Szenario braucht ein Agent für alle 4.000 Portalgespräche im Monat rund 2,9 Millionen Credits im Jahr allein für Aktionen, mehr als die 2,75 Millionen pro Org in Service Cloud Max."
  - "Identifikation, Garantieregistrierung, Sicherheitsmeldungen und Abfragen per Auftragsnummer bleiben im Menü oder in fester Logik; der Agent bekommt die Freitextfragen, die der Bot nie verstanden hat."
faq:
  - q: "Kündigt Salesforce die Einstein Bots ab?"
    a: "Auf den Salesforce-Seiten, die ich bis zum 27. Oktober 2026 geprüft habe, steht kein Abschaltdatum für Einstein Bots. Für den alten Chat hatte Salesforce das Ende zum 14. Februar 2026 angekündigt, Bots auf diesem Kanal mussten also auf Messaging for In-App and Web umziehen."
  - q: "Was macht der Agentforce Upgrade Agent?"
    a: "Laut Salesforce wandelt er einen bestehenden Einstein Bot in wenigen Minuten in einen Agentforce Service Agent um, während der Bot weiterläuft. Er läuft in Agentforce Labs, das Salesforce als experimentell und Vorabversion beschreibt; das Ergebnis ist ein Entwurf."
  - q: "Können Einstein Bot und Agentforce-Agent parallel laufen?"
    a: "Ja. Ein Beitrag im Salesforce Developers Blog vom Dezember 2025 beschreibt einen Bot, der Status- und Erfassungsanfragen selbst erledigt und komplexe Fragen über einen Omni-Channel-Flow mit Ausweich-Queue an einen Agentforce Service Agent übergibt."
  - q: "Ist ein Agentforce-Agent teurer als ein Einstein Bot?"
    a: "Pro Gespräch meist ja. Bot-Gespräche waren Teil des Lizenzkontingents, ein Agent verbraucht 20 Flex Credits pro Aktion. Im Szenario kosten drei Aktionen pro Gespräch 0,30 €, und das Jahresvolumen übersteigt das Kontingent einer Max-Edition."
  - q: "Wie teste ich einen umgestellten Agenten?"
    a: "Nutzen Sie die Beispielsätze, mit denen die Intents des Bots trainiert wurden, und die Protokolle gescheiterter Bot-Gespräche als Testfälle. Lassen Sie den Satz mehrmals laufen und vereinbaren Sie die Bestehensquote vor dem Go-live mit der Serviceleitung."
draft: false
---

Stellen Sie einen Einstein Bot nur dort auf Agentforce um, wo Kunden Fragen eintippen, die der Bot nie verstanden hat, und lassen Sie kurze, regelgebundene Pfade im Menü. Der Upgrade Agent, vorgestellt auf der Dreamforce 2026, baut aus Ihrem Bot in Minuten einen Agentforce Service Agent, während der Bot weiterläuft. Er ist aber ein Labs-Werkzeug, und sein Ergebnis ist ein Entwurf. Die größeren Änderungen liegen drumherum: Kosten wandern vom Lizenzkontingent zu Flex Credits pro Aktion, aus festen Dialogen wird ein Sprachmodell, das selbst entscheidet, und Tests messen Bestehensquoten statt Klickpfade.

## Müssen Sie Ihren Einstein Bot jetzt ablösen?

Eine Frist habe ich nicht gefunden. Auf den Salesforce-Seiten, die ich bis zum 27. Oktober 2026 geprüft habe, steht für Einstein Bots kein Abschaltdatum. Der Druck kam über den Kanal: Laut Entwicklerdokumentation war der alte Chat ["scheduled for retirement on February 14, 2026"](https://developer.salesforce.com/docs/atlas.en-us.live_agent_rest.meta/live_agent_rest), Nachfolger ist Messaging for In-App and Web. Der [Implementierungsleitfaden für kundenseitige Agenten](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/agentforce_implementation_customer.pdf) setzt seinen Beispielagenten auf einen Enhanced Web Chat in einer Experience-Cloud-Site, also genau das Setup vieler Händler- und Kundenportale im Maschinenbau.

Das Werkzeug selbst ist Punkt 20 in Salesforces Liste der [21 Ankündigungen der Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/): "Click Upgrade Agent on Agentforce Labs to convert an existing Einstein Bot into an Agentforce Service Agent." Der neue Agent entstehe in Minuten, "so your current bot keeps running while you review and adjust the upgraded version". Einen Status wie GA oder Beta nennt der Beitrag nicht. Zu [Agentforce Labs](https://www.salesforce.com/agentforce/labs/) schreibt Salesforce: "Everything in Labs is experimental and pre-release." Ich würde das Werkzeug in einer Sandbox laufen lassen und das Ergebnis als ersten Entwurf behandeln. Welche Teile des Bots übernommen werden, etwa Dialoge, Variablen oder Apex-Aktionen, beschreibt keine Seite, die ich öffnen konnte. Prüfen Sie das in Ihrer Org, bevor Sie Aufwand schätzen.

## Was ändert sich im Verhalten, wenn aus dem Bot ein Agent wird?

Ein Einstein Bot folgt einem Drehbuch. Salesforce beschrieb Dialoge als ["the basic 'unit' of conversation"](https://developer.salesforce.com/blogs/2018/06/summer18-einstein-bots-for-the-people), Intents als Beispielsätze je Dialog und Regeln als "conditional engine" für Entscheidungen zur Laufzeit; dazu kommen Menüs mit festen Optionen. Tippt ein Händler etwas, das zu keinem Intent passt, sagt der Bot, dass er nichts verstanden hat, und zeigt wieder das Menü. Lästig, aber sichtbar.

Ein Agentforce Service Agent arbeitet mit Topics, Anweisungen und Aktionen, und ein Sprachmodell wählt die Aktion und formuliert die Antwort. Damit gehen Fragen wie: "Der Spindelmotor an Seriennummer 4711 ist wieder ausgefallen, ist das Teil am Lager und kann diese Woche ein Techniker kommen?" Es ändert aber auch, wie das System scheitert. Ein Agent sagt selten, dass er nichts versteht. Ist der Wissensartikel veraltet oder der Liefertermin aus SAP eine Woche alt, antwortet er flüssig und falsch. Im Maschinenbau sind die teuren Fälle Garantieaussagen, Lieferzusagen und alles, was die Sicherheit berührt.

Zwei Folgen:

- **Folgenreiche Entscheidungen wandern in feste Logik** hinter dem Agenten, etwa Garantieberechtigung oder Kulanzgrenzen. Wie das geht, beschreibe ich in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).
- **Wissen wird ein Produktivsystem.** Ein Bot zeigte den einen Artikel, auf den ein Dialog verwies. Ein Agent liest und formuliert um, was er als Grundlage bekommt. Jedes Handbuch und jeder Artikel braucht deshalb eine verantwortliche Person und ein Prüfdatum.

## Was ändert sich bei den Kosten?

Einstein Bots liefen als Kontingent. Salesforces [Übersicht der Einstein-Funktionen](https://www.salesforce.com/en-ca/wp-content/uploads/sites/4/documents/datasheets/einstein-features-cheat-sheet.pdf), Stand April 2024, nennt 25 Bot-Gespräche pro Nutzer und Monat für Service-Cloud-Lizenzen der Unlimited Edition; die Enterprise Edition bekommt sie nur mit dem Digital-Engagement-Add-on, und zusätzliche Kapazität kostete "100 conversations for $50 per month" (US-Listenpreis).

Agentforce rechnet nach Verbrauch ab. Die [EU-Preisseite für Agentforce](https://www.salesforce.com/eu/agentforce/pricing/) nennt 500 € je 100.000 Flex Credits und 2 € pro Gespräch. Laut Salesforces [Ankündigung vom Mai 2025](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) verbraucht eine Aktion 20 Flex Credits, in Euro also 0,10 €. Die [US-Preisseite](https://www.salesforce.com/agentforce/pricing/) stellt klar, dass Flex Credits und Gesprächsabrechnung "will not be supported in the same org". Prompts und Data-360-Grounding kommen zu den Aktionen hinzu; die Aufschlüsselung steht in [Flex Credits: Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

Es gibt ein drittes Modell. Die [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) führt Help Agent Resolutions mit 400 Credits, und laut [Salesforce-Pressemitteilung vom Juni 2026](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/) fällt keine Gebühr an, wenn der Kunde an einen Menschen übergeben wird. Einen Euro-Preis pro Lösung nennt die EU-Preisseite nicht. Salesforce hat dieses Modell für Help Agent angekündigt, heute Casey, den ich in [Casey und Service Rep Assistant](../service-cloud-casey-und-service-rep-assistant/) beschreibe. Dass es für einen eigenen, aus dem Bot erzeugten Service Agent gilt, habe ich nirgends gefunden.

Die Edition setzt den Rahmen. Die [Service-Cloud-Preisseite](https://www.salesforce.com/service/pricing/) nennt für Max "2.75M Flex Credits per org per year". Dieses Kontingent teilen sich alle Agenten und alle Data-360-Jobs der Org.

## Ein typisches Szenario: Bot im Händlerportal mit 4.000 Gesprächen

Nehmen wir einen Maschinenbauer mit 300 Händlern und Servicepartnern auf einem Experience-Cloud-Portal. Alle Zahlen sind Annahmen zur Veranschaulichung. Ein Einstein Bot führt 4.000 Gespräche im Monat:

| Bot-Pfad | Anteil (angenommen) | Meine Empfehlung |
|---|---|---|
| Auftragsstatus per Auftragsnummer, Abfrage in SAP | 30 % | im Menü lassen |
| Handbücher und Zertifikate per Seriennummer | 15 % | im Menü lassen |
| Garantieregistrierung einer neuen Maschine | 10 % | im Menü lassen |
| Störungsmeldung Maschinenausfall | 10 % | feste Felder erfassen, an Menschen übergeben |
| "Etwas anderes", Freitext | 35 % | auf den Agenten umstellen |

**Variante 1, alles umstellen.** Bei durchschnittlich drei Aktionen pro Gespräch brauchen 4.000 Gespräche 240.000 Credits im Monat, 1.200 € zum Listenpreis, oder 2,88 Millionen Credits im Jahr nur für Aktionen. Das ist mehr als die 2,75 Millionen einer Service-Cloud-Max-Org, und noch ist kein Prompt, kein Grounding und kein Testlauf bezahlt. Bei 2 € pro Gespräch kostet dasselbe Volumen 8.000 € im Monat.

**Variante 2, hybrid.** Der Bot behält die ersten vier Pfade, also 2.600 Gespräche. Die 1.400 Freitextgespräche gehen an den Agenten. Freitext braucht meist mehr Schritte, nehmen wir vier Aktionen an: 112.000 Credits, 560 € im Monat, rund 1,34 Millionen im Jahr. Ich nehme an, dass die Bot-Pfade im bestehenden Lizenzkontingent bleiben. Klären Sie das mit Ihrem Account Executive, denn ein Wechsel auf die neuen Editionen kann daran etwas ändern.

Die Kosten sind das kleinere Argument für Variante 2: Im Freitext scheitert der Bot heute, die Menüpfade funktionieren bereits. Ein Beitrag im Salesforce Developers Blog vom Dezember 2025 zur Übergabe von Einstein Enhanced Bots an Agentforce-Agenten, geschrieben von zwei Salesforce-Mitarbeitenden, beschreibt dieses Muster mit Einstein Enhanced Bots: Der Bot "triages transactions (Log/Status) and routes complex knowledge to an Agentforce Service agent", über ein Feld auf der Messaging Session, einen ausgehenden Omni-Channel-Flow und eine Ausweich-Queue. Der Beitrag behandelt nur die Übergabe vom Bot an den Agenten, nicht den Rückweg.

## Welche Pfade sollten im Menü bleiben?

Meine Kriterien, in dieser Reihenfolge:

- **Identifikation und Prüfung.** Kundennummer, Händler-ID und Seriennummer entscheiden, was das Gespräch sehen darf. Das sollte nicht davon abhängen, wie ein Modell einen Satz liest, und Freitextfelder sind der Einstieg für [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).
- **Erfassung mit rechtlichem Gewicht.** Garantieregistrierung, Inbetriebnahmedatum, Ansprechpartner für Sicherheitshinweise. Ein Menü oder Formular erfasst genau die Pflichtfelder.
- **Sicherheitsrelevante Meldungen.** Ein Ausfall mit Gefahr für Menschen geht direkt in eine Queue mit Seriennummer und Fotos, ohne Zusammenfassung dazwischen. Für den Telefonkanal behandle ich dieselbe Frage in [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/).
- **Einzelabfragen mit einem Schlüssel.** Auftragsstatus per Auftragsnummer ist ein SAP-Aufruf. Ein Agent kann das auch, wie in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschrieben, verbraucht aber zwei oder mehr Aktionen für eine Antwort, die das Menü mit zwei Klicks liefert.
- **Zusagen mit Haftung**, etwa bestätigte Liefertermine.

Auf den Agenten gehören: Fehlersuche anhand von Handbüchern, gemischte Fragen, Händler, die in ihrer eigenen Sprache schreiben, und Rückfragen im selben Gespräch.

Wer trotzdem alles auf Agentforce umstellt, kann die festen Pfade als Agent-Script-Logik im Agenten abbilden. Jeder Schritt läuft dann aber über den Zähler des Agenten.

## Wie ändern sich Tests und Go-live?

Einen Bot testen Sie, indem Sie jeden Dialogpfad einmal durchgehen: gleiche Eingabe, gleiche Ausgabe. Ein Agent braucht einen Testsatz, der mehrmals gegen eine vereinbarte Bestehensquote läuft. Der Implementierungsleitfaden bewertet die Antwortqualität von 0 bis 5 und wertet 3 oder mehr als bestanden, Topic- und Aktionsprüfungen sind bestanden oder nicht. Schwellen und Werkzeuge beschreibe ich in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/). Testläufe in der Sandbox kosten laut Rate Card 16 Credits pro Aktion.

Der Bot verschafft Ihnen einen Vorsprung. Die Beispielsätze, mit denen jeder Intent trainiert wurde, und die Protokolle des Pfads "Etwas anderes" sind ein fertiger Testsatz aus echten Händlerfragen.

Meine Reihenfolge:

1. Jeden Bot-Pfad mit Volumen und Abbruchquote der letzten drei Monate auswerten.
2. Jeden Pfad nach den Kriterien oben markieren: behalten, umstellen oder an Menschen übergeben.
3. Upgrade Agent in einer Sandbox laufen lassen und den Entwurf auf die umgestellten Pfade kürzen.
4. Tests aus Intent-Sätzen und Protokollen bauen und die Bestehensquote mit der Serviceleitung vereinbaren.
5. Nur den Freitextpfad über Omni-Channel mit Ausweich-Queue an den Agenten leiten und Digital Wallet vier Wochen beobachten.
6. Mit diesen Zahlen über den nächsten Pfad entscheiden.

Ein Einstein Bot braucht keine Eins-zu-eins-Ablösung, sondern eine Aufteilung in Pfade, die vorhersehbar bleiben müssen, und Fragen, die ein Agent besser beantwortet; diese [Architekturentscheidung](../../leistungen/salesforce-architektur/) gehört vor den ersten Klick auf Upgrade, und wenn Sie eine zweite Meinung zu den Pfaden Ihres Bots möchten, [schreiben Sie mir](#contact).
