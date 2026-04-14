class Personaje {
  constructor(nombre, vida, danio, defensa, velocidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.danio = danio;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }

  atacar(objetivo) {
    let danio = Math.floor(Math.random * this.danio + 1);
    let defensa_objetivo = Math.floor(Math.random * objetivo.defensa + 1);
    let danioTotal =
      danio - defensa_objetivo >= 0 ? danio - defensa_objetivo : 0;
    objetivo.vida -= danioTotal;
    console.log(
      `${this.nombre} ha atacado a ${objetivo.nombre} con los puños haciendole ${danio} puntos de daño, le quedan ${objetivo.vida} de vida`,
    );
    if (objetivo.vida <= 0) {
      console.log(`${this.nombre} ha derrotado a ${objetivo.nombre}`);
    }
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, armas) {
    super(nombre, vida, danio, defensa, velocidad);
    this.armas = armas;
  }

  ataque_especial(objetivo) {
    let arma = this.armas[Math.floor(Math.random() * this.armas.length)];
    let danio = Math.floor(Math.random() * arma.danio + 1);
    let defensa_objetivo = Math.floor(Math.random() * objetivo.defensa + 1);
    let danioTotal =
      danio - defensa_objetivo >= 0 ? danio - defensa_objetivo : 0;
    objetivo.vida -= danioTotal;
    console.log(
      `${this.nombre} ha atacado a ${objetivo.nombre} con ${arma.nombre} haciendole ${danio} puntos de daño, le quedan ${objetivo.vida} de vida`,
    );
    if (objetivo.vida <= 0) {
      console.log(`${this.nombre} ha derrotado a ${objetivo.nombre}`);
    }
  }

  saludar() {
    console.log(`Mi nombre es ${this.nombre} y soy un guerrero`);
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, hechizos) {
    super(nombre, vida, danio, defensa, velocidad);
    this.hechizos = hechizos;
  }

  ataque_especial(objetivo) {
    let hechizo = this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
    let danio = Math.floor(Math.random() * hechizo.danio + 1);
    let defensa_objetivo = Math.floor(Math.random() * objetivo.defensa + 1);
    let danioTotal =
      danio - defensa_objetivo >= 0 ? danio - defensa_objetivo : 0;
    objetivo.vida -= danioTotal;
    console.log(
      `${this.nombre} ha atacado a ${objetivo.nombre} con ${hechizo.nombre} haciendole ${danio} puntos de daño, le quedan ${objetivo.vida} de vida`,
    );
    if (objetivo.vida <= 0) {
      console.log(`${this.nombre} ha derrotado a ${objetivo.nombre}`);
    }
  }

  saludar() {
    console.log(`Mi nombre es ${this.nombre} y soy un mago`);
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, danio, defensa, velocidad, flechas) {
    super(nombre, vida, danio, defensa, velocidad);
    this.flechas = flechas;
  }

  ataque_especial(objetivo) {
    let flecha = this.flechas[Math.floor(Math.random() * this.flechas.length)];
    let danio = Math.floor(Math.random() * flecha.danio + 1);
    let defensa_objetivo = Math.floor(Math.random() * objetivo.defensa + 1);
    let danioTotal =
      danio - defensa_objetivo >= 0 ? danio - defensa_objetivo : 0;
    objetivo.vida -= danioTotal;
    console.log(
      `${this.nombre} ha atacado a ${objetivo.nombre} con ${flecha.nombre} haciendole ${danio} puntos de daño, le quedan ${objetivo.vida} de vida`,
    );
    if (objetivo.vida <= 0) {
      console.log(`${this.nombre} ha derrotado a ${objetivo.nombre}`);
    }
  }

  saludar() {
    console.log(`Mi nombre es ${this.nombre} y soy un Arquero`);
  }
}

class Juego{
  constructor(personajes){
    this.personajes = personajes;
  }

  iniciar(){
    for(let personaje of this.personajes){
      personaje.saludar();
    }
    do{
      //Generar una velocidad para personaje
      this.generar_velocidad();
      this.organizar_ronda();
      for(let i = 0; i < this.personajes.length; i++){
        let atacarA = this.numero_aleatorio(this.personajes.length);
        do{
          atacarA = this.numero_aleatorio(this.personajes.length);
        } while (atacarA === i)
        if( this.numero_aleatorio(3) === 0){
          //Si sale 0, el personaje ataca con los puños, hay 1/3 de probabilidades de que esto pase
          this.personajes[i].atacar(this.personajes[atacarA]);
        } else{
          this.personajes[i].ataque_especial(this.personajes[atacarA]);
        }
      }
    } while(this.personajes.length > 1)
    console.log(`El juego ha terminado, el ganador es ${this.personajes[0].nombre}`)
    
  }

  personajes_vivos(){
    let personajes_vivos = this.personajes.filter(personaje => personaje.vida > 0);
    this.personajes = personajes_vivos;
  }

  generar_velocidad(){
    /*
      Los tres puntos se denominan spread operator
      Lo que hace es crear una copia de un objeto o array,  imaginate que personaje es igual a 
      {
        nombre: "Mario",
        danio: 100,
        etc...
      }

      Al escribir ...personaje estoy creando una copia del objeto, pero en este caso en particular creo una copia
      con una nueva propiedad llamada velocidad_ronda, que contendra la velocidad en cada ronda.

      Es una manera un poquito avanzada, pero eficiente, porque me toma solo una linea de codigo generar la velocidad
      de todos los personajes en una ronda en particular

      La funcion map me creara automaticamente un nuevo array con este nuevos objetos.
    */
    return this.personajes.map((personaje) => { return {...personaje, velocidad_ronda: Math.floor(Math.random * personaje.velocidad + 1)} });
  }

  organizar_ronda(){
    let orden_ronda = this.personajes.sort((elemento1,elemento2) => elemento1.velocidad_ronda - elemento2.velocidad_ronda);
    this.personajes = orden_ronda;
  }

  numero_aleatorio(multiplicador, min = 0){
    return Math.floor((Math.random() * multiplicador) + min)
  }

}

//Crea dos guerreros, dos magos y un arquero
let guerrero1 = new Guerrero("Mario", 100, 20, 10, 5, [{nombre: "Espada", danio: 30}, {nombre: "Hacha", danio: 25}]);
let guerrero2 = new Guerrero("Luigi", 100, 20, 10, 5, [{nombre: "Espada", danio: 30}, {nombre: "Hacha", danio: 25}]);
let mago1 = new Mago("Peach", 80, 15, 5, 7, [{nombre: "Bola de fuego", danio: 25}, {nombre: "Rayo", danio: 20}]);
let mago2 = new Mago("Daisy", 80, 15, 5, 7, [{nombre: "Bola de fuego", danio: 25}, {nombre: "Rayo", danio: 20}]);
let arquero1 = new Arquero("Yoshi", 90, 18, 8, 6, [{nombre: "Flecha de fuego", danio: 28}, {nombre: "Flecha de hielo", danio: 22}]);

//Crea un juego con los personajes creados
let juego = new Juego([guerrero1, guerrero2, mago1, mago2, arquero1]);

//Inicia el juego
juego.iniciar();