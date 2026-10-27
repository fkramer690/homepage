---
title: "Digital Wallet: Agentforce-Kostenkontrolle für Werke"
description: "Mehrere Werke teilen den Flex-Credit-Pool einer Org: wer das Budget verantwortet, wie Digital Wallet die Verrechnung stützt und wer ungenutzte Credits trägt."
pubDate: 2026-10-27
lang: de
slug: digital-wallet-agentforce-kostenkontrolle
translationKey: digital-wallet-chargeback
topic: governance
categories: [ai, architecture]
contactBrief: licences
tags: [Agentforce, Digital Wallet, Flex Credits, Leistungsverrechnung, Kostenkontrolle, Fertigung]
takeaways:
  - "Flex Credits gehören zur Org und zum Vertrag: Die Editions-Pools gelten laut Preisseite pro Org und Jahr, und Mehrverbrauch wird dem Vertragspartner monatlich nachträglich berechnet."
  - "Digital Wallet schlüsselt den Verbrauch nach Agent, Aktion und Kanal auf und unterstützt eigene Tags für Kategorien wie Abteilung und Kostenstelle, die Grundlage jeder Leistungsverrechnung."
  - "Digital Wallet warnt bei Schwellenwerten, stoppt laut den Seiten, die ich geöffnet habe, aber keinen Agenten, wenn ein Werk sein Budget verbraucht hat. Werksbudgets sind eine Größe im Controlling."
  - "Kauft eine Tochter eigene Credits für die gemeinsame Org, führt Digital Wallet sie in einer Karte zusammen und verbraucht zuerst den Vertrag, der am frühesten endet."
  - "Ungenutzte Credits verfallen zum Bestellende; legen Sie vor dem Go-live fest, wer diesen Verlust trägt, sonst landet er unbemerkt im zentralen IT-Budget."
faq:
  - q: "Kann Digital Wallet Agentforce-Kosten auf Kostenstellen verrechnen?"
    a: "Es liefert die Daten. Eigene Tags gruppieren den Verbrauch nach Kategorien wie Abteilung oder Kostenstelle, Berichte laufen auf Data 360. Die interne Rechnung selbst entsteht im Controlling oder im ERP, auf Basis der Monatsabrechnung."
  - q: "Kann ich jedem Werk ein eigenes Flex-Credit-Limit geben?"
    a: "Als harte Grenze nicht, jedenfalls nicht in der Dokumentation, die ich geöffnet habe. Digital Wallet warnt bei Schwellenwerten, für die ganze Org oder pro Karte, der Pool bleibt aber ein Pool. Werksbudgets werden intern vereinbart und gegen den getaggten Verbrauch geprüft."
  - q: "Was brauche ich, um Digital Wallet zu nutzen?"
    a: "Ein Digital-Wallet-fähiges Produkt, eine Data-360-Lizenz (eine Customer-Data-Platform-Lizenz reicht nicht) und die Berechtigung View Consumption. Die Salesforce-Hilfe nennt Enterprise und Unlimited Edition und schreibt, dass Digital Wallet in Sandboxes nicht verfügbar ist."
  - q: "Lassen sich Flex Credits über mehrere Salesforce-Orgs teilen?"
    a: "Die Preisseiten nennen die Editions-Pools pro Org, und keine der Salesforce-Seiten, die ich geöffnet habe, beschreibt einen Pool über mehrere Orgs. Fragen Sie Ihren Account Executive und lassen Sie die Antwort ins Order Form schreiben."
  - q: "Welche Zahl zählt für die interne Rechnung, Digital Wallet oder die Salesforce-Rechnung?"
    a: "Die Monatsabrechnung. Laut Salesforce werden die Verbrauchsdaten in Digital Wallet mehrmals täglich aktualisiert, maßgeblich für die Verbrauchsdetails ist aber das Monatsstatement."
draft: false
---

