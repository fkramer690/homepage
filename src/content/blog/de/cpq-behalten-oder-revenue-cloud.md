---
title: "CPQ behalten oder zu Revenue Cloud wechseln?"
description: "Wann Hersteller vorerst bei Salesforce CPQ bleiben, zu Revenue Cloud wechseln oder einen dritten Weg gehen: Auslöser, Entscheidungsmatrix, erste Schritte."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: cpq-behalten-oder-revenue-cloud
translationKey: stay-on-cpq-or-migrate
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: make-or-buy
tags: [Salesforce CPQ, Revenue Cloud, Migration, Make-or-Buy, Entscheidung]
takeaways:
  - "Für den Wechsel sprechen agentenbasierte Angebote, neuere Verbrauchsmodelle mit Wallets und Mindestabnahmen oder ein ohnehin neues Produktmodell."
  - "Für das Abwarten sprechen ein stabiler Angebotsprozess, Preise aus dem ERP, eine laufende ERP-Migration oder fehlendes Budget in diesem Jahr."
  - "Ein Partnerprodukt oder ein eigener Ansatz passt, wenn die Konfigurationsregeln im ERP oder in der Konstruktion liegen."
  - "Die Entscheidung beginnt mit einer Analyse Ihrer CPQ-Org: Regeln, Preislogik, Anpassungen und Schnittstellen zeigen, wie groß der Neuentwurf wäre."
faq:
  - q: "Soll ich bei Salesforce CPQ bleiben oder zu Revenue Cloud wechseln?"
    a: "Bleiben Sie vorerst, wenn Ihr Angebotsprozess stabil ist und Sie keine neuen Funktionen brauchen. Wechseln Sie, wenn Sie Funktionen brauchen, die nur Revenue Cloud erhält, etwa agentenbasierte Angebote oder Verbrauchsmanagement mit Wallets, oder wenn Sie Produkte und Prozesse ohnehin neu gestalten. Einfache Nutzungsabrechnung geht auch mit CPQ und Salesforce Billing."
  - q: "Wie lange dauert eine Migration von CPQ zu Revenue Cloud?"
    a: "Die CPQ-Seite von Salesforce nennt drei bis sechs Monate von der Analyse bis zum Go-live als typische Dauer. Der Migrationsleitfaden legt dagegen keinen festen Zeitrahmen fest. Bei Herstellern mit ERP-Preisen, komplexen Katalogen oder Daten zur installierten Basis würde ich vor einer Analyse nicht mit dieser Spanne planen."
  - q: "Wie viele Unternehmen sind von CPQ zu Revenue Cloud gewechselt?"
    a: "Laut Salesforce sind rund 15 Prozent der Kunden von Revenue Cloud Advanced von Salesforce CPQ umgestiegen. Das ist ein Anteil der Advanced-Kunden, nicht der Anteil der CPQ-Kunden, die gewechselt sind."
  - q: "Was kostet Revenue Cloud im Vergleich zu CPQ?"
    a: "Revenue Cloud Advanced ist laut Salesforce der Nachfolger von CPQ und kostet laut Preisliste 200 Euro pro Nutzer und Monat bei Jahresvertrag als Add-on zu Sales Cloud (Growth: 150 Euro, ohne Verträge und Orchestrierung; Stand 9. November 2026). Ihr CPQ-Preis bei der Verlängerung hängt von Ihrem bestehenden Vertrag ab, lassen Sie sich deshalb beide Zahlen vom Account-Team geben."
draft: false
---

Bei Salesforce CPQ zu bleiben ist erlaubt und vorerst oft richtig. Bestandskunden können ihre Verträge verlängern, Nutzer nachkaufen und erhalten Support. Salesforce hat weder ein End-of-Life-Datum noch eine erzwungene Migration angekündigt. Wechseln Sie zu Revenue Cloud (heute Agentforce Revenue Management), wenn Sie Funktionen brauchen, die nur Revenue Cloud erhält, etwa agentenbasierte Angebote oder neuere Verbrauchsmodelle, oder wenn Sie Ihr Produktmodell ohnehin neu aufbauen. Warten Sie, wenn der Prozess stabil ist oder ein größeres Projekt Vorrang hat. Und prüfen Sie einen dritten Weg: ein Partnerprodukt oder einen eigenen Ansatz, wenn Ihre Konfigurationsregeln außerhalb von Salesforce liegen. Am Anfang steht eine ehrliche Analyse Ihrer CPQ-Org.

## Können Sie einfach bei CPQ bleiben?

Ja. Laut [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/) ist CPQ "end of sale, not end of life". Den genauen Status, auch für das Billing-Paket, beschreibe ich in [Salesforce CPQ Verkaufsende: Was gilt im Oktober 2026?](../salesforce-cpq-verkaufsende-status/).

Bleiben ist also eine legitime Entscheidung. Sie hat trotzdem einen Preis:

