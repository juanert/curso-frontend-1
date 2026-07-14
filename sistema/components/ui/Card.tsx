import type { ReactNode } from "react";

interface CardProps {
  /** Título de la tarjeta. */
  title?: string;
  /** Descripción corta bajo el título. */
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Tarjeta translúcida estándar sobre el fondo con grano. */
export default function Card({ title, description, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50 ${className}`}
    >
      {title ? (
        <header className="mb-5 flex flex-col gap-1">
          <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm text-foreground/60">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
