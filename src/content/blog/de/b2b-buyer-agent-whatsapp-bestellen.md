---
title: "B2B Buyer Agent: Bestellen per WhatsApp und SMS"
description: "Was der Buyer Agent in Salesforce B2B Commerce heute für Händler kann, was Bestellen per WhatsApp und SMS braucht und warum Preise aus Systemen kommen müssen."
pubDate: 2026-10-28
lang: de
slug: b2b-buyer-agent-whatsapp-bestellen
translationKey: commerce-buyer-agent-whatsapp
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Buyer Agent, Agentforce, WhatsApp, Händler, Nachbestellung]
takeaways:
  - "Die Vorlage Buyer Agent (B2B) bringt fünf Subagenten mit, darunter Produktsuche, Aufträge mit Status und Nachbestellung sowie Accountwechsel."
  - "WhatsApp und SMS nennt Salesforce als Kanäle. Den ganzen Auftrag im Chat samt Zahlung kündigt Salesforce als Carter für Käufer für Januar 2027 an."
  - "Lizenzen: Agentforce Commerce for B2B, Service Cloud oder Sales and Service Edition, Agentforce, Einstein for Service und Einstein generative AI."
  - "Vertragspreise, Rabatte und Kredit kommen aus der Preisfindung des Shops oder dem ERP. Das Sprachmodell formuliert nur, was diese Systeme liefern."
  - "Starten Sie mit Status und Nachbestellung für eine Pilotgruppe auf einem funktionierenden Shop, und behandeln Sie jede Händlernachricht als unsicher."
faq:
  - q: "Was ist der B2B Buyer Agent von Salesforce?"
    a: "Der Buyer Agent ist ein Agentforce-Agent für Shops in B2B Commerce. Er wird aus der Vorlage Buyer Agent (B2B) angelegt, sucht Produkte, zeigt Auftragsstatus und Positionen, bestellt frühere Aufträge nach und lässt Käufer zwischen den Accounts wechseln, für die sie bestellen dürfen."
  - q: "Können Händler mit Salesforce B2B Commerce per WhatsApp bestellen?"
    a: "Salesforce nennt WhatsApp und SMS in der Ankündigung vom Juni 2026 als Kanäle des Buyer Agent. Den vollständigen Auftrag im Chat, mit Bestätigung und Zahlung zum Vertragspreis, führt Salesforce als Carter für Käufer mit Verfügbarkeit im Januar 2027."
  - q: "Welche Lizenzen braucht der B2B Buyer Agent?"
    a: "Trailhead nennt Agentforce Commerce for B2B, Service Cloud oder Sales and Service Edition (EE, UE oder PXE), die Add-ons Agentforce und Einstein for Service sowie Einstein generative AI, zu dessen Einrichtung Data 360 gehört."
  - q: "Was kostet der B2B Buyer Agent?"
    a: "Einen eigenen Preis für den Buyer Agent habe ich auf den offiziellen Seiten nicht gefunden. Das Agentforce-Add-on ist Voraussetzung. Fragen Sie also, wie Agentennutzung in Ihrem Vertrag gezählt wird, und rechnen Sie mit Ihrer eigenen Zahl an Händlergesprächen."
draft: false
---

Mit dem B2B Buyer Agent suchen Händler heute im Chat Produkte, fragen den Auftragsstatus ab und bestellen frühere Aufträge nach. Den kompletten Auftrag per WhatsApp oder SMS, mit Bestätigung und Zahlung zum Vertragspreis, kündigt Salesforce unter dem Namen Carter für Käufer erst für Januar 2027 an. Ich würde deshalb mit Auftragsstatus und Nachbestellung für eine Pilotgruppe von Händlern beginnen und den Rest ergänzen, wenn die Antworten verlässlich sind. Voraussetzung sind ein funktionierender B2B-Shop mit richtigen Käufergruppen und Preisen, die Lizenzen, die Trailhead nennt, und Systeme, die Vertragspreise und Kreditentscheidungen liefern.

## Was kann der B2B Buyer Agent heute?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, hat einen eigenen Agenten für Käufer. In der [Trailhead-Einheit zum Aufbau des Buyer Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/build-a-guided-shopping-ai-agent) legen Sie ihn im Setup unter Agents aus der Vorlage "Buyer Agent (B2B)" an. Die Vorlage bringt fünf Subagenten mit. Ein Subagent ist ein Bündel aus Anweisungen und Aktionen für eine Aufgabe:

- **Commerce Global Instructions:** Regeln für den ganzen Agenten, darunter die ID des Shops, für den er arbeitet.
- **Commerce Product Search Assistant:** findet Produkte und schlägt Kategorien vor, auch wenn eine Suche nichts liefert.
- **Commerce Order:** zeigt Auftragsstatus und Positionen und bestellt nach, indem er einen früheren Auftrag kopiert.
- **Commerce Effective Accounts:** lässt Käufer zwischen den Accounts wechseln, für die sie bestellen dürfen.
- **Commerce User Verification:** prüft die Identität, bevor der Agent sensible Daten wie Aufträge zeigt.

