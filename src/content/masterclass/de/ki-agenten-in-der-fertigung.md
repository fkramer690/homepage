---
title: "KI-Agenten in der Fertigung: was heute trägt"
description: "Welche Agentforce-Agenten Hersteller heute nutzen können, wie Regeln, Tests und Sicherheit aussehen und was Siemens und andere Referenzen wirklich zeigen."
lang: de
slug: ki-agenten-in-der-fertigung
translationKey: masterclass-10
chapter: 10
short: "Agenten in der Fertigung"
summary: "Wo Agentforce-Agenten bei Herstellern heute tragen, wie Sie sie regelbasiert bauen, testen und absichern, und was erst angekündigt ist."
takeaways:
  - "Agenten tragen in der Fertigung heute dort, wo Volumen hoch, Regeln klar und Daten gepflegt sind: Händleranfragen zum Auftragsstatus, Wartungsbuchung im Außendienst und die Vorprüfung von Garantieansprüchen."
  - "Salesforce Architects empfiehlt, alles in Logik zu schreiben, was sich als Code ausdrücken lässt; Kreditlimit und Garantieberechtigung entscheiden Agent Script, Flow oder ERP, das Modell versteht und formuliert."
  - "Ein Agent geht wie Code in Produktion: als Metadaten in Git, mit Testfällen, einer vorab vereinbarten Passrate und Monitoring der Sitzungen nach dem Go-live."
  - "Jedes Feld, das Händler, Kunden oder Interessenten beschreiben, ist nicht vertrauenswürdige Eingabe für einen Agenten, und jede verbundene App ist ein Zugang, den Sie wie ein Passwort schützen."
  - "Bei Siemens sind laut Meldung vom September 2026 zwei Agenten für eingehende Leads live; Teamcenter, Lieferanten-Onboarding und SAP-Schritte stehen in der Zukunftsform."
articles: [agent-script-deterministic-rules, warranty-adjudication-agent-winter-27, field-service-ai-agents-today, agentforce-sap-order-status, prompt-injection-dealer-portals, oauth-connected-apps-ai-lessons]
faq:
  - q: "Welcher Agent ist für einen Maschinenbauer der beste Einstieg?"
    a: "Meist der Agent für Händleranfragen zu Auftragsstatus und Lieferterminen oder die proaktive Wartungsbuchung im Außendienst. Beide haben hohes Volumen und klare Regeln. Die Garantie-Vorprüfung folgt, sobald Anlagen mit Seriennummer und Garantiebeginn vollständig in Salesforce stehen."
  - q: "Brauche ich für Agenten in der Fertigung die Manufacturing Cloud?"
    a: "Für die Fertigungsvorlagen und die Garantieagenten ja, Salesforce führt sie bei Manufacturing Cloud und Agentforce for Manufacturing. Ein Agent, der den Auftragsstatus über eine MuleSoft-API aus SAP liest, lässt sich auch in Service Cloud bauen."
  - q: "Wie verhindere ich, dass ein Agent über ein Händlerportal manipuliert wird?"
    a: "Behandeln Sie jedes Freitextfeld aus Portal, Formular oder E-Mail als nicht vertrauenswürdig, erzwingen Sie Trusted URLs und geben Sie dem Agenten einen Nutzer mit minimalen Rechten. Entscheidungen mit Geldwert gehören in deterministische Logik, die kein Freitext umstimmen kann."
  - q: "Was kostet ein Agent in der Fertigung im Betrieb?"
    a: "Agentforce rechnet pro Aktion ab: 20 Flex Credits in Produktion, 16 in der Sandbox. Bei 500 € je 100.000 Credits sind das 0,10 € pro Aktion. Dazu kommen Data 360 für Dokumente, Integrationsarbeit und für manche Funktionen Lizenzen pro Nutzer."
draft: false
---

