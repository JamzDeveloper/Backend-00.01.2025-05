import express from "express";

import cors from "cors";

import { sequelize } from "../config/db.js";
import { getClients, postClients } from "../controller/clientController.js";
import { getPets, postPets } from "../controller/petController.js";
import { getRaces, postRaces } from "../controller/raceController.js";
import { getAnimals, postAnimals } from "../controller/animalController.js";
import { getSpecialties, postSpecialties } from "../controller/specialtyController.js";
import { getVeterinarians, postVeterinarians } from "../controller/veterinarianController.js";
import { getAppointments, postAppointments } from "../controller/appointmentController.js";
import { getTreatments, postTreatments } from "../controller/treatmentController.js";

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();

    this.middleware();

    this.routes();

    this.dbConnection();
  }

  routes() {
    // Clients
    this.app.get("/clients", getClients);
    this.app.post("/clients", postClients);

    // Pets
    this.app.get("/pets", getPets);
    this.app.post("/pets",postPets)

    // Animals
    this.app.get("/animals", getAnimals);
    this.app.post("/animals",postAnimals);

    // Races
    this.app.get("/races", getRaces);
    this.app.post("/races", postRaces);

    // Specialties
    this.app.get("/specialties", getSpecialties);
    this.app.post("/specialties",postSpecialties);

    // Veterinarians
    this.app.get("/veterinarians", getVeterinarians);
    this.app.post("/veterinarians", postVeterinarians);
    
    // Appointments
    this.app.get("/appointments", getAppointments);
    this.app.post("/appointments", postAppointments);

    // Treatments
    this.app.get("/treatments", getTreatments);
    this.app.post("/treatments", postTreatments);
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();

      await sequelize.sync({
        alter: true,
      });
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

export { Server };
