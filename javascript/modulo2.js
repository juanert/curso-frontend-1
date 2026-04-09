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
  let operacion = prompt(
    "Ingresa la operacion que deseas realizar: suma, resta, multiplicacion o division",
  );
  if (operacion === "suma") {
    alert(`La suma de ${num1} y ${num2} es: ${num1 + num2}`);
  } else if (operacion === "resta") {
    alert(`La resta de ${num1} y ${num2} es: ${num1 - num2}`);
  } else if (operacion === "multiplicacion") {
    alert(`La multiplicacion de ${num1} y ${num2} es: ${num1 * num2}`);
  } else if (operacion === "division") {
    alert(`La division de ${num1} y ${num2} es: ${num1 / num2}`);
  } else {
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

if (true) {
  let variableLocal = "Soy una variable local";
  var variableGlobal = "Soy una variable global";
  const PI = 3.14; //NUMERO DE EULER
  if (true) {
    console.log(variableLocal); // Esto funciona, variableLocal is accessible
  }
}

if (true) {
  let variableLocal = "Hola";
  var variableGlobal = "Soy una variable global"; // Estoy redeclarando la variable global, lo cual es posible con var, pero no es recomendable
}

console.log(variableGlobal); // Esto funciona
console.log(variableLocal); // Esto no funciona, variableLocal is not defined
console.log(PI); // Esto no funciona, PI is not defined

let numero1 = 20;

if (true) {
  let numero2 = numero1;
  if (false) {
    let numero3 = numero2;
  }
  numero2 = numero3;
  console.log(numero3); //undefined
}

if (true) {
  console.log(numero2); //undefined
  numero2 = 10;
  if (true) {
    numero1 = numero2;
  }
}

console.log(numero1); //10

//2

if (true) {
  var numero3 = 20;
  if (true) {
    let numero4 = 10;
  }
  numero3 = 15;
  console.log(numero4); //undefined (error)
}

if (true) {
  if (true) {
    if (true) {
      if (true) {
        console.log(numero3); //15
      }
    }
    var numero5 = numero3;
  }
  let numero6 = 2;
}

numero5 = numero6; //error

console.log(numero5);

//3

if (true) {
  if (false) {
    var variablex = 30;
    if (true) {
      console.log(variblex); //no se ejecuta
    }
  }

  if (true) {
    var variabley = 12.5;
    if (12 <= 12) {
      var variablez = variabley;
    } else {
      var variablez = 33.333;
    }
  } else {
    console.log(variabley); //no se ejecuta
  }
  console.log(variablez); //12.5
}

var varaiblew = variablez + variabley; //25
console.log(variablew); //25

var fantastico = true;

function scope(datoentrada1, datoentrada2) {
  var increible = true;
  console.log(fantastico); //MAL
  console.log(datoentrada1, datoentrada2); //CORRECTA
  if (increible) {
    return increible;
  }
  console.log("hola");
}

console.log(scope());

scope("hola", "mundo");
scope(fantastico, "oscar");

/*
  Recursividad
  La recursividad es una tecnica de programacion en la que una funcion se llama a si misma para resolver un problema.
  La recursividad se utiliza para resolver problemas que pueden ser divididos en subproblemas mas pequeños, 
  como el calculo de factoriales o la busqueda de elementos en una estructura de datos.
  Es importante tener una condicion de salida para evitar que la funcion se llame a si misma indefinidamente, 
  lo que causaria un error de stack overflow.
*/

function contar(contador = 0) {
  if (contador <= 10) {
    console.log(
      `Esta funcion cuenta hasta el 10, voy por el numero ${contador}`,
    );
    contar(contador + 1);
  }
}

contar();

let frutas = ["tomate", "banana", "fresa", "kiwi"];

function recorrerArray(array, contador = 0) {
  if (contador < array.length) {
    console.log(array[contador]);
    recorrerArray(array, contador + 1);
  }
}

recorrerArray(frutas);

let numeros = [2.44, 5, 2, 0, 5, 6];

let compras = [
  ["jamon", "queso"],
  ["carne", "pollo"],
  ["tomate", "cebolla"],
];

/*
  Crea un programa que imprima solo los numeros pares del siguiente array
  [0,3,5,1,2,8,9,10]
*/

function detectarPar(array, contador = 0) {
  if (contador < array.length) {
    if (array[contador] % 2 == 0) {
      console.log(`${array[contador]} es un numero par`);
    }
    detectarPar(array, contador + 1);
  }
}

detectarPar([0, 3, 5, 1, 2, 8, 9, 10]);

/*
  EJERCICIOS DE RECURSION 

  1) Cuenta desde el ultimo numero de un array hasta el primero
  [5,2,92,0,3,73,9,6,12]

  2) Suma todos los numeros de un array e imprime cuanto es el total
  [5,2,92,0,3,73,9,6,12]

  3)Realiza la sucesion de fibonacci hasta un numero N que funcione de limite
*/

//1)

function invertirArray(array, contador = array.length - 1) {
  if (contador >= 0 && contador < array.length) {
    console.log(array[contador]);
    invertirArray(array, contador - 1);
  }
}

invertirArray([5, 2, 92, 0, 3, 73, 9, 6, 12]);

//2)
function calcularTotalArray(array, contador = 0, total = 0) {
  if (contador < array.length) {
    total += array[contador]; // total = total + array[contador]
    calcularTotalArray(array, contador + 1, total);
  } else {
    console.log(`La sumatoria total del array es ${total}`);
  }
}

calcularTotalArray([5, 2, 92, 0, 3, 73, 9, 6, 12]);

//3)
function fibonacci(limite, antiguo = 0, nuevo = 1) {
  resultado = antiguo + nuevo;
  if (resultado < limite) {
    console.log(resultado);
    fibonacci(limite, nuevo, resultado);
  }
}

fibonacci(10);

/*
  LOOPS (Bucles)
  Los loops son estructuras de control que permiten repetir un bloque de codigo varias veces,
  hasta que se cumpla una condicion determinada. En JavaScript, existen varios tipos de loops, 
  como el for, while y do while.
*/

//BUCLE FOR
for (let i = 0; i < 10; i++) {
  console.log(`El numero actual es: ${i}`);
}

let frutas2 = ["manzana", "banana", "fresa", "kiwi"];
for (let i = 0; i < frutas2.length; i++) {
  console.log(`La fruta en la posicion ${i} es: ${frutas2[i]}`);
}

//BUCLE WHILE
let contador = 0;
while (contador < 10) {
  console.log(`El numero actual es: ${contador}`);
  contador++;
}

//BUCLE DO WHILE
let contador2 = 0;
do {
  console.log(`El numero actual es: ${contador2}`);
  contador2++;
} while (contador2 < 10);

//CICLO FOR OF
let frutas3 = ["manzana", "banana", "fresa", "kiwi"];
for (let fruta of frutas3) {
  console.log(`La fruta es: ${fruta}`);
}

//CICLO FOR IN
let persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid",
};

