---
title: "Object Ownership Matrix: Wer ändert welches Objekt?"
description: "Mehrere Partner auf einer Salesforce-Org? Eine Object Ownership Matrix legt fest, wer welches Objekt verantwortet. Aufbau, Regeln, Erfahrung aus 8 Streams."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: de
slug: object-ownership-matrix-salesforce
translationKey: object-ownership-matrix
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Partnersteuerung, Object Ownership Matrix, Governance, Pull Request Review, Automatisierung]
takeaways:
  - "Ändert ein Team das Objekt eines anderen Streams, stimmt es sich vorher mit dem Verantwortlichen ab, damit sich Felder, Flows und Trigger nicht überschreiben."
  - "Gemeinsam genutzte Objekte wie Account brauchen einen Verantwortlichen und einen Einstiegspunkt für Automatisierung: Flow oder ein Apex-Trigger, nicht beides."
  - "In meinem Programm mit über 30 Entwicklern in acht Streams waren die Matrix und die Standards nach etwa drei Monaten stabil."
  - "Durchgesetzt wird die Matrix im Pull-Request-Review und in regelmäßigen Center-of-Excellence-Calls, nicht durch ein Dokument im Wiki."
faq:
  - q: "Was ist eine Object Ownership Matrix in Salesforce?"
    a: "Eine einfache Tabelle, die festlegt, welcher Stream oder welches Team für jedes Salesforce-Objekt und seine Metadaten verantwortlich ist. Andere Teams stimmen sich mit dem Verantwortlichen ab, bevor sie das Objekt ändern."
  - q: "Wer sollte die Object Ownership Matrix verantworten?"
    a: "Der Kunde, zum Beispiel über einen Architekten oder ein Center of Excellence. Legt ein Partner die Matrix fest, entscheidet er auch darüber, was seine Wettbewerber bauen dürfen."
  - q: "Was passiert mit Objekten, die alle Teams brauchen?"
    a: "Auch Account oder Contact erhalten bei mir genau einen Verantwortlichen. Die anderen Teams melden ihre Anforderungen an, und der Verantwortliche baut sie in die vereinbarte Automatisierung des Objekts ein, nachdem er die betroffenen Streams angehört hat."
  - q: "Wie lange dauert es, eine Object Ownership Matrix einzuführen?"
    a: "Die erste Version steht in wenigen Wochen. In meinem größten Programm hat es etwa drei Monate gedauert, bis die Matrix und die Standards stabil waren und neue Randfälle selten wurden."
draft: false
---

Eine Object Ownership Matrix legt in einer Salesforce-Org fest, welcher Stream für welches Objekt und seine Metadaten verantwortlich ist. Will ein anderes Team das Objekt ändern, stimmt es sich vorher mit dem Verantwortlichen ab. Das klingt banal, und genau deshalb fehlt die Matrix in vielen Programmen mit mehreren Umsetzungspartnern. In meinem größten Programm, mit mehr als 30 Entwicklern in acht Streams und fünf Partnern, war sie einer der beiden Bausteine, die am meisten bewirkt haben.

## Was ist eine Object Ownership Matrix?

Eine Object Ownership Matrix ist eine Tabelle mit einer Zeile pro Objekt. Erfasst werden meist die Objekte, die mehrere Teams anfassen. Für jedes Objekt steht dort, welcher Stream es verantwortet. Ein Stream ist ein Team mit einem fachlichen Schwerpunkt, zum Beispiel Vertrieb, Service oder Field Service, egal ob es von einem Partner oder intern besetzt ist.

Verantwortung heißt dabei mehr als „hat das Objekt angelegt“. Der verantwortliche Stream entscheidet über:

- **Felder und Validierungsregeln** des Objekts.
- **Automatisierung**, also Record-Triggered Flows und Apex-Trigger, die beim Speichern eines Datensatzes laufen.
- **Seitenlayouts und Lightning Pages**, soweit sie das Objekt betreffen.
- **Datenmodell-Änderungen**, etwa neue Beziehungen zu anderen Objekten.

Andere Streams dürfen das Objekt nutzen, lesen und in ihren Prozessen verwenden. Wollen sie es ändern, stimmen sie das mit dem Verantwortlichen ab. Umgekehrt bezieht der Verantwortliche die nutzenden Streams ein, bevor er etwas ändert, das sie betrifft, etwa neue Pflichtfelder, Validierungsregeln oder Schnittstellenfelder. Berührt eine Änderung ein zweites Objekt, stimmt auch dessen Verantwortlicher zu.

