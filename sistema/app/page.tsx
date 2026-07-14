"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

/**
 * Página raíz: no tiene contenido propio, solo decide a dónde llevarte
 * según el estado de la sesión (a /cuenta si estás dentro, a /login si no).
 */
export default function Home() {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady) {
      router.replace(isLoggedIn ? "/cuenta" : "/login");
    }
  }, [isReady, isLoggedIn, router]);

  return <Loader />;
}
