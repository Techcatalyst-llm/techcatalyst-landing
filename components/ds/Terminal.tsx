import type { ReactNode } from "react";

/**
 * Guard terminal (design/references/terminal.html): navy-900 surface, traffic-light bar,
 * mono 13.5px. Compose lines from the Term* parts below; secrets are red until masked,
 * masks are green, the status line and caret are brand indigo.
 */
export function Terminal({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-navy-line bg-navy-900 font-mono text-[13.5px] leading-[1.75] shadow-panel ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-navy-line bg-navy-950 px-4 py-3">
        <i aria-hidden className="h-[11px] w-[11px] rounded-full bg-[#f1645a]" />
        <i aria-hidden className="h-[11px] w-[11px] rounded-full bg-[#f5b73d]" />
        <i aria-hidden className="h-[11px] w-[11px] rounded-full bg-[#35c84a]" />
        {title && <span className="ml-2 font-sans text-[12px] text-[#6a74a3]">{title}</span>}
      </div>
      <div className="break-all p-[18px] text-navy-text">{children}</div>
    </div>
  );
}

/** Shell prompt (`~/service $`). */
export function TermPrompt({ children }: { children: ReactNode }) {
  return <span className="text-[#7c8cff]">{children}</span>;
}

/** Typed command. */
export function TermCmd({ children }: { children: ReactNode }) {
  return <span className="font-medium text-[#e8ecff]">{children}</span>;
}

/** Command output. */
export function TermOut({ children }: { children: ReactNode }) {
  return <span className="text-[#8b94c0]">{children}</span>;
}

/** Secret before masking — red highlight. */
export function TermSecret({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-[rgba(255,107,129,.12)] px-[3px] text-[#ff6b81]">{children}</span>
  );
}

/** Masked value — green highlight. */
export function TermMask({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-[rgba(52,211,153,.12)] px-[3px] text-[#34d399]">{children}</span>
  );
}

/** Guard status line («▲ guard: …»). */
export function TermStatus({ children }: { children: ReactNode }) {
  return <div className="text-[#7c8cff]">{children}</div>;
}

/** Blinking caret. */
export function TermCaret() {
  return (
    <span
      aria-hidden
      className="inline-block h-[15px] w-2 translate-y-[2px] animate-caret bg-[#7c8cff]"
    />
  );
}
