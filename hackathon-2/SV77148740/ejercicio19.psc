Algoritmo SalarioPorTipoDeEmpleador
	Definir dias,pago Como Real
	Definir opc Como Caracter
	Escribir "Escoger empleados"
	Escribir "cajero=01"
	Escribir "servidor=02"
	Escribir "preparador de mezclas=03"
	Escribir "mantenimiento=04"
	Leer opc
	Segun opc Hacer
		caso "01":
			Escribir "Cantidad de dias(6 max): " 
			Leer dias
			Si dias<=6 Entonces
				pago<-dias*56
				Escribir "El pago del cajero es: ",pago
			SiNo
				Escribir "No es valido"
			FinSi
		caso "02":
			Escribir "Cantidad de dias(6 max): " 
			Leer dias
			Si dias<=6 Entonces
				pago<-dias*64
				Escribir "El pago de el servidor es: ",pago
			SiNo
				Escribir "No es valido"
			FinSi
		caso "03":
			Escribir "Cantidad de dias(6 max): " 
			Leer dias
			Si dias<=6 Entonces
				pago<-dias*80
				Escribir "El pago de el preparador de mezclas es: ",pago
			SiNo
				Escribir "No es valido"
			FinSi
		caso "04":
			Escribir "Cantidad de dias(6 max): " 
			Leer dias
			Si dias<=6 Entonces
				pago<-dias*48
				Escribir "El pago de el mantenimiento es: ",pago
			SiNo
				Escribir "No es valido"
			FinSi
        De Otro Modo:
            Escribir: "El numero no es valido"
	FinSegun
FinAlgoritmo