"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

/**
 * Guards de ruta del lado del cliente.
 *
 * Como la sesión vive en localStorage, en el primer pintado todavía no se
 * sabe si hay usuario (isReady = false). Ambos guards muestran un Loader
 * hasta saberlo y redirigen cuando la regla no se cumple:
 *
 * - RequireAuth: /cuenta solo con sesión iniciada (si no → /login).
 * - GuestOnly: /login y /registro solo SIN sesión (si hay → /cuenta).
 */

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady || !isLoggedIn) return <Loader />;
  return <>{children}</>;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && isLoggedIn) {
      router.replace("/cuenta");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady || isLoggedIn) return <Loader />;
  return <>{children}</>;
}
