---
title: "Release-Management für Salesforce: die Grundlagen"
description: "Was Source-Driven Development, Pipeline und Release bedeuten, was schlechte Releases mit mehreren Partnern kosten und wie der Weg von Change Sets aussieht."
lang: de
slug: release-management-grundlagen
course: devops
translationKey: devops-01
chapter: 1
pubDate: 2026-10-28
short: "Warum Releases entscheiden"
summary: "Die Grundbegriffe, die Kosten schlechter Releases mit mehreren Partnern und fünf Reifestufen von Change Sets bis zur eigenen Pipeline."
takeaways:
  - "Release-Management für Salesforce heißt, dass jede Änderung aus einem Git-Repository über eine feste Pipeline mit Review und Tests in Produktion kommt und ein Release zu einem geplanten Termin freigeschaltet wird."
  - "Ein Deployment ist der technische Transport von Metadaten in eine Org; ein Release ist die geplante Freigabe für Anwender mit Kommunikation und Abnahme durch den Fachbereich."
  - "Schlechte Releases kosten in Programmen mit mehreren Partnern vor allem Nacharbeit über Teamgrenzen, wiederholte Tests in UAT und Stillstand im Service oder im Händlerportal."
  - "Change Sets funktionieren nur zwischen Orgs derselben Produktion, enthalten keine Daten und keine Historie; für mehrere Teams auf einer Org reichen sie nicht."
  - "Der Weg von Change Sets zur Pipeline führt über fünf Stufen und braucht keinen Big Bang, aber eine frühe, für alle Partner verbindliche Entscheidung."
articles: [devops-salesforce-enterprise, client-owned-devops-tools, pull-request-reviews-enterprise]
faq:
  - q: "Was ist der Unterschied zwischen Deployment und Release?"
    a: "Ein Deployment überträgt Metadaten technisch in eine Org, das kann täglich passieren. Ein Release ist die geplante Freigabe eines Pakets von Änderungen für Anwender, mit Termin, Kommunikation, Schulung und Abnahme durch den Fachbereich."
  - q: "Ab wann lohnt sich eine Pipeline statt Change Sets?"
    a: "Sobald ein zweites Team oder ein zweiter Partner an derselben Org arbeitet. Dann überschreiben sich Änderungen, und ohne Repository kann niemand nachweisen, wer was wann geändert hat."
  - q: "Brauche ich für den Einstieg ein kommerzielles DevOps-Werkzeug?"
    a: "Nein. Ein Git-Repository, die Salesforce CLI und eine Open-Source-Lösung wie sfdx-hardis reichen für eine vollständige Pipeline. Kommerzielle Plattformen wie Gearset, Copado oder Flosum bieten mehr Oberfläche und Herstellersupport. Wichtig ist, dass die Wahl früh fällt und für alle Partner gilt."
  - q: "Wem sollte die Release-Pipeline gehören?"
    a: "Ihnen als Auftraggeber. Repository, Pipeline und Werkzeuge laufen auf Ihren Namen, Partner arbeiten mit persönlichen Benutzern darin. So bleibt der Prozess stabil, wenn ein Partner wechselt."
draft: false
---

Release-Management für Salesforce entscheidet, ob ein Programm mit mehreren Partnern planbar bleibt. Sobald zwei Teams an derselben Org arbeiten, reicht es nicht mehr, Änderungen per Change Set von Sandbox zu Sandbox zu schieben. Sie brauchen ein Git-Repository als einzige Quelle der Wahrheit, eine Pipeline, die jede Änderung gleich prüft und ausrollt, und klare Regeln, wer was wann freigibt. Repository, Pipeline und Werkzeuge gehören dabei Ihnen als Auftraggeber, nicht dem Implementierungspartner. Der Weg dorthin führt in fünf Stufen von Change Sets zur eigenen Pipeline, und keine Stufe verlangt einen Big Bang.

## Was bedeutet Release-Management für Salesforce?

