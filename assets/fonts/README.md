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
| `manrope-var-cyrillic.woff2` | Manrope | normal | 400–600 (variable) | cyrillic |
| `manrope-var-latin.woff2` | Manrope | normal | 400–600 (variable) | latin |

Итого 8 файлов, 144 KB. Preload — только `manrope-var-cyrillic.woff2` (весь
интерфейсный текст первого экрана) и `cormorant-500-latin.woff2` (заголовок
«Figura Lab»), 37 KB.

## Stage 2: DM Sans заменён на Manrope

До Stage 2 body-шрифтом был DM Sans. Google Fonts отдаёт для него только
subsets `latin` и `latin-ext`: кириллических глиф в шрифте нет, и весь русский
текст сайта рендерился системным fallback. Решение было отложено до Stage 2 как
изменение визуальной системы.

Manrope выбран потому, что:

* полноценный кириллический subset той же студии-качества, что и латиница;
* нейтральный геометрико-гуманистический характер — не спорит с антиквой
  Cormorant в заголовках, но держит собственную современную интонацию;
* variable-файл: один `.woff2` на subset покрывает весь диапазон 400–600, то
  есть три статических начертания DM Sans заменяются одним файлом на subset;
* SIL OFL 1.1 — self-hosting разрешён.

Italic у Manrope не подключается: курсив в системе только у Cormorant.

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
| `OFL-Manrope.txt` | Manrope | Copyright 2018 The Manrope Project Authors |

Оба файла взяты без изменений из `google/fonts` (`ofl/cormorantgaramond/OFL.txt`
и `ofl/manrope/OFL.txt`). Они не подключаются к странице и не создают сетевых
запросов — это только сопроводительная документация в репозитории.

## Обновление

При замене файлов обязательно синхронизировать:

1. блок `@font-face` в начале `assets/css/main.css`, включая `unicode-range`;
2. `<link rel="preload" as="font">` в `index.html` — preload только тех файлов,
   что реально нужны для первого экрана;
3. таблицу в этом файле.
