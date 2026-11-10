---
title: "Salesforce-Berechtigungskonzept mit Permission Sets"
description: "Profile oder Permission Sets? Wie ein Salesforce-Berechtigungskonzept aufgebaut ist und sauber bleibt, wenn mehrere Partner an derselben Org bauen."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-berechtigungskonzept-permission-sets
translationKey: permission-concept-permission-sets
topic: security
categories: [architecture, devops]
tags: [Berechtigungskonzept, Permission Sets, Sicherheit, Partnersteuerung]
takeaways:
  - "Salesforce hat die Abschaffung der Berechtigungen in Profilen im Juni 2026 abgesagt. Neue Rechte gehören trotzdem in Permission Sets."
  - "Das Konzept hat zwei Ebenen: was ein Nutzer tun darf und welche Datensätze er über das Sharing sieht. Rechte wie „Alle Daten anzeigen“ umgehen das Sharing."
  - "Ich empfehle so wenige schlanke Basisprofile wie möglich, Permission Sets pro Funktion und Permission Set Groups pro Jobfunktion, die der Kunde verantwortet."
  - "Mit mehreren Partnern liefert jeder Stream Permission Sets für seine Funktionen, die Zuordnung zu Jobfunktionen bleibt beim Kunden und geht durch das Review."
faq:
  - q: "Was ist der Unterschied zwischen Profil und Permission Set?"
    a: "Jeder Nutzer hat genau ein Profil und kann zusätzlich mehrere Permission Sets und Permission Set Groups erhalten, passend zu seiner Lizenz. Beide können Objekt-, Feld- und Systemrechte vergeben; Einstellungen wie Login-Zeiten, IP-Bereiche, Standard-App, Standard-Datensatztypen und Seitenlayout-Zuordnungen gibt es nur im Profil."
  - q: "Schafft Salesforce die Berechtigungen in Profilen ab?"
    a: "Nein. Salesforce hatte das Ende der Berechtigungen in Profilen für Spring '26 angekündigt und die Abschaffung im Juni 2026 abgesagt. Die Empfehlung bleibt: Profile für Grundeinstellungen, neue Rechte über Permission Sets und Permission Set Groups vergeben."
  - q: "Was ist eine Permission Set Group?"
    a: "Eine Permission Set Group bündelt mehrere Permission Sets zu einer Jobfunktion, etwa Vertriebsinnendienst. Ein Muting Permission Set in der Gruppe nimmt einzelne Rechte wieder heraus, ohne die Sets selbst zu ändern. Es wirkt nur auf Rechte aus dieser Gruppe: Bekommt der Nutzer dasselbe Recht über sein Profil, ein direkt zugewiesenes Permission Set oder eine andere Gruppe, bleibt es bestehen."
  - q: "Wer sollte das Berechtigungskonzept verantworten?"
    a: "Der Kunde. Partner liefern die Permission Sets für ihre Funktionen, aber wer welche Jobfunktion bekommt und welche Rechte sie bündelt, entscheidet der Kunde. Technisch prüft der Kunde die Änderung im Pull-Request-Review, fachlich gibt sie die Person frei, die für die Rollenmatrix verantwortlich ist."
  - q: "Wie prüfe ich, welche Rechte ein Nutzer in Salesforce wirklich hat?"
    a: "Das prüfen Sie über die Zugriffsübersicht am Nutzerdatensatz; sie zeigt, aus welchem Profil, Permission Set oder welcher Gruppe ein Recht kommt. Gleichen Sie das regelmäßig mit der Rollenmatrix ab, besonders für Systemrechte wie „Alle Daten modifizieren“ und für Integrationsnutzer."
draft: false
---

Ein Salesforce-Berechtigungskonzept legt fest, was jeder Nutzer tun darf und welche Datensätze er sieht. Ich baue es heute mit so wenigen schlanken Basisprofilen wie möglich, Permission Sets pro Funktion und Permission Set Groups pro Jobfunktion. Profile enthalten nur noch Einstellungen, die es ausschließlich im Profil gibt, etwa Login-Zeiten, IP-Bereiche, Standard-App, Standard-Datensatztypen und Seitenlayout-Zuordnungen. Arbeiten mehrere Partner an der Org, liefert jeder Stream die Permission Sets für seine Funktionen, und der Kunde entscheidet, welche Jobfunktion welche Sets bekommt. So bleibt das Konzept lesbar, auch nach dem dritten Partnerwechsel.

## Welche zwei Ebenen hat ein Berechtigungskonzept?

Viele Konzepte vermischen zwei Fragen, die man getrennt planen sollte:

| Ebene | Frage | Werkzeuge in Salesforce |
|---|---|---|
| Rechte | Was darf der Nutzer tun? Welche Objekte, Felder, Apps und Funktionen? | Profil, Permission Set, Permission Set Group |
| Sichtbarkeit | Welche Datensätze sieht er? | u. a. organisationsweite Standards, Rollenhierarchie, Freigaberegeln, Teams, Territorien, für Portalnutzer Sharing Sets und Share Groups |

