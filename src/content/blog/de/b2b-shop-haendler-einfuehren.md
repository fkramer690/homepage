---
title: "B2B-Shop für Händler einführen: in welcher Reihenfolge?"
description: "In welcher Reihenfolge Hersteller einen Salesforce-B2B-Shop für Händler öffnen: Wellen nach Buyer Group, Buyer Manager, Innendienst und Tests je Welle."
pubDate: 2026-10-28
lang: de
slug: b2b-shop-haendler-einfuehren
translationKey: commerce-dealer-rollout
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, Einführung, Händler, Buyer Groups, Buyer Manager, Change Management]
takeaways:
  - "Führen Sie einen B2B-Shop in Wellen nach Buyer Group ein, beginnend mit Pilothändlern, die bekannte Teile oft nachbestellen. Ein Big Bang zeigt jeden Datenfehler allen Händlern am selben Tag."
  - "In Salesforce B2B Commerce kommen Käufer über Buyer Groups in den Store. Eine Welle ist deshalb die Menge der Buyer Groups, die den Store erhalten, mit ihren Entitlements und Preisbüchern."
  - "Buyer Manager mit Delegated External User Administration legen Benutzer ihres eigenen Kontos an, setzen Passwörter zurück und deaktivieren Benutzer. Das entlastet Ihren Service Desk."
  - "Der Innendienst nimmt während der Umstellung weiter Bestellungen per Telefon und E-Mail an. Händler wechseln, weil der Shop schneller ist, nicht weil das Telefon schweigt."
  - "Testen Sie vor jeder Welle Entitlements, Preise, Bestandsabfragen und Checkout mit einem echten Käuferkonto dieser Welle, nicht nur mit einem Admin-Benutzer."
faq:
  - q: "Sollte ein B2B-Shop für alle Händler gleichzeitig live gehen?"
    a: "Davon rate ich ab. Starten Sie mit einer Pilotgruppe von Händlern, die oft nachbestellen, beheben Sie, was sie finden, und nehmen Sie weitere Buyer Groups in Wellen dazu. Jede Welle bringt eigene Entitlements, Preise und ERP-Daten mit, und Fehler bleiben auf eine Gruppe begrenzt."
  - q: "Welche Händler gehören in den Pilot?"
    a: "Händler mit vielen Wiederholbestellungen bekannter Teile, einem Ansprechpartner, der ehrlich Rückmeldung gibt, und überschaubaren Sonderkonditionen. Sie zeigen schnell, ob Suche, Preise und Checkout funktionieren, und profitieren am meisten vom Shop."
  - q: "Wer verwaltet die Benutzer der Händler in einem Salesforce-B2B-Store?"
    a: "Ihr Admin aktiviert Konten und Kontakte als Käufer. Mit Delegated External User Administration kann ein Buyer Manager beim Händler Benutzer seines eigenen Kontos anlegen und bearbeiten, Passwörter zurücksetzen und Benutzer aktivieren oder deaktivieren. Salesforce unterstützt das unter anderem für Customer Community Plus und Partner Community."
  - q: "Welche Lizenz brauchen Händlerbenutzer im B2B-Shop?"
    a: "Trailhead nennt Customer Community Plus für Käufer und Buyer Manager. Der Salesforce-Listenpreis für Experience Cloud for Manufacturing liegt bei 35 Dollar pro Mitglied oder 15 Dollar pro Login und Monat, jährlich abgerechnet."
draft: false
---

Führen Sie einen B2B-Shop für Händler in Wellen ein, nach Buyer Group, und beginnen Sie mit Pilothändlern, die bekannte Teile oft nachbestellen. In Salesforce B2B Commerce kommen Käufer über Buyer Groups in den Store, also ist jede Welle eine festgelegte Menge von Buyer Groups mit eigenen Entitlements, Preisen und ERP-Daten. Bevor eine Welle startet, testen Sie genau diese Daten mit einem echten Käuferkonto. Geben Sie jedem Händler einen Buyer Manager, der seine eigenen Benutzer verwaltet, und lassen Sie den Innendienst weiter Telefonbestellungen annehmen, bis der Shop sich bewährt hat. Ein typischer Plan hat drei Wellen über sechs Monate. Die Reihenfolge folgt dem Nachbestellvolumen und der Datenqualität, nicht dem Organigramm.

## Warum in Wellen statt mit einem Go-live?

