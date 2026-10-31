---
title: "KI-Angebote für Händler: Partner Sales Assistant"
description: "Was AI Partner Sales Assistant und AI Sales Concierge in der Manufacturing Cloud leisten und welche Produkt-, Preis- und Rabattdaten vorher stimmen müssen."
pubDate: 2026-10-27
lang: de
slug: ki-angebote-haendler-partner-sales-assistant
translationKey: partner-sales-assistant-dealer-quotes
topic: ai
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Händlervertrieb, Angebote, Preise, KI-Agenten]
takeaways:
  - "Einrichtung, Lizenz und Preis beider Agenten fand ich am 27. Oktober 2026 in keiner Salesforce-Quelle. Fragen Sie schriftlich, bevor Sie budgetieren."
  - "Liegen Händlerpreise nur als Konditionen in SAP, nennt der Agent Listenpreise. Der Preis-Master gehört vorher festgelegt."
  - "Konfigurierte Maschinen bleiben beim Innendienst, bis der Agent die Regeln aufrufen kann. Ich starte mit Zubehör und Standardmaschinen."
  - "Reif ist ein KI-Angebot, wenn Ihr Innendienst es unverändert unterschreiben würde."
faq:
  - q: "Was macht der AI Partner Sales Assistant?"
    a: "Laut Produktseite der Manufacturing Cloud beschleunigt er den Vertrieb über Partner, indem er Produkte findet und Angebote in Sekunden baut. Salesforce führt ihn unter dem Release Summer '26."
  - q: "Was unterscheidet ihn vom AI Sales Concierge?"
    a: "Der Sales Concierge (Winter '27) richtet sich an Kunden auf Ihrer Experience-Cloud-Site. Laut Release Highlights suchen sie dort Anlagen, finden Händler und fragen Angebote an. Der Partner Sales Assistant richtet sich an Händler und Distributoren."
  - q: "Welche Daten müssen vor KI-Angeboten für Händler stimmen?"
    a: "Ein Produktdatensatz je verkaufsfähiger Variante mit einer Beschreibung, nach der ein Händler sucht, Zuordnung von Zubehör zu Maschinen, Preisbücher je Markt und Händlerstufe aus dem ERP, Konfigurationsregeln und Rabattgrenzen als Regeln."
  - q: "Was kostet ein KI-Angebot für Händler?"
    a: "Einen Preis für diese Agenten hat Salesforce in den Quellen, die ich öffnen konnte, nicht veröffentlicht. Eine Standard-Aktion in Agentforce kostet 20 Flex Credits (0,10 € beim Listenpreis von 500 € je 100.000 Credits) in Produktion und 16 in einer Sandbox; offen ist die Lizenz für Partnerbenutzer."
draft: false
---

Der AI Partner Sales Assistant (Summer '26) hilft Händlern in der Manufacturing Cloud, Produkte zu finden und Angebote zu bauen, der AI Sales Concierge (Winter '27) macht dasselbe für Kunden auf Ihrer Experience-Cloud-Site. Salesforce beschreibt beide in je einem Satz, deshalb sehe ich sie als neue Oberfläche auf Ihren bestehenden Angebotsdaten. Diese Daten entscheiden. Bevor ein Händler ein KI-Angebot bekommt, braucht jede verkaufsfähige Variante einen auffindbaren Produktdatensatz, einen Preis je Markt und Händlerstufe, eine Regel, was baubar ist, und eine Rabattgrenze, die kein Modell aufweicht.

## Was leisten AI Partner Sales Assistant und AI Sales Concierge?

Beide stehen auf der [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/). Unter Summer '26 verspricht Salesforce, mit dem AI Partner Sales Assistant den Vertrieb über Partner zu beschleunigen, weil er „finds products and builds quotes in seconds“. Unter Winter '27 soll der AI Sales Concierge Self-Service-Besuche in qualifizierte Pipeline verwandeln, mit derselben Formulierung: Er findet Produkte und baut Angebote in Sekunden. Winter '27 ist seit dem [12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

