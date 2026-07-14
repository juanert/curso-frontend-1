import type { ReactNode } from "react";

interface NoticeProps {
  /** Tipo de aviso: pinta colores de éxito o de error. */
  kind: "success" | "error";
  children: ReactNode;
}

const STYLES: Record<NoticeProps["kind"], string> = {
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
};

/** Aviso de resultado para formularios (errores y confirmaciones). */
export default function Notice({ kind, children }: NoticeProps) {
  return (
    <p role={kind === "error" ? "alert" : "status"} className={`rounded-xl border px-3.5 py-2.5 text-sm ${STYLES[kind]}`}>
      {children}
    </p>
  );
}
