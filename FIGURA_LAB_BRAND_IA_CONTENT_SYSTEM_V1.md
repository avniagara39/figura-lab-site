# FIGURA LAB — Brand · IA · Content System V1

**Статус:** STAGE 2.5 BRAND + IA LOCK  
**Дата:** 2026-08-29  
**Ветка:** stage-2-5-brand-ia  
**Назначение:** Canonical document. Источник истины для всех будущих агентов и разработчиков.  
**Приоритет источников:** Этот документ → README.md → FIGURA_LAB_MASTER_PLAN_FINAL.md → SKILL.md → TZ.md

---

## 1. Executive Summary

Figura Lab by Елена Бастуева — это wellness-бренд нутрициолога, специализирующегося на осознанном снижении веса и нормализации пищевых привычек. Не медицинская клиника, не фитнес-марафон.

**Текущий статус проекта:**
- Реализован Stage 0 (foundation) + Stage 1 (accessibility) + Stage 2 design system pass
- Текущий код — дизайн-прототип / design system reference (одностраничный MVP)
- Многостраничный production-сайт строится начиная с Stage 3 (Eleventy)
- До Stage 3: не менять HTML/CSS/JS без отдельного утверждения

**Принцип работы от этой точки:**

```
СНАЧАЛА УТВЕРЖДАЕМ СИСТЕМУ → ПОТОМ СТРОИМ → ТОЛЬКО ПОТОМ ПОЛИРУЕМ
```

**Что зафиксировано этим документом:**
- Бренд-направление и палитра
- Типографика
- UX-философия
- Информационная архитектура
- Blueprint каждой страницы
- Компонентная модель
- Контентная политика
- Юридический контур
- DO / DON'T

**Что НЕ содержит этот документ:**
- Готового кода
- Финальных цен, программ, контактов (VERIFY_WITH_ELENA)
- Юридических текстов (LEGAL_REVIEW)
- Логотипа (BRAND_ASSET_PENDING_FINAL)

---

## 2. UX-философия: Quiet Luxury Concierge

### Направление

```
QUIET LUXURY + INTELLIGENT WELLNESS + PREMIUM EDITORIAL + CONCIERGE UX + MODERN FEMININE
```

### Принцип поведения сайта

Сайт ведёт себя как безупречный ненавязчивый консьерж:

- Не мешает, не навязывает, не перегружает
- Не требует лишних действий от пользователя
- Нужная информация появляется именно тогда, когда нужна
- Пользователь всегда понимает, где он находится
- Переходы логичны и предсказуемы
- Интерфейс «исчезает» за содержанием
- Сайт создаёт ощущение заботы, спокойствия, профессионализма

**Инструмент:** Progressive Disclosure — информация раскрывается последовательно, по мере готовности пользователя.

**Premium whitespace:** допустим и нужен. Но premium whitespace ≠ пустой недоделанный экран. Пространство между элементами — намеренная пауза, не отсутствие контента.

---

## 3. Brand System — LOCKED

### 3.1 Основная палитра интерфейса

**Статус: LOCKED**

| Группа | Роль | Описание |
|--------|------|----------|
| BASE SURFACES | Основной фон страниц | warm ivory / milk / light linen / very soft warm cream |
| SECONDARY SURFACES | Полосы, секционные фоны | soft sand / champagne-beige / restrained warm neutral |
| TEXT — primary | Основной текст | warm graphite |
| TEXT — secondary | Вспомогательный текст, лейблы | softer graphite |
| PRIMARY UI ACCENT | Кнопки, ссылки, eyebrow | muted sage / refined deep olive |
| DECORATIVE ACCENT | Точечный декор, цифры | very subtle champagne / muted warm gold |
| DARK BLOCK | Финальный CTA, футер | deep ink/graphite |

**Конкретные токены (из текущего design system):**

```css
/* Поверхности */
--c-ivory, --c-white, --c-linen, --c-linen-deep, --c-sand

/* Текст */
--c-graphite, --c-graphite-soft, --c-graphite-mute

/* Тёмный блок */
--c-ink, --c-ink-text, --c-ink-text-mute

/* Зелёная система (UI accent) */
--c-sage-text, --c-olive, --c-olive-deep

/* Акценты */
--c-wine, --c-metal, --c-champagne

/* Линии */
--hairline, --hairline-strong, --line-strong, --hairline-invert
```

**Правила применения акцентов:**
- `--c-sage-text` — самый светлый допустимый зелёный для текста (≥5.5:1)
- `--c-wine` — точечно: одна строка, не как UI accent, не как фон
- `--c-metal` — декор и текст на тёмном фоне; на светлом как текст НЕ использовать (2.20:1)
- `--c-champagne` — только декор, не текст

### 3.2 Что ЗАПРЕЩЕНО

**PLUM / PURPLE / WINE / BURGUNDY — НЕ использовать как основной UI accent.**

Новый логотип может содержать plum / rose-gold / metallic tones как самостоятельный брендовый объект. Но палитру логотипа НЕ переносить буквально на интерфейс.

**Сайт НЕ должен быть:**
- Purple website
- Gold website
- Pink luxury
- Beauty salon
- Medical clinic
- Generic beige wellness template

### 3.3 Типографика — LOCKED

**Статус: LOCKED**

