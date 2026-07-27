"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal-on-scroll (design/reveal.js ported to React): starts hidden and shifted 16px down,
 * gets `.is-in` when it enters the viewport. Styles live in globals.css (`.tc-reveal`);
 * `prefers-reduced-motion` is respected there. `delay` steps the transition 80/160/240ms.
 */
export function Reveal({
  children,
  delay,
  className = "",
}: {
  children: ReactNode;
  delay?: 1 | 2 | 3;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-delay={delay} className={`tc-reveal ${className}`}>
      {children}
    </div>
  );
}
