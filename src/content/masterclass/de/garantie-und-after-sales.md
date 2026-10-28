---
title: "Garantie und After-Sales in Manufacturing Cloud"
description: "Garantie, Rückrufe und installierte Basis in Manufacturing Cloud: was die Servicefunktionen leisten, wer welche Lizenz braucht und wo Field Service beginnt."
lang: de
slug: garantie-und-after-sales
course: manufacturing-cloud
translationKey: mfg-04
chapter: 4
short: "Garantie und After-Sales"
summary: "Garantieansprüche, Rückrufaktionen und installierte Basis: wann Manufacturing Cloud for Service reicht und wo Field Service beginnt."
takeaways:
  - "Manufacturing Cloud Service Core kostet laut Preisliste 275 US-Dollar pro Nutzer und Monat, 80 mehr als Service Cloud Core; das lohnt sich für Garantie- und Rückrufteams, selten für die ganze Hotline."
  - "Jede After-Sales-Funktion braucht ein Asset pro Maschine mit Seriennummer, Produkt, Eigentümer und Garantiebeginn; Asset Milestones (API 58.0) halten Ereignisse wie Registrierung oder Weiterverkauf fest."
  - "Garantieansprüche laufen vom Händlerportal über eine regelbasierte Prüfung bis zur Gutschrift im ERP; der Prüfagent aus Winter '27 prüft zusätzlich die Deckung und markiert Betrugsverdacht."
  - "Product Service Campaigns (API 51.0) bündeln einen Rückruf oder ein Upgrade mit einem Eintrag pro Maschine; die richtigen Maschinen findet nur, wer Seriennummern und Fertigungslose in Salesforce hat."
  - "Manufacturing Cloud entscheidet, ob ein Schaden gedeckt ist und wer zahlt; Einsatz vor Ort, Wartungspläne und Technikerlager gehören zu Field Service und brauchen Field-Service-Lizenzen."
articles: [manufacturing-cloud-service-vs-service-cloud, manufacturing-cloud-installed-base-assets, manufacturing-cloud-warranty-claims, warranty-adjudication-agent-winter-27, manufacturing-cloud-product-service-campaigns, spare-parts-serial-number-ai]
faq:
  - q: "Was bringt Manufacturing Cloud for Service zusätzlich zur Service Cloud?"
    a: "Die Preisseite nennt Warranty Lifecycle Management, die Asset Service Console, die Service Console for Manufacturing und Pre-Work Estimation, dazu das Datenmodell für die Fertigung. Trailhead nennt zusätzlich Product Service Campaigns. Cases, Entitlements und Knowledge kommen aus der Service Cloud."
  - q: "Braucht jeder Servicemitarbeiter eine Manufacturing-Cloud-Lizenz?"
    a: "Nein. Ich würde nach Rolle lizenzieren: Garantiesachbearbeiter und das Team für Rückrufe auf Manufacturing Cloud, den First Level, der nur Cases bearbeitet, auf Service Cloud. Lassen Sie sich den Mix und die Leserechte auf Garantiedaten schriftlich bestätigen."
  - q: "Was braucht der Garantie-Prüfagent, bevor er läuft?"
    a: "Assets mit Seriennummer und Garantiebeginn in Salesforce, Garantiebedingungen als gepflegte Regeln, eine vereinbarte Schwelle, ab der ein Mensch freigibt, und ein Händlerportal, dessen Freitext als nicht vertrauenswürdig gilt. Lizenz und Einrichtungsanleitung hat Salesforce in den Quellen, die ich öffnen konnte, nicht veröffentlicht."
  - q: "Gehören Product Service Campaigns zu Manufacturing Cloud?"
    a: "Trailhead führt sie bei den Servicefunktionen von Manufacturing Cloud auf, die Preisseite nennt sie nicht. Fragen Sie Salesforce schriftlich, welche Edition sie enthält, bevor Sie einen Rückrufprozess darauf planen."
  - q: "Brauchen Servicetechniker eine Manufacturing-Cloud-Lizenz?"
    a: "Nein. Techniker, die mit der mobilen Field-Service-App arbeiten, brauchen Field-Service-Lizenzen. Laut Preisseite verlangt Field Service außerdem mindestens eine Service-Cloud-Lizenz in der Org."
