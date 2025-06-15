// Hacer un algoritmo en JavaScript que lea un número y según ese número, indique el día que corresponde.

const num = parseInt(prompt("Ingresar número del 1 - 7"))
let resultado

switch(num) {
    case 1:
        resultado = 'Lunes'
        break
    case 2:
        resultado = 'Martes'
        break
    case 3:
        resultado = 'Miércoles'
        break
    case 4:
        resultado = 'Jueves'
        break
    case 5:
        resultado = 'Viernes'
        break
    case 6:
        resultado = 'Sábado'
        break
    case 7:
        resultado = 'Domingo'
        break
    default:
        alert('Valor ingresado incorrecto.')
}

alert(`El número ${num} equivale al día ${resultado}.`)