---
title: "Community-MCP-Server für Salesforce: was prüfen?"
description: "Ein Partner will einen Community- oder Gateway-MCP-Server für Salesforce. Was Sie vor der Freigabe prüfen und wann Salesforce Hosted MCP sicherer ist."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: community-mcp-server-salesforce-risiken
translationKey: community-mcp-servers-risks
topic: security
categories: [devops, ai]
contactBrief: partner-governance
tags: [MCP, Community-MCP-Server, Sicherheit, Claude Code, Partnersteuerung, Maschinenbau]
takeaways:
  - "Vor der Freigabe prüfen Sie Identität, Zugangsdaten, Maintainer und gepinnte Version, Werkzeugliste, andere Werkzeuge im Client und Ziel-Org."
  - "Ein gefälschtes postmark-mcp-Paket schickte ab Version 1.0.16 versteckte Blindkopien an eine fremde Adresse; mcp-remote hatte eine Lücke mit CVSS 9,6."
  - "Für eine Person mit Claude, ChatGPT oder Cursor ist Salesforce Hosted MCP sicherer, wenn App-Zugriff und Werkzeuge beschränkt sind: Named User, PKCE."
  - "Nächtliche Jobs und Maschine-zu-Maschine-Zugriffe gehören in eine klassische Integration, nicht in einen Community-Server mit Passwort."
faq:
  - q: "Sind Community-MCP-Server für Salesforce unsicher?"
    a: "Nicht grundsätzlich, aber niemand unterzieht sie für Sie einem Security-Audit. Anthropic prüft Connectoren für sein Verzeichnis gegen Aufnahmekriterien, schreibt aber, dass es keinen MCP-Server einem Security-Audit unterzieht oder verwaltet, und der Sicherheitsleitfaden von Salesforce für Hosted MCP ist keine Zertifizierung fremder Server. Identität, Zugangsdaten, Maintainer, Version und Werkzeuge prüft deshalb der Kunde vor der Freigabe."
  - q: "Was ist Tool Poisoning bei MCP?"
    a: "Tool Poisoning bedeutet bösartige Anweisungen in der Beschreibung eines Werkzeugs, die an das Modell gehen und, je nach Client, dem Benutzer kaum angezeigt werden. Verwandt ist ein Werkzeug, das seine Beschreibung nach der Installation ändert, sodass sich ein freigegebener Server nach einem Update anders verhält."
  - q: "Wann ist Salesforce Hosted MCP die bessere Wahl?"
    a: "Wenn eine Person interaktiv mit einem KI-Client auf einer Org ab Enterprise Edition arbeitet. Jeder Aufruf läuft unter diesem Named User, die Anmeldung nutzt OAuth mit PKCE, und die Server bleiben aus, bis ein Admin sie aktiviert. Beschränken Sie die External Client App auf vorab autorisierte Benutzer und schalten Sie nur die nötigen Werkzeuge frei. Laut Salesforce sind sie für Kunden mit Flex Credits gedacht, die Nutzung kann abgerechnet werden."
  - q: "Darf ein Community-MCP-Server Benutzername und Passwort nutzen?"
    a: "Technisch geht das, ich würde es ablehnen. Salesforce beendet den OAuth Username-Password Flow am 20. Februar 2027 und davon getrennt das SOAP-API-login() mit Benutzername, Passwort und Security Token mit Summer '27. Unabhängig von der Frist ist ein Passwort in einer Konfigurationsdatei auf einem Laptop ist die schwächste Form von Zugangsdaten."
  - q: "Wie sperren wir nicht freigegebene MCP-Server in Claude Code?"
    a: "Claude Code unterstützt Managed Settings mit allowedMcpServers und allowManagedMcpServersOnly oder eine Datei managed-mcp.json mit festem Server-Set. Lokale Server auf der Allowlist müssen exakt mit Befehl und Argumenten übereinstimmen."
draft: false
---

Ein Community-MCP-Server für Salesforce ist Fremdcode oder ein fremder Dienst mit Zugriff auf Ihre Salesforce-Org. Ich würde ihn deshalb wie eine Schnittstelle freigeben, nicht wie ein Browser-Plugin. Bevor Sie zustimmen, klären Sie, unter wessen Identität er arbeitet, wo seine Zugangsdaten liegen, wer ihn pflegt und ob die Version gepinnt ist, welche Werkzeuge er anbietet, was sonst im selben KI-Client läuft und welche Org er erreicht. Arbeitet eine Person mit Claude, ChatGPT oder Cursor auf einer Enterprise Edition, ist Salesforce Hosted MCP der sicherere Weg, sofern App-Zugriff und Werkzeuge beschränkt sind. Nächtliche Jobs gehören in eine klassische Integration.

## Warum ist ein Community-MCP-Server ein eigenes Risiko?

