/** Blueprint grid backdrop, radially masked toward the top-right corner. */
export function GridBg({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${dark ? "bg-grid-dark" : "bg-grid-light"}`}
    />
  );
}

/** Radial brand glow for hero corners. */
export function Glow({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${dark ? "bg-glow-dark" : "bg-glow-light"}`}
    />
  );
}

/** 1px connector line. */
export function Hairline({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return <hr className={`h-px border-0 ${dark ? "bg-navy-line" : "bg-line"} ${className}`} />;
}
