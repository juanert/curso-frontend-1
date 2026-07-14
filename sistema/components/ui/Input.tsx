import { useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta visible sobre el campo. */
  label: string;
  /** Mensaje de error bajo el campo (también pinta el borde en rojo). */
  error?: string;
}

/** Campo de texto con etiqueta y error integrados. */
export default function Input({ label, error, id, className = "", ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={`rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/35 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:bg-white/5 ${
          error
            ? "border-red-500/70"
            : "border-black/10 dark:border-white/10"
        } ${className}`}
        {...rest}
      />
      {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}
