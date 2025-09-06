import { request, response } from "express";

import Especialidad from "../models/especialidad.js";

const getSpecialties = async (req = request, res = response) => {
  try {
    const specialties = await Especialidad.findAll();

    res.json(specialties);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postSpecialties = async (req = request, res = response) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({
        error: "El nombre y descripcion son requeridos",
      });
    }

    const newSpecialty = await Especialidad.create({
      nombre, 
      descripcion,
    });

    await newSpecialty.save();
    res.status(201).json({
      message: "Especialidad creada correctamente",
      data: newSpecialty,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getSpecialties, postSpecialties };