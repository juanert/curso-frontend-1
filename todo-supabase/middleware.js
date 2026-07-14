// ============================================================
//  MIDDLEWARE RAÍZ DE NEXT.JS
// ============================================================
// Next.js ejecuta automáticamente este archivo (debe llamarse
// "middleware.js" y estar en la raíz del proyecto) antes de cada
// petición. Aquí simplemente delegamos en updateSession, que
// refresca la sesión de Supabase y protege las rutas privadas.
// ============================================================

import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}

// "matcher" le dice a Next.js EN QUÉ rutas correr el middleware.
// Excluimos archivos internos y estáticos (imágenes, etc.) para
// no ejecutarlo de más.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
