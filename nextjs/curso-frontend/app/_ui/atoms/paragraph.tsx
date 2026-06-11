/**
 * Componente de párrafo para mostrar texto con estilo.
 * @param {React.ReactNode} children - El contenido del párrafo, que puede ser texto o cualquier otro elemento React.
 * @returns {JSX.Element} Un elemento de párrafo estilizado con clases de Tailwind CSS.
 * @example
 * <Paragraph>Este es un párrafo de ejemplo.</Paragraph>
 */
export default function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-700 text-base mb-4">
      {children}
    </p>
  );
}