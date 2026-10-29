---
title: "Change Management für Salesforce-Programme"
headline: "Salesforce ist live, aber kaum jemand nutzt es?"
description: "Change Management für Salesforce-Programme nach Prosci und ADKAR: neue Prozesse und Releases so einführen, dass Fachbereiche und Partner sie nutzen."
lang: de
slug: change-management
translationKey: service-change
contactBrief: change
order: 7
note: "Dieses Vorgehen habe ich gemeinsam mit Juliane Winterscheid erarbeitet, meiner Kooperationspartnerin für Change Management. Juliane ist Prosci-zertifiziert."
notePartner: "Juliane Winterscheid"
lead: "Ein neues Salesforce-Release ist schnell ausgerollt. Ob Fachbereiche, Entwicklerteams und Partner danach anders arbeiten, ist eine andere Frage. Ich plane die Einführung neuer Prozesse und Standards auf Kundenseite nach dem Vorgehen von Prosci, damit sie im Alltag ankommen und dort bleiben."
situations:
  - "Salesforce ist live, aber Teile der Fachbereiche arbeiten weiter mit Excel, E-Mail und eigenen Listen."
  - "Schulungen sind gelaufen, die Nutzung bleibt trotzdem niedrig, und niemand weiß genau, woran es hängt."
  - "Neue Standards für Entwicklung und Release sind beschlossen, aber jeder Partner und jedes Team legt sie anders aus."
  - "Releases werden kleiner und häufiger, und Fachbereiche erfahren von Änderungen erst, wenn sie schon in Produktion sind."
  - "Das Management erwartet Ergebnisse aus dem Programm, ist aber selten da, wenn Entscheidungen zur Einführung anstehen."
deliverables:
  - "Festlegung, woran Sie Erfolg messen, zum Beispiel an Nutzungszahlen in Salesforce statt an der Zahl der Schulungen"
  - "Einführungsplan je Release: welche Gruppen betroffen sind, was sich für sie ändert und wann sie es erfahren"
  - "Einschätzung je betroffener Gruppe nach dem ADKAR-Modell: an welcher der fünf Stufen die Einführung hängt"
  - "Sponsor-Plan: was das Management wann sichtbar tut, damit neue Regeln verbindlich werden"
  - "Format, in dem Fachbereiche, Teams und Partner anstehende Änderungen früh sehen und mitreden können"
  - "Einführung neuer Standards in Etappen, beginnend mit den häufigsten Fällen"
  - "Rückmeldeweg aus dem Alltag zurück in den Backlog und Übergabe an interne Verantwortliche"
results:
  - "Prozesse und Standards, die im Alltag genutzt werden und nicht nur auf dem Papier stehen"
  - "Fachbereiche, die vor einem Release wissen, was sich für sie ändert"
  - "Ein Management, das sichtbar hinter der Einführung steht"
  - "Teams und Partner, die nach denselben Regeln arbeiten"
  - "Weniger Schattenlösungen neben Salesforce"
phases:
  - title: "Vorgehen vorbereiten"
    text: "Wir legen fest, woran Erfolg gemessen wird, welche Gruppen betroffen sind und was sich für jede im Alltag ändert. Dazu gehören die Risiken und wer im Management die Einführung trägt."
  - title: "Veränderung steuern"
    text: "Je Gruppe entsteht ein Plan entlang der ADKAR-Stufen, verknüpft mit dem Release-Plan. Die häufigsten Fälle kommen zuerst. Wir messen die Nutzung in Salesforce und steuern nach, wo sie hängt."
  - title: "Ergebnisse sichern"
    text: "Wir prüfen, wo Lücken bleiben, verankern neue Regeln in Pipeline, Berichten und Center-of-Excellence-Calls und übergeben die Verantwortung an interne Owner."
