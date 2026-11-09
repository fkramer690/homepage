---
title: "Salesforce-Partnersteuerung mit mehreren Dienstleistern"
headline: "Mehrere Salesforce-Partner, eine Verantwortung beim Kunden"
description: "Mehrere Umsetzungspartner auf einer Salesforce-Org? Ein Governance- und Release-Rahmen, klare Verantwortung und Reviews beim Kunden halten es unter Kontrolle."
lang: de
slug: partnersteuerung
translationKey: service-partner-governance
contactBrief: partner-governance
order: 7
lead: "Arbeiten mehrere Umsetzungspartner an einer Salesforce-Org, liefert jeder seinen Teil und niemand verantwortet das Ganze. Ich setze auf Kundenseite einen gemeinsamen Governance- und Release-Rahmen auf und prüfe, was Partner liefern, bevor es teuer wird."
situations:
  - "Mehrere Partner und interne Teams arbeiten an derselben Org, und Änderungen überschreiben sich, weil niemand abstimmt, wer was wann deployt."
  - "Niemand hat festgelegt, welches Team für welche Prozesse, Objekte und Metadaten verantwortlich ist."
  - "Ähnliche Probleme werden sehr unterschiedlich gelöst, je nachdem, welcher Partner sie gebaut hat."
  - "Partnerlieferungen werden ohne technisches Review abgenommen, und Probleme zeigen sich erst in UAT oder Produktion."
  - "Repository, Pipeline oder Backlog liegen bei einem Partner, und Partner lassen sich dadurch schwer vergleichen oder austauschen."
deliverables:
  - "Ich prüfe jede Partnerlieferung im Pull Request, bevor sie in die nächste Umgebung geht."
  - "Ich schreibe die Standards mit den Teams auf, aus dem, was in den Reviews immer wieder auffällt."
  - "Ich kläre Konflikte, wenn zwei Streams dasselbe Objekt ändern wollen."
  - "Ich leite die Center-of-Excellence-Calls, in denen anstehende Änderungen auf den Tisch kommen."
  - "Ich arbeite neue Partner in das dokumentierte Setup ein."
results:
  - "Einen Governance- und Release-Rahmen, der für alle Partner und internen Teams gilt"
  - "Entwicklungs- und Architekturstandards, von Namenskonventionen bis zu Regeln für Automatisierung und Testabdeckung"
  - "Eine Object Ownership Matrix, die jedem Objekt und seinen Metadaten einen verantwortlichen Stream zuordnet"
  - "Repository, Pipeline und Tools im Besitz Ihres Unternehmens"
  - "Einen eingearbeiteten internen Kollegen, der den Prozess nach der Übergabe führt"
phases:
  - title: "Bestandsaufnahme"
    icon: "analyse"
    text: "Ich schaue mir an, wie die Teams heute bauen: Repository, Deployments, Pull Requests, Verantwortlichkeiten und die wichtigsten Konflikte zwischen Streams."
  - title: "Rahmen und Standards"
    icon: "design"
    text: "Gemeinsam mit den Teams schreibe ich Standards, die Object Ownership Matrix und die Review-Regeln auf. Die erste Version deckt die meisten Fälle ab, Randfälle folgen."
  - title: "Reviews und Center of Excellence"
    icon: "team"
    text: "Jede Änderung geht über einen Pull Request mit Review. Regelmäßige Center-of-Excellence-Calls bringen neue Themen früh auf den Tisch, mit genug Vorlauf für alle Streams."
  - title: "Übergabe"
    icon: "handshake"
    text: "Läuft der Prozess, übergebe ich ihn an einen internen Kollegen und arbeite ihn ein, damit der Kunde die Governance langfristig selbst verantwortet."
duration: "Bestandsaufnahme 2 bis 4 Wochen. Die gemeinsamen Standards stehen nach etwa 3 Monaten. Mit Reviews und Center of Excellence bis zur Übergabe an Ihr Team meist 6 bis 12 Monate."
notFit:
  - "Nur ein Partner arbeitet an der Org, und die Zusammenarbeit funktioniert."
  - "Das Unternehmen ist nicht bereit, Regeln gegenüber Partnern auch durchzusetzen."