| Роль | Шрифт | Начертания |
|------|-------|-----------|
| Display / Editorial headings / Цитаты | Cormorant Garamond | 400, 500, italic 400 |
| Body / Navigation / UI / Labels | Manrope (variable) | 400–600 |

**Технически:**
- Self-hosted woff2, subset cyrillic + latin
- `font-display: swap`
- `text-wrap: balance` на заголовках
- `text-wrap: pretty` на абзацах

**✅ CONFLICT-01 RESOLVED — Human approved 2026-08-29**

DM Sans выведен из системы на Stage 2 design system pass (причина: отсутствие кирилличного сабсета). Manrope подтверждён как canonical body шрифт. FIGURA_LAB_MASTER_PLAN_FINAL.md в части шрифтов устарел — написан до Stage 2, не отражает принятое решение.

**Не менять шрифты без отдельного human approval.**

### 3.4 Логотип — BRAND_ASSET_PENDING_FINAL

**Статус: BRAND_ASSET_PENDING_FINAL**

Новый логотип существует, но не финализирован. Не внедрять сейчас.

Будущая система должна поддерживать:
1. Основной горизонтальный logo lockup
2. Compact symbol
3. Light-background version
4. Dark-background version
5. SVG production master
6. Favicon/app-icon derivative

Текущий header использует текстовый `.brand-mark`, рассчитанный на подстановку `<img>` / `<svg>` без правки раскладки.

Телефон внутри логотипа — НЕ нужен.

---

## 4. Photo Art Direction — LOCKED

**Статус: LOCKED**

### Стиль фотографий

- Editorial, premium, natural
- Confident — soft but not romantic
- Realistic skin / materials
- High-end magazine quality
- Warm neutral environments
- Restrained styling
- Никаких generic stock wellness smiles
- Никаких изображений весов, сантиметровых лент, «до/после» коллажей
- Никаких стоковых изображений еды в wellness-эстетике

### Фото Елены

Главный источник доверия и человеческого присутствия на сайте. Текущая hero-фотография — временная.

**Статус:** REPLACE_WITH_FINAL_ELENA_HERO (VERIFY_WITH_ELENA)

### Фото клиентов

Не использовать AI-портреты вымышленных женщин, если они воспринимаются как реальные клиенты.

Для отзывов предпочтение: текстовая editorial presentation без фиктивных клиентских портретов. Фото клиентов — только с письменным согласием.

### Необходимые медиа-активы

| Актив | Статус | Приоритет |
|-------|--------|-----------|
| elena-hero (финальная) | VERIFY_WITH_ELENA | P0 |
| elena-portrait (второй ракурс, /elena/) | VERIFY_WITH_ELENA | P1 |
| og-cover 1200×630 | VERIFY_WITH_ELENA | P1 |
| Favicon SVG + ICO + apple-touch-icon | BRAND_ASSET_PENDING_FINAL | P1 |
| 2–4 фото пространства/офиса | VERIFY_WITH_ELENA | P2 |
| 1–2 фото рабочего процесса | VERIFY_WITH_ELENA | P2 |
| Сканы сертификатов | VERIFY_WITH_ELENA | P2 |
| Обложки статей журнала 16:9 | Создать отдельно | P3 |

---

## 5. Motion — LOCKED

**Статус: LOCKED**

**Принцип:** Animation supports content, never decorates for its own sake.

**Допустимо:**
- Subtle fade (opacity)
- 150–350ms transition
- Very small translate (2–4px)
- Soft hover state changes
- Deliberate disclosure (FAQ accordion)
- Reveal при прокрутке

**Запрещено:**
- Autoplay carousels / бесконечная прокрутка
- Parallax circus
- Rotating decorations
- Bouncing
- Flashy effects
- Анимация, конкурирующая с контентом

**`prefers-reduced-motion`:** обязателен, покрывает все анимации без исключения.

---

## 6. Information Architecture — LOCKED

**Статус: LOCKED**

### 6.1 Production URL-структура

Production-сайт — многостраничный. Главная НЕ является длинным складом всего контента.

```
/                           Главная
/metod/                     Метод
/programmy/                 Программы
/rezultaty/                 Результаты и отзывы
/elena/                     Елена Бастуева
/zhurnal/                   Журнал
/zhurnal/<slug>/            Статья
/kontakty/                  Контакты / консультация
/pravo/privacy/             Политика конфиденциальности
/pravo/soglasie/            Согласие на обработку ПДн
/404.html                   404
```

**Отдельных страниц НЕТ для:**
- /faq/ — FAQ живёт как компонент на /metod/ и /programmy/ (раздел 11 FINAL PLAN)
- /kalkulyator/ — в roadmap на Stage 8, сейчас не в scope Stage 2.5
- /online-zapis/ — нет; CTA ведёт на /kontakty/

### 6.2 FAQ — решение

**CONFLICT_TO_RESOLVE #2:**  
TZ.md упоминает FAQ как отдельную страницу. FINAL PLAN решил: FAQ как структурированные компоненты на /metod/ и /programmy/ + краткий блок на главной. Ссылка в футере «Вопросы и ответы» → /programmy/#faq.

**Принятое решение:** Отдельная страница /faq/ НЕ создаётся. Причины:
- 8–10 вопросов не наполняют отдельную страницу
- FAQ полезнее в точке принятия решения
- FAQ schema даёт минимальный SEO-эффект для коммерческого сайта

