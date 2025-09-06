import { request, response } from "express";

import Cita from "../models/cita.js";
import Mascota from "../models/mascota.js";
import Veterinario from "../models/veterinario.js";

const getAppointments = async (req = request, res = response) => {
  try {
    const appointments = await Cita.findAll({
      include: [
        {
          model: Mascota,
          attributes: ["id",'nombre']
        },
        {
          model: Veterinario,
          attributes: ["id",'nombre','telefono']
        }
      ],
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
    const { nombre, asunto, detalle, fecha, hora, idMascota, idVeterinario } = req.body;

    if (!nombre || !asunto || !detalle || !fecha || !hora || !idMascota || !idVeterinario) {
      return res.status(400).json({
        error:
          "El nombre, asunto, detalle, fecha, hora, id de mascota e id de veterinario son requeridos",
      });
    }

    const existPet = await Mascota.findByPk(idMascota);
    const existVeterinarian = await Veterinario.findByPk(idVeterinario);

    if (!existPet) {
      return res.status(400).json({
        error: "La mascota no existe",
      });
    }

    if (!existVeterinarian) {
      return res.status(400).json({
        error: "El veterinario no existe",
      });
    }

    const newAppointment = await Cita.create({
      nombre,
      asunto,
      detalle,
      fecha,
      hora,
      id_mascota: idMascota,
      id_veterinario: idVeterinario,
    });

    await newAppointment.save();
    res.status(201).json({
      message: "Cita registrada correctamente...",
      data: newAppointment,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getAppointments, postAppointments };