for (let propiedad in persona) {
  console.log(
    `La propiedad es: ${propiedad} y su valor es: ${persona[propiedad]}`,
  );
}

let compras2 = [["jamon", "queso"], ["carne", "pollo"], 2];

for (elemento of compras2) {
  if (Array.isArray(elemento)) {
    for (elemento2 of elemento) {
      console.log(elemento2);
    }
  } else {
    console.log(elemento);
  }
}

/*
  EJERCICIO DE FOR OF
  Crea un programa que pueda recorrer el siguiente array
  [
    ["manzana", "banana", "fresa"],
    ["tomate", "cebolla", "lechuga"],
    ["carne", "pollo", ["pescado", "mariscos"]],
  ]
  e imprima cada elemento del array, sin importar el nivel de anidacion.
*/

/*
  EJERCICIO DE FOR IN
  Crea un programa que pueda recorrer el siguiente objeto
  {
    nombre: "Juan",
    edad: 30,
    direccion: {
      calle: "Calle Falsa 123",
      ciudad: "Madrid",
      pais: "España",
    },
    hobbies: ["futbol", "musica", "cine"],
  }
  e imprima cada propiedad y su valor, sin importar el nivel de anidacion.
*/

let ejercicio1 = [
  ["manzana", "banana", "fresa"],
  ["tomate", "cebolla", "lechuga"],
  ["carne", "pollo", ["pescado", "mariscos"]],
];

