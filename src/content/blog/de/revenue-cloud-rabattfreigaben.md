---
title: "Rabattfreigaben in Revenue Cloud: Advanced Approvals"
description: "Wie Sie Rabatt- und Margenfreigaben mit Advanced Approvals in Revenue Cloud aufsetzen, damit der Vertrieb schnell bleibt und das Controlling Kontrolle behält."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-rabattfreigaben
translationKey: revenue-cloud-discount-approvals
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Advanced Approvals, Rabatte, Marge, Angebot, CPQ-Migration]
takeaways:
  - "Rabattfreigaben laufen in Revenue Cloud über Advanced Approvals: Freigabe-Workflows mit Stufen und Schritten, seriellen und parallelen Freigebenden und einem Audit Trail, gestartet am Angebot."
  - "Eine Vorschau über die Business APIs von Advanced Approvals zeigt die Freigabestufen vor dem Absenden, damit niemand raten muss, wer gefragt wird."
  - "Margenfreigaben funktionieren nur, wenn Kostendaten aus dem ERP an jeder Angebotsposition stehen; ohne sie geben Sie nur nach Rabatt und Auftragsgröße frei."
  - "Freigaberegeln bleiben deterministisch: Ein Agent darf Freigaben einreichen, zusammenfassen oder suchen, Schwelle und Freigebender kommen aber aus dem Workflow."
  - "Das Advanced-Approvals-Paket von Salesforce CPQ wird nicht nach Revenue Cloud übernommen; Regeln, Ketten und Freigebende werden in der Migration neu gebaut und getestet."
faq:
  - q: "Was ist Advanced Approvals in Revenue Cloud?"
    a: "Advanced Approvals ist die Freigabefunktion von Revenue Cloud, im Developer Guide Revenue Management genannt. Sie liefert Invocable Actions für parallele oder sequenzielle Freigabeketten mit detailliertem Audit Trail und Business APIs, die Freigabestufen vor dem Absenden anzeigen."
  - q: "Sieht der Vertrieb vor dem Absenden, wer einen Rabatt freigeben muss?"
    a: "Ja. Salesforce dokumentiert eine Vorschau von Freigabe-Workflows, und die Business APIs liefern Freigabestufen und Details vor dem Absenden. Ich würde diese Vorschau am Angebot anzeigen, damit der Vertrieb Freigebende und Wartezeit kennt."
  - q: "Kann ich CPQ-Freigaberegeln nach Revenue Cloud migrieren?"
    a: "Nicht als Kopie. CPQ-Freigaben kommen aus dem separaten Paket Advanced Approvals, und laut Salesforce-Hilfe unterscheiden sich die Datenmodelle von CPQ und Revenue Cloud deutlich. Planen Sie Regeln, Ketten und Freigebende als Neubau mit eigenen Testfällen."
  - q: "Sollte ein KI-Agent Rabatte freigeben?"
    a: "Nein. Schwelle und Freigebender sollten aus dem Freigabe-Workflow kommen. Die Salesforce-Hilfe nennt Agentforce-Subagenten zum Verwalten, Suchen und Zusammenfassen von Freigaben. Die helfen Freigebenden beim Arbeiten, ohne die Entscheidung ins Modell zu verlagern."
draft: false
---

In Revenue Cloud laufen Rabatt- und Margenfreigaben über Advanced Approvals: Freigabe-Workflows mit Stufen, seriellen und parallelen Freigebenden und einem Audit Trail, die der Vertrieb am Angebot startet. Halten Sie die Freigabematrix kurz, mit Rabatt, Marge und Auftragsgröße als Auslöser, und lassen Sie die Vorschau die Freigebenden vor dem Absenden zeigen. Margenfreigaben brauchen Kostendaten aus dem ERP an jeder Angebotsposition. Die Schwellen gehören in Regeln, nie in das Urteil eines Agenten. Wer von Salesforce CPQ kommt, plant Freigaben als Neubau, denn das Paket Advanced Approvals wird nicht übernommen.

## Was ist Advanced Approvals in Revenue Cloud?

Revenue Cloud ist die Quote-to-Cash-Suite von Salesforce auf Standardobjekten; Hilfe und Developer Guide nennen sie derzeit Revenue Management. Ihre Freigabefunktion heißt Advanced Approvals. Laut [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) liefert sie Invocable Actions für "intricate parallel or sequential approval chains" mit "detailed audit trails". Über Business APIs lassen sich die Freigabestufen anzeigen, bevor ein Datensatz eingereicht wird. Verfügbar ist das in Enterprise, Unlimited und Developer Edition, wenn Advanced Approvals aktiviert ist.

