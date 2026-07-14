-- ============================================================
--  MIGRACIÓN: adaptar la tabla "tasks" al proyecto
--  (lista de tareas PRIVADA por usuario, con RLS)
-- ============================================================
--
-- Cómo aplicarlo:
--   Supabase -> SQL Editor -> New query -> pega TODO esto -> Run.
--
-- Es seguro ejecutarlo varias veces (usa IF EXISTS / IF NOT
-- EXISTS y vuelve a crear las políticas desde cero).
--
-- Tabla "tasks" -> columnas finales:
--   id         bigint       (identificador automático)
--   title      text         (texto de la tarea)
--   completed  boolean      (¿hecha?)
--   deleted    boolean      (borrado suave: true = oculta)
--   created_at timestamptz  (fecha de creación)
--   user_id    uuid         (DUEÑO de la tarea)  <-- NUEVO
-- ============================================================


-- (0) Si empiezas de cero y la tabla no existe, la crea ---------
create table if not exists public.tasks (
  id          bigint generated always as identity primary key,
  title       text not null,
  completed   boolean not null default false,
  deleted     boolean not null default false,
  created_at  timestamp with time zone not null default now()
);


-- (1) Añadir la columna user_id -------------------------------
-- "default auth.uid()" hace que, si no se envía, se rellene solo
-- con el id del usuario logueado. "on delete cascade" borra las
-- tareas si se elimina el usuario.
alter table public.tasks
  add column if not exists user_id uuid
  default auth.uid()
  references auth.users (id) on delete cascade;


-- (2) Limpiar filas sin dueño ---------------------------------
-- (Por ejemplo la tarea de ejemplo "Lavar los platos" que no
--  pertenece a nadie.) Con RLS por usuario, esas filas no se
--  podrían ver ni borrar desde la app, así que las quitamos aquí.
delete from public.tasks where user_id is null;


-- (3) Hacer user_id obligatorio de aquí en adelante -----------
alter table public.tasks
  alter column user_id set not null;


-- (4) Activar RLS (Row Level Security) ------------------------
-- Con RLS activado, por defecto NADIE puede tocar la tabla; solo
-- lo permitido por las políticas de abajo.
alter table public.tasks enable row level security;


-- (5) Borrar CUALQUIER política anterior de la tabla ----------
-- (Por si el "quickstart" de Supabase dejó políticas abiertas
--  que dejaban ver los datos a todo el mundo.) Este bloque las
--  elimina todas, sin importar cómo se llamen.
do $$
declare politica record;
begin
  for politica in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'tasks'
  loop
    execute format('drop policy %I on public.tasks', politica.policyname);
  end loop;
end $$;


-- (6) Políticas PRIVADAS: cada usuario, solo lo suyo ----------
-- auth.uid() = id del usuario que hace la petición.
--   using       -> qué filas EXISTENTES puedo ver/editar/borrar.
--   with check  -> qué valores puedo GUARDAR (insert/update).

create policy "Ver solo mis tareas"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Crear solo mis tareas"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Editar solo mis tareas"
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Borrar solo mis tareas"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- ============================================================
--  Resultado: al iniciar sesión, cada usuario ve, crea, edita y
--  borra ÚNICAMENTE sus propias tareas. La app no necesita más
--  cambios: el user_id se guarda al crear y RLS filtra el resto.
-- ============================================================
