# Handoff: TechCatalyst Design System → techcatalyst-lending

## Overview
Пакет для переноса дизайн-системы **TechCatalyst** в кодовую базу лендинга
(`techcatalyst-lending`). Характер системы: сдержанный enterprise + технические акценты
(mono-шрифт, blueprint-сетка, терминал, тонкие соединительные линии, спокойные reveal-анимации).
Светлая тема — основной сайт techcatalyst.ru; тёмная (navy) — продукт Guard.

## About the Design Files
Файлы в `references/` — это **дизайн-референсы в HTML** (прототипы, показывающие
внешний вид и поведение), **а не продакшн-код для копирования дословно**. Задача —
**воссоздать эти макеты в вашем стеке** (React/Vue/Next/чистый CSS…) с использованием
существующих паттернов проекта. Источник истины по стилям — файлы токенов
(`tokens.css` / `tailwind.tokens.js` / `theme.ts`), а не инлайн-стили в референсах.

## Fidelity
**High-fidelity.** Финальные цвета, типографика, отступы, радиусы, тени и состояния
заданы точно. Воссоздавайте UI пиксель-в-пиксель средствами вашего стека, беря значения
из файлов токенов.

## Как использовать из Claude Code
1. Скопируйте эту папку в репозиторий, напр. `techcatalyst-lending/design/`.
2. Выберите файл токенов под ваш стек:
   - `tokens.css` — CSS-переменные, работают где угодно (импортируйте в глобальный CSS);
   - `tailwind.tokens.js` — слейте в `theme.extend` вашего `tailwind.config.js`;
   - `theme.ts` — типизированный объект для styled-components / CSS-in-JS.
3. `primitives.css` — готовые классы-примитивы (кнопки, карточки, kicker, сетка, glow,
   reveal). Адаптируйте под компоненты, значения тянутся из `tokens.css`.
4. `reveal.js` — reveal-on-scroll на IntersectionObserver (добавляет `.is-in` элементам
   `.tc-reveal`). В React замените на свой хук/обёртку — логика та же.
5. В терминале в корне репо запустите `claude` и, например:
   > «Реализуй компоненты из `design/references/` в нашем стеке, беря токены из
   > `design/tokens.css`. HTML — референс внешнего вида, воссоздай в наших паттернах,
   > не копируй дословно.»

## Design Tokens

### Цвета
| Токен | HEX | Использование |
|---|---|---|
| brand-600 | `#2b46f0` | основной синий: кнопки, ссылки, kicker |
| brand-700 | `#1c33d4` | hover (темнее) |
| brand-100 | `#e3e9ff` | мягкая заливка |
| brand-050 | `#f2f5ff` | тонированный фон |
| ink-900 | `#0d1326` | заголовки |
| ink-700 | `#232a42` | основной текст |
| ink-500 | `#565e78` | вторичный текст / lead |
| ink-400 | `#8d93ab` | подписи, dim |
| line | `#e4e8f4` | hairline-рамки |
| line-strong | `#c9d2ea` | рамки контролов, hover карточки |
| surface | `#f6f8fc` | светлый фон секций |
| navy-950 | `#070b1d` | тёмная страница (Guard) |
| navy-900 | `#0c1228` | тёмная панель / терминал |
| navy-800 | `#141b38` | raised на тёмном |
| navy-line | `#26305c` | рамки на тёмном |
| navy-text | `#aab3d6` | текст на тёмном |
| green / green-deep | `#0aa34f` / `#087a3c` | статус ОК |
| amber | `#e07c00` | предупреждение / «Скоро» |
| danger | `#d92d47` | секреты, ошибки |

### Типографика
- **Sans:** Inter · **Mono:** JetBrains Mono / SF Mono
- **H1:** Inter 700 · clamp(36→58px) · lh 1.06 · tracking −0.035em · ink-900
- **H2:** Inter 650 · clamp(30→42px) · lh 1.15 · tracking −0.025em · ink-900
- **Kicker:** JetBrains Mono 600 · 11.5px · UPPERCASE · tracking 0.16em · brand-600 · префикс `// `
- **Lead:** Inter 400 · 17–19px · lh 1.62 · ink-500 · max-width ~740px (65–75 знаков)
- **Body:** Inter 400 · 15–16px · lh 1.6 · ink-700
- **Mono:** 13–13.5px — терминал, код, числа

