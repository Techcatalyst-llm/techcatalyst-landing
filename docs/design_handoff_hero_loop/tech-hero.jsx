/* TechCatalyst — animated hero landing loop (light theme).
   Persistent stage = the settled hero composition (identical every scene).
   Two scenes add ambient motion on top; both start AND end on the settled
   frame, so the loop seam is seamless. */

const C = {
  brand600: '#2b46f0', brand700: '#1c33d4', brand100: '#e3e9ff', brand050: '#f2f5ff',
  ink900: '#0d1326', ink700: '#232a42', ink500: '#565e78', ink400: '#8d93ab',
  line: '#e4e8f4', lineStrong: '#c9d2ea', surface: '#f6f8fc', green: '#0aa34f',
};
const SANS = 'Inter, "Segoe UI", Arial, sans-serif';
const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

const smooth = (a, b, t) => {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;
// simple hex lerp
function mix(h1, h2, t) {
  const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const a = p(h1), b = p(h2);
  const c = a.map((v, i) => Math.round(lerp(v, b[i], t)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// ---- Right-side contour panel (SVG) --------------------------------------
const PANEL = { w: 412, h: 480 };
const NODE = { x: 66, w: 322, h: 82, cx: 42, top: 96, gap: 26 };
const nodeY = i => NODE.top + i * (NODE.h + NODE.gap);       // top of card i
const dotY = i => nodeY(i) + NODE.h / 2;                     // spine dot center
const SPINE_TOP = dotY(0), SPINE_BOT = dotY(2);

const NODES = [
  { t: 'Поставка ПО', s: 'лицензии · договор' },
  { t: 'Интеграция ИИ', s: 'модели · API · контур' },
  { t: 'Guard · Защита', s: 'рабочие места DEV' },
];

function ContourPanel({ lit, pulseFrac, pulseOp }) {
  const chargeY = lerp(SPINE_TOP, SPINE_BOT, Math.max(0, Math.min(1, pulseFrac)));
  const pulseY = chargeY;
  return React.createElement('div', {
    style: {
      position: 'absolute', left: 748, top: 120, width: PANEL.w, height: PANEL.h,
    },
  },
    React.createElement('svg', { width: PANEL.w, height: PANEL.h, viewBox: `0 0 ${PANEL.w} ${PANEL.h}`, style: { overflow: 'visible' } },
      React.createElement('defs', null,
        React.createElement('filter', { id: 'panelShadow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
          React.createElement('feDropShadow', { dx: 0, dy: 12, stdDeviation: 16, floodColor: C.ink900, floodOpacity: 0.10 })),
        React.createElement('filter', { id: 'pulseGlow', x: '-200%', y: '-200%', width: '500%', height: '500%' },
          React.createElement('feGaussianBlur', { stdDeviation: 5, result: 'b' }),
          React.createElement('feMerge', null, React.createElement('feMergeNode', { in: 'b' }), React.createElement('feMergeNode', { in: 'SourceGraphic' })))),
      // card
      React.createElement('rect', { x: 0.5, y: 0.5, width: PANEL.w - 1, height: PANEL.h - 1, rx: 16, fill: '#fff', stroke: C.line, filter: 'url(#panelShadow)' }),
      // panel kicker
      React.createElement('text', { x: 28, y: 46, fill: C.brand600, fontFamily: MONO, fontSize: 11.5, fontWeight: 600, letterSpacing: 1.8 }, '// ТЕХНОЛОГИЧЕСКИЙ КОНТУР'),
      React.createElement('line', { x1: 28, y1: 62, x2: PANEL.w - 28, y2: 62, stroke: C.line }),
      // spine base + charged overlay
      React.createElement('line', { x1: NODE.cx, y1: SPINE_TOP, x2: NODE.cx, y2: SPINE_BOT, stroke: C.lineStrong, strokeWidth: 2 }),
      React.createElement('line', { x1: NODE.cx, y1: SPINE_TOP, x2: NODE.cx, y2: chargeY, stroke: C.brand600, strokeWidth: 2, opacity: pulseOp }),
      // nodes
      ...NODES.map((n, i) => {
        const y = nodeY(i), amt = lit[i];
        return React.createElement('g', { key: i },
          // base card
          React.createElement('rect', { x: NODE.x, y, width: NODE.w, height: NODE.h, rx: 12, fill: '#fff', stroke: C.line }),
          // lit overlay (crossfade)
          React.createElement('rect', { x: NODE.x, y, width: NODE.w, height: NODE.h, rx: 12, fill: C.brand050, stroke: C.brand600, opacity: amt }),
          // spine dot
          React.createElement('circle', { cx: NODE.cx, cy: dotY(i), r: 6, fill: mix('#fff', C.brand600, amt), stroke: mix(C.lineStrong, C.brand600, amt), strokeWidth: 2 }),
          // status pill dot
          React.createElement('circle', { cx: NODE.x + 22, cy: y + NODE.h / 2, r: 5, fill: mix(C.lineStrong, C.green, amt) }),
          React.createElement('text', { x: NODE.x + 40, y: y + 33, fill: C.ink900, fontFamily: SANS, fontSize: 16, fontWeight: 600 }, n.t),
          React.createElement('text', { x: NODE.x + 40, y: y + 55, fill: C.ink500, fontFamily: MONO, fontSize: 11.5, letterSpacing: 0.3 }, n.s));
      }),
      // traveling pulse dot
      React.createElement('circle', { cx: NODE.cx, cy: pulseY, r: 6.5, fill: C.brand600, opacity: pulseOp, filter: 'url(#pulseGlow)' }),
    ),
  );
}

// ---- Persistent settled hero stage ---------------------------------------
function HeroStage({ caretOn = true, lit = [0, 0, 0], pulseFrac = 0, pulseOp = 0, scanFrac = -1, scanOp = 0 }) {
  const gridImg = 'linear-gradient(rgba(13,19,38,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(13,19,38,.05) 1px,transparent 1px)';
  const gridImgBrand = 'linear-gradient(rgba(43,70,240,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(43,70,240,.5) 1px,transparent 1px)';
  const scanPx = scanFrac * 1280;
  const chip = t => React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${C.line}`,
      background: '#fff', borderRadius: 8, padding: '8px 13px', fontSize: 13.5, fontWeight: 500, color: C.ink500, fontFamily: SANS,
    },
  }, React.createElement('i', { style: { width: 7, height: 7, borderRadius: '50%', background: C.green, display: 'block' } }), t);

  return React.createElement('div', {
    style: {
      position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden', fontFamily: SANS,
    },
  },
    // blue glow top-right
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(760px 460px at 90% -14%, rgba(43,70,240,.10), transparent 62%)' } }),
    // base grid
    React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, backgroundImage: gridImg, backgroundSize: '44px 44px',
        WebkitMaskImage: 'radial-gradient(760px 460px at 86% -8%, #000 30%, transparent 74%)',
        maskImage: 'radial-gradient(760px 460px at 86% -8%, #000 30%, transparent 74%)',
      },
    }),
    // scan: brand-tinted grid glow following the sweep
    scanFrac >= 0 && React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, backgroundImage: gridImgBrand, backgroundSize: '44px 44px', opacity: scanOp,
        WebkitMaskImage: `linear-gradient(90deg, transparent ${scanPx - 150}px, #000 ${scanPx}px, transparent ${scanPx + 150}px)`,
        maskImage: `linear-gradient(90deg, transparent ${scanPx - 150}px, #000 ${scanPx}px, transparent ${scanPx + 150}px)`,
      },
    }),
    // scan: soft light strip
    scanFrac >= 0 && React.createElement('div', {
      style: {
        position: 'absolute', top: 0, bottom: 0, left: scanPx - 170, width: 340, opacity: scanOp,
        background: 'linear-gradient(90deg, transparent, rgba(43,70,240,.05) 42%, rgba(43,70,240,.11) 50%, rgba(43,70,240,.05) 58%, transparent)',
      },
    }),
    // content column
    React.createElement('div', { style: { position: 'absolute', left: 80, top: 132, width: 600, display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 2, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: 2.1, textTransform: 'uppercase', color: C.brand600 } },
        '// Продуктовая линейка TechCatalyst',
        React.createElement('span', { style: { display: 'inline-block', width: 9, height: 15, marginLeft: 4, background: C.brand600, opacity: caretOn ? 1 : 0 } })),
      React.createElement('h1', { style: { margin: '20px 0 0', fontSize: 45, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.035em', color: C.ink900, textWrap: 'balance' } },
        'Технологический контур для зарубежного ПО и ИИ'),
      React.createElement('p', { style: { margin: '22px 0 0', fontSize: 17.5, lineHeight: 1.62, color: C.ink500, maxWidth: 540 } },
        'Лицензии, интеграция ИИ и защита рабочих мест разработчиков. Один подрядчик — от коммерческой схемы до работающего контура.'),
      React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 30 } },
        React.createElement('a', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 10, padding: '13px 26px', fontSize: 15, fontWeight: 600, color: '#fff', background: C.brand600, boxShadow: '0 8px 20px -8px rgba(43,70,240,.45)', textDecoration: 'none' } }, 'Обсудить задачу →'),
        React.createElement('a', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 10, padding: '13px 26px', fontSize: 15, fontWeight: 600, color: C.ink700, background: '#fff', border: `1px solid ${C.lineStrong}`, textDecoration: 'none' } }, 'Смотреть продукты')),
      React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' } },
        chip('ИП · договор и документы'), chip('Корпоративная поставка'), chip('Инженерное внедрение'))),
    // logo mark top-left
    React.createElement('div', { style: { position: 'absolute', left: 80, top: 56, display: 'flex', alignItems: 'center', gap: 9, fontSize: 18, fontWeight: 700, color: C.ink900, letterSpacing: '-0.02em' } },
      React.createElement('span', { style: { color: C.brand600, fontSize: 15 } }, '▲'), 'TechCatalyst'),
    React.createElement(ContourPanel, { lit, pulseFrac, pulseOp }),
  );
}

