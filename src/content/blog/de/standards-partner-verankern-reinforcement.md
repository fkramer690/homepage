---
title: "Reinforcement: Standards bei Partnern verankern"
description: "Warum Entwicklungsstandards bei Salesforce-Partnern nach einigen Monaten verwässern und wie Pipeline, Review und Center of Excellence sie dauerhaft verankern."
pubDate: 2026-10-29
lang: de
slug: standards-partner-verankern-reinforcement
translationKey: change-reinforcement-standards
topic: governance
categories: [architecture, devops, change-management]
contactBrief: partner-governance
tags: [Reinforcement, Change Management, Partnersteuerung, Entwicklungsstandards]
takeaways:
  - "Reinforcement ist die letzte ADKAR-Stufe: dafür sorgen, dass niemand zurückfällt. Bei Partnern verwässern Standards, wenn neue Entwickler kommen und der Termindruck steigt."
  - "Wenn die Entwickler eines Partners die Namenskonventionen kennen, aber niemand sie in der Pipeline prüft, fehlt Reinforcement. Dann gehört eine automatische Prüfung in den Release-Prozess."
  - "Was sich nicht automatisch prüfen lässt, verankern Pull-Request-Reviews und ein regelmäßiger Center-of-Excellence-Call mit den technischen Leads."
  - "Standards sind erst verankert, wenn ein interner Verantwortlicher sie führt. Solange alles an einer externen Person hängt, endet die Verankerung mit ihrem Vertrag."
faq:
  - q: "Was bedeutet Reinforcement im Change Management?"
    a: "Reinforcement ist im ADKAR-Modell von Prosci die fünfte Stufe: Maßnahmen, die dafür sorgen, dass eine Veränderung bleibt und niemand in alte Gewohnheiten zurückfällt."
  - q: "Warum halten sich Partner nicht an vereinbarte Standards?"
    a: "Meist nicht aus Absicht. Neue Entwickler kennen die Standards nicht, unter Termindruck werden Ausnahmen gemacht, und wenn niemand prüft, wird aus der Ausnahme die Regel."
  - q: "Wie lange dauert es, bis Standards bei mehreren Partnern gelebt werden?"
    a: "In meinem größten Programm mit fünf Partnern etwa drei Monate. Danach kamen nur noch einzelne Randfälle dazu, die im Center-of-Excellence-Call besprochen wurden."
  - q: "Gehören Standards in den Vertrag mit dem Partner?"
    a: "Ja, als Verweis auf die geltende Fassung beim Kunden. So ist klar, dass eine Lieferung, die gegen die Standards verstößt, nicht abgenommen ist."
draft: false
---

Reinforcement ist die letzte Stufe im ADKAR-Modell: dafür sorgen, dass eine Veränderung bleibt. Bei Salesforce-Partnern ist das die schwierigste Stufe, weil Standards nach einigen Monaten verwässern, wenn neue Entwickler dazukommen und der Termindruck steigt. Verankert werden sie an drei Stellen: in der Pipeline für alles, was sich automatisch prüfen lässt, im Pull-Request-Review für den Rest und in einem regelmäßigen Center-of-Excellence-Call, in dem neue Randfälle besprochen werden. Dauerhaft halten sie erst, wenn ein interner Verantwortlicher sie führt.

## Warum verwässern Standards bei Partnern?

Die erste Einführung neuer Standards läuft meist gut. Die Teams sind aufmerksam, die Regeln sind neu, und jemand schaut genau hin. Nach einigen Monaten ändern sich drei Dinge:

- **Neue Entwickler kommen.** Partner tauschen Personen aus, und wer neu ins Team kommt, kennt die Standards nur aus einem Dokument, wenn überhaupt.
- **Der Termindruck steigt.** Vor einem wichtigen Release wird eine Ausnahme gemacht, „nur dieses Mal“. Wenn niemand prüft, wird aus der Ausnahme die Regel.
- **Die Aufmerksamkeit lässt nach.** Wer anfangs jeden Pull Request geprüft hat, hat inzwischen andere Aufgaben.

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) fehlt dann nicht das Wissen, sondern die Verankerung. Ein Beispiel: Wenn die Entwickler eines Partners die Namenskonventionen kennen, aber niemand sie in der Pipeline prüft, fehlt Reinforcement. Eine weitere Schulung ändert daran nichts. Dann gehört eine automatische Prüfung in den Release-Prozess.

```praxis
In meinem größten Programm mit mehr als 30 Entwicklern in acht Streams und fünf Umsetzungspartnern lief anfangs jeder Pull Request über meinen Schreibtisch. Bis die Standards gelebt wurden, hat es etwa drei Monate gedauert. Danach brachten wir neue Themen alle zwei Wochen in einem Center-of-Excellence-Call mit den technischen Leads der Streams auf den Tisch. Als der Prozess rund lief, habe ich ihn an einen internen Kollegen übergeben, der ihn seitdem verantwortet.
```

## Welche Hebel verankern Standards?

Jeder Hebel deckt einen anderen Teil der Standards ab. Zusammen lassen sie wenig Raum für stilles Verwässern:

| Hebel | Was er verankert | Wer |
|---|---|---|
| Automatische Prüfung in der Pipeline | Namen, verbotene Muster, Testabdeckung, Validierung gegen die Ziel-Org | läuft bei jedem Pull Request |
| Pull-Request-Review | Design, Verantwortung für Objekte, Passung zur Architektur | Reviewer auf Kundenseite |
| Center-of-Excellence-Call | neue Randfälle, anstehende Änderungen mit Vorlauf | technische Leads der Streams |
| Einarbeitung neuer Entwickler | Kenntnis der geltenden Fassung | Partner, geprüft vom Kunden |
| Vertrag | Standards als Abnahmekriterium | Einkauf, Programmleitung |
| Übergabe an internen Verantwortlichen | Fortbestand nach dem Projekt | Kunde |

Die Pipeline ist der günstigste Hebel, weil sie nie müde wird. Was dort geprüft wird, muss kein Reviewer mehr anmerken. Welche Regeln in die Standards gehören und was davon automatisch geht, beschreibe ich in [Salesforce-Entwicklungsstandards für mehrere Partner](../salesforce-entwicklungsstandards-definition-of-done/).

## Wie hilft der Center-of-Excellence-Call?

Standards sind nie fertig. Neue Fälle tauchen auf, etwa ein Stream, der ein Feld auf einem fremden Objekt braucht. Ohne festen Ort werden diese Fälle zwischen zwei Entwicklern entschieden, und jeder Partner entscheidet anders. Ein regelmäßiger Call mit den technischen Leads aller Streams gibt ihnen einen Ort. Jede Entscheidung dort wird in die Standards übernommen.

Der Call hat einen zweiten Effekt, der für Reinforcement fast wichtiger ist: Die technischen Leads tragen die Entscheidungen in ihre Teams. Ein neuer Entwickler erfährt eine Regel dann von seinem eigenen Lead, nicht aus einem Dokument des Kunden. Format und Rhythmus beschreibe ich in [Salesforce Center of Excellence: Format und Rhythmus](../salesforce-center-of-excellence-format/).

## Wie arbeiten Sie neue Entwickler eines Partners ein?

Jeder Personalwechsel beim Partner ist ein kleiner Neustart. Ich empfehle eine kurze, feste Einarbeitung, die der Partner verantwortet und der Kunde prüft: die geltenden Standards, die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), der Weg eines Pull Requests durch die Pipeline und die wichtigsten Einträge aus dem Entscheidungslog. Der erste Pull Request eines neuen Entwicklers bekommt ein ausführlicheres Review als üblich, damit Missverständnisse früh auffallen. Das kostet einen halben Tag und spart Wochen an Korrekturen. Je öfter ein Partner Personen austauscht, desto mehr lohnt es sich, deshalb gehört die Einarbeitung als Pflicht in die Vereinbarung mit dem Partner.

## Was tun bei Ausnahmen unter Termindruck?

Ausnahmen wird es geben. Entscheidend ist, dass sie sichtbar sind. Eine Ausnahme von den Standards braucht im Pull Request eine Begründung und ein Ticket, das die Korrektur im nächsten Release einplant. So bleibt die Ausnahme eine Ausnahme. Häufen sich Ausnahmen bei einer Regel, gehört die Regel in den nächsten Center-of-Excellence-Call: Entweder passt sie nicht, oder der Plan lässt zu wenig Zeit.

## Was gehört in den Vertrag?

Ein Vertrag ersetzt kein Review, aber er macht klar, was gilt. Ich empfehle, im Vertrag mit jedem Partner auf die geltende Fassung der Standards beim Kunden zu verweisen, nicht auf eine Kopie im Anhang. Dann gilt jede Änderung aus dem Center-of-Excellence-Call ohne neue Verhandlung. Und eine Lieferung, die gegen die Standards verstößt, ist nicht abgenommen. Für KI-generierten Code gilt dasselbe, siehe [Partner codet mit KI: Was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/).

```hinweis offen
Prüfen Sie, ob Ihre Partnerverträge auf die Standards verweisen und ob ein Verstoß die Abnahme verhindert. Fehlt das, gelten die Standards rechtlich als Empfehlung.
```

## Woran erkennen Sie, dass Standards verankert sind?

Drei Zeichen zeigen es. Reviewer merken seltener dieselben Punkte an, weil die Pipeline sie vorher findet. Neue Randfälle kommen im Center-of-Excellence-Call auf den Tisch, bevor sie gebaut sind, statt danach als Konflikt. Und neue Entwickler eines Partners halten die Regeln ein, ohne dass jemand sie einzeln erklärt. In meinem Programm fielen die Randfälle irgendwann ganz weg, weil Themen besprochen wurden, bevor sie zu Konflikten wurden.

## Wo fangen Sie an?

Sehen Sie sich die Review-Kommentare der letzten zwei Monate an und zählen Sie, welche Anmerkungen sich wiederholen. Jede Anmerkung, die sich automatisch prüfen lässt, kommt in die Pipeline, mit einer klaren Fehlermeldung, die den Standard nennt. Für den Rest richten Sie einen festen Call mit den technischen Leads ein. Und planen Sie von Anfang an, wer auf Kundenseite die Standards übernimmt, wenn das Projekt endet.

Standards sind verankert, wenn sie auch ohne die Person halten, die sie eingeführt hat. Wenn Sie mehrere Partner auf eine Linie bringen möchten, [schreiben Sie mir](#contact) oder lesen Sie mehr über [Partnersteuerung](../../leistungen/partnersteuerung/).