### Форма (радиусы)
- Кнопки **10px** (не пилюля) · Карточки **14px** · Панели **16–18px** · Чипы **8px** · Бейджи **6px**

### Тени и фокус
- `shadow-card`: `0 1px 2px rgba(13,19,38,.04), 0 8px 24px -12px rgba(13,19,38,.10)`
- `shadow-panel`: `0 1px 2px rgba(13,19,38,.05), 0 24px 48px -20px rgba(13,19,38,.16)`
- Фокус-кольцо: `0 0 0 3px rgba(43,70,240,.28)` (контролы: `.16` альфа)

## Components (спеки)
- **Кнопка primary** — bg brand-600, radius 10px, padding 12×26px, font 600/15px, тень
  `0 8px 20px -8px rgba(43,70,240,.45)`; hover → brand-700 + `translateY(-1px)`.
- **Кнопка ghost** — белая, рамка line-strong; hover → рамка+текст brand-600.
- **Кнопка dark-ghost** (на navy) — прозрачная, рамка navy-line, текст `#e6eaff`;
  hover → рамка `#5468ff`, текст `#aab8ff`.
- **Карточка** — рамка line, radius 14px, padding 26px, shadow-card; hover → рамка
  line-strong + лёгкий подъём. Номер `01` mono ink-400; маркеры списка — квадрат 7px brand-600.
- **Чип-факт** — рамка line, radius 8px, точка-статус green 7px.
- **Бейдж** — mono uppercase, brand-050 фон, brand-600 текст (вариант amber для «Скоро»).
- **Инпут** — рамка line-strong, radius 10px, padding 11×13px; focus → рамка brand-600 +
  кольцо `rgba(43,70,240,.16)`.
- **Шапка** — high 64px, radius 12px, hairline line, фон `rgba(255,255,255,.92)` + blur;
  тёмный вариант `rgba(7,11,29,.92)`. Логотип `▲ TechCatalyst`, треугольник brand-600;
  Guard — mono-бейдж на brand-050.
- **Терминал Guard** — navy-900, рамка navy-line, radius 14px, mono 13.5px. Секрет до
  маскирования — красный (`#ff6b81` на `rgba(255,107,129,.12)`); маска — зелёная
  (`#34d399` на `rgba(52,211,153,.12)`); статусная строка `▲ guard` — индиго `#7c8cff`;
  курсор — мигание `blink 1s steps(1) infinite`.

## Формы, линии и анимации (ключевой приём)
- **Blueprint-сетка** (`.tc-grid-bg`): две linear-gradient линии, `background-size:44px 44px`,
  цвет `rgba(13,19,38,.045)` на светлом / `rgba(124,140,255,.07)` на тёмном. Обязательно
  под radial-маской у угла: `mask:radial-gradient(680px 420px at 80% -10%,#000 25%,transparent 70%)`.
- **Радиальный glow** (`.tc-glow`): `radial-gradient(720px 420px at 85% -14%, rgba(43,70,240,.09), transparent 62%)`;
  тёмный — `rgba(84,104,255,.22)`.
- **Hairline-линии** — соединительные линии 1px цветом line/navy-line.
- **Reveal-on-scroll** (`.tc-reveal` + `reveal.js`): старт `opacity:0; translateY(16px)`,
  переход `.6s cubic-bezier(.2,.7,.2,1)`, при входе в вьюпорт добавляется `.is-in`.
  Ступенчатая задержка через `data-delay="1|2|3"`. Уважает `prefers-reduced-motion`.

## Files
- `tokens.css` — CSS-переменные (универсально)
- `tailwind.tokens.js` — токены для `theme.extend` Tailwind
- `theme.ts` — типизированный объект токенов (CSS-in-JS)
- `primitives.css` — готовые классы-примитивы (`.tc-*`)
- `reveal.js` — reveal-on-scroll (IntersectionObserver)
- `references/` — HTML-референсы: `colors`, `typography`, `buttons`, `cards`, `forms`,
  `header`, `terminal`, `hero-light`, `hero-dark`

## Assets
Внешних изображений/иконок нет — вся графика на CSS (сетка, glow, линии). Иконки-стрелки —
текстовые (`→`). Шрифты: подключите Inter и JetBrains Mono (Google Fonts или self-host).
