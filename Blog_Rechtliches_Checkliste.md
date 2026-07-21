# Rechtliche Checkliste - sebastiancook.com

Hinweis: keine Rechtsberatung, sondern ein praktischer Ueberblick. Bei Unsicherheit vor Launch kurz mit Anwalt fuer IT-Recht oder einem Generator-Tool (z.B. e-recht24) gegenchecken.

**Status:** Impressum und Datenschutzerklaerung sind live (`/imprint`, `/privacy`), im Footer verlinkt. Offene Punkte unten sind laufende Pruefungen (z.B. vor jedem neuen Artikel), keine einmaligen Aufgaben.

## Impressum

- [x] Impressum-Seite anlegen, auch wenn Status als "private Seite" rechtlich nicht ganz eindeutig ist. Empfehlung: im Zweifel immer eins haben.
  - *Erledigt: `/imprint`.*
- [x] Rechtsgrundlage korrekt zitieren: **§ 5 DDG**, nicht mehr § 5 TMG (DDG hat TMG am 14.05.2024 abgeloest).
  - *Erledigt: Seite zitiert explizit § 5 DDG.*
- [x] Pflichtangaben ergaenzen: Name, Anschrift, Kontaktmoeglichkeit (E-Mail reicht meist).
  - *Erledigt: Sebastian Koch, Industriestraße 29, 82194 Gröbenzell, sebastian.koch@consos.de.*
- [x] Pruefen, ob ein Hinweis auf den Arbeitgeber (CONSOS GmbH) noetig/sinnvoll ist, da beruflicher Bezug im About besteht.
  - *Erledigt: kurzer Hinweis ergaenzt, dass es sich um ein privates Projekt ohne Verbindung zu CONSOS GmbH handelt.*
- [x] Erreichbarkeit sicherstellen: Impressum von jeder Unterseite in maximal 1-2 Klicks erreichbar (z.B. Link im Footer).
  - *Erledigt: Footer-Link auf jeder Seite.*

## Datenschutzerklaerung

- [x] Datenschutzerklaerung als **eigene, getrennte Seite** vom Impressum anlegen (nicht im Impressum "verstecken", sonst Abmahnrisiko).
  - *Erledigt: `/privacy`, eigenstaendige Seite.*
- [x] Von jeder Unterseite mit 1-2 Klicks erreichbar, eindeutig als "Datenschutz" o.ae. gekennzeichnet.
  - *Erledigt: Footer-Link "Privacy" auf jeder Seite.*
- [x] Hosting/Server-Logs erwaehnen: Cloudflare Pages als Auftragsverarbeiter nennen (IP-Adressen, Logs).
  - *Erledigt (Hosting ist technisch Cloudflare Workers/Assets statt "Pages", aber gleiche Auftragsverarbeiter-Logik; im Text so erklaert).*
- [x] Falls Analytics oder externe Font-/Script-Einbindung genutzt wird: entsprechend in der Datenschutzerklaerung dokumentieren.
  - *Erledigt: Abschnitt erklaert explizit, dass es keine Analytics gibt, Fonts lokal gehostet sind, und was Cloudflare Turnstile (Kommentar-Captcha) macht.*
- [x] Kontaktmoeglichkeit fuer Betroffenenanfragen (Auskunft, Loeschung) angeben.
  - *Erledigt: E-Mail-Kontakt im Abschnitt "Your rights".*
- [x] Hinweis: DSGVO gilt unabhaengig von der Seitensprache (Englisch), weil Betreiber in Deutschland ansaessig ist.
  - *Erledigt: als einleitender Satz auf der Seite.*

## Cookies und Tracking

- [x] Pruefen, ob wirklich nicht-technisch-notwendige Cookies/Tracking eingesetzt werden (Analytics, externe Fonts, eingebettete Videos).
  - *Geprueft: kein Analytics, keine externen Fonts (IBM Plex wird lokal gehostet), keine eingebetteten Videos.*
- [x] Falls nein (reiner statischer Astro-Blog ohne Analytics): kein Cookie-Banner noetig.
  - *Zutreffend: kein Cookie-Banner eingebaut, Begruendung steht in der Datenschutzerklaerung (Turnstile laeuft nur funktional auf Artikelseiten mit Kommentarformular).*
- [ ] Falls ja (z.B. Google Fonts extern, Analytics-Tool): Cookie-Consent-Banner einbauen und in der Datenschutzerklaerung dokumentieren.
  - *Nicht zutreffend, da kein Tracking vorhanden — bei zukuenftiger Einfuehrung von Analytics erneut pruefen.*
- [x] Bei Font-Einbindung pruefen: lokal hosten statt extern laden, spart oft den Consent-Fall komplett.
  - *Erledigt: IBM Plex wird zur Build-Zeit heruntergeladen und von der eigenen Domain ausgeliefert, kein Request an Google zur Laufzeit.*

## Urheberrecht bei Bildern und Screenshots

- [x] Eigene Screenshots/Fotos: unkritisch, sofern alle kundenspezifischen Inhalte anonymisiert sind (siehe Anonymisierungs-Regeln in den Artikel-Briefs).
  - *Geprueft: Profilfoto und das Consent-Hierarchie-Diagramm sind eigenes Material, keine Kundenbezuege.*
- [ ] Fremde Grafiken (z.B. offizielle Microsoft-Diagramme) nicht selbst hosten, sondern verlinken und Quelle nennen.
  - *Bewusste Abweichung: die Microsoft-Produktlogos (Power Platform, Power Apps, Power Automate, Dataverse, Copilot Studio, CIJ) werden weiterhin selbst gehostet. Entscheidung: rein beschreibender Gebrauch der eigenen Produktlogos zur Kennzeichnung der genutzten Technologien (nominativer Gebrauch), kein Rebranding, geringes Risiko. Bei Bedarf jederzeit auf Verlinkung umstellbar.*
- [ ] Bei jedem neuen Artikel kurz gegenchecken, ob Bildmaterial eigenes Werk, lizenzfrei oder korrekt zitiert ist.
  - *Laufender Prozess, keine einmalige Aufgabe — bei jedem neuen Artikel erneut pruefen.*

## Haftungsausschluss fuer externe Links

- [x] Kurzen Disclaimer ergaenzen (z.B. im Footer oder auf einer eigenen Seite): keine Kontrolle ueber Inhalte verlinkter externer Seiten. Kein Muss, aber Standard und schnell erledigt.
  - *Erledigt: als eigener Abschnitt "Liability for links" im Impressum.*

## Beruflicher Kontext (kein Website-Recht, aber wichtig fuer die Inhalte)

- [ ] Vor jeder Veroeffentlichung nochmal bewusst gegenchecken: Anonymisierung von Kundennamen, GUIDs, internen Feldnamen (Arbeitsvertrag/NDA-Perspektive, nicht Website-Recht).
  - *Laufender Prozess, keine einmalige Aufgabe — gilt fuer jeden kuenftigen Artikel.*

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
