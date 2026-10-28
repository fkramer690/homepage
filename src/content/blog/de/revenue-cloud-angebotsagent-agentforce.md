---
title: "Angebotsagent in Revenue Cloud: Was er heute kann"
description: "Was der Agentforce-Angebotsagent in Revenue Cloud für den Vertriebsinnendienst leistet, was vorher stehen muss, was er kostet und wo er an Grenzen stößt."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-angebotsagent-agentforce
translationKey: revenue-cloud-quoting-agent
topic: revenue
categories: [revenue-cloud, ai]
tags: [Revenue Cloud, Agentforce, Angebotsagent, Angebote, Flex Credits, KI-Agenten]
takeaways:
  - "Der Angebotsagent in Revenue Cloud erstellt, ändert und fasst Angebote aus normaler Sprache zusammen, bietet nur gültige Katalogprodukte an und hält Preise und Rabatte in den Leitplanken des Systems."
  - "Salesforce meldet 75 Prozent weniger Zeit und 87 Prozent weniger Klicks im eigenen Vertrieb; das ist eine Herstellerangabe aus einem Unternehmen, kein Maßstab für Maschinenbauer."
  - "Der Agent ist nur so gut wie Katalog, synchronisierte Preisdaten, Konfigurationsregeln und Freigabegrenzen dahinter; diese kommen zuerst."
  - "Winter '27 erweitert das Angebotswesen per Agent auf Self-Service für Kunden, Partner in ihrem eigenen Arbeitsbereich und Entwürfe für Vertragsverlängerungen."
  - "Jede Agentenaktion kostet 20 Flex Credits, ein Angebot aus fünf Aktionen also rund 0,50 Dollar zum Listenpreis, Prompts nicht eingerechnet."
faq:
  - q: "Was macht der Angebotsagent in Revenue Cloud?"
    a: "Er erstellt, ändert und fasst Angebote zusammen und beachtet dabei rollenbasierte Zugriffsrechte. Er bietet gültige Produkte nach Katalog- und Fulfillment-Regeln an, hält Preise und Rabatte in den Leitplanken des Systems und bearbeitet Neugeschäft, Nachträge zu Assets und Angebotsänderungen über den Subagenten Quote Management."
  - q: "Was brauche ich, bevor ich den Angebotsagenten einsetze?"
    a: "Revenue Cloud mit gepflegtem Produktkatalog, über Salesforce Pricing synchronisierte Preisdaten, aktiviertes Agentforce und einen Mitarbeiter-Agenten mit dem Subagenten Quote Management. In der Praxis außerdem Rabattgrenzen als Regeln und Freigabe-Workflows für alles, was der Agent nicht entscheiden darf."
  - q: "Können Händler und Kunden den Angebotsagenten nutzen?"
    a: "Salesforce hat mit Winter '27, allgemein verfügbar seit dem 12. Oktober 2026, Self-Service-Angebote für Kunden und integrierte Angebote für Partner angekündigt. Die Hilfe dokumentiert außerdem den Zugriff für Communities und Partner. Die Lizenzen für externe Nutzer müssen Sie gesondert klären."
  - q: "Was kostet der Angebotsagent?"
    a: "Agentenaktionen werden in Flex Credits abgerechnet: 20 Credits je Standardaktion, bei einem Listenpreis von 500 Dollar je 100.000 Credits. Prompts kommen je nach Modellstufe dazu. Außerdem brauchen die Nutzer, für die der Agent arbeitet, Revenue-Cloud-Lizenzen."
draft: false
---

Der Angebotsagent in Revenue Cloud macht aus einer Anfrage in normaler Sprache ein Angebot: Er wählt gültige Produkte aus dem Katalog, berechnet die Preise mit Salesforce Pricing, setzt Rabatte innerhalb der Leitplanken und kann Angebote ändern und zusammenfassen. Für einen Vertriebsinnendienst mit Standardprodukten und sauberen Preisdaten spart das echte Zeit. Vor dem Go-live brauchen Sie einen gepflegten Katalog, synchronisierte Preise, Konfigurationsregeln in Salesforce und Rabattgrenzen, die Freigaben durchsetzen. Bei konfigurierten Maschinen, deren Regeln außerhalb von Salesforce liegen, hilft der Agent noch nicht.

## Was kann der Angebotsagent in Revenue Cloud?

