// Hacer un algoritmo en JavaScript que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.

const num = parseInt(prompt("Ingresar número del 1 - 10"))
let resultado

if(num === 2 || num === 3 || num === 5 || num === 7) {
    resultado = 'sí'
} else {
    resultado = 'no'
}

alert(`¿Número primo? : ${resultado}`)
