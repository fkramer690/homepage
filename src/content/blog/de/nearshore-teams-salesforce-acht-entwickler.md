---
title: "Nearshore-Teams für Salesforce: Warum höchstens acht?"
description: "Warum ich Salesforce-Nearshore-Teams bei etwa acht Entwicklern begrenze, was bei größeren Teams passiert und wie mehrere kleine Teams zusammenarbeiten."
pubDate: 2026-10-27
lang: de
slug: nearshore-teams-salesforce-acht-entwickler
translationKey: nearshore-team-size
topic: governance
categories: [architecture]
contactBrief: nearshore
tags: [Nearshore, Teamgröße, Programmsteuerung, Partnersteuerung, Scrum]
takeaways:
  - "Ich begrenze Nearshore-Teams für Salesforce auf etwa acht Entwickler. Mit Product Owner und Scrum Master bleibt das Team damit bei zehn Personen, der Obergrenze aus dem Scrum Guide."
  - "Mit jeder weiteren Person wächst die Zahl der Abstimmungswege schneller als die Kapazität: Acht Personen haben 28 Wege miteinander, zwölf schon 66 und sechzehn 120."
  - "Braucht ein Programm mehr Kapazität, setze ich mehrere Teams mit klaren Verantwortlichkeiten auf statt eines großen Teams, etwa über eine Object Ownership Matrix."
  - "Rotation, Fluktuation und zu seniore Teams bremsen Nearshore-Teams öfter als fehlende Skills. Eine Mindestverweildauer von etwa sechs Monaten gehört deshalb vor den ersten Sprint."
faq:
  - q: "Wie groß sollte ein Nearshore-Team für Salesforce sein?"
    a: "Bis zu etwa acht Entwickler pro Team. Mit Product Owner und Scrum Master sind das zehn Personen, die Obergrenze, die der Scrum Guide nennt. Darüber nimmt die Abstimmung überhand, und Sprint-Meetings werden lang."
  - q: "Was mache ich, wenn das Programm mehr als acht Entwickler braucht?"
    a: "Mehrere Teams aufsetzen, jedes mit einem klaren Verantwortungsbereich, etwa einem Stream mit eigenen Objekten. Alle Teams arbeiten mit denselben Standards, Reviews und derselben Pipeline und stimmen Releases gemeinsam ab."
  - q: "Warum sind sehr erfahrene Teams nicht automatisch besser?"
    a: "In einem Team aus lauter erfahrenen Entwicklern wollen viele entwerfen und wenige bauen. Das bringt Unruhe und bremst. Ein Mix aus wenigen Seniors, die Architektur und Reviews tragen, und Entwicklern, die gern umsetzen, liefert stabiler."
  - q: "Gilt das für Osteuropa und Indien gleichermaßen?"
    a: "Nach meiner Erfahrung ja. Ich habe mit Nearshore-Teams in beiden Regionen gearbeitet, und die Erfolgsfaktoren und Probleme waren dieselben: Teamgröße, Fluktuation, Kultur und Rückhalt im Management."
draft: false
---

Ich begrenze Nearshore-Teams für Salesforce auf etwa acht Entwickler. Mit Product Owner und Scrum Master sind das zehn Personen, und das ist die Obergrenze, die auch der Scrum Guide nennt. Darüber wächst der Abstimmungsaufwand schneller als die Kapazität, Sprint-Meetings werden lang, und das Team liefert pro Kopf weniger. Braucht ein Programm mehr Entwickler, setze ich mehrere kleine Teams mit klaren Verantwortlichkeiten auf. Die Teamgröße ist dabei nur eine von mehreren Stellschrauben, aber die, die am leichtesten falsch eingestellt wird.

## Warum höchstens acht Entwickler?

