---
title: "Field Service Assets: Wartung, Ersatzteile und Partner"
description: "Wie Maschinenbauer Anlagen in Salesforce Field Service als Assets abbilden, Wartung nach Betriebsstunden auslösen, Teile im ERP lassen und Partner einbinden."
lang: de
slug: field-service-assets-wartung-teile
course: field-service
translationKey: fsl-04
chapter: 4
short: "Assets, Wartung, Teile, Partner"
summary: "Wie Maschinen als Assets abgebildet werden, Wartung nach Kalender oder Betriebsstunden, Ersatzteile mit dem ERP und Servicepartner im selben Prozess."
takeaways:
  - "Eine Komponente wird zum Asset, wenn sie eine eigene Seriennummer, eine eigene Wartung oder eine eigene Garantie hat; alles andere bleibt in der Stückliste im PLM. Meist bleiben zwei oder drei Ebenen pro Maschine."
  - "Ein Wartungsvertrag verteilt sich in Field Service auf drei Objekte: Servicevertrag für das Verkaufte, Wartungsplan für geplante Einsätze und Entitlement für die zugesagte Reaktionszeit."
  - "Wartung nach Betriebsstunden braucht einen Zähler am Asset, einmal am Tag aus ERP, IoT-Plattform oder vom Techniker gefüllt, und eine kriterienbasierte Regel für „2.000 Stunden oder 12 Monate“."
  - "Das ERP führt Ersatzteilbestand und Materialstamm; Field Service hält eine Kopie für Fahrzeuge und Techniker und meldet verbaute Teile zurück."
  - "Servicepartner arbeiten im selben Prozess, wenn jeder Partnertechniker eine eigene Serviceressource ist und jede Partnerfirma ein eigenes Servicegebiet bekommt."
articles: [field-service-asset-hierarchy, field-service-maintenance-contracts, field-service-usage-based-maintenance, predictive-maintenance-data-readiness, asset-service-lifecycle-management-addon, field-service-spare-parts, field-service-service-partners]
faq:
  - q: "Wie tief sollte ein Maschinenbauer Assets in Salesforce Field Service abbilden?"
    a: "So tief, wie der Service es nutzt. Ich mache eine Komponente zum Asset, wenn sie eine eigene Seriennummer, eine eigene Wartung oder eine eigene Garantie hat. Salesforce erlaubt 50 Ebenen und 10.000 Assets pro Hierarchie, die Baumansicht zeigt aber nur 500, und jedes weitere Asset kostet Pflege."
  - q: "Kann Field Service Wartung nach Betriebsstunden auslösen?"
    a: "Ja. Maintenance Work Rules können kalenderbasiert, nutzungsbasiert oder kriterienbasiert sein. Nutzungs- und Kriterienregeln lesen ein Feld am Asset, etwa einen Betriebsstundenzähler, und erzeugen einen Arbeitsauftrag, sobald der Schwellwert erreicht ist."
  - q: "Brauche ich Asset Service Lifecycle Management für Wartungspläne?"
    a: "Nein. Assets, Wartungspläne, Serviceverträge und Entitlements gehören zum Kern von Field Service. Das Add-on für 75 US-Dollar pro Nutzer und Monat (Preisliste, Oktober 2026) ergänzt Abläufe wie die Asset Coverage View, Work Order Estimation, Product Service Campaigns und Depotreparatur."
  - q: "Gehört der Ersatzteilbestand in Field Service oder ins ERP?"
    a: "Ins ERP. Es bewertet den Bestand, steuert den Einkauf und bucht in die Finanzbuchhaltung. Field Service braucht eine Kopie des Fahrzeugbestands für die Planung und die Offline-App und meldet verbaute Teile ans ERP zurück."
  - q: "Wie arbeiten Subunternehmer in Salesforce Field Service?"
    a: "Entweder ist jeder Partnertechniker eine Serviceressource mit eigenem Benutzer, oder die Partnerfirma ist eine kapazitätsbasierte Ressource, die ihre Leute selbst einteilt. Contractor Plus kostet 80 Euro pro Nutzer oder 32 Euro pro Login und Monat (Preisliste, Oktober 2026)."
