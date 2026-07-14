import { useId, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Etiqueta visible sobre el campo. */
  label: string;
  /** Mensaje de error bajo el campo. */
  error?: string;
}

/** Selector con etiqueta y error integrados (mismo estilo que Input). */
export default function Select({
  label,
  error,
  id,
  className = "",
  children,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        className={`rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:bg-white/5 dark:[&>option]:bg-slate-900 ${
          error
            ? "border-red-500/70"
            : "border-black/10 dark:border-white/10"
        } ${className}`}
        {...rest}
      >
        {children}
      </select>
      {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}