Über MCP (Model Context Protocol) ruft ein KI-Client Werkzeuge in anderen Systemen auf; die Grundlagen stehen in [MCP für die IT-Leitung erklärt](../mcp-salesforce-erklaert-it-leitung/). Ein Community-Server ist einer, den weder Salesforce noch Ihr KI-Anbieter betreibt. Das Betriebsmodell ändert das Risiko:

| Typ | Hauptrisiko |
|---|---|
| Lokaler npm- oder GitHub-Server auf dem Laptop | Code läuft mit den Rechten des Entwicklers, lokale Geheimnisse, Lieferkette |
| Selbst betriebener Remote-Server | Eigener Betrieb, Patchen, Netz- und Identitätskontrollen |
| Kommerzielles SaaS-Gateway | Verwahrung der Tokens, Datenabfluss, Mandantentrennung, Unterauftragnehmer |
| Salesforce Hosted MCP | Ihre Konfiguration: App-Richtlinie, freigeschaltete Werkzeuge, Benutzerrechte |

Einem Security-Audit unterzieht diese Server niemand für Sie. Anthropic schreibt auf der [Sicherheitsseite von Claude Code](https://code.claude.com/docs/en/security), dass es Connectoren vor der Aufnahme in sein Verzeichnis gegen Aufnahmekriterien prüft, aber "does not security-audit or manage any MCP server", und empfiehlt, eigene Server zu schreiben oder Server von Anbietern zu nutzen, denen man vertraut. Die [Hosted MCP Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) von Salesforce gelten für die eigenen gehosteten Server; eine Zertifizierung fremder Server sind sie nicht.

Zwei Vorfälle außerhalb von Salesforce zeigen, was passieren kann:

- **Ein gefälschtes Paket.** The Hacker News [berichtete im September 2025](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html), dass sich das npm-Paket `postmark-mcp` als legitime Postmark-Integration ausgab. Laut Koi Security, die es entdeckt hat, fügte Version 1.0.16 ausgehenden E-Mails eine versteckte Blindkopie an eine externe, vom Angreifer kontrollierte Adresse hinzu. Bis zur Löschung kam es auf 1.643 Downloads.
- **Eine Lücke in einer Brücke.** Das Paket `mcp-remote`, das lokale Clients mit entfernten Servern verbindet, hatte eine Schwachstelle mit CVSS 9,6, gefunden von JFrog und [von The Hacker News gemeldet](https://thehackernews.com/2025/07/critical-mcp-remote-vulnerability.html). Ein bösartiger Server konnte Befehle auf dem Rechner des Entwicklers ausführen. Betroffen waren die Versionen 0.0.5 bis 0.1.15, das Paket hatte bei Bekanntwerden im Juli 2025 mehr als 437.000 Downloads, Version 0.1.16 behob diese Lücke.

Einen veröffentlichten Vorfall mit einem Salesforce-Community-Server habe ich nicht gefunden. Die Vorfälle zeigen aber Risikoklassen, die auch Salesforce betreffen, denn ein Entwickler-Laptop mit Salesforce-Login ist genau das, was ein solches Paket erreicht.

Leiser ist das Risiko in den Werkzeugbeschreibungen. Simon Willison beschreibt unter Berufung auf Invariant Labs das [Tool Poisoning](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/): "malicious instructions are tucked away in the tool descriptions themselves". Willison zitiert außerdem Elena Cross: "MCP tools can mutate their own definitions after installation." Ein Server, den Sie im März geprüft haben, kann sich nach einem Update im Mai anders verhalten.

## Vor der Freigabe stehen sechs schriftliche Antworten

Ich würde vom Partner oder Entwickler schriftliche Antworten auf sechs Fragen verlangen, bevor jemand den Server installiert.

| Prüfpunkt | Frage | Warnsignal |
|---|---|---|
| Identität | Unter welchem Salesforce-Benutzer läuft jeder Aufruf, je Zielsystem? | Ein geteilter Integrationsbenutzer für viele Personen oder ein Admin |
| Zugangsdaten | Wie meldet er sich an, wo liegt das Geheimnis? | Benutzername, Passwort und Security Token in einer `.env`-Datei |
| Maintainer und Version | Wer pflegt ihn, welche Version genau ist installiert? | Ein einzelner Maintainer, keine Security Policy, `@latest` |
| Werkzeuge | Welche Werkzeuge bietet er, welche schreiben oder löschen? | Freies SOQL, Apex-Ausführung, Löschwerkzeuge |
| Kombination | Was läuft sonst im selben Client? | Webzugriff oder E-Mail-Werkzeuge neben CRM-Daten |
| Ziel-Org | Sandbox oder Produktion, mit welchen Daten? | Produktionslogin auf einem Entwickler-Laptop |

**Identität.** Hosted MCP führt jeden Aufruf unter dem Named User aus, im Audit Trail steht also eine Person. Ein Server oder Gateway, das sich einmal mit einem technischen Benutzer anmeldet statt per OAuth je Benutzer, dreht das um: Im Log steht dann "Integrationsbenutzer hat 4.000 Fälle gelesen", und niemand kann sagen, in wessen Auftrag.

**Zugangsdaten.** Ein Server, der sich mit Benutzername, Passwort und Security Token anmeldet, hat zwei Probleme. Das Geheimnis liegt auf einem Laptop, und laut [Salesforce Time](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) setzt Salesforce das Ende des OAuth Username-Password Flow am 20. Februar 2027 durch, und das SOAP-API-login(), das viele Bibliotheken für Benutzername, Passwort und Token nutzen, endet davon getrennt mit Summer '27. Mehr zu diesen Fristen steht in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/). Ein Gateway, das Refresh Tokens für Ihre Org speichert, ist ein Dritter mit langlebigem Zugriff. Das war das Muster hinter dem Salesloft-Drift-Vorfall, beschrieben in [Connected Apps und OAuth: Lehren für KI-Integrationen](../connected-apps-oauth-ki-integrationen/).

**Maintainer und Version.** Pinnen Sie eine exakte Version und prüfen Sie die Änderungen vor jedem Update. Der Postmark-Fall zeigt den Grund: Der Schadcode kam mit einer bestimmten Version. Bei einem SaaS-Gateway können Sie die Serverversion meist nicht pinnen; fragen Sie stattdessen, ob der Anbieter Funktionen oder Werkzeugbeschreibungen ohne Ihre Freigabe ändern kann.

**Werkzeuge.** Lassen Sie sich die vollständige Werkzeugliste mit Beschreibungen geben. Ein Server mit einem Lesewerkzeug für offene Fälle ist eine andere Entscheidung als einer, der beliebiges SOQL oder anonymes Apex ausführt.

**Kombination.** Willisons [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) besteht aus privaten Daten, nicht vertrauenswürdigen Inhalten und einem Weg, Daten nach außen zu senden. Willison schreibt, MCP "encourages users to mix and match tools from different sources". Bei einem Maschinenbauer sind Fallbeschreibungen aus dem Händlerportal oder aus Garantieformularen solche fremden Inhalte, siehe [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Für ein kommerzielles Gateway reichen die sechs Fragen nicht. Ergänzen Sie die Prüfungen, die Sie jedem SaaS mit CRM-Daten stellen: welche Daten, Prompts und Werkzeugergebnisse welche Region verlassen, was wie lange gespeichert wird, welche Unterauftragnehmer und Modelle beteiligt sind, wie Tokens geschützt und widerrufen werden, wie Mandanten getrennt sind und welche Audit-Logs Sie einsehen können.

**Ziel-Org.** Coding-Agenten arbeiten in Sandboxes. Änderungen an der Produktion laufen über die Pipeline, und das gehört in den Vertrag, siehe [Partner mit KI-Coding: Regeln für den Vertrag](../partner-ki-coding-regeln-vertrag/).

```vertiefung Für Entwickler
titel: Wie hilft Claude Code beim Pinnen und bei neuen Servern?
In Claude Code muss ein Allowlist-Eintrag für einen lokalen Server [exakt mit Befehl und Argumenten übereinstimmen](https://code.claude.com/docs/en/managed-mcp). Ein Eintrag mit `pkg@1.4.2` sperrt also jede andere Versionsangabe. So lese ich die Abgleichregel. Sie erzwingt den konfigurierten Befehl, kein geprüftes Artefakt: Der `env`-Block wird nicht verglichen, Abhängigkeiten dieser Version können trotzdem kompromittiert sein, und für Remote-Server gilt sie nicht. Als Unternehmenskontrolle trägt sie nur aus Managed Settings.

Claude Code verlangt eine Vertrauensbestätigung, wenn ein neuer MCP-Server auftaucht. Laut Sicherheitsseite entfällt sie bei nicht interaktiven Läufen mit `-p`, ein Server in einem CI-Job bekommt also keine Rückfrage.
```

## Wann ist Salesforce Hosted MCP der sicherere Weg?

Salesforce Hosted MCP Server sind [seit 29. April 2026 allgemein verfügbar](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), für jede Org ab Enterprise Edition. Für eine Person, die interaktiv mit Claude, ChatGPT oder Cursor arbeitet, beantworten sie die meisten Zeilen der Tabelle: kein Fremdcode auf dem Laptop, jeder Aufruf unter dem Named User, OAuth mit PKCE, Server aus, bis ein Admin sie einschaltet, MCP-Zugriffe in den API-Logs filterbar und ein `mcp_api`-Scope, der laut Salesforce Zugriff auf MCP gibt, "but not our existing REST APIs". Das gilt, wenn die External Client App auf vorab autorisierte Benutzer oder Permission Sets beschränkt ist und nur die nötigen Server und Werkzeuge aktiv sind; Refresh-Token-Richtlinie, IP-Beschränkung und Widerruf gehören ebenfalls in die Freigabe. Wer welche Daten lesen darf, steht in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

Hosted MCP hat Grenzen, und genau sie treiben Teams zu Community-Servern:

- **Kein Maschine-zu-Maschine-Zugriff.** Die Sicherheitsempfehlungen sagen: "There are no service accounts, no machine-to-machine flows". Ein nächtlicher Agent kann Hosted MCP nicht nutzen.
- **Edition und Kosten.** Laut [Übersicht](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) sind die Server "intended only for customers with Flex Credits and you may be billed for server usage". Warum daraus eine Budgetposition wird, steht in [MCP-Zugriffe als Budgetrisiko](../flex-credits-agentforce-kosten-pro-aktion/).

Keine der beiden Grenzen macht einen Community-Server zur Lösung. Ein nächtlicher Job ist eine Integration mit eigenem Benutzer und Client Credentials oder JWT Flow. Ist Agentforce der Client, beschreibt [Trailhead](https://trailhead.salesforce.com/content/learn/modules/mcp-for-agentforce-quick-look/discover-mcp-for-agentforce), wie Sie Server von Drittanbietern in der Agentforce Registry registrieren, Werkzeuge auswählen und Aufrufe über das Agentforce Gateway begrenzen. Das regelt die Seite des Agenten. Der Server dahinter braucht trotzdem die sechs Prüfpunkte.

## Beispiel: drei Anfragen aus dem Partnerteam

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Händlerportal und SAP, Enterprise Edition mit Flex Credits, und einen Implementierungspartner mit sechs Entwicklern. Alle Zahlen sind Annahmen.

**Anfrage 1.** Eine Entwicklerin möchte einen Community-Salesforce-Server von npm in Claude Code nutzen, angemeldet mit dem Passwort des Integrationsbenutzers, um doppelte Anlagen (Assets) in der Full-Copy-Sandbox zu analysieren. Entscheidung: nein zum Passwort und zum geteilten Benutzer. Sie bekommt `sobject-reads` über Hosted MCP in dieser Sandbox, unter ihrem eigenen Sandbox-Benutzer.

**Anfrage 2.** Der Serviceinnendienst möchte ein kommerzielles Gateway, das ChatGPT mit Salesforce und SAP verbindet. Entscheidung: zurückgestellt. Das Gateway würde Refresh Tokens für die Org halten, und seine Doku zeigt nicht, ob jeder der 25 Benutzer ein eigenes Token bekommt oder alle Aufrufe als ein technischer Benutzer laufen. Der Anbieter muss OAuth-Client, Token-Inhaber, Run-As-Identität und Audit Trail je Zielsystem beschreiben. Der Salesforce-Teil läuft über Hosted MCP, der SAP-Teil wartet auf die Vertragsprüfung des Gateway-Anbieters.

**Anfrage 3.** Der Partner schlägt einen Community-Server für einen nächtlichen Agenten vor, der Händlerbestände mit SAP abgleicht. Entscheidung: kein MCP. Das ist eine Integration mit Run-as-Benutzer und Client Credentials, gebaut wie der Auftragsstatus in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/).

Jede Anfrage hat einen geregelten nächsten Schritt, und kein Community-Server erreicht die Org.

## Die MCP-Server bei allen Partnern erfassen

1. **Bestandsaufnahme.** Fragen Sie jeden Partner, welche MCP-Server in seinen Clients für Ihre Orgs eingerichtet sind, mit Versionen. Das Ende des DX MCP Servers ist ein guter Anlass, siehe [das Ende des Salesforce DX MCP Servers](../salesforce-dx-mcp-server-ende/).
2. **Die Regel aufschreiben.** Standard sind gehostete oder von Salesforce betriebene Server; Community-Server nur nach den sechs Prüfpunkten, in Sandboxes und mit gepinnter Version.
3. **Durchsetzen, wo es geht.** Lizenzieren Sie Claude Code zentral, sperren [Managed Settings](https://code.claude.com/docs/en/managed-mcp) mit `allowedMcpServers` und `allowManagedMcpServersOnly` jeden Server, der nicht auf Ihrer Liste steht.
4. **Bei jedem Update neu prüfen.** Eine neue Version ist eine neue Freigabe.

Für die Bestandsaufnahme reicht eine Tabelle mit Partner, Server, Version, Benutzer und Ziel-Org. Partner bei solchen Werkzeugen zu steuern gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/), die Übersicht der Schnittstellen steht in [Kapitel 3 der Masterclass](../../masterclass/ki-salesforce/mcp-und-schnittstellen/).
