Algoritmo TiendaDeZapatos
	Definir precio,a,descuento,cantidad,total como Entero
	zapatos=80
	Escribir "Coloque cantidad de zapatos: "
	Leer cantidad
	total=cantidad*zapatos
Si 40<=cantidad Entonces
	descuento=total*0.40
SiNo 
    Si 20<=cantidad y cantidad<=30 Entonces
	    descuento=total*0.20
    SiNo
		si 10<=cantidad Entonces
			descuento=total*0.10
		SiNo
			descuento=0
		FinSi
	FinSi
FinSi
venta=total-descuento
Escribir "El precio del zapato es:  ",venta
FinAlgoritmo