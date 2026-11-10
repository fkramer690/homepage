---
title: "Kundenportal in der Manufacturing Cloud: was Kunden sehen"
description: "Was Kunden im Portal der Manufacturing Cloud sehen und tun sollten, welche Lizenz das abdeckt und wer die Stammdaten führt, wenn Kunden sie selbst pflegen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-kundenportal
translationKey: manufacturing-cloud-customer-portal
topic: service
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Experience Cloud, Kundenportal, Sales Agreements, Fertigung]
series: { id: manufacturing-cloud, part: 7 }
takeaways:
  - "Die Salesforce-Hilfe nennt Sales Agreements nur für die Partnerlizenz. Der genaue Lizenzumfang gehört schriftlich ins Angebot."
  - "Marge und Kosten liegen im selben Objekt wie das Sales Agreement. Kunden bekommen deshalb eine reduzierte Ansicht."
  - "Pflegen Kunden die Rechnungsadresse selbst, wird Salesforce für dieses Feld zum Eingangssystem, mit Regeln für die Synchronisation ins ERP."
faq:
  - q: "Welche Lizenz brauchen Kunden für ein Portal auf der Manufacturing Cloud?"
    a: "Salesforce bietet Customer Community Plus for Manufacturing für Kunden und Partner Community for Manufacturing für Händler und Lieferanten. In meinem Projekt hatten die Kunden Customer Community Plus for Manufacturing. Was genau eine Lizenz abdeckt, lassen Sie sich im Angebot schriftlich bestätigen."
  - q: "Können Kunden ihre Sales Agreements im Portal sehen?"
    a: "Ja, in meinem Projekt sahen Kunden ihre Sales Agreements in einer reduzierten Listenansicht, mit weniger Details als interne Mitarbeiter. Die Daten blieben im Standardobjekt Sales Agreement und wurden im Portal über eine Lightning Web Component angezeigt. Interne Felder wie Marge und Kosten bleiben dabei ausgeblendet."
  - q: "Können Kunden ihre Stammdaten im Portal selbst ändern?"
    a: "Für ausgewählte Felder ja, etwa die Rechnungsadresse. Die Änderung wird zuerst in Salesforce gespeichert und dann ins ERP synchronisiert. Welche Felder Kunden ändern dürfen, sollte eine Liste festlegen, die IT und Fachbereich gemeinsam pflegen."
draft: false
---

Ein Kundenportal auf der Manufacturing Cloud lohnt sich, wenn Kunden dort ihre Rahmenverträge, Bestellungen und offenen Fälle sehen und selbst bestellen oder anfragen können. In einem weltweiten Manufacturing-Cloud-Rollout, den ich begleitet habe, sahen Kunden im Portal ihre Sales Agreements, Bestellungen, Stammdaten und Cases. Sie konnten neue Produkte und Preise anfragen und Bestellungen aufgeben. Drei Entscheidungen bestimmen, ob so ein Portal funktioniert: welche Lizenz die Kunden bekommen, wie viel vom Sales Agreement sie sehen und welches System die Stammdaten führt, wenn Kunden sie selbst ändern.

## Was können Kunden im Portal tun?

Im Projekt hatte das Portal zwei Arten von Funktionen. Kunden konnten sehen:

- **Ihre Sales Agreements**, also die vereinbarten Mengen und Laufzeiten.
- **Ihre Bestellungen.**
- **Ihre Stammdaten**, etwa Adressen.
- **Ihre Cases**, also Anfragen und Reklamationen an den Service.

Außerdem konnten Kunden selbst aktiv werden:

- **Neue Produkte und Preise anfragen.** Die Anfrage landet im Angebotsprozess, den ich in [Teil 2: Vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/) beschreibe.
- **Bestellungen aufgeben.** Eine einfache Auftragserfassung ist im Portal möglich. Sollen Kunden einen großen Katalog mit eigenen Preisen sowie Warenkorb und Checkout nutzen, ist das meist ein B2B-Shop; wann ein Portal reicht, steht in [Kapitel 1 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/).
- **Bestimmte Stammdaten selbst pflegen**, etwa die Rechnungsadresse.

Für den Hersteller hat das einen einfachen Nutzen: Fragen wie „Wie viel habe ich von meinem Rahmenvertrag schon abgerufen?“ oder „Wo steht meine Bestellung?“ beantwortet der Kunde selbst, ohne E-Mail an den Innendienst. Damit das trägt, müssen die Zahlen im Portal stimmen. Woher die Ist-Mengen im Sales Agreement kommen, behandle ich in [Teil 3: Sales Agreements, fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/).

