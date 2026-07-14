"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type PublicUser } from "@/context/AuthContext";
import { RequireAuth } from "@/components/guards";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Notice from "@/components/ui/Notice";
import Select from "@/components/ui/Select";
import { COUNTRIES } from "@/lib/countries";
import { passwordError } from "@/lib/validation";

type Feedback = { kind: "success" | "error"; message: string } | null;

/** Formulario de datos personales: nombre, apellido y país. */
function ProfileForm({ user }: { user: PublicUser }) {
  const { updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [country, setCountry] = useState(user.country);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = updateProfile({ firstName, lastName, country });
    setFeedback(
      result.ok
        ? { kind: "success", message: "Tus datos se guardaron correctamente." }
        : { kind: "error", message: result.error },
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Apellido"
          placeholder="Tu apellido"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <Select
        label="País"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Selecciona tu país</option>
        {COUNTRIES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>

      {feedback ? <Notice kind={feedback.kind}>{feedback.message}</Notice> : null}

      <div>
        <Button type="submit">Guardar cambios</Button>
      </div>
    </form>
  );
}

/** Formulario de cambio de contraseña (pide la actual por seguridad). */
function PasswordForm() {
  const { changePassword } = useAuth();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nextError, setNextError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setNextError("");
    setConfirmError("");

    const lengthError = passwordError(next);
    if (lengthError) {
      setNextError(lengthError);
      return;
    }
    if (confirm !== next) {
      setConfirmError("Las contraseñas no coinciden.");
      return;
    }

    const result = changePassword(current, next);
    if (!result.ok) {
      setFeedback({ kind: "error", message: result.error });
      return;
    }

    setFeedback({ kind: "success", message: "Tu contraseña fue actualizada." });
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Contraseña actual"
        type="password"
        autoComplete="current-password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nueva contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          error={nextError}
          required
        />
        <Input
          label="Confirmar nueva contraseña"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirmError}
          required
        />
      </div>

      {feedback ? <Notice kind={feedback.kind}>{feedback.message}</Notice> : null}

      <div>
        <Button type="submit">Actualizar contraseña</Button>
      </div>
    </form>
  );
}

/** Contenido interno (se renderiza solo cuando hay sesión garantizada). */
function AccountContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // RequireAuth garantiza la sesión, pero TypeScript no lo sabe.
  if (!user) return null;

  const displayName = user.firstName ? `${user.firstName}` : user.email;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">Mi cuenta</h1>
        <p className="text-foreground/60">
          Hola, <span className="font-medium text-foreground">{displayName}</span> — gestiona
          tus datos y tu contraseña. Sesión iniciada como {user.email}.
        </p>
      </header>

      <Card
        title="Datos personales"
        description="Tu nombre, apellido y país de residencia."
      >
        <ProfileForm user={user} />
      </Card>

      <Card
        title="Seguridad"
        description="Cambia la contraseña con la que inicias sesión."
      >
        <PasswordForm />
      </Card>

      <div>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

/** Página "Mi cuenta" (solo visible con sesión iniciada). */
export default function CuentaPage() {
  return (
    <RequireAuth>
      <AccountContent />
    </RequireAuth>
  );
}
