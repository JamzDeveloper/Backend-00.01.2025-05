// Hacer un algoritmo en JavaScript que imprima la tabla de multiplicar de los números del uno al nueve.
let  tabla, multiplicar, resultado, mensaje = ''

for (let tabla = 1; tabla <= 9; tabla++) {
    mensaje += `Tabla del ${tabla}\n`
    for (let multiplicar = 1; multiplicar <= 12; multiplicar++) {
        resultado = tabla * multiplicar
        mensaje += `${tabla} x ${multiplicar} = ${resultado}\n`
    }
}

console.log(mensaje)
alert(mensaje)
