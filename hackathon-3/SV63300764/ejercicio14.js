let numero = parseInt(prompt("Ingrese un número entero del 1 al 10"));

if (numero >= 1 && numero <= 10) {
    let esPrimo = true;

    if (numero === 1) {
        esPrimo = false;
    } else {
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) {
                esPrimo = false;
                break;
            }
        }
    }

    if (esPrimo) {
       alert(numero + " es un número primo.");
    } else {
        alert(numero + " no es un número primo.");
    }
} else {
    alert("El número ingresado no está en el rango del 1 al 10.");
}
