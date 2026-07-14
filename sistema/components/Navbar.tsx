"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

/** Enlace de navegación con estado activo según la ruta actual. */
function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-black/5 text-foreground dark:bg-white/10"
          : "text-foreground/65 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

/**
 * Barra de navegación fija: logo SISTEMA, enlaces según el estado de la
 * sesión, interruptor de tema y, con sesión iniciada, el icono de perfil
 * (iniciales del usuario) junto al botón de salir.
 */
export default function Navbar() {
  const { user, isLoggedIn, isReady, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const router = useRouter();

  const initials = user
    ? (
        `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` ||
        user.email.charAt(0)
      ).toUpperCase()
    : "";

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/70 backdrop-blur-md dark:border-white/10">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.3em]"
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
          SISTEMA
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Los enlaces esperan a isReady para no mostrar el estado equivocado. */}
          {isReady &&
            (isLoggedIn ? (
              <NavLink href="/cuenta" label="Mi cuenta" />
            ) : (
              <>
                <NavLink href="/login" label="Ingresar" />
                <NavLink href="/registro" label="Crear cuenta" />
              </>
            ))}

          {/* El icono se resuelve por CSS (clase .dark), no por estado:
              así es correcto desde el primer pintado. */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar entre modo claro y nocturno"
            className="rounded-lg p-2 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
          >
            <svg
              className="h-5 w-5 dark:hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
            <svg
              className="hidden h-5 w-5 dark:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>

          {isReady && isLoggedIn && user ? (
            <>
              <Link
                href="/cuenta"
                title={user.email}
                aria-label="Ir a mi cuenta"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white ring-2 ring-indigo-500/25 transition-transform hover:scale-105 dark:bg-indigo-500"
              >
                {initials}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/65 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
              >
                Salir
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
