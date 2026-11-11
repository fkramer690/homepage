---
title: "Manufacturing Cloud for Service oder Service Cloud?"
metaTitle: "Manufacturing Cloud vs. Service Cloud: 275 oder 195 Dollar?"
description: "Manufacturing Cloud Service Core kostet 275 Dollar pro Nutzer und Monat, Service Cloud Core 195. Wer den Aufpreis für Garantie braucht und wann ein Mix reicht."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-service-oder-service-cloud
translationKey: manufacturing-cloud-service-vs-service-cloud
topic: service
categories: [manufacturing-cloud, field-service]
contactBrief: licences
tags: [Manufacturing Cloud, Service Cloud, Lizenzen, Garantie, Make-or-Buy]
takeaways:
  - "Die Preisseite nennt Warranty Lifecycle Management, zwei Servicekonsolen, Pre-Work Estimation und das Datenmodell. Lassen Sie sich jede Edition bestätigen."
  - "Case-Management, Entitlements und Knowledge gehören zur Service Cloud. Eine reine Hotline braucht keine Manufacturing Cloud."
  - "Ich prüfe zuerst einen Mix nach Rolle: Garantie mit Manufacturing Cloud, First Level mit Service Cloud. Der Lesezugriff hängt an Permission Set Licenses."
  - "Techniker, die mit der mobilen Field-Service-App arbeiten, brauchen in jedem Fall Field-Service-Lizenzen; Technician kostet 175 US-Dollar (Enterprise)."
faq:
  - q: "Was kostet Manufacturing Cloud for Service?"
    a: "Die Preisseite nennt Manufacturing Cloud Service Core mit 275 und Service Max mit 650 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung, Sales and Service Max mit 700. Zwei Fußnoten widersprechen sich in der Frage, ob diese Preise für die Enterprise oder die Unlimited Edition gelten. Prüfen Sie daher das Angebot."
  - q: "Was unterscheidet Manufacturing Cloud for Service von Service Cloud?"
    a: "Manufacturing Cloud for Service ergänzt den Service um Funktionen für Hersteller: Warranty Lifecycle Management, Asset Service Console, Service Console for Manufacturing, Pre-Work Estimation und ein Fertigungs-Datenmodell. Case-Management, Entitlements und Knowledge stammen aus der Service Cloud."
  - q: "Kann ich Lizenzen von Manufacturing Cloud und Service Cloud in einer Org mischen?"
    a: "In meinen Programmen prüfe ich zuerst einen Mix nach Rolle. Zugriff auf Garantieobjekte und Objekte für Garantieansprüche erfolgt über Permission Set Licenses wie Warranty Lifecycle Management und Claims Management Foundation; ein Service-Cloud-Nutzer kann sie also nicht einfach lesen, nur weil sie in derselben Org liegen. Lassen Sie sich Mix, Permission Set Licenses und Zugriffsrechte vor der Unterschrift schriftlich bestätigen."
  - q: "Brauchen Techniker im Außendienst Lizenzen der Manufacturing Cloud?"
    a: "Nein. Techniker, die mit der mobilen App von Field Service arbeiten, brauchen Field-Service-Lizenzen, Technician kostet 175 US-Dollar pro Nutzer und Monat in der Enterprise Edition. Field Service setzt außerdem mindestens eine Service-Cloud-Lizenz in der Org voraus, Bestandskunden der Service Cloud brauchen mindestens eine Dispatcher-Lizenz, und Techniker brauchen für die Planung einen Dispatcher."
draft: false
---

Manufacturing Cloud Service Core kostet laut Preisliste 275 US-Dollar pro Nutzer und Monat. Service Cloud Core kostet 195 US-Dollar; Salesforce beschreibt diese Edition als Nachfolger der Enterprise Edition. Der Aufpreis liegt also bei 80 US-Dollar pro Nutzer und Monat. Aus meiner Sicht lohnt er sich für die Nutzer, die Garantieansprüche von Händlern oder Kunden bearbeiten. Für Case-Bearbeitung, Entitlements und Knowledge reicht Service Cloud, und Rückrufkampagnen gibt es auch über ein Add-on. Ein Lizenzmix ist meist günstiger und sollte ausdrücklich im Vertrag geregelt werden.

## Was kosten die Lizenzen?

Listenpreise pro Nutzer und Monat bei jährlicher Abrechnung, Stand Oktober 2026:

| Lizenz | Listenpreis | Flex Credits pro Org und Jahr |
|---|---|---|
| Service Cloud Core | 195 US-Dollar | 500.000 |
| Manufacturing Cloud Service Core | 275 US-Dollar | 500.000 |
| Manufacturing Cloud Service Max | 650 US-Dollar | 2.750.000 |
| Manufacturing Cloud Sales & Service Max | 700 US-Dollar | 2.750.000 |

