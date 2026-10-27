---
title: "Community-MCP-Server für Salesforce: was prüfen?"
description: "Ein Partner will einen Community- oder Gateway-MCP-Server für Salesforce. Was Sie vor der Freigabe prüfen und wann Salesforce Hosted MCP sicherer ist."
pubDate: 2026-10-27
lang: de
slug: community-mcp-server-salesforce-risiken
translationKey: community-mcp-servers-risks
topic: security
categories: [devops, ai]
contactBrief: partner-governance
tags: [MCP, Community-MCP-Server, Sicherheit, Claude Code, Partnersteuerung, Maschinenbau]
takeaways:
  - "Ein Community-MCP-Server ist Fremdcode mit Salesforce-Login und braucht deshalb dieselbe Freigabe wie eine Schnittstelle, nicht die eines Browser-Plugins."
  - "Vor der Freigabe prüfen Sie sechs Punkte: Identität, Zugangsdaten, Maintainer und gepinnte Version, Werkzeugliste, andere Werkzeuge im selben Client und Ziel-Org."
  - "Die Vorfälle sind real: Ein gefälschtes postmark-mcp-Paket kopierte ab Version 1.0.16 jede E-Mail an seinen Autor, und mcp-remote hatte eine Lücke mit CVSS 9,6 bei über 437.000 Downloads."
  - "Arbeitet eine Person mit Claude, ChatGPT oder Cursor auf einer Enterprise Edition, ist Salesforce Hosted MCP der sicherere Weg: Named User, OAuth mit PKCE, standardmäßig aus."
  - "Nächtliche Jobs und Maschine-zu-Maschine-Zugriffe gehören in eine klassische Integration oder die Agent API, nicht in einen Community-Server mit gespeichertem Passwort."
faq:
  - q: "Sind Community-MCP-Server für Salesforce unsicher?"
    a: "Nicht grundsätzlich, aber niemand prüft sie für Sie. Anthropic schreibt, dass es keinen MCP-Server einem Security-Audit unterzieht oder verwaltet, und die Salesforce-Sicherheitsempfehlungen gelten nur für die gehosteten Server. Identität, Zugangsdaten, Maintainer, Version und Werkzeuge prüft deshalb der Kunde vor der Freigabe."
  - q: "Was ist Tool Poisoning bei MCP?"
    a: "Tool Poisoning bedeutet versteckte Anweisungen in der Beschreibung eines Werkzeugs, die das Modell liest und der Benutzer meist nicht sieht. Verwandt ist ein Werkzeug, das seine Beschreibung nach der Installation ändert, sodass sich ein freigegebener Server nach einem Update anders verhält."
  - q: "Wann ist Salesforce Hosted MCP die bessere Wahl?"
    a: "Wenn eine Person interaktiv mit einem KI-Client auf einer Org ab Enterprise Edition arbeitet. Jeder Aufruf läuft unter diesem Named User, die Anmeldung nutzt OAuth mit PKCE, und die Server bleiben aus, bis ein Admin sie aktiviert. Laut Salesforce sind sie für Kunden mit Flex Credits gedacht, die Nutzung kann abgerechnet werden."
  - q: "Darf ein Community-MCP-Server Benutzername und Passwort nutzen?"
    a: "Technisch geht das, ich würde es ablehnen. Laut Salesforce Time setzt Salesforce das Ende des OAuth Username-Password Flow am 20. Februar 2027 durch, und ein Passwort in einer Konfigurationsdatei auf einem Laptop ist die schwächste Form von Zugangsdaten."
  - q: "Wie sperren wir nicht freigegebene MCP-Server in Claude Code?"
    a: "Claude Code unterstützt Managed Settings mit allowedMcpServers und allowManagedMcpServersOnly oder eine Datei managed-mcp.json mit festem Server-Set. Lokale Server auf der Allowlist müssen exakt mit Befehl und Argumenten übereinstimmen."
draft: false
---

