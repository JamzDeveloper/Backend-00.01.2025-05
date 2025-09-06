import { request, response } from "express";

import Tratamiento from "../models/tratamiento.js";
import Cita from "../models/cita.js";

const getTreatments = async (req = request, res = response) => {
  try {
    const treatments = await Tratamiento.findAll({
      include: {
        model: Cita,
        attributes: ["id",'asunto','detalle','fecha','hora']
      }
    });

    res.json(treatments);
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

const postTreatments = async (req = request, res = response) => {
  try {
    const { nombre, descripcion, fechaInicio, fechaFin, costo, notas, idCita } = req.body;

    if (!nombre || !descripcion || !fechaInicio || !fechaFin || !costo || !notas || !idCita) {
      return res.status(400).json({
        error: "El nombre, descripcion, fecha de inicio, fecha de fin, costo, notas e id de cita son requeridos",
      });
    }

    const existAppointment = await Cita.findByPk(idCita);

    if (!existAppointment) {
      return res.status(400).json({
        error: "La cita no existe",
      });
    }

    const newTreatment = await Tratamiento.create({
      nombre, 
      descripcion, 
      fecha_inicio: fechaInicio, 
      fecha_fin: fechaFin, 
      costo, 
      notas,
      id_cita: idCita,
    });

    await newTreatment.save();
    res.status(201).json({
      message: "Tratamiento registrado correctamente...",
      data: newTreatment,
    });
  } catch (errors) {
    res.status(500).json({
      error: errors.message,
    });
  }
};

export { getTreatments, postTreatments };