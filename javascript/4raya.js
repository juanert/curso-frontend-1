/*
  Crear un juego de conecta 4, donde primeramente pueda seleccionar una opcion el jugador, posteriormente seleccione la computadora,
  van a tener 8 columnas y 6 filas, el jugador va a colocar su ficha en la columna que desee, posteriormente la computadora va a colocar su ficha en una columna aleatoria,
  el juego va a terminar cuando un jugador tenga 4 fichas en linea, ya sea horizontal, vertical o diagonal, o cuando se llene el tablero sin que haya un ganador.
*/

class Juego {
  constructor() {
    //Variable que determina si alguien gano
    this.ganador = false;
    //Tablero con 8 columnas, cada elemento dentro de las columnas es una fila
    this.tablero = [[], [], [], [], [], [], [], []];
  }

  //Metodo para iniciar el juego
  iniciar() {
    //Ejecutarse mientras no haya ganador
    do {
      //Le pido datos al usuario
      this.pedirDatos();
      //La PC hace su movimiento
      this.crearDatosPC();
      //Limpio mensajes anteriores de consola
      console.clear();
      //Imprimo el tablero
      this.dibujarTablero();
      this.evaluarVictoria()
    } while (!this.ganador);
  }

  pedirDatos() {
    //Mientras el jugador ingrese algo que no sea un numero o la columna este llena, le vuelvo a pedir datos
    do {
      //Para encontrar la posicion necesito restarle uno a lo que el usuario coloque
      var columnaJugador =
        Number(prompt("Selecciona una columna, desde la 1 hasta la 8")) - 1;
      //Si la columna tiene mas de 6 elementos, entonces la columna esta full y no podra jugar alli
      if (this.tablero[columnaJugador].length > 6) {
        alert("Esa fila esta llena");
      }
    } while (
      typeof columnaJugador != "number" ||
      this.tablero[columnaJugador].length > 6
    );
    //Agrego una X a la columna donde el jugador jugo
    this.tablero[columnaJugador].push("X");
    //Imprimo mensaje indicando en que columna jugo el jugador
    console.log(`EL jugador juega en la columna ${columnaJugador + 1}`);
  }

  crearDatosPC() {
    //Si la PC intenta jugar en una columna que esta llena, hago que genere otra columna
    do {
      //Genero un numero aleatorio entre 0 y 7
      var columnaPC = Math.floor(Math.random() * 8);
    } while (this.tablero[columnaPC].length > 6);
    //Agrego un O a la columna donde jugo el bot
    this.tablero[columnaPC].push("O");
    //Imprimo donde jugo la PC
    console.log(`La computadora juega en la columna ${columnaPC + 1}`);
  }

  dibujarTablero() {
    //Aqui recorro cada columna del tablero
    for (let columna of this.tablero) {
      console.log("*------------*");
      //Imprimo todos los valores de la columna seleccionada como un string
      console.log(columna.join());
      console.log("*------------*");
    }
  }

  evaluarVictoria() {
    let vertical = [];
    for (let columna of this.tablero) {
      for (let elemento of columna) {
        if (vertical.length === 0) {
          vertical.push(elemento);
        } else if (elemento === vertical[vertical.length - 1]) {
          vertical.push(elemento);
        } else {
          vertical = [];
          vertical.push(elemento);
        }

        if(vertical.length === 4){
          this.ganador = true;
          alert(`El jugador ${elemento} gano`);
          break;
        }
      }
    }
    /*
    let horizontal = [];
    for(let i = 0; (this.tablero.length * 6) < i; i++){

    }
    */
  }
}

let juego = new Juego();

juego.iniciar();
