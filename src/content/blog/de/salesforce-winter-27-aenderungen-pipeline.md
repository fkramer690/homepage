---
title: "Salesforce Winter '27: Was sich für Ihre Pipeline ändert"
description: "Winter '27 ändert die Salesforce CLI, erhöht Apex-Limits, blendet die Developer Console aus und startet API-Abschaltungen. Was Dev- und Release-Teams anpassen."
pubDate: 2026-10-23
lang: de
slug: salesforce-winter-27-aenderungen-pipeline
translationKey: salesforce-winter-27-pipeline
topic: release
categories: [devops]
tags: [Release-Management, DevOps, Salesforce CLI, Winter 27, Apex]
takeaways:
  - "Ab 28. Oktober 2026 gibt der CLI-Befehl org display keine Access Tokens mehr aus; Pipeline-Skripte, die das Token aus der Ausgabe lesen, brechen dann."
  - "Die Salesforce CLI braucht jetzt Node.js 22 oder neuer, also müssen CI-Runner-Images und Entwicklerrechner aktualisiert werden."
  - "Winter '27 blendet die Developer Console im Setup aus und macht Apex in der neuen Web Console in Produktions-Orgs schreibgeschützt; das stärkt das Prinzip, nur über eine Pipeline zu deployen."
  - "Die Apex-Heap-Limits steigen automatisch von 6 auf 10 MB für synchronen und von 12 auf 25 MB für asynchronen Code."
  - "Die API-Abschaltungen haben begonnen: SOAP login() braucht ab 1. Dezember 2026 eine neue Berechtigung, und die API-Versionen 31.0 bis 40.0 bekommen ab Summer '27 keine Updates mehr."
faq:
  - q: "Was ändert sich in der Salesforce CLI mit Winter '27?"
    a: "Der Befehl org display gibt keine Secrets wie das Access Token mehr aus, und die Übergangslösung endet am 28. Oktober 2026. Außerdem braucht die CLI Node.js 22 oder neuer."
  - q: "Wird die Developer Console mit Winter '27 entfernt?"
    a: "Sie erscheint standardmäßig nicht mehr im Setup-Menü. Die neue Web Console ersetzt sie, und in Produktions-Orgs ist Apex dort nur lesbar."
  - q: "Muss ich für die höheren Apex-Heap-Limits etwas tun?"
    a: "Nein. Die neuen Limits von 10 MB für synchronen und 25 MB für asynchronen Apex-Code gelten automatisch. Code, der um die alten Limits herum gebaut wurde, lohnt trotzdem einen zweiten Blick."
  - q: "Welche API-Versionen betreffen die Abschaltungen aus Winter '27?"
    a: "SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt mit Summer '27, und SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 bekommen ab Summer '27 keine Updates mehr und fallen mit Summer '28 aus."
---

Winter '27 ist seit dem 9. Oktober 2026 vollständig ausgerollt, und für Entwicklungs- und Release-Teams bringt es Änderungen, die eine Pipeline brechen können. Am dringendsten: Ab 28. Oktober gibt die Salesforce CLI mit `org display` keine Access Tokens mehr aus, und die CLI braucht jetzt Node.js 22. Dazu verschwindet die Developer Console aus dem Setup-Menü, die Apex-Heap-Limits steigen und die ersten API-Abschaltungen greifen. Einzeln ist nichts davon dramatisch, aber jeder Punkt kann ein Deployment am falschen Tag stoppen. Diese Übersicht basiert auf dem [Entwickler-Leitfaden von Salesforce zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) und ist nach Dringlichkeit sortiert.

## Was bricht in einer Salesforce-Pipeline zuerst?

Zwei CLI-Änderungen brauchen vor allem anderen Aufmerksamkeit.

