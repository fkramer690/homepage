---
title: "B2B Commerce: Agenten, Migration und Einführung"
description: "Buyer Agent und Merchandising Agent im B2B-Shop, der Umstieg von Aura auf LWR, die Einführung bei Händlern in Wellen, Kennzahlen und Betrieb nach dem Go-live."
lang: de
slug: agentforce-migration-einfuehrung
course: b2b-commerce
translationKey: commerce-05
chapter: 5
pubDate: 2026-10-28
short: "Agenten, Migration, Einführung"
summary: "Buyer Agent und Merchandising Agent, der Weg von Aura zu LWR und die Einführung bei Händlern in Wellen."
takeaways:
  - "Agenten kommen nach einem Shop, der funktioniert: Der Buyer Agent beantwortet Händlerfragen aus Katalog, Preisen und Aufträgen des Shops und macht Fehler in diesen Daten nur schneller sichtbar."
  - "Den Buyer Agent führt Salesforce seit Juni 2026 als allgemein verfügbar; den kompletten Auftrag im Chat mit Zahlung zum Vertragspreis datiert Salesforce als Carter für Käufer auf Januar 2027."
  - "Vertragspreise, Kreditlimits und Liefertermine kommen aus Shop-Preisfindung und ERP, nie aus dem Sprachmodell, und jede Händlernachricht ist nicht vertrauenswürdige Eingabe."
  - "Für Aura-Stores gibt es bis zum 27. Oktober 2026 kein Abschaltdatum. Migrieren Sie auf LWR, wenn Funktionen, wachsender Aura-Code oder ein neuer Checkout es verlangen."
  - "Führen Sie den Shop in Wellen nach Buyer Group ein und messen Sie je Welle den Anteil der Auftragspositionen über den Shop, Suchen ohne Treffer und Innendienstminuten pro Position."
articles: [commerce-buyer-agent-whatsapp, commerce-merchandising-agent, commerce-aura-to-lwr-migration, commerce-dealer-rollout, commerce-kpis-after-go-live, prompt-injection-dealer-portals, multilingual-dealer-agents, distributor-replenishment-agent]
faq:
  - q: "Sollte ein Hersteller den B2B-Shop gleich mit Buyer Agent starten?"
    a: "Ich rate davon ab. Der Agent antwortet aus Katalog, Berechtigungen, Preisen und Aufträgen des Shops. Stimmen diese Daten noch nicht, sehen Händler die Fehler im Chat statt auf der Produktseite. Starten Sie den Shop, prüfen Sie die erste Welle und ergänzen Sie dann Auftragsstatus und Nachbestellung im Chat."
  - q: "Muss ich einen Aura-B2B-Store bald auf LWR umstellen?"
    a: "Eine Frist gibt es nicht. Bis zum 27. Oktober 2026 steht der Aura-Store nicht auf der Liste der aktiven Abkündigungen, und der Migrationsleitfaden nennt kein Datum. Salesforce empfiehlt LWR für neue Stores. Entscheiden Sie nach Funktionen, die Sie brauchen, und nach dem Umfang Ihres eigenen Aura-Codes."
  - q: "Wie lange dauert die Einführung eines B2B-Shops bei Händlern?"
    a: "Das hängt von Händlerzahl, Preislogik und Datenqualität ab. Als Annahme für einen Hersteller mit rund 250 Händlern in drei Ländern plane ich drei Wellen über sechs Monate, mit zwei Wochen Pause zwischen den Wellen für Korrekturen und Tests der nächsten Gruppe."
  - q: "Was kostet der Buyer Agent zusätzlich zum Shop?"
    a: "Einen eigenen Preis veröffentlicht Salesforce nicht. Trailhead nennt als Voraussetzung unter anderem Service Cloud oder Sales and Service Edition, die Add-ons Agentforce und Einstein for Service und Data 360. Fragen Sie, wie Agentennutzung in Ihrem Vertrag gezählt wird, und rechnen Sie mit Ihrer Zahl an Händlergesprächen."
draft: false
---

