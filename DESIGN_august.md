# DESIGN.md — Sebastian Cook

**Design-Anleitung für Claude Code.** Verbindlich für alles Visuelle.
Stack: **Astro + Tailwind CSS v4**. Sprache der UI: **Deutsch**, Anrede **du**.

---

## 0. Was das ist, in einem Satz

Sebastian Cook ist ein **Blog über Microsoft Dynamics 365 & Power Platform, der aussieht und klingt wie ein Kochblog.** Die Kochwelt trägt Layout, Farbe und Sprache. Die IT-Welt kommt als **Kontrapunkt** dazu: Terminal-Blöcke, Code-Snippets, Monospace-Labels. Nie umgekehrt.

**Die drei Regeln, die alles entscheiden:**
1. **Warm, handgemacht, luftig.** Papierfarbener Grund, Handstrich-Icons, viel Weißraum, ein Schuss Farbe – nie Farbe überall.
2. **Kochmetapher in der Sprache, Technik in der Substanz.** Ein Artikel hat „Zutaten" (Voraussetzungen) und „Zubereitung" (Umsetzung) – aber der Inhalt ist präzise und technisch korrekt.
3. **Zurückhaltende Bewegung.** Animation ist Gewürz, nicht Hauptgang. Kurz, sanft, nie schleifend, nie hüpfend.

**Anti-Muster – niemals bauen:**
Aggressive Gradient-Backgrounds · Emoji als Icons · Glassmorphism/Frosted Glass · Runde Container mit farbigem Left-Border-Akzent · Neon-Glows · Karussells, die von allein laufen · Hero-Bilder mit Text direkt drüber · Inter/Roboto/Arial/Fraunces · Stock-Foto-Kollagen · Rainbow-Gradient-Text

---

## 1. Farben

Eigene, verspielte Palette. Warm-neutraler Grund, ein Paprika-Rot als Signal, Salbeigrün als ruhige Fläche, Kurkuma als Highlight, Terminal-Grün ausschließlich für Code.

### Tokens

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* --- Neutrale Basis --- */
  --color-paper:        #FDFAF3;  /* Seitengrund light – warmes Backpapier */
  --color-paper-2:      #F5EFE3;  /* Section-Banding, Karten-Rücken light */
  --color-ink:          #241E2B;  /* Text light / Grund dark – auberginiges Schwarz */
  --color-ink-2:        #1A1520;  /* Seitengrund dark, tiefer als ink */
  --color-ink-soft:     #6B6272;  /* Sekundärtext, Meta, Captions */
  --color-line:         #DFD5C4;  /* Hairlines light */
  --color-line-dark:    #3A3243;  /* Hairlines dark */

  /* --- Marke --- */
  --color-paprika:      #E04B3A;  /* PRIMARY. Signal, Links, Buttons, Akzentwort */
  --color-paprika-deep: #B93726;  /* Hover/Pressed */
  --color-paprika-soft: #FBE4DF;  /* Fläche hinter Paprika-Text, light */

  --color-sage:         #7FA98C;  /* SECONDARY. Ruhige Flächen, Nav-Band, Badges */
  --color-sage-deep:    #3F6B4E;  /* Text auf sage-soft, Icons */
  --color-sage-soft:    #E4EDE5;  /* große ruhige Flächen light */

  --color-turmeric:     #E8A33D;  /* HIGHLIGHT. Sparsam: Sterne, „neu", Underlines */
  --color-turmeric-soft:#FBEDD5;

  /* --- IT-Kontrapunkt, NUR für Code/Terminal --- */
  --color-terminal-bg:  #16131C;
  --color-terminal-fg:  #E6E1EC;
  --color-terminal-lime:#8CE0A8;  /* Prompt, Success */
  --color-terminal-cyan:#6FD3E0;  /* Keywords, Strings */
  --color-terminal-dim: #6B6478;  /* Kommentare */
}
```

### Einsatzregeln

| Rolle | Light | Dark |
|---|---|---|
| Seitengrund | `paper` | `ink-2` |
| Karte / Panel | `#FFFFFF` | `ink` |
| Text primär | `ink` | `paper` |
| Text sekundär | `ink-soft` | `#A79EB0` |
| Hairline | `line` | `line-dark` |
| Link / Signal | `paprika` | `#FF7A68` (heller, für Kontrast) |
| Ruhige Fläche | `sage-soft` | `#26302A` |

