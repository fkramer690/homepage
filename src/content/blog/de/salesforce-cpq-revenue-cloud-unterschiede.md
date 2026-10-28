---
title: "Salesforce CPQ vs. Revenue Cloud: Die echten Unterschiede"
description: "Was die CPQ- und Billing-Pakete aus SteelBrick von Revenue Cloud trennt: Datenmodell, Konfigurator, Preise, Abrechnung und warum es kein Upgrade ist."
pubDate: 2026-10-28
lang: de
slug: salesforce-cpq-revenue-cloud-unterschiede
translationKey: cpq-vs-revenue-cloud-differences
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Salesforce CPQ, Revenue Cloud, Salesforce Billing, SteelBrick, Datenmodell, Migration]
takeaways:
  - "Salesforce CPQ und Salesforce Billing sind Managed Packages aus der Übernahme von SteelBrick mit den Namespaces SBQQ und blng. Revenue Cloud nutzt diese Pakete nicht und arbeitet auf Standardobjekten."
  - "In CPQ entscheiden Produktregeln, Preisregeln und optional ein JavaScript Quote Calculator Plugin über Konfiguration und Preis. In Revenue Cloud tun das eine Constraint-Engine und Preisprozeduren."
  - "CPQ ändert Verträge über Subscription-Datensätze und ein neues Angebot mit Opportunity. Revenue Cloud führt verkaufte Produkte als Assets mit Zeiträumen, jede Änderung läuft über Angebot und Auftrag."
  - "Laut Salesforce-Hilfe unterscheiden sich die Datenmodelle erheblich, und Revenue Cloud ist mehr als die nächste CPQ-Version. Berichte und Dashboards werden auf Standardobjekten neu gebaut."
  - "Der Wechsel von CPQ zu Revenue Cloud bedeutet, Regeln, Preise und Daten neu zu entwerfen. Planen und budgetieren Sie ihn wie eine Neueinführung."
faq:
  - q: "Ist Revenue Cloud ein Upgrade von Salesforce CPQ?"
    a: "Nein. Die Salesforce-Hilfe schreibt, dass Revenue Cloud nicht nur die nächste Version von Salesforce CPQ ist und sich die Datenmodelle erheblich unterscheiden. Ein Versions-Upgrade gibt es nicht; Konfiguration, Preise und Daten werden neu gebaut oder migriert."
  - q: "Nutzt Revenue Cloud die SBQQ-Objekte?"
    a: "Nein. Revenue Cloud nutzt weder das CPQ-Paket noch dessen Namespace SBQQ. Es arbeitet auf Standardobjekten wie Product2, Quote, Order und Asset sowie auf Objekten für Katalog, Preise und Konfiguration."
  - q: "Was ersetzt die CPQ-Preisregeln in Revenue Cloud?"
    a: "Preisprozeduren in Salesforce Pricing. Eine Prozedur führt Preiselemente nacheinander aus, liest Daten über Decision Tables und zeigt jeden Schritt in einem Preis-Wasserfall. Eigene Logik aus einem JavaScript Quote Calculator Plugin muss dafür neu entworfen werden."
  - q: "Was ersetzt die CPQ-Produktregeln?"
    a: "Der Product Configurator mit Produktklassifizierungen und Attributen, für komplexe Produkte die Constraint Rules Engine mit der Constraint Modeling Language (CML). Einfache Abhängigkeiten können Wenn-dann-Konfigurationsregeln bleiben, komplexe werden als deklarative Bedingungen formuliert."
  - q: "Können CPQ und Revenue Cloud in derselben Org laufen?"
    a: "Die Salesforce-Hilfe nennt den Parallelbetrieb während der Umstellung und das Behalten der CPQ-Lizenz als Planungsthemen einer Migration. In der Praxis laufen beide eine Zeit lang nebeneinander, planen Sie also, welche Produkte und Kunden zuerst umziehen."
draft: false
---

Salesforce CPQ und Revenue Cloud lösen dieselbe Aufgabe: konfigurieren, bepreisen, anbieten und abrechnen. Technisch sind es verschiedene Produkte. CPQ und Salesforce Billing sind Managed Packages aus SteelBrick mit eigenen Objekten unter den Namespaces SBQQ und blng. Revenue Cloud läuft auf Standardobjekten, konfiguriert mit einer Constraint-Engine, rechnet Preise mit Preisprozeduren und führt verkaufte Produkte als Assets. Die Salesforce-Hilfe schreibt, dass sich die Datenmodelle "differ significantly" und Revenue Cloud "not just the next version of Salesforce CPQ" ist. Für CPQ-Kunden heißt das: Regeln, Preise und Daten werden neu entworfen, einen Upgrade-Pfad gibt es nicht.

