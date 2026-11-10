---
title: "Revenue Cloud, RLM, RCA: Welcher Name gilt jetzt?"
metaTitle: "Salesforce Revenue Cloud, RLM, RCA: Welcher Name gilt?"
description: "Revenue Management, Revenue Cloud, RLM, RCA oder CPQ? Was die Salesforce-Namen heute bedeuten und welcher ins Bestellformular oder die Ausschreibung gehört."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-produktnamen-rlm-rca
translationKey: revenue-cloud-product-names
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Revenue Lifecycle Management, CPQ, Lizenzen, Produktnamen]
takeaways:
  - "Salesforce-Hilfe und Entwicklerdoku nennen das native Produkt Revenue Management; salesforce.com und die Lizenzen nutzen weiter Revenue Cloud."
  - "Revenue Cloud von 2020 war eine Suite rund um die Pakete CPQ und Billing. Das heutige Revenue Cloud ist ein anderes Produkt auf Standardobjekten."
  - "Salesforce CPQ ist das separate Managed Package SBQQ. Von CPQ zu Revenue Management gibt es kein Upgrade, nur eine Neueinführung."
  - "Ins Bestellformular oder in die Ausschreibung gehören Datenmodell, Edition und die genauen Positionen aus dem Salesforce-Angebot, nie nur Revenue Cloud."
faq:
  - q: "Ist Revenue Lifecycle Management dasselbe wie Revenue Cloud?"
    a: "Für das heutige native Produkt ja. Laut Salesforce-Hilfe hieß das heutige Revenue Management ursprünglich Revenue Lifecycle Management und wird auch Revenue Cloud genannt. Dieselbe Hilfe führt Revenue Cloud aber auch als alten Namen von Salesforce CPQ, deshalb sollten Sie prüfen, welches Produkt ein Dokument meint."
  - q: "Wofür steht RCA bei Salesforce?"
    a: "RCA steht für Revenue Cloud Advanced, die umfassendere der Revenue-Cloud-Lizenzen neben Growth und Billing. Salesforce positioniert sie als Nachfolger von Salesforce CPQ. Die Hilfe verwendet RCA auch als weiteren Namen für das Produkt insgesamt."
  - q: "Ist Agentforce Revenue Management ein eigenes Produkt?"
    a: "Nein. Salesforce hat den Namen für die Produktsuite verwendet, zu der Revenue Cloud Advanced und Revenue Cloud Billing gehören. Trailhead und die CPQ-Seite zum Verkaufsende nutzen ihn noch, Produkt- und Preisseiten verwenden Revenue Cloud."
  - q: "Gehört Salesforce CPQ zu Revenue Cloud?"
    a: "Zum heutigen Revenue Cloud nicht. CPQ ist ein Managed Package mit dem Namespace SBQQ und wird an Neukunden nicht mehr verkauft. Im Revenue-Cloud-Paket von 2020 war es einer der Bausteine."
draft: false
---

Salesforce verwendet für sein natives Quote-to-Cash-Produkt gerade zwei Namen gleichzeitig. Salesforce-Hilfe und Entwicklerdoku nennen es Revenue Management (früher Revenue Cloud). Produkt- und Preisseiten sowie die Lizenzen verwenden weiterhin Revenue Cloud: Revenue Cloud Growth, Revenue Cloud Advanced (RCA) und Revenue Cloud Billing. Revenue Lifecycle Management (RLM) war der ursprüngliche Name im Release Spring '24, Trailhead verwendet Agentforce Revenue Management. Salesforce CPQ ist ein anderes Produkt: das ältere Managed Package mit dem Namespace SBQQ. Ins Bestellformular würde ich deshalb Datenmodell, Edition und die genauen Positionen aus dem Salesforce-Angebot schreiben.

## Wie sind die Namen entstanden?

Die Geschichte erklärt den größten Teil der Verwirrung. Kurz gefasst:

