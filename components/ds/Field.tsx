import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlBase =
  "mt-1.5 block w-full rounded-btn border border-line-strong bg-white px-[13px] py-[11px] text-[15px] text-heading outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-dim focus:border-blue focus:shadow-[0_0_0_3px_rgba(43,70,240,.16)]";

export function Field({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block text-[13px] font-semibold text-ink ${className}`}>
      {label}
      <input className={controlBase} {...props} />
    </label>
  );
}

export function TextareaField({
  label,
  className = "",
  rows = 3,
  ...props
}: { label: string; className?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={`block text-[13px] font-semibold text-ink ${className}`}>
      {label}
      <textarea rows={rows} className={`${controlBase} resize-y`} {...props} />
    </label>
  );
}
