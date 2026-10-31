---
title: "Salesforce Center of Excellence: Format und Rhythmus"
description: "Wie ein Salesforce Center of Excellence beim Kunden arbeitet: zwei Termine, klare Rollen, Entscheidungen mit Vorlauf. Erfahrung aus 8 Streams."
pubDate: 2026-10-29
lang: de
slug: salesforce-center-of-excellence-format
translationKey: salesforce-center-of-excellence
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Center of Excellence, CoE, Partnersteuerung, Governance, Object Ownership Matrix]
takeaways:
  - "Für den Anfang reichen ein technischer Call alle zwei Wochen für Änderungen und Randfälle und ein monatlicher Termin für Roadmap und Prioritäten."
  - "Vorsitz und Entscheidungen liegen beim Kunden, sonst legt ein Partner die Regeln für seine Wettbewerber fest."
  - "Streams stellen Änderungen an gemeinsamen Objekten vor, bevor sie bauen; in meinem größten Programm sind die Randfälle dadurch fast verschwunden."
  - "Die Entscheidungen des CoE müssen im Pull-Request-Review und in der Pipeline ankommen, sonst bleibt es eine Gesprächsrunde."
faq:
  - q: "Was ist ein Salesforce Center of Excellence?"
    a: "Ein Team aus verschiedenen Bereichen des Unternehmens, das Standards, Roadmap und Befähigung für die Salesforce-Plattform verantwortet. Salesforce beschreibt es als Lenkungskreis und Wissenszentrum für alle Salesforce-Initiativen."
  - q: "Wie oft sollte sich ein Salesforce CoE treffen?"
    a: "Den technischen Call habe ich alle zwei Wochen für 60 Minuten geführt, mit Themen, die vorher eingereicht werden. Für Roadmap und Prioritäten reicht ein monatlicher Termin."
  - q: "Wer sollte ein Salesforce Center of Excellence leiten?"
    a: "Der Kunde, mit einem benannten CoE-Lead und einem Architekten, der die technischen Calls führt. Partner nehmen teil und bringen ihre Themen ein, entscheiden aber nicht über die Regeln für alle."
  - q: "Braucht ein mittelständischer Hersteller überhaupt ein CoE?"
    a: "Sobald mehr als ein Team oder ein Partner an derselben Org arbeitet, ja. Es muss dann keine eigene Abteilung sein, ein Call alle zwei Wochen mit klarer Agenda und ein Verantwortlicher genügen."
draft: false
---

Ein Salesforce Center of Excellence (CoE) ist das Gremium beim Kunden, das Standards festlegt und anstehende Änderungen über alle Teams und Partner abstimmt. Für einen Hersteller mit mehreren Umsetzungspartnern reichen am Anfang zwei Termine: ein technischer Call alle zwei Wochen, in dem Streams Änderungen an gemeinsamen Objekten mit Vorlauf vorstellen, und ein monatlicher Termin für Roadmap und Prioritäten. Den Vorsitz hat der Kunde, kein Partner. In meinem größten Programm haben regelmäßige CoE-Calls dazu geführt, dass neue Randfälle fast ganz wegfielen, weil Themen besprochen wurden, bevor sie zu Konflikten wurden.

## Was ist ein Salesforce Center of Excellence?

Salesforce beschreibt das CoE im Trailhead-Modul [Salesforce Governance with a Center of Excellence](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/define-your-salesforce-coe) als Team aus Fachleuten aus dem ganzen Unternehmen, das als Lenkungskreis und Wissenszentrum für alle Salesforce-Initiativen arbeitet. Es hat dort drei Aufgaben:

- **Vision:** eine Roadmap, wohin sich die Plattform entwickelt, priorisiert nach Nutzen.
- **Standards:** Regeln, wie auf der Plattform gearbeitet wird, von Prozessen über Datenqualität bis zu Entwicklungsregeln.
- **Befähigung:** Schulung, Kommunikation und Support für Nutzer und Teams.

In Fertigungsunternehmen mit mehreren Partnern ist nach meiner Erfahrung der zweite Punkt der dringendste. Eine Roadmap gibt es meist schon in irgendeinem Lenkungsausschuss. Was fehlt, ist der Ort, an dem Teams verbindlich klären, wer was an der Org ändert. Ohne diesen Ort entsteht das, was Salesforce [Governance Debt](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/learn-about-salesforce-governance-and-why-it-matters) nennt: technische Schulden, inkonsistente Daten und Nutzer, die sich Excel-Listen daneben bauen.

## Warum gehört das CoE auf die Kundenseite?