Die Release-Unterlagen ergänzen wenig. Die [Winter '27 Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) beschreiben Sales Concierge for Customers als KI-gestütztes Einkaufserlebnis auf Ihrer Experience-Cloud-Site, auf der Kunden „search assets, locate dealers, and request quotes“. Einen Sales Concierge for Manufacturing mit Produkt- und Zubehörsuche, Händlersuche und schneller Angebotserstellung nannten bereits die [Spring '26 Highlights](https://trailhead.salesforce.com/it/content/learn/modules/spring-26-release-highlights/see-whats-new-agentforce-manufacturing-media-public-sector-nonprofit). Zum Partner Sales Assistant fand ich in den [Summer '26 Highlights für Manufacturing](https://trailhead.salesforce.com/content/learn/modules/summer-26-release-highlights/see-whats-new-manufacturing-media-nonprofit-and-agentforce-net-zero) keinen Eintrag; dort stehen Garantieunterstützung, Musterverwaltung und Bestellungen.

```hinweis offen
Einrichtungsanleitung, Lizenz und Preis beider Agenten fand ich am 27. Oktober 2026 in keiner Quelle, die ich öffnen konnte. Fragen Sie Salesforce, bevor Sie budgetieren.
```

Für die Entscheidung zählt ein Unterschied. „Angebot anfragen“ und „Angebot bauen“ sind verschiedene Dinge: Eine Anfrage landet im Vertriebsinnendienst, ein gebautes Angebot trägt einen Preis, auf den sich der Händler beruft.

```vertiefung Für Admins
titel: Welche Agentenaktionen liegen darunter?
Die Navigation der Standard Agent Action Reference in der Salesforce-Hilfe führt im Bereich Manufacturing Aktionen von Agentforce for Manufacturing auf, etwa Search Product And Parts, Get Product Price Details, Get Price Books, Search Dealers for Products, Create Opportunity with Products and Preferred Seller und Create Quote from Opportunity. Eine Hilfeseite, die diese Aktionen im Detail beschreibt, habe ich nicht gefunden. Die einzige Aktionsseite, die ich geöffnet habe, [Get Warranty Claims for Account](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5), verlangt das Add-on Agentforce for Manufacturing für jeden Benutzer oder die Agentforce 1 Manufacturing Edition. Ich erwarte, dass beide Agenten solche Aktionen nutzen. Salesforce sagt das nicht, es ist also meine Annahme.
```

## Welcher Angebotsagent passt zu welchem Kanal?

Winter '27 bringt auch außerhalb der Manufacturing Cloud einen Angebotsagenten. Laut [Ankündigung zu Winter '27](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) decken die Revenue Management Agent Enhancements „self-service quoting for customer buyers, integrated quoting for partners“ ab, damit Partner Geschäfte abschließen, ohne ihren Arbeitsbereich zu verlassen.

| | AI Partner Sales Assistant | AI Sales Concierge | Revenue Management Agent |
|---|---|---|---|
| Release | Summer '26 | Winter '27 | Winter '27 |
| Wer nutzt ihn | Händler, Distributoren | Kunden auf Ihrer Site | Einkäufer beim Kunden, Partner |
| Was Salesforce sagt | Findet Produkte, baut Angebote | Findet Produkte, baut Angebote; Highlights: Angebot anfragen | Self-Service- und Partnerangebote |
| Produkt | Manufacturing Cloud | Manufacturing Cloud | Revenue Cloud |

Ich würde danach entscheiden, wo Ihr Angebot heute entsteht. Erstellen Sie Angebote bereits in Revenue Cloud, schauen Sie zuerst auf den Revenue Management Agent; was er heute kann, steht im Beitrag zum [Angebotsagenten in Revenue Cloud](../revenue-cloud-angebotsagent-agentforce/). Arbeiten Händler mit Standard-Angeboten und Preisbüchern in der Manufacturing Cloud, passen die Manufacturing-Agenten. Zwei Angebotsagenten auf zwei Angebotsmodellen würde ich vermeiden.

Für Maschinenbauer mit Händlernetz stellt der Sales Concierge zuerst eine kaufmännische Frage. Findet ein Endkunde eine Maschine auf Ihrer Website und bekommt einen Preis: Welcher Händler erhält den Lead, und darf dieser Preis unter dem Angebot des Händlers liegen? Klären Sie Lead-Verteilung und Preissichtbarkeit mit der Vertriebsleitung vor dem Go-live.

## Katalog, Preise, Regeln und Rabattgrenzen müssen vorher stimmen

Ein Agent, der ein Angebot baut, liest dieselben Datensätze wie Ihr Innendienst. Was ein erfahrener Innendienst aus Gewohnheit korrigiert, gibt der Agent direkt an den Händler weiter.

### Ein Katalog, in dem Händler suchen können

Jede verkaufsfähige Variante und jedes Zubehörteil braucht einen eigenen Produktdatensatz mit korrektem Aktiv-Kennzeichen, abgelöste Produkte einen Verweis auf den Nachfolger. ERP-Kurztexte sind für interne Mitarbeitende geschrieben; ein Händler tippt „Schnellwechsler für 8-Tonnen-Bagger“. Zubehör braucht eine Zuordnung zu den Maschinenmodellen, an die es passt, sonst bietet der Agent ein Anbaugerät an, das nicht auf den Wechsler passt. Zählen Sie vor allem anderen, wie viel Prozent Ihres Zubehörs eine solche Zuordnung haben.

### Preise je Markt und Händlerstufe

Hält SAP Listenpreise, Händlerrabatte je Stufe und Zuschläge als Konditionen und Salesforce nur den Listenpreis, nennt der Agent den Listenpreis. Sie brauchen Preisbücher je Land, Währung und Händlerstufe mit Gültigkeitsdatum, synchronisiert aus dem ERP. Salesforce sieht die Lücke ebenfalls: Die Winter '27 Highlights nennen Penny Perfect Pricing mit Preisen für mehrere Märkte, mehreren Mengeneinheiten, Kalkulationsschema und ERP-Anbindung in der Manufacturing Cloud. Was dazu bisher bekannt ist, steht in [Penny Perfect Pricing: ERP-Preise in Salesforce?](../penny-perfect-pricing-erp-preise/). Legen Sie einen Preis-Master fest: Entweder rechnet das ERP und Salesforce zeigt das Ergebnis über eine API an, wie bei [Auftragsstatus aus SAP über MuleSoft](../agentforce-sap-auftragsstatus/), oder Salesforce rechnet mit demselben Schema.

