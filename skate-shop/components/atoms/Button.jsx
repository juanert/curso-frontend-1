/**
 * @file Átomo: botón / enlace con estilo de llamada a la acción.
 */

/** Estilos por variante visual. */
const VARIANTS = {
  primary: "bg-accent text-background hover:bg-foreground",
  ghost: "border border-foreground/40 text-foreground hover:border-accent hover:text-accent",
};

/** Estilos por tamaño. */
const SIZES = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
};

/**
 * Botón de la tienda. Si recibe `href` se renderiza como enlace `<a>`
 * (útil para anclas internas); si no, como `<button>`.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.href] - Destino del enlace. Omitir para un botón de acción.
 * @param {'primary'|'ghost'} [props.variant='primary'] - Variante visual.
 * @param {'sm'|'md'} [props.size='md'] - Tamaño del botón.
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @returns {JSX.Element}
 *
 * @example
 * <Button href="#coleccion">Ver la colección</Button>
 * <Button variant="ghost" size="sm">Encuentra tu spot</Button>
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}) {
  const classes = `inline-flex items-center justify-center font-display uppercase tracking-widest transition-colors duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
