# Recherche-Dossier: Salesforce Enhanced Chat (v1 und v2)

Stand 31.10.2026. Grundlage für die Blogserie „Salesforce Enhanced Chat für Hersteller“ (Serienplan in `docs/backlog.md`, Abschnitt „Serie Enhanced Chat“). Nur Salesforce-Primärquellen, außer wo ausdrücklich vermerkt. Das Repo ist öffentlich: keine Kundennamen, Preise aus Verträgen oder Projektdetails hier eintragen. Fabians Projekterfahrung kommt erst nach seinen Antworten in die Artikel.

## 1. Begriffe: was heißt was?

Salesforce hat den Kanal mehrfach umbenannt. Für Leser (und für die Suche) muss jeder Artikel das einmal sauber einordnen.

| Begriff | Bedeutung | Quelle |
|---|---|---|
| Chat (Legacy Chat, früher Live Agent, „Embedded Chat“) | Alter, synchroner Web-Chat der Service Cloud. Wartungsmodus, Abschaltung 14.02.2026 | [Trailhead: Explore Enhanced Chat](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat), [Chat REST API Guide](https://developer.salesforce.com/docs/atlas.en-us.live_agent_rest.meta/live_agent_rest) |
| Messaging for In-App and Web (MIAW) | Früherer Name des neuen, asynchronen Kanals | Trailhead: „enhanced Chat (formerly called Messaging for In-App and Web)“ |
| Enhanced Chat (Enhanced Web Chat, Enhanced In-App Chat) | Heutiger Name; Web-Variante und Mobile-SDK-Variante | Trailhead, Help |
| Enhanced Chat v1 | Die erste Client-Oberfläche des Enhanced Web Chat | [Compare v1 to v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) |
| Enhanced Chat v2 | Neue Client-Oberfläche des Enhanced Web Chat, „optimized for modernized features and agentic use cases“ | [What's Enhanced Chat v2?](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5) |

Fabian nennt das Thema „Enhanced Chat 2.0“. Offiziell heißt es **Enhanced Chat v2**. In den Artikeln „Enhanced Chat v2“ verwenden, „Messaging for In-App and Web“ einmal als früheren Namen nennen (Suchbegriff).

Wichtig: v2 ist keine neue Lizenz und kein neuer Kanal, sondern eine neue Oberfläche (Client) für denselben Messaging-Kanal. Help: „Moving your Enhanced Chat deployments from v1 to v2 is optional.“ v2 gilt nur für Enhanced Web Chat, nicht für In-App, WhatsApp, SMS, Facebook Messenger, Apple Messages, LINE oder Bring Your Own Channel.

## 2. Legacy Chat zu Enhanced Chat: was sich grundsätzlich ändert

Quelle: [Trailhead-Modul Migrating from Legacy Chat to Enhanced Chat](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat).

- **Asynchron und dauerhaft:** „Customers can start a conversation, pause it, and pick it back up later“, auch auf anderem Gerät oder Tab.
- **Pre-Chat neu bauen:** „you set up a new pre-chat experience when you migrate“ (Felder, AGB-Zustimmung, Pre-Chat-API).
- **Routing:** über Omni-Channel-Flows statt Code auf der Website.
- **Berichte neu bauen:** neues Objekt Messaging Session Metrics (Antwortzeit, Nachrichtenzahl), AgentWork für Bearbeitungszeit. „be prepared to replace your current reports with new reports.“
- **Lizenz:** Legacy-Chat-Nutzer haben Zugriff auf Enhanced Chat, manche brauchen aber Digital Engagement. Prüfen: Taucht unter Messaging Settings > New Channel „Enhanced Chat“ als Kanaltyp auf? Wenn nicht, „you must upgrade to Digital Engagement“.
- **KI:** Agentforce-Agenten, Zusammenfassungen, klickbare Messaging Components, Dateianhänge.

Die Abschaltung (14.02.2026) liegt hinter uns. Wer heute noch Legacy Chat im Code hat (embedded_svc, Live-Agent-REST), hat ein akutes Problem. Für die Serie: Migration als Rückblick und Checkliste für Nachzügler, Schwerpunkt auf v1 zu v2.

## 3. Enhanced Chat v1 zu v2: was neu ist und was fehlt

Quellen: [What's Enhanced Chat v2?](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5), [Compare v1 to v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5), [Create Customer Chats using Enhanced Chat v2](https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-enhanced-chat.html).

**Neu in v2:**
- Agentforce-Design „modern out of the box“, schnellere Ladezeit des Chatfensters.
- **Custom Lightning Types:** strukturierte Antworten des Agenten als eigene Oberfläche (LWC) im Chat.
- **Token Streaming:** Antworten des Agenten erscheinen Wort für Wort.
- **Agentforce Voice** im Chat (laut Vergleichstabelle; Admin-Blog nennt „Voice for Digital Channels“ GA Q2 2026 für Web-Chat, Apps, WhatsApp, [Quelle](https://admin.salesforce.com/blog/2026/introducing-agentforce-voice)).
- **Context Events API** (`utilAPI.setSessionContext`): aktuelle Seite und Suche an den Agenten.
- **Inline Mode:** Chat in einem `<div>` der Seite statt schwebendem Button.

**In v2 nicht verfügbar (laut Vergleichstabelle, Stand 31.10.2026):**
- Opt-Out-Keywords und Opt-Out-Bestätigung
- Fallback Message
- Tippanzeige („Show Typing Indicators“), Emoji-Tastatur, eigene Enter-Taste-Logik
- Pre-Chat „Every Session“ (nur „Every Conversation“)
- Eigene LWC in der Textblase (Header und Pre-Chat gehen weiter)
- Messaging Components „Time Selector“, „Form“, „Notification“

**Gleich in v1 und v2:** User Verification, reCAPTCHA, Omni-Channel-Routing (Flow, Queue, Agentforce Service Agent), Wartezeit, Auto-Antworten, Inaktivität, Anhänge, Transkript-Download, Branding (Farben, Schriften, Bilder, Fenstergröße), sichtbarer und versteckter Pre-Chat, Custom Labels, Testsimulation, Chat-Einladungen, Sensitive Data Rules, Rich Links, Fragen mit Optionen, Eskalation, Omni Supervisor, Sitzungen über Geräte, REST API.

**Umstellung** ([Create a v2 deployment for an existing channel](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_v2_existing_channel_deployment.htm&type=5)): neues Embedded Service Deployment anlegen (Enhanced Chat, Web), bestehenden Messaging Channel zuordnen, „Switch to v2“, „Switch & Publish“. Berechtigungen Customize Application und Modify Metadata Through Metadata API Functions; Digital Experiences aktiviert. Warnung: „If you deploy both Enhanced Chat v1 and v2 on the same website, messages may fail to appear in the Enhanced Chat v1 version.“ Also nicht beide auf derselben Domain, Lightning Types sind in v1 nicht darstellbar. Nach jedem Test neu veröffentlichen.

Einstieg laut [Switch to Enhanced Chat v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_v2_setup.htm&type=5): neu mit KI-Agenten = Kanal und Deployment anlegen, dann auf v2 schalten; bestehender Kanal = neues Deployment am Kanal, dann auf v2.

Unabhängige Quelle zum Gegenprüfen mit Vorsicht: salesforcechronicles.com vermischt Legacy Chat und v1, nicht zitieren.

## 4. Architektur und Datenmodell

Quelle: [Messaging Object Model](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model.md).

- **MessagingChannel:** der Kanal (z. B. Enhanced Web Chat).
- **MessagingEndUser:** eine Adresse auf einem Kanal; ein Kunde hat pro Kanal einen eigenen Datensatz.
- **MessagingSession:** eine Sitzung, mit der Admins meist arbeiten.
- **Conversation:** Klammer über Sitzungen und Anrufe eines Nutzers auf einem Kanal. „Despite Conversations being stored on platform, they are not available in standard Salesforce reports.“
- **ConversationEntry:** die einzelnen Nachrichten, **off platform** in „a separate, purpose-built database“. Sichtbar über Data Cloud oder eigene APIs.
- **MessagingSessionMetrics:** Antwortzeiten, Nachrichtenzahlen für Berichte.
- **Participant / ConversationParticipant:** Nutzer oder Bot über Interaktionen hinweg.

Konsequenz für Architektur-Artikel: Nachrichteninhalte stehen nicht als normale Datensätze für Berichte und Datenexporte bereit. Auswertung von Chatinhalten (Themen, Häufungen, Qualität) braucht Data Cloud, Transkript-Logik oder Agentforce-Analysen. Offen: Aufbewahrung und Löschung (DSGVO) der Off-Platform-Daten, eigene Quelle suchen („Access Conversation Data“, „On-Platform vs. Off-Platform“).

Weitere Bausteine:
- **Omni-Channel-Flow** als Routing ([Trailhead Agentforce Deployment](https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/set-up-the-messaging-connection)): Inbound-Flow mit Route Work zum Agenten, Fallback-Queue, Outbound-Flow für Eskalation an Menschen. „Escalation is attempted only once per session.“ Agent muss aktiv sein, sonst erscheint er nicht im Flow.
- **Embedded Service Deployment** mit Code-Snippet für Website oder Experience-Cloud-Site.
- **Enhanced Chat API** für eigene Clients ([Overview](https://developer.salesforce.com/docs/service/messaging-api/overview)): Konversationen, Tokens, Nachrichten, Dateien, Push.

## 5. Identität: anonym oder angemeldet

Quelle: [Trailhead: Verify End Users and Share Messaging History](https://trailhead.salesforce.com/content/learn/modules/messaging-optimization-for-in-app-and-web/verify-end-user-share-msg-history).

- User Verification über JWT, geprüft mit JSON Web Keys (Keyset in Setup), am Kanal aktivieren, Token per API übergeben.
- Web, nicht verifiziert: Verlauf verschwindet nach der Token-Laufzeit für nicht verifizierte Nutzer (max. 6 Stunden).
- Web, verifiziert: Verlauf bleibt und ist nach erneuter Anmeldung da, auch geräteübergreifend (App und Web).
- Für Hersteller: Händler- und Kundenportal (Experience Cloud) = verifizierte Nutzer, öffentliche Website = anonym. Zwei Deployments oder ein Kanal mit beiden Fällen? Für die Serie klären.

## 6. Kontext an den Agenten

- **Hidden Pre-Chat** ([Guide](https://developer.salesforce.com/docs/service/messaging-web/guide/pre-chat.html)): `prechatAPI.setHiddenPrechatFields` nach `onEmbeddedMessagingReady`; Beispiel Order_Number, Customer_ID. Werte landen über Parameter Mappings am Messaging Session und im Flow.
- **Context Events (nur v2)** ([Guide](https://developer.salesforce.com/docs/service/messaging-web/guide/context-events.html)): `utilAPI.setSessionContext` mit `_AgentContext` (StructuredValue), nur `currentPage` und `search` (result, filters, facets). Nicht für die Willkommensnachricht, dafür Pre-Chat-Variablen. Variablen im Agentforce Builder anlegen (currentPage, search_result, search_filters, search_facets) mit API-Schreibzugriff. Der Agent verarbeitet den Kontext mit jedem Prompt. `sendTextMessage` setzt Kontext und Nachricht in einem Schritt.
- Für Hersteller: Seriennummer, Maschinentyp, Händlernummer über Hidden Pre-Chat; aktuelle Produkt- oder Ersatzteilseite über Context Events.

## 7. Oberfläche im Chat: Lightning Types, Dateien, Streaming

- **Custom Lightning Types** ([Agentforce Guide](https://developer.salesforce.com/docs/ai/agentforce/guide/lightning-types-custom.html)): Bundle mit `schema.json` (Pflicht), `editor.json`, `renderer.json`; Kanalordner `enhancedWebChat` für Service-Agenten in v2 (Apex-basierte Typen). Ab API 64.0. Beispiele für Hersteller: Ersatzteilkarte mit Bild und Preis, Auftragsstatus, Terminvorschläge.
- **Datei-Upload an Agenten** (Winter '27, [Developer's Guide](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release)): „Service and Employee agents can now accept screenshots, receipts, and PDFs on Enhanced Chat v1, Enhanced Chat v2“, Rollout ab Woche des 21.09.2026; Modi auto, managed, disabled, error; in managed landen Dateien in `@system_variables.uploaded_files`. Für Hersteller: Foto vom Typenschild oder Schaden.
- **Token Streaming** ([Messaging API](https://developer.salesforce.com/docs/service/messaging-api/references/about/server-sent-events-payloads-token-streaming.html)): ab CapabilitiesVersion 63; Tokens mit sequenceNumber, Validierung durch den Trust Layer erst am Ende („UNGROUNDED“), Client kann gestreamten Text wieder entfernen. Interessant für den Artikel zu Vertrauen und Halluzinationen (verlinkt [Einstein Trust Layer](../../../src/content/blog/de/einstein-trust-layer-was-er-schuetzt.md)).

## 8. Einbettung, Sprachen, Branding

- **Inline Mode** ([Guide](https://developer.salesforce.com/docs/ai/agentforce/guide/enhanced-chat-inline-mode.html)): `displayMode = 'inline'`, `targetElement`, optional `headerEnabled = false`. Chat füllt den Container komplett. Konsole warnt bei falscher Kombination.
- **Experience Cloud:** Snippet in den Head Markup der Site; bei Domainwechsel Trusted Domains für Inline Frames anpassen.
- **Sprachen:** Custom Labels für den Chat (v1 und v2), Übersetzung eigener LWC ([Guide](https://developer.salesforce.com/docs/service/messaging-web/guide/custom-lwc-translations.html)); Agentensprache über Pre-Chat-Feld und Standardsprache (siehe bestehender Artikel `mehrsprachige-agentforce-agenten-export`); Real-Time Translations für Menschen im Chat (Agentforce for Service SKU, bis 10 Sprachen eigene Terminologie). Backlog-Thema B2 „Embedded Chat für 12 Sprachen“ geht in diesem Teil auf.

## 9. Betrieb, Grenzen, Kosten

- **Rate Limits** ([Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_rate_limits.htm)): Access Token und Renew je 200 pro Minute und Org; Start Conversation 3 pro Seite je 30 Sekunden; 22 Nachrichten pro Konversation und Minute; 12 Dateien pro Konversation und Minute; Transkript-Download 3 pro Konversation und Stunde.
- **Kennzahlen:** MessagingSessionMetrics, AgentWork, Omni Supervisor; für den Agenten siehe `agentforce-kennzahlen-nach-go-live`.
- **Lizenzen:** Enhanced Chat ist bei Legacy-Chat-Kunden teils enthalten, sonst Digital Engagement bzw. Contact Center Digital (Listenpreis laut [Salesforce-Preisseite](https://www.salesforce.com/service/digital-customer-engagement-platform/pricing/?bc=SOC) 75 EUR pro Nutzer und Monat, jährlich; Stand 31.10.2026, vor Veröffentlichung neu prüfen). Agentforce-Kosten über Flex Credits (bestehende Artikel `flex-credits-agentforce-kosten-pro-aktion`, `digital-wallet-agentforce-kostenkontrolle`).

## 10. Bestehende Artikel, die die Serie verlinkt (nicht doppeln)

- `einstein-bots-agentforce-umstellen` (Bot auf Agentforce, Legacy-Chat-Ende)
- `mehrsprachige-agentforce-agenten-export` (Sprachen des Agenten)
- `agentforce-agent-api-eigene-apps` (Agent API vs. Enhanced Chat v2)
- `manufacturing-cloud-kundenportal` (Experience-Cloud-Portal)
- `einstein-trust-layer-was-er-schuetzt`, `agentforce-agenten-testen-freigeben`, `agentforce-kennzahlen-nach-go-live`, `flex-credits-agentforce-kosten-pro-aktion`, `ersatzteile-seriennummer-ki-agent`, `service-cloud-casey-und-service-rep-assistant`

## 11. Lücken in der Recherche

- Release, in dem v2 GA wurde, steht auf keiner der gelesenen Seiten. In den Release Notes (Summer '26 / Winter '27) suchen; bis dahin kein Datum nennen.
- Required Editions von v2 sind auf der Help-Seite nur verlinkt.
- Aufbewahrung und Löschung der Off-Platform-Konversationsdaten.
- Help-Artikel „Connect a Service Agent to Enhanced Chat v2“ war nicht abrufbar (Seite lädt nur per JavaScript); Inhalt im Browser prüfen.
- Keine Suchvolumen-Daten. Vorschlag Keyword-Lauf (`keyword-research.yml`): seeds „salesforce enhanced chat“, „enhanced chat v2“, „messaging for in-app and web“, „salesforce chat migration“, „salesforce live chat“, „salesforce chatbot website“.