Ein Community-MCP-Server für Salesforce ist Fremdcode, der mit einem Salesforce-Login läuft. Ich würde ihn deshalb wie eine Schnittstelle freigeben, nicht wie ein Browser-Plugin. Bevor Sie zustimmen, klären Sie, unter wessen Identität er arbeitet, wo seine Zugangsdaten liegen, wer ihn pflegt und ob die Version gepinnt ist, welche Werkzeuge er anbietet, was sonst im selben KI-Client läuft und welche Org er erreicht. Arbeitet eine Person mit Claude, ChatGPT oder Cursor auf einer Enterprise Edition, ist Salesforce Hosted MCP der sicherere Weg. Nächtliche Jobs gehören in eine klassische Integration.

## Warum ist ein Community-MCP-Server ein eigenes Risiko?

Über MCP (Model Context Protocol) ruft ein KI-Client Werkzeuge in anderen Systemen auf; die Grundlagen stehen in [MCP für die IT-Leitung erklärt](../mcp-salesforce-erklaert-it-leitung/). Ein Community-Server ist einer, den weder Salesforce noch Ihr KI-Anbieter betreibt: ein npm-Paket, ein GitHub-Projekt oder ein kommerzielles Gateway, das mehrere Systeme über eine einzige OAuth-App verbindet.