faq:
  - q: "Warum orientieren Sie sich an Prosci?"
    a: "Weil Prosci für mich der Goldstandard im Change Management ist. Das Vorgehen beruht auf Befragungen seit 1998 mit über 10.000 Teilnehmenden und ist in der Branche weit verbreitet. Es gibt dem Teil eines Salesforce-Programms eine Struktur, der sonst oft dem Zufall überlassen bleibt: ob die Menschen anders arbeiten."
  - q: "Was ist das ADKAR-Modell?"
    a: "Ein Modell von Prosci mit fünf Stufen, die jede Person bei einer Veränderung durchläuft: Awareness (Bewusstsein), Desire (Bereitschaft), Knowledge (Wissen), Ability (Fähigkeit) und Reinforcement (Verankerung). Hakt eine Einführung, fehlt meist eine dieser Stufen. Das Modell zeigt, welche."
  - q: "Wie lange dauert es, neue Standards in einem großen Programm einzuführen?"
    a: "In meinem größten Programm mit über 30 Entwicklern und fünf Implementierungspartnern etwa drei Monate. Die erste Version deckte rund 80 Prozent der Fälle ab, die Randfälle kamen nach und nach dazu."
  - q: "Wer muss beim Change Management mitmachen?"
    a: "Fachbereiche, Entwicklerteams, Partner und das Management. Ohne Rückhalt im Management fehlen Entscheidungen und Aufmerksamkeit, und neue Regeln werden zur Empfehlung, an die sich nicht jeder hält."
  - q: "Was ändert sich durch kleinere, häufigere Releases?"
    a: "Fachbereiche bekommen öfter kleine Änderungen statt selten große Pakete. Das senkt das Risiko einzelner Releases, verlangt aber einen festen Weg, auf dem Betroffene vorher erfahren, was kommt."
blogTags: [Partnersteuerung, Governance, DevOps-Training, Release-Management]
---

Change Management in einem Salesforce-Programm heißt, neue Prozesse, Standards und Releases so einzuführen, dass die Menschen, die damit arbeiten, sie auch nutzen. Das betrifft die Fachbereiche, die mit Salesforce ihren Alltag erledigen, genauso wie Entwicklerteams und Implementierungspartner, die nach gemeinsamen Regeln bauen sollen. Ich übernehme diese Arbeit auf Kundenseite, eng verbunden mit Architektur, Partnersteuerung und Release-Management, und orientiere mich dabei an Prosci.

## Warum kommen neue Prozesse im Alltag nicht an?

Ein Release ist technisch in Minuten ausgerollt. Danach entscheidet sich, ob jemand anders arbeitet. Die Gründe, warum das nicht passiert, sind meist dieselben:

- **Betroffene erfahren zu spät davon.** Wer eine Änderung erst in Produktion sieht, sucht sich einen Weg drumherum.
- **Alles soll auf einmal geregelt sein.** Eine erste Version, die jeden Randfall abdecken will, kommt spät und wird selten gelesen.
- **Es fehlt der Rückhalt im Management.** Ohne Entscheidungen von oben bleiben neue Regeln eine Empfehlung.
- **Es gibt keinen Rückweg.** Probleme aus dem Alltag landen in E-Mails und nicht im Backlog.

## Warum Prosci?

Prosci ist für mich der Goldstandard im Change Management. Der Grund ist die Forschung dahinter: Prosci befragt seit 1998 Projekte nach ihren Erfahrungen mit Veränderungen. In der 12. Ausgabe der Studie [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) mit 2.668 Teilnehmenden erreichten Projekte mit sehr gutem Change Management ihre Ziele siebenmal so oft wie Projekte mit schlechtem, 88 gegenüber 13 Prozent. Als wichtigsten Erfolgsfaktor nennen die Teilnehmenden aktives und sichtbares Sponsoring durch das Management. Das deckt sich mit dem, was ich in Salesforce-Programmen erlebe.

Zusammen mit Juliane Winterscheid, die Prosci-zertifiziert ist, habe ich zwei Bausteine von Prosci auf Salesforce-Programme übertragen:

