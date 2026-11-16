---
title: "B2B-Shop für Händler einführen: in welcher Reihenfolge?"
description: "In welcher Reihenfolge Hersteller einen Salesforce-B2B-Shop für Händler öffnen: Wellen nach Buyer Group, Buyer Manager, Innendienst und Tests je Welle."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-shop-haendler-einfuehren
translationKey: commerce-dealer-rollout
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Einführung, Händler, Buyer Groups, Buyer Manager, Change Management]
takeaways:
  - "Führen Sie den Shop in Wellen nach Buyer Group ein, zuerst mit Händlern, die oft nachbestellen. Ein Big Bang zeigt jeden Datenfehler allen Händlern zugleich."
  - "Eine Welle umfasst eine festgelegte Menge von Händlerkonten und Benutzern mit den Buyer Groups, Entitlements und Preisbüchern für den Store."
  - "Mit delegierter Administration legen Buyer Manager Benutzer ihres Kontos an, setzen Passwörter zurück und deaktivieren Benutzer. Das entlastet den Service Desk."
  - "Der Innendienst nimmt weiterhin Bestellungen per Telefon und E-Mail an. Händler wechseln, weil der Shop schneller ist, nicht weil das Telefon schweigt."
  - "Testen Sie vor jeder Welle Entitlements, Preise, Bestand und Checkout mit einem Testkäufer, eingerichtet wie die Händler dieser Welle, nicht nur als Admin."
faq:
  - q: "Sollte ein B2B-Shop für alle Händler gleichzeitig live gehen?"
    a: "Davon rate ich ab. Starten Sie mit einer Pilotgruppe von Händlern, die oft nachbestellen, beheben Sie, was sie finden, und nehmen Sie weitere Buyer Groups in Wellen dazu. Jede Welle bringt eigene Entitlements, Preise und ERP-Daten mit, und Fehler bleiben meist auf diese Gruppe begrenzt."
  - q: "Welche Händler gehören in den Pilot?"
    a: "Händler mit vielen Wiederholbestellungen bekannter Teile, einem Ansprechpartner, der ehrlich Rückmeldung gibt, und überschaubaren Sonderkonditionen. Sie zeigen schnell, ob Suche, Preise und Checkout funktionieren, und profitieren am meisten vom Shop."
  - q: "Wer verwaltet die Benutzer der Händler in einem Salesforce-B2B-Store?"
    a: "Ihr Admin aktiviert Konten und Kontakte als Käufer. Mit Delegated External User Administration kann ein Buyer Manager beim Händler Benutzer seines eigenen Kontos anlegen und bearbeiten, Passwörter zurücksetzen und Benutzer aktivieren oder deaktivieren. Salesforce unterstützt das unter anderem für Customer Community Plus und Partner Community. Planen Sie je Händler eine Vertretung für den Buyer Manager ein."
  - q: "Welche Lizenz brauchen Händlerbenutzer im B2B-Shop?"
    a: "Laut Salesforce-Hilfe ist External Apps die Mindestlizenz für Käufer. Buyer Manager, die auf andere Käufer zugreifen, brauchen Customer Community Plus oder höher. Salesforce nennt für Experience Cloud for Manufacturing 35 Dollar pro Mitglied oder 15 Dollar pro Login und Monat, jährlich abgerechnet. B2B Commerce selbst wird separat lizenziert."
draft: false
---

Führen Sie einen B2B-Shop für Händler in Wellen nach Buyer Group ein und beginnen Sie mit Pilothändlern, die bekannte Teile oft nachbestellen. In Salesforce B2B Commerce erhalten Käufer über Buyer Groups Zugang zum Store, deshalb ist jede Welle eine festgelegte Menge von Händlerkonten und Benutzern mit ihren Buyer Groups, Preisen und ERP-Daten. Testen Sie genau diese Daten vor dem Start mit einem Testkäufer. Geben Sie jedem Händler einen Buyer Manager für die eigenen Benutzer und lassen Sie den Innendienst weiter Telefonbestellungen annehmen, bis der Shop sich bewährt hat. Die Reihenfolge richtet sich nach dem Nachbestellvolumen und danach, ob die Daten bereit sind, nicht nach dem Organigramm.