## Woher kommen die beiden Produkte?

Salesforce hat SteelBrick laut [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) im Dezember 2015 für 360 Millionen Dollar gekauft. Die Quote-to-Cash-Software von SteelBrick lief schon damals nativ auf der Salesforce-Plattform. Daraus wurden Salesforce CPQ und Salesforce Billing, beide als Managed Packages installiert. CPQ-Objekte tragen das Präfix `SBQQ__`, zum Beispiel `SBQQ__Quote__c`, und der [Billing Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm) führt seine Objekte unter `blng__`.

Die Entwicklerdokumentation von Revenue Cloud reicht bis Spring '24 (API 60.0) zurück, damals hieß das Produkt Revenue Lifecycle Management. Danach wurde es als Revenue Cloud Advanced verkauft, und in der aktuellen Dokumentation heißt es Revenue Management. Der [Developer Guide zu Winter '27](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) trägt den Titel "Revenue Management Developer Guide" und beschreibt Standardobjekte und Business APIs je Bereich. Salesforce selbst schrieb im Juli 2025, man habe "rebuilt its CPQ solution as the all-new Revenue Cloud". CPQ ist inzwischen im Verkaufsende, ohne End-of-Life-Datum; die Einzelheiten stehen in [Salesforce CPQ Verkaufsende: Was gilt im Oktober 2026?](../salesforce-cpq-verkaufsende-status/).

```zeitleiste
2015-12 | Salesforce kauft SteelBrick, daraus werden Salesforce CPQ und Salesforce Billing
Spring '24 | Revenue Lifecycle Management in der Entwicklerdokumentation (API 60.0)
2025-07 | Salesforce: CPQ neu gebaut als "all-new Revenue Cloud"
Winter '27 | Developer Guide heißt "Revenue Management Developer Guide"
```

## Die Unterschiede auf einen Blick

| Bereich | Salesforce CPQ und Billing (SteelBrick) | Revenue Cloud |
|---|---|---|
| Technische Form | Managed Packages, Namespaces `SBQQ` und `blng` | Standarddatenmodell der Plattform, API-first beim Angebot |
| Angebot, Auftrag, Verkauftes | Paketobjekte wie `SBQQ__Quote__c`, Subscription-Datensätze am Vertrag | Standardobjekte Quote, Order, Asset |
| Produktmodell | Produkte und Bundles mit Features und Optionen | Kataloge, Kategorien, Produktklassifizierungen mit Attributen, Bundles |
| Konfigurationsregeln | Produktregeln: Validation, Selection, Filter, Alert | Konfigurationsregeln und Constraint Rules Engine mit CML |
| Preisberechnung | Preisregeln, optional JavaScript Quote Calculator Plugin | Preisprozeduren, Decision Tables, Context Definitions, Preis-Wasserfall |
| Nach dem Verkauf | Vertrag mit Subscription-Datensätzen | Assets mit Asset State Periods und Asset Actions |
| Nachtrag und Verlängerung | Neues Angebot mit Opportunity zum Vertrag | Nachtrags- oder Verlängerungsangebot, dann Auftrag |
| Freigaben | Paket Advanced Approvals | Advanced Approvals als Invocable Actions und Business APIs |
| Auftrag bis Erfüllung | Auftrag aus dem Angebot erzeugt | Auftrag, optional über Dynamic Revenue Orchestrator (Add-on) |
| Abrechnung | Paket Salesforce Billing | Add-on Revenue Cloud Billing: Usage Rating und Digital Wallet, Rechnungen, Zahlungen, Mahnwesen, Nebenbuch |
| Berichte und Dashboards | Auf Paketobjekten gebaut | Auf Standardobjekten neu gebaut |
| Ablage der Konfiguration | Überwiegend Datensätze | Überwiegend Datensätze |
| Status Oktober 2026 | Verkaufsende, Wartungsphase, keine neuen Funktionen | Aktiv weiterentwickelt, verkauft als Growth und Advanced |