- **Paarungen:** weißer Text auf `paprika` und auf `sage-deep`. **Dunkler** Text (`ink`) auf `sage`, `turmeric`, und allen `-soft`-Tönen. Nie weißer Text auf `turmeric`.
- **Maximal zwei Flächenfarben pro Seite** neben dem Grund. Eine Seite, die gleichzeitig Paprika-, Salbei- und Kurkuma-Flächen hat, ist falsch.
- `turmeric` ist ein **Punkt, keine Fläche** – höchstens ein Element pro Viewport (Badge, Unterstreichung, Icon-Akzent).
- **Kategorie-Farben:** alle acht Kategorien nutzen **dieselbe** Chip-Optik (`sage-soft` Fläche, `sage-deep` Text). Kein Farbcode pro Kategorie – das zerschießt die Palette. Unterschieden wird über **Icon**, nicht Farbe.

### Dark Mode

Gleichwertig, nicht nachgereicht. `class="dark"` auf `<html>`, Umschalter im Header, Präferenz in `localStorage` (`sc-theme`), Default = `prefers-color-scheme`. Kein Flash: Inline-Script im `<head>` setzt die Klasse vor dem ersten Paint.

Im Dark Mode: Hairlines werden sichtbarer statt Schatten stärker. **Schatten funktionieren im Dark Mode nicht** – dort tragen Border und Flächen-Kontrast. Handstrich-Ornamente auf `currentColor`, damit sie mitdrehen.

---

## 2. Typografie

Drei Schriften, klar getrennte Aufgaben.

| Rolle | Font | Woher | Einsatz |
|---|---|---|---|
| Display / Headlines | **Newsreader** (Serif, variabel, echte Kursive) | Google Fonts / Fontsource | h1–h3, Zitate, kursive Akzente |
| Body / UI | **Work Sans** | Google Fonts / Fontsource | Fließtext, Navigation, Buttons, Labels |
| Mono | **JetBrains Mono** | Google Fonts / Fontsource | Code, Terminal, technische Labels, Zeitangaben |

Einbinden über `@fontsource-variable/*` in `src/layouts/BaseLayout.astro` – **nicht** per `<link>` zu Google (Performance + DSGVO).

```css
@theme {
  --font-display: "Newsreader Variable", Georgia, serif;
  --font-body:    "Work Sans Variable", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono Variable", ui-monospace, monospace;
}
```

### Skala

