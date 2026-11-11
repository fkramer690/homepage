---
title: "Reinforcement: Standards bei Partnern verankern"
description: "Warum Entwicklungsstandards bei Salesforce-Partnern nach einigen Monaten verwässern und wie Pipeline, Review und Center of Excellence sie dauerhaft verankern."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: standards-partner-verankern-reinforcement
translationKey: change-reinforcement-standards
topic: governance
categories: [architecture, devops, change-management]
coAuthor: juliane
contactBrief: partner-governance
tags: [Reinforcement, Change Management, Partnersteuerung, Entwicklungsstandards]
takeaways:
  - "Bei Implementierungspartnern sind Standards gefährdet, wenn Entwickler wechseln, der Termindruck steigt und Kontrollen schwächer werden."
  - "Wenn Entwickler die Namenskonventionen kennen, aber weder die Pipeline noch das Review Abweichungen erkennt, ist das Reinforcement zu schwach."
  - "Was sich nicht automatisch prüfen lässt, verankern Pull-Request-Reviews und ein regelmäßiger Center-of-Excellence-Call mit den technischen Leads."
  - "Standards sind erst verankert, wenn ein interner Verantwortlicher sie dauerhaft betreut. Andernfalls enden sie mit dem Vertrag der externen Person."
faq:
  - q: "Was bedeutet Reinforcement im Change Management?"
    a: "Reinforcement ist im ADKAR-Modell von Prosci das fünfte Element: Maßnahmen, die dafür sorgen, dass eine Veränderung bleibt und niemand in alte Gewohnheiten zurückfällt."
  - q: "Warum halten sich Partner nicht an vereinbarte Standards?"
    a: "Meist nicht aus Absicht. Neue Entwickler kennen die Standards nicht, unter Termindruck werden Ausnahmen gemacht, und wenn niemand prüft, wird aus der Ausnahme die Regel."
  - q: "Wie lange dauert es, bis Standards bei mehreren Partnern gelebt werden?"
    a: "Es gibt keine feste Dauer. In meinem größten Programm mit fünf Partnern dauerte die erste Stabilisierung etwa drei Monate. Unreife Pipelines, häufiger Personalwechsel oder unklare Entscheidungsrechte können diese Phase verlängern. Danach traten nur noch einzelne Randfälle auf, die im Center-of-Excellence-Call besprochen wurden."
  - q: "Gehören Standards in den Vertrag mit dem Partner?"
    a: "Ja. Der Vertrag sollte die geltende Fassung, ihren Ablageort, das Verfahren zur Ankündigung und Genehmigung von Änderungen sowie die schwerwiegenden Verstöße nennen, die die Abnahme betreffen. Stimmen Sie die Formulierung mit Ihrem Vertragsanwalt ab."
draft: false
---

Reinforcement ist das fünfte Element im ADKAR-Modell von Prosci: Es sorgt dafür, dass eine Veränderung bleibt. Dieser Artikel überträgt es auf Entwicklungsstandards bei mehreren Salesforce-Implementierungspartnern. Dort ist es der schwierigste Teil, weil Standards nach einigen Monaten verwässern, wenn Entwickler wechseln und der Termindruck steigt. Drei Mechanismen leisten den Großteil der täglichen Arbeit: die Pipeline für alles, was sich automatisch prüfen lässt, das Pull-Request-Review für den Rest und ein regelmäßiger Center-of-Excellence-Call, in dem neue Randfälle besprochen werden. Einarbeitung, Vertrag und ein interner Verantwortlicher sichern die dauerhafte Anwendung der Standards.

## Warum verwässern Standards bei Partnern?

Die erste Einführung neuer Standards gelingt meist. Die Teams sind aufmerksam, die Regeln sind neu, und jemand prüft sorgfältig. Nach einigen Monaten ändern sich drei Dinge:

- **Neue Entwickler kommen.** Partner tauschen Personen aus, und wer neu im Team ist, kennt die Standards nur aus einem Dokument, wenn überhaupt.
- **Der Termindruck steigt.** Vor einem wichtigen Release wird eine Ausnahme gemacht, „nur dieses Mal“. Wenn niemand prüft, wird aus der Ausnahme die Regel.
- **Die Aufmerksamkeit lässt nach.** Wer anfangs jeden Pull Request geprüft hat, hat inzwischen andere Aufgaben.

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) fehlt dann die Verankerung, obwohl das Wissen vorhanden ist. Ein Beispiel: Wenn die Entwickler eines Partners die Namenskonventionen kennen, aber weder die Pipeline noch das Review Abweichungen erkennen, ist das Reinforcement zu schwach. Eine weitere allgemeine Schulung hilft Personen nicht, die die Regel bereits kennen. Dann gehört eine automatische Prüfung in den Release-Prozess.

```praxis
In meinem größten Programm mit mehr als 30 Entwicklern in acht Streams und fünf Implementierungspartnern prüfte ich anfangs jeden Pull Request selbst. Das war eine bewusste Kalibrierungsphase. Bis die Standards gelebt wurden, hat es etwa drei Monate gedauert. Danach wurden die Reviews qualifizierten Reviewern in den Streams übertragen; ich übernahm weiterhin die Reviews mit Auswirkungen auf die Architektur. Neue Themen besprachen wir anschließend alle zwei Wochen in einem Center-of-Excellence-Call mit den technischen Leads der Streams. Als der Prozess stabil war, habe ich ihn an einen internen Kollegen übergeben, der ihn seitdem verantwortet.
```

## Jeder Hebel verankert einen anderen Teil der Standards

Zusammen lassen die Hebel wenig Raum für stilles Verwässern:

| Hebel | Was er verankert | Wer |
|---|---|---|
| Automatische Prüfung in der Pipeline | Namen, verbotene Muster, Apex-Tests mit der vereinbarten Abdeckung, Deployment-Validierung an einem vereinbarten Gate | statische Prüfungen bei jedem Pull Request |
| Pull-Request-Review | Design, Verantwortung für Objekte, Passung zur Architektur | Reviewer auf Kundenseite |
| Center-of-Excellence-Call | neue Randfälle, anstehende Änderungen mit Vorlauf | technische Leads der Streams |
| Einarbeitung neuer Entwickler | Kenntnis der geltenden Fassung | Partner, geprüft vom Kunden |
| Vertrag | Standards als Abnahmekriterium | Einkauf, Programmleitung |
| Übergabe an internen Verantwortlichen | Fortbestand nach dem Projekt | Kunde |

Bei Verstößen, die sich wiederholen und objektiv erkennen lassen, ist die Pipeline der günstigste Hebel, weil sie nie müde wird. Eigene Regeln müssen allerdings erst erstellt und anschließend gepflegt werden. Was dort geprüft wird, muss kein Reviewer mehr anmerken. Welche Regeln in die Standards gehören und welche davon sich automatisch prüfen lassen, beschreibe ich in [Salesforce-Entwicklungsstandards für mehrere Partner](../salesforce-entwicklungsstandards-definition-of-done/).

## Der Center-of-Excellence-Call klärt neue Randfälle

Standards sind nie fertig. Neue Fälle tauchen auf, etwa wenn ein Stream ein Feld auf einem Objekt eines anderen Streams benötigt. Ohne festen Ort werden diese Fälle zwischen zwei Entwicklern entschieden, und jeder Partner entscheidet anders. Ein regelmäßiger Call mit den technischen Leads aller Streams, einem klaren Mandat und einem Entscheidungslog schafft dafür einen festen Rahmen. Jede Entscheidung wird eingeordnet: als Änderung der Standards, als Architekturentscheidung oder als einmalige Ausnahme. Änderungen der Standards erhalten eine Version und ein Datum, ab dem sie gelten.

Der Call hat einen zweiten Effekt, der für Reinforcement fast wichtiger ist: Die technischen Leads tragen die Entscheidungen in ihre Teams. Ein neuer Entwickler erfährt eine Regel dann von seinem eigenen Lead, nicht aus einem Dokument des Kunden. Format und Rhythmus beschreibe ich in [Salesforce Center of Excellence: Format und Rhythmus](../salesforce-center-of-excellence-format/).

## Wie arbeiten Sie neue Entwickler eines Partners ein?