Ein Partner kann ein CoE moderieren, und manche bieten das als Leistung an. Das Problem: Wer die Regeln festlegt, entscheidet, wie alle anderen bauen. Arbeiten fünf Partner an einer Org und einer davon führt das CoE, bestimmt er, was seine Wettbewerber dürfen. Das ist derselbe Grund, aus dem ich bei der [Object Ownership Matrix](../object-ownership-matrix-salesforce/) und bei [Repository und Pipeline](../warum-kunden-devops-tools-selbst-besitzen-sollten/) auf Kundenbesitz bestehe.

Partner sitzen im CoE trotzdem mit am Tisch. Ihre Leads stellen Änderungen vor, bringen Randfälle aus dem Projekt ein und widersprechen, wenn ein Standard im Alltag nicht funktioniert. Den Vorsitz, die Entscheidung und die Dokumentation behält der Kunde, über einen CoE-Lead und einen Architekten.

## Welches Format braucht ein CoE am Anfang?

Trailhead empfiehlt einen [wöchentlichen Rhythmus für operative und technische Themen und einen monatlichen für Strategie und Roadmap](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/get-started-with-a-salesforce-coe). In meinem Programm lief der technische Call alle zwei Wochen für 60 Minuten, und das hat gereicht, weil die Themen vorher eingereicht wurden und die Agenda vor dem Termin verschickt war. Wöchentlich lohnt sich nur, wenn die Liste der eingereichten Themen dauerhaft länger ist als eine Stunde. Mehr Termine braucht es am Anfang nicht.

| | Technischer CoE-Call | Roadmap-Termin |
|---|---|---|
| Rhythmus | alle zwei Wochen, 60 Minuten | monatlich |
| Leitung | Architekt auf Kundenseite | CoE-Lead |
| Teilnehmer | nur die technischen Leads aller Streams und Partner | Sponsor, CoE-Lead, Fachbereiche, Architekt |
| Inhalt | anstehende Änderungen an gemeinsamen Objekten, Randfälle aus Reviews, neue oder geänderte Standards | Prioritäten, Roadmap, Budget, neue Partner |
| Ergebnis | Entscheidung, aktualisierter Standard oder Matrix | priorisierter Backlog für die nächsten Monate |

Der Roadmap-Termin ist auch der Ort für Budgetfragen, die mehrere Bereiche betreffen. Ein Beispiel ist das Kontingent für Agentforce, das ich in [Digital Wallet: Agentforce-Kostenkontrolle für Werke](../digital-wallet-agentforce-kostenkontrolle/) beschreibe: Jemand im CoE muss den Pool beobachten und die Verrechnung an Werke und Töchter führen.

## Der technische Call folgt immer derselben Agenda

Der technische Call ist der Teil, der den Unterschied macht. Damit er kein Statusmeeting wird, reichen die Streams ihre Themen vorher ein, und die Agenda geht vor dem Termin an alle Teilnehmer. So kann sich der verantwortliche Stream vorbereiten, statt im Call spontan zu entscheiden. Die Agenda folgt immer derselben Reihenfolge:

1. **Anstehende Änderungen an gemeinsamen Objekten.** Ein Stream stellt vor, was er an Account, Asset oder einem anderen geteilten Objekt ändern will, bevor er baut. Der verantwortliche Stream laut Matrix sagt, ob es passt und wo die Änderung hingehört.
2. **Randfälle aus den Reviews.** Was im [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/) aufgefallen ist und von keinem Standard abgedeckt wird, kommt hierher.
3. **Entscheidungen festhalten.** Jede Entscheidung landet dort, wo die Standards stehen, und nicht im Protokoll eines einzelnen Partners.

Statusberichte gehören nicht in diesen Call. Wer berichten will, was sein Team im Sprint geschafft hat, tut das im Sprint Review. Sonst sitzen 15 Leute eine Stunde zusammen, und die eine Änderung am Account, um die es eigentlich gehen sollte, kommt am Ende in fünf Minuten dran.

Neben der Agenda pflege ich einen Backlog mit CoE-Themen, die nicht dringend sind, etwa Namenskonventionen für neue Objekttypen oder eine Regel, die im Review immer wieder diskutiert wird. Kommen für einen Termin wenige Themen zusammen, nehmen wir eines aus dem Backlog. So fällt kein Termin aus, und der Rhythmus bleibt stabil.

Wichtig ist auch, wer entscheidet. Die Frage gehört dem Stream, der das Objekt verantwortet. Können sich zwei Streams nicht einigen, entscheidet der Architekt auf Kundenseite. Ein CoE, das jede Frage per Abstimmung klärt, wird langsam und politisch.