Die [Preisseite der Service Cloud](https://www.salesforce.com/service/pricing/) nennt Core mit 195 US-Dollar und sagt in ihren FAQ: „Core replaces Enterprise Edition, Advanced replaces Unlimited Edition, and Max replaces Agentforce 1 Edition“. Einen Preis für Enterprise zeigt sie nicht mehr. Salesforce hat im September [angekündigt](https://www.salesforce.com/in/news/?p=14535), dass „existing customer pricing on legacy editions remains unchanged“. Neukunden vergleichen also in der Regel mit 195 US-Dollar, Bestandskunden mit Enterprise vergleichen anhand des Preises aus ihrem laufenden Vertrag; Erweiterungs-SKUs können abweichen. Was die neuen Editionen unterscheidet, steht in [Salesforce-Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/).

Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) hat zwei Fußnoten, die sich widersprechen. Die eine sagt, die Preise gelten für die Enterprise Edition und Unlimited koste 425 US-Dollar. Die andere sagt, die Preise gelten für die Unlimited Edition. Dieselbe Ankündigung sagt, neue Preise für die Branchen-Editionen folgen „later this fall“. Stand November 2026 ist die öffentliche Seite also in sich widersprüchlich, und der Bestellschein muss SKU, Basis-Edition, enthaltene Permission Set Licenses und Preis nennen.

## Der Aufpreis bringt Garantie, zwei Konsolen und das Datenmodell

Die Preisseite der Manufacturing Cloud nennt diese Servicefunktionen: Warranty Lifecycle Management, Asset Service Console, Service Console for Mfg und Pre-Work Estimation, dazu die Fertigungs-Datenmodelle. Service Max ergänzt Contact Center Digital, Workforce Management, Quality Management und Customer Signal Intelligence. Die Max-Editionen enthalten „all full suite of Agentforce for Industries“. In der von mir gelesenen Version der Seite waren die Häkchen pro Edition nicht auslesbar. Lassen Sie sich im Angebot bestätigen, welche Edition welche Funktion enthält.

Was diese Funktionen leisten:

