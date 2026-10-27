---
title: "Salesforce DX MCP Server: Ende am 2. November 2026"
description: "Der lokale Salesforce DX MCP Server endet am 2. November 2026. Was IT-Leitungen jetzt von Partnern verlangen sollten, von der Inventur bis Hosted MCP."
pubDate: 2026-10-27
lang: de
slug: salesforce-dx-mcp-server-ende
translationKey: salesforce-dx-mcp-server-end-of-life
topic: devops
tags: [MCP, Salesforce DX, Claude Code, Agentforce Vibes, Partnersteuerung, DevOps]
takeaways:
  - "Laut offiziellem README erreicht der lokale Salesforce DX MCP Server (@salesforce/mcp) am 2. November 2026 sein End of Life; am 27. Oktober lieferte npm noch 0.30.15 ohne Deprecated-Hinweis."
  - "Die Salesforce-Anleitung konfiguriert den Server mit @latest, er aktualisiert sich also selbst; pinnen Sie auf jedem Partnerrechner 0.30.15, bis der alte Eintrag entfernt ist."
  - "Der Server arbeitet mit jeder Org, an der ein Entwickler per Salesforce CLI angemeldet ist; ALLOW_ALL_ORGS oder DEFAULT_TARGET_ORG lassen einen KI-Agenten unbemerkt bis in die Produktion."
  - "Salesforce bietet die offene Bibliothek sf-skills, ein Claude-Code-Plugin und Hosted MCP Server an, nennt sie in den Quellen, die ich öffnen konnte, aber nicht Nachfolger; das ist meine Lesart."
  - "Zwei MCP-Server des Plugins laufen auf Salesforce-Infrastruktur, ein Admin auf Kundenseite muss sie in der Org aktivieren; einer davon ist ein Beta-Service, dessen Aufrufe auf das API-Kontingent der Org zählen."
faq:
  - q: "Was passiert am 2. November 2026 mit dem Salesforce DX MCP Server?"
    a: "Laut README in beiden Salesforce-Repositories erreicht der lokale Server @salesforce/mcp dann sein End of Life. Die Details stehen in GitHub-Issue 46, das ich nicht öffnen konnte. Was danach genau mit Repository und npm-Paket passiert, ist deshalb nicht bestätigt."
  - q: "Funktionieren bestehende DX-MCP-Konfigurationen ab dem 2. November nicht mehr?"
    a: "Das kann außerhalb von Salesforce noch niemand sagen. Am 27. Oktober 2026 lieferte die npm-Registry die Version 0.30.15 ohne Deprecated-Hinweis. Ich würde diese Version jetzt pinnen, damit sich nichts überraschend ändert, und den Eintrag innerhalb weniger Monate entfernen."
  - q: "Ist das Claude-Code-Plugin von Salesforce der offizielle Ersatz?"
    a: "Die Ankündigung des Plugins vom 19. August 2026 erwähnt den DX MCP Server und sein Ende nicht. Plugin, sf-skills und Hosted MCP decken den Großteil derselben Arbeit ab, aber sie Nachfolger zu nennen ist meine Lesart, keine Salesforce-Aussage."
  - q: "Betrifft das Ende auch Agentforce Vibes?"
    a: "Laut Vibes-Dokumentation wird der DX MCP Server mit Agentforce Vibes ausgeliefert und ist in Code Builder standardmäßig aktiv; das End of Life erwähnte sie beim Lesen nicht. Fragen Sie Partner und Salesforce-Ansprechpartner, womit Vibes nach dem 2. November arbeitet."
draft: false
---

Der lokale Salesforce DX MCP Server (`@salesforce/mcp`) erreicht laut offiziellem README am 2. November 2026 sein End of Life. Setzen Ihre Implementierungspartner Claude Code, Cursor, Copilot oder Agentforce Vibes auf Ihren Orgs ein, nutzen einige ihn wahrscheinlich. Lassen Sie vor dem Stichtag jede Konfiguration auflisten, Version 0.30.15 statt `@latest` fest eintragen und die Arbeit auf Salesforce CLI mit Skills, das Claude-Code-Plugin und Hosted MCP umstellen. Die wichtigere Frage für Sie ist aber nicht das Werkzeug, sondern mit welchem Org-Zugriff es läuft.

