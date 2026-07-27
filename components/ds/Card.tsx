import type { ReactNode } from "react";

/** Card: hairline border, radius 14px, lift on hover. `num` prints the mono index («01»). */
export function Card({
  num,
  children,
  className = "",
}: {
  num?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-white p-[26px] shadow-card transition-[border-color,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-line-strong ${className}`}
    >
      {num && <div className="mb-3 font-mono text-[13px] text-dim">{num}</div>}
      {children}
    </div>
  );
}

/** List with the DS square markers (7px, brand blue). */
export function SquareList({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-2.5 text-[14.5px] leading-[1.55] text-muted ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span aria-hidden className="mt-[7px] h-[7px] w-[7px] shrink-0 bg-blue" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
