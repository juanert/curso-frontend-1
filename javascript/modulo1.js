console.log("Hola desde el modulo 1");

/* 
  Este es un comentario 
  en bloque 
*/

// Este es un comentario en linea

/*
  QUE SON LAS VARIABLES
  Las variables son contenedores de informacion, es decir, son espacios en memoria que almacenan un valor.
*/

let nombre = "Juan"; // String
let apellido = "Rodriguez"; // String

/*
  La palabra reservada let se utiliza para declarar una variable, es decir
  Para indicar que una variable existe, luego de esta palabra viene el nombre de la variable
  una variable no puede tener espacios, ni caracteres especiales, ni empezar con numeros, 
  ni ser una palabra reservada

  ejemplos incorrectos:
  let 1nombre = 'Juan';
  let nombre-1 = 'Juan';
  let nombre 1 = 'Juan';
  let let = 'Juan';

  si deseas colocar un espacio en el nombre de la variable, puedes utilizar el guion bajo o el camelCase
  let nombre_completo = 'Juan Rodriguez';
  let nombreCompleto = 'Juan Rodriguez';

  Luego del nombre va el signo de igual, que es el operador de asignacion, y luego el valor que 
  queremos asignar a la variable, en este caso 'Juan', que es un string, es decir, una cadena de texto.
*/
/*
let nombre = "Pedro"
La linea de arriba estaria erronea, debido a que la declaracion de una variable solo se realiza una
sola vez, si queremos cambiar el valor de la variable, no debemos volver a declararla, 
sino simplemente asignarle un nuevo valor
*/
nombre = "Pedro"; // Reasignacion de variable

//EJERCICIO MENTAL
let a = "Pedro";
let b = "Juan";
let c = b;

c = b;
b = c;
c = a;
a = b;

//¿Que valor contiene la variable A? R: Juan

a = "Rodriguez";
b = "Barrios";
c = "Rojas";

a = b; //barrios
c = b; //barrios
b = b; //barrios
b = c; //barrios
a = c; //barrios
c = a; //barrios
b = c; //barrios

//¿Qué valor contiene la variable C? R: Barrios

/*
  En javascript el ; no es obligatorio, pero es una buena practica 
  utilizarlo para indicar el final de una instruccion, ademas de que puede evitar errores en el codigo,
  ya que el interprete de javascript puede interpretar el codigo de manera diferente si no se utilizan los ;

  no es lo mismo decir 

  a = b = c = "juan";
  que decir
  a = b; c = "juan";
*/

/*
  TIPOS DE DATOS
  En javascript existen varios tipos de datos, entre los cuales se encuentran:
  - String: es una cadena de texto, se representa entre comillas simples o dobles, por ejemplo: "Hola mundo", 'Hola mundo'
  - Number: es un numero, puede ser entero o decimal, por ejemplo: 10, 3.14
  - Boolean: es un valor logico, puede ser true o false, por ejemplo: true, false
  - Null: es un valor nulo, es decir, no tiene valor, se representa con la palabra reservada null, por ejemplo: null
  - Undefined: es un valor indefinido, es decir, no se le ha asignado un valor a la variable, se representa con la palabra reservada undefined, por ejemplo: undefined
  - Object: es un tipo de dato complejo, que puede contener varias propiedades y metodos, se representa con llaves {}, por ejemplo: {nombre: "Juan", edad: 30}
  - Array: es un tipo de dato complejo, que puede contener varios valores, se representa con corchetes [], por ejemplo: [1, 2, 3, 4, 5]
*/

let texto = "Hola mundo"; // String
let numero = 10; // Number
let booleano = true; // Boolean
let nulo = null; // Null
let indefinido; // Undefined
let objeto = { nombre: "Juan", edad: 30 }; // Object
let arreglo = [1, 2, 3, 4, 5]; // Array