```pro-contra
pro: Was Sie behalten
- Bestandskunden nutzen CPQ im Rahmen ihrer laufenden Verträge weiter, verlängern ihre Verträge und kaufen Nutzer nach
- Support und kritische Fehlerbehebungen
- Kein End-of-Life-Datum und laut Salesforce "no forced migration"
contra: Was Sie dafür aufgeben
- Keine neuen Funktionen: Salesforce entwickelt neue Revenue-Funktionen für Revenue Cloud, CPQ erhält keine davon
- Ich erwarte, dass Partner eher Revenue-Cloud-Teams aufbauen als CPQ-Teams
- Das Wissen für eine stark angepasste CPQ-Org wird also nicht günstiger
```

Ich würde bewusst entscheiden und festhalten, wann Sie die Frage wieder aufnehmen, statt die Entscheidung auf unbestimmte Zeit zu vertagen.

## Wann sollten Sie zu Revenue Cloud wechseln?

Diese Auslöser sprechen für einen Wechsel in den nächsten ein bis zwei Jahren:

- **Sie brauchen Funktionen, die nur Revenue Cloud erhält.** Salesforce hat im Juli 2025 Agentforce-Funktionen für Angebote als Teil von [Revenue Cloud](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) angekündigt, mit denen Vertriebsmitarbeitende Angebote aus einer Anfrage in natürlicher Sprache erstellen. CPQ bekommt solche Funktionen nicht.
- **Neue Verbrauchsmodelle.** Abos, Verlängerungen und einfache Nutzungsabrechnung gehen auch mit CPQ und dem Paket Salesforce Billing. Sollen Fernüberwachungs-Abos oder Pay-per-Use mit Mindestabnahmen, Kontingenten und Wallets abgebildet werden, bringt Revenue Cloud Verbrauchs- und Wallet-Management; nutzungsbasierte Rechnungen brauchen die separate Revenue-Cloud-Billing-Lizenz.
- **Das Produktmodell ändert sich ohnehin.** Eine neue Produktgeneration, eine neue Variantenstruktur oder eine Katalogbereinigung ist ein Neuentwurf. Ihn zweimal zu machen, erst in CPQ und später noch einmal in Revenue Cloud, verschwendet Arbeit.
- **Org-Neustart oder Partnerwechsel.** Wenn die Org neu aufgebaut wird oder ein neuer Partner übernimmt, passt der Wechsel in ein Projekt, das ohnehin läuft. Eine [KI-gestützte Org-Analyse](../ki-org-analyse-technische-schulden/) hilft zu sehen, was wirklich in der alten Org steckt.
- **CPQ-Anpassungen sind fragil.** Wenn bei jedem Release-Test etwas im Quote Calculator Plugin bricht und nur eine Person die Logik versteht, verringert ein Neuentwurf dieses Risiko.

## Abwarten passt bei stabilem Prozess und Preisen aus dem ERP

Abwarten ist sinnvoll, wenn

- **der Angebotsprozess stabil ist** und niemand neue Funktionen fordert,
- **die Preise ohnehin aus dem ERP kommen.** Wenn CPQ vor allem einen Nettopreis aus SAP holt und ein Angebot druckt, bringt Revenue Cloud für diesen Schritt wenig,
- **ein größeres Projekt Vorrang hat.** Eine S/4HANA-Migration oder ein Manufacturing-Cloud-Rollout bindet dieselben Leute. Zwei Neuentwürfe parallel umzusetzen geht selten gut,
- **in diesem Jahr kein Budget für einen Neuentwurf da ist.** Eine halb finanzierte Migration ist schlechter als eine gut betriebene CPQ-Org.

Abwarten heißt nicht, nichts zu tun. Löschen Sie ungenutzte Regeln, dokumentieren Sie die Preislogik und sichern Sie sich bei der Verlängerung den späteren Parallelbetrieb. Das macht einen späteren Wechsel günstiger.

## Der dritte Weg: Partnerprodukt oder eigener Ansatz

Ja, und ich würde ihn immer prüfen, bevor etwas unterschrieben wird. Neben Revenue Cloud gibt es Partnerprodukte, eigene Ansätze auf der Plattform, Angebotserstellung im ERP oder Konfiguration in der Konstruktion mit Salesforce als Oberfläche sowie gemischte Lösungen für eine Übergangszeit. Entscheiden Sie getrennt, welches System für Vertrieb, Konfiguration, Preisfindung und Abrechnung führend ist. Bei Herstellern müssen diese Aufgaben nicht im selben Produkt liegen. Wie ein eigener Ansatz mit eigenem Produktkonfigurator Angebote und Sales Agreements versorgt, beschreibe ich in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/).

