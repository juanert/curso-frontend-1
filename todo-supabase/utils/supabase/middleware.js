// ============================================================
//  MIDDLEWARE DE SUPABASE (refresca la sesión y protege rutas)
// ============================================================
//
// ¿Qué es un middleware en Next.js?
//   Código que se ejecuta ANTES de cada página, en el servidor.
//   Es el lugar perfecto para dos cosas:
//     1) Refrescar el token de sesión de Supabase (si caducó) y
//        volver a guardar las cookies actualizadas.
//     2) Redirigir al login a quien no haya iniciado sesión.
//
// La función clave para (1) es supabase.auth.getUser(): al
// llamarla, @supabase/ssr comprueba/renueva la sesión y, mediante
// setAll(), escribe las cookies nuevas en la respuesta.
//
// ¡IMPORTANTE! No pongas código entre createServerClient y
// getUser(): podría dejar la sesión en un estado raro.
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  // Respuesta base que iremos devolviendo (con las cookies puestas).
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Guardamos las cookies tanto en la petición como en la
          // respuesta, para que la sesión quede sincronizada.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresca la sesión y nos dice si hay usuario logueado.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- Protección de rutas -------------------------------------
  // Si NO hay usuario y la ruta no es pública (login/register),
  // lo mandamos al login.
  const path = request.nextUrl.pathname;
  const esRutaPublica = path.startsWith("/login") || path.startsWith("/register");

  if (!user && !esRutaPublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Devolvemos la respuesta con las cookies de sesión actualizadas.
  return supabaseResponse;
}
