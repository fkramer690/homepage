---
title: "Revenue Cloud Deployments: Konfiguration in der Pipeline"
description: "Wie Katalog, Pricing Procedures und Context Definitions von der Sandbox in die Produktion kommen, wenn Revenue-Cloud-Konfiguration meist Daten ist."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-konfiguration-deployment
translationKey: revenue-cloud-configuration-deployment
topic: devops
categories: [revenue-cloud, devops]
tags: [Revenue Cloud, Deployment, Konfigurationsdaten, Context Definitions, SFDMU, Gearset]
takeaways:
  - "Revenue-Cloud-Konfiguration besteht meist aus Datensätzen: Attribute, Klassifizierungen, Produkte, Verkaufsmodelle, Preisbucheinträge, Billing Policies. Ein Metadaten-Deployment allein bringt wenig davon mit."
  - "Salesforce hat kein eingebautes Deployment-Werkzeug für Revenue Cloud. Der Developer Guide gibt eine Reihenfolge je Bereich vor: Metadaten zuerst, Eltern vor Kindern."
  - "Context Definitions: Nur eigene lassen sich abrufen und deployen, die Aktivierung ist ein manueller Schritt, und ein Deployment in eine Org mit älterem Release wird nicht unterstützt."
  - "Nach jedem Deployment werden Decision Tables aktualisiert, Preisdaten synchronisiert und der Produktindex neu aufgebaut. Diese Schritte gehören in die Release-Checkliste."
  - "Konfigurationsdaten brauchen eine stabile eindeutige ID je Datensatz und ein Datenwerkzeug, das dem Kunden gehört. Produkte und Preise aus SAP kommen nie per Deployment in die Produktion."
faq:
  - q: "Lässt sich Revenue-Cloud-Konfiguration mit Change Sets oder der Metadata API deployen?"
    a: "Nur zum Teil. Decision Tables, Pricing Recipes und Context Definitions sind Metadaten, Katalog, Attribute, Verkaufsmodelle, Preisbucheinträge und Billing Policies dagegen Datensätze. Dafür brauchen Sie ein Daten-Deployment mit SFDMU, Gearset, Copado oder einem ähnlichen Werkzeug."
  - q: "Warum scheitert das Deployment von Context Definitions?"
    a: "Gearset dokumentiert zwei typische Fehler, die daher kommen, dass die Definitionen in der Ziel-Org nicht synchron sind. Die Lösung: dort auf der Seite Context Service auf Sync klicken und erneut deployen. Standarddefinitionen lassen sich gar nicht deployen, nur eigene."
  - q: "Wandern Regeln des Produktkonfigurators wie andere Datensätze zwischen Orgs?"
    a: "Nein. Laut Developer Guide verweisen die Regelinhalte auf Produkt-IDs, die sich nicht unverändert migrieren lassen. Salesforce nennt dafür ein npm-Werkzeug namens rev-config-rule-migrator."
  - q: "Unterscheidet sich das Deployment von Revenue Cloud von dem in Salesforce CPQ?"
    a: "In beiden Produkten ist die meiste Konfiguration Daten. Der Unterschied liegt in den Objekten: CPQ hält sie in Paketobjekten mit dem Präfix SBQQ, Revenue Cloud in Standardobjekten mit Aktivierungsstatus und Schritten nach dem Deployment, etwa dem Aktualisieren von Decision Tables."
draft: false
---

Die meiste Konfiguration in Revenue Cloud sind Daten: Attributdefinitionen, Produktklassifizierungen, Produkte, Verkaufsmodelle, Preisbucheinträge, Preisanpassungen und Billing Policies sind Datensätze auf Standardobjekten. Nur ein Teil, etwa Decision Tables, Pricing Recipes und Context Definitions, ist Metadaten. Ein eigenes Deployment-Werkzeug für Revenue Cloud bietet Salesforce nicht an, dokumentiert aber eine Reihenfolge je Bereich: Metadaten zuerst, Elterndatensätze vor Kindern. Mehrere Schritte bleiben manuell, etwa das Aktivieren von Context Definitions, das Aktualisieren von Decision Tables, das Synchronisieren der Preisdaten und der Neuaufbau des Produktindex. Meine Regel: Konfigurationsdaten liegen im Repository des Kunden, mit stabiler ID je Datensatz, und ERP-Stammdaten wandern nie per Deployment.

## Warum ist Revenue-Cloud-Konfiguration meist Daten?

