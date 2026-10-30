---
title: "Revenue Cloud im Überblick: Umfang, Namen, Kosten, SAP"
description: "Was Salesforce Revenue Cloud umfasst, wie es heißt und was es im Oktober 2026 kostet, was bei SAP bleibt und wann ein Hersteller besser darauf verzichtet."
lang: de
slug: revenue-cloud-ueberblick
course: revenue-cloud
translationKey: revenue-01
chapter: 1
pubDate: 2026-10-28
short: "Überblick und Entscheidung"
summary: "Was Revenue Cloud umfasst, was es kostet, wie es heißt und wann ein Hersteller besser bei SAP oder Sales Cloud bleibt."
takeaways:
  - "Revenue Cloud ist das Quote-to-Cash-Produkt von Salesforce auf Standardobjekten der Plattform, vom Produktkatalog über Konfigurator, Angebot und Auftrag bis zu Vertrag und Rechnung."
  - "Es lohnt sich für Hersteller mit vielen Varianten, Abonnements oder Wartungsverträgen und häufigen Nachträgen, selten dagegen, wenn ein Angebot nur eine Preisabfrage in SAP ist."
  - "Zum Listenpreis kostet Revenue Cloud Growth 150 Euro und Revenue Cloud Advanced 200 Euro pro Nutzer und Monat, jährlich abgerechnet und zusätzlich zu Sales Cloud."
  - "Die Salesforce-Dokumentation mischt noch mehrere Namen. Im Bestellformular stehen deshalb Edition, Zusatzprodukte und SKUs, nicht nur Revenue Cloud."
  - "Bevor ein Partner baut, entscheidet das Unternehmen, wem Preis, Konfigurationsregeln und Rechnung gehören und wie lange CPQ weiterläuft."
articles: [revenue-cloud-worth-it-manufacturers, revenue-cloud-product-names, revenue-cloud-editions-pricing, revenue-cloud-sap-system-boundaries, revenue-cloud-vs-manufacturing-cloud-commerce]
faq:
  - q: "Was ist Salesforce Revenue Cloud?"
    a: "Revenue Cloud ist das Quote-to-Cash-Produkt von Salesforce auf der Kernplattform. Trailhead nennt Produktkatalog, Pricing, Rate Management, Konfigurator, Transaction Management, Asset Lifecycle, Verträge, Auftragsorchestrierung und Invoice Management als Bestandteile."
  - q: "Ist Revenue Cloud dasselbe wie Revenue Lifecycle Management?"
    a: "Ja. Laut CPQ-Seite von Salesforce war Revenue Lifecycle Management ein früherer Produktname. Der Developer Guide zu Winter '27 nennt das Produkt Revenue Management, salesforce.com verkauft es als Revenue Cloud."
  - q: "Was kostet Revenue Cloud?"
    a: "Laut Preisseite von Salesforce (Oktober 2026) kostet Revenue Cloud Growth 150 Euro und Revenue Cloud Advanced 200 Euro pro Nutzer und Monat, jährlich abgerechnet, zusätzlich zu einem Sales-Cloud-Abonnement. Mehrere Funktionen sind Zusatzprodukte, für Revenue Cloud Billing gibt es keinen veröffentlichten Listenpreis."
  - q: "Bleibt SAP mit Revenue Cloud im Einsatz?"
    a: "Ja, in jedem Fertigungsszenario, das ich planen würde. SAP behält meist Materialstamm, Kundenauftrag für die Lieferung und Maschinenrechnung. Welches System Kundenpreise rechnet, wird einmal entschieden, für jede Preisart."
  - q: "Kann ein Neukunde noch Salesforce CPQ kaufen?"
    a: "Nein. Salesforce verkauft keine neuen CPQ-Lizenzen an Neukunden. Bestandskunden können CPQ weiter nutzen, Nutzer nachkaufen und verlängern, und eine erzwungene Migration gibt es nicht."
draft: false
---

Revenue Cloud ist das Quote-to-Cash-Produkt von Salesforce auf Standardobjekten der Plattform: Produktkatalog, Konfigurator, Preise, Angebote, Aufträge, Verträge und als Zusatzprodukt die Abrechnung. Für Hersteller lohnt es sich, wenn Angebote viele Varianten, Wartungsverträge oder Abonnements verbinden und sich nach dem ersten Auftrag oft ändern. Ist ein Angebot eine Preisabfrage in SAP für Standardartikel, reichen meist Angebote in Sales Cloud und eine ERP-Schnittstelle. Zum Listenpreis kostet Revenue Cloud Growth 150 Euro und Advanced 200 Euro pro Nutzer und Monat, zusätzlich zu Sales Cloud. Bevor ein Partner baut, klären Sie vier Punkte: Preisführung, Konfigurator, Rechnung und die Laufzeit von CPQ.

