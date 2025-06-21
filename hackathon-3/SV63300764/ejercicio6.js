let horasTrabajadas = parseInt(prompt("Ingrese el numero de horas trabajadas"));
let horasExt , sueldo ;
 
if (horasTrabajadas <= 40 ) {

    sueldo = horasTrabajadas * 20 ;

} else {

    horasExt = horasTrabajadas - 40;
    sueldo = (40 * 20) + (horasExt* 25);

}

alert ("El sueldo es: " + sueldo);