// Hacer un algoritmo en JavaScript que nos permita saber cuál es el número mayor y menor, se debe ingresar sólo veinte números.

let num = parseInt(prompt("Ingresa el número 1:"))
let may, men
may = num
men = num

for (let i = 2; i <= 20; i++) {
    num = parseInt(prompt(`Ingresa el número: ${i}`))
    if(num > may) may = num
    if(num < men) men = num
}

alert(`
    Número mayor: ${may}
    Número menor: ${men}`)