---
title: "Salesforce Winter '27: Was sich für CI/CD-Pipelines ändert"
description: "Rund um Winter '27 zeigt die Salesforce CLI keine Tokens mehr, Apex-Limits steigen, die Developer Console ist ausgeblendet, API-Abschaltungen rücken näher."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-winter-27-aenderungen-pipeline
translationKey: salesforce-winter-27-pipeline
topic: release
categories: [devops]
tags: [Release-Management, DevOps, Salesforce CLI, Winter 27, Apex]
takeaways:
  - "Seit CLI 2.156.8 (28. Oktober 2026) zeigt org display auch mit der Übergangslösung keine Access Tokens mehr; Skripte, die sie daraus lesen, schlagen fehl."
  - "Die Salesforce CLI braucht jetzt Node.js 22 oder neuer. npm-Installationen und eigene CI-Images brauchen ein Update; die Installer bringen Node.js 24 mit."
  - "Die Developer Console ist im Setup standardmäßig ausgeblendet und im Wartungsmodus. In der neuen Web Console ist Apex in Produktion nur lesbar."
  - "Die Apex-Heap-Limits steigen automatisch von 6 auf 10 MB für synchronen und von 12 auf 25 MB für asynchronen Code."
  - "SOAP login() braucht ab 1. Dezember 2026 eine neue Berechtigung, und inaktive Orgs verlieren SOAP login() ab 15. Dezember 2026."
faq:
  - q: "Was ändert sich in der Salesforce CLI mit Winter '27?"
    a: "Genau genommen handelt es sich dabei um CLI-Releases, die wöchentlich erscheinen, und nicht um einen Teil des Plattform-Releases. Seit CLI 2.136.8 (27. Mai 2026) gibt org display keine Secrets wie das Access Token mehr aus, und CLI 2.156.8 hat die Übergangslösung am 28. Oktober 2026 entfernt. Secrets geben jetzt nur noch die Befehle sf org auth show-* aus. Außerdem braucht die CLI Node.js 22 oder neuer; die Installer bringen Node.js 24 mit."
  - q: "Wird die Developer Console mit Winter '27 entfernt?"
    a: "Nein. Sie erscheint standardmäßig nicht mehr im Setup-Menü und ist im Wartungsmodus, ein Admin kann sie aber wieder einschalten. Salesforce sieht die neue Web Console als Nachfolger; in Produktions-Orgs ist Apex dort nur lesbar."
  - q: "Muss ich für die höheren Apex-Heap-Limits etwas tun?"
    a: "Nein. Die neuen Limits von 10 MB für synchronen und 25 MB für asynchronen Apex-Code gelten automatisch. Trotzdem lohnt es sich, Code zu prüfen, der auf die alten Limits zugeschnitten wurde."
  - q: "Welche API-Versionen sind von den Abschaltungen aus Winter '27 betroffen?"
    a: "SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt mit Summer '27, und die SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 erhalten ab Summer '27 keine Updates mehr und werden mit Summer '28 abgeschaltet."
---

Winter '27 ist seit Oktober 2026 vollständig ausgerollt, und zusammen mit den wöchentlichen CLI-Releases rundherum bringt es Änderungen, die eine CI/CD-Pipeline brechen können. Am dringendsten: Seit 28. Oktober gibt die Salesforce CLI mit org display auch mit der alten Übergangslösung keine Access Tokens mehr aus, und die CLI braucht jetzt Node.js 22. Dazu ist die Developer Console im Setup-Menü ausgeblendet, die Apex-Heap-Limits steigen und die ersten API-Abschaltungen sind wenige Wochen entfernt. Die CLI-Änderungen können CI schon jetzt brechen, die API-Termine können später die Integrationen gefährden. Diese Übersicht basiert auf dem [Entwickler-Leitfaden von Salesforce zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) und ist nach Dringlichkeit sortiert.

## Was bricht in einer Salesforce-Pipeline zuerst?

Zwei CLI-Änderungen brauchen vor allem anderen Aufmerksamkeit.

