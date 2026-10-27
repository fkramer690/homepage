---
title: "KI im Salesforce-Projekt: Begriffe und Landkarte"
description: "Vier Ebenen von KI im Salesforce-Projekt, die wichtigsten Begriffe von Vibe Coding bis Flex Credits und die Produktnamen mit Datum, für Hersteller sortiert."
lang: de
slug: begriffe-und-landkarte
translationKey: masterclass-01
chapter: 1
short: "Begriffe und Landkarte"
summary: "Welche vier Ebenen KI im Salesforce-Projekt hat, was Vibe Coding von agentic engineering trennt und welche Produktnamen wofür stehen."
takeaways:
  - "KI im Salesforce-Projekt hat vier Ebenen: KI zum Bauen, Schnittstellen für Agenten, KI im Produkt und KI als Oberfläche. Jede hat andere Verantwortliche, andere Risiken und ein anderes Abrechnungsmodell."
  - "Ein Coding-Agent wie Claude Code oder Agentforce Vibes schreibt Metadaten und Code; ein Agentforce-Agent läuft in der Org und beantwortet zum Beispiel Händleranfragen. Wer beides vermischt, plant das falsche Budget."
  - "Vibe Coding heißt, Code von der KI erzeugen zu lassen, ohne ihn zu prüfen. Für Workshop-Prototypen ist das in Ordnung, für eine Kundenorg mit Händler- und Garantiedaten braucht es Review, Tests und CI."
  - "Salesforce hat die KI-Schicht für externe Oberflächen in rund sechs Monaten dreimal benannt: Headless 360, AIforce, SIForce. Schreiben Sie Produktnamen in Konzepten deshalb immer mit Datum."
articles: [vibe-coding-prototype-not-production, aiforce-salesforce-in-claude-slack, agentforce-yes-or-no-manufacturers]
faq:
  - q: "Was ist der Unterschied zwischen Agentforce und Agentforce Vibes?"
    a: "Agentforce ist die Plattform für Agenten, die in Ihrer Org laufen, etwa ein Serviceagent für Händler. Agentforce Vibes ist ein Coding-Werkzeug für Entwickler, das Apex, LWC und Metadaten erzeugt. Beide teilen nur den Markennamen, sie werden unterschiedlich abgerechnet und von unterschiedlichen Leuten verantwortet."
  - q: "Ist Vibe Coding für Salesforce-Projekte erlaubt?"
    a: "Für Prototypen in einer Sandbox oder Developer Edition spricht nichts dagegen. Für Code, der in eine produktive Org mit Kunden-, Händler- oder Garantiedaten geht, empfehle ich agentic engineering: Die KI schreibt, ein Mensch prüft, und automatische Tests und Pipeline-Prüfungen entscheiden über das Deployment."
  - q: "Was bedeutet MCP im Salesforce-Umfeld?"
    a: "MCP (Model Context Protocol) ist ein offenes Protokoll, über das KI-Anwendungen und Agenten Werkzeuge und Daten anderer Systeme aufrufen. Salesforce bietet seit April 2026 gehostete MCP-Server für Enterprise Edition und höher an; jeder Aufruf läuft mit den Rechten des angemeldeten Nutzers."
draft: false
---

KI im Salesforce-Projekt bedeutet vier verschiedene Dinge: KI, die Code und Metadaten baut, Schnittstellen, über die Agenten auf die Org zugreifen, KI, die als Agent in der Org läuft, und KI als neue Oberfläche, etwa Salesforce in Claude oder Slack. Fast jede Verwirrung im Lenkungskreis entsteht, weil diese Ebenen vermischt werden. Jede Ebene hat andere Verantwortliche, andere Risiken und ein eigenes Abrechnungsmodell. Wer sie trennt und Produktnamen immer mit Datum verwendet, kann Angebote von Salesforce und Partnern sauber vergleichen.

## Die vier Ebenen von KI im Salesforce-Projekt

Ich sortiere jedes KI-Thema in Salesforce-Programmen zuerst in eine von vier Ebenen. Erst danach lohnt die Frage nach dem Werkzeug.

