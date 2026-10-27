---
title: "AIforce und Systemintegratoren: was SI/AI Force heißt"
description: "AIforce, die SIForce-Umbenennung und das neue Partnermodell von Salesforce: was belegt ist, was nicht und was Hersteller mit ihren Partnern regeln sollten."
lang: de
slug: aiforce-und-systemintegratoren
translationKey: masterclass-05
chapter: 5
short: "AIforce und Partner"
summary: "Was AIforce und SIForce wirklich sind und wie das neue Partnermodell von Salesforce die Interessen Ihres Implementierungspartners verschiebt."
takeaways:
  - "„SI / AI Force“ hat zwei Lesarten: AIforce, die am 15. September 2026 vorgestellte Interface-Schicht für Claude, Slack und Lightning, und SI als Systemintegrator, also Ihr Implementierungspartner."
  - "Die Umbenennung von AIforce in SIForce stützt sich nur auf Sekundärpresse wie Salesforce Ben, die über einen Post von Marc Benioff auf X berichtet; ein Salesforce-Dokument mit SIForce habe ich nicht gefunden."
  - "Die Executive Order 14434 verpflichtet nur Behörden der US-Exekutive, „SI“ statt „AI“ zu schreiben; für Salesforce, Partner und Hersteller in Europa folgt daraus keine Pflicht."
  - "Salesforce knüpft Partneranreize an aktiven Verbrauch und an Agenten in Produktion statt an verkaufte Lizenzen; steigt Ihr Credit-Verbrauch, profitiert Ihr Partner mit."
  - "Hersteller sollten Partner an messbaren Ergebnissen messen, Obergrenzen für Flex Credits vereinbaren und Regeln für KI-gestütztes Programmieren in den Vertrag schreiben."
articles: [aiforce-salesforce-in-claude-slack, fixed-price-ai-salesforce-partners, partners-ai-coding-sow-rules]
faq:
  - q: "Was ist AIforce bei Salesforce?"
    a: "AIforce ist eine Interface-Schicht, die Salesforce am 15. September 2026 zur Dreamforce vorgestellt hat. Sie macht Daten, Workflows und Berechtigungen aus Claude, Slack und Lightning nutzbar und besteht aus Claudeforce, Slackforce, Agentforce Coworker und dem Headless Toolkit."
  - q: "Ist SIForce der offizielle neue Name von AIforce?"
    a: "Bisher nicht belegt. Salesforce Ben berichtet über einen Post von Marc Benioff auf X vom 9. Oktober 2026, fand aber keine offizielle Ankündigung. Bis zum 27. Oktober 2026 habe ich kein Salesforce-Dokument mit dem Namen SIForce gefunden; ich schreibe deshalb weiter AIforce."
  - q: "Was ändert das neue Partnerprogramm für meinen Implementierungspartner?"
    a: "Seit März 2026 gibt es zwei Stufen, Summit und Select, und 28 Kompetenzen statt 170 Auszeichnungen. Anreize hängen an aktivem Verbrauch statt an Lizenzen, und Agentforce-Fähigkeit muss in einer Sandbox nachgewiesen werden. Ihr Partner hat damit ein Interesse daran, dass Ihre Agenten live gehen und viel genutzt werden."
  - q: "Muss mein Partner im FDE Partner Network sein?"
    a: "Nein. Das Netzwerk ist eine exklusive Auswahl, angeführt von großen Beratungen wie Accenture und Deloitte. Für einen Mittelständler zählt mehr, ob der Partner Agenten in vergleichbaren Prozessen in Produktion gebracht hat und das ERP-Umfeld eines Herstellers kennt."
draft: false
---

„SI / AI Force“ hat im Herbst 2026 zwei Bedeutungen. AIforce ist die Schicht, die Salesforce am 15. September 2026 vorgestellt hat, damit Daten und Workflows aus Claude, Slack und Lightning nutzbar werden. Die Umbenennung in SIForce kennt bisher nur die Sekundärpresse, ein Salesforce-Dokument dazu fehlt. SI steht außerdem für Systemintegrator, und dessen Anreize hat Salesforce neu geordnet: Partner verdienen an Verbrauch und an Agenten in Produktion. Für Hersteller heißt das: AIforce als Namen behalten, klein pilotieren und den Partner an Ergebnissen, Kostenobergrenzen und klaren KI-Regeln messen.

## Was bedeutet „SI / AI Force“?

