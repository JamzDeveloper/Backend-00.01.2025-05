// Hacer un algoritmo en JavaScript que lea dos números y diga cuál es el mayor.

const num1 = parseFloat(prompt("Escribir 1er número:"))
const num2 = parseFloat(prompt("Escribir 2do número:"))
let numMay

if(num1 >= num2) {
    numMay = num1
} else if (num2 > num1) {
    numMay = num2
} else {
    alert('Número inválido')
}

alert(`
    El número mayor es: ${numMay}`)