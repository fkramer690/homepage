---
title: "Revenue Cloud Billing Kosten: Was Billing Events bedeuten"
description: "Wie Revenue Cloud Billing abgerechnet wird: ein Billing Event je 50 Dollar Rechnungsbetrag, kein Übertrag, eine Beispielrechnung und was ins Order Form gehört."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-billing-kosten
translationKey: revenue-cloud-billing-costs-billing-events
topic: revenue
categories: [revenue-cloud]
contactBrief: licences
tags: [Revenue Cloud Billing, Billing Events, Lizenzen, Preise, Order Form]
takeaways:
  - "Revenue Cloud Billing ist ein Add-on zu Revenue Cloud mit Preis auf Anfrage. Einen Preis pro Billing Event veröffentlicht Salesforce nicht."
  - "Laut Rate Sheet vom Februar 2026 wird je 50 Dollar Rechnungsbetrag ein Billing Event verbraucht, also 0,02 Events pro Dollar."
  - "Gezählt wird die Zwischensumme gebuchter Rechnungen ohne Steuer, aber mit Versand. Andere Währungen werden zum Tagesdurchschnittskurs in Dollar umgerechnet."
  - "Billing Events verfallen zum Vertragsende und werden nicht übertragen. Ein Kontingent, das auf das dritte Jahr ausgelegt ist, verfällt im ersten Jahr teilweise."
  - "Was über Billing läuft, bestimmt die Kosten: Maschinenrechnungen mit hohen Beträgen verbrauchen weit mehr Events als Abo- und Servicerechnungen."
faq:
  - q: "Was kostet Revenue Cloud Billing?"
    a: "Salesforce führt Revenue Cloud Billing als Add-on mit 'Request a Quote' und veröffentlicht keinen Preis pro Billing Event. Öffentlich ist der Verbrauch: laut Rate Sheet vom Februar 2026 ein Billing Event je 50 Dollar Rechnungsbetrag."
  - q: "Was ist ein Billing Event in Revenue Cloud Billing?"
    a: "Ein Billing Event ist die Einheit, in der Salesforce den Verbrauch von Revenue Cloud Billing misst. Das Rate Sheet rechnet 0,02 Billing Events pro Dollar Rechnungsbetrag, also ein Event je angefangene 50 Dollar."
  - q: "Werden ungenutzte Billing Events ins nächste Jahr übertragen?"
    a: "Nein. Laut Rate Sheet müssen Billing Events bis zum Order End Date aus der Usage-Details-Tabelle des Order Forms verbraucht werden, ein Übertrag ist ausgeschlossen."
  - q: "Zählt die Umsatzsteuer bei den Billing Events mit?"
    a: "Nein. Das Rate Sheet zählt die Zwischensumme gebuchter Rechnungen. Sie enthält Waren, Leistungen sowie Versand und Handling, aber keine Steuern."
draft: false
---

Revenue Cloud Billing ist ein Add-on zu Revenue Cloud, und Salesforce nennt den Preis nur auf Anfrage. Der Verbrauch wird in Billing Events gemessen: Laut Rate Sheet vom Februar 2026 wird je 50 Dollar Rechnungsbetrag ein Billing Event verbraucht. Gezählt wird die Zwischensumme gebuchter Rechnungen ohne Steuer, aber mit Versand, und andere Währungen werden zum Tagesdurchschnittskurs in Dollar umgerechnet. Ungenutzte Events verfallen zum Vertragsende. Die Kosten hängen also am Rechnungsvolumen, das Sie über Billing fakturieren, nicht an der Zahl der Nutzer. Schätzen Sie dieses Volumen pro Jahr, bevor Sie verhandeln.

## Wie wird Revenue Cloud Billing bepreist?