//Recorro el array principal (ejercicio1) (Forma menos elegante)
for (lista of ejercicio1) {
  //Verifico si el elemento dentro de ejercicio1 es una lista
  /*
    lista sera igual a
    ["manzana", "banana", "fresa"], en primera ejecucion
    ["tomate", "cebolla", "lechuga"], en segunda ejecucion
    ["carne", "pollo", ["pescado", "mariscos"]], en tercera ejecucion
  */
  if (Array.isArray(lista)) {
    //Si es una lista, recorro este elemento
    for (mini_lista of lista) {
      /*
        mini_lista sera igual 
        "manzana" primera ejecucion 
        "banana" segunda ejecucion
        "fresa" tercera ejecucion
        "tomate"  primera ejecucion del segundo ciclo 
        "cebolla"  segunda ejecucion del segundo ciclo
        "lechuga" tercera ejecucion del segundo ciclo
        "carne" primera ejecucion del tercer ciclo
        "pollo" segunda ejecucion del tercer ciclo
        ["pescado", "mariscos"] tercera ejecucion del tercer ciclo
      */
      //verifico si el elemento es otra lista para recorrerla tambien
      if (Array.isArray(mini_lista)) {
        //Recorro esa lista e imprimo elemento
        for (mini_mini_lista of mini_lista) {
          /*
            mini_mini_lista sera igual a
            "pescado" primera ejecucion
            "mariscos" segunda ejecucion
          */
          console.log(mini_mini_lista);
        }
      } else {
        //Esto se ejecuta en caso de que la mini_lista no sea un array
        console.log(mini_lista);
      }
    }
  } else {
    //Esto se ejecuta en caso de que la lista no sea un array
    console.log(lista);
  }
}

console.log("forma mas elegante");
//(Forma mas elegante) tiene problemas, a solucionar proximamente
function recorrerArray(array) {
  let hayMiniArray = false;
  let miniArray = [];
  for (elemento of array) {
    if (Array.isArray(elemento)) {
      hayMiniArray = true;
      miniArray = elemento;
    } else {
      console.log(elemento);
    }
  }
  if (hayMiniArray) {
    recorrerArray(miniArray);
  }
}

recorrerArray(ejercicio1);

//Ejercicio 2
let ejercicio2 = {
  nombre: "Juan",
  edad: 30,
  direccion: {
    calle: "Calle Falsa 123",
    ciudad: "Madrid",
    pais: "España",
  },
  hobbies: ["futbol", "musica", "cine"],
};

/*
  Recorro todas las propiedades del objeto principal, es decir
  nombre,edad,direccion,hobbies
*/
for (propiedad in ejercicio2) {
  /*
    Como hobbies es un array, tengo que validar si alguna propiedad contiene un array
    propiedad contiene el nombre de las propiedades
    nombre, primera ejecucion
    edad, segunda ejecucion
    direccion, tercera ejecucion
    hobbies, cuarta ejecucion

    al decir ejercicio2[propiedad] llamo al valor de esa propiedad, seria como escribir
    ejericicio["nombre"], esta linea imprimiria juan, porque devuelve el valor de la propiedad nombre
  */
  if (Array.isArray(ejercicio2[propiedad])) {
    console.log(
      `la propiedad ${propiedad} es un array, a continuacion recorremos sus elementos`,
    );
    /*
      Como detecto que una propiedad contiene como valor un array tengo que recorrer ese array
      en este caso ejercicio2["hobbies"] es igual a ["futbol", "musica", "cine"]
      en la primera ejecucion el ciclo imprime "futbol", luego "musica", luego "cine"
    */
    for (elemento of ejercicio2[propiedad]) {
      console.log(elemento);
    }
  } else {
    /*
      Como una propiedad contiene otro objeto dentro, entonces debo validar eso.
      Si el valor de una propiedad es otro objeto, entonces tambien debere de recorrerlo
      como dato curioso 
    */
    if (typeof ejercicio2[propiedad] === "object") {
      /*
        Si el if se ejecuta, es que efectivamente. Ese valor es un objeto
      */
      console.log(
        `la propiedad ${propiedad} es un objeto, a continuacion recorremos sus propiedades y valores`,
      );
      /*
        Recorro el objeto, las propiedades de este objeto se guardaran en propiedad2,
        en este caso propiedad2 contenda:
        calle en su primera ejecucion
        ciudad en su segunda ejecucion
        pais en su tercera ejecucion
      */
      for (propiedad2 in ejercicio2[propiedad]) {
        /*
          Ahora, como se puede apreciar, parece algo engorroso la linea donde dice
          ejercicio2[propiedad][propiedad2]
          Esto en este caso seria igual a decir
          ejercicio2["direccion"]["calle"] en la primera ejecucion
          ejercicio2["direccion"]["ciudad"] en la segunda ejecucion
          ejercicio2["direccion"]["pais"] en la tercera ejecucion
          puede verse como que entras a la propiedad direccion de ejecicio dos, y luego entras a otra propiedad
          dentro de direccion

        */
        console.log(
          `La propiedad ${propiedad2} tiene como valor ${ejercicio2[propiedad][propiedad2]}`,
        );
      }
    } else {
      /*
        En caso de que la propiedad contenga un valor como un string o numero, me ahorro todo el condicional de arriba
        y simplemente imprimo el valor.
      */
      console.log(
        `La propiedad ${propiedad} tiene como valor ${ejercicio2[propiedad]}`,
      );
    }
  }
}

