---
title: "Salesforce Center of Excellence: Format und Rhythmus"
description: "Wie ein Salesforce Center of Excellence beim Kunden arbeitet: zwei Termine, klare Rollen, Entscheidungen mit Vorlauf. Erfahrung aus 8 Streams."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-center-of-excellence-format
translationKey: salesforce-center-of-excellence
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Center of Excellence, CoE, Partnersteuerung, Governance, Object Ownership Matrix]
takeaways:
  - "Zwei Termine setzen den ersten Governance-Rhythmus: ein technischer Call alle zwei Wochen für Änderungen und Randfälle und ein monatlicher Roadmap-Termin."
  - "Vorsitz und Entscheidungen liegen beim Kunden, sonst legt ein Partner die Regeln für seine Wettbewerber fest."
  - "Streams stellen Änderungen an gemeinsamen Objekten vor der Umsetzung vor; in meinem größten Programm traten Randfälle dadurch kaum noch auf."
  - "CoE-Entscheidungen müssen in Freigaben der verantwortlichen Streams, geschützten Branches und Pipeline-Prüfungen greifen, sonst bleibt es eine Gesprächsrunde."
faq:
  - q: "Was ist ein Salesforce Center of Excellence?"
    a: "Ein kundeneigenes, bereichsübergreifendes Gremium, das Plattformstrategie, Standards, Umsetzung und Befähigung für Salesforce verbindet. Salesforce beschreibt es als Lenkungskreis und Wissenszentrum für alle Salesforce-Initiativen."
  - q: "Wie oft sollte sich ein Salesforce CoE treffen?"
    a: "Salesforce empfiehlt, zunächst wöchentlich für operative und technische Themen und monatlich für Strategie und Roadmap zu tagen. In meinem Programm fand der technische Call alle zwei Wochen für 60 Minuten statt, mit vorher eingereichten Themen, und ein monatlicher Termin deckte Roadmap und Prioritäten ab."
  - q: "Wer sollte ein Salesforce Center of Excellence leiten?"
    a: "Der Kunde, mit einem benannten CoE-Lead und einem Architekten, der die technischen Calls führt. Partner nehmen teil und bringen ihre Themen ein, entscheiden aber nicht über die Regeln für alle."
  - q: "Braucht ein mittelständischer Hersteller überhaupt ein CoE?"
    a: "Wenn mehr als ein Team oder mehr als ein Partner an derselben Org arbeitet, ist das ein starker Anlass für formale Governance. Es muss keine eigene Abteilung sein; für den Start können ein Call alle zwei Wochen mit klarer Agenda und ein Verantwortlicher genügen, der Umfang wächst mit dem Programm."
draft: false
---

Ein Salesforce Center of Excellence (CoE) ist ein kundeneigenes Gremium, das Plattformstrategie, Standards, Umsetzung und Befähigung über alle Teams und Partner verbindet. Für einen Hersteller mit mehreren Umsetzungspartnern setzen zwei Termine den ersten Governance-Rhythmus: ein technischer Call alle zwei Wochen, in dem Streams Änderungen an gemeinsamen Objekten mit Vorlauf vorstellen, und ein monatlicher Termin für Roadmap und Prioritäten. Den Vorsitz hat der Kunde, kein Partner. In meinem größten Programm haben regelmäßige CoE-Calls nach meiner Beobachtung dazu geführt, dass kaum noch neue Randfälle auftraten, weil Themen besprochen wurden, bevor sie zu Konflikten wurden.

## Was ist ein Salesforce Center of Excellence?

Salesforce beschreibt das CoE im Trailhead-Modul [Salesforce Governance with a Center of Excellence](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/define-your-salesforce-coe) als Team aus Fachleuten aus dem ganzen Unternehmen, das als Lenkungskreis und Wissenszentrum für alle Salesforce-Initiativen arbeitet. Es hat dort drei Aufgaben:

