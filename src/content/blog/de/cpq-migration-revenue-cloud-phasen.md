---
title: "CPQ zu Revenue Cloud migrieren: Phasen, Aufwand, Cutover"
description: "So läuft der Umstieg von Salesforce CPQ auf Revenue Cloud: drei Phasen laut Salesforce-Hilfe, Datenreihenfolge, 3 bis 6 Monate Aufwand und Kundenentscheidungen."
pubDate: 2026-10-28
lang: de
slug: cpq-migration-revenue-cloud-phasen
translationKey: cpq-to-revenue-cloud-migration-plan
topic: revenue
categories: [revenue-cloud, devops]
tags: [Salesforce CPQ, Revenue Cloud, Migration, Cutover, Datenmigration]
takeaways:
  - "Eine Migration von Salesforce CPQ zu Revenue Cloud ist ein Neuaufbau auf Standardobjekten. Laut Salesforce-Hilfe unterscheiden sich die Datenmodelle deutlich, Berichte werden neu gebaut."
  - "Die Salesforce-Hilfe teilt die Migration in drei Phasen: vorbereiten, Strategie wählen, umsetzen. Jede Phase wird abgeschlossen, bevor die nächste beginnt."
  - "Salesforce nennt 3 bis 6 Monate von der Analyse bis zum Go-live als typisch, bei komplexen Orgs mehr. Eine Frist gibt es nicht, weil CPQ kein End-of-Life-Datum hat."
  - "Daten wandern in der Reihenfolge ihrer Abhängigkeiten: zuerst Katalog und Attribute, dann Verkaufsmodelle und Preise, dann Assets aus offenen Abos, zuletzt Billing-Daten."
  - "Migrationswerkzeuge von Forsys, IdeaHelix und Prodly beschleunigen das Mapping. Preisführung, Cutover-Termin und Umfang der Historie entscheidet der Kunde."
faq:
  - q: "Wie lange dauert eine Migration von Salesforce CPQ zu Revenue Cloud?"
    a: "Salesforce nennt 3 bis 6 Monate von der Analyse bis zum Go-live als typisch und schreibt, dass komplexe Implementierungen länger dauern können. Die Salesforce-Hilfe legt keinen festen Zeitrahmen fest und empfiehlt ein Tempo, das zu Geschäft und Komplexität passt."
  - q: "Können Salesforce CPQ und Revenue Cloud in derselben Org laufen?"
    a: "Die Salesforce-Hilfe führt die Koexistenz während des Übergangs und das Beibehalten der CPQ-Lizenz als Punkte, die vor der Konfiguration geplant werden. Praktisch erstellt CPQ weiter Angebote in Produktion, während Revenue Cloud in derselben Org aufgebaut und getestet wird."
  - q: "Gibt es ein Werkzeug, das CPQ automatisch in Revenue Cloud umwandelt?"
    a: "Nicht vollständig. Salesforce nennt Forsys RevRamp, IdeaHelix und Prodly für Mapping und Automatisierung, und die Salesforce-Hilfe stellt klar, dass Werkzeuge menschliche Designentscheidungen nicht ersetzen, vor allem bei eigener Logik und beim Umbau von Schnittstellen."
  - q: "Werden CPQ-Berichte und Dashboards übernommen?"
    a: "Nein. Laut Salesforce-Hilfe müssen Berichte, Dashboards und Auswertungen auf CPQ-Objekten auf den Standardobjekten von Revenue Cloud neu erstellt werden. Planen Sie dafür ein eigenes Arbeitspaket."
draft: false
---

Eine Migration von Salesforce CPQ zu Revenue Cloud ist ein Neuaufbau auf Salesforce-Standardobjekten, mit neuer Preislogik, neuem Konfigurator und neuen Berichten. Die Salesforce-Hilfe teilt sie in drei Phasen: vorbereiten, Strategie wählen, umsetzen, jede abgeschlossen vor der nächsten. Salesforce nennt 3 bis 6 Monate von der Analyse bis zum Go-live als typisch, bei komplexen Orgs mehr. In dieser Zeit läuft CPQ in derselben Org weiter. Werkzeuge beschleunigen das Mapping von Produkten und Preisen, drei Entscheidungen bleiben aber bei Ihnen: wer den Preis führt, wann umgestellt wird und wie viel Historie mitkommt. Ohne diese Entscheidungen ist jede Partnerschätzung geraten.

