---
title: "KI-Angebote für Händler: Partner Sales Assistant"
description: "Was AI Partner Sales Assistant und AI Sales Concierge in der Manufacturing Cloud leisten und welche Produkt-, Preis- und Rabattdaten vorher stimmen müssen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-angebote-haendler-partner-sales-assistant
translationKey: partner-sales-assistant-dealer-quotes
topic: ai
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Händlervertrieb, Angebote, Preise, KI-Agenten]
takeaways:
  - "Jeder Nutzer der Manufacturing-Aktionen braucht das Add-on Agentforce for Manufacturing, ab 150 US-Dollar. Lassen Sie Partnerlizenzen schriftlich klären."
  - "Liegen Händlerpreise nur als Konditionen in SAP, sehen die Standardaktionen nur Listenpreise. Der Preis-Master muss vorher festgelegt werden."
  - "Konfigurierte Maschinen bleiben beim Innendienst, bis der Agent die Regeln aufrufen kann. Ich starte mit Zubehör und Standardmaschinen."
  - "Reif ist ein KI-Angebot, wenn Ihr Innendienst es unverändert unterschreiben würde."
faq:
  - q: "Was macht der AI Partner Sales Assistant?"
    a: "Laut Produktseite der Manufacturing Cloud beschleunigt er den Vertrieb über Partner, indem er Produkte findet und Angebote in Sekunden erstellt. Salesforce führt ihn im Release Summer '26; die Salesforce-Hilfe dokumentiert die passende Vorlage als Agentforce for Industries Sales Concierge for Partners."
  - q: "Was unterscheidet ihn vom AI Sales Concierge?"
    a: "Sales Concierge for Customers (Winter '27) richtet sich an Kunden auf Ihrer Experience-Cloud-Site; einen Sales Concierge for Manufacturing gab es schon im Release Spring '26. Laut Release Highlights können Kunden dort Anlagen suchen, Händler finden und Angebote anfragen. Der Partner Sales Assistant richtet sich an Händler und Distributoren."
  - q: "Welche Daten müssen vor KI-Angeboten für Händler stimmen?"
    a: "Sie brauchen einen Produktdatensatz je verkaufsfähiger Variante mit einer Beschreibung, nach der ein Händler sucht, die Zuordnung von Zubehör zu Maschinen, einen gültigen Preis je Markt, Währung und Händlerstufe aus dem ERP sowie Konfigurationsregeln und Rabattgrenzen als Regeln."
  - q: "Was kostet ein KI-Angebot für Händler?"
    a: "Es gibt drei Kostenblöcke: den Portalzugang für Partnerbenutzer, das Add-on Agentforce for Manufacturing, das die Salesforce-Hilfe für jeden Nutzer der Aktionen verlangt und das die Preisseite der Manufacturing Cloud ab 150 US-Dollar im Monat ausweist, sowie den Verbrauch. Eine Standard-Aktion verbraucht in Produktion 20 Flex Credits; beim Listenpreis entspricht das 0,10 €. Dazu kommen gesondert gezählte Prompts."
draft: false
---

Der AI Partner Sales Assistant (Summer '26) hilft Händlern in der Manufacturing Cloud, Produkte zu finden und Angebote zu erstellen. Der AI Sales Concierge (Winter '27) macht dasselbe für Kunden auf Ihrer Experience-Cloud-Site. Beide Bezeichnungen sind Marketingnamen; die Salesforce-Hilfe dokumentiert die Vorlagen dahinter als Industries Sales Assistance und Sales Concierge for Partners. Sie sind eine neue Oberfläche für Ihre bestehenden Angebotsdaten. Diese Daten entscheiden. Bevor ein Händler ein KI-Angebot erhält, braucht jede verkaufsfähige Variante einen auffindbaren Produktdatensatz, einen Preis je Markt und Händlerstufe, eine Regel dafür, was baubar ist, und eine Rabattgrenze, die kein Modell aufweicht.

## Was leisten AI Partner Sales Assistant und AI Sales Concierge?

Beide stehen auf der [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/). Für Summer '26 verspricht Salesforce, mit dem AI Partner Sales Assistant den Vertrieb über Partner zu beschleunigen, weil er „finds products and builds quotes in seconds“. Für Winter '27 soll der AI Sales Concierge aus Self-Service-Besuchen qualifizierte Pipeline machen, mit derselben Formulierung: Er findet Produkte und erstellt Angebote in Sekunden. Winter '27 ist seit dem [12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

