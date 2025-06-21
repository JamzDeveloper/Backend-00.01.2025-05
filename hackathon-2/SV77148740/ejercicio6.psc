Algoritmo SueldoDeTrabajador
	Definir sueldo,sueldoExtrahora,cantidad,total como Entero
	Escribir "Cantidad de horas trabajadas: "
	Leer horas
Si 40<=horas Entonces
	sueldoExtra=(horas-40)*25	
	sueldo=800+sueldoExtra
SiNo
	sueldo=horas*20
FinSi
Escribir "Su sueldo semanal es:  ",sueldo
FinAlgoritmo