---
title: "Prompt Injection im Händlerportal: Agentforce schützen"
description: "Warum Händlerportal, Web-to-Lead, Email-to-Case und Garantieformulare Agentforce für Prompt Injection öffnen, was ForcedLeak zeigte und was schützt."
pubDate: 2026-10-27
lang: de
slug: prompt-injection-haendlerportal-agentforce
translationKey: prompt-injection-dealer-portals
topic: security
categories: [ai]
tags: [Agentforce, Prompt Injection, Sicherheit, Händlerportal, Experience Cloud, Maschinenbau]
takeaways:
  - "Jedes Feld, das Externe beschreiben können, von der Fehlerbeschreibung im Garantieantrag bis zu Email-to-Case, ist Text, den ein Agent befolgen kann."
  - "ForcedLeak (CVSS 9,4) brachte Agentforce dazu, Lead-Daten an eine abgelaufene Allowlist-Domain zu senden. Seit 8. September 2025 gelten Trusted URLs."
  - "Prompt-Filter arbeiten mit Wahrscheinlichkeiten. Planen Sie so, als würden sie etwas übersehen, und begrenzen Sie den Schaden einer Injection."
  - "Brechen Sie die Lethal Trifecta: enge Leserechte für den Running User, kein Weg nach draußen und Entscheidungen in deterministischer Logik."
faq:
  - q: "Was ist Prompt Injection bei Agentforce?"
    a: "Prompt Injection heißt, dass Text, den ein Angreifer kontrolliert, in den Kontext des Agenten gelangt und als Anweisung behandelt wird. Bei der indirekten Variante steht der Text in einem Datensatz, etwa einer Lead-Beschreibung oder einem Garantieantrag, und wirkt, sobald jemand intern den Agenten zu diesem Datensatz fragt."
  - q: "Ist ForcedLeak behoben?"
    a: "Ja. Laut Noma wurde die abgelaufene Domain wieder gesichert, und Salesforce erzwingt seit 8. September 2025 eine Trusted-URL-Allowlist für Agentforce und Einstein AI, sodass Agenten keine Links zu Adressen außerhalb dieser Liste aufrufen oder erzeugen. Das Muster dahinter, versteckte Anweisungen in fremdem Text, gilt weiter für jeden Agenten."
  - q: "Schützt der Einstein Trust Layer vor Prompt Injection?"
    a: "Salesforce beschreibt für seinen Trust Layer einen Detektor, der Nutzerprompts auf Prompt Injection bewertet. Wie Text aus Datensätzen geprüft wird, beschreibt Salesforce nicht, und jeder Klassifikator übersieht einen Teil der Angriffe. Ich behandle ihn als eine Schicht neben engen Rechten und geschlossenen Ausgängen."
  - q: "Welche Felder sollte ein Hersteller als nicht vertrauenswürdig behandeln?"
    a: "Jedes Feld, das jemand außerhalb des Unternehmens schreibt: Web-to-Lead-Formulare, Email-to-Case, Case- und Kommentarfelder im Händlerportal, Fehlerbeschreibungen in Garantieanträgen, Berichte von Servicepartnern und importierte Daten von Distributoren."
draft: false
---

Prompt Injection im Händlerportal ist der wahrscheinlichste Weg, auf dem ein Agentforce-Agent bei einem Hersteller gegen Sie arbeitet. Jedes Feld, das Händler, Kunden oder Websitebesucher beschreiben, von der Fehlerbeschreibung im Garantieantrag bis zu Web-to-Lead und Email-to-Case, wird zu Text, den Ihr Agent liest. ForcedLeak hat 2025 gezeigt, dass versteckte Anweisungen in so einem Feld Agentforce dazu bringen konnten, CRM-Daten nach außen zu schicken. Kein Filter fängt das zuverlässig ab. Schutz ist deshalb eine Architekturentscheidung: begrenzen, was der Agent sieht, seine Wege nach außen schließen und Entscheidungen in deterministischer Logik halten.

## Was hat ForcedLeak gezeigt?

