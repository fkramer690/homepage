---
title: "Warum Pull-Request-Reviews in Großprojekten Pflicht sind"
description: "Arbeiten mehrere Partner an einer Salesforce-Org, ist das Pull-Request-Review die günstigste Qualitätskontrolle. Was es prüfen sollte und wie Sie starten."
pubDate: 2026-10-23
lang: de
slug: warum-pull-request-reviews-pflicht-sind
translationKey: pull-request-reviews-enterprise
topic: code-review
category: devops
tags: [Pull Request Review, DevOps, Partnersteuerung, Codequalität]
takeaways:
  - "Ein Pull-Request-Review ist der letzte Punkt, an dem eine Änderung günstig gestoppt werden kann, bevor sie gemeinsame Umgebungen, Anwender und andere Teams erreicht."
  - "In Salesforce-Großprojekten halten Reviews mehrere Partner auf einem gemeinsamen Standard und verhindern, dass Teams sich gegenseitig Änderungen überschreiben."
  - "Ein gutes Review prüft Architektur, Datenmodell, Sicherheit, Automatisierung und Tests, nicht nur den Codestil."
  - "Automatische Prüfungen übernehmen den wiederholbaren Teil, damit sich Reviewer auf Designentscheidungen und Seiteneffekte konzentrieren können."
  - "Der Review-Prozess gehört auf die Kundenseite, mit klaren Regeln, kleinen Pull Requests und vereinbarten Reaktionszeiten."
faq:
  - q: "Was ist ein Pull-Request-Review?"
    a: "Bei einem Pull-Request-Review prüft eine zweite Person eine Änderung, bevor sie in einen gemeinsamen Branch übernommen und weiter deployt wird. Nur freigegebene Änderungen mit grüner Pipeline gehen weiter."
  - q: "Bremsen Pull-Request-Reviews Salesforce-Projekte aus?"
    a: "Nicht, wenn Pull Requests klein sind und Reaktionszeiten vereinbart sind. Ein Review dauert Minuten, die Korrektur einer ungeprüften Änderung in UAT oder Produktion oft Tage und betrifft mehrere Teams."
  - q: "Wer sollte in Projekten mit mehreren Partnern reviewen?"
    a: "Die Kundenseite sollte die Review-Regeln verantworten und architekturrelevante Änderungen freigeben. Partner können sich gegenseitig reviewen, das letzte Wort über Standards sollte aber nicht bei einem Umsetzungspartner liegen."
  - q: "Lassen sich auch Low-Code-Änderungen wie Flows reviewen?"
    a: "Ja. Flows, Page Layouts, Permission Sets und Felder sind Metadaten im Repository und erscheinen im Pull Request wie Code. Reviewer prüfen sie auf Benennung, Logik, Performance und Sicherheit."
---

Ein Pull-Request-Review ist in Großprojekten Pflicht, weil es der letzte Punkt ist, an dem eine Änderung günstig gestoppt werden kann. Bevor eine Änderung übernommen wird, prüft eine zweite Person, ob sie zur Architektur passt, den vereinbarten Standards folgt und nicht die Arbeit eines anderen Teams kaputt macht. In einem Salesforce-Programm mit mehreren Partnern und internen Teams auf einer Org verhindert dieser eine Schritt mehr Produktionsfehler als jede spätere Testphase. Und er hält die Teams auf Linie, ganz ohne zusätzliches Meeting.

## Was ist ein Pull-Request-Review?

Ein Pull Request ist die Anfrage, eine Reihe von Änderungen aus einem Branch in einen anderen zu übernehmen, zum Beispiel aus einem Feature-Branch in den Integrations-Branch. Beim Pull-Request-Review sieht sich mindestens eine weitere Person diese Änderungen an und gibt sie frei, bevor sie übernommen werden. In einem sauberen [Salesforce-DevOps-Setup](../warum-devops-salesforce-enterprise-projekte/) läuft bei jedem Pull Request zusätzlich die Pipeline mit Validierungsdeployment, Apex-Tests und statischer Codeanalyse. Erst wenn das Review freigegeben und die Pipeline grün ist, geht die Änderung weiter.

Das gilt auch für Low-Code. Flows, Page Layouts, Permission Sets und eigene Felder sind Metadaten im Repository. Sie tauchen im Pull Request auf wie jede andere Datei.

## Warum brauchen Großprojekte Reviews mehr als eine kleine Org?

