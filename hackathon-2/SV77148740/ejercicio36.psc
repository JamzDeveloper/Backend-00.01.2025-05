Algoritmo HacerFibonacci
    Definir a, b, c, i, n Como Entero
    a ← 0
    b ← 1
    Escribir "Ingrese la cantidad de términos:"
    Leer n
    Escribir "Fibonacci: "
    Para i ← 1 Hasta n Hacer
        Escribir a
        c ← a + b
        a ← b
        b ← c
    FinPara
FinAlgoritmo