---
title: "Salesforce Field Service: Nutzen und Lizenzen"
description: "Wann sich Salesforce Field Service für Hersteller rechnet, welche Rolle welche Lizenz braucht, was Add-ons kosten und wie ein Auftrag zum Techniker kommt."
lang: de
slug: field-service-lohnt-sich-lizenzen
course: field-service
translationKey: fsl-01
chapter: 1
short: "Nutzen und Lizenzen"
summary: "Wann sich Salesforce Field Service für Hersteller rechnet, welche Rolle welche Lizenz braucht und wie ein Auftrag vom Case zum Techniker kommt."
takeaways:
  - "Salesforce Field Service rechnet sich vor allem bei vielen kurzen Einsätzen pro Techniker und Tag, hohem Fahrzeitanteil und vielen Skills, die zum Auftrag passen müssen."
  - "Dispatcher und Technician kosten laut Preisliste vom Oktober 2026 je 175 € pro Nutzer und Monat, Field Service Plus 230 € und Contractor Plus 80 € pro Nutzer oder 32 € pro Login."
  - "Dispatcher- und Technician-Lizenzen dürfen nicht für Contact Center oder Case Management genutzt werden. Wer Cases bearbeitet und auch disponiert, braucht Field Service Plus."
  - "Ein Auftrag läuft über Case, Arbeitsauftrag, Positionen und Serviceauftrag; Wartungspläne erzeugen Arbeitsaufträge ohne Case, und beide landen in derselben Disposition."
  - "Agentforce 1 Field Service für 650 € lohnt sich nur, wenn Sie Slack, Tableau Next und Data Cloud ohnehin kaufen würden; aus Einzelteilen kostet der Kern 430 Dollar."
articles: [field-service-worth-it, field-service-licences-by-role, agentforce-1-field-service-bundle, field-service-case-to-work-order, salesforce-licence-types]
faq:
  - q: "Was kostet Salesforce Field Service pro Techniker?"
    a: "Laut Preisliste vom Oktober 2026 kostet die Technician-Lizenz 175 € pro Nutzer und Monat in der Enterprise Edition bei jährlichem Vertrag, in der Unlimited Edition 330 Dollar. Dazu kommen mindestens eine Dispatcher-Lizenz und eine Service-Cloud-Lizenz in der Org."
  - q: "Darf ein Disponent mit Dispatcher-Lizenz auch die Hotline machen?"
    a: "Nein. Laut Preisliste dürfen Dispatcher und Technician nicht für Contact Center, Call Center oder Case Management genutzt werden. Wer Cases bearbeitet und disponiert, braucht Field Service Plus für 230 €."
  - q: "Wann lohnt sich Contractor Plus pro Login statt pro Nutzer?"
    a: "80 € pro Nutzer geteilt durch 32 € pro Login ergibt 2,5. Ein Partnertechniker, der sich höchstens zweimal im Monat anmeldet, ist pro Login günstiger, ab drei Logins pro Monat die Nutzerlizenz."
  - q: "Wann reicht Salesforce Field Service nicht oder ist zu viel?"
    a: "Bei wenigen langen Einsätzen wie mehrwöchigen Inbetriebnahmen bringt die Optimierung wenig. Dann prüfe ich zuerst Service Cloud ohne Field-Service-Lizenzen, ein Portal für Partner oder die Planung im ERP."
draft: false
---

Salesforce Field Service rechnet sich für Hersteller, deren Techniker viele kurze Einsätze pro Tag fahren, mit hohem Fahrzeitanteil und vielen Skills, die passen müssen. Bei wenigen langen Einsätzen wie Inbetriebnahmen über Wochen bringt die Optimierung wenig. Die Lizenz folgt der Rolle: Disponenten bekommen Dispatcher, eigene Techniker Technician, je 175 € pro Nutzer und Monat. Wer Cases bearbeitet und auch disponiert, braucht Field Service Plus für 230 €, Partnertechniker bekommen Contractor Plus. Bevor ein Partner baut, sollten vier Kennzahlen, der Weg vom Case zum Techniker und eine Lizenzmatrix nach Rollen feststehen.

