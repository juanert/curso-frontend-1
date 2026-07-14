"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getSessionEmail,
  getUsers,
  saveUsers,
  setSessionEmail,
  type StoredUser,
} from "@/lib/storage";

/** Usuario expuesto a la UI (nunca incluye la contraseña). */
export type PublicUser = Omit<StoredUser, "password">;

/** Resultado uniforme de las operaciones de autenticación. */
export type AuthResult = { ok: true } | { ok: false; error: string };

/** Datos editables desde "Mi cuenta". */
export type ProfileData = Pick<StoredUser, "firstName" | "lastName" | "country">;

interface AuthContextValue {
  /** Usuario con sesión activa, o null si nadie ha iniciado sesión. */
  user: PublicUser | null;
  /** Atajo derivado de `user`. */
  isLoggedIn: boolean;
  /**
   * false durante el renderizado en servidor y el primer pintado;
   * true cuando ya se leyó localStorage. Los guards esperan este flag
   * antes de decidir si redirigen.
   */
  isReady: boolean;
  register: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  updateProfile: (data: ProfileData) => AuthResult;
  changePassword: (currentPassword: string, newPassword: string) => AuthResult;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toPublic(user: StoredUser): PublicUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

/**
 * Proveedor de sesión. Toda la "base de datos" vive en localStorage
 * (ver lib/storage.ts): esto es solo una práctica de frontend.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Rehidrata la sesión al montar (localStorage solo existe en el navegador).
  useEffect(() => {
    const email = getSessionEmail();
    if (email) {
      const stored = getUsers().find((u) => u.email === email);
      if (stored) {
        setUser(toPublic(stored));
      } else {
        setSessionEmail(null);
      }
    }
    setIsReady(true);
  }, []);

  const register = useCallback((email: string, password: string): AuthResult => {
    const normalized = email.trim().toLowerCase();
    const users = getUsers();

    if (users.some((u) => u.email === normalized)) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }

    const newUser: StoredUser = {
      email: normalized,
      password,
      firstName: "",
      lastName: "",
      country: "",
    };
    saveUsers([...users, newUser]);

    // El registro inicia sesión automáticamente.
    setSessionEmail(normalized);
    setUser(toPublic(newUser));
    return { ok: true };
  }, []);

  const login = useCallback((email: string, password: string): AuthResult => {
    const normalized = email.trim().toLowerCase();
    const stored = getUsers().find(
      (u) => u.email === normalized && u.password === password,
    );

    if (!stored) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }

    setSessionEmail(normalized);
    setUser(toPublic(stored));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setSessionEmail(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: ProfileData): AuthResult => {
    const email = getSessionEmail();
    if (!email) return { ok: false, error: "No hay una sesión activa." };

    const users = getUsers();
    const stored = users.find((u) => u.email === email);
    if (!stored) return { ok: false, error: "No se encontró la cuenta." };

    stored.firstName = data.firstName.trim();
    stored.lastName = data.lastName.trim();
    stored.country = data.country;
    saveUsers(users);

    setUser(toPublic(stored));
    return { ok: true };
  }, []);

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string): AuthResult => {
      const email = getSessionEmail();
      if (!email) return { ok: false, error: "No hay una sesión activa." };

      const users = getUsers();
      const stored = users.find((u) => u.email === email);
      if (!stored) return { ok: false, error: "No se encontró la cuenta." };

      if (stored.password !== currentPassword) {
        return { ok: false, error: "La contraseña actual no es correcta." };
      }

      stored.password = newPassword;
      saveUsers(users);
      return { ok: true };
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: user !== null,
      isReady,
      register,
      login,
      logout,
      updateProfile,
      changePassword,
    }),
    [user, isReady, register, login, logout, updateProfile, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook de acceso al contexto de sesión. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  }
  return ctx;
}
