# Todo App con Next.js + Supabase (JavaScript, enfoque SSR)

Proyecto **educativo** para aprender cómo se usa **Supabase** en Next.js.
Incluye **registro**, **inicio de sesión** y una **lista de tareas** guardada en
la base de datos.

- **Next.js 16** (App Router)
- **JavaScript** (sin TypeScript, a propósito)
- **Supabase** con el paquete oficial **`@supabase/ssr`** (sesión en cookies +
  middleware que la refresca)
- **Tailwind CSS** para los estilos

> El objetivo es entender Supabase, así que **todo el código de Supabase está
> comentado paso a paso**. Buen orden de lectura:
> 1. [`utils/supabase/client.js`](utils/supabase/client.js) (navegador)
> 2. [`utils/supabase/server.js`](utils/supabase/server.js) (servidor)
> 3. [`utils/supabase/middleware.js`](utils/supabase/middleware.js) (refresca sesión)

---

## 🧠 Los 3 clientes de Supabase (idea central del enfoque SSR)

Con `@supabase/ssr` la sesión se guarda en **cookies**, para que la puedan leer
tanto el navegador como el servidor. Por eso hay **tres** formas de crear el
cliente, según DÓNDE corre el código:

| Cliente | Archivo | ¿Dónde se usa? |
|--------|---------|----------------|
| Navegador | `utils/supabase/client.js` | Componentes `"use client"` (login, registro, botones de la lista) |
| Servidor  | `utils/supabase/server.js` | Server Components (`app/todos/page.js`, `app/page.js`) |
| Middleware| `utils/supabase/middleware.js` | Se ejecuta antes de cada página para **refrescar la sesión** y proteger rutas |

El archivo raíz [`middleware.js`](middleware.js) es el que Next.js ejecuta
automáticamente y llama al de Supabase.

---

## 🚀 Puesta en marcha (paso a paso)

> Este repo usa **pnpm** (no npm).

### Paso 1 — Variables de entorno
El archivo `.env.local` ya está configurado con las claves del proyecto. Si
partes de otro proyecto, copia la plantilla y pon tus valores:
```bash
cp .env.local.example .env.local
```
```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```
Los consigues en **Supabase → Project Settings → API Keys**
(usa la *Publishable key*, la nueva que reemplaza a la antigua *anon key*).

### Paso 2 — La tabla de datos (¡IMPORTANTE, ejecuta el SQL!)
Esta app usa la tabla **`tasks`** con tareas **privadas por usuario**. Abre
[`supabase/schema.sql`](supabase/schema.sql), copia **todo** su contenido en
**Supabase → SQL Editor → New query** y pulsa **Run**. Ese script:

- añade la columna `user_id` (el dueño de cada tarea),
- activa **RLS** y crea las políticas `auth.uid() = user_id`,
- borra políticas antiguas "abiertas" y filas de ejemplo sin dueño.

Es seguro ejecutarlo más de una vez.

### Paso 3 — (Recomendado para practicar) Quitar confirmación por correo
Para poder registrarte y entrar sin recibir correos:
**Authentication → Sign In / Providers → Email → desactiva "Confirm email"**.

### Paso 4 — Instalar y ejecutar (con pnpm)
```bash
pnpm install
pnpm dev
```
Abre <http://localhost:3000>. Como no hay sesión, el middleware te manda a
**/login**. Crea una cuenta en **/register** y empieza a usar la lista. 🎉

---

## 🗂️ Estructura del proyecto

```
todo-supabase/
├─ middleware.js              # Next.js lo ejecuta antes de cada página
├─ app/
│  ├─ layout.js               # Layout raíz
│  ├─ page.js                 # "/" (servidor): redirige a /login o /todos
│  ├─ login/page.js           # Formulario de inicio de sesión (cliente)
│  ├─ register/page.js        # Formulario de registro (cliente)
│  └─ todos/
│     ├─ page.js              # (servidor) lee las tareas y protege la ruta
│     └─ todo-list.js         # (cliente) agregar / completar / borrar
├─ utils/supabase/
│  ├─ client.js               # Cliente para el NAVEGADOR
│  ├─ server.js               # Cliente para el SERVIDOR
│  └─ middleware.js           # Refresca la sesión y protege rutas
├─ supabase/
│  └─ schema.sql              # SQL de la tabla "tasks" (+ RLS y opción privada)
└─ .env.local.example         # Plantilla de variables de entorno
```

---

## 🔑 Funciones de Supabase que usa este proyecto

| Qué hace                 | Función                                          | Dónde |
|--------------------------|--------------------------------------------------|-------|
| Registrarse              | `supabase.auth.signUp({...})`                    | [register](app/register/page.js) |
| Iniciar sesión           | `supabase.auth.signInWithPassword({...})`        | [login](app/login/page.js) |
| Cerrar sesión            | `supabase.auth.signOut()`                        | [todo-list](app/todos/todo-list.js) |
| Usuario actual (servidor)| `supabase.auth.getUser()`                        | [todos/page](app/todos/page.js), [middleware](utils/supabase/middleware.js) |
| Leer tareas              | `supabase.from("tasks").select()`                | [todos/page](app/todos/page.js) |
| Crear tarea              | `supabase.from("tasks").insert({...})`           | [todo-list](app/todos/todo-list.js) |
| Editar / completar       | `supabase.from("tasks").update({...}).eq(...)`   | [todo-list](app/todos/todo-list.js) |
| Borrar (suave)           | `update({ deleted: true }).eq(...)`              | [todo-list](app/todos/todo-list.js) |

---

## 🛡️ Sobre la seguridad (RLS)

La *publishable key* es pública (vive en el navegador). La seguridad real la da
**RLS (Row Level Security)** en la base de datos. Tras ejecutar
[`supabase/schema.sql`](supabase/schema.sql), la lista es **privada por
usuario**: las políticas `auth.uid() = user_id` hacen que cada quien solo pueda
ver, crear, editar y borrar **sus propias tareas**, aunque el código del
navegador sea público.

---

## 🤖 Extras opcionales (los ejecutas TÚ en tu terminal)

Estos comandos no forman parte de la app; son para conectar tu asistente de IA
con Supabase. Córrelos en una terminal normal (no en la extensión del IDE):

```bash
# Servidor MCP de Supabase para tu proyecto
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=sblcgtmwynnppsbvjnqm"
# Luego autentícate (flujo interactivo):
claude /mcp
# Agent Skills de Supabase (opcional):
npx skills add supabase/agent-skills
```

---

## ❓ Problemas comunes

- **Me redirige siempre a /login** → No hay sesión válida. Regístrate/inicia
  sesión; si acabas de registrarte, revisa lo de "Confirm email" (Paso 3).
- **Error al guardar/leer tareas** → Revisa que la tabla `tasks` existe y que
  las políticas RLS del `schema.sql` están aplicadas.
- **"Invalid API key"** → La `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` está mal o
  no reiniciaste `pnpm dev` tras editar `.env.local`.
```
