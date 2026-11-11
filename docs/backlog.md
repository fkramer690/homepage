# Homepage – Backlog (umgezogen)

Der Backlog wird seit 11.11.2026 nicht mehr in diesem öffentlichen Repo gepflegt. Die einzige Fassung liegt in den Projektdateien des Projekts Homepage (`homepage/backlog/backlog.md`, Regeln in `homepage/backlog/anleitung.md`). Ältere Stände stehen in der Git-Historie dieser Datei.

- Hier nichts mehr eintragen und keinen PR für Backlog-Änderungen anlegen. Ein PR, der einen Backlog-Punkt erledigt, wird nach dem Merge im Backlog in den Projektdateien vermerkt.
- Andere Projekte ohne Zugriff auf diese Projektdateien lesen den Spiegel `projekte/homepage-backlog` (Feld `markdown`) in der Datenbank des Projekt-Dashboards und melden Änderungen als Eintrag in `backlog-aktionen`.
- Ein offener PR, der diese Datei noch ändert, nimmt die Änderung vor dem Merge heraus (`git checkout origin/main -- docs/backlog.md`) und trägt sie sinngemäß im Backlog in den Projektdateien ein.

Point IDs in code comments and docs (for example "backlog U3", "G6", "GT3") refer to that backlog.
