---
title: "Rabattfreigaben in Revenue Cloud: Advanced Approvals"
description: "Wie Sie Rabatt- und Margenfreigaben mit Advanced Approvals in Revenue Cloud gestalten, damit der Vertrieb schnell bleibt, das Controlling Kontrolle behält und jede Entscheidung nachvollziehbar ist."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-rabattfreigaben
translationKey: revenue-cloud-discount-approvals
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Advanced Approvals, Rabatte, Marge, Angebot, CPQ-Migration]
takeaways:
  - "Die Freigabevorschau zeigt derzeit nur konfigurierte Beispielwerte, nicht die echte Kette eines Angebots. Testen Sie Ketten mit echten Einreichungen."
  - "Margenfreigaben brauchen verlässliche Kostendaten an jeder relevanten Angebotsposition, meist aus dem ERP. Sonst geben Sie nach Rabatt und Auftragsgröße frei."
  - "Seit September 2026 reicht der Approval Agent Freigaben ein, verfolgt und fasst sie zusammen. Schwelle und Freigebender kommen aus dem Workflow."
  - "Planen Sie keine Übernahme von Advanced Approvals aus Salesforce CPQ. Gestalten Sie Regeln, Ketten und Freigebende in der Migration neu und testen Sie sie."
faq:
  - q: "Was ist Advanced Approvals in Revenue Cloud?"
    a: "Advanced Approvals ist die Freigabefunktion von Revenue Cloud, die Salesforce jetzt Revenue Management nennt. Sie ist in Revenue Cloud Growth und Advanced enthalten und liefert Invocable Actions für parallele oder sequenzielle Freigabeketten mit detailliertem Audit Trail, auf Basis von Flow Approval Processes und Flow Orchestration."
  - q: "Sieht der Vertrieb vor dem Absenden, wer einen Rabatt freigeben muss?"
    a: "Noch nicht verlässlich. Salesforce dokumentiert eine Vorschau von Freigabe-Workflows, aber laut einem Knowledge-Artikel vom 8. Oktober 2026 zeigt sie nur die Beispielwerte aus Configure Test Output, bei jedem Angebot dieselben. Die echten Freigebenden erscheinen nach dem Absenden. Bis sich das ändert, würde ich die Freigabematrix dort veröffentlichen, wo der Vertrieb sie sehen kann."
  - q: "Kann ich CPQ-Freigaberegeln nach Revenue Cloud migrieren?"
    a: "Planen Sie keine Kopie. CPQ-Freigaben kommen aus dem separaten Paket Advanced Approvals, und laut Salesforce-Hilfe unterscheiden sich die Datenmodelle von CPQ und Revenue Cloud deutlich. Salesforce empfiehlt eine Neugestaltung. Planen Sie Regeln, Ketten und Freigebende als Neubau mit eigenen Testfällen, sofern Ihr Migrationstool nicht das Gegenteil belegt."
  - q: "Sollte ein KI-Agent Rabatte freigeben?"
    a: "Nicht nach eigenem Ermessen. Schwelle und Freigebender sollten aus dem Freigabe-Workflow kommen, die Entscheidung vom Freigebenden. Seit September 2026 können Prüfende mit dem Approval Agent dank KI-Zusammenfassungen schneller freigeben oder ablehnen. Die Entscheidung trifft weiter der Mensch, der Agent führt sie aus."
draft: false
---

In Revenue Cloud laufen Rabatt- und Margenfreigaben über Advanced Approvals: Freigabe-Workflows mit Stufen, seriellen und parallelen Freigebenden und einem Audit Trail, die der Vertrieb am Angebot startet. Halten Sie die Freigabematrix kurz, mit Rabatt, Marge und Auftragsgröße als Auslöser, und machen Sie sie für den Vertrieb sichtbar, denn die Vorschau zeigt derzeit nur Beispielwerte. Margenfreigaben brauchen verlässliche Kostendaten, meist aus dem ERP, an jeder relevanten Angebotsposition. Die Schwellen gehören in Regeln, nie in das Urteil eines Agenten. Wer von Salesforce CPQ kommt, plant Freigaben als Neubau, denn das Paket Advanced Approvals verwendet ein anderes Modell.

