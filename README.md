# QR-fabrikken

QR-fabrikken er en liten, rask nettapp som lager stilige QR-koder rett i nettleseren.

## Slik bruker du den (superenkelt)

1. Lim inn lenke eller tekst.
2. Se forhåndsvisning oppdatere seg automatisk.
3. Klikk **Last ned PNG** eller **Kopier bilde**.

Ferdig. Ja, så lett skal det være.

## Flere innstillinger

Klikk **Flere innstillinger** hvis du vil finjustere:

- størrelse (512–1024)
- luft rundt koden (margin)
- feilkorreksjon
- farger
- kommune-logo av/på

Standardvalg er laget for trygg bruk: størrelse 800, logo på, feilkorreksjon H og margin minst 4.

## Logo og kvalitet

- Bruk kommunens logo i høy kvalitet for skarpest resultat.
- Vektor (`.svg`) er best, men høyoppløst PNG fungerer også fint.
- Små QR-koder kan gjøre rasterlogo litt uklar, derfor er minimum satt til 512 px.

## Kjør lokalt

```bash
python3 -m http.server 8000
```

Åpne deretter `http://localhost:8000`.
