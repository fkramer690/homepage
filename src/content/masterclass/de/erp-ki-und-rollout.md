---
title: "Manufacturing Cloud: ERP-Anbindung, KI und Rollout"
description: "Welche Daten zwischen SAP und Manufacturing Cloud fließen, wer Preise führt, wann Agentforce sich lohnt und in welcher Reihenfolge Länder live gehen."
lang: de
slug: erp-ki-und-rollout
course: manufacturing-cloud
translationKey: mfg-05
chapter: 5
pubDate: 2026-10-28
short: "ERP, KI und Rollout"
summary: "Welche Daten zwischen SAP und Manufacturing Cloud fließen, wann Agentforce sich lohnt und in welcher Reihenfolge Länder live gehen."
takeaways:
  - "SAP bleibt führend für Accounts, Produkte, Aufträge und meist auch Preise; die Manufacturing Cloud bekommt Ist-Mengen täglich und schickt freigegebene Boni und Garantiebeträge als Gutschrift zurück."
  - "Ab 1. Dezember 2026 braucht jeder Schnittstellennutzer mit SOAP login() die Berechtigung Use Any API Auth; mit Summer '27 entfällt SOAP login() in den API-Versionen 31.0 bis 64.0."
  - "Agentforce lohnt sich zuerst bei lesenden Prozessen mit hohem Volumen, sauberen Daten und einer API zum ERP, etwa Händleranfragen zum Auftragsstatus; eine Aktion kostet 20 Flex Credits."
  - "Ein weltweiter Rollout beginnt mit einem großen Land mit angemessener Komplexität, holt eine der größten Regionen in die ersten zwei Phasen und hält alle Länder zu mindestens 80 Prozent identisch."
  - "Forecast Sets, Definitionen der Data Processing Engine und Expression Sets der Business Rules Engine gehören in jeden Regressionstest vor einem der drei Salesforce-Releases im Jahr."
articles: [manufacturing-cloud-erp-integration, penny-perfect-pricing-erp-prices, agentforce-yes-or-no-manufacturers, siemens-agentforce-lessons, multilingual-dealer-agents, manufacturing-cloud-global-rollout]
faq:
  - q: "Brauche ich MuleSoft, um SAP an die Manufacturing Cloud anzubinden?"
    a: "Nein. Der MuleSoft Accelerator for Manufacturing liefert Vorlagen für den Abgleich von Accounts, Produkten und Aufträgen aus SAP S/4HANA und für Bonus-Gutschriften. Sales Agreements und Garantie deckt er nicht ab. Jede Middleware, die die Salesforce-APIs bedient, kann dieselbe Arbeit leisten."
  - q: "Sollten Preise in Salesforce oder in SAP berechnet werden?"
    a: "Bei den meisten Herstellern mit SAP würde ich SAP als Preis-Master behalten. Penny Perfect Pricing aus Winter '27 rechnet Preise für Telesales-Aufträge in Salesforce, aber Lizenz und Import von SAP-Konditionssätzen sind nicht dokumentiert, und zwei Preisfindungen laufen auseinander."
  - q: "Ist Agentforce in der Manufacturing Cloud enthalten?"
    a: "Die volle Agentforce-for-Industries-Ausstattung nennt die Preisseite nur in den Max-Editionen ab 650 $ pro Nutzer und Monat. Zu Core gibt es das Agentforce for Manufacturing Cloud Add-on ab 150 $ im Monat; die Einheit unterscheidet sich zwischen zwei Salesforce-Seiten, lassen Sie sie schriftlich bestätigen."
  - q: "Mit welchem Land sollte ein weltweiter Rollout der Manufacturing Cloud beginnen?"
    a: "Mit einem großen Land mit angemessener Komplexität: groß genug, um das globale Template ernsthaft zu prüfen, und nicht so speziell, dass seine Sonderfälle das Template für alle anderen prägen. Eine der größten Regionen sollte in den ersten zwei Phasen dabei sein."
  - q: "Was sollte ich vor einem Salesforce-Release in einer Manufacturing-Cloud-Org testen?"
    a: "Die Berechnungen, die Zahlen erzeugen: Forecast Sets, Definitionen der Data Processing Engine für Ist-Mengen, Prognosen und Boni, Expression Sets der Business Rules Engine für Garantie und die ERP-Schnittstellen. Vergleichen Sie die Ergebnisse in der Preview-Sandbox mit Produktion."