## Was ist Salesforce Field Service heute?

Salesforce Field Service ist das Außendienstprodukt auf Basis von Service Cloud. Salesforce verkauft es heute als Field Service and Operations, so heißt auch die [Preisseite](https://www.salesforce.com/de/products/field-service/pricing). Das Produkt deckt vier Bereiche ab:

- **Terminplanung.** Eine Scheduling Engine wählt für jeden Serviceauftrag einen passenden Techniker und ein Zeitfenster. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies) filtern Work Rules ungeeignete Techniker heraus, etwa wegen eines fehlenden Skills, und Service Objectives bewerten die übrigen, etwa nach kürzester Fahrzeit. Zusammen bilden sie eine Scheduling Policy.
- **Mobile App.** Techniker sehen ihre Einsätze, Assets und die Historie, auch offline, und erfassen Zeiten, Teile, Fotos und Unterschriften.
- **Assets und Wartung.** Maschinen sind Assets mit Seriennummer, Wartungspläne erzeugen Aufträge nach Kalender oder Nutzung.
- **Dokumente.** Serviceberichte entstehen direkt aus der App.

Service Cloud ist Pflicht: Laut Preisliste braucht jede Org mit Field Service mindestens eine Service-Cloud-Nutzerlizenz. Die vier Bereiche sind die Ebenen dieser Masterclass. Terminplanung folgt in Kapitel 2, die App in Kapitel 3, Assets und Teile in Kapitel 4, KI-Agenten und Einführung in Kapitel 5.

## Wann rechnet sich Field Service für Hersteller?

Optimierung hilft dort, wo es viel zu optimieren gibt. Ich frage vor jeder Produktdiskussion nach vier Zahlen aus dem eigenen Außendienst:

1. **Einsätze pro Techniker und Tag.** Liegt der Schnitt deutlich über eins, gibt es etwas zu planen.
2. **Anteil der Fahrzeit an der Arbeitszeit.** Je höher, desto mehr bringt die Routenoptimierung.
3. **Zahl der Skills und Teile, die passen müssen.** Je mehr, desto schwerer wird die Planung von Hand.
4. **Erstlösungsquote**, also wie oft ein Einsatz beim ersten Besuch erledigt ist. Ist sie niedrig, weil Teile oder Skills fehlen, hilft bessere Planung direkt.

Wartung, Reparaturen und Inspektionen mit mehreren Kunden pro Tag sind der beste Fall. Ein Techniker, der zwei Wochen eine Anlage in Betrieb nimmt, braucht Zeichnungen, einen Projektplan und eine saubere Abnahme; Routenoptimierung hilft ihm wenig.

Kennt niemand die vier Zahlen, fehlt die Grundlage für jeden Business Case. Die Kriterien im Detail und die Rechnung mit 40 Technikern stehen in [Salesforce Field Service: Wann lohnt es sich?](../../../blog/salesforce-field-service-lohnt-sich/).

## Wie kommt ein Auftrag vom Case zum Techniker?

Eine Kundenanfrage läuft in Salesforce über vier Datensätze, bevor ein Techniker losfährt. Der [Field Service Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) beschreibt die Kernobjekte so:

| Datensatz | Was er hält | Wer ihn anlegt |
|---|---|---|
| Case | Das Problem des Kunden und die Kommunikation | Hotline, Kundenportal oder Agent |
| Arbeitsauftrag (Work Order) | Die Arbeit, die erledigt werden muss | Hotline aus dem Case oder ein Wartungsplan |
| Position (Work Order Line Item) | Teilschritte wie Tausch, Kalibrierung, Probelauf | Hotline, Arbeitstyp oder Techniker vor Ort |
| Serviceauftrag (Service Appointment) | Der Besuch, der geplant und zugewiesen wird | automatisch über den Arbeitstyp |

Ein Arbeitstyp (Work Type) ist die Vorlage für eine Art von Einsatz, etwa Jahreswartung, Störungsbehebung oder Inbetriebnahme. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_center/field_service_center_worktypes) trägt er die geschätzte Dauer und die nötigen Skills. Mit der Option Auto-Create Service Appointment entsteht bei jedem Arbeitsauftrag mit diesem Arbeitstyp automatisch ein Serviceauftrag. Ohne diese Option legt ihn jemand von Hand an, und genau dieser Schritt wird vergessen.