ForcedLeak ist eine Kette von Schwachstellen, die Noma Security am 28. Juli 2025 an Salesforce gemeldet hat, bewertet mit CVSS 9,4. Laut [The Hacker News](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html) betraf sie jede Org, die Agentforce mit aktiviertem Web-to-Lead nutzte. Ein Angreifer schickte ein Webformular ab, im Feld Description standen versteckte Anweisungen. Später stellte eine Mitarbeiterin Agentforce eine gewöhnliche Frage zu diesem Lead. Der Agent führte die versteckten Anweisungen zusammen mit der echten Frage aus, las weitere Lead-Daten und schickte sie nach außen, eingebettet in die Adresse eines Bildes. Die Zieldomain stand auf der Allowlist von Salesforce, war aber abgelaufen und für etwa 5 US-Dollar zu kaufen.

```ablauf
ext: Angreifer, Mitarbeiterin, Abgelaufene Domain
sf: Lead-Beschreibung, Agentforce
Angreifer --Webformular--> Lead-Beschreibung
Mitarbeiterin --Frage zum Lead--> Agentforce
Lead-Beschreibung --liest Anweisung--> Agentforce
Agentforce --Daten in Bild-URL--> Abgelaufene Domain
```

Salesforce hat die Meldung am 31. Juli bestätigt und erzwingt laut [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) seit 8. September 2025 Trusted URLs für Agentforce und Einstein AI. Gegenüber The Hacker News erklärte Salesforce, die Allowlist stelle sicher, dass über Prompt Injection „no malicious links are called or generated“. Laut Noma wurde die abgelaufene Domain wieder gesichert.

```zeitleiste
2025-07-28 | Noma Security meldet ForcedLeak an Salesforce, CVSS 9,4
2025-07-31 | Salesforce bestätigt die Meldung
2025-09-08 | Salesforce erzwingt Trusted URLs für Agentforce und Einstein AI
2025-09-25 | Noma veröffentlicht die Details
```

Zwei Punkte sind mir wichtiger als der Patch. Noma schreibt, dem Modell habe die Fähigkeit gefehlt („lacked the ability to distinguish“), zwischen Daten in seinem Kontext und Anweisungen aus vertrauenswürdigen Quellen zu unterscheiden. Das gilt für jedes Sprachmodell. Und ein Sprecher von Salesforce nannte Prompt Injection gegenüber [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) „a complex and evolving area“. Der konkrete Ausgang ist zu. Das Muster bleibt.

## Händlerportal und Servicepostfach sind Einfallstore

