// ============================================================
//  CLIENTE DE SUPABASE PARA EL NAVEGADOR ("browser client")
// ============================================================
//
// ¿Cuándo se usa?
//   En componentes de cliente ("use client"): formularios de
//   login/registro, botones que agregan o borran tareas, etc.
//   Es decir, cualquier cosa que ocurra por una acción del
//   usuario DENTRO del navegador.
//
// ¿Qué tiene de especial?
//   createBrowserClient (de @supabase/ssr) guarda la sesión en
//   COOKIES, no en localStorage. ¿Por qué cookies? Porque así el
//   SERVIDOR de Next.js también puede leer la sesión (en Server
//   Components y en el middleware). localStorage solo lo ve el
//   navegador; las cookies las ven ambos.
//
// Cada vez que llamamos a createClient() creamos una instancia.
// En el navegador @supabase/ssr reutiliza la conexión por debajo,
// así que no hay problema en llamarlo donde se necesite.
// ============================================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