In Salesforce CPQ sind Preisregeln, Produktregeln und Optionen Datensätze in Paketobjekten. Revenue Cloud, in der Salesforce-Hilfe auch als Revenue Management und früher als Revenue Lifecycle Management geführt, folgt demselben Prinzip auf Standardobjekten. Gearset fasst es in seinem [Vergleich von CPQ und Revenue Cloud](https://docs.gearset.com/en/articles/10981375-understanding-the-difference-between-salesforce-cpq-and-revenue-lifecycle-management-rlm-revenue-cloud-advanced-rca) zusammen: In beiden Produkten liegt die meiste Konfiguration als Daten vor, für Revenue Cloud heißt es dort: "Most configuration is stored as data, not metadata."

Für Teams, die von CPQ kommen, sehen die Unterschiede so aus:

| Thema | Salesforce CPQ | Revenue Cloud |
|---|---|---|
| Wo die Konfiguration liegt | Paketobjekte mit dem Präfix `SBQQ` | Standardobjekte wie ProductClassification, ProductSellingModel, PriceBookEntry |
| Metadatenanteil | Paket plus eigene Anpassungen | Zusätzlich Decision Tables, Pricing Recipes, Context Definitions |
| Status der Datensätze | Checkbox Aktiv an Preis- und Produktregeln | Status Draft, Active und Inactive; manche Aktivierung ist manuell |
| Unterstützung in Gearset | Vergleichen und Deployen mit dem External-ID-Assistenten | Data Deployment Templates; der External-ID-Assistent unterstützt Revenue Cloud noch nicht |

Die Folge: Ein Revenue-Cloud-Release besteht immer aus zwei Deployments, Metadaten und Daten, plus einer kurzen Liste manueller Schritte. Den ausführlichen Vergleich beider Produkte finden Sie in [Salesforce CPQ und Revenue Cloud: die echten Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/).

## In welcher Reihenfolge wandert die Konfiguration?

Der [Deployment-Leitfaden für Revenue Management](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-overview.html) sagt es deutlich: "There's no built-in, Revenue Management-specific deployment tool." Stattdessen beschreibt er die Regeln unter [Deployment Workflows and Sequence](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-workflows-and-sequence.html): Metadaten müssen vor den Datensätzen eines Objekts stehen, Eltern kommen vor Kindern, und zirkuläre Verweise brauchen manchmal einen zweiten Durchlauf. Zwei Beispiele von Salesforce: der Datensatztyp Product Specification vor jedem Produkt und Decision Tables vor Pricing Recipes.

Die [Object Deployment Reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) hat eine Tabelle je Bereich: Produktkatalog, Pricing, Konfigurator, Transaktionen, Dynamic Revenue Orchestrator, Usage, Billing und Contracts. Für Katalog und Preise steht die gekürzte Reihenfolge hier:

```vertiefung Für Entwickler
titel: Reihenfolge für Katalog und Preise, von oben nach unten
- Product Specification Type und Datensatztyp (Metadaten).
- Attribut-Picklisten und Werte, Mengeneinheiten, Attributdefinitionen und Attributkategorien.
- Produktklassifizierungen und ihre Attribute, dann Product2.
- Product Selling Models und ihre Optionen, danach Bundle-Komponenten.
- Kataloge, Kategorien und deren Produktzuordnungen.
- Preisbücher, Kostenbücher, Preisbucheinträge, danach Preisanpassungspläne und Staffeln.
```

Billing hat eine eigene Reihenfolge, von Rechtseinheit und Billing Policy über Steuer-Engine und Zahlungsbedingungen bis zu den Buchungsperioden. Diese Tabellen sind für mich die Quelle für die Reihenfolge der Datenschritte in der Pipeline, nicht das Gedächtnis eines Partners.

## Was deployt die Pipeline, und was bleibt manuell?

Einige Teile wandern nur mit Sorgfalt. Aus Developer Guide und Gearset-Dokumentation:

- **Context Definitions.** Laut [Gearset](https://docs.gearset.com/en/articles/11384495-how-to-deploy-context-definitions) lassen sich nur eigene Context Definitions abrufen und deployen, Standarddefinitionen nicht. Scheitert ein Deployment, weil das Ziel nicht synchron ist, klicken Sie in der Ziel-Org auf der Seite Context Service auf Sync und deployen erneut. Die [Hinweise von Salesforce zum Context Service](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-context-service-additional-info.html) ergänzen: Aktivieren und Deaktivieren ist ein manueller Schritt außerhalb des Deployments, und ein Deployment vom aktuellen Release in ein älteres wird nicht unterstützt.
- **Pricing.** Laut den [Hinweisen zu Salesforce Pricing](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-salesforce-pricing-additional-info.html) müssen Decision Tables und Pricing Procedures aktiviert werden, eine Decision Table braucht für jeden neuen oder geänderten Datensatz eine Aktualisierung, und ein aktiver oder inaktiver Datensatz lässt sich nicht zurück auf Draft setzen.
- **Konfiguratorregeln.** Laut den [Hinweisen zum Product Configurator](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-product-configurator-additional-info.html) lassen sich aktive Regeln nicht ändern, und das Ziel-Constraint-Modell muss vor einer Änderung deaktiviert sein. Die Regelinhalte verweisen auf Produkt-IDs, deshalb nennt Salesforce für die Migration ein npm-Werkzeug, `rev-config-rule-migrator`.
- **Nach jedem Deployment.** Die [Post-Deployment-Schritte](https://developer.salesforce.com/docs/revenue/revenue-management/guide/post-deployment-steps.html) sind: Decision Tables aktualisieren, Preisdaten synchronisieren, Produktindex neu aufbauen, von Hand anlegen, was die API nicht deployen konnte, und Testnutzer einrichten.

Der Release-Punkt wird am leichtesten übersehen:

```hinweis achtung
Im Preview-Fenster von Salesforce laufen Sandboxes Wochen vor der Produktion auf dem neuen Release. Eine Context Definition, die in einer Preview-Sandbox entsteht, kann dann erst in die Produktion, wenn diese dasselbe Release hat.
```

Welche Sandbox auf welchem Release läuft, gehört in die Planung von [Umgebungen und Branching](../../masterclass/devops-release-management/umgebungen-und-branching/).

## Wie finden sich Datensätze über Orgs hinweg?

Ein Produkt hat in jeder Org eine andere Salesforce-ID. Der Leitfaden zum [Global Unique ID Setup](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-global-uid-setup.html) stellt fest, dass diese ID "isn't portable", und empfiehlt eine eindeutige ID-Spalte auf allen Objekten vom ersten Tag an oder eine gepflegte Zuordnung der Datensatz-IDs zwischen den Orgs. Bei Metadatentypen dient der API-Name als ID.

Ich würde das einrichten, bevor der erste Konfigurationsdatensatz entsteht: ein als External ID markiertes Feld auf jedem Konfigurationsobjekt, mit einem lesbaren Wert wie `PSM_TERM_MONTHLY` oder `PCL_PUMPE_STANDARD`. Nachträglich eingeführt heißt das, jede Sandbox aufzuräumen.

## Welches Werkzeug bewegt die Daten?

Jedes Datenwerkzeug, das verbundene Datensätze in der richtigen Reihenfolge lädt und über External IDs abgleicht. Das Kapitel der DevOps-Masterclass zu [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/) vergleicht SFDMU, das Open-Source-Plugin für die Salesforce CLI, mit den Datenmodulen von Gearset, Copado und Flosum. Für Revenue Cloud empfiehlt Gearset seine Data Deployment Templates. Welches Werkzeug insgesamt zu Ihrem Programm passt, entscheidet der [Vergleich der DevOps-Werkzeuge](../../masterclass/devops-release-management/devops-werkzeuge-vergleich/).

Eine Regel gilt für jedes Werkzeug: Data Templates, SFDMU-Arbeitsbereiche und der Werkzeugzugang gehören dem Kunden. Revenue-Cloud-Konfiguration ist Ihre Preislogik und Ihr Katalog. Liegt sie im Gearset-Konto eines Partners, wird ein Partnerwechsel zum Migrationsprojekt. Die Gründe stehen in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/).

## Wo verläuft die Grenze zwischen Konfiguration und ERP-Stammdaten?

Die Deployment-Referenz führt Product2 und PriceBookEntry als Konfigurationsobjekte. Bei einem Hersteller stimmt das nur zur Hälfte. Kommen Materialnummern und Listenpreise aus SAP, erreichen sie die Produktion über die Schnittstelle, und eine Sandbox bekommt einen Seed-Datensatz. Ein Deployment von der Sandbox in die Produktion wäre ein zweiter, konkurrierender Weg.

Meine Aufteilung:

- **Repository und Pipeline:** Attribute, Klassifizierungen, Verkaufsmodelle, Bundle-Strukturen, Anpassungsregeln, Pricing Procedures, Decision Tables, Context Definitions, Billing- und Steuer-Policies.
- **Schnittstelle aus SAP:** Produkte mit Materialnummern, Listenpreise und Kundenkonditionen, wenn SAP den Preis führt.

Welche Preise SAP führen sollte, behandelt [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/).

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer betreibt Revenue Cloud mit drei Sandboxes und der Produktion. 300 Produkte und Listenpreise kommen aus SAP, 45 Attribute, 12 Klassifizierungen, 4 Verkaufsmodelle und 6 Pricing Procedures werden in Salesforce gepflegt. Alle Zahlen sind Annahmen.

Ein Release, das einen neuen attributbasierten Aufschlag einführt, läuft dann so: Der Pull Request enthält die Attributdefinition, die Änderung der Klassifizierung und die neue Anpassungsregel als SFDMU-Datensätze mit External IDs, dazu die geänderte Decision Table als Metadaten. Die Pipeline deployt erst Metadaten, dann Daten, in der Reihenfolge der Referenztabellen. Den Rest regelt die Release-Checkliste: Procedure aktivieren, Decision Tables aktualisieren, Preisdaten synchronisieren, Produktindex neu aufbauen und fünf Regressionsangebote rechnen. Eine solche Pipeline aufzusetzen gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/). Die Migration davor beschreiben [CPQ zu Revenue Cloud migrieren](../cpq-migration-revenue-cloud-phasen/) und das Masterclass-Kapitel [Von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

Revenue-Cloud-Konfiguration gehört wie Code in die Pipeline, mit fester Reihenfolge, eindeutigen IDs und einer Checkliste für die manuellen Schritte. Wenn Sie das aufsetzen möchten, [schreiben Sie mir](#contact).
