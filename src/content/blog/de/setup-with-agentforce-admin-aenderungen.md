---
title: "Setup with Agentforce: Admin-KI in Produktion erlauben?"
description: "Setup with Agentforce ändert Felder, Flows und Rechte auf Zuruf. Wie der Admin-Agent in einen geregelten Release-Prozess passt und was in Produktion darf."
pubDate: 2026-10-27
lang: de
slug: setup-with-agentforce-admin-aenderungen
translationKey: setup-with-agentforce-admin-changes
topic: governance
categories: [devops, ai]
tags: [Setup with Agentforce, Einstein for Flow, Release-Management, Governance, DevOps, Maschinenbau]
takeaways:
  - "Setup with Agentforce ist seit Mai 2026 allgemein verfügbar; der Agent legt nach Freigabe durch den Admin Objekte, Felder, Flows, Lightning-Seiten, Permission Sets und Freigaberegeln an."
  - "Die Freigabe klickt dieselbe Person, die gefragt hat; sie ersetzt weder ein Review noch die Pipeline. Metadaten aus dem Agenten gehen über das Repository wie jede andere Änderung."
  - "In Produktion würde ich den Setup-Agenten für Fragen, Zugriffsanalyse und Benutzerverwaltung erlauben und jede Metadatenänderung in Developer-Sandboxes halten."
  - "Der Agent kann nur, was die Rechte des Admins erlauben. Der eigentliche Hebel in Produktion ist deshalb, wer Customize Application hat, nicht wer den Agenten nutzen darf."
  - "Offen lassen die Salesforce-Seiten, ob Flows aus dem Agenten aktiv gespeichert werden, wie der Setup Audit Trail Agentenänderungen kennzeichnet und was Aktionen über 500 pro Monat kosten."
faq:
  - q: "Was ist Setup with Agentforce?"
    a: "Ein Admin-Agent im Salesforce-Setup. Admins beschreiben eine Aufgabe in natürlicher Sprache, der Agent schlägt eine Lösung vor und setzt sie nach Freigabe um, zum Beispiel ein eigenes Objekt mit Feldern, einen Flow, ein Permission Set oder eine Lightning-Seite."
  - q: "Darf Setup with Agentforce in Produktion eingesetzt werden?"
    a: "Für Fragen, Zugriffsanalyse und Benutzerverwaltung wie das Sperren von Benutzern ja. Für Metadatenänderungen wie Felder, Flows, Seiten oder Freigaberegeln würde ich es nicht erlauben: Sie gehören in eine Developer-Sandbox und kommen über Repository und Pipeline in Produktion."
  - q: "Protokolliert Setup with Agentforce seine Änderungen?"
    a: "Laut Trailhead lässt sich jede Änderung des Agenten im Setup Audit Trail nachvollziehen, der mindestens die letzten 180 Tage enthält. Ob ein Eintrag als Agentenänderung gekennzeichnet ist oder nur unter dem Namen des Admins erscheint, steht auf den Seiten, die ich geprüft habe, nicht."
  - q: "Was kostet Setup with Agentforce?"
    a: "Die Produktseite von Salesforce nennt 500 kostenlose Aktionen des Setup-Agenten pro Org und Monat, geteilt über alle Benutzer, und sagt, dass die Nutzung Data 360 Credits verbraucht. Der Admin-Blog nennt Setup-Aktionen nicht abrechnungspflichtig. Einen Preis für Aktionen über dem Kontingent nennen diese Seiten nicht."
  - q: "Was unterscheidet den Setup-Agenten von Einstein for Flow?"
    a: "Einstein for Flow entwirft im Flow Builder aus einem Text einen einzelnen Flow mit etwa sechs Elementen und verbraucht Einstein Requests. Der Setup-Agent arbeitet im ganzen Setup und legt auch Objekte, Berechtigungen und Seiten an."
draft: false
---

Setup with Agentforce und Einstein for Flow gehören in eine Developer-Sandbox: als schneller Weg, Metadaten zu bauen, die danach wie jede andere Änderung über Repository und Pipeline laufen. In Produktion würde ich den Setup-Agenten für Fragen, Zugriffsanalyse und Benutzerverwaltung erlauben und für nichts, was Metadaten anlegt oder ändert. Der Agent fragt vor jeder Aktion nach Freigabe, aber diese Freigabe gibt derselbe Admin, der gefragt hat. Sie ersetzt weder ein zweites Augenpaar noch die Object Ownership Matrix noch das Deployment, das Produktion und Repository gleich hält.

## Was kann der Setup-Agent ändern, und was dokumentiert Salesforce?