In einer kleinen Org mit einem Admin kennt dieser Admin jede Änderung. In einem Enterprise-Programm ist dieses Wissen auf viele Köpfe verteilt. Ich habe in Programmen mit bis zu acht Projektteams und mehr als 30 Entwicklern auf einer Plattform gearbeitet. Ohne Reviews tauchen dort immer wieder dieselben Probleme auf:

- **Teams überschreiben sich gegenseitig.** Ein Team ändert eine Validierungsregel, ein anderes deployt einen Tag später eine ältere Version desselben Objekts.
- **Technische Ansätze driften auseinander.** Ein Partner baut Logik in Apex, ein anderer in Flows, ein dritter in einem Managed Package. Ähnliche Probleme werden völlig unterschiedlich gelöst.
- **Versteckte Seiteneffekte.** Ein neuer Trigger oder Flow feuert auf einem Objekt, das ein anderes Team ebenfalls automatisiert, und das Speichern von Datensätzen schlägt fehl oder wird langsam.
- **Sicherheitslücken.** Berechtigungen werden zu großzügig vergeben, weil es schneller geht, und niemand merkt es bis zum nächsten Audit.
- **Wissen bleibt in einem Kopf.** Hat nur der Autor eine Änderung je gesehen, hängt das Programm an dieser Person.

All das ist im Pull Request günstig zu beheben und später teuer. Hat eine Änderung erst einmal UAT erreicht, haben andere Teams darauf aufgebaut, Tester Fehler dagegen erfasst und Fachanwender sie gesehen.

## Was sollte ein gutes Review prüfen?

Ein Review ist keine Stilprüfung. Formatierung, Benennung und bekannte Anti-Patterns kann eine Maschine schneller und zuverlässiger prüfen. Der menschliche Reviewer sollte sich auf das konzentrieren, was Werkzeuge nicht beurteilen können. In meinen Reviews achte ich auf diese Punkte:

1. **Passung zur Architektur.** Folgt die Änderung den vereinbarten Mustern? Ist sie an der richtigen Stelle gebaut, etwa Konfiguration vor Code, eine Automatisierung pro Objekt und Kontext?
2. **Datenmodell.** Werden neue Felder und Objekte wirklich gebraucht, sind sie einheitlich benannt und passen sie zu den Anforderungen an Reporting und Schnittstellen?
3. **Automatisierung und Seiteneffekte.** Welche Flows, Trigger und Validierungsregeln laufen bereits auf diesem Objekt? Was passiert bei Massendatenladungen oder Schnittstellen?
4. **Sicherheit und Zugriff.** Werden Rechte über Permission Sets vergeben, so eng wie möglich? Beachtet der Apex-Code die Freigaberegeln?
5. **Tests und Qualität.** Decken die Tests die fachliche Logik ab, auch Fehlerfälle, oder heben sie nur die Testabdeckung über 75 Prozent?
6. **Nachvollziehbarkeit.** Verweist der Pull Request auf die User Story, und erklärt die Beschreibung, warum die Änderung gemacht wurde, nicht nur was?

Den wiederholbaren Teil sollten Sie automatisieren: statische Codeanalyse, Namenskonventionen, API-Versionen und das Validierungsdeployment. Ein Reviewer, der fehlende Beschreibungen oder falsche Einrückungen anmerken muss, hat weniger Aufmerksamkeit für die Fragen, die wirklich zählen.

![Pull-Request-Review in vier Schritten: eine User Story pro Pull Request; die Pipeline prüft automatisch Validierungsdeployment, Apex-Tests, statische Codeanalyse, Namenskonventionen und API-Versionen; ein menschlicher Reviewer prüft Passung zur Architektur, Datenmodell, Automatisierung und Seiteneffekte, Sicherheit und Zugriff, Tests und Qualität sowie Nachvollziehbarkeit; gemergt wird nur mit Freigabe und grüner Pipeline. Die Maschine prüft den wiederholbaren Teil, der Mensch, was Werkzeuge nicht beurteilen können.](../../../assets/blog/pull-request-review-split-de.png)

## Was haben Reviews in einem echten Programm verändert?

In einem Programm, zu dem ich dazukam, arbeiteten mehrere Umsetzungspartner und interne Teams an derselben Salesforce-Org. Niemand hatte klar festgelegt, wer für welche Prozesse, Objekte und Metadaten im Lead war. Änderungen überschrieben sich, weil niemand abstimmte, wer was wann deployt, und die technischen Ansätze der Teams lagen weit auseinander.

