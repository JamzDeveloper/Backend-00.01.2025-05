// Hacer un algoritmo en JavaScript para calcular el resto y cociente por medio de restas sucesivas.

const dividendo = parseInt(prompt("Ingresar el dividendo:"))
const divisor = parseInt(prompt("Ingresar el divisor:"))
let cociente, resto
cociente = 0
resto = dividendo

while (resto >= divisor) {
    resto = resto - divisor
    cociente = cociente + 1
}

alert(`
    Cociente calculado: ${cociente}
    Resto calculado: ${resto}`)