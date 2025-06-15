// Hacer un algoritmo en JavaScript para determinar la media de una lista indefinida de números positivos, se debe acabar el programa al ingresar un número negativo.

let num, sum, count;
count = 0;
sum = 0;

do {
  num = +prompt("Ingrese un numero positivo o negativo para finalizar");
  if (num >= 0) {
    sum = sum + num;
    count++;
  }
} while (num > 0);

if (count > 0) {
  alert(`La media de los números ingresados es: ${sum / count}`);
} else {
  alert(`No se ingresaron numeros positivos`);
}