Technisch steht es auf dem Freigabemodell von Flow. Salesforce dokumentiert [Flow Approval Process und Advanced Approvals](https://developer.salesforce.com/docs/platform/data-models/guide/flow-approval-process-and-advanced-approvals.html) in einem gemeinsamen Datenmodell: Stufen, Schritte und Entscheidungen werden im Flow Builder gebaut, jeder Durchlauf erzeugt Approval Submissions und Approval Work Items. Für Sie heißt das zweierlei. Ein Admin, der Flow kennt, kann die Freigabelogik lesen und ändern. Und jede Freigabe hinterlässt Datensätze, die Reporting und Prüfungen nutzen können.

## Wie läuft eine Freigabe am Angebot ab?

Der [Hilfeartikel zu Freigaben im Angebot](https://help.salesforce.com/s/articleView?language=en_US&id=ind.approvals_use_advanced_approvals_in_a_quote.htm&type=5) beschreibt den Ablauf aus Sicht des Vertriebs. Der Vertriebsmitarbeiter speichert das Angebot nach allen Preisänderungen und klickt auf Submit for Approval. Der Workflow startet, die Freigebenden sehen ihre Work Items beim nächsten Login. Im Beispiel von Salesforce gibt ab 25 Prozent Rabatt ein Sales Manager frei, über 50 Prozent zusätzlich ein Vertriebsvorstand.

Um diesen Kern herum dokumentiert derselbe Hilfebereich mehrere Funktionen, die entscheiden, wie schnell sich Freigaben im Alltag anfühlen:

- **Vorschau.** Der Vertrieb sieht vor dem Absenden, welche Freigabeschritte greifen.
- **Serielle und parallele Freigebende.** Controlling und Vertriebsleitung prüfen gleichzeitig statt nacheinander.
- **Smart Approvals und regelbasierte Auto-Freigaben.** Einreichungen, die definierte Bedingungen erfüllen, werden automatisch freigegeben.
- **Vertretung.** Freigebende geben ihre Work Items im Urlaub an eine Vertretung ab.
- **Benachrichtigungen in Slack und per E-Mail**, für Freigebende, die nicht täglich in Salesforce arbeiten.

Meine Empfehlung: Nutzen Sie die Vorschau ab dem ersten Tag. Der meiste Ärger mit Freigaben entsteht, wenn der Vertrieb absendet und dann wartet, ohne zu wissen, auf wen.

## Welche Freigabematrix passt zu einem Hersteller?

Eine Freigabematrix ist die Tabelle, die festlegt, welche Abweichung welchen Freigebenden braucht. Beschränken Sie sie auf wenige Auslöser, die sich der Vertrieb merken kann. Ein typisches Szenario, als Annahme: Ein Komponentenhersteller verkauft Standardteile und konfigurierte Baugruppen über 25 Mitarbeitende im Innendienst. Eine Matrix dafür könnte so aussehen.

| Auslöser | Schwelle | Freigebender |
|---|---|---|
| Rabatt auf Listenpreis | über 15 Prozent | Vertriebsleitung Region |
| Rabatt auf Listenpreis | über 30 Prozent | Vertriebsleitung gesamt |
| Marge je Angebot | unter 25 Prozent | Vertriebscontrolling |
| Auftragsgröße | über 500.000 Euro | Geschäftsführung |
| Zahlungsziel | länger als Standard | Finanzbuchhaltung |

Drei Regeln halten eine solche Matrix handhabbar. Jeder Auslöser hat genau einen Verantwortlichen, der die Schwelle ändern darf. Die Schwellen stehen auch außerhalb von Salesforce schriftlich fest, damit Vertrieb und Controlling über die Regel streiten und nicht über einen Flow. Und jeder neue Auslöser ersetzt einen alten, sonst wächst die Matrix, bis jedes Angebot drei Unterschriften braucht.

Der Rabatt selbst kommt aus der Preisfindung. Wie Revenue Cloud Listenpreis, Mengenrabatt und manuellen Rabatt nacheinander berechnet, steht in [Salesforce Pricing: Wie Revenue Cloud Preise berechnet](../revenue-cloud-preisprozeduren/). Die Freigabe sollte das Ergebnis dieser Berechnung prüfen und nicht selbst neu rechnen.

## Woher kommt die Marge für eine Freigabe?

Eine Margenfreigabe braucht Kosten je Angebotsposition. In der Fertigung liegen diese Kosten im ERP: Standardkosten oder kalkulierte Kosten je Material im SAP-Controlling. Salesforce kennt sie nicht, solange Sie sie nicht übertragen.

Ich sehe drei Wege und würde den einfachsten wählen, den das Controlling akzeptiert:

1. **Standardkosten je Produkt synchronisieren.** Reicht für Standardteile. Das Controlling entscheidet, wie oft aktualisiert wird.
2. **Kosten auf Anfrage vom ERP berechnen lassen.** Nötig bei konfigurierten Baugruppen, deren Kosten von den Optionen abhängen. Das bedeutet einen API-Aufruf bei der Preisberechnung.
3. **Keine Margenfreigabe.** Nur nach Rabatt und Auftragsgröße freigeben und die Marge nach dem Auftrag im Controlling prüfen. Ehrlich, und besser als ein Margenfeld, dem niemand traut.

Welchen Weg Sie auch wählen, legen Sie fest, wem das Kostenfeld gehört. Kann der Vertrieb es ändern, ist die Margenfreigabe Dekoration. Festhalten lässt sich das in meiner [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

## Warum bleiben Freigaberegeln deterministisch, auch mit einem Agenten davor?

Weil eine Freigabe eine richtige Antwort hat. Ein Rabatt liegt über 30 Prozent oder nicht, und die Vertriebsleitung ist zuständig oder nicht. Interpretiert ein Agent diese Regel, kann dasselbe Angebot am Montag einen anderen Weg nehmen als am Dienstag, und der Wirtschaftsprüfer fragt nach dem Grund.

Die Salesforce-Hilfe führt einen Agentforce-Bereich für Advanced Approvals mit drei Subagenten: Approval Management, Search Approval Record und Summarize Multiple Approval Work Items. Diese Aufteilung halte ich für vernünftig. Der Agent hilft Freigebenden, ihre Work Items zu finden und zu verstehen, und dem Vertrieb, seine Einreichungen zu verfolgen. Schwelle und Freigebender bleiben im Workflow. Denselben Gedanken für Agenten allgemein beschreibe ich in [Agent Script: Warum Geschäftsregeln nicht ins LLM gehören](../agent-script-regeln-statt-llm/).

Zusammenfassungen von Drittanbietern zu Winter '27 erwähnen außerdem einen Freigabe-Agenten für den Vertrieb. Die Release Notes zu Revenue Cloud konnte ich dafür nicht öffnen, prüfen Sie sie also, bevor Sie damit planen.

## Was ändert sich, wenn Sie Freigaben aus CPQ migrieren?

In Salesforce CPQ kommen Freigaben aus einem separaten Managed Package, Advanced Approvals, mit Freigaberegeln, Bedingungen, Freigebenden und Freigabeketten. Das [Trailhead-Modul für CPQ-Admins](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals) zeigt das Modell: Eine Regel hat mindestens eine Bedingung, etwa einen Partnerrabatt über 20 Prozent, und einen Freigebenden oder eine Gruppe.

Die Namen klingen gleich, übernommen wird trotzdem nichts. Die [Salesforce-Hilfe zur Migration](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) sagt, dass sich die Datenmodelle von CPQ und Revenue Cloud "significantly" unterscheiden und Reports und Dashboards auf CPQ-Objekten neu gebaut werden müssen. Für Freigaben heißt das:

- Jede Freigaberegel und jede Kette wird als Workflow neu gebaut.
- Bedingungen auf CPQ-Angebotsfeldern zeigen auf andere Felder am Standardangebot.
- Die Freigabehistorie bleibt in den CPQ-Objekten; entscheiden Sie, ob Sie sie archivieren oder weiter auswerten.
- Jede Regel bekommt einen Testfall mit dem erwarteten Freigebenden, vor und nach dem Go-live.

Ich würde die Migration zum Aufräumen nutzen. In CPQ-Orgs sammeln sich gern Freigaberegeln, die niemand mehr erklären kann. Bauen Sie nur nach, was Vertriebsleitung und Controlling bestätigen. Den ganzen Migrationsweg beschreibt das Kapitel [Von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

## Wo starten Sie?

Schreiben Sie die Freigabematrix auf eine Seite, bevor jemand einen Workflow baut: Auslöser, Schwellen, Verantwortliche und die Quelle der Kostendaten. Bauen Sie dann die Workflows mit Vorschau, parallelen Freigebenden und Vertretung, und testen Sie jede Regel mit einem Angebot, das sie auslösen soll, und einem, das sie nicht auslösen soll. Wie Freigaben in den Weg vom Angebot zum Auftrag passen, zeigt das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/), und ich unterstütze dabei im Rahmen der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Eine kurze Freigabematrix mit klaren Verantwortlichen hält den Vertrieb schnell und gibt dem Controlling Kontrolle. Wenn Sie eine zweite Meinung zu Ihrer Matrix möchten, [schreiben Sie mir](#contact).
