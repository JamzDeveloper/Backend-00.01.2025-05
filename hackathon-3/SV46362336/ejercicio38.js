// Hacer un algoritmo en JavaScript que nos permita saber si un número es un número perfecto.

const num = parseFloat(prompt("Ingresar el número:"))
let sumDiv
sumDiv = 0

for (let i = 1; i < num - 1; i++) {
  if (num % i == 0) {
    sumDiv = sumDiv + i;
  }
}

if (sumDiv == num) {
  alert(`El numero: ${num} es perfecto`);
} else {
  alert(`El numero: ${num} no es perfecto`);
}