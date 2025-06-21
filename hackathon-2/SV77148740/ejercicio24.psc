Algoritmo CalcularSuma1000
	Definir a,cont,suma Como Entero
	Escribir "Realizar la suma de todos los pares hasta el 1000: "
	a=1000;
	suma<-0
	cont<-1
	Mientras (cont<=a)
		Si (cont%2=0) Entonces
			suma<-suma+cont
		FinSi
		cont<-cont+1
	FinMientras
	Escribir "La suma de pares hasta 1000 es: ",suma
FinAlgoritmo