/*
  Recorre el siguiente objeto e imprime cada propiedad y su valor
  {
    nombre: "zulia",
    edad: 25,
    oyentes_mensuales: 1000000,
    canciones: [
      {
        nombre: "cancion1",
        duracion: "3:30",
        album: "album1",
        artistas: ["artista1", "artista2"],
      },
      {
        nombre: "cancion2",
        duracion: "4:00",
        album: "album2",
        artistas: ["artista3", "artista4"],
      },
    ],
    redes_sociales: {
      instagram: "https://www.instagram.com/zulia",
      twitter: "https://www.twitter.com/zulia",
      facebook: "https://www.facebook.com/zulia",
    },
    canciones_favoritas: ["cancion1", "cancion2"],
  },
*/

//Metodos de objetos
/*
  Los metodos son funciones que estan asociadas a un objeto, y que pueden ser llamadas utilizando la sintaxis de punto.
  Ocurre que los tipos de datos primitivos como los string, numeros, booleanos, null e undefined no tienen metodos
  de manera directa, pero JavaScript los convierte en objetos de manera temporal para que puedan utilizar metodos.
*/

let carro = {
  marca: "Toyota",
  modelo: "Corolla",
  año: 2020,
  encender: () => {
    console.log("El carro se ha encendido");
  },
  apagar: function () {
    console.log("El carro se ha apagado");
  },
};

carro.encender();
carro.apagar();

console.log(carro.marca); //Toyota

"hola".length; //4
"hola".toUpperCase(); //"HOLA"

/*
  Funciones anonimas
*/

let funcionalidad = function () {
  console.log("Esta es una funcion anonima");
};

funcionalidad();

/*
  Funciones flecha
*/

let funcionalidadFlecha = () => {
  console.log("Esta es una funcion flecha");
};

funcionalidadFlecha();

//Metodos de strings
let texto = "Hola, bienvenido a la clase de JavaScript JavaScript JavaScript";
console.log(texto.length); // 39
console.log(texto.toUpperCase()); // transforma el texto a mayusculas R: "HOLA, BIENVENIDO A LA CLASE DE JAVASCRIPT"
console.log(texto.toLowerCase()); // transforma el texto a minusculas R: "hola, bienvenido a la clase de javascript"
console.log(texto.includes("JavaScript")); // verifica si el texto contiene la palabra "JavaScript" R: true
console.log(texto.startsWith("Hola")); // verifica si el texto comienza con la palabra "Hola" R: true
console.log(texto.endsWith("JavaScript")); // verifica si el texto termina con la palabra "JavaScript" R: true
console.log(texto.indexOf("clase")); // devuelve la posicion de la primera ocurrencia de la palabra "clase" R: 22
console.log(texto.lastIndexOf("clase")); // devuelve la posicion de la ultima ocurrencia de la palabra "clase" R: 22
console.log(texto.replace("JavaScript", "JS")); // reemplaza la palabra "JavaScript" por "JS" R: "Hola, bienvenido a la clase de JS"
console.log(texto.replaceAll("JavaScript", "JS")); // reemplaza todas las ocurrencias de la palabra "JavaScript" por "JS" R: "Hola, bienvenido a la clase de JS JS JS"
console.log(texto.split(" ")); // divide el texto en un array de palabras R: ["Hola,", "bienvenido", "a", "la", "clase", "de", "JavaScript", "JavaScript", "JavaScript"]
console.log(texto.trim()); // elimina los espacios en blanco al inicio y al final del texto R: "Hola, bienvenido a la clase de JavaScript"
console.log(texto.charAt(0)); // devuelve el caracter en la posicion 0 R: "H"
console.log(texto.charCodeAt(0)); // devuelve el codigo ASCII del caracter en la posicion 0 R: 72
console.log(texto.concat(" Espero que disfrutes la clase")); // concatena el texto con otro texto R: "Hola, bienvenido a la clase de JavaScript Espero que disfrutes la clase"
console.log(texto.repeat(2)); // repite el texto 2 veces R: "Hola, bienvenido a la clase de JavaScriptHola, bienvenido a la clase de JavaScript"
console.log(texto.slice(0, 5)); // devuelve una parte del texto desde la posicion 0 hasta la posicion 5 R: "Hola,"
console.log(texto.substring(0, 5)); // devuelve una parte del texto desde la posicion 0 hasta la posicion 5 R: "Hola,"

