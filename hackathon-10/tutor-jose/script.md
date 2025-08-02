# creacion de base de datos
```bash
use armarios_idat2025
```
# creacion e insersion en la coleccion de materia_insumo
```bash
db.materia_insumo.insertOne(
  {
    "type":"insumo",
    "name":"cola",
    "unitMeasurement":"lt",
    "price":4,
    "descripcion":"para pegar"
  }
)
``` 
# insercion de muchos datos a materia_insumo

```bash
db.materia_insumo.insertMany([

  {
    "type":"materia",
    "name":"melamina",
    "unitMeasurement":"mt2",
    "price":250,
    "descripcion":"dar estilo"
  },
  {
    "type":"insumo",
    "name":"claovs",
    "unitMeasurement":"kg",
    "price":5,
    "descripcion":"para armar"

  }
])
```