Agentforce-Kostenkontrolle über mehrere Werke beginnt mit einer Entscheidung: Wem gehört der Flex-Credit-Pool? Der Pool hängt an Org und Vertrag. Eine Gesellschaft im Konzern unterschreibt, zahlt den Mehrverbrauch und verliert ungenutzte Credits zum Bestellende. Digital Wallet liefert die Daten für die Leistungsverrechnung: Verbrauch nach Agent, Aktion und Kanal sowie eigene Tags für Kostenstellen. Ein Werk, das sein Budget aufgebraucht hat, stoppt es nicht. Ich empfehle einen zentralen Budgetverantwortlichen, Tags pro Gesellschaft und Kostenstelle ab dem ersten Tag und schriftliche Regeln für Restmengen und Mehrverbrauch vor dem Go-live.

## Wem gehört der Flex-Credit-Pool, wenn Werke eine Org teilen?

Die kaufmännische Einheit ist die Org. Die [EU-Preisseite für Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) nennt "500K Flex Credits/org/year" für Core, 1 Million für Advanced und 2,75 Millionen für Max. Zusätzliche Credits kosten laut [Agentforce-Preisseite](https://www.salesforce.com/eu/agentforce/pricing/) 500 € pro 100.000, also einen halben Cent pro Credit. Jedes Werk, jede Tochter und jede Serviceregion in dieser Org bedient sich aus demselben Pool. Wie weit die Pools reichen und wann Max sich lohnt, steht in [den Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/).

Drei Vertragsbedingungen entscheiden, wo das Geld landet:

- **Mehrverbrauch geht an den Vertrag.** Laut Preisseite gibt es keine Strafgebühr; über das Kontingent hinaus gilt der vertragliche Satz, monatlich nachträglich abgerechnet. Die Rechnung erhält, wer unterschrieben hat, meist die Muttergesellschaft.
- **Ungenutzte Credits verfallen.** Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) verlangt den Verbrauch vor dem Order End Date, "no rollover will be permitted".
- **Ein Preismodell pro Org.** Flex Credits und die Abrechnung pro Konversation werden laut Preisseite nicht in derselben Org unterstützt. Eine US-Tochter kann also nicht pro Konversation zahlen, während die deutschen Werke Credits nutzen.

Für einen Fertigungskonzern ist das deshalb eine Organisationsfrage. Ich würde eine Person in der Konzern-IT oder im Salesforce-CoE zur Budgetverantwortlichen machen: Sie unterschreibt, beobachtet den Pool und führt die Verrechnung. Werke und Töchter bekommen Budgets, keine Credits.

## Was zeigt Digital Wallet für die Leistungsverrechnung?