/*
  Crea un ejercicio que analice un string y verifique si contiene malas palabras que podemos conseguir en el siguiente
  array de malas palabaras
  ["recorcholis","rayos","centellas","chispitas"]
  si hay malas, cambialas por "****"
*/

let malasPalabras = ["recorcholis", "rayos", "centellas", "chispitas"];
let evaluarTexto =
  "Rayos viejo, la noche de anoche fue salvaje, chispitas y centellas volaron por todas partes, recorcholis, eso fue tripiante";

for (let malaPalabara of malasPalabras) {
  evaluarTexto = evaluarTexto
    .toLowerCase()
    .replaceAll(malaPalabara, "*".repeat(malaPalabara.length));
}

console.log(evaluarTexto);

/*
  Metodos de arrays
*/

let lista = ["pan", "leche", "huevos", "azucar"];
console.log(lista.length); // 4
console.log(lista.push("harina")); // agrega un elemento al final del array R: 5
console.log(lista.pop()); // elimina el ultimo elemento del array R: "harina"
console.log(lista.unshift("mantequilla")); // agrega un elemento al inicio del array R: 5
console.log(lista.shift()); // elimina el primer elemento del array R: "mantequilla"
console.log(lista.indexOf("huevos")); // devuelve la posicion de la primera ocurrencia del elemento "huevos" R: 2
console.log(lista.lastIndexOf("huevos")); // devuelve la posicion de la ultima ocurrencia del elemento "huevos" R: 2
console.log(lista.includes("leche")); // verifica si el array contiene el elemento "leche" R: true
console.log(lista.join(", ")); // une los elementos del array en un string separados por ", " R: "pan, leche, huevos, azucar"
console.log(lista.reverse()); // invierte el orden de los elementos del array R: ["azucar", "huevos", "leche", "pan"]
console.log(lista.sort()); // ordena los elementos del array en orden alfabetico R: ["azucar", "huevos", "leche", "pan"]
console.log(lista.slice(1, 3)); // devuelve una parte del array desde la posicion 1 hasta la posicion 3 R: ["huevos", "leche"]
console.log(lista.splice(1, 2)); // elimina elementos del array desde la posicion 1, eliminando 2 elementos R: ["huevos", "leche"]
console.log(lista); // ["pan", "azucar"]
console.log(lista.concat(["mantequilla", "harina"])); // concatena el array con otro array R: ["pan", "azucar", "mantequilla", "harina"]
console.log(lista);
console.log(lista.filter((elemento) => elemento.length > 4)); // devuelve un nuevo array con los elementos que cumplen la condicion R: ["azucar"]
console.log(lista.map((elemento) => elemento.toUpperCase())); // devuelve un nuevo array con los resultados de aplicar la funcion a cada elemento R: ["PAN", "AZUCAR"]
console.log(
  lista.reduce((acumulador, elemento) => acumulador + " " + elemento),
); // devuelve un unico valor que es el resultado de aplicar la funcion a un acumulador y cada elemento del array R: "pan azucar"

function imprimir_mensaje(mensaje = "") {
  console.log(mensaje);
}

function login(usuario, contraseña, funcionalidad) {
  if (usuario === "admin" && contraseña === "1234") {
    funcionalidad("Login exitoso");
  } else {
    funcionalidad("Login fallido");
  }
}

login("admin", "1234", imprimir_mensaje);

