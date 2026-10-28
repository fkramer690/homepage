---
title: "CPQ behalten oder zu Revenue Cloud wechseln?"
description: "Wann Hersteller vorerst bei Salesforce CPQ bleiben, zu Revenue Cloud wechseln oder einen dritten Weg gehen: Auslöser, Entscheidungsmatrix, erste Schritte."
pubDate: 2026-10-28
lang: de
slug: cpq-behalten-oder-revenue-cloud
translationKey: stay-on-cpq-or-migrate
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: make-or-buy
tags: [Salesforce CPQ, Revenue Cloud, Migration, Make-or-Buy, Entscheidung]
takeaways:
  - "Bei Salesforce CPQ zu bleiben ist erlaubt: Bestandskunden verlängern, kaufen Nutzer nach und erhalten Support, ein End-of-Life-Datum und eine erzwungene Migration gibt es nicht."
  - "Für den Wechsel sprechen Anforderungen, die nur Revenue Cloud abdeckt: neue Funktionen wie agentenbasierte Angebote, wiederkehrende oder nutzungsbasierte Abrechnung in Salesforce oder ein ohnehin neues Produktmodell."
  - "Für das Abwarten sprechen ein stabiler Angebotsprozess, Preise, die ohnehin aus dem ERP kommen, ein größeres Projekt wie eine ERP-Migration oder fehlendes Budget in diesem Jahr."
  - "Es gibt einen dritten Weg: ein Partnerprodukt oder ein eigener Ansatz auf der Plattform, vor allem wenn die Konfigurationsregeln im ERP oder in der Konstruktion liegen."
  - "Die Entscheidung beginnt mit einer Analyse Ihrer CPQ-Org: Regeln, Preislogik, Anpassungen und Schnittstellen zeigen, wie groß der Neuentwurf wäre."
faq:
  - q: "Soll ich bei Salesforce CPQ bleiben oder zu Revenue Cloud wechseln?"
    a: "Bleiben Sie vorerst, wenn Ihr Angebotsprozess stabil ist und Sie nichts Neues brauchen. Wechseln Sie, wenn Sie Funktionen brauchen, die nur Revenue Cloud bekommt, etwa agentenbasierte Angebote oder nutzungsbasierte Abrechnung, oder wenn Sie Produkte und Prozesse ohnehin neu gestalten."
  - q: "Wie lange dauert eine Migration von CPQ zu Revenue Cloud?"
    a: "Salesforce nennt drei bis sechs Monate als typisch, von der Analyse bis zum Go-live. Mit dem unteren Ende würde ich nur bei einer aufgeräumten Org mit wenigen Anpassungen planen."
  - q: "Wie viele Unternehmen sind von CPQ zu Revenue Cloud gewechselt?"
    a: "Laut Salesforce sind rund 15 Prozent der Kunden von Revenue Cloud Advanced von Salesforce CPQ umgestiegen. Die übrigen kamen nicht von CPQ."
  - q: "Was kostet Revenue Cloud im Vergleich zu CPQ?"
    a: "Revenue Cloud Advanced kostet laut Preisliste 200 Euro pro Nutzer und Monat bei Jahresvertrag, Revenue Cloud Growth 150 Euro (Oktober 2026). Ihr CPQ-Preis bei der Verlängerung hängt von Ihrem bestehenden Vertrag ab, lassen Sie sich deshalb beide Zahlen vom Account-Team geben."
draft: false
---

Bei Salesforce CPQ zu bleiben ist erlaubt und vorerst oft richtig. Bestandskunden verlängern, kaufen Nutzer nach und erhalten Support, und Salesforce hat weder ein End-of-Life-Datum noch eine erzwungene Migration angekündigt. Wechseln Sie zu Revenue Cloud, wenn Sie etwas brauchen, das nur Revenue Cloud bekommt, etwa agentenbasierte Angebote oder nutzungsbasierte Abrechnung, oder wenn Sie Ihr Produktmodell ohnehin neu aufbauen. Warten Sie, wenn der Prozess stabil ist, die Preise ohnehin aus dem ERP kommen oder ein größeres Projekt Vorrang hat. Und prüfen Sie einen dritten Weg, Partnerprodukt oder eigener Ansatz, wenn Ihre Konfigurationsregeln außerhalb von Salesforce liegen. Am Anfang steht eine ehrliche Analyse Ihrer CPQ-Org.

## Können Sie einfach bei CPQ bleiben?

Ja. Laut [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/) ist CPQ "end of sale, not end of life". Den genauen Status, auch für das Billing-Paket, beschreibe ich in [Salesforce CPQ Verkaufsende: Was gilt im Oktober 2026?](../salesforce-cpq-verkaufsende-status/).

Bleiben ist also eine legitime Entscheidung. Sie hat trotzdem einen Preis:

```pro-contra
pro: Was Sie behalten
- Bestandskunden nutzen CPQ im Rahmen ihrer laufenden Verträge weiter, verlängern und kaufen Nutzer nach
- Support und kritische Fehlerbehebungen
- Kein End-of-Life-Datum und laut Salesforce "no forced migration"
contra: Was Sie dafür aufgeben
- Keine neuen Funktionen: Jedes Release erweitert Revenue Cloud und nichts an CPQ
- Partner bauen eher Revenue-Cloud-Teams auf als CPQ-Teams, das erwarte ich
- Das Wissen für eine stark angepasste CPQ-Org wird also nicht günstiger
```

Ich würde bewusst entscheiden und festhalten, wann Sie die Frage wieder aufnehmen, statt es laufen zu lassen.

## Wann sollten Sie zu Revenue Cloud wechseln?

Diese Auslöser sprechen für einen Wechsel in den nächsten ein bis zwei Jahren:

- **Sie brauchen, was nur Revenue Cloud bekommt.** Salesforce hat im Juli 2025 Agentforce-Funktionen für Angebote als Teil von [Revenue Cloud](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) angekündigt, mit denen Vertriebler Angebote aus einer Anfrage in normaler Sprache erstellen. CPQ bekommt solche Funktionen nicht.
- **Wiederkehrende oder nutzungsbasierte Umsätze.** Wenn Wartungsverträge, Fernüberwachungs-Abos oder Pay-per-Use in Salesforce verkauft, geändert und abgerechnet werden sollen, bringt Revenue Cloud Assets mit Zeiträumen, nutzungsbasierte Bewertung und Revenue Cloud Billing mit.
- **Das Produktmodell ändert sich ohnehin.** Eine neue Produktgeneration, eine neue Variantenstruktur oder ein Katalog-Aufräumen ist ein Neuentwurf. Ihn zweimal zu machen, erst in CPQ und später noch einmal in Revenue Cloud, verschwendet Arbeit.
- **Org-Neustart oder Partnerwechsel.** Wenn die Org neu aufgebaut wird oder ein neuer Partner übernimmt, passt der Wechsel in ein Projekt, das ohnehin läuft. Eine [KI-gestützte Org-Analyse](../ki-org-analyse-technische-schulden/) hilft zu sehen, was wirklich in der alten Org steckt.
- **CPQ-Anpassungen sind fragil.** Wenn jeder Release-Test etwas im Quote Calculator Plugin bricht und nur eine Person es versteht, nimmt ein Neuentwurf ein Risiko weg.

## Wann ist Abwarten die bessere Wahl?

Abwarten ist sinnvoll, wenn

- **der Angebotsprozess stabil ist** und niemand neue Funktionen fordert,
- **die Preise ohnehin aus dem ERP kommen.** Wenn CPQ vor allem einen Nettopreis aus SAP holt und ein Angebot druckt, bringt Revenue Cloud für diesen Schritt wenig,
- **ein größeres Projekt Vorrang hat.** Eine S/4HANA-Migration oder ein Manufacturing-Cloud-Rollout bindet dieselben Leute. Zwei Neuentwürfe parallel gehen selten gut,
- **in diesem Jahr kein Budget für einen Neuentwurf da ist.** Eine halb finanzierte Migration ist schlechter als eine gut betriebene CPQ-Org.

Abwarten heißt nicht, nichts zu tun. Löschen Sie ungenutzte Regeln, dokumentieren Sie die Preislogik und sichern Sie sich bei der Verlängerung den späteren Parallelbetrieb. Das macht einen späteren Wechsel günstiger.

## Gibt es einen dritten Weg?

Ja, und ich würde ihn immer prüfen, bevor etwas unterschrieben wird. Für Angebote gibt es heute drei Wege: Revenue Cloud, ein Partnerprodukt oder einen eigenen Ansatz auf der Plattform. Wie ein eigener Ansatz mit eigenem Produktkonfigurator Angebote und Sales Agreements versorgt, beschreibe ich in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/).

Ein dritter Weg passt, wenn Ihre Konfigurationsregeln in der SAP-Variantenkonfiguration, in einem PLM-System oder bei Anwendungstechnikern liegen und Salesforce nur das Ergebnis anzeigen würde. Dann verdoppelt ein vollständiges Constraint-Modell in Revenue Cloud Regeln, die jemand synchron halten muss. Die Make-or-Buy-Fragen sind dieselben wie bei jedem Produkt: Wie gut passt der Standard, wer pflegt die Regeln, und was kosten Lizenz und Wartung über mehrere Jahre? Wie ich das rechne, steht unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Die Zahlen von Salesforce geben etwas Einordnung. Laut der CPQ-Seite sind rund 15 Prozent der Kunden von Revenue Cloud Advanced von CPQ umgestiegen. Rund 85 Prozent kamen also nicht von CPQ. Die Zahl zeigt, dass Migrationen stattfinden. Dass CPQ-Kunden die Zeit davonläuft, zeigt sie nicht.

## Die Entscheidungsmatrix

| Situation | Vorerst bei CPQ bleiben | Zu Revenue Cloud wechseln | Dritter Weg |
|---|---|---|---|
| Stabiler Prozess, keine neuen Anforderungen | Ja | Später | Nein |
| Agentenbasierte Angebote gewünscht | Nein | Ja | Partnerprodukte prüfen |
| Wiederkehrende oder nutzungsbasierte Abrechnung in Salesforce | Nein | Ja | Selten |
| Produktmodell wird ohnehin neu gebaut | Nein | Ja | Wenn Regeln im ERP liegen |
| Preise werden in SAP berechnet | Ja | Nur mit klarem Nutzen | Ja |
| Konfigurationsregeln in SAP oder PLM | Ja | Aufwand genau prüfen | Ja |
| ERP-Migration läuft | Ja | Nach dem ERP | Nach dem ERP |
| Fragile CPQ-Anpassungen | Kurzfristig | Ja | Ja |

Die Matrix ist ein Ausgangspunkt. Wenn zwei Spalten passen, entscheiden meist das Budget und die Frage, wer Regeln und Preise modellieren kann.

## Was kostet ein Wechsel?

Die Lizenzen sind der einfachere Teil. Die [Preisseite von Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) nennt diese Listenpreise bei Jahresvertrag:

```kennzahlen
150 € | Revenue Cloud Growth pro Nutzer und Monat
200 € | Revenue Cloud Advanced pro Nutzer und Monat
quelle: Salesforce Revenue Cloud Preisseite, Stand Oktober 2026
```

Als Annahme kosten 50 Nutzer im Angebotsprozess auf Advanced 120.000 Euro pro Jahr zum Listenpreis. Billing, Dynamic Revenue Orchestrator und weitere Add-ons kommen dazu. Ihr aktueller CPQ-Preis hängt von Ihrem Vertrag ab, lassen Sie sich deshalb beide Zahlen vom Account-Team geben.

Der größere Kostenblock ist der Neuentwurf. Salesforce nennt drei bis sechs Monate als typische Migrationsdauer, und der [Migrationsleitfaden](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) stellt klar, dass Werkzeuge keine Designentscheidungen für eigene Logik und Schnittstellen ersetzen. Warum das so ist, erkläre ich in [Salesforce CPQ vs. Revenue Cloud: Die echten Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/).

Ein typisches Szenario, als Annahme: Ein Maschinenbauer hat 50 CPQ-Nutzer, 200 Produktregeln, ein Quote Calculator Plugin und eine CPQ-Verlängerung in neun Monaten. Die Preise kommen aus SAP, die Konfigurationsregeln teilweise aus der Konstruktion. Hier würde ich CPQ für zwei Jahre mit Option auf Parallelbetrieb verlängern, die Regeln jetzt aufräumen und einen Proof of Concept für die zehn wichtigsten Maschinen in Revenue Cloud bauen, bevor eine Migration beauftragt wird.

## Wo starten Sie?

Analysieren Sie zuerst Ihre CPQ-Org: Zahl der Produkt- und Preisregeln, Umfang des Quote Calculator Plugins, Schnittstellen auf SBQQ-Objekte, offene Subscriptions und das Verlängerungsdatum. Legen Sie dann die Auslöser oben neben Ihre Roadmap für die nächsten zwei Jahre. Das Masterclass-Kapitel [von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/) führt durch den ganzen Weg vom Status bis zur Migration.

Bleiben, wechseln oder ein dritter Weg: Jede Variante ist für manche Unternehmen richtig, solange Sie sie bewusst wählen. Wenn Sie eine unabhängige Bewertung Ihrer CPQ-Org möchten, [schreiben Sie mir](#contact).
