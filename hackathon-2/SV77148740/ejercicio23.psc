Algoritmo CalcularImparesPares
	Definir a,cont,suma Como Entero
	Escribir "Coloque numero: "
	Leer a
	suma<-0
	cont<-1
	Mientras (cont<=a)
		Si (cont%2<>0) Entonces
			suma<-suma+cont
		FinSi
		cont<-cont+1
	FinMientras
	Escribir "La suma de impares es: ",suma
FinAlgoritmo