Setup with Agentforce ist ein Admin-Agent mit einem Button „Ask Setup Agent“ auf den Setup-Seiten. Salesforce hat am [26. Mai 2026 im Admin-Blog](https://admin.salesforce.com/blog/2026/setup-with-agentforce-is-generally-available) gemeldet, er sei „now Generally Available (GA)“, ohne ein Release zu nennen. Das [Trailhead-Modul für Admins](https://trailhead.salesforce.com/content/learn/modules/setup-with-agentforce-for-admins/get-started-with-setup-with-agentforce) zählt auf, was er kann:

- Zugriffsprobleme von Benutzern analysieren und Benutzer verwalten
- Permission Sets, Permission Set Groups, organisationsweite Standards und Freigaberegeln pflegen
- eigene Objekte und Felder anlegen, Flows erstellen und ändern
- eigene Berichtstypen und Lightning-Seiten anlegen
- Formeln erstellen, ändern und erklären
- Fragen aus der Salesforce-Hilfe beantworten und über Org-Zustand, Nutzung und Lizenzen berichten

Für die Governance zählen drei Aussagen von Salesforce. In derselben Trailhead-Einheit steht: „The agent only takes action when you approve.“ Außerdem hilft der Agent nur bei Aufgaben, für die der Admin selbst die Rechte hat, und jede seiner Änderungen lässt sich im Setup Audit Trail nachvollziehen. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) enthält dieser Trail mindestens die letzten 180 Tage.

