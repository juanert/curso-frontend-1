"use client";

// ============================================================
//  PÁGINA DE REGISTRO ("/register")
// ============================================================
// El usuario CREA una cuenta nueva. Función clave de Supabase:
//
//   supabase.auth.signUp({ email, password })
//
// Sobre la confirmación por correo:
//   Por defecto, Supabase envía un email de confirmación y NO
//   inicia sesión hasta que el usuario lo confirma. Para practicar
//   sin correos, desactívala:
//     Panel Supabase -> Authentication -> Sign In / Providers ->
//     Email -> desactiva "Confirm email".
//   Con eso, al registrarse queda logueado al instante.
//
// Este código maneja ambos casos y muestra el mensaje adecuado.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // aviso de "revisa tu correo"
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    // === LLAMADA A SUPABASE: crear cuenta ===
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Caso A: la confirmación por correo está ACTIVADA.
    //   Supabase devuelve un usuario pero SIN sesión activa todavía.
    if (data.user && !data.session) {
      setMessage(
        "¡Cuenta creada! Revisa tu correo y confirma tu email para poder entrar."
      );
      return;
    }

    // Caso B: la confirmación está DESACTIVADA -> ya hay sesión.
    router.replace("/todos");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-800/60 p-8 shadow-xl">
        <h1 className="mb-1 text-2xl font-bold">Crear cuenta</h1>
        <p className="mb-6 text-sm text-slate-400">
          Regístrate para empezar a guardar tus tareas.
        </p>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2 font-medium transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Creando…" : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