Die [Preisseite von Revenue Cloud](https://www.salesforce.com/sales/cpq/pricing/) nennt im Oktober 2026 zwei Editionen und das Billing-Add-on:

| Produkt | Listenpreis | Inhalt laut Seite |
|---|---|---|
| Revenue Cloud Growth | 150 Euro / 150 Dollar pro Nutzer und Monat | Quoting & Configurator, Order Capture, Subscriptions |
| Revenue Cloud Advanced | 200 Euro / 200 Dollar pro Nutzer und Monat | alles aus Growth, Contracts & Orders, Consumption & Invoicing, AI & Analytics |
| Revenue Cloud Billing | Request a Quote | Usage Rating & Digital Wallet, Invoicing Engine & Document Production, Accounting Subledger |

Die Fußnote sagt, dass die Add-ons getrennt von den vorausgesetzten Produkten verkauft werden und einen Jahresvertrag brauchen. Die [EU-Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) führt außerdem Invoice Management als Add-on zu Advanced, mit dem Hinweis "Freemium access available". In der Salesforce-Hilfe und der Entwicklerdokumentation zu Winter '27 heißt die Produktfamilie Revenue Management, gestartet ist sie als Revenue Lifecycle Management. In Angeboten können Ihnen also alle drei Namen begegnen.

Wo "Consumption & Invoicing" in Advanced endet und wo Invoice Management oder das Billing-Add-on beginnt, erklärt die Seite nicht. Lassen Sie sich diese Grenze vom Account Executive schriftlich geben, für jede Funktion, die Sie brauchen. Die Editionen selbst behandelt [Revenue Cloud Preise: Growth, Advanced und Add-ons](../revenue-cloud-editionen-preise/).

## Was ist ein Billing Event?

Ein Billing Event ist die Einheit, in der Salesforce den Verbrauch von Revenue Cloud Billing misst. Das [Rate Sheet zu Revenue Cloud Billing](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) vom Februar 2026 definiert einen Verbrauchstyp, "Invoicing", gemessen pro Dollar (oder Teil davon) des gesamten Rechnungsbetrags:

```kennzahlen
0,02 | Faktor: Billing Events pro Dollar Rechnungsbetrag
50 Dollar | Rechnungsbetrag je Billing Event, auch angefangene 50 Dollar
quelle: Revenue Cloud Billing Rate Sheet, Februar 2026
```

Das Kontingent steht im Order Form, in der Tabelle Usage Details. Billing Events müssen bis zum Order End Date verbraucht werden, ein Übertrag ist ausgeschlossen. Das Rate Sheet sagt außerdem, dass sich Verbrauchstypen und Faktoren ändern können. Das ist dieselbe Logik wie bei [Flex Credits für Agentforce](../flex-credits-agentforce-kosten-pro-aktion/): Sie kaufen ein Kontingent für die Laufzeit, und was Sie nicht nutzen, verfällt.

## Was zählt zum Rechnungsbetrag?

Die Definitionen im Rate Sheet sind kurz, und jedes Wort zählt:

- **Total Invoice Amount** ist die Summe aller Zwischensummen der Rechnungen, die während der Vertragslaufzeit gebucht werden.
- **Invoice** ist eine Rechnung, die der Kunde über den Dienst bucht. Entwürfe und Vorschauen zählen nicht, gebuchte Rechnungen schon.
- **Subtotal** ist der Wert der Waren oder Leistungen plus Versand und Handling. Steuern sind ausgenommen.
- **Währung:** Zwischensummen in anderen Währungen werden zum durchschnittlichen Tageskurs des jeweiligen Kursanbieters von Salesforce in Dollar umgerechnet.

Für einen deutschen Hersteller, der in Euro fakturiert, bewegt sich die Zahl der Events also auch mit dem Euro-Dollar-Kurs.

```hinweis offen
Drei Fragen beantwortet das Rate Sheet nicht: ob Gutschriften den gezählten Betrag mindern, ob die Rundung auf angefangene 50 Dollar je Rechnung oder auf die Summe gilt, und was passiert, wenn Sie mehr Events verbrauchen als gekauft. Lassen Sie sich alle drei schriftlich beantworten.
```

## Wie schätzen Sie die Kosten?

Die Formel ist einfach: Zwischensumme der Rechnungen pro Jahr in Dollar, geteilt durch 50. Schwierig ist das Rechnungsvolumen.

Ein typisches Szenario, als Annahme: Ein Maschinenbauer will Fernüberwachungs-Abos und Wartungsverträge aus Revenue Cloud Billing fakturieren, 18 Millionen Euro im Jahr ohne Steuer. Für die Schätzung nehme ich einen Kurs von 1,15 Dollar je Euro an. Das ist eine Annahme, keine Prognose.

| Umfang in Billing | Zwischensumme pro Jahr | In Dollar bei 1,15 | Billing Events pro Jahr |
|---|---|---|---|
| Abos und Wartungsverträge | 18 Mio. Euro | 20,7 Mio. Dollar | 414.000 |
| Zusätzlich Maschinenrechnungen über 120 Mio. Euro | 138 Mio. Euro | 158,7 Mio. Dollar | 3.174.000 |

Die zweite Zeile zeigt, warum der Umfang die Kosten bestimmt. Maschinenrechnungen würden die Zahl der Events mehr als versiebenfachen, für Rechnungen, die SAP ohnehin erstellt. Das ist ein Grund, warum ich Maschinenrechnungen in SAP lasse, wie in [Revenue Cloud Billing oder SAP](../revenue-cloud-billing-oder-sap-rechnung/) beschrieben.

Zwei Effekte übersieht man leicht. Die Rechnungsfrequenz spielt kaum eine Rolle: Zwölf Monatsrechnungen über je 1.000 Euro zählen etwa so viel wie eine Jahresrechnung über 12.000 Euro, es sei denn, die Rundung gilt je Rechnung. Das Wachstum spielt eine große Rolle: Wächst das wiederkehrende Geschäft um 20 Prozent im Jahr, braucht das dritte Jahr etwa 44 Prozent mehr Events als das erste.

Den Preis pro Event liefert Ihr Angebot, denn Salesforce veröffentlicht ihn nicht. Multiplizieren Sie Ihre Event-Prognose mit diesem Preis und vergleichen Sie das Ergebnis mit den Kosten, denselben Umsatz aus SAP zu fakturieren, einschließlich der Schnittstelle, die Sie dann für Vertragsänderungen bräuchten.

## Was sollte ins Order Form?

Diese Punkte würde ich in die Verhandlung mitnehmen:

1. **Kontingent je Vertragsjahr.** Bitten Sie um eine Staffel, die Ihrer Prognose folgt, statt eines Kontingents, das auf das letzte Jahr ausgelegt ist.
2. **Mehrverbrauch.** Preis und Ablauf für zusätzliche Events schriftlich vor der Unterschrift.
3. **Gutschriften und Rundung.** Klären Sie, ob Gutschriften den gezählten Betrag mindern und ob auf 50 Dollar je Rechnung gerundet wird.
4. **Wechselkurs.** Das Rate Sheet nutzt den Tagesdurchschnittskurs des Anbieters von Salesforce. Vereinbaren Sie, wie Sie die Umrechnung prüfen können.
5. **Funktionsabgrenzung.** Welche benötigten Funktionen in Advanced stecken, welche in Invoice Management und welche nur im Billing-Add-on.
6. **Verlängerung.** Eine Preisobergrenze für den Event-Preis bei der Verlängerung, weil der Verbrauch meist wächst.

Solche Lizenzentscheidungen gehören in eine Lizenzprognose mit echten Zahlen, nicht in die letzte Woche vor der Unterschrift. Bei Nutzerlizenzen ist es genauso, beschrieben in [Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/) und [Salesforce-Editionen Core, Advanced, Max](../salesforce-editionen-core-advanced-max/). Solche Prognosen erstelle ich im Rahmen von [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).

## Wer sollte die Prognose verantworten?

Finance kennt die Rechnungsvolumen je Umsatzart, der Vertrieb das geplante Wachstum der Abos, und der Einkauf verhandelt. Ich würde die Zahl bei Finance verankern, weil Finance später auch das Nebenbuch und die Rechnungen sieht. Das Masterclass-Kapitel [Abrechnung und nutzungsbasierte Preise](../../masterclass/revenue-cloud/abrechnung-und-nutzungsbasierte-preise/) zeigt, wo Billing im übrigen Quote-to-Cash-Prozess steht.

Revenue Cloud Billing kostet ein Billing Event je 50 Dollar Rechnungsbetrag, also entscheiden Sie zuerst, was Sie in Salesforce fakturieren, und verhandeln Sie dann den Preis.