alternatives: "Ein interner Plattform-Owner mit technischem Hintergrund kann das langfristig selbst, wenn es ihn gibt. Einen Generalunternehmer zu beauftragen, der die anderen Partner steuert, funktioniert nur, solange seine Interessen und Ihre gleich sind."
faq:
  - q: "Was ist Salesforce-Partnersteuerung?"
    a: "Die Regeln, Rollen und Reviews, mit denen mehrere Umsetzungspartner auf gleiche Weise an einer Salesforce-Org arbeiten: gemeinsame Standards, klare Verantwortung für Objekte und Metadaten, ein Release-Prozess und ein technisches Review jeder Lieferung."
  - q: "Wie lange dauert es, Standards über mehrere Partner zu etablieren?"
    a: "In meinem größten Programm etwa drei Monate. Schon die erste Fassung regelte rund 80 Prozent der Fälle. Den Rest haben wir nach und nach ergänzt, bis neue Themen in Center-of-Excellence-Calls auf den Tisch kamen, bevor sie Konflikte auslösten."
  - q: "Warum sollte der Kunde und nicht ein Partner die Governance verantworten?"
    a: "Legt ein Partner die Regeln fest, entscheidet er, wie alle anderen bauen, auch seine Wettbewerber. Liegen Standards, Repository und Freigaben beim Kunden, bleiben Partner vergleichbar und austauschbar."
  - q: "Was ist eine Object Ownership Matrix?"
    a: "Eine Tabelle mit einer Zeile pro Salesforce-Objekt, die einen verantwortlichen Stream benennt. Alle anderen Teams stimmen Änderungen an diesem Objekt vorher mit ihm ab."
  - q: "Ersetzen Sie unseren Umsetzungspartner?"
    a: "Nein. Ihre Partner bauen weiter, ich steuere sie auf Kundenseite nach gemeinsamen Regeln. Wenn Sie einen Partner ablösen wollen, helfe ich dabei, ohne Wissensverlust und ohne Verzögerung im Programm."
  - q: "Wie vermeiden Sie, dass Sie zum Engpass werden?"
    a: "Ich arbeite transparent. Entscheidungen, Standards und Review-Kriterien sind so dokumentiert, dass Ihr Team und Ihre Partner sie sehen, damit niemand auf mich warten muss und die Arbeit nicht an mir hängt."
blogTags: [partner governance, partnersteuerung, pull request review, vendor lock-in, code quality, codequalität]
readMore: [choose-salesforce-implementation-partner, object-ownership-matrix, development-standards-definition-of-done, sandbox-strategy-multiple-partners, salesforce-center-of-excellence, fixed-price-ai-salesforce-partners, ai-org-assessment-technical-debt, salesforce-freelancer-or-consultancy]
masterclass: devops
---

Partnersteuerung auf Kundenseite hält ein Salesforce-Programm mit mehreren Umsetzungspartnern unter Kontrolle. Dazu gehören gemeinsame Standards, klare Verantwortung für jedes Objekt und jeden Prozess, ein Release-Prozess und jemand, der jede Lieferung technisch prüft, bevor sie weitergeht. Ohne das optimiert jeder Partner seinen eigenen Bereich, und der Kunde bezahlt die Konflikte dazwischen. Diese Rolle übernehme ich als unabhängiger Architekt, ohne Bindung an Hersteller oder Partner.

```partnerfluss architekt
ohne: Ohne Verantwortung beim Kunden | Jeder Partner liefert seinen Teil, Konflikte zeigen sich erst in der Org.
mit: Mit Architekt auf Kundenseite | Jede Lieferung läuft über Standards und Review, in der Org kommt ein geprüfter Strom an.
```

## Über 30 Entwickler, fünf Partner und eine Org