Geplante Wartung kommt durch eine andere Tür. Wartungspläne erzeugen Arbeitsaufträge ohne Case, laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders) manuell oder automatisch dreimal am Tag. Geplante und ungeplante Arbeit landen damit in derselben Disposition und konkurrieren um dieselben Techniker. Wer entscheidet, welcher Wartungstermin für einen Maschinenstillstand weichen muss, gehört vor dem Start festgelegt.

Nicht jeder Case braucht einen Techniker. Ich empfehle eine kurze Triage an der Hotline: Fernhilfe, Teileversand oder Einsatz. Erst beim Einsatz entsteht ein Arbeitsauftrag. Den ganzen Weg eines Stillstandsanrufs beschreibt [Field Service Arbeitsauftrag: vom Case zum Techniker](../../../blog/field-service-case-zu-arbeitsauftrag/).

## Welche Rolle braucht welche Lizenz?

Die [Preisliste](https://www.salesforce.com/de/products/field-service/pricing) nennt im Oktober 2026 diese Preise pro Nutzer und Monat, für die Enterprise Edition bei jährlichem Vertrag:

| Lizenz | Für wen | Listenpreis |
|---|---|---|
| Dispatcher | Disponenten, die planen und zuweisen | 175 € |
| Technician | Eigene Techniker mit der mobilen App | 175 € |
| Field Service Plus | Alles aus Dispatcher und Technician, dazu Case Management | 230 € |
| Contractor Plus | Techniker von Servicepartnern | 80 € pro Nutzer oder 32 € pro Login |
| Agentforce 1 Field Service | Field Service Plus mit KI, Credits und weiteren Produkten | 650 € |

In der Unlimited Edition kosten Dispatcher und Technician laut Fußnote 330 Dollar, die Plus-Variante 380 Dollar. Wichtiger als die Preise sind drei Regeln aus dem Kleingedruckten:

1. Jede Org braucht mindestens eine Service-Cloud-Nutzerlizenz.
2. Techniker und Contractors brauchen mindestens eine Dispatcher-Lizenz in der Org.
3. Dispatcher und Technician dürfen nicht für Contact Center, Call Center oder Case Management genutzt werden. Field Service Plus darf das.

Die Matrix baue ich aus dem, was jemand im System tut, nicht aus der Stellenbezeichnung. Die Hotline, die nur Cases bearbeitet, bekommt Service Cloud. Die [Service-Cloud-Preisseite](https://www.salesforce.com/de/service/pricing/) nennt Core für 195 €, und die [US-Seite](https://www.salesforce.com/service/pricing/) schreibt, dass Core die Enterprise Edition ersetzt. Disponenten bekommen Dispatcher, eigene Techniker Technician. Das Backoffice prüfe ich am genauesten: Wer nur im ERP fakturiert, braucht gar keine Salesforce-Lizenz, und wer Berichte liest, kommt vielleicht mit einer günstigeren aus. Wie Sie das prüfen, ohne Standardfunktionen nachzubauen, steht in [Braucht jeder eine volle Lizenz?](../../../blog/salesforce-lizenzen-volle-lizenz/).

### Field Service Plus oder Service Cloud plus Dispatcher?

In kleineren Serviceteams nehmen oft dieselben Leute morgens die Störungshotline an und planen nachmittags die Techniker. Mit einer Dispatcher-Lizenz verstößt das gegen die Lizenzbedingungen, auch wenn das System den Case technisch öffnen lässt. Für diese Mischrolle nennt die Preisliste Field Service Plus. Gegenüber Service Cloud Core kostet sie 35 € mehr pro Monat, und dieser Unterschied kauft das Recht zu disponieren. Trennen Sie Hotline und Disposition sauber, reichen Service Cloud für die einen und Dispatcher für die anderen.

### Contractor Plus pro Nutzer oder pro Login?

80 € geteilt durch 32 € ergibt 2,5. Ein Partnertechniker, der sich dreimal oder öfter im Monat anmeldet, ist mit der Nutzerlizenz günstiger, darunter gewinnt die Abrechnung pro Login. Die Preisseite verweist für loginbasierte Contractor-Lizenzen an den Vertrieb, deshalb würde ich die Zählregel ins Bestellformular schreiben lassen. Contractor-Lizenzen sind für das Personal Ihrer Servicepartner gedacht; eigene Leute darauf zu setzen, um zu sparen, würde ich nicht riskieren. Die ganze Rollenmatrix mit einer Jahresrechnung steht in [Field Service Lizenzen: Welche Rolle braucht welche?](../../../blog/field-service-lizenzen-rollen-dispatcher-techniker/).

## Welche Add-ons gibt es, und wann lohnt das Agentforce-1-Paket?

Die Preisseite listet fünf Add-ons, auf der deutschen Seite in Dollar:

| Add-on | Was es laut Preisseite tut | Listenpreis |
|---|---|---|
| Agentforce for Field Service and Operations | KI-Agenten im Arbeitsablauf der Mitarbeitenden | 125 Dollar pro Nutzer und Monat |
| Asset Service Lifecycle Management | Lebenszyklus der installierten Basis, vom Angebot für Arbeitsaufträge bis zu Servicekampagnen | 75 Dollar pro Nutzer und Monat |
| Visual Remote Assistant | Videohilfe für Kunden statt Einsatz | 50 Dollar pro Nutzer und Monat |
| Appointment Assistant | Echtzeit-Updates zum Termin für Kunden | 25 Dollar pro Nutzer und Monat |
| Connected Assets | Proaktive Wartung mit externen Daten und Event Orchestration | 15.000 Dollar pro Org und Monat |

Agentforce 1 Field Service für 650 € enthält laut Preisseite Field Service Plus, unbegrenzte Agentforce-Nutzung für Mitarbeitende, Appointment Assistant, Visual Remote Assistant, Digital Channels, Slack und Tableau Next sowie 1 Million Flex Credits und 2,5 Millionen Data-Cloud-Credits pro Org und Jahr. Aus Einzelteilen kosten Field Service Plus und die drei Add-ons für Agentforce, Visual Remote Assistant und Appointment Assistant 430 Dollar. Das Paket kostet also 220 Dollar mehr pro Nutzer und Monat, und die Credits pro Org decken diesen Aufpreis nur für etwa zwei Nutzer.

Meine Regel: Das Paket lohnt sich, wenn Slack, Tableau Next, Digital Channels und Data Cloud für dieselben Nutzer ohnehin gekauft würden. Für Techniker, die nur das KI-Add-on brauchen, gewinnen Einzellizenzen klar. Die Rechnung mit 50 Nutzern und einem Buchungsagenten steht in [Agentforce 1 Field Service: Wann rechnet sich das Paket?](../../../blog/agentforce-1-field-service-paket-rechnung/), wie Flex Credits grundsätzlich funktionieren, im Kapitel [KI-Kosten: Token, Flex Credits, Budget](../../ki-salesforce/kosten-und-token/) der KI-Masterclass.

## Wo ist Salesforce Field Service nicht die richtige Antwort?

Nicht jeder Außendienst braucht ein Planungsprodukt. Drei Alternativen prüfe ich vor jeder Lizenz:

- **Das Servicemodul im ERP**, wenn Aufträge, Teile und Abrechnung dort ohnehin laufen und die Techniker wenige, lange Einsätze haben.
- **Ein schlankes Planungswerkzeug** neben dem CRM, wenn nur die Disposition fehlt und Assets, Verträge und Historie anderswo sauber gepflegt sind.
- **Service Cloud ohne Field-Service-Lizenzen**, wenn vor allem Case-Bearbeitung und Dokumentation fehlen und Termine einfach vereinbart werden.

Zwei Grenzen zu anderen Salesforce-Produkten sollten Sie vor dem Angebot kennen. Bearbeitet dieselbe Serviceorganisation Garantieansprüche von Händlern, kommt Manufacturing Cloud for Service ins Spiel; wo die Garantie endet und Field Service beginnt, klärt das Kapitel [Garantie und After-Sales](../../manufacturing-cloud/garantie-und-after-sales/) der Manufacturing-Cloud-Masterclass. Werden Wartungsverträge als wiederkehrender Umsatz verkauft und abgerechnet, ist das ein Thema für Revenue Cloud, eingeordnet im [Überblick zu Revenue Cloud](../../revenue-cloud/revenue-cloud-ueberblick/).

## Ein typisches Szenario, als Annahme: die Lizenzrechnung eines Komponentenherstellers

Ein Komponentenhersteller hat drei Mitarbeitende, die Hotline und Disposition gemeinsam machen, zwei reine Disponenten, 25 eigene Techniker, eine Person im Backoffice, die Verträge pflegt, und einen Servicepartner mit vier Technikern. Alle Zahlen sind Annahmen, die Preise Listenpreise vom Oktober 2026.

| Rolle | Anzahl | Lizenz | Pro Monat |
|---|---|---|---|
| Hotline und Disposition | 3 | Field Service Plus zu 230 € | 690 € |
| Disponenten | 2 | Dispatcher zu 175 € | 350 € |
| Eigene Techniker | 25 | Technician zu 175 € | 4.375 € |
| Backoffice | 1 | Service Cloud Core zu 195 € | 195 € |
| Partnertechniker | 4 | Contractor Plus pro Nutzer zu 80 € | 320 € |

Das sind 5.930 € im Monat und 71.160 € im Jahr zum Listenpreis, Implementierung und ERP-Schnittstelle nicht eingerechnet. Die Partnertechniker melden sich je etwa dreimal im Monat an. Pro Login wären das 12 Logins zu 32 €, also 384 € statt 320 €. Bei dieser Nutzung gewinnt die Nutzerlizenz knapp, bei zwei Logins pro Kopf wäre es umgekehrt.

Soll die Hotline zusätzlich einen KI-Agenten bekommen, kosten die fünf Büroarbeitsplätze mit dem Agentforce-Add-on 625 Dollar mehr im Monat. Dieselben fünf Plätze auf Agentforce 1 Field Service kosten 3.250 € im Monat. Aus Einzelteilen sind es 1.040 € für Field Service Plus und Dispatcher plus 625 Dollar für das Add-on, das die deutsche Seite nur in Dollar nennt. Ohne geplanten Bedarf für Slack, Tableau Next und Data Cloud spricht hier nichts für das Paket.

## Was sollten Sie entscheiden, bevor ein Partner baut?

- **Die vier Zahlen** für eine Region und einen Monat: Einsätze pro Tag, Fahrzeitanteil, Skills, Erstlösungsquote.
- **Den Weg vom Case zum Techniker** für Ihre drei häufigsten Anrufarten, mit Triage und dem Eigentümer jedes Datensatzes.
- **Wer Cases bearbeitet und wer disponiert.** Daraus folgt, wer Field Service Plus braucht.
- **Wie Partner arbeiten.** Regelmäßige Partnertechniker mit Nutzerlizenz, gelegentliche pro Login, mit schriftlicher Zählregel.
- **Welche Add-ons im ersten Jahr wirklich genutzt werden**, pro Rolle statt für alle.
- **Eine Lizenzprognose über drei Jahre** nach Rollen und Einführungswellen, damit Sie nicht am ersten Tag 45 Technikerlizenzen kaufen, wenn die erste Welle 15 hat.

Diese Liste ist Teil meiner Arbeit unter [Make-or-buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/), vor der Verhandlung und unabhängig von Hersteller und Partner. Steht der Business Case, geht es um die Planung selbst: Stammdaten, Scheduling Policies und die neue Konsole behandelt [Kapitel 2: Terminplanung und Disposition](../field-service-terminplanung-disposition/). Alle Kapitel finden Sie auf der [Übersichtsseite](../).

Field Service rechnet sich mit vielen kurzen Einsätzen und einer Lizenzmatrix, die aus den Rollen folgt; wenn Sie Ihre Zahlen oder Ihr Angebot unabhängig prüfen lassen möchten, [schreiben Sie mir](#contact).
