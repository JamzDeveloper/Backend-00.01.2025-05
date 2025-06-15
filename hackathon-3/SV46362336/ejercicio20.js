// Hacer un algoritmo en JavaScript que que lea 4 números enteros positivos y verifique y realice las siguientes operaciones:

//     ¿Cuántos números son Pares?

//     ¿Cuál es el mayor de todos?

//     Si el tercero es par, calcular el cuadrado del segundo.

//     Si el primero es menor que el cuarto, calcular la media de los 4 números.

//     Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la suma de los 4 números.

const num1 = parseInt(prompt("Ingresar 1er número:"))
const num2 = parseInt(prompt("Ingresar 2do número:"))
const num3 = parseInt(prompt("Ingresar 3er número:"))
const num4 = parseInt(prompt("Ingresar 4to número:"))
let pares, mayorN, num3Par, media, suma
pares = 0

if(num1 % 2 === 0) pares++
if(num2 % 2 === 0) pares++
if(num3 % 2 === 0) pares++
if(num4 % 2 === 0) pares++

mayorN = num1
if(num2 >= mayorN) mayorN = num2
if(num3 >= mayorN) mayorN = num3
if(num4 >= mayorN) mayorN = num4

if(num3 % 2 === 0) {
    num3Par = `Sí, el cuadrado del 2do número (${num2}) es ${num2*num2}`
} else {
    num3Par = `No, sin cálculo adicional`
}

if(num1 < num4) {
    media = (num1 + num2 + num3 + num4) / 4
    media = `La media de los 4 números es: ${media}`
} else {
    media = 'El 1er número no es menor que el 4to. Sin cálculo de media'
}

if(num2 > num3 ) {
    if(num3 >= 50 && num3 <= 700) {
        suma = num1 + num2 + num3 + num4
        suma = `Sí, entre 50 y 700. La suma de los 4 números es ${suma}`
    } else {
        suma = `Sí, pero no está entre 50 y 700. No se cálcula la suma`
    }
} else {
    suma = 'No, sin cálculos adicionales'
}

alert(`
• Cantidad de números pares: ${pares}
• El número mayor es: ${mayorN}
• ¿3er número par? ${num3Par}
• ${media}
• ¿2do número mayor que el 3ero? ${suma}`)