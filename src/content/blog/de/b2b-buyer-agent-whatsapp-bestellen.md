---
title: "B2B Buyer Agent: Bestellen per WhatsApp und SMS"
description: "Was der Buyer Agent in B2B Commerce heute für Händler im Web-Chat, per WhatsApp und SMS kann, was Carter für Käufer ergänzt und wie Verbrauch und Preise laufen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-buyer-agent-whatsapp-bestellen
translationKey: commerce-buyer-agent-whatsapp
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Buyer Agent, Agentforce, WhatsApp, Händler, Nachbestellung]
takeaways:
  - "Die aktuelle Vorlage heißt Agentforce for Guided Shopping - B2B; ihre Subagenten decken Prüfung, Produktsuche und Details, Warenkorb, Aufträge und Accounts ab."
  - "Enhanced WhatsApp und SMS sind dokumentierte Kanäle, nur eingehend. Bestellen mit Zahlung im Chat plant Salesforce als Carter für Käufer für Januar 2027."
  - "Salesforce rechnet den Agenten nach Verbrauch ab: Messaging-Gespräche in 24-Stunden-Fenstern, Einstein Requests oder Flex Credits und Data 360."
  - "Vertragspreise, Rabatte und Kredit kommen aus der Preisfindung des Shops oder dem ERP. Das Sprachmodell formuliert nur, was diese Systeme liefern."
  - "Starten Sie mit Status und Nachbestellung für eine Pilotgruppe auf einem funktionierenden Shop, und behandeln Sie jede Händlernachricht als unsicher."
faq:
  - q: "Was ist der B2B Buyer Agent von Salesforce?"
    a: "Der Buyer Agent ist ein Agentforce-Agent für Shops in B2B Commerce. Er wird aus der Vorlage Agentforce for Guided Shopping - B2B angelegt, sucht Produkte, zeigt Produktdetails, füllt den Warenkorb, zeigt Auftragsstatus und Positionen, bestellt frühere Aufträge nach und lässt Käufer zwischen den Accounts wechseln, für die sie bestellen dürfen."
  - q: "Können Händler mit Salesforce B2B Commerce per WhatsApp bestellen?"
    a: "Die Salesforce-Hilfe dokumentiert Enhanced WhatsApp und Enhanced SMS als Kanäle des Guided-Shopping-Agenten, für Gespräche, die der Käufer beginnt. Den vollständigen Auftrag im Chat, mit Bestätigung und Zahlung zum Vertragspreis, plant Salesforce als Carter für Käufer mit Verfügbarkeit im Januar 2027."
  - q: "Welche Lizenzen braucht der B2B Buyer Agent?"
    a: "Das Trailhead-Modul nennt Agentforce Commerce for B2B, Service Cloud oder Sales and Service Edition, Agentforce, Einstein for Service und Einstein generative AI mit Data 360. Die aktuelle Hilfe wiederholt diese Liste nicht, lassen Sie sich die SKUs deshalb im Angebot bestätigen."
  - q: "Was kostet der B2B Buyer Agent?"
    a: "Die Salesforce-Hilfe nennt ihn verbrauchsbasiert: Jedes Gesprächsfenster zählt unter Agentforce ASA Messaging, Modellaufrufe verbrauchen Einstein Requests oder Flex Credits, und Data 360 zählt ebenfalls. Einen eigenen Listenpreis habe ich nicht gefunden, die Sätze stehen im Bestellformular."
draft: false
---

Mit dem B2B Buyer Agent suchen Händler heute im Chat Produkte, füllen den Warenkorb, fragen den Auftragsstatus ab und bestellen frühere Aufträge nach, auch per WhatsApp oder SMS. Den kompletten Auftrag dort, mit Bestätigung und Zahlung zum Vertragspreis, plant Salesforce unter dem Namen Carter für Käufer erst für Januar 2027. Ich würde deshalb mit Auftragsstatus und Nachbestellung für eine Pilotgruppe von Händlern beginnen und den Rest ergänzen, wenn die Antworten verlässlich sind. Voraussetzung sind ein funktionierender B2B-Shop mit richtigen Käufergruppen und Preisen, ein Budget für den Verbrauch und Systeme, die Vertragspreise und Kreditentscheidungen liefern.

## Was kann der B2B Buyer Agent heute?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, hat einen eigenen Agenten für Käufer. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_guided_shopping_create_agent.htm&language=en_US&type=5) legen Sie ihn im Agentforce Studio aus der Vorlage "Agentforce for Guided Shopping - B2B" an; ältere Trailhead-Einheiten nennen sie noch "Buyer Agent (B2B)". Die Vorlage bringt Standard-Subagenten mit. Ein Subagent ist ein Bündel aus Anweisungen und Aktionen für eine Aufgabe:

- **Commerce Customer Verification:** prüft die Identität, bevor der Agent sensible Daten wie Aufträge zeigt.
- **Commerce Product Search Assistant** und **Commerce Product Details:** finden Produkte, schlagen Kategorien vor und zeigen Produktdetails.
- **Commerce Cart Management:** legt Produkte in den Warenkorb, nur für einfache Produkte.
- **Commerce Order:** zeigt Auftragsstatus und Positionen und bestellt nach, indem er einen früheren Auftrag in den Warenkorb kopiert.
- **Commerce Effective Accounts:** lässt Käufer zwischen den Accounts wechseln, für die sie bestellen dürfen.

