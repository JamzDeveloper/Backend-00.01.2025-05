// Hacer un algoritmo en JavaScript que cumpla con la aproximación del número pi con la serie de Nilakantha. La formula que se debe aplicar es:

//     Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...

const numTerminos = parseInt(prompt('Ingrese la cantidad de términos de la serie de Nilakantha para aproximar Pi (ej: 1000, 10000):'))

let signo, factorInicialDenominador, piAproximado, terminoDenominador
piAproximado = 3
signo = 1
factorInicialDenominador = 2

for (let i = 1; i <= (numTerminos - 1); i++) {
    terminoDenominador = factorInicialDenominador * (factorInicialDenominador + 1) * (factorInicialDenominador + 2)
    piAproximado = piAproximado + (4 / terminoDenominador) * signo
    signo = signo * (-1)
    factorInicialDenominador = factorInicialDenominador + 2
}

alert(`La aproximación de Pi es: ${piAproximado}`)
