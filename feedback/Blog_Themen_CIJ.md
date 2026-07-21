# Blog-Themen CIJ (aus BTH-Projekt abgeleitet)

Kandidaten fuer Blog-Artikel im Rahmen der MVP-Positionierung (Business Applications / Customer Insights - Journeys). Quelle: BTH-Consent-Projekt. Vor Veroeffentlichung alles anonymisieren (Plugin-Namen, co_-Felder generisch, GUIDs raus, keine Buehnennamen).

## Tier 1 (stark, verallgemeinerbar, wenig guter Content im Netz)

1. **Consent-Vorbefuellung in RTM-Formularen per JavaScript**
   Ueber `d365mkt-afterformload` Consents und E-Mail vorbefuellen, historische Zustimmungen ins Hidden-Field, Submit steuern. Fallstrick-Katalog: `data-topicid="undefined"` als String, Matching Purpose vs Topic, Datenquelle `event.target` (Registrierung) vs Parent-Container (Kaufprozess), Guard gegen leeres `{}`/`[]`, `checked` per setAttribute reicht nicht ohne input/change-Events.

2. **Newsletter als Zweck oder als Thema modellieren**
   Grundsatzentscheidung mit Pro/Contra. Kern: Zweck ist BU-uebergreifend teilbar, Thema nicht (Staatsballett-Fall). DOI-Platzhalter `{{OptedInPurposeTopic}}` gibt Zwecke und Themen als flache Liste aus.

3. **Segment-Layering und Timing in Journeys**
   Segmente auf Segmenten aktualisieren sich nicht synchron. Kontakte treten ein, bevor das zweite Segment aktuell ist, falsche Verzweigung. Loesung: Wartezeit ca. 1h.

4. **CIJ-Berechtigungen ueber Sub-Business-Units statt Teams**
   Team-basierte Sicherheit in CIJ nicht moeglich (Tabellenstruktur), daher BU-basiert mit SubBU-Ebene, direkte Rollenzuweisung am User, Ersatz-Teams fuer bestehende Flows.

5. **Auditierbares Double-Opt-In-Protokoll in CIJ bauen** (aufgewertet aus Tier 2)
   CIJ speichert OOTB nur den Consent-Zustand, nicht wann/woher/ueber welche Uebermittlung (DSGVO Art. 7 Nachweispflicht). Eigene append-only Log-Tabelle `co_doilog`: eine Zeile je bestaetigtem Zweck/Thema, mit Zeitstempel, Herkunft, Purpose-/Topic-Lookup, Verknuepfung zur Formularuebermittlung, Subgrid am Kontakt.
   - Einwilligung an E-Mail gebunden (Matchcode `emailaddress1` gemappt mit Inhouse-System), nicht an Kontakt.
   - Quellen: Kaufprozess, Meine Daten, Website-Formular (`co_remark` per Script), Registrierung (braucht konfigurierbare Form-ID), E-Mail-Aenderung.
   - E-Mail-Aenderung: Plugin (Update contact, Post-operation) erkennt Aenderung ueber Pre-Image, stoesst Cloud Flow per HTTP-POST an, DOI-Neueinholung, Consent-Umzug. DOI-Fenster 48-72h.
   - Consent-Format `P=<Purpose>|T=<Topic>`, leeres T = nur Zweck-Ebene.

Themen 1, 2 und 5 ergeben zusammen eine dreiteilige DOI-/Consent-Serie.

## Tier 2 (solide, aber nischiger oder kuerzer)

6. **contactpointconsent4 hat kein editierbares Standardformular**
   Managed, `IsCustomizable = false`, taucht nicht in "Load existing forms" auf. Workaround: eigenes Main-Form anlegen. Kurzer How-to.

7. **CIJ-Formular auf externer Website einbetten**
   `createForm`-Snippet, Datenuebergabe ueber hidden Felder / vorgelagerte API (Payload apikey + email, Rueckgabe Consent-Strings), DOI direkt uebers CRM statt ueber die Website. Verbindet Thema 1 und 5.

8. **ECG-/Robinsonlisten-Abgleich per API (Oesterreich)**
   Boolean-vs-String-Bug (`"true"` statt `true`) im Request. Sehr nischig, AT-spezifisch, eher kurzer Tipp.

## Nicht als CIJ-Blog geeignet
- Excel-Formel zur E-Mail-Ableitung aus Namensmustern (nicht CIJ-spezifisch)
- Feld ausblenden Business Rule vs JavaScript (zu allgemein)

## Offen
- Feldliste `co_doilog` noch aus JetTicket-Session verifizieren (Session-ID war fehlerhaft).
