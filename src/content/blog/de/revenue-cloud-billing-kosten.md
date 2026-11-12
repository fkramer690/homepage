---
title: "Revenue Cloud Billing Kosten: Was Billing Events bedeuten"
metaTitle: "Revenue Cloud Billing Preise: ein Billing Event je 50 Dollar"
description: "Revenue Cloud Billing wird in Billing Events abgerechnet: eines je 50 Dollar Rechnungsbetrag, ohne Übertrag. Mit Beispielrechnung und Tipps zum Order Form."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-billing-kosten
translationKey: revenue-cloud-billing-costs-billing-events
topic: revenue
categories: [revenue-cloud]
contactBrief: licences
tags: [Revenue Cloud Billing, Billing Events, Lizenzen, Preise, Order Form]
takeaways:
  - "Salesforce veröffentlicht keinen Preis pro Billing Event. Preis, Staffel und Mehrverbrauch gehören vor der Unterschrift ins Order Form."
  - "Gezählt wird die Zwischensumme gebuchter Rechnungen ohne Steuer, aber mit Versand. Andere Währungen werden zum Tagesdurchschnittskurs in Dollar umgerechnet."
  - "Billing Events verfallen zum Ende der Bestellung und werden nicht übertragen. Prüfen Sie, ob ein Mehrjahresvertrag einen Pool oder Jahrespools hat."
  - "Was über Billing abgerechnet wird, bestimmt die Kosten: Maschinenrechnungen mit hohen Beträgen verbrauchen weit mehr Events als Abo- und Servicerechnungen."
faq:
  - q: "Was kostet Revenue Cloud Billing?"
    a: "Salesforce führt Revenue Cloud Billing als Add-on mit der Angabe 'Request a Quote' und veröffentlicht keinen Preis pro Billing Event. Öffentlich ist der Verbrauch: laut Rate Sheet vom Februar 2026 ein Billing Event je 50 Dollar Rechnungsbetrag."
  - q: "Was ist ein Billing Event in Revenue Cloud Billing?"
    a: "Ein Billing Event ist die Einheit, in der Salesforce den Verbrauch von Revenue Cloud Billing misst. Das Rate Sheet rechnet 0,02 Billing Events pro Dollar Rechnungsbetrag, für jeden Dollar oder Teil davon, also rechnerisch ein Event je 50 Dollar, bevor gerundet wird."
  - q: "Werden ungenutzte Billing Events übertragen?"
    a: "Nein. Laut Rate Sheet müssen Billing Events bis zum Order End Date verbraucht werden, das in der Usage-Details-Tabelle des Order Forms steht. Ein Übertrag ist ausgeschlossen."
  - q: "Zählt die Umsatzsteuer bei den Billing Events mit?"
    a: "Nein. Das Rate Sheet zählt die Zwischensumme gebuchter Rechnungen. Sie enthält Waren, Leistungen sowie Versand und Handling, aber keine Steuern."
draft: false
---

Revenue Cloud Billing wird in Billing Events abgerechnet: Laut Rate Sheet vom Februar 2026 wird je 50 Dollar Rechnungsbetrag ein Billing Event verbraucht. Billing ist ein Add-on zu Revenue Cloud, und Salesforce nennt den Preis nur auf Anfrage. Gezählt wird die Zwischensumme gebuchter Rechnungen ohne Steuer, aber mit Versand, und andere Währungen werden zum Tagesdurchschnittskurs in Dollar umgerechnet. Ungenutzte Events verfallen am Order End Date. Die Kosten hängen also vom Rechnungsvolumen ab, das Sie über Billing fakturieren, nicht von der Zahl der Nutzer. Schätzen Sie dieses Volumen pro Jahr, bevor Sie verhandeln.

## Wie wird Revenue Cloud Billing bepreist?

