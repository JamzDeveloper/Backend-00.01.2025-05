let num1= parseFloat (prompt("Ingrese el primer numero"));
let num2= parseFloat (prompt("Ingrese el segundo numero"));
let num3= parseFloat (prompt("Ingrese el tercer numero"));
let mayor 

if (num1>=num2 && num2>=num3){
    mayor = num1
} else if (num2>=num1 && num1>=num3){
    mayor = num2
} else {
    mayor = num3
}

     alert("El numero mayoor es : " + mayor);