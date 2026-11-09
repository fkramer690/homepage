---
title: "Salesforce DX MCP Server: Ende am 2. November 2026"
metaTitle: "Salesforce DX MCP Server eingestellt: was ihn ersetzt"
description: "Salesforce unterstützt den lokalen DX MCP Server seit 2. November 2026 nicht mehr. Was noch läuft, warum @latest raus muss und wie Partner auf Skills wechseln."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: salesforce-dx-mcp-server-ende
translationKey: salesforce-dx-mcp-server-end-of-life
topic: devops
categories: [devops, ai]
tags: [MCP, Salesforce DX, Claude Code, Agentforce Vibes, Partnersteuerung, DevOps]
takeaways:
  - "Seit dem 2. November 2026 wird der Server nicht mehr gepflegt, beide Repositories sind archiviert. Version 0.30.15 bleibt installierbar."
  - "Die Salesforce-Anleitung nutzt @latest. Entfernen Sie den Server oder pinnen Sie 0.30.15 nur befristet, mit festem Datum für die Entfernung."
  - "Mit ALLOW_ALL_ORGS erreicht ein KI-Agent jede angemeldete Org, auch die Produktion. Mit DEFAULT_TARGET_ORG die Org, die gerade Standard ist."
  - "Salesforce verweist auf Skills (sf-skills). Das Claude-Code-Plugin bündelt sie, Hosted MCP deckt Daten und Aktionen ab, ist aber kein direkter Ersatz."
  - "Die Metadata-API-Kontext-Tools des Plugins sind ein Beta-Service, den ein Admin aktivieren muss, und ihre Aufrufe zählen auf das API-Kontingent."
faq:
  - q: "Was ist am 2. November 2026 mit dem Salesforce DX MCP Server passiert?"
    a: "Der lokale Server @salesforce/mcp hat sein End of Life erreicht. Laut GitHub-Issue 46 wird er nicht mehr gepflegt oder unterstützt, neue Versionen kommen nicht, und beide Repositories sind archiviert. npm markiert das Paket als deprecated; die letzte Version ist 0.30.15 vom Juli."
  - q: "Funktionieren bestehende DX-MCP-Konfigurationen seit dem 2. November nicht mehr?"
    a: "Vorerst ja. Laut Salesforce bleibt das Paket installierbar, bestehende und gepinnte Einrichtungen mit 0.30.15 funktionieren also weiter. Korrekturen kommen aber keine mehr, auch keine Sicherheitskorrekturen. Die weitere Nutzung sollte deshalb eine befristete Ausnahme mit Datum für die Entfernung sein."
  - q: "Was ersetzt den Salesforce DX MCP Server offiziell?"
    a: "Die End-of-Life-Mitteilung von Salesforce sagt, dass Salesforce-Werkzeuge jetzt als Skills ausgeliefert werden, und verweist auf die Bibliothek sf-skills. Das Claude-Code-Plugin für Salesforce-Entwicklung bündelt Skills und weitere Werkzeuge. Hosted MCP Server decken Datenzugriff und Aktionen aus externen KI-Clients ab, ersetzen aber keine lokalen Deploy- und Testwerkzeuge."
  - q: "Betrifft das Ende auch Agentforce Vibes?"
    a: "Laut Vibes-Dokumentation wird der DX MCP Server mit Agentforce Vibes ausgeliefert und ist in Code Builder standardmäßig aktiv; das End of Life erwähnte sie beim Lesen nicht. Fragen Sie Partner und Salesforce-Ansprechpartner, womit Vibes seit dem 2. November arbeitet."
draft: false
---

Salesforce pflegt und unterstützt den lokalen Salesforce DX MCP Server seit dem 2. November 2026 nicht mehr. Version 0.30.15 bleibt installierbar, aber neue Versionen kommen nicht, beide Repositories sind archiviert, und Salesforce verweist auf Skills. Setzen Ihre Implementierungspartner Claude Code, Cursor, Copilot oder Agentforce Vibes auf Ihren Orgs ein, nutzen einige ihn wahrscheinlich noch. Lassen Sie jede Konfiguration auflisten, die Einstellung entfernen, die immer die neueste Version lädt, und die Arbeit auf Salesforce CLI mit Skills umstellen. Wichtiger als das Werkzeug ist für Sie, mit welchem Org-Zugriff es läuft.

## Was genau ist am 2. November 2026 zu Ende gegangen?

