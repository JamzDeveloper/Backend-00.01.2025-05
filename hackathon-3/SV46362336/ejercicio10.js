// Hacer un algoritmo en JavaScript que diga si un número es par o impar.

const num = parseInt(prompt("Ingresar número:"))
let resultado

if (num % 2 === 0) {
    resultado = 'par'
} else {
    resultado = 'impar'
}

alert(`El número es ${resultado}`)
