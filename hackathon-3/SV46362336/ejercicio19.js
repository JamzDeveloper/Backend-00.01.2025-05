// Hacer un algoritmo en JavaScript para una heladería se tienen 4 tipos de empleados ordenados de la siguiente forma con su número identificador y salario diario correspondiente:

    // Cajero (56$/día).

    // Servidor (64$/día).

    // Preparador de mezclas (80$/día).

    // Mantenimiento (48$/día).

    // El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó

const id = parseInt(prompt("Ingresar ID del empleado: 2 dígitos"))
const days = parseInt(prompt("Ingresar días trabajados: 1 - 6"))
const role = String(prompt(`
    Ingresar posición:
    C = Cajero
    S = Servidor
    P = Preparador de mezclas
    M = Mantenimiento`).toLowerCase())
let pago, resultadoRole

switch(role) {
    case 'c':
        pago = days * 56
        resultadoRole  = "Cajero"
        break
    case 's':
        pago = days * 64
        resultadoRole = "Servidor"
        break
    case 'p':
        pago = days * 80
        resultadoRole = "Preparador de mezclas"
        break
    case 'm':
        pago = days * 48
        resultadoRole = "Mantenimiento"
        break
    default:
        alert('Posición inválida.')
}

alert(`
    ID empleado: ${id}
    Posición: ${resultadoRole}
    ---------------------------------------
    Pago empleado: $ ${pago} x ${days} días`)