## Warum braucht ein Programm mit mehreren Partnern das?

In einer kleinen Org kennt ein Admin jede Änderung. In einem Programm mit mehreren Partnern arbeiten Teams gleichzeitig an denselben Objekten, oft ohne die Änderungen der anderen zu kennen. Der Account ist das klassische Beispiel: Der Vertrieb braucht ihn für Opportunities, der Service für Fälle, Field Service für Einsätze und das ERP-Team für die Schnittstelle.

Ohne klare Verantwortung baut jedes Team seine eigene Automatisierung auf dem Account. Das wird technisch schnell gefährlich. Laut dem [Salesforce Architect Decision Guide zu Record-Triggered Automation](https://architect.salesforce.com/docs/architect/decision-guides/guide/record-triggered) garantiert die Plattform die Reihenfolge mehrerer Apex-Trigger auf demselben Objekt und Ereignis nicht. Der Guide empfiehlt einen Trigger pro Objekt und rät davon ab, Flow und Apex als Einstiegspunkte auf demselben Objekt zu mischen. Mehrere Record-Triggered Flows sind in Ordnung, wenn ihre Reihenfolge im Flow Trigger Explorer festgelegt ist.

Wenn fünf Teams auf einem Objekt fünf verschiedene Ansätze verwenden, wird keine dieser Empfehlungen eingehalten. Die Folgen kennt jeder, der in solchen Programmen gearbeitet hat: Ein Feld wird von zwei Automatisierungen gesetzt, ein Deployment überschreibt das Layout eines anderen Teams, und ein Fehler in Produktion lässt sich keinem Team zuordnen.

## So lief es in meinem Programm mit acht Streams

Als ich in das Programm einstieg, hatte niemand klar festgelegt, welches Team für welche Prozesse, Objekte und Metadaten die Federführung hatte. Änderungen überschrieben sich, und die technischen Ansätze der Teams lagen weit auseinander.

Der erste Schritt war, jede Änderung über einen Pull Request mit Review zu leiten. Eine Zeit lang ging jeder einzelne über meinen Schreibtisch. Aus diesen Reviews haben wir Standards abgeleitet und dokumentiert, darunter Namenskonventionen, einen Einstiegspunkt für Automatisierung pro Objekt mit festgelegter Ausführungsreihenfolge und Vorgaben zur Testabdeckung. Am meisten bewirkt haben zwei Bausteine: die Object Ownership Matrix und Regeln für Konfigurationswerte, etwa welche Werte in Custom Metadata Types oder Custom Labels gehören, statt fest im Code hinterlegt zu sein.

```tabelle matrix
titel: Object Ownership Matrix, vereinfachtes Beispiel
spalten: Objekt | Stream Vertrieb | Stream Service | Stream Field Service
Account | Verantwortlich * | stimmt sich ab | stimmt sich ab
Opportunity | Verantwortlich * | stimmt sich ab | stimmt sich ab
Quote | Verantwortlich * | stimmt sich ab | stimmt sich ab
Case | stimmt sich ab | Verantwortlich * | stimmt sich ab
Asset | stimmt sich ab | Verantwortlich * | stimmt sich ab
Work Order | stimmt sich ab | stimmt sich ab | Verantwortlich *
fazit: Bevor ein Team ein fremdes Objekt ändert, stimmt es sich mit dem Verantwortlichen ab.
```
Die Regel war einfach: Bevor ein Team ein fremdes Objekt änderte, musste es sich mit dem verantwortlichen Stream abstimmen. Im vereinfachten Beispiel oben verantwortet der Vertrieb Account, Opportunity und Quote, der Service Case und Asset, Field Service die Work Order.

```praxis
Bis die Standards stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte rund 80 Prozent der Fälle ab. Danach folgten Randfälle, die wir in regelmäßigen Center-of-Excellence-Calls besprochen haben. Irgendwann fielen sie fast ganz weg, weil anstehende Änderungen frühzeitig besprochen wurden, bevor sie zu Konflikten wurden.
```

## Was gehört in die Matrix?

Die Matrix sollte so klein bleiben, dass jeder sie in zwei Minuten lesen kann. Ich empfehle diese Spalten:

1. **Objekt**, mit API-Namen, damit es keine Verwechslung gibt.
2. **Verantwortlicher Stream** und eine benannte Person als Ansprechpartner.
3. **Einstiegspunkt der Automatisierung**, also ob das Objekt über Flow oder über ein Apex-Trigger-Framework automatisiert wird.
4. **Mitnutzende Streams**, damit der Verantwortliche weiß, wen eine Änderung betrifft.

Schwierig sind die gemeinsam genutzten Objekte wie Account, Contact oder Product. Auch sie erhalten bei mir genau einen Verantwortlichen. Die anderen Streams melden ihre Anforderungen beim Verantwortlichen an, und er baut sie in die vereinbarte Automatisierung ein, etwa in mehrere geordnete Flows oder in einen Trigger mit Handler-Framework. Das ist langsamer, als wenn jeder selbst baut. Nach meiner Erfahrung ist das Objekt aber nur so in zwei Jahren noch wartbar. Kommt ein B2B-Shop hinzu, braucht der Auftrag dieselbe Klarheit zwischen Salesforce und ERP, siehe [Kapitel 4 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/).

Was nicht in die Matrix gehört: Detailregeln für Namenskonventionen, Tests oder Code-Stil. Die stehen in den Entwicklungsstandards. Die Matrix beantwortet vor allem die Frage, wer entscheidet.

## Durchgesetzt wird die Matrix im Review, nicht im Wiki

Eine Tabelle im Wiki ändert allein nichts. Die Matrix wirkt erst, wenn sie im täglichen Ablauf geprüft wird.

- **Im Pull-Request-Review.** Berührt eine Änderung ein fremdes Objekt, fragt der Reviewer, ob der Verantwortliche zugestimmt hat. Wie solche Reviews ablaufen, beschreibe ich in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).
- **Technisch im Repository.** Liegen die Metadaten in Git und gelangen Änderungen an diesen Objekten nur über die Pipeline in die Org, lässt sich die Matrix teilweise technisch abbilden, bei GitHub etwa mit einer CODEOWNERS-Datei. Direkte Änderungen in der Org umgehen das, deshalb brauchen Notfallkorrekturen einen eigenen Weg zurück ins Repository.
- **Im Center of Excellence.** Regelmäßige Calls, in denen Streams anstehende Änderungen an gemeinsamen Objekten vorstellen, mit genug Vorlauf für alle anderen. Wie ein solches Gremium aufgebaut ist, beschreibe ich in [Salesforce Center of Excellence: Format und Rhythmus](../salesforce-center-of-excellence-format/).