Eigene Subagenten lassen sich ergänzen, etwa eine Übergabe an den Innendienst oder ein Flow, der eine Bestellung mit Bestellnummer anlegt. Der Agent läuft unter einem Agent User, und laut Salesforce bestimmt dieser Nutzer, worauf der Buyer Agent zugreifen und was er tun darf.

Die [Einführungseinheit auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) nennt denselben Kern: Produktsuche nach Name, Kategorie oder Spezifikation, Überblick über frühere und laufende Aufträge, Nachbestellungen und Status von der Bestellung bis zur Lieferung. Der [Salesforce-Blogbeitrag zu B2B Commerce vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) führt den Buyer Agent im Abschnitt "B2B Commerce innovations (GA June 2026)" und nennt ihn einen Einkaufsassistenten rund um die Uhr.

Für einen Hersteller heißt das: Der Agent deckt die Fragen ab, die der Innendienst am häufigsten am Telefon beantwortet, also "Wo ist meine Bestellung?" und "Bitte wie letztes Mal". Einen Shop ersetzt er nicht. Jede Antwort kommt aus dem Katalog, den Berechtigungen und den Aufträgen, die der Shop schon hat.

## WhatsApp und SMS heute, Carter für Käufer ab Januar 2027

Hier lohnt genaues Lesen. Im Blogbeitrag vom Juni steht, der Buyer Agent sei dort verfügbar, wo der Käufer ist, "WhatsApp, SMS, and more". Die [Trailhead-Einheit zur Anbindung an einen Kanal](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/connect-a-guided-shopping-agent-to-a-channel) beschreibt die Einrichtung über Messaging for In-App and Web: Omni-Channel aktivieren, eine Queue anlegen, einen Omni-Channel-Flow bauen, der an den Buyer Agent routet und eine Ausweich-Queue hat, dann den Messaging-Kanal anlegen. Die Einheit sagt ausdrücklich, dass diese Schritte nicht für Standard- oder Enhanced-Kanäle von WhatsApp und SMS gelten.

Auf der [Innovationsseite zu Commerce](https://www.salesforce.com/de/commerce/innovations/) führt Salesforce "Carter für Käufer" mit "AV Jan. 27". Laut Beschreibung läuft dann die ganze Bestellung im Chat, mit Nachbestellung, Bestätigung und Zahlung zum Vertragspreis, über WhatsApp oder per SMS.

Meine Lesart: Der Web-Chat im Shop ist heute dokumentiert. Für WhatsApp und SMS fragen Sie Ihr Account-Team, welche Einrichtung für B2B in Ihrer Org unterstützt wird, und planen den vollständigen Bestellablauf mit Zahlung für 2027. Ich würde außerdem früh mit Datenschutz und Betriebsrat klären, ob Bestellungen überhaupt über WhatsApp laufen dürfen und welche Telefonnummer zu welchem Käufer-Account gehört.

## Welche Lizenzen braucht der Buyer Agent?

Die Einführungseinheit auf Trailhead nennt diese Voraussetzungen:

| Bestandteil | Voraussetzung |
|---|---|
| Commerce-Lizenz | Agentforce Commerce for B2B |
| Edition | Service Cloud oder Sales & Service Edition: EE, UE oder PXE |
| Add-on-Lizenzen | Agentforce und Einstein for Service |
| Plattform | Einstein generative AI, eingerichtet zusammen mit Data 360 |

Zwei Punkte fallen auf. Erstens braucht der Buyer Agent Service Cloud. Wer neben dem Shop nur Sales Cloud betreibt, kauft also mehr als den Agenten. Zweitens habe ich auf den offiziellen Seiten keinen eigenen Preis für den Buyer Agent gefunden. Die Nutzung läuft über das Agentforce-Add-on, die Kosten hängen also an Ihrem Vertrag und Ihrem Volumen. Wie so eine Rechnung für einen Serviceagenten im Händlergeschäft aussieht, zeige ich in [Agentforce-Serviceagent für Händler: Kosten pro Monat](../serviceagent-haendleranfragen-kosten/).

## Vertragspreis und Kredit kommen aus Shop und ERP

Carter für Käufer verspricht Zahlung zum Vertragspreis. Für einen Hersteller ist der Vertragspreis die heikelste Zahl im ganzen Chat. Er muss aus der Preisfindung des Shops kommen, die ihrerseits Preisbücher liest oder das ERP aufruft, und nie aus dem Sprachmodell.

```ablauf
sf: Buyer Agent, Preisfindung Shop, Order Summaries
erp: ERP
ext: Händler-Chat
Händler-Chat --Frage--> Buyer Agent
Buyer Agent --Preis--> Preisfindung Shop
Preisfindung Shop --Konditionen--> ERP
Preisfindung Shop ..Vertragspreis..> Buyer Agent
Buyer Agent --Status--> Order Summaries
ERP ..hält aktuell..> Order Summaries
Buyer Agent ..Antwort..> Händler-Chat
```

Dasselbe gilt für Kreditlimits, gesperrte Kunden und Liefertermine. Das Modell versteht die Frage des Händlers und formuliert die Antwort. Welcher Preis gilt, ob der Kunde auf Rechnung bestellen darf und wann die Ware rausgeht, entscheiden Code, Shop oder ERP. Die allgemeine Regel für Agenten erkläre ich im Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/) der KI-Masterclass, und wie ein bestätigter Liefertermin aus SAP kommt, in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