Ein B2B-Shop zeigt jedem Händler seinen eigenen Katalog und seine eigenen Preise. Darin liegt sein Nutzen und auch sein Risiko. Ein falsches Entitlement versteckt Teile, die ein Händler braucht, ein falsches Preisbuch zeigt einen Preis, den der Vertrieb nie vereinbart hat. Bei einem Big Bang erreichen diese Fehler alle Händler am selben Tag, und der Innendienst verbringt die ersten Wochen mit Erklären statt mit Verkaufen.

Das Datenmodell von Salesforce macht Wellen naheliegend. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) sind Käufer über Buyer Groups mit Stores verbunden. Eine Buyer Group bündelt Käuferkonten mit gleichen Anforderungen und trägt deren Entitlement Policies, die festlegen, welche Produkte sie sehen, sowie deren Preisbücher. Ein Store kann mehrere Buyer Groups haben. Eine Welle ist also einfach die Menge der Buyer Groups, die Sie mit dem Store verbinden, und Sie können jede Gruppe testen, bevor ihre Händler Zugang bekommen. Wie Sie diese Gruppen schneiden, steht in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/).

Dieselbe Logik gilt für jede Einführung, die ich plane. Für Salesforce Field Service habe ich sie in [Einführung in Wellen](../salesforce-field-service-einfuehrung/) beschrieben, für Manufacturing Cloud in [Manufacturing Cloud weltweit ausrollen](../manufacturing-cloud-weltweit-ausrollen/). Bei einem Händlershop sind die Wellen kleiner und schneller, weil die Benutzer extern und die Prozesse einfacher sind.

## Welche Händler kommen zuerst?

Pilothändler wähle ich nach vier Kriterien:

- **Viele Wiederholbestellungen bekannter Teile.** Ersatzteile, Verbrauchsmaterial und Zubehör, die der Händler nach Teilenummer bestellt. Diese Händler merken in einer Woche, ob Suche und Nachbestellung funktionieren.
- **Ein Ansprechpartner, der ehrlich Rückmeldung gibt.** Eine Einkaufsleiterin, die sagt, was sie stört, ist mehr wert als das größte Konto.
- **Wenige Sonderkonditionen.** Händler mit komplexer Preislogik kommen in eine spätere Welle, wenn die Preislogik an einfachen Fällen getestet ist.
- **Saubere Daten.** Korrekte Kontohierarchie im ERP, gepflegte Kontakte, bekannte Lieferadressen.

Lassen Sie den größten Händler aus dem Pilot heraus, wenn er diese Kriterien nicht erfüllt. Ein schlechter erster Eindruck beim wichtigsten Konto ist schwer zu reparieren.

## Was machen Buyer Manager?

Salesforce unterscheidet Käufer und Buyer Manager. Laut dem [Trailhead-Modul zu Personas und Berechtigungen](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions) bekommen Käufer Customer Community Plus mit dem Permission Set B2B Commerce User. Buyer Manager bekommen dieselbe Lizenz mit B2B Commerce Super User, der Berechtigung Manage Account Address und Delegated External User Administration. Ein Buyer Manager genehmigt Einkäufe und verwaltet Käufer und kann laut dem [Modul zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) auch die Bestellungen und Warenkörbe seiner Käufer sehen.

[Delegated External User Administration](https://help.salesforce.com/s/articleView?id=platform.networks_DPUA.htm&language=en-us&type=5) macht Wellen günstig im Betrieb. Benutzer mit dieser Berechtigung können Mitglieder des Kontos, das sie verwalten, anlegen und bearbeiten, Passwörter zurücksetzen und Mitglieder aktivieren oder deaktivieren. Die Einkaufsleitung eines Händlers nimmt dann eine neue Kollegin auf, ohne ein Ticket bei Ihrem Service Desk. Planen Sie vor jeder Welle einen Buyer Manager pro Händler ein und zeigen Sie ihm die Benutzerverwaltung in einem kurzen Termin.

Auch Lizenzen gehören in den Plan. Customer Community Plus gibt es laut der [Seite zu Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) pro Mitglied oder pro Login, jährlich abgerechnet. Welche Variante passt, hängt davon ab, wie oft Händler bestellen, siehe [B2B Commerce Lizenzen für Käufer](../b2b-commerce-lizenzen-kaeufer/). Große Händlergruppen mit vielen Standorten brauchen eine weitere Prüfung beim Account Switcher, mit dem ein Käufer für mehrere Konten bestellt; die Grenze steht in den [Salesforce-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html).

```kennzahlen
35 $ | Customer Community Plus pro Mitglied und Monat
15 $ | Customer Community Plus pro Login und Monat
200 | Konten pro Käufer, ab denen der Account Switcher langsamer wird
quelle: Salesforce, Seite zu Experience Cloud for Manufacturing (Listenpreise, jährliche Abrechnung) und Salesforce-Limits zu Buyer Groups und Konten
```

## Was muss vor jeder Welle getestet werden?

Admin-Benutzer sehen alles, ein Test mit Admin-Rechten beweist also nichts über einen Händler. Melden Sie sich vor jeder Welle als echter Käufer dieser Welle an und prüfen Sie:

1. **Entitlements.** Sieht der Käufer die Teile, die er heute kauft, und nicht die Teile anderer Gruppen?
2. **Preise.** Zeigen zehn typische Artikel den Preis, den der Händler heute zahlt, einschließlich Staffelpreisen? Kommen Preise live aus dem ERP, antwortet der Aufruf schnell genug?
3. **Bestand und Liefertermine.** Passen die Verfügbarkeitsangaben zu dem, was das ERP sagt?
4. **Checkout.** Kommt eine Bestellung mit Bestellnummer im ERP an, mit richtiger Lieferadresse und richtigen Zahlungsbedingungen?
5. **Bestellhistorie und Status.** Erscheint die Bestellung im Shop mit dem Status aus dem ERP?

Jede Welle bringt neue Daten, also bekommt jede Welle diesen Test, nicht nur die erste. Behandeln Sie Buyer Groups, Entitlement Policies und Preisbücher als Konfiguration, die durch Ihre Pipeline läuft, wie im DevOps-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/) beschrieben.

