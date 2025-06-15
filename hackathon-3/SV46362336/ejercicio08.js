// Hacer un algoritmo en JavaScript para calcular el promedio de tres notas y determinar si el estudiante aprobó o no.

const nota1 = parseFloat(prompt("Ingresa la 1era nota:"))
const nota2 = parseFloat(prompt("Ingrese la 2da nota:"))
const nota3 = parseFloat(prompt("Ingrese la 3ra nota:"))
let suma, promedio, final

suma = nota1 + nota2 + nota3
promedio = suma / 3

if(promedio >= 13) {
    final = "Aprobado"
} else {
    final = "Desaprobado"
}

alert(`
    Tu promedio es: ${promedio}
    ---------------------------
    ${final}`)