## In meinem Programm mit acht Streams verschwanden die Randfälle fast

Das größte Programm, das ich gesteuert habe, hatte mehr als 30 Entwickler in acht Streams, geliefert von fünf Umsetzungspartnern und internen Teams. Zu Beginn war nicht festgelegt, welches Team für welche Objekte und Metadaten verantwortlich war. Änderungen überschrieben sich gegenseitig.

Zuerst haben wir jede Änderung über einen Pull Request mit Review geschickt und aus den Reviews Standards aufgeschrieben, darunter die Object Ownership Matrix. Das CoE kam als zweiter Baustein dazu, als Ort für alles, was die Standards noch nicht abdeckten.

```praxis
Bis die Standards stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte rund 80 Prozent der Fälle ab. Die Randfälle haben wir in Center-of-Excellence-Calls besprochen, alle zwei Wochen für 60 Minuten, nur mit den technischen Leads der Streams. Die Streams haben Themen vorher eingereicht und anstehende Änderungen mit genug Vorlauf für alle anderen vorgestellt. Geleitet habe ich die Calls zuerst selbst. Irgendwann fielen die Randfälle fast ganz weg, weil Themen auf den Tisch kamen, bevor sie zu Konflikten wurden. Als der Prozess lief, habe ich ihn an einen internen Kollegen übergeben, der die Calls seitdem leitet.
```

Die Übergabe ist der Punkt, an dem sich zeigt, ob das CoE trägt. Hängt es an einer externen Person, endet es mit deren Vertrag. Deshalb gehört von Anfang an ein interner Verantwortlicher dazu, der die Calls zuerst begleitet und dann selbst führt.

## Zentral, föderiert oder hybrid: welches Modell passt?

Trailhead unterscheidet drei Modelle. Im zentralen Modell kann das CoE schlechte technische Entwürfe stoppen, statt nur Empfehlungen zu geben. Im föderierten Modell steuern einzelne Bereiche ihre Umsetzung selbst, und das CoE berät. Im hybriden Modell setzt das CoE die Standards zentral, und die Bereiche setzen sie selbst durch.

Für mehrere Partner auf einer gemeinsamen Org würde ich zentral starten. Wenn fünf Partner an denselben Objekten bauen, muss jemand Nein sagen können, und das Review setzt dieses Nein technisch durch.

```pro-contra
pro: Zentrales CoE mit Vetorecht
- Standards gelten für alle Partner gleich
- Konflikte an gemeinsamen Objekten werden vor dem Bau entschieden
- Partner bleiben vergleichbar und austauschbar
contra: Was Sie dafür in Kauf nehmen
- Der Architekt im CoE wird anfangs zum Engpass
- Werke und Töchter mit eigenen Wünschen warten auf Entscheidungen
- Ohne Rückhalt im Management wird das Veto ignoriert
```

Hat ein Konzern mehrere Orgs, etwa eine pro Tochtergesellschaft, passt das hybride Modell besser. Dann setzt das CoE die gemeinsamen Regeln, und jede Org setzt sie mit ihrem eigenen Team durch.

## Sponsor und CoE-Lead benennen

Ein CoE muss keine neue Abteilung sein. Diese Reihenfolge empfehle ich:

```schritte
Verantwortung festlegen | Kunde
  Einen Sponsor im Management und einen CoE-Lead benennen. Ohne Rückhalt von oben bleiben die Regeln Empfehlungen.
Erste Standards schreiben | Architekt
  Entwicklungsstandards und Object Ownership Matrix in einer ersten Version, die rund 80 Prozent der Fälle abdeckt.
Technischen Call starten | Architekt und technische Leads
  Alle zwei Wochen 60 Minuten, Themen vorher einreichen, Agenda vorab verschicken, Backlog mit Reservethemen.
Monatlichen Roadmap-Termin ergänzen | CoE-Lead und Fachbereiche
  Prioritäten, Budget und neue Partner, sobald der technische Call läuft.
Übergeben | interner Verantwortlicher
  Ein interner Kollege übernimmt die Calls und die Pflege der Standards.
```

Wie sich neue Regeln im Alltag verankern lassen, beschreibe ich unter [Change Management Beratung für Salesforce](../../leistungen/change-management/), und wie der Call Standards bei Partnern hält, in [Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/). Den Rahmen für mehrere Partner insgesamt finden Sie unter [Partnersteuerung](../../leistungen/partnersteuerung/).
