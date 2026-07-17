import type { ReactNode } from "react";

/** Fact chip with a status dot. `dark` matches the Guard hero surface. */
export function Chip({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-chip border px-[13px] py-[7px] text-[13px] font-medium ${
        dark
          ? "border-navy-line bg-[rgba(20,27,56,.6)] text-navy-text"
          : "border-line bg-white text-muted"
      } ${className}`}
    >
      <i
        aria-hidden
        className={`h-[7px] w-[7px] rounded-full ${dark ? "bg-[#22c55e]" : "bg-green"}`}
      />
      {children}
    </span>
  );
}
