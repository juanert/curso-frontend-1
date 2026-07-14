// ============================================================
//  CLIENTE DE SUPABASE PARA EL SERVIDOR ("server client")
// ============================================================
//
// ¿Cuándo se usa?
//   En Server Components (páginas que corren en el servidor,
//   como app/todos/page.js) y en Route Handlers. Aquí NO hay
//   "window" ni localStorage: la sesión viaja en las COOKIES de
//   la petición.
//
// ¿Cómo lee/escribe la sesión?
//   Le pasamos a Supabase dos funciones:
//     getAll()  -> leer las cookies de la petición actual
//     setAll()  -> escribir cookies (por ejemplo, cuando el token
//                  se refresca). En un Server Component "puro" no
//                  se pueden escribir cookies; por eso va en un
//                  try/catch. Quien de verdad refresca la sesión
//                  y escribe las cookies es el MIDDLEWARE.
//
// Nota: createClient() es ASÍNCRONA porque en Next.js moderno
//   cookies() se debe "await". Por eso siempre se usa así:
//     const supabase = await createClient();
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Llamado desde un Server Component (no puede escribir
            // cookies). Se ignora sin problema porque el middleware
            // es quien refresca la sesión.
          }
        },
      },
    }
  );
}