Bei den Kosten widersprechen sich die Quellen. Die [Produktseite](https://www.salesforce.com/platform/setup/) nennt 500 kostenlose Aktionen des Setup-Agenten pro Org und Monat, geteilt über alle Benutzer, und sagt, dass die Nutzung Data 360 Credits verbraucht. Der Admin-Blog nennt Setup-Aktionen nicht abrechnungspflichtig; nur die Aktion für Hilfe und Navigation verbrauche etwas Data 360 Credits und solle rund um Dreamforce 2026 auf ein anderes Framework umziehen. Nehmen wir drei Admins mit je 12 Anfragen pro Arbeitstag an: Das sind rund 750 Anfragen im Monat. Zählt jede Anfrage als eine Aktion, was keine Seite definiert, wäre das Kontingent in der dritten Woche aufgebraucht.

Was ich auf keiner der geöffneten Salesforce-Seiten gefunden habe:

- ob Flows, die der Agent baut, aktiv oder inaktiv gespeichert werden
- ob der Setup Audit Trail eine Änderung als Agentenänderung kennzeichnet oder nur den Namen des Admins zeigt
- ob sich Verhalten oder Kontingent zwischen Sandbox und Produktion unterscheiden
- was eine Aktion über den 500 kostet und ob die Umstellung bei Data 360 nach Dreamforce stattgefunden hat

Ein unabhängiger Test lohnt einen Blick. Andy Engin Utkan hat den Agenten für [Salesforce Break im Juli 2026](https://salesforcebreak.com/2026/07/07/setup-with-agentforce-review/) in einer Produktions-Org ausprobiert. Benutzer mit View All Data oder Modify All Data konnte der Agent nicht auflisten, sein Urteil: „This feature launched before it was fully baked.“ Das ist der Test eines einzelnen Autors, und die Flow-Erstellung hat er nicht geprüft. Den Überblick über alle Werkzeuge gibt das Masterclass-Kapitel zu [Salesforce-Werkzeugen für KI-Entwicklung](../../masterclass/ki-salesforce/salesforce-werkzeuge-ki-entwicklung/).

Einstein for Flow ist das engere Werkzeug. Laut [Salesforce Ben](https://www.salesforceben.com/einstein-for-flow-now-generally-available-tutorial-and-first-steps/) ist es seit Spring '25 GA, entwirft Flows mit bis zu etwa sechs Elementen, braucht die Berechtigung Manage Flows und verbraucht Einstein Requests in Produktion und Sandboxes. Der Entwurf wird nicht automatisch gespeichert.

## Warum bricht eine Agentenänderung in Produktion den Release-Prozess?

Ein geregeltes Salesforce-Programm beruht auf einer Regel: In Produktion steht, was im Repository steht, und jede Änderung kommt über die Pipeline dorthin. Warum, beschreibe ich in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/). Ein Feld, ein Flow oder eine Lightning-Seite, direkt in Produktion angelegt, bricht diese Regel, egal ob ein Mensch klickt oder ein Agent.

Der Agent verschärft das auf drei Wegen:

- **Tempo.** Ein Datenmodell mit sieben Feldern und einem Flow dauert Minuten. Pro Woche erreichen mehr direkte Änderungen die Produktion, und jede ist eine Abweichung zwischen Repository und Org.
- **Die Freigabe sieht aus wie ein Review.** Der Admin, der den Prompt geschrieben hat, bestätigt auch den Vorschlag. Niemand sonst prüft, ob das Objekt laut [Object Ownership Matrix](../object-ownership-matrix-salesforce/) einem anderen Stream gehört, ob auf dem Objekt schon ein Flow läuft oder ob das Permission Set zu weit geht.
- **Der Audit Trail zeigt was, nicht warum.** Er zeigt die Änderung und einen Zeitstempel. User Story, Reviewer oder Test fehlen, und nach 180 Tagen brauchen Sie einen eigenen Export.

Dann kommt das nächste Deployment. Ein Partner deployt eine Lightning-Datensatzseite aus dem Repository, und das in Produktion ergänzte Feld verschwindet von der Seite. Die Validierung der Pipeline läuft gegen eine Sandbox ohne den neuen Flow und testet damit eine andere Org als die, in die sie deployt.

## Sollte der Setup-Agent in Produktion erlaubt sein?

Ja, für einen festgelegten Teil seiner Arbeit. Ich trenne danach, ob eine Aktion Metadaten erzeugt, die ins Repository gehören.

| Aktion | Produktion | Developer-Sandbox |
|---|---|---|
| Fragen, Hilfe, Org-Zustand, Lizenznutzung | erlaubt | erlaubt |
| Analysieren, warum ein Benutzer einen Datensatz nicht sieht | erlaubt | erlaubt |
| Benutzer sperren, Passwort zurücksetzen, vorhandenes Permission Set zuweisen | erlaubt wie bisher | erlaubt |
| Neues Permission Set, Freigaberegel, organisationsweiter Standard | nicht erlaubt | erlaubt, dann Pipeline |
| Objekte, Felder, Formeln, Berichtstypen | nicht erlaubt | erlaubt, dann Pipeline |
| Flows, Lightning-Seiten | nicht erlaubt | erlaubt, dann Pipeline |

Benutzerverwaltung passiert in den meisten Orgs ohnehin in Produktion und läuft nie über ein Repository. Alles darunter sind Metadaten und folgt dem Release-Prozess.

Durchsetzen lässt sich das über Berechtigungen, nicht über ein Richtliniendokument. Salesforce sagt, der Agent kann nur, was der Admin darf. Die Frage lautet also, wer in Produktion Customize Application und vergleichbare Rechte hat. Haben sie nur der Release-User und ein Notfall-Admin, kann kein anderer Admin den Setup-Agenten in Produktion einen Flow bauen lassen, was auch immer der Button anbietet.

## Ein typisches Szenario: ein Feld für die Garantieverlängerung vor der Messe

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für die Techniker im Außendienst und SAP als ERP an. Alle Zahlen sind Annahmen. Zwei Partner arbeiten an der Org: Partner A gehört laut Ownership Matrix das Objekt Asset, Partner B das Objekt Work Order. Drei interne Admins kümmern sich in Produktion um Benutzer und kleine Anfragen.

Die Serviceleitung möchte, dass die Hotline vor einer Messekampagne auf der Anlagenseite ein Datum „Garantie verlängert bis“ sieht. An einem Dienstag bittet eine Administratorin den Setup-Agenten in Produktion um das Feld, einen Platz auf der Asset-Datensatzseite und einen datensatzgesteuerten Flow, der das Datum aus dem Servicevertrag füllt. Der Agent schlägt die Lösung vor, die Administratorin bestätigt, nach zehn Minuten ist alles da.

Am Donnerstag deployt Partner A sein Sprint-Release, darin die Asset-Datensatzseite aus dem Repository. Das neue Feld verschwindet von der Seite. Der Flow läuft weiter, neben dem Flow von Partner A, der das Garantieende schon aus dem Installationsdatum berechnet. In der Woche darauf nennt die Hotline einem Händler zwei verschiedene Garantiedaten. Der Setup Audit Trail zeigt die Änderungen, aber kein Ticket und keinen Grund.

Dieselbe Anfrage in einer Developer-Sandbox mit Source Tracking hätte ebenfalls zehn Minuten gedauert. Die Administratorin holt die Änderungen in einen Branch, öffnet einen Pull Request, Partner A prüft ihn als Owner von Asset und führt die beiden Flows zu einem zusammen. Das Feld kommt mit dem nächsten Release in Produktion, rund eine Woche später.

## Wo sollten Sie anfangen?

1. **Die Regel aufschreiben.** Metadatenänderungen kommen nur über die Pipeline in Produktion, egal ob ein Mensch, ein Partner oder ein Agent sie gebaut hat. Sie gehört neben die Ownership Matrix.
2. **Rechte in Produktion prüfen.** Listen Sie auf, wer Customize Application und vergleichbare Berechtigungen hat. Genau diese Liste erbt der Setup-Agent.
3. **Den Agenten zuerst in Developer-Sandboxes aktivieren.** [Source Tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) gibt es nur in Developer- und Developer-Pro-Sandboxes; dort lassen sich Agentenänderungen abrufen und landen in einem Pull Request.
4. **Dieselben Prüfungen anwenden.** Flows und Felder aus dem Agenten bestehen dieselben Prüfungen wie Partnercode, wie in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) beschrieben.
5. **Den Audit Trail lesen.** Prüfen Sie den Setup Audit Trail der Produktion wöchentlich auf Änderungen, die nicht vom Release-User stammen, und exportieren Sie ihn, bevor die 180 Tage ablaufen.
6. **Den Verbrauch beobachten.** Verfolgen Sie die Nutzung gegen die 500 Aktionen und lassen Sie sich von Salesforce schriftlich bestätigen, wie Aktionen darüber abgerechnet werden.

Wenn Release-Prozess und Rechtemodell die Admin-KI abdecken sollen, ist das Teil von [DevOps und Release-Management](../../leistungen/devops-und-release-management/). Der Setup-Agent ist ein schneller Weg, Metadaten zu bauen, und ein schlechter Weg, sie auszurollen; wenn Sie diese Grenze in Ihrer Org ziehen möchten, [schreiben Sie mir](#contact).
