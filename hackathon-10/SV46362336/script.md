<h2 style="text-align: center;">Hackathon-10</h2>

### 1. Creación base de datos
```bash
use sv46362336
```
### 2. Creación e inserción de datos a colección 'materias_primas'
```bash
db.materias_primas.insertMany([
  {
    nombre: "Madera de pino",
    proveedor: "Maderas del Bosque S.A.",
    cantidad_disponible: 500,
    unidad_medida: "metros cuadrados",
    precio: 15
  },
  {
    nombre: "Tablero MDF",
    proveedor: "Aglomerados Peruanos S.A.",
    cantidad_disponible: 800,
    unidad_medida: "planchas",
    precio: 20
  },
  {
    nombre: "Lámina de melamina blanca",
    proveedor: "Decoraciones Modernas",
    cantidad_disponible: 300,
    unidad_medida: "hojas",
    precio: 35
  },
  {
    nombre: "Madera de roble",
    proveedor: "San Lorenzo",
    cantidad_disponible: 500,
    unidad_medida: "metros cuadrados",
    precio: 25
  }
])
```
### 3. Creación e inserción de datos a colección 'insumos'
```bash
db.insumos.insertMany([
  {
    nombre: "Tornillos para madera",
    marca: "FixaTornillos",
    cantidad_disponible: 10000,
    unidad_medida: "unidades"
  },
  {
    nombre: "Bisagras de metal",
    marca: "Herrajes Premium",
    cantidad_disponible: 500,
    unidad_medida: "pares"
  },
  {
    nombre: "Pegamento para madera",
    marca: "Adhesivos Ultra",
    cantidad_disponible: 150,
    unidad_medida: "litros"
  },
  {
    nombre: "Clavos para madera",
    marca: "San Lorenzo",
    cantidad_disponible: 400,
    unidad_medida: "unidades"
  }
])
```
### 4. Creación e inserción de datos a colección 'personal'
```bash
db.personal.insertMany([
  {
    nombre_completo: "Carlos Jara",
    dni: "70123456",
    cargo: "Jefe de Producción",
    fecha_contratacion: new Date("2023-01-15T00:00:00Z")
  },
  {
    nombre_completo: "María Torres",
    dni: "70654321",
    cargo: "Operadora de Maquinaria",
    fecha_contratacion: new Date("2021-03-20T00:00:00Z")
  },
  {
    nombre_completo: "Rodrigo Ruiz",
    dni: "70987654",
    cargo: "Carpintero",
    fecha_contratacion: new Date("2024-10-05T00:00:00Z")
  }
])
```
### 5. Creación e inserción de datos a colección 'produccion' tomando como referencia objetos de otras colecciones
```bash
db.produccion.insertOne({
  "lote_produccion": "LT-20240803-001",
  "producto_final": "Armario de cocina",
  "cantidad_producida": 10,
  "fecha_inicio": new Date("2024-08-01T08:00:00Z"),
  "fecha_fin": new Date("2024-08-03T17:00:00Z"),
  "materias_usadas": [
    { "id_materia": ObjectId("688ffcae1d086d1bdaeec4ab"), "cantidad_usada": 20 },
    { "id_materia": ObjectId("688ffcae1d086d1bdaeec4aa"), "cantidad_usada": 30 }
  ],
  "insumos_usados": [
    { "id_insumo": ObjectId("6890003e1d086d1bdaeec4ae"), "cantidad_usada": 200 },
    { "id_insumo": ObjectId("6890003e1d086d1bdaeec4ad"), "cantidad_usada": 400 }
  ],
  "personal_responsable": [
    ObjectId("689001bd1d086d1bdaeec4b1"),
    ObjectId("689001bd1d086d1bdaeec4b2")
  ]
})
```
```bash
db.produccion.insertOne({
  "lote_produccion": "LT-20251003-021",
  "producto_final": "Closet de dormitorio",
  "cantidad_producida": 10,
  "fecha_inicio": new Date("2025-10-01T08:00:00Z"),
  "fecha_fin": new Date("2025-10-03T17:00:00Z"),
  "materias_usadas": [
    { "id_materia": ObjectId("688ffcae1d086d1bdaeec4ac"), "cantidad_usada": 20 },
    { "id_materia": ObjectId("688ffcae1d086d1bdaeec4a9"), "cantidad_usada": 30 }
  ],
  "insumos_usados": [
    { "id_insumo": ObjectId("6890003e1d086d1bdaeec4af"), "cantidad_usada": 50 },
    { "id_insumo": ObjectId("6890003e1d086d1bdaeec4b0"), "cantidad_usada": 400 }
  ],
  "personal_responsable": [
    ObjectId("689001bd1d086d1bdaeec4b2"),
    ObjectId("689001bd1d086d1bdaeec4b3")
  ]
})
```