Geprüft werden diese Server von niemandem. Anthropic schreibt auf der [Sicherheitsseite von Claude Code](https://code.claude.com/docs/en/security), dass es "does not security-audit or manage any MCP server", und empfiehlt, eigene Server zu schreiben oder Server von Anbietern zu nutzen, denen man vertraut. Die [Hosted MCP Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) von Salesforce behandeln nur die eigenen Server.

Zwei Vorfälle außerhalb von Salesforce zeigen, was passieren kann:

- **Ein gefälschtes Paket.** The Hacker News [berichtete im September 2025](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html), dass das npm-Paket `postmark-mcp` den Namen der offiziellen Postmark-Bibliothek kopierte. Laut Koi Security, die es entdeckt hat, schickte Version 1.0.16 von jeder E-Mail still eine Blindkopie an den Server des Autors. Bis zur Löschung kam es auf 1.643 Downloads.
- **Eine Lücke in einer Brücke.** Das Paket `mcp-remote`, das lokale Clients mit entfernten Servern verbindet, hatte eine Schwachstelle mit CVSS 9,6, gefunden von JFrog und [von The Hacker News gemeldet](https://thehackernews.com/2025/07/critical-mcp-remote-vulnerability.html). Ein bösartiger Server konnte Befehle auf dem Rechner des Entwicklers ausführen. Betroffen waren die Versionen 0.0.5 bis 0.1.15, das Paket hatte mehr als 437.000 Downloads, Version 0.1.16 behob die Lücke.

Einen veröffentlichten Vorfall mit einem Salesforce-Community-Server habe ich nicht gefunden. Das Risiko bleibt dasselbe, denn ein Entwickler-Laptop mit Salesforce-Login ist genau das, was ein solches Paket erreicht.

Leiser ist das Risiko in den Werkzeugbeschreibungen. Simon Willison beschreibt unter Berufung auf Invariant Labs das [Tool Poisoning](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/): "malicious instructions are tucked away in the tool descriptions themselves". Er zitiert außerdem Elena Cross: "MCP tools can mutate their own definitions after installation." Ein Server, den Sie im März geprüft haben, kann sich nach einem Update im Mai anders verhalten.

## Was gehört vor die Freigabe?

Ich würde vom Partner oder Entwickler schriftliche Antworten auf sechs Fragen verlangen, bevor jemand den Server installiert.

| Prüfpunkt | Frage | Warnsignal |
|---|---|---|
| Identität | Unter welchem Salesforce-Benutzer handelt der Server? | Ein geteilter Integrationsbenutzer für viele Personen oder ein Admin |
| Zugangsdaten | Wie meldet er sich an, wo liegt das Geheimnis? | Benutzername, Passwort und Security Token in einer `.env`-Datei |
| Maintainer und Version | Wer pflegt ihn, welche Version genau ist installiert? | Ein einzelner Maintainer, keine Security Policy, `@latest` |
| Werkzeuge | Welche Werkzeuge bietet er, welche schreiben oder löschen? | Freies SOQL, Apex-Ausführung, Löschwerkzeuge |
| Kombination | Was läuft sonst im selben Client? | Webzugriff oder E-Mail-Werkzeuge neben CRM-Daten |
| Ziel-Org | Sandbox oder Produktion, mit welchen Daten? | Produktionslogin auf einem Entwickler-Laptop |

**Identität.** Hosted MCP führt jeden Aufruf unter dem Named User aus, im Audit Trail steht also eine Person. Ein Server oder Gateway, das sich einmal mit einem technischen Benutzer anmeldet, dreht das um: Im Log steht dann "Integrationsbenutzer hat 4.000 Fälle gelesen", und niemand kann sagen, in wessen Auftrag.

**Zugangsdaten.** Ein Server, der sich mit Benutzername, Passwort und Security Token anmeldet, hat zwei Probleme. Das Geheimnis liegt auf einem Laptop, und laut [Salesforce Time](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) setzt Salesforce das Ende des OAuth Username-Password Flow am 20. Februar 2027 durch. Mehr zu dieser Frist steht in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/). Ein Gateway, das Refresh Tokens für Ihre Org speichert, ist ein Dritter mit langlebigem Zugriff. Das war das Muster hinter dem Salesloft-Drift-Vorfall, beschrieben in [Connected Apps und OAuth: Lehren für KI-Integrationen](../connected-apps-oauth-ki-integrationen/).

**Maintainer und Version.** Pinnen Sie eine exakte Version und prüfen Sie die Änderungen vor jedem Update. Der Postmark-Fall zeigt den Grund: Der Schadcode kam mit einer bestimmten Version. In Claude Code muss ein Allowlist-Eintrag für einen lokalen Server [exakt mit Befehl und Argumenten übereinstimmen](https://code.claude.com/docs/en/managed-mcp). Ein Eintrag mit `pkg@1.4.2` sperrt also jede andere Version. So lese ich die Abgleichregel, und damit wird das Pinnen durchsetzbar.

**Werkzeuge.** Lassen Sie sich die vollständige Werkzeugliste mit Beschreibungen geben. Ein Server mit einem Lesewerkzeug für offene Fälle ist eine andere Entscheidung als einer, der beliebiges SOQL oder anonymes Apex ausführt.

**Kombination.** Willisons [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) besteht aus privaten Daten, nicht vertrauenswürdigen Inhalten und einem Weg, Daten nach außen zu senden. Er schreibt, MCP "encourages users to mix and match tools from different sources". Bei einem Maschinenbauer sind Fallbeschreibungen aus dem Händlerportal oder aus Garantieformularen solche fremden Inhalte, siehe [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

**Ziel-Org.** Coding-Agenten arbeiten in Sandboxes. Änderungen an der Produktion laufen über die Pipeline, und das gehört in den Vertrag, siehe [Partner mit KI-Coding: Regeln für den Vertrag](../partner-ki-coding-regeln-vertrag/). Ein Detail noch: Claude Code verlangt eine Vertrauensbestätigung, wenn ein neuer MCP-Server auftaucht. Laut Sicherheitsseite entfällt sie bei nicht interaktiven Läufen mit `-p`, ein Server in einem CI-Job bekommt also keine Rückfrage.

## Wann ist Salesforce Hosted MCP der sicherere Weg?

Salesforce Hosted MCP Server sind [seit 29. April 2026 allgemein verfügbar](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), für jede Org ab Enterprise Edition. Für eine Person, die interaktiv mit Claude, ChatGPT oder Cursor arbeitet, beantworten sie die meisten Zeilen der Tabelle: kein Fremdcode auf dem Laptop, jeder Aufruf unter dem Named User, OAuth mit PKCE, Server aus, bis ein Admin sie einschaltet, MCP-Zugriffe in den API-Logs filterbar und ein `mcp_api`-Scope, der laut Salesforce Zugriff auf MCP gibt, "but not our existing REST APIs". Wer welche Daten lesen darf, steht in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

Hosted MCP hat Grenzen, und genau sie treiben Teams zu Community-Servern:

- **Kein Maschine-zu-Maschine-Zugriff.** Die Sicherheitsempfehlungen sagen: "There are no service accounts, no machine-to-machine flows". Ein nächtlicher Agent kann Hosted MCP nicht nutzen.
- **Edition und Kosten.** Laut [Übersicht](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) sind die Server "intended only for customers with Flex Credits and you may be billed for server usage". Warum daraus eine Budgetposition wird, steht in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

Keine der beiden Grenzen macht einen Community-Server zur Lösung. Ein nächtlicher Job ist eine Integration mit eigenem Benutzer und Client Credentials oder JWT Flow. Ist Agentforce der Client, beschreibt [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce), wie Sie Server von Drittanbietern in der Agentforce Registry registrieren, Werkzeuge auswählen und Aufrufe über das Agentforce Gateway begrenzen. Das regelt die Seite des Agenten. Der Server dahinter braucht trotzdem die sechs Prüfpunkte.

## Ein typisches Szenario: drei Anfragen aus dem Partnerteam

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Händlerportal und SAP, Enterprise Edition mit Flex Credits, und einen Implementierungspartner mit sechs Entwicklern. Alle Zahlen sind Annahmen.

**Anfrage 1.** Ein Entwickler möchte einen Community-Salesforce-Server von npm in Claude Code nutzen, angemeldet mit dem Passwort des Integrationsbenutzers, um doppelte Anlagen (Assets) in der Full-Copy-Sandbox zu analysieren. Entscheidung: nein zum Passwort und zum geteilten Benutzer. Er bekommt `sobject-reads` über Hosted MCP in dieser Sandbox, unter seinem eigenen Sandbox-Benutzer.

**Anfrage 2.** Der Serviceinnendienst möchte ein kommerzielles Gateway, das ChatGPT über eine OAuth-App mit Salesforce und SAP verbindet. Entscheidung: zurückgestellt. Das Gateway würde Refresh Tokens für die Org halten, und alle 25 Benutzer erschienen als ein technischer Benutzer. Der Salesforce-Teil läuft über Hosted MCP, der SAP-Teil wartet auf die Vertragsprüfung des Gateway-Anbieters.

**Anfrage 3.** Der Partner schlägt einen Community-Server für einen nächtlichen Agenten vor, der Händlerbestände mit SAP abgleicht. Entscheidung: kein MCP. Das ist eine Integration mit Run-as-Benutzer und Client Credentials, gebaut wie der Auftragsstatus in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/).

Alle drei Anliegen werden erfüllt, und kein Community-Server erreicht die Org.

## Wo sollten Sie anfangen?

1. **Bestandsaufnahme.** Fragen Sie jeden Partner, welche MCP-Server in seinen Clients für Ihre Orgs eingerichtet sind, mit Versionen. Das Ende des DX MCP Servers ist ein guter Anlass, siehe [das Ende des Salesforce DX MCP Servers](../salesforce-dx-mcp-server-ende/).
2. **Die Regel aufschreiben.** Standard sind gehostete oder von Salesforce betriebene Server; Community-Server nur nach den sechs Prüfpunkten, in Sandboxes und mit gepinnter Version.
3. **Durchsetzen, wo es geht.** Lizenzieren Sie Claude Code zentral, sperren [Managed Settings](https://code.claude.com/docs/en/managed-mcp) mit `allowedMcpServers` und `allowManagedMcpServersOnly` jeden Server, der nicht auf Ihrer Liste steht.
4. **Bei jedem Update neu prüfen.** Eine neue Version ist eine neue Freigabe.

Partner bei solchen Werkzeugen zu steuern gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/), die Übersicht der Schnittstellen steht in [Kapitel 3 der Masterclass](../../masterclass-ki/mcp-und-schnittstellen/).

Einen Community-MCP-Server gebe ich erst frei, wenn sich sein Benutzer, sein Geheimnis, sein Maintainer und seine Version benennen lassen. Wenn Sie eine zweite Meinung zu einer Anfrage Ihres Partners möchten, [schreiben Sie mir](#contact).