[Digital Wallet](https://www.salesforce.com/eu/agentforce/digital-wallet/) ist die Verbrauchskonsole von Salesforce. Sie ist mit einem Digital-Wallet-fähigen Produkt kostenlos und erfasst unter anderem Flex Credits, Data Services Credits, AI Requests und Lizenzen. Für die Verrechnung zählen vier Funktionen:

- **Aufschlüsselung** bis auf Agent, Aktion und Kanal.
- **Eigene Tags.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.wallet_about.htm&type=5) erfassen sie Verbrauch nach Kategorien "such as department and cost center". Tags ansehen, verwalten und zuweisen sind getrennte Berechtigungen.
- **Berichte auf Data 360.** Die Verbrauchsdaten landen in Data Lake Objects wie TenantEnrichedUsageEvent; darauf bauen Sie eigene Berichte nach Tags.
- **Schwellenwert-Warnungen.** Das [Trailhead-Modul zur Kostensteuerung](https://trailhead.salesforce.com/de/content/learn/modules/agentforce-model-switching-and-monetization/manage-costs-and-optimize-consumption) beschreibt eine Flow-Vorlage mit Regeln für die ganze Org oder einzelne Karten, verschickt per E-Mail an Admins, als Systembenachrichtigung oder in Slack.

Die Grenzen zählen genauso. Die Salesforce-Hilfe verlangt eine Data-360-Lizenz, "not a Customer Data Platform (CDP) license", und nennt Digital Wallet in Sandboxes als nicht verfügbar. Sandbox-Verbrauch kostet trotzdem Credits; die Flex-Credits-Karte in Produktion hat einen Filter für den Umgebungstyp. Laut [Trailhead-Kurzüberblick](https://trailhead.salesforce.com/de/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) werden die Daten mehrmals täglich aktualisiert, und "your monthly statement is the definitive source of truth". Die interne Rechnung folgt deshalb der Monatsabrechnung, keinem Dashboard-Screenshot.

Was ich nicht gefunden habe: einen automatischen Stopp. Die Seiten, die ich geöffnet habe, beschreiben nur Warnungen. [Salesforce Ben schrieb im Mai 2025](https://www.salesforceben.com/understanding-common-agentforce-pain-points-and-how-salesforce-addresses-them/), es gebe keinen "Kill Switch", der Agenten bei einem Schwellenwert einfriert, und ich habe nichts Neueres gefunden, das dem widerspricht. Ein Werksbudget bleibt damit eine Zahl im Controlling. Wer eine harte Grenze braucht, deaktiviert den Agenten selbst.

## Ein typisches Szenario: drei Regionen in einer Org

Nehmen wir einen Maschinenbauer mit zwei Werken in Deutschland, einer Vertriebs- und Servicetochter in den USA und einer Serviceregion Asien-Pazifik, alle in einer Org mit Advanced Edition. Ein Serviceagent beantwortet Händlern aller Regionen Fragen zu Auftragsstatus und Ersatzteilen, ein Planungsagent unterstützt den Außendienst (Field Service) in Deutschland und den USA. Alle Zahlen sind Annahmen.

| Position pro Jahr | Credits | Zu 5 € pro 1.000 Credits |
|---|---|---|
| In Advanced Edition enthalten | 1.000.000 | mit den Lizenzen bezahlt |
| Vorab gekauft | 3.000.000 | 15.000 € |
| Deutschland: Service und Vertrieb | 1.800.000 | 9.000 € |
| US-Tochter | 1.400.000 | 7.000 € |
| Serviceregion Asien-Pazifik | 600.000 | 3.000 € |
| Konzern-IT: Sandbox-Tests | 300.000 | 1.500 € |
| **Geplanter Verbrauch** | **4.100.000** | **20.500 €** |

Der Plan liegt 100.000 Credits über dem Pool, also kommen 500 € Mehrverbrauch nachträglich. Salesforce erhält 15.500 €. Den Regionen werden 20.500 € belastet, weil ich zum Listenpreis von 5 € pro 1.000 Credits verrechnen würde. Die Differenz von 5.000 € ist der Listenwert des enthaltenen Pools und fließt an das zentrale Lizenzbudget zurück, das die Advanced-Lizenzen bezahlt. Die Alternative, nur die tatsächlichen Zahlungen weiterzugeben, ergibt rund 3,78 € pro 1.000 Credits, und dieser Satz ändert sich mit jeder Änderung an Pool oder Edition. Mit einem festen Satz planen die Werke besser.

Nun verschiebt sich der Go-live in Asien-Pazifik um vier Monate, und die Region verbraucht 200.000 statt 600.000 Credits. Der Gesamtverbrauch sinkt auf 3.700.000, und 300.000 Credits im Wert von 1.500 € verfallen zum Bestellende. Ohne Regel trägt das zentrale Budget diesen Verlust, und niemand merkt es. Mit Regel trägt ihn die Region, deren Planung die Kaufmenge bestimmt hat.

## Wie verteilen Sie Agentforce-Kosten auf Werke und Töchter?

Es gibt vier Modelle, und sie passen zu unterschiedlichen Phasen:

1. **Zentrale Gemeinkosten.** Die Konzern-IT zahlt alles. Richtig für den Piloten, solange die Mengen klein sind und jedes Werk den Agenten ausprobieren soll.
2. **Showback.** Der getaggte Verbrauch wird monatlich pro Gesellschaft berichtet, ohne Rechnung. Das würde ich die ersten sechs Monate so halten, damit die Werke ihre Zahlen sehen, bevor sie dafür zahlen.
3. **Verrechnung zu festem Satz.** Verbrauch pro Tag mal vereinbarter Satz, monatlich aus der Abrechnung. Ob daraus eine konzerninterne Rechnung oder eine interne Kostenumlage wird, entscheidet Ihr Controlling mit der Steuerabteilung; das ist keine Steuerberatung von mir.
4. **Reservierte Mengen.** Jede Region sagt ein Jahresvolumen zu und zahlt es auch bei geringerem Verbrauch. Das passt zu Konzernen, deren Töchter eine eigene Ergebnisverantwortung haben und deren Pläne die Kaufmenge bestimmen.

Schwierig wird es beim gemeinsamen Agenten. Ein Serviceagent für alle Regionen spart dreifachen Aufbau und dreifache Tests, sein Verbrauch muss aber trotzdem aufgeteilt werden. Salesforce dokumentiert die Tag-Konfiguration in der Hilfe; vor dem Go-live würde ich in Produktion mit kleinem Pilotvolumen prüfen, ob jedes Ereignis des gemeinsamen Agenten den richtigen Gesellschafts-Tag bekommt, denn in Sandboxes läuft Digital Wallet nicht. Trennt das Tagging die Regionen nicht, bleiben zwei Wege: ein Agent pro Region mit eigener Wartung oder ein Verteilschlüssel, etwa Konversationen pro Region aus Service Cloud. Solange die Mengen klein sind, ziehe ich den Schlüssel vor. Welche Kennzahlen Sie pro Agent verfolgen sollten, steht in [Agentforce-Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/).

## Was passiert mit ungenutzten Credits und Mehrverbrauch?

Ungenutzte Credits verfallen zum Bestellende, Mehrverbrauch wird zum vertraglichen Satz berechnet. Beides folgt dem Vertrag und nicht dem Werk. Daraus ergeben sich drei Regeln, die ich aufschreiben würde:

- **Entlang des Go-live-Plans kaufen.** Pre-Purchase für Regionen, die live sind, Pre-Commit oder PayGo für Regionen in Planung. Die EU-Preisseite nennt alle drei Modelle. Ein verschobener Go-live kostet dann weniger.
- **Keine getrennten Verträge in einer Org.** Kauft die US-Tochter eigene Credits für dieselbe Org, führt Digital Wallet die Kontingente laut [Trailhead](https://trailhead.salesforce.com/de/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) in einer Karte zusammen und "always draws from the contract that will expire first". Endet der US-Vertrag im März und der Konzernvertrag im Dezember, verbrauchen alle zuerst die US-Credits.
- **Getrennte Orgs brauchen eigene Antworten.** Eine Tochter mit eigener Org bekommt einen eigenen Editions-Pool, weil die Pools pro Org gelten. Keine der Salesforce-Seiten, die ich geöffnet habe, beschreibt einen Pool über mehrere Orgs. Fragen Sie Ihren Account Executive und lassen Sie die Antwort ins Order Form schreiben.

Ein Zähler hat noch keinen Preis: Die Rate Card führt Headless Platform Interactions mit dem Satz "TBA". Was sie abdecken und warum sie fürs Budget zählen, steht in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/). Geben Sie diesem Zähler von Anfang an einen eigenen Tag und einen eigenen Verantwortlichen.

## Wo fangen Sie an?

1. Benennen Sie eine Budgetverantwortliche für den Pool und schreiben Sie das in den Programmauftrag.
2. Legen Sie das Tag-Schema fest: Gesellschaft, Kostenstelle, Umgebung.
3. Prüfen Sie die Data-360-Lizenz sowie View Consumption und die Tag-Berechtigungen für die Controller, die sie brauchen.
4. Richten Sie den Flow für Schwellenwert-Warnungen bei 50, 80 und 95 Prozent ein und schicken Sie ihn an die Budgetverantwortliche, nicht nur an Admins.
5. Fahren Sie sechs Monate Showback gegen die Monatsabrechnung.
6. Schreiben Sie die Regeln für Restmengen, Mehrverbrauch und reservierte Mengen vor dem ersten regionalen Go-live auf.

Wie Sie den Verbrauch selbst schätzen, steht in [Flex Credits: Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/); die Lizenzplanung über mehrere Gesellschaften gehört zu meiner [Make-or-buy- und Lizenzplanung](../../leistungen/make-or-buy-lizenzen/).

Digital Wallet liefert die Zahlen pro Agent und Kostenstelle, die Verantwortung und die Regeln für Restmengen müssen von Ihnen kommen. Wenn Sie Agentforce-Kostenkontrolle für mehrere Werke oder Töchter aufsetzen möchten, [schreiben Sie mir](#contact).
