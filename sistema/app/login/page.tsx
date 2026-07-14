"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GuestOnly } from "@/components/guards";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Notice from "@/components/ui/Notice";
import { isValidEmail } from "@/lib/validation";

/** Página de inicio de sesión (solo visible sin sesión activa). */
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Escribe un correo válido.");
      return;
    }

    const result = login(email, password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    router.push("/cuenta");
  };

  return (
    <GuestOnly>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <Card
          title="Inicia sesión"
          description="Entra con el correo y la contraseña de tu cuenta."
        >
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label="Correo"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {formError ? <Notice kind="error">{formError}</Notice> : null}

            <Button type="submit" fullWidth>
              Ingresar
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-foreground/60">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href="/registro"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Créala aquí
            </Link>
          </p>
        </Card>
      </div>
    </GuestOnly>
  );
}
