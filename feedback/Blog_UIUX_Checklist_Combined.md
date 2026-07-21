# Blog UI/UX Checkliste (kombiniert) - sebastiancook.com

Zusammengefuehrt aus der 17-Punkte-Checkliste und einer zweiten Feedback-Runde. Ueberschneidungen sind zusammengelegt, Konflikte aufgeloest, neue Punkte ergaenzt. Siehe auch `Blog_Feedback_Leon_ToDo.md` fuer die erste Feedback-Runde, einige Punkte dort werden hier praezisiert oder ueberholt (siehe Hinweise).

**Status:** Abschnitte A-F durchgearbeitet. Offene Punkte sind unten markiert und meist bewusst zurueckgestellt (zu wenig Content, keine Analytics-Daten, oder Konflikt mit dem Style Guide), nicht vergessen.

## A. Branding & Header-Identitaet (kombiniert aus #17, #6 + neues Feedback)

- [x] **Sichtbarer Name auf "Sebastian Cook" umstellen.** Im Header, unter dem Namen, links im Eck: "Koch is German for 'cook' — hence the cookbook." Das loest direkt Leons alten Punkt, dass die Namensgeschichte mit mehr Posts verloren geht: sie steht jetzt permanent im Header statt nur im ersten Artikel.
  - *Erledigt: `SITE_TITLE`/`AUTHOR_NAME` sind jetzt "Sebastian Cook", der Hinweis steht permanent im Header (`AUTHOR_NAME_HINT`).*
- [x] **Hero-Intro radikal vereinfachen.** Die aktuelle Stapelung (Jobtitel + Wirtschaftsingenieur-Zeile + "Digitization is tactical..."-Slogan) wird ersetzt durch einen einzigen einfachen Satz, sinngemaess: "Hier sammle ich einfach gerne meine CRM-Dynamics Rezepte. Vielleicht findet ihr ja auch was, das euch schmeckt :)" Dazu ein kurzer Hinweis, Artikel 1 bzw. About zu lesen, um ein Gefuehl fuer den Blog zu bekommen.
  - Hinweis: Damit erledigen sich die fruehen Leon-Punkte zur Tagline-Farbe (wirkt wie Link) und zum Satzzeichen am Ende, weil die alte Tagline im Hero so nicht mehr vorkommt. Pruefen, ob der alte Slogan ("Digitization is tactical...") noch im About bleibt oder ganz raus soll.
  - *Erledigt: Hero zeigt jetzt nur noch einen warmen Satz plus Hinweis auf About/ersten Artikel. Der alte Slogan/Identity-Line bleibt im About-Schlusssatz erhalten.*
- [x] **Kein Logo-Icon im Hero, das "zu stressig" wirkt.** Das Wing-Icon ist fuer About okay, im Hero zu verspielt. Falls ein Logo gewuenscht ist: schlicht halten, kein Icon-Overload.
  - *Erledigt/nicht relevant: kein Hero-Icon vorhanden, damit automatisch erfuellt.*