## Was ändert sich zwischen CPQ und Revenue Cloud wirklich?

Salesforce CPQ und Salesforce Billing stammen von SteelBrick, das Salesforce [im Dezember 2015 gekauft hat](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/). Beide sind Managed Packages mit eigenen Objekten. Revenue Cloud, in der Salesforce-Hilfe derzeit Revenue Management genannt und ursprünglich als Revenue Lifecycle Management (RLM) gestartet, baut auf Standardobjekten auf. Die [CPQ-End-of-Life-Seite von Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/) fasst es knapp: CPQ nutzt eigene Objekte in einem Managed Package, Revenue Cloud ein Standarddatenmodell mit API-first-Angebotslogik, und "CPQ-specific objects, custom fields, pricing rules, and scripts don't map directly".

Was das für die Migration heißt, Baustein für Baustein:

| Bereich | Salesforce CPQ und Billing (SteelBrick) | Revenue Cloud | Folge für die Migration |
|---|---|---|---|
| Datenmodell | Paketobjekte, etwa `SBQQ__Quote__c` | Standardobjekte wie Quote, Order, Asset | Jedes Feld, jeder Flow, jede Schnittstelle wird neu zugeordnet |
| Produkte | Produkte mit Optionen und Features | Katalog, Klassifizierungen, Attribute, Bundles | Katalog neu entwerfen, nicht kopieren |
| Konfigurationsregeln | Produktregeln | Konfigurationsregeln und Constraint Rules Engine mit CML | Regeln neu modellieren |
| Preisfindung | Price Rules, [JavaScript Quote Calculator Plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html) | Pricing Procedures, Decision Tables | Logik neu bauen und mit echten Angeboten testen |
| Vertragsgeschäft | CPQ-Subscriptions | Assets mit Zustandsperioden | Für jedes offene Abo ein Asset anlegen |
| Abrechnung | Paket `blng` | Revenue Cloud Billing auf Standardobjekten | Eigener Cutover, siehe unten |
| Berichte | Berichte auf Paketobjekten | Berichte auf Standardobjekten | Alles neu bauen |

Den ausführlichen Vergleich finden Sie in [Salesforce CPQ und Revenue Cloud: die echten Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/). Für die Planung reicht ein Punkt: Es gibt keinen Upgrade-Knopf, und jede Zeile dieser Tabelle ist ein Arbeitspaket.

## Wie strukturiert Salesforce die Migration?

Der Hilfeartikel [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) gibt den Rahmen vor. Die Arbeit läuft in Phasen, und Salesforce verlangt, alle Aufgaben einer Phase in der genannten Reihenfolge abzuschließen, bevor die nächste beginnt:

```schritte
Vorbereiten
  Prüfen, welche Funktionen von Revenue Cloud Sie brauchen, und die operative Planung klären. Die Hilfe nennt hier zwei praktische Voraussetzungen, die für jede Strategie gelten: das Beibehalten der CPQ-Lizenz und die Koexistenz während des Übergangs.
Strategie wählen
  Migrationsstrategie, Umgang mit Bewegungsdaten sowie Rollout und Cutover festlegen. Laut Hilfe gehören diese Entscheidungen an den Anfang, weil sie Umfang, Schnittstellen, Cutover und Change Management bestimmen.
Umsetzen
  Produktdaten, Asset-Daten und Billing-Daten migrieren, Berichte neu bauen und Change Management von Beginn an als parallelen Strang führen.
```