```kennzahlen
30+ | Entwickler in acht Streams
5 | Umsetzungspartner plus interne Teams
3 | Monate, bis die Standards stabil waren
80 % | der Fälle deckte die erste Version ab
quelle: mein größtes Programm als Architekt auf Kundenseite
```

Am Anfang dieses Programms gab es keine Zuständigkeiten pro Objekt. Teams überschrieben gegenseitig ihre Änderungen, und jedes baute nach eigenen Regeln.

Der erste Schritt: Jede Änderung kam als Pull Request mit Review in die Org, und eine Zeit lang habe ich alle selbst geprüft. Was in diesen Reviews immer wieder auffiel, wurde zum Standard, etwa Namenskonventionen, ein Einstiegspunkt für Automatisierung pro Objekt und Kontext und Regeln zur Testabdeckung. Am meisten bewirkt haben zwei Hebel:

```hebel
Object Ownership Matrix | Ein verantwortlicher Stream pro Objekt
  Will ein Team ein Objekt eines anderen Streams ändern, spricht es vorher mit dem Verantwortlichen.
Konfigurationsregeln | Keine festen Werte im Code
  Schwellenwerte und Schalter liegen in Custom Metadata Types, Texte in Custom Labels.
```

Aufbau und Beispiel der Matrix stehen in [Object Ownership Matrix: Wer ändert welches Objekt?](../../blog/object-ownership-matrix-salesforce/).

Nach der ersten Version kamen in den folgenden Wochen neue Randfälle hinzu. Wir haben sie in regelmäßigen [Center-of-Excellence-Calls](../../blog/salesforce-center-of-excellence-format/) besprochen, in denen anstehende Änderungen mit genug Vorlauf für alle Streams auf den Tisch kamen. Irgendwann fielen die Randfälle weg, weil Themen besprochen wurden, bevor sie zu Konflikten wurden. Als der Prozess rund lief, habe ich ihn an einen internen Kollegen übergeben, der ihn seitdem verantwortet.

## Regeln und Werkzeuge gehören dem Kunden

Auch ein Partner kann gute Standards schreiben. Legt er die Regeln fest, entscheidet er aber, wie alle anderen bauen, auch seine Wettbewerber. Liegen dazu Repository, Pipeline und Tools wie Jira oder Miro bei ihm, wird jeder Partnerwechsel teuer.

Gehören Standards, Freigaberechte und Tools dem Kunden, startet ein neuer Partner mit denselben Regeln, Tools und Rechten wie alle anderen, und ein Partner, der geht, übergibt offene Arbeit und Wissen, während Repository, Pipeline und Standards bleiben, wo sie sind. Angebote lassen sich dann fair vergleichen, weil alle unter denselben Bedingungen liefern. Mehr dazu in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/). Was Sie schon bei der Auswahl eines Partners dazu fragen sollten, steht in [Salesforce-Implementierungspartner auswählen](../../blog/salesforce-implementierungspartner-auswaehlen/).

## Wie passen Reviews hinein, ohne das Programm auszubremsen?

Reviews machen aus schriftlichen Standards tägliche Praxis. Sie bremsen nicht, wenn die Pull Requests klein sind, die Pipeline alles Wiederholbare prüft und jeder weiß, bis wann das Review kommt:

```stufen
1 | Kleine Pull Requests | Partner-Teams | Jede Änderung ist klein genug für ein schnelles Review.
2 | Automatische Prüfungen | Pipeline | Was sich wiederholt, prüft die Pipeline.
3 | Feste Reaktionszeiten | Review beim Kunden | Jeder weiß, bis wann das Review kommt.
```

Die Details beschreibe ich in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../../blog/warum-pull-request-reviews-pflicht-sind/). Die Pipeline, auf der diese Prüfungen laufen, baue ich unter [DevOps und Release-Management](../devops-und-release-management/) auf; ohne einen gemeinsamen Release-Prozess hält kein Governance-Rahmen.
