Algoritmo IdentificarNumerosPrimos
	Definir numero,divisores,cont Como Entero
	Escribir "Coloque numero del 1 al 10: "
	Leer numero
Si numero>=1 y numero<=10 Entonces
	cont<-1;
	divisores<-0
	Mientras cont<=numero Hacer
		Si numero%cont=0 Entonces
			divisores<-divisores+1
		FinSi
		    cont<-cont+1
    FinMientras
		Si divisores=2 Entonces
		    Escribir "Es primo"
	    SiNo
        	Escribir "No es primo"
	FinSi
SiNo
	Escribir "No es valido"
FinSi
FinAlgoritmo