import { request, response } from "express";

import Cita from "../models/cita.js";
import Mascota from "../models/mascota.js";
import Cliente from "../models/cliente.js";
import Veterinario from "../models/veterinario.js";

const getAppointments = async (req = request, res = response) => {
  try {
    const appointments = await Cita.findAll({
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
    });

    res.json(appointments);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postAppointments = async (req = request, res = response) => {
  try {
    const { fecha, motivo, idMascota, idVeterinario } = req.body;

    if (!fecha || !motivo || !idMascota || !idVeterinario) {
      return res.status(400).json({
        error: "fecha, motivo, idMascota y idVeterinario son requeridos",
      });
    }

    const existPet = await Mascota.findByPk(idMascota);
    if (!existPet) {
      return res.status(400).json({
        error: "La mascota no existe",
      });
    }

    const existVet = await Veterinario.findByPk(idVeterinario);
    if (!existVet) {
      return res.status(400).json({
        error: "El veterinario no existe",
      });
    }

    const newAppointment = await Cita.create({
      fecha,
      motivo,
      id_mascota: idMascota,
      id_veterinario: idVeterinario
    });

    await newAppointment.save();
    res.status(201).json({
      message: "Cita registrada correctamente",
      data: newAppointment,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getAppointments, postAppointments };