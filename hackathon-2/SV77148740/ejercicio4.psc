Algoritmo TresNumeros
	Definir a,b,c,medio,menor,mayor Como Entero
	Escribir "Coloque numero: "
	Leer a
	Escribir "Coloque numero: "
	Leer b
	Escribir "Coloque numero: "
	Leer c
Si a<b y a<c Entonces
	menor<-a
	si b<c Entonces
		medio<-b
		mayor<-c
	SiNo 
		medio<-c
		mayor<-b
	FinSi
SiNo
	Si b<a y b<c entonces
		menor<-b
		Si a<c Entonces
			medio<-a
			mayor<-c
		SiNo
			medio<-a
			mayor<-c
		FinSi
	SiNo

	c<-menor
			Si a<b Entonces
				medio<-a
				mayor<-b
			SiNo
				medio<-a
				mayor<-b
			FinSi
		FinSi
	FinSi
Escribir "El orden es: ",menor," ",medio," ",mayor
FinAlgoritmo