- **Vision:** eine Roadmap, wohin sich die Plattform entwickelt, priorisiert nach Nutzen.
- **Standards:** Regeln, wie auf der Plattform gearbeitet wird, von Prozessen über Datenqualität bis zu Entwicklungsregeln.
- **Befähigung:** Schulung, Kommunikation und Support für Nutzer und Teams.

In Fertigungsunternehmen mit mehreren Partnern ist nach meiner Erfahrung der zweite Punkt der dringendste. Eine Roadmap existiert meist schon in einem Lenkungsausschuss. Was fehlt, ist ein Gremium, in dem Teams verbindlich klären, wer welche Änderungen an der Org vornimmt. Ohne diesen Ort entsteht das, was Salesforce [Governance Debt](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/learn-about-salesforce-governance-and-why-it-matters) nennt: technische Schulden, inkonsistente Daten und Nutzer, die parallel eigene Excel-Listen führen.

## Warum gehört das CoE auf die Kundenseite?

Ein Partner kann ein CoE moderieren, und manche bieten das als Leistung an. Das Problem: Wer die Regeln festlegt, entscheidet, wie alle anderen entwickeln. Arbeiten fünf Partner an einer Org und einer davon führt das CoE, bestimmt er, was seine Wettbewerber dürfen. Das ist derselbe Grund, aus dem ich bei der [Object Ownership Matrix](/blog/object-ownership-matrix-salesforce/) und bei [Repository und Pipeline](/blog/warum-kunden-devops-tools-selbst-besitzen-sollten/) auf Kundenbesitz bestehe.

Partner sind im CoE trotzdem vertreten. Ihre Leads stellen Änderungen vor, bringen Randfälle aus dem Projekt ein und widersprechen, wenn ein Standard im Alltag nicht funktioniert. Den Vorsitz, die Entscheidungsbefugnis und die Dokumentation behält der Kunde, vertreten durch einen CoE-Lead und einen Architekten.

## Welches Format braucht ein CoE am Anfang?

