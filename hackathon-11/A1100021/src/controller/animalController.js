import { request, response } from "express";

import Animal from "../models/animal.js";

const getAnimals = async (req = request, res = response) => {
  try {
    const animals = await Animal.findAll();

    res.json(animals);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postAnimals = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({
        error: "El nombre es requerido",
      });
    }

    const newAnimal = await Animal.create({
      nombre
    });

    await newAnimal.save();
    res.status(201).json({
      message: "Animal creado correctamente",
      data: newAnimal,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getAnimals, postAnimals };