draft: false
---

Für einen Maschinenbauer funktioniert Salesforce Field Service am besten mit einer flachen installierten Basis: Die Maschine und die Baugruppen mit eigener Seriennummer, eigener Wartung oder eigener Garantie werden Assets, alles andere bleibt im PLM. Ein Wartungsvertrag verteilt sich auf Servicevertrag, Wartungsplan und Entitlement. Gewartet wird nach Kalender, nach Betriebsstunden oder nach Kriterien wie „2.000 Stunden oder 12 Monate“, gespeist von einem täglichen Zähler aus ERP oder IoT-Plattform. Den Ersatzteilbestand führt das ERP, Field Service hält eine Kopie für die Fahrzeuge. Servicepartner bekommen eine Ressource pro Techniker und ein Gebiet pro Firma. Add-ons wie Asset Service Lifecycle Management kommen zuletzt, wenn diese Grundlagen stehen.

## Wie tief sollte die installierte Basis gehen?

Field Service, das Salesforce heute als [Field Service and Operations](https://www.salesforce.com/de/products/field-service/pricing/) verkauft, hängt fast alles in diesem Kapitel am Asset auf. [Kapitel 3](../field-service-mobile-app-dokumente/) hat gezeigt, wie Techniker ihre Arbeit in der App dokumentieren. Hier geht es darum, woran sie sie dokumentieren.

Ein Asset ist ein Produkt, das ein Kunde gekauft oder installiert hat, verknüpft mit einem Account, einem Kontakt oder beidem. Das Feld Parent Asset baut die Hierarchie. Die [Field-Service-Limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) in der Salesforce-Hilfe erlauben 2.000 untergeordnete Assets pro Asset, 50 Ebenen und 10.000 Assets pro Hierarchie, die Baumansicht zeigt Hierarchien bis 500 Assets.

Diese Limits greifen selten zuerst. Tiefe kostet bei der Datenpflege, bei Wartungsplänen und auf den Tablets der Techniker. Meine Faustregel hat drei Fragen, und ein Ja macht eine Komponente zum Asset:

- **Eigene Seriennummer?** Der Techniker muss festhalten, welches Getriebe oder welcher Roboter eingebaut oder getauscht wurde.
- **Eigene Wartung?** Maintenance Work Rules hängen an Assets, eine Spindel mit eigenem Intervall braucht also eines.
- **Eigene Garantie?** Ein Zukaufteil, dessen Garantie an einem anderen Tag beginnt als die der Maschine.

Alles andere bleibt in der Stückliste im PLM. Bei den meisten Maschinen bleiben so zwei oder drei Ebenen. Die Rechnung für eine Verpackungslinie mit 6 Maschinen, 40 Baugruppen mit Seriennummer und 900 Teilen steht in [Asset-Hierarchie: Wie tief pro Maschine?](../../../blog/field-service-asset-hierarchie-maschinen/).

Zwei Entscheidungen gehören vor den ersten Import aus dem ERP. Erstens: Werte, die sich je Baureihe unterscheiden, etwa eine Firmware-Version, kommen in Asset-Attribute. Das [Objekt AssetAttribute](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_assetattribute.htm), verfügbar seit API-Version 57.0, speichert einen Wert pro Asset zu einer Attributdefinition, eine neue Baureihe braucht also kein neues Feld. Zähler, die Wartung auslösen, bleiben Zahlenfelder am Asset. Zweitens: Jemand verantwortet den Baum nach der Auslieferung. Das ERP liefert die installierte Basis, aber ein Jahr später tauscht ein Techniker ein Getriebe oder ein Händler rüstet einen Roboter nach. Ab dann muss ein System führen. Eine Mischung aus beiden ergibt eine Hierarchie, der niemand traut.

## Servicevertrag, Wartungsplan, Entitlement: Welches Objekt macht was?

Ein Wartungsvertrag steckt nicht in einem Objekt. In Field Service verteilt er sich auf drei:

| Objekt | Beantwortet | Beispiel |
|---|---|---|
| Servicevertrag mit Vertragspositionen | Was verkauft wurde, für welche Assets | Dreijahresvertrag für eine Fertigungslinie |
| Wartungsplan mit Maintenance Work Rules | Wann geplante Wartung stattfindet | Service alle 2.000 Betriebsstunden |
| Entitlement mit Entitlement-Prozess und Meilensteinen | Worauf der Kunde Anspruch hat und ob es eingehalten wurde | Techniker innerhalb von 24 Stunden vor Ort |

Der Wartungsplan erzeugt Arbeitsaufträge für geplante Einsätze im Voraus. Das Entitlement zählt bei Störungen: Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders) laufen Entitlement-Prozesse nur auf Datensätzen ihres Typs, Arbeitsaufträge brauchen also einen eigenen Prozess vom Typ Work Order. Ein Flow kann dann die Priorität eines Arbeitsauftrags mit zugesagter Reaktionszeit anheben, und die Engine plant ihn zuerst ein. Wie die drei Objekte zusammenspielen, samt Prioritätslogik, steht in [Wie bildet man Wartungsverträge ab?](../../../blog/salesforce-field-service-wartungsvertraege/).

