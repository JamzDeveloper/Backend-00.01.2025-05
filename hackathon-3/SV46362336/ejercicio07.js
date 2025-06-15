// Hacer un algoritmo en JavaScript para una tienda de helado que da un descuento por compra a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. Los descuentos son los siguientes:

//Tipo A 10% de descuento
//Tipo B 15% de descuento
//Tipo C 20% de descuento

const totalCompra = parseFloat(prompt("Ingresar total de compra del cliente:"))
const tipoMembresia = prompt("Ingresar membresía: A, B o C").toLowerCase()
let descuento, netoPagar
descuento = 0

switch (tipoMembresia) {
    case "a":
        descuento = totalCompra * 0.1
        break
    case 'b':
        descuento = totalCompra * 0.15
        break
    case 'c':
        descuento = totalCompra * 0.2
        break
    default:
        alert('Tipo de membresía erróneo')
        descuento = 0
}
netoPagar = totalCompra - descuento

alert(`
    Membresía tipo: ${tipoMembresia}
    Monto de compra: ${totalCompra}
    Monto de descuento: ${descuento}
    -----------------------------
    Neto a pagar: ${netoPagar}
    `)
