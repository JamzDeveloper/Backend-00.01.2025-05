Algoritmo CalcularFactorial
	Definir a,cont,factorial Como Entero
	Escribir "Coloque numero: "
	Leer a
	
	factorial<-1
	cont<-1
	
	Mientras (cont<=a)
		factorial<-factorial*cont
		cont<-cont+1
	FinMientras

	Escribir "El factorial es: ",factorial

FinAlgoritmo
