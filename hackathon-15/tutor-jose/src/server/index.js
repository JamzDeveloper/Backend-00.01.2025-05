import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

import express from "express";
import cors from "cors";
import { Server as SocketServer } from "socket.io";

import { sequelize } from "../config/db.js";

class Server {
  constructor() {
    this.__dirname = dirname(fileURLToPath(import.meta.url));

    this.port = process.env.PORT || 3000;
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);

    this.middleware();

    this.routes();

    this.dbConnection();
    this.socket()
  }

  routes() {
  
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(join(this.__dirname, "../public")));
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

  async socket() {
    this.io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("chat event", (data) => {
        //guardar en la base de datos


        this.io.emit("respuesta", data);
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
}

export { Server };
