Algoritmo promedioTresNotas
	Definir nota1, nota2 , nota3, promedio Como Real
	Escribir " Ingrese la primera nota: "
	Leer nota1
	
	Escribir "Ingrese la segunda nota: "
	Leer nota2
	
	Escribir " Ingrese la tercera nota: "
	Leer nota3
	
	promedio <- ( nota1 + nota2 + nota3) /3
	
	Escribir "El promedio es: ", promedio
	
	Si promedio >= 15 Entonces
		Escribir "El estudiante aprobó."
	SiNo
		Escribir "El estudiante no aprobó."
	FinSi
	
FinAlgoritmo
