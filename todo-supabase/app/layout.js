// ============================================================
//  LAYOUT RAÍZ
// ============================================================
// Envuelve TODAS las páginas. Con el enfoque SSR (server + cookies
// + middleware) ya NO necesitamos un AuthProvider global: la
// sesión se lee en el servidor y se refresca en el middleware.
// ============================================================

import "./globals.css";

export const metadata = {
  title: "Todo App con Supabase",
  description:
    "Ejemplo educativo de Next.js + Supabase (login, registro y tareas) con SSR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