| Ebene | Frage | Typische Produkte (Stand Oktober 2026) | Beispiel bei einem Hersteller | Wie abgerechnet wird |
|---|---|---|---|---|
| A: KI zum Bauen | Wie entstehen Apex, LWC, Flows und Metadaten? | Agentforce Vibes, Claude Code mit Salesforce-Plugin, Codex, GitHub Copilot | Der Partner baut Komponenten für das Händlerportal mit einem Coding-Agenten | Tokens oder Nutzerlizenz, je nach Vertrag beim Partner oder bei Ihnen |
| B: Schnittstellen | Wie greift ein Agent auf Org, Metadaten und Daten zu? | sf CLI, Skills, Hosted MCP Servers, MuleSoft-APIs als MCP-Server | Ein Agent liest den Auftragsstatus über eine MuleSoft-API aus SAP | Integrationsaufwand, für agentische Aufrufe künftig Flex Credits |
| C: KI im Produkt | Welche KI läuft für Anwender in der Org? | Agentforce mit Builder, Agent Script und Atlas Reasoning Engine, Agentforce for Manufacturing | Ein Serviceagent beantwortet Händleranfragen zu Ersatzteilen und Lieferterminen | Flex Credits pro Aktion |
| D: KI als Oberfläche | Wo arbeiten Nutzer künftig mit Salesforce? | AIforce: Salesforce in Claude, Slackforce, Agentforce Coworker | Key Account Manager bereiten Händlerbesuche in Claude vor | Noch offen, laut Salesforce „subject to change“ |

