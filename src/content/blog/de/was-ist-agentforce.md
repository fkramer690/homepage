---
title: "Was ist Agentforce? Erklärt für die IT-Leitung"
description: "Was ist Agentforce? Definition, Bausteine wie Subagenten, Aktionen und Agent Script, Abgrenzung zu Bots und Prompt Builder, Kosten und Daten."
pubDate: 2026-11-06
lang: de
slug: was-ist-agentforce
translationKey: what-is-agentforce
topic: ai
categories: [ai, architecture]
tags: [Agentforce, KI-Agenten, Agent Script, Subagenten, Salesforce KI, IT-Leitung]
takeaways:
  - "Ein Flow führt einen vorab modellierten Prozess aus. Ein Agent deutet jede Anfrage und wählt Aktionen in festen Grenzen; handeln können nur diese Aktionen."
  - "Sie konfigurieren Subagenten, Anweisungen und Aktionen. Darunter laufen Reasoning Engine und Trust Layer; Data 360 ergänzt Wissen und Monitoring."
  - "Agent Script legt Reihenfolge und Bedingungen fest. Prüfungen wie Garantie oder Preis gehören in deterministische Aktionen, nicht ins Sprachmodell."
  - "Mit Flex Credits kostet eine Standardaktion 20 Credits, zum Listenpreis 0,10 €. Daneben gibt es Nutzerlizenzen, Preise pro Gespräch und Pauschalen."
  - "Für Hersteller entscheiden ERP-Daten und die Frage, wer welche installierte Basis sehen darf, ob ein Agent hilft oder schadet."
faq:
  - q: "Was ist Agentforce?"
    a: "Agentforce ist die Plattform von Salesforce, um KI-Agenten zu bauen und zu betreiben. Ein Agent verbindet ein Sprachmodell, das Anfragen deutet, mit Logik und Aktionen, die Sie festlegen, etwa Flows, Apex oder Schnittstellen."
  - q: "Was unterscheidet Agentforce von einem Einstein Bot?"
    a: "Ein Einstein Bot führt vorab modellierte Dialoge, optional mit Intent-Erkennung. Ein Agentforce-Agent wählt Subagenten und Aktionen je Anfrage. Laut Salesforce sind Einstein Bots seit dem 17. August 2026 im Wartungsmodus."
  - q: "Was sind Subagenten in Agentforce?"
    a: "Subagenten beschreiben die Aufgaben eines Agenten, etwa das Abfragen des Auftragsstatus oder das Anlegen eines Servicefalls. Früher hießen sie bei Salesforce Topics. Jeder Subagent hat eigene Anweisungen und Aktionen."
  - q: "Was kostet Agentforce?"
    a: "Das hängt vom Lizenzmodell ab. Bei Flex Credits nennt Salesforce 500 € oder 500 $ je 100.000 Credits; eine Standardaktion verbraucht 20 Credits, zum Listenpreis 0,10 €. Daneben gibt es Nutzerlizenzen, Preise pro Gespräch und Pauschalverträge."
draft: false
---

Agentforce ist die Plattform von Salesforce für KI-Agenten: Software, die mit generativer KI eine Anfrage deutet, in festgelegten Grenzen den nächsten Schritt wählt und ihn über Aktionen in Salesforce oder angebundenen Systemen ausführt. Wer „was ist Agentforce“ fragt, bekommt oft Marketingbegriffe als Antwort. Für die IT-Leitung zählt, woraus ein Agent technisch besteht, welche Teile sich vorhersehbar verhalten, mit welchen Rechten er läuft, was er kostet und welche Daten er braucht. Dieser Artikel ordnet das.

## Was ist Agentforce?

