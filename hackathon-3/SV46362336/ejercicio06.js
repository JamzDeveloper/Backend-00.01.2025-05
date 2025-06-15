//Hacer un algoritmo en JavaScript para ayudar a un trabajador a saber cuál será su sueldo semanal, se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.

const horas = prompt("Ingresar la cantidad de horas trabajadas:")
let extras, semanalBruto, semanalneto
if(horas > 40) {
    semanalBruto = 40 * 20
    extras = (horas - 40) * 25
    semanalNeto = semanalBruto + extras
} else {
    semanalBruto = horas * 20
    extras = 0
    semanalNeto = semanalBruto
}

alert(`
        Horas trabajadas: ${horas}
        Pago bruto semanal: ${semanalBruto}
        Pago horas extras: ${extras}
        ---------------------------------
        Pago neto semananl: ${semanalNeto}
    `)