Die Quellen zur Tabelle folgen in den Abschnitten unten. Die Zeile zur Ablage der Konfiguration ist die eine Gemeinsamkeit, die im Betrieb zählt: Laut [Gearset](https://docs.gearset.com/en/articles/10981375-understanding-the-difference-between-salesforce-cpq-and-revenue-lifecycle-management-rlm-revenue-cloud-advanced-rca) liegt die Konfiguration in beiden Produkten überwiegend als Daten vor. Deployments brauchen also in beiden Fällen Daten-Templates, nur für andere Objekte.

## Wie unterscheiden sich Produktmodell und Konfigurator?

In CPQ ist ein konfigurierbares Produkt ein Bundle mit Features und Optionen. [Produktregeln](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) gibt es in vier Typen: Validation-Regeln prüfen Kombinationen, Selection-Regeln fügen Optionen hinzu, entfernen, verstecken oder sperren sie, Filter-Regeln filtern vorab, was hinzugefügt werden kann, und Alert-Regeln zeigen Hinweise. Jede Regel ist eine ausdrückliche Wenn-dann-Aussage mit eigenen Bedingungs- und Aktionsdatensätzen.

Revenue Cloud beginnt beim Katalog. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management) ist eine Produktklassifizierung eine Vorlage mit einer Reihe von Attributen. Produkte, die daraus entstehen, erben die Attribute und können einzelne überschreiben. Für variantenreiche Maschinen ändert das die Modellierungsfrage: Eigenschaften wie Spannung oder Farbe werden Attribute statt eigener Optionen oder Produkte.

Für die Regeln bietet Revenue Cloud die [Constraint Rules Engine](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine). Sie bewertet alle möglichen Kombinationen und entfernt ungültige, während der Nutzer konfiguriert. Regeln entstehen in der Constraint Modeling Language (CML), entweder direkt im CML-Editor oder erzeugt vom Visual Builder ohne Code. Trailhead beschreibt den Unterschied selbst: Regelbasierte Ansätze arbeiten mit ausdrücklicher Wenn-dann-Logik, constraint-basierte mit deklarativen Bedingungen zwischen Optionen und brauchen für komplexe Produkte weniger Regeln.

Meine Einschätzung: Für einen Hersteller ist das die größte Änderung. Dreihundert Produktregeln werden nicht zu dreihundert Constraints. Jemand muss verstehen, was die Regeln technisch bedeuten, und sie neu modellieren. Diese Person sitzt meist im Produktmanagement oder in der Konstruktion, selten im CRM-Team.

## Wie unterscheidet sich die Preisberechnung?

In CPQ automatisieren [Preisregeln](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) Berechnungen und schreiben Felder der Angebotspositionen. Wo das nicht reichte, haben viele Orgs das [JavaScript Quote Calculator Plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html) ergänzt: eigener JavaScript-Code, als Custom Script gespeichert, der die Berechnung im Quote Line Editor verändert.

Revenue Cloud rechnet mit [Salesforce Pricing](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products). Eine Context Definition übergibt die Produktdaten aus dem Angebot an eine Preisprozedur. Die Prozedur führt ihre Preiselemente nacheinander aus, Decision Tables holen die Preisdaten, und das Ergebnis geht zurück ins Angebot. Ein Preis-Wasserfall zeigt jeden Schritt vom Listenpreis bis zum Nettopreis. Für Controlling und Prüfungen ist das ein echter Fortschritt, weil die Frage "warum dieser Preis?" eine Antwort auf dem Bildschirm bekommt.

Für ein Quote Calculator Plugin gibt es kein direktes Gegenstück. Seine Logik muss auf Prozedurelemente, Decision Tables oder einen externen Aufruf verteilt werden. Ein typisches Szenario, als Annahme: Ein Komponentenhersteller hat 40 Preisregeln und ein Plugin mit einigen hundert Zeilen JavaScript für Händlerrabatte. Jede Regel und jeder Zweig im Plugin wird zur Designentscheidung: Wird sie noch gebraucht, gehört sie in eine Prozedur, oder sollte der Preis aus SAP kommen?

## Wie unterscheiden sich Verträge, Nachträge und Verlängerungen?

In CPQ endet der Verkauf in einem Vertrag. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/sf_cpq/sf_cpq_manage_contracts_renewals) enthält der Vertrag Subscription-Datensätze für Abo-Produkte. Ein Nachtrag erzeugt ein neues Angebot und eine Opportunity, bepreist für die Restlaufzeit, und CPQ kann Verlängerungs-Opportunities und Angebote automatisch anlegen.

