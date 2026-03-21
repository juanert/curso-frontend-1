/*
  Funciones
  Las funciones son bloques de codigo reutilizables que realizan una tarea especifica.
  Imagina que quieres hacer una suma, puedes escribir el codigo para sumar dos numeros cada vez 
  que quieras hacerlo, o puedes crear una funcion que realice esa tarea y luego simplemente 
  llamarla cada vez que necesites sumar dos numeros.

  Las funciones siempre se declaran primeramente, y luego se llaman para que se ejecuten.

  Para declarar una funcion, utilizamos la palabra reservada function, seguida del nombre de la funcion,
  luego van los parentesis, que pueden contener parametros, y luego las llaves, que contienen el bloque de codigo
  que se ejecutara cuando se llame a la funcion.
*/

function saludar() {
  console.log("Hola, bienvenido a la clase de JavaScript");
}

saludar();
saludar();
saludar();
saludar();

// Funcion con parametros
function saludarPersona(nombre) {
  console.log("Hola, " + nombre + ", bienvenido a la clase de JavaScript");
}

saludarPersona("Juan");
saludarPersona("María");
saludarPersona("Pedro");

function sumar(num1, num2) {
  return `La suma de ${num1} y ${num2} es: ${num1 + num2}`;
}

sumar(2, 3);
sumar(5, 10);
sumar(7, 8);

function multiplicar(num1, num2) {
  return num1 * num2;
}

console.log(sumar(2, 3));
console.log(multiplicar(2, 3));