## Welche Lizenz brauchen Kunden im Portal?

Salesforce bietet für die Manufacturing Cloud zwei Portallizenzen an. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.mfg_experience_cloud_licenses.htm&language=en_US&type=5) gilt:

| Lizenz | Für wen | Was die Hilfe nennt |
|---|---|---|
| Partner Community for Manufacturing | Partner, Händler, Lieferanten | Sales Agreements, Account Forecasts, Leads, Opportunities, Angebote, Kampagnen, Garantie- und Bonusansprüche, Besuche |
| Customer Community Plus for Manufacturing | Kunden | Cases, Knowledge-Artikel, Aufträge, Assets und Garantien |

In der Hilfe steht außerdem, dass Customer Community Plus for Manufacturing keine Leads, Opportunities, Kampagnen und Angebote mit externen Nutzern teilt. Sales Agreements nennt die Hilfe für diese Lizenz nicht ausdrücklich. Die [Permission Set License für Sales Agreements in Experience Cloud](https://help.salesforce.com/s/articleView?id=ind.mfg_experience_cloud_psl.htm&language=en_US&type=5) ist für Partnernutzer dokumentiert.

In meinem Projekt hatten die Kunden Customer Community Plus for Manufacturing und sahen ihre Sales Agreements in einer reduzierten Listenansicht. Technisch blieben die Daten im Standardobjekt Sales Agreement und wurden über eine Lightning Web Component angezeigt, die wir für das Portal gebaut haben. Das ist ein anderer Weg als der, den die Hilfe für Partner beschreibt: Partner arbeiten direkt auf Standardseiten mit Sales Agreements und eigener Permission Set License. Die Hilfe beschreibt den Standardzugriff pro Lizenz, nicht, was eine eigene Komponente anzeigen kann. Welcher Weg zu Ihrem Vertrag passt, würde ich nicht allein entscheiden.

```hinweis offen
Wenn Kunden Sales Agreements im Portal sehen sollen, gehört das als Anforderung ins Angebot, mit dem geplanten Weg (Standardseiten oder eigene Komponente) und schriftlicher Bestätigung von Salesforce, dass die gewählte Lizenz das abdeckt.
```

Was Portallizenzen kosten und wie sie sich von internen Lizenzen unterscheiden, beschreibe ich in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/). Wie das Portal neben Händlerboni und Partnerbesuchen in den Händlerkanal passt, steht in [Kapitel 3 der Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/haendler-und-partnerkanal/).

## Kunden sehen weniger vom Sales Agreement als der Vertrieb

Im Projekt sahen Kunden ihre Sales Agreements in einer abgespeckten Listenansicht, nicht mit dem Detailgrad, mit dem der Vertrieb arbeitet.

Dafür gibt es einen technischen Grund. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_salesagreement.htm) liegen im Sales Agreement Felder wie geplante und tatsächliche Marge in Prozent und geplante und tatsächliche Kosten. Diese Werte gehören zum Vertrag, sind aber nichts, was ein Kunde sehen darf. Dasselbe gilt für interne Prognosen und Notizen des Account Managers.

Ich lege deshalb vor dem Bau eine Liste an, welche Felder des Sales Agreements nach außen gehen. Ein Feld in der Komponente auszublenden reicht nicht: Freigaben und Feldberechtigungen der Portalnutzer müssen es ebenfalls schützen. Eine eigene Komponente muss diese Berechtigungen beachten; das teste ich mit mehreren Kunden-Accounts. Bewährt hat sich die Frage, was der Kunde für seine eigene Planung braucht:

- **Was er zugesagt hat:** Produkte, Mengen, Laufzeit, Preise.
- **Was er schon abgenommen hat:** Ist-Mengen pro Zeitraum.
- **Was noch offen ist:** die Differenz.

Alles andere bleibt intern. Die Liste ist auch ein gutes Dokument für die Abnahme, weil der Fachbereich sie ohne Salesforce-Kenntnisse prüfen kann.

Ein Nebeneffekt lohnt einen Gedanken: Sieht ein Kunde selbst, dass er hinter seiner Zusage liegt, kommt das Gespräch über die offene Menge manchmal von ihm. Der Vertrieb sollte das wissen, bevor das Portal live geht, damit er nicht vom Anruf des Kunden überrascht wird.

