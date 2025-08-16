import { request, response } from "express";

import Mascota from "../models/mascota.js";
import Cliente from "../models/cliente.js";

const getPets = async (req = request, res = response) => {
  try {
    const pets = await Mascota.findAll({
        include:{
            model:Cliente,
            attributes:["id",'nombre','telefono']
        }
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
    const { nombre, raza, idCliente } = req.body;

    if (!nombre || !raza || !idCliente) {
      return res.status(400).json({
        error: "nombre,raza,idCliente son requeridos",
      });
    }

    const existClient = await Cliente.findByPk(idCliente);

    if (!existClient) {
      return res.status(400).json({
        error: "El cliente no existe",
      });
    }

    const newPet = await Mascota.create({
      nombre,
      raza,
      id_cliente: idCliente,
    });

    await newPet.save();
    res.status(201).json({
      message: "Mascota registrada correctamente",
      data: newPet,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getPets, postPets };