---
title: "Sandbox-Kundendaten: Was KI-Coding-Agenten lesen dürfen"
description: "Muss eine Full-Copy-Sandbox mit Händlerpreisen und Servicefällen maskiert werden, bevor KI-Agenten eines Partners sie lesen? Regeln, Data Mask, Testrealismus."
pubDate: 2026-10-27
lang: de
slug: sandbox-kundendaten-ki-coding-agenten
translationKey: sandbox-data-ai-coding-agents
topic: security
categories: [devops, ai]
tags: [Sandbox, Datenmaskierung, KI-Coding, Claude Code, Datenschutz, Fertigung]
takeaways:
  - "Was ein Coding-Agent aus einer Sandbox liest, wird Teil eines Prompts; Claude Code speichert Sitzungsprotokolle außerdem standardmäßig 30 Tage im Klartext auf dem Rechner."
  - "Eine Full-Copy-Sandbox enthält alle Produktivdaten und Dateien. Ich behandle sie wie Produktion: Menschen für UAT, SAP- und Lasttests, keine Logins für Coding-Agenten."
  - "Agenten arbeiten in Scratch Orgs und Developer-Sandboxes mit einem Seed-Datensatz; eine mit Salesforce Data Mask maskierte Partial Copy dient den Integrationstests."
  - "Maskierung kostet Testrealismus: Zufallspreise zerstören Rabattlogik, und seltene Fälle wie eine Anlage, die den Händler gewechselt hat, gibt es nur, wenn jemand sie in die Seed-Daten schreibt."
  - "Der Einstein Trust Layer in Agentforce Vibes kann personenbezogene und Kartendaten maskieren, ein Händlernettopreis ist beides nicht, und Claude Code läuft gar nicht über ihn."
faq:
  - q: "Darf ein KI-Coding-Agent in einer Full-Copy-Sandbox arbeiten?"
    a: "Technisch ja, ich würde es nicht erlauben. Eine Full Copy enthält alle Produktivdaten, und jeder Datensatz, den der Agent abfragt, landet im Prompt und im lokalen Sitzungsprotokoll. Nutzen Sie Scratch Orgs oder Developer-Sandboxes mit Seed-Testdaten."
  - q: "Schützt Salesforce Data Mask Händlerpreise?"
    a: "Data Mask kann Zahlenfelder durch Zufallswerte in einem festgelegten Bereich ersetzen, Preise lassen sich also maskieren. Dabei geht der Zusammenhang zwischen Listenpreis, Rabatt und Nettopreis verloren, deshalb braucht Preislogik eine eigens gebaute Testpreisliste."
  - q: "Welche Feldtypen kann Data Mask nicht maskieren?"
    a: "Laut Trailhead-Modul zu Data Mask werden Checkbox-, Lookup- und Picklist-Felder nicht unterstützt. Beziehungen bleiben dadurch erhalten, die verknüpften Datensätze müssen selbst maskiert werden."
  - q: "Wie kommen realistische Testdaten in eine Scratch Org?"
    a: "Scratch Orgs sind standardmäßig leer. Salesforce empfiehlt für kleine Mengen unter 3.000 Datensätzen die data-tree-Befehle zum Export und Import, für größere die data-bulk-Befehle. Die Sonderfälle müssen aus Service und Vertrieb kommen."
  - q: "Was kostet Data Mask & Seed?"
    a: "Die Produktseite von Salesforce nennt keinen Preis. Fragen Sie Ihren Account Executive nach einem Angebot und vergleichen Sie es mit dem Aufwand für einen eigenen Seed-Datensatz und dessen Pflege."
draft: false
---

Sandbox-Kundendaten sollten maskiert oder ganz außer Reichweite sein, bevor sich der KI-Coding-Agent eines Partners mit einer Salesforce-Sandbox verbindet, denn alles, was der Agent liest, landet in einem Prompt. Eine Full-Copy-Sandbox enthält dieselben Händlerpreise, Verträge und Servicefälle wie die Produktion. Meine Regel: Agenten arbeiten in Scratch Orgs und Developer-Sandboxes mit Seed-Testdaten, eine maskierte Partial Copy dient den Integrationstests, die Full Copy bleibt Menschen vorbehalten. Der Preis ist Testrealismus. Maskierung zerstört Preislogik und seltene Datenkonstellationen, also muss jemand einen Seed-Datensatz bewusst bauen.

