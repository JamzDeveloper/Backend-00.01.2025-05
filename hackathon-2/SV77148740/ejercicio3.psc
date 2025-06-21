Algoritmo TerminaEnCuatro
	Definir numero Como Entero
	Escribir "Coloque numero: "
	Leer numero
	si numero>=0 Entonces
		Cuatro=numero-4
		si cuatro%10=0 Entonces 
			Escribir "Si termina en 4"
		SiNo
			Escribir "No termina en 4"
		FinSi
	SiNo
		Escribir "No termina en 4"
	FinSi
FinAlgoritmo