---
title: "Salesforce-Partnersteuerung mit mehreren Dienstleistern"
description: "Mehrere Umsetzungspartner auf einer Salesforce-Org? Ein Governance- und Release-Rahmen, klare Verantwortung und Reviews beim Kunden halten es unter Kontrolle."
lang: de
slug: partnersteuerung
translationKey: service-partner-governance
order: 2
lead: "Arbeiten mehrere Umsetzungspartner an einer Salesforce-Org, liefert jeder seinen Teil und niemand verantwortet das Ganze. Ich setze auf Kundenseite einen gemeinsamen Governance- und Release-Rahmen auf und prüfe, was Partner liefern, bevor es teuer wird."
situations:
  - "Mehrere Partner und interne Teams arbeiten an derselben Org, und Änderungen überschreiben sich, weil niemand abstimmt, wer was wann deployt."
  - "Niemand hat festgelegt, welches Team für welche Prozesse, Objekte und Metadaten verantwortlich ist."
  - "Ähnliche Probleme werden sehr unterschiedlich gelöst, je nachdem, welcher Partner sie gebaut hat."
  - "Partnerlieferungen werden ohne technisches Review abgenommen, und Probleme zeigen sich erst in UAT oder Produktion."
  - "Repository, Pipeline oder Backlog liegen bei einem Partner, und Partner lassen sich dadurch schwer vergleichen oder austauschen."
deliverables:
  - "Governance- und Release-Rahmen, der für alle Partner und internen Teams gilt"
  - "Entwicklungs- und Architekturstandards, von Namenskonventionen bis zu Regeln für Automatisierung und Testabdeckung"
  - "Object Ownership Matrix: welcher Stream für welches Objekt und seine Metadaten verantwortlich ist"
  - "Pull-Request-Reviews auf Kundenseite, inklusive technischer Prüfung von Partnerlieferungen"
  - "Center-of-Excellence-Format, um Standards und anstehende Änderungen streamübergreifend abzustimmen"
  - "Einarbeitung neuer Partner in ein dokumentiertes Setup"
  - "Übergabe des Prozesses an einen internen Kollegen"
results:
  - "Schriftliche Standards, denen jeder Partner folgt und die Reviews durchsetzen"
  - "Klare Verantwortung für Prozesse, Objekte und Metadaten über alle Streams"
  - "Vergleichbare Partner, weil alle nach denselben Regeln arbeiten"
  - "Repository, Pipeline und Tools im Besitz des Kunden und nicht eines Partners"
  - "Ein interner Verantwortlicher, der den Prozess nach der Übergabe führt"
phases:
  - title: "Bestandsaufnahme"
    text: "Ich schaue mir an, wie die Teams heute tatsächlich bauen: Repository, Deployments, Pull Requests, Verantwortlichkeiten und die wichtigsten Konflikte zwischen Streams."
  - title: "Rahmen und Standards"
    text: "Gemeinsam mit den Teams schreibe ich Standards, die Object Ownership Matrix und die Review-Regeln auf. Die erste Version deckt die meisten Fälle ab, Randfälle folgen."
  - title: "Reviews und Center of Excellence"
    text: "Jede Änderung geht über einen Pull Request mit Review. Regelmäßige Center-of-Excellence-Calls bringen neue Themen früh auf den Tisch, mit genug Vorlauf für alle Streams."
  - title: "Übergabe"
    text: "Läuft der Prozess, übergebe ich ihn an einen internen Kollegen und arbeite ihn ein, damit der Kunde die Governance langfristig selbst verantwortet."
faq:
  - q: "Was ist Salesforce-Partnersteuerung?"
    a: "Die Regeln, Rollen und Reviews, mit denen mehrere Umsetzungspartner auf gleiche Weise an einer Salesforce-Org arbeiten: gemeinsame Standards, klare Verantwortung für Objekte und Metadaten, ein Release-Prozess und ein technisches Review jeder Lieferung."
  - q: "Wie lange dauert es, Standards über mehrere Partner zu etablieren?"
    a: "In meinem größten Programm etwa drei Monate. Die erste Version deckte rund 80 Prozent der Fälle ab, die restlichen Randfälle kamen Schritt für Schritt dazu, bis neue Themen früh in Center-of-Excellence-Calls angesprochen wurden."
  - q: "Warum sollte der Kunde und nicht ein Partner die Governance verantworten?"
    a: "Legt ein Partner die Regeln fest, entscheidet er, wie alle anderen bauen, auch seine Wettbewerber. Liegen Standards, Repository und Freigaben beim Kunden, bleiben Partner vergleichbar und austauschbar."
  - q: "Was ist eine Object Ownership Matrix?"
    a: "Eine einfache Tabelle, die festlegt, welcher Stream oder welches Team für jedes Salesforce-Objekt und seine Metadaten verantwortlich ist. Sie verhindert, dass zwei Teams dasselbe Objekt ohne Abstimmung ändern."
