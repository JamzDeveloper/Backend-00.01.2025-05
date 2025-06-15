// Hacer un algoritmo en JavaScript donde se ingrese una hora y nos calcule la hora dentro de un segundo.

let horas = parseInt(prompt("Ingrese la hora (0-23)"))
let minutos = parseInt(prompt("Ingrese los minutos (0-59)"))
let segundos = parseInt(prompt("Ingrese los segundos (0-59)"))
let resultado
segundos ++

if (segundos >= 60) {
    segundos = 0;
    minutos++;
    if (minutos >= 60) {
      minutos = 0;
      horas++;
      if (horas >= 24) {
        horas = 0;
      }
    }
  }

resultado = `${horas}::${minutos}::${segundos}`
alert(`La hora dentro de 1 segundo es: ${resultado}`)