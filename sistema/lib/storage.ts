/**
 * Persistencia tipada sobre localStorage.
 *
 * SOLO PARA PRÁCTICA: en un sistema real las contraseñas JAMÁS se guardan
 * en el navegador ni en texto plano; aquí no hay backend y el objetivo es
 * practicar contextos, guards de rutas y formularios.
 */

export interface StoredUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
}

const USERS_KEY = "sistema:users";
const SESSION_KEY = "sistema:session";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Devuelve todos los usuarios registrados (lista vacía en el servidor). */
export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  return safeParse<StoredUser[]>(window.localStorage.getItem(USERS_KEY), []);
}

/** Sobrescribe la lista completa de usuarios. */
export function saveUsers(users: StoredUser[]): void {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Correo de la sesión activa, o null si nadie ha iniciado sesión. */
export function getSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

/** Guarda (o limpia, con null) la sesión activa. */
export function setSessionEmail(email: string | null): void {
  if (email === null) {
    window.localStorage.removeItem(SESSION_KEY);
  } else {
    window.localStorage.setItem(SESSION_KEY, email);
  }
}