Die [Preisseite von Revenue Cloud](https://www.salesforce.com/sales/cpq/pricing/) nennt im Oktober 2026 zwei Editionen und das Billing-Add-on:

| Produkt | Listenpreis | Inhalt laut Seite |
|---|---|---|
| Revenue Cloud Growth | 150 Euro / 150 Dollar pro Nutzer und Monat | Quoting & Configurator, Order Capture, Subscriptions |
| Revenue Cloud Advanced | 200 Euro / 200 Dollar pro Nutzer und Monat | alles aus Growth, Contracts & Orders, Consumption & Invoicing, AI & Analytics |
| Revenue Cloud Billing | Request a Quote | Usage Rating & Digital Wallet, Invoicing Engine & Document Production, Accounting Subledger |

Die Fußnote sagt, dass die Add-ons getrennt von den vorausgesetzten Produkten verkauft werden und einen Jahresvertrag brauchen. Die [EU-Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) führt außerdem Invoice Management als Add-on zu Advanced, mit dem Hinweis "Freemium access available". In der Salesforce-Hilfe und der Entwicklerdokumentation zu Winter '27 heißt die Produktfamilie Revenue Management. Eingeführt wurde sie als Revenue Lifecycle Management. In Angeboten können Ihnen also alle drei Namen begegnen.

Wo "Consumption & Invoicing" in Advanced endet und wo Invoice Management oder das Billing-Add-on beginnt, erklärt die Seite nicht. Lassen Sie sich diese Grenze vom Account Executive für jede Funktion, die Sie brauchen, schriftlich bestätigen. Die Editionen selbst behandelt [Revenue Cloud Preise: Growth, Advanced und Add-ons](/blog/revenue-cloud-editionen-preise/).

## Was ist ein Billing Event?

Ein Billing Event ist die Einheit, in der Salesforce den Verbrauch von Revenue Cloud Billing misst. Das [Rate Sheet zu Revenue Cloud Billing](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) vom Februar 2026 definiert einen Verbrauchstyp, "Invoicing", gemessen pro Dollar (oder Teil davon) des gesamten Rechnungsbetrags:

```kennzahlen
0,02 | Faktor: Billing Events pro Dollar Rechnungsbetrag
50 Dollar | Rechnungsbetrag je Billing Event, vor Rundung
quelle: Revenue Cloud Billing Rate Sheet, Februar 2026
```

Das Kontingent steht im Order Form, in der Tabelle Usage Details. Billing Events müssen bis zum Order End Date verbraucht werden. Ein Übertrag ist ausgeschlossen. Das Rate Sheet sagt außerdem, dass sich Verbrauchstypen und Faktoren ändern können. Das ist dieselbe Logik wie bei [Flex Credits für Agentforce](/blog/flex-credits-agentforce-kosten-pro-aktion/): Sie kaufen ein Kontingent für die Laufzeit, und was Sie nicht nutzen, verfällt.

## Gezählt wird die Zwischensumme ohne Steuer

Die Definitionen im Rate Sheet sind kurz, und jedes Wort zählt:

- **Total Invoice Amount** ist die Summe aller Zwischensummen der Rechnungen, die während der Vertragslaufzeit gebucht werden.
- **Invoice** ist eine Rechnung, die der Kunde über den Dienst bucht. Entwürfe und Vorschauen zählen nicht, gebuchte Rechnungen schon.
- **Subtotal** ist der Wert der Waren oder Leistungen plus Versand und Handling. Steuern sind ausgenommen.
- **Währung:** Zwischensummen in anderen Währungen werden zum durchschnittlichen Tageskurs in Dollar umgerechnet, den der von Salesforce zu diesem Zeitpunkt genutzte Kursanbieter liefert.

Für einen deutschen Hersteller, der in Euro fakturiert, bewegt sich die Zahl der Events also auch mit dem Euro-Dollar-Kurs.

```hinweis offen
Laut Salesforce-Hilfe zählen die positiven Beträge gebuchter Rechnungspositionen, und bei der Stornierung einer gebuchten Rechnung werden die Events nicht zurückgegeben. Drei Fragen lassen die Unterlagen offen: ob eine separat gebuchte Gutschrift den gezählten Betrag mindert, wie die Rundung für jeden Dollar oder Teil davon angewendet wird und was passiert, wenn Sie mehr Events verbrauchen als gekauft. Lassen Sie sich alle drei schriftlich beantworten.
```

## Wie schätzen Sie die Kosten?

Die Formel für eine erste Schätzung ist einfach: Multiplizieren Sie die positiven Beträge gebuchter Rechnungen pro Jahr in Dollar mit 0,02. Schwierig ist die Schätzung des Rechnungsvolumens.

Rechenbeispiel: Ein Maschinenbauer will Fernüberwachungs-Abos und Wartungsverträge mit Revenue Cloud Billing fakturieren, 18 Millionen Euro im Jahr ohne Steuer. Für die Schätzung nehme ich einen Kurs von 1,15 Dollar je Euro an. Das ist eine Annahme, keine Prognose.

| Umfang in Billing | Zwischensumme pro Jahr | In Dollar bei 1,15 | Billing Events pro Jahr |
|---|---|---|---|
| Abos und Wartungsverträge | 18 Mio. Euro | 20,7 Mio. Dollar | 414.000 |
| Zusätzlich Maschinenrechnungen über 120 Mio. Euro | 138 Mio. Euro | 158,7 Mio. Dollar | 3.174.000 |

Die zweite Zeile zeigt, warum der Umfang die Kosten bestimmt. Maschinenrechnungen würden die Zahl der Events mehr als versiebenfachen, obwohl SAP diese Rechnungen ohnehin erstellt. Das ist ein Grund, warum ich Maschinenrechnungen in SAP lasse, wie in [Revenue Cloud Billing oder SAP](/blog/revenue-cloud-billing-oder-sap-rechnung/) beschrieben.

Zwei Effekte übersieht man leicht. Die Rechnungsfrequenz spielt wenig Rolle: Zwölf Monatsrechnungen über je 1.000 Euro verbrauchen etwa so viele Events wie eine Jahresrechnung über 12.000 Euro, es sei denn, die Rundung gilt je Rechnung. Bei Rechnungen in Euro kann der Rechnungszeitpunkt das Ergebnis aber wegen des täglichen Wechselkurses beeinflussen. Das Wachstum spielt eine große Rolle: Wächst das wiederkehrende Geschäft um 20 Prozent im Jahr, braucht das dritte Jahr etwa 44 Prozent mehr Events als das erste.

Den Preis pro Event liefert Ihr Angebot, denn Salesforce veröffentlicht ihn nicht. Multiplizieren Sie Ihre Event-Prognose mit diesem Preis und vergleichen Sie das Ergebnis mit den Kosten dafür, denselben Umsatz aus SAP zu fakturieren, einschließlich der Schnittstelle, die Sie dann für Vertragsänderungen bräuchten.

## Staffel, Mehrverbrauch und Wechselkurs gehören ins Order Form

Diese Punkte würde ich in die Verhandlung mitnehmen:

1. **Kontingent je Vertragsjahr.** Fragen Sie, ob ein Mehrjahresvertrag einen Pool oder Jahreskontingente hat, und bitten Sie um eine Staffel, die Ihrer Prognose folgt.
2. **Mehrverbrauch.** Klären Sie Preis und Ablauf für zusätzliche Events schriftlich vor der Unterschrift.
3. **Gutschriften und Rundung.** Klären Sie, ob Gutschriften den gezählten Betrag mindern und ob auf 50 Dollar je Rechnung gerundet wird.
4. **Wechselkurs.** Das Rate Sheet nutzt den Tagesdurchschnittskurs des von Salesforce genutzten Anbieters. Vereinbaren Sie, wie Sie die Umrechnung prüfen können.
5. **Funktionsabgrenzung.** Klären Sie, welche benötigten Funktionen in Advanced stecken, welche in Invoice Management und welche nur im Billing-Add-on.
6. **Verlängerung.** Vereinbaren Sie eine Preisobergrenze für den Event-Preis bei der Verlängerung, weil der Verbrauch meist wächst.

Solche Lizenzentscheidungen gehören in eine Lizenzprognose mit echten Zahlen, nicht in die letzte Woche vor der Unterschrift. Bei Nutzerlizenzen ist es genauso. Das beschreiben [Braucht jeder eine volle Lizenz?](/blog/salesforce-lizenzen-volle-lizenz/) und [Salesforce-Editionen Core, Advanced, Max](/blog/salesforce-editionen-core-advanced-max/). Solche Prognosen erstelle ich im Rahmen von [Make-or-Buy und Lizenzen](/leistungen/make-or-buy-lizenzen/).

## Erster Schritt: Finance übernimmt die Prognose

Finance kennt die Rechnungsvolumen je Umsatzart, der Vertrieb kennt das geplante Wachstum der Abos, und der Einkauf verhandelt. Ich würde die Verantwortung für diese Zahl bei Finance verankern, weil Finance später auch mit dem Nebenbuch und den Rechnungen arbeitet. Das Masterclass-Kapitel [Abrechnung und nutzungsbasierte Preise](/masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) zeigt, wo Billing im übrigen Quote-to-Cash-Prozess steht.
