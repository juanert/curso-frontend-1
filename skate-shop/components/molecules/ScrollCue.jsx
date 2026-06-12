/**
 * @file Molécula: indicador animado de "sigue bajando".
 */

/**
 * Indicador de scroll del héroe: etiqueta corta + flecha que rebota
 * (animación CSS `animate-cue` definida en globals.css).
 *
 * @component
 * @param {Object} props
 * @param {string} [props.label='Desliza'] - Texto sobre la flecha.
 * @returns {JSX.Element}
 *
 * @example
 * <ScrollCue label="Desliza" />
 */
export default function ScrollCue({ label = "Desliza" }) {
  return (
    <div className="flex flex-col items-center gap-2 text-foreground/70">
      <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">{label}</span>
      <svg
        className="animate-cue h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