- **Das [ADKAR-Modell](https://www.prosci.com/blog/adkar-model)** beschreibt fünf Stufen, die jede Person bei einer Veränderung durchläuft: Awareness (Bewusstsein, warum sich etwas ändert), Desire (Bereitschaft, mitzumachen), Knowledge (Wissen, wie es geht), Ability (Fähigkeit, es im Alltag umzusetzen) und Reinforcement (Verankerung, damit niemand zurückfällt).
- **Der [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process)** gibt der Einführung auf Ebene der Organisation einen Rahmen: Vorgehen vorbereiten (Prepare Approach), Veränderung steuern (Manage Change) und Ergebnisse sichern (Sustain Outcomes). Die drei Schritte oben auf dieser Seite folgen diesen Phasen.

## Wie sieht ADKAR in einem Salesforce-Programm aus?

Ein häufiges Bild: Die Schulungen sind gelaufen, die Nutzung bleibt trotzdem niedrig. Statt eine weitere Schulung anzusetzen, fragen wir je betroffener Gruppe, an welcher Stufe es hängt. Wenn ein Vertriebsteam nicht weiß, wofür die gepflegten Opportunities gebraucht werden, fehlt Awareness, und das muss der zuständige Vertriebsleiter erklären, nicht der Trainer. Wenn die Entwickler eines Partners die Namenskonventionen kennen, aber niemand sie in der Pipeline prüft, fehlt Reinforcement. Dann gehört eine automatische Prüfung in den [Release-Prozess](../devops-und-release-management/).

Salesforce hilft beim Messen. Ob ein neuer Prozess genutzt wird, zeigen Berichte über angelegte und gepflegte Datensätze besser als jede Umfrage. Diese Zahlen legen wir in der ersten Phase fest und schauen in der zweiten regelmäßig darauf.

## Wie habe ich neue Standards in einem großen Programm eingeführt?

In meinem größten Programm arbeiteten über 30 Entwickler in acht Streams mit fünf Implementierungspartnern. Gemeinsame Standards für Namenskonventionen, Automatisierung je Objekt, Testabdeckung und eine [Object Ownership Matrix](../../blog/object-ownership-matrix-salesforce/) brauchten etwa drei Monate, bis sie gelebt wurden.

Die erste Version deckte rund 80 Prozent der Fälle ab. Die Randfälle kamen Schritt für Schritt dazu, wenn sie im Projekt auftauchten. Später brachten wir neue Themen mit Vorlauf in regelmäßigen [Center-of-Excellence-Calls](../../blog/salesforce-center-of-excellence-format/) auf den Tisch, bevor sie zum Problem wurden. Irgendwann kamen kaum noch neue Randfälle hinzu. Wie die Regeln für mehrere Partner aussehen, beschreibe ich unter [Partnersteuerung](../partnersteuerung/).

## Was ändert sich für Fachbereiche?

Mit einem sauberen Release-Prozess werden Releases kleiner und häufiger. Für Fachbereiche heißt das: öfter kleine Änderungen statt einmal im Quartal ein großes Paket. Damit das funktioniert, brauchen sie einen festen Weg, auf dem sie vorher erfahren, was sich ändert, und einen Rückweg, auf dem sie melden, was im Alltag nicht passt. Vor jedem Release kläre ich mit den Verantwortlichen im Fachbereich, welche Teams betroffen sind, was sich in ihren Abläufen ändert und wer sie informiert. Das steht im Release-Plan, bevor die Entwicklung fertig ist. Nach dem Release prüfe ich, ob die neuen Prozesse genutzt werden, und bringe Rückmeldungen aus dem Alltag in den Backlog.

Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Die Prosci-Zertifizierung hat Juliane Winterscheid, nicht FK Solution Design, und FK Solution Design ist kein Partner von Prosci. Diese Seite beschreibt, wie wir Elemente des Vorgehens in Salesforce-Programmen anwenden.

Wenn eine Einführung ansteht oder neue Prozesse nicht genutzt werden, [schreiben Sie mir](#contact) oder lesen Sie mehr [über mich](../../#about).
