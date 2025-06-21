Algoritmo MayorMenor
    Definir num, mayor, menor, i Como Entero
    Escribir "Ingrese el número 1:"
    Leer num
    mayor ← num
    menor ← num

    Para i ← 2 Hasta 20 Hacer
        Escribir "Ingrese el número ", i, ":"
        Leer num
        Si num > mayor Entonces
            mayor ← num
        FinSi
        Si num < menor Entonces
            menor ← num
        FinSi
    FinPara

    Escribir "Mayor: ", mayor
    Escribir "Menor: ", menor
FinAlgoritmo