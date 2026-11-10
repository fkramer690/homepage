---
title: "Prompt Injection im Händlerportal: Agentforce schützen"
description: "Warum Händlerportal, Web-to-Lead, Email-to-Case und Garantieformulare Agentforce für Prompt Injection öffnen, was ForcedLeak zeigte und was schützt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: prompt-injection-haendlerportal-agentforce
translationKey: prompt-injection-dealer-portals
topic: security
categories: [ai]
tags: [Agentforce, Prompt Injection, Sicherheit, Händlerportal, Experience Cloud, Maschinenbau]
takeaways:
  - "Felder, die Externe befüllen können, von der Fehlerbeschreibung im Garantieantrag bis Email-to-Case, werden zu Anweisungen, sobald ein Agent sie liest."
  - "ForcedLeak leitete Lead-Daten über eine abgelaufene Allowlist-Domain ab, SalesBleed umging 2026 die Trusted-URL-Filterung. Beides ist behoben."
  - "Prompt-Filter arbeiten mit Wahrscheinlichkeiten. Planen Sie so, als würde ein Filter etwas übersehen, und begrenzen Sie den Schaden einer Injection."
  - "Brechen Sie die Lethal Trifecta: enge Leserechte im Ausführungskontext des Agenten, kein Weg nach draußen und Entscheidungen in deterministischer Logik."
faq:
  - q: "Was ist Prompt Injection bei Agentforce?"
    a: "Prompt Injection heißt, dass Text, den ein Angreifer kontrolliert, in den Kontext des Agenten gelangt und als Anweisung behandelt wird. Bei der indirekten Variante steht der Text in einem Datensatz, etwa einer Lead-Beschreibung oder einem Garantieantrag, und wirkt, sobald jemand intern den Agenten zu diesem Datensatz fragt."
  - q: "Ist ForcedLeak behoben?"
    a: "Ja. Laut Noma wurde die abgelaufene Domain wieder gesichert, und seit 8. September 2025 blockiert oder entfernt Salesforce in Antworten von Agentforce und Einstein AI Adressen, die nicht auf der Trusted-URL-Allowlist stehen. Ausnahmen wie exakte URLs in Agentenanweisungen oder Quellenangaben brauchen eine eigene Prüfung. 2026 fand Zenity einen Weg, diese Filterung zu umgehen (SalesBleed); Salesforce schloss ihn im August 2026. Das Muster dahinter, versteckte Anweisungen in fremdem Text, gilt weiter für jeden Agenten."
  - q: "Schützt der Einstein Trust Layer vor Prompt Injection?"
    a: "Salesforce beschreibt für seinen Trust Layer einen Detektor, der Nutzerprompts auf Prompt Injection bewertet. Ob und wie Text aus Datensätzen geprüft wird, erklärt der zitierte Beitrag nicht, und jeder Klassifikator übersieht einen Teil der Angriffe. Ich behandle diesen Detektor als eine Schicht neben engen Rechten und geschlossenen Ausgängen."
  - q: "Welche Felder sollte ein Hersteller als nicht vertrauenswürdig behandeln?"
    a: "Jedes Feld, das jemand außerhalb des Unternehmens befüllt: Web-to-Lead-Formulare, Email-to-Case, Case- und Kommentarfelder im Händlerportal, Fehlerbeschreibungen in Garantieanträgen, Berichte von Servicepartnern und importierte Daten von Distributoren, dazu E-Mail-Texte, Anhänge und Wissensinhalte, die Externe beeinflussen können."
draft: false
---

Prompt Injection im Händlerportal ist einer der direktesten Wege, auf denen ein Agentforce-Agent bei einem Hersteller gegen Sie arbeiten kann. Inhalte, die Händler, Kunden oder Websitebesucher eingeben können, von der Fehlerbeschreibung im Garantieantrag bis zu Web-to-Lead und Email-to-Case, werden zu Text, den Ihr Agent liest, sobald sie in seinem Kontext landen. ForcedLeak 2025 und SalesBleed 2026 haben gezeigt, dass versteckte Anweisungen in so einem Feld Agentforce dazu bringen konnten, CRM-Daten nach außen zu schicken. Filter, die mit Wahrscheinlichkeiten arbeiten, ziehen keine harte Grenze. Schutz ist deshalb eine Architekturentscheidung: begrenzen, was der Agent sieht, seine Wege nach außen schließen und Entscheidungen in deterministischer Logik halten.