Agenten gehören in einen B2B-Shop, der schon funktioniert. Der Buyer Agent beantwortet Händlerfragen zu Produkten, Auftragsstatus und Nachbestellung aus den Daten des Shops, der Merchandising Agent hilft beim Pflegen von Suche, Aktionen und Käufer-Accounts. Preise, Kredit und Liefertermine kommen weiter aus Code und ERP. Einen Aura-Store migrieren Sie auf LWR, wenn Funktionen oder wachsender eigener Code es verlangen, denn ein Abschaltdatum gibt es nicht. Eingeführt wird in Wellen nach Buyer Group, mit Pilothändlern zuerst. Gemessen wird je Welle, und drei Salesforce-Releases im Jahr verlangen feste Regressionstests für Suche, Warenkorb und Checkout.

## Wo steht der Shop nach den ersten vier Kapiteln?

Dieses Kapitel setzt voraus, was die vorigen beschrieben haben: eine Entscheidung für Salesforce B2B Commerce aus [Kapitel 1](../b2b-commerce-lohnt-sich-ueberblick/), einen Katalog mit Buyer Groups und Entitlements, Kundenpreisen und einem Checkout auf Rechnung und eine ERP-Anbindung, die in [Kapitel 4](../erp-integration-bestand-auftraege/) festlegt, was live abgefragt wird und wem der Auftrag gehört. Salesforce vermarktet das Produkt inzwischen auch als [„Agentforce Commerce for B2B“](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Der neue Name zeigt, wohin Salesforce die Entwicklung lenkt.

Meine Reihenfolge für den Rest ist trotzdem nüchtern: erst der Shop bei den ersten Händlern, dann Kennzahlen, dann Agenten. Ein Agent liest dieselben Buyer Groups, Preisbücher und Order Summaries wie die Storefront. Ist ein Entitlement falsch, zeigt er das falsche Teil im Chat, nur schneller und überzeugender formuliert.

## Was leisten Buyer Agent und Merchandising Agent heute?

Salesforce bietet für B2B Commerce zwei Arten von Agenten an. Der eine spricht mit Händlern, der andere arbeitet für das Team, das den Shop betreibt.

### Buyer Agent für Händler

Der Buyer Agent wird aus der Vorlage „Buyer Agent (B2B)“ angelegt. Laut Trailhead sucht er Produkte nach Name, Kategorie oder Spezifikation, zeigt frühere und laufende Aufträge mit Status und bestellt nach, indem er einen früheren Auftrag kopiert. Der [Salesforce-Beitrag vom Juni 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) führt ihn unter „GA June 2026“ und nennt WhatsApp und SMS als Kanäle. Den vollständigen Auftrag im Chat, mit Bestätigung und Zahlung zum Vertragspreis, datiert die [Innovationsseite zu Commerce](https://www.salesforce.com/de/commerce/innovations/) unter dem Namen Carter für Käufer auf Januar 2027.

Die Voraussetzungen sind umfangreicher, als der Name vermuten lässt. Trailhead nennt Agentforce Commerce for B2B, Service Cloud oder Sales and Service Edition, die Add-ons Agentforce und Einstein for Service sowie Einstein generative AI mit Data 360. Wer neben dem Shop nur Sales Cloud betreibt, kauft also mehr als einen Agenten. Einen eigenen Preis für den Buyer Agent habe ich auf den offiziellen Seiten nicht gefunden. Wie Sie Agentenkosten trotzdem abschätzen, steht im KI-Kapitel [Kosten und Token](../../ki-salesforce/kosten-und-token/). Subagenten, Kanäle und Lizenzen im Detail beschreibe ich in [B2B Buyer Agent: Bestellen per WhatsApp und SMS](../../../blog/b2b-buyer-agent-whatsapp-bestellen/).

Für Händler im Export kommt die Sprache dazu. Welche Sprachen Agentforce-Agenten beherrschen, was Übersetzung kostet und wie Sie Wissen pro Sprache pflegen, steht in [Mehrsprachige Agentforce-Agenten für Händler im Export](../../../blog/mehrsprachige-agentforce-agenten-export/). Prüfen Sie für den Buyer Agent selbst, welche Sprachen für Ihre Händlerländer freigegeben sind.

### Merchandising Agent für das Shop-Team

Die [Preisseite für B2B](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) führt Merchant Agent in Growth und Advanced unter Agentforce. Den Merchandising Agent für B2B datiert die Innovationsseite auf August 2026: Er hebt Produkte in der Suche hervor oder stuft sie herab, legt Produkte an und verwaltet Käufer-Accounts im Gespräch. Die [Trailhead-Einheit zu den Merchandising-Skills](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) ergänzt Zusammenfassungen von Bestellwert und Conversion und Aktionen aus Vorlagen, die ein Mensch vor dem Einsatz prüft.

Im Ersatzteilkatalog ist Boost und Bury der nützliche Teil: ersetzte Teilenummern nach unten, Nachfolgeteil und Reparatursätze nach oben. Die [Suchgrenzen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) erlauben 100 Boost-und-Bury-Regeln pro Shop, egal ob ein Mensch oder ein Agent sie anlegt. Materialnummer, Einheit und Vertriebsstatus bleiben in ERP oder PIM. Meine Regeltabelle, was der Agent ändern darf und was nicht, steht in [Merchandising Agent: Was er im Teilekatalog leistet](../../../blog/merchandising-agent-teilekatalog/).

## Warum darf der Agent keinen Preis erfinden?

Für einen Hersteller ist der Vertragspreis die heikelste Zahl im ganzen Chat. Er kommt aus der Preisfindung des Shops, die Preisbücher liest oder das ERP aufruft, wie in [Kapitel 3](../preise-warenkorb-checkout/) beschrieben. Dasselbe gilt für Kreditlimit, gesperrte Kunden und bestätigte Liefertermine. Das Sprachmodell versteht die Frage und formuliert die Antwort, die Zahl liefert Code. Zeigt der Shop nur Listenpreise, weil Händlerpreise in SAP-Konditionen stehen, nennt auch der Agent Listenpreise.

Die zweite Regel betrifft die Eingabe. Jede Nachricht eines Händlers ist Text, und Text kann Anweisungen enthalten. Ich plane deshalb so, als ob ein Filter eines Tages eine eingeschleuste Anweisung übersieht:

- Der Agent User liest nur, was auch der Käufer sehen darf.
- Aktionen, die Aufträge anlegen oder Daten ändern, prüfen Berechtigung, Menge und Kredit im Code.
- Keine ausgehende Aktion sendet Daten an eine Adresse, die ein Händler beeinflussen kann.
- Bei WhatsApp und SMS muss der Agent erst wissen, wer schreibt. Dafür bringt die Vorlage einen Subagenten zur Nutzerprüfung mit.

Angriffsmuster und Gegenmaßnahmen stehen in [Prompt Injection im Händlerportal](../../../blog/prompt-injection-haendlerportal-agentforce/), die allgemeinen Grenzen von Agenten im KI-Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/). Wer Händlerbestände in Manufacturing Cloud führt, kann Nachschub auch per Agent vorschlagen lassen. Verbindlich wird er erst, wenn das ERP ihn annimmt, siehe [Händlerbestand und Nachschub mit Agentforce](../../../blog/haendlerbestand-nachschub-agentforce/). Weitere Agenten für Hersteller ordnet das Kapitel [ERP, KI und Rollout](../../manufacturing-cloud/erp-ki-und-rollout/) der Masterclass Manufacturing Cloud ein.

## Wann lohnt der Umstieg von Aura auf LWR?

Salesforce B2B Commerce gab es als Visualforce-Paket, als Aura-Store und als LWR-Store. Laut [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide) können nur Orgs, die vor Spring '23 für Commerce aktiviert wurden, noch Aura-Stores anlegen, und Salesforce empfiehlt LWR für neue Stores. Ein Abschaltdatum gibt es bis zum 27. Oktober 2026 nicht: Aura-Stores stehen nicht auf der [Liste der aktiven Abkündigungen](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1). Dasselbe gilt für B2B Commerce for Visualforce. Welche Generation Sie betreiben, klärt [B2B Commerce Versionen: Visualforce, Aura oder LWR?](../../../blog/b2b-commerce-versionen-visualforce-aura-lwr/).

Die [wichtigsten Unterschiede](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) betreffen jeden eigenen Code: LWR unterstützt nur Lightning Web Components, Styling läuft über `--dxp`-Styling-Hooks statt eigener CSS-Klassen, Daten kommen über Wire-Adapter, und der Checkout ist der eingebaute Salesforce Commerce Checkout statt eines Flows. Ein Migrationswerkzeug dokumentiert Salesforce nicht. Ich plane den Umstieg deshalb als Neubau der Storefront auf denselben Commerce-Daten.

Ich würde migrieren, wenn mindestens einer dieser Punkte zutrifft:

- Eine Funktion, die Sie brauchen, ist im Aura-Store nicht verfügbar oder schwer zu bauen. Prüfen Sie das je Funktion in Release Notes und Dokumentation.
- Eigener Aura-Code wächst weiter, und jede neue Komponente ist Code, den Sie später neu schreiben.
- Der Checkout muss ohnehin geändert werden, etwa für eine neue Kreditprüfung im ERP.
- Der Partner, der den Store gebaut hat, verlässt das Programm.

Läuft der Store stabil mit wenig eigenem Code, ist Abwarten legitim. Den ersten Schritt würde ich trotzdem gehen: Aura-Komponenten im laufenden Store durch Lightning Web Components ersetzen, denn die laufen in beiden Store-Typen. Schritte, Checkout und offene Punkte des Leitfadens beschreibe ich in [Von Aura zu LWR: einen B2B-Commerce-Store migrieren](../../../blog/b2b-store-aura-lwr-migrieren/).

## Wie führen Sie den Shop bei Händlern ein?

Ein B2B-Shop zeigt jedem Händler seinen eigenen Katalog und seine eigenen Preise. Ein Big Bang zeigt deshalb jeden Datenfehler allen Händlern am selben Tag. Das Datenmodell macht Wellen einfach: Käufer kommen über Buyer Groups in den Store, also ist eine Welle die Menge der Buyer Groups, die Sie mit dem Store verbinden.

- **Pilot zuerst.** Händler mit vielen Wiederholbestellungen bekannter Teile, einem ehrlichen Ansprechpartner und wenigen Sonderkonditionen.
- **Buyer Manager beim Händler.** Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions) bekommen sie Customer Community Plus mit B2B Commerce Super User und Delegated External User Administration. Damit legen sie Benutzer ihres eigenen Kontos an, setzen Passwörter zurück und deaktivieren Benutzer, ohne Ticket bei Ihrem Service Desk.
- **Test je Welle.** Entitlements, Preise, Bestand, Checkout und Auftragsstatus mit einem echten Käuferkonto dieser Welle, nie nur mit einem Admin-Benutzer.
- **Innendienst bleibt erreichbar.** Telefon und E-Mail laufen weiter. Händler wechseln, weil der Shop schneller ist. Ruft ein Pilothändler mit einer Nachbestellung an, führt die Kollegin ihn einmal durch den Shop.
- **Schulung kurz halten.** Ein Termin pro Buyer Manager zur Benutzerverwaltung und eine Seite mit Suche nach Teilenummer und Nachbestellung reichen für den Start.

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren verkauft Ersatzteile an 250 Händler in Deutschland, Österreich und der Schweiz. Welle 1 bringt in den Monaten 1 und 2 fünfzehn Pilothändler in Deutschland in einer Buyer Group. Welle 2 folgt mit den übrigen deutschen Händlern in drei Gruppen nach Händlerstufe, Welle 3 mit Österreich, der Schweiz und den Schlüsselkunden mit Sonderkonditionen. Zwischen den Wellen liegen zwei Wochen für Korrekturen. Den Buyer Agent bekommt erst Welle 1, wenn sie drei Monate im Shop bestellt hat. Die ganze Reihenfolge steht in [B2B-Shop für Händler einführen](../../../blog/b2b-shop-haendler-einfuehren/). Wenn Händler und Innendienst ihre Arbeitsweise ändern sollen, gehört [Change Management](../../../leistungen/change-management/) ab der ersten Welle in den Plan.