Einen festen Zeitrahmen setzt die Hilfe nicht. Die CPQ-Seite nennt 3 bis 6 Monate als typisch und ergänzt, dass komplexe Implementierungen länger dauern können. Meine Einschätzung: 3 Monate sind für eine aufgeräumte Org mit wenigen Preisregeln realistisch, eine über Jahre gewachsene Org mit vielen eigenen Skripten gehört an das obere Ende oder dahinter. Eine [Analyse der technischen Schulden](../ki-org-analyse-technische-schulden/) vor der Schätzung zeigt, welchen Fall Sie haben.

Der Lizenzpunkt betrifft das Budget. Während des Aufbaus erstellt CPQ weiter Angebote in Produktion, Sie zahlen also für die Dauer des Projekts CPQ und Revenue Cloud parallel. Ein Grund mehr, die Migration nicht über Jahre zu strecken.

## In welcher Reihenfolge wandern die Daten?

Die Hilfe nennt drei Gruppen: Produktdaten, Asset-Daten und Billing-Daten. Die Reihenfolge innerhalb dieser Gruppen folgt den Abhängigkeiten, die der Revenue Cloud Developer Guide in seiner [Object Deployment Reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) aufführt. Eltern vor Kindern, Metadaten vor Datensätzen:

1. **Katalogstruktur:** Attributdefinitionen und Picklisten, Produktklassifizierungen, dann die Produkte selbst.
2. **Verkauf und Preise:** Product Selling Models, Preisbücher, Kostenbücher, Preisbucheinträge, danach Preisanpassungen.
3. **Bundles und Kataloge:** Komponentengruppen und zugeordnete Komponenten, Kataloge und Kategorien.
4. **Assets:** ein Asset für jedes offene CPQ-Abo, damit Nachträge und Verlängerungen in Revenue Cloud funktionieren. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) beginnt jeder Nachtrag an einem Asset und läuft über ein Angebot und einen Auftrag.
5. **Billing-Daten:** nur, wenn Sie heute Salesforce Billing nutzen. Dazu gibt es einen eigenen Beitrag: [von Salesforce Billing zu Revenue Cloud Billing](../von-salesforce-billing-zu-revenue-cloud-billing/).

```hinweis tipp
Zwei Regeln von meiner Seite. Erstens: **Offene Abos vor ihrem nächsten Verlängerungstermin migrieren.** Ein Vertrag, der zwei Wochen nach dem Go-live noch in CPQ verlängert wird, erzeugt genau die doppelte Arbeit, die Sie vermeiden wollen.

Zweitens: **Abgeschlossene Angebote nicht migrieren.** Sie bleiben als lesbare Historie in CPQ oder gehen in ein Archiv. Niemand ändert ein Angebot aus 2021.
```

Wie Katalog und Preise danach von der Sandbox in die Produktion kommen, ist ein eigenes Thema: [Revenue Cloud Deployments](../revenue-cloud-konfiguration-deployment/).

## Was leisten Migrationswerkzeuge, und was nicht?

Auf der CPQ-Seite nennt Salesforce drei Partnerangebote: Forsys RevRamp für Datentransformation und Schema-Mapping, IdeaHelix mit Automatisierung über den gesamten Migrationsablauf und Prodly, das die bestehende CPQ-Einrichtung analysiert. Außerdem schreibt Salesforce, dass rund 15 Prozent der Kunden von Revenue Cloud Advanced Unternehmen sind, die von CPQ migriert haben.

Diese Werkzeuge sparen Zeit bei Produkten, Preisbucheinträgen und Abos. Die Hilfe benennt die Grenze klar: Werkzeuge ersetzen keine menschlichen Designentscheidungen, vor allem nicht bei eigener Logik und beim Umbau von Schnittstellen. Eine Preisregel, die ein altes Rundungsproblem behebt, ein Skript, das ein Feld aus SAP liest, eine Freigabekette mit Ausnahmen für ein Land: Jemand muss entscheiden, ob diese Logik noch gebraucht wird und wie sie in einer Pricing Procedure aussieht.

