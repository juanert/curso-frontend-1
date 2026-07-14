"use client";

// ============================================================
//  LISTA DE TAREAS ("TodoList") — Client Component
// ============================================================
// Recibe las tareas iniciales desde el Server Component y maneja
// las acciones del usuario contra la tabla "tasks" de Supabase:
//
//   CREATE -> supabase.from("tasks").insert(...)
//   UPDATE -> supabase.from("tasks").update(...).eq("id", ...)
//   DELETE (suave) -> update({ deleted: true }).eq("id", ...)
//
// Columnas de "tasks": id, title, completed, deleted, created_at, user_id
//
// PRIVACIDAD: al crear una tarea guardamos user_id (el id del
// usuario logueado). La política de RLS comprueba que ese user_id
// sea el tuyo (with check auth.uid() = user_id), así nadie puede
// crear tareas a nombre de otro.
//
// Nota sobre "borrado suave": en vez de eliminar la fila, marcamos
// deleted = true. Así el dato no se pierde y se puede recuperar.
// Por eso el "botón de borrar" hace un UPDATE, no un DELETE real.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function TodoList({ initialTasks, email, userId }) {
  const router = useRouter();
  const supabase = createClient();

  // Arrancamos con las tareas que ya trajo el servidor.
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  // --- CREATE: agregar una tarea nueva ---------------------
  async function handleAdd(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    // insert crea la fila. Guardamos title y user_id (de quién es).
    // .select() hace que Supabase nos devuelva la fila creada (con
    // su id) para mostrarla al instante sin recargar.
    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, user_id: userId })
      .select();

    if (error) {
      setError(error.message);
      return;
    }

    setTasks((prev) => [data[0], ...prev]); // la ponemos arriba
    setNewTitle("");
  }

  // --- UPDATE: marcar/desmarcar como completada ------------
  async function toggleTask(task) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id) // ¿qué fila? la de este id
      .select();

    if (error) {
      setError(error.message);
      return;
    }

    setTasks((prev) => prev.map((t) => (t.id === task.id ? data[0] : t)));
  }

  // --- DELETE (suave): marcar deleted = true ---------------
  async function deleteTask(id) {
    const { error } = await supabase
      .from("tasks")
      .update({ deleted: true })
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id)); // la quitamos de la vista
  }

  // --- Cerrar sesión ---------------------------------------
  async function handleLogout() {
    await supabase.auth.signOut(); // borra la sesión (cookies)
    router.replace("/login");
    router.refresh(); // sincroniza el servidor (ya no hay sesión)
  }

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 py-10">
      {/* Encabezado con el correo del usuario y botón de salir */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis tareas</h1>
          <p className="text-sm text-slate-400">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm transition hover:bg-slate-800"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Formulario para agregar */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="¿Qué tienes que hacer?"
          className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 font-medium transition hover:bg-indigo-500"
        >
          Agregar
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <p className="text-slate-400">
          No hay tareas todavía. ¡Agrega la primera! ☝️
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-lg bg-slate-800/60 px-4 py-3"
            >
              {/* Checkbox = marcar completada (UPDATE) */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
                className="h-5 w-5 accent-indigo-500"
              />

              <span
                className={
                  "flex-1 " +
                  (task.completed ? "text-slate-500 line-through" : "")
                }
              >
                {task.title}
              </span>

              {/* Botón de borrar (borrado suave) */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm text-slate-400 transition hover:text-red-400"
                aria-label="Borrar tarea"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
