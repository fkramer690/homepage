---
title: "Setup with Agentforce: Admin-KI in Produktion erlauben?"
description: "Setup with Agentforce ändert Felder, Flows und Rechte auf Zuruf. Wie der Admin-Agent in einen geregelten Release-Prozess passt und was in Produktion darf."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: setup-with-agentforce-admin-aenderungen
translationKey: setup-with-agentforce-admin-changes
topic: governance
categories: [devops, ai]
tags: [Setup with Agentforce, Agentforce for Flow, Release-Management, Governance, DevOps, Maschinenbau]
takeaways:
  - "Seit Mai 2026 legt der Setup-Agent nach Freigabe Objekte, Felder, Flows, Lightning-Seiten, Permission Sets und Freigaberegeln an."
  - "Die Freigabe klickt dieselbe Person, die gefragt hat. Metadaten aus dem Agenten gehen deshalb über Repository und Pipeline wie jede andere Änderung."
  - "In Produktion würde ich den Setup-Agenten für Fragen, Zugriffsanalyse und Benutzerverwaltung erlauben und jede Metadatenänderung in Developer-Sandboxes halten."
  - "Der Agent kann nur, was der Admin darf. In Produktion zählt, wer Manage Flows, Customize Application und ähnliche Rechte hat."
  - "Der Audit Trail nennt Admin und Agent. 500 Gratisaktionen pro Monat gelten nur mit Flex Credits, sonst werden Einstein Requests verbraucht."
faq:
  - q: "Was ist Setup with Agentforce?"
    a: "Ein Admin-Agent im Salesforce-Setup. Admins beschreiben eine Aufgabe in natürlicher Sprache, der Agent schlägt eine Lösung vor und setzt sie nach Freigabe um, zum Beispiel ein eigenes Objekt mit Feldern, einen Flow, ein Permission Set oder eine Lightning-Seite."
  - q: "Darf Setup with Agentforce in Produktion eingesetzt werden?"
    a: "Für Fragen, Zugriffsanalyse und Benutzerverwaltung wie das Sperren von Benutzern ja. Für Metadatenänderungen wie Felder, Flows, Seiten oder Freigaberegeln würde ich es nicht erlauben: Sie gehören in eine Developer-Sandbox und kommen über Repository und Pipeline in Produktion."
  - q: "Protokolliert Setup with Agentforce seine Änderungen?"
    a: "Ja. Laut Salesforce-Hilfe erscheinen unterstützte Setup-Änderungen durch den Agenten im Setup Audit Trail mit dem Admin in der Spalte User und Name und ID des Agenten in der Spalte AI Agent. Einträge werden nach 180 Tagen gelöscht. Exportieren Sie sie, wenn Sie sie länger brauchen."
  - q: "Was kostet Setup with Agentforce?"
    a: "Laut Salesforce-Hilfe erhalten Orgs mit dem Add-on Flex Credits 500 kostenlose Aktionen des Setup-Agenten pro Monat, geteilt über alle Benutzer. Ohne dieses Add-on werden Einstein Requests verbraucht und es gibt keine kostenlosen Aktionen. In beiden Fällen werden Data 360 Credits verbraucht. Salesforce bezeichnet die 500 als vertragliches Limit, das technisch möglicherweise nicht durchgesetzt wird. Sie müssen es deshalb selbst überwachen."
  - q: "Was unterscheidet den Setup-Agenten von Agentforce for Flow?"
    a: "Agentforce for Flow, früher Einstein for Flow, arbeitet im Flow Builder: Es entwirft Flows aus einem Text, fasst Flows zusammen und ändert bestehende Flows per Prompt. Es ist in der Beta und setzt die Edition Foundations oder Agentforce 1 mit Data 360 voraus. Der Setup-Agent arbeitet im ganzen Setup und legt auch Objekte, Berechtigungen und Seiten an."
draft: false
---

Setup with Agentforce und Agentforce for Flow gehören in eine Developer-Sandbox: als schneller Weg, Metadaten zu bauen, die danach wie jede andere Änderung über Repository und Pipeline laufen. In Produktion würde ich den Setup-Agenten für Fragen, Zugriffsanalyse und Benutzerverwaltung erlauben und für nichts, was Metadaten anlegt oder ändert. Der Agent fragt vor jeder Aktion nach Freigabe, aber diese Freigabe gibt derselbe Admin, der gefragt hat. Sie ersetzt weder ein zweites Augenpaar noch die Object Ownership Matrix noch das Deployment, das Produktion und Repository gleich hält.

