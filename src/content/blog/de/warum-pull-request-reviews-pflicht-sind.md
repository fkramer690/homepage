---
title: "Warum Pull-Request-Reviews in Großprojekten Pflicht sind"
description: "Arbeiten mehrere Partner an einer Salesforce-Org, ist das Pull-Request-Review die günstigste Qualitätskontrolle. Was es prüfen sollte und wie Sie starten."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: warum-pull-request-reviews-pflicht-sind
translationKey: pull-request-reviews-enterprise
topic: code-review
categories: [devops]
tags: [Pull Request Review, DevOps, Partnersteuerung, Codequalität]
takeaways:
  - "Das Review einer kleinen Änderung dauert oft Minuten. Eine ungeprüfte Änderung in UAT oder Produktion zu korrigieren, dauert oft Tage und trifft mehrere Teams."
  - "In Salesforce-Großprojekten halten Reviews mehrere Partner auf einem gemeinsamen Standard und helfen, widersprüchliche Änderungen vor dem Merge zu erkennen."
  - "Den Codestil prüft die Pipeline. Der Reviewer prüft Architektur, Datenmodell, Sicherheit, Automatisierung und Tests."
  - "Der Review-Prozess gehört auf die Kundenseite, mit klaren Regeln, kleinen Pull Requests und vereinbarten Reaktionszeiten."
faq:
  - q: "Was ist ein Pull-Request-Review?"
    a: "Bei einem Pull-Request-Review prüft eine zweite Person eine Änderung, bevor sie in einen gemeinsamen Branch übernommen und anschließend deployt wird. Sind Branch-Schutz und Pflichtprüfungen eingerichtet, werden nur freigegebene Änderungen mit grüner Pipeline übernommen und deployt."
  - q: "Bremsen Pull-Request-Reviews Salesforce-Projekte aus?"
    a: "Nicht, wenn Pull Requests klein und Reaktionszeiten vereinbart sind. Ein kleiner, gut vorbereiteter Pull Request ist oft in Minuten geprüft; komplexe Änderungen brauchen länger. Die Korrektur einer ungeprüften Änderung in UAT oder Produktion dauert oft Tage und betrifft mehrere Teams."
  - q: "Wer sollte in Projekten mit mehreren Partnern reviewen?"
    a: "Die Kundenseite sollte die Review-Regeln verantworten und architekturrelevante Änderungen freigeben. Partner können sich gegenseitig reviewen; das letzte Wort über Standards sollte aber nicht bei einem Umsetzungspartner liegen."
  - q: "Lassen sich auch Low-Code-Änderungen wie Flows reviewen?"
    a: "Ja, wenn die Änderung vollständig ins Repository übernommen wird. Flows, Page Layouts, Permission Sets und Felder sind Metadaten und erscheinen im Pull Request wie Code. Reviewer prüfen sie auf Benennung, Logik, Performance und Sicherheit; komplexe Flows prüfen sie am besten mit einem visuellen Vergleich."
---

Ein Pull-Request-Review ist in Großprojekten Pflicht, weil es eine der letzten Stellen ist, an denen eine Änderung günstig gestoppt werden kann, bevor sie in einen gemeinsamen Branch übernommen wird. Bevor eine Änderung übernommen wird, prüft eine zweite Person, ob sie zur Architektur passt, den vereinbarten Standards folgt und nicht die Arbeit eines anderen Teams kaputt macht. In einem Salesforce-Programm, in dem mehrere Partner und interne Teams an einer Org arbeiten, deckt dieser eine Schritt Architekturprobleme und teamübergreifende Konflikte auf, die automatische Tests nicht abdecken und die sonst erst Wochen später im UAT auffallen würden. Und er hält die Teams auf Linie, ganz ohne zusätzliches Meeting.

## Was ist ein Pull-Request-Review?

