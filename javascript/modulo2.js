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

function calculadora() {
  let num1 = Number(prompt("Ingresa el primer numero"));
  let num2 = Number(prompt("Ingresa el segundo numero"));
  let operacion = prompt("Ingresa la operacion que deseas realizar: suma, resta, multiplicacion o division");
  if (operacion === "suma") {
    alert(`La suma de ${num1} y ${num2} es: ${num1 + num2}`);
  }
  else if (operacion === "resta") {
    alert(`La resta de ${num1} y ${num2} es: ${num1 - num2}`);
  }
  else if (operacion === "multiplicacion") {
    alert(`La multiplicacion de ${num1} y ${num2} es: ${num1 * num2}`);
  }
  else if (operacion === "division") {
    alert(`La division de ${num1} y ${num2} es: ${num1 / num2}`);
  }
  else {
    alert("Operacion no valida");
    alert("Operacion no valida");
  }
}

/*
  Scope (Alcance)
  El scope se refiere a la visibilidad de las variables y funciones en el codigo.
  En JavaScript, existen dos tipos de scope: global y local.
  - Un scope global es aquel en el que las variables y funciones son accesibles desde cualquier parte del codigo.
  - Un scope local es aquel en el que las variables y funciones solo son accesibles dentro de un bloque de codigo, 
  como una funcion o un bloque if.

  El scope se determina por la definicion de las variable
  - Let y const tienen scope de bloque, lo que significa que solo son accesibles dentro del bloque en el que fueron declaradas.
  - Var tiene scope global, lo que significa que es accesible desde cualquier parte del codigo, incluso dentro de bloques.
*/

let ejemplo = "Soy una variable global";

if(true){
  let variableLocal = "Soy una variable local";
  var variableGlobal = "Soy una variable global";
  const PI = 3.14; //NUMERO DE EULER
  if(true){
    console.log(variableLocal); // Esto funciona, variableLocal is accessible
  }
}

if(true){
  let variableLocal = "Hola";
  var variableGlobal = "Soy una variable global"; // Estoy redeclarando la variable global, lo cual es posible con var, pero no es recomendable
}

console.log(variableGlobal); // Esto funciona
console.log(variableLocal); // Esto no funciona, variableLocal is not defined
console.log(PI); // Esto no funciona, PI is not defined

let numero1 = 20;

if(true){
  let numero2 = numero1;
  if(false){
    let numero3 = numero2;
  }
  numero2 = numero3;
  console.log(numero3) //undefined
}

if(true){
  console.log(numero2) //undefined
  numero2 = 10;
  if(true){
    numero1 = numero2
  }
}

console.log(numero1) //10

//2

if(true){
  var numero3 = 20;
  if(true){
    let numero4 = 10;
  }
  numero3 = 15
  console.log(numero4) //undefined (error)
}

if(true){
  if(true){
    if(true){
      if(true){
        console.log(numero3) //15
      }
    }
    var numero5 = numero3
  }
  let numero6 = 2;
}

numero5 = numero6; //error 

console.log(numero5);

//3

if(true){
  if(false){
    var variablex = 30;
    if(true){
      console.log(variblex); //no se ejecuta
    }
  }

  if(true){
    var variabley = 12.5;
    if (12 <= 12){
      var variablez = variabley;
    } else {
      var variablez = 33.333;
    }
  } else{
    console.log(variabley); //no se ejecuta
  }
  console.log(variablez); //12.5
}

var varaiblew = variablez + variabley; //25
console.log(variablew); //25

var fantastico = true

function scope(datoentrada1, datoentrada2){
  var increible = true;
  console.log(fantastico); //MAL
  console.log(datoentrada1, datoentrada2); //CORRECTA
  if(increible){
    return increible
  }
  console.log("hola")
}

console.log(scope())

scope("hola", "mundo")
scope(fantastico,"oscar")

/*
  Recursividad
  La recursividad es una tecnica de programacion en la que una funcion se llama a si misma para resolver un problema.
  La recursividad se utiliza para resolver problemas que pueden ser divididos en subproblemas mas pequeños, 
  como el calculo de factoriales o la busqueda de elementos en una estructura de datos.
  Es importante tener una condicion de salida para evitar que la funcion se llame a si misma indefinidamente, 
  lo que causaria un error de stack overflow.
*/