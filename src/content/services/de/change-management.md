---
title: "Change Management für Salesforce-Programme"
description: "Change Management für Salesforce-Programme: neue Prozesse, Standards und Releases so einführen, dass Fachbereiche, Teams und Partner sie im Alltag nutzen."
lang: de
slug: change-management
translationKey: service-change
order: 7
lead: "Ein neues Salesforce-Release ist schnell ausgerollt. Ob Fachbereiche, Entwicklerteams und Partner danach anders arbeiten, ist eine andere Frage. Ich plane die Einführung neuer Prozesse und Standards auf Kundenseite so, dass sie im Alltag ankommen und dort bleiben."
situations:
  - "Salesforce ist live, aber Teile der Fachbereiche arbeiten weiter mit Excel, E-Mail und eigenen Listen."
  - "Neue Standards für Entwicklung und Release sind beschlossen, aber jeder Partner und jedes Team legt sie anders aus."
  - "Releases werden kleiner und häufiger, und Fachbereiche erfahren von Änderungen erst, wenn sie schon in Produktion sind."
  - "Das Management erwartet Ergebnisse aus dem Programm, ist aber selten da, wenn Entscheidungen zur Einführung anstehen."
deliverables:
  - "Einführungsplan je Release: welche Gruppen betroffen sind, was sich für sie ändert und wann sie es erfahren"
  - "Format, in dem Fachbereiche, Teams und Partner anstehende Änderungen früh sehen und mitreden können"
  - "Einführung neuer Standards in Etappen, beginnend mit den häufigsten Fällen"
  - "Abstimmung mit dem Management zu Rückhalt, Prioritäten und offenen Entscheidungen"
  - "Rückmeldeweg aus dem Alltag zurück in den Backlog"
results:
  - "Prozesse und Standards, die im Alltag genutzt werden und nicht nur auf dem Papier stehen"
  - "Fachbereiche, die vor einem Release wissen, was sich für sie ändert"
  - "Teams und Partner, die nach denselben Regeln arbeiten"
  - "Weniger Schattenlösungen neben Salesforce"
phases:
  - title: "Betroffene und Änderungen"
    text: "Ich kläre, welche Gruppen ein Release oder ein neuer Standard betrifft und was sich für jede Gruppe im Alltag konkret ändert."
  - title: "Einführung in Etappen"
    text: "Zuerst kommen die häufigsten Fälle. Randfälle folgen Schritt für Schritt, statt alles in einer ersten Version regeln zu wollen."
  - title: "Frühe Abstimmung"
    text: "Anstehende Änderungen kommen mit genug Vorlauf auf den Tisch, in einem festen Format für Fachbereiche, Teams und Partner."
  - title: "Nachsteuern"
    text: "Rückmeldungen aus dem Alltag gehen zurück in den Backlog, und ich prüfe, ob neue Prozesse und Standards tatsächlich genutzt werden."
faq:
  - q: "Wie lange dauert es, neue Standards in einem großen Programm einzuführen?"
    a: "In meinem größten Programm mit über 30 Entwicklern und fünf Implementierungspartnern etwa drei Monate. Die erste Version deckte rund 80 Prozent der Fälle ab, die Randfälle kamen nach und nach dazu."
  - q: "Wer muss beim Change Management mitmachen?"
    a: "Fachbereiche, Entwicklerteams, Partner und das Management. Ohne Rückhalt im Management fehlen Entscheidungen und Aufmerksamkeit, und neue Regeln werden zur Empfehlung, an die sich nicht jeder hält."
  - q: "Was ändert sich durch kleinere, häufigere Releases?"
    a: "Fachbereiche bekommen öfter kleine Änderungen statt selten große Pakete. Das senkt das Risiko einzelner Releases, verlangt aber einen festen Weg, auf dem Betroffene vorher erfahren, was kommt."
blogTags: [Partnersteuerung, Governance, DevOps-Training, Release-Management]
---

Change Management in einem Salesforce-Programm heißt, neue Prozesse, Standards und Releases so einzuführen, dass die Menschen, die damit arbeiten, sie auch nutzen. Das betrifft die Fachbereiche, die mit Salesforce ihren Alltag erledigen, genauso wie Entwicklerteams und Implementierungspartner, die nach gemeinsamen Regeln bauen sollen. Ich übernehme diese Arbeit auf Kundenseite, eng verbunden mit Architektur, Partnersteuerung und Release-Management, weil die meisten Änderungen dort entstehen.

## Warum kommen neue Prozesse im Alltag nicht an?

Ein Release ist technisch in Minuten ausgerollt. Danach entscheidet sich, ob jemand anders arbeitet. Die Gründe, warum das nicht passiert, sind meist dieselben:

- **Betroffene erfahren zu spät davon.** Wer eine Änderung erst in Produktion sieht, sucht sich einen Weg drumherum.
- **Alles soll auf einmal geregelt sein.** Eine erste Version, die jeden Randfall abdecken will, kommt spät und wird selten gelesen.
- **Es fehlt der Rückhalt im Management.** Ohne Entscheidungen von oben bleiben neue Regeln eine Empfehlung.
- **Es gibt keinen Rückweg.** Probleme aus dem Alltag landen in E-Mails und nicht im Backlog.

## Wie habe ich neue Standards in einem großen Programm eingeführt?

In meinem größten Programm arbeiteten über 30 Entwickler in acht Streams mit fünf Implementierungspartnern. Gemeinsame Standards für Namenskonventionen, Automatisierung je Objekt, Testabdeckung und eine [Object Ownership Matrix](../../blog/object-ownership-matrix-salesforce/) brauchten etwa drei Monate, bis sie gelebt wurden.

Die erste Version deckte rund 80 Prozent der Fälle ab. Die Randfälle kamen Schritt für Schritt dazu, wenn sie im Projekt auftauchten. Später brachten wir neue Themen mit Vorlauf in regelmäßigen Center-of-Excellence-Calls auf den Tisch, bevor sie zum Problem wurden. Irgendwann kamen kaum noch neue Randfälle hinzu. Wie die Regeln für mehrere Partner aussehen, beschreibe ich unter [Partnersteuerung](../partnersteuerung/).

## Was ändert sich für Fachbereiche?

Mit einem sauberen Release-Prozess werden Releases kleiner und häufiger. Für Fachbereiche heißt das: öfter kleine Änderungen statt einmal im Quartal ein großes Paket. Damit das funktioniert, brauchen sie einen festen Weg, auf dem sie vorher erfahren, was sich ändert, und einen Weg zurück, auf dem sie melden, was im Alltag nicht passt. Vor jedem Release kläre ich mit den Verantwortlichen im Fachbereich, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert. Das steht im Release-Plan, bevor die Entwicklung fertig ist. Nach dem Release prüfe ich, ob die neuen Abläufe genutzt werden, und hole Rückmeldungen aus dem Alltag in den Backlog. Den Release-Prozess selbst beschreibe ich unter [DevOps und Release-Management](../devops-und-release-management/).

Steht bei Ihnen eine Einführung an oder werden neue Prozesse nicht genutzt, [schreiben Sie mir](#contact) oder lesen Sie mehr [über mich](../../#about).
