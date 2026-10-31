---
title: "Salesforce-Architektur und Solution Design"
headline: "Salesforce-Zielarchitektur, bevor der Partner baut"
description: "Zielarchitektur, Datenmodell und Cloud-Auswahl für Salesforce-Programme mit mehreren Clouds, Portalen und Schnittstellen, entworfen auf Kundenseite."
lang: de
slug: salesforce-architektur
translationKey: service-architecture
contactBrief: architecture
order: 1
lead: "Große Salesforce-Programme geraten meist in Schwierigkeiten, weil niemand früh entschieden hat, welche Clouds, welches Datenmodell und welche Schnittstellen das Unternehmen braucht. Ich entwerfe die Zielarchitektur auf Kundenseite und dokumentiere jede Entscheidung, auch für spätere Partnerwechsel."
situations:
  - "Ein neues Salesforce-Programm startet, und das Unternehmen braucht ein Zielbild, bevor es einen Umsetzungspartner beauftragt."
  - "Mehrere Clouds, Portale und Schnittstellen sind über Jahre gewachsen, und niemand hat mehr das Gesamtbild."
  - "Partner schlagen zusätzliche Clouds oder Branchenprodukte vor, und das Unternehmen kann nicht beurteilen, ob sie sich lohnen."
  - "Das Datenmodell ist Projekt für Projekt gewachsen, und Reports, Automatisierung und KI-Anwendungsfälle leiden darunter."
deliverables:
  - "Ich nehme Prozesse, Nutzer und bestehende Systeme auf, bevor ich eine Cloud empfehle."
  - "Ich bewerte Add-ons wie Field Service, Experience Cloud oder Manufacturing Cloud im ROI-Case."
  - "Ich prüfe die Designs der Partner, bevor sie gebaut werden."
  - "Während der Umsetzung halte ich das Entscheidungslog aktuell und greife ein, wenn sich der Bau vom Zielbild entfernt."
results:
  - "Eine Zielarchitektur mit Clouds, Portalen, Schnittstellen und ihren Verantwortlichkeiten"
  - "Ein Datenmodell für die Kernobjekte und ihre Beziehungen zu ERP und anderen Systemen"
  - "Ein Entscheidungslog mit Optionen, Gründen und Folgen jeder Architekturentscheidung"
  - "Solution Designs für die kritischen Bereiche, nach denen Umsetzungspartner bauen können"
phases:
  - title: "Das Geschäft verstehen"
    icon: "building"
    text: "Ich beginne mit Prozessen, Nutzern und bestehenden Systemen: wie das Unternehmen heute verkauft, liefert und seine Kunden betreut, und wohin es will."
  - title: "Zielbild"
    icon: "target"
    text: "Mit Fachbereich und IT entwerfe ich Zielarchitektur und Datenmodell. Optionen und Abwägungen kommen ins Entscheidungslog, damit die Gründe sichtbar bleiben."
  - title: "Detailliertes Solution Design"
    icon: "design"
    text: "Für die kritischen Bereiche schreibe ich Solution Designs, nach denen Umsetzungspartner bauen können, inklusive Schnittstellen, Sicherheit und Datenmigration."
  - title: "Architektur in der Umsetzung"
    icon: "architecture"
    text: "Während der Umsetzung prüfe ich Partner-Designs, halte das Entscheidungslog aktuell und greife ein, wenn sich der Bau vom Zielbild entfernt."
faq:
  - q: "Was macht ein Salesforce-Architekt auf Kundenseite?"
    a: "Er entwirft die Zielarchitektur im Interesse des Unternehmens und nicht eines Herstellers oder Partners: welche Clouds und Produkte nötig sind, wie das Datenmodell aussieht, wie Salesforce mit den anderen Systemen verbunden ist und welche Entscheidungen langfristig dokumentiert werden. In der Umsetzung prüft er, was Partner bauen, gegen dieses Bild."
  - q: "Welche Salesforce-Clouds braucht ein Fertigungsunternehmen?"
    a: "Sales Cloud und Service Cloud gehören zu fast jedem Enterprise-Projekt. Field Service lohnt sich am meisten bei vielen kurzen Einsätzen, bei denen Routen- und Terminoptimierung die Kennzahlen verbessert, weniger bei wenigen langen Projekten. Experience Cloud passt zu kundennahen Prozessen und Self-Service. Manufacturing Cloud ergibt nur bei klarem Fit Sinn, der im ROI-Case gerechnet ist."
  - q: "Was ist ein Entscheidungslog und warum ist es wichtig?"
    a: "Ein Entscheidungslog hält jede Architekturentscheidung mit ihren Optionen, den Gründen für die Wahl und ihren Folgen fest. Fragt zwei Jahre später jemand, warum ein Prozess so gebaut wurde, steht die Antwort dort, auch wenn die Beteiligten längst weitergezogen sind."
blogTags: [architecture, architektur, data 360, data governance, agentforce, field service]
---

Salesforce-Architektur auf Kundenseite bedeutet, das Gesamtbild im Interesse des Unternehmens zu entwerfen: welche Clouds und Produkte es braucht, wie das Datenmodell aussieht, wie Salesforce mit ERP und anderen Systemen zusammenarbeitet und wie Entscheidungen dokumentiert werden. Meine Rolle ist unabhängig von Herstellern und Partnern, und das zählt vor allem dann, wenn ein Partner das nächste Produkt vorschlägt.

```praxis
Diese Rolle hatte ich bei globalen Fertigungsunternehmen, darunter beim ersten weltweiten Manufacturing-Cloud-Rollout mit CPQ, Produktkonfigurator und Kundenportal.
```

## Welche Clouds braucht das Unternehmen?

Welche Add-ons sich lohnen, hängt von der Art der Arbeit ab:

```basis-addons
titel: Welche Clouds das Unternehmen braucht
basis: Sales Cloud, Service Cloud | In fast jedem Enterprise-Projekt gesetzt
+ Field Service | Passt bei vielen kurzen Einsätzen, bei denen Routen- und Terminoptimierung die Kennzahlen deutlich verbessert. Bei wenigen langen Projekten viel kleinerer Nutzen.
+ Experience Cloud | Passt zu kundennahen Prozessen. Self-Service-Portale sparen interne Kapazität.
+ Manufacturing Cloud | Nur wenn die Funktionen dazu passen, wie das Unternehmen verkauft. Der Fit wird im ROI-Case gerechnet.
fazit: Sales Cloud und Service Cloud sind gesetzt, entschieden wird bei den Add-ons.
```

Bei Field Service zählen neben der Art der Arbeit auch die Standorte und die Dauer der Einsätze. Über die aktuellen mobilen Funktionen habe ich in [Field Service Mobile im Außendienst](../../blog/salesforce-field-service-mobile-aussendienst/) geschrieben. Experience Cloud spart Kapazität, weil Kunden Antworten selbst finden und Anfragen selbst stellen. Den Fit der Manufacturing Cloud rechne ich im ROI-Case, den ich auf der Seite [Make-or-buy und Lizenzen](../make-or-buy-lizenzen/) beschreibe.

## Das Datenmodell trägt Reports, Automatisierung und KI

Jeder Report, jede Automatisierung und jeder KI-Anwendungsfall hängt vom Datenmodell ab. Deshalb behandle ich das Datenmodell als Teil der Architektur, inklusive seiner Beziehungen zum ERP. Bei KI sehe ich das genauso: Business Value und Datenqualität stehen an erster Stelle, wie in [Agentforce: Business Value und Datenqualität zuerst](../../blog/agentforce-business-value-datenqualitaet/) beschrieben.

```vergleich
ohne: Jedes Projekt modelliert anders
- Accounts, Produkte und Verträge werden in jedem Projekt anders modelliert.
- Jahre später traut niemand den Reports.
- Agenten geben falsche Antworten.
mit: Datenmodell als Teil der Architektur
- Accounts, Produkte und Verträge werden einmal für alle Projekte entworfen.
- Die Beziehungen zum ERP sind festgelegt.
- Reports stimmen, und Agenten finden die richtigen Daten.
```

## Jede Entscheidung bekommt einen Eintrag im Log

Neben Zielbild und Datenmodell führe ich ein Entscheidungslog. Jede Architekturentscheidung bekommt dort einen kurzen Eintrag mit Optionen, Gründen und Folgen. Mit diesem Log kann ein Unternehmen Partner oder Personen wechseln, ohne die Begründungen hinter seinem System zu verlieren.

```eintrag Entscheidungslog
Entscheidung | Was wurde entschieden?
Optionen | Welche Wege standen zur Wahl?
Gründe | Warum fiel die Wahl so aus?
Folgen | Was bedeutet die Entscheidung später? *
fazit: Fragt zwei Jahre später jemand, warum ein Prozess so gebaut wurde, steht die Antwort hier, auch wenn die Beteiligten längst weitergezogen sind.
```

Die Integrationsarchitektur gehört dazu, weil Salesforce nie das einzige System ist. Mehr dazu unter [Integration mit ERP, Middleware und Telefonie](../salesforce-schnittstellen/).