Revenue Cloud führt die installierte Basis als Assets. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) beschreibt, dass jede Änderung als Angebot verarbeitet und über einen Auftrag abgeschlossen wird. Asset State Periods halten die Menge über die Zeit fest, Asset Actions protokollieren jede Änderung, etwa einen Upsell, und das Angebot zeigt Startmenge, Änderung und Endmenge.

Für Hersteller mit Wartungsverträgen und Abos ist das die zweite große Änderung. Offene CPQ-Subscriptions müssen zu Assets mit korrekter Historie werden. Die Salesforce-Hilfe behandelt das im Migrationsleitfaden unter den Asset-Daten.

## Was ist mit Abrechnung und Freigaben?

Auch das Paket Salesforce Billing und Revenue Cloud Billing sind getrennte Produkte. Laut [Salesforce](https://www.salesforce.com/sales/revenue-cloud-billing/) umfasst Revenue Cloud Billing nutzungsbasierte Abrechnung mit Digital Wallet, eine Invoicing Engine mit Dokumenterstellung, Zahlungen, Mahnwesen, Steuern über externe Steuer-Engines und ein Accounting Subledger, das Buchungen an das ERP übergibt. Was ein Umstieg für offene Rechnungen und Zahlungshistorie bedeutet, beschreibe ich in [von Salesforce Billing zu Revenue Cloud Billing](../von-salesforce-billing-zu-revenue-cloud-billing/).

Freigaben heißen in beiden Welten gleich, was für Verwirrung sorgt. In CPQ ist Advanced Approvals ein [eigenes Paket](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals). In Revenue Cloud besteht [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) aus Invocable Actions, Business APIs und Feldern auf Standardobjekten. Freigabeketten müssen neu gebaut werden.

## Warum ist der Wechsel kein Upgrade?

Salesforce sagt es selbst. Die Hilfeseite [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) schreibt, dass sich die Datenmodelle "differ significantly", dass der Umstieg "requires updates to the system architecture", dass Berichte und Dashboards auf den Standardobjekten neu gebaut werden und dass "tools don't replace human design decisions, particularly for custom logic and integration remapping". Sie beschreibt drei Phasen, die nacheinander abgeschlossen werden, und keinen festen Zeitrahmen.

Daraus ziehe ich für Hersteller drei Schlüsse:

1. **Budgetieren Sie wie eine Neueinführung.** Migrationswerkzeuge bewegen Daten, Regeln, Preise und Freigaben werden aber neu entworfen. Salesforce nennt drei bis sechs Monate als typisch. Damit würde ich nur bei einer aufgeräumten Org planen.
2. **Räumen Sie vorher auf.** Jede ungenutzte Produktregel, Preisregel und jeder Plugin-Zweig, den Sie vor der Migration löschen, ist eine Designentscheidung weniger. Eine [Org-Analyse](../ki-org-analyse-technische-schulden/) zeigt, was tatsächlich genutzt wird.
3. **Planen Sie Deployments für Daten.** Katalog, Preise und Konfiguration sind auch in Revenue Cloud Datensätze. Wie solche Daten durch die Pipeline kommen, beschreibt das DevOps-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/).

Ob sich der Wechsel überhaupt lohnt, ist eine eigene Frage. Die beantworte ich in [CPQ behalten oder zu Revenue Cloud wechseln?](../cpq-behalten-oder-revenue-cloud/).

## Wo starten Sie?

Zählen Sie, was Sie haben: Produktregeln, Preisregeln, Zeilen im Quote Calculator Plugin, Angebotsvorlagen, Freigabeketten, offene Subscriptions und Schnittstellen, die in SBQQ-Objekte schreiben. Diese Liste ist der Umfang des Neuentwurfs. Wie die Migration dann in Phasen abläuft, steht in [CPQ zu Revenue Cloud migrieren](../cpq-migration-revenue-cloud-phasen/) und im Masterclass-Kapitel [von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

CPQ und Revenue Cloud haben denselben Zweck und unterscheiden sich darunter fast überall, behandeln Sie den Wechsel deshalb als neuen Entwurf. Wenn Sie vor dieser Entscheidung Ihre CPQ-Org bewerten lassen möchten, [schreiben Sie mir](#contact).