## Was ist Advanced Approvals in Revenue Cloud?

Revenue Cloud ist die Quote-to-Cash-Suite von Salesforce auf Standardobjekten; Salesforce nennt sie jetzt Revenue Management, während die Lizenzen weiter Revenue Cloud Growth und Advanced heißen. Ihre Freigabefunktion heißt Advanced Approvals. Laut [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) liefert sie Invocable Actions für "intricate parallel or sequential approval chains" mit "detailed audit trails". Über Business APIs lassen sich die Freigabestufen anzeigen, bevor ein Datensatz eingereicht wird. Verfügbar ist das in Enterprise, Unlimited und Developer Edition mit einer Lizenz für Revenue Cloud Growth oder Advanced, wenn Advanced Approvals aktiviert ist.

```vertiefung Für Admins
titel: Worauf baut Advanced Approvals technisch auf?
Technisch baut es auf Flow Approval Processes auf und wird von Flow Orchestration unterstützt, deren Limits ebenfalls gelten. Laut dem [Datenmodell des Flow Approval Process](https://developer.salesforce.com/docs/platform/data-models/guide/platform-flow-approval-process.html) werden Stufen, Schritte und Entscheidungen im Flow Builder gebaut, jeder Durchlauf erzeugt Approval Submissions und Approval Work Items. [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) ergänzt das um Aktionen für parallele und sequenzielle Freigabeketten. Für Sie heißt das zweierlei. Ein Admin, der Flow und Flow Orchestration kennt, kann die Freigabelogik lesen und ändern. Und jede Freigabe hinterlässt Datensätze, die Reporting und Prüfungen nutzen können.
```

## Wie läuft eine Freigabe am Angebot ab?