## Wer führt die Stammdaten, wenn Kunden sie selbst pflegen?

```praxis
Im Projekt konnten Kunden bestimmte Informationen selbst pflegen, etwa die Rechnungsadresse. Diese Daten wurden zuerst in Salesforce gespeichert und dann ins ERP synchronisiert.
```

Das klingt nach einem Detail, verschiebt aber die Rollen der Systeme. Für Kundenstammdaten ist bei Herstellern meist das ERP führend, weil dort Aufträge und Rechnungen entstehen. Pflegt der Kunde ein Feld im Portal, ist Salesforce für dieses Feld das Eingangssystem. Das ERP kann trotzdem führend bleiben und die Änderung erst nach eigener Prüfung übernehmen. Daraus ergeben sich Regeln, die ich vor dem Bau festlege:

1. **Eine Liste der Felder, die Kunden ändern dürfen.** Rechnungsadresse ja, Zahlungsbedingungen nein. Die Liste pflegen IT und Fachbereich gemeinsam.
2. **Eine Richtung pro Feld.** Ein Feld, das der Kunde im Portal ändert, darf nicht gleichzeitig im ERP geändert und zurückgeschrieben werden, sonst überschreiben sich die Systeme gegenseitig.
3. **Sichtbare Fehler.** Lehnt das ERP eine Änderung ab, etwa weil eine Adresse unvollständig ist, muss das jemand sehen. Sonst zeigt das Portal eine Adresse, die im ERP nie angekommen ist, und die nächste Rechnung geht an die alte Adresse.
4. **Status für den Kunden.** Manche Änderungen brauchen eine Prüfung, bevor sie gelten, etwa ein neuer Rechnungsempfänger oder eine andere Gesellschaft. Der Kunde sollte sehen, ob eine Änderung offen, übernommen oder abgelehnt ist.

Wie ich das führende System für Kunden, Produkte, Preise und Aufträge festlege, beschreibe ich unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/).

## Bestellungen aus dem Portal schließen den Kreis über das ERP

Eine Bestellung im Portal ist für den Kunden der letzte Schritt und für den Hersteller der erste. Sie muss ins ERP, dort bestätigt werden und als Ist-Menge zurück ins Sales Agreement fließen. Wer das Portal plant, plant damit den ganzen Kreis.

```ablauf
ext: Kunde
sf: Portalbestellung, Sales Agreement, Anzeige im Portal
erp: ERP-Auftrag, Bestätigung
Kunde --> Portalbestellung
Portalbestellung --> ERP-Auftrag
ERP-Auftrag --> Bestätigung
Bestätigung ..Ist-Menge..> Sales Agreement
Sales Agreement --> Anzeige im Portal
```

Anfragen nach neuen Produkten oder Preisen gehen einen anderen Weg. Sie landen beim Vertrieb und laufen durch Konfiguration, Angebot und Freigabe. Für den Kunden zählt dabei vor allem, dass er den Stand seiner Anfrage sieht, statt nachzufragen.

Cases sind im Portal der vertrauteste Teil. Hier hilft die Manufacturing Cloud mit Bezügen zu Aufträgen und Assets. Diese gehören laut Hilfe zur Kundenlizenz. Wie Garantieansprüche über Händler laufen, steht in [Teil 6](../garantieansprueche-haendler-salesforce/).

## Funktionsliste gegen die Lizenz prüfen

Bevor das Portal gebaut wird, klären Sie diese Punkte:

1. **Was sehen und tun Kunden?** Eine Liste der Funktionen: was Kunden nur sehen (Sales Agreements, Bestellungen, Cases) und was sie selbst tun (anfragen, bestellen, Stammdaten pflegen).
2. **Welche Lizenz deckt das ab?** Lassen Sie sich das schriftlich bestätigen, vor allem für Sales Agreements.
3. **Welche Felder gehen nach außen?** Legen Sie das für das Sales Agreement und die Stammdaten fest, ohne Marge und Kosten.
4. **Welche Daten fließen zurück ins ERP?** Legen Sie pro Feld eine Richtung und eine Fehlerbehandlung fest.

Die Funktionsliste aus Punkt 1 lege ich Salesforce vor und lasse mir pro Zeile bestätigen, welche Portallizenz sie abdeckt. Was offen bleibt, kommt nicht ins erste Release.