Eigene Subagenten lassen sich ergänzen, etwa eine Übergabe an den Innendienst oder ein Flow, der eine Bestellung mit Bestellnummer anlegt. Der Agent läuft unter einem Agent User, und laut Salesforce bestimmt dieser Nutzer, worauf der Buyer Agent zugreifen und was er tun darf.

Die [Einführungseinheit auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) nennt denselben Kern: Produktsuche nach Name, Kategorie oder Spezifikation, Überblick über frühere und laufende Aufträge, Nachbestellungen und Status von der Bestellung bis zur Lieferung. Der [Salesforce-Blogbeitrag zu B2B Commerce vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) führt den Buyer Agent im Abschnitt "B2B Commerce innovations (GA June 2026)" und nennt ihn einen Einkaufsassistenten rund um die Uhr.

Für einen Hersteller heißt das: Der Agent deckt die Fragen ab, die der Innendienst am häufigsten am Telefon beantwortet, also "Wo ist meine Bestellung?" und "Bitte wie letztes Mal". Einen Shop ersetzt er nicht. Die Standardaktionen stützen Antworten zu Produkten, Berechtigungen und Aufträgen auf den Shop; eigene Aktionen, die andere Systeme abfragen, brauchen eigene Prüfungen.

## WhatsApp und SMS heute, Carter für Käufer geplant für Januar 2027

Hier lohnt genaues Lesen. Im Blogbeitrag vom Juni steht, der Buyer Agent sei dort verfügbar, wo der Käufer ist, "WhatsApp, SMS, and more". Die [Trailhead-Einheit zur Anbindung an einen Kanal](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/connect-a-guided-shopping-agent-to-a-channel) beschreibt die Einrichtung über Messaging for In-App and Web: Omni-Channel aktivieren, eine Queue anlegen, einen Omni-Channel-Flow bauen, der an den Buyer Agent routet und eine Ausweich-Queue hat, dann den Messaging-Kanal anlegen. Die Einheit sagt ausdrücklich, dass diese Schritte nicht für Standard- oder Enhanced-Kanäle von WhatsApp und SMS gelten.

Die [Hinweise in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_guided_shopping_considerations.htm&language=en_US&type=5) nennen Enhanced WhatsApp, Enhanced SMS und weitere Enhanced-Messaging-Kanäle für den Guided-Shopping-Agenten, mit drei Grenzen, die für Händler zählen: Der Agent unterstützt nur Gespräche, die der Käufer beginnt, WhatsApp-Nachrichten über 4.096 Zeichen und SMS über 912 Zeichen (396 mit Sonderzeichen) werden nicht zugestellt und bekommen keine Antwort, und jedes Gesprächsfenster dauert 24 Stunden.

