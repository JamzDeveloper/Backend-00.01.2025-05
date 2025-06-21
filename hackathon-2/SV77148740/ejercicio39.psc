Algoritmo PiyLeibniz
    Definir pi Como Real
    Definir i, signo, terminos Como Entero
    pi ← 0
    signo ← 1
    Escribir "Ingrese la cantidad de términos:"
    Leer terminos
    Para i ← 1 Hasta 2 * terminos - 1 Con Paso 2 Hacer
        pi ← pi + signo * (4 / i)
        signo ← signo * -1
    FinPara
    Escribir "Aproximación de pi: ", pi
FinAlgoritmo