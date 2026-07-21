# Build-Brief: Kontaktformular, Admin-Bereich, Kommentar-Verwaltung

Fuer Claude Code in VS Code. Erweiterung von sebastiancook.com (Astro auf Cloudflare Pages). Bitte Reihenfolge einhalten und an den markierten Stellen erst mit Sebastian abstimmen, bevor weitergebaut wird (siehe "Offene Fragen" am Ende).

## 0. Bestandsaufnahme zuerst (wichtig, vor allem anderen)

Es existiert bereits ein Kommentar-System mit einer SQL-Datenbank (vermutlich Cloudflare D1, aus einer frueheren Session entstanden). Bevor irgendetwas Neues gebaut wird:

- [ ] Vorhandene Kommentar-Implementierung im Repo lokalisieren (Schema, Migrations, API-Routen/Functions, Frontend-Komponente).
- [ ] Datenbank-Schema der Kommentare dokumentieren (Felder, Status/Moderation vorhanden ja/nein, Verknuepfung zu Artikeln).
- [ ] Pruefen, ob Kommentare aktuell eine Moderationsstufe haben (z.B. "pending"/"approved") oder direkt live gehen.
- [ ] Kurze Zusammenfassung an Sebastian zurueckmelden, bevor der Admin-Bereich (Abschnitt 3) gebaut wird.

## 1. Kontaktformular

- [ ] Eigener Reiter in der Navigation, oberhalb/neben dem bestehenden Header-Menu (Home, Cookbook, Tags, About, **Contact**).
- [ ] Formularfelder: Name, E-Mail-Adresse, Thema, grosses Freitextfeld (Nachricht).
- [ ] Thema-Feld als kleines Dropdown mit sinnvollen Kategorien (z.B. "General question", "Collaboration", "Speaking / MVP", "Feedback", "Other") plus Freitext-Fallback bei "Other". Das ist eine Annahme, bei Bedarf mit Sebastian abstimmen.
- [ ] Client- und serverseitige Validierung (Pflichtfelder, gueltiges E-Mail-Format).

### Technische Umsetzung Versand (Empfehlung)

- [ ] **Cloudflare Pages Function** als Formular-Endpoint (`/functions/api/contact.ts` o.ae.), da die Seite ohnehin auf Cloudflare laeuft und schon eine Cloudflare-Datenbank existiert. Kein zusaetzlicher externer Dienst noetig.
- [ ] E-Mail-Versand ueber **Resend** (grosszuegige Gratis-Stufe, einfache API, gutes eigenes Branding der Mail). API-Key als Cloudflare-Secret hinterlegen, nicht im Code.
- [ ] Alternative, falls kein eigener Code gewuenscht ist: fertiger Formular-Dienst wie Web3Forms/Formspree, dafuer kein Cloudflare-Function-Code noetig, aber externe Abhaengigkeit und weniger Branding-Kontrolle. Nur nutzen, falls die Cloudflare-Function-Loesung zu aufwendig wirkt.
- [ ] Eingehende Kontaktanfragen zusaetzlich in der bestehenden Datenbank speichern (eigene Tabelle `contact_messages` o.ae.: Name, E-Mail, Thema, Nachricht, Zeitstempel), damit sie auch im Admin-Bereich einsehbar sind, nicht nur per Mail.

### Spam-Schutz (Empfehlung, nicht explizit angefragt, aber wichtig)

- [ ] **Cloudflare Turnstile** einbauen (kostenlose, datenschutzfreundliche Captcha-Alternative, arbeitet nahtlos mit Cloudflare Pages zusammen). Ein oeffentliches Kontaktformular plus bestehende Kommentare sind ein reales Spam-Ziel, das sollte nicht uebersehen werden. Mit Sebastian kurz bestaetigen, ob gewuenscht.

## 2. Benachrichtigung bei neuer Kontaktanfrage

- [ ] Bei jeder eingehenden Kontaktanfrage automatisch eine Benachrichtigungs-Mail an Sebastian, ueber denselben Resend-Versandweg wie das Formular selbst.
- [ ] Kein zusaetzlicher Kanal (kein Discord/Telegram) noetig, ausschliesslich E-Mail.

## 3. Admin-Bereich

### Zugriff/Login

Noch nicht final entschieden. Empfehlung: **Cloudflare Access** (Zero Trust) vor der `/admin`-Route, Login per einmaligem E-Mail-Code an Sebastians eigene Adresse, kein eigener Passwort-/Session-Code noetig, in Minuten eingerichtet, sehr sicher, kein laufender Wartungsaufwand.

Alternative: ein selbst gebautes Login-System (Passwort/Session im Code), nur sinnvoll bei speziellen Anforderungen (z.B. mehrere Admin-Nutzer, eigenes Login-UI). Fuer einen Einzel-Admin-Blog ist das mehr Aufwand ohne echten Zusatznutzen.

- [ ] Mit Sebastian final klaeren, bevor implementiert wird (siehe "Offene Fragen").
- [ ] Nach Entscheidung: `/admin`-Bereich hinter der gewaehlten Loesung absichern.

### Funktionsumfang Admin-Bereich

- [ ] **Kommentar-Uebersicht**: alle Kommentare listen, inklusive eventuell noch nicht freigegebener/versteckter Kommentare (abhaengig vom Ergebnis der Bestandsaufnahme aus Abschnitt 0).
- [ ] **Kommentare loeschen**: Loesch-Button direkt in der Liste, ruft eine geschuetzte API-Route auf, die den Eintrag aus der Datenbank entfernt. Ersetzt das manuelle Arbeiten in der SQL-Datenbank.
- [ ] **Kontaktanfragen-Uebersicht**: die in Abschnitt 1 gespeicherten `contact_messages` ebenfalls im Admin-Bereich auflisten (Name, E-Mail, Thema, Nachricht, Datum), damit nichts nur in der Mailbox landet.
- [ ] Einfache, funktionale UI, kein aufwendiges Dashboard-Design noetig, Uebersichtlichkeit vor Optik.

## 4. Empfohlene Reihenfolge fuer Claude Code

1. Bestandsaufnahme Kommentar-System und Datenbank (Abschnitt 0), Ergebnis kurz an Sebastian melden.
2. Admin-Login-Entscheidung mit Sebastian final klaeren (siehe offene Fragen).
3. Kontaktformular UI plus Cloudflare Function plus Resend-Anbindung (Abschnitt 1).
4. Speicherung der Kontaktanfragen in der Datenbank, Benachrichtigungsmail (Abschnitt 1-2).
5. Admin-Bereich: Zugriffsschutz einrichten, dann Kommentar- und Kontaktanfragen-Uebersicht mit Loesch-Funktion (Abschnitt 3).
6. Turnstile-Spam-Schutz ergaenzen, sobald das Formular funktional steht.

## Offene Fragen, die Claude Code vor dem Bauen mit Sebastian klaeren soll

- Welche Login-Loesung fuer den Admin-Bereich: Cloudflare Access (empfohlen) oder eigenes Login-System?
- Ist Cloudflare Turnstile fuer das Kontaktformular gewuenscht?
- Passt die Dropdown-Liste fuer das "Thema"-Feld, oder soll es reiner Freitext sein?
- Sollen Kommentare, die aktuell evtl. eine Moderationsstufe haben, im Admin-Bereich getrennt nach "wartet auf Freigabe" und "veroeffentlicht" angezeigt werden, oder reicht eine gemeinsame Liste?