Der [Scrum Guide](https://scrumguides.org/scrum-guide.html) beschreibt ein Scrum Team als typischerweise zehn oder weniger Personen. Klein genug, um beweglich zu bleiben, groß genug, um in einem Sprint etwas Relevantes fertigzustellen. Er schreibt auch, dass kleinere Teams nach seiner Erfahrung besser kommunizieren und produktiver sind. Zieht man Product Owner und Scrum Master ab, bleiben rund acht Entwickler.

Die Rechnung dahinter ist einfach. In einem Team mit n Personen gibt es n mal (n minus 1) geteilt durch zwei mögliche Abstimmungswege zwischen je zwei Personen:

| Personen im Team | Abstimmungswege |
|---|---|
| 5 | 10 |
| 8 | 28 |
| 12 | 66 |
| 16 | 120 |

Von acht auf sechzehn Personen verdoppelt sich die Kapazität, die Zahl der Wege steigt auf mehr als das Vierfache. Nicht jeder Weg wird täglich genutzt. In einem Salesforce-Team, das an derselben Org arbeitet, sind es aber viele: Wer an einem Flow auf Account arbeitet, muss wissen, wer gerade die Validierungsregeln oder das Layout desselben Objekts ändert.

Bei Nearshore-Teams kommt dazu, dass ein Teil der Abstimmung über Zeitzonen, Sprachen und Organisationsgrenzen läuft. Jede Rückfrage an den Fachbereich auf Kundenseite dauert länger als im eigenen Büro. Ein kleines Team stellt weniger dieser Rückfragen, weil mehr Wissen bei weniger Personen liegt.

## Was passiert, wenn ein Team größer wird?

Ein Team mit zwölf oder fünfzehn Entwicklern funktioniert selten so, wie es auf dem Papier geplant war. Typisch sind drei Muster:

- **Sprint-Meetings werden lang.** Ein Daily mit fünfzehn Personen dauert keine fünfzehn Minuten mehr, und die meisten hören bei den Themen der anderen nur zu. Planning und Review füllen halbe Tage.
- **Abstimmung verlagert sich in kleine Gruppen.** Im großen Team bilden sich inoffizielle Untergruppen, die eigene Absprachen treffen. Die Vorteile kleiner Teams entstehen also trotzdem, nur ohne klare Verantwortung.
- **Konflikte in der Org nehmen zu.** Mehr Entwickler, die gleichzeitig dieselben Objekte ändern, bedeuten mehr Merge-Konflikte, mehr überschriebene Metadaten und mehr Fehler, die keinem Team zugeordnet werden können.

Dazu kommt ein kaufmännischer Effekt. Ein Nearshore-Partner wird nach Köpfen bezahlt. Wenn zusätzliche Entwickler vor allem zusätzliche Abstimmung erzeugen, steigt der Tagessatz des Teams, aber nicht die Lieferung.

## Wie verteile ich mehr Kapazität auf mehrere Teams?

Braucht ein Programm mehr als acht Entwickler, setze ich mehrere Teams auf, jedes mit einem klaren Verantwortungsbereich. Der Scrum Guide empfiehlt dasselbe: Ein zu großes Team soll sich in mehrere zusammenhängende Teams aufteilen, die am selben Produkt arbeiten.

![Mehrere kleine Teams auf einer gemeinsamen Basis: Jedes Team hat bis zu etwa acht Entwickler und klare Verantwortlichkeiten. Vom ersten Tag an arbeitet jedes Team mit denselben Standards, Pull-Request-Reviews und derselben Pipeline wie alle anderen. Regeln zu Besetzung und Rotation werden vor dem ersten Sprint vereinbart, und ein Programmplan mit Streams und Abhängigkeiten sowie ein Release-Prozess halten die Teams zusammen.](../../../assets/blog/nearshore-team-setup-de.png)

Damit mehrere Teams nicht wieder ein großes Team werden, brauchen sie vier gemeinsame Grundlagen:

1. **Klare Verantwortung pro Team.** Am besten über Streams mit eigenen Prozessen und Objekten. Wer welches Objekt verantwortet, regelt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/). In meinem größten Programm mit mehr als 30 Entwicklern in acht Streams und fünf Partnern war sie eines der zwei Elemente, die den größten Unterschied gemacht haben.
2. **Dieselben Standards für alle.** Namenskonventionen, eine Automatisierung pro Objekt und Kontext, Regeln für Testabdeckung. Neue Teams lernen sie am schnellsten in [Pull-Request-Reviews](../warum-pull-request-reviews-pflicht-sind/).
3. **Eine Pipeline und ein Release-Prozess.** Alle Teams liefern über denselben Weg in Produktion, und Releases werden teamübergreifend abgestimmt. Repository und Pipeline gehören dem Kunden, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben.
4. **Ein Programmplan mit Abhängigkeiten.** Was Team A bis wann liefern muss, damit Team B weiterarbeiten kann, steht im Plan und nicht nur in den Köpfen.

Die Teams müssen nicht gleich groß sein. Ein Stream mit vielen Schnittstellen braucht vielleicht sechs Entwickler, ein kleiner Stream drei. Wichtig ist, dass keins über acht wächst und dass jedes weiß, wofür es verantwortlich ist.

