// Hacer un algoritmo en JavaScript para calcular el factorial de un número de una forma distinta.

const n = parseFloat(prompt("Ingresar el número a calcular:")) 
let factorial, count

factorial = 1;
count = 1;

while (count <= n) {
  factorial = factorial * count;
  count++;
}

alert(`El factorial del numero ${n} es: ${factorial}`)