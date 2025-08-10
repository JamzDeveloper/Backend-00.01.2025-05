import { request, response } from "express";

import Tratamiento from "../models/tratamiento.js"
import Cita from "../models/cita.js"
import Mascota from "../models/mascota.js"
import Veterinario from "../models/veterinario.js"
import Cliente from "../models/cliente.js"

const getTreatments = async (req = request, res = response) => {
  try {
    const treatments = await Tratamiento.findAll({
        include:{
            model:Cita,
            as: 'Cita',
            attributes:["id", 'fecha', 'motivo', 'id_mascota', 'id_veterinario'],
            include:[
            {
                model:Mascota,
                as: 'Mascota',
                attributes:["id","nombre","raza", "id_cliente"],
                include:[
                    {
                        model:Cliente,
                        attributes: ["id", "nombre", "telefono"]
                    }
                ],
            },
            {
                model:Veterinario,
                attributes:["id", "nombre", 'especializacion', 'telefono']
            }
        ]
        }
    });

    res.json(treatments);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postTreatments = async (req = request, res = response) => {
  try {
    const { descripcion, costo, idCita } = req.body;

    if (!descripcion || !costo || !idCita) {
      return res.status(400).json({
        error: "descripción, costo, idCita son requeridos",
      });
    }

    const existCita = await Cita.findByPk(idCita);

    if (!existCita) {
      return res.status(400).json({
        error: "La cita no existe",
      });
    }

    const newTreatment = await Tratamiento.create({
      descripcion,
      costo,
      id_cita: idCita,
    });

    await newTreatment.save();
    res.status(201).json({
      message: "Tratamiento registrado correctamente",
      data: newTreatment,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getTreatments, postTreatments };