## Warum in Wellen statt mit einem Go-live?

Ein B2B-Shop zeigt jedem Händler seinen eigenen Katalog und seine eigenen Preise. Darin liegt sein Nutzen und auch sein Risiko. Ein falsches Entitlement blendet Teile aus, die ein Händler braucht. Ein falsches Preisbuch zeigt einen Preis, den der Vertrieb nie vereinbart hat. Bei einem Big Bang treten diese Fehler bei allen Händlern am selben Tag auf, und der Innendienst verbringt die ersten Wochen mit Erklären statt mit Verkaufen.

Das Datenmodell von Salesforce macht Wellen naheliegend. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) sind Käufer über Buyer Groups mit Stores verbunden. Eine Buyer Group bündelt Käuferkonten mit gleichen Anforderungen und ist mit Entitlement Policies verknüpft, die festlegen, welche Produkte die Käufer sehen, sowie mit Preisbüchern. Ein Store kann mehrere Buyer Groups haben. Eine Welle ist also eine festgelegte Menge von Konten und Benutzern mit ihren Buyer Groups, und Sie können diese Gruppen testen, bevor die Händler Zugang erhalten. Für den Zugang reicht die Gruppenzuordnung allein nicht: Das Konto muss als Käuferkonto aktiviert sein, und jeder Kontakt braucht einen Benutzer mit passender Lizenz und passenden Permission Sets. Wie Sie diese Gruppen strukturieren, steht in [Buyer Groups und Entitlements](/blog/buyer-groups-entitlements-sichtbarkeit/).

Dieselbe Logik gilt für jede Einführung, die ich plane. Für Salesforce Field Service habe ich sie in [Einführung in Wellen](/blog/salesforce-field-service-einfuehrung/) beschrieben, für Manufacturing Cloud in [Manufacturing Cloud weltweit ausrollen](/blog/manufacturing-cloud-weltweit-ausrollen/). Bei einem Händlershop sind die Wellen oft kleiner und schneller abgeschlossen, weil jede Welle weniger Benutzer umfasst.

## Welche Händler kommen zuerst?

Pilothändler wähle ich nach vier Kriterien:

- **Viele Wiederholbestellungen bekannter Teile.** Ersatzteile, Verbrauchsmaterial und Zubehör, die der Händler nach Teilenummer bestellt. Diese Händler merken in einer Woche, ob Suche und Nachbestellung funktionieren.
- **Ein Ansprechpartner, der ehrlich Rückmeldung gibt.** Eine Einkaufsleiterin, die sagt, was sie stört, ist mehr wert als das größte Konto.
- **Wenige Sonderkonditionen.** Händler mit komplexer Preislogik gehören in eine spätere Welle, wenn die Preislogik an einfachen Fällen getestet ist.
- **Saubere Daten.** Korrekte Kontohierarchie im ERP, gepflegte Kontakte, bekannte Lieferadressen.

Nehmen Sie den größten Händler nicht in den Pilot auf, wenn er diese Kriterien nicht erfüllt. Ein schlechter erster Eindruck beim wichtigsten Konto ist schwer zu reparieren.

## Was machen Buyer Manager?

