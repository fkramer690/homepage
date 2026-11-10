---
title: "Field Service Arbeitsauftrag: vom Case zum Techniker"
description: "Wie aus einem Kundenanruf in Salesforce Field Service ein Technikereinsatz wird: Case, Arbeitsauftrag, Position, Servicetermin und wer welchen Datensatz anlegt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: field-service-case-zu-arbeitsauftrag
translationKey: field-service-case-to-work-order
topic: field-service
categories: [field-service, architecture]
tags: [Field Service, Arbeitsauftrag, Serviceanfrage, Case, Work Type, Außendienst]
takeaways:
  - "Der Case dokumentiert das Problem, der Arbeitsauftrag den Job, Positionen die Teilschritte und der Servicetermin den geplanten Einsatz."
  - "Work Types sind Vorlagen für Einsatzarten mit Dauer und Skills und können den Servicetermin automatisch anlegen."
  - "Die Hotline entscheidet anhand von Anspruch und Triage-Checkliste, ob Fernhilfe, ein Teileversand oder ein Technikereinsatz das Problem löst."
  - "Wartungspläne erzeugen Arbeitsaufträge ohne Case. Geplante und ungeplante Arbeit konkurrieren deshalb um dieselben Techniker."
  - "Wer im Contact Center Cases bearbeitet, braucht mehr als eine Dispatcher- oder Technician-Lizenz. Die Datensatzkette entscheidet auch über den Lizenzmix."
faq:
  - q: "Was ist der Unterschied zwischen Case und Arbeitsauftrag in Salesforce?"
    a: "Ein Case dokumentiert das Problem des Kunden und die Kommunikation dazu. Ein Arbeitsauftrag (Work Order) beschreibt den Job, der vor Ort erledigt werden muss. Der Arbeitsauftrag kann auf den Case verweisen, zu dem er gehört."
  - q: "Was ist ein Servicetermin in Field Service?"
    a: "Ein Servicetermin (Service Appointment) ist der Einsatz, der geplant und einem Techniker zugewiesen wird. Sein übergeordneter Datensatz ist meist ein Arbeitsauftrag oder eine Arbeitsauftragsposition."
  - q: "Kann Salesforce den Servicetermin automatisch anlegen?"
    a: "Ja. Ist im Work Type die Option Auto-Create Service Appointment gesetzt, entsteht automatisch ein Servicetermin, wenn dieser Work Type auf einen Arbeitsauftrag oder eine Position ohne Termin angewendet wird. Datensätze, die vor dem Einschalten angelegt wurden, erhalten keinen Servicetermin."
  - q: "Erzeugen Wartungspläne Cases?"
    a: "Im Standard nicht. Wartungspläne erzeugen Arbeitsaufträge laut Trailhead entweder manuell oder automatisch dreimal am Tag. Ein Case ist dabei nicht beteiligt."
draft: false
---

In Salesforce Field Service durchläuft eine typische Störungsmeldung bis zu vier Datensätze, bevor ein Techniker anrückt; Case und Positionen sind optional. Der Case dokumentiert das Problem des Kunden, der Arbeitsauftrag die auszuführende Arbeit, Arbeitsauftragspositionen die Teilschritte und der Servicetermin den Einsatz, der geplant wird. Die Hotline legt den Case an und entscheidet, ob überhaupt ein Einsatz nötig ist. Wenn ja, legt sie einen Arbeitsauftrag an, und ein passend eingestellter Work Type erzeugt den Termin automatisch. Die Disposition oder die Planungsengine weist dann einen Techniker zu. Geplante Wartung nimmt eine Abkürzung: Wartungspläne erzeugen Arbeitsaufträge ganz ohne Case.

## Welche Datensätze bilden einen Außendiensteinsatz ab?

Salesforce verkauft das Produkt heute als Field Service and Operations, aber das Datenmodell ist gleich geblieben. Der [Entwicklerleitfaden zu Field Service](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) beschreibt die Kernobjekte so:

| Datensatz | Was er enthält | Beispiel bei einem Maschinenbauer |
|---|---|---|
| Case | Problem des Kunden und Kommunikation | "Verpackungsmaschine stoppt mit Fehler 412" |
| Arbeitsauftrag (Work Order) | Arbeit, die für den Kunden zu erledigen ist | Störungsbehebung an Seriennummer X |
| Position (Work Order Line Item) | Untergeordneter Datensatz für einen Teilschritt | Sensor tauschen, kalibrieren, Probelauf |
| Servicetermin (Service Appointment) | Der Einsatz vor Ort | Dienstag 8 bis 11 Uhr, Techniker Y |