## Was hat ForcedLeak gezeigt?

ForcedLeak ist eine Schwachstellenkette, die Noma Security am 28. Juli 2025 an Salesforce meldete und mit CVSS 9,4 bewertete. Laut [The Hacker News](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html) konnten Orgs betroffen sein, in denen Agentforce Web-to-Lead-Datensätze verarbeitete. Ein Angreifer schickte ein Webformular ab, in dessen Feld Beschreibung (Description) versteckte Anweisungen standen. Später stellte eine Mitarbeiterin Agentforce eine gewöhnliche Frage zu diesem Lead. Der Agent folgte den versteckten Anweisungen, verarbeitete sie zusammen mit der echten Frage, las weitere Lead-Daten und baute sie in die Adresse eines Bildes in seiner Antwort ein. Beim Anzeigen der Antwort lud der Browser dieses Bild von der Domain des Angreifers. Die Zieldomain stand auf der Allowlist von Salesforce, war aber abgelaufen und für etwa 5 US-Dollar zu kaufen.

```ablauf
ext: Angreifer, Mitarbeiterin, Abgelaufene Domain
sf: Lead-Beschreibung, Agentforce
Angreifer --Webformular--> Lead-Beschreibung
Mitarbeiterin --Frage zum Lead--> Agentforce
Lead-Beschreibung --Versteckte Anweisung--> Agentforce
Agentforce --Daten in Bild-URL--> Abgelaufene Domain
```

Salesforce hat die Meldung am 31. Juli bestätigt und erzwingt laut [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) seit 8. September 2025 Trusted URLs für Agentforce und Einstein AI. Gegenüber The Hacker News erklärte Salesforce, die Allowlist stelle sicher, dass bei Prompt Injection „no malicious links are called or generated“. Laut Noma wurde die abgelaufene Domain wieder gesichert.

```zeitleiste
2025-07-28 | Noma Security meldet ForcedLeak an Salesforce, CVSS 9,4
2025-07-31 | Salesforce bestätigt die Meldung
2025-09-08 | Salesforce erzwingt Trusted URLs für Agentforce und Einstein AI
2025-09-25 | Noma veröffentlicht die Details
2026-06-01 | Zenity meldet SalesBleed, eine Umgehung der Trusted-URL-Filterung
2026-08-19 | Zenity bestätigt den Fix von Salesforce
```

