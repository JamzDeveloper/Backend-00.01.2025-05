let total = parseFloat(prompt("Ingrese el total a pagar"));
let tipoMembresia = prompt("Ingrese la membreisa (A,B,C)").toUpperCase();
let descuento ,tDescuento ;

switch (tipoMembresia){
    case "A" : 
    descuento = 0.10;
    break;
    case "B" : 
    descuento = 0.15;
    break;
    case "C" : 
    descuento = 0.20;
    break;
      default :
      alert("La membresia ingresada es incorrecta");
}

tDescuento =total - (total * descuento);
alert ("El total a pagar es :" + tDescuento);