| Token | Größe / Line-height | Font | Weight | Tracking |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 6vw, 4.5rem)` / 1.05 | display | 500 | `-0.02em` |
| `h1` | `clamp(2.25rem, 4vw, 3.25rem)` / 1.1 | display | 500 | `-0.02em` |
| `h2` | `clamp(1.75rem, 3vw, 2.25rem)` / 1.15 | display | 500 | `-0.015em` |
| `h3` | `1.375rem` / 1.25 | display | 600 | `-0.01em` |
| `lead` | `1.25rem` / 1.6 | body | 400 | – |
| `body` | `1.0625rem` / 1.7 | body | 400 | – |
| `small` | `0.9375rem` / 1.6 | body | 400 | – |
| `label` | `0.75rem` / 1.2 | mono | 500 | `0.12em`, UPPERCASE |
| `meta` | `0.8125rem` / 1.4 | mono | 400 | `0.02em` |

### Signature-Moves

1. **Kursiv-Akzent in Headlines.** Ein Wort pro Headline in `font-display italic` – das Wort, das den Twist trägt.
   `Power Automate, aber <em>ohne</em> Kopfschmerzen`
2. **Mono-Label über der Headline.** Kleines Uppercase-Mono-Kicker-Label in `ink-soft` oder `paprika` über jedem h1/h2 einer Section. Das ist die IT-Ebene: es sieht aus wie ein Terminal-Tag, ohne dass es eins ist.
   `POWER PLATFORM / 12 MIN`
3. **Drop-Cap im Artikel-Intro.** Erster Buchstabe des ersten Absatzes: `font-display`, `float-left`, ~3.2rem, `paprika`. Genau einmal pro Artikel.
4. Fließtext: `max-width: 68ch`, `text-wrap: pretty` auf Absätzen, `text-wrap: balance` auf Headlines. Nie Blocksatz.

---

## 3. Raum, Form, Kanten

```css
@theme {
  /* 4px-Basisraster */
  --spacing: 0.25rem;

  --radius-sm: 0.375rem;  /*  6px – Chips, Inputs, kleine Buttons */
  --radius-md: 0.75rem;   /* 12px – Karten, Panels */
  --radius-lg: 1.25rem;   /* 20px – Hero-Panels, große Flächen */
  --radius-full: 999px;   /*        nur Avatare, Dots, Pill-Chips */

  --shadow-card:  0 1px 2px rgb(36 30 43 / .04), 0 6px 16px -8px rgb(36 30 43 / .10);
  --shadow-hover: 0 2px 4px rgb(36 30 43 / .05), 0 14px 28px -12px rgb(36 30 43 / .16);
}
```

- **Content-Breiten:** Text-Spalte `68ch` · Standard-Container `1180px` · breite Grids `1320px`. Seitenrand mobil `20px`, ab `md` `40px`, ab `xl` `64px`.
- **Vertikaler Rhythmus zwischen Sections:** `py-20` mobil, `py-28` ab `md`. Großzügig – Luft ist Teil der Marke.
- **Layout ausschließlich mit Flex/Grid + `gap`.** Keine Abstände über Margins auf Geschwistern.
- **Kanten:** 1px `line` als Standard. **2px `ink`** für „handgezeichnet"-Emphase (Newsletter-Panel, Zutaten-Box, aktive Chips). Das 2px-Ink-Border ist ein bewusstes Stilmittel – sparsam, 1–2× pro Seite.
- **Schatten** nur auf Karten, die klickbar sind. Sonst Border. Keine farbigen Schatten.

---

## 4. Icons & Ornamente

### System

**Zwei Ebenen, klar getrennt:**

**(a) UI-Icons: Lucide.** `lucide-astro`, Größe 20 (inline) / 24 (Buttons), `stroke-width: 1.75`, `stroke-linecap: round`, `currentColor`. Für Suche, Menü, Theme-Toggle, Chevrons, Social, Pfeile.

**(b) Kategorie-Icons: handgezeichneter Ein-Strich-Satz, selbst gebaut.** Das ist der Charakter des Blogs – acht individuelle SVGs, kein Icon-Set.

**Spec für die Kategorie-Icons:**
- `viewBox="0 0 32 32"`, Darstellungsgröße 28–32px
- `fill="none"`, `stroke="currentColor"`, `stroke-width="1.4"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- **Handstrich-Charakter:** Linien leicht unregelmäßig – Pfade minimal aus der Achse (±0.3–0.6 Einheiten), Kreise als leicht offene Bögen statt geschlossener `<circle>`, Ecken nie exakt. Nie perfekt symmetrisch.
- Jedes Icon **kombiniert Küche + Technik** – das ist die Pointe:

| Kategorie | Icon-Idee |
|---|---|
| Power Apps | Kochmütze, deren Falten Formularfelder sind |
| Dynamics 365 | Servierglocke mit Kontakt-Kartei darunter |
| Power Automate | Rührbesen, dessen Drähte ein Flow-Pfeil werden |
| Code App | Kochbuch, aufgeschlagen, mit `{ }` auf der Seite |
| Customer Insights Journey | Landkarten-Route als Serviertablett-Weg |
| Marketing | Trichter als Sieb / Mehlsieb |
| Copilot Studio | Sous-Chef-Mütze mit Sprechblase |
| AI | Mörser & Stößel, aus dem Datenpunkte steigen |

Ablage: `src/icons/kategorien/*.svg`, geladen als Astro-Komponente (`astro-icon` oder inline `?raw`) – **nie als `<img>`**, damit `currentColor` greift.

### Ornamente (Schnörkel)

Der Screenshot-Referenz entlehnt: **Zweig-/Ranken-Trenner links und rechts** vom Claim.

- Ein SVG-Trenner `src/components/ornaments/Sprig.astro`: zarte Ranke, `stroke-width: 1.2`, `currentColor`, spiegelbar per `scale-x-[-1]`.
- Einsatz: links+rechts des Taglines im Header, als Section-Trenner zentriert (`<Sprig/>` mit Hairline links/rechts), am Artikel-Ende als „Ende des Rezepts"-Zeichen.
- **Maximal drei Ornamente pro Seite.** Sie sind Interpunktion.
- `opacity: .6`, Farbe `sage-deep` (light) / `sage` (dark).

