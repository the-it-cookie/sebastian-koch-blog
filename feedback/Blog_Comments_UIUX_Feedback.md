# Kommentarbereich - UI/UX Feedback und To-Do

Basis: Screenshot des aktuellen Kommentarbereichs (21.07.2026). Feedback von Sebastian plus Ergaenzungen. Alle Farb-/Stil-Referenzen nutzen dieselben CSS-Variablen wie der Rest der Seite (`--text-accent`, `--text-primary`, `--text-secondary`, `--surface-1`, `--border`, `--border-strong`).

## Von Sebastian angefordert

- [ ] **"Author"-Badge entfernen.** Aktuell steht "Sebastian CookAuthor" ohne Abstand zusammen. Badge komplett entfernen, wie gewuenscht. Falls spaeter doch eine Kennzeichnung fuer Autor-Antworten gewuenscht ist: als eigenes kleines Pill-Badge mit Abstand umsetzen, nicht als angehaengter Text.
- [ ] **Reply-Button im Website-Stil.** Aktuell nackter Browser-Default-Button (graue Box, Standard-Border). Umstellen auf kleinen Pill-Button, Akzentfarbe `var(--text-accent)`, dezenter Hover-Effekt, passend zu den uebrigen Buttons/CTAs der Seite (z.B. "Read Article").
- [ ] **Name-Datum-Zeile optimieren.** Name und Datum wirken aktuell zu dicht/undifferenziert. Vorschlag: Name in `var(--text-primary)`, fett; Trennzeichen (Punkt) mit etwas mehr Abstand; Datum in `var(--text-secondary)`, kleinere Schriftgroesse. Gleiches Muster wie bei der Artikel-Metadatenzeile ("Jul 24, 2026 · 2 min read") verwenden, damit es konsistent zum Rest der Seite ist.
- [ ] **Text klarer vom Namen abgegrenzt.** Kommentartext ist aktuell in derselben (Link-)Farbe wie der Name, dadurch wirkt der Text selbst wie ein Link. Name bleibt fett/`text-primary`, Kommentartext in normaler Textfarbe (`text-primary` oder `text-secondary`, regular weight, keine Linkfarbe). Zusaetzlich etwas mehr vertikalen Abstand (8-12px) zwischen Meta-Zeile und Kommentartext einfuegen.

## Ergaenzungen (Claude)

- [ ] **Avatare vereinheitlichen.** Manche Kommentare haben ein Avatar-Icon, andere (z.B. "test") keins. Einheitlich loesen: entweder generischer Platzhalter-Avatar fuer alle Kommentare, oder Avatare ganz weglassen und nur beim echten Autor-Profilbild zeigen.
- [ ] **Kommentare visuell voneinander abgrenzen.** Aktuell nur durch Whitespace getrennt, bei mehreren Kommentaren schwer scannbar. Entweder dezente Trennlinie (`border-bottom: 1px solid var(--border)`) zwischen Kommentaren, oder ein ganz leichter Card-Hintergrund (`var(--surface-1)`) mit Innenabstand pro Kommentar.
- [ ] **Antwort-Hierarchie sichtbarer machen.** Aktuell nur durch Einrueckung erkennbar. Duenne Akzentlinie am linken Rand von Antworten (`border-left: 2px solid var(--border)` oder leicht transparente Akzentfarbe) ergaenzen, damit die Baumstruktur auch bei mehreren Ebenen klar bleibt.
- [ ] **Kommentar-Anzahl in der Ueberschrift.** "Comments" durch "Comments (3)" o.ae. ersetzen, Anzahl dynamisch aus der Datenbank ziehen. Gibt Besuchern eine Erwartungshaltung, bevor sie scrollen.
- [ ] **Abstand vor dem Reply-Button.** Button klebt aktuell direkt am Kommentartext. Etwas mehr `margin-top` ergaenzen, damit Text und Aktion klar getrennt sind.

## Hinweis

Diese Punkte betreffen nur die Darstellung des bestehenden Kommentar-Systems (Frontend/Styling), keine Aenderung an Datenbank oder Admin-Funktionalitaet aus `Blog_Contact_Admin_Brief.md`.
