# Fonts

Self-hosted шрифты. Запросы к `fonts.googleapis.com` и `fonts.gstatic.com` с
production-страницы запрещены.

## Состав

| Файл | Family | Style | Weight | Subset |
| --- | --- | --- | --- | --- |
| `cormorant-400-cyrillic.woff2` | Cormorant Garamond | normal | 400 | cyrillic |
| `cormorant-400-latin.woff2` | Cormorant Garamond | normal | 400 | latin |
| `cormorant-500-cyrillic.woff2` | Cormorant Garamond | normal | 500 | cyrillic |
| `cormorant-500-latin.woff2` | Cormorant Garamond | normal | 500 | latin |
| `cormorant-400i-cyrillic.woff2` | Cormorant Garamond | italic | 400 | cyrillic |
| `cormorant-400i-latin.woff2` | Cormorant Garamond | italic | 400 | latin |
| `dmsans-400-latin.woff2` | DM Sans | normal | 400 | latin |
| `dmsans-500-latin.woff2` | DM Sans | normal | 500 | latin |
| `dmsans-600-latin.woff2` | DM Sans | normal | 600 | latin |

Начертания Cormorant 600 и DM Sans italic, которые загружались через Google
Fonts, из проекта исключены — они не используются в стилях.

## Важно: DM Sans не содержит кириллицы

Google Fonts отдаёт для DM Sans только subsets `latin` и `latin-ext`.
Кириллических глиф в шрифте нет. Русский текст рендерится fallback-шрифтом из
`--font-body` (`system-ui`) — так было и до самохостинга, визуально ничего не
изменилось.

Выбор кириллического body-шрифта — отдельное решение уровня Stage 2 (контент и
типографика) или Stage 7 (метрики fallback-шрифтов, `size-adjust`).
Самостоятельно подменять DM Sans другим шрифтом нельзя: это изменение
визуальной системы из `SKILL.md`.

## Источник и лицензия

Файлы получены с официального CDN Google Fonts (`fonts.gstatic.com`) через
`https://fonts.googleapis.com/css2?...`, subsets `cyrillic` и `latin` взяты как
есть, без ресабсеттинга.

Оба семейства распространяются по **SIL Open Font License 1.1**. OFL 1.1 требует
прикладывать текст лицензии при распространении файлов шрифтов, поэтому рядом с
`.woff2` лежат оригинальные тексты:

| Файл лицензии | Семейство | Copyright |
| --- | --- | --- |
| `OFL-CormorantGaramond.txt` | Cormorant Garamond | Copyright 2015 the Cormorant Project Authors |
| `OFL-DMSans.txt` | DM Sans | Copyright 2014 The DM Sans Project Authors |

Оба файла взяты без изменений из `google/fonts` (`ofl/cormorantgaramond/OFL.txt`
и `ofl/dmsans/OFL.txt`). Они не подключаются к странице и не создают сетевых
запросов — это только сопроводительная документация в репозитории.

## Обновление

При замене файлов обязательно синхронизировать:

1. блок `@font-face` в начале `assets/css/main.css`, включая `unicode-range`;
2. `<link rel="preload" as="font">` в `index.html` — preload только тех файлов,
   что реально нужны для первого экрана;
3. таблицу в этом файле.
