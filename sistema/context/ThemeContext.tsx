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

//Declaro el tipo de dato tema, dentro solo puede tener dos valores "light" o "dark"
export type Theme = "light" | "dark";

const THEME_KEY = "sistema:theme";

//Esta es la interfaz, es decir. Una validacion llamada ThemeContext, es basicamente una validacion que se utiliza mas adelante
//¿Que valida? que una variable sea un objeto con dos propiedades, theme que es del tipo de dato Theme (el dato que solo puede tener
// "light" o "dark") y una propiedad llamada toggleTheme que retorna vacio, es palabras mas simples. No tiene return o no retorna nada 
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

//Aqui se esta creando el contexto, una variable que puede ser null o puede ser de tipo ThemeContextValue (es decir,
//un objeto que cumpla con las validaciones de ThemeContextValue)
const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Proveedor del modo claro/nocturno.
 *
 * La clase `.dark` del <html> la aplica primero un script inline del layout
 * (antes del primer pintado, para evitar el flash); este contexto solo
 * sincroniza el estado de React con esa clase y persiste los cambios.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  //abstraccion
  const [theme, setTheme] = useState<Theme>("light");

  // Sincroniza el estado con la clase que dejó el script anti-flash.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        // localStorage puede fallar (modo incógnito estricto); el tema igual cambia.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Hook de acceso al contexto de tema. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>.");
  }
  return ctx;
}
