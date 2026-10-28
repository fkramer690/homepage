---
title: "Manufacturing Cloud for Service oder Service Cloud?"
description: "Wann Manufacturing Cloud Service Core 80 bis 100 US-Dollar mehr pro Nutzer und Monat wert ist als Service Cloud und wer im Service welche Lizenz braucht."
pubDate: 2026-10-28
lang: de
slug: manufacturing-cloud-service-oder-service-cloud
translationKey: manufacturing-cloud-service-vs-service-cloud
topic: service
categories: [manufacturing-cloud, field-service]
contactBrief: licences
tags: [Manufacturing Cloud, Service Cloud, Lizenzen, Garantie, Make-or-Buy]
takeaways:
  - "Manufacturing Cloud Service Core kostet laut Liste 275 US-Dollar pro Nutzer und Monat, Service Cloud Core 195 und die bisherige Service Cloud Enterprise 175. Der Aufpreis liegt bei 80 bis 100 US-Dollar."
  - "Der Aufpreis bringt Warranty Lifecycle Management, die Asset Service Console, die Service Console for Manufacturing, Pre-Work Estimation und das Fertigungs-Datenmodell."
  - "Case-Management, Hilfecenter, Entitlements und Knowledge sind Funktionen der Service Cloud. Eine Hotline, die nur Cases bearbeitet, braucht keine Manufacturing Cloud."
  - "Gemischte Lizenzen sind der Normalfall: Garantiesachbearbeiter und Kampagnenverantwortliche auf Manufacturing Cloud, First Level auf Service Cloud. Lassen Sie sich den Mix schriftlich bestätigen."
  - "Techniker im Außendienst brauchen in jedem Fall Field-Service-Lizenzen, Technician kostet 175 US-Dollar in der Enterprise Edition."
faq:
  - q: "Was kostet Manufacturing Cloud for Service?"
    a: "Die Preisseite nennt Manufacturing Cloud Service Core mit 275 und Service Max mit 650 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung, Sales and Service Max mit 700. Zwei Fußnoten widersprechen sich, ob diese Preise für die Enterprise oder die Unlimited Edition gelten, prüfen Sie daher das Angebot."
  - q: "Was unterscheidet Manufacturing Cloud for Service von Service Cloud?"
    a: "Manufacturing Cloud for Service ergänzt den Service um Funktionen für Hersteller: Warranty Lifecycle Management, Asset Service Console, Service Console for Manufacturing, Pre-Work Estimation und ein Fertigungs-Datenmodell. Case-Management, Entitlements und Knowledge kommen aus der Service Cloud."
  - q: "Kann ich Lizenzen von Manufacturing Cloud und Service Cloud in einer Org mischen?"
    a: "Lizenzen nach Rolle zu mischen ist in Salesforce üblich. Welche Datensätze der Manufacturing Cloud ein Service-Cloud-Nutzer lesen darf, ist aber eine Vertragsfrage. Lassen Sie sich Mix und Zugriffsrechte vor der Unterschrift schriftlich bestätigen."
  - q: "Brauchen Techniker im Außendienst Lizenzen der Manufacturing Cloud?"
    a: "Nein. Techniker, die mit der mobilen App von Field Service arbeiten, brauchen Field-Service-Lizenzen, Technician kostet 175 US-Dollar pro Nutzer und Monat in der Enterprise Edition. Field Service setzt außerdem mindestens eine Service-Cloud-Lizenz in der Org voraus."
draft: false
---

Manufacturing Cloud Service Core kostet laut Preisliste 275 US-Dollar pro Nutzer und Monat. Service Cloud kostet 195 US-Dollar in Core, der Edition, die Salesforce heute anstelle von Enterprise verkauft, und 175 US-Dollar zum bisherigen Listenpreis der Enterprise Edition. Der Aufpreis liegt also bei 80 bis 100 US-Dollar pro Nutzer und Monat. Aus meiner Sicht lohnt er sich für die Nutzer, die Garantieanträge von Händlern oder Kunden bearbeiten und Rückrufe oder Upgrades über eine installierte Basis steuern. Für Case-Bearbeitung, Entitlements und Knowledge reicht Service Cloud. Die meisten Hersteller landen bei gemischten Lizenzen, und dieser Mix gehört in den Vertrag.

