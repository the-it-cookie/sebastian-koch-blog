# Rechtliche Checkliste - sebastiancook.com

Hinweis: keine Rechtsberatung, sondern ein praktischer Ueberblick. Bei Unsicherheit vor Launch kurz mit Anwalt fuer IT-Recht oder einem Generator-Tool (z.B. e-recht24) gegenchecken.

## Impressum

- [ ] Impressum-Seite anlegen, auch wenn Status als "private Seite" rechtlich nicht ganz eindeutig ist. Empfehlung: im Zweifel immer eins haben.
- [ ] Rechtsgrundlage korrekt zitieren: **§ 5 DDG**, nicht mehr § 5 TMG (DDG hat TMG am 14.05.2024 abgeloest).
- [ ] Pflichtangaben ergaenzen: Name, Anschrift, Kontaktmoeglichkeit (E-Mail reicht meist).
- [ ] Pruefen, ob ein Hinweis auf den Arbeitgeber (CONSOS GmbH) noetig/sinnvoll ist, da beruflicher Bezug im About besteht.
- [ ] Erreichbarkeit sicherstellen: Impressum von jeder Unterseite in maximal 1-2 Klicks erreichbar (z.B. Link im Footer).

## Datenschutzerklaerung

- [ ] Datenschutzerklaerung als **eigene, getrennte Seite** vom Impressum anlegen (nicht im Impressum "verstecken", sonst Abmahnrisiko).
- [ ] Von jeder Unterseite mit 1-2 Klicks erreichbar, eindeutig als "Datenschutz" o.ae. gekennzeichnet.
- [ ] Hosting/Server-Logs erwaehnen: Cloudflare Pages als Auftragsverarbeiter nennen (IP-Adressen, Logs).
- [ ] Falls Analytics oder externe Font-/Script-Einbindung genutzt wird: entsprechend in der Datenschutzerklaerung dokumentieren.
- [ ] Kontaktmoeglichkeit fuer Betroffenenanfragen (Auskunft, Loeschung) angeben.
- [ ] Hinweis: DSGVO gilt unabhaengig von der Seitensprache (Englisch), weil Betreiber in Deutschland ansaessig ist.

## Cookies und Tracking

- [ ] Pruefen, ob wirklich nicht-technisch-notwendige Cookies/Tracking eingesetzt werden (Analytics, externe Fonts, eingebettete Videos).
- [ ] Falls nein (reiner statischer Astro-Blog ohne Analytics): kein Cookie-Banner noetig.
- [ ] Falls ja (z.B. Google Fonts extern, Analytics-Tool): Cookie-Consent-Banner einbauen und in der Datenschutzerklaerung dokumentieren.
- [ ] Bei Font-Einbindung pruefen: lokal hosten statt extern laden, spart oft den Consent-Fall komplett.

## Urheberrecht bei Bildern und Screenshots

- [ ] Eigene Screenshots/Fotos: unkritisch, sofern alle kundenspezifischen Inhalte anonymisiert sind (siehe Anonymisierungs-Regeln in den Artikel-Briefs).
- [ ] Fremde Grafiken (z.B. offizielle Microsoft-Diagramme) nicht selbst hosten, sondern verlinken und Quelle nennen.
- [ ] Bei jedem neuen Artikel kurz gegenchecken, ob Bildmaterial eigenes Werk, lizenzfrei oder korrekt zitiert ist.

## Haftungsausschluss fuer externe Links

- [ ] Kurzen Disclaimer ergaenzen (z.B. im Footer oder auf einer eigenen Seite): keine Kontrolle ueber Inhalte verlinkter externer Seiten. Kein Muss, aber Standard und schnell erledigt.

## Beruflicher Kontext (kein Website-Recht, aber wichtig fuer die Inhalte)

- [ ] Vor jeder Veroeffentlichung nochmal bewusst gegenchecken: Anonymisierung von Kundennamen, GUIDs, internen Feldnamen (Arbeitsvertrag/NDA-Perspektive, nicht Website-Recht).

## Aktuell nicht relevant (zur Info, kein Handlungsbedarf)

- Barrierefreiheitsstaerkungsgesetz: greift erst bei bestimmten kommerziellen digitalen Diensten, nicht bei einem privaten Fachblog ohne Verkauf/Vertragsabschluss.
- Gewerbeanmeldung: fuer einen unmonetarisierten Blog nicht noetig. Wird erst relevant bei Werbeeinnahmen, Affiliate-Links oder bezahlten Kooperationen, dann neu pruefen.

## Priorisierung

1. Impressum und Datenschutzerklaerung zuerst, das sind die zwei Punkte mit echtem Abmahnrisiko.
2. Cookie-Check direkt danach, haengt an der technischen Umsetzung (Analytics ja/nein, Font-Hosting).
3. Haftungsausschluss und Bildrechte-Check sind schnelle Nebenlaeufer.
4. Gewerbeanmeldung/Barrierefreiheit erst bei Monetarisierung neu bewerten.

## Quellen

- Digitale-Dienste-Gesetz (DDG): https://gesetze-im-internet.de/ddg
- Impressum und Datenschutz-Ausfuehrungen auf einer Website unterbringen: https://www.datenschutz.org/impressum-datenschutz/
- IHK, Informationspflichten im Internet - Die Impressumspflicht: https://www.ihk.de