**Der Befehl org display gibt keine Secrets mehr aus.** Viele Pipelines und Hilfsskripte rufen `sf org display` auf und lesen das Access Token aus der Ausgabe, etwa um die REST-API direkt aufzurufen oder die Session an ein anderes Tool weiterzugeben. Mit Winter '27 zeigt der Befehl keine Secrets mehr. Salesforce hat eine Übergangslösung über die Umgebungsvariable `SF_TEMP_SHOW_SECRETS` angeboten, und diese endet am 28. Oktober 2026. Danach schlagen Skripte fehl, die sich auf das Token in der Ausgabe verlassen.

Was zu tun ist:

1. Durchsuchen Sie Pipeline-Definitionen, Skripte und Repositories nach `org display` und nach dem Auslesen von `accessToken`.
2. Lassen Sie jeden Pipeline-Job sich direkt authentifizieren, am besten mit dem JWT Bearer Flow und einem Zertifikat im Secret Store des Kunden, statt Tokens zwischen Schritten weiterzureichen.
3. Testen Sie die geänderten Jobs vor dem 28. Oktober in einem Feature-Branch.

![Pipeline-Authentifizierung ab 28. Oktober 2026: Pipelines, die sf org display aufrufen, das accessToken lesen und weiterreichen, brechen, weil der Befehl keine Secrets mehr zeigt und die Übergangslösung SF_TEMP_SHOW_SECRETS am 28. Oktober 2026 endet. Es funktioniert, wenn sich jeder Pipeline-Job selbst authentifiziert, mit dem JWT Bearer Flow und einem Zertifikat im Secret Store des Kunden, ohne Tokens zwischen Schritten weiterzureichen, und die geänderten Jobs zuerst in einem Feature-Branch getestet werden. Außerdem prüfen, dass die Salesforce CLI mit Node.js 22 oder neuer läuft.](../../../assets/blog/winter-27-org-display-de.png)

**Die CLI braucht Node.js 22 oder neuer.** CI-Runner nutzen oft fest eingestellte Docker-Images oder vorinstallierte Node-Versionen. Hat ein Runner noch eine ältere Node-Version, schlägt die Installation oder das Update der CLI fehl. Prüfen Sie die Basis-Images Ihrer Pipeline, die Setup-Schritte gehosteter Runner und die Rechner Ihrer Entwickler. Tools, die auf der Salesforce CLI aufbauen, wie [sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/), folgen derselben Anforderung.

## Warum ist die Änderung an der Developer Console wichtig?

Mit Winter '27 erscheint die Developer Console standardmäßig nicht mehr im Setup-Menü. Ihr Nachfolger ist die Web Console, die allgemein verfügbar ist. In Produktions-Orgs ist Apex in der Web Console nur lesbar.

Für gut geführte Programme ist das eine gute Nachricht. Code direkt in der Produktion zu ändern oder Ad-hoc-Änderungen dort auszuführen, war schon immer ein Risiko: kein Review, keine Historie, kein Weg zurück. Die neue Voreinstellung schiebt Teams dorthin, wie es ohnehin laufen sollte: jede Änderung im Repository, geprüft in einem Pull Request und deployt über die Pipeline. Warum das wichtig ist, erkläre ich in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Manche Teams nutzen die Developer Console noch für schnelle Abfragen, Log-Analysen oder anonymes Apex in der Produktion. Für diese Gewohnheiten braucht es jetzt einen Ersatz. Legen Sie fest, welche Aufgaben in der Produktion erlaubt sind, wer sie ausführen darf und wie sie dokumentiert werden.

## Was ändert sich bei Apex und LWC?

Mehrere Änderungen helfen Entwicklern, einige davon automatisch:

