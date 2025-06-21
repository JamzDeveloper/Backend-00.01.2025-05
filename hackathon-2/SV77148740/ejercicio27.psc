Algoritmo ListaIndefinida
	Definir a, medio, lista,suma,c Como Real
	a=1
	cont=0
	mientras a>=0 Hacer
		Escribir "Ingrese el numero"
		Leer a
		si a>=0 Entonces
			suma=suma+a
			cont=cont+1
		FinSi
	FinMientras
	Escribir "la media de los numeros es ",suma/cont
FinAlgoritmo