### Regeln, was baubar ist

Liegen Optionsregeln in einem separaten Konfigurator, im PLM oder in den Köpfen der Anwendungstechnik, kann der Agent sie nicht beachten. Siemens zeigt das Zielbild: Laut [Ankündigung vom September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) kann ein Vertriebsmitarbeiter „only those upgrades that are technically valid and manufacturable“ anbieten, aber Teamcenter „will work with Agentforce“, also in der Zukunftsform. Für einen mittelständischen Maschinenbauer würde ich den Agenten auf Produkte ohne Konfiguration beschränken und konfigurierte Maschinen beim Innendienst lassen, bis die Regeln als API aufrufbar sind. Wie Konfiguration, Produktidentität und Freigabe zusammenhängen, beschreibe ich in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/).

### Rabattgrenzen als Regeln

Der Stufenrabatt gehört zum Preis, alles darüber ist eine Entscheidung. Diese Entscheidung trifft nie das Modell. Legen Sie die Grenze in deterministische Logik, sodass eine Freigabeaktion verborgen bleibt, bis die Regel sie erlaubt, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben. Boni, die nach dem Zeitraum ausgezahlt werden, bleiben aus dem Angebotspreis heraus.

### Händler, Gebiete und installierte Basis

Der Sales Concierge findet Händler und sucht Anlagen. Dafür brauchen Händler-Accounts Gebiete und die Produktlinien, die sie verkaufen dürfen, und Anlagen brauchen Seriennummern, damit ein Kunde Teile für seine eigene Maschine findet. Partnerbenutzer sollten nur ihr eigenes Preisbuch und ihre eigenen Kunden sehen, und jedes Feld, das ein Händler oder Kunde ausfüllt, ist für den Agenten Eingabe von außen, wie ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/) beschreibe. Welche Portallizenz Angebote abdeckt, gehört zum [Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

## Rechenbeispiel: 140 Händler und ein Innendienst

Nehmen wir einen Hersteller von Kompaktbaumaschinen mit 140 Händlern in 12 Ländern, SAP S/4HANA und Manufacturing Cloud mit Partnerportal. Alle Zahlen sind Annahmen und zeigen nur die Methode.

**Heute.** Händler schicken 1.800 Angebotsanfragen im Monat per E-Mail an einen Innendienst mit sechs Personen. Ein Angebot dauert 1,5 Arbeitstage. 70 Prozent betreffen Anbaugeräte, Zubehör und Standardmaschinen, 30 Prozent konfigurierte Maschinen.

**Datencheck.** 35 Prozent der 8.000 Zubehörteile sind keinem Maschinenmodell zugeordnet. Salesforce kennt nur Listenpreise, drei Händlerstufen stehen als Konditionen in SAP. Zusatzrabatte werden per E-Mail freigegeben.

**Reihenfolge.** Zuordnungen aus dem Produktmanagement, Stufenpreise aus SAP in Preisbücher je Land mit nächtlicher Synchronisation, eine Freigaberegel für jeden Rabatt über der Stufe. Angenommen sind vier Monate. Danach ein Pilot mit 15 Händlern, nur für Anbaugeräte.

**Verbrauch.** Falls der Agent wie andere Agentforce-Aktionen abrechnet, nehmen wir acht Aktionen pro Angebot an. Laut [Flex-Credits-Preisliste](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) kostet eine Aktion 20 Credits in Produktion und 16 in einer Sandbox, und Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/) (Listenpreis). Für die 1.260 einfachen Angebote: 1.260 × 8 × 20 = 201.600 Credits, rund 1.008 € im Monat. Ein Testsatz aus 300 echten Händleranfragen kostet 300 × 8 × 16 = 38.400 Credits, also 192 € pro Sandbox-Lauf.

Der Verbrauch ist klein im Vergleich zu sechs Personen im Innendienst. Die Arbeit steckt in vier Monaten Katalog- und Preisdaten, offen bleibt die Lizenz für Partnerbenutzer.

## Erster Schritt: einen Kanal wählen und den Katalog messen

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
  Lizenz je Partnerbenutzer, welche Aktionen der Agent aufruft, Verbrauchsmodell und Abgrenzung zum Revenue Management Agent.
Einen Testsatz bauen
  Aus echten Händleranfragen, auch mit falschen Teilenummern und nicht baubaren Kombinationen, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).
```

Wo diese Agenten zwischen den übrigen Fertigungsagenten stehen, zeigt das Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/). Die Grenze zwischen ERP, Konfigurator und Agent zu ziehen, gehört zu meiner [Salesforce-Architekturarbeit](../../leistungen/salesforce-architektur/).
