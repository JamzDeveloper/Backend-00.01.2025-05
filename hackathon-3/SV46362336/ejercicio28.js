// Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo repetir.

let sum, count;
sum = 0;
count = 1;

do {
  sum = sum + count;
  count++;
} while (count <= 100);

alert(`La suma de los 100 primeros numeros es: ${sum}`)