Drei Zahlen zeigen, wie unterschiedlich die Abrechnung ist. Eine Agentforce-Aktion in Ebene C kostet laut [Salesforce](https://www.salesforce.com/eu/agentforce/pricing/) 20 Flex Credits, also 0,10 €, bei 500 € je 100.000 Credits. Agentforce Vibes in Ebene A zählt laut [Abrechnungsdoku](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) in Einheiten von bis zu 2.000 Tokens oder läuft über eine Unmetered-Lizenz mit Obergrenze für Premium-Modelle. Für agentische API- und MCP-Aufrufe in Ebene B führt die [Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) den Zähler „Headless Platform Interaction“, der Satz steht dort als „TBA“.

Die Ebenen wachsen zusammen. Salesforce beschreibt einen [Entwicklungsweg für Agentforce-Agenten](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce), bei dem ein Coding-Agent wie Claude Code, Codex oder Agentforce Vibes mit Agent Skills die Agentendefinition in Agent Script schreibt. Ebene A baut dann Ebene C. Ebene D ist die jüngste und unreifste Schicht. Für die Verantwortung bleibt die Trennung trotzdem richtig: Ebene A gehört in die Delivery und den Partnervertrag, B zur Integrationsarchitektur, C zu den Fachbereichen Service und Vertrieb, D zur IT-Leitung und zum Datenschutz.

## Was ist der Unterschied zwischen Vibe Coding und agentic engineering?

Andrej Karpathy hat „Vibe Coding“ im Februar 2025 geprägt: Man gibt sich den Vibes hin und „vergisst, dass der Code überhaupt existiert“. Simon Willison hat das [im Mai 2025 präzisiert](https://simonwillison.net/2025/May/1/not-vibe-coding/): Vibe Coding heißt, Code mit KI zu erzeugen, ohne sich um den erzeugten Code zu kümmern. Nicht jede KI-gestützte Programmierung fällt darunter.

Martin Fowler trennt seit dem 21. Mai 2026 [Vibe Coding von „agentic engineering“](https://martinfowler.com/bliki/VibeCoding.html). Beim agentic engineering schreibt das Sprachmodell den Code, Entwickler prüfen ihn aber und achten auf seine Struktur. Vibe Coding hält Fowler für Wegwerfsoftware, persönliche Werkzeuge und Prototypen für angemessen. Als Risiken nennt er Sicherheit, weil solche Anwendungen Daten oder Zugangsdaten preisgeben können, Wartbarkeit und unbemerkt falsches Verhalten.

Für einen Hersteller ziehe ich die Grenze so:

- **Vibe Coding passt** für einen klickbaren Entwurf des Händlerportals im Anforderungsworkshop, für ein Skript, das Testdaten für Ersatzteile erzeugt, oder für eine Auswertung, die nach einer Woche niemand mehr braucht. Immer in einer Sandbox oder Developer Edition.
- **Agentic engineering ist Pflicht** für alles, was in die produktive Org geht: Garantielogik, Preisfreigaben, Schnittstellen zu SAP oder proALPHA, Freigaben im Händlerportal. Dort gehören Review, Tests und automatische Prüfungen in der Pipeline dazu.

Wo genau die Grenze verläuft und welche Prüfungen ein Prototyp durchlaufen muss, bevor er produktiv wird, beschreibe ich in [Vibe Coding in Salesforce: Prototyp oder Produktion](../../blog/vibe-coding-salesforce-prototyp-produktion/). Die Prüfregeln für KI-Code selbst sind Thema von [Kapitel 8](../best-practices-ki-code/).

Ein dritter Begriff taucht in Partnerpräsentationen auf: „AI-native delivery“. Damit ist ein Delivery-Prozess gemeint, der von Anfang an mit Coding-Agenten geplant ist, mit kleineren Teams und anderen Rollen. Was das für Ihre Programmorganisation heißt, steht in [Kapitel 9](../teamarbeit-und-delivery/).

## Coding-Agent oder Agentforce-Agent: die Grundbegriffe

Die häufigste Verwechslung in Gesprächen mit Fachbereichen: Ein Coding-Agent baut, ein Agentforce-Agent läuft. Beide heißen „Agent“, beide nutzen Sprachmodelle, sie haben aber nichts miteinander zu tun, außer dass der eine den anderen bauen kann.

| Begriff | Bedeutung im Salesforce-Umfeld |
|---|---|
| Coding-Agent | Werkzeug, das Code plant, schreibt, Befehle ausführt und testet, etwa Claude Code, Codex, Copilot oder Agentforce Vibes. Ebene A. |
| Agentforce-Agent | Agent, der zur Laufzeit in Ihrer Org arbeitet, zum Beispiel ein Serviceagent für Händler. Ebene C. |
| MCP (Model Context Protocol) | Laut [Salesforce](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce) ein offenes Protokoll, über das KI-Anwendungen und Agenten Werkzeuge und Datenquellen anbinden. Ebene B. |
| Hosted MCP Servers | Von Salesforce betriebene MCP-Server, laut [Salesforce](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) seit 29. April 2026 GA für Enterprise Edition und höher. Jede Transaktion läuft als der angemeldete Nutzer, mit dessen Sharing und Feldrechten. |
| Skill | Paket mit Anweisungen und Vorlagen, das ein Coding-Agent bei Bedarf lädt. Die offene Bibliothek forcedotcom/sf-skills hatte im [Juni 2026](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills) mehr als 60 Skills. |
| Regeldatei | Dauerhafte Projektanweisungen für den Coding-Agenten, etwa `CLAUDE.md` bei [Claude Code](https://code.claude.com/docs/en/best-practices) oder `.vibes/rules/` bei [Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html). Gehört ins Repository des Kunden. |
| Agent Script | Laut [Salesforce Architects](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) eine deklarative Sprache, die festlegt, wie sich ein Agentforce-Agent verhält. Sie trennt deterministische Logik von Anweisungen, die das Sprachmodell auslegt. |
| Atlas Reasoning Engine | Die Laufzeit, die Agent Script als Zustandsautomaten ausführt. Regeln laufen als Code, das Sprachmodell wird nur dort gerufen, wo Prompt-Anweisungen stehen. |
| Einstein Trust Layer | Schutzschicht für Agentforce: Grounding in CRM-Daten, Maskierung sensibler Daten, Toxizitätsprüfung, Audit-Trail und Zero-Data-Retention-Vereinbarungen mit Modellanbietern ([Doku](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html)). |
| Flex Credits | Verbrauchswährung für Agentforce und weitere Dienste, 500 € je 100.000 Credits. |
| Token | Textstück, das ein Modell verarbeitet. Wie viele Tokens ein Text ergibt, hängt laut [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) vom Tokenizer, der Sprache und der Art des Inhalts ab. Claude Sonnet 5.5 kostet dort 2 $ je Million Eingabe- und 10 $ je Million Ausgabe-Tokens (US-Listenpreis). |

Für Architekten ist der Satz aus der Architects-Doku der wichtigste: Was sich als Code ausdrücken lässt, soll als Logik geschrieben werden. Garantieberechtigung, Kreditlimit und Preisfreigabe gehören in diese Kategorie, nicht in einen Prompt.

## Warum heißt alles Agentforce? Die Namen mit Datum

„Agentforce“ steht im Herbst 2026 für mindestens vier Dinge: die Agentenplattform, das Coding-Werkzeug Agentforce Vibes, den KI-Kollegen Agentforce Coworker und die Dachmarke Agentforce 360. Dazu kommen Umbenennungen, die alte Konzepte und Angebote schnell veralten lassen.

| Datum | Ereignis | Quelle |
|---|---|---|
| 10.08.2023 | Einstein for Developers in Open Beta, Apex aus natürlicher Sprache | [Salesforce Developers](https://developer.salesforce.com/blogs/2023/08/einstein-for-developers-open-beta) |
| 16.09.2024 | Umbenennung in Agentforce for Developers, GA | [Salesforce Developers](https://developer.salesforce.com/blogs/2024/09/introducing-agentforce-for-developers) |
| 23.06.2025 | Agentforce 3 angekündigt, mit Command Center und nativem MCP-Client (beide für den Sommer 2025 vorgesehen) | [Salesforce IR](https://investor.salesforce.com/news/news-details/2025/Salesforce-Launches-Agentforce-3-to-Solve-the-Biggest-Blockers-to-Scaling-AI-Agents-Visibility-and-Control/default.aspx) |
| 21.08.2025 | Agentforce for Manufacturing mit Vorlagen für Absatzplanung, Bestand und Anlagenservice | [Salesforce News](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) |
| 01.10.2025 | Agentforce Vibes GA, mit begrenzten Anfragen und Chatfunktionen aus dem Open-Source-Projekt Cline | [Salesforce Developers](https://developer.salesforce.com/blogs/2025/10/unleash-your-innovation-with-agentforce-vibes-vibe-coding-for-the-enterprise) |
| 13.10.2025 | Agentforce 360 weltweit verfügbar, Data Cloud heißt jetzt Data 360 | [Salesforce Presse](https://www.salesforce.com/de/news/press-releases/2025/10/13/agentic-enterprise-announcement/), [Salesforce Ben](https://www.salesforceben.com/salesforce-data-cloud-renamed-to-data-360-as-part-of-agentforce-360/) |
| April 2026 | Headless 360 und Agentforce Vibes 2.0 auf der TDX vorgestellt | [Salesforce Ben](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/) |
| 29.04.2026 | Hosted MCP Servers GA | [Salesforce Developers](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) |
| 12.06.2026 | Agentforce Vibes 2.0 GA, mit Claude- und GPT-Modellen | [Ankündigung](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) |
| 19.08.2026 | Erstes offizielles Claude-Code-Plugin `salesforce-development` mit rund 40 Skills | [Salesforce Developers](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) |
| 27.08.2026 | Claudeforce: Claude als ein Reasoning-Modell der Atlas Reasoning Engine und Standard in Vibes, Coworker und Slack | [Salesforce Presse](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) |
| 15.09.2026 | AIforce auf der Dreamforce, Salesforce in Claude als Beta | [Salesforce News](https://www.salesforce.com/news/stories/aiforce-announcement/) |
| 09.10.2026 | Marc Benioff auf X: „AIForce is officially SIForce“, ohne Pressemitteilung | [Salesforce Ben](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/) (Sekundärquelle) |

Zwei Lehren ziehe ich daraus. Erstens: Einstein for Developers, Agentforce for Developers und Agentforce Vibes sind dieselbe Produktlinie; Salesforce Ben beschreibt Vibes als [Umbenennung und Ausbau von Agentforce for Developers](https://www.salesforceben.com/developer-features-and-announcements-from-dreamforce-25/), und die Doku-URL enthält bis heute `einstein-for-devs`. Ein Angebot, das 2026 „Einstein for Developers“ verspricht, beschreibt einen veralteten Stand. Zweitens: Die Schicht für externe Oberflächen hieß laut Salesforce Ben in rund sechs Monaten Headless 360, AIforce und SIForce. Ich schreibe in Konzepten „AIforce (Stand Oktober 2026)“ und übernehme in Verträgen den Namen, der auf dem Bestellformular steht. Was hinter AIforce steckt und was eine IT-Leitung jetzt tun sollte, steht in [AIforce: Salesforce in Claude und Slack](../../blog/aiforce-salesforce-in-claude-und-slack/), die zweite Lesart von „SI“ als Systemintegrator in [Kapitel 5](../aiforce-und-systemintegratoren/).

## Ein typisches Szenario: viermal „KI“ im Lenkungskreis

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, SAP und einem Händlernetz mit Portal. Alle Zahlen sind Annahmen zur Veranschaulichung. Im Lenkungskreis stehen an einem Vormittag vier KI-Wünsche auf der Agenda:

1. **Vertriebsleitung:** Die Key Account Manager sollen Händlerbesuche in Claude vorbereiten und Opportunities von dort pflegen. Das ist Ebene D. Salesforce in Claude ist eine Beta, Preise sind laut Salesforce noch veränderlich. Vorher muss geklärt sein, ob das Sharing für Garantiefälle und Preisvereinbarungen zu weit offen ist.
2. **Serviceleitung:** Ein Agent soll Händleranfragen zu Auftragsstatus und Lieferterminen beantworten. Das ist Ebene C, mit einer Abhängigkeit zu Ebene B, denn die Antworten stehen in SAP. Angenommen sind 1.500 Anfragen im Monat mit je drei Aktionen: 4.500 Aktionen zu 20 Credits ergeben 90.000 Credits, rund 450 € im Monat, ohne Tests und Integrationsaufwand.
3. **Implementierungspartner:** Er will das neue Händlerportal mit Coding-Agenten bauen und verspricht kürzere Sprints. Das ist Ebene A. Hier zählen Review-Regeln, Regeldatei und Pipeline, nicht der Name des Werkzeugs.
4. **IT-Leitung:** Sie fragt, wer eigentlich auf welche Daten zugreift, wenn Claude, der Partner-Agent und der Serviceagent gleichzeitig mit der Org sprechen. Das ist Ebene B, und sie betrifft alle drei anderen Punkte.

Ohne die Ebenen landen diese vier Wünsche in einem Topf namens „KI-Initiative“ mit einem Budget und einem Verantwortlichen. Mit den Ebenen werden es vier Vorhaben mit vier Verantwortlichen: Vertrieb mit IT und Datenschutz, Service, Programmleitung mit Partnersteuerung, Integrationsarchitektur. Nur das zweite Vorhaben braucht eine Agentforce-Entscheidung. Ob der Serviceagent jetzt startet oder erst die Daten in Ordnung kommen, beantworte ich in [Agentforce für Hersteller: jetzt starten oder warten?](../../blog/agentforce-ja-oder-nein-hersteller/).

## Wo Sie in dieser Masterclass weiterlesen

Die folgenden Kapitel gehen die Ebenen einzeln durch:

- **Ebene A:** [Kapitel 2](../salesforce-werkzeuge-ki-entwicklung/) zeigt die Werkzeuge von Salesforce selbst, [Kapitel 4](../externe-coding-agenten/) die Coding-Agenten von Anthropic, OpenAI und GitHub.
- **Ebene B:** [Kapitel 3](../mcp-und-schnittstellen/) erklärt MCP und die Schnittstellen, über die Agenten auf Ihre Org zugreifen.
- **Ebene C:** [Kapitel 10](../ki-agenten-in-der-fertigung/) behandelt Agenten im Service, im Außendienst und in der Garantie.
- **Über alle Ebenen:** [Kapitel 6](../entscheidungsmatrix-ki-werkzeuge/) liefert die Entscheidungsmatrix, [Kapitel 7](../kosten-und-token/) die Kosten mit Rechenbeispielen.

Die Übersicht aller Kapitel finden Sie auf der [Startseite der Masterclass](../). Wenn Sie die Ebenen für Ihr eigenes Programm sortieren wollen, ist das ein typischer Einstieg in meine Arbeit zur [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Wer die vier Ebenen trennt und Produktnamen mit Datum verwendet, kann jedes KI-Angebot für Salesforce einordnen, bevor er über Werkzeuge spricht. Wenn Sie dabei eine unabhängige zweite Meinung möchten, [schreiben Sie mir](#contact).