## Was umfasst Revenue Cloud?

Revenue Cloud ist der Weg vom Produktkatalog bis zur Rechnung, gebaut auf Standardobjekten der Salesforce-Plattform statt in einem Managed Package. Das Trailhead-Modul [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management) nennt diese Bestandteile:

| Bestandteil | Was er für einen Hersteller leistet |
|---|---|
| Product Catalog Management | Ein Produktmodell mit Klassifizierungen und Attributen, laut Trailhead „the single source of truth for product data“ |
| Salesforce Pricing | Preisregeln und Rabatte, gepflegt von Pricing-Verantwortlichen |
| Rate Management | Tarife nach Verbrauch, etwa für nutzungsbasierte Services |
| Product Configurator | Gültige Kombinationen von Optionen und Attributen |
| Transaction Management | Angebote und Auftragserfassung über alle Kanäle |
| Configure, Price & Quote | Ein Angebotseditor im Tabellenstil, der Produkte gruppiert |
| Asset Lifecycle Management | Die installierte Basis dessen, was verkauft wurde, mit wiederkehrendem Umsatz |
| Salesforce Contracts | Verträge, Pflichten daraus und digitalisierte Altverträge |
| Dynamic Revenue Orchestrator | Alles nach dem Auftrag bis zur Erfüllung |
| Invoice Management | Rechnungen für gelieferte Produkte und Services |

Die [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management) fasst das als ein Produkt zusammen, das „pricing, quoting, contracting, and billing on a single data model“ vereint, mit „a single, attribute-based catalogue“ für alle Kanäle. Laut Trailhead können andere Clouds Katalog und Preise über Composable APIs nutzen, als Beispiel nennt Salesforce Agentforce Manufacturing. Für Winter '27 nennen die [Release Highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) bis zu 15.000 Transaktionspositionen pro Deal sowie Agenten für Self-Service-Angebote von Käufern, Angebote von Partnern und die Vorbereitung von Verlängerungen.