Die Release-Unterlagen ergänzen wenig. Die [Winter '27 Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) beschreiben Sales Concierge for Customers als KI-gestütztes Einkaufserlebnis auf Ihrer Experience-Cloud-Site, auf der Kunden „search assets, locate dealers, and request quotes“. Einen Sales Concierge for Manufacturing mit Produkt- und Zubehörsuche, Händlersuche und schneller Angebotserstellung nannten bereits die [Spring '26 Highlights](https://trailhead.salesforce.com/it/content/learn/modules/spring-26-release-highlights/see-whats-new-agentforce-manufacturing-media-public-sector-nonprofit). Zum Partner Sales Assistant fand ich in den [Summer '26 Highlights für Manufacturing](https://trailhead.salesforce.com/content/learn/modules/summer-26-release-highlights/see-whats-new-manufacturing-media-nonprofit-and-agentforce-net-zero) keinen Eintrag; dort stehen Garantieunterstützung, Musterverwaltung und Bestellungen.

```hinweis achtung
Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_overview.htm&language=en_US&type=5) sind die Vorlagen in der Enterprise, Performance und Unlimited Edition verfügbar, und jeder Benutzer, der die Aktionen nutzt, braucht das Add-on Agentforce for Manufacturing oder die Agentforce 1 Manufacturing Edition. Ob und wie das für externe Partnerbenutzer gilt, lassen Sie sich vor der Budgetplanung schriftlich bestätigen.
```

Für die Entscheidung zählt ein Unterschied. „Angebot anfragen“ und „Angebot erstellen“ sind verschiedene Dinge: Eine Anfrage geht an den Vertriebsinnendienst. Ein erstelltes Angebot weckt eine konkrete Preiserwartung, die der Händler Ihrem Unternehmen zurechnet, auch bevor es rechtlich bindend ist.

```vertiefung Für Admins
titel: Welche Agentenaktionen liegen darunter?
Die Navigation der Standard Agent Action Reference in der Salesforce-Hilfe führt im Bereich Manufacturing Aktionen von Agentforce for Manufacturing auf, etwa Search Product And Parts, Get Product Price Details, Get Price Books, Search Dealers for Products, Create Opportunity with Products and Preferred Seller und Create Quote from Opportunity. Die Salesforce-Hilfe dokumentiert sie als Teil der [Vorlage Industries Sales Assistance](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_industries_sales_assistance.htm&language=en_US&type=5) mit einem Sales-Concierge-Subagenten. Einige, etwa Search Dealers for Products, führen selbst Prompt-Templates aus, was für den Verbrauch zählt.
```

## Welcher Angebotsagent passt zu welchem Kanal?

Winter '27 bringt auch außerhalb der Manufacturing Cloud einen Angebotsagenten. Laut [Ankündigung zu Winter '27](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) decken die Revenue Management Agent Enhancements „self-service quoting for customer buyers, integrated quoting for partners“ ab, damit Partner Geschäfte abschließen, ohne ihren Arbeitsbereich zu verlassen.

| | AI Partner Sales Assistant | AI Sales Concierge | Revenue Management Agent |
|---|---|---|---|
| Release | Summer '26 | Winter '27 | Winter '27 |
| Wer nutzt ihn | Händler, Distributoren | Kunden auf Ihrer Site | Einkäufer beim Kunden, Partner |
| Was Salesforce sagt | Findet Produkte, erstellt Angebote | Findet Produkte, erstellt Angebote; Highlights: Angebot anfragen | Self-Service- und Partnerangebote |
| Produkt | Manufacturing Cloud | Manufacturing Cloud | Revenue Management, früher Revenue Cloud |

Ich würde danach entscheiden, wo Ihr Angebot heute entsteht. Erstellen Sie Angebote bereits in Revenue Management, früher Revenue Cloud (nicht Salesforce CPQ), schauen Sie zuerst auf dessen Agenten; was er heute kann, steht im Beitrag zum [Angebotsagenten in Revenue Cloud](/blog/revenue-cloud-angebotsagent-agentforce/). Arbeiten Händler mit Standard-Angeboten und Preisbüchern in der Manufacturing Cloud, passen die Manufacturing-Agenten. Zwei Angebotsagenten auf zwei Angebotsmodellen würde ich vermeiden.

Für Maschinenbauer mit Händlernetz stellt der Sales Concierge zuerst eine kaufmännische Frage. Findet ein Endkunde eine Maschine auf Ihrer Website und bekommt einen Preis: Welcher Händler erhält den Lead, und darf dieser Preis unter dem Angebot des Händlers liegen? Klären Sie Lead-Verteilung und Preissichtbarkeit mit der Vertriebsleitung vor dem Go-live.

