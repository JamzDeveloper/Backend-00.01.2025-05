// Hacer un algoritmo en JavaScript que permita al usuario continuar con el programa.

let continuar

do {
    continuar = prompt("desea continuar n/s")
} while (continuar.toLowerCase() !== 'n')

alert("¡El programa ha terminado!")