Damit war das Thema nicht erledigt. Bei [SalesBleed](https://labs.zenity.io/post/salesbleed-0-click-data-exfiltration-on-agentforce) begann Zenity Labs wieder mit einem Web-to-Lead-Formular. Sonderfälle in der URL-Filterung ließen einen Link passieren, und die Daten flossen über eine DNS-Abfrage ab, entweder wenn der Chat ein Bild anzeigte oder wenn Slack für einen dort veröffentlichten Agenten eine Linkvorschau erzeugte. Laut Zenity ist „this specific chain“ geschlossen.

Zwei Punkte sind mir wichtiger als der Patch. Noma schreibt, dem Modell habe die Fähigkeit gefehlt, zwischen Daten in seinem Kontext und Anweisungen aus vertrauenswürdigen Quellen zu unterscheiden („lacked the ability to distinguish“). Das gilt weiterhin für heutige Agenten auf Basis von Sprachmodellen. Und ein Sprecher von Salesforce nannte Prompt Injection gegenüber [SalesforceBen](https://www.salesforceben.com/agentforce-web-to-lead-vulnerability-exposed-could-you-be-impacted/) „a complex and evolving area“. Der konkrete Exfiltrationsweg ist geschlossen. Das Muster bleibt.

## Händlerportal und Servicepostfach sind Einfallstore

Simon Willison hat das Muster im Juni 2025 [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) genannt: Ein Agent mit Zugriff auf private Daten, Kontakt zu nicht vertrauenswürdigen Inhalten und der Möglichkeit, nach außen zu kommunizieren, lässt sich dazu bringen, diese Daten abfließen zu lassen. ForcedLeak nannte er einen [klassischen Fall](https://simonwillison.net/2025/Sep/26/agentforce/) davon. In einer Org eines Herstellers kommt solcher Text durch mehr Türen als Web-to-Lead:

- **Web-to-Lead** für Angebots- und Ersatzteilanfragen auf der Website. Dafür ist meist keine Anmeldung nötig.
- **Email-to-Case** am Servicepostfach. Wer die Adresse kennt, legt einen Case an, sofern keine vorgeschalteten Filter Absender einschränken.
- **Das Händlerportal** auf Experience Cloud: Case-Beschreibungen, Kommentare, Garantieanträge mit freier Fehlerbeschreibung. Hier ist eine Anmeldung nötig. Bei hundert Händlerbetrieben müssen Sie jedoch in jedem Betrieb mit eigener Fluktuation und eigenen Passwortgewohnheiten rechnen.
- **Berichte von Servicepartnern** in Field Service, geschrieben von externen Technikern im Außendienst.
- **Importe von Distributoren**, etwa Bestellnotizen oder Antragslisten.

Ein Buyer Agent, der Bestellungen per WhatsApp oder SMS annimmt, öffnet eine weitere Tür, siehe [B2B Buyer Agent: Bestellen per WhatsApp und SMS](../b2b-buyer-agent-whatsapp-bestellen/).

Wer den Angriff auslöst, ist Ihre eigene Mitarbeiterin bei der normalen Arbeit. Die Sachbearbeitung in der Garantieabteilung lässt sich die Anträge des Tages zusammenfassen. Der Vertrieb fragt nach einem neuen Lead. An der Frage ist nichts falsch. Die Anweisung steht in einem Datensatz, den niemand geöffnet hat.

Wie groß der Schaden werden kann, entscheidet das erste Merkmal: der Zugriff auf private Daten. Interne Agenten laufen oft mit breiten Rechten, weil sie über alle Accounts hinweg helfen sollen. Liest so ein Agent den Antrag eines Händlers, kann er womöglich auch Preise, Bonusvereinbarungen oder Margenfelder anderer Händler lesen. Im [Beitrag zum Kundenportal](../manufacturing-cloud-kundenportal/) begründe ich, warum Marge und Kosten nie nach außen gehen dürfen. Ein Agent mit falschen Rechten ist ein Weg, auf dem sie es trotzdem tun.

## Warum reicht ein Prompt-Filter nicht?

Salesforce beschreibt einen [Detektor für Prompt Injection](https://www.salesforce.com/blog/prompt-injection-detection/) für seinen [Trust Layer](../einstein-trust-layer-was-er-schuetzt/). Das KI-Forschungsteam beschreibt einen Klassifikator, der Nutzerprompts bewertet, damit die Plattform eingreifen kann, bevor sie den Agenten erreichen. Das ist nützlich. Der Beitrag vom März 2025 beschreibt aber die Prüfung von Nutzerprompts und sagt nicht, wie Text aus Datensätzen geprüft wird, etwa aus einem Garantieantrag. Und jeder Klassifikator arbeitet mit Wahrscheinlichkeiten. Willison schreibt über Guardrail-Produkte, die 95 Prozent der Angriffe abfangen wollen: In der Sicherheit von Webanwendungen sei das „very much a failing grade“.

Der [Sicherheitsleitfaden für ISVs](https://developer.salesforce.com/docs/platform/isvforce/guide/secure-agentforce-prompt-injection-data.html) von Salesforce verlangt, nutzerkontrollierte Daten vor dem Einfügen in einen Prompt zu prüfen, mit einer Allowlist erlaubter Zeichen und Längengrenzen, und sie wegzulassen, wenn sie durchfallen. Das würde ich überall anwenden, wo fremder Text in einen Prompt geht, mit Regeln für jede Art von Inhalt: strenge Prüfung für strukturierte Felder, Längengrenzen für Freitext. Eine Zeichen-Allowlist würde in einer Fehlerbeschreibung Modellnummern und Einheiten unbrauchbar machen. Die Prüfung erhöht den Aufwand für Angreifer. Sicher wird der Agent dadurch nicht, denn eine überzeugende Anweisung kann kurz sein und in normalen Worten stehen.

Ich behandle die Erkennung deshalb als eine Schicht und plane so, als würde sie etwas übersehen.

## Wie schützen Sie Agentforce vor Prompt Injection?

Ziel ist, dass eine erfolgreiche Injection wenig anrichtet. Brechen Sie bei jedem Agenten, der fremden Text liest, mindestens eines der drei Merkmale, besser zwei.

1. **Externe Inhalte markieren.** Listen Sie pro Objekt und Kanal jedes Feld auf, das jemand außerhalb des Unternehmens befüllen kann, dazu E-Mail-Texte, Anhänge und Wissensartikel, die Externe beeinflussen. Diese Liste kann ein Business Analyst aktuell halten.
2. **Ausgänge schließen.** Trusted URLs werden in jeder Org durchgesetzt. Prüfen Sie daher, was erlaubt ist: exakte URLs in Agentenanweisungen, Platzhalter, CSP-Direktiven und die Liste der [Trusted URLs](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_csptrustedsite.htm) selbst. Jeder Eintrag braucht einen Verantwortlichen und einen Grund, und ein Eintrag für eine Kampagnenseite von vor Jahren birgt dasselbe Risiko einer übernommenen Domain, das bei ForcedLeak in einer von Salesforce gepflegten Allowlist ausgenutzt wurde. Ein neuer Eintrag erlaubt Bilder standardmäßig. Zu den Ausgängen gehören auch Agenten-Aktionen, die E-Mails senden, in Slack posten oder Webhooks aufrufen. Ein Agent, der fremden Text zusammenfasst, sollte keine davon haben.
3. **Den Ausführungskontext verkleinern.** Klären Sie zuerst, in wessen Kontext der Agent läuft: Ein Mitarbeiter-Agent arbeitet mit den Rechten des angemeldeten Mitarbeiters, ein Service-Agent mit einem eigenen Agent User. [Salesforce](https://www.salesforce.com/blog/best-practices-for-secure-agentforce-implementation-2/) empfiehlt, nur die nötigen Rechte zu vergeben und die Rollenhierarchie und die organisationsweiten Standardeinstellungen regelmäßig zu prüfen. Ein Agent, der den Antrag eines Händlers bearbeitet, sieht diesen Antrag, das Asset und den Account dieses Händlers, nicht die ganze installierte Basis. Dafür braucht es Sharing oder Abfragefilter, Objektrechte allein reichen nicht.
4. **Entscheidungen und Schreibzugriffe aus dem Modell halten.** Garantiefreigaben, Gutschriften und Preisausnahmen gehören hinter deterministische Schranken, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben. Eine Aktion hinter einer `available when`-Bedingung lässt sich durch Text in einem Antrag nicht auslösen, sofern die Bedingung aus vertrauenswürdigen Daten oder einer deterministischen Aktion stammt und nicht aus der Deutung des Antrags durch das Modell. Alles, was Geld bewegt oder Daten an Dritte schickt, bekommt eine Freigabe durch einen Menschen.
5. **Lesen und Handeln trennen.** Ein Paper zu Entwurfsmustern, das Willison [zusammengefasst](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/) hat, bringt das Prinzip auf den Punkt: Hat ein Agent nicht vertrauenswürdige Eingaben gelesen, muss er eingeschränkt werden. In Salesforce heißt das für mich: ein Zusammenfassungsschritt ohne Aktionen, dessen Ergebnis ein Mensch oder ein deterministischer Schritt weiterverwendet.
6. **Testen und Bestandsdaten prüfen.** Nehmen Sie Sicherheitstestfälle mit versteckten Anweisungen in das Testset des Agenten auf, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/), und durchsuchen Sie bestehende Datensätze nach ungewöhnlichen Anweisungen in den externen Feldern, wie Noma es nach ForcedLeak empfohlen hat. Beobachten Sie außerdem blockierte Trusted-URL- und CSP-Verstöße sowie die Aktionsaufrufe des Agenten.

## Beispiel: Garantieanträge von 120 Händlern

Nehmen wir einen Hersteller von Verpackungsmaschinen mit 120 Händlern, SAP als ERP und Manufacturing Cloud mit Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Die Händler reichen rund 300 Garantieanträge im Monat ein, jeder mit freier Fehlerbeschreibung. Geplant ist ein Agent mit eigenem Agent User, der dem Garantieteam jeden Morgen die neuen Anträge zusammenfasst.

Im ersten Design-Review fallen alle drei Merkmale auf. Der Agent User ist eine Kopie des Profils der Sachbearbeitung Garantie und darf jeden Händler-Account, alle Anträge und die Bonusvereinbarungen lesen. Die Fehlerbeschreibung ist fremder Text. Und der Agent hat eine Aktion, die dem Händler eine Bestätigung mailt, sowie eine Zusammenfassungsfunktion, die Links anzeigt.

Die Änderungen sind unspektakulär. Ein Flow übergibt dem Agenten einen Antrag nach dem anderen, und der Agent User darf nur noch Anträge, Assets und Händler-Accounts lesen; Bonusvereinbarungen und Margenfelder fallen weg. Die E-Mail-Aktion wandert in einen eigenen Schritt, den die Sachbearbeitung nach dem Lesen der Zusammenfassung auslöst. Die Liste der Trusted URLs schrumpft in diesem Beispiel von 14 auf 6 Einträge, jeder mit einem namentlich Verantwortlichen. Die Anspruchsprüfung läuft als deterministische Logik gegen Seriennummer und Garantiebeginn, so wie es auch beim [Garantie-Prüfagenten](../garantie-pruefagent-winter-27/) gedacht ist.

Danach kann eine versteckte Anweisung in einer Fehlerbeschreibung noch eine Zusammenfassung verfälschen. Der Agent kommt aber nicht an Bonus- oder Margendaten, erhält nur diesen einen Antrag als Eingabe und hat keinen Weg nach draußen. Das Restrisiko besteht in einer irreführenden Zusammenfassung, die auffällt, weil Anträge über einem vereinbarten Betrag immer vollständig gelesen werden. Nach meiner Einschätzung ist dieses Restrisiko vertretbar. Ein Agent mit breiten Leserechten und einer E-Mail-Aktion ist es nicht.

## Einen halben Tag lang die extern befüllbaren Felder prüfen

Für einen ersten Durchgang würde ich mich einen halben Tag mit der Salesforce-Administration und der Serviceleitung zusammensetzen und fünf Fragen beantworten:

1. Welche Felder und anderen Inhalte in unserer Org können Menschen außerhalb des Unternehmens befüllen oder beeinflussen?
2. Welche Agenten, Prompts oder Flows lesen diese Felder?
3. Was sieht jeder Agent in seinem Ausführungskontext über den aktuellen Datensatz hinaus?
4. Welche Aktionen, Links oder Trusted URLs geben ihm einen Weg nach draußen?
5. Welche Entscheidungen trifft das Modell, die eine Regel treffen sollte?

Dieselben Fragen gelten für externe KI-Werkzeuge, die Salesforce-Daten über MCP lesen, denn für die Lethal Trifecta spielt es keine Rolle, welcher Client das Feld liest. Das behandle ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/), die OAuth-Aspekte in [Connected Apps und KI-Integrationen](../connected-apps-oauth-ki-integrationen/). Solche Datenflüsse und Berechtigungen aufzunehmen, gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
