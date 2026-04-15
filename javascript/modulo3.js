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