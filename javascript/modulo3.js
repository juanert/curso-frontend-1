/*
  ES6
*/

// MAP
const array = [1, 2, 3, 4, 5];
const newArray = array.map(item => item * 2);
console.log(newArray); // [2, 4, 6, 8, 10]

// arrow function
const sum = (a, b) => a + b;
console.log(sum(2, 3)); // 5

// spread operator (sirve para crear copias de arrays u objetos)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// destructuracion

const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { name, age } = person;
console.log(name); // John
console.log(age); // 30

//funciona con arrays tambien
const numbers = [1, 2, 3];
const [first, second] = numbers;
console.log(first); // 1
console.log(second); // 2

/*
  DOM
  Document Object Model
*/

/*
  Regex (Expresiones regulares)
  Es una secuencia de caracteres que forma un patrón de búsqueda. 
  Se utilizan para buscar y manipular cadenas de texto.
*/

let regex = /hola/i; // Busca la palabra "hola" en una cadena
let texto = "HOLA mundo";
console.log(regex.test(texto)); // true

/*
  modificadores de regex:
  i: case insensitive (ignora mayúsculas y minúsculas)
  g: global (busca todas las coincidencias en lugar de solo la primera)
  m: multiline (permite que ^ y $ coincidan con el inicio y el final de cada línea)

  patrones de regex:
  .: cualquier carácter excepto un salto de línea
  \d: cualquier dígito (0-9)
  \w: cualquier carácter alfanumérico (letras y números)
  \s: cualquier espacio en blanco (espacio, tabulación, salto de línea)
  ^: inicio de la cadena
  $: final de la cadena
  [abc]: cualquier carácter dentro de los corchetes (en este caso, a, b o c)
  [^abc]: cualquier carácter que no esté dentro de los corchetes (en este caso, cualquier carácter excepto a, b o c)
  ( ): grupo de captura ejemplo: /(hola|adios)/ busca "hola" o "adios"
  [a-z]: cualquier letra minúscula
  [A-Z]: cualquier letra mayúscula
  [0-9]: cualquier dígito
  [a-zA-Z0-9]: cualquier letra o dígito
*/

//Validar un nombre con regex (solo letras, espacios y apóstrofes, mínimo 2 caracteres)
let nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'\s]{2,}$/i;
let nombre = "Juan 2do";
console.log(nombreRegex.test(nombre)); // false

//validar una cedula (v-12345678)
let cedulaRegex = /^[vV]-\d{7,8}$/;
let cedula = "V-12345678";
console.log(cedulaRegex.test(cedula)); // true

//validar un correo electrónico
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//otra forma de validar un correo electrónico
let emailRegex2 = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let email = "hola@venezuela.com.ve.hola";
console.log(emailRegex2.test(email)); // true

//validar una contraseña (mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial)
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
let password = "Password1!";
console.log(passwordRegex.test(password)); // true