draft: false
---

Nach dem Funktionsdesign entscheiden drei Fragen über ein Manufacturing-Cloud-Projekt: welches System welche Daten führt, wo Agentforce wirklich Arbeit abnimmt und in welcher Reihenfolge die Länder live gehen. SAP bleibt führend für Accounts, Produkte, Aufträge und meist auch Preise. Die Manufacturing Cloud bekommt Ist-Mengen täglich und schickt freigegebene Boni und Garantiebeträge als Gutschrift zurück. Agentforce lohnt sich zuerst bei lesenden Prozessen mit hohem Volumen und einer API zum ERP. Der Rollout beginnt mit einem großen Land mit angemessener Komplexität, alle Länder arbeiten zu mindestens 80 Prozent gleich. Und keine Schnittstelle sollte sich nach dem 1. Dezember 2026 noch ungeprüft per SOAP login() anmelden.

## Welches System führt welches Objekt?

Bevor jemand eine Schnittstelle baut, braucht jedes Objekt ein führendes System und eine verantwortliche Person. Die Manufacturing Cloud erzeugt die meisten ihrer Zahlen nicht selbst. Ein Sales Agreement aus [Kapitel 2](../rahmenvertraege-und-prognosen/) vergleicht Plan und Ist, und das Ist entsteht in SAP. Bei Boni und Garantie aus [Kapitel 3](../haendler-und-partnerkanal/) und [Kapitel 4](../garantie-und-after-sales/) läuft es andersherum: Salesforce gibt frei, SAP zahlt.

So würde ich die Verantwortung bei einem typischen Hersteller mit SAP aufteilen:

| Daten | Führendes System | Wofür Salesforce sie braucht |
|---|---|---|
| Accounts und Account-Hierarchie | SAP | Sales Agreements, Prognosen, Portal |
| Produkte und Produkthierarchie | SAP | Sales Agreements, Boni, Garantie |
| Preise und Konditionen | SAP, außer Sie entscheiden bewusst anders | Telesales, Händlerangebote |
| Aufträge oder Auftragssummen | SAP | Ist-Mengen, Auftragsstatus |
| Lagerbestand | SAP | Kennzahl neben dem Rückstand |
| Sales Agreements, Prognosen, Ziele | Salesforce | Planung im Vertrieb |
| Freigegebene Boni und Garantiebeträge | Salesforce, gezahlt in SAP | Gutschrift an den Händler |

Für Objekte innerhalb der Org nutze ich die [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/). Für ERP-Schnittstellen ergänze ich zwei Spalten, Richtung und Takt. Die häufigste Lücke liegt in der Account-Hierarchie: Liegt der Auftraggeber aus SAP nicht auf derselben Ebene wie der Account mit dem Sales Agreement, braucht es eine Zuordnungstabelle, und auch die braucht einen Verantwortlichen.

## Welche Daten fließen zwischen SAP und der Manufacturing Cloud?

Nach Salesforce fließen Stammdaten und Ist-Mengen, zurück fließt Geld. Den Takt bestimmt die Frage, die die Daten beantworten. Sales Agreements laufen über Monate, für ihre Ist-Mengen reicht ein täglicher Lauf. Ein Händler, der nach seinem Auftrag fragt, will den Stand von heute; diesen Status frage ich live in SAP ab, statt ihn zu kopieren, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../../../blog/agentforce-sap-auftragsstatus/). Alle Flüsse mit Richtung und Takt stehen in [Manufacturing Cloud und SAP: welche Daten wohin](../../../blog/manufacturing-cloud-sap-integration-datenfluesse/).

```ablauf
erp: Stammdaten SAP, Aufträge SAP, Gutschrift SAP
sf: Sales Agreements, Boni und Garantie, Händleranfrage
Stammdaten SAP --Abgleich--> Sales Agreements
Aufträge SAP --Ist-Mengen täglich--> Sales Agreements
Boni und Garantie --freigegeben--> Gutschrift SAP
Händleranfrage --live--> Aufträge SAP
Aufträge SAP ..Status..> Händleranfrage
```

