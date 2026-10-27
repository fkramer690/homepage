---
title: "Best Practices für KI-Code in Salesforce-Projekten"
description: "Welche Regeln, Prüfungen und Zugriffsgrenzen KI-generierter Salesforce-Code braucht, von der Regeldatei über API 67.0 bis zu den Quality Gates."
lang: de
slug: best-practices-ki-code
translationKey: masterclass-08
chapter: 8
short: "Best Practices für KI-Code"
summary: "Wie Sie KI-generierten Salesforce-Code mit Regeldatei, Pipeline-Prüfungen und klaren Org-Grenzen beherrschbar machen."
takeaways:
  - "Eine Regeldatei im Repository ist ein Wunsch an das Modell; verbindlich sind nur Deny-Regeln, Hooks und Prüfungen in der Pipeline, die ohne Zutun des Modells laufen."
  - "Veracode misst 2026 für KI-Code ohne Review eine Sicherheits-Passrate von 56 Prozent, bei Java nur 30 Prozent; für Apex gibt es keine eigenen Daten, Java ist der nächste Verwandte."
  - "Ab API 67.0 laufen Apex-Klassen standardmäßig im User Mode und mit Sharing; das Risiko liegt im Anheben der API-Version, das Coding-Agenten gern nebenbei erledigen."
  - "75 Prozent Testabdeckung sind die Mindestgrenze für ein Deployment; Bulk-Tests, Tests mit eingeschränkten Benutzern und echte Asserts gehören in die Definition of Done."
  - "Coding-Agenten arbeiten nur gegen Scratch Orgs und Entwickler-Sandboxes; in Produktion gelangt Code ausschließlich über die Pipeline mit menschlicher Freigabe."
articles: [reviewing-ai-generated-salesforce-code, api-67-user-mode-apex, quality-gates-ai-code-pipeline, ai-rules-file-salesforce-repo, vibe-coding-prototype-not-production]
faq:
  - q: "Muss ich als Auftraggeber KI-generierten Code selbst lesen können?"
    a: "Nein. Sie sollten aber das Repository, die Regeldatei und die Pipeline besitzen und festlegen, welche Prüfungen jeder Pull Request bestehen muss. Das Lesen übernehmen Code Analyzer, Tests und ein Reviewer, den Sie benennen."
  - q: "Reicht eine gute Regeldatei, damit der Agent sauberen Apex-Code schreibt?"
    a: "Nein. Anthropic schreibt selbst, dass das Modell eine Richtlinie in CLAUDE.md für nicht zutreffend halten darf. Was jedes Mal passieren muss, gehört in Deny-Regeln, Hooks und die Pipeline."
  - q: "Ist bestehender Apex-Code von der Änderung in API 67.0 betroffen?"
    a: "Erst, wenn jemand die API-Version einer Klasse auf 67.0 oder höher anhebt. Code auf 66.0 und älter verhält sich wie bisher. Deshalb sollte die Regeldatei das Anheben ohne Auftrag und ohne Test mit eingeschränktem Benutzer verbieten."
draft: false
---

Für KI-generierten Salesforce-Code empfehlen 2026 alle großen Werkzeuganbieter dasselbe Muster: eine kurze Regeldatei im Repository, einen Plan vor dem Code und Prüfungen, die nicht vom Wohlwollen des Modells abhängen. Auf Salesforce kommen typische Fehler hinzu, die sich größtenteils maschinell finden lassen: Abfragen in Schleifen, fehlende Feld- und Objektrechte, Tests ohne echte Asserts, erfundene Feldnamen. Und API 67.0 ändert die Rechte-Defaults pro Klasse. Als Auftraggeber müssen Sie keinen Code lesen. Sie sollten aber Regeldatei, Pipeline und Org-Zugriffe besitzen, und kein Agent kommt an Ihre Produktion.

## Was sagt die Evidenz über KI-generierten Code?

Die Studien messen sehr unterschiedliche Dinge, und keine davon misst Apex. Für eine Entscheidung reichen vier Befunde:

