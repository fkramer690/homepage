---
title: "Angebotsagent in Revenue Cloud: Was er heute kann"
description: "Was der Agentforce-Angebotsagent in Revenue Cloud für den Vertriebsinnendienst leistet, was vorher stehen muss, was er kostet und wo er an Grenzen stößt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-angebotsagent-agentforce
translationKey: revenue-cloud-quoting-agent
topic: revenue
categories: [revenue-cloud, ai]
tags: [Revenue Cloud, Agentforce, Angebotsagent, Angebote, Flex Credits, KI-Agenten]
takeaways:
  - "Salesforce meldet 75 Prozent weniger Zeit und 87 Prozent weniger Klicks im eigenen Vertrieb. Das ist eine Herstellerangabe, kein Maßstab für Maschinenbauer."
  - "Katalog und synchronisierte Preisdaten sind Pflicht; für den Echtbetrieb würde ich auch Konfigurationsregeln und Freigabegrenzen vorher aufsetzen."
  - "Mit Winter '27 kündigt Salesforce Angebote per Agent für den Self-Service von Kunden, für Partner sowie Verlängerungspakete für Account Executives an."
  - "Eine Agentenaktion kostet 20 Flex Credits in Produktion (16 in der Sandbox), ein Angebot aus fünf Aktionen also rund 0,50 Dollar, ohne Prompts."
faq:
  - q: "Was macht der Angebotsagent in Revenue Cloud?"
    a: "Er erstellt und ändert Angebote, fasst sie zusammen und beachtet dabei rollenbasierte Zugriffsrechte. Er bietet gültige Produkte nach Katalog- und Fulfillment-Regeln an, hält Preise und Rabatte in den Leitplanken des Systems und bearbeitet Neugeschäft, Nachträge zu Assets und Angebotsänderungen über den Subagenten Quote Management."
  - q: "Was brauche ich, bevor ich den Angebotsagenten einsetze?"
    a: "Sie brauchen Revenue Cloud mit gepflegtem Produktkatalog, über Salesforce Pricing synchronisierte Preisdaten, aktiviertes Agentforce und einen Mitarbeiter-Agenten mit dem Subagenten Quote Management. In der Praxis sollten außerdem Rabattgrenzen als Regeln und Freigabe-Workflows für alles eingerichtet sein, was der Agent nicht entscheiden darf."
  - q: "Können Händler und Kunden den Angebotsagenten nutzen?"
    a: "Salesforce hat mit dem Release Winter '27, allgemein verfügbar seit dem 12. Oktober 2026, Self-Service-Angebote für Kunden und integrierte Angebote für Partner angekündigt. Die Hilfe beschreibt die Einrichtung für Partner im Detail; für Kundennutzer prüfen Sie in der Hilfe und mit Salesforce, welcher Agent und welche Lizenz Ihr Szenario braucht. Die Lizenzen für externe Nutzer müssen Sie gesondert klären."
  - q: "Was kostet der Angebotsagent?"
    a: "Im Flex-Credits-Modell kostet eine Agentenaktion 20 Credits in Produktion und 16 in der Sandbox (Rate Card vom 3. November 2026), bei einem Listenpreis von 500 Dollar je 100.000 Credits. Prompts kommen je nach Modellstufe dazu. Salesforce verkauft auch Agentforce-Lizenzen pro Nutzer. Welches Modell gilt, regelt Ihr Vertrag. Außerdem brauchen die Nutzer, für die der Agent arbeitet, Revenue-Cloud-Lizenzen."
draft: false
---

Der Angebotsagent in Revenue Cloud macht aus einer Anfrage in normaler Sprache ein Angebot: Er wählt gültige Produkte aus dem Katalog, berechnet die Preise mit Salesforce Pricing, setzt Rabatte innerhalb der Leitplanken und kann Angebote ändern und zusammenfassen. Für einen Vertriebsinnendienst mit Standardprodukten und sauberen Preisdaten spart das spürbar Zeit. Vor dem Go-live brauchen Sie einen gepflegten Katalog und synchronisierte Preise, und ich würde Konfigurationsregeln in Salesforce sowie Rabattgrenzen mit passendem Freigabe-Workflow dazunehmen. Bei konfigurierten Maschinen, deren Regeln außerhalb von Salesforce liegen, hilft der Standardagent ohne eigene Integration nicht.

## Was kann der Angebotsagent in Revenue Cloud?

Salesforce hat Angebote per Agent für Revenue Cloud im Juli 2025 angekündigt; die erweiterten Angebotsaktionen folgten im Herbst mit dem Release Winter '26. In der [Ankündigung](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) beschreibt ein Vertriebsmitarbeiter, was er braucht, und der Agent erzeugt das Angebot, "automatically pulling the correct products, pricing, and terms". Die Schlagzeilenzahlen stammen aus dem eigenen Vertrieb von Salesforce: 75 Prozent weniger Zeit für Angebote und 87 Prozent weniger Klicks. Das ist eine Herstellerangabe aus einem einzigen Unternehmen und seinem eigenen Vertrieb. In den Business Case eines Maschinenbauers würde ich sie nicht schreiben.