Jeder Personalwechsel beim Partner ist ein kleiner Neustart. Ich empfehle eine kurze, feste Einarbeitung, die der Partner verantwortet und der Kunde prüft: die geltenden Standards, die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), der Weg eines Pull Requests durch die Pipeline und die wichtigsten Einträge aus dem Entscheidungslog. Der erste Pull Request eines neuen Entwicklers wird ausführlicher geprüft als üblich, damit Missverständnisse früh auffallen. Meiner Erfahrung nach ist dieser zusätzliche Aufwand gering im Vergleich zu dem Aufwand, dasselbe Missverständnis über mehrere Releases hinweg zu korrigieren. Je häufiger ein Partner Personal austauscht, desto wichtiger wird diese Einarbeitung. Deshalb sollte sie als Pflicht in der Vereinbarung mit dem Partner stehen.

## Ausnahmen unter Termindruck brauchen eine Begründung und ein Ticket

Ausnahmen wird es geben. Entscheidend ist, dass sie sichtbar sind. Eine Ausnahme von den Standards braucht im Pull Request eine Begründung, einen namentlich benannten Genehmiger und ein Ticket mit einem vereinbarten Korrektur- oder Prüfdatum. So bleibt die Ausnahme eine Ausnahme. Häufen sich Ausnahmen bei einer Regel, sollte sie im nächsten Center-of-Excellence-Call besprochen werden: Entweder passt sie nicht, oder der Plan lässt zu wenig Zeit.

## Was gehört in den Vertrag?

Ein Vertrag ersetzt kein Review, aber er macht klar, was gilt. Ich empfehle, im Vertrag mit jedem Partner festzuhalten, welche Fassung der Standards gilt, wo der Kunde sie ablegt, wie Änderungen angekündigt und wie wesentliche Änderungen genehmigt werden, da sie Aufwand und Termine beeinflussen können. Folgen für die Abnahme sollten an klar definierte schwerwiegende Verstöße geknüpft werden, etwa gegen Sicherheit und Datenintegrität oder bei einem fehlgeschlagenen Deployment, nicht an eine fehlende Beschreibung. Das ist keine Rechtsberatung. Stimmen Sie die Formulierung mit Ihrem Vertragsanwalt ab. Für KI-generierten Code gilt dasselbe, siehe [Partner codet mit KI: Was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/).

```hinweis offen
Prüfen Sie, ob Ihre Partnerverträge auf die Standards verweisen, wie Änderungen daran vereinbart werden und welche Verstöße die Abnahme betreffen. Fehlen diese Regelungen, lassen sich Standards nur schwer durchsetzen.
```

## Woran erkennen Sie, dass Standards verankert sind?

Drei messbare Anzeichen zeigen, dass Standards verankert sind. Wiederkehrende Beanstandungen je Pull Request nehmen ab, weil die Pipeline sie früher erkennt. Neue Randfälle werden im Center-of-Excellence-Call besprochen, bevor sie umgesetzt werden und zu Konflikten führen. Und neue Entwickler eines Partners halten die Regeln ein, ohne dass jemand ihnen jede Regel einzeln erklärt. Ausnahmen ohne Datum und Verstöße, die nach einem Release gefunden werden, sind zwei weitere Kennzahlen, die sich zu verfolgen lohnen. In meinem Programm wurden späte Konflikte mit der Zeit selten, weil neue Randfälle angesprochen wurden, bevor sie umgesetzt wurden.

## Wiederkehrende Review-Anmerkungen zählen

Sehen Sie sich die Review-Kommentare der letzten zwei Monate an und zählen Sie, welche Anmerkungen sich wiederholen. Für jede Anmerkung, die sich automatisch prüfen lässt, wird eine Prüfung in der Pipeline ergänzt, mit einer klaren Fehlermeldung, die den Standard nennt. Typische Kandidaten sind fest eingetragene IDs im Code, fehlende Flow-Beschreibungen und projektspezifische Namenskonventionen. Einige davon sind integrierte Regeln des Salesforce Code Analyzer v5, andere benötigen eine eigene Regel in der Pipeline. In beiden Fällen erkennt die Pipeline diese Verstöße, bevor ein Reviewer sie sieht. Für den Rest richten Sie einen festen Call mit den technischen Leads ein. Und planen Sie von Anfang an, wer auf Kundenseite die Standards übernimmt, wenn das Projekt endet. Wie ich das mit mehreren Partnern aufsetze, beschreibe ich unter [Partnersteuerung](../../leistungen/partnersteuerung/).