| Wann | Name | Bedeutung | Quelle |
|---|---|---|---|
| Dezember 2015 | SteelBrick | Quote-to-Cash-Startup mit CPQ und Abrechnung; Übernahme durch Salesforce im Dezember 2015 angekündigt, im Februar 2016 abgeschlossen | [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) |
| Nach der Übernahme | Salesforce CPQ, Salesforce Billing | Managed Packages mit den Namespaces SBQQ und blng | Entwicklerdokumentation zu [CPQ](https://developer.salesforce.com/docs/revenue/cpq-developer-guide/guide/cpq-api-get-started.html) und [Billing](https://developer.salesforce.com/docs/atlas.en-us.254.0.blng_dev.meta/blng_dev/apex_blng_apex_reference_overview.htm) |
| Ende 2020 | Revenue Cloud (erstes) | Suite rund um CPQ, Billing und weitere Bausteine | [Salesforce-Blog, Dezember 2020](https://www.salesforce.com/uk/blog/2020/12/rev-up-the-b2b-journey-with-revenue-cloud.html) |
| Spring '24 | Revenue Lifecycle Management | Neues Produkt auf Standardobjekten der Plattform | [Developer Guide, API 60.0](https://developer.salesforce.com/docs/atlas.en-us.248.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/rlm_get_started.htm) |
| Später | Revenue Cloud Advanced, Agentforce Revenue Management | Name der Edition und Name der Suite, zu der sie gehört | [CPQ-Seite zum Verkaufsende](https://www.salesforce.com/sales/cpq/end-of-life/) |
| Winter '27 | Revenue Management | Titel des Developer Guide | [Developer Guide, API 68.0](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) |
| Oktober 2026 | Revenue Cloud | Überschrift der Produkt- und Preisseiten | [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management) |

Eine Anmerkung zur Tabelle: Der Developer Guide zu Spring '24 ist die älteste Version, die ich gefunden habe und die den Titel Revenue Lifecycle Management Developer Guide trägt. Die beiden Pakete tragen ihre Namen und Namespaces bis heute, deshalb meint "CPQ" im Gespräch fast immer das SBQQ-Paket.

## Revenue Cloud Advanced, Revenue Cloud und CPQ im Vergleich

Revenue Cloud Advanced ist die größere Edition des heutigen Revenue Cloud, neben Revenue Cloud Growth. Beide Namen gehören also zum selben Produkt. Der eigentliche Vergleich ist der mit Salesforce CPQ, dem älteren Managed Package, dessen Nachfolger laut Salesforce Revenue Cloud Advanced ist.

| | Salesforce CPQ | Revenue Cloud Growth | Revenue Cloud Advanced |
|---|---|---|---|
| Was es ist | Managed Package von SteelBrick | Kleinere Edition des heutigen Revenue Cloud | Größere Edition des heutigen Revenue Cloud |
| Datenmodell | Paketobjekte mit dem Namespace SBQQ | Standardobjekte der Plattform | Standardobjekte der Plattform |
| Umfang | Konfiguration, Preisfindung und Angebote; Abrechnung läuft über das eigene Paket blng | Angebote mit Konfigurator, Auftragserfassung, Abonnements | Alles aus Growth plus Verträge und Aufträge, Verbrauch und Rechnungsstellung, KI und Analytics |
| Neukunden | Nicht mehr erhältlich | 150 Euro pro Nutzer und Monat | 200 Euro pro Nutzer und Monat |

Die Preise sind die Listenpreise der Preisseite im Oktober 2026 und gelten zusätzlich zu Sales Cloud. Der Weg von CPQ zu einer der beiden Editionen bedeutet eine Neueinführung, weil es keinen Upgrade-Pfad gibt. Die Unterschiede bei Datenmodell, Konfigurator, Preisfindung und Verlängerungen stehen in [Salesforce CPQ vs. Revenue Cloud: die echten Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/), Preise und Add-ons in [Revenue Cloud Preise](../revenue-cloud-editionen-preise/).

## Warum verwenden Salesforce-Quellen verschiedene Namen?

Weil sie zu verschiedenen Zeitpunkten aktualisiert wurden. Stand Ende Oktober 2026:

- **salesforce.com** zeigt "Revenue Cloud" als Überschrift der [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management), zuletzt geändert am 22. Oktober 2026, und der [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/). Die Editionen heißen Revenue Cloud Growth und Revenue Cloud Advanced.
- **Der Developer Guide** zu Winter '27 heißt Revenue Management Developer Guide und schreibt: "Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation."
- **Die Salesforce-Hilfe** hat eine [Seite zur Frage, welches Produkt man hat](https://help.salesforce.com/s/articleView?id=ind.rev_which_product.htm&language=en_US&type=5). Sie bezeichnet Revenue Management als das aktuelle Produkt, nennt als weitere Namen Revenue Cloud, Revenue Cloud Advanced und Revenue Lifecycle Management und führt Revenue Cloud und SteelBrick als weitere Namen von Salesforce CPQ.
- **Trailhead** nennt das Grundlagenmodul [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). Die Release Highlights zu Winter '27 führen die Neuerungen dagegen unter "Revenue Cloud".
- **Die CPQ-Seite zum Verkaufsende** beschreibt Revenue Cloud Advanced als Teil der Suite Agentforce Revenue Management und sagt, dass Revenue Lifecycle Management ein früherer Produktname war.

Suchmaschinen verstärken das. Ende Oktober 2026 erscheinen mehrere Seiten von salesforce.com in den Suchergebnissen noch mit dem Titel "Agentforce Revenue Management (formerly Revenue Cloud)", während die Seiten selbst längst Revenue Cloud verwenden. Eine Zeitleiste, die Marketing, Dokumentation und Trailhead in Einklang bringt, hat Salesforce nicht veröffentlicht.

Das Muster zieht sich durch das Portfolio: Der Name Agentforce steht inzwischen auf vielen Salesforce-Produkten, Trailhead spricht zum Beispiel auch von Agentforce Manufacturing. Das [Kapitel zu Begriffen und Landkarte](../../masterclass/ki-salesforce/begriffe-und-landkarte/) meiner KI-Masterclass sortiert diese Namen.

## Welches Revenue-Cloud-Produkt meint ein Partner?

Das ist in der Praxis die wichtigste Frage. "Revenue Cloud" hat zwei verschiedene Dinge bezeichnet:

- **Revenue Cloud von 2020** war eine Suite rund um die Pakete Salesforce CPQ und Billing. Die Daten liegen in Paketobjekten mit den Namespaces SBQQ und blng. Preisregeln, Produktregeln und das Quote Calculator Plugin gehören in diese Welt.
- **Revenue Cloud heute** ist das Produkt, das früher Revenue Lifecycle Management hieß. Es läuft auf Standardobjekten der Plattform, mit Produktklassifizierungen und Attributen, Preisprozeduren und einem regelbasierten Konfigurator.

Ein Partner, der von "30 Revenue-Cloud-Projekten" spricht, meint vielleicht CPQ-Projekte aus den Jahren 2020 bis 2023. Diese Erfahrung ist für eine CPQ-Migration wertvoll, sagt über das neue Datenmodell aber wenig. Ich stelle drei Fragen:

1. Welches Datenmodell hatten die Referenzprojekte: CPQ-Objekte mit Namespace SBQQ oder Standardobjekte?
2. Wie viele Projekte wurden seit Spring '24 mit Revenue Lifecycle Management oder Revenue Cloud Advanced?
3. Wer im vorgeschlagenen Team hat im neuen Produkt Preisprozeduren und Konfiguratorregeln gebaut?

```hinweis achtung
Für CPQ-Bestandskunden gilt umgekehrt: Beschreibt ein Angebot "Revenue Cloud", prüfen Sie, ob damit eine Neueinführung auf Basis des neuen Datenmodells gemeint ist. Ein Versionsupgrade von CPQ gibt es nicht. Salesforce schreibt selbst, Revenue Cloud Advanced sei nicht einfach CPQ mit neuem Namen, und nennt für eine typische Migration drei bis sechs Monate von der Analyse bis zum Go-live, stark abhängig von der Komplexität.
```

Der Status der alten Pakete ist ein eigenes Thema: CPQ wird an Neukunden nicht mehr verkauft, Bestandskunden können aber verlängern und erhalten Support. Was das bedeutet, behandelt das [Kapitel zum Umstieg von CPQ auf Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

## Ins Bestellformular gehören Edition, Zusatzprodukte und Positionen

Marketingnamen wechseln schneller, als Verträge auslaufen. Ein Bestellformular über drei Jahre, das heute unterschrieben wird, erlebt mindestens noch eine Umbenennung. Meine Regeln:

- **Bestellformular:** die genauen Positionsnamen und Produktcodes aus dem Salesforce-Angebot übernehmen, einschließlich Edition (Growth oder Advanced) und jedem Zusatzprodukt wie Revenue Cloud Billing, Dynamic Revenue Orchestration, Invoice Management oder Contract Lifecycle Management. "Revenue Cloud" allein reicht nicht.
- **Ausschreibung:** das Produkt anhand von Namen und Datenmodell beschreiben, zum Beispiel "Revenue Cloud Advanced (auch Revenue Lifecycle Management oder Revenue Management), nativ auf der Salesforce-Plattform, nicht das Managed Package Salesforce CPQ". Das schließt eine Verwechslung mit dem Paket von 2020 aus.
- **Lizenzprognose:** Revenue Cloud als eigene Zeile neben Sales Cloud führen, weil es zusätzlich zu einem Sales-Cloud-Abonnement gekauft wird. Wie ich so eine Prognose aufbaue, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).
- **Projektglossar:** einen Namen für das Projekt festlegen und dabei bleiben. Ich würde Revenue Cloud nehmen, weil Lizenzen und salesforce.com diesen Namen heute verwenden.

Ein Beispiel für den Unterschied: "Einführung von Salesforce Revenue Cloud" ist zu vage. Besser: "Einführung von Revenue Management auf der nativen Salesforce-Plattform mit den Positionen Revenue Cloud Advanced und Revenue Cloud Billing aus dem Salesforce-Angebot [Nummer, Datum]. Funktionen des Managed Package Salesforce CPQ sind nicht enthalten, sofern nicht aufgeführt."

## Unter allen Namen suchen

Jede Quelle hat ihren eigenen Namen. Wer nur unter einem sucht, findet die Hälfte nicht:

- **Developer Guide und Hilfe:** nach "Revenue Management" suchen. Die Adressen des Developer Guide enthalten weiterhin "revenue_lifecycle_management", das hilft beim Filtern.
- **Trailhead:** nach "Agentforce Revenue Management" und "Revenue Cloud" suchen.
- **Partnerblogs und Foren:** zusätzlich "RLM" und "RCA", die dort üblichen Abkürzungen.
- **Andere Anbieter beachten:** Certinia, ein Anbieter auf der Salesforce-Plattform, führt einen eigenen Produktbereich namens Revenue Management mit eigenen [Release Notes](https://help.certinia.com/main/2026.1/Content/RevenueManagement/Release/WhatsNew/WhatsNew.htm). Treffer von help.certinia.com beschreiben ein anderes Produkt.

Was das Produkt unter welchem Namen auch immer abdeckt, steht in [Revenue Cloud für Hersteller: Wann lohnt es sich?](../revenue-cloud-lohnt-sich-hersteller/), und was es kostet, in [Revenue Cloud Preise: Growth, Advanced und Add-ons](../revenue-cloud-editionen-preise/). Das [Überblickskapitel der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) führt diese Themen zusammen.