## Was kann der Setup-Agent ändern, und was dokumentiert Salesforce?

Setup with Agentforce ist ein Admin-Agent mit einem Button „Ask Setup Agent“ auf den Setup-Seiten. Salesforce hat am [26. Mai 2026 im Admin-Blog](https://admin.salesforce.com/blog/2026/setup-with-agentforce-is-generally-available) gemeldet, er sei „now Generally Available (GA)“, ohne ein Release zu nennen. Das [Trailhead-Modul für Admins](https://trailhead.salesforce.com/content/learn/modules/setup-with-agentforce-for-admins/get-started-with-setup-with-agentforce) zählt auf, was er kann:

- Zugriffsprobleme von Benutzern analysieren und Benutzer verwalten
- Permission Sets, Permission Set Groups, organisationsweite Standards und Freigaberegeln pflegen
- eigene Objekte und Felder anlegen; automatisch gestartete, datensatzgesteuerte und zeitplangesteuerte Flows erstellen
- eigene Berichtstypen und neue Lightning-Datensatzseiten anlegen, die Sie anschließend im Lightning App Builder bearbeiten und aktivieren
- Formeln erstellen, ändern und erklären
- Fragen aus der Salesforce-Hilfe beantworten und über Org-Zustand, Nutzung und Lizenzen berichten

Für die Governance zählen drei Aussagen von Salesforce. In derselben Trailhead-Einheit steht: „The agent only takes action when you approve.“ Außerdem hilft der Agent nur bei Aufgaben, für die der Admin selbst die Rechte hat, und seine Änderungen lassen sich im Setup Audit Trail nachvollziehen. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=admin_monitorsetup.htm&language=en_US&type=5) zeigt der Trail den Admin in der Spalte User und Name und ID des Agenten in der Spalte AI Agent und löscht Einträge nach 180 Tagen.

Bei den Kosten ist die [Nutzungsseite in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=xcloud.setup_agentforce_usage.htm&language=en_US&type=5) genauer als der ältere Admin-Blog, der Setup-Aktionen als nicht abrechnungspflichtig bezeichnete. Orgs mit dem Add-on Flex Credits erhalten 500 kostenlose Aktionen des Setup-Agenten pro Monat, geteilt über alle Benutzer. Ohne dieses Add-on werden Einstein Requests verbraucht und es gibt keine kostenlosen Aktionen. In beiden Fällen werden Data 360 Credits verbraucht. Salesforce bezeichnet die 500 als vertragliches Limit, das „may not be enforced in the Services as a technical matter“. Die Überwachung liegt also bei Ihnen. Wenn drei Admins den Agenten täglich nutzen, kann dieses Kontingent innerhalb eines Monats aufgebraucht sein.

```hinweis offen
Auf keiner der geöffneten Salesforce-Seiten habe ich gefunden, ob Flows, die der Agent baut, aktiv oder inaktiv gespeichert werden und ob sich Verhalten oder Kontingent zwischen Sandbox und Produktion unterscheiden.
```

Ein unabhängiger Test lohnt einen Blick. Andy Engin Utkan hat den Agenten für [Salesforce Break im Juli 2026](https://salesforcebreak.com/2026/07/07/setup-with-agentforce-review/) in einer Produktions-Org ausprobiert. Damals konnte der Agent Benutzer mit View All Data oder Modify All Data nicht auflisten, sein Urteil: „This feature launched before it was fully baked.“ Das ist der Test eines einzelnen Autors vom Juli, die Flow-Erstellung hat er nicht geprüft und das Produkt hat sich seitdem geändert. Den Überblick über alle Werkzeuge gibt das Masterclass-Kapitel zu [Salesforce-Werkzeugen für KI-Entwicklung](../../masterclass/ki-salesforce/salesforce-werkzeuge-ki-entwicklung/).

Agentforce for Flow, früher Einstein for Flow, ist das engere Werkzeug. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.flow_build_let_einstein_help_you_build_flows.htm&language=en_US&type=5) entwirft es im Flow Builder Flows aus einem Text, fasst Flows zusammen und ändert bestehende Flows per Prompt. Die Hilfe kennzeichnet es als Beta und setzt die Edition Foundations oder Agentforce 1 mit aktiviertem Data 360 voraus. Ein Entwurf wird nicht automatisch gespeichert.