Salesforce schlägt vor, einen [wöchentlichen Rhythmus für operative und technische Themen und einen monatlichen für Strategie und Roadmap](https://trailhead.salesforce.com/content/learn/modules/salesforce-governance-with-a-center-of-excellence/get-started-with-a-salesforce-coe) für das Kernteam und seine Untergruppen zu erproben. Dasselbe Modul beschreibt weitere Schritte zum Aufbau, vom Sponsor über den Umfang bis zur Messung; die zwei Termine sind der Governance-Rhythmus, nicht das ganze CoE. Diesen technischen Teil bezeichnet Salesforce als Design Authority, eine Untergruppe des CoE, die der Architekt leitet. In meinem Programm fand der technische Call alle zwei Wochen für 60 Minuten statt, und das hat gereicht, weil die Themen vorher eingereicht wurden und die Agenda vor dem Termin verschickt war. Ein wöchentlicher Termin lohnt sich nur, wenn die eingereichten Themen dauerhaft mehr als eine Stunde füllen. Mehr Termine braucht es am Anfang nicht.

| | Technischer CoE-Call | Roadmap-Termin |
|---|---|---|
| Rhythmus | alle zwei Wochen, 60 Minuten | monatlich |
| Leitung | Architekt auf Kundenseite | CoE-Lead |
| Teilnehmer | technische Leads aller Streams und Partner, dazu je nach Agenda Fachverantwortliche sowie Daten-, Integrations-, Sicherheits- oder Compliance-Fachleute | Sponsor, CoE-Lead, Fachbereiche, Architekt |
| Inhalt | anstehende Änderungen an gemeinsamen Objekten, Integrationen, Berechtigungen und anderen übergreifenden Bausteinen, Randfälle aus Reviews, neue oder geänderte Standards | Prioritäten, Roadmap, Budget, neue Partner |
| Ergebnis | Entscheidung, aktualisierter Standard oder Matrix | aktualisierte Roadmap mit Prioritäten, Budget, Verantwortlichen und Meilensteinen |

Der Roadmap-Termin ist auch der Ort für Budgetfragen, die mehrere Bereiche betreffen. Ein Beispiel ist das Kontingent für Agentforce, das ich in [Agentforce-Kosten für Hersteller](/blog/flex-credits-agentforce-kosten-pro-aktion/) beschreibe: Kauft das Unternehmen Flex Credits zentral, sollte das CoE einen Verantwortlichen für die Verbrauchsüberwachung benennen und entscheiden, ob Werke und Tochtergesellschaften Kostentransparenz per Showback, eine interne Verrechnung per Chargeback oder ein zentrales Budget erhalten.

## Der technische Call folgt immer derselben Agenda

Der technische Call ist der Teil, der den Unterschied macht. Damit er kein Statusmeeting wird, reichen die Streams ihre Themen vorher ein, und die Agenda wird vor dem Termin an alle Teilnehmer verschickt. So können sich die Verantwortlichen im Stream vorbereiten, statt im Call spontan entscheiden zu müssen. Die Agenda folgt immer derselben Reihenfolge:

1. **Anstehende Änderungen an gemeinsamen Bausteinen.** Ein Stream stellt vor, was er am Account, am Asset, an einer gemeinsamen Schnittstelle oder an einem Berechtigungssatz ändern will, bevor er mit der Umsetzung beginnt. Der laut Matrix verantwortliche Stream beurteilt, ob die Änderung passt und wo sie umgesetzt werden sollte.
2. **Randfälle aus den Reviews.** Was im [Pull-Request-Review](/blog/warum-pull-request-reviews-pflicht-sind/) aufgefallen ist und von keinem Standard abgedeckt wird, wird hier besprochen.
3. **Entscheidungen festhalten.** Jede Entscheidung wird dort dokumentiert, wo die Standards stehen, und nicht im Protokoll eines einzelnen Partners.

Statusberichte gehören nicht in diesen Call. Wer berichten will, was sein Team im Sprint geschafft hat, tut das im Sprint Review. Sonst beraten 15 Leute eine Stunde lang, und die eine Änderung am Account, um die es eigentlich gehen sollte, wird am Ende in fünf Minuten abgehandelt.

Neben der Agenda pflege ich einen Backlog mit CoE-Themen, die nicht dringend sind, etwa Namenskonventionen für neue Objekttypen oder eine Regel, die im Review immer wieder diskutiert wird. Werden für einen Termin wenige Themen eingereicht, nehmen wir eines aus dem Backlog als zeitlich begrenzten Standards-Workshop. Ist nichts entscheidungsreif, sagen Sie den Termin lieber ab, als ihn zu füllen.

Wichtig ist auch, wer entscheidet. Der Stream, der das Objekt verantwortet, entscheidet, ob Änderungen innerhalb des Objekts konsistent sind. Architektur und technische Standards liegen beim Architekten auf Kundenseite als Design Authority, Prozess und Priorität beim Fachverantwortlichen, Budget, Umfang und ungelöste Konflikte beim Sponsor. Der CoE-Lead hält die Entscheidung mit Verantwortlichem und Frist fest. Ein CoE, das jede Frage per Abstimmung klärt, wird langsam und politisch.

Entscheidungen wirken nur, wenn die Umsetzung sie durchsetzt: Vor dem Merge ist die Freigabe des verantwortlichen Streams Pflicht, Branches und Deployment-Wege sind geschützt, und ausgewählte Standards werden als automatische Pipeline-Prüfungen mit dokumentierten Ausnahmen umgesetzt.

## In meinem Programm mit acht Streams verschwanden die Randfälle fast

Das größte Programm, das ich gesteuert habe, umfasste mehr als 30 Entwickler in acht Streams; die Umsetzung erfolgte durch fünf Umsetzungspartner und interne Teams. Zu Beginn war nicht festgelegt, welches Team für welche Objekte und Metadaten verantwortlich war. Änderungen überschrieben sich gegenseitig.

Zuerst musste jede Änderung einen Pull Request mit Review durchlaufen, und aus den Reviews haben wir Standards abgeleitet, darunter die Object Ownership Matrix. Das CoE folgte als zweiter Baustein, als Ort für alles, was die Standards noch nicht abdeckten.

```praxis
Bis die Standards stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte rund 80 Prozent der Fälle ab. Die Randfälle haben wir in Center-of-Excellence-Calls besprochen, alle zwei Wochen für 60 Minuten, nur mit den technischen Leads der Streams. Die Streams haben Themen vorher eingereicht und anstehende Änderungen mit ausreichendem Vorlauf für alle anderen vorgestellt. Geleitet habe ich die Calls zuerst selbst. Mit der Zeit traten kaum noch Randfälle auf, weil Themen angesprochen wurden, bevor sie zu Konflikten wurden. Als der Prozess etabliert war, habe ich ihn an einen internen Kollegen übergeben, der die Calls seitdem leitet.
```

Die Übergabe ist der Punkt, an dem sich zeigt, ob das CoE trägt. Ist es von einer externen Person abhängig, endet es mit deren Vertrag. Deshalb gehört von Anfang an ein interner Verantwortlicher dazu, der die Calls zuerst begleitet und dann selbst führt.

## Zentral, föderiert oder hybrid: welches Modell passt?

Trailhead unterscheidet drei Modelle. Im zentralen Modell kann das CoE schlechte technische Entwürfe stoppen, statt nur Empfehlungen zu geben. Im föderierten Modell steuern einzelne Bereiche ihre Umsetzung selbst, und das CoE berät. Im hybriden Modell setzt das CoE die Standards zentral, und die Bereiche setzen sie selbst durch.

Für mehrere Partner auf einer gemeinsamen Org würde ich zentral starten. Wenn fünf Partner dieselben Objekte bearbeiten, muss jemand Nein sagen können, und Pflichtfreigaben sowie geschützte Branches setzen diese Entscheidung technisch durch.

```pro-contra
pro: Zentrales CoE mit Vetorecht
- Standards gelten für alle Partner gleich
- Konflikte an gemeinsamen Objekten werden vor Beginn der Umsetzung entschieden
- Partner bleiben vergleichbar und austauschbar
contra: Was Sie dafür in Kauf nehmen
- Der Architekt im CoE wird anfangs zum Engpass
- Werke und Töchter mit eigenen Wünschen warten auf Entscheidungen
- Ohne Rückhalt im Management wird das Veto ignoriert
```

Hat ein Konzern mehrere Orgs, etwa eine pro Tochtergesellschaft, spricht das oft für das föderierte Modell. Hybrid passt, wenn zentrale Standards nötig sind, die jede Einheit mit ihrem eigenen Team durchsetzen soll.

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
  Prioritäten, Budget und neue Partner, sobald der technische Call etabliert ist.
Messen und anpassen | CoE-Lead
  Entscheidungsdauer, Nacharbeit zwischen Streams, Ausnahmen und offene Zuständigkeitskonflikte verfolgen; den Rhythmus nach drei Monaten prüfen.
Übergeben | interner Verantwortlicher
  Ein interner Kollege übernimmt die Calls und die Pflege der Standards.
```

Wie sich neue Regeln im Alltag verankern lassen, beschreibe ich unter [Change Management Beratung für Salesforce](/leistungen/change-management/), und wie der Call Standards bei Partnern sichert, in [Reinforcement: Standards bei Partnern verankern](/blog/standards-partner-verankern-reinforcement/). Den Rahmen für mehrere Partner insgesamt finden Sie unter [Partnersteuerung](/leistungen/partnersteuerung/).
