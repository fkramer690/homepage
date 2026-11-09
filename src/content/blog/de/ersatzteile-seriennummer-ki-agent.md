---
title: "Ersatzteile per Seriennummer: Kann ein KI-Agent das?"
description: "Findet ein Agentforce-Agent das richtige Ersatzteil zur Seriennummer? Welche Daten er aus PLM, ERP und Salesforce-Assets braucht und was regelbasiert bleibt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ersatzteile-seriennummer-ki-agent
translationKey: spare-parts-serial-number-ai
topic: field-service
categories: [field-service, manufacturing-cloud]
tags: [Agentforce, Ersatzteile, Field Service, PLM, Installierte Basis, Händlerportal]
takeaways:
  - "Die Daten kommen aus PLM (As-built, As-maintained, Service-Stückliste), ERP (Material, Verfügbarkeit, Preis) und Salesforce (Assets, Servicehistorie)."
  - "Siemens kündigte das Muster im September 2026 an und zeigte im November eine Agent-to-Agent-Demo mit seiner Teamcenter-SLM-App; GA ist nicht genannt."
  - "Ich lasse die Stückliste im PLM und frage sie per API ab. Salesforce hält Maschine und Hauptbaugruppen, der Vorschlag landet im Arbeitsauftrag."
  - "Händler dürfen nur Maschinen ihres eigenen Accounts abfragen. Die Aktion prüft das auf dem Server, bevor eine Seriennummer an das PLM geht."
faq:
  - q: "Kann Agentforce Ersatzteile anhand der Seriennummer ermitteln?"
    a: "Ja, über eine Aktion, die eine API aufruft und die Teile zu dieser Seriennummer liefert, meist aus dem PLM und ergänzt um ERP-Daten. Siemens hat das mit seiner kostenpflichtigen Teamcenter-SLM-App für Salesforce im November 2026 als Demo gezeigt; eine Aussage zur allgemeinen Verfügbarkeit habe ich nicht gefunden."
  - q: "Was ist eine As-built-Stückliste?"
    a: "Die Stückliste einer konkreten ausgelieferten Maschine mit den tatsächlich verbauten Varianten und Ständen. Die Konstruktionsstückliste beschreibt den Maschinentyp. Für Ersatzteile brauchen Sie außerdem den As-maintained-Stand nach Reparaturen und die Service-Stückliste mit freigegebenen Alternativen."
  - q: "Sollte die komplette Stückliste als Assets nach Salesforce kopiert werden?"
    a: "Meist nicht. Hunderte Positionen je Maschine mal Tausende Maschinen ergeben Millionen Datensätze, die geladen und aktuell gehalten werden müssen. Ich würde Maschine und servicerelevante Hauptbaugruppen in Salesforce halten und den Rest live abfragen."
  - q: "Was kostet eine Ersatzteilabfrage in Flex Credits?"
    a: "Eine Agentforce-Aktion kostet 20 Flex Credits, beim Listenpreis von 500 € je 100.000 Credits also 0,10 €. Eine Abfrage mit genau drei Aktionen liegt bei rund 0,30 €, Stand 9. November 2026. Die tatsächliche Zahl der Aktionen schwankt, und Nutzer-, Integrations-, Portal- und PLM-Lizenzen kommen dazu."
  - q: "Können Händler denselben Agenten im Portal nutzen?"
    a: "Ja, mit strengeren Regeln: nur Maschinen, die der Server als eigene des Händlers bestätigt, Händlerpreise aus dem ERP, Verfügbarkeit statt Lagerbestand und nur ersatzteilrelevante Positionen statt der ganzen Konstruktionsstruktur."
draft: false
---

Ein KI-Agent kann das richtige Ersatzteil zu einer Seriennummer finden, aber nur, wenn Ihre Systeme diese Frage schon heute nach Regeln beantworten: Welche Teile stecken in genau dieser Maschine, und welcher Ersatz ist freigegeben? Für Ersatzteile per Seriennummer braucht der Agent die As-built- und As-maintained-Struktur und die Service-Stückliste aus dem PLM, Material, Verfügbarkeit und Preis aus dem ERP und die installierte Basis aus Salesforce. Er versteht die Frage, grenzt auf eine Baugruppe ein und bereitet das Ergebnis auf. Eine Teilenummer wählt er nie selbst. Siemens hat dieses Muster mit Teamcenter im September 2026 angekündigt und im November als Demo gezeigt.

## Was hat Siemens angekündigt, und was läuft schon?

Das sichtbarste öffentliche Beispiel ist die [Meldung von Siemens und Salesforce vom 15. September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx). Agentforce soll dort mit Teamcenter Service Lifecycle Management zusammenkommen. Ein Servicetechniker kann laut Meldung die passenden Ersatzteile für eine bestimmte Seriennummer vor dem ersten Einsatz beim Kunden ermitteln, und ein Kunde findet und bestellt das richtige Teil, ohne auf einen Ingenieur zu warten oder eine Hotline anzurufen. Roland Busch, President und CEO der Siemens AG, spricht von einem „virtual engineer“ für Servicetechniker und Vertrieb.

Achten Sie auf die Zeitform. Dieselbe Meldung sagt, Teamcenter „will work with Agentforce“. Was Siemens als laufend und mit Zahlen meldet, ist die Bearbeitung eingehender Leads: 100 Prozent der Leads aus 132 Ländern werden angesprochen. Im September war der Ersatzteilfall also ein angekündigtes Muster eines Unternehmens, das selbst PLM-Software verkauft, ohne Ergebnisse. Am [3. November 2026](https://blogs.sw.siemens.com/service-lifecycle-management/2026/11/03/agent-to-agent/) stellte Siemens eine Agent-to-Agent-Funktion für seine App Teamcenter SLM for Salesforce vor, eine kostenpflichtige [AppExchange-App](https://appexchange.salesforce.com/appxListingDetail?listingId=4d11758a-a5d0-4174-baff-3e2b85dbfe3e), die Service-Stückliste und As-maintained-Strukturen schon nach Salesforce bringt, und zeigte sie in einer Demo. Ein Release-Datum oder eine GA-Aussage für den Agententeil habe ich nicht gefunden. Die Bausteine stimmen trotzdem: Konstruktionsdaten je Seriennummer, ein CRM mit der installierten Basis und dazwischen ein Agent.

## Welche Daten braucht der Agent für Ersatzteile per Seriennummer?

Die Frage „Welche Dichtung passt in diese Maschine?“ berührt drei Systeme:

| Frage | Führendes System | Daten |
|---|---|---|
| Welche Maschine ist es? | Salesforce | Asset mit Seriennummer, Kunde, Standort, Maschinentyp, über- und untergeordnete Assets |
| Was wurde verbaut, was ist freigegeben? | PLM | As-built- und As-maintained-Struktur je Seriennummer, Service-Stückliste mit Alternativen und Ersatzteilen, Änderungsstände |
| Was hat sich seit Auslieferung geändert? | Salesforce Field Service | Arbeitsaufträge mit verbrauchten Teilen, Umbauten, getauschte Baugruppen |
| Ist das Teil lieferbar, zu welchem Preis? | ERP (SAP, proALPHA) | Materialnummer, Nachfolgematerial, Vertriebsstatus, Verfügbarkeit, Kunden- oder Händlerpreis |

Eine **As-built-Stückliste** ist die Stückliste einer ausgelieferten Maschine mit den tatsächlich verbauten Varianten und Ständen. Die Konstruktionsstückliste beschreibt den Maschinentyp. Bei einer Sondermaschine mit Optionen können beide genau an der Position abweichen, nach der der Techniker fragt. Für den Service zählen zwei weitere Sichten: Die As-maintained-Struktur zeigt, was nach Reparaturen und Nachrüstungen heute verbaut ist, und die Service-Stückliste nennt die servicefähigen Teile mit freigegebenen Alternativen.

Auf der Salesforce-Seite beschreibt [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets) ein Asset als konkret gekauftes oder installiertes Produkt. Asset-Hierarchien bilden zusammengehörige Assets ab, etwa die Komponenten einer Maschine, über das Feld Parent Asset. Arbeitsaufträge lassen sich mit Assets verknüpfen. Das ist der Anker: Der Agent übergibt die Identität des Assets an PLM und ERP. Das Standardfeld für die Seriennummer ist nicht eindeutig, die Schnittstelle braucht also eine eindeutige externe ID; die Seriennummer ist der Suchwert. Wie Assets überhaupt nach Salesforce kommen, steht in [Stammdaten für Field Service](../salesforce-field-service-stammdaten/).

Die Zeile, die ich zuerst prüfen würde, ist die dritte. Die As-built-Stückliste zeigt die Maschine am Tag der Auslieferung. Fünf Jahre später sind zwei Pumpen getauscht, und ein Händler hat einen Nachrüstsatz eingebaut. Stehen diese Änderungen nur in Papierberichten, beschreiben PLM und Salesforce eine Maschine, die es so nicht mehr gibt. Die verbrauchten Teile auf abgeschlossenen Arbeitsaufträgen sind ein wichtiger Input für den aktuellen Stand. Ein Grund mehr, sie in der App zu erfassen, wie in [Ersatzteile zwischen ERP und Field Service](../salesforce-field-service-ersatzteile-erp/) beschrieben. Von allein schreiben sie die Struktur aber nicht fort: Ein verbrauchtes Teil sagt, welches Material verwendet wurde, nicht, welches Teil ausgebaut wurde oder wo das neue sitzt. Dafür braucht es einen ausdrücklichen Tauschschritt, etwa mit Asset-Beziehungen, und eine Entscheidung, welches System den As-maintained-Stand führt.

## Die Stückliste im PLM lassen und live abfragen

**Vollständige Kopie.** Jede As-built-Position wird ein untergeordnetes Asset. Mehr Daten könnten offline verfügbar sein, aber nur das, was die mobile Offline-Konfiguration mit dem Arbeitsauftrag synchronisiert. Der Preis ist die Menge: Jede Position jeder Maschine ist ein Datensatz, der geladen, mit dem PLM abgeglichen und teilweise auf das mobile Gerät gebracht werden muss.

**Live-Abfrage.** Das PLM oder eine Middleware bietet eine API wie „ersatzteilrelevante Positionen für Seriennummer X und Baugruppe Y“. Der [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) beschreibt den Weg über MuleSoft: Topics und Aktionen in Topic Center festlegen, die API in Exchange veröffentlichen und mit dem API Catalog synchronisieren. Named Credentials und External Services legt Salesforce dann automatisch an. Der Agent ruft die API als Aktion auf, Flow und Apex können dieselbe API nutzen. PLM oder SAP nennt der Blog nicht; [Agentforce und SAP](../agentforce-sap-auftragsstatus/) wendet dasselbe Muster auf den Auftragsstatus an.

Dazwischen gibt es weitere Wege, etwa einen Zwischenspeicher nur für offene Arbeitsaufträge oder die Siemens-App selbst. **Meine Empfehlung für diese Architektur: nach Nutzung trennen.** Salesforce hält die Maschine und ihre servicerelevanten Hauptbaugruppen als Asset-Hierarchie, die Garantie, Wartungsverträge und Händlerportal ohnehin brauchen. Die vollständige Stückliste bleibt im PLM und kommt live. Für den Hallenkeller ohne Netz läuft der Agent vor dem Einsatz und schreibt seinen Vorschlag als Products Required, also benötigte Teile, in den Arbeitsauftrag. Products Required lassen sich mit dem Arbeitsauftrag offline synchronisieren, testen Sie das in Ihrer mobilen Konfiguration.

```ablauf
sf: Asset, Agent, Arbeitsauftrag
erp: Verfügbarkeit
ext: As-built-Stückliste
Asset --Seriennummer--> Agent
Agent --Seriennummer--> As-built-Stückliste
As-built-Stückliste ..Teilenummern..> Agent
Agent --Teilenummern--> Verfügbarkeit
Verfügbarkeit ..Preis..> Agent
Agent --Vorschlag--> Arbeitsauftrag
```

Hat Ihr PLM keine API oder keine As-built-Daten je Seriennummer, kann der Agent nichts abfragen; Optionen für ältere Systeme stehen in [altes ERP ohne API](../altes-erp-ohne-api-ki-agenten/).

## Was darf der Agent entscheiden, und was nicht?

Welche Teile für eine Seriennummer freigegeben sind, entscheiden Regeln: Es kann mehrere freigegebene Optionen geben, etwa Alternativen, Nachfolger oder eine komplette Baugruppe, aber der Agent darf keine erfinden. Diese Entscheidung gehört in die API. Der Agent liefert seinen Beitrag rund um diese Antwort:

- **Die Frage verstehen.** „Die Zuführpumpe links an Linie 2 ist undicht“ muss zu genau einer Baugruppe in der Hierarchie werden. Passen zwei, fragt der Agent nach, statt zu wählen.
- **Kontext lesen.** Fehlercode, letzte Arbeitsaufträge und ein Foto grenzen ein. Salesforce beschreibt in der [Ankündigung zur Fehlersuche in Field Service](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) bereits einen Agenten, der Fotos des Technikers auswertet.
- **Das Ergebnis aufbereiten.** Teilenummern, Mengen und Verfügbarkeit als kurze Liste, dazu ein Vorschlag für die benötigten Teile am Arbeitsauftrag, den ein Mensch bestätigt.

Regelbasiert bleiben: die Teileliste selbst, Nachfolgematerialien (aufgelöst in ERP oder PLM, nie aus ähnlichen Bezeichnungen geraten), Preise und jede Bestellung. Liefert die API nichts, sagt der Agent das und übergibt an die Ersatzteilabteilung. Wie man solche Schranken durchsetzt, beschreibt [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).

### Techniker oder Händler?

Der Techniker im Außendienst ist der leichtere Start: interner Benutzer, bekannte Maschine, Arbeitsauftrag als Kontext. Ein Händler im Portal braucht strengere Regeln:

- **Nur eigene Maschinen.** Die Aktion prüft auf dem Server, dass das Asset zu einem Account gehört, den der Händler sehen darf, und übergibt erst dann die Seriennummer aus diesem Asset an das PLM. Freitext kann ein Suchwert sein, aber nie die Berechtigung. Die PLM-API sollte nur die intern ermittelte Asset-ID bekommen oder selbst nach Account filtern. Sonst liest ein Händler die Konfiguration einer Maschine, die ein anderer verkauft hat. Ein Ersatzteilshop kann dieselbe Regel nutzen, siehe [nur Teile zur eigenen Maschine zeigen](../ersatzteilshop-teile-pro-maschine/).
- **Händlerpreise und Verfügbarkeit aus dem ERP.** Zeigen Sie, ob und wann ein Teil lieferbar ist, wie im SAP-Beitrag, und behalten Sie Lagerbestände intern.
- **Nur ersatzteilrelevante Positionen.** Die vollständige As-built-Struktur ist Konstruktionswissen und gehört nicht in einen Händlerchat.
- **Freitext ist nicht vertrauenswürdig.** Portalfelder sind Einfallstore für manipulierte Anweisungen, siehe [Prompt Injection über das Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Mit welcher Portallizenz Händler Assets überhaupt sehen, steht im Beitrag zum [Manufacturing-Cloud-Kundenportal](../manufacturing-cloud-kundenportal/).

## Rechenbeispiel: 6.000 Maschinen und eine Dichtung

Nehmen wir einen Maschinenbauer mit 6.000 installierten Maschinen, 40 Technikern, 150 Händlern, SAP und einem PLM mit As-built-Stücklisten je Seriennummer für Maschinen, die seit 2016 ausgeliefert wurden. Alle Zahlen sind Annahmen.

Angenommen sind 400 ersatzteilrelevante Positionen je Maschine. Eine vollständige Kopie wären 2,4 Millionen untergeordnete Assets. Der getrennte Ansatz hält Maschine plus rund 15 Hauptbaugruppen in Salesforce: 96.000 Assets, ein Fünfundzwanzigstel der Kopie.

Angenommen sind 1.500 Ersatzteilfragen im Monat mit je drei Aktionen: Asset finden, Teile der Baugruppe aus dem PLM holen, Verfügbarkeit und Preis aus SAP abfragen. Laut [Flex Credits Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) kostet eine Aktion in Produktion 20 Credits, eine Frage also 60 Credits, im Monat 90.000. Beim [Listenpreis von 500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) sind das rund 0,30 € je Frage und etwa 450 € im Monat für die Aktionen, wenn jede Frage drei Aktionen braucht. Die einmalige Arbeit an Schnittstelle und PLM kostet ein Vielfaches; das Abrechnungsmodell erklärt [Flex Credits: Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

In diesem gedachten Szenario, keinem gemessenen Kundenergebnis, bringt ein Pilot mit zehn Technikern zwei Erkenntnisse. Für Maschinen vor 2016 hat das PLM nur die Typstückliste, der Agent kann Kandidaten nennen, aber die Variante nicht bestätigen; das muss er sagen, und die Ersatzteilabteilung entscheidet. Und bei einem Teil der geprüften Maschinen zeigen verbrauchte Teile eine durch einen Nachfolger getauschte Baugruppe, die in der Asset-Hierarchie fehlt. Beides sind Datenprobleme. Die Entscheidung im Szenario: nur Techniker, nur Maschinen ab 2016, und ein Tauschschritt am Arbeitsauftrag, der Hauptbaugruppen nachzieht, wenn ein Techniker eine tauscht.

## 20 Ersatzteilbestellungen von Hand prüfen

```schritte
Zuerst von Hand testen
  Nehmen Sie 20 aktuelle Ersatzteilbestellungen aus dem Service als erste Stichprobe und prüfen Sie, ob Seriennummer, Asset und Stückliste zum tatsächlich bestellten Teil führen. Das zeigt Datenprobleme, ist aber kein Abnahmetest.
Eindeutigen Asset-Schlüssel vereinbaren
  Eine eindeutige externe ID für die Schnittstelle und die Seriennummer als Suchwert, im gleichen Format auf dem Typenschild, im ERP, im PLM und in Salesforce, inklusive führender Nullen und Werkspräfixe.
API vor dem Agenten bauen
  Geben Sie der Ersatzteilabteilung zuerst eine Maske darauf. Hilft sie Menschen nicht, hilft auch kein Agent.
Mit Technikern starten
  Nehmen Sie Händler erst mit den Portalregeln von oben dazu.
```

Welches System welche Daten führt, ist Thema der [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/). Das größere Bild zu Agenten in der Fertigung zeigt das Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).
