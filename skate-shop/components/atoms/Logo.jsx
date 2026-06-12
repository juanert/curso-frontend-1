/**
 * @file Átomo: logotipo tipográfico de la marca.
 */

/**
 * Logotipo de ASFALTO Skate Co. Es un átomo puramente tipográfico,
 * por lo que hereda el color del texto y escala con la fuente display.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @returns {JSX.Element}
 *
 * @example
 * <Logo className="text-3xl" />
 */
export default function Logo({ className = "" }) {
  return (
    <span
      className={`font-display text-2xl uppercase leading-none tracking-tight ${className}`}
    >
      Asfalto<span className="text-accent">.</span>
    </span>
  );
}
