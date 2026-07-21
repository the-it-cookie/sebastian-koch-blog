# Blog UI/UX Checkliste (kombiniert) - sebastiancook.com

Zusammengefuehrt aus der 17-Punkte-Checkliste und einer zweiten Feedback-Runde. Ueberschneidungen sind zusammengelegt, Konflikte aufgeloest, neue Punkte ergaenzt. Siehe auch `Blog_Feedback_Leon_ToDo.md` fuer die erste Feedback-Runde, einige Punkte dort werden hier praezisiert oder ueberholt (siehe Hinweise).

## A. Branding & Header-Identitaet (kombiniert aus #17, #6 + neues Feedback)

- [ ] **Sichtbarer Name auf "Sebastian Cook" umstellen.** Im Header, unter dem Namen, links im Eck: "Koch is German for 'cook' — hence the cookbook." Das loest direkt Leons alten Punkt, dass die Namensgeschichte mit mehr Posts verloren geht: sie steht jetzt permanent im Header statt nur im ersten Artikel.
- [ ] **Hero-Intro radikal vereinfachen.** Die aktuelle Stapelung (Jobtitel + Wirtschaftsingenieur-Zeile + "Digitization is tactical..."-Slogan) wird ersetzt durch einen einzigen einfachen Satz, sinngemaess: "Hier sammle ich einfach gerne meine CRM-Dynamics Rezepte. Vielleicht findet ihr ja auch was, das euch schmeckt :)" Dazu ein kurzer Hinweis, Artikel 1 bzw. About zu lesen, um ein Gefuehl fuer den Blog zu bekommen.
  - Hinweis: Damit erledigen sich die fruehen Leon-Punkte zur Tagline-Farbe (wirkt wie Link) und zum Satzzeichen am Ende, weil die alte Tagline im Hero so nicht mehr vorkommt. Pruefen, ob der alte Slogan ("Digitization is tactical...") noch im About bleibt oder ganz raus soll.
- [ ] **Kein Logo-Icon im Hero, das "zu stressig" wirkt.** Das Wing-Icon ist fuer About okay, im Hero zu verspielt. Falls ein Logo gewuenscht ist: schlicht halten, kein Icon-Overload.
- [ ] **Style Guide erstellen** (aus #17): Farben, Icons und Bildstil einmal dokumentieren, sobald Name/Intro final stehen. Erst nach den obigen Entscheidungen sinnvoll.

## B. Karten / Artikelliste

- [ ] **Karten kompakter** (#2): Reihenfolge Bild → Titel → Metadaten → Beschreibung → Tags, weniger Innenabstand, weniger Weissraum.
- [ ] **Karten modernisieren** (#9): Radius 16px, leichter Schatten, Hover-Effekt.
- [ ] **Hover-Effekte** (#14): mit #9 zusammengelegt, gilt fuer Karten und Titel gemeinsam.
- [ ] **Hero-Bild pro Artikel** (#1): 16:9 Headerbild, einheitlicher Bildstil, themenbezogene Illustration statt Stockfoto.
- [ ] **Titelgroesse** (#4): 20-25% kleiner, Zeilenhoehe reduzieren.
- [ ] **Metadaten dezenter** (#7): kleinere Schrift, hellere Farbe.
- [ ] **Call-to-Action** (#13): "Read Article" ergaenzen.

## C. Tags (kombiniert aus #3 + neues Feedback)

- [ ] **Chip-Optik** (#3): Border-Radius 999px, automatische Breite, dezente Hintergrundfarbe, Hover-Effekt.
- [ ] **Kleiner und nebeneinander statt untereinander** (neu): aktuelle Tags sind zu gross und stapeln sich, sollen als Reihe nebeneinander laufen.
- [ ] **Tags klickbar machen** (neu): Klick auf einen Tag fuehrt zur Tags-Seite mit genau diesem Tag vorausgewaehlt/gefiltert.
- [ ] **Essens-Wortspiel fuer Tags pruefen** (neu, optional): z.B. Tags als "Ingredients" oder aehnliches umbenennen, passend zur Kochbuch-Metapher. Nur umsetzen, wenn es nicht gezwungen wirkt.

## D. Navigation & Struktur

- [ ] **Sticky Header** (bestaetigt, zweite Nennung): Kopfzeile bleibt beim Scrollen fest oben, verschwindet nicht. War bei Leon schon positiv vermerkt, jetzt explizit gefordert, also priorisieren.
- [ ] **Suchfunktion** (#5) **plus Such-Keywords pro Artikel** (neu): Suche ergaenzen, und zusaetzlich im Frontmatter jedes Artikels eine Liste von Suchbegriffen pflegen, ueber die der Artikel auch bei anderen Formulierungen gefunden wird. Wichtig: nur umsetzen, wenn die Suche auch bei Teiltreffern sinnvolle Ergebnisse liefert, sonst lieber erst auf Kategorien/Tags verlassen (siehe `Blog_Feedback_Leon_ToDo.md`).
- [ ] **Kategorien in der Navigation** (#5).
- [ ] **Newsletter/Dark Mode pruefen** (#5): offene Machbarkeitsfrage, keine feste Entscheidung noetig.
- [ ] **Startseite strukturieren** (#11): Neueste Beitraege, beliebte Beitraege, Kategorien.

## E. Visuelles Design-System

- [ ] **Farbpalette vereinheitlichen** (#8): eine Primaerfarbe fuer Links, Hover und Buttons.
- [ ] **Themen kennzeichnen** (#10): Icons oder Akzentfarben pro Kategorie.
- [ ] **Hintergrund** (#15): hellgrauer Hintergrund, weisse Cards.
- [ ] **Typografie** (#12): Ueberschriften vereinheitlichen.
- [ ] **Technische Designelemente** (#16): Diagramme, Code-Illustrationen. Bereits begonnen mit den SVG-Grafiken zur Consent-Hierarchie.

## F. Content-Regel (kein UI/UX-Punkt, aber wichtig)

- [ ] **CIJ-Abkuerzung einfuehren.** Beim ersten Vorkommen von "Customer Insights - Journeys" im Artikel immer "(CIJ)" ergaenzen, danach durchgaengig "CIJ" verwenden. Gilt fuer alle bestehenden und kuenftigen Artikel, sollte in den Build-/Design-Brief als Schreibregel aufgenommen werden.

## Prioritaetsvorschlag

1. Branding/Header (A) und Sticky Header (D) zuerst, weil sie den ersten Eindruck praegen und andere Punkte davon abhaengen.
2. Tags (C) und Karten (B), weil sichtbar und schnell umsetzbar.
3. Visuelles Design-System (E) als konsolidierender Schritt, sobald A-C stehen.
4. Suche und Startseiten-Struktur (D, E) als Ausbau, wenn mehr Artikel vorhanden sind.
