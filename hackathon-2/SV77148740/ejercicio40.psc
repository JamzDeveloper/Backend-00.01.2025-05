Algoritmo Pi_Nilakantha
    Definir pi Como Real
    Definir i, signo, terminos Como Entero
    pi ← 3
    signo ← 1

    Escribir "Ingrese la cantidad de términos:"
    Leer terminos

    Para i ← 2 Hasta 2 * terminos Con Paso 2 Hacer
        pi ← pi + signo * (4 / (i * (i + 1) * (i + 2)))
        signo ← signo * -1
    FinPara

    Escribir "Aproximación de pi (Nilakantha): ", pi
FinAlgoritmo