blogTags: [partner governance, partnersteuerung, pull request review, vendor lock-in, code quality, codequalität]
---

Partnersteuerung auf Kundenseite hält ein Salesforce-Programm mit mehreren Umsetzungspartnern unter Kontrolle. Dazu gehören gemeinsame Standards, klare Verantwortung für jedes Objekt und jeden Prozess, ein Release-Prozess und jemand, der jede Lieferung technisch prüft, bevor sie weitergeht. Ohne das optimiert jeder Partner seinen eigenen Bereich, und der Kunde bezahlt die Konflikte dazwischen. Diese Rolle übernehme ich als unabhängiger Architekt, ohne Bindung an Hersteller oder Partner.

## Wie sieht das in einem echten Programm aus?

Das größte Programm, das ich gesteuert habe, hatte mehr als 30 Entwickler in acht Streams, geliefert von fünf Umsetzungspartnern und internen Teams. Zu Beginn hatte niemand klar festgelegt, wer für welche Prozesse, Objekte und Metadaten im Lead war. Änderungen überschrieben sich, und die technischen Ansätze der Teams lagen weit auseinander.

Der erste Schritt war einfach und wirksam: Jede Änderung ging über einen Pull Request mit Review, und eine Zeit lang lief jeder einzelne über meinen Schreibtisch. Aus diesen Reviews haben wir Standards aufgeschrieben. Sie deckten die üblichen Themen ab, etwa Namenskonventionen, eine Automatisierung pro Objekt und Kontext und Testabdeckung. Zwei Elemente haben den größten Unterschied gemacht:

- **Eine Object Ownership Matrix**, die festlegte, welcher Stream für welches Objekt verantwortlich war. Bevor ein Team ein fremdes Objekt änderte, musste es sich mit dem Verantwortlichen abstimmen.
- **Regeln für Konfiguration**, zum Beispiel welche Werte in Custom Metadata Types oder Custom Labels gehören, statt fest im Code zu stehen.

![Vereinfachtes Beispiel einer Object Ownership Matrix: Der Stream Vertrieb verantwortet Account, Opportunity und Quote, der Stream Service verantwortet Case und Asset, der Stream Field Service verantwortet Work Order. Jeder andere Stream stimmt sich mit dem Verantwortlichen ab, bevor er eines dieser Objekte ändert.](../../../assets/blog/object-ownership-matrix-de.png)

Bis die Standards stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte rund 80 Prozent der Fälle ab. In den Wochen danach kamen neue Randfälle hinzu. Wir haben sie in regelmäßigen Center-of-Excellence-Calls besprochen, in denen anstehende Änderungen mit genug Vorlauf für alle Streams auf den Tisch kamen. Irgendwann fielen die Randfälle ganz weg, weil Themen besprochen wurden, bevor sie zu Konflikten wurden. Als der Prozess rund lief, habe ich ihn an einen internen Kollegen übergeben, der ihn seitdem verantwortet.

## Warum gehört die Governance auf die Kundenseite?

Auch ein Partner kann gute Standards schreiben. Besitzt aber ein Partner die Regeln, entscheidet er auch, wie alle anderen Partner bauen, auch seine Wettbewerber. Dasselbe gilt für Repository, Pipeline und Tools wie Jira oder Miro. Mehr dazu in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

Liegen Standards, Freigaberechte und Tools beim Kunden, werden Partner vergleichbar. Ein neuer Partner lässt sich in ein dokumentiertes Setup einarbeiten, und ein scheidender Partner gibt nichts weiter ab als seine Benutzer. Das ist auch die Grundlage für einen fairen Vergleich von Angeboten und für ehrliche Gespräche über Qualität.

## Wie passen Reviews hinein, ohne das Programm auszubremsen?

Reviews sind das Werkzeug, das aus schriftlichen Standards tägliche Praxis macht. Sie funktionieren, wenn Pull Requests klein sind, Reaktionszeiten vereinbart sind und die wiederholbaren Prüfungen in der Pipeline automatisiert laufen. Die Details beschreibe ich in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../../blog/warum-pull-request-reviews-pflicht-sind/).

Partnersteuerung funktioniert am besten zusammen mit einem soliden Release-Prozess, deshalb geht sie meist Hand in Hand mit [DevOps und Release-Management](../devops-und-release-management/). Wenn in Ihrem Programm mehrere Partner an einer Org arbeiten und Sie eine zweite Meinung möchten, [schreiben Sie mir](#contact) oder lesen Sie mehr [über mich](../../#about).
