Algoritmo CiudadMasPoblada
    Definir i, poblacion, mayor Como Entero
    Definir ciudadMayor Como Cadena
    mayor ← 0
    Para i ← 1 Hasta 11 Hacer
        Escribir "Ingrese el nombre de la ciudad ", i, ":"
        Leer ciudad
        Escribir "Ingrese la población de ", ciudad, ":"
        Leer poblacion

        Si poblacion > mayor Entonces
            mayor ← poblacion
            ciudadMayor ← ciudad
        FinSi
    FinPara
    Escribir "La ciudad con más población es ", ciudadMayor, " con ", mayor, " habitantes."
FinAlgoritmo