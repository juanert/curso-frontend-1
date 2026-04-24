/*
  Try-catch
  Es una estructura de control que nos permite manejar errores en nuestro código de manera más elegante.
  La sintaxis básica es la siguiente:
  try {
    // Código que puede generar un error
  } catch (error) {
    // Código que se ejecuta si se genera un error
  }
*/

try {
  // Intentamos ejecutar un código que puede generar un error
  let texto = "Hola mundo";
  // Intentamos acceder a una propiedad que no existe
  texto.filter();
} catch (error) {
  // Si se genera un error, se ejecuta este bloque de código
  console.error("Se ha producido un error: " + error.message);
}

/*
  Asincronismo
  El asincronismo es una característica de JavaScript que nos permite ejecutar código de 
  manera no bloqueante. Esto significa que podemos ejecutar código mientras esperamos a 
  que se complete una operación asincrónica, como una solicitud HTTP o una lectura de archivo.
*/

/*
  setInterval
  Es una función que nos permite ejecutar un bloque de código de 
  manera repetitiva cada cierto tiempo.
*/

setInterval(() => {
  console.log("Esto se ejecuta cada 2 segundos");
}, 2000);

/*
  setTimeout
  Es una función que nos permite ejecutar un bloque de código después de un cierto tiempo.
*/

setTimeout(() => {
  console.log("Esto se ejecuta después de 3 segundos");
}, 3000);

/*
  Promesas
  Las promesas son una forma de manejar el asincronismo en JavaScript.
  Una promesa es un objeto que representa la eventual finalización o 
  fracaso de una operación asincrónica.
*/

let promesa = new Promise((en_caso_de_exito, en_caso_de_error) => {
  // Simulamos una operación asincrónica
  setTimeout(() => {
    let exito = true;
    if (exito) {
      en_caso_de_exito("La operación se completó con éxito");
    } else {
      en_caso_de_error("La operación falló");
    }
  }, 2000);
});

promesa
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  });

/*
  Async/Await
  Async/Await es una sintaxis más elegante para manejar el asincronismo en JavaScript.
  Nos permite escribir código asincrónico de manera más legible y fácil de entender.
*/

function ejemplo() {
  console.log("Hola")
}

async function ejemploAsync() {
  console.log("Hola")
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("Mundo")
}

/*
  JSON (JavaScript Object Notation)
*/