//funciones
function saludar() {
  return "hola";
}
const saludar2 = () => "hola";

console.log(saludar());

console.log(saludar2());

const persona = {
  nombre: "Ana",
  saludar: function () {
    console.log(`hola, soy ${this.nombre}`);
  },
};

const persona2 = {
  nombre: "Ana",
  saludar: () => {
    console.log(`hola, soy ${this.nombre}`);
  },
};

persona.saludar();
persona2.saludar();

//ejercicio 7
const result = [1, 2, 3, 4, 5, 5, 4].slice(2, 6);
const result2 = [1, 2, 3, 4, 5, 5, 4].slice(-1);

console.log(result);
console.log(result2);

//ejercicio 9
//lastIndexOf ==> busca la subcadena donde fue usada por ultima vez
//indexOf ==> busca la subcadena donde fue usada por primera vez

console.log("fdafd".indexOf("d"));

const testArray = (datos) => {
  console.log(datos);
};

const arrayData = [1, 2, 3, 4, 5];

testArray(arrayData);

console.log("----------------");

function expo(valor) {
  return valor * 2;
}

const datosExpo = [1, 2, 3, 4, 5, 6];

console.log(datosExpo);
let finalData = [];

for (let dat of datosExpo) {
  // console.log(dat);

  const resultexpo = expo(dat);

  // console.log("resultexpo", resultexpo);

  finalData.push(resultexpo);
}

// console.log(finalData);

function mapFun(valor) {
  console.log("map", valor);

  return valor;
}

const mapFuncFle = (valor) => valor;

const resultMap = datosExpo.map((valor) => {
  ///////

  // if (valor != 2) {
  //   return valor * 2;
  // }

  return valor * 2;
});

const resultFilter = datosExpo.filter((e) => {
  if (e % 2 == 0) {
    return e;
  }
});
console.log(resultFilter);
