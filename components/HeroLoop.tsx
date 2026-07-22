'use client';

import { useEffect, useRef } from 'react';

/**
 * Ambient hero loop (docs/design_handoff_hero_loop): a 10s cycle — Scan (4s)
 * then Signal (6s) — driven by a single rAF clock keyed off `performance.now()`,
 * so the two pieces below stay in sync without sharing any state. Every
 * animated value is 0 outside its own phase, so the settled composition is
 * the shared frame at the loop seam (no crossfade needed). Values are written
 * straight to refs to keep this at 60fps without re-rendering React.
 */
const SCAN_DUR = 4;
const SIGNAL_DUR = 6;
const TOTAL = SCAN_DUR + SIGNAL_DUR;

const NODE_H = 82;
const NODE_GAP = 26;
const SPINE_TOP = NODE_H / 2; // 41 — first node's vertical center
const SPINE_LEN = NODE_H * 2 + NODE_GAP * 2; // 216 — distance between first and last node centers

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scan phase: a light strip sweeps left→right, briefly glowing the background grid brand-blue. */
export function HeroScanOverlay() {
  const gridRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const tick = (now: number) => {
      const t = (now / 1000) % TOTAL;
      let scanOp = 0;
      let scanFrac = -1;
      if (t < SCAN_DUR) {
        const progress = t / SCAN_DUR;
        scanFrac = lerp(-0.12, 1.12, smoothstep(0.1, 0.9, progress));
        scanOp = Math.min(smoothstep(0.06, 0.16, progress), 1 - smoothstep(0.84, 0.96, progress));
      }
      const pct = scanFrac * 100;
      if (gridRef.current) {
        gridRef.current.style.opacity = String(scanOp);
        const mask = `linear-gradient(90deg, transparent calc(${pct}% - 150px), #000 ${pct}%, transparent calc(${pct}% + 150px))`;
        gridRef.current.style.maskImage = mask;
        gridRef.current.style.webkitMaskImage = mask;
      }
      if (stripRef.current) {
        stripRef.current.style.opacity = String(scanOp);
        stripRef.current.style.left = `calc(${pct}% - 170px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(43,70,240,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(43,70,240,.5) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div
        ref={stripRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[340px] opacity-0"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(43,70,240,.05) 42%, rgba(43,70,240,.11) 50%, rgba(43,70,240,.05) 58%, transparent)',
        }}
      />
    </>
  );
}

const NODES = [
  { title: 'Поставка ПО', sub: 'лицензии · договор' },
  { title: 'Интеграция ИИ', sub: 'модели · API · контур' },
  { title: 'Guard · Защита', sub: 'рабочие места DEV' },
];

/** Signal phase: a pulse travels down the spine, charging it blue and lighting each node green in sequence. */
export function ContourPanel() {
  const chargeRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const statusRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const tick = (now: number) => {
      const t = (now / 1000) % TOTAL;
      let travel = 0;
      let pulseOp = 0;
      let lit = [0, 0, 0];
      if (t >= SCAN_DUR) {
        const progress = (t - SCAN_DUR) / SIGNAL_DUR;
        travel = smoothstep(0.12, 0.8, progress);
        pulseOp = Math.min(smoothstep(0.05, 0.13, progress), 1 - smoothstep(0.8, 0.9, progress));
        const fade = 1 - smoothstep(0.86, 1.0, progress);
        lit = [0, 0.5, 1].map((center) => Math.max(0, Math.min(1, (travel - center) / 0.07)) * fade);
      }
      if (chargeRef.current) {
        chargeRef.current.style.height = `${travel * SPINE_LEN}px`;
        chargeRef.current.style.opacity = String(pulseOp);
      }
      if (pulseRef.current) {
        pulseRef.current.style.top = `${travel * SPINE_LEN}px`;
        pulseRef.current.style.opacity = String(pulseOp);
      }
      lit.forEach((amt, i) => {
        if (cardRefs.current[i]) cardRefs.current[i]!.style.opacity = String(amt);
        if (dotRefs.current[i]) dotRefs.current[i]!.style.opacity = String(amt);
        if (statusRefs.current[i]) statusRefs.current[i]!.style.opacity = String(amt);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="overflow-visible rounded-[16px] border border-[#e4e8f4] bg-white p-6 shadow-[0_12px_32px_-4px_rgba(13,19,38,.14)] sm:p-7">
      <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[1.8px] text-[#2b46f0] before:mr-2 before:content-['//']">
        Технологический контур
      </div>
      <div className="mt-4 h-px bg-[#e4e8f4]" />

      <div className="relative mt-7 flex flex-col gap-[26px] pl-[28px]">
        <div
          className="absolute left-[14px] -translate-x-1/2 bg-[#c9d2ea]"
          style={{ top: SPINE_TOP, height: SPINE_LEN, width: 2 }}
        >
          <div ref={chargeRef} aria-hidden className="absolute inset-x-0 top-0 w-full bg-[#2b46f0] opacity-0" style={{ height: 0 }} />
          <div
            ref={pulseRef}
            aria-hidden
            className="absolute left-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b46f0] opacity-0 shadow-[0_0_16px_4px_rgba(43,70,240,.55)]"
            style={{ top: 0 }}
          />
        </div>

        {NODES.map((node, i) => (
          <div key={node.title} className="relative flex h-[82px] items-center gap-3 rounded-xl border border-[#e4e8f4] bg-white px-4">
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl border border-[#2b46f0] bg-[#f2f5ff] opacity-0"
            />
            <span aria-hidden className="absolute left-[-14px] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 rounded-full border-2 border-[#c9d2ea] bg-white" />
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="absolute inset-0 rounded-full border-2 border-[#2b46f0] bg-[#2b46f0] opacity-0"
              />
            </span>
            <span className="relative h-[10px] w-[10px] shrink-0">
              <span aria-hidden className="absolute inset-0 rounded-full bg-[#c9d2ea]" />
              <span
                ref={(el) => {
                  statusRefs.current[i] = el;
                }}
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#0aa34f] opacity-0"
              />
            </span>
            <div className="relative">
              <div className="text-[16px] font-semibold text-[#0d1326]">{node.title}</div>
              <div className="mt-0.5 font-mono text-[11.5px] text-[#565e78]">{node.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