draft: false
---

Manufacturing Cloud for Service lohnt sich, wenn Händler oder Kunden regelmäßig Garantieansprüche einreichen und Rückrufe oder Upgrades über Hunderte Maschinen laufen. Sie ergänzt die Service Cloud um Garantiebedingungen, Garantieanträge mit Prüfung, Servicekampagnen und eine Sicht auf jede Maschine, für 275 statt 195 US-Dollar pro Nutzer und Monat. Alles steht auf der installierten Basis: ein Asset pro Maschine mit Seriennummer, Eigentümer und Garantiebeginn. Fehlen diese Daten, kann weder ein Mensch noch der Prüfagent aus Winter '27 einen Anspruch prüfen. Manufacturing Cloud entscheidet, ob ein Schaden gedeckt ist und wer zahlt; der Einsatz beim Kunden gehört zu Field Service.

## Manufacturing Cloud for Service oder Service Cloud?

Salesforce verkauft diesen Teil der Branchenlösung als Manufacturing Cloud for Service; in der Preisliste heißt dasselbe Produkt „Agentforce Manufacturing for Service“. Laut [Preisseite von Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) kosten Service Core 275, Service Max 650 und Sales & Service Max 700 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung. Die [Preisseite der Service Cloud](https://www.salesforce.com/service/pricing/) nennt Core mit 195 US-Dollar und schreibt „Core replaces Enterprise Edition“. Wer neu kauft, zahlt also 80 US-Dollar pro Nutzer und Monat mehr für die Fertigungsschicht. Bestandskunden mit der alten Enterprise Edition vergleichen mit ihrem bisherigen Preis, wie in [Manufacturing Cloud for Service oder Service Cloud](../../../blog/manufacturing-cloud-service-oder-service-cloud/) beschrieben.

Zwei Fußnoten auf der Preisseite von Manufacturing Cloud widersprechen sich: Die eine sagt, die Preise gelten für die Enterprise Edition und Unlimited koste 425 US-Dollar, die andere, sie gelten für die Unlimited Edition. Welcher Preis für Sie gilt, zeigt erst das Angebot.

Für den Aufpreis bekommen Sie laut Preisseite Warranty Lifecycle Management, die Asset Service Console, die Service Console for Manufacturing und Pre-Work Estimation. Die [Trailhead-Übersicht](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennt zusätzlich Product Service Campaigns, die auf der Preisseite fehlen. Die Service Cloud allein deckt bereits Cases, Entitlements, Knowledge und Standard-Assets mit Seriennummer ab.

Meine Regel: nach Rolle lizenzieren. Garantiesachbearbeiter und das Qualitätsteam, das Rückrufe steuert, arbeiten auf Manufacturing Cloud; ein First Level, der Cases anlegt und aus Knowledge antwortet, bleibt auf Service Cloud. Ein Punkt gehört in den Vertrag: welche Garantiedaten ein Service-Cloud-Nutzer lesen darf. Wie ich den Lizenzmix als Make-or-buy-Frage aufbereite, steht unter [Make-or-buy und Lizenzprognose](../../../leistungen/make-or-buy-lizenzen/), den Umfang der ganzen Branchenlösung behandelt [Kapitel 1](../einordnung-und-business-case/).

## Warum beginnt After-Sales bei der installierten Basis?

Weil jede After-Sales-Frage eine Frage zu einer Maschine ist. Ist diese Seriennummer noch in der Garantie? Ist sie vom Rückruf betroffen? Welche Dichtung passt? Der Asset-Datensatz beantwortet alle drei Fragen oder keine.

Das Minimum pro Maschine: Seriennummer, Produkt, Eigentümer, Standort und das Datum, ab dem die Garantie läuft. Manufacturing Cloud ergänzt drei Dinge:

- **Asset Milestones.** Das [Objekt AssetMilestone](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetmilestone.htm), verfügbar ab API 58.0, hält laut Referenz „the key events in the lifecycle of an asset, such as manufacturing, registration, or resale“ fest, mit Datum, dem Status Active, Expired oder Tentative und dem Quellsystem, das das Ereignis gemeldet hat.
- **Account- und Contact-Teilnehmer.** Sie verbinden mehrere Firmen und Personen mit einer Maschine: Händler, Betreiber, Servicepartner.
- **Flotten.** Sie fassen die Maschinen eines Kunden mit vielen Standorten zusammen, mit Nutzung pro Maschine.

Das Datenmodell ist der leichte Teil. Schwer ist die Quelle. Das ERP kennt Seriennummer und den Händler, an den geliefert wurde, aber nicht den Endkunden. Der Händler kennt das Übergabedatum, die Inbetriebnahme das Installationsdatum. Jedes Feld braucht genau einen Verantwortlichen, schriftlich festgelegt, bevor der erste Anspruch geprüft wird. Die vollständige Feldliste, die Quellentabelle und die Regel für den Garantiebeginn stehen in [Installierte Basis in Manufacturing Cloud](../../../blog/installierte-basis-asset-meilensteine/). Die passende ERP-Schnittstelle zu planen, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

## Wie läuft ein Garantieanspruch vom Händler bis zur Gutschrift?

Manufacturing Cloud bildet Garantien auf drei Ebenen ab. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/administer-warranty-terms) legt die Garantiebedingung (Warranty Term) Art, Dauer, Beginn und die gedeckten Anteile für Arbeit, Teile und Spesen fest; die Abdeckung pro Teil (Warranty Term Coverage) erweitert oder beschränkt sie für einzelne Teile; die Asset-Garantie ordnet die Bedingung einer Maschine zu, „when assets are purchased or installed“. Für Hersteller mit vielen Varianten spart die mittlere Ebene am meisten Arbeit: eine Grundbedingung pro Produktfamilie, Ausnahmen pro Teil.

Der Anspruch selbst kommt meist von außen. Die [Serviceseite](https://salesforce.com/manufacturing/cloud/service) sagt, dass Partner und Kunden Ansprüche „via API or portals“ einreichen und Geschäftsregeln Freigaben automatisieren können. Der Ablauf in Kurzform:

1. Der Händler reicht den Anspruch im Partnerportal ein, mit Maschine, Fehler, verursachendem Teil und Kosten pro Position.
2. Regeln prüfen die Deckung: Garantiezeitraum, Nutzungsgrenze, gedecktes Teil.
3. Routinefälle laufen durch, der Rest geht an einen Sachbearbeiter, der den genehmigten Betrag einträgt.
4. Bei einem Zukaufteil geht ein Regressanspruch (Supplier Recovery Claim) an den Lieferanten.
5. Eine Schnittstelle überträgt den genehmigten Betrag ins ERP, und die Buchhaltung bucht die Gutschrift.

Schritt 5 fällt in Planungen leicht unter den Tisch. Ohne ihn sieht der Händler im Portal einen genehmigten Anspruch und wartet trotzdem auf sein Geld. Die Objekte, den Lieferantenregress und die Portallizenzen für Händler behandelt [Garantieansprüche von Händlern in Salesforce](../../../blog/garantieansprueche-haendler-salesforce/). Welche Portallizenz Händler brauchen, war Thema in [Kapitel 3](../haendler-und-partnerkanal/).

### Was bringt der Garantie-Prüfagent?

Winter '27, [seit dem 12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), bringt einen Warranty Claims Adjudication Agent. Die [Produktseite von Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) beschreibt ihn in einem Satz: Er „validates coverage and flags potential fraud“. Lizenz, Betrugssignale und eine Einrichtungsanleitung hat Salesforce in den Quellen, die ich öffnen konnte, nicht veröffentlicht.

Ich würde die Deckung von Regeln entscheiden lassen und den Agenten dort einsetzen, wo Regeln schwach sind: die Fehlerbeschreibung des Händlers im Freitext lesen, mit Fehlercode und Teilen abgleichen, eine doppelt eingereichte Seriennummer erkennen und eine Rückfrage zu fehlenden Daten vorbereiten. Beträge über einer vereinbarten Grenze, jeder Betrugsverdacht, Kulanz und Ansprüche mit fehlenden Asset-Daten gehen an einen Menschen. Was Sie vorbereiten sollten, mit Testset und Flex Credits pro Anspruch, steht in [Garantie-Prüfagent aus Winter '27](../../../blog/garantie-pruefagent-winter-27/). Das größere Bild der Agenten für Hersteller zeigt das Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/) der KI-Masterclass.

## Rückrufe und Upgrades mit Servicekampagnen

Eine Product Service Campaign steht laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm), verfügbar ab API 51.0, für „a set of activities to be performed“ an einer Gruppe von Assets. Jede betroffene Maschine wird ein eigener Kampagneneintrag mit eigenem Status. Das [Datenmodell](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) ergänzt Definitionen mit betroffenem Produkt und Seriennummernbereich, Fertigungslose, das verursachende Teil, Partner und unverkaufte Bestände bei Händlern. Dasselbe Modell passt für einen Sicherheitsrückruf und für einen Nachrüstsatz für eine ganze Baureihe.

Die Schwachstelle ist die Auswahl. Eine Kampagne trifft nur dann die richtigen Maschinen, wenn jede Maschine als Asset mit Seriennummer existiert und bekannt ist, welches Bauteillos in welcher Maschine steckt. Wählen Sie zu breit, zahlen Sie für Arbeit an Maschinen ohne Fehler; zu eng, und fehlerhafte Maschinen bleiben im Feld.

Ein typisches Szenario, als Annahme: Ein Ventillos eines Lieferanten ist fehlerhaft und steckt in 1.800 Maschinen, verkauft über 70 Händler, 120 davon stehen noch unverkauft beim Händler. Die Kampagne führt die 1.680 Maschinen bei Endkunden als Einträge, die unverkauften als Partnerbestand und das Ventil als verursachendes Teil mit Rücksendung gegen Gutschrift vom Lieferanten. Händler melden jede Maschine einzeln als erledigt, nicht eine Zahl pro Händler. Den ganzen Ablauf, und wann eine Liste im Qualitätssystem reicht, beschreibt [Rückrufaktionen in Salesforce](../../../blog/rueckrufaktionen-service-kampagnen/). Weil die Preisseite Kampagnen nicht nennt, fragen Sie schriftlich, welche Edition sie enthält.

## Was sieht der Servicemitarbeiter auf einem Bildschirm?

Zwei Konsolen für zwei Arten von Anrufen. Die [Service Console for Manufacturing](https://trailhead.salesforce.com/content/learn/modules/service-console-for-manufacturing-cloud-admin-essentials/learn-about-the-service-console-for-manufacturing) ist eine neu gestaltete Kontaktseite: die Daten des Anrufers plus Assets, Cases und Aufträge seines Accounts. Ihre Komponenten für Zeitleiste, Empfehlungen und Hinweise sind laut Trailhead „available with the Industries Service Excellence license“; fragen Sie, ob Ihre Edition diese Lizenz enthält. Die Asset Service Console geht von der Maschine aus: Laut Serviceseite zeigt sie „asset warranties, cases, work orders, and claims related to an asset“.

Beide Konsolen wirken nur so vollständig wie die Daten dahinter. Hängen Milestones, Garantien und Ansprüche am Asset, sieht der Mitarbeiter die ganze Geschichte an einer Stelle. Fehlt bei der Hälfte der Maschinen der Garantiebeginn, zeigt die Konsole die Lücke schneller als jeder Bericht.

## Ersatzteile per Seriennummer

Die Frage „Welches Teil passt in diese Maschine?“ berührt drei Systeme. Salesforce hält das Asset mit seinen Hauptbaugruppen, das PLM die tatsächlich verbaute Stückliste pro Seriennummer, das ERP Material, Verfügbarkeit und Preis. Ich würde die vollständige Stückliste im PLM lassen und sie live über eine Schnittstelle abfragen, statt Hunderte Positionen pro Maschine als untergeordnete Assets zu laden. Ein Agent kann die Frage dann auf eine Baugruppe eingrenzen und das Ergebnis aufbereiten, während die Zuordnung von Seriennummer zu Teilenummer regelbasiert bleibt. Die Datenprüfung und ein angenommenes Szenario mit 6.000 Maschinen stehen in [Ersatzteile per Seriennummer](../../../blog/ersatzteile-seriennummer-ki-agent/).

## Wo endet Garantie und wo beginnt Field Service?

An der Tür des Kunden. Manufacturing Cloud klärt, ob ein Schaden gedeckt ist, wer welchen Betrag bekommt und wer am Ende zahlt. Wer wann mit welchem Teil zum Kunden fährt, ist Field Service: Arbeitsaufträge, Terminplanung, Wartungspläne und Technikerlager.

| Thema | Wohin es gehört |
|---|---|
| Garantiebedingungen, Ansprüche, Prüfung, Lieferantenregress | Manufacturing Cloud |
| Rückrufdefinition, betroffene Maschinen, Status pro Händler | Manufacturing Cloud |
| Assets, Milestones, Teilnehmer | gemeinsam, einmal entworfen |
| Arbeitsaufträge, Termine, Wartungspläne, Fahrzeuglager | Field Service |
| Telemetrie und Zustand der Maschine | Zusatzprodukt Connected Assets |

Servicetechniker brauchen in jedem Fall Field-Service-Lizenzen. Die [Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/) verlangt außerdem „at least one (1) Service Cloud user license“ und schließt Dispatcher- und Technician-Lizenzen für Case-Bearbeitung aus. Zwei Zusatzprodukte tauchen hier oft auf: Laut [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) kostet Connected Assets 15.000 US-Dollar pro Org und Monat, Asset Service Lifecycle Management 75 US-Dollar pro Nutzer und Monat, Letzteres zusammen mit den Field-Service-Editionen. Für eine saubere installierte Basis brauchen Sie keines davon; ob sich Telemetrie lohnt, behandelt [Predictive Maintenance in Salesforce](../../../blog/predictive-maintenance-salesforce-datenbasis/).

Asset-Hierarchie, Wartungspläne und Servicepartner sind Thema des Kapitels [Assets, Wartung, Teile und Partner](../../field-service/field-service-assets-wartung-teile/) der Field-Service-Masterclass. Wenn Sie beide Clouds einführen, entwerfen Sie das Asset-Modell einmal für beide. Diese Grenze zu ziehen, gehört zu meiner Arbeit an der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/).

## In welcher Reihenfolge würde ich After-Sales einführen?

1. **Lücken zählen.** Nehmen Sie die Garantieansprüche des letzten Jahres und prüfen Sie, wie viele Seriennummern als Asset mit Eigentümer und Garantiebeginn existieren.
2. **Lizenzmix nach Rolle festlegen** und die Leserechte für Service-Cloud-Nutzer schriftlich bestätigen lassen.
3. **Registrierung regeln.** Machen Sie die Übergabemeldung des Händlers zum Pflichtschritt im Portal.
4. **Regelbasierte Prüfung** und die Gutschrift im ERP vor jedem Agenten in Betrieb nehmen.
5. **Eine Kampagne testen**, und zwar an einem vergangenen Qualitätsfall, bevor ein echter Rückruf daran hängt.
6. **Den Agenten zuletzt ergänzen**, mit einer Freigabeschwelle, die Service und Finanzen vereinbart haben.

Die Datenflüsse zwischen SAP und Manufacturing Cloud, Gutschriften eingeschlossen, sind Thema von [Kapitel 5](../erp-ki-und-rollout/).

Garantie, Rückrufe und Agenten in Manufacturing Cloud sind nur so gut wie die installierte Basis darunter, also beginnen Sie dort. Wenn Sie After-Sales auf Manufacturing Cloud planen, [schreiben Sie mir](#contact).
