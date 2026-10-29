---
title: "Von Salesforce CPQ und Billing zu Revenue Cloud"
description: "Was Salesforce für CPQ und Billing zusagt, worin sich beide von Revenue Cloud unterscheiden, wann der Wechsel lohnt und wie die Migration in drei Phasen läuft."
lang: de
slug: von-cpq-zu-revenue-cloud
course: revenue-cloud
translationKey: revenue-05
chapter: 5
pubDate: 2026-10-28
short: "Von CPQ zu Revenue Cloud"
summary: "Was Salesforce zu CPQ und Billing zusagt, worin sich die Produkte unterscheiden und wie die Migration in drei Phasen abläuft."
takeaways:
  - "Salesforce CPQ ist end of sale, nicht end of life: Bestandskunden nutzen es weiter, kaufen Nutzer nach, verlängern und erhalten Support, aber keine neuen Funktionen. Ein End-of-Life-Datum gibt es nicht."
  - "Revenue Cloud arbeitet auf Standardobjekten statt in den Paketen SBQQ und blng. Produktregeln, Preisregeln, Subscriptions, Freigaben und Berichte werden deshalb neu entworfen."
  - "Bleiben Sie bei CPQ, solange der Angebotsprozess stabil ist, wechseln Sie, wenn Sie brauchen, was nur Revenue Cloud bekommt, und prüfen Sie einen dritten Weg, wenn Ihre Regeln außerhalb von Salesforce liegen."
  - "Die Salesforce-Hilfe teilt die Migration in Vorbereitung, Strategie und Umsetzung; die CPQ-Seite nennt 3 bis 6 Monate als typisch, mit CPQ und Revenue Cloud im Parallelbetrieb."
  - "Preis-Master, Cutover-Modell, Umfang der Historie und der Stichtag für die Abrechnung entscheiden Kunde und Finance; Partner und Migrationswerkzeuge setzen sie um."
articles: [salesforce-cpq-end-of-sale-status, cpq-vs-revenue-cloud-differences, stay-on-cpq-or-migrate, cpq-to-revenue-cloud-migration-plan, salesforce-billing-to-revenue-cloud-billing, revenue-cloud-configuration-deployment]
faq:
  - q: "Muss ich von Salesforce CPQ zu Revenue Cloud migrieren?"
    a: "Nein. Salesforce schreibt, dass es keine erzwungene Migration gibt, und hat kein End-of-Life-Datum angekündigt. Bestandskunden können CPQ weiter nutzen, Nutzer nachkaufen, verlängern und erhalten Support und kritische Fehlerbehebungen. Neue Funktionen bekommt CPQ nicht mehr."
  - q: "Ist Revenue Cloud ein Upgrade von Salesforce CPQ?"
    a: "Nein. Laut Salesforce-Hilfe unterscheiden sich die Datenmodelle deutlich. CPQ ist ein Managed Package mit dem Namespace SBQQ, Revenue Cloud nutzt Standardobjekte. Regeln, Preise, Subscriptions und Berichte werden neu entworfen oder migriert, ein Versions-Upgrade gibt es nicht."
  - q: "Wie lange dauert eine Migration von CPQ zu Revenue Cloud?"
    a: "Die CPQ-Seite von Salesforce nennt 3 bis 6 Monate von der Analyse bis zum Go-live als typisch. Die Salesforce-Hilfe legt keinen festen Zeitrahmen fest. Das untere Ende würde ich nur für eine aufgeräumte Org mit wenigen Preisregeln und wenig eigenem Code planen."
  - q: "Was passiert mit dem Paket Salesforce Billing?"
    a: "Ein Salesforce-Sprecher sagte im März 2025, dass heutige CPQ- und Billing-Kunden vollen Zugang einschließlich Support behalten; Neukunden werden auf Revenue Cloud Advanced und Revenue Cloud Billing verwiesen. Eine eigene Seite zum Verkaufsende des Billing-Pakets habe ich nicht gefunden."
  - q: "Können CPQ und Revenue Cloud in derselben Org laufen?"
    a: "Ja, während der Migration. Die Salesforce-Hilfe nennt das Beibehalten der CPQ-Lizenz und die Koexistenz während des Übergangs als Planungsthemen. CPQ erstellt weiter Angebote in Produktion, während Revenue Cloud aufgebaut wird, deshalb laufen beide Lizenzen für die Dauer des Projekts parallel."
