// Hacer un algoritmo en Pseint para calcular la suma de los n primeros números.
Algoritmo CalcularSuma
	Definir a,cont,suma Como Entero
	Escribir "Coloque numero: "
	Leer a
	
	suma<-0
	cont<-1
	
	Mientras (cont<=a)
		suma<-suma+cont
		cont<-cont+1
	FinMientras

	Escribir "La suma hasta ", a," es : ", suma

FinAlgoritmo