## Katalog, Preise, Regeln und Rabattgrenzen müssen vorher stimmen

Ein Agent, der ein Angebot erstellt, liest dieselben Datensätze wie Ihr Innendienst. Was ein erfahrener Innendienst aus Gewohnheit korrigiert, gibt der Agent direkt an den Händler weiter.

### Ein Katalog, in dem Händler suchen können

Jede direkt angebotene Artikelnummer und jedes Zubehörteil braucht einen eigenen Produktdatensatz mit korrekt gesetztem Feld „Aktiv“ (konfigurierte Varianten brauchen stattdessen ein Produktmodell oder einen Konfigurator); abgelöste Produkte brauchen einen Verweis auf den Nachfolger. ERP-Kurztexte sind für interne Mitarbeitende geschrieben; ein Händler tippt „Schnellwechsler für 8-Tonnen-Bagger“. Zubehör braucht eine Zuordnung zu den Maschinenmodellen, an die es passt, sonst bietet der Agent ein Anbaugerät an, das nicht auf den Wechsler passt. Ermitteln Sie zuerst, wie viel Prozent Ihres Zubehörs eine solche Zuordnung hat.

### Preise je Markt und Händlerstufe

Hält SAP Listenpreise, Händlerrabatte je Stufe und Zuschläge als Konditionen und Salesforce nur den Listenpreis, können die Standardaktionen nur den Listenpreis aus der Preisbuch-Zuordnung nutzen. Sie brauchen je Land, Währung und Händlerstufe einen gültigen Preis mit Gültigkeitszeitraum, der aus dem ERP synchronisiert wird, etwa als Preisbuch, Preisbucheintrag oder Preiskondition. Salesforce sieht die Lücke ebenfalls: Die Winter '27 Highlights nennen Penny Perfect Pricing mit Preisen für mehrere Märkte, mehreren Mengeneinheiten, einem Kalkulationsschema und ERP-Anbindung in der Manufacturing Cloud. Was dazu bisher bekannt ist, steht in [Penny Perfect Pricing: ERP-Preise in Salesforce?](/blog/penny-perfect-pricing-erp-preise/). Die Salesforce-Hilfe dokumentiert es für die Auftragspreisfindung; dass die Angebotsaktion es aufruft, habe ich in keiner Quelle gefunden. Legen Sie einen Preis-Master fest: Das ERP rechnet und Salesforce zeigt das Ergebnis über eine API an, wie bei [Auftragsstatus aus SAP über MuleSoft](/blog/agentforce-sap-auftragsstatus/); die ERP-Konditionen werden repliziert und Salesforce rechnet mit demselben Schema; oder Salesforce pflegt die Preise selbst.

### Regeln, was baubar ist

Liegen Optionsregeln in einem separaten Konfigurator, im PLM oder in den Köpfen der Anwendungstechnik, kann der Agent sie nicht beachten. Siemens zeigt das Zielbild: Laut [Ankündigung vom September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) kann ein Vertriebsmitarbeiter „only those upgrades that are technically valid and manufacturable“ anbieten, aber Teamcenter „will work with Agentforce“, also in der Zukunftsform. Für einen mittelständischen Maschinenbauer würde ich den Agenten auf Produkte ohne Konfiguration beschränken und konfigurierte Maschinen beim Innendienst lassen, bis die Regeln als API aufrufbar sind. Wie Konfiguration, Produktidentität und Freigabe zusammenhängen, beschreibe ich in [vom Angebot zum Sales Agreement](/blog/angebot-zu-sales-agreement-produktkonfigurator/).

### Rabattgrenzen als Regeln

Der Stufenrabatt gehört zum Preis, alles darüber ist eine Entscheidung. Diese Entscheidung trifft nie das Modell. Hinterlegen Sie die Grenze in deterministischer Logik, sodass eine Freigabeaktion verborgen bleibt, bis die Regel sie erlaubt, wie in [Agent Script: Regeln statt LLM](/blog/agent-script-regeln-statt-llm/) beschrieben. Boni, die nach dem Zeitraum ausgezahlt werden, bleiben aus dem Angebotspreis heraus.

### Händler, Gebiete und installierte Basis

