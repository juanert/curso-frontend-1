import Logo from "@/components/atoms/Logo";
import Text from "@/components/atoms/Text";

/**
 * @file Organismo: pie de página de la tienda.
 */

/**
 * Footer con el logo, el lema de la marca, columnas de enlaces
 * (tienda, soporte, comunidad) y la línea legal.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').FooterContent} props.content - Contenido del pie.
 * @returns {JSX.Element}
 */
export default function SiteFooter({ content }) {
  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-background px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <Text size="sm" className="max-w-xs">
            {content.tagline}
          </Text>
        </div>

        {content.columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 font-display text-sm uppercase tracking-[0.25em] text-accent">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-foreground/60">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#inicio" className="transition-colors hover:text-accent">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-foreground/40">{content.legal}</p>
    </footer>
  );
}