Salesforce hat Angebote per Agent für Revenue Cloud im Juli 2025 vorgestellt. In der [Ankündigung](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) beschreibt der Vertrieb, was er braucht, und der Agent erzeugt das Angebot, "automatically pulling the correct products, pricing, and terms". Die Schlagzeilenzahlen stammen aus dem eigenen Vertrieb von Salesforce: 75 Prozent weniger Zeit für Angebote und 87 Prozent weniger Klicks. Das ist eine Herstellerangabe aus einem einzigen Unternehmen und seinem eigenen Vertrieb. In den Business Case eines Maschinenbauers würde ich sie nicht schreiben.

Der [Trailhead-Quick-Start zum Angebotsagenten](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent) beschreibt den Umfang genauer. Der Agent

- erstellt, ändert und fasst Angebote zusammen und beachtet rollenbasierte Zugriffsrechte,
- folgt Katalog- und Fulfillment-Regeln und bietet so nur gültige Produkte an,
- hält Preise und Rabatte innerhalb der Leitplanken des Systems,
- bearbeitet Neugeschäft, Nachträge zu Assets und Änderungen an Angeboten.

Die Arbeit erledigt der Subagent Quote Management, dessen Aktionen auf Flows beruhen. In der Übung fragen Sie 15 Headsets mit 15 Prozent Rabatt für einen Account und eine Opportunity an, ändern den Rabatt dann auf 10 Prozent und versenden das Angebot anschließend selbst von der Opportunity aus mit einer E-Mail-Vorlage. Die Salesforce-Hilfe nennt einen zweiten Baustein, den Subagenten Product Selection für Produktsuche und Filter. Auf salesforce.com heißt das Produkt Revenue Cloud; Hilfe und Trailhead führen den Agenten unter Agentforce Revenue Management oder Revenue Management.

## Was muss stehen, bevor der Agent Angebote schreibt?

Der Agent liest dieselben Datensätze wie Ihr Innendienst. Was eine erfahrene Kollegin aus Gewohnheit korrigiert, gibt der Agent einfach weiter. Die Vorbereitung ist deshalb vor allem Arbeit an Daten und Regeln:

- **Katalog.** Jedes verkaufsfähige Produkt, jede Option und jedes Ersatzteil als Katalogeintrag mit Aktiv-Kennzeichen und einer Beschreibung, wie sie ein Vertriebsmitarbeiter eintippen würde. Wie Sie Varianten abbilden, ohne den ERP-Materialstamm zu kopieren, beschreibt das Kapitel [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/).
- **Synchronisierte Preisdaten.** Die Einrichtung auf Trailhead beginnt mit Sync Pricing Data im Salesforce Pricing Setup. Ohne synchronisierte Preise liefert der Agent kein brauchbares Angebot.
- **Konfigurationsregeln in Salesforce.** Der Agent hält sich an die Katalogregeln. Liegen Ihre Regeln in der SAP-Variantenkonfiguration oder im Kopf eines Konstrukteurs, sieht er sie nicht.
- **Rabattgrenzen als Freigaben.** Der Agent setzt einen Rabatt, den der Vertrieb verlangt. Ob dieser Rabatt eine Freigabe braucht, sollte der Freigabe-Workflow entscheiden, wie in [Rabattfreigaben in Revenue Cloud](../revenue-cloud-rabattfreigaben/) beschrieben.
- **Agentforce-Einrichtung.** Agentforce aktiviert, ein Mitarbeiter-Agent mit dem Subagenten Quote Management und ein Permission Set, das den Zugriff auf den Agenten erlaubt.

Ich würde zuerst zählen, welcher Anteil der Produkte sich mit den Worten finden lässt, die Kunden benutzen. Ist er niedrig, beheben Sie das vor dem Pilot.

## Was ändert sich mit Winter '27?