## Was genau endet am 2. November 2026?

Das README des Issue-Repositorys [forcedotcom/mcp](https://raw.githubusercontent.com/forcedotcom/mcp/main/README.md) und des Quell-Repositorys [salesforcecli/mcp](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) trägt dasselbe Banner: „End of Life: November 2nd, 2026“. Für Details verweist es auf GitHub-Issue 46. Dieses Issue konnte ich nicht öffnen. Ob die Repositories schreibgeschützt werden, ob das Paket als veraltet markiert wird und ob Sicherheitskorrekturen am Stichtag enden, kann ich Ihnen deshalb nicht sagen.

Was ich am 27. Oktober 2026 prüfen konnte:

- Die [npm-Registry](https://registry.npmjs.org/@salesforce/mcp) führt 0.30.15 vom 9. Juli 2026 als aktuelle Version. Keine Version trägt bisher einen Deprecated-Hinweis. Seit April 2025 hat Salesforce 121 Versionen einschließlich Vorabversionen veröffentlicht, im Schnitt etwa alle vier Tage eine.
- Der Salesforce DX Developer Guide beschreibt den Server weiterhin [ohne Hinweis auf das Ende](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp_server.htm). Er konfiguriert das Paket mit `@latest`, „so you always get the latest version“, und neue Versionen werden automatisch installiert.
- Laut [Dokumentation von Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html) wird der DX MCP Server mit Vibes ausgeliefert und ist in Code Builder „installed and enabled by default“.

Mit genau dieser Kombination würde ich planen. Ein Server, der sich selbst aktualisiert und auf Rechnern konfiguriert ist, die Sie nicht verwalten, verliert seinen Support, während die Hälfte der offiziellen Dokumentation das nicht erwähnt. Was Salesforce nach dem Stichtag auf npm veröffentlicht, landet auf diesen Rechnern, ohne dass jemand darüber entscheidet.

Zum Vergleich die [Richtlinie für Hosted MCP Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/end-of-life.html): Jede Version wird mindestens drei Jahre unterstützt, und das Ende wird mindestens ein Jahr vorher angekündigt. Für den lokalen Server habe ich keine vergleichbare Zusage gefunden.

## Warum ist ein Entwicklerwerkzeug Sache der IT-Leitung?

MCP (Model Context Protocol) ist der offene Standard, über den ein KI-Werkzeug Funktionen in einem anderen System aufruft. Der DX MCP Server gibt einem Coding-Agenten mehr als 60 solcher Funktionen für Ihre Salesforce-Orgs. Er läuft auf dem Rechner des Entwicklers und nutzt die Orgs, an denen dieser per Salesforce CLI angemeldet ist. Welche Orgs der Agent anfassen darf, legt beim Start ein einziger Parameter fest, `--orgs`. Das [README](https://raw.githubusercontent.com/salesforcecli/mcp/main/README.md) nennt die Werte:

- `ALLOW_ALL_ORGS` öffnet jede auf dem Rechner angemeldete Org; Salesforce schreibt dazu „Use this value with caution.“
- `DEFAULT_TARGET_ORG` wird bei jedem Tool-Aufruf neu aufgelöst. Wechselt der Entwickler seine Standard-Org, arbeitet der Agent ohne Warnung in der neuen.
- Explizite Benutzernamen oder Aliase binden den Server an benannte Orgs. Nur diese Einstellung akzeptiere ich für Agenten.

Die Werkzeuge hinter diesem Parameter sind nicht harmlos. `deploy_metadata` deployt in eine Org, `assign_permission_set` weist Permission Sets zu, auch für andere Benutzer, `run_soql_query` liest Daten. Telemetrie ist standardmäßig eingeschaltet. Ein Partnerentwickler, der am Montag Ihre Produktion betreut und am Dienstag in einer Sandbox baut, hat womöglich beide Orgs auf demselben Laptop.

Bei einem Hersteller liegen in der Produktions-Org Händlerkonditionen, Garantieanträge, installierte Basis und Wartungsverträge. Einem Integrationsbenutzer würden Sie keine weiten Rechte ohne Prüfung geben. Ein KI-Agent mit der Anmeldung eines Entwicklers verdient dieselbe Prüfung, und das End of Life ist ein guter Anlass dafür. Wie MCP insgesamt in Ihre Architektur passt, beschreibe ich in [MCP und Salesforce, erklärt für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).

## Was ersetzt den Salesforce DX MCP Server?

Salesforce hat 2026 drei Bausteine veröffentlicht. Keine der Seiten, die ich geöffnet habe, nennt sie Nachfolger des DX MCP Servers. Die [Plugin-Ankündigung](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) vom 19. August 2026 erwähnt ihn gar nicht. Die Zuordnung der bisherigen Aufgaben ist meine Lesart:

| Aufgabe heute | Mit dem lokalen DX MCP Server | Option nach dem 2. November |
|---|---|---|
| Deployen, abrufen, Tests ausführen | MCP-Tools auf dem Laptop | Salesforce CLI plus Skills aus [forcedotcom/sf-skills](https://raw.githubusercontent.com/forcedotcom/sf-skills/main/README.md) |
| Metadatenwissen, Unterstützung für Apex und SOQL | MCP-Tools auf dem Laptop | Claude-Code-Plugin `salesforce-development` |
| Datensätze als Kontext lesen | `run_soql_query` | Hosted MCP Server `sobject-reads` |

**sf-skills** ist eine offene Bibliothek mit mehr als 100 Skills. Codex, Cursor und Claude Code installieren sie mit `npx skills add forcedotcom/sf-skills`, in Agentforce Vibes werden die Skills automatisch installiert und aktualisiert. Das README warnt, Skills „may be renamed, restructured, or removed between releases“, und sie haben nicht die Stabilitätszusagen von GA-APIs. Ich würde sie deshalb behandeln wie jede andere Abhängigkeit: Version festhalten, Änderungen prüfen.

**Das Claude-Code-Plugin** bündelt rund 40 dieser Skills und drei MCP-Server: `salesforce-api-context`, `salesforce-metadata-experts` und `salesforce-lsp`. Die ersten beiden laufen auf Salesforce-Infrastruktur. Laut [Metadata API Guide](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_salesforce_api_mcp_intro.htm) ist der API-Context-Server ein Beta-Service unter den Beta Services Terms, setzt eingerichtetes Hosted MCP in der Org voraus, und seine Aufrufe zählen auf Ihr API-Kontingent. Ihr Admin muss das einschalten. Rechtsabteilung und IT sollten also wissen, dass sie dabei einen Beta-Service freigeben.

**Hosted MCP Server** sind seit dem [29. April 2026 GA](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), für Enterprise Edition und höher. Laut [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) sind sie standardmäßig aus, jeder Aufruf läuft mit den Rechten des Benutzers, der die Verbindung autorisiert hat, und Service Accounts gibt es nicht. Wer darüber welche Daten lesen darf, steht in [Hosted MCP Server: wer darf welche Daten lesen](../salesforce-hosted-mcp-server-datenzugriff/), warum die Aufrufe zum Kostenposten werden, in [MCP-Zugriffe auf Salesforce als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

## Ein typisches Szenario: drei Partner, ein Stichtag

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst und SAP S/4. Drei Partner arbeiten auf denselben Orgs: einer für Service und Außendienst, einer für die SAP-Schnittstelle, eine Agentur für das Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Die IT-Leitung bittet jeden Partner um eine schriftliche Antwort auf eine Frage: Wo ist `@salesforce/mcp` eingetragen? Die Antworten ergeben 14 Entwickler, neun davon mit dem Server in einer Konfigurationsdatei. Zwei starten ihn mit `ALLOW_ALL_ORGS`. Einer dieser beiden hat auch die Produktions-Org auf seinem Laptop angemeldet, weil er Hotfixes betreut. Der Servicepartner hat eine gemeinsame `.mcp.json` mit `@salesforce/mcp@latest` ins Repository des Kunden eingecheckt, jeder neue Entwickler bekommt sie also automatisch. Die Portalagentur arbeitet mit Agentforce Vibes und hatte ihre MCP-Einstellungen nie angesehen.

Fahrlässig ist davon nichts. So sieht es aus, wenn sich ein Werkzeug in Partnerteams verbreitet und niemand auf Kundenseite dafür zuständig ist. Die Korrekturen sind kurz: Die gemeinsame Datei wird auf 0.30.15 gepinnt und bekommt feste Sandbox-Aliase, der Hotfix-Entwickler trennt seine Produktionsanmeldung von der Agentenarbeit, die Agentur prüft, was Vibes einschaltet. Danach testet der Servicepartner Plugin und Skills zwei Wochen in einer Entwicklungs-Sandbox, der Admin des Kunden aktiviert die Hosted Server dort und nur dort, und der alte Eintrag verschwindet aus dem Repository.

Am längsten dürfte die Frage dauern, wer Hosted Server in der Produktion freigibt. Ich würde die Produktion außen vor lassen, bis es einen konkreten Bedarf gibt.

## Was sollten Sie Ihre Partner vor dem 2. November fragen?

1. **Inventur.** Lassen Sie sich von jedem Partner auflisten, auf welchen Rechnern, in welchen Repositories und in welchen Werkzeugen `@salesforce/mcp` läuft. In Claude Code zeigt `claude mcp list` die eingerichteten Server; [projektweite Server](https://code.claude.com/docs/en/mcp) stehen in der `.mcp.json` im Repository, lokale und benutzerweite in `~/.claude.json`. VS Code nutzt `.vscode/mcp.json`, Cursor und Cline eigene Dateien.
2. **Pinnen.** Ersetzen Sie `@salesforce/mcp` und `@salesforce/mcp@latest` durch `@salesforce/mcp@0.30.15` und legen Sie ein Datum für die Entfernung fest. Eine gepinnte Version hält die Übergangszeit stabil, bekommt aber keine Korrekturen.
3. **Orgs festlegen.** Nur feste Sandbox-Aliase, kein `ALLOW_ALL_ORGS`, keine Produktion. Deployments in die Produktion laufen über die Pipeline, wie in [Partner coden mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/) beschrieben.
4. **Hosted Server bewusst aktivieren.** Zuerst in einer Sandbox, `sobject-reads` vor allem, was schreibt, mit einer External Client App, die auf ein Permission Set beschränkt ist.
5. **Repository anpassen.** Die gemeinsame MCP-Konfiguration und die [KI-Regeldatei](../ki-regeldatei-salesforce-repository/) gehören in Ihr Repository und ändern sich nur über einen geprüften Pull Request, wie jeder andere Code. Claude Code unterstützt außerdem eine zentral verwaltete MCP-Konfiguration mit Allowlists, wenn Sie es selbst lizenzieren.

Das ist normales Abhängigkeits- und Zugriffsmanagement, angewendet auf KI-Werkzeuge, und es gehört auf Kundenseite zu [DevOps und Release-Management](../../leistungen/devops-und-release-management/). Die übrigen Schnittstellen beschreibt [Kapitel 3 der Masterclass](../../masterclass-ki/mcp-und-schnittstellen/).

Nutzen Sie den Stichtag, um herauszufinden, welche KI-Werkzeuge mit wessen Anmeldung Ihre Orgs erreichen, dann wird der Wechsel des Servers selbst zur kleinen Aufgabe. Wenn Sie die Inventur mit Ihren Partnern gemeinsam angehen möchten, [schreiben Sie mir](#contact).
