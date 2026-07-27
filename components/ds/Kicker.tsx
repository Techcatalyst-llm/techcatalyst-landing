import type { ReactNode } from "react";

/** Mono label with the «// » prefix — opens every section (design/references/typography.html). */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-mono text-[11.5px] font-semibold uppercase tracking-kicker text-blue before:content-['//_'] ${className}`}
    >
      {children}
    </p>
  );
}