draft: false
---

Salesforce CPQ ist end of sale, nicht end of life. Bestandskunden nutzen es weiter, kaufen Nutzer nach, verlängern und erhalten Support, aber keine neuen Funktionen. Salesforce hat kein End-of-Life-Datum angekündigt und schreibt, dass es keine erzwungene Migration gibt. Revenue Cloud ist der Nachfolger und ein eigenes Produkt: Standardobjekte statt der Pakete `SBQQ` und `blng`, eine Constraint Engine statt Produktregeln, Preisprozeduren statt Preisregeln, Assets statt Subscription-Datensätzen. Ein Wechsel ist deshalb ein Neuentwurf, den die Salesforce-Hilfe in drei Phasen teilt und den die CPQ-Seite mit typisch 3 bis 6 Monaten angibt. Ich würde ihn zur nächsten CPQ-Verlängerung entscheiden.

## Was sagt Salesforce für CPQ und Billing zu?

Salesforce CPQ und Salesforce Billing stammen von SteelBrick, das Salesforce laut [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) im Dezember 2015 für 360 Millionen Dollar gekauft hat. Beide sind Managed Packages mit den Namespaces `SBQQ` und `blng`. Der Nachfolger erschien ab Spring '24 als Revenue Lifecycle Management; die Hilfe schreibt heute "Revenue Management (formerly Revenue Cloud)", die CPQ-Seite Agentforce Revenue Management, und salesforce.com verkauft das Produkt als Revenue Cloud. [Kapitel 1](../revenue-cloud-ueberblick/) ordnet die Namen.