Ein dritter Weg passt, wenn Ihre Konfigurationsregeln in der SAP-Variantenkonfiguration, in einem PLM-System oder bei Anwendungstechnikern liegen und Salesforce nur das Ergebnis anzeigen würde. Dann bildet ein vollständiges Constraint-Modell in Revenue Cloud dieselben Regeln ein zweites Mal ab, und jemand muss beide synchron halten. Die Make-or-Buy-Fragen sind dieselben wie bei jedem Produkt: Wie gut passt der Standard, wer pflegt die Regeln, und was kosten Lizenz und Wartung über mehrere Jahre? Wie ich das rechne, steht unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Die Zahlen von Salesforce geben eine erste Einordnung. Laut der CPQ-Seite sind rund 15 Prozent der Kunden von Revenue Cloud Advanced von CPQ umgestiegen. Das ist ein Anteil der Advanced-Kunden, nicht der Anteil der CPQ-Bestandskunden, die gewechselt sind. Die Zahl zeigt, dass Migrationen stattfinden. Dass CPQ-Kunden die Zeit davonläuft, zeigt sie nicht.

## Die Entscheidungsmatrix

| Situation | Vorerst bei CPQ bleiben | Zu Revenue Cloud wechseln | Dritter Weg |
|---|---|---|---|
| Stabiler Prozess, keine neuen Anforderungen | Ja | Später | Nein |
| Agentenbasierte Angebote gewünscht | Nein | Ja | Partnerprodukte prüfen |
| Einfache Abo- oder Nutzungsabrechnung in Salesforce | Mit Salesforce Billing | Möglich | Selten |
| Verbrauch mit Mindestabnahmen oder Wallets | Meist nicht | Ja, mit Billing-Lizenz | Selten |
| Produktmodell wird ohnehin neu gebaut | Nur als Übergang | Meist | Wenn Regeln im ERP liegen |
| Preise werden in SAP berechnet | Ja | Nur mit klarem Nutzen | Möglich |
| Konfigurationsregeln in SAP oder PLM | Ja | Aufwand genau prüfen | Ja |
| ERP-Migration läuft | Ja | Gemeinsam entwerfen, danach bauen | Gemeinsam entwerfen, danach bauen |
| Fragile CPQ-Anpassungen | Kurzfristig | Ja | Ja |

Die Matrix ist ein Ausgangspunkt. Wenn zwei Spalten passen, entscheiden meist das Budget und die Frage, wer Regeln und Preise modellieren kann.

## Was kostet ein Wechsel?

Die Lizenzkosten sind der einfachere Teil, hängen aber nicht allein von der Nutzerzahl ab. Die [Preisseite von Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) nennt diese Listenpreise bei Jahresvertrag:

```kennzahlen
150 € | Revenue Cloud Growth pro Nutzer und Monat
200 € | Revenue Cloud Advanced pro Nutzer und Monat
quelle: Salesforce Revenue Cloud Preisseite, Stand 9. November 2026, Add-on zu Sales Cloud
```

Salesforce nennt Advanced als Nachfolger von CPQ; Growth fehlen Verträge, Dynamic Revenue Orchestrator und Agentforce for Revenue Management, für viele CPQ-Orgs ist es also kein gleichwertiger Ersatz. Als Annahme kosten 50 Nutzer im Angebotsprozess auf Advanced zusätzlich 120.000 Euro pro Jahr zum Listenpreis, zu Sales Cloud dazu. Die Revenue-Cloud-Billing-Lizenz und verbrauchsabhängige Credits für einige Funktionen kommen hinzu. Ihr aktueller CPQ-Preis hängt von Ihrem Vertrag ab, lassen Sie sich deshalb beide Zahlen vom Account-Team geben.

Der größere Kostenblock ist der Neuentwurf. Die CPQ-Seite von Salesforce nennt drei bis sechs Monate als typische Migrationsdauer, der [Migrationsleitfaden](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) legt aber keinen festen Zeitrahmen fest und stellt klar, dass Werkzeuge keine Designentscheidungen für eigene Logik und Schnittstellen ersetzen. Warum das so ist, erkläre ich in [Salesforce CPQ vs. Revenue Cloud: Die echten Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/).

Ein Rechenbeispiel: Ein Maschinenbauer hat 50 CPQ-Nutzer, 200 Produktregeln, ein Quote Calculator Plugin und muss CPQ in neun Monaten verlängern. Die Preise kommen aus SAP, die Konfigurationsregeln teilweise aus der Konstruktion. Hier würde ich mir von Salesforce zuerst eine Verlängerung und einen lizenzierten Parallelbetrieb anbieten lassen, mit ausreichend Zeit für Analyse, Umsetzung und Umstellung. Außerdem würde ich die Regeln jetzt aufräumen und einen Proof of Concept für die zehn wichtigsten Maschinen in Revenue Cloud bauen, bevor eine Migration beauftragt wird.

## Die CPQ-Org analysieren

Analysieren Sie zuerst Ihre CPQ-Org: Zahl der Produkt- und Preisregeln, Umfang des Quote Calculator Plugins, Schnittstellen zu SBQQ-Objekten, offene Subscriptions, Assets und Verträge, Abrechnungsdaten bei Salesforce Billing, Freigaben, Angebotsdokumente, Berichte, die Menge historischer Daten und das Verlängerungsdatum. Legen Sie dann die Auslöser oben neben Ihre Roadmap für die nächsten zwei Jahre. Das Masterclass-Kapitel [von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/) führt durch den ganzen Weg vom Status bis zur Migration.