- **Warranty Lifecycle Management.** Garantiebedingungen, Garantieansprüche von Händlern, Prüfung und Lieferantenregress, beschrieben in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/).
- **Asset Service Console.** Meilensteine, Garantien, Cases, Arbeitsaufträge und Garantieansprüche pro Maschine. Die Daten dahinter sind Thema von [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).
- **Service Console for Manufacturing.** Eine neu gestaltete Kontaktseite mit Assets, Cases und Aufträgen des Accounts, zu dem die anrufende Person gehört. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing) sind ihre Komponenten Timeline, Empfehlungen und Datensatzwarnungen „available with the Industries Service Excellence license“. Fragen Sie, ob Service Core diese Lizenz enthält.
- **Product Service Campaigns** für Rückrufe und Upgrades. Trailhead führt sie als Funktion der Manufacturing Cloud, die Preisseite nicht. In der Salesforce-Hilfe gehören sie zu [Asset Service Lifecycle Management](https://help.salesforce.com/s/articleView?id=xcloud.aslm_psc_parent.htm&language=en_US&type=5), das Salesforce auch außerhalb der Manufacturing Cloud mit Field Service anbietet; Kampagnen allein rechtfertigen also keine Manufacturing Cloud. Mehr dazu in [Rückrufaktionen in Salesforce](../rueckrufaktionen-service-kampagnen/).

## Was deckt die Service Cloud allein ab?

Mehr als viele erwarten. Für die Edition Service Cloud Core nennt Salesforce Case-Management und ein Self-Service-Hilfecenter. Klären Sie im Angebot, ob Core das Schreiben von Knowledge-Artikeln abdeckt oder nur das Lesen. Die Vergleichstabelle der Preisseite führt außerdem Serviceverträge und Entitlements, Knowledge Management sowie Asset Management und Product Tracking. Assets mit Seriennummern und Hierarchien sind Standardobjekte von Salesforce.

Eine Hotline, die Anrufe annimmt, Cases anlegt, einen Servicevertrag prüft und mit Knowledge-Artikeln antwortet, arbeitet also mit Service Cloud. Was fehlt, ist die Fertigungsschicht: Garantiebedingungen pro Produkt und Teil, Garantieansprüche mit Zahlungsdetails je Position, Asset-Meilensteine, Beteiligte und Flotten, Kampagnen mit Verursacherteilen. Wenn Sie dem Agenten nur ein Garantieende am Asset zeigen wollen und das ERP es verlässlich berechnet, reicht ein eigenes Feld.

## Rechenbeispiel: 45 Nutzer im Service

Ich würde nach Rolle entscheiden, nicht nach Abteilung. Als Beispiel dient ein fiktiver Maschinenbauer mit 45 Nutzern im Service. Es ist ein reiner Listenpreisvergleich unter zwei Annahmen: Service Core enthält die Garantiefunktionen, und die Hotline erhält Lesezugriff auf Garantiedaten ohne Lizenz der Manufacturing Cloud. Beides muss bestätigt werden.

| Rolle | Nutzer | Lizenz |
|---|---|---|
| Hotline, First Level | 30 | Service Cloud Core |
| Garantiesachbearbeitung | 10 | Manufacturing Cloud Service Core |
| Qualität, Rückrufe | 5 | Manufacturing Cloud Service Core |

Alle 45 Nutzer mit Manufacturing Cloud Service Core kosten zum Listenpreis 148.500 US-Dollar im Jahr. Der Mix kostet 49.500 US-Dollar für die 15 Nutzer mit Manufacturing Cloud plus 70.200 US-Dollar für die 30 Nutzer mit Service Cloud Core, zusammen 119.700 US-Dollar. Die Differenz beträgt 28.800 US-Dollar im Jahr, also 30 Nutzer mal 80 US-Dollar mal 12 Monate.

Drei Gruppen sind in dieser Tabelle nicht enthalten:

- **Techniker im Außendienst** brauchen in jedem Fall Field-Service-Lizenzen. Seit ihrer Umstellung im November 2026 nennt die [Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/) für Technician 175 und für Field Service+ Core 250 US-Dollar. Außerdem ist mindestens eine Service-Cloud-Lizenz erforderlich, bei Bestandskunden der Service Cloud mindestens ein Dispatcher; Dispatcher- und Technician-Lizenzen sind für Case-Management ausgeschlossen. Ob sich Field Service lohnt, steht in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/).
- **Händler**, die Garantieansprüche einreichen, arbeiten im Portal mit Partnerlizenzen, siehe [Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).
- **Führungskräfte, die nur Berichte lesen**, brauchen eventuell gar keine volle Lizenz, siehe [Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

```hinweis offen
Einen Punkt würde ich immer schriftlich festhalten: welche Datensätze der Manufacturing Cloud, etwa Garantieansprüche oder Asset-Garantien, ein Service-Cloud-Nutzer sehen darf. Zugriff erfolgt über [Permission Set Licenses](https://help.salesforce.com/s/articleView?id=mfg_permission_set_licenses.htm&language=en_US&type=5): Warranty Lifecycle Management, Claims Management Foundation und Industry Service Excellence für die Konsolen. Die Hotline muss Garantiedaten meist lesen, auch wenn sie sie nie bearbeitet.
```

## Wie entscheide ich?

Eine kurze Regel, die für die meisten Hersteller passt:

- **Garantieansprüche gehen von außen ein:** Manufacturing Cloud for Service für die Menschen, die damit arbeiten.
- **Nur Rückrufe und Upgrades:** Service Cloud plus Asset Service Lifecycle Management mit Manufacturing Cloud vergleichen.
- **Service heißt Cases, Verträge und Antworten:** Service Cloud, bei Bedarf mit einem eigenen Feld für das Garantieende.
- **Viele Techniker im Außendienst:** Field Service gesondert entscheiden, aber die nötige Service-Basislizenz und die Dispatcher-Regel prüfen.

Die Alternative ist ein Eigenbau auf Service Cloud: eigene Objekte für Garantiebedingungen, Ansprüche und Kampagnen.

```pro-contra
pro: Eigenbau auf Service Cloud
- Nominale Lizenzdifferenz von 14.400 US-Dollar im Jahr für die 15 Nutzer oben, über fünf Jahre 72.000 US-Dollar, wenn Listenpreise und Nutzerzahlen gleich bleiben
- Lohnt sich bei einem einfachen Garantieprozess, etwa einer Garantiebedingung pro Produkt und wenigen Garantieansprüchen
contra: Was Sie dafür tragen
- Ein eigener Garantieprozess mit Händlerportal, Freigaben und Lieferantenregress ist bei Aufbau und Pflege selten günstiger
- Jede Änderung liegt dann bei Ihnen
```

Das ist dieselbe Make-or-Buy-Frage wie bei der ganzen Branchen-Cloud, beschrieben in [Manufacturing Cloud vs. Sales Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/) und im [Kapitel Einordnung und Business Case](../../masterclass/manufacturing-cloud/einordnung-und-business-case/). Mein Vorgehen beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Nutzer pro Rolle für eine Region zählen

Zählen Sie die Nutzer pro Rolle für eine Region: wie viele Garantieansprüche bearbeiten, wie viele Kampagnen steuern und wie viele nur Anrufe annehmen. Fordern Sie dann ein Angebot mit genau diesem Mix an und klären Sie darin die Frage nach Industries Service Excellence und dem Lesezugriff für Service-Cloud-Nutzer. Die After-Sales-Funktionen selbst stehen im [Kapitel Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/) der Masterclass Manufacturing Cloud.