### Bilder

- Wenig, aber gut. Ruhige, entsättigte Fotos; Screenshots von Power-Platform-Oberflächen sind explizit erwünscht und werden als **Bild** behandelt: `radius-md`, 1px `line`-Border, optional Caption in `meta`.
- **Nie Text direkt über ein Bild** legen. Text steht auf eigener Fläche.
- Jedes Bild `loading="lazy"` (außer Hero), Astro `<Image>`, `aspect-ratio` immer gesetzt, damit nichts springt.
- Platzhalter: `paper-2`-Fläche + Kategorie-Icon zentriert bei 20 % Deckkraft. **Keine gezeichneten Fake-Fotos.**

---

## 5. Sprache & Copy

Kochmetapher trägt, Technik ist präzise. **Du**-Anrede, kurze Hauptsätze, kein Buzzword-Stapeln, keine Emoji.

### Feste Begriffs-Zuordnung — überall gleich verwenden

| Kochwelt | Bedeutung im Blog |
|---|---|
| **Rezept** | Anleitung / Tutorial |
| **Zutaten** | Voraussetzungen (Lizenzen, Rechte, Umgebungen) |
| **Mise en place** | Setup / Vorbereitung |
| **Zubereitung** | Schritt-für-Schritt-Umsetzung |
| **Kochzeit** | Lesezeit / Umsetzungsdauer |
| **Eine Prise …** | kurzer Tipp / Hinweis-Callout |
| **Abschmecken** | Testen / Validieren |
| **Serviervorschlag** | Ergebnis / So sieht's beim Nutzer aus |
| **Angebrannt** | Häufiger Fehler / Fallstrick-Callout |
| **Aus der Restküche** | Verwandte Artikel |
| **Schwierigkeit** | leicht / mittel / anspruchsvoll (Toque-Symbole, 1–3) |

Beispiel-Headlines im richtigen Ton:
- `Ein Power-Automate-Flow, der beim ersten Versuch <em>durchläuft</em>`
- `Customer Insights Journeys: die <em>Basis-Sauce</em> für alle Kampagnen`
- `Dataverse-Rechte, <em>ohne</em> dass es anbrennt`

Nicht so: „Revolutioniere deine Business-Prozesse mit KI-getriebenen Insights."

CTA-Energie am Seitenende: warm und einladend, ein Ausrufezeichen erlaubt – `Lass uns kochen!`

---

## 6. Komponenten

Ablage `src/components/`. Astro-Komponenten, `.astro`, keine Client-JS-Insel außer wo vermerkt.

### `SiteHeader.astro`
Zweizeilig, **kein Mega-Menü**.
- **Zeile 1** (`paper` / `ink`, `py-5`): Wortmarke links · Tagline mittig, `font-display italic`, flankiert von zwei `Sprig`-Ornamenten (ab `lg` sichtbar) · rechts Social-Icons, Suche, Theme-Toggle, `Button` „Newsletter".
- **Zeile 2** (`sage-soft` Band, `py-3.5`, oben+unten 1px `line`): 5 Nav-Punkte, `label`-Stil (Mono, uppercase, tracking), Flex mit `gap-10`, zentriert: `RUBRIKEN · PRAXIS · TOOLS · ÜBER MICH · KONTAKT`.
- **Hover Nav:** `paprika`-Textfarbe + 2px `paprika` Unterstreichung, die von links auf 100 % wächst (180ms). Aktive Seite: Unterstreichung permanent.
- Mobil: Zeile 2 wird Burger → Full-Height-Panel, Nav-Punkte als `h3`-große Liste. Erste Fokus-Falle im Panel, `Esc` schließt.
- **Sticky:** ab 120px Scroll klappt Zeile 1 aus, nur das `sage-soft`-Band + Wortmarke bleiben (`translateY`, 200ms).

### `Wordmark.astro`
Wortmarke, rein typografisch: `Sebastian` in `font-display` 500, `Cook` in `font-display italic` 500 `paprika`, darunter Mono-Label `D365 · POWER PLATFORM` in `ink-soft`, `tracking-[0.18em]`. Eine Kochmützen-Silhouette (Handstrich, wie §4) sitzt als Punkt über dem `i`.

