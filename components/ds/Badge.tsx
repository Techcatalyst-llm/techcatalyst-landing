import type { ReactNode } from "react";

const variants = {
  brand: "bg-blue-tint text-blue",
  amber: "bg-[rgba(224,124,0,.08)] text-amber",
} as const;

/** Mono uppercase badge; amber variant marks «Скоро». */
export function Badge({
  children,
  variant = "brand",
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-badge px-2.5 py-[5px] font-mono text-[11px] font-semibold uppercase leading-none tracking-[.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