Der [Trailhead-Quick-Start zum Angebotsagenten](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent) beschreibt den Umfang genauer. Der Agent

- erstellt und ändert Angebote, fasst sie zusammen und beachtet rollenbasierte Zugriffsrechte,
- folgt Katalog- und Fulfillment-Regeln und bleibt so bei Produkten, die der Katalog erlaubt, garantiert aber nicht, dass jede Konfiguration baubar ist,
- hält Preise und Rabatte innerhalb der Leitplanken des Systems,
- bearbeitet Neugeschäft, Nachträge zu Assets und Änderungen an Angeboten.

Die Arbeit erledigt der Subagent Quote Management, dessen Aktionen auf Flows beruhen. In der Übung fragen Sie 15 Headsets mit 15 Prozent Rabatt für einen Account und eine Opportunity an, ändern den Rabatt dann auf 10 Prozent und versenden das Angebot anschließend selbst von der Opportunity aus mit einer E-Mail-Vorlage. Die Salesforce-Hilfe nennt einen zweiten Baustein, den Subagenten Product Selection für Produktsuche und Filter. Auf salesforce.com heißt das Produkt Revenue Cloud; Hilfe und Trailhead führen den Agenten unter Agentforce Revenue Management oder Revenue Management.

## Katalog, Preise und Regeln kommen vor dem Agenten

Der Agent liest dieselben Datensätze wie Ihr Innendienst. Was eine erfahrene Kollegin aus Gewohnheit korrigiert, gibt der Agent einfach weiter. Die Vorbereitung ist deshalb vor allem Arbeit an Daten und Regeln:

- **Katalog.** Jedes verkaufsfähige Produkt, jede Option und jedes Ersatzteil als Katalogeintrag mit Aktiv-Kennzeichen und einer Beschreibung, wie sie ein Vertriebsmitarbeiter eintippen würde. Wie Sie Varianten abbilden, ohne den ERP-Materialstamm zu kopieren, beschreibt das Kapitel [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/).
- **Synchronisierte Preisdaten.** Die Einrichtung auf Trailhead beginnt mit Sync Pricing Data im Salesforce Pricing Setup. Ohne synchronisierte Preise liefert der Agent kein brauchbares Angebot.
- **Konfigurationsregeln in Salesforce.** Der Agent hält sich an die Katalogregeln. Liegen Ihre Regeln in der SAP-Variantenkonfiguration oder im Kopf eines Konstrukteurs, sehen die Standardaktionen sie nicht; das ginge nur über eine eigene Aktion mit Schnittstelle.
- **Rabattgrenzen als Freigaben.** Der Agent setzt einen Rabatt, den der Vertrieb verlangt. Ob dieser Rabatt eine Freigabe braucht, sollte der Freigabe-Workflow entscheiden, wie in [Rabattfreigaben in Revenue Cloud](../revenue-cloud-rabattfreigaben/) beschrieben.
- **Agentforce-Einrichtung.** Agentforce aktiviert, ein Mitarbeiter-Agent mit dem Subagenten Quote Management, ein Permission Set, das den Zugriff auf den Agenten erlaubt, und die Suchindizierung für die Produktsuche. Prüfen Sie, welche Edition und welches Add-on der Agent braucht, und lesen Sie die [Considerations](https://help.salesforce.com/s/articleView?id=ind.qocal_agentforce_considerations.htm&language=en_US&type=5) in der Hilfe: Stand 9. November 2026 unterstützt der Agent nur Englisch (en_US). Als Mitarbeiter-Agent gelten für ihn außerdem die Considerations und die Abrechnung dieses Agententyps. Für einen deutschsprachigen Innendienst ist das der erste Prüfpunkt.

Ich würde zuerst zählen, welcher Anteil der Produkte sich mit den Worten finden lässt, die Kunden benutzen. Ist er niedrig, beheben Sie das vor dem Pilot.

## Winter '27 bringt Self-Service, Partner und Verlängerungen

Mit dem Release [Winter '27](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), allgemein verfügbar seit dem 12. Oktober 2026, kündigt Salesforce Angebote per Agent für drei Gruppen an: "self-service quoting for customer buyers, integrated quoting for partners, and automated renewal package assembly for account executives". Kunden bestellen ohne Vertriebsmitarbeiter, Partner erstellen Angebote, ohne ihren Arbeitsbereich zu verlassen, und Account Executives erhalten vor einer Verlängerung "a drafted quote and risk signals".

Verlängerungsangebote selbst konnte der Agent schon vorher anlegen; neu ist das vorbereitete Verlängerungspaket mit Risikosignalen. Prüfen Sie in den Release Notes für jede der drei Funktionen, für welche Edition und welche Nutzer sie gilt. Für Hersteller ist der Verlängerungsentwurf der interessanteste Teil. Wartungs- und Fernüberwachungsabos verlängern sich jedes Jahr, und das Verlängerungsangebot vorzubereiten ist Routinearbeit. Partner- und Self-Service-Angebote werfen zuerst kaufmännische Fragen auf: Welche Preise sieht ein Händler, und darf das Self-Service-Angebot eines Kunden das Angebot des Händlers unterbieten?

```hinweis offen
Die Hilfe dokumentiert eine Einrichtungsseite für den Zugriff von Communities und Partnern auf Agentforce in Revenue Management. Die Lizenzen für externe Nutzer sind ein eigener Klärungspunkt.
```

Wenn Ihre Händler stattdessen in Manufacturing Cloud Angebote erstellen, sehen Sie sich den [AI Partner Sales Assistant für Händlerangebote](../ki-angebote-haendler-partner-sales-assistant/) an. Zwei Angebotsagenten für zwei Angebotsmodelle würde ich vermeiden.

## Was kostet der Angebotsagent?

Es gibt zwei Kostenblöcke. Erstens die Revenue-Cloud-Lizenzen der Nutzer, für die der Agent arbeitet. Zweitens der Agent selbst. Im Verbrauchsmodell mit Flex Credits zahlen Sie je Aktion nach den Sätzen der [Agentforce-Preisseite](https://www.salesforce.com/agentforce/pricing/) und der [Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf); Salesforce bietet auch Agentforce-Lizenzen pro Nutzer an. Prüfen Sie also, welches Modell Ihr Vertrag nutzt:

```kennzahlen
500 $ | je 100.000 Flex Credits
20 | Flex Credits je Standardaktion
0,10 $ | je Standardaktion in Produktion
quelle: Agentforce-Preisseite und Flex-Credits-Rate-Card von Salesforce, 3. November 2026
```

Prompts kommen je nach Modellstufe dazu.

Eine grobe Schätzung, als Annahme: Ein Angebotsdialog braucht fünf Aktionen, etwa Account finden, Produkte suchen, Angebot anlegen, Positionen hinzufügen und Rabatt setzen. Das sind 100 Credits oder 0,50 Dollar je Angebot in Produktion. Das ist der Idealfall: Schon ein einzelnes Produkt hinzuzufügen kann mehrere Aktionen brauchen, Angebote mit vielen Positionen, Rückfragen oder Wiederholungen kosten also mehr. Bei 1.500 Agentenangeboten im Monat liegen Sie bei rund 750 Dollar plus Prompts. Auch Tests in der Sandbox verbrauchen Credits, 16 statt 20 je Aktion. Wie Sie alle Zähler schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), und das Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/) der KI-Masterclass macht daraus ein Budget.

## Wann ist der Angebotsagent das falsche Werkzeug?

In vier Fällen würde ich ihn nicht oder noch nicht einsetzen:

1. **Auftragsbezogene Konstruktion.** Wird jede Maschine für den Auftrag konstruiert, stammt das Angebot aus der Konstruktion und nicht aus einem Katalog.
2. **Regeln außerhalb von Salesforce.** Liegt die Konfigurationslogik in der SAP-Variantenkonfiguration oder im PLM, bietet der Agent Kombinationen an, die sich nicht bauen lassen.
3. **Preise nur in SAP-Konditionen.** Hält Salesforce nur Listenpreise und stammt der Nettopreis aus SAP, nennt der Agent den falschen Preis, solange die Preisfindung SAP nicht abfragt.
4. **Wenige Angebote mit hohem Wert.** Bei zehn Angeboten im Monat mit wochenlanger Verhandlung zählt ein guter Vertriebsingenieur mehr als ein Agent.

## Rechenbeispiel: Ersatzteil- und Nachrüstangebote im Innendienst

Ein Hersteller von Verpackungsmaschinen betreibt einen Innendienst, der Ersatzteil- und Nachrüstanfragen von Bestandskunden beantwortet: Verschleißteilsätze, Upgrade-Pakete und Servicestunden. Die Preise stehen in Salesforce-Preisbüchern und werden jede Nacht aus SAP synchronisiert, und der Katalog hat saubere Beschreibungen. Der Innendienst bearbeitet sehr viele kleine Angebote.

Hier passt der Agent gut. Eine Mitarbeiterin tippt "Verschleißteilsatz für Linie 3 plus zwei Servicetage, 10 Prozent Rabatt", und der Agent findet den Satz und die Serviceposition im Katalog und erstellt das Angebot für den Account des Kunden. Rabatte über der Grenze gehen in den Freigabe-Workflow. Angebote für neue Maschinen bleiben bei den Vertriebsingenieuren, weil deren Konfigurationsregeln noch in SAP liegen. Der Agent startet in einem Land und wird mit echten Anfragen aus dem letzten Quartal getestet.

## 30 Testanfragen für eine Angebotsart schreiben

Wählen Sie eine Angebotsart mit Standardprodukten und synchronisierten Preisen, schreiben Sie 30 Testanfragen aus echten Fällen und legen Sie für jede das erwartete Angebot fest. Lassen Sie diese in einer Sandbox laufen, bevor ein Kunde oder Händler ein Agentenangebot sieht, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Wo Agenten in der Fertigung über Angebote hinaus sinnvoll sind, zeigt das Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/). Den ganzen Weg vom Angebot zum Auftrag beschreibt das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/).