Der Sales Concierge findet Händler und sucht Anlagen. Dafür brauchen Händler-Accounts zugewiesene Gebiete und die Produktlinien, die sie verkaufen dürfen; außerdem brauchen Anlagen Seriennummern, damit ein Kunde Teile für seine eigene Maschine findet. Partnerbenutzer sollten nur ihr eigenes Preisbuch und ihre eigenen Kunden sehen, und jedes Feld, das ein Händler oder Kunde ausfüllt, gilt für den Agenten als Eingabe von außen, wie ich in [Prompt Injection im Händlerportal](/blog/prompt-injection-haendlerportal-agentforce/) beschreibe. Welche Portallizenz Angebote abdeckt, gehört zum [Kundenportal der Manufacturing Cloud](/blog/manufacturing-cloud-kundenportal/).

## Rechenbeispiel: 140 Händler und ein Innendienst

Nehmen wir einen Hersteller von Kompaktbaumaschinen mit 140 Händlern in 12 Ländern, SAP S/4HANA und Manufacturing Cloud mit Partnerportal. Alle Zahlen sind Annahmen und zeigen nur die Methode.

**Heute.** Händler schicken 1.800 Angebotsanfragen im Monat per E-Mail an einen Innendienst mit sechs Personen. Ein Angebot dauert 1,5 Arbeitstage. 70 Prozent betreffen Anbaugeräte, Zubehör und Standardmaschinen, 30 Prozent konfigurierte Maschinen.

**Datencheck.** 35 Prozent der 8.000 Zubehörteile sind keinem Maschinenmodell zugeordnet. Salesforce kennt nur Listenpreise, drei Händlerstufen stehen als Konditionen in SAP. Zusatzrabatte werden per E-Mail freigegeben.

**Reihenfolge.** Zuerst folgen Zuordnungen aus dem Produktmanagement, Stufenpreise aus SAP in Preisbücher je Land mit nächtlicher Synchronisation und eine Freigaberegel für jeden Rabatt über der Stufe. Angenommen sind vier Monate. Danach folgt ein Pilot mit 15 Händlern, nur für Anbaugeräte.

**Verbrauch.** Falls der Agent wie andere Agentforce-Aktionen abgerechnet wird, nehmen wir acht Aktionen pro Angebot an. Laut [Flex-Credits-Preisliste vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) verbraucht eine Aktion 20 Credits in Produktion und 16 in einer Sandbox, für Agentforce-for-Industries-Kunden fallen zusätzlich Prompts an, und Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/) (Listenpreis). Für die 1.260 einfachen Angebote: 1.260 × 8 × 20 = 201.600 Credits, rund 1.008 € im Monat vor Prompts. Prüfen Sie die echte Zahl im Sandbox-Trace und in Digital Wallet. Ein Testsatz aus 300 echten Händleranfragen kostet 300 × 8 × 16 = 38.400 Credits, also 192 € pro Sandbox-Lauf.

Der Verbrauch ist klein im Vergleich zu sechs Personen im Innendienst. Der größere Lizenzblock kann das Add-on sein: Braucht jeder Angebotsnutzer der Händler es für 150 US-Dollar im Monat, übersteigt das allein den Verbrauch. Die Arbeit steckt in vier Monaten Katalog- und Preisdaten.

## Einen Kanal wählen und den Katalog messen

```schritte
Einen Kanal zuerst wählen
  Händler über den Partner Sales Assistant oder Endkunden über den Sales Concierge.
Den Katalog messen
  Anteil des Zubehörs mit Zuordnung zu Maschinenmodellen, Anteil der Produkte mit einer Beschreibung, nach der ein Händler sucht.
Den Preis-Master festlegen
  Stufenpreise mit Gültigkeit in Preisbücher bringen.
Rabattgrenzen als Regeln schreiben
  Mit einem Verantwortlichen in Vertrieb und Finanzen.
Salesforce schriftlich fragen
  Wie das Add-on pro Nutzer für Partnerbenutzer gilt, welche Aktionen und Prompts der Agent aufruft und wie er sich vom Agenten in Revenue Management abgrenzt.
Einen Testsatz bauen
  Aus echten Händleranfragen, auch mit falschen Teilenummern und nicht baubaren Kombinationen, wie in [Agentforce-Agenten testen und freigeben](/blog/agentforce-agenten-testen-freigeben/).
```

Wie sich diese Agenten in die übrigen Fertigungsagenten einordnen, zeigt das Masterclass-Kapitel [KI-Agenten in der Fertigung](/masterclass/ki-salesforce/ki-agenten-in-der-fertigung/). Die Grenze zwischen ERP, Konfigurator und Agent zu ziehen, gehört zu meiner [Salesforce-Architekturarbeit](/leistungen/salesforce-architektur/).
