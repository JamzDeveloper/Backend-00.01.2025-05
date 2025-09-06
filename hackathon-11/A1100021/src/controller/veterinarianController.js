import { request, response } from "express";

import Veterinario from "../models/veterinario.js";
import Especialidad from "../models/especialidad.js";

const getVeterinarians = async (req = request, res = response) => {
  try {
    const veterinarians = await Veterinario.findAll({
      include: {
        model: Especialidad,
        attributes: ["id",'nombre','descripcion']
      }
    });

    res.json(veterinarians);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postVeterinarians = async (req = request, res = response) => {
  try {
    const { nombre, telefono, idEspecialidad } = req.body;

    if (!nombre || !telefono || !idEspecialidad) {
      return res.status(400).json({
        error: "El nombre, telefono e id de especialidad son requeridos",
      });
    }

    const existSpecialty = await Especialidad.findByPk(idEspecialidad);

    if (!existSpecialty) {
      return res.status(400).json({
        error: "La especialidad no existe",
      });
    }

    const newPet = await Veterinario.create({
      nombre,
      telefono,
      id_especialidad: idEspecialidad,
    });

    await newPet.save();
    res.status(201).json({
      message: "Veterinario registrado correctamente",
      data: newPet,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getVeterinarians, postVeterinarians };