Algoritmo MediaParesImpares
    Definir num, sumaPar, sumaImpar, contPar, contImpar, i Como Entero
    sumaPar ← 0
    sumaImpar ← 0
    contPar ← 0
    contImpar ← 0
    Para i ← 1 Hasta 10 Hacer
        Escribir "Ingrese número ", i, ":"
        Leer num
        Si num % 2 = 0 Entonces
            sumaPar ← sumaPar + num
            contPar ← contPar + 1
        Sino
            sumaImpar ← sumaImpar + num
            contImpar ← contImpar + 1
        FinSi
    FinPara
    Si contPar > 0 Entonces
        Escribir "Media pares: ", sumaPar / contPar
    Sino
        Escribir "No se ingresaron pares."
    FinSi
    Si contImpar > 0 Entonces
        Escribir "Media impares: ", sumaImpar / contImpar
    Sino
        Escribir "No se ingresaron impares."
    FinSi
FinAlgoritmo