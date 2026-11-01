---
title: "Was ist Agentforce? Erklärt für die IT-Leitung"
description: "Was ist Agentforce? Definition, Bausteine wie Subagenten, Aktionen und Agent Script, Abgrenzung zu Chatbot und Prompt Builder, Kosten und Daten."
pubDate: 2026-11-01
lang: de
slug: was-ist-agentforce
translationKey: what-is-agentforce
topic: ai
categories: [ai, architecture]
tags: [Agentforce, KI-Agenten, Agent Script, Subagenten, Salesforce KI, IT-Leitung]
takeaways:
  - "Ein Flow folgt einem fest gebauten Pfad. Ein Agent wählt den Pfad je Anfrage selbst, kann aber nur, was seine Aktionen können."
  - "Seine Bausteine sind Subagenten (früher Topics), Anweisungen und Aktionen. Die Reasoning Engine verbindet sie, der Trust Layer schützt die Daten."
  - "Mit Agent Script legen Sie Geschäftslogik verbindlich fest. Das Sprachmodell bestimmt dann vor allem den Gesprächsstil."
  - "Abgerechnet wird nach Verbrauch: Eine Aktion kostet laut Preisliste 20 Flex Credits. Die Kosten hängen also an der Zahl der Aktionen."
  - "Für Hersteller entscheidet der Zugriff auf ERP-Daten wie Auftragsstatus, Bestände und Anlagen, ob ein Agent im Alltag hilft."
faq:
  - q: "Was ist Agentforce?"
    a: "Agentforce ist die Plattform von Salesforce, mit der Unternehmen KI-Agenten bauen und betreiben. Ein Agent nutzt generative KI, um zu entscheiden, was als Nächstes zu tun ist, und führt die Schritte über Aktionen aus, etwa Flows, Apex oder Schnittstellen."
  - q: "Was ist der Unterschied zwischen Agentforce und einem Chatbot?"
    a: "Ein klassischer Chatbot folgt einem festen Dialogbaum. Ein Agentforce-Agent versteht die Anfrage, wählt passende Subagenten und Aktionen und kann Daten lesen und ändern. Feste Regeln lassen sich mit Agent Script trotzdem vorgeben."
  - q: "Was sind Subagenten in Agentforce?"
    a: "Subagenten beschreiben die Aufgaben, die ein Agent übernimmt, etwa Auftragsstatus abfragen oder einen Servicefall anlegen. Salesforce nannte sie früher Topics. Jeder Subagent hat eigene Anweisungen und Aktionen."
  - q: "Was kostet Agentforce?"
    a: "Agentforce wird nach Verbrauch in Flex Credits abgerechnet. Laut Preisliste kostet eine Aktion 20 Flex Credits, bei 500 € je 100.000 Credits also 0,10 €. Daneben gibt es Editionen mit enthaltenen Credits und Pauschalverträge."
draft: false
---

Agentforce ist die Plattform von Salesforce für KI-Agenten: Software, die mit generativer KI selbst entscheidet, welcher Schritt als Nächstes kommt, und ihn über Aktionen in Salesforce oder angebundenen Systemen ausführt. Wer „was ist Agentforce“ fragt, bekommt oft Marketingbegriffe zur Antwort. Für die IT-Leitung zählt, woraus ein Agent technisch besteht, wie viel Kontrolle Sie über seinen Ablauf haben, was er kostet und welche Daten er braucht. Dieser Artikel ordnet das ein und verlinkt die Detailartikel.

## Was ist Agentforce?

