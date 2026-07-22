# Handoff: TechCatalyst Hero Landing Loop

## Overview
An ambient, seamlessly-looping hero animation for the TechCatalyst landing page
(`techcatalyst.ru`, light theme). It presents the settled hero composition
(logo, kicker, H1, lead, CTAs, status chips + a right-hand "технологический
контур" diagram) and layers two continuous motions on top:

1. **Scan** — a vertical light strip sweeps left→right across the hero, glowing
   the background grid brand-blue in its wake (a "reading the interface" beat).
2. **Signal** — a glowing pulse travels down the diagram's spine, charging it
   blue and lighting each node's status dot green in sequence
   (Поставка ПО → Интеграция ИИ → Guard·Защита).

Total cycle ≈ **10s** (Scan 4s + Signal 6s), then loops. It is designed as a
**seamless loop**: the first and last rendered frame of the whole sequence are
the identical settled composition, so there is no visible pop at the wrap.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working
prototype showing the intended look and motion, **not production code to copy
directly**. The task is to **recreate this hero animation inside the
`techcatalyst_landing` codebase** using its existing environment (framework,
styling approach, motion library) and patterns.

The prototype was built on a heavyweight timeline/export engine
(`animations-v2.jsx`) so it could be scrubbed and exported as video. **Do not
port that engine into the landing page.** For a hero loop you only need a simple
continuous clock (a `requestAnimationFrame` loop, CSS keyframes, or a motion
library like Framer Motion / GSAP). All the choreography is driven by a single
`progress` value per phase — trivial to reproduce. See "Interactions & Behavior".

## Fidelity
**High-fidelity (hifi).** Exact colors, typography, spacing, and motion timing
are specified below and should be reproduced faithfully. All values come from
the bound TechCatalyst design system — prefer the codebase's existing design
tokens where they already exist rather than hardcoding these hex values again.

## Canvas
- Design size: **1280 × 720** (16:9). Scale to fit its container; keep aspect.
- Background behind the canvas in the prototype is `#eef1f7`; the hero itself
  fills the frame with `#fff`.

## Screens / Views

### Hero (single view, two motion phases)
- **Purpose:** Landing hero — brand statement + product-line overview with an
  always-on ambient loop that signals "engineering / technical".
- **Layout:** Absolute-positioned composition on a 1280×720 stage.
  - **Logo mark** — top-left, `left: 80, top: 56`. Row, gap 9px: a brand-blue
    `▲` (15px) + `TechCatalyst` (18px / 700 / letter-spacing -0.02em / ink-900).
  - **Content column** — `left: 80, top: 132, width: 600`, vertical flex.
    - **Kicker** — mono, 12px / 600 / uppercase / letter-spacing ~2.1px /
      brand-600, text `// Продуктовая линейка TechCatalyst`, followed by a
      solid 9×15px brand-600 **caret** block that blinks (see below).
    - **H1** — `margin-top: 20px`, 45px / 700 / line-height 1.08 /
      letter-spacing -0.035em / ink-900, `text-wrap: balance`.
      Text: `Технологический контур для зарубежного ПО и ИИ`.
    - **Lead** — `margin-top: 22px`, 17.5px / 1.62 / ink-500, `max-width: 540`.
      Text: `Лицензии, интеграция ИИ и защита рабочих мест разработчиков. Один
      подрядчик — от коммерческой схемы до работающего контура.`
    - **Buttons** — `margin-top: 30px`, row gap 12px:
      - Primary: `Обсудить задачу →` — bg brand-600, #fff, radius 10px,
        padding 13/26px, 15px/600, shadow `0 8px 20px -8px rgba(43,70,240,.45)`.
        Hover: bg brand-700 + translateY(-1px).
      - Secondary: `Смотреть продукты` — bg #fff, 1px border line-strong,
        ink-700, same radius/padding/weight. Hover: border+text brand-600.
    - **Chips** — `margin-top: 28px`, wrapping row gap 10px. Each: inline-flex,
      gap 8px, 1px border line, bg #fff, radius 8px, padding 8/13px, 13.5px/500,
      ink-500, with a 7px green status dot. Text: `ИП · договор и документы`,
      `Корпоративная поставка`, `Инженерное внедрение`.
  - **Contour panel** — `left: 748, top: 120, width: 412, height: 480`. A white
    card, radius 16px, 1px border line, shadow
    `0 12px 32px -0 rgba(13,19,38,.10)` (drop-shadow dy 12, blur 16).
    - Panel kicker (mono, brand-600, 11.5px/600, letter-spacing ~1.8px):
      `// ТЕХНОЛОГИЧЕСКИЙ КОНТУР`, with a hairline (line) divider under it.
    - A vertical **spine** (2px, line-strong) on the left connecting three
      node dots. Node cards laid out top-to-bottom: card height 82px, gap 26px,
      first card top at 96px within the panel; card x from 66, width 322.
    - **Node dots** sit on the spine at each card's vertical center (r 6).
    - Each **node card**: white, radius 12px, 1px border line; a 5px status dot
      at left; title 16px/600 ink-900; sub-label mono 11.5px ink-500.
      Nodes: `Поставка ПО / лицензии · договор`,
      `Интеграция ИИ / модели · API · контур`,
      `Guard · Защита / рабочие места DEV`.

## Interactions & Behavior
All motion is a function of a per-phase `progress` (0→1). Recreate with any
clock. Use a small `smoothstep(edge0, edge1, x)` easing everywhere below.

**Caret blink (both phases):** on for `floor(localTimeSeconds) % 2 === 0`, else
off (1s square blink). Phase durations are even integers so the caret is ON at
every phase boundary — keeps the loop seam clean.

**Scan phase (4s):**
- `scanFrac = lerp(-0.12, 1.12, smoothstep(0.10, 0.90, progress))` — fraction of
  stage width (×1280 → px) for the strip's center X.
- `scanOp = min(smoothstep(0.06,0.16,progress), 1 - smoothstep(0.84,0.96,progress))`
  → 0 at both ends of the phase.
- Two overlaid full-stage layers at `opacity: scanOp`, following `scanX`:
  1. A brand-tinted **grid** (44px grid, lines `rgba(43,70,240,.5)`) masked to a
     horizontal band: `linear-gradient(90deg, transparent scanX-150px, #000
     scanX, transparent scanX+150px)`.
  2. A **soft light strip**, 340px wide centered on scanX:
     `linear-gradient(90deg, transparent, rgba(43,70,240,.05) 42%,
     rgba(43,70,240,.11) 50%, rgba(43,70,240,.05) 58%, transparent)`.

**Signal phase (6s):**
- `travel = smoothstep(0.12, 0.80, progress)` — 0→1 position of the pulse down
  the spine (interpolate spine top→bottom Y).
- `pulseOp = min(smoothstep(0.05,0.13,progress), 1 - smoothstep(0.80,0.90,progress))`.
- Charged spine = the spine drawn brand-600 from top down to the pulse Y, at
  `pulseOp`.
- Pulse = a brand-600 circle (r 6.5) at the pulse Y with a soft blur glow, at
  `pulseOp`.
- Node lighting: node centers are at spine fractions `[0, 0.5, 1]`. For node i,
  `litRaw = clamp((travel - center[i]) / 0.07, 0, 1)`; then a global
  `fade = 1 - smoothstep(0.86, 1.0, progress)` brings all nodes back to 0 before
  the phase ends. `lit[i] = litRaw * fade`.
- A "lit" node crossfades (by `lit[i]`) to: card fill brand-050, border
  brand-600, spine dot fill brand-600, status dot green (`#0aa34f`). Interpolate
  the spine/status dot colors from their base to lit with `lit[i]`.

**Background (static, both phases):**
- Radial blue glow, top-right: `radial-gradient(760px 460px at 90% -14%,
  rgba(43,70,240,.10), transparent 62%)`.
- Base grid: 44px, lines `rgba(13,19,38,.05)`, masked with
  `radial-gradient(760px 460px at 86% -8%, #000 30%, transparent 74%)`.

**Loop / seam:** play the two phases in order, then loop. Because every phase's
overlay opacities are 0 at `progress` 0 and 1, the settled composition is the
shared frame at both seams — no crossfade needed. Respect
`prefers-reduced-motion`: render the settled frame with motion paused.

## Design Tokens (TechCatalyst)
- brand-600 `#2b46f0` · brand-700 `#1c33d4` · brand-100 `#e3e9ff` ·
  brand-050 `#f2f5ff`
- ink-900 `#0d1326` · ink-700 `#232a42` · ink-500 `#565e78` · ink-400 `#8d93ab`
- line `#e4e8f4` · line-strong `#c9d2ea` · surface `#f6f8fc`
- green `#0aa34f`
- Radii: buttons 10px · cards 12–14px · panel 16px · chips 8px
- Card shadow: `0 1px 2px rgba(13,19,38,.04), 0 8px 24px -12px rgba(13,19,38,.10)`
- Type: sans **Inter** (400/500/600/700); mono **JetBrains Mono** (500/600)

## Assets
None. The logo mark is a Unicode `▲` + text. Grid, glow, spine, pulse, and nodes
are all CSS/SVG — no image files. Fonts: Inter + JetBrains Mono (Google Fonts in
the prototype; use the codebase's existing font loading).

## Files (in this bundle)
- `TechCatalyst Hero Loop.dc.html` — the prototype entry (composition + helmet).
- `tech-hero.jsx` — all the composition + motion logic (`HeroStage`,
  `ContourPanel`, `Scan`, `Signal`). **This is the file to read for exact
  motion.** Ignore the `SceneStage`/`OM_SCENES` plumbing — that's just the
  prototype's scrub/export harness.
- `animations-v2.jsx` — the prototype's timeline/export engine. **Reference
  only; do not port.**
