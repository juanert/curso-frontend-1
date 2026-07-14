# SISTEMA 🔐

Práctica de autenticación 100% frontend con **Next.js (App Router) + TypeScript + Tailwind**. No hay backend: los usuarios y la sesión viven en **localStorage** (solo a modo de práctica — en un sistema real las contraseñas nunca se guardan así).

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué incluye

- **3 páginas**:
  - `/registro` — correo, contraseña y confirmación (con validaciones).
  - `/login` — correo y contraseña.
  - `/cuenta` — editar nombre, apellido, país y cambiar la contraseña (pide la actual).
- **Contexto de sesión** (`context/AuthContext.tsx`): `useAuth()` expone `user`, `isLoggedIn`, `isReady`, `login`, `register`, `logout`, `updateProfile` y `changePassword`.
- **Guards de ruta** (`components/guards.tsx`):
  - Con sesión iniciada **no** puedes ver `/login` ni `/registro` (te lleva a `/cuenta`).
  - Sin sesión **no** puedes ver `/cuenta` (te lleva a `/login`).
  - `/` redirige según el estado de la sesión.
- **Modo claro / nocturno** (`context/ThemeContext.tsx`): clase `.dark` en `<html>`, persistido en localStorage y aplicado con un script inline antes del primer pintado para evitar el flash.
- **Navbar** con el logo SISTEMA, enlaces según sesión, interruptor de tema y el icono de perfil (iniciales) + botón Salir cuando estás dentro.
- **Estilo**: fondo con degradado sutil + textura de grano (SVG `feTurbulence`, ver `.grain` en `app/globals.css`).

## Estructura

```
app/            layout (providers + navbar), página raíz, login, registro, cuenta
components/     Navbar, guards y UI base (Button, Input, Select, Card, Notice, Loader)
context/        AuthContext (sesión) y ThemeContext (tema)
lib/            storage.ts (localStorage tipado), validation.ts, countries.ts
```

## Claves de localStorage

| Clave | Contenido |
| --- | --- |
| `sistema:users` | Lista de usuarios registrados |
| `sistema:session` | Correo de la sesión activa |
| `sistema:theme` | `light` o `dark` |