/*
  PROYECTO DE LA SECCION 2 1RA PARTE
  Realiza una funcionalidad que funcione como el juego de Piedra, Papel o Tijera, 
  el usuario debe ingresar su eleccion, luego la computadora hara una eleccion aleatoria (investigar como generar un numero aleatorio en JavaScript),
  y se mostrara el resultado de quien gano.

  Realiza una funcionalidad que permita al usuario ingresar un texto, y te muestre el numero de vocales, letras, palabras que tiene ese texto.

  Realiza una funcionalidad que verifique si un string es un palindromo, 
  es decir, que se lee igual de izquierda a derecha que de derecha a izquierda,
  por ejemplo "oso" es un palindromo, mientras que "hola" no lo es.

  Fecha de entrega: 03/04/26
*/

function juego() {
  let opciones = ["piedra", "papel", "tijera"];
  let jugadaUsuario = prompt("Ingresa piedra pepel tijera").toLowerCase();
  let jugadaComputadora = opciones[Math.floor(Math.random() * 3)];

  if (jugadaUsuario === jugadaComputadora) {
    alert("Empate");
  } else if (
    (jugadaUsuario === "piedra" && jugadaComputadora === "tijera") ||
    (jugadaUsuario === "papel" && jugadaComputadora === "piedra") ||
    (jugadaUsuario === "tijera" && jugadaComputadora === "papel")
  ) {
    alert(`Ganaste, la computadora jugo ${jugadaComputadora}`);
  } else {
    alert(`Perdiste, la computadora jugo ${jugadaComputadora}`);
  }
}

/*
  Programacion orientada a objetos (POO)
  La programacion orientada a objetos es un paradigma de programacion que se basa en la creacion de objetos que 
  contienen propiedades y metodos.
*/

/*
  Las clases son moldes o plantillas para crear objetos, las clases definen las propiedades y 
  metodos que tendran los objetos creados a partir de esa clase.
*/

class Personaje {
  constructor(nombre, raza, clase) {
    this.nombre = nombre;
    this.raza = raza;
    this.clase = clase;
  }

  saludar() {
    console.log(
      `Hola, mi nombre es ${this.nombre}, soy de la raza ${this.raza} y mi clase es ${this.clase}`,
    );
  }
}

let personaje1 = new Personaje("Aragorn", "Humano", "Guerrero");
let personaje2 = new Personaje("Legolas", "Elfo", "Arquero");
let personaje3 = new Personaje("Gimli", "Enano", "Guerrero");

personaje1.saludar();
personaje2.saludar();
personaje3.saludar();

/*
  Crea una clase llamada ejercicios donde contenga los metodos para ejecutar los ejercicios de la seccion 2,
  esta clase no necesita tener el metodo constructor, simplemente es una clase que agrupa los ejercicios para 
  tener un codigo mas organizado.
*/

class SerVivo{
  constructor(nombre, tipo){
    this.nombre = nombre;
    this.tipo = tipo;
  }

  describir() {
    console.log(`Soy un ${this.tipo} llamado ${this.nombre}`);
  }
}

class Gato extends SerVivo{
  constructor(nombre, tipo, raza){
    super(nombre, tipo);
    this.raza = raza;
  }

  maullar() {
    console.log("Miau");
    console.log(`Mi raza es ${this.raza}`);
  }
}

let gato1 = new Gato("Michi", "Gato", "Siames");
gato1.describir();
gato1.maullar();

/*-----------------------------------------------------------*/

class heroe {
  constructor(nombre, ataque, defensa, vida, velocidad) {
    this.nombre = nombre;
    this.ataque = ataque;
    this.defensa = defensa;
    this.vida = vida;
    this.velocidad = velocidad;
  }

