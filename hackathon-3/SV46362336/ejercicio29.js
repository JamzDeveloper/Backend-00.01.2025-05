// Hacer un algoritmo en JavaScript para calcular la suma de los primeros cien números con un ciclo mientras.

let suma = 0, contador = 1

while (contador <= 100) {
    suma = suma + contador
    contador = contador + 1
}

alert(`La suma de los 100 primeros números es: ${suma}`)