- [x] **Style Guide erstellen** (aus #17): Farben, Icons und Bildstil einmal dokumentieren, sobald Name/Intro final stehen. Erst nach den obigen Entscheidungen sinnvoll.
  - *Erledigt: `Blog_Style_Guide.md` angelegt (Farben, Typografie, Icons, Bildsprache).*

## B. Karten / Artikelliste

- [x] **Karten kompakter** (#2): Reihenfolge Bild → Titel → Metadaten → Beschreibung → Tags, weniger Innenabstand, weniger Weissraum.
  - *Erledigt bis auf das Bild (siehe unten): Titel → Meta → Beschreibung → Tags → CTA, engeres Padding.*
- [x] **Karten modernisieren** (#9): Radius 16px, leichter Schatten, Hover-Effekt.
  - *Erledigt: 16px Radius, `--shadow-sm` im Ruhezustand, groesserer Schatten + Lift bei Hover.*
- [x] **Hover-Effekte** (#14): mit #9 zusammengelegt, gilt fuer Karten und Titel gemeinsam.
  - *Erledigt.*
- [ ] **Hero-Bild pro Artikel** (#1): 16:9 Headerbild, einheitlicher Bildstil, themenbezogene Illustration statt Stockfoto.
  - *Offen, bewusst zurueckgestellt: keine Illustrationen vorhanden, User wollte diesen Punkt erstmal ueberspringen. Karten-Markup hat aktuell keinen Bild-Slot vorbereitet — muesste beim Umsetzen ergaenzt werden.*
- [x] **Titelgroesse** (#4): 20-25% kleiner, Zeilenhoehe reduzieren.
  - *Erledigt: einheitlich 1.4em/1.3 Zeilenhoehe in Karten, unabhaengig von h2/h3.*
- [x] **Metadaten dezenter** (#7): kleinere Schrift, hellere Farbe.
  - *Erledigt: 0.8em, gedaempftes Grau, Mono-Schrift.*
- [x] **Call-to-Action** (#13): "Read Article" ergaenzen.
  - *Erledigt: "Read article →" mit Hover-Animation auf allen Kartenseiten.*

## C. Tags (kombiniert aus #3 + neues Feedback)

- [x] **Chip-Optik** (#3): Border-Radius 999px, automatische Breite, dezente Hintergrundfarbe, Hover-Effekt.
  - *Erledigt.*
- [x] **Kleiner und nebeneinander statt untereinander** (neu): aktuelle Tags sind zu gross und stapeln sich, sollen als Reihe nebeneinander laufen.
  - *Erledigt, plus echten Bug gefunden und behoben: ein seitenweiter `ul`-Selektor hatte durch Astros CSS-Scoping hoehere Spezifitaet als `.tag-list` und liess Tags tatsaechlich vertikal stapeln. Jetzt auf `ul.post-list` eingegrenzt.*
- [x] **Tags klickbar machen** (neu): Klick auf einen Tag fuehrt zur Tags-Seite mit genau diesem Tag vorausgewaehlt/gefiltert.
  - *Erledigt: Karten von `<a>` auf `<div>` + "Stretched-Link"-Muster umgestellt, damit Tag-Chips eigene, unabhaengig klickbare Links sein koennen.*
- [ ] **Essens-Wortspiel fuer Tags pruefen** (neu, optional): z.B. Tags als "Ingredients" oder aehnliches umbenennen, passend zur Kochbuch-Metapher. Nur umsetzen, wenn es nicht gezwungen wirkt.
  - *Bewusst nicht umgesetzt: die Metapher passt nicht sauber auf Themen-Tags (Ingredients waeren eher Voraussetzungen als Kategorien) und haette gezwungen gewirkt — genau die Bedingung, unter der der Punkt selbst steht.*

## D. Navigation & Struktur

- [x] **Sticky Header** (bestaetigt, zweite Nennung): Kopfzeile bleibt beim Scrollen fest oben, verschwindet nicht. War bei Leon schon positiv vermerkt, jetzt explizit gefordert, also priorisieren.
  - *Erledigt: `position: sticky` auf dem Header.*
- [ ] **Suchfunktion** (#5) **plus Such-Keywords pro Artikel** (neu): Suche ergaenzen, und zusaetzlich im Frontmatter jedes Artikels eine Liste von Suchbegriffen pflegen, ueber die der Artikel auch bei anderen Formulierungen gefunden wird. Wichtig: nur umsetzen, wenn die Suche auch bei Teiltreffern sinnvolle Ergebnisse liefert, sonst lieber erst auf Kategorien/Tags verlassen (siehe `Blog_Feedback_Leon_ToDo.md`).
  - *Offen, bewusst zurueckgestellt: bei aktuell 2 veroeffentlichten Artikeln liefert eine Suche noch keinen echten Mehrwert. Laut Dokument selbst erst sinnvoll, wenn mehr Content da ist — dann neu bewerten.*
- [x] **Kategorien in der Navigation** (#5).
  - *Erledigt: "Tags"-Link wieder im Header (war zwischenzeitlich ausgeblendet, als es nur 1 Tag gab), plus neue "Browse by topic"-Sektion auf der Startseite.*
- [ ] **Newsletter/Dark Mode pruefen** (#5): offene Machbarkeitsfrage, keine feste Entscheidung noetig.
  - *Dark Mode ist bereits vorhanden (automatisch ueber `prefers-color-scheme`, kein manueller Umschalter). Newsletter bleibt offen, wie im Dokument selbst vorgesehen — keine Entscheidung getroffen.*
- [x] **Startseite strukturieren** (#11): Neueste Beitraege, beliebte Beitraege, Kategorien.
  - *Teilweise erledigt: "Fresh from the kitchen" (neueste) und "Browse by topic" (Kategorien) sind da. "Beliebte Beitraege" bewusst weggelassen — es gibt keine Analytics/Tracking-Daten, um Popularitaet ueberhaupt zu ermitteln, und die Seite soll das laut Datenschutzerklaerung auch nicht einfuehren.*

## E. Visuelles Design-System

- [x] **Farbpalette vereinheitlichen** (#8): eine Primaerfarbe fuer Links, Hover und Buttons.
  - *War schon erledigt (Teal als durchgaengiger Akzent), kein neuer Aufwand noetig.*
- [ ] **Themen kennzeichnen** (#10): Icons oder Akzentfarben pro Kategorie.
  - *Bewusst nicht umgesetzt: Konflikt mit dem Style-Guide-Prinzip "eine Hauptakzentfarbe fuehrt" und mit dem Icon-Verzicht aus Abschnitt A. Rueckfrage gestellt, Entscheidung: bei einer Akzentfarbe bleiben.*
- [x] **Hintergrund** (#15): hellgrauer Hintergrund, weisse Cards.
  - *Funktional erfuellt, aber bewusst warmes Off-White (#FAF8F4) statt kaltem Grau, passend zum "Cookbook"-Konzept aus dem Design-Brief. Keine Umstellung auf reines Grau vorgenommen.*
- [x] **Typografie** (#12): Ueberschriften vereinheitlichen.
  - *War schon erledigt (IBM Plex Serif durchgaengig fuer h1-h6).*
- [x] **Technische Designelemente** (#16): Diagramme, Code-Illustrationen. Bereits begonnen mit den SVG-Grafiken zur Consent-Hierarchie.
  - *Laufend: aktuell ein Diagramm (Consent-/Purpose-Sharing-Hierarchie) im ersten CIJ-Artikel. Waechst mit jedem neuen Artikel, kein separater Schritt noetig.*

## F. Content-Regel (kein UI/UX-Punkt, aber wichtig)

- [x] **CIJ-Abkuerzung einfuehren.** Beim ersten Vorkommen von "Customer Insights - Journeys" im Artikel immer "(CIJ)" ergaenzen, danach durchgaengig "CIJ" verwenden. Gilt fuer alle bestehenden und kuenftigen Artikel, sollte in den Build-/Design-Brief als Schreibregel aufgenommen werden.
  - *Erledigt im veroeffentlichten Artikel. Gilt als Schreibregel fuer alle kuenftigen Artikel weiter — bei jedem neuen Post pruefen.*

## Prioritaetsvorschlag

1. Branding/Header (A) und Sticky Header (D) zuerst, weil sie den ersten Eindruck praegen und andere Punkte davon abhaengen.
2. Tags (C) und Karten (B), weil sichtbar und schnell umsetzbar.
3. Visuelles Design-System (E) als konsolidierender Schritt, sobald A-C stehen.
4. Suche und Startseiten-Struktur (D, E) als Ausbau, wenn mehr Artikel vorhanden sind.