Der [MuleSoft Accelerator for Manufacturing](https://docs.mulesoft.com/manufacturing/latest/) liefert Vorlagen für zwei dieser Flüsse: den Abgleich von Accounts, Produkten und Aufträgen aus SAP S/4HANA und Gutschriften für freigegebene Bonusauszahlungen. Sales Agreements legt er nicht an, einen Garantiefluss nennt er nicht. Salesforce führt MuleSoft auf der [Seite mit den Add-ons](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) nur mit "Request a quote". Läuft MuleSoft bei Ihnen schon, sparen die Vorlagen Designzeit. Nur dafür zu kaufen, lohnt sich selten.

Für verspätete Aufträge und Korrekturen gibt es die Aktion [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm). Sie ist seit API-Version 47.0 verfügbar und berechnet die Ist-Mengen eines Sales Agreements für den aktuellen, vergangene oder künftige Zeiträume neu. Bucht SAP eine Retoure für den Vormonat, ruft die Middleware sie für die betroffenen Agreements auf. Sonst rufen Account Manager Kunden wegen eines Rückstands an, den es nicht mehr gibt.

Wie dieselbe Frage für einen B2B-Shop aussieht, beschreibt das Kapitel [ERP-Anbindung](../../b2b-commerce/erp-integration-bestand-auftraege/) der Masterclass B2B Commerce. Beim Design solcher Schnittstellen unterstütze ich unter [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

### Welche Login-Fristen gelten für ERP-Schnittstellen?

Viele ERP-Schnittstellen melden sich noch mit technischem Nutzer und Passwort an. Laut dem [Developer Guide zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) gelten diese Fristen:

```zeitleiste
2026-12-01 | Wer sich per SOAP API login() anmeldet, braucht die Berechtigung Use Any API Auth, sonst gibt es einen Fehler
Summer '27 | SOAP login() entfällt in den API-Versionen 31.0 bis 64.0
Summer '27 | SOAP-, REST- und Bulk-API 31.0 bis 40.0 bekommen keine Korrekturen mehr
Summer '28 | Aufrufe an SOAP-, REST- und Bulk-API 31.0 bis 40.0 schlagen fehl
```

Ein Ist-Mengen-Lauf, der still ausfällt, ist das Risiko dabei: Der Vertrieb sieht einen alten Rückstand und glaubt ihm. Wie Sie betroffene Schnittstellen finden, steht in [Salesforce-Passwort-Integrationen enden 2027](../../../blog/salesforce-passwort-integrationen-2027/).

## Wer führt die Preise: SAP oder Penny Perfect Pricing?

Mit Winter '27, [allgemein verfügbar seit 12. Oktober 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), bietet Salesforce eine eigene Preisfindung für Aufträge an. Penny Perfect Pricing berechnet laut [Developer Guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html) Preise für Positionen von Advanced Orders, also für den Telesales-Bestellablauf, und beschreibt 19 Objekte ab API-Version 68.0. Kalkulationsschema, Suchstrategien und Konditionssätze mit Staffeln erinnern stark an die SAP-Konditionstechnik.

```hinweis tipp
Ich würde bei den meisten Herstellern trotzdem SAP als Preis-Master behalten. Zwei Preisfindungen laufen auseinander, sobald die Preisabteilung in SAP eine Kondition ändert und die Kopie erst nachts ankommt. Dazu kommen zwei offene Punkte: Die Entwicklerdokumentation nennt keine Lizenz und keinen Standardweg, SAP-Konditionssätze zu laden. Beides sollten Sie schriftlich klären, bevor ein Projektplan davon abhängt. Die Abwägung mit einem Szenario für Ersatzteil-Telesales steht in [Penny Perfect Pricing: ERP-Preise in Salesforce?](../../../blog/penny-perfect-pricing-erp-preise/).
```

Die Grenzen bleiben wie in den anderen Kapiteln: Angebote mit Konfigurator gehören zu Revenue Cloud, siehe [Katalog, Konfigurator, Preise](../../revenue-cloud/produktkatalog-konfigurator-preise/), und Shoppreise zu B2B Commerce, siehe [Preise, Warenkorb, Checkout](../../b2b-commerce/preise-warenkorb-checkout/).

## Wann lohnt sich Agentforce für Hersteller?

Wenn ein Prozess fünf Kriterien erfüllt, die ich in [Agentforce für Hersteller: jetzt starten oder warten?](../../../blog/agentforce-ja-oder-nein-hersteller/) beschreibe: genug Volumen, tragfähige Daten, Zugriff auf das ERP per API, ein passendes Kostenmodell und eine Edition, die dazu passt. Händleranfragen zu Auftragsstatus und Lieferterminen erfüllen sie oft. Eine Garantie-Vorprüfung, bei der in der installierten Basis der Garantiebeginn fehlt, erfüllt sie nicht.

Für die Kosten zählen zwei Zahlen. Eine Standard- oder Custom-Aktion kostet laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) 20 Flex Credits, bei [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) also 0,10 €. Und die Edition bestimmt den Pool: Laut [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) enthalten die Core-Editionen 500.000 Flex Credits pro Org und Jahr, die Max-Editionen 2,75 Millionen und als einzige die volle Agentforce-for-Industries-Ausstattung. Zu Core gibt es das Agentforce for Manufacturing Cloud Add-on: Die Add-on-Seite nennt 150 $ pro Nutzer und Monat, die Preisseite "from $ 150 login/month". Lassen Sie sich die Einheit schriftlich bestätigen. Wie Sie Credits pro Aktion schätzen, steht im Kapitel [Kosten und Token](../../ki-salesforce/kosten-und-token/) der KI-Masterclass.

```kennzahlen
20 | Flex Credits kostet eine Standard- oder Custom-Aktion, also 0,10 €
500.000 | Flex Credits pro Org und Jahr in den Core-Editionen
2,75 Mio. | Flex Credits pro Org und Jahr in den Max-Editionen
quelle: Salesforce Flex Credits Rate Card, Agentforce-Preisseite und Preisseite der Manufacturing Cloud
```

Die sichtbarste Industriereferenz zeigt, wo man anfängt. In der [Meldung von Siemens und Salesforce](https://www.salesforce.com/news/press-releases/2026/09/15/siemens-agentforce-redefine-industrial-sales-service/) vom 15. September 2026 sind zwei Agenten für eingehende Leads live, für 18.000 Vertriebsmitarbeitende in 132 Ländern. Teamcenter-Antworten für den Service und das Lieferanten-Onboarding in SAP stehen im Futur. In [Siemens und Agentforce: Lehren für den Mittelstand](../../../blog/siemens-agentforce-lehren-mittelstand/) leite ich daraus eine Reihenfolge ab: erst nur lesen bei hohem Volumen, dann aus dem ERP lesen, dann Antworten aus PLM und Seriennummern, schreibende Schritte ins ERP zuletzt. Welche Agenten es für Vertrieb, Service und Garantie heute gibt, zeigt das Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/).

## Wie bedient ein Agent Händler in vielen Sprachen?

Für Exporteure mit Händlern in vielen Ländern ist die Sprache eine eigene Planungsfrage. Salesforce unterscheidet bei Agentforce zwischen allgemein verfügbaren Sprachen und Beta-Sprachen, und laut dem [Leitfaden zur Mehrsprachigkeit](https://www.salesforce.com/blog/multi-language-guide/) liegt die Qualitätssicherung bei Beta-Sprachen beim Kunden. Prüfen Sie jede Händlersprache gegen die aktuelle Liste, denn Salesforce ändert sie laufend. Die Übersetzung selbst ist günstig: Die Rate Card nennt 4.000 Flex Credits pro Million übersetzter Zeichen, zum Listenpreis also 20 €.

Teurer ist das Wissen. Laut demselben Leitfaden filtert der Retriever Wissensartikel heraus, deren Sprache nicht zur Sitzungssprache passt, ein italienischer Händler findet also nur italienische Artikel. Wer das nicht will, baut einen eigenen Retriever ohne Sprachfilter. Ich würde Wissen in ein oder zwei Sprachen pflegen, Sicherheits- und Gewährleistungsinhalte pro Land halten und jede freigegebene Sprache vor dem Go-live mit echten Händlerfragen testen. Rechenbeispiel und Aufteilung stehen in [Mehrsprachige Agentforce-Agenten für Händler im Export](../../../blog/mehrsprachige-agentforce-agenten-export/). Im Rollout wird die Sprache eine Spalte in der Ländertabelle.

## In welcher Reihenfolge rollt man Manufacturing Cloud weltweit aus?

Zuerst steht das Ziel fest, meistens die Harmonisierung von Prozessen. Daraus folgt ein globales Template mit den Entscheidungen, die sich nach dem ersten Land kaum noch ändern lassen: die Account-Ebene der Sales Agreements, die Regel, wann eine Konfiguration ein eigenes Produkt wird, und was Kunden und Händler im Portal sehen. In [Manufacturing Cloud weltweit ausrollen](../../../blog/manufacturing-cloud-weltweit-ausrollen/) beschreibe ich die Regeln, die ich daraus ableite:

| Regel | Was sie bedeutet |
|---|---|
| Erstes Land | groß, mit angemessener Komplexität. Ein kleines Pilotland bestätigt ein Template, das später am ersten großen Land scheitert. |
| Große Region früh | Eine der größten Regionen kommt in die ersten zwei Phasen, damit das Template unter echter Last steht, solange Änderungen noch günstig sind. |
| Reihenfolge danach | eine Tabelle mit einer Zeile pro Land und Spalten für Prozesse, Business Units, IT-Landschaft und Marken. Für die Manufacturing Cloud ergänze ich zwei Spalten: eigenes ERP oder gemeinsames, und Händlersprachen. |
| 80 Prozent gleich | Rechtliche Vorgaben sind gesetzt, jede andere lokale Anforderung wird begründet und von einer Stelle auf Kundenseite entschieden. |
| Change Management | Key User, Kommunikation vor dem Go-live und ein Blick auf die Nutzung danach, in jedem Land. |

Die ERP-Spalte hat das meiste Gewicht. Ein Land mit eigenem SAP-System oder eigener Middleware braucht neue Schnittstellen für Ist-Mengen, Boni und Garantie. Teilt es das ERP mit einem schon eingeführten Land, ist der Weg kürzer. Wie ich einen Fahrplan mit Phasen und Freigaben aufbaue, steht im Kapitel [Einführung und Fahrplan](../../devops-release-management/einfuehrung-fahrplan/) der DevOps-Masterclass, die Arbeit mit den Menschen in den Ländern unter [Change Management für Salesforce-Programme](../../../leistungen/change-management/).

## Was müssen Sie nach jedem Salesforce-Release neu testen?

Salesforce bringt drei Releases im Jahr, und Preview-Sandboxes bekommen jedes davon vor der Produktion. Wie Sie das mit dem eigenen Release-Kalender abstimmen, beschreibt das Kapitel [Release-Planung](../../devops-release-management/release-planung-salesforce-releases/) der DevOps-Masterclass. In einer Manufacturing-Cloud-Org gehören vor allem die Teile in den Regressionstest, die Zahlen erzeugen:

| Was | Warum es nach jedem Release getestet wird |
|---|---|
| Forecast Sets | Sie sind Metadaten vom Typ [AdvAccountForecastSet](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/meta_advaccountforecastset.htm), seit API-Version 53.0, und legen die Prognosekonfiguration pro Geschäftsbereich fest. |
| Definitionen der Data Processing Engine | Sie rechnen Ist-Mengen, Prognosen und Boni zusammen; Salesforce führt sie als [BatchCalcJobDefinition](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_batchcalcjobdefinition.htm). |
| Expression Sets der Business Rules Engine | Der Metadatentyp heißt [ExpressionSetDefinition](https://developer.salesforce.com/docs/atlas.en-us.264.0.api_meta.meta/api_meta/meta_expressionsetdefinition.htm); in vielen Orgs stecken darin Garantie- und Bonusregeln. |
| ERP-Schnittstellen | Jede neue API-Version ist ein Anlass, die API-Versionen Ihrer Schnittstellen gegen die Fristen oben zu prüfen. |

Mein Test pro Release ist bewusst klein: eine Neugenerierung der Prognose, eine Neuberechnung der Ist-Mengen für drei Sales Agreements, ein Garantieanspruch durch das Expression Set und ein Bonuslauf für einen Zeitraum, jeweils in der Preview-Sandbox und verglichen mit Produktion. Weicht eine Zahl ab, wissen Sie es vor Ihren Account Managern. Damit diese Definitionen zwischen Orgs wandern wie jede andere Konfiguration, gehören sie ins Repository, wie im Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/) beschrieben.

## Wie hängt dieses Kapitel mit den anderen zusammen?

Dieses Kapitel schließt die Masterclass ab. Es setzt die Entscheidungen aus Business Case, Rahmenverträgen, Händlerkanal und Garantie voraus und klärt, was sie im Betrieb und in vielen Ländern brauchen. Davor kam [Kapitel 4 zu Garantie und After-Sales](../garantie-und-after-sales/), alle fünf Kapitel finden Sie auf der [Übersichtsseite](../).

Die Manufacturing Cloud ist nur so gut wie die SAP-Daten, die sie bekommt, und ein Rollout nur so gut wie das Template, das im ersten großen Land hält.
