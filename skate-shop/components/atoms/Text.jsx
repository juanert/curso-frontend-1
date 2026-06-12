/**
 * @file Átomo: párrafo de texto corrido.
 */

/** Escalas disponibles para el cuerpo de texto. */
const SIZES = {
  lg: "text-lg md:text-xl",
  md: "text-base md:text-lg",
  sm: "text-sm",
};

/**
 * Párrafo estándar de la tienda. Por defecto usa un tono atenuado
 * para jerarquizar frente a los titulares.
 *
 * @component
 * @param {Object} props
 * @param {'lg'|'md'|'sm'} [props.size='md'] - Escala tipográfica.
 * @param {boolean} [props.muted=true] - Si el texto usa el tono atenuado.
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @param {React.ReactNode} props.children - Contenido del párrafo.
 * @returns {JSX.Element}
 *
 * @example
 * <Text size="lg">Tablas profesionales para la ciudad.</Text>
 */
export default function Text({ size = "md", muted = true, className = "", children }) {
  return (
    <p
      className={`leading-relaxed ${SIZES[size]} ${muted ? "text-foreground/70" : "text-foreground"} ${className}`}
    >
      {children}
    </p>
  );
}
