// Hacer un algoritmo en JavaScript para calcular la suma de los números impares menores o iguales a n.

const n = parseInt(prompt("Ingrese un número entero positivo"))
let suma = 0

for (let i = 1; i <= n; i++) {
    if (i % 2 !== 0) {
        suma = suma + i;
    } 
}

alert(`Suma de impares <= a ${n} es ${suma}`)
 
 
