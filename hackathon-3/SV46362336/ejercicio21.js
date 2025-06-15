// Hacer un algoritmo en JavaScript que permita calcular el factorial de un número.

const num = parseInt(prompt("Ingresar número:"))
let factorial = 1

if(num >= 0) {
    for (let i = 1; i <= num; i++) {
        factorial = factorial * i    
    }
} else {
    alert('Número inválido')
}

alert(`El factorial de ${num} es ${factorial}`)