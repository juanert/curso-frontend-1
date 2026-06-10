"use client";
import { useState, useRef } from "react";

export default function TodoList() {
  const [lista, setLista] = useState([]);
  const inputRef = useRef();

  function agregarTarea() {
    const listaActualizada = [...lista];
    const nuevaTarea = inputRef.current.value;
    listaActualizada.push({ titulo: nuevaTarea, completada: false });
    setLista(listaActualizada);
  }

  function toggleCompletada(index) {
    const listaActualizada = [...lista];
    listaActualizada[index].completada = !listaActualizada[index].completada;
    setLista(listaActualizada);
  }

  function borrarTarea(index) {
    const listaActualizada = [...lista];
    listaActualizada.splice(index, 1);
    setLista(listaActualizada);
  }

  return (
    <section>
      <input
        type="text"
        placeholder="Agrega una nueva tarea..."
        ref={inputRef}
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {lista.map((tarea, index) => (
          <li key={index} className="flex gap-4">
            {tarea.titulo}
            <button
              onClick={() => toggleCompletada(index)}
              className="bg-blue-600"
            >
              {tarea.completada ? "Completada" : "Pendiente"}
            </button>
            <button onClick={() => borrarTarea(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/*
  Crea una Copia de Youtube con nextJS utilizando el patron de dise;o Atomic Design,
  el proyecto debe tener su pagina de inicio, una pagina de un video
*/