  atacar(objetivo) {
    // Se muestra un mensaje de que el heroe ataca al objetivo
    console.log(`${this.nombre} ataca a ${objetivo.nombre} con ${this.ataque} pts de ataque`);
    // El daño se calcula restando la defensa del objetivo al ataque del heroe, pero el daño no puede ser negativo
    let danio = this.ataque - objetivo.defensa > 0 ? this.ataque - objetivo.defensa : 0;
    /*
      Operador ternario: es una forma de escribir un condicional de manera mas compacta, se compone de tres partes:
      condicion ? valor_si_verdadero : valor_si_falso
      ejemplo 
      20 > 10 ? "20 es mayor que 10" : "20 no es mayor que 10"
      En este caso, la condicion es this.ataque - objetivo.defensa > 0, si esta condicion es verdadera, entonces danio sera igual a 
      this.ataque - objetivo.defensa, pero si la condicion es falsa, entonces danio sera igual a 0, esto se hace para evitar que el 
      daño sea negativo, ya que si el ataque del heroe es menor que la defensa del objetivo, el daño no puede ser negativo, sino que 
      simplemente no se hace daño.
    */
    // El daño se resta a la vida del objetivo
    objetivo.vida -= danio; // objetivo.vida = objetivo.vida - danio
    // Se muestra un mensaje con el resultado del ataque
    console.log(`${objetivo.nombre} recibe ${danio} de daño, su vida ahora es ${objetivo.vida}`);
    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha sido derrotado por ${this.nombre}`);
    }
  }
}

class Mago extends heroe {
  constructor(nombre, ataque, defensa, vida, velocidad, mana) {
    super(nombre, ataque, defensa, vida, velocidad);
    this.mana = mana;
  }

  lanzarHechizo(objetivo) {
    // El hechizo consume 10 puntos de mana y hace un ataque con un multiplicador de 1.5, pero solo si el mago tiene suficiente mana
    if (this.mana >= 10) {
      // Se muestra un mensaje de que el mago lanza un hechizo al objetivo
      console.log(`${this.nombre} lanza un hechizo a ${objetivo.nombre} con ${this.ataque * 1.5} pts de ataque`);
      // El daño se calcula restando la defensa del objetivo al ataque del mago multiplicado por 1.5, pero el daño no puede ser negativo
      let danio = this.ataque * 1.5 - objetivo.defensa > 0 ? this.ataque * 1.5 - objetivo.defensa : 0;
      // El daño se resta a la vida del objetivo
      objetivo.vida -= danio;
      // El mago consume 10 puntos de mana
      this.mana -= 10;
      // Se muestra un mensaje con el resultado del hechizo y el mana restante del mago
      console.log(`${objetivo.nombre} recibe ${danio} de daño, su vida ahora es ${objetivo.vida}`);
      console.log(`${this.nombre} tiene ${this.mana} de mana restante`);
      if(objetivo.vida <= 0) {
        console.log(`${objetivo.nombre} ha sido derrotado por ${this.nombre}`);
      }
    } else {
      // Si el mago no tiene suficiente mana, se muestra un mensaje indicando que no puede lanzar el hechizo
      console.log(`${this.nombre} no tiene suficiente mana para lanzar un hechizo`);
    }
  }
}

class Guerrero extends heroe {
  constructor(nombre, ataque, defensa, vida, velocidad, vigor) {
    super(nombre, ataque, defensa, vida, velocidad);
    this.vigor = vigor;
  }

  ataqueFuerte(objetivo) {
    // El ataque fuerte consume 5 puntos de vigor y hace un ataque con un multiplicador de 2, pero solo si el guerrero tiene suficiente vigor
    if (this.vigor >= 5) {
      // Se muestra un mensaje de que el guerrero realiza un ataque fuerte al objetivo
      console.log(`${this.nombre} realiza un ataque fuerte a ${objetivo.nombre} con ${this.ataque * 2} pts de ataque`);
      // El daño se calcula restando la defensa del objetivo al ataque del guerrero multiplicado por 2, pero el daño no puede ser negativo
      let danio = this.ataque * 2 - objetivo.defensa > 0 ? this.ataque * 2 - objetivo.defensa : 0;
      // El daño se resta a la vida del objetivo
      objetivo.vida -= danio;
      // El guerrero consume 5 puntos de vigor
      this.vigor -= 5;
      // Se muestra un mensaje con el resultado del ataque fuerte y el vigor restante del guerrero
      console.log(`${objetivo.nombre} recibe ${danio} de daño, su vida ahora es ${objetivo.vida}`);
      console.log(`${this.nombre} tiene ${this.vigor} de vigor restante`);
      if(objetivo.vida <= 0) {
        console.log(`${objetivo.nombre} ha sido derrotado por ${this.nombre}`);
      }
    } else {
      console.log(`${this.nombre} no tiene suficiente vigor para realizar un ataque fuerte`);
    }
  }
}

// Creamos dos personajes, un mago y un guerrero, con sus respectivas propiedades
let gandalf = new Mago("Gandalf", 40, 10, 100, 20, 50);
let aragorn = new Guerrero("Aragorn", 25, 15, 120, 15, 10);

// Simulamos un combate entre Gandalf y Aragorn
do{
  gandalf.lanzarHechizo(aragorn);
  aragorn.ataqueFuerte(gandalf);
} while (gandalf.vida > 0 && aragorn.vida > 0);


