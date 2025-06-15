// Hacer un algoritmo en JavaScript para realizar la suma de todos los números pares hasta el 1000.

let suma = 0
for (let i = 1; i <= 1000; i++) {
    if (i % 2 === 0) {
        suma = suma + i
    }
}

alert(`Suma de números pares hasta: ${suma}`)