## Welche Kennzahlen zeigen, ob der Shop wirkt?

Händler bestellen ohnehin. Die Frage ist, ob sie über den Shop bestellen und ob Sie das weniger kostet. Ich messe je Buyer Group, etwa drei Monate nach jeder Welle:

| Kennzahl | Frage dahinter | Quelle |
|---|---|---|
| Anteil der Auftragspositionen über den Shop | Wechseln die Händler? | ERP, mit Kanalkennzeichen |
| Suchen ohne Treffer | Finden Händler ihre Teile? | Suchanalyse über Data Cloud |
| Conversion von Suche zu Bestellung | Führt Finden zu Kaufen? | Suchanalyse, Merchant Agent |
| Innendienstminuten pro Auftragsposition | Spart der Shop Arbeit? | eigene Messung, vorher und nachher |
| Bestellungen mit manueller Korrektur | Stimmen die Daten? | ERP oder Order Summaries |

Die Suchanalyse über Data Cloud hat Salesforce [im Juli 2026 angekündigt](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), mit Suchanfragen, Klickraten, Conversions und Suchen ohne Treffer. Sie verbraucht Data-Cloud-Credits, von denen Growth laut Preisseite 250K und Advanced 500K enthält. Den Verbrauch veröffentlicht Salesforce nicht, also schauen Sie nach dem ersten Monat ins Digital Wallet.