## Was kosten die Lizenzen?

Listenpreise pro Nutzer und Monat bei jährlicher Abrechnung, Stand Oktober 2026:

| Lizenz | Listenpreis | Flex Credits pro Org und Jahr |
|---|---|---|
| Service Cloud Core | 195 US-Dollar | 500.000 |
| Service Cloud Enterprise (bisher) | 175 US-Dollar | keine angegeben |
| Manufacturing Cloud Service Core | 275 US-Dollar | 500.000 |
| Manufacturing Cloud Service Max | 650 US-Dollar | 2.750.000 |
| Manufacturing Cloud Sales & Service Max | 700 US-Dollar | 2.750.000 |

Die [Preisseite der Service Cloud](https://www.salesforce.com/service/pricing/) sagt in ihren FAQ: „Core replaces Enterprise Edition, Advanced replaces Unlimited Edition, and Max replaces Agentforce 1 Edition“. Je nachdem, welche Fassung der Seite lädt, zeigt sie noch Enterprise für 175 US-Dollar. Salesforce hat im September [angekündigt](https://www.salesforce.com/in/news/?p=14535), dass „existing customer pricing on legacy editions remains unchanged“. Bestandskunden mit Enterprise vergleichen also mit 175, Neukunden mit 195 US-Dollar. Was die neuen Editionen unterscheidet, steht in [Salesforce-Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/).

Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) hat zwei Fußnoten, die sich widersprechen. Die eine sagt, die Preise gelten für die Enterprise Edition und Unlimited koste 425 US-Dollar. Die andere sagt, die Preise gelten für die Unlimited Edition. Dieselbe Ankündigung sagt, neue Preise für die Branchen-Editionen folgen „later this fall“. Welcher Preis für Sie gilt, zeigt erst das Angebot.

## Was bringt der Aufpreis?

Die Preisseite der Manufacturing Cloud nennt diese Servicefunktionen: Warranty Lifecycle Management, Asset Service Console, Service Console for Mfg und Pre-Work Estimation, dazu die Fertigungs-Datenmodelle. Service Max ergänzt Contact Center Digital, Workforce Management, Quality Management und Customer Signal Intelligence, die Max-Editionen enthalten „all full suite of Agentforce for Industries“. Die Häkchen pro Edition waren auf der Seite, die ich gelesen habe, nicht auslesbar. Lassen Sie sich im Angebot bestätigen, welche Edition welche Funktion enthält.

Was diese Funktionen leisten:

- **Warranty Lifecycle Management.** Garantiebedingungen, Anträge von Händlern, Prüfung und Lieferantenregress, beschrieben in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/).
- **Asset Service Console.** Meilensteine, Garantien, Cases, Arbeitsaufträge und Anträge pro Maschine. Die Daten dahinter sind Thema von [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).
- **Service Console for Manufacturing.** Eine neu gestaltete Kontaktseite mit Assets, Cases und Aufträgen des Accounts, der anruft. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing) brauchen ihre Komponenten „an Industry Service Excellence add-on license“. Fragen Sie, ob Service Core diese enthält.
- **Product Service Campaigns** für Rückrufe und Upgrades. Trailhead führt sie als Funktion der Manufacturing Cloud, die Preisseite nicht. Mehr dazu in [Rückrufaktionen in Salesforce](../rueckrufaktionen-service-kampagnen/).

## Was deckt die Service Cloud allein ab?

Mehr als viele erwarten. Die Edition Service Cloud Core nennt Case-Management und ein Self-Service-Hilfecenter. Die Vergleichstabelle der Preisseite führt außerdem Serviceverträge und Entitlements, Knowledge Management sowie Asset Management und Product Tracking. Assets mit Seriennummern und Hierarchien sind Standardobjekte von Salesforce.

Eine Hotline, die Anrufe annimmt, Cases anlegt, einen Servicevertrag prüft und mit Knowledge-Artikeln antwortet, läuft also auf Service Cloud. Was fehlt, ist die Fertigungsschicht: Garantiebedingungen pro Produkt und Teil, Anträge mit Kostenpositionen, Asset-Meilensteine, Beteiligte und Flotten, Kampagnen mit Verursacherteilen. Wenn Sie dem Agenten nur ein Garantieende am Asset zeigen wollen, reicht ein eigenes Feld.

