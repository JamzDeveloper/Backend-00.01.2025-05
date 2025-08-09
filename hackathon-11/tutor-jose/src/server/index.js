import express from "express";

import cors from "cors";

import { sequelize } from "../config/db.js";
import { getClients, postClients } from "../controller/clientController.js";
import { getPets, postPets } from "../controller/petController.js";

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();

    this.middleware();

    this.routes();

    this.dbConnection();
  }

  routes() {
    this.app.get("/clients", getClients);
    this.app.post("/clients", postClients);
    this.app.get("/pets", getPets);
    this.app.post("/pets",postPets)
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
