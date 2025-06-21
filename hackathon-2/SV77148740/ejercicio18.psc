Algoritmo VentaProducto 
	Definir cantidad,venta Como Entero
	Definir ganancia Como Real
	Escribir "Escriba la cantidad de CD vigenes: "
	Leer cantidad
si cantidad>=500 Entonces
	venta<-cantidad*6
	SiNo
		si cantidad<=499 y cantidad>100 Entonces
			venta<-cantidad*7
		Sino
			Si cantidad<=99 y cantidad>10 Entonces
				venta<-cantidad*8
			SiNo
				venta<-cantidad*10
			FinSi
		FinSi
	FinSi
	ganancia<-venta*0.0825
	Escribir "La venta es: ",venta
	Escribir "La ganancia del vendedor es: ",ganancia
FinAlgoritmo