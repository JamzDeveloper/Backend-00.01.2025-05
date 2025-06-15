// Hacer un algoritmo en JavaScript para calcular la serie de Fibonacci.

let n = parseInt(prompt("Ingrese la cantidad de términos de la serie de Fibonacci:"))
let a, b, c, mensaje = "\n"

if (n === 1) {
    mensaje += "0\n"
} else if (n === 2) {
    mensaje += "0\n"
    mensaje += "1\n"
} else { 
    a = 0
    b = 1

    mensaje += a + "\n"
    mensaje += b + "\n"
  
    for (i = 3; i <= n; i++) {
        c = a + b
        mensaje += c + "\n"
        a = b
        b = c
  }
}

alert(`
    Serie de Fibonacci con ${n} términos:
    ${mensaje}`)