nombre = "Juan";
apellido = "Rodriguez";
let nombreCompleto = nombre + " " + apellido; // Concatenacion de strings
a = 5;
b = "10";
let suma = a + b;
console.log(suma);

/*
  operadores aritmeticos
  + suma
  - resta
  * multiplicacion
  / division
  % modulo
  ** potencia
*/

/*
  OPERADORES DE ASIGNACION
  = asignacion
  += suma y asignacion
  -= resta y asignacion
  *= multiplicacion y asignacion
  /= division y asignacion
  %= modulo y asignacion
  **= potencia y asignacion
*/

a = 10;
a += 5; // a = a + 5 = 15
a -= 3; // a = a - 3 = 12
a *= 2; // a = a * 2 = 24
a /= 4; // a = a / 4 = 6
a %= 3; // a = a % 3 = 0
a **= 2; // a = a ** 2 = 0
a;

/*
  OPERADORES DE COMPARACION
  == igualdad
  === igualdad estricta
  != desigualdad
  !== desigualdad estricta
  > mayor que
  < menor que
  >= mayor o igual que
  <= menor o igual que
*/

1 == 2; //false
2 == 2; //true
2 == "2"; //true
2 === "2"; //false
2 != 2; //false
2 != 3; //true
2 != "2"; //false
2 !== "2"; //true
2 > 3; //false
3 < 2; //false
2 >= 2; //true
0 <= 3; //true

/*
  OPERADORES LOGICOS
  && AND (Y)
  || OR (O)
  ! NOT (NO)
*/

// (Facil)
var uno = !true || false; //false
var dos = false && !false; //false
var tres = true && !false; //true

//(Medio)
var cuatro = 5 === 5 || !true; //true
var cinco = !0 || 5 < 0; //true
var seis = 3 > 4 && !0; //false

//Avanzado
var siete = ((false || true) && !false && true) || (true && false); //true
var ocho = 6 === 3 + 3 && 9 / 3 >= 3; //true
var nueve = !!false || ("1" == 1 && !false === true); //true

//Hardcore
var diez = !!true === !!(5 >= 5); //true
var once = !(true && !true === !!(8 === 4 * 2)); //true

//Ultra-Hardcore
var doce = !(true && !true === !!(16 === 4 * 2 + 8)) !== false; //true

//Leyenda
var trece = !(
  (!(!(10 / 5 == "2") === false) != false) === 5 * 5 <= 100 / 4 &&
  !(1 + 1 !== 10 / 5) !== true
);

//Inmortal
var catorce = !!(
  (10 % 3 != 1 || typeof ("10" - 5) !== "number" || !!([] && {})) &&
  (12 * 4 === "48" || (7 <= "7" && "7" <= 7) || Boolean(0) === Boolean("0"))
);

console.log(
  uno,
  dos,
  tres,
  cuatro,
  cinco,
  seis,
  siete,
  ocho,
  nueve,
  diez,
  once,
  doce,
);

/*
  Condicionales
  if (condicion) {
    //codigo a ejecutar si la condicion es verdadera
  } else {
    //codigo a ejecutar si la condicion es falsa
  }
*/

let edad = 18;

if (typeof edad !== "number") {
  console.log("La edad debe ser un numero");
} else if (edad < 0) {
  console.log("La edad no puede ser negativa");
} else if (edad < 18) {
  console.log("Eres menor de edad");
} else if (edad >= 18 && edad < 65) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres adulto mayor");
}

let tiempo = true;
let dinero = true;
let ganas = false;
let campeones_del_mundo = true;

if ((tiempo && dinero && ganas) || campeones_del_mundo) {
  console.log("Hoy salgo");
} else {
  console.log("Hoy no salgo");
}

let color = "verde";

switch (color) {
  case "verde":
    console.log("Avanza");
    break;
  case "amarillo":
    console.log("Precaucion");
    break;
  case "rojo":
    console.log("Alto");
    break;
  default:
    console.log("Color no valido");
}
