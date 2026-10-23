---
title: "Salesforce-Architektur und Solution Design"
description: "Zielarchitektur, Datenmodell und Cloud-Auswahl für Salesforce-Programme mit mehreren Clouds, Portalen und Schnittstellen, entworfen auf Kundenseite."
lang: de
slug: salesforce-architektur
translationKey: service-architecture
order: 1
lead: "Große Salesforce-Programme scheitern selten an einem Klick, sondern weil niemand früh entschieden hat, welche Clouds, welches Datenmodell und welche Schnittstellen das Unternehmen wirklich braucht. Ich entwerfe die Zielarchitektur auf Kundenseite und dokumentiere jede Entscheidung, auch für spätere Partnerwechsel."
situations:
  - "Ein neues Salesforce-Programm startet, und das Unternehmen braucht ein Zielbild, bevor es einen Umsetzungspartner beauftragt."
  - "Mehrere Clouds, Portale und Schnittstellen sind über Jahre gewachsen, und niemand hat mehr das Gesamtbild."
  - "Partner schlagen zusätzliche Clouds oder Branchenprodukte vor, und das Unternehmen kann nicht beurteilen, ob sie sich lohnen."
  - "Das Datenmodell ist Projekt für Projekt gewachsen, und Reports, Automatisierung und KI-Anwendungsfälle leiden darunter."
deliverables:
  - "Zielarchitektur: Clouds, Portale, Schnittstellen und ihre Verantwortlichkeiten"
  - "Datenmodell für die Kernobjekte und ihre Beziehungen zu ERP und anderen Systemen"
  - "Entscheidungslog mit Optionen, Gründen und Folgen jeder Architekturentscheidung"
  - "Bewertung von Add-ons wie Field Service, Experience Cloud oder Manufacturing Cloud im ROI-Case"
  - "Solution Design für komplexe Anforderungen, bereit für Umsetzungspartner"
  - "Architektur-Reviews von Partner-Designs, bevor sie gebaut werden"
results:
  - "Ein Zielbild, das Fachbereich, IT und Partner teilen"
  - "Clouds und Add-ons, die gewählt werden, weil sie sich lohnen, und nicht, weil sie angeboten wurden"
  - "Entscheidungen, die nachvollziehbar bleiben, wenn Personen oder Partner wechseln"
  - "Ein Datenmodell, das Reporting, Automatisierung und KI-Anwendungsfälle trägt"
phases:
  - title: "Das Geschäft verstehen"
    text: "Ich beginne mit Prozessen, Nutzern und bestehenden Systemen: wie das Unternehmen heute verkauft, liefert und seine Kunden betreut, und wohin es will."
  - title: "Zielbild"
    text: "Mit Fachbereich und IT entwerfe ich Zielarchitektur und Datenmodell. Optionen und Abwägungen kommen ins Entscheidungslog, damit die Gründe sichtbar bleiben."
  - title: "Detailliertes Solution Design"
    text: "Für die kritischen Bereiche schreibe ich Solution Designs, nach denen Umsetzungspartner bauen können, inklusive Schnittstellen, Sicherheit und Datenmigration."
  - title: "Architektur in der Umsetzung"
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

Salesforce-Architektur auf Kundenseite bedeutet, das Gesamtbild im Interesse des Unternehmens zu entwerfen: welche Clouds und Produkte es braucht, wie das Datenmodell aussieht, wie Salesforce mit ERP und anderen Systemen zusammenarbeitet und wie Entscheidungen dokumentiert werden. Das habe ich für globale Fertigungsunternehmen gemacht, darunter den ersten weltweiten Manufacturing-Cloud-Rollout mit CPQ, Produktkonfigurator und Kundenportal. Meine Rolle ist unabhängig von Herstellern und Partnern, und das zählt vor allem dann, wenn ein Partner das nächste Produkt vorschlägt.

## Welche Clouds braucht das Unternehmen wirklich?

Sales Cloud und Service Cloud sind in fast jedem Enterprise-Projekt gesetzt. Die spannenden Fragen beginnen bei den Add-ons:

- **Field Service** hängt von der Art der Arbeit, den Standorten und der Dauer der Einsätze ab. Den größten Nutzen gibt es bei vielen kurzen Einsätzen, bei denen Routen- und Terminoptimierung die Kennzahlen deutlich verbessert. Bei wenigen langen Projekten ist der Nutzen viel kleiner. Über die aktuellen mobilen Funktionen habe ich in [Field Service Mobile im Außendienst](../../blog/salesforce-field-service-mobile-aussendienst/) geschrieben.
- **Experience Cloud** passt zu kundennahen Prozessen. Self-Service-Portale sparen interne Kapazität, weil Kunden Antworten selbst finden und Anfragen selbst stellen.
- **Manufacturing Cloud** ergibt nur Sinn, wenn ihre Funktionen dazu passen, wie das Unternehmen tatsächlich verkauft. Der Fit muss im ROI-Case gerechnet werden, den ich auf der Seite [Make-or-buy und Lizenzen](../make-or-buy-lizenzen/) beschreibe.

## Warum entscheidet das Datenmodell so viel?

Jeder Report, jede Automatisierung und jeder KI-Anwendungsfall hängt vom Datenmodell ab. Werden Accounts, Produkte und Verträge in jedem Projekt anders modelliert, zeigen sich die Probleme Jahre später in Reports, denen niemand traut, und in Agenten, die falsche Antworten geben. Deshalb behandle ich das Datenmodell als Teil der Architektur, inklusive seiner Beziehungen zum ERP. Bei KI sehe ich das genauso: Business Value und Datenqualität stehen an erster Stelle, wie in [Agentforce: Business Value und Datenqualität zuerst](../../blog/agentforce-business-value-datenqualitaet/) beschrieben.

## Was liefere ich?

Der Umfang reicht vom Zielbild über das Entscheidungslog bis zum Datenmodell. Jede Architekturentscheidung bekommt einen kurzen Eintrag mit Optionen, Gründen und Folgen. Das klingt nach Papierkram, aber genau damit kann ein Unternehmen Partner oder Personen wechseln, ohne die Begründungen hinter seinem System zu verlieren. Die Integrationsarchitektur gehört dazu, weil Salesforce nie das einzige System ist. Mehr dazu unter [Integration mit ERP, Middleware und Telefonie](../salesforce-schnittstellen/).

Während der Umsetzung bleibe ich als Architekt an Bord. Ich prüfe die Designs der Partner, bevor sie gebaut werden, und halte das Entscheidungslog aktuell. Entfernt sich der Bau vom Zielbild, etwa weil ein Partner eine Abkürzung nimmt, die später teuer wird, spreche ich das früh an.

Planen Sie ein neues Salesforce-Programm oder möchten Sie einen unabhängigen Blick auf eine bestehende Architektur, [schreiben Sie mir](#contact) oder lesen Sie mehr [über mich](../../#about).