Ein Pull Request ist die Anfrage, eine Reihe von Änderungen aus einem Branch in einen anderen zu übernehmen, zum Beispiel aus einem Feature-Branch in den Integrations-Branch. Beim Pull-Request-Review sieht sich mindestens eine weitere Person diese Änderungen an und gibt sie frei, bevor sie übernommen werden. In einem sauberen [Salesforce-DevOps-Setup](../warum-devops-salesforce-enterprise-projekte/) läuft bei jedem Pull Request zusätzlich die Pipeline mit Validierungsdeployment, Apex-Tests und statischer Codeanalyse. In Sandboxes ist das ein Probelauf mit `sf project deploy start --dry-run`; `sf project deploy validate` ist für Produktion gedacht. Mit Branch-Schutz und Pflichtprüfungen wird die Änderung erst dann übernommen, wenn das Review freigegeben und die Pipeline grün ist.

Das gilt auch für Low-Code. Flows, Page Layouts, Permission Sets und benutzerdefinierte Felder sind Metadaten im Repository. Ist die Änderung vollständig aus der Org übernommen, tauchen sie im Pull Request auf wie jede andere Datei.

## Großprojekte brauchen Reviews mehr als eine kleine Org

In einer kleinen Org mit einem Admin kennt dieser Admin jede Änderung. In einem Enterprise-Programm ist dieses Wissen auf viele Köpfe verteilt. Ich habe in Programmen mit bis zu acht Projektteams und mehr als 30 Entwicklern auf einer Plattform gearbeitet. Ohne Reviews tauchen dort immer wieder dieselben Probleme auf:

- **Teams überschreiben sich gegenseitig.** Ein Team ändert eine Validierungsregel, ein anderes deployt einen Tag später eine ältere Version desselben Objekts.
- **Technische Ansätze driften auseinander.** Ein Partner baut Logik in Apex, ein anderer in Flows, ein dritter in einem Managed Package. Ähnliche Probleme werden völlig unterschiedlich gelöst.
- **Versteckte Seiteneffekte.** Ein neuer Trigger oder Flow wird auf einem Objekt ausgelöst, das ein anderes Team ebenfalls automatisiert, und das Speichern von Datensätzen schlägt fehl oder wird langsam.
- **Sicherheitslücken.** Berechtigungen werden zu großzügig vergeben, weil es schneller geht, und niemand merkt es bis zum nächsten Audit.
- **Wissen bleibt in einem Kopf.** Hat nur der Autor eine Änderung jemals gesehen, hängt das Programm an dieser Person.

All das lässt sich im Pull Request günstig beheben; später wird es teuer. Hat eine Änderung erst einmal UAT erreicht, haben andere Teams darauf aufgebaut, Tester Fehler zu dieser Änderung erfasst und Fachanwender sie gesehen.

```partnerfluss review
ohne: Ohne Review | Jedes Team deployt auf eigenem Weg, Konflikte fallen erst in UAT oder Produktion auf.
mit: Mit Pull-Request-Review | Jede Änderung geht durch ein Review, bevor sie in die Org gelangt.
```

## Was sollte ein gutes Review prüfen?

Ein Review ist keine Stilprüfung. Formatierung, Benennung und bekannte Anti-Patterns kann eine Maschine schneller und zuverlässiger prüfen, soweit die Regeln in der Pipeline eingerichtet sind. Der menschliche Reviewer sollte sich auf das konzentrieren, was Werkzeuge nicht beurteilen können. In meinen Reviews achte ich auf diese Punkte:

1. **Passung zur Architektur.** Folgt die Änderung den vereinbarten Mustern? Ist sie an der richtigen Stelle umgesetzt, etwa nach dem Prinzip Konfiguration vor Code und mit einem Einstiegspunkt für Automatisierung pro Objekt mit festgelegter Ausführungsreihenfolge?
2. **Datenmodell.** Werden neue Felder und Objekte wirklich gebraucht, sind sie einheitlich benannt und passen sie zu den Anforderungen an Reporting und Schnittstellen?
3. **Automatisierung und Seiteneffekte.** Welche Flows, Trigger und Validierungsregeln laufen bereits auf diesem Objekt? Was passiert bei Massendatenladungen oder Schnittstellen?
4. **Sicherheit und Zugriff.** Werden Rechte über Permission Sets vergeben und dabei so eng wie möglich zugeschnitten? Entfernt oder erweitert eine Permission-Set-Datei Rechte, die mit der Änderung nichts zu tun haben? Setzen Apex und Flows Objektrechte, Feldsicherheit und Freigaberegeln durch, und ist User Mode oder System Mode bewusst gewählt?
5. **Tests und Qualität.** Decken die Tests die fachliche Logik ab, auch Fehlerfälle, oder heben sie nur die Testabdeckung über die 75-Prozent-Schwelle fürs Deployment?
6. **Nachvollziehbarkeit.** Verweist der Pull Request auf die User Story, und erklärt die Beschreibung nicht nur, was geändert wurde, sondern auch, warum?

Den wiederholbaren Teil sollten Sie automatisieren: statische Codeanalyse, projektspezifische Namensregeln, eine Prüfung auf veraltete API-Versionen und das Validierungsdeployment. Ein Reviewer, der fehlende Beschreibungen oder falsche Einrückungen anmerken muss, hat weniger Aufmerksamkeit für die Fragen, auf die es ankommt.

![Pull-Request-Review in vier Schritten: eine User Story pro Pull Request; die Pipeline prüft automatisch Validierungsdeployment, Apex-Tests, statische Codeanalyse, Namenskonventionen und API-Versionen; ein menschlicher Reviewer prüft Passung zur Architektur, Datenmodell, Automatisierung und Seiteneffekte, Sicherheit und Zugriff, Tests und Qualität sowie Nachvollziehbarkeit; gemergt wird nur mit Freigabe und grüner Pipeline. Die Maschine prüft den wiederholbaren Teil, der Mensch, was Werkzeuge nicht beurteilen können.](../../../assets/blog/pull-request-review-split-de.png)

## Was Reviews in einem Programm mit mehreren Partnern verändert haben

In einem Programm, zu dem ich dazukam, arbeiteten mehrere Umsetzungspartner und interne Teams an derselben Salesforce-Org. Niemand hatte klar festgelegt, wer für welche Prozesse, Objekte und Metadaten federführend verantwortlich war. Änderungen überschrieben sich, weil nicht abgestimmt war, wer was wann deployt, und die technischen Ansätze der Teams lagen weit auseinander.

```praxis
Der erste und wirksamste Schritt war eine einfache Regel: Jede Änderung geht über einen Pull Request mit Review. Eine Zeit lang ging jeder einzelne Pull Request über meinen Schreibtisch. Das klingt nach Flaschenhals, und ein paar Wochen lang war es viel Arbeit. Aber es gab uns etwas, das kein Workshop liefern konnte: einen konkreten Blick darauf, wie jedes Team tatsächlich baut. Auf Basis dieser Reviews haben wir Entwicklungs- und Architekturstandards aufgeschrieben, und ab dann wurden sie in den Reviews durchgesetzt.

Nach einigen Wochen ging die Zahl der Review-Kommentare deutlich zurück, weil die Teams die Standards kannten. Releases wurden planbar, und die Validierungsläufe der Pipeline fanden viele fehlende Abhängigkeiten, bevor ein Anwender sie sah. Als der Prozess stabil funktionierte, habe ich ihn an einen internen Kollegen übergeben und den Kollegen eingearbeitet. Seitdem verantwortet der Kunde den Review-Prozess selbst.
```

```vergleich
ohne: Ohne Review
- * Jedes Team baut nach eigenen Regeln.
- Änderungen überschreiben sich, weil nicht abgestimmt ist, wer was deployt.
- Fehlende Abhängigkeiten fallen erst nach dem Release auf.
mit: Jeder Pull Request mit Review
- * Aus den Reviews entstehen dokumentierte Standards für alle Teams.
- Konflikte zwischen Teams zeigen sich öfter vor dem Merge.
- Die Pipeline findet viele fehlende Abhängigkeiten, bevor ein Anwender sie sieht.
zitat: Reviews sind der Weg, auf dem sich ein Programm mit vielen Teams auf eine gemeinsame Bauweise einigt.
```

## Wie führen Sie Reviews ein, ohne langsamer zu werden?

Der häufigste Einwand ist die Geschwindigkeit. Nach meiner Erfahrung bremsen Reviews ein Projekt nur, wenn sie schlecht eingeführt werden. Diese Regeln halten sie schnell:

- **Kleine Pull Requests.** Beschränken Sie jeden Pull Request auf eine zusammenhängende Änderung; eine große User Story braucht eventuell mehrere Pull Requests. Halten Sie den fachlichen Umfang klein, denn die Dateizahl sagt wenig: Das Salesforce-Quellformat verteilt eine Änderung auf viele Dateien.
- **Vereinbarte Reaktionszeiten.** Vereinbaren Sie zum Beispiel ein erstes Review innerhalb eines Arbeitstags. Dann wartet niemand im Ungewissen.
- **Klare Zuständigkeiten.** Legen Sie fest, wer was freigeben darf. Architekturrelevante Änderungen wie neue Objekte, Schnittstellen oder geänderte Freigaberegeln brauchen die Freigabe des Architekten auf Kundenseite. Kleinere Änderungen kann ein anderer Entwickler prüfen.
- **Schriftliche Standards.** Reviewer verweisen auf ein Dokument, nicht auf persönlichen Geschmack. So werden Kommentare leichter akzeptiert und schneller umgesetzt.
- **Automatisierung zuerst.** Pflichtprüfungen sperren den Merge, bis die Pipeline grün ist. Der Reviewer sieht nur Änderungen, die die automatischen Prüfungen bereits bestanden haben.
- **Reviews als Wissenstransfer.** Junior-Entwickler und neue Partner lernen die Standards am schnellsten, indem sie Reviews lesen und zu eigenen Pull Requests Feedback erhalten.

## Der Review-Prozess gehört dem Kunden

Das ist mir als [Architekt auf Kundenseite](../../#about) wichtig. Verantwortet ein Umsetzungspartner die Review-Regeln, entscheidet er, wie alle anderen bauen, einschließlich seiner Wettbewerber. Liegen die Regeln und die Freigabe architekturrelevanter Änderungen beim Kunden, bleiben Partner vergleichbar und austauschbar. Das ist die Grundlage guter [Partnersteuerung und Governance](../../leistungen/partnersteuerung/).

Das heißt nicht, dass der Kunde jede Zeile selbst prüfen muss. Partner können und sollten sich gegenseitig reviewen. Aber die Standards, die Freigaberechte und das Repository sollten beim Kunden liegen, am besten bei einer internen Person, die den Prozess langfristig übernimmt.

## Erster Schritt: Haupt-Branches schützen

Wenn in Ihrem Programm noch ohne Reviews gemergt oder deployt wird, starten Sie klein:

```schritte
Branches schützen
  Schützen Sie die Haupt-Branches, sodass niemand ohne freigegebenen Pull Request mergen kann.
Prüfungen anhängen
  Hängen Sie die automatischen Prüfungen als Pflichtprüfungen an jeden Pull Request: Validierungsdeployment, Apex-Tests, Codeanalyse.
Standards aufschreiben
  Schreiben Sie die zehn wichtigsten Entwicklungsstandards auf. Für den Anfang reicht das.
Freigaben regeln
  Legen Sie fest, wer was freigibt, und vereinbaren Sie eine Reaktionszeit.
Zentral starten
  Prüfen Sie die ersten Wochen zentral und verteilen Sie die Verantwortung danach.
```
