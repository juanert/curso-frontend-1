import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón. */
  variant?: Variant;
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400",
  ghost:
    "border border-black/15 text-foreground hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
  danger:
    "bg-red-600/10 text-red-700 hover:bg-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25",
};

/** Botón estándar del sistema. */
export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    />
  );
}