Wie die Bestandteile im Einzelnen funktionieren, steht in den folgenden Kapiteln. Für die erste Entscheidung zählen zwei Punkte. Revenue Cloud ist ein anderes Produkt als Salesforce CPQ: Die [Seite zum Verkaufsende von CPQ](https://www.salesforce.com/sales/cpq/end-of-life/) beschreibt CPQ als Managed Package für Angebote durch den Vertrieb und Revenue Cloud Advanced als Nachfolger, „built natively on the Salesforce platform“. Und Salesforce verkauft keine CPQ-Lizenzen mehr an Neukunden. Ein neues Projekt wählt also zwischen Revenue Cloud, einem Partnerprodukt und einem eigenen Ansatz.

## Wann lohnt sich Revenue Cloud für Hersteller?

Ich suche im heutigen Angebotsprozess nach diesen Signalen:

| Signal | Woran Sie es erkennen |
|---|---|
| Varianten mit Regeln | Maschinen mit Dutzenden Optionen, die sich gegenseitig bedingen oder ausschließen. Ein Konfigurator, der Kombinationen prüft, spart Nacharbeit in der Auftragsabwicklung. |
| Service auf demselben Angebot | Ersatzteilpaket, Wartungsvertrag und ein Abonnement für Fernüberwachung zusammen mit der Maschine. |
| Änderungen nach dem Verkauf | Upgrades, Verlängerungen und Kündigungen, die wieder über Angebot und Auftrag laufen, ausgehend von dem, was der Kunde schon hat. |
| Große Angebote | Anlagenprojekte mit Hunderten Positionen, gruppiert nach Anlagenteilen. |
| Mehrere Kanäle auf einem Katalog | Innendienst, Händler und ein Shop verkaufen dieselben Produkte. |

Zwei oder drei dieser Signale zusammen rechtfertigen einen genaueren Blick, eines allein selten. Die vollständige Liste der Signale dafür und dagegen samt Kostenrahmen steht in [Revenue Cloud für Hersteller: Wann lohnt es sich?](../../../blog/revenue-cloud-lohnt-sich-hersteller/).

## Welcher Name gilt: Revenue Cloud, RLM oder Revenue Management?

Alle meinen dasselbe Produkt, die Quellen wurden nur zu unterschiedlichen Zeitpunkten aktualisiert. Stand Ende Oktober 2026:

| Quelle | Wie sie das Produkt nennt |
|---|---|
| salesforce.com | Zeigt „Revenue Cloud“ als Überschrift der Produktseite, zuletzt geändert am 22. Oktober 2026, und der Preisseite, mit den Editionen Revenue Cloud Growth und Revenue Cloud Advanced (RCA). |
| Der Developer Guide | Zu Winter '27 heißt [Revenue Management Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) und schreibt: „Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation.“ |
| Trailhead | Nennt sein Grundlagenmodul Agentforce Revenue Management Foundations. |
| Die CPQ-Seite | Nennt Revenue Lifecycle Management (RLM) „an earlier product name“ und ordnet RCA in „the Agentforce Revenue Management suite“ ein. |

Partnerblogs berichten, der Agentforce-Name sei mit der Dreamforce 2025 gekommen und Salesforce sei um September 2026 still zu Revenue Cloud zurückgekehrt. Eine offizielle Ankündigung habe ich für keinen der beiden Schritte gefunden, ich behandle das deshalb als Bericht. Das Agentforce-Etikett zieht sich durch das ganze Portfolio; das [Kapitel zu Begriffen und Landkarte](../../ki-salesforce/begriffe-und-landkarte/) meiner KI-Masterclass ordnet diese Namen.

Eine ältere Bedeutung führt zu echten Missverständnissen. Im November 2020 [stellte Salesforce Revenue Cloud vor](https://www.salesforce.com/news/stories/introducing-revenue-cloud/), als Suite aus CPQ und Billing, Partner Relationship Management und B2B Commerce. Angebot und Abrechnung waren in dieser Suite die Pakete CPQ und Billing. Ein Partner mit „30 Revenue-Cloud-Projekten“ meint womöglich Projekte auf dem CPQ-Paket. Fragen Sie, welches Datenmodell die Referenzen nutzten.

Für Verträge gilt bei mir eine einfache Regel: Im Bestellformular stehen Edition, jedes Zusatzprodukt und die SKUs aus dem Salesforce-Angebot, nie nur „Revenue Cloud“. Zeitleiste und Suchtipps stehen in [Revenue Cloud, RLM, RCA: Welcher Name gilt jetzt?](../../../blog/revenue-cloud-produktnamen-rlm-rca/).

## Was kostet Revenue Cloud?

Die [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) nennt zwei Editionen pro Nutzer und Monat, jährlich abgerechnet:

| Edition | Listenpreis | Umfang |
|---|---|---|
| Revenue Cloud Growth | 150 Euro | Angebote und Konfigurator, Auftragserfassung, Abonnements |
| Revenue Cloud Advanced | 200 Euro | Growth plus Verträge und Aufträge, Verbrauch und Rechnungen, KI und Analytics |

Laut FAQ derselben Seite ist Revenue Cloud ein kostenpflichtiges Zusatzprodukt zu einem Sales-Cloud-Abonnement. Die Vergleichstabelle markiert vier Zusatzprodukte als „Available for purchase“: Contract Lifecycle Management bei Growth sowie Dynamic Revenue Orchestration, Invoice Management und External User Support bei Advanced. Die beiden mittleren tragen den Hinweis „Freemium access available“, ohne zu sagen, was enthalten ist. Für Revenue Cloud Billing gibt es keinen veröffentlichten Listenpreis. Laut [Billing-Preisblatt vom Februar 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) verbraucht es ein Billing Event pro 50 US-Dollar Rechnungsbetrag, ohne Übertrag über das Vertragsende hinaus.

Eine Rechnung zum Listenpreis, als Annahme: 50 Nutzer, die Angebote erstellen, bekommen Revenue Cloud Advanced. Das sind 50 × 200 Euro × 12 = 120.000 Euro im Jahr. Haben diese Nutzer noch kein Sales Cloud, kommen mit Sales Cloud Core zu 195 Euro pro Nutzer und Monat laut [Sales-Cloud-Preisseite](https://www.salesforce.com/eu/sales/pricing/) 117.000 Euro hinzu. Umsetzung, SAP-Integration und Betrieb kommen obendrauf.

Die Zahl der Nutzer bewegt das Budget stärker als die Edition. Ich gruppiere Nutzer danach, was sie mit Angeboten tun: erstellen, freigeben, nur lesen, Katalog pflegen oder als Händler anbieten.

```hinweis offen
Für alle Gruppen außer denen, die Angebote erstellen, sollten Sie sich die Lizenzpflicht von Salesforce schriftlich geben lassen.
```

Zusatzprodukte, Billing Events und die Lizenzprognose stehen in [Revenue Cloud Preise: Growth, Advanced und Add-ons](../../../blog/revenue-cloud-editionen-preise/), eine unabhängige Prüfung eines Angebots gehört zu [Make-or-Buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/).

## Welche Aufgaben sollten bei SAP bleiben?

In einem Fertigungsunternehmen bleibt SAP, und drei Aufgaben bleiben meist dort:

- **Preiskonditionen.** Kunden- und Händlerpreise, die seit Jahren als Konditionen gepflegt werden, sollten nicht in einem zweiten System nachgebaut werden. Salesforce holt den Nettopreis stattdessen über eine API.
- **Variantenkonfiguration.** Werden Maschinen heute in der SAP-Variantenkonfiguration konfiguriert und braucht der Auftrag dieses Ergebnis, deckt der Revenue-Cloud-Konfigurator nur die Vertriebssicht ab oder bleibt leer.
- **Die Maschinenrechnung.** Lieferung, Anzahlungen und Zoll liegen in SAP. Die Rechnung für den einmaligen Maschinenverkauf gehört auch dorthin.

Das nächstliegende dokumentierte Muster ist [Use Case 3a des MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/). Dort steht „SAP S/4HANA is the system of record pricing conditions“; der Nettopreis je Angebotsposition kommt aus SAP, und der Auftrag wird aus Salesforce heraus in SAP angelegt. Zwei Grenzen: Das Muster beschreibt Sales Cloud und Salesforce CPQ, nicht Revenue Cloud, und es klammert die SAP-Variantenkonfiguration ausdrücklich aus. Es lässt sich übertragen; das Design für Revenue Cloud ist Arbeit Ihres Partners und braucht ein Review auf Ihrer Seite.

Meine Standardaufteilung je Prozessschritt:

| Schritt | Standard-Owner | Wann es sich verschiebt |
|---|---|---|
| Materialstamm, Einheiten, Status | SAP | nie |
| Vertriebskatalog, Attribute | Revenue Cloud | |
| Konfiguration | Revenue Cloud | bleibt in SAP, wenn die Regeln in der Variantenkonfiguration liegen |
| Kundenpreise | ein Master, meist SAP | Revenue Cloud für Abonnements und Bundles, die nur in Salesforce verkauft werden |
| Angebot und Freigabe | Revenue Cloud | |
| Kundenauftrag für die Lieferung | SAP, angelegt aus Salesforce | |
| Rechnung | SAP | Revenue Cloud Billing für wiederkehrende Umsätze, die in Salesforce verkauft und geändert werden |

Wandern Rechnungen doch nach Salesforce, kann [Revenue Cloud Billing](https://www.salesforce.com/sales/revenue-cloud-billing/) laut Salesforce „function as a sub-ledger while synchronizing journal entries“ ins ERP. Dann muss die Finanzabteilung Legal Entities, Buchungsperioden und Kontenzuordnung mittragen. Drei Schnitte und einen Owner je Objekt beschreibt [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../../../blog/revenue-cloud-sap-quote-to-cash-aufteilung/), die Schnittstellen selbst sind meine Arbeit unter [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

## Wo endet Revenue Cloud?

Drei weitere Salesforce-Produkte berühren dieselben Geschäfte:

- **Manufacturing Cloud** misst das Rahmengeschäft: Sales Agreements mit Plan gegen Ist, Kundenprognosen und Rabatte. Aus einem konfigurierten Angebot in Revenue Cloud kann ein Sales Agreement werden. Diese Seite behandelt das Kapitel [Rahmenverträge und Prognosen](../../manufacturing-cloud/rahmenvertraege-und-prognosen/) der Manufacturing-Cloud-Masterclass.
- **B2B Commerce** lässt Händler und Kunden bekannte Artikel in einem Shop nachbestellen. Für regelbasierte Preise, konfigurierbare Bundles und Request for Quote nennt die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) eine Commerce-Growth- oder Commerce-Advanced-Lizenz zusammen mit Revenue Cloud Advanced. Wann sich ein Shop lohnt, steht im Kapitel [Lohnt sich B2B Commerce?](../../b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/).
- **Field Service** wartet die installierten Maschinen. Revenue Cloud hält fest, was verkauft wurde, Field Service arbeitet an der Maschine mit ihrer Seriennummer. Wie beides zusammenpasst, gehört zu Kapitel 3.

Die Überschneidungen liegen bei Katalog, Preis und Angebot. Ein Katalog, ein Preis-Master und ein Angebotsmodell, und für jeden Prozessschritt führt genau ein Produkt. Die Entscheidungstabelle steht in [Revenue Cloud, Manufacturing Cloud oder B2B Commerce?](../../../blog/revenue-cloud-manufacturing-cloud-commerce-abgrenzung/).

## Wann ist Salesforce die falsche Antwort?

Revenue Cloud ist ein großes Produkt, und für manche Hersteller ist es zu viel:

- **Das Angebot ist eine SAP-Preisabfrage.** Der Vertrieb wählt Materialnummern, SAP rechnet. Salesforce braucht dann nur eine Schnittstelle zu SAP.
- **Wenige Produkte, wenige Varianten.** Ein Sortiment von 200 Artikeln ohne Optionen braucht keinen Constraint-basierten Konfigurator.
- **Regeln liegen woanders und bleiben dort.** Stehen Variantenregeln in SAP oder in den Köpfen der Anwendungstechnik und will niemand sie doppelt pflegen, bleibt der Konfigurator leer.
- **Kein wiederkehrender Umsatz.** Ist jeder Verkauf eine einzelne Maschine und bleibt die Rechnung in SAP, liegen die stärksten Teile brach.

Die Alternativen sind Angebote in Sales Cloud mit ERP-Schnittstelle, ein CPQ-Produkt eines Partners oder ein eigener Ansatz auf der Plattform. Den letzten Weg beschreibe ich in [vom Angebot zum Sales Agreement](../../../blog/angebot-zu-sales-agreement-produktkonfigurator/).

## Ein typisches Szenario, als Annahme

Ein Hersteller von Verpackungsmaschinen mit SAP S/4HANA verkauft 25 Grundmodelle mit Optionen, dazu Ersatzteilpakete und ein Abonnement für Fernüberwachung je Maschine. Im Vertrieb arbeiten 60 Personen, 20 davon erstellen Projektangebote. Ersatzteilpreise sind SAP-Konditionen je Kunde. Alle Details sind Annahmen.

Ich würde Revenue Cloud Advanced für die 20 Angebotsersteller lizenzieren: 48.000 Euro im Jahr zum Listenpreis. Katalog, Konfigurator und Angebot für Maschinen und Abonnements wandern in Revenue Cloud. Ersatzteile auf demselben Angebot bekommen ihren Nettopreis aus SAP, und das Abonnement bleibt als Asset in Salesforce für Verlängerungen:

```ablauf
sf: Angebot, Auftrag, Abo als Asset
erp: Konditionen SAP, Kundenauftrag SAP, Rechnung SAP
Konditionen SAP --Nettopreis per API--> Angebot
Angebot --> Auftrag
Auftrag --Übergabe--> Kundenauftrag SAP
Kundenauftrag SAP ..Auftragsnummer..> Auftrag
Auftrag --> Abo als Asset
Kundenauftrag SAP --> Rechnung SAP
```

Die Rechnungen bleiben im ersten Jahr in SAP; Billing wird erst zum Thema, wenn die Abonnements ein eigenes Geschäft sind.

## Was sollten Sie entscheiden, bevor ein Partner baut?

Partner fragen nach Funktionen. Die Entscheidungen, die Kosten und Zeitplan treiben, gehören dem Unternehmen:

| Entscheidung | Was dazu gehört |
|---|---|
| Preis-Master | SAP-Konditionen oder Salesforce Pricing, je Preisart, nie beides für denselben Preis. |
| Konfigurator-Owner | Wer pflegt die Variantenregeln nach dem Go-live, und in welchem System? |
| Rechnungs-Owner | SAP oder Revenue Cloud Billing. Das entscheidet die Finanzabteilung, nicht das CRM-Team. |
| Parallelbetrieb mit CPQ | Bestandskunden von CPQ stehen nicht unter Zeitdruck: Die CPQ-Seite sagt „There is no forced migration“, aber auch, dass CPQ „will not receive new features“. Eine typische Migration dauert laut derselben Seite drei bis sechs Monate. Die Einzelheiten stehen in Kapitel 5, [von CPQ zu Revenue Cloud](../von-cpq-zu-revenue-cloud/). |

Schreiben Sie diese vier Antworten ins Entscheidungsprotokoll, bevor Sie Schätzungen anfragen. Sie gehören zu meiner Arbeit in der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/). Sind sie geklärt, zeigt [Kapitel 2 zu Katalog, Konfigurator und Preisen](../produktkatalog-konfigurator-preise/), wie Produkte und Preise abgebildet werden; alle Kapitel stehen auf der [Übersichtsseite](../).

Revenue Cloud lohnt sich, wenn Ihre Angebote komplex sind und Ihr Umsatz wiederkehrt, und die Entscheidungen zu Preis, Regeln und Rechnung kommen vor dem Partner.
