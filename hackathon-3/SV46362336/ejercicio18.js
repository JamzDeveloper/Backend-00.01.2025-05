// Hacer un algoritmo en JavaScript para una empresa se encarga de la venta y distribución de CD vírgenes. Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:

    // $10. Si se compran unidades separadas hasta 9.

    // $8. Si se compran entre 10 unidades hasta 99.

    // $7. Entre 100 y 499 unidades.

    // $6. Para mas de 500 unidades.

    // La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en JavaScript que dado un número de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.

const cantidad = parseInt(prompt("Ingresar cantidad de CDs vendidos:"))
let precioTotal, ganancia

if(cantidad >= 1 && cantidad < 10) {
    precioTotal = cantidad * 10
} else if(cantidad >= 10 && cantidad < 100) {
    precioTotal = cantidad * 8
} else if(cantidad >= 100 && cantidad < 500) {
    precioTotal = cantidad * 7
} else {
    precioTotal = cantidad * 6
}
ganancia = precioTotal * 0.0825

alert(`
    Precio a pagar por el cliente: S/. ${precioTotal}
    --------------------------------------------
    Ganancia vendedor: S/. ${ganancia}`)