Laut Entwicklerleitfaden kann ein Arbeitsauftrag auf einen Case verweisen, um zu zeigen, dass die Arbeit zu einem Kundenfall gehört. Der übergeordnete Datensatz eines Servicetermins ist meist ein Arbeitsauftrag oder eine Position. Positionen helfen, wenn ein Auftrag mehrere Schritte hat, die getrennt abgerechnet werden oder verschiedene Skills brauchen. Skills werden bei der Planung nur für den Datensatz berücksichtigt, an dem der Termin hängt; Schritte mit eigenen Skills brauchen also einen eigenen Termin an der Position.

## Work Types sind Vorlagen für Einsatzarten

Ein Work Type ist eine Vorlage für eine Einsatzart, etwa Jahreswartung, Störungsbehebung oder Inbetriebnahme. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type) enthält er die geschätzte Dauer und die benötigten Skills, und Wissensartikel, die mit dem Work Type verknüpft sind, erscheinen auf jedem Arbeitsauftrag, der ihn nutzt. Work Types lassen sich auf Arbeitsaufträge und auf Positionen anwenden, eine Position kann also einen eigenen Work Type mit eigenen Skills haben.

Die wichtigste Einstellung heißt Auto-Create Service Appointment. Ist sie gesetzt, entsteht laut Trailhead bei jedem Arbeitsauftrag mit diesem Work Type ein Servicetermin. Der Termin übernimmt Dauer und Datumseinstellungen aus dem Work Type. Ohne diese Option muss der Termin von einem Nutzer oder durch eine andere Automatisierung wie einen Flow angelegt werden, und genau dieser Schritt wird vergessen.

Saubere Work Types gehören zu den Stammdaten, die die Planung braucht. Welche das sind und welches System führend ist, steht in [Salesforce Field Service: Welche Daten braucht die Planung?](../salesforce-field-service-stammdaten/).

## Braucht jeder Case einen Techniker?

Nein, und hier wird im Service das meiste Geld gespart oder verloren. Bevor ein Arbeitsauftrag entsteht, sollte die Hotline zwei Fragen beantworten.

**Worauf hat der Kunde Anspruch?** Der Anspruch (Entitlement) am Asset oder Servicevertrag sagt, welche Reaktionszeit gilt und was abgedeckt ist. Salesforce misst Reaktionszeiten mit Entitlement-Prozessen und Meilensteinen. Ein Detail aus der [Trailhead-Einheit zu Ansprüchen auf Arbeitsaufträgen](https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders): Entitlement-Prozesse laufen nur auf Datensätzen ihres Typs, Cases und Arbeitsaufträge brauchen also getrennte Prozesse. Wie Servicevertrag, Wartungsplan und Anspruch zusammenhängen, steht in [Field Service: Wartungsverträge abbilden](../salesforce-field-service-wartungsvertraege/).

**Was löst das Problem?** Ich empfehle eine kurze Triage-Checkliste, die Anrufe in drei Ergebnisse sortiert:

- **Fernhilfe.** Es geht um einen Bedienfehler, einen Parameter oder einen Reset. Der Case wird ohne Arbeitsauftrag geschlossen. Mit [Visual Remote Assistance](../visual-remote-assistant-fernhilfe-statt-einsatz/) sieht der Mitarbeiter die Maschine über die Handykamera des Kunden, statt nach einer Beschreibung zu raten.
- **Teileversand.** Der Fehler ist klar, und das Personal des Kunden kann das Teil tauschen. Der Auftrag geht ins ERP, der Case bleibt bis zur Bestätigung offen.
- **Technikereinsatz.** Erst dann entsteht ein Arbeitsauftrag.

An einer Störungshotline kann ein Sprachagent die Aufnahme des Falls und die Triage übernehmen. Wo er an seine Grenzen stößt und an einen Menschen übergeben sollte, steht in [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/). Welche Funktionen Service Cloud für die Mitarbeitenden in der Konsole ergänzt, beschreibt [Casey und der Service Rep Assistant](../service-cloud-casey-und-service-rep-assistant/).

## Wer legt welchen Datensatz an?

| Datensatz | Angelegt von | Wann |
|---|---|---|
| Case | Hotline, Kundenportal oder Agent | Beim ersten Kontakt |
| Arbeitsauftrag | Hotline, aus dem Case | Wenn die Triage "Einsatz" ergibt |
| Positionen | Hotline, Work Type oder Techniker | Mit dem Arbeitsauftrag oder vor Ort |
| Servicetermin | Automatisch über den Work Type | Beim Anlegen des Arbeitsauftrags |
| Zugewiesene Ressource (Assigned Resource) | Disposition oder Planungsengine | Terminstatus wechselt auf Scheduled, dann Dispatched |
| Arbeitsauftrag ohne Case | Wartungsplan | Geplante Wartung |