## Was passiert mit dem Innendienst?

Der Innendienst nimmt während der gesamten Einführung weiter Bestellungen per Telefon und E-Mail an. Händler wechseln in den Shop, weil er schneller und immer erreichbar ist, nicht weil der alte Kanal abgeschaltet wurde. Ein erzwungener Wechsel erzeugt Frust genau bei den Händlern, die Sie gewinnen wollen.

Der Innendienst bekommt aber eine neue Aufgabe: Ruft ein Pilothändler mit einer Nachbestellung an, die der Shop hätte abwickeln können, bietet die Kollegin an, ihn einmal durch den Shop zu führen. Nach zwei bis drei Monaten messen Sie je Buyer Group, wie viele Auftragspositionen über den Shop kommen, und sprechen mit den Händlern, die beim Telefon bleiben. Welche Zahlen dabei zählen, steht in [B2B-Shop Kennzahlen nach dem Go-live](../b2b-shop-kennzahlen-nach-go-live/). Außerdem muss der Innendienst Shop-Bestellungen in Salesforce sehen, damit er Statusanrufe beantworten kann, ohne dass der Händler alles wiederholt.

## Ein typisches Szenario: drei Wellen in sechs Monaten

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren verkauft Ersatzteile an 250 Händler in Deutschland, Österreich und der Schweiz.

```schritte
Welle 1 | Monat 1 und 2
  15 Pilothändler in Deutschland mit hohem Nachbestellvolumen und Standard-Händlerpreisen, eine Buyer Group. Wöchentliche Feedback-Termine, Korrekturen alle zwei Wochen.
Welle 2 | Monat 3 und 4
  Die übrigen deutschen Händler in drei Buyer Groups nach Händlerstufe. Der Innendienst weist Anrufer aktiv auf den Shop hin.
Welle 3 | Monat 5 und 6
  Österreich und die Schweiz mit eigenen Preisbüchern und Lieferbedingungen, dazu die großen Schlüsselkunden mit Sonderkonditionen.
```

Zwischen den Wellen liegen jeweils zwei Wochen ohne neue Gruppe, reserviert für Korrekturen und den Test der Daten der nächsten Welle. Zeigt Welle 1, dass die Suche Teile über alte Teilenummern nicht findet, wartet Welle 2, bis das gelöst ist.

## Wo starten Sie?

Beginnen Sie mit einer Liste aller Händler mit ihren jährlichen Auftragspositionen, ihrer Preislogik und der Qualität ihrer Daten, und wählen Sie daraus die Pilotgruppe. Benennen Sie für jeden Pilothändler einen Buyer Manager, richten Sie die Test-Käuferkonten ein und schreiben Sie die fünf Prüfungen oben auf. Den Rest des Themas, von Agenten bis zum Umstieg von Aura auf LWR, finden Sie im Masterclass-Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/). Wenn Händler und Innendienst ihre Arbeitsweise ändern müssen, planen Sie [Change Management](../../leistungen/change-management/) ab der ersten Welle ein.

Ein Händlershop gelingt, wenn die ersten Händler ihre Teile zu ihrem Preis beim ersten Versuch finden, also führen Sie ihn in Wellen ein und testen Sie jede einzelne. Wenn Sie eine solche Einführung planen, [schreiben Sie mir](#contact).