## Warum wird eine Full-Copy-Sandbox mit Coding-Agent zum Datenleck?

Ein Coding-Agent wie Claude Code, Cursor oder Agentforce Vibes liest Code, und er kann die Org abfragen, in der er angemeldet ist. Fragt ein Entwickler, warum Garantieanträge eines Händlers an der Validierung scheitern, setzt der Agent eine SOQL-Abfrage ab und bekommt zwanzig Anträge mit Fehlerbeschreibung, Händlername und Nettopreis zurück. Diese Datensätze sind jetzt Teil des Gesprächs mit dem Modell.

Salesforce beschreibt [vier Sandbox-Typen](https://www.salesforce.com/platform/what-is-salesforce-sandbox/):

| Sandbox-Typ | Daten aus Produktion | Datenspeicher | Refresh |
|---|---|---|---|
| Developer | keine, nur Metadaten | 200 MB | täglich |
| Developer Pro | keine, nur Metadaten | 1 GB | täglich |
| Partial Copy | Auszug laut Sandbox-Vorlage | 5 GB | alle 5 Tage |
| Full | alle Daten und Dateien | wie Produktion | alle 29 Tage |

Aus Datenschutzsicht ist eine Full Copy die Produktion unter einer anderen Login-URL.

Für Claude Code unter kommerziellen Bedingungen schreibt Anthropic, dass es [nicht mit Code oder Prompts trainiert](https://code.claude.com/docs/en/data-usage) und diese standardmäßig 30 Tage aufbewahrt. Claude Code speichert Sitzungsprotokolle außerdem standardmäßig 30 Tage im Klartext auf dem Rechner. Ein Partner-Laptop hält das Abfrageergebnis also einen Monat lang. Die Löschung bei Projektende gehört in den Vertrag, siehe [Partner coden mit KI](../partner-ki-coding-regeln-vertrag/).

Simon Willison nennt die Kombination aus privaten Daten, nicht vertrauenswürdigen Inhalten und einem Weg nach außen die [„lethal trifecta“](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/). Eine Full Copy bringt zwei davon mit: echte Kundendaten und Texte, die Händler über das Portal oder per E-Mail geschrieben haben. Eine Fehlerbeschreibung im Garantieantrag kann Anweisungen enthalten wie die README im [Leitfaden zum sicheren Betrieb](https://code.claude.com/docs/en/agent-sdk/secure-deployment) von Anthropic, mehr dazu in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/). Der Laptop mit Internetzugang liefert das dritte Element.

## Welche Daten in der Sandbox eines Herstellers sind heikel?

**Personenbezogene Daten.** Ansprechpartner bei Händlern und Endkunden, Namen der Servicetechniker im Außendienst, Lieferadressen, Telefonnummern. Der Scratch-Org-Leitfaden von Salesforce sagt es deutlich: [„Don't add personal data to scratch orgs.“](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs.htm) Ob eine Full Copy mit personenbezogenen Daten überhaupt für die Entwicklung genutzt werden darf, entscheidet Ihr Datenschutzbeauftragter. Das hier ist keine Rechtsberatung; die DSGVO-Seite steht in [KI-Coding-Tools: Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

**Kaufmännische Daten.** Händlernettopreise, Rabattmatrizen, Bonusvereinbarungen, Mengen in Sales Agreements, Garantiekonditionen je Händler. Die DSGVO schützt sie nicht, aber der Partner, der heute Ihr Portal baut, arbeitet nächstes Jahr vielleicht für einen Wettbewerber.

**Freitext.** Fallbeschreibungen, E-Mails, Chatter-Beiträge, Notizen an Arbeitsaufträgen und Fehlerbeschreibungen in Garantieanträgen. Sie mischen beide Gruppen und lassen sich am schwersten maskieren, ohne ihren Sinn zu zerstören.

Laut Salesforce [leitet Agentforce Vibes Prompts durch den Einstein Trust Layer](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html), der personenbezogene Daten und Kartendaten erkennen und maskieren kann; bei aktiver Maskierung ist das Kontextfenster auf 115.000 Token begrenzt. Ein Händlernettopreis ist weder das eine noch das andere, er erreicht das Modell also nach meinem Verständnis unmaskiert. Claude Code schickt Prompts direkt an Anthropic oder Ihren Cloud-Anbieter, ohne Maskierungsschritt von Salesforce. Mehr dazu in [Einstein Trust Layer: was er schützt](../einstein-trust-layer-was-er-schuetzt/).

## Welche Umgebung darf ein Agent nutzen?

Ich würde jeder Umgebung eine Datenstufe und eine Agentenregel geben:

| Umgebung | Daten | Coding-Agent | Zweck |
|---|---|---|---|
| Scratch Org | leer, plus Seed-Daten | ja | Story bauen und Unit-Tests |
| Developer-(Pro-)Sandbox | Metadaten, plus Seed-Daten | ja | gemeinsame Entwicklung, Schnittstellen-Stubs |
| Partial Copy, maskiert | Auszug nach Maskierungslauf | nur lesend, nach geprüftem Maskierungsjob | Integrationstests mit SAP-QS-System |
| Full | alles | nein | UAT, End-to-End- und Lasttests |

Für die maskierte Partial Copy verkauft Salesforce [Data Mask & Seed](https://www.salesforce.com/eu/platform/data-masking/). Einen Preis nennt die Produktseite nicht.

```vertiefung Für Admins
titel: Wie arbeitet Data Mask?
Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/install-and-configure-salesforce-data-mask) ist Data Mask ein Managed Package, das in der Produktion installiert wird. Eine dort konfigurierte Maskierung erscheint in der Sandbox, wenn diese angelegt oder aktualisiert wird, und Sie starten sie jedes Mal im Data-Mask-Tab der Sandbox. Pro Feld wählen Sie Zufallszeichen oder Zufallszahlen zwischen Minimum und Maximum, einen Ersatz aus einer Bibliothek wie Nachname, Firmenname oder Straße, oder Löschen. Fallkommentare lassen sich maskieren, E-Mails und Chatter-Feeds komplett löschen. Checkbox-, Lookup- und Picklist-Felder werden nicht unterstützt.
```

```hinweis achtung
Bis der Maskierungsjob nach einem Refresh gelaufen ist, behandle ich eine Sandbox als unmaskiert. Agenten-Logins gibt es erst, wenn das Ausführungsprotokoll den Lauf als abgeschlossen zeigt.
```

Scratch Orgs sind standardmäßig leer. Für kleine Mengen empfiehlt Salesforce die [data-tree-Befehle](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_test_data.htm), passend für weniger als 3.000 Datensätze. Liegt ein solcher Seed-Datensatz im Repository, starten alle Entwickler und Agenten vom selben Stand.

## Was kostet Maskierung an Testrealismus?

- **Preislogik.** Zufallszahlen zerstören den Zusammenhang zwischen Listenpreis, Händlerrabatt und Nettopreis, ein Test der Bonusberechnung besteht dann zufällig oder eben nicht. Preislogik braucht eine eigens gebaute Testpreisliste: zwei Preislisten für einen Händler, ein Nullpreis für Kulanzteile, eine zweite Währung.
- **Seltene Konstellationen.** Die Maschine mit 14 Jahren Servicehistorie, die Anlage, die den Händler gewechselt hat, die SAP-Kundennummer an zwei Accounts. Solche Fälle stehen nur im Seed-Datensatz, wenn jemand sie aufschreibt. Ich würde Service und Vertrieb um 20 bis 30 davon bitten.
- **Freitext.** Maskierte Fallkommentare machen Zusammenfassungen der Servicehistorie schwer testbar. Synthetische Fehlerbeschreibungen mit Ihren echten Fehlercodes helfen.
- **Schnittstellenschlüssel.** Werden SAP-Kunden- und Materialnummern maskiert, scheitern die Tests gegen das SAP-QS-System. Ich würde sie behalten und die Namen drumherum maskieren.
- **Volumen.** Eine Partial Copy ist auf 5 GB begrenzt, eine Developer-Sandbox auf 200 MB. Lasttests gehören in die Full Copy, durchgeführt von Menschen, ebenso die Laufzeitbewertung von ApexGuru, siehe [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/).
- **Pflege.** Ein neues Feld für einen Händlerzuschlag bleibt unmaskiert, bis jemand es in die Maskierung aufnimmt. Diese Prüfung gehört in die Release-Checkliste.

## Ein typisches Szenario: Garantieanträge und der Agent des Partners

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service und Manufacturing Cloud auf einer Org, SAP als ERP, rund 300 Händlern und einer Full Copy mit monatlichem Refresh. Alle Zahlen in diesem Szenario sind Annahmen. Der Partner möchte Claude Code für eine Story zur Validierung von Garantieanträgen einsetzen und bittet um Zugriff auf die Full Copy, „weil dort die echten Anträge liegen“.

Der Kunde entscheidet sich stattdessen für drei Stufen:

- **Scratch Orgs** mit rund 1.500 Seed-Datensätzen: 30 Händler, 200 Anlagen, 400 Garantieanträge, zwei synthetische Preislisten und 25 Sonderfälle aus dem Service.
- **Eine Integrationssandbox** als maskierte Partial Copy: Namen aus der Bibliothek, E-Mails und Chatter gelöscht, Nettopreise zufällig, SAP-Nummern erhalten.
- **Die Full Copy** für UAT und SAP-End-to-End-Tests, ohne CLI-Login für die Entwickler des Partners.

Der angenommene Aufwand: 6 bis 10 Personentage für Seed-Datensatz und Maskierung, dazu ein halber Tag pro Release für neue Felder. Dafür liegt auf keinem Partner-Laptop ein echter Antrag, und ein Fehler, der nur mit echten Preisstaffeln auftritt, zeigt sich im UAT statt in der Scratch Org. Diesen Tausch würde ich eingehen.

## Wie setzen Sie die Regel durch, und wo fangen Sie an?

Die wirksamste Kontrolle: Auf keinem Rechner, auf dem ein Agent läuft, existiert ein Login für die Full Copy. Werkzeugeinstellungen sichern das ab:

- **Claude Code.** Laut Anthropics [Best Practices](https://code.claude.com/docs/en/best-practices) gelten Deny-Regeln in jedem Berechtigungsmodus. Dieselbe Seite sagt aber, dass eine WebFetch-Sperre nichts gegen curl ausrichtet, solange die Sandbox nicht aktiv ist. Deny-Regeln ergänzen den fehlenden Login, ersetzen ihn aber nicht.
- **Salesforce DX MCP Server.** Er erreicht nur [ausdrücklich freigegebene](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html) Orgs. Laut README erreicht er am 2. November 2026 das [Ende seiner Lebensdauer](../salesforce-dx-mcp-server-ende/), und was ihn ersetzt, braucht dieselbe Einschränkung.
- **Agentforce Vibes.** Salesforce beschreibt, wie man [Vibes pro Org abschaltet](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), im Setup unter Agentforce Vibes Extensions, für Produktions-Orgs. Ich würde das auch für die Full Copy tun.
- **Protokolle.** Verkürzen Sie die lokale Aufbewahrung mit `cleanupPeriodDays` und lassen Sie sich von Partnern bei Projektende die Löschung bestätigen.

So würde ich anfangen:

1. **Alle Sandboxes auflisten** mit Typ, letztem Refresh und wer einen CLI-Login hat.
2. **Felder einteilen** in personenbezogen, kaufmännisch und Freitext, zusammen mit dem Datenschutzbeauftragten.
3. **Den Seed-Datensatz bauen** mit Service und Vertrieb, inklusive Sonderfällen, und ins Repository einchecken.
4. **Die Maskierung konfigurieren** für die Partial Copy und die Feldprüfung in jedes Release aufnehmen.
5. **Agentenzugriff auf die Full Copy entfernen** und die Stufen in die Partneranlage und die KI-Regeldatei schreiben; weitere Agentenregeln stehen in [Kapitel 8 der Masterclass](../../masterclass/ki-salesforce/best-practices-ki-code/).

Sandbox-Stufen und Pipelines gehören zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

Eine Full-Copy-Sandbox ist Produktion, also sollte ein Coding-Agent nur Daten sehen, die Sie auch einen Monat lang auf einem Partner-Laptop akzeptieren würden.