Auf der [Innovationsseite zu Commerce](https://www.salesforce.com/de/commerce/innovations/) führt Salesforce "Carter für Käufer" mit "AV Jan. 27", einem Roadmap-Termin, der sich noch verschieben kann. Laut Beschreibung läuft dann die ganze Bestellung im Chat, mit Nachbestellung, Bestätigung und Zahlung zum Vertragspreis, über WhatsApp oder per SMS.

Meine Lesart: Web-Chat, WhatsApp und SMS sind heute für Suche, Warenkorb, Status und Nachbestellung dokumentiert, jeder Kanal mit eigener Einrichtung. Den vollständigen Bestellablauf mit Zahlung im Chat plant Salesforce für 2027. Ich würde außerdem früh mit Datenschutz und Betriebsrat klären, ob Bestellungen überhaupt über WhatsApp laufen dürfen und welche Telefonnummer zu welchem Käufer-Account gehört.

## Welche Lizenzen und Verbräuche braucht der Buyer Agent?

Die Einführungseinheit auf Trailhead nennt diese Voraussetzungen:

| Bestandteil | Voraussetzung |
|---|---|
| Commerce-Lizenz | Agentforce Commerce for B2B |
| Edition | Service Cloud oder Sales & Service Edition: EE, UE oder PXE |
| Add-on-Lizenzen | Agentforce und Einstein for Service |
| Plattform | Einstein generative AI, eingerichtet zusammen mit Data 360 |

Die aktuelle Hilfe wiederholt diese Liste nicht, deshalb würde ich mir die SKUs im Angebot bestätigen lassen, vor allem, ob neben dem Shop wirklich Service Cloud nötig ist. Klarer sind die laufenden Kosten: Die Salesforce-Hilfe nennt den Agenten verbrauchsbasiert. Jedes 24-Stunden-Gesprächsfenster zählt unter Agentforce ASA Messaging, Modellaufrufe verbrauchen Einstein Requests oder Flex Credits, und Verarbeitung und Speicher in Data 360 zählen ebenfalls. Einen eigenen Listenpreis habe ich nicht gefunden, die Sätze kommen also aus Ihrem Bestellformular und das Volumen aus Ihren Händlergesprächen. Wie so eine Rechnung für einen Serviceagenten im Händlergeschäft aussieht, zeige ich in [Agentforce-Kosten für Hersteller](../flex-credits-agentforce-kosten-pro-aktion/).

## Vertragspreis und Kredit kommen aus Shop und ERP

Carter für Käufer verspricht Zahlung zum Vertragspreis. Für einen Hersteller ist der Vertragspreis die heikelste Zahl im ganzen Chat. Er muss aus der Preisfindung des Shops kommen, nie aus dem Sprachmodell. Je nach Architektur liest diese Preisfindung Preisbücher, vertragsbasierte oder erweiterte Preise oder ruft das ERP auf; die Grafik zeigt ein Beispiel.

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

Jede Nachricht eines Händlers erreicht den Agenten als Text, und Text kann Anweisungen enthalten. Im Shop-Chat ist der Käufer angemeldet. Bei WhatsApp oder SMS muss der Agent erst wissen, wer schreibt. Der Subagent Commerce Customer Verification ist dafür ein Baustein, keine fertige Lösung: Legen Sie fest, wie eine Telefonnummer einem Käufer zugeordnet wird, wie lange eine geprüfte Sitzung gilt und welche Aktionen eine neue Bestätigung brauchen. Danach kann der Käufer über Commerce Effective Accounts den Account wechseln, die Liste der Accounts pro Käufer muss also stimmen.

Ich würde so planen, als ob ein Filter eines Tages eine eingeschleuste Anweisung übersieht, und dafür sorgen, dass das wenig Schaden anrichtet:

- Der Agent User darf nur die Shopdaten lesen, die auch der Käufer sehen darf, und ein Negativtest belegt, dass Käufer A nie die Aufträge von Käufer B sieht.
- Aktionen, die Aufträge anlegen oder Daten ändern, prüfen im Code, nicht im Prompt.
- Keine ausgehende Aktion schickt Daten an eine Adresse, die ein Händler beeinflussen kann.

Angriffsmuster und Gegenmaßnahmen beschreibe ich in [Prompt Injection im Händlerportal: Agentforce schützen](../prompt-injection-haendlerportal-agentforce/).

## Rechenbeispiel: Pilot mit 15 von 150 Händlern

Angenommen, ein Maschinenbauer verkauft Ersatzteile und Verbrauchsmaterial über einen B2B-Shop an 150 Händler in Deutschland und Österreich. Der Innendienst nimmt rund 40 Anrufe am Tag an, die meisten zu Auftragsstatus oder Wiederholungsbestellungen von Filtern und Verschleißteilen.

Im Pilot bekommen 15 Händler mit vielen Wiederholungsbestellungen den Buyer Agent im Web-Chat des Shops. Nur zwei Subagenten arbeiten wirklich: Commerce Order für Status und Nachbestellung und der Commerce Product Search Assistant. Der Auftragsstatus kommt aus Order Summaries, die das ERP aktuell hält. Übergaben gehen an eine benannte Queue im Innendienst. Nach vier Wochen vergleichen Sie die Anrufe pro Pilothändler mit den Vormonaten und lesen jedes Gespräch, das der Agent übergeben hat.

Erst wenn diese Antworten verlässlich sind, würde ich einen Messaging-Kanal wie WhatsApp ergänzen, und erst wenn Carter für Käufer allgemein verfügbar ist, würde ich den Agenten Aufträge mit Zahlung abschließen lassen. Schnelles Nachbestellen im Shop selbst ist das Thema von [Nachbestellen im B2B-Shop: Vorlagen, CSV, Reorder](../nachbestellen-b2b-shop-vorlagen/), die Backoffice-Seite der Agenten beschreibe ich in [Merchandising Agent: Was er im Teilekatalog leistet](../merchandising-agent-teilekatalog/).

## Den Shop ohne Agent prüfen

1. **Erst den Shop prüfen.** Käufergruppen, Berechtigungen, Preise und Auftragsstatus müssen ohne Agent stimmen. Ein Agent macht Fehler in diesen Daten schneller sichtbar, er behebt sie nicht.
2. **Lizenzen und Verbrauch prüfen.** SKUs im Angebot bestätigen lassen und Gespräche, Einstein Requests oder Flex Credits und Data 360 schätzen.
3. **Zwei Aufgaben auswählen.** Auftragsstatus und Nachbestellung, mit einem Testset aus echten Händlerfragen und einem Übergabeweg.
4. **Den Kanal festlegen.** Erst Web-Chat im Shop, WhatsApp und SMS, wenn Identität, Datenschutz und Support geklärt sind.
5. **Aufschreiben, was Code entscheidet.** Preis, Kredit, Liefertermin und Auftragsanlage bleiben in Shop und ERP.

Das Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) stellt den Buyer Agent neben die Migration des Shops und die Einführung bei Händlern. Wenn die Schnittstellen zu Ihrem ERP der offene Punkt sind, lesen Sie weiter bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
