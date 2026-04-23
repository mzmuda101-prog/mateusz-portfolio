# Mateusz Portfolio

Osobiste portfolio w formie statycznej strony typu one-page.

## Licencja

Kod źródłowy tej strony jest udostępniony na licencji `MIT`.

Wyjątek:
teksty portfolio, logo, identyfikacja wizualna, zrzuty ekranów, grafiki oraz inne materiały brandingowe i prezentacyjne pozostają własnością Mateusza Zmudy i nie są objęte swobodnym ponownym wykorzystaniem jako gotowy branding lub portfolio 1:1 bez wyraźnej zgody autora.

## Zawartość

- hero z interaktywnymi panelami
- sekcja wyróżnionych projektów z własnymi akcentami kolorystycznymi
- sekcja GitHub z pobieraniem repozytoriów z GitHub API
- favicon i lokalne assety projektowe

## Uruchomienie lokalnie

To jest statyczna strona, więc wystarczy prosty serwer:

```bash
python3 -m http.server 8000
```

Następnie otwórz:

```text
http://127.0.0.1:8000/
```

## Publikacja

Strona nadaje się do wrzucenia jako repo statyczne i publikacji np. na Vercel.

## Główne pliki

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

## Roadmapa

TODO: docelowo - spróbować dorzucić jakis mechanizm który jeszcze bardziej automatycznie dopasuje styl (kolory np.) pokazywania projektu/panelu do nowego repo na podstawie fetchowanych danych (np. z GitHub API).

