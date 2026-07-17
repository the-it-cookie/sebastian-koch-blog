# Build-Brief: Astro-Blog fuer Sebastian Koch

Diese Datei ist die Anweisung fuer Claude Code in VS Code. Ziel ist ein statischer, englischsprachiger Fachblog unter eigenem Namen. Arbeite die Abschnitte der Reihe nach ab und frag nach, wenn eine Entscheidung offen ist.

---

## 1. Ziel und Kontext

- Personenmarke unter dem Namen **Sebastian Koch**, CRM- und Power-Platform-Consultant bei CONSOS GmbH.
- Sprache: **Englisch**, Zielgruppe international (Microsoft Business Applications Community).
- Uebergeordnetes Ziel: Sichtbarkeit als Fachautor aufbauen, mittelfristig Richtung Microsoft MVP (Business Applications).
- Positionierung: breite Basis **Power Platform und Dynamics 365**, aktuelle Tiefe in **Customer Insights - Journeys**, durchgehende Themen **KI (Copilot)** und **DSGVO-Konformitaet**.
- Leitsatz der Marke: "Digitization is tactical, transformation is strategic."

## 2. Tech-Stack und Rahmen

- **Astro** (aktuelle Version), Start vom offiziellen Blog-Template (`npm create astro@latest`, Vorlage "blog").
- Rein statisch, keine Datenbank, kein Backend.
- Inhalte als **Markdown/MDX** ueber Astro Content Collections.
- Deploy: GitHub-Repo, Hosting auf **Cloudflare Pages** (Alternative Netlify), Gratis-Tarif. Build-Command `npm run build`, Output `dist`.
- Eigene Domain wird spaeter angehaengt, zunaechst Hoster-Subdomain moeglich.
- Keine unnoetigen Abhaengigkeiten. Schlank halten.

## 3. Seitenstruktur

- **Home**: kurze Hero-Sektion (Name, Ein-Satz-Positionierung, Leitsatz), darunter die neuesten Artikel.
- **Blog**: Artikeluebersicht mit Titel, Datum, Kurzbeschreibung, Tags, Lesezeit.
- **Artikel**: Einzelseite mit sauberer Typografie, Code-Bloecken mit Syntax-Highlighting, Lesezeit, Tags, Datum.
- **About**: der Text aus Abschnitt 7.
- **Tags**: Filterseite pro Tag.
- **RSS-Feed** und **404-Seite**.

## 4. Designrichtung

Standard, falls nicht anders entschieden: **clean und textfokussiert mit einer Akzentfarbe**.

- Editorialer, ruhiger Look, Lesbarkeit vor Effekten.
- Eine Akzentfarbe (Vorschlag: tiefes Blau oder Teal), sonst neutrale Grautoene.
- Gute Web-Schrift, grosszuegige Zeilenhoehe, Textbreite rund 700px.
- Hell- und Dunkelmodus.
- Mobile-first, sehr schnelle Ladezeit (Ziel: Lighthouse durchgehend gruen).
- Code-Bloecke sind wichtig (JavaScript, JSON, C#-Plugins), also gutes Syntax-Highlighting.

## 5. SEO und Technik

- Pro Seite eigener Title und Meta-Description.
- Open Graph und Twitter Cards fuer geteilte Links.
- `@astrojs/sitemap`, RSS-Feed, canonical URLs.
- Semantische Ueberschriften, Alt-Texte fuer Bilder.
- Optional JSON-LD Article-Schema pro Artikel.

## 6. Content-Modell (Frontmatter je Artikel)

- `title`, `description`, `pubDate`, `updatedDate` (optional), `tags` (Liste), `draft` (bool), `canonical` (optional), `heroImage` (optional).

## 7. Startinhalt: About-Text (uebernehmen)

> I work across Dynamics 365 and the Power Platform, from model-driven apps, Power Automate and Dataverse to Copilot Studio and AI Builder, plus the integrations that hold a solution together. My background as an industrial engineer means I tend to look at the whole process, not just the screen in front of me.
>
> Right now much of my depth sits in Customer Insights - Journeys: consent architecture, double opt-in, real-time journeys and the custom tables, plugins and flows that make marketing automation actually hold up in production. It is where I go deep today, on a base that stays broad.
>
> AI is moving into every corner of Dynamics and the Power Platform, from Copilot in the maker experience to agents built in Copilot Studio. I work with these tools to build faster and to give users smarter journeys and interactions. But the moment AI touches customer data, two things have to stay true at once: it has to be useful, and it has to be compliant.
>
> That is the thread running through most of my work: GDPR-compliant by design. Clean opt-in and double opt-in flows, consent models that map to how an organization really works, and auditable proof of when and how a contact agreed. Compliance treated as an architecture decision, not an afterthought bolted on before go-live.
>
> Here I share what I learn on real projects: practical Power Platform and Dynamics 365 patterns, how I put AI to work without cutting corners on data protection, and the traps that cost me hours so they cost you less.
>
> Wirtschaftsingenieur by training, consultant at CONSOS GmbH by trade. Digitization is tactical, transformation is strategic.

## 8. Startinhalt: erste Artikel-Serie

Dreiteilige DOI-/Consent-Serie, Reihenfolge Konzept, Umsetzung, Fortgeschritten:

1. **How consent really works in Customer Insights - Journeys** (Fundament: Compliance-Profile, Purposes, Topics, Entscheidung Zweck vs Thema).
2. **Prefilling consent in CIJ real-time marketing forms, and the traps nobody warns you about** (technisch, JavaScript, `d365mkt-afterformload`).
3. **Building an auditable double opt-in log in CIJ** (Custom Table, Plugin, Flow, DSGVO-Nachweis).

Details zu allen acht Themen stehen in `Blog_Themen_CIJ.md` im selben Ordner. Fuer den Launch reicht Artikel 1 als vollstaendiger Text plus die beiden anderen als Entwuerfe mit Ueberschriften. Die vollstaendigen Texte werden separat geliefert.

## 9. Wichtig: Anonymisierung

Alle Artikel muessen anonymisiert sein. Keine Kundennamen (kein Bundestheater, Volksoper), keine echten GUIDs, keine internen Plugin- oder Feldnamen wie `co_` oder `data-consos-`. Beispiele generisch halten.

## 10. Ton der Texte

Professionell, direkt, konkret. Keine Buzzwords, kein Marketing-Sprech. Englisch. Der Leitsatz darf als wiederkehrendes Element vorkommen.

## 11. Empfohlene Reihenfolge fuer Claude Code

1. Blog-Template scaffolden und lokal starten.
2. Branding, Sprache, Design und Seitenstruktur anpassen.
3. SEO-Grundlagen einbauen (Sitemap, RSS, Meta, OG).
4. About-Seite mit Text aus Abschnitt 7 fuellen.
5. Erste Artikel als Content Collections anlegen.
6. Deploy-Konfiguration fuer Cloudflare Pages schreiben, README mit Deploy-Schritten.