**Der Befehl org display gibt keine Secrets mehr aus.** Viele Pipelines und Hilfsskripte rufen sf org display auf und lesen das Access Token aus der Ausgabe, etwa um die REST-API direkt aufzurufen oder die Session an ein anderes Tool weiterzugeben. Seit CLI-Version 2.136.8 vom 27. Mai 2026 zeigt der Befehl keine Secrets mehr. Salesforce hat eine Übergangslösung über die Umgebungsvariable SF_TEMP_SHOW_SECRETS angeboten und sie mit [CLI-Version 2.156.8](https://github.com/forcedotcom/cli/blob/main/releasenotes/README.md) am 28. Oktober 2026 entfernt. Die CLI-Releases erscheinen wöchentlich, diese Änderungen hängen also nicht am Plattform-Release; sie treffen jeden Runner, der die CLI aktualisiert. Wer ein Secret gezielt lesen muss, nutzt laut Release Notes die Befehle sf org auth show-\*.

```hinweis achtung
Die Übergangslösung ist mit CLI 2.156.8 am 28. Oktober 2026 ausgelaufen. Auf jedem Runner mit dieser oder einer neueren Version schlagen Skripte fehl, die sich auf das Token in der Ausgabe von org display verlassen, auch wenn SF_TEMP_SHOW_SECRETS gesetzt ist.
```

Was zu tun ist:

1. Durchsuchen Sie Pipeline-Definitionen, Skripte und Repositories nach org display und nach dem Auslesen von accessToken.
2. Lassen Sie jeden Pipeline-Job sich direkt authentifizieren, am besten mit dem JWT Bearer Flow: Der private Schlüssel liegt im Secret Store der CI-Plattform, das passende Zertifikat in der External Client App; Tokens werden nicht zwischen Schritten weitergereicht.
3. Testen Sie die geänderten Jobs in einem Feature-Branch, zuerst die Jobs, die seit dem CLI-Update fehlschlagen.

![Pipeline-Authentifizierung ab 28. Oktober 2026: Pipelines, die sf org display aufrufen, das accessToken lesen und weiterreichen, brechen, weil der Befehl keine Secrets mehr zeigt und die Übergangslösung SF_TEMP_SHOW_SECRETS am 28. Oktober 2026 endet. Der Ansatz funktioniert, wenn sich jeder Pipeline-Job selbst authentifiziert, mit dem JWT Bearer Flow und einem Zertifikat im Secret Store des Kunden, keine Tokens zwischen Schritten weitergereicht werden und die geänderten Jobs zuerst in einem Feature-Branch getestet werden. Außerdem prüfen, dass die Salesforce CLI mit Node.js 22 oder neuer läuft.](../../../assets/blog/winter-27-org-display-de.png)

**Die CLI braucht Node.js 22 oder neuer.** Das ist dort relevant, wo die CLI per npm installiert wird oder in einem selbst gebauten Image läuft: Hat ein solcher Runner noch eine ältere Node-Version, schlägt die Installation oder das Update der CLI fehl. Die Installer für die Betriebssysteme bringen ihre eigene Laufzeit mit, derzeit Node.js 24. Prüfen Sie die Basis-Images Ihrer Pipeline, die Setup-Schritte gehosteter Runner und die Rechner Ihrer Entwickler. Prüfen Sie auch Tools, die auf der Salesforce CLI aufbauen, wie [sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/).

## Die Developer Console ist im Setup ausgeblendet

Mit Winter '27 erscheint die Developer Console standardmäßig nicht mehr im Setup-Menü. Laut [Release Note](https://help.salesforce.com/s/articleView?id=release-notes.rn_developer_console.htm&language=en_US&type=5) ist sie im Wartungsmodus, erhält nur noch Fixes für schwere Sicherheitslücken, und ein Admin kann sie wieder einschalten. Ihr Nachfolger ist die Web Console, die allgemein verfügbar ist. In Produktions-Orgs ist Apex in der Web Console nur lesbar.

Für gut geführte Programme ändert sich damit wenig. Code direkt in der Produktion zu ändern oder Ad-hoc-Änderungen dort auszuführen, war schon immer ein Risiko: kein Review, keine Historie, kein Weg zurück. Die neue Voreinstellung unterstützt die Vorgehensweise, die ohnehin richtig ist: Jede Code- und Metadatenänderung gehört ins Repository, wird in einem Pull Request geprüft und über die Pipeline deployt. Warum das wichtig ist, erkläre ich in [warum Pull-Request-Reviews in Großprojekten Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Manche Teams nutzen die Developer Console noch für schnelle Abfragen, Log-Analysen oder anonymes Apex in der Produktion. Für diese Gewohnheiten braucht es jetzt einen Ersatz. Legen Sie fest, welche Aufgaben in der Produktion erlaubt sind, wer sie ausführen darf und wie sie dokumentiert werden.

## Was ändert sich bei Apex und LWC?

Mehrere Änderungen helfen Entwicklern, einige davon automatisch:

- **Höhere Heap-Limits.** Das Apex-Heap-Limit steigt von 6 auf 10 MB für synchronen und von 12 auf 25 MB für asynchronen Code. Das gilt automatisch. Batch- oder asynchronen Code würde ich nicht nur wegen des höheren Limits umbauen, denn Transaktionsgrenzen und Fehlerbehandlung ändern sich mit. Prüfen Sie ihn mit Performancetests, wenn Sie ihn ohnehin anfassen.
- **Warnungen für sehr alte API-Versionen.** Der Compiler warnt jetzt bei Klassen und Triggern, die mit den API-Versionen 9.0 bis 19.0 gespeichert sind. In älteren Enterprise-Orgs gibt es solche Klassen noch. Sie sind gute Kandidaten zum Aufräumen.
- **Neue Apex-Funktionen in Preview und Beta.** Integrationstests gibt es als Developer Preview. FORMULA() in SOQL, die Apex Symbol API und Cursor für Data-360-Objekte sind als Beta verfügbar. Beta-Funktionen sollten nicht ohne bewusste Entscheidung in Produktionscode gelangen.
- **LWC-Verbesserungen.** Komplexe Template-Ausdrücke, lwc:external für Web Components von Drittanbietern und refresh() für State Manager sind allgemein verfügbar.
- **CLI-Vorlagen.** Die CLI hat neue Vorlagen für Batchable- und Queueable-Klassen und neue Debug-Optionen für apex run.

## Welche API-Abschaltungen stehen als Nächstes an?

Winter '27 bringt die API-Version 68.0. Keine der folgenden Abschaltungen greift bereits, die ersten sind aber nur noch Wochen entfernt und betreffen Integrationen stärker als die Pipeline selbst. Die SOAP-Termine stehen im [Artikel zur Abschaltung von SOAP login()](https://help.salesforce.com/s/articleView?id=005132110&language=en_US&type=1):

```zeitleiste
2026-12-01 | Der SOAP-Aufruf login() braucht die Berechtigung „Use Any API Auth“
2026-12-15 | Sandboxes: SOAP login() abgeschaltet in Orgs ohne SOAP-login()-Aufruf in den letzten sechs Monaten; breite Login-IP-Bereiche brauchen ein Security Token
2027-01-31 | Produktion: dieselben zwei Regeln für SOAP login()
2027-02-20 | Der OAuth Username-Password Flow endet
Summer '27 | SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt
Summer '27 | SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 erhalten keine Updates mehr
Summer '28 | SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 fallen aus
```

Die Berechtigung deckt nur den 1. Dezember ab. Selten laufende Jobs, etwa Jahresläufe oder Notfallprozesse, brauchen vor dem 15. Dezember eine Prüfung, denn die Sechs-Monats-Prüfung findet einmalig statt. Zusammen mit dem Ende des Username-Password Flow ist das echte Arbeit für Integrationsteams. Die Bestandsaufnahme und Umstellung beschreibe ich in [Salesforce: Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).

## Was Release Manager außerdem wissen sollten

Drei kleinere Punkte mit Auswirkungen auf die Governance:

- **Die Agentforce-Plattform ist in Orgs, deren Lizenzen schon Agentforce-Zugriff enthalten, standardmäßig eingeschaltet**. Legen Sie fest, wer Agenten bauen und aktivieren darf, und sorgen Sie dafür, dass Agenten-Konfiguration denselben Release-Prozess durchläuft wie andere Metadaten.
- **Umleitung von Gemini-Modellen.** Ab der Woche des 20. Oktober 2026 hat Salesforce Anfragen an Gemini 2.5 Pro, Flash und Flash-Lite auf neuere Gemini-Modelle umgeleitet. Verlassen sich Prompt Templates oder Agenten auf ein bestimmtes Modell, testen Sie ihre Ergebnisse erneut.
- **Multi-Agent-Orchestrierung ist allgemein verfügbar** (Rollout seit August, die Agentforce-Release-Notes werden monatlich ergänzt), und Agent Script hat Funktionen und else if-Ketten erhalten. Beides macht Agentenlogik leistungsfähiger und ist ein Grund mehr, sie wie Code zu reviewen.

## Checkliste für Winter '27, beginnend mit den Token-Skripten

Bei drei Releases pro Jahr entsteht alle paar Monate eine solche Liste. Eine Pipeline, die jede Änderung validiert und testet, fängt die meisten dieser Probleme früh ab, und das ist einer der Gründe, [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/). Für ein Release-Team decken diese Schritte das Wesentliche ab:

1. Jede Nutzung von Tokens aus org display in Pipelines finden und beheben; Jobs, die sich noch darauf verlassen, schlagen ab CLI 2.156.8 fehl.
2. Node.js auf Version 22 oder neuer bringen, überall dort, wo die CLI per npm oder in eigenen Images installiert wird.
3. Regeln für Produktionszugriffe vereinbaren, jetzt wo die Developer Console ausgeblendet ist.
4. Klassen und Trigger mit API-Versionen unter 20.0 auflisten und ihre Aktualisierung planen.
5. Prüfen, welche Integrationsuser sich per SOAP anmelden: die zum 1. Dezember erforderliche Berechtigung vergeben, selten laufende Jobs und breite IP-Bereiche vor dem 15. Dezember prüfen, Umstellung vor Summer '27 planen.
6. Festlegen, wer Agenten bauen und aktivieren darf, und Agenten-Metadaten versionieren.
7. Prompt Templates und Agenten, die von bestimmten Gemini-Modellen abhingen, erneut testen.
