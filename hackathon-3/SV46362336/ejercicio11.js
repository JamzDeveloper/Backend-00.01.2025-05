// Hacer un algoritmo en JavaScript que lea tres números y diga cuál es el mayor.

const num1 = parseFloat(prompt("Escribir 1er número:"))
const num2 = parseFloat(prompt("Escribir 2do número:"))
const num3 = parseFloat(prompt("Escribir 3er número:"))
let numMay

if (num1 >= num2 && num1 >= num3) {
    numMay = num1
} else if (num2 >= num1 && num2 >= num3) {
    numMay = num2
} else if (num3 >= num1 && num3 >= num2) {
    numMay = num3
} else {
    alert('Número inválido')
}

alert(`
    El número mayor es: ${numMay}`)