Wer im Oktober 2026 nach „SI Force“ oder „AI Force“ fragt, meint meistens eine von zwei Sachen, oft beide durcheinander:

| Lesart | Was gemeint ist | Wer davon betroffen ist |
|---|---|---|
| AIforce (laut CEO künftig SIForce) | Interface-Schicht, die Salesforce aus Claude, Slack und Lightning nutzbar macht | IT-Leitung, Vertrieb, Service, Datenschutz |
| SI als Systemintegrator | Der Implementierungspartner, der Salesforce bei Ihnen einführt und betreibt | Programmleitung, Einkauf, Fachbereiche |

Beide hängen zusammen. Ihr Partner soll die neue Schicht liefern, und Salesforce bezahlt ihn seit 2026 anders dafür. Deshalb behandle ich beide Lesarten in einem Kapitel. Die Grundbegriffe und die vier Ebenen von KI im Salesforce-Umfeld stehen in [Kapitel 1](../begriffe-und-landkarte/), die Coding-Agenten, mit denen Partner heute bauen, in [Kapitel 4](../externe-coding-agenten/).

## AIforce: die Interface-Schicht über Agentforce

Salesforce beschreibt AIforce als „a live interface layer that brings the full power of Salesforce to wherever people and agents work“ ([Ankündigung vom 15. September 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). Im Architekturbild liegt AIforce über Data 360, Customer 360 und Agentforce. Anfragen laufen über die bestehenden Berechtigungen des Nutzers, ein neues Berechtigungsmodell gibt es laut Salesforce nicht. Der Modellanbieter soll Geschäftsdaten nicht speichern.

| Bestandteil | Inhalt | Stand laut Salesforce |
|---|---|---|
| Claudeforce | Salesforce in Claude (MCP-Server mit 37 Vertriebs-Skills), Salesforce-Development-Plugin für Claude Code mit mehr als 40 Skills | Salesforce in Claude: Beta für alle Kunden; Skills für Service und Branchen nur angekündigt |
| Slackforce | Slackforce Surfaces, Slackbot, Slack CRM, Slack Code | ohne Verfügbarkeitstermine |
| Agentforce Coworker | KI-Teammitglied in Lightning | verfügbar, laut Salesforce 100.000 Aktivierungen in 35 Tagen |
| Headless Toolkit | MCPs, APIs, Plugins, Skills und Entwicklerwerkzeuge | ohne Statusangabe |

Für einen Hersteller ist das heute vor allem ein Vertriebsthema. Die 37 Skills decken Account-Recherche, Pipeline und CRM-Pflege ab, Aftersales und Außendienst (Field Service) haben noch nichts zu testen. Zu den Kosten schreibt Salesforce selbst: „Pricing and packaging are subject to change.“ Die [Flex Credits Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) führt den Zähler Headless Platform Interactions für agentische Zugriffe weiter mit „TBA“. Wie Externe über MCP auf Ihre Org zugreifen, beschreibe ich in [Kapitel 3](../mcp-und-schnittstellen/), die Kostenseite in [Kapitel 7](../kosten-und-token/).

Eine Unterscheidung spart viele Missverständnisse in Workshops. In der [Claudeforce-Meldung vom 27. August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) ist Claude ein Reasoning-Modell der Atlas Reasoning Engine und Standardmodell in Agentforce Vibes, Agentforce Coworker und Slack. Das ist Claude in Salesforce. Salesforce in Claude ist die Gegenrichtung: CRM-Daten erscheinen in der Claude-App Ihrer Mitarbeitenden. Für den Datenschutz sind das zwei getrennte Prüfungen. Was die IT-Leitung konkret tun sollte, steht im Artikel [AIforce: Salesforce in Claude und Slack erklärt](../../blog/aiforce-salesforce-in-claude-und-slack/).

### AIforce und Headless 360

Salesforce Ben beschreibt die Namensfolge als Headless 360 zur TDX im April, AIforce zur Dreamforce und dann SIForce. Salesforce selbst nennt Headless 360 in der AIforce-Ankündigung nicht, verwendet den Begriff aber weiter: Seit dem zweiten Quartal des Geschäftsjahrs 2027 zählt Headless 360 in die [Agentforce-ARR von mehr als 1,5 Mrd. $](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx), die Max-Editionen sollen künftig [Headless-360-Kapazität](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) enthalten, und die Rate Card ordnet den neuen Zähler der Headless-360-Nutzung zu. Ich lese das so: AIforce ist die Oberfläche, Headless 360 der abrechenbare API- und MCP-Zugang darunter. In Verträgen zählt der Name, den Salesforce auf das Bestellformular druckt.

## Heißt AIforce jetzt SIForce?

Belegt ist nur ein Post. Am 9. Oktober 2026 schrieb Marc Benioff auf X: „The era of Super Intelligence is here. AIForce is officially SIForce.“ Den Post selbst konnte ich nicht öffnen. Die Umbenennung stützt sich deshalb allein auf Sekundärpresse. [Salesforce Ben berichtete am 12. Oktober](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/), es gebe offenbar keine offizielle Ankündigung von Salesforce, und man habe um eine Stellungnahme gebeten. Bis zum 27. Oktober 2026 habe ich weder eine Pressemitteilung noch einen Hilfeartikel von Salesforce gefunden, der SIForce verwendet.

Der Anlass ist dagegen als Primärquelle nachlesbar. Die [Executive Order 14434](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/) vom 29. September 2026 weist die Ministerien und Behörden der US-Exekutive an, in eigenen Dokumenten „Super Intelligence“ statt „Artificial Intelligence“ zu schreiben. Bestehende Verordnungen bleiben unverändert, einklagbare Rechte entstehen nicht, private Unternehmen kommen nicht vor. Salesforce musste also nichts umbenennen, die Entscheidung war freiwillig. Dass US-Bundesbehörden Salesforce-Kunden sind und künftig „SI“ schreiben müssen, ist ein naheliegendes Motiv, aber meine Vermutung.

Für Ihre Unterlagen empfehle ich „AIforce (vom CEO als SIForce angekündigt)“, bis Salesforce den Namen schriftlich bestätigt. Drei Namen in gut sechs Monaten sind auch ein Grund, Architekturdokumente nach Funktionen zu gliedern statt nach Produktnamen.

## SI als Systemintegrator: was sich im Partnermodell ändert

Die zweite Lesart betrifft Ihren Implementierungspartner. Salesforce hat das [Partnerprogramm am 2. März 2026 umgebaut](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/):

- Zwei Stufen, Summit und Select.
- 28 Kernkompetenzen statt 170 Auszeichnungen, darunter die stärker nachgefragten für Agentforce und Data 360.
- Anreize hängen an aktivem Verbrauch statt an bereitgestellten Lizenzen.
- Agentforce-Fähigkeit wird in einer Sandbox nachgewiesen, nicht nur per Wissenstest.
- KI-Governance und Sicherheitsvorgaben sind Pflicht.

Ein Startdatum für die neuen Stufen nennt die Meldung nicht. Am 15. April 2026 folgte das [Forward Deployed Engineer Partner Network](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/), kurz FDE-Netzwerk. Es ist eine exklusive Auswahl mit Accenture und Deloitte als Launch-Partnern, dazu Capgemini, Cognizant, IBM Consulting, KPMG, PwC, Slalom, TCS und kleinere Regionalfirmen. Die Partner bekommen direkten Zugang zu Salesforce-Engineering und zur Roadmap. Salesforce knüpft ihre Anreize daran, dass Agenten in Produktion gehen, und nennt Branchenwissen ausdrücklich als Kriterium, darunter Manufacturing. Die Aussage, diese Firmen hätten ein Drittel aller erfolgreichen Agentforce-Einführungen getragen, ist Salesforces eigene Zahl ohne offengelegte Methode.

### Was die neuen Anreize für Sie als Kunde bedeuten

Die Logik hat sich verschoben: früher „Lizenz verkauft, Projekt nach Stunden“, jetzt „Agent in Produktion, Verbrauch läuft“. Das ist in Teilen gut für Sie. Ein Partner, der erst am Go-live verdient, hat weniger Interesse an Piloten, die nie produktiv werden. Es gibt aber einen Konflikt. Jede Agentenaktion kostet Flex Credits, und an diesem Verbrauch hängt jetzt die Vergütung Ihres Partners durch Salesforce. Ein Agent, der drei Aktionen statt einer ausführt, ist für Sie teurer und für den Partner kein Nachteil.

Dazu kommt, dass Partner selbst mit Coding-Agenten bauen. Das verkürzt Arbeit, die bisher nach Stunden abgerechnet wurde. Ob deshalb Festpreis oder ergebnisbasierte Verträge besser passen, untersuche ich in [Festpreis statt Aufwand](../../blog/festpreis-statt-aufwand-ki-salesforce/). Was im Vertrag stehen muss, wenn ein Partner mit KI programmiert, also Offenlegung, Datenumgang, Rechte am Code, kein Zugriff auf Produktion und Review, steht in [Partner mit KI-Coding: Regeln für den Vertrag](../../blog/partner-ki-coding-regeln-vertrag/).

## Ein typisches Szenario: zwei Angebote für einen Händleragenten

Nehmen wir einen Maschinenbauer mit Service Cloud, SAP und einem Händlerportal. Er möchte einen Agenten, der Händleranfragen zu Auftragsstatus und Lieferterminen beantwortet, und holt zwei Angebote ein. Alle Zahlen und Umstände sind Annahmen.

**Angebot A** kommt von einem langjährigen Partner: nach Aufwand, geschätzt 60 Personentage. Zum Einsatz von KI-Werkzeugen sagt das Angebot nichts.

**Angebot B** kommt von einem Partner, der Agentforce-Projekte in Produktion vorweisen kann: Festpreis für dieselbe Lieferung plus Bonus, wenn nach drei Monaten 30 Prozent der Händleranfragen ohne Sachbearbeitung beantwortet werden. Das Team arbeitet mit Claude Code und dem Salesforce-Plugin und möchte für Tests einen Hosted-MCP-Zugang zur Produktivorg.

Aus Architektensicht würde ich so vorgehen:

1. **Partner A fragen**, ob und welche Coding-Agenten das Team nutzt. Dass ein Partner 2026 gar keine KI einsetzt, halte ich für unwahrscheinlich; dann gehört es offen in den Vertrag.
2. **Den Festpreis von B annehmen, den Produktivzugang ablehnen.** Agenten arbeiten in Sandboxes und Scratch-Orgs, Releases laufen über die Pipeline.
3. **Die Erfolgsmessung von B schärfen.** Die Quote zählt nur, wenn falsche Auskünfte stichprobenartig geprüft werden und die Kosten pro beantworteter Anfrage unter einer vereinbarten Grenze bleiben.
4. **Festlegen, wer Flex Credits bezahlt**, in Sandbox und Produktion, und eine monatliche Obergrenze mit Warnung vereinbaren.
5. **Die Ownership klären**: Wer betreibt den Agenten nach dem Go-live, wer pflegt Prompts, Tests und die SAP-Schnittstelle? Bei mehreren Partnern hilft eine [Object Ownership Matrix](../../blog/object-ownership-matrix-salesforce/).

Das Ergebnis ist kein Urteil über den besseren Partner. Beide Angebote werden vergleichbar, weil KI-Einsatz, Zugriffe und Verbrauch auf dem Tisch liegen.

## Was sollten Hersteller jetzt mit ihren Partnern regeln?

- **Namen festhalten.** In Konzepten „AIforce“ schreiben, bis Salesforce SIForce schriftlich bestätigt, und Funktionen beschreiben statt Produktnamen.
- **Ergebnisse statt Stunden vereinbaren**, wo der Umfang klar ist, mit einer Kennzahl, die Sie selbst messen können.
- **Verbrauch begrenzen.** Erwartete Aktionen pro Vorgang, Credit-Obergrenze, Verantwortung für Sandbox-Tests.
- **KI-Regeln in den Vertrag schreiben**: Offenlegung der Werkzeuge, kein Produktivzugriff, Review durch Menschen, Rechte am Code.
- **Branchentiefe prüfen.** Fragen Sie nach Agenten in Produktion bei Garantie, Ersatzteilen oder Händlervertrieb, nicht nach Zertifikaten oder dem Logo des FDE-Netzwerks.

Diese Punkte gehören zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/). Welches Werkzeug für welchen Zweck passt, zeigt das nächste Kapitel, die [Entscheidungsmatrix](../entscheidungsmatrix-ki-werkzeuge/); wie sich Teams mit KI organisieren, behandelt [Kapitel 9](../teamarbeit-und-delivery/). Alle Kapitel finden Sie in der [Übersicht der Masterclass](../).

AIforce ändert, wo Ihre Leute mit Salesforce arbeiten, das neue Partnermodell ändert, woran Ihr Partner verdient, und beides sollten Sie im Vertrag sichtbar machen. Wenn Sie ein Partnerangebot mit KI-Anteil einordnen möchten, [schreiben Sie mir](#contact).
