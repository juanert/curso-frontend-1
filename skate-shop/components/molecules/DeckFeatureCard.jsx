/**
 * @file Molécula: tarjeta compacta de una tabla de la colección.
 */

/**
 * Tarjeta de producto que acompaña al video de la colección.
 * Cada tarjeta entra por la derecha (animada con GSAP en el organismo
 * DeckShowcase) a medida que su tabla aparece en pantalla.
 *
 * @component
 * @param {Object} props
 * @param {number} props.index - Posición de la tabla (1 a 8), se muestra como "01".
 * @param {string} props.name - Nombre comercial de la tabla.
 * @param {number} props.price - Precio en USD.
 * @returns {JSX.Element}
 *
 * @example
 * <DeckFeatureCard index={2} name="Neón Ácido" price={64} />
 */
export default function DeckFeatureCard({ index, name, price }) {
  return (
    <article className="flex items-center gap-3 border border-foreground/15 bg-background/70 px-4 py-3 backdrop-blur-sm">
      <span className="font-display text-lg text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3 className="truncate font-display text-base uppercase tracking-wide">{name}</h3>
        <p className="text-xs text-foreground/60">${price} USD</p>
      </div>
    </article>
  );
}
