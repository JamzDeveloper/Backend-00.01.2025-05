// Hacer un algoritmo en JavaScript que convierta centímetros a pulgadas y libras a kilogramos.

const num = parseFloat(prompt("Ingresar valor a convertir:"))
const tipo = String(prompt("Ingresar medida de unidad del valor inicial: Cm o Lbs").toLowerCase())
let pulgadas, kilogramos

switch (tipo) {
    case "cm":
        pulgadas = num * 0.3937
        alert(`${num} centímetros convertido a pulgadas es ${pulgadas}`)
        break
    case "lbs":
        kilogramos = num * 0.4536
        alert(`${num} libras convertido a kilogramos es ${kilogramos}`)
        break
    default:
        alert ('Valor o unidad de médida incorrectos')
}