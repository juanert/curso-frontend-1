/**
 * @file Átomo: etiqueta corta destacada (eyebrow).
 */

/**
 * Insignia que antecede a los titulares de sección
 * ("Colección 2026", "Tu próximo truco", etc.).
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @param {React.ReactNode} props.children - Texto de la insignia.
 * @returns {JSX.Element}
 *
 * @example
 * <Badge>La colección</Badge>
 */
export default function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent ${className}`}
    >
      {children}
    </span>
  );
}
