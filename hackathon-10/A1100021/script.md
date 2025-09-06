# Hackathon-10
## 1. Creación base de datos
```bash
use A1100021
```
## 2. Compra de Materia Prima
### PROVEEDORES
```bash
db.proveedores.insertMany([
  {
    _id: ObjectId("68a59d606563ceef29eec4b5"),
    nombre: "Maderas López",
    contacto: "Carlos López",
    telefono: "+51987654321",
    email: "contacto@maderaslopez.pe",
    direccion: "Av. Industrial 123, Ate, Lima",
    ruc: "20123456789",
    fecha_registro: ISODate("2025-08-20T00:00:00Z"),
    condiciones_pago: "30 días",
    categorias: ["materias_primas", "insumos"],
    activo: true
  },
  {
    _id: ObjectId("68a59d606563ceef29eec4b6"),
    nombre: "Suministros Técnicos García",
    contacto: "María García",
    telefono: "+51984111223",
    email: "ventas@suministrosgarcia.pe",
    direccion: "Jr. Los Ingenieros 456, Cercado, Arequipa",
    ruc: "20456789012",
    fecha_registro: ISODate("2025-08-20T00:00:00Z"),
    condiciones_pago: "15 días",
    categorias: ["herramientas", "maquinaria", "accesorios para muebles"],
    activo: true
  },
  {
    _id: ObjectId("68a59d606563ceef29eec4b7"),
    nombre: "Plásticos del Norte",
    contacto: "Javier Ruiz",
    telefono: "+51993445566",
    email: "info@plasticosnorte.pe",
    direccion: "Mz. B Lt. 8, Urb. Industrial, Trujillo",
    ruc: "20567890123",
    fecha_registro: ISODate("2025-08-20T00:00:00Z"),
    condiciones_pago: "Contado",
    categorias: ["materias_primas", "envases"],
    activo: true
  }
]);
```
### MATERIAS PRIMAS
```bash
db.materias_primas.insertMany([
  {
    _id: ObjectId("68a59da76563ceef29eec4b8"),
    nombre: "MDF 18mm",
    descripcion: "Tablero MDF de 18 mm para estructuras y frentes de muebles",
    unidad_medida: "m2",
    stock_actual: 250,
    stock_minimo: 100,
    precio_unitario: 12.50,
    fecha_ultima_compra: ISODate("2025-07-15"),
    activo: true
  },
  {
    _id: ObjectId("68a59da76563ceef29eec4b9"),
    nombre: "Melamina Blanca 18mm",
    descripcion: "Tablero de melamina blanco de 18 mm para interiores de muebles",
    unidad_medida: "m2",
    stock_actual: 300,
    stock_minimo: 150,
    precio_unitario: 14.20,
    fecha_ultima_compra: ISODate("2025-07-18"),
    activo: true
  },
  {
    _id: ObjectId("68a59da76563ceef29eec4ba"),
    nombre: "Bisagra 35mm tipo cazoleta",
    descripcion: "Bisagra metálica de 35 mm tipo cazoleta para puertas de melamina",
    unidad_medida: "unidad",
    stock_actual: 500,
    stock_minimo: 200,
    precio_unitario: 0.85,
    fecha_ultima_compra: ISODate("2025-07-10"),
    activo: true
  },
  {
    _id: ObjectId("68a59da76563ceef29eec4bb"),
    nombre: "Tornillo rosca madera 4x40mm",
    descripcion: "Tornillo de acero zincado para ensamblaje de tableros MDF/melamina",
    unidad_medida: "unidad",
    stock_actual: 1200,
    stock_minimo: 500,
    precio_unitario: 0.12,
    fecha_ultima_compra: ISODate("2025-07-12"),
    activo: true
  }
]);
```
### COMPRAS DE MATERIAS PRIMAS
```bash
db.compras_materias_primas.insertMany([
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b5"),
    fecha_compra: ISODate("2025-07-15"),
    total_compra: 1500.00,
    observaciones: "Compra mensual de MDF",
    items: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4b8"),
        cantidad: 100,
        precio_unitario: 15,
        subtotal: 1500
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b7"),
    fecha_compra: ISODate("2025-07-18"),
    total_compra: 1704.00,
    observaciones: "Reposición de melamina blanca",
    items: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4b9"),
        cantidad: 120,
        precio_unitario: 14.20,
        subtotal: 1704
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b6"),
    fecha_compra: ISODate("2025-07-10"),
    total_compra: 425.00,
    observaciones: "Compra de bisagras tipo cazoleta",
    items: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4ba"),
        cantidad: 500,
        precio_unitario: 0.85,
        subtotal: 425
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b6"),
    fecha_compra: ISODate("2025-07-12"),
    total_compra: 144.00,
    observaciones: "Tornillos para stock de producción",
    items: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4bb"),
        cantidad: 1200,
        precio_unitario: 0.12,
        subtotal: 144
      }
    ]
  }
]);
```
## 3. Compra de Insumos
### INSUMOS
```bash
db.insumos.insertMany([
  {
    _id: ObjectId("68a59ee86563ceef29eec4bc"),
    nombre: "Pegamento para madera",
    descripcion: "Cola blanca para uso en carpintería",
    unidad_medida: "litros",
    stock_actual: 30,
    stock_minimo: 10,
    precio_unitario: 5.00,
    fecha_registro: ISODate("2025-06-01"),
    activo: true
  },
  {
    _id: ObjectId("68a59ee86563ceef29eec4bd"),
    nombre: "Lija 220",
    descripcion: "Papel de lija para acabado fino en madera",
    unidad_medida: "paquete",
    stock_actual: 50,
    stock_minimo: 20,
    precio_unitario: 3.50,
    fecha_registro: ISODate("2025-06-05"),
    activo: true
  },
  {
    _id: ObjectId("68a59ee86563ceef29eec4be"),
    nombre: "Barniz transparente",
    descripcion: "Barniz para protección y acabado de muebles de madera",
    unidad_medida: "litros",
    stock_actual: 25,
    stock_minimo: 10,
    precio_unitario: 12.00,
    fecha_registro: ISODate("2025-06-07"),
    activo: true
  },
  {
    _id: ObjectId("68a59ee86563ceef29eec4bf"),
    nombre: "Solvente para barniz",
    descripcion: "Solvente para limpieza y dilución de barniz",
    unidad_medida: "litros",
    stock_actual: 40,
    stock_minimo: 15,
    precio_unitario: 7.00,
    fecha_registro: ISODate("2025-06-10"),
    activo: true
  }
]);
```
### COMPRAS DE INSUMOS
```bash
db.compras_insumos.insertMany([
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b5"),
    fecha_compra: ISODate("2025-08-10"),
    total_compra: 90.00,
    observaciones: "Compra de pegamento para madera",
    items: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bc"),
        cantidad: 18,
        precio_unitario: 5.00,
        subtotal: 90
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b6"),
    fecha_compra: ISODate("2025-08-12"),
    total_compra: 175.00,
    observaciones: "Compra de lijas 220",
    items: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bd"),
        cantidad: 50,
        precio_unitario: 3.50,
        subtotal: 175
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b5"),
    fecha_compra: ISODate("2025-08-15"),
    total_compra: 300.00,
    observaciones: "Compra de barniz transparente",
    items: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4be"),
        cantidad: 25,
        precio_unitario: 12.00,
        subtotal: 300
      }
    ]
  },
  {
    proveedor_id: ObjectId("68a59d606563ceef29eec4b6"),
    fecha_compra: ISODate("2025-08-18"),
    total_compra: 280.00,
    observaciones: "Compra de solvente para barniz",
    items: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bf"),
        cantidad: 40,
        precio_unitario: 7.00,
        subtotal: 280
      }
    ]
  }
]);
```
## 4. Gestión de personal
### DEPARTAMENTOS
```bash
db.departamentos.insertMany([
  {
    _id: ObjectId("68a57476ec74a92e1beec4aa"),
    nombre: "Diseño",
    descripcion: "Responsable de la creación de planos, modelos y personalización de productos"
  },
  {
    _id: ObjectId("68a57476ec74a92e1beec4a9"),
    nombre: "Producción",
    descripcion: "Encargado de la fabricación, ensamblado y control del proceso productivo"
  },
  {
    _id: ObjectId("68a57476ec74a92e1beec4ab"),
    nombre: "Logística",
    descripcion: "Organiza el almacenamiento, transporte y entrega de los armarios terminados"
  }
]);
```
### PUESTOS
#### DISEÑO
```bash
db.puestos.insertMany([
  {
    _id: ObjectId("68a57cb16563ceef29eec4ab"),
    nombre: "Diseñador CAD",
    descripcion: "Diseña planos y modelos en software especializado",
    salario_base: 1700,
    departamento_id: ObjectId("68a57476ec74a92e1beec4aa")
  },
  {
    _id: ObjectId("68a57cb16563ceef29eec4ac"),
    nombre: "Especialista en Personalización",
    descripcion: "Adapta diseños a requerimientos del cliente",
    salario_base: 1650,
    departamento_id: ObjectId("68a57476ec74a92e1beec4aa")
  }
]);
```
#### LOGÍSTICA
```bash
db.puestos.insertMany([
  {
    _id: ObjectId("68a57cb16563ceef29eec4ad"),
    nombre: "Encargado de Almacén",
    descripcion: "Controla el inventario de armarios y materiales",
    salario_base: 1400,
    departamento_id: ObjectId("68a57476ec74a92e1beec4ab")
  },
  {
    _id: ObjectId("68a57cb16563ceef29eec4ae"),
    nombre: "Conductor de Reparto",
    descripcion: "Entrega armarios a clientes o tiendas",
    salario_base: 1350,
    departamento_id: ObjectId("68a57476ec74a92e1beec4ab")
  }
]);
```
### EMPLEADOS
#### PRODUCCIÓN
```bash
db.empleados.insertMany([
  {
    _id: ObjectId("68a58a3e6563ceef29eec4af"),
    dni: "12345678A",
    nombre: "Juan",
    apellido: "Pérez",
    fecha_nacimiento: ISODate("1990-05-15"),
    genero: "M",
    telefono: "+34123456789",
    email: "juan.perez@empresa.com",
    direccion: "Calle Falsa 123",
    fecha_ingreso: ISODate("2020-01-10"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4a9")
  },
  {
    _id: ObjectId("68a58a3e6563ceef29eec4b0"),
    dni: "87654321B",
    nombre: "Lucía",
    apellido: "Martínez",
    fecha_nacimiento: ISODate("1992-08-20"),
    genero: "F",
    telefono: "+34123456788",
    email: "lucia.martinez@empresa.com",
    direccion: "Avenida Siempre Viva 742",
    fecha_ingreso: ISODate("2021-04-15"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4aa")
  }
]);
```
#### DISEÑO
```bash
db.empleados.insertMany([
  {
    _id: ObjectId("68a58a546563ceef29eec4b1"),
    dni: "23456789C",
    nombre: "Carlos",
    apellido: "Gómez",
    fecha_nacimiento: ISODate("1985-11-02"),
    genero: "M",
    telefono: "+34123456787",
    email: "carlos.gomez@empresa.com",
    direccion: "Calle del Transporte 55",
    fecha_ingreso: ISODate("2019-09-01"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4ab")
  },
  {
    _id: ObjectId("68a58a546563ceef29eec4b2"),
    dni: "34567890D",
    nombre: "Ana",
    apellido: "López",
    fecha_nacimiento: new Date("1993-03-14"),
    genero: "F",
    telefono: "+34123456786",
    email: "ana.lopez@empresa.com",
    direccion: "Camino de los Armarios 88",
    fecha_ingreso: ISODate("2022-06-10"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4ac")
  }
]);
```
#### LOGÍSTICA
```bash
db.empleados.insertMany([
  {
    _id: ObjectId("68a58a5e6563ceef29eec4b3"),
    dni: "45678901E",
    nombre: "Pedro",
    apellido: "Ramírez",
    fecha_nacimiento: ISODate("1988-07-22"),
    genero: "M",
    telefono: "+34123456785",
    email: "pedro.ramirez@empresa.com",
    direccion: "Polígono Industrial 21",
    fecha_ingreso: ISODate("2018-03-12"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4ad")
  },
  {
    _id: ObjectId("68a58a5e6563ceef29eec4b4"),
    dni: "56789012F",
    nombre: "María",
    apellido: "Fernández",
    fecha_nacimiento: ISODate("1995-12-05"),
    genero: "F",
    telefono: "+34123456784",
    email: "maria.fernandez@empresa.com",
    direccion: "Calle del Diseño 9",
    fecha_ingreso: ISODate("2023-01-20"),
    estado: "Activo",
    puesto_id: ObjectId("68a57cb16563ceef29eec4ae")
  }
]);
```
### ASISTENCIAS
#### Producción 2025-08-20
```bash
db.asistencias.insertMany([
  // Producción 2025-08-20
  {
    empleado_id: ObjectId("68a58a546563ceef29eec4b1"),
    fecha: ISODate("2025-08-20"),
    hora_entrada: "08:00",
    hora_salida: "16:00",
    observaciones: "Entrada puntual"
  },
  {
    empleado_id: ObjectId("68a58a3e6563ceef29eec4b0"),
    fecha: ISODate("2025-08-20"),
    hora_entrada: "08:05",
    hora_salida: "16:00",
    observaciones: "Leve retraso"
  },
  {
    empleado_id: ObjectId("68a58a5e6563ceef29eec4b3"),
    fecha: ISODate("2025-08-20"),
    hora_entrada: "07:55",
    hora_salida: "16:00",
    observaciones: "Entrada anticipada"
  }
]);
```
#### Producción 2025-08-22
```bash
db.asistencias.insertMany([
  {
    empleado_id: ObjectId("68a58a546563ceef29eec4b2"),
    fecha: ISODate("2025-08-22"),
    hora_entrada: "08:00",
    hora_salida: "16:00",
    observaciones: "Entrada puntual"
  },
  {
    empleado_id: ObjectId("68a58a3e6563ceef29eec4af"),
    fecha: ISODate("2025-08-22"),
    hora_entrada: "08:00",
    hora_salida: "16:00",
    observaciones: "Entrada puntual"
  },
  {
    empleado_id: ObjectId("68a58a5e6563ceef29eec4b4"),
    fecha: ISODate("2025-08-22"),
    hora_entrada: "08:10",
    hora_salida: "16:00",
    observaciones: "Llegó tarde por tráfico"
  }
]);
```
#### Producción 2025-08-25
```bash
db.asistencias.insertMany([
  {
    empleado_id: ObjectId("68a58a546563ceef29eec4b1"),
    fecha: ISODate("2025-08-25"),
    hora_entrada: "08:00",
    hora_salida: "16:00",
    observaciones: "Entrada puntual"
  },
  {
    empleado_id: ObjectId("68a58a3e6563ceef29eec4b0"),
    fecha: ISODate("2025-08-25"),
    hora_entrada: "08:03",
    hora_salida: "16:00",
    observaciones: "Entrada casi puntual"
  },
  {
    empleado_id: ObjectId("68a58a5e6563ceef29eec4b4"),
    fecha: ISODate("2025-08-25"),
    hora_entrada: "08:00",
    hora_salida: "16:00",
    observaciones: "Entrada puntual"
  }
]);
```
## 5. Producción
```bash
db.produccion.insertMany([
  {
    fecha: ISODate("2025-08-20"),
    producto: {
      nombre: "Armario de 3 puertas con espejo",
      modelo: "A3P-ES",
      descripcion: "Armario moderno de 180cm de ancho con espejo frontal"
    },
    cantidad_producida: 10,
    unidad: "unidad",
    empleados_involucrados: [
        ObjectId("68a58a546563ceef29eec4b1"),
        ObjectId("68a58a3e6563ceef29eec4b0"),
        ObjectId("68a58a5e6563ceef29eec4b3")
    ],
    materias_primas_utilizadas: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4b8"),
        cantidad_utilizada: 20
      },
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4ba"),
        cantidad_utilizada: 30
      }
    ],
    insumos_utilizados: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bc"),
        cantidad_utilizada: 2
      }
    ],
    observaciones: "Producción sin incidencias. Buen rendimiento del equipo.",
    estado: "completado"
  },
  {
    fecha: ISODate("2025-08-22"),
    producto: {
      nombre: "Mesa de comedor rectangular",
      modelo: "MDR-180",
      descripcion: "Mesa de comedor para 6 personas, acabado barniz transparente"
    },
    cantidad_producida: 5,
    unidad: "unidad",
    empleados_involucrados: [
      ObjectId("68a58a546563ceef29eec4b2"),
      ObjectId("68a58a3e6563ceef29eec4af"),
      ObjectId("68a58a5e6563ceef29eec4b4")
    ],
    materias_primas_utilizadas: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4b8"),
        cantidad_utilizada: 15
      },
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4bb"),
        cantidad_utilizada: 100
      }
    ],
    insumos_utilizados: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4be"),
        cantidad_utilizada: 3
      },
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bd"),
        cantidad_utilizada: 2
      }
    ],
    observaciones: "El barniz aplicado con buen acabado.",
    estado: "completado"
  },
  {
    fecha: ISODate("2025-08-25"),
    producto: {
      nombre: "Estantería modular",
      modelo: "EM-4N",
      descripcion: "Estantería modular de 4 niveles para oficina"
    },
    cantidad_producida: 8,
    unidad: "unidad",
    empleados_involucrados: [
      ObjectId("68a58a546563ceef29eec4b1"),
      ObjectId("68a58a3e6563ceef29eec4b0"),
      ObjectId("68a58a5e6563ceef29eec4b4")
    ],
    materias_primas_utilizadas: [
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4b8"),
        cantidad_utilizada: 25
      },
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4ba"),
        cantidad_utilizada: 20
      },
      {
        materia_prima_id: ObjectId("68a59da76563ceef29eec4bb"),
        cantidad_utilizada: 80
      }
    ],
    insumos_utilizados: [
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bd"),
        cantidad_utilizada: 3
      },
      {
        insumo_id: ObjectId("68a59ee86563ceef29eec4bf"),
        cantidad_utilizada: 4
      }
    ],
    observaciones: "Producción con logística eficiente y control de calidad.",
    estado: "completado"
  }
]);
```