// ---- Scenes ---------------------------------------------------------------
function caretPhase(localTime) { return Math.floor(localTime) % 2 === 0; }

function Scan({ progress, localTime }) {
  const scanFrac = lerp(-0.12, 1.12, smooth(0.10, 0.90, progress));
  const scanOp = Math.min(smooth(0.06, 0.16, progress), 1 - smooth(0.84, 0.96, progress));
  return React.createElement(HeroStage, { caretOn: caretPhase(localTime), scanFrac, scanOp });
}

function Signal({ progress, localTime }) {
  const travel = smooth(0.12, 0.80, progress);
  const pulseOp = Math.min(smooth(0.05, 0.13, progress), 1 - smooth(0.80, 0.90, progress));
  const centers = [0, 0.5, 1];
  const fade = 1 - smooth(0.86, 1.0, progress);
  const lit = centers.map(cf => Math.max(0, Math.min(1, (travel - cf) / 0.07)) * fade);
  return React.createElement(HeroStage, { caretOn: caretPhase(localTime), lit, pulseFrac: travel, pulseOp });
}

// ---- Root -----------------------------------------------------------------
function TechHeroLoop() {
  return React.createElement(SceneStage, {
    width: 1280, height: 720, bg: '#ffffff',
    scenes: window.OM_SCENES, playback: window.OM_PLAYBACK, transition: 'cut',
  }, { Scan, Signal });
}
window.TechHeroLoop = TechHeroLoop;
