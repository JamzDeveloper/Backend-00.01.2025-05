let libras = parseFloat(prompt("Ingrese cantidad de libras"));
let centimetros = parseFloat(prompt("Ingrese los centimetros"));

let pulgadas , kilogramos;

pulgadas = centimetros / 2.54;
kilogramos = libras / 2.2;

	alert(centimetros+" centimetros  convertidos a pulgadas son:" + pulgadas); 
	alert(libras + " libras convertidas a kg son:" + kilogramos) ;