In der Praxis ist die Grenze selten ein Problem, wenn die Teams entlang der Streams geschnitten sind. Ein Stream ist selten so groß, dass mehr als acht Personen zum Beispiel an der Sales Cloud arbeiten. Wird ein Team größer, liegen die Aufgaben meist schon so weit auseinander, dass zwei Teams mehr Sinn ergeben. Häufig sehe ich das Gegenteil: Sales und Service landen in einem Topf, weil beide auf Account und Contact arbeiten. Das ergibt nur bedingt Sinn, denn die Prozesse, Fachbereiche und Releases der beiden unterscheiden sich stark.

In meinem größten Programm waren auch Nearshore-Teams dabei. Meist haben sie einzelne Streams komplett gestemmt, vom Backlog bis zum Release. Das funktioniert gut, weil ein Team dann einen klaren Bereich hat und nicht für mehrere Streams gleichzeitig arbeitet.

## Was bremst Nearshore-Teams außer der Größe?

Liefert ein Nearshore-Team weniger als erwartet, werden oft zuerst die Skills verantwortlich gemacht. Ich habe mit Nearshore-Teams in Osteuropa und Indien gearbeitet, und die Gründe lagen in beiden Regionen meist woanders:

- **Rotierende Ressourcen.** Werden Entwickler alle paar Monate in andere Projekte verschoben, geht das Wissen über die Org mit ihnen. Jede neue Person braucht Wochen, bis sie produktiv ist.
- **Hohe Fluktuation.** Der Effekt ist derselbe, und sie bringt zusätzlich Unruhe in den Rest des Teams.
- **Zu seniore Teams.** Ein Team aus lauter erfahrenen Entwicklern klingt nach einer sicheren Wahl. In der Praxis wollen zu viele entwerfen und zu wenige bauen. Besser ist ein Mix aus wenigen Seniors, die Architektur und Reviews tragen, und Entwicklern, die gern umsetzen.
- **Fehlender Rückhalt im Management.** Ein Nearshore-Team braucht Entscheidungen, Zugänge und Aufmerksamkeit vom Kunden. Ohne das wartet es, und der Kunde bezahlt das Warten.

Kultur zählt dabei so viel wie Skills: gemeinsame Werte, Vertrauen und der Wille zu liefern, auf beiden Seiten. Ein kleines, stabiles Team baut das schneller auf als ein großes, das sich ständig neu zusammensetzt.

## Welche Regeln gehören vor den ersten Sprint?

Die meisten dieser Probleme lassen sich vertraglich und organisatorisch begrenzen, wenn man sie vor dem Start anspricht. Kunde und Nearshore-Partner sollten deshalb Regeln vereinbaren zu:

- **Teamgröße und Rollen**, also wie viele Entwickler, welche Seniorität und wer Reviews übernimmt.
- **Besetzung und Rotation.** Wie lange bleibt eine Person mindestens im Team, und wie viel Vorlauf gibt es bei einem Wechsel? Je nach Größe des Programms halte ich sechs Monate Mindestverweildauer für sinnvoll.
- **Übergabe bei Wechseln.** Wer arbeitet eine neue Person ein, und wie lange überlappen alte und neue Person?
- **Kommunikation.** Welche Meetings sind gemeinsam, wer ist auf Kundenseite für Fragen erreichbar, und in welcher Zeit wird geantwortet?

Diese Regeln schützen beide Seiten vor dem Moment, in dem nach sechs Monaten die Hälfte des Teams gewechselt hat und keiner mehr weiß, warum eine Automatisierung so gebaut wurde.

## Wo sollten Sie anfangen?

Haben Sie bereits ein Nearshore-Team, beantworten Sie drei Fragen:

1. **Wie viele Entwickler hat jedes Team?** Liegt eins deutlich über acht, prüfen Sie, entlang welcher Streams oder Objekte es sich teilen lässt.
2. **Wie viele Personen haben im letzten halben Jahr das Team verlassen?** Ist die Zahl hoch, ist Rotation wahrscheinlich das größere Problem als die Größe.
3. **Wer verantwortet welche Objekte?** Ist das nirgends festgehalten, beginnen Sie mit einer Object Ownership Matrix, bevor Sie Teams teilen.

Planen Sie ein neues Setup, legen Sie Teamgröße, Rollen und Rotationsregeln fest, bevor Sie Angebote vergleichen. Dann vergleichen Sie Partner auf derselben Grundlage, und nicht nur über den Tagessatz. Wie ich Programme mit Nearshore-Teams plane und steuere, beschreibe ich unter [Programmsteuerung und Nearshore-Teams](../../leistungen/projektsteuerung-nearshore/).

Acht Entwickler pro Team sind keine starre Zahl, aber eine gute Obergrenze, die viel Abstimmung erspart. Wenn Sie ein Nearshore-Team aufsetzen oder ein bestehendes wieder auf Kurs bringen möchten, [schreiben Sie mir](#contact).
