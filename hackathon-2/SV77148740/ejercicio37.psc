Algoritmo MCDyEuclides
    Definir a, b, r Como Entero
    Escribir "Ingrese dos números:"
    Leer a, b
    Mientras b <> 0 Hacer
        r ← a % b
        a ← b
        b ← r
    FinMientras
    Escribir "El MCD es: ", a
FinAlgoritmo