Die kaufmännische Seite ist eine eigene Frage. Wenn Sie Wartungsverträge als Abonnement verkaufen und quartalsweise abrechnen, kann Revenue Cloud die Abrechnung übernehmen, und Field Service weiß von diesen Abonnements nichts. Die Übergabe zwischen beiden beschreiben [Wartungsverträge wiederkehrend abrechnen](../../../blog/wartungsvertraege-wiederkehrend-abrechnen/) und das Revenue-Cloud-Kapitel zu [Abrechnung und nutzungsbasierten Preisen](../../revenue-cloud/abrechnung-und-nutzungsbasierte-preise/).

## Kalender oder Betriebsstunden: Welcher Auslöser passt?

Ein Halbjahreskalender ist für Maschinen, die beim einen Kunden einschichtig und beim anderen dreischichtig laufen, doppelt falsch. Der Wenignutzer bekommt Einsätze, die er nicht braucht, der Vielnutzer wartet zu lange. Laut Salesforce-Hilfe zur [vorbeugenden Wartung](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5) arbeiten Maintenance Work Rules auch mit Nutzung und Kriterien:

| Regeltyp | Liest | Passt für |
|---|---|---|
| Kalenderbasiert | Ein Intervall in Tagen, Wochen oder Monaten | Gesetzliche Prüfungen, feste Vertragstermine |
| Nutzungsbasiert | Ein Nutzungsfeld am Asset, das eine Formel sein darf, und ein Feld für das nächste Auftreten, das das System pflegt | Betriebsstunden, Zyklen, Hübe |
| Kriterienbasiert | Filterkriterien (Recordset Filter Criteria) auf Asset-Feldern | Schwellwerte und „was zuerst eintritt“ |

Drei Details prägen das Design. Eine kriterienbasierte Regel erzeugt keinen neuen Arbeitsauftrag, solange ihr letzter noch offen ist, so die Hilfeseite zur [kriterienbasierten Wartung](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5). Dieselbe Seite zeigt, dass eine Kriterienregel und eine Kalenderregel unabhängig voneinander Arbeitsaufträge erzeugen, auch mit demselben vorgeschlagenen Datum. „2.000 Stunden oder 12 Monate“ gehört deshalb in eine Regel mit ODER-Verknüpfung. Und die Bedingung muss nach dem Einsatz zurückgesetzt werden, etwa mit einem Flow, der beim Abschluss des Arbeitsauftrags den Zählerstand speichert.

Die Limits, die zählen: Ein Generierungslauf erzeugt höchstens 2.600 Arbeitsaufträge und Positionen pro Plan, ein Plan mit zählbasierter Regel nimmt höchstens 2.000 Assets auf, und Salesforce empfiehlt höchstens fünf Maintenance Work Rules pro Plan oder Asset. Ich teile Pläne nach Baureihe oder Region, damit jeder deutlich darunter bleibt und einen Verantwortlichen hat.