Maßgeblich für CPQ ist die Salesforce-Seite [Navigating the Future of Salesforce CPQ](https://www.salesforce.com/sales/cpq/end-of-life/). Stand Oktober 2026 steht dort:

- "Salesforce CPQ is end of sale, not end of life."
- Bestandskunden "can continue using Salesforce CPQ, buy additional users, renew licenses, and receive support".
- CPQ "will not receive new features or innovations".
- "Salesforce has not announced an end-of-life date for CPQ."
- "There is no forced migration" zum neuen Produkt.

In einer [Pressemitteilung vom 16. Juli 2025](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/) schrieb Salesforce, man habe die CPQ-Lösung "as the all-new Revenue Cloud" neu gebaut. Dieser Satz erklärt das ganze Kapitel: Von CPQ führt kein Upgrade-Pfad weg, nur ein Wechsel auf ein neues Produkt.

Zum Billing-Paket gibt es weniger Aussagen. Ein Salesforce-Sprecher sagte im März 2025 gegenüber [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/), heutige CPQ- und Billing-Kunden "will continue to receive full access", einschließlich Support, und Neukunden würden auf Revenue Cloud Advanced und Revenue Cloud Billing verwiesen. Eine eigene Aussage zum Verkaufsende des Billing-Pakets habe ich auf den Seiten von Salesforce nicht gefunden. Auch das oft genannte Datum März 2025 für das Verkaufsende von CPQ stammt aus Berichten Dritter; die Salesforce-Seite nennt kein Datum.

Die praktische Frist ist Ihre nächste Verlängerung. Was Sie genau absichern sollten, steht in [Salesforce CPQ Verkaufsende: Was gilt im Oktober 2026?](../../../blog/salesforce-cpq-verkaufsende-status/).

```hinweis offen
Vereinbaren Sie bei der Verlängerung die Laufzeit, eine Obergrenze für Preiserhöhungen und das Recht, CPQ und Revenue Cloud während einer Migration parallel zu betreiben.
```

## Worin unterscheiden sich Salesforce CPQ und Revenue Cloud?

Beide Produkte konfigurieren, bepreisen, erstellen Angebote und rechnen ab, und darunter haben sie fast nichts gemeinsam. Die Salesforce-Hilfe schreibt auf ihrer [Migrationsseite](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5), die Datenmodelle "differ significantly". Die CPQ-Seite ergänzt, dass "CPQ-specific objects, custom fields, pricing rules, and scripts don't map directly". Der Vergleich je Bereich:

| Bereich | Salesforce CPQ und Billing (SteelBrick) | Revenue Cloud |
|---|---|---|
| Technische Form | Managed Packages, Namespaces `SBQQ` und `blng` | Standarddatenmodell der Plattform, API-first beim Angebot |
| Angebot, Auftrag, Verkauftes | Paketobjekte wie `SBQQ__Quote__c`, Subscription-Datensätze am Vertrag | Standardobjekte Quote, Order, Asset |
| Produktmodell | Produkte und Bundles mit Features und Optionen | Kataloge, Kategorien, Produktklassifizierungen mit Attributen, Bundles |
| Konfigurationsregeln | Produktregeln: Validation, Selection, Filter, Alert | Konfigurationsregeln und Constraint Rules Engine mit CML |
| Preisberechnung | Preisregeln, optional JavaScript Quote Calculator Plugin | Preisprozeduren, Decision Tables, Context Definitions, Preis-Wasserfall |
| Nach dem Verkauf | Vertrag mit Subscription-Datensätzen | Assets mit Asset State Periods und Asset Actions |
| Nachtrag und Verlängerung | Neues Angebot mit Opportunity zum Vertrag | Nachtrags- oder Verlängerungsangebot, dann Auftrag |
| Freigaben | Paket Advanced Approvals | Advanced Approvals als Invocable Actions und Business APIs |
| Auftrag bis Erfüllung | Auftrag aus dem Angebot erzeugt | Auftrag, optional über Dynamic Revenue Orchestrator (Add-on) |
| Abrechnung | Paket Salesforce Billing | Add-on Revenue Cloud Billing: Usage Rating und Digital Wallet, Rechnungen, Zahlungen, Mahnwesen, Nebenbuch |
| Berichte und Dashboards | Auf Paketobjekten gebaut | Auf Standardobjekten neu gebaut |
| Ablage der Konfiguration | Überwiegend Datensätze | Überwiegend Datensätze |
| Status Oktober 2026 | Verkaufsende, Wartungsphase, keine neuen Funktionen | Aktiv weiterentwickelt, verkauft als Growth und Advanced |

Drei Zeilen tragen den größten Teil des Aufwands.

**Konfigurationsregeln.** Produktregeln in CPQ sind explizite Wenn-dann-Datensätze. Revenue Cloud beschreibt Varianten über Klassifizierungen und Attribute und prüft Kombinationen mit deklarativen Constraints in CML. Aus dreihundert Produktregeln werden nicht dreihundert Constraints. Jemand, der die Maschinen versteht, muss sie neu modellieren, wie in [Kapitel 2](../produktkatalog-konfigurator-preise/) beschrieben.

**Preise.** Preisregeln werden zu Elementen einer Preisprozedur. Ein Quote Calculator Plugin mit jahrelang gewachsenem JavaScript hat kein direktes Gegenstück; jeder Zweig fällt weg, wird in einer Prozedur nachgebaut oder durch einen Preis aus SAP ersetzt. Der Gewinn ist der Preis-Wasserfall, der die Frage "Warum dieser Preis?" auf dem Bildschirm beantwortet.

**Subscriptions.** Jede offene CPQ-Subscription wird zu einem Asset mit korrekter Historie, damit Nachträge und Verlängerungen über Angebot und Auftrag laufen, wie in [Kapitel 3](../angebot-vertrag-auftrag/) beschrieben. Bei Wartungsverträgen und Fernüberwachung sind das die heikelsten Daten der ganzen Migration.

Eine Zeile ist eine Gemeinsamkeit: Laut [Gearset](https://docs.gearset.com/en/articles/11169961-how-to-compare-and-deploy-revenue-cloud-advanced) liegt in beiden Produkten der Großteil der Konfiguration als Daten vor. Die Quellen je Zeile stehen in [Salesforce CPQ vs. Revenue Cloud: Die echten Unterschiede](../../../blog/salesforce-cpq-revenue-cloud-unterschiede/).

## CPQ behalten, wechseln oder ein dritter Weg?

Bleiben ist erlaubt und vorerst oft richtig, hat aber einen Preis: Jedes Release bringt Revenue Cloud weiter und CPQ nicht. Ich ordne die Signale so:

- **Wechseln**, wenn Sie brauchen, was nur Revenue Cloud bekommt, etwa den Angebotsagenten oder wiederkehrende und nutzungsbasierte Abrechnung in Salesforce; wenn das Produktmodell ohnehin neu entworfen wird; wenn die Org neu aufgesetzt wird oder ein neuer Partner übernimmt; oder wenn ein fragiles Quote Calculator Plugin an einer Person hängt.
- **Warten**, wenn der Angebotsprozess stabil ist, die Preise ohnehin aus SAP kommen, eine S/4HANA-Migration dieselben Leute bindet oder in diesem Jahr kein Budget für einen Neuentwurf da ist. Nutzen Sie die Zeit, um ungenutzte Regeln zu löschen und die Preislogik zu dokumentieren.
- **Einen dritten Weg prüfen**, ein Partnerprodukt oder einen eigenen Ansatz, wenn die Konfigurationsregeln in der SAP-Variantenkonfiguration, in einem PLM-System oder bei Applikationsingenieuren liegen und Salesforce das Ergebnis nur anzeigen würde.

Laut CPQ-Seite sind etwa 15 Prozent der Kunden von Revenue Cloud Advanced von CPQ gewechselt. Migrationen finden statt, und niemandem läuft die Zeit davon. Die vollständige Entscheidungsmatrix steht in [CPQ behalten oder zu Revenue Cloud wechseln?](../../../blog/cpq-behalten-oder-revenue-cloud/), und ein Lizenzvergleich beider Wege über mehrere Jahre gehört zu [Make-or-Buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/).

## Wie läuft die Migration ab?

Die Hilfeseite [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) verlangt, alle Aufgaben einer Phase in der genannten Reihenfolge abzuschließen, bevor die nächste beginnt:

```schritte
Vorbereiten
  Prüfen, welche Funktionen von Revenue Cloud Sie brauchen, und den Betrieb planen. Die Hilfe nennt hier "Retain CPQ License" und "Coexistence During Transition": CPQ erstellt weiter Angebote in Produktion, während Revenue Cloud in derselben Org aufgebaut wird.
Strategie wählen
  Festlegen, wie Bewegungsdaten umziehen und wie Rollout und Cutover laufen, zum Beispiel je Produktlinie.
Umsetzen
  Produkt-, Asset- und Abrechnungsdaten migrieren, Berichte neu bauen und das Change Management von Anfang an parallel führen.
```

Einen festen Zeitrahmen gibt die Hilfe nicht vor ("There's no set time frame"). Die CPQ-Seite nennt 3 bis 6 Monate von der Analyse bis zum Go-live als typisch. Drei Monate würde ich nur für eine aufgeräumte Org planen; eine [Org-Analyse](../../../blog/ki-org-analyse-technische-schulden/) vor der Schätzung zeigt, welche Sie haben. In dieser Zeit laufen beide Lizenzen parallel, also ziehen Sie das Projekt nicht in die Länge. Die Koexistenz braucht außerdem Sandboxes, in denen beide Produkte mit realistischen Daten laufen, ein Punkt für die Planung von [Umgebungen und Branching](../../devops-release-management/umgebungen-und-branching/).

Die CPQ-Seite nennt drei Partnerangebote: Forsys RevRamp, IdeaHelix und Prodly. Sie beschleunigen Mapping und Laden, und die Hilfe zieht die Grenze: "tools don't replace human design decisions, particularly for custom logic and integration remapping". Fragen Sie jeden Partner, wie viele Produktregeln, Preisregeln und Skripte er in Ihrer Org gezählt hat und was er mit jedem vorhat; die Partnerauswahl behandelt das Kapitel [AIforce und Systemintegratoren](../../ki-salesforce/aiforce-und-systemintegratoren/) meiner KI-Masterclass.

### In welcher Reihenfolge ziehen die Daten um?

Die Reihenfolge folgt der [Object Deployment Reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) im Developer Guide, Eltern vor Kindern:

1. Attributdefinitionen, Produktklassifizierungen, dann die Produkte.
2. Product Selling Models, Preisbücher, Preisbucheinträge, Preisanpassungen.
3. Bundle-Komponenten, Kataloge und Kategorien.
4. Assets für jede offene Subscription, aufgebaut aus historischen Aufträgen.
5. Abrechnungsdaten, wenn Sie heute Salesforce Billing nutzen.

Meine Regeln: Jede offene Subscription zieht vor ihrem nächsten Verlängerungstermin um, und abgeschlossene Angebote bleiben als lesbare Historie in CPQ. Phasen, Arbeitspakete und einen Beispielplan finden Sie in [CPQ zu Revenue Cloud migrieren: Phasen, Aufwand, Cutover](../../../blog/cpq-migration-revenue-cloud-phasen/).

## Was ändert sich für Kunden von Salesforce Billing?

Das Billing-Paket hat eigene Objekte unter `blng`; Revenue Cloud Billing nutzt Standardobjekte wie Invoice, CreditMemo und AccountingPeriod und erzeugt Billing Schedules aus Aufträgen. Eine Umwandlung an Ort und Stelle gibt es nicht, und die Abrechnungspläne folgen den migrierten Assets, statt kopiert zu werden.

Ich stelle zum Ende einer Buchungsperiode um: letzter Rechnungslauf im Paket, Abstimmung des Nebenbuchs mit dem ERP, offene Forderungen als Salden mit der alten Rechnungsnummer als Referenz übernommen, abgeschlossene Rechnungen lesbar gehalten oder archiviert. Der erste Rechnungslauf in Revenue Cloud beginnt genau nach der letzten abgerechneten Periode, sonst bekommen Kunden doppelt oder gar keine Rechnung. Steuer-Engine, Payment Gateway und Rechnungsnummernkreis werden neu angebunden und getestet.

Diesen Cutover zeichnet Finance ab, nicht das CRM-Team. Ob Rechnungen nach dem Wechsel überhaupt aus Salesforce kommen sollten und was die E-Rechnungspflicht ab 2027 verlangt, behandelt [Kapitel 4](../abrechnung-und-nutzungsbasierte-preise/). Den Cutover selbst beschreibt [Von Salesforce Billing zu Revenue Cloud Billing](../../../blog/von-salesforce-billing-zu-revenue-cloud-billing/).

## Wie ändern sich Konfiguration und Deployments?

Katalog, Selling Models, Preisbucheinträge und Billing Policies sind Datensätze; Decision Tables, Pricing Recipes und Context Definitions sind Metadaten. Der [Deployment Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-overview.html) sagt: "There's no built-in, Revenue Management-specific deployment tool." Jedes Release besteht also aus einem Metadaten-Deployment, einem Daten-Deployment in der dokumentierten Reihenfolge und manuellen Schritten wie dem Aktualisieren der Decision Tables und dem Synchronisieren der Preisdaten.

Meine Regeln, festgelegt vor dem ersten Datensatz:

- **Eine stabile eindeutige ID auf jedem Konfigurationsobjekt**, weil sich Salesforce-Datensatz-IDs zwischen Orgs unterscheiden.
- **Produkte und Listenpreise aus SAP kommen über die Schnittstelle**, nie per Deployment aus einer Sandbox.
- **Datenvorlagen und Datenwerkzeug gehören dem Kunden**, aus den Gründen in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

Wie Konfigurationsdaten durch eine Pipeline laufen, steht im DevOps-Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/), welches Werkzeug passt, im [Vergleich der DevOps-Werkzeuge](../../devops-release-management/devops-werkzeuge-vergleich/), und die Details für Revenue Cloud, einschließlich Context Definitions und Konfiguratorregeln, in [Revenue Cloud Deployments](../../../blog/revenue-cloud-konfiguration-deployment/).

## Ein typisches Szenario, als Annahme

Ein Hersteller von Dosieranlagen nutzt CPQ seit 2019: 45 Nutzer, die Angebote erstellen, etwa 150 Produktregeln, ein Quote Calculator Plugin für Händlerrabatte und das Billing-Paket für 600 Wartungsverträge mit quartalsweiser Rechnung. Die CPQ-Verlängerung steht in zehn Monaten an. Alle Angaben sind Annahmen.

- **Verlängerung:** zwei Jahre, mit Obergrenze für Preiserhöhungen und einer schriftlichen Option, Revenue Cloud neun Monate neben CPQ zu betreiben.
- **Aufräumen jetzt:** ungenutzte Produktregeln gelöscht, Logik des Plugins dokumentiert, SAP als Master für Listenpreise bestätigt.
- **Proof of Concept:** die fünf am stärksten konfigurierten Anlagen als Constraint-Modelle, vor jedem Migrationsvertrag.
- **Cutover:** Ersatzteile und Services zuerst, konfigurierte Anlagen danach. Subscriptions ziehen in Paketen vor ihrem Verlängerungsmonat um, die Abrechnung zum Geschäftsjahresende.

## Was entscheiden Sie, und was machen Partner und Werkzeuge?

| Thema | Der Kunde entscheidet | Partner und Werkzeuge setzen um |
|---|---|---|
| Zeitpunkt | Laufzeit der Verlängerung, Start, Datum ab dem CPQ nur noch lesbar ist | Plan und Schätzung |
| Preis-Master | Welcher Preis aus SAP kommt, welcher aus Revenue Cloud | Preisprozeduren und Preisschnittstelle |
| Regeln | Welche Produkt- und Preisregeln noch gebraucht werden | Constraint-Modelle und Prozeduren |
| Cutover | Alles auf einmal, je Produktlinie oder je Land | Daten-Mapping und Ladeläufe mit Migrationswerkzeugen |
| Historie | Was umzieht, was archiviert wird, was lesbar bleibt | Extraktion und Archiv |
| Abrechnung | Stichtag und Eröffnungssalden, abgezeichnet von Finance | Konfiguration von Billing und Laden der Salden |
| Betrieb | Owner je Konfigurationsobjekt, Konten der Werkzeuge | Pipeline in den Werkzeugen des Kunden |

Die linke Spalte gehört ins Entscheidungslog, bevor Sie Schätzungen anfragen. Mehrere Partner durch einen solchen Wechsel zu steuern, gehört zu meiner Arbeit in der [Partnersteuerung](../../../leistungen/partnersteuerung/), und eine [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/) hält Katalog, Preise und Assets nach dem Go-live zugeordnet. Dies ist das letzte Kapitel; [Kapitel 4](../abrechnung-und-nutzungsbasierte-preise/) behandelt Abrechnung und Nutzung, und alle Kapitel finden Sie auf der [Übersichtsseite](../).

Der Wechsel von CPQ und Billing zu Revenue Cloud gelingt, wenn Sie ihn zur Verlängerung entscheiden und als Neuentwurf mit Ihren eigenen Entscheidungen vorab behandeln.