Die [Ankündigung zu Winter '27](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), allgemein verfügbar seit dem 12. Oktober 2026, erweitert Angebote per Agent auf drei Gruppen: "self-service quoting for customer buyers, integrated quoting for partners, and automated renewal package assembly for account executives". Kunden bestellen ohne Vertriebsmitarbeiter, Partner arbeiten, ohne ihren Arbeitsbereich zu verlassen, und Account Manager bekommen vor einer Verlängerung "a drafted quote and risk signals".

Für Hersteller ist der Verlängerungsentwurf der interessanteste Teil. Wartungs- und Fernüberwachungsabos verlängern sich jedes Jahr, und das Verlängerungsangebot vorzubereiten ist Routinearbeit. Partner- und Self-Service-Angebote werfen zuerst kaufmännische Fragen auf: Welche Preise sieht ein Händler, und darf das Self-Service-Angebot eines Kunden das Angebot des Händlers unterbieten?

```hinweis offen
Die Hilfe dokumentiert eine Einrichtungsseite für den Zugriff von Communities und Partnern auf Agentforce in Revenue Management. Die Lizenzen für externe Nutzer sind ein eigener Klärungspunkt.
```

Wenn Ihre Händler stattdessen in Manufacturing Cloud Angebote erstellen, sehen Sie sich den [AI Partner Sales Assistant für Händlerangebote](../ki-angebote-haendler-partner-sales-assistant/) an. Zwei Angebotsagenten auf zwei Angebotsmodellen würde ich vermeiden.

## Was kostet der Angebotsagent?

Es gibt zwei Kostenblöcke. Erstens die Revenue-Cloud-Lizenzen der Nutzer, für die der Agent arbeitet. Zweitens den Verbrauch des Agenten in Flex Credits, zu den Sätzen der [Agentforce-Preisseite](https://www.salesforce.com/agentforce/pricing/):

```kennzahlen
500 $ | je 100.000 Flex Credits
20 | Flex Credits je Standardaktion
0,10 $ | je Standardaktion
quelle: Agentforce-Preisseite von Salesforce
```

Prompts kommen je nach Modellstufe dazu.

Eine grobe Schätzung, als Annahme: Ein Angebotsdialog braucht fünf Aktionen, etwa Account finden, Produkte suchen, Angebot anlegen, Positionen hinzufügen und Rabatt setzen. Das sind 100 Credits oder 0,50 Dollar je Angebot. Bei 1.500 Agentenangeboten im Monat liegen Sie bei rund 750 Dollar plus Prompts. Auch Tests in der Sandbox verbrauchen Credits. Wie Sie alle Zähler schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), und das Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/) der KI-Masterclass macht daraus ein Budget.

## Wann ist der Angebotsagent das falsche Werkzeug?

In vier Fällen würde ich ihn nicht oder noch nicht einsetzen:

1. **Auftragsbezogene Konstruktion.** Wird jede Maschine für den Auftrag konstruiert, kommt das Angebot aus der Konstruktion und nicht aus einem Katalog.
2. **Regeln außerhalb von Salesforce.** Liegt die Konfigurationslogik in der SAP-Variantenkonfiguration oder im PLM, bietet der Agent Kombinationen an, die sich nicht bauen lassen.
3. **Preise nur in SAP-Konditionen.** Hält Salesforce nur Listenpreise und kommt der Nettopreis aus SAP, nennt der Agent den falschen Preis, solange die Preisfindung SAP nicht abfragt.
4. **Wenige Angebote mit hohem Wert.** Zehn Angebote im Monat mit wochenlanger Verhandlung brauchen keinen Agenten, sondern einen guten Vertriebsingenieur.

## Ein typisches Szenario, als Annahme

Ein Hersteller von Verpackungsmaschinen betreibt einen Innendienst, der Ersatzteil- und Nachrüstanfragen von Bestandskunden beantwortet: Verschleißteilsätze, Upgrade-Pakete und Servicestunden. Die Preise stehen in Salesforce-Preisbüchern, jede Nacht aus SAP synchronisiert, und der Katalog hat saubere Beschreibungen. Der Innendienst bearbeitet sehr viele kleine Angebote.

Hier passt der Agent gut. Eine Mitarbeiterin tippt "Verschleißteilsatz für Linie 3 plus zwei Servicetage, üblicher Rabatt", und der Agent findet Satz und Serviceposition im Katalog und baut das Angebot für den Account des Kunden. Rabatte über der Grenze gehen in den Freigabe-Workflow. Angebote für neue Maschinen bleiben bei den Vertriebsingenieuren, weil deren Konfigurationsregeln noch in SAP liegen. Eingeführt wird der Agent zuerst in einem Land und mit echten Anfragen aus dem letzten Quartal getestet.

## Wo starten Sie?

Wählen Sie eine Angebotsart mit Standardprodukten und synchronisierten Preisen, schreiben Sie 30 Testanfragen aus echten Fällen und legen Sie für jede das erwartete Angebot fest. Lassen Sie diese in einer Sandbox laufen, bevor ein Kunde oder Händler ein Agentenangebot sieht, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Wo Agenten in der Fertigung über Angebote hinaus passen, zeigt das Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/), den ganzen Weg vom Angebot zum Auftrag das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/).

Der Angebotsagent lohnt sich, wo Angebote häufig, Produkte standardisiert und Daten sauber sind. Wenn Sie prüfen möchten, ob das für Ihren Innendienst gilt, [schreiben Sie mir](#contact).
