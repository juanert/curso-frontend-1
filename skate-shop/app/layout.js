import { Anton, Inter } from "next/font/google";
import "./globals.css";

/**
 * @file Layout raíz de la aplicación: fuentes, metadatos y tema oscuro global.
 */

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "ASFALTO Skate Co. — Tablas que vuelan",
  description:
    "Tienda de skate. Tablas profesionales de arce canadiense, gráficas exclusivas y envío gratis. Desliza y mira la colección 2026 en acción.",
};

/**
 * Layout raíz que envuelve todas las páginas de la tienda.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página activa.
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${anton.variable} ${inter.variable} antialiased`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
