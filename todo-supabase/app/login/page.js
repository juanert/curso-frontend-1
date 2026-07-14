"use client";

// ============================================================
//  PÁGINA DE LOGIN ("/login")
// ============================================================
// El usuario escribe correo y contraseña para INICIAR sesión.
// Función clave de Supabase:
//
//   supabase.auth.signInWithPassword({ email, password })
//
// Al tener éxito, @supabase/ssr guarda la sesión en COOKIES.
// Luego llamamos a router.refresh() para que los componentes de
// servidor (como /todos) se vuelvan a renderizar YA con la sesión.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  // Estado del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // evita que el navegador recargue la página
    setError("");
    setLoading(true);

    const supabase = createClient();

    // === LLAMADA A SUPABASE: iniciar sesión ===
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      // Supabase nos da un mensaje (ej: "Invalid login credentials")
      setError(error.message);
      return;
    }

    // Éxito: vamos a las tareas y refrescamos para sincronizar el servidor.
    router.replace("/todos");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-800/60 p-8 shadow-xl">
        <h1 className="mb-1 text-2xl font-bold">Iniciar sesión</h1>
        <p className="mb-6 text-sm text-slate-400">Entra para ver tus tareas.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Correo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {/* Mensaje de error, solo si existe */}
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2 font-medium transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
