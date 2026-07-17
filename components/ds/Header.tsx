import Link from "next/link";
import type { ReactNode } from "react";

export interface HeaderNavItem {
  href: string;
  label: string;
  active?: boolean;
}

/**
 * Floating header card (design/references/header.html): 64px, radius 12px, hairline
 * border, translucent surface with blur. `product` renders the mono badge after the
 * logo («Guard»). Dark variant serves Guard pages.
 */
export function Header({
  nav,
  cta,
  product,
  dark = false,
  className = "",
}: {
  nav: HeaderNavItem[];
  cta: { href: string; label: string };
  product?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const link = (item: HeaderNavItem) => {
    const cls = item.active
      ? "text-[14px] font-semibold text-blue"
      : `text-[14px] font-medium transition-colors ${
          dark ? "text-navy-text hover:text-[#aab8ff]" : "text-muted hover:text-blue"
        }`;
    return item.href.startsWith("/") ? (
      <Link key={item.href + item.label} href={item.href} className={cls}>
        {item.label}
      </Link>
    ) : (
      <a key={item.href + item.label} href={item.href} className={cls}>
        {item.label}
      </a>
    );
  };

  return (
    <header
      className={`flex min-h-16 items-center gap-[26px] rounded-xl border px-6 backdrop-blur-md ${
        dark ? "border-navy-line bg-[rgba(7,11,29,.92)]" : "border-line bg-white/[.92]"
      } ${className}`}
    >
      <Link
        href="/"
        className={`flex shrink-0 items-center gap-2 text-[17px] font-bold tracking-[-0.01em] ${
          dark ? "text-white" : "text-heading"
        }`}
      >
        <span className="text-blue">▲</span>
        <span>TechCatalyst</span>
        {product && (
          <em
            className={`ml-1 rounded-[5px] px-[7px] py-0.5 font-mono text-[12px] font-semibold not-italic ${
              dark ? "bg-[rgba(84,104,255,.16)] text-[#aab8ff]" : "bg-blue-tint text-blue"
            }`}
          >
            {product}
          </em>
        )}
      </Link>
      <nav className="ml-auto hidden items-center gap-5 md:flex">{nav.map(link)}</nav>
      <a
        href={cta.href}
        className="inline-flex shrink-0 items-center rounded-btn bg-blue px-[18px] py-[9px] text-[14px] font-semibold text-white transition hover:bg-blue-bright"
      >
        {cta.label}
      </a>
    </header>
  );
}
