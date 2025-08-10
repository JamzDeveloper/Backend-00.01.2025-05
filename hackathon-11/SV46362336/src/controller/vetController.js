import { request, response } from "express";
import Veterinario from "../models/veterinario.js";

const getVets = async (req = request, res = response) => {
  try {
    const vets = await Veterinario.findAll();

    res.json(vets);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postVets = async (req = request, res = response) => {
  try {
    const { nombre, especializacion, telefono } = req.body;

    if (!nombre || !especializacion || !telefono) {
      return res.status(400).json({
        error: "nombre, especialización y teléfono son requeridos",
      });
    }

    const newVet = await Veterinario.create({
      nombre,
      especializacion,
      telefono
    });

    await newVet.save();
    res.status(201).json({
      message: "Veterianrio creado correctamente",
      data: newVet,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getVets, postVets };
