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
import { isValidEmail, passwordError } from "@/lib/validation";

interface FieldErrors {
  email?: string;
  password?: string;
  confirm?: string;
}

/** Página de registro (solo visible sin sesión activa). */
export default function RegistroPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const nextErrors: FieldErrors = {};
    if (!isValidEmail(email)) {
      nextErrors.email = "Escribe un correo válido.";
    }
    const passError = passwordError(password);
    if (passError) {
      nextErrors.password = passError;
    }
    if (confirm !== password || confirm.length === 0) {
      nextErrors.confirm = "Las contraseñas no coinciden.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = register(email, password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    // El registro deja la sesión iniciada: directo a Mi cuenta.
    router.push("/cuenta");
  };

  return (
    <GuestOnly>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <Card
          title="Crea tu cuenta"
          description="Solo necesitas un correo y una contraseña."
        >
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label="Correo"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite la contraseña"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={errors.confirm}
              required
            />

            {formError ? <Notice kind="error">{formError}</Notice> : null}

            <Button type="submit" fullWidth>
              Crear cuenta
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-foreground/60">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Inicia sesión
            </Link>
          </p>
        </Card>
      </div>
    </GuestOnly>
  );
}