Geplante Wartung entsteht auf einem anderen Weg. Laut der [Trailhead-Einheit zum Erzeugen von Arbeitsaufträgen](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders) erzeugt ein Wartungsplan Arbeitsaufträge manuell oder automatisch, und die automatische Erzeugung erfolgt dreimal am Tag. Je nach Erzeugungsmethode und Auto-Create-Option am Work Type erhalten diese Arbeitsaufträge gleich einen Termin. Ein Case ist nicht beteiligt.

Die Folge: Nutzen geplante und ungeplante Arbeit dieselben Gebiete und Techniker, konkurrieren sie um dieselbe Kapazität. Ist die geplante Wartung der nächsten vier Wochen schon gebucht, muss für einen Maschinenstillstand am Dienstag etwas weichen. Prioritäten und Planungsziele entscheiden, was verschoben wird, und für diese Regel braucht es einen Verantwortlichen.

## Die Datensatzkette entscheidet auch über den Lizenzmix

```hinweis achtung
Laut [Field-Service-Preisseite](https://www.salesforce.com/de/products/field-service/pricing) dürfen Dispatcher- und Technician-Lizenzen nicht für Contact Center, Call Center oder Case Management genutzt werden. Die Fußnote erlaubt es für Field Service and Operations Plus, einen Namen, den die aktuelle Preistabelle nicht mehr nutzt. Wer Cases bearbeitet, braucht Service Cloud oder eine Field-Service+-Edition.
```

In der Praxis trifft das kleine Serviceteams, in denen der Disponent auch die Anrufe der Hotline annimmt. Eine Dispatcher-Lizenz für 175 € deckt allein kein Case Management ab; laut deutscher Preisliste passt Field Service Plus für 230 €. Die US-Preisseite hat am 5. November 2026 umgestellt und nennt dafür Field Service+ Core (250 $). Ich würde im Angebot klären, welches Modell für Ihren Vertrag gilt und ob es das Recht zum Case Management enthält. Die vollständige Rollenmatrix steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/).

## Rechenbeispiel: der Anruf "Maschine steht"

Alle Angaben sind Annahmen. Ein Kunde ruft an einem Dienstag um 7:40 Uhr an, weil eine Verpackungsmaschine mit einem Fehler stoppt.

```schritte
Case anlegen | Hotline
  Die Hotline findet das Asset über die Seriennummer und legt einen Case an. Der Anspruch zeigt einen Servicevertrag mit 8 Stunden Reaktionszeit.
Triage | Hotline
  Der Fehlercode deutet auf einen defekten Sensor, der Kunde hat keinen Ersatz. Fernhilfe löst es nicht.
Arbeitsauftrag anlegen | Hotline
  Die Hotline legt aus dem Case einen Arbeitsauftrag mit dem Work Type "Störungsbehebung Sensor" an. Der Work Type trägt 3 Stunden Dauer und den Skill "Sensorik Baureihe B". Hinzu kommt eine Position für den Probelauf.
Termin entsteht | Work Type und Hotline
  Der Work Type legt den Servicetermin automatisch an. Die Hotline setzt das Fälligkeitsdatum so, dass die 8 Stunden Reaktionszeit eingehalten werden.
Einplanen | Disposition
  Die Disposition startet die Kandidatensuche, verschiebt eine geplante Wartung von Dienstag auf Donnerstag und plant einen Techniker ein. Ob der Sensor in dessen Fahrzeuglager liegt, prüft sie gesondert, denn die Standard-Arbeitsregeln sehen den Fahrzeugbestand nicht. Status Scheduled, dann Dispatched.
Einsatz und Abschluss | Techniker
  Der Techniker sieht den Auftrag in der mobilen App, dokumentiert Tausch und Probelauf und schließt den Arbeitsauftrag. Der Case wird geschlossen, nachdem der Kunde bestätigt hat.
```

Bei den Schritten 3 und 4 zahlt sich das Datenmodell aus. Ohne Work Type muss die Hotline Dauer und Skills selbst kennen, und der Termin muss manuell angelegt werden.

## Die drei häufigsten Anrufarten aufzeichnen

Zeichnen Sie den Weg für Ihre drei häufigsten Anrufarten auf, vom ersten Anruf bis zum geschlossenen Arbeitsauftrag, und schreiben Sie dazu, wer welchen Datensatz anlegt. Diese Zeichnung beantwortet die Lizenzfrage und zeigt, welche Work Types Sie brauchen. Wie das in den Business Case passt, steht in [Kapitel 1 der Masterclass Field Service](../../masterclass/field-service/field-service-lohnt-sich-lizenzen/).
