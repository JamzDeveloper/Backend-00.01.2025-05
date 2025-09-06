import { request, response } from "express";

import Mascota from "../models/mascota.js";
import Animal from "../models/animal.js";
import Raza from "../models/raza.js";
import Cliente from "../models/cliente.js";

const getPets = async (req = request, res = response) => {
  try {
    const pets = await Mascota.findAll({
      include: [
        {
          model: Animal,
          attributes: ["id",'nombre']
        },
        {
          model: Raza,
          attributes: ["id",'nombre']
        },
        {
          model: Cliente,
          attributes: ["id",'nombre','telefono']
        }
      ]
    });

    res.json(pets);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postPets = async (req = request, res = response) => {
  try {
    const { nombre, idAnimal, idRaza, idCliente } = req.body;

    if (!nombre || !idAnimal || !idRaza || !idCliente) {
      return res.status(400).json({
        error: "El nombre, id de animal, id de raza e id de cliente son requeridos",
      });
    }

    const existAnimal = await Animal.findByPk(idAnimal);
    const existRace = await Raza.findByPk(idRaza);
    const existClient = await Cliente.findByPk(idCliente);

    if (!existAnimal) {
      return res.status(400).json({
        error: "El animal no existe",
      });
    }

    if (!existRace) {
      return res.status(400).json({
        error: "La raza no existe",
      });
    }

    if (!existClient) {
      return res.status(400).json({
        error: "El cliente no existe",
      });
    }

    const newPet = await Mascota.create({
      nombre,
      id_animal: idAnimal,
      id_raza: idRaza,
      id_cliente: idCliente,
    });

    await newPet.save();
    res.status(201).json({
      message: "Mascota registrada correctamente...",
      data: newPet,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getPets, postPets };