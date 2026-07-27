import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "darkGhost";
type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn border font-semibold leading-none no-underline transition-all duration-[180ms]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-blue text-white shadow-cta hover:-translate-y-px hover:bg-blue-bright",
  ghost: "border-line-strong bg-white text-ink hover:border-blue hover:text-blue",
  // hover accents from the dark hero reference; not part of the token set
  darkGhost:
    "border-navy-line bg-transparent text-[#e6eaff] hover:border-[#5468ff] hover:text-[#aab8ff]",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-[26px] py-3 text-[15px]",
  sm: "px-[18px] py-[9px] text-[14px]",
};

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return href.startsWith("/") ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
