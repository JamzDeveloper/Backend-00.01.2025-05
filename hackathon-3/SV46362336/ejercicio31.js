// Hacer un algoritmo en JavaScript parar calcular la media de los números pares e impares, sólo se ingresará diez números.

let num
let mediaPares, mediaImpares
let pares = 0, impares = 0, sumaPares = 0, sumaImpares = 0

for (let i = 1; i <= 10; i++) {
    num = parseFloat(prompt(`Ingresa el número ${i}:`))
    if(num % 2 === 0) {
        sumaPares=  sumaPares + num
        pares = pares + 1
    } else {
        sumaImpares = sumaImpares + num
        impares = impares + 1
    }
}

if (pares > 0) {
    mediaPares = sumaPares / pares
    mediaPares = `Media números pares: ${mediaPares}` 
}

if (impares > 0) {
    mediaImpares = sumaImpares / impares
    mediaImpares = `Media números impares: ${mediaImpares}`
}

alert(`
    ${mediaPares}
    -----------------
    ${mediaImpares}`)