Release-Management ist die Disziplin, Änderungen an einer Salesforce-Org geplant, geprüft und nachvollziehbar von der Entwicklung bis zu den Anwendern zu bringen. DevOps beschreibt die Arbeitsweise und die Werkzeuge dahinter. In Gesprächen mit Fachbereichen und Partnern fallen immer dieselben Begriffe, und sie werden oft unterschiedlich verstanden. So verwende ich sie in dieser Masterclass:

- **Source-Driven Development** (quellgesteuerte Entwicklung) bedeutet, dass die Versionsverwaltung und nicht die Org die Quelle der Wahrheit ist. Der [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-intro.html) sagt es knapp: „Instead of the org, your version control system is the source of truth.“ Was nicht im Repository steht, gilt als nicht vorhanden.
- **Versionsverwaltung** (Version Control) ist ein System wie Git, das jeden Stand jeder Datei mit Autor, Zeitpunkt und Begründung speichert. Damit lässt sich jede Änderung nachvollziehen, vergleichen und zurücknehmen. Bei Salesforce liegen dort Metadaten wie Objekte, Felder, Flows, Permission Sets und Apex-Klassen als Dateien.
- **Continuous Integration (CI)** heißt, dass jede Änderung automatisch geprüft wird, bevor sie in einen gemeinsamen Stand übernommen wird. Bei Salesforce sind das ein Validierungs-Deployment, Apex-Tests und statische Code-Analyse.
- **Continuous Delivery (CD)** heißt, dass geprüfte Änderungen jederzeit automatisiert in die nächste Umgebung ausgerollt werden können, ohne Handarbeit aus einer Excel-Liste.
- **Pipeline** nennt man die feste Abfolge von Umgebungen und automatischen Prüfungen, die jede Änderung durchläuft, zum Beispiel Entwickler-Sandbox, Integration, UAT, Produktion. Jede Änderung nimmt denselben Weg, auch der Hotfix.
- **Deployment** ist der technische Vorgang, Metadaten in eine Org zu übertragen. Bei einem Deployment nach Produktion mit Apex-Code laufen laut [Salesforce-CLI-Referenz](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html) standardmäßig alle lokalen Tests, und laut [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/pages/apex_testing_intro.htm) müssen Tests mindestens 75 Prozent des Apex-Codes abdecken und erfolgreich durchlaufen.
- **Release** ist ein geplantes Paket von Änderungen, das zu einem festen Termin für Anwender freigeschaltet wird. Dazu gehören Kommunikation, Schulung und die Abnahme durch den Fachbereich.

Die Unterscheidung zwischen Deployment und Release ist für Entscheider die wichtigste. Deployments können täglich laufen, in Sandboxes sogar mehrmals am Tag. Ein Release ist eine fachliche Entscheidung: Der Leiter Service entscheidet, ab wann die Techniker im Außendienst (Field Service) die neue Rückmeldemaske nutzen. Wer beides verwechselt, plant entweder zu wenige Deployments und bekommt riesige, riskante Pakete, oder schaltet Funktionen frei, bevor der Fachbereich bereit ist.