Zwei Dinge müssen vor dem Go-live stehen: ein Kanalkennzeichen in der Auftragsschnittstelle, damit jede Position im ERP dem Shop zugeordnet werden kann, und zwei Wochen Zeitmessung im Innendienst als Ausgangswert. Ohne diese Zahlen bleibt der [Business Case](../../../blog/b2b-webshop-business-case-hersteller/) eine Behauptung. Details und eine Beispielrechnung stehen in [B2B-Shop Kennzahlen: Was nach dem Go-live zählt](../../../blog/b2b-shop-kennzahlen-nach-go-live/).

## Was verlangt der Betrieb nach dem Go-live?

Salesforce liefert drei Releases im Jahr, und jedes trifft Storefront, Checkout und Extensions. Ich würde für den Shop eine feste Regressionsliste führen, die vor jedem Release in der Preview-Sandbox läuft:

1. Suche nach aktueller und alter Teilenummer, mit zehn typischen Teilen.
2. Preise für je ein Käuferkonto pro Buyer Group, gegen das ERP geprüft.
3. Warenkorb, Nachbestellung und Checkout mit Bestellnummer bis zum Auftrag im ERP.
4. Auftragsstatus und Bestellhistorie aus dem ERP.
5. Jede eigene Extension und jede eigene Lightning Web Component.
6. Wenn der Buyer Agent aktiv ist: ein festes Testset echter Händlerfragen mit erwarteten Antworten.