Der [Hilfeartikel zu Freigaben im Angebot](https://help.salesforce.com/s/articleView?language=en_US&id=ind.approvals_use_advanced_approvals_in_a_quote.htm&type=5) beschreibt den Ablauf aus Sicht des Vertriebs. Der Vertriebsmitarbeiter speichert das Angebot nach allen Preisänderungen und klickt auf Submit for Approval. Der Workflow startet, die Freigebenden sehen ihre Work Items beim nächsten Login. Im Beispiel von Salesforce gibt ab 25 Prozent Rabatt ein Sales Manager frei, über 50 Prozent zusätzlich ein Vertriebsvorstand.

Um diesen Kern herum dokumentiert derselbe Hilfebereich mehrere Funktionen, die entscheiden, wie schnell sich Freigaben im Alltag anfühlen:

- **Vorschau.** Soll dem Vertrieb vor dem Absenden zeigen, welche Freigabeschritte greifen. Laut einem [Knowledge-Artikel vom 8. Oktober 2026](https://help.salesforce.com/s/articleView?id=005461444&language=en_US&type=1) liefert sie derzeit nur die Beispielwerte aus Configure Test Output, bei jedem Angebot dieselben.
- **Serielle und parallele Freigebende.** Controlling und Vertriebsleitung prüfen gleichzeitig statt nacheinander.
- **Smart Approvals und regelbasierte Auto-Freigaben.** Reicht der Vertrieb ein zurückgerufenes oder abgelehntes Angebot erneut ein, können bereits freigegebene Schritte übersprungen werden, wenn die Bedingungen weiter erfüllt sind.
- **Vertretung.** Freigebende geben ihre Work Items im Urlaub an eine Vertretung ab.
- **Benachrichtigungen in Slack und per E-Mail**, für Freigebende, die nicht täglich in Salesforce arbeiten.

Meine Empfehlung: Machen Sie die Freigebenden ab dem ersten Tag sichtbar, über die Vorschau, sobald sie echte Angebote auswertet, und bis dahin über die veröffentlichte Matrix. Der meiste Ärger mit Freigaben entsteht, wenn der Vertrieb absendet und dann wartet, ohne zu wissen, auf wen.

## Rabatt, Marge und Auftragsgröße als Auslöser

Eine Freigabematrix ist die Tabelle, die festlegt, welche Abweichung welchen Freigebenden braucht. Beschränken Sie sie auf wenige Auslöser, die sich der Vertrieb merken kann. Ein Rechenbeispiel: Ein Komponentenhersteller verkauft Standardteile und konfigurierte Baugruppen über 25 Mitarbeitende im Innendienst. Eine Matrix dafür könnte so aussehen.

| Auslöser | Schwelle | Freigebender |
|---|---|---|
| Rabatt auf Listenpreis | über 15 Prozent | Vertriebsleitung Region |
| Rabatt auf Listenpreis | über 30 Prozent | Vertriebsleitung gesamt |
| Marge je Angebot | unter 25 Prozent | Vertriebscontrolling |
| Auftragsgröße | über 500.000 Euro | Geschäftsführung |
| Zahlungsziel | länger als Standard | Finanzbuchhaltung |

Drei Regeln halten eine solche Matrix handhabbar. Jeder Auslöser hat genau einen Verantwortlichen, der die Schwelle ändern darf. Die Schwellen stehen auch außerhalb von Salesforce schriftlich fest, damit Vertrieb und Controlling über die Regel streiten und nicht über einen Flow. Und jeder neue Auslöser muss sich gegenüber den bestehenden rechtfertigen, sonst wächst die Matrix, bis jedes Angebot drei Unterschriften braucht.

Der Rabatt selbst kommt aus der Preisfindung. Wie Revenue Cloud Listenpreis, Mengenrabatt und manuellen Rabatt nacheinander berechnet, steht in [Salesforce Pricing: Wie Revenue Cloud Preise berechnet](../revenue-cloud-preisprozeduren/). Die Freigabe sollte das Ergebnis dieser Berechnung prüfen und nicht selbst neu rechnen.

## Die Marge braucht Kostendaten aus dem ERP

Eine Margenfreigabe braucht verlässliche Kosten an jeder Angebotsposition, die für die Marge relevant ist. Revenue Cloud hat dafür Felder an der Angebotsposition, etwa für Stückkosten und effektive Marge, aber in der Fertigung liegen die Kosten meist im ERP: Standardkosten oder kalkulierte Kosten je Material im SAP-Controlling. Salesforce kennt sie nicht, solange Sie sie nicht übertragen.

Ich sehe drei Wege und würde den einfachsten wählen, den das Controlling akzeptiert:

1. **Standardkosten je Produkt synchronisieren.** Reicht für Standardteile. Das Controlling entscheidet, wie oft aktualisiert wird.
2. **Kosten auf Anfrage vom ERP berechnen lassen.** Nötig bei konfigurierten Baugruppen, deren Kosten von den Optionen abhängen. Das bedeutet einen API-Aufruf bei der Preisberechnung.
3. **Keine Margenfreigabe.** Nur nach Rabatt und Auftragsgröße freigeben und die Marge nach dem Auftrag im Controlling prüfen. Ehrlich, und besser als ein Margenfeld, dem niemand traut.

Welchen Weg Sie auch wählen, legen Sie fest, wem das Kostenfeld gehört, und sperren Sie es mit Feldberechtigungen. Kann der Vertrieb es ändern, ist die Margenfreigabe Dekoration. Festhalten lässt sich das in meiner [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

## Warum bleiben Freigaberegeln deterministisch, auch mit einem Agenten davor?

Weil die Weiterleitung einer Freigabe eine richtige Antwort hat. Ein Rabatt liegt über 30 Prozent oder nicht, und die Vertriebsleitung ist zuständig oder nicht. Ob die Vertriebsleitung dann freigibt, ist eine Ermessensentscheidung, und die gehört zu einem Menschen. Interpretiert ein Agent die Weiterleitungsregel, kann dasselbe Angebot am Montag einen anderen Weg nehmen als am Dienstag, und der Wirtschaftsprüfer fragt nach dem Grund.

Die Salesforce-Hilfe führt einen Agentforce-Bereich für Advanced Approvals mit drei Subagenten: Approval Management, Search Approval Record und Summarize Multiple Approval Work Items. Seit der Woche vom 14. September 2026 können Vertriebsmitarbeitende mit dem [Approval Agent](https://help.salesforce.com/s/articleView?id=release-notes.rn_rev_agentforce_approvals_agent.htm&type=5) Freigaben einreichen, zurückrufen und verfolgen. Prüfende erhalten KI-Zusammenfassungen und Kommentare und können schneller freigeben oder ablehnen. Dafür müssen Advanced Approvals und Agentforce aktiviert sein. Agentforce for Revenue Management gehört zu Revenue Cloud Advanced, nicht zu Growth. Diese Aufteilung halte ich für vernünftig. Schwelle und Freigebender bleiben im Workflow, die Entscheidung bleibt beim Freigebenden. Denselben Gedanken für Agenten allgemein beschreibe ich in [Agent Script: Warum Geschäftsregeln nicht ins LLM gehören](../agent-script-regeln-statt-llm/).

## Freigaben aus CPQ werden neu gebaut

In Salesforce CPQ kommen Freigaben aus einem separaten Managed Package, Advanced Approvals, mit Freigaberegeln, Bedingungen, Freigebenden und Freigabeketten. Das [Trailhead-Modul für CPQ-Admins](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals) zeigt das Modell: Eine Regel hat mindestens eine Bedingung, etwa einen Partnerrabatt über 20 Prozent, und einen Freigebenden oder eine Gruppe.

Die Namen klingen gleich, aber planen Sie nicht mit einer Übernahme. Die [Salesforce-Hilfe zur Migration](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) sagt, dass sich die Datenmodelle von CPQ und Revenue Cloud "significantly" unterscheiden und Reports und Dashboards auf CPQ-Objekten neu gebaut werden müssen. Sie empfiehlt, den Wechsel als Neugestaltung zu behandeln. Für Freigaben heißt das:

- Jede Freigaberegel und jede Kette wird als Workflow neu gebaut.
- Bedingungen auf CPQ-Angebotsfeldern zeigen auf andere Felder am Standardangebot.
- Die Freigabehistorie bleibt in den CPQ-Objekten, solange das Paket und seine Daten erhalten bleiben; entscheiden Sie, ob Sie sie archivieren, migrieren oder weiter auswerten.
- Jede Regel bekommt einen Testfall mit dem erwarteten Freigebenden, vor und nach dem Go-live.

Ich würde die Migration zum Aufräumen nutzen. In CPQ-Orgs sammeln sich gern Freigaberegeln, die niemand mehr erklären kann. Bauen Sie nur nach, was Vertriebsleitung und Controlling bestätigen. Den ganzen Migrationsweg beschreibt das Kapitel [Von CPQ zu Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

## Die Freigabematrix auf eine Seite schreiben

Schreiben Sie die Freigabematrix auf eine Seite, bevor jemand einen Workflow baut: Auslöser, Schwellen, Verantwortliche und die Quelle der Kostendaten. Bauen Sie dann die Workflows mit parallelen Freigebenden und Vertretung, und testen Sie jede Regel mit einem Angebot, das sie auslösen soll, und einem, das sie nicht auslösen soll. Wie Freigaben in den Weg vom Angebot zum Auftrag passen, zeigt das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/), und ich unterstütze dabei im Rahmen der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