## Eine Agentenänderung in Produktion bricht den Release-Prozess

Ein geregeltes Salesforce-Programm beruht auf einer Regel: In Produktion steht, was im Repository steht, und jede Änderung kommt über die Pipeline dorthin. Warum, beschreibe ich in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/). Ein Feld, ein Flow oder eine Lightning-Seite, direkt in Produktion angelegt, bricht diese Regel, egal ob ein Mensch klickt oder ein Agent.

Der Agent verschärft das auf drei Wegen:

- **Tempo.** Ein Datenmodell mit sieben Feldern und einem Flow dauert Minuten. Pro Woche erreichen mehr direkte Änderungen die Produktion, und jede ist eine Abweichung zwischen Repository und Org.
- **Die Freigabe sieht aus wie ein Review.** Der Admin, der den Prompt geschrieben hat, bestätigt auch den Vorschlag. Niemand sonst prüft, ob das Objekt laut [Object Ownership Matrix](../object-ownership-matrix-salesforce/) einem anderen Stream gehört, ob auf dem Objekt schon ein Flow läuft oder ob das Permission Set zu weit geht.
- **Der Audit Trail zeigt was, nicht warum.** Er zeigt die unterstützte Setup-Änderung, Admin, Agent und einen Zeitstempel. User Story, Reviewer oder Test fehlen, und nach 180 Tagen brauchen Sie einen eigenen Export.

Dann kommt das nächste Deployment. Ein Partner deployt eine Lightning-Datensatzseite und ihre Aktivierung aus dem Repository, und die in Produktion erstellte Seite verliert ihre Zuweisung. Die Validierung der Pipeline läuft gegen eine Sandbox ohne den neuen Flow und testet damit eine andere Org als die, in die sie deployt.

## Sollte der Setup-Agent in Produktion erlaubt sein?

Ja, für einen festgelegten Teil seiner Arbeit. Ich trenne danach, ob eine Aktion Metadaten erzeugt, die ins Repository gehören.

| Aktion | Produktion | Developer-Sandbox |
|---|---|---|
| Fragen, Hilfe, Org-Zustand, Lizenznutzung | erlaubt | erlaubt |
| Analysieren, warum ein Benutzer einen Datensatz nicht sieht | als erste Diagnose erlaubt, Antwort prüfen | erlaubt |
| Benutzer sperren, Passwort zurücksetzen, vorhandenes Permission Set zuweisen | für einzelne Benutzer erlaubt wie bisher | erlaubt |
| Massenänderungen an Benutzern, Profiländerungen, Admin-Rechte | nur mit Ticket und einer zweiten Person | erlaubt |
| Neues Permission Set, Freigaberegel, organisationsweiter Standard | nicht erlaubt | erlaubt, dann Pipeline |
| Objekte, Felder, Formeln, Berichtstypen | nicht erlaubt | erlaubt, dann Pipeline |
| Flows, Lightning-Seiten | nicht erlaubt | erlaubt, dann Pipeline |

Routinemäßige Benutzerverwaltung passiert in den meisten Orgs ohnehin in Produktion und läuft nie über ein Repository. Die Salesforce-Hilfe nennt Grenzen der Zugriffsanalyse, zum Beispiel bei Freigaben mit Controlled by Parent. Behandeln Sie ihre Antworten deshalb als Diagnose, nicht als Sicherheitsentscheidung. Alles darunter sind Metadaten und folgt dem Release-Prozess.

