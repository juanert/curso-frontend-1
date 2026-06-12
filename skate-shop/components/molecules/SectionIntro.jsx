import Badge from "@/components/atoms/Badge";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";

/**
 * @file Molécula: encabezado de sección (insignia + titular + bajada).
 */

/**
 * Encabezado reutilizable de sección. Compone los átomos Badge,
 * Heading y Text con una alineación configurable.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.eyebrow] - Texto de la insignia superior.
 * @param {string} props.title - Titular de la sección.
 * @param {string} [props.description] - Bajada del titular.
 * @param {'left'|'center'} [props.align='center'] - Alineación del bloque.
 * @param {string} [props.className] - Clases Tailwind adicionales.
 * @returns {JSX.Element}
 *
 * @example
 * <SectionIntro eyebrow="La colección" title="Ocho tablas. Cero límites." align="left" />
 */
export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <Heading size="lg">{title}</Heading>
      {description ? <Text className="max-w-xl">{description}</Text> : null}
    </div>
  );
}