```hinweis achtung
Zeigt der Shop Listenpreise, weil Vertragspreise nur in SAP-Konditionen stehen, nennt auch der Agent Listenpreise. Klären Sie den Preis-Master, bevor der Agent live geht.
```

## Chat-Text von Händlern ist nicht vertrauenswürdig

Jede Nachricht eines Händlers erreicht den Agenten als Text, und Text kann Anweisungen enthalten. Im Shop-Chat ist der Käufer angemeldet. Bei WhatsApp oder SMS muss der Agent erst wissen, wer schreibt, dafür gibt es den Subagenten Commerce User Verification. Danach kann der Käufer über Commerce Effective Accounts den Account wechseln, die Liste der Accounts pro Käufer muss also stimmen.

Ich würde so planen, als ob ein Filter eines Tages eine eingeschleuste Anweisung übersieht, und dafür sorgen, dass das wenig Schaden anrichtet:

- Der Agent User darf nur die Shopdaten lesen, die auch der Käufer sehen darf.
- Aktionen, die Aufträge anlegen oder Daten ändern, prüfen im Code, nicht im Prompt.
- Keine ausgehende Aktion schickt Daten an eine Adresse, die ein Händler beeinflussen kann.

Angriffsmuster und Gegenmaßnahmen beschreibe ich in [Prompt Injection im Händlerportal: Agentforce schützen](../prompt-injection-haendlerportal-agentforce/).

## Rechenbeispiel: Pilot mit 15 von 150 Händlern

Angenommen, ein Maschinenbauer verkauft Ersatzteile und Verbrauchsmaterial über einen B2B-Shop an 150 Händler in Deutschland und Österreich. Der Innendienst nimmt rund 40 Anrufe am Tag an, die meisten zu Auftragsstatus oder Wiederholungsbestellungen von Filtern und Verschleißteilen.

Im Pilot bekommen 15 Händler mit vielen Wiederholungsbestellungen den Buyer Agent im Web-Chat des Shops. Nur zwei Subagenten arbeiten wirklich: Commerce Order für Status und Nachbestellung und der Commerce Product Search Assistant. Der Auftragsstatus kommt aus Order Summaries, die das ERP aktuell hält. Übergaben gehen an eine benannte Queue im Innendienst. Nach vier Wochen vergleichen Sie die Anrufe pro Pilothändler mit den Vormonaten und lesen jedes Gespräch, das der Agent übergeben hat.

Erst wenn diese Antworten verlässlich sind, würde ich einen Messaging-Kanal wie WhatsApp ergänzen, und erst mit Carter für Käufer würde ich den Agenten Aufträge mit Zahlung abschließen lassen. Schnelles Nachbestellen im Shop selbst ist das Thema von [Nachbestellen im B2B-Shop: Vorlagen, CSV, Reorder](../nachbestellen-b2b-shop-vorlagen/), die Backoffice-Seite der Agenten beschreibe ich in [Merchandising Agent: Was er im Teilekatalog leistet](../merchandising-agent-teilekatalog/).

## Erster Schritt: den Shop ohne Agent prüfen

1. **Erst den Shop prüfen.** Käufergruppen, Berechtigungen, Preise und Auftragsstatus müssen ohne Agent stimmen. Ein Agent macht Fehler in diesen Daten schneller sichtbar, er behebt sie nicht.
2. **Lizenzen prüfen.** Service-Cloud-Edition, Add-ons Agentforce und Einstein for Service und die Einrichtung von Data 360, wie Trailhead sie nennt.
3. **Zwei Aufgaben auswählen.** Auftragsstatus und Nachbestellung, mit einem Testset aus echten Händlerfragen und einem Übergabeweg.
4. **Den Kanal festlegen.** Erst Web-Chat im Shop, WhatsApp und SMS, wenn Identität, Datenschutz und Support geklärt sind.
5. **Aufschreiben, was Code entscheidet.** Preis, Kredit, Liefertermin und Auftragsanlage bleiben in Shop und ERP.

Das Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) stellt den Buyer Agent neben die Migration des Shops und die Einführung bei Händlern. Wenn die Schnittstellen zu Ihrem ERP der offene Punkt sind, lesen Sie weiter bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
