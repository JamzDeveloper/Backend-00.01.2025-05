Algoritmo SumarCienPrimerosNumeros
	Definir suma, numero Como Entero
	suma <- 0
	numero <- 1
	Repetir
		suma <- suma + numero
		numero <- numero + 1
	Hasta Que numero > 100
	Escribir "La suma de los 100 primeros números es: ", suma
FinAlgoritmo