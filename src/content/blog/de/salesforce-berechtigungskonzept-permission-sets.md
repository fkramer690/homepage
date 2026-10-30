---
title: "Salesforce-Berechtigungskonzept mit Permission Sets"
description: "Profile oder Permission Sets? Wie ein Salesforce-Berechtigungskonzept aufgebaut ist und sauber bleibt, wenn mehrere Partner an derselben Org bauen."
pubDate: 2026-10-29
lang: de
slug: salesforce-berechtigungskonzept-permission-sets
translationKey: permission-concept-permission-sets
topic: security
categories: [architecture, devops]
tags: [Berechtigungskonzept, Permission Sets, Sicherheit, Partnersteuerung]
takeaways:
  - "Ein Salesforce-Berechtigungskonzept hat zwei Ebenen: was ein Nutzer tun darf (Objekte, Felder, Funktionen) und welche Datensätze er sieht (Sharing)."
  - "Profile behalten ihre Berechtigungen vorerst, Salesforce entwickelt aber nur noch Permission Sets und Permission Set Groups weiter. Neue Rechte gehören deshalb dorthin."
  - "Ich empfehle ein schlankes Basisprofil pro Lizenztyp, Permission Sets pro Funktion und Permission Set Groups pro Rolle, die der Kunde verantwortet."
  - "Mit mehreren Partnern liefert jeder Stream Permission Sets für seine Funktionen, die Zuordnung zu Rollen bleibt beim Kunden und geht durch das Review."
faq:
  - q: "Was ist der Unterschied zwischen Profil und Permission Set?"
    a: "Jeder Nutzer hat genau ein Profil, aber beliebig viele Permission Sets. Beide können Objekt-, Feld- und Systemrechte vergeben; Einstellungen wie Login-Zeiten und IP-Bereiche gibt es nur im Profil."
  - q: "Schafft Salesforce die Berechtigungen in Profilen ab?"
    a: "Salesforce hatte das Ende der Berechtigungen in Profilen für Spring '26 angekündigt und diesen Termin später nicht durchgesetzt. Die Empfehlung bleibt: neue Rechte über Permission Sets und Permission Set Groups vergeben."
  - q: "Was ist eine Permission Set Group?"
    a: "Eine Permission Set Group bündelt mehrere Permission Sets zu einer Rolle, etwa Innendienst Deutschland. Ein Muting Permission Set in der Gruppe nimmt einzelne Rechte wieder heraus, ohne die Sets selbst zu ändern."
  - q: "Wer sollte das Berechtigungskonzept verantworten?"
    a: "Der Kunde. Partner liefern die Permission Sets für ihre Funktionen, aber wer welche Rolle bekommt und welche Rechte eine Rolle bündelt, entscheidet der Kunde und prüft es im Pull-Request-Review."
draft: false
---

Ein Salesforce-Berechtigungskonzept legt fest, was jeder Nutzer tun darf und welche Datensätze er sieht. Ich baue es heute mit einem schlanken Basisprofil pro Lizenztyp, Permission Sets pro Funktion und Permission Set Groups pro Rolle. Profile tragen nur noch, was es nur im Profil gibt, etwa Login-Zeiten und IP-Bereiche. Arbeiten mehrere Partner an der Org, liefert jeder Stream die Permission Sets für seine Funktionen, und der Kunde entscheidet, welche Rolle welche Sets bekommt. So bleibt das Konzept lesbar, auch nach dem dritten Partnerwechsel.

## Welche zwei Ebenen hat ein Berechtigungskonzept?

Viele Konzepte vermischen zwei Fragen, die Salesforce getrennt beantwortet:

| Ebene | Frage | Werkzeuge in Salesforce |
|---|---|---|
| Rechte | Was darf der Nutzer tun? Welche Objekte, Felder, Apps und Funktionen? | Profil, Permission Set, Permission Set Group |
| Sichtbarkeit | Welche Datensätze sieht er? | Organisationsweite Standards, Rollenhierarchie, Freigaberegeln, Teams |

Ein Techniker im Außendienst darf zum Beispiel Arbeitsaufträge bearbeiten (Rechte), sieht aber nur die Aufträge seiner Region (Sichtbarkeit). Ein Händler im Portal darf Garantieanträge anlegen, sieht aber nur die Anlagen seiner eigenen Kunden. Wer beide Ebenen in einem Dokument mischt, findet später nicht heraus, warum ein Nutzer etwas sieht, das er nicht sehen soll.

## Profile oder Permission Sets?

Jeder Nutzer hat genau ein Profil und beliebig viele Permission Sets. Lange Zeit lagen fast alle Rechte im Profil. Das Ergebnis kenne ich aus vielen gewachsenen Orgs: Für jede Kombination aus Land, Abteilung und Sonderfall entsteht ein neues Profil, bis es dreißig davon gibt, die sich in Kleinigkeiten unterscheiden.

Salesforce hatte 2023 angekündigt, die Berechtigungen in Profilen mit Spring '26 abzuschaffen ([Salesforce Admins Blog](https://admin.salesforce.com/blog/2023/permissions-updates-learn-moar-spring-23)). Diesen Termin hat Salesforce später nicht durchgesetzt ([Salesforce Ben](https://www.salesforceben.com/salesforce-permissions-profiles-the-latest-retirement-updates/)). Profile funktionieren also weiter. Die Richtung ist trotzdem klar: Neue Funktionen kommen für Permission Sets und Permission Set Groups, nicht für Profile. Ich behandle Profile deshalb wie Change Sets: Sie gehen noch, aber niemand sollte darauf neu aufbauen.

```hinweis tipp
Prüfen Sie vor jedem neuen Profil, ob ein Permission Set reicht. In den meisten Fällen reicht es. Ein neues Profil braucht es eigentlich nur für einen neuen Lizenztyp oder abweichende Login-Regeln.
```

## Wie sieht ein Konzept mit Permission Sets aus?

Ich baue es in drei Schichten:

1. **Basisprofil pro Lizenztyp.** Ein Profil für interne Nutzer, eines für Portalnutzer, eines für Integrationsnutzer. Es enthält nur, was jeder dieses Typs braucht, plus Login-Einstellungen. Salesforce liefert dafür das Profil „Minimum Access - Salesforce“ als Ausgangspunkt.
2. **Permission Sets pro Funktion.** Ein Set für „Angebote erstellen“, eines für „Arbeitsaufträge disponieren“, eines für „Garantieanträge prüfen“. Ein Set beschreibt eine Fähigkeit, nicht eine Person.
3. **Permission Set Groups pro Rolle.** Die Rolle „Innendienst Deutschland“ bündelt die Sets, die diese Rolle braucht. Braucht eine Rolle ein Recht aus einem Set ausdrücklich nicht, nimmt ein Muting Permission Set es in dieser Gruppe wieder heraus.

Nutzer bekommen dann ein Basisprofil und eine oder zwei Gruppen. Die Zuordnung lässt sich über User Access Policies automatisieren, etwa anhand von Abteilung oder Land im Nutzerdatensatz. Wechselt ein Mitarbeiter vom Vertrieb in den Service, tauscht man eine Gruppe statt eines Profils mit hundert Unterschieden.

Die Sichtbarkeit plane ich getrennt davon. Bei Herstellern mit Gesellschaften in vielen Ländern beginnt sie meist mit einer einfachen Frage: Darf der Vertrieb in Frankreich die Kunden in Deutschland sehen? Lautet die Antwort nein, steht der organisationsweite Standard für Accounts auf privat, und die Rollenhierarchie bildet Länder und Regionen ab. Ausnahmen, etwa ein Key Account Manager für einen Konzernkunden in mehreren Ländern, regeln Freigaberegeln oder Account Teams. Diese Entscheidung gehört früh ins Konzept, weil sie sich später nur mit großem Testaufwand ändern lässt.

Für Integrationsnutzer gilt eine eigene Regel: ein Nutzer pro Schnittstelle, ein Permission Set mit genau den Objekten und Feldern, die diese Schnittstelle liest oder schreibt. Ein Integrationsnutzer mit „Alle Daten ändern“ ist das größte Risiko in vielen Orgs, weil niemand mehr weiß, was er alles darf.

## Wie bleibt das Konzept sauber, wenn mehrere Partner bauen?

Mit mehreren Partnern entsteht das Durcheinander meist nicht aus bösem Willen. Jeder Partner braucht für sein Feature schnell ein Recht, und am schnellsten geht es, ein vorhandenes Profil zu erweitern. Nach einem Jahr kann niemand mehr sagen, welches Recht zu welchem Feature gehört.

Diese Regeln halte ich für das Minimum:

- **Jeder Stream liefert eigene Permission Sets.** Das Set trägt den Stream im Namen, etwa `FS_Disponent` oder `SALES_Angebot`. Welcher Stream für welches Objekt verantwortlich ist, steht in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).
- **Partner ändern keine Profile und keine Gruppen.** Welche Rolle welches Set bekommt, entscheidet der Kunde. Ein Pull Request, der ein Profil oder eine Gruppe ändert, braucht eine Freigabe auf Kundenseite.
- **Rechte gehen durch das Review.** Permission Sets sind Metadaten im Repository und erscheinen im Pull Request wie Code. Der Reviewer prüft, ob ein neues Recht wirklich nötig ist, besonders bei „Alle anzeigen“, „Alle ändern“ und Systemrechten. Mehr dazu in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).
- **Eine Rollenmatrix, die der Kunde besitzt.** Eine Tabelle mit Rollen in den Zeilen und Permission Sets in den Spalten. Sie ist die fachliche Wahrheit, die Gruppen in Salesforce sind die technische Umsetzung.

```vertiefung Für Admins
titel: Wie migriere ich von vielen Profilen zu Permission Sets?
Salesforce bietet den kostenlosen User Access and Permissions Assistant, der vorhandene Profile analysiert und Rechte in Permission Sets übertragen kann.
- Zuerst die Rechte zusammenfassen, die alle Profile eines Lizenztyps gemeinsam haben, und ins Basisprofil legen.
- Dann die Unterschiede in Permission Sets pro Funktion übertragen und zu Gruppen bündeln.
- Nutzer schrittweise umstellen, Land für Land, und die alten Profile erst löschen, wenn niemand sie mehr hat.
```

## Wo fangen Sie an?

Fangen Sie mit einer Bestandsaufnahme an: Wie viele Profile gibt es, wie viele Nutzer hängen an jedem, und welche Integrationsnutzer haben Systemrechte wie „Alle Daten ändern“? Danach schreiben Sie die Rollenmatrix auf, bevor Sie in Salesforce etwas umbauen. Neue Funktionen bekommen ab sofort nur noch Permission Sets. Die Migration der alten Profile kann dann Rolle für Rolle folgen.

Ein gutes Berechtigungskonzept ist eine Tabelle, die der Kunde besitzt, und eine Regel, dass jedes neue Recht durch ein Review geht. Mehr dazu lesen Sie unter [Salesforce-Architektur auf Kundenseite](../../leistungen/salesforce-architektur/).
