// Hacer un algoritmo en JavaScript para una tienda de zapatos que tiene una promoción de descuento para vender al mayor, esta dependerá del número de zapatos que se compren. Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; y si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.

let totalAmount, total, discount;
const quantity = prompt("Ingrese la cantidad de zapatos comprados:")
const price = 80;

total = price * quantity;
discount = 0;

if (quantity >= 10 && quantity <= 20) discount = total * 0.1;

if (quantity > 20 && quantity <= 30) discount = total * 0.2;

if (quantity > 30) discount = total * 0.4;

totalAmount = total - discount;

console.log(`cantidad comprada: ${quantity}`);
console.log(`total original: ${total}`);
console.log(`descuento: ${discount}`);
console.log(`total a pagar: ${totalAmount}`);

alert(`
    ----------------------------
    Cantidad comprada: ${quantity}
    Total original: ${total}
    Descuento: $ ${discount}
    Total a pagar: $ ${totalAmount}
    ----------------------------`)