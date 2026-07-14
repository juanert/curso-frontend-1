// ============================================================
//  PÁGINA DE INICIO ("/") — Server Component
// ============================================================
// No muestra nada: en el SERVIDOR mira si hay usuario y redirige.
//   - Con sesión  -> /todos
//   - Sin sesión  -> /login
// (El middleware ya protege /todos, pero esta redirección hace
//  la experiencia más directa desde la raíz.)
// ============================================================

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/todos" : "/login");
}