### 6.3 Диаграмма потоков

```
/  (Главная)
├── /metod/
│   └── → /programmy/ → /kontakty/
├── /programmy/
│   └── → /kontakty/
├── /rezultaty/
│   └── → /kontakty/
├── /elena/
│   └── → /kontakty/
├── /zhurnal/
│   ├── /zhurnal/<slug>/
│   └── → /kontakty/
└── /kontakty/
    ├── /pravo/privacy/
    └── /pravo/soglasie/
```

Все пути ведут к /kontakty/ — единая точка конверсии.

---

## 7. Global Navigation — LOCKED

**Статус: LOCKED**

### Desktop Navigation (5 пунктов + CTA)

```
Метод | Программы | Результаты | Елена | Журнал | [Консультация]
```

**Primary CTA:** «Консультация» — кнопка-акцент, всегда видима.

НЕ использовать «Подход» вместо «Метод».  
Каждый пункт ведёт на РЕАЛЬНУЮ страницу, не на section anchor главной (кроме текущего prototype-этапа).

### Footer Navigation (4 колонки)

| Разделы | Информация | Связь | Правовое |
|---------|-----------|-------|---------|
| Метод | Вопросы и ответы | Телефон | Политика конфиденциальности |
| Программы | Контакты | Email | Согласие на обработку ПДн |
| Результаты | | Telegram | Реквизиты оператора |
| Елена | | MAX | |
| Журнал | | WhatsApp | |

*Состав каналов связи:* VERIFY_WITH_ELENA  
*Реквизиты оператора:* VERIFY_WITH_ELENA + LEGAL_REVIEW

### Mobile Navigation

Та же IA, что desktop. Бургер-меню с:
- focus trap (Tab заперт внутри меню)
- Escape закрывает, возвращает фокус на бургер
- `inert` на фоновом контенте
- `body.nav-locked` (без inline-стилей — требование CSP)
- aria-expanded переключается

Logo всегда ведёт на Главную (/).

---

## 8. Page Blueprints

### 8.1 Главная — /

**PURPOSE:** Premium storytelling showcase. Первое впечатление о бренде. Мостики в разделы.

**НЕ является:** полным складом контента всех разделов.

**Структура:**

| # | Блок | Purpose | Content | Primary Action | Destination | НЕ должно быть |
|---|------|---------|---------|----------------|-------------|----------------|
| 1 | **HERO** | Первый контакт с брендом | Фото Елены, headline, 2 CTA | «Консультация» | /kontakty/ | Цены, программы, список услуг |
| 2 | **Введение в метод** | Позиционирование, отличие от диет | «Не диета. Не марафон.» + 2–3 предложения | «Узнать метод» | /metod/ | Медицинские claims, гарантии |
| 3 | **Programs preview** | Анонс форматов | 2–3 программы с кратким описанием | «Все программы» | /programmy/ | Цены (до VERIFY), подробный состав |
| 4 | **Featured results** | Доверие, социальное доказательство | 3 клиентские истории (VERIFY_WITH_ELENA) | «Все истории» | /rezultaty/ | Имена без разрешения, fake quotes |
| 5 | **Elena preview** | Человеческое присутствие, доверие | Краткое bio, фото | «Подробнее об Елене» | /elena/ | Выдуманные сертификаты/стаж |
| 6 | **Journal preview** | Экспертность, SEO, полезность | 2–3 карточки статей | «В журнал» | /zhurnal/ | Fake статьи |
| 7 | **Final CTA** | Конверсия | «Начните с бережного разговора о себе» | «Записаться на консультацию» | /kontakty/ | Давление, счётчики обратного отсчёта |
| 8 | **Footer** | Навигация, контакты, правовое | 4 колонки | — | — | Мёртвые ссылки, fake контакты |

**Принцип:** На главной 2–3 representative items + мостик в полноценный раздел.

---

### 8.2 Метод — /metod/

**PURPOSE:** Объяснить систему работы Елены и отличие от краткосрочной диеты/марафона. Снять возражения. Закрыть вопрос «Как это работает?»

**H1:** «Метод Figura Lab»

**Blueprint:**

| Блок | Content | Notes |
|------|---------|-------|
| Page hero | Headline + подзаголовок | Без фото клиентов |
| Философия | «Не диета, не марафон» — ценности подхода | VERIFIED (из TZ и текущего MVP) |
| 4 этапа работы | Диагностика → Питание → Нутриенты → Сопровождение | LEGAL_REVIEW формулировок про гормоны/сахар |
| Отличие от диет | Что делает метод иначе | Не делать медицинских утверждений |
| FAQ о подходе | 4–6 вопросов | «Будут ли жёсткие диеты?», «Нужны ли анализы?», «Как закрепить?» |
| CTA | Одна кнопка | «Записаться на консультацию» → /kontakty/ |

**Primary CTA:** «Записаться на консультацию»

**Аудитория — CONFLICT-03 RESOLVED:** Формулировки страницы гендерно нейтральны. Визуальный характер бренда может быть modern feminine, но текст метода не ограничивает аудиторию по полу. Никаких выдуманных ограничений аудитории.

**НЕ придумывать:** медицинские преимущества, механизмы действия, гарантии результата.

---

### 8.3 Программы — /programmy/

**PURPOSE:** Дать достаточно информации для принятия решения. Показать форматы, состав, условия.