Im [Agentforce Guide](https://www.salesforce.com/agentforce/guide/) beschreibt Salesforce Agentforce als Plattform für Agenten, die über einfache Chats hinausgehen. Laut Salesforce ist ein Agent eine Software, die mit generativer KI entscheidet, was als Nächstes zu tun ist und wie.

Der Unterschied zu früherer Automatisierung liegt in dieser Entscheidung. Ein Flow führt einen Prozess aus, dessen Pfade und Kriterien vorab modelliert sind. Ein Agent bekommt eine Anfrage in natürlicher Sprache, etwa „Wann kommt meine Ersatzteilbestellung?“, erkennt die Aufgabe, wählt eine Aktion und formuliert die Antwort. Agenten arbeiten im Kundenservice, im Vertrieb oder für Mitarbeitende. Sie lassen sich aus einem Chat oder Portal, aus Flow oder Apex und über eine API aufrufen, wie in [Agentforce Agent API](../agentforce-agent-api-eigene-apps/) beschrieben.

## Was Sie konfigurieren und was darunter läuft

Der Agentforce Guide nennt einige Bausteine. Sie liegen auf verschiedenen Ebenen: Manche konfigurieren Sie für jeden Agenten, manche sind Dienste der Plattform, und ein Baustein wird nur für bestimmte Einsätze gebraucht.

```tabelle
titel: Bausteine eines Agentforce-Agenten
spalten: Baustein | Ebene | Was er tut
Subagenten | Sie konfigurieren | Beschreiben die Aufgaben des Agenten, etwa Auftragsstatus oder Servicefall
Anweisungen | Sie konfigurieren | Legen fest, wie ein Subagent Gespräche führt und was er nicht tut
Aktionen | Sie konfigurieren | Lesen oder ändern Daten über Flow, Apex, Prompt-Vorlagen oder Schnittstellen *
Reasoning Engine | Plattform | Wählt den nächsten Schritt aus Subagenten, Anweisungen, Aktionen und Agent Script
Trust Layer | Plattform | Schutz vor Prompt-Angriffen, Zero Data Retention beim Modellanbieter, Audit; keine Datenmaskierung für Agenten
Data 360 | Je nach Einsatz | Nötig für natives Wissen aus eigenen Dokumenten und für einige Audit- und Observability-Funktionen
fazit: Ein Agent kann nur, was seine Aktionen können. In den Aktionen steckt die Architekturarbeit.
```

Ein Punkt der Tabelle überrascht viele: Laut [Salesforce-Hilfe zum Trust Layer](https://help.salesforce.com/s/articleView?id=sf.copilot_trust.htm&language=en_US&type=5) ist die musterbasierte und feldbasierte Datenmaskierung für Agenten abgeschaltet. Der Schutz sensibler Daten hängt deshalb davon ab, was der Agentenbenutzer und die Aktionen des Agenten überhaupt lesen dürfen. Was der Trust Layer stattdessen leistet, steht in [Einstein Trust Layer: Was er in Agentforce schützt](../einstein-trust-layer-was-er-schuetzt/).

```hinweis achtung
Die Rechte hängen vom Agententyp ab. Ein Agent für Mitarbeitende kann im Kontext des angemeldeten Benutzers laufen. Ein Serviceagent für Kunden oder Händler läuft meist als eigener Agentenbenutzer. Für ein Händlerportal ist das die Kernfrage. Der Portalbenutzer muss authentifiziert sein, und jede Aktion muss die Identität des Händlers aus dieser geprüften Anmeldung ableiten, nie aus Eingaben im Chat. Erst dann sorgen die Rechte des Agentenbenutzers und die Filter der Aktionen dafür, dass jeder Händler nur seine eigene installierte Basis sieht.
```

Wie Sie ein solches Portal gegen manipulierte Eingaben schützen, beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Salesforce hat Topics in Subagenten umbenannt. Ältere Trailhead-Module und Artikel, darunter auch einige von mir, sprechen noch von „Topics“. Gemeint ist dasselbe. Ob eine geplante Aktion eine Zusatzlizenz braucht, hängt davon ab, was sie aufruft, etwa eine produktspezifische Standardaktion. Prüfen Sie das je Aktion, bevor Sie Kosten schätzen.

## Welche Teile eines Agenten sind deterministisch?

Ein häufiger Einwand gegen KI-Agenten lautet, ihr Verhalten sei nicht vorhersehbar. Die Antwort von Salesforce ist Agent Script, eine eigene Sprache für Agenten. Laut Agentforce Guide verbindet sie Entscheidungen des Sprachmodells mit regelbasierter Ausführung. Deterministisch ist, was Sie im Script als Logik modellieren: Reihenfolge der Schritte, Bedingungen, Übergänge. Anweisungen im Prompt und erzeugte Antworten deutet weiterhin das Sprachmodell.

Für Hersteller ergibt sich daraus eine Arbeitsteilung. Ob eine Garantie gilt, welchen Preis ein Händler bekommt oder ob ein Ersatzteil zu einer Anlage passt, sind Prüfungen für eine deterministische Aktion, etwa einen Flow, Apex oder einen Aufruf ins ERP. Agent Script sorgt dafür, dass der Agent diese Prüfungen vor der Antwort aufruft, und das Sprachmodell formuliert die Antwort.

Für das Testen gilt dieselbe Logik. Das Testing Center führt festgelegte Testfälle wiederholt aus und bewertet die Wahl von Subagenten und Aktionen sowie die Ergebnisse. Es unterstützt die Freigabe, ersetzt aber keine fachliche Abnahme, keine Integrations- und keine Sicherheitstests. Wie Sie einen Agenten auf die Produktion vorbereiten, steht in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

## Wie unterscheidet sich Agentforce von Bots und Prompt Builder?

Agentforce ersetzt nicht jede KI-Funktion in Salesforce. Drei Werkzeuge werden oft verwechselt:

```tabelle
titel: Einstein Bot, Prompt Builder und Agentforce-Agent
spalten: Werkzeug | Wie es arbeitet | Passt, wenn
Einstein Bot | Vorab modellierte Dialoge, optional mit Intent-Erkennung und Aktionen | Bestehende Bots; seit 17. August 2026 im Wartungsmodus
Prompt Builder | Erzeugt Ausgaben aus einer Vorlage; Flow, Apex oder eine App steuern den Ablauf | Der Ablauf steht fest und nur der Text variiert *
Agentforce-Agent | Wählt Subagenten und Aktionen je Anfrage, liest und ändert Daten | Anfragen unterscheiden sich und brauchen Daten aus mehreren Quellen
fazit: Viele Aufgaben in Service und Vertrieb brauchen keinen Agenten. Ein Flow mit Prompt-Vorlage lässt sich meist einfacher testen.
```

Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.bots_service_terminology.htm&language=en_US&type=5) sind Einstein Bots seit dem 17. August 2026 im Wartungsmodus; für neue Einführungen verweist Salesforce auf Agentforce. Wann sich der Umstieg lohnt, steht in [Einstein Bots auf Agentforce umstellen](../einstein-bots-agentforce-umstellen/), wann eine Vorlage reicht, in [Prompt Builder oder Agentforce-Agent](../prompt-builder-oder-agentforce-agent/).

## Was kostet Agentforce?

Salesforce verkauft Agentforce in mehreren Modellen: Flex Credits nach Verbrauch, Preise pro Gespräch, Nutzerlizenzen mit enthaltener Nutzung und Pauschalverträge. Im Modell Flex Credits nennt die [Preisseite](https://www.salesforce.com/agentforce/pricing/) 500 € oder 500 $ je 100.000 Credits. Laut [Flex-Credits-Preisliste](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-02.23.2026.pdf) gilt je Aktion:

```kennzahlen
20 | Flex Credits je Standardaktion in der Produktion
16 | Flex Credits je Standardaktion in einer Sandbox
30 | Flex Credits je Sprachaktion
0,10 € | je Standardaktion bei 500 € je 100.000 Credits
quelle: Agentforce-Preisseite und Flex-Credits-Preisliste von Salesforce, Listenpreise Stand November 2026
```

Das sind Listenpreise, keine Vertragspreise. Je nach Lizenz und Kontext kommen Kosten für Prompts je nach Modellstufe und für Verarbeitung in Data 360 hinzu. Wie Sie das für einen Agenten schätzen, zeigt der Artikel [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/). Er vergleicht auch Pauschalen wie die AELA.

Früh geklärt werden sollte auch, welches Sprachmodell antwortet und wo es läuft. Das beschreibt [Agentforce-Datenresidenz](../agentforce-eu-datenresidenz-modelle/).

## Für Hersteller zählen die Daten aus dem ERP

Ein Agent im Händlerportal, der den Auftragsstatus nicht kennt, hilft niemandem. Bei Herstellern liegen die Daten, nach denen Kunden und Händler fragen, oft im ERP oder betreffen die installierte Basis: Auftragsstatus und bestätigte Liefertermine, Bestand, kundenspezifische Preise, Seriennummern und die Ersatzteile, die zu einer Maschine passen. Der Agent braucht Aktionen, die diese Quellen abfragen, etwa über MuleSoft, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

Drei Fragen entscheiden, ob das funktioniert. Welcher Händler darf welche Anlagen und Preise sehen? Was sagt der Agent, wenn das ERP ausfällt oder die Daten alt sind? Und welche Termine darf der Agent weitergeben? Vor dem Go-live ist zu klären, welches System für den Liefertermin führend ist, welchen Status der Termin hat, ob dieser Status an Kunden weitergegeben werden darf und wann ein Mensch den Vorgang freigeben muss, etwa bei einer Rücksendung. Lesende Aktionen sind der einfachere Einstieg. Sobald ein Agent im ERP etwas ändert, braucht die Schnittstelle dieselben Prüfungen wie bei einer Person im Innendienst: Berechtigung, Plausibilität und Protokoll.

Ebenso wichtig ist die Qualität der Daten in Salesforce. Sind Anlagen dem falschen Kunden zugeordnet, gibt der Agent falsche Antworten, nur schneller und höflicher. Warum Geschäftsnutzen und Datenqualität zuerst kommen, steht in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Für den ersten Agenten einen Prozess mit Zielwert wählen

Wählen Sie für den Start einen Prozess mit vielen ähnlichen Anfragen, klaren Regeln und Daten, auf die eine Aktion zugreifen kann, etwa Auftragsstatus oder Ersatzteilanfragen von Händlern. Legen Sie Zielwerte für Kennzahlen fest, die das Ergebnis messen und nicht nur die Entlastung: Anteil korrekt gelöster Anfragen, wie oft Kunden mit derselben Frage wiederkommen, richtige Übergaben an Menschen und Kosten je gelöster Anfrage. Legen Sie einen Termin fest, an dem Sie über den Ausbau entscheiden. Welche Kriterien zählen, steht in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/). Die Architekturfragen dahinter, von Aktionen und Rechten bis zur ERP-Anbindung, behandle ich in meiner Leistung [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