Der erste und wirksamste Schritt war eine einfache Regel: Jede Änderung geht über einen Pull Request mit Review. Eine Zeit lang lief jeder einzelne Pull Request über meinen Schreibtisch. Das klingt nach Flaschenhals, und ein paar Wochen lang war es viel Arbeit. Aber es gab uns etwas, das kein Workshop liefern konnte: einen konkreten Blick darauf, wie jedes Team tatsächlich baut. Aus diesen Reviews haben wir Entwicklungs- und Architekturstandards aufgeschrieben, und ab dann haben die Reviews sie durchgesetzt.

Nach einigen Wochen ging die Zahl der Review-Kommentare deutlich zurück, weil die Teams die Standards kannten. Releases wurden planbar, und die Validierungsläufe der Pipeline fanden fehlende Abhängigkeiten, bevor ein Anwender sie sah. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben und ihn eingearbeitet. Seitdem verantwortet der Kunde den Review-Prozess selbst.

> Reviews sind der Weg, auf dem sich ein Programm mit vielen Teams auf eine gemeinsame Bauweise einigt.

## Wie führen Sie Reviews ein, ohne langsamer zu werden?

Der häufigste Einwand ist die Geschwindigkeit. Nach meiner Erfahrung bremsen Reviews ein Projekt nur, wenn sie schlecht eingeführt werden. Diese Regeln halten sie schnell:

- **Kleine Pull Requests.** Eine User Story, ein Pull Request. Eine Änderung mit 20 Dateien ist in Minuten geprüft, eine mit 200 Dateien wird durchgewunken oder tagelang blockiert.
- **Vereinbarte Reaktionszeiten.** Zum Beispiel ein erstes Review innerhalb eines Arbeitstags. Dann wartet niemand im Ungewissen.
- **Klare Zuständigkeiten.** Legen Sie fest, wer was freigeben darf. Architekturrelevante Änderungen wie neue Objekte, Schnittstellen oder geänderte Freigaberegeln braucht die Freigabe des Architekten auf Kundenseite. Kleinere Änderungen kann ein anderer Entwickler prüfen.
- **Schriftliche Standards.** Reviewer verweisen auf ein Dokument, nicht auf persönlichen Geschmack. So werden Kommentare leichter akzeptiert und schneller umgesetzt.
- **Automatisierung zuerst.** Ein Merge ist technisch gesperrt, bis die Pipeline grün ist. Der Reviewer sieht nur Änderungen, die die automatischen Prüfungen bereits bestanden haben.
- **Reviews als Wissenstransfer.** Junior-Entwickler und neue Partner lernen die Standards am schnellsten, indem sie Reviews lesen und erhalten.

## Wem sollte der Review-Prozess gehören?

Dem Kunden. Das ist mir als [Architekt auf Kundenseite](../../#about) wichtig. Verantwortet ein Umsetzungspartner die Review-Regeln, entscheidet er, wie alle anderen bauen, auch seine Wettbewerber. Liegen die Regeln und die Freigabe architekturrelevanter Änderungen beim Kunden, bleiben Partner vergleichbar und austauschbar. Das ist die Grundlage guter [Partnersteuerung und Governance](../../leistungen/partnersteuerung/).

Das heißt nicht, dass der Kunde jede Zeile selbst prüfen muss. Partner können und sollten sich gegenseitig reviewen. Aber die Standards, die Freigaberechte und das Repository gehören zum Kunden, am besten zu einer internen Person, die den Prozess langfristig übernimmt.

## Wo fangen Sie an?

Wenn in Ihrem Programm noch ohne Reviews gemergt oder deployt wird, starten Sie klein:

1. Schützen Sie die Haupt-Branches, sodass niemand ohne freigegebenen Pull Request mergen kann.
2. Hängen Sie die automatischen Prüfungen an jeden Pull Request: Validierungsdeployment, Apex-Tests, Codeanalyse.
3. Schreiben Sie die zehn wichtigsten Entwicklungsstandards auf. Für den Anfang reicht das.
4. Legen Sie fest, wer was freigibt, und vereinbaren Sie eine Reaktionszeit.
5. Prüfen Sie die ersten Wochen zentral und verteilen Sie die Verantwortung danach.

Pull-Request-Reviews kosten Minuten pro Änderung und sparen Tage pro Release. Wenn Sie darüber sprechen möchten, wie Sie Reviews in Ihrem Programm einführen, [schreiben Sie mir](#contact).
