import { request, response } from "express";

import Raza from "../models/raza.js";
import Animal from "../models/animal.js";

const getRaces = async (req = request, res = response) => {
  try {
    const races = await Raza.findAll({
      include: {
        model: Animal,
        attributes: ["id",'nombre']
      }
    });

    res.json(races);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postRaces = async (req = request, res = response) => {
  try {
    const { nombre, idAnimal } = req.body;

    if (!nombre || !idAnimal) {
      return res.status(400).json({
        error: "El nombre e id de animal son requeridos",
      });
    }

    const existSpecialty = await Animal.findByPk(idAnimal);

    if (!existSpecialty) {
      return res.status(400).json({
        error: "El animal no existe",
      });
    }

    const newRace = await Raza.create({
      nombre,
      id_animal: idAnimal,
    });

    await newRace.save();
    res.status(201).json({
      message: "Raza registrada correctamente",
      data: newRace,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getRaces, postRaces };