**H1:** «Программы сопровождения»

**Blueprint:**

| Блок | Content | Notes |
|------|---------|-------|
| Page hero | Headline + короткое позиционирование | |
| Форматы работы | 2–3 программы с описанием | VERIFY_WITH_ELENA: названия, состав |
| Что входит | Список для каждой программы | VERIFY_WITH_ELENA |
| **Для кого** | Явный блок для каждой программы | Обязателен. См. правило ниже |
| Длительность | Срок программы | VERIFY_WITH_ELENA |
| Стоимость | Цены | VERIFY_WITH_ELENA; указывать дату актуальности |
| FAQ о формате | «Онлайн-формат работает?», «Как оплатить?» | VERIFY_WITH_ELENA |
| CTA | | «Записаться на консультацию» → /kontakty/ |

**Страница должна быть структурно готова для нескольких программ/форматов.**

**Правило «Для кого» — CONFLICT-03 RESOLVED:**  
Каждая программа на /programmy/ имеет явный блок «Для кого». По умолчанию — гендерно нейтральная формулировка (бренд не ограничивает аудиторию по полу). Если конкретная программа предназначена для ограниченной аудитории (например, только для женщин) — это указывается явно только после VERIFY_WITH_ELENA. Никаких выдуманных ограничений аудитории.

**НЕ придумывать:** названия программ, стоимость, продолжительность, состав услуг, гарантии, ограничения аудитории.

Всё неизвестное → VERIFY_WITH_ELENA

---

### 8.4 Результаты и отзывы — /rezultaty/

**PURPOSE:** Полноценный архив клиентских историй. Социальное доказательство экспертизы.

**H1:** «Истории и результаты»

**Blueprint:**

| Блок | Content | Notes |
|------|---------|-------|
| Page hero | Headline | |
| Статистика (опционально) | Счётчики: клиенты, годы | VERIFY_WITH_ELENA; без 42 000 кг без разрешения |
| Фильтр | По типу результата | Работает без JS (все видны по умолчанию) |
| Полный список историй | До 14 реальных отзывов | VERIFY_WITH_ELENA (согласие на публикацию) |
| CTA | | «Записаться на консультацию» → /kontakty/ |

**Отображение имён:** только в согласованном виде: «Екатерина», «Ольга К.», «Ирина Б.»  
НЕ публиковать полное имя без явного согласия.

**НЕ писать** жёсткое число «14 отзывов».  
Использовать: «Все отзывы» / «Истории клиентов».

**На главной:** только 3 FEATURED STORIES.  
**На /rezultaty/:** все разрешённые к публикации.

---

### 8.5 Елена Бастуева — /elena/

**PURPOSE:** Доверие к эксперту. Человеческое присутствие.

**H1:** «Елена Бастуева»

**Blueprint:**

| Блок | Content | Notes |
|------|---------|-------|
| Portrait hero | Editorial фото, headline | VERIFY_WITH_ELENA |
| Биография | Профессиональный путь | VERIFY_WITH_ELENA |
| Образование | Учебные заведения, программы | VERIFY_WITH_ELENA |
| Сертификаты/документы | Галерея с возможностью увеличить | VERIFY_WITH_ELENA |
| Philosophy | Взгляд на питание и здоровье | Согласовать с Еленой |
| Media / Press | Публикации, упоминания | Только если реально существует |
| CTA | | «Записаться на консультацию» → /kontakty/ |

**НЕ придумывать:** образование, титулы, стаж, ассоциации, количество клиентов, награды, сертификаты.

Всё неизвестное → VERIFY_WITH_ELENA

---

### 8.6 Журнал — /zhurnal/

**PURPOSE:** Экспертность, SEO, доверие, полезность сайта.

**H1:** «Журнал Figura Lab»

**Content architecture:**

| Элемент | Описание |
|---------|---------|
| Список статей | Карточки: обложка 16:9, заголовок, дата, категория, excerpt |
| Категории | Питание / Привычки / Психология еды / Снижение веса — уточнить |
| Article detail | Full article + related materials |
| Related | 2–3 связанные статьи в конце |

**Минимум для запуска:** 3 статьи (иначе раздел выглядит пустым).  
**Не создавать тексты статей** без участия Елены или отдельного approval.

Любая статья о здоровье → LEGAL_REVIEW формулировок.

---

### 8.7 Контакты / Консультация — /kontakty/

**PURPOSE:** Единая точка конверсии. Человек выбирает удобный ему канал.

**H1:** «Записаться на консультацию»

**Blueprint:**