Beim Vergleich von Partnerangeboten würde ich jeden Partner nach denselben drei Zahlen fragen: wie viele Preisregeln, Produktregeln und Skripte er in Ihrer Org gezählt hat und was er mit jedem vorhat. Wer ohne Zählung anbietet, verkauft eine Spanne. Wie Sie solche Angebote vergleichen und welches Vertragsmodell passt, beschreiben [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/) und das Kapitel der KI-Masterclass zu [AIforce und Systemintegratoren](../../masterclass/ki-salesforce/aiforce-und-systemintegratoren/).

## Ein typisches Szenario, als Annahme

Ein Komponentenhersteller nutzt Salesforce CPQ seit 2018. Er hat 60 Nutzer, die Angebote erstellen, 1.200 Produkte, 40 Preisregeln, ein Quote Calculator Plugin mit über Jahre gewachsener Logik und 3.500 aktive Service-Abos für Fernüberwachung. Rechnungen kommen aus SAP. Alle Zahlen sind Annahmen.

Der Plan könnte so aussehen:

- **Wochen 1 bis 4, vorbereiten:** Regeln und Skripte zählen, entscheiden, welche Logik entfällt, SAP als Preisführer für Listenpreise und Revenue Cloud für Rabatte festlegen.
- **Wochen 5 bis 8, Strategie:** Umstellung je Produktlinie, zuerst Ersatzteile und Service, Maschinen zuletzt. Abos wandern in Paketen, immer vor ihrem Verlängerungsmonat.
- **Monate 3 bis 5, umsetzen:** Katalog und Preise in der Pipeline, Assets für das erste Abo-Paket, Berichte neu gebaut, Vertrieb je Produktlinie geschult.
- **Monat 6:** Die letzte Produktlinie zieht um, CPQ wird schreibgeschützt, die CPQ-Lizenz endet zum nächsten Verlängerungstermin.

Da Billing nicht im Einsatz ist, entfällt in diesem Szenario der Billing-Cutover. Mit Salesforce Billing käme ein Cutover zum Periodenende und die Freigabe durch die Finanzabteilung dazu.

Die Schulung je Produktlinie deckt nur einen Teil des Change Managements ab, das die Hilfe als parallelen Strang verlangt. 60 Nutzer, die seit Jahren in CPQ anbieten, müssen auch verstehen, warum sich ihr Werkzeug ändert. Warum Schulungen allein selten reichen, beschreibe ich in [Change Management: Warum Salesforce-Einführungen scheitern](../change-management-salesforce-einfuehrung/).

## Was muss der Kunde selbst entscheiden?

Diese Entscheidungen gehören Ihnen, nicht dem Partner und nicht dem Werkzeug:

- **Preisführung:** welche Preise aus SAP kommen und welche in Revenue Cloud berechnet werden. Zwei führende Systeme für denselben Preis funktionieren nie.
- **Cutover-Modell:** alles auf einmal, je Produktlinie oder je Land, und der Tag, ab dem CPQ schreibgeschützt ist.
- **Historie:** was migriert wird, was ins Archiv geht und was in CPQ lesbar bleibt.
- **Verantwortung nach dem Go-live:** wer Klassifizierungen, Constraint-Regeln und Pricing Procedures pflegt. Eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/) hilft, wenn mehrere Partner in derselben Org arbeiten.
- **Lizenzende:** wann der CPQ-Vertrag ausläuft. CPQ hat kein End-of-Life-Datum, dieser Termin liegt also ganz bei Ihnen.

Ob Sie überhaupt umsteigen oder vorerst bei CPQ bleiben, behandelt [CPQ behalten oder zu Revenue Cloud wechseln?](../cpq-behalten-oder-revenue-cloud/). Das ganze Thema finden Sie im Masterclass-Kapitel [Von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/), und mehrere Partner durch einen solchen Umstieg zu steuern, gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).

Eine CPQ-Migration gelingt, wenn Preisführung, Cutover und Historie entschieden sind, bevor der erste Partner baut. Wenn Sie diesen Umstieg planen, [schreiben Sie mir](#contact).