### `Button.astro`
`variant`: `primary` (`paprika` Fläche, weißer Text) · `secondary` (2px `ink` Border, transparent) · `ghost` (nur Text, `paprika`).
`radius-sm`, `px-5 py-2.5`, `font-body` 500, `0.9375rem`. Hover: `paprika-deep` / Border+Text `paprika`. Active: `scale(.99)`. Focus: `outline: 2px solid paprika; outline-offset: 2px`.

### `KategorieChip.astro`
`sage-soft` Fläche, `sage-deep` Text, `radius-full`, `px-3 py-1`, `small` 500, links das 16px-Kategorie-Icon. Hover: Fläche → `sage`, Text → `ink`.

### `ArtikelKarte.astro`
Weiße Karte (dark: `ink`), `radius-md`, 1px `line`, `shadow-card`.
Bild 16:10 oben (Radius nur oben) · Body `p-5`: `KategorieChip` · h3 mit Kursiv-Akzent · 2-Zeilen-Teaser `small ink-soft` · Footer-Zeile `meta`: `Kochzeit 12 min` · `mittel` (Toques).
Hover: `translateY(-3px)` + `shadow-hover`, Titel wird `paprika`, Bild `scale(1.03)` — alles 200ms, `ease-out`.

### `Callout.astro`
`variant`: `prise` (Tipp, `turmeric-soft` Fläche, `turmeric` 1px Border, Icon Salzstreuer) · `angebrannt` (Warnung, `paprika-soft`, `paprika` Border, Icon Pfanne mit Rauch) · `notiz` (`paper-2`, `line` Border, Icon Notizbuch).
`radius-md`, `p-5`, Icon 24px oben links, Titel in `label`-Stil, Text `small`. **Kein linker Farbbalken.** Voller 1px-Rahmen.

### `Zutaten.astro`
Die Voraussetzungen-Box am Artikel-Anfang. **2px `ink` Border**, `radius-md`, `paper`-Fläche, `p-6`.
Kopf: `label` „ZUTATEN" + rechts `meta` `Kochzeit · Schwierigkeit`. Liste mit Handstrich-Haken statt Bullet (`gap-2.5`), Items `body`. Versionen/Lizenzen in `font-mono`.

### `Zubereitung.astro` / `Schritt.astro`
Nummerierte Schritte. Nummer: `font-display` 2rem `paprika`, links in eigener 3rem-Spalte, dahinter eine vertikale 1px `line`, die zum nächsten Schritt läuft. Schritt-Titel `h3`, Inhalt darunter (Text, Bilder, `CodeBlock`).

### `CodeBlock.astro` — der IT-Kontrapunkt
`terminal-bg` Fläche, `radius-md`, **kein Border**, `font-mono` `0.875rem`/1.6, `terminal-fg`.
Kopfzeile: `px-4 py-2.5`, 1px `line-dark` unten, links drei 10px-Dots (`#3A3243`, aktiver `terminal-lime`), mittig Dateiname in `meta` `terminal-dim`, rechts Copy-Button (Lucide `copy` → `check` für 1.5s).
Syntax: Keywords/Strings `terminal-cyan`, Kommentare `terminal-dim`, Ausgabe/Prompt `terminal-lime`. Shiki mit eigenem Theme aus diesen Tokens. Prompt-Zeilen mit `terminal-lime` `❯`.
**Das ist der einzige Ort, an dem Terminal-Farben vorkommen.** Nirgends sonst.

### `NewsletterPanel.astro`
Full-width Section, `sage-soft` Fläche (dark: `#26302A`), `Sprig`-Ornament oben zentriert.
h2 mit Kursiv-Akzent, `lead`-Zeile, dann Input + `Button primary` in einer Flex-Zeile (mobil gestapelt). Input: weiß, 1px `line`, `radius-sm`, `px-4 py-3`. Unter dem Feld `meta` in `ink-soft`: Frequenz + „jederzeit abmeldbar".

