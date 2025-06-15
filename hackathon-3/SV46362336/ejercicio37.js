// Hacer un algoritmo en JavaScript para conseguir el M.C.D de un número por medio del algoritmo de Euclides.

let num1 = parseInt(prompt('Ingrese el 1er número:'))
let num2 = parseInt(prompt('Ingrese el 2do número:'))
let resto

while (num2 !== 0) {
    resto = num1 % num2
    num1 = num2
    num2 = resto
}

alert(`M.C.D: ${num1}`)