| Блок | Content | Notes |
|------|---------|-------|
| Каналы связи | Telegram / MAX / WhatsApp / Телефон / Email | VERIFY_WITH_ELENA |
| Адрес (если публикуем) | Офис в Тольятти | VERIFY_WITH_ELENA |
| Форма записи (якорь #zapis) | Минимум полей | До Stage 9: fallback на прямые контакты |
| Согласие | Ссылки на /pravo/ | LEGAL_REVIEW |

**UX-принцип:** человек выбирает удобный канал. Не заставлять заполнять длинную форму без необходимости.

**Форма — минимум полей:**
- Имя (обязательно)
- Телефон или email (обязательно одно из двух)
- Удобное время связи (select, опционально)
- Комментарий (опционально) + подпись: «Не указывайте диагнозы и анализы — обсудим на консультации»
- Чекбокс согласия на обработку ПДн (обязательный, не отмечен по умолчанию)

**НЕ собирать через форму:** медицинские данные, диагнозы, анализы, вес, рост, ИМТ.

**НЕ создавать fake ссылки на мессенджеры.** Все реальные URL → VERIFY_WITH_ELENA

---

### 8.8 Политика конфиденциальности — /pravo/privacy/

**PURPOSE:** Соответствие 152-ФЗ. Юридическое требование.

Не публиковать с placeholder-реквизитами.

Реквизиты оператора ПДн: VERIFY_WITH_ELENA + LEGAL_REVIEW

---

### 8.9 404

С полноценным header, footer и ссылками на основные разделы. Человеческий тон.

---

## 9. CTA Map

| Страница | Primary CTA | Destination |
|---------|-------------|-------------|
| / Главная | «Записаться на консультацию» | /kontakty/ |
| / Главная | «Узнать метод» | /metod/ |
| /metod/ | «Записаться на консультацию» | /kontakty/ |
| /programmy/ | «Записаться на консультацию» | /kontakty/ |
| /rezultaty/ | «Записаться на консультацию» | /kontakty/ |
| /elena/ | «Записаться на консультацию» | /kontakty/ |
| /zhurnal/ | «Записаться на консультацию» | /kontakty/ |
| /zhurnal/slug/ | «Записаться на консультацию» | /kontakty/ |
| Global header | «Консультация» | /kontakty/ |

Единая точка конверсии: /kontakty/  
Якорь к форме: /kontakty/#zapis

---

## 10. Component Model

**Статус: PROVISIONAL**

Принцип: компоненты создаются один раз и переиспользуются. Не копировать вручную header/footer.

| Компонент | Тип | Примечание |
|----------|-----|-----------|
| `global-header` | Layout | Logo + Nav + CTA. Один источник (Eleventy partial) |
| `global-footer` | Layout | 4 колонки. Один источник |
| `skip-link` | Accessibility | Первый элемент body |
| `breadcrumbs` | Navigation | На всех внутренних страницах |
| `page-hero` | Section | Заголовок страницы + optional intro |
| `btn-primary` | Button | Оливковый градиент |
| `btn-line` | Button | Контурная (светлый фон) |
| `btn-invert` | Button | На тёмном блоке |
| `editorial-heading` | Typography | Display / section heading |
| `eyebrow` | Typography | Надзаголовок (sage text) |
| `program-preview` | Card | Карточка программы |
| `featured-story` | Card | 3 истории на главной |
| `full-testimonial` | Card | Полный отзыв на /rezultaty/ |
| `elena-preview` | Section | Блок Елены на главной |
| `article-card` | Card | Карточка журнала |
| `document-gallery` | Gallery | Сертификаты с zoom |
| `contact-channel` | UI | Кнопка/ссылка на канал связи |
| `faq-item` | Disclosure | `<details>/<summary>` + CSS анимация |
| `cta-panel` | Section | Final CTA блок (тёмный) |
| `back-to-top` | UI | Появляется после 600px прокрутки |

**На Stage 3 (Eleventy):** компоненты = Nunjucks partials в `src/_includes/partials/`.

---

## 11. Testimonials Policy — LOCKED

**Статус: LOCKED**

### Production pipeline отзывов

```
РЕАЛЬНЫЙ ОРИГИНАЛ
→ ПРОВЕРКА РАЗРЕШЕНИЯ НА ПУБЛИКАЦИЮ (VERIFY_WITH_ELENA)
→ LEGAL_REVIEW при необходимости
→ SHORT EXCERPT (2–5 живых предложений)
→ FULL ORIGINAL (при наличии разрешения)
```

### Правила

**НЕ писать в интерфейсе** жёсткое число («14 отзывов»). Использовать: «Все отзывы» / «Истории клиентов».

**Имена:** только в согласованном виде:
- «Екатерина» (только имя)
- «Ольга К.» (имя + инициал фамилии)
- Если разрешения на имя нет — анонимизированный формат, согласованный с клиентом

**НЕ вылизывать** отзывы в AI-стиль. Живой текст без изменения смысла.

**НЕ придумывать** отзывы. НЕ придумывать клиентов.

**LEGAL_REVIEW обязателен, если отзыв содержит:**
- Медицинские claims («снизился сахар крови», «ушло воспаление»)
- Анализы, диагнозы, заболевания
- Гарантии результата («обязательно будет минус»)
- Чувствительные персональные сведения
- Упоминание третьих лиц (пример: отзыв Анастасии о муже)

**Счётчики** (20 лет / 1200 историй / 42 000 кг): VERIFY_WITH_ELENA + LEGAL_REVIEW  
Не публиковать без документального подтверждения.

---

## 12. Contact Architecture

**Статус: PROVISIONAL** (зависит от VERIFY_WITH_ELENA)

### Каналы (состав финализируется)

| Канал | Тип ссылки | Статус |
|-------|-----------|--------|
| Telegram | `https://t.me/...` | VERIFY_WITH_ELENA |
| MAX | официальная ссылка профиля/бота | VERIFY_WITH_ELENA |
| WhatsApp | `https://wa.me/...` | VERIFY_WITH_ELENA |
| VK | `https://vk.com/...` | VERIFY_WITH_ELENA |
| Email | `mailto:...` | VERIFY_WITH_ELENA (временно figura.lite@mail.ru) |
| Телефон | `tel:...` | VERIFY_WITH_ELENA (временно из figura-lite.ru) |

**НЕ публиковать** fake ссылки и не созданные links.  
**Все внешние ссылки:** `target="_blank" rel="noopener"`

### Временные контакты (из figura-lite.ru, не подтверждены)

- Email: figura.lite@mail.ru
- Телефон 1: 8 (8482) 61-41-39
- Телефон 2: 8 927 891-41-39
- Адрес: Тольятти, ул. Юбилейная, 2Б, БЦ «Восточный дублёр», офис 809

**Статус: VERIFY_WITH_ELENA before production**

---

## 13. Personal Cabinet — DEFERRED_PRODUCT_DECISION

**Статус: DEFERRED_PRODUCT_DECISION**

НЕ включать полноценный личный кабинет в первоначальный production scope.

**Причины:**
- Требует backend и authentication системы
- Хранение персональных данных пользователей = дополнительные требования 152-ФЗ
- Security: защита аутентификационных данных, сессий, токенов
- Администрирование: модерация, поддержка, восстановление доступа
- Стоимость разработки и поддержки несоразмерна объёму задачи на V1
- Требует отдельной юридической рамки

**Личный кабинет = отдельная будущая продуктовая система** после настройки CRM/bot workflow.

---

## 14. Future Bot / CRM Integration — ARCHITECTURE PLACEHOLDER

**Статус: ARCHITECTURE PLACEHOLDER**

```
Website
→ preferred communication channel
→ Telegram / MAX / WhatsApp / VK / Email
→ bot/admin workflow (отдельный сервис)
→ future CRM (отдельный сервис)
```

**Сейчас НЕ проектировать:** CRM, API, backend, ботов.  
**Сейчас зафиксировать:** архитектурную точку входа — страница /kontakty/ → выбор канала.

Место в футере для ссылки на внешний сервис размечается, но не выводится пока сервиса нет.

---

## 15. Legal & Content Rules — LOCKED

**Статус: LOCKED**

### NEVER INVENT (никогда не выдумывать)

- Цены
- Результаты
- Отзывы
- Клиентов
- Квалификации и сертификаты
- Даты и сроки
- Статистику и счётчики
- Медицинские claims
- Контакты
- Social URLs

### Маркировка контента

| Маркер | Значение | Действие |
|--------|---------|----------|
| **VERIFIED** | Подтверждён, можно публиковать | Использовать |
| **VERIFY_WITH_ELENA** | Требует подтверждения от Елены | Не публиковать |
| **LEGAL_REVIEW** | Требует проверки юристом | Не публиковать |
| **PLACEHOLDER_CONTENT** | Временный контент | Заменить до запуска |
| **BRAND_ASSET_PENDING_FINAL** | Брендовый актив в процессе финализации | Не применять |
| **NEVER** | Никогда не публиковать | Удалить |

### LEGAL_REVIEW обязателен для

- Состав и формулировки политики конфиденциальности (152-ФЗ)
- Текст согласия на обработку ПДн
- Любые формулировки о гормонах, воспалении, анализах, сахаре крови, заболеваниях, РПП
- Причинно-следственные утверждения о здоровье
- «Стройность и здоровье за 3 месяца» и подобные обещания сроков и результата
- Агрегированная статистика (1200 клиентов, 42 000 кг)
- Описание квалификации нутрициолога (граница с медицинской деятельностью)
- Статус публикуемых цен (является ли публичной офертой)
- Перенос отзывов со старого домена на новый (согласие клиентов)
- Маркировка рекламы при платном трафике
- Применимость требований 38-ФЗ «О рекламе» к заявлениям о результатах

### LEGAL_VERIFY (требует сверки с законодательством)

- Уведомление Роскомнадзора о начале обработки ПДн
- Локализация баз данных с ПДн граждан РФ → влияет на выбор хостинга
- Актуальные требования и санкции 152-ФЗ с изменениями 2025 года

---

## 16. Accessibility — LOCKED

**Статус: LOCKED** (Stage 1 контур сохраняется и наследуется всеми будущими страницами)

Цель: **WCAG 2.2 AA**

| Требование | Статус |
|-----------|--------|
| Skip-link «Перейти к основному содержанию» | LOCKED |
| `:focus-visible` для всех интерактивных элементов | LOCKED |
| Keyboard navigation без ловушек | LOCKED |
| Логические heading (один h1 на страницу) | LOCKED |
| Semantic HTML | LOCKED |
| Accessible mobile nav (focus trap, Escape, inert) | LOCKED |
| Contrast ≥ 4.5:1 для текста, ≥ 3:1 для UI компонентов | LOCKED |
| Touch targets ≥ 44×44px | LOCKED |
| `prefers-reduced-motion` покрывает все анимации | LOCKED |
| Proper dialog/focus management | LOCKED |
| `aria-current="page"` на активном пункте навигации | Stage 3 |
| Breadcrumbs с BreadcrumbList | Stage 3 |
| Accessible form validation (aria-describedby, aria-invalid) | Stage 5 |

---

## 17. Production Architecture — PROVISIONAL

**Статус: PROVISIONAL**

### Stage 3+ stack

| Слой | Решение |
|------|---------|
| SSG | Eleventy (11ty) |
| Templating | Nunjucks |
| CSS | один внешний `assets/css/main.css` + постраничные при необходимости |
| JS | Vanilla JS, без клиентского framework runtime |
| Данные | `src/_data/*.json` |
| Шрифты | self-hosted woff2, subset cyrillic+latin |
| Изображения | WebP + JPEG fallback, `<picture>` + `srcset` |

**НЕ использовать:** React, Next.js, Vite, Tailwind, Bootstrap, ReactBits, animation libraries.

### На Stage 2.5 Eleventy НЕ устанавливать

Eleventy появляется только после human approval этого документа и связанных BrandSystem / IA / Page Blueprints.

### Inline Critical CSS: НЕ применять

Конфликт с `style-src 'self'` CSP. Выигрыш при одном CSS-файле маргинальный. Решение — preload CSS + self-hosted fonts.

### Hosting — DEFERRED

Выбирается на Stage 9 по критериям:
- Произвольные HTTP-заголовки (CSP, HSTS, Permissions-Policy)
- Brotli/gzip
- Автодеплой из git
- Локализация ПДн граждан РФ (LEGAL_VERIFY)
- Стоимость и простота поддержки

---

## 18. SEO Architecture — PROVISIONAL

**Не выполнять SEO-overhaul сейчас.** Зафиксировать принципы для Stage 6.

| Элемент | Принцип |
|---------|---------|
| title | Уникальный, 50–60 символов, на каждой странице |
| description | Уникальный, 120–160 символов |
| canonical | Абсолютный URL, на всех страницах |
| Open Graph | og:title, og:description, og:url, og:type, og:locale=ru_RU, og:image |
| Twitter Card | summary_large_image |
| JSON-LD | WebSite, Person, ProfessionalService, BreadcrumbList, Article, FAQPage |
| НЕ использовать | MedicalBusiness, Physician, MedicalWebPage, MedicalCondition |
| AggregateRating | Только после VERIFY_WITH_ELENA (согласия) + реальной системы оценок |

---

## 19. DO / DON'T Summary

### DO ✓

- Следовать палитре: ivory/cream/sage/graphite
- Использовать Cormorant Garamond + Manrope
- Progressive disclosure
- Premium whitespace с содержанием
- VERIFY_WITH_ELENA перед публикацией любых фактов
- LEGAL_REVIEW для health-claims и юридических текстов
- Единый header/footer через Eleventy partials (Stage 3+)
- Один h1 на страницу
- alt на всех изображениях
- Accessible form validation
- `prefers-reduced-motion` на всех анимациях
- Concierge UX — ненавязчивость

### DON'T ✗

- НЕ менять палитру без human approval
- НЕ менять шрифты без human approval
- НЕ выдумывать цены, программы, отзывы, клиентов, квалификации
- НЕ публиковать health claims без LEGAL_REVIEW
- НЕ публиковать fake контакты
- НЕ использовать plum/purple как основной UI accent
- НЕ делать purple website / gold website / pink luxury
- НЕ копировать header/footer вручную между страницами
- НЕ добавлять React/Next/Vite/Tailwind/Bootstrap
- НЕ делать autoplay carousels / parallax circus / bouncing
- НЕ показывать ссылки на несуществующие сервисы («скоро»)
- НЕ собирать медицинские данные через форму
- НЕ публиковать fake ссылки на мессенджеры
- НЕ начинать Stage 3 до human approval этого документа

---

## 20. Decision Register

### LOCKED (окончательные решения)

| # | Решение | Обоснование |
|---|---------|------------|
| L-01 | Manrope как body шрифт | DM Sans → Manrope на Stage 2 (Кирилличный сабсет) |
| L-02 | Cormorant Garamond как display шрифт | Зафиксировано с MVP, SKILL.md |
| L-03 | Sage/olive как PRIMARY UI accent | SKILL.md, design system |
| L-04 | Plum/wine НЕ является UI accent | Stage 2.5 Brand Lock |
| L-05 | Production-сайт многостраничный | FINAL PLAN |
| L-06 | Eleventy на Stage 3+ | FINAL PLAN, закрыто |
| L-07 | Нет inline critical CSS | CSP конфликт |
| L-08 | FAQ как компонент, не отдельная страница | FINAL PLAN §7 |
| L-09 | /rezultaty/ + /otzyvy/ = одна страница | FINAL PLAN §7 |
| L-10 | /kontakty/ = контакты + форма | FINAL PLAN §7 |
| L-11 | Нет ЛК в V1 scope | DEFERRED_PRODUCT_DECISION |
| L-12 | Нет медицинских schema типов в JSON-LD | FINAL PLAN §16 |
| L-13 | prefers-reduced-motion покрывает всё | Stage 1 LOCKED |
| L-14 | body.nav-locked без inline-стилей (CSP) | Stage 1 LOCKED |
| L-15 | self-hosted шрифты (нет Google Fonts) | 152-ФЗ + performance |
| L-16 | Аналитика не подключается до Stage 10 | FINAL PLAN |
| L-17 | Cookie-баннер не нужен до аналитики | FINAL PLAN |
| L-18 | NEVER собирать медицинские данные через форму | 152-ФЗ ст. 10 |
| L-19 | Manrope — canonical body шрифт; DM Sans выведен из системы | Human approved 2026-08-29 (CONFLICT-01) |
| L-20 | Figura Lab не позиционируется как бренд исключительно для женщин; гендерно нейтральные формулировки на /metod/, /rezultaty/, /zhurnal/, /kontakty/; блок «Для кого» обязателен на каждой программе | Human approved 2026-08-29 (CONFLICT-03) |

### PROVISIONAL (приняты, могут уточняться)

| # | Решение | Что может измениться |
|---|---------|---------------------|
| P-01 | Хостинг — не выбран | Выбирается на Stage 9 |
| P-02 | Каналы связи | VERIFY_WITH_ELENA |
| P-03 | Количество и состав программ | VERIFY_WITH_ELENA |
| P-04 | Счётчики в доверительном блоке | VERIFY_WITH_ELENA |
| P-05 | Состав FAQ (8–10 вопросов) | Согласовать с Еленой |
| P-06 | Категории журнала | Согласовать с Еленой |
| P-07 | Наличие раздела команды | VERIFY_WITH_ELENA (Ирина) |
| P-08 | Media/Press блок на /elena/ | Только если реально существует |

### DEFERRED (отложены)

| # | Решение | Причина |
|---|---------|---------|
| D-01 | Личный кабинет | Backend, auth, ПДн, стоимость |
| D-02 | Bot/CRM интеграция | После выбора каналов и хостинга |
| D-03 | Аналитика (Яндекс.Метрика) | Stage 10 + cookie баннер |
| D-04 | Калькулятор | Stage 8 |
| D-05 | Хостинг и домен | Stage 9 |
| D-06 | Миграция с figura-lite.ru | После VERIFY 1, 2 |
| D-07 | HSTS | После стабильного TLS |

---

## 21. VERIFY_WITH_ELENA Tracker

| # | Что нужно | Блокирует |
|---|-----------|----------|
| V-01 | Figura Lab = ребрендинг или параллельный проект? | Домен, SEO, тексты, логотип |
| V-02 | Домен — какой становится основным? | Stage 6 (canonical), хостинг |
| V-03 | Email / телефон / Telegram / MAX / WhatsApp / VK — что публикуем | Stage 5, форма |
| V-04 | Адрес офиса — публикуем? 2Б или 2В? | /kontakty/, JSON-LD |
| ~~V-05~~ | ~~Проект работает с мужчинами?~~ | **RESOLVED** — Human approved 2026-08-29. Бренд не ограничен по полу. Гендерно нейтральные формулировки. Если конкретная программа имеет ограничения — VERIFY_WITH_ELENA отдельно по каждой программе. |
| V-06 | Цены актуальны? (28 800 / 36 800 ₽) | /programmy/ |
| V-07 | Состав тарифов — чем реально различаются? | /programmy/ |
| V-08 | Счётчики подтверждены? (20 лет / 1200 / 42 000 кг) | Hero, /elena/ |
| V-09 | Разрешения клиентов на перенос отзывов на новый домен | /rezultaty/, главная |
| V-10 | Квалификации и сертификаты — что публикуем, сканы? | /elena/ |
| V-11 | Юрлицо оператора ПДн (ИП/ООО, ИНН, реквизиты) | Stage 5 целиком |
| V-12 | Куда падают заявки с сайта? | Stage 9, endpoint формы |
| V-13 | Показывать ли команду (Ирина)? | /elena/ |
| V-14 | Финальные фото: портреты, офис, процесс | Stage 4, /elena/ |

**Критичный минимум для Stage 2 (content foundation):** V-01, V-03, V-09  
**Критичный минимум для Stage 5 (форма и legal):** V-11  
**Критичный минимум для публикации:** V-01, V-02, V-03, V-09, V-11, V-12

---

## 22. Conflicts Found

| # | Конфликт | Статус | Решение |
|---|---------|--------|---------|
| CONFLICT-01 | Шрифт тела: FINAL PLAN — DM Sans; README + код Stage 2 — Manrope | **✅ RESOLVED** Human approved 2026-08-29 | Manrope — canonical body шрифт. DM Sans выведен из системы. FINAL PLAN в части шрифтов устарел. → L-19 LOCKED |
| CONFLICT-02 | FAQ: TZ.md — отдельная страница; FINAL PLAN — компоненты на /metod/ и /programmy/ | **✅ RESOLVED** FINAL PLAN | Компонент на смысловых страницах, не отдельная /faq/. → LOCKED |
| CONFLICT-03 | Аудитория: TZ.md — открыт для всех; старый сайт — «только для женщин» | **✅ RESOLVED** Human approved 2026-08-29 | Figura Lab не позиционируется как исключительно женский бренд. Гендерно нейтральные формулировки. Блок «Для кого» обязателен на каждой программе. → L-20 LOCKED |
| CONFLICT-04 | `--c-wine` в design system: точечный акцент vs «не UI accent» | **✅ RESOLVED** Stage 2.5 Brand Lock | wine остаётся ТОЛЬКО как точечный декор (одна строка текста). Не кнопки, не ссылки, не nav. → L-04 LOCKED |

---

*Документ создан: 2026-08-29. Ветка: stage-2-5-brand-ia.*  
*Обновлён: 2026-08-29 — Human decisions внесены: CONFLICT-01 RESOLVED (Manrope), CONFLICT-03 RESOLVED (гендерно нейтральный бренд).*  
*Не commit. Не push. Ожидает финального human review.*