### `SiteFooter.astro`
`ink` Fläche, `paper` Text, `py-16`. 4 Spalten: Wortmarke (weiß) + Claim · Rubriken · Über · Rechtliches. Hairlines `line-dark`. Social-Icons 20px. Unterste Zeile `meta` `ink-soft`-Äquivalent. Links Hover: `paprika` (heller Variante `#FF7A68`).

### Weitere
`SectionHeader` (Mono-Kicker + h2 + optional „alle ansehen"-Ghost-Link rechts) · `Breadcrumb` (Mono, `/`-Trenner) · `AutorBox` (rundes Avatar 64px, Name `h3`, 2 Zeilen Bio, Social) · `Inhaltsverzeichnis` (sticky ab `lg`, Mono-Nummern, aktiver Punkt `paprika`) · `Paginierung` · `Suche` (Overlay-Dialog, kein Dropdown) · `ThemeToggle` (Lucide `sun`/`moon`, 200ms Crossfade) · `Sprig` (Ornament) · `Toque` (Schwierigkeits-Symbol).

---

## 7. Bewegung

**Intensität 3/10 – dezent.** Bewegung erklärt, wo etwas herkommt. Sie unterhält nicht.

```css
@theme {
  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 140ms;   /* Hover, Farbwechsel */
  --dur-base: 200ms;   /* Karten-Lift, Toggle */
  --dur-slow: 320ms;   /* Reveal, Panel */
}
```

**Erlaubt:**
- **Scroll-Reveal:** `opacity 0→1` + `translateY(12px→0)`, 320ms, per `IntersectionObserver`, `threshold: 0.15`, **einmalig**. In Grids `stagger 60ms`, maximal 4 Elemente gestaffelt.
- **Karten-Hover:** `translateY(-3px)` + Schattenwechsel, 200ms.
- **Nav-Unterstreichung:** `scaleX(0→1)`, `transform-origin: left`, 180ms.
- **Wortmarken-Intro auf der Startseite (einmal pro Session, `sessionStorage`):** Buchstaben von `Cook` fahren aus 6px Versatz zusammen – „we build", 400ms gesamt, dann still. Danach nie wieder.
- **Handstrich-Ornamente:** `stroke-dashoffset` zeichnet sich beim ersten Sichtbarwerden in 600ms. Einmalig.
- **Copy-Button:** Icon-Crossfade 140ms.
- **Theme-Toggle:** Farb-Transition auf `background`/`color`, 200ms. Kein Wipe, kein Kreis-Reveal.

**Verboten:** Bounce · Spring · Endlos-Loops · Parallax · Auto-Play-Karussell · Text-Typewriter · Marquee · Hover-Rotation · Zahlen-Counter · Cursor-Follower · Alles über 400ms.

**Immer:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important;
    animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```
Reveal-Elemente müssen dann **sichtbar** sein (nicht bei `opacity: 0` stehen bleiben) – Startzustand per JS setzen, nicht im CSS, oder in der Media-Query zurücksetzen.

---

## 8. Beispiel-Seiten

### Startseite `src/pages/index.astro`
1. **Header** (siehe §6).
2. **Hero.** Split: links 55 % — Mono-Kicker `WILLKOMMEN IN DER KÜCHE`, `display`-Headline mit Kursiv-Akzent, `lead`-Absatz (2 Zeilen), zwei Buttons (`primary` „Rezepte ansehen", `ghost` „Was ist das hier?"). Rechts 45 % — ein Bild, `radius-lg`, leicht überlappend mit einer `sage-soft`-Fläche dahinter (8px versetzt, **nicht** rotiert). Grund: `paper`.
3. **Rubriken.** `SectionHeader` + Grid der acht Kategorien: `grid-cols-2 md:grid-cols-4`, jede Zelle = Kategorie-Icon 40px + Name in `label` + Artikelzahl in `meta`. 1px `line` Rahmen als Grid-Linien, Hover: Fläche `sage-soft`, Icon → `paprika`.
4. **Zuletzt gekocht.** `SectionHeader` + `ArtikelKarte`-Grid, `md:grid-cols-2 lg:grid-cols-3`, `gap-8`, 6 Karten. Grund `paper-2`.
5. **Aus der Praxis** (der IT-Kontrapunkt). `ink`-Fläche, full-width. Links Text: Mono-Kicker, h2, kurzer Absatz. Rechts ein echter `CodeBlock` (Power Fx oder PowerShell). Einzige dunkle Section auf einer Light-Seite – bewusster Rhythmus-Bruch.
6. **Über mich, kurz.** `paper`, Avatar links, 3 Zeilen Text, `ghost`-Link.
7. **`NewsletterPanel`**.
8. **`SiteFooter`**.

### Artikelseite `src/pages/rezepte/[slug].astro`
Header · Breadcrumb · **Titelblock** (Mono-Kicker mit Kategorie + Datum, `h1` mit Kursiv-Akzent, `lead`, Meta-Zeile: Kochzeit · Schwierigkeit · Autor) · Titelbild 16:9 `radius-md` mit Caption · **`Zutaten`-Box** · Intro-Absatz mit Drop-Cap · **`Zubereitung`** mit `Schritt`-Komponenten, dazwischen `Callout`s und `CodeBlock`s · **Serviervorschlag** (Abschluss-Absatz + Screenshot) · `Sprig`-Ornament als Ende-Zeichen · `AutorBox` · **Aus der Restküche** (3 `ArtikelKarte`) · `NewsletterPanel` · Footer.
Ab `lg`: `Inhaltsverzeichnis` sticky in der rechten Randspalte (`grid-cols-[1fr_68ch_1fr]`, Text bleibt mittig).

### Kategorieseite `src/pages/rubrik/[kategorie].astro`
Header · Breadcrumb · **Kategorie-Kopf**: `sage-soft` Fläche, `py-16`, Kategorie-Icon 64px zentriert, `h1`, ein Satz Beschreibung, `meta` mit Artikelzahl · **Filterzeile**: `KategorieChip`s als Sub-Tags + Sortierung rechts (`Neueste` / `Beliebt`), 1px `line` unten, sticky ab `md` · **Grid** `ArtikelKarte` 3-spaltig · `Paginierung` · `NewsletterPanel` · Footer.
Leerzustand: `paper-2`-Fläche, Kategorie-Icon 20 % Deckkraft, `Hier köchelt noch nichts.` + Ghost-Link zur Übersicht.

---

## 9. Umsetzung & Qualitätslatte

**Struktur**
```
src/
  components/        Button, ArtikelKarte, Callout, CodeBlock, Zutaten, …
    ornaments/       Sprig.astro
  icons/kategorien/  8 SVGs (Handstrich, §4)
  layouts/           BaseLayout.astro, ArtikelLayout.astro
  content/rezepte/   Markdown/MDX, Frontmatter: titel, akzentWort, kategorie,
                     kochzeit, schwierigkeit, zutaten[], bild, teaser
  pages/             index, rezepte/[slug], rubrik/[kategorie], ueber, kontakt
  styles/global.css  @theme mit allen Tokens aus §1–§3, @font-face, reduced-motion
```

**Regeln**
- Alle Farben, Radien, Schatten, Fonts **nur** aus `@theme`. Kein Hex im Markup, keine Tailwind-Default-Farbe (`text-red-500` etc.) – die Default-Palette per `--color-*: initial` abschalten.
- Kein Client-JS außer: Theme-Toggle, Mobil-Menü, Suche, Copy-Button, Scroll-Reveal, Sticky-Header. Alles Vanilla, kein Framework.
- Semantik: `<article>`, `<nav>`, `<main>`, echte `<h1>`–`<h3>`-Hierarchie ohne Sprünge, `<ol>` für Zubereitungsschritte.
- Icons dekorativ → `aria-hidden="true"`; Icon-only-Buttons → `aria-label`.
- **Accessibility, kurz:** Kontrast mindestens 4.5:1 für Text (`ink-soft` auf `paper` prüfen, `paprika` auf `paper` ist ok für ≥18px – für kleinen Text `paprika-deep` nehmen) · Focus-Ring immer sichtbar (`paprika`, 2px, offset 2px) · alles per Tastatur erreichbar · `prefers-reduced-motion` respektiert · Touch-Ziele ≥44px.
- Bilder: Astro `<Image>`, `width`/`height` gesetzt, `alt` beschreibend.

**Fertig heißt:** 375 / 768 / 1440 / 1920 geprüft · Light und Dark geprüft · Tastatur-Durchlauf ohne Fokus-Verlust · reduced-motion geprüft · keine Console-Fehler · Lighthouse A11y ≥ 95.
