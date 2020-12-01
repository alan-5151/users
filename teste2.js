class celular {
  constructor() {
    this.cor = "Prata";
    this.modelo = "G3";
    this.marca = "LG";
  }

  ligar() {
    console.log("Uma ligação");
    return "Ligando...";
  }
}

let objeto = new celular();

console.log(objeto);
console.log(objeto.ligar());
