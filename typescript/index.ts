//let nombre = "Juan";
let nombre: string = "Juan";

//Tipos de datos en TypeScript
let edad: number = 30;
let esEstudiante: boolean = true;
let fechaNacimiento: Date = new Date("1990-01-01");
let lista: number[] = [1, 2, 3, 4, 5];
let tupla: [string, number] = ["Hola", 42];
let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 30 };
let cualquierValor: any = "Esto puede ser cualquier cosa";
let nulo: null = null;
let indefinido: undefined = undefined;
let nodo: Node = document.createElement("div");

//interfaces en TypeScript
interface Persona {
  nombre: string;
  edad: number;
  esEstudiante: boolean;
  habilidades: string[];
  materias: { nombre: string; id: number }[];
}

let estudiante: Persona = {
  nombre: "Ana",
  edad: 22,
  esEstudiante: true,
  habilidades: ["JavaScript", "TypeScript"],
  materias: [
    { nombre: "Matemáticas", id: 1 },
    { nombre: "Física", id: 2 }
  ]
};

//interface con propiedades opcionales
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string; // propiedad opcional
}

//funciones en TypeScript
function sumar(a: number, b: number): number {
  return a + b;
}