## Wer braucht welche Lizenz?

Ich würde nach Rolle entscheiden, nicht nach Abteilung. Ein typisches Szenario, als Annahme: ein Maschinenbauer mit 45 Nutzern im Service.

| Rolle | Nutzer | Lizenz |
|---|---|---|
| Hotline, First Level | 30 | Service Cloud Core |
| Garantiesachbearbeitung | 10 | Manufacturing Cloud Service Core |
| Qualität, Rückrufe | 5 | Manufacturing Cloud Service Core |

Alle 45 auf Manufacturing Cloud Service Core kosten zum Listenpreis 148.500 US-Dollar im Jahr. Der Mix kostet 49.500 US-Dollar für die 15 Nutzer der Manufacturing Cloud plus 70.200 US-Dollar für die 30 auf Service Cloud Core, zusammen 119.700 US-Dollar. Die Differenz beträgt 28.800 US-Dollar im Jahr, also 30 Nutzer mal 80 US-Dollar mal 12 Monate.

Drei Gruppen fallen aus dieser Tabelle heraus:

- **Techniker im Außendienst** brauchen in jedem Fall Field-Service-Lizenzen. Die [Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/) nennt Technician mit 175 und Field Service Plus mit 230 US-Dollar, verlangt „at least one (1) Service Cloud user license“ und schließt Dispatcher- und Technician-Lizenzen für Case-Management aus. Ob sich Field Service lohnt, steht in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/).
- **Händler**, die Anträge einreichen, arbeiten im Portal mit Partnerlizenzen, siehe [Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).
- **Führungskräfte, die nur Berichte lesen**, brauchen eventuell gar keine volle Lizenz, siehe [Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

Einen Punkt würde ich immer schriftlich festhalten: welche Datensätze der Manufacturing Cloud, etwa Garantieanträge oder Asset-Garantien, ein Service-Cloud-Nutzer sehen darf. Die Hotline muss sie meist lesen, auch wenn sie sie nie bearbeitet.

## Wie entscheide ich?

Eine kurze Regel, die für die meisten Hersteller passt:

- **Garantieanträge kommen von außen, und Rückrufe oder Upgrades gibt es regelmäßig:** Manufacturing Cloud for Service für die Menschen, die damit arbeiten.
- **Service heißt Cases, Verträge und Antworten:** Service Cloud, bei Bedarf mit einem eigenen Feld für das Garantieende.
- **Viele Techniker im Außendienst:** Field Service getrennt entscheiden, das hängt nicht an dieser Wahl.

Die Alternative ist ein Eigenbau auf Service Cloud: eigene Objekte für Garantiebedingungen, Anträge und Kampagnen. Im Szenario oben beträgt der Aufpreis für die 15 Nutzer der Manufacturing Cloud gegenüber Service Cloud Core 14.400 US-Dollar im Jahr, über fünf Jahre 72.000 US-Dollar zum Listenpreis. Ein eigener Garantieprozess mit Händlerportal, Freigaben und Lieferantenregress ist in Bau und Pflege selten günstiger, und jede Änderung liegt dann bei Ihnen. Der Eigenbau gewinnt, wenn Ihr Garantieprozess einfach ist, etwa eine Bedingung pro Produkt und wenige Anträge.

Das ist dieselbe Make-or-Buy-Frage wie bei der ganzen Branchen-Cloud, beschrieben in [Manufacturing Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/) und im [Kapitel Einordnung und Business Case](../../masterclass/manufacturing-cloud/einordnung-und-business-case/). Mein Vorgehen beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Wo fangen Sie an?

Zählen Sie die Nutzer pro Rolle für eine Region: wie viele Garantieanträge bearbeiten, wie viele Kampagnen steuern, wie viele nur Anrufe annehmen. Fordern Sie dann ein Angebot mit genau diesem Mix an, einschließlich der Frage nach Industry Service Excellence und dem Lesezugriff für Service-Cloud-Nutzer. Die After-Sales-Funktionen selbst stehen im [Kapitel Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/) der Masterclass Manufacturing Cloud.

Manufacturing Cloud for Service ist ihren Aufpreis für die Menschen wert, die an Garantie und Rückrufen arbeiten, selten für das ganze Serviceteam. Wenn Sie diesen Lizenzmix abwägen, [schreiben Sie mir](#contact).