- **Höhere Heap-Limits.** Das Apex-Heap-Limit steigt von 6 auf 10 MB für synchronen und von 12 auf 25 MB für asynchronen Code. Das gilt automatisch. Code, der nur wegen der alten Limits in Batches aufgeteilt wurde, lässt sich später vereinfachen, Eile ist aber nicht nötig.
- **Warnungen für sehr alte API-Versionen.** Der Compiler warnt jetzt bei Klassen und Triggern, die mit den API-Versionen 9.0 bis 19.0 gespeichert sind. In älteren Enterprise-Orgs gibt es solche Klassen noch. Sie sind gute Kandidaten zum Aufräumen.
- **Neue Apex-Funktionen in Preview und Beta.** Integrationstests gibt es als Developer Preview. `FORMULA()` in SOQL, die Apex Symbol API und Cursor für Data-360-Objekte sind in der Beta. Beta-Funktionen sollten nicht ohne bewusste Entscheidung in Produktionscode landen.
- **LWC-Verbesserungen.** Komplexe Template-Ausdrücke, `lwc:external` für Web Components von Drittanbietern und `refresh()` für State Manager sind allgemein verfügbar.
- **CLI-Vorlagen.** Die CLI hat neue Vorlagen für `Batchable`- und `Queueable`-Klassen und neue Debug-Optionen für `apex run`.

## Welche API-Abschaltungen beginnen jetzt?

Winter '27 bringt die API-Version 68.0 und startet eine Reihe von Abschaltungen, die Integrationen stärker betreffen als die Pipeline selbst:

- **1. Dezember 2026:** Der SOAP-Aufruf login() braucht die Berechtigung „Use Any API Auth“.
- **Summer '27:** SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt.
- **Summer '27 und '28:** SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 bekommen ab Summer '27 keine Updates mehr und fallen mit Summer '28 aus.

Zusammen mit dem Ende des OAuth Username-Password Flow am 20. Februar 2027 ist das echte Arbeit für Integrationsteams. Die Bestandsaufnahme und Umstellung beschreibe ich in [Salesforce: Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).

## Was sollten Release Manager außerdem wissen?

Drei kleinere Punkte mit Auswirkung auf die Governance:

- **Die Agentforce-Plattform ist standardmäßig eingeschaltet.** Legen Sie fest, wer Agenten bauen und aktivieren darf, und sorgen Sie dafür, dass Agenten-Konfiguration durch denselben Release-Prozess läuft wie andere Metadaten.
- **Umleitung von Gemini-Modellen.** Anfragen an Gemini 2.5 Pro, Flash und Flash-Lite werden seit dem 20. Oktober 2026 auf neuere Gemini-Modelle umgeleitet. Verlassen sich Prompt Templates oder Agenten auf ein bestimmtes Modell, testen Sie ihre Ergebnisse erneut.
- **Multi-Agent-Orchestrierung ist allgemein verfügbar**, und Agent Script hat Funktionen und `else if`-Ketten bekommen. Beides macht Agentenlogik mächtiger und ist ein Grund mehr, sie wie Code zu reviewen.

## Wie sieht eine praktische Checkliste für Winter '27 aus?

Für ein Release-Team decken diese Schritte das Wesentliche ab:

1. Jede Nutzung von `org display`-Tokens in Pipelines vor dem 28. Oktober finden und beheben.
2. Node.js auf Runnern, Docker-Images und Entwicklerrechnern auf Version 22 bringen.
3. Regeln für Produktionszugriffe vereinbaren, jetzt wo die Developer Console ausgeblendet ist.
4. Klassen und Trigger mit API-Versionen unter 20.0 auflisten und ihre Aktualisierung planen.
5. Prüfen, welche Integrationsuser sich per SOAP anmelden, und ihnen die nötige Berechtigung geben oder sie umstellen.
6. Festlegen, wer Agenten bauen und aktivieren darf, und Agenten-Metadaten versionieren.
7. Prompt Templates und Agenten erneut testen, die von bestimmten Gemini-Modellen abhingen.

Drei Releases pro Jahr bedeuten alle paar Monate eine solche Liste. Eine Pipeline, die jede Änderung durch Validierung und Tests schickt, fängt die meisten dieser Probleme früh ab, und das ist einer der Gründe, [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/). Wenn Sie eine zweite Meinung zu Ihrem Release-Prozess möchten, [schreiben Sie mir](#contact).
