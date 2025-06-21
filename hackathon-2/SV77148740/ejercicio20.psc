Algoritmo OperacionesDeNumeros
	Definir a,b,c,d,cuadrado ,numero,total,total2 Como Real
	contador<-0
	Escribir "Coloque 4 numeros"
	Leer a, b, c, d
        Si a MOD 2 = 0 Entonces
            contador <- contador + 1
        FinSi
		Si b MOD 2 = 0 Entonces
            contador <- contador + 1
        FinSi
		Si c MOD 2 = 0 Entonces
            contador <- contador + 1
        FinSi
		Si d MOD 2 = 0 Entonces
            contador <- contador + 1
        FinSi
		Escribir "¿Cuántos números son Pares: ",contador
		
	mayor<-a
	Si b> mayor Entonces
		mayor<-b
	FinSi
	Si c> mayor Entonces
		mayor<-c
	FinSi
	Si d> mayor Entonces
		mayor<-d
	FinSi
	Escribir "El mayor es: ",mayor 
	
	Si c MOD 2=0 Entonces
		cuadrado=b*b
		Escribir "El numero al cuadrado es: ",cuadrado
	SiNo
		Escribir " "
	FinSi
	
	Si c<d Entonces
		total=(a+b+c+d)/4
		Escribir "La media de los 4 es: ",total 
	FinSi

	Si c<b Entonces
		Si c<700 y 50<c Entonces
			total2=a+b+c+d
			Escribir "La suma de los 4 numeros es: ",total2
		FinSi
	FinSi
FinAlgoritmo