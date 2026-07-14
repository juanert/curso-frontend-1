/** Indicador de carga a pantalla del contenido (lo usan los guards). */
export default function Loader() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-foreground/60">
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500"
      />
      <p className="text-sm">Cargando…</p>
    </div>
  );
}