KI-Agenten in der Fertigung tragen heute dort, wo ein Prozess viel Volumen, klare Regeln, gepflegte Anlagendaten und einen Zugang zum ERP hat: Händleranfragen zu Auftragsstatus und Lieferterminen, die Buchung geplanter Wartungen im Außendienst und, sobald die installierte Basis stimmt, die Vorprüfung von Garantieansprüchen. Gebaut werden sie nach einer Regel: Entscheidungen in Logik, Sprache ins Modell. Sie gehen wie Code mit Tests in Produktion, und jedes Feld, das ein Händler beschreibt, gilt als fremde Eingabe. Vieles Angekündigte, auch bei Siemens, ist noch nicht live.

## Welche Agenten gibt es für Hersteller heute?

Salesforce liefert für die Fertigung drei Gruppen von Bausteinen: Vorlagen aus Agentforce for Manufacturing, Agenten in der Manufacturing Cloud und Agentenfunktionen in Field Service. Stand 27. Oktober 2026, gestützt auf die verlinkten Seiten.

| Bereich | Funktion | Status |
|---|---|---|
| Absatzplanung | Abweichungen zwischen Bauplan und Absatz erkennen, Kundenbesuch mit Gesprächspunkten planen | [verfügbar seit August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) |
| Bestand | Bestand im Kundengespräch prüfen, Nachschub über Distributoren anstoßen | verfügbar seit August 2025 |
| Anlagenservice | Wartungsbedürftige Anlagen finden, Reparaturangebot und Work Order entwerfen | verfügbar seit August 2025 |
| Händlervertrieb | Channel Management | für Oktober 2025 als GA vorgesehen |
| Garantie | AI Warranty Concierge führt Kunden durch einen Anspruch | [Summer '26](https://www.salesforce.com/manufacturing/cloud/) |
| Händlervertrieb | AI Partner Sales Assistant findet Produkte und baut Angebote | Summer '26 |
| Garantie | Warranty Claims Adjudication Agent prüft die Deckung und markiert mögliche Betrugsfälle | Teil des Releases Winter '27, das am [12. Oktober 2026 GA](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) wurde; eigener Status für den Agenten nicht genannt |
| Vertrieb | AI Sales Concierge findet Produkte und baut Angebote für Besucher im Self-Service | Winter '27 |
| Außendienst | Proaktive Wartungsbuchung anhand der Termine aus dem Maintenance Plan | [angekündigt im Mai 2025](https://www.salesforce.com/blog/proactive-maintenance/), kein GA-Datum gefunden |
| Sprache | Agentforce Voice auf Deutsch | [GA seit Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) |
| Altsysteme | Systems Integration Agent lernt browserbasierte Anwendungen und arbeitet laut Salesforce ohne Code, APIs oder RPA | GA seit Dreamforce 2026 |

Zur Lizenz: Laut [Seite der Manufacturing Cloud](https://www.salesforce.com/eu/manufacturing/cloud/), die Euro-Listenpreise ausweist, enthalten nur die Max-Editionen den vollen Umfang von Agentforce for Industries, zu 650 € (Sales Max oder Service Max) oder 700 € (Sales & Service Max) pro Nutzer und Monat bei Jahresvertrag. Die Core-Editionen bringen Flex Credits für KI mit. Neue Preise für die Industries-Editionen hat Salesforce am 3. September 2026 für [„later this fall“](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) angekündigt. Eine eigene Lizenzangabe für den Garantie-Prüfagenten habe ich in den Quellen, die ich öffnen konnte, nicht gefunden.

Ich sortiere diese Liste für einen Maschinenbauer nach drei Fragen: Wie viele gleichartige Vorgänge gibt es im Monat, wo steht die Regel, und sind die Daten dahinter gepflegt? Daraus ergibt sich meist diese Reihenfolge: zuerst Auftragsstatus für Händler und geplante Wartungen, dann der Einsatzbericht, dann die Garantie. Welche Field-Service-Funktionen sich lohnen, steht in [KI-Agenten im Außendienst](../../../blog/ki-agenten-aussendienst-field-service/), was vor dem Garantieagenten stehen muss, in [Garantie-Prüfagent aus Winter '27](../../../blog/garantie-pruefagent-winter-27/). Ob ein Agent überhaupt der nächste Schritt ist, prüfe ich mit den Kriterien aus [Agentforce für Hersteller: jetzt starten oder warten?](../../../blog/agentforce-ja-oder-nein-hersteller/). Wie Sie Agenten im Außendienst Schritt für Schritt einführen, steht in [Kapitel 5 der Masterclass Field Service](../../field-service/field-service-ki-agenten-einfuehrung/).

## Wie baut man einen Agenten, der gleich antwortet?

Im früheren Agentforce traf das Sprachmodell jede Entscheidung zur Laufzeit, von der Absicht bis zur Auswahl der Aktion. Gleiche Eingaben konnten unterschiedliche Wege nehmen. Für eine Garantieablehnung, die ein Händler anficht, ist das unbrauchbar. Seit Februar 2026 ist das neue Agentforce mit hybridem Reasoning allgemein verfügbar, und Salesforce Architects formuliert die Regel dazu im [Leitfaden zu Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script): „if you can express a decision as code, it should be written as logic.“

Agent Script ist die deklarative Sprache, in der ein Agent beschrieben wird. Logikanweisungen laufen als Code ohne Modellaufruf, Prompt-Anweisungen interpretiert das Modell. Eine Aktion mit `available when`-Bedingung verschwindet aus der Werkzeugliste des Modells, solange die Bedingung falsch ist. Ein Händler über dem Kreditlimit bekommt also keinen Auftrag, egal wie er fragt. Wie Gates, `before_reasoning` und Eskalation zusammenspielen, beschreibe ich in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../../../blog/agent-script-regeln-statt-llm/).

In der Fertigung haben die meisten Regeln schon ein Zuhause, und der Agent sollte dort nachfragen, statt sie nachzubauen:

| Schicht | Systeme | Aufgabe des Agenten | Anbindung |
|---|---|---|---|
| Front Office | Manufacturing Cloud, Service Cloud, Field Service | Händleranfragen, Angebote, Garantie, Einsatzplanung | nativ, Regeln in Agent Script, Flow und Business Rules Engine |
| Back Office | SAP S/4, proALPHA | Auftragsstatus, Verfügbarkeit, Kreditstatus lesen | MuleSoft-API, [in den API Catalog synchronisiert](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), als Agenten-Aktion |
| Engineering | PLM, etwa Teamcenter | Ersatzteile zur Seriennummer, technisch gültige Upgrades | API; bei Siemens angekündigt |
| Altsysteme | ERP oder MES ohne API | Aufträge aus PDF erfassen | MuleSoft IDP mit RPA, Dokumente unter [80 Prozent Konfidenz gehen an Menschen](https://admin.salesforce.com/blog/2025/automate-order-entry-with-flow-mulesoft-agentforce-automate-with-agentforce), oder der Systems Integration Agent |

Beim Weg über den API Catalog legt Salesforce Named Credentials und External Services automatisch an. Eine offizielle Referenzarchitektur speziell für Agentforce mit SAP S/4HANA habe ich nicht gefunden; das Muster stammt aus allgemeiner MuleSoft-Dokumentation. Wie das für den Auftragsstatus aussieht und was dabei deterministisch bleibt, steht in [Agentforce und SAP-Auftragsstatus](../../../blog/agentforce-sap-auftragsstatus/), die Optionen ohne Schnittstelle in [altes ERP ohne API](../../../blog/altes-erp-ohne-api-ki-agenten/).

Für Wissen aus Handbüchern und Wissensartikeln braucht der Agent Grounding über Data 360. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud) ist die Agentforce Data Library der schnelle Weg, aber auf unstrukturierte Inhalte und eine Quelle pro Bibliothek begrenzt. Mehrere Quellen, strukturierte Daten und Zero Copy brauchen das erweiterte Data-360-Setup. Im Maschinenbau gibt es Handbücher je Variante und Stand, und bevor sie verarbeitet werden, sollte feststehen, welches Handbuch zu welcher Seriennummer gehört. Die Verarbeitung kostet laut [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) in der Basisstufe 150 Flex Credits pro MB; die Rechnung steht in [Kapitel 7](../kosten-und-token/).

## Wie kommt ein Agent sicher in Produktion?

Ein Agentforce-Agent ist heute ein Satz Metadaten, den ein Coding-Agent mitschreiben kann. Der [Entwickler-Blog vom Juni 2026](https://developer.salesforce.com/blogs/2026/06/master-the-agentic-development-lifecycle-for-agentforce) beschreibt den Weg so:

| Phase | Was passiert | Werkzeug |
|---|---|---|
| Entwurf | Subagenten im Plan-Modus eines Coding-Agenten entwerfen; Datenmodell, Aktionen und Rechte entscheidet ein Mensch | z. B. Claude Code mit den Salesforce-Skills |
| Bau | Agent Script als AiAuthoringBundle erzeugen und lokal validieren | `sf agent generate authoring-bundle`, `sf agent validate authoring-bundle` |
| Test | Smoke-Test per Vorschau, Regression aus YAML-Testfällen; das erwartete Ergebnis bewertet ein Modell als Prüfer | `sf agent preview`, `sf agent test run` |
| Release | Deploy, als inaktive Version veröffentlichen, aktivieren, in Git versionieren | `sf agent publish authoring-bundle`, `sf agent activate` |
| Betrieb | Sitzungen im Session Trace Data Model in Data 360 auswerten | Skill observing-agentforce |

Für Entscheider folgt daraus: Ein Agent ist ein Release-Artefakt wie Apex. Er gehört in dieselbe Pipeline mit Review und Freigabe, und Änderungen direkt im Builder der Produktivorg würde ich vertraglich ausschließen. Weil ein Modell die Antwortqualität bewertet, schwankt das Ergebnis zwischen Läufen. Der Go-live braucht deshalb eine vorab vereinbarte Passrate, und Salesforce nennt keine. Meine Aufteilung nach Risiko, mit 100 Prozent für Geschäftsregeln, steht in [Agentforce-Agenten testen und freigeben](../../../blog/agentforce-agenten-testen-freigeben/).

Zur Dreamforce 2026 kamen Werkzeuge für den Betrieb dazu: Agent Health Monitoring mit mehr als 16 Metriken ist GA, Agent Optimizer war für Oktober als GA vorgesehen, A/B-Experimente (ab Oktober) sowie Voice- und Conversation-Testing sind Beta. Wer einen deutschsprachigen Sprachagenten plant, testet die Sprachseite also noch mit Beta-Werkzeugen. Das würde ich in Zeitplan und Abnahme einrechnen. Welche automatischen Prüfungen für Code gelten, steht in [Kapitel 8](../best-practices-ki-code/).

## Welche Sicherheitsrisiken bringen Agenten mit?

Zwei Vorfälle aus 2025 zeigen, wo die Angriffsfläche liegt:

| Vorfall | Was geschah | Lehre |
|---|---|---|
| [ForcedLeak](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html), CVSS 9,4, veröffentlicht im September 2025 | Versteckte Anweisungen im Beschreibungsfeld eines Web-to-Lead-Formulars; Agentforce schickte Lead-Daten als Bildanfrage an eine abgelaufene, für rund 5 US-Dollar kaufbare Domain auf der Allowlist | Felder, die Fremde beschreiben, sind nicht vertrauenswürdige Eingabe; Salesforce erzwingt seitdem eine Trusted-URL-Allowlist |
| [Salesloft Drift](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html), 8. bis mindestens 18. August 2025 | Gestohlene OAuth- und Refresh-Tokens einer KI-Chat-App; Abfragen auf Cases, Accounts, Users und Opportunities, Suche nach AWS-Schlüsseln und Passwörtern; laut Google mehr als 700 möglicherweise betroffene Organisationen | Verbundene Apps sind Zugänge mit hohem Wert; Scopes begrenzen, Tokens rotieren, keine Secrets in CRM-Datensätzen |

Bei Herstellern sind diese Felder zahlreich: Web-to-Lead, Händlerportale auf Experience Cloud, Email-to-Case, die Fehlerbeschreibung im Garantieantrag, Uploads von Distributoren. Mit MCP-Servern, Salesforce in Claude und Drittagenten wächst außerdem die Zahl der OAuth-Zugänge, also genau die Art Zugang, die bei Drift missbraucht wurde. Meine Mindestliste vor dem ersten Agenten:

1. **Eigener Nutzer pro Agent und Integration** mit minimalen Rechten. Hosted MCP führt jeden Aufruf mit den Rechten des Nutzers aus, der die Verbindung autorisiert hat, laut [Sicherheitsseite](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html). Ein Admin hat dort nichts zu suchen.
2. **Lesende Server zuerst**, etwa sobject-reads, schreibende Werkzeuge erst nach Freigabe.
3. **Trusted URLs erzwingen** und die Allowlist regelmäßig auf abgelaufene Domains prüfen.
4. **Keine Secrets in Datensätzen**, Tokens verbundener Apps behandeln wie Passwörter.
5. **API-Logs überwachen**; MCP-Zugriffe lassen sich über `API_CLIENT_CATEGORY` = `SALESFORCE_HOSTED_MCP` filtern.
6. **Entscheidungen mit Geldwert hinter `available when`**, damit kein Freitext eine Gutschrift auslöst.

Die Sicherheitsseite für Hosted MCP erwähnt Prompt Injection und IP-Restriktionen nicht. Diese Lücke muss Ihr Architekt schließen. Die Details stehen in [Prompt Injection im Händlerportal](../../../blog/prompt-injection-haendlerportal-agentforce/) und [Connected Apps und OAuth bei KI-Integrationen](../../../blog/connected-apps-oauth-ki-integrationen/), die Schnittstellen selbst in [Kapitel 3](../mcp-und-schnittstellen/).

## Was zeigen die Referenzen aus der Industrie?

**Siemens** ist die sichtbarste Industriereferenz. Laut [Meldung vom 15. September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) arbeiten ein Engagement- und ein Qualifizierungsagent in Sales Cloud und leiten eingehende Leads an 18.000 Vertriebsmitarbeitende weiter. Vorher kamen jeden Monat mehr als 2.500 unqualifizierte Leads an, heute spricht Siemens alle eingehenden Leads aus 132 Ländern an. Teamcenter „will work with Agentforce“, ein SDR-Agent für Distributoren, Slackbot für das Lieferanten-Onboarding und Agentforce Operations für die letzten Schritte in SAP stehen ebenfalls in der Zukunftsform. Roland Busch spricht von einem „virtual engineer in the hands of service technicians and salespersons“. Wer intern mit „Siemens macht das schon“ argumentiert, sollte die Zeitform der Meldung lesen.

**Brenntag**, ein Chemiedistributor und kein Hersteller im engeren Sinn, war im [November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html) der erste Agentforce-Kunde in Deutschland. Die Agenten beantworten Auftrags- und Produktfragen rund um die Uhr, zunächst als Pilot für ausgewählte Kunden und Lieferpartner. Kennzahlen hat Brenntag nicht veröffentlicht.

**JPW Industries**, ein US-Hersteller, wird in der Ankündigung von Agentforce for Manufacturing zitiert: Manuelle Aufträge dauerten 16 bis 24 Stunden, mit Agentforce weniger als eine Stunde, und die Fallbearbeitung wurde trotz 15 Prozent mehr Arbeit um fast 40 Prozent schneller. Das ist eine Kundenaussage in einer Salesforce-Meldung.

Eine Fallstudie aus dem deutschsprachigen Raum mit harten Kennzahlen zu Service, Garantie oder Außendienst habe ich nicht gefunden. Auch die Marktzahlen brauchen eine Fußnote: Salesforce meldet für das Quartal bis Juli 2026 mehr als 1,5 Mrd. US-Dollar Agentforce-ARR, zählt dort aber [seit diesem Quartal](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx) auch Slackbot, KI-Angebote und Headless 360 mit. Und Gartner [erwartet](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), dass mehr als 40 Prozent der Projekte mit KI-Agenten bis Ende 2027 abgebrochen werden, wegen Kosten, unklarem Nutzen oder schwacher Risikokontrollen.

## Ein typisches Szenario: Fahrplan für einen Maschinenbauer

Nehmen wir einen Maschinenbauer mit SAP S/4 und vorhandener MuleSoft-API, Service Cloud, Field Service mit 45 Technikern und rund 200 Händlern, die über ein Portal bestellen. Die Manufacturing Cloud wird gerade eingeführt. Alle Umstände und Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

```schritte
Händleragent für Auftragsstatus | Quartal 1
  Der Agent liest Auftrag und Liefertermin über die MuleSoft-API. In `before_reasoning` steht fest, dass ein Händler nur die eigenen Aufträge sieht. Vor dem Go-live laufen 150 Testfälle aus echten, anonymisierten Anfragen, darunter Fragen nach fremden Aufträgen und Freitext mit versteckten Anweisungen. Der Entscheidungstermin nach acht Wochen ist vorab vereinbart.
Datenarbeit und Inventur | parallel · IT
  Die IT gleicht die installierte Basis mit SAP ab, bis Seriennummer und Garantiebeginn pro Maschine stehen, und listet alle verbundenen Apps mit ihren Scopes.
Wartungsbuchung | Quartal 2
  Der Agent bucht Wartungen für Kunden mit gepflegten Stillstandsfenstern. Für alle anderen schlägt er Termine vor und übergibt an die Disposition.
Garantie-Vorprüfung | Quartal 3 und 4
  Erst wenn die Anlagendaten stimmen, prüft der Agent die Deckung. Die Regel bleibt im Expression Set, Beträge über der vereinbarten Grenze und jeder Betrugsverdacht gehen an einen Sachbearbeiter.
```

**Bewusst nicht im Plan:** Fehlersuche bei Sondermaschinen, solange Handbücher keiner Seriennummer zugeordnet sind, und Agenten in SAP-Prozessen, die das ERP heute selbst entscheidet.

Am Ende des Jahres laufen drei Agenten, alle mit denselben Regeln: eigener Nutzer, Regeln in Logik, Tests vor jeder Änderung.

## Was kommt bis 2028?

```zeitleiste
2026-12-02 | EU AI Act: Kennzeichnung für generative Systeme, die vor dem 2. August 2026 auf dem Markt waren
2027-12-02 | EU AI Act: Hochrisiko-Pflichten nach Anhang III
2028-08-02 | EU AI Act: Hochrisiko-Pflichten nach Anhang I, KI als Sicherheitsbauteil in Produkten
```

- **Long-Horizon-Agenten**, die ein Ziel über Tage oder Wochen verfolgen, sind noch im Pilot.
- **Koa**, Salesforces erstes CRM-Reasoning-Modell auf NVIDIA Nemotron, soll im Winter 2026 GA werden, [zuerst in US-Regionen](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx). Für Orgs in der EU ist es vorerst kein Thema.
- **Headless Platform Interactions**, der Zähler für agentische API- und MCP-Zugriffe, steht auf der Rate Card noch als „TBA“. Greifen externe Agenten auf Salesforce zu, wird das ein Budgetposten, beschrieben in [MCP-Zugriffe als Budgetrisiko](../../../blog/mcp-zugriffe-salesforce-budgetrisiko/).
- **EU AI Act:** Die Fristen in der Zeitleiste folgen laut [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act) aus der Verordnung (EU) 2026/1744. Für Maschinenbauer betrifft Anhang I eher die Maschine als den CRM-Agenten. Was das für Agentforce-Projekte heißt, steht in [EU AI Act: Fristen für Agentforce](../../../blog/eu-ai-act-fristen-agentforce/) und in [Kapitel 9](../teamarbeit-und-delivery/).

Welche Regeln in Ihren Agenten gehören und welche im ERP bleiben, kläre ich auf Kundenseite in der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/), die ERP-Anbindung in [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/). Alle Kapitel finden Sie in der [Übersicht der Masterclass](../).

Starten Sie mit dem Agenten, dessen Regeln und Daten schon stehen, und behandeln Sie ihn vom ersten Tag an wie Code mit Tests und eigenen Rechten. Wenn Sie eine zweite Meinung zu Ihrem Fahrplan möchten, [schreiben Sie mir](#contact).