| Studie | Setting | Ergebnis |
|---|---|---|
| [Veracode, Juli 2026](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) | Rohmodelle ohne Werkzeuge und ohne Review, 11 Modelle im aktuellen Vergleich | 56 % Sicherheits-Passrate, „virtually unchanged“; Python 63 %, Java 30 % auf dem letzten Platz |
| [METR, Juli 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 16 erfahrene Entwickler, echte Aufgaben in eigenen großen Repositories | 19 % langsamer mit KI, gefühlt 20 % schneller |
| [METR, Februar 2026](https://metr.org/blog/2026-02-24-uplift-update/) | Folgestudie | Beschleunigung heute „likely“, die Daten seien aber „only very weak evidence“ für ihre Größe |
| [DORA, September 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) | knapp 5.000 Befragte | KI steigert den Durchsatz, schadet weiter der Stabilität; „it amplifies what's already there“ |

Zwei Schlüsse ziehe ich daraus. Eine gewachsene Kundenorg mit Jahren an Triggern, Flows und Schnittstellen zu SAP ähnelt eher dem METR-Setting als einer Aufgabe auf der grünen Wiese. Produktivitätsgewinne sollten Sie dort messen statt annehmen; wie, beschreibt [Kapitel 9](../teamarbeit-und-delivery/). Und Veracodes Java-Wert ist für mich ein Warnsignal für Apex, weil beide Sprachen eng verwandt sind. Belegt ist das nicht, Apex-Daten gibt es schlicht keine.

## Welche Fehler macht KI in Salesforce-Code typischerweise?

Salesforce dokumentiert die Schwachstellen selbst. Die [Prüfliste für Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html) fragt nach Abfragen in Schleifen, nach dem Limit von 100 SOQL-Abfragen im Bulk-Fall und nach Asserts, die mehr prüfen als `System.assertNotEquals(null, result)`. Der zentrale Satz dort: „Permission modes protect your filesystem. Code review protects your application.“

| Bereich | Typischer Fehler | Wie man ihn findet |
|---|---|---|
| Governor Limits | SOQL oder DML in Schleifen, unbegrenzte Abfragen | Code Analyzer, ApexGuru |
| Bulk-Verarbeitung | Trigger verarbeitet einen Datensatz statt einer Liste | Bulk-Test; der [Apex-Testleitfaden](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/api/apex_testing_best_practices.htm) verlangt mindestens 20 Datensätze |
| Rechte | keine Sharing-Deklaration, kein `WITH USER_MODE` | Code Analyzer, Test mit `runAs` |
| Tests | Abdeckung ohne Aussage, Testdaten aus der Org | Review, Assert-Regel |
| Feldnamen | erfundene API-Namen statt der echten aus der Org | Validierungs-Deployment |
| Metadaten | neues Feld fehlt im Permission Set | Validierungs-Deployment, Review |
| Konfiguration | Agent ändert Sharing, Profile, Layouts | Regel: das macht ein Mensch im Setup |

Die letzte Zeile ist eine Empfehlung von Salesforce: Permission Sets, Profile, Page Layouts und Sharing-Regeln sollen laut den [Vibes Workflow Patterns](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html) von Hand im Setup entstehen, Code für Verschlüsselung, Authentifizierung und Berechtigungslogik soll Zeile für Zeile geprüft werden. Bei einem Hersteller betrifft das genau die Stellen, an denen Händler nur ihre eigenen Aufträge und Garantiefälle sehen dürfen.

Zur Abdeckung: Salesforce verlangt 75 Prozent für ein Deployment, schreibt im Testleitfaden aber ausdrücklich, man solle sich nicht auf den Prozentsatz konzentrieren. Ein Agent optimiert auf die Prüfung, die Sie ihm geben. Geben Sie ihm nur die 75 Prozent, bekommen Sie Tests, die Zeilen durchlaufen und nichts beweisen. Wie Sie als Auftraggeber solchen Code prüfen lassen, steht in [KI-generierten Salesforce-Code prüfen](../../blog/ki-generierten-salesforce-code-pruefen/), und warum jeder Pull Request ein Review braucht, in [warum Pull-Request-Reviews Pflicht sind](../../blog/warum-pull-request-reviews-pflicht-sind/).

## Die Falle mit API 67.0

Mit Summer '26 hat Salesforce das Standardverhalten von Apex geändert. Laut [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) läuft Code ab API 67.0 im Benutzerkontext, Klassen ohne Sharing-Deklaration laufen mit den Freigaben des aktuellen Benutzers, und `WITH SECURITY_ENFORCED` ist in SOQL nicht mehr erlaubt. Der [Architektenblog zu Summer '26](https://www.salesforce.com/blog/summer-26-release-architect-highlights/) ergänzt zwei Punkte: Trigger laufen immer im System Mode, die Handler-Klassen, die sie aufrufen, sind aber betroffen, wenn ihnen die Deklaration fehlt. Und Klassen mit der alten Klausel kompilieren auf 67.0 nicht mehr.

Die Änderung hängt an der API-Version jeder einzelnen Klasse. Code auf 66.0 verhält sich wie bisher, bis jemand die Version anhebt. Genau dort liegt das Risiko: Eine Abfrage liefert danach still weniger Datensätze, ohne Fehlermeldung. Nehmen Sie den Batch-Job, der nachts Auftragsstände aus SAP in Salesforce schreibt, oder die Klasse, die Garantiefristen über alle Anlagen eines Händlers berechnet. Beide haben bisher stillschweigend alles gesehen.

Für KI-Code ist das aus meiner Sicht doppelt relevant. Modelle haben überwiegend älteres Apex gesehen und schlagen deshalb Muster vor, die auf 67.0 nicht mehr kompilieren oder anders wirken. Und Agenten heben API-Versionen gern nebenbei an, wenn sie eine Datei ohnehin anfassen. Die Regeldatei sollte deshalb drei Dinge festlegen: Zielversion für neue Klassen, explizite Sharing-Deklaration, kein Anheben bestehender Klassen ohne Auftrag und ohne Test mit eingeschränktem Benutzer. Wo System Mode gewollt ist, schreibt der Code `WITH SYSTEM_MODE` bewusst hin, wie es die [LWC-Dokumentation zu sicherem Apex](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security) beschreibt. Details stehen in [API 67.0: warum Apex weniger Datensätze sieht](../../blog/api-67-apex-user-mode-weniger-datensaetze/), die Folgen für die Pipeline in [Winter '27: was sich ändert](../../blog/salesforce-winter-27-aenderungen-pipeline/).

## Regeln, die der Agent liest, und Regeln, die er nicht umgehen kann

Jeder Coding-Agent liest eine Projektdatei mit dauerhaften Anweisungen: `CLAUDE.md` bei Claude Code, `AGENTS.md` bei Codex, `.vibes/rules/` bei Agentforce Vibes. GitHub Copilot liest laut [GitHub-Dokumentation](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) `.github/copilot-instructions.md`, `AGENTS.md` oder eine einzelne `CLAUDE.md` im Wurzelverzeichnis. Ob Vibes `AGENTS.md` liest, ist in der [Vibes-Dokumentation zu Regeln](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html) nicht beschrieben; für gemischte Teams würde ich eine kanonische `AGENTS.md` plus eine kurze Vibes-Regel pflegen, die darauf verweist.

Die Anbieter sind sich bei der Länge einig. Anthropic empfiehlt in den [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) unter 200 Zeilen und nur das, was der Agent nicht aus dem Code ableiten kann: Befehle für Tests und Prüfungen, irreführende Stellen im Code, Entscheidungen, die nirgends stehen, und „anything you've had to correct twice already“. OpenAI schreibt: „A short, accurate AGENTS.md is more useful than a long file full of vague rules.“ Ein Auszug für ein Salesforce-Repository:

```markdown
# Orgs
- Work only against scratch orgs and the alias dev-sandbox; never uat or prod

# Apex
- New classes: API 67.0, explicit sharing declaration, WITH USER_MODE
- Do not raise the API version of existing classes unless the task says so
- No SOQL/DML in loops; triggers must be bulk-safe for 200 records
- SAP calls only via Named Credential SAP_S4, never direct endpoints

# Done means
- Positive, negative and bulk tests with real asserts, plus a runAs test
- Report the test command and its output before saying done
```

Das Wichtigste steht aber nicht in dieser Datei. Anthropic formuliert es so: „If something has to happen every time, make it a hook, a deny rule, or a managed setting.“ Das Modell darf eine Richtlinie in `CLAUDE.md` für nicht zutreffend halten. Deny-Regeln dagegen gelten in jedem Berechtigungsmodus, und ein `Stop`-Hook schickt den Agenten zurück an die Arbeit, solange Tests oder Code Analyzer rot sind. Für Salesforce heißt das: Leseverbot für die Anmeldedaten der sf CLI, Verbot von Befehlen gegen Produktions-Aliase, Tests als Hook.

Die Regeldatei gehört in Ihr Repository, nicht in das des Partners. Wer sie pflegt und wie sie wächst, beschreibe ich in [die KI-Regeldatei im Salesforce-Repository](../../blog/ki-regeldatei-salesforce-repository/); warum Repository und Werkzeuge beim Kunden liegen sollten, in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

## Welche Quality Gates gehören in die Pipeline?

Was in der Regeldatei steht, prüft im Zweifel niemand. Was in der Pipeline steht, prüft jeder Lauf. Ich würde für KI-Code dieselben Gates verlangen wie für Code von Menschen, nur ohne Ausnahmen:

| Gate | Was es findet | Hinweis |
|---|---|---|
| [Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/code-analyzer.html) | Sicherheits- und Performance-Regeln über PMD, ESLint, RetireJS, Regex, Flow Scanner | als CLI und GitHub Action verfügbar |
| [ApexGuru-Scan](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server) | SOQL in Schleifen, unbegrenzte Abfragen, zu viele Felder | Schweregrad aus Laufzeitdaten nur mit Produktion oder Full Copy Sandbox |
| [Validierungs-Deployment](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_validate.html) | fehlende Referenzen, erfundene Felder, rote Tests | `sf project deploy validate`, Standard `RunLocalTests`, 75 % je Klasse |
| Review durch einen Menschen | Logik, Sharing-Modell, Architektur | Pull Request mit Kennzeichnung der KI-Anteile |

Die offenen [Salesforce Skills](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) bringen einen Teil davon schon mit: Sie lehnen Abfragen in Schleifen ab, erzwingen Sharing-Deklarationen und lassen Code Analyzer laufen, bevor sie Erfolg melden. Salesforce empfiehlt trotzdem, Feldnamen gegen das Schema zu prüfen und Code Analyzer zusätzlich von Hand zu starten. Ein Gate im Werkzeug des Entwicklers ersetzt das Gate in Ihrer Pipeline nicht. Wer keine kommerzielle DevOps-Lösung will, findet in [sfdx-hardis](../../blog/sfdx-hardis-einfuehrung-salesforce-devops/) eine Open-Source-Option. Die Gates im Detail stehen in [Quality Gates für KI-Code in der Salesforce-Pipeline](../../blog/quality-gates-ki-code-salesforce-pipeline/).

Vor dem Gate entscheidet die Arbeitsweise, wie viel durchfällt. Drei Gewohnheiten halte ich für wirksam:

- **Plan vor Code.** Im Plan Mode von Vibes ändert sich laut Salesforce nichts, „until you click Approve Plan“. Für eine Erweiterung mit mehreren Metadatentypen lohnt das. Für einen Bugfix reicht ein Test, der den Fehler zeigt. Birgitta Böckeler hat erlebt, wie ein Werkzeug [aus einem kleinen Bug vier User Stories mit 16 Akzeptanzkriterien](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) machte.
- **Beweise statt Behauptungen.** Der Agent liefert den Testbefehl und die Ausgabe, nicht „alle Tests grün“.
- **Kleine Änderungen.** DORA zählt [kleine Batches](https://dora.dev/capabilities/) zu den Fähigkeiten, die KI-Nutzen tragen. Ein Pull Request mit 40 geänderten Dateien wird nicht geprüft, er wird durchgewinkt.

## Warum bekommt kein Agent Zugriff auf Produktion?

Simon Willison beschreibt die [„lethal trifecta“](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): Zugriff auf private Daten, Kontakt mit nicht vertrauenswürdigen Inhalten und ein Weg nach außen. Ein Coding-Agent mit sf-CLI-Anmeldung an einer Org mit echten Händler- und Kundendaten, der Tickets und Webseiten liest und Netzwerkzugriff hat, erfüllt alle drei. Anthropic nennt im [Leitfaden zum sicheren Betrieb](https://code.claude.com/docs/en/agent-sdk/secure-deployment) selbst das Beispiel einer README mit ungewöhnlichen Anweisungen, die der Agent übernehmen könnte.

Meine Mindestregeln für jedes Projekt:

1. Agenten arbeiten nur gegen Scratch Orgs und Entwickler-Sandboxes ohne echte Kundendaten.
2. Agentforce Vibes ist in Produktions-Orgs im Setup unter „Agentforce Vibes Extensions“ [deaktiviert](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes).
3. Berechtigungen starten bei „Ask every time“ und werden schrittweise geöffnet, wie es die Vibes-Dokumentation empfiehlt.
4. Deny-Regeln sperren Anmeldedaten und Produktions-Aliase; Zugangsdaten liegen außerhalb der Agentenumgebung, Anthropic beschreibt dafür einen Proxy.
5. Deployments nach Produktion laufen nur über die Pipeline, mit Freigabe durch einen Menschen.

Diese Regeln gehören in den Vertrag mit dem Partner, nicht nur in seine Arbeitsanweisung. Das ist Teil meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

## Ein typisches Szenario: Ersatzteilverfügbarkeit im Händlerportal

Nehmen wir einen Maschinenbauer mit Experience-Cloud-Händlerportal, Service Cloud und SAP S/4. Alle Zahlen sind Annahmen. Der Partner soll mit vier Entwicklern und Claude Code eine Komponente bauen, in der Händler die Verfügbarkeit von Ersatzteilen für ihre Maschinen sehen.

Im Anforderungsworkshop entsteht in zwei Stunden ein klickbarer Entwurf in einer Developer Edition. Das ist Vibe Coding im besten Sinn, und der Entwurf wird danach verworfen; wo die Grenze liegt, steht in [Vibe Coding in Salesforce: Prototyp oder Produktion](../../blog/vibe-coding-salesforce-prototyp-produktion/). Für die echte Umsetzung gilt:

- Die Regeldatei liegt im Repository des Herstellers und nennt den Named Credential für SAP, die Zielversion 67.0 und die Scratch-Org-Befehle.
- Der Agent schreibt zuerst einen Plan, den ein Entwickler freigibt.
- Der Plan sieht vor, eine bestehende Selector-Klasse von 62.0 auf 67.0 anzuheben, also verlangt die Regeldatei einen `runAs`-Test. Der Test mit einem eingeschränkten Händlerbenutzer zeigt, dass danach Anlagen anderer Händler fehlen, was gewollt ist, aber auch die Teilestammdaten, was nicht gewollt ist. Gefunden im Validierungs-Deployment statt im Portal.
- Code Analyzer meldet eine Abfrage in einer Schleife bei 200 Positionen, der Pull Request geht zurück.
- Der Reviewer prüft das Sharing-Modell, nicht die Formatierung.

Kein Schritt davon ist neu. Neu ist, dass ohne diese Schritte in derselben Zeit deutlich mehr ungeprüfter Code entsteht. Die Kosten der KI-Werkzeuge selbst behandelt [Kapitel 7](../kosten-und-token/), alle Kapitel finden Sie auf der [Übersichtsseite](../).

KI-Code wird auf Salesforce so gut wie die Regeln, Gates und Org-Grenzen, die Sie als Auftraggeber festlegen. Wenn Sie Ihre Pipeline und Ihre Partnerregeln dafür prüfen lassen möchten, [schreiben Sie mir](#contact).