Salesforce unterscheidet Käufer und Buyer Manager. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_b2b_licenses.htm&type=5) ist External Apps die Mindestlizenz für Käufer. Buyer Manager und Käufer, die auf andere Käufer zugreifen, brauchen Customer Community Plus oder höher. Salesforce liefert die vorkonfigurierten Permission Sets „Buyer“ und „Buyer Manager“ aus. Die Berechtigung „Manage Account Addresses“ ist darin nicht aktiviert. Sollen Käufer oder Buyer Manager Adressen anlegen und ändern, aktivieren Sie diese Berechtigung. Ein Buyer Manager verwaltet die Käufer seines Kontos und kann laut dem [Modul zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) auch die Bestellungen und Warenkörbe seiner Käufer sehen. Behandeln Sie Freigaben von Bestellungen als eigene Anforderung: Sollen Buyer Manager Bestellungen genehmigen, planen und testen Sie diesen Prozess gezielt.

[Delegated External User Administration](https://help.salesforce.com/s/articleView?id=platform.networks_DPUA.htm&language=en-us&type=5) senkt den Betriebsaufwand der Wellen. Benutzer mit dieser Berechtigung können Mitglieder des Kontos, das sie verwalten, anlegen und bearbeiten, Passwörter zurücksetzen sowie Mitglieder aktivieren oder deaktivieren. Die Einkaufsleitung eines Händlers richtet dann für neue Beschäftigte Benutzerkonten ein, ohne ein Ticket bei Ihrem Service Desk zu eröffnen. Die delegierte Administration aktivieren Sie im Profil oder Permission Set des Buyer Managers. Planen Sie vor jeder Welle einen Buyer Manager pro Händler sowie eine Vertretung ein und zeigen Sie ihnen die Benutzerverwaltung in einem kurzen Termin.

Auch Lizenzen gehören in den Plan. Experience Cloud for Manufacturing gibt es laut der [Produktseite](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) pro Mitglied oder pro Login, jährlich abgerechnet. Das sind die Preise für die externen Benutzer, nicht für den Shop selbst. Welche Variante passt, hängt davon ab, wie oft Händler bestellen; mehr dazu in [B2B Commerce Lizenzen für Käufer](/blog/b2b-commerce-lizenzen-kaeufer/). Große Händlergruppen mit vielen Standorten brauchen eine weitere Prüfung beim Account Switcher, mit dem ein Käufer für mehrere Konten bestellt; die Grenze steht in den [Salesforce-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html).

```kennzahlen
35 $ | Experience Cloud for Manufacturing pro Mitglied und Monat
15 $ | Experience Cloud for Manufacturing pro Login und Monat
200 | Konten pro Käufer, weiche Grenze, ab der der Account Switcher langsamer werden kann
quelle: Salesforce, Seite zu Experience Cloud for Manufacturing (Listenpreise, jährliche Abrechnung) und Salesforce-Limits zu Buyer Groups und Konten
```

## Vor jeder Welle als Käufer dieser Welle testen

Admin-Benutzer sehen alles; ein Test mit Admin-Rechten beweist also nichts über einen Händler. Melden Sie sich vor jeder Welle als eigener Testkäufer an, der wie die Händler dieser Welle eingerichtet ist, und nicht mit dem Login eines echten Händlers. Prüfen Sie dann:

1. **Entitlements.** Sieht der Käufer die Teile, die er heute kauft, und nicht die Teile anderer Gruppen?
2. **Preise.** Zeigen zehn typische Artikel den Preis, den der Händler heute zahlt, einschließlich Staffelpreisen? Werden Preise live aus dem ERP abgerufen, antwortet der Aufruf schnell genug?
3. **Bestand und Liefertermine.** Passen die Verfügbarkeitsangaben zu dem, was das ERP sagt?
4. **Checkout.** Erreicht eine Bestellung mit Bestellnummer, richtiger Lieferadresse und richtigen Zahlungsbedingungen das ERP?
5. **Bestellhistorie und Status.** Erscheint die Bestellung im Shop mit dem Status aus dem ERP?

Eine Welle geht erst live, wenn alle fünf Prüfungen für den Testkäufer bestanden sind und offene Fehler behoben sind oder für sie ein vereinbarter Workaround vorliegt. Jede Welle bringt neue Daten, deshalb durchläuft jede Welle diesen Test, nicht nur die erste. Behandeln Sie Buyer Groups, Entitlement Policies und Preisbücher als Konfiguration, die Ihre Pipeline durchläuft, wie im DevOps-Kapitel [Daten und Konfiguration](/masterclass/devops-release-management/daten-und-konfiguration/) beschrieben.

## Der Innendienst nimmt weiter Bestellungen an

Der Innendienst nimmt während der gesamten Einführung weiterhin Bestellungen per Telefon und E-Mail an. Händler wechseln in den Shop, weil er schneller und immer erreichbar ist, nicht weil der alte Kanal abgeschaltet wurde. Ein erzwungener Wechsel erzeugt Frust genau bei den Händlern, die Sie gewinnen wollen. Wollen Sie einfache Telefon-Nachbestellungen irgendwann nicht mehr annehmen, entscheiden Sie das je Buyer Group und kündigen Sie es den Händlern früh an.

Der Innendienst bekommt aber eine neue Aufgabe: Ruft ein Pilothändler mit einer Nachbestellung an, die der Shop hätte abwickeln können, bietet die Kollegin an, ihn einmal durch den Shop zu führen. Nach zwei bis drei Monaten messen Sie je Buyer Group, wie viele Auftragspositionen über den Shop kommen, und sprechen mit den Händlern, die beim Telefon bleiben. Welche Zahlen dabei zählen, steht in [B2B-Shop Kennzahlen nach dem Go-live](/blog/b2b-shop-kennzahlen-nach-go-live/). Außerdem muss der Innendienst Shop-Bestellungen in Salesforce sehen, damit er Statusanrufe beantworten kann, ohne dass der Händler alles wiederholt.

## Rechenbeispiel: drei Wellen in sechs Monaten

Angenommen, ein Hersteller von Kompressoren verkauft Ersatzteile an 250 Händler in Deutschland, Österreich und der Schweiz.

```schritte
Welle 1 | Monat 1 und 2
  15 Pilothändler in Deutschland mit hohem Nachbestellvolumen und Standard-Händlerpreisen, eine Buyer Group. Wöchentliche Feedback-Termine, Korrekturen gehen alle zwei Wochen live.
Welle 2 | Monat 3 und 4
  Die übrigen deutschen Händler in drei Buyer Groups nach Händlerstufe. Der Innendienst weist Anrufer aktiv auf den Shop hin.
Welle 3 | Monat 5 und 6
  Österreich und die Schweiz mit eigenen Preisbüchern, Währung, Steuern und Lieferbedingungen, dazu die großen Schlüsselkunden mit Sonderkonditionen.
```

Zwischen den Wellen liegen jeweils zwei Wochen, in denen keine neue Gruppe startet. Diese Zeit ist für Korrekturen und den Test der Daten der nächsten Welle reserviert. Zeigt Welle 1, dass die Suche Teile anhand alter Teilenummern nicht findet, wartet Welle 2, bis das gelöst ist.

## Erster Schritt: Händlerliste mit Auftragspositionen und Datenqualität

Beginnen Sie mit einer Liste aller Händler, die die jährliche Zahl ihrer Auftragspositionen, ihre Preislogik und die Qualität ihrer Daten enthält, und wählen Sie daraus die Pilotgruppe. Benennen Sie für jeden Pilothändler einen Buyer Manager, richten Sie die Testkäuferkonten ein und notieren Sie die fünf Prüfungen für den Testkäufer. Den Rest des Themas, von Agenten bis zum Umstieg von Aura auf LWR, finden Sie im Masterclass-Kapitel [Agenten, Migration, Einführung](/masterclass/b2b-commerce/agentforce-migration-einfuehrung/). Wenn Händler und Innendienst ihre Arbeitsweise ändern müssen, planen Sie [Change Management](/leistungen/change-management/) ab der ersten Welle ein.
