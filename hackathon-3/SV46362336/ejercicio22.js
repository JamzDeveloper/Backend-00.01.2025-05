// Hacer un algoritmo en JavaScript para calcular la suma de los n primeros números.

const num = parseInt(prompt("Ingresar números naturales a sumar:"))
let suma

if(num > 0) {
    suma = num * (num + 1) / 2
    suma = `La suma de los ${num} primeros números es: ${suma}`
} else {
    suma = 'Número inválido.'
}

alert(suma)