Ein Termin liegt dabei nie bei Ihnen. Salesforce liefert laut [Release-Übersicht](https://www.salesforce.com/releases/) drei saisonale Releases pro Jahr, typischerweise Spring im Februar, Summer im Juni und Winter im Oktober, mit einer Sandbox Preview von vier bis sechs Wochen vorher. Ihr Release-Kalender muss um diese Termine herum funktionieren. Wie, beschreibt [Kapitel 8](../release-planung-salesforce-releases/).

## Was kosten schlechte Releases in einem Programm mit mehreren Partnern?

Ich habe ein Programm mit acht Teams und 32 Entwicklern begleitet, Orgs betreut, auf denen mehrere Implementierungspartner gleichzeitig arbeiteten, und mit Nearshore-Teams in Osteuropa und Indien gearbeitet. Ohne gemeinsamen Release-Prozess entstehen immer dieselben Muster, die ich in [warum DevOps über Salesforce-Großprojekte entscheidet](../../../blog/warum-devops-salesforce-enterprise-projekte/) ausführlicher beschreibe. Für ein Budget lassen sie sich in fünf Kostenarten übersetzen:

1. **Nacharbeit über Teamgrenzen.** Team A deployt ein Page Layout, Team B einen Tag später dasselbe Objekt mit einem älteren Stand. Die Korrektur bindet beide Teams, und bei verteilten Teams in mehreren Zeitzonen dauert jede Abstimmung länger.
2. **Wiederholte Tests.** Jedes fehlerhafte Deployment nach UAT macht die Testergebnisse anderer Teams wertlos. Key User aus Vertrieb und Service testen dieselben Fälle zweimal und verlieren das Vertrauen in die Abnahme.
3. **Stillstand im Fachbereich.** Ein Fehler in Produktion trifft in der Fertigung oft die Prozesse mit dem meisten Kundenkontakt: Serviceaufträge, Ersatzteilbestellungen im Händlerportal, die Auftragsübergabe an SAP.
4. **Wachsende Pakete.** Wer schlechte Erfahrungen mit Releases macht, released seltener. Seltenere Releases werden größer, größere Releases riskanter. Messbar wird das mit den [fünf Kennzahlen von DORA](https://dora.dev/guides/dora-metrics/), etwa der Deployment-Frequenz und der Change Fail Rate, dem Anteil der Deployments, die sofortige Nacharbeit wie ein Rollback oder einen Notfall-Patch brauchen.
5. **Abhängigkeit und Schuldfrage.** Ohne Historie im Repository kann niemand belegen, welcher Partner welche Änderung gemacht hat. Die Diskussion darüber kostet Steuerungszeit und belastet die Zusammenarbeit.

Ein typisches Szenario, als Annahme: Ein Maschinenbauer betreibt Service Cloud mit Field Service, ein Händlerportal auf Experience Cloud und eine Schnittstelle zu SAP. Drei Partner arbeiten auf derselben Org, je einer für Service, Vertrieb mit Portal und Integration. Am Freitagabend deployt der Vertriebspartner per Change Set eine neue Validierungsregel auf dem Auftragsobjekt. Sie ist in seiner Sandbox korrekt, kennt aber ein Feld nicht, das der Integrationspartner zwei Wochen zuvor eingeführt hat. Am Montag schlägt die nächtliche Auftragsübergabe aus SAP fehl, Händler sehen keine Liefertermine, und das Service-Team muss den eigenen UAT-Lauf verschieben, weil die Org nicht stabil ist. Keine dieser Kosten taucht als eigene Zeile im Projektbudget auf. Ein Validierungs-Deployment gegen den gemeinsamen Stand im Repository hätte den Konflikt vor dem Merge gezeigt.

## Warum reichen Change Sets nicht mehr?

Change Sets sind das Standardwerkzeug, mit dem viele Orgs anfangen, und für einen einzelnen Admin sind sie in Ordnung. Laut [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=changesets.htm) brauchen sie eine Deployment-Verbindung, die nur zwischen Orgs derselben Produktion besteht. Sie enthalten nur Änderungen, die über das Setup möglich sind, keine Datensätze, und werden als Ganzes deployt. Für ein Programm mit mehreren Partnern fehlen die entscheidenden Dinge:

- keine Versionshistorie, also kein Vergleich und kein sauberes Zurückrollen
- kein Review, bevor eine Änderung die nächste Umgebung erreicht
- keine automatischen Prüfungen gegen den Stand anderer Teams
- manuelles Zusammenklicken der Komponenten, bei dem leicht etwas fehlt
- kein Nachweis, wer was wann und mit welcher Begründung geändert hat

Das Problem liegt weniger im Werkzeug als in der Quelle der Wahrheit. Solange die Org die Wahrheit ist, entscheidet der letzte Deployer, welcher Stand gilt.

## Fünf Reifestufen von Change Sets zur Pipeline

Kaum ein Unternehmen springt von Change Sets direkt zu einer vollautomatischen Pipeline, und das ist auch nicht nötig. Ich ordne Programme in fünf Stufen ein. Jede Stufe hat einen klaren Nutzen, und jede bereitet die nächste vor.

| Stufe | Wie Änderungen nach Produktion kommen | Quelle der Wahrheit | Größtes Risiko | Kapitel |
|---|---|---|---|---|
| 1. Klicks und Change Sets | im Setup oder per Change Set, von Hand | die Org | Überschreiben, keine Historie | 1 |
| 2. Repository als Ablage | weiter von Hand, Metadaten werden zusätzlich in Git gesichert | die Org, Git ist eine Kopie | Repository und Org laufen auseinander | 2, 3 |
| 3. Pull Requests mit Prüfung | Änderungen entstehen im Branch, jeder Pull Request bekommt Review und Validierungs-Deployment | das Repository | Prüfungen werden umgangen, wenn Produktion offen bleibt | 4, 5, 6 |
| 4. Pipeline bis Produktion | jede Umgebung, auch Produktion, nur noch über die Pipeline, mit Delta-Deployments und Hotfix-Pfad | das Repository | Daten, Konfiguration und Salesforce-Releases bleiben Handarbeit | 7, 8 |
| 5. Betrieb und Messung | wie Stufe 4, dazu Monitoring, Backups und Kennzahlen | das Repository | Prozess veraltet, wenn ihn niemand verantwortet | 9, 10 |

Zwei Stellen in dieser Tabelle sind in der Praxis die schwierigsten. Der Schritt von Stufe 2 zu 3 verschiebt die Quelle der Wahrheit von der Org ins Repository. Ab dann ist jede Änderung, die direkt in einer gemeinsamen Org entsteht, ein Fehler im Prozess. Und der Schritt von 3 zu 4 schließt die Hintertür: Solange jemand mit Admin-Rechten in Produktion deployen darf, ist die Pipeline eine Empfehlung.

Das Validierungs-Deployment ist das erste Werkzeug, das sich schon in Stufe 3 bezahlt macht.

```vertiefung Für Entwickler
titel: Wie funktionieren Validierung und Quick Deploy?
Mit `sf project deploy validate` prüft die [Salesforce CLI](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html), ob ein Deployment gelingen würde, ohne etwas zu ändern. Nach einer erfolgreichen Validierung lässt sich das Paket bis zu zehn Tage lang per Quick Deploy ohne erneuten Testlauf ausrollen.
```

Für die Stufen 3 bis 5 brauchen Sie ein Werkzeug. Eine Open-Source-Option ist [sfdx-hardis](https://sfdx-hardis.cloudity.com/), das Cloudity mit einer Community pflegt; es bringt Pipelines für GitHub, GitLab, Azure DevOps, Bitbucket und Jenkins sowie Monitoring und Metadaten-Backup mit. Ich setze es seit rund zwei Jahren in Kundenprojekten ein. Kommerzielle Plattformen wie [Gearset](https://gearset.com/), [Copado](https://www.copado.com/) oder [Flosum](https://www.flosum.com/products/devops) bieten eine verwaltete Oberfläche, Herstellersupport und weniger eigenen Betriebsaufwand; Flosum beschreibt sich als native Lösung auf der Salesforce-Plattform. Welches Werkzeug zu welchem Programm passt, vergleicht [Kapitel 4](../devops-werkzeuge-vergleich/). Für dieses Kapitel zählen zwei Regeln: Die Wahl fällt früh und gilt für jeden Partner. Und wenn Sie mit Open Source Lizenzkosten sparen, investieren Sie das Geld am besten in eine interne Release-Rolle.

## Wem gehört der Release-Prozess?

Ihnen. Das ist die Grundannahme aller folgenden Kapitel. Repository, Pipeline, DevOps-Werkzeug und Sandboxes laufen auf Ihren Namen, Partner bekommen persönliche Benutzer mit den Rechten, die ihre Aufgabe braucht. Warum das auch für Jira, Confluence und Miro gilt, beschreibe ich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

Der zweite Grundsatz: Jede Änderung geht über einen Pull Request mit Review, auch Flows und Permission Sets. Das Review ist die günstigste Stelle, an der ein Programm mit vielen Teams sich auf eine Bauweise einigt. Was ein gutes Review prüft, steht in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/).

```praxis
In einem Programm, das ich begleitet habe, lief anfangs jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
```

Beide Grundsätze sind eine Frage der Steuerung und gehören in die Verträge mit den Partnern. Genau dort setze ich in [DevOps und Release-Management](../../../leistungen/devops-und-release-management/) und in der [Partnersteuerung](../../../leistungen/partnersteuerung/) an.

## Der Weg durch die zehn Kapitel

Die Masterclass folgt einem Unternehmen auf diesem Weg. Jedes Kapitel baut auf dem vorherigen auf.

| Nr. | Kapitel | Die Frage dahinter |
|---|---|---|
| 1 | Warum Releases entscheiden | Welche Begriffe, welche Kosten, welcher Reifegrad? |
| 2 | [Eigentum und Rollen](../release-prozess-eigentum-rollen/) | Wer besitzt was, wer gibt was frei, was steht im Partnervertrag? |
| 3 | [Umgebungen und Branches](../umgebungen-und-branching/) | Welche Sandboxes, welches Branch-Modell, welcher Hotfix-Pfad? |
| 4 | [Werkzeuge im Überblick](../devops-werkzeuge-vergleich/) | Salesforce-Standard, Open Source oder kommerzielle Plattform? |
| 5 | [Die Pipeline bauen](../pipeline-aufbauen/) | Wie laufen Pull Request, Validierung, Tests und Deployment ab? |
| 6 | [Qualität, Tests, Reviews](../qualitaet-tests-reviews/) | Welche Quality Gates muss jede Änderung bestehen? |
| 7 | [Daten und Konfiguration](../daten-und-konfiguration/) | Wie kommen Preisbücher, Produktdaten und Konfigurationsdatensätze mit? |
| 8 | [Release-Planung](../release-planung-salesforce-releases/) | Wie passen eigener Kalender und drei Salesforce-Releases zusammen? |
| 9 | [Betrieb und Monitoring](../betrieb-monitoring-backup/) | Was passiert nach dem Go-live, wie messen Sie Stabilität? |
| 10 | [Einführung und Fahrplan](../einfuehrung-fahrplan/) | In welcher Reihenfolge führen Sie das alles ein? |

Kapitel 10 schlägt auch die Brücke zu Coding-Agenten in der Pipeline. Wer dazu tiefer einsteigen will, findet in der Masterclass KI das Kapitel [Teamarbeit und Delivery](../../ki-salesforce/teamarbeit-und-delivery/).

## Wo stehen Sie heute?

Sechs Fragen genügen für eine erste Einordnung. Sie sollten jede in einem Satz beantworten können:

- Auf wessen Namen laufen Git-Repository und DevOps-Werkzeug?
- Kann heute jemand in Produktion etwas im Setup ändern, ohne dass es im Repository auftaucht?
- Läuft jede Änderung über einen Pull Request mit Review, auch die des Partners mit dem größten Team?
- Welcher Stand ist gerade in UAT, und woher wissen Sie das?
- Wer gibt ein Release frei, und wer entscheidet über einen Hotfix?
- Wie lange dauert es, eine fehlerhafte Änderung in Produktion zurückzunehmen?

Wenn Sie bei mehr als zwei Fragen zögern, liegt Ihr Programm in Stufe 1 oder 2. Dann klären Sie zuerst Eigentum und Rollen und erst danach das Werkzeug. Damit geht es weiter in [Kapitel 2: Eigentum und Rollen](../release-prozess-eigentum-rollen/).

Ein Salesforce-Programm mit mehreren Partnern bleibt nur planbar, wenn Ihnen der Release-Prozess gehört und jede Änderung denselben Weg nimmt. Wenn Sie wissen möchten, auf welcher Stufe Ihr Programm steht, [schreiben Sie mir](#contact).