Der Zähler kommt aus drei Quellen: von der IoT-Plattform für vernetzte Maschinen, aus dem ERP, wenn es Zählerstände ohnehin bekommt, oder vom Techniker, der ihn vor Ort abliest. Für Intervalle in Hunderten von Stunden reicht ein Wert pro Tag. Die Einrichtung Schritt für Schritt, mit dem Flow zum Zurücksetzen, steht in [Wartung nach Betriebsstunden einrichten](../../../blog/field-service-wartung-nach-betriebsstunden/).

## Wann ist Predictive Maintenance realistisch?

Vorausschauende Wartung braucht eine Servicehistorie mehr als Sensoren. Salesforce hat Asset Service Prediction im [Juni 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) als KI-Modell angekündigt, das vorhersagt, wann und warum ein Asset ausfallen kann, auf Basis aktueller Asset-Daten und der Servicehistorie ähnlicher Assets, mit einer offenen Beta für den folgenden Winter. Die aktuelle [Seite zum Asset Management](https://www.salesforce.com/service/field-service-management/asset-management/) beschreibt die Funktion ohne Status. Lassen Sie sich die Verfügbarkeit in Ihrer Edition schriftlich bestätigen.

Das Modell kann nur lernen, was Ihre Arbeitsaufträge enthalten. Hängen Störungsaufträge nicht an einer Seriennummer, stehen Ausfallursachen im Freitext und melden Händler nur Garantiefälle, gibt es nichts zu lernen. Dann empfehle ich die Nutzungs- und Kriterienregeln aus dem vorigen Abschnitt und einige verdichtete Zustandssignale.

Maschinendaten kosten Geld, sobald sie in Data 360 landen. Die [Flex-Credits-Preisliste vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) setzt für die Streaming Pipeline in der Grundstufe 3.500 Credits pro Million Zeilen an. 300 Maschinen mit je 12 Signalen erzeugen als Sekundenwerte rund 9,3 Milliarden Zeilen im Monat, als 15-Minuten-Verdichtung rund 10,4 Millionen, also 900-mal weniger. Rohe Zeitreihen gehören in die IoT-Plattform oder das Historian-System. Den Datencheck in sechs Punkten und die volle Kostenrechnung finden Sie in [Predictive Maintenance in Salesforce: die Datenbasis](../../../blog/predictive-maintenance-salesforce-datenbasis/).

## Brauchen Sie Asset Service Lifecycle Management oder Connected Assets?

Zu Beginn meist nicht. Assets mit Hierarchien, Wartungspläne, Serviceverträge und Entitlements gehören zum Kern von Field Service. Die [Preisliste](https://www.salesforce.com/service/field-service-management/pricing/) (Oktober 2026) zeigt zwei Asset-Add-ons:

- **Asset Service Lifecycle Management** für 75 US-Dollar pro Nutzer und Monat. Der [ASLM-Bereich der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5) nennt unter anderem Asset Coverage View, Asset Interactive Hierarchy, Work Order Estimation, Product Service Campaigns, Depotreparatur, Advanced Exchange, Lagerfunktionen und Stundenzettel.
- **Connected Assets** für 15.000 US-Dollar pro Org und Monat, zum Listenpreis also 180.000 US-Dollar im Jahr, für Telemetrie, den Asset Health Score und 10.000 vernetzte digitale Assets.

Die Vergleichstabelle der Preisliste markiert Asset Coverage View und Interactive Hierarchy sogar bei Agentforce 1 Field Service als „Available for Purchase“. Lassen Sie sich das im Angebot bestätigen.

Mehrere ASLM-Funktionen betreffen den Bestand: Reservierung, Chargen, Inventur, Nachschub. Wenn SAP den Bestand führt, entsteht damit eine zweite Wahrheit. Für einen Maschinenbauer passen aus meiner Sicht die Funktionen, die das ERP auf der Serviceseite schlecht kann: Deckungsprüfung an der Hotline, Reparaturangebote, Nachrüstkampagnen und Depotreparatur. Den Vergleich von Add-on und Eigenbau für 30 Nutzer finden Sie in [Asset Service Lifecycle Management: Lohnt das Add-on?](../../../blog/asset-service-lifecycle-management-zusatz/).

## Ersatzteile: Warum führt das ERP den Bestand?

Im ERP hat ein Ersatzteil einen Wert, einen Einkaufsprozess, Mindestbestände und Buchungen in die Finanzbuchhaltung. Field Service hält Mengen je Standort und protokolliert Bewegungen, und mehr soll es auch nicht tun. Laut [Datenmodell für die Lagerverwaltung](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm) hält ein Product Item den Bestand eines Teils an einem Standort, Products Required listen, was ein Auftrag braucht, und Products Consumed erfassen, was verbaut wurde. Die Menge am Product Item passt sich dabei automatisch an. Eine [Location](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_location.htm) kann ein Lager oder ein Servicefahrzeug sein.

Die Datenflüsse folgen einer Regel: Das ERP schickt Materialstamm und Bestand, Salesforce meldet zurück, was vor Ort passiert ist. Verbaute Teile gehen nach Abschluss des Einsatzes ans ERP, Teileanforderungen werden dort zu Umlagerungen oder Bestellungen. Holen Sie nur die Fahrzeuge und die Lager nach Salesforce, die sie auffüllen. 40 Fahrzeuge mit je 300 Teilen sind schon 12.000 Product Items, und jedes davon landet offline auf einem Gerät. Welche Daten die App offline halten sollte, steht in [Field Service App offline](../../../blog/field-service-app-offline-briefcase/), die Aufgabenteilung in [Ersatzteile: ERP oder Salesforce?](../../../blog/salesforce-field-service-ersatzteile-erp/).

Viele Ersatzteilanfragen brauchen gar keinen Einsatz. Wenn Kunden ein bekanntes Teil für ihre Maschine selbst finden und bestellen, entlastet ein B2B-Shop die Hotline. Das B2B-Commerce-Kapitel zu [Katalog, Suche und Sichtbarkeit](../../b2b-commerce/katalog-suche-sichtbarkeit/) zeigt, wie Teile pro Maschine im Shop sichtbar werden.

## Wohin gehört die Garantie?

Garantie berührt drei Produkte, deshalb legen Sie den Verantwortlichen vor dem Kauf fest. Field Service hat Garantiebedingungen und Asset-Garantien im [Datenmodell für Garantien](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html), ASLM ergänzt Deckungsansicht und Kampagnen, und Manufacturing Cloud bringt [Warranty Lifecycle Management](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/get-started-with-warranty-lifecycle-management) mit Garantiebedingungen auf mehreren Produktebenen und Ansprüchen, die Partner und Distributoren über ein Portal einreichen.

Meine Regel: Reichen Händler Garantieansprüche ein, gehört die Garantie in die Manufacturing Cloud, wie im Manufacturing-Cloud-Kapitel zu [Garantie und After-Sales](../../manufacturing-cloud/garantie-und-after-sales/) beschrieben. Müssen nur Ihre eigenen Techniker bei der Terminbuchung die Deckung sehen, reicht das Entitlement am Asset, und die Ansprüche bleiben im ERP. Zwei Garantiemodelle am selben Asset geben demselben Kunden zwei Antworten.

## Wie passen Servicepartner in denselben Prozess?

Partner gehören in denselben Prozess wie Ihre eigenen Techniker: derselbe Plan für den Disponenten, dieselbe App, derselbe Servicebericht, dieselbe Asset-Historie. Der [Architekturleitfaden von Salesforce zu Subunternehmern](https://architect.salesforce.com/docs/architect/fundamentals/guide/field-service-contractor-sharing-patterns) beschreibt zwei Modelle. Ein namentlich geführter Subunternehmer wird ähnlich wie ein Mitarbeiter behandelt und braucht eine eigene Benutzerlizenz. Eine Partnerfirma lässt sich als kapazitätsbasierte Ressource abbilden, und der Partner teilt seine Leute selbst ein. Der Leitfaden nutzt das Servicegebiet als wichtigste Sicherheitsgrenze, mit einem Untergebiet pro Partnerfirma.

Für gleiche Arbeitsweise bevorzuge ich das erste Modell für regelmäßige Partner und das zweite für Partner, die bei Spitzen einspringen. Contractor Plus kostet laut Preisliste 80 Euro pro Nutzer oder 32 Euro pro Login und Monat, ab 2,5 Logins im Monat ist die Nutzerlizenz günstiger. Rollen und Lizenzregeln stehen in [Field Service Lizenzen nach Rolle](../../../blog/field-service-lizenzen-rollen-dispatcher-techniker/), Einrichtung und was bewusst anders bleibt in [Servicepartner einbinden](../../../blog/salesforce-field-service-servicepartner/).

## Ein typisches Szenario, als Annahme: 1.200 Maschinen in drei Baureihen

Ein typisches Szenario, als Annahme: Ein Hersteller von Bearbeitungszentren hat 1.200 Maschinen in drei Baureihen im Feld. Der Servicevertrag sagt: Service alle 2.000 Betriebsstunden oder alle 12 Monate, was zuerst eintritt. 700 Maschinen sind vernetzt, 500 nicht. Zwei Partnerfirmen decken Skandinavien ab.

- **Installierte Basis.** Jede Maschine hat sechs Baugruppen mit Seriennummer und eigener Garantie oder eigenem Intervall: 8.400 Assets in zwei Ebenen, bei Auslieferung aus SAP geladen. Techniker erfassen getauschte Baugruppen in der App, die Änderung geht an SAP zurück, SAP bleibt führend.
- **Wartung.** Eine kriterienbasierte Regel pro Maschine mit zwei ODER-verknüpften Bedingungen. Die IoT-Plattform schreibt die Stunden jede Nacht, bei nicht vernetzten Maschinen trägt der Techniker den Stand ein. Sechs Pläne, einer pro Baureihe und Region, mit höchstens 250 Maschinen.
- **Wirkung.** Angenommen, 300 Maschinen laufen zweischichtig mit rund 4.000 Stunden im Jahr und bekommen zwei Services, die 900 einschichtigen Maschinen fallen auf die 12-Monats-Bedingung zurück. Das sind 1.500 Einsätze im Jahr statt 2.400 mit festem Halbjahresrhythmus.
- **Teile und Partner.** 30 Fahrzeuge als Locations in Salesforce, Bestand nächtlich aus SAP. Die zwei Partner bekommen je ein Gebiet, regelmäßige Techniker Contractor Plus pro Nutzer.
- **Add-ons.** Im ersten Jahr keine. Connected Assets würde 180.000 US-Dollar im Jahr kosten und keine Entscheidung ändern, die ein täglicher Zähler nicht auch trifft.

## Was sollten Sie entscheiden, bevor ein Partner baut?

1. **Asset-Tiefe pro Maschinentyp**, mit den drei Fragen oben, und welches System die installierte Basis nach Auslieferung führt.
2. **Vertragstypen** mit ihren Objekten: was verkauft wurde, welche Wartung, welche Reaktionszeit.
3. **Zählerquelle pro Baureihe** und die Regel, die gilt, wenn ERP und Techniker abweichen.
4. **Bestandsführung** und die Liste der Standorte, die nach Salesforce kommen.
5. **Verantwortung für Garantie**: Field Service, ASLM oder Manufacturing Cloud.
6. **Partnermodell** pro Partnerfirma.

Die meisten dieser Punkte sind Schnittstellenfragen, und daran arbeite ich im Bereich [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/). [Kapitel 5](../field-service-ki-agenten-einfuehrung/) baut auf diesem Datenmodell auf, mit KI-Agenten, Einführung in Wellen und Betrieb, und die [Übersichtsseite](../) listet alle Kapitel.

Assets, Verträge und Teile tragen alles, was später in Field Service kommt, deshalb verdienen sie die ersten Entscheidungen. Wenn Sie eine zweite Meinung zu Ihrer installierten Basis oder Ihrem Wartungsmodell möchten, [schreiben Sie mir](#contact).
