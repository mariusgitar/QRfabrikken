# QR Studio

QR Studio is a lightweight static web app for generating branded QR codes directly in the browser.

## Simple mode (default workflow)

1. Lim inn tekst eller URL i feltet.
2. QR forhåndsvisning oppdateres automatisk med sensible defaults:
   - størrelse `800px`
   - kommunelogo **på**
   - feilkorreksjon `H` når logo er aktiv
3. Klikk **Download PNG** (eller **Copy image**) for å bruke QR-koden.

Dette er laget for ikke-eksperter: «Lim inn URL – ferdig.»

## Advanced settings

Klikk **Flere innstillinger** for å åpne avanserte valg:

- Size slider (`512–1024`, step `32`)
- Margin (minimum `4`)
- Error correction
- Foreground/background-farger
- Toggle for kommunelogo

Merk: Kommunelogo er på som standard. Du kan åpne settings via **Endre innstillinger**.

## Municipality logo guidance

- Bruk kun kommunens logo (ingen opplasting/presets).
- Foretrukket kilde: `assets/tonsberg-logo.svg` (vektor).
- Fallback: `assets/tonsberg-logo.png` i høy oppløsning (`1024x1024` anbefalt).
- QR størrelser under 512 kan gi blurr på rasterlogo; derfor clampes størrelsen til `512–1024`.

## Run locally

```bash
python3 -m http.server 8000
```

Åpne deretter `http://localhost:8000`.

## Manual test checklist

- [x] Last siden: default size er `800`, logo er **på**, og QR genereres når URL/text limes inn.
- [x] Avanserte innstillinger er skjult som default.
- [x] Åpne **Flere innstillinger** og endre size/margin/farger/logo -> preview oppdateres.
- [x] Download PNG fungerer og eksport matcher preview.
- [x] Tastatur: Tab til summary, Enter/Space toggler details, fokus er synlig.
- [x] Ingen console errors i normal flyt.
