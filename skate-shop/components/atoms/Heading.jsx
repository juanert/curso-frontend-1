/**
 * @file Átomo: titular con la fuente display de la marca.
 */

/** Escalas tipográficas disponibles para los titulares. */
const SIZES = {
  xl: "text-6xl md:text-8xl",
  lg: "text-4xl md:text-6xl",
  md: "text-2xl md:text-4xl",
  sm: "text-xl md:text-2xl",
};

/**
 * Titular de sección. Renderiza la etiqueta semántica indicada en `as`
 * manteniendo siempre la identidad visual (Anton, mayúsculas, condensado).
 *
 * @component
 * @param {Object} props
 * @param {'h1'|'h2'|'h3'|'h4'} [props.as='h2'] - Etiqueta HTML semántica.
 * @param {'xl'|'lg'|'md'|'sm'} [props.size='lg'] - Escala tipográfica.
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @param {React.ReactNode} props.children - Texto del titular.
 * @returns {JSX.Element}
 *
 * @example
 * <Heading as="h1" size="xl">Nacidos para volar</Heading>
 */
export default function Heading({ as: Tag = "h2", size = "lg", className = "", children }) {
  return (
    <Tag
      className={`font-display uppercase leading-[0.95] tracking-tight ${SIZES[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
