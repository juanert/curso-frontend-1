// ============================================================
//  PÁGINA DE TAREAS ("/todos") — Server Component
// ============================================================
// Esta página corre en el SERVIDOR. Aquí:
//   1) Comprobamos que haya usuario (si no, al login).
//   2) Leemos las tareas desde Supabase (READ) en el servidor,
//      así la primera carga ya llega con los datos (más rápido y
//      mejor para SEO).
//   3) Pasamos esas tareas a un componente de CLIENTE (<TodoList>)
//      que se encarga de agregar, completar y borrar.
//
// Trabajamos con TU tabla real "tasks", cuyas columnas son:
//   id, title, completed, deleted, created_at, user_id
// Filtramos deleted = false para no mostrar las borradas (esta
// tabla usa "borrado suave": marcar deleted en vez de eliminar).
//
// PRIVACIDAD POR USUARIO:
//   No filtramos por user_id "a mano". La política de RLS en
//   Supabase (auth.uid() = user_id) hace que este select SOLO
//   devuelva las tareas del usuario logueado. Por eso el código
//   es tan simple y a la vez seguro.
// ============================================================

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import TodoList from "./todo-list";

export default async function TodosPage() {
  const supabase = await createClient();

  // 1) ¿Hay usuario? getUser() valida la sesión contra Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2) READ: traemos las tareas no borradas, más nuevas primero.
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  // 3) Se lo entregamos al componente de cliente. Le pasamos el
  //    user.id para poder guardarlo al crear tareas (user_id).
  return (
    <TodoList
      initialTasks={tasks ?? []}
      email={user.email}
      userId={user.id}
    />
  );
}
