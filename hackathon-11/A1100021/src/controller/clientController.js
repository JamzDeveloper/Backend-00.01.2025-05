import { request, response } from "express";

import Cliente from "../models/cliente.js";

const getClients = async (req = request, res = response) => {
  try {
    const clients = await Cliente.findAll();

    res.json(clients);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postClients = async (req = request, res = response) => {
  try {
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({
        error: "El nombre y teléfono son requeridos",
      });
    }

    const newClient = await Cliente.create({
      nombre,
      telefono,
    });

    await newClient.save();
    res.status(201).json({
      message: "Cliente creado correctamente",
      data: newClient,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getClients, postClients };