Ein Techniker im Außendienst darf zum Beispiel Arbeitsaufträge bearbeiten (Rechte), sieht aber nur die Aufträge seiner Region (Sichtbarkeit). Ein Händler im Portal darf Garantieanträge anlegen, sieht aber nur die Anlagen seiner eigenen Kunden. Wer beide Ebenen in einem Dokument mischt, findet später nicht heraus, warum ein Nutzer etwas sieht, das er nicht sehen soll. Ganz unabhängig sind sie allerdings nicht: Rechte wie „Alle Datensätze anzeigen“ auf einem Objekt oder „Alle Daten anzeigen“ umgehen das Sharing. Der wirksame Zugriff ergibt sich aus beiden Ebenen zusammen.

## Profile oder Permission Sets?

Jeder Nutzer hat genau ein Profil und kann mehrere Permission Sets haben. Lange Zeit lagen fast alle Rechte im Profil. Das Ergebnis kenne ich aus vielen gewachsenen Orgs: Für jede Kombination aus Land, Abteilung und Sonderfall entsteht ein neues Profil, bis es dreißig davon gibt, die sich in Kleinigkeiten unterscheiden.

Salesforce hatte 2023 angekündigt, die Berechtigungen in Profilen mit Spring '26 abzuschaffen ([Salesforce Admins Blog](https://admin.salesforce.com/blog/2023/permissions-updates-learn-moar-spring-23)). Im Juni 2026 hat Salesforce die Abschaffung in einem Knowledge-Artikel abgesagt ([Salesforce Ben](https://www.salesforceben.com/salesforce-backtracks-on-permission-retirement-in-profiles/)). Profile behalten ihre Berechtigungen also. Die Richtung ist trotzdem klar: Neue Funktionen werden für Permission Sets und Permission Set Groups bereitgestellt, nicht für Profile. Ich behandle Profile deshalb wie Change Sets: Sie funktionieren noch, aber niemand sollte darauf neu aufbauen.

```hinweis tipp
Prüfen Sie vor jedem neuen Profil, ob ein Permission Set reicht. In den meisten Fällen reicht es. Ein neues Profil ist eigentlich nur für eine andere Benutzerlizenz oder für Einstellungen nötig, die es nur im Profil gibt: abweichende Login-Regeln, Standard-App, Standard-Datensatztypen oder Seitenlayouts.
```

## Basisprofil, Permission Sets und Gruppen pro Jobfunktion

Ich baue es in drei Schichten:

1. **So wenige Basisprofile wie möglich.** Meist genügt eines je Benutzerlizenz, etwa für interne Nutzer, für Portalnutzer und für Integrationsnutzer; ein weiteres ist nur nötig, wenn Standard-App, Seitenlayouts oder Login-Regeln wirklich abweichen. Das Profil enthält die Grundeinstellungen, keine fachlichen Rechte. Salesforce liefert dafür das Profil „Minimum Access - Salesforce“ als Ausgangspunkt, für Integrationen „Minimum Access - API Only Integrations“.
2. **Permission Sets pro Funktion.** Ein Set für „Angebote erstellen“, eines für „Arbeitsaufträge disponieren“, eines für „Garantieanträge prüfen“. Ein Set beschreibt eine Fähigkeit, nicht eine Person.
3. **Permission Set Groups pro Jobfunktion.** Die Gruppe „Vertriebsinnendienst“ bündelt die Sets, die diese Jobfunktion braucht. Das Land gehört nicht in die Gruppe, sondern in die Sichtbarkeit. Braucht eine Jobfunktion ein Recht aus einem Set ausdrücklich nicht, nimmt ein Muting Permission Set es in dieser Gruppe wieder heraus. Das wirkt nur auf Rechte aus der Gruppe selbst, nicht auf dasselbe Recht aus dem Profil oder einem direkt zugewiesenen Set. Ich spreche hier bewusst von Jobfunktion, weil „Rolle“ in Salesforce die Rollenhierarchie für die Sichtbarkeit meint.

Nutzer bekommen dann ein Basisprofil und eine oder zwei Gruppen. Die Zuordnung lässt sich über User Access Policies automatisieren, sofern Ihre Edition sie bietet, etwa anhand von Abteilung oder Land im Nutzerdatensatz. Dann muss klar geregelt sein, wer diese Felder ändern darf, und die Policy muss Rechte beim Wechsel auch wieder entziehen. Wechselt ein Mitarbeiter vom Vertrieb in den Service, weist man ihm eine andere Gruppe zu, statt ein Profil mit hundert Unterschieden zu ersetzen.

Die Sichtbarkeit plane ich getrennt davon. Bei Herstellern mit Gesellschaften in vielen Ländern beginnt sie meist mit einer einfachen Frage: Darf der Vertrieb in Frankreich die Kunden in Deutschland sehen? Lautet die Antwort nein, steht der organisationsweite Standard für Accounts auf privat, und die Rollenhierarchie bildet Länder und Regionen in getrennten Zweigen ab. Dabei hilft es, sich zu merken, dass die Rollenhierarchie den Zugriff für übergeordnete Rollen öffnet: Wer oberhalb beider Länderzweige steht, sieht beide. Sie folgt deshalb dem Bedarf an Sichtbarkeit, nicht dem Organigramm. Ausnahmen, etwa ein Key Account Manager für einen Konzernkunden in mehreren Ländern, regeln Freigaberegeln oder Account Teams. Händler und Servicepartner im Portal sehen ihre Datensätze je nach Lizenz über externe organisationsweite Standards, Sharing Sets, Share Groups oder Partnerrollen. Diese Entscheidungen gehören früh ins Konzept, weil sie sich später nur mit großem Testaufwand ändern lassen.

Für Integrationsnutzer gilt eine eigene Regel: Pro Schnittstelle gibt es einen Nutzer mit der Lizenz Salesforce Integration und dem Profil „Minimum Access - API Only Integrations“, dazu ein Permission Set mit genau den Objekten, Feldern und Rechten, die diese Schnittstelle braucht. Ein Integrationsnutzer mit „Alle Daten modifizieren“ ist ein hohes Risiko, weil diese Berechtigung das Sharing für die ganze Org umgeht und oft niemand mehr weiß, was der Nutzer alles darf. Wie man bestehende Integrationsnutzer aufräumt, steht in [Integrationsbenutzer aufräumen](../salesforce-integrationsbenutzer-aufraeumen/).

## Wie bleibt das Konzept sauber, wenn mehrere Partner bauen?

Mit mehreren Partnern entsteht das Durcheinander meist nicht aus bösem Willen. Jeder Partner braucht für sein Feature schnell ein Recht, und am schnellsten geht es, ein vorhandenes Profil zu erweitern. Nach einem Jahr kann niemand mehr sagen, welches Recht zu welchem Feature gehört.

Diese Regeln halte ich für das Minimum:

- **Jeder Stream liefert eigene Permission Sets.** Der Name des Sets nennt die Fähigkeit, etwa `FS_Disponent` oder `SALES_Angebot`; Stream und Verantwortlicher stehen in der Beschreibung. Welcher Stream für welches Objekt verantwortlich ist, steht in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).
- **Profile und Gruppen gehören dem Kunden.** Partner dürfen Änderungen vorschlagen, aber welche Jobfunktion welches Set bekommt, entscheidet der Kunde. Ein Pull Request, der ein Profil oder eine Gruppe ändert, braucht eine Freigabe durch einen benannten Reviewer auf Kundenseite.
- **Rechte gehen durch das Review.** Permission Sets sind Metadaten im Repository und erscheinen im Pull Request wie Code. Der Reviewer prüft, ob ein neues Recht wirklich nötig ist, besonders bei „Alle anzeigen“, „Alle ändern“ und Systemrechten. Mehr dazu in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).
- **Eine Rollenmatrix, die der Kunde besitzt.** Eine Tabelle mit Jobfunktionen in den Zeilen und Permission Sets in den Spalten. Sie ist der freigegebene Sollzustand, die Gruppen in Salesforce sind die technische Umsetzung. Ein regelmäßiger Abgleich mit dem wirksamen Zugriff in Salesforce zeigt, wo direkt zugewiesene Sets oder alte Profilrechte davon abweichen.

```vertiefung Für Admins
titel: Wie migriere ich von vielen Profilen zu Permission Sets?
Salesforce bietet den kostenlosen User Access and Permissions Assistant, der vorhandene Profile analysiert und Rechte in Permission Sets übertragen kann. Einstellungen wie Standard-App, Seitenlayouts und Login-Regeln bleiben dabei im Profil.
- Legen Sie zuerst die Jobfunktionen und Fähigkeiten in der Rollenmatrix fest, sonst werden aus dreißig Profilen nur dreißig Permission Sets.
- Legen Sie Rechte, die alle Nutzer einer Lizenz brauchen, in ein Basis-Permission-Set, übertragen Sie abweichende Rechte in Permission Sets pro Funktion und bündeln Sie diese zu Gruppen.
- Stellen Sie Nutzer schrittweise um, Land für Land, und löschen Sie selbst angelegte Profile erst, wenn niemand sie mehr hat.
```

## Bestandsaufnahme der Profile und Systemrechte

Fangen Sie mit einer Bestandsaufnahme an: Wie viele Profile gibt es, wie viele Nutzer sind jedem Profil zugeordnet, und welche Integrationsnutzer haben Systemrechte wie „Alle Daten modifizieren“? Danach schreiben Sie die Rollenmatrix auf, bevor Sie in Salesforce etwas umbauen. Neue Funktionen bekommen ab sofort nur noch Permission Sets. Die Migration der alten Profile kann dann Jobfunktion für Jobfunktion folgen. Für den ersten Überblick reicht ein Benutzerbericht, gruppiert nach Profil. Jeder Integrationsnutzer bekommt danach ein eigenes Permission Set mit genau den Objekten, die seine Schnittstelle liest oder schreibt. Wie ich das auf Kundenseite aufsetze, steht unter [Salesforce-Architektur auf Kundenseite](../../leistungen/salesforce-architektur/).