Die Store-Konfiguration, also Buyer Groups, Entitlement Policies und Preisbücher, läuft dabei wie Metadaten durch die Pipeline. Wie Sie die drei Releases in einen Kalender legen, beschreibt das DevOps-Kapitel [Release-Planung für Salesforce](../../devops-release-management/release-planung-salesforce-releases/), wie Sie eine solche Arbeitsweise schrittweise einführen und messen, das Kapitel [Fahrplan und Messung](../../devops-release-management/einfuehrung-fahrplan/). Bei Pipeline und Testautomatisierung unterstütze ich im Rahmen von [DevOps und Release-Management](../../../leistungen/devops-und-release-management/).

## Wo fangen Sie an?

1. **Shop vor Agent.** Erste Welle live, Daten geprüft, Kennzahlen erhoben. Dann Auftragsstatus und Nachbestellung im Web-Chat für die Pilotgruppe, WhatsApp erst danach.
2. **Store-Generation klären.** Aura oder LWR, Umfang des eigenen Aura-Codes, geplante Änderungen am Checkout. Daraus folgt, ob die Migration vor oder nach der Einführung kommt.
3. **Wellen schneiden.** Händlerliste mit Auftragspositionen, Preislogik und Datenqualität, daraus Pilot und Folgewellen.
4. **Ausgangswerte messen.** Kanalkennzeichen im ERP und Innendienstzeit pro Position, bevor der erste Händler bestellt.
5. **Regressionsliste schreiben.** Sechs Punkte wie oben, gepflegt im Repository des Kunden.

Alle fünf Kapitel finden Sie auf der [Übersichtsseite der Masterclass](../). Wer entscheiden muss, welche Daten zwischen ERP, PIM und Salesforce wem gehören, findet meine Unterstützung unter [Salesforce-Architektur](../../../leistungen/salesforce-architektur/).

Ein B2B-Shop trägt, wenn die ersten Händler ihre Teile zu ihrem Preis beim ersten Versuch finden, und Agenten, Migration und Kennzahlen bauen auf genau diesem Fundament auf. Wenn Sie das für Ihre Händler planen, [schreiben Sie mir](#contact).