Simon Willison hat das Muster im Juni 2025 [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) genannt: Ein Agent mit Zugriff auf private Daten, Kontakt zu nicht vertrauenswürdigen Inhalten und der Möglichkeit, nach außen zu kommunizieren, lässt sich dazu bringen, diese Daten abfließen zu lassen. Nicht vertrauenswürdig ist für ihn jeder Weg, auf dem Text oder Bilder eines Angreifers beim Sprachmodell ankommen können. ForcedLeak nannte er einen [klassischen Fall](https://simonwillison.net/2025/Sep/26/agentforce/) davon. In einer Org eines Herstellers kommt solcher Text durch mehr Türen als Web-to-Lead:

- **Web-to-Lead** für Angebots- und Ersatzteilanfragen auf der Website. Ohne Anmeldung.
- **Email-to-Case** am Servicepostfach. Wer die Adresse kennt, legt einen Case an.
- **Das Händlerportal** auf Experience Cloud: Case-Beschreibungen, Kommentare, Garantieanträge mit freier Fehlerbeschreibung. Hier ist eine Anmeldung nötig. Bei hundert Händlerbetrieben bringt aber jeder Betrieb seine eigene Fluktuation und eigene Passwortgewohnheiten mit.
- **Berichte von Servicepartnern** in Field Service, geschrieben von externen Technikern im Außendienst.
- **Importe von Distributoren**, etwa Bestellnotizen oder Antragslisten.

Ein Buyer Agent, der Bestellungen per WhatsApp oder SMS annimmt, öffnet eine weitere Tür, siehe [B2B Buyer Agent: Bestellen per WhatsApp und SMS](../b2b-buyer-agent-whatsapp-bestellen/).

Wer den Angriff auslöst, ist Ihre eigene Mitarbeiterin bei der normalen Arbeit. Die Sachbearbeitung Garantie lässt sich die Anträge des Tages zusammenfassen. Der Vertrieb fragt nach einem neuen Lead. An der Frage ist nichts falsch. Die Anweisung steht in einem Datensatz, den niemand geöffnet hat.

Wie schlimm es wird, entscheidet das erste Merkmal: der Zugriff auf private Daten. Interne Agenten laufen oft mit breiten Rechten, weil sie über alle Accounts hinweg helfen sollen. Liest so ein Agent den Antrag eines Händlers, kann er womöglich auch Preise, Bonusvereinbarungen oder Margenfelder anderer Händler lesen. Im [Beitrag zum Kundenportal](../manufacturing-cloud-kundenportal/) begründe ich, warum Marge und Kosten nie nach außen gehen dürfen. Ein Agent mit falschen Rechten ist ein Weg, auf dem sie es trotzdem tun.

## Warum reicht ein Prompt-Filter nicht?

Salesforce beschreibt einen [Detektor für Prompt Injection](https://www.salesforce.com/blog/prompt-injection-detection/) für seinen Trust Layer. Das KI-Forschungsteam beschreibt einen Klassifikator, der Nutzerprompts bewertet, damit die Plattform eingreifen kann, bevor sie beim Agenten ankommen. Das ist nützlich. Der Beitrag vom März 2025 beschreibt aber die Prüfung von Nutzerprompts und sagt nicht, wie Text aus Datensätzen geprüft wird, etwa aus einem Garantieantrag. Und jeder Klassifikator arbeitet mit Wahrscheinlichkeiten. Willison schreibt über Guardrail-Produkte, die 95 Prozent der Angriffe abfangen wollen: In der Sicherheit von Webanwendungen sei das „very much a failing grade“.

Der [Sicherheitsleitfaden für ISVs](https://developer.salesforce.com/docs/platform/isvforce/guide/secure-agentforce-prompt-injection-data.html) von Salesforce verlangt, nutzerkontrollierte Daten vor dem Einfügen in einen Prompt zu prüfen, mit einer Allowlist erlaubter Zeichen und Längengrenzen, und sie wegzulassen, wenn sie durchfallen. Das würde ich auf jedes extern beschriebene Feld anwenden. Es erhöht den Aufwand für Angreifer. Sicher wird der Agent dadurch nicht, denn eine überzeugende Anweisung kann kurz sein und in normalen Worten stehen.

Ich behandle die Erkennung deshalb als eine Schicht und plane so, als würde sie etwas übersehen.

## Wie schützen Sie Agentforce vor Prompt Injection?

Ziel ist, dass eine erfolgreiche Injection wenig anrichtet. Brechen Sie bei jedem Agenten, der fremden Text liest, mindestens eines der drei Merkmale, besser zwei.

1. **Externe Felder markieren.** Listen Sie pro Objekt und Kanal jedes Feld auf, das jemand außerhalb des Unternehmens beschreiben kann. Diese Liste kann ein Business Analyst aktuell halten.
2. **Ausgänge schließen.** Prüfen Sie, dass die Durchsetzung der Trusted URLs in Ihrer Org aktiv ist. Dann sehen Sie sich die Liste der [Trusted URLs](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_csptrustedsite.htm) selbst an: Jeder Eintrag braucht einen Verantwortlichen und einen Grund, und ein Eintrag für eine Kampagnenseite von vor Jahren ist genau die Art abgelaufener Domain, die ForcedLeak genutzt hat. Ein neuer Eintrag erlaubt Bilder standardmäßig. Zu den Ausgängen gehören auch Agenten-Aktionen, die E-Mails senden, in Slack posten oder Webhooks aufrufen. Ein Agent, der fremden Text zusammenfasst, sollte keine davon haben.
3. **Den Running User verkleinern.** Jeder Agent hat einen Running User, der festlegt, was er lesen und tun darf. Laut [Salesforce](https://www.salesforce.com/blog/best-practices-for-secure-agentforce-implementation-2/) haben neue Agenten standardmäßig keine Rechte, und Sie sollen nur das Nötigste vergeben und Rollenhierarchie und organisationsweite Standardeinstellungen regelmäßig prüfen. Ein Agent, der den Antrag eines Händlers bearbeitet, sieht diesen Antrag, das Asset und den Account dieses Händlers, nicht die ganze installierte Basis.
4. **Entscheidungen und Schreibzugriffe aus dem Modell halten.** Garantiefreigaben, Gutschriften und Preisausnahmen gehören hinter deterministische Schranken, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben. Eine Aktion hinter einer `available when`-Bedingung lässt sich durch Text in einem Antrag nicht auslösen. Alles, was Geld bewegt oder Daten an Dritte schickt, bekommt eine Freigabe durch einen Menschen.
5. **Lesen und Handeln trennen.** Ein Paper zu Entwurfsmustern, das Willison [zusammengefasst](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/) hat, bringt das Prinzip auf eine Zeile: Hat ein Agent nicht vertrauenswürdige Eingaben gelesen, muss er eingeschränkt werden. In Salesforce heißt das für mich: ein Zusammenfassungsschritt ohne Aktionen, dessen Ergebnis ein Mensch oder ein deterministischer Schritt weiterverwendet.
6. **Testen und zurückschauen.** Nehmen Sie Schutzfälle mit versteckten Anweisungen in das Testset des Agenten auf, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/), und durchsuchen Sie bestehende Datensätze nach ungewöhnlichen Anweisungen in den externen Feldern, wie Noma es nach ForcedLeak empfohlen hat.

## Beispiel: Garantieanträge von 120 Händlern

Nehmen wir einen Hersteller von Verpackungsmaschinen mit 120 Händlern, SAP als ERP und Manufacturing Cloud mit Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Die Händler reichen rund 300 Garantieanträge im Monat ein, jeder mit freier Fehlerbeschreibung. Geplant ist ein interner Agent, der dem Garantieteam jeden Morgen die neuen Anträge zusammenfasst.

Das erste Design-Review findet alle drei Merkmale. Der Running User des Agenten ist eine Kopie des Profils der Sachbearbeitung Garantie und darf jeden Händler-Account, alle Anträge und die Bonusvereinbarungen lesen. Die Fehlerbeschreibung ist fremder Text. Und der Agent hat eine Aktion, die dem Händler eine Bestätigung mailt, und Zusammenfassungen, die Links anzeigen.

Die Änderungen sind unspektakulär. Der Running User darf nur noch Anträge, Assets und den Account des einreichenden Händlers lesen; Bonusvereinbarungen und Margenfelder fallen weg. Die E-Mail-Aktion wandert in einen eigenen Schritt, den die Sachbearbeitung nach dem Lesen der Zusammenfassung auslöst. Die Liste der Trusted URLs, angenommen mit 14 Einträgen, schrumpft auf 6, jeder mit einem namentlich Verantwortlichen. Die Anspruchsprüfung läuft als deterministische Logik gegen Seriennummer und Garantiebeginn, so wie es auch beim [Garantie-Prüfagenten](../garantie-pruefagent-winter-27/) gedacht ist.

Danach kann eine versteckte Anweisung in einer Fehlerbeschreibung noch eine Zusammenfassung verfälschen. Sie kommt aber an keine Daten außerhalb dieses Antrags und hat keinen Weg nach draußen. Das Restrisiko ist eine irreführende Zusammenfassung, und die fällt auf, weil Anträge über einem vereinbarten Betrag immer vollständig gelesen werden. Nach meiner Einschätzung ist dieses Restrisiko vertretbar. Ein Agent mit breiten Leserechten und einer E-Mail-Aktion ist es nicht.

## Einen halben Tag lang die beschreibbaren Felder durchgehen

Für einen ersten Durchgang würde ich mich einen halben Tag mit der Salesforce-Administration und der Serviceleitung zusammensetzen und fünf Fragen beantworten:

1. Welche Felder in unserer Org können Menschen außerhalb des Unternehmens beschreiben?
2. Welche Agenten, Prompts oder Flows lesen diese Felder?
3. Was sieht der Running User jedes Agenten über den aktuellen Datensatz hinaus?
4. Welche Aktionen, Links oder Trusted URLs geben ihm einen Weg nach draußen?
5. Welche Entscheidungen trifft das Modell, die eine Regel treffen sollte?

Dieselben Fragen gelten für externe KI-Werkzeuge, die Salesforce-Daten über MCP lesen, denn für die Lethal Trifecta spielt es keine Rolle, welcher Client das Feld liest. Das behandle ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/), die OAuth-Seite in [Connected Apps und KI-Integrationen](../connected-apps-oauth-ki-integrationen/). Datenflüsse und Berechtigungen so aufzunehmen, gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