Durchsetzen lässt sich das über Berechtigungen, nicht über ein Richtliniendokument. Salesforce sagt, der Agent kann nur, was der Admin darf. Die Frage lautet also, wer in Produktion die aufgabenspezifischen Rechte hat: Manage Flows für Flows, Customize Application für Objekte und Felder, Manage Profiles and Permission Sets, Manage Sharing und die Rechte zur Benutzerverwaltung. Haben die Metadatenrechte nur der Release-User und ein Notfall-Admin, kann kein anderer Admin den Setup-Agenten in Produktion einen Flow bauen lassen, was auch immer der Button anbietet. Wer den Agenten überhaupt nutzen darf, wird über die Permission Set Group Setup with Agentforce User gesteuert.

## Rechenbeispiel: ein Feld für die Garantieverlängerung vor der Messe

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für die Techniker im Außendienst und SAP als ERP an. Alle Zahlen sind Annahmen. Zwei Partner arbeiten an der Org: Partner A gehört laut Ownership Matrix das Objekt Asset, Partner B das Objekt Work Order. Drei interne Admins kümmern sich in Produktion um Benutzer und kleine Anfragen.

Die Serviceleitung möchte, dass die Hotline vor einer Messekampagne auf der Anlagenseite ein Datum „Garantie verlängert bis“ sieht. An einem Dienstag bittet eine Administratorin den Setup-Agenten in Produktion um das Feld, eine neue Asset-Datensatzseite, die es zeigt, und einen datensatzgesteuerten Flow, der das Datum aus dem Servicevertrag füllt. Der Agent schlägt die Lösung vor, die Administratorin bestätigt, aktiviert die Seite im Lightning App Builder und den Flow im Flow Builder, nach fünfzehn Minuten ist alles da.

Am Donnerstag deployt Partner A sein Sprint-Release, darin die Asset-Datensatzseite und ihre Aktivierung aus dem Repository. Die Hotline sieht wieder die Seite von Partner A, ohne das neue Feld. Der Flow läuft weiter, neben dem Flow von Partner A, der das Garantieende schon aus dem Installationsdatum berechnet. In der Woche darauf nennt die Hotline einem Händler zwei verschiedene Garantiedaten. Der Setup Audit Trail zeigt die Änderungen, aber kein Ticket und keinen Grund.

Dieselbe Anfrage in einer Developer-Sandbox mit Source Tracking hätte ebenfalls fünfzehn Minuten gedauert. Die Administratorin holt die Änderungen in einen Branch, öffnet einen Pull Request, Partner A prüft ihn als Owner von Asset und führt die beiden Flows zu einem zusammen. Das Feld kommt mit dem nächsten Release in Produktion, rund eine Woche später.

## Die Pipeline-Regel neben die Ownership Matrix schreiben

Release-Prozess und Rechtemodell für Admin-KI aufzusetzen ist Teil meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/). Die Reihenfolge folgt den Rechten: Was ein Admin in Produktion nicht darf, kann auch der Agent dort nicht.

```schritte
Die Regel aufschreiben
  Metadatenänderungen kommen nur über die Pipeline in Produktion, egal ob ein Mensch, ein Partner oder ein Agent sie gebaut hat. Sie gehört neben die Ownership Matrix.
Rechte in Produktion prüfen
  Listen Sie auf, wer Manage Flows, Customize Application und vergleichbare Berechtigungen hat. Genau diese Liste erbt der Setup-Agent.
Erst in Developer-Sandboxes
  Aktivieren Sie den Agenten zuerst in Developer-Sandboxes. [Source Tracking](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-setup-enable-source-tracking-sandboxes.html) gibt es nur in Developer- und Developer-Pro-Sandboxes; dort lassen sich unterstützte Metadatenänderungen des Agenten abrufen und landen in einem Pull Request.
Dieselben Prüfungen anwenden
  Flows und Felder aus dem Agenten bestehen dieselben Prüfungen wie Partnercode, wie in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) beschrieben.
Den Audit Trail lesen
  Prüfen Sie den Setup Audit Trail der Produktion wöchentlich auf Änderungen, die nicht vom Release-User stammen, filtern Sie nach der Spalte AI Agent und exportieren Sie ihn, bevor die 180 Tage ablaufen.
Den Verbrauch beobachten
  Verfolgen Sie die Nutzung gegen die 500 Aktionen, wenn Sie Flex Credits haben, andernfalls gegen Ihre Einstein Requests, und lassen Sie sich von Salesforce schriftlich bestätigen, wie Aktionen darüber abgerechnet werden.
```
