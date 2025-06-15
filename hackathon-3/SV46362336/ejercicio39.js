// Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Gregory-Leibniz. La formula que se debe aplicar es:

//     Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...

const numTerminos = parseInt(prompt("Ingrese la cantidad de términos de la serie de Gregory-Leibniz para aproximar Pi (ej: 1000, 10000):"))

let signo, denominador, piAproximado
piAproximado = 0
signo = 1
denominador = 1

for (let i = 1; i <= numTerminos; i++) {
    piAproximado = piAproximado + (4 / denominador) * signo
    signo = signo * (-1)
    denominador = denominador + 2
}

alert(`La aproximación de Pi es: ${piAproximado}`)