```vertiefung Für Entwickler
titel: Wie bildet CODEOWNERS die Matrix ab?
Eine [CODEOWNERS-Datei](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) ordnet Pfade einem Team zu, zum Beispiel den Ordner eines Objekts. Layouts, Lightning-Seiten, Flows und Trigger liegen in anderen Ordnern und brauchen deshalb eigene Muster und eine Namenskonvention. Ändert ein Pull Request diese Dateien, wird das Team automatisch als Reviewer angefragt. Seine Freigabe wird erst mit "Require review from Code Owners" in der Branch Protection verpflichtend. Das Team braucht Schreibrechte, und die CODEOWNERS-Datei selbst braucht einen Verantwortlichen.
```

Die Matrix gehört dem Kunden, nicht einem Partner. Legt ein Partner fest, wer welches Objekt verantwortet, entscheidet er auch darüber, was seine Wettbewerber bauen dürfen. Dasselbe gilt für das Repository und die Pipeline, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.

## Die 15 bis 20 wichtigsten Objekte auflisten

Eine erste Matrix steht schneller, als die meisten erwarten:

1. **Die 15 bis 20 wichtigsten Objekte auflisten**, Standard und Custom, die mehr als ein Team berühren.
2. **Für jedes Objekt einen Stream festlegen**, auch wenn die Entscheidung für Account oder Contact unbequem ist.
3. **Den Einstiegspunkt der Automatisierung pro Objekt festhalten** und neue Automatisierung nur noch über ihn zulassen.
4. **Im Review danach fragen**, ab dem ersten Tag.
5. **Randfälle im Center of Excellence klären** und die Matrix aktualisieren.

Nach meiner Erfahrung ist die erste Version nie vollständig, und das muss sie auch nicht sein. Mit 80 Prozent fängt man an, und den Rest liefern die Reviews. Mehr dazu, wie ich Programme mit mehreren Partnern steuere, steht unter [Partnersteuerung](../../leistungen/partnersteuerung/).