Salesforce beschreibt Agentforce in seinem [Agentforce Guide](https://www.salesforce.com/agentforce/guide/) als Plattform für Agenten, die über einfache Chats hinausgehen. Ein Agent ist laut Salesforce eine Software, die generative KI nutzt, um zu entscheiden, was als Nächstes zu tun ist und wie.

Der Unterschied zu bisherigen Automatisierungen liegt in dieser Entscheidung. Ein Flow folgt einem festen Pfad, den jemand vorher gebaut hat. Ein Agent bekommt eine Anfrage in natürlicher Sprache, etwa „Wann kommt meine Ersatzteilbestellung?“, erkennt die Aufgabe, wählt die passende Aktion und formuliert die Antwort. Agenten arbeiten im Kundenservice, im Vertrieb oder für Mitarbeiter. Aufrufen lassen sie sich aus Chat und Portal, aus Flow oder Apex und über eine API aus eigenen Anwendungen, wie in [Agentforce Agent API](../agentforce-agent-api-eigene-apps/) beschrieben.

## Ein Agent besteht aus Subagenten, Anweisungen und Aktionen

Laut Agentforce Guide setzt sich ein Agent aus wenigen Bausteinen zusammen:

| Baustein | Was er tut |
|---|---|
| Subagenten | beschreiben die Aufgaben des Agenten, etwa Auftragsstatus abfragen oder einen Servicefall anlegen |
| Anweisungen | legen fest, wie ein Subagent Gespräche führt und was er nicht tut |
| Aktionen | holen Informationen oder erledigen Aufgaben, etwa über Flow, Apex, Prompt-Templates oder Schnittstellen |
| Reasoning Engine | wählt anhand von Subagenten, Anweisungen, Aktionen und Regeln den nächsten Schritt |
| Trust Layer | leitet Prompts an das Sprachmodell weiter, beachtet Berechtigungen und maskiert sensible Daten |
| Data 360 | indiziert Wissen für Antworten auf Basis eigener Dokumente und liefert Daten für die Auswertung |

Für die Architektur heißt das: Ein Agent kann nur, was seine Aktionen können. Die Aktionen nutzen dieselben Berechtigungen, Flows und Schnittstellen wie der Rest der Org. Wer heute schon saubere Flows und Integrationen hat, baut Agenten schneller.

Aktionen gibt es als Standardaktionen von Salesforce und als eigene Aktionen. Laut Agentforce Guide brauchen manche Arten eigener Aktionen eine zusätzliche Lizenz. Prüfen Sie das für jede geplante Aktion, bevor Sie Kosten schätzen.

```hinweis tipp
Salesforce hat Topics in Subagenten umbenannt. In älteren Trailhead-Modulen, Diagrammen und Artikeln, auch in einigen meiner eigenen, steht noch „Topics“. Gemeint ist dasselbe.
```

## Agent Script legt Abläufe fest

Ein häufiger Einwand gegen KI-Agenten lautet, dass ihr Verhalten nicht vorhersehbar sei. Salesforce antwortet darauf mit Agent Script, einer eigenen Sprache für Agenten. Laut Agentforce Guide kombiniert die Reasoning Engine damit Entscheidungen des Sprachmodells mit regelbasierter Ausführung. Script gibt volle Kontrolle über das Verhalten und ersetzt überladene Systemprompts durch strukturierte Geschäftslogik.

Die Arbeitsteilung empfiehlt Salesforce so: Anweisungen steuern den Gesprächsstil, das Script die eigentliche Geschäftslogik. Für Hersteller ist das wichtig, weil viele Regeln im Service fest sind. Eine Garantie gilt oder gilt nicht, eine Rücksendung braucht eine Seriennummer. Solche Regeln gehören ins Script, damit der Agent sie jedes Mal gleich anwendet.

Vor dem Go-live prüft das Testing Center das Verhalten des Agenten, im Betrieb zeigt Agentforce Observability, wo Logik nachgeschärft werden muss. Wie ich einen Agenten für die Produktion freigebe, beschreibe ich in [Agentforce-Agenten testen](../agentforce-agenten-testen-freigeben/).

## Was unterscheidet Agentforce von Chatbot und Prompt Builder?

Agentforce ersetzt nicht jede bestehende KI-Funktion in Salesforce. Drei Werkzeuge werden oft verwechselt:

- **Einstein Bot.** Folgt einem festen Dialogbaum mit Menüs. Gut für wenige, klar strukturierte Anfragen. Ob und wann sich die Umstellung lohnt, steht in [Einstein Bot auf Agentforce umstellen](../einstein-bots-agentforce-umstellen/).
- **Prompt Builder.** Erzeugt Text aus einer Vorlage, etwa eine Zusammenfassung eines Servicefalls oder einen Antwortentwurf. Kein eigenständiges Handeln. Wann ein Template reicht, vergleicht [Prompt Builder oder Agentforce-Agent](../prompt-builder-oder-agentforce-agent/).
- **Agentforce-Agent.** Versteht die Anfrage, wählt Subagenten und Aktionen und kann Daten lesen und ändern.

Viele Aufgaben in Service und Vertrieb brauchen gar keinen Agenten. Ein Prompt-Template, das einen Antwortentwurf schreibt, ist einfacher zu testen und günstiger im Betrieb.

## Kosten entstehen pro Aktion

Agentforce wird nach Verbrauch abgerechnet. Laut Preisliste kostet eine Aktion 20 Flex Credits, beim Listenpreis von 500 € je 100.000 Credits also 0,10 €. Dazu kommen Prompts je nach Modellstufe und die Verarbeitung in Data 360. Wie Sie das für einen Agenten schätzen, zeigt [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/). Für größere Programme gibt es Pauschalverträge, die ich in [AELA oder Flex Credits](../aela-agentforce-pauschale-oder-credits/) vergleiche.

Früh auf den Tisch gehört außerdem, welches Sprachmodell die Anfragen beantwortet und wo es läuft. Das behandelt [Agentforce Datenresidenz](../agentforce-eu-datenresidenz-modelle/). Und welche Fristen der EU AI Act für Agenten setzt, steht in [EU AI Act: Fristen für Agentforce](../eu-ai-act-fristen-agentforce/).

## Für Hersteller zählen die Daten aus dem ERP

Ein Agent im Händlerportal, der den Auftragsstatus nicht kennt, hilft niemandem. Bei Herstellern liegen die Daten, nach denen Kunden und Händler fragen, oft im ERP: Auftragsstatus, Liefertermine, Bestände, Preise und Anlagen. Der Agent braucht dafür eine Aktion, die das ERP abfragt, etwa über MuleSoft. Ein Beispiel beschreibe ich in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

Lesende Aktionen sind der einfachere Einstieg. Sobald ein Agent im ERP etwas ändern soll, etwa einen Liefertermin oder eine Rücksendung, braucht die Schnittstelle dieselben Prüfungen wie für einen Menschen im Innendienst: Berechtigung, Plausibilität und Protokoll.

Ebenso wichtig ist die Qualität der Daten in Salesforce selbst. Wenn Anlagen falsch zugeordnet oder Kunden doppelt angelegt sind, gibt der Agent falsche Antworten, nur schneller und freundlicher. Warum ich deshalb mit Business Value und Datenqualität beginne, steht in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Einen Prozess mit Zielzahl für den ersten Agenten auswählen

Wählen Sie für den Einstieg einen Prozess mit vielen gleichartigen Anfragen, klaren Regeln und Daten, auf die eine Aktion zugreifen kann, etwa Auftragsstatus oder Ersatzteilanfragen von Händlern. Legen Sie eine Zielzahl fest, zum Beispiel den Anteil der Anfragen, die der Agent ohne Übergabe an einen Menschen löst, und einen Termin, an dem Sie über den Ausbau entscheiden. Welche Kriterien dabei zählen, beschreibe ich in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/). Die Architektur dahinter plane ich mit Kunden unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