Das README des Issue-Repositorys [forcedotcom/mcp](https://raw.githubusercontent.com/forcedotcom/mcp/main/README.md) und des Quell-Repositorys [salesforcecli/mcp](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) trägt dasselbe Banner: „End of Life: November 2nd, 2026“. Für Details verweist es auf [GitHub-Issue 46](https://github.com/forcedotcom/mcp/issues/46): Nach dem Stichtag wird der Server nicht mehr gepflegt oder unterstützt, und es kommen keine weiteren Versionen. Beide Repositories sind schreibgeschützt archiviert, das Paket bleibt installierbar, bestehende und gepinnte Einrichtungen mit 0.30.15 laufen also weiter. Für die Zukunft sagt das Issue, dass Salesforce-Werkzeuge jetzt als Skills ausgeliefert werden, und verweist auf sf-skills.

Am 2. November 2026 hat die npm-Registry das Paket als deprecated markiert, mit dem Hinweis „The Salesforce DX MCP Server has been deprecated“ und einem Link auf Issue 46. Eine neue Version kam nicht: 0.30.15 vom 9. Juli 2026 ist die letzte (geprüft am 9. November 2026).

Was ich vorher, am 27. Oktober 2026, prüfen konnte:

- Die [npm-Registry](https://registry.npmjs.org/@salesforce/mcp) führt 0.30.15 vom 9. Juli 2026 als aktuelle Version. Keine Version trägt bisher einen Deprecated-Hinweis. Seit April 2025 hat Salesforce 121 Versionen einschließlich Vorabversionen veröffentlicht, im Schnitt etwa alle vier Tage eine.
- Der Salesforce DX Developer Guide beschreibt den Server weiterhin [ohne Hinweis auf das Ende](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp_server.htm). Er konfiguriert das Paket so, dass es immer die neueste Version lädt, „so you always get the latest version“, und neue Versionen werden automatisch installiert.
- Laut [Dokumentation von Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html) wird der DX MCP Server mit Vibes ausgeliefert und ist in Code Builder „installed and enabled by default“.

Vor dem Stichtag stützte sich das Ende allein auf das README-Banner: Keine der drei Dokumentationsseiten oben erwähnte es. Genau diese Kombination ist das Risiko. Ein Server, der sich selbst aktualisiert und auf Rechnern konfiguriert ist, die Sie nicht verwalten, hat seinen Support verloren, während die Anleitungen ihn weiter beschreiben. Neue Versionen kommen nicht mehr, aber auch keine Korrekturen, und ein Eintrag mit @latest verdeckt, dass niemand entschieden hat, welche Version läuft.

Zum Vergleich die [Richtlinie für Hosted MCP Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/end-of-life.html): Jede Version wird mindestens drei Jahre unterstützt, und das Ende wird mindestens ein Jahr vorher angekündigt. Für den lokalen Server habe ich keine vergleichbare Zusage gefunden.

```zeitleiste
2025-04 | Erste Versionen des DX MCP Servers auf npm
2026-04-29 | Hosted MCP Server allgemein verfügbar
2026-07-09 | Version 0.30.15, die bisher letzte
2026-08-19 | Ankündigung des Claude-Code-Plugins
2026-11-02 | End of Life des lokalen DX MCP Servers laut README
```

## Ein Entwicklerwerkzeug mit Org-Zugriff ist Sache der IT-Leitung

MCP (Model Context Protocol) ist der offene Standard, über den ein KI-Werkzeug Funktionen in einem anderen System aufruft. Der DX MCP Server gibt einem Coding-Agenten mehr als 60 solcher Funktionen für Ihre Salesforce-Orgs. Er läuft auf dem Rechner des Entwicklers und nutzt die Orgs, an denen dieser per Salesforce CLI angemeldet ist. Welche Orgs der Agent anfassen darf, legt beim Start eine einzige Einstellung fest. Das [README](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) nennt die Werte:

- **Alle Orgs erlauben** öffnet jede auf dem Rechner angemeldete Org; Salesforce schreibt dazu „Use this value with caution.“
- **Standard-Org** wird bei jedem Tool-Aufruf neu aufgelöst. Wechselt der Entwickler seine Standard-Org, arbeitet der Agent ohne Warnung in der neuen.
- **Explizite Benutzernamen oder Aliase** binden den Server an benannte Orgs. Nur diese Einstellung akzeptiere ich für Agenten, am besten mit Benutzernamen, weil sich ein Alias auf eine andere Org umbiegen lässt.

Die Werkzeuge hinter dieser Einstellung sind nicht harmlos. Eines deployt in eine Org, eines weist Permission Sets zu, auch für andere Benutzer, eines liest Daten. Telemetrie ist standardmäßig eingeschaltet. Ein Partnerentwickler, der am Montag Ihre Produktion betreut und am Dienstag in einer Sandbox baut, hat womöglich beide Orgs auf demselben Laptop.

Bei einem Hersteller liegen in der Produktions-Org Händlerkonditionen, Garantieanträge, installierte Basis und Wartungsverträge. Einem Integrationsbenutzer würden Sie keine weiten Rechte ohne Prüfung geben. Ein KI-Agent mit der Anmeldung eines Entwicklers verdient dieselbe Prüfung, und das End of Life ist ein guter Anlass dafür. Wie MCP insgesamt in Ihre Architektur passt, beschreibe ich in [MCP und Salesforce, erklärt für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).

## Was ersetzt den Salesforce DX MCP Server?

Die End-of-Life-Mitteilung von Salesforce nennt eine Richtung: Skills. Darum herum hat Salesforce 2026 drei Bausteine veröffentlicht. Die [Plugin-Ankündigung](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) vom 19. August 2026 erwähnt den DX MCP Server nicht, und Hosted MCP ist kein direkter Ersatz für lokale Deploy- und Testwerkzeuge. Die Zuordnung der bisherigen Aufgaben ist meine Lesart:

```tabelle
titel: Was welche Aufgabe übernimmt (meine Lesart)
spalten: Aufgabe | Mit dem lokalen DX MCP Server | Option heute
Deployen, abrufen, Tests ausführen | MCP-Tools auf dem Laptop | Salesforce CLI plus Skills aus sf-skills *
Metadatenwissen, Unterstützung für Apex und SOQL | MCP-Tools auf dem Laptop | Claude-Code-Plugin für Salesforce-Entwicklung *
Datensätze als Kontext lesen | Abfrage-Tool auf dem Laptop | Hosted MCP Server zum Lesen von Datensätzen *
```

**sf-skills** ist eine offene Bibliothek mit mehr als 100 Skills. Das [sf-skills-README](https://raw.githubusercontent.com/forcedotcom/sf-skills/main/README.md) zeigt eine Installation in einer Zeile für Codex, Cursor und Claude Code, in Agentforce Vibes werden die Skills automatisch installiert und aktualisiert. Das README warnt, Skills „may be renamed, restructured, or removed between releases“, und sie haben nicht die Stabilitätszusagen von GA-APIs. Ich würde sie deshalb behandeln wie jede andere Abhängigkeit: Version festhalten, Änderungen prüfen.

**Das Claude-Code-Plugin** bündelt rund 40 dieser Skills und drei MCP-Server: einen für API-Kontext, einen für Metadatenwissen und einen für die Sprachunterstützung im Editor. Die ersten beiden laufen auf Salesforce-Infrastruktur. Laut [Metadata API Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_salesforce_api_mcp_intro.htm) sind die Metadata-API-Kontext-Tools auf dem API-Context-Server ein Beta-Service unter den Beta Services Terms, setzen eingerichtetes Hosted MCP in der Org voraus, und ihre Aufrufe zählen auf Ihr API-Kontingent. Ihr Admin muss das einschalten. Rechtsabteilung und IT sollten also wissen, dass sie dabei einen Beta-Service freigeben.

**Hosted MCP Server** sind seit dem [29. April 2026 GA](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), für Enterprise Edition und höher. Laut [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) sind sie standardmäßig aus, jeder Aufruf läuft mit den Rechten des Benutzers, der die Verbindung autorisiert hat, und Service Accounts gibt es nicht. Wer darüber welche Daten lesen darf, steht in [Hosted MCP Server: wer darf welche Daten lesen](../salesforce-hosted-mcp-server-datenzugriff/), warum die Aufrufe zum Kostenposten werden, in [MCP-Zugriffe auf Salesforce als Budgetrisiko](../flex-credits-agentforce-kosten-pro-aktion/).

## Rechenbeispiel: drei Partner, ein Stichtag

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst und SAP S/4. Drei Partner arbeiten auf denselben Orgs: einer für Service und Außendienst, einer für die SAP-Schnittstelle, eine Agentur für das Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Die IT-Leitung bittet jeden Partner um eine schriftliche Antwort auf eine Frage: Wo ist der DX MCP Server eingetragen? Die Antworten ergeben 14 Entwickler, neun davon mit dem Server in einer Konfigurationsdatei. Zwei starten ihn mit Zugriff auf alle Orgs des Rechners. Einer dieser beiden hat auch die Produktions-Org auf seinem Laptop angemeldet, weil er Hotfixes betreut. Der Servicepartner hat eine gemeinsame Konfigurationsdatei ins Repository des Kunden eingecheckt, die immer die neueste Version lädt, jeder neue Entwickler bekommt sie also automatisch. Die Portalagentur arbeitet mit Agentforce Vibes und hatte ihre MCP-Einstellungen nie angesehen.

Fahrlässig ist davon nichts. So sieht es aus, wenn sich ein Werkzeug in Partnerteams verbreitet und niemand auf Kundenseite dafür zuständig ist. Die Korrekturen sind kurz: Die gemeinsame Datei wird auf 0.30.15 gepinnt und bekommt feste Sandbox-Aliase, der Hotfix-Entwickler trennt seine Produktionsanmeldung von der Agentenarbeit, die Agentur prüft, was Vibes einschaltet. Danach testet der Servicepartner Plugin und Skills zwei Wochen in einer Entwicklungs-Sandbox, der Admin des Kunden aktiviert die Hosted Server dort und nur dort, und der alte Eintrag verschwindet aus dem Repository.

Am längsten dürfte die Frage dauern, wer Hosted Server in der Produktion freigibt. Ich würde die Produktion außen vor lassen, bis es einen konkreten Bedarf gibt.

## Was sollten Sie Ihre Partner jetzt fragen?

1. **Inventur.** Lassen Sie sich von jedem Partner auflisten, auf welchen Rechnern, in welchen Repositories und in welchen Werkzeugen der DX MCP Server läuft. Jedes Werkzeug hält die Einstellung in einer eigenen Datei; wo Sie suchen, steht im Kasten unten.
2. **Entfernen oder pinnen.** Stoppen Sie neue Installationen und entfernen Sie jeden Eintrag, der die neueste Version lädt. Wo der Server nicht sofort raus kann, pinnen Sie die feste Version 0.30.15 als befristete Ausnahme für benannte Sandboxes, mit Verantwortlichem und Datum für die Entfernung. Eine gepinnte Version hält die Übergangszeit stabil, Korrekturen bekommt sie aber nicht.
3. **Orgs festlegen.** Nur benannte Sandboxes, kein Zugriff auf alle Orgs, keine Produktion. Deployments in die Produktion laufen über die Pipeline, wie in [Partner coden mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/) beschrieben.
4. **Hosted Server bewusst aktivieren.** Zuerst in einer Sandbox, der lesende Server vor allem, was schreibt, mit einer External Client App, die auf ein Permission Set beschränkt ist.
5. **Repository anpassen.** Die gemeinsame MCP-Konfiguration und die [KI-Regeldatei](../ki-regeldatei-salesforce-repository/) gehören in Ihr Repository und ändern sich nur über einen geprüften Pull Request, wie jeder andere Code. Claude Code unterstützt außerdem eine zentral verwaltete MCP-Konfiguration mit Allowlists, wenn Sie es selbst lizenzieren.

```vertiefung Für Entwickler
titel: Wo der DX MCP Server eingetragen ist und wie Sie ihn pinnen
- **Paket:** `@salesforce/mcp`; `@salesforce/mcp@0.30.15` eintragen statt `@salesforce/mcp` oder `@salesforce/mcp@latest`.
- **Org-Zugriff:** Startparameter `--orgs` mit festen Aliasen, nie `ALLOW_ALL_ORGS` oder `DEFAULT_TARGET_ORG` für Agenten.
- **Claude Code:** `claude mcp list`; [projektweite Server](https://code.claude.com/docs/en/mcp) in der `.mcp.json` im Repository, lokale und benutzerweite in `~/.claude.json`.
- **Andere Werkzeuge:** VS Code nutzt `.vscode/mcp.json`, Cursor und Cline eigene Dateien.
- **Ersatz:** `npx skills add forcedotcom/sf-skills`, das Plugin `salesforce-development` mit den Servern `salesforce-api-context`, `salesforce-metadata-experts` und `salesforce-lsp`, der Hosted Server `sobject-reads`.
```

Das ist normales Abhängigkeits- und Zugriffsmanagement, angewendet auf KI-Werkzeuge, und es gehört auf Kundenseite zu [DevOps und Release-Management](../../leistungen/devops-und-release-management/). Die übrigen Schnittstellen beschreibt [Kapitel 3 der Masterclass](../